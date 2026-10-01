---
slug: gemini-nano-capacitor-app
title: "How to Use Gemini Nano in a Capacitor App"
description: "Use Gemini Nano in a Capacitor app for on-device AI on Android: device support, AICore checks, streaming with @capgo/capacitor-llm, and a Gemma fallback."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /blog-images/capacitor-ai-mobile-apps.webp
head_image_alt: "Illustration of AI features running inside a Capacitor mobile app"
keywords: Gemini Nano Capacitor, Gemini Nano Android, on-device AI Capacitor, ML Kit GenAI Prompt API, AICore, Capacitor LLM plugin, Gemma 4 LiteRT-LM, Ionic on-device AI
tag: Tutorial, Android, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does Gemini Nano work offline in a Capacitor app?"
    answer: "Yes, once the model is on the device. Inference runs locally through Android AICore, so prompts and responses are processed on the device and do not need a network connection."
  - question: "Which phones support Gemini Nano?"
    answer: "Google publishes the list per ML Kit GenAI API. For the Prompt API it includes Pixel 9 and later and recent flagships from Samsung, OnePlus, OPPO, Xiaomi, vivo, Honor, realme and others. Devices need Android API 26 or higher and a locked bootloader."
  - question: "Do I need to download Gemini Nano myself?"
    answer: "No. AICore manages one shared copy of the model for all apps. @capgo/capacitor-llm uses it when the status is available and returns a clear error otherwise, so you can fall back to a downloadable Gemma model."
  - question: "Can Gemini Nano run in the background?"
    answer: "No. Google only allows ML Kit GenAI inference while your app is the top foreground app, and enforces per-app quotas. Run generation from visible screens."
  - question: "Is the Capgo LLM plugin free?"
    answer: "Yes. @capgo/capacitor-llm is open source on npm and GitHub, with no license key. It also supports Apple Intelligence on iOS and Gemma models on Android and web."
---

To use Gemini Nano in a Capacitor app, install `@capgo/capacitor-llm`, call `setModel({ path: 'Gemini Nano' })` on Android, then create a chat and stream the reply through the `textFromAi` event. The plugin talks to Gemini Nano through Google's ML Kit GenAI Prompt API, which runs the model inside Android's AICore system service, so text never leaves the phone.

This guide covers how Gemini Nano runs, which devices support it, the exact plugin calls, streaming, quotas and limits, a Gemma fallback for unsupported phones, and how the same code reaches Apple Intelligence on iOS.

## How Gemini Nano runs on Android

Gemini Nano is Google's smallest Gemini model, built for phones. Apps do not bundle it. Android's **AICore** service downloads it, updates it, and runs inference, and apps reach it through the **ML Kit GenAI APIs**:

- **Prompt API:** free-form text prompts, the API this plugin uses (`com.google.mlkit:genai-prompt`).
- **Feature APIs:** fixed tasks such as summarization, proofreading, rewriting, and image description.

Google ships the Prompt API as a beta, without an SLA or deprecation policy, so expect behavior changes between releases and keep the integration behind your own small wrapper.

Because inference is local, you get three things a cloud model cannot give you: it works offline, it has no per-token cost, and user text stays on the device. The trade-off is a smaller model with a short context and output, so pick tasks that fit: rewriting, summarizing a note, classifying a message, extracting fields, drafting short replies.

## Supported devices and requirements

Google publishes the supported list per API on the ML Kit GenAI site, grouped by Gemini Nano version (nano-v2, nano-v3, nano-v4). For the Prompt API it covers the Pixel 9 and later, recent Samsung Galaxy S and Z flagships, and recent flagships from OnePlus, OPPO, Xiaomi, vivo, Honor, realme, Motorola, and others. Check the live list before you promise a feature to a specific device.

Every supported device also needs:

| Requirement | Detail |
| --- | --- |
| Android version | API level 26 or higher (the plugin checks this) |
| Bootloader | Locked. Google does not support the GenAI APIs on unlocked bootloaders |
| AICore | Present and set up. Right after a device setup or reset it can take a while to finish |
| App state | Your app must be the top foreground app during inference |

Different Nano versions can return different output for the same prompt. Test your prompts on at least one device per version you care about.

## Install the plugin

```bash
bun add @capgo/capacitor-llm
bunx cap sync
```

