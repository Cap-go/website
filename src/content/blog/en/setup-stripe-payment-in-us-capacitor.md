---
slug: setup-stripe-payment-in-us-capacitor
title: Implementing Stripe Payment Links in Capacitor Apps Following New Apple Guidelines
description: Learn how to implement Stripe Payment Links in your Capacitor app to process digital goods payments in compliance with new Apple guidelines effective May 1, 2025.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-11-21T03:09:54.000Z
head_image: /stripe_apple.webp
head_image_alt: Stripe payment implementation in Capacitor apps
keywords: capacitor, stripe, payment links, app store guidelines, iOS, digital goods, in-app purchases, external payments
tag: Tutorial
published: true
locale: en
---

# Implementing Stripe Payment Links in Capacitor Apps Following New Apple Guidelines

As of May 1, 2025, Apple has implemented significant changes to its App Store Review Guidelines following the court ruling in the [Epic v. Apple case](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). These changes specifically allow app developers in the United States to link out to external payment methods for digital goods and services, opening up alternatives to Apple's in-app purchase system.

## The Epic Battle That Changed Mobile Payments Forever

The path to this moment has been long and contentious. It all began in August 2020 when Epic Games, the creator of the wildly popular game Fortnite, deliberately violated Apple's App Store guidelines by implementing a direct payment option that bypassed Apple's 30% commission. Apple promptly removed Fortnite from the App Store, and Epic responded by filing a lawsuit challenging Apple's control over iOS app distribution and in-app payments.

After years of legal battles, appeals, and counter-appeals, the courts finally ruled that Apple must allow developers to direct users to alternative payment methods outside their apps. This decision fundamentally changes the economics of the App Store ecosystem, which has been operating under the same basic financial model since its inception in 2008.

### The Final Ruling - No More Appeals

What makes this ruling particularly significant is that it's final and cannot be appealed further. The Supreme Court declined to hear Apple's appeal in early 2025, cementing the lower court's decision as the law of the land. This means developers can implement external payment methods with confidence that Apple cannot reverse this decision through further legal challenges.

### Equal Treatment Guaranteed by Law

Most importantly, the ruling explicitly states that Apple cannot discriminate against apps that use external payment methods. The court specifically prohibited Apple from:

1. Charging additional fees or imposing extra requirements on apps that use external payment methods
2. Giving preferential treatment in search results or featuring to apps that exclusively use Apple's IAP system
3. Using technical measures to make external payment experiences inferior to Apple's own system
4. Imposing burdensome disclosure requirements beyond basic consumer information

These explicit protections mean that developers can implement Stripe or other external payment providers without fear of subtle retaliation or discrimination from Apple. The playing field has been legally leveled, and Apple must treat all apps equally regardless of their payment method choices.

The ruling represents one of the most significant challenges to Apple's walled garden approach and marks a pivotal shift in how mobile app monetization can work. For developers who have long complained about Apple's 30% commission (reduced to 15% for small businesses), this ruling offers a path to higher profit margins and more control over the customer experience.

## Financial Benefits of Using Stripe Over Apple's In-App Purchases

The financial implications of this change are substantial for developers:

- **Reduced Payment Processing Fees**: Apple typically charges a 30% commission on in-app purchases (15% for small businesses), while Stripe's fee is only around 2.9% + $0.30 per transaction. This difference can significantly increase your revenue margins.
  
- **Faster Payouts**: With Apple, you typically wait 45-90 days to receive your funds. Stripe, on the other hand, deposits payments to your bank account within 2-3 business days.

- **Simplified Refund Process**: Handle refunds directly through Stripe's dashboard instead of going through Apple's more complex refund system.

These cost savings and improved cash flow can be game-changing, especially for smaller developers and businesses.

