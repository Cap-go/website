---
slug: automate-capgo-live-updates-from-lovable-github-actions
title: Automate Capgo Live Updates from Lovable with GitHub Actions
description: >-
  One-click Lovable Publish to production users: sync to GitHub, store your Capgo
  API key as a secret, and let GitHub Actions build and upload on every push.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-08-06T00:00:00.000Z
updated_at: 2026-08-07T15:54:15.000Z
head_image: /github_actions.webp
head_image_alt: "Automate Capgo Live Updates from Lovable with GitHub Actions Capgo blog illustration"
keywords: Lovable, Lovable.dev, Capgo, GitHub Actions, live updates, OTA, CI/CD, CAPGO_TOKEN, bundle upload, Capacitor
tag: CI/CD
published: true
locale: en
origin: human
next_blog: automatic-build-and-release-with-github-actions
---

Your client wants a single button in Lovable that ships changes to every active user. You already proved the update path works manually:

```bash
npx @capgo/cli@latest bundle upload --channel=production --auto-bump
```

The missing piece is not another terminal command inside Lovable. **Lovable cannot run Capgo on Publish.** When GitHub sync is enabled, **Publish pushes a commit to your repo**. GitHub Actions runs the build and `bundle upload` for you.

This guide covers the only manual setup your client must do once: add `CAPGO_TOKEN` as a GitHub secret. For the workflow file, copy-paste the ready AI instruction into Lovable (Step 3).

## How the pipeline works

| Step | Who | What happens |
| --- | --- | --- |
| 1 | Client | Edits the app in Lovable and clicks **Publish** |
| 2 | Lovable | Commits and pushes to GitHub (usually `main`) |
| 3 | GitHub Actions | `npm ci`, `npm run build`, `bundle upload --auto-bump` to Capgo |
| 4 | Capgo | Active devices on the `production` channel receive the update |

No SSH, no local CLI, no extra click after the secret is configured.

**Prerequisites**

