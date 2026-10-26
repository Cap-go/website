// The worker only caches metrics computed upstream; it never recomputes them.
export async function fetchUpstreamJson(url: string, fetchImpl: typeof fetch = fetch): Promise<unknown> {
  const response = await fetchImpl(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`${url} HTTP ${response.status}`)
  return response.json()
}

// The page normalizers default missing values to 0 and drop bad rows, so check the payload first:
// a malformed one must keep the last good payload, not publish a 0% rate or an empty chart.
export function isValidMetricPayload(payload: unknown, trendKeys: string[]): boolean {
  if (!payload || typeof payload !== 'object') return false
  const record = payload as Record<string, unknown>
  const { success_rate, updated_at } = record
  if (typeof success_rate !== 'number' || !Number.isFinite(success_rate) || typeof updated_at !== 'string' || updated_at === '') return false
  return trendKeys.every((key) => {
    const rows = record[key]
    return Array.isArray(rows) && rows.every((row) => row !== null && typeof row === 'object' && typeof (row as { date?: unknown }).date === 'string')
  })
}
