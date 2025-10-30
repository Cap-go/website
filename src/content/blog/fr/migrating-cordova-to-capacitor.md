---
slug: migrating-cordova-to-capacitor
title: >-
  Migrer une application web de Cordova vers Capacitor : un guide étape par
  étape
description: >-
  Ce guide étape par étape vous aidera à migrer votre application web de Cordova
  vers Capacitor, en couvrant toutes les sections et en rendant la lecture et le
  suivi faciles.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Illustration de la migration de Cordova vers Capacitor
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: fr
next_blog: ''
---
# Migration d'une application Web utilisant Cordova vers Capacitor : un guide étape par étape

Ce guide vous aidera à migrer votre application web de Cordova vers Capacitor, rendant la lecture et le suivi faciles. Nous couvrirons toutes les sections et fournirons une approche étape par étape.

## Introduction à Cordova et Capacitor

Cordova et Capacitor sont tous deux des outils qui permettent aux développeurs web de créer des applications natives pour diverses plateformes en utilisant HTML, CSS et JavaScript. Bien qu'ils partagent des similarités, il existe des différences clés dans leur approche de la gestion des projets natifs, de la gestion des plugins et de la gestion des CLI/version.

## Stratégie de migration

La migration de Cordova à Capacitor peut se faire progressivement ou comme un remplacement complet, selon la complexité de votre application. Capacitor est compatible avec Cordova, vous permettant de passer vos applications web existantes à Capacitor lorsque vous êtes prêt.

Pour faciliter la migration, envisagez d'utiliser l'[extension Ionic VS Code](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic) et d'auditer vos plugins Cordova existants. Vous pouvez continuer à utiliser les plugins Cordova si nécessaire, ou les remplacer par des équivalents Capacitor.

## Guide de migration étape par étape

Suivez ces étapes pour migrer votre application web de Cordova vers Capacitor :

1. **Travaillez dans une branche de code séparée** : Il est recommandé de travailler dans une branche de code séparée lors de l'application de ces modifications.

2. **Initialisez votre application avec Capacitor** : Ouvrez votre projet dans le terminal et suivez les guides pour [ajouter Capacitor à une application web](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) ou [ajouter Capacitor à une application Ionic](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project). Utilisez les informations de votre fichier `config.xml` Cordova pour le nom de l'application et l'ID de bundle.

3. **Construisez votre application web** : Construisez votre projet web au moins une fois avant d'ajouter des plateformes natives. Cela garantit que le dossier `www` est correctement configuré dans le fichier de configuration de Capacitor.

4. **Ajoutez des plateformes** : Exécutez `npx cap add ios` et `npx cap add android` pour ajouter les plateformes iOS et Android. Ceux-ci créeront des dossiers de projet natifs séparés à la racine de votre projet.

5. **Générez des icônes et des écrans de démarrage** : Si vous avez des images d'icônes et d'écrans de démarrage existants, utilisez l'outil `cordova-res` pour les générer et les copier dans les projets natifs.

6. **Auditez et migrez les plugins Cordova existants** : Passez en revue vos plugins Cordova existants et remplacez-les par des équivalents Capacitor si possible. Supprimez tous les plugins inutiles.

7. **Supprimez le plugin Cordova** : Après avoir remplacé ou supprimé un plugin Cordova, désinstallez le plugin et exécutez `npx cap sync` pour retirer le code du plugin du projet natif.

8. **Appliquez des autorisations supplémentaires** : Faites le lien entre `plugin.xml` et les paramètres requis sur iOS et Android pour appliquer toutes les autorisations nécessaires.

9. **Configurez les préférences** : Ajoutez manuellement les préférences de `config.xml` au fichier de configuration de Capacitor.

10. **Gérez les configurations spécifiques à la plateforme** : Configurez les éléments de `config.xml` pour chaque plateforme (iOS et Android) selon les besoins.

11. **Changez le schéma pour servir le contenu** : Si nécessaire, changez le schéma utilisé pour servir du contenu dans votre application afin d'éviter la perte de données.

12. **Testez et retirez Cordova** : Testez votre application migrée pour vous assurer que toutes les modifications ont été appliquées correctement. Une fois satisfait, vous pouvez supprimer Cordova de votre projet ou le laisser si vous prévoyez de continuer à utiliser des plugins Cordova.

Félicitations ! Vous avez réussi à migrer votre application web de Cordova vers Capacitor. Pour en savoir plus sur l'utilisation des plugins Cordova dans un projet Capacitor ou sur le flux de développement de Capacitor, visitez la [documentation officielle de Capacitor](https://capacitorjs.com/docs/).

## Mises à jour en direct avec notre service Capgo

Nous sommes fiers d'offrir Capgo, notre solution qui permet des mises à jour en direct pour vos applications Capacitor, vous permettant de délivrer des mises à jour Over-The-Air (OTA) à un prix juste. Cette fonctionnalité est particulièrement utile pour effectuer des corrections rapides, déployer de nouvelles fonctionnalités et garantir que vos utilisateurs disposent toujours de la dernière version de votre application sans attendre l'approbation de l'App Store.

### Comment fonctionne notre service Capgo

Capgo est un service basé sur le cloud qui vous permet de déployer des mises à jour en direct pour vos applications Capacitor. Il se compose d'un tableau de bord web et d'un SDK natif que vous pouvez intégrer dans votre application. Le SDK recherche des mises à jour au démarrage ou à des intervalles spécifiques et les télécharge en arrière-plan. Lorsque une mise à jour est disponible, le SDK invite l'utilisateur à l'installer. Si l'utilisateur accepte, la mise à jour sera installée et appliquée immédiatement.

### Avantages des mises à jour en direct Capgo

- **Mises à jour plus rapides :** Déployez des mises à jour instantanément sans attendre l'approbation de l'App Store.
- **Dépendance réduite à l'Apple Store :** Contournez les restrictions et limitations de l'App Store.
- **Amélioration de l'expérience utilisateur :** Gardez les utilisateurs engagés avec les dernières fonctionnalités et corrections de bugs sans exiger qu'ils mettent à jour manuellement l'application.

### Comment mettre en œuvre des mises à jour en direct Capgo

Pour mettre en œuvre des mises à jour en direct Capgo dans votre projet Capacitor, suivez ces étapes :
- Inscrivez-vous pour un [compte Capgo](https://console.capgo.app/).
- Installez le SDK Capgo dans votre projet.
- Configurez votre application pour vérifier les mises à jour au démarrage ou à des intervalles spécifiques.
- Déployez des mises à jour vers votre application via le tableau de bord Capgo.

## Conclusion

Nous espérons que ce guide vous a aidé à migrer votre application web de Cordova vers Capacitor. Si vous avez des questions ou avez besoin d'assistance pour le processus de migration, n'hésitez pas à nous contacter sur notre serveur [discord](https://discord.capgo.app).
