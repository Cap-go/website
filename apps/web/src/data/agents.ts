// One entry per AI agent landing page (/agents/<slug>/), rendered by src/pages/agents/[slug].astro.
// Every command and config here must match Capgo docs (apps/docs: docs/ai/mcp, docs/cli/reference/*)
// and the agent vendor's own docs. Never claim a marketplace listing that does not exist.

export type AgentType = 'cli' | 'ide' | 'app-builder' | 'chat'
export type InstallMethod = 'hosted-mcp' | 'local-mcp' | 'skills' | 'cli' | 'export'
export type ReleaseStage = 'build' | 'publish' | 'update' | 'rollback' | 'observe'

export interface AgentCode {
  /** Short label shown above the block, e.g. a file path or "Terminal". */
  label: string
  lang: 'shell' | 'json' | 'toml'
  code: string
}

export interface AgentSetupStep {
  title: string
  body: string
  code?: AgentCode
}

export interface AgentPrompt {
  stage: ReleaseStage
  text: string
}

export interface AgentLink {
  label: string
  /** Absolute URL, or a site path without leading slash (resolved with getRelativeLocaleUrl). */
  href: string
}

export interface Agent {
  slug: string
  name: string
  /** Public SVG path, or undefined to show the monogram. */
  logo?: string
  monogram: string
  /** Logo tile background color. */
  color: string
  type: AgentType
  methods: InstallMethod[]
  /** One-line card summary for the hub page. */
  summary: string
  /** Which "do I need an API key" answer applies. */
  auth: 'oauth' | 'mixed' | 'cli'
  /** Which "can it build without a Mac" answer applies. */
  build: 'local' | 'remote' | 'builder'
  /** Optional agent-specific answer to the build question. */
  buildAnswer?: string
  /** At most 3 steps. */
  setup: AgentSetupStep[]
  /** 6 to 8 prompts covering the release cycle. */
  prompts: AgentPrompt[]
  notes: string[]
  /** Extra FAQ entries specific to this agent (the page keeps at most 6 in total). */
  faqs: { question: string; answer: string }[]
  /** Vendor docs used to verify the setup, plus extra Capgo docs. */
  docs: AgentLink[]
  /** Three related agent slugs. */
  related: string[]
  keywords: string[]
}

const HOSTED_MCP_URL = 'https://api.capgo.app/mcp'
const LOCAL_MCP_COMMAND = 'npx @capgo/cli@latest mcp'
const LOGIN_COMMAND = 'npx @capgo/cli@latest login'
const SKILLS_COMMAND = 'npx skills add Cap-go/capgo-skills'

const json = (value: unknown) => JSON.stringify(value, null, 2)
const localServer = { command: 'npx', args: ['@capgo/cli@latest', 'mcp'] }

const fullCycle = (extra: AgentPrompt): AgentPrompt[] => [
  { stage: 'build', text: 'Build a signed iOS release of this app with Capgo Build.' },
  { stage: 'publish', text: 'Request an Android release build and send it to the Google Play internal track.' },
  { stage: 'update', text: 'Check if this change needs a native build or can ship as a live update.' },
  { stage: 'update', text: 'Build the web app and push this fix to the production channel.' },
  { stage: 'rollback', text: 'Roll back the last bundle on the production channel.' },
  { stage: 'observe', text: 'Show update stats for v2.3.0: how many devices have it and how many failed.' },
  { stage: 'observe', text: 'Why did my last iOS build fail? Read the build logs and suggest a fix.' },
  extra,
]

const hostedOnly = (extra: AgentPrompt): AgentPrompt[] => [
  { stage: 'build', text: 'What is the status of my last iOS build on Capgo?' },
  { stage: 'build', text: 'Why did my last Android build fail? Show me the logs.' },
  { stage: 'update', text: 'Set bundle 2.3.1 on the production channel of com.example.app.' },
  { stage: 'update', text: 'Pause the rollout on the production channel.' },
  { stage: 'rollback', text: 'Roll back the production channel to the previous bundle.' },
  { stage: 'observe', text: 'Show update stats for v2.3.0 over the last 7 days.' },
  { stage: 'observe', text: 'Which devices are still on bundle 1.4.2?' },
  extra,
]

