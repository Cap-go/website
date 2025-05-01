---
slug: how-to-handle-user-data-requests-under-ccpa
title: Cara Menangani Permintaan Data Pengguna Berdasarkan CCPA
description: >-
  Pelajari cara mengelola permintaan data pengguna secara efektif sesuai dengan
  CCPA, memastikan kepatuhan sambil menghormati hak privasi pengguna.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-06T01:02:16.662Z
updated_at: 2025-04-06T01:02:28.104Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad-1743901348104.jpg
head_image_alt: Développement Mobile
keywords: >-
  CCPA, user data requests, compliance, privacy rights, data access, data
  deletion, opt-out, data protection
tag: 'Development, Security, Updates'
published: true
locale: fr
next_blog: ''
---

La loi californienne sur la protection de la vie privée des consommateurs ([CCPA](https://enwikipediaorg/wiki/California_Consumer_Privacy_Act)) donne aux utilisateurs le contrôle de leurs données personnelles et établit des règles strictes pour les entreprises. Voici ce que vous devez savoir pour vous conformer :

-   **Qui doit se conformer** : Les entreprises avec plus de 25M$ de revenus, des données sur plus de 50 000 utilisateurs, ou gagnant plus de 50% des revenus de la vente de données
-   **Droits des utilisateurs** :
    -   **Accès** : Les utilisateurs peuvent demander leurs données. Répondre sous 45 jours
    -   **Suppression** : Les utilisateurs peuvent demander la suppression de leurs données. Répondre sous 45 jours
    -   **Opt-Out** : Les utilisateurs peuvent arrêter la vente de leurs données. Doit être immédiat
    -   **Non-discrimination** : Service égal indépendamment des préférences de confidentialité
-   **Étapes clés pour la conformité** :
    -   Créer un système sécurisé pour les demandes de données (formulaires web, email ou dans l'application)
    -   Vérifier l'identité de l'utilisateur avant de traiter les demandes
    -   Utiliser des [politiques de confidentialité](https://capgoapp/dp/) claires et fournir une option simple "Ne pas vendre mes informations personnelles"
    -   Protéger les données avec le chiffrement et le stockage sécurisé

**Conseil rapide** : Utilisez des outils comme [Capgo](https://capgoapp/) pour des mises à jour instantanées des fonctionnalités de confidentialité de votre application, assurant une conformité rapide aux réglementations changeantes

## Comment se conformer à la loi californienne sur la protection de la vie privée des consommateurs

<iframe src="https://www.youtube.com/embed/8NY0qFaVWwo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Comprendre les droits des utilisateurs [CCPA](https://enwikipediaorg/wiki/California_Consumer_Privacy_Act)

Les développeurs doivent créer des processus sécurisés et conviviaux pour répondre à chaque droit des utilisateurs sous CCPA

### Droits d'accès aux données

Lorsque les utilisateurs demandent l'accès à leurs données, fournissez les détails suivants :

| **Catégorie de données** | **Informations à divulguer** | **Format recommandé** |
| --- | --- | --- |
| Types et sources de données | Types de données collectées et leurs sources | Lisible par machine (ex. JSON, CSV) |
| Utilisation des données | Comment les données sont traitées et utilisées | Résumé en texte simple |
| Accès tiers | Liste des tiers ayant accès aux données | Liste structurée |
| Durée de conservation | Durée de conservation des données | Délais spécifiques |

Une fois l'accès aux données accordé, assurez-vous d'avoir un processus clair et fiable pour la suppression des données afin de rester conforme

### Processus de suppression des données

1. **Vérifier la portée** : Confirmer que la suppression couvre tous les systèmes pertinents, y compris les bases de données principales, les caches, les outils d'analyse, les systèmes tiers et les sauvegardes. Des exceptions peuvent s'appliquer pour la sécurité, les obligations légales, les corrections de bugs ou les transactions en cours
2. **Exécuter la suppression** : Supprimer les données de tous les systèmes applicables et notifier immédiatement l'utilisateur. Inclure l'horodatage de suppression et les détails des données conservées sous exceptions

Après avoir géré les droits d'accès et de suppression, assurez-vous que le processus de désabonnement de la vente des données soit tout aussi simple

### Opt-out de la vente des données

Fournir une option "Ne pas vendre mes informations personnelles" facile à trouver, accessible depuis l'écran principal ou le menu des paramètres de l'application. Cette préférence doit être appliquée rapidement et rester cohérente sur toutes les versions de l'application

Si votre application utilise des SDK d'analyse ou de publicité tiers, assurez-vous que ces services s'intègrent à votre mécanisme d'opt-out et respectent les préférences des utilisateurs sans délai. Cela assure la conformité et établit la confiance avec vos utilisateurs

## Traitement des demandes de données CCPA

Voici comment gérer les demandes de données CCPA de manière sécurisée tout en restant conforme :

### Mise en place d'un système de demande

Fournissez aux utilisateurs des moyens sécurisés de soumettre leurs demandes. Les options incluent :

-   Un formulaire web sécurisé avec SSL et captcha
-   Un email dédié à la confidentialité avec une fonction de réponse automatique
-   Une interface dans l'application utilisant une API sécurisée

Assurez-vous d'enregistrer et d'horodater chaque soumission. Organisez les demandes par type pour rationaliser le traitement

### Vérification de l'identité de l'utilisateur

Utilisez un processus en deux étapes pour confirmer l'identité de l'utilisateur :

-   D'abord, vérifiez leur identité via leur email enregistré ou ID de compte
-   Ensuite, effectuez une vérification secondaire, comme l'envoi d'un code SMS à usage unique ou des questions de sécuritéPour les applications mobiles, vous pouvez vous appuyer sur des identifiants spécifiques aux appareils ou des jetons d'authentification pour une sécurité accrue

### Gestion des Délais de Réponse

Une fois l'identité de l'utilisateur vérifiée, suivez ces étapes pour respecter les délais CCPA :

-   Utilisez un système de suivi centralisé pour enregistrer chaque demande, surveiller les délais et suivre la progression
-   Enregistrez tous les détails, y compris les horodatages, les méthodes de vérification, les étapes de traitement et les communications avec les utilisateurs, pour garantir la conformité et maintenir une piste d'audit claire

## Directives de Conformité CCPA

### Mises à Jour de la Politique de Confidentialité

Gardez votre [politique de confidentialité](https://capgoapp/privacy/) à jour avec les exigences CCPA. Décrivez clairement :

-   Les types d'informations personnelles que vous collectez
-   Comment vous utilisez et partagez ces informations
-   Les droits des utilisateurs selon le CCPA
-   Comment les utilisateurs peuvent soumettre des demandes de données

Écrivez dans un langage simple et direct. Par exemple, dites "selon" au lieu de "conformément à". Cela rend votre politique plus facile à comprendre et soutient vos efforts de conformité

Une fois mise à jour, simplifiez le contrôle des données pour les utilisateurs, y compris la possibilité de refuser le partage de données

### Mise en Œuvre du Droit d'Opposition

Incluez une option "Ne pas vendre ou partager mes informations personnelles" dans votre application. Placez-la où les utilisateurs peuvent facilement la trouver, comme :

-   Le menu des paramètres de l'application
-   Les préférences du compte
-   Une section dédiée aux contrôles de confidentialité

Prenez en charge les signaux [Global Privacy Control](https://globalprivacycontrolorg/) (GPC) pour respecter automatiquement les préférences de confidentialité des utilisateurs

| Fonctionnalité | Exigence d'Implémentation | Expérience Utilisateur |
| --- | --- | --- |
| Bouton d'Opposition | Visible dans les paramètres | Activation en un clic |
| Support du Signal GPC | Détection automatique | Traitement en arrière-plan |
| Indicateur de Statut | État de basculement clair | Confirmation visuelle |
| Stockage des Préférences | Stockage local sécurisé | Persistant entre les sessions |

Ce processus d'opposition est simple et transparent, contribuant à établir la confiance tout en respectant les directives CCPA. Associez ces contrôles à des pratiques de sécurité rigoureuses pour protéger les données des utilisateurs

### Méthodes de Protection des Données

Utilisez des mesures de sécurité rigoureuses pour protéger les données à toutes les étapes. Chiffrez toutes les transmissions de données, en particulier les informations sensibles

Pour un stockage sécurisé des données :

-   Utilisez des bases de données chiffrées
-   Employez des pratiques sécurisées de gestion des clés
-   Effectuez des audits de sécurité réguliers
-   Mettez en place des systèmes de sauvegarde automatisés

Lors de la suppression des données, suivez les étapes détaillées dans la section Suppression des Données pour assurer une suppression complète de tous les systèmes. Ces méthodes aident à protéger les informations des utilisateurs et à maintenir la conformité

## Exigences CCPA pour les Applications Mobiles

### Contrôles des Autorisations de l'Application

Simplifiez la gestion des paramètres de confidentialité pour les utilisateurs avec des contrôles d'autorisation clairs et accessibles

Envisagez de créer une interface dédiée aux paramètres de confidentialité incluant :

| Type de Contrôle | Implémentation | Action Utilisateur |
| --- | --- | --- |
| **Collecte de Données** | Interrupteurs granulaires | Activer ou désactiver des types de données spécifiques |
| **Services de Localisation** | Options multiniveaux | Choisir la précision des données (précise ou approximative) |
| **Communications Marketing** | Basé sur les catégories | Sélectionner les méthodes de contact préférées |
| **Partage Tiers** | Contrôles individuels | Refuser par partenaire de données |

Placez ces contrôles à un endroit facile à trouver dans le menu des paramètres de votre application. Soyez transparent - expliquez clairement quelles données sont collectées, pourquoi elles sont nécessaires, comment elles sont utilisées et avec qui elles sont partagées. Cette approche garantit que les utilisateurs peuvent rapidement mettre à jour leurs préférences quand ils le souhaitent

### Utilisation de [Capgo](https://capgoapp/) pour les Mises à Jour

![Capgo](https://assetsseobotaicom/capgoapp/67f1c538ebbb9dc80644b1ad/241c8f19433e01f315154c8988becf9cjpg)

Une fois que vous avez établi des contrôles solides dans l'application, maintenir votre application à jour est essentiel pour rester conforme. C'est là que Capgo intervient. Il vous permet de déployer des mises à jour instantanément - sans attendre les approbations de l'app store. En fait, 95% des utilisateurs actifs reçoivent les mises à jour dans les 24 heures suivant leur publication [\[1\]](https://capgoapp/)

Voici ce que Capgo propose :

-   **Mises à Jour Instantanées** : Poussez immédiatement les changements cruciaux de confidentialité et d'autorisations-   **Mise en œuvre sécurisée** : Utilise le chiffrement de bout en bout, garantissant que seuls les utilisateurs peuvent déchiffrer les mises à jour
-   **Contrôle de version** : Retour en arrière des mises à jour si nécessaire pour maintenir la cohérence

> "Nous pratiquons le développement agile et @Capgo est essentiel dans la livraison continue à nos utilisateurs !" - Rodrigo Mantica [\[1\]](https://capgoapp/)

Le système de canaux de Capgo vous permet également de tester les mises à jour de confidentialité avec des groupes d'utilisateurs spécifiques avant de les déployer à tous. Actuellement, 750 applications s'appuient sur Capgo dans des environnements de production [\[1\]](https://capgoapp/)

## Résumé

### Points principaux

La gestion des demandes de données CCPA implique d'équilibrer les droits à la vie privée des utilisateurs avec l'exécution technique. Voici les principales priorités que les développeurs doivent aborder :

| Exigence | Mise en œuvre |
| --- | --- |
| Système de demande de données | Portail sécurisé avec authentification utilisateur |
| Contrôles de confidentialité | Paramètres d'autorisation détaillés |
| Refus de vente de données | Processus clair avec vérification utilisateur |
| Protection des données | Chiffrement de bout en bout |

Pour les applications mobiles, des contrôles d'autorisation solides sont essentiels. **Capgo** simplifie la conformité en permettant des mises à jour instantanées, supportant déjà 750 applications en production [\[1\]](https://capgoapp/)

> "Capgo est un outil indispensable pour les développeurs qui veulent être plus productifs. Éviter la révision pour les corrections de bugs est précieux" - Bessie Cooper [\[1\]](https://capgoapp/)

La vitesse compte : 95% des utilisateurs reçoivent des mises à jour dans les 24 heures via **Capgo** [\[1\]](https://capgoapp/), assurant une conformité rapide aux réglementations

La conformité CCPA n'est pas une tâche ponctuelle. Des audits et des mises à jour réguliers sont nécessaires pour suivre l'évolution des règles et protéger la confidentialité des utilisateurs