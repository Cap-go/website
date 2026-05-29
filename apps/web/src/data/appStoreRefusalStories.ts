export interface RefusalStoryImage {
  src: string
  alt: string
}

export interface RefusalStory {
  id: string
  title: string
  platform: 'Apple App Store' | 'Google Play'
  severity: 'Painful' | 'Absurd' | 'Expensive' | 'Launch blocker'
  appType: string
  delay: string
  outcome: string
  quote: string
  story: string
  images: RefusalStoryImage[]
}

export const refusalStories: RefusalStory[] = [
  {
    id: 'metadata-loop-before-launch',
    title: 'The metadata loop that ate launch week',
    platform: 'Apple App Store',
    severity: 'Launch blocker',
    appType: 'Consumer productivity app',
    delay: '9 days',
    outcome: 'Approved after rewriting screenshots, subtitles, and review notes without a binary change.',
    quote: 'The build was fine. The rejection kept moving from the app to the words around the app.',
    story:
      'The team shipped a clean build, then spent more than a week cycling through metadata objections. Each resubmission answered the previous note, but the next reply focused on another phrase, screenshot, or explanation. No code was changed. The launch calendar, press window, and paid acquisition plan were all held hostage by review copy.',
    images: [
      {
        src: '/app-review-guide.webp',
        alt: 'App review guide screen used to represent an Apple App Store rejection workflow',
      },
      {
        src: '/apple_appstore.webp',
        alt: 'App Store publishing interface used to represent a delayed Apple review',
      },
    ],
  },
  {
    id: 'compliance-question-after-approval',
    title: 'Approved, then blocked by one more compliance question',
    platform: 'Apple App Store',
    severity: 'Absurd',
    appType: 'B2B dashboard companion app',
    delay: '4 days',
    outcome: 'Released after answering export compliance again and waiting for the next review pass.',
    quote: 'The approval email landed before the blocker did.',
    story:
      'The build reached approval, but release was still blocked by a compliance prompt the team thought had already been answered. The release owner had to stop rollout, gather legal wording, update the App Store Connect response, and wait again. Customers saw the announcement before the app was actually available.',
    images: [
      {
        src: '/native-build-assets/appstore-connect-manage-build.webp',
        alt: 'App Store Connect build management screen representing a post-approval release blocker',
      },
      {
        src: '/native-build-assets/appstore-connect-manage-build-compliance.webp',
        alt: 'App Store Connect compliance screen representing an extra compliance review step',
      },
    ],
  },
  {
    id: 'permission-policy-time-sink',
    title: 'The permission policy time sink',
    platform: 'Google Play',
    severity: 'Expensive',
    appType: 'Field operations app',
    delay: '13 days',
    outcome: 'Approved after removing a permission, recording a new demo, and rewriting the store declaration.',
    quote: 'The app needed the permission for one screen, but the review treated it like the whole product.',
    story:
      'A narrow Android permission triggered a broad policy review. The team documented the feature, added reviewer instructions, recorded a demo path, and still had to remove the permission from the main release to unblock customers. The final build shipped with a degraded workflow while the team prepared a cleaner permission split.',
    images: [
      {
        src: '/native-build-assets/google-play-console-releases-button.webp',
        alt: 'Google Play Console releases screen representing a blocked release',
      },
      {
        src: '/native-build-assets/google-play-console-select-apk-file.webp',
        alt: 'Google Play Console artifact upload screen representing repeated Android submissions',
      },
      {
        src: '/native-build-assets/google-play-console-save-and-publish.webp',
        alt: 'Google Play Console save and publish screen representing a delayed publication',
      },
    ],
  },
  {
    id: 'production-hotfix-in-review',
    title: 'The hotfix that waited behind a policy queue',
    platform: 'Google Play',
    severity: 'Painful',
    appType: 'Ecommerce app',
    delay: '6 days',
    outcome: 'The native store fix arrived after the team had already mitigated the incident elsewhere.',
    quote: 'The broken checkout was urgent for users, but not urgent for the review queue.',
    story:
      'A checkout bug needed a fast mobile fix, but the store release entered review at the worst possible time. Support tickets climbed while the team watched the same pending status. They eventually mitigated the issue server-side, then watched the binary approval arrive after the emergency had already burned through the weekend.',
    images: [
      {
        src: '/native-build-assets/google-play-console-confirm-publication.webp',
        alt: 'Google Play Console confirmation screen representing a delayed hotfix publication',
      },
      {
        src: '/app_demo.webp',
        alt: 'Mobile app interface representing a production hotfix waiting for store review',
      },
    ],
  },
]

export const storySubmissionFilePath = 'apps/web/src/data/appStoreRefusalStories.ts'
