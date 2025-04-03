---
slug: id__vue-mobile-app-capacitor
title: Mengembangkan Aplikasi Seluler dengan Vue dan Capacitor
description: >-
  Pelajari cara membuat aplikasi seluler dengan Vue dan Capacitor dan, secara
  opsional, meningkatkan antarmuka pengguna dengan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Ilustrasi Vue dan Capacitor
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dalam tutorial ini, kami akan memandu Anda melalui proses mengonversi aplikasi web Vue menjadi aplikasi seluler native menggunakan Capacitor. Sebagai opsional, Anda juga dapat meningkatkan UI seluler Anda dengan Konsta UI, sebuah library UI seluler berbasis Tailwind CSS.

## Tentang Capacitor

Capacitor adalah alat yang mengubah permainan yang memungkinkan Anda dengan mudah mengintegrasikannya ke dalam proyek web apa pun dan mengubah aplikasi Anda menjadi aplikasi seluler native. Ini menghasilkan proyek Xcode dan Android Studio native untuk Anda dan menyediakan akses ke fitur perangkat native seperti kamera melalui jembatan JavaScript.

## Menyiapkan Aplikasi Vue Anda

Pertama, buat aplikasi Vue baru dengan menjalankan perintah berikut:

```shell
vue create my-app
cd my-app
npm install
```

Untuk menyiapkan aplikasi Vue Anda untuk penerapan seluler native, Anda perlu mengekspor proyek Anda. Tambahkan skrip di file **package.json** Anda untuk membangun dan menyalin proyek Vue:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Setelah menjalankan perintah `build`, Anda seharusnya melihat folder `dist` baru di direktori root proyek Anda. Folder ini akan digunakan oleh Capacitor nanti.

## Menambahkan Capacitor ke Aplikasi Vue Anda

Untuk mengubah aplikasi web Vue Anda menjadi kontainer seluler native, ikuti langkah-langkah berikut:

1. Instal Capacitor CLI sebagai dependensi pengembangan dan siapkan di dalam proyek Anda. Terima nilai default untuk nama dan ID bundle selama penyiapan.

2. Instal paket inti dan paket-paket yang relevan untuk platform iOS dan Android.

3. Tambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek Anda:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Anda sekarang harus melihat folder **iOS** dan **android** baru di proyek Vue Anda.

Perbarui file **capacitor.config.json** untuk mengarahkan **webDir** ke hasil dari perintah build Anda:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Sekarang, Anda dapat membangun proyek Vue Anda dan mensinkronkannya dengan Capacitor:

```shell
npm run build
npx cap sync
```

## Membangun dan Menerapkan Aplikasi Native

Untuk mengembangkan aplikasi iOS, Anda memerlukan Xcode terinstal, dan untuk aplikasi Android, Anda memerlukan Android Studio terinstal. Selain itu, Anda perlu mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android untuk mendistribusikan aplikasi Anda di app store.

Gunakan Capacitor CLI untuk membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Terapkan aplikasi Anda ke perangkat yang terhubung menggunakan Android Studio atau Xcode.

## Capacitor Live Reload

Aktifkan live reload pada perangkat seluler Anda dengan membuat aplikasi Capacitor memuat konten dari URL tertentu di jaringan Anda.

Temukan alamat IP lokal Anda dan perbarui file `capacitor.config.ts` dengan IP dan port yang benar:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

Terapkan perubahan ini dengan menyalinnya ke proyek native Anda:

```shell
npx cap copy
```

Sekarang, aplikasi Anda akan secara otomatis memuat ulang dan menunjukkan perubahan ketika Anda memperbarui aplikasi Vue Anda.

## Menggunakan Plugin Capacitor

Instal plugin Capacitor, seperti plugin Share, dan gunakan dalam aplikasi Vue Anda:

```shell
npm i @capacitor/share
```

Impor paket dan panggil fungsi `share()` di aplikasi Anda:

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
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

Setelah menginstal plugin baru, jalankan perintah `sync` dan terapkan kembali aplikasi ke perangkat Anda:

```
npx cap sync
```

## Menambahkan Konsta UI

Untuk menggunakan Konsta UI di aplikasi Vue Anda, Anda perlu sudah [menginstal tailwind](https://tailwindcss.com/docs/guides/vite/#vue) dan menginstal paket:
Untuk menggunakan Konsta UI di aplikasi Vue Anda, instal paket dan modifikasi file `tailwind.config.js` Anda:

```shell
npm i konsta
```

Bungkus aplikasi Anda dengan komponen `App` di file `pages/_app.vue`, dan gunakan komponen Vue Konsta UI di halaman Vue Anda.

## Kesimpulan

Capacitor adalah pilihan yang bagus untuk membangun aplikasi native berdasarkan proyek web yang sudah ada. Dengan penambahan Capgo, bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug.

Pelajari bagaimana Capgo dapat membantu Anda membangun aplikasi yang lebih baik dengan lebih cepat, [daftar untuk akun gratis](/register/) hari ini.