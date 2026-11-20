---
slug: cordova-plugin-printer-alternative
title: "cordova-plugin-printer Alternative for Capacitor"
description: "cordova-plugin-printer alternative for Capacitor: @capgo/capacitor-printer with printHtml, printFile, printPdf, printBase64, and printWebView instead of cordova-plugin-printer callbacks."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-20T10:00:00.000Z
updated_at: 2026-11-20T10:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a printer plugin guide"
keywords: cordova-plugin-printer alternative, capacitor printer, @capgo/capacitor-printer, cordova printer print migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-printer alternative in Capacitor?"
    answer: "@capgo/capacitor-printer splits HTML, files, PDFs, base64 payloads, and the current WebView into printHtml, printFile, printPdf, printBase64, and printWebView instead of one cordova print() call."
  - question: "Is cordova-plugin-printer still maintained?"
    answer: "npm lists cordova-plugin-printer at version 0.8.0 with a registry modified date of 14 June 2022. Source: katzer/cordova-plugin-printer on GitHub."
  - question: "How do I print HTML like cordova-plugin-printer?"
    answer: "Pass the HTML string to Printer.printHtml({ name, html }). Capgo renders it in a WebView before opening the system print UI."
  - question: "How do I print a file URI from Cordova?"
    answer: "Use Printer.printFile({ path, mimeType, name }) with file:// or content:// paths per platform notes in definitions.ts."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/printer/, npm @capgo/capacitor-printer, and GitHub Cap-go/capacitor-printer."
---

The practical **cordova-plugin-printer alternative** for a Capacitor app is [`@capgo/capacitor-printer`](/plugins/capacitor-printer/). Cordova sends one `cordova.plugins.printer.print` call with either HTML text or a file URI and a large options object. Capgo exposes explicit print methods for HTML, on-disk files, PDFs, base64 data, and the live WebView. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-printer in Capacitor

**cordova-plugin-printer** on npm is version **0.8.0**. The registry `modified` timestamp is **14 June 2022**. The npm repository URL points to [katzer/cordova-plugin-printer](https://github.com/katzer/cordova-plugin-printer).

`www/printer.js` documents `cordova.plugins.printer` with:

- `print(content, options, callback, scope)` where `content` is plain or HTML text, or null with options only
- `pick(options, callback)` to choose a printer on iOS
- `canPrintItem(uri, callback)` and `getPrintableTypes(callback)`
- deep `options` for duplex, paper, margins, headers, and footers merged from `_defaults`

In Capacitor you still depend on Cordova exec strings, callback wiring, and a single entry point that mixes HTML strings with filesystem URIs.

[`@capgo/capacitor-printer`](https://www.npmjs.com/package/@capgo/capacitor-printer) latest on npm is **8.1.11** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `printHtml`, `printFile`, `printPdf`, `printBase64`, `printWebView`, and `printIframe`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-printer
bunx cap sync
```

Use `@capacitor/filesystem` when you save PDFs locally before calling `printFile` or `printPdf`.

## Usage example

```ts
import { Printer } from '@capgo/capacitor-printer';

export async function printReceipt(html: string) {
  await Printer.printHtml({
    name: 'Receipt',
    html: `<!DOCTYPE html><html><body>${html}</body></html>`,
  });
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
cordova.plugins.printer.print('<h1>Invoice</h1>', { name: 'Invoice' }, onDone);
```

```ts
// After (Capacitor)
import { Printer } from '@capgo/capacitor-printer';

await Printer.printHtml({
  name: 'Invoice',
  html: '<!DOCTYPE html><html><body><h1>Invoice</h1></body></html>',
});
```

```js
// Before (Cordova)
cordova.plugins.printer.print('file:///path/to/report.pdf', { name: 'Report' }, onDone);
```

```ts
// After (Capacitor)
await Printer.printPdf({
  name: 'Report',
  path: 'file:///path/to/report.pdf',
});
```

### API mapping table

| cordova-plugin-printer (`cordova.plugins.printer`) | @capgo/capacitor-printer |
| --- | --- |
| `print(htmlString, options)` | `printHtml({ html, name: options.name })` |
| `print(fileUri, options)` | `printFile({ path: fileUri, mimeType, name })` or `printPdf({ path, name })` for PDF |
| Base64 or binary content in options | `printBase64({ data, mimeType, name })` |
| Print current WebView or page | `printWebView({ name })` |
| Large HTML in iframe | `printIframe({ selector, name })` |
| `pick(options, callback)` (iOS) | Use system print dialog from any print method; no separate picker API |
| `canPrintItem(uri, callback)` | Validate path with `printFile` / `printPdf` and handle errors |
| `getPrintableTypes(callback)` | MIME types listed in `PrintBase64Options` and `PrintFileOptions` docs |
| `options.name` job name | `name` on every print method (`PrintOptions`) |
| Cordova duplex, paper, margin objects | Use CSS `@media print` in `printHtml` HTML; Capgo does not mirror every Cordova layout option |
| Not in Cordova | `getPluginVersion()` |
| Cordova plugin install | `bun add @capgo/capacitor-printer` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/printer/](/docs/plugins/printer/)
- Marketing page: [/plugins/capacitor-printer/](/plugins/capacitor-printer/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-printer](https://www.npmjs.com/package/@capgo/capacitor-printer)
- GitHub: [https://github.com/Cap-go/capacitor-printer/](https://github.com/Cap-go/capacitor-printer/)
- Cordova upstream: [https://github.com/katzer/cordova-plugin-printer](https://github.com/katzer/cordova-plugin-printer)

Generate PDFs in the native shell with [Capgo Build](/native-build/), then ship receipt template tweaks with [Capgo live updates](/live-update/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).