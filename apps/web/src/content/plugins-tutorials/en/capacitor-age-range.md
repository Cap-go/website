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

## What This Plugin Exposes

- `requestAgeRange` - Request the user's age range.

## Example Usage

### `requestAgeRange`

Request the user's age range.

```typescript
import { AgeRange } from '@capgo/capacitor-age-range';

const result = await AgeRange.requestAgeRange({ ageGates: [13, 16, 18] });
if (result.status === 'SHARING') {
  console.log('Age range:', result.ageLower, '-', result.ageUpper);
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-age-range/
- Docs: /docs/plugins/age-range/
