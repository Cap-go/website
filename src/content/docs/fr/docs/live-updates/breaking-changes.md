---
locale: fr
title: "Changements incompatibles"
description: "Comment gérer les changements incompatibles avec des canaux versionnés"
sidebar:
  order: 6
---

Cette page explique comment gérer les changements incompatibles (breaking changes) avec Capgo en utilisant des canaux par version majeure.

## Scénario type

Vous avez:

- Application 1.2.3 (ancienne génération) sur le canal `production`
- Application 2.0.0 (nouvelle génération) sur le canal `v2`
- Mise à jour OTA 1.2.4 compatible 1.x
- Mise à jour OTA 2.0.1 compatible 2.x

## Stratégie recommandée

Définissez un `defaultChannel` par version majeure. Cela vous permet de contrôler précisément quels utilisateurs reçoivent quelles mises à jour.

```ts
// Releases 1.x
defaultChannel: 'v1'

// Releases 2.x
defaultChannel: 'v2'

// Releases 3.x
defaultChannel: 'v3'
```

:::tip[Conseil]
Avantages:
- contrôle clair du routage des utilisateurs
- séparation nette entre générations d'apps
- mises à jour ciblées sans logique complexe côté client
:::

## 1. Créer un canal pour la nouvelle version

```bash
# Create channel for version 2.x
npx @capgo/cli channel create v2
```

## 2. Mettre à jour la config Capacitor pour 2.0.0

Avant de publier la version store 2.0.0:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v2'
    }
  }
};

export default config;
```

:::note[Remarque]
Si vous n'aviez pas configuré `defaultChannel` en 1.x, ces utilisateurs restent généralement sur `production`.
:::

## 3. Maintenir des branches code séparées

Gardez une branche par génération native incompatible.

```bash
# Create and maintain a branch for version 1.x updates
git checkout -b v1-maintenance
git push origin v1-maintenance

# Main branch for 2.x
git checkout main
```

:::caution[Avertissement]
N'envoyez jamais à une app 1.x un bundle qui dépend d'APIs natives uniquement présentes en 2.x.
:::

## 4. Uploader vers le bon canal

```bash
# Updates for 1.x apps
git checkout v1-maintenance
npx @capgo/cli bundle upload --channel production

# Updates for 2.x apps
git checkout main
npx @capgo/cli bundle upload --channel v2
```

## 5. Autoriser l'auto-assignment si nécessaire

```bash
npx @capgo/cli channel set v2 --self-assign
```

## 6. Publier la version store

Publiez la version 2.0.0. Les utilisateurs qui installent cette version basculent automatiquement sur `v2` grâce à `defaultChannel`.

:::note[Remarque]
Aucun changement runtime supplémentaire n'est nécessaire si `defaultChannel` est déjà embarqué dans le binaire.
:::

## Passage aux versions suivantes

Pour 3.0.0:

```bash
# Create channel for version 3.x
npx @capgo/cli channel create v3
```

```ts
// capacitor.config.ts for version 3.0.0
const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3'
    }
  }
};
```

Vous obtenez alors un routage clair:

- `production` -> utilisateurs 1.x
- `v2` -> utilisateurs 2.x
- `v3` -> utilisateurs 3.x

## 7. Nettoyage après migration

Quand la base utilisateur 1.x est négligeable:

1. retirez `defaultChannel` des futurs binaires si nécessaire
2. supprimez les canaux/branches obsolètes

```bash
npx @capgo/cli channel delete v2
```

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip[Conseil]
Gardez une convention stricte canal <-> version majeure pour éviter les erreurs de diffusion.
:::

:::caution[Avertissement]
Testez chaque bundle dans le canal cible avant promotion.
:::

:::note[Remarque]
Supprimer un canal dont certains appareils ont encore l'override force un retour au canal de fallback selon vos règles de sélection.
:::

## Maintenir les mises à jour 1.x

Pour continuer à corriger la 1.x:

1. basculez sur `v1-maintenance`
2. appliquez des changements compatibles 1.x
3. uploadez sur `production`

```bash
git checkout v1-maintenance
git add .
git commit -m "Fix for v1.x"
git push origin v1-maintenance
npx @capgo/cli bundle upload --channel production
```

:::tip[Conseil]
Ne mergez pas des changements cassants de `main` dans la branche 1.x.
:::
