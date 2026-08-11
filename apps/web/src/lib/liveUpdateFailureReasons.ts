/**
 * Short trust-oriented explanations for live-update failure codes.
 * Sourced from Capgo docs (`/docs/webapp/logs/` and updater debugging).
 * Tone matches public transparency pages: normal causes first, no alarm.
 */

export type FailureReasonInfo = {
  label: string
  explanation: string
}

const FAILURE_REASON_INFO: Record<string, FailureReasonInfo> = {
  download_fail: {
    label: 'Download failure',
    explanation: 'The bundle download was interrupted — usually a network timeout, drop, or CDN reachability issue. Devices retry on the next launch.',
  },
  download_manifest_file_fail: {
    label: 'Manifest file failure',
    explanation: 'A delta update file could not be fetched. Brief network issues or a missing asset are the usual causes; devices retry automatically.',
  },
  download_manifest_checksum_fail: {
    label: 'Manifest checksum failure',
    explanation: 'A delta file failed integrity checks, so the update was discarded instead of installing a corrupted payload.',
  },
  download_manifest_brotli_fail: {
    label: 'Manifest decompress failure',
    explanation: 'A compressed delta file could not be unpacked on the device. Often a partial download or unsupported compression artifact.',
  },
  finish_download_fail: {
    label: 'Finish download failure',
    explanation: 'The download did not complete cleanly before install could start — typically connectivity or storage pressure mid-transfer.',
  },
  checksum_fail: {
    label: 'Checksum failure',
    explanation: 'Downloaded bytes did not match the expected checksum, so Capgo discarded the update rather than risk a bad install.',
  },
  checksum_required: {
    label: 'Checksum required',
    explanation: 'The update could not be verified because checksum metadata was missing, so the device skipped the install.',
  },
  unzip_fail: {
    label: 'Unzip failure',
    explanation: 'The device could not unpack the bundle archive — often low storage or a corrupted download.',
  },
  decrypt_fail: {
    label: 'Decrypt failure',
    explanation: 'An encrypted bundle could not be decrypted on the device, usually from a key mismatch between app and upload.',
  },
  update_fail: {
    label: 'Update failure',
    explanation: 'The bundle installed but the app never called notifyAppReady(), so Capgo rolled back automatically for safety.',
  },
  set_fail: {
    label: 'Set failure',
    explanation: 'The device downloaded the bundle but failed to activate it as the next version.',
  },
  backend_refusal: {
    label: 'Backend refusal',
    explanation: 'Capgo rejected an outdated updater (v4). Those devices need a store build with a newer plugin — not a transient outage.',
  },
  needPlanUpgrade: {
    label: 'Plan limit',
    explanation: 'The organization hit its plan or device limit, so updates paused until the plan upgrades or the billing cycle resets.',
  },
  rateLimited: {
    label: 'Rate limited',
    explanation: 'The device called update endpoints too often in a short window, so Capgo asked it to back off.',
  },
  invalidIp: {
    label: 'Invalid IP',
    explanation: 'Traffic looked like bot or cloud-provider infrastructure, so Capgo blocked it. Normal end-user devices are unaffected.',
  },
  disableAutoUpdateToMajor: {
    label: 'Major update blocked',
    explanation: 'Channel policy intentionally blocked a major version jump. This is a configured safeguard, not a delivery outage.',
  },
  disableAutoUpdateToMinor: {
    label: 'Minor update blocked',
    explanation: 'Channel policy intentionally blocked a minor version jump.',
  },
  disableAutoUpdateToPatch: {
    label: 'Patch update blocked',
    explanation: 'Channel policy intentionally blocked a patch-level jump.',
  },
  disableAutoUpdate: {
    label: 'Auto-update blocked',
    explanation: 'Channel auto-update settings blocked this update style by design.',
  },
  disableAutoUpdateUnderNative: {
    label: 'Under-native blocked',
    explanation: 'The channel blocks updates older than the device native baseline.',
  },
  disableAutoUpdateMetadata: {
    label: 'Metadata gate blocked',
    explanation: 'The channel requires min_update_version metadata the app does not meet yet.',
  },
  disableEmulator: {
    label: 'Emulator blocked',
    explanation: 'This channel is configured to reject emulator updates.',
  },
  disableDevBuild: {
    label: 'Dev build blocked',
    explanation: 'This channel is configured to reject development builds.',
  },
  disableProdBuild: {
    label: 'Prod build blocked',
    explanation: 'This channel is configured to reject production builds.',
  },
  disableDevice: {
    label: 'Real device blocked',
    explanation: 'This channel is configured to block real phones and tablets.',
  },
  disablePlatformIos: {
    label: 'iOS blocked',
    explanation: 'iOS updates are disabled on this channel by policy.',
  },
  disablePlatformAndroid: {
    label: 'Android blocked',
    explanation: 'Android updates are disabled on this channel by policy.',
  },
  disablePlatformElectron: {
    label: 'Electron blocked',
    explanation: 'Electron updates are disabled on this channel by policy.',
  },
  low_mem_fail: {
    label: 'Low memory',
    explanation: 'The device ran out of memory while downloading or installing, so the update stopped.',
  },
  keyMismatch: {
    label: 'Key mismatch',
    explanation: 'The app encryption key does not match the bundle key, so Capgo refused the update.',
  },
  missingBundle: {
    label: 'Missing bundle',
    explanation: 'Capgo could not serve a downloadable payload for the selected version.',
  },
  cannotGetBundle: {
    label: 'Cannot get bundle',
    explanation: 'Capgo could not build a valid download URL for the selected bundle.',
  },
  NoChannelOrOverride: {
    label: 'No channel',
    explanation: 'No channel matched this device — no default, config fallback, or override was set.',
  },
  channelMisconfigured: {
    label: 'Channel misconfigured',
    explanation: 'Channel auto-update rules were missing required metadata, so the update was refused.',
  },
  cannotUpdateViaPrivateChannel: {
    label: 'Private channel blocked',
    explanation: 'The app tried to self-assign a private channel that does not allow it.',
  },
  blocked_by_server_url: {
    label: 'Server URL blocked',
    explanation: 'Capacitor server.url is set, so the app loads a remote URL instead of local files Capgo can update.',
  },
  customIdBlocked: {
    label: 'Custom ID blocked',
    explanation: 'The app sent a custom device ID, but this app is configured to reject them.',
  },
}

function humanizeReason(reason: string) {
  return reason
    .replaceAll('_', ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function getFailureReasonInfo(reason: string): FailureReasonInfo {
  const known = FAILURE_REASON_INFO[reason]
  if (known) return known
  return {
    label: humanizeReason(reason),
    explanation: 'A normalized install outcome from Capgo device logs. See the updater debugging docs for the full code reference.',
  }
}

export const failureReasonInfoEntries = Object.entries(FAILURE_REASON_INFO).map(([reason, info]) => ({
  reason,
  ...info,
}))
