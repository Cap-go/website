---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Installation der Capacitor CLI: Schritt-für-Schritt-Anleitung'
description: >-
  Apprenez à installer et configurer Capacitor CLI pour transformer efficacement
  les applications web en applications mobiles natives.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-04-04T02:49:43.341Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: Développement Mobile
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---

**[Capacitor](https://capacitorjscom/) CLI vous aide à transformer des applications web en applications natives iOS et Android avec une seule base de code.** Voici comment le configurer rapidement :

-   **Prérequis** : Installez [Nodejs](https://nodejsorg/en) (v16+), npm, et un framework web (React, Vue, Angular, etc.)
-   **[Installer Capacitor CLI](https://capgoapp/docs/cli/commands)** : Exécutez `npm install @capacitor/cli @capacitor/core` et initialisez votre projet avec `npx cap init`
-   **Préparer les Plateformes** : Ajoutez le support pour iOS (`npx cap add ios`) et Android (`npx cap add android`)
-   **Build et Sync** : Utilisez `npm run build` et `npx cap sync` pour transférer les assets web vers les projets natifs
-   **Mises à jour en direct optionnelles** : Utilisez des outils comme [Capgo](https://capgoapp/) pour pousser des mises à jour instantanément sans délais de l'app store

Capacitor CLI simplifie le développement et la maintenance des applications. Suivez le guide pour une configuration et un dépannage en douceur.

## Créez une Application Mobile Rapidement ! React + [Capacitor](https://capacitorjscom/) + [Tailwind](https://tailwindcsscom/) + [DaisyUI](https://daisyuicom/)

![Capacitor](https://assetsseobotaicom/capgoapp/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1jpg)

<Steps>

## Avant de Commencer

Préparez votre environnement en suivant ces étapes :

### Configurer [Nodejs](https://nodejsorg/en) et npm

![Nodejs](https://assetsseobotaicom/capgoapp/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9jpg)

Vous aurez besoin de Nodejs version 16 ou supérieure. La dernière version LTS est recommandée. Pour vérifier votre configuration, exécutez :

`node --version && npm --version`

Si vous devez mettre à jour, téléchargez Nodejs (qui inclut npm) depuis le site officiel.

Après avoir confirmé que Nodejs est prêt, assurez-vous que votre projet web répond aux exigences nécessaires de Capacitor.

### Vérifier Votre Projet Web

Votre projet web doit avoir les éléments suivants :

-   **Un packagejson valide** : Assurez-vous qu'il est correctement configuré
-   **Un répertoire de build** : C'est là que résident vos assets web (généralement `dist` ou `www`)
-   **Un point d'entrée** : Votre répertoire de build doit inclure un fichier `indexhtml`

Voici un aperçu des champs clés du `packagejson` :

| Champ Requis | Exemple de Valeur | Objectif |
| --- | --- | --- |
| name | "my-app" | Identifie le projet |
| version | "100" | Spécifie la version de l'app |
| build directory | "dist" ou "www" | Pointe vers les assets web |

Une fois que votre Nodejs et votre projet web sont prêts, passez à l'installation des outils spécifiques à la plateforme.

### Installer les Logiciels Requis

**Pour le Développement Android :**

-   Téléchargez et installez la dernière version d'**[Android Studio](https://developerandroidcom/studio)**
-   Configurez le SDK Android avec au moins l'API niveau 22
-   Configurez la variable d'environnement `ANDROID_HOME`

**Pour le Développement iOS (Mac uniquement) :**

-   Installez **[Xcode](https://developerapplecom/xcode/) 14** ou une version plus récente
    
-   Installez les Command Line Tools
    
-   Utilisez [Homebrew](https://brewsh/) pour installer [CocoaPods](https://cocoapodsorg/) :
    
    `brew install cocoapods`
    
-   Acceptez la licence Xcode :
    
    `sudo xcodebuild -license accept`
    

Lors de l'intégration de Capgo plus tard, assurez-vous d'avoir une connexion internet stable et des certificats SSL valides.

Une fois ces étapes terminées, vous êtes prêt pour un processus de développement Capacitor fluide. Ensuite, vous installerez le CLI Capacitor.

## Installer Capacitor CLI

Une fois votre environnement prêt, il est temps d'installer et de configurer Capacitor CLI.

### Ajouter les Packages Capacitor

Commencez par installer les packages Capacitor CLI et Core en utilisant npm :

`npm install @capacitor/cli @capacitor/core`

Une fois installé, confirmez la configuration en vérifiant la [version de Capacitor](https://capgoapp/plugins/ivs-player/) :

`npx cap --version`

### Configurer Votre Projet

Initialisez Capacitor dans votre projet avec la commande suivante :

`npx cap init`

Pendant l'initialisation, vous serez invité à fournir ces détails :

| Paramètre | Description | Exemple |
| --- | --- | --- |
| App Name | Le nom affiché dans les app stores | "My Awesome App" |
| App ID | Un identifiant unique pour votre app | "commycompany" |"myapp" |
| Répertoire Web | Chemin vers vos ressources web | "dist" ou "www" |

Ensuite, mettez à jour votre fichier de configuration (`capacitorconfig.ts` ou `capacitorconfig.json`) avec les paramètres appropriés :

[[CODE_BLOCK]]

### Configurer iOS et Android

Ajoutez le support pour les plateformes iOS et Android avec ces commandes :

[[CODE_BLOCK]]

Cela générera des projets natifs :

-   **iOS** : Crée un dossier `ios` contenant le projet Xcode
-   **Android** : Crée un dossier `android` pour le projet Android Studio

Après avoir modifié vos ressources web, exécutez les commandes suivantes pour compiler et synchroniser :

[[CODE_BLOCK]]

Ce processus compile vos ressources web et les transfère vers les projets natifs, y compris les [plugins Capacitor](https://capgo.app/plugins/) installés

Pour ouvrir les projets natifs pour personnalisation :

[[CODE_BLOCK]]

Vous êtes maintenant prêt à tester votre configuration et résoudre les problèmes éventuels

## Résoudre les Problèmes Courants

Lors de la configuration du CLI Capacitor, vous pourriez rencontrer quelques difficultés courantes. Voici comment les résoudre :

### Problèmes de Gradle Android

Si vous rencontrez des problèmes liés à Gradle, essayez ces étapes :

1. Naviguez vers le répertoire Android et effacez le cache de build :
    
    [[CODE_BLOCK]]
    
2. Mettez à jour la version de Gradle dans `android/build.gradle` :
    
    [[CODE_BLOCK]]
    
3. Ajoutez les lignes suivantes à `android/gradle.properties` pour de meilleures performances :
    
    [[CODE_BLOCK]]
    

Si les problèmes persistent, révisez votre configuration ou consultez des ressources de dépannage supplémentaires

### L'Application Affiche un Écran Blanc

Un écran blanc indique généralement un problème de configuration. Voici comment le résoudre :

-   **Vérifiez le Chemin du Répertoire Web** : Assurez-vous que le `webDir` correspond à votre dossier de build
    
    [[CODE_BLOCK]]
    
-   **Vérifiez la Configuration du Serveur** : Confirmez que les paramètres du serveur sont corrects
    
    [[CODE_BLOCK]]
    
-   **Mettez à Jour la Politique de Sécurité du Contenu** : Ajoutez cette balise meta à votre HTML pour le chargement correct des ressources
    
    [[CODE_BLOCK]]
    

### Plugin Ne Fonctionne Pas

Si un plugin ne fonctionne pas comme prévu, suivez ces étapes :

1. Effectuez une installation propre des dépendances :
    
    [[CODE_BLOCK]]
    
2. Vérifiez les paramètres du plugin dans `capacitorconfig.ts` pour vous assurer qu'ils sont correctement configurés :
    
    [[CODE_BLOCK]]
    

Pour ceux qui utilisent le [plugin natif de Capgo](https://capgo.app/plugins/), il synchronise automatiquement les plugins et maintient la compatibilité pendant les mises à jour

Après avoir appliqué ces corrections, recompilez votre projet pour vérifier les changements :

[[CODE_BLOCK]]

Une fois que tout fonctionne correctement, vous pouvez passer à l'exploration des options de mise à jour en direct avec Capgo

## Mises à Jour en Direct avec [Capgo](https://capgo.app/)

![Capgo](https://assets.seobot.ai/capgo.app/67ef362eebbb9dc80641f34f/435c1a19c50c4ff1b7d76cbc4edeb6d0.jpg)

Simplifiez les [mises à jour d'applications](https://capgo.app/plugins/capacitor-updater/) avec Capgo. Il vous permet de pousser des mises à jour directement aux utilisateurs, en évitant la nécessité de révisions sur l'app store

**Commencer est simple**. D'abord, installez les packages nécessaires :

[[CODE_BLOCK]]

Ensuite, initialisez Capgo dans votre projet :

[[CODE_BLOCK]]

### Plans Tarifaires

Capgo propose plusieurs niveaux de prix pour répondre à différents besoins :

| Plan | Utilisateurs Actifs Mensuels | Bande Passante | Stockage | Prix (Annuel) |
| --- | --- | --- | --- | --- |
| SOLO | 1 000 | 50 GO | 2 GO | 12€/mois |
| MAKER | 10 000 | 500 GO | 5 GO | 33€/mois |
| TEAM | 100 000 | 2 000 GO | 10 GO | 83€/mois |

Pour les utilisateurs entreprise, le plan PAYG commence à 249€/mois et inclut des avantages comme l'accès API, les domaines personnalisés et le support dédié

### Configuration pour les Mises à Jour en Direct

Pour activer les mises à jour en direct, ajoutez ce qui suit à votre fichier `capacitorconfig.ts` :

[[CODE_BLOCK]]

### Fonctionnalités Clés

Capgo fournit plusieurs fonctionnalités remarquables :

-   **[Mises à jour sécurisées](https://capgo