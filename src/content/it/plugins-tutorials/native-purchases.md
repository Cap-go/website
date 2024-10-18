---
locale: it
---

Chantez le paquet @capgo/native-purchases

Le paquet @capgo/native-purchases est un plugin pour Capacitor qui offre une fonctionnalité d'achat in-app facile. Dans ce tutoriel, nous allons passer en revue les étapes d'installation et d'utilisation du paquet dans votre projet Capacitor.

## Installation

Pour installer le paquet @capgo/native-purchases, ouvrez votre terminal et exécutez la commande suivante :

[[BLOC_DE_CODE]]

Cela installera le paquet et synchronisera les fichiers natifs avec votre projet.

### Configuration Android

Si vous utilisez Android, vous devez ajouter quelques configurations à votre fichier AndroidManifest.xml. Ouvrez le fichier situé à `android/app/src/main/AndroidManifest.xml` et ajoutez le code suivant :

[[BLOC_DE_CODE]]

### Configuration iOS

Si vous utilisez iOS, aucune autre étape n'est nécessaire.

## Utilisation du Paquet

Le paquet @capgo/native-purchases fournit plusieurs méthodes pour gérer les achats in-app. Voici quelques exemples de l'utilisation de ces méthodes :

### Restauration des Achats

Pour restaurer les achats précédents d'un utilisateur, utilisez la méthode `restorePurchases()` :

[[BLOC_DE_CODE]]

### Acheter un Produit

Pour initier un achat pour un produit spécifique, utilisez la méthode `purchaseProduct()` :

[[BLOC_DE_CODE]]

### Obtenir des Informations sur le Produit

Pour récupérer des informations sur un produit spécifique, utilisez la méthode `getProducts()` :

[[BLOC_DE_CODE]]

Ce ne sont que quelques exemples de la façon d'utiliser le paquet @capgo/native-purchases. Pour plus d'informations détaillées sur les méthodes disponibles et leurs paramètres, consultez la documentation du paquet.

## Conclusion

Dans ce tutoriel, nous avons couvert le processus d'installation et l'utilisation de base du paquet @capgo/native-purchases. En suivant les étapes décrites ici, vous devriez être en mesure d'intégrer la fonctionnalité d'achat in-app dans votre projet Capacitor.