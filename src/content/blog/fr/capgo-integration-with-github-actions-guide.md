---
slug: capgo-integration-with-github-actions-guide
title: 'Intégration de Capgo avec GitHub Actions : Guide'
description: >-
  Intégrez Capgo avec GitHub Actions pour des mises à jour d'applications
  efficaces, sécurisées et rentables, améliorant ainsi votre flux de travail de
  développement.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-10-22T12:30:10.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d61b378b902ec211cf87e9-1742091902582.jpg
head_image_alt: Développement Mobile
keywords: >-
  Capgo, GitHub Actions, CI/CD, Capacitor apps, deployment, automation, updates,
  security
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
[Capgo](https://capgo.app/) et [GitHub Actions](https://docs.github.com/actions) simplifient ensemble le déploiement des mises à jour pour les applications [Capacitor](https://capacitorjs.com/). Voici pourquoi cette intégration mérite votre attention :

-   **Économisez de l'argent** : Réduisez les coûts CI/CD jusqu'à 26 100 $ sur 5 ans par rapport à [AppFlow](https://ionic.io/appflow/).
-   **Mises à jour rapides** : Publiez des mises à jour instantanément avec 95 % des utilisateurs les recevant en 24 heures.
-   **Déploiements sécurisés** : Le cryptage de bout en bout garantit que les mises à jour sont sûres.
-   **Flux de travail rationalisé** : Automatisez les builds et les déploiements directement dans votre dépôt GitHub.

### Vue d'ensemble rapide

1.  **Exigences** : Compte GitHub, [compte Capgo](https://capgo.app/disclaimer/) (à partir de 12 $/mois), projet Capacitor, [Node.js](https://nodejs.org/en).
2.  **Configuration** : Installez [Capgo CLI](https://capgo.app/docs/cli/commands) avec `npx @capgo/cli init`, configurez GitHub Actions avec un workflow YAML.
3.  **Déploiement** : Utilisez des commandes comme `npx @capgo/cli deploy` pour [automatiser les mises à jour](https://capgo.app/docs/live-updates/update-behavior/).
4.  **Tests** : Déployez vers des canaux de test (par exemple, bêta, préproduction) avant la production.

**Exemple de Workflow (YAML)** :

```yaml
name: Capgo Deploy  
on:  
  push:  
    branches:  
      - main  

jobs:  
  deploy:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v3  
      - uses: actions/setup-node@v6  
        with:  
          node-version: '24'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

Cette intégration garantit des mises à jour d'applications rapides, sécurisées et rentables, ce qui la rend idéale pour les équipes de développement agiles.

## [GitHub Actions](https://docs.github.com/actions) Tutoriel - Concepts de base et pipeline CI/CD

![GitHub Actions](https://mars-images.imgix.net/seobot/screenshots/docs.github.com-90237daad1b336de5d9b7f1a85aa7441-2025-03-16.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Exigences de configuration

[L'intégration de Capgo](https://capgo.app/docs/webapp/) avec GitHub Actions implique la mise en place des outils et des configurations nécessaires.

### Outils et comptes requis

Assurez-vous d'avoir les comptes et outils suivants prêts :

| Exigence | Objectif | Détails |
| --- | --- | --- |
| **Compte GitHub** | Contrôle de version & CI/CD | Compte actif avec accès aux dépôts |
| **Compte Capgo** | Gérer les mises à jour en direct | Les plans commencent à 12 $/mois pour le plan SOLO |
| **Projet Capacitor** | Développement d'applications | Un projet fonctionnel prêt à être intégré |
| **Node.js** | Environnement d'exécution | La dernière version LTS est recommandée |

Une fois cela en place, vous pouvez procéder à l'ajout de Capgo à votre projet pour des mises à jour en direct automatisées.

### Ajout de [Capgo](https://capgo.app/) à votre projet

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16.jpg?auto=compress)

Pour intégrer Capgo, installez-le dans votre projet Capacitor en utilisant son outil CLI. Selon Martin Donadieu, fondateur de Capgo :

> "Exécutez npx @capgo/cli init et c'est tout !" [\[1\]](https://capgo.app/)

Cette commande configurera le plugin et ses dépendances requises.

### Configuration du dépôt GitHub

Préparez votre dépôt GitHub pour répondre aux exigences d'intégration CI/CD avec Capgo. Comme mentionné dans leur documentation :

> "Nous configurons votre pipeline CI/CD directement sur votre plateforme préférée, que ce soit GitHub Actions, GitLab CI, ou autres. Nous ne gérons pas CI/CD et ne vous facturons pas pour le maintenir." [\[1\]](https://capgo.app/)

Capgo propose cette configuration pour un frais unique de 2 600 $ et environ 300 $/mois, ce qui est plus abordable comparé aux 6 000 $ de frais annuels d'AppFlow [\[1\]](https://capgo.app/).

Voici comment configurer votre dépôt :

-   **Structure du dépôt** : Organisez votre dépôt avec des répertoires séparés pour le code source, les ressources et les fichiers de configuration afin de garder tout propre et gérable.
-   **Configuration de l'environnement** : Créez des environnements distincts pour le développement, la préproduction et la production, en garantissant des contrôles d'accès et des mesures de sécurité appropriées.
-   **Gestion des accès** : Définissez les autorisations du dépôt avec soin pour permettre [l'intégration de Capgo](https://capgo.app/consulting/) tout en maintenant la sécurité.

Ces étapes garantiront que votre projet est prêt pour le flux de travail GitHub Actions, qui sera décrit dans la section suivante.

## Configuration du flux de travail GitHub Actions

Automatisez vos [déploiements Capgo](https://capgo.app/docs/cli/commands/) en utilisant GitHub Actions pour rationaliser votre processus CI/CD.

### Création du fichier de workflow

Commencez par créer un fichier YAML dans le répertoire `.github/workflows` de votre dépôt. Voici un exemple :

```yaml
name: Capgo Deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build
      - name: Deploy to Capgo
        run: npx @capgo/cli deploy
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Cette configuration garantit des déploiements sécurisés et automatisés. Une fois que vous avez configuré le fichier, choisissez les bons déclencheurs pour votre workflow.

### Options de déclenchement de workflow

GitHub Actions vous permet de personnaliser le moment où les workflows s'exécutent. Voici quelques options de déclenchement :

| **Type de déclencheur** | **Cas d'utilisation** | **Configuration** |
| --- | --- | --- |
| Événements Push | Déployer lors de changements de code | S'active lorsque du code est poussé sur des branches spécifiques |
| Dispatch Manuel | Mises à jour à la demande | Vous permet de démarrer manuellement le workflow |
| Planification | Sorties temporisées | Exécute des déploiements à des intervalles fixés |
| Demande de tirage | Tester les mises à jour | Teste les modifications avant de les fusionner dans les branches principales |

### Gestion des clés secrètes

Pour garantir des déploiements sécurisés, vous devez gérer correctement vos clés secrètes. GitHub Actions propose un système de gestion des secrets cryptés à cet effet.

**Étapes pour configurer une authentification sécurisée :**

1.  **Accédez aux paramètres du dépôt**  
    Allez dans les paramètres de votre dépôt et trouvez la section "Secrets et variables" sous l'onglet "Sécurité".
    
2.  **Ajoutez [les identifiants Capgo](https://capgo.app/trust/)**  
    Sauvegardez votre jeton d'authentification Capgo en tant que secret du dépôt. Nommez-le `CAPGO_TOKEN`.
    
3.  **Référencez les secrets dans les workflows**  
    Utilisez vos secrets stockés dans le workflow en les référent comme ceci : `${{ secrets.CAPGO_TOKEN }}`.
    

## Commandes Capgo dans les workflows

Une fois votre environnement GitHub Actions configuré, vous pouvez automatiser les déploiements en intégrant les commandes Capgo CLI.

### Installation de Capgo CLI

Ajoutez l'étape suivante à votre workflow pour installer Capgo CLI :

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Initialize Capgo
    run: npx @capgo/cli init
```

### Authentification de la CLI

Authentifiez en toute sécurité la CLI en utilisant le `CAPGO_TOKEN` :

```yaml
- name: Authenticate Capgo CLI
  run: npx @capgo/cli login
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Commandes de déploiement

Voici les commandes clés pour gérer la création, la version et le déploiement de vos mises à jour :

| Commande | Objectif | Exemples d'utilisation |
| --- | --- | --- |
| `build` | Génère un [bundle prêt pour la production](https://capgo.app/docs/webapp/bundles/) | `npx @capgo/cli build` |
| `deploy` | Pousse des mises à jour vers Capgo | `npx @capgo/cli deploy` |
| `version` | Définit la version pour la mise à jour | `npx @capgo/cli version 1.2.0` |

Pour automatiser l'ensemble du processus de déploiement, utilisez les commandes ensemble comme ceci :

```yaml
steps:
  - name: Build and Deploy
    run: |
      npx @capgo/cli build
      npx @capgo/cli version ${{ github.ref_name }}
      npx @capgo/cli deploy
    env:
      CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Cette configuration garantit que vos mises à jour sont automatiquement créées, versionnées et déployées chaque fois que le workflow est exécuté. Le système de gestion des secrets de GitHub garde vos identifiants en sécurité tout au long du processus.

## Tests et corrections

### Exécution des workflows de test

Vous pouvez tester votre workflow GitHub Actions en utilisant un [canal de test Capgo](https://capgo.app/docs/plugin/cloud-mode/channel-system/). Cela vous permet de valider les mises à jour avant qu'elles ne soient mises en ligne.

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Le système de canaux de Capgo vous aide à créer des chemins de déploiement distincts pour différentes étapes :

| Canal | Objectif | Public cible |
| --- | --- | --- |
| bêta | Tests préliminaires | Équipe interne |
| préproduction | Validation QA | Utilisateurs de test |
| production | Déploiement en direct | Tous les utilisateurs |

### Solutions aux erreurs

Voici quelques problèmes d'intégration courants et comment les résoudre :

1. **Échecs d'authentification**

Vérifiez le CAPGO\_TOKEN dans les secrets GitHub. S'il a expiré, régénérez-le pour garantir une authentification fluide.

2. **Erreurs de build**

Assurez-vous que votre configuration de build correspond aux exigences de votre environnement de déploiement.

> "Nous avons déployé des mises à jour OTA Capgo en production pour notre base d'utilisateurs de plus de 5000. Nous observons un fonctionnement très fluide, presque tous nos utilisateurs sont à jour dans les minutes suivant le déploiement de l'OTA sur @Capgo." [\[1\]](https://capgo.app/)

3. **Conflits de versions**

Adoptez le versionnement sémantique et incrémentez les versions correctement pour éviter les conflits lors des déploiements.

### Conseils de maintenance

-   Utilisez [l'analyse Capgo](https://capgo.app/dp/) pour surveiller les taux de réussite des mises à jour.
-   Activez les rollbacks automatiques pour les mises à jour qui pourraient causer des problèmes.
-   Testez les demandes de tirage (PRs) en utilisant des sélecteurs de canaux pour un meilleur contrôle.
-   Gardez votre workflow à jour avec les dernières commandes Capgo CLI.

Pour les déploiements à haute priorité, profitez de la gestion des erreurs de Capgo pour repérer rapidement les problèmes potentiels. Si quelque chose ne va pas, la fonction de rollback vous permet de revenir rapidement à une version stable, minimisant ainsi les perturbations. Ces pratiques aideront à maintenir vos déploiements en douceur à mesure que vous vous rapprochez de la production.

## Conclusion

### Points clés

L'intégration de Capgo avec GitHub Actions simplifie le processus de déploiement pour les [applications Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/), offrant des avantages majeurs aux équipes de développement. Avec un taux de réussite des mises à jour de 82 % au niveau mondial et 95 % des utilisateurs actifs recevant les mises à jour dans les 24 heures [\[1\]](https://capgo.app/), cette solution se distingue par son efficacité.

Voici quelques fonctionnalités remarquables :

-   **Workflows automatisés** : En configurant les workflows directement dans GitHub Actions, il n'est pas nécessaire d'héberger CI/CD à l'extérieur. Cette approche réduit les coûts opérationnels, économisant environ 26 100 $ sur cinq ans par rapport à des alternatives comme AppFlow [\[1\]](https://capgo.app/).
-   **Déploiement rapide** : Les mises à jour peuvent être poussées instantanément, contournant les délais de l'App Store.
-   **Sécurité solide** : Le cryptage de bout en bout garantit que les mises à jour sont livrées en toute sécurité, tandis que le système de canaux de Capgo permet des déploiements contrôlés et par étapes.

Ces fonctionnalités ouvrent la voie à des solutions plus adaptées et à une performance améliorée, explorées plus en détail ci-dessous.

### Stratégies avancées

Pour tirer le meilleur parti de votre intégration Capgo et GitHub Actions, explorez ces tactiques avancées :

-   **Flux de travail API personnalisés** : Utilisez l'API publique de Capgo pour concevoir des flux de déploiement adaptés aux besoins spécifiques de votre équipe. Cela peut permettre des expériences en marque blanche et une intégration transparente avec vos outils actuels [\[1\]](https://capgo.app/).
-   **[Versions basées sur des canaux](https://capgo.app/docs/webapp/channels/)** : Optimisez votre processus de déploiement en utilisant les fonctionnalités de canaux de Capgo pour des mises à jour échelonnées et contrôlées.
-   **Performance optimisée** : Profitez des mises à jour partielles de Capgo pour réduire l'utilisation de la bande passante et accélérer les mises à jour. Avec 23,5 millions de mises à jour délivrées à travers 750 applications de production [\[1\]](https://capgo.app/), le système a prouvé sa capacité à gérer des demandes à grande échelle.

Pour de meilleurs résultats, envisagez d'utiliser les options d'auto-hébergement de Capgo ou des configurations API personnalisées. Consultez les sections précédentes pour des instructions détaillées sur la configuration et les tests afin de mettre pleinement en œuvre ces stratégies.
