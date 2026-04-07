---
published: true
locale: id
---

# Tutorial Paket `@capgo/native-market`

Paket `@capgo/native-market` adalah plugin komunitas Capacitor untuk pasar native, yang memungkinkan Anda untuk berinteraksi dengan Play Store dan App Store. Tutorial ini akan memandu Anda melalui instalasi dan penggunaan paket ini di proyek Capacitor Anda.

## Instalasi

Untuk menginstal paket `@capgo/native-market`, buka terminal Anda dan jalankan salah satu dari perintah berikut, tergantung pada manajer paket yang Anda gunakan:

Menggunakan npm:

```bash
npm install @capgo/native-market
```

Menggunakan yarn:

```bash
yarn add @capgo/native-market
```

Setelah instalasi, sinkronkan file native dengan menjalankan perintah berikut:

```bash
npx cap sync
```

Di iOS, tidak ada tindakan lebih lanjut yang diperlukan.

Di Android, tidak ada tindakan lebih lanjut yang diperlukan.

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

Setiap metode membutuhkan parameter input yang berbeda tergantung pada tindakan yang ingin Anda lakukan. Pastikan untuk merujuk pada dokumentasi metode untuk rincian lebih lanjut mengenai parameter yang diperlukan.

Itu saja! Anda sekarang telah berhasil menginstal dan menggunakan paket `@capgo/native-market` di proyek Capacitor Anda. Jangan ragu untuk menjelajahi lebih banyak fitur dan menyesuaikannya sesuai kebutuhan Anda.

***

Selamat telah menyelesaikan tutorial! Jika Anda memiliki pertanyaan lebih lanjut atau memerlukan bantuan, silakan jangan ragu untuk bertanya.