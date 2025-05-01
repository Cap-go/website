---
slug: create-react-mobile-apps-with-capacitor
title: Mobile Apps mit React und Capacitor erstellen
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

In this tutorial, nous allons commencer avec une nouvelle application [React](https://reactjsorg/) et passer au développement mobile natif en utilisant Capacitor. En option, vous pouvez également ajouter [Konsta UI](https://konstauicom/) pour une interface mobile améliorée avec Tailwind CSS.

Capacitor vous permet de convertir facilement votre application web React en une application mobile native sans modifications importantes ni apprentissage d'une nouvelle compétence comme React Native.

Avec quelques étapes simples, la plupart des applications React peuvent être transformées en applications mobiles.

Ce tutoriel vous guidera à travers le processus, en commençant par une nouvelle application React puis en intégrant Capacitor pour passer au domaine des applications mobiles natives. De plus, vous pouvez optionnellement utiliser [Konsta UI](https://konstauicom/) pour améliorer votre interface mobile avec Tailwind CSS.

## À propos de Capacitor

Capacitor est révolutionnaire ! Vous pouvez l'intégrer sans effort dans n'importe quel projet web, et il encapsulera votre application dans une webview native, générant le projet natif Xcode et Android Studio pour vous. De plus, ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Avec Capacitor, vous obtenez une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API légère et ses fonctionnalités rationalisées en font un jeu d'enfant à intégrer dans votre projet. Croyez-moi, vous serez étonné de voir à quel point il est simple d'obtenir une application native entièrement fonctionnelle avec Capacitor !

## Préparer votre application React

Bien qu'il existe différentes méthodes pour initier des applications React, optons pour la plus simple dans ce tutoriel qui fournit une application React vierge :

[[CODE_BLOCK]]

Pour créer une application mobile native, nous avons besoin d'une **exportation** de notre projet. Ainsi, ajoutons un script simple dans notre **package.json** qui peut être utilisé pour construire et exporter le projet React :

[[CODE_BLOCK]]

Vous pouvez maintenant exécuter `npm run build` sans souci, et vous devriez pouvoir repérer un nouveau dossier out à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement.

## Ajouter Capacitor à votre application React

Pour empaqueter n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales, mais ensuite c'est aussi simple que d'exécuter une seule commande `sync`.

Premièrement, nous pouvons installer le [Capacitor CLI](https://capacitorjscom/docs/cli/) comme dépendance de développement, puis le configurer dans notre projet. Pendant la configuration, vous pouvez appuyer sur "entrée" pour accepter les valeurs par défaut pour le nom et l'ID du bundle.

Ensuite, nous devons installer le package core et les packages pertinents pour les plateformes iOS et Android.

Enfin, nous pouvons ajouter les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

[[CODE_BLOCK]]

À ce stade, vous devriez pouvoir observer de nouveaux dossiers **ios** et **android** dans votre projet React.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer [Android Studio](https://developerandroidcom/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developerapplecom/xcode/).

De plus, vous devriez trouver un fichier **capacitor.config.ts** dans votre projet, qui contient certains paramètres fondamentaux de Capacitor utilisés pendant la synchronisation. La seule chose à laquelle vous devez faire attention est le **webDir**, qui doit pointer vers le résultat de votre commande de build. Actuellement, il est inexact.

Pour rectifier cela, ouvrez le fichier **capacitor.config.json** et mettez à jour le **webDir** :

[[CODE_BLOCK]]

Vous pouvez l'essayer en exécutant les commandes suivantes :

[[CODE_BLOCK]]

La première commande `npm run build` va simplement construire votre projet React et exporter la build statique.

Tandis que la seconde commande `npx cap sync` synchronisera tout le code web aux bons endroits des plateformes natives pour qu'ils puissent être affichés dans une application.

De plus, la commande sync peut mettre à jour les plateformes natives et installer des plugins, donc lorsque vous installez de nouveaux [plugins Capacitor](https://capacitorjscom/docs/plugins/), c'est le moment d'exécuter `npx cap sync` à nouveau.