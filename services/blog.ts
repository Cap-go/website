import dayjs from 'dayjs'

export const formatTime = (s: string) => {
  // use dayjs to parse dd-mm-yyyy
  const d = dayjs(s, 'YYYY-MM-DD')
  return d.format('MMMM DD, YYYY')
}

export const randomArticle = async (slug: string) => {
  const content = await useAsyncData('count', () =>
    queryContent('blog').where({ published: true }).find(),
  )
  const articles = content.data.value
  const list = articles.filter(a => a.slug !== slug)
  const index = Math.floor(Math.random() * list.length)

  return list[index]
}
