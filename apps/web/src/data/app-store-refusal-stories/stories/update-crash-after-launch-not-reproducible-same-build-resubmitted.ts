import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'update-crash-after-launch-not-reproducible-same-build-resubmitted',
  batchId: 'batch-24',
  sortOrder: 126,
  title:
    'A 1.0.1 update was rejected overnight for crashing after launch, with no crash log, and the crash could not be reproduced anywhere',
  guidelineLabel: 'Guideline 2.1 App Completeness (crash after first launch)',
  tags: ['2-1'],
  platform: 'iOS',
  body: "An indie developer's 1.0.1 update was rejected overnight with a one line reason: the app crashed after the initial launch. The notice had no crash log, no device model and no steps to reproduce. The developer rebuilt that exact build in Release mode and replayed a first launch on three simulators, covering fresh installs, permission prompts and relaunches, without a single crash. The same build installed from TestFlight on their own iPhone also ran fine.",
  resolution:
    'They replied to App Review asking for the crash log and resubmitted the same build. They were still waiting for an answer at the time of posting.',
  lesson:
    'A crash you cannot reproduce usually lives in a state the reviewer hit and you did not, such as another device, OS version, region, network or a brand new account. Ask for the crash log in your reply, and test a clean install on a real device that is not your daily phone, on the oldest iOS version you support, before you send the same build back.',
}