- Lovable project connected to GitHub ([export guide](/blog/transform-lovable-dev-app-to-mobile-with-capacitor/#step-1--export-your-lovable-app-to-github))
- Capacitor + `@capgo/capacitor-updater` in the repo ([Lovable to mobile guide](/blog/transform-lovable-dev-app-to-mobile-with-capacitor/#step-12--add-capgo-live-updates))
- App registered in Capgo with `capacitor.config.ts` pointing at the correct `appId`
- `production` channel exists and is linked to the builds your users run

## Why `--auto-bump`

Every Capgo upload needs a **new unique bundle version**. Lovable Publish does not bump `package.json` for you, so CI would fail on the second deploy if you reuse the same version.

`--auto-bump` reads the latest version on the channel (or app) and increments it. Default level is `minor`. You can pass `--auto-bump patch` or `--auto-bump major` if you prefer.

## Step 1 — Create a Capgo API key

1. Open [console.capgo.app/apikeys/](https://console.capgo.app/apikeys/)
2. Create an API key with permission to upload bundles for your app
3. Copy the key once. You will not see the full value again

Treat this key like a password. Never commit it to Git or paste it into Lovable chat.

## Step 2 — Add `CAPGO_TOKEN` in GitHub (the only env step)

This is the step you send to Kuldeep and any client who owns the repo.

1. Open the GitHub repository Lovable syncs to
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `CAPGO_TOKEN`
5. Value: paste the Capgo API key from Step 1
6. Save

GitHub injects the secret into workflows as `${{ secrets.CAPGO_TOKEN }}`. The workflow below reads it as the `CAPGO_TOKEN` environment variable for the Capgo CLI.

If the repo is under your client's organization, they must add the secret on **their** repo. You only need the key in GitHub, not in Lovable settings.

## Step 3 — Paste this prompt into Lovable

Copy the block below into the Lovable chat. If your default branch is not `main`, replace `main` in the workflow with your branch name.

```text
Add Capgo Live Updates CI with GitHub Actions.

Create `.github/workflows/capgo-live-updates.yml` (create folders if needed). Start from this YAML, then adapt install/build to this project while keeping Capgo upload + CAPGO_TOKEN secret behavior:

name: Capgo Live Updates

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '24'
          cache: 'npm'

      - name: Install and build
        run: |
          npm ci
          npm run build

      - name: Upload bundle to Capgo
        run: npx @capgo/cli@latest bundle upload --channel=production --auto-bump
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}

Rules:
- Do not hardcode any Capgo API key in the repo or in chat.
- The workflow must read CAPGO_TOKEN only from GitHub Actions secrets (`${{ secrets.CAPGO_TOKEN }}`).
- Keep `--auto-bump` on the upload command so each Publish gets a new unique bundle version.
- Prefer the project's real production build script from package.json (for example `npm run build` or `vite build`).
- If package-lock.json is missing, use `npm install` instead of `npm ci`.
- Do not modify app UI or Capacitor config for this task.
- Commit the workflow file so the next Publish pushes it to GitHub.
```

After Lovable applies the change, click **Publish** so the workflow lands on GitHub.

### Manual alternative

If you prefer not to use the Lovable chat, create `.github/workflows/capgo-live-updates.yml` with this YAML only (not the prompt prose). Adapt the install/build steps the same way as the rules above if your project differs, then commit and push.

```yaml
name: Capgo Live Updates

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '24'
          cache: 'npm'

      - name: Install and build
        run: |
          npm ci
          npm run build

      - name: Upload bundle to Capgo
        run: npx @capgo/cli@latest bundle upload --channel=production --auto-bump
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

**Vite `base` path:** Lovable Vite apps often need `base: './'` in `vite.config.ts` so assets load inside the native shell. If users see a white screen after an OTA update, ask Lovable to set `base: './'`, publish again, and let the workflow redeploy.

**Encrypted bundles:** If you use [Capgo encryption](/docs/live-updates/encryption/), add `CAPGO_PRIVATE_KEY` as a second GitHub secret and pass `--key-data-v2 "${{ secrets.CAPGO_PRIVATE_KEY }}"` on the upload step.

## Step 4 — Confirm Publish triggers a deploy

1. In Lovable, make a small visible change (for example button label text)
2. Click **Publish**
3. On GitHub, open **Actions** and watch **Capgo Live Updates**
4. When the job is green, open your [Capgo console](https://console.capgo.app/) and confirm a new bundle on the `production` channel
5. On a device with the app installed, confirm the change arrives (may take a minute depending on channel settings)

✅ **Success:** Publish in Lovable → green GitHub Action → new bundle in Capgo → users get the update.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Workflow never runs | Push went to a branch other than `main` | Change `branches` in the workflow or publish to `main` |
| `CAPGO_TOKEN` / auth error | Secret missing or wrong name | Secret must be exactly `CAPGO_TOKEN` under Actions secrets |
| Version already exists | Upload reused the same bundle version | Keep `--auto-bump` on the upload step (or pass `--auto-bump patch`) |
| Build fails on `npm ci` | Lockfile out of sync | Run `npm install` locally, commit `package-lock.json`, publish again |
| Upload succeeds, white screen | Wrong `webDir` or Vite `base` | Match `capacitor.config.ts` `webDir` to build output (`dist` for Vite) and set `base: './'` |
| Users do not see the update | Channel not linked to their build | In Capgo, link the device build to `production` or set the channel to public |

For more workflow patterns (feature branches, PR channels, encryption), see [GitHub Actions integration](/docs/live-updates/integrations/github-actions/).

## What you tell your client

Send them this checklist:

1. **You** already connected Lovable to GitHub and set up Capgo on the mobile app.
2. **They** add one GitHub secret: `CAPGO_TOKEN` with their Capgo API key ([apikeys page](https://console.capgo.app/apikeys/)).
3. **They** click **Publish** in Lovable whenever they want users to receive changes.
4. They never run `npx @capgo/cli` locally unless they want to.

That matches the single-click experience they asked for: Publish in Lovable is the button; GitHub Actions and Capgo handle the rest.

## Keep going

- [Convert Lovable to iOS and Android](/blog/transform-lovable-dev-app-to-mobile-with-capacitor/) — Full Capacitor + Capgo setup if you have not wrapped the app yet
- [Automatic build and release with GitHub Actions](/blog/automatic-build-and-release-with-github-actions/) — Tag-based releases and version bumps
- [GitHub Actions integration](/docs/live-updates/integrations/github-actions/) — Multi-channel and PR preview channels
- [Capgo Live Updates](/live-updates/) — Channels, rollbacks, and adoption stats
