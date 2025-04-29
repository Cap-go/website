import 'dotenv/config'

export const translateTextOpenAI = async (text: string, lang: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Only respond with the translation of the text. No other or unrelated text or characters. Make sure to keep links, HTML tags, code blocks, image links, do not translate them. when Capacitor is used it refers to the CapacitorJs so do not translate that. Re-verify your output to not have additional code block or declaration. Make sure to have the list items in <Steps> component have decimal, such as "1" should be modified to keep "1." in every kind of output. If you see imports but no code block declaration, do not add them by yourself un-necessarily.',
        },
        {
          role: 'user',
          content: `Translate the following text to ${lang} locale:\n\n${text}`,
        },
      ],
      max_tokens: 4000,
    }),
  })
  if (response.status !== 200) {
    console.error('Error Open AI:', response.statusText, await response.json())
    return null
  }
  const data = await response.json()
  return data.choices[0].message.content.trim()
}

const makeAnthropicRequest = async (body: any) => {
  const makeRequest = async () => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.ANTHROPIC_API_KEY}`,
      },
      body: JSON.stringify(body),
    })
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After')
      // console.log('Rate limit exceeded. Retrying after:', retryAfter)
      if (retryAfter) {
        const waitTime = parseInt(retryAfter, 10) * 1000 * 2
        await new Promise((resolve) => setTimeout(resolve, waitTime))
        return makeRequest()
      }
    }
    if (response.status !== 200) {
      console.error('Error Claude:', response.statusText, await response.json())
      return null
    }
    return response.json()
  }

  return makeRequest()
}

export const translateTextAnthropic = async (text: string, lang: string) => {
  const data = await makeAnthropicRequest({
    max_tokens: 4000,
    model: 'claude-3-5-sonnet-20241022',
    system:
      'Only respond with the translation of the text. No other or unrelated text or characters. Make sure to keep links, HTML tags, code blocks, image links, do not translate them. when Capacitor is used it refers to the CapacitorJs so do not translate that. Re-verify your output to not have additional code block or declaration. Make sure to have the list items in <Steps> component have decimal, such as "1" should be modified to keep "1." in every kind of output. If you see imports but no code block declaration, do not add them by yourself un-necessarily.',
    messages: [
      {
        role: 'user',
        content: `Translate the following text to ${lang} locale:\n\n${text}`,
      },
    ],
  })
  return data?.content[0].text
}

const MAX_TOKENS = 4000
const TOKENS_PER_CHAR = 0.25 // Approximate tokens per character

export const translateTextsAnthropic = async (texts: string[], lang: string) => {
  const translateBatch = async (batch: string[]) => {
    const data = await makeAnthropicRequest({
      max_tokens: MAX_TOKENS,
      model: 'claude-3-5-sonnet-20240620',
      system: `Translate the given sentences. Respond with a JSON array of translated sentences. Preserve the order. Don't translate links, HTML tags, code blocks, image links, or the word 'Capacitor' when it refers to CapacitorJs.`,
      messages: [
        {
          role: 'user',
          content: `Translate these sentences to ${lang}:\n\n${JSON.stringify(batch)}`,
        },
      ],
    })
    return data ? (JSON.parse(data.content[0].text) as string[]) : null
  }
  const results: string[] = []
  let currentBatch: string[] = []
  let currentTokens = 0
  for (const text of texts) {
    const textTokens = Math.ceil(text.length * TOKENS_PER_CHAR)
    if (currentTokens + textTokens > MAX_TOKENS) {
      const batchResult = await translateBatch(currentBatch)
      if (batchResult) results.push(...batchResult)
      currentBatch = []
      currentTokens = 0
    }
    currentBatch.push(text)
    currentTokens += textTokens
  }
  if (currentBatch.length > 0) {
    const batchResult = await translateBatch(currentBatch)
    if (batchResult) results.push(...batchResult)
  }
  return results
}

export const translateTextDatpmt = async (text: string, lang: string) => {
  const params = new URLSearchParams({
    string: text,
    to_lang: lang,
    from_lang: 'en',
  })
  const response = await fetch(`https://api.datpmt.com/api/v2/dictionary/translate?${params.toString()}`)
  return await response.json()
}

export const translateText = (text: string, lang: string) => {
  if (process.env.ANTHROPIC_API_KEY) return translateTextAnthropic(text, lang)
  if (process.env.OPENAI_API_KEY) return translateTextOpenAI(text, lang)
  return translateTextDatpmt(text, lang)
}

export const translateTexts = translateTextsAnthropic
