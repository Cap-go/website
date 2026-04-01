import { createHash } from 'node:crypto'

let forgePromise: Promise<any> | undefined

async function getForge(): Promise<any> {
  forgePromise ||= import('node-forge').then((module) => module.default ?? module)
  return await forgePromise
}

export interface BaseToolFile {
  fileName: string
  mimeType: string
  encoding: 'text' | 'base64'
  content: string
}

export interface SigningIdentityInput {
  commonName: string
  emailAddress: string
  organization: string
  organizationalUnit: string
  localityName: string
  stateOrProvinceName: string
  countryName: string
}

export interface IosCertificateRequestInput extends SigningIdentityInput {}

export interface AndroidKeystoreInput extends SigningIdentityInput {
  alias: string
  password: string
  validityYears: number
}

export interface IosCertificateBundle {
  summary: {
    subject: string
    keyType: string
    hashAlgorithm: string
  }
  files: BaseToolFile[]
}

export interface AndroidKeystoreBundle {
  summary: {
    subject: string
    alias: string
    validityYears: number
    fingerprintSha1: string
    fingerprintSha256: string
  }
  files: BaseToolFile[]
}

const MAX_FIELD_LENGTH = 120
const MAX_PASSWORD_LENGTH = 128
const KEY_SIZE = 2048

function cleanField(value: unknown, maxLength = MAX_FIELD_LENGTH): string {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength)
}

function requireField(value: string, label: string): string {
  if (!value) {
    throw new Error(`${label} is required.`)
  }
  return value
}

function validateCountry(value: string): string {
  const normalized = requireField(cleanField(value, 2), 'Country code').toUpperCase()
  if (!/^[A-Z]{2}$/.test(normalized)) {
    throw new Error('Country code must use the ISO 3166-1 alpha-2 format, for example US or FR.')
  }
  return normalized
}

function validateEmail(value: string): string {
  const normalized = requireField(cleanField(value), 'Email')
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  if (!valid) {
    throw new Error('Email must be a valid email address.')
  }
  return normalized
}

function validateAlias(value: string): string {
  const normalized = requireField(cleanField(value, 80), 'Alias')
  if (!/^[A-Za-z0-9._-]+$/.test(normalized)) {
    throw new Error('Alias can only contain letters, numbers, dots, underscores, and hyphens.')
  }
  return normalized
}

function validatePassword(value: string): string {
  const normalized = requireField(String(value ?? '').slice(0, MAX_PASSWORD_LENGTH), 'Password')
  if (normalized.length < 8) {
    throw new Error('Password must be at least 8 characters long.')
  }
  return normalized
}

function validateValidityYears(value: unknown): number {
  const parsed = Number.parseInt(String(value ?? '10'), 10)
  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 35) {
    throw new Error('Validity must be between 1 and 35 years.')
  }
  return parsed
}

function normalizeIdentity(input: Partial<SigningIdentityInput>): SigningIdentityInput {
  return {
    commonName: requireField(cleanField(input.commonName), 'Full name'),
    emailAddress: validateEmail(cleanField(input.emailAddress)),
    organization: cleanField(input.organization),
    organizationalUnit: cleanField(input.organizationalUnit),
    localityName: cleanField(input.localityName),
    stateOrProvinceName: cleanField(input.stateOrProvinceName),
    countryName: validateCountry(cleanField(input.countryName)),
  }
}

function toForgeAttributes(input: SigningIdentityInput) {
  const attributes = [{ name: 'commonName', value: input.commonName }]

  if (input.organization) attributes.push({ name: 'organizationName', value: input.organization })
  if (input.organizationalUnit) attributes.push({ name: 'organizationalUnitName', value: input.organizationalUnit })
  if (input.localityName) attributes.push({ name: 'localityName', value: input.localityName })
  if (input.stateOrProvinceName) attributes.push({ name: 'stateOrProvinceName', value: input.stateOrProvinceName })
  attributes.push({ name: 'countryName', value: input.countryName })
  attributes.push({ name: 'emailAddress', value: input.emailAddress })

  return attributes
}

function formatSubject(identity: SigningIdentityInput): string {
  return [
    `CN=${identity.commonName}`,
    identity.organization ? `O=${identity.organization}` : '',
    identity.organizationalUnit ? `OU=${identity.organizationalUnit}` : '',
    identity.localityName ? `L=${identity.localityName}` : '',
    identity.stateOrProvinceName ? `ST=${identity.stateOrProvinceName}` : '',
    `C=${identity.countryName}`,
    `emailAddress=${identity.emailAddress}`,
  ]
    .filter(Boolean)
    .join(', ')
}

