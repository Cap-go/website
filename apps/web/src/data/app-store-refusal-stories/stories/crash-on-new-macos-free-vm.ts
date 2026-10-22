import type { AppleRejectionStory } from '../types'

export const story: AppleRejectionStory = {
  id: 'crash-on-new-macos-free-vm',
  batchId: 'batch-2',
  sortOrder: 47,
  title: 'Rejected for a crash on a macOS version the developer had not installed',
  guidelineLabel: 'Crash during review (guideline not stated)',
  tags: ['2-1'],
  platform: 'macOS',
  body:
    'A Mac app was rejected because it crashed on macOS 27, a version the developer was not running yet and did not want to install on their main machine. While looking for a way to reproduce the crash, they found that Apple\'s Virtualization framework can run a macOS virtual machine on Apple silicon at no cost, and set one up to test on the new version.',
  resolution: 'Not stated beyond reproducing the crash in a virtual machine.',
  lesson:
    'App Review tests on the newest OS. Keep a virtual machine with the latest macOS ready so you can reproduce review crashes without upgrading your daily machine.',
}
