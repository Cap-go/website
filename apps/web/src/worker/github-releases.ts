import { getPublicGithubReleases, GITHUB_RELEASES_CACHE_TTL_SECONDS, GITHUB_RELEASES_PATH } from '../lib/publicGithubReleases'
import { cachedJsonResponse } from './cached-json'
import type { BackgroundContext } from './types'

export async function handleGithubReleases(request: Request, ctx?: BackgroundContext): Promise<Response> {
  return cachedJsonResponse(request, GITHUB_RELEASES_PATH, GITHUB_RELEASES_CACHE_TTL_SECONDS, () => getPublicGithubReleases(), 'GitHub releases are temporarily unavailable', ctx)
}

export { GITHUB_RELEASES_PATH }
