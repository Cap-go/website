export interface CliFeature {
  id: string
  command: string
  title: string
  body: string
  points: string[]
  example: string
  docsPath: string
  docsLabel: string
}

export const cliFeatures: CliFeature[] = [
  {
    id: 'init',
    command: 'init',
    title: 'Register the app and upload a first bundle',
    body: 'Run this in a Capacitor project. init links the app to your Capgo account, installs the updater, checks that notifyAppReady() is called, builds, and uploads a first bundle. login stores the API key for the next commands.',
    points: [
      'npx @capgo/cli@latest login stores the key. --local writes it in the repo and gitignores it.',
      'Any command accepts --apikey when CI should not reuse a laptop login.',
      'The CLI version does not follow the updater major. Always run @latest.',
    ],
    example: 'npx @capgo/cli@latest init',
    docsPath: 'docs/cli/reference/init',
    docsLabel: 'init reference',
  },
  {
    id: 'upload',
    command: 'bundle upload',
    title: 'Publish a web bundle onto a channel',
    body: 'bundle upload sends the web build to one or more channels. Pair it with a compatibility gate so a drifted native binary fails the job before the channel moves.',
    points: [
      '--fail-on-incompatible exits non-zero when the bundle does not match the channel’s native packages. That is the CI flag.',
      '--channel production,beta links one upload to several channels. --rollout sets a percentage from 0 to 100.',
      '--auto-bump picks the next free semver. The ai level compares local files to the previous delta manifest and prints why it chose major, minor, patch, or metadata.',
      '--qr-preview prints a device preview link. --version-exists-ok lets a monorepo job succeed when that version is already on Capgo.',
    ],
    example: 'npx @capgo/cli@latest bundle upload --channel production --fail-on-incompatible --qr-preview',
    docsPath: 'docs/cli/reference/bundle',
    docsLabel: 'bundle reference',
  },
  {
    id: 'release-type',
    command: 'bundle releaseType',
    title: 'Decide OTA or native before you ship',
    body: 'Live updates replace JavaScript, HTML, CSS, and assets. Plugin, permission, and native code changes need a new store binary. Two commands make that fork explicit.',
    points: [
      'bundle releaseType recommends OTA or a native build for an app and channel.',
      'bundle compatibility scans native dependencies against the channel and fails early when OTA would be unsafe.',
      'build needed prints yes and exits 1 when a native build is required, no and exits 0 when it is not. Command failures exit 2, so CI can branch on the code.',
    ],
    example: 'npx @capgo/cli@latest bundle releaseType com.acme.app --channel production',
    docsPath: 'docs/cli/reference/bundle',
    docsLabel: 'releaseType reference',
  },
  {
    id: 'channels',
    command: 'channel',
    title: 'Channels, rollouts, and one device',
    body: 'Channels are the release tracks: production, beta, or a tester lane. The CLI creates them, points them at a bundle, and reads what is live.',
    points: [
      'channel add, channel set, channel list, and channel currentBundle manage the track without a dashboard session.',
      'app set can change the default upload channel, retention, preview QR codes, and custom device IDs.',
      'app debug reads one device, including a specific device with --device, when a tester is stuck on an old bundle.',
    ],
    example: 'npx @capgo/cli@latest channel currentBundle production com.acme.app',
    docsPath: 'docs/cli/reference/channel',
    docsLabel: 'channel reference',
  },
  {
    id: 'delta',
    command: 'bundle upload --delta',
    title: 'Delta updates and encrypted bundles',
    body: 'Devices can download the files that changed. Encryption keeps the bundle unreadable without your key. External storage keeps the zip on your own host.',
    points: [
      '--delta uploads a manifest beside the full bundle. --delta-only skips the full bundle. --no-delta forces a full zip.',
      'key create and bundle encrypt use the v2 key. Encrypted contents stay unreadable to Capgo without your key material.',
      '--external stores a URL instead of the zip. Use it for private networks or bundles over 200 MB. Capgo does not read that URL’s contents.',
    ],
    example: 'npx @capgo/cli@latest bundle upload --channel production --delta',
    docsPath: 'docs/cli/reference/key',
    docsLabel: 'encryption keys',
  },
  {
    id: 'build',
    command: 'build request',
    title: 'Request a signed iOS or Android build',
    body: 'The same CLI asks Capgo Build for a signed binary. No local Xcode or Android Studio session is required. Save credentials once, then request the build from a laptop or CI.',
    points: [
      'build init and build credentials save store encrypted signing material for an app and platform.',
      '--output-upload keeps the install artifact. --output-record writes JSON, including the download URL and QR, for the pipeline to archive.',
      'build last-output reads one field back out of that file. build prescan checks the project before you spend build minutes.',
    ],
    example: 'npx @capgo/cli@latest build request com.acme.app --platform ios --build-mode release --output-upload --output-record .capgo/build.json',
    docsPath: 'docs/cli/reference/build',
    docsLabel: 'build reference',
  },
  {
    id: 'doctor',
    command: 'doctor',
    title: 'Check the project, then the update endpoint',
    body: 'doctor inspects the local Capgo setup. probe asks the update endpoint whether this project would actually receive a bundle, and why not if it would not.',
    points: [
      'doctor is the first command to run when an install looks wrong, and the output is what a bug report needs.',
      'probe --platform ios or android sends one request with the project’s Capacitor config.',
      'run device launches the native project when you want to watch the bundle load.',
      'observe reads logs, errors, release health, and a single device timeline from the terminal.',
    ],
    example: 'npx @capgo/cli@latest probe --platform ios',
    docsPath: 'docs/cli/reference/doctor',
    docsLabel: 'doctor reference',
  },
  {
    id: 'ci',
    command: 'CI',
    title: 'Same commands in CI',
    body: 'A pipeline uses a scoped API key and the non-interactive flags. Exit codes are the gate. JSON records are the artifact.',
    points: [
      'Pass --apikey from CI secrets. Keep the key’s role limited to the job: upload, or upload plus build.',
      'bundle upload --fail-on-incompatible and build needed give the job a yes or no before a channel or a store binary moves.',
      'Webhooks can carry bundle and channel changes to the tools the team already watches. API keys and webhook endpoints are managed in the console.',
    ],
    example: 'npx @capgo/cli@latest bundle upload --channel production --fail-on-incompatible --apikey "$CAPGO_API_KEY"',
    docsPath: 'docs/cli',
    docsLabel: 'CLI overview',
  },
]
