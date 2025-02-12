---
slug: fr__building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: Créer des applications mobiles avec Nuxt 3 et Capacitor
description: >-
  Comment créer une application mobile avec Nuxt 3, Capacitor et implémenter une
  interface utilisateur native avec Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Illustration de Nuxt 3 et Capgo
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dans ce tutoriel, nous allons commencer avec une nouvelle application [Nuxt 3](https://nuxtjsorg/) et passer au domaine natif en utilisant Capacitor, puis éventuellement ajouter [Konsta UI](https://konstauicom/) pour une interface mobile améliorée avec Tailwind CSS, bien que cette dernière étape soit totalement facultative.

En utilisant Capacitor, vous pouvez facilement convertir votre application web Nuxt 3 en une application mobile native sans nécessiter de modifications importantes ou d'apprentissage d'une nouvelle compétence comme React Native.

Avec seulement quelques étapes simples, la plupart des applications Nuxt 3 peuvent être transformées en applications mobiles.

Ce tutoriel vous guidera à travers le processus, en commençant par une nouvelle application Nuxt 3, puis en incorporant Capacitor pour passer au domaine des applications mobiles natives. De plus, vous pouvez éventuellement utiliser [Konsta UI](https://konstauicom/) pour améliorer votre interface mobile avec Tailwind CSS.

## À propos de Capacitor

Capacitor est vraiment révolutionnaire ! Vous pouvez l'intégrer sans effort dans n'importe quel projet web, et il enveloppera votre application dans une webview native, générant pour vous le projet natif Xcode et Android Studio. De plus, ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API épurée et sa fonctionnalité rationalisée en font un jeu d'enfant à intégrer dans votre projet. Croyez-moi, vous serez étonné de voir à quel point il est facile d'obtenir une application native entièrement fonctionnelle avec Capacitor !

## Préparer votre application Nuxt 3

Pour créer une nouvelle application Nuxt 3, exécutez la commande suivante :

```shell
npx nuxi init my-app
cd my-app
npm install
```

Choisissez "Nuxt 3" lorsqu'on vous demande la version de Nuxt.

Pour créer une application mobile native, nous avons besoin d'une **exportation** de notre projet. Ajoutons donc un script simple dans notre **packagejson** qui peut être utilisé pour construire et copier le projet Nuxt :

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Après avoir exécuté la commande `generate`, vous devriez pouvoir repérer un nouveau dossier `dist` à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement.

## Ajouter Capacitor à votre application Nuxt 3

Pour empaqueter n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande `sync`.

Tout d'abord, nous pouvons installer le [CLI de Capacitor](https://capacitorjscom/docs/cli/) comme dépendance de développement, puis le configurer dans notre projet. Pendant la configuration, vous pouvez appuyer sur "entrée" pour accepter les valeurs par défaut pour le nom et l'ID du bundle.

Ensuite, nous devons installer le package core et les packages pertinents pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

À ce stade, vous devriez pouvoir observer de nouveaux dossiers **ios** et **android** dans votre projet Nuxt 3.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer [Android Studio](https://developerandroidcom/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developerapplecom/xcode/).

De plus, vous devriez trouver un fichier **capacitorconfigts** dans votre projet, qui contient quelques paramètres fondamentaux de Capacitor utilisés pendant la synchronisation. La seule chose à laquelle vous devez prêter attention est le **webDir**, qui doit pointer vers le résultat de votre commande de build. Actuellement, il est inexact.

Pour rectifier cela, ouvrez le fichier **capacitorconfigjson** et mettez à jour le **webDir** :

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

La première commande `npm run generate` construira simplement votre projet Nuxt 3 et copiera la build statique, tandis que la seconde commande `npx cap sync` synchronisera tout le code web aux bons endroits des plateformes natives afin qu'ils puissent être affichés dans une application.

De plus, la commande sync peut mettre à jour les plateformes natives et installer des plugins, donc lorsque vous installez de nouveaux [plugins Capacitor](https://capacitorjscom/docs/plugins/), il est temps d'exécuter à nouveau `npx cap sync`.Sans vous en rendre compte, vous avez maintenant terminé, alors voyons l'application sur un appareil !

## Construire et déployer des applications natives

Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au programme Apple Developer pour iOS et à la Google Play Console pour Android.

Si vous êtes nouveau dans le développement mobile natif, vous pouvez utiliser le CLI de Capacitor pour ouvrir facilement les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois que vous avez configuré vos projets natifs, déployer votre application sur un appareil connecté est facile. Dans Android Studio, vous devez simplement attendre que tout soit prêt, et vous pouvez déployer votre application sur un appareil connecté sans changer de paramètres. Voici un exemple :

![android-studio-run](/android-studio-run.webp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un vrai appareil plutôt que sur le simulateur. Si vous ne l'avez jamais fait auparavant, Xcode vous guide à travers le processus (mais encore une fois, vous devez être inscrit au Programme de Développeur). Après cela, vous pouvez simplement appuyer sur le bouton de lecture pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-run.webp)

Félicitations ! Vous avez réussi à déployer votre application web Nuxt 3 sur un appareil mobile. Voici un exemple :

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

Mais attendez, il existe également une manière plus rapide de le faire pendant le développement.

## Rechargement en direct de Capacitor

À ce stade, vous êtes probablement habitué à avoir le rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir la même fonctionnalité **sur un appareil mobile** avec un minimum d'effort !

Activez l'accès à votre application hébergée localement avec le rechargement en direct **sur votre réseau** en faisant charger à l'application Capacitor le contenu depuis l'URL spécifique.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez le découvrir en exécutant la commande suivante dans le terminal :

```shell
ipconfig getifaddr en0
```

Sur Windows, exécutez :

```shell
ipconfig
```

Ensuite, recherchez l'adresse IPv4.

Nous pouvons demander à Capacitor de charger l'application directement depuis le serveur en ajoutant une autre entrée à notre fichier `capacitor.config.ts` :

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Assurez-vous d'utiliser **l'IP et le port corrects**, j'ai utilisé le port par défaut de Nuxt 3 dans cet exemple.

Maintenant, nous pouvons appliquer ces changements en les copiant dans notre projet natif :

```shell
npx cap copy
```

La commande `copy` est similaire à `sync`, mais elle ne fera que **copier les changements apportés au dossier web** et à la configuration, sans mettre à jour le projet natif.

Vous pouvez maintenant déployer votre application une fois de plus via Android Studio ou Xcode. Après cela, si vous changez quelque chose dans votre application Nuxt, **l'application se rechargera automatiquement** et affichera les changements !

**Gardez à l'esprit** que si vous installez de nouveaux plugins tels que la caméra, cela nécessite toujours une reconstruction de votre projet natif. C'est parce que des fichiers natifs sont modifiés, et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port par défaut de Nuxt 3 à des fins de démonstration.

## Utilisation des plugins Capacitor

Jetons un coup d'œil à l'utilisation d'un plugin Capacitor en action, dont nous avons parlé plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin assez simple en exécutant :

```shell
npm i @capacitor/share
```

Il n'y a rien de fantaisiste dans le [plugin Share](https://capacitorjs.com/docs/apis/share/), mais il fait quand même apparaître la boîte de dialogue de partage native ! Pour cela, nous n'avons maintenant qu'à importer le package et appeler la fonction `share()` correspondante depuis notre application, alors changeons le fichier **pages/index.vue** comme ceci :

```html
<template>
  <div>
    <h1>Welcome to Nuxt 3 and Capacitor!</h1>
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

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation, puis redéployer l'application sur notre appareil.Pour effectuer cela, exécutez la commande suivante :

```
npx cap sync
```

Après avoir appuyé sur le bouton, vous pouvez voir la belle boîte de dialogue de partage native en action !

## Ajout de Konsta UI

Pour utiliser Konsta UI dans votre application Nuxt 3, vous devez avoir [tailwind déjà installé](https://tailwindcss.com/docs/guides/nuxtjs/) et installer le package :

```shell
npm i konsta
```

De plus, vous devez modifier votre fichier `tailwind.config.js` :

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

`konstaConfig` étendra la configuration Tailwind CSS par défaut (ou votre configuration personnalisée) avec quelques variantes supplémentaires et des utilitaires d'aide requis pour Konsta UI.

Maintenant, nous devons configurer le composant principal [App](https://konsta-ui.com/vue/app/) pour pouvoir définir certains paramètres globaux (comme `theme`).

Nous devons envelopper toute l'application avec `App` dans le fichier `pages/_app.vue` :

```html
<template>
  <App theme="ios">
    <Nuxt />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants Vue de Konsta UI dans nos pages Nuxt 3.

Par exemple, ouvrons `pages/index.vue` et modifions-le comme suit :

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 3 & Konsta UI app. Let's see what we have here.
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

Si le rechargement en direct est désynchronisé après l'installation de tous les composants nécessaires, essayez de tout redémarrer. Une fois que vous avez fait cela, vous devriez voir une application mobile avec un aspect quelque peu natif, construite avec Nuxt 3 et Capacitor !

Vous devriez voir la page suivante comme résultat :

<template>
  <div>
<h1>

## Conclusion

Capacitor est une excellente option pour construire des applications natives basées sur un projet web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente.

Et avec l'ajout de [Capgo](https://capgo.app/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez apprendre comment ajouter Capgo à votre application Nextjs, jetez un œil à l'article suivant :

## Crédits

Merci beaucoup à Simon, cet article est basé sur [cet article](https://devdactic.com/nextjs-and-capacitor/) réécrit pour nuxt3 avec chat-gpt-4 et adapté.