#!/usr/bin/env bun

/**
 * Fetches GitHub stars for all plugins in plugins.ts and saves to a JSON file.
 * Run with: bun run scripts/fetch-github-stars.ts
 */

import { actions } from '../src/config/plugins'

const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN

if (!GITHUB_TOKEN) {
  console.log('No PERSONAL_ACCESS_TOKEN found, skipping GitHub stars fetch')
  process.exit(0)
}

// Extract owner and repo from GitHub URL
const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
  const patterns = [/github\.com\/([^/]+)\/([^/]+)\/?(?:tree\/.*)?$/, /github\.com\/([^/]+)\/([^/]+)$/]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\/$/, '') }
    }
  }
  return null
}

// Fetch stars for a single repo
const fetchStars = async (url: string): Promise<number | null> => {
  const parsed = parseGitHubUrl(url)
  if (!parsed) return null

  try {
    const apiUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      console.warn(`Failed to fetch stars for ${url}: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.stargazers_count ?? null
  } catch (error) {
    console.warn(`Error fetching stars for ${url}:`, error)
    return null
  }
}

async function main() {
  console.log('Fetching GitHub stars for all plugins...')

  const githubUrls = [...new Set(actions.map((p) => p.href).filter((url) => url.includes('github.com')))]

  console.log(`Found ${githubUrls.length} unique GitHub URLs`)

  const stars: Record<string, number> = {}
  const batchSize = 10

  for (let i = 0; i < githubUrls.length; i += batchSize) {
    const batch = githubUrls.slice(i, i + batchSize)
    const promises = batch.map(async (url) => {
      const count = await fetchStars(url)
      return { url, count }
    })

    const results = await Promise.all(promises)
    for (const { url, count } of results) {
      if (count !== null) {
        stars[url] = count
        console.log(`  ${url}: ${count} stars`)
      }
    }

    // Small delay between batches
    if (i + batchSize < githubUrls.length) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  // Write to JSON file
  const outputPath = new URL('../src/data/github-stars.json', import.meta.url).pathname
  await Bun.write(outputPath, JSON.stringify(stars, null, 2))

  console.log(`\nSaved ${Object.keys(stars).length} star counts to ${outputPath}`)
}

main().catch(console.error)
