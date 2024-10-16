---
slug: create-react-mobile-apps-with-capacitor
title: Développer des applications mobiles avec React et Capacitor
description: >-
  Apprenez à créer une application mobile avec React et Capacitor et à améliorer
  l'interface utilisateur native avec Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustration de React et Capacitor
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dans ce tutoriel, nous commencerons avec une nouvelle application React et passerons au développement mobile natif en utilisant Capacitor. Optionnellement, vous pouvez également ajouter Konsta UI pour une interface utilisateur mobile améliorée avec Tailwind CSS.

Capacitor vous permet de convertir facilement votre application web React en une application mobile native sans modifications significatives ni apprentissage d'une nouvelle compétence comme React Native.

Avec quelques étapes simples, la plupart des applications React peuvent être transformées en applications mobiles.

Ce tutoriel vous guidera à travers le processus, en commençant par une nouvelle application React, puis en incorporant Capacitor pour passer dans le domaine des applications mobiles natives. De plus, vous pouvez optionnellement utiliser Konsta UI pour améliorer votre interface utilisateur mobile avec Tailwind CSS.

## À propos de Capacitor

Capacitor est révolutionnaire ! Vous pouvez l'intégrer sans effort dans n'importe quel projet web, et il enveloppera votre application dans une webview native, générant le projet Xcode et Android Studio natif pour vous. De plus, ses plugins donnent accès aux fonctionnalités natives de l'appareil comme l'appareil photo via un pont JS.

Avec Capacitor, vous obtenez une application mobile native fantastique sans configuration compliquée ni courbe d'apprentissage abrupte. Son API légère et ses fonctionnalités rationalisées en font un jeu d'enfant à intégrer dans votre projet. Croyez-moi, vous serez étonné de la facilité avec laquelle vous obtiendrez une application native entièrement fonctionnelle avec Capacitor !

## Préparation de votre application React

Bien qu'il existe diverses méthodes pour initier des applications React, optons pour la plus simple dans ce tutoriel qui fournit une application React vierge :

## Ajout de Capacitor à votre application React

Pour packager n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande `sync`.

Tout d'abord, nous pouvons installer le Capacitor CLI en tant que dépendance de développement, puis le configurer dans notre projet. Pendant la configuration, vous pouvez appuyer sur "Entrée" pour accepter les valeurs par défaut pour le nom et l'ID du package.

Ensuite, nous devons installer le package core et les packages pertinents pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

À ce stade, vous devriez pouvoir observer de nouveaux dossiers **ios** et **android** dans votre projet React.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer Android Studio. Pour iOS, vous avez besoin d'un Mac et devez installer Xcode.

De plus, vous devriez trouver un fichier **capacitor.config.ts** dans votre projet, qui contient certains paramètres fondamentaux de Capacitor utilisés pendant la synchronisation. La seule chose à laquelle vous devez prêter attention est le **webDir**, qui doit pointer vers le résultat de votre commande de build. Actuellement, il est inexact.

Pour rectifier cela, ouvrez le fichier **capacitor.config.json** et mettez à jour le **webDir** :

Vous pouvez l'essayer en exécutant les commandes suivantes :

La première commande `npm run build` construira simplement votre projet React et exportera la build statique.

Tandis que la seconde commande `npx cap sync` synchronisera tout le code web aux bons endroits des plateformes natives afin qu'il puisse être affiché dans une application.

De plus, la commande sync peut mettre à jour les plateformes natives et installer des plugins, donc lorsque vous installez de nouveaux plugins Capacitor, il est temps d'exécuter à nouveau `npx cap sync`.Sans vous en rendre compte, vous avez maintenant terminé, alors voyons l'application sur un appareil !

## Construire et déployer des applications natives

Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au Programme Apple Developer pour iOS et à la Google Play Console pour Android.

Si vous débutez dans le développement mobile natif, vous pouvez utiliser l'interface de commande Capacitor pour ouvrir facilement les deux projets natifs :

Pour configurer vos projets natifs, déployer votre application sur un appareil connecté est facile. Dans Android Studio, vous devez simplement attendre que tout soit prêt, et vous pouvez déployer votre application sur un appareil connecté sans modifier aucun paramètre. Voici un exemple :

