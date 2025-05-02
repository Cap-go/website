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
# Mengimplementasikan Stripe Payment Links di Aplikasi Capacitor Sesuai Pedoman Apple Terbaru

Sejak 1 Mei 2025, Apple telah menerapkan perubahan signifikan pada Pedoman Peninjauan App Store setelah putusan pengadilan dalam [kasus Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). Perubahan ini secara khusus mengizinkan pengembang aplikasi di Amerika Serikat untuk mengarahkan ke metode pembayaran eksternal untuk barang dan layanan digital, membuka alternatif untuk sistem pembelian dalam aplikasi Apple.

## Pertarungan Epic yang Mengubah Pembayaran Mobile Selamanya

Perjalanan menuju momen ini telah panjang dan penuh pertentangan. Semua dimulai pada Agustus 2020 ketika Epic Games, pencipta game populer Fortnite, secara sengaja melanggar pedoman App Store Apple dengan mengimplementasikan opsi pembayaran langsung yang melewati komisi 30% Apple. Apple segera menghapus Fortnite dari App Store, dan Epic merespons dengan mengajukan gugatan yang menantang kontrol Apple atas distribusi aplikasi iOS dan pembayaran dalam aplikasi.

Setelah bertahun-tahun pertarungan hukum, banding, dan banding balasan, pengadilan akhirnya memutuskan bahwa Apple harus mengizinkan pengembang untuk mengarahkan pengguna ke metode pembayaran alternatif di luar aplikasi mereka. Keputusan ini secara fundamental mengubah ekonomi ekosistem App Store, yang telah beroperasi di bawah model keuangan dasar yang sama sejak awal berdirinya pada 2008.

### Putusan Final - Tidak Ada Lagi Banding

Yang membuat putusan ini sangat penting adalah bahwa ini bersifat final dan tidak dapat dibanding lebih lanjut. Mahkamah Agung menolak untuk mendengar banding Apple pada awal 2025, mengukuhkan keputusan pengadilan yang lebih rendah sebagai hukum yang berlaku. Ini berarti pengembang dapat mengimplementasikan metode pembayaran eksternal dengan keyakinan bahwa Apple tidak dapat membatalkan keputusan ini melalui tantangan hukum lebih lanjut.

### Perlakuan Setara Dijamin oleh Hukum

Yang terpenting, putusan tersebut secara eksplisit menyatakan bahwa Apple tidak boleh mendiskriminasi aplikasi yang menggunakan metode pembayaran eksternal. Pengadilan secara khusus melarang Apple dari:

1. Mengenakan biaya tambahan atau memberlakukan persyaratan tambahan pada aplikasi yang menggunakan metode pembayaran eksternal
2. Memberikan perlakuan istimewa dalam hasil pencarian atau fitur untuk aplikasi yang secara eksklusif menggunakan sistem IAP Apple
3. Menggunakan langkah-langkah teknis untuk membuat pengalaman pembayaran eksternal lebih rendah dari sistem Apple sendiri
4. Memberlakukan persyaratan pengungkapan yang memberatkan di luar informasi konsumen dasar

Perlindungan eksplisit ini berarti pengembang dapat mengimplementasikan Stripe atau penyedia pembayaran eksternal lainnya tanpa takut pembalasan halus atau diskriminasi dari Apple. Arena persaingan telah diratakan secara hukum, dan Apple harus memperlakukan semua aplikasi secara setara terlepas dari pilihan metode pembayaran mereka.

Putusan ini merepresentasikan salah satu tantangan paling signifikan terhadap pendekatan walled garden Apple dan menandai pergeseran penting dalam cara monetisasi aplikasi mobile dapat bekerja. Bagi pengembang yang telah lama mengeluhkan komisi 30% Apple (diturunkan menjadi 15% untuk bisnis kecil), putusan ini menawarkan jalan menuju margin keuntungan yang lebih tinggi dan kontrol lebih besar atas pengalaman pelanggan.

## Manfaat Finansial Menggunakan Stripe Dibandingkan Pembelian Dalam Aplikasi Apple

Implikasi finansial dari perubahan ini substansial bagi pengembang:

- **Biaya Pemrosesan Pembayaran yang Lebih Rendah**: Apple biasanya mengenakan komisi 30% untuk pembelian dalam aplikasi (15% untuk bisnis kecil), sementara biaya Stripe hanya sekitar 2,9% + $0,30 per transaksi. Perbedaan ini dapat secara signifikan meningkatkan margin pendapatan Anda.
  
- **Pembayaran Lebih Cepat**: Dengan Apple, Anda biasanya menunggu 45-90 hari untuk menerima dana Anda. Stripe, sebaliknya, menyetor pembayaran ke rekening bank Anda dalam 2-3 hari kerja.

