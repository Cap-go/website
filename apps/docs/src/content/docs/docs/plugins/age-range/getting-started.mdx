---
title: Getting Started
description: "Install @capgo/capacitor-age-range and start using its current Capacitor API."
sidebar:
  order: 2
---

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-age-range` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
bun add @capgo/capacitor-age-range
bunx cap sync
```

## Import

```typescript
import { AgeRange } from '@capgo/capacitor-age-range';
```

## API Overview

### `requestAgeRange`

Request the user's age range.

On Android: queries Google Play Age Signals API (no user prompt).
On iOS: presents the system DeclaredAgeRange dialog (requires iOS 26.2+).

```typescript
import { AgeRange } from '@capgo/capacitor-age-range';

const result = await AgeRange.requestAgeRange({ ageGates: [13, 16, 18] });
if (result.status === 'SHARING') {
  console.log('Age range:', result.ageLower, '-', result.ageUpper);
}
```

## Type Reference

### `RequestAgeRangeOptions`
Options for the age range request.
```typescript
export interface RequestAgeRangeOptions {
  /**
   * Age thresholds for the request.
   *
   * On iOS: these are passed to `requestAgeRange(ageGates:)` as the
   * age boundaries presented in the system dialog. Common values: [13, 16, 18].
   *
   * On Android: this parameter is ignored (Play Age Signals returns
   * predefined ranges: 0-12, 13-15, 16-17, 18+).
   *
   * @default [13, 16, 18]
   * @since 8.0.0
   */
  ageGates?: number[];
}
```

### `AgeRangeResult`
Result of the age range request.
```typescript
export interface AgeRangeResult {
  /**
   * The outcome status of the age range request.
   *
   * @since 8.0.0
   */
  status: AgeRangeStatus;

  /**
   * Inclusive lower bound of the user's age range.
   *
   * Present when age data is available.
   *
   * @since 8.0.0
   */
  ageLower?: number;

  /**
   * Inclusive upper bound of the user's age range.
   *
   * May be absent if the user is in the highest age bracket (e.g. 18+).
   *
   * @since 8.0.0
   */
  ageUpper?: number;

  /**
   * How the age was declared/determined.
   *
   * On iOS: 'SELF_DECLARED' or 'GUARDIAN_DECLARED'.
   * On Android: 'SUPERVISED' (guardian-managed) or 'VERIFIED' (Google-verified 18+).
   *
   * @since 8.0.0
   */
  declarationSource?: DeclarationSource;

  /**
   * Android-only. The user's Google Play verification status.
   *
   * @since 8.0.0
   */
  androidUserStatus?: AndroidUserStatus;

  /**
   * Android-only. Effective date for the most recent guardian-approved change.
   *
   * @since 8.0.0
   */
  mostRecentApprovalDate?: string;

  /**
   * Android-only. Install identifier for supervised installs in Google Play.
   *
   * @since 8.0.0
   */
  installId?: string;
}
```

### `AgeRangeStatus`
Top-level status of the age range request.
```typescript
export type AgeRangeStatus =
  /**
   * The user shared their age range (iOS) or age signals are available (Android).
   */
  | 'SHARING'
  /**
   * The user declined to share their age range.
   */
  | 'DECLINED_SHARING'
  /**
   * The age range API is not available on this device/OS version.
   */
  | 'NOT_AVAILABLE'
  /**
   * An error occurred while requesting the age range.
   */
  | 'ERROR';
```

### `DeclarationSource`
How the age range was declared or determined.
```typescript
export type DeclarationSource =
  /** The user self-declared their age (iOS). */
  | 'SELF_DECLARED'
  /** A guardian declared the user's age (iOS Family Sharing or Android supervised). */
  | 'GUARDIAN_DECLARED'
  /** Google has verified the user is 18+ (Android only). */
  | 'VERIFIED'
  /** Source is unknown or not provided by the platform. */
  | 'UNKNOWN';
```

### `AndroidUserStatus`
Android-specific Google Play user status values.
```typescript
export type AndroidUserStatus =
  | 'VERIFIED'
  | 'SUPERVISED'
  | 'SUPERVISED_APPROVAL_PENDING'
  | 'SUPERVISED_APPROVAL_DENIED'
  | 'UNKNOWN'
  | 'EMPTY';
```

## Source Of Truth

This page is generated from the plugin's `src/definitions.ts`. Re-run the sync when the public API changes upstream.

## Keep going from Getting Started

If you are using **Getting Started** to plan dashboard and API operations, connect it with [Using @capgo/capacitor-age-range](/plugins/capacitor-age-range/) for the native capability in Using @capgo/capacitor-age-range, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, and [Devices](/docs/public-api/devices/) for the implementation detail in Devices.