![android-studio-run](/android-studio-run.webp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un véritable appareil plutôt que sur le simulateur. Si vous ne l'avez jamais fait auparavant, Xcode vous guide tout au long du processus (mais encore une fois, vous devez être inscrit au Programme Developer). Après cela, vous pouvez simplement appuyer sur lecture pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-run.webp)

Félicitations ! Vous avez réussi à déployer votre application web React sur un appareil mobile. Voici un exemple :

Mais attendez, il existe également une façon plus rapide de le faire pendant le développement.

## Rechargement en direct de Capacitor

À ce stade, vous êtes probablement habitué à avoir un rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir la même fonctionnalité **sur un appareil mobile** avec un effort minimal !

Activez l'accès à votre application hébergée localement avec rechargement en direct **sur votre réseau** en faisant charger le contenu de l'URL spécifique par l'application Capacitor.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez le découvrir en exécutant la commande suivante dans le terminal :

Sur Windows, exécutez :

Puis recherchez l'adresse IPv4.

Nous pouvons indiquer à Capacitor de charger l'application directement depuis le serveur en ajoutant une autre entrée à notre fichier `capacitor.config.ts` :

Assurez-vous d'utiliser **l'IP et le port corrects**, j'ai utilisé le port React par défaut dans cet exemple.

Maintenant, nous pouvons appliquer ces changements en les copiant vers notre projet natif :

La commande `copy` est similaire à `sync`, mais elle ne **copiera que les modifications apportées au dossier web** et à la configuration, sans mettre à jour le projet natif.

Vous pouvez maintenant déployer votre application une fois de plus via Android Studio ou Xcode. Après cela, si vous modifiez quelque chose dans votre application React, **l'application se rechargera automatiquement** et affichera les changements !

**Gardez à l'esprit** que si vous installez de nouveaux plugins tels que l'appareil photo, cela nécessite toujours une reconstruction de votre projet natif. C'est parce que les fichiers natifs sont modifiés, et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port React par défaut à des fins de démonstration.

## Utilisation des plugins Capacitor

Examinons comment utiliser un plugin Capacitor en action, dont nous avons parlé plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin assez simple en exécutant :

Il n'y a rien de particulier dans le [plugin Share](https://capacitorjs.com/docs/apis/share/), mais il fait quand même apparaître la boîte de dialogue de partage native ! Pour cela, nous n'avons maintenant qu'à importer le package et appeler la fonction `share()` depuis notre application. Modifions le **src/App.js** comme suit :

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation, puis redéployer l'application sur notre appareil.Pour ce faire, exécutez la commande suivante :

```shell
npx create-react-app my-app
```

Après avoir appuyé sur le bouton, vous pouvez voir la magnifique boîte de dialogue de partage native en action !

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

Pour rendre le bouton plus adapté aux mobiles, nous pouvons ajouter du style en utilisant ma bibliothèque de composants UI préférée pour les applications web - React (sans jeu de mots)

## Ajout de Konsta UI

J'ai travaillé pendant des années avec [Ionic](https://ionicframeworkcom/) pour créer d'excellentes applications multiplateformes, et c'était l'un des meilleurs choix pendant des années. Mais maintenant je ne le recommande plus ; c'est très compliqué de l'intégrer avec React, et ça n'en vaut pas vraiment la peine quand on a déjà [tailwindcss](https://tailwindcsscom/)

Si vous voulez une interface mobile attrayante qui s'adapte au style spécifique d'iOS et d'Android, je recommande Konsta UI.

Vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/guides/vite/#react)

Pour l'utiliser, nous avons seulement besoin d'installer le package react :

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

De plus, vous devez modifier votre fichier `tailwindconfigjs` :

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

`konstaConfig` étendra la configuration Tailwind CSS par défaut (ou votre configuration personnalisée) avec quelques variantes supplémentaires et des utilitaires nécessaires pour Konsta UI.

Maintenant, nous devons configurer le composant principal [App](https://konstauicom/react/app/) pour que nous puissions définir certains paramètres globaux (comme `theme`)

Nous devons envelopper toute l'application avec `App` dans le `src/Appjs` :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants React de Konsta UI dans notre application React.

Par exemple, ouvrons `src/Appjs` et modifions-le comme suit :

```shell
npm run build
npx cap sync
```

Si le rechargement en direct est désynchronisé après l'installation de tous les composants nécessaires, essayez de tout redémarrer. Une fois cela fait, vous devriez voir une application mobile avec un aspect quelque peu natif, construite avec React et Capacitor !

Vous devriez voir la page suivante comme résultat :

<div>
  <h1>
</h1>

## Conclusion

Capacitor est une excellente option pour construire des applications natives basées sur un projet web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente.

Et avec l'ajout de [Capgo](https://capgoapp/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez apprendre comment ajouter Capgo à votre application React, jetez un œil à l'article suivant :