- **Proses Pengembalian Dana yang Disederhanakan**: Tangani pengembalian dana langsung melalui dashboard Stripe alih-alih melalui sistem pengembalian dana Apple yang lebih kompleks.

Penghematan biaya dan peningkatan arus kas ini bisa menjadi game-changing, terutama untuk pengembang dan bisnis yang lebih kecil.

Dalam artikel ini, kita akan mengeksplorasi cara mengimplementasikan Stripe Payment Links di aplikasi Capacitor Anda untuk memanfaatkan aturan baru ini, sambil memastikan kepatuhan dengan [pedoman yang diperbarui](https://developer.apple.com/app-store/review/guidelines/#business) Apple.

> Implementasi ini didasarkan pada [dokumentasi resmi Stripe untuk Payment Links](https://docs.stripe.com/mobile/digital-goods/payment-links), yang disesuaikan khusus untuk aplikasi Capacitor.

## Memahami Pedoman Baru

Pedoman Peninjauan App Store yang diperbarui sekarang mengizinkan pengembang untuk mengarahkan pengguna ke situs web eksternal untuk pemrosesan pembayaran, khususnya untuk barang dan langganan digital. Perubahan ini saat ini hanya berlaku untuk aplikasi yang didistribusikan di App Store Amerika Serikat.

Poin-poin penting yang perlu dipahami:

1. Anda sekarang dapat menautkan ke opsi pembayaran eksternal untuk barang digital dalam aplikasi Anda
2. Ini hanya berlaku untuk aplikasi di App Store A.S.
3. Anda masih harus mematuhi persyaratan pengungkapan Apple
4. Anda tetap bertanggung jawab atas semua dukungan pelanggan dan penanganan pengembalian dana

## Menyiapkan Stripe Payment Links di Aplikasi Capacitor Anda

Mari kita dalami implementasi teknisnya:

### Langkah 1: Membuat Payment Link di Dashboard Stripe

Pertama, buat payment link di Dashboard Stripe Anda:

1. Navigasikan ke bagian Payment Links di Dashboard Stripe Anda
2. Klik "+ New" untuk membuat payment link baru
3. Tentukan detail produk atau langganan Anda
4. Di bawah pengaturan "After payment", pilih "Don't show confirmation page"
5. Tetapkan universal link sebagai URL sukses Anda (kita akan mengonfigurasi ini nanti)
6. Klik "Create Link" untuk menghasilkan payment link Anda

### Langkah 2: Menyiapkan Universal Links di Aplikasi Capacitor Anda

Untuk mengarahkan pengguna kembali ke aplikasi Anda setelah pembayaran selesai, konfigurasikan universal links:

1. Buat file `apple-app-site-association` di domain Anda:

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

2. Host file ini di `https://yourdomain.com/.well-known/apple-app-site-association`

3. Pastikan file tersebut disajikan dengan tipe MIME yang benar `application/json`

4. Konfigurasikan aplikasi Capacitor Anda untuk menangani universal links dengan menambahkan entitlement yang tepat. Pertama, di `capacitor.config.ts` Anda:

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

5. Tambahkan Associated Domains entitlement ke proyek Xcode Anda:
   - Buka proyek Xcode Anda
   - Pilih target aplikasi Anda
   - Pergi ke "Signing & Capabilities"
   - Klik "+ Capability" dan pilih "Associated Domains"
   - Tambahkan `applinks:yourdomain.com`

### Langkah 3: Membuat Halaman Fallback

Buat halaman fallback di URL pengalihan untuk menangani kasus di mana aplikasi tidak terinstal:

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

### Langkah 4: Mengimplementasikan Tombol Pembayaran di Aplikasi Capacitor Anda

Sekarang, tambahkan tombol pembayaran ke aplikasi Anda:

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

> **Mengapa Safari Penting**: Membuka payment link di Safari (melalui `window.open`) daripada browser dalam aplikasi bermanfaat karena pengguna yang sebelumnya telah menyimpan informasi pembayaran mereka dengan Stripe Link akan memiliki kredensial mereka tersedia secara otomatis. Ini menciptakan pengalaman checkout yang lebih lancar di mana pengguna tidak perlu memasukkan kembali informasi kartu kredit mereka, secara signifikan mengurangi gesekan dan tingkat abandonment.

### Langkah 5: Menangani Universal Links di Aplikasi Anda

Konfigurasikan aplikasi Anda untuk menangani universal links ketika pengguna diarahkan kembali:

1. Pertama, instal plugin App:

```bash
npm install @capacitor/app
```

2. Daftarkan plugin App di aplikasi Anda:

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

### Langkah 6: Menyiapkan Webhook untuk Pemenuhan Pesanan

Terakhir, konfigurasikan webhook di server Anda untuk menangani pembayaran yang berhasil:

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

## Kompatibilitas Android

Mari kita jelaskan: putusan Epic v. Apple telah secara fundamental mengubah lanskap pembayaran mobile. Tidak hanya berdampak langsung pada aplikasi iOS, tetapi juga memperkuat posisi pengembang Android yang telah menggunakan metode pembayaran eksternal.

**Pengembang Android sekarang dapat mengimplementasikan solusi pembayaran eksternal dengan kepercayaan penuh.** Preseden yang ditetapkan oleh putusan Apple secara efektif melindungi pengembang di seluruh platform dari kemungkinan pembatasan di masa depan. Keputusan pengadilan ini telah memvalidasi apa yang telah dilakukan banyak pengembang Android selama bertahun-tahun - menawarkan opsi pembayaran alternatif dengan biaya lebih rendah.

Google Play Store selalu kurang ketat tentang metode pembayaran eksternal dibandingkan Apple, dan sekarang dengan preseden hukum yang ditetapkan, hampir tidak ada risiko dalam mengimplementasikan Stripe atau penyedia pembayaran eksternal lainnya di aplikasi Android Anda. Anda dapat melanjutkan dengan implementasi ini dengan mengetahui Anda berada di landasan hukum yang solid.

Implementasi yang telah kita bahas untuk iOS bekerja hampir identik untuk perangkat Android. Karena Google Play Store tidak memiliki pembatasan yang sama pada metode pembayaran eksternal, Anda dapat menggunakan pendekatan Stripe Payment Links yang sama tanpa memerlukan dialog pengungkapan khusus.

Untuk menangani deep linking (setara dengan universal links di iOS), Anda perlu:

1. Menyiapkan App Links di `AndroidManifest.xml` Anda untuk menangani URL pengalihan
2. Membuat file `.well-known/assetlinks.json` di domain Anda dengan detail aplikasi Anda
3. Menggunakan logika pendengar `appUrlOpen` yang sama untuk memproses pembayaran yang berhasil

Keindahan Capacitor adalah bahwa setelah Anda mengimplementasikan konfigurasi khusus platform, kode alur pembayaran aktual tetap sama di kedua platform.

## Membuat UI Pembayaran

Berikut adalah contoh komponen tombol pembayaran di Vue yang dapat Anda tambahkan ke aplikasi Capacitor Anda:

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

## Menangani Berbagai Wilayah

Karena pedoman Apple yang baru hanya berlaku untuk aplikasi di App Store A.S., Anda akan memerlukan strategi untuk mendeteksi wilayah pengguna dan menerapkan metode pembayaran yang sesuai. Berikut pendekatan yang lebih andal menggunakan geolokasi IP:

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

Pendekatan ini menggunakan layanan `ipapi.co` gratis untuk menentukan negara pengguna berdasarkan alamat IP mereka. Anda juga bisa menggunakan layanan geolokasi lain seperti MaxMind, atau mengimplementasikan pemeriksaan ini di sisi server untuk keamanan tambahan.

> **Catatan**: Meskipun pendekatan ini berhasil, penting untuk diingat bahwa geolokasi IP tidak selalu 100% akurat. Untuk aplikasi yang sangat penting, pertimbangkan untuk menggunakan beberapa metode deteksi atau memungkinkan pengguna memilih wilayah mereka secara manual.

### Deteksi Lokasi Lebih Akurat dengan Plugin Capacitor

Untuk deteksi lokasi yang lebih akurat, Anda dapat menggunakan plugin Capacitor Geolocation bersama dengan @capgo/nativegeocoder untuk menentukan negara pengguna dengan presisi yang lebih tinggi:

1. Pertama, instal plugin yang diperlukan:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Konfigurasi plugin dalam proyek Capacitor Anda. Tambahkan berikut ini ke `capacitor.config.ts` Anda:

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

3. Implementasikan deteksi wilayah berbasis lokasi:

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

Implementasi ini menyediakan cara yang lebih akurat untuk menentukan apakah pengguna secara fisik berada di Amerika Serikat. Pertama mencoba menggunakan GPS perangkat dan geocoder native untuk menentukan negara. Jika itu gagal (karena masalah izin atau kesalahan lain), akan kembali ke deteksi berbasis IP.

Ingat untuk menambahkan izin yang diperlukan ke file `info.plist` (iOS) dan `AndroidManifest.xml` (Android):

Untuk iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Untuk Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Menggunakan pendekatan ini memberikan Anda cara paling akurat untuk menentukan apakah pengguna memenuhi syarat untuk opsi pembayaran eksternal di bawah pedoman Apple yang baru.

## Mengelola Langganan

Salah satu keuntungan utama menggunakan Stripe untuk pembayaran adalah kemampuan untuk menawarkan dan mengelola langganan. Berikut cara menangani manajemen langganan di aplikasi Capacitor Anda:

### 1. Membuat Halaman Manajemen Langganan

Tambahkan halaman manajemen langganan di aplikasi Anda untuk menampilkan langganan aktif pengguna:

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

### 2. Portal Pelanggan untuk Manajemen Langganan

Stripe menawarkan Portal Pelanggan yang memungkinkan pengguna mengelola langganan mereka. Anda dapat membuat tautan ke portal ini dari server Anda:

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

## Memastikan Kepatuhan App Store

Untuk memastikan implementasi Anda mematuhi pedoman Apple:

1. Sertakan pengungkapan yang sesuai tentang pembelian eksternal
2. Implementasikan lembar modal yang menginformasikan pengguna bahwa mereka meninggalkan aplikasi (seperti yang disyaratkan oleh Apple)
3. Jangan mencoba menghindari komisi Apple pada pembelian yang dilakukan dalam aplikasi
4. Komunikasikan dengan jelas kepada pengguna bahwa Apple tidak bertanggung jawab atas transaksi

Berikut contoh implementasi modal pengungkapan yang diperlukan:

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

## Menguji Implementasi Anda

Untuk menguji implementasi Anda:

1. Klik tombol pembayaran di aplikasi Anda, yang seharusnya menampilkan pengungkapan dan kemudian membuka halaman pembayaran Stripe
2. Selesaikan pembayaran uji menggunakan kartu uji Stripe `4242 4242 4242 4242`
3. Setelah pembayaran, Anda harus dialihkan kembali ke aplikasi Anda melalui tautan universal
4. Periksa bahwa webhook Anda menerima event `checkout.session.completed`

## Kesimpulan

Kemampuan untuk menggunakan opsi pembayaran eksternal untuk barang digital dalam aplikasi iOS adalah perubahan signifikan yang memberikan pengembang lebih banyak fleksibilitas. Meskipun perubahan ini saat ini hanya berlaku untuk aplikasi di App Store AS, ini memberikan alternatif penting untuk sistem pembelian dalam aplikasi Apple.

Dengan menggunakan Stripe Payment Links dengan Capacitor, Anda dapat dengan cepat mengimplementasikan pengalaman checkout yang efisien sambil mempertahankan kepatuhan dengan pedoman Apple. Pendekatan ini juga memberi Anda keuntungan dari infrastruktur pembayaran Stripe yang kuat, biaya pemrosesan yang lebih rendah (3% vs 30%), dan pembayaran yang jauh lebih cepat (hari alih-alih bulan) dibandingkan dengan sistem pembelian dalam aplikasi Apple.

Ingat bahwa Anda perlu menangani semua dukungan pelanggan dan masalah pengembalian dana secara langsung, karena transaksi ini terjadi di luar ekosistem Apple.

Sudahkah Anda mengimplementasikan Stripe Payment Links di aplikasi Capacitor Anda? Bagikan pengalaman Anda di komentar di bawah!

## FAQ

**T: Apakah pendekatan ini sesuai dengan pedoman Apple?**  
J: Ya, per 1 Mei 2025, Apple mengizinkan tautan ke metode pembayaran eksternal untuk barang dan layanan digital dalam aplikasi yang didistribusikan di App Store AS, asalkan Anda menyertakan pengungkapan yang diperlukan.

**T: Apakah saya perlu membayar komisi Apple saat menggunakan metode pembayaran eksternal?**  
J: Tidak, salah satu keuntungan utama dari aturan baru adalah bahwa pembayaran yang diproses di luar sistem Apple tidak dikenakan komisi mereka.

**T: Apakah perusahaan saya harus berbasis di Amerika Serikat untuk memanfaatkan aturan baru ini?**  
J: Tidak, perusahaan dari mana saja di dunia dapat mengimplementasikan metode pembayaran eksternal selama aplikasi Anda tersedia di App Store AS dan pengguna yang melakukan pembelian berada di Amerika Serikat. Peraturan ini berlaku untuk marketplace (App Store AS) dan lokasi pengguna, bukan lokasi perusahaan Anda. Ini berarti pengembang dari Eropa, Asia, Amerika Selatan, atau di mana pun dapat mengimplementasikan Stripe Payment Links untuk pelanggan mereka yang berbasis di AS.

**T: Apa yang terjadi jika pengguna di luar AS mencoba menggunakan opsi pembayaran eksternal?**  
J: Anda harus mengimplementasikan deteksi wilayah (seperti yang ditunjukkan dalam artikel) untuk hanya menawarkan opsi pembayaran eksternal kepada pengguna di AS. Untuk wilayah lain, Anda harus terus menggunakan sistem pembelian dalam aplikasi Apple.

**T: Bisakah saya menggunakan ini untuk barang fisik atau layanan yang dikonsumsi di luar aplikasi?**  
J: Ya, Apple selalu mengizinkan metode pembayaran eksternal untuk barang fisik dan layanan yang dikonsumsi di luar aplikasi (seperti berbagi tumpangan atau pengiriman makanan).
