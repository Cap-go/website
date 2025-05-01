---
slug: how-to-customize-build-scripts-with-capacitor-cli
title: Come Personalizzare gli Script di Build con Capacitor CLI
description: >-
  Apprenez à personnaliser vos scripts de build en utilisant Capacitor CLI pour
  des déploiements efficaces et des mises à jour d'applications personnalisées
  sur toutes les plateformes.
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

[Capacitor](https://capacitorjscom/) CLI vous permet de personnaliser le processus de build de votre application pour les plateformes iOS, Android et web. En ajustant les scripts de build, vous pouvez :

-   **Accélérer les mises à jour** : Déployer les changements instantanément sans délais d'App Store
-   **Contrôler les déploiements** : Revenir à une version antérieure ou cibler des groupes d'utilisateurs spécifiques
-   **Sécuriser votre application** : Utiliser le chiffrement pour protéger les mises à jour
-   **Optimiser les builds** : Ajuster les paramètres selon les besoins spécifiques de chaque plateforme

### Aperçu rapide des fonctionnalités clés :

-   **Fichiers de configuration** : Utiliser `capacitorconfigjson` et `packagejson` pour gérer les paramètres de build
-   **Scripts personnalisés** : Ajouter des tâches pre-build et post-build pour l'automatisation
-   **Hooks de build** : Exécuter du code pendant des étapes spécifiques du processus de build
-   **Variables d'environnement** : Simplifier les builds spécifiques à l'environnement avec les fichiers `env`

[Capgo](https://capgoapp/), un outil de déploiement, améliore ce processus avec des [mises à jour automatisées](https://capgoapp/docs/plugin/cloud-mode/hybrid-update/), le suivi des versions et l'optimisation des performances globales. Continuez la lecture pour apprendre comment configurer et personnaliser vos scripts de build pour une efficacité maximale.

## Présentation de [Capacitor](https://capacitorjscom/) Configure

![Capacitor](https://assetsseobotaicom/capgoapp/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1jpg)

[[HTML_TAG]][[HTML_TAG]]

## Processus de build par défaut dans Capacitor

Comprendre comment Capacitor gère son processus de build par défaut est crucial si vous souhaitez le personnaliser efficacement. Ci-dessous, nous allons détailler le processus de build du CLI Capacitor et ses fichiers de configuration clés.

### Étapes de build standard

Capacitor utilise un processus étape par étape pour transformer votre application web en builds spécifiques à chaque plateforme. Voici ce qui se passe pendant le processus de build par défaut :

| Phase | Description | Résultat |
| --- | --- | --- |
| **Build Web** | Compile les ressources web avec vos outils framework | Bundle web optimisé |
| **Copie des ressources** | Déplace les ressources web vers les dossiers des plateformes natives | Répertoires de ressources spécifiques aux plateformes |
| **Build Natif** | Exécute les commandes de build spécifiques aux plateformes | Binaires prêts à déployer |
| **Vérification** | Vérifie l'intégrité du build et les dépendances | État du build et avertissements |

### Fichiers de configuration principaux

Deux fichiers de configuration clés déterminent la façon dont Capacitor gère vos builds :

**capacitorconfigjson**  
C'est le fichier de configuration principal pour votre projet Capacitor. Il définit des paramètres importants pour vos builds :

[[CODE_BLOCK]]

-   **`appId`** : Un identifiant unique pour votre application
-   **`appName`** : Le nom de votre application
-   **`webDir`** : Spécifie où Capacitor doit chercher les ressources web (ex : `dist`)
-   **`plugins`** : Permet de configurer les paramètres spécifiques aux plugins, comme les options de SplashScreen

**packagejson**  
Ce fichier inclut les scripts de build et les dépendances qui influencent le processus de build :

[[CODE_BLOCK]]

-   Le paramètre `webDir` dans `capacitorconfigjson` indique à Capacitor où trouver vos ressources web compilées pour les inclure dans les builds natifs
-   Après avoir modifié `capacitorconfigjson`, vous devez exécuter `cap sync` pour assurer la mise à jour de vos projets natifs

Ensuite, nous explorerons comment vous pouvez modifier ces paramètres pour personnaliser davantage vos builds.

## Modification des scripts de build

Vous pouvez ajuster le processus de build par défaut de Capacitor pour mieux répondre aux besoins de votre projet. Voici comment :

### Paramètres du fichier de configuration

Vous pouvez ajuster le processus de build en modifiant le fichier `capacitorconfigjson`. Voici un exemple de configuration :

[[CODE_BLOCK]]

Voici quelques paramètres clés que vous pouvez modifier :

-   **`webDir`** : Spécifie l'emplacement de vos ressources web compilées
-   **`server`** : Configure le serveur de développement, y compris le nom d'hôte et les permissions de navigation
-   **`android/ios`** : Permet des paramètres de build spécifiques aux plateformes, comme les détails du keystore pour Android ou les options de provisioning pour iOS

### Création de scripts NPM

Pour simplifier votre flux de travail, ajoutez des scripts NPM personnalisés à votre fichier `packagejson`