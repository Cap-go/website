---
locale: en
---
# Using @capgo/capacitor-privacy-screen

Capacitor API for protecting app content from the app switcher preview.

## Install

```bash
bun add @capgo/capacitor-privacy-screen
bunx cap sync
```

## What This Plugin Exposes

- `enable` - Enables the privacy screen.
- `disable` - Disables the privacy screen.
- `isEnabled` - Returns the current enabled state.

## Example Usage

### `enable`

Enables the privacy screen.

```typescript
import { PrivacyScreen } from '@capgo/capacitor-privacy-screen';

await PrivacyScreen.enable();
```

### `disable`

Disables the privacy screen.

```typescript
import { PrivacyScreen } from '@capgo/capacitor-privacy-screen';

await PrivacyScreen.disable();
```

### `isEnabled`

Returns the current enabled state.

```typescript
import { PrivacyScreen } from '@capgo/capacitor-privacy-screen';

await PrivacyScreen.isEnabled();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-privacy-screen/
- Docs: /docs/plugins/privacy-screen/

## Keep going from Using @capgo/capacitor-privacy-screen

If you are using **Using @capgo/capacitor-privacy-screen** to plan security and compliance, connect it with [@capgo/capacitor-privacy-screen](/docs/plugins/privacy-screen/) for the implementation detail in @capgo/capacitor-privacy-screen, [Getting Started](/docs/plugins/privacy-screen/getting-started/) for the implementation detail in Getting Started, [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, and [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner.
