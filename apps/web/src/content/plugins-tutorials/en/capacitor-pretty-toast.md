---
locale: en
---
# Using @capgo/capacitor-pretty-toast

Public toast controller exposed as `toast`.

## Install

```bash
bun add @capgo/capacitor-pretty-toast
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { PrettyToast } from '@capgo/capacitor-pretty-toast';
```

## API at a glance

| Method | Description |
| --- | --- |
| `show` | Show a custom toast and return its id. |
| `success` | Show a success toast. |
| `error` | Show an error toast. |
| `info` | Show an informational toast. |
| `warning` | Show a warning toast. |
| `loading` | Show a loading toast. Loading toasts do not auto-dismiss by default. |
| `update` | Update an existing toast by id. |
| `promise` | Show a loading toast while a promise is pending, then update it for success or error. |
| `dismiss` | Dismiss one toast by id, or the current toast when no id is provided. |
| `dismissAll` | Dismiss the current toast and clear the queue. |

## Examples

### `show()`

Show a custom toast and return its id.

```typescript
import { PrettyToast } from '@capgo/capacitor-pretty-toast';

const result = await PrettyToast.show({});
console.log(result);
```

### `success()`

Show a success toast.

```typescript
import { PrettyToast } from '@capgo/capacitor-pretty-toast';

const result = await PrettyToast.success('Hello from Capacitor');
console.log(result);
```

### `error()`

Show an error toast.

```typescript
import { PrettyToast } from '@capgo/capacitor-pretty-toast';

const result = await PrettyToast.error('Hello from Capacitor');
console.log(result);
```

### `info()`

Show an informational toast.

```typescript
import { PrettyToast } from '@capgo/capacitor-pretty-toast';

const result = await PrettyToast.info('Hello from Capacitor');
console.log(result);
```

### `warning()`

Show a warning toast.

```typescript
import { PrettyToast } from '@capgo/capacitor-pretty-toast';

const result = await PrettyToast.warning('Hello from Capacitor');
console.log(result);
```

### `loading()`

Show a loading toast. Loading toasts do not auto-dismiss by default.

```typescript
import { PrettyToast } from '@capgo/capacitor-pretty-toast';

const result = await PrettyToast.loading('Hello from Capacitor');
console.log(result);
```

The [API reference](/docs/plugins/pretty-toast/getting-started/) covers the other 4 methods.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-pretty-toast/)
- [Documentation](/docs/plugins/pretty-toast/)
- [API reference](/docs/plugins/pretty-toast/getting-started/)
