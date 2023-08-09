import dayjs from 'dayjs'

export interface MyCustomParsedContent extends ParsedContent {
  slug: string
  title: string
  description: string
  author: string
  author_url: string
  created_at: string
  updated_at: string
  head_image: string
  head_image_alt: string
  tag: string
  published: boolean
  next_blog: string
}

export function formatTime(s: string) {
  // use dayjs to parse dd-mm-yyyy
  const d = dayjs(s, 'YYYY-MM-DD')
  return d.format('MMMM DD, YYYY')
}

export async function randomArticle(slug: string) {
  const content = await useAsyncData('randomArticle', () => queryContent<MyCustomParsedContent>('blog').where({ published: true }).find())
  const articles = content.data.value || []
  const list = articles.filter((a) => a.slug !== slug)
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}
