---
title: Getting Started
description: "Install @capgo/capacitor-auto and wire a simple car template to JavaScript events."
sidebar:
  order: 2
---

import { Steps, Aside } from '@astrojs/starlight/components';
import { PackageManagers } from 'starlight-package-managers'

## Installation

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-auto` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

<Steps>
1. **Install the package**
   <PackageManagers pkg="@capgo/capacitor-auto" pkgManagers={['npm']} />

2. **Sync native projects**
   <PackageManagers type="exec" pkg="cap" args="sync" pkgManagers={['npm']} />

3. **Set the root car template**

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

4. **Handle car actions**

   ```ts
   await Auto.addListener('carAction', async (event) => {
     if (event.id === 'open-main-door') {
       await openGarageDoor(event.payload?.doorId);
     }
   });
   ```

5. **Track connection state**

   ```ts
   const status = await Auto.isAvailable();
   console.log(status.available, status.connected, status.platform);

   await Auto.addListener('connectionChanged', (event) => {
     console.log('Car connected:', event.connected, event.platform);
   });
   ```
</Steps>

<Aside type="caution" title="Car UIs are policy controlled">
CarPlay and Android Auto do not allow arbitrary WebView mirroring. Keep car actions short, driver-safe, and aligned with the app category approved by Apple or Google.
</Aside>

## Empty state

Set `emptyText` when the template has no rows:

```ts
await Auto.setRootTemplate({
  title: 'Garage',
  emptyText: 'No actions are available right now.',
  sections: [],
});
```

## Send bridge messages

Use `sendMessage` for application-defined native bridge messages:

```ts
await Auto.sendMessage({
  type: 'status',
  payload: { online: true },
});
```

## Platform setup

- Follow the [iOS setup](/docs/plugins/auto/ios/) page for CarPlay scene and entitlement notes.
- Follow the [Android setup](/docs/plugins/auto/android/) page for Android Auto category and manifest notes.

## Keep going from Getting Started

If you are using **Getting Started** to plan native plugin work, connect it with [Using @capgo/capacitor-auto](/plugins/capacitor-auto/) for the native capability in Using @capgo/capacitor-auto, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
