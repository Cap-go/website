import { expect, test } from 'bun:test'
import {
  appendAttributionToUrl,
  deserializeAttribution,
  isRegisterOrConsoleLink,
  mergeFirstTouch,
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

test('mergeFirstTouch keeps existing attribution', () => {
  const existing = { ref: 'plugin_first' }
  const fromUrl = { ref: 'plugin_second', utm_source: 'x' }
  expect(mergeFirstTouch(existing, fromUrl)).toEqual(existing)
})

test('signupPluginFromRef strips plugin_ prefix', () => {
  expect(signupPluginFromRef('plugin_capacitor-updater')).toBe('capacitor-updater')
  expect(signupPluginFromRef('newsletter')).toBeUndefined()
})

test('toPostHogAttributionProps maps first-touch fields', () => {
  expect(
    toPostHogAttributionProps({
      ref: 'plugin_foo',
      utm_source: 'gh',
      utm_medium: 'readme',
      utm_campaign: 'q1',
    }),
  ).toEqual({
    signup_ref: 'plugin_foo',
    signup_plugin: 'foo',
    first_utm_source: 'gh',
    first_utm_medium: 'readme',
    first_utm_campaign: 'q1',
  })
})

test('deserializeAttribution ignores unknown keys', () => {
  expect(deserializeAttribution('{"ref":"plugin_x","email":"secret@x.com"}')).toEqual({ ref: 'plugin_x' })
})

test('isRegisterOrConsoleLink matches register and console urls', () => {
  expect(isRegisterOrConsoleLink('/register/')).toBe(true)
  expect(isRegisterOrConsoleLink('/de/register/')).toBe(true)
  expect(isRegisterOrConsoleLink('https://console.capgo.app/login/')).toBe(true)
  expect(isRegisterOrConsoleLink('/pricing/')).toBe(false)
})

test('appendAttributionToUrl adds missing params without overwriting', () => {
  const data = { ref: 'plugin_a', utm_source: 'github' }
  expect(appendAttributionToUrl('/register/', data)).toBe('/register/?ref=plugin_a&utm_source=github')
  expect(appendAttributionToUrl('/register/?ref=existing', data)).toBe('/register/?ref=existing&utm_source=github')
  expect(appendAttributionToUrl('https://console.capgo.app/login/', data)).toBe('https://console.capgo.app/login/?ref=plugin_a&utm_source=github')
})
