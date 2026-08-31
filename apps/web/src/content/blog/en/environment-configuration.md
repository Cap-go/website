---
slug: environment-configuration
title: Environment Configuration for Modern Apps
description: 'Master environment configuration for Capacitor and Electron apps. Compare 12-factor, runtime config, and secret management patterns'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-08-31T07:43:39.494Z
updated_at: 2026-08-31T07:46:00.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/e098a551-a3f7-44ac-8040-3cc6fd2f59d2/environment-configuration-modern-apps.jpg'
head_image_alt: Environment Configuration for Modern Apps
keywords: 'environment configuration, 12-factor app, secret management, Capacitor config, CI/CD deployment'
tag: 'Mobile, CI/CD, Capacitor'
published: true
locale: en
next_blog: ''
---
You've shipped the release, signed the native binary, and watched the production rollout start normally. Then support reports that users can't complete a purchase. The crash log looks unrelated, so you spend hours tracing requests, plugin initialization, and recent JavaScript changes. The cause turns out to be a staging API URL left in a rushed production build.

That failure isn't unusual. **Environment configuration** is the discipline of keeping deployment-specific settings, such as API endpoints, feature flags, database credentials, and third-party keys, separate from application code. In Capacitor and Electron apps, the separation is harder because web assets are bundled inside native containers, so a configuration mistake can become part of a signed artifact rather than a value you can change on the server.

