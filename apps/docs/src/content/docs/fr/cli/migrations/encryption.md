---
title: Encryption
description: >-
  Comment chiffrer vos données avec le chiffrement v2, sécuriser votre
  application et vous assurer que vous seul pouvez mettre à jour vos
  utilisateurs avec vos mises à jour
sidebar:
  order: 5
locale: fr
---
Cette documentation explique comment migrer vers le système de chiffrement v2. Apprenez-en davantage sur le système de chiffrement v2 dans le [article de blog](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing).

## 1. Créer une paire de clés

```bash
npx @capgo/cli key create
```

:::warning
Stockez la clé privée en toute sécurité. Ne le confiez jamais au contrôle de source et ne le partagez jamais avec des parties non fiables.
:::

Cette commande :
- Crée une nouvelle paire de clés dans votre application
- Supprime l'ancienne clé de votre configuration Capacitor
- Conserve les anciens fichiers clés pour une compatibilité ascendante

## 2. Mettre à jour la configuration Capacitor

Lorsque vous êtes invité à « Voulez-vous configurer le cryptage avec le nouveau canal afin de prendre en charge les anciennes applications et faciliter la migration ? », sélectionnez oui. Cela ajoute une nouvelle option `defaultChannel` à votre configuration Capacitor.

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

## 3. Télécharger le bundle sur une nouvelle chaîne

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

## 4. Activer l'auto-affectation

:::caution
Requis pour que l'option `defaultChannel` fonctionne
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

## 5. Télécharger sur l'ancienne chaîne

```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
La configuration Capacitor n'est jamais téléchargée sur Capgo
:::

## 6. Nettoyage (après 3-4 mois)

Une fois que tous les utilisateurs ont mis à jour leurs applications :

1. Supprimez `defaultChannel` de votre configuration Capacitor
2. Supprimez l'ancienne chaîne :

```bash
npx @capgo/cli channel delete encryption_v2
```

:::note
Les applications utilisant `encryption_v2` par défaut passeront au canal `production` après la suppression.
:::
