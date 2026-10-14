import { buildPricingFaqLdJsonQuestions, buildPricingFaqSections, type PricingFaqUrls } from '@/lib/pricingFaqContent'
import { getRelativeLocaleUrl } from '@/services/links'
import type { Locales } from '@/services/locale'

export { pricingFaqItemToPlainAnswer } from '@/lib/pricingFaqContent'
export type { PricingFaqItem, PricingFaqListItem, PricingFaqParagraph, PricingFaqSection, PricingFaqUrls } from '@/lib/pricingFaqContent'

function resolvePricingFaqUrls(locale: Locales): PricingFaqUrls {
  return {
    docsMauUrl: `${getRelativeLocaleUrl(locale, 'docs/faq/')}#what-counts-as-a-mau-for-capgo`,
    docsNativeBuildsUrl: getRelativeLocaleUrl(locale, 'docs/live-updates/testing-native-builds-without-live-updates/'),
    docsBundlesUrl: getRelativeLocaleUrl(locale, 'docs/webapp/bundles/'),
    docsAvailabilityUrl: getRelativeLocaleUrl(locale, 'docs/capgo-availability'),
  }
}

export function getPricingFaqSections(locale: Locales) {
  return buildPricingFaqSections(locale, resolvePricingFaqUrls(locale))
}

export function getPricingFaqLdJsonQuestions(locale: Locales) {
  return buildPricingFaqLdJsonQuestions(locale, resolvePricingFaqUrls(locale))
}
