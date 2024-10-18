---
locale: fr
---

Chanter le package @capgo/native-purchases

Le package @capgo/native-purchases est un plugin pour Capacitor qui fournit une fonctionnalité d'achat in-app facile. Dans ce tutoriel, nous allons parcourir les étapes d'installation et d'utilisation du package dans votre projet Capacitor.

## Installation

Pour installer le package @capgo/native-purchases, ouvrez votre terminal et exécutez la commande suivante :

```bash
npm install @capgo/native-purchases
npx cap sync
```

Cela installera le package et synchronisera les fichiers natifs avec votre projet.

### Configuration Android

Si vous utilisez Android, vous devez ajouter quelques configurations dans votre fichier AndroidManifest.xml. Ouvrez le fichier situé à `android/app/src/main/AndroidManifest.xml` et ajoutez le code suivant :

```xml
<!-- Add any necessary configuration here -->
```

### Configuration iOS

Si vous utilisez iOS, aucune étape supplémentaire n'est nécessaire.

## Utilisation du package

Le package @capgo/native-purchases fournit plusieurs méthodes pour gérer les achats in-app. Voici quelques exemples de la façon d'utiliser ces méthodes :

### Restauration des achats

Pour restaurer les achats précédents d'un utilisateur, utilisez la méthode `restorePurchases()` :

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.restorePurchases();
```

### Achat d'un produit

Pour initier un achat pour un produit spécifique, utilisez la méthode `purchaseProduct()` :

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.purchaseProduct({ productIdentifier: 'com.example.product' });
```

### Obtention des informations sur un produit

Pour récupérer des informations sur un produit spécifique, utilisez la méthode `getProducts()` :

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.getProducts({ productIdentifiers: ['com.example.product'] });
```

Ce ne sont là que quelques exemples de la façon d'utiliser le package @capgo/native-purchases. Pour des informations plus détaillées sur les méthodes disponibles et leurs paramètres, consultez la documentation du package.

## Conclusion

Dans ce tutoriel, nous avons couvert le processus d'installation et l'utilisation de base du package @capgo/native-purchases. En suivant les étapes décrites ici, vous devriez être en mesure d'intégrer la fonctionnalité d'achat in-app dans votre projet Capacitor.