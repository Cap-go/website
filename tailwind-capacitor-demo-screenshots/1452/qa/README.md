# Tailwind Capacitor demo QA shots

Base URL: http://127.0.0.1:4321

Pass: 5144, Fail: 40

Each component lists every state with phone-frame and (on mobile) full 390px viewport page shots.

## Failures

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-actions: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open actions</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-300"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="flex flex-col items-center justify-center p-4 space-y-1 relative hairline-b">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-dialog: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open dialog</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="w-full text-[18px] font-semibold text-center">Dialog</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-panel: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open panel</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="h-full w-full left-0 top-0 overflow-auto absolute bg-ios-light-surface">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-popup: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open popup</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="left-1/2 top-1/2 transition-transform transform -translate-x-1/2 z-40 max-w-full max-h-full overflow-hidden md:no-safe-areas bg-white fixed w-screen h-screen md:w-160 md:h-160 duration-400 md:rounded-lg -translate-y-1/2">…</div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <nav class="hidden items-center gap-0.5 md:flex lg:gap-1">…</nav> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- interaction failed on capacitor-sheet: click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-tc-demo-state="screen"] button.tc-demo-overlay-trigger').first()
    - locator resolved to <button type="button" class="tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">Open sheet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="fixed z-40 w-full h-full left-0 top-0 bg-black/50 duration-400"></div> from <article class="tc-demo-state-block mb-6 last:mb-2">…</article> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="relative flex items-center justify-between gap-3 md:justify-center">…</div> from <header class="sticky top-0 z-50 py-3">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms


## foundation

### packages (Packages)

#### desktop ios-light (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-ios-light-packages.png)

#### desktop ios-dark (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-ios-dark-packages.png)

#### desktop material-light (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-material-light-packages.png)

#### desktop material-dark (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-material-dark-packages.png)

#### mobile ios-light (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-ios-light-packages.png)

#### mobile ios-light (page)

![foundation packages page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-ios-light-packages.png)

#### mobile ios-dark (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-ios-dark-packages.png)

#### mobile ios-dark (page)

![foundation packages page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-ios-dark-packages.png)

#### mobile material-light (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-material-light-packages.png)

#### mobile material-light (page)

![foundation packages page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-material-light-packages.png)

#### mobile material-dark (frame)

![foundation packages frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-material-dark-packages.png)

#### mobile material-dark (page)

![foundation packages page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-material-dark-packages.png)

### icons (Icons)

#### desktop ios-light (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-ios-light-icons.png)

#### desktop ios-dark (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-ios-dark-icons.png)

#### desktop material-light (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-material-light-icons.png)

#### desktop material-dark (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/desktop-frame-material-dark-icons.png)

#### mobile ios-light (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-ios-light-icons.png)

#### mobile ios-light (page)

![foundation icons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-ios-light-icons.png)

#### mobile ios-dark (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-ios-dark-icons.png)

#### mobile ios-dark (page)

![foundation icons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-ios-dark-icons.png)

#### mobile material-light (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-material-light-icons.png)

#### mobile material-light (page)

![foundation icons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-material-light-icons.png)

#### mobile material-dark (frame)

![foundation icons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-frame-material-dark-icons.png)

#### mobile material-dark (page)

![foundation icons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/foundation/mobile-page-material-dark-icons.png)

## capacitor-accordion

### default (Default)

#### desktop ios-light (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-accordion default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-accordion default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-accordion default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-accordion default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-accordion default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-accordion alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-accordion alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-accordion alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-accordion alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-accordion alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion/mobile-page-material-dark-alternate.png)

## capacitor-accordion-item

### default (Default)

#### desktop ios-light (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-accordion-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-accordion-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-accordion-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-accordion-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-accordion-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-accordion-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-accordion-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-accordion-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-accordion-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-accordion-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-accordion-item/mobile-page-material-dark-alternate.png)

## capacitor-actions

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-actions screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-actions screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-actions screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-actions screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-actions screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-material-dark-screen.png)

### sheet-open (Sheet open)

#### desktop ios-light (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-ios-light-sheet-open.png)

#### desktop ios-dark (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-ios-dark-sheet-open.png)

#### desktop material-light (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-material-light-sheet-open.png)

#### desktop material-dark (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/desktop-frame-material-dark-sheet-open.png)

#### mobile ios-light (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-ios-light-sheet-open.png)

#### mobile ios-light (page)

![capacitor-actions sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-ios-light-sheet-open.png)

#### mobile ios-dark (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-ios-dark-sheet-open.png)

#### mobile ios-dark (page)

![capacitor-actions sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-ios-dark-sheet-open.png)

#### mobile material-light (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-material-light-sheet-open.png)

#### mobile material-light (page)

![capacitor-actions sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-material-light-sheet-open.png)

#### mobile material-dark (frame)

![capacitor-actions sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-frame-material-dark-sheet-open.png)

#### mobile material-dark (page)

![capacitor-actions sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions/mobile-page-material-dark-sheet-open.png)

## capacitor-actions-button

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-actions-button screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-actions-button screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-actions-button screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-actions-button screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-actions-button screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-material-dark-screen.png)

### sheet-open (Sheet open)

#### desktop ios-light (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-ios-light-sheet-open.png)

#### desktop ios-dark (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-ios-dark-sheet-open.png)

#### desktop material-light (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-material-light-sheet-open.png)

#### desktop material-dark (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-material-dark-sheet-open.png)

#### mobile ios-light (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-ios-light-sheet-open.png)

#### mobile ios-light (page)

![capacitor-actions-button sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-ios-light-sheet-open.png)

#### mobile ios-dark (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-ios-dark-sheet-open.png)

#### mobile ios-dark (page)

![capacitor-actions-button sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-ios-dark-sheet-open.png)

#### mobile material-light (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-material-light-sheet-open.png)

#### mobile material-light (page)

![capacitor-actions-button sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-material-light-sheet-open.png)

#### mobile material-dark (frame)

![capacitor-actions-button sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-material-dark-sheet-open.png)

#### mobile material-dark (page)

![capacitor-actions-button sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-material-dark-sheet-open.png)

### primary-row (Primary row)

#### desktop ios-light (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-ios-light-primary-row.png)

#### desktop ios-dark (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-ios-dark-primary-row.png)

#### desktop material-light (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-material-light-primary-row.png)

#### desktop material-dark (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/desktop-frame-material-dark-primary-row.png)

#### mobile ios-light (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-ios-light-primary-row.png)

#### mobile ios-light (page)

![capacitor-actions-button primary-row page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-ios-light-primary-row.png)

#### mobile ios-dark (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-ios-dark-primary-row.png)

#### mobile ios-dark (page)

![capacitor-actions-button primary-row page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-ios-dark-primary-row.png)

#### mobile material-light (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-material-light-primary-row.png)

#### mobile material-light (page)

![capacitor-actions-button primary-row page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-material-light-primary-row.png)

#### mobile material-dark (frame)

![capacitor-actions-button primary-row frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-frame-material-dark-primary-row.png)

#### mobile material-dark (page)

![capacitor-actions-button primary-row page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-button/mobile-page-material-dark-primary-row.png)

## capacitor-actions-group

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-actions-group screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-actions-group screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-actions-group screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-actions-group screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-actions-group screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-material-dark-screen.png)

### sheet-open (Sheet open)

#### desktop ios-light (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-ios-light-sheet-open.png)

#### desktop ios-dark (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-ios-dark-sheet-open.png)

#### desktop material-light (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-material-light-sheet-open.png)

#### desktop material-dark (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-material-dark-sheet-open.png)

#### mobile ios-light (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-ios-light-sheet-open.png)

#### mobile ios-light (page)

![capacitor-actions-group sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-ios-light-sheet-open.png)

#### mobile ios-dark (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-ios-dark-sheet-open.png)

#### mobile ios-dark (page)

![capacitor-actions-group sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-ios-dark-sheet-open.png)

#### mobile material-light (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-material-light-sheet-open.png)

#### mobile material-light (page)

![capacitor-actions-group sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-material-light-sheet-open.png)

#### mobile material-dark (frame)

![capacitor-actions-group sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-material-dark-sheet-open.png)

#### mobile material-dark (page)

![capacitor-actions-group sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-material-dark-sheet-open.png)

### single-group (Single group)

#### desktop ios-light (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-ios-light-single-group.png)

#### desktop ios-dark (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-ios-dark-single-group.png)

#### desktop material-light (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-material-light-single-group.png)

#### desktop material-dark (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/desktop-frame-material-dark-single-group.png)

#### mobile ios-light (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-ios-light-single-group.png)

#### mobile ios-light (page)

![capacitor-actions-group single-group page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-ios-light-single-group.png)

#### mobile ios-dark (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-ios-dark-single-group.png)

#### mobile ios-dark (page)

![capacitor-actions-group single-group page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-ios-dark-single-group.png)

#### mobile material-light (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-material-light-single-group.png)

#### mobile material-light (page)

![capacitor-actions-group single-group page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-material-light-single-group.png)

#### mobile material-dark (frame)

![capacitor-actions-group single-group frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-frame-material-dark-single-group.png)

#### mobile material-dark (page)

![capacitor-actions-group single-group page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-group/mobile-page-material-dark-single-group.png)

## capacitor-actions-label

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-actions-label screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-actions-label screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-actions-label screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-actions-label screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-actions-label screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-material-dark-screen.png)

### sheet-open (Sheet open)

#### desktop ios-light (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-ios-light-sheet-open.png)

#### desktop ios-dark (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-ios-dark-sheet-open.png)

#### desktop material-light (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-material-light-sheet-open.png)

#### desktop material-dark (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-material-dark-sheet-open.png)

#### mobile ios-light (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-ios-light-sheet-open.png)

#### mobile ios-light (page)

![capacitor-actions-label sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-ios-light-sheet-open.png)

#### mobile ios-dark (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-ios-dark-sheet-open.png)

#### mobile ios-dark (page)

![capacitor-actions-label sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-ios-dark-sheet-open.png)

