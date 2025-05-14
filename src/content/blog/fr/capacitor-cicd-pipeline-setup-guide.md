---
slug: capacitor-cicd-pipeline-setup-guide
title: Guide de configuration du pipeline CI/CD de Capacitor
description: >-
  Automatisez le processus de construction, de test et de déploiement de votre
  application Capacitor avec un pipeline CI/CD pour des mises à jour plus
  rapides et une efficacité améliorée.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-23T00:48:58.202Z
updated_at: 2025-04-23T00:49:09.370Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68082f5bfe5cbf0502dd901c-1745369349370.jpg
head_image_alt: Développement mobile
keywords: >-
  Capacitor, CI/CD, pipeline setup, app updates, Capgo, deployment automation,
  mobile development
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
**Vous voulez des [mises à jour d'application](https://capgo.app/plugins/capacitor-updater/) plus rapides avec un effort minimal ?** Mettre en place un pipeline CI/CD pour votre application [Capacitor](https://capacitorjs.com/) automatise la construction, les tests et le déploiement, ce qui vous fait gagner du temps et réduit les erreurs. Voici ce que vous allez réaliser :

-   **Mises à jour en direct** : Poussez des mises à jour instantanément sans délais d'App Store. 95 % des utilisateurs reçoivent les mises à jour en 24 heures.
-   **Essentiels du pipeline** : Automatisez les constructions déclenchées par l'activité des branches (`main`, `staging`, `feature/*`) et définissez des environnements séparés pour staging et production.
-   **Intégration de [Capgo](https://capgo.app/)** : Utilisez Capgo pour déployer des mises à jour sécurisées et cryptées, gérer les [canaux de mise à jour](https://capgo.app/docs/webapp/channels/) et surveiller les performances.
-   **Plans abordables** : Les plans commencent à 12 $/mois pour les mises à jour en direct et l'analyse.

Les pipelines CI/CD de Capacitor simplifient les flux de travail, améliorent l'efficacité et garantissent que votre application reste à jour sans effort. Plongeons dans les détails.

## Exigences de configuration

### Prérequis

Assurez-vous d'avoir les éléments suivants installés et configurés :

-   **[Node.js](https://nodejs.org/en) LTS**, **Capacitor CLI** et **Git**
-   Un compte sur votre plateforme CI préférée (comme [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/), ou [Jenkins](https://www.jenkins.io/))
-   Un **compte Capgo** pour gérer les mises à jour en direct

Une fois tout cela prêt, définissez vos déclencheurs de construction et étapes au sein de votre plateforme CI.

## Intégrer Appflow avec votre pipeline CICD

<iframe src="https://www.youtube.com/embed/CakTj3A3wbM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Étapes de configuration du pipeline

Maintenant que vous avez géré les prérequis, il est temps de configurer les déclencheurs et les paramètres d'environnement de votre pipeline.

### Déclencheurs et étapes de construction

Configurez votre pipeline CI/CD pour déclencher automatiquement les constructions en fonction de l'activité de branches spécifiques. Voici comment le configurer :

-   **Déclencheurs de branche** :
    
    -   Utilisez `main` pour les constructions de production.
    -   Utilisez `staging` à des fins de test.
    -   Utilisez `feature/*` pour le développement.
-   **Étapes de construction** :
    
    -   Installez toutes les dépendances nécessaires.
    -   Exécutez des tests unitaires pour garantir la qualité du code.
    -   Construisez des actifs web pour l'application.
    -   Générez des binaires natifs pour les plateformes mobiles ou de bureau.
    -   Déployez la construction dans votre environnement de test pour validation supplémentaire.

### Paramètres de l'environnement

Définissez des fichiers de configuration d'environnement séparés pour staging et production afin de garder les choses organisées et sécurisées. Voici un exemple de configuration :

```yaml
# staging.env
ENVIRONMENT=staging
API_ENDPOINT=https://api-staging.example.com
LIVE_UPDATES_ENABLED=true

# production.env
ENVIRONMENT=production
API_ENDPOINT=https://api.example.com
LIVE_UPDATES_ENABLED=true
```

Pour les données sensibles comme les clés API et les certificats, assurez-vous de les stocker de manière sécurisée dans le système de gestion des secrets de votre plateforme CI. Cela garantit que votre pipeline reste fonctionnel et sécurisé.

## Guide d'intégration de [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/68082f5bfe5cbf0502dd901c/95506b8280be0626e7b237b754ba8f1b.jpg)

Une fois que vous avez configuré vos étapes de construction et de déploiement, il est temps d'intégrer Capgo. Cela vous permet de pousser des mises à jour en direct directement dans votre application, contournant les délais d'approbation de l'App Store.

### Étapes de configuration de Capgo

Après avoir préparé votre pipeline CI/CD, suivez ces étapes pour ajouter Capgo à votre projet :

Tout d'abord, installez le [Capgo CLI](https://capgo.app/docs/cli/commands) :

```bash
npx @capgo/cli init
```

Ensuite, procédez avec ces commandes :

-   **Construire votre application** : `npm install && npm run build`
-   **Déployer des mises à jour** : `npx @capgo/cli deploy`
-   **Annuler des mises à jour** : `npx @capgo/cli rollback`

Voici un exemple d'un job GitHub Actions pour déployer des mises à jour :

```yaml
- name: Deploy to Capgo
  run: |
    npm install @capgo/cli
    npx @capgo/cli deploy
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Caractéristiques clés de Capgo

Capgo apporte plusieurs avantages aux applications Capacitor, notamment :

-   **Mises à jour sécurisées et efficaces** : Des mises à jour cryptées et différentielles réduisent la taille des charges utiles tout en garantissant une livraison sécurisée.
-   **Gestion des canaux** : Créez des canaux de staging et de production pour contrôler la manière dont les mises à jour sont déployées.
-   **Tableau de bord d'analyse** : Suivez les taux de succès des mises à jour et surveillez l'adoption par les utilisateurs avec des informations détaillées.

### Plans et tarifs de Capgo

Capgo propose des plans flexibles pour répondre à différents besoins :

-   **SOLO** : 12 $/mois (1 000 MAU, 2 Go de stockage, 50 Go de bande passante)
-   **MAKER** : 33 $/mois (10 000 MAU, 5 Go de stockage, 500 Go de bande passante)
-   **TEAM** : 83 $/mois (100 000 MAU, 10 Go de stockage, 2 000 Go de bande passante)
-   **PAYG** : À partir de 249 $/mois, avec des options pour un scaling personnalisé, l'accès à l'API et des domaines personnalisés.

Actuellement, Capgo prend en charge plus de 1 900 applications en production, ce qui en fait un choix fiable pour le déploiement continu [\[1\]](https://capgo.app/).

## Gestion du pipeline

### Suivi de l'état

Garder un œil attentif sur votre pipeline est essentiel pour maintenir la qualité de l'application et garder les utilisateurs heureux. Utilisez votre plateforme CI/CD pour configurer des alertes automatisées pour :

-   **État de construction et progression du déploiement**
-   **Taux de succès des mises à jour**
-   **Métriques d'adoption des utilisateurs**
-   **Rapports d'erreurs et journaux de plantages**

Associez ces alertes à une documentation claire pour garantir une surveillance fluide et une résolution rapide des problèmes.

### Guide documentaire

Une bonne documentation permet à votre équipe de rester sur la même longueur d'onde et garantit le bon fonctionnement de vos opérations. Assurez-vous que votre documentation couvre :

-   **Configuration du pipeline** : Détails comme les déclencheurs de construction, les variables d'environnement et les paramètres de sécurité.
-   **Procédures de mise à jour** : Étapes de déploiement, instructions de retour en arrière et [gestion des canaux de mise à jour](https://capgo.app/docs/webapp/channels/).
-   **Configuration de la surveillance** : Comment configurer des alertes, suivre les métriques et répondre aux problèmes.
-   **Directives de conformité** : Règles spécifiques à la plateforme, restrictions de mise à jour et autres exigences.

Conservez toute la documentation dans un contrôle de version et mettez-la à jour chaque fois que votre pipeline change. Incluez des étapes de dépannage pour les erreurs courantes afin de gagner du temps lorsque des problèmes surviennent.

### Directives de la plateforme

Suivez les politiques de mise à jour d'Apple et d'Android en utilisant le système de canaux de Capgo pour garantir des déploiements fluides et conformes :

-   **Tests bêta** : [Publiez des mises à jour à de petits groupes d'utilisateurs](https://capgo.app/blog/how-to-send-specific-version-to-users/) pour valider les changements.
-   **Déploiements stagés** : Déployez les mises à jour progressivement pour détecter les problèmes tôt.
-   **Corrections d'urgence** : Restaurez rapidement les mises à jour d'un seul clic si quelque chose ne va pas.

## Résumé

### Aperçu des étapes de configuration

Pour commencer, vous devez installer le CLI, configurer les constructions et les variables d'environnement, sécuriser vos secrets, activer la surveillance et déployer des mises à jour. Ce processus s'intègre parfaitement avec les outils de surveillance et de retour en arrière, garantissant que votre application reste en ligne avec un temps d'arrêt minimal.

### Avantages de CI/CD

La connexion entre la configuration et les résultats montre comment Capgo améliore l'efficacité : les mises à jour atteignent **95 % des utilisateurs en seulement 24 heures**. De plus, les prix de Capgo - allant de **12 $/mois à 83 $/mois** - offrent un avantage de coût massif par rapport aux services traditionnels qui peuvent facturer plus de **500 $/mois**. Actuellement, Capgo prend en charge plus de **1 900 applications en production** [\[1\]](https://capgo.app/).
