---
slug: setup-stripe-payment-in-us-capacitor
title: >-
  Mengimplementasikan Tautan Pembayaran Stripe di Aplikasi Capacitor Mengikuti
  Pedoman Baru Apple
description: >-
  Pelajari cara mengimplementasikan Tautan Pembayaran Stripe di aplikasi
  Capacitor Anda untuk memproses pembayaran barang digital sesuai dengan pedoman
  baru Apple yang berlaku mulai 1 Mei 2025.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-11-21T05:04:49.000Z
head_image: /stripe_apple.webp
head_image_alt: Implementasi pembayaran Stripe dalam aplikasi Capacitor
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: id
---
# Mengimplementasikan Tautan Pembayaran Stripe di Aplikasi Capacitor Menyusul Pedoman Apple Baru

Mulai 1 Mei 2025, Apple telah menerapkan perubahan signifikan pada Pedoman Tinjauan App Store setelah putusan pengadilan dalam kasus [Epic v. Apple](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf). Perubahan ini secara khusus memungkinkan pengembang aplikasi di Amerika Serikat untuk menghubungkan metode pembayaran eksternal untuk barang dan layanan digital, membuka alternatif untuk sistem pembelian dalam aplikasi Apple.

## Pertarungan Epic yang Mengubah Pembayaran Seluler Selamanya

Jalan menuju momen ini telah lama dan penuh sengketa. Semua dimulai pada Agustus 2020 ketika Epic Games, pencipta game yang sangat populer Fortnite, secara sengaja melanggar pedoman App Store Apple dengan menerapkan opsi pembayaran langsung yang melewati komisi 30% Apple. Apple segera menghapus Fortnite dari App Store, dan Epic merespons dengan mengajukan gugatan yang menantang kontrol Apple atas distribusi aplikasi iOS dan pembayaran dalam aplikasi.

Setelah bertahun-tahun pertempuran hukum, banding, dan kontra-banding, pengadilan akhirnya memutuskan bahwa Apple harus mengizinkan pengembang untuk mengarahkan pengguna ke metode pembayaran alternatif di luar aplikasi mereka. Keputusan ini secara fundamental mengubah ekonomi ekosistem App Store, yang telah beroperasi di bawah model keuangan dasar yang sama sejak didirikan pada tahun 2008.

### Putusan Akhir - Tidak Ada Lagi Banding

Yang membuat putusan ini sangat signifikan adalah bahwa ini bersifat final dan tidak dapat diajukan banding lebih lanjut. Mahkamah Agung menolak untuk mendengarkan banding Apple pada awal 2025, mengukuhkan keputusan pengadilan yang lebih rendah sebagai hukum yang berlaku. Ini berarti pengembang dapat menerapkan metode pembayaran eksternal dengan keyakinan bahwa Apple tidak dapat membalikkan keputusan ini melalui tantangan hukum lebih lanjut.

### Perlakuan Setara Dijamin oleh Hukum

Paling penting, keputusan tersebut secara eksplisit menyatakan bahwa Apple tidak dapat mendiskriminasi aplikasi yang menggunakan metode pembayaran eksternal. Pengadilan secara khusus melarang Apple dari:

1. Membebankan biaya tambahan atau menetapkan persyaratan tambahan pada aplikasi yang menggunakan metode pembayaran eksternal
2. Memberikan perlakuan istimewa dalam hasil pencarian atau penonjolan kepada aplikasi yang secara eksklusif menggunakan sistem IAP Apple
3. Menggunakan langkah teknis untuk membuat pengalaman pembayaran eksternal menjadi inferior dibandingkan sistem milik Apple
4. Menerapkan persyaratan pengungkapan yang memberatkan di luar informasi konsumen dasar

Perlindungan eksplisit ini berarti bahwa pengembang dapat menerapkan Stripe atau penyedia pembayaran eksternal lainnya tanpa takut akan pembalasan halus atau diskriminasi dari Apple. Lapangan permainan secara hukum telah diratakan, dan Apple harus memperlakukan semua aplikasi secara setara terlepas dari pilihan metode pembayaran mereka.

Putusan ini merupakan salah satu tantangan paling signifikan terhadap pendekatan kebun terkurung Apple dan menandai pergeseran penting dalam cara monetisasi aplikasi seluler dapat bekerja. Bagi pengembang yang telah lama mengeluh tentang komisi 30% Apple (yang dikurangi menjadi 15% untuk bisnis kecil), putusan ini menawarkan jalur menuju margin keuntungan yang lebih tinggi dan lebih banyak kontrol atas pengalaman pelanggan.

## Manfaat Keuangan Menggunakan Stripe Dibandingkan Pembelian Dalam Aplikasi Apple

Implikasi keuangan dari perubahan ini sangat besar bagi pengembang:

