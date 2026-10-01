// Browser-safe .cer + private key -> .p12 conversion.
// node-forge is loaded lazily so the library only ships when the converter is used.

export class P12ConversionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'P12ConversionError'
  }
}

export interface P12ConversionInput {
  certificate: Uint8Array
  privateKey: string
  password: string
}

export interface P12ConversionResult {
  bytes: Uint8Array
  base64: string
  fileName: string
  summary: {
    commonName: string
    teamId: string
    expiresAt: Date
    expired: boolean
  }
}

let forgePromise: Promise<any> | undefined

async function getForge(): Promise<any> {
  forgePromise ||= import('node-forge').then((module) => module.default ?? module)
  return await forgePromise
}

function bytesToBinaryString(bytes: Uint8Array): string {
  let binary = ''
  const chunkSize = 0x8000
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize))
  }
  return binary
}

function binaryStringToBytes(binary: string): Uint8Array {
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

function parseCertificate(forge: any, data: Uint8Array): any {
  const text = new TextDecoder('utf-8', { fatal: false }).decode(data)
  try {
    if (text.includes('-----BEGIN CERTIFICATE-----')) {
      return forge.pki.certificateFromPem(text)
    }
    const asn1 = forge.asn1.fromDer(forge.util.createBuffer(bytesToBinaryString(data)))
    return forge.pki.certificateFromAsn1(asn1)
  } catch {
    throw new P12ConversionError('The certificate file could not be read. Select the .cer file downloaded from Apple Developer (DER or PEM format).')
  }
}

function parsePrivateKey(forge: any, pem: string): any {
  const text = pem.trim()
  if (text.includes('-----BEGIN ENCRYPTED PRIVATE KEY-----') || /Proc-Type:\s*4,ENCRYPTED/.test(text)) {
    throw new P12ConversionError('This private key is encrypted. Use the unencrypted .pem key from step 1, or decrypt it first with openssl.')
  }
  if (!text.includes('-----BEGIN RSA PRIVATE KEY-----') && !text.includes('-----BEGIN PRIVATE KEY-----')) {
    throw new P12ConversionError('The private key file is not a PEM private key. Select the ios-private-key.pem file you downloaded in step 1.')
  }
  try {
    return forge.pki.privateKeyFromPem(text)
  } catch {
    throw new P12ConversionError('The private key could not be read. Apple signing certificates use RSA keys; select the RSA .pem key from step 1.')
  }
}

function getSubjectField(certificate: any, shortName: string): string {
  const field = certificate.subject.getField(shortName)
  return field?.value ? String(field.value) : ''
}

function toSafeFileName(value: string): string {
  const cleaned = value
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
  return cleaned || 'certificate'
}

export async function convertCertificateToP12(input: P12ConversionInput): Promise<P12ConversionResult> {
  if (!input.password) {
    throw new P12ConversionError('Enter a password to protect the .p12 file.')
  }

  const forge = await getForge()
  const certificate = parseCertificate(forge, input.certificate)
  const privateKey = parsePrivateKey(forge, input.privateKey)

  const publicKey = certificate.publicKey
  if (!publicKey?.n || !publicKey?.e) {
    throw new P12ConversionError('This certificate does not contain an RSA public key, so it cannot be paired with the private key.')
  }
  if (!publicKey.n.equals(privateKey.n) || !publicKey.e.equals(privateKey.e)) {
    throw new P12ConversionError(
      'The certificate does not match this private key. Use the private key generated together with the CSR you uploaded to Apple for this certificate.',
    )
  }

  const commonName = getSubjectField(certificate, 'CN') || 'Apple certificate'
  const teamId = getSubjectField(certificate, 'OU')

  const p12Asn1 = forge.pkcs12.toPkcs12Asn1(privateKey, [certificate], input.password, {
    algorithm: '3des',
    friendlyName: commonName,
    generateLocalKeyId: true,
  })
  const der: string = forge.asn1.toDer(p12Asn1).getBytes()
  const expiresAt: Date = certificate.validity.notAfter

  return {
    bytes: binaryStringToBytes(der),
    base64: forge.util.encode64(der),
    fileName: `${toSafeFileName(commonName)}.p12`,
    summary: {
      commonName,
      teamId,
      expiresAt,
      expired: expiresAt.getTime() < Date.now(),
    },
  }
}