const builderCycle = (extra: AgentPrompt): AgentPrompt[] => [
  { stage: 'build', text: 'Make this app ready for Capacitor: keep routing client-side and build static files to dist.' },
  { stage: 'build', text: 'Install @capgo/capacitor-updater and call notifyAppReady when the app starts.' },
  { stage: 'update', text: 'Add a GitHub Actions workflow that uploads a Capgo bundle to the production channel on every push to main.' },
  { stage: 'build', text: 'What is the status of my last iOS build on Capgo?' },
  { stage: 'rollback', text: 'Roll back the production channel to the previous bundle.' },
  { stage: 'observe', text: 'Show update stats for v2.3.0 over the last 7 days.' },
  extra,
]

const exportSteps = (name: string, getCode: AgentSetupStep): AgentSetupStep[] => [
  getCode,
  {
    title: 'Wrap it with Capacitor and Capgo',
    body: `Add Capacitor for iOS and Android, then let the Capgo CLI set up live updates. Use the build folder of your ${name} app as webDir (dist for Vite).`,
    code: {
      label: 'Terminal',
      lang: 'shell',
      code: [
        'npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android',
        'npx cap init "Your App" com.company.app --web-dir dist',
        'npx cap add ios && npx cap add android',
        'npx @capgo/cli@latest init',
      ].join('\n'),
    },
  },
  {
    title: 'Build in the cloud and ship updates',
    body: 'Capgo Build signs and builds the iOS and Android apps without a Mac. After that, every web change ships as a live update.',
    code: {
      label: 'Terminal',
      lang: 'shell',
      code: ['npx @capgo/cli@latest build init', 'npx @capgo/cli@latest build request --platform ios', 'npx @capgo/cli@latest bundle upload --channel production'].join('\n'),
    },
  },
]