The plugin follows Capacitor's major version: use 8.x with Capacitor 8. No Android manifest changes are needed for Gemini Nano. Full reference: [plugin docs](/docs/plugins/llm/) and [plugin page](/plugins/capacitor-llm/).

## Step 1: Load Gemini Nano and check readiness

`setModel` with the special path `'Gemini Nano'` asks ML Kit for the model status. It resolves when the status is available and rejects otherwise, with a message that includes the status:

| Status from AICore | Plugin behavior |
| --- | --- |
| available | `setModel` resolves, `readinessChange` emits `ready` |
| downloadable | Rejects: "Gemini Nano is downloadable but not downloaded on this device" |
| downloading | Rejects with the downloading status |
| unavailable | Rejects: "Gemini Nano is unavailable on this device" |

```typescript
import { Capacitor } from '@capacitor/core';
import { CapgoLLM } from '@capgo/capacitor-llm';

export async function loadGeminiNano(): Promise<boolean> {
  if (Capacitor.getPlatform() !== 'android') return false;

  try {
    await CapgoLLM.setModel({
      path: 'Gemini Nano',
      temperature: 0.3,
      topk: 16,
    });
  } catch (error) {
    console.warn('Gemini Nano not ready:', error);
    return false;
  }

  const { readiness } = await CapgoLLM.getReadiness();
  return readiness === 'ready';
}
```

The plugin does not start the AICore model download itself. If a device reports downloadable, the model usually arrives after another app or the system requests it, so check again on a later launch rather than hiding the feature permanently.

## Step 2: Create a chat and stream the answer

A chat keeps the conversation history. On Android, `sendMessage` resolves as soon as generation starts, and text arrives through events. Wrap it in a promise that resolves on `aiFinished`:

```typescript
import { CapgoLLM } from '@capgo/capacitor-llm';

// Android sends deltas. iOS Apple Intelligence sends the full text so far.
// This merge handles both.
function mergeChunk(current: string, chunk: string) {
  return chunk.startsWith(current) ? chunk : current + chunk;
}

export async function ask(
  chatId: string,
  message: string,
  onText: (textSoFar: string) => void,
): Promise<string> {
  let text = '';
  let finish!: (value: string) => void;
  let fail!: (error: Error) => void;
  const done = new Promise<string>((resolve, reject) => {
    finish = resolve;
    fail = reject;
  });

  const handles = await Promise.all([
    CapgoLLM.addListener('textFromAi', (event) => {
      if (event.chatId !== chatId) return;
      text = mergeChunk(text, event.text);
      onText(text);
    }),
    CapgoLLM.addListener('aiFinished', (event) => {
      if (event.chatId === chatId) finish(text);
    }),
    CapgoLLM.addListener('generationError', (event) => {
      if (!event.chatId || event.chatId === chatId) fail(new Error(event.error));
    }),
  ]);

  // If the app is backgrounded mid-answer, neither event may arrive
  const timeout = setTimeout(() => fail(new Error('Generation timed out')), 60_000);

  try {
    await CapgoLLM.sendMessage({ chatId, message });
    return await done;
  } finally {
    clearTimeout(timeout);
    await Promise.all(handles.map((h) => h.remove()));
  }
}
```

Use it for a real feature, for example drafting a reply to a customer review:

```typescript
const INSTRUCTIONS =
  'You write short, polite replies to customer reviews for a small shop. ' +
  'Answer each point, stay under 60 words, never promise refunds.';

export async function draftReply(review: string, render: (t: string) => void) {
  const { id } = await CapgoLLM.createChat();
  return ask(id, `${INSTRUCTIONS}\n\nReview:\n${review}\n\nReply:`, render);
}
```

`createChat()` takes no options, so put instructions at the start of the first message. Create a new chat per task. On the Gemini Nano path the plugin keeps the history in memory and sends it with every message, so long chats use up the input budget quickly.

## Limits to design for

| Limit | Value | What to do |
| --- | --- | --- |
| Input | Under about 4,000 tokens per request (Google) | Keep chats short, trim long documents |
| Output | The plugin caps Gemini Nano responses at 256 tokens | Ask for short outputs, split long tasks |
| Foreground | Inference only while your app is on top | Never run it from background tasks |
| Quota | Per-app quotas, `BUSY` and battery quota errors | Debounce, avoid generating on every keystroke |
| Concurrency | One generation per chat | Disable the send button while streaming |
| Speed | Several seconds for a paragraph | Always stream to the UI |

