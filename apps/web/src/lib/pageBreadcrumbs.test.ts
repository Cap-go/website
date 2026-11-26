import { expect, test } from 'bun:test'
import { breadcrumbGraphOptions, type PageBreadcrumb } from './pageBreadcrumbSchema'

const sampleCrumbs: PageBreadcrumb[] = [
  { name: 'Home', url: 'https://capgo.app/' },
  { name: 'Alternatives', url: 'https://capgo.app/alternatives/' },
  { name: 'Bitrise', url: 'https://capgo.app/alternatives/bitrise/' },
]

test('breadcrumbGraphOptions supplies ld+json merge fields', () => {
  expect(breadcrumbGraphOptions(sampleCrumbs)).toEqual({
    includeBreadcrumbs: true,
    breadcrumbId: 'https://capgo.app/alternatives/bitrise/',
    breadcrumbs: sampleCrumbs,
  })
})