---
published: true
locale: it
---

# @capgo/native-market Paket Tutorial

Paket `@capgo/native-market` adalah plugin komunitas Capacitor untuk pasar native, yang memungkinkan Anda berinteraksi dengan Play Store dan App Store. Tutorial ini akan memandu Anda melalui pemasangan dan penggunaan paket ini dalam proyek Capacitor Anda.

## Pemasangan

Untuk menginstal paket `@capgo/native-market`, buka terminal Anda dan jalankan salah satu perintah berikut, tergantung pada manajer paket Anda:

Menggunakan npm:

```bash
npm install @capgo/native-market
```

Menggunakan yarn:

```bash
yarn add @capgo/native-market
```

Setelah pemasangan, sinkronkan file native dengan menjalankan perintah berikut:

```bash
npx cap sync
```

Di iOS, tidak perlu tindakan lebih lanjut.

Di Android, tidak perlu tindakan lebih lanjut.

## Penggunaan

Paket `@capgo/native-market` menyediakan beberapa metode yang didukung yang dapat Anda gunakan untuk berinteraksi dengan pasar native. Berikut adalah contoh cara menggunakan setiap metode:

```typescript
import { NativeMarket } from '@capgo/native-market';

// Open store listing
NativeMarket.openStoreListing({
  appId: 'com.example.app',
  country: 'IT',
});

// Open developer page
NativeMarket.openDevPage({
  devId: '5700313618786177705',
});

// Open collection
NativeMarket.openCollection({
  name: 'featured',
});

// Open editor's choice page
NativeMarket.openEditorChoicePage({
  editorChoice: 'editorial_fitness_apps_us',
});

// Perform search
NativeMarket.search({
  terms: 'capacitor',
});
```

Setiap metode membutuhkan parameter input yang berbeda tergantung pada tindakan yang ingin Anda lakukan. Pastikan untuk merujuk ke dokumentasi metode untuk mendapatkan detail lebih lanjut tentang parameter yang diperlukan.

Itu saja! Anda sekarang telah berhasil menginstal dan menggunakan paket `@capgo/native-market` dalam proyek Capacitor Anda. Jangan ragu untuk menjelajahi lebih banyak fitur dan menyesuaikannya sesuai kebutuhan Anda.

***

Selamat telah menyelesaikan tutorial! Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan, silakan jangan ragu untuk bertanya.