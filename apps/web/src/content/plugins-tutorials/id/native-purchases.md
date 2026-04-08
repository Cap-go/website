---
locale: id
---

sing @capgo/native-purchases Paket

Paket @capgo/native-purchases adalah plugin untuk Capacitor yang menyediakan fungsionalitas pembelian dalam aplikasi dengan mudah. Dalam tutorial ini, kita akan melalui langkah-langkah untuk menginstal dan menggunakan paket dalam proyek Capacitor Anda.

## Instalasi

Untuk menginstal paket @capgo/native-purchases, buka terminal Anda dan jalankan perintah berikut:

```bash
npm install @capgo/native-purchases
npx cap sync
```

Ini akan menginstal paket dan menyinkronkan file native dengan proyek Anda.

### Pengaturan Android

Jika Anda menggunakan Android, Anda perlu menambahkan beberapa konfigurasi ke file AndroidManifest.xml Anda. Buka file yang terletak di `android/app/src/main/AndroidManifest.xml` dan tambahkan kode berikut:

```xml
<!-- Add any necessary configuration here -->
```

### Pengaturan iOS

Jika Anda menggunakan iOS, tidak ada langkah lebih lanjut yang diperlukan.

## Menggunakan Paket

Paket @capgo/native-purchases menyediakan beberapa metode untuk menangani pembelian dalam aplikasi. Berikut adalah beberapa contoh cara menggunakan metode ini:

### Mengembalikan Pembelian

Untuk mengembalikan pembelian sebelumnya seorang pengguna, gunakan metode `restorePurchases()`:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.restorePurchases();
```

### Membeli Produk

Untuk memulai pembelian untuk produk tertentu, gunakan metode `purchaseProduct()`:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.purchaseProduct({ productIdentifier: 'com.example.product' });
```

### Mendapatkan Informasi Produk

Untuk mengambil informasi tentang produk tertentu, gunakan metode `getProducts()`:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.getProducts({ productIdentifiers: ['com.example.product'] });
```

Ini hanyalah beberapa contoh cara menggunakan paket @capgo/native-purchases. Untuk informasi lebih rinci tentang metode yang tersedia dan parameter mereka, lihat dokumentasi paket.

## Kesimpulan

Dalam tutorial ini, kami membahas proses instalasi dan penggunaan dasar dari paket @capgo/native-purchases. Dengan mengikuti langkah-langkah yang dijelaskan di sini, Anda harus dapat mengintegrasikan fungsionalitas pembelian dalam aplikasi ke dalam proyek Capacitor Anda.