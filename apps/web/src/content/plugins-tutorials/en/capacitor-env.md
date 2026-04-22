---
locale: en
---
# Using @capgo/capacitor-env

Capacitor plugin for accessing environment variables in native code.

## Install

```bash
bun add @capgo/capacitor-env
bunx cap sync
```

## What This Plugin Exposes

- `getKey` - Retrieves the value of a specific environment variable by key.

## Example Usage

### `getKey`

Retrieves the value of a specific environment variable by key.

```typescript
import { Env } from '@capgo/capacitor-env';

const result = await EnvPlugin.getKey({ key: 'API_URL' });
console.log(result.value); // 'https://api.example.com'
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-env/
- Docs: /docs/plugins/env/