#### mobile material-light (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-material-light-sheet-open.png)

#### mobile material-light (page)

![capacitor-actions-label sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-material-light-sheet-open.png)

#### mobile material-dark (frame)

![capacitor-actions-label sheet-open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-material-dark-sheet-open.png)

#### mobile material-dark (page)

![capacitor-actions-label sheet-open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-material-dark-sheet-open.png)

### section-label (Section label)

#### desktop ios-light (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-ios-light-section-label.png)

#### desktop ios-dark (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-ios-dark-section-label.png)

#### desktop material-light (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-material-light-section-label.png)

#### desktop material-dark (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/desktop-frame-material-dark-section-label.png)

#### mobile ios-light (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-ios-light-section-label.png)

#### mobile ios-light (page)

![capacitor-actions-label section-label page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-ios-light-section-label.png)

#### mobile ios-dark (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-ios-dark-section-label.png)

#### mobile ios-dark (page)

![capacitor-actions-label section-label page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-ios-dark-section-label.png)

#### mobile material-light (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-material-light-section-label.png)

#### mobile material-light (page)

![capacitor-actions-label section-label page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-material-light-section-label.png)

#### mobile material-dark (frame)

![capacitor-actions-label section-label frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-frame-material-dark-section-label.png)

#### mobile material-dark (page)

![capacitor-actions-label section-label page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-actions-label/mobile-page-material-dark-section-label.png)

## capacitor-alert

### default (Default)

#### desktop ios-light (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-alert default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-alert default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-alert default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-alert default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-alert default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-alert alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-alert alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-alert alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-alert alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-alert alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-alert/mobile-page-material-dark-alternate.png)

## capacitor-app

### default (Default)

#### desktop ios-light (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-app default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-app default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-app default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-app default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-app default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-app alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-app alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-app alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-app alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-app alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-app/mobile-page-material-dark-alternate.png)

## capacitor-avatar

### default (Default)

#### desktop ios-light (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-avatar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-avatar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-avatar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-avatar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-avatar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-avatar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-avatar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-avatar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-avatar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-avatar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-avatar/mobile-page-material-dark-alternate.png)

## capacitor-badge

### default (Default)

#### desktop ios-light (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-badge default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-badge default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-badge default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-badge default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-badge default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-material-dark-default.png)

### color (Color)

#### desktop ios-light (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-ios-light-color.png)

#### desktop ios-dark (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-ios-dark-color.png)

#### desktop material-light (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-material-light-color.png)

#### desktop material-dark (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-material-dark-color.png)

#### mobile ios-light (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-ios-light-color.png)

#### mobile ios-light (page)

![capacitor-badge color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-ios-light-color.png)

#### mobile ios-dark (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-ios-dark-color.png)

#### mobile ios-dark (page)

![capacitor-badge color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-ios-dark-color.png)

#### mobile material-light (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-material-light-color.png)

#### mobile material-light (page)

![capacitor-badge color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-material-light-color.png)

#### mobile material-dark (frame)

![capacitor-badge color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-material-dark-color.png)

#### mobile material-dark (page)

![capacitor-badge color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-material-dark-color.png)

### on-avatar (On avatar)

#### desktop ios-light (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-ios-light-on-avatar.png)

#### desktop ios-dark (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-ios-dark-on-avatar.png)

#### desktop material-light (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-material-light-on-avatar.png)

#### desktop material-dark (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/desktop-frame-material-dark-on-avatar.png)

#### mobile ios-light (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-ios-light-on-avatar.png)

#### mobile ios-light (page)

![capacitor-badge on-avatar page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-ios-light-on-avatar.png)

#### mobile ios-dark (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-ios-dark-on-avatar.png)

#### mobile ios-dark (page)

![capacitor-badge on-avatar page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-ios-dark-on-avatar.png)

#### mobile material-light (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-material-light-on-avatar.png)

#### mobile material-light (page)

![capacitor-badge on-avatar page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-material-light-on-avatar.png)

#### mobile material-dark (frame)

![capacitor-badge on-avatar frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-frame-material-dark-on-avatar.png)

#### mobile material-dark (page)

![capacitor-badge on-avatar page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-badge/mobile-page-material-dark-on-avatar.png)

## capacitor-block

### default (Default)

#### desktop ios-light (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-block default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-block default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-block default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-block default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-block default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-block alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-block alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-block alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-block alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-block alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block/mobile-page-material-dark-alternate.png)

## capacitor-block-footer

### default (Default)

#### desktop ios-light (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-block-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-block-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-block-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-block-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-block-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-block-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-block-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-block-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-block-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-block-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-footer/mobile-page-material-dark-alternate.png)

## capacitor-block-header

### default (Default)

#### desktop ios-light (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-block-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-block-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-block-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-block-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-block-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-block-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-block-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-block-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-block-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-block-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-header/mobile-page-material-dark-alternate.png)

## capacitor-block-title

### default (Default)

#### desktop ios-light (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-block-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-block-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-block-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-block-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-block-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-block-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-block-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-block-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-block-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-block-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-block-title/mobile-page-material-dark-alternate.png)

## capacitor-breadcrumbs

### default (Default)

#### desktop ios-light (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-breadcrumbs default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-breadcrumbs alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs/mobile-page-material-dark-alternate.png)

## capacitor-breadcrumbs-collapsed

### default (Default)

#### desktop ios-light (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs-collapsed default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs-collapsed default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-breadcrumbs-collapsed default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs-collapsed default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs-collapsed default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs-collapsed alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs-collapsed alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-breadcrumbs-collapsed alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs-collapsed alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs-collapsed alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-collapsed/mobile-page-material-dark-alternate.png)

## capacitor-breadcrumbs-item

### default (Default)

#### desktop ios-light (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-breadcrumbs-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-breadcrumbs-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-item/mobile-page-material-dark-alternate.png)

## capacitor-breadcrumbs-separator

### default (Default)

#### desktop ios-light (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs-separator default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs-separator default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-breadcrumbs-separator default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs-separator default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs-separator default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-breadcrumbs-separator alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-breadcrumbs-separator alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-breadcrumbs-separator alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-breadcrumbs-separator alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-breadcrumbs-separator alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-breadcrumbs-separator/mobile-page-material-dark-alternate.png)

## capacitor-button

### solid (Solid)

#### desktop ios-light (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-solid.png)

#### desktop ios-dark (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-solid.png)

#### desktop material-light (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-solid.png)

#### desktop material-dark (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-solid.png)

#### mobile ios-light (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-solid.png)

#### mobile ios-light (page)

![capacitor-button solid page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-solid.png)

#### mobile ios-dark (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-solid.png)

#### mobile ios-dark (page)

![capacitor-button solid page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-solid.png)

#### mobile material-light (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-solid.png)

#### mobile material-light (page)

![capacitor-button solid page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-solid.png)

#### mobile material-dark (frame)

![capacitor-button solid frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-solid.png)

#### mobile material-dark (page)

![capacitor-button solid page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-solid.png)

### outline (Outline)

#### desktop ios-light (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-outline.png)

#### desktop ios-dark (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-outline.png)

#### desktop material-light (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-outline.png)

#### desktop material-dark (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-outline.png)

#### mobile ios-light (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-outline.png)

#### mobile ios-light (page)

![capacitor-button outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-outline.png)

#### mobile ios-dark (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-outline.png)

#### mobile ios-dark (page)

![capacitor-button outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-outline.png)

#### mobile material-light (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-outline.png)

#### mobile material-light (page)

![capacitor-button outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-outline.png)

#### mobile material-dark (frame)

![capacitor-button outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-outline.png)

#### mobile material-dark (page)

![capacitor-button outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-outline.png)

### clear (Clear)

#### desktop ios-light (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-clear.png)

#### desktop ios-dark (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-clear.png)

#### desktop material-light (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-clear.png)

#### desktop material-dark (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-clear.png)

#### mobile ios-light (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-clear.png)

#### mobile ios-light (page)

![capacitor-button clear page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-clear.png)

#### mobile ios-dark (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-clear.png)

#### mobile ios-dark (page)

![capacitor-button clear page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-clear.png)

#### mobile material-light (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-clear.png)

#### mobile material-light (page)

![capacitor-button clear page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-clear.png)

#### mobile material-dark (frame)

![capacitor-button clear frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-clear.png)

#### mobile material-dark (page)

![capacitor-button clear page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-clear.png)

### tonal (Tonal)

#### desktop ios-light (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-tonal.png)

#### desktop ios-dark (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-tonal.png)

#### desktop material-light (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-tonal.png)

#### desktop material-dark (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-tonal.png)

#### mobile ios-light (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-tonal.png)

#### mobile ios-light (page)

![capacitor-button tonal page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-tonal.png)

#### mobile ios-dark (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-tonal.png)

#### mobile ios-dark (page)

![capacitor-button tonal page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-tonal.png)

#### mobile material-light (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-tonal.png)

#### mobile material-light (page)

![capacitor-button tonal page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-tonal.png)

#### mobile material-dark (frame)

![capacitor-button tonal frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-tonal.png)

#### mobile material-dark (page)

![capacitor-button tonal page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-tonal.png)

### small (Small)

#### desktop ios-light (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-small.png)

#### desktop ios-dark (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-small.png)

#### desktop material-light (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-small.png)

#### desktop material-dark (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-small.png)

#### mobile ios-light (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-small.png)

#### mobile ios-light (page)

![capacitor-button small page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-small.png)

#### mobile ios-dark (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-small.png)

#### mobile ios-dark (page)

![capacitor-button small page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-small.png)

#### mobile material-light (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-small.png)

#### mobile material-light (page)

![capacitor-button small page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-small.png)

#### mobile material-dark (frame)

![capacitor-button small frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-small.png)

#### mobile material-dark (page)

![capacitor-button small page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-small.png)

### large (Large)

#### desktop ios-light (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-large.png)

#### desktop ios-dark (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-large.png)

#### desktop material-light (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-large.png)

#### desktop material-dark (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-large.png)

#### mobile ios-light (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-large.png)

