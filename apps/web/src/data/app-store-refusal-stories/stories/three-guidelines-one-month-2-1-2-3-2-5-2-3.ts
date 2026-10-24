import { batch4Story } from '../batch4Factory'

export const story = batch4Story('three-guidelines-one-month-2-1-2-3-2-5-2-3', 54, {
  title: 'First submission: 2.1, then 2.3.2, then 5.2.3 over a month',
  guidelineLabel: 'Guidelines 2.1, 2.3.2, and 5.2.3',
  tags: ['2-1', '2-3-2', '5-2-3', 'endless-review'],
  platform: 'iOS',
  body:
    'A developer\'s first ever submission waited six days and was rejected under 2.1. They answered the same day. Twelve days later it was rejected again, this time under 2.3.2. They resubmitted, and nine days after that it was rejected under 5.2.3. They answered the same day again and, two days later, were still waiting. Each round raised a different guideline than the one before.',
  resolution: 'Still waiting, more than a month after the first submission.',
  lesson:
    'Every round trip can surface a new guideline, and each one can cost a week or more. Before a first submission, read the metadata rules (2.3) and any content rights rules that apply to you (5.2), not only the completeness rules (2.1), and fix everything you can find in one build.',
})
