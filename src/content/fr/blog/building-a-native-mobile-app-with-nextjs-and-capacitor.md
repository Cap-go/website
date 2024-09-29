---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: "2024 Création d'applications mobiles natives avec Next.js 14 et Capacitor\_: un guide étape par étape"
description: >-
  Découvrez comment créer des applications mobiles natives à l'aide de Next.js
  14 et de Capacitor dans ce guide complet. Découvrez les dernières bonnes
  pratiques et techniques pour créer des applications mobiles hautes
  performances et riches en fonctionnalités.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14 and Capacitor illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: fr
---

## Introduction

Dans ce didacticiel, nous explorerons comment créer des applications mobiles natives en utilisant la puissante combinaison de [Nextjs](https://nextjsorg/) 14 et [Capacitor](https://capacitorjscom/) en 2024 En tirant parti des dernières versions Grâce à ces technologies, vous pouvez facilement créer des applications mobiles hautes performances et riches en fonctionnalités. Nous montrerons également comment améliorer l'interface utilisateur mobile à l'aide de [Konsta UI](https://konstauicom/) et Tailwind CSS, bien que cette étape soit facultatif

Nextjs, un framework React populaire, fournit une base solide pour créer des applications Web, tandis que Capacitor vous permet de transformer votre application Nextjs en une application mobile native sans modifications significatives ni besoin d'acquérir de nouvelles compétences comme React Native. Ce tutoriel vous guidera à travers les processus, en commençant par la configuration d'une nouvelle application Nextjs et en intégrant Capacitor pour créer une expérience mobile native

### Avantages de l'utilisation de Nextjs et de Capacitor

- **Réutilisabilité du code** : Nextjs vous permet d'écrire des composants réutilisables et de partager du code entre vos applications Web et mobiles, économisant ainsi du temps et des efforts de développement.
- **Performance** : Nextjs offre des optimisations de performances intégrées, telles que le rendu côté serveur et le fractionnement du code, garantissant des temps de chargement rapides et une expérience utilisateur fluide.
- **Capacités natives** : Capacitor donne accès aux fonctionnalités natives de l'appareil telles que l'appareil photo, la géolocalisation, etc., vous permettant de créer des applications mobiles riches en fonctionnalités
- **Développement simplifié** : avec Capacitor, vous pouvez développer et tester votre application mobile à l'aide de technologies Web familières, réduisant ainsi la courbe d'apprentissage et rationalisant le processus de développement.

## Préparation de votre application Nextjs

Pour commencer, créons une nouvelle application Nextjs à l'aide de la commande `create-next-app` :

```shell
npx create-next-app@latest my-app
```

Cette commande configurera un projet Nextjs vierge avec la configuration recommandée pour la dernière version

Ensuite, accédez au répertoire du projet :

```shell
cd my-app
```

Pour créer une application mobile native, nous devons générer une exportation statique de notre projet Nextjs. Mettez à jour le fichier `packagejson` pour inclure un script pour créer et exporter le projet :

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

L'exécution de la commande « npm run static » peut entraîner des erreurs dues à une incompatibilité d'optimisation d'image. Pour résoudre ce problème, ouvrez le fichier « nextconfigjs » et modifiez-le comme suit :

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

Maintenant, exécuter `npm run static` devrait fonctionner sans aucun problème, et vous trouverez un nouveau dossier `out` à la racine de votre projet. Ce dossier sera utilisé par Capacitor dans les prochaines étapes

## Ajout d'un condensateur à votre application Nextjs 14

Pour empaqueter votre application Nextjs dans un conteneur mobile natif, procédez comme suit :

1 Installez la [Capacitor CLI](https://capacitorjscom/docs/cli/) en tant que dépendance de développement :

```shell
npm install -D @capacitor/cli
```

2 Initialisez Capacitor dans votre projet Nextjs :

```shell
npx cap init
```

Pendant le processus d'initialisation, vous pouvez appuyer sur "Entrée" pour accepter les valeurs par défaut pour le nom de l'application et l'ID du bundle.

3 Installez les packages de condensateurs requis :

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4 Ajoutez les plateformes natives :

```shell
npx cap add ios
npx cap add android
```

Capacitor créera des dossiers pour chaque plateforme (`ios` et `android`) à la racine de votre projet. Ces dossiers contiennent respectivement les projets natifs pour iOS et Android

Pour accéder et créer le projet Android, vous devez avoir installé [Android Studio](https://developerandroidcom/studio). Pour le développement iOS, vous avez besoin d'un Mac avec [Xcode](https://developerapplecom/xcode/) installé

5 Configurez le condensateur :

Ouvrez le fichier `capacitorconfigts` et mettez à jour la propriété `webDir` pour qu'elle pointe vers le répertoire de sortie de votre build Nextjs :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6 Créez et synchronisez votre projet :

```shell
npm run static
npx cap sync
```

La commande `npm run static` construit votre projet Nextjs et exporte les fichiers statiques, tandis que `npx cap sync` synchronise le code Web avec les plateformes natives.## Création et déploiement d'applications natives

Pour créer et déployer votre application mobile native, procédez comme suit :
Pour développer des applications iOS, **Xcode** doit être installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous envisagez de distribuer votre application sur l'App Store, vous devez vous inscrire dans le programme pour développeurs Apple pour iOS et la console Google Play pour Android

1 Ouvrez les projets natifs :

Pour iOS :
```shell
npx cap open ios
```

Pour Android :
```shell
npx cap open android
```

2 Créez et exécutez l'application :

![android-studio-run](/android-studio-runwebp)

- Dans Android Studio, attendez que le projet soit prêt, puis cliquez sur le bouton "Exécuter" pour déployer l'application sur un appareil connecté ou un émulateur
![xcode-run](/xcode-runwebp)

- Dans Xcode, configurez votre compte de signature pour déployer l'application sur un appareil réel. Si vous ne l'avez pas déjà fait, Xcode vous guidera tout au long du processus (notez que vous devez être inscrit au programme pour développeurs Apple). Une fois configuré , cliquez sur le bouton "Play" pour exécuter l'application sur votre appareil connecté

Félicitations! Vous avez déployé avec succès votre application Web Nextjs sur un appareil mobile

<div class="mx-auto" style="largeur : 50%;">
  <img src="/nextjs-mobile-appwebp" alt="nextjs-mobile-app">
</div>
Mais attendez, il existe également un moyen plus rapide de le faire pendant le développement.

## Rechargement en direct du condensateur

Pendant le développement, vous pouvez profiter du rechargement en direct pour voir instantanément les modifications sur votre appareil mobile. Pour activer cette fonctionnalité, suivez ces étapes :

1 Trouvez votre adresse IP locale :

- Sous macOS, exécutez la commande suivante dans le terminal :
  ```shell
  ipconfig getifaddr en0
  ```

- Sous Windows, exécutez :
  ```shell
  ipconfig
  ```
  Recherchez l'adresse IPv4 dans la sortie

2 Mettez à jour le fichier `capacitorconfigts` pour inclure la configuration du serveur :

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

Remplacez `YOUR_IP_ADDRESS` par votre adresse IP locale

3 Appliquez les modifications à votre projet natif :

```shell
npx cap copy
```

La commande « copier » copie le dossier Web et les modifications de configuration dans le projet natif sans mettre à jour l'intégralité du projet.

4 Reconstruisez et exécutez l'application sur votre appareil à l'aide d'Android Studio ou de Xcode

Désormais, chaque fois que vous apportez des modifications à votre application Nextjs, l'application mobile se rechargera automatiquement pour refléter ces modifications.

Remarque : Si vous installez de nouveaux plugins ou apportez des modifications aux fichiers natifs, vous devrez reconstruire le projet natif car le rechargement en direct ne s'applique qu'aux modifications du code Web.

## Utilisation des plugins de condensateur

Les plugins de condensateur vous permettent d'accéder aux fonctionnalités natives de l'appareil à partir de votre application Nextjs. Explorons comment utiliser le [plugin de partage](https://capacitorjscom/docs/apis/share/) à titre d'exemple :

1 Installez le plugin Partager :

```shell
npm i @capacitor/share
```

2 Mettez à jour le fichier `pages/indexjs` pour utiliser le plugin Share :

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

3 Synchronisez les modifications avec le projet natif :

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation puis redéployer l'application sur notre appareil. Pour ce faire, exécutez la commande suivante :

```shell
npx cap sync
```

4 Reconstruisez et exécutez l'application sur votre appareil

Maintenant, lorsque vous cliquez sur « Partager maintenant ! » bouton, la boîte de dialogue de partage native apparaîtra, vous permettant de partager le contenu avec d'autres applications

<div class="mx-auto" style="largeur : 50%;">
  <img src="/next-capacitor-sharewebp" alt="next-capacitor-share">
</div>

Pour rendre le bouton plus adapté aux mobiles, nous pouvons ajouter du style en utilisant ma bibliothèque de composants d'interface utilisateur préférée pour les applications Web - Nextjs (sans jeu de mots) 

## Ajout de l'interface utilisateur de Konsta

J'ai travaillé des années avec [Ionic](https://ionicframeworkcom/) pour créer de superbes applications multiplateformes et c'était l'un des meilleurs choix depuis des années.
Mais maintenant je ne le recommande plus c'est très hacky de l'intégrer avec Nextjs et ça ne vaut pas vraiment le coup quand on a déjà [tailwindcss](https://tailwindcsscom/)


si vous voulez une interface utilisateur mobile vraiment superbe qui s'adapte au style spécifique à iOS et Android, je recommande l'interface utilisateur de Kosta

Vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/guides/nextjs/) 
Pour améliorer l'interface utilisateur mobile de votre application Nextjs, vous pouvez utiliser [Konsta UI](https://konstauicom/), une bibliothèque de composants d'interface utilisateur adaptée aux mobiles qui s'adapte au style iOS et Android. Suivez ces étapes pour intégrer l'interface utilisateur Konsta :

1 Installez les packages requis :

```shell
npm i konsta
```

2 Mettez à jour le fichier `tailwindconfigjs` :

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

3 Enveloppez votre application avec le composant `App` de Konsta UI dans `pages/_appjs` :

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
### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants Konsta UI React dans nos pages Nextjs

4 Mettez à jour le fichier `pages/indexjs` pour utiliser les composants de l'interface utilisateur Konsta :

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

5 Redémarrez le serveur de développement et reconstruisez l'application

Votre application Nextjs devrait désormais disposer d'une interface utilisateur mobile d'apparence native optimisée par Konsta UI

## Optimisation des performances

Pour garantir des performances optimales de votre application Nextjs et Capacitor, tenez compte des bonnes pratiques suivantes :

- Réduisez la taille de l'application en supprimant les dépendances et les actifs inutilisés
- Optimiser les images et autres fichiers multimédias pour réduire les temps de chargement
- Implémenter un chargement paresseux pour les composants et les pages afin d'améliorer les performances de chargement initial
- Utilisez le rendu côté serveur (SSR) avec Nextjs pour améliorer la vitesse de chargement de l'application et l'optimisation des moteurs de recherche (SEO)
- Tirez parti des optimisations intégrées de Capacitor, telles que la mise en cache de la vue Web et le regroupement d'applications

## Conclusion

Dans ce didacticiel, nous avons exploré comment créer des applications mobiles natives à l'aide de Nextjs et Capacitor. En tirant parti de la puissance de ces technologies, vous pouvez facilement créer des applications mobiles hautes performances et riches en fonctionnalités.

Nous avons couvert les étapes de configuration d'une application Nextjs, d'intégration de Capacitor, ainsi que de création et de déploiement de l'application sur des appareils mobiles. De plus, nous avons discuté de l'utilisation des plugins Capacitor, de l'ajout de l'interface utilisateur Konsta pour une interface utilisateur mobile améliorée et des techniques d'optimisation des performances.

Pour faire passer votre application Nextjs et Capacitor au niveau supérieur, envisagez d'explorer [Capgo](https://capgoapp/) pour des mises à jour en direct transparentes, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

En suivant les meilleures pratiques et techniques décrites dans ce guide, vous serez bien équipé pour créer de superbes applications mobiles natives à l'aide de Nextjs et Capacitor.

## Ressources

- [Documentation Nextjs](https://nextjsorg/docs)
- [Documentation sur les condensateurs](https://capacitorjscom/docs)
- [Documentation de l'interface utilisateur Konsta](https://konstauicom/docs)
- [Capgo - Mises à jour en direct pour les applications de condensateurs](https://capgoapp/)

Bonne création d'application !

Découvrez comment Capgo peut vous aider à créer de meilleures applications plus rapidement, [créez un compte gratuit](/register/) dès aujourd'hui