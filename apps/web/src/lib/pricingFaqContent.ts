import m from '@/copy/messages'
import type { Locales } from '@/services/locale'

export type PricingFaqUrls = {
  docsMauUrl: string
  docsNativeBuildsUrl: string
  docsBundlesUrl: string
  docsAvailabilityUrl: string
}

export type PricingFaqListItem = {
  label: string
  text: string
}

export type PricingFaqParagraph = {
  text: string
  link?: {
    href: string
    label: string
    /** Text immediately before the link (e.g. ends with "Learn more about this") */
    beforeLink?: string
  }
}

export type PricingFaqItem = {
  id?: string
  question: string
  answer: string
  /** Visible answer for paid-ads visitors on the direct offer (no free trial). Not used in JSON-LD. */
  answerDirect?: string
  intro?: string
  paragraphs?: PricingFaqParagraph[]
  listItems?: PricingFaqListItem[]
  href?: string
  linkLabel?: string
}

export type PricingFaqSection = {
  title: string
  subtitle: string
  /** Visible title/subtitle for paid-ads visitors on the direct offer (no free trial). */
  titleDirect?: string
  subtitleDirect?: string
  items: PricingFaqItem[]
}

const ALL_PLANS_FEATURES_ANSWER =
  'Yes for core products. Every plan includes Live Updates, Native Builds, Notifications, Observe, Capgo plugins, and Automations. We do not charge per seat or lock those products behind higher tiers. Plans differ by usage limits (MAU, bandwidth, storage, build time) and support level. Enterprise adds extras that take more of our time, such as SSO, custom domains, compliance paperwork, and a dedicated channel.'

