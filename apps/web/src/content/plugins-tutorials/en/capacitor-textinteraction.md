---
locale: en
---
# Using @capgo/capacitor-textinteraction

Toggle text interaction in Capacitor based iOS apps.

## Install

```bash
bun add @capgo/capacitor-textinteraction
bunx cap sync
```

## What This Plugin Exposes

- `toggle` - Toggle text interaction (selection) on the Capacitor WebView.

## Example Usage

### `toggle`

Toggle text interaction (selection) on the Capacitor WebView.

```typescript
import { TextInteraction } from '@capgo/capacitor-textinteraction';

await TextInteraction.toggle({} as TextInteractionOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-textinteraction/
- Docs: /docs/plugins/textinteraction/
