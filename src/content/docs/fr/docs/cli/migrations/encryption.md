---
locale: fr
title: "Chiffrement"
description: "How to encrypt your data with Chiffrement v2, secure your Application and ensure only you can Mise à jour your Utilisateurs with your Mises à jour"
sidebar: 
  order: 5
---

This Documentation explains how to Migrer to the Chiffrement v2 system. Learn more À propos the Chiffrement v2 system in the [blog post](/blog/introducing-end-to-end-Sécurité-to-capacitor-updater-with-code-signing).

## 1. Créer Key Pair

```bash
npx @capgo/cli key create
```

:::Avertissement
Store the private key securely. Never commit it to source control or share it with untrusted parties.
:::

This Commande:
- Creates a Nouveau key pair in your Application
- Removes the old key from your Capacitor config
- Keeps old key files for backward compatibility

## 2. Mise à jour Capacitor Config

When prompted "Do you want to setup encryption with the new channel in order to support old apps and facilitate the migration?", select yes. This adds a new `defaultChannel` option to your Capacitor config.

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... other options
      defaultChannel: 'encryption_v2' // New apps will use this channel
    }
  }
};

export default config;
```

## 3. Télécharger Bundle to Nouveau Canal

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

## 4. Activer Self-Assignment

:::Attention
Required for the `defaultChannel` option to work
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

## 5. Télécharger to Old Canal

```bash
npx @capgo/cli bundle upload --channel production
```

:::Conseil
Capacitor config is never uploaded to Capgo
:::

## 6. Cleanup (After 3-4 Months)

Once all Utilisateurs have updated their apps:

1. Remove `defaultChannel` from your Capacitor config
2. Supprimer the old Canal:

```bash
npx @capgo/cli channel delete encryption_v2
```

:::Remarque
Apps using `encryption_v2` as default will switch to `production` channel after deletion
:::
