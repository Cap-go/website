---
slug: setup-stripe-payment-in-us-capacitor
title: >-
  Implementierung von Stripe-Zahlungslinks in Capacitor-Apps gemäß neuen
  Apple-Richtlinien
description: >-
  Erfahren Sie, wie Sie Stripe-Zahlungslinks in Ihrer Capacitor-App
  implementieren, um Zahlungen für digitale Waren gemäß den neuen
  Apple-Richtlinien, die am 1. Mai 2025 in Kraft treten, zu bearbeiten.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-11-21T17:43:20.000Z
head_image: /stripe_apple.webp
head_image_alt: Stripe-Zahlungsimplementierung in Capacitor-Apps
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: de
---
# Implementierung von Stripe-Zahlungslinks in Capacitor-Apps gemäß den neuen Richtlinien von Apple

Seit dem 1. Mai 2025 hat Apple bedeutende Änderungen an seinen App-Store-Bewertung Richtlinien vorgenommen, nachdem das Gericht im Fall [Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf) entschieden hat. Diese Änderungen ermöglichen es App-Entwicklern in den Vereinigten Staaten, externe Zahlungsmethoden für digitale Güter und Dienstleistungen anzubieten, und eröffnen Alternativen zu Apples In-App-Kaufsystem.

## Die epische Schlacht, die die Mobile Payments für immer verändert hat

Der Weg zu diesem Moment war lang und umstritten. Alles begann im August 2020, als Epic Games, der Schöpfer des äußerst beliebten Spiels Fortnite, absichtlich die Richtlinien des Apple App Stores verletzte, indem es eine direkte Zahlungsoption implementierte, die die 30%-Provision von Apple umging. Apple entfernte Fortnite umgehend aus dem App Store, und Epic reagierte, indem es eine Klage einreichte, die die Kontrolle von Apple über die iOS-App-Verteilung und In-App-Zahlungen in Frage stellte.

Nach Jahren von Rechtsstreitigkeiten, Berufungen und Gegenberufungen entschied das Gericht schließlich, dass Apple Entwicklern erlauben muss, Benutzer zu alternativen Zahlungsmethoden außerhalb ihrer Apps zu leiten. Diese Entscheidung verändert grundlegend die wirtschaftlichen Gegebenheiten des App-Store-Ökosystems, das seit seiner Gründung im Jahr 2008 nach demselben grundlegenden Finanzmodell betrieben wird.

### Das abschließende Urteil - Keine weiteren Berufungen

Was dieses Urteil besonders signifikant macht, ist, dass es endgültig ist und nicht weiter angefochten werden kann. Der Oberste Gerichtshof lehnte es ab, die Berufung von Apple zu hören, und besiegelte damit die Entscheidung des unteren Gerichts als Gesetz. Das bedeutet, dass Entwickler externe Zahlungsmethoden mit dem Vertrauen implementieren können, dass Apple diese Entscheidung nicht durch weitere rechtliche Herausforderungen zurücknehmen kann.

### Gleichbehandlung durch das Gesetz garantiert

Am wichtigsten ist, dass das Urteil ausdrücklich feststellt, dass Apple Apps, die externe Zahlungsmethoden verwenden, nicht diskriminieren kann. Das Gericht verbot Apple ausdrücklich:

1. Zusätzliche Gebühren zu verlangen oder zusätzliche Anforderungen an Apps zu stellen, die externe Zahlungsmethoden nutzen
2. Bevorzugte Behandlung in den Suchergebnissen oder Hervorhebungen für Apps zu geben, die ausschließlich Apples IAP-System verwenden
3. Technische Maßnahmen zu ergreifen, um externe Zahlungserlebnisse den eigenen Systemen von Apple unterlegen zu machen
4. Belastende Offenlegungspflichten über grundlegende Verbraucherinformationen hinaus aufzuerlegen

