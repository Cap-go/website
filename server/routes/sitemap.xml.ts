import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    // eslint-disable-next-line no-console
    console.log(config.public.baseUrl)

    const smStream = new SitemapStream({ hostname: config.public.baseUrl })

    smStream.write({ url: '/', changefreq: 'daily', priority: 1 })
    smStream.write({ url: '/app_mobile/', changefreq: 'weekly', priority: 1 })
    smStream.write({ url: '/pricing/', changefreq: 'weekly', priority: 1 })

    smStream.write({ url: '/blog/', changefreq: 'weekly', priority: 1 })

    const blogs = await serverQueryContent(event).where({ published: true }).sort({ created_at: -1 }).find()

    blogs.forEach((article: any) => {
      smStream.write({
        url: `/blog/${article.slug}/`,
        changefreq: 'weekly',
        priority: 0.5,
      })
    })
    smStream.end()
    const data = await streamToPromise(smStream)
    event.res.setHeader('Content-Type', 'application/xml')
    return data.toString()
  }
  catch (e) {
    console.error(e)
    event.res.statusCode = 500
    return {}
  }
})
