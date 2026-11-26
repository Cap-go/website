import m from '@/copy/messages'
import type { PageBreadcrumb } from '@/lib/pageBreadcrumbSchema'
import { breadcrumbGraphOptions, createBreadcrumbListForValidation } from '@/lib/pageBreadcrumbSchema'
import { getAbsoluteLocaleUrl } from '@/services/links'

export type { PageBreadcrumb } from '@/lib/pageBreadcrumbSchema'
export { breadcrumbGraphOptions, createBreadcrumbListForValidation }

export function buildSectionHubBreadcrumbs(locale: string, baseUrl: string, hubPath: string, hubName: string): PageBreadcrumb[] {
  return [
    { name: m.home({}, { locale }), url: getAbsoluteLocaleUrl(baseUrl, locale, '/') },
    { name: hubName, url: getAbsoluteLocaleUrl(baseUrl, locale, hubPath) },
  ]
}

export function buildAlternativesPageBreadcrumbs(locale: string, baseUrl: string, currentName: string, pagePath: string): PageBreadcrumb[] {
  return buildSectionPageBreadcrumbs(locale, baseUrl, 'alternatives/', m.alternatives({}, { locale }), currentName, pagePath)
}

export function buildSolutionsPageBreadcrumbs(locale: string, baseUrl: string, currentName: string, pagePath: string): PageBreadcrumb[] {
  return buildSectionPageBreadcrumbs(locale, baseUrl, 'solutions/', m.solutions({}, { locale }), currentName, pagePath)
}

function buildSectionPageBreadcrumbs(locale: string, baseUrl: string, hubPath: string, hubName: string, currentName: string, pagePath: string): PageBreadcrumb[] {
  const normalizedPagePath = pagePath.replace(/^\//, '')
  return [
    { name: m.home({}, { locale }), url: getAbsoluteLocaleUrl(baseUrl, locale, '/') },
    { name: hubName, url: getAbsoluteLocaleUrl(baseUrl, locale, hubPath) },
    { name: currentName, url: getAbsoluteLocaleUrl(baseUrl, locale, normalizedPagePath) },
  ]
}
