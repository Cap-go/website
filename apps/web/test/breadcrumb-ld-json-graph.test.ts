import { expect, test } from 'bun:test'
import { createLdJsonGraph, createWebPageLdJson } from '../src/lib/ldJson'
import { breadcrumbGraphOptions } from '../src/lib/pageBreadcrumbSchema'

const config = {
  brand: 'Capgo',
  blog_title: 'blog',
  blog_description: 'blog',
  blog_keywords: 'k',
  baseUrl: 'https://capgo.app',
  baseApiUrl: 'https://api.capgo.app',
}

test('createLdJsonGraph embeds a single BreadcrumbList for alternatives pages', () => {
  const pageUrl = 'https://capgo.app/alternatives/bitrise/'
  const crumbs = [
    { name: 'Home', url: 'https://capgo.app/' },
    { name: 'Alternatives', url: 'https://capgo.app/alternatives/' },
    { name: 'Bitrise', url: pageUrl },
  ]
  const graph = createLdJsonGraph(
    config,
    createWebPageLdJson(config, { name: 'Bitrise vs Capgo', description: 'Compare Bitrise', url: pageUrl }),
    {
      includeOrganization: true,
      ...breadcrumbGraphOptions(crumbs),
    },
  )

  const breadcrumbNodes = graph['@graph'].filter((node) => (node as { '@type'?: string })['@type'] === 'BreadcrumbList')
  expect(breadcrumbNodes).toHaveLength(1)
  expect(breadcrumbNodes[0].itemListElement).toHaveLength(3)
  expect(JSON.stringify(graph)).toContain('BreadcrumbList')
})