#### mobile ios-light (page)

![capacitor-button large page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-large.png)

#### mobile ios-dark (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-large.png)

#### mobile ios-dark (page)

![capacitor-button large page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-large.png)

#### mobile material-light (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-large.png)

#### mobile material-light (page)

![capacitor-button large page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-large.png)

#### mobile material-dark (frame)

![capacitor-button large frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-large.png)

#### mobile material-dark (page)

![capacitor-button large page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-large.png)

### raised (Raised)

#### desktop ios-light (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-raised.png)

#### desktop ios-dark (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-raised.png)

#### desktop material-light (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-raised.png)

#### desktop material-dark (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-raised.png)

#### mobile ios-light (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-raised.png)

#### mobile ios-light (page)

![capacitor-button raised page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-raised.png)

#### mobile ios-dark (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-raised.png)

#### mobile ios-dark (page)

![capacitor-button raised page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-raised.png)

#### mobile material-light (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-raised.png)

#### mobile material-light (page)

![capacitor-button raised page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-raised.png)

#### mobile material-dark (frame)

![capacitor-button raised frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-raised.png)

#### mobile material-dark (page)

![capacitor-button raised page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-raised.png)

### disabled (Disabled)

#### desktop ios-light (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-disabled.png)

#### desktop ios-dark (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-disabled.png)

#### desktop material-light (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-disabled.png)

#### desktop material-dark (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-disabled.png)

#### mobile ios-light (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-disabled.png)

#### mobile ios-light (page)

![capacitor-button disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-disabled.png)

#### mobile ios-dark (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-disabled.png)

#### mobile ios-dark (page)

![capacitor-button disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-disabled.png)

#### mobile material-light (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-disabled.png)

#### mobile material-light (page)

![capacitor-button disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-disabled.png)

#### mobile material-dark (frame)

![capacitor-button disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-disabled.png)

#### mobile material-dark (page)

![capacitor-button disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-disabled.png)

### with-icon (With icon)

#### desktop ios-light (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-with-icon.png)

#### desktop ios-dark (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-with-icon.png)

#### desktop material-light (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-with-icon.png)

#### desktop material-dark (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-with-icon.png)

#### mobile ios-light (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-with-icon.png)

#### mobile ios-light (page)

![capacitor-button with-icon page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-with-icon.png)

#### mobile ios-dark (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-with-icon.png)

#### mobile ios-dark (page)

![capacitor-button with-icon page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-with-icon.png)

#### mobile material-light (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-with-icon.png)

#### mobile material-light (page)

![capacitor-button with-icon page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-with-icon.png)

#### mobile material-dark (frame)

![capacitor-button with-icon frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-with-icon.png)

#### mobile material-dark (page)

![capacitor-button with-icon page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-with-icon.png)

### block (Block)

#### desktop ios-light (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-block.png)

#### desktop ios-dark (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-block.png)

#### desktop material-light (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-block.png)

#### desktop material-dark (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-block.png)

#### mobile ios-light (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-block.png)

#### mobile ios-light (page)

![capacitor-button block page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-block.png)

#### mobile ios-dark (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-block.png)

#### mobile ios-dark (page)

![capacitor-button block page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-block.png)

#### mobile material-light (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-block.png)

#### mobile material-light (page)

![capacitor-button block page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-block.png)

#### mobile material-dark (frame)

![capacitor-button block frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-block.png)

#### mobile material-dark (page)

![capacitor-button block page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-block.png)

### fill-color (Fill color)

#### desktop ios-light (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-fill-color.png)

#### desktop ios-dark (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-fill-color.png)

#### desktop material-light (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-fill-color.png)

#### desktop material-dark (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-fill-color.png)

#### mobile ios-light (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-fill-color.png)

#### mobile ios-light (page)

![capacitor-button fill-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-fill-color.png)

#### mobile ios-dark (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-fill-color.png)

#### mobile ios-dark (page)

![capacitor-button fill-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-fill-color.png)

#### mobile material-light (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-fill-color.png)

#### mobile material-light (page)

![capacitor-button fill-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-fill-color.png)

#### mobile material-dark (frame)

![capacitor-button fill-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-fill-color.png)

#### mobile material-dark (page)

![capacitor-button fill-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-fill-color.png)

### outline-color (Outline color)

#### desktop ios-light (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-light-outline-color.png)

#### desktop ios-dark (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-ios-dark-outline-color.png)

#### desktop material-light (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-light-outline-color.png)

#### desktop material-dark (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/desktop-frame-material-dark-outline-color.png)

#### mobile ios-light (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-light-outline-color.png)

#### mobile ios-light (page)

![capacitor-button outline-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-light-outline-color.png)

#### mobile ios-dark (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-ios-dark-outline-color.png)

#### mobile ios-dark (page)

![capacitor-button outline-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-ios-dark-outline-color.png)

#### mobile material-light (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-light-outline-color.png)

#### mobile material-light (page)

![capacitor-button outline-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-light-outline-color.png)

#### mobile material-dark (frame)

![capacitor-button outline-color frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-frame-material-dark-outline-color.png)

#### mobile material-dark (page)

![capacitor-button outline-color page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-button/mobile-page-material-dark-outline-color.png)

## capacitor-card

### feed (Feed card)

#### desktop ios-light (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-ios-light-feed.png)

#### desktop ios-dark (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-ios-dark-feed.png)

#### desktop material-light (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-material-light-feed.png)

#### desktop material-dark (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-material-dark-feed.png)

#### mobile ios-light (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-ios-light-feed.png)

#### mobile ios-light (page)

![capacitor-card feed page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-ios-light-feed.png)

#### mobile ios-dark (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-ios-dark-feed.png)

#### mobile ios-dark (page)

![capacitor-card feed page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-ios-dark-feed.png)

#### mobile material-light (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-material-light-feed.png)

#### mobile material-light (page)

![capacitor-card feed page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-material-light-feed.png)

#### mobile material-dark (frame)

![capacitor-card feed frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-material-dark-feed.png)

#### mobile material-dark (page)

![capacitor-card feed page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-material-dark-feed.png)

### media (Media card)

#### desktop ios-light (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-ios-light-media.png)

#### desktop ios-dark (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-ios-dark-media.png)

#### desktop material-light (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-material-light-media.png)

#### desktop material-dark (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-material-dark-media.png)

#### mobile ios-light (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-ios-light-media.png)

#### mobile ios-light (page)

![capacitor-card media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-ios-light-media.png)

#### mobile ios-dark (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-ios-dark-media.png)

#### mobile ios-dark (page)

![capacitor-card media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-ios-dark-media.png)

#### mobile material-light (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-material-light-media.png)

#### mobile material-light (page)

![capacitor-card media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-material-light-media.png)

#### mobile material-dark (frame)

![capacitor-card media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-material-dark-media.png)

#### mobile material-dark (page)

![capacitor-card media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-material-dark-media.png)

### outline (Outline card)

#### desktop ios-light (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-ios-light-outline.png)

#### desktop ios-dark (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-ios-dark-outline.png)

#### desktop material-light (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-material-light-outline.png)

#### desktop material-dark (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/desktop-frame-material-dark-outline.png)

#### mobile ios-light (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-ios-light-outline.png)

#### mobile ios-light (page)

![capacitor-card outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-ios-light-outline.png)

#### mobile ios-dark (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-ios-dark-outline.png)

#### mobile ios-dark (page)

![capacitor-card outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-ios-dark-outline.png)

#### mobile material-light (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-material-light-outline.png)

#### mobile material-light (page)

![capacitor-card outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-material-light-outline.png)

#### mobile material-dark (frame)

![capacitor-card outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-frame-material-dark-outline.png)

#### mobile material-dark (page)

![capacitor-card outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-card/mobile-page-material-dark-outline.png)

## capacitor-checkbox

### off (Off)

#### desktop ios-light (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-ios-light-off.png)

#### desktop ios-dark (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-ios-dark-off.png)

#### desktop material-light (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-material-light-off.png)

#### desktop material-dark (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-material-dark-off.png)

#### mobile ios-light (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-ios-light-off.png)

#### mobile ios-light (page)

![capacitor-checkbox off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-ios-light-off.png)

#### mobile ios-dark (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-ios-dark-off.png)

#### mobile ios-dark (page)

![capacitor-checkbox off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-ios-dark-off.png)

#### mobile material-light (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-material-light-off.png)

#### mobile material-light (page)

![capacitor-checkbox off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-material-light-off.png)

#### mobile material-dark (frame)

![capacitor-checkbox off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-material-dark-off.png)

#### mobile material-dark (page)

![capacitor-checkbox off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-material-dark-off.png)

### on (On)

#### desktop ios-light (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-ios-light-on.png)

#### desktop ios-dark (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-ios-dark-on.png)

#### desktop material-light (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-material-light-on.png)

#### desktop material-dark (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-material-dark-on.png)

#### mobile ios-light (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-ios-light-on.png)

#### mobile ios-light (page)

![capacitor-checkbox on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-ios-light-on.png)

#### mobile ios-dark (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-ios-dark-on.png)

#### mobile ios-dark (page)

![capacitor-checkbox on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-ios-dark-on.png)

#### mobile material-light (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-material-light-on.png)

#### mobile material-light (page)

![capacitor-checkbox on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-material-light-on.png)

#### mobile material-dark (frame)

![capacitor-checkbox on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-material-dark-on.png)

#### mobile material-dark (page)

![capacitor-checkbox on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-material-dark-on.png)

### disabled (Disabled)

#### desktop ios-light (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-ios-light-disabled.png)

#### desktop ios-dark (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-ios-dark-disabled.png)

#### desktop material-light (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-material-light-disabled.png)

#### desktop material-dark (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/desktop-frame-material-dark-disabled.png)

#### mobile ios-light (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-ios-light-disabled.png)

#### mobile ios-light (page)

![capacitor-checkbox disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-ios-light-disabled.png)

#### mobile ios-dark (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-ios-dark-disabled.png)

#### mobile ios-dark (page)

