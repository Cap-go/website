#!/usr/bin/env bun

/**
 * Fetches GitHub stars and OSS repo stats for all plugins in plugins.ts.
 * Run with: bun run scripts/fetch-github-stars.ts
 */

import { actions } from '../apps/web/src/config/plugins'

const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN
const CAPGO_OWNER = 'cap-go'
const REFRESH_STATS = process.env.GITHUB_STATS_REFRESH === 'true'
const REFRESH_CONTRIBUTORS = process.env.GITHUB_REFRESH_CONTRIBUTORS === 'true'
const GRAPHQL_BATCH_SIZE = Number.parseInt(process.env.GITHUB_GRAPHQL_BATCH_SIZE ?? '20', 10)
const CONTRIBUTOR_CONCURRENCY = Number.parseInt(process.env.GITHUB_CONTRIBUTOR_CONCURRENCY ?? '2', 10)
const CONTRIBUTOR_DELAY_MS = Number.parseInt(process.env.GITHUB_CONTRIBUTOR_DELAY_MS ?? '250', 10)
const STARS_OUTPUT_PATH = new URL('../apps/web/src/data/github-stars.json', import.meta.url).pathname
const STATS_OUTPUT_PATH = new URL('../apps/web/src/data/github-stats.json', import.meta.url).pathname

type RepoRef = {
  owner: string
  repo: string
}

type RepositoryStats = {
  url: string
  stars: number
  versionTags: number
  releases: number
  closedIssues: number
  mergedPullRequests: number
  contributors: number
}

type GraphQLRepositoryStats = {
  stars: number
  versionTags: number
  releases: number
  closedIssues: number
  mergedPullRequests: number
}

type PreviousStats = Partial<{
  contributorCount: number
  repositories: Record<string, Partial<RepositoryStats>>
}>

