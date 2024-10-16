---
slug: vue-mobile-app-capacitor
title: Développer des applications mobiles avec Vue et Capacitor
description: >-
  Découvrez comment créer une application mobile avec Vue et Capacitor et,
  facultativement, améliorer l'interface utilisateur avec Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Illustration de Vue et Capacitor
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dans ce tutoriel, nous vous guiderons à travers le processus de conversion d'une application web Vue en une application mobile native en utilisant Capacitor. Facultativement, vous pouvez également améliorer votre interface utilisateur mobile avec Konsta UI, une bibliothèque d'interface utilisateur mobile basée sur Tailwind CSS.

## À propos de Capacitor

Capacitor est un outil révolutionnaire qui vous permet de l'intégrer facilement dans n'importe quel projet web et de convertir votre application en une application mobile native. Il génère des projets Xcode et Android Studio natifs pour vous et donne accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JavaScript.

## Préparation de votre application Vue

Tout d'abord, créez une nouvelle application Vue en exécutant la commande suivante :

```shell
vue create my-app
cd my-app
npm install
```

Pour préparer votre application Vue au déploiement mobile natif, vous devrez exporter votre projet. Ajoutez un script dans votre fichier **package.json** pour construire et copier le projet Vue :

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Après avoir exécuté la commande `build`, vous devriez voir un nouveau dossier `dist` dans le répertoire racine de votre projet. Ce dossier sera utilisé par Capacitor plus tard.

## Ajout de Capacitor à votre application Vue

Pour convertir votre application web Vue en un conteneur mobile natif, suivez ces étapes :

1. Installez le CLI Capacitor en tant que dépendance de développement et configurez-le dans votre projet. Acceptez les valeurs par défaut pour le nom et l'ID du bundle lors de la configuration.

2. Installez le package principal et les packages pertinents pour les plateformes iOS et Android.

3. Ajoutez les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de votre projet :

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Vous devriez maintenant voir de nouveaux dossiers **iOS** et **android** dans votre projet Vue.

Mettez à jour le fichier **capacitor.config.json** pour que le **webDir** pointe vers le résultat de votre commande de build :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Maintenant, vous pouvez construire votre projet Vue et le synchroniser avec Capacitor :

```shell
npm run build
npx cap sync
```

## Construction et déploiement des applications natives

Pour développer des applications iOS, vous avez besoin de Xcode installé, et pour les applications Android, vous avez besoin d'Android Studio installé. De plus, vous devez vous inscrire au programme Apple Developer pour iOS et à la Google Play Console pour Android afin de distribuer votre application sur l'app store.

Utilisez le CLI Capacitor pour ouvrir les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Déployez votre application sur un appareil connecté en utilisant Android Studio ou Xcode.

## Rechargement en direct de Capacitor

Activez le rechargement en direct sur votre appareil mobile en faisant charger le contenu de l'application Capacitor à partir d'une URL spécifique sur votre réseau.

Trouvez votre adresse IP locale et mettez à jour le fichier `capacitor.config.ts` avec l'IP et le port corrects :

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

Appliquez ces changements en les copiant sur votre projet natif :

```shell
npx cap copy
```

Maintenant, votre application se rechargera automatiquement et affichera les changements lorsque vous mettrez à jour votre application Vue.

## Utilisation des plugins Capacitor

Installez un plugin Capacitor, comme le plugin Share, et utilisez-le dans votre application Vue :

```shell
npm i @capacitor/share
```

Importez le package et appelez la fonction `share()` dans votre application :

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
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

Après avoir installé de nouveaux plugins, exécutez la commande `sync` et redéployez l'application sur votre appareil :

```
npx cap sync
```

## Ajout de Konsta UI

Pour utiliser Konsta UI dans votre application Vue, vous devez avoir [tailwind déjà installé](https://tailwindcss.com/docs/guides/vite/#vue) et installer le package :
Pour utiliser Konsta UI dans votre application Vue, installez le package et modifiez votre fichier `tailwind.config.js` :

```shell
npm i konsta
```

Enveloppez votre application avec le composant `App` dans le fichier `pages/_app.vue`, et utilisez les composants Vue de Konsta UI dans vos pages Vue.

## Conclusion

Capacitor est une excellente option pour construire des applications natives basées sur un projet web existant. Avec l'ajout de Capgo, il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Découvrez comment Capgo peut vous aider à construire de meilleures applications plus rapidement, [inscrivez-vous pour un compte gratuit](/register/) aujourd'hui.