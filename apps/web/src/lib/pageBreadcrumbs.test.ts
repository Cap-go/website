import { expect, test } from 'bun:test'
import { breadcrumbGraphOptions, createBreadcrumbListForValidation, type PageBreadcrumb } from './pageBreadcrumbSchema'

const sampleCrumbs: PageBreadcrumb[] = [
  { name: 'Home', url: 'https://capgo.app/' },
  { name: 'Alternatives', url: 'https://capgo.app/alternatives/' },
  { name: 'Bitrise', url: 'https://capgo.app/alternatives/bitrise/' },
]

test('createBreadcrumbListForValidation matches schema.org BreadcrumbList shape', () => {
  const json = createBreadcrumbListForValidation(sampleCrumbs[2].url, sampleCrumbs)
  expect(json['@type']).toBe('BreadcrumbList')
  expect(json.itemListElement).toHaveLength(3)
  expect(json.itemListElement[0].position).toBe(1)
  expect(json.itemListElement[2].item.url).toBe('https://capgo.app/alternatives/bitrise/')
})

test('breadcrumbGraphOptions supplies ld+json merge fields', () => {
  expect(breadcrumbGraphOptions(sampleCrumbs)).toEqual({
    includeBreadcrumbs: true,
    breadcrumbId: 'https://capgo.app/alternatives/bitrise/',
    breadcrumbs: sampleCrumbs,
  })
})