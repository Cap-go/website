export const webResponse = (body: any, status?: number, headers?: Record<any, any>): Response => {
  return new Response(body || null, {
    status: status || 200,
    headers: {
      ...(headers || {}),
    },
  })
}

export const webJson = (body: any, status?: number, headers?: Record<any, any>): Response => {
  return webResponse(JSON.stringify(body), status || 200, {
    ...headers,
    'Content-Type': 'application/json',
  })
}

export const webRedirect = (path: any, status?: number, headers?: Record<any, any>): Response => {
  return webResponse(null, status || 302, {
    ...headers,
    Location: path,
  })
}
