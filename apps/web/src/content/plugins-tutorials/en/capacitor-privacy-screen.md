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