const githubHeaders = {
  Authorization: `Bearer ${GITHUB_TOKEN ?? ''}`,
  Accept: 'application/vnd.github.v3+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

const createRepoKey = ({ owner, repo }: RepoRef) => `${owner}/${repo}`
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Extract owner and repo from GitHub URL
const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
  const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)(?:[/?#].*)?$/i)

  if (!match) {
    return null
  }

  return { owner: match[1], repo: match[2].replace(/\.git$/, '') }
}

const getRetryDelayMs = (response: Response, attempt: number) => {
  const retryAfter = response.headers.get('retry-after')
  if (retryAfter) {
    const retryAfterSeconds = Number.parseInt(retryAfter, 10)
    if (Number.isFinite(retryAfterSeconds)) return retryAfterSeconds * 1000
  }

  const rateLimitRemaining = response.headers.get('x-ratelimit-remaining')
  const rateLimitReset = response.headers.get('x-ratelimit-reset')
  if (rateLimitRemaining === '0' && rateLimitReset) {
    const resetAt = Number.parseInt(rateLimitReset, 10) * 1000
    if (Number.isFinite(resetAt)) return Math.max(resetAt - Date.now() + 1000, 1000)
  }

  return Math.min(30000, attempt * 5000)
}

const fetchJsonWithRetry = async <T>(url: string, label: string): Promise<T | null> => {
  for (let attempt = 1; attempt <= 5; attempt++) {
    let response: Response

    try {
      response = await fetch(url, { headers: githubHeaders })
    } catch (error) {
      const delayMs = Math.min(30000, attempt * 5000)
      console.warn(`Error fetching ${label}, attempt ${attempt}, retrying in ${delayMs / 1000}s:`, error)
      await sleep(delayMs)
      continue
    }

    if (response.ok) return (await response.json()) as T

    if (![403, 429, 500, 502, 503, 504].includes(response.status)) {
      console.warn(`Failed to fetch ${label}: ${response.status}`)
      return null
    }

    const delayMs = getRetryDelayMs(response, attempt)
    console.warn(`Rate limited or temporarily blocked fetching ${label}: ${response.status}, retrying in ${Math.ceil(delayMs / 1000)}s`)
    await sleep(delayMs)
  }

  console.warn(`Gave up fetching ${label} after 5 attempts`)
  return null
}

const readPreviousStats = async (): Promise<PreviousStats | null> => {
  try {
    const file = Bun.file(STATS_OUTPUT_PATH)
    if (!(await file.exists())) return null
    return (await file.json()) as PreviousStats
  } catch (error) {
    console.warn(`Could not read previous GitHub stats cache:`, error)
    return null
  }
}

const readPreviousStars = async (): Promise<Record<string, number>> => {
  try {
    const file = Bun.file(STARS_OUTPUT_PATH)
    if (!(await file.exists())) return {}
    return (await file.json()) as Record<string, number>
  } catch (error) {
    console.warn(`Could not read previous GitHub stars cache:`, error)
    return {}
  }
}

const hasCompleteGitHubCache = (previousStars: Record<string, number>, previousStats: PreviousStats | null, githubUrls: string[], capgoRepoRefs: RepoRef[]) => {
  if (!previousStats?.repositories || typeof previousStats.contributorCount !== 'number') return false
  if (!githubUrls.every((url) => typeof previousStars[url] === 'number')) return false

  return capgoRepoRefs.every((repo) => {
    const repoStats = previousStats.repositories?.[createRepoKey(repo)]
    return (
      typeof repoStats?.stars === 'number' &&
      typeof repoStats.contributors === 'number' &&
      typeof repoStats.versionTags === 'number' &&
      typeof repoStats.releases === 'number' &&
      typeof repoStats.closedIssues === 'number' &&
      typeof repoStats.mergedPullRequests === 'number'
    )
  })
}

const fetchRepositoryGraphQLStats = async (repos: RepoRef[]): Promise<Record<string, GraphQLRepositoryStats>> => {
  const stats: Record<string, GraphQLRepositoryStats> = {}
  const batchSize = Math.max(1, Number.isFinite(GRAPHQL_BATCH_SIZE) ? GRAPHQL_BATCH_SIZE : 20)

  for (let i = 0; i < repos.length; i += batchSize) {
    const batch = repos.slice(i, i + batchSize)
    const query = `query {
${batch
  .map(
    (repo, index) => `  repo${index}: repository(owner: ${JSON.stringify(repo.owner)}, name: ${JSON.stringify(repo.repo)}) {
    stargazerCount
    refs(refPrefix: "refs/tags/", first: 1) {
      totalCount
    }
    releases(first: 1) {
      totalCount
    }
    issues(states: CLOSED) {
      totalCount
    }
    pullRequests(states: MERGED) {
      totalCount
    }
  }`,
  )
  .join('\n')}
}`

    let response: Response | null = null

    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            ...githubHeaders,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })
      } catch (error) {
        const delayMs = Math.min(30000, attempt * 5000)
        console.warn(`Error fetching repository stats batch ${Math.floor(i / batchSize) + 1}, retrying in ${Math.ceil(delayMs / 1000)}s:`, error)
        await sleep(delayMs)
        continue
      }

      if (response.ok) break

      if (![403, 429, 500, 502, 503, 504].includes(response.status)) {
        console.warn(`Failed to fetch repository stats batch ${Math.floor(i / batchSize) + 1}: ${response.status}`)
        response = null
        break
      }

      const delayMs = getRetryDelayMs(response, attempt)
      console.warn(
        `Rate limited or temporarily blocked fetching repository stats batch ${Math.floor(i / batchSize) + 1}: ${response.status}, retrying in ${Math.ceil(delayMs / 1000)}s`,
      )
      await sleep(delayMs)
    }

    if (!response?.ok) continue

    const data = await response.json()

    if (data.errors?.length) {
      console.warn(`GitHub GraphQL returned ${data.errors.length} error(s) for stats batch ${Math.floor(i / batchSize) + 1}`)
    }

    for (let index = 0; index < batch.length; index++) {
      const repo = batch[index]
      const repoData = data.data?.[`repo${index}`]
      if (!repoData) continue

      stats[createRepoKey(repo)] = {
        stars: repoData.stargazerCount ?? 0,
        versionTags: repoData.refs?.totalCount ?? 0,
        releases: repoData.releases?.totalCount ?? 0,
        closedIssues: repoData.issues?.totalCount ?? 0,
        mergedPullRequests: repoData.pullRequests?.totalCount ?? 0,
      }
    }
  }

  return stats
}

