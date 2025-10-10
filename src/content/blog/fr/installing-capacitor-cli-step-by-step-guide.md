---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Installation de Capacitor CLI : Guide étape par étape'
description: >-
  Apprenez à installer et configurer Capacitor CLI pour transformer des
  applications web en applications mobiles natives de manière efficace.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: Développement Mobile
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
**[Capacitor](https://capacitorjs.com/) CLI vous aide à transformer des applications web en applications natives iOS et Android avec une seule base de code.** Voici comment le configurer rapidement :

-   **Prérequis** : Installez [Node.js](https://nodejs.org/en) (v16+), npm et un framework web (React, Vue, Angular, etc.).
-   **[Installez le Capacitor CLI](https://capgo.app/docs/cli/commands)** : Exécutez `npm install @capacitor/cli @capacitor/core` et initialisez votre projet avec `npx cap init`.
-   **Préparez les plateformes** : Ajoutez le support pour iOS (`npx cap add ios`) et Android (`npx cap add android`).
-   **Construisez et synchronisez** : Utilisez `npm run build` et `npx cap sync` pour transférer les assets web vers des projets natifs.
-   **Mises à jour en direct optionnelles** : Utilisez des outils comme [Capgo](https://capgo.app/) pour envoyer des mises à jour instantanément sans retards d'app store.

Le Capacitor CLI simplifie le développement et la maintenance des applications. Suivez le guide pour une configuration et un dépannage sans heurts.

## Créez une application mobile rapidement ! React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/PPXktTJXMPE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Avant de commencer

Préparez votre environnement en suivant ces étapes :

### Configurez [Node.js](https://nodejs.org/en) et npm

![Node.js](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

Vous aurez besoin de la version 16 ou supérieure de Node.js. La dernière version LTS est recommandée. Pour vérifier votre configuration, exécutez :

```bash
node --version
npm --version
```

Si vous devez mettre à jour, téléchargez Node.js (qui inclut npm) depuis le site officiel.

Après avoir confirmé que Node.js est prêt, assurez-vous que votre projet web répond aux exigences nécessaires de Capacitor.

### Vérifiez votre projet web

Votre projet web doit avoir ce qui suit :

-   **Un package.json valide** : Assurez-vous qu'il est correctement configuré.
-   **Un répertoire de construction** : C'est là où vos assets web se trouvent (souvent `dist` ou `www`).
-   **Un point d'entrée** : Votre répertoire de construction doit inclure un fichier `index.html`.

Voici un aperçu rapide des champs clés de `package.json` :

| Champ requis | Valeur d'exemple | But |
| --- | --- | --- |
| name | "my-app" | Identifie le projet |
| version | "1.0.0" | Spécifie la version de l'application |
| build directory | "dist" ou "www" | Pointeur vers les assets web |

Une fois que votre Node.js et votre projet web sont prêts, passez à l'installation des outils spécifiques à la plateforme.

### Installez les logiciels requis

**Pour le développement Android :**

-   Téléchargez et installez la dernière version de **[Android Studio](https://developer.android.com/studio)**.
-   Configurez le SDK Android avec au moins le niveau API 22.
-   Configurez la variable d'environnement `ANDROID_HOME`.

**Pour le développement iOS (Mac uniquement) :**

-   Installez **[Xcode](https://developer.apple.com/xcode/) 14** ou une version plus récente.
    
-   Installez les outils en ligne de commande.
    
-   Utilisez [Homebrew](https://brew.sh/) pour installer [CocoaPods](https://cocoapods.org/) :
    
    ```bash
    brew install cocoapods
    ```
    
-   Acceptez la licence Xcode :
    
    ```bash
    sudo xcodebuild -license accept
    ```
    

Lorsque vous intégrerez Capgo plus tard, assurez-vous d'avoir une connexion Internet stable et de certificats SSL valides.

Une fois ces étapes terminées, vous êtes prêt pour un processus de développement Capacitor fluide. Ensuite, vous installerez le Capacitor CLI.

## Installez le Capacitor CLI

Avec votre environnement prêt, il est temps d'installer et de configurer le Capacitor CLI.

### Ajoutez des packages Capacitor

Commencez par installer les packages Capacitor CLI et Core en utilisant npm :

```bash
npm install @capacitor/cli @capacitor/core
```

Une fois installé, confirmez la configuration en vérifiant la [version de Capacitor](https://capgo.app/plugins/ivs-player/) :

```bash
npx cap --version
```

### Configurez votre projet

Initialisez Capacitor dans votre projet avec la commande suivante :

```bash
npx cap init
```

Lors de l'initialisation, vous serez invité à fournir ces détails :

| Paramètre | Description | Exemple |
| --- | --- | --- |
| App Name | Le nom affiché dans les magasins d'applications | "My Awesome App" |
| App ID | Un identifiant unique pour votre application | "com.mycompany.myapp" |
| Web Directory | Chemin vers vos assets web | "dist" ou "www" |

Ensuite, mettez à jour votre fichier de configuration (`capacitor.config.ts` ou `capacitor.config.json`) avec les paramètres pertinents :

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mycompany.myapp',
  appName: 'My Awesome App',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
```

### Configurez iOS et Android

Ajoutez le support pour les plateformes iOS et Android avec ces commandes :

```bash
npx cap add ios
npx cap add android
```

Cela générera des projets natifs :

-   **iOS** : Crée un dossier `ios` contenant le projet Xcode.
-   **Android** : Crée un dossier `android` pour le projet Android Studio.

Après avoir apporté des modifications à vos assets web, exécutez les commandes suivantes pour construire et synchroniser :

```bash
npm run build
npx cap sync
```

Ce processus compile vos assets web et les transfère vers les projets natifs, y compris tout [plugin Capacitor](https://capgo.app/plugins/) installé.

Pour ouvrir les projets natifs pour des personnalisations supplémentaires :

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

Vous êtes maintenant prêt à tester votre configuration et à résoudre tout problème pouvant survenir.

## Résoudre les problèmes courants

Lors de la configuration du Capacitor CLI, vous pourriez rencontrer quelques accrocs courants. Voici comment les résoudre :

### Problèmes de Gradle Android

Si vous rencontrez des problèmes liés à Gradle, essayez ces étapes :

1.  Naviguez jusqu'au répertoire Android et videz le cache de compilation :
    
    ```bash
    cd android
    ./gradlew cleanBuildCache
    ```
    
2.  Mettez à jour la version de Gradle dans `android/build.gradle` :
    
    ```kotlin
    buildscript {
        ext {
            gradleVersion = '8.1.0'
        }
    }
    ```
    
3.  Ajoutez les lignes suivantes à `android/gradle.properties` pour de meilleures performances :
    
    ```properties
    org.gradle.jvmargs=-Xmx4608m
    org.gradle.parallel=true
    ```
    

Si les problèmes persistent, revérifiez votre configuration ou consultez des ressources supplémentaires de dépannage.

### L'application affiche un écran blanc

Un écran blanc indique généralement un problème de configuration. Voici comment y remédier :

-   **Vérifiez le chemin du répertoire web** : Assurez-vous que `webDir` correspond à votre sortie de construction.
    
    ```typescript
    const config: CapacitorConfig = {
        webDir: 'dist', // Adjust if necessary
    };
    ```
    
-   **Vérifiez la configuration du serveur** : Confirmez que les paramètres du serveur sont corrects.
    
    ```typescript
    server: {
        url: 'http://localhost:3000',
        cleartext: true
    }
    ```
    
-   **Mettez à jour la politique de sécurité de contenu** : Ajoutez cette balise meta à votre HTML pour un chargement approprié des ressources.
    
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *">
    ```
    

### Plugin non fonctionnel

Si un plugin ne se comporte pas comme prévu, suivez ces étapes :

1.  Effectuez une installation propre des dépendances :
    
    ```bash
    rm -rf node_modules
    npm cache clean --force
    npm install
    ```
    
2.  Vérifiez les paramètres du plugin dans `capacitor.config.ts` pour vous assurer qu'ils sont configurés correctement :
    
    ```typescript
    plugins: {
        PluginName: {
            option: 'value'
        }
    }
    ```
    

Pour ceux utilisant le [plugin natif de Capgo](https://capgo.app/plugins/), il synchronise automatiquement les plugins et maintient la compatibilité lors des mises à jour.

Après avoir appliqué ces corrections, reconstruisez votre projet pour vérifier les modifications :

```bash
npm run build && npx cap copy && npx cap sync
```

Une fois tout fonctionnant sans problème, vous pouvez poursuivre avec l'exploration des options de mise à jour en direct avec Capgo.

## Mises à jour en direct avec [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/435c1a19c50c4ff1b7d76cbc4edeb6d0.jpg)

Simplifiez les [mises à jour d'applications](https://capgo.app/plugins/capacitor-updater/) en utilisant Capgo. Il vous permet d'envoyer des mises à jour directement aux utilisateurs, en évitant le besoin d'examens dans les magasins d'applications.

**Commencer est simple.** Tout d'abord, installez les packages nécessaires :

```bash
npm install @capgo/cli @capgo/capacitor-updater
npx cap sync
```

Ensuite, initialisez Capgo dans votre projet :

```bash
npx @capgo/cli init
```

### Plans tarifaires

Capgo propose plusieurs niveaux de tarification pour répondre à différents besoins :

| Plan | Utilisateurs actifs mensuels | Bande passante | Stockage | Prix (annuel) |
| --- | --- | --- | --- | --- |
| SOLO | 1,000 | 50 Go | 2 Go | 12 $/mois |
| MAKER | 10,000 | 500 Go | 5 Go | 33 $/mois |
| TEAM | 100,000 | 2,000 Go | 10 Go | 83 $/mois |

Pour les utilisateurs d'entreprise, le plan PAYG commence à 249 $/mois et inclut des avantages comme l'accès API, des domaines personnalisés et un support dédié.

### Configuration pour les mises à jour en direct

Pour activer les mises à jour en direct, ajoutez ce qui suit à votre fichier `capacitor.config.ts` :

```typescript
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      updateUrl: 'https://api.capgo.app/updates'
    }
  }
}
```

### Fonctionnalités clés

Capgo fournit plusieurs fonctionnalités remarquables :

-   **[Mises à jour sécurisées](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/)** avec cryptage de bout en bout
-   **Déploiements automatisés** grâce à l'intégration CI/CD
-   **Mises à jour ciblées** par affectation d'utilisateurs
-   **Rollback instantané** avec contrôle de version
-   **Analytique en temps réel** pour suivre les mises à jour

### Commandes de déploiement

Testez les mises à jour en développement avant de les déployer en direct. Utilisez les commandes suivantes :

-   Déployez vers staging :
    
    ```bash
    npx @capgo/cli deploy --channel staging
    ```
    
-   Déployez en production :
    
    ```bash
    npx @capgo/cli deploy --channel production
    ```
    

Capgo garantit la conformité aux directives d'Apple et d'Android, donc vos mises à jour en direct ne risquent pas d'enfreindre les règlements des app stores. C'est un moyen efficace de gérer les applications Capacitor après installation.

## Conclusion

La configuration du Capacitor CLI est simple lorsque vous disposez des bons prérequis en place. Cette configuration garantit des mises à jour d'applications plus fluides et des workflows de développement efficaces.

Les outils modernes rendent la maintenance des applications plus facile que jamais. Par exemple, Capgo propose désormais des mises à jour en direct, remplaçant des méthodes plus anciennes. Son intégration avec l'installation CLI en fait une excellente option pour les développeurs travaillant avec des applications Capacitor.

L' [écosystème Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) s'améliore constamment avec de nouveaux outils et fonctionnalités. Installer le CLI n'est que le point de départ pour [créer des applications mobiles](https://capgo.app/blog/angular-mobile-app-capacitor/), et vous bénéficierez d'une documentation détaillée et d'une communauté de développeurs active.

Assurez-vous de garder le Capacitor CLI et ses packages à jour pour éviter les problèmes de compatibilité.
