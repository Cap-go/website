import Bowser from 'bowser'

export function getRegistrationDevice(userAgent: string, maxTouchPoints: number) {
  const parsed = Bowser.parse(userAgent)
  const isIPadOS = /iPad/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1)

  return {
    registration_device_type: isIPadOS ? 'tablet' : (parsed.platform.type ?? 'unknown'),
    registration_os: isIPadOS ? 'iPadOS' : (parsed.os.name ?? 'unknown'),
    registration_browser: parsed.browser.name ?? 'unknown',
  }
}
