/**
 * SEO Rules Definition
 * Loads rules from JSON file (auto-generated from CSV with 1152 rules)
 */

import type { SEORule } from './types'
import rulesData from './rules.json'

export const SEO_RULES: SEORule[] = rulesData as SEORule[]

// Helper to get a rule by ID
export function getRule(id: string): SEORule | undefined {
  return SEO_RULES.find(r => r.id === id)
}

// Helper to get rules by category
export function getRulesByCategory(category: string): SEORule[] {
  return SEO_RULES.filter(r => r.category === category)
}

// Helper to get rules by severity
export function getRulesBySeverity(severity: 'error' | 'warning' | 'notice'): SEORule[] {
  return SEO_RULES.filter(r => r.severity === severity)
}
