---
slug: building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: Création d'applications mobiles avec Nuxt 3 et Capacitor.
description: >-
  Comment créer une application mobile avec Nuxt 3, Capacitor et implémenter une
  interface utilisateur native avec Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 3 and Capgo illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: fr
---

Dans ce didacticiel, nous allons commencer avec une nouvelle application [Nuxt 3](https://nuxtjsorg/), nous déplacer dans notre pays natal en utilisant Capacitor et éventuellement ajouter également [Konsta UI](https://konstauicom/) pour un Tailwind amélioré. Interface utilisateur mobile CSS, bien que la dernière étape soit totalement facultative

En utilisant Capacitor, vous pouvez facilement convertir votre application Web Nuxt 3 en une application mobile native sans nécessiter de modifications importantes ni acquérir une nouvelle compétence comme React Native. 

En quelques étapes simples, la plupart des applications Nuxt 3 peuvent être transformées en applications mobiles 

Ce didacticiel vous guidera tout au long du processus, en commençant par une nouvelle application Nuxt 3, puis en incorporant Capacitor pour passer au domaine des applications mobiles natives. De plus, vous pouvez éventuellement utiliser [Konsta UI](https://konstauicom/) pour améliorer votre interface utilisateur mobile avec Tailwind CSS

## À propos du condensateur

CapacitorJS change vraiment la donne ! Vous pouvez l'incorporer sans effort dans n'importe quel projet Web, et il enveloppera votre application dans une vue Web native, générant pour vous le projet natif Xcode et Android Studio. De plus, ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API mince et ses fonctionnalités simplifiées facilitent l'intégration dans votre projet. Croyez-moi, vous serez étonné de voir à quel point il est facile de réaliser une application mobile native fantastique. application native fonctionnelle avec Capacitor !

## Préparer votre application Nuxt 3

Pour créer une nouvelle application Nuxt 3, exécutez la commande suivante :

```shell
npx nuxi init my-app
cd my-app
npm install
```

Choisissez "Nuxt 3" lorsque vous êtes invité à indiquer la version de Nuxt

Afin de créer une application mobile native, nous avons besoin d'un **export** de notre projet. Ainsi, incluons un script simple dans notre **packagejson** qui peut être utilisé pour créer et copier le projet Nuxt :

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Après avoir exécuté la commande « generate », vous devriez pouvoir repérer un nouveau dossier « dist » à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement

## Ajout d'un condensateur à votre application Nuxt 3

Pour empaqueter n'importe quelle application Web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande « sync »

Tout d'abord, nous pouvons installer la [Capacitor CLI](https://capacitorjscom/docs/cli/) en tant que dépendance de développement, puis la configurer dans notre projet. Lors de l'installation, vous pouvez appuyer sur « Entrée » pour accepter les valeurs par défaut. pour le nom et l'ID du paquet

Ensuite, nous devons installer le package principal et les packages correspondants pour les plateformes iOS et Android.

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

À ce stade, vous devriez pouvoir observer les nouveaux dossiers **ios** et **android** dans votre projet Nuxt 3.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android ultérieurement, vous devez installer [Android Studio](https://developerandroidcom/studio/) Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developerapplecom/xcode/)

De plus, vous devriez trouver un fichier **capacitorconfigts** dans votre projet, qui contient certains paramètres fondamentaux du condensateur utilisés lors de la synchronisation. La seule chose à laquelle vous devez prêter attention est le **webDir**, qui doit pointer vers le résultat de votre commande de build Actuellement, elle est inexacte

Pour remédier à cela, ouvrez le fichier **capacitorconfigjson** et mettez à jour le **webDir** :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Vous pouvez l'essayer en exécutant les commandes suivantes :

```shell
npm run generate
npx cap sync
```

La première commande « npm run generate » construira simplement votre projet Nuxt 3 et copiera la version statique, tandis que la deuxième commande « npx cap sync » synchronisera tout le code Web aux bons endroits des plates-formes natives afin qu'ils puissent être affichés dans une application

De plus, la commande de synchronisation peut mettre à jour les plates-formes natives et installer des plugins, donc lorsque vous installez un nouveau [plugins de condensateur](https://capacitorjscom/docs/plugins/), il est temps d'exécuter à nouveau `npx cap sync`Sans vous en rendre compte, vous avez maintenant terminé, alors voyons l'application sur un appareil !

## Créer et déployer des applications natives

Pour développer des applications iOS, **Xcode** doit être installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous envisagez de distribuer votre application sur l'App Store, vous devez vous inscrire dans le programme pour développeurs Apple pour iOS et la console Google Play pour Android

Si vous débutez dans le développement mobile natif, vous pouvez utiliser la CLI Capacitor pour ouvrir facilement les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois que vous avez configuré vos projets natifs, déployer votre application sur un appareil connecté est simple. Dans Android Studio, il vous suffit d'attendre que tout soit prêt et vous pouvez déployer votre application sur un appareil connecté sans modifier aucun paramètre. Voici un exemple: 

![android-studio-run](/android-studio-runwebp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un appareil réel au lieu de simplement sur le simulateur. Si vous ne l'avez pas encore fait, Xcode vous guide tout au long du processus (mais encore une fois, vous devez être inscrit au Programme pour développeurs) Après cela, vous pouvez simplement appuyer sur Play pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-runwebp)

Félicitations! Vous avez déployé avec succès votre application Web Nuxt 3 sur un appareil mobile. Voici un exemple :

<div class="mx-auto" style="largeur : 50%;">
  <img src="/nuxtjs-mobile-appwebp" alt="nuxtjs-mobile-app">
</div>

Mais attendez, il existe également un moyen plus rapide de le faire pendant le développement.

## Rechargement en direct du condensateur

À présent, vous êtes probablement habitué au rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir les mêmes fonctionnalités **sur un appareil mobile** avec un minimum d'effort !

Activez l'accès à votre application hébergée localement avec le rechargement en direct **sur votre réseau** en demandant à l'application Capacitor de charger le contenu à partir de l'URL spécifique.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez la découvrir en exécutant la commande suivante dans le terminal :

```shell
ipconfig getifaddr en0
```

Sous Windows, exécutez :

```shell
ipconfig
```

Recherchez ensuite l'adresse IPv4

Nous pouvons demander à Capacitor de charger l'application directement depuis le serveur en ajoutant une autre entrée à notre fichier `capacitorconfigts` :

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

Assurez-vous d'utiliser **l'adresse IP et le port corrects**, j'ai utilisé le port Nuxt 3 par défaut dans cet exemple

Maintenant, nous pouvons appliquer ces modifications en les copiant dans notre projet natif :

```shell
npx cap copy
```

La commande `copy` est similaire à `sync`, mais elle **copiera uniquement les modifications apportées au dossier Web** et à la configuration, sans mettre à jour le projet natif

Vous pouvez désormais déployer votre application une nouvelle fois via Android Studio ou Xcode. Après cela, si vous modifiez quelque chose dans votre application Nuxt, **l'application se rechargera automatiquement** et affichera les modifications !

**Gardez à l'esprit** que si vous installez de nouveaux plugins tels que la caméra, cela nécessite toujours une reconstruction de votre projet natif. En effet, les fichiers natifs sont modifiés et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'adresse IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port Nuxt 3 par défaut à des fins de démonstration.

## Utilisation des plugins de condensateur

Voyons comment utiliser en action un plugin Capacitor, que nous avons évoqué plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin assez simple en exécutant :

```shell
npm i @capacitor/share
```

Il n'y a rien d'extraordinaire à propos du [plug-in de partage](https://capacitorjscom/docs/apis/share/), mais il affiche quand même la boîte de dialogue de partage native ! Pour cela, il nous suffit maintenant d'importer le package et d'appeler la fonction `share()` correspondante depuis notre application, changeons donc les **pages/indexvue** par ceci :

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

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation puis redéployer l'application sur notre appareil.Pour ce faire, exécutez la commande suivante :

```
npx cap sync
```

Après avoir appuyé sur le bouton, vous pourrez assister à la magnifique boîte de dialogue de partage natif en action !

## Ajout de l'interface utilisateur de Konsta

Pour utiliser Konsta UI dans votre application Nuxt 3, vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/guides/nuxtjs/) et installer le package :

```shell
npm i konsta
```

De plus, vous devez modifier votre fichier `tailwindconfigjs` :

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

`konstaConfig` étendra la configuration CSS Tailwind par défaut (ou personnalisée) avec quelques variantes supplémentaires et utilitaires d'assistance requis pour l'interface utilisateur de Konsta

Nous devons maintenant configurer le composant principal [App](https://konstauicom/vue/app/) afin de pouvoir définir certains paramètres globaux (comme `theme`)

Nous devons envelopper l'ensemble de l'application avec `App` dans `pages/_appvue` :

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

Maintenant que tout est configuré, nous pouvons utiliser les composants Konsta UI Vue dans nos pages Nuxt 3

Par exemple, ouvrons `pages/indexvue` et modifions-le comme suit :

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

Si le live reload est désynchronisé après avoir installé tous les composants nécessaires, essayez de tout redémarrer. Une fois cela fait, vous devriez voir une application mobile au look quelque peu natif, construite avec Nuxt 3 et Capacitor !

En conséquence, vous devriez voir la page suivante :

<div class="mx-auto" style="largeur : 50%;">
  <img src="/konsta-nuxtwebp" alt="konsta-nuxt">
</div>

## Conclusion

Capacitor est une excellente option pour créer des applications natives basées sur un projet Web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente. 

Et avec l'ajout de [Capgo](https://capgoapp/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant ainsi que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez savoir comment ajouter Capgo à votre application Nextjs, jetez un oeil à l'article suivant :

## Crédits

Merci beaucoup à Simon, cet article est basé sur [cet article](https://devdacticcom/nextjs-and-capacitor/) réécrit pour nuxt3 avec chat-gpt-4 et adapté