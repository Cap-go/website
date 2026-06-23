export type ProductVideo = {
  youtubeId: string
  title: string
  description: string
}

export const productVideoFounder = {
  eyebrow: 'From Martin',
  name: 'Martin',
  role: 'Founder, Capgo',
} as const

export const productVideos = {
  mobileApp: {
    youtubeId: 'rrd61l70G5A',
    title: 'Why we built the Capgo mobile app',
    description:
      'Capgo founder Martin on testing bundle previews on real devices, sharing QR tests with your team, and keeping release decisions close when you are away from your laptop.',
  },
  cli: {
    youtubeId: 'LCwaZrCOIGI',
    title: 'Why the Capgo CLI matters',
    description: 'Capgo founder Martin on shipping Capacitor releases from the terminal, checking compatibility before you push, and keeping native builds in the same workflow.',
  },
  skills: {
    youtubeId: 'M4iWu144Szw',
    title: 'Why we open-sourced Capgo skills',
    description: 'Capgo founder Martin on giving AI agents practical Capacitor and Capgo knowledge for live updates, plugins, builds, and migrations.',
  },
  plugins: {
    youtubeId: 'p2hc5pzsHAY',
    title: 'Why Capgo maintains production plugins',
    description: 'Capgo founder Martin on the native gaps teams hit in production Capacitor apps, and why we keep a maintained plugin catalog instead of leaving you to guess.',
  },
  appflowMigration: {
    youtubeId: '1o2qbkyvlIY',
    title: 'Why teams move from Appflow to Capgo',
    description: 'Capgo founder Martin on migrating live updates and release automation while keeping your repo, credentials, and release control in your hands.',
  },
  nativeBuild: {
    youtubeId: 'M_gXaLB-Muc',
    title: 'Why we built Capgo native builds',
    description: 'Capgo founder Martin on turning Capacitor projects into signed iOS and Android releases without asking you to hand over your App Store credentials.',
  },
  liveUpdate: {
    youtubeId: '7AdzMDR4dKk',
    title: 'Why Capgo live updates work the way they do',
    description: 'Capgo founder Martin on channels, compatibility checks, rollback, and shipping web bundle changes safely after store approval.',
  },
} as const satisfies Record<string, ProductVideo>
