---
locale: en
---
# Using @capgo/capacitor-age-range

Cross-platform age range detection plugin.

## Install

```bash
bun add @capgo/capacitor-age-range
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { AgeRange } from '@capgo/capacitor-age-range';
```

## API at a glance

| Method | Description |
| --- | --- |
| `requestAgeRange` | Request the user's age range. |

## Examples

### `requestAgeRange()`

Request the user's age range.

```typescript
import { AgeRange } from '@capgo/capacitor-age-range';

const result = await AgeRange.requestAgeRange({ ageGates: [13, 16, 18] });
if (result.status === 'SHARING') {
  console.log('Age range:', result.ageLower, '-', result.ageUpper);
}
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-age-range/)
- [Documentation](/docs/plugins/age-range/)
- [API reference](/docs/plugins/age-range/getting-started/)

## Keep going from Using @capgo/capacitor-age-range

If you are using **Using @capgo/capacitor-age-range** to plan native plugin work, connect it with [@capgo/capacitor-age-range](/docs/plugins/age-range/) for the implementation detail in @capgo/capacitor-age-range, [Getting Started](/docs/plugins/age-range/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
