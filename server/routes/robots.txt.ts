export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const data = `User-agent: *\nAllow: /\nUser-agent: *\nDisallow: /rss.xml\nSitemap: ${config.public.baseUrl}/sitemap.xml`
    event.node.res.setHeader('Content-Type', 'text/plain')
    return data.toString()
  }
  catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
