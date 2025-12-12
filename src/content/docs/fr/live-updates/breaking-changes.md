---
locale: fr
title: "Breaking Changes"
description: "How to handle breaking changes with versioned Canaux"
sidebar: 
  order: 6
---

This Documentation explains how to handle breaking changes in your Application using versioned Canaux. This approach allows you to maintain different versions of your Application while ensuring Utilisateurs receive compatible Mises à jour.

## Exemple Scenario

Let's say you have:
- Application Version 1.2.3 (old Version) - uses Production Canal
- Application Version 2.0.0 (Nouveau Version with breaking changes) - uses v2 Canal
- Live Mise à jour 1.2.4 (compatible with 1.2.3)
- Live Mise à jour 2.0.1 (compatible with 2.0.0)

## Strategy: Always Use defaultChannel for Major Versions

**Recommended approach:** Set a `defaultChannel` for every major version. This ensures you can always push updates to specific user groups without relying on dynamic channel assignment.

```ts
// Version 1.x releases
defaultChannel: 'v1'

// Version 2.x releases  
defaultChannel: 'v2'

// Version 3.x releases (future)
defaultChannel: 'v3'
```

:::Conseil
**Benefits of this approach:**
- **Always have control** over which Utilisateurs receive Mises à jour
- **No dynamic Canal switching** needed in your Application code
- **Clear separation** between different Application versions
- **Flexibility** to Pousser Mises à jour to any specific Version group
:::

## 1. Créer Canal for Nouveau Version

```bash
# Create channel for version 2.x
npx @capgo/cli channel create v2
```

## 2. Mise à jour Capacitor Config for Version 2.0.0

Mise à jour your Capacitor config before Construction Version 2.0.0 for the Application Store:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... other options
      defaultChannel: 'v2' // All 2.0.0 users will use v2 channel
    }
  }
};

export default config;
```

:::Remarque
**For version 1.x:** If you didn't set a `defaultChannel` initially, version 1.x users are on the `production` channel. For future major versions, always set a specific channel like `v3`, `v4`, etc.
:::

## 3. Manage Separate Code Branches

Créer separate git branches to maintain compatibility between Application versions:

```bash
# Create and maintain a branch for version 1.x updates
git checkout -b v1-maintenance
git push origin v1-maintenance

# Your main branch continues with version 2.x development
git checkout main
```

:::Avertissement
**Critical:** Never push JavaScript bundles to older apps that expect native code/APIs they don't have. Always build updates from the appropriate branch:
- **v1-maintenance branch**: For Mises à jour to 1.x apps (Production Canal)
- **main branch**: For Mises à jour to 2.x apps (v2 Canal)
:::

## 4. Télécharger Bundles to Respective Canaux

```bash
# For 1.x updates: Build from v1-maintenance branch
git checkout v1-maintenance
# Make your 1.x compatible changes here
npx @capgo/cli bundle upload --channel production

# For 2.x updates: Build from main branch  
git checkout main
# Make your 2.x changes here
npx @capgo/cli bundle upload --channel v2
```

## 5. Activer Self-Assignment

```bash
# Allow apps to self-assign to v2 channel
npx @capgo/cli channel set v2 --self-assign
```

## 6. Déployer to Application Store

Construction and Déployer Version 2.0.0 to the Application Store. All Utilisateurs who Télécharger this Version (whether Nouveau Utilisateurs or existing Utilisateurs upgrading) will automatically use the v2 Canal because it's configured in the Application Bundle.

:::Remarque
**No code changes needed!** Since `defaultChannel: 'v2'` is bundled with the app store version, all users downloading version 2.0.0 will automatically use the correct channel.
:::

## Scaling to Future Versions

When you Libération Version 3.0.0 with more breaking changes:

```bash
# Create channel for version 3.x
npx @capgo/cli channel create v3
```

```ts
// capacitor.config.ts for version 3.0.0
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // Version 3.x users
    }
  }
};
```

Now you can Pousser Mises à jour to any Version:
- `production` channel → Version 1.x users
- `v2` channel → Version 2.x users  
- `v3` channel → Version 3.x users

## 7. Cleanup (After Migration)

Once all Utilisateurs have migrated to Version 2.x (count 3-4 months):

1. Remove `defaultChannel` from your Capacitor config
2. Supprimer the v2 Canal:

```bash
npx @capgo/cli channel delete v2
```

3. Supprimer the v1-maintenance branch:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::Conseil
This approach ensures Utilisateurs only receive Mises à jour compatible with their Application Version
:::

:::Avertissement
Always Test Mises à jour thoroughly in each Canal before Déploiement
:::

:::Remarque
You can safely Supprimer the v2 Canal in Capgo even if some Utilisateurs still have the Canal override. They will automatically receive Mises à jour from the Production Canal instead.
:::

## Maintaining Version 1.x Mises à jour

To send Mises à jour compatible with Version 1.x:

1. Switch to the v1-maintenance branch:
```bash
git checkout v1-maintenance
```

2. Make your changes and commit:
```bash
# Make 1.x compatible changes
git add .
git commit -m "Fix for v1.x"
git push origin v1-maintenance
```

3. Construction and Télécharger to Production Canal:
```bash
npx @capgo/cli bundle upload --channel production
```

:::Conseil
Keep your v1-maintenance branch up to date with bug fixes that are compatible with Version 1.x, but never merge breaking changes from main
::: 
