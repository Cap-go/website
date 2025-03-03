---
title: V2에서 V3로
description: Comment passer de la V2 à la V3
sidebar:
  order: 4
locale: fr
---

Cette documentation expliquera comment mettre à niveau vers la version 3 de l'auto-update

## D'abord migrer vers les derniers outils :

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Supprimez toute votre configuration précédente :

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

pour ne laisser que ceci :

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ Si vous utilisiez votre serveur avec `autoUpdateURL`, je mettrai à jour ce guide prochentiellement pour vous. En attendant, jetez un œil à la nouvelle option de téléchargement `external` qui vous permet d'envoyer uniquement le lien de votre zip, pas le code dans Capgo cloud. Cela a été conçu pour les entreprises ayant des politiques de confidentialité strictes. En mode externe, le code n'arrivera jamais sur le serveur Capgo, nous stockons uniquement l'URL et l'envoyons à l'appareil, qui le téléchargera directement. De manière standard, le code est compressé et stocké dans notre serveur, mais nous ne l'ouvrirons ni ne l'utiliserons jamais.

## Ce qui change

Toutes les configurations deviennent côté serveur pour l'auto-update, pour vous donner plus de contrôle sur la façon dont vous envoyez une mise à jour aux utilisateurs

Cela nous permet de revenir en arrière, même de déployer pour un seul utilisateur avec des canaux ! Ces paramètres sont ajoutés dans l'interface web :

* désactiver le retour en arrière sous la version native
* désactiver la mise à jour au-dessus de la version majeure

> ⚠️ Ils deviendront vrais par défaut pour tous les canaux

Cela supprimera également la nécessité de mettre à jour souvent le plugin, la plupart des mises à jour seront effectuées côté serveur, et vous les obtiendrez sans aucun changement de votre côté

> ⚠️ Réinitialisation lorsqu'une mise à jour devient la valeur par défaut, donc si vous préférez ne pas supprimer toutes les versions téléchargées lors de la mise à jour depuis le store, faites ceci :

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Mettez à jour votre code

Enfin, mettez à jour tous vos imports en JS de :

```
import { CapacitorUpdater } from 'capacitor-updater'
```

à

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Puis reconstruisez votre code `npm run build` et copiez les assets une fois de plus `npx cap copy`

Vous devriez maintenant pouvoir tester le dernier système d'auto-update

Envoyez votre version avec :

```
npx @capgo/cli@latest bundle upload
```

au lieu de 

```
npx capgo upload
```

## Évolutions futures

Pour l'instant, seul le premier canal public est utilisé, à l'avenir, public changera pour plusieurs canaux publics, si plus d'un est défini

## Problèmes courants :

* Problème de build après la mise à niveau : si vous avez déjà ouvert le code source du plugin dans Android Studio ou Xcode, parfois la synchronisation ne les supprime pas, c'est la cause du problème. Ouvrez l'IDE natif et supprimez `capacitor-updater` manuellement et faites `npx cap sync`, cela devrait résoudre le problème