Diese ausdrücklichen Schutzmaßnahmen bedeuten, dass Entwickler Stripe oder andere externe Zahlungsanbieter ohne Angst vor subtilen Repressalien oder Diskriminierung durch Apple implementieren können. Das Spielfeld wurde rechtlich geebnet, und Apple muss alle Apps gleich behandeln, unabhängig von ihren Zahlungswahlen.

Das Urteil stellt eine der bedeutendsten Herausforderungen für Apples geschlossene Gartenansatz dar und markiert einen entscheidenden Wandel, wie die Monetarisierung von mobilen Apps funktionieren kann. Für Entwickler, die sich lange über die 30%-Provision von Apple (auf 15% für kleine Unternehmen gesenkt) beschwert haben, bietet dieses Urteil einen Weg zu höheren Gewinnmargen und mehr Kontrolle über das Kundenerlebnis.

## Finanzielle Vorteile der Nutzung von Stripe gegenüber Apples In-App-Käufen

Die finanziellen Auswirkungen dieser Änderung sind für Entwickler erheblich:

- **Reduzierte Zahlungsabwicklungsgebühren**: Apple erhebt normalerweise eine Provision von 30% auf In-App-Käufe (15% für kleine Unternehmen), während die Gebühr von Stripe nur etwa 2,9% + 0,30 $ pro Transaktion beträgt. Dieser Unterschied kann Ihre Umsatzmargen erheblich steigern.
  
- **Schnellere Auszahlungen**: Bei Apple warten Sie normalerweise 45-90 Tage auf den Erhalt Ihrer Gelder. Stripe hingegen überweist Zahlungen innerhalb von 2-3 Geschäftstagen auf Ihr Bankkonto.

- **Vereinfachter Rückerstattungsprozess**: Bearbeiten Sie Rückerstattungen direkt über das Dashboard von Stripe, anstatt durch Apples komplexeres Rückerstattungssystem zu gehen.

Diese Kosteneinsparungen und verbesserten Cashflow können für kleinere Entwickler und Unternehmen entscheidend sein.

In diesem Artikel werden wir untersuchen, wie Sie Stripe-Zahlungslinks in Ihrer Capacitor-App implementieren können, um von diesen neuen Regeln zu profitieren und gleichzeitig die [aktualisierten Richtlinien](https://developer.apple.com/app-store/review/guidelines/#business) von Apple einzuhalten.

> Diese Implementierung basiert auf [Stipes offizieller Dokumentation für Zahlungslinks](https://docs.stripe.com/mobile/digital-goods/payment-links), die speziell für Capacitor-Apps angepasst wurde.

## Die neuen Richtlinien verstehen

Die aktualisierten App-Store-Bewertung Richtlinien erlauben es Entwicklern nun, Benutzer auf externe Websites zur Zahlungsabwicklung zu leiten, insbesondere für digitale Güter und Abonnements. Diese Änderung gilt derzeit nur für Apps, die im US-App-Store vertrieben werden.

Wichtige Punkte zu beachten:

1. Sie können jetzt externe Zahlungsoptionen für digitale Güter innerhalb Ihrer App verknüpfen
2. Dies gilt nur für Apps im US-App Store
3. Sie müssen weiterhin die Offenlegungspflichten von Apple einhalten
4. Sie sind weiterhin für den gesamten Kundenservice und die Bearbeitung von Rückerstattungen verantwortlich

## Stripe-Zahlungslinks in Ihrer Capacitor-App einrichten

Lassen Sie uns in die technische Implementierung eintauchen:

### Schritt 1: Erstellen Sie einen Zahlungslink im Stripe-Dashboard

Erstellen Sie zunächst einen Zahlungslink in Ihrem Stripe-Dashboard:

1. Navigieren Sie zum Abschnitt Zahlungslinks in Ihrem Stripe-Dashboard
2. Klicken Sie auf "+ Neu", um einen neuen Zahlungslink zu erstellen
3. Definieren Sie die Details Ihres Produkts oder Abonnements
4. Wählen Sie unter den Einstellungen "Nach Zahlung" die Option "Bestätigungsseite nicht anzeigen"
5. Setzen Sie einen universellen Link als Ihre Erfolgs-URL (wir konfigurieren dies später)
6. Klicken Sie auf "Link erstellen", um Ihren Zahlungslink zu generieren

### Schritt 2: Richten Sie universelle Links in Ihrer Capacitor-App ein

Um Benutzer nach Abschluss der Zahlung zurück zu Ihrer App umzuleiten, konfigurieren Sie universelle Links:

1. Erstellen Sie eine Datei `apple-app-site-association` auf Ihrer Domain:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": ["YOURTEAMID.com.yourdomain.yourapp"],
        "components": [
          {
            "/": "/checkout_redirect*",
            "comment": "Matches any URL whose path starts with /checkout_redirect"
          }
        ]
      }
    ]
  }
}
```

2. Hosten Sie diese Datei unter `https://yourdomain.com/.well-known/apple-app-site-association`

3. Stellen Sie sicher, dass sie mit dem richtigen MIME-Typ `application/json` bereitgestellt wird

4. Konfigurieren Sie Ihre Capacitor-App, um universelle Links zu handhaben, indem Sie die richtigen Berechtigungen hinzufügen. Zuerst in Ihrer `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Your existing app configuration (appId, appName, etc.)
  plugins: {
    Geolocation: {
      // Request precise location access on iOS
      iosLocationAccuracy: 'reduced'
    }
  }
};

export default config;
```

5. Fügen Sie die Berechtigung für Assoziierte Domains zu Ihrem Xcode-Projekt hinzu:
   - Öffnen Sie Ihr Xcode-Projekt
   - Wählen Sie Ihr App-Ziel aus
   - Gehen Sie zu "Signing & Capabilities"
   - Klicken Sie auf "+ Capability" und wählen Sie "Associated Domains"
   - Fügen Sie `applinks:yourdomain.com` hinzu

### Schritt 3: Erstellen Sie eine Fallback-Seite

Erstellen Sie eine Fallback-Seite unter der Umleitungs-URL, um Fälle zu handhaben, in denen die App nicht installiert ist:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0;url=https://yourdomain.com/app-download">
</head>
<body>
  <p>Redirecting to download page...</p>
</body>
</html>
```

### Schritt 4: Implementieren Sie die Schaltfläche zur Zahlung in Ihrer Capacitor-App

Fügen Sie nun die Schaltfläche zur Zahlung in Ihre App ein:

```typescript
import { Capacitor } from '@capacitor/core';

export async function openPaymentLink(userEmail, userId) {
  // Use your actual Stripe payment link
  const baseUrl = 'https://buy.stripe.com/your_payment_link';
  
  // Add URL parameters to customize the experience
  const params = new URLSearchParams({
    prefilled_email: encodeURIComponent(userEmail),
    client_reference_id: userId
  });

  const fullUrl = `${baseUrl}?${params.toString()}`;
  
  // Simple window.open works in both web and Capacitor
  // Using _blank opens in Safari on iOS which is important for users with saved Stripe Link credentials
  window.open(fullUrl, '_blank');
}
```

> **Warum Safari wichtig ist**: Das Öffnen des Zahlungslinks in Safari (über `window.open`) anstelle eines In-App-Browsers ist vorteilhaft, da Benutzer, die ihre Zahlungsinformationen zuvor bei Stripe Link gespeichert haben, ihre Anmeldeinformationen automatisch zur Verfügung haben. Dies schafft ein reibungsloses Checkout-Erlebnis, bei dem Benutzer ihre Kreditkarteninformationen nicht erneut eingeben müssen, was die Reibungsverluste und Abbruchraten erheblich senkt.

### Schritt 5: Handhaben Sie universelle Links in Ihrer App

Konfigurieren Sie Ihre App so, dass sie die universellen Links verarbeitet, wenn Benutzer zurückgeleitet werden:

1. Zuerst installieren Sie das App-Plugin:

```bash
npm install @capacitor/app
```

2. Registrieren Sie das App-Plugin in Ihrer App:

```typescript
import { App } from '@capacitor/app';

// In your initialization code
App.addListener('appUrlOpen', (event) => {
  // Example URL: https://yourdomain.com/checkout_redirect?session_id=cs_test_...
  const url = new URL(event.url);
  
  if (url.pathname.startsWith('/checkout_redirect')) {
    // Extract any parameters you need
    const params = new URLSearchParams(url.search);
    const sessionId = params.get('session_id');
    
    // Handle successful payment
    if (sessionId) {
      // Verify the payment on your server if needed
      verifyPayment(sessionId);
      
      // Update UI to reflect successful purchase
      updatePurchaseStatus(true);
    }
  }
});

async function verifyPayment(sessionId) {
  // Call your backend to verify the payment
  // This is optional if you're relying on webhooks
}

function updatePurchaseStatus(success) {
  // Update your app UI to reflect purchase status
}
```

### Schritt 6: Richten Sie einen Webhook für die Auftragsabwicklung ein

Konfigurieren Sie schließlich einen Webhook auf Ihrem Server, um erfolgreiche Zahlungen zu verarbeiten:

```javascript
// Using Express.js as an example
const express = require('express');
const stripe = require('stripe')('sk_test_your_stripe_secret_key');
const app = express();

// Use raw body parser for webhook signature verification
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = 'whsec_your_webhook_secret';
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Retrieve client_reference_id (your user ID)
    const userId = session.client_reference_id;
    
    // Grant access to the purchased content
    await grantAccess(userId, session.id);
  }
  
  res.status(200).send();
});

async function grantAccess(userId, sessionId) {
  // Your logic to grant access to the purchased content
  // This could be updating a database, sending a notification, etc.
}

app.listen(3000, () => console.log('Webhook server running on port 3000'));
```

## Android-Kompatibilität

Eines ist klar: Das Urteil im Fall Epic v. Apple hat die Landschaft der mobilen Zahlungen grundlegend verändert. Es betrifft nicht nur iOS-Apps direkt, sondern stärkt auch die Position von Android-Entwicklern, die externe Zahlungsmethoden verwenden.

**Android-Entwickler können nun externe Zahlungslösungen mit vollem Vertrauen implementieren.** Der durch das Apple-Urteil geschaffene Präzedenzfall schützt Entwickler auf allen Plattformen vor möglichen zukünftigen Einschränkungen. Diese gerichtliche Entscheidung hat validiert, was viele Android-Entwickler seit Jahren tun - alternative Zahlungsmethoden mit niedrigeren Gebühren anzubieten.

Der Google Play Store war schon immer weniger restriktiv gegenüber externen Zahlungsmethoden als Apple, und jetzt, da der rechtliche Präzedenzfall geschaffen wurde, gibt es praktisch kein Risiko bei der Implementierung von Stripe oder anderen externen Zahlungsanbietern in Ihren Android-Apps. Sie können mit diesen Implementierungen fortfahren, in dem Wissen, dass Sie auf festem rechtlichem Boden stehen.

Die Implementierung, die wir für iOS behandelt haben, funktioniert nahezu identisch für Android-Geräte. Da der Google Play Store keine gleichen Einschränkungen für externe Zahlungsmethoden hat, können Sie denselben Ansatz für Stripe-Zahlungslinks verwenden, ohne spezielle Offenlegungsdialoge zu benötigen.

Um das Deep Linking (entspricht den universellen Links auf iOS) zu handhaben, müssen Sie:

1. App-Links in Ihrer `AndroidManifest.xml` einrichten, um die Umleitungs-URL zu verarbeiten
2. Eine Datei `.well-known/assetlinks.json` auf Ihrer Domain mit den Details Ihrer App erstellen
3. dieselbe Logik für den Listener `appUrlOpen` verwenden, um erfolgreiche Zahlungen zu verarbeiten

Die Schönheit von Capacitor ist, dass, sobald Sie die plattform-spezifischen Konfigurationen implementiert haben, der tatsächliche Zahlungsflusscode auf beiden Plattformen gleich bleibt.

## Erstellung einer Zahlungsbenutzeroberfläche

Hier ist ein Beispiel für eine Zahlungsbuttons-Komponente in Vue, die Sie zu Ihrer Capacitor-App hinzufügen können:

```vue
<template>
  <div class="payment-container">
    <div class="pricing-card">
      <h2 class="mb-4 text-xl font-bold">{{ product.name }}</h2>
      <p class="mb-6 text-gray-600">{{ product.description }}</p>
      <div class="mb-6 price-tag">
        <span class="text-2xl font-bold">${{ product.price }}</span>
        <span v-if="product.isSubscription" class="text-sm text-gray-500">/month</span>
      </div>
      <button 
        @click="handlePayment" 
        class="py-3 w-full font-medium text-white bg-indigo-600 rounded-lg transition-colors hover:bg-indigo-700"
      >
        Purchase Now
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog } from '@capacitor/dialog';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  userEmail: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    required: true
  }
});

