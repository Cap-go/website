---
title: "@capgo/capacitor-mock-location-detector"
description: "Detect simulated GPS locations and developer tooling that enables spoofing apps."
tableOfContents: false
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: "Layered GPS spoofing detection for Capacitor apps on iOS and Android."
  actions:
    - text: Get started
      link: /docs/plugins/mock-location-detector/getting-started/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/Cap-go/capacitor-mock-location-detector/
      icon: external
      variant: minimal
---

## Overview

`@capgo/capacitor-mock-location-detector` combines multiple independent checks because no single OS flag reliably detects tools such as PoKeep or iMyFone AnyTo.

## Core Capabilities

- `analyze` - Run all available checks and return a scored composite result.
- `runCheck` - Execute one named detection layer.
- `getCapabilities` - Discover supported checks on the current platform.
- `startMonitoring` / `stopMonitoring` - Periodic analysis with `locationIntegrityChanged` events.
- `openDeveloperSettings` - Open the best-effort settings screen so users can disable developer or mock tooling.

## Check Layers

| Check ID | iOS | Android | Purpose |
| --- | --- | --- | --- |
| `system_mock_flag` | ✅ | ✅ | OS mock/simulation flag on the current GPS fix |
| `developer_options` | — | ✅ | Android developer options enabled |
| `developer_mode_indicators` | ✅ | ✅ | Indirect developer/debug build heuristics |
| `mock_location_app` | ✅ | ✅ | Known spoof app packages or URL schemes |
| `adb_enabled` | — | ✅ | USB debugging enabled |
| `mock_provider_settings` | — | ✅ | Apps granted legacy mock-location permission |
| `location_anomaly` | ✅ | ✅ | Impossible movement speed / teleport heuristic |
| `motion_correlation` | ✅ | — | GPS movement without matching accelerometer activity |
| `simulator` | ✅ | ✅ | Simulator/emulator environment |

## Important Limits

- iOS does not expose a public Developer Mode API. The plugin uses App Store-safe heuristics only.
- Apps cannot programmatically disable Developer Mode or mock location settings.

## Source Of Truth

This reference is synced from `src/definitions.ts` in [capacitor-mock-location-detector](https://github.com/Cap-go/capacitor-mock-location-detector/).
