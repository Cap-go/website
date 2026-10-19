import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'target-users-unclear-2-1',
  batchId: 'batch-1',
  sortOrder: 33,
  title: 'Review paused until Apple knew who the app was for',
  guidelineLabel: '2.1 Information Needed',
  tags: ['2-1'],
  platform: 'iOS',
  body:
    'A developer submitted version 1.0 of an iPad app and review stopped under Guideline 2.1, Information Needed. There was no crash report, no broken feature, and no requested binary fix. Apple only wanted a detailed answer to one question before review could continue: who would use this app.',
  resolution: 'Apple asked for a target user explanation before continuing review.',
  lesson:
    'Treat audience and use case as review inputs, not marketing copy you can fill in later. Write a clear target user answer before you submit a first version.',
}
