import { getPublicGithubReleases, GITHUB_RELEASES_CACHE_TTL_SECONDS, GITHUB_RELEASES_PATH } from '../lib/publicGithubReleases'
import { cachedJsonResponse } from './cached-json'
import type { BackgroundContext } from './types'

export interface GithubReleasesEnv {
  PERSONAL_ACCESS_TOKEN?: string
}

export async function handleGithubReleases(request: Request, env: GithubReleasesEnv, ctx?: BackgroundContext): Promise<Response> {
  const token = env.PERSONAL_ACCESS_TOKEN?.trim() || undefined
  return cachedJsonResponse(
    request,
    GITHUB_RELEASES_PATH,
    GITHUB_RELEASES_CACHE_TTL_SECONDS,
    () => getPublicGithubReleases({ token }),
    'GitHub releases are temporarily unavailable',
    ctx,
  )
}

export { GITHUB_RELEASES_PATH }
