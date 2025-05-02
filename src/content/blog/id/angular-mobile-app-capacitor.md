---
slug: aplikasi-mobile-angular-capacitor
title: Membangun Aplikasi Mobile dengan Angular dan Capacitor
description: >-
  Pelajari cara membuat aplikasi mobile dengan Angular, Capacitor, dan
  tingkatkan UI native dengan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Angular dan ilustrasi Capacitor
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: angular-mobile-app-capacitor
---
Dalam tutorial ini, kita akan memulai dengan aplikasi [Angular](https://angular.io/) baru dan beralih ke ranah aplikasi mobile native menggunakan Capacitor. Secara opsional, Anda juga dapat menambahkan [Konsta UI](https://konstaui.com/) untuk UI mobile yang lebih baik dengan Tailwind CSS.

Capacitor memungkinkan Anda untuk dengan mudah mengkonversi aplikasi web Angular Anda menjadi aplikasi mobile native tanpa memerlukan modifikasi signifikan atau mempelajari keterampilan baru seperti React Native.

Dengan beberapa langkah sederhana, sebagian besar aplikasi Angular dapat diubah menjadi aplikasi mobile.

Tutorial ini akan memandu Anda melalui prosesnya, dimulai dengan aplikasi Angular baru dan kemudian menggabungkan Capacitor untuk beralih ke ranah aplikasi mobile native. Selain itu, Anda dapat secara opsional menggunakan [Konsta UI](https://konstaui.com/) untuk meningkatkan UI mobile Anda dengan Tailwind CSS.

## Tentang Capacitor

CapacitorJS adalah game-changer! Anda dapat dengan mudah menggabungkannya ke dalam proyek web apapun, dan ia akan membungkus aplikasi Anda ke dalam webview native, menghasilkan proyek Xcode dan Android Studio native untuk Anda. Selain itu, plugin-nya menyediakan akses ke fitur perangkat native seperti kamera melalui JS bridge.

Dengan Capacitor, Anda mendapatkan aplikasi mobile native yang fantastis tanpa setup yang rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien membuatnya sangat mudah diintegrasikan ke dalam proyek Anda. Percayalah, Anda akan takjub betapa mudahnya mencapai aplikasi native yang berfungsi penuh dengan Capacitor!

## Menyiapkan Aplikasi Angular Anda

Untuk membuat aplikasi Angular baru, jalankan perintah berikut:

```shell
ng new my-app
cd my-app
```

Pilih "Angular" ketika diminta untuk versi Angular.

Untuk membuat aplikasi mobile native, kita memerlukan **export** dari proyek kita. Oleh karena itu, mari tambahkan script sederhana di **package.json** yang dapat digunakan untuk membangun dan menyalin proyek Angular:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Setelah menjalankan perintah `build`, Anda seharusnya dapat melihat folder `dist` baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, tetapi untuk sekarang, kita harus mengaturnya dengan benar.

## Menambahkan Capacitor ke Aplikasi Angular Anda

Untuk mengemas aplikasi web apapun ke dalam container mobile native, kita harus mengikuti beberapa langkah awal, tetapi setelah itu semudah menjalankan satu perintah `sync`.

Pertama, kita dapat menginstal [Capacitor CLI](https://capacitorjs.com/docs/cli/) sebagai dependensi pengembangan, dan kemudian mengaturnya dalam proyek kita. Selama setup, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan bundle ID.

Selanjutnya, kita perlu menginstal paket core dan paket-paket yang relevan untuk platform iOS dan Android.

Akhirnya, kita dapat menambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek kita:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Angular project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Pada titik ini, Anda seharusnya dapat melihat folder **ios** dan **android** baru di proyek Angular Anda.

**Itu adalah proyek native yang sebenarnya!**

Untuk mengakses proyek Android nanti, Anda harus menginstal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

Selain itu, Anda seharusnya menemukan file **capacitor.config.ts** di proyek Anda, yang berisi beberapa pengaturan dasar Capacitor yang digunakan selama sync. Satu-satunya hal yang perlu Anda perhatikan adalah **webDir**, yang harus menunjuk ke hasil dari perintah build Anda. Saat ini, itu tidak akurat.

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
npm run build
npx cap sync
```

Perintah pertama `npm run build` akan membangun proyek Angular Anda dan menyalin build statis, sementara perintah kedua `npx cap sync` akan mensinkronkan semua kode web ke tempat yang tepat dari platform native sehingga dapat ditampilkan dalam aplikasi.

Selain itu, perintah sync mungkin memperbarui platform native dan menginstal plugin, jadi ketika Anda menginstal [plugin Capacitor](https://capacitorjs.com/docs/plugins/) baru, saatnya menjalankan `npx cap sync` lagi.

Tanpa disadari, Anda sekarang sebenarnya sudah selesai, jadi mari kita lihat aplikasinya di perangkat!

## Build dan Deploy aplikasi native

Untuk mengembangkan aplikasi iOS, Anda perlu memiliki **Xcode** terinstal, dan untuk aplikasi Android, Anda perlu memiliki **Android Studio** terinstal. Selain itu, jika Anda berencana untuk mendistribusikan aplikasi Anda di app store, Anda harus mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Jika Anda baru dalam pengembangan mobile native, Anda dapat menggunakan CLI Capacitor untuk membuka kedua proyek native dengan mudah:

```shell
npx cap open ios
npx cap open android
```

Setelah Anda mengatur proyek native Anda, mendeploy aplikasi Anda ke perangkat yang terhubung sangat mudah. Di Android Studio, Anda hanya perlu menunggu semuanya siap, dan Anda dapat mendeploy aplikasi Anda ke perangkat yang terhubung tanpa mengubah pengaturan apapun. Berikut contohnya:

![android-studio-run](/android-studio-run.webp)

Di Xcode, Anda perlu mengatur akun signing Anda untuk mendeploy aplikasi Anda ke perangkat nyata alih-alih hanya simulator. Jika Anda belum pernah melakukan ini sebelumnya, Xcode akan memandu Anda melalui prosesnya (tapi sekali lagi, Anda harus terdaftar di Developer Program). Setelah itu, Anda dapat langsung menekan play untuk menjalankan aplikasi di perangkat yang terhubung, yang dapat Anda pilih di bagian atas. Berikut contohnya:

![xcode-run](/xcode-run.webp)

Selamat! Anda telah berhasil mendeploy aplikasi web Angular Anda ke perangkat mobile. Berikut contohnya:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Tapi tunggu, ada cara yang lebih cepat untuk melakukan ini selama pengembangan...

## Live Reload Capacitor

Sekarang, Anda mungkin sudah terbiasa dengan hot reload dengan semua framework modern, dan kabar baiknya adalah Anda dapat memiliki fungsionalitas yang sama **di perangkat mobile** dengan usaha minimal!

Aktifkan akses ke aplikasi yang dihost secara lokal dengan live reload **di jaringan Anda** dengan membuat aplikasi Capacitor memuat konten dari URL tertentu.

Langkah pertama adalah mengetahui alamat IP lokal Anda. Jika Anda menggunakan Mac, Anda dapat mengetahui ini dengan menjalankan perintah berikut di terminal:

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
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

Pastikan untuk menggunakan **IP dan port yang benar**, saya telah menggunakan port Angular default dalam contoh ini.

Sekarang, kita dapat menerapkan perubahan ini dengan menyalinnya ke proyek native kita:

```shell
npx cap copy
```

Perintah `copy` mirip dengan `sync`, tetapi hanya akan **menyalin perubahan yang dibuat ke folder web** dan konfigurasi, tanpa memperbarui proyek native.

Anda sekarang dapat mendeploy aplikasi Anda sekali lagi melalui Android Studio atau Xcode. Setelah itu, jika Anda mengubah sesuatu di aplikasi Angular Anda, **aplikasi akan secara otomatis reload** dan menunjukkan perubahan!

**Perlu diingat** bahwa jika Anda menginstal plugin baru seperti kamera, masih memerlukan rebuild proyek native Anda. Ini karena file native diubah, dan tidak dapat dilakukan secara langsung.

Perhatikan bahwa Anda harus menggunakan IP dan port yang benar dalam konfigurasi Anda. Code block di atas menunjukkan port Angular default untuk tujuan demonstrasi.

## Menggunakan Plugin Capacitor

Mari kita lihat bagaimana menggunakan plugin Capacitor dalam aksi, yang telah kita sebutkan beberapa kali sebelumnya. Untuk ini, kita dapat menginstal plugin yang cukup sederhana dengan menjalankan:

```shell
npm i @capacitor/share
```

Tidak ada yang istimewa tentang [Share plugin](https://capacitorjs.com/docs/apis/share/), tetapi bagaimanapun juga memunculkan dialog share native! Untuk ini sekarang kita hanya perlu mengimpor paket dan memanggil fungsi `share()` dari aplikasi kita, jadi mari ubah **src/app/app.component.ts** menjadi ini:

```typescript
import { Component } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  async share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
}
```

Seperti disebutkan sebelumnya, ketika menginstal plugin baru, kita perlu melakukan operasi sync dan kemudian mendeploy ulang aplikasi ke perangkat kita. Untuk melakukan ini, jalankan perintah berikut:

```
npx cap sync
```

Setelah menekan tombol, Anda dapat menyaksikan dialog share native yang indah dalam aksi!

## Menambahkan Konsta UI

Untuk menggunakan Konsta UI di aplikasi Nuxt 3 Anda, Anda perlu memiliki [tailwind sudah terinstal](https://tailwindcss.com/docs/guides/angular/) dan menginstal paket:

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
    './src/**/*.{html,ts}',
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

`konstaConfig` akan memperluas konfigurasi Tailwind CSS default (atau kustom Anda) dengan beberapa varian tambahan dan utilitas pembantu yang diperlukan untuk Konsta UI.

Sekarang kita perlu mengatur komponen [App](https://konstaui.com/vue/app/) utama sehingga kita dapat mengatur beberapa parameter global (seperti `theme`).

Kita perlu membungkus seluruh aplikasi dengan `App` di `src/app/app.component.html`:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Contoh Halaman

Sekarang ketika semuanya sudah diatur, kita dapat menggunakan komponen Konsta UI Vue di halaman Angular kita.

Misalnya, mari buka `src/app/app.component.html` dan ubah menjadi berikut:

```html
<app>
  <page>
    <navbar title="My App" />

    <block strong>
      <p>
        Here is your Angular & Konsta UI app. Let's see what we have here.
      </p>
    </block>
    <block-title>Navigation</block-title>
    <list>
      <list-item href="/about/" title="About" />
      <list-item href="/form/" title="Form" />
    </list>

    <block strong class="flex space-x-4">
      <button>Button 1</button>
      <button>Button 2</button>
    </block>
  </page>
</app>
```

Jika live reload tidak sinkron setelah menginstal semua komponen yang diperlukan, coba restart semuanya. Setelah Anda melakukan itu, Anda seharusnya melihat aplikasi mobile dengan tampilan yang agak native, dibangun dengan Angular dan Capacitor!

Anda seharusnya melihat halaman berikut sebagai hasilnya:

<app>
  <h1>
</h1>

## Kesimpulan

Capacitor adalah pilihan yang sangat baik untuk membangun aplikasi native berdasarkan proyek web yang sudah ada, menawarkan cara sederhana untuk berbagi kode dan mempertahankan UI yang konsisten.

Dan dengan penambahan [Capgo](https://capgo.app/), bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug.

Jika Anda ingin mempelajari cara menambahkan Capgo ke aplikasi Angular Anda, lihat artikel berikutnya:
