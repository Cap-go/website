import { __translationWorkerTest } from '../src/index'

function assert(condition: unknown, message: string): void {
  if (!condition) throw new Error(message)
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <title>Capgo - Live Updates for Capacitor Apps</title>
    <script>
      !function(){for(var n=0;n<o.length;n++)g(o[n]);}();
    </script>
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>
    <h1>Ship mobile updates instantly to every user</h1>
    <svg><svg><text>Do not collect nested SVG text</text></svg><text>Do not collect outer SVG text</text></svg>
    <p>Translate the paragraph after a nested skipped SVG.</p>
    <script>if (current < total) console.log(current)</script>
    <p>Deploy fixes and features without waiting for app store review delays.</p>
  </body>
</html>`

const { parts, segments } = __translationWorkerTest.collectSegments(html)
const bodySegments = segments.filter((segment) => segment.inBody).map((segment) => segment.text)

assert(
  bodySegments.some((text) => text.includes('Skip to main content')),
  'Parser did not collect body text after a script with a less-than operator',
)
assert(
  bodySegments.some((text) => text.includes('Ship mobile updates instantly')),
  'Parser did not collect the body heading',
)
assert(
  bodySegments.every((text) => !text.includes('Do not collect')),
  'Parser collected text from a nested skipped SVG',
)
assert(
  bodySegments.some((text) => text.includes('paragraph after a nested skipped SVG')),
  'Parser did not resume body text after a nested skipped SVG',
)
assert(
  bodySegments.some((text) => text.includes('Deploy fixes and features')),
  'Parser did not collect the body paragraph after a skipped body script',
)

const translations = segments.map((segment) => (segment.inBody ? `FR: ${segment.text}` : segment.text))
const stats = __translationWorkerTest.bodyTranslationStats(segments, translations)
assert(stats.candidateCount > 0, 'Body translation validator found no body candidates')
assert(stats.changedCount > 0, 'Body translation validator did not detect changed body text')

const rendered = __translationWorkerTest.renderTranslatedHtml(parts, segments, translations)
assert(rendered.includes('FR: Ship mobile updates instantly to every user'), 'Renderer did not write translated body text')
assert(rendered.includes('current < total'), 'Renderer changed skipped script content')
