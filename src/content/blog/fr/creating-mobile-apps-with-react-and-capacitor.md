---
slug: creating-mobile-apps-with-react-and-capacitor
title: Créer des applications mobiles avec Pure React.js et Capacitor
description: >-
  Un guide sur la manière de transformer une application web React.js en une
  application mobile native en utilisant Capacitor, et d'améliorer l'interface
  utilisateur native avec Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustration de React.js et Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: implementing-live-updates-in-your-react-capacitor-app
---
Ce tutoriel vous guidera dans la création d'une application mobile en utilisant React, Capacitor et Konsta UI. À la fin, vous saurez comment transformer une application web React.js en une application mobile native avec Capacitor, et implémenter une interface utilisateur native en utilisant Konsta UI.

Capacitor permet la transformation facile de votre application web React.js en une application mobile native, sans nécessiter de modifications substantielles ou d'apprentissage de nouvelles stratégies comme React Native.

Le processus implique quelques étapes simples, et avant que vous ne le sachiez, votre application React.js sera une application mobile entièrement fonctionnelle. Alors, restez avec nous pendant que nous vous guidons dans ce voyage.

## Présentation de Capacitor

CapacitorJS est un véritable changement de jeu. Il peut s'intégrer parfaitement à n'importe quel projet web et envelopper votre application dans une webview native tout en générant le projet Xcode et Android Studio natif. De plus, grâce à ses plugins, vous pouvez accéder aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Capacitor offre un moyen simple de créer une application mobile native sans tracas ni courbe d'apprentissage abrupte. Son API simple et sa fonctionnalité rationalisée facilitent son intégration dans votre projet.

## Configuration de votre application React.js

Allons pour la méthode la plus simple pour initier une application React. Nous allons utiliser le gestionnaire de paquets npm pour créer une nouvelle application React :

```shell
npx create-react-app my-app
```

Pour transformer notre projet en une application mobile native, un **export** de notre application est nécessaire.

Nous y reviendrons dans un moment. D'abord, comprenons comment intégrer Capacitor dans notre application React.

## Intégration de Capacitor dans votre application React.js

Les étapes de configuration initiales peuvent être un peu détaillées, mais après cela, la mise à jour de votre enveloppe d'application native devient aussi simple que d'exécuter une commande `sync`.

Tout d'abord, nous allons installer la CLI Capacitor en tant que dépendance de développement et l'installer dans notre projet. Lors de la configuration, acceptez les valeurs par défaut pour le nom et l'ID du bundle en appuyant sur "entrer".

Ensuite, nous allons installer le package principal et les packages requis pour les plateformes iOS et Android.

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

Les répertoires **ios** et **android** sont maintenant présents dans votre projet React.js.

Pour accéder ultérieurement au projet Android, installez [Android Studio](https://developer.android.com/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developer.apple.com/xcode/).

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

La commande `npm run build` construira votre projet React.js, tandis que `npx cap sync` alignera le code web aux emplacements précis des plateformes natives afin qu'ils puissent être exécutés dans une application.

Maintenant, avec un peu de chance et sans erreurs, votre application React.js devrait être prête à être lancée sur un appareil !

## Construction et déploiement de vos applications natives

Le développement d'applications iOS nécessite **Xcode**, et les applications Android ont besoin de **Android Studio**. Si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au programme des développeurs Apple pour iOS et à la Google Play Console pour Android.

La CLI Capacitor simplifie le processus d'ouverture des deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois que vos projets natifs sont configurés, déployer votre application sur un appareil connecté devient un processus simple.

Pour Android Studio, attendez que tout se charge, puis déployez votre application sur un appareil connecté.

Pour Xcode, établissez votre compte de signature pour déployer votre application sur un véritable appareil plutôt que juste sur le simulateur. Après cela, il vous suffit d'appuyer sur play pour exécuter l'application sur votre appareil connecté, que vous pouvez choisir en haut.

Si tout s'est bien déroulé, vous avez converti votre application web React.js en une application mobile native !

## Chargement en direct avec Capacitor

Les frameworks de développement modernes sont généralement accompagnés de recharge à chaud, et heureusement, vous pouvez obtenir la même chose avec Capacitor mais **sur votre appareil mobile** !

Vous pouvez rendre votre application hébergée localement accessible avec un rechargement en direct sur votre réseau en demandant à l'application Capacitor de charger le contenu à partir d'une URL spécifique.

Tout d'abord, déterminez votre adresse IP locale. Sur un Mac, vous pouvez le faire en exécutant `ipconfig getifaddr en0` dans le terminal. Sur Windows, exécutez `ipconfig` et recherchez l'adresse IPv4.

Après cela, indiquez à Capacitor de charger l'application directement depuis le serveur en ajoutant un autre paramètre à votre fichier `capacitor.config.ts` :

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

Assurez-vous d'utiliser l'adresse IP et le port corrects. Exécutez `npx cap copy` pour appliquer ces modifications à notre projet natif.

Après avoir déployé votre application une fois de plus via Android Studio ou Xcode, tout changement dans votre application React sera automatiquement rechargé et affiché sur votre application !

Gardez à l'esprit que si de nouveaux plugins sont installés, comme la caméra, cela nécessite une reconstruction de votre projet natif. En effet, les fichiers natifs auront changé et ne peuvent pas être mis à jour à la volée.

## Utilisation des plugins Capacitor

Jetons un coup d'œil rapide à la façon d'utiliser un plugin Capacitor. Installons un simple, le [plugin Share](https://capacitorjs.com/docs/apis/share/), qui affiche la boîte de dialogue de partage native :

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

## Mise en œuvre de Konsta UI : Interface mobile améliorée

Pour une expérience d'interface mobile plus agréable, nous allons utiliser Konsta UI. Il fournit un style spécifique à iOS et Android, et il est facile à utiliser.

Pour utiliser Konsta UI, installez le package React :

```shell
npm i konsta
```

Modifiez votre fichier `tailwind.config.js` comme suit :

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

`konstaConfig` complétera votre configuration actuelle de Tailwind CSS avec des variantes et utilitaires supplémentaires nécessaires pour Konsta UI.

Maintenant, configurez le composant principal App pour définir des paramètres globaux comme `theme`. Enveloppez l'application principale avec App dans le `src/index.js` :

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

Si tout a été bien fait, vous devriez voir une intégration sans effort entre React et Konsta UI pour donner à votre application mobile un aspect natif.

## Conclusion

Capacitor offre un moyen fluide de construire des applications natives basé sur un projet web existant, fournissant une manière simple de partager du code et d'avoir une interface utilisateur cohérente.

Grâce à des technologies comme Capacitor, créer des applications mobiles à partir d'applications web React.js n'a jamais été aussi facile. Élevez vos compétences en développement web en créant des applications mobiles natives impressionnantes. Bon codage !

Pour en savoir plus sur la façon dont vous pouvez accélérer votre processus de développement d'applications, [inscrivez-vous pour un compte gratuit](/register/) dès aujourd'hui.
