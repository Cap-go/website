---
locale: de
---

revenuecat/purchases-capacitor Tutorial

Dieses Tutorial führt dich durch den Prozess der Implementierung von In-App-Käufen und Abonnements in deiner Ionic Capacitor-App mit dem Paket `@revenuecat/purchases-capacitor`.

## Voraussetzungen

Bevor wir beginnen, stelle sicher, dass du Folgendes hast:

- Ein eingerichtetes Ionic Capacitor-Projekt
- Ein RevenueCat-Konto (melde dich an unter https://apprevenuecatcom/signup)
- In-App-Produkte oder Abonnements, die in deinen App-Store-Konten (Apple App Store und/oder Google Play Store) konfiguriert sind

## Installation

1. Öffne dein Terminal oder die Eingabeaufforderung und navigiere zu deinem Projektverzeichnis.

2. Führe den folgenden Befehl aus, um das Paket zu installieren:

```bash
npm install @revenuecat/purchases-capacitor
```

3. Synchronisiere nach der Installation dein Capacitor-Projekt:

```bash
npx cap sync
```

## Konfiguration

1. Importiere das Purchases-Modul in der Haupt-Typescript-Datei deiner App (z.B. `appcomponentts`):

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';
```

2. Konfiguriere das SDK mit deinem RevenueCat-API-Schlüssel:

```typescript
async function initializePurchases() {
  await Purchases.configure({
    apiKey: 'YOUR_REVENUECAT_API_KEY',
  });
}
```

Rufe diese Funktion auf, wenn deine App startet, zum Beispiel in der `ngOnInit()`-Methode deiner Hauptkomponente.

## Grundlegende Verwendung

### Verfügbare Produkte abrufen

Um die Liste der verfügbaren Produkte zu erhalten:

```typescript
async function getProducts() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      const products = offerings.current.availablePackages;
      console.log('Available products:', products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
```

### Einen Kauf tätigen

Um einen Kauf einzuleiten:

```typescript
async function purchasePackage(package: PurchasesPackage) {
  try {
    const { customerInfo, productIdentifier } = await Purchases.purchasePackage({ aPackage: package });
    console.log('Purchase successful:', productIdentifier);
    console.log('Customer Info:', customerInfo);
  } catch (error) {
    console.error('Error making purchase:', error);
  }
}
```

### Abonnementsstatus überprüfen

Um den aktuellen Abonnementsstatus des Nutzers zu überprüfen:

```typescript
async function checkSubscriptionStatus() {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const activeSubscriptions = customerInfo.activeSubscriptions;
    console.log('Active subscriptions:', activeSubscriptions);
  } catch (error) {
    console.error('Error checking subscription status:', error);
  }
}
```

### Käufe wiederherstellen

Um die vorherigen Käufe eines Nutzers wiederherzustellen:

```typescript
async function restorePurchases() {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    console.log('Purchases restored:', customerInfo);
  } catch (error) {
    console.error('Error restoring purchases:', error);
  }
}
```

## Erweiterte Funktionen

### Nutzer identifizieren

Wenn du dein eigenes Nutzer-ID-System hast, kannst du Nutzer bei RevenueCat identifizieren:

```typescript
async function identifyUser(userId: string) {
  try {
    const { customerInfo } = await Purchases.logIn({ appUserID: userId });
    console.log('User identified:', customerInfo);
  } catch (error) {
    console.error('Error identifying user:', error);
  }
}
```

### Überprüfen der Berechtigung für Einführungsangebote

Um zu überprüfen, ob ein Nutzer für ein Einführungsangebot berechtigt ist:

```typescript
async function checkIntroEligibility(productIdentifiers: string[]) {
  try {
    const eligibility = await Purchases.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers });
    console.log('Introductory price eligibility:', eligibility);
  } catch (error) {
    console.error('Error checking eligibility:', error);
  }
}
```

### Attribute setzen

Du kannst benutzerdefinierte Attribute für Nutzer setzen:

```typescript
async function setUserAttributes() {
  try {
    await Purchases.setAttributes({
      'user_level': '5',
      'user_type': 'premium'
    });
    console.log('Attributes set successfully');
  } catch (error) {
    console.error('Error setting attributes:', error);
  }
}
```

## Fazit

Dieses Tutorial behandelte die Grundlagen der Implementierung von In-App-Käufen und Abonnements mit dem Paket `@revenuecat/purchases-capacitor`. Denke daran, Fehler angemessen zu behandeln und deine Implementierung gründlich zu testen.

Für fortgeschrittene Nutzung und detaillierte API-Dokumentation siehe die RevenueCat-Dokumentation unter https://docsrevenuecatcom/.

Vergiss nicht, deine Produkte im RevenueCat-Dashboard zu konfigurieren und sie mit deinen App-Store-Produkten zu verknüpfen. Stelle auch sicher, dass du deine Implementierung in einer Sandbox-Umgebung testest, bevor du sie in die Produktion überführst.