---
slug: capacitor-cli-project-setup-guide
title: 'Guide de configuration du projet : CLI Capacitor'
description: >-
  Apprenez à configurer Capacitor CLI pour créer des applications natives iOS et
  Android en utilisant des technologies web en quelques étapes simples.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-04-18T03:04:53.935Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: Développement Mobile
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
**Vous voulez créer des applications iOS et Android avec une seule base de code ?** [Capacitor](https://capacitorjs.com/) CLI simplifie le processus, vous permettant de créer des applications natives en utilisant les technologies web. Voici ce que vous allez apprendre :

-   **Installation Rapide** : Installez Capacitor CLI et initialisez votre projet en quelques minutes.
-   **Intégration des Plateformes** : Ajoutez le support iOS et Android avec des commandes simples.
-   **Mises à Jour en Direct** : Utilisez [Capgo](https://capgo.app/) pour des mises à jour instantanées par voie aérienne.
-   **Corrections Courantes** : Résolvez les problèmes comme les erreurs de synchronisation ou les échecs de build.

**Étapes Clés pour Commencer :**

1.  Installez [Node.js](https://nodejs.org/en), npm, JDK, [Xcode](https://developer.apple.com/xcode/), et [Android Studio](https://developer.android.com/studio).
2.  Exécutez `npm install @capacitor/core @capacitor/cli` et initialisez votre projet.
3.  Ajoutez les plateformes iOS et Android en utilisant `npx cap add ios` et `npx cap add android`.
4.  Optionnel : Configurez Capgo pour les [mises à jour](https://capgo.app/plugins/capacitor-updater/) en direct.

Ce guide couvre tout ce dont vous avez besoin pour configurer Capacitor CLI, configurer les plateformes et déployer votre application. Commençons !

## Présentation de [Capacitor](https://capacitorjs.com/) Configure

![Capacitor Framework Documentation Website](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

## Prérequis d'Installation

Pour commencer, assurez-vous d'avoir les outils suivants installés :

-   **Node.js** (version 14 ou plus récente) et **npm**
-   **Java JDK** (version 11 ou plus récente)
-   **Xcode** (version 12 ou plus récente pour les builds iOS)
-   **Android Studio** (pour les builds Android)
-   **Capacitor CLI** (version 6 ou 7)

_Optionnel :_ Si vous souhaitez activer les mises à jour en direct, consultez le "[Guide d'Installation Capgo](https://capgo.app/docs/plugin/cloud-mode/getting-started/)" ci-dessous.

## Étapes d'Installation du CLI

Avant de commencer, assurez-vous d'avoir **Node.js**, **npm**, **JDK**, **Xcode**, et **Android Studio** configurés. Une fois prêt, vous pouvez installer Capacitor CLI en exécutant :

```bash
npm install @capacitor/core @capacitor/cli
```

Cette commande installe Capacitor et configure ses composants principaux.

Après avoir terminé cette étape, passez à **Création d'un Nouveau Projet** pour structurer votre application.

## Création d'un Nouveau Projet

Pour commencer avec votre projet [en utilisant Capacitor CLI](https://capgo.app/docs/cli/commands/), suivez ces étapes :

```bash
npx cap init [appName] [appId]
```

### Mise à Jour du Fichier de Configuration

Modifiez le fichier `capacitor.config.json` pour inclure les paramètres suivants :

```json
{
  "appId": "com.exemple.app",
  "appName": "Mon Application",
  "webDir": "dist",
  "bundledWebRuntime": false
}
```

Une fois mis à jour, utilisez cette configuration pour configurer Capacitor pour votre projet.

## Configuration des Plateformes

Maintenant que la structure du projet est terminée, il est temps de configurer les cibles iOS et Android.

### Ajout d'iOS et Android

Commencez par installer les packages spécifiques à chaque plateforme en utilisant Capacitor CLI :

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

Pour iOS, assurez-vous d'avoir Xcode 14 ou plus récent, [CocoaPods](https://cocoapods.org/) 1.11 ou plus récent, et macOS 12 ou supérieur. Pour Android, vous aurez besoin d'Android Studio Giraffe (2022.3.1+), JDK 17 ou plus récent, et [Gradle](https://gradle.org/) 7.5 ou supérieur.

Une fois installé, vous devrez maintenir vos cibles natives à jour avec les modifications de votre application web.

### Mises à Jour des Plateformes

Pour synchroniser vos plateformes avec les derniers changements web, suivez ces étapes après la mise à jour de votre application web :

```bash
npx cap sync
```

La commande `cap sync` gère deux tâches :

-   Copie les ressources web mises à jour vers les plateformes natives
-   Met à jour les configurations natives et les plugins pour correspondre aux derniers changements

### Configuration IDE

Ouvrez les projets spécifiques aux plateformes dans les IDE appropriés :

```bash
npx cap open ios
npx cap open android
```

**Dans Xcode :**

1.  Choisissez votre équipe de développement.
2.  Configurez les certificats de signature.
3.  Mettez à jour votre identifiant de bundle.

**Dans Android Studio :**

1.  Modifiez l'ID d'application dans `build.gradle`.
2.  Configurez le keystore pour la signature.
3.  Configurez les variantes de build debug et release.

Lorsque tout est configuré, construisez les projets en utilisant `npx cap build ios` ou `npx cap build android`. N'oubliez pas d'exécuter `npx cap sync` à nouveau pour vous assurer que toutes les ressources sont à jour.

## Guide d'Installation [Capgo](https://capgo.app/)

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Configurez Capgo pour activer les mises à jour instantanées par voie aérienne pour votre application.

### Fonctionnalités Clés de Capgo

Capgo offre plusieurs outils pour simplifier les mises à jour d'applications :

-   Le **chiffrement de bout en bout** assure une livraison sécurisée des mises à jour.
-   Les mises à jour s'exécutent **en arrière-plan** au lancement de l'application.
-   Les **outils d'analyse** aident à suivre les taux de réussite des mises à jour et l'engagement des utilisateurs.
-   Une option de **retour en arrière en un clic** vous permet de récupérer rapidement des mises à jour problématiques.
-   Utilisez le **[système de canaux](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** pour les déploiements progressifs et les tests bêta.

### Installation de Capgo

Suivez ces étapes pour commencer avec Capgo :

1.  [Installez le CLI Capgo](https://capgo.app/docs/self-hosted/local-dev/cli/) :
    
    ```bash
    npm install --save @capgo/cli
    ```
    
2.  [Initialisez Capgo](https://capgo.app/docs/webapp/) dans votre projet :
    
    ```bash
    npx capgo init
    ```
    
3.  Construisez et publiez les mises à jour :
    
    ```bash
    npx capgo upload
    ```
    
4.  Ouvrez l'application pour déclencher le processus de mise à jour en arrière-plan.
    

### Meilleures Pratiques

-   Utilisez les canaux pour tester les mises à jour avant de les déployer à tous les utilisateurs.
-   Surveillez les analyses pour vous assurer que les mises à jour sont livrées avec succès et que les utilisateurs restent engagés.
-   Activez le suivi des erreurs pour détecter et corriger les problèmes rapidement.
-   Gardez la fonction de retour en arrière prête pour résoudre rapidement tout problème.

Capgo est compatible avec Capacitor 6 et 7, s'intègre parfaitement aux pipelines CI/CD et respecte les exigences des stores Apple et Google.

## Problèmes Courants et Conseils

Une fois la configuration de la plateforme et de Capgo terminée, vous pourriez rencontrer des erreurs courantes. Voici comment les résoudre rapidement.

### Problèmes de Configuration d'Environnement

-   **CLI Non Trouvé**  
    **Erreur** : La commande `npx cap` échoue.  
    **Solution** : Exécutez `npm install --save @capacitor/cli @capacitor/core` et réessayez.
    
-   **Incompatibilité de Version Node**  
    **Erreur** : Les commandes CLI échouent en raison d'erreurs de version Node.js.  
    **Solution** : Installez Node.js version 14 ou supérieure comme indiqué dans les prérequis.
    

### Problèmes de Configuration

-   **Incompatibilité de Configuration**  
    **Erreur** : Les changements dans `capacitor.config.json` ne prennent pas effet.  
    **Solution** : Assurez-vous que les valeurs `appId` et `webDir` correspondent à votre `package.json` et au dossier de sortie de build web.
    
-   **Erreurs de Synchronisation de Plateforme**  
    **Erreur** : L'exécution de `npx cap sync` entraîne des conflits de version de plugin.  
    **Solution** : Mettez à jour `@capacitor/android` et `@capacitor/ios` à la même version majeure, puis relancez la commande de synchronisation.
    

### Build et Déploiement

-   **Échecs de Signature de Build**  
    **Erreur** : Les builds iOS ou Android échouent en raison de certificats manquants ou d'un keystore.  
    **Solution** : Suivez les instructions de configuration IDE. Pour iOS, ajoutez votre équipe de développement dans Xcode. Pour Android, configurez le keystore dans `build.gradle`.
    
-   **Répertoire Web Non Trouvé**  
    **Erreur** : `npx cap sync` ne trouve pas les ressources web.  
    **Solution** : Exécutez votre commande de build web (par exemple, `npm run build`) avant de synchroniser les plateformes.
    

### Problèmes de Mise à Jour en Direct

-   **[Échecs de Mise à Jour Capgo](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **Erreur** : Les mises à jour n'apparaissent pas dans l'application de production.  
    **Solution** : Vérifiez votre [clé API Capgo](https://capgo.app/docs/webapp/api-keys/) dans `capacitor.config.json` et assurez-vous de cibler le bon canal.

Pour plus de détails sur la configuration spécifique à chaque plateforme, consultez la section Configuration des Plateformes. Si vous travaillez avec des mises à jour en direct, consultez le Guide d'Installation Capgo pour des conseils de dépannage supplémentaires.

## Résumé

### Revue de l'Installation

Commencez votre application web avec Capacitor CLI, configurez les plateformes iOS et Android, et incluez optionnellement Capgo pour les mises à jour en direct.

Voici comment commencer :

-   Utilisez Capacitor CLI pour initialiser votre projet.
-   Configurez l'ID de package de votre application et définissez le répertoire de sortie web.
-   Ajoutez le support pour les plateformes iOS et Android.
-   Installez et configurez Capgo avec la commande suivante : `npm install --save @capgo/cli && npx capgo init`

Pour des instructions détaillées d'installation ou de dépannage, consultez la documentation officielle de Capacitor et Capgo.
