---
slug: angular-mobile-app-capacitor
title: Créer des applications mobiles avec Angular et Capacitor
description: >-
  Apprenez à créer des applications mobiles avec Angular et Capacitor, et une
  interface utilisateur native avancée avec Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Illustration Angular et Capacitor
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Voici la traduction en français :

Dans ce tutoriel, nous allons commencer avec une nouvelle application [Angular](https://angulario/) et la transformer en application mobile native en utilisant Capacitor. En option, vous pouvez également ajouter [Konsta UI](https://konstauicom/) pour une interface mobile améliorée avec Tailwind CSS.

Capacitor vous permet de convertir facilement votre application web Angular en une application mobile native sans nécessiter de modifications importantes ni d'apprentissage d'une nouvelle compétence comme React Native.

Avec quelques étapes simples, la plupart des applications Angular peuvent être transformées en applications mobiles.

Ce tutoriel vous guidera à travers le processus, en commençant par une nouvelle application Angular puis en intégrant Capacitor pour passer au domaine des applications mobiles natives. De plus, vous pouvez optionnellement utiliser [Konsta UI](https://konstauicom/) pour améliorer votre interface mobile avec Tailwind CSS.

## À propos de Capacitor

CapacitorJS change la donne ! Vous pouvez l'intégrer sans effort dans n'importe quel projet web, et il enveloppera votre application dans une webview native, générant le projet natif Xcode et Android Studio pour vous. De plus, ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API légère et ses fonctionnalités rationalisées en font un jeu d'enfant à intégrer dans votre projet. Croyez-moi, vous serez étonné de la facilité avec laquelle vous obtiendrez une application native entièrement fonctionnelle avec Capacitor !

## Préparation de votre application Angular

Pour créer une nouvelle application Angular, exécutez la commande suivante :

[[CODE_BLOCK]]

Choisissez "Angular" lorsqu'on vous demande la version d'Angular.

Pour créer une application mobile native, nous avons besoin d'un **export** de notre projet. Ajoutons donc un script simple dans notre **package.json** qui peut être utilisé pour construire et copier le projet Angular :

[[CODE_BLOCK]]

Après avoir exécuté la commande `build`, vous devriez pouvoir repérer un nouveau dossier `dist` à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement.

## Ajout de Capacitor à votre application Angular

Pour empaqueter n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande `sync`.

Tout d'abord, nous pouvons installer le [Capacitor CLI](https://capacitorjs.com/docs/cli/) comme dépendance de développement, puis le configurer dans notre projet. Pendant la configuration, vous pouvez appuyer sur "entrée" pour accepter les valeurs par défaut pour le nom et l'ID du bundle.

Ensuite, nous devons installer le package principal et les packages pertinents pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

[[CODE_BLOCK]]

À ce stade, vous devriez pouvoir observer de nouveaux dossiers **ios** et **android** dans votre projet Angular.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer [Android Studio](https://developer.android.com/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developer.apple.com/xcode/).

De plus, vous devriez trouver un fichier **capacitor.config.ts** dans votre projet, qui contient des paramètres fondamentaux de Capacitor utilisés pendant la synchronisation. La seule chose à laquelle vous devez prêter attention est le **webDir**, qui doit pointer vers le résultat de votre commande de build. Actuellement, il est inexact.

Pour corriger cela, ouvrez le fichier **capacitor.config.json** et mettez à jour le **webDir** :

[[CODE_BLOCK]]

Vous pouvez l'essayer en exécutant les commandes suivantes :

[[CODE_BLOCK]]

La première commande `npm run build` construira simplement votre projet Angular et copiera la build statique, tandis que la seconde commande `npx cap sync` synchronisera tout le code web aux bons endroits des plateformes natives pour qu'ils puissent être affichés dans une application.

De plus, la commande sync peut mettre à jour les plateformes natives et installer des plugins, donc lorsque vous installez de nouveaux [plugins Capacitor](https://capacitorjs.com/docs/plugins/), c'est le moment d'exécuter `npx cap sync` à nouveau.Sans vous en apercevoir, vous avez maintenant terminé, alors voyons l'application sur un appareil !

## Construire et déployer des applications natives

Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'app store, vous devez vous inscrire au Programme de Développeur Apple pour iOS et à la Google Play Console pour Android.

Si vous débutez dans le développement mobile natif, vous pouvez utiliser le CLI Capacitor pour ouvrir facilement les deux projets natifs :

[[CODE_BLOCK]]

Une fois vos projets natifs configurés, déployer votre application sur un appareil connecté est facile. Dans Android Studio, vous devez simplement attendre que tout soit prêt, et vous pouvez déployer votre application sur un appareil connecté sans modifier de paramètres. Voici un exemple :

![android-studio-run](/android-studio-run.webp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un appareil réel plutôt que sur le simulateur. Si vous ne l'avez jamais fait, Xcode vous guide à travers le processus (mais encore une fois, vous devez être inscrit au Programme Développeur). Ensuite, vous pouvez simplement appuyer sur lecture pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-run.webp)

Félicitations ! Vous avez réussi à déployer votre application web Angular sur un appareil mobile. Voici un exemple :

[[HTML_TAG]]
  [[HTML_TAG]]
[[HTML_TAG]]

Mais attendez, il existe aussi une façon plus rapide de faire cela pendant le développement.

## Rechargement en direct avec Capacitor

À présent, vous êtes probablement habitué au rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir la même fonctionnalité **sur un appareil mobile** avec un minimum d'effort !

Activez l'accès à votre application hébergée localement avec le rechargement en direct **sur votre réseau** en faisant charger à l'application Capacitor le contenu depuis l'URL spécifique.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez le découvrir en exécutant la commande suivante dans le terminal :

[[CODE_BLOCK]]

Sur Windows, exécutez :

[[CODE_BLOCK]]

Puis recherchez l'adresse IPv4.

Nous pouvons demander à Capacitor de charger l'application directement depuis le serveur en ajoutant une autre entrée à notre fichier `capacitor.config.ts` :

[[CODE_BLOCK]]

Assurez-vous d'utiliser **l'IP et le port corrects**, j'ai utilisé le port Angular par défaut dans cet exemple.

Maintenant, nous pouvons appliquer ces modifications en les copiant vers notre projet natif :

[[CODE_BLOCK]]

La commande `copy` est similaire à `sync`, mais elle ne fera que **copier les modifications apportées au dossier web** et à la configuration, sans mettre à jour le projet natif.

Vous pouvez maintenant déployer votre application une fois de plus via Android Studio ou Xcode. Après cela, si vous modifiez quelque chose dans votre application Angular, **l'application se rechargera automatiquement** et affichera les changements !

**Gardez à l'esprit** que si vous installez de nouveaux plugins comme la caméra, cela nécessite toujours une reconstruction de votre projet natif. C'est parce que les fichiers natifs sont modifiés, et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port Angular par défaut à titre d'exemple.

## Utilisation des plugins Capacitor

Examinons comment utiliser un plugin Capacitor en action, dont nous avons parlé plusieurs fois auparavant. Pour cela, nous pouvons installer un plugin assez simple en exécutant :

[[CODE_BLOCK]]

Il n'y a rien de fantaisiste dans le [plugin Share](https://capacitorjs.com/docs/apis/share/), mais il fait quand même apparaître la boîte de dialogue de partage native ! Pour cela, nous devons maintenant simplement importer le package et appeler la fonction `share()` correspondante depuis notre application, alors modifions le fichier **src/app/app.component.ts** comme ceci :

[[CODE_BLOCK]]

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation puis redéployer l'application sur notre appareil.