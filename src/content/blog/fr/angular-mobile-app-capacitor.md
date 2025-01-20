---
slug: fr__angular-mobile-app-capacitor
title: Développer des applications mobiles avec Angular et Capacitor
description: >-
  Découvrez comment créer une application mobile avec Angular et Capacitor et
  améliorer l'interface utilisateur native avec Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Illustration d'Angular et Capacitor
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dans ce tutoriel, nous commencerons avec une nouvelle application Angular et passerons au domaine des applications mobiles natives en utilisant Capacitor. Facultativement, vous pouvez également ajouter Konsta UI pour une interface utilisateur mobile améliorée avec Tailwind CSS.

Capacitor vous permet de convertir facilement votre application web Angular en une application mobile native sans nécessiter de modifications importantes ou d'apprendre une nouvelle compétence comme React Native.

Avec quelques étapes simples, la plupart des applications Angular peuvent être transformées en applications mobiles.

Ce tutoriel vous guidera à travers le processus, en commençant par une nouvelle application Angular, puis en intégrant Capacitor pour passer au domaine des applications mobiles natives. De plus, vous pouvez facultativement utiliser Konsta UI pour améliorer votre interface utilisateur mobile avec Tailwind CSS.

## À propos de Capacitor

Capacitor est un changement de donne ! Vous pouvez l'intégrer sans effort dans n'importe quel projet web, et il enveloppera votre application dans une webview native, générant le projet natif Xcode et Android Studio pour vous. De plus, ses plugins fournissent un accès aux fonctionnalités natives de l'appareil comme l'appareil photo via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans aucune configuration compliquée ni courbe d'apprentissage abrupte. Son API légère et sa fonctionnalité rationalisée en font un jeu d'enfant à intégrer dans votre projet. Croyez-moi, vous serez étonné de la facilité avec laquelle vous obtiendrez une application native entièrement fonctionnelle avec Capacitor !

## Préparer votre application Angular

Pour créer une nouvelle application Angular, exécutez la commande suivante :

```shell
ng new my-app
cd my-app
```

Choisissez "Angular" lorsqu'on vous demande la version d'Angular.

Pour créer une application mobile native, nous avons besoin d'un **export** de notre projet. Ainsi, incluons un script simple dans notre **package.json** qui peut être utilisé pour construire et copier le projet Angular :

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Après avoir exécuté la commande `build`, vous devriez pouvoir repérer un nouveau dossier `dist` à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement.

## Ajouter Capacitor à votre application Angular

Pour empaqueter n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande `sync`.

Tout d'abord, nous pouvons installer le CLI Capacitor comme dépendance de développement, puis le configurer dans notre projet. Pendant la configuration, vous pouvez appuyer sur "entrée" pour accepter les valeurs par défaut pour le nom et l'ID du bundle.

Ensuite, nous devons installer le package principal et les packages pertinents pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Angular project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

À ce stade, vous devriez pouvoir observer de nouveaux dossiers **ios** et **android** dans votre projet Angular.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer Android Studio. Pour iOS, vous avez besoin d'un Mac et vous devez installer Xcode.

De plus, vous devriez trouver un fichier **capacitor.config.ts** dans votre projet, qui contient quelques paramètres fondamentaux de Capacitor utilisés pendant la synchronisation. La seule chose à laquelle vous devez prêter attention est le **webDir**, qui doit pointer vers le résultat de votre commande de construction. Actuellement, il est inexact.

Pour rectifier cela, ouvrez le fichier **capacitor.config.json** et mettez à jour le **webDir** :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Vous pouvez l'essayer en exécutant les commandes suivantes :

```shell
npm run build
npx cap sync
```

La première commande `npm run build` construira simplement votre projet Angular et copiera la construction statique, tandis que la seconde commande `npx cap sync` synchronisera tout le code web aux bons endroits des plateformes natives afin qu'ils puissent être affichés dans une application.

De plus, la commande sync pourrait mettre à jour les plateformes natives et installer des plugins, donc lorsque vous installez de nouveaux plugins Capacitor, il est temps d'exécuter à nouveau `npx cap sync`.Sans s'en rendre compte, vous avez maintenant terminé, alors voyons l'application sur un appareil !

## Construire et déployer des applications natives

Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au programme Apple Developer pour iOS et à la Google Play Console pour Android.

Si vous débutez dans le développement mobile natif, vous pouvez utiliser le CLI Capacitor pour ouvrir facilement les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois que vous avez configuré vos projets natifs, déployer votre application sur un appareil connecté est facile. Dans Android Studio, vous devez simplement attendre que tout soit prêt, et vous pouvez déployer votre application sur un appareil connecté sans modifier de paramètres. Voici un exemple :

