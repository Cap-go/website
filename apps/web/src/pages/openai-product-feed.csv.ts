import { useRuntimeConfig } from '@/config/app'
import { planDescriptionToText } from '@/lib/planCopy'
import { getPlans } from '@/lib/siteData'
import type { APIRoute } from 'astro'

export const prerender = true

// Product catalog for OpenAI Ads (Ads Manager > Feeds > connect via URL).
// Schema: https://developers.openai.com/commerce/specs/file-upload/products
// One row per plan and billing period, grouped by plan as variants.

const COLUMNS = [
  'item_id',
  'group_id',
  'listing_has_variations',
  'variant_dict',
  'title',
  'description',
  'url',
  'brand',
  'seller_name',
  'seller_url',
  'image_url',
  'price',
  'availability',
  'condition',
  'product_category',
  'is_eligible_search',
  'is_eligible_checkout',
  'is_ads_eligible',
] as const

type Row = Record<(typeof COLUMNS)[number], string>

function csvCell(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

function usdPrice(value: number): string {
  return `${value.toFixed(2)} USD`
}

export const GET: APIRoute = async () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl.replace(/\/$/, '')
  const plans = getPlans()
    .filter((plan) => plan.name !== 'Free' && (plan.price_m ?? 0) > 0)
    .sort((a, b) => (a.price_m ?? 0) - (b.price_m ?? 0))

  const rows: Row[] = plans.flatMap((plan) => {
    const slug = plan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const summary = planDescriptionToText(plan.description, 'en')
      .trim()
      .replace(/([^.!?])$/, '$1.')
    const limits = [
      `${(plan.mau ?? 0).toLocaleString('en-US')} monthly active users`,
      `${(plan.bandwidth ?? 0).toLocaleString('en-US')} GB bandwidth`,
      `${(plan.storage ?? 0).toLocaleString('en-US')} GB storage`,
      plan.build_time_unit ? `${Math.round(plan.build_time_unit / 60).toLocaleString('en-US')} native build minutes` : '',
    ]
      .filter(Boolean)
      .join(', ')
    const description = [
      `Capgo ${plan.name} plan: live (OTA) updates and native iOS/Android builds for Capacitor apps.`,
      summary,
      `Includes ${limits}.`,
      '14-day free trial, no credit card required.',
    ]
      .filter(Boolean)
      .join(' ')

    const billings = [
      { key: 'monthly', label: 'Monthly', price: plan.price_m ?? 0 },
      { key: 'yearly', label: 'Yearly', price: plan.price_y ?? 0 },
    ].filter((billing) => billing.price > 0)

    return billings.map((billing) => ({
      item_id: `capgo-${plan.id}-${billing.key}`,
      group_id: `capgo-${plan.id}`,
      listing_has_variations: 'true',
      variant_dict: JSON.stringify({ billing: billing.label }),
      title: `Capgo ${plan.name} plan — ${billing.label.toLowerCase()} billing`,
      description,
      url: `${baseUrl}/pricing/?plan=${slug}&billing=${billing.key}`,
      brand: 'Capgo',
      seller_name: 'Capgo',
      seller_url: `${baseUrl}/`,
      image_url: `${baseUrl}/capgo_social.png`,
      price: usdPrice(billing.price),
      availability: 'in_stock',
      condition: 'new',
      product_category: 'Software > Developer Tools > Mobile App Development',
      is_eligible_search: 'true',
      is_eligible_checkout: 'false',
      is_ads_eligible: 'true',
    }))
  })

  const csv = [COLUMNS.join(','), ...rows.map((row) => COLUMNS.map((column) => csvCell(row[column])).join(','))].join('\n') + '\n'

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
    },
  })
}
