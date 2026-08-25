export const CAPGO_ORIGIN = 'https://capgo.app'
export const CAPGO_API_ORIGIN = 'https://api.capgo.app'
export const OPENAPI_ASSET_PATH = '/.well-known/capgo-public-api-openapi.json'

export const OPENAPI_ALIAS_PATHS = new Set(['/openapi.json', '/.well-known/openapi.json', '/api/openapi.json'])

export const MCP_MANIFEST_PATHS = new Set(['/mcp.json', '/.well-known/mcp.json'])

export const MCP_ENDPOINT_PATHS = new Set(['/mcp', '/mcp/'])

export const LLMS_TXT_PATHS = new Set(['/llms.txt'])

export const CAPGO_POSTAL_ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: 'Sepapaja 6',
  postalCode: '15551',
  addressLocality: 'Tallinn',
  addressCountry: 'EE',
}

export const CAPGO_LEGAL_NAME = 'Digital Shift OÜ'

export const WHEN_TO_USE_MARKDOWN = `## When to use Capgo

Use Capgo when the job is Capacitor, Ionic, Cordova, or Electron **live updates**, or Capgo **native iOS/Android builds**:

- Ship a JavaScript/CSS/HTML over-the-air update without waiting for App Store or Play Store review
- Upload, promote, pause, or roll back a signed web bundle on a channel
- Pin one device to a channel or inspect who received a release
- Request a native binary build from CI and follow build status
- Automate organizations, apps, channels, bundles, devices, or stats through the public REST API

Do not use Capgo as a generic CMS, a React Native CodePush host, or a way to skip store review after native code, permissions, or SDK changes.

### How an agent should call Capgo

1. Read [${CAPGO_ORIGIN}/llms.txt](${CAPGO_ORIGIN}/llms.txt) and the OpenAPI spec at [${CAPGO_ORIGIN}/openapi.json](${CAPGO_ORIGIN}/openapi.json).
2. For documented, function-calling-friendly HTTP tools, connect to the Streamable HTTP MCP server at \`${CAPGO_ORIGIN}/mcp\`.
3. For authenticated account mutations (upload a bundle, change a channel, request a build), run \`npx @capgo/cli@latest mcp\` locally after \`npx @capgo/cli@latest login\`.
4. For raw REST, send header \`x-api-key: <key>\` to \`${CAPGO_API_ORIGIN}\`. Legacy \`authorization: <key>\` (no Bearer prefix) is still accepted.
`

export const AGENT_NOT_FOUND_MARKDOWN = `# Page not found

This path does not exist on Capgo. It is a real HTTP 404, not an application shell.

## Where to look next

- [Home](${CAPGO_ORIGIN}/)
- [Documentation index](${CAPGO_ORIGIN}/docs/)
- [Public API](${CAPGO_ORIGIN}/docs/public-api/)
- [OpenAPI spec](${CAPGO_ORIGIN}/openapi.json)
- [llms.txt](${CAPGO_ORIGIN}/llms.txt)
- [Sitemap](${CAPGO_ORIGIN}/sitemap-index.xml)
- [MCP manifest](${CAPGO_ORIGIN}/.well-known/mcp.json)
- [Contact](${CAPGO_ORIGIN}/contact/)
- [About](${CAPGO_ORIGIN}/about/)
- [Privacy](${CAPGO_ORIGIN}/privacy/)

${WHEN_TO_USE_MARKDOWN}
`

export const MCP_TOOLS = [
  {
    name: 'capgo_when_to_use',
    description: 'Return when Capgo is the right tool (Capacitor/Ionic/Cordova/Electron live updates and native builds) and how an agent should call the API, MCP, or CLI.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'capgo_get_openapi',
    description: 'Return the Capgo public REST API OpenAPI URL, authentication headers, base URL, and rate limits for LLM function calling.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'capgo_list_docs',
    description: 'Return canonical Capgo documentation, API, CLI MCP, and trust-page links an agent should fetch next.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Optional topic such as live-updates, public-api, cli, native-build, or contact.',
        },
      },
      additionalProperties: false,
    },
  },
] as const

