---
title: "Changements incompatibles"
description: "Comment gérer les changements incompatibles avec des canaux versionnés"
locale: fr
sidebar:
  order: 6
---

Cette documentation explique comment gérer les changements incompatibles dans votre application en utilisant des canaux versionnés. Cette approche vous permet de maintenir différentes versions de votre application tout en garantissant que les utilisateurs reçoivent des mises à jour compatibles.

## Scénario d'exemple

Disons que vous avez :
- Version de l'application 1.2.3 (ancienne version) - utilise le canal production
- Version de l'application 2.0.0 (nouvelle version avec changements incompatibles) - utilise le canal v2
- Mise à jour en direct 1.2.4 (compatible avec 1.2.3)
- Mise à jour en direct 2.0.1 (compatible avec 2.0.0)

## Stratégie : Toujours utiliser defaultChannel pour les versions majeures

**Approche recommandée :** Définissez un `defaultChannel` pour chaque version majeure. Cela garantit que vous pouvez toujours envoyer des mises à jour à des groupes d'utilisateurs spécifiques sans dépendre de l'attribution dynamique de canal.

```ts
// Versions 1.x
defaultChannel: 'v1'

// Versions 2.x
defaultChannel: 'v2'

// Versions 3.x (futures)
defaultChannel: 'v3'
```

:::tip
**Avantages de cette approche :**
- **Toujours avoir le contrôle** sur quels utilisateurs reçoivent les mises à jour
- **Pas de changement dynamique de canal** nécessaire dans le code de votre application
- **Séparation claire** entre les différentes versions d'application
- **Flexibilité** pour envoyer des mises à jour à n'importe quel groupe de version spécifique
:::

## 1. Créer un canal pour la nouvelle version

```bash
# Créer un canal pour la version 2.x
npx @capgo/cli channel create v2
```

## 2. Mettre à jour la configuration Capacitor pour la version 2.0.0

Mettez à jour votre configuration Capacitor avant de compiler la version 2.0.0 pour l'app store :

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... autres options
      defaultChannel: 'v2' // Tous les utilisateurs de 2.0.0 utiliseront le canal v2
    }
  }
};

export default config;
```

:::note
**Pour la version 1.x :** Si vous n'avez pas défini de `defaultChannel` initialement, les utilisateurs de la version 1.x sont sur le canal `production`. Pour les futures versions majeures, définissez toujours un canal spécifique comme `v3`, `v4`, etc.
:::

## 3. Gérer des branches de code séparées

Créez des branches git séparées pour maintenir la compatibilité entre les versions de l'application :

```bash
# Créer et maintenir une branche pour les mises à jour de la version 1.x
git checkout -b v1-maintenance
git push origin v1-maintenance

# Votre branche main continue avec le développement de la version 2.x
git checkout main
```

:::warning
**Critique :** Ne poussez jamais de bundles JavaScript vers des anciennes applications qui attendent du code/API natif qu'elles n'ont pas. Compilez toujours les mises à jour depuis la branche appropriée :
- **branche v1-maintenance** : Pour les mises à jour vers les applications 1.x (canal production)
- **branche main** : Pour les mises à jour vers les applications 2.x (canal v2)
:::

## 4. Téléverser les bundles vers les canaux respectifs

```bash
# Pour les mises à jour 1.x : Compiler depuis la branche v1-maintenance
git checkout v1-maintenance
# Faites vos modifications compatibles 1.x ici
npx @capgo/cli bundle upload --channel production

# Pour les mises à jour 2.x : Compiler depuis la branche main
git checkout main
# Faites vos modifications 2.x ici
npx @capgo/cli bundle upload --channel v2
```

## 5. Activer l'auto-attribution

```bash
# Autoriser les applications à s'auto-attribuer au canal v2
npx @capgo/cli channel set v2 --self-assign
```

## 6. Déployer sur l'App Store

Compilez et déployez la version 2.0.0 sur l'app store. Tous les utilisateurs qui téléchargent cette version (que ce soit de nouveaux utilisateurs ou des utilisateurs existants qui mettent à niveau) utiliseront automatiquement le canal v2 car il est configuré dans le bundle de l'application.

:::note
**Aucun changement de code nécessaire !** Puisque `defaultChannel: 'v2'` est intégré à la version de l'app store, tous les utilisateurs téléchargeant la version 2.0.0 utiliseront automatiquement le canal correct.
:::

## Évolution vers les versions futures

Lorsque vous publiez la version 3.0.0 avec plus de changements incompatibles :

```bash
# Créer un canal pour la version 3.x
npx @capgo/cli channel create v3
```

```ts
// capacitor.config.ts pour la version 3.0.0
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // Utilisateurs de la version 3.x
    }
  }
};
```

Maintenant vous pouvez pousser des mises à jour vers n'importe quelle version :
- Canal `production` → Utilisateurs de la version 1.x
- Canal `v2` → Utilisateurs de la version 2.x
- Canal `v3` → Utilisateurs de la version 3.x

## 7. Nettoyage (après migration)

Une fois que tous les utilisateurs ont migré vers la version 2.x (comptez 3-4 mois) :

1. Supprimez `defaultChannel` de votre configuration Capacitor
2. Supprimez le canal v2 :

```bash
npx @capgo/cli channel delete v2
```

3. Supprimez la branche v1-maintenance :

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip
Cette approche garantit que les utilisateurs ne reçoivent que des mises à jour compatibles avec leur version d'application
:::

:::warning
Testez toujours les mises à jour soigneusement dans chaque canal avant le déploiement
:::

:::note
Vous pouvez supprimer en toute sécurité le canal v2 dans Capgo même si certains utilisateurs ont toujours la substitution de canal. Ils recevront automatiquement les mises à jour du canal production à la place.
:::

## Maintenir les mises à jour de la version 1.x

Pour envoyer des mises à jour compatibles avec la version 1.x :

1. Basculez vers la branche v1-maintenance :
```bash
git checkout v1-maintenance
```

2. Faites vos modifications et committez :
```bash
# Faites des modifications compatibles 1.x
git add .
git commit -m "Correction pour v1.x"
git push origin v1-maintenance
```

3. Compilez et téléversez vers le canal production :
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Gardez votre branche v1-maintenance à jour avec les corrections de bugs compatibles avec la version 1.x, mais ne fusionnez jamais les changements incompatibles de main
:::
