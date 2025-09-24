import '@dotenvx/dotenvx/config'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { relative } from 'node:path'
import { ANTHROPIC_MODEL } from '../translate'

const localeToLanguage: Record<string, string> = {
  ja: 'Japanese',
  ko: 'Korean',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  it: 'Italian',
  id: 'Indonesian',
}

async function callAnthropic(body: Record<string, any>): Promise<string> {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY
  if (!anthropicApiKey) throw new Error('ANTHROPIC_API_KEY environment variable is required')
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Anthropic API error: ${response.status} ${await response.text()}`)
  const data = await response.json()
  return data.content[0]?.text?.trim() || ''
}

async function main() {
  const files = await fg(['src/content/blog/**/*.md'], {
    ignore: ['src/content/blog/en/**'],
    absolute: true,
    dot: true,
  })
  const checks: Array<{
    file: string
    title: string
    locale: string
    language: string
  }> = []

  for (const file of files) {
    const raw = readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(raw)
    const title = frontmatter.title
    const locale = frontmatter.locale
    if (!title || !locale) continue
    const language = localeToLanguage[locale] || locale
    checks.push({
      file: relative(process.cwd(), file),
      title,
      locale,
      language,
    })
  }

  const batch = 30
  const outputPath = 'remove_mismatching_locales_results.json'
  const results = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, 'utf8')) : []

  for (let i = 0; i < checks.length; i += batch) {
    const items = checks.slice(i, i + batch)
    const callPromises = items.map((item) =>
      (async () => {
        const systemPrompt = `You are a language detection assistant. For the following guide, check if the title is written in the language specified by the locale. Reply in a JSON object with fields: "isMatch" (true/false), "detectedLanguage", "localePassed", and "reason".`
        const userPrompt = `Guide:\nTitle: ${item.title}\nLocale: ${item.locale} (${item.language})\n\nDoes the title match the locale language?`
        const resultText = await callAnthropic({
          max_tokens: 4000,
          system: systemPrompt,
          model: ANTHROPIC_MODEL,
          messages: [
            {
              role: 'user',
              content: userPrompt,
            },
          ],
        })
        const match = resultText.match(/\{[\s\S]*\}/)
        return { ...(match ? JSON.parse(match[0]) : { error: 'No JSON found', raw: resultText }), ...item }
      })(),
    )
    const guideResults = await Promise.all(callPromises)
    results.push(...guideResults)
    writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8')
    console.log(`Guide ${i + 1} done, results written to ${outputPath}`)
  }

  for (const result of results) {
    if (!result.isMatch) {
      if (existsSync(result.file)) {
        unlinkSync(result.file)
      }
    }
  }
}

main()