const isLoading = ref(false);

async function showExternalPaymentDisclosure() {
  const { value } = await Dialog.confirm({
    title: 'Leaving App for Payment',
    message: 'You are about to leave this app to make a payment. Apple is not responsible for the privacy or security of payments that are not made through the App Store. All payment-related issues, including refunds, must be handled by our support team.',
    okButtonTitle: 'Continue',
    cancelButtonTitle: 'Cancel'
  });
  
  return value;
}

async function openPaymentLink() {
  // Use your actual Stripe payment link
  const baseUrl = 'https://buy.stripe.com/your_payment_link';
  
  // Add URL parameters to customize the experience
  const params = new URLSearchParams({
    prefilled_email: encodeURIComponent(props.userEmail),
    client_reference_id: props.userId
  });

  const fullUrl = `${baseUrl}?${params.toString()}`;
  
  // Simple window.open works in both web and Capacitor
  // Using _blank opens in Safari on iOS which is important for users with saved Stripe Link credentials
  window.open(fullUrl, '_blank');
}

async function handlePayment() {
  isLoading.value = true;
  try {
    // Only show the disclosure on iOS
    if (window.Capacitor?.getPlatform() === 'ios') {
      const userConfirmed = await showExternalPaymentDisclosure();
      if (!userConfirmed) return;
    }
    
    await openPaymentLink();
  } catch (error) {
    console.error('Payment error:', error);
    await Dialog.alert({
      title: 'Payment Error',
      message: 'There was an error initiating the payment. Please try again.'
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
```

## Handhabung verschiedener Regionen

Da die neuen Apple-Richtlinien nur für Apps im US-App Store gelten, benötigen Sie eine Strategie, um die Benutzerregionen zu erkennen und die entsprechende Zahlungsmethode anzuwenden. Hier ist ein zuverlässigerer Ansatz mit IP-Geolokalisierung:

```typescript
import { Capacitor } from '@capacitor/core';

async function determinePaymentMethod() {
  // Always use Stripe for Android
  if (Capacitor.getPlatform() !== 'ios') {
    return 'external';
  }
  
  try {
    // Use a geolocation service to determine user's country
    const response = await fetch('https://ipapi.co/json/');
    const locationData = await response.json();
    
    // Check if the user is in the United States
    if (locationData.country_code === 'US') {
      return 'external'; // Can use Stripe Payment Links
    } else {
      return 'iap'; // Must use In-App Purchases
    }
  } catch (error) {
    console.error('Error detecting region:', error);
    return 'iap'; // Default to IAP to be safe
  }
}

export async function processPayment(product, userEmail, userId) {
  const paymentMethod = await determinePaymentMethod();
  
  if (paymentMethod === 'external') {
    // Use Stripe Payment Links
    await initiateExternalPayment(userEmail, userId);
  } else {
    // Use Apple's In-App Purchase
    await initiateInAppPurchase(product.appleProductId);
  }
}
```

Dieser Ansatz nutzt den kostenlosen Dienst `ipapi.co`, um das Land des Benutzers basierend auf seiner IP-Adresse zu bestimmen. Sie könnten auch andere Geolokalisierungsdienste wie MaxMind verwenden oder diese Überprüfung serverseitig für zusätzliche Sicherheit implementieren.

> **Hinweis**: Obwohl dieser Ansatz funktioniert, ist es wichtig zu beachten, dass die IP-Geolokalisierung nicht immer zu 100 % genau ist. Für mission-kritische Anwendungen sollten Sie in Betracht ziehen, mehrere Erkennungsmethoden zu verwenden oder den Nutzern zu ermöglichen, ihre Region manuell auszuwählen.

### Genauere Standorterkennung mit Capacitor Plugins

Für eine genauere Standorterkennung können Sie das Capacitor Geolocation Plugin zusammen mit @capgo/nativegeocoder verwenden, um das Land des Nutzers mit höherer Präzision zu bestimmen:

1. Zunächst die erforderlichen Plugins installieren:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Die Plugins in Ihrem Capacitor-Projekt konfigurieren. Fügen Sie Folgendes zu Ihrer `capacitor.config.ts` hinzu:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Your existing app configuration (appId, appName, etc.)
  plugins: {
    Geolocation: {
      // Request precise location access on iOS
      iosLocationAccuracy: 'reduced'
    }
  }
};

export default config;
```

3. Die standortbasierte Regionsbestimmung implementieren:

```typescript
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder } from '@capgo/nativegeocoder';

async function isUserInUSA() {
  try {
    // Request permission first
    const permissionStatus = await Geolocation.requestPermissions();
    
    if (permissionStatus.location === 'granted') {
      // Get current position
      const position = await Geolocation.getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: false
      });
      
      // Use NativeGeocoder to reverse geocode the coordinates
      const results = await NativeGeocoder.reverseGeocode({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        useLocale: true,
        maxResults: 1
      });
      
      if (results.addresses.length > 0) {
        // Check if the user is in the USA
        return results.addresses[0].countryCode === 'US';
      }
    }
    
    // If we couldn't determine location or permission denied, fall back to IP detection
    return await isUserInUSAByIP();
  } catch (error) {
    console.error('Error detecting location:', error);
    // Fall back to IP detection on error
    return await isUserInUSAByIP();
  }
}

async function isUserInUSAByIP() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code === 'US';
  } catch (error) {
    console.error('Error detecting IP location:', error);
    return false; // Default to false to be safe
  }
}

export async function determinePaymentMethod() {
  // Always use Stripe for Android
  if (Capacitor.getPlatform() !== 'ios') {
    return 'external';
  }
  
  // Check if user is in the USA
  const isUSA = await isUserInUSA();
  return isUSA ? 'external' : 'iap';
}

export async function processPayment(product, userEmail, userId) {
  const paymentMethod = await determinePaymentMethod();
  
  if (paymentMethod === 'external') {
    // Use Stripe Payment Links
    await initiateExternalPayment(userEmail, userId);
  } else {
    // Use Apple's In-App Purchase
    await initiateInAppPurchase(product.appleProductId);
  }
}
```

Diese Implementierung bietet eine genauere Möglichkeit festzustellen, ob sich ein Nutzer physisch in den Vereinigten Staaten befindet. Sie versucht zuerst, das GPS des Geräts und den nativen Geocoder zu verwenden, um das Land zu bestimmen. Wenn das fehlschlägt (aufgrund von Berechtigungsproblemen oder anderen Fehlern), wird auf die IP-basierte Erkennung zurückgegriffen.

Denken Sie daran, die erforderlichen Berechtigungen zu Ihrer `info.plist` (iOS) und `AndroidManifest.xml` (Android) hinzuzufügen:

Für iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Für Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Mit diesem Ansatz erhalten Sie die genaueste Möglichkeit, festzustellen, ob ein Benutzer berechtigt ist, externe Zahlungsoptionen gemäß den neuen Apple-Richtlinien zu nutzen.

## Verwaltung von Abonnements

Ein wesentlicher Vorteil der Verwendung von Stripe für Zahlungen ist die Möglichkeit, Abonnements anzubieten und zu verwalten. So verwalten Sie das Abonnementsystem in Ihrer Capacitor-App:

### 1. Erstellen einer Seite zur Verwaltung von Abonnements

Fügen Sie in Ihrer App eine Seite zur Verwaltung von Abonnements hinzu, um die aktiven Abonnements des Nutzers anzuzeigen:

```vue
<template>
  <div class="subscription-manager">
    <div v-if="isLoading" class="loading-indicator">
      Loading subscription data...
    </div>
    
    <div v-else-if="subscription" class="subscription-info">
      <h2 class="mb-4 text-xl font-bold">Your Subscription</h2>
      
      <div class="mb-6 plan-details">
        <p><span class="font-medium">Plan:</span> {{ subscription.planName }}</p>
        <p><span class="font-medium">Status:</span> {{ subscription.status }}</p>
        <p><span class="font-medium">Renews:</span> {{ formatDate(subscription.currentPeriodEnd) }}</p>
      </div>
      
      <button 
        @click="manageSubscription" 
        class="py-3 w-full font-medium text-white bg-indigo-600 rounded-lg transition-colors hover:bg-indigo-700"
      >
        Manage Subscription
      </button>
    </div>
    
    <div v-else class="no-subscription">
      <p class="mb-4">You don't have an active subscription.</p>
      <button 
        @click="goToPricingPage" 
        class="py-3 w-full font-medium text-white bg-indigo-600 rounded-lg transition-colors hover:bg-indigo-700"
      >
        View Plans
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserSubscription } from '../services/subscription';

const subscription = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const userData = await getUserSubscription();
    subscription.value = userData.subscription;
  } catch (error) {
    console.error('Failed to load subscription:', error);
  } finally {
    isLoading.value = false;
  }
});

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

function manageSubscription() {
  // Open Stripe Customer Portal
  window.open(subscription.value.portalUrl, '_blank');
}

function goToPricingPage() {
  // Navigate to pricing page
  // router.push('/pricing');
}
</script>
```

### 2. Kundenportal zur Verwaltung von Abonnements

Stripe bietet ein Kundenportal, mit dem Nutzer ihre Abonnements verwalten können. Sie können einen Link zu diesem Portal von Ihrem Server aus erstellen:

```javascript
// Server-side code (Node.js)
const stripe = require('stripe')('sk_your_stripe_secret_key');

async function createPortalSession(customerId) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'https://yourdomain.com/account',
  });
  
  return session.url;
}
```

## Sicherstellen der Einhaltung der App Store-Richtlinien

Um sicherzustellen, dass Ihre Implementierung den Richtlinien von Apple entspricht:

1. Fügen Sie geeignete Offenlegungen zu externen Käufen hinzu.
2. Implementieren Sie ein modales Fenster, das die Nutzer darüber informiert, dass sie die App verlassen (wie von Apple gefordert).
3. Versuchen Sie nicht, die Provision von Apple für Käufe innerhalb der App zu umgehen.
4. Kommunizieren Sie klar, dass Apple nicht für die Transaktion verantwortlich ist.

Hier ist ein Beispiel für die Implementierung des erforderlichen Offenlegungsmodals:

```typescript
import { Dialog } from '@capacitor/dialog';

async function showExternalPaymentDisclosure() {
  const { value } = await Dialog.confirm({
    title: 'Leaving App for Payment',
    message: 'You are about to leave this app to make a payment. Apple is not responsible for the privacy or security of payments that are not made through the App Store. All payment-related issues, including refunds, must be handled by our support team.',
    okButtonTitle: 'Continue',
    cancelButtonTitle: 'Cancel'
  });
  
  return value;
}

export async function initiateExternalPayment(userEmail, userId) {
  const userConfirmed = await showExternalPaymentDisclosure();
  
  if (userConfirmed) {
    await openPaymentLink(userEmail, userId);
  }
}
```

## Testen Ihrer Implementierung

Um Ihre Implementierung zu testen:

1. Klicken Sie auf Ihre Zahlungs-Schaltfläche in Ihrer App, die die Offenlegung anzeigen und dann die Stripe-Zahlungsseite öffnen sollte.
2. Schließen Sie eine Testzahlung mit der Stripe-Testkarte `4242 4242 4242 4242` ab.
3. Nach der Zahlung sollten Sie über den universellen Link zurück zu Ihrer App weitergeleitet werden.
4. Überprüfen Sie, ob Ihr Webhook das Ereignis `checkout.session.completed` empfangen hat.

## Fazit

Die Möglichkeit, externe Zahlungsoptionen für digitale Waren in iOS-Apps zu nutzen, ist eine signifikante Veränderung, die Entwicklern mehr Flexibilität bietet. Obwohl diese Änderung derzeit nur für Apps im U.S. App Store gilt, stellt sie eine wichtige Alternative zum In-App-Kaufsystem von Apple dar.

Durch die Verwendung von Stripe Payment Links mit Capacitor können Sie schnell ein optimiertes Zahlungserlebnis implementieren und gleichzeitig die Richtlinien von Apple einhalten. Dieser Ansatz bietet Ihnen auch den Vorteil der robusten Zahlungsinfrastruktur von Stripe, geringeren Verarbeitungskosten (3 % gegenüber 30 %) und viel schnelleren Auszahlungen (Tage anstelle von Monaten) im Vergleich zum In-App-Kaufsystem von Apple.

Denken Sie daran, dass Sie alle Kundenanfragen und Rückerstattungsprobleme direkt bearbeiten müssen, da diese Transaktionen außerhalb des Ökosystems von Apple stattfinden.

Haben Sie Stripe Payment Links in Ihrer Capacitor-App implementiert? Teilen Sie Ihre Erfahrungen in den Kommentaren unten!

## FAQs

**F: Ist dieser Ansatz mit den Richtlinien von Apple konform?**  
A: Ja, ab dem 1. Mai 2025 erlaubt Apple das Verlinken zu externen Zahlungsmethoden für digitale Waren und Dienstleistungen in Apps, die im U.S. App Store vertrieben werden, sofern Sie die erforderlichen Offenlegungen einfügen.

**F: Muss ich die Provision von Apple zahlen, wenn ich externe Zahlungsmethoden verwende?**  
A: Nein, einer der Hauptvorteile der neuen Regeln ist, dass Zahlungen, die außerhalb des Systems von Apple verarbeitet werden, nicht ihrer Provision unterliegen.

**F: Muss mein Unternehmen in den Vereinigten Staaten ansässig sein, um von diesen neuen Regeln zu profitieren?**  
A: Nein, jedes Unternehmen aus der ganzen Welt kann externe Zahlungsmethoden implementieren, solange Ihre App im US App Store verfügbar ist und die Nutzer, die die Käufe tätigen, sich in den Vereinigten Staaten befinden. Die Regelung gilt für den Marktplatz (US App Store) und den Standort der Nutzer, nicht für den Standort Ihres Unternehmens. Das bedeutet, dass Entwickler aus Europa, Asien, Südamerika oder anderen Orten Stripe Payment Links für ihre Kunden mit Sitz in den USA implementieren können.

**F: Was passiert, wenn ein Nutzer außerhalb der USA versucht, die externe Zahlungsoption zu nutzen?**  
A: Sie sollten die Regionsbestimmung implementieren (wie im Artikel gezeigt), um externen Zahlungsoptionen nur Nutzern in den USA anzubieten. Für andere Regionen sollten Sie weiterhin das In-App-Kaufsystem von Apple verwenden.

**F: Kann ich dies für physische Waren oder Dienstleistungen verwenden, die außerhalb der App konsumiert werden?**  
A: Ja, Apple hat externe Zahlungsmethoden für physische Waren und Dienstleistungen, die außerhalb der App konsumiert werden (wie Fahrgemeinschaften oder Essenslieferungen), immer erlaubt.
