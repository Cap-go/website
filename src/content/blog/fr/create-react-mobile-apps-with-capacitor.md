---
slug: create-react-mobile-apps-with-capacitor
title: Construire des applications mobiles avec React et Capacitor
description: >-
  Apprenez à créer une application mobile en utilisant React, Capacitor, et à
  améliorer l'interface utilisateur native avec Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustration de React et Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Dans ce tutoriel, nous commencerons par une nouvelle application [React](https://reactjs.org/) et passerons au développement mobile natif en utilisant Capacitor. En option, vous pouvez également ajouter [Konsta UI](https://konstaui.com/) pour une meilleure interface utilisateur mobile avec Tailwind CSS.

Capacitor vous permet de transformer facilement votre application web React en une application mobile native sans modifications significatives ni apprentissage d'une nouvelle compétence comme React Native.

Avec quelques étapes simples, la plupart des applications React peuvent être transformées en applications mobiles.

Ce tutoriel vous guidera à travers le processus, en commençant par une nouvelle application React, puis en incorporant Capacitor pour entrer dans le domaine des applications mobiles natives. De plus, vous pouvez éventuellement utiliser [Konsta UI](https://konstaui.com/) pour améliorer votre interface utilisateur mobile avec Tailwind CSS.

## À propos de Capacitor

CapacitorJS est une révolution ! Vous pouvez l'incorporer sans effort dans n'importe quel projet web, et il enveloppera votre application dans une webview native, générant pour vous le projet natif Xcode et Android Studio. De plus, ses plugins fournissent l'accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage raide. Son API légère et sa fonctionnalité simplifiée facilitent son intégration dans votre projet. Croyez-moi, vous serez étonné de voir à quel point il est facile d'obtenir une application native entièrement fonctionnelle avec Capacitor !

## Préparation de votre application React

Bien qu'il existe diverses méthodes pour initier des applications React, optons pour la plus simple dans ce tutoriel qui fournit une application React vierge :

```shell
npx create-react-app my-app
```

Pour créer une application mobile native, nous avons besoin d'un **export** de notre projet. Ainsi, ajoutons un script simple dans notre **package.json** qui peut être utilisé pour construire et exporter le projet React :

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Vous pouvez maintenant exécuter `npm run build` sans aucune inquiétude, et vous devriez pouvoir repérer un nouveau dossier de sortie à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement.

## Ajouter Capacitor à votre application React

Pour empaqueter n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais par la suite, c'est aussi simple que d'exécuter une seule commande `sync`.

Tout d'abord, nous pouvons installer le [Capacitor CLI](https://capacitorjs.com/docs/cli/) en tant que dépendance de développement, puis le configurer dans notre projet. Pendant la configuration, vous pouvez appuyer sur "entrée" pour accepter les valeurs par défaut pour le nom et l'ID de bundle.

Ensuite, nous devons installer le paquet principal et les paquets pertinents pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

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

À ce stade, vous devriez pouvoir observer de nouveaux dossiers **ios** et **android** dans votre projet React.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer [Android Studio](https://developer.android.com/studio/). Pour iOS, vous avez besoin d'un Mac et vous devez installer [Xcode](https://developer.apple.com/xcode/).

De plus, vous devriez trouver un fichier **capacitor.config.ts** dans votre projet, qui contient quelques paramètres fondamentaux de Capacitor utilisés pendant la synchronisation. La seule chose à laquelle vous devez prêter attention est le **webDir**, qui doit pointer vers le résultat de votre commande de construction. Actuellement, il est inexact.

Pour corriger cela, ouvrez le fichier **capacitor.config.json** et mettez à jour le **webDir** :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Vous pouvez essayer en exécutant les commandes suivantes :

```shell
npm run build
npx cap sync
```

La première commande `npm run build` construira simplement votre projet React et exportera la construction statique.

Pendant que la deuxième commande `npx cap sync` synchronisera tout le code web dans les bons endroits des plateformes natives afin qu'ils puissent être affichés dans une application.

En outre, la commande de synchronisation pourra mettre à jour les plateformes natives et installer des plugins, donc quand vous installerez un nouveau [plugin Capacitor](https://capacitorjs.com/docs/plugins/), il est temps de relancer `npx cap sync`.

Sans le réaliser, vous avez maintenant terminé, alors voyons l'application sur un appareil !

## Construire et déployer des applications natives

Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au programme Développeur Apple pour iOS et à la console Google Play pour Android.

Si vous êtes nouveau dans le développement mobile natif, vous pouvez utiliser le Capacitor CLI pour ouvrir facilement les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois vos projets natifs configurés, déployer votre application sur un appareil connecté est facile. Dans Android Studio, vous devez juste attendre que tout soit prêt, et vous pouvez déployer votre application sur un appareil connecté sans changer de paramètres. Voici un exemple :

![android-studio-run](/android-studio-run.webp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un vrai appareil plutôt que juste le simulateur. Si vous ne l'avez pas fait auparavant, Xcode vous guide à travers le processus (mais encore une fois, vous devez être inscrit au programme Développeur). Après cela, vous pouvez simplement appuyer sur play pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-run.webp)

Félicitations ! Vous avez réussi à déployer votre application web React sur un appareil mobile. Voici un exemple :

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

Mais attendez, il existe aussi un moyen plus rapide de faire cela pendant le développement...

## Capacitor Live Reload

À ce stade, vous êtes probablement habitué à avoir un rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir la même fonctionnalité **sur un appareil mobile** avec un minimum d'effort !

Activez l'accès à votre application hébergée localement avec rechargement en direct **sur votre réseau** en faisant en sorte que l'application Capacitor charge le contenu à partir de l'URL spécifique.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez le découvrir en exécutant la commande suivante dans le terminal :

```shell
ipconfig getifaddr en0
```

Sur Windows, exécutez :

```shell
ipconfig
```

Puis cherchez l'adresse IPv4.

Nous pouvons indiquer à Capacitor de charger l'application directement à partir du serveur en ajoutant une autre entrée à notre fichier `capacitor.config.ts` :

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Assurez-vous d'utiliser **l'IP et le port corrects**, j'ai utilisé le port par défaut de React dans cet exemple.

Maintenant, nous pouvons appliquer ces changements en les copiant dans notre projet natif :

```shell
npx cap copy
```

La commande `copy` est similaire à `sync`, mais elle ne **copiera que les modifications apportées au dossier web** et à la configuration, sans mettre à jour le projet natif.

Vous pouvez maintenant déployer votre application une fois de plus via Android Studio ou Xcode. Après cela, si vous changez quelque chose dans votre application React, **l'application se rechargera automatiquement** et affichera les changements !

**Gardez à l'esprit** que si vous installez de nouveaux plugins comme la caméra, cela nécessite toujours de reconstruire votre projet natif. Cela est dû au fait que des fichiers natifs sont modifiés, et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port par défaut de React à des fins de démonstration.

## Utiliser les Plugins Capacitor

Jetons un coup d'œil à la façon d'utiliser un plugin Capacitor en action, dont nous avons parlé plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin assez simple en exécutant :

```shell
npm i @capacitor/share
```

Il n'y a rien de spécial avec le [plugin Share](https://capacitorjs.com/docs/apis/share/), mais il affiche de toute façon la boîte de dialogue de partage native ! Pour cela, nous devons maintenant seulement importer le paquet et appeler la fonction `share()` depuis notre application. Modifions le **src/App.js** comme ceci :

```javascript
import React from 'react';
import { Share } from '@capacitor/share';

function App() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  };

  return (
    <div>
      <h1>Welcome to React and Capacitor!</h1>
      <p>
        <h2>Cool channel</h2>
        <button onClick={() => share()}>Share now!</button>
      </p>
    </div>
  );
}

export default App;
```

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation, puis redéployer l'application sur notre appareil. Pour ce faire, exécutez la commande suivante :

```
npx cap sync
```

Après avoir appuyé sur le bouton, vous pouvez voir la belle boîte de dialogue de partage native en action !

<div>
  <h1>
</h1>

Pour donner au bouton une apparence plus adaptée aux mobiles, nous pouvons ajouter un peu de style en utilisant ma bibliothèque de composants UI préférée pour les applications web - React (sans jeu de mots).

## Ajouter Konsta UI

J'ai travaillé des années avec [Ionic](https://ionicframework.com/) pour construire des applications polyvalentes incroyables, et c'était l'un des meilleurs choix pendant des années. Mais maintenant, je ne le recommande plus ; il est très difficile de l'intégrer avec React, et ce n'est pas vraiment utile quand vous avez déjà [tailwindcss](https://tailwindcss.com/).

Si vous voulez une interface utilisateur mobile au look génial qui s'adapte aux styles spécifiques d'iOS et d'Android, je recommande Konsta UI.

Vous devez déjà avoir [installé tailwind](https://tailwindcss.com/docs/guides/vite/#react)

Pour l'utiliser, nous devons simplement installer le paquet react :

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

`konstaConfig` étendra la configuration Tailwind CSS par défaut (ou la vôtre) avec quelques variantes et utilitaires supplémentaires nécessaires pour Konsta UI.

Maintenant, nous devons configurer le composant principal [App](https://konstaui.com/react/app/) afin de pouvoir définir certains paramètres globaux (comme le `theme`).

Nous devons envelopper toute l'application avec `App` dans le `src/App.js` :

```javascript
import { App } from 'konsta/react';
import './App.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### Page d'exemple

Maintenant que tout est configuré, nous pouvons utiliser les composants React de Konsta UI dans notre application React.

Par exemple, ouvrons `src/App.js` et modifions-le comme suit :

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/react';

function App() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your React & Konsta UI app. Let's see what we have here.
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

export default App;
```

Si le rechargement en direct est désynchronisé après l'installation de tous les composants nécessaires, essayez de redémarrer tout. Une fois que vous avez fait cela, vous devriez voir une application mobile ayant un aspect quelque peu natif, construite avec React et Capacitor !

Vous devriez voir la page suivante en résultat :

<p>
  <h2>
</h2>

## Conclusion

Capacitor est une excellente option pour construire des applications natives basées sur un projet web existant, offrant une manière simple de partager du code et de maintenir une interface utilisateur cohérente.

Et avec l'ajout de [Capgo](https://capgo.app/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bogues.

Si vous souhaitez apprendre comment ajouter Capgo à votre application React, jetez un œil à l'article suivant :
