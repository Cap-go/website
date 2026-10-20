import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'social-login-reviewer-stuck',
  batchId: 'batch-1',
  sortOrder: 21,
  title: 'Reviewer could not sign in with Apple or Google',
  guidelineLabel: 'Login (guideline number not stated)',
  tags: ['login'],
  platform: 'iOS',
  body: 'To stop bot signups, a developer removed email and password login and kept only Sign in with Apple and Google sign in. It worked on their own iPhone and iPad, and even for the previous reviewer, who had rejected the app for a different reason. The next reviewer rejected it because they could not log in.',
  resolution: 'Not stated.',
  lesson:
    'If your app only offers social login, reviewers can still get stuck. Give them a working path in the review notes, such as a demo account or a review only login, and test sign in on a fresh device and account before each submission.',
}