export const agents: Agent[] = [
  {
    slug: 'claude-code',
    name: 'Claude Code',
    logo: '/agents/claude.svg',
    monogram: 'CC',
    color: '#c96442',
    type: 'cli',
    methods: ['hosted-mcp', 'local-mcp', 'skills', 'cli'],
    summary: 'Terminal agent. Builds, uploads, and rolls back with the hosted MCP, the local CLI MCP, Capgo skills, and the CLI.',
    auth: 'mixed',
    build: 'local',
    setup: [
      {
        title: 'Add the hosted Capgo MCP',
        body: 'Run this once, then type /mcp in Claude Code, pick capgo, and sign in. No API key needed.',
        code: { label: 'Terminal', lang: 'shell', code: `claude mcp add --transport http capgo ${HOSTED_MCP_URL}` },
      },
      {
        title: 'Add the local CLI MCP for builds and uploads',
        body: 'The local server reads your project, so Claude Code can upload bundles and request native builds. Log in once with a Capgo API key.',
        code: { label: 'Terminal', lang: 'shell', code: `${LOGIN_COMMAND}\nclaude mcp add --transport stdio capgo-cli -- ${LOCAL_MCP_COMMAND}` },
      },
      {
        title: 'Install the Capgo skills',
        body: 'Skills teach Claude Code the Capgo and Capacitor workflows: signing, store upload, channels, and migrations.',
        code: { label: 'Terminal', lang: 'shell', code: SKILLS_COMMAND },
      },
    ],
    prompts: fullCycle({ stage: 'publish', text: 'Submit the latest iOS build to App Store review with release notes from the last 10 commits.' }),
    notes: [
      'Claude Code runs commands in your terminal, so it can do every step: build, publish, live update, rollback, and stats.',
      'Use the hosted MCP for account work and the local CLI MCP when Claude Code needs your project files. You can add both.',
      'Add --scope user to make the servers available in every project, or --scope project to share them through .mcp.json.',
      'Prefer plugins? The Capgo skills repo is also a Claude Code plugin marketplace: claude plugin marketplace add Cap-go/capgo-skills.',
      'Tools that delete or overwrite data are marked as destructive, so Claude Code asks before it runs them.',
    ],
    faqs: [],
    docs: [
      { label: 'Claude Code MCP docs', href: 'https://code.claude.com/docs/en/mcp' },
      { label: 'Claude Code skills docs', href: 'https://code.claude.com/docs/en/skills' },
    ],
    related: ['codex', 'cursor', 'claude'],
    keywords: ['Claude Code iOS build', 'Claude Code live update'],
  },
  {
    slug: 'claude',
    name: 'Claude',
    logo: '/agents/claude.svg',
    monogram: 'C',
    color: '#c96442',
    type: 'chat',
    methods: ['hosted-mcp', 'local-mcp'],
    summary: 'Claude on the web and desktop. Add Capgo as a custom connector, and add the local CLI MCP in Claude Desktop for builds.',
    auth: 'mixed',
    build: 'remote',
    buildAnswer:
      'On the web, Claude can check build status, read build logs, and cancel builds through the Capgo connector. To start a build, add the local CLI MCP in Claude Desktop: it reads your project and sends it to Capgo Build.',
    setup: [
      {
        title: 'Add Capgo as a custom connector',
        body: 'In Claude, open Connectors in your settings and choose Add custom connector. Name it Capgo, paste this URL, click Connect, and sign in. No API key needed.',
        code: { label: 'Connector URL', lang: 'shell', code: HOSTED_MCP_URL },
      },
      {
        title: 'Optional: add the local CLI MCP in Claude Desktop',
        body: 'For bundle uploads and build requests, Claude Desktop can start the Capgo CLI on your computer. Run npx @capgo/cli@latest login once, open Settings, Developer, Edit Config, add this, and restart Claude.',
        code: { label: 'claude_desktop_config.json', lang: 'json', code: json({ mcpServers: { capgo: localServer } }) },
      },
    ],
    prompts: hostedOnly({ stage: 'observe', text: 'List my Capgo apps and the bundle on each production channel.' }),
    notes: [
      'The connector works in Claude on the web, desktop, and mobile. It cannot read files on your computer.',
      'The Free plan allows one custom connector. On Team and Enterprise, an owner adds the connector in organization settings first.',
      'Uploading a bundle or requesting a native build needs the local CLI MCP, which only runs in Claude Desktop.',
      'Each connected client gets its own key in the Capgo console. Delete it there to disconnect.',
    ],
    faqs: [],
    docs: [
      { label: 'Claude custom connectors help', href: 'https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp' },
      { label: 'Local MCP servers in Claude Desktop', href: 'https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop' },
    ],
    related: ['claude-code', 'chatgpt', 'cursor'],
    keywords: ['Claude connector mobile app', 'Claude Desktop MCP'],
  },
  {
    slug: 'codex',
    name: 'Codex',
    logo: '/agents/openai.svg',
    monogram: 'Cx',
    color: '#0d0d0d',
    type: 'cli',
    methods: ['hosted-mcp', 'local-mcp', 'skills', 'cli'],
    summary: 'OpenAI coding agent in the terminal and the Codex app. Ships builds and live updates with the Capgo MCP servers and skills.',
    auth: 'mixed',
    build: 'local',
    setup: [
      {
        title: 'Add the hosted Capgo MCP',
        body: 'Add the server, then sign in. Codex opens the Capgo consent page in your browser. No API key needed.',
        code: { label: 'Terminal', lang: 'shell', code: `codex mcp add capgo --url ${HOSTED_MCP_URL}\ncodex mcp login capgo` },
      },
      {
        title: 'Add the local CLI MCP for builds and uploads',
        body: 'Log in once with a Capgo API key, then register the local server. Codex stores both in ~/.codex/config.toml.',
        code: { label: 'Terminal', lang: 'shell', code: `${LOGIN_COMMAND}\ncodex mcp add capgo-cli -- ${LOCAL_MCP_COMMAND}` },
      },
      {
        title: 'Install the Capgo skills',
        body: 'Codex loads skills from .agents/skills. The installer puts them there for you.',
        code: { label: 'Terminal', lang: 'shell', code: SKILLS_COMMAND },
      },
    ],
    prompts: fullCycle({ stage: 'update', text: 'Upload this build to a new beta channel and give me a QR code to test it.' }),
    notes: [
      'Codex runs commands in your terminal, so it can build, upload, and roll back with the Capgo CLI too.',
      'Prefer editing config? Add [mcp_servers.capgo] with url = "https://api.capgo.app/mcp" to ~/.codex/config.toml, then run codex mcp login capgo.',
      'Do not skip codex mcp login: without it, Codex connects without signing in and the Capgo tools cannot reach your account.',
      'The same config works in the Codex IDE extension and the Codex app.',
    ],
    faqs: [],
    docs: [
      { label: 'Codex MCP docs', href: 'https://developers.openai.com/codex/mcp' },
      { label: 'Codex skills docs', href: 'https://developers.openai.com/codex/skills' },
    ],
    related: ['claude-code', 'cursor', 'gemini-cli'],
    keywords: ['OpenAI Codex mobile app', 'Codex config.toml MCP'],
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    logo: '/agents/cursor.svg',
    monogram: 'Cu',
    color: '#14120b',
    type: 'ide',
    methods: ['hosted-mcp', 'local-mcp', 'skills', 'cli'],
    summary: 'AI code editor. Add Capgo to mcp.json and let the agent build, publish, and live-update from your editor.',
    auth: 'mixed',
    build: 'local',
    setup: [
      {
        title: 'Add the hosted Capgo MCP',
        body: 'Add this to ~/.cursor/mcp.json for all projects, or .cursor/mcp.json for one. Cursor shows Needs login next to the server: click it to sign in. No API key needed.',
        code: { label: '~/.cursor/mcp.json', lang: 'json', code: json({ mcpServers: { capgo: { url: HOSTED_MCP_URL } } }) },
      },
      {
        title: 'Add the local CLI MCP for builds and uploads',
        body: 'Run npx @capgo/cli@latest login once in the terminal, then add the capgo-cli entry next to capgo.',
        code: { label: '~/.cursor/mcp.json', lang: 'json', code: json({ mcpServers: { capgo: { url: HOSTED_MCP_URL }, 'capgo-cli': localServer } }) },
      },
      {
        title: 'Install the Capgo skills',
        body: 'Cursor reads skills from .agents/skills and .cursor/skills.',
        code: { label: 'Terminal', lang: 'shell', code: SKILLS_COMMAND },
      },
    ],
    prompts: fullCycle({ stage: 'build', text: 'Run Capgo doctor on this project and fix what it reports before we build.' }),
    notes: [
      'The Cursor agent runs terminal commands, so it can also call the Capgo CLI directly.',
      'Cursor Cloud Agents do not get skills that only live on your machine. Commit .agents/skills to the repo to share them.',
      'Turn off tools you do not need in Cursor settings to keep the tool list short.',
    ],
    faqs: [],
    docs: [
      { label: 'Cursor MCP docs', href: 'https://cursor.com/docs/context/mcp' },
      { label: 'Cursor skills docs', href: 'https://cursor.com/docs/context/skills' },
    ],
    related: ['windsurf', 'github-copilot', 'claude-code'],
    keywords: ['Cursor mobile app', 'Cursor mcp.json Capgo'],
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    logo: '/agents/openai.svg',
    monogram: 'GPT',
    color: '#0d0d0d',
    type: 'chat',
    methods: ['hosted-mcp'],
    summary: 'Chat app. Connect the hosted Capgo MCP to manage channels, rollbacks, stats, and build logs from a chat.',
    auth: 'oauth',
    build: 'remote',
    setup: [
      {
        title: 'Turn on developer mode',
        body: 'In ChatGPT settings, open Apps, then Advanced settings, and turn on developer mode. In a workspace, an admin may need to allow it first.',
      },
      {
        title: 'Create the Capgo app',
        body: 'Create a new app or connector, name it Capgo, and paste this URL as the MCP server URL.',
        code: { label: 'MCP server URL', lang: 'shell', code: HOSTED_MCP_URL },
      },
      {
        title: 'Sign in to Capgo',
        body: 'Choose OAuth and sign in when the Capgo consent page opens. No API key needed. Then pick Capgo in a chat to use its tools.',
      },
    ],
    prompts: hostedOnly({ stage: 'observe', text: 'Compare update health between the last two bundles on production.' }),
    notes: [
      'ChatGPT runs in the cloud and cannot read your project. Bundle uploads and build requests need the Capgo CLI or an agent that runs local commands, such as Codex.',
      'OpenAI lists custom MCP apps for Business, Enterprise, and Edu workspaces on ChatGPT web. Check your plan in the OpenAI help center.',
      'Capgo marks tools that delete or overwrite data as destructive, so ChatGPT asks before it runs them.',
    ],
    faqs: [],
    docs: [{ label: 'ChatGPT developer mode and MCP apps', href: 'https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt' }],
    related: ['claude', 'codex', 'lovable'],
    keywords: ['ChatGPT mobile app', 'ChatGPT connector Capgo'],
  },
  {
    slug: 'windsurf',
    name: 'Windsurf',
    logo: '/agents/windsurf.svg',
    monogram: 'W',
    color: '#0b100f',
    type: 'ide',
    methods: ['hosted-mcp', 'local-mcp', 'skills', 'cli'],
    summary: 'AI code editor, now Devin Desktop. Add Capgo to mcp_config.json and ship builds and updates from Cascade.',
    auth: 'mixed',
    build: 'local',
    setup: [
      {
        title: 'Add the hosted Capgo MCP',
        body: 'In the Cascade panel, open the Actions menu and click Open MCP config file. Add Capgo and sign in when prompted. No API key needed.',
        code: { label: 'mcp_config.json', lang: 'json', code: json({ mcpServers: { capgo: { serverUrl: HOSTED_MCP_URL } } }) },
      },
      {
        title: 'Add the local CLI MCP for builds and uploads',
        body: 'Run npx @capgo/cli@latest login once in the terminal, then add the capgo-cli entry.',
        code: { label: 'mcp_config.json', lang: 'json', code: json({ mcpServers: { capgo: { serverUrl: HOSTED_MCP_URL }, 'capgo-cli': localServer } }) },
      },
      {
        title: 'Install the Capgo skills',
        body: 'The installer supports Windsurf and Devin skill folders.',
        code: { label: 'Terminal', lang: 'shell', code: SKILLS_COMMAND },
      },
    ],
    prompts: fullCycle({ stage: 'update', text: 'Create a beta channel and send this branch to it as a live update.' }),
    notes: [
      'Windsurf is now Devin Desktop. The setup above uses the Cascade MCP config file.',
      'With the Devin CLI, run devin mcp add -s user capgo https://api.capgo.app/mcp, then devin mcp login capgo.',
      'On Teams and Enterprise, an admin MCP allowlist blocks servers that are not on it. Ask your admin to add Capgo.',
    ],
    faqs: [],
    docs: [
      { label: 'Devin Desktop (Windsurf) MCP docs', href: 'https://docs.devin.ai/desktop/cascade/mcp' },
      { label: 'Devin CLI MCP docs', href: 'https://cli.devin.ai/docs/extensibility/mcp/configuration' },
    ],
    related: ['cursor', 'github-copilot', 'codex'],
    keywords: ['Windsurf mobile app', 'Devin Desktop MCP'],
  },
  {
    slug: 'gemini-cli',
    name: 'Gemini CLI',
    logo: '/agents/gemini.svg',
    monogram: 'G',
    color: '#1a1c2e',
    type: 'cli',
    methods: ['hosted-mcp', 'local-mcp', 'skills', 'cli'],
    summary: 'Google terminal agent. Uses the Capgo MCP servers and skills to build, publish, and live-update your app.',
    auth: 'mixed',
    build: 'local',
    setup: [
      {
        title: 'Add the hosted Capgo MCP',
        body: 'Add the server for your user, then run /mcp auth capgo inside Gemini CLI to sign in. No API key needed.',
        code: { label: 'Terminal', lang: 'shell', code: `gemini mcp add --transport http -s user capgo ${HOSTED_MCP_URL}` },
      },
      {
        title: 'Add the local CLI MCP for builds and uploads',
        body: 'Log in once with a Capgo API key, then register the local server.',
        code: { label: 'Terminal', lang: 'shell', code: `${LOGIN_COMMAND}\ngemini mcp add -s user capgo-cli ${LOCAL_MCP_COMMAND}` },
      },
      {
        title: 'Install the Capgo skills',
        body: 'Use the generic installer, or Gemini skill management: gemini skills install https://github.com/Cap-go/capgo-skills.',
        code: { label: 'Terminal', lang: 'shell', code: SKILLS_COMMAND },
      },
    ],
    prompts: fullCycle({ stage: 'observe', text: 'Which channels have a rollout paused right now, and why?' }),
    notes: [
      'Editing settings.json by hand? Use httpUrl for the hosted server. The url key means SSE in Gemini CLI.',
      'Gemini CLI runs shell commands, so it can call the Capgo CLI directly for anything the MCP does not cover.',
    ],
    faqs: [],
    docs: [
      { label: 'Gemini CLI MCP docs', href: 'https://geminicli.com/docs/tools/mcp-server/' },
      { label: 'Gemini CLI skills docs', href: 'https://geminicli.com/docs/cli/skills/' },
    ],
    related: ['claude-code', 'codex', 'github-copilot'],
    keywords: ['Gemini CLI mobile app', 'Gemini CLI settings.json MCP'],
  },
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    logo: '/agents/github-copilot.svg',
    monogram: 'GH',
    color: '#24292f',
    type: 'ide',
    methods: ['hosted-mcp', 'local-mcp', 'skills', 'cli'],
    summary: 'Copilot agent mode in VS Code. Add Capgo to mcp.json to build, publish, and roll back from Copilot Chat.',
    auth: 'mixed',
    build: 'local',
    setup: [
      {
        title: 'Add the hosted Capgo MCP in VS Code',
        body: 'Add this to .vscode/mcp.json, or run MCP: Add Server and choose HTTP. VS Code asks you to sign in to Capgo the first time Copilot uses it. No API key needed.',
        code: { label: '.vscode/mcp.json', lang: 'json', code: json({ servers: { capgo: { type: 'http', url: HOSTED_MCP_URL } } }) },
      },
      {
        title: 'Add the local CLI MCP for builds and uploads',
        body: 'Run npx @capgo/cli@latest login once in the terminal, then add the capgo-cli entry.',
        code: { label: '.vscode/mcp.json', lang: 'json', code: json({ servers: { capgo: { type: 'http', url: HOSTED_MCP_URL }, 'capgo-cli': localServer } }) },
      },
      {
        title: 'Install the Capgo skills',
        body: 'Copilot reads skills from .github/skills and .agents/skills.',
        code: { label: 'Terminal', lang: 'shell', code: SKILLS_COMMAND },
      },
    ],
    prompts: fullCycle({ stage: 'update', text: 'Add a GitHub Actions workflow that uploads a Capgo bundle to production on every push to main.' }),
    notes: [
      'Use Copilot in agent mode. Ask mode does not call MCP tools.',
      'The Copilot cloud coding agent does not support OAuth remote MCP servers. Use VS Code or the Copilot CLI for the hosted server.',
      'Commit .vscode/mcp.json so your team gets the same Capgo setup.',
    ],
    faqs: [],
    docs: [
      { label: 'VS Code MCP servers docs', href: 'https://code.visualstudio.com/docs/copilot/customization/mcp-servers' },
      { label: 'VS Code agent skills docs', href: 'https://code.visualstudio.com/docs/copilot/customization/agent-skills' },
      { label: 'Copilot coding agent and MCP', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/extend-coding-agent-with-mcp' },
    ],
    related: ['cursor', 'windsurf', 'codex'],
    keywords: ['GitHub Copilot mobile app', 'VS Code mcp.json Capgo'],
  },
  {
    slug: 'openclaw',
    name: 'OpenClaw',
    monogram: 'OC',
    color: '#b91c1c',
    type: 'cli',
    methods: ['hosted-mcp', 'local-mcp', 'skills', 'cli'],
    summary: 'Open-source personal agent. Add Capgo as an MCP server and let it ship builds and updates for you.',
    auth: 'mixed',
    build: 'local',
    setup: [
      {
        title: 'Add the hosted Capgo MCP',
        body: 'Register the server, switch it to OAuth, and sign in. No API key needed.',
        code: {
          label: 'Terminal',
          lang: 'shell',
          code: `openclaw mcp set capgo '{"url":"${HOSTED_MCP_URL}","transport":"streamable-http"}'\nopenclaw mcp configure capgo --auth oauth\nopenclaw mcp login capgo`,
        },
      },
      {
        title: 'Add the local CLI MCP for builds and uploads',
        body: 'Log in once with a Capgo API key, then register the local server.',
        code: { label: 'Terminal', lang: 'shell', code: `${LOGIN_COMMAND}\nopenclaw mcp add capgo-cli --command npx --arg @capgo/cli@latest --arg mcp` },
      },
      {
        title: 'Install the Capgo skills',
        body: 'The installer supports OpenClaw skill folders.',
        code: { label: 'Terminal', lang: 'shell', code: SKILLS_COMMAND },
      },
    ],
    prompts: fullCycle({ stage: 'observe', text: 'Every morning, send me a summary of yesterday’s update failures on production.' }),
    notes: [
      'OpenClaw stores MCP servers in ~/.openclaw/openclaw.json. You can also edit them in the Control UI.',
      'OpenClaw can run shell commands, so it can also call the Capgo CLI directly.',
      'Capgo skills are installed from GitHub. They are not published on ClawHub.',
    ],
    faqs: [],
    docs: [
      { label: 'OpenClaw MCP docs', href: 'https://docs.openclaw.ai/cli/mcp/registry' },
      { label: 'OpenClaw skills docs', href: 'https://docs.openclaw.ai/tools/skills' },
    ],
    related: ['claude-code', 'codex', 'gemini-cli'],
    keywords: ['OpenClaw mobile app', 'OpenClaw MCP'],
  },
  {
    slug: 'lovable',
    name: 'Lovable',
    monogram: 'L',
    color: '#e8456b',
    type: 'app-builder',
    methods: ['export', 'hosted-mcp', 'cli'],
    summary: 'App builder. Export your Lovable app to GitHub, wrap it with Capacitor, and ship it to the stores with Capgo.',
    auth: 'mixed',
    build: 'builder',
    setup: exportSteps('Lovable', {
      title: 'Export your Lovable app to GitHub',
      body: 'Connect GitHub in Lovable, push the project, then clone it on your computer.',
      code: { label: 'Terminal', lang: 'shell', code: 'git clone https://github.com/you/your-lovable-app.git\ncd your-lovable-app\nnpm install\nnpm run build' },
    }),
    prompts: builderCycle({ stage: 'observe', text: 'Which devices are still on bundle 1.4.2?' }),
    notes: [
      'Lovable supports custom MCP servers on all plans. Add https://api.capgo.app/mcp in Connectors with OAuth to manage channels, rollbacks, and stats from the Lovable chat.',
      'The connector is used only in the Lovable chat, never by your published app.',
      'Lovable cannot run the Capgo CLI. Run builds and uploads on your computer or in GitHub Actions.',
      'Keep GitHub sync on: changes you make in Lovable reach your repo, and CI can ship them as live updates.',
    ],
    faqs: [],
    docs: [
      { label: 'Lovable custom MCP docs', href: 'https://docs.lovable.dev/integrations/custom-mcp' },
      { label: 'Lovable GitHub docs', href: 'https://docs.lovable.dev/integrations/github' },
      { label: 'Lovable to Capacitor tutorial', href: 'blog/transform-lovable-dev-app-to-mobile-with-capacitor' },
    ],
    related: ['bolt', 'replit', 'chatgpt'],
    keywords: ['Lovable mobile app', 'Lovable to App Store'],
  },
  {
    slug: 'bolt',
    name: 'Bolt',
    monogram: 'B',
    color: '#1e3a8a',
    type: 'app-builder',
    methods: ['export', 'hosted-mcp', 'cli'],
    summary: 'App builder by StackBlitz. Export your Bolt app, wrap it with Capacitor, and ship it to the stores with Capgo.',
    auth: 'mixed',
    build: 'builder',
    setup: exportSteps('Bolt', {
      title: 'Export your Bolt app',
      body: 'Connect a GitHub repo in Bolt (or download the project), then clone it on your computer.',
      code: { label: 'Terminal', lang: 'shell', code: 'git clone https://github.com/you/your-bolt-app.git\ncd your-bolt-app\nnpm install\nnpm run build' },
    }),
    prompts: builderCycle({ stage: 'update', text: 'Pause the rollout on the production channel.' }),
    notes: [
      'Bolt supports custom MCP servers. In the chat box, open Connectors, add https://api.capgo.app/mcp with HTTP transport and MCP OAuth, then turn it on for the project.',
      'Bolt cannot run the Capgo CLI for you. Run builds and uploads on your computer or in GitHub Actions.',
      'Bolt projects are usually Vite apps, so dist is the right webDir.',
    ],
    faqs: [],
    docs: [
      { label: 'Bolt MCP connectors docs', href: 'https://support.bolt.new/building/using-bolt/connect-mcp' },
      { label: 'Bolt GitHub docs', href: 'https://support.bolt.new/integrations/git' },
      { label: 'Bolt to Capacitor tutorial', href: 'blog/transform-bolt-new-app-to-mobile-with-capacitor' },
    ],
    related: ['lovable', 'replit', 'cursor'],
    keywords: ['Bolt mobile app', 'bolt.new app store'],
  },
  {
    slug: 'replit',
    name: 'Replit',
    logo: '/agents/replit.svg',
    monogram: 'R',
    color: '#f26207',
    type: 'app-builder',
    methods: ['export', 'hosted-mcp', 'cli'],
    summary: 'App builder with a cloud workspace. Add Capacitor in the Replit Shell and ship builds and updates with Capgo.',
    auth: 'mixed',
    build: 'builder',
    setup: exportSteps('Replit', {
      title: 'Open your app in the Replit Shell',
      body: 'Replit gives you a Shell, so you can run the next steps there. Or push to GitHub from Replit and clone it on your computer.',
      code: { label: 'Shell', lang: 'shell', code: 'npm install\nnpm run build' },
    }),
    prompts: builderCycle({ stage: 'publish', text: 'Request an Android release build and send it to the Google Play internal track.' }),
    notes: [
      'Replit Agent supports remote MCP servers. Go to replit.com/integrations, add https://api.capgo.app/mcp under MCP Servers, and sign in with OAuth.',
      'The Replit Shell can run the Capgo CLI, so builds and uploads work from the browser. Run npx @capgo/cli@latest login there once with your Capgo API key.',
      'Replit Agent does not start local MCP servers. Use the hosted MCP plus the CLI in the Shell.',
    ],
    faqs: [],
    docs: [
      { label: 'Replit MCP docs', href: 'https://docs.replit.com/build/connect-via-mcp' },
      { label: 'Replit agent skills docs', href: 'https://docs.replit.com/build/use-agent-skills' },
    ],
    related: ['lovable', 'bolt', 'claude-code'],
    keywords: ['Replit mobile app', 'Replit app store'],
  },
]

export function getAgent(slug: string): Agent {
  const agent = agents.find((item) => item.slug === slug)
  if (!agent) throw new Error(`Unknown agent slug: ${slug}`)
  return agent
}
