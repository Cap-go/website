---
locale: de
---

Sing @capgo/capacitor-purchases Paket Tutorial

Dieses Tutorial führt Sie durch den Prozess der Verwendung des @capgo/capacitor-purchases Pakets für In-App-Käufe in Capacitor.

## Schritt 1: Paket installieren

Um das @capgo/capacitor-purchases Paket zu installieren, öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus:

```bash
npm install @capgo/capacitor-purchases
npx cap sync
```

## Schritt 2: Die Android-Plattform konfigurieren

Wenn Sie die Android-Plattform anvisieren, müssen Sie einige Konfigurationen zur Datei android/app/src/main/AndroidManifest.xml hinzufügen. Öffnen Sie die Datei und fügen Sie den folgenden Code-Schnipsel hinzu:

```xml
<!-- Add your configuration here -->
```

## Schritt 3: Paket einrichten

Um das @capgo/capacitor-purchases Paket einzurichten, verwenden Sie die `setup` Methode mit Ihrem API-Schlüssel und einer optionalen App-Benutzer-ID. Hier ein Beispiel:

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

## Schritt 4: Ereignis für Käufe aktualisieren

Sie können das Ereignis "purchasesUpdate" anhören, um benachrichtigt zu werden, wenn es eine Änderung in den Käufen des Benutzers gibt. Hier ein Beispiel, wie Sie einen Listener für das Ereignis hinzufügen:

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

## Schritt 5: Verfügbare Angebote abrufen

Sie können die `getOfferings` Methode verwenden, um die verfügbaren Angebote für den Benutzer abzurufen. Hier ein Beispiel:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const getOfferings = async () => {
  const offerings = await CapacitorPurchases.getOfferings();
  console.log(offerings);
};

getOfferings();
```

## Schritt 6: Ein Paket kaufen

Um einen Kauf zu tätigen, verwenden Sie die `purchasePackage` Methode mit der Paket-ID. Hier ein Beispiel:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const purchasePackage = async (packageId: string) => {
  await CapacitorPurchases.purchasePackage({ packageId });
};

purchasePackage("PACKAGE_ID");
```

## Schritt 7: Käufe wiederherstellen

Wenn Sie die Käufe des Benutzers wiederherstellen möchten, verwenden Sie die `restorePurchases` Methode. Hier ein Beispiel:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const restorePurchases = async () => {
  await CapacitorPurchases.restorePurchases();
};

restorePurchases();
```

## Das war's!

Sie haben erfolgreich gelernt, wie Sie das @capgo/capacitor-purchases Paket für In-App-Käufe in Capacitor verwenden. Viel Spaß beim Programmieren!