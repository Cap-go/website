---
slug: Panduan Integrasi Capgo dengan GitHub Actions
title: 'Integrasi Capgo dengan GitHub Actions: Panduan'
description: >-
  Integrasikan Capgo dengan GitHub Actions untuk pembaruan aplikasi yang
  efisien, aman, dan hemat biaya, sehingga meningkatkan alur pengembangan Anda.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-03-18T13:14:19.939Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d61b378b902ec211cf87e9-1742091902582.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capgo, GitHub Actions, CI/CD, Capacitor apps, deployment, automation, updates,
  security
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
original_slug: Guide d'intégration de Capgo avec GitHub Actions
---
[Capgo](https://capgo.app/) et [GitHub Actions](https://docs.github.com/actions) simplifient ensemble le déploiement des mises à jour pour les applications [Capacitor](https://capacitorjs.com/). Voici pourquoi cette intégration mérite votre attention :

-   **Économisez de l'argent** : Réduisez les coûts de CI/CD jusqu'à 26 100 $ sur 5 ans par rapport à [AppFlow](https://ionic.io/appflow/).
-   **Mises à jour rapides** : Déployez des mises à jour instantanément avec 95% des utilisateurs les recevant en 24 heures.
-   **Déploiements sécurisés** : Le chiffrement de bout en bout garantit la sécurité des mises à jour.
-   **Flux de travail simplifié** : Automatisez les builds et déploiements directement dans votre dépôt GitHub.

### Aperçu rapide

1.  **Prérequis** : Compte GitHub, [compte Capgo](https://capgo.app/disclaimer/) (à partir de 12$/mois), projet Capacitor, [Node.js](https://nodejs.org/en).
2.  **Configuration** : Installez [Capgo CLI](https://capgo.app/docs/cli/commands) avec `npx @capgo/cli init`, configurez GitHub Actions avec un workflow YAML.
3.  **Déploiement** : Utilisez des commandes comme `npx @capgo/cli deploy` pour [automatiser les mises à jour](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/).
4.  **Tests** : Déployez sur des canaux de test (ex : bêta, staging) avant la production.

**Exemple de workflow (YAML)** :

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
      - uses: actions/setup-node@v3  
        with:  
          node-version: '18.x'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

Cette intégration garantit des mises à jour rapides, sécurisées et rentables, la rendant idéale pour les équipes de développement agiles.

## Tutoriel [GitHub Actions](https://docs.github.com/actions) - Concepts de base et pipeline CI/CD

![GitHub Actions](https://mars-images.imgix.net/seobot/screenshots/docs.github.com-90237daad1b336de5d9b7f1a85aa7441-2025-03-16.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Prérequis d'installation

[L'intégration de Capgo](https://capgo.app/docs/webapp/) avec GitHub Actions nécessite la mise en place des outils et configurations nécessaires.

### Outils et comptes requis

Assurez-vous d'avoir les comptes et outils suivants prêts :

| Prérequis | Objectif | Détails |
| --- | --- | --- |
| **Compte GitHub** | Contrôle de version & CI/CD | Compte actif avec accès aux dépôts |
| **Compte Capgo** | Gestion des mises à jour en direct | Les forfaits commencent à 12$/mois pour le plan SOLO |
| **Projet Capacitor** | Développement d'application | Un projet fonctionnel prêt pour l'intégration |
| **Node.js** | Environnement d'exécution | La dernière version LTS est recommandée |

Une fois ces éléments en place, vous pouvez procéder à l'ajout de Capgo à votre projet pour des mises à jour automatisées en direct.

### Ajouter [Capgo](https://capgo.app/) à votre projet

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16.jpg?auto=compress)

Pour intégrer Capgo, installez-le dans votre projet Capacitor en utilisant son outil CLI. Selon Martin Donadieu, fondateur de Capgo :

> "Exécutez npx @capgo/cli init et c'est tout !" [\[1\]](https://capgo.app/)

Cette commande configurera le plugin et ses dépendances requises.

### Configuration du dépôt GitHub

Préparez votre dépôt GitHub pour répondre aux exigences d'intégration CI/CD avec Capgo. Comme mentionné dans leur documentation :

> "Nous configurons votre pipeline CI/CD directement sur votre plateforme préférée, que ce soit GitHub Actions, GitLab CI ou autres. Nous n'hébergeons pas de CI/CD et ne vous facturons pas pour le maintenir." [\[1\]](https://capgo.app/)

Capgo propose cette configuration pour des frais uniques de 2 600 $ et ~300 $/mois, ce qui est plus abordable par rapport aux frais annuels de 6 000 $ d'AppFlow [\[1\]](https://capgo.app/).

Voici comment configurer votre dépôt :

-   **Structure du dépôt** : Organisez votre dépôt avec des répertoires séparés pour le code source, les ressources et les fichiers de configuration pour garder tout propre et gérable.
-   **Configuration de l'environnement** : Créez des environnements distincts pour le développement, le staging et la production, en vous assurant que les contrôles d'accès et les mesures de sécurité appropriés sont en place.
-   **Gestion des accès** : Définissez soigneusement les permissions du dépôt pour permettre [l'intégration de Capgo](https://capgo.app/consulting/) tout en maintenant la sécurité.

Ces étapes garantiront que votre projet est prêt pour le workflow GitHub Actions, qui sera décrit dans la section suivante.

## Configuration du workflow GitHub Actions

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
      - uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build
      - name: Deploy to Capgo
        run: npx @capgo/cli deploy
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Cette configuration assure des déploiements sécurisés et automatisés. Une fois le fichier configuré, choisissez les bons déclencheurs pour votre workflow.

### Options de déclenchement du workflow

GitHub Actions vous permet de personnaliser quand les workflows s'exécutent. Voici quelques options de déclenchement :

| **Type de déclencheur** | **Cas d'utilisation** | **Configuration** |
| --- | --- | --- |
| Événements Push | Déploiement lors des changements de code | S'active quand le code est poussé vers des branches spécifiques |
| Déclenchement manuel | Mises à jour à la demande | Permet de démarrer manuellement le workflow |
| Planification | Versions programmées | Exécute les déploiements à intervalles définis |
| Pull Request | Test des mises à jour | Teste les changements avant la fusion dans les branches principales |

### Gestion des clés secrètes

Pour garantir des déploiements sécurisés, vous devez gérer correctement vos clés secrètes. GitHub Actions propose un système de gestion des secrets chiffrés à cet effet.

**Étapes pour configurer l'authentification sécurisée :**

1.  **Accéder aux paramètres du dépôt**  
    Allez dans les paramètres de votre dépôt et trouvez la section "Secrets and variables" sous l'onglet "Security".
    
2.  **Ajouter les [identifiants Capgo](https://capgo.app/trust/)**  
    Enregistrez votre jeton d'authentification Capgo comme secret du dépôt. Nommez-le `CAPGO_TOKEN`.
    
3.  **Référencer les secrets dans les workflows**  
    Utilisez vos secrets stockés dans le workflow en les référençant ainsi : `${{ secrets.CAPGO_TOKEN }}`.
    

## Commandes Capgo dans les workflows

Une fois votre environnement GitHub Actions configuré, vous pouvez automatiser les déploiements en intégrant les commandes Capgo CLI.

### Installation de Capgo CLI

Ajoutez l'étape suivante à votre workflow pour installer le CLI Capgo :

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Initialize Capgo
    run: npx @capgo/cli init
```

### Authentification du CLI

Authentifiez le CLI de manière sécurisée en utilisant le `CAPGO_TOKEN` :

```yaml
- name: Authenticate Capgo CLI
  run: npx @capgo/cli login
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Commandes de déploiement

Voici les principales commandes pour gérer la construction, le versioning et le déploiement de vos mises à jour :

| Commande | Objectif | Exemple d'utilisation |
| --- | --- | --- |
| `build` | Génère un [bundle prêt pour la production](https://capgo.app/docs/webapp/bundles/) | `npx @capgo/cli build` |
| `deploy` | Pousse les mises à jour vers Capgo | `npx @capgo/cli deploy` |
| `version` | Définit la version de la mise à jour | `npx @capgo/cli version 1.2.0` |

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

Cette configuration garantit que vos mises à jour sont automatiquement construites, versionnées et déployées chaque fois que le workflow s'exécute. Le système de gestion des secrets de GitHub garde vos identifiants en sécurité tout au long du processus.

## Tests et corrections

### Exécution des workflows de test

Vous pouvez tester votre workflow GitHub Actions en utilisant un [canal de test Capgo](https://capgo.app/docs/plugin/cloud-mode/channel-system/) dédié. Cela vous permet de valider les mises à jour avant leur mise en production.

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Le système de canaux de Capgo vous aide à créer des chemins de déploiement séparés pour différentes étapes :

| Canal | Objectif | Public cible |
| --- | --- | --- |
| beta | Tests pré-version | Équipe interne |
| staging | Validation QA | Utilisateurs test |
| production | Déploiement en direct | Tous les utilisateurs |

### Solutions aux erreurs

Voici quelques problèmes d'intégration courants et comment les résoudre :

1.  **Échecs d'authentification**

Vérifiez le CAPGO_TOKEN dans les Secrets GitHub. S'il est expiré, régénérez-le pour assurer une authentification fluide.

2.  **Erreurs de build**

Assurez-vous que votre configuration de build correspond aux exigences de votre environnement de déploiement.

> "Nous avons déployé les mises à jour OTA Capgo en production pour notre base d'utilisateurs de +5000. Nous constatons un fonctionnement très fluide, presque tous nos utilisateurs sont à jour en quelques minutes après le déploiement de l'OTA sur @Capgo." [\[1\]](https://capgo.app/)

3.  **Conflits de version**

Respectez le versioning sémantique et incrémentez correctement les versions pour éviter les conflits lors des déploiements.

### Conseils de maintenance

-   Utilisez [l'analytique Capgo](https://capgo.app/dp/) pour surveiller les taux de réussite des mises à jour.
-   Activez les retours en arrière automatiques pour les mises à jour qui pourraient causer des problèmes.
-   Testez les pull requests (PR) en utilisant des sélecteurs de canal pour un meilleur contrôle.
-   Gardez votre workflow à jour avec les dernières commandes Capgo CLI.

Pour les déploiements prioritaires, profitez du suivi des erreurs de Capgo pour repérer rapidement les problèmes potentiels. Si quelque chose ne va pas, la fonction de retour en arrière vous permet de revenir rapidement à une version stable, minimisant les perturbations. Ces pratiques aideront à maintenir vos déploiements fluides à mesure que vous vous rapprochez de la production.

## Conclusion

### Points clés

L'intégration de Capgo avec GitHub Actions simplifie le processus de déploiement pour les [applications Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/), apportant des avantages majeurs aux équipes de développement. Avec un taux de réussite global de 82% pour les mises à jour et 95% des utilisateurs actifs recevant les mises à jour dans les 24 heures [\[1\]](https://capgo.app/), cette solution se démarque par son efficacité.

Voici quelques caractéristiques remarquables :

-   **Workflows automatisés** : En configurant les workflows directement dans GitHub Actions, il n'y a pas besoin d'hébergement CI/CD externe. Cette approche réduit les coûts opérationnels, économisant environ 26 100 $ sur cinq ans par rapport aux alternatives comme AppFlow [\[1\]](https://capgo.app/).
-   **Déploiement rapide** : Les mises à jour peuvent être poussées instantanément, contournant les délais des app stores.
-   **Sécurité renforcée** : Le chiffrement de bout en bout garantit que les mises à jour sont livrées en toute sécurité, tandis que le système de canaux de Capgo permet des déploiements contrôlés et progressifs.

Ces fonctionnalités ouvrent la voie à des solutions plus personnalisées et à de meilleures performances, explorées plus en détail ci-dessous.

### Stratégies avancées

Pour tirer le meilleur parti de votre intégration Capgo et GitHub Actions, explorez ces tactiques avancées :

-   **Workflows d'API personnalisés** : Utilisez l'API publique de Capgo pour concevoir des workflows de déploiement adaptés aux besoins spécifiques de votre équipe. Cela permet des expériences en marque blanche et une intégration transparente avec vos outils actuels [\[1\]](https://capgo.app/).
-   **[Versions basées sur les canaux](https://capgo.app/docs/webapp/channels/)** : Optimisez votre processus de déploiement en utilisant les fonctionnalités de canaux de Capgo pour des mises à jour par étapes et contrôlées.
-   **Performance optimisée** : Utilisez les mises à jour partielles de Capgo pour réduire l'utilisation de la bande passante et accélérer les mises à jour. Avec 23,5 millions de mises à jour livrées sur 750 applications en production [\[1\]](https://capgo.app/), le système a prouvé sa capacité à gérer des demandes à grande échelle.

Pour de meilleurs résultats, envisagez d'utiliser les options d'auto-hébergement de Capgo ou des configurations d'API personnalisées. Consultez les sections précédentes pour des instructions détaillées de configuration et de test afin de mettre pleinement en œuvre ces stratégies.
