---
slug: setup-stripe-payment-in-us-capacitor
title: >-
  Implementando enlaces de pago de Stripe en aplicaciones de Capacitor siguiendo
  las nuevas directrices de Apple
description: >-
  Scopri come implementare i collegamenti per i pagamenti di Stripe nella tua
  app Capacitor per elaborare i pagamenti di beni digitali in conformità con le
  nuove linee guida di Apple in vigore dal 1 maggio 2025.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-05-01T00:00:00.000Z
head_image: /stripe_apple.webp
head_image_alt: Implementación de pagos con Stripe en aplicaciones de Capacitor
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: it
---
# Implementazione dei collegamenti ai pagamenti Stripe nelle app Capacitor seguendo le nuove linee guida di Apple

A partire dal 1 maggio 2025, Apple ha implementato cambiamenti significativi alle sue linee guida per la revisione dell'App Store in seguito alla sentenza nel caso [Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). Questi cambiamenti consentono specificamente agli sviluppatori di app negli Stati Uniti di collegarsi a metodi di pagamento esterni per beni e servizi digitali, aprendo alternative al sistema di acquisto in-app di Apple.

## La battaglia epica che ha cambiato per sempre i pagamenti mobili

Il percorso verso questo momento è stato lungo e controverso. Tutto è cominciato nell'agosto 2020 quando Epic Games, il creatore del popolarissimo gioco Fortnite, ha violato deliberatamente le linee guida dell'App Store di Apple implementando un'opzione di pagamento diretto che aggirava la commissione del 30% di Apple. Apple ha prontamente rimosso Fortnite dall'App Store e Epic ha risposto presentando una causa che contestava il controllo di Apple sulla distribuzione delle app iOS e sui pagamenti in-app.

Dopo anni di battaglie legali, appelli e contro-appelli, i tribunali hanno finalmente stabilito che Apple deve consentire agli sviluppatori di indirizzare gli utenti verso metodi di pagamento alternativi al di fuori delle loro app. Questa decisione cambia fondamentalmente l'economia dell'ecosistema dell'App Store, che ha operato secondo lo stesso modello finanziario di base dalla sua nascita nel 2008.

### La sentenza finale - Niente più appelli

Ciò che rende questa sentenza particolarmente significativa è che è definitiva e non può essere ulteriormente impugnata. La Corte Suprema ha rifiutato di esaminare l'appello di Apple all'inizio del 2025, consolidando la decisione del tribunale di grado inferiore come legge del territorio. Questo significa che gli sviluppatori possono implementare metodi di pagamento esterni con la certezza che Apple non possa annullare questa decisione attraverso ulteriori sfide legali.

### Trattamento equo garantito dalla legge

La cosa più importante è che la sentenza afferma esplicitamente che Apple non può discriminare le app che utilizzano metodi di pagamento esterni. Il tribunale ha specificamente vietato ad Apple di:

1. Addebitare costi aggiuntivi o imporre requisiti extra alle app che utilizzano metodi di pagamento esterni
2. Dare un trattamento preferenziale nei risultati di ricerca o nella messa in evidenza delle app che utilizzano esclusivamente il sistema IAP di Apple
3. Utilizzare misure tecniche per rendere le esperienze di pagamento esterne inferiori al sistema di Apple
4. Imporre requisiti di divulgazione onerosi oltre alle informazioni di base sui consumatori

Queste protezioni esplicite significano che gli sviluppatori possono implementare Stripe o altri fornitori di pagamenti esterni senza timore di ritorsioni sottili o discriminazioni da parte di Apple. Il campo di gioco è stato legalmente livellato e Apple deve trattare tutte le app in modo equo, indipendentemente dalle loro scelte di metodo di pagamento.

La sentenza rappresenta una delle sfide più significative all'approccio del giardino recintato di Apple e segna un cambiamento fondamentale in come può funzionare la monetizzazione delle app mobili. Per gli sviluppatori che hanno a lungo lamentato la commissione del 30% di Apple (ridotta al 15% per le piccole imprese), questa sentenza offre una via verso margini di profitto più elevati e maggiore controllo sull'esperienza del cliente.

## Vantaggi finanziari dell'utilizzo di Stripe rispetto agli acquisti in-app di Apple

Le implicazioni finanziarie di questo cambiamento sono sostanziali per gli sviluppatori:

- **Commissioni di elaborazione dei pagamenti ridotte**: Apple addebita tipicamente una commissione del 30% sugli acquisti in-app (15% per le piccole imprese), mentre la commissione di Stripe è solo di circa il 2,9% + $0,30 per transazione. Questa differenza può aumentare significativamente i tuoi margini di entrata.

- **Pagamenti più veloci**: Con Apple, tipicamente aspetti 45-90 giorni per ricevere i tuoi fondi. Stripe, d'altra parte, deposita i pagamenti sul tuo conto bancario entro 2-3 giorni lavorativi.

- **Processo di rimborso semplificato**: Gestisci i rimborsi direttamente tramite la dashboard di Stripe invece di passare attraverso il sistema di rimborso più complesso di Apple.

Risparmi sui costi e un miglior flusso di cassa possono cambiare le regole del gioco, soprattutto per gli sviluppatori e le piccole imprese.

In questo articolo, esploreremo come implementare i collegamenti ai pagamenti Stripe nella tua app Capacitor per sfruttare queste nuove regole, assicurandoti di essere conforme alle [linee guida aggiornate di Apple](https://developer.apple.com/app-store/review/guidelines/#business).

> Questa implementazione si basa sulla [documentazione ufficiale di Stripe per i collegamenti ai pagamenti](https://docs.stripe.com/mobile/digital-goods/payment-links), adattata specificamente per le app Capacitor.

## Comprendere le nuove linee guida

Le linee guida aggiornate per la revisione dell'App Store ora consentono agli sviluppatori di indirizzare gli utenti verso siti web esterni per l'elaborazione dei pagamenti, specificamente per beni digitali e abbonamenti. Questo cambiamento è attualmente applicabile solo alle app distribuite nell'App Store degli Stati Uniti.

Punti chiave da comprendere:

1. Ora puoi collegarti a opzioni di pagamento esterne per beni digitali all'interno della tua app
2. Questo si applica solo alle app nell'App Store statunitense
3. Devi comunque rispettare i requisiti di divulgazione di Apple
4. Resterai responsabile per tutto il supporto clienti e la gestione dei rimborsi

## Impostare i collegamenti ai pagamenti Stripe nella tua app Capacitor

Immergiamoci nell'implementazione tecnica:

### Passo 1: Crea un collegamento ai pagamenti nel dashboard di Stripe

Per prima cosa, crea un collegamento ai pagamenti nel tuo dashboard di Stripe:

1. Naviga nella sezione Collegamenti ai pagamenti nel tuo dashboard di Stripe
2. Clicca su "+ Nuovo" per creare un nuovo collegamento ai pagamenti
3. Definisci i dettagli del tuo prodotto o abbonamento
4. Nelle impostazioni "Dopo il pagamento", seleziona "Non mostrare la pagina di conferma"
5. Imposta un link universale come tuo URL di successo (configureremo questo più tardi)
6. Clicca su "Crea collegamento" per generare il tuo collegamento ai pagamenti

### Passo 2: Configura i collegamenti universali nella tua app Capacitor

Per reindirizzare gli utenti alla tua app dopo il completamento del pagamento, configura i collegamenti universali:

1. Crea un file `apple-app-site-association` nel tuo dominio:

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

2. Ospita questo file a `https://yourdomain.com/.well-known/apple-app-site-association`

3. Assicurati che venga servito con il corretto tipo MIME `application/json`

4. Configura la tua app Capacitor per gestire i collegamenti universali aggiungendo il corretto diritto. Prima, nel tuo `capacitor.config.ts`:

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

5. Aggiungi il diritto dei domini associati al tuo progetto Xcode:
   - Apri il tuo progetto Xcode
   - Seleziona il tuo target dell'app
   - Vai su "Signing & Capabilities"
   - Clicca su "+ Capability" e seleziona "Domini associati"
   - Aggiungi `applinks:yourdomain.com`

### Passo 3: Crea una pagina di fallback

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

### Passo 4: Implementa il pulsante di pagamento nella tua app Capacitor

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

> **Perché Safari è importante**: Aprire il collegamento ai pagamenti in Safari (attraverso `window.open`) piuttosto che in un browser in-app è vantaggioso perché gli utenti che hanno precedentemente salvato le loro informazioni di pagamento con Stripe Link avranno le loro credenziali automaticamente disponibili. Questo crea un'esperienza di checkout più fluida dove gli utenti non dovranno reinserire le informazioni della loro carta di credito, riducendo significativamente l'attrito e i tassi di abbandono.

### Passo 5: Gestisci i collegamenti universali nella tua app

Configura la tua app per gestire i collegamenti universali quando gli utenti vengono reindirizzati di nuovo:

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

### Passo 6: Configura il webhook per l'evasione degli ordini

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

Siamo chiari: la sentenza Epic v. Apple ha cambiato fondamentalmente il panorama dei pagamenti mobili. Non solo influisce direttamente sulle app iOS, ma rafforza anche la posizione degli sviluppatori Android che hanno utilizzato metodi di pagamento esterni.

**Gli sviluppatori Android possono ora implementare soluzioni di pagamento esterne con completa fiducia.** Il precedente stabilito dalla sentenza di Apple protegge effettivamente gli sviluppatori su entrambe le piattaforme da potenziali restrizioni future. Questa decisione del tribunale ha convalidato ciò che molti sviluppatori Android stano facendo da anni: offrendo opzioni di pagamento alternative con commissioni più basse.

Il Play Store di Google è sempre stato meno restrittivo riguardo ai metodi di pagamento esterni rispetto ad Apple, e ora, con il precedente legale stabilito, non c'è praticamente alcun rischio nell'implementazione di Stripe o altri fornitori di pagamenti esterni nelle tue app Android. Puoi procedere con queste implementazioni sapendo di poter contare su basi legali solide.

L'implementazione che abbiamo trattato per iOS funziona praticamente allo stesso modo per i dispositivi Android. Poiché il Play Store di Google non ha le stesse restrizioni sui metodi di pagamento esterni, puoi utilizzare esattamente lo stesso approccio dei collegamenti ai pagamenti Stripe senza necessità di dialoghi di divulgazione speciali.

Per gestire il deep linking (equivalente ai collegamenti universali su iOS), dovrai:

1. Configurare i App Links nel tuo `AndroidManifest.xml` per gestire l'URL di reindirizzamento
2. Creare un file `.well-known/assetlinks.json` sul tuo dominio con i dettagli della tua app
3. Utilizzare la stessa logica dell'ascoltatore `appUrlOpen` per elaborare i pagamenti riusciti

La bellezza di Capacitor è che, una volta implementate le configurazioni specifiche per la piattaforma, il codice effettivo del flusso di pagamento rimane lo stesso su entrambe le piattaforme.

## Creare un'interfaccia utente per il pagamento

Ecco un esempio di componente del pulsante di pagamento in Vue che puoi aggiungere alla tua app Capacitor:

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

## Gestire regioni diverse

Poiché le nuove linee guida di Apple si applicano solo alle app nell'App Store degli Stati Uniti, avrai bisogno di una strategia per rilevare le regioni degli utenti e applicare il metodo di pagamento appropriato. Ecco un approccio più affidabile utilizzando la geolocalizzazione IP:

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

Questo approccio utilizza il servizio gratuito `ipapi.co` per determinare il paese dell'utente in base al proprio indirizzo IP. Potresti anche utilizzare altri servizi di geolocalizzazione come MaxMind o implementare questo controllo sul server per una maggiore sicurezza.

> **Nota**: Aunque este enfoque funciona, es importante recordar que la geolocalización por IP no siempre es 100% precisa. Para aplicaciones críticas, considere utilizar múltiples métodos de detección o permitir que los usuarios seleccionen manualmente su región.

### Detección de Ubicación Más Precisa con Plugins de Capacitor

Para una detección de ubicación más precisa, puede usar el plugin de Geolocalización de Capacitor junto con @capgo/nativegeocoder para determinar el país del usuario con mayor precisión:

1. Primero, instale los plugins requeridos:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Configure los plugins en su proyecto de Capacitor. Agregue lo siguiente a su `capacitor.config.ts`:

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

3. Implemente la detección de región basada en ubicación:

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

Esta implementación proporciona una manera más precisa de determinar si un usuario se encuentra físicamente en los Estados Unidos. Primero intenta usar el GPS del dispositivo y el geocodificador nativo para determinar el país. Si eso falla (debido a problemas de permisos u otros errores), recurre a la detección basada en IP.

Recuerde agregar los permisos necesarios a sus archivos `info.plist` (iOS) y `AndroidManifest.xml` (Android):

Para iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Para Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Utilizar este enfoque le brinda la manera más precisa de determinar si un usuario es elegible para opciones de pago externas bajo las nuevas pautas de Apple.

## Gestión de Suscripciones

Una ventaja clave de usar Stripe para pagos es la capacidad de ofrecer y gestionar suscripciones. Aquí le mostramos cómo manejar la gestión de suscripciones en su aplicación de Capacitor:

### 1. Crear una Página de Gestión de Suscripciones

Agregue una página de gestión de suscripciones en su aplicación para mostrar las suscripciones activas del usuario:

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

### 2. Portal de Clientes para la Gestión de Suscripciones

Stripe ofrece un Portal de Clientes que permite a los usuarios gestionar sus suscripciones. Puede crear un enlace a este portal desde su servidor:

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

## Garantizando el Cumplimiento de la App Store

Para asegurarse de que su implementación cumpla con las pautas de Apple:

1. Incluya divulgaciones apropiadas sobre compras externas
2. Implemente una hoja modal informando a los usuarios que están saliendo de la aplicación (como lo requiere Apple)
3. No intente eludir la comisión de Apple sobre las compras realizadas dentro de la aplicación
4. Comunique claramente a los usuarios que Apple no es responsable de la transacción

Aquí hay un ejemplo de cómo implementar el modal de divulgación requerido:

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

## Pruebas de Su Implementación

Para probar su implementación:

1. Haga clic en el botón de pago en su aplicación, que debería mostrar la divulgación y luego abrir la página de pago de Stripe
2. Complete un pago de prueba utilizando la tarjeta de prueba de Stripe `4242 4242 4242 4242`
3. Después del pago, debería ser redirigido de regreso a su aplicación a través del enlace universal
4. Verifique que su webhook recibió el evento `checkout.session.completed`

## Conclusión

La capacidad de utilizar opciones de pago externas para bienes digitales en aplicaciones iOS es un cambio significativo que brinda a los desarrolladores más flexibilidad. Si bien este cambio actualmente solo se aplica a las aplicaciones en la App Store de EE. UU., proporciona una alternativa importante al sistema de compras dentro de la aplicación de Apple.

Al utilizar los Enlaces de Pagos de Stripe con Capacitor, puede implementar rápidamente una experiencia de pago simplificada mientras mantiene el cumplimiento de las pautas de Apple. Este enfoque también le da la ventaja de la robusta infraestructura de pagos de Stripe, tarifas de procesamiento más bajas (3% frente al 30%), y pagos mucho más rápidos (días en lugar de meses) en comparación con el sistema de compras dentro de la aplicación de Apple.

Recuerde que necesitará manejar todo el soporte al cliente y los problemas de reembolso directamente, ya que estas transacciones ocurren fuera del ecosistema de Apple.

¿Ha implementado Enlaces de Pagos de Stripe en su aplicación Capacitor? ¡Comparta su experiencia en los comentarios a continuación!

## Preguntas Frecuentes

**P: ¿Es este enfoque compatible con las pautas de Apple?**  
R: Sí, a partir del 1 de mayo de 2025, Apple permite enlazar métodos de pago externos para bienes y servicios digitales en aplicaciones distribuidas en la App Store de EE. UU., siempre que incluya las divulgaciones requeridas.

**P: ¿Necesito pagar la comisión de Apple al usar métodos de pago externos?**  
R: No, uno de los principales beneficios de las nuevas reglas es que los pagos procesados fuera del sistema de Apple no están sujetos a su comisión.

**P: ¿Mi empresa necesita estar basada en los Estados Unidos para aprovechar estas nuevas reglas?**  
R: No, cualquier empresa de cualquier parte del mundo puede implementar métodos de pago externos siempre que su aplicación esté disponible en la App Store de EE. UU. y los usuarios que realicen las compras se encuentren en los Estados Unidos. El fallo se aplica al mercado (App Store de EE. UU.) y la ubicación de los usuarios, no a la ubicación de su empresa. Esto significa que desarrolladores de Europa, Asia, América del Sur o cualquier otro lugar pueden implementar Enlaces de Pagos de Stripe para sus clientes en EE. UU.

**P: ¿Qué sucede si un usuario fuera de EE. UU. intenta usar la opción de pago externa?**  
R: Debe implementar la detección de región (como se muestra en el artículo) para ofrecer opciones de pago externas solo a usuarios en EE. UU. Para otras regiones, debe seguir utilizando el sistema de compras dentro de la aplicación de Apple.

**P: ¿Puedo usar esto para bienes físicos o servicios consumidos fuera de la aplicación?**  
R: Sí, Apple siempre ha permitido métodos de pago externos para bienes físicos y servicios consumidos fuera de la aplicación (como viajes compartidos o entrega de comida).
