// The worker only caches metrics computed upstream; it never recomputes them.
export async function fetchUpstreamJson(url: string, fetchImpl: typeof fetch = fetch): Promise<unknown> {
  const response = await fetchImpl(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`${url} HTTP ${response.status}`)
  return response.json()
}
