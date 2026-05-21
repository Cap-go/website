---
locale: en
published: true
---
# Using @capgo/capacitor-auto

`@capgo/capacitor-auto` connects a Capacitor app to approved CarPlay and Android Auto template surfaces. Your app sends a small list template to the car display, and the car display sends selected actions back to JavaScript.

It is built for driver-safe, policy-controlled workflows. It does not mirror your WebView into the car.

## Install and sync

```bash
npm install @capgo/capacitor-auto
npx cap sync
```

## Send a template to the car

```ts
import { Auto } from '@capgo/capacitor-auto';

await Auto.setRootTemplate({
  title: 'Garage',
  sections: [
    {
      header: 'Doors',
      items: [
        {
          id: 'open-main-door',
          title: 'Open main door',
          subtitle: 'Tap to send the action to the phone app',
          payload: { doorId: 'main' },
        },
      ],
    },
  ],
});
```

## Listen for driver actions

```ts
await Auto.addListener('carAction', async (event) => {
  if (event.id === 'open-main-door') {
    await openGarageDoor(event.payload?.doorId);
  }
});
```

## Watch connection state

```ts
const status = await Auto.isAvailable();
console.log(status.available, status.connected, status.platform);

await Auto.addListener('connectionChanged', (event) => {
  console.log('Car connected:', event.connected, event.platform);
});
```

## iOS requirements

CarPlay requires an Apple-approved entitlement for your app category. Add the CarPlay scene configuration described in the [iOS setup docs](/docs/plugins/auto/ios/) and keep your car UI inside Apple-approved templates.

## Android requirements

Android Auto uses AndroidX Car App Library. The plugin includes a `CarAppService`, declares the `template` capability, and defaults to the `IOT` category. Review the [Android setup docs](/docs/plugins/auto/android/) if your app needs another Android Auto category.

## Design guidance

Use the car surface for short, predictable actions:

- status rows
- one-tap commands
- driver-safe confirmations
- simple state handoff from the phone app

Keep complex flows in the phone UI and use `carAction` events as native intent triggers.
