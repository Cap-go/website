---
slug: ai-agents-capacitor-development
title: "How to Use AI Agents in Capacitor App Development"
description: "Use AI agents in Capacitor app development: install Capacitor skills, connect Capgo MCP servers, and let agents add plugins, debug, build, and ship."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_banner.webp
head_image_alt: "Capgo banner for a guide on using AI coding agents to build and ship Capacitor apps"
keywords: AI agents Capacitor, Capacitor AI coding, Claude Code Capacitor, Cursor Capacitor, Capacitor skills, Capgo MCP server, AI mobile app development, agent skills Ionic
tag: Guides, Development, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Which AI agents work with the Capacitor skills?"
    answer: "Any agent that supports the open skills format: Claude Code, Codex, Cursor, Windsurf, GitHub Copilot, Gemini CLI, and others. Install them with bunx skills add Cap-go/capgo-skills."
  - question: "Do I still need MCP servers if I install the skills?"
    answer: "They solve different problems. Skills teach the agent how to do a task correctly. MCP servers give it live tools and data: the public Capgo MCP for docs and API discovery, and the Capgo CLI MCP for authenticated actions like uploads and builds."
  - question: "Does the agent see my signing certificates?"
    answer: "It does not need to. Capgo Build credentials are saved once with the CLI in a local credentials file and sent only for the build, then deleted after it completes. The agent triggers commands and reads logs, so keep credential files out of the repo and out of prompts."
  - question: "Do I need a Mac for the agent to build iOS apps?"
    answer: "Not with cloud builds. The agent can run a Capgo Build request from Windows or Linux, read the logs, and iterate on fixes. You still need an Apple Developer account and signing credentials."
  - question: "Can an agent ship a live update without app review?"
    answer: "It can upload a web bundle to a channel with the Capgo CLI. Live updates must stay within store rules, which allow updating web code but not changing the app's main purpose. Changes to native code still go through a store release."
---

To use AI agents in Capacitor app development, give the agent two things it lacks by default: procedural knowledge of Capacitor's native side, through installable **skills**, and live tools, through **MCP servers** and a CLI it can run. With Capgo's open-source Capacitor skills and the Capgo MCP servers, an agent such as Claude Code, Codex, or Cursor can add plugins with the right native config, debug iOS and Android builds, request cloud builds, and upload live updates.

This guide explains why general agents get Capacitor wrong, how to set up skills and MCP in a few commands, prompts for each stage of the app lifecycle, and the guardrails that keep it safe.

## Why general-purpose agents struggle with Capacitor

Agents are strong on web code. A Capacitor project adds a second half that changes every year:

- **Version drift.** Capacitor 8 changed Android SDK levels, defaults to Swift Package Manager for new iOS projects, and requires Xcode 26 for App Store uploads. Training data mixes Capacitor 3 to 8 advice.
- **Native config across files.** A single plugin can need `Info.plist` keys, entitlements, `AndroidManifest.xml` permissions, Gradle changes, and a `cap sync`. Agents often do only the JavaScript part.
- **Plugin choice.** Many community plugins are unmaintained. An agent picks whatever it saw most often, not what works on Capacitor 8.
- **Invisible failures.** Errors live in Xcode, Logcat, or a CI log, not in the editor.

You fix this with context the agent can load on demand, and tools it can call instead of guessing.

## The toolkit: skills, MCP, and the CLI

| Layer | What it gives the agent | Capgo option |
| --- | --- | --- |
| Skills | Step-by-step procedures for specific tasks | [Capacitor skills](/skills/) (open source, Cap-go/capgo-skills) |
| Public MCP | Docs search, when-to-use guidance, OpenAPI location | `https://capgo.app/mcp` (read-only) |
| CLI MCP | Authenticated account actions: bundles, channels, builds | `bunx @capgo/cli@latest mcp` |
| CLI | Same actions as shell commands, easy to review | `bunx @capgo/cli@latest ...` |

### Install the skills

```bash
bunx skills add Cap-go/capgo-skills
```

The installer detects supported agents and places the skills where each one looks for them. The set covers plugin selection, best practices, Capacitor app and plugin major upgrades (including v7 to v8), CocoaPods to SPM migration, debugging, iOS and Android logs, push notifications, deep links, safe areas, security scanning, testing, CI/CD, App Store preflight, Cordova and web app migrations, Capgo live updates, and Capgo native builds. The [skills page](/skills/) lists every skill.

In Claude Code you can also use the plugin marketplace:

```bash
claude plugin marketplace add Cap-go/capgo-skills
claude plugin install capgo-cloud@capgo-skills
```

### Connect the MCP servers

The public server needs no account. Add it to Claude Code:

```bash
claude mcp add --transport http capgo-docs https://capgo.app/mcp
```

The CLI server runs locally over stdio and uses your Capgo login, so log in first:

```bash
bunx @capgo/cli@latest login
claude mcp add capgo -- bunx @capgo/cli@latest mcp
```

For editors that use a JSON config (Cursor, Windsurf, Claude Desktop), the equivalent is:

```json
{
  "mcpServers": {
    "capgo": {
      "command": "bunx",
      "args": ["@capgo/cli@latest", "mcp"]
    }
  }
}
```

The CLI MCP exposes tools such as `capgo_upload_bundle`, `capgo_list_channels`, `capgo_update_channel`, `capgo_check_compatibility`, `capgo_request_build`, `capgo_doctor`, and `capgo_get_stats`. The full list is in the [CLI MCP reference](/docs/cli/reference/mcp/), and the [MCP page](/mcp/) explains which server to use when.

## Using agents across the Capacitor lifecycle

Name the skill in your prompt. It makes the agent load the right procedure instead of improvising.

