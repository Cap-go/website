---
slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Cómo Rapido Cloud gestiona Semantic Release con Capgo CapacitorUpdater
description: >-
  Configuración de lanzamientos semánticos para administrar la versión de la
  aplicación usando CapGo CapacitorUpdater
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: Étude de cas rapido cloud
keywords: >-
  semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Case Study
published: true
locale: fr
next_blog: ''
---

## 1 Introduction

Chez Rapido Cloud (wwwrapidocloud), je développe une application mobile pour les clients Salesforce afin qu'ils puissent déployer facilement leur propre application mobile personnalisée sans avoir à passer par les boucles difficiles de l'utilisation du SDK Mobile Salesforce ou du Mobile Publisher Salesforce.

J'ai développé cette application mobile sur une plateforme moderne et "standard" avec des composants et des outils répandus notamment Ionic 8, Angular 18, TypeScript, Capacitor et maintenant CapGo CapacitorUpdater. Ces outils sont plus simples à gérer pour les clients qui ne veulent pas gérer les spécificités de la plateforme Salesforce comme les Lightning Web Components ; et c'est plus facile et moins cher pour moi de recruter des développeurs et des mainteneurs d'applications mobiles Ionic + Angular.

Cet article explique ma conception, mes choix et l'implémentation qui font de CapGo et `semantic-release` une solution évidente et très efficace pour gérer tous les déploiements automatiquement via Github Actions. Tout cela a été conçu, testé et documenté pendant la belle période d'essai gratuite de 14 jours de CapGo CapacitorUpdater.

## 2 Pourquoi utiliser CapGo ? Pourquoi utiliser semantic-release ?
CapGo CapacitorUpdater m'a attiré avec sa promesse de rendre les déploiements d'applications mobiles beaucoup plus simples, plus rapides et plus flexibles que le processus de livraison standard via l'Apple AppStore/Google PlayStore.
C'est ma première application mobile que je pousse vers les stores, m'étant concentré dans le passé sur les applications web, généralement développées sur Salesforce Experience Cloud.

J'étais plutôt effrayé par la courbe d'apprentissage pour réussir mais j'ai réussi à mettre mon application sur Apple TestFlight assez facilement. J'étais alors en position d'utiliser CapGo CapacitorUpdater pour déployer mes mises à jour beaucoup plus rapidement.

Mon premier besoin et cas de test était de déployer pour moi-même afin de tester mon application comme une vraie application mobile sur mon propre téléphone, au lieu de tester dans un émulateur mobile ou dans un simulateur via le navigateur mobile Nexus suggéré par Ionic. C'est parce que mon application utilise des fonctionnalités natives comme la Géolocalisation ou l'accès à la Galerie Photo et à la Caméra. N'ayant pas l'expérience passée de tester une application mobile Capacitor, je n'étais pas sûr que tout allait fonctionner correctement : rien de mieux que de tester l'application réelle, dans des conditions réelles !

Ainsi CapGo CapacitorUpdater m'a aidé à mettre à jour mon application sur mon mobile, en direct, 1 minute après avoir sauvegardé une nouvelle fonctionnalité ou correction dans mon code source : tellement rassurant, et si flexible, et facile à mettre en place !

## 3 Mon modèle de branchement et de release, et comment semantic-release s'intègre

Maintenant que j'ai mon système de livraison vers les serveurs CapGo qui fonctionne correctement, je dois automatiser cela et l'intégrer dans mon pipeline CI/CD.

### Voici comment j'organise mon modèle de branchement et de release

Pour chaque application, qu'elle soit mobile, web ou Salesforce :
- **le développement** est effectué sur des branches `feature/` issues de `main`, et elles sont fusionnées dans `main` qui est la référence pour la plupart des branches de développement, en dehors de la maintenance et des fonctionnalités spécifiques pour les livraisons personnalisées (plus à ce sujet ci-dessous)
- **les déploiements sont déclenchés __depuis les branches de release__** qui peuvent être : `production`, branches de préversion (`alpha`, `beta`, `nightly`, etc) et aussi des branches spécifiques aux clients ou au contexte pour les livraisons personnalisées
- **les déploiements sont déclenchés par une pull request** qui est fusionnée dans une branche de déploiement. Je n'utilise pas les déploiements déclenchés par tag car semantic-release gère les tags et tout le reste pour moi

En gros, c'est le Gitlab Flow :

![Gitlab Flow](/RBW_Gitlab_Flowwebp)

*Gitlab Flow - source https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Une note sur le fonctionnement de semantic-release :

Dans une branche de déploiement, lorsque semantic-release est déclenché, il calculera automatiquement le nouveau numéro de version sur cette branche, en fonction du numéro de version du tag précédent sur la branche et des corrections ou fonctionnalités livrées. Les corrections créeront une nouvelle version patch, tandis que les fonctionnalités créeront une nouvelle version mineure. Il inclut également automatiquement la préversion `alpha`, `beta`, etc dans le numéro de version.