import type {
  MetaPropertyCharset,
  MetaPropertyEquiv,
  MetaPropertyMicrodata,
  MetaPropertyName,
  MetaPropertyProperty,
} from 'vue-meta/types/vue-meta'

export const createMeta = (
  title: string,
  description: string,
  image: string | null = null,
  author: string | null = null,
  audio: string | null = null,
): (
  | MetaPropertyCharset
  | MetaPropertyEquiv
  | MetaPropertyName
  | MetaPropertyMicrodata
  | MetaPropertyProperty
  )[] => {
  const base = [
    { hid: 'title', name: 'title', content: title },
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
  ]
  if (author) {
    base.push(
      { hid: 'author', name: 'author', content: author },
      { hid: 'og:article:author', name: 'og:article:author', content: author },
    )
  }
  if (image) {
    base.push(
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: title,
      },
      {
        hid: 'og:image:type',
        property: 'og:image:type',
        content: 'image/jpg',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: image,
      },
      { hid: 'og:image:width', property: 'og:image:width', content: '300' },
      { hid: 'og:image:height', property: 'og:image:height', content: '300' },
    )
  }
  if (audio) {
    base.push(
      { hid: 'og:audio', property: 'og:audio', content: audio },
      {
        hid: 'og:audio:type',
        property: 'og:audio:type',
        content: 'audio/mpeg',
      },
    )
  }
  return base
}
