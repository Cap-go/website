---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  2025 Construire des applications mobiles natives avec Next.js 15 et Capacitor
  : Un guide étape par étape
description: >-
  Découvrez comment créer des applications mobiles natives en utilisant Next.js
  15 et Capacitor dans ce guide complet. Découvrez les meilleures pratiques et
  techniques les plus récentes pour construire des applications mobiles
  performantes et riches en fonctionnalités.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2025-05-12T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Illustration de Next.js 15 et Capacitor
keywords: >-
  Next.js 15, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
## Introduction

Dans ce tutoriel, nous allons explorer comment créer des applications mobiles natives en utilisant la puissante combinaison de [Next.js](https://nextjs.org/) 15 et [Capacitor](https://capacitorjs.com/) en 2024. En tirant parti des dernières versions de ces technologies, vous pouvez construire des applications mobiles performantes et riches en fonctionnalités avec facilité. Nous allons également vous montrer comment améliorer l'interface utilisateur mobile en utilisant [Konsta UI](https://konstaui.com/) et Tailwind CSS, bien que cette étape soit facultative.

Next.js, un framework React populaire, fournit une base solide pour construire des applications web, tandis que Capacitor vous permet de transformer votre application Next.js en une application mobile native sans modifications significatives ni besoin d'apprendre de nouvelles compétences comme React Native. Ce tutoriel vous guidera à travers le processus, en commençant par la configuration d'une nouvelle application Next.js et l'intégration de Capacitor pour créer une expérience mobile native.

### Avantages de l'utilisation de Next.js et Capacitor

- **Réutilisabilité du code** : Next.js vous permet d'écrire des composants réutilisables et de partager du code entre vos applications web et mobiles, ce qui vous fait gagner du temps et des efforts en développement.
- **Performance** : Next.js offre des optimisations de performance intégrées, telles que le rendu côté serveur et le fractionnement de code, garantissant des temps de chargement rapides et une expérience utilisateur fluide.
- **Capacités natives** : Capacitor fournit un accès aux fonctionnalités natives des appareils comme la caméra, la géolocalisation, et plus encore, vous permettant de construire des applications mobiles riches en fonctionnalités.
- **Développement simplifié** : Avec Capacitor, vous pouvez développer et tester votre application mobile en utilisant des technologies web familières, réduisant ainsi la courbe d'apprentissage et rationalisant le processus de développement.

## Préparation de votre application Next.js

Pour commencer, créons une nouvelle application Next.js en utilisant la commande `create-next-app` :

```shell
npx create-next-app@latest my-app
```

Cette commande mettra en place un projet Next.js vide avec la configuration recommandée pour la dernière version.

Ensuite, naviguez jusqu'au répertoire du projet :

```shell
cd my-app
```

Pour créer une application mobile native, nous devons générer une exportation statique de notre projet Next.js. Mettez à jour le fichier `package.json` pour inclure un script pour construire et exporter le projet :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

L'exécution de la commande `npm run static` peut entraîner des erreurs en raison d'une incompatibilité d'optimisation d'image. Pour résoudre ce problème, ouvrez le fichier `next.config.js` et modifiez-le comme suit :

```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Maintenant, l'exécution de `npm run static` devrait fonctionner sans problèmes, et vous trouverez un nouveau dossier `out` à la racine de votre projet. Ce dossier sera utilisé par Capacitor dans les prochaines étapes.

## Ajout de Capacitor à votre application Next.js 15

Pour empaqueter votre application Next.js dans un conteneur mobile natif, suivez ces étapes :

1. Installez le [Capacitor CLI](https://capacitorjs.com/docs/cli/) comme dépendance de développement :

```shell
npm install -D @capacitor/cli
```

2. Initialisez Capacitor dans votre projet Next.js :

```shell
npx cap init
```

Lors du processus d'initialisation, vous pouvez appuyer sur "Entrée" pour accepter les valeurs par défaut pour le nom de l'application et l'ID de bundle.

3. Installez les packages requis de Capacitor :

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Ajoutez les plateformes natives :

```shell
npx cap add ios
npx cap add android
```

Capacitor va créer des dossiers pour chaque plateforme (`ios` et `android`) à la racine de votre projet. Ces dossiers contiennent les projets natifs pour iOS et Android, respectivement.

Pour accéder et construire le projet Android, vous devez avoir [Android Studio](https://developer.android.com/studio) installé. Pour le développement iOS, vous avez besoin d'un Mac avec [Xcode](https://developer.apple.com/xcode/) installé.

5. Configurez Capacitor :

Ouvrez le fichier `capacitor.config.ts` et mettez à jour la propriété `webDir` pour pointer vers le répertoire de sortie de votre build Next.js :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. Construisez et synchronisez votre projet :

```shell
npm run static
npx cap sync
```

La commande `npm run static` construit votre projet Next.js et exporte les fichiers statiques, tandis que `npx cap sync` synchronise le code web avec les plateformes natives.

## Construction et déploiement d'applications natives

Pour construire et déployer votre application mobile native, suivez ces étapes :
Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour des applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au programme développeur Apple pour iOS et à la console Google Play pour Android.

1. Ouvrez les projets natifs :

Pour iOS :
```shell
npx cap open ios
```

Pour Android :
```shell
npx cap open android
```

2. Construisez et exécutez l'application :

![android-studio-run](/android-studio-run.webp)

- Dans Android Studio, attendez que le projet soit prêt, puis cliquez sur le bouton "Run" pour déployer l'application sur un appareil ou un émulateur connecté.
![xcode-run](/xcode-run.webp)

- Dans Xcode, configurez votre compte de signature pour déployer l'application sur un vrai appareil. Si vous ne l'avez pas fait auparavant, Xcode vous guidera à travers le processus (notez que vous devez être inscrit au programme développeur Apple). Une fois configuré, cliquez sur le bouton "Play" pour exécuter l'application sur votre appareil connecté.

Félicitations ! Vous avez réussi à déployer votre application web Next.js sur un appareil mobile.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Mais attendez, il y a aussi un moyen plus rapide de le faire pendant le développement...

## Recharge Live de Capacitor

Pendant le développement, vous pouvez tirer parti du rechargement en direct pour voir les changements instantanément sur votre appareil mobile. Pour activer cette fonctionnalité, suivez ces étapes :

1. Trouvez votre adresse IP locale :

- Sur macOS, exécutez la commande suivante dans le terminal :
  ```shell
  ipconfig getifaddr en0
  ```

- Sur Windows, exécutez :
  ```shell
  ipconfig
  ```
  Recherchez l'adresse IPv4 dans la sortie.

2. Mettez à jour le fichier `capacitor.config.ts` pour inclure la configuration du serveur :

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
};

export default config;
```

Remplacez `YOUR_IP_ADDRESS` par votre adresse IP locale.

3. Appliquez les changements à votre projet natif :

```shell
npx cap copy
```

La commande `copy` copie le dossier web et les modifications de configuration dans le projet natif sans mettre à jour tout le projet.

4. Reconstruisez et exécutez l'application sur votre appareil à l'aide d'Android Studio ou Xcode.

Désormais, chaque fois que vous apportez des modifications à votre application Next.js, l'application mobile se rechargera automatiquement pour refléter ces changements.

Remarque : Si vous installez de nouveaux plugins ou effectuez des modifications sur les fichiers natifs, vous devrez reconstruire le projet natif, car le rechargement en direct ne s'applique qu'aux modifications du code web.

## Utilisation des Plugins Capacitor

Les plugins Capacitor vous permettent d'accéder aux fonctionnalités natives des appareils depuis votre application Next.js. Explorons comment utiliser le [plugin Share](https://capacitorjs.com/docs/apis/share/) comme exemple :

1. Installez le plugin Share :

```shell
npm i @capacitor/share
```

2. Mettez à jour le fichier `pages/index.js` pour utiliser le plugin Share :

```javascript
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Share } from '@capacitor/share';

export default function Home() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Capgo!</a>
        </h1>

        <p className={styles.description}>
          <h2>Cool channel</h2>
          <button onClick={() => share()}>Share now!</button>
        </p>
      </main>
    </div>
  );
}
```

3. Synchronisez les changements avec le projet natif :

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation puis redéployer l'application sur notre appareil. Pour cela, exécutez la commande suivante :

```shell
npx cap sync
```

4. Reconstruisez et exécutez l'application sur votre appareil.

Maintenant, lorsque vous cliquez sur le bouton "Partager maintenant !", la boîte de dialogue de partage native apparaîtra, vous permettant de partager le contenu avec d'autres applications.

<div className={styles.container}>
  <Head>
<title>

Pour rendre le bouton plus convivial pour les mobiles, nous pouvons ajouter quelques styles en utilisant ma bibliothèque de composants UI préférée pour les applications web - Next.js (sans jeux de mots).

## Ajout de Konsta UI

J'ai travaillé des années avec [Ionic](https://ionicframework.com/) pour construire d'excellentes applications multiplateformes et cela a été un des meilleurs choix pendant des années. Mais maintenant, je ne le recommande plus, c'est très compliqué de l'intégrer avec Next.js et ce n'est pas vraiment valable lorsque vous avez déjà [tailwindcss](https://tailwindcss.com/).

Si vous voulez une interface utilisateur mobile vraiment élégante qui s'adapte à la mise en forme spécifique d'iOS et d'Android, je recommande Konsta UI.

Vous devez avoir [tailwind déjà installé](https://tailwindcss.com/docs/guides/nextjs/) 
Pour améliorer l'interface utilisateur mobile de votre application Next.js, vous pouvez utiliser [Konsta UI](https://konstaui.com/), une bibliothèque de composants UI adaptée aux mobiles qui s'adapte à la mise en forme iOS et Android. Suivez ces étapes pour intégrer Konsta UI :

1. Installez les packages requis :

```shell
npm i konsta
```

2. Mettez à jour le fichier `tailwind.config.js` :

```javascript
const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
```

3. Enveloppez votre application avec le composant `App` de Konsta UI dans `pages/_app.js` :

```javascript
import { App } from 'konsta/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```
### Exemple de Page

Maintenant que tout est configuré, nous pouvons utiliser les composants React de Konsta UI dans nos pages Next.js.

4. Mettez à jour le fichier `pages/index.js` pour utiliser les composants Konsta UI :

```javascript
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
} from 'konsta/react';

export default function Home() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your Next.js & Konsta UI app. Let's see what we have here.
        </p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem href="/about/" title="About" />
        <ListItem href="/form/" title="Form" />
      </List>

      <Block strong className="flex space-x-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Block>
    </Page>
  );
}
```

5. Redémarrez le serveur de développement et reconstruisez l'application.

Votre application Next.js devrait maintenant avoir une interface mobile à l'apparence native propulsée par Konsta UI.

## Optimisation des Performances

Pour garantir des performances optimales de votre application Next.js et Capacitor, considérez les meilleures pratiques suivantes :

- Minimisez la taille de l'application en supprimant les dépendances et les ressources non utilisées.
- Optimisez les images et les autres fichiers multimédias pour réduire les temps de chargement.
- Implémentez le chargement paresseux pour les composants et les pages afin d'améliorer la performance de chargement initial.
- Utilisez le rendu côté serveur (SSR) avec Next.js pour améliorer la vitesse de chargement de l'application et l'optimisation pour les moteurs de recherche (SEO).
- Profitez des optimisations intégrées de Capacitor, telles que la mise en cache de la vue web et le regroupement d'applications.

## Conclusion

Dans ce tutoriel, nous avons exploré comment créer des applications mobiles natives en utilisant Next.js et Capacitor. En tirant parti de la puissance de ces technologies, vous pouvez créer des applications mobiles performantes et riches en fonctionnalités avec facilité.

Nous avons couvert les étapes pour configurer une application Next.js, intégrer Capacitor, et construire et déployer l'application sur des appareils mobiles. De plus, nous avons discuté de l'utilisation des plugins Capacitor, de l'ajout de Konsta UI pour une interface mobile améliorée et des techniques d'optimisation des performances.

Pour amener votre application Next.js et Capacitor au niveau supérieur, envisagez d'explorer [Capgo](https://capgo.app/) pour des mises à jour en direct sans faille, garantissant à vos utilisateurs l'accès aux dernières fonctionnalités et corrections de bogues.

En suivant les meilleures pratiques et les techniques décrites dans ce guide, vous serez bien équipé pour construire d'impressionnantes applications mobiles natives en utilisant Next.js et Capacitor.

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Documentation Konsta UI](https://konstaui.com/docs)
- [Capgo - Mises à jour en direct pour les applications Capacitor](https://capgo.app/)

Joyeux développement d'applications !

Découvrez comment Capgo peut vous aider à créer de meilleures applications plus rapidement, [inscrivez-vous pour un compte gratuit](/register/) aujourd'hui.
