---
locale: fr
---

Tutoriel revenuecat/purchases-capacitor

Ce tutoriel vous guidera à travers le processus de mise en œuvre des achats intégrés et des abonnements dans votre application Ionic Capacitor en utilisant le package `@revenuecat/purchases-capacitor`.

## Prérequis

Avant de commencer, assurez-vous d'avoir ce qui suit :

- Un projet Ionic Capacitor configuré
- Un compte RevenueCat (inscrivez-vous sur https://apprevenuecatcom/signup)
- Des produits ou abonnements intégrés configurés dans vos comptes d'app store (Apple App Store et/ou Google Play Store)

## Installation

1 Ouvrez votre terminal ou invite de commande et naviguez jusqu'au répertoire de votre projet

2 Exécutez la commande suivante pour installer le package :

[[BLOC_DE_CODE]]

3 Après l'installation, synchronisez votre projet Capacitor :

[[BLOC_DE_CODE]]

## Configuration

1 Importez le module Purchases dans le fichier TypeScript principal de votre application (ex. : `appcomponentts`) :

[[BLOC_DE_CODE]]

2 Configurez le SDK avec votre clé API RevenueCat :

[[BLOC_DE_CODE]]

Appelez cette fonction lorsque votre application démarre, par exemple dans la méthode `ngOnInit()` de votre composant principal.

## Utilisation de base

### Récupérer les produits disponibles

Pour obtenir la liste des produits disponibles :

[[BLOC_DE_CODE]]

### Effectuer un achat

Pour initier un achat :

[[BLOC_DE_CODE]]

### Vérifier l'état de l'abonnement

Pour vérifier l'état actuel de l'abonnement d'un utilisateur :

[[BLOC_DE_CODE]]

### Restaurer les achats

Pour restaurer les achats précédents d'un utilisateur :

[[BLOC_DE_CODE]]

## Fonctionnalités avancées

### Identifier les utilisateurs

Si vous avez votre propre système d'identification d'utilisateur, vous pouvez identifier les utilisateurs auprès de RevenueCat :

[[BLOC_DE_CODE]]

### Vérifier l'éligibilité au prix d'introduction

Pour vérifier si un utilisateur est éligible à un prix d'introduction :

[[BLOC_DE_CODE]]

### Définir des attributs

Vous pouvez définir des attributs personnalisés pour les utilisateurs :

[[BLOC_DE_CODE]]

## Conclusion

Ce tutoriel a couvert les bases de la mise en œuvre des achats intégrés et des abonnements en utilisant le package `@revenuecat/purchases-capacitor`. N'oubliez pas de gérer les erreurs de manière appropriée et de tester votre implémentation de manière approfondie.

Pour une utilisation plus avancée et une documentation API détaillée, consultez la documentation RevenueCat sur https://docsrevenuecatcom/.

N'oubliez pas de configurer vos produits dans le tableau de bord RevenueCat et de les lier à vos produits d'app store. Assurez-vous également de tester votre implémentation dans un environnement sandbox avant de la publier en production.