---
slug: creating-and-deleting-update-channels-in-capacitor
title: Créer et supprimer des canaux de mise à jour dans Capacitor
description: >-
  Apprenez à créer, gérer et supprimer des canaux de mise à jour dans Capacitor
  pour des mises à jour d'application simplifiées et une meilleure expérience
  utilisateur.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-21T03:02:38.679Z
updated_at: 2026-01-15T19:03:50.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67dcb1f883b63ee70fa08665-1742526177947.jpg
head_image_alt: Développement Mobile
keywords: >-
  Capacitor, update channels, app updates, development, mobile, CI/CD, user
  management, version control
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) [les canaux de mise à jour](https://capgo.app/docs/webapp/channels/) vous permettent d'envoyer des mises à jour par air (OTA) à des groupes d'utilisateurs spécifiques. Cela aide à gérer plusieurs versions de l'application, à tester de nouvelles fonctionnalités et à déployer les mises à jour progressivement. Voici ce que vous devez savoir :

-   **Avantages** :

    -   Tester des mises à jour avec des groupes plus petits (par ex., utilisateurs beta).
    -   Envoyer des corrections critiques sans attendre l'approbation de l'App Store.
    -   Revenir instantanément sur des mises à jour problématiques.
-   **Configuration** :

    -   Utilisez des outils comme Capacitor CLI, [Node.js](https://nodejs.org/en), et [Capgo](https://capgo.app/) CLI.
    -   Assignez des rôles (Admin, Développeur, Spectateur) pour gérer les autorisations.
    -   Intégrez-vous avec des outils CI/CD pour des flux de travail automatisés.
-   **Gestion des Canaux** :

    -   Créez des canaux pour les environnements (par ex., production, beta, staging).
    -   Nommez les canaux de manière claire (par ex., `prod`, `beta-internal`, `v2-hotfix`).
    -   Testez les mises à jour par phases avant de les promouvoir en production.
-   **Suppression des Canaux** :

    -   Identifiez les canaux inutilisés via les analyses.
    -   Migrez en toute sécurité les utilisateurs, archivez les données et vérifiez les dépendances avant la suppression.

Capgo simplifie ce processus avec des outils tels que des analyses en temps réel, la gestion des utilisateurs et des options de retour en arrière. Avec une configuration et une maintenance appropriées des canaux, vous pouvez déployer des mises à jour plus rapidement et de manière plus fiable.

## Déploiement Continu & Mises à Jour en Direct avec Ionic Deploy

<iframe src="https://www.youtube.com/embed/I7PC3O4q1ug" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Exigences de Configuration

Pour gérer efficacement les canaux de mise à jour, vous devrez installer des outils spécifiques et configurer les autorisations. Voici ce dont vous avez besoin pour commencer.

### Outils Nécessaires

Assurez-vous d'avoir ce qui suit :

-   **Capacitor CLI** : C'est l'outil principal pour gérer les mises à jour de l'application.
-   **Node.js** : La version 14.0 ou supérieure est requise.
-   **[Capgo CLI](https://capgo.app/docs/cli/commands)** : Utilisé pour configurer et gérer les canaux de mise à jour.
-   **Environnement de Développement** : Choisissez un IDE qui supporte Capacitor.

Pour initialiser Capgo CLI, exécutez cette commande :

```bash
npx @capgo/cli init
```

Cela configure votre projet avec les fichiers de configuration nécessaires et le connecte au [service de mise à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) de Capgo.

### Configuration des Accès et des Autorisations

Configurez les autorisations pour une gestion des canaux sécurisée et efficace :

| **Niveau d'Autorisation** | **Droits d'Accès** | **Objectif** |
| --- | --- | --- |
| Admin | Accès complet | Créer, supprimer et gérer les canaux |
| Développeur | Accès limité | Déployer et tester les mises à jour |
| Spectateur | Lecture seule | Surveiller les statuts des mises à jour |

Assignez des rôles à votre équipe en fonction de leurs responsabilités. Capgo fonctionne sans problème avec Capacitor 8, garantissant qu'il s'adapte à divers besoins de projet.

Pour plus de commodité, Capgo s'intègre avec des outils CI/CD populaires comme [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/), et [Jenkins](https://www.jenkins.io/). Assurez-vous simplement que votre système de construction est prêt à gérer la gestion des canaux de mise à jour.

## Configuration des Canaux de Mise à Jour

Voici comment vous pouvez créer et gérer efficacement les canaux de mise à jour. Ce guide couvre la création de canaux, la configuration et des pratiques de nommage utiles.

### Création d'un Nouveau Canal

Pour configurer un canal à l'aide de Capgo CLI, suivez ces étapes :

1.  **Initialiser le Canal** : Ouvrez votre terminal et exécutez la commande suivante :
    
    ```bash
    npx @capgo/cli channel create
    ```
    
2.  **Configurer les Paramètres de Base** : Configurez le canal avec des détails tels que le nom et la version :
    
    ```bash
    npx @capgo/cli channel config --name="beta-testing" --version="1.0.0"
    ```
    
3.  **Confirmer le Canal** : Vérifiez que votre canal a été créé avec succès :
    
    ```bash
    npx @capgo/cli channel list
    ```
    

### Paramètres du Canal

Lors de la configuration de votre canal, assurez-vous de vous concentrer sur ces paramètres clés :

| Paramètre | Objectif | Valeur Exemplaire |
| --- | --- | --- |
| **Nom du Canal** | Identifie le flux de mise à jour | prod, beta, staging |
| **Modèle de Version** | Précise le format de version autorisé | 1.0.\* |
| **Accès Utilisateur** | Détermine qui reçoit les mises à jour | specific-group-id |
| **Fréquence de Mise à Jour** | Détermine quand les mises à jour sont distribuées | immédiat, programmé |

Ces paramètres vous aident à contrôler la manière dont les mises à jour sont distribuées et qui les reçoit.

### Conseils de Nommage et de Structure

Une convention de nommage claire garantit que vos canaux restent organisés et faciles à gérer. Voici quelques suggestions :

-   **Noms Basés sur l'Environnement**
    
    -   `prod` - Pour les versions de production
    -   `beta-internal` - Pour les tests internes
    -   `staging-qa` - Pour les tests d'assurance qualité
-   **Canaux Spécifiques à une Version**
    
    -   `v2-rollout` - Pour les versions 2.0
    -   `v2-hotfix` - Pour les corrections urgentes
    -   `v2-beta` - Pour les tests beta
-   **Canaux Axés sur les Fonctionnalités**
    
    -   `feature-payment` - Mises à jour pour le système de paiement
    -   `feature-auth` - Mises à jour pour l'authentification
    -   `feature-ui` - Mises à jour liées à l'interface

Utiliser ces modèles de nommage facilite l'identification et la gestion de vos flux de mise à jour.

## Gestion des Mises à Jour des Canaux

Gérer efficacement les mises à jour des canaux garantit des déploiements fluides et fiables. Cette étape s'appuie sur les anciens processus de création de canaux, en se concentrant sur le perfectionnement de la manière dont les mises à jour sont déployées. Capgo offre des outils tels que des attributions d'utilisateurs ciblés et une promotion basée sur des analyses pour rationaliser ce processus.

### Attribution des Mises à Jour

Attribuez des mises à jour à des groupes d'utilisateurs spécifiques en utilisant un flux de travail clair :

-   **Canal de Développement** : Utilisez ce canal pour des tests isolés et des corrections de bugs. Surveillez les impacts sur les performances et assurez-vous que les problèmes sont résolus.
-   **Canal Beta** : Déployez des mises à jour ici pour des tests contrôlés et recueillir les retours des utilisateurs. Validez comment les mises à jour se comportent dans des conditions d'utilisation réelles.
-   **Canal de Production** : Une fois les mises à jour stables, promouvez-les vers le canal de production pour tous les utilisateurs.

Après avoir attribué les mises à jour, effectuez des tests approfondis pour confirmer leur préparation.

### Test des Mises à Jour

Capgo fournit des outils pour effectuer des tests détaillés :

| **Phase de Test** | **Objectif** | **Caractéristiques Clés** |
| --- | --- | --- |
| Vérification Initiale | Vérifier la fonctionnalité de base | Test PR via le sélecteur de canal |
| Test Beta | Valider l'utilisation dans le monde réel | Gérer les utilisateurs avec des autorisations granulaires |
| Surveillance des Performances | Évaluer la stabilité des mises à jour | Utiliser des analyses détaillées et le suivi d'erreurs |

### Déplacer les Mises à Jour entre les Canaux

Transitionnez les mises à jour entre les canaux avec soin pour maintenir la stabilité. Capgo simplifie ce processus avec des mesures de sécurité intégrées.

Points clés à considérer :

-   **Contrôle de Version** : Suivez une nomenclature claire à travers les canaux.
-   **Options de Retour Arrière** : Capgo propose une fonctionnalité de retour arrière en un clic pour une résolution rapide des problèmes.
-   **Examen des Analyses** : Passez toujours en revue les données de performance avant de promouvoir une mise à jour vers le canal suivant.

> "Retour instantané si quelque chose ne va pas" - Capgo [\[1\]](https://capgo.app/)

## Suppression des Canaux de Mise à Jour

Il est important de savoir comment et quand supprimer des canaux de mise à jour inutilisés. Maintenir la structure de vos canaux propre garantit que votre application reste stable et facilite la gestion des mises à jour.

### Trouver les Canaux Inutilisés

Pour repérer les canaux inactifs, utilisez le [tableau de bord d'analyses de Capgo](https://capgo.app/docs/webapp/) pour analyser les modèles d'utilisation. Concentrez-vous sur les canaux qui remplissent ces critères :

-   Pas d'utilisateurs actifs au cours des 30 derniers jours
-   Aucune mise à jour récente déployée
-   Phases de tests beta entièrement complétées
-   Canaux temporaires utilisés pour des tests ou anciennes fonctionnalités marquées comme inutiles

Les analyses en temps réel de Capgo facilitent l'identification des canaux qui ne sont plus nécessaires.

### Étapes de Suppression des Canaux

Pour supprimer un canal de mise à jour en toute sécurité, suivez ces étapes :

| Étape | Action | Vérification |
| --- | --- | --- |
| **Migration des Utilisateurs** | Déplacez tous les utilisateurs actifs vers d'autres canaux | Confirmez qu'aucun utilisateur ne reste |
| **Archivage des Mises à Jour** | Archivez l'historique du canal | Vérifiez que l'archive est complète |
| **Vérification des Dépendances** | Assurez-vous qu'aucun script ou flux de travail ne dépend du canal | Confirmez qu'il n'y a aucune référence active |
| **Exécution de la Suppression** | Exécutez la commande de suppression du canal | Vérifiez que le canal est supprimé |

Une fois ces étapes terminées, vérifiez le système pour confirmer que tout fonctionne correctement.

### Vérification de l'Impact de la Suppression

Avant de finaliser la suppression, considérez ces points :

1.  **Évaluation de l'Historique des Mises à Jour**  
    Passez en revue l'historique des mises à jour du canal pour vous assurer que toutes les données importantes, comme les statistiques de performance ou les retours des utilisateurs, ont été sauvegardées.
    
2.  **Dépendances**  
    Vérifiez une dernière fois qu'aucun pipeline CI/CD ou script ne référence encore le canal.
    

Après la suppression, surveillez la performance du système. Si des problèmes surviennent, la fonctionnalité de retour arrière de Capgo peut vous aider à les résoudre rapidement.

## [Les Caractéristiques de Capgo](https://capgo.app/) pour les Mises à Jour

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-21.jpg?auto=compress)

### Fonctions Principales de Capgo

Capgo simplifie la gestion des canaux de mise à jour avec des fonctionnalités adaptées aux projets Capacitor. Son système de canaux vous permet de cibler des groupes d'utilisateurs spécifiques avec des mises à jour qui correspondent à leurs besoins. De plus, Capgo fournit aux développeurs des outils pour accélérer le déploiement et améliorer les flux de travail.

### Outils pour Développeurs

Capgo propose une gamme d'outils pour faciliter les mises à jour et s'assurer que tout reste conforme. Avec son outil CLI, vous pouvez déployer des mises à jour avec une seule commande, économisant ainsi du temps et des efforts.

Voici quelques caractéristiques remarquables pour les développeurs :

| Caractéristique | Ce qu'elle fait | Comment elle aide |
| --- | --- | --- |
| Sélecteur de Canal | Tester les demandes de tirage directement dans l'application | Accélère les retours |
| Gestion des Utilisateurs | Gérer les autorisations à un niveau détaillé | Meilleur contrôle sur les testeurs |
| Tableau de Bord d'Analyses | Surveiller les mises à jour en temps réel | Suivi des performances facilement |
| Capacité de Retour Arrière | Résoudre rapidement les problèmes | Maintient l'application stable |

Ces outils s'intègrent parfaitement avec le processus d'installation facile de Capgo, qui est décrit ci-dessous.

### Guide d'Installation de Capgo

Commencer avec Capgo est simple et rapide. Suivez simplement ces trois étapes :

1.  **Configurer l'authentification :** Activez le cryptage de bout en bout pour sécuriser les mises à jour.
2.  **Définir la structure des canaux :** Mettez en place des canaux en fonction de vos besoins de déploiement.
3.  **Définir les autorisations des utilisateurs :** Attribuez des droits d'accès spécifiques aux membres de l'équipe.

> "@Capgo est un outil indispensable pour les développeurs, qui souhaitent être plus productifs. Éviter la révision pour corriger les bogues est un atout." - Bessie Cooper [\[1\]](https://capgo.app/)

Capgo prend en charge plus de 30 plugins et fonctionne parfaitement avec les pipelines CI/CD, ce qui facilite son intégration dans votre processus de développement existant. Il améliore [la gestion des mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) tout en gardant tout efficace et simple.

## Résumé

### Points principaux

Gérer les canaux de manière efficace garantit que les déploiements d'applications se déroulent sans accroc. Le système de canaux de Capgo présente des résultats impressionnants : **95 % des mises à jour sont adoptées dans les 24 heures**, soutenues par un CDN mondial qui livre un bundle de 5 Mo en seulement 114 ms, avec un temps de réponse API de 434 ms à l'échelle mondiale [\[1\]](https://capgo.app/).

| Métrique | Performance |
| --- | --- |
| Mises à jour totales livrées | 23,5 M |
| Applications de production actives | 750 |
| Taux de succès global | 82 % |
| Adoption des mises à jour (24 h) | 95 % |

Atteindre ces résultats repose sur des conventions de nommage claires et des attributions d'utilisateurs précises, comme discuté précédemment. Construire une stratégie de canal structurée autour de ces métriques peut encore améliorer les performances.

### Pour commencer

Pour profiter de ces résultats prouvés, commencez par affiner la configuration de votre canal :

-   **Définir une structure de canal claire :** Séparer les canaux pour les environnements de développement, de staging et de production.
-   **Configurer les autorisations des utilisateurs :** Attribuer des contrôles d'accès granulaires pour les canaux de mise à jour.
-   **Suivre la performance :** Surveiller régulièrement les taux de succès des mises à jour et l'engagement des utilisateurs.

N'oubliez pas de revoir périodiquement et de supprimer les canaux inactifs pour maintenir un flux de travail efficace. Avec des canaux bien gérés, les développeurs peuvent déployer des mises à jour plus rapidement tout en conservant le contrôle et la stabilité.
