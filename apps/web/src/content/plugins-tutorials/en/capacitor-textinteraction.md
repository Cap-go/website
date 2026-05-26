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

## Keep going from Using @capgo/capacitor-textinteraction

If you are using **Using @capgo/capacitor-textinteraction** to plan native plugin work, connect it with [@capgo/capacitor-textinteraction](/docs/plugins/textinteraction/) for the implementation detail in @capgo/capacitor-textinteraction, [Getting Started](/docs/plugins/textinteraction/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
