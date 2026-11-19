---
locale: en
curated: true
published: true
seoTitle: 'Tailwind Capacitor v4: shadcn registry for Capacitor UI'
seoDescription: 'Install Tailwind CSS v4 Capacitor UI components with npx shadcn add. Own the source, keep safe-area and platform utilities, no tailwind.config.js.'
keywords: 'tailwind capacitor, tailwind v4, shadcn registry, capacitor ui, capacitor safe area, konsta, vue capacitor components'
summary: 'Install Tailwind Capacitor as a shadcn registry. Copy Vue components and Tailwind v4 safe-area utilities into your project so you own the source.'
platforms:
  - name: Web
    status: supported
  - name: iOS
    status: supported
  - name: Android
    status: supported
faq:
  - question: Is tailwind-capacitor an npm Capacitor plugin?
    answer: The v4 registry ships source you add with shadcn. Legacy v1 npm Tailwind plugins still exist for Tailwind v3, but this page tracks the GitHub registry.
  - question: Which framework does the live demo use?
    answer: The Capgo demo page runs the Vue registry in an isolated shell. Install commands on the demo and docs cover Vue, React, and Angular.
---

# Tailwind Capacitor (shadcn registry)

[Tailwind Capacitor](https://github.com/Cap-go/tailwind-capacitor/) ships Tailwind CSS v4 utilities for Capacitor safe areas and platform variants, plus Vue, React, and Angular UI components, as a [shadcn registry](https://ui.shadcn.com/docs/registry). You copy source into your app with the shadcn CLI.

Install commands on Capgo track Cap-go/tailwind-capacitor [main](https://github.com/Cap-go/tailwind-capacitor/) at commit `9791d43d67279d7725d6a1f7865ff10deaf36ba5` (merge commit for [PR #130](https://github.com/Cap-go/tailwind-capacitor/pull/130)).

## Live component demo

Open the [interactive registry demo](/plugins/tailwind-capacitor/demo/) to preview every registry item with iOS or Material styling and light or dark mode.

Use the framework tabs on the [demo page](/plugins/tailwind-capacitor/demo/) or the [docs getting started](https://capgo.app/docs/plugins/tailwind-capacitor/getting-started/) for Vue (shadcn-vue), React (shadcn), and Angular (registry-add via the tailwind-capacitor package) install commands.

## Prerequisites

- Vue 3 app with Tailwind CSS v4 (`@tailwindcss/vite` or PostCSS)
- A project-level `components.json` from the [shadcn-vue CLI](https://ui.shadcn.com/docs/cli) (`npx shadcn-vue@latest init`)
- Path alias `@/*` pointing at your `src/` folder
- No `tailwind.config.js` required

## Install base styles

```bash
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-tailwind.json
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-provider.json
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-shared.json
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-icons.json
```

In your app global stylesheet, replace the `@import "tailwindcss"` line with the capacitor bundle import. Keep your other custom CSS. The bundle already includes Tailwind, so do not keep a separate Tailwind import:

```css
@import '@/capacitor/styles/tailwind-capacitor.css';
```

## Install components used in the example

`App`, `Page`, `Navbar`, and `Button` are separate registry items. Install each one:

```bash
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-app.json
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-page.json
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-navbar.json
npx shadcn-vue@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/9791d43d67279d7725d6a1f7865ff10deaf36ba5/public/r/capacitor-button.json
```

Components land under `src/capacitor/vue/components/`. The provider lands under `src/capacitor/vue/shared/`. Shared classes land under `src/capacitor/shared/`. Icons land under `src/capacitor/vue/components/icons/`.

## Vue usage

Import the files that `shadcn add` writes. The library example app generates `@/capacitor/index.js` as a convenience barrel. That file is not created when you install registry items into your own project.

Button has no `fill` prop. The default style is solid. Use the boolean `outline` or `clear` props for the other styles.

```vue
<script setup>
import TailwindCapacitorProvider from '@/capacitor/vue/shared/TailwindCapacitorProvider.vue'
import App from '@/capacitor/vue/components/App.vue'
import Page from '@/capacitor/vue/components/Page.vue'
import Navbar from '@/capacitor/vue/components/Navbar.vue'
import Button from '@/capacitor/vue/components/Button.vue'
</script>

<template>
  <TailwindCapacitorProvider>
    <App theme="ios" class="safe-areas">
      <Page>
        <Navbar title="Home" />
        <Button>Continue</Button>
      </Page>
    </App>
  </TailwindCapacitorProvider>
</template>
```

## Safe areas

- Put `safe-areas` on the root page shell.
- Use `pt-safe`, `pb-safe`, `pl-safe`, and `pr-safe` for insets. There is no `px-safe` utility.
- Platform variants: `ios:`, `android:`, `capacitor:`, `mobile:`.

## Registry hosting

Built JSON files live in `public/r/` (Vue), `public/r/react/`, and `public/r/angular/` on GitHub:

`https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/<commit>/public/r/<name>.json`

## More

- [Repository README](https://github.com/Cap-go/tailwind-capacitor/#readme)
- [Safe areas doc](https://github.com/Cap-go/tailwind-capacitor/blob/main/docs/safe-areas.md)
- [Platform variants doc](https://github.com/Cap-go/tailwind-capacitor/blob/main/docs/platform.md)