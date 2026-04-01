import { createUdidMobileconfig, signMobileconfig } from '@/lib/tools/udid'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  const baseUrl = new URL(request.url)
  const callbackUrl = new URL('/api/tools/ios-udid-finder/callback', baseUrl).toString()
  const profile = createUdidMobileconfig({
    callbackUrl,
    organization: 'Capgo',
    displayName: 'Capgo Device Identifier',
    description: 'Install this profile to retrieve your iPhone or iPad UDID and device details.',
    challenge: 'capgo-udid-finder',
  })

  const signedProfile = await signMobileconfig(profile)

  return new Response(signedProfile ?? profile, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Disposition': 'attachment; filename="capgo-udid.mobileconfig"',
      'Content-Type': 'application/x-apple-aspen-config',
    },
  })
}
