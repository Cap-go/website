---
slug: guide-configuration-pipeline-cicd-capacitor
title: Panduan Konfigurasi Pipeline CI/CD Capacitor
description: >-
  Otomatiskan proses kompilasi, pengujian, dan penerapan aplikasi Capacitor Anda
  dengan pipeline CI/CD untuk pembaruan yang lebih cepat dan efisiensi yang
  lebih baik.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-23T00:48:58.202Z
updated_at: 2025-04-23T00:49:09.370Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68082f5bfe5cbf0502dd901c-1745369349370.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  Capacitor, CI/CD, pipeline setup, app updates, Capgo, deployment automation,
  mobile development
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
**Vous voulez des [mises à jour d'applications](https://capgo.app/plugins/capacitor-updater/) plus rapides avec un minimum d'effort ?** La mise en place d'un pipeline CI/CD pour votre application [Capacitor](https://capacitorjs.com/) automatise la construction, les tests et le déploiement, permettant de gagner du temps et de réduire les erreurs. Voici ce que vous obtiendrez :

-   **Mises à jour en direct** : Publiez des mises à jour instantanément sans délais d'App Store. 95% des utilisateurs reçoivent les mises à jour en 24 heures.
-   **Essentiels du Pipeline** : Automatisez les builds déclenchés par l'activité des branches (`main`, `staging`, `feature/*`) et définissez des environnements distincts pour le staging et la production.
-   **Intégration [Capgo](https://capgo.app/)** : Utilisez Capgo pour déployer des mises à jour sécurisées et cryptées, gérer les [canaux de mise à jour](https://capgo.app/docs/webapp/channels/) et surveiller les performances.
-   **Plans abordables** : Les plans commencent à 12$/mois pour les mises à jour en direct et l'analytique.

Les pipelines CI/CD de Capacitor simplifient les flux de travail, améliorent l'efficacité et garantissent que votre application reste à jour sans effort. Plongeons dans les détails.

## Prérequis d'installation

### Conditions préalables

Assurez-vous d'avoir installé et configuré les éléments suivants :

-   **[Node.js](https://nodejs.org/en) LTS**, **Capacitor CLI** et **Git**
-   Un compte sur votre plateforme CI préférée (comme [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/) ou [Jenkins](https://www.jenkins.io/))
-   Un **compte Capgo** pour gérer les mises à jour en direct

Une fois ces éléments prêts, passez à la définition de vos déclencheurs et étapes de build dans votre plateforme CI.

## Intégrer Appflow à votre Pipeline CICD

<iframe src="https://www.youtube.com/embed/CakTj3A3wbM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Étapes de configuration du pipeline

Maintenant que vous avez géré les prérequis, il est temps de configurer les déclencheurs et les paramètres d'environnement de votre pipeline.

### Déclencheurs et étapes de build

Configurez votre pipeline CI/CD pour déclencher automatiquement des builds en fonction de l'activité spécifique des branches. Voici comment le configurer :

-   **Déclencheurs de branches** :
    
    -   Utilisez `main` pour les builds de production.
    -   Utilisez `staging` pour les tests.
    -   Utilisez `feature/*` pour le développement.
-   **Étapes de build** :
    
    -   Installez toutes les dépendances nécessaires.
    -   Exécutez les tests unitaires pour assurer la qualité du code.
    -   Construisez les assets web pour l'application.
    -   Générez les binaires natifs pour les plateformes mobiles ou desktop.
    -   Déployez le build dans votre environnement de test pour validation.

### Paramètres d'environnement

Définissez des fichiers de configuration d'environnement séparés pour le staging et la production pour garder les choses organisées et sécurisées. Voici un exemple de configuration :

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

Pour les données sensibles comme les clés API et les certificats, assurez-vous de les stocker en toute sécurité dans le système de gestion des secrets de votre plateforme CI. Cela garantit que votre pipeline reste à la fois fonctionnel et sécurisé.

## Guide d'intégration [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/68082f5bfe5cbf0502dd901c/95506b8280be0626e7b237b754ba8f1b.jpg)

Une fois que vous avez configuré vos étapes de build et de déploiement, il est temps d'intégrer Capgo. Cela vous permet de pousser des mises à jour en direct directement dans votre application, en contournant les délais d'approbation des app stores.

### Étapes de configuration de Capgo

Après avoir préparé votre pipeline CI/CD, suivez ces étapes pour ajouter Capgo à votre projet :

Tout d'abord, installez le [CLI Capgo](https://capgo.app/docs/cli/commands) :

```bash
npx @capgo/cli init
```

Puis, procédez avec ces commandes :

-   **Construire votre app** : `npm install && npm run build`
-   **Déployer les mises à jour** : `npx @capgo/cli deploy`
-   **Annuler les mises à jour** : `npx @capgo/cli rollback`

Voici un exemple de job GitHub Actions pour déployer des mises à jour :

```yaml
- name: Deploy to Capgo
  run: |
    npm install @capgo/cli
    npx @capgo/cli deploy
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Fonctionnalités clés de Capgo

Capgo apporte plusieurs avantages aux applications Capacitor, notamment :

-   **Mises à jour sécurisées et efficaces** : Les mises à jour différentielles cryptées réduisent la taille des charges utiles tout en assurant une livraison sécurisée.
-   **Gestion des canaux** : Créez des canaux de staging et de production pour contrôler le déploiement des mises à jour.
-   **Tableau de bord analytique** : Suivez les taux de réussite des mises à jour et surveillez l'adoption des utilisateurs avec des insights détaillés.

### Plans et tarifs Capgo

Capgo propose des plans flexibles pour répondre à différents besoins :

-   **SOLO** : 12$/mois (1 000 MAU, 2 Go de stockage, 50 Go de bande passante)
-   **MAKER** : 33$/mois (10 000 MAU, 5 Go de stockage, 500 Go de bande passante)
-   **TEAM** : 83$/mois (100 000 MAU, 10 Go de stockage, 2 000 Go de bande passante)
-   **PAYG** : À partir de 249$/mois, avec des options pour la mise à l'échelle personnalisée, l'accès API et les domaines personnalisés.

Actuellement, Capgo prend en charge plus de 1 900 applications en production, ce qui en fait un choix fiable pour le déploiement continu [\[1\]](https://capgo.app/).

## Gestion du pipeline

### Suivi du statut

Garder un œil attentif sur votre pipeline est essentiel pour maintenir la qualité de l'application et satisfaire les utilisateurs. Utilisez votre plateforme CI/CD pour configurer des alertes automatisées pour :

-   **État des builds et progression du déploiement**
-   **Taux de réussite des mises à jour**
-   **Métriques d'adoption des utilisateurs**
-   **Rapports d'erreurs et logs de crash**

Associez ces alertes à une documentation claire pour assurer une surveillance fluide et une résolution rapide des problèmes.

### Guide de documentation

Une bonne documentation maintient votre équipe sur la même longueur d'onde et vos opérations fluides. Assurez-vous que votre documentation couvre :

-   **Configuration du pipeline** : Détails comme les déclencheurs de build, les variables d'environnement et les paramètres de sécurité.
-   **Procédures de mise à jour** : Étapes pour les déploiements, instructions de rollback et [gestion des canaux de mise à jour](https://capgo.app/docs/webapp/channels/).
-   **Configuration de la surveillance** : Comment configurer les alertes, suivre les métriques et répondre aux problèmes.
-   **Directives de conformité** : Règles spécifiques aux plateformes, restrictions de mise à jour et autres exigences.

Stockez toute la documentation dans le contrôle de version et mettez-la à jour à chaque modification du pipeline. Incluez des étapes de dépannage pour les erreurs courantes pour gagner du temps en cas de problèmes.

### Directives des plateformes

Suivez les politiques de mise à jour Apple et Android en utilisant le système de canaux de Capgo pour assurer des déploiements fluides et conformes :

-   **Tests bêta** : [Publiez des mises à jour pour de petits groupes d'utilisateurs](https://capgo.app/blog/how-to-send-specific-version-to-users/) pour valider les changements.
-   **Déploiements progressifs** : Déployez les mises à jour graduellement pour détecter les problèmes tôt.
-   **Correctifs d'urgence** : Annulez rapidement les mises à jour d'un simple clic en cas de problème.

## Résumé

### Aperçu des étapes d'installation

Pour commencer, vous devrez installer le CLI, configurer les builds et les variables d'environnement, sécuriser vos secrets, activer la surveillance et déployer les mises à jour. Ce processus s'intègre parfaitement avec les outils de surveillance et de rollback, garantissant que votre application reste en ligne avec un minimum de temps d'arrêt.

### Avantages du CI/CD

Le lien entre l'installation et les résultats montre comment Capgo améliore l'efficacité : les mises à jour atteignent **95% des utilisateurs en seulement 24 heures**. De plus, les tarifs de Capgo - allant de **12$/mois à 83$/mois** - offrent un énorme avantage en termes de coûts par rapport aux services traditionnels qui peuvent facturer plus de **500$/mois**. Actuellement, Capgo prend en charge plus de **1 900 applications en production** [\[1\]](https://capgo.app/).
