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
# Implementazione dei Link di Pagamento Stripe nelle App Capacitor secondo le Nuove Linee Guida Apple

A partire dal 1° maggio 2025, Apple ha implementato cambiamenti significativi alle sue Linee Guida per la Revisione dell'App Store a seguito della sentenza nel [caso Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). Questi cambiamenti permettono specificamente agli sviluppatori di app negli Stati Uniti di collegarsi a metodi di pagamento esterni per beni e servizi digitali, aprendo alternative al sistema di acquisti in-app di Apple.

## La Battaglia Epic che ha Cambiato per Sempre i Pagamenti Mobile

Il percorso fino a questo momento è stato lungo e controverso. Tutto è iniziato nell'agosto 2020 quando Epic Games, il creatore del popolarissimo gioco Fortnite, ha deliberatamente violato le linee guida dell'App Store di Apple implementando un'opzione di pagamento diretto che aggirava la commissione del 30% di Apple. Apple ha prontamente rimosso Fortnite dall'App Store ed Epic ha risposto intentando una causa che contestava il controllo di Apple sulla distribuzione delle app iOS e sui pagamenti in-app.

Dopo anni di battaglie legali, appelli e contro-appelli, i tribunali hanno finalmente stabilito che Apple deve permettere agli sviluppatori di indirizzare gli utenti verso metodi di pagamento alternativi al di fuori delle loro app. Questa decisione cambia fondamentalmente l'economia dell'ecosistema App Store, che operava secondo lo stesso modello finanziario di base dalla sua nascita nel 2008.

### La Sentenza Definitiva - Niente Più Appelli

Ciò che rende questa sentenza particolarmente significativa è che è definitiva e non può essere ulteriormente impugnata. La Corte Suprema ha rifiutato di esaminare l'appello di Apple all'inizio del 2025, consolidando la decisione della corte inferiore come legge del paese. Questo significa che gli sviluppatori possono implementare metodi di pagamento esterni con la certezza che Apple non possa ribaltare questa decisione attraverso ulteriori sfide legali.

### Parità di Trattamento Garantita dalla Legge

Cosa più importante, la sentenza stabilisce esplicitamente che Apple non può discriminare le app che utilizzano metodi di pagamento esterni. La corte ha specificamente vietato ad Apple di:

1. Addebitare commissioni aggiuntive o imporre requisiti extra alle app che utilizzano metodi di pagamento esterni
2. Dare trattamento preferenziale nei risultati di ricerca o in evidenza alle app che utilizzano esclusivamente il sistema IAP di Apple
3. Utilizzare misure tecniche per rendere le esperienze di pagamento esterne inferiori al proprio sistema
4. Imporre onerosi requisiti di divulgazione oltre alle informazioni base per i consumatori

Queste protezioni esplicite significano che gli sviluppatori possono implementare Stripe o altri fornitori di pagamento esterni senza timore di sottili ritorsioni o discriminazioni da parte di Apple. Il campo di gioco è stato legalmente livellato e Apple deve trattare tutte le app allo stesso modo indipendentemente dalle loro scelte di metodo di pagamento.

La sentenza rappresenta una delle sfide più significative all'approccio del giardino recintato di Apple e segna un cambiamento fondamentale nel funzionamento della monetizzazione delle app mobile. Per gli sviluppatori che si sono a lungo lamentati della commissione del 30% di Apple (ridotta al 15% per le piccole imprese), questa sentenza offre un percorso verso margini di profitto più elevati e maggior controllo sull'esperienza del cliente.

## Vantaggi Finanziari dell'Utilizzo di Stripe Rispetto agli Acquisti In-App di Apple

Le implicazioni finanziarie di questo cambiamento sono sostanziali per gli sviluppatori:

- **Commissioni di Elaborazione Pagamenti Ridotte**: Apple tipicamente addebita una commissione del 30% sugli acquisti in-app (15% per le piccole imprese), mentre la commissione di Stripe è solo circa 2.9% + €0.30 per transazione. Questa differenza può aumentare significativamente i tuoi margini di ricavo.
  
- **Pagamenti Più Rapidi**: Con Apple, tipicamente si attende 45-90 giorni per ricevere i fondi. Stripe, invece, deposita i pagamenti sul tuo conto bancario entro 2-3 giorni lavorativi.

- **Processo di Rimborso Semplificato**: Gestisci i rimborsi direttamente attraverso la dashboard di Stripe invece di passare attraverso il sistema di rimborso più complesso di Apple.

