---
slug: mise-à-jour-en-direct-avec-quasar-et-capacitor
title: 'Membuat aplikasi mobile dengan live update, Quasar dan Capacitor.'
description: >-
  Cara membuat aplikasi mobile dengan Quasar, Capacitor dan mengimplementasikan
  pembaruan langsung.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Ilustrasi Quasar dan Capgo
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Dalam tutorial ini, kita akan memulai dengan membuat aplikasi web baru menggunakan [Quasar](https://quasar.dev/). Kemudian, kita akan mempelajari cara mengubahnya menjadi aplikasi mobile menggunakan Capacitor. Jika Anda ingin membuat aplikasi Anda terlihat lebih baik di mobile.

Dengan Capacitor, Anda dapat mengubah aplikasi web Quasar Anda menjadi aplikasi mobile tanpa perlu melakukan banyak hal yang sulit atau mempelajari cara pembuatan aplikasi yang benar-benar baru seperti yang Anda lakukan dengan React Native.

Tutorial ini akan memandu Anda melalui prosesnya, dimulai dengan aplikasi Quasar baru dan kemudian menggabungkan Capacitor untuk beralih ke ranah aplikasi mobile native. Selain itu, Anda akan menggunakan [Capgo](https://capgo.app/) untuk mengirim pembaruan langsung ke aplikasi Anda dalam hitungan detik.

## Tentang Capacitor

CapacitorJS benar-benar mengubah permainan! Anda dapat dengan mudah menggabungkannya ke dalam proyek web apa pun, dan ia akan membungkus aplikasi Anda ke dalam webview native, menghasilkan proyek Xcode dan Android Studio native untuk Anda. Selain itu, plugin-nya menyediakan akses ke fitur perangkat native seperti kamera melalui jembatan JS.

Dengan Capacitor, Anda mendapatkan aplikasi mobile native yang fantastis tanpa pengaturan rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien membuatnya sangat mudah diintegrasikan ke dalam proyek Anda. Percayalah, Anda akan takjub betapa mudahnya mencapai aplikasi native yang berfungsi penuh dengan Capacitor!

## Menyiapkan Aplikasi Quasar Anda

Untuk membuat aplikasi Quasar baru, jalankan perintah berikut:

```shell
npm init quasar
```

![Quasar Project Setup](/quasar-setup.webp)

Pilih opsi "App with Quasar CLI" kemudian "Quasar v2".

Untuk membuat aplikasi mobile native, kita memerlukan **ekspor** dari proyek kita. Oleh karena itu, mari kita tambahkan skrip sederhana di **package.json** yang dapat digunakan untuk membangun dan menyalin proyek Quasar:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Setelah menjalankan perintah `generate`, Anda seharusnya dapat melihat folder `dist` baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, tetapi untuk saat ini, kita harus mengaturnya dengan benar.

## Menambahkan Capacitor ke Aplikasi Quasar Anda

Untuk mengemas aplikasi web apa pun ke dalam kontainer mobile native, kita harus mengikuti beberapa langkah awal, tetapi setelah itu semudah menjalankan satu perintah `sync`.

Pertama, kita dapat menginstal [Capacitor CLI](https://capacitorjs.com/docs/cli/) sebagai dependensi pengembangan, dan kemudian mengaturnya dalam proyek kita. Selama pengaturan, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan ID bundel.

Selanjutnya, kita perlu menginstal paket inti dan paket-paket yang relevan untuk platform iOS dan Android.

Akhirnya, kita dapat menambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek kita:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Initialize Capacitor](/capacitor-init.webp)

Pada titik ini, Anda seharusnya dapat melihat folder **ios** dan **android** baru di proyek Quasar Anda.

**Itu adalah proyek native yang sesungguhnya!**

Untuk mengakses proyek Android nantinya, Anda harus menginstal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

Selain itu, Anda seharusnya menemukan file **capacitor.config.ts** di proyek Anda, yang berisi beberapa pengaturan dasar Capacitor yang digunakan selama sinkronisasi. Satu-satunya hal yang perlu Anda perhatikan adalah **webDir**, yang harus menunjuk ke hasil dari perintah build Anda. Saat ini, itu tidak akurat.

Untuk memperbaiki ini, buka file **capacitor.config.json** dan perbarui **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Anda dapat mencobanya dengan menjalankan perintah berikut:

```shell
npm run generate
npx cap sync
```

Perintah pertama `npm run generate` hanya akan membangun proyek Quasar Anda dan menyalin build statis, sedangkan perintah kedua `npx cap sync` akan menyinkronkan semua kode web ke tempat yang tepat dari platform native sehingga dapat ditampilkan dalam aplikasi.

Selain itu, perintah sync mungkin memperbarui platform native dan menginstal plugin, jadi ketika Anda menginstal [plugin Capacitor](https://capacitorjs.com/docs/plugins/) baru, saatnya menjalankan `npx cap sync` lagi.

Tanpa disadari, Anda sekarang sebenarnya sudah selesai, jadi mari kita lihat aplikasinya di perangkat!

## Build dan Deploy Aplikasi Native

Untuk mengembangkan aplikasi iOS, Anda perlu memiliki **Xcode** terinstal, dan untuk aplikasi Android, Anda perlu memiliki **Android Studio** terinstal. Selain itu, jika Anda berencana mendistribusikan aplikasi Anda di app store, Anda perlu mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Jika Anda baru dalam pengembangan mobile native, Anda dapat menggunakan Capacitor CLI untuk dengan mudah membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah Anda mengatur proyek native Anda, mendeploy aplikasi Anda ke perangkat yang terhubung sangat mudah. Di Android Studio, Anda hanya perlu menunggu semuanya siap, dan Anda dapat mendeploy aplikasi Anda ke perangkat yang terhubung tanpa mengubah pengaturan apa pun. Berikut contohnya:

![android-studio-run](/android-studio-run.webp)

Di Xcode, Anda perlu mengatur akun penandatanganan Anda untuk mendeploy aplikasi Anda ke perangkat nyata daripada hanya simulator. Jika Anda belum pernah melakukan ini sebelumnya, Xcode akan memandu Anda melalui prosesnya (tapi sekali lagi, Anda perlu terdaftar di Developer Program). Setelah itu, Anda dapat langsung menekan play untuk menjalankan aplikasi di perangkat yang terhubung, yang dapat Anda pilih di bagian atas. Berikut contohnya:

![xcode-run](/xcode-run.webp)

Selamat! Anda telah berhasil mendeploy aplikasi web Quasar Anda ke perangkat mobile. Berikut contohnya:

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

Tapi tunggu, ada cara yang lebih cepat untuk melakukan ini selama pengembangan...

## Capgo Live Update

Capgo Live Update adalah layanan yang memungkinkan pengembang untuk mendeploy pembaruan ke aplikasi mobile mereka tanpa melalui proses pengiriman App Store tradisional. Ini bisa menjadi cara yang nyaman untuk dengan cepat memperbaiki bug atau membuat pembaruan kecil pada aplikasi tanpa menunggu proses review App Store.

Mengintegrasikan Capgo ke dalam aplikasi Quasar Anda adalah proses yang mudah yang memungkinkan Anda memanfaatkan kekuatan pembaruan langsung secara real-time. Panduan langkah demi langkah ini akan memandu Anda melalui integrasi dan implementasi Capgo Live Update, memungkinkan Anda memberikan pembaruan yang mulus.

**Daftar dan Akses Dashboard Capgo**:

Saatnya mendaftar, dan dapatkan API key Anda untuk mengunggah versi pertama Anda! Mulailah dengan [mendaftar akun Capgo](https://web.capgo.app/register/).

**Instal Capgo SDK**:

Dari command line, langsung ke root aplikasi Capacitor Anda, jalankan:

`npm i @capgo/capacitor-updater && npx cap sync` Untuk menginstal plugin ke dalam aplikasi Capacitor Anda.

Dan kemudian tambahkan ke aplikasi Anda kode ini sebagai pengganti CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ini akan memberi tahu plugin native bahwa instalasi telah berhasil.

**Login ke Capgo CLOUD**:

Pertama, gunakan [apikey](https://web.capgo.app/dashboard/apikeys/) `all` yang ada di akun Anda untuk login dengan CLI:

    `npx @capgo/cli@latest login YOU_KEY`

**Tambahkan Aplikasi Pertama Anda**:

Mari mulai dengan membuat aplikasi di Capgo Cloud dengan CLI.

```shell
    npx @capgo/cli@latest app add
```
Perintah ini akan menggunakan semua variabel yang didefinisikan dalam file config Capacitor untuk membuat aplikasi.

**Unggah Versi Pertama Anda**:

Jalankan perintah untuk membangun kode Anda dan mengirimkannya ke Capgo dengan:

```shell
npx @capgo/cli@latest bundle upload`
```

Secara default, nama versi akan sama dengan yang ada di file package.json Anda.

Periksa di [Capgo](https://web.capgo.app/login/) apakah build sudah ada.

Anda bahkan dapat mengujinya dengan [aplikasi sandbox mobile](https://capgo.app/app_mobile/) saya.

**Jadikan Channel Default**:

Setelah Anda mengirim aplikasi Anda ke Capgo, Anda perlu menjadikan channel Anda default agar aplikasi dapat menerima pembaruan dari Capgo.

`npx @capgo/cli@latest channel set production -s default`

**Konfigurasi Aplikasi untuk Memvalidasi Pembaruan**:

Tambahkan config ini ke file JavaScript utama Anda.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Kemudian lakukan `npm run build && npx cap copy` untuk memperbarui aplikasi Anda.

**Terima Live Update**:

Agar aplikasi Anda menerima live update dari Deploy, Anda perlu menjalankan aplikasi di perangkat atau emulator. Cara termudah untuk melakukan ini adalah dengan menggunakan perintah berikut untuk meluncurkan aplikasi lokal Anda di emulator atau perangkat yang terhubung ke komputer Anda.

      npx cap run [ios | android]

Buka aplikasi, letakkan di latar belakang dan buka lagi, Anda seharusnya melihat di log bahwa aplikasi melakukan pembaruan.

Selamat! 🎉 Anda telah berhasil mendeploy Live Update pertama Anda. Ini hanya awal dari apa yang dapat Anda lakukan dengan Live Updates. Untuk mempelajari lebih lanjut, lihat [dokumentasi Live Updates](https://capgo.app/docs/plugin/cloud-mode/getting-started/) lengkap.

## Menggunakan Plugin Capacitor

Mari kita lihat bagaimana menggunakan plugin Capacitor dalam aksi, yang telah kita sebutkan beberapa kali sebelumnya. Untuk melakukan ini, kita dapat menginstal plugin yang cukup sederhana dengan menjalankan:

```shell
npm i @capacitor/share
```

Tidak ada yang istimewa tentang [Share plugin](https://capacitorjs.com/docs/apis/share/), tetapi ia tetap memunculkan dialog share native! Untuk ini sekarang kita hanya perlu mengimpor paket dan memanggil fungsi `share()` dari aplikasi kita, jadi mari ubah **pages/index.vue** menjadi:

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

Seperti disebutkan sebelumnya, ketika menginstal plugin baru, kita perlu melakukan operasi sync dan kemudian mendeploy ulang aplikasi ke perangkat kita. Untuk melakukan ini, jalankan perintah berikut:

```
npx cap sync
```

Setelah menekan tombol, Anda dapat menyaksikan dialog share native yang indah dalam aksi!

## Opsional Menambahkan Konsta UI

Untuk menggunakan Konsta UI dalam aplikasi Quasar Anda, Anda perlu [tailwind sudah terinstal](https://tailwindcss.com/docs/installation/) dan menginstal paket:

```shell
npm i konsta
```

Selain itu, Anda perlu memodifikasi file `tailwind.config.js` Anda:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
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

`konstaConfig` akan memperluas config Tailwind CSS default (atau kustom Anda) dengan beberapa varian tambahan dan utilitas pembantu yang diperlukan untuk Konsta UI.

Sekarang kita perlu mengatur komponen [App](https://konstaui.com/vue/app/) utama sehingga kita dapat mengatur beberapa parameter global (seperti `theme`).

Kita perlu membungkus seluruh aplikasi dengan `App` di `pages/_app.vue`:

```html
<template>
  <App theme="ios">
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Contoh Halaman

Sekarang ketika semuanya sudah diatur, kita dapat menggunakan komponen Konsta UI Vue dalam halaman Quasar kita.

Misalnya, mari buka `pages/index.vue` dan ubah menjadi berikut:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Quasar & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

Jika live reload tidak tersinkronisasi setelah menginstal semua komponen yang diperlukan, coba mulai ulang semuanya. Setelah Anda melakukan itu, Anda akan melihat aplikasi mobile dengan tampilan yang mirip native, dibangun dengan Quasar dan Capacitor!

## Kesimpulan

Capacitor adalah pilihan yang sangat baik untuk membangun aplikasi native berdasarkan proyek web yang sudah ada, menawarkan cara sederhana untuk berbagi kode dan mempertahankan UI yang konsisten.

Dan dengan tambahan [Capgo](https://capgo.app/), bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug.

Jika Anda ingin belajar cara menambahkan Capgo ke aplikasi Next.js Anda, lihat artikel berikutnya:
