---
title: De la V2 à la V3
description: >-
  Un guide complet sur la transition de la version 2 à la version 3 du programme
  de mise à jour Capgo, détaillant les étapes et considérations nécessaires pour
  un processus de mise à niveau réussi.
sidebar:
  order: 4
locale: fr
---
Cette documentation expliquera comment mettre à niveau vers la version 3 de la mise à jour automatique.

## Commencez par migrer vers le dernier outillage :

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Supprimez toutes vos configurations précédentes :

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https...",
      ...
  },
}
```

pour laisser seulement ceci:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ Si vous utilisiez votre serveur, avec `autoUpdateURL`, je mettrai bientôt à jour ce guide pour vous. En attendant, jetez un œil à la nouvelle option de téléchargement `external` qui vous permet d'envoyer uniquement le lien de votre zip, pas le code dans le cloud Capgo. Ceci a été conçu pour les entreprises ayant des politiques de confidentialité strictes. En mode externe, le code n'atteindra jamais sur le serveur Capgo, nous stockons simplement l'URL et l'envoyons à l'appareil, qui le téléchargera directement. De manière standard, le code est compressé et stocké sur notre serveur, mais nous ne l'ouvrirons ni ne l'utiliserons jamais non plus.

## Quel changement

Toutes les configurations deviennent côté serveur pour la mise à jour automatique, afin de vous donner plus de contrôle sur la manière dont vous envoyez une mise à jour aux utilisateurs.

Cela nous permet de revenir, voire de déployer, sur un seul utilisateur avec des canaux ! Ces paramètres sont réajoutés à l'interface Web :

* désactiver le retour sous natif
* désactiver la mise à jour ci-dessus majeure

> ⚠️ Ils deviendront vrais par défaut pour toutes les chaînes

Cela supprimera également le besoin de mettre à jour souvent le plugin, la plupart des mises à jour seront effectuées côté serveur et vous l'obtiendrez sans aucun changement de votre côté.

> ⚠️ Réinitialiser lorsqu'une mise à jour devient la mise à jour par défaut, donc si vous préférez ne pas supprimer toutes les versions téléchargées lors de la mise à jour depuis le store, procédez comme suit :

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Mettez à jour votre code

Enfin, mettez à jour toutes vos importations dans JS depuis :

```
import { CapacitorUpdater } from 'capacitor-updater'
```

à

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Ensuite, reconstruisez votre code `npm run build` et copiez à nouveau les actifs `npx cap copy`.

Vous devriez pouvoir maintenant tester le dernier système de mise à jour automatique

Envoyez votre version avec :

```
npx @capgo/cli@latest bundle upload
```

au lieu de

```
npx capgo upload
```

## Evolution future

Pour l'instant, seule la première chaîne publique est utilisée. À l'avenir, la chaîne publique changera pour plusieurs chaînes publiques, si plusieurs chaînes sont définies.

## Problèmes courants :

* Problème de build après la mise à niveau : si vous avez déjà ouvert le code source du plugin dans le studio Android ou Xcode, parfois la synchronisation ne les supprime pas, c'est la cause du problème. Ouvrez l'IDE natif et supprimez `capacitor-updater` à la main et faites `npx cap sync` cela devrait résoudre.
