---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  Membangun Aplikasi Mobile Native dengan Next.js 14 dan Capacitor: Panduan
  Langkah demi Langkah 2024
description: >-
  Pelajari cara membuat aplikasi mobile native menggunakan Next.js 14 dan
  Capacitor dalam panduan lengkap ini. Temukan praktik terbaik dan teknik
  terbaru untuk membangun aplikasi mobile yang kaya fitur dan berkinerja tinggi.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Ilustrasi Next.js 14 dan Capacitor
keywords: >-
  Next.js 14, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
## Pendahuluan

Dalam tutorial ini, kita akan mengeksplorasi cara membuat aplikasi mobile native menggunakan kombinasi kuat antara [Next.js](https://nextjs.org/) 14 dan [Capacitor](https://capacitorjs.com/) di tahun 2024. Dengan memanfaatkan versi terbaru dari teknologi ini, Anda dapat membangun aplikasi mobile yang kaya fitur dan berkinerja tinggi dengan mudah. Kita juga akan mendemonstrasikan cara meningkatkan UI mobile menggunakan [Konsta UI](https://konstaui.com/) dan Tailwind CSS, meskipun langkah ini opsional.

Next.js, framework React yang populer, menyediakan fondasi yang solid untuk membangun aplikasi web, sementara Capacitor memungkinkan Anda mengubah aplikasi Next.js Anda menjadi aplikasi mobile native tanpa modifikasi signifikan atau kebutuhan untuk mempelajari keterampilan baru seperti React Native. Tutorial ini akan memandu Anda melalui prosesnya, dimulai dengan menyiapkan aplikasi Next.js baru dan mengintegrasikan Capacitor untuk menciptakan pengalaman mobile native.

### Manfaat Menggunakan Next.js dan Capacitor

- **Penggunaan Kode Ulang**: Next.js memungkinkan Anda menulis komponen yang dapat digunakan kembali dan berbagi kode antara aplikasi web dan mobile, menghemat waktu dan usaha pengembangan.
- **Performa**: Next.js menawarkan optimasi performa bawaan, seperti server-side rendering dan pemisahan kode, memastikan waktu pemuatan cepat dan pengalaman pengguna yang lancar.
- **Kemampuan Native**: Capacitor menyediakan akses ke fitur perangkat native seperti kamera, geolokasi, dan lainnya, memungkinkan Anda membangun aplikasi mobile yang kaya fitur.
- **Pengembangan yang Disederhanakan**: Dengan Capacitor, Anda dapat mengembangkan dan menguji aplikasi mobile menggunakan teknologi web yang familiar, mengurangi kurva pembelajaran dan memperlancar proses pengembangan.

## Menyiapkan Aplikasi Next.js Anda

Untuk memulai, mari buat aplikasi Next.js baru menggunakan perintah `create-next-app`:

```shell
npx create-next-app@latest my-app
```

Perintah ini akan menyiapkan proyek Next.js kosong dengan konfigurasi yang direkomendasikan untuk versi terbaru.

Selanjutnya, navigasi ke direktori proyek:

```shell
cd my-app
```

Untuk membuat aplikasi mobile native, kita perlu menghasilkan ekspor statis dari proyek Next.js kita. Perbarui file `package.json` untuk menyertakan script untuk membangun dan mengekspor proyek:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

Menjalankan perintah `npm run static` mungkin menghasilkan error karena ketidakcocokan optimasi gambar. Untuk mengatasi ini, buka file `next.config.js` dan modifikasi sebagai berikut:

```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Sekarang, menjalankan `npm run static` seharusnya bekerja tanpa masalah, dan Anda akan menemukan folder `out` baru di root proyek Anda. Folder ini akan digunakan oleh Capacitor di langkah-langkah berikutnya.

## Menambahkan Capacitor ke Aplikasi Next.js 14 Anda

Untuk mengemas aplikasi Next.js Anda ke dalam container mobile native, ikuti langkah-langkah ini:

1. Instal [Capacitor CLI](https://capacitorjs.com/docs/cli/) sebagai dependensi pengembangan:

```shell
npm install -D @capacitor/cli
```

2. Inisialisasi Capacitor dalam proyek Next.js Anda:

```shell
npx cap init
```

Selama proses inisialisasi, Anda dapat menekan "Enter" untuk menerima nilai default untuk nama aplikasi dan ID bundle.

3. Instal paket Capacitor yang diperlukan:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Tambahkan platform native:

```shell
npx cap add ios
npx cap add android
```

Capacitor akan membuat folder untuk setiap platform (`ios` dan `android`) di root proyek Anda. Folder-folder ini berisi proyek native untuk iOS dan Android.

Untuk mengakses dan membangun proyek Android, Anda perlu memiliki [Android Studio](https://developer.android.com/studio) terinstal. Untuk pengembangan iOS, Anda memerlukan Mac dengan [Xcode](https://developer.apple.com/xcode/) terinstal.

5. Konfigurasi Capacitor:

Buka file `capacitor.config.ts` dan perbarui properti `webDir` untuk mengarah ke direktori output dari build Next.js Anda:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. Build dan sinkronkan proyek Anda:

```shell
npm run static
npx cap sync
```

Perintah `npm run static` membangun proyek Next.js Anda dan mengekspor file statis, sementara `npx cap sync` mensinkronkan kode web dengan platform native.

## Membangun dan Men-deploy Aplikasi Native

Untuk membangun dan men-deploy aplikasi mobile native Anda, ikuti langkah-langkah ini:
Untuk mengembangkan aplikasi iOS, Anda perlu memiliki **Xcode** terinstal, dan untuk aplikasi Android, Anda perlu memiliki **Android Studio** terinstal. Selain itu, jika Anda berencana mendistribusikan aplikasi Anda di app store, Anda perlu mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

1. Buka proyek native:

Untuk iOS:
```shell
npx cap open ios
```

Untuk Android:
```shell
npx cap open android
```

2. Build dan jalankan aplikasi:

![android-studio-run](/android-studio-run.webp)

- Di Android Studio, tunggu hingga proyek siap, kemudian klik tombol "Run" untuk men-deploy aplikasi ke perangkat atau emulator yang terhubung.
![xcode-run](/xcode-run.webp)

- Di Xcode, siapkan akun signing Anda untuk men-deploy aplikasi ke perangkat nyata. Jika Anda belum pernah melakukan ini sebelumnya, Xcode akan memandu Anda melalui prosesnya (perhatikan bahwa Anda perlu terdaftar di Apple Developer Program). Setelah siap, klik tombol "Play" untuk menjalankan aplikasi di perangkat Anda yang terhubung.

Selamat! Anda telah berhasil men-deploy aplikasi web Next.js ke perangkat mobile.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Tapi tunggu dulu, ada cara yang lebih cepat untuk melakukan ini selama pengembangan...

## Live Reload Capacitor

Selama pengembangan, Anda dapat memanfaatkan live reloading untuk melihat perubahan secara instan di perangkat mobile Anda. Untuk mengaktifkan fitur ini, ikuti langkah-langkah berikut:

1. Temukan alamat IP lokal Anda:

- Pada macOS, jalankan perintah berikut di terminal:
  ```shell
  ipconfig getifaddr en0
  ```

- Pada Windows, jalankan:
  ```shell
  ipconfig
  ```
  Cari alamat IPv4 dalam output.

2. Perbarui file `capacitor.config.ts` untuk menyertakan konfigurasi server:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
};

export default config;
```

Ganti `YOUR_IP_ADDRESS` dengan alamat IP lokal Anda.

3. Terapkan perubahan ke proyek native Anda:

```shell
npx cap copy
```

Perintah `copy` menyalin folder web dan perubahan konfigurasi ke proyek native tanpa memperbarui seluruh proyek.

4. Rebuild dan jalankan aplikasi di perangkat Anda menggunakan Android Studio atau Xcode.

Sekarang, setiap kali Anda membuat perubahan pada aplikasi Next.js Anda, aplikasi mobile akan secara otomatis memuat ulang untuk mencerminkan perubahan tersebut.

Catatan: Jika Anda menginstal plugin baru atau membuat perubahan pada file native, Anda perlu membangun ulang proyek native karena live reloading hanya berlaku untuk perubahan kode web.

## Menggunakan Plugin Capacitor

Plugin Capacitor memungkinkan Anda mengakses fitur perangkat native dari aplikasi Next.js Anda. Mari kita eksplorasi cara menggunakan [plugin Share](https://capacitorjs.com/docs/apis/share/) sebagai contoh:

1. Instal plugin Share:

```shell
npm i @capacitor/share
```

2. Perbarui file `pages/index.js` untuk menggunakan plugin Share:

```javascript
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Share } from '@capacitor/share';

export default function Home() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Capgo!</a>
        </h1>

        <p className={styles.description}>
          <h2>Cool channel</h2>
          <button onClick={() => share()}>Share now!</button>
        </p>
      </main>
    </div>
  );
}
```

3. Sinkronkan perubahan dengan proyek native:

Seperti disebutkan sebelumnya, saat menginstal plugin baru, kita perlu melakukan operasi sinkronisasi dan kemudian men-deploy ulang aplikasi ke perangkat kita. Untuk melakukan ini, jalankan perintah berikut:

```shell
npx cap sync
```

4. Rebuild dan jalankan aplikasi di perangkat Anda.

Sekarang, ketika Anda mengklik tombol "Share now!", dialog berbagi native akan muncul, memungkinkan Anda berbagi konten dengan aplikasi lain.

<div class="mx-auto" style="width: 50%;">
<img src="/next-capacitor-share.webp" alt="next-capacitor-share">
</div>

Untuk membuat tombol terlihat lebih ramah mobile, kita dapat menambahkan beberapa styling menggunakan library komponen UI favorit saya untuk aplikasi web - Next.js (tanpa bermaksud bercanda).

## Menambahkan Konsta UI

Saya telah bekerja bertahun-tahun dengan [Ionic](https://ionicframework.com/) untuk membangun aplikasi lintas platform yang luar biasa dan itu adalah salah satu pilihan terbaik selama bertahun-tahun.
Tapi sekarang saya tidak merekomendasikannya lagi karena sangat rumit untuk diintegrasikan dengan Next.js dan tidak benar-benar sepadan ketika Anda sudah memiliki [tailwindcss](https://tailwindcss.com/).

Jika Anda menginginkan UI mobile yang benar-benar bagus yang beradaptasi dengan styling khusus iOS dan Android, saya merekomendasikan Konsta UI.

Anda perlu memiliki [tailwind sudah terinstal](https://tailwindcss.com/docs/guides/nextjs/)
Untuk meningkatkan UI mobile aplikasi Next.js Anda, Anda dapat menggunakan [Konsta UI](https://konstaui.com/), library komponen UI ramah mobile yang beradaptasi dengan styling iOS dan Android. Ikuti langkah-langkah ini untuk mengintegrasikan Konsta UI:

1. Instal paket yang diperlukan:

```shell
npm i konsta
```

2. Perbarui file `tailwind.config.js`:

```javascript
const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
```

3. Bungkus aplikasi Anda dengan komponen `App` Konsta UI di `pages/_app.js`:

```javascript
import { App } from 'konsta/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### Contoh Halaman

Sekarang ketika semuanya sudah diatur, kita dapat menggunakan komponen React Konsta UI dalam halaman Next.js kita.

4. Perbarui file `pages/index.js` untuk menggunakan komponen Konsta UI:

```javascript
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
} from 'konsta/react';

export default function Home() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your Next.js & Konsta UI app. Let's see what we have here.
        </p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem href="/about/" title="About" />
        <ListItem href="/form/" title="Form" />
      </List>

      <Block strong className="flex space-x-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Block>
    </Page>
  );
}
```

5. Restart server pengembangan dan rebuild aplikasi.

Aplikasi Next.js Anda sekarang seharusnya memiliki tampilan UI mobile native yang didukung oleh Konsta UI.

## Optimasi Performa

Untuk memastikan performa optimal dari aplikasi Next.js dan Capacitor Anda, pertimbangkan praktik terbaik berikut:

- Minimalkan ukuran aplikasi dengan menghapus dependensi dan aset yang tidak digunakan.
- Optimalkan gambar dan file media lainnya untuk mengurangi waktu pemuatan.
- Implementasikan lazy loading untuk komponen dan halaman untuk meningkatkan performa pemuatan awal.
- Gunakan server-side rendering (SSR) dengan Next.js untuk meningkatkan kecepatan pemuatan aplikasi dan optimasi mesin pencari (SEO).
- Manfaatkan optimasi bawaan Capacitor, seperti caching web view dan bundling aplikasi.

## Kesimpulan

Dalam tutorial ini, kita telah mengeksplorasi cara membangun aplikasi mobile native menggunakan Next.js dan Capacitor. Dengan memanfaatkan kekuatan teknologi ini, Anda dapat membuat aplikasi mobile yang berkinerja tinggi dan kaya fitur dengan mudah.

Kita telah membahas langkah-langkah untuk menyiapkan aplikasi Next.js, mengintegrasikan Capacitor, dan membangun serta men-deploy aplikasi ke perangkat mobile. Selain itu, kita juga membahas penggunaan plugin Capacitor, menambahkan Konsta UI untuk UI mobile yang lebih baik, dan teknik optimasi performa.

Untuk membawa aplikasi Next.js dan Capacitor Anda ke level berikutnya, pertimbangkan untuk mengeksplorasi [Capgo](https://capgo.app/) untuk pembaruan langsung yang mulus, memastikan pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug.

Dengan mengikuti praktik terbaik dan teknik yang diuraikan dalam panduan ini, Anda akan siap untuk membangun aplikasi mobile native yang menakjubkan menggunakan Next.js dan Capacitor.

## Sumber Daya

- [Dokumentasi Next.js](https://nextjs.org/docs)
- [Dokumentasi Capacitor](https://capacitorjs.com/docs)
- [Dokumentasi Konsta UI](https://konstaui.com/docs)
- [Capgo - Pembaruan Langsung untuk Aplikasi Capacitor](https://capgo.app/)

Selamat membangun aplikasi!

Pelajari bagaimana Capgo dapat membantu Anda membangun aplikasi yang lebih baik dengan lebih cepat, [daftar akun gratis](/register/) hari ini.
