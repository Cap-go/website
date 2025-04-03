---
slug: fr__creating-mobile-apps-with-react-and-capacitor
title: Développer des applications mobiles avec React.js pur et Capacitor
description: >-
  Un guide pour convertir une application web React.js en une application mobile
  native en utilisant Capacitor et améliorer l'interface utilisateur native avec
  Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustration de React.js et Capacitor
tag: Tutorial
published: true
locale: fr
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Voici la traduction en français :

Ce tutoriel vous guidera dans la création d'une application mobile utilisant React, Capacitor et Konsta UI. À la fin, vous saurez comment transformer une application web React en une application mobile native avec Capacitor, et implémenter une interface utilisateur native avec Konsta UI.

Capacitor permet de transformer facilement votre application web React en une application mobile native, sans nécessiter de modifications substantielles ou d'apprentissage de nouvelles stratégies comme React Native.

Le processus implique quelques étapes simples, et avant que vous ne vous en rendiez compte, votre application React sera une application mobile pleinement fonctionnelle. Alors, restez avec nous pendant que nous vous guidons dans ce voyage.

## Aperçu de Capacitor

CapacitorJS change la donne. Il peut s'intégrer de manière transparente à n'importe quel projet web et emballer votre application dans une webview native tout en générant le projet natif Xcode et Android Studio. De plus, grâce à ses plugins, vous pouvez accéder aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Capacitor offre un moyen simple de créer une application mobile native sans tracas ni courbe d'apprentissage abrupte. Son API simple et sa fonctionnalité rationalisée le rendent facile à incorporer dans votre projet.

## Configuration de votre application React

Optons pour la méthode la plus simple pour démarrer une application React. Nous utiliserons le gestionnaire de paquets npm pour créer une nouvelle application React :

```shell
npx create-react-app my-app
```

Pour transformer notre projet en une application mobile native, un **export** de notre application est nécessaire.

Nous y reviendrons dans un instant. D'abord, comprenons comment intégrer Capacitor dans notre application React.

## Intégration de Capacitor dans votre application React

Les étapes de configuration initiale peuvent être un peu détaillées, mais après cela, la mise à jour de votre wrapper d'application native devient aussi simple que l'exécution d'une commande `sync`.

D'abord, nous allons installer le CLI Capacitor comme dépendance de développement et le configurer dans notre projet. Pendant la configuration, acceptez les valeurs par défaut pour le nom et l'ID du bundle en appuyant sur "entrée".

Ensuite, nous installerons le paquet core et les paquets pertinents pour les plateformes iOS et Android.

Enfin, nous ajouterons les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your React project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Les répertoires **ios** et **android** sont maintenant présents dans votre projet React.

Pour accéder au projet Android plus tard, installez [Android Studio](https://developer.android.com/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developer.apple.com/xcode/).

Ensuite, mettez à jour le **webDir** dans votre fichier **capacitor.config.json** comme indiqué ci-dessous :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Exécutez la commande de build et synchronisez votre projet avec Capacitor :

```shell
npm run build
npx cap sync
```

La commande `npm run build` construira votre projet React, tandis que `npx cap sync` alignera le code web aux bons endroits des plateformes natives pour qu'il puisse être exécuté dans une application.

Maintenant, avec un peu de chance et sans erreurs, votre application React devrait être prête à être lancée sur un appareil !

## Construction et déploiement de vos applications natives

Le développement d'applications iOS nécessite **Xcode**, et les applications Android ont besoin d'**Android Studio**. Si vous prévoyez de distribuer votre application sur l'app store, vous devez vous inscrire au Programme de Développeur Apple pour iOS et à la Google Play Console pour Android.

Le CLI Capacitor simplifie le processus d'ouverture des deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois vos projets natifs configurés, le déploiement de votre application sur un appareil connecté est un processus simple.

Pour Android Studio, attendez que tout se charge puis déployez votre application sur un appareil connecté.

Pour Xcode, établissez votre compte de signature pour déployer votre application sur un vrai appareil plutôt que sur le simulateur. Après cela, appuyez simplement sur play pour exécuter l'application sur votre appareil connecté, que vous pouvez choisir en haut.

Si tout s'est bien passé, vous aurez converti votre ReactApplication web js en une application mobile native !

## Rechargement en direct de Capacitor

Les frameworks de développement modernes sont généralement dotés d'un rechargement à chaud, et heureusement, vous pouvez avoir la même chose avec Capacitor mais **sur votre appareil mobile** !

Vous pouvez rendre votre application hébergée localement accessible avec le rechargement en direct sur votre réseau en faisant charger à l'application Capacitor le contenu depuis une URL spécifique.

Tout d'abord, déterminez votre adresse IP locale. Sur Mac, vous pouvez le faire en exécutant `ipconfig getifaddr en0` dans le terminal. Sur Windows, exécutez `ipconfig` et recherchez l'adresse IPv4.

Ensuite, demandez à Capacitor de charger l'application directement depuis le serveur en ajoutant un autre paramètre à votre fichier `capacitor.config.ts` :

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Assurez-vous d'utiliser l'IP et le port corrects. Exécutez `npx cap copy` pour appliquer ces changements à notre projet natif.

Après avoir déployé votre application une fois de plus via Android Studio ou Xcode, tout changement dans votre application React sera automatiquement rechargé et affiché sur votre application !

Gardez à l'esprit que si de nouveaux plugins sont installés, comme l'appareil photo, cela nécessite une reconstruction de votre projet natif. C'est parce que les fichiers natifs auront changé et ne peuvent pas être mis à jour à la volée.

## Utilisation des plugins Capacitor

Jetons un rapide coup d'œil à l'utilisation d'un plugin Capacitor. Installons-en un simple, le [plugin Share](https://capacitorjs.com/docs/apis/share/), qui affiche la boîte de dialogue de partage native :

```shell
npm i @capacitor/share
```

Pour l'utiliser, importez le package et appelez la fonction `share()` respective depuis notre application. Considérez le **App.js** :

```javascript
import { Share } from '@capacitor/share';

function ShareButton() {
  const share = async () => {
    await Share.share({
      title: 'React App',
      text: 'Visit this React App',
      url: 'http://localhost:3000',
      dialogTitle: 'Share with...'
    });
  };

  return (
    <button onClick={share}>
      Share
    </button>
  );
}

export default ShareButton;
```

Après avoir installé un nouveau plugin, n'oubliez pas de synchroniser à nouveau votre projet React en utilisant `npx cap sync`.

## Implémentation de Konsta UI : Une interface mobile plus attrayante

Pour une expérience d'interface mobile plus attrayante, nous utiliserons Konsta UI. Il fournit un style spécifique à iOS et Android, et il est facile à utiliser.

Pour utiliser Konsta UI, installez le package React :

```shell
npm i konsta
```

Modifiez votre fichier `tailwind.config.js` comme ceci :

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/**/*.{js,ts,javascript,tsx}',
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

`konstaConfig` complétera votre configuration Tailwind CSS actuelle avec des variantes et des utilitaires supplémentaires nécessaires pour Konsta UI.

Maintenant, configurez le composant App principal pour définir les paramètres globaux comme `theme`. Enveloppez l'application principale avec App dans le `src/index.js` :

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'konsta/react';
import './index.css';
import MyApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <App theme="ios">
      <MyApp />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Utilisons les composants React de Konsta UI dans nos pages React.js. Ouvrez `src/App.js` et modifiez-le comme suit :

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
} from 'konsta/react';

export default function MyApp() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Welcome to your React & Konsta UI app.
        </p>
      </Block>
      
      <List>
        <ListItem href="/about" title="About" />
      </List>

      <Block strong>
        <Button>Click Me</Button>
      </Block>
    </Page>
  );
}
```

Si tout a été fait correctement, vous devriez voir une intégration sans effort entre React et Konsta UI pour donner à votre application mobile un aspect natif.

## Conclusion

Capacitor offre un moyen transparent de construire des applications natives basées sur un projet web existant, fournissant un moyen simple de partager du code et d'avoir une interface utilisateur cohérente.

Grâce à des technologies comme Capacitor, la création d'applications mobiles à partir d'applications web React.js n'a jamais été aussi facile. Élevez vos compétences en développement web à un niveau supérieur en créant des applications mobiles natives impressionnantes. Bon codage !

Pour en savoir plus sur la façon dont vous pouvez accélérer votre processus de développement d'applications, [inscrivez-vous pour un compte gratuit](/register/) dès aujourd'hui.