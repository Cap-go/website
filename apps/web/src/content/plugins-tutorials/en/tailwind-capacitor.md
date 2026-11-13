---
locale: en
curated: true
published: true
seoTitle: 'Tailwind Capacitor v4: shadcn registry for Capacitor UI'
seoDescription: 'Install Tailwind CSS v4 Capacitor UI components with npx shadcn add. Own the source, keep safe-area and platform utilities, no tailwind.config.js.'
keywords: 'tailwind capacitor, tailwind v4, shadcn registry, capacitor ui, capacitor safe area, konsta, vue capacitor components'
summary: 'Install Tailwind Capacitor as a shadcn registry. Copy Vue components and Tailwind v4 safe-area utilities into your project so you own the source.'
---
# Tailwind Capacitor (shadcn registry)

[Tailwind Capacitor](https://github.com/Cap-go/tailwind-capacitor/) ships Tailwind CSS v4 utilities for Capacitor safe areas and platform variants, plus Vue UI components, as a [shadcn registry](https://ui.shadcn.com/docs/registry). You copy source into your app with `shadcn add`.

This page documents the v4 shadcn registry rebuild in [Cap-go/tailwind-capacitor#129](https://github.com/Cap-go/tailwind-capacitor/pull/129). Registry URLs under `main` resolve after that PR is merged. This docs PR is meant to land with or after #129.

## Prerequisites

- Tailwind CSS v4 (`@tailwindcss/vite` or PostCSS)
- Vue 3 project with `components.json` (shadcn CLI)
- No `tailwind.config.js` required

## Install base styles

```bash
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-tailwind.json
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-provider.json
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-shared.json
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-icons.json
```

Import the bundle in your global CSS:

```css
@import '@/capacitor/styles/tailwind-capacitor.css';
```

## Install components used in the example

`App`, `Page`, `Navbar`, and `Button` are separate registry items. Install each one:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-app.json
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-page.json
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-navbar.json
npx shadcn@latest add https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/capacitor-button.json
```

Components land under `src/capacitor/vue/components/`. The provider lands under `src/capacitor/vue/shared/`. Shared classes land under `src/capacitor/shared/`.

## Vue usage

Import the files that `shadcn add` writes. The library example app generates `@/capacitor/index.js` as a convenience barrel. That file is not created when you install registry items into your own project.

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
        <Navbar title="Home" class="pt-safe" />
        <Button fill="solid">Continue</Button>
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

Built JSON files live in `public/r/` on GitHub. After `npm run build:registry`, serve them from raw GitHub or commit them to your site:

`https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/<name>.json`

## More

- [Repository README](https://github.com/Cap-go/tailwind-capacitor/#readme)
- [Safe areas doc](https://github.com/Cap-go/tailwind-capacitor/blob/main/docs/safe-areas.md)
- [Platform variants doc](https://github.com/Cap-go/tailwind-capacitor/blob/main/docs/platform.md)