![capacitor-checkbox disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-ios-dark-disabled.png)

#### mobile material-light (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-material-light-disabled.png)

#### mobile material-light (page)

![capacitor-checkbox disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-material-light-disabled.png)

#### mobile material-dark (frame)

![capacitor-checkbox disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-frame-material-dark-disabled.png)

#### mobile material-dark (page)

![capacitor-checkbox disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-checkbox/mobile-page-material-dark-disabled.png)

## capacitor-chip

### filled (Filled)

#### desktop ios-light (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-ios-light-filled.png)

#### desktop ios-dark (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-ios-dark-filled.png)

#### desktop material-light (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-material-light-filled.png)

#### desktop material-dark (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-material-dark-filled.png)

#### mobile ios-light (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-ios-light-filled.png)

#### mobile ios-light (page)

![capacitor-chip filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-ios-light-filled.png)

#### mobile ios-dark (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-ios-dark-filled.png)

#### mobile ios-dark (page)

![capacitor-chip filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-ios-dark-filled.png)

#### mobile material-light (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-material-light-filled.png)

#### mobile material-light (page)

![capacitor-chip filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-material-light-filled.png)

#### mobile material-dark (frame)

![capacitor-chip filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-material-dark-filled.png)

#### mobile material-dark (page)

![capacitor-chip filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-material-dark-filled.png)

### removable (Removable)

#### desktop ios-light (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-ios-light-removable.png)

#### desktop ios-dark (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-ios-dark-removable.png)

#### desktop material-light (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-material-light-removable.png)

#### desktop material-dark (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-material-dark-removable.png)

#### mobile ios-light (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-ios-light-removable.png)

#### mobile ios-light (page)

![capacitor-chip removable page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-ios-light-removable.png)

#### mobile ios-dark (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-ios-dark-removable.png)

#### mobile ios-dark (page)

![capacitor-chip removable page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-ios-dark-removable.png)

#### mobile material-light (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-material-light-removable.png)

#### mobile material-light (page)

![capacitor-chip removable page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-material-light-removable.png)

#### mobile material-dark (frame)

![capacitor-chip removable frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-material-dark-removable.png)

#### mobile material-dark (page)

![capacitor-chip removable page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-material-dark-removable.png)

### outline (Outline)

#### desktop ios-light (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-ios-light-outline.png)

#### desktop ios-dark (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-ios-dark-outline.png)

#### desktop material-light (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-material-light-outline.png)

#### desktop material-dark (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/desktop-frame-material-dark-outline.png)

#### mobile ios-light (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-ios-light-outline.png)

#### mobile ios-light (page)

![capacitor-chip outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-ios-light-outline.png)

#### mobile ios-dark (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-ios-dark-outline.png)

#### mobile ios-dark (page)

![capacitor-chip outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-ios-dark-outline.png)

#### mobile material-light (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-material-light-outline.png)

#### mobile material-light (page)

![capacitor-chip outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-material-light-outline.png)

#### mobile material-dark (frame)

![capacitor-chip outline frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-frame-material-dark-outline.png)

#### mobile material-dark (page)

![capacitor-chip outline page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-chip/mobile-page-material-dark-outline.png)

## capacitor-datetime

### default (Default)

#### desktop ios-light (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-datetime default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-datetime default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-datetime default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-datetime default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-datetime default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-datetime alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-datetime alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-datetime alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-datetime alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-datetime alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-datetime/mobile-page-material-dark-alternate.png)

## capacitor-dialog

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-dialog screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-dialog screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-dialog screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-dialog screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-dialog screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-material-dark-screen.png)

### open (Open)

#### desktop ios-light (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-ios-light-open.png)

#### desktop ios-dark (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-ios-dark-open.png)

#### desktop material-light (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-material-light-open.png)

#### desktop material-dark (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/desktop-frame-material-dark-open.png)

#### mobile ios-light (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-ios-light-open.png)

#### mobile ios-light (page)

![capacitor-dialog open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-ios-light-open.png)

#### mobile ios-dark (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-ios-dark-open.png)

#### mobile ios-dark (page)

![capacitor-dialog open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-ios-dark-open.png)

#### mobile material-light (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-material-light-open.png)

#### mobile material-light (page)

![capacitor-dialog open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-material-light-open.png)

#### mobile material-dark (frame)

![capacitor-dialog open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-frame-material-dark-open.png)

#### mobile material-dark (page)

![capacitor-dialog open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog/mobile-page-material-dark-open.png)

## capacitor-dialog-button

### default (Default)

#### desktop ios-light (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-dialog-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-dialog-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-dialog-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-dialog-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-dialog-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-dialog-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-dialog-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-dialog-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-dialog-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-dialog-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-dialog-button/mobile-page-material-dark-alternate.png)

## capacitor-fab

### default (Default)

#### desktop ios-light (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-fab default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-fab default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-fab default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-fab default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-fab default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-fab alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-fab alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-fab alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-fab alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-fab alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-fab/mobile-page-material-dark-alternate.png)

## capacitor-footer

### default (Default)

#### desktop ios-light (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-footer default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-footer default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-footer alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-footer alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-footer/mobile-page-material-dark-alternate.png)

## capacitor-header

### default (Default)

#### desktop ios-light (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-header default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-header default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-header alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-header alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-header/mobile-page-material-dark-alternate.png)

## capacitor-icon

### default (Default)

#### desktop ios-light (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-icon default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-icon default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-icon default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-icon default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-icon default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-icon alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-icon alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-icon alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-icon alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-icon alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-icon/mobile-page-material-dark-alternate.png)

## capacitor-infinite-scroll

### default (Default)

#### desktop ios-light (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-infinite-scroll default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-infinite-scroll default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-infinite-scroll default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-infinite-scroll default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-infinite-scroll default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-infinite-scroll alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-infinite-scroll alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-infinite-scroll alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-infinite-scroll alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-infinite-scroll alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-infinite-scroll/mobile-page-material-dark-alternate.png)

## capacitor-input-otp

### empty (Empty)

#### desktop ios-light (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-ios-light-empty.png)

#### desktop ios-dark (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-ios-dark-empty.png)

#### desktop material-light (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-material-light-empty.png)

#### desktop material-dark (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-material-dark-empty.png)

#### mobile ios-light (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-ios-light-empty.png)

#### mobile ios-light (page)

![capacitor-input-otp empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-ios-light-empty.png)

#### mobile ios-dark (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-ios-dark-empty.png)

#### mobile ios-dark (page)

![capacitor-input-otp empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-ios-dark-empty.png)

#### mobile material-light (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-material-light-empty.png)

#### mobile material-light (page)

![capacitor-input-otp empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-material-light-empty.png)

#### mobile material-dark (frame)

![capacitor-input-otp empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-material-dark-empty.png)

#### mobile material-dark (page)

![capacitor-input-otp empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-material-dark-empty.png)

### filled (Filled)

#### desktop ios-light (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-ios-light-filled.png)

#### desktop ios-dark (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-ios-dark-filled.png)

#### desktop material-light (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-material-light-filled.png)

#### desktop material-dark (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/desktop-frame-material-dark-filled.png)

#### mobile ios-light (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-ios-light-filled.png)

#### mobile ios-light (page)

![capacitor-input-otp filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-ios-light-filled.png)

#### mobile ios-dark (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-ios-dark-filled.png)

#### mobile ios-dark (page)

![capacitor-input-otp filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-ios-dark-filled.png)

#### mobile material-light (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-material-light-filled.png)

#### mobile material-light (page)

![capacitor-input-otp filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-material-light-filled.png)

#### mobile material-dark (frame)

![capacitor-input-otp filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-frame-material-dark-filled.png)

#### mobile material-dark (page)

![capacitor-input-otp filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-input-otp/mobile-page-material-dark-filled.png)

## capacitor-item-sliding

### default (Default)

#### desktop ios-light (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-item-sliding default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-item-sliding default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-item-sliding default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-item-sliding default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-item-sliding default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-item-sliding alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-item-sliding alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-item-sliding alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-item-sliding alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-item-sliding alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-item-sliding/mobile-page-material-dark-alternate.png)

## capacitor-link

### default (Default)

#### desktop ios-light (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-link/mobile-page-material-dark-alternate.png)

## capacitor-list

### inset (Inset list)

#### desktop ios-light (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-ios-light-inset.png)

#### desktop ios-dark (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-ios-dark-inset.png)

#### desktop material-light (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-material-light-inset.png)

#### desktop material-dark (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-material-dark-inset.png)

#### mobile ios-light (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-ios-light-inset.png)

#### mobile ios-light (page)

![capacitor-list inset page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-ios-light-inset.png)

#### mobile ios-dark (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-ios-dark-inset.png)

#### mobile ios-dark (page)

![capacitor-list inset page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-ios-dark-inset.png)

#### mobile material-light (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-material-light-inset.png)

#### mobile material-light (page)

![capacitor-list inset page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-material-light-inset.png)

#### mobile material-dark (frame)

![capacitor-list inset frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-material-dark-inset.png)

#### mobile material-dark (page)

![capacitor-list inset page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-material-dark-inset.png)

### buttons (List buttons)

#### desktop ios-light (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-ios-light-buttons.png)

#### desktop ios-dark (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-ios-dark-buttons.png)

#### desktop material-light (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-material-light-buttons.png)

#### desktop material-dark (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-material-dark-buttons.png)

#### mobile ios-light (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-ios-light-buttons.png)

#### mobile ios-light (page)

![capacitor-list buttons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-ios-light-buttons.png)

#### mobile ios-dark (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-ios-dark-buttons.png)

#### mobile ios-dark (page)

![capacitor-list buttons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-ios-dark-buttons.png)

#### mobile material-light (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-material-light-buttons.png)

#### mobile material-light (page)

![capacitor-list buttons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-material-light-buttons.png)

#### mobile material-dark (frame)

![capacitor-list buttons frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-material-dark-buttons.png)

#### mobile material-dark (page)

