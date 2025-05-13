---
slug: creation-et-suppression-de-canaux-de-mise-a-jour-dans-capacitor
title: Membuat dan Menghapus Saluran Pembaruan di Capacitor
description: >-
  Pelajari cara membuat, mengelola, dan menghapus kanal pembaruan di Capacitor
  untuk pembaruan aplikasi yang dioptimalkan dan pengalaman pengguna yang lebih
  baik.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-21T03:02:38.679Z
updated_at: 2025-03-21T03:02:57.947Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67dcb1f883b63ee70fa08665-1742526177947.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capacitor, update channels, app updates, development, mobile, CI/CD, user
  management, version control
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
Les [canaux de mise à jour](https://capgo.app/docs/webapp/channels/) de [Capacitor](https://capacitorjs.com/) vous permettent d'envoyer des mises à jour over-the-air (OTA) à des groupes d'utilisateurs spécifiques. Cela aide à gérer plusieurs versions d'applications, tester de nouvelles fonctionnalités et déployer progressivement les mises à jour. Voici ce que vous devez savoir :

-   **Avantages**:
    
    -   Testez les mises à jour avec des groupes restreints (ex: utilisateurs bêta).
    -   Envoyez des correctifs critiques sans attendre l'approbation de l'app store.
    -   Annulez instantanément les mises à jour problématiques.
-   **Configuration**:
    
    -   Utilisez des outils comme Capacitor CLI, [Node.js](https://nodejs.org/en) et le CLI [Capgo](https://capgo.app/).
    -   Attribuez des rôles (Admin, Développeur, Observateur) pour gérer les permissions.
    -   Intégrez avec des outils CI/CD pour des workflows automatisés.
-   **Gestion des canaux**:
    
    -   Créez des canaux pour les environnements (ex: production, bêta, staging).
    -   Nommez clairement les canaux (ex: `prod`, `beta-internal`, `v2-hotfix`).
    -   Testez les mises à jour par phases avant de les promouvoir en production.
-   **Suppression des canaux**:
    
    -   Identifiez les canaux inutilisés via les analyses.
    -   Migrez les utilisateurs en toute sécurité, archivez les données et vérifiez les dépendances avant la suppression.

Capgo simplifie ce processus avec des outils comme les analyses en temps réel, la gestion des utilisateurs et les options de restauration. Avec une configuration et une maintenance appropriées des canaux, vous pouvez déployer des mises à jour plus rapidement et de manière plus fiable.

## Déploiement continu & Mises à jour en direct avec Ionic Deploy

<iframe src="https://www.youtube.com/embed/I7PC3O4q1ug" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Prérequis de configuration

Pour gérer efficacement les canaux de mise à jour, vous devrez installer des outils spécifiques et configurer les permissions. Voici ce dont vous avez besoin pour commencer.

### Outils nécessaires

Assurez-vous d'avoir les éléments suivants :

-   **Capacitor CLI** : C'est l'outil principal pour gérer les mises à jour d'applications.
-   **Node.js** : Version 14.0 ou supérieure requise.
-   **[Capgo CLI](https://capgo.app/docs/cli/commands)** : Utilisé pour configurer et gérer les canaux de mise à jour.
-   **Environnement de développement** : Choisissez un IDE compatible avec Capacitor.

Pour initialiser Capgo CLI, exécutez cette commande :

```bash
npx @capgo/cli init
```

Cela configure votre projet avec les fichiers de configuration nécessaires et le connecte au [service de mise à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) de Capgo.

### Configuration des accès et permissions

Configurez les permissions pour une gestion sécurisée et efficace des canaux :

| **Niveau de permission** | **Droits d'accès** | **Objectif** |
| --- | --- | --- |
| Admin | Accès complet | Créer, supprimer et gérer les canaux |
| Développeur | Accès limité | Déployer et tester les mises à jour |
| Observateur | Lecture seule | Surveiller les statuts des mises à jour |

Attribuez les rôles à votre équipe selon leurs responsabilités. Capgo fonctionne parfaitement avec Capacitor 6 et 7, s'adaptant ainsi à divers besoins de projet.

Pour plus de commodité, Capgo s'intègre avec les outils CI/CD populaires comme [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/) et [Jenkins](https://www.jenkins.io/). Assurez-vous simplement que votre système de build est prêt à gérer les canaux de mise à jour.

## Configuration des canaux de mise à jour

Voici comment créer et gérer efficacement les canaux de mise à jour. Ce guide couvre la création de canaux, la configuration et les bonnes pratiques de nommage.

### Création d'un nouveau canal

Pour configurer un canal avec Capgo CLI, suivez ces étapes :

1.  **Initialiser le canal** : Ouvrez votre terminal et exécutez la commande suivante :
    
    ```bash
    npx @capgo/cli channel create
    ```
    
2.  **Configurer les paramètres de base** : Configurez le canal avec des détails comme le nom et la version :
    
    ```bash
    npx @capgo/cli channel config --name="beta-testing" --version="1.0.0"
    ```
    
3.  **Confirmer le canal** : Vérifiez que votre canal a été créé avec succès :
    
    ```bash
    npx @capgo/cli channel list
    ```
    

### Paramètres des canaux

Lors de la configuration de votre canal, concentrez-vous sur ces paramètres clés :

| Paramètre | Objectif | Exemple de valeur |
| --- | --- | --- |
| **Nom du canal** | Identifie le flux de mise à jour | prod, beta, staging |
| **Format de version** | Spécifie le format de version autorisé | 1.0.\* |
| **Accès utilisateur** | Détermine qui reçoit les mises à jour | specific-group-id |
| **Fréquence de mise à jour** | Définit quand les mises à jour sont distribuées | immédiate, programmée |

Ces paramètres vous aident à contrôler la distribution des mises à jour et leurs destinataires.

### Conseils de nommage et de structure

Une convention de nommage claire permet de garder vos canaux organisés et faciles à gérer. Voici quelques suggestions :

-   **Noms basés sur l'environnement**
    
    -   `prod` - Pour les versions de production
    -   `beta-internal` - Pour les tests internes
    -   `staging-qa` - Pour les tests d'assurance qualité
-   **Canaux spécifiques aux versions**
    
    -   `v2-rollout` - Pour les versions 2.0
    -   `v2-hotfix` - Pour les correctifs urgents
    -   `v2-beta` - Pour les tests bêta
-   **Canaux axés sur les fonctionnalités**
    
    -   `feature-payment` - Mises à jour du système de paiement
    -   `feature-auth` - Mises à jour de l'authentification
    -   `feature-ui` - Mises à jour de l'interface

L'utilisation de ces modèles de nommage facilite l'identification et la gestion de vos flux de mise à jour.

## Gestion des mises à jour des canaux

Une gestion efficace des mises à jour des canaux garantit des déploiements fluides et fiables. Cette étape s'appuie sur les processus précédents de création de canaux, en se concentrant sur l'amélioration du déploiement des mises à jour. Capgo propose des outils comme l'attribution ciblée des utilisateurs et la promotion basée sur les analyses pour simplifier ce processus.

### Attribution des mises à jour

Attribuez les mises à jour à des groupes d'utilisateurs spécifiques selon un workflow clair :

-   **Canal de développement** : Utilisez ce canal pour les tests isolés et les corrections de bugs. Surveillez l'impact sur les performances et assurez-vous que les problèmes sont résolus.
-   **Canal bêta** : Déployez les mises à jour ici pour des tests contrôlés et recueillir les retours utilisateurs. Validez comment les mises à jour se comportent en conditions réelles.
-   **Canal de production** : Une fois les mises à jour stables, promouvez-les vers le canal de production pour tous les utilisateurs.

Après l'attribution des mises à jour, effectuez des tests approfondis pour confirmer leur état de préparation.

### Test des mises à jour

Capgo fournit des outils pour effectuer des tests détaillés :

| **Phase de test** | **Objectif** | **Fonctionnalités clés** |
| --- | --- | --- |
| Vérification initiale | Vérifier les fonctionnalités de base | Test des PR via le sélecteur de canal |
| Tests bêta | Valider l'utilisation en conditions réelles | Gestion des utilisateurs avec permissions détaillées |
| Surveillance des performances | Évaluer la stabilité des mises à jour | Utilisation d'analyses détaillées et suivi des erreurs |

### Déplacement des mises à jour entre canaux

Effectuez la transition des mises à jour entre les canaux avec précaution pour maintenir la stabilité. Capgo simplifie ce processus avec des mesures de sécurité intégrées.

Points clés à considérer :

-   **Contrôle de version** : Gardez une trace claire des versions à travers les canaux.
-   **Options de restauration** : Capgo offre une fonction de restauration en un clic pour résoudre rapidement les problèmes.
-   **Revue des analyses** : Examinez toujours les données de performance avant de promouvoir une mise à jour vers le canal suivant.

> "Restauration instantanée en cas de problème" - Capgo [\[1\]](https://capgo.app/)

## Suppression des canaux de mise à jour

Il est important de savoir comment et quand supprimer les canaux de mise à jour inutilisés. Maintenir une structure de canaux propre assure la stabilité de votre application et facilite la gestion des mises à jour.

### Identification des canaux inutilisés

Pour repérer les canaux inactifs, utilisez le [tableau de bord d'analyse de Capgo](https://capgo.app/docs/webapp/) pour analyser les modèles d'utilisation. Concentrez-vous sur les canaux qui répondent à ces critères :

-   Aucun utilisateur actif au cours des 30 derniers jours
-   Aucune mise à jour récente déployée
-   Phases de test bêta entièrement terminées
-   Canaux temporaires utilisés pour les tests ou anciennes fonctionnalités marquées comme inutiles

Les analyses en temps réel de Capgo facilitent l'identification des canaux qui ne sont plus nécessaires.

### Étapes de suppression des canaux

Pour supprimer un canal de mise à jour en toute sécurité, suivez ces étapes :

| Étape | Action | Vérification |
| --- | --- | --- |
| **Migration des utilisateurs** | Déplacer tous les utilisateurs actifs vers d'autres canaux | Confirmer qu'il ne reste aucun utilisateur |
| **Archive des mises à jour** | Archiver l'historique du canal | Vérifier que l'archive est complète |
| **Vérification des dépendances** | S'assurer qu'aucun script ou workflow ne dépend du canal | Confirmer l'absence de références actives |
| **Exécution de la suppression** | Exécuter la commande de suppression du canal | Vérifier que le canal est supprimé |

Une fois ces étapes terminées, revérifiez le système pour confirmer que tout fonctionne correctement.

### Vérification de l'impact de la suppression

Avant de finaliser la suppression, considérez ces points :

1.  **Évaluation de l'historique des mises à jour**  
    Examinez l'historique des mises à jour du canal pour vous assurer que toutes les données importantes, comme les statistiques de performance ou les retours utilisateurs, ont été sauvegardées.
    
2.  **Dépendances**  
    Vérifiez doublement qu'aucun pipeline CI/CD ou script ne fait encore référence au canal.
    

Après la suppression, surveillez les performances du système. Si des problèmes surviennent, la fonction de restauration de Capgo peut vous aider à les résoudre rapidement.

## Fonctionnalités de [Capgo](https://capgo.app/) pour les mises à jour

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-21.jpg?auto=compress)

### Fonctions principales de Capgo

Capgo simplifie la gestion des canaux de mise à jour avec des fonctionnalités adaptées aux projets Capacitor. Son système de canaux vous permet de cibler des groupes d'utilisateurs spécifiques avec des mises à jour adaptées à leurs besoins. De plus, Capgo fournit aux développeurs des outils pour accélérer le déploiement et améliorer les workflows.

### Outils pour développeurs

Capgo propose une gamme d'outils pour faciliter les mises à jour et garantir la conformité. Avec son outil CLI, vous pouvez déployer des mises à jour en une seule commande, gagnant ainsi du temps et des efforts.

Voici quelques fonctionnalités remarquables pour les développeurs :

| Fonctionnalité | Ce qu'elle fait | Comment elle aide |
| --- | --- | --- |
| Sélecteur de canal | Tester les pull requests directement dans l'app | Accélère les retours |
| Gestion des utilisateurs | Gérer les permissions de manière détaillée | Meilleur contrôle des testeurs |
| Tableau de bord d'analyse | Surveiller les mises à jour en temps réel | Suivi facile des performances |
| Capacité de restauration | Corriger rapidement les problèmes | Maintient la stabilité de l'app |

Ces outils s'intègrent parfaitement au processus de configuration simple de Capgo, détaillé ci-dessous.

### Guide de configuration Capgo

La prise en main de Capgo est simple et rapide. Suivez simplement ces trois étapes :

1.  **Configurer l'authentification:** Activez le chiffrement de bout en bout pour sécuriser les mises à jour.
2.  **Définir la structure des canaux:** Configurez les canaux en fonction de vos besoins de déploiement.
3.  **Définir les permissions utilisateur:** Attribuez des droits d'accès spécifiques aux membres de l'équipe.

> "@Capgo est un outil indispensable pour les développeurs qui souhaitent être plus productifs. Éviter les révisions pour les corrections de bugs est inestimable." - Bessie Cooper [\[1\]](https://capgo.app/)

Capgo prend en charge plus de 30 plugins et fonctionne parfaitement avec les pipelines CI/CD, facilitant son intégration dans votre processus de développement existant. Il améliore la [gestion des mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) tout en maintenant tout efficace et simple.

## Résumé

### Points Principaux

La gestion efficace des canaux assure le bon déroulement des déploiements d'applications. Le système de canaux de Capgo montre des résultats impressionnants : **95% des mises à jour sont adoptées en 24 heures**, soutenu par un CDN mondial qui livre un bundle de 5MB en seulement 114ms, avec un temps de réponse API de 434ms dans le monde entier [\[1\]](https://capgo.app/).

| Métrique | Performance |
| --- | --- |
| Total des mises à jour livrées | 23.5M |
| Applications en production actives | 750 |
| Taux de réussite global | 82% |
| Adoption des mises à jour (24h) | 95% |

L'obtention de ces résultats repose sur des conventions de nommage claires et des attributions précises des utilisateurs, comme discuté précédemment. La construction d'une stratégie de canaux structurée autour de ces métriques peut améliorer davantage les performances.

### Pour Commencer

Pour profiter de ces résultats prouvés, commencez par affiner votre configuration de canaux :

-   **Définir une structure claire des canaux**: Canaux séparés pour les environnements de développement, de staging et de production.
-   **Configurer les permissions utilisateur**: Attribuer des contrôles d'accès granulaires pour les canaux de mise à jour.
-   **Suivre les performances**: Surveiller régulièrement les taux de réussite des mises à jour et l'engagement des utilisateurs.

N'oubliez pas de revoir et supprimer périodiquement les canaux inactifs pour maintenir un flux de travail efficace. Avec des canaux bien gérés, les développeurs peuvent déployer des mises à jour plus rapidement tout en maintenant le contrôle et la stabilité.
