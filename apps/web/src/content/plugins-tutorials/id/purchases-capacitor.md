---
locale: id
---

tutorial revenuecat/purchases-capacitor

Tutorial ini akan membimbing Anda melalui proses implementasi pembelian dalam aplikasi dan langganan di aplikasi Ionic Capacitor Anda menggunakan paket `@revenuecat/purchases-capacitor`.

## Prasyarat

Sebelum kita mulai, pastikan Anda memiliki hal-hal berikut:

- Proyek Ionic Capacitor yang sudah disiapkan
- Akun RevenueCat (daftar di https://apprevenuecatcom/signup)
- Produk dalam aplikasi atau langganan yang dikonfigurasi di akun toko aplikasi Anda (Apple App Store dan/atau Google Play Store)

## Instalasi

1. Buka terminal atau command prompt Anda dan navigasikan ke direktori proyek Anda.

2. Jalankan perintah berikut untuk menginstal paket:

```bash
npm install @revenuecat/purchases-capacitor
```

3. Setelah instalasi, sinkronkan proyek Capacitor Anda:

```bash
npx cap sync
```

## Konfigurasi

1. Impor modul Purchases di file TypeScript utama aplikasi Anda (misalnya, `appcomponentts`):

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';
```

2. Konfigurasikan SDK dengan kunci API RevenueCat Anda:

```typescript
async function initializePurchases() {
  await Purchases.configure({
    apiKey: 'YOUR_REVENUECAT_API_KEY',
  });
}
```

Panggil fungsi ini saat aplikasi Anda mulai, misalnya di metode `ngOnInit()` dari komponen utama Anda.

## Penggunaan Dasar

### Mengambil Produk yang Tersedia

Untuk mendapatkan daftar produk yang tersedia:

```typescript
async function getProducts() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      const products = offerings.current.availablePackages;
      console.log('Available products:', products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
```

### Melakukan Pembelian

Untuk memulai pembelian:

```typescript
async function purchasePackage(package: PurchasesPackage) {
  try {
    const { customerInfo, productIdentifier } = await Purchases.purchasePackage({ aPackage: package });
    console.log('Purchase successful:', productIdentifier);
    console.log('Customer Info:', customerInfo);
  } catch (error) {
    console.error('Error making purchase:', error);
  }
}
```

### Memeriksa Status Langganan

Untuk memeriksa status langganan pengguna saat ini:

```typescript
async function checkSubscriptionStatus() {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const activeSubscriptions = customerInfo.activeSubscriptions;
    console.log('Active subscriptions:', activeSubscriptions);
  } catch (error) {
    console.error('Error checking subscription status:', error);
  }
}
```

### Mengembalikan Pembelian

Untuk mengembalikan pembelian sebelumnya pengguna:

```typescript
async function restorePurchases() {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    console.log('Purchases restored:', customerInfo);
  } catch (error) {
    console.error('Error restoring purchases:', error);
  }
}
```

## Fitur Lanjutan

### Mengidentifikasi Pengguna

Jika Anda memiliki sistem ID pengguna sendiri, Anda dapat mengidentifikasi pengguna ke RevenueCat:

```typescript
async function identifyUser(userId: string) {
  try {
    const { customerInfo } = await Purchases.logIn({ appUserID: userId });
    console.log('User identified:', customerInfo);
  } catch (error) {
    console.error('Error identifying user:', error);
  }
}
```

### Memeriksa Kelayakan Harga Perkenalan

Untuk memeriksa apakah pengguna memenuhi syarat untuk harga perkenalan:

```typescript
async function checkIntroEligibility(productIdentifiers: string[]) {
  try {
    const eligibility = await Purchases.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers });
    console.log('Introductory price eligibility:', eligibility);
  } catch (error) {
    console.error('Error checking eligibility:', error);
  }
}
```

### Menetapkan Atribut

Anda dapat menetapkan atribut kustom untuk pengguna:

```typescript
async function setUserAttributes() {
  try {
    await Purchases.setAttributes({
      'user_level': '5',
      'user_type': 'premium'
    });
    console.log('Attributes set successfully');
  } catch (error) {
    console.error('Error setting attributes:', error);
  }
}
```

## Kesimpulan

Tutorial ini mencakup dasar-dasar implementasi pembelian dalam aplikasi dan langganan menggunakan paket `@revenuecat/purchases-capacitor`. Ingatlah untuk menangani kesalahan dengan tepat dan menguji implementasi Anda secara menyeluruh.

Untuk penggunaan yang lebih lanjutan dan dokumentasi API yang lebih mendetail, merujuklah ke dokumentasi RevenueCat di https://docsrevenuecatcom/.

Jangan lupa untuk mengonfigurasi produk Anda di dasbor RevenueCat dan menghubungkannya ke produk toko aplikasi Anda. Juga, pastikan untuk menguji implementasi Anda di lingkungan sandbox sebelum merilis ke produksi.