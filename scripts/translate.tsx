import 'dotenv/config'

// export const translateText = async (text: string, lang: string) => {
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: 'gpt-4o-mini',
//       messages: [
//         {
//           role: 'system',
//           content: `Only respond with the translation of the text. No other or unrelated text or characters. Make sure to avoid translating links, HTML tags, code blocks, image links.`,
//         },
//         {
//           role: 'user',
//           content: `Translate the following text to ${lang} locale:\n\n${text}`,
//         },
//       ],
//       max_tokens: 4000,
//     }),
//   })
//   if (response.status !== 200) {
//     console.error(response.statusText)
//     return null
//   }
//   const data = await response.json()
//   return data.choices[0].message.content.trim()
// }

export const translateText = async (text: string, lang: string) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.ANTHROPIC_API_KEY}`,
    },
    body: JSON.stringify({
      max_tokens: 4000,
      model: 'claude-3-5-sonnet-20240620',
      messages: [
        {
          role: 'system',
          content: `Only respond with the translation of the text. No other or unrelated text or characters. Make sure to avoid translating links, HTML tags, code blocks, image links.`,
        },
        {
          role: 'user',
          content: `Translate the following text to ${lang} locale:\n\n${text}`,
        },
      ],
    }),
  })
  if (response.status !== 200) {
    console.error(response.statusText)
    return null
  }
  const data = await response.json()
  return data.content[0].text
}

// export const translateText = async (text: string, lang: string) => {
//   const params = new URLSearchParams({
//     string: text,
//     to_lang: lang,
//     from_lang: 'en',
//   })
//   const response = await fetch(`https://api.datpmt.com/api/v2/dictionary/translate?${params.toString()}`)
//   return await response.json()
// }
