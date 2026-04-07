---
locale: de
---

sing @capgo/native-purchases Paket

Das @capgo/native-purchases Paket ist ein Plugin für Capacitor, das einfaches In-App-Kauf-Feature bereitstellt. In diesem Tutorial werden wir die Schritte zur Installation und Verwendung des Pakets in deinem Capacitor-Projekt durchgehen.

## Installation

Um das @capgo/native-purchases Paket zu installieren, öffne dein Terminal und führe den folgenden Befehl aus:

```bash
npm install @capgo/native-purchases
npx cap sync
```

Dies installiert das Paket und synchronisiert die nativen Dateien mit deinem Projekt.

### Android Einrichtung

Wenn du Android verwendest, musst du einige Konfigurationen zu deiner AndroidManifest.xml Datei hinzufügen. Öffne die Datei, die sich unter `android/app/src/main/AndroidManifest.xml` befindet, und füge den folgenden Code hinzu:

```xml
<!-- Add any necessary configuration here -->
```

### iOS Einrichtung

Wenn du iOS verwendest, sind keine weiteren Schritte erforderlich.

## Verwendung des Pakets

Das @capgo/native-purchases Paket bietet mehrere Methoden zum Umgang mit In-App-Käufen. Hier sind einige Beispiele, wie du diese Methoden verwenden kannst:

### Wiederherstellen von Käufen

Um die vorherigen Käufe eines Nutzers wiederherzustellen, verwende die Methode `restorePurchases()`:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.restorePurchases();
```

### Kauf eines Produkts

Um einen Kauf für ein bestimmtes Produkt einzuleiten, verwende die Methode `purchaseProduct()`:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.purchaseProduct({ productIdentifier: 'com.example.product' });
```

### Produktinformationen abrufen

Um Informationen über ein bestimmtes Produkt abzurufen, verwende die Methode `getProducts()`:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.getProducts({ productIdentifiers: ['com.example.product'] });
```

Dies sind nur einige Beispiele, wie du das @capgo/native-purchases Paket verwenden kannst. Für detailliertere Informationen über die verfügbaren Methoden und deren Parameter verweise auf die Dokumentation des Pakets.

## Fazit

In diesem Tutorial haben wir den Installationsprozess und die grundlegende Verwendung des @capgo/native-purchases Pakets behandelt. Indem du die hier skizzierten Schritte befolgst, solltest du in der Lage sein, die In-App-Kauf-Funktionalität in dein Capacitor-Projekt zu integrieren.