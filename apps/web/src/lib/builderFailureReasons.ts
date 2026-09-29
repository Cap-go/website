export type BuilderFailureInfo = {
  label: string
  explanation: string
}

const BUILDER_FAILURE_INFO: Record<string, BuilderFailureInfo> = {
  script_failure: {
    label: 'App script failed',
    explanation: 'The project build script exited with an error — usually a compile, Fastlane, Gradle, or signing step in the app repo.',
  },
  timeout: {
    label: 'Build timed out',
    explanation: 'The job hit the configured time limit before it finished. Long native compiles and stuck hooks are the usual causes.',
  },
  runner_system_failure: {
    label: 'Builder host failed',
    explanation: 'The machine running the job stopped unexpectedly. Capgo retries these; they are not an app code error.',
  },
  runner_unavailable: {
    label: 'No builder available',
    explanation: 'No runner accepted the job in time. This is a capacity blip, not a problem in the uploaded project.',
  },
  other: {
    label: 'Other build error',
    explanation: 'A less common terminal error that does not fit the public categories above.',
  },
}

export function getBuilderFailureInfo(reason: string): BuilderFailureInfo {
  return BUILDER_FAILURE_INFO[reason] ?? {
    label: reason.replaceAll('_', ' '),
    explanation: 'Uncategorized builder error from the last 30 days.',
  }
}
