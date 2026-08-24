---
slug: app-health-check
title: 'App Health Check: The 2026 Playbook for JavaScript Apps'
description: 'A practical app health check playbook for Capacitor and Electron apps. Runtime checks, updates, telemetry, security, CI scripts, and rollback steps.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-08-15T09:40:07.249Z
updated_at: 2026-08-15T09:42:18.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/855a9d51-33bd-46c7-8a79-1202539ea3b3/app-health-check-javascript-guide.jpg'
head_image_alt: 'App Health Check: The 2026 Playbook for JavaScript Apps'
keywords: 'app health check, capacitor, electron, live updates, ci monitoring'
tag: 'Mobile, Updates, Capacitor'
published: true
locale: en
origin: ai
next_blog: ''
---
A routine JavaScript update goes live on Friday afternoon. The app opens, authentication looks normal, and crash counters remain unremarkable. Then checkout starts failing for a subset of devices, while the App Store and Play Console dashboards remain too far behind to support a confident rollback decision.

That incident exposes the weakness in treating an **app health check** as a dashboard review. A healthy release isn't merely one that avoids crashing. It must start quickly, render important screens, complete critical journeys, reach the right backend version, and provide enough telemetry for an on-call engineer to act before delayed store data catches up.

## Table of Contents
- [The Friday Afternoon Incident That Starts This Playbook](#the-friday-afternoon-incident-that-starts-this-playbook)
- [Defining Health Criteria That Predict User Pain](#defining-health-criteria-that-predict-user-pain)
  - [Separate release gates from diagnostic signals](#separate-release-gates-from-diagnostic-signals)
- [Runtime Checks You Can Wire Up This Week](#runtime-checks-you-can-wire-up-this-week)
  - [Start with the signals that change a decision](#start-with-the-signals-that-change-a-decision)
  - [Instrument the action, not just the alarm](#instrument-the-action-not-just-the-alarm)
- [Health Endpoints and CI Checks That Catch Problems Before Users Do](#health-endpoints-and-ci-checks-that-catch-problems-before-users-do)
  - [Make the response useful and bounded](#make-the-response-useful-and-bounded)
  - [Put the check inside the release path](#put-the-check-inside-the-release-path)
- [Updates, Updaters, and the Blind Spot Between Store and Device](#updates-updaters-and-the-blind-spot-between-store-and-device)
  - [Treat channels as safety boundaries](#treat-channels-as-safety-boundaries)
- [Security, Permissions, and Telemetry Hygiene for JavaScript Apps](#security-permissions-and-telemetry-hygiene-for-javascript-apps)
- [Remediation and Rollback When a Health Signal Trips](#remediation-and-rollback-when-a-health-signal-trips)

<a id="the-friday-afternoon-incident-that-starts-this-playbook"></a>
## The Friday Afternoon Incident That Starts This Playbook

The first report usually sounds vague: “Checkout is broken for some users.” Support has a few screenshots, engineering has a recent bundle, and the store consoles show no obvious regression. The team compares logs, reproduces the flow on one device, and discovers that the failure depends on a combination of update state, backend response shape, and an older native shell.

That isn't a debugging session. It's a release-system failure.

Major app-store dashboards still lag by about **24 hours for most KPIs and up to 72 hours for crash and ANR rates**, according to the store telemetry delay reference. Those dashboards remain useful for trend analysis, but they're too slow to serve as the only rollback trigger during a live incident.

> **Practical rule:** Store consoles tell you what happened after the reporting delay. Your updater and runtime telemetry must tell you what the current release is doing now.

A recurring health check gives the team three layers of evidence:

- **Runtime quality:** crashes, ANRs, startup behavior, screen rendering, errors, and resource pressure.
- **User outcomes:** login completion, checkout success, payment confirmation, and other journeys that users recognize as success or failure.
- **Release delivery:** adoption, failed installations, blocked devices, channel behavior, and rollback state.

Each layer needs a corresponding operational lever. A crash regression may require stopping a rollout or reverting a JavaScript bundle. A failing backend dependency needs service remediation, not an app rollback. A broken update path needs channel controls and device-level investigation.

The practical response should begin with a timeline, not a blame exercise. Record when the bundle was published, which channel received it, when the first failed journey appeared, and which versions were affected. Then use an [incident response guide for mobile teams](https://capgo.app/blog/incident-response-guide/) to assign an owner, preserve evidence, and decide whether the safest action is a channel pause, a rollback, or a native release.

The purpose of this process is simple: **reduce silent failures and shorten the distance between a bad signal and a safe action**. The rest of the health check should be designed around that outcome.

<a id="defining-health-criteria-that-predict-user-pain"></a>
## Defining Health Criteria That Predict User Pain

A Friday release can show green store dashboards while users fail to log in, complete checkout, or receive the update. Define “healthy” before that incident, in terms that connect each signal to a release, CI, or rollback decision. Store telemetry also has a 24 to 72 hour blind spot, so device-side events must cover the period before platform reports become reliable.

The first tier describes whether users can complete meaningful work:

1. **Crash-free sessions.** Use the widely cited reference point of about **99.93% for iOS and 99.81% for Android**, documented in the [app health framework reference](https://apps.apple.com/us/app/health-stats/id1543220823). Treat these values as review benchmarks, not universal guarantees. Segment them by release, operating system, device family, and rollout cohort. A release-specific drop should pause expansion or trigger a bundle revert.
2. **ANR behavior.** A frozen interface can block login, checkout, or payment confirmation without producing a crash. Group ANRs by version and flow, then check WebView work, plugin calls, and native bridge operations that may block the main thread. The fix may belong in code or CI, while the rollout lever is a pause.
3. **Startup and screen readiness.** Measure time to interactive, not only process launch. A shell that opens quickly but leaves the first useful screen blank is still unhealthy. Set a CI threshold for regressions and inspect device traces when it fails.
4. **Critical journey success.** Login, search, checkout, payment, synchronization, and logout need explicit success events. An HTTP response does not prove that the user reached confirmation. A drop should identify the affected flow before anyone chooses rollback.

![A list of four key app health metrics used to measure and predict user pain points.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/4e9f6102-f134-48d4-9fa6-a676bd820aa8/app-health-check-performance-metrics.jpg)

<a id="separate-release-gates-from-diagnostic-signals"></a>
### Separate release gates from diagnostic signals

**Release gates** commonly include crash-free sessions, ANRs, startup, authentication, and the highest-value user journey. **Diagnostic signals** include memory pressure, battery impact, storage growth, network latency, HTTP error classes, and WebView rendering. They explain the failure and guide remediation, but should not automatically block every deployment.

Write each criterion with four fields:

| Field | Example |
|---|---|
| Signal | Checkout completion |
| Segment | Release, platform, region, device family |
| Review rule | Compare with the previous stable cohort |
| Action | Pause rollout, inspect logs, or revert bundle |

Use this [app health monitoring guidance](https://capgo.app/blog/app-health-monitoring/) as a starting point, then assign every signal to a person or rotation and document the lever that can change its result. Keep raw signals visible. A single score can hide a severe payment failure behind healthy background activity.

A healthy release is stable, responsive, observable, and able to complete the tasks users value. It is also connected to an action an on-call engineer can take.

<a id="runtime-checks-you-can-wire-up-this-week"></a>
## Runtime Checks You Can Wire Up This Week

Instrument the app where a user experiences work, not only where the process reports life. A Capacitor app can capture JavaScript exceptions, native crashes, bridge failures, navigation timing, and journey events. An Electron app can add renderer-process failures, main-process errors, preload failures, window readiness, and resource observations.

A practical app health check measures **stability and performance together**, including crash rate, ANR rate, launch time, screen rendering time, error rate, and resource utilization. The [mobile performance health check guidance](https://applandeo.com/blog/boost-your-app-performance-a-10-step-app-health-check/) also emphasizes segmentation by release version and rollout cohort. Without that segmentation, a healthy old version can hide a failing new one.

<a id="start-with-the-signals-that-change-a-decision"></a>
### Start with the signals that change a decision

Capture a session identifier, app version, native shell version, platform, device class, region, and rollout channel with every health event. Avoid putting personal data into those fields. The context lets an on-call engineer answer “who is affected?” before opening a debugger.

For each signal, define both a target and a response:

- **Crashes:** Compare crash-free sessions with the platform benchmarks above. A release-specific decline should pause the affected cohort while engineers identify the stack or plugin boundary.
- **ANRs:** Group events by screen and operation. Repeated freezes during a bridge call point toward different remediation than freezes during database migration.
- **Launch time:** Mark the point at which the first interactive screen is usable. A slow result may come from oversized web assets, synchronous initialization, certificate checks, or a plugin that runs before navigation.
- **Screen rendering:** Emit start and ready events around checkout, login, search, and other high-value screens. Missing ready events often reveal a silent failure that crash reporting won't show.
- **Error rate:** Record normalized error classes, status families, and operation names. Don't log tokens, payment details, or full request bodies.
- **Resource utilization:** Watch memory, storage, battery behavior, and network failures as supporting evidence. A resource trend matters most when it correlates with a failed journey or an ANR.

The table below is deliberately conservative. Where the brief provides a benchmark, it is included. Other bands should be chosen from your own stable baseline rather than invented as universal limits.

| Signal | Unit | Healthy band | Why it matters |
|---|---|---|---|
| Crash-free session rate | Percentage | Around 99.93% iOS, 99.81% Android as reference points | Detects sessions that terminate unexpectedly |
| ANR rate | Events or sessions | No release-specific regression from the stable cohort | Identifies frozen interfaces |
| Launch time | Milliseconds or seconds | Stable against the previous release | Shows whether the app becomes usable promptly |
| Screen rendering time | Milliseconds or seconds | Stable for critical screens | Reveals slow or incomplete journeys |
| Error rate | Events per operation | Stable by operation and version | Connects backend or client errors to user work |
| Resource utilization | Memory, storage, battery, network measures | No unexplained release-specific deterioration | Helps explain freezes, exits, and degraded devices |

<a id="instrument-the-action-not-just-the-alarm"></a>
### Instrument the action, not just the alarm

A crash event should link to a release and a rollback path. A checkout failure should link to the failed step and the response class. A launch regression should link to the initialization phase that consumed the time.

For Capacitor teams, keep the instrumentation close to the JavaScript and native boundaries, then validate it on physical devices. For Electron, collect separate renderer and main-process context because one process can fail while the other appears healthy. The [Capacitor performance monitoring setup](https://capgo.app/blog/set-up-performance-monitoring-in-capacitor/) can help teams connect those signals to release-level investigation.

<a id="health-endpoints-and-ci-checks-that-catch-problems-before-users-do"></a>
## Health Endpoints and CI Checks That Catch Problems Before Users Do

A running process isn't proof that the application is ready. Your backend can accept a TCP connection while its database pool is exhausted, its cache is unavailable, or a critical external service is timing out.

Use a dedicated, unauthenticated readiness endpoint such as `/healthz`. The endpoint should return **200 when the application and critical dependencies are healthy, and 503 when they aren't**, following the [health endpoint implementation guidance](https://github.com/measure-sh/measure). That guidance also recommends keeping the check under **500 ms**, checking the database, cache, and critical external services, and setting timeouts for every dependency.

<a id="make-the-response-useful-and-bounded"></a>
### Make the response useful and bounded

Return a small, stable response shape. Include an overall status and machine-readable component states, but never expose credentials, stack traces, internal hostnames, or sensitive configuration. A readiness check should fail clearly when a required dependency is unavailable, while optional services should remain diagnostic if the app can still serve its core function.

Validate more than the status code:

- Confirm the response is valid JSON with the expected fields.
- Check that the endpoint reaches the intended backend version.
- Test the path from relevant regions and network routes.
- Set independent timeouts so one slow dependency can't hang the entire probe.
- Keep liveness and readiness separate when infrastructure needs to distinguish process failure from dependency failure.

A 200 response with malformed JSON or an expired certificate is not a healthy application from the user's perspective.

![A diagram illustrating the five stages of continuous integration quality gates including build, health tests, analysis, integration, and deployment.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/5022db7b-d17d-4df0-98f9-91557a0dec60/app-health-check-ci-checks.jpg)

<a id="put-the-check-inside-the-release-path"></a>
### Put the check inside the release path

Run the endpoint against a deployed preview environment in CI. Then exercise the API operations used by the app, followed by a small set of critical UI flows on an emulator or device farm. The build should fail when the environment can't satisfy the same readiness contract that production requires.

A GitHub Actions job can stay simple:

- Build the web bundle and native shell.
- Deploy to an isolated environment.
- Poll `/healthz` with a timeout.
- Validate status and response shape.
- Run integration tests for login and a revenue-critical journey.
- Publish only after all gates pass.

Don't make the endpoint perform writes or destructive migrations. Keep it repeatable, cheap, and safe to call frequently. The endpoint is a release gate, not a second application.

<a id="updates-updaters-and-the-blind-spot-between-store-and-device"></a>
## Updates, Updaters, and the Blind Spot Between Store and Device

A release can be technically sound and still fail operationally if devices don't receive it, install it, or report its state. That makes the updater part of app health, not a delivery detail.

Consider a JavaScript bundle that changes checkout validation. The store-installed native shell remains available, but the update channel delivers the new web assets to a subset of devices. Some devices install successfully. Others fail validation or remain blocked because their native version isn't compatible. Store dashboards won't immediately show the difference between those states.

The reporting gap is material. Store dashboards can lag by about **24 hours for most KPIs and up to 72 hours for crash and ANR rates**, as described in the [mobile release visibility reference](https://play.google.com/store/apps/details?id=com.siamakerlab.webchecker). Near-real-time updater telemetry fills the interval by showing which devices received a bundle, which failed installation, which rolled back, and which never checked in.

![Screenshot from https://capgo.app](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/screenshots/8e5ce9e9-c1ea-4106-9242-e80b10d61f0b/app-health-check-capgo-landing-page.jpg)

<a id="treat-channels-as-safety-boundaries"></a>
### Treat channels as safety boundaries

Use separate beta, staging, and production channels, with explicit compatibility rules. A production rollout shouldn't include a native shell that lacks a required plugin or configuration capability. Track adoption and failure by channel, release, platform, and reported app version.

The operational levers are concrete:

- **Guardrails:** Prevent an incompatible bundle from reaching an unsupported shell.
- **Audience rollouts:** Start with a controlled cohort, then expand when runtime and journey signals remain healthy.
- **Differential delivery:** Send only changed assets where the updater supports it, reducing the amount of work and data involved in an update.
- **Rollback protection:** Restore the previous known-good bundle when installation or startup validation fails.
- **Version comparison:** Compare crash, launch, WebView, and journey health for the new cohort against a stable control group.

Capgo is one option for Capacitor and Electron teams that need signed JavaScript, CSS, configuration, and asset updates, targeted channels, per-device logs, adoption and failure metrics, and rollback controls. Its [overview of live updates for Capacitor](https://capgo.app/blog/how-live-updates-for-capacitor-work/) describes the updater model and how teams can connect delivery state with release decisions.

The important principle isn't the vendor. It is the feedback loop. A rollout should produce evidence, and that evidence should control whether the next cohort receives the bundle.

<a id="security-permissions-and-telemetry-hygiene-for-javascript-apps"></a>
## Security, Permissions, and Telemetry Hygiene for JavaScript Apps

An app can appear stable while still carrying unacceptable risk through permissions, update trust, or telemetry. For Capacitor and Electron releases, audit plugins and embedded web content as part of the attack surface.

Start with these checks:

- **Plugin allowlist:** Remove unused plugins, review their native capabilities, and verify access to contacts, files, location, camera, microphone, or external intents.
- **Deep-link review:** Test URL schemes and Android intents. An untrusted link must not open a privileged flow or bypass authentication.
- **Bundle verification:** Verify signatures before applying updates, reject incomplete or unexpected payloads, and retain the last known-good bundle for recovery.
- **Token storage:** Keep credentials in platform secure storage, not JavaScript-accessible files or unrestricted local storage.
- **Electron boundaries:** Keep privileged APIs in the main process, expose narrow preload interfaces, and prevent arbitrary remote content from reaching native APIs.

Telemetry requires matching controls. Record event names, release identifiers, operation classes, and failure categories. Exclude tokens, payment information, full user-entered text, precise location, and raw response bodies unless a documented security review permits them.

Set retention by operational need and restrict access by role. Provide deletion or redaction paths where privacy requirements apply. Health events should isolate a release regression without becoming a second database of user behavior.

Store dashboards cannot provide the whole picture immediately. App Store and Play Console telemetry may leave a 24–72 hour reporting gap, so pair store signals with updater state, release identifiers, and device-side failure events. The [Google Play Console reporting documentation](https://support.google.com/googleplay/android-developer/) explains the reporting context teams should account for when interpreting delayed results.

Before release, confirm that each new permission has a clear purpose, every logged field has an owner, and the updater rejects untrusted or incompatible bundles. An unclear boundary is a release blocker. When a signal exposes a trust or privacy failure, stop delivery first, then correct the release or configuration that caused it.

<a id="remediation-and-rollback-when-a-health-signal-trips"></a>
## Remediation and Rollback When a Health Signal Trips

A health signal matters only when it leads to a safe action. Write the decision tree before the incident, while the team can still think clearly.

- **Crash or ANR regression in one release or cohort:** Pause that channel, compare the affected version with the stable cohort, and roll back the bundle if the native shell remains compatible.
- **Health endpoint returns 503:** Stop app rollout and repair the failed critical dependency. Restarting a service may help, but don't use an app rollback to disguise a backend outage.
- **Critical journey fails while crashes stay normal:** Disable the affected feature or channel, inspect response shape and configuration, then ship a corrected bundle.
- **Update installation or startup validation fails:** Keep the previous bundle active, mark the release unhealthy, and investigate signing, compatibility, or asset integrity.
- **Native permission or plugin behavior is wrong:** A live JavaScript update may not be sufficient. Prepare a store release when the fix requires native code, manifest changes, entitlements, or a new permission declaration.

The [Capacitor live update rollback strategies](https://capgo.app/blog/rollback-strategies-for-capacitor-live-updates/) should be part of the runbook, not a page discovered during a crisis. Automatic protection is appropriate when the updater can reliably detect installation or startup failure. A full incident is still required when users can complete the launch but fail inside an important journey.

![An infographic titled Remediation and Rollback Playbook outlining three distinct automated responses to software performance issues.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/1990d54b-5ce1-4519-b144-8a30a4c2393a/app-health-check-remediation-playbook.jpg)

The commercial pressure to formalize this process is clear. The mobile app testing services market is estimated at **$7.70 billion in 2025** and projected to reach **$19.84 billion by 2031 at a 17.09% CAGR**, while the Apple App Store rejection rate was reported at roughly **24.9% in 2024**, according to [market and store review data](https://www.businessofapps.com/data/health-app-market/). Those figures don't replace engineering judgment, but they underline the cost of treating quality checks as optional.

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/LeLAozqTdww" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

After every incident, preserve the timeline, identify the earliest actionable signal, record which lever worked, and turn the missing check into a release gate. A mature app health check doesn't merely report failure. It makes the next failure easier to detect, contain, and reverse.

---

Capgo gives Capacitor and Electron teams signed live updates, targeted channels, rollout and failure telemetry, per-device logs, and rollback protection so runtime health signals can drive release decisions. Visit [Capgo](https://capgo.app) to connect your update pipeline with the app health checks and remediation controls described in this playbook.
