import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'openai-in-metadata-china-guideline-5',
  batchId: 'batch-5',
  sortOrder: 57,
  title: 'Guideline 5 rejection over OpenAI in metadata for China',
  guidelineLabel: 'Guideline 5 (Legal)',
  tags: ['5-0'],
  platform: 'iOS',
  body: 'An AI app was rejected under Guideline 5 Legal because its metadata mentioned OpenAI. Apple explained that China requires a government license for generative AI and deep synthesis services, that ChatGPT lacks that permit, and that the developer must either remove the AI functionality and every OpenAI or ChatGPT reference from the name, subtitle, promotional text, description, and screenshots for the China storefront, or stop distributing in China mainland.',
  resolution: 'The developer recommends deselecting the China mainland storefront in Availability before submitting an app that names those services, which saves a review cycle.',
  lesson: 'If your app is built on a generative AI provider, decide on China availability up front. The rejection is about the storefront and metadata, not your code alone.',
}
