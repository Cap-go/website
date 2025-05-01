---
slug: creating-mobile-apps-with-react-and-capacitor
title: React.js와 Capacitor를 사용한 모바일 앱 만들기
description: >-
  Un guide pour transformer une application web React.js en application mobile
  native en utilisant Capacitor, et améliorer l'interface utilisateur native
  avec Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React.js et Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Voici la traduction en français:

Ce tutoriel vous guidera dans la création d'une application mobile en utilisant React, Capacitor et Konsta UI. À la fin, vous saurez comment transformer une application web Reactjs en une application mobile native avec Capacitor, et implémenter une interface utilisateur native avec Konsta UI.

Capacitor permet de transformer facilement votre application web Reactjs en une application mobile native, sans nécessiter de modifications substantielles ou d'apprentissage de nouvelles stratégies comme React Native.

Le processus comprend quelques étapes simples, et en un rien de temps, votre application Reactjs deviendra une application mobile pleinement fonctionnelle. Alors, restez avec nous pendant que nous vous guidons dans ce parcours.

## Aperçu de Capacitor

CapacitorJS change la donne. Il peut s'intégrer facilement avec n'importe quel projet web et encapsuler votre application dans une webview native tout en générant le projet natif Xcode et Android Studio. De plus, grâce à ses plugins, vous pouvez accéder aux fonctionnalités natives de l'appareil comme la caméra via un pont JS.

Capacitor offre un moyen simple de créer une application mobile native sans tracas ni courbe d'apprentissage abrupte. Son API simple et ses fonctionnalités rationalisées le rendent facile à intégrer dans votre projet.

## Configuration de Votre Application Reactjs

Optons pour la méthode la plus simple pour démarrer une application React. Nous utiliserons le gestionnaire de paquets npm pour créer une nouvelle application React :

[[CODE_BLOCK]]

Pour transformer notre projet en une application mobile native, une **exportation** de notre application est nécessaire.

Nous y reviendrons dans un instant. D'abord, comprenons comment intégrer Capacitor dans notre application React.

## Intégration de Capacitor dans Votre Application Reactjs

Les étapes de configuration initiales peuvent être un peu détaillées, mais après cela, la mise à jour de votre wrapper d'application native devient aussi simple que l'exécution d'une commande `sync`.

D'abord, nous installerons le CLI Capacitor comme dépendance de développement et le configurerons dans notre projet. Pendant la configuration, acceptez les valeurs par défaut pour le nom et l'ID du package en appuyant sur "entrée".

Ensuite, nous installerons le package core et les packages pertinents pour les plateformes iOS et Android.

Enfin, nous ajouterons les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de notre projet :

[[CODE_BLOCK]]

Les répertoires **ios** et **android** sont maintenant présents dans votre projet Reactjs.

Pour accéder au projet Android plus tard, installez [Android Studio](https://developer.android.com/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developer.apple.com/xcode/).

Ensuite, mettez à jour le **webDir** dans votre fichier **capacitor.config.json** comme indiqué ci-dessous :

[[CODE_BLOCK]]

Exécutez la commande build et synchronisez votre projet avec Capacitor :

[[CODE_BLOCK]]

La commande `npm run build` construira votre projet Reactjs, tandis que `npx cap sync` alignera le code web aux bons endroits des plateformes natives pour qu'ils puissent être exécutés dans une application.

Maintenant, avec un peu de chance et sans erreurs, votre application Reactjs devrait être prête à être lancée sur un appareil !

## Construction et Déploiement de Vos Applications Natives

Le développement d'applications iOS nécessite **Xcode**, et les applications Android nécessitent **Android Studio**. Si vous prévoyez de distribuer votre application sur l'app store, vous devez vous inscrire au Programme Apple Developer pour iOS et à la Google Play Console pour Android.

Le CLI Capacitor simplifie le processus d'ouverture des deux projets natifs :

[[CODE_BLOCK]]

Une fois que vos projets natifs sont configurés, le déploiement de votre application sur un appareil connecté est un processus simple.

Pour Android Studio, attendez que tout se charge puis déployez votre application sur un appareil connecté.

Pour Xcode, établissez votre compte de signature pour déployer votre application sur un véritable appareil plutôt que sur le simulateur. Après cela, appuyez simplement sur play pour exécuter l'application sur votre appareil connecté, que vous pouvez choisir en haut.

Si tout s'est bien passé, vous aurez converti votre React.