const isHumanContributor = (item: { login?: string; type?: string }) => {
  const login = item.login?.toLowerCase() ?? ''

  return item.type !== 'Bot' && !login.endsWith('[bot]') && !['dependabot', 'renovate-bot', 'github-actions'].includes(login)
}

const fetchContributorLogins = async (repoRef: RepoRef): Promise<Set<string>> => {
  const contributors = new Set<string>()
  let page = 1

  while (true) {
    const data = await fetchJsonWithRetry<{ login?: string; type?: string }[]>(
      `https://api.github.com/repos/${repoRef.owner}/${repoRef.repo}/contributors?per_page=100&anon=false&page=${page}`,
      `contributors for ${createRepoKey(repoRef)} page ${page}`,
    )
    if (!Array.isArray(data) || data.length === 0) break

    for (const contributor of data) {
      if (contributor.login && isHumanContributor(contributor)) {
        contributors.add(contributor.login)
      }
    }

    if (data.length < 100) break
    page++
  }

  return contributors
}

const getCachedContributors = (previousStats: PreviousStats | null, repos: RepoRef[]) => {
  if (!previousStats?.repositories || typeof previousStats.contributorCount !== 'number') return null

  const contributorsByRepoKey: Record<string, number> = {}
  let missingRepoCount = 0

  for (const repo of repos) {
    const key = createRepoKey(repo)
    const count = previousStats.repositories[key]?.contributors
    contributorsByRepoKey[key] = typeof count === 'number' ? count : 0
    if (typeof count !== 'number') missingRepoCount++
  }

  return {
    contributorCount: previousStats.contributorCount,
    contributorsByRepoKey,
    missingRepoCount,
  }
}

