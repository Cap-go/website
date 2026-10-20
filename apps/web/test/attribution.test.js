import { expect, test } from 'bun:test'
import {
  appendAttributionToUrl,
  buildFirstTouchAttribution,
  classifyFirstTouchType,
  deriveSignupSource,
  deserializeAttribution,
  getSignupAttributionForEvents,
  getSignupUserMetadataForRegistration,
  hasAttributionValues,
  hasDirectOffer,
  isRegisterOrConsoleLink,
  mergeAttribution,
  mergeFirstTouch,
  mergeStoredAttributionSlices,
  normalizeFirstTouchPath,
  normalizeOffer,
  parseAttributionFromSearch,
  signupPluginFromRef,
  toPostHogAttributionProps,
} from '../src/lib/attribution'

test('parseAttributionFromSearch reads ref and utm params', () => {
  expect(parseAttributionFromSearch('?ref=plugin_foo&utm_source=github&utm_medium=readme&utm_campaign=launch')).toEqual({
    ref: 'plugin_foo',
    utm_source: 'github',
    utm_medium: 'readme',
    utm_campaign: 'launch',
  })
})

test('mergeStoredAttributionSlices keeps localStorage first touch when cookie only has ref', () => {
  expect(mergeStoredAttributionSlices({ ref: 'plugin_foo' }, { first_touch_type: 'plugin', first_touch_path: '/plugins/foo/' })).toEqual({
    ref: 'plugin_foo',
    first_touch_type: 'plugin',
    first_touch_path: '/plugins/foo/',
  })
})

test('mergeStoredAttributionSlices reclassifies legacy login other pairs', () => {
  expect(mergeStoredAttributionSlices({ first_touch_type: 'other', first_touch_path: '/login/' }, null)).toEqual({
    first_touch_type: 'console',
    first_touch_path: '/login/',
  })
})

test('mergeFirstTouch backfills first touch without overwriting ref', () => {
  const existing = { ref: 'plugin_first' }
  const fromUrl = {
    ref: 'plugin_second',
    utm_source: 'x',
    first_touch_type: 'plugin',
    first_touch_path: '/plugins/foo/',
  }
  expect(mergeFirstTouch(existing, fromUrl)).toEqual({
    ref: 'plugin_first',
    utm_source: 'x',
    first_touch_type: 'plugin',
    first_touch_path: '/plugins/foo/',
  })
})

test('classifyFirstTouchType maps marketing paths', () => {
  expect(classifyFirstTouchType('/')).toBe('home')
  expect(classifyFirstTouchType('/pricing/')).toBe('pricing')
  expect(classifyFirstTouchType('/blog/my-post/')).toBe('blog')
  expect(classifyFirstTouchType('/docs/plugins/foo/')).toBe('docs')
  expect(classifyFirstTouchType('/plugins/capacitor-updater/')).toBe('plugin')
  expect(classifyFirstTouchType('/solutions/enterprise/')).toBe('solutions')
  expect(classifyFirstTouchType('/contact/')).toBe('other')
})

test('normalizeFirstTouchPath strips locale prefix', () => {
  expect(normalizeFirstTouchPath('/de/blog/my-post/')).toBe('/blog/my-post/')
})

test('buildFirstTouchAttribution merges query params and landing path', () => {
  expect(buildFirstTouchAttribution('?ref=plugin_x', '/fr/plugins/foo/')).toEqual({
    ref: 'plugin_x',
    first_touch_type: 'plugin',
    first_touch_path: '/plugins/foo/',
  })
})

test('signupPluginFromRef strips plugin_ prefix', () => {
  expect(signupPluginFromRef('plugin_capacitor-updater')).toBe('capacitor-updater')
  expect(signupPluginFromRef('newsletter')).toBeUndefined()
})

test('deriveSignupSource prefers ref then utm then internal page labels', () => {
  expect(deriveSignupSource({ ref: 'plugin_foo' })).toBe('plugin_foo')
  expect(deriveSignupSource({ utm_source: 'newsletter', first_touch_type: 'home', first_touch_path: '/' })).toBe('newsletter')
  expect(
    deriveSignupSource({
      first_touch_type: 'blog',
      first_touch_path: '/blog/live-updates/',
    }),
  ).toBe('blog:live-updates')
  expect(deriveSignupSource({ first_touch_type: 'console', first_touch_path: '/login/' })).toBe('console')
  expect(deriveSignupSource({ first_touch_type: 'cli', first_touch_path: '/login-cli/' })).toBe('cli')
  expect(
    deriveSignupSource({
      first_touch_type: 'docs',
      first_touch_path: '/docs/plugins/install-referrer/',
    }),
  ).toBe('docs:plugins/install-referrer')
})