- **Biaya Pemrosesan Pembayaran yang Lebih Rendah**: Apple biasanya membebankan komisi 30% pada pembelian dalam aplikasi (15% untuk bisnis kecil), sementara biaya Stripe hanya sekitar 2,9% + $0,30 per transaksi. Perbedaan ini dapat secara signifikan meningkatkan margin pendapatan Anda.
  
- **Pembayaran Lebih Cepat**: Dengan Apple, Anda biasanya menunggu 45-90 hari untuk menerima dana Anda. Stripe, di sisi lain, menyetor pembayaran ke rekening bank Anda dalam waktu 2-3 hari kerja.

- **Proses Pengembalian Yang Sederhana**: Tangani pengembalian langsung melalui dasbor Stripe daripada melalui sistem pengembalian Apple yang lebih rumit.

Penghematan biaya dan arus kas yang ditingkatkan ini dapat mengubah permainan, terutama bagi pengembang dan bisnis kecil.

Dalam artikel ini, kita akan menjelajahi cara mengimplementasikan Tautan Pembayaran Stripe di aplikasi Capacitor Anda untuk memanfaatkan aturan baru ini, sambil memastikan kepatuhan dengan [pedoman Apple yang diperbarui](https://developer.apple.com/app-store/review/guidelines/#business).

> Implementasi ini didasarkan pada [dokumentasi resmi Stripe untuk Tautan Pembayaran](https://docs.stripe.com/mobile/digital-goods/payment-links), yang disesuaikan khusus untuk aplikasi Capacitor.

## Memahami Pedoman Baru

Pedoman Tinjauan App Store yang diperbarui sekarang memperbolehkan pengembang untuk mengarahkan pengguna ke situs web eksternal untuk pemrosesan pembayaran, khususnya untuk barang digital dan langganan. Perubahan ini saat ini hanya berlaku untuk aplikasi yang didistribusikan di App Store Amerika Serikat.

Poin kunci yang perlu dipahami:

1. Anda sekarang dapat menghubungkan ke opsi pembayaran eksternal untuk barang digital dalam aplikasi Anda
2. Ini hanya berlaku untuk aplikasi di App Store AS
3. Anda tetap harus mematuhi persyaratan pengungkapan Apple
4. Anda bertanggung jawab atas semua dukungan pelanggan dan penanganan pengembalian dana

## Menyiapkan Tautan Pembayaran Stripe di Aplikasi Capacitor Anda

Mari kita selami implementasi teknisnya:

### Langkah 1: Buat Tautan Pembayaran di Dasbor Stripe

Pertama, buat tautan pembayaran di Dasbor Stripe Anda:

1. Navigasikan ke bagian Tautan Pembayaran di Dasbor Stripe Anda
2. Klik "+ Baru" untuk membuat tautan pembayaran baru
3. Definisikan rincian produk atau langganan Anda
4. Di bawah pengaturan "Setelah pembayaran", pilih "Jangan tampilkan halaman konfirmasi"
5. Atur tautan universal sebagai URL keberhasilan Anda (kita akan mengonfigurasi ini nanti)
6. Klik "Buat Tautan" untuk menghasilkan tautan pembayaran Anda

### Langkah 2: Siapkan Tautan Universal di Aplikasi Capacitor Anda

Untuk mengarahkan pengguna kembali ke aplikasi Anda setelah penyelesaian pembayaran, konfigurasikan tautan universal:

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

2. Hosting file ini di `https://yourdomain.com/.well-known/apple-app-site-association`

3. Pastikan dilayani dengan tipe MIME yang benar `application/json`

4. Konfigurasikan aplikasi Capacitor Anda untuk menangani tautan universal dengan menambahkan hak istimewa yang tepat. Pertama, di `capacitor.config.ts` Anda:

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

5. Tambahkan hak istimewa Domain Terkait ke proyek Xcode Anda:
   - Buka proyek Xcode Anda
   - Pilih target aplikasi Anda
   - Pergi ke "Signing & Capabilities"
   - Klik "+ Capability" dan pilih "Associated Domains"
   - Tambahkan `applinks:yourdomain.com`

### Langkah 3: Buat Halaman Cadangan

Buat halaman cadangan di URL pengalihan untuk menangani kasus di mana aplikasi tidak terinstal:

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

### Langkah 4: Terapkan Tombol Pembayaran di Aplikasi Capacitor Anda

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

> **Mengapa Safari Penting**: Membuka tautan pembayaran di Safari (melalui `window.open`) daripada browser dalam aplikasi adalah keuntungan karena pengguna yang sebelumnya telah menyimpan informasi pembayaran mereka dengan Stripe Link akan memiliki kredensial mereka tersedia secara otomatis. Ini menciptakan pengalaman checkout yang lebih lancar di mana pengguna tidak perlu memasukkan informasi kartu kredit mereka lagi, secara signifikan mengurangi friksi dan tingkat pengabaian.

### Langkah 5: Tangani Tautan Universal di Aplikasi Anda

Konfigurasikan aplikasi Anda untuk menangani tautan universal saat pengguna dialihkan kembali:

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

### Langkah 6: Siapkan Webhook untuk Pemenuhan Pesanan

Akhirnya, konfigurasikan webhook di server Anda untuk menangani pembayaran yang berhasil:

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

Mari kita jelaskan: putusan Epic v. Apple telah secara mendasar mengubah lanskap pembayaran seluler. Ini tidak hanya berdampak langsung pada aplikasi iOS, tetapi juga memperkuat posisi pengembang Android yang telah menggunakan metode pembayaran eksternal.

**Pengembang Android sekarang dapat menerapkan solusi pembayaran eksternal dengan kepercayaan penuh.** Preseden yang ditetapkan oleh putusan Apple secara efektif melindungi pengembang di seluruh platform dari potensi pembatasan di masa depan. Keputusan pengadilan ini telah memvalidasi apa yang telah dilakukan banyak pengembang Android selama bertahun-tahun - menawarkan opsi pembayaran alternatif dengan biaya yang lebih rendah.

Google Play Store selalu kurang ketat tentang metode pembayaran eksternal dibandingkan Apple, dan sekarang dengan preseden hukum yang ditetapkan, hampir tidak ada risiko dalam menerapkan Stripe atau penyedia pembayaran eksternal lainnya di aplikasi Android Anda. Anda dapat melanjutkan dengan implementasi ini dengan mengetahui bahwa Anda berada di dasar hukum yang solid.

Implementasi yang telah kita bahas untuk iOS bekerja hampir identik untuk perangkat Android. Karena Google Play Store tidak memiliki pembatasan yang sama pada metode pembayaran eksternal, Anda dapat menggunakan pendekatan Tautan Pembayaran Stripe yang persis sama tanpa memerlukan dialog pengungkapan khusus.

Untuk menangani pengalihan mendalam (yang setara dengan tautan universal di iOS), Anda perlu:

1. Menyiapkan App Links di `AndroidManifest.xml` Anda untuk menangani URL pengarah
2. Membuat file `.well-known/assetlinks.json` di domain Anda dengan rincian aplikasi Anda
3. Menggunakan logika pendengar `appUrlOpen` yang sama untuk memproses pembayaran yang berhasil

Keindahan Capacitor adalah bahwa setelah Anda menerapkan konfigurasi spesifik platform, kode alur pembayaran yang sebenarnya tetap sama di kedua platform.

## Membuat Antarmuka Pembayaran

Berikut adalah contoh komponen tombol pembayaran dalam Vue yang dapat Anda tambahkan ke aplikasi Capacitor Anda:

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

## Menangani Berbagai Wilayah

Karena pedoman Apple yang baru hanya berlaku untuk aplikasi di App Store AS, Anda perlu strategi untuk mendeteksi wilayah pengguna dan menerapkan metode pembayaran yang tepat. Berikut adalah pendekatan yang lebih andal menggunakan geolokasi IP:

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

Pendekatan ini menggunakan layanan gratis `ipapi.co` untuk menentukan negara pengguna berdasarkan alamat IP mereka. Anda juga dapat menggunakan layanan geolokasi lainnya seperti MaxMind, atau menerapkan pemeriksaan ini di sisi server untuk keamanan yang lebih baik.

> **Catatan**: Meskipun pendekatan ini berhasil, penting untuk diingat bahwa geolokasi IP tidak selalu 100% akurat. Untuk aplikasi yang sangat penting, pertimbangkan untuk menggunakan beberapa metode deteksi atau memungkinkan pengguna untuk memilih wilayah mereka secara manual.

### Deteksi Lokasi yang Lebih Akurat dengan Plugin Capacitor

Untuk deteksi lokasi yang lebih akurat, Anda dapat menggunakan plugin Geolocation dari Capacitor bersama dengan @capgo/nativegeocoder untuk menentukan negara pengguna dengan presisi yang lebih tinggi:

1. Pertama, instal plugin yang diperlukan:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Konfigurasikan plugin dalam proyek Capacitor Anda. Tambahkan yang berikut ini ke `capacitor.config.ts` Anda:

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

Implementasi ini memberikan cara yang lebih akurat untuk menentukan apakah pengguna berada secara fisik di Amerika Serikat. Pertama, ia mencoba menggunakan GPS perangkat dan geocoder asli untuk menentukan negara. Jika itu gagal (karena masalah izin atau kesalahan lainnya), ia kembali ke deteksi berbasis IP.

Ingat untuk menambahkan izin yang diperlukan ke file `info.plist` Anda (iOS) dan `AndroidManifest.xml` (Android):

Untuk iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Untuk Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Menggunakan pendekatan ini memberi Anda cara yang paling akurat untuk menentukan apakah pengguna memenuhi syarat untuk opsi pembayaran eksternal di bawah pedoman baru Apple.

## Mengelola Langganan

Salah satu keuntungan utama menggunakan Stripe untuk pembayaran adalah kemampuan untuk menawarkan dan mengelola langganan. Berikut adalah cara menangani manajemen langganan di aplikasi Capacitor Anda:

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
2. Implementasikan lembar modal yang memberi tahu pengguna bahwa mereka meninggalkan aplikasi (seperti yang disyaratkan oleh Apple)
3. Jangan mencoba untuk menghindari komisi Apple pada pembelian yang dilakukan di dalam aplikasi
4. Komunikasikan dengan jelas kepada pengguna bahwa Apple tidak bertanggung jawab atas transaksi tersebut

Berikut adalah contoh penerapan modal pengungkapan yang diperlukan:

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

1. Klik tombol pembayaran Anda di aplikasi, yang akan menunjukkan pengungkapan dan kemudian membuka halaman pembayaran Stripe
2. Lengkapi pembayaran uji menggunakan kartu uji Stripe `4242 4242 4242 4242`
3. Setelah pembayaran, Anda harus diarahkan kembali ke aplikasi Anda melalui tautan universal
4. Periksa bahwa webhook Anda menerima peristiwa `checkout.session.completed`

## Kesimpulan

Kemampuan untuk menggunakan opsi pembayaran eksternal untuk barang digital di aplikasi iOS adalah perubahan signifikan yang memberikan lebih banyak fleksibilitas kepada pengembang. Meskipun perubahan ini saat ini hanya berlaku untuk aplikasi di App Store AS, itu memberikan alternatif penting untuk sistem pembelian dalam aplikasi Apple.

Dengan menggunakan Tautan Pembayaran Stripe dengan Capacitor, Anda dapat dengan cepat menerapkan pengalaman checkout yang lancar sambil mempertahankan kepatuhan dengan pedoman Apple. Pendekatan ini juga memberi Anda keuntungan dari infrastruktur pembayaran Stripe yang kuat, biaya pemrosesan yang lebih rendah (3% dibandingkan 30%), dan pembayaran yang jauh lebih cepat (hari dibandingkan bulan) dibandingkan dengan sistem pembelian dalam aplikasi Apple.

Ingatlah bahwa Anda perlu menangani semua dukungan pelanggan dan masalah pengembalian dana secara langsung, karena transaksi ini terjadi di luar ekosistem Apple.

Apakah Anda telah menerapkan Tautan Pembayaran Stripe di aplikasi Capacitor Anda? Bagikan pengalaman Anda di komentar di bawah!

## FAQs

**T: Apakah pendekatan ini sesuai dengan pedoman Apple?**  
J: Ya, mulai 1 Mei 2025, Apple mengizinkan tautan ke metode pembayaran eksternal untuk barang dan layanan digital di aplikasi yang didistribusikan di App Store AS, dengan syarat Anda menyertakan pengungkapan yang diperlukan.

**T: Apakah saya perlu membayar komisi Apple saat menggunakan metode pembayaran eksternal?**  
J: Tidak, salah satu manfaat utama dari aturan baru adalah bahwa pembayaran yang diproses di luar sistem Apple tidak dikenakan komisi mereka.

**T: Apakah perusahaan saya perlu berbasis di Amerika Serikat untuk memanfaatkan aturan baru ini?**  
J: Tidak, perusahaan mana pun dari mana saja di dunia dapat menerapkan metode pembayaran eksternal selama aplikasi Anda tersedia di App Store AS dan pengguna yang melakukan pembelian berada di Amerika Serikat. Putusan ini berlaku untuk pasar (App Store AS) dan lokasi pengguna, bukan lokasi perusahaan Anda. Ini berarti pengembang dari Eropa, Asia, Amerika Selatan, atau tempat lainnya dapat menerapkan Tautan Pembayaran Stripe untuk pelanggan berbasis di AS.

**T: Apa yang terjadi jika pengguna di luar AS mencoba menggunakan opsi pembayaran eksternal?**  
J: Anda harus menerapkan deteksi wilayah (seperti yang ditunjukkan dalam artikel) untuk hanya menawarkan opsi pembayaran eksternal kepada pengguna di AS. Untuk wilayah lain, Anda harus terus menggunakan sistem pembelian dalam aplikasi Apple.

**T: Dapatkah saya menggunakan ini untuk barang fisik atau layanan yang dikonsumsi di luar aplikasi?**  
J: Ya, Apple selalu mengizinkan metode pembayaran eksternal untuk barang fisik dan layanan yang dikonsumsi di luar aplikasi (seperti berbagi tumpangan atau pengantaran makanan).