async function main() {
  console.log('Fetching GitHub stats for all plugins...')

  const githubUrls = [...new Set(actions.map((p) => p.href).filter((url) => url.includes('github.com')))]
  const repoRefsByKey = new Map<string, RepoRef>()
  const urlToRepoKey = new Map<string, string>()

  console.log(`Found ${githubUrls.length} unique GitHub URLs`)

  for (const url of githubUrls) {
    const repoRef = parseGitHubUrl(url)
    if (!repoRef) continue

    const key = createRepoKey(repoRef)
    repoRefsByKey.set(key, repoRef)
    urlToRepoKey.set(url, key)
  }

  const repoRefs = [...repoRefsByKey.values()]
  const capgoRepoRefs = repoRefs.filter((repo) => repo.owner.toLowerCase() === CAPGO_OWNER)

  console.log(`Found ${repoRefs.length} unique GitHub repositories`)
  console.log(`Found ${capgoRepoRefs.length} Cap-go repositories for OSS totals`)

  const [previousStats, previousStars] = await Promise.all([readPreviousStats(), readPreviousStars()])

  if (!REFRESH_STATS && !REFRESH_CONTRIBUTORS) {
    if (hasCompleteGitHubCache(previousStars, previousStats, githubUrls, capgoRepoRefs)) {
      console.log('Using cached GitHub stats. Set GITHUB_STATS_REFRESH=true to refresh from GitHub.')
      return
    }

    console.warn('GitHub cache is incomplete. Set GITHUB_STATS_REFRESH=true to refresh from GitHub.')
    return
  }

  if (!GITHUB_TOKEN) {
    console.log('No GitHub token found, skipping GitHub stats fetch')
    process.exit(0)
  }

  const stars: Record<string, number> = {}

  console.log('Fetching stars, merged PR, closed issue, release, and tag counts...')
  const repoGraphQLStats = await fetchRepositoryGraphQLStats(repoRefs)

  for (const url of githubUrls) {
    const repoKey = urlToRepoKey.get(url)
    if (!repoKey) continue

    const count = repoGraphQLStats[repoKey]?.stars ?? previousStats?.repositories?.[repoKey]?.stars ?? previousStars[url]
    if (count !== undefined) {
      stars[url] = count
    }
  }

  const cachedContributors = REFRESH_STATS || REFRESH_CONTRIBUTORS ? null : getCachedContributors(previousStats, capgoRepoRefs)
  const contributorsByRepoKey: Record<string, number> = cachedContributors?.contributorsByRepoKey ?? {}
  let contributorCount = cachedContributors?.contributorCount ?? 0

  if (cachedContributors) {
    console.log('Using cached contributor counts. Set GITHUB_REFRESH_CONTRIBUTORS=true to refresh them.')
    if (cachedContributors.missingRepoCount > 0) {
      console.log(`${cachedContributors.missingRepoCount} repo(s) are missing cached contributor counts and will use 0 until contributors are refreshed.`)
    }
  } else {
    console.log('Fetching contributor lists...')
    const contributorLogins = new Set<string>()
    const batchSize = Math.max(1, Number.isFinite(CONTRIBUTOR_CONCURRENCY) ? CONTRIBUTOR_CONCURRENCY : 2)

    for (let i = 0; i < capgoRepoRefs.length; i += batchSize) {
      const batch = capgoRepoRefs.slice(i, i + batchSize)
      const results = await Promise.all(
        batch.map(async (repoRef) => {
          const logins = await fetchContributorLogins(repoRef)
          return { repoRef, logins }
        }),
      )

      for (const { repoRef, logins } of results) {
        const key = createRepoKey(repoRef)
        contributorsByRepoKey[key] = logins.size
        for (const login of logins) {
          contributorLogins.add(login)
        }
        console.log(`  ${key}: ${logins.size} contributors`)
      }

      if (i + batchSize < capgoRepoRefs.length) {
        await sleep(Math.max(0, Number.isFinite(CONTRIBUTOR_DELAY_MS) ? CONTRIBUTOR_DELAY_MS : 250))
      }
    }

    contributorCount = contributorLogins.size
  }

  const repositories = Object.fromEntries(
    capgoRepoRefs.map((repoRef) => {
      const key = createRepoKey(repoRef)
      const previousRepoStats = previousStats?.repositories?.[key]
      const repoStats = repoGraphQLStats[key] ?? {
        stars: previousRepoStats?.stars ?? 0,
        versionTags: previousRepoStats?.versionTags ?? 0,
        releases: previousRepoStats?.releases ?? 0,
        closedIssues: previousRepoStats?.closedIssues ?? 0,
        mergedPullRequests: previousRepoStats?.mergedPullRequests ?? 0,
      }

      return [
        key,
        {
          url: `https://github.com/${key}`,
          stars: repoStats.stars,
          contributors: contributorsByRepoKey[key] ?? 0,
          ...repoStats,
        } satisfies RepositoryStats,
      ]
    }),
  )

  const totals = Object.values(repositories).reduce(
    (acc, repo) => ({
      stars: acc.stars + repo.stars,
      versionTags: acc.versionTags + repo.versionTags,
      releases: acc.releases + repo.releases,
      closedIssues: acc.closedIssues + repo.closedIssues,
      mergedPullRequests: acc.mergedPullRequests + repo.mergedPullRequests,
      resolvedItems: acc.resolvedItems + repo.closedIssues + repo.mergedPullRequests,
    }),
    {
      stars: 0,
      versionTags: 0,
      releases: 0,
      closedIssues: 0,
      mergedPullRequests: 0,
      resolvedItems: 0,
    },
  )

  const stats = {
    repositoryCount: capgoRepoRefs.length,
    contributorCount,
    versionCount: totals.versionTags,
    releaseCount: totals.releases,
    closedIssueCount: totals.closedIssues,
    mergedPullRequestCount: totals.mergedPullRequests,
    resolvedItemCount: totals.resolvedItems,
    totalStars: totals.stars,
    repositories,
  }

  await Bun.write(STARS_OUTPUT_PATH, `${JSON.stringify(stars, null, 2)}\n`)
  await Bun.write(STATS_OUTPUT_PATH, `${JSON.stringify(stats, null, 2)}\n`)

  console.log(`\nSaved ${Object.keys(stars).length} star counts to ${STARS_OUTPUT_PATH}`)
  console.log(`Saved OSS stats to ${STATS_OUTPUT_PATH}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
