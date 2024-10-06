---
locale: fr
---

chanter @capgo/capacitor-purchases package tutoriel

Ce didacticiel vous guidera tout au long du processus d'utilisation du package @capgo/capacitor-purchases pour les achats intégrés dans Capacitor.

## Étape 1 : Installer le package

Pour installer le package @capgo/capacitor-purchases, ouvrez votre terminal et exécutez la commande suivante :

```bash
npm install @capgo/capacitor-purchases
npx cap sync
```

## Étape 2 : Configurer la plateforme Android

Si vous ciblez la plate-forme Android, vous devez ajouter une configuration au fichier android/app/src/main/AndroidManifestxml. Ouvrez le fichier et ajoutez l'extrait de code suivant :

```xml
<!-- Add your configuration here -->
```

## Étape 3 : Configurer le package

Pour configurer le package @capgo/capacitor-purchases, utilisez la méthode `setup` avec votre clé API et un ID utilisateur d'application facultatif. Voici un exemple :

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const setupPurchases = async () => {
  const apiKey = "YOUR_API_KEY";
  const appUserID = "OPTIONAL_APP_USER_ID";

  await CapacitorPurchases.setup({ apiKey, appUserID });
};

setupPurchases();
```

## Étape 4 : Gérer l'événement de mise à jour des achats

Vous pouvez écouter l'événement « PurchasesUpdate » pour être averti en cas de modification des achats de l'utilisateur. Voici un exemple de la façon d'ajouter un auditeur pour l'événement :

```typescript
import { Plugins, PluginListenerHandle } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const addPurchasesUpdateListener = (): PluginListenerHandle => {
  return CapacitorPurchases.addListener(
    "purchasesUpdate",
    (data: { purchases: Package; customerInfo: CustomerInfo }) => {
      // Handle purchases update here
    }
  );
};

const purchasesUpdateListener = addPurchasesUpdateListener();
```

## Étape 5 : Récupérer les offres disponibles

Vous pouvez utiliser la méthode `getOfferings` pour récupérer les offres disponibles pour l'utilisateur. Voici un exemple :

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const getOfferings = async () => {
  const offerings = await CapacitorPurchases.getOfferings();
  console.log(offerings);
};

getOfferings();
```

## Étape 6 : Acheter un forfait

Pour effectuer un achat, utilisez la méthode `purchasePackage` avec l'ID du package. Voici un exemple :

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const purchasePackage = async (packageId: string) => {
  await CapacitorPurchases.purchasePackage({ packageId });
};

purchasePackage("PACKAGE_ID");
```

## Étape 7 : Restaurer les achats

Si vous souhaitez restaurer les achats de l'utilisateur, utilisez la méthode `restorePurchases`. Voici un exemple :

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const restorePurchases = async () => {
  await CapacitorPurchases.restorePurchases();
};

restorePurchases();
```

## C'est ça!

Vous avez appris avec succès comment utiliser le package @capgo/capacitor-purchases pour les achats intégrés dans Capacitor Happy coding !