---
slug: id__creating-mobile-apps-with-react-and-capacitor
title: Mengembangkan aplikasi seluler dengan React.js murni dan Capacitor
description: >-
  Panduan untuk mengkonversi aplikasi web React.js menjadi aplikasi mobile
  native menggunakan Capacitor dan meningkatkan antarmuka pengguna native dengan
  Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Ilustrasi React.js dan Capacitor
tag: Tutorial
published: true
locale: id
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Berikut adalah terjemahan dari teks tersebut ke dalam bahasa Indonesia:

Tutorial ini akan memandu Anda melalui pembuatan aplikasi mobile menggunakan React, Capacitor, dan Konsta UI. Di akhir, Anda akan tahu cara mengubah aplikasi web Reactjs menjadi aplikasi mobile native dengan Capacitor, dan mengimplementasikan UI native menggunakan Konsta UI.

Capacitor memungkinkan transformasi mudah aplikasi web Reactjs Anda menjadi aplikasi mobile native, tanpa memerlukan perubahan substansial atau mempelajari strategi baru seperti React Native.

Prosesnya melibatkan beberapa langkah sederhana, dan sebelum Anda sadari, aplikasi Reactjs Anda akan menjadi aplikasi mobile yang berfungsi penuh. Jadi, tetaplah bersama kami saat kami memandu Anda dalam perjalanan ini.

## Gambaran Umum Capacitor

CapacitorJS adalah pengubah permainan. Ia dapat terintegrasi dengan mulus ke proyek web apa pun dan membungkus aplikasi Anda ke dalam webview native sambil menghasilkan proyek Xcode dan Android Studio native. Plus, melalui plugin-nya, Anda dapat mengakses fitur perangkat native seperti kamera melalui jembatan JS.

Capacitor menawarkan cara sederhana untuk membuat aplikasi mobile native tanpa kesulitan atau kurva pembelajaran yang curam. API-nya yang sederhana dan fungsionalitas yang efisien membuatnya mudah diintegrasikan ke dalam proyek Anda.

## Menyiapkan Aplikasi Reactjs Anda

Mari kita gunakan metode paling sederhana untuk memulai aplikasi React. Kita akan menggunakan package manager npm untuk membuat aplikasi React baru:

```shell
npx create-react-app my-app
```

Untuk mengubah proyek kita menjadi aplikasi mobile native, diperlukan **ekspor** dari aplikasi kita.

Kita akan kembali ke hal ini sebentar lagi. Pertama, mari kita pahami cara mengintegrasikan Capacitor ke dalam aplikasi React kita.

## Mengintegrasikan Capacitor ke dalam Aplikasi Reactjs Anda

Langkah-langkah pengaturan awal mungkin sedikit detail, tetapi setelah itu, memperbarui wrapper aplikasi native Anda menjadi sesederhana menjalankan perintah `sync`.

Pertama, kita akan menginstal Capacitor CLI sebagai dependensi pengembangan dan menyiapkannya dalam proyek kita. Selama pengaturan, terima nilai default untuk nama dan bundle ID dengan menekan "enter".

Selanjutnya, kita akan menginstal paket inti dan paket yang relevan untuk platform iOS dan Android.

Akhirnya, kita akan menambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek kita:

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

Direktori **ios** dan **android** sekarang ada dalam proyek Reactjs Anda.

Untuk mengakses proyek Android nanti, instal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda membutuhkan Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

Selanjutnya, perbarui **webDir** di file **capacitor.config.json** Anda seperti yang ditunjukkan di bawah ini:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Jalankan perintah build dan sinkronkan proyek Anda dengan Capacitor:

```shell
npm run build
npx cap sync
```

Perintah `npm run build` akan membangun proyek Reactjs Anda, sementara `npx cap sync` akan menyelaraskan kode web di tempat yang akurat dari platform native sehingga dapat dijalankan dalam aplikasi.

Sekarang, dengan sedikit keberuntungan dan tanpa kesalahan, aplikasi Reactjs Anda seharusnya siap untuk diluncurkan di perangkat!

## Membangun dan Mendeploy Aplikasi Native Anda

Mengembangkan aplikasi iOS membutuhkan **Xcode**, dan aplikasi Android membutuhkan **Android Studio**. Jika Anda berencana untuk mendistribusikan aplikasi Anda di app store, Anda harus mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Capacitor CLI menyederhanakan proses membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah proyek native Anda siap, mendeploy aplikasi Anda ke perangkat yang terhubung adalah proses yang mudah.

Untuk Android Studio, tunggu sampai semuanya dimuat dan kemudian deploy aplikasi Anda ke perangkat yang terhubung.

