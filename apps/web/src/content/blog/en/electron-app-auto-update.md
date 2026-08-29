---
slug: electron-app-auto-update
title: 'Electron App Auto Update: A Practical 2026 Guide'
description: 'Ship Electron app auto update without the silent failures. Real code, signing tips, rollout guardrails, and rollback strategy for production teams.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-08-29T09:01:52.619Z
updated_at: 2026-08-29T09:01:53.916Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/8b049858-401f-480d-9e87-6d3a3cc11be1/electron-app-auto-update-title-slide.jpg'
head_image_alt: 'Electron App Auto Update: A Practical 2026 Guide'
keywords: 'electron auto update, electron updater, electron-builder, electron updates, electron live update'
tag: 'Mobile, Updates, Guides'
published: true
locale: en
next_blog: ''
---
You've shipped the Electron build, the release page is live, and the first support ticket arrives before the coffee machine finishes. One user says the app never found the update. Another downloaded it but can't install it. A third is still running an old binary with a broken authentication flow, while your logs show almost nothing useful.

That's the uncomfortable reality of **Electron app auto update**. The updater API is only one component. A production release also depends on platform signing, transport policy, manifests, hosting, lifecycle events, observability, rollout controls, and a rollback path. Treat any one of those as optional and a routine patch can become an overnight incident.

