---
title: "@capgo/capacitor-sheets"
description: Framework-agnostic sheets, drawers, dialogs, scroll helpers, and overlay primitives for Capacitor apps.
tableOfContents: false
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: Build Silk-style sheets, drawers, dialogs, toasts, lightboxes, cards, and page overlays in any Capacitor frontend.
  actions:
    - text: Get started
      link: /docs/plugins/sheets/getting-started/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/Cap-go/capacitor-sheets/
      icon: external
      variant: minimal
---

import { Card, CardGrid, Aside } from '@astrojs/starlight/components';

<CardGrid stagger>
  <Card title="Framework agnostic" icon="puzzle">
    Use standards-based custom elements directly or use setup helpers for React, Vue, Angular, Svelte, and Solid.
  </Card>
  <Card title="Capacitor ready" icon="rocket">
    Respect safe areas, keyboard movement, native edge gestures, and WebView theme-color dimming from the web layer.
  </Card>
  <Card title="Every sheet shape" icon="pencil">
    Compose bottom sheets, side drawers, top sheets, centered dialogs, toasts, detached sheets, cards, pages, and lightboxes.
  </Card>
  <Card title="Modern CSS" icon="setting">
    Author detents with `em`, `rem`, viewport units, `calc()`, and CSS variables while the default sizing stays `em` based.
  </Card>
</CardGrid>

## When To Use It

`@capgo/capacitor-sheets` is for Capacitor apps that need high-quality mobile overlays without adopting a specific UI framework. It ships as custom elements, so the core package has no React, Vue, Angular, Svelte, or Solid runtime dependency.

Use it when you need:

- bottom sheets with one or more detents
- left or right sidebars and top sheets
- centered dialogs, lightboxes, cards, and toast-like overlays
- persistent sheets that keep the app behind them interactive
- full-page overlays that enter from an edge
- stack, depth, and parallax effects driven by sheet progress
- scroll helpers that expose progress and distance values
- Capacitor-safe layout for notches, home indicators, Android cutouts, and software keyboards

<Aside type="note">
  This package is inspired by the public Silk-style overlay feature surface, but it is not a Silk wrapper and does not include Silk source code.
</Aside>

## Usecase Coverage

| Usecase | Capgo Sheets pattern |
| --- | --- |
| Long Sheet | `cap-sheet` with natural content scroll or `cap-scroll` |
| Sheet with Detent | `detents="18em 32em"` plus `stepTo()` or a step trigger |
| Sidebar | `content-placement="left"` or `content-placement="right"` |
| Bottom Sheet | default `content-placement="bottom"` |
| Sheet with Keyboard | `native-focus-scroll-prevention` and visual viewport offset handling |
| Toast | `inert-outside="false"`, `focus-trap="false"`, and no outside-click dismissal |
| Detached Sheet | `cap-sheet-special-wrapper` plus custom margins and radius |
| Page from Bottom | full-height bottom sheet content |
| Top Sheet | `content-placement="top"` |
| Sheet with Stacking | `cap-sheet-stack` with depth variables |
| Sheet with Depth | `cap-sheet-outlet` and progress-driven transforms |
| Parallax Page | `cap-sheet-outlet` with `cap-scroll` progress |
| Page | full-viewport content entering from an edge |
| Lightbox | `content-placement="center"` with backdrop and media content |
| Persistent Sheet with Detent | `default-presented`, `swipe-dismissal="false"`, and `inert-outside="false"` |
| Card | compact centered sheet content |

## Core API

- `<cap-sheet>` owns presentation state, detents, placement, gestures, accessibility, and events.
- `<cap-sheet-trigger>` declares present, dismiss, toggle, and detent-step actions.
- `<cap-sheet-view>` positions the overlay and applies safe-area and keyboard offsets.
- `<cap-sheet-backdrop>` renders a progress-synced backdrop.
- `<cap-sheet-content>` renders the sheet surface.
- `<cap-sheet-handle>` provides drag and keyboard detent controls.
- `<cap-sheet-stack>` coordinates stacked sheets.
- `<cap-sheet-outlet>` exposes sheet progress to page, depth, and parallax effects.
- `<cap-scroll>` and `<cap-scroll-content>` expose scroll progress and distance helpers.
- `setupSheet(element, options?)` configures a sheet from framework effects or lifecycle hooks.

## Capacitor Layout Model

The default sheet viewport reads `env(safe-area-inset-*)` and Capacitor-style `--safe-area-inset-*` fallback variables, then applies the selected edges as padding around the overlay. `safe-area="auto"` protects all edges; use `safe-area="bottom left right"` or `safe-area="none"` when a usecase needs different behavior.

Keyboard handling is enabled by default. The sheet listens to `visualViewport` resize and scroll events, adds a keyboard offset to the viewport, and focuses controls with `preventScroll` so inputs stay visible above the software keyboard.

The package runs in the web layer. It does not render native UIKit or Android bottom sheets, so your app keeps full styling control while still respecting the WebView constraints that matter in Capacitor.

## Demos And Playgrounds

Animated WebP demos for every supported usecase ship in the repository README. The examples are also available as StackBlitz playgrounds:

| Long Sheet | Detents |
| --- | --- |
| <img src="/plugins/demo/capacitor-sheets/long-sheet.webp" alt="Animated Long Sheet demo for @capgo/capacitor-sheets" width="280" /> | <img src="/plugins/demo/capacitor-sheets/sheet-with-detent.webp" alt="Animated Sheet with Detent demo for @capgo/capacitor-sheets" width="280" /> |

| Sidebar | Lightbox |
| --- | --- |
| <img src="/plugins/demo/capacitor-sheets/sidebar.webp" alt="Animated Sidebar demo for @capgo/capacitor-sheets" width="280" /> | <img src="/plugins/demo/capacitor-sheets/lightbox.webp" alt="Animated Lightbox demo for @capgo/capacitor-sheets" width="280" /> |

- [Full demo grid](/plugins/capacitor-sheets/)
- [React playground](https://stackblitz.com/github/Cap-go/capacitor-sheets?file=examples/react-app/src/main.tsx&startScript=stackblitz-react)
- [Vue playground](https://stackblitz.com/github/Cap-go/capacitor-sheets?file=examples/vue-app/src/App.vue&startScript=stackblitz-vue)
- [Angular playground](https://stackblitz.com/github/Cap-go/capacitor-sheets?file=examples/angular-app/src/app/app.component.ts&startScript=stackblitz-angular)
- [Svelte playground](https://stackblitz.com/github/Cap-go/capacitor-sheets?file=examples/svelte-app/src/App.svelte&startScript=stackblitz-svelte)
- [Solid playground](https://stackblitz.com/github/Cap-go/capacitor-sheets?file=examples/solid-app/src/main.tsx&startScript=stackblitz-solid)

## Keep going from @capgo/capacitor-sheets

If you are using **@capgo/capacitor-sheets** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
