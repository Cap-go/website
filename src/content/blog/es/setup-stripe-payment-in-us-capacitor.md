---
slug: setup-stripe-payment-in-us-capacitor
title: >-
  Implementación de enlaces de pago de Stripe en aplicaciones de Capacitor
  siguiendo las nuevas directrices de Apple
description: >-
  Aprende a implementar los Enlaces de Pago de Stripe en tu aplicación de
  Capacitor para procesar pagos de bienes digitales de acuerdo con las nuevas
  directrices de Apple que entrarán en vigencia el 1 de mayo de 2025.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-11-21T03:09:54.000Z
head_image: /stripe_apple.webp
head_image_alt: Implementación de pagos con Stripe en aplicaciones de Capacitor
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: es
---
# Implementando Enlaces de Pago de Stripe en Aplicaciones de Capacitor Siguiendo las Nuevas Directrices de Apple

A partir del 1 de mayo de 2025, Apple ha implementado cambios significativos en sus Directrices de Revisión de la App Store tras el fallo judicial en el [caso Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). Estos cambios permiten específicamente a los desarrolladores de aplicaciones en los Estados Unidos vincular métodos de pago externos para bienes y servicios digitales, abriendo alternativas al sistema de compras dentro de la aplicación de Apple.

## La Batalla Épica que Cambió los Pagos Móviles para Siempre

El camino hacia este momento ha sido largo y contencioso. Todo comenzó en agosto de 2020 cuando Epic Games, el creador del popular juego Fortnite, violó deliberadamente las directrices de la App Store de Apple al implementar una opción de pago directo que eludía la comisión del 30% de Apple. Apple eliminó rápidamente Fortnite de la App Store, y Epic respondió presentando una demanda desafiando el control de Apple sobre la distribución de aplicaciones iOS y los pagos dentro de la aplicación.

Después de años de batallas legales, apelaciones y contraapelaciones, los tribunales finalmente dictaminaron que Apple debe permitir a los desarrolladores dirigir a los usuarios a métodos de pago alternativos fuera de sus aplicaciones. Esta decisión cambia fundamentalmente la economía del ecosistema de la App Store, que ha estado operando bajo el mismo modelo financiero básico desde su inicio en 2008.

### La Decisión Final - Sin Más Apelaciones

Lo que hace que este fallo sea particularmente significativo es que es final y no puede ser apelado más. La Corte Suprema se negó a escuchar la apelación de Apple a principios de 2025, consolidando la decisión del tribunal inferior como la ley del país. Esto significa que los desarrolladores pueden implementar métodos de pago externos con la confianza de que Apple no puede revertir esta decisión a través de más desafíos legales.

### Tratamiento Equitativo Garantizado por Ley

Lo más importante es que la sentencia establece explícitamente que Apple no puede discriminar a las aplicaciones que utilizan métodos de pago externos. El tribunal prohibió específicamente a Apple:

1. Cobrar tarifas adicionales o imponer requisitos extra a las aplicaciones que utilizan métodos de pago externos
2. Dar trato preferencial en los resultados de búsqueda o destacando aplicaciones que utilizan exclusivamente el sistema IAP de Apple
3. Utilizar medidas técnicas para hacer que las experiencias de pago externas sean inferiores al propio sistema de Apple
4. Imponer requisitos de divulgación onerosos más allá de la información básica del consumidor

Estas protecciones explícitas significan que los desarrolladores pueden implementar Stripe u otros proveedores de pagos externos sin temor a represalias sutiles o discriminación por parte de Apple. El campo de juego se ha nivelado legalmente, y Apple debe tratar a todas las aplicaciones por igual, independientemente de sus elecciones de método de pago.

El fallo representa uno de los desafíos más significativos a la estrategia del jardín amurallado de Apple y marca un cambio crucial en cómo puede funcionar la monetización de aplicaciones móviles. Para los desarrolladores que han estado quejándose durante mucho tiempo de la comisión del 30% de Apple (reducida al 15% para las pequeñas empresas), este fallo ofrece un camino hacia márgenes de ganancia más altos y más control sobre la experiencia del cliente.

## Beneficios Financieros de Usar Stripe en Lugar de las Compras Dentro de la Aplicación de Apple

Las implicaciones financieras de este cambio son sustanciales para los desarrolladores:

- **Reducción de Tarifas de Procesamiento de Pagos**: Apple generalmente cobra una comisión del 30% en las compras dentro de la aplicación (15% para pequeñas empresas), mientras que la tarifa de Stripe es solo alrededor del 2.9% + $0.30 por transacción. Esta diferencia puede aumentar significativamente tus márgenes de ingresos.
  
- **Pagos Más Rápidos**: Con Apple, generalmente esperas de 45 a 90 días para recibir tus fondos. Stripe, por otro lado, deposita los pagos en tu cuenta bancaria dentro de 2 a 3 días hábiles.

- **Proceso de Reembolso Simplificado**: Maneja los reembolsos directamente a través del panel de control de Stripe en lugar de pasar por el sistema de reembolsos más complejo de Apple.

Estos ahorros de costos y el flujo de efectivo mejorado pueden ser un cambio de juego, especialmente para desarrolladores y empresas más pequeñas.

En este artículo, exploraremos cómo implementar Enlaces de Pago de Stripe en tu aplicación de Capacitor para aprovechar estas nuevas reglas, mientras aseguramos el cumplimiento de las [directrices actualizadas de Apple](https://developer.apple.com/app-store/review/guidelines/#business).

> Esta implementación se basa en [la documentación oficial de Stripe para Enlaces de Pago](https://docs.stripe.com/mobile/digital-goods/payment-links), adaptada específicamente para aplicaciones de Capacitor.

## Comprendiendo las Nuevas Directrices

Las Directrices de Revisión de la App Store actualizadas ahora permiten a los desarrolladores dirigir a los usuarios a sitios web externos para el procesamiento de pagos, específicamente para bienes digitales y suscripciones. Este cambio actualmente solo es aplicable a aplicaciones distribuidas en la App Store de Estados Unidos.

Puntos clave a comprender:

1. Ahora puedes vincular a opciones de pago externas para bienes digitales dentro de tu aplicación
2. Esto solo se aplica a aplicaciones en la App Store de EE. UU.
3. Debes seguir cumpliendo con los requisitos de divulgación de Apple
4. Sigues siendo responsable de todo el soporte al cliente y la gestión de reembolsos

## Configurando Enlaces de Pago de Stripe en Tu Aplicación de Capacitor

Profundicemos en la implementación técnica:

### Paso 1: Crear un Enlace de Pago en el Panel de Control de Stripe

Primero, crea un enlace de pago en tu panel de control de Stripe:

1. Navega a la sección de Enlaces de Pago en tu panel de control de Stripe
2. Haz clic en "+ Nuevo" para crear un nuevo enlace de pago
3. Define los detalles de tu producto o suscripción
4. En la configuración de "Después del pago", selecciona "No mostrar página de confirmación"
5. Establece un enlace universal como tu URL de éxito (lo configuraremos más tarde)
6. Haz clic en "Crear Enlace" para generar tu enlace de pago

### Paso 2: Configurar Enlaces Universales en Tu Aplicación de Capacitor

Para redirigir a los usuarios de regreso a tu aplicación después de completar el pago, configura enlaces universales:

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

2. Aloja este archivo en `https://yourdomain.com/.well-known/apple-app-site-association`

3. Asegúrate de que se sirva con el tipo MIME correcto `application/json`

4. Configura tu aplicación de Capacitor para manejar enlaces universales añadiendo la concesión adecuada. Primero, en tu `capacitor.config.ts`:

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

5. Agrega la concesión de Dominios Asociados a tu proyecto de Xcode:
   - Abre tu proyecto de Xcode
   - Selecciona tu destino de aplicación
   - Ve a "Signing & Capabilities"
   - Haz clic en "+ Capability" y selecciona "Dominios Asociados"
   - Agrega `applinks:yourdomain.com`

### Paso 3: Crear una Página de Respaldo

Crea una página de respaldo en la URL de redirección para manejar los casos en que la aplicación no esté instalada:

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

### Paso 4: Implementar el Botón de Pago en Tu Aplicación de Capacitor

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

> **Por qué Importa Safari**: Abrir el enlace de pago en Safari (a través de `window.open`) en lugar de un navegador dentro de la aplicación es beneficioso porque los usuarios que han guardado previamente su información de pago con Stripe Link tendrán sus credenciales automáticamente disponibles. Esto crea una experiencia de pago más fluida donde los usuarios no necesitan volver a ingresar su información de tarjeta de crédito, reduciendo significativamente la fricción y las tasas de abandono.

### Paso 5: Manejar Enlaces Universales en Tu Aplicación

Configura tu aplicación para manejar los enlaces universales cuando los usuarios sean redirigidos de regreso:

1. Primero, instala el plugin de App:

```bash
npm install @capacitor/app
```

2. Registra el plugin de App en tu aplicación:

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

Seamos claros: la sentencia de Epic v. Apple ha cambiado fundamentalmente el panorama de los pagos móviles. No solo afecta directamente a las aplicaciones de iOS, sino que también fortalece la posición de los desarrolladores de Android que han estado utilizando métodos de pago externos.

**Los desarrolladores de Android ahora pueden implementar soluciones de pago externas con total confianza.** El precedente establecido por la sentencia de Apple efectivamente protege a los desarrolladores de todas las plataformas de posibles restricciones futuras. Esta decisión judicial ha validado lo que muchos desarrolladores de Android han estado haciendo durante años: ofrecer opciones de pago alternativas con tarifas más bajas.

La Play Store de Google siempre ha sido menos restrictiva respecto a métodos de pago externos que Apple, y ahora, con el precedente legal establecido, prácticamente no hay riesgo en implementar Stripe u otros proveedores de pagos externos en tus aplicaciones de Android. Puedes avanzar con estas implementaciones sabiendo que estás en un terreno legal sólido.

La implementación que hemos cubierto para iOS funciona casi idénticamente para dispositivos Android. Dado que la Play Store de Google no tiene las mismas restricciones sobre métodos de pago externos, puedes usar el mismo enfoque de Enlaces de Pago de Stripe sin necesidad de diálogos de divulgación especiales.

Para manejar el enlace profundo (equivalente a los enlaces universales en iOS), necesitarás:

1. Configurar Enlaces de Aplicaciones en tu `AndroidManifest.xml` para manejar la URL de redirección
2. Crear un archivo `.well-known/assetlinks.json` en tu dominio con los detalles de tu aplicación
3. Usar la misma lógica de escucha de `appUrlOpen` para procesar pagos exitosos

La belleza de Capacitor es que una vez que has implementado las configuraciones específicas de la plataforma, el código real del flujo de pago permanece igual en ambas plataformas.

## Creando una Interfaz de Pago

Aquí hay un ejemplo de un componente de botón de pago en Vue que puedes agregar a tu aplicación de Capacitor:

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

## Manejo de Diferentes Regiones

Dado que las nuevas directrices de Apple solo se aplican a aplicaciones en la App Store de EE. UU., necesitarás una estrategia para detectar las regiones de los usuarios y aplicar el método de pago apropiado. Aquí hay un enfoque más confiable utilizando geolocalización por IP:

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

> **Nota**: Si bien este enfoque funciona, es importante recordar que la geolocalización por IP no siempre es 100% precisa. Para aplicaciones críticas, considera usar múltiples métodos de detección o permitir que los usuarios seleccionen manualmente su región.

### Detección de Ubicación Más Precisa con Plugins de Capacitor

Para una detección de ubicación más precisa, puedes usar el plugin de Geolocalización de Capacitor junto con @capgo/nativegeocoder para determinar el país del usuario con mayor precisión:

1. Primero, instala los plugins requeridos:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Configura los plugins en tu proyecto de Capacitor. Agrega lo siguiente a tu `capacitor.config.ts`:

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

3. Implementa la detección de región basada en la ubicación:

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

Esta implementación proporciona una forma más precisa de determinar si un usuario se encuentra físicamente en los Estados Unidos. Primero intenta usar el GPS del dispositivo y el geocodificador nativo para determinar el país. Si eso falla (debido a problemas de permisos u otros errores), recae en la detección basada en IP.

Recuerda agregar los permisos necesarios a tus archivos `info.plist` (iOS) y `AndroidManifest.xml` (Android):

Para iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Para Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Usar este enfoque te brinda la forma más precisa de determinar si un usuario es elegible para opciones de pago externas según las nuevas pautas de Apple.

## Gestión de Suscripciones

Una de las principales ventajas de usar Stripe para los pagos es la capacidad de ofrecer y gestionar suscripciones. Aquí te mostramos cómo manejar la gestión de suscripciones en tu aplicación de Capacitor:

### 1. Crear una Página de Gestión de Suscripciones

Agrega una página de gestión de suscripciones en tu aplicación para mostrar las suscripciones activas del usuario:

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

### 2. Portal de Clientes para la Gestión de Suscripciones

Stripe ofrece un Portal de Clientes que permite a los usuarios gestionar sus suscripciones. Puedes crear un enlace a este portal desde tu servidor:

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

## Garantizar el Cumplimiento con la App Store

Para asegurar que tu implementación cumple con las pautas de Apple:

1. Incluye divulgaciones apropiadas sobre compras externas
2. Implementa una hoja modal informando a los usuarios que están saliendo de la aplicación (como lo requiere Apple)
3. No intentes eludir la comisión de Apple sobre compras realizadas dentro de la aplicación
4. Comunica claramente a los usuarios que Apple no es responsable de la transacción

Aquí tienes un ejemplo de implementación del modal de divulgación requerido:

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

## Prueba de Tu Implementación

Para probar tu implementación:

1. Haz clic en tu botón de pago en tu aplicación, que debe mostrar la divulgación y luego abrir la página de pago de Stripe
2. Completa un pago de prueba usando la tarjeta de prueba de Stripe `4242 4242 4242 4242`
3. Después del pago, deberías ser redirigido de vuelta a tu aplicación a través del enlace universal
4. Verifica que tu webhook recibió el evento `checkout.session.completed`

## Conclusión

La capacidad de usar opciones de pago externas para bienes digitales en aplicaciones iOS es un cambio significativo que le da a los desarrolladores más flexibilidad. Aunque este cambio actualmente solo se aplica a aplicaciones en la App Store de EE. UU., proporciona una alternativa importante al sistema de compras dentro de la aplicación de Apple.

Al usar Enlaces de Pago de Stripe con Capacitor, puedes implementar rápidamente una experiencia de pago simplificada mientras mantienes el cumplimiento con las pautas de Apple. Este enfoque también te brinda la ventaja de la robusta infraestructura de pago de Stripe, tarifas de procesamiento más bajas (3% vs 30%), y pagos mucho más rápidos (días en lugar de meses) en comparación con el sistema de compras dentro de la aplicación de Apple.

Recuerda que deberás manejar todos los temas de soporte al cliente y reembolsos directamente, ya que estas transacciones ocurren fuera del ecosistema de Apple.

¿Has implementado Enlaces de Pago de Stripe en tu aplicación de Capacitor? ¡Comparte tu experiencia en los comentarios a continuación!

## Preguntas Frecuentes

**P: ¿Es este enfoque compatible con las pautas de Apple?**  
R: Sí, a partir del 1 de mayo de 2025, Apple permite enlazar a métodos de pago externos para bienes y servicios digitales en aplicaciones distribuidas en la App Store de EE. UU., siempre que incluyas las divulgaciones requeridas.

**P: ¿Necesito pagar la comisión de Apple al usar métodos de pago externos?**  
R: No, uno de los principales beneficios de las nuevas reglas es que los pagos procesados fuera del sistema de Apple no están sujetos a su comisión.

**P: ¿Mi empresa necesita estar basada en los Estados Unidos para aprovechar estas nuevas reglas?**  
R: No, cualquier empresa de cualquier parte del mundo puede implementar métodos de pago externos siempre que tu aplicación esté disponible en la App Store de EE. UU. y los usuarios que realicen las compras se encuentren en los Estados Unidos. La normativa se aplica al mercado (App Store de EE. UU.) y a la ubicación de los usuarios, no a la ubicación de tu empresa. Esto significa que desarrolladores de Europa, Asia, América del Sur o de cualquier otro lugar pueden implementar Enlaces de Pago de Stripe para sus clientes en EE. UU.

**P: ¿Qué sucede si un usuario fuera de EE. UU. intenta utilizar la opción de pago externo?**  
R: Debes implementar la detección de región (como se muestra en el artículo) para ofrecer solo opciones de pago externas a los usuarios en EE. UU. Para otras regiones, deberías continuar utilizando el sistema de compras dentro de la aplicación de Apple.

**P: ¿Puedo usar esto para bienes o servicios físicos consumidos fuera de la aplicación?**  
R: Sí, Apple siempre ha permitido métodos de pago externos para bienes físicos y servicios consumidos fuera de la aplicación (como transporte compartido o entrega de alimentos).