## Table of Contents
- [The 2 A.M. Update Incident That Started This Guide](#the-2-am-update-incident-that-started-this-guide)
- [Choosing the Right Electron Updater Path](#choosing-the-right-electron-updater-path)
- [Implementing the Auto-Update Flow in the Main Process](#implementing-the-auto-update-flow-in-the-main-process)
  - [Configure the publish target first](#configure-the-publish-target-first)
  - [Schedule checks and expose lifecycle events](#schedule-checks-and-expose-lifecycle-events)
  - [Keep the renderer informed without blocking work](#keep-the-renderer-informed-without-blocking-work)
- [Wiring CI/CD for Signed Releases and Manifests](#wiring-cicd-for-signed-releases-and-manifests)
  - [Make signing explicit in CI](#make-signing-explicit-in-ci)
- [Rollouts, Channels, and Rollback Strategy](#rollouts-channels-and-rollback-strategy)
  - [Use cohorts before broad exposure](#use-cohorts-before-broad-exposure)
- [Treating Auto-Update as a Security Control](#treating-auto-update-as-a-security-control)
  - [Protect the metadata as carefully as the binary](#protect-the-metadata-as-carefully-as-the-binary)
- [The Production Update Runbook and Checklist](#the-production-update-runbook-and-checklist)
  - [Pre-release gates](#pre-release-gates)
  - [Canary and full rollout](#canary-and-full-rollout)
  - [Incident response](#incident-response)

<a id="the-2-am-update-incident-that-started-this-guide"></a>
## The 2 A.M. Update Incident That Started This Guide

The release passed CI and looked ordinary. Late on Friday, a developer pushed an unsigned Electron build, and the publish job uploaded enough assets to make the release appear complete. The application launched in testing, but nobody had exercised the update path from an installed production build.

At 2:08 a.m., PagerDuty alerted the on-call engineer. A new authentication flow failed for part of the fleet, and users who received the update could not complete sign-in. Other users stayed on the previous version because the updater could not verify or install the artifact. Some customers had a broken release, while the rest of the fleet ran a different version with no clear explanation.

The investigation followed five checks:

1. **Check the release feed.** The binary existed, but the expected metadata did not clearly establish which clients should receive it. A manifest is a contract between the release pipeline and installed clients, not an optional upload detail.
2. **Inspect signing.** The release was not signed correctly, so verification failed on affected platforms. Signing must block publication when it is missing or invalid.
3. **Compare client logs.** Update errors never reached central telemetry. The application swallowed the event and continued running, leaving the team without reliable evidence.
4. **Check rollout controls.** There was no internal channel or staged cohort. Every eligible client used the same feed, so the failure spread without a containment point.
5. **Search for a rollback.** The team had no tested procedure to republish the prior version or direct clients away from the broken release.

Electron's official documentation makes the platform limits clear. **Linux has no built-in auto-updater support**, and macOS update requests must satisfy **App Transport Security requirements**. The documentation also identifies signing as a prerequisite for dependable macOS updates and release verification. The [Electron autoUpdater documentation](https://www.electronjs.org/docs/latest/api/auto-updater) defines the API constraints, while the release system must enforce the surrounding operational controls.

> **Postmortem lesson:** An updater that cannot explain what happened is a remote installation attempt with missing telemetry.

The cost extended beyond engineering time. Customers lost confidence in the desktop client, support had to explain inconsistent behavior, and the team spent the next workday rebuilding a release process that should have existed before the incident.

Treat auto-update as an **operational system**. Signing is a release gate, manifests define the client contract, rollout channels limit exposure, and rollback remains a tested path rather than an emergency invention.

<a id="choosing-the-right-electron-updater-path"></a>
## Choosing the Right Electron Updater Path

At 2 a.m., the wrong updater choice becomes an operational problem. A native binary update must handle signing, manifests, installers, and rollback. A renderer-only JavaScript or CSS change follows a different path. Hosting constraints also matter: a small GitHub-hosted project does not need the same release controls as an enterprise distribution service.

For projects using electron-builder with signed artifact publishing, **electron-updater** is usually the practical default. Its ecosystem covers publish targets, release manifests, artifact downloads, and installation on the next launch. It supports several hosting models, but your team still owns signing, feed availability, channel policy, rollout controls, and monitoring. The [Electron updater integration for Capgo](https://capgo.app/plugins/electron-updater/) is relevant when evaluating a hybrid delivery model for web-layer bundles alongside native releases.

`update-electron-app` suits teams that want a small integration around GitHub Releases. It checks at startup and then on a recurring interval, which keeps the setup simple but leaves less room for advanced channel selection, staged traffic, and custom rollback rules. The package is reasonable for a small release process, provided GitHub Releases and its availability match your operational requirements.

| Option | Hosting Control | Signing Support | Channels & Staged Rollouts | Maintenance Burden |
|---|---|---|---|---|
| **electron-updater** | S3, GitHub, generic HTTPS, and other publish targets | Integrates with packaged release signing | Strong foundation, custom policy usually lives around the feed | Moderate |
| **update-electron-app** | Primarily simple GitHub Releases workflows | Uses the underlying Electron signing model | Limited unless you add surrounding services | Low |
| **Squirrel.Windows or Squirrel.Mac** | Platform-oriented distribution flow | Relies on platform signing requirements | Possible, but usually requires extra release infrastructure | Moderate for legacy applications |
| **Custom service** | Full control over manifests, authorization, cohorts, and feeds | You own verification design and key handling | Maximum flexibility | High |
| **Capgo live updates** | Managed delivery for web-layer bundles | Uses its updater and delivery model | Audience targeting and channel-based delivery | Separate operational model from native binary updates |

A custom service such as Hazel, Nuts, or an internal feed fits when release authorization, tenant targeting, audit records, or regulated deployment rules justify the implementation cost. The trade-off is ongoing ownership. Your team must define manifest semantics, protect signing keys, preserve client compatibility, and test failed downloads, rejected releases, and rollback behavior.

Live updates can ship renderer-only changes without rebuilding the native shell. They do not replace binary updates when Electron, native modules, permissions, or installer behavior changes. **Use electron-updater unless you need custom rollout logic.** If custom logic is required, build around established manifest and artifact conventions rather than recreating download and differential-update behavior. A dependable path is the one your team can observe, stage, and reverse under pressure.

<a id="implementing-the-auto-update-flow-in-the-main-process"></a>
## Implementing the Auto-Update Flow in the Main Process

The main process should own update checks and installation. The renderer can display status, but it shouldn't decide whether an executable update is trusted or when the application exits.

<a id="configure-the-publish-target-first"></a>
### Configure the publish target first

A minimal electron-builder configuration might look like this:

```json
{
  "build": {
    "appId": "com.example.desktop",
    "publish": [
      {
        "provider": "s3",
        "bucket": "example-electron-releases",
        "channel": "stable"
      }
    ],
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

Keep beta and stable feeds separate. A channel is a release policy, not a label in the UI. Each channel should resolve to the correct signed artifact and manifest.

<a id="schedule-checks-and-expose-lifecycle-events"></a>
### Schedule checks and expose lifecycle events

Calling `checkForUpdates()` only during startup is a common production mistake. A user can leave the application open for days, so the main process needs a controlled interval and a retry strategy that respects offline operation.

```js
const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;
let isQuitting = false;
let retryDelay = 60 * 1000;

function sendUpdateStatus(status, payload = {}) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-status', { status, ...payload });
  }
}

function scheduleUpdateCheck() {
  setTimeout(async () => {
    try {
      await autoUpdater.checkForUpdates();
      retryDelay = 60 * 1000;
    } catch (error) {
      sendUpdateStatus('error', { message: error.message });
      retryDelay = Math.min(retryDelay * 2, 30 * 60 * 1000);
    }
    scheduleUpdateCheck();
  }, retryDelay);
}

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: require('path').join(__dirname, 'preload.js')
    }
  });

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = false;

  autoUpdater.on('checking-for-update', () => {
    sendUpdateStatus('checking');
  });

  autoUpdater.on('update-available', info => {
    sendUpdateStatus('available', { version: info.version });
  });

  autoUpdater.on('download-progress', progress => {
    sendUpdateStatus('progress', { percent: progress.percent });
  });

  autoUpdater.on('update-downloaded', info => {
    sendUpdateStatus('downloaded', { version: info.version });
  });

  autoUpdater.on('error', error => {
    sendUpdateStatus('error', { message: error.message });
  });

  autoUpdater.checkForUpdates().catch(error => {
    sendUpdateStatus('error', { message: error.message });
  });

  scheduleUpdateCheck();
});

ipcMain.handle('install-update', () => {
  isQuitting = true;
  autoUpdater.quitAndInstall(false, true);
});

app.on('before-quit', event => {
  if (!isQuitting) {
    return;
  }
});
```

The exact update event behavior varies by platform and packaging setup, so test from installed artifacts rather than development mode. Electron's documentation also calls out startup timing concerns on Windows, including the Squirrel first-run case. Don't trigger an update check before the application has completed the platform-specific initialization it needs.

<a id="keep-the-renderer-informed-without-blocking-work"></a>
### Keep the renderer informed without blocking work

The preload bridge should expose a narrow API:

```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('updates', {
  onStatus(callback) {
    ipcRenderer.on('update-status', (_event, status) => callback(status));
  },
  install() {
    return ipcRenderer.invoke('install-update');
  }
});
```

A renderer-side progress bar can remain deliberately simple:

```js
window.updates.onStatus(status => {
  const progress = document.querySelector('#update-progress');
  const message = document.querySelector('#update-message');

  if (status.status === 'progress') {
    progress.hidden = false;
    progress.value = status.percent;
    message.textContent = `Downloading update, ${Math.round(status.percent)}%`;
  }

  if (status.status === 'downloaded') {
    message.textContent = `Version ${status.version} is ready to install`;
  }

  if (status.status === 'error') {
    message.textContent = 'The update could not be downloaded. We will retry later.';
  }
});
```

Gate installation behind user consent in production unless your application has a strong reason to restart immediately. Set an `isQuitting` flag before `quitAndInstall()`, because normal window-close handlers can otherwise prevent the installer from taking over.

![Screenshot from https://raw.githubusercontent.com/electron-userland/electron-builder/master/docs/electron-builder-autoupdate.png](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/984244a9-6aa4-4276-ba78-debc79f665b2/electron-app-auto-update-software-installation.jpg)

Two failures deserve explicit tests. First, an already-running client must call `checkForUpdates()` on a schedule, not only at launch. Second, the `error` event must reach logs and telemetry. If the app swallows it without reporting, your [app troubleshooting workflow](https://capgo.app/blog/app-troubleshooting/) starts with guesswork instead of evidence.

<a id="wiring-cicd-for-signed-releases-and-manifests"></a>
## Wiring CI/CD for Signed Releases and Manifests

The release pipeline is the source of truth for what users install. A local build that works on one developer's machine doesn't prove that the published binary, manifest, signature, and channel all describe the same release.

Electron-builder's publish model expects the release metadata and update target to travel together. For many configurations, that means an artifact such as `latest.yml` for Windows and `latest-mac.yml` for macOS, alongside platform-specific packages and blockmap files. A missing manifest can make a perfectly valid binary invisible to clients.

<a id="make-signing-explicit-in-ci"></a>
### Make signing explicit in CI

A simplified GitHub Actions pattern looks like this:

```yaml
name: release

on:
  push:
    tags:
      - "v*"

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - run: npm ci
      - run: npm run test
      - run: npm run build

      - name: Build and publish
        shell: bash
        env:
          CSC_LINK: ${{ secrets.CSC_LINK }}
          CSC_KEY_PASSWORD: ${{ secrets.CSC_KEY_PASSWORD }}
          WIN_CSC_LINK: ${{ secrets.WIN_CSC_LINK }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: npx electron-builder --publish always
```

Use platform-specific secrets and keep the signing material outside the repository. A signing failure should stop the job, not produce an unsigned fallback that someone uploads manually.

| Variable | Purpose |
|---|---|
| `CSC_LINK` | macOS certificate or certificate reference |
| `CSC_KEY_PASSWORD` | Password for the macOS signing material |
| `WIN_CSC_LINK` | Windows certificate or certificate reference |
| `AWS_ACCESS_KEY_ID` | Publish credential with narrowly scoped access |
| `AWS_SECRET_ACCESS_KEY` | Secret paired with the publish credential |

The publish configuration should identify the provider and channel consistently:

```json
{
  "build": {
    "publish": {
      "provider": "s3",
      "bucket": "example-electron-releases",
      "channel": "stable",
      "publishAutoUpdate": true,
      "updaterCacheDirName": "example-desktop-updater"
    }
  }
}
```

Before publication, gate the job on the package version, tag, commit SHA, and smoke-test result. After publication, verify that the feed contains the expected manifest and that the manifest points to the exact artifact generated by that job. The [continuous integration setup guide](https://capgo.app/blog/continuous-integration-setup/) is useful when you're formalizing those checks, and teams comparing pipeline orchestration may also benefit from understanding [when to use Jenkins and Ansible together](https://submitmysaas.com/blog/jenkins-vs-ansible).

The commands that commonly expose an incomplete release are intentionally boring:

```bash
npx electron-builder --publish never
test -f dist/latest.yml
test -f dist/latest-mac.yml
find dist -name "*.blockmap" -print
```

Those checks don't replace a signed installation test. They do catch the operational mistake of uploading a binary without the metadata clients need to discover it.

<a id="rollouts-channels-and-rollback-strategy"></a>
## Rollouts, Channels, and Rollback Strategy

A release feed should behave more like a deployment target than a download folder. Keep **internal**, **beta**, and **latest** channels separate, with each channel backed by its own manifest and signed artifact set. Promotion should move a tested release between policies, not overwrite a file while clients are downloading it.

Channel separation also protects production from accidental test builds. The updater should know whether a client belongs to an internal cohort, a beta audience, or the stable population before it evaluates the feed.

<a id="use-cohorts-before-broad-exposure"></a>
### Use cohorts before broad exposure

A custom manifest field can express staged delivery:

```yaml
version: 4.8.0
path: Example-Setup-4.8.0.exe
sha512: signed-artifact-hash
rolloutPercentage: 10
```

The main process can assign a stable per-user bucket, then compare that bucket with `rolloutPercentage`. Stable assignment matters. A user who moves between eligible and ineligible states on every check will receive unpredictable behavior and make support reports difficult to interpret.

Expand the cohort only after the release has survived its observation window. The exact window should reflect your usage pattern, but the decision should be based on signals, not on a calendar alone. Track update-check results, download completion, launch health, crashes, renderer exceptions, and authentication success.

| Signal | Action | Reason |
|---|---|---|
| Feed or signature errors rise above the team's approved limit | Hold rollout | Clients may be unable to validate or discover the release |
| Post-update launch checks fail | Revert feed | The binary may install but fail during startup |
| Renderer exceptions increase after promotion | Hold at current cohort | The native installer may be healthy while the new application code is not |
| Signals remain within the release budget | Expand cohort | Evidence supports broader exposure |

Don't confuse rollback with deleting an artifact. Existing clients may have cached metadata, and some may already be running the bad version. A rollback plan needs a previous signed release, a feed change, and a client behavior that can recover.

> **Operational rule:** Rollback must be executable by the on-call engineer without rebuilding the application during the incident.

In practice, the runbook should promote the prior release manifest back to the affected channel, invalidate the staging marker, and confirm that new checks resolve to the safe version. If the issue is in renderer code rather than the native shell, a targeted web-layer rollback may be faster. A platform such as [Capgo phased rollouts](https://capgo.app/blog/phased-rollouts-for-capacitor-live-updates/) can be relevant for that separate delivery layer, but it shouldn't obscure the boundary between a native binary rollback and a web-bundle rollback.

<a id="treating-auto-update-as-a-security-control"></a>
## Treating Auto-Update as a Security Control

An Electron updater downloads executable code and can install it with little user interaction. That makes the update path a **security boundary**, not merely a convenience feature. Electron's official documentation describes platform constraints such as macOS ATS, and security coverage has documented a 2022 scenario in which attackers controlling update infrastructure could serve malicious packages that still passed code-signing checks, as discussed in the [Electron Builder auto-update security documentation](https://www.electron.build/docs/features/auto-update).

Code signing remains foundational, but it isn't the whole trust model. Sign every release, verify the certificate and identity during CI, and maintain a documented key-rotation procedure. On macOS, combine signing with notarization and the hardened runtime appropriate to your application. On Windows, make certificate ownership, renewal, and build access auditable. Linux needs a distribution-specific strategy because Electron doesn't provide a built-in universal updater there.

<a id="protect-the-metadata-as-carefully-as-the-binary"></a>
### Protect the metadata as carefully as the binary

A signed binary can still be associated with the wrong release if the metadata channel is compromised or misconfigured. Consider adding a manifest signature verified against a public key embedded in the application, enforce a minimum permitted version, and reject unexpected downgrades unless an authorized recovery path explicitly permits them.

The feed also deserves production controls:

- **Restrict publishing access:** Give CI only the permissions required to publish release assets.
- **Protect signing secrets:** Keep certificates and private keys in managed secret storage, not repository files.
- **Pin dependencies:** Lock Electron, electron-builder, and transitive dependencies in CI.
- **Review artifacts:** Scan the generated packages and compare them with the intended commit and version.
- **Require secure transport:** Follow ATS and strict HTTPS requirements for update requests.
- **Monitor verification failures:** Treat repeated signature or manifest failures as security events, not ordinary network noise.

Electron's maintained tooling ecosystem continues to add packaging and updater coverage, but maintenance doesn't remove the need for threat modeling. The practical objective is to ensure that an attacker who compromises a bucket, CDN, or build step still can't make the client accept an unauthorized release. The [signature verification guidance](https://capgo.app/blog/signature-verification/) provides useful context for designing that additional verification layer.

![A four-step production update runbook process diagram showing verification, staged rollout, incident monitoring, and rollback protocols.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/be0d7618-1165-4a8e-933d-5f5189a801c4/electron-app-auto-update-runbook-process.jpg)

<a id="the-production-update-runbook-and-checklist"></a>
## The Production Update Runbook and Checklist

A release is ready only when another engineer can operate it under pressure. Keep the checklist close to the deployment job and the incident channel.

<a id="pre-release-gates"></a>
### Pre-release gates

- **Version identity:** Confirm the package version, release tag, commit SHA, and changelog agree.
- **Signing:** Verify every platform artifact is signed and notarization or equivalent validation has completed.
- **Manifest contract:** Confirm `latest.yml`, `latest-mac.yml`, hashes, paths, and blockmaps match the uploaded artifacts.
- **Channel safety:** Publish to the internal or beta feed before promoting the release channel.
- **Telemetry:** Confirm update checks, download progress, install completion, launch health, and errors are arriving.

<a id="canary-and-full-rollout"></a>
### Canary and full rollout

- **Cohort control:** Start with a deliberately small internal or beta audience.
- **Health budget:** Hold promotion if launch failures, update download failures, renderer exceptions, or authentication failures breach the team's approved limits.
- **Promotion approval:** Require an explicit go or no-go decision before moving the release to the stable feed.
- **Customer impact:** Prepare support messaging before broad distribution, not after the first incident.

<a id="incident-response"></a>
### Incident response

If the new binary fails to launch, process spawning breaks, or update downloads stop completing, stop promotion immediately. Restore the prior signed manifest, invalidate the staging marker, and verify that fresh clients resolve to the prior version. Then confirm through telemetry that the fleet is recovering before communicating closure.

The exact rollback commands depend on your provider, but the sequence should always be documented: **flip the channel manifest to the previous version, invalidate the staging tag, push a forced-update marker if recovery requires it, and verify the downgrade path with live telemetry**. A rollback that hasn't been tested is only a hope.

![A professional checklist infographic for managing production software updates, including planning, execution, and post-update validation steps.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/5e25c3ff-caa9-4529-9e15-4b734f405042/electron-app-auto-update-production-checklist.jpg)

---
Capgo offers an Electron updater for delivering signed web-layer changes, targeted channels, rollout controls, and update observability without rebuilding the native shell for every renderer change. If you want to separate native binary releases from controlled JavaScript and CSS delivery, visit [Capgo](https://capgo.app) and evaluate it alongside your existing Electron release pipeline.
