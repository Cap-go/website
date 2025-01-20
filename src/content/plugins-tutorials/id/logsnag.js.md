---
locale: id
---

Paket `@capgo/logsnag`

Paket `@capgo/logsnag` adalah alat yang kuat untuk mendapatkan notifikasi dan melacak peristiwa proyek. Tutorial ini akan memandu Anda melalui instalasi dan penggunaan paket ini.

## Instalasi

Untuk menginstal paket `@capgo/logsnag`, buka terminal Anda dan jalankan perintah berikut:

```sh
npm install --save @capgo/logsnag
```

## Penggunaan

### Impor Perpustakaan

Untuk menggunakan paket `@capgo/logsnag` di proyek Anda, Anda perlu mengimpornya. Tambahkan pernyataan impor berikut di awal file JavaScript Anda:

```js
import { LogSnag } from '@capgo/logsnag';
```

### Inisialisasi Klien

Sebelum Anda dapat mulai menggunakan fitur dari `@capgo/logsnag`, Anda perlu menginisialisasi klien. Gunakan kode berikut untuk menginisialisasi klien:

```js
const logsnag = new LogSnag({
  token: 'YOUR_API_TOKEN',
  project: 'YOUR_PROJECT_NAME'
});
```
Gantilah `YOUR_API_TOKEN` dengan token API Anda yang sebenarnya dan `YOUR_PROJECT_NAME` dengan nama proyek Anda.

### Publikasikan Acara

Untuk mempublikasikan acara menggunakan `@capgo/logsnag`, gunakan metode `publish` dari objek `logsnag`. Berikut adalah contoh potongan kode yang mempublikasikan acara:

```js
logsnag.publish({
  channel: "waitlist",
  event: "User Joined",
  icon: "🎉",
  tags: {
    name: "john doe",
    email: "john@example.com",
  },
  notify: true
});
```
Sesuaikan nilai properti sesuai dengan acara spesifik Anda. Anda dapat menentukan saluran, nama acara, ikon, tag, dan apakah akan memberi notifikasi atau tidak.

### Publikasikan Wawasan

Selain acara, Anda juga dapat mempublikasikan wawasan menggunakan `@capgo/logsnag`. Wawasan memberikan informasi dan statistik berharga tentang proyek Anda. Berikut adalah contoh potongan kode yang mempublikasikan wawasan:

```js
logsnag.insight({
  title: "User Count",
  value: "100",
  icon: "👨",
});
```
Ubah nilai properti agar sesuai dengan wawasan Anda. Anda dapat menentukan judul, nilai, dan ikon.

Itu saja! Anda sekarang telah belajar cara menginstal dan menggunakan paket `@capgo/logsnag` di proyek Anda. Nikmati melacak acara proyek Anda dan menerima notifikasi dengan mudah!