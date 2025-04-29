#!/usr/bin/env node

import { load } from 'js-yaml'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const lang = 'pl'
try {
  const yamlContent = readFileSync(join(process.cwd(), 'locales', `${lang}.yml`), 'utf8')
  const yamlData = load(yamlContent, {
    strict: true,
    lineWidth: -1,
  })

  if (!yamlData) {
    throw new Error('YAML data is empty')
  }

  const newJsonData = {
    $schema: 'https://inlang.com/schema/inlang-message-format',
    ...Object.entries(yamlData).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: typeof value === 'string' ? value : JSON.stringify(value),
      }),
      {},
    ),
  }

  writeFileSync(join(process.cwd(), 'messages', `${lang}.json`), JSON.stringify(newJsonData, null, 2))
  console.log('✅ File written successfully')
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
