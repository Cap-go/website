import { expect, test } from 'bun:test'
import {
  appendAttributionToUrl,
  buildFirstTouchAttribution,
  classifyFirstTouchType,
  deriveSignupSource,
  deserializeAttribution,
  isRegisterOrConsoleLink,
  mergeFirstTouch,
  mergeStoredAttributionSlices,
  normalizeFirstTouchPath,
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
