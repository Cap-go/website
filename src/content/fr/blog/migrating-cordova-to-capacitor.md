---
slug: migrating-cordova-to-capacitor
title: >-
  Migration d'une application web Cordova vers Capacitor : Un guide étape par
  étape
description: >-
  Ce guide étape par étape vous aide à migrer votre application web Cordova vers
  Capacitor, couvre toutes les sections et est facile à lire et à suivre.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Illustration de migration de Cordova vers Capacitor
tag: Migration
published: true
locale: fr
next_blog: ''
---

# Guide de migration étape par étape d'une application Web utilisant Cordova vers Capacitor

Ce guide vous aidera à migrer votre application Web de Cordova vers Capacitor, en la rendant facile à lire et à suivre. Nous couvrirons toutes les sections et fournirons une approche étape par étape.

## Introduction à Cordova et Capacitor

Cordova et Capacitor sont tous deux des outils qui permettent aux développeurs Web de créer des applications natives pour diverses plates-formes en utilisant HTML, CSS et JavaScript. Bien qu'ils partagent des similitudes, il existe des différences clés dans leur approche de la gestion de projets natifs, de la gestion des plugins et de la gestion CLI/version.

## Stratégie de migration

La migration de Cordova vers Capacitor peut se faire progressivement ou comme un remplacement complet, selon la complexité de votre application. Capacitor est rétrocompatible avec Cordova, vous permettant de basculer vos applications Web existantes vers celui-ci quand vous êtes prêt.

Pour faciliter la migration, envisagez d'utiliser l'extension Ionic VS Code et d'auditer vos plugins Cordova existants. Vous pouvez continuer à utiliser les plugins Cordova si nécessaire, ou les remplacer par des équivalents Capacitor.

## Guide de migration étape par étape

Suivez ces étapes pour migrer votre application Web de Cordova vers Capacitor :

1. **Travaillez dans une branche de code séparée** : Il est recommandé de travailler dans une branche de code séparée lors de l'application de ces changements.

2. **Initialisez votre application avec Capacitor** : Ouvrez votre projet dans le terminal et suivez les guides pour ajouter Capacitor à une application Web ou ajouter Capacitor à une application Ionic. Utilisez les informations de votre fichier Cordova `config.xml` pour le nom de l'application et l'ID du bundle.

3. **Construisez votre application Web** : Construisez votre projet Web au moins une fois avant d'ajouter des plates-formes natives. Cela garantit que le dossier `www` est correctement configuré dans le fichier de configuration Capacitor.

4. **Ajoutez des plates-formes** : Exécutez `npx cap add ios` et `npx cap add android` pour ajouter les plates-formes iOS et Android. Cela créera des dossiers de projet natifs séparés à la racine de votre projet.

5. **Générez des icônes et des écrans de démarrage** : Si vous avez des images d'icône et d'écran de démarrage existantes, utilisez l'outil `cordova-res` pour les générer et les copier dans les projets natifs.

6. **Auditez et migrez les plugins Cordova existants** : Examinez vos plugins Cordova existants et remplacez-les par des équivalents Capacitor si possible. Supprimez tous les plugins inutiles.

7. **Supprimez le plugin Cordova** : Après avoir remplacé ou supprimé un plugin Cordova, désinstallez le plugin et exécutez `npx cap sync` pour supprimer le code du plugin du projet natif.

8. **Appliquez des autorisations supplémentaires** : Faites correspondre entre `plugin.xml` et les paramètres requis sur iOS et Android pour appliquer les autorisations nécessaires.

9. **Configurez les préférences** : Ajoutez manuellement les préférences de `config.xml` au fichier de configuration Capacitor.

10. **Gérez les configurations spécifiques à la plate-forme** : Configurez les éléments de `config.xml` pour chaque plate-forme (iOS et Android) selon les besoins.

11. **Changez le schéma de diffusion du contenu** : Si nécessaire, changez le schéma utilisé pour diffuser le contenu dans votre application pour éviter la perte de données.

12. **Testez et supprimez Cordova** : Testez votre application migrée pour vous assurer que tous les changements ont été appliqués correctement. Une fois satisfait, vous pouvez supprimer Cordova de votre projet ou le laisser si vous prévoyez de continuer à utiliser des plugins Cordova.

Félicitations ! Vous avez réussi à migrer votre application Web de Cordova vers Capacitor. Pour en savoir plus sur l'utilisation des plugins Cordova dans un projet Capacitor ou sur le flux de travail de développement Capacitor, visitez la documentation officielle de Capacitor.

## Mises à jour en direct avec notre service Capgo

Nous sommes fiers d'offrir Capgo, notre solution qui permet des mises à jour en direct pour vos applications Capacitor, vous permettant de livrer des mises à jour Over-The-Air (OTA) à un prix équitable.Voici la traduction en français :

Cette fonctionnalité est particulièrement utile pour effectuer des corrections rapides, déployer de nouvelles fonctionnalités et garantir que vos utilisateurs disposent toujours de la dernière version de votre application sans attendre l'approbation de l'App Store.

### Comment fonctionne notre service Capgo

Capgo est un service basé sur le cloud qui vous permet de déployer des mises à jour en direct pour vos applications Capacitor. Il se compose d'un tableau de bord web et d'un SDK natif que vous pouvez intégrer à votre application. Le SDK vérifie les mises à jour au démarrage ou à des intervalles spécifiques et les télécharge en arrière-plan. Lorsqu'une mise à jour est disponible, le SDK invitera l'utilisateur à l'installer. Si l'utilisateur accepte, la mise à jour sera installée et appliquée immédiatement.

### Avantages des mises à jour en direct de Capgo

- **Mises à jour plus rapides :** Déployez des mises à jour instantanément sans attendre l'approbation de l'App Store.
- **Dépendance réduite à l'App Store :** Contournez les restrictions et limitations de l'App Store.
- **Expérience utilisateur améliorée :** Gardez les utilisateurs engagés avec les dernières fonctionnalités et corrections de bugs sans qu'ils aient besoin de mettre à jour manuellement l'application.

### Comment implémenter les mises à jour en direct de Capgo

Pour implémenter les mises à jour en direct de Capgo dans votre projet Capacitor, suivez ces étapes :
- Inscrivez-vous pour un compte Capgo sur [webcapgoapp]
- Installez le SDK Capgo dans votre projet
- Configurez votre application pour vérifier les mises à jour au démarrage ou à des intervalles spécifiques
- Déployez des mises à jour pour votre application en utilisant le tableau de bord Capgo

## Conclusion

Nous espérons que ce guide vous a aidé à migrer votre application web de Cordova vers Capacitor. Si vous avez des questions ou besoin d'aide pour le processus de migration, n'hésitez pas à nous contacter sur notre serveur [discord].