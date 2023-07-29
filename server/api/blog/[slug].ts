import { serverQueryContent } from '#content/server'
import type { MyCustomParsedContent } from '~/services/blog'

export default defineEventHandler(async (event) => {
  if (!event.context.params?.slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing slug',
    })
  }
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
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
