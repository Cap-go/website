/**
 * SEO Static Checker
 * Main entry point for SEO analysis of the dist folder
 *
 * Usage:
 *   bun run scripts/seo-checker/index.ts [options]
 *
 * Options:
 *   --dist <path>      Path to dist folder (default: ./dist)
 *   --config <path>    Path to config file
 *   --output <format>  Output format: console, json, sarif (default: console)
 *   --report <path>    Path to write report file
 *   --fail-on <level>  Fail on: error, warning, notice (default: error)
 *   --max-issues <n>   Maximum issues before stopping
 *   --generate-config  Generate a sample config file
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import type { SEOCheckerConfig, CheckResult, Severity, SEOIssue } from './types'
import { scanDistFolder } from './parser'
import { runPageChecks, checkDuplicates } from './checks'
import { filterExcludedIssues, filterDisabledRules, loadExclusionsFromFile } from './exclusions'
import { printReport, writeReport, formatJsonReport } from './reporter'

/**
 * Default configuration
 */
const DEFAULT_CONFIG: SEOCheckerConfig = {
  distPath: './dist',
  baseUrl: 'https://capgo.app',
  languages: [
    'en',
    'fr',
    'de',
    'es',
    'it',
    'pt',
    'ja',
    'ko',
    'zh',
    'ru',
    'nl',
    'pl',
    'uk',
    'id',
    'ar',
  ],
  defaultLanguage: 'en',
  rules: {
    disabled: [],
    severityOverrides: {},
    thresholdOverrides: {},
  },
  exclusions: [],
  failOn: ['error'],
  maxIssues: 0,
  outputFormat: 'console',
}

/**
 * Load configuration from file
 */