Questi risparmi sui costi e il miglioramento del flusso di cassa possono essere rivoluzionari, specialmente per gli sviluppatori e le imprese più piccole.

In questo articolo, esploreremo come implementare i Link di Pagamento Stripe nella tua app Capacitor per sfruttare queste nuove regole, assicurando al contempo la conformità con le [linee guida aggiornate](https://developer.apple.com/app-store/review/guidelines/#business) di Apple.

> Questa implementazione è basata sulla [documentazione ufficiale di Stripe per i Link di Pagamento](https://docs.stripe.com/mobile/digital-goods/payment-links), adattata specificamente per le app Capacitor.

## Comprendere le Nuove Linee Guida

Le Linee Guida aggiornate per la Revisione dell'App Store ora permettono agli sviluppatori di indirizzare gli utenti a siti web esterni per l'elaborazione dei pagamenti, specificamente per beni digitali e abbonamenti. Questo cambiamento è attualmente applicabile solo alle app distribuite nell'App Store degli Stati Uniti.

Punti chiave da comprendere:

1. Ora puoi collegare a opzioni di pagamento esterne per beni digitali all'interno della tua app
2. Questo si applica solo alle app nell'App Store U.S.
3. Devi comunque rispettare i requisiti di divulgazione di Apple
4. Rimani responsabile per tutto il supporto clienti e la gestione dei rimborsi

## Configurare i Link di Pagamento Stripe nella Tua App Capacitor

Analizziamo l'implementazione tecnica:

### Fase 1: Creare un Link di Pagamento nella Dashboard Stripe

Prima, crea un link di pagamento nella tua Dashboard Stripe:

1. Naviga alla sezione Payment Links nella tua Dashboard Stripe
2. Clicca "+ New" per creare un nuovo link di pagamento
3. Definisci i dettagli del tuo prodotto o abbonamento
4. Nelle impostazioni "After payment", seleziona "Don't show confirmation page"
5. Imposta un universal link come URL di successo (lo configureremo più tardi)
6. Clicca "Create Link" per generare il tuo link di pagamento

### Fase 2: Configurare Universal Links nella Tua App Capacitor

Per reindirizzare gli utenti alla tua app dopo il completamento del pagamento, configura gli universal links:

1. Crea un file `apple-app-site-association` sul tuo dominio:

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

2. Ospita questo file su `https://tuodominio.com/.well-known/apple-app-site-association`

3. Assicurati che sia servito con il tipo MIME corretto `application/json`

4. Configura la tua app Capacitor per gestire gli universal links aggiungendo l'autorizzazione appropriata. Prima, nel tuo `capacitor.config.ts`:

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

5. Aggiungi l'autorizzazione Associated Domains al tuo progetto Xcode:
   - Apri il tuo progetto Xcode
   - Seleziona il target della tua app
   - Vai a "Signing & Capabilities"
   - Clicca "+ Capability" e seleziona "Associated Domains"
   - Aggiungi `applinks:tuodominio.com`

### Fase 3: Creare una Pagina di Fallback

Crea una pagina di fallback all'URL di reindirizzamento per gestire i casi in cui l'app non è installata:

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

### Fase 4: Implementare il Pulsante di Pagamento nella Tua App Capacitor

Ora, aggiungi il pulsante di pagamento alla tua app:

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

> **Perché Safari è Importante**: Aprire il link di pagamento in Safari (tramite `window.open`) piuttosto che in un browser in-app è vantaggioso perché gli utenti che hanno precedentemente salvato le loro informazioni di pagamento con Stripe Link avranno le loro credenziali automaticamente disponibili. Questo crea un'esperienza di checkout più fluida dove gli utenti non dovranno reinserire le informazioni della carta di credito, riducendo significativamente l'attrito e i tassi di abbandono.

### Fase 5: Gestire Universal Links nella Tua App

Configura la tua app per gestire gli universal links quando gli utenti vengono reindirizzati:

1. Prima, installa il plugin App:

```bash
npm install @capacitor/app
```

2. Registra il plugin App nella tua app:

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

### Fase 6: Configurare Webhook per l'Evasione degli Ordini

Infine, configura un webhook sul tuo server per gestire i pagamenti riusciti:

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

## Compatibilità Android

Chiariamo: la sentenza Epic v. Apple ha fondamentalmente cambiato il panorama dei pagamenti mobile. Non solo impatta direttamente le app iOS, ma rafforza anche la posizione degli sviluppatori Android che hanno utilizzato metodi di pagamento esterni.

**Gli sviluppatori Android possono ora implementare soluzioni di pagamento esterne con completa fiducia.** Il precedente stabilito dalla sentenza Apple protegge effettivamente gli sviluppatori su tutte le piattaforme da potenziali restrizioni future. Questa decisione del tribunale ha convalidato ciò che molti sviluppatori Android fanno da anni - offrire opzioni di pagamento alternative con commissioni più basse.

Il Play Store di Google è sempre stato meno restrittivo riguardo ai metodi di pagamento esterni rispetto ad Apple, e ora con il precedente legale stabilito, non c'è praticamente alcun rischio nell'implementare Stripe o altri fornitori di pagamento esterni nelle tue app Android. Puoi procedere con queste implementazioni sapendo di essere su un terreno legale solido.

L'implementazione che abbiamo coperto per iOS funziona quasi identicamente per i dispositivi Android. Poiché il Google Play Store non ha le stesse restrizioni sui metodi di pagamento esterni, puoi utilizzare lo stesso approccio dei Link di Pagamento Stripe senza necessità di finestre di dialogo di divulgazione speciali.

Per gestire il deep linking (equivalente agli universal links su iOS), dovrai:

1. Configurare App Links nel tuo `AndroidManifest.xml` per gestire l'URL di reindirizzamento
2. Creare un file `.well-known/assetlinks.json` sul tuo dominio con i dettagli della tua app
3. Utilizzare la stessa logica del listener `appUrlOpen` per elaborare i pagamenti riusciti

La bellezza di Capacitor è che una volta implementate le configurazioni specifiche della piattaforma, il codice effettivo del flusso di pagamento rimane lo stesso su entrambe le piattaforme.

## Creare una UI di Pagamento

Ecco un esempio di un componente pulsante di pagamento in Vue che puoi aggiungere alla tua app Capacitor:

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

## Gestire Diverse Regioni

Poiché le nuove linee guida Apple si applicano solo alle app nell'App Store U.S., avrai bisogno di una strategia per rilevare le regioni degli utenti e applicare il metodo di pagamento appropriato. Ecco un approccio più affidabile utilizzando la geolocalizzazione IP:

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

Questo approccio utilizza il servizio gratuito `ipapi.co` per determinare il paese dell'utente basandosi sul loro indirizzo IP. Potresti anche utilizzare altri servizi di geolocalizzazione come MaxMind, o implementare questo controllo lato server per una maggiore sicurezza.

> **Nota**: Sebbene questo approccio funzioni, è importante ricordare che la geolocalizzazione IP non è sempre precisa al 100%. Per applicazioni mission-critical, considera l'utilizzo di metodi di rilevamento multipli o consenti agli utenti di selezionare manualmente la loro regione.

### Rilevamento della posizione più accurato con i plugin Capacitor

Per un rilevamento più accurato della posizione, puoi utilizzare il plugin Capacitor Geolocation insieme a @capgo/nativegeocoder per determinare il paese dell'utente con maggiore precisione:

1. Per prima cosa, installa i plugin necessari:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Configura i plugin nel tuo progetto Capacitor. Aggiungi quanto segue al tuo `capacitor.config.ts`:

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

3. Implementa il rilevamento della regione basato sulla posizione:

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

Questa implementazione fornisce un modo più accurato per determinare se un utente si trova fisicamente negli Stati Uniti. Prima tenta di utilizzare il GPS del dispositivo e il geocoder nativo per determinare il paese. Se questo fallisce (a causa di problemi di permessi o altri errori), ripiegherà sul rilevamento basato su IP.

Ricordati di aggiungere i permessi necessari ai file `info.plist` (iOS) e `AndroidManifest.xml` (Android):

Per iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Per Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Questo approccio ti offre il modo più accurato per determinare se un utente è idoneo per le opzioni di pagamento esterno secondo le nuove linee guida di Apple.

## Gestione degli abbonamenti

Uno dei vantaggi principali dell'utilizzo di Stripe per i pagamenti è la possibilità di offrire e gestire abbonamenti. Ecco come gestire gli abbonamenti nella tua app Capacitor:

### 1. Creazione di una pagina di gestione degli abbonamenti

Aggiungi una pagina di gestione degli abbonamenti nella tua app per visualizzare gli abbonamenti attivi dell'utente:

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
        class="w-full py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Manage Subscription
      </button>
    </div>
    
    <div v-else class="no-subscription">
      <p class="mb-4">You don't have an active subscription.</p>
      <button 
        @click="goToPricingPage" 
        class="w-full py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
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

### 2. Portale clienti per la gestione degli abbonamenti

Stripe offre un Portale Clienti che permette agli utenti di gestire i loro abbonamenti. Puoi creare un link a questo portale dal tuo server:

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

## Garantire la conformità con l'App Store

Per garantire che la tua implementazione sia conforme alle linee guida di Apple:

1. Includi le opportune informazioni sugli acquisti esterni
2. Implementa un foglio modale che informi gli utenti che stanno lasciando l'app (come richiesto da Apple)
3. Non tentare di aggirare la commissione di Apple sugli acquisti effettuati all'interno dell'app
4. Comunica chiaramente agli utenti che Apple non è responsabile della transazione

Ecco un esempio di implementazione del modale informativo richiesto:

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

## Test dell'implementazione

Per testare la tua implementazione:

1. Clicca sul pulsante di pagamento nella tua app, che dovrebbe mostrare l'informativa e poi aprire la pagina di pagamento Stripe
2. Completa un pagamento di test utilizzando la carta di test Stripe `4242 4242 4242 4242`
3. Dopo il pagamento, dovresti essere reindirizzato alla tua app tramite il link universale
4. Verifica che il tuo webhook abbia ricevuto l'evento `checkout.session.completed`

## Conclusione

La possibilità di utilizzare opzioni di pagamento esterne per i beni digitali nelle app iOS rappresenta un cambiamento significativo che offre maggiore flessibilità agli sviluppatori. Mentre questo cambiamento attualmente si applica solo alle app nell'App Store statunitense, fornisce un'importante alternativa al sistema di acquisti in-app di Apple.

Utilizzando Stripe Payment Links con Capacitor, puoi implementare rapidamente un'esperienza di checkout ottimizzata mantenendo la conformità con le linee guida di Apple. Questo approccio ti offre anche il vantaggio dell'infrastruttura di pagamento robusta di Stripe, commissioni di elaborazione più basse (3% invece del 30%) e pagamenti molto più rapidi (giorni invece di mesi) rispetto al sistema di acquisti in-app di Apple.

Ricorda che dovrai gestire direttamente tutto il supporto clienti e le questioni di rimborso, poiché queste transazioni avvengono al di fuori dell'ecosistema Apple.

Hai implementato Stripe Payment Links nella tua app Capacitor? Condividi la tua esperienza nei commenti qui sotto!

## FAQ

**D: Questo approccio è conforme alle linee guida di Apple?**  
R: Sì, dal 1° maggio 2025, Apple permette il collegamento a metodi di pagamento esterni per beni e servizi digitali nelle app distribuite nell'App Store statunitense, a condizione che si includano le informative richieste.

**D: Devo pagare la commissione di Apple quando uso metodi di pagamento esterni?**  
R: No, uno dei principali vantaggi delle nuove regole è che i pagamenti elaborati al di fuori del sistema Apple non sono soggetti alla loro commissione.

**D: La mia azienda deve avere sede negli Stati Uniti per approfittare di queste nuove regole?**  
R: No, qualsiasi azienda da qualsiasi parte del mondo può implementare metodi di pagamento esterni purché la tua app sia disponibile nell'App Store statunitense e gli utenti che effettuano gli acquisti si trovino negli Stati Uniti. La normativa si applica al marketplace (App Store USA) e alla posizione degli utenti, non alla posizione della tua azienda. Questo significa che gli sviluppatori dall'Europa, Asia, Sud America o da qualsiasi altra parte possono implementare Stripe Payment Links per i loro clienti basati negli Stati Uniti.

**D: Cosa succede se un utente al di fuori degli Stati Uniti cerca di utilizzare l'opzione di pagamento esterna?**  
R: Dovresti implementare il rilevamento della regione (come mostrato nell'articolo) per offrire opzioni di pagamento esterne solo agli utenti negli Stati Uniti. Per altre regioni, dovresti continuare a utilizzare il sistema di acquisti in-app di Apple.

**D: Posso usare questo per beni fisici o servizi consumati al di fuori dell'app?**  
R: Sì, Apple ha sempre permesso metodi di pagamento esterni per beni fisici e servizi consumati al di fuori dell'app (come il ride-sharing o la consegna di cibo).
