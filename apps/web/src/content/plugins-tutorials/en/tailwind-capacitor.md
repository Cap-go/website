---
locale: en
published: true
curated: true
summary: Tailwind CSS v4 Capacitor UI components, safe area utilities, and a shadcn-compatible Vue registry you copy into your app.
keywords: tailwind capacitor, safe areas, shadcn vue, mobile ui components
platforms:
  - name: Web
    status: supported
  - name: iOS
    status: supported
  - name: Android
    status: supported
faq:
  - question: Is tailwind-capacitor an npm Capacitor plugin?
    answer: The v4 registry ships Vue source you add with shadcn. Legacy v1 npm Tailwind plugins still exist for Tailwind v3, but this demo tracks the GitHub registry on main.
  - question: Which framework does the live demo use?
    answer: The Capgo demo page runs the Vue registry in an isolated shell. Install commands on the demo and docs cover Vue, React, and Angular.
---

# Tailwind Capacitor

Tailwind Capacitor is a [shadcn](https://ui.shadcn.com/) registry of Vue components styled for Capacitor apps: safe areas, iOS and Material variants, and Tailwind CSS v4 utilities without Ionic UI lock-in.

## Live component demo

Open the [interactive registry demo](/plugins/tailwind-capacitor/demo/) to preview every registry item with iOS or Material styling and light or dark mode.

## Install

Use the framework tabs on the [demo page](/plugins/tailwind-capacitor/demo/) or the [docs getting started](https://capgo.app/docs/plugins/tailwind-capacitor/getting-started/) for Vue (shadcn-vue), React (`shadcn`), and Angular (spartan/ng) install commands.

Start with the core registry items (`capacitor-tailwind`, `capacitor-provider`, `capacitor-shared`, `capacitor-icons`), then add components such as `capacitor-button`.

## Styles

Replace your global stylesheet import with the capacitor bundle (it already includes Tailwind):

```css
@import '@/capacitor/styles/tailwind-capacitor.css';
```

Do not add a separate `@import "tailwindcss"` when using `tailwind-capacitor.css`.

## Wrap your app

```vue
<script setup>
import { TailwindCapacitorProvider, App, Page } from '@/capacitor'
</script>

<template>
  <App theme="ios">
    <Page class="safe-areas">
      <slot />
    </Page>
  </App>
</template>
```
