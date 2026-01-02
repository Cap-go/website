/**
 * SEO Checker Reporter
 * Formats and outputs check results
 */

import * as fs from 'node:fs'
import type { SEOIssue, CheckResult, Severity } from './types'

// ANSI color codes
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
}

/**
 * Get color for severity
 */
function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case 'error':
      return COLORS.red
    case 'warning':
      return COLORS.yellow
    case 'notice':
      return COLORS.blue
  }
}

/**
 * Get icon for severity
 */
function getSeverityIcon(severity: Severity): string {
  switch (severity) {
    case 'error':
      return 'x'
    case 'warning':
      return '!'
    case 'notice':
      return 'i'
  }
}

/**
 * Format a single issue for console output
 */
function formatIssueConsole(issue: SEOIssue): string {
  const color = getSeverityColor(issue.severity)
  const icon = getSeverityIcon(issue.severity)

  let output = `${color}${COLORS.bold}[${icon}]${COLORS.reset} `
  output += `${color}${issue.ruleId}${COLORS.reset}: ${issue.ruleName}\n`
  output += `    ${COLORS.dim}File:${COLORS.reset} ${issue.relativePath}\n`

  if (issue.element) {
    output += `    ${COLORS.dim}Element:${COLORS.reset} ${issue.element}\n`
  }

  if (issue.actual && issue.expected) {
    output += `    ${COLORS.dim}Found:${COLORS.reset} ${issue.actual}, ${COLORS.dim}Expected:${COLORS.reset} ${issue.expected}\n`
  } else if (issue.actual) {
    output += `    ${COLORS.dim}Found:${COLORS.reset} ${issue.actual}\n`
  }

  output += `    ${COLORS.dim}Fix:${COLORS.reset} ${issue.fixHint}`

  return output
}

/**
 * Format results for console output
 */
export function formatConsoleReport(result: CheckResult): string {
  const lines: string[] = []

  lines.push('')
  lines.push(`${COLORS.bold}${COLORS.cyan}SEO Static Analysis Report${COLORS.reset}`)
  lines.push('='.repeat(50))
  lines.push('')

  // Group issues by category
  const issuesByCategory = new Map<string, SEOIssue[]>()
  for (const issue of result.issues) {
    const existing = issuesByCategory.get(issue.category) || []
    existing.push(issue)
    issuesByCategory.set(issue.category, existing)
  }

  // Sort categories by issue count
  const sortedCategories = [...issuesByCategory.entries()].sort((a, b) => b[1].length - a[1].length)

  for (const [category, issues] of sortedCategories) {
    lines.push(`${COLORS.bold}${category}${COLORS.reset} (${issues.length} issues)`)
    lines.push('-'.repeat(40))

    // Sort issues by severity
    const sortedIssues = issues.sort((a, b) => {
      const severityOrder: Record<Severity, number> = { error: 0, warning: 1, notice: 2 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })

    for (const issue of sortedIssues) {
      lines.push(formatIssueConsole(issue))
      lines.push('')
    }
  }

  // Summary
  lines.push('')
  lines.push(`${COLORS.bold}Summary${COLORS.reset}`)
  lines.push('='.repeat(50))
  lines.push(`  Total pages scanned: ${result.stats.totalPages}`)
  lines.push(`  Total images checked: ${result.stats.totalImages}`)
  lines.push(`  Total links checked: ${result.stats.totalLinks}`)
  lines.push('')

  lines.push(`  Issues by severity:`)
  lines.push(`    ${COLORS.red}Errors:${COLORS.reset}   ${result.stats.issuesBySeverity.error || 0}`)
  lines.push(`    ${COLORS.yellow}Warnings:${COLORS.reset} ${result.stats.issuesBySeverity.warning || 0}`)
  lines.push(`    ${COLORS.blue}Notices:${COLORS.reset}  ${result.stats.issuesBySeverity.notice || 0}`)
  lines.push('')

  if (result.excludedCount > 0) {
    lines.push(`  ${COLORS.dim}Excluded issues: ${result.excludedCount}${COLORS.reset}`)
  }

  lines.push(`  Duration: ${result.duration}ms`)
  lines.push('')

  const totalIssues =
    (result.stats.issuesBySeverity.error || 0) +
    (result.stats.issuesBySeverity.warning || 0) +
    (result.stats.issuesBySeverity.notice || 0)

  if (totalIssues === 0) {
    lines.push(`${COLORS.bold}${COLORS.cyan}All SEO checks passed!${COLORS.reset}`)
  } else {
    lines.push(`${COLORS.bold}Found ${totalIssues} issues${COLORS.reset}`)
  }

  lines.push('')

  return lines.join('\n')
}

/**
 * Format results as JSON
 */
export function formatJsonReport(result: CheckResult): string {
  return JSON.stringify(result, null, 2)
}

/**
 * Format results as SARIF (Static Analysis Results Interchange Format)
 * This format is supported by many CI/CD tools and code editors
 */
export function formatSarifReport(result: CheckResult): string {
  const sarifSeverityMap: Record<Severity, 'error' | 'warning' | 'note'> = {
    error: 'error',
    warning: 'warning',
    notice: 'note',
  }

  const sarif = {
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'SEO Static Checker',
            version: '1.0.0',
            informationUri: 'https://capgo.app',
            rules: [...new Set(result.issues.map((i) => i.ruleId))].map((ruleId) => {
              const issue = result.issues.find((i) => i.ruleId === ruleId)
              return {
                id: ruleId,
                name: issue?.ruleName || ruleId,
                shortDescription: {
                  text: issue?.ruleName || ruleId,
                },
                defaultConfiguration: {
                  level: sarifSeverityMap[issue?.severity || 'notice'],
                },
                helpUri: `https://capgo.app/docs/seo/${ruleId}`,
              }
            }),
          },
        },
        results: result.issues.map((issue) => ({
          ruleId: issue.ruleId,
          level: sarifSeverityMap[issue.severity],
          message: {
            text: `${issue.ruleName}${issue.element ? `: ${issue.element}` : ''}. ${issue.fixHint}`,
          },
          locations: [
            {
              physicalLocation: {
                artifactLocation: {
                  uri: issue.relativePath,
                },
                region: issue.line
                  ? {
                      startLine: issue.line,
                    }
                  : undefined,
              },
            },
          ],
          fingerprints: {
            primary: issue.fingerprint,
          },
        })),
      },
    ],
  }

  return JSON.stringify(sarif, null, 2)
}

/**
 * Write report to file
 */
export function writeReport(
  result: CheckResult,
  format: 'console' | 'json' | 'sarif',
  filePath: string
): void {
  let content: string

  switch (format) {
    case 'json':
      content = formatJsonReport(result)
      break
    case 'sarif':
      content = formatSarifReport(result)
      break
    default:
      // Strip ANSI codes for file output
      content = formatConsoleReport(result).replace(/\x1b\[[0-9;]*m/g, '')
  }

  fs.writeFileSync(filePath, content, 'utf-8')
}

/**
 * Print report to console
 */
export function printReport(result: CheckResult): void {
  console.log(formatConsoleReport(result))
}