### 1. Turn a web app into a Capacitor app

```text
Use the webapp-to-capacitor skill to add Capacitor 8 with iOS and Android
to this Vite + React app. Keep the existing build output folder.
```

The agent installs `@capacitor/core` and the CLI, sets `webDir`, adds the platforms, and runs a first sync. For existing Cordova projects, use `cordova-to-capacitor`. For Next.js, Nuxt, or similar, use `framework-to-capacitor`, which handles static export settings.

### 2. Add native features with the right plugin

```text
Use the capacitor-plugins skill to add biometric login.
Pick a plugin that supports Capacitor 8, configure iOS and Android,
and show me the usage code.
```

The skill knows the official `@capacitor/*` packages and the [Capgo plugin directory](/plugins/), so the agent picks a maintained plugin and adds the `Info.plist` usage strings, Android permissions, and sync step. Review the diff like any pull request.

### 3. Debug with real logs

```text
Use the ios-android-logs skill to capture Logcat while I reproduce the crash
on the connected Android device, then use debugging-capacitor to find the cause.
```

The logs skill gives the agent the exact `adb` and Xcode commands to stream and filter device logs, so it reads the real stack trace instead of guessing from source.

### 4. Upgrade Capacitor and migrate to SPM

```text
Use the capacitor-app-upgrade-v7-to-v8 skill to upgrade this app.
Stop and show me the plan before changing native files.
```

Then, if your iOS project still uses CocoaPods:

```text
Use the cocoapods-to-spm skill to move the iOS project to Swift Package Manager.
```

Asking for a plan first is a good habit for any change that touches `ios/` or `android/`. For the manual version of the same work, see our [Capacitor 8 upgrade guide](/blog/upgrade-capacitor-app-to-capacitor-8/) and the [SPM migration guide](/blog/how-to-migrate-your-capacitor-app-to-spm/).

### 5. Check security and store readiness

```text
Use the capacitor-security skill to scan this project and fix high severity issues.
Then run the capacitor-apple-review-preflight skill before I submit.
```

The preflight checks common rejection causes: missing usage strings, privacy manifest gaps, Sign in with Apple requirements, and metadata issues.

### 6. Build iOS and Android in the cloud

Save signing credentials once yourself, not through the agent:

```bash
bunx @capgo/cli@latest build credentials save --platform ios \
  --certificate ./cert.p12 --p12-password "..." \
  --ios-provisioning-profile ./profile.mobileprovision \
  --apple-key ./AuthKey.p8 --apple-key-id "KEY_ID" \
  --apple-issuer-id "ISSUER_ID" --apple-team-id "TEAM_ID"
```

Credentials are stored locally in `~/.capgo-credentials/credentials.json` (or `.capgo-credentials.json` with `--local`, which you should git-ignore), sent for the build, and deleted from Capgo after the build completes. Then the agent can work on its own:

```text
Use the capgo-native-builds skill to request an iOS release build from the
current working directory, then read the logs and fix any build error.
```

That maps to:

```bash
bunx @capgo/cli@latest build request com.example.app --platform ios --path .
```

Because `--path .` uploads the working tree, the agent can iterate on an iOS build error from Windows or Linux without committing speculative fixes. More on [Capgo Build](/native-build/). If you need certificates first, the [iOS certificate generator](/tools/ios-certificate-generator/) helps.

### 7. Ship a hotfix as a live update

```text
Use the capgo-live-updates skill to build the web app and upload it to the
beta channel. Check native compatibility first.
```

The agent runs the build, then:

```bash
bunx @capgo/cli@latest bundle upload --channel=beta
```

The compatibility check compares native dependencies with what is installed on devices, so the agent does not push a bundle that needs a native plugin the store build lacks. Promote to production after testing on beta. See [how Capgo live updates work](/live-update/).

## Guardrails that keep agent work safe

- **Plan before native changes.** Ask for a plan and a diff for anything under `ios/` and `android/`.
- **Keep secrets out of the conversation.** Save build credentials and API keys yourself, git-ignore credential files, and never paste keys into prompts.
- **Use channels as a safety net.** Let the agent upload to a beta or internal channel. Promote to production yourself.
- **Rely on rollback.** Capgo rolls a device back to the last working bundle if a new one fails to start, which limits the damage of a bad upload.
- **Prefer reviewable commands.** The CLI commands above are easy to read in the agent's log. If you are unsure what an MCP tool did, ask the agent to show the equivalent CLI command.
- **Keep humans on store submissions.** Agents can prepare builds and metadata. Submitting for review and answering reviewers should stay with a person.

## Troubleshooting

**The agent ignores the skill.** Name it explicitly in the prompt, and check it was installed for that agent (rerun `bunx skills add Cap-go/capgo-skills`).

**MCP tools are missing.** For the CLI server, confirm `bunx @capgo/cli@latest login` succeeded in the same environment the agent runs in. Restart the agent after adding a server.

**The agent suggests outdated Capacitor APIs.** Tell it your Capacitor version, and point it at the public MCP so it checks current docs.

**Cloud build fails on signing.** Credentials are missing or the provisioning profile does not match the bundle ID. Re-save credentials and rerun the build request.

**Upload rejected as incompatible.** The bundle needs native changes. Ship a store build first, then the live update.

## Wrap-up

AI agents become useful for Capacitor once they stop guessing. Install the Capacitor skills so they follow correct procedures, connect the public Capgo MCP for docs and the CLI MCP for account actions, and keep a few guardrails around native changes, secrets, and production channels. For more on building AI features into the app itself, read [why Capacitor works well for AI mobile apps](/blog/capacitor-ai-mobile-apps/).
