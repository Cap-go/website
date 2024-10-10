---
locale: fr
---

chanter @capgo/native-purchases

Le package @capgo/native-purchases est un plugin pour Capacitor qui fournit une fonctionnalité d'achat simple dans l'application. Dans ce didacticiel, nous passerons en revue les étapes d'installation et d'utilisation du package dans votre projet Capacitor.

##Installation

Pour installer le package @capgo/native-purchases, ouvrez votre terminal et exécutez la commande suivante :

```bash
npm install @capgo/native-purchases
npx cap sync
```

Cela installera le package et synchronisera les fichiers natifs avec votre projet

### Configuration Android

Si vous utilisez Android, vous devez ajouter une configuration à votre fichier AndroidManifestxml. Ouvrez le fichier situé dans `android/app/src/main/AndroidManifestxml` et ajoutez le code suivant :

```xml
<!-- Add any necessary configuration here -->
```

### Configuration iOS

Si vous utilisez iOS, aucune autre étape n'est nécessaire

## Utilisation du package

Le package @capgo/native-purchases propose plusieurs méthodes pour gérer les achats intégrés. Voici quelques exemples d'utilisation de ces méthodes :

### Restauration des achats

Pour restaurer les achats précédents d'un utilisateur, utilisez la méthode `restorePurchases()` :

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.restorePurchases();
```

### Acheter un produit

Pour lancer un achat pour un produit spécifique, utilisez la méthode `purchaseProduct()` :

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.purchaseProduct({ productIdentifier: 'com.example.product' });
```

### Obtenir des informations sur le produit

Pour récupérer des informations sur un produit spécifique, utilisez la méthode `getProducts()` :

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.getProducts({ productIdentifiers: ['com.example.product'] });
```

Ce ne sont là que quelques exemples d'utilisation du package @capgo/native-purchases. Pour des informations plus détaillées sur les méthodes disponibles et leurs paramètres, reportez-vous à la documentation du package.

## Conclusion

Dans ce didacticiel, nous avons couvert le processus d'installation et l'utilisation de base du package @capgo/native-purchases. En suivant les étapes décrites ici, vous devriez pouvoir intégrer la fonctionnalité d'achat in-app dans votre projet Capacitor.