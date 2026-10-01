---
slug: apple-intelligence-capacitor-app
title: "How to Use Apple Intelligence in a Capacitor App"
description: "Use Apple Intelligence in a Capacitor app via the Foundation Models framework on iOS 26: device checks, streaming, context limits, and errors."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /blog-images/capacitor-ai-mobile-apps.webp
head_image_alt: "Illustration of on-device AI features inside a Capacitor app on iPhone"
keywords: Apple Intelligence Capacitor, Foundation Models framework Capacitor, on-device AI iOS 26, Capacitor LLM plugin, Ionic Apple Intelligence, SystemLanguageModel, local LLM iPhone
tag: Tutorial, iOS, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does Apple Intelligence text generation work offline?"
    answer: "Yes. The Foundation Models framework runs Apple's on-device model, so generation works without a network connection once Apple Intelligence is enabled and its model is downloaded."
  - question: "Can I use the Foundation Models framework on iOS 18?"
    answer: "No. The framework requires iOS 26. Your Capacitor app can still support older iOS versions, because the plugin only calls Foundation Models when it is available and reports a readiness message otherwise."
  - question: "Which iPhones support Apple Intelligence for developers?"
    answer: "iPhone 15 Pro and 15 Pro Max, and iPhone 16 models and later, running iOS 26 with Apple Intelligence turned on. iPads with M1 or later and iPad mini with A17 Pro also qualify."
  - question: "Does using Apple Intelligence cost anything?"
    answer: "No. The on-device model is free to use, with no API key and no per-token billing. @capgo/capacitor-llm is open source as well."
  - question: "Does the same code work on Android?"
    answer: "Yes. With @capgo/capacitor-llm you switch the model path to 'Gemini Nano' on supported Android phones, or load a Gemma model, and keep the same chat and event code."
---

To use Apple Intelligence in a Capacitor app, install `@capgo/capacitor-llm`, call `setModel({ path: 'Apple Intelligence' })`, check `getReadiness()`, then create a chat and stream replies through the `textFromAi` event. Under the hood the plugin uses Apple's Foundation Models framework, introduced with iOS 26, which runs Apple's on-device language model with no API key, no cost per request, and no data leaving the phone.

This guide covers what the framework offers, device requirements, a complete TypeScript integration, the 4,096-token context window, error handling, App Review notes, and how the same code runs on Android.

## What Apple Intelligence offers app developers

With iOS 26, Apple opened its on-device foundation model to third-party apps through the **Foundation Models** framework. In Swift you work with `SystemLanguageModel` and `LanguageModelSession`. The plugin wraps those so your web code can use them:

| Foundation Models concept | Plugin equivalent |
| --- | --- |
| `SystemLanguageModel.default.availability` | `getReadiness()` |
| `LanguageModelSession` | `createChat()` returns an id |
| `session.streamResponse(to:)` | `sendMessage()` plus `textFromAi` events |
| Errors thrown during generation | `generationError` event and a rejected `sendMessage` |

The model is roughly 3 billion parameters. It is good at summarizing, rewriting, extracting, classifying, and short-form generation. It is not a replacement for a large cloud model on open-ended knowledge questions, and Apple says as much in its own guidance. Design features around text the user already has.

## Device and OS requirements

| Requirement | Detail |
| --- | --- |
| iPhone | iPhone 15 Pro, 15 Pro Max, and iPhone 16 models and later |
| iPad | iPad mini (A17 Pro), iPads with M1 and later |
| Mac | Apple silicon Macs (relevant for testing in the Simulator) |
| OS | iOS 26 / iPadOS 26 or later |
| Setting | Apple Intelligence turned on in Settings > Apple Intelligence & Siri |
| Language | Device and Siri language set to a language Apple Intelligence supports |
| Storage | Apple lists about 7 GB of free space for Apple Intelligence models |
| Toolchain | Xcode 26, which App Store Connect also requires for uploads since April 2026 |

If your project still builds with an older Xcode, see [Apple's Xcode 26 requirement for Capacitor apps](/blog/xcode-26-requirement-for-capacitor-apps/). Your app's minimum deployment target does not need to change. The plugin supports iOS 15 and later and only touches Foundation Models on iOS 26.

## Install the plugin

```bash
bun add @capgo/capacitor-llm
bunx cap sync ios
```

Use plugin 8.x with Capacitor 8. No Info.plist keys or entitlements are needed for Apple Intelligence. If you are still on Capacitor 7, the [Capacitor 8 upgrade guide](/blog/upgrade-capacitor-app-to-capacitor-8/) comes first. Reference docs: [/docs/plugins/llm/](/docs/plugins/llm/).

## Step 1: Select the model and check availability

`setModel({ path: 'Apple Intelligence' })` selects the system model and resolves right away. Actual availability comes from `getReadiness()`, which maps Apple's availability enum to readable strings:

| `readiness` value | Meaning | What to show |
| --- | --- | --- |
| `ready` | Model available | The feature |
| `Device is not eligible for Apple Intelligence` | Hardware not supported | Hide the feature or use a cloud fallback |
| `Apple Intelligence is not enabled` | User turned it off | A hint to enable it in Settings |
| `Model is not ready` | Model still downloading or preparing | "Preparing", retry later |
| `Apple Intelligence requires iOS 26.0 or later` | Older iOS | Hide the feature |

```typescript
import { Capacitor } from '@capacitor/core';
import { CapgoLLM } from '@capgo/capacitor-llm';

export type AIState = 'ready' | 'enable-in-settings' | 'preparing' | 'unsupported';

export async function initAppleIntelligence(): Promise<AIState> {
  if (Capacitor.getPlatform() !== 'ios') return 'unsupported';

  await CapgoLLM.setModel({ path: 'Apple Intelligence' });
  const { readiness } = await CapgoLLM.getReadiness();

  if (readiness === 'ready') return 'ready';
  if (readiness.includes('not enabled')) return 'enable-in-settings';
  if (readiness.includes('not ready')) return 'preparing';
  return 'unsupported';
}
```

Check again when the app returns to the foreground. Users often enable Apple Intelligence after seeing your hint, and the model download can finish while your app is in the background.

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', async ({ isActive }) => {
  if (isActive) updateAIState(await initAppleIntelligence());
});
```

## Step 2: Create a chat with instructions

A chat maps to one `LanguageModelSession`, which keeps the conversation history. The typed `createChat()` takes no options, so put your instructions at the start of the first message:

```typescript
const INSTRUCTIONS =
  'You summarize meeting notes. Reply with at most 5 bullet points. ' +
  'Keep names and dates exactly as written. Do not add information.';

const { id: chatId } = await CapgoLLM.createChat();
```

Use one chat per task. A chat that keeps growing will eventually hit the context limit described below.

## Step 3: Stream the response into the UI

On iOS, each `textFromAi` event carries a snapshot of the response so far, because that is how Foundation Models streams. On Android with Gemini Nano, events carry only the new text. This helper handles both and resolves with the final text:

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

function mergeChunk(current: string, chunk: string) {
  return chunk.startsWith(current) ? chunk : current + chunk;
}

export async function ask(chatId: string, message: string, onText: (t: string) => void) {
  let text = '';
  let finish!: (value: string) => void;
  let fail!: (error: Error) => void;
  const done = new Promise<string>((resolve, reject) => {
    finish = resolve;
    fail = reject;
  });

  const handles = await Promise.all([
    CapgoLLM.addListener('textFromAi', (e) => {
      if (e.chatId !== chatId) return;
      text = mergeChunk(text, e.text);
      onText(text);
    }),
    CapgoLLM.addListener('aiFinished', (e) => {
      if (e.chatId === chatId) finish(text);
    }),
    CapgoLLM.addListener('generationError', (e) => {
      if (!e.chatId || e.chatId === chatId) fail(new Error(e.error));
    }),
  ]);

  try {
    await CapgoLLM.sendMessage({ chatId, message });
    return await done;
  } finally {
    await Promise.all(handles.map((h) => h.remove()));
  }
}
```

## Putting it together: summarize notes on device

```typescript
export async function summarizeNotes(notes: string, render: (t: string) => void) {
  const state = await initAppleIntelligence();
  if (state !== 'ready') throw new Error(`AI unavailable: ${state}`);

  const { id } = await CapgoLLM.createChat();
  const prompt = `${INSTRUCTIONS}\n\nNotes:\n${notes.slice(0, 8000)}\n\nSummary:`;
  return ask(id, prompt, render);
}
```

The `slice` is a crude guard against huge inputs. A better approach is to summarize long documents in chunks and then summarize the summaries, each in a fresh chat.

In a framework component, disable the button while `ask` runs. The plugin rejects a second `sendMessage` on the same chat with "chat is responding, please wait before asking new questions".

## The 4,096-token context window

The on-device model has a context window of 4,096 tokens. Everything counts toward it: instructions, every previous turn in the chat, the new prompt, and the response being generated. When a session exceeds it, Foundation Models throws an "exceeded context window size" error, which reaches you as a `generationError` event and a rejected `sendMessage`.

Practical rules:

- One chat per task, not one chat per screen.
- Keep instructions short and specific.
- For multi-turn chat, start a new chat when it gets long and pass a short summary of the earlier conversation.
- Ask for concise output. Long answers use the same budget.

## Tuning output

On the Apple Intelligence path the plugin uses the system's default generation settings. `temperature`, `topk`, and `maxTokens` in `setModel` apply to the custom LiteRT-LM and MediaPipe model paths. To steer Apple's model, rely on the prompt: say how long the answer should be, give the format (bullets, JSON, one sentence), and include one short example when the format matters.

## The same code on Android

Only the model selection changes:

```typescript
const path = Capacitor.getPlatform() === 'ios' ? 'Apple Intelligence' : 'Gemini Nano';
await CapgoLLM.setModel({ path });
```

On Android, `setModel` rejects when Gemini Nano is not available, and you can fall back to a downloadable Gemma model through the same plugin. The details are in [how to use Gemini Nano in a Capacitor app](/blog/gemini-nano-capacitor-app/).

## Testing

- **Real device:** the reliable path. Use a supported iPhone on iOS 26 with Apple Intelligence on.
- **Simulator:** it can use the model when the host Mac runs macOS 26 on Apple silicon with Apple Intelligence enabled. Behavior and speed differ from a phone, so confirm on hardware.
- **Unsupported states:** test with Apple Intelligence turned off to check your "enable in Settings" UI, and on an older iPhone or iOS version to check that the feature hides cleanly.

## App Review and privacy

Prompts and responses stay on the device, so on-device generation adds no data collection to your privacy label by itself. Two things are still on you:

1. Apple publishes acceptable use requirements for the Foundation Models framework. Read them before you ship, especially for features that generate content shown to other users.
2. The model has built-in guardrails and may refuse some prompts or outputs. Treat a refusal as a normal result and show a clear message.

Since prompts are plain strings in your web code, you can improve them after launch with [Capgo live updates](/live-update/) instead of waiting for a new App Store build. Changes to native code, including plugin upgrades, still need a store release, which you can build in the cloud with [Capgo Build](/native-build/).

## Common errors and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `readiness` is "Device is not eligible" | iPhone older than 15 Pro or unsupported iPad | Hide the feature or use a server model |
| `readiness` is "not enabled" | User turned Apple Intelligence off | Show a Settings hint, recheck on resume |
| `readiness` is "Model is not ready" | Model still downloading | Show a preparing state, retry later |
| `sendMessage` rejects "error deviceNotEligible error" | Sending without checking readiness | Gate on `getReadiness()` first |
| "chat not found" | Chat created before a new `setModel` call | Calling `setModel` clears chats, create a new one |
| "chat is responding" | Second message sent during streaming | Disable input until `aiFinished` |
| `generationError` mentioning context window | Chat too long | Start a new chat with a summary |
| Build error about Foundation Models | Xcode older than 26 | Update Xcode or build in the cloud |

## Wrap-up

Apple Intelligence brings a free, private, offline language model to every eligible iPhone on iOS 26, and a Capacitor app can use it with a few lines of TypeScript. Select the model, gate the UI on `getReadiness()`, keep each task in its own short chat, stream snapshots into the UI, and handle refusals and context errors as normal outcomes. For a broader take on shipping AI features in hybrid apps, read [why Capacitor works well for AI mobile apps](/blog/capacitor-ai-mobile-apps/).