test('toPostHogAttributionProps maps first-touch fields', () => {
  expect(
    toPostHogAttributionProps({
      ref: 'plugin_foo',
      utm_source: 'gh',
      utm_medium: 'readme',
      utm_campaign: 'q1',
      first_touch_type: 'plugin',
      first_touch_path: '/plugins/foo/',
    }),
  ).toEqual({
    signup_ref: 'plugin_foo',
    signup_plugin: 'foo',
    first_utm_source: 'gh',
    first_utm_medium: 'readme',
    first_utm_campaign: 'q1',
    first_touch_type: 'plugin',
    first_touch_path: '/plugins/foo/',
    signup_source: 'plugin_foo',
  })
})

test('deserializeAttribution ignores unknown keys', () => {
  expect(deserializeAttribution('{"ref":"plugin_x","email":"secret@x.com"}')).toEqual({ ref: 'plugin_x' })
})

test('isRegisterOrConsoleLink matches register and console urls', () => {
  expect(isRegisterOrConsoleLink('/register/')).toBe(true)
  expect(isRegisterOrConsoleLink('/de/register/', 'https://capgo.app/de/pricing/')).toBe(true)
  expect(isRegisterOrConsoleLink('https://console.capgo.app/login/')).toBe(true)
  expect(isRegisterOrConsoleLink('/pricing/')).toBe(false)
  expect(isRegisterOrConsoleLink('https://other.example/register/')).toBe(false)
  expect(isRegisterOrConsoleLink('https://console.capgo.app.other.example/login/')).toBe(false)
})

test('appendAttributionToUrl preserves locale-relative register links', () => {
  const data = { ref: 'plugin_a' }
  expect(appendAttributionToUrl('register/', data, 'https://capgo.app/de/pricing/')).toBe('register/?ref=plugin_a&signup_source=plugin_a')
})

test('appendAttributionToUrl adds missing params without overwriting', () => {
  const data = {
    ref: 'plugin_a',
    utm_source: 'github',
    first_touch_type: 'blog',
    first_touch_path: '/blog/post/',
  }
  expect(appendAttributionToUrl('/register/', data)).toBe(
    '/register/?ref=plugin_a&utm_source=github&first_touch_type=blog&first_touch_path=%2Fblog%2Fpost%2F&signup_source=plugin_a',
  )
  expect(appendAttributionToUrl('/register/?ref=existing', data)).toBe(
    '/register/?ref=existing&utm_source=github&first_touch_type=blog&first_touch_path=%2Fblog%2Fpost%2F&signup_source=plugin_a',
  )
  expect(appendAttributionToUrl('https://console.capgo.app/login/', data)).toBe(
    'https://console.capgo.app/login/?ref=plugin_a&utm_source=github&first_touch_type=blog&first_touch_path=%2Fblog%2Fpost%2F&signup_source=plugin_a',
  )
})

test('appendAttributionToUrl adds signup_source from landing page when ref is absent', () => {
  const data = {
    first_touch_type: 'pricing',
    first_touch_path: '/pricing/',
  }
  expect(appendAttributionToUrl('/register/', data)).toBe('/register/?first_touch_type=pricing&first_touch_path=%2Fpricing%2F&signup_source=pricing')
})

test('parseAttributionFromSearch only accepts offer=direct', () => {
  expect(parseAttributionFromSearch('?offer=direct&utm_source=google')).toEqual({ utm_source: 'google', offer: 'direct' })
  expect(parseAttributionFromSearch('?offer=%20direct%20')).toEqual({ offer: 'direct' })
  expect(parseAttributionFromSearch('?offer=free')).toEqual({})
  expect(parseAttributionFromSearch('?offer=DIRECT')).toEqual({})
  expect(parseAttributionFromSearch('?offer=')).toEqual({})
})

test('normalizeOffer ignores anything but direct', () => {
  expect(normalizeOffer('direct')).toBe('direct')
  expect(normalizeOffer('trial')).toBeUndefined()
  expect(normalizeOffer(undefined)).toBeUndefined()
  expect(normalizeOffer(1)).toBeUndefined()
})

test('offer alone counts as attribution worth persisting', () => {
  expect(hasAttributionValues({ offer: 'direct' })).toBe(true)
  expect(hasDirectOffer({ offer: 'direct' })).toBe(true)
  expect(hasDirectOffer({ ref: 'x' })).toBe(false)
  expect(hasDirectOffer(null)).toBe(false)
})