function loadConfig(configPath: string): Partial<SEOCheckerConfig> {
  try {
    const content = fs.readFileSync(configPath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Failed to load config from ${configPath}:`, error)
    return {}
  }
}

/**
 * Merge configurations
 */
function mergeConfig(
  base: SEOCheckerConfig,
  overrides: Partial<SEOCheckerConfig>
): SEOCheckerConfig {
  return {
    ...base,
    ...overrides,
    rules: {
      ...base.rules,
      ...overrides.rules,
      disabled: [...(base.rules?.disabled || []), ...(overrides.rules?.disabled || [])],
    },
    exclusions: [...(base.exclusions || []), ...(overrides.exclusions || [])],
    failOn: overrides.failOn || base.failOn,
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(): {
  configPath?: string
  distPath?: string
  outputFormat?: 'console' | 'json' | 'sarif'
  reportPath?: string
  failOn?: Severity[]
  maxIssues?: number
  generateConfig?: boolean
} {
  const args = process.argv.slice(2)
  const result: Record<string, unknown> = {}

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--config':
        result.configPath = args[++i]
        break
      case '--dist':
        result.distPath = args[++i]
        break
      case '--output':
        result.outputFormat = args[++i] as 'console' | 'json' | 'sarif'
        break
      case '--report':
        result.reportPath = args[++i]
        break
      case '--fail-on':
        result.failOn = args[++i].split(',') as Severity[]
        break
      case '--max-issues':
        result.maxIssues = parseInt(args[++i], 10)
        break
      case '--generate-config':
        result.generateConfig = true
        break
    }
  }

  return result
}

/**
 * Generate sample configuration file
 */
function generateSampleConfig(): void {
  const sampleConfig = {
    distPath: './dist',
    baseUrl: 'https://example.com',
    languages: ['en', 'es', 'fr', 'de'],
    defaultLanguage: 'en',
    rules: {
      disabled: ['SEO00186', 'SEO00189'],
      severityOverrides: {
        SEO00135: 'notice',
      },
      thresholdOverrides: {
        SEO00020: 70,
      },
    },
    exclusions: [
      {
        ruleId: 'SEO00147',
        filePath: '404.html',
        reason: '404 page intentionally has broken link examples',
      },
      {
        fingerprint: 'SEO00088::Home - My Site',
        reason: 'Home title is intentionally the same across locales',
      },
      {
        ruleId: 'SEO00153',
        elementPattern: '^/icons/.*\\.svg$',
        reason: 'Icon SVGs are decorative',
      },
    ],
    failOn: ['error'],
    maxIssues: 0,
    outputFormat: 'console',
  }

  const outputPath = 'seo-checker.config.json'
  fs.writeFileSync(outputPath, JSON.stringify(sampleConfig, null, 2))
  console.log(`Generated sample config at ${outputPath}`)
}

/**
 * Run the SEO checker
 */
async function run(): Promise<void> {
  const startTime = Date.now()
  const args = parseArgs()

  // Generate config if requested
  if (args.generateConfig) {
    generateSampleConfig()
    process.exit(0)
  }

  // Build configuration
  let config = { ...DEFAULT_CONFIG }

  // Load config file if specified or if default exists
  const configPath = args.configPath || 'seo-checker.config.json'
  if (fs.existsSync(configPath)) {
    const fileConfig = loadConfig(configPath)
    config = mergeConfig(config, fileConfig)
    console.log(`Loaded config from ${configPath}`)
  }

  // Load exclusions file if exists
  const exclusionsPath = 'seo-checker.exclusions.json'
  if (fs.existsSync(exclusionsPath)) {
    const fileExclusions = loadExclusionsFromFile(exclusionsPath)
    config.exclusions = [...(config.exclusions || []), ...fileExclusions]
    console.log(`Loaded ${fileExclusions.length} exclusions from ${exclusionsPath}`)
  }

  // Override with command line args
  if (args.distPath) config.distPath = args.distPath
  if (args.outputFormat) config.outputFormat = args.outputFormat
  if (args.reportPath) config.reportPath = args.reportPath
  if (args.failOn) config.failOn = args.failOn
  if (args.maxIssues) config.maxIssues = args.maxIssues

  // Resolve dist path
  config.distPath = path.resolve(process.cwd(), config.distPath)

  // Check if dist folder exists
  if (!fs.existsSync(config.distPath)) {
    console.error(`Error: dist folder not found at ${config.distPath}`)
    console.error('Run the build command first: bun run build')
    process.exit(1)
  }

  console.log(`Scanning dist folder: ${config.distPath}`)
  console.log('')

  // Scan dist folder
  const siteData = await scanDistFolder(config)
  console.log(`Found ${siteData.pages.size} pages, ${siteData.imageFiles.size} images`)

  // Run checks on all pages
  let allIssues: SEOIssue[] = []
  let totalLinks = 0
  let totalImages = 0

  for (const [, page] of siteData.pages) {
    const pageIssues = runPageChecks(page, config, siteData)
    allIssues.push(...pageIssues)
    totalLinks += page.links.length
    totalImages += page.images.length

    // Check max issues limit
    if (config.maxIssues && allIssues.length >= config.maxIssues) {
      console.log(`Reached max issues limit (${config.maxIssues}), stopping scan...`)
      break
    }
  }

  // Run site-wide duplicate checks
  const duplicateIssues = checkDuplicates(siteData, config)
  allIssues.push(...duplicateIssues)

  // Filter disabled rules
  allIssues = filterDisabledRules(allIssues, config)

  // Filter exclusions
  const { filtered, excludedCount } = filterExcludedIssues(allIssues, config)
  allIssues = filtered

  const duration = Date.now() - startTime

  // Calculate stats
  const issuesByCategory: Record<string, number> = {}
  const issuesBySeverity: Record<Severity, number> = { error: 0, warning: 0, notice: 0 }
  const issuesByRule: Record<string, number> = {}

  for (const issue of allIssues) {
    issuesByCategory[issue.category] = (issuesByCategory[issue.category] || 0) + 1
    issuesBySeverity[issue.severity] = (issuesBySeverity[issue.severity] || 0) + 1
    issuesByRule[issue.ruleId] = (issuesByRule[issue.ruleId] || 0) + 1
  }

  const result: CheckResult = {
    issues: allIssues,
    stats: {
      totalPages: siteData.pages.size,
      totalImages,
      totalLinks,
      issuesByCategory,
      issuesBySeverity,
      issuesByRule,
    },
    excludedCount,
    duration,
  }

  // Output results
  if (config.outputFormat === 'json') {
    console.log(formatJsonReport(result))
  } else {
    printReport(result)
  }

  // Write report file if specified
  if (config.reportPath) {
    writeReport(result, config.outputFormat || 'console', config.reportPath)
    console.log(`Report written to ${config.reportPath}`)
  }

  // Determine exit code
  const failOn = config.failOn || ['error']
  let shouldFail = false

  for (const severity of failOn) {
    if (issuesBySeverity[severity] > 0) {
      shouldFail = true
      break
    }
  }

  if (shouldFail) {
    const failingSeverities = failOn.filter((s) => issuesBySeverity[s] > 0)
    console.error(
      `\nFailed: Found ${failingSeverities.map((s) => `${issuesBySeverity[s]} ${s}(s)`).join(', ')}`
    )
    process.exit(1)
  }

  console.log('\nSEO check completed successfully!')
  process.exit(0)
}

// Run the checker
run().catch((error) => {
  console.error('SEO Checker failed:', error)
  process.exit(1)
})
