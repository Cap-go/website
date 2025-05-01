---
slug: migrating-cordova-to-capacitor
title: 'Migrando una aplicación web de Cordova a Capacitor: Una guía paso a paso'
description: >-
  Esta guía paso a paso cubre todas las secciones de la migración de una
  aplicación web de Cordova a Capacitor, presentada de manera clara y
  comprensible.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Migration de Cordova vers Capacitor
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: fr
next_blog: ''
---

# Migration d'une application Web utilisant Cordova vers Capacitor : Un guide étape par étape

Ce guide vous aidera à migrer votre application web de Cordova vers Capacitor, en la rendant facile à lire et à suivre. Nous couvrirons toutes les sections et fournirons une approche étape par étape.

## Introduction à Cordova et Capacitor

Cordova et Capacitor sont tous deux des outils qui permettent aux développeurs web de créer des applications natives pour différentes plateformes en utilisant HTML, CSS et JavaScript. Bien qu'ils partagent des similitudes, il existe des différences clés dans leur approche de la gestion des projets natifs, la gestion des plugins et la gestion CLI/version.

## Stratégie de migration

La migration de Cordova vers Capacitor peut se faire progressivement ou comme un remplacement complet, selon la complexité de votre application. Capacitor est rétrocompatible avec Cordova, vous permettant de basculer vos applications web existantes quand vous le souhaitez.

Pour faciliter la migration, envisagez d'utiliser l'[extension VS Code Ionic](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic) et d'auditer vos plugins Cordova existants. Vous pouvez continuer à utiliser les plugins Cordova si nécessaire, ou les remplacer par des équivalents Capacitor.

## Guide de migration étape par étape

Suivez ces étapes pour migrer votre application web de Cordova vers Capacitor :

1. **Travailler dans une branche de code séparée** : Il est recommandé de travailler dans une branche de code séparée lors de l'application de ces changements.

2. **Initialiser votre application avec Capacitor** : Ouvrez votre projet dans le terminal et suivez les guides pour [ajouter Capacitor à une application web](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) ou [ajouter Capacitor à une application Ionic](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project). Utilisez les informations de votre fichier Cordova `config.xml` pour le nom de l'application et l'ID du bundle.

3. **Construire votre application web** : Construisez votre projet web au moins une fois avant d'ajouter des plateformes natives. Cela garantit que le dossier `www` est correctement configuré dans le fichier de configuration Capacitor.

4. **Ajouter des plateformes** : Exécutez `npx cap add ios` et `npx cap add android` pour ajouter les plateformes iOS et Android. Cela créera des dossiers de projet natifs séparés à la racine de votre projet.

5. **Générer les icônes et les écrans de démarrage** : Si vous avez des images d'icônes et d'écrans de démarrage existantes, utilisez l'outil `cordova-res` pour les générer et les copier dans les projets natifs.

6. **Auditer et migrer les plugins Cordova existants** : Examinez vos plugins Cordova existants et remplacez-les par des équivalents Capacitor si possible. Supprimez les plugins inutiles.

7. **Supprimer le plugin Cordova** : Après avoir remplacé ou supprimé un plugin Cordova, désinstallez le plugin et exécutez `npx cap sync` pour supprimer le code du plugin du projet natif.

8. **Appliquer les permissions supplémentaires** : Faites correspondre entre `plugin.xml` et les paramètres requis sur iOS et Android pour appliquer les permissions nécessaires.

9. **Configurer les préférences** : Ajoutez manuellement les préférences de `config.xml` au fichier de configuration Capacitor.

10. **Gérer les configurations spécifiques aux plateformes** : Configurez les éléments de `config.xml` pour chaque plateforme (iOS et Android) selon les besoins.

11. **Modifier le schéma pour servir le contenu** : Si nécessaire, modifiez le schéma utilisé pour servir le contenu dans votre application pour éviter la perte de données.

12. **Tester et supprimer Cordova** : Testez votre application migrée pour vous assurer que tous les changements ont été appliqués correctement. Une fois satisfait, vous pouvez supprimer Cordova de votre projet ou le laisser si vous prévoyez de continuer à utiliser des plugins Cordova.

Félicitations ! Vous avez réussi à migrer votre application web de Cordova vers Capacitor. Pour en savoir plus sur l'utilisation des plugins Cordova dans un projet Capacitor ou sur le flux de développement Capacitor, visitez la [documentation officielle de Capacitor](https://capacitorjs.com/docs/).

## Mises à jour en direct avec notre service Capgo

Nous sommes fiers d'offrir Capgo, notre solution qui permet les mises à jour en direct pour vos applications Capacitor, vous permettant de livrer des mises à jour Over-The-Air (OTA) à un prix équitable.