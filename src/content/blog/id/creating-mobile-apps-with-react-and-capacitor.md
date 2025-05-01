---
slug: creating-mobile-apps-with-react-and-capacitor
title: モバイルアプリをピュアReact.jsとCapacitorで構築する
description: >-
  Panduan untuk mengubah aplikasi web React.js menjadi aplikasi mobile native
  dengan Capacitor dan meningkatkan tampilan native menggunakan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Ilustrasi React.js dan Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Tutorialini akan memandu Anda dalam membuat aplikasi mobile menggunakan React, Capacitor, dan Konsta UI. Di akhir tutorial, Anda akan mengetahui cara mengubah aplikasi web Reactjs menjadi aplikasi mobile native dengan Capacitor, dan mengimplementasikan UI native menggunakan Konsta UI.

Capacitor memungkinkan transformasi mudah dari aplikasi web Reactjs Anda menjadi aplikasi mobile native, tanpa memerlukan perubahan substansial atau mempelajari strategi baru seperti React Native.

Prosesnya melibatkan beberapa langkah sederhana, dan sebelum Anda sadari, aplikasi Reactjs Anda akan menjadi aplikasi mobile yang berfungsi penuh. Jadi, tetaplah bersama kami saat kami memandu Anda dalam perjalanan ini.

## Sekilas tentang Capacitor

CapacitorJS adalah game-changer. Dapat terintegrasi dengan lancar dengan proyek web apapun dan membungkus aplikasi Anda ke dalam webview native sambil menghasilkan proyek Xcode dan Android Studio native. Plus, melalui plugin-nya, Anda dapat mengakses fitur perangkat native seperti kamera melalui bridge JS.

Capacitor menawarkan cara yang sederhana untuk membuat aplikasi mobile native tanpa kerumitan atau kurva pembelajaran yang curam. API-nya yang sederhana dan fungsionalitas yang efisien membuatnya mudah diintegrasikan ke dalam proyek Anda.

## Menyiapkan Aplikasi Reactjs Anda

Mari gunakan metode paling sederhana untuk memulai aplikasi React. Kita akan menggunakan package manager npm untuk membuat aplikasi React baru:

```shell
npx create-react-app my-app
```

Untuk mengubah proyek kita menjadi aplikasi mobile native, diperlukan **export** dari aplikasi kita.

Kita akan kembali ke hal ini sebentar lagi. Pertama, mari pahami cara mengintegrasikan Capacitor ke dalam aplikasi React kita.

## Mengintegrasikan Capacitor ke dalam Aplikasi Reactjs Anda

Langkah-langkah pengaturan awal mungkin sedikit detail, tapi setelah itu, memperbarui wrapper aplikasi native Anda menjadi sesederhana menjalankan perintah `sync`.

Pertama, kita akan menginstal Capacitor CLI sebagai dependency pengembangan dan mengaturnya dalam proyek kita. Selama pengaturan, terima nilai default untuk nama dan ID bundle dengan menekan "enter".

Selanjutnya, kita akan menginstal paket core dan paket-paket yang relevan untuk platform iOS dan Android.

Akhirnya, kita akan menambahkan platform-platformnya, dan Capacitor akan membuat folder untuk setiap platform di root proyek kita:

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

Direktori **ios** dan **android** sekarang ada di proyek Reactjs Anda.

Untuk mengakses proyek Android nantinya, instal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

Selanjutnya, perbarui **webDir** di file **capacitor.config.json** Anda seperti ditunjukkan di bawah ini:

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

Perintah `npm run build` akan mem-build proyek Reactjs Anda, sementara `npx cap sync` akan menyelaraskan kode web di tempat yang tepat pada platform native sehingga dapat dijalankan dalam aplikasi.

Sekarang, dengan sedikit keberuntungan dan tanpa error, aplikasi Reactjs Anda seharusnya siap untuk diluncurkan di perangkat!

## Membangun dan Men-deploy Aplikasi Native Anda

Mengembangkan aplikasi iOS memerlukan **Xcode**, dan aplikasi Android membutuhkan **Android Studio**. Jika Anda berencana untuk mendistribusikan aplikasi Anda di app store, Anda harus mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

CLI Capacitor menyederhanakan proses membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah proyek native Anda diatur, men-deploy aplikasi Anda ke perangkat yang terhubung adalah proses yang sederhana.

Untuk Android Studio, tunggu sampai semuanya dimuat dan kemudian deploy aplikasi Anda ke perangkat yang terhubung.

Untuk Xcode, atur akun signing Anda untuk men-deploy aplikasi ke perangkat nyata alih-alih hanya simulator. Setelah melakukan itu, cukup tekan play untuk menjalankan aplikasi di perangkat yang terhubung, yang dapat Anda pilih di bagian atas.

Jika semua berjalan lancar, Anda telah mengkonversi React Anda.aplikasi web js menjadi aplikasi mobile native!

## Live Reload Capacitor

Framework pengembangan modern biasanya dilengkapi hot reload, dan untungnya, Anda bisa mendapatkan hal yang sama dengan Capacitor namun **di perangkat mobile Anda**!

Anda dapat membuat aplikasi yang di-host secara lokal dapat diakses dengan live reload di jaringan Anda dengan membuat aplikasi Capacitor memuat konten dari URL tertentu

Pertama, tentukan alamat IP lokal Anda. Di Mac, Anda bisa melakukannya dengan menjalankan `ipconfig getifaddr en0` di terminal. Di Windows, jalankan `ipconfig` dan cari alamat IPv4

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

Pastikan untuk menggunakan IP dan port yang akurat. Jalankan `npx cap copy` untuk menerapkan perubahan ini ke proyek native kita

Setelah men-deploy aplikasi Anda sekali lagi melalui Android Studio atau Xcode, setiap perubahan di aplikasi React Anda akan secara otomatis dimuat ulang dan ditampilkan di aplikasi Anda!

Perlu diingat bahwa jika plugin baru diinstal, seperti kamera, diperlukan rebuild proyek native Anda. Ini karena file native akan berubah dan tidak dapat diperbarui secara langsung

## Menggunakan Plugin Capacitor

Mari kita lihat sekilas cara menggunakan plugin Capacitor. Mari instal yang sederhana, [Share plugin](https://capacitorjs.com/docs/apis/share/), yang memunculkan dialog berbagi native:

```shell
npm i @capacitor/share
```

Untuk menggunakannya, impor paket dan panggil fungsi `share()` terkait dari aplikasi kita. Perhatikan **App.js**:

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

Setelah menginstal plugin baru, ingat untuk menyinkronkan proyek React Anda lagi menggunakan `npx cap sync`

## Mengimplementasikan Konsta UI: UI Mobile yang Lebih Baik

Untuk pengalaman UI mobile yang lebih baik, kita akan menggunakan Konsta UI. Ini menyediakan styling khusus iOS dan Android, dan mudah digunakan

Untuk menggunakan Konsta UI, instal paket React:

```shell
npm i konsta
```

Modifikasi file `tailwind.config.js` Anda seperti ini:

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

Mari gunakan komponen React Konsta UI dalam halaman React.js kita. Buka `src/App.js` dan modifikasi menjadi:

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

Jika semuanya telah dilakukan dengan benar, Anda akan melihat integrasi yang mudah antara React dan Konsta UI untuk memberikan tampilan native pada aplikasi mobile Anda

## Kesimpulan

Capacitor menawarkan cara yang mulus untuk membangun aplikasi native berdasarkan proyek web yang ada, menyediakan cara sederhana untuk berbagi kode dan memiliki UI yang konsisten

Berkat teknologi seperti Capacitor, membangun aplikasi mobile dari aplikasi web React.js belum pernah semudah ini. Tingkatkan kemampuan pengembangan web Anda ke level berikutnya dengan membuat aplikasi mobile native yang mengesankan. Selamat mengoding!

Untuk lebih lanjut tentang bagaimana Anda dapat mempercepat proses pengembangan aplikasi Anda, [daftar akun gratis](/register/) hari ini