---
slug: setup-stripe-payment-in-us-capacitor
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
---
# Implementación de Enlaces de Pago de Stripe en Aplicaciones Capacitor Siguiendo las Nuevas Directrices de Apple

A partir del 1 de mayo de 2025, Apple ha implementado cambios significativos en sus Directrices de Revisión de la App Store tras el fallo judicial en el [caso Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). Estos cambios específicamente permiten a los desarrolladores de aplicaciones en Estados Unidos enlazar a métodos de pago externos para bienes y servicios digitales, abriendo alternativas al sistema de compras dentro de la aplicación de Apple.

## La Batalla Épica que Cambió los Pagos Móviles Para Siempre

El camino hasta este momento ha sido largo y contencioso. Todo comenzó en agosto de 2020 cuando Epic Games, el creador del extremadamente popular juego Fortnite, violó deliberadamente las directrices de la App Store de Apple al implementar una opción de pago directo que evitaba la comisión del 30% de Apple. Apple rápidamente eliminó Fortnite de la App Store, y Epic respondió presentando una demanda que desafiaba el control de Apple sobre la distribución de aplicaciones iOS y los pagos dentro de la aplicación.

Después de años de batallas legales, apelaciones y contra-apelaciones, los tribunales finalmente dictaminaron que Apple debe permitir a los desarrolladores dirigir a los usuarios a métodos de pago alternativos fuera de sus aplicaciones. Esta decisión cambia fundamentalmente la economía del ecosistema de la App Store, que ha estado operando bajo el mismo modelo financiero básico desde su inicio en 2008.

### El Fallo Final - Sin Más Apelaciones

Lo que hace que este fallo sea particularmente significativo es que es final y no puede ser apelado más. La Corte Suprema se negó a escuchar la apelación de Apple a principios de 2025, cimentando la decisión del tribunal inferior como ley vigente. Esto significa que los desarrolladores pueden implementar métodos de pago externos con la confianza de que Apple no puede revertir esta decisión a través de más desafíos legales.

### Trato Igualitario Garantizado por Ley

Lo más importante es que el fallo establece explícitamente que Apple no puede discriminar contra las aplicaciones que utilizan métodos de pago externos. El tribunal específicamente prohibió a Apple:

1. Cobrar tarifas adicionales o imponer requisitos extra a las aplicaciones que usen métodos de pago externos
2. Dar trato preferencial en resultados de búsqueda o destacar aplicaciones que usen exclusivamente el sistema IAP de Apple
3. Usar medidas técnicas para hacer que las experiencias de pago externas sean inferiores al sistema propio de Apple
4. Imponer requisitos de divulgación onerosos más allá de la información básica del consumidor

Estas protecciones explícitas significan que los desarrolladores pueden implementar Stripe u otros proveedores de pago externos sin temor a represalias sutiles o discriminación por parte de Apple. El campo de juego ha sido legalmente nivelado, y Apple debe tratar a todas las aplicaciones por igual, independientemente de sus elecciones de método de pago.

El fallo representa uno de los desafíos más significativos al enfoque de jardín amurallado de Apple y marca un cambio fundamental en cómo puede funcionar la monetización de aplicaciones móviles. Para los desarrolladores que durante mucho tiempo se han quejado de la comisión del 30% de Apple (reducida al 15% para pequeñas empresas), este fallo ofrece un camino hacia mayores márgenes de beneficio y más control sobre la experiencia del cliente.

## Beneficios Financieros de Usar Stripe Sobre las Compras In-App de Apple

Las implicaciones financieras de este cambio son sustanciales para los desarrolladores:

- **Tarifas de Procesamiento de Pago Reducidas**: Apple típicamente cobra una comisión del 30% en compras dentro de la aplicación (15% para pequeñas empresas), mientras que la tarifa de Stripe es solo alrededor del 2.9% + $0.30 por transacción. Esta diferencia puede aumentar significativamente sus márgenes de ingresos.
  
- **Pagos Más Rápidos**: Con Apple, típicamente esperas 45-90 días para recibir tus fondos. Stripe, por otro lado, deposita los pagos en tu cuenta bancaria en 2-3 días hábiles.

