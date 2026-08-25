import { expect, test } from 'bun:test'
import { isSupabaseConfigured, parseSupabaseProjectId } from '../src/services/supabase'

test('parseSupabaseProjectId returns empty string for missing url', () => {
  expect(parseSupabaseProjectId()).toBe('')
  expect(parseSupabaseProjectId('')).toBe('')
})

test('parseSupabaseProjectId extracts project id from supabase url', () => {
  expect(parseSupabaseProjectId('https://abcdefgh.supabase.co')).toBe('abcdefgh')
})

test('isSupabaseConfigured requires host and key', () => {
  expect(isSupabaseConfigured({ supaHost: 'https://x.supabase.co', supaKey: 'anon-key' })).toBe(true)
  expect(isSupabaseConfigured({ supaHost: '', supaKey: 'anon-key' })).toBe(false)
  expect(isSupabaseConfigured({ supaHost: 'https://x.supabase.co', supaKey: '' })).toBe(false)
  expect(isSupabaseConfigured({ supaHost: '   ', supaKey: 'anon-key' })).toBe(false)
})
