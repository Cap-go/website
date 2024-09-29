---
slug: live-update-with-quasar-and-capacitor
title: >-
  Création d'applications mobiles avec mises à jour en direct, Quasar et
  Capacitor.
description: >-
  Comment créer une application mobile avec Quasar, Capacitor et mettre en œuvre
  des mises à jour en direct.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Quasar and Capgo illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dans ce didacticiel, nous commencerons par créer une nouvelle application Web à l'aide de [Quasar](https://quasardev/). Plus tard, nous apprendrons comment la transformer en application mobile à l'aide de Capacitor. Si vous souhaitez donner à votre application l'apparence mieux sur mobile

Avec Capacitor, vous pouvez transformer votre application Web Quasar en application mobile sans avoir à faire beaucoup de choses difficiles ou apprendre une toute nouvelle façon de créer des applications comme vous le feriez avec quelque chose appelé React Native. 

Ce didacticiel vous guidera tout au long du processus, en commençant par une nouvelle application Quasar, puis en incorporant Capacitor pour passer au domaine des applications mobiles natives. De plus, vous utiliserez [Capgo](https://capgoapp/) pour envoyer une mise à jour en direct à votre application en quelques secondes

## À propos du condensateur

CapacitorJS change vraiment la donne ! Vous pouvez l'incorporer sans effort dans n'importe quel projet Web, et il enveloppera votre application dans une vue Web native, générant pour vous le projet natif Xcode et Android Studio. De plus, ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API mince et ses fonctionnalités simplifiées facilitent l'intégration dans votre projet. Croyez-moi, vous serez étonné de voir à quel point il est facile de réaliser une application mobile native fantastique. application native fonctionnelle avec Capacitor !

## Préparer votre application Quasar

Pour créer une nouvelle application Quasar, exécutez la commande suivante :

```shell
npm init quasar
```

![Configuration du projet Quasar](/quasar-setupwebp)

Choisissez l'option "Application avec Quasar CLI" puis "Quasar v2"

Afin de créer une application mobile native, nous avons besoin d'un **export** de notre projet. Ainsi, incluons un script simple dans notre **packagejson** qui peut être utilisé pour créer et copier le projet Quasar :

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Après avoir exécuté la commande « generate », vous devriez pouvoir repérer un nouveau dossier « dist » à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement

## Ajout d'un condensateur à votre application Quasar

Pour empaqueter n'importe quelle application Web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande « sync »

Tout d'abord, nous pouvons installer la [Capacitor CLI](https://capacitorjscom/docs/cli/) en tant que dépendance de développement, puis la configurer dans notre projet. Lors de l'installation, vous pouvez appuyer sur « Entrée » pour accepter les valeurs par défaut. pour le nom et l'ID du paquet

Ensuite, nous devons installer le package principal et les packages correspondants pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Initialiser le condensateur](/capacitor-initwebp)

À ce stade, vous devriez pouvoir observer les nouveaux dossiers **ios** et **android** dans votre projet Quasar.

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

La première commande « npm run generate » construira simplement votre projet Quasar et copiera la version statique, tandis que la deuxième commande « npx cap sync » synchronisera tout le code Web aux bons endroits des plates-formes natives afin qu'ils puissent être affichés dans un application

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

Félicitations! Vous avez déployé avec succès votre application Web Quasar sur un appareil mobile. Voici un exemple :

<div class="mx-auto" style="largeur : 50%;">
  <img src="/Quasar-mobilewebp" alt="quasar-mobile-app">
</div>

Mais attendez, il existe également un moyen plus rapide de le faire pendant le développement.

## Mise à jour en direct de Capgo

Capgo Live Update est un service qui permet aux développeurs de déployer des mises à jour sur leurs applications mobiles sans passer par le processus de soumission traditionnel de l'App Store. Cela peut être un moyen pratique de corriger rapidement des bugs ou d'effectuer de petites mises à jour d'une application sans attendre le processus de révision de l'App Store.

L'intégration de Capgo dans votre application Quasar est un processus simple qui vous permet d'exploiter la puissance des mises à jour en direct en temps réel. Ce guide étape par étape vous guidera tout au long de l'intégration et de la mise en œuvre de Capgo Live Update, vous permettant de fournir des mises à jour transparentes.

