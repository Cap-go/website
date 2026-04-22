---
locale: en
---
# Using @capgo/capacitor-sim

Capacitor SIM Plugin for retrieving information from device SIM cards.

## Install

```bash
bun add @capgo/capacitor-sim
bunx cap sync
```

## What This Plugin Exposes

- `getSimCards` - Get information from the device's SIM cards.
- `checkPermissions` - Check permission to access SIM card information.
- `requestPermissions` - Request permission to access SIM card information.

## Example Usage

### `getSimCards`

Get information from the device's SIM cards.

```typescript
import { Sim } from '@capgo/capacitor-sim';

const { simCards } = await SimPlugin.getSimCards();
simCards.forEach((sim, index) => {
  console.log(`SIM ${index + 1}:`);
  console.log(`  Carrier: ${sim.carrierName}`);
  console.log(`  Country: ${sim.isoCountryCode}`);
  console.log(`  MCC: ${sim.mobileCountryCode}`);
  console.log(`  MNC: ${sim.mobileNetworkCode}`);
});
```

### `checkPermissions`

Check permission to access SIM card information.

```typescript
import { Sim } from '@capgo/capacitor-sim';

const status = await SimPlugin.checkPermissions();
if (status.readSimCard === 'granted') {
  console.log('Permission granted');
} else {
  console.log('Permission not granted');
}
```

### `requestPermissions`

Request permission to access SIM card information.

```typescript
import { Sim } from '@capgo/capacitor-sim';

const status = await SimPlugin.requestPermissions();
if (status.readSimCard === 'granted') {
  // Now you can call getSimCards()
  const simCards = await SimPlugin.getSimCards();
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-sim/
- Docs: /docs/plugins/sim/
