import { createUdidMobileconfig, signMobileconfig } from '@/lib/tools/udid'
import type { APIRoute } from 'astro'

const UDID_CALLBACK_PATH = '/api/tools/ios-udid-finder/callback'
const UDID_CHALLENGE_COOKIE = 'ios_udid_challenge'
const UDID_CHALLENGE_TTL = 300

export const GET: APIRoute = async ({ request }) => {
  const baseUrl = new URL(request.url)
  const challenge = crypto.randomUUID()
  const callbackUrl = new URL(UDID_CALLBACK_PATH, baseUrl)
  callbackUrl.searchParams.set('challenge', challenge)
  const profile = createUdidMobileconfig({
    callbackUrl: callbackUrl.toString(),
    organization: 'Capgo',
    displayName: 'Capgo Device Identifier',
    description: 'Install this profile to retrieve your iPhone or iPad UDID and device details.',
    challenge,
  })

  const signedProfile = await signMobileconfig(profile)
  const secure = baseUrl.protocol === 'https:'

  return new Response(signedProfile ?? profile, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Disposition': 'attachment; filename="capgo-udid.mobileconfig"',
      'Content-Type': 'application/x-apple-aspen-config',
      'Set-Cookie': `${UDID_CHALLENGE_COOKIE}=${challenge}; Max-Age=${UDID_CHALLENGE_TTL}; Path=${UDID_CALLBACK_PATH}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`,
    },
  })
}