![capacitor-list buttons page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-material-dark-buttons.png)

### media (Media rows)

#### desktop ios-light (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-ios-light-media.png)

#### desktop ios-dark (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-ios-dark-media.png)

#### desktop material-light (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-material-light-media.png)

#### desktop material-dark (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/desktop-frame-material-dark-media.png)

#### mobile ios-light (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-ios-light-media.png)

#### mobile ios-light (page)

![capacitor-list media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-ios-light-media.png)

#### mobile ios-dark (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-ios-dark-media.png)

#### mobile ios-dark (page)

![capacitor-list media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-ios-dark-media.png)

#### mobile material-light (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-material-light-media.png)

#### mobile material-light (page)

![capacitor-list media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-material-light-media.png)

#### mobile material-dark (frame)

![capacitor-list media frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-frame-material-dark-media.png)

#### mobile material-dark (page)

![capacitor-list media page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list/mobile-page-material-dark-media.png)

## capacitor-list-button

### default (Default)

#### desktop ios-light (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-list-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-list-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-list-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-list-button default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-list-button default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-list-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-list-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-list-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-list-button alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-list-button alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-button/mobile-page-material-dark-alternate.png)

## capacitor-list-group

### default (Default)

#### desktop ios-light (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-list-group default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-list-group default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-list-group default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-list-group default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-list-group default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-list-group alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-list-group alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-list-group alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-list-group alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-list-group alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-group/mobile-page-material-dark-alternate.png)

## capacitor-list-input

### empty (Empty)

#### desktop ios-light (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-ios-light-empty.png)

#### desktop ios-dark (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-ios-dark-empty.png)

#### desktop material-light (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-material-light-empty.png)

#### desktop material-dark (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-material-dark-empty.png)

#### mobile ios-light (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-ios-light-empty.png)

#### mobile ios-light (page)

![capacitor-list-input empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-ios-light-empty.png)

#### mobile ios-dark (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-ios-dark-empty.png)

#### mobile ios-dark (page)

![capacitor-list-input empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-ios-dark-empty.png)

#### mobile material-light (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-material-light-empty.png)

#### mobile material-light (page)

![capacitor-list-input empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-material-light-empty.png)

#### mobile material-dark (frame)

![capacitor-list-input empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-material-dark-empty.png)

#### mobile material-dark (page)

![capacitor-list-input empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-material-dark-empty.png)

### filled (Filled)

#### desktop ios-light (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-ios-light-filled.png)

#### desktop ios-dark (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-ios-dark-filled.png)

#### desktop material-light (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-material-light-filled.png)

#### desktop material-dark (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-material-dark-filled.png)

#### mobile ios-light (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-ios-light-filled.png)

#### mobile ios-light (page)

![capacitor-list-input filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-ios-light-filled.png)

#### mobile ios-dark (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-ios-dark-filled.png)

#### mobile ios-dark (page)

![capacitor-list-input filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-ios-dark-filled.png)

#### mobile material-light (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-material-light-filled.png)

#### mobile material-light (page)

![capacitor-list-input filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-material-light-filled.png)

#### mobile material-dark (frame)

![capacitor-list-input filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-material-dark-filled.png)

#### mobile material-dark (page)

![capacitor-list-input filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-material-dark-filled.png)

### focused (Focused)

#### desktop ios-light (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-ios-light-focused.png)

#### desktop ios-dark (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-ios-dark-focused.png)

#### desktop material-light (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-material-light-focused.png)

#### desktop material-dark (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/desktop-frame-material-dark-focused.png)

#### mobile ios-light (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-ios-light-focused.png)

#### mobile ios-light (page)

![capacitor-list-input focused page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-ios-light-focused.png)

#### mobile ios-dark (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-ios-dark-focused.png)

#### mobile ios-dark (page)

![capacitor-list-input focused page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-ios-dark-focused.png)

#### mobile material-light (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-material-light-focused.png)

#### mobile material-light (page)

![capacitor-list-input focused page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-material-light-focused.png)

#### mobile material-dark (frame)

![capacitor-list-input focused frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-frame-material-dark-focused.png)

#### mobile material-dark (page)

![capacitor-list-input focused page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-input/mobile-page-material-dark-focused.png)

## capacitor-list-item

### standard (Standard)

#### desktop ios-light (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-light-standard.png)

#### desktop ios-dark (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-dark-standard.png)

#### desktop material-light (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-light-standard.png)

#### desktop material-dark (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-dark-standard.png)

#### mobile ios-light (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-light-standard.png)

#### mobile ios-light (page)

![capacitor-list-item standard page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-light-standard.png)

#### mobile ios-dark (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-dark-standard.png)

#### mobile ios-dark (page)

![capacitor-list-item standard page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-dark-standard.png)

#### mobile material-light (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-light-standard.png)

#### mobile material-light (page)

![capacitor-list-item standard page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-light-standard.png)

#### mobile material-dark (frame)

![capacitor-list-item standard frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-dark-standard.png)

#### mobile material-dark (page)

![capacitor-list-item standard page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-dark-standard.png)

### chevron (Chevron link)

#### desktop ios-light (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-light-chevron.png)

#### desktop ios-dark (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-dark-chevron.png)

#### desktop material-light (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-light-chevron.png)

#### desktop material-dark (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-dark-chevron.png)

#### mobile ios-light (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-light-chevron.png)

#### mobile ios-light (page)

![capacitor-list-item chevron page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-light-chevron.png)

#### mobile ios-dark (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-dark-chevron.png)

#### mobile ios-dark (page)

![capacitor-list-item chevron page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-dark-chevron.png)

#### mobile material-light (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-light-chevron.png)

#### mobile material-light (page)

![capacitor-list-item chevron page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-light-chevron.png)

#### mobile material-dark (frame)

![capacitor-list-item chevron frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-dark-chevron.png)

#### mobile material-dark (page)

![capacitor-list-item chevron page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-dark-chevron.png)

### toggle-after (Toggle after)

#### desktop ios-light (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-light-toggle-after.png)

#### desktop ios-dark (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-dark-toggle-after.png)

#### desktop material-light (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-light-toggle-after.png)

#### desktop material-dark (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-dark-toggle-after.png)

#### mobile ios-light (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-light-toggle-after.png)

#### mobile ios-light (page)

![capacitor-list-item toggle-after page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-light-toggle-after.png)

#### mobile ios-dark (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-dark-toggle-after.png)

#### mobile ios-dark (page)

![capacitor-list-item toggle-after page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-dark-toggle-after.png)

#### mobile material-light (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-light-toggle-after.png)

#### mobile material-light (page)

![capacitor-list-item toggle-after page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-light-toggle-after.png)

#### mobile material-dark (frame)

![capacitor-list-item toggle-after frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-dark-toggle-after.png)

#### mobile material-dark (page)

![capacitor-list-item toggle-after page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-dark-toggle-after.png)

### badge (Badge)

#### desktop ios-light (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-light-badge.png)

#### desktop ios-dark (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-ios-dark-badge.png)

#### desktop material-light (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-light-badge.png)

#### desktop material-dark (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/desktop-frame-material-dark-badge.png)

#### mobile ios-light (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-light-badge.png)

#### mobile ios-light (page)

![capacitor-list-item badge page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-light-badge.png)

#### mobile ios-dark (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-ios-dark-badge.png)

#### mobile ios-dark (page)

![capacitor-list-item badge page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-ios-dark-badge.png)

#### mobile material-light (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-light-badge.png)

#### mobile material-light (page)

![capacitor-list-item badge page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-light-badge.png)

#### mobile material-dark (frame)

![capacitor-list-item badge frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-frame-material-dark-badge.png)

#### mobile material-dark (page)

![capacitor-list-item badge page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-list-item/mobile-page-material-dark-badge.png)

## capacitor-menu-list

### default (Default)

#### desktop ios-light (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-menu-list default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-menu-list default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-menu-list default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-menu-list default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-menu-list default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-menu-list alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-menu-list alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-menu-list alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-menu-list alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-menu-list alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list/mobile-page-material-dark-alternate.png)

## capacitor-menu-list-item

### default (Default)

#### desktop ios-light (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-menu-list-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-menu-list-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-menu-list-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-menu-list-item default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-menu-list-item default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-menu-list-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-menu-list-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-menu-list-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-menu-list-item alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-menu-list-item alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-menu-list-item/mobile-page-material-dark-alternate.png)

## capacitor-message

### default (Default)

#### desktop ios-light (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-message default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-message default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-message default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-message default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-message default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-message alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-message alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-message alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-message alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-message alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-message/mobile-page-material-dark-alternate.png)

## capacitor-messagebar

### default (Default)

#### desktop ios-light (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-messagebar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-messagebar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-messagebar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-messagebar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-messagebar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-messagebar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-messagebar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-messagebar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-messagebar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-messagebar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messagebar/mobile-page-material-dark-alternate.png)

## capacitor-messages

### default (Default)

#### desktop ios-light (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-messages default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-messages default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-messages default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-messages default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-messages default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-messages alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-messages alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-messages alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-messages alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-messages alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages/mobile-page-material-dark-alternate.png)

## capacitor-messages-title

### default (Default)

#### desktop ios-light (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-messages-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-messages-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-messages-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-messages-title default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-messages-title default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-messages-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-messages-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-messages-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-messages-title alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-messages-title alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-messages-title/mobile-page-material-dark-alternate.png)

## capacitor-modal

### default (Default)

#### desktop ios-light (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-modal default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-modal default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-modal default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-modal default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-modal default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-modal alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-modal alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-modal alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-modal alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-modal alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-modal/mobile-page-material-dark-alternate.png)

## capacitor-navbar

### default (Default)

#### desktop ios-light (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-navbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-navbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-navbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-navbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-navbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-navbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-navbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-navbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-navbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-navbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar/mobile-page-material-dark-alternate.png)

## capacitor-navbar-back-link

### default (Default)

