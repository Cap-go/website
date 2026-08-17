import { expect, test } from 'bun:test'
import { getRegistrationDevice } from '../src/services/registration-device'

test('classifies touch-capable Macintosh user agents as iPadOS', () => {
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15'

  expect(getRegistrationDevice(userAgent, 5)).toEqual({
    registration_device_type: 'tablet',
    registration_os: 'iPadOS',
    registration_browser: 'Safari',
  })
})

test('classifies default iPad user agents as iPadOS', () => {
  const userAgent = 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'

  expect(getRegistrationDevice(userAgent, 5)).toEqual({
    registration_device_type: 'tablet',
    registration_os: 'iPadOS',
    registration_browser: 'Safari',
  })
})

test('keeps non-touch Macintosh user agents classified as macOS', () => {
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15'

  expect(getRegistrationDevice(userAgent, 0)).toEqual({
    registration_device_type: 'desktop',
    registration_os: 'macOS',
    registration_browser: 'Safari',
  })
})
