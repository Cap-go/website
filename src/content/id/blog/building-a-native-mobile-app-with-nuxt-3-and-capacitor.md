---
slug: building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: Membuat Aplikasi Seluler dengan Nuxt 3 dan Capacitor
description: >-
  Cara membuat aplikasi seluler dengan Nuxt 3, Capacitor, dan
  mengimplementasikan antarmuka pengguna asli dengan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Ilustrasi Nuxt 3 dan Capgo
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dalam tutorial ini, kita akan memulai dengan aplikasi [Nuxt 3](https://nuxtjsorg/) baru dan beralih ke ranah native menggunakan Capacitor dan akhirnya juga menambahkan [Konsta UI](https://konstauicom/) untuk UI mobile Tailwind CSS yang lebih baik, meskipun langkah terakhir ini sepenuhnya opsional.

Dengan menggunakan Capacitor, Anda dapat dengan mudah mengkonversi aplikasi web Nuxt 3 Anda menjadi aplikasi mobile native tanpa memerlukan modifikasi yang signifikan atau mempelajari keterampilan baru seperti React Native.

Dengan hanya beberapa langkah sederhana, sebagian besar aplikasi Nuxt 3 dapat diubah menjadi aplikasi mobile.

Tutorial ini akan memandu Anda melalui prosesnya, dimulai dengan aplikasi Nuxt 3 baru dan kemudian memasukkan Capacitor untuk beralih ke ranah aplikasi mobile native. Selain itu, Anda dapat menggunakan [Konsta UI](https://konstauicom/) secara opsional untuk meningkatkan UI mobile Anda dengan Tailwind CSS.

## Tentang Capacitor

CapacitorJS benar-benar mengubah permainan! Anda dapat dengan mudah memasukkannya ke dalam proyek web apa pun, dan ia akan membungkus aplikasi Anda ke dalam webview native, menghasilkan proyek Xcode dan Android Studio native untuk Anda. Selain itu, plugin-nya menyediakan akses ke fitur perangkat native seperti kamera melalui jembatan JS.

Dengan Capacitor, Anda mendapatkan aplikasi mobile native yang fantastis tanpa pengaturan rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien membuatnya sangat mudah diintegrasikan ke dalam proyek Anda. Percayalah, Anda akan takjub betapa mudahnya mencapai aplikasi native yang berfungsi penuh dengan Capacitor!

## Menyiapkan Aplikasi Nuxt 3 Anda

Untuk membuat aplikasi Nuxt 3 baru, jalankan perintah berikut:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Pilih "Nuxt 3" ketika diminta untuk versi Nuxt.

Untuk membuat aplikasi mobile native, kita memerlukan **ekspor** dari proyek kita. Oleh karena itu, mari kita sertakan skrip sederhana dalam **packagejson** kita yang dapat digunakan untuk membangun dan menyalin proyek Nuxt:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Setelah menjalankan perintah `generate`, Anda seharusnya dapat melihat folder `dist` baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, tetapi untuk saat ini, kita harus mengaturnya dengan benar.

## Menambahkan Capacitor ke Aplikasi Nuxt 3 Anda

Untuk mengemas aplikasi web apa pun ke dalam container mobile native, kita harus mengikuti beberapa langkah awal, tetapi setelah itu sesederhana menjalankan satu perintah `sync`.

Pertama, kita dapat menginstal [Capacitor CLI](https://capacitorjscom/docs/cli/) sebagai dependensi pengembangan, dan kemudian mengaturnya dalam proyek kita. Selama pengaturan, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan ID bundle.

Selanjutnya, kita perlu menginstal paket inti dan paket yang relevan untuk platform iOS dan Android.

Akhirnya, kita dapat menambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek kita:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Pada titik ini, Anda seharusnya dapat melihat folder **ios** dan **android** baru di proyek Nuxt 3 Anda.

**Itu adalah proyek native yang sebenarnya!**

Untuk mengakses proyek Android nanti, Anda harus menginstal [Android Studio](https://developerandroidcom/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developerapplecom/xcode/).

Selain itu, Anda harus menemukan file **capacitorconfigts** di proyek Anda, yang berisi beberapa pengaturan dasar Capacitor yang digunakan selama sinkronisasi. Satu-satunya hal yang perlu Anda perhatikan adalah **webDir**, yang harus menunjuk ke hasil dari perintah build Anda. Saat ini, itu tidak akurat.

Untuk memperbaikinya, buka file **capacitorconfigjson** dan perbarui **webDir**:

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

Perintah pertama `npm run generate` akan membangun proyek Nuxt 3 Anda dan menyalin build statis, sedangkan perintah kedua `npx cap sync` akan menyinkronkan semua kode web ke tempat yang tepat di platform native sehingga dapat ditampilkan dalam aplikasi.

Selain itu, perintah sync mungkin memperbarui platform native dan menginstal plugin, jadi ketika Anda menginstal [plugin Capacitor](https://capacitorjscom/docs/plugins/) baru, saatnya untuk menjalankan `npx cap sync` lagi.Tanpa disadari, Anda sekarang sebenarnya sudah selesai, jadi mari kita lihat aplikasinya di perangkat!

## Build dan Deploy aplikasi native

Untuk mengembangkan aplikasi iOS, Anda perlu memiliki **Xcode** yang terinstal, dan untuk aplikasi Android, Anda perlu memiliki **Android Studio** yang terinstal. Selain itu, jika Anda berencana mendistribusikan aplikasi Anda di app store, Anda perlu mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Jika Anda baru dalam pengembangan mobile native, Anda dapat menggunakan Capacitor CLI untuk dengan mudah membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah Anda menyiapkan proyek native Anda, mendeploy aplikasi Anda ke perangkat yang terhubung sangatlah mudah. Di Android Studio, Anda hanya perlu menunggu semuanya siap, dan Anda dapat mendeploy aplikasi Anda ke perangkat yang terhubung tanpa mengubah pengaturan apa pun. Berikut contohnya:

![android-studio-run](/android-studio-run.webp)

Di Xcode, Anda perlu menyiapkan akun penandatanganan Anda untuk mendeploy aplikasi Anda ke perangkat nyata alih-alih hanya simulator. Jika Anda belum pernah melakukan ini sebelumnya, Xcode akan memandu Anda melalui prosesnya (tapi sekali lagi, Anda perlu terdaftar di Developer Program). Setelah itu, Anda dapat langsung menekan play untuk menjalankan aplikasi di perangkat Anda yang terhubung, yang dapat Anda pilih di bagian atas. Berikut contohnya:

![xcode-run](/xcode-run.webp)

Selamat! Anda telah berhasil mendeploy aplikasi web Nuxt 3 Anda ke perangkat mobile. Berikut contohnya:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

Tapi tunggu dulu, ada cara yang lebih cepat untuk melakukan ini selama pengembangan.

## Capacitor Live Reload

Sekarang, Anda mungkin sudah terbiasa memiliki hot reload dengan semua framework modern, dan kabar baiknya adalah Anda dapat memiliki fungsionalitas yang sama **di perangkat mobile** dengan usaha minimal!

Aktifkan akses ke aplikasi yang dihosting secara lokal dengan live reload **di jaringan Anda** dengan membuat aplikasi Capacitor memuat konten dari URL tertentu.

Langkah pertama adalah mencari tahu alamat IP lokal Anda. Jika Anda menggunakan Mac, Anda dapat mengetahuinya dengan menjalankan perintah berikut di terminal:

```shell
ipconfig getifaddr en0
```

Di Windows, jalankan:

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
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Pastikan untuk menggunakan **IP dan port yang benar**, saya telah menggunakan port default Nuxt 3 dalam contoh ini.

Sekarang, kita dapat menerapkan perubahan ini dengan menyalinnya ke proyek native kita:

```shell
npx cap copy
```

Perintah `copy` mirip dengan `sync`, tetapi hanya akan **menyalin perubahan yang dibuat pada folder web** dan konfigurasi, tanpa memperbarui proyek native.

Anda sekarang dapat mendeploy aplikasi Anda sekali lagi melalui Android Studio atau Xcode. Setelah itu, jika Anda mengubah sesuatu di aplikasi Nuxt Anda, **aplikasi akan secara otomatis dimuat ulang** dan menampilkan perubahan!

**Perlu diingat** bahwa jika Anda menginstal plugin baru seperti kamera, itu masih memerlukan pembangunan ulang proyek native Anda. Ini karena file native diubah, dan tidak dapat dilakukan secara langsung.

Perhatikan bahwa Anda harus menggunakan IP dan port yang benar dalam konfigurasi Anda. Blok kode di atas menunjukkan port default Nuxt 3 untuk tujuan demonstrasi.

## Menggunakan Plugin Capacitor

Mari kita lihat bagaimana menggunakan plugin Capacitor dalam tindakan, yang telah kita sebutkan beberapa kali sebelumnya. Untuk melakukan ini, kita dapat menginstal plugin yang cukup sederhana dengan menjalankan:

```shell
npm i @capacitor/share
```

Tidak ada yang istimewa tentang [plugin Share](https://capacitorjs.com/docs/apis/share/), tetapi bagaimanapun juga memunculkan dialog berbagi native! Untuk ini sekarang kita hanya perlu mengimpor paket dan memanggil fungsi `share()` yang sesuai dari aplikasi kita, jadi mari kita ubah **pages/index.vue** menjadi seperti ini:

```html
<template>
  <div>
    <h1>Welcome to Nuxt 3 and Capacitor!</h1>
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

Seperti yang disebutkan sebelumnya, ketika menginstal plugin baru, kita perlu melakukan operasi sinkronisasi dan kemudian mendeploy ulang aplikasi ke perangkat kita.Untuk melakukan ini, jalankan perintah berikut:

```
npx cap sync
```

Setelah menekan tombol, Anda dapat menyaksikan dialog berbagi native yang indah dalam aksi!

## Menambahkan Konsta UI

Untuk menggunakan Konsta UI dalam aplikasi Nuxt 3 Anda, Anda perlu [sudah menginstal tailwind](https://tailwindcss.com/docs/guides/nuxtjs/) dan menginstal paket:

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

`konstaConfig` akan memperluas konfigurasi Tailwind CSS default (atau kustom Anda) dengan beberapa varian tambahan dan utilitas pembantu yang diperlukan untuk Konsta UI

Sekarang kita perlu menyiapkan komponen [App](https://konsta.ui.com/vue/app/) utama sehingga kita dapat mengatur beberapa parameter global (seperti `theme`)

Kita perlu membungkus seluruh aplikasi dengan `App` di `pages/_app.vue`:

```html
<template>
  <App theme="ios">
    <Nuxt />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Contoh Halaman

Sekarang setelah semuanya diatur, kita dapat menggunakan komponen Vue Konsta UI di halaman Nuxt 3 kita

Sebagai contoh, mari buka `pages/index.vue` dan ubah menjadi berikut:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 3 & Konsta UI app. Let's see what we have here.
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

Jika live reload tidak sinkron setelah menginstal semua komponen yang diperlukan, coba restart semuanya. Setelah Anda melakukan itu, Anda seharusnya melihat aplikasi mobile dengan tampilan yang agak native, dibangun dengan Nuxt 3 dan Capacitor!

Anda seharusnya melihat halaman berikut sebagai hasilnya:

<template>
  <div>
<h1>

## Kesimpulan

Capacitor adalah pilihan yang sangat baik untuk membangun aplikasi native berdasarkan proyek web yang sudah ada, menawarkan cara sederhana untuk berbagi kode dan mempertahankan UI yang konsisten

Dan dengan penambahan [Capgo](https://capgo.app/), bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug

Jika Anda ingin mempelajari cara menambahkan Capgo ke aplikasi Nextjs Anda, lihat artikel berikutnya:

## Kredit

Terima kasih banyak kepada Simon, artikel ini berdasarkan [artikel ini](https://devdactic.com/nextjs-and-capacitor/) yang ditulis ulang untuk nuxt3 dengan chat-gpt-4 dan diadaptasi