#### desktop ios-light (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-navbar-back-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-navbar-back-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-navbar-back-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-navbar-back-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-navbar-back-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-navbar-back-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-navbar-back-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-navbar-back-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-navbar-back-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-navbar-back-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-navbar-back-link/mobile-page-material-dark-alternate.png)

## capacitor-note

### default (Default)

#### desktop ios-light (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-note default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-note default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-note default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-note default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-note default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-note alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-note alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-note alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-note alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-note alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-note/mobile-page-material-dark-alternate.png)

## capacitor-notification

### default (Default)

#### desktop ios-light (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-notification default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-notification default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-notification default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-notification default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-notification default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-notification alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-notification alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-notification alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-notification alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-notification alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-notification/mobile-page-material-dark-alternate.png)

## capacitor-page

### default (Default)

#### desktop ios-light (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-page default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-page default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-page default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-page default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-page default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-page alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-page alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-page alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-page alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-page alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-page/mobile-page-material-dark-alternate.png)

## capacitor-panel

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-panel screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-panel screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-panel screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-panel screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-panel screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-material-dark-screen.png)

### open (Open)

#### desktop ios-light (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-ios-light-open.png)

#### desktop ios-dark (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-ios-dark-open.png)

#### desktop material-light (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-material-light-open.png)

#### desktop material-dark (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/desktop-frame-material-dark-open.png)

#### mobile ios-light (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-ios-light-open.png)

#### mobile ios-light (page)

![capacitor-panel open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-ios-light-open.png)

#### mobile ios-dark (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-ios-dark-open.png)

#### mobile ios-dark (page)

![capacitor-panel open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-ios-dark-open.png)

#### mobile material-light (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-material-light-open.png)

#### mobile material-light (page)

![capacitor-panel open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-material-light-open.png)

#### mobile material-dark (frame)

![capacitor-panel open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-frame-material-dark-open.png)

#### mobile material-dark (page)

![capacitor-panel open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-panel/mobile-page-material-dark-open.png)

## capacitor-picker

### default (Default)

#### desktop ios-light (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-picker default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-picker default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-picker default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-picker default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-picker default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-picker alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-picker alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-picker alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-picker alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-picker alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-picker/mobile-page-material-dark-alternate.png)

## capacitor-popover

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-popover screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-popover screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-popover screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-popover screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-popover screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-material-dark-screen.png)

### open (Open)

#### desktop ios-light (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-ios-light-open.png)

#### desktop ios-dark (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-ios-dark-open.png)

#### desktop material-light (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-material-light-open.png)

#### desktop material-dark (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/desktop-frame-material-dark-open.png)

#### mobile ios-light (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-ios-light-open.png)

#### mobile ios-light (page)

![capacitor-popover open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-ios-light-open.png)

#### mobile ios-dark (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-ios-dark-open.png)

#### mobile ios-dark (page)

![capacitor-popover open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-ios-dark-open.png)

#### mobile material-light (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-material-light-open.png)

#### mobile material-light (page)

![capacitor-popover open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-material-light-open.png)

#### mobile material-dark (frame)

![capacitor-popover open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-frame-material-dark-open.png)

#### mobile material-dark (page)

![capacitor-popover open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popover/mobile-page-material-dark-open.png)

## capacitor-popup

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-popup screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-popup screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-popup screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-popup screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-popup screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-material-dark-screen.png)

### open (Open)

#### desktop ios-light (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-ios-light-open.png)

#### desktop ios-dark (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-ios-dark-open.png)

#### desktop material-light (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-material-light-open.png)

#### desktop material-dark (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/desktop-frame-material-dark-open.png)

#### mobile ios-light (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-ios-light-open.png)

#### mobile ios-light (page)

![capacitor-popup open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-ios-light-open.png)

#### mobile ios-dark (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-ios-dark-open.png)

#### mobile ios-dark (page)

![capacitor-popup open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-ios-dark-open.png)

#### mobile material-light (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-material-light-open.png)

#### mobile material-light (page)

![capacitor-popup open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-material-light-open.png)

#### mobile material-dark (frame)

![capacitor-popup open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-frame-material-dark-open.png)

#### mobile material-dark (page)

![capacitor-popup open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-popup/mobile-page-material-dark-open.png)

## capacitor-preloader

### default (Default)

#### desktop ios-light (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-preloader default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-preloader default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-preloader default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-preloader default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-preloader default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-preloader alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-preloader alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-preloader alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-preloader alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-preloader alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-preloader/mobile-page-material-dark-alternate.png)

## capacitor-progressbar

### default (Default)

#### desktop ios-light (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-progressbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-progressbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-progressbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-progressbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-progressbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-progressbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-progressbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-progressbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-progressbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-progressbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-progressbar/mobile-page-material-dark-alternate.png)

## capacitor-radio

### option-a (Option A)

#### desktop ios-light (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-ios-light-option-a.png)

#### desktop ios-dark (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-ios-dark-option-a.png)

#### desktop material-light (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-material-light-option-a.png)

#### desktop material-dark (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-material-dark-option-a.png)

#### mobile ios-light (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-ios-light-option-a.png)

#### mobile ios-light (page)

![capacitor-radio option-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-ios-light-option-a.png)

#### mobile ios-dark (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-ios-dark-option-a.png)

#### mobile ios-dark (page)

![capacitor-radio option-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-ios-dark-option-a.png)

#### mobile material-light (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-material-light-option-a.png)

#### mobile material-light (page)

![capacitor-radio option-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-material-light-option-a.png)

#### mobile material-dark (frame)

![capacitor-radio option-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-material-dark-option-a.png)

#### mobile material-dark (page)

![capacitor-radio option-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-material-dark-option-a.png)

### option-b (Option B)

#### desktop ios-light (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-ios-light-option-b.png)

#### desktop ios-dark (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-ios-dark-option-b.png)

#### desktop material-light (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-material-light-option-b.png)

#### desktop material-dark (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/desktop-frame-material-dark-option-b.png)

#### mobile ios-light (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-ios-light-option-b.png)

#### mobile ios-light (page)

![capacitor-radio option-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-ios-light-option-b.png)

#### mobile ios-dark (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-ios-dark-option-b.png)

#### mobile ios-dark (page)

![capacitor-radio option-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-ios-dark-option-b.png)

#### mobile material-light (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-material-light-option-b.png)

#### mobile material-light (page)

![capacitor-radio option-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-material-light-option-b.png)

#### mobile material-dark (frame)

![capacitor-radio option-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-frame-material-dark-option-b.png)

#### mobile material-dark (page)

![capacitor-radio option-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-radio/mobile-page-material-dark-option-b.png)

## capacitor-range

### default (Default)

#### desktop ios-light (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-range default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-range default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-range default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-range default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-range default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-range alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-range alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-range alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-range alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-range alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-range/mobile-page-material-dark-alternate.png)

## capacitor-refresher

### default (Default)

#### desktop ios-light (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-refresher default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-refresher default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-refresher default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-refresher default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-refresher default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-refresher alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-refresher alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-refresher alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-refresher alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-refresher alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-refresher/mobile-page-material-dark-alternate.png)

## capacitor-reorder

### default (Default)

#### desktop ios-light (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-reorder default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-reorder default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-reorder default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-reorder default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-reorder default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-reorder alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-reorder alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-reorder alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-reorder alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-reorder alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-reorder/mobile-page-material-dark-alternate.png)

## capacitor-searchbar

### empty (Empty)

#### desktop ios-light (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-ios-light-empty.png)

#### desktop ios-dark (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-ios-dark-empty.png)

#### desktop material-light (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-material-light-empty.png)

#### desktop material-dark (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-material-dark-empty.png)

#### mobile ios-light (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-ios-light-empty.png)

#### mobile ios-light (page)

![capacitor-searchbar empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-ios-light-empty.png)

#### mobile ios-dark (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-ios-dark-empty.png)

#### mobile ios-dark (page)

![capacitor-searchbar empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-ios-dark-empty.png)

#### mobile material-light (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-material-light-empty.png)

#### mobile material-light (page)

![capacitor-searchbar empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-material-light-empty.png)

#### mobile material-dark (frame)

![capacitor-searchbar empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-material-dark-empty.png)

#### mobile material-dark (page)

![capacitor-searchbar empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-material-dark-empty.png)

### filled (Filled)

#### desktop ios-light (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-ios-light-filled.png)

#### desktop ios-dark (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-ios-dark-filled.png)

#### desktop material-light (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-material-light-filled.png)

#### desktop material-dark (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/desktop-frame-material-dark-filled.png)

#### mobile ios-light (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-ios-light-filled.png)

#### mobile ios-light (page)

![capacitor-searchbar filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-ios-light-filled.png)

#### mobile ios-dark (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-ios-dark-filled.png)

#### mobile ios-dark (page)

![capacitor-searchbar filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-ios-dark-filled.png)

#### mobile material-light (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-material-light-filled.png)

#### mobile material-light (page)

![capacitor-searchbar filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-material-light-filled.png)

#### mobile material-dark (frame)

![capacitor-searchbar filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-frame-material-dark-filled.png)

#### mobile material-dark (page)

![capacitor-searchbar filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-searchbar/mobile-page-material-dark-filled.png)

## capacitor-segmented

### one-selected (One selected)

#### desktop ios-light (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-ios-light-one-selected.png)

#### desktop ios-dark (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-ios-dark-one-selected.png)

#### desktop material-light (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-material-light-one-selected.png)

#### desktop material-dark (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-material-dark-one-selected.png)

#### mobile ios-light (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-ios-light-one-selected.png)

#### mobile ios-light (page)

![capacitor-segmented one-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-ios-light-one-selected.png)

#### mobile ios-dark (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-ios-dark-one-selected.png)

#### mobile ios-dark (page)

![capacitor-segmented one-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-ios-dark-one-selected.png)

#### mobile material-light (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-material-light-one-selected.png)

#### mobile material-light (page)

![capacitor-segmented one-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-material-light-one-selected.png)

#### mobile material-dark (frame)

![capacitor-segmented one-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-material-dark-one-selected.png)

#### mobile material-dark (page)

