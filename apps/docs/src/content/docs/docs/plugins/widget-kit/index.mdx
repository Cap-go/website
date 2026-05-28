---
title: "@capgo/capacitor-widget-kit"
description: "Build iOS WidgetKit and Live Activity surfaces from Capacitor with SVG frame templates, timers, action hotspots, and a full-native widget bridge."
tableOfContents: true
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: "WidgetKit and Live Activities for Capacitor apps, with SVG-driven templates or full-native widget state sync."
  actions:
    - text: Get started
      link: /docs/plugins/widget-kit/getting-started/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/Cap-go/capacitor-widget-kit/
      icon: external
      variant: minimal
---

## Overview

`@capgo/capacitor-widget-kit` gives a Capacitor app two ways to drive widgets and Live Activities:

- SVG template activities: define WidgetKit surfaces as SVG, switch named frames from taps, run pause/play timers, mutate JSON state, and collect action events in the app.
- Full-native widget sessions: keep the widget UI fully in Swift/Kotlin/Java while Capacitor owns shared JSON state and app-to-widget or widget-to-app messages.

Use SVG templates when your widget can be rendered from resolved SVG strings. Use full-native sessions when the widget needs a custom native UI but still has to start, stop, sync state, or ask the app to complete async work.

## Demo

<figure>
  <img src="/plugins/demo/capacitor-widget-kit/demo.webp" alt="Animated WidgetKit demo showing template widget state and controls driven from Capacitor" width="300" />
  <figcaption>Widget template flow</figcaption>
</figure>

## Choose A Mode

| Mode | Best for | Main APIs |
| --- | --- | --- |
| SVG template activity | Live Activities or widget surfaces that render from SVG output | `startTemplateActivity`, `performTemplateAction`, `listTemplateEvents` |
| Full-native widget session | Native-rendered widgets that need shared state and async jobs | `startWidgetSession`, `updateWidgetSession`, `sendWidgetMessage` |

Both modes can live in the same app. For example, a workout app can use an SVG Live Activity for fast frame/timer controls and a full-native widget session for a home-screen widget with a richer native layout.

## SVG Template Capabilities

SVG templates include the pieces needed for interactive widget surfaces:

- `frames` hold named SVG variants such as `summary`, `timer`, or `details`.
- `frameMutations` switch, toggle, or step through frames after a hotspot action.
- `timerMutations` start, pause, resume, toggle, reset, stop, or change timer duration.
- `patches` update JSON state using literal values, templates, timestamps, increments, toggles, or unset operations.
- `hotspots` map tap areas to action identifiers.
- `listTemplateEvents` lets the app process widget-originated actions later.

The runtime resolves placeholders like `{{state.title}}`, `{{timers.rest.remainingText}}`, and `{{meta.template.kind}}` before the native bridge returns a surface for rendering.

## Full-Native Bridge Capabilities

Full-native sessions are for widgets that render their own UI natively:

- `startWidgetSession` creates shared state and metadata for native widget code.
- `updateWidgetSession` merges or replaces state and marks the session active again.
- `stopWidgetSession` records a final state and marks the session stopped.
- `sendWidgetMessage` queues app-to-widget or widget-to-app work.
- `acknowledgeWidgetMessages` marks messages as received.
- `completeWidgetMessage` stores a response or failure for async jobs.

Messages are idempotent after completion: retrying a completed or failed message returns the existing result instead of overwriting it.

## Public API

| Method | Description |
| --- | --- |
| `areActivitiesSupported` | Check whether the native template activity bridge can run on the current device. |
| `startTemplateActivity` | Persist an SVG template activity and start the native Live Activity bridge. |
| `updateTemplateActivity` | Replace the activity definition, state, or open URL. |
| `endTemplateActivity` | End a running activity and optionally persist one last state snapshot. |
| `performTemplateAction` | Execute declarative patches, frame mutations, timer mutations, and event logging. |
| `getTemplateActivity` | Read one stored template activity. |
| `listTemplateActivities` | List every stored template activity. |
| `listTemplateEvents` | Read action events emitted by template actions. |
| `acknowledgeTemplateEvents` | Mark template events as processed. |
| `startWidgetSession` | Start a full-native widget session backed by shared JSON state. |
| `updateWidgetSession` | Merge or replace a full-native widget session state. |
| `stopWidgetSession` | Stop a full-native widget session and optionally persist final state. |
| `getWidgetSession` | Read one full-native widget session. |
| `listWidgetSessions` | List every full-native widget session. |
| `sendWidgetMessage` | Queue a message between the app and native widget code. |
| `listWidgetMessages` | List queued bridge messages. |
| `acknowledgeWidgetMessages` | Mark bridge messages as acknowledged. |
| `completeWidgetMessage` | Complete or fail an async bridge message. |
| `getPluginVersion` | Return the platform implementation version marker. |

## Native Pieces

The plugin also ships native helpers for widget targets:

- `CapgoTemplateWidgetBridge` resolves an SVG template surface into `svg`, `frameId`, `hotspots`, and metadata.
- `CapgoTemplateActionIntent` connects interactive iOS widget buttons to template actions.
- `CapgoNativeWidgetBridge` loads full-native sessions and messages from native widget code.
- Android template helpers provide matching action receiver and widget bridge behavior.

## Source Of Truth

The API reference is synced from [`src/definitions.ts`](https://github.com/Cap-go/capacitor-widget-kit/blob/main/src/definitions.ts) in the plugin repository.

## Keep going from @capgo/capacitor-widget-kit

If you are using **@capgo/capacitor-widget-kit** to plan CI/CD automation, connect it with [Using @capgo/capacitor-widget-kit](/plugins/capacitor-widget-kit/) for the native capability in Using @capgo/capacitor-widget-kit, [Capgo CI/CD](/ci_cd/) for the product workflow in Capgo CI/CD, [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds, [Capgo Integrations](/integrations/) for the product workflow in Capgo Integrations, and [CI/CD Integration](/docs/getting-started/cicd-integration/) for the implementation detail in CI/CD Integration.
