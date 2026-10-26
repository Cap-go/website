// The worker only caches metrics computed upstream; it never recomputes them.
export async function fetchUpstreamJson(url: string, fetchImpl: typeof fetch = fetch): Promise<unknown> {
  const response = await fetchImpl(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`${url} HTTP ${response.status}`)
  return response.json()
}

// The page normalizers default missing values to 0, so check the headline fields first:
// a payload without them must keep the last good one, not publish a 0% success rate.
export function hasMetricHeadline(payload: unknown): boolean {
  if (!payload || typeof payload !== 'object') return false
  const { success_rate, updated_at } = payload as { success_rate?: unknown; updated_at?: unknown }
  return typeof success_rate === 'number' && Number.isFinite(success_rate) && typeof updated_at === 'string' && updated_at !== ''
}
