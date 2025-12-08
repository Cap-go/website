---
slug: how-to-handle-user-data-requests-under-ccpa
title: Comment gérer les demandes de données utilisateur en vertu du CCPA
description: >-
  Apprenez à gérer efficacement les demandes de données des utilisateurs selon
  la CCPA, en garantissant la conformité tout en respectant les droits de
  confidentialité des utilisateurs.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-06T01:02:16.662Z
updated_at: 2025-04-06T01:02:28.104Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad-1743901348104.jpg
head_image_alt: Développement mobile
keywords: >-
  CCPA, user data requests, compliance, privacy rights, data access, data
  deletion, opt-out, data protection
tag: 'Development, Security, Updates'
published: true
locale: fr
next_blog: ''
---
La loi sur la protection de la vie privée des consommateurs de Californie ([CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act)) donne aux utilisateurs le contrôle sur leurs données personnelles et fixe des règles strictes pour les entreprises. Voici ce que vous devez savoir pour vous conformer :

-   **Qui doit se conformer** : Les entreprises ayant plus de 25 millions de dollars de revenus, des données sur plus de 50 000 utilisateurs, ou gagnant plus de 50 % de leurs revenus en vendant des données.
-   **Droits des utilisateurs** :
    -   **Accès** : Les utilisateurs peuvent demander l'accès à leurs données. Répondez dans un délai de 45 jours.
    -   **Suppression** : Les utilisateurs peuvent demander à supprimer leurs données. Répondez dans un délai de 45 jours.
    -   **Désinscription** : Les utilisateurs peuvent arrêter la vente de leurs données. Cela doit être immédiat.
    -   **Non-discrimination** : Service égal indépendamment des préférences en matière de confidentialité.
