---
title: AI Build Diagnosis
description: When a native build fails, Capgo's AI reads the build log and tells you the likely cause, the evidence, and how to fix it.
sidebar:
  order: 8
  label: AI Debug
---

Native build logs are long. When an iOS (Xcode / Fastlane) or Android (Gradle / Fastlane) build fails, Capgo can run the log through an AI build engineer that pinpoints **what went wrong and how to fix it** — so you don't have to scroll thousands of lines yourself.

## Enable it

Add `--ai-analytics` to your build:

```bash
bunx @capgo/cli@latest build request com.example.app --platform android --ai-analytics
```

The diagnosis only kicks in when a build **fails** — successful builds are untouched.

## When it runs

What happens on a failed build depends on where you run it and whether you passed the flag:

| Environment | `--ai-analytics` | Behavior |
|-------------|:----------------:|----------|
| Interactive terminal | yes | Diagnoses the failure immediately |
| Interactive terminal | no | Asks first, then offers the diagnosis |
| CI / non-interactive | yes | Runs automatically and prints the diagnosis to stderr |
| CI / non-interactive | no | Skipped — nothing is sent |

So in CI you must opt in with `--ai-analytics`; in a terminal you're always asked first unless the flag pre-opts you in.

## What you get

A short, focused markdown report:

- **Likely cause** — one sentence.
- **Evidence** — the 1–3 most relevant lines quoted from your log.
- **Suggested fix** — numbered steps to change in *your* project (signing config, a missing capability, a Gradle or CocoaPods issue, a plugin conflict, …).

If the logs are ambiguous it says so and lists the top hypotheses, rather than inventing an error that isn't there.

## Your logs, your choice

AI diagnosis is **opt-in** — nothing is sent unless you pass `--ai-analytics` or confirm the prompt.

- **Capgo AI (default):** your build log is trimmed and sent to Capgo's analysis endpoint (which runs on Cloudflare Workers AI) just long enough to produce the diagnosis. Build logs aren't part of normal storage — they stream to your terminal during the build.
- **Keep logs on your machine:** in an interactive terminal you can instead have the CLI **write a local prompt file** — the same diagnosis instructions plus your log — that you paste into your own LLM. Your logs never leave your machine.

:::note
The analysis treats your build log as untrusted data, so a log line that looks like an instruction (a prompt-injection attempt) can't hijack the diagnosis.
:::