test('deserializeAttribution keeps a stored direct offer and drops unknown offers', () => {
  expect(deserializeAttribution('{"offer":"direct","first_touch_type":"solutions","first_touch_path":"/solutions/build-without-mac/"}')).toEqual({
    offer: 'direct',
    first_touch_type: 'solutions',
    first_touch_path: '/solutions/build-without-mac/',
  })
  expect(deserializeAttribution('{"offer":"free","ref":"x"}')).toEqual({ ref: 'x' })
  expect(deserializeAttribution('{"offer":"free"}')).toBeNull()
})

test('mergeAttribution keeps first-touch fields and survives navigation to /register', () => {
  const landing = buildFirstTouchAttribution('?offer=direct&utm_source=google', '/live-update/')
  const stored = mergeAttribution(null, landing)
  expect(stored).toEqual({ offer: 'direct', utm_source: 'google', first_touch_type: 'other', first_touch_path: '/live-update/' })
  // Second page view on /register/ without query params keeps the stored offer.
  expect(mergeAttribution(stored, buildFirstTouchAttribution('', '/register/'))).toEqual(stored)
  // An organic first touch later picks up the ad offer.
  expect(mergeAttribution({ first_touch_type: 'home', first_touch_path: '/' }, { offer: 'direct' })).toEqual({
    first_touch_type: 'home',
    first_touch_path: '/',
    offer: 'direct',
  })
  // Garbage incoming offers are ignored.
  expect(mergeAttribution({ ref: 'x' }, { offer: 'free' })).toEqual({ ref: 'x' })
})

test('mergeStoredAttributionSlices reads offer from either cookie or localStorage', () => {
  expect(mergeStoredAttributionSlices(null, { offer: 'direct' })).toEqual({ offer: 'direct' })
  expect(mergeStoredAttributionSlices({ offer: 'direct' }, null)).toEqual({ offer: 'direct' })
})

test('toPostHogAttributionProps exposes signup_offer', () => {
  expect(toPostHogAttributionProps({ offer: 'direct', utm_source: 'google' })).toEqual({
    first_utm_source: 'google',
    signup_source: 'google',
    signup_offer: 'direct',
  })
})

test('appendAttributionToUrl forwards offer=direct to register and console links', () => {
  expect(appendAttributionToUrl('/register/', { offer: 'direct' })).toBe('/register/?offer=direct')
  expect(appendAttributionToUrl('https://console.capgo.app/login/', { offer: 'direct', utm_source: 'google' })).toBe(
    'https://console.capgo.app/login/?utm_source=google&offer=direct&signup_source=google',
  )
})

function withBrowserGlobals(search, pathname, cookie, run) {
  const store = new Map()
  const previous = { window: globalThis.window, document: globalThis.document, localStorage: globalThis.localStorage, location: globalThis.location }
  const location = { search, pathname, protocol: 'https:', hostname: 'capgo.app' }
  globalThis.window = { location }
  globalThis.location = location
  globalThis.document = { cookie }
  globalThis.localStorage = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
  }
  try {
    return run()
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key]
      else globalThis[key] = value
    }
  }
}

test('getSignupUserMetadataForRegistration and events include the stored direct offer on /register', () => {
  const cookie = `capgo_attribution=${encodeURIComponent(JSON.stringify({ offer: 'direct', utm_source: 'google', first_touch_type: 'other', first_touch_path: '/live-update/' }))}`
  withBrowserGlobals('', '/register/', cookie, () => {
    expect(getSignupUserMetadataForRegistration()).toEqual({
      signup_source: 'google',
      first_touch_type: 'other',
      first_touch_path: '/live-update/',
      utm_source: 'google',
      offer: 'direct',
    })
    expect(getSignupAttributionForEvents()).toEqual({
      signup_source: 'google',
      first_touch_type: 'other',
      first_touch_path: '/live-update/',
      signup_offer: 'direct',
    })
  })
})

test('registration metadata reads offer=direct straight from the register URL and ignores other values', () => {
  withBrowserGlobals('?offer=direct', '/register/', '', () => {
    expect(getSignupUserMetadataForRegistration().offer).toBe('direct')
    expect(getSignupAttributionForEvents().signup_offer).toBe('direct')
  })
  withBrowserGlobals('?offer=trial', '/register/', '', () => {
    expect(getSignupUserMetadataForRegistration().offer).toBeUndefined()
    expect(getSignupAttributionForEvents().signup_offer).toBeUndefined()
  })
})
