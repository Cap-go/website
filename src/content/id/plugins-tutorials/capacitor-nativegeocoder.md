---
locale: id
---

Menggunakan @capgo/nativegeocoder untuk Geocoding

Paket `@capgo/nativegeocoder` adalah plugin Capacitor yang menyediakan fungsionalitas geocoding maju dan mundur. Geocoding adalah proses mengubah alamat menjadi koordinat geografis (lintang dan bujur) dan sebaliknya.

Untuk menggunakan paket `@capgo/nativegeocoder`, ikuti langkah-langkah di bawah ini:

### Langkah 1: Instal paket

Instal paket menggunakan npm:

```bash
npm install @capgo/nativegeocoder
```

### Langkah 2: Sinkronkan proyek Anda

Jalankan perintah berikut untuk menyinkronkan proyek Anda:

```bash
npx cap sync
```

### Langkah 3: Impor plugin

Dalam kode Anda, impor `NativeGeocoder` dari `@capgo/nativegeocoder`:

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

### Langkah 4: Terapkan fungsionalitas geocoding

Plugin `@capgo/nativegeocoder` menyediakan dua metode utama untuk geocoding:

#### Geocoding Mundur

Geocoding mundur adalah proses mengubah koordinat geografis (lintang dan bujur) menjadi alamat.

```typescript
const reverseOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const address = NativeGeocoder.reverseGeocode(reverseOptions);
console.log(address);
```

Metode `reverseGeocode` menerima objek dengan properti lintang dan bujur. Hasilnya adalah alamat.

#### Geocoding Maju

Geocoding maju adalah proses mengubah alamat menjadi koordinat geografis (lintang dan bujur).

```typescript
const forwardOptions = {
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
};

const coordinates = NativeGeocoder.forwardGeocode(forwardOptions);
console.log(coordinates);
```

Metode `forwardGeocode` menerima objek dengan properti alamat. Hasilnya adalah koordinat.

### Kesimpulan

Paket `@capgo/nativegeocoder` menyediakan cara yang sederhana dan efisien untuk melakukan geocoding dalam proyek Capacitor Anda. Dengan mengikuti langkah-langkah yang diuraikan dalam tutorial ini, Anda dapat dengan mudah mengintegrasikan fungsionalitas geocoding ke dalam aplikasi Anda.