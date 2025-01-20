---
slug: fr__live-update-with-quasar-and-capacitor
title: >-
  Création d'applications mobiles avec mises à jour en direct, Quasar et
  Capacitor.
description: >-
  Comment créer une application mobile avec Quasar et Capacitor et déployer des
  mises à jour en direct.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Illustration de Quasar et Capgo
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dans ce tutoriel, nous commencerons par créer une nouvelle application web en utilisant [Quasar](https://quasar.dev/). Plus tard, nous apprendrons comment la transformer en une application mobile en utilisant Capacitor. Si vous voulez rendre votre application plus attrayante sur mobile.

Avec Capacitor, vous pouvez transformer votre application web Quasar en une application mobile sans avoir besoin de faire beaucoup de choses compliquées ou d'apprendre une toute nouvelle façon de créer des applications comme vous le feriez avec quelque chose appelé React Native.

Ce tutoriel vous guidera à travers le processus, en commençant par une nouvelle application Quasar, puis en incorporant Capacitor pour passer dans le domaine des applications mobiles natives. De plus, vous utiliserez [Capgo](https://capgo.app/) pour envoyer des mises à jour en direct à votre application en quelques secondes.

## À propos de Capacitor

Capacitor est vraiment révolutionnaire ! Vous pouvez l'intégrer sans effort dans n'importe quel projet web, et il enveloppera votre application dans une webview native, générant le projet natif Xcode et Android Studio pour vous. De plus, ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API légère et ses fonctionnalités rationalisées en font un jeu d'enfant à intégrer dans votre projet. Croyez-moi, vous serez étonné de la facilité avec laquelle vous obtiendrez une application native entièrement fonctionnelle avec Capacitor !

## Préparation de votre application Quasar

Pour créer une nouvelle application Quasar, exécutez la commande suivante :

```shell
npm init quasar
```

![Configuration du projet Quasar](/quasar-setup.webp)

Choisissez l'option "App with Quasar CLI" puis "Quasar v2".

Afin de créer une application mobile native, nous avons besoin d'une **exportation** de notre projet. Ainsi, ajoutons un script simple dans notre **package.json** qui peut être utilisé pour construire et copier le projet Quasar :

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Après avoir exécuté la commande `generate`, vous devriez pouvoir repérer un nouveau dossier `dist` à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement.

## Ajout de Capacitor à votre application Quasar

Pour empaqueter n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande `sync`.

Tout d'abord, nous pouvons installer le [Capacitor CLI](https://capacitorjs.com/docs/cli/) en tant que dépendance de développement, puis le configurer dans notre projet. Pendant la configuration, vous pouvez appuyer sur "Entrée" pour accepter les valeurs par défaut pour le nom et l'ID du bundle.

Ensuite, nous devons installer le package principal et les packages pertinents pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Initialisation de Capacitor](/capacitor-init.webp)

À ce stade, vous devriez pouvoir observer de nouveaux dossiers **ios** et **android** dans votre projet Quasar.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer [Android Studio](https://developer.android.com/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developer.apple.com/xcode/).

De plus, vous devriez trouver un fichier **capacitor.config.ts** dans votre projet, qui contient quelques paramètres fondamentaux de Capacitor utilisés lors de la synchronisation. La seule chose à laquelle vous devez prêter attention est le **webDir**, qui doit pointer vers le résultat de votre commande de construction. Actuellement, il est inexact.

Pour rectifier cela, ouvrez le fichier **capacitor.config.json** et mettez à jour le **webDir** :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Vous pouvez l'essayer en exécutant les commandes suivantes :

```shell
npm run generate
npx cap sync
```

La première commande `npm run generate` construira simplement votre projet Quasar et copiera la construction statique, tandis que la seconde commande `npx cap sync` synchronisera tout le code web aux bons endroits des plateformes natives afin qu'il puisse être affiché dans une application.

De plus, la commande sync peut mettre à jour les plateformes natives et installer des plugins, donc lorsque vous installez de nouveaux [plugins Capacitor](https://capacitorjs.com/docs/plugins/), il est temps d'exécuter à nouveau `npx cap sync`.Sans s'en rendre compte, vous avez maintenant terminé, alors voyons l'application sur un appareil !

## Construire et déployer des applications natives

Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au programme Apple Developer pour iOS et à la Google Play Console pour Android.

Si vous êtes nouveau dans le développement mobile natif, vous pouvez utiliser l'interface de ligne de commande de Capacitor pour ouvrir facilement les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois que vous avez configuré vos projets natifs, déployer votre application sur un appareil connecté est facile. Dans Android Studio, vous devez simplement attendre que tout soit prêt, et vous pouvez déployer votre application sur un appareil connecté sans modifier aucun paramètre. Voici un exemple :

![android-studio-run](/android-studio-run.webp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un appareil réel au lieu du simulateur. Si vous ne l'avez jamais fait auparavant, Xcode vous guide tout au long du processus (mais encore une fois, vous devez être inscrit au programme Developer). Après cela, vous pouvez simplement appuyer sur play pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-run.webp)

Félicitations ! Vous avez réussi à déployer votre application web Quasar sur un appareil mobile. Voici un exemple :

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

Mais attendez, il existe également une façon plus rapide de le faire pendant le développement.

## Mise à jour en direct Capgo

La mise à jour en direct Capgo est un service qui permet aux développeurs de déployer des mises à jour sur leurs applications mobiles sans passer par le processus traditionnel de soumission à l'App Store. Cela peut être un moyen pratique de corriger rapidement des bugs ou d'apporter de petites mises à jour à une application sans attendre le processus de révision de l'App Store.

L'intégration de Capgo dans votre application Quasar est un processus simple qui vous permet d'exploiter la puissance des mises à jour en direct en temps réel. Ce guide étape par étape vous guidera à travers l'intégration et la mise en œuvre de la mise à jour en direct Capgo, vous permettant de livrer des mises à jour sans interruption.

**Inscrivez-vous et accédez au tableau de bord Capgo** :

Il est temps de s'inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [vous inscrire pour un compte Capgo](https://web.capgo.app/register/)

**Installez le SDK Capgo** :

Depuis une ligne de commande, directement à la racine de votre application Capacitor, exécutez :

`npm i @capgo/capacitor-updater && npx cap sync` pour installer le plugin dans votre application Capacitor

Puis ajoutez à votre application ce code en remplacement de celui de CodePush :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela indiquera au plugin natif que l'installation a réussi.

**Connectez-vous à Capgo CLOUD** :

Tout d'abord, utilisez la [clé API](https://web.capgo.app/dashboard/apikeys/) `all` présente dans votre compte pour vous connecter avec la CLI :

    `npx @capgo/cli@latest login VOTRE_CLE`

**Ajoutez votre première application** :

Commençons par créer une application dans Capgo Cloud avec la CLI

```shell
    npx @capgo/cli@latest app add
```
Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application.

**Téléchargez votre première version** :

Exécutez la commande pour construire votre code et l'envoyer à Capgo avec :

```shell
npx @capgo/cli@latest bundle upload`
```

Par défaut, le nom de la version sera celui de votre fichier package.json.

Vérifiez dans [Capgo](https://web.capgo.app/login/) si la construction est présente.

Vous pouvez même la tester avec mon [application mobile sandbox](https://capgo.app/app_mobile/)

**Rendez le canal par défaut** :

Après avoir envoyé votre application à Capgo, vous devez rendre votre canal par défaut pour permettre aux applications de recevoir des mises à jour de Capgo.

`npx @capgo/cli@latest channel set production -s default`

**Configurez l'application pour valider les mises à jour** :

Ajoutez cette configuration à votre fichier JavaScript principal

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Puis faites un `npm run build && npx cap copy` pour mettre à jour votre application.

**Recevez une mise à jour en direct** :

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devrez exécuter l'application sur un appareil ou un émulateur. La façon la plus simple de le faire est simplement d'utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté à votre ordinateur.npx cap run [ios | android]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les logs que l'application a effectué la mise à jour.

Félicitations ! 🎉 Vous avez déployé avec succès votre première mise à jour en direct. Ce n'est que le début de ce que vous pouvez faire avec les mises à jour en direct. Pour en savoir plus, consultez la [documentation complète sur les mises à jour en direct](https://capgoapp/docs/plugin/cloud-mode/getting-started/)

## Utilisation des plugins Capacitor

Examinons comment utiliser un plugin Capacitor en action, dont nous avons déjà parlé plusieurs fois. Pour ce faire, nous pouvons installer un plugin assez simple en exécutant :

```shell
npm i @capacitor/share
```

Il n'y a rien de particulier dans le [plugin Share](https://capacitorjscom/docs/apis/share/), mais il ouvre quand même la boîte de dialogue de partage native ! Pour cela, nous n'avons maintenant qu'à importer le package et appeler la fonction `share()` correspondante depuis notre application. Modifions donc le fichier **pages/indexvue** comme suit :

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation, puis redéployer l'application sur notre appareil. Pour ce faire, exécutez la commande suivante :

```
npx cap sync
```

Après avoir appuyé sur le bouton, vous pouvez voir la magnifique boîte de dialogue de partage native en action !

## Ajout optionnel de Konsta UI

Pour utiliser Konsta UI dans votre application Quasar, vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/installation/) et installer le package :

```shell
npm i konsta
```

De plus, vous devez modifier votre fichier `tailwindconfigjs` :

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` étendra la configuration Tailwind CSS par défaut (ou votre configuration personnalisée) avec quelques variantes supplémentaires et des utilitaires d'aide nécessaires pour Konsta UI.

Maintenant, nous devons configurer le composant principal [App](https://konstauicom/vue/app/) afin de pouvoir définir certains paramètres globaux (comme le `theme`).

Nous devons envelopper toute l'application avec `App` dans le fichier `pages/_appvue` :

```html
<template>
  <App theme="ios">
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants Vue de Konsta UI dans nos pages Quasar.

Par exemple, ouvrons `pages/indexvue` et modifions-le comme suit :

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Quasar & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

Si le rechargement en direct n'est pas synchronisé après l'installation de tous les composants nécessaires, essayez de tout redémarrer. Une fois que vous aurez fait cela, vous devriez voir une application mobile avec un aspect quelque peu natif, construite avec Quasar et Capacitor !

## Conclusion

Capacitor est une excellente option pour créer des applications natives basées sur un projet web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente.

Et avec l'ajout de [Capgo](https://capgoapp/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez apprendre comment ajouter Capgo à votre application Nextjs, consultez l'article suivant :