interface Meta {

}

export const createMetaImage = (image: string | null = null, title: string | null = null): Meta[] => {
  if (image) {
    const image_unsecure = image.replace('https://', 'http://')
    const titleFix = title || (image.split('/').pop() || '.').split('.')[0]
    return [
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: titleFix,
      },
      {
        hid: 'og:image:type',
        property: 'og:image:type',
        content: 'image/webp',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: image_unsecure,
      },
      {
        hid: 'og:image:secure',
        property: 'og:image:secure',
        content: image,
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: image,
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width', content: '1200',
      },
      {
         hid: 'og:image:height',
        property: 'og:image:height', content: '627',
      },
    ]
  }
  return []
}

export const createMeta = (
  title: string,
  description: string,
  image: string | null = null,
  author: string | null = null,
  audio: string | null = null,
): Meta[] => {
  const base: Meta[] = [
    {
      hid: 'title',
      name: 'title', content: title,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title,
    },
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
  ]
  if (author) {
    base.push(
      {
        hid: 'author',
        name: 'author', content: author,
      },
      {
        hid: 'og:article:author',
        name: 'og:article:author', content: author,
      },
    )
  }
  if (image)
    base.push(...createMetaImage(image))

  if (audio) {
    base.push(
      {
        hid: 'og:audio',
        property: 'og:audio', content: audio,
      },
      {
        hid: 'og:audio:type',
        property: 'og:audio:type',
        content: 'audio/mpeg',
      },
    )
  }
  // console.log('base', base)
  return base
}