**Inscrivez-vous et accédez au tableau de bord Capgo** :

Il est temps de vous inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [créer un compte Capgo](https://webcapgoapp/register/)

**Installez le SDK Capgo** :

Depuis une ligne de commande, directement à la racine de votre application Capacitor, exécutez :

`npm i @capgo/capacitor-updater && npx cap sync` Pour installer le plugin dans votre application Capacitor

Et puis ajoutez à votre application ce code en remplacement de celui de CodePush :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela indiquera au plugin natif que l'installation a réussi 

**Connectez-vous à Capgo CLOUD** :

Tout d'abord, utilisez le `all` [apikey](https://webcapgoapp/dashboard/apikeys/) présent dans votre compte pour vous connecter avec la CLI :

    `npx @capgo/cli@dernière connexion YOU_KEY`

**Ajoutez votre première application** :

Commençons par créer une application dans Capgo Cloud avec la CLI

```shell
    npx @capgo/cli@latest app add
```
Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application

**Téléchargez votre première version** :

Exécutez la commande pour construire votre code et envoyez-le à Capgo avec : 

```shell
npx @capgo/cli@latest bundle upload`
```

Par défaut, le nom de la version sera celui de votre fichier packagejson

Vérifiez dans [Capgo](https://webcapgoapp/login/) si la build est présente

Vous pouvez même le tester avec mon [application sandbox mobile](https://capgoapp/app_mobile/)

**Définir la chaîne par défaut** :

Après avoir envoyé votre application à Capgo, vous devez définir votre chaîne par défaut pour permettre aux applications de recevoir des mises à jour de Capgo.

`npx @capgo/cli@dernière production de l'ensemble de canaux -s par défaut`

**Configurez l'application pour valider les mises à jour** :

Ajoutez cette configuration à votre fichier JavaScript principal

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ensuite, effectuez une « npm run build && npx cap copy » pour mettre à jour votre application

**Recevez une mise à jour en direct** :

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devez exécuter l'application sur un appareil ou un émulateur.Le moyen le plus simple de procéder consiste simplement à utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté à votre ordinateur.

      exécution du plafond npx [ios | androïde]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les journaux que l'application a effectué la mise à jour

Bravo! 🎉 Vous avez déployé avec succès votre première Live Update. Ce n'est que le début de ce que vous pouvez faire avec Live Updates. Pour en savoir plus, consultez la [documentation complète Live Updates](https://capgoapp/docs/plugin/cloud-mode/getting -commencé/)

## Utilisation des plugins de condensateur

Voyons comment utiliser en action un plugin Capacitor, que nous avons évoqué plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin assez simple en exécutant :

```shell
npm i @capacitor/share
```

Il n'y a rien d'extraordinaire à propos du [plug-in de partage](https://capacitorjscom/docs/apis/share/), mais il affiche quand même la boîte de dialogue de partage native ! Pour cela, il nous suffit maintenant d'importer le package et d'appeler la fonction `share()` correspondante depuis notre application, changeons donc les **pages/indexvue** par ceci :

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
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

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation puis redéployer l'application sur notre appareil. Pour ce faire, exécutez la commande suivante :

```
npx cap sync
```

Après avoir appuyé sur le bouton, vous pourrez assister à la magnifique boîte de dialogue de partage natif en action !

## Ajout optionnel de l'interface utilisateur de Konsta

Pour utiliser Konsta UI dans votre application Quasar, vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/installation/) et installer le package :

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
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants Konsta UI Vue dans nos pages Quasar

Par exemple, ouvrons `pages/indexvue` et modifions-le comme suit :

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Quasar & Konsta UI app. Let's see what we have here.
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

Si le live reload est désynchronisé après avoir installé tous les composants nécessaires, essayez de tout redémarrer. Une fois cela fait, vous devriez voir une application mobile au look quelque peu natif, construite avec Quasar et Capacitor !


## Conclusion

Capacitor est une excellente option pour créer des applications natives basées sur un projet Web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente. 

Et avec l'ajout de [Capgo](https://capgoapp/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant ainsi que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez savoir comment ajouter Capgo à votre application Nextjs, jetez un oeil à l'article suivant :