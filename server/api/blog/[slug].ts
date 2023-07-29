import { serverQueryContent } from '#content/server'
import type { MyCustomParsedContent } from '~/services/blog'

export default defineEventHandler(async (event) => {
  try {
    const blog = await serverQueryContent<MyCustomParsedContent>(event)
      .where({ slug: event.context.params?.slug ?? '' })
      .findOne()

    const related = await serverQueryContent<MyCustomParsedContent>(event)
      .where({ published: true, slug: { $ne: blog.slug } })
      .sort({ created_at: -1 })
      .limit(3)
      .find()
    if (blog.next_blog != null) {
      const nextBlog = await serverQueryContent<MyCustomParsedContent>(event)
        .where({ slug: blog.next_blog })
        .findOne()
      if (nextBlog)
        related[0] = nextBlog
    }
    return { blog, related }
  }
  catch (e) {
    console.error(e)
    event.res.statusCode = 500
    return {}
  }
})