![capacitor-segmented one-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-material-dark-one-selected.png)

### two-selected (Two selected)

#### desktop ios-light (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-ios-light-two-selected.png)

#### desktop ios-dark (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-ios-dark-two-selected.png)

#### desktop material-light (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-material-light-two-selected.png)

#### desktop material-dark (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/desktop-frame-material-dark-two-selected.png)

#### mobile ios-light (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-ios-light-two-selected.png)

#### mobile ios-light (page)

![capacitor-segmented two-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-ios-light-two-selected.png)

#### mobile ios-dark (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-ios-dark-two-selected.png)

#### mobile ios-dark (page)

![capacitor-segmented two-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-ios-dark-two-selected.png)

#### mobile material-light (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-material-light-two-selected.png)

#### mobile material-light (page)

![capacitor-segmented two-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-material-light-two-selected.png)

#### mobile material-dark (frame)

![capacitor-segmented two-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-frame-material-dark-two-selected.png)

#### mobile material-dark (page)

![capacitor-segmented two-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented/mobile-page-material-dark-two-selected.png)

## capacitor-segmented-button

### a-selected (A selected)

#### desktop ios-light (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-ios-light-a-selected.png)

#### desktop ios-dark (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-ios-dark-a-selected.png)

#### desktop material-light (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-material-light-a-selected.png)

#### desktop material-dark (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-material-dark-a-selected.png)

#### mobile ios-light (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-ios-light-a-selected.png)

#### mobile ios-light (page)

![capacitor-segmented-button a-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-ios-light-a-selected.png)

#### mobile ios-dark (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-ios-dark-a-selected.png)

#### mobile ios-dark (page)

![capacitor-segmented-button a-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-ios-dark-a-selected.png)

#### mobile material-light (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-material-light-a-selected.png)

#### mobile material-light (page)

![capacitor-segmented-button a-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-material-light-a-selected.png)

#### mobile material-dark (frame)

![capacitor-segmented-button a-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-material-dark-a-selected.png)

#### mobile material-dark (page)

![capacitor-segmented-button a-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-material-dark-a-selected.png)

### b-selected (B selected)

#### desktop ios-light (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-ios-light-b-selected.png)

#### desktop ios-dark (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-ios-dark-b-selected.png)

#### desktop material-light (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-material-light-b-selected.png)

#### desktop material-dark (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/desktop-frame-material-dark-b-selected.png)

#### mobile ios-light (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-ios-light-b-selected.png)

#### mobile ios-light (page)

![capacitor-segmented-button b-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-ios-light-b-selected.png)

#### mobile ios-dark (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-ios-dark-b-selected.png)

#### mobile ios-dark (page)

![capacitor-segmented-button b-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-ios-dark-b-selected.png)

#### mobile material-light (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-material-light-b-selected.png)

#### mobile material-light (page)

![capacitor-segmented-button b-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-material-light-b-selected.png)

#### mobile material-dark (frame)

![capacitor-segmented-button b-selected frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-frame-material-dark-b-selected.png)

#### mobile material-dark (page)

![capacitor-segmented-button b-selected page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-segmented-button/mobile-page-material-dark-b-selected.png)

## capacitor-select

### default (Default)

#### desktop ios-light (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-select default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-select default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-select default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-select default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-select default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-select alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-select alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-select alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-select alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-select alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-select/mobile-page-material-dark-alternate.png)

## capacitor-sheet

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-sheet screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-sheet screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-sheet screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-sheet screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-sheet screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-material-dark-screen.png)

### open (Open)

#### desktop ios-light (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-ios-light-open.png)

#### desktop ios-dark (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-ios-dark-open.png)

#### desktop material-light (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-material-light-open.png)

#### desktop material-dark (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/desktop-frame-material-dark-open.png)

#### mobile ios-light (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-ios-light-open.png)

#### mobile ios-light (page)

![capacitor-sheet open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-ios-light-open.png)

#### mobile ios-dark (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-ios-dark-open.png)

#### mobile ios-dark (page)

![capacitor-sheet open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-ios-dark-open.png)

#### mobile material-light (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-material-light-open.png)

#### mobile material-light (page)

![capacitor-sheet open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-material-light-open.png)

#### mobile material-dark (frame)

![capacitor-sheet open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-frame-material-dark-open.png)

#### mobile material-dark (page)

![capacitor-sheet open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-sheet/mobile-page-material-dark-open.png)

## capacitor-skeleton

### default (Default)

#### desktop ios-light (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-skeleton default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-skeleton default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-skeleton default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-skeleton default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-skeleton default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-skeleton alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-skeleton alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-skeleton alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-skeleton alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-skeleton alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-skeleton/mobile-page-material-dark-alternate.png)

## capacitor-split-pane

### default (Default)

#### desktop ios-light (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-split-pane default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-split-pane default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-split-pane default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-split-pane default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-split-pane default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-split-pane alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-split-pane alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-split-pane alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-split-pane alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-split-pane alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-split-pane/mobile-page-material-dark-alternate.png)

## capacitor-stepper

### default (Default)

#### desktop ios-light (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-stepper default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-stepper default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-stepper default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-stepper default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-stepper default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-stepper alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-stepper alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-stepper alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-stepper alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-stepper alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-stepper/mobile-page-material-dark-alternate.png)

## capacitor-tab

### tab-a (Tab A selected)

#### desktop ios-light (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-ios-light-tab-a.png)

#### desktop ios-dark (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-ios-dark-tab-a.png)

#### desktop material-light (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-material-light-tab-a.png)

#### desktop material-dark (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-material-dark-tab-a.png)

#### mobile ios-light (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-ios-light-tab-a.png)

#### mobile ios-light (page)

![capacitor-tab tab-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-ios-light-tab-a.png)

#### mobile ios-dark (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-ios-dark-tab-a.png)

#### mobile ios-dark (page)

![capacitor-tab tab-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-ios-dark-tab-a.png)

#### mobile material-light (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-material-light-tab-a.png)

#### mobile material-light (page)

![capacitor-tab tab-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-material-light-tab-a.png)

#### mobile material-dark (frame)

![capacitor-tab tab-a frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-material-dark-tab-a.png)

#### mobile material-dark (page)

![capacitor-tab tab-a page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-material-dark-tab-a.png)

### tab-b (Tab B selected)

#### desktop ios-light (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-ios-light-tab-b.png)

#### desktop ios-dark (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-ios-dark-tab-b.png)

#### desktop material-light (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-material-light-tab-b.png)

#### desktop material-dark (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/desktop-frame-material-dark-tab-b.png)

#### mobile ios-light (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-ios-light-tab-b.png)

#### mobile ios-light (page)

![capacitor-tab tab-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-ios-light-tab-b.png)

#### mobile ios-dark (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-ios-dark-tab-b.png)

#### mobile ios-dark (page)

![capacitor-tab tab-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-ios-dark-tab-b.png)

#### mobile material-light (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-material-light-tab-b.png)

#### mobile material-light (page)

![capacitor-tab tab-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-material-light-tab-b.png)

#### mobile material-dark (frame)

![capacitor-tab tab-b frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-frame-material-dark-tab-b.png)

#### mobile material-dark (page)

![capacitor-tab tab-b page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tab/mobile-page-material-dark-tab-b.png)

## capacitor-tabbar

### default (Default)

#### desktop ios-light (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-tabbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-tabbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-tabbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-tabbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-tabbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-tabbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-tabbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-tabbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-tabbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-tabbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar/mobile-page-material-dark-alternate.png)

## capacitor-tabbar-link

### default (Default)

#### desktop ios-light (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-tabbar-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-tabbar-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-tabbar-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-tabbar-link default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-tabbar-link default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-tabbar-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-tabbar-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-tabbar-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-tabbar-link alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-tabbar-link alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabbar-link/mobile-page-material-dark-alternate.png)

## capacitor-table

### default (Default)

#### desktop ios-light (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-table default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-table default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-table default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-table default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-table default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-table alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-table alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-table alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-table alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-table alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table/mobile-page-material-dark-alternate.png)

## capacitor-table-body

### default (Default)

#### desktop ios-light (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-table-body default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-table-body default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-table-body default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-table-body default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-table-body default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-table-body alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-table-body alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-table-body alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-table-body alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-table-body alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-body/mobile-page-material-dark-alternate.png)

## capacitor-table-cell

### default (Default)

#### desktop ios-light (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-table-cell default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-table-cell default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-table-cell default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-table-cell default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-table-cell default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-table-cell alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-table-cell alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-table-cell alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-table-cell alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-table-cell alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-cell/mobile-page-material-dark-alternate.png)

## capacitor-table-head

### default (Default)

#### desktop ios-light (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-table-head default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-table-head default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-table-head default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-table-head default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-table-head default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-table-head alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-table-head alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-table-head alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-table-head alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-table-head alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-head/mobile-page-material-dark-alternate.png)

## capacitor-table-row

### default (Default)

#### desktop ios-light (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-table-row default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-table-row default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-table-row default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-table-row default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-table-row default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-table-row alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-table-row alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-table-row alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-table-row alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-table-row alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-table-row/mobile-page-material-dark-alternate.png)

## capacitor-tabs

### tab-one (One selected)

#### desktop ios-light (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-ios-light-tab-one.png)

#### desktop ios-dark (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-ios-dark-tab-one.png)

#### desktop material-light (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-material-light-tab-one.png)

#### desktop material-dark (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-material-dark-tab-one.png)

#### mobile ios-light (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-ios-light-tab-one.png)

#### mobile ios-light (page)

![capacitor-tabs tab-one page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-ios-light-tab-one.png)

#### mobile ios-dark (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-ios-dark-tab-one.png)

#### mobile ios-dark (page)

![capacitor-tabs tab-one page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-ios-dark-tab-one.png)

#### mobile material-light (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-material-light-tab-one.png)

#### mobile material-light (page)

![capacitor-tabs tab-one page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-material-light-tab-one.png)

#### mobile material-dark (frame)

![capacitor-tabs tab-one frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-material-dark-tab-one.png)