Treat a quota error as temporary. Show a retry option rather than an error dialog.

## Fallback: Gemma 4 when Gemini Nano is missing

Most Android phones in use today do not have Gemini Nano. The same plugin can run open Gemma models through LiteRT-LM, so you keep one API. The model is large, often over a gigabyte, so download it only after the user opts in, ideally on Wi-Fi.

```typescript
import { Preferences } from '@capacitor/preferences';
import { CapgoLLM } from '@capgo/capacitor-llm';

const GEMMA_URL =
  'https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm/resolve/main/gemma-4-E2B-it.litertlm?download=true';

export async function loadGemma(onProgress: (pct: number) => void) {
  const saved = await Preferences.get({ key: 'gemmaPath' });
  if (saved.value) {
    try {
      await CapgoLLM.setModel({ path: saved.value, modelType: 'litertlm', maxTokens: 4096 });
      return;
    } catch {
      // File missing or corrupt, download again
    }
  }

  const sub = await CapgoLLM.addListener('downloadProgress', (e) => onProgress(e.progress));
  try {
    const { path } = await CapgoLLM.downloadModel({
      url: GEMMA_URL,
      filename: 'gemma-4-E2B-it.litertlm',
    });
    await Preferences.set({ key: 'gemmaPath', value: path });
    await CapgoLLM.setModel({ path, modelType: 'litertlm', maxTokens: 4096 });
  } finally {
    await sub.remove();
  }
}
```

Then pick the engine at startup:

```typescript
export async function initOnDeviceAI(userAcceptedDownload: boolean, onProgress: (p: number) => void) {
  if (await loadGeminiNano()) return 'gemini-nano';
  if (userAcceptedDownload) {
    await loadGemma(onProgress);
    return 'gemma';
  }
  return 'none';
}
```

If neither is possible, hide the feature or call a cloud model. Do not block core flows on local AI.

## The same code on iOS

On iOS the plugin uses Apple Intelligence through the Foundation Models framework. Change one line:

```typescript
await CapgoLLM.setModel({ path: 'Apple Intelligence' });
```

`createChat`, `sendMessage`, and the events stay the same, and the `mergeChunk` helper above already handles the iOS streaming format. Device requirements differ (iOS 26 and an Apple Intelligence capable device). Our guide on [Apple Intelligence in a Capacitor app](/blog/apple-intelligence-capacitor-app/) covers that side.

## Testing

- Use a real supported phone. Emulators do not provide AICore with Gemini Nano.
- Log the `setModel` rejection message. It tells you exactly which status AICore reports.
- On a freshly set up or reset device, wait for AICore to finish its initial setup while online, then retry.
- Test your prompts on the lowest Nano version you support. Shorter, explicit prompts are more stable across versions.

## Troubleshooting

**"Gemini Nano is unavailable on this device".** The device is not on Google's list, the bootloader is unlocked, or AICore is not set up yet.

**"Gemini Nano is downloadable but not downloaded".** The device supports it but the model is not present. Offer the Gemma fallback or retry later.

**"Chat session not found".** You called `sendMessage` with a chat created before a new `setModel`. Loading a model clears existing chats, so create a new one.

**"Model not ready".** `setModel` failed or was not called before `createChat`.

**Output stops mid-sentence.** You hit the output cap. Ask for a shorter answer or split the task.

**Errors when the app goes to the background.** Inference is foreground-only. Cancel UI state on pause and let the user retry.

## Privacy and store review

Prompts and responses stay on the device with Gemini Nano, which simplifies your Data safety form. Google's ML Kit terms still mention metrics processing, so describe on-device AI use in your privacy policy. If you add the Gemma fallback, the model download comes from Hugging Face, so mention that network request too.

Prompts and UI copy for AI features change often. If you need to tune them after release, [Capgo live updates](/live-update/) let you ship new web code without waiting on store review. For the bigger picture on AI in hybrid apps, read [why Capacitor works well for AI mobile apps](/blog/capacitor-ai-mobile-apps/).

## Wrap-up

Gemini Nano gives Capacitor apps free, private, offline text generation on supported Android phones. Load it with `setModel({ path: 'Gemini Nano' })`, stream through `textFromAi`, keep prompts and outputs short, respect the foreground and quota rules, and keep a Gemma or cloud fallback for the many devices that do not have it.
