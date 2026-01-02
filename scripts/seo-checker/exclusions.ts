/**
 * Exclusion System for SEO Checker
 * Allows skipping specific issues that are known to be acceptable
 */

import * as fs from 'node:fs'
import type { SEOIssue, ExclusionRule, SEOCheckerConfig } from './types'

/**
 * Check if a path matches a glob pattern
 * Simple glob matching supporting * and **
 */
function matchGlob(pattern: string, path: string): boolean {
  // Escape special regex chars except * and **
  const regexPattern = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '<<<GLOBSTAR>>>')
    .replace(/\*/g, '[^/]*')
    .replace(/<<<GLOBSTAR>>>/g, '.*')

  try {
    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(path)
  } catch {
    // Invalid regex pattern - skip this match
    return false
  }
}

/**
 * Check if an issue should be excluded based on exclusion rules
 */
export function shouldExcludeIssue(issue: SEOIssue, exclusions: ExclusionRule[]): boolean {
  for (const rule of exclusions) {
    // Most specific: fingerprint match
    if (rule.fingerprint && rule.fingerprint === issue.fingerprint) {
      return true
    }

    // Rule ID match
    if (rule.ruleId && rule.ruleId !== issue.ruleId) {
      continue
    }

    // File path pattern match
    if (rule.filePath) {
      if (!matchGlob(rule.filePath, issue.relativePath)) {
        continue
      }
    }

    // Element pattern match
    if (rule.elementPattern && issue.element) {
      try {
        const regex = new RegExp(rule.elementPattern)
        if (!regex.test(issue.element)) {
          continue
        }
      } catch {
        // Invalid regex pattern - skip this rule
        continue
      }
    }

    // If we got here, the rule matches
    // At least one criteria must have been specified
    if (rule.fingerprint || rule.ruleId || rule.filePath || rule.elementPattern) {
      return true
    }
  }

  return false
}

/**
 * Filter issues based on exclusion rules
 */
export function filterExcludedIssues(
  issues: SEOIssue[],
  config: SEOCheckerConfig
): { filtered: SEOIssue[]; excludedCount: number } {
  const exclusions = config.exclusions || []

  if (exclusions.length === 0) {
    return { filtered: issues, excludedCount: 0 }
  }

  const filtered: SEOIssue[] = []
  let excludedCount = 0

  for (const issue of issues) {
    if (shouldExcludeIssue(issue, exclusions)) {
      excludedCount++
    } else {
      filtered.push(issue)
    }
  }

  return { filtered, excludedCount }
}

/**
 * Filter issues based on disabled rules
 */
export function filterDisabledRules(issues: SEOIssue[], config: SEOCheckerConfig): SEOIssue[] {
  const disabled = config.rules?.disabled || []

  if (disabled.length === 0) {
    return issues
  }

  const disabledSet = new Set(disabled)
  return issues.filter((issue) => !disabledSet.has(issue.ruleId))
}

/**
 * Load exclusions from a JSON file
 */
export function loadExclusionsFromFile(filePath: string): ExclusionRule[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content)

    if (Array.isArray(data.exclusions)) {
      return data.exclusions
    }

    if (Array.isArray(data)) {
      return data
    }

    return []
  } catch {
    return []
  }
}

/**
 * Generate an exclusion rule from an issue
 * This can be used to help users create exclusions
 */
export function generateExclusionForIssue(issue: SEOIssue, scope: 'fingerprint' | 'file' | 'rule'): ExclusionRule {
  switch (scope) {
    case 'fingerprint':
      return {
        fingerprint: issue.fingerprint,
        reason: `Excluded: ${issue.ruleName} on ${issue.relativePath}`,
      }
    case 'file':
      return {
        ruleId: issue.ruleId,
        filePath: issue.relativePath,
        reason: `Excluded ${issue.ruleId} for file: ${issue.relativePath}`,
      }
    case 'rule':
      return {
        ruleId: issue.ruleId,
        reason: `Excluded rule: ${issue.ruleName}`,
      }
  }
}

/**
 * Export exclusion rules to a JSON file
 */
export function exportExclusionsToFile(exclusions: ExclusionRule[], filePath: string): void {
  const content = JSON.stringify({ exclusions }, null, 2)
  fs.writeFileSync(filePath, content, 'utf-8')
}
