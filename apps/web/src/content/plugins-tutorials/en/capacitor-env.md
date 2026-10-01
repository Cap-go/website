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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { Env } from '@capgo/capacitor-env';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getKey` | Retrieves the value of a specific environment variable by key. |

## Examples

### `getKey()`

Retrieves the value of a specific environment variable by key.

```typescript
import { Env } from '@capgo/capacitor-env';

const result = await Env.getKey({ key: 'key-123' });
console.log(result);
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-env/)
- [Documentation](/docs/plugins/env/)
- [API reference](/docs/plugins/env/getting-started/)

## Keep going from Using @capgo/capacitor-env

If you are using **Using @capgo/capacitor-env** to plan native plugin work, connect it with [@capgo/capacitor-env](/docs/plugins/env/) for the implementation detail in @capgo/capacitor-env, [Getting Started](/docs/plugins/env/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
