import { serverQueryContent } from '#content/server'
import type { MyCustomParsedContent } from '~/services/blog'

export default defineEventHandler(async (event) => {
  try {
    const blogs = await serverQueryContent<MyCustomParsedContent>(event).where({ published: true }).sort({ created_at: -1 }).find()
    return blogs
  }
  catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