export function mcpManifest() {
  return {
    name: 'Capgo',
    title: 'Capgo MCP',
    description:
      'Streamable HTTP MCP server for Capgo live updates and native builds. Use it to learn when Capgo fits, load the public OpenAPI spec, and route to docs. Mutating a customer account still uses the local CLI MCP.',
    websiteUrl: CAPGO_ORIGIN,
    documentationUrl: `${CAPGO_ORIGIN}/docs/cli/reference/mcp/`,
    protocolVersion: '2025-03-26',
    transport: {
      type: 'streamable-http',
      url: `${CAPGO_ORIGIN}/mcp`,
    },
    capabilities: {
      tools: {},
    },
    tools: MCP_TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
    })),
    localServers: [
      {
        name: 'capgo-cli',
        transport: 'stdio',
        command: 'npx',
        args: ['@capgo/cli@latest', 'mcp'],
        documentationUrl: `${CAPGO_ORIGIN}/docs/cli/reference/mcp/`,
      },
    ],
  }
}

function parseAcceptQuality(params: string[]): number {
  let q = 1
  for (const param of params) {
    const trimmed = param.trim()
    if (!/^q=/i.test(trimmed)) continue
    const raw = trimmed.slice(trimmed.indexOf('=') + 1)
    if (!/^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(raw)) return Number.NaN
    q = Number(raw)
  }
  return q
}

function mediaQuality(accept: string, typePattern: RegExp): { q: number; index: number } | null {
  let best: { q: number; index: number } | null = null
  for (const [index, part] of accept.split(',').entries()) {
    const [rawType, ...params] = part.trim().split(';')
    const type = rawType.trim()
    if (!typePattern.test(type)) continue
    const q = parseAcceptQuality(params)
    if (Number.isNaN(q) || q < 0 || q > 1) continue
    if (!best || q > best.q || (q === best.q && index < best.index)) {
      best = { q, index }
    }
  }
  return best
}

export function prefersMarkdown(request: Request): boolean {
  const accept = request.headers.get('Accept') || ''
  const markdown = mediaQuality(accept, /^text\/(?:x-)?markdown$/i)
  if (!markdown || markdown.q <= 0) return false
  const html = mediaQuality(accept, /^text\/html$/i)
  const textStar = mediaQuality(accept, /^text\/\*$/i)
  const starStar = mediaQuality(accept, /^\*\/\*$/)
  const competitor = html || textStar || starStar
  if (!competitor || competitor.q <= 0) return true
  if (markdown.q !== competitor.q) return markdown.q > competitor.q
  const competitorIsWildcard = competitor === textStar || competitor === starStar
  if (competitorIsWildcard) return true
  return markdown.index < competitor.index
}

export function markdownNotFoundResponse(request?: Request): Response {
  return new Response(request?.method === 'HEAD' ? null : AGENT_NOT_FOUND_MARKDOWN, {
    status: 404,
    statusText: 'Not Found',
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  })
}

export function stripRewrittenAssetHeaders(headers: Headers): Headers {
  headers.delete('Content-Length')
  headers.delete('Content-MD5')
  headers.delete('Content-Encoding')
  headers.delete('ETag')
  headers.delete('Last-Modified')
  return headers
}

export function withLlmsWhenToUse(body: string): string {
  if (body.includes('## When to use Capgo')) return body
  const headingMatch = body.match(/^# .+$/m)
  if (!headingMatch || headingMatch.index === undefined) {
    return `${WHEN_TO_USE_MARKDOWN}\n\n${body}`
  }
  const insertAt = headingMatch.index + headingMatch[0].length
  const rest = body.slice(insertAt).replace(/^\n+/, '\n\n')
  return `${body.slice(0, insertAt)}\n\n${WHEN_TO_USE_MARKDOWN}${rest}`
}

export { mediaQuality }

export function docsIndexForTopic(topic?: string): string {
  const normalized = (topic || '').trim().toLowerCase()
  const catalog = [
    ['live-updates', `${CAPGO_ORIGIN}/docs/live-updates/`, 'Channel rollouts, encryption, and rollback for Capacitor live updates.'],
    ['public-api', `${CAPGO_ORIGIN}/docs/public-api/`, 'REST API for organizations, apps, channels, bundles, devices, and stats.'],
    ['cli', `${CAPGO_ORIGIN}/docs/cli/`, 'CLI commands including bundle upload and the local MCP server.'],
    ['native-build', `${CAPGO_ORIGIN}/docs/builder/`, 'Cloud native iOS and Android builds.'],
    ['openapi', `${CAPGO_ORIGIN}/openapi.json`, 'Machine-readable OpenAPI 3.1 document for function calling.'],
    ['contact', `${CAPGO_ORIGIN}/contact/`, 'Support email, sales email, chat, and company address.'],
  ] as const

  const rows = normalized ? catalog.filter(([key]) => key.includes(normalized) || normalized.includes(key)) : catalog
  const picked = rows.length ? rows : catalog
  return picked.map(([key, url, description]) => `- ${key}: ${url} — ${description}`).join('\n')
}
