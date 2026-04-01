let forgePromise: Promise<any> | undefined

async function getForge(): Promise<any> {
  forgePromise ||= import('node-forge').then((module) => module.default ?? module)
  return await forgePromise
}

export interface UdidProfileOptions {
  callbackUrl: string
  organization: string
  displayName: string
  description: string
  challenge?: string
}

export interface UdidDevicePayload {
  udid: string
  deviceName: string
  product: string
  version: string
  serial: string
  imei: string
  meid: string
  challenge: string
}

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

function normalizePem(value: string | undefined): string {
  return String(value ?? '')
    .replaceAll('\\n', '\n')
    .trim()
}

export function createUdidMobileconfig(options: UdidProfileOptions): string {
  const payloadUuid = crypto.randomUUID().toUpperCase()
  const challengeBlock = options.challenge ? `<key>Challenge</key>\n      <string>${escapeXml(options.challenge)}</string>` : ''

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>PayloadContent</key>
    <dict>
      <key>URL</key>
      <string>${escapeXml(options.callbackUrl)}</string>
      <key>DeviceAttributes</key>
      <array>
        <string>UDID</string>
        <string>DEVICE_NAME</string>
        <string>PRODUCT</string>
        <string>VERSION</string>
        <string>SERIAL</string>
        <string>IMEI</string>
        <string>MEID</string>
      </array>
      ${challengeBlock}
    </dict>
    <key>PayloadOrganization</key>
    <string>${escapeXml(options.organization)}</string>
    <key>PayloadDisplayName</key>
    <string>${escapeXml(options.displayName)}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadUUID</key>
    <string>${payloadUuid}</string>
    <key>PayloadIdentifier</key>
    <string>app.capgo.tools.udid.${payloadUuid.toLowerCase()}</string>
    <key>PayloadDescription</key>
    <string>${escapeXml(options.description)}</string>
    <key>PayloadType</key>
    <string>Profile Service</string>
  </dict>
</plist>`
}

export async function signMobileconfig(profileXml: string): Promise<Buffer | null> {
  const certificatePem = normalizePem(import.meta.env.IOS_UDID_PROFILE_SIGNING_CERT_PEM)
  const privateKeyPem = normalizePem(import.meta.env.IOS_UDID_PROFILE_SIGNING_KEY_PEM)
  const chainPem = normalizePem(import.meta.env.IOS_UDID_PROFILE_SIGNING_CHAIN_PEM)

  if (!certificatePem || !privateKeyPem) {
    return null
  }

  const forge = await getForge()
  const signingCertificate = forge.pki.certificateFromPem(certificatePem)
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)
  const signedData = forge.pkcs7.createSignedData()
  signedData.content = forge.util.createBuffer(profileXml, 'utf8')
  signedData.addCertificate(signingCertificate)

  if (chainPem) {
    const matches = chainPem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) || []
    for (const certificate of matches) {
      signedData.addCertificate(forge.pki.certificateFromPem(certificate))
    }
  }

  signedData.addSigner({
    key: privateKey,
    certificate: signingCertificate,
    digestAlgorithm: forge.pki.oids.sha256,
    authenticatedAttributes: [
      {
        type: forge.pki.oids.contentType,
        value: forge.pki.oids.data,
      },
      {
        type: forge.pki.oids.messageDigest,
      },
      {
        type: forge.pki.oids.signingTime,
        value: new Date(),
      },
    ],
  })

  signedData.sign({ detached: false })
  return Buffer.from(forge.asn1.toDer(signedData.toAsn1()).getBytes(), 'binary')
}

export function extractPlistXml(rawBody: string): string | null {
  const match = rawBody.match(/<plist[\s\S]*<\/plist>/i)
  return match ? match[0] : null
}

function decodeXml(value: string): string {
  return value.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&amp;', '&')
}

export function parseUdidDevicePayload(plistXml: string): UdidDevicePayload {
  const values: Record<string, string> = {}
  const matcher = /<key>([\s\S]*?)<\/key>\s*(?:<string>([\s\S]*?)<\/string>|<integer>([\s\S]*?)<\/integer>|<data>([\s\S]*?)<\/data>|<(true|false)\s*\/>)/gi

  for (const match of plistXml.matchAll(matcher)) {
    const key = decodeXml((match[1] || '').trim())
    const stringValue = match[2] ?? match[3] ?? match[4] ?? match[5] ?? ''
    values[key] = decodeXml(stringValue.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim())
  }

  return {
    udid: values.UDID || '',
    deviceName: values.DEVICE_NAME || '',
    product: values.PRODUCT || '',
    version: values.VERSION || '',
    serial: values.SERIAL || '',
    imei: values.IMEI || '',
    meid: values.MEID || '',
    challenge: values.CHALLENGE || '',
  }
}

export function encodePayload(payload: UdidDevicePayload): string {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')
}

export function decodePayload(value: string | null): UdidDevicePayload | null {
  if (!value) return null
  try {
    const decoded = Buffer.from(value, 'base64url').toString('utf8')
    const parsed = JSON.parse(decoded) as Partial<UdidDevicePayload>
    return {
      udid: String(parsed.udid ?? ''),
      deviceName: String(parsed.deviceName ?? ''),
      product: String(parsed.product ?? ''),
      version: String(parsed.version ?? ''),
      serial: String(parsed.serial ?? ''),
      imei: String(parsed.imei ?? ''),
      meid: String(parsed.meid ?? ''),
      challenge: String(parsed.challenge ?? ''),
    }
  } catch {
    return null
  }
}
