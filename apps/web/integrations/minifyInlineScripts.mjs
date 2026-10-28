import { transform } from 'esbuild'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Astro emits `is:inline` and `define:vars` scripts verbatim, comments and indentation included.
// They sit in the <head> of every page, ahead of the content, so on a slow connection each byte
// delays first paint. This minifies them in the built HTML. Classic scripts keep their top-level
// names, because esbuild only renames those when told the code is a module.
const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script>/g
const JS_TYPES = new Set(['', 'text/javascript', 'module'])

function scriptType(attrs) {
  if (/\ssrc\s*=/.test(attrs)) return null
  const type = /\stype\s*=\s*["']?([^"'\s>]+)/.exec(attrs)?.[1]?.toLowerCase() ?? ''
  return JS_TYPES.has(type) ? type : null
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* htmlFiles(path)
    else if (entry.name.endsWith('.html')) yield path
  }
}

export default function minifyInlineScripts() {
  return {
    name: 'capgo:minify-inline-scripts',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        // Most inline scripts are identical on every page, so minify each distinct one once.
        const cache = new Map()
        const minify = (code, type) => {
          const key = `${type}\0${code}`
          if (!cache.has(key)) {
            cache.set(
              key,
              transform(code, { minify: true, format: type === 'module' ? 'esm' : undefined, legalComments: 'none' })
                .then((result) => result.code.trim())
                .catch((error) => {
                  logger.warn(`kept an inline script unminified: ${error.message.split('\n')[0]}`)
                  return code
                }),
            )
          }
          return cache.get(key)
        }

        let files = 0
        let saved = 0
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8')
          const replacements = []
          for (const match of html.matchAll(SCRIPT_TAG)) {
            const type = scriptType(match[1])
            if (type === null || !match[2].trim()) continue
            replacements.push(minify(match[2], type).then((code) => ({ match, code })))
          }
          if (!replacements.length) continue
          let output = ''
          let last = 0
          for (const { match, code } of await Promise.all(replacements)) {
            output += `${html.slice(last, match.index)}<script${match[1]}>${code}</script>`
            last = match.index + match[0].length
          }
          output += html.slice(last)
          if (output.length < html.length) {
            await writeFile(file, output)
            files += 1
            saved += html.length - output.length
          }
        }
        logger.info(`minified inline scripts in ${files} pages, ${Math.round(saved / 1024)} KB saved`)
      },
    },
  }
}
