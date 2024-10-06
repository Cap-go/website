---
slug: vue-mobile-app-capacitor
title: Création d'applications mobiles avec Vue et Capacitor
description: >-
  Apprenez à créer une application mobile à l'aide de Vue, Capacitor et,
  éventuellement, à améliorer l'interface utilisateur avec Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Illustration de la vue et du condensateur
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dans ce didacticiel, nous vous guiderons tout au long du processus de conversion d'une application Web Vue en une application mobile native à l'aide de Capacitor. En option, vous pouvez également améliorer votre interface utilisateur mobile avec Konsta UI, une bibliothèque d'interface utilisateur mobile basée sur Tailwind CSS.

## À propos du condensateur

Capacitor est un outil révolutionnaire qui vous permet de l'intégrer facilement dans n'importe quel projet Web et de convertir votre application en une application mobile native. Il génère pour vous des projets Xcode et Android Studio natifs et donne accès aux fonctionnalités natives de l'appareil telles que la caméra via un script JavaScript. pont

## Préparer votre application Vue

Tout d'abord, créez une nouvelle application Vue en exécutant la commande suivante :

```shell
vue create my-app
cd my-app
npm install
```

Pour préparer votre application Vue pour un déploiement mobile natif, vous devrez exporter votre projet. Ajoutez un script dans votre fichier **packagejson** pour créer et copier le projet Vue :

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Après avoir exécuté la commande `build`, vous devriez voir un nouveau dossier `dist` dans le répertoire racine de votre projet. Ce dossier sera utilisé par Capacitor plus tard

## Ajout d'un condensateur à votre application Vue

Pour convertir votre application Web Vue en conteneur mobile natif, procédez comme suit :

1 Installez la CLI Capacitor en tant que dépendance de développement et configurez-la dans votre projet. Acceptez les valeurs par défaut pour le nom et l'ID du bundle lors de la configuration.

2 Installez le package principal et les packages appropriés pour les plateformes iOS et Android

3 Ajoutez les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de votre projet :

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

Vous devriez maintenant voir les nouveaux dossiers **iOS** et **android** dans votre projet Vue

Mettez à jour le fichier **capacitorconfigjson** pour faire pointer **webDir** vers le résultat de votre commande build :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Maintenant, vous pouvez créer votre projet Vue et le synchroniser avec Capacitor :

```shell
npm run build
npx cap sync
```

## Créer et déployer des applications natives

Pour développer des applications iOS, vous devez installer Xcode et pour les applications Android, vous devez installer Android Studio. De plus, vous devez vous inscrire au programme pour développeurs Apple pour iOS et à la console Google Play pour Android pour distribuer votre application sur l'App Store.

Utilisez la CLI Capacitor pour ouvrir les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Déployez votre application sur un appareil connecté à l'aide d'Android Studio ou de Xcode

## Rechargement en direct du condensateur

Activez le rechargement en direct sur votre appareil mobile en demandant à l'application Capacitor de charger le contenu à partir d'une URL spécifique sur votre réseau.

Trouvez votre adresse IP locale et mettez à jour le fichier « condensateurconfigts » avec l'adresse IP et le port corrects :

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

Appliquez ces modifications en les copiant dans votre projet natif :

```shell
npx cap copy
```

Désormais, votre application se rechargera automatiquement et affichera les modifications lorsque vous mettrez à jour votre application Vue.

## Utilisation des plugins de condensateur

Installez un plugin Capacitor, tel que le plugin Share, et utilisez-le dans votre application Vue :

```shell
npm i @capacitor/share
```

Importez le package et appelez la fonction `share()` dans votre application :

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

Après avoir installé de nouveaux plugins, exécutez la commande « sync » et redéployez l'application sur votre appareil :

```
npx cap sync
```

## Ajout de l'interface utilisateur de Konsta

Pour utiliser Konsta UI dans votre application Vue, vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/guides/vite/#vue) et installer le package :
Pour utiliser Konsta UI dans votre application Vue, installez le package et modifiez votre fichier `tailwindconfigjs` :

```shell
npm i konsta
```

Enveloppez votre application avec le composant `App` dans le fichier `pages/_appvue` et utilisez les composants Konsta UI Vue dans vos pages Vue

## Conclusion

Capacitor est une excellente option pour créer des applications natives basées sur un projet Web existant. Avec l'ajout de Capgo, il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant ainsi que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Découvrez comment Capgo peut vous aider à créer de meilleures applications plus rapidement, [créez un compte gratuit](/register/) dès aujourd'hui