---
slug: アメリカでのStripeペイメントの設定-Capacitor
title: Capacitorアプリでの新しいAppleガイドラインに従ったStripe Payment Linksの実装
description: >-
  Capacitorアプリで2025年5月1日から施行される新しいAppleのガイドラインに準拠してデジタル商品の支払いを処理するためのStripe
  Payment Linksの実装方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-05-01T00:00:00.000Z
head_image: /stripe_apple.webp
head_image_alt: Capacitorアプリケーションにおけるストライプ決済の実装
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: ja
original_slug: setup-stripe-payment-in-us-capacitor
---
# Implementierung von Stripe Payment Links in Capacitor Apps gemäß neuer Apple-Richtlinien

Ab dem 1. Mai 2025 hat Apple wichtige Änderungen an seinen App Store-Prüfrichtlinien nach dem Gerichtsurteil im [Epic v. Apple Fall](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf) umgesetzt. Diese Änderungen erlauben App-Entwicklern in den Vereinigten Staaten ausdrücklich, auf externe Zahlungsmethoden für digitale Waren und Dienstleistungen zu verlinken und bieten damit Alternativen zu Apples In-App-Kaufsystem.

## Der epische Kampf, der mobile Zahlungen für immer veränderte

Der Weg zu diesem Moment war lang und umstritten. Alles begann im August 2020, als Epic Games, der Entwickler des äußerst beliebten Spiels Fortnite, bewusst gegen Apples App Store-Richtlinien verstieß, indem sie eine direkte Zahlungsoption implementierten, die Apples 30%-Provision umging. Apple entfernte daraufhin Fortnite umgehend aus dem App Store, worauf Epic mit einer Klage reagierte, die Apples Kontrolle über iOS-App-Distribution und In-App-Zahlungen anfocht.

Nach Jahren von Rechtsstreitigkeiten, Berufungen und Gegenberufungen entschieden die Gerichte schließlich, dass Apple Entwicklern erlauben muss, Nutzer zu alternativen Zahlungsmethoden außerhalb ihrer Apps weiterzuleiten. Diese Entscheidung verändert grundlegend die Wirtschaftlichkeit des App Store-Ökosystems, das seit seiner Gründung 2008 nach dem gleichen grundlegenden Finanzmodell funktionierte.

### Das endgültige Urteil - Keine weiteren Berufungen

Was dieses Urteil besonders bedeutsam macht, ist seine Endgültigkeit ohne weitere Berufungsmöglichkeiten. Der Oberste Gerichtshof lehnte Anfang 2025 Apples Berufung ab und zementierte damit die Entscheidung des niedrigeren Gerichts als geltendes Recht. Dies bedeutet, dass Entwickler externe Zahlungsmethoden mit der Gewissheit implementieren können, dass Apple diese Entscheidung nicht durch weitere rechtliche Anfechtungen rückgängig machen kann.

### Gesetzlich garantierte Gleichbehandlung

Am wichtigsten ist, dass das Urteil ausdrücklich festlegt, dass Apple Apps, die externe Zahlungsmethoden nutzen, nicht diskriminieren darf. Das Gericht untersagte Apple ausdrücklich:

1. Zusätzliche Gebühren zu erheben oder zusätzliche Anforderungen an Apps zu stellen, die externe Zahlungsmethoden nutzen
2. Bevorzugte Behandlung in Suchergebnissen oder Hervorhebungen für Apps, die ausschließlich Apples IAP-System nutzen
3. Technische Maßnahmen zu ergreifen, um externe Zahlungserfahrungen gegenüber Apples eigenem System zu benachteiligen
4. Belastende Offenlegungspflichten aufzuerlegen, die über grundlegende Verbraucherinformationen hinausgehen

Diese expliziten Schutzmaßnahmen bedeuten, dass Entwickler Stripe oder andere externe Zahlungsanbieter implementieren können, ohne subtile Vergeltung oder Diskriminierung von Apple befürchten zu müssen. Das Spielfeld wurde rechtlich geebnet, und Apple muss alle Apps unabhängig von ihrer Wahl der Zahlungsmethode gleich behandeln.

Das Urteil stellt eine der bedeutendsten Herausforderungen für Apples Walled-Garden-Ansatz dar und markiert eine entscheidende Wende in der Monetarisierung mobiler Apps. Für Entwickler, die sich lange über Apples 30%-Provision (reduziert auf 15% für kleine Unternehmen) beschwert haben, bietet dieses Urteil einen Weg zu höheren Gewinnmargen und mehr Kontrolle über das Kundenerlebnis.

## Finanzielle Vorteile der Nutzung von Stripe gegenüber Apples In-App-Käufen

Die finanziellen Auswirkungen dieser Änderung sind für Entwickler erheblich:

- **Reduzierte Zahlungsabwicklungsgebühren**: Apple berechnet typischerweise eine Provision von 30% auf In-App-Käufe (15% für kleine Unternehmen), während Stripes Gebühr nur etwa 2,9% + 0,30 $ pro Transaktion beträgt. Dieser Unterschied kann Ihre Umsatzmargen deutlich erhöhen.
  
- **Schnellere Auszahlungen**: Bei Apple warten Sie typischerweise 45-90 Tage auf Ihre Gelder. Stripe hingegen überweist Zahlungen innerhalb von 2-3 Werktagen auf Ihr Bankkonto.

- **Vereinfachter Rückerstattungsprozess**: Bearbeiten Sie Rückerstattungen direkt über Stripes Dashboard anstatt über Apples komplexeres Rückerstattungssystem.

Diese Kosteneinsparungen und verbesserte Cashflow können besonders für kleinere Entwickler und Unternehmen spielentscheidend sein.

In diesem Artikel untersuchen wir, wie Sie Stripe Payment Links in Ihrer Capacitor-App implementieren können, um diese neuen Regeln zu nutzen, während Sie die Einhaltung von Apples [aktualisierten Richtlinien](https://developer.apple.com/app-store/review/guidelines/#business) sicherstellen.

> Diese Implementierung basiert auf [Stripes offizieller Dokumentation für Payment Links](https://docs.stripe.com/mobile/digital-goods/payment-links), speziell angepasst für Capacitor-Apps.

## Verstehen der neuen Richtlinien

Die aktualisierten App Store-Prüfrichtlinien erlauben Entwicklern nun, Nutzer für die Zahlungsabwicklung auf externe Websites weiterzuleiten, speziell für digitale Güter und Abonnements. Diese Änderung gilt derzeit nur für Apps, die im US App Store vertrieben werden.

Wichtige Punkte zum Verständnis:

1. Sie können jetzt innerhalb Ihrer App auf externe Zahlungsoptionen für digitale Güter verlinken
2. Dies gilt nur für Apps im US App Store
3. Sie müssen weiterhin Apples Offenlegungsanforderungen erfüllen
4. Sie bleiben für den gesamten Kundensupport und die Abwicklung von Rückerstattungen verantwortlich

## Einrichtung von Stripe Payment Links in Ihrer Capacitor App

Lassen Sie uns die technische Implementierung durchgehen:

### Schritt 1: Erstellen Sie einen Payment Link im Stripe Dashboard

Erstellen Sie zunächst einen Payment Link in Ihrem Stripe Dashboard:

1. Navigieren Sie zum Bereich Payment Links in Ihrem Stripe Dashboard
2. Klicken Sie auf "+ New", um einen neuen Payment Link zu erstellen
3. Definieren Sie Ihre Produkt- oder Abonnementdetails
4. Wählen Sie unter "After payment" die Option "Don't show confirmation page"
5. Setzen Sie einen Universal Link als Ihre Erfolgs-URL (wir konfigurieren dies später)
6. Klicken Sie auf "Create Link", um Ihren Payment Link zu generieren

## Android-Kompatibilität

Seien wir deutlich: Das Epic v. Apple Urteil hat die mobile Zahlungslandschaft grundlegend verändert. Es wirkt sich nicht nur direkt auf iOS-Apps aus, sondern stärkt auch die Position von Android-Entwicklern, die externe Zahlungsmethoden nutzen.

**Android-Entwickler können jetzt externe Zahlungslösungen mit voller Zuversicht implementieren.** Der durch das Apple-Urteil geschaffene Präzedenzfall schützt Entwickler plattformübergreifend vor möglichen zukünftigen Einschränkungen. Diese Gerichtsentscheidung hat bestätigt, was viele Android-Entwickler seit Jahren tun - alternative Zahlungsoptionen mit niedrigeren Gebühren anzubieten.

Der Google Play Store war schon immer weniger restriktiv in Bezug auf externe Zahlungsmethoden als Apple, und jetzt, mit dem etablierten rechtlichen Präzedenzfall, gibt es praktisch kein Risiko mehr bei der Implementierung von Stripe oder anderen externen Zahlungsanbietern in Ihren Android-Apps. Sie können mit diesen Implementierungen fortfahren, im Wissen, dass Sie sich auf rechtlich sicherem Boden befinden.

Die Implementierung, die wir für iOS behandelt haben, funktioniert nahezu identisch für Android-Geräte. Da der Google Play Store nicht die gleichen Einschränkungen für externe Zahlungsmethoden hat, können Sie den gleichen Stripe Payment Links-Ansatz ohne spezielle Offenlegungsdialoge verwenden.

Um das Deep Linking (äquivalent zu Universal Links auf iOS) zu handhaben, müssen Sie:

1. App Links in Ihrer `AndroidManifest.xml` einrichten, um die Weiterleitungs-URL zu verarbeiten
2. Eine `.well-known/assetlinks.json`-Datei auf Ihrer Domain mit den Details Ihrer App erstellen
3. Die gleiche `appUrlOpen`-Listener-Logik zur Verarbeitung erfolgreicher Zahlungen verwenden

Die Schönheit von Capacitor liegt darin, dass sobald Sie die plattformspezifischen Konfigurationen implementiert haben, der eigentliche Zahlungsablauf-Code auf beiden Plattformen gleich bleibt.

> **Hinweis**: Während dieser Ansatz funktioniert, ist es wichtig zu bedenken, dass IP-Geolokalisierung nicht immer 100% genau ist. Für geschäftskritische Anwendungen sollten Sie mehrere Erkennungsmethoden in Betracht ziehen oder Benutzern erlauben, ihre Region manuell auszuwählen.

### Genauere Standorterkennung mit Capacitor Plugins

Für eine genauere Standorterkennung können Sie das Capacitor Geolocation Plugin zusammen mit @capgo/nativegeocoder verwenden, um das Land des Benutzers mit höherer Präzision zu bestimmen:

1. Installieren Sie zunächst die erforderlichen Plugins:

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

2. Konfigurieren Sie die Plugins in Ihrem Capacitor-Projekt. Fügen Sie Folgendes zu Ihrer `capacitor.config.ts` hinzu:

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

3. Implementieren Sie die standortbasierte Regionserkennung:

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

Diese Implementierung bietet eine genauere Möglichkeit festzustellen, ob sich ein Benutzer physisch in den Vereinigten Staaten befindet. Zunächst wird versucht, das GPS des Geräts und den nativen Geocoder zu verwenden, um das Land zu bestimmen. Wenn dies fehlschlägt (aufgrund von Berechtigungsproblemen oder anderen Fehlern), wird auf IP-basierte Erkennung zurückgegriffen.

Denken Sie daran, die erforderlichen Berechtigungen zu Ihren `info.plist` (iOS) und `AndroidManifest.xml` (Android) Dateien hinzuzufügen:

Für iOS (`ios/App/App/Info.plist`):
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

Für Android (`android/app/src/main/AndroidManifest.xml`):
```bash
npm install @capacitor/app
```

Dieser Ansatz bietet die genaueste Möglichkeit festzustellen, ob ein Benutzer unter den neuen Apple-Richtlinien für externe Zahlungsoptionen berechtigt ist.

## Verwaltung von Abonnements

Ein wichtiger Vorteil der Verwendung von Stripe für Zahlungen ist die Möglichkeit, Abonnements anzubieten und zu verwalten. Hier erfahren Sie, wie Sie die Abonnementverwaltung in Ihrer Capacitor-App handhaben:

### 1. Erstellen einer Abonnementverwaltungsseite

Fügen Sie eine Abonnementverwaltungsseite in Ihrer App hinzu, um die aktiven Abonnements des Benutzers anzuzeigen:

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

### 2. Kundenportal für Abonnementverwaltung

Stripe bietet ein Kundenportal, das Benutzern die Verwaltung ihrer Abonnements ermöglicht. Sie können von Ihrem Server aus einen Link zu diesem Portal erstellen:

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

## Einhaltung der App Store-Richtlinien

Um sicherzustellen, dass Ihre Implementierung den Apple-Richtlinien entspricht:

1. Fügen Sie angemessene Hinweise zu externen Käufen hinzu
2. Implementieren Sie ein modales Fenster, das Benutzer darüber informiert, dass sie die App verlassen (wie von Apple gefordert)
3. Versuchen Sie nicht, Apples Provision bei In-App-Käufen zu umgehen
4. Kommunizieren Sie den Benutzern klar, dass Apple nicht für die Transaktion verantwortlich ist

Hier ist ein Beispiel für die Implementierung des erforderlichen Hinweismodals:

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
        class="w-full py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
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

## Testen Ihrer Implementierung

Um Ihre Implementierung zu testen:

1. Klicken Sie in Ihrer App auf den Zahlungsbutton, der den Hinweis anzeigen und dann die Stripe-Zahlungsseite öffnen sollte
2. Führen Sie eine Testzahlung mit der Stripe-Testkarte `4242 4242 4242 4242` durch
3. Nach der Zahlung sollten Sie über den Universal Link zurück zu Ihrer App weitergeleitet werden
4. Überprüfen Sie, ob Ihr Webhook das `checkout.session.completed` Ereignis empfangen hat

## Fazit

Die Möglichkeit, externe Zahlungsoptionen für digitale Güter in iOS-Apps zu nutzen, ist eine bedeutende Änderung, die Entwicklern mehr Flexibilität gibt. Während diese Änderung derzeit nur für Apps im US App Store gilt, bietet sie eine wichtige Alternative zu Apples In-App-Kaufsystem.

Durch die Verwendung von Stripe Payment Links mit Capacitor können Sie schnell ein optimiertes Checkout-Erlebnis implementieren und dabei die Compliance mit Apples Richtlinien gewährleisten. Dieser Ansatz bietet Ihnen auch den Vorteil von Stripes robuster Zahlungsinfrastruktur, niedrigeren Verarbeitungsgebühren (3% statt 30%) und deutlich schnelleren Auszahlungen (Tage statt Monate) im Vergleich zu Apples In-App-Kaufsystem.

Denken Sie daran, dass Sie allen Kundensupport und Rückerstattungsprobleme direkt handhaben müssen, da diese Transaktionen außerhalb von Apples Ökosystem stattfinden.

Haben Sie Stripe Payment Links in Ihrer Capacitor-App implementiert? Teilen Sie Ihre Erfahrungen in den Kommentaren unten!

## Häufig gestellte Fragen

**F: Entspricht dieser Ansatz den Apple-Richtlinien?**  
A: Ja, seit dem 1. Mai 2025 erlaubt Apple die Verlinkung zu externen Zahlungsmethoden für digitale Güter und Dienstleistungen in Apps, die im US App Store vertrieben werden, vorausgesetzt, Sie fügen die erforderlichen Hinweise hinzu.

**F: Muss ich Apples Provision bei der Verwendung externer Zahlungsmethoden zahlen?**  
A: Nein, einer der großen Vorteile der neuen Regeln ist, dass Zahlungen, die außerhalb von Apples System verarbeitet werden, nicht ihrer Provision unterliegen.

**F: Muss mein Unternehmen in den Vereinigten Staaten ansässig sein, um diese neuen Regeln nutzen zu können?**  
A: Nein, jedes Unternehmen aus der ganzen Welt kann externe Zahlungsmethoden implementieren, solange Ihre App im US App Store verfügbar ist und die Benutzer, die die Käufe tätigen, sich in den Vereinigten Staaten befinden. Die Regelung gilt für den Marktplatz (US App Store) und den Standort der Benutzer, nicht für den Standort Ihres Unternehmens. Das bedeutet, dass Entwickler aus Europa, Asien, Südamerika oder anderen Regionen Stripe Payment Links für ihre US-basierten Kunden implementieren können.

**F: Was passiert, wenn ein Benutzer außerhalb der USA versucht, die externe Zahlungsoption zu nutzen?**  
A: Sie sollten eine Regionserkennung implementieren (wie im Artikel gezeigt), um externe Zahlungsoptionen nur Benutzern in den USA anzubieten. Für andere Regionen sollten Sie weiterhin Apples In-App-Kaufsystem verwenden.

**F: Kann ich dies für physische Güter oder Dienstleistungen verwenden, die außerhalb der App konsumiert werden?**  
A: Ja, Apple hat schon immer externe Zahlungsmethoden für physische Güter und Dienstleistungen erlaubt, die außerhalb der App konsumiert werden (wie Mitfahrgelegenheiten oder Essenslieferungen).
