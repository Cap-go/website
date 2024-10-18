---
locale: fr
---

chanter le tutoriel du package @capgo/capacitor-purchases

Ce tutoriel vous guidera à travers le processus d'utilisation du package @capgo/capacitor-purchases pour les achats intégrés dans Capacitor.

## Étape 1 : Installer le package

Pour installer le package @capgo/capacitor-purchases, ouvrez votre terminal et exécutez la commande suivante :

```bash
npm install @capgo/capacitor-purchases
npx cap sync
```

## Étape 2 : Configurer la plateforme Android

Si vous visez la plateforme Android, vous devez ajouter certaines configurations au fichier android/app/src/main/AndroidManifest.xml. Ouvrez le fichier et ajoutez le code suivant :

```xml
<!-- Add your configuration here -->
```

## Étape 3 : Configurer le package

Pour configurer le package @capgo/capacitor-purchases, utilisez la méthode `setup` avec votre clé API et un ID utilisateur d'application optionnel. Voici un exemple :

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

## Étape 4 : Gérer l'événement de mise à jour des achats

Vous pouvez écouter l'événement "purchasesUpdate" pour être informé lorsqu'il y a un changement dans les achats de l'utilisateur. Voici un exemple de la façon d'ajouter un écouteur pour l'événement :

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

## Étape 5 : Récupérer les offres disponibles

Vous pouvez utiliser la méthode `getOfferings` pour récupérer les offres disponibles pour l'utilisateur. Voici un exemple :

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const getOfferings = async () => {
  const offerings = await CapacitorPurchases.getOfferings();
  console.log(offerings);
};

getOfferings();
```

## Étape 6 : Acheter un package

Pour faire un achat, utilisez la méthode `purchasePackage` avec l'ID du package. Voici un exemple :

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const purchasePackage = async (packageId: string) => {
  await CapacitorPurchases.purchasePackage({ packageId });
};

purchasePackage("PACKAGE_ID");
```

## Étape 7 : Restaurer les achats

Si vous souhaitez restaurer les achats de l'utilisateur, utilisez la méthode `restorePurchases`. Voici un exemple :

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const restorePurchases = async () => {
  await CapacitorPurchases.restorePurchases();
};

restorePurchases();
```

## C'est tout !

Vous avez réussi à apprendre à utiliser le package @capgo/capacitor-purchases pour les achats intégrés dans Capacitor. Bonne programmation !