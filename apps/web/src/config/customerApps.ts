/** Apps shipping with Capgo, with public store install counts. Icons live in /public/logo_cloud. */
export interface CustomerApp {
  name: string
  icon: string
  installs: string
}

export const customerApps: CustomerApp[] = [
  { name: 'Kick', icon: '/logo_cloud/kick_logo.webp', installs: '20M+' },
  { name: 'Vaia', icon: '/logo_cloud/vaia_logo.webp', installs: '10M+' },
  { name: 'Suez', icon: '/logo_cloud/suez_logo.webp', installs: '3.2M' },
  { name: 'Nana', icon: '/logo_cloud/nana_logo.webp', installs: '2.5M' },
  { name: 'Snowqueen', icon: '/logo_cloud/snowqueen_logo.webp', installs: '1.8M' },
  { name: 'StyleSeat', icon: '/logo_cloud/styleseat_logo.webp', installs: '1M+' },
  { name: 'Huckleberry', icon: '/logo_cloud/huckleberry_logo.webp', installs: '1M+' },
  { name: 'SuperFrete', icon: '/logo_cloud/superfrete_logo.webp', installs: '1M+' },
  { name: 'Pizza Hut', icon: '/logo_cloud/pizza_hut_logo.webp', installs: '1M+' },
  { name: 'Shelf', icon: '/logo_cloud/shelf_logo.webp', installs: '950K' },
  { name: 'Janitor', icon: '/logo_cloud/janitor_logo.webp', installs: '750K' },
  { name: 'RemNote', icon: '/logo_cloud/remnote_logo.webp', installs: '500K+' },
  { name: 'Somtoday', icon: '/logo_cloud/somtoday_logo.webp', installs: '500K+' },
  { name: 'Vella', icon: '/logo_cloud/vella_logo.webp', installs: '400K+' },
  { name: 'Revel', icon: '/logo_cloud/revel_logo.webp', installs: '250K+' },
  { name: 'IREC', icon: '/logo_cloud/irec_logo.webp', installs: '150K+' },
  { name: '360Player', icon: '/logo_cloud/360player_logo.webp', installs: '100K+' },
  { name: 'Finax', icon: '/logo_cloud/finax_logo.webp', installs: '100K+' },
  { name: 'OurLiving', icon: '/logo_cloud/our_living_logo.webp', installs: '80K+' },
]
