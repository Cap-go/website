export type ProductVideo = {
  youtubeId: string
  title: string
  description: string
}

export const productVideos = {
  mobileApp: {
    youtubeId: 'rrd61l70G5A',
    title: 'Test Capgo updates on a real device',
    description: 'Watch how the Capgo mobile app applies bundle previews, shares QR tests with your team, and keeps native build status visible while you validate a release.',
  },
  cli: {
    youtubeId: 'LCwaZrCOIGI',
    title: 'Ship from the Capgo CLI',
    description: 'See compatibility checks, guarded live-update uploads, native build requests, and MCP automation from the same terminal workflow.',
  },
  skills: {
    youtubeId: 'M4iWu144Szw',
    title: 'Use Capgo skills with your AI agent',
    description: 'See how Capacitor and Capgo skills install in agent tools and guide live updates, plugins, builds, and migrations from natural-language requests.',
  },
  plugins: {
    youtubeId: 'p2hc5pzsHAY',
    title: 'Explore the Capgo plugin catalog',
    description: 'See how maintained Capgo plugins cover native capabilities, docs, and production workflows for Capacitor apps.',
  },
  appflowMigration: {
    youtubeId: '1o2qbkyvlIY',
    title: 'Migrate from Ionic Appflow to Capgo',
    description: 'Walk through moving live updates, channels, and release automation off Appflow while keeping your Capacitor app and store credentials under your control.',
  },
  nativeBuild: {
    youtubeId: 'M_gXaLB-Muc',
    title: 'Request native iOS and Android builds',
    description: 'See how Capgo Builder turns a Capacitor project into signed native builds with logs, artifacts, and release records your team can trust.',
  },
  liveUpdate: {
    youtubeId: '7AdzMDR4dKk',
    title: 'Ship Capgo live updates safely',
    description: 'See channels, compatibility gates, rollback, and encrypted bundle delivery in a production Capacitor release flow.',
  },
} as const satisfies Record<string, ProductVideo>
