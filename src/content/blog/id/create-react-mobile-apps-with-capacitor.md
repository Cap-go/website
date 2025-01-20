---
slug: id__create-react-mobile-apps-with-capacitor
title: Mengembangkan Aplikasi Seluler dengan React dan Capacitor
description: >-
  Pelajari cara membuat aplikasi seluler dengan React dan Capacitor serta
  meningkatkan antarmuka pengguna native dengan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Ilustrasi React dan Capacitor
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dalam tutorial ini, kita akan memulai dengan aplikasi [React](https://reactjsorg/) baru dan beralih ke pengembangan mobile native menggunakan Capacitor. Secara opsional, Anda juga dapat menambahkan [Konsta UI](https://konstauicom/) untuk UI mobile yang lebih baik dengan Tailwind CSS.

Capacitor memungkinkan Anda untuk dengan mudah mengkonversi aplikasi web React Anda menjadi aplikasi mobile native tanpa modifikasi signifikan atau mempelajari keterampilan baru seperti React Native.

Dengan hanya beberapa langkah sederhana, sebagian besar aplikasi React dapat diubah menjadi aplikasi mobile.

Tutorial ini akan memandu Anda melalui prosesnya, dimulai dengan aplikasi React baru dan kemudian menggabungkan Capacitor untuk beralih ke ranah aplikasi mobile native. Selain itu, Anda dapat secara opsional menggunakan [Konsta UI](https://konstauicom/) untuk meningkatkan UI mobile Anda dengan Tailwind CSS.

## Tentang Capacitor

CapacitorJS adalah game-changer! Anda dapat dengan mudah menggabungkannya ke dalam proyek web apa pun, dan itu akan membungkus aplikasi Anda ke dalam webview native, menghasilkan proyek Xcode dan Android Studio native untuk Anda. Selain itu, plugin-nya memberikan akses ke fitur perangkat native seperti kamera melalui jembatan JS.

Dengan Capacitor, Anda mendapatkan aplikasi mobile native yang fantastis tanpa pengaturan rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien membuatnya sangat mudah diintegrasikan ke dalam proyek Anda. Percayalah, Anda akan kagum betapa mudahnya mencapai aplikasi native yang sepenuhnya fungsional dengan Capacitor!

## Menyiapkan Aplikasi React Anda

Meskipun ada berbagai metode untuk memulai aplikasi React, mari kita pilih yang paling sederhana dalam tutorial ini yang menyediakan aplikasi React kosong:

```shell
npx create-react-app my-app
```

Untuk membuat aplikasi mobile native, kita memerlukan **ekspor** dari proyek kita. Jadi, mari kita sertakan skrip sederhana di **packagejson** kita yang dapat digunakan untuk membangun dan mengekspor proyek React:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Sekarang Anda dapat menjalankan `npm run build` tanpa khawatir, dan Anda seharusnya dapat melihat folder out baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, tetapi untuk saat ini, kita harus mengaturnya dengan benar.

## Menambahkan Capacitor ke Aplikasi React Anda

Untuk mengemas aplikasi web apa pun ke dalam kontainer mobile native, kita harus mengikuti beberapa langkah awal, tetapi setelah itu sesederhana menjalankan satu perintah `sync`.

Pertama, kita dapat menginstal [Capacitor CLI](https://capacitorjscom/docs/cli/) sebagai dependensi pengembangan, dan kemudian mengaturnya dalam proyek kita. Selama pengaturan, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan ID bundle.

Selanjutnya, kita perlu menginstal paket inti dan paket yang relevan untuk platform iOS dan Android.

Akhirnya, kita dapat menambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek kita:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your React project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Pada titik ini, Anda seharusnya dapat melihat folder **ios** dan **android** baru di proyek React Anda.

**Itu adalah proyek native yang nyata!**

Untuk mengakses proyek Android nanti, Anda harus menginstal [Android Studio](https://developerandroidcom/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developerapplecom/xcode/).

Selain itu, Anda harus menemukan file **capacitorconfigts** di proyek Anda, yang berisi beberapa pengaturan dasar Capacitor yang digunakan selama sinkronisasi. Satu-satunya hal yang perlu Anda perhatikan adalah **webDir**, yang harus menunjuk ke hasil dari perintah build Anda. Saat ini, itu tidak akurat.

Untuk memperbaikinya, buka file **capacitorconfigjson** dan perbarui **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Anda dapat mencobanya dengan menjalankan perintah berikut:

```shell
npm run build
npx cap sync
```

Perintah pertama `npm run build` hanya akan membangun proyek React Anda dan mengekspor build statis.

Sementara perintah kedua `npx cap sync` akan menyinkronkan semua kode web ke tempat yang tepat dari platform native sehingga dapat ditampilkan dalam aplikasi.

Selain itu, perintah sync mungkin memperbarui platform native dan menginstal plugin, jadi ketika Anda menginstal [plugin Capacitor](https://capacitorjscom/docs/plugins/) baru, saatnya menjalankan `npx cap sync` lagi.Tanpa disadari, Anda sekarang sebenarnya sudah selesai, jadi mari kita lihat aplikasinya di perangkat!

## Membangun dan Mendeploy aplikasi native

Untuk mengembangkan aplikasi iOS, Anda perlu memiliki **Xcode** terinstal, dan untuk aplikasi Android, Anda perlu memiliki **Android Studio** terinstal. Selain itu, jika Anda berencana mendistribusikan aplikasi Anda di app store, Anda perlu mendaftar ke Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Jika Anda baru dalam pengembangan mobile native, Anda dapat menggunakan Capacitor CLI untuk dengan mudah membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah Anda menyiapkan proyek native Anda, mendeploy aplikasi ke perangkat yang terhubung menjadi mudah. Di Android Studio, Anda hanya perlu menunggu semuanya siap, dan Anda dapat mendeploy aplikasi ke perangkat yang terhubung tanpa mengubah pengaturan apa pun. Berikut contohnya:

![android-studio-run](/android-studio-run.webp)

Di Xcode, Anda perlu menyiapkan akun penandatanganan Anda untuk mendeploy aplikasi ke perangkat nyata, bukan hanya simulator. Jika Anda belum pernah melakukan ini sebelumnya, Xcode akan memandu Anda melalui prosesnya (tapi sekali lagi, Anda perlu terdaftar di Developer Program). Setelah itu, Anda dapat langsung menekan play untuk menjalankan aplikasi di perangkat yang terhubung, yang dapat Anda pilih di bagian atas. Berikut contohnya:

![xcode-run](/xcode-run.webp)

Selamat! Anda telah berhasil mendeploy aplikasi web React Anda ke perangkat mobile. Berikut contohnya:

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

Tapi tunggu dulu, ada cara yang lebih cepat untuk melakukan ini selama pengembangan.

## Capacitor Live Reload

Sekarang, Anda mungkin sudah terbiasa dengan hot reload pada semua framework modern, dan kabar baiknya adalah Anda dapat memiliki fungsionalitas yang sama **pada perangkat mobile** dengan usaha minimal!

Aktifkan akses ke aplikasi yang di-host secara lokal dengan live reload **di jaringan Anda** dengan membuat aplikasi Capacitor memuat konten dari URL tertentu.

Langkah pertama adalah mencari tahu alamat IP lokal Anda. Jika Anda menggunakan Mac, Anda dapat mengetahuinya dengan menjalankan perintah berikut di terminal:

```shell
ipconfig getifaddr en0
```

Pada Windows, jalankan:

```shell
ipconfig
```

Kemudian cari alamat IPv4.

Kita dapat menginstruksikan Capacitor untuk memuat aplikasi langsung dari server dengan menambahkan entri lain ke file `capacitor.config.ts` kita:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Pastikan untuk menggunakan **IP dan port yang benar**, saya telah menggunakan port default React dalam contoh ini.

Sekarang, kita dapat menerapkan perubahan ini dengan menyalinnya ke proyek native kita:

```shell
npx cap copy
```

Perintah `copy` mirip dengan `sync`, tetapi hanya akan **menyalin perubahan yang dilakukan pada folder web** dan konfigurasi, tanpa memperbarui proyek native.

Anda sekarang dapat mendeploy aplikasi Anda sekali lagi melalui Android Studio atau Xcode. Setelah itu, jika Anda mengubah sesuatu di aplikasi React Anda, **aplikasi akan secara otomatis memuat ulang** dan menampilkan perubahan!

**Perlu diingat** bahwa jika Anda menginstal plugin baru seperti kamera, itu masih memerlukan pembangunan ulang proyek native Anda. Ini karena file native diubah, dan tidak dapat dilakukan secara langsung.

Perhatikan bahwa Anda harus menggunakan IP dan port yang benar dalam konfigurasi Anda. Blok kode di atas menunjukkan port default React untuk tujuan demonstrasi.

## Menggunakan Plugin Capacitor

Mari kita lihat bagaimana menggunakan plugin Capacitor dalam aksi, yang telah kita sebutkan beberapa kali sebelumnya. Untuk melakukan ini, kita dapat menginstal plugin yang cukup sederhana dengan menjalankan:

```shell
npm i @capacitor/share
```

Tidak ada yang istimewa tentang [plugin Share](https://capacitorjs.com/docs/apis/share/), tetapi bagaimanapun juga ini memunculkan dialog berbagi native! Untuk ini, kita sekarang hanya perlu mengimpor paket dan memanggil fungsi `share()` dari aplikasi kita. Mari ubah **src/App.js** menjadi seperti ini:

```javascript
import React from 'react';
import { Share } from '@capacitor/share';

function App() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  };

  return (
    <div>
      <h1>Welcome to React and Capacitor!</h1>
      <p>
        <h2>Cool channel</h2>
        <button onClick={() => share()}>Share now!</button>
      </p>
    </div>
  );
}

export default App;
```

Seperti disebutkan sebelumnya, saat menginstal plugin baru, kita perlu melakukan operasi sync dan kemudian mendeploy ulang aplikasi ke perangkat kita.Untuk melakukan ini, jalankan perintah berikut:

```
npx cap sync
```

Setelah menekan tombol, Anda dapat menyaksikan dialog berbagi asli yang indah beraksi!

<div>
  <h1>
</h1>

Untuk membuat tombol terlihat lebih ramah seluler, kita dapat menambahkan beberapa gaya menggunakan pustaka komponen UI favorit saya untuk aplikasi web - React (tanpa bermaksud bercanda)

## Menambahkan Konsta UI

Saya telah bekerja bertahun-tahun dengan [Ionic](https://ionicframeworkcom/) untuk membangun aplikasi lintas platform yang luar biasa, dan itu adalah salah satu pilihan terbaik selama bertahun-tahun. Tapi sekarang saya tidak merekomendasikannya lagi; sangat rumit untuk mengintegrasikannya dengan React, dan tidak benar-benar sepadan ketika Anda sudah memiliki [tailwindcss](https://tailwindcsscom/)

Jika Anda menginginkan tampilan UI seluler yang bagus yang beradaptasi dengan gaya khusus iOS dan Android, saya merekomendasikan Konsta UI

Anda perlu sudah [memasang tailwind](https://tailwindcsscom/docs/guides/vite/#react) 

Untuk menggunakannya, kita hanya perlu memasang paket React:

```shell
npm i konsta
```

Selain itu, Anda perlu memodifikasi file `tailwindconfigjs` Anda:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/**/*.{js,ts,javascript,tsx}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` akan memperluas konfigurasi Tailwind CSS default (atau kustom Anda) dengan beberapa varian tambahan dan utilitas pembantu yang diperlukan untuk Konsta UI

Sekarang kita perlu menyiapkan komponen [App](https://konstauicom/react/app/) utama sehingga kita dapat mengatur beberapa parameter global (seperti `theme`)

Kita perlu membungkus seluruh aplikasi dengan `App` di `src/Appjs`:

```javascript
import { App } from 'konsta/react';
import './App.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### Contoh Halaman

Sekarang setelah semuanya diatur, kita dapat menggunakan komponen React Konsta UI dalam aplikasi React kita

Misalnya, mari buka `src/Appjs` dan ubah menjadi berikut:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/react';

function App() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your React & Konsta UI app. Let's see what we have here.
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

export default App;
```

Jika pembaruan langsung tidak sinkron setelah memasang semua komponen yang diperlukan, coba mulai ulang semuanya. Setelah Anda melakukan itu, Anda seharusnya melihat aplikasi seluler dengan tampilan yang agak asli, dibangun dengan React dan Capacitor!

Anda seharusnya melihat halaman berikut sebagai hasilnya:

<p>
  <h2>
</h2>

## Kesimpulan

Capacitor adalah pilihan yang sangat baik untuk membangun aplikasi asli berdasarkan proyek web yang ada, menawarkan cara sederhana untuk berbagi kode dan mempertahankan UI yang konsisten

Dan dengan penambahan [Capgo](https://capgoapp/), bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug

Jika Anda ingin mempelajari cara menambahkan Capgo ke aplikasi React Anda, lihat artikel berikutnya: