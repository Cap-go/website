// Manual translator-context overrides kept across `bun run generate:message-contexts`.
// Prefer refining ambiguous short labels here instead of editing messageContexts.ts.
// Keys must exist in messages.ts.

import type { MessageKey } from './messages'

export const messageContextOverrides = {
  app_strip_laundry_pickup: 'Short customer app subtitle. Booking laundry pickup and delivery.',
  app_strip_office_booking: 'Short customer app subtitle. Booking clinical office space by the hour for healthcare professionals.',
  app_strip_employee_perks: 'Short customer app subtitle. Discounts and benefits offered to employees by their company.',
  app_strip_online_care: 'Short customer app subtitle. Getting prescriptions and treatment from doctors online.',
  app_strip_home_services: 'Short customer app subtitle. Booking plumbers, electricians, AC repair and cleaning at home.',
  app_strip_doctor_finder: 'Short customer app subtitle. Finding recommended in-network doctors through a health benefit.',
  app_strip_live_updates: 'Short customer app subtitle. Generic label naming the product feature (live app updates), used when the app purpose is not described.',
  app_strip_photo_galleries: 'Short customer app subtitle. Photographers sharing and delivering client photo galleries.',
  app_strip_shopping: 'Short customer app subtitle. Shopping from many independent sellers in one marketplace.',
  app_strip_neighborhood_guide: 'Short customer app subtitle. Events, dining and shops in a city waterfront district.',
  app_strip_legal_help: 'Short customer app subtitle. Creating legal documents and asking lawyers questions.',
  app_strip_travel_tickets: 'Short customer app subtitle. Booking train, bus, ferry and flight tickets.',
  app_strip_retirement_savings: 'Short customer app subtitle. Managing a workplace retirement savings account.',
  app_strip_burger_delivery: 'Short customer app subtitle. Ordering burgers for home delivery.',
  app_strip_bus_tickets: 'Short customer app subtitle. Buying and displaying bus tickets.',
  app_strip_campus_dining: 'Short customer app subtitle. Finding meals or ordering food at a corporate campus.',
  app_strip_conference_schedules: 'Short customer app subtitle. Viewing agendas and personal schedules at a conference.',
  app_strip_coop_hub: 'Short customer app subtitle. News and documents for members of a housing cooperative.',
  app_strip_delegate_guide: 'Short customer app subtitle. Event information for delegates attending Davos.',
  app_strip_dining_rewards: 'Short customer app subtitle. Earning and redeeming restaurant loyalty rewards.',
  app_strip_flight_booking: 'Short customer app subtitle. Booking airline tickets.',
  app_strip_health_coverage: 'Short customer app subtitle. Viewing health insurance policy details.',
  app_strip_internal_tools: 'Short customer app subtitle. Tools used internally by SCOTT Sports staff.',
  app_strip_loan_management: 'Short customer app subtitle. Viewing loan balances and repayment information.',
  app_strip_meal_delivery: 'Short customer app subtitle. Ordering prepared meals for delivery.',
  app_strip_order_ahead: 'Short customer app subtitle. Placing a restaurant order before arrival.',
  app_strip_orders_and_rewards: 'Short customer app subtitle. Ordering food and earning restaurant loyalty rewards.',
  app_strip_payroll_and_time: 'Short customer app subtitle. Employees access payroll information and record working hours.',
  app_strip_pickup: 'Short customer app subtitle. Collecting a food order from a restaurant.',
  app_strip_repairs: 'Short customer app subtitle. Technicians manage assigned home warranty repair jobs.',
  app_strip_staff_meals: 'Short customer app subtitle. Meals served to employees at work.',
  app_strip_supply_orders: 'Short customer app subtitle. Restaurants order foodservice supplies from a distributor.',
  app_strip_takeout_orders: 'Short customer app subtitle. Ordering restaurant food to take away.',
  app_strip_vitals_tracking: 'Short customer app subtitle. Remote patient monitoring of vital signs.',
  app_strip_workplace_dining: 'Short customer app subtitle. Menus and meals offered at the workplace.',
  pricing_prepaid_summary:
    'Complete introduction below the registration button. A standalone localized prepaid-credit amount follows the colon, then a separate no-subscription sentence. Translate the entire introduction as one unit. Only light usage can fit this annual budget; it is not a fixed annual plan, unlimited usage, or a monthly fee.',
  pricing_prepaid_annual_example:
    'Qualifier below the localized $5 prepaid-credit amount in the Pay as you go tier on the pricing page and shared homepage/live-update pricing teaser. That balance can cover a year only for light usage. This is not a fixed annual plan, unlimited usage, a monthly fee, or a guaranteed annual bill.',
  pricing_prepaid_cta: 'Registration link for the Pay as you go tier. Creates an account before purchasing prepaid credits; it does not directly charge or create a subscription.',
  // Example:
  // updates: 'Pricing calculator metric label for monthly OTA update volume, not a nav item.',
  live_update_hero_headline:
    'SEO product H1. Keep the product name "Capacitor Live Updates" and the acronym OTA in parentheses. Do not replace OTA with a long translated phrase in the headline.',
  live_update_hero_title: 'Same meaning as live_update_hero_headline: Capacitor Live Updates (OTA). Used as document title context.',
  live_update_hero_subtitle:
    'Answer-first hero paragraph under the H1. Explain OTA live updates for Capacitor (web bundle changes without a new store binary) and mention Capgo channels, rollback, and device logs.',
  brand_asset_youtube_banner_title: 'Brand page asset heading for the YouTube channel banner download. Keep the word YouTube unchanged.',
  brand_asset_youtube_banner_desc:
    'Brand page description of the 2560×1440 YouTube channel banner. Keep YouTube, 2560×1440, and Capgo unchanged. The lockup is placed inside the area YouTube shows on phones, desktops, and TVs.',
  brand_asset_podcast_cover_title: 'Brand page asset heading for the Capgo podcast cover art download.',
  brand_asset_podcast_cover_desc:
    'Brand page description of the 3000×3000 podcast cover art. Keep Capgo, Apple Podcasts, Spotify, and 3000×3000 unchanged.',
  compare_rank_link_aria:
    'Accessible aria-label on a comparison ranking card link in ComparisonPage. Describe the Capgo vs competitor comparison destination, not visible button text.',
} as const satisfies Partial<Record<MessageKey, string>>
