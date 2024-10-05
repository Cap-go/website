---
slug: migrating-cordova-to-capacitor
title: "Migration d'une application Web de Cordova vers Capacitor\_: un guide étape par étape"
description: >-
  Ce guide étape par étape vous aidera à migrer votre application Web de Cordova
  vers Capacitor, couvrant toutes les sections et la rendant facile à lire et à
  suivre.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Illustration de la migration de Cordova vers le condensateur
tag: Migration
published: true
locale: fr
next_blog: ''
---

# Migration d'une application Web à l'aide de Cordova vers Capacitor : un guide étape par étape

Ce guide vous aidera à migrer votre application Web de Cordova vers Capacitor, ce qui la rendra facile à lire et à suivre. Nous couvrirons toutes les sections et proposerons une approche étape par étape.

## Introduction à Cordova et au condensateur

Cordova et Capacitor sont tous deux des outils qui permettent aux développeurs Web de créer des applications natives pour diverses plates-formes à l'aide de HTML, CSS et JavaScript. Bien qu'ils partagent des similitudes, il existe des différences clés dans leur approche de la gestion de projet native, de la gestion des plugins et de la gestion CLI/version.

## Stratégie migratoire

La migration de Cordova vers Capacitor peut être effectuée progressivement ou en remplacement complet, en fonction de la complexité de votre application. Capacitor est rétrocompatible avec Cordova, vous permettant d'y basculer vos applications Web existantes lorsque vous êtes prêt.

Pour faciliter la migration, envisagez d'utiliser l'[extension de code Ionic VS](https://marketplacevisualstudiocom/items/?itemName=ionicionic) et d'auditer vos plugins Cordova existants. Vous pouvez continuer à utiliser les plugins Cordova si nécessaire, ou les remplacer par des équivalents de condensateur.

## Guide de migration étape par étape

Suivez ces étapes pour migrer votre application Web de Cordova vers Capacitor :

1 **Travailler dans une branche de code distincte** : il est recommandé de travailler dans une branche de code distincte lors de l'application de ces modifications.

2 **Initialisez votre application avec Capacitor** : ouvrez votre projet dans le terminal et suivez les guides pour [ajouter un condensateur à une application Web](https://capacitorjscom/docs/getting-started/#adding-capacitor-to- votre application) ou [ajout d'un condensateur à une application Ionic](https://capacitorjscom/docs/getting-started/with-ionic/#existing-ionic-project) Utilisez les informations de votre fichier `configxml` Cordova pour l'application nom et ID du paquet

3 **Créez votre application Web** : Créez votre projet Web au moins une fois avant d'ajouter des plates-formes natives. Cela garantit que le dossier `www` est correctement configuré dans le fichier de configuration de Capacitor.

4 **Ajouter des plateformes** : exécutez `npx cap add ios` et `npx cap add android` pour ajouter les plateformes iOS et Android. Celles-ci créeront des dossiers de projet natifs séparés à la racine de votre projet.

5 **Générer des icônes et des écrans de démarrage** : Si vous avez des images d'icônes et d'écran de démarrage existantes, utilisez l'outil `cordova-res` pour les générer et les copier dans les projets natifs.

6 **Audit et migrez les plugins Cordova existants** : examinez vos plugins Cordova existants et remplacez-les par des équivalents Capacitor si possible Supprimez tous les plugins inutiles

7 **Supprimer le plugin Cordova** : Après avoir remplacé ou supprimé un plugin Cordova, désinstallez le plugin et exécutez `npx cap sync` pour supprimer le code du plugin du projet natif

8 **Appliquer des autorisations supplémentaires** : mapper entre `pluginxml` et les paramètres requis sur iOS et Android pour appliquer les autorisations nécessaires

9 **Configurer les préférences** : ajoutez manuellement les préférences de `configxml` au fichier de configuration du condensateur

10 **Gérer les configurations spécifiques à la plate-forme** : configurez les éléments de `configxml` pour chaque plate-forme (iOS et Android) selon vos besoins

11 **Modifiez le schéma de diffusion du contenu** : si nécessaire, modifiez le schéma utilisé pour diffuser le contenu dans votre application afin d'éviter la perte de données.

12 **Testez et supprimez Cordova** : testez votre application migrée pour vous assurer que toutes les modifications ont été appliquées correctement. Une fois satisfait, vous pouvez supprimer Cordova de votre projet ou le quitter si vous envisagez de continuer à utiliser les plugins Cordova.

Félicitations! Vous avez migré avec succès votre application Web de Cordova vers Capacitor. Pour en savoir plus sur l'utilisation des plugins Cordova dans un projet Capacitor ou sur le workflow de développement de Capacitor, visitez la [documentation officielle de Capacitor](https://capacitorjscom/docs/)

## Mises à jour en direct avec notre service Capgo

Nous sommes fiers de proposer Capgo, notre solution qui permet des mises à jour en direct pour vos applications de condensateurs, vous permettant ainsi de fournir des mises à jour Over-The-Air (OTA) à un prix équitable.Cette fonctionnalité est particulièrement utile pour apporter des correctifs rapides, déployer de nouvelles fonctionnalités et garantir que vos utilisateurs disposent toujours de la dernière version de votre application sans attendre l'approbation de l'App Store.

### Comment fonctionne notre service Capgo

Capgo est un service basé sur le cloud qui vous permet de déployer des mises à jour en direct sur vos applications Capacitor. Il se compose d'un tableau de bord Web et d'un SDK natif que vous pouvez intégrer à votre application. Le SDK vérifie les mises à jour au démarrage ou à des intervalles spécifiques et les télécharge dans l'arrière-plan Lorsqu'une mise à jour est disponible, le SDK invitera l'utilisateur à l'installer. Si l'utilisateur accepte, la mise à jour sera installée et appliquée immédiatement.

### Avantages des mises à jour Capgo Live

- **Mises à jour plus rapides :** Déployez les mises à jour instantanément sans attendre l'approbation de l'App Store
- **Dépendance réduite à l'Apple Store :** Contourner les restrictions et limitations de l'App Store
- **Expérience utilisateur améliorée :** Gardez les utilisateurs engagés avec les dernières fonctionnalités et corrections de bugs sans leur demander de mettre à jour manuellement l'application


### Comment implémenter les mises à jour Capgo Live

Pour implémenter les mises à jour en direct de Capgo dans votre projet Capacitor, suivez ces étapes :
- Créez un [compte Capgo](https://webcapgoapp/)
- Installez le SDK Capgo dans votre projet
- Configurez votre application pour vérifier les mises à jour au démarrage ou à des intervalles spécifiques
- Déployez les mises à jour de votre application à l'aide du tableau de bord Capgo

## Conclusion

Nous espérons que ce guide vous a aidé à migrer votre application Web de Cordova vers Capacitor. Si vous avez des questions ou avez besoin d'aide pour le processus de migration, n'hésitez pas à nous contacter sur notre serveur [discord](https://discordgg/VnYRvBfgA6).