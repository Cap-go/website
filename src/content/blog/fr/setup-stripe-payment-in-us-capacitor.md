---
slug: setup-stripe-payment-in-us-capacitor
title: >-
  Implémentation des liens de paiement Stripe dans les applications Capacitor
  selon les nouvelles directives d'Apple
description: >-
  Découvrez comment implémenter les liens de paiement Stripe dans votre
  application Capacitor pour traiter les paiements de biens numériques
  conformément aux nouvelles directives d'Apple en vigueur à partir du 1er mai
  2025.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-11-21T05:04:49.000Z
head_image: /stripe_apple.webp
head_image_alt: Implémentation du paiement Stripe dans les applications Capacitor
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: fr
---
# Mise en œuvre des liens de paiement Stripe dans les applications Capacitor selon les nouvelles directives d'Apple

À partir du 1er mai 2025, Apple a mis en œuvre des changements significatifs dans ses directives de révision de l'App Store suite à la décision de la cour dans l'affaire [Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). Ces changements permettent spécifiquement aux développeurs d'applications aux États-Unis de lier des méthodes de paiement externes pour les biens et services numériques, ouvrant ainsi des alternatives au système d'achat intégré d'Apple.

## La bataille épique qui a changé à jamais les paiements mobiles

Le chemin vers ce moment a été long et controversé. Tout a commencé en août 2020 lorsque Epic Games, le créateur du célèbre jeu Fortnite, a délibérément violé les directives de l'App Store d'Apple en mettant en place une option de paiement direct contournant la commission de 30 % d'Apple. Apple a immédiatement retiré Fortnite de l'App Store, et Epic a réagi en déposant une plainte contestée le contrôle d'Apple sur la distribution d'applications iOS et les paiements intégrés.

Après des années de batailles juridiques, d'appels et de contre-appels, les tribunaux ont enfin statué qu'Apple devait permettre aux développeurs de diriger les utilisateurs vers des méthodes de paiement alternatives en dehors de leurs applications. Cette décision modifie fondamentalement l'économie de l'écosystème de l'App Store, qui fonctionne selon le même modèle financier de base depuis sa création en 2008.

### La décision finale - Plus d'appels

Ce qui rend cette décision particulièrement significative, c'est qu'elle est finale et ne peut pas être contestée. La Cour suprême a décliné l'appel d'Apple début 2025, validant la décision du tribunal inférieur en tant que loi du pays. Cela signifie que les développeurs peuvent mettre en œuvre des méthodes de paiement externes en toute confiance, sachant qu'Apple ne peut pas inverser cette décision par d'autres défis juridiques.

### Traitement équitable garanti par la loi

Il est particulièrement important de noter que le jugement stipule explicitement qu'Apple ne peut pas discriminer contre des applications qui utilisent des méthodes de paiement externes. Le tribunal a spécifiquement interdit à Apple de :

1. Facturer des frais supplémentaires ou d'imposer des exigences supplémentaires sur les applications qui utilisent des méthodes de paiement externes
2. Accorder un traitement préférentiel dans les résultats de recherche ou dans la mise en avant d'applications qui utilisent exclusivement le système IAP d'Apple
3. Utiliser des mesures techniques pour rendre l'expérience de paiement externe inférieure à celle du propre système d'Apple
4. Imposer des exigences de divulgation lourdes au-delà des informations de base sur le consommateur

Ces protections explicites signifient que les développeurs peuvent mettre en œuvre Stripe ou d'autres fournisseurs de paiement externes sans craindre de représailles subtiles ou de discrimination de la part d'Apple. Le terrain de jeu a été légalement nivelé, et Apple doit traiter toutes les applications de manière équitable, indépendamment de leurs choix en matière de méthodes de paiement.

Ce jugement représente l'un des défis les plus significatifs à l'approche du jardin clos d'Apple et marque un tournant décisif dans la manière dont la monétisation des applications mobiles peut fonctionner. Pour les développeurs qui se plaignent depuis longtemps de la commission de 30 % d'Apple (réduite à 15 % pour les petites entreprises), ce jugement offre une voie vers des marges bénéficiaires plus élevées et un meilleur contrôle sur l'expérience client.

## Avantages financiers de l'utilisation de Stripe par rapport aux achats intégrés d'Apple

Les implications financières de ce changement sont substantielles pour les développeurs :

- **Réduction des frais de traitement des paiements** : Apple facture généralement une commission de 30 % sur les achats intégrés (15 % pour les petites entreprises), tandis que les frais de Stripe ne sont qu'environ 2,9 % + 0,30 $ par transaction. Cette différence peut augmenter considérablement vos marges de revenus.
  
