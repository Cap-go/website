import type BowserType from 'bowser'

// Bowser is ~36 KB, so it stays out of the register page's startup bundle and loads after the page.
let bowser: Promise<{ default: typeof BowserType }> | undefined
const loadBowser = () => (bowser ??= import('bowser') as unknown as Promise<{ default: typeof BowserType }>)
if (typeof window !== 'undefined') addEventListener('load', () => void loadBowser().catch(() => {}), { once: true })

// Signup never waits longer than this for the parser; a stalled chunk only costs the device details.
const PARSER_WAIT_MS = 1500

export async function getRegistrationDevice(userAgent: string, maxTouchPoints: number) {
  const parser = await Promise.race([
    loadBowser().then(
      (module) => module.default,
      () => undefined,
    ),
    new Promise<undefined>((resolve) => setTimeout(resolve, PARSER_WAIT_MS)),
  ])
  const parsed = parser?.parse(userAgent)
  const isIPadOS = /iPad/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1)

  return {
    registration_device_type: isIPadOS ? 'tablet' : (parsed?.platform.type ?? 'unknown'),
    registration_os: isIPadOS ? 'iPadOS' : (parsed?.os.name ?? 'unknown'),
    registration_browser: parsed?.browser.name ?? 'unknown',
  }
}