![android-studio-run](/android-studio-run.webp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un vrai appareil plutôt que sur le simulateur. Si vous ne l'avez jamais fait auparavant, Xcode vous guide tout au long du processus (mais encore une fois, vous devez être inscrit au programme Developer). Ensuite, vous pouvez simplement appuyer sur play pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-run.webp)

Félicitations ! Vous avez réussi à déployer votre application web Angular sur un appareil mobile. Voici un exemple :

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Mais attendez, il existe également un moyen plus rapide de le faire pendant le développement.

## Rechargement en direct de Capacitor

À ce stade, vous êtes probablement habitué au rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir la même fonctionnalité **sur un appareil mobile** avec un effort minimal !

Activez l'accès à votre application hébergée localement avec le rechargement en direct **sur votre réseau** en faisant charger le contenu à l'application Capacitor depuis l'URL spécifique.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez le découvrir en exécutant la commande suivante dans le terminal :

```shell
ipconfig getifaddr en0
```

Sur Windows, exécutez :

```shell
ipconfig
```

Puis recherchez l'adresse IPv4.

Nous pouvons demander à Capacitor de charger l'application directement depuis le serveur en ajoutant une autre entrée à notre fichier `capacitor.config.ts` :

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

Assurez-vous d'utiliser **l'IP et le port corrects**, j'ai utilisé le port Angular par défaut dans cet exemple.

Maintenant, nous pouvons appliquer ces changements en les copiant dans notre projet natif :

```shell
npx cap copy
```

La commande `copy` est similaire à `sync`, mais elle ne fera que **copier les modifications apportées au dossier web** et à la configuration, sans mettre à jour le projet natif.

Vous pouvez maintenant déployer votre application une fois de plus via Android Studio ou Xcode. Après cela, si vous modifiez quelque chose dans votre application Angular, **l'application se rechargera automatiquement** et affichera les changements !

**Gardez à l'esprit** que si vous installez de nouveaux plugins comme la caméra, cela nécessite toujours une reconstruction de votre projet natif. Cela est dû au fait que des fichiers natifs sont modifiés, et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port Angular par défaut à des fins de démonstration.

## Utilisation des plugins Capacitor

Jetons un coup d'œil à la façon d'utiliser un plugin Capacitor en action, que nous avons mentionné plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin assez simple en exécutant :

```shell
npm i @capacitor/share
```

Il n'y a rien de fantaisiste dans le [plugin Share](https://capacitorjs.com/docs/apis/share/), mais il fait quand même apparaître la boîte de dialogue de partage native ! Pour cela, nous n'avons maintenant qu'à importer le package et appeler la fonction `share()` correspondante depuis notre application, alors modifions le fichier **src/app/app.component.ts** comme ceci :

```typescript
import { Component } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  async share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
}
```

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation, puis redéployer l'application sur notre appareil.Pour ce faire, exécutez la commande suivante :

```
npx cap sync
```

Après avoir appuyé sur le bouton, vous pourrez voir la belle boîte de dialogue de partage native en action !

## Ajout de Konsta UI

Pour utiliser Konsta UI dans votre application Nuxt 3, vous devez avoir [tailwind déjà installé](https://tailwindcss.com/docs/guides/angular/) et installer le package :

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
    './src/**/*.{html,ts}',
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

`konstaConfig` étendra la configuration Tailwind CSS par défaut (ou votre configuration personnalisée) avec quelques variantes supplémentaires et des utilitaires nécessaires pour Konsta UI.

Maintenant, nous devons configurer le composant principal [App](https://konstaui.com/vue/app/) afin de pouvoir définir certains paramètres globaux (comme le `theme`).

Nous devons envelopper toute l'application avec `App` dans le fichier `src/app/app.component.html` :

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants Vue de Konsta UI dans nos pages Angular.

Par exemple, ouvrons `src/app/app.component.html` et modifions-le comme suit :

```html
<app>
  <page>
    <navbar title="My App" />

    <block strong>
      <p>
        Here is your Angular & Konsta UI app. Let's see what we have here.
      </p>
    </block>
    <block-title>Navigation</block-title>
    <list>
      <list-item href="/about/" title="About" />
      <list-item href="/form/" title="Form" />
    </list>

    <block strong class="flex space-x-4">
      <button>Button 1</button>
      <button>Button 2</button>
    </block>
  </page>
</app>
```

Si le rechargement automatique est désynchronisé après l'installation de tous les composants nécessaires, essayez de tout redémarrer. Une fois cela fait, vous devriez voir une application mobile avec un aspect quelque peu natif, construite avec Angular et Capacitor !

Vous devriez voir la page suivante comme résultat :

<app>
  <h1>
</h1>

## Conclusion

Capacitor est une excellente option pour construire des applications natives basées sur un projet web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente.

Et avec l'ajout de [Capgo](https://capgo.app/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez apprendre comment ajouter Capgo à votre application Angular, jetez un œil à l'article suivant :