---
slug: app-troubleshooting
title: App Troubleshooting Playbook for CapacitorJS and Electron
description: 'App troubleshooting playbook for CapacitorJS and Electron teams. Reproduce bugs, read logs, debug native layers, and ship hotfixes fast.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-08-25T08:45:22.833Z
updated_at: 2026-08-27T16:41:24.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/afd318b2-c157-4cd0-ba39-5d5d445cf694/app-troubleshooting-capacitorjs-electron.jpg'
head_image_alt: App Troubleshooting Playbook for CapacitorJS and Electron
keywords: 'app troubleshooting, CapacitorJS, live updates, mobile debugging, Electron apps'
tag: 'Mobile, Updates, Capacitor'
published: true
locale: en
origin: ai
next_blog: ''
---
Thursday evening, your CapacitorJS shopping app starts showing blank dashboards for Android 14 users. iOS customers are browsing normally. Electron desktop users haven't reported anything. The on-call engineer assumes a WebView regression, opens Android Studio, and spends hours comparing rendering behavior across devices. The eventual cause isn't a rendering bug at all. A staging API key reached production after a CDN cache invalidation failed to reach mobile clients.

That incident is familiar because mobile failures rarely respect the boundaries in your repository. A fresh JavaScript change may be innocent while a deployment, configuration value, permission state, service dependency, or network path breaks the user journey. A Microsoft incident analysis found that **40% of production incidents came from code or configuration bugs, while 60% came from infrastructure, deployment, and service dependencies**. The practical lesson is simple: **app troubleshooting must begin with the whole failure domain, not the stack trace**. ([Microsoft's incident analysis](https://www.microsoft.com/en-us/research/wp-content/uploads/2022/09/3542929.3563482.pdf))

This playbook follows the workflow I use after shipping CapacitorJS and Electron releases: establish exactly what the user ran, inspect production telemetry before attempting reproduction, verify non-code causes, then debug the narrowest layer that matches the symptom. The seven moves are incident scoping, layered logs, web and native debugging, networking and state checks, CI guardrails, live-update recovery, and a post-incident review that assigns prevention work.

## Table of Contents
- [The Night the Dashboard Went Dark](#the-night-the-dashboard-went-dark)
  - [Establish the exact failure surface](#establish-the-exact-failure-surface)
  - [Reproduce by removing variables](#reproduce-by-removing-variables)
- [Reading Logs from Webview, Native, and the OS](#reading-logs-from-webview-native-and-the-os)
  - [Match each symptom to its evidence](#match-each-symptom-to-its-evidence)
  - [Correlate before you filter](#correlate-before-you-filter)
- [Debugging the Web Layer and the Native Layer](#debugging-the-web-layer-and-the-native-layer)
  - [Start with the WebView](#start-with-the-webview)
  - [Move to native tools when the evidence points there](#move-to-native-tools-when-the-evidence-points-there)
- [Networking, Storage, and Permissions First Checks](#networking-storage-and-permissions-first-checks)
- [Automated Tests and CI as Early Warning Systems](#automated-tests-and-ci-as-early-warning-systems)
  - [Test the shared logic and the shells](#test-the-shared-logic-and-the-shells)
  - [Make failures merge-blocking](#make-failures-merge-blocking)
- [Live Updates as an Emergency Recovery Channel](#live-updates-as-an-emergency-recovery-channel)
  - [Use a guarded rollout](#use-a-guarded-rollout)
- [Post-Incident Analysis That Prevents the Next One](#post-incident-analysis-that-prevents-the-next-one)
  - [Use five concrete blocks](#use-five-concrete-blocks)
  - [Assign work before closing the incident](#assign-work-before-closing-the-incident)

<a id="the-night-the-dashboard-went-dark"></a>
## The Night the Dashboard Went Dark

By Thursday evening, Android users were reporting a blank dashboard while Electron desktop users continued working normally. The first assumption was an Android 14 or WebView regression. That clue narrowed the search, but it did not identify the failure. The affected users also shared a release channel, a cached configuration path, an API environment, and a particular sequence of dashboard requests.

The on-call engineer started by comparing WebView versions. The results looked plausible and led nowhere. A blank dashboard can come from a rendering exception, an empty API response, a rejected request, an invalid token, a feature flag, or a storage read that prevents session restoration. Before changing code, establish which binary, web bundle, configuration, and backend path the affected users received.

![A troubleshooting checklist titled The Night the Dashboard Went Dark, outlining incident details for Android users.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/e9f58ef9-1b69-4549-9685-8f09de959f0f/app-troubleshooting-checklist.jpg)

<a id="establish-the-exact-failure-surface"></a>
### Establish the exact failure surface

Start with production telemetry, not a developer laptop. Google's Android crash and ANR guidance recommends narrowing events by **device, operating system, and time window**, then using logcat during reproduction when the failure location remains unclear. ([Google's Android vitals troubleshooting guidance](https://developer.android.com/games/optimize/vitals/crash))

Capture these fields from one affected session:

- **Build identity:** Record the native app version, build ID, web bundle hash, and release timestamp.
- **Distribution channel:** Confirm whether the user received canary, beta, staged, or stable content.
- **Runtime context:** Note the Android or iOS version, device model, network type, permission state, and whether the app resumed from the background.
- **Last successful action:** Preserve the exact tap sequence, request, response status, and visible result.
- **Configuration snapshot:** Compare the API base URL, feature flags, authentication settings, and plugin configuration with a known-good device.

Capacitor keeps the native version separate from the web content running inside the WebView. Two users can share a store-installed binary while receiving different JavaScript bundles. They can also share a web bundle while using different native plugins. Electron requires the same check across the release manifest, main-process version, renderer bundle, and update channel. Renderer package metadata alone does not establish what the user executed.

<a id="reproduce-by-removing-variables"></a>
### Reproduce by removing variables

After collecting the identifiers, classify the incident as **canary-only, staged, or fully rolled out**. A canary-only failure points toward a targeted bundle, flag, or channel assignment. A staged failure suggests audience or device-selection logic. A fully rolled-out failure raises the priority of shared configuration, backend behavior, and native compatibility.

Diff the affected device against a known-good one. Check native plugin versions, web hash, channel, API environment, authentication state, and permission grants. Replay the user's last action sequence locally before reaching for an emulator. If one flag controls the failure, hold the other variables steady and bisect that flag's behavior.

> **Practical rule:** Do not call a reproduction “the same bug” until the build ID, channel, web bundle, operating system, and configuration match.

The Android dashboard incident turned on configuration correction. The team compared snapshots, confirmed that the native binary was valid, and verified that the WebView and dashboard code were unchanged. Production clients were requesting an environment with a staging credential because the earlier cache invalidation had not reached every mobile client. The recovery work therefore focused on correcting the configuration, setting appropriate cache invalidation headers, and verifying the CDN purge from affected regions and client paths.

That sequence matters because a successful purge command does not prove that every user can fetch the corrected value. Check CDN responses, cache age, bundle or configuration hashes, and a fresh client session before declaring recovery. A native rebuild would have added rollout time without changing the artifact that caused the failure.

Use the same discipline for future incidents: **identify the user's artifact, locate the failure surface, eliminate environmental differences, and then debug code**. A written [incident response guide for mobile teams](https://capgo.app/blog/incident-response-guide/) should keep those checks beside the on-call runbook, including telemetry queries, rollout ownership, purge verification, and the decision to use a live update when the native binary is not the failing component.

<a id="reading-logs-from-webview-native-and-the-os"></a>
## Reading Logs from Webview, Native, and the OS

A CapacitorJS or Electron application produces evidence at several layers, and each layer answers a different question. The WebView can show JavaScript exceptions and failed requests, but it won't explain every plugin failure. Native logs expose bridge and lifecycle behavior, while the operating system records memory pressure, permission denials, and process termination that application code may never observe.

![A diagram illustrating three layers for reading logs: Webview, Native, and OS for mobile application troubleshooting.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/8a7ad788-3c46-419d-9a55-7219c85fd8d7/app-troubleshooting-log-levels.jpg)

<a id="match-each-symptom-to-its-evidence"></a>
### Match each symptom to its evidence

At the **WebView layer**, collect console errors, unhandled promise rejections, navigation events, request URLs, response status, and request timing. A silent plugin rejection is especially dangerous. The UI may continue rendering while a camera, filesystem, secure storage, or notification operation has already failed.

The **native layer** contains Android logcat output, iOS `os_log` records, plugin bridge exceptions, activity or view-controller lifecycle events, and native crash traces. Electron adds the main-process log stream, auto-update events, window creation failures, and IPC messages. A renderer error won't necessarily appear in the main process, and a main-process crash won't be visible in renderer console output.

The **OS layer** explains events outside the application's control. Look for memory pressure, background termination, battery restrictions, denied permissions, process kills, and system-level crash reports. This layer often explains an apparent “random crash” that has no useful JavaScript stack.

<a id="correlate-before-you-filter"></a>
### Correlate before you filter

Use a shared request or operation ID across the WebView, native bridge, backend, and central log sink. Add the ID before a user action begins, then preserve it through the network request and native callback. Correlate timestamps in a consistent format, account for device clock drift, and filter framework noise only after retaining the original event.

Store the same contextual fields in every layer: app version, web bundle hash, channel, device, OS, session, and feature flag state. Centralized collection means a reproduction attempt can be compared with the user's evidence instead of replacing it with assumptions. A practical [log analysis toolkit for mobile debugging](https://capgo.app/blog/log-analysis-tools/) should help you search those fields without forcing engineers to gather screenshots from each device.

<a id="debugging-the-web-layer-and-the-native-layer"></a>
## Debugging the Web Layer and the Native Layer

Debug the layer that owns the symptom. A frozen screen that still responds to native lifecycle events usually starts in the WebView. A process termination, plugin exception, or startup failure belongs in native tooling or the Electron main process. Jumping between layers without that routing rule creates activity without narrowing the cause.

<a id="start-with-the-webview"></a>
### Start with the WebView

On Android, connect a debuggable Capacitor build to Chrome and open `chrome://inspect`. Inspect the console, network panel, storage, and performance timeline. On iOS, use Safari Web Inspector with the connected device or simulator. For Electron, attach to the renderer through its DevTools port or call `BrowserWindow.webContents.openDevTools()` during investigation.

Production stack traces are useful only when they map back to source. Upload and retain source maps for each web bundle, then verify that the symbolication artifact matches the exact bundle hash. Add a controlled console interceptor for critical operations, but avoid logging credentials, tokens, or personal data. Capture operation names, request IDs, response classes, and state transitions instead.

![A diagram illustrating the debugging processes for web and native layers to identify application root causes.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/c3dfee59-b7c5-499f-8a93-8dfd6f023cf3/app-troubleshooting-debugging-process.jpg)

<a id="move-to-native-tools-when-the-evidence-points-there"></a>
### Move to native tools when the evidence points there

Filter Android Studio Logcat by the application package, then reproduce with the smallest possible action sequence. `npx cap run android --livereload` shortens the iteration loop for WebView changes, but it doesn't validate the packaged native artifact. On iOS, run from Xcode and use the Devices window for device logs. Instruments' Time Profiler helps with sustained CPU work, while Allocations helps identify memory growth.

Electron has two debugging targets. Use renderer DevTools for DOM, JavaScript, and network behavior. Use `--inspect` or `--inspect-brk` for the main process, and preserve its stderr output during startup and auto-update tests.

> Route by symptom. UI behavior starts in the WebView. Native termination starts in Android Studio or Xcode. Electron startup failure starts in the main process.

A useful explanation of why this split matters appears in [Capacitor's WebView and native bridge model](https://capgo.app/blog/how-capacitor-bridges-web-and-native-code/). The bridge is a boundary, not a single debugging surface. Treat it that way, and each log line has a better chance of answering the question you have.

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/VN3VzMx8kSA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="networking-storage-and-permissions-first-checks"></a>
## Networking, Storage, and Permissions First Checks

Teams often check the API first because network errors look technical and familiar. That habit misses failures caused by stale state, changed permission declarations, or a platform upgrade that altered sandbox behavior. The fastest check depends on the failure domain.

| Failure Domain | Common Symptom Pattern | Fastest First Check |
|---|---|---|
| Networking | Blank data, login loops, timeouts, failed uploads, or requests that work on one network but not another | Run `curl` from the same network, inspect failed WebView requests, check CORS preflight, certificate pinning, captive portals, and proxy behavior |
| Storage | A feature worked previously, then fails after an update, restart, or operating system change | Inspect storage estimates, check IndexedDB quota errors, compare encryption keys, verify Electron's `userData` path, and test a clean sandbox |
| Permissions | Camera, files, notifications, location, or background behavior fails without a clear application exception | Check iOS usage descriptions, Android `ACCESS_*` declarations, Electron's permission handler, and cold-start permission timing |

For storage problems, `storage.estimate()` can reveal quota pressure, but it won't diagnose every database problem. Test a manually cleaned application sandbox, then compare behavior with the existing profile. Capacitor Preferences encryption key rotation can make previously valid values unreadable, while SQLite write-ahead logging may leave a damaged state after abrupt termination. Electron applications can also appear to lose data when an operating system upgrade changes the resolved `userData` path.

Permissions deserve the same attention. iOS usage descriptions must match the capability being requested. Android permission behavior can drift after SDK changes, and notification prompts can race with cold-start initialization. Electron's permission handler may reject a request before the renderer receives a useful explanation.

> If a user says “it worked yesterday,” inspect storage and permissions before assuming the network changed.

<a id="automated-tests-and-ci-as-early-warning-systems"></a>
## Automated Tests and CI as Early Warning Systems

CI catches regressions most cheaply when it tests the artifact users will run. A green test suite against a development server doesn't prove that the signed Android package, iOS archive, or Electron installer can start, load its bundle, and complete a real authenticated operation.

<a id="test-the-shared-logic-and-the-shells"></a>
### Test the shared logic and the shells

Use **Vitest** for shared web logic and **Jest** for Electron main-process behavior. For Capacitor plugins, test the JavaScript contract and the native implementation separately, then add integration coverage for permission denial, unavailable hardware, malformed responses, and lifecycle interruption.

Playwright can exercise a built web bundle. For Electron, use Playwright Electron or an equivalent shell test against the packaged binary, not only the renderer served by a local development process. The packaged test catches missing assets, incorrect paths, signing mistakes, and startup assumptions that browser tests hide.

Device coverage should reflect your actual install base. BrowserStack or Sauce Labs can exercise a deliberately selected set of device profiles, operating systems, permission states, and network conditions. The goal isn't maximal matrix size. It's representative failure coverage.

<a id="make-failures-merge-blocking"></a>
### Make failures merge-blocking

Add explicit checks for:

- **Bundle changes:** Reject unexpected bundle-size deltas and missing source maps.
- **Native alignment:** Detect plugin version drift and incompatible `minSdkVersion` settings.
- **Artifact integrity:** Verify signatures, package identity, embedded assets, and release manifests.
- **Startup behavior:** Boot the packaged app and complete one authenticated endpoint request.
- **Update behavior:** Install an older bundle, apply the candidate update, restart, and confirm rollback behavior.

Publish every result through one GitHub status check so a red signal blocks the merge. A build that passes unit tests but fails signed-artifact verification should be treated as failed, not “mostly green.”

The [continuous integration setup for Capacitor releases](https://capgo.app/blog/continuous-integration-setup/) is useful when wiring these checks into a repeatable pipeline. CI isn't a substitute for production telemetry, but it narrows the number of defects that reach staging and gives on-call engineers fewer unknowns during an incident.

<a id="live-updates-as-an-emergency-recovery-channel"></a>
## Live Updates as an Emergency Recovery Channel

A production regression doesn't always require a new native build. If the defect lives in JavaScript, CSS, copy, configuration, or another web asset, a live update can restore the user journey while the team prepares a proper release. That makes live-update delivery an **operational recovery channel**, not merely a convenience for cosmetic changes.

The safety requirement is control. Separate named channels for canary, beta, and stable audiences. Keep the native app ID and compatible runtime constraints explicit, and record which bundle each audience receives. A live update can't add a native permission, replace a native plugin, change the Electron main process, or repair a failure that occurs before the updater can initialize. Those cases still need a store or installer release.

![A flowchart showing the emergency recovery process for app production regressions using live updates for faster fixes.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/b02a66d8-8b0d-4d3e-bb83-395121f605d3/app-troubleshooting-emergency-recovery.jpg)

<a id="use-a-guarded-rollout"></a>
### Use a guarded rollout

An emergency flow should look like this:

1. **Confirm scope:** Identify the affected native versions, channels, bundle hashes, and failure signals.
2. **Prepare the smallest patch:** Change only the web behavior required to restore the failing path.
3. **Target a canary audience:** Send the bundle to a controlled channel rather than every installation.
4. **Watch telemetry:** Check crash, load, request, and update-failure signals against the affected cohort.
5. **Promote or rollback:** Expand only when the signals remain healthy. Revert immediately when the patch introduces a new failure.

Automatic rollback should use explicit crash-rate or load-failure thresholds chosen by the team. A rollback protects users only when the updater can detect failure and the prior bundle remains available. Keep version history and channel guardrails intact so support can explain what happened to a particular device.

Capgo provides signed web-bundle delivery, targeted channels, per-device logs, adoption and failure metrics, version history, and automatic rollback protection for CapacitorJS and Electron applications. The practical decision rule is direct: **use a live update when the fix is confined to the web bundle and the updater can start safely; schedule a native hotfix when the runtime, plugin, permission, package, or main process is involved**. The [Capacitor live-update flow](https://capgo.app/blog/how-live-updates-for-capacitor-work/) describes the boundary between those two paths.

<a id="post-incident-analysis-that-prevents-the-next-one"></a>
## Post-Incident Analysis That Prevents the Next One

A retrospective earns its place when it changes the system. Write it while logs, deployment context, and operator decisions remain available. Keep the record factual, blameless, and specific enough for another engineer to identify the missing guardrail without reconstructing the entire incident.

<a id="use-five-concrete-blocks"></a>
### Use five concrete blocks

**Timeline with telemetry timestamps.** Record the first failed request, affected release, alert creation, investigation steps, mitigation, and recovery. For the Android dashboard incident, the timeline might show that the blank view appeared after a configuration rollout while iOS continued receiving valid responses.

**User-visible failure mode.** Describe what customers experienced, not what the code did. “Android users saw an empty dashboard after authentication” gives responders more direction than “API key mismatch.” The first description points toward the broken journey and the signals that should have detected it.

**Detection gap.** State why the team learned late. Crash monitoring may have stayed green because the app rendered successfully, while no alert tracked authenticated request failures or empty dashboard payloads. Record the missing signal and where it should have been emitted.

**Contributing non-code factors.** List configuration drift, cache behavior, deployment timing, service dependencies, permission changes, or an Electron auto-update race. These domains deserve early checks because a production failure can occur without a defect in application code.

**Preventive guardrail.** Assign the test or control that would have caught the issue. Examples include validating production credentials during deployment, checking delivered configuration from representative clients, or adding a packaged Electron startup test. A guardrail needs an owner and a failure condition, not only a sentence in the retrospective.

Notification paths belong in the same review. If mail alerts fail to reach the team, use a practical resource on [how to stop email from going to spam in Gmail](https://www.mailgenius.com/how-to-stop-email-from-going-to-spam-folder-in-gmail/) during the notification check, then verify the alert path. Do not treat successful message creation as proof that an operator received the alert.

<a id="assign-work-before-closing-the-incident"></a>
### Assign work before closing the incident

For every block, name one owner, one due date, and one verification method. Review the incident again within **24 hours**, while engineers can still challenge assumptions from the investigation. Close an item only after the new test, dashboard, configuration check, or rollout rule has run successfully.

Use this final checklist:

- Did we identify the exact native build and web bundle?
- Did we distinguish code, configuration, deployment, infrastructure, and dependency causes?
- Did telemetry show the user-visible failure, not only crashes?
- Did we test the affected channel and a known-good channel?
- Did we add a guardrail that fails before production?
- Did we document whether a live update or native release was appropriate?
- Did one named owner verify the fix?

User complaints show why the review must cover more than crashes. In a **6,634-app audit**, payment failures affected **28.6%** of apps, device compatibility **28.4%**, UI and UX friction **25.4%**, subscription trouble **21.8%**, and login errors **17.2%**, while crashes ranked seventh at **10.3%**. ([Bright App Data's audit of mobile-app complaints](https://brightappdata.com/blog/what-users-complain-about-most-in-mobile-apps)) A troubleshooting process that asks only “why did the app crash?” can miss the failures preventing payment, sign-in, or normal product use.

Stability data supports the same operating model. A benchmark places the median app at **99.95% crash-free sessions**, with top-performing apps at **99.99%** and weaker apps at **99.77% or lower**. It also reports a median **ANR rate of 2.62 per 10,000 sessions**, an **OOM rate of 1.12 per 10,000 sessions**, and app-hang rates from **64 to 103 per 10,000 sessions** depending on quality tier. ([The mobile stability benchmark](https://www.alphabin.co/blog/mobile-app-testing-crash-rates)) High stability still leaves meaningful failures. Teams need telemetry for failed requests, blank states, hangs, update errors, and other user-facing symptoms.

A 2026 report says users filed **6x more complaints about broken basics than requests for new features**, and reports that **15.4% uninstall after a single crash while more than half abandon after 2-3 crashes**. ([The 2026 report on broken app basics](https://www.mactech.com/2026/02/26/unitq-report-app-users-file-6x-more-complaints-about-broken-basics-than-requests-for-new-features/)) The response is practical: detect broadly, recover quickly, and convert every incident into a testable control.

---

Use [Capgo](https://capgo.app) to deliver signed CapacitorJS and Electron web-bundle updates through controlled channels, inspect per-device telemetry, and roll back a failed JavaScript fix without waiting for a store review. Connect it to the release pipeline, define stable and canary audiences, and test the recovery path before the next dashboard outage.