#### mobile material-dark (page)

![capacitor-tabs tab-one page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-material-dark-tab-one.png)

### tab-two (Two selected)

#### desktop ios-light (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-ios-light-tab-two.png)

#### desktop ios-dark (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-ios-dark-tab-two.png)

#### desktop material-light (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-material-light-tab-two.png)

#### desktop material-dark (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/desktop-frame-material-dark-tab-two.png)

#### mobile ios-light (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-ios-light-tab-two.png)

#### mobile ios-light (page)

![capacitor-tabs tab-two page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-ios-light-tab-two.png)

#### mobile ios-dark (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-ios-dark-tab-two.png)

#### mobile ios-dark (page)

![capacitor-tabs tab-two page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-ios-dark-tab-two.png)

#### mobile material-light (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-material-light-tab-two.png)

#### mobile material-light (page)

![capacitor-tabs tab-two page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-material-light-tab-two.png)

#### mobile material-dark (frame)

![capacitor-tabs tab-two frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-frame-material-dark-tab-two.png)

#### mobile material-dark (page)

![capacitor-tabs tab-two page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-tabs/mobile-page-material-dark-tab-two.png)

## capacitor-textarea

### empty (Empty)

#### desktop ios-light (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-ios-light-empty.png)

#### desktop ios-dark (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-ios-dark-empty.png)

#### desktop material-light (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-material-light-empty.png)

#### desktop material-dark (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-material-dark-empty.png)

#### mobile ios-light (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-ios-light-empty.png)

#### mobile ios-light (page)

![capacitor-textarea empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-ios-light-empty.png)

#### mobile ios-dark (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-ios-dark-empty.png)

#### mobile ios-dark (page)

![capacitor-textarea empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-ios-dark-empty.png)

#### mobile material-light (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-material-light-empty.png)

#### mobile material-light (page)

![capacitor-textarea empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-material-light-empty.png)

#### mobile material-dark (frame)

![capacitor-textarea empty frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-material-dark-empty.png)

#### mobile material-dark (page)

![capacitor-textarea empty page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-material-dark-empty.png)

### filled (Filled)

#### desktop ios-light (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-ios-light-filled.png)

#### desktop ios-dark (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-ios-dark-filled.png)

#### desktop material-light (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-material-light-filled.png)

#### desktop material-dark (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/desktop-frame-material-dark-filled.png)

#### mobile ios-light (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-ios-light-filled.png)

#### mobile ios-light (page)

![capacitor-textarea filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-ios-light-filled.png)

#### mobile ios-dark (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-ios-dark-filled.png)

#### mobile ios-dark (page)

![capacitor-textarea filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-ios-dark-filled.png)

#### mobile material-light (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-material-light-filled.png)

#### mobile material-light (page)

![capacitor-textarea filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-material-light-filled.png)

#### mobile material-dark (frame)

![capacitor-textarea filled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-frame-material-dark-filled.png)

#### mobile material-dark (page)

![capacitor-textarea filled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-textarea/mobile-page-material-dark-filled.png)

## capacitor-thumbnail

### default (Default)

#### desktop ios-light (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-thumbnail default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-thumbnail default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-thumbnail default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-thumbnail default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-thumbnail default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-thumbnail alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-thumbnail alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-thumbnail alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-thumbnail alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-thumbnail alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-thumbnail/mobile-page-material-dark-alternate.png)

## capacitor-toast

### screen (Screen)

#### desktop ios-light (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-ios-light-screen.png)

#### desktop ios-dark (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-ios-dark-screen.png)

#### desktop material-light (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-material-light-screen.png)

#### desktop material-dark (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-material-dark-screen.png)

#### mobile ios-light (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-ios-light-screen.png)

#### mobile ios-light (page)

![capacitor-toast screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-ios-light-screen.png)

#### mobile ios-dark (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-ios-dark-screen.png)

#### mobile ios-dark (page)

![capacitor-toast screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-ios-dark-screen.png)

#### mobile material-light (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-material-light-screen.png)

#### mobile material-light (page)

![capacitor-toast screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-material-light-screen.png)

#### mobile material-dark (frame)

![capacitor-toast screen frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-material-dark-screen.png)

#### mobile material-dark (page)

![capacitor-toast screen page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-material-dark-screen.png)

### open (Open)

#### desktop ios-light (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-ios-light-open.png)

#### desktop ios-dark (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-ios-dark-open.png)

#### desktop material-light (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-material-light-open.png)

#### desktop material-dark (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/desktop-frame-material-dark-open.png)

#### mobile ios-light (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-ios-light-open.png)

#### mobile ios-light (page)

![capacitor-toast open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-ios-light-open.png)

#### mobile ios-dark (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-ios-dark-open.png)

#### mobile ios-dark (page)

![capacitor-toast open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-ios-dark-open.png)

#### mobile material-light (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-material-light-open.png)

#### mobile material-light (page)

![capacitor-toast open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-material-light-open.png)

#### mobile material-dark (frame)

![capacitor-toast open frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-frame-material-dark-open.png)

#### mobile material-dark (page)

![capacitor-toast open page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toast/mobile-page-material-dark-open.png)

## capacitor-toggle

### off (Off)

#### desktop ios-light (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-ios-light-off.png)

#### desktop ios-dark (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-ios-dark-off.png)

#### desktop material-light (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-material-light-off.png)

#### desktop material-dark (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-material-dark-off.png)

#### mobile ios-light (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-ios-light-off.png)

#### mobile ios-light (page)

![capacitor-toggle off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-ios-light-off.png)

#### mobile ios-dark (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-ios-dark-off.png)

#### mobile ios-dark (page)

![capacitor-toggle off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-ios-dark-off.png)

#### mobile material-light (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-material-light-off.png)

#### mobile material-light (page)

![capacitor-toggle off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-material-light-off.png)

#### mobile material-dark (frame)

![capacitor-toggle off frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-material-dark-off.png)

#### mobile material-dark (page)

![capacitor-toggle off page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-material-dark-off.png)

### on (On)

#### desktop ios-light (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-ios-light-on.png)

#### desktop ios-dark (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-ios-dark-on.png)

#### desktop material-light (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-material-light-on.png)

#### desktop material-dark (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-material-dark-on.png)

#### mobile ios-light (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-ios-light-on.png)

#### mobile ios-light (page)

![capacitor-toggle on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-ios-light-on.png)

#### mobile ios-dark (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-ios-dark-on.png)

#### mobile ios-dark (page)

![capacitor-toggle on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-ios-dark-on.png)

#### mobile material-light (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-material-light-on.png)

#### mobile material-light (page)

![capacitor-toggle on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-material-light-on.png)

#### mobile material-dark (frame)

![capacitor-toggle on frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-material-dark-on.png)

#### mobile material-dark (page)

![capacitor-toggle on page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-material-dark-on.png)

### disabled (Disabled)

#### desktop ios-light (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-ios-light-disabled.png)

#### desktop ios-dark (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-ios-dark-disabled.png)

#### desktop material-light (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-material-light-disabled.png)

#### desktop material-dark (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/desktop-frame-material-dark-disabled.png)

#### mobile ios-light (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-ios-light-disabled.png)

#### mobile ios-light (page)

![capacitor-toggle disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-ios-light-disabled.png)

#### mobile ios-dark (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-ios-dark-disabled.png)

#### mobile ios-dark (page)

![capacitor-toggle disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-ios-dark-disabled.png)

#### mobile material-light (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-material-light-disabled.png)

#### mobile material-light (page)

![capacitor-toggle disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-material-light-disabled.png)

#### mobile material-dark (frame)

![capacitor-toggle disabled frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-frame-material-dark-disabled.png)

#### mobile material-dark (page)

![capacitor-toggle disabled page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toggle/mobile-page-material-dark-disabled.png)

## capacitor-toolbar

### default (Default)

#### desktop ios-light (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-toolbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-toolbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-toolbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-toolbar default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-toolbar default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-toolbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-toolbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-toolbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-toolbar alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-toolbar alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-toolbar/mobile-page-material-dark-alternate.png)

## capacitor-touch-ripple

### default (Default)

#### desktop ios-light (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-ios-light-default.png)

#### desktop ios-dark (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-ios-dark-default.png)

#### desktop material-light (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-material-light-default.png)

#### desktop material-dark (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-material-dark-default.png)

#### mobile ios-light (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-ios-light-default.png)

#### mobile ios-light (page)

![capacitor-touch-ripple default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-ios-light-default.png)

#### mobile ios-dark (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-ios-dark-default.png)

#### mobile ios-dark (page)

![capacitor-touch-ripple default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-ios-dark-default.png)

#### mobile material-light (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-material-light-default.png)

#### mobile material-light (page)

![capacitor-touch-ripple default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-material-light-default.png)

#### mobile material-dark (frame)

![capacitor-touch-ripple default frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-material-dark-default.png)

#### mobile material-dark (page)

![capacitor-touch-ripple default page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-material-dark-default.png)

### alternate (Alternate)

#### desktop ios-light (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-ios-light-alternate.png)

#### desktop ios-dark (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-ios-dark-alternate.png)

#### desktop material-light (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-material-light-alternate.png)

#### desktop material-dark (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/desktop-frame-material-dark-alternate.png)

#### mobile ios-light (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-ios-light-alternate.png)

#### mobile ios-light (page)

![capacitor-touch-ripple alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-ios-light-alternate.png)

#### mobile ios-dark (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-ios-dark-alternate.png)

#### mobile ios-dark (page)

![capacitor-touch-ripple alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-ios-dark-alternate.png)

#### mobile material-light (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-material-light-alternate.png)

#### mobile material-light (page)

![capacitor-touch-ripple alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-material-light-alternate.png)

#### mobile material-dark (frame)

![capacitor-touch-ripple alternate frame](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-frame-material-dark-alternate.png)

#### mobile material-dark (page)

![capacitor-touch-ripple alternate page](https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/1452/qa/capacitor-touch-ripple/mobile-page-material-dark-alternate.png)