async function generateKeyPair() {
  const forge = await getForge()
  return await new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair({ bits: KEY_SIZE }, (error, keyPair) => {
      if (error || !keyPair) {
        reject(error || new Error('Failed to generate the RSA key pair.'))
        return
      }
      resolve(keyPair)
    })
  })
}

function randomSerialNumber(forge: any): string {
  const bytes = forge.random.getBytesSync(9)
  return Buffer.from(bytes, 'binary').toString('hex')
}

function formatFingerprint(buffer: Buffer, algorithm: 'sha1' | 'sha256'): string {
  return (
    createHash(algorithm)
      .update(buffer)
      .digest('hex')
      .toUpperCase()
      .match(/.{1,2}/g)
      ?.join(':') || ''
  )
}

export function normalizeIosCertificateInput(input: Partial<IosCertificateRequestInput>): IosCertificateRequestInput {
  return normalizeIdentity(input)
}

export function normalizeAndroidKeystoreInput(input: Partial<AndroidKeystoreInput>): AndroidKeystoreInput {
  return {
    ...normalizeIdentity(input),
    alias: validateAlias(input.alias),
    password: validatePassword(String(input.password ?? '')),
    validityYears: validateValidityYears(input.validityYears),
  }
}

export async function createIosCertificateBundle(input: IosCertificateRequestInput): Promise<IosCertificateBundle> {
  const forge = await getForge()
  const keyPair = await generateKeyPair()
  const csr = forge.pki.createCertificationRequest()
  csr.publicKey = keyPair.publicKey
  csr.setSubject(toForgeAttributes(input))
  csr.sign(keyPair.privateKey, forge.md.sha256.create())

  const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey)
  const csrPem = forge.pki.certificationRequestToPem(csr)

  return {
    summary: {
      subject: formatSubject(input),
      keyType: `RSA ${KEY_SIZE}`,
      hashAlgorithm: 'SHA-256',
    },
    files: [
      {
        fileName: 'ios-certificate-request.csr',
        mimeType: 'application/pkcs10',
        encoding: 'text',
        content: csrPem,
      },
      {
        fileName: 'ios-private-key.pem',
        mimeType: 'application/x-pem-file',
        encoding: 'text',
        content: privateKeyPem,
      },
    ],
  }
}

export async function createAndroidKeystoreBundle(input: AndroidKeystoreInput): Promise<AndroidKeystoreBundle> {
  const forge = await getForge()
  const keyPair = await generateKeyPair()
  const certificate = forge.pki.createCertificate()
  certificate.publicKey = keyPair.publicKey
  certificate.serialNumber = randomSerialNumber(forge)
  certificate.validity.notBefore = new Date()
  certificate.validity.notAfter = new Date(certificate.validity.notBefore)
  certificate.validity.notAfter.setFullYear(certificate.validity.notBefore.getFullYear() + input.validityYears)
  const subject = toForgeAttributes(input)
  certificate.setSubject(subject)
  certificate.setIssuer(subject)
  certificate.setExtensions([
    { name: 'basicConstraints', cA: false },
    { name: 'keyUsage', digitalSignature: true, keyEncipherment: true },
    { name: 'extKeyUsage', codeSigning: true, emailProtection: false, serverAuth: false, clientAuth: false },
    { name: 'subjectKeyIdentifier' },
  ])
  certificate.sign(keyPair.privateKey, forge.md.sha256.create())

  const pkcs12 = forge.pkcs12.toPkcs12Asn1(keyPair.privateKey, certificate, input.password, {
    algorithm: '3des',
    friendlyName: input.alias,
    generateLocalKeyId: true,
  })

  const pkcs12Buffer = Buffer.from(forge.asn1.toDer(pkcs12).getBytes(), 'binary')
  const certificateBuffer = Buffer.from(forge.asn1.toDer(forge.pki.certificateToAsn1(certificate)).getBytes(), 'binary')
  const certificatePem = forge.pki.certificateToPem(certificate)

  return {
    summary: {
      subject: formatSubject(input),
      alias: input.alias,
      validityYears: input.validityYears,
      fingerprintSha1: formatFingerprint(certificateBuffer, 'sha1'),
      fingerprintSha256: formatFingerprint(certificateBuffer, 'sha256'),
    },
    files: [
      {
        fileName: `${input.alias}.p12`,
        mimeType: 'application/x-pkcs12',
        encoding: 'base64',
        content: pkcs12Buffer.toString('base64'),
      },
      {
        fileName: `${input.alias}-certificate.pem`,
        mimeType: 'application/x-pem-file',
        encoding: 'text',
        content: certificatePem,
      },
    ],
  }
}
