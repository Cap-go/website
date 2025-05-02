---
slug: aplikasi-mobile-vue-capacitor
title: Membuat Aplikasi Mobile dengan Vue dan Capacitor
description: >-
  Pelajari cara membuat aplikasi mobile dengan Vue, Capacitor dan opsional
  Konsta UI untuk meningkatkan antarmuka pengguna.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Vue dan Capacitor Ilustrasi
keywords: >-
  Vue, Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: application-mobile-vue-capacitor
---
Dalam tutorial ini, kami akan memandu Anda melalui proses mengkonversi aplikasi web Vue menjadi aplikasi mobile native menggunakan Capacitor. Secara opsional, Anda juga dapat meningkatkan UI mobile Anda dengan Konsta UI, sebuah library UI mobile berbasis Tailwind CSS.

## Tentang Capacitor

Capacitor adalah alat yang mengubah cara kerja yang memungkinkan Anda dengan mudah mengintegrasikannya ke dalam proyek web apapun dan mengkonversi aplikasi Anda menjadi aplikasi mobile native. Ini menghasilkan proyek Xcode dan Android Studio native untuk Anda dan menyediakan akses ke fitur perangkat native seperti kamera melalui jembatan JavaScript.

## Mempersiapkan Aplikasi Vue Anda

Pertama, buat aplikasi Vue baru dengan menjalankan perintah berikut:

```shell
vue create my-app
cd my-app
npm install
```

Untuk mempersiapkan aplikasi Vue Anda untuk deployment mobile native, Anda perlu mengekspor proyek Anda. Tambahkan script di file **package.json** Anda untuk membangun dan menyalin proyek Vue:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Setelah menjalankan perintah `build`, Anda akan melihat folder `dist` baru di direktori root proyek Anda. Folder ini akan digunakan oleh Capacitor nanti.

## Menambahkan Capacitor ke Aplikasi Vue Anda

Untuk mengkonversi aplikasi web Vue Anda menjadi container mobile native, ikuti langkah-langkah berikut:

1. Install Capacitor CLI sebagai dependency pengembangan dan siapkan dalam proyek Anda. Terima nilai default untuk nama dan bundle ID selama setup.

2. Install paket core dan paket-paket yang relevan untuk platform iOS dan Android.

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

Anda sekarang akan melihat folder **iOS** dan **android** baru di proyek Vue Anda.

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

## Membangun dan Men-deploy Aplikasi Native

Untuk mengembangkan aplikasi iOS, Anda memerlukan Xcode terinstal, dan untuk aplikasi Android, Anda memerlukan Android Studio terinstal. Selain itu, Anda perlu mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android untuk mendistribusikan aplikasi Anda di app store.

Gunakan Capacitor CLI untuk membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Deploy aplikasi Anda ke perangkat yang terhubung menggunakan Android Studio atau Xcode.

## Live Reload Capacitor

Aktifkan live reload di perangkat mobile Anda dengan membuat aplikasi Capacitor memuat konten dari URL tertentu di jaringan Anda.

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

Install plugin Capacitor, seperti plugin Share, dan gunakan dalam aplikasi Vue Anda:

```shell
npm i @capacitor/share
```

Import paket dan panggil fungsi `share()` dalam aplikasi Anda:

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

Setelah menginstal plugin baru, jalankan perintah `sync` dan deploy ulang aplikasi ke perangkat Anda:

```
npx cap sync
```

## Menambahkan Konsta UI

Untuk menggunakan Konsta UI di aplikasi Vue Anda, Anda perlu memiliki [tailwind sudah terinstal](https://tailwindcss.com/docs/guides/vite/#vue) dan menginstal paket:
Untuk menggunakan Konsta UI di aplikasi Vue Anda, install paket dan modifikasi file `tailwind.config.js` Anda:

```shell
npm i konsta
```

Bungkus aplikasi Anda dengan komponen `App` di file `pages/_app.vue`, dan gunakan komponen Vue Konsta UI di halaman Vue Anda.

## Kesimpulan

Capacitor adalah opsi yang bagus untuk membangun aplikasi native berdasarkan proyek web yang ada. Dengan penambahan Capgo, bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug.

Pelajari bagaimana Capgo dapat membantu Anda membangun aplikasi lebih baik dengan lebih cepat, [daftar akun gratis](/register/) hari ini.
