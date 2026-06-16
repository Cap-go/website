---
title: Getting Started
description: Install and configure the Contentsquare Capacitor plugin for analytics and session replay.
sidebar:
  order: 2
---

import PluginSetupSteps from '@/components/doc/PluginSetupSteps.astro';

## Installation

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-contentsquare` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

<PluginSetupSteps
  pkg="@capgo/capacitor-contentsquare"
  stepTitle="Review the upstream product configuration"
>
  <ul>
    <li>
      Follow the official <a href="https://docs.contentsquare.com/en/capacitor/">Contentsquare Capacitor guide</a> for project keys, replay settings, and dashboard setup.
    </li>
  </ul>
</PluginSetupSteps>

## Basic usage

```typescript
import { ContentsquarePlugin, CurrencyCode } from '@capgo/capacitor-contentsquare';

await ContentsquarePlugin.optIn();

await ContentsquarePlugin.sendScreenName('Home');

await ContentsquarePlugin.sendTransaction({
  transactionValue: 29.99,
  transactionCurrency: CurrencyCode.EUR,
  transactionId: 'order-123',
});

await ContentsquarePlugin.sendDynamicVar({
  dynVarKey: 'store',
  dynVarValue: 'rome',
});
```

## Screen naming tips

- Use stable names instead of user-specific values.
- Keep the same naming conventions across iOS and Android navigation stacks.
- When the app returns to foreground, resend the screen name and any critical dynamic variables.

## Replay privacy controls

Use the built-in masking helpers to keep sensitive content out of Session Replay:

```typescript
await ContentsquarePlugin.excludeURLForReplay('/checkout/');

await ContentsquarePlugin.setCapturedElementsSelector('[data-cs-capture]');

await ContentsquarePlugin.setPIISelectors({
  PIISelectors: ['input[type="email"]', '.credit-card'],
  Attributes: [{ selector: 'input[name="email"]', attrName: 'value' }],
});
```

## Platform setup

- For iOS in-app features, complete the extra deeplink wiring in the [iOS setup](/docs/plugins/contentsquare/ios/) page.
- Android does not need extra manifest wiring for the plugin itself; see [Android notes](/docs/plugins/contentsquare/android/) for logging and validation tips.

## Notes

- This plugin is a Capacitor 8 community port of the official Contentsquare Capacitor package.
- The JavaScript API stays aligned with the current Contentsquare Capacitor docs, while the packaging and native build setup target Capacitor 8.

## Keep going from Getting Started

If you are using **Getting Started** to plan native plugin work, connect it with [Using @capgo/capacitor-contentsquare](/plugins/capacitor-contentsquare/) for the native capability in Using @capgo/capacitor-contentsquare, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