In this article, we'll explore how to implement Stripe Payment Links in your Capacitor app to take advantage of these new rules, while ensuring compliance with Apple's [updated guidelines](https://developer.apple.com/app-store/review/guidelines/#business).

> This implementation is based on [Stripe's official documentation for Payment Links](https://docs.stripe.com/mobile/digital-goods/payment-links), adapted specifically for Capacitor apps.

## Understanding the New Guidelines

The updated App Store Review Guidelines now permit developers to direct users to external websites for payment processing, specifically for digital goods and subscriptions. This change is currently only applicable to apps distributed in the United States App Store.

Key points to understand:

1. You can now link to external payment options for digital goods within your app
2. This only applies to apps in the U.S. App Store
3. You must still comply with Apple's disclosure requirements
4. You remain responsible for all customer support and refund handling

## Setting Up Stripe Payment Links in Your Capacitor App

Let's dive into the technical implementation:

### Step 1: Create a Payment Link in Stripe Dashboard

First, create a payment link in your Stripe Dashboard:

1. Navigate to the Payment Links section in your Stripe Dashboard
2. Click "+ New" to create a new payment link
3. Define your product or subscription details
4. Under "After payment" settings, select "Don't show confirmation page"
5. Set a universal link as your success URL (we'll configure this later)
6. Click "Create Link" to generate your payment link

### Step 2: Set Up Universal Links in Your Capacitor App

To redirect users back to your app after payment completion, configure universal links:

1. Create an `apple-app-site-association` file on your domain:

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

2. Host this file at `https://yourdomain.com/.well-known/apple-app-site-association`

3. Make sure it's served with the correct MIME type `application/json`

4. Configure your Capacitor app to handle universal links by adding the proper entitlement. First, in your `capacitor.config.ts`:

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

5. Add the Associated Domains entitlement to your Xcode project:
   - Open your Xcode project
   - Select your app target
   - Go to "Signing & Capabilities"
   - Click "+ Capability" and select "Associated Domains"
   - Add `applinks:yourdomain.com`

### Step 3: Create a Fallback Page

Create a fallback page at the redirect URL to handle cases where the app isn't installed:

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

### Step 4: Implement the Payment Button in Your Capacitor App

Now, add the payment button to your app:

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

> **Why Safari Matters**: Opening the payment link in Safari (via `window.open`) rather than an in-app browser is beneficial because users who have previously saved their payment information with Stripe Link will have their credentials automatically available. This creates a smoother checkout experience where users won't need to re-enter their credit card information, significantly reducing friction and abandonment rates.

### Step 5: Handle Universal Links in Your App

Configure your app to handle the universal links when users are redirected back:

1. First, install the App plugin:

```bash
npm install @capacitor/app
```

2. Register the App plugin in your app:

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

### Step 6: Set Up Webhook for Order Fulfillment

Finally, configure a webhook on your server to handle successful payments:

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

## Android Compatibility

Let's be clear: the Epic v. Apple ruling has fundamentally changed the mobile payment landscape. Not only does it directly impact iOS apps, but it also strengthens the position of Android developers who have been using external payment methods.

**Android developers can now implement external payment solutions with complete confidence.** The precedent set by the Apple ruling effectively shields developers across platforms from potential future restrictions. This court decision has validated what many Android developers have been doing for years - offering alternative payment options with lower fees.

Google's Play Store has always been less restrictive about external payment methods than Apple, and now with the legal precedent established, there's virtually no risk in implementing Stripe or other external payment providers in your Android apps. You can move forward with these implementations knowing you're on solid legal ground.

The implementation we've covered for iOS works nearly identically for Android devices. Since Google Play Store doesn't have the same restrictions on external payment methods, you can use the exact same Stripe Payment Links approach without needing special disclosure dialogs.

To handle the deep linking (equivalent to universal links on iOS), you'll need to:

1. Set up App Links in your `AndroidManifest.xml` to handle the redirect URL
2. Create a `.well-known/assetlinks.json` file on your domain with your app's details
3. Use the same `appUrlOpen` listener logic to process successful payments

The beauty of Capacitor is that once you've implemented the platform-specific configurations, the actual payment flow code remains the same across both platforms.

## Creating a Payment UI

Here's an example of a payment button component in Vue that you can add to your Capacitor app:

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

## Handling Different Regions

Since the new Apple guidelines only apply to apps in the U.S. App Store, you'll need a strategy to detect user regions and apply the appropriate payment method. Here's a more reliable approach using IP geolocation:

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

This approach uses the free `ipapi.co` service to determine the user's country based on their IP address. You could also use other geolocation services like MaxMind, or implement this check server-side for added security.

> **Note**: While this approach works, it's important to remember that IP geolocation isn't always 100% accurate. For mission-critical applications, consider using multiple detection methods or allowing users to manually select their region.

### More Accurate Location Detection with Capacitor Plugins

For more accurate location detection, you can use the Capacitor Geolocation plugin along with @capgo/nativegeocoder to determine the user's country with higher precision:

1. First, install the required plugins:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Configure the plugins in your Capacitor project. Add the following to your `capacitor.config.ts`:

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

3. Implement the location-based region detection:

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

This implementation provides a more accurate way to determine if a user is physically located in the United States. It first tries to use the device's GPS and the native geocoder to determine the country. If that fails (due to permission issues or other errors), it falls back to IP-based detection.

Remember to add the necessary permissions to your `info.plist` (iOS) and `AndroidManifest.xml` (Android) files:

For iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

For Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Using this approach gives you the most accurate way to determine if a user is eligible for external payment options under the new Apple guidelines.

## Managing Subscriptions

One key advantage of using Stripe for payments is the ability to offer and manage subscriptions. Here's how to handle subscription management in your Capacitor app:

### 1. Creating a Subscription Management Page

Add a subscription management page in your app to display the user's active subscriptions:

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

### 2. Customer Portal for Subscription Management

Stripe offers a Customer Portal that allows users to manage their subscriptions. You can create a link to this portal from your server:

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

## Ensuring App Store Compliance

To ensure your implementation complies with Apple's guidelines:

1. Include appropriate disclosures about external purchases
2. Implement a modal sheet informing users they're leaving the app (as required by Apple)
3. Don't attempt to circumvent Apple's commission on purchases made within the app
4. Clearly communicate to users that Apple is not responsible for the transaction

Here's an example of implementing the required disclosure modal:

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

## Testing Your Implementation

To test your implementation:

1. Click your payment button in your app, which should show the disclosure and then open the Stripe payment page
2. Complete a test payment using Stripe test card `4242 4242 4242 4242`
3. After payment, you should be redirected back to your app via the universal link
4. Check that your webhook received the `checkout.session.completed` event

## Conclusion

The ability to use external payment options for digital goods in iOS apps is a significant change that gives developers more flexibility. While this change currently only applies to apps in the U.S. App Store, it provides an important alternative to Apple's in-app purchase system.

By using Stripe Payment Links with Capacitor, you can quickly implement a streamlined checkout experience while maintaining compliance with Apple's guidelines. This approach also gives you the advantage of Stripe's robust payment infrastructure, lower processing fees (3% vs 30%), and much faster payouts (days instead of months) compared to Apple's in-app purchase system.

Remember that you'll need to handle all customer support and refund issues directly, as these transactions occur outside of Apple's ecosystem.

Have you implemented Stripe Payment Links in your Capacitor app? Share your experience in the comments below!

## FAQs

**Q: Is this approach compliant with Apple's guidelines?**  
A: Yes, as of May 1, 2025, Apple allows linking to external payment methods for digital goods and services in apps distributed in the U.S. App Store, provided you include the required disclosures.

**Q: Do I need to pay Apple's commission when using external payment methods?**  
A: No, one of the major benefits of the new rules is that payments processed outside of Apple's system are not subject to their commission.

**Q: Does my company need to be based in the United States to take advantage of these new rules?**  
A: No, any company from anywhere in the world can implement external payment methods as long as your app is available in the US App Store and the users making the purchases are located in the United States. The ruling applies to the marketplace (US App Store) and the location of the users, not the location of your company. This means developers from Europe, Asia, South America, or anywhere else can implement Stripe Payment Links for their US-based customers.

**Q: What happens if a user outside the U.S. tries to use the external payment option?**  
A: You should implement region detection (as shown in the article) to only offer external payment options to users in the U.S. For other regions, you should continue using Apple's in-app purchase system.

**Q: Can I use this for physical goods or services consumed outside the app?**  
A: Yes, Apple has always allowed external payment methods for physical goods and services consumed outside the app (like ride-sharing or food delivery).
