// "Best [product] in [year]: the buyer's shortlist" pages rendered by src/pages/best/[slug].astro.
// Hand-written pages (ai-tools-for-capacitor, appflow-alternative, codepush-alternative) live in src/pages/best/*.astro.

import { capacitorLiveUpdates } from './capacitor-live-updates'
import type { BestShortlistPage } from './types'

export const bestShortlists: BestShortlistPage[] = [capacitorLiveUpdates]