- **Virements plus rapides** : Avec Apple, vous attendez généralement 45 à 90 jours pour recevoir vos fonds. Stripe, en revanche, dépose les paiements sur votre compte bancaire dans les 2 à 3 jours ouvrables.

- **Processus de remboursement simplifié** : Gérez les remboursements directement via le tableau de bord de Stripe au lieu de passer par le système de remboursement plus complexe d'Apple.

Ces économies de coûts et cette amélioration du flux de trésorerie peuvent changer la donne, en particulier pour les petits développeurs et entreprises.

Dans cet article, nous allons explorer comment mettre en œuvre des liens de paiement Stripe dans votre application Capacitor pour tirer parti de ces nouvelles règles, tout en garantissant la conformité avec les [directives mises à jour d'Apple](https://developer.apple.com/app-store/review/guidelines/#business).

> Cette mise en œuvre est basée sur [la documentation officielle de Stripe pour les liens de paiement](https://docs.stripe.com/mobile/digital-goods/payment-links), adaptée spécifiquement pour les applications Capacitor.

## Compréhension des nouvelles directives

Les directives de révision de l'App Store mises à jour permettent désormais aux développeurs de diriger les utilisateurs vers des sites externes pour le traitement des paiements, spécifiquement pour les biens numériques et les abonnements. Ce changement ne s'applique actuellement qu'aux applications distribuées dans l'App Store des États-Unis.

Points clés à comprendre :

1. Vous pouvez désormais lier des options de paiement externes pour les biens numériques dans votre application
2. Cela ne s'applique qu'aux applications de l'App Store américain
3. Vous devez toujours vous conformer aux exigences de divulgation d'Apple
4. Vous restez responsable de tout service client et de la gestion des remboursements

## Configuration des liens de paiement Stripe dans votre application Capacitor

Plongeons dans la mise en œuvre technique :

### Étape 1 : Créer un lien de paiement dans le tableau de bord Stripe

D'abord, créez un lien de paiement dans votre tableau de bord Stripe :

1. Accédez à la section Liens de paiement dans votre tableau de bord Stripe
2. Cliquez sur "+ Nouveau" pour créer un nouveau lien de paiement
3. Définissez les détails de votre produit ou de votre abonnement
4. Sous les paramètres "Après le paiement", sélectionnez "Ne pas afficher la page de confirmation"
5. Définissez un lien universel comme votre URL de réussite (nous configurerons cela plus tard)
6. Cliquez sur "Créer le lien" pour générer votre lien de paiement

### Étape 2 : Configurer les liens universels dans votre application Capacitor

Pour rediriger les utilisateurs vers votre application après la validation du paiement, configurez les liens universels :

1. Créez un fichier `apple-app-site-association` sur votre domaine :

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

2. Hébergez ce fichier à `https://yourdomain.com/.well-known/apple-app-site-association`

3. Assurez-vous qu'il est servi avec le bon type MIME `application/json`

4. Configurez votre application Capacitor pour gérer les liens universels en ajoutant l'autorisation adéquate. D'abord, dans votre `capacitor.config.ts` :

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

5. Ajoutez l'autorisation de domaines associés à votre projet Xcode :
   - Ouvrez votre projet Xcode
   - Sélectionnez la cible de votre application
   - Allez dans "Signing & Capabilities"
   - Cliquez sur "+ Capability" et sélectionnez "Associated Domains"
   - Ajoutez `applinks:yourdomain.com`

### Étape 3 : Créer une page de secours

Créez une page de secours à l'URL de redirection pour gérer les cas où l'application n'est pas installée :

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

### Étape 4 : Implémenter le bouton de paiement dans votre application Capacitor

Maintenant, ajoutez le bouton de paiement à votre application :

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

> **Pourquoi Safari est important** : Ouvrir le lien de paiement dans Safari (via `window.open`) plutôt que dans un navigateur intégré est bénéfique car les utilisateurs qui ont précédemment enregistré leurs informations de paiement avec Stripe Link auront automatiquement leurs informations disponibles. Cela crée une expérience de paiement plus fluide où les utilisateurs n'auront pas besoin de ressaisir leurs informations de carte de crédit, réduisant ainsi considérablement les frictions et les taux d'abandon.

### Étape 5 : Gérer les liens universels dans votre application

Configurez votre application pour gérer les liens universels lorsque les utilisateurs sont redirigés :

1. D'abord, installez le plugin App :

```bash
npm install @capacitor/app
```

2. Enregistrez le plugin App dans votre application :

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

### Étape 6 : Configurer le webhook pour l'exécution des commandes

Enfin, configurez un webhook sur votre serveur pour gérer les paiements réussis :

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

## Compatibilité Android

Soyons clairs : la décision Epic v. Apple a fondamentalement changé le paysage des paiements mobiles. Non seulement cela impacte directement les applications iOS, mais cela renforce également la position des développeurs Android qui ont utilisé des méthodes de paiement externes.

**Les développeurs Android peuvent maintenant mettre en œuvre des solutions de paiement externes en toute confiance.** Le précédent établi par le jugement d'Apple protège effectivement les développeurs sur toutes les plateformes contre d'éventuelles restrictions futures. Cette décision de la cour a validé ce que de nombreux développeurs Android font depuis des années - offrir des options de paiement alternatives avec des frais plus bas.

Le Play Store de Google a toujours été moins restrictif quant aux méthodes de paiement externes qu'Apple, et maintenant que le précédent légal est établi, il n'y a virtuellement aucun risque à mettre en œuvre Stripe ou d'autres fournisseurs de paiement externes dans vos applications Android. Vous pouvez avancer avec ces mises en œuvre en sachant que vous êtes sur un terrain légal solide.

La mise en œuvre que nous avons couverte pour iOS fonctionne presque de la même manière pour les appareils Android. Puisque le Play Store de Google n'a pas les mêmes restrictions sur les méthodes de paiement externes, vous pouvez utiliser exactement la même approche des liens de paiement Stripe sans avoir besoin de dialogues de divulgation spéciaux.

Pour gérer le lien profond (équivalent aux liens universels sur iOS), vous devrez :

1. Configurer les liens d'application dans votre `AndroidManifest.xml` pour gérer l'URL de redirection
2. Créer un fichier `.well-known/assetlinks.json` sur votre domaine avec les détails de votre application
3. Utiliser la même logique d'écouteur `appUrlOpen` pour traiter les paiements réussis

La beauté de Capacitor est qu'une fois que vous avez implémenté les configurations spécifiques à la plateforme, le code d'écoulement de paiement réel reste le même sur les deux plateformes.

## Création d'une interface utilisateur de paiement

Voici un exemple de composant de bouton de paiement en Vue que vous pouvez ajouter à votre application Capacitor :

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

## Gestion des différentes régions

Étant donné que les nouvelles directives d'Apple ne s'appliquent qu'aux applications de l'App Store américain, vous aurez besoin d'une stratégie pour détecter les régions des utilisateurs et appliquer la méthode de paiement appropriée. Voici une approche plus fiable utilisant la géolocalisation IP :

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

Cette approche utilise le service gratuit `ipapi.co` pour déterminer le pays de l'utilisateur en fonction de son adresse IP. Vous pourriez également utiliser d'autres services de géolocalisation comme MaxMind, ou mettre en œuvre cette vérification côté serveur pour plus de sécurité.

> **Note**: Bien que cette approche fonctionne, il est important de se rappeler que la géolocalisation par IP n'est pas toujours précise à 100 %. Pour les applications critiques, envisagez d'utiliser plusieurs méthodes de détection ou de permettre aux utilisateurs de sélectionner manuellement leur région.

### Détection de Position Plus Précise avec les Plugins Capacitor

Pour une détection de position plus précise, vous pouvez utiliser le plugin Geolocation de Capacitor ainsi que @capgo/nativegeocoder pour déterminer le pays de l'utilisateur avec une précision accrue :

1. Tout d'abord, installez les plugins requis :

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Configurez les plugins dans votre projet Capacitor. Ajoutez ce qui suit à votre `capacitor.config.ts` :

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

3. Mettez en œuvre la détection de région basée sur la localisation :

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

Cette mise en œuvre fournit un moyen plus précis de déterminer si un utilisateur se trouve physiquement aux États-Unis. Elle essaie d'abord d'utiliser le GPS de l'appareil et le géocodeur natif pour déterminer le pays. Si cela échoue (en raison de problèmes de permission ou d'autres erreurs), elle revient à la détection par IP.

N'oubliez pas d'ajouter les autorisations nécessaires à vos fichiers `info.plist` (iOS) et `AndroidManifest.xml` (Android) :

Pour iOS (`ios/App/App/Info.plist`) :
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Pour Android (`android/app/src/main/AndroidManifest.xml`) :
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Utiliser cette approche vous permet de déterminer de manière plus précise si un utilisateur est éligible aux options de paiement externes selon les nouvelles directives d'Apple.

## Gestion des Abonnements

Un des principaux avantages d'utiliser Stripe pour les paiements est la possibilité d'offrir et de gérer des abonnements. Voici comment gérer la gestion des abonnements dans votre application Capacitor :

### 1. Création d'une Page de Gestion des Abonnements

Ajoutez une page de gestion des abonnements dans votre application pour afficher les abonnements actifs de l'utilisateur :

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

### 2. Portail Client pour la Gestion des Abonnements

Stripe propose un Portail Client qui permet aux utilisateurs de gérer leurs abonnements. Vous pouvez créer un lien vers ce portail depuis votre serveur :

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

## Assurer la Conformité avec l'App Store

Pour vous assurer que votre mise en œuvre est conforme aux directives d'Apple :

1. Incluez les divulgations appropriées sur les achats externes
2. Mettez en œuvre une feuille modale informant les utilisateurs qu'ils quittent l'application (comme l'exige Apple)
3. Ne tentez pas de contourner la commission d'Apple sur les achats effectués dans l'application
4. Communiquez clairement aux utilisateurs qu'Apple n'est pas responsable de la transaction

Voici un exemple de mise en œuvre de la modalité de divulgation requise :

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

## Tester Votre Mise en œuvre

Pour tester votre mise en œuvre :

1. Cliquez sur votre bouton de paiement dans votre application, ce qui devrait afficher la divulgation et ensuite ouvrir la page de paiement Stripe
2. Effectuez un paiement de test en utilisant la carte de test Stripe `4242 4242 4242 4242`
3. Après le paiement, vous devriez être redirigé vers votre application via le lien universel
4. Vérifiez que votre webhook a reçu l'événement `checkout.session.completed`

## Conclusion

La possibilité d'utiliser des options de paiement externes pour les biens numériques dans les applications iOS est un changement significatif qui offre aux développeurs plus de flexibilité. Bien que ce changement ne s'applique actuellement qu'aux applications de l'App Store américain, il fournit une alternative importante au système d'achat intégré d'Apple.

En utilisant les Liens de Paiement Stripe avec Capacitor, vous pouvez rapidement mettre en œuvre une expérience de paiement simplifiée tout en respectant les directives d'Apple. Cette approche vous offre également l'avantage de l'infrastructure de paiement robuste de Stripe, de frais de traitement plus bas (3 % contre 30 %), et des paiements beaucoup plus rapides (jours au lieu de mois) par rapport au système d'achat intégré d'Apple.

N'oubliez pas que vous devrez gérer tous les problèmes de support client et de remboursement directement, car ces transactions se déroulent en dehors de l'écosystème d'Apple.

Avez-vous mis en œuvre des Liens de Paiement Stripe dans votre application Capacitor ? Partagez votre expérience dans les commentaires ci-dessous !

## FAQs

**Q : Cette approche est-elle conforme aux directives d'Apple ?**  
R : Oui, à partir du 1er mai 2025, Apple permet de lier des méthodes de paiement externes pour les biens et services numériques dans les applications distribuées dans l'App Store américain, à condition que vous incluez les divulgations requises.

**Q : Dois-je payer la commission d'Apple en utilisant des méthodes de paiement externes ?**  
R : Non, l'un des principaux avantages des nouvelles règles est que les paiements traités en dehors du système d'Apple ne sont pas soumis à leur commission.

**Q : Mon entreprise doit-elle être basée aux États-Unis pour profiter de ces nouvelles règles ?**  
R : Non, toute entreprise de n'importe où dans le monde peut mettre en œuvre des méthodes de paiement externes tant que votre application est disponible dans l'App Store américain et que les utilisateurs effectuant les achats sont situés aux États-Unis. La décision s'applique au marché (App Store américain) et à la localisation des utilisateurs, pas à la localisation de votre entreprise. Cela signifie que les développeurs d'Europe, d'Asie, d'Amérique du Sud ou d'ailleurs peuvent mettre en œuvre des Liens de Paiement Stripe pour leurs clients basés aux États-Unis.

**Q : Que se passe-t-il si un utilisateur en dehors des États-Unis essaie d'utiliser l'option de paiement externe ?**  
R : Vous devriez mettre en œuvre la détection de région (comme indiqué dans l'article) pour n'offrir des options de paiement externes qu'aux utilisateurs des États-Unis. Pour les autres régions, vous devriez continuer à utiliser le système d'achat intégré d'Apple.

**Q : Puis-je utiliser cela pour des biens physiques ou des services consommés en dehors de l'application ?**  
R : Oui, Apple a toujours permis les méthodes de paiement externes pour des biens physiques et des services consommés en dehors de l'application (comme le covoiturage ou la livraison de nourriture).
