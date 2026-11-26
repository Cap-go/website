import type { MessageKey } from '@/copy/messages'
import { appBuilders } from '@/data/appBuilders'

export type SolutionHubLink = { path: string; labelKey: MessageKey }

const staticSolutions: SolutionHubLink[] = [
  { path: 'solutions/agencies/', labelKey: 'solutions_agencies_short' },
  { path: 'solutions/startups/', labelKey: 'solutions_startups_short' },
  { path: 'solutions/solo-developers/', labelKey: 'solutions_solo_short' },
  { path: 'solutions/fintech/', labelKey: 'solutions_fintech_short' },
  { path: 'solutions/ecommerce/', labelKey: 'solutions_ecommerce_short' },
  { path: 'solutions/healthcare/', labelKey: 'solutions_healthcare_short' },
  { path: 'solutions/qsr/', labelKey: 'solutions_qsr_short' },
  { path: 'solutions/production-updates/', labelKey: 'solutions_production_updates' },
  { path: 'solutions/direct-updates/', labelKey: 'solutions_direct_updates' },
  { path: 'solutions/security-fixes/', labelKey: 'solutions_security_fixes_short' },
  { path: 'solutions/pr-preview/', labelKey: 'solutions_pr_preview' },
  { path: 'solutions/beta-testing/', labelKey: 'solutions_beta_testing' },
  { path: 'solutions/version-targeting/', labelKey: 'solutions_version_targeting' },
  { path: 'solutions/white-label/', labelKey: 'solutions_white_label' },
  { path: 'solutions/set-and-forget/', labelKey: 'solutions_set_and_forget_short' },
  { path: 'solutions/build-without-mac/', labelKey: 'solutions_build_without_mac_short' },
  { path: 'solutions/webapp-to-mobile/', labelKey: 'solutions_webapp_to_mobile_short' },
  { path: 'solutions/cordova-to-capacitor/', labelKey: 'solutions_cordova_to_capacitor_short' },
  { path: 'solutions/cordova-to-capacitor-ai/', labelKey: 'solutions_cordova_to_capacitor_ai_short' },
  { path: 'solutions/ionic-enterprise-plugins/', labelKey: 'solutions_ionic_plugins_short' },
]

export const builderSolutionHubLinks = appBuilders.map((builder) => ({
  path: `solutions/${builder.slug}-to-mobile/`,
  name: builder.name,
}))

export const solutionHubLinks = staticSolutions