export function pricingFaqItemToPlainAnswer(item: PricingFaqItem): string {
  const parts: string[] = []

  if (item.intro) parts.push(item.intro)

  if (item.paragraphs?.length) {
    for (const paragraph of item.paragraphs) {
      if (paragraph.link) {
        const prefix = paragraph.link.beforeLink ?? paragraph.text
        parts.push(`${prefix} ${paragraph.link.label}: ${paragraph.link.href}`)
      } else {
        parts.push(paragraph.text)
      }
    }
  } else if (item.answer) {
    parts.push(item.answer)
  }

  if (item.listItems?.length) {
    for (const entry of item.listItems) {
      parts.push(`${entry.label} ${entry.text}`)
    }
  }

  if (item.href && item.linkLabel) {
    parts.push(`${item.linkLabel}: ${item.href}`)
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

export function buildPricingFaqSections(locale: Locales, urls: PricingFaqUrls): PricingFaqSection[] {
  const { docsMauUrl, docsNativeBuildsUrl, docsBundlesUrl, docsAvailabilityUrl } = urls

  return [
    {
      title: 'Plan Features & Limits',
      subtitle: "Everything you need to know about your plan's capabilities",
      items: [
        {
          id: 'faq-mau',
          question: m.how_are_mau_counted({}, { locale }),
          answer: '',
          paragraphs: [
            { text: m.mau_counting_explanation({}, { locale }) },
            {
              text: '',
              link: {
                beforeLink: m.capgo_usage_explanation({}, { locale }),
                href: docsNativeBuildsUrl,
                label: m.here({}, { locale }),
              },
            },
          ],
          href: docsMauUrl,
          linkLabel: m.learn_more({}, { locale }),
        },
        {
          id: 'faq-all-features',
          question: 'Do all plans include the same features?',
          answer: ALL_PLANS_FEATURES_ANSWER,
        },
        {
          id: 'faq-custom-contract',
          question: m.custom_contract_faq_question({}, { locale }),
          answer: m.custom_contract_faq_answer({}, { locale }),
        },
        {
          id: 'faq-storage',
          question: m.storage_what_is_it_used_for({}, { locale }),
          answer: m.storage_detailed_explanation({}, { locale }),
          href: docsBundlesUrl,
          linkLabel: m.learn_more({}, { locale }),
        },
        {
          id: 'faq-bandwidth',
          question: m.how_is_bandwidth_counted({}, { locale }),
          answer: m.bandwidth_explanation({}, { locale }),
        },
        {
          id: 'faq-build-time',
          question: m.what_does_build_time_refer_to({}, { locale }),
          answer: m.build_time_explanation({}, { locale }),
        },
        {
          id: 'faq-mau-limit',
          question: m.what_happens_if_i_reach_the_mau_limit({}, { locale }),
          answer: m.what_happens_if_i_reach_the_mau_limit_answer({}, { locale }),
        },
        {
          id: 'faq-storage-limit',
          question: m.what_happens_if_i_reach_the_storage_limit({}, { locale }),
          answer: m.what_happens_if_i_reach_the_storage_limit_answer({}, { locale }),
        },
        {
          id: 'faq-bandwidth-limit',
          question: m.what_happens_if_i_reach_the_bandwidth_limit({}, { locale }),
          answer: m.what_happens_if_i_reach_the_bandwidth_limit_answer({}, { locale }),
        },
        {
          id: 'faq-capacitor-config',
          question: m.capacitor_config_changes_question({}, { locale }),
          answer: m.capacitor_config_changes_answer({}, { locale }),
        },
      ],
    },
    {
      title: 'Billing & Payments',
      subtitle: 'Everything about pricing, payments, and subscriptions',
      items: [
        {
          id: 'faq-annual-ach',
          question: m.do_you_offer_annual_billing_and_ach_payment_options({}, { locale }),
          answer: m.ach_available_for_enterprise_annual_payments({}, { locale }),
        },
        {
          id: 'faq-payment-methods',
          question: m.what_payment_methods_do_you_accept({}, { locale }),
          answer: m.what_payment_methods_answer({}, { locale }),
        },
        {
          question: m.can_i_change_my_plan_at_any_time({}, { locale }),
          answer: m.can_i_change_my_plan_answer({}, { locale }),
        },
        {
          question: m.can_i_cancel_at_any_time({}, { locale }),
          answer: m.cancellation_policy_details({}, { locale }),
        },
        {
          question: m.do_you_offer_refunds({}, { locale }),
          answer: m.do_you_offer_refunds_answer({}, { locale }),
        },
        {
          question: m.are_there_any_setup_fees_or_hidden_costs({}, { locale }),
          answer: m.are_there_any_setup_fees_answer({}, { locale }),
        },
        {
          id: 'faq-credits',
          question: m.can_i_use_credits_without_subscription({}, { locale }),
          answer: m.can_i_use_credits_without_subscription_answer({}, { locale }),
        },
        {
          id: 'faq-cancel',
          question: m.capgo_availability_faq_title({}, { locale }),
          answer: '',
          intro: m.capgo_availability_faq_intro({}, { locale }),
          listItems: [
            { label: 'Capgo is down:', text: m.capgo_availability_faq_capgo_down({}, { locale }) },
            { label: 'Subscription canceled:', text: m.capgo_availability_faq_canceled({}, { locale }) },
            { label: 'Above plan limits:', text: m.capgo_availability_faq_limits({}, { locale }) },
          ],
          href: docsAvailabilityUrl,
          linkLabel: m.capgo_availability_faq_link({}, { locale }),
        },
      ],
    },
    {
      title: 'Trial & Support',
      subtitle: 'Free trials, discounts, and getting help',
      titleDirect: m.pricing_faq_trial_support_title_direct({}, { locale }),
      subtitleDirect: m.pricing_faq_trial_support_subtitle_direct({}, { locale }),
      items: [
        {
          question: m.unsure_about_active_users({}, { locale }),
          answer: m.free_trial_explanation({}, { locale }),
          answerDirect: m.free_trial_explanation_direct({}, { locale }),
        },
        {
          question: m.do_you_offer_discounts_for_students_non_profits_or_startups({}, { locale }),
          answer: m.no_discounts_available_at_this_time({}, { locale }),
        },
        {
          question: m.do_you_have_purchasing_power_parity_pricing({}, { locale }),
          answer: m.ppp_solo_plan_answer({}, { locale }),
        },
      ],
    },
    {
      title: 'Security & Compliance',
      subtitle: 'Enterprise security features and certifications',
      items: [
        {
          id: 'faq-soc2',
          question: m.soc2_what_does_it_mean({}, { locale }),
          answer: m.soc2_explanation({}, { locale }),
        },
        {
          question: m.can_i_use_soc2_with_other_plans({}, { locale }),
          answer: m.soc2_enterprise_only({}, { locale }),
        },
      ],
    },
  ]
}

export function buildPricingFaqLdJsonQuestions(locale: Locales, urls: PricingFaqUrls): Array<{ question: string; answer: string }> {
  return buildPricingFaqSections(locale, urls).flatMap((section) =>
    section.items.map((item) => ({
      question: item.question,
      answer: pricingFaqItemToPlainAnswer(item),
    })),
  )
}