The deeper problem is **configuration drift**, the gradual divergence between development, staging, and production. A developer updates one `.env` file, a release engineer changes a CI variable, and a mobile build preserves an older value inside its bundle. The app still compiles, but the environments no longer represent the same system. Teams that understand the [differences between development and production in Capacitor apps](https://capgo.app/blog/development-vs-production-key-differences-in-capacitor-apps/) can avoid some obvious mistakes, but drift requires an operating model, not only a better file naming convention.

The practical question is straightforward: how do you ship the same codebase to multiple environments without repeatedly rebuilding, re-signing, or submitting a native app for every configuration change?

## Table of Contents
- [Why Environment Configuration Breaks Production Apps](#why-environment-configuration-breaks-production-apps)
  - [Drift starts with harmless exceptions](#drift-starts-with-harmless-exceptions)
  - [Build-time configuration creates a release bottleneck](#build-time-configuration-creates-a-release-bottleneck)
- [Comparing the Four Main Configuration Patterns](#comparing-the-four-main-configuration-patterns)
  - [Pattern one, 12-Factor environment variables](#pattern-one-12-factor-environment-variables)
  - [Pattern two, per-environment builds](#pattern-two-per-environment-builds)
  - [Pattern three, runtime configuration](#pattern-three-runtime-configuration)
  - [Pattern four, dedicated secret management](#pattern-four-dedicated-secret-management)
- [Security and CI/CD Implications You Cannot Ignore](#security-and-cicd-implications-you-cannot-ignore)
  - [Where pipelines leak configuration](#where-pipelines-leak-configuration)
  - [Security has to coexist with release speed](#security-has-to-coexist-with-release-speed)
- [Implementing Environment Config in Capacitor and Electron](#implementing-environment-config-in-capacitor-and-electron)
  - [Define and validate one contract](#define-and-validate-one-contract)
  - [Capacitor native configuration](#capacitor-native-configuration)
  - [Electron requires a process boundary](#electron-requires-a-process-boundary)
- [Simplifying Targeted Updates and Rollbacks with Capgo](#simplifying-targeted-updates-and-rollbacks-with-capgo)
  - [Channels make environment ownership explicit](#channels-make-environment-ownership-explicit)
- [Your Environment Configuration Audit Checklist](#your-environment-configuration-audit-checklist)

<a id="why-environment-configuration-breaks-production-apps"></a>
## Why Environment Configuration Breaks Production Apps

The most expensive configuration bugs rarely look like configuration bugs. A wrong API base URL can surface as an authentication failure, an empty account screen, a payment error, or a native plugin crash. By the time the incident reaches the engineer who owns the build pipeline, the original mistake may be buried under several commits and a successful store submission.

Hybrid applications have a particular failure pattern. Capacitor compiles a web application and places its assets inside an iOS or Android project. Electron packages the renderer and main-process code into a desktop application. If an endpoint or feature flag is resolved during that build, the resulting value travels with the artifact. Changing it later usually means producing a new bundle, signing it again, and distributing it through the applicable channel.

<a id="drift-starts-with-harmless-exceptions"></a>
### Drift starts with harmless exceptions

Configuration drift grows from reasonable shortcuts:

- **A local override:** A developer hardcodes a test endpoint to unblock a feature and forgets to remove it.
- **A separate pipeline variable:** CI uses a production value that doesn't match the repository's documented configuration.
- **A native-only setting:** Android, iOS, and Electron receive different plugin identifiers or callback settings.
- **An undocumented flag:** Operations changes a feature flag directly in a deployment system, while staging continues using the old behavior.

Each choice can work in isolation. The trouble begins when nobody can answer which value is authoritative, which environment owns it, and when it last changed.

> **Practical rule:** If a configuration value can change independently of application logic, treat it as a deployment input, not as source code.

A staging environment should resemble production closely enough to expose integration problems, while still using isolated endpoints, credentials, and data. When the environments drift, staging stops being a useful rehearsal. A release can pass every test against one set of assumptions and fail immediately against another.

<a id="build-time-configuration-creates-a-release-bottleneck"></a>
### Build-time configuration creates a release bottleneck

Build-time configuration remains useful. Public compile-time values, platform-specific identifiers, and settings required by native tooling often need to exist before the application is packaged. The problem is using build-time injection for values that operations may need to change after release.

Suppose a production API moves to a new endpoint. With a traditional Capacitor workflow, the team changes the value, builds the web assets, synchronizes native projects, signs the application, and distributes it through the platform's release process. Electron teams face a similar cycle when the changed value belongs inside the packaged application.

That workflow is acceptable for a deliberate product release. It's a poor response to an urgent configuration correction. The binary may be healthy, the JavaScript may be unchanged, and yet a single string forces a complete delivery cycle.

The safer design separates three layers:

1. **Application logic**, which should remain identical across environments.
2. **Environment configuration**, which selects endpoints, flags, and non-sensitive runtime behavior.
3. **Secret material**, which belongs in controlled storage and should be injected only when necessary.

That separation makes drift visible. It also gives the team a clear answer when production behaves differently: compare the configuration inputs before blaming the code.

<a id="comparing-the-four-main-configuration-patterns"></a>
## Comparing the Four Main Configuration Patterns

No single configuration pattern fits every part of a hybrid application. A backend can read process environment variables at startup, while a Capacitor renderer may have no traditional server process. Electron adds another boundary between the main process and the renderer. The right choice depends on whether a value is public, sensitive, mutable after release, or required by native build tooling.

<a id="pattern-one-12-factor-environment-variables"></a>
### Pattern one, 12-Factor environment variables

The 12-Factor model treats configuration as environment-specific input rather than hardcoded application state. That works naturally for server processes, containers, and CI jobs. A service can read its values at startup and use the same artifact in multiple deployments.

Client-side apps complicate the model. A value referenced by browser JavaScript must eventually be available to the client, so it shouldn't be treated as a secret merely because it arrived through an environment variable. A public API origin or feature flag can use build-time substitution, but credentials with meaningful privileges must not be shipped into a reversible client bundle.

For Capacitor and Electron, this pattern is best for **build orchestration and public configuration**, not for protecting secrets. It has low conceptual overhead, but runtime mutability is limited unless another delivery layer exists.

<a id="pattern-two-per-environment-builds"></a>
### Pattern two, per-environment builds

Teams often maintain development, staging, and production build profiles. Each profile selects its own endpoint, app identifier, native service files, and feature flags. The approach is easy to explain and works with platform requirements.

Its weakness is artifact divergence. Three builds can contain different behavior, not only different settings, especially when conditional compilation or platform-specific scripts creep into the pipeline. Every configuration change creates another build and may trigger signing, notarization, store processing, or manual release coordination.

Rollback is also tied to artifact distribution. You can revert to an older binary, but users may already have different versions installed, and the rollback path depends on the distribution channel.

<a id="pattern-three-runtime-configuration"></a>
### Pattern three, runtime configuration

Runtime configuration moves mutable values outside the native artifact. The application retrieves a configuration document on launch or reads a locally cached document that was previously delivered. This lets teams correct endpoints and flags without changing application code.

The trade-off is a new startup dependency. If the remote configuration service is unavailable, the app needs a safe cache, a bounded timeout, and a known fallback policy. A fallback must never point to the wrong environment. Validate the document's schema, authenticate its source where appropriate, and record which configuration version the app applied.

For hybrid apps, this is usually the most flexible pattern for non-secret values. It does require careful offline behavior because mobile users can launch an app with no network connection.

<a id="pattern-four-dedicated-secret-management"></a>
### Pattern four, dedicated secret management

Platforms such as HashiCorp Vault and AWS Secrets Manager are designed to control sensitive backend material. They support access policies, audit trails, encryption, and rotation workflows. That makes them appropriate for server-side services that can authenticate to the secret store without exposing credentials to users.

They don't solve the client-secret problem. A secret delivered to a mobile or desktop client can usually be inspected by the person who owns the device. Client applications should receive only values that are safe to disclose, while privileged operations remain behind a backend.

| Pattern | Build Complexity | Store Resubmission Needed | Rollback Speed | Best For |
|---|---|---|---|---|
| 12-Factor variables | Low for servers, moderate for hybrid builds | Usually, for bundled client values | Moderate | Backend services and public build inputs |
| Per-environment builds | High as environments multiply | Yes, when bundled values change | Slow to moderate | Small teams with infrequent releases |
| Runtime configuration | Moderate | No for compatible web-layer changes | Fast, with versioned payloads | Mutable endpoints, flags, and client behavior |
| Secret management platforms | Moderate to high | No for backend-only secrets | Fast for server consumers | Privileged backend credentials |

Teams working on a single app with occasional releases can start with per-environment builds plus strict validation. A growing team with parallel staging and production work needs a runtime layer to reduce artifact divergence. A high-cadence team should combine immutable application bundles, runtime configuration, and a secret manager for backend credentials. The [feature flag implementation guidance for Capacitor](https://capgo.app/blog/how-to-implement-feature-flags/) fits into that runtime layer, provided flags are scoped, audited, and safe to expose to the client.

<a id="security-and-cicd-implications-you-cannot-ignore"></a>
## Security and CI/CD Implications You Cannot Ignore

A configuration value isn't automatically safe because it came from CI. The moment a value enters a client bundle, native resource, Electron archive, log file, crash report, or device backup, assume someone with access to that artifact may inspect it.

Public identifiers and client-side settings are different from secrets. A mobile API key that only identifies an application may be acceptable in a bundle if the provider expects it there and restricts its use. A database credential, signing secret, privileged token, or unrestricted service credential is not safe in the same place. OWASP SAMM recommends separating duties or encrypting production secrets, preventing unprotected secrets from entering repositories, and managing their lifecycle rather than waiting for an incident.

![A diagram illustrating three stages of security risks involving hardcoded secrets within CI/CD and deployment pipelines.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/ffc0a63c-b59a-493e-bb23-9cab25e1ecb2/environment-configuration-security-risks.jpg)

<a id="where-pipelines-leak-configuration"></a>
### Where pipelines leak configuration

CI/CD systems fail in mundane ways. A shell command prints an expanded variable, a failed build includes a secret in an exception, or a debugging step archives an environment dump. A `.env.production` file may also enter version control because a repository inherited an incomplete `.gitignore`.

Use a secure store for sensitive values and keep the pipeline's permissions narrow. The build job should receive only the values required for that target, and logs should mask them. Review generated JavaScript, native resources, Electron archives, and source maps for accidental inclusion. A checksum or signature on a remotely delivered configuration payload can help detect tampering, but it doesn't turn a client-visible value into a secret.

Teams handling analytics or other sensitive data can use a separate resource such as ELECTE's [security whitepaper for AI analytics](https://www.electe.net/security-whitepaper) when reviewing broader data protection responsibilities. It complements, rather than replaces, application-specific configuration controls.

<a id="security-has-to-coexist-with-release-speed"></a>
### Security has to coexist with release speed

The secure pattern for a production secret is controlled storage, encryption in transit and at rest, least-privilege access, and rotation. For a mutable public endpoint, the secure pattern is different. The endpoint can be delivered through a versioned runtime document, validated before use, and restricted so that a malformed value fails closed.

Don't put privileged credentials in Capacitor or Electron code to avoid a backend round trip. Don't rely on obfuscation, minification, or a hidden renderer variable. Those techniques make casual inspection harder, but they don't change the trust model of a client device.

A practical pipeline separates responsibilities:

- **Source control:** Commit configuration schemas and safe examples, never live secrets.
- **Build stage:** Inject only values required to produce the artifact, and prevent secret expansion in logs.
- **Delivery stage:** Apply environment-specific runtime bundles through an authenticated, observable channel.
- **Rotation stage:** Revoke and replace backend credentials on a defined schedule, with an incident path for immediate invalidation.

The [CI/CD secret management practices for Capacitor teams](https://capgo.app/blog/managing-secrets-in-cicd-pipelines/) are most useful when paired with an explicit inventory. For every variable, document whether it is public or sensitive, who owns it, which environments use it, and whether changing it requires a native rebuild.

<a id="implementing-environment-config-in-capacitor-and-electron"></a>
## Implementing Environment Config in Capacitor and Electron

A maintainable setup starts with one configuration contract, not a pile of framework-specific conditionals. Keep safe environment inputs in predictable files, load them through the build system, and expose them to application code through a small typed service.

A workable repository layout looks like this:

```text
.env
.env.staging
.env.production
.env.example
src/config/
  schema.ts
  config-service.ts
capacitor.config.ts
electron/
  main.ts
  preload.ts
```

Only `.env.example` belongs in source control. The other files should be ignored, and CI should provide the values for each target. The files can contain public endpoints and feature flags, but sensitive backend credentials should remain in a dedicated secret store and never become part of the client bundle.

<a id="define-and-validate-one-contract"></a>
### Define and validate one contract

With Vite, client-exposed variables normally use the `VITE_` prefix. That prefix is a visibility signal, not a security boundary.

```ts
// src/config/schema.ts
export type AppConfig = {
  apiBaseUrl: string
  enableNewCheckout: boolean
  environment: 'development' | 'staging' | 'production'
}

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required configuration: ${name}`)
  }
  return value
}

export function loadConfig(): AppConfig {
  const environment = required('VITE_APP_ENV', import.meta.env.VITE_APP_ENV)

  if (!['development', 'staging', 'production'].includes(environment)) {
    throw new Error(`Unsupported environment: ${environment}`)
  }

  return {
    apiBaseUrl: required('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL),
    enableNewCheckout: import.meta.env.VITE_ENABLE_NEW_CHECKOUT === 'true',
    environment: environment as AppConfig['environment'],
  }
}
```

Call `loadConfig()` during application startup. A missing value should produce a clear error rather than selecting a local endpoint. That single decision prevents a large class of production misrouting bugs.

For local work, Vite can select the appropriate file with its mode. A staging build can use `.env.staging`, while a production build uses `.env.production`. The CI job should set the mode explicitly instead of inheriting whatever a developer used locally.

<a id="capacitor-native-configuration"></a>
### Capacitor native configuration

Native projects often need environment-specific identifiers, service files, or plugin settings. Keep those values in `capacitor.config.ts`, but avoid placing private credentials there.

```ts
// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli'

const isProduction = process.env.APP_ENV === 'production'

const config: CapacitorConfig = {
  appId: isProduction ? 'com.example.app' : 'com.example.app.staging',
  appName: isProduction ? 'Example' : 'Example Staging',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
}

export default config
```

Firebase files, push notification certificates, and platform identifiers should be selected by the native build pipeline and stored with appropriate access controls. The production app should never reuse staging service credentials because both builds happen to compile.

The [Capacitor local environment setup guide](https://capgo.app/blog/setting-up-capacitor-local-environment/) can help teams standardize local modes, but the repository still needs an explicit contract and CI validation.

<a id="electron-requires-a-process-boundary"></a>
### Electron requires a process boundary

Electron's renderer is not the same as the Node.js main process. In a hardened application, `process.env` may be available in the main process but undefined or intentionally unavailable in the renderer. Pass only the safe configuration through a preload bridge.

```ts
// electron/main.ts
import { app, BrowserWindow } from 'electron'
import path from 'node:path'

function createWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  const safeConfig = {
    apiBaseUrl: process.env.API_BASE_URL,
    environment: process.env.APP_ENV,
  }

  window.webContents.on('did-finish-load', () => {
    window.webContents.send('app-config', safeConfig)
  })

  return window
}

app.whenReady().then(createWindow)
```

```ts
// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('appConfig', {
  get: () => new Promise((resolve) => {
    ipcRenderer.once('app-config', (_event, config) => resolve(config))
  }),
})
```

Validate the object again in the renderer. The bridge should expose only public runtime values, never a secret store token or privileged filesystem capability.

| Aspect | Capacitor | Electron |
|---|---|---|
| Main configuration boundary | Native project and bundled web assets | Main process, preload, and renderer |
| Safe client values | Public endpoints and flags | Public endpoints and flags passed through preload |
| Sensitive credentials | Keep them out of the app bundle | Keep them out of the packaged archive |
| Common failure | Stale build values after native sync | `process.env` unavailable in the renderer |
| Runtime update path | Signed web bundle or remote config | Signed web bundle or controlled application update |

The most common implementation mistake is assuming `.env` files are automatically private. A bundler can include their values in generated JavaScript, and a packaging step can include the files themselves. Inspect the final artifact, not only the source tree.

<a id="simplifying-targeted-updates-and-rollbacks-with-capgo"></a>
## Simplifying Targeted Updates and Rollbacks with Capgo

Even a disciplined build-time setup leaves a hard operational gap. If a public endpoint changes after release, the native application may still contain the old value. Rebuilding and distributing a new binary is excessive when the required change affects only the web layer.

Capgo's live-update model addresses that gap with **targeted channels** for deployment tiers such as development, staging, and production. A team can publish a signed JavaScript, CSS, configuration, or asset bundle to the channel that matches the affected environment. The native shell remains installed while the app applies the compatible update on its next launch.

![A comparison chart showing traditional app configuration workflows versus instant updates and rollbacks using Capgo platform.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/b410f29e-861e-4cb2-b13f-0a44e1fa46f1/environment-configuration-app-updates.jpg)

Consider a production API endpoint that changes unexpectedly. The team can update the configuration source, build the web bundle, and publish it to the production channel instead of waiting for a native store release. The important boundary remains intact: this approach doesn't bypass platform rules for native code, and it doesn't make a secret safe to ship. It does reduce the time required to correct compatible web-layer configuration.

<a id="channels-make-environment-ownership-explicit"></a>
### Channels make environment ownership explicit

A channel should map to an environment, not to an individual developer's preference. Development testers receive development content, staging users receive staging content, and production users receive only the bundle approved for production. CI can publish the appropriate bundle after the corresponding build and validation steps.

Rollback is equally important. If the new configuration points to an unhealthy service, the release operator should be able to select the previous known-good bundle for that channel. Version history, deployment guardrails, and device-level reporting help the team determine whether the issue is widespread or limited to a rollout segment.

The result is a clearer promotion path:

1. Build and validate the bundle for development.
2. Promote the same tested content to staging.
3. Approve the production channel update.
4. Monitor adoption and failures.
5. Revert the channel if the configuration behaves incorrectly.

That process reduces the temptation to create emergency native builds for every endpoint correction. The [Capgo version control and rollback workflow](https://capgo.app/blog/how-capgo-handles-version-control-and-rollbacks/) is especially relevant for teams that need environment-specific releases without losing a traceable history.

<a id="your-environment-configuration-audit-checklist"></a>
## Your Environment Configuration Audit Checklist

Run this audit before every major release and after any pipeline change.

- **Inspect artifacts:** Confirm no secrets appear in committed files, generated JavaScript, native resources, source maps, or Electron archives.
- **Separate environments:** Verify development, staging, and production use distinct endpoints, identifiers, and approved keys.
- **Protect inputs:** Check that every `.env` variant is ignored, while `.env.example` documents the required schema.
- **Review CI:** Confirm pipelines inject values from controlled stores rather than relying on a developer's local machine.
- **Test recovery:** Verify runtime configuration fails fast when a required value is missing and that a compatible update can be rolled back without rebuilding the native shell.

![A checklist infographic titled Environment Configuration Audit Checklist featuring five steps for secure software deployment practices.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/05af5717-3728-4f7e-92ba-e7fc36e32898/environment-configuration-audit-checklist.jpg)

The audit is complete only when someone can identify the owner, source, scope, and rollback procedure for every production configuration value.

---

Capgo provides signed live updates for CapacitorJS and Electron apps, including targeted channels and versioned rollbacks for compatible JavaScript, CSS, configuration, and asset changes. If your team wants to reduce rebuild cycles while keeping environment updates controlled, visit [Capgo](https://capgo.app) and evaluate it alongside your existing CI/CD process.