Untuk Xcode, atur akun penandatanganan Anda untuk mendeploy aplikasi Anda ke perangkat nyata alih-alih hanya simulator. Setelah melakukan itu, cukup tekan play untuk menjalankan aplikasi di perangkat yang terhubung, yang dapat Anda pilih di bagian atas.

Jika semua berjalan dengan baik, Anda akan berhasil mengubah ReactAplikasi web js menjadi aplikasi seluler asli!

## Live Reload Capacitor

Kerangka kerja pengembangan modern biasanya dilengkapi dengan hot reload, dan untungnya, Anda bisa mendapatkan hal yang sama dengan Capacitor tetapi **di perangkat seluler Anda**!

Anda dapat membuat aplikasi yang dihosting secara lokal dapat diakses dengan live reload di jaringan Anda dengan membuat aplikasi Capacitor memuat konten dari URL tertentu

Pertama, tentukan alamat IP lokal Anda. Di Mac, Anda dapat melakukannya dengan menjalankan `ipconfig getifaddr en0` di terminal. Di Windows, jalankan `ipconfig` dan cari alamat IPv4

Setelah ini, instruksikan Capacitor untuk memuat aplikasi langsung dari server dengan menambahkan parameter lain ke file `capacitor.config.ts` Anda:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Pastikan untuk menggunakan IP dan port yang akurat. Jalankan `npx cap copy` untuk menerapkan perubahan ini ke proyek asli kita

Setelah menerapkan aplikasi Anda sekali lagi melalui Android Studio atau Xcode, setiap perubahan dalam aplikasi React Anda akan secara otomatis dimuat ulang dan ditampilkan di aplikasi Anda!

Perlu diingat bahwa jika plugin baru diinstal, seperti kamera, diperlukan pembangunan ulang proyek asli Anda. Ini karena file asli akan berubah dan tidak dapat diperbarui secara langsung

## Menggunakan Plugin Capacitor

Mari kita lihat sekilas cara menggunakan plugin Capacitor. Mari kita instal yang sederhana, [plugin Share](https://capacitorjs.com/docs/apis/share/), yang memunculkan dialog berbagi asli:

```shell
npm i @capacitor/share
```

Untuk menggunakannya, impor paket dan panggil fungsi `share()` masing-masing dari aplikasi kita. Pertimbangkan **App.js**:

```javascript
import { Share } from '@capacitor/share';

function ShareButton() {
  const share = async () => {
    await Share.share({
      title: 'React App',
      text: 'Visit this React App',
      url: 'http://localhost:3000',
      dialogTitle: 'Share with...'
    });
  };

  return (
    <button onClick={share}>
      Share
    </button>
  );
}

export default ShareButton;
```

Setelah menginstal plugin baru, ingatlah untuk menyinkronkan proyek React Anda lagi menggunakan `npx cap sync`

## Menerapkan Konsta UI: UI Seluler yang Lebih Baik

Untuk pengalaman UI seluler yang lebih baik, kita akan menggunakan Konsta UI. Ini menyediakan gaya khusus iOS dan Android, dan mudah digunakan

Untuk menggunakan Konsta UI, instal paket React:

```shell
npm i konsta
```

Ubah file `tailwind.config.js` Anda seperti ini:

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

`konstaConfig` akan melengkapi konfigurasi Tailwind CSS Anda saat ini dengan varian dan utilitas tambahan yang diperlukan untuk Konsta UI

Sekarang, siapkan komponen App utama untuk mengatur parameter global seperti `theme`. Bungkus aplikasi utama dengan App di `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'konsta/react';
import './index.css';
import MyApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <App theme="ios">
      <MyApp />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Mari kita gunakan komponen React Konsta UI di halaman React.js kita. Buka `src/App.js` dan ubah menjadi:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
} from 'konsta/react';

export default function MyApp() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Welcome to your React & Konsta UI app.
        </p>
      </Block>
      
      <List>
        <ListItem href="/about" title="About" />
      </List>

      <Block strong>
        <Button>Click Me</Button>
      </Block>
    </Page>
  );
}
```

Jika semuanya telah dilakukan dengan benar, Anda akan melihat integrasi yang mudah antara React dan Konsta UI untuk memberikan tampilan asli pada aplikasi seluler Anda

## Kesimpulan

Capacitor menawarkan cara yang mulus untuk membangun aplikasi asli berdasarkan proyek web yang ada, menyediakan cara sederhana untuk berbagi kode dan memiliki UI yang konsisten

Berkat teknologi seperti Capacitor, membangun aplikasi seluler dari aplikasi web React.js belum pernah semudah ini. Tingkatkan keterampilan pengembangan web Anda ke level berikutnya dengan membuat aplikasi seluler asli yang mengesankan. Selamat coding!

Untuk informasi lebih lanjut tentang bagaimana Anda dapat mempercepat proses pengembangan aplikasi Anda, [daftar akun gratis](/register/) hari ini