---
title: Mise à jour automatique
description: Comment utiliser l'auto-mise à jour avec capacitor-updater
sidebar:
  order: 2
locale: fr
---

Ce mode permet aux développeurs d'utiliser capacitor-updater en mode auto-update et de pousser des mises à jour via les canaux Capgo ou équivalents

### Prérequis

Assurez-vous que la version de votre application utilise [https://semverorg/](https://semverorg/) avant d'utiliser l'auto-update de Capgo

C'est la convention utilisée pour gérer les versions dans Capgo

Il y a deux façons de définir la version dans votre application :

Nouvelle méthode : Utilisez le champ `version` dans votre fichier `capacitorconfigjson`

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Active l'auto-update, true par défaut
      "appId": "comexampleapp", // Utilisé pour identifier l'app sur le serveur
      "version": "100" // Utilisé pour vérifier les mises à jour
    }
  }
}
```
Ces options seront utilisées par le plugin pour vérifier les mises à jour, et par le CLI pour télécharger la version

Ancienne méthode :
Dans 3 fichiers de votre projet :

* `packagejson` dans **version**
* `android/app/buildgradle` dans **versionName**
* `ios/App/Appxcodeproj/projectpbxproj` dans **CURRENT\_PROJECT\_VERSION**

### Tutoriels

Configurez votre application en 5 minutes

[Mettez à jour vos applications Capacitor de manière transparente avec capacitor updater](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Configurez votre CI en 5 minutes

[Build et release automatiques avec GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### Installation

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Introduction

Cliquez sur [register](https://capgoapp) pour créer votre compte

Le serveur vous permet de gérer les canaux, les versions et bien plus encore

`autoUpdate` utilisera les données de `capacitorconfig` pour identifier le serveur Capgo

:::note
Vous pouvez toujours utiliser Capgo Cloud sans envoyer votre code à notre serveur si cela n'est pas autorisé par votre entreprise
:::

#### Valider la version

Lorsque l'auto-update est configuré, vous devez notifier depuis JS que votre application est active et prête

Cela peut être fait en appelant `notifyAppReady` dans votre application

Faites-le dès que possible

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### Flux utilisateur
* L'utilisateur ouvre l'application, l'application interroge le serveur pour vérifier les mises à jour, si des mises à jour sont trouvées, elles seront téléchargées en arrière-plan
* L'utilisateur quitte l'application, la nouvelle version est définie comme active
* L'utilisateur ouvre à nouveau l'application, nous chargeons la nouvelle version active et la définissons comme par défaut
* Si `notifyAppReady()` est appelé, lorsque l'utilisateur quitte l'application, l'ancienne version est supprimée
* L'utilisateur continue le flux normal de l'application jusqu'au prochain cycle de mise à jour

:::danger
⚠️ Ne pas appeler `notifyAppReady()` dans votre application marquera la version actuelle comme invalide et reviendra au bundle précédent valide ou d'origine
:::

#### Flux de développement

Lorsque vous développez de nouvelles fonctionnalités, assurez-vous de bloquer `autoUpdate`, car capgo écrasera constamment votre travail avec le dernier bundle de mise à jour
Définissez `autoUpdate` sur false dans votre configuration 
Si pour une raison quelconque vous êtes bloqué sur une mise à jour, vous pouvez supprimer l'application et la réinstaller
Assurez-vous de définir `autoUpdate` sur false dans votre configuration avant de le faire
Puis reconstruisez-la avec Xcode ou Android studio

Pour télécharger la version à chaque commit, configurez CI/CD avec ce guide

[Build et release automatiques avec GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### Événement Major Available

Lorsque `disableAutoUpdateBreaking` est défini sur true, vous pouvez écouter l'événement pour savoir quand l'application refuse de faire une mise à jour majeure

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable was fired', infoversion)
})
```