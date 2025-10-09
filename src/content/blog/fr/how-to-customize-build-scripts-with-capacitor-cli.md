---
slug: how-to-customize-build-scripts-with-capacitor-cli
title: Comment personnaliser les scripts de construction avec Capacitor CLI
description: >-
  Apprenez à personnaliser vos scripts de construction en utilisant Capacitor
  CLI pour des déploiements efficaces et des mises à jour d'applications sur
  mesure sur plusieurs plateformes.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T01:58:36.984Z
updated_at: 2025-04-02T01:58:48.944Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873-1743559128944.jpg
head_image_alt: Développement Mobile
keywords: >-
  Capacitor, build scripts, mobile development, deployment automation,
  environment variables, app updates
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI vous permet de personnaliser le processus de construction de votre application pour les plateformes iOS, Android et web. En ajustant les scripts de construction, vous pouvez :

-   **Accélérer les mises à jour** : Publiez des changements instantanément sans délais d'app store.
-   **Contrôler les déploiements** : Revenir à des mises à jour ou cibler des groupes d'utilisateurs spécifiques.
-   **Sécuriser votre application** : Utilisez le chiffrement pour protéger les mises à jour.
-   **Optimiser les constructions** : Ajustez les paramètres pour des besoins spécifiques à chaque plateforme.

### Aperçu rapide des fonctionnalités clés :

-   **Fichiers de configuration** : Utilisez `capacitor.config.json` et `package.json` pour gérer les paramètres de construction.
-   **Scripts personnalisés** : Ajoutez des tâches de préconstruction et de postconstruction pour l'automatisation.
-   **Hooks de construction** : Exécutez du code à des étapes spécifiques du processus de construction.
-   **Variables d'environnement** : Simplifiez les constructions spécifiques à l'environnement avec des fichiers `.env`.

[Capgo](https://capgo.app/), un outil de déploiement, améliore ce processus avec des [mises à jour automatisées](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/), le suivi des versions et l'optimisation des performances globales. Continuez à lire pour apprendre comment configurer et personnaliser vos scripts de construction pour une efficacité maximale.

## Présentation de [Capacitor](https://capacitorjs.com/) Configure

![Capacitor](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Processus de construction par défaut dans Capacitor

Comprendre comment Capacitor gère son processus de construction par défaut est crucial si vous souhaitez le personnaliser efficacement. Ci-dessous, nous allons décomposer le processus de construction de Capacitor CLI et ses fichiers de configuration clés.

### Étapes de construction standard

Capacitor utilise un processus étape par étape pour transformer votre application web en constructions spécifiques à chaque plateforme. Voici ce qui se passe lors du processus de construction par défaut :

| Phase | Description | Sortie |
| --- | --- | --- |
| **Construction Web** | Compile les actifs web en utilisant vos outils de framework | Package web optimisé |
| **Copie des actifs** | Déplace les actifs web vers les dossiers de la plateforme native | Répertoires d'actifs spécifiques à la plateforme |
| **Construction Native** | Exécute des commandes de construction spécifiques à la plateforme | Binaires prêts à être déployés |
| **Vérification** | Vérifie l'intégrité de la construction et les dépendances | État de la construction et avertissements |

### Fichiers de configuration principaux

Deux fichiers de configuration clés déterminent comment Capacitor gère vos constructions :

**capacitor.config.json**  
C'est le fichier de configuration principal pour votre projet Capacitor. Il définit des paramètres importants pour vos constructions :

```json
{
  "appId": "com.example.app",
  "appName": "MyApp",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000
    }
  }
}
```

-   **`appId`** : Un identifiant unique pour votre application.
-   **`appName`** : Le nom de votre application.
-   **`webDir`** : Spécifie où Capacitor doit chercher les actifs web (par exemple, `dist`).
-   **`plugins`** : Vous permet de configurer des paramètres spécifiques au plugin, comme les options de SplashScreen.

**package.json**  
Ce fichier inclut des scripts de construction et des dépendances qui influencent le processus de construction :

```json
{
  "scripts": {
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "cap:build": "cap build"
  }
}
```

-   Le paramètre `webDir` dans `capacitor.config.json` indique à Capacitor où localiser vos actifs web compilés pour inclusion dans les constructions natives.
-   Après avoir effectué des modifications dans `capacitor.config.json`, vous devez exécuter `cap sync` pour garantir que vos projets natifs soient à jour.

Ensuite, nous allons explorer comment vous pouvez modifier ces paramètres pour personnaliser encore plus vos constructions.

## Modification des scripts de construction

Vous pouvez ajuster le processus de construction par défaut de Capacitor pour mieux répondre aux besoins de votre projet. Voici comment :

### Paramètres du fichier de configuration

Vous pouvez ajuster le processus de construction en éditant le fichier `capacitor.config.json`. Voici un exemple de configuration :

```json
{
  "appId": "com.example.app",
  "webDir": "www",
  "server": {
    "hostname": "localhost",
    "androidScheme": "https",
    "iosScheme": "https",
    "allowNavigation": ["*.example.com"]
  },
  "android": {
    "buildOptions": {
      "keystorePath": "release.keystore",
      "keystorePassword": "mypassword",
      "keystoreAlias": "release",
      "keystoreAliasPassword": "mypassword"
    }
  },
  "ios": {
    "scheme": "App",
    "automaticProvisioning": true
  }
}
```

Voici quelques paramètres clés que vous pouvez modifier :

-   **`webDir`** : Spécifie où se trouvent vos actifs web compilés.
-   **`server`** : Configure le serveur de développement, y compris le nom d'hôte et les permissions de navigation.
-   **`android/ios`** : Permet des paramètres de construction spécifiques à la plateforme, tels que les détails du keystore pour Android ou les options de provisionnement pour iOS.

### Création de scripts NPM

Pour rationaliser votre flux de travail, ajoutez des scripts NPM personnalisés à votre fichier `package.json`. Voici un exemple :

```json
{
  "scripts": {
    "prebuild": "node ./scripts/prepare-env.js",
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "build:ios": "cap build ios --release",
    "build:android": "cap build android --release",
    "postbuild": "node ./scripts/notify-completion.js"
  }
}
```

-   **`prebuild` et `postbuild`** : Utilisez-les pour des tâches comme la configuration de l'environnement ou l'envoi de notifications lorsque la construction est terminée.
-   **`build:platform`** : Commandes spécifiques à la plateforme pour construire des applications Android ou iOS.

Vous pouvez aller encore plus loin dans l'automatisation en ajoutant des hooks de construction.

### Configuration des hooks de construction

Pour un contrôle plus avancé, utilisez des hooks de construction pour exécuter du code personnalisé à des points spécifiques du processus de construction. Voici un exemple de configuration dans `capacitor.config.ts` :

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  plugins: {
    CapacitorHooks: {
      beforeBuild: async () => {
        console.log('Running pre-build tasks...');
        // Add your pre-build tasks here
      },
      afterBuild: async () => {
        console.log('Running post-build tasks...');
        // Add your post-build tasks here
      }
    }
  }
};

export default config;
```

Avec les hooks de construction, vous pouvez :

-   Valider les exigences avant le début de la construction
-   Transformer les actifs pendant le processus
-   Déclencher des notifications à des moments clés
-   Mettre à jour les numéros de version automatiquement
-   Exécuter des tests automatisés sans heurts

Cette approche vous donne plus de flexibilité et de contrôle sur l'ensemble du cycle de vie de la construction.

## Personnalisation avancée de la construction

Lorsque vous travaillez sur des projets plus importants, peaufiner votre processus de construction peut faire une grande différence. Voici comment gérer efficacement les constructions spécifiques à l'environnement et les personnalisations de la plateforme.

### Variables d'environnement

Configurez des variables d'environnement en créant des fichiers `.env` séparés pour chaque environnement :

-   `.env.development`
-   `.env.staging`
-   `.env.production`

Ensuite, configurez votre script de construction pour charger le fichier approprié en fonction de l'environnement :

```typescript
import { defineConfig } from '@capacitor/cli';

export default defineConfig({
  ios: {
    buildConfig: {
      environment: process.env.BUILD_ENV || 'development',
      configurations: {
        development: {
          signing: {
            debug: true,
            automaticProvisioning: true
          }
        },
        production: {
          signing: {
            release: true,
            provisioningProfile: 'dist/profile.mobileprovision'
          }
        }
      }
    }
  }
});
```

Vous pouvez encore ajuster ces paramètres pour correspondre aux exigences spécifiques de chaque plateforme.

### Constructions spécifiques à la plateforme

Pour personnaliser les constructions pour Android et iOS, utilisez la structure suivante :

```typescript
const platformConfig = {
  android: {
    buildType: process.env.BUILD_TYPE || 'debug',
    keystoreConfig: {
      path: process.env.KEYSTORE_PATH,
      password: process.env.KEYSTORE_PASSWORD,
      alias: process.env.KEYSTORE_ALIAS
    }
  },
  ios: {
    scheme: process.env.APP_SCHEME || 'App',
    xcodePreferences: {
      automaticSigning: false,
      developmentTeam: process.env.DEVELOPMENT_TEAM
    }
  }
};
```

Ces configurations vous permettent d'adapter les constructions pour chaque plateforme, garantissant des déploiements plus fluides.

| Fonctionnalité | Android | iOS |
| --- | --- | --- |
| Symboles de débogage | fichiers de mappage [ProGuard](https://www.guardsquare.com/proguard) | fichiers dSYM |
| Variantes de construction | debug, release, staging | debug, release |
| Signature de code | gestion du keystore | profils de provisionnement |
| Gestion des actifs | optimisation des res/drawable | catalogues d'actifs |

Des conseils supplémentaires pour optimiser vos constructions incluent :

-   Utiliser des mises à jour partielles pour gagner du temps lors des déploiements
-   Configurer le suivi des erreurs pour identifier rapidement les problèmes
-   Créer des systèmes de canaux pour tester des versions bêta
-   Activer le chiffrement de bout en bout pour une distribution sécurisée

Lorsqu'ils sont associés à des outils comme Capgo pour l'analyse et les mises à jour sécurisées, ces techniques vous donnent plus de contrôle sur votre processus de déploiement [\[1\]](https://capgo.app/).

## Problèmes de script de construction et solutions

Lorsque vous travaillez avec des configurations de construction personnalisées, traiter les erreurs rapidement est crucial pour maintenir le processus de construction sans accroc.

### Corriger les erreurs courantes

De nombreux problèmes de script de construction proviennent de la configuration de l'environnement ou de problèmes de dépendance. Voici comment traiter certains des problèmes courants :

**Variables d'environnement manquantes**

Si vous rencontrez une erreur comme celle-ci :

```bash
error: Cannot find environment configuration for BUILD_ENV
```

Vous pouvez le résoudre en créant un fichier `.env.local` dans le répertoire racine de votre projet. Voici un exemple :

```bash
BUILD_ENV=development
CAPACITOR_PLATFORM=ios
BUILD_TYPE=debug
```

**Échecs de construction spécifiques à la plateforme**

Pour les erreurs de signature Android, utilisez cette commande :

```bash
npx cap build android --keystorePassword=$KEYSTORE_PASSWORD --keystoreAlias=$KEYSTORE_ALIAS
```

Pour les problèmes de profil de provisionnement iOS, essayez ceci :

```bash
npx cap build ios --configuration=release --type=development
```

| Type d'erreur | Cause courante | Solution |
| --- | --- | --- |
| Configuration de signature | Détails de keystore manquants | Définissez `KEYSTORE_PATH` et les informations d'identification |
| Environnement de construction | Variables non définies | Créez des fichiers `.env` spécifiques à la plateforme |
| Dépendances | Incompatibilités de version | Mettez à jour `package.json` et synchronisez |

Après avoir appliqué les corrections, assurez-vous que vos modifications sont solides en exécutant des tests de construction approfondis.

### Tester les scripts de construction

Une fois les erreurs résolues, validez vos scripts de construction avec ces étapes :

-   **Vérification automatisée** : Exécutez des commandes clés pour confirmer que le processus de construction fonctionne comme prévu.

```bash
npm run build
npx cap sync
npx cap copy
```

-   **Validation de l'environnement** : Vérifiez les variables d'environnement manquantes avant de commencer la construction.

```typescript
const requiredVars = ['BUILD_ENV', 'KEYSTORE_PATH'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```

-   **Débogage des scripts de construction** : Ajoutez des scripts détaillés pour repérer les problèmes potentiels durant la construction.

```json
{
  "scripts": {
    "build:debug": "NODE_ENV=development npx cap build --verbose",
    "build:release": "NODE_ENV=production npx cap build --verbose"
  }
}
```

Conseils supplémentaires pour les tests :

-   Utilisez des conteneurs [Docker](https://www.docker.com/) pour isoler les constructions.
-   Validez les fichiers de configuration avant de commencer le processus.
-   Testez avec plusieurs versions de [Node.js](https://nodejs.org/en).
-   Confirmez que les exigences spécifiques à la plateforme sont remplies.
-   Gardez un œil sur les performances de construction pour des améliorations possibles.

## Fonctionnalités de construction de [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/454adbba4c00491adce88db59812b177.jpg)

Capgo élève les scripts de construction à un niveau supérieur avec un déploiement automatisé, améliorant l'efficacité et simplifiant le processus.

### Mises à jour rapides de l'application

Les performances de mise à jour de Capgo sont impressionnantes :

-   **95% des utilisateurs actifs** reçoivent des mises à jour en moins de 24 heures.
-   **Taux de réussite de 82%** pour la livraison des mises à jour dans le monde entier.
-   Un temps de réponse API moyen de **434 ms dans le monde**.

La plateforme utilise des mises à jour partielles, ce qui signifie que seuls les changements sont téléchargés. Cette approche réduit l'utilisation de la bande passante et accélère le processus de mise à jour. De plus, l'ensemble du processus de construction est entièrement automatisé, économisant du temps et des efforts.

### Automatisation de la construction

Capgo fonctionne parfaitement avec les principales plateformes CI/CD, offrant une variété d'intégrations :

| Plateforme CI/CD | Fonctions d'intégration | Avantages |
| --- | --- | --- |
| [GitHub Actions](https://docs.github.com/actions) | Constructions automatisées, Déclencheurs de déploiement | Déploiement continu |
| [GitLab CI](https://docs.gitlab.com/ee/ci/) | Automatisation des pipelines, Contrôle de version | Flux de travail rationalisé |
| [Jenkins](https://www.jenkins.io/) | Flux de travail personnalisés, Hooks de construction | Scalable pour les entreprises |

Mettre en place une construction automatisée coûte généralement environ **300 $ par mois**, ce qui est beaucoup plus économique par rapport aux solutions traditionnelles qui peuvent atteindre **6 000 $ par an**.

### Normes de sécurité

Capgo accorde la priorité à la sécurité avec un cadre robuste qui inclut :

-   Chiffrement de bout en bout pour les paquets de mise à jour.
-   Gestion sécurisée des clés.
-   Conformité avec les directives d'Apple et de Google.

**Fonctionnalités de contrôle de version**

-   Options de retour en arrière instantanées.
-   Suivi des versions de déploiement.
-   Gestion des canaux de mise à jour pour les versions étagées.

Ce cadre de sécurité a été rigoureusement testé dans des centaines d'applications d'entreprise. Pour les équipes nécessitant une sécurité supplémentaire, Capgo propose également des solutions auto-hébergées avec des configurations personnalisables.

Le système de canaux de Capgo rend la distribution des mises à jour flexible. Les développeurs peuvent cibler des groupes d'utilisateurs spécifiques avec différentes versions, parfait pour les tests bêta ou les déploiements progressifs.

## Résumé

### Vue d'ensemble des étapes de construction

Les scripts de construction personnalisés permettent des déploiements automatisés et cohérents en tirant parti des hooks de construction, des variables d'environnement, et des commandes spécifiques à la plateforme. Ces processus créent une base solide pour les améliorations de déploiement rendues possibles avec Capgo.

### Avantages de Capgo

Capgo simplifie le déploiement, ayant réussi à livrer plus de 23,5 millions de mises à jour à travers 750 applications en production [\[1\]](https://capgo.app/). Son système de mise à jour partielle réduit à la fois l'utilisation de la bande passante et le temps de déploiement.

La plateforme fournit des mises à jour rapides, une optimisation des performances globale, un cryptage de bout en bout pour la sécurité, et un système de distribution basé sur les canaux flexible. Cette configuration prend en charge les mises à jour ciblées, les tests bêta, et la conformité avec les directives des app stores tout en maintenant un solide cadre de sécurité.
