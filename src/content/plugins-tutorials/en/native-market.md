---
published: true
locale: en
---

# @capgo/native-market Package Tutorial

The `@capgo/native-market` package is a Capacitor community plugin for the native market, allowing you to interact with the Play Store and App Store. This tutorial will guide you through the installation and usage of this package in your Capacitor project.

## Installation

To install the `@capgo/native-market` package, open your terminal and run one of the following commands, depending on your package manager:

Using npm:

```bash
npm install @capgo/native-market
```

Using yarn:

```bash
yarn add @capgo/native-market
```

After the installation, sync the native files by running the following command:

```bash
npx cap sync
```

On iOS, no further action is required.

On Android, no further action is required.

## Usage

The `@capgo/native-market` package provides several supported methods that you can use to interact with the native market. Here's an example of how to use each method:

```typescript
import { NativeMarket } from '@capgo/native-market';

// Open store listing
NativeMarket.openStoreListing({
  appId: 'com.example.app',
  country: 'IT',
});

// Open developer page
NativeMarket.openDevPage({
  devId: '5700313618786177705',
});

// Open collection
NativeMarket.openCollection({
  name: 'featured',
});

// Open editor's choice page
NativeMarket.openEditorChoicePage({
  editorChoice: 'editorial_fitness_apps_us',
});

// Perform search
NativeMarket.search({
  terms: 'capacitor',
});
```

Each method takes different input parameters depending on the action you want to perform. Make sure to refer to the method documentation for more details on the required parameters.

That's it! You have now successfully installed and used the `@capgo/native-market` package in your Capacitor project. Feel free to explore more of its features and customize it according to your needs.

***

Congratulations on completing the tutorial! If you have any further questions or need assistance, please don't hesitate to ask.