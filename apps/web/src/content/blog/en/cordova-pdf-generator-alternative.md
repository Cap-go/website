---
slug: cordova-pdf-generator-alternative
title: "cordova-pdf-generator Alternative for Capacitor"
description: "cordova-pdf-generator alternative for Capacitor: render HTML or URLs to PDF with @capgo/capacitor-pdf-generator, base64 or share output, and promise APIs."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-15T10:00:00.000Z
updated_at: 2026-11-15T10:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an HTML to PDF plugin guide"
keywords: cordova-pdf-generator alternative, capacitor pdf generator, html to pdf capacitor, @capgo/capacitor-pdf-generator, PDFService cordova
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-pdf-generator alternative in Capacitor?"
    answer: "@capgo/capacitor-pdf-generator exposes fromURL and fromData with the same documentSize, orientation, type, and fileName options as the Cordova pdf global, using Capacitor promises."
  - question: "Is cordova-pdf-generator still updated?"
    answer: "npm lists cordova-pdf-generator at version 2.1.1 with a registry modified date of 13 June 2022. Version 2.1.1 was published 16 April 2020."
  - question: "Can I return base64 PDF data?"
    answer: "Yes. Set type to base64 (the default) and read result.base64 from the promise on iOS and Android."
  - question: "Can I open the share sheet?"
    answer: "Yes. Set type to share and handle result.completed from the Capacitor plugin."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/pdf-generator/, npm @capgo/capacitor-pdf-generator, and GitHub Cap-go/capacitor-pdf-generator."
---

The practical **cordova-pdf-generator alternative** for a Capacitor app is [`@capgo/capacitor-pdf-generator`](/plugins/capacitor-pdf-generator/). It keeps the same two entry points as the Cordova `pdf` global (`fromURL` and `fromData`), the same A3 or A4 sizing and portrait or landscape rendering, and the same `base64` versus share style outputs, but swaps Cordova promises around `cordova.exec` for native Capacitor calls you can `await`. This guide lists verifiable npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-pdf-generator in Capacitor

**cordova-pdf-generator** on npm is version **2.1.1**. The registry `modified` timestamp is **13 June 2022**, and **2.1.1** was first published **16 April 2020**. The source lives at [cesarvr/pdf-generator](https://github.com/cesarvr/pdf-generator). The README documents Android and iOS support, HTML or URL sources, and base64 or system share output.

The Cordova JavaScript layer in `www/pdf.js` exposes:

- `pdf.fromURL(url, options)` returning a Promise
- `pdf.fromData(data, options)` returning a Promise
- legacy `pdf.htmlToPDF(options, success, error)` via `cordova.exec` on the `PDFService` channel

Default options include `documentSize: "A4"`, `landscape: "portrait"`, `type: "base64"`, and `fileName: "default.pdf"`. `fromData` accepts `baseUrl` for relative assets inside the HTML string.

In a Capacitor codebase the Cordova plugin still means:

- `cordova plugin add cordova-pdf-generator` and waiting for `deviceready`
- the global `pdf` namespace instead of a typed import
- no maintained npm release since 2020 even though the registry `modified` field moved in 2022

[`@capgo/capacitor-pdf-generator`](https://www.npmjs.com/package/@capgo/capacitor-pdf-generator) latest on npm is **8.0.53** with a `modified` date of **13 November 2026**. The Capacitor API in `src/definitions.ts` mirrors the Cordova options and adds a typed `PdfGeneratorResult` union for `base64` and `share` responses. Capgo maintains the plugin on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-pdf-generator
bunx cap sync
```

No extra iOS or Android setup is required beyond syncing native projects after install, as documented in [getting started](/docs/plugins/pdf-generator/getting-started/).

## Usage example

```ts
import { PdfGenerator } from '@capgo/capacitor-pdf-generator';

const html = `
  <html><body><h1>Invoice #1024</h1><p>Total: $42.00</p></body></html>
`;

export async function exportInvoiceBase64() {
  const result = await PdfGenerator.fromData({
    data: html,
    documentSize: 'A4',
    orientation: 'portrait',
    type: 'base64',
    fileName: 'invoice-1024.pdf',
  });

  if (result.type === 'base64') {
    await uploadPdf(result.base64);
  }
}
```

Generate from a hosted receipt template:

```ts
const result = await PdfGenerator.fromURL({
  url: 'https://example.com/receipts/1024.html',
  type: 'share',
  fileName: 'receipt-1024.pdf',
});
```

## Migrating from Cordova to Capacitor

Cordova code imports nothing and calls `pdf.fromData` after `deviceready`. Capacitor code imports `PdfGenerator` and passes a single options object.

```js
// Before (Cordova)
document.addEventListener('deviceready', () => {
  pdf
    .fromData('<html>...</html>', {
      documentSize: 'A4',
      landscape: 'portrait',
      type: 'base64',
      fileName: 'report.pdf',
      baseUrl: 'https://example.com/',
    })
  .then((base64) => upload(base64))
  .catch(console.error);
});
```

```ts
// After (Capacitor)
import { PdfGenerator } from '@capgo/capacitor-pdf-generator';

const result = await PdfGenerator.fromData({
  data: '<html>...</html>',
  documentSize: 'A4',
  orientation: 'portrait',
  type: 'base64',
  fileName: 'report.pdf',
  baseUrl: 'https://example.com/',
});

if (result.type === 'base64') {
  await upload(result.base64);
}
```

### API mapping table

| cordova-pdf-generator (`pdf`) | @capgo/capacitor-pdf-generator |
| --- | --- |
| `pdf.fromURL(url, options)` | `fromURL({ url, ...options })` |
| `pdf.fromData(data, options)` | `fromData({ data, ...options })` |
| `pdf.htmlToPDF(options, success, error)` | `fromURL` or `fromData` with the same fields in one object |
| `options.documentSize` (`A4` default) | `documentSize` (`A3` or `A4`) |
| `options.landscape` (`portrait` default) | `orientation` (`portrait` or `landscape`), `landscape` kept for compatibility |
| `options.type` (`base64` or share flow) | `type: 'base64' \| 'share'` |
| `options.fileName` | `fileName` |
| `options.baseUrl` on `fromData` | `baseUrl` on `fromData` |
| Promise resolves to base64 string | `result.type === 'base64'` with `result.base64` |
| Share sheet flow | `type: 'share'` with `result.completed` |

After you generate a base64 PDF, write it with [`@capgo/capacitor-file`](/plugins/capacitor-file/) or [`@capacitor/filesystem`](https://capacitorjs.com/docs/apis/filesystem) if the Cordova app previously kept everything in memory.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/pdf-generator/](/docs/plugins/pdf-generator/)
- Marketing page: [/plugins/capacitor-pdf-generator/](/plugins/capacitor-pdf-generator/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-pdf-generator](https://www.npmjs.com/package/@capgo/capacitor-pdf-generator)
- GitHub: [https://github.com/Cap-go/capacitor-pdf-generator/](https://github.com/Cap-go/capacitor-pdf-generator/)
- Cordova upstream: [https://github.com/cesarvr/pdf-generator](https://github.com/cesarvr/pdf-generator)

Native PDF rendering needs a store build when you first add the plugin. Use [Capgo Build](/native-build/) for binaries, then iterate on HTML templates with [Capgo live updates](/live-update/). For related file workflows see the [capacitor file handling guide](/blog/capacitor-file-handling-guide/) and the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).