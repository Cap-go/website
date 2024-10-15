---
slug: creating-mobile-apps-with-react-and-capacitor
title: Création d'applications mobiles avec Pure React.js et Capacitor
description: >-
  Un guide sur la façon de transformer une application Web React.js en une
  application mobile native à l'aide de Capacitor et d'améliorer l'interface
  utilisateur native avec l'interface utilisateur Konsta.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustration de React.js et du condensateur
tag: Tutorial
published: true
locale: fr
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Ce didacticiel vous guidera dans la création d'une application mobile à l'aide de React, Capacitor et Konsta UI. À la fin, vous saurez comment transformer une application Web Reactjs en une application mobile native avec Capacitor et implémenter une interface utilisateur native à l'aide de Konsta UI.

Capacitor permet la transformation facile de votre application Web Reactjs en une application mobile native, ne nécessitant aucune modification substantielle ni apprentissage de nouvelles stratégies telles que React Native.

Le processus implique quelques étapes simples, et avant que vous vous en rendiez compte, votre application Reactjs sera une application mobile entièrement fonctionnelle. Alors restez dans les parages pendant que nous vous guidons dans ce voyage.

## Présentation du condensateur

CapacitorJS change la donne. Il peut s'intégrer de manière transparente à n'importe quel projet Web et envelopper votre application dans une vue Web native tout en générant le projet natif Xcode et Android Studio. De plus, grâce à ses plugins, vous pouvez accéder aux fonctionnalités natives de l'appareil telles que la caméra via un pont JS.

Capacitor offre un moyen simple de créer une application mobile native sans tracas ni courbe d'apprentissage abrupte. Son API simple et ses fonctionnalités rationalisées facilitent son intégration dans votre projet.

## Configuration de votre application Reactjs

Passons à la méthode la plus simple pour lancer une application React. Nous utiliserons le gestionnaire de packages npm pour créer une nouvelle application React :

```shell
npx create-react-app my-app
```

Pour transformer notre projet en application mobile native, un **export** de notre application est nécessaire 

Nous y reviendrons dans un instant. Tout d'abord, comprenons comment intégrer Capacitor dans notre application React.

## Intégration d'un condensateur dans votre application Reactjs

Les étapes de configuration initiales peuvent être un peu détaillées, mais après cela, mettre à jour votre wrapper d'application natif devient aussi simple que d'exécuter une commande « sync »

Tout d'abord, nous allons installer la CLI Capacitor en tant que dépendance de développement et la configurer dans notre projet. Pendant l'installation, acceptez les valeurs par défaut pour le nom et l'ID du bundle en appuyant sur « Entrée »

Ensuite, nous installerons le package principal et les packages correspondants pour les plateformes iOS et Android.

Enfin, nous ajouterons les plates-formes et Capacitor créera des dossiers pour chaque plate-forme à la racine de notre projet :

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

Les répertoires **ios** et **android** sont désormais présents dans votre projet Reactjs

Pour accéder au projet Android ultérieurement, installez [Android Studio](https://developerandroidcom/studio/) Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developerapplecom/xcode/)

Ensuite, mettez à jour le **webDir** dans votre fichier **capacitorconfigjson** comme indiqué ci-dessous :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Exécutez la commande build et synchronisez votre projet avec Capacitor :

```shell
npm run build
npx cap sync
```

La commande `npm run build` construira votre projet Reactjs, tandis que `npx cap sync` alignera le code Web aux endroits précis des plates-formes natives afin qu'il puisse être exécuté dans une application.

Maintenant, avec un peu de chance et sans erreur, votre application Reactjs devrait être prête à être lancée sur un appareil !

## Créer et déployer vos applications natives

Le développement d'applications iOS nécessite **Xcode** et les applications Android nécessitent **Android Studio**. Si vous envisagez de distribuer votre application sur l'App Store, vous devez vous inscrire au programme pour développeurs Apple pour iOS et à la console Google Play pour Android.

La CLI Capacitor simplifie le processus d’ouverture des deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois vos projets natifs configurés, déployer votre application sur un appareil connecté est un processus simple 

Pour Android Studio, attendez que tout soit chargé, puis déployez votre application sur un appareil connecté 

Pour Xcode, créez votre compte de signature pour déployer votre application sur un appareil réel au lieu du simulateur. Après cela, appuyez simplement sur Play pour exécuter l'application sur votre appareil connecté, que vous pouvez choisir en haut.

Si tout s'est bien passé, vous aurez converti votre Reactjs en application mobile native !

## Rechargement en direct du condensateur

Les frameworks de développement modernes sont généralement livrés avec un rechargement à chaud, et heureusement, vous pouvez avoir la même chose avec Capacitor mais **sur votre appareil mobile** !

Vous pouvez rendre votre application hébergée localement accessible avec un rechargement en direct sur votre réseau en demandant à l'application Capacitor de charger le contenu à partir d'une URL spécifique.

Tout d'abord, déterminez votre adresse IP locale. Sur un Mac, vous pouvez le faire en exécutant « ipconfig getifaddr en0 » dans le terminal. Sous Windows, exécutez « ipconfig » et recherchez l'adresse IPv4.

Après cela, demandez à Capacitor de charger l'application directement depuis le serveur en ajoutant un autre paramètre à votre fichier `capacitorconfigts` :

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

Assurez-vous d'utiliser l'adresse IP et le port précis. Exécutez `npx cap copy` pour appliquer ces modifications à notre projet natif.

Lors du déploiement de votre application une nouvelle fois via Android Studio ou Xcode, toutes les modifications apportées à votre application React seront automatiquement rechargées et affichées sur votre application !

Gardez à l'esprit que si de nouveaux plugins sont installés, comme la caméra, cela nécessite une reconstruction de votre projet natif. En effet, les fichiers natifs auront changé et ne pourront pas être mis à jour à la volée.

## Utilisation des plugins de condensateur

Jetons un coup d'œil rapide à la façon d'utiliser un plugin Capacitor. Installons-en un simple, le [plugin de partage](https://capacitorjscom/docs/apis/share/), qui affiche la boîte de dialogue de partage natif :

```shell
npm i @capacitor/share
```

Pour l'utiliser, importez le package et appelez la fonction `share()` correspondante depuis notre application. Considérez les **Appjs** :

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

Après avoir installé un nouveau plugin, n'oubliez pas de synchroniser à nouveau votre projet React en utilisant `npx cap sync`

## Implémentation de l'interface utilisateur Konsta : une interface utilisateur mobile plus esthétique

Pour une meilleure expérience d'interface utilisateur mobile, nous utiliserons Konsta UI. Il fournit un style spécifique à iOS et Android et est facile à utiliser.

Pour utiliser Konsta UI, installez le package React :

```shell
npm i konsta
```

Modifiez votre fichier `tailwindconfigjs` comme ceci :

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

`konstaConfig` complétera votre configuration CSS Tailwind actuelle avec des variantes et des utilitaires supplémentaires nécessaires à l'interface utilisateur de Konsta

Maintenant, configurez le composant principal de l'application pour définir des paramètres globaux tels que « thème » Enveloppez l'application principale avec App dans le « src/indexjs » :

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

Utilisons les composants Konsta UI React dans nos pages Reactjs. Ouvrez `src/Appjs` et modifiez-le pour :

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

Si tout a été bien fait, vous devriez constater une intégration sans effort entre React et Konsta UI pour donner à votre application mobile un aspect natif

## Conclusion

Capacitor offre un moyen transparent de créer des applications natives basées sur un projet Web existant, offrant un moyen simple de partager du code et d'avoir une interface utilisateur cohérente

Grâce à des technologies telles que Capacitor, créer des applications mobiles à partir d'applications Web Reactjs n'a jamais été aussi simple. Faites passer vos compétences en développement Web au niveau supérieur en créant des applications mobiles natives impressionnantes. Bon codage !

Pour en savoir plus sur la façon dont vous pouvez accélérer le processus de développement de votre application, [créez un compte gratuit](/register/) dès aujourd'hui