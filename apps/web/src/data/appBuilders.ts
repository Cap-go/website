// AI app builders with a dedicated /solutions/<slug>-to-mobile/ landing page.
// Each page is an ad landing page: the headline must name the builder exactly as the ad does.
// Every export step here must match the builder's own docs. Do not claim a feature the builder does not have.

export type AppBuilderSlug = 'lovable' | 'base44' | 'bolt' | 'replit' | 'v0'

export interface AppBuilderLink {
  label: string
  /** Absolute URL, or a site path without leading slash (resolved with getRelativeLocaleUrl). */
  href: string
}

export interface AppBuilderFaq {
  question: string
  answer: string
  href?: string
  linkLabel?: string
}

export interface AppBuilder {
  slug: AppBuilderSlug
  name: string
  /** Capacitor webDir for the usual project shape of this builder. */
  webDir: string
  /** First step: get the code out of the builder. */
  exportStep: { title: string; body: string; code: string }
  /** Short hero flow card text for the builder column. */
  flowDesc: string
  /** How changes made in the builder reach the repo, so CI can ship them as live updates. */
  syncNote: string
  /** Builder-specific FAQ entries, shown before the shared ones. */
  faqs: AppBuilderFaq[]
  /** Step-by-step blog tutorial, when one exists. */
  tutorial?: AppBuilderLink
  /** /agents/<slug> page for the Capgo MCP setup inside this builder, when one exists. */
  agentSlug?: string
  /** Builder vendor docs used in the "Docs for this workflow" list. */
  docs: AppBuilderLink[]
  keywords: string[]
}