- **Proceso de Reembolso Simplificado**: Maneja los reembolsos directamente a través del panel de Stripe en lugar de pasar por el sistema de reembolso más complejo de Apple.

Estos ahorros en costos y mejora en el flujo de efectivo pueden ser revolucionarios, especialmente para desarrolladores y negocios más pequeños.

En este artículo, exploraremos cómo implementar Enlaces de Pago de Stripe en tu aplicación Capacitor para aprovechar estas nuevas reglas, mientras aseguramos el cumplimiento con las [directrices actualizadas](https://developer.apple.com/app-store/review/guidelines/#business) de Apple.

> Esta implementación está basada en la [documentación oficial de Stripe para Enlaces de Pago](https://docs.stripe.com/mobile/digital-goods/payment-links), adaptada específicamente para aplicaciones Capacitor.

## Entendiendo las Nuevas Directrices

Las Directrices de Revisión de la App Store actualizadas ahora permiten a los desarrolladores dirigir a los usuarios a sitios web externos para el procesamiento de pagos, específicamente para bienes digitales y suscripciones. Este cambio actualmente solo es aplicable a las aplicaciones distribuidas en la App Store de Estados Unidos.

Puntos clave a entender:

1. Ahora puedes enlazar a opciones de pago externas para bienes digitales dentro de tu aplicación
2. Esto solo aplica a aplicaciones en la App Store de EE.UU.
3. Debes seguir cumpliendo con los requisitos de divulgación de Apple
4. Sigues siendo responsable de todo el soporte al cliente y manejo de reembolsos

## Configurando Enlaces de Pago de Stripe en Tu Aplicación Capacitor

Profundicemos en la implementación técnica:

### Paso 1: Crear un Enlace de Pago en el Panel de Stripe

Primero, crea un enlace de pago en tu Panel de Stripe:

1. Navega a la sección de Enlaces de Pago en tu Panel de Stripe
2. Haz clic en "+ Nuevo" para crear un nuevo enlace de pago
3. Define los detalles de tu producto o suscripción
4. En la configuración "Después del pago", selecciona "No mostrar página de confirmación"
5. Establece un enlace universal como tu URL de éxito (lo configuraremos más tarde)
6. Haz clic en "Crear Enlace" para generar tu enlace de pago

### Paso 2: Configurar Enlaces Universales en Tu Aplicación Capacitor

Para redirigir usuarios de vuelta a tu aplicación después de completar el pago, configura enlaces universales:

1. Crea un archivo `apple-app-site-association` en tu dominio:

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

2. Aloja este archivo en `https://tudominio.com/.well-known/apple-app-site-association`

3. Asegúrate de que se sirva con el tipo MIME correcto `application/json`

4. Configura tu aplicación Capacitor para manejar enlaces universales añadiendo el derecho apropiado. Primero, en tu `capacitor.config.ts`:

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

5. Añade el derecho de Dominios Asociados a tu proyecto Xcode:
   - Abre tu proyecto Xcode
   - Selecciona tu objetivo de aplicación
   - Ve a "Signing & Capabilities"
   - Haz clic en "+ Capability" y selecciona "Associated Domains"
   - Añade `applinks:tudominio.com`

### Paso 3: Crear una Página de Respaldo

Crea una página de respaldo en la URL de redirección para manejar casos donde la aplicación no está instalada:

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

### Paso 4: Implementar el Botón de Pago en Tu Aplicación Capacitor

Ahora, añade el botón de pago a tu aplicación:

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

> **Por Qué Safari Es Importante**: Abrir el enlace de pago en Safari (vía `window.open`) en lugar de un navegador dentro de la aplicación es beneficioso porque los usuarios que han guardado previamente su información de pago con Stripe Link tendrán sus credenciales disponibles automáticamente. Esto crea una experiencia de pago más fluida donde los usuarios no necesitarán volver a ingresar su información de tarjeta de crédito, reduciendo significativamente la fricción y las tasas de abandono.

### Paso 5: Manejar Enlaces Universales en Tu Aplicación

Configura tu aplicación para manejar los enlaces universales cuando los usuarios sean redirigidos de vuelta:

1. Primero, instala el plugin App:

```bash
npm install @capacitor/app
```

2. Registra el plugin App en tu aplicación:

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

### Paso 6: Configurar Webhook para el Cumplimiento de Pedidos

Finalmente, configura un webhook en tu servidor para manejar pagos exitosos:

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

## Compatibilidad con Android

Seamos claros: el fallo de Epic v. Apple ha cambiado fundamentalmente el panorama de pagos móviles. No solo impacta directamente las aplicaciones iOS, sino que también fortalece la posición de los desarrolladores de Android que han estado usando métodos de pago externos.

**Los desarrolladores de Android ahora pueden implementar soluciones de pago externas con completa confianza.** El precedente establecido por el fallo de Apple efectivamente protege a los desarrolladores en todas las plataformas de posibles restricciones futuras. Esta decisión judicial ha validado lo que muchos desarrolladores de Android han estado haciendo durante años - ofrecer opciones de pago alternativas con tarifas más bajas.

La Play Store de Google siempre ha sido menos restrictiva sobre métodos de pago externos que Apple, y ahora con el precedente legal establecido, prácticamente no hay riesgo en implementar Stripe u otros proveedores de pago externos en tus aplicaciones Android. Puedes avanzar con estas implementaciones sabiendo que estás en terreno legal sólido.

La implementación que hemos cubierto para iOS funciona casi idénticamente para dispositivos Android. Dado que Google Play Store no tiene las mismas restricciones en métodos de pago externos, puedes usar el mismo enfoque de Enlaces de Pago de Stripe sin necesidad de diálogos especiales de divulgación.

Para manejar el deep linking (equivalente a enlaces universales en iOS), necesitarás:

1. Configurar App Links en tu `AndroidManifest.xml` para manejar la URL de redirección
2. Crear un archivo `.well-known/assetlinks.json` en tu dominio con los detalles de tu aplicación
3. Usar la misma lógica de escucha `appUrlOpen` para procesar pagos exitosos

La belleza de Capacitor es que una vez que hayas implementado las configuraciones específicas de la plataforma, el código del flujo de pago real permanece igual en ambas plataformas.

## Creando una UI de Pago

Aquí hay un ejemplo de un componente de botón de pago en Vue que puedes añadir a tu aplicación Capacitor:

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

## Manejando Diferentes Regiones

Dado que las nuevas directrices de Apple solo se aplican a aplicaciones en la App Store de EE.UU., necesitarás una estrategia para detectar las regiones de usuarios y aplicar el método de pago apropiado. Aquí hay un enfoque más confiable usando geolocalización IP:

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

Este enfoque utiliza el servicio gratuito `ipapi.co` para determinar el país del usuario basado en su dirección IP. También podrías usar otros servicios de geolocalización como MaxMind, o implementar esta verificación del lado del servidor para mayor seguridad.

> **Nota**: Si bien este enfoque funciona, es importante recordar que la geolocalización por IP no siempre es 100% precisa. Para aplicaciones críticas, considere usar múltiples métodos de detección o permitir que los usuarios seleccionen manualmente su región.

### Detección de Ubicación Más Precisa con Plugins de Capacitor

Para una detección de ubicación más precisa, puede usar el plugin Capacitor Geolocation junto con @capgo/nativegeocoder para determinar el país del usuario con mayor precisión:

1. Primero, instale los plugins requeridos:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Configure los plugins en su proyecto Capacitor. Agregue lo siguiente a su `capacitor.config.ts`:

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

Esta implementación proporciona una forma más precisa de determinar si un usuario está físicamente ubicado en los Estados Unidos. Primero intenta usar el GPS del dispositivo y el geocodificador nativo para determinar el país. Si eso falla (debido a problemas de permisos u otros errores), recurre a la detección basada en IP.

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

Usar este enfoque le proporciona la forma más precisa de determinar si un usuario es elegible para opciones de pago externas según las nuevas pautas de Apple.

## Gestión de Suscripciones

Una ventaja clave de usar Stripe para pagos es la capacidad de ofrecer y gestionar suscripciones. Aquí le mostramos cómo manejar la gestión de suscripciones en su aplicación Capacitor:

### 1. Creando una Página de Gestión de Suscripciones

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

### 2. Portal del Cliente para Gestión de Suscripciones

Stripe ofrece un Portal del Cliente que permite a los usuarios gestionar sus suscripciones. Puede crear un enlace a este portal desde su servidor:

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

## Asegurando el Cumplimiento con App Store

Para asegurar que su implementación cumpla con las pautas de Apple:

1. Incluya las divulgaciones apropiadas sobre compras externas
2. Implemente una hoja modal informando a los usuarios que están saliendo de la aplicación (según lo requiere Apple)
3. No intente eludir la comisión de Apple en las compras realizadas dentro de la aplicación
4. Comunique claramente a los usuarios que Apple no es responsable de la transacción

Aquí hay un ejemplo de implementación del modal de divulgación requerido:

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

## Probando Su Implementación

Para probar su implementación:

1. Haga clic en su botón de pago en su aplicación, que debería mostrar la divulgación y luego abrir la página de pago de Stripe
2. Complete un pago de prueba usando la tarjeta de prueba de Stripe `4242 4242 4242 4242`
3. Después del pago, debería ser redirigido de vuelta a su aplicación a través del enlace universal
4. Verifique que su webhook recibió el evento `checkout.session.completed`

## Conclusión

La capacidad de usar opciones de pago externas para bienes digitales en aplicaciones iOS es un cambio significativo que brinda más flexibilidad a los desarrolladores. Si bien este cambio actualmente solo se aplica a las aplicaciones en la App Store de EE. UU., proporciona una alternativa importante al sistema de compras dentro de la aplicación de Apple.

Al usar Stripe Payment Links con Capacitor, puede implementar rápidamente una experiencia de pago optimizada mientras mantiene el cumplimiento con las pautas de Apple. Este enfoque también le brinda la ventaja de la robusta infraestructura de pagos de Stripe, tarifas de procesamiento más bajas (3% vs 30%) y pagos mucho más rápidos (días en lugar de meses) en comparación con el sistema de compras dentro de la aplicación de Apple.

Recuerde que deberá manejar todo el soporte al cliente y los problemas de reembolso directamente, ya que estas transacciones ocurren fuera del ecosistema de Apple.

¿Ha implementado Stripe Payment Links en su aplicación Capacitor? ¡Comparta su experiencia en los comentarios a continuación!

## Preguntas Frecuentes

**P: ¿Este enfoque cumple con las pautas de Apple?**  
R: Sí, a partir del 1 de mayo de 2025, Apple permite enlazar a métodos de pago externos para bienes y servicios digitales en aplicaciones distribuidas en la App Store de EE. UU., siempre que incluya las divulgaciones requeridas.

**P: ¿Necesito pagar la comisión de Apple cuando uso métodos de pago externos?**  
R: No, uno de los principales beneficios de las nuevas reglas es que los pagos procesados fuera del sistema de Apple no están sujetos a su comisión.

**P: ¿Mi empresa necesita estar basada en Estados Unidos para aprovechar estas nuevas reglas?**  
R: No, cualquier empresa de cualquier parte del mundo puede implementar métodos de pago externos siempre que su aplicación esté disponible en la App Store de EE. UU. y los usuarios que realicen las compras estén ubicados en Estados Unidos. La normativa se aplica al mercado (App Store de EE. UU.) y la ubicación de los usuarios, no a la ubicación de su empresa. Esto significa que los desarrolladores de Europa, Asia, Sudamérica o cualquier otro lugar pueden implementar Stripe Payment Links para sus clientes basados en EE. UU.

**P: ¿Qué sucede si un usuario fuera de EE. UU. intenta usar la opción de pago externa?**  
R: Debe implementar la detección de región (como se muestra en el artículo) para ofrecer opciones de pago externas solo a usuarios en EE. UU. Para otras regiones, debe continuar usando el sistema de compras dentro de la aplicación de Apple.

**P: ¿Puedo usar esto para bienes físicos o servicios consumidos fuera de la aplicación?**  
R: Sí, Apple siempre ha permitido métodos de pago externos para bienes físicos y servicios consumidos fuera de la aplicación (como servicios de transporte o entrega de comida).
