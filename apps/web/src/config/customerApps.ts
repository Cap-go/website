import type { MessageKey } from '@/copy/messages'

/** Apps shipping with Capgo, with public store install counts. Icons live in /public/logo_cloud. */
export interface CustomerApp {
  name: string
  icon: string
  role?: MessageKey
  installs: string
}

export const customerApps: CustomerApp[] = [
  { name: 'Kick', icon: '/logo_cloud/kick_logo.webp', installs: '20M+' },
  { name: 'Vaia', icon: '/logo_cloud/vaia_logo.webp', installs: '10M+' },
  { name: 'Suez', icon: '/logo_cloud/suez_logo.webp', installs: '3.2M' },
  { name: 'Nana', icon: '/logo_cloud/nana_logo.webp', installs: '2.5M' },
  { name: 'Snowqueen', icon: '/logo_cloud/snowqueen_logo.webp', installs: '1.8M' },
  { name: 'StyleSeat', icon: '/logo_cloud/styleseat_logo.webp', installs: '1M+' },
  { name: 'OneMain Financial', icon: '/logo_cloud/onemain_financial_logo.webp', installs: '1M+' },
  { name: 'Huckleberry', icon: '/logo_cloud/huckleberry_logo.webp', installs: '1M+' },
  { name: 'SuperFrete', icon: '/logo_cloud/superfrete_logo.webp', installs: '1M+' },
  { name: 'Pizza Hut', icon: '/logo_cloud/pizza_hut_logo.webp', installs: '1M+' },
  { name: 'Shelf', icon: '/logo_cloud/shelf_logo.webp', installs: '950K' },
  { name: 'Janitor', icon: '/logo_cloud/janitor_logo.webp', installs: '750K' },
  { name: 'Codere', icon: '/logo_cloud/codere_logo.webp', installs: '500K+' },
  { name: 'RemNote', icon: '/logo_cloud/remnote_logo.webp', installs: '500K+' },
  { name: 'Somtoday', icon: '/logo_cloud/somtoday_logo.webp', installs: '500K+' },
  { name: 'Vella', icon: '/logo_cloud/vella_logo.webp', installs: '400K+' },
  { name: 'Revel', icon: '/logo_cloud/revel_logo.webp', installs: '250K+' },
  { name: 'IREC', icon: '/logo_cloud/irec_logo.webp', installs: '150K+' },
  { name: '360Player', icon: '/logo_cloud/360player_logo.webp', installs: '100K+' },
  { name: 'Finax', icon: '/logo_cloud/finax_logo.webp', installs: '100K+' },
  { name: 'OurLiving', icon: '/logo_cloud/our_living_logo.webp', installs: '80K+', role: 'app_strip_coop_hub' },
  { name: "Abuelo's Mexican Restaurant", icon: '/logo_cloud/abuelos_logo.webp', installs: '10K+', role: 'app_strip_dining_rewards' },
  { name: 'Volvo Cars Meny', icon: '/logo_cloud/volvo_logo.webp', installs: '1K+', role: 'app_strip_workplace_dining' },
  { name: 'AXA TH Health', icon: '/logo_cloud/axa_th_health_logo.webp', installs: '1K+', role: 'app_strip_health_coverage' },
  { name: 'Scania Meny', icon: '/logo_cloud/scania_logo.webp', installs: '500+', role: 'app_strip_staff_meals' },
]

/** Customer apps featured by name, including internal and event apps without public install figures. */
export const featuredCustomerLogos = [
  { slug: 'scott_sports', name: 'SCOTT Sports', role: 'app_strip_internal_tools' },
  { slug: 'kpmg_davos', name: 'KPMG at Davos', role: 'app_strip_delegate_guide' },
  { slug: 'geely_uni3', name: 'Uni3 by Geely', role: 'app_strip_campus_dining' },
  { slug: 'siemens_realize_live', name: 'Siemens Realize LIVE Asia-Pacific', role: 'app_strip_conference_schedules' },
  { slug: 'nordea_campus', name: 'Nordea Campus', role: 'app_strip_campus_dining' },
  { slug: 'us_foods', name: 'US Foods MOXē', role: 'app_strip_supply_orders' },
  { slug: 'breeze_airways', name: 'Breeze Airways', role: 'app_strip_flight_booking' },
  { slug: 'boston_pizza', name: 'Boston Pizza', role: 'app_strip_takeout_orders' },
  { slug: 'sd_worx', name: 'SD Worx Lønn', role: 'app_strip_payroll_and_time' },
  { slug: 'liberty_financial', name: 'Liberty Financial — Liberty Online', role: 'app_strip_loan_management' },
  { slug: 'burgerfi', name: 'BurgerFi', role: 'app_strip_pickup' },
  { slug: 'cinchpro', name: 'CinchPro', role: 'app_strip_repairs' },
  { slug: 'slovak_lines', name: 'Slovak Lines', role: 'app_strip_bus_tickets' },
  { slug: 'current_health', name: 'Current Health', role: 'app_strip_vitals_tracking' },
  { slug: 'food_and_co', name: 'Food & Co Sverige', role: 'app_strip_workplace_dining' },
  { slug: 'grimaldis', name: 'Grimaldi’s Pizzeria', role: 'app_strip_order_ahead' },
  { slug: 'snap_kitchen', name: 'Snap Kitchen', role: 'app_strip_meal_delivery' },
  { slug: 'wings_and_rings', name: 'Wings and Rings', role: 'app_strip_orders_and_rewards' },
  { slug: 'dangelo', name: 'D’Angelo Grilled Sandwiches', role: 'app_strip_order_ahead' },
  { slug: 'anthonys_pizza', name: 'Anthony’s Coal Fired Pizza', role: 'app_strip_takeout_orders' },
  { slug: 'bad_daddys', name: 'Bad Daddy’s Burger Bar', role: 'app_strip_burger_delivery' },
] satisfies { slug: string; name: string; role: MessageKey }[]