export const appBuilders: AppBuilder[] = [
  {
    slug: 'lovable',
    name: 'Lovable',
    webDir: 'dist',
    exportStep: {
      title: 'Export to GitHub and clone',
      body: 'In Lovable, connect GitHub. Clone the repo and check that the build creates a dist folder with index.html.',
      code: `git clone https://github.com/you/your-lovable-app.git
cd your-lovable-app
npm install
npm run build`,
    },
    flowDesc: 'Build the web app with prompts and visual edits. Connect GitHub so the code lives in a repo.',
    syncNote: 'With GitHub sync on, each Publish in Lovable pushes a commit.',
    faqs: [
      {
        question: 'My Lovable project uses Next.js. Does it work?',
        answer: "Yes, with a static export. Point Capacitor's webDir at the out folder instead of dist. Vite single-page apps work as they are.",
        href: 'blog/building-a-native-mobile-app-with-nextjs-and-capacitor',
        linkLabel: 'Next.js with Capacitor',
      },
      {
        question: 'Does my Supabase backend keep working in the app?',
        answer:
          'Yes. The app calls the same Supabase project over the network, like the web version does. Add your app scheme to the Supabase auth redirect URLs if you use OAuth sign-in.',
      },
    ],
    tutorial: { label: 'Lovable to Capacitor tutorial', href: 'blog/transform-lovable-dev-app-to-mobile-with-capacitor' },
    agentSlug: 'lovable',
    docs: [
      { label: 'Lovable Publish to live update guide', href: 'blog/automate-capgo-live-updates-from-lovable-github-actions' },
      { label: 'Lovable GitHub docs', href: 'https://docs.lovable.dev/integrations/github' },
    ],
    keywords: ['Lovable mobile app', 'Lovable to App Store', 'Lovable iOS app', 'Lovable Android app', 'vibe coding mobile app'],
  },
  {
    slug: 'base44',
    name: 'Base44',
    webDir: 'dist',
    exportStep: {
      title: 'Export to GitHub or ZIP',
      body: 'On the Base44 Builder plan or higher, click the GitHub icon to sync the code to a repo, or export the project as a ZIP. Then build it once to get a dist folder.',
      code: `git clone https://github.com/you/your-base44-app.git
cd your-base44-app
npm install
npm run build`,
    },
    flowDesc: 'Build the React app with prompts. Sync it to GitHub or export a ZIP so you have the code.',
    syncNote: 'With GitHub sync on, changes you make in Base44 push commits to the repo.',
    faqs: [
      {
        question: 'Which Base44 plan do I need?',
        answer: 'Code export (GitHub sync or ZIP download) needs the Base44 Builder plan or higher. Capgo Build and live updates are billed separately by Capgo.',
        href: 'https://docs.base44.com/developers/app-code/local-development/github',
        linkLabel: 'Base44 GitHub docs',
      },
      {
        question: 'Does the Base44 backend keep working in the app?',
        answer:
          'Yes. The exported app keeps calling your Base44 backend over the network, like the web version does. Test sign-in on a device, since login redirects behave differently in a native app.',
      },
    ],
    tutorial: { label: 'Base44 to Capacitor tutorial', href: 'blog/transform-base44-app-to-mobile-with-capacitor' },
    docs: [{ label: 'Base44 GitHub docs', href: 'https://docs.base44.com/developers/app-code/local-development/github' }],
    keywords: ['Base44 mobile app', 'Base44 to App Store', 'Base44 iOS app', 'Base44 Android app', 'Base44 export'],
  },
  {
    slug: 'bolt',
    name: 'Bolt',
    webDir: 'dist',
    exportStep: {
      title: 'Connect GitHub and clone',
      body: 'In Bolt, connect a GitHub repo (or download the project). Clone it and check that the build creates a dist folder with index.html.',
      code: `git clone https://github.com/you/your-bolt-app.git
cd your-bolt-app
npm install
npm run build`,
    },
    flowDesc: 'Build the web app with prompts in Bolt. Connect GitHub so the code lives in a repo.',
    syncNote: 'With a GitHub repo connected, changes you make in Bolt push commits to the repo.',
    faqs: [
      {
        question: 'Does it work with any Bolt project?',
        answer: 'Bolt projects are usually Vite apps, so dist is the right webDir. If your project is Next.js, use a static export and point webDir at out.',
        href: 'https://support.bolt.new/integrations/git',
        linkLabel: 'Bolt GitHub docs',
      },
      {
        question: 'Bolt also does Expo apps. Why use Capacitor?',
        answer:
          'Capacitor keeps the web app you already built in Bolt. Expo means rebuilding the UI in React Native. With Capacitor, the same code runs on the web, iOS, and Android.',
        href: 'alternatives/expo',
        linkLabel: 'Capgo vs Expo',
      },
    ],
    tutorial: { label: 'Bolt to Capacitor tutorial', href: 'blog/transform-bolt-new-app-to-mobile-with-capacitor' },
    agentSlug: 'bolt',
    docs: [{ label: 'Bolt GitHub docs', href: 'https://support.bolt.new/integrations/git' }],
    keywords: ['Bolt mobile app', 'bolt.new App Store', 'Bolt iOS app', 'Bolt Android app', 'bolt.new to mobile'],
  },
  {
    slug: 'replit',
    name: 'Replit',
    webDir: 'dist',
    exportStep: {
      title: 'Build in the Replit Shell or clone',
      body: 'Replit gives you a Shell, so you can run every step there. Or connect GitHub from the Git pane and clone the repo. Build once and find the folder with index.html.',
      code: `npm install
npm run build
ls dist  # full-stack templates may use dist/public`,
    },
    flowDesc: 'Build the app with Replit Agent. Use the Shell, or connect GitHub from the Git pane.',
    syncNote: 'Push from the Replit Git pane to the repo, or run the upload command straight from the Shell.',
    faqs: [
      {
        question: 'My Replit app has an Express or Python server. Does it work?',
        answer: 'Yes. Capacitor ships only the frontend build. Keep the server deployed on Replit and call it with its full https URL from the app, not a relative /api path.',
      },
      {
        question: 'Can I run the Capgo CLI inside Replit?',
        answer: 'Yes. The Replit Shell runs npx @capgo/cli, so builds and uploads work from the browser. Run npx @capgo/cli@latest login there once with your Capgo API key.',
        href: 'agents/replit',
        linkLabel: 'Capgo for Replit',
      },
    ],
    agentSlug: 'replit',
    docs: [
      { label: 'Replit Git pane docs', href: 'https://docs.replit.com/replit-workspace/workspace-features/git-interface' },
      { label: 'Replit MCP docs', href: 'https://docs.replit.com/build/connect-via-mcp' },
    ],
    keywords: ['Replit mobile app', 'Replit App Store', 'Replit iOS app', 'Replit Android app', 'Replit Agent mobile'],
  },
  {
    slug: 'v0',
    name: 'v0',
    webDir: 'out',
    exportStep: {
      title: 'Push to GitHub and add a static export',
      body: "Push the v0 project to GitHub from v0's Git panel (or download the code) and clone it. v0 apps are Next.js, so set output: 'export' in next.config and build to the out folder.",
      code: `git clone https://github.com/you/your-v0-app.git
cd your-v0-app
npm install
# next.config: output: 'export', images: { unoptimized: true }
npm run build`,
    },
    flowDesc: 'Generate the Next.js app with v0. Push it to GitHub so the code lives in a repo.',
    syncNote: 'With the GitHub repo connected, changes you make in v0 push commits to the repo.',
    faqs: [
      {
        question: 'My v0 app uses server actions or API routes. Does it work?',
        answer:
          'The mobile app ships the static export only. Keep server code deployed on Vercel and call it with its full https URL from the app. Pages and client components work as they are.',
        href: 'blog/building-a-native-mobile-app-with-nextjs-and-capacitor',
        linkLabel: 'Next.js with Capacitor',
      },
      {
        question: 'Do shadcn/ui components work on mobile?',
        answer:
          'Yes. They are React components with Tailwind styles, so they render in the native web view like in a browser. Check touch targets and safe areas on a real device.',
      },
    ],
    docs: [{ label: 'Next.js static export docs', href: 'https://nextjs.org/docs/app/guides/static-exports' }],
    keywords: ['v0 mobile app', 'v0 to App Store', 'v0 iOS app', 'v0 Android app', 'v0.dev mobile', 'Next.js to mobile app'],
  },
]

export function getAppBuilder(slug: string): AppBuilder {
  const builder = appBuilders.find((item) => item.slug === slug)
  if (!builder) throw new Error(`Unknown app builder slug: ${slug}`)
  return builder
}

export const appBuilderPath = (slug: AppBuilderSlug) => `solutions/${slug}-to-mobile`