-   **Étapes clés pour la conformité** :
    -   Créer un système sécurisé pour les demandes de données (formulaires web, e-mail ou dans l'application).
    -   Vérifier l'identité de l'utilisateur avant de traiter les demandes.
    -   Utiliser des [politiques de confidentialité](https://capgo.app/dp/) claires et fournir une option facile "Ne pas vendre mes informations personnelles".
    -   Protéger les données par le chiffrement et le stockage sécurisé.

**Astuce rapide** : Utilisez des outils comme [Capgo](https://capgo.app/) pour des mises à jour instantanées des fonctionnalités de confidentialité de votre application, garantissant une conformité rapide avec les réglementations en constante évolution.

## Comment se conformer à la loi sur la protection de la vie privée des consommateurs de Californie ...

## Comprendre les droits des utilisateurs [CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act)

Les développeurs doivent créer des processus sécurisés et conviviaux pour traiter chaque droit des données des utilisateurs en vertu de la CCPA.

### Droits d'accès aux données

Lorsque les utilisateurs demandent l'accès à leurs données, fournissez les détails suivants :

| **Catégorie de données** | **Informations à divulguer** | **Format recommandé** |
| --- | --- | --- |
| Types et sources de données | Types de données collectées et leurs sources | Lisible par machine (par exemple, JSON, CSV) |
| Utilisation des données | Comment les données sont traitées et utilisées | Résumé en texte clair |
| Accès tiers | Liste des tiers ayant accès aux données | Liste structurée |
| Durée de conservation | Durée de stockage des données | Durées spécifiques |

Une fois l'accès aux données accordé, assurez-vous d'avoir un processus clair et fiable pour la suppression des données afin de rester conforme.

### Processus de suppression des données

1.  **Vérifier la portée** : Confirmez que la suppression couvre tous les systèmes pertinents, y compris les bases de données principales, les caches, les outils d'analyse, les systèmes tiers et les sauvegardes. Des exceptions peuvent s'appliquer pour des raisons de sécurité, d'obligations légales, de corrections de bogues ou de transactions en cours.
2.  **Exécuter la suppression** : Supprimez les données de tous les systèmes applicables et informez immédiatement l'utilisateur. Incluez l'horodatage de la suppression et les détails de toute donnée conservée sous les exceptions.

Après avoir traité les droits d'accès et de suppression, assurez-vous que le processus de désinscription à la vente de données soit tout aussi simple.

### Désinscription à la vente de données

Fournissez une option "Ne pas vendre mes informations personnelles" facile à trouver, accessible depuis l'écran principal de l'application ou le menu des paramètres. Cette préférence doit être appliquée rapidement et rester cohérente dans toutes les versions de l'application.

Si votre application utilise des analyses tierces ou des SDK publicitaires, assurez-vous que ces services s'intègrent à votre mécanisme de désinscription et respectent les préférences des utilisateurs sans délai. Cela garantit la conformité et établit la confiance avec vos utilisateurs.

## Traitement des demandes de données CCPA

Voici comment traiter les demandes de données CCPA de manière sécurisée tout en restant conforme :

### Mise en place d'un système de demande

Fournissez aux utilisateurs des moyens sécurisés pour soumettre leurs demandes. Les options incluent :

-   Un formulaire web sécurisé avec SSL et captcha
-   Un e-mail dédié axé sur la vie privée avec une fonction d'auto-réponse
-   Une interface dans l'application utilisant une API sécurisée

Assurez-vous d'enregistrer et de timbrer chaque soumission. Organisez les demandes par type pour rationaliser le traitement.

### Vérification de l'identité de l'utilisateur

Utilisez un processus en deux étapes pour confirmer l'identité de l'utilisateur :

-   D'abord, vérifiez son identité via son e-mail enregistré ou son identifiant de compte.
-   Ensuite, effectuez un contrôle secondaire, comme l'envoi d'un code SMS à usage unique ou poser des questions de sécurité.

Pour les applications mobiles, vous pouvez vous fier à des identifiants spécifiques à l'appareil ou à des jetons d'authentification pour une sécurité accrue.

### Gestion des délais de réponse

Une fois l'identité de l'utilisateur vérifiée, respectez ces étapes pour respecter les délais de la CCPA :

-   Utilisez un traceur centralisé pour enregistrer chaque demande, surveiller les délais et suivre le progrès.
-   Enregistrez tous les détails, y compris les timestamps, les méthodes de vérification, les étapes de traitement, et les communications avec l'utilisateur, pour garantir la conformité et maintenir une trace d'audit claire.

## Directives de conformité CCPA

### Mises à jour de la politique de confidentialité

Tenez votre [politique de confidentialité](https://capgo.app/privacy/) à jour avec les exigences de la CCPA. Décrivez clairement :

-   Les types d'informations personnelles que vous collectez
-   Comment vous utilisez et partagez ces informations
-   Les droits des utilisateurs en vertu de la CCPA
-   Comment les utilisateurs peuvent soumettre des demandes de données

Rédigez dans un langage clair et simple. Par exemple, dites "selon" au lieu de "conformément à". Cela rend votre politique plus facile à comprendre et soutien vos efforts de conformité.

Une fois mise à jour, facilitez le contrôle des données pour les utilisateurs, y compris la désinscription au partage de données.

### Mise en œuvre de la désinscription

Incluez une option "Ne pas vendre ou partager mes informations personnelles" dans votre application. Placez-la à un endroit où les utilisateurs peuvent facilement la trouver, comme :

-   Le menu des paramètres de l'application
-   Les préférences de compte
-   Une section dédiée aux contrôles de confidentialité

Soutenez les signaux de [Global Privacy Control](https://globalprivacycontrol.org/) (GPC) pour respecter automatiquement les préférences de confidentialité des utilisateurs.

| Fonctionnalité | Exigence de mise en œuvre | Expérience utilisateur |
| --- | --- | --- |
| Bouton de désinscription | Visible dans les paramètres de l'app | Activation en un clic |
| Support des signaux GPC | Détection automatique | Traitement en arrière-plan |
| Indicateur d'état | État de bascule clair | Confirmation visuelle |
| Stockage de préférences | Stockage local sécurisé | Persistant à travers les sessions |

Ce processus de désinscription est simple et transparent, aidant à établir la confiance tout en respectant les directives de la CCPA. Associez ces contrôles à de solides pratiques de sécurité pour protéger les données des utilisateurs.

### Méthodes de protection des données

Utilisez des mesures de sécurité rigoureuses pour protéger les données à tous les stades. Chiffrez toutes les transmissions de données, en particulier les informations sensibles.

Pour un stockage de données sécurisé :

-   Utilisez des bases de données chiffrées
-   Appliquez des pratiques de gestion de clés sécurisées
-   Effectuez des audits de sécurité réguliers
-   Mettez en place des systèmes de sauvegarde automatisés

Lors de la suppression de données, suivez les étapes détaillées dans la section Suppression des données pour garantir une suppression complète de tous les systèmes. Ces méthodes aident à protéger les informations des utilisateurs et à maintenir la conformité.

## Exigences CCPA pour les applications mobiles

### Contrôles des autorisations de l'application

Facilitez la gestion des paramètres de confidentialité par les utilisateurs avec des contrôles d'autorisation clairs et accessibles.

Envisagez de créer une interface dédiée aux paramètres de confidentialité qui inclut :

| Type de contrôle | Mise en œuvre | Action utilisateur |
| --- | --- | --- |
| **Collecte de données** | Commutateurs granulaires | Activer ou désactiver des types de données spécifiques |
| **Services de localisation** | Options multi-niveaux | Choisir la précision des données (précise ou approximative) |
| **Communications marketing** | Basé sur la catégorie | Sélectionner les méthodes de contact préférées |
| **Partage tiers** | Contrôles individuels | Désinscription par partenaire de données |

Placez ces contrôles à un endroit facilement trouvable dans le menu des paramètres de votre application. Soyez transparent - expliquez clairement quelles données sont collectées, pourquoi elles sont nécessaires, comment elles sont utilisées et avec qui elles sont partagées. Cette approche garantit que les utilisateurs peuvent rapidement mettre à jour leurs préférences chaque fois que nécessaire.

### Utilisation de [Capgo](https://capgo.app/) pour les mises à jour

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad/241c8f19433e01f315154c8988becf9c.jpg)

Une fois que vous avez établi de solides contrôles dans l'application, maintenir votre application à jour est essentiel pour rester conforme. C'est là que Capgo entre en jeu. Il vous permet de déployer des mises à jour instantanément - sans attendre l'approbation des stores d'applications. En fait, 95 % des utilisateurs actifs reçoivent les mises à jour dans les 24 heures suivant leur publication [\[1\]](https://capgo.app/).

Voici ce que Capgo offre :

-   **Mises à jour instantanées** : Poussez immédiatement des modifications cruciales concernant la vie privée et les autorisations.
-   **Mise en œuvre sécurisée** : Utilise un chiffrement de bout en bout, garantissant que seuls les utilisateurs peuvent déchiffrer les mises à jour.
-   **Contrôle de version** : Rétablissez des mises à jour si nécessaire pour maintenir la cohérence.

> "Nous pratiquons un développement agile et @Capgo est essentiel pour livrer continuellement à nos utilisateurs !" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Le système de canaux de Capgo vous permet également de tester les mises à jour de confidentialité auprès de groupes d'utilisateurs spécifiques avant de les déployer à tous. Actuellement, 750 applications dépendent de Capgo dans des environnements de production [\[1\]](https://capgo.app/).

## Résumé

### Points principaux

Le traitement des demandes de données CCPA implique un équilibre entre les droits de confidentialité des utilisateurs et l'exécution technique. Voici les principales priorités que les développeurs doivent aborder :

| Exigence | Mise en œuvre |
| --- | --- |
| Système de demande de données | Portail sécurisé avec authentification utilisateur |
| Contrôles de confidentialité | Paramètres d'autorisation détaillés |
| Désinscription à la vente de données | Processus clair avec vérification des utilisateurs |
| Protection des données | Chiffrement de bout en bout |

Pour les applications mobiles, de solides contrôles d'autorisation sont essentiels. **Capgo** simplifie la conformité en permettant des mises à jour instantanées, soutenant déjà 750 applications en production [\[1\]](https://capgo.app/).

> "Capgo est un outil indispensable pour les développeurs qui souhaitent être plus productifs. Éviter la révision pour les corrections de bogues est inestimable." - Bessie Cooper [\[1\]](https://capgo.app/)

La rapidité est importante : 95 % des utilisateurs reçoivent des mises à jour dans les 24 heures via **Capgo** [\[1\]](https://capgo.app/), garantissant une conformité rapide avec les réglementations.

La conformité à la CCPA n'est pas une tâche ponctuelle. Des audits et des mises à jour réguliers sont nécessaires pour suivre les règles en constante évolution et protéger la vie privée des utilisateurs.
