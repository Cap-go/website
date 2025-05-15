---
slug: creating-mobile-apps-with-react-and-capacitor
title: Membangun Aplikasi Mobile dengan Pure React.js dan Capacitor
description: >-
  Panduan tentang cara mengubah aplikasi web React.js menjadi aplikasi mobile
  native dengan memanfaatkan Capacitor, dan meningkatkan antarmuka pengguna
  native dengan Konsta UI.
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
Tutorial ini akan membimbing Anda dalam membuat aplikasi mobile menggunakan React, Capacitor, dan Konsta UI. Pada akhir tutorial ini, Anda akan tahu cara mengubah aplikasi web React.js menjadi aplikasi mobile native dengan Capacitor, dan menerapkan UI native menggunakan Konsta UI.

Capacitor memungkinkan transformasi mudah aplikasi web React.js Anda menjadi aplikasi mobile native, tanpa memerlukan perubahan substansial atau mempelajari strategi baru seperti React Native.

Proses ini melibatkan beberapa langkah sederhana, dan sebelum Anda menyadarinya, aplikasi React.js Anda akan menjadi aplikasi mobile yang sepenuhnya berfungsi. Jadi, tetaplah bersama kami saat kami membimbing Anda dalam perjalanan ini.

## Ikhtisar Capacitor

CapacitorJS adalah pengubah permainan. Ini dapat terintegrasi tanpa hambatan dengan proyek web manapun dan membungkus aplikasi Anda ke dalam webview native sambil menghasilkan proyek Xcode dan Android Studio native. Selain itu, melalui plugin-nya, Anda dapat mengakses fitur perangkat native seperti kamera melalui jembatan JS.

Capacitor menawarkan cara yang sederhana untuk membuat aplikasi mobile native tanpa repot atau kurva belajar yang curam. API-nya yang sederhana dan fungsionalitas yang terintegrasi memudahkan untuk dimasukkan ke dalam proyek Anda.

## Menyiapkan Aplikasi React.js Anda

Mari kita gunakan metode yang paling sederhana untuk memulai aplikasi React. Kami akan menggunakan pengelola paket npm untuk membuat aplikasi React baru:

```shell
npx create-react-app my-app
```

Untuk mengubah proyek kami menjadi aplikasi mobile native, diperlukan **ekspor** dari aplikasi kami. 

Kami akan kembali ke ini dalam sekejap. Pertama, mari kita pahami cara mengintegrasikan Capacitor ke dalam aplikasi React kami.

## Mengintegrasikan Capacitor ke Dalam Aplikasi React.js Anda

Langkah-langkah pengaturan awal mungkin sedikit detail, tetapi setelah itu, memperbarui pembungkus aplikasi native Anda menjadi semudah menjalankan perintah `sync`.

Pertama, kami akan menginstal Capacitor CLI sebagai ketergantungan pengembangan dan mengaturnya dalam proyek kami. Selama pengaturan, terima nilai default untuk nama dan ID bundle dengan menekan “enter.”

Selanjutnya, kita akan menginstal paket inti dan paket yang relevan untuk platform iOS dan Android.

Akhirnya, kami akan menambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di akar proyek kami:

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

Direktori **ios** dan **android** sekarang hadir di proyek React.js Anda.

Untuk mengakses proyek Android nanti, instal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda perlu Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

Selanjutnya, perbarui **webDir** dalam file **capacitor.config.json** Anda seperti yang ditunjukkan di bawah ini:

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

Perintah `npm run build` akan membangun proyek React.js Anda, sementara `npx cap sync` akan menyelaraskan kode web ke tempat yang akurat di platform native agar dapat dieksekusi dalam aplikasi.

Sekarang, dengan sedikit keberuntungan dan tanpa kesalahan, aplikasi React.js Anda harus siap untuk diluncurkan di perangkat!

## Membangun dan Mengdeploy Aplikasi Native Anda

Mengembangkan aplikasi iOS memerlukan **Xcode**, dan aplikasi Android membutuhkan **Android Studio**. Jika Anda berniat untuk mendistribusikan aplikasi Anda di app store, Anda harus mendaftar ke Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Capacitor CLI menyederhanakan proses membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah proyek native Anda disiapkan, mengdeploy aplikasi Anda ke perangkat yang terhubung menjadi proses yang sederhana. 

Untuk Android Studio, tunggu hingga semuanya dimuat dan kemudian deploy aplikasi Anda ke perangkat yang terhubung. 

Untuk Xcode, buat akun penandatanganan Anda untuk mengdeploy aplikasi Anda ke perangkat nyata alih-alih hanya simulator. Setelah melakukan itu, cukup tekan play untuk menjalankan aplikasi di perangkat terhubung Anda, yang dapat Anda pilih di atas.

Jika semuanya berjalan dengan baik, Anda telah mengubah aplikasi web React.js Anda menjadi aplikasi mobile native!

## Capacitor Live Reload

Kerangka pengembangan modern biasanya dilengkapi dengan hot reload, dan beruntung, Anda dapat memiliki hal yang sama dengan Capacitor tetapi **pada perangkat mobile Anda**!

Anda dapat membuat aplikasi yang dihosting secara lokal dapat diakses dengan live reload di jaringan Anda dengan membiarkan aplikasi Capacitor memuat konten dari URL tertentu.

Pertama, tentukan alamat IP lokal Anda. Di Mac, Anda dapat melakukannya dengan menjalankan `ipconfig getifaddr en0` di terminal. Di Windows, eksekusi `ipconfig` dan cari alamat IPv4.

Setelah itu, perintahkan Capacitor untuk memuat aplikasi langsung dari server dengan menambahkan parameter lain ke file `capacitor.config.ts` Anda:

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

Pastikan untuk menggunakan IP dan port yang benar. Jalankan `npx cap copy` untuk menerapkan perubahan ini ke proyek native kami.

Setelah mengdeploy aplikasi Anda sekali lagi melalui Android Studio atau Xcode, setiap perubahan di aplikasi React Anda akan otomatis dimuat ulang dan ditampilkan di aplikasi Anda!

Ingatlah bahwa jika plugin baru diinstal, seperti kamera, diperlukan rebuild proyek native Anda. Ini karena file native akan berubah dan tidak dapat diperbarui secara langsung.

## Menggunakan Plugin Capacitor

Mari kita lihat sekilas cara menggunakan plugin Capacitor. Mari kita instal yang sederhana, yaitu [Plugin Share](https://capacitorjs.com/docs/apis/share/), yang memicu dialog berbagi native:

```shell
npm i @capacitor/share
```

Untuk menggunakannya, impor paket dan panggil fungsi `share()` yang sesuai dari aplikasi kami. Pertimbangkan **App.js**:

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

Setelah menginstal plugin baru, ingat untuk menyinkronkan proyek React Anda lagi menggunakan `npx cap sync`.

## Mengimplementasikan Konsta UI: UI Mobile yang Lebih Menarik

Untuk pengalaman UI mobile yang lebih menarik, kami akan menggunakan Konsta UI. Ini menyediakan styling khusus untuk iOS dan Android, dan mudah digunakan.

Untuk menggunakan Konsta UI, instal paket React:

```shell
npm i konsta
```

Ubah file `tailwind.config.js` Anda seperti berikut:

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

`konstaConfig` akan melengkapi konfigurasi Tailwind CSS Anda yang ada dengan varian dan utilitas tambahan yang diperlukan untuk Konsta UI.

Sekarang, atur komponen App utama untuk mengatur parameter global seperti `theme`. Bungkus aplikasi utama dengan App di `src/index.js`:

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

Mari kita gunakan komponen Konsta UI React di halaman React.js kami. Buka `src/App.js` dan ubah menjadi:

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

Jika semuanya telah dilakukan dengan benar, Anda harus melihat integrasi yang mudah antara React dan Konsta UI untuk memberikan aplikasi mobile Anda tampilan yang lebih native.

## Kesimpulan

Capacitor menawarkan cara yang mulus untuk membangun aplikasi native berdasarkan proyek web yang sudah ada, memberikan cara yang sederhana untuk berbagi kode dan memiliki UI yang konsisten.

Berkat teknologi seperti Capacitor, membangun aplikasi mobile dari aplikasi web React.js tidak pernah semudah ini. Tingkatkan keterampilan pengembangan web Anda ke level selanjutnya dengan membuat aplikasi mobile native yang mengesankan. Selamat coding!

Untuk lebih banyak informasi tentang bagaimana Anda dapat mempercepat proses pengembangan aplikasi Anda, [daftar untuk akun gratis](/register/) hari ini.
