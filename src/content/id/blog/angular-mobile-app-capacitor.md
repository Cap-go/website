---
slug: angular-mobile-app-capacitor
title: Mengembangkan Aplikasi Mobile dengan Angular dan Capacitor
description: >-
  Temukan cara membuat aplikasi mobile dengan Angular dan Capacitor serta
  meningkatkan antarmuka pengguna native dengan Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Ilustrasi Angular dan Capacitor
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Dalam tutorial ini, kita akan memulai dengan aplikasi [Angular](https://angulario/) baru dan beralih ke ranah aplikasi seluler native menggunakan Capacitor. Secara opsional, Anda juga dapat menambahkan [Konsta UI](https://konstaui.com/) untuk UI seluler yang lebih baik dengan Tailwind CSS.

Capacitor memungkinkan Anda untuk dengan mudah mengubah aplikasi web Angular Anda menjadi aplikasi seluler native tanpa memerlukan modifikasi yang signifikan atau mempelajari keterampilan baru seperti React Native.

Dengan hanya beberapa langkah sederhana, sebagian besar aplikasi Angular dapat diubah menjadi aplikasi seluler.

Tutorial ini akan memandu Anda melalui prosesnya, dimulai dengan aplikasi Angular baru dan kemudian menggabungkan Capacitor untuk beralih ke ranah aplikasi seluler native. Selain itu, Anda juga dapat menggunakan [Konsta UI](https://konstaui.com/) secara opsional untuk meningkatkan UI seluler Anda dengan Tailwind CSS.

## Tentang Capacitor

Capacitor adalah terobosan besar! Anda dapat dengan mudah menggabungkannya ke dalam proyek web apa pun, dan ini akan membungkus aplikasi Anda ke dalam webview native, menghasilkan proyek Xcode dan Android Studio native untuk Anda. Selain itu, plugin-nya memberikan akses ke fitur perangkat native seperti kamera melalui jembatan JS.

Dengan Capacitor, Anda mendapatkan aplikasi seluler native yang fantastis tanpa pengaturan rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien membuatnya sangat mudah diintegrasikan ke dalam proyek Anda. Percayalah, Anda akan takjub betapa mudahnya mencapai aplikasi native yang sepenuhnya fungsional dengan Capacitor!

## Menyiapkan Aplikasi Angular Anda

Untuk membuat aplikasi Angular baru, jalankan perintah berikut:

```shell
ng new my-app
cd my-app
```

Pilih "Angular" ketika diminta untuk versi Angular.

Untuk membuat aplikasi seluler native, kita memerlukan **ekspor** dari proyek kita. Oleh karena itu, mari kita sertakan skrip sederhana dalam **package.json** kita yang dapat digunakan untuk membangun dan menyalin proyek Angular:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Setelah menjalankan perintah `build`, Anda seharusnya dapat melihat folder `dist` baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, tetapi untuk saat ini, kita harus mengaturnya dengan benar.

## Menambahkan Capacitor ke Aplikasi Angular Anda

Untuk mengemas aplikasi web apa pun menjadi kontainer seluler native, kita harus mengikuti beberapa langkah awal, tetapi setelah itu semudah menjalankan satu perintah `sync`.

Pertama, kita dapat menginstal [Capacitor CLI](https://capacitorjs.com/docs/cli/) sebagai dependensi pengembangan, dan kemudian mengaturnya dalam proyek kita. Selama pengaturan, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan ID bundle.

Selanjutnya, kita perlu menginstal paket inti dan paket yang relevan untuk platform iOS dan Android.

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

**Itu adalah proyek native yang sesungguhnya!**

Untuk mengakses proyek Android nanti, Anda harus menginstal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

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
npm run build
npx cap sync
```

Perintah pertama `npm run build` hanya akan membangun proyek Angular Anda dan menyalin build statis, sedangkan perintah kedua `npx cap sync` akan menyinkronkan semua kode web ke tempat yang tepat dari platform native sehingga dapat ditampilkan dalam aplikasi.

Selain itu, perintah sync mungkin memperbarui platform native dan menginstal plugin, jadi ketika Anda menginstal [plugin Capacitor](https://capacitorjs.com/docs/plugins/) baru, saatnya untuk menjalankan `npx cap sync` lagi.Tanpa disadari, Anda sebenarnya sudah selesai, jadi mari kita lihat aplikasi ini di perangkat!

## Membangun dan Menerapkan aplikasi native

Untuk mengembangkan aplikasi iOS, Anda perlu memiliki **Xcode** terinstal, dan untuk aplikasi Android, Anda perlu memiliki **Android Studio** terinstal. Selain itu, jika Anda berencana mendistribusikan aplikasi Anda di app store, Anda harus mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Jika Anda baru dalam pengembangan mobile native, Anda dapat menggunakan Capacitor CLI untuk dengan mudah membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah Anda menyiapkan proyek native Anda, menerapkan aplikasi Anda ke perangkat yang terhubung menjadi mudah. Di Android Studio, Anda hanya perlu menunggu semuanya siap, dan Anda dapat menerapkan aplikasi Anda ke perangkat yang terhubung tanpa mengubah pengaturan apa pun. Berikut contohnya:

![android-studio-run](/android-studio-run.webp)

Di Xcode, Anda perlu menyiapkan akun penandatanganan Anda untuk menerapkan aplikasi Anda ke perangkat nyata, bukan hanya simulator. Jika Anda belum pernah melakukan ini sebelumnya, Xcode akan memandu Anda melalui prosesnya (tapi sekali lagi, Anda harus terdaftar di Developer Program). Selanjutnya, Anda dapat langsung menekan play untuk menjalankan aplikasi di perangkat yang terhubung, yang dapat Anda pilih di bagian atas. Berikut contohnya:

![xcode-run](/xcode-run.webp)

Selamat! Anda telah berhasil menerapkan aplikasi web Angular Anda ke perangkat mobile. Berikut contohnya:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Tapi tunggu, ada cara yang lebih cepat untuk melakukan ini selama pengembangan.

## Capacitor Live Reload

Sekarang, Anda mungkin sudah terbiasa dengan hot reload pada semua framework modern, dan kabar baiknya adalah Anda dapat memiliki fungsionalitas yang sama **pada perangkat mobile** dengan usaha minimal!

Aktifkan akses ke aplikasi yang di-host secara lokal dengan live reload **di jaringan Anda** dengan membuat aplikasi Capacitor memuat konten dari URL tertentu.

Langkah pertama adalah mengetahui alamat IP lokal Anda. Jika Anda menggunakan Mac, Anda dapat mengetahuinya dengan menjalankan perintah berikut di terminal:

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

Perintah `copy` mirip dengan `sync`, tetapi hanya akan **menyalin perubahan yang dibuat pada folder web** dan konfigurasi, tanpa memperbarui proyek native.

Anda sekarang dapat menerapkan aplikasi Anda sekali lagi melalui Android Studio atau Xcode. Setelah itu, jika Anda mengubah sesuatu di aplikasi Angular Anda, **aplikasi akan secara otomatis memuat ulang** dan menampilkan perubahan!

**Perlu diingat** bahwa jika Anda menginstal plugin baru seperti kamera, masih diperlukan pembangunan ulang proyek native Anda. Ini karena file native diubah, dan tidak dapat dilakukan secara langsung.

Perhatikan bahwa Anda harus menggunakan IP dan port yang benar dalam konfigurasi Anda. Blok kode di atas menunjukkan port Angular default untuk tujuan demonstrasi.

## Menggunakan Plugin Capacitor

Mari kita lihat bagaimana menggunakan plugin Capacitor dalam aksi, yang telah kita sebutkan beberapa kali sebelumnya. Untuk melakukan ini, kita dapat menginstal plugin yang cukup sederhana dengan menjalankan:

```shell
npm i @capacitor/share
```

Tidak ada yang istimewa tentang [plugin Share](https://capacitorjs.com/docs/apis/share/), tetapi bagaimanapun juga itu memunculkan dialog berbagi native! Untuk ini sekarang kita hanya perlu mengimpor paket dan memanggil fungsi `share()` yang sesuai dari aplikasi kita, jadi mari ubah **src/app/app.component.ts** menjadi seperti ini:

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

Seperti disebutkan sebelumnya, saat menginstal plugin baru, kita perlu melakukan operasi sync dan kemudian menerapkan ulang aplikasi ke perangkat kita.Untuk melakukan ini, jalankan perintah berikut:

```
npx cap sync
```

Setelah menekan tombol, Anda dapat menyaksikan dialog berbagi native yang indah dalam aksi!

## Menambahkan Konsta UI

Untuk menggunakan Konsta UI di aplikasi Nuxt 3 Anda, Anda perlu sudah menginstal [tailwind](https://tailwindcss.com/docs/guides/angular/) dan menginstal paket:

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

`konstaConfig` akan memperluas konfigurasi Tailwind CSS default (atau kustom Anda) dengan beberapa varian tambahan dan utilitas pembantu yang diperlukan untuk Konsta UI

Sekarang kita perlu menyiapkan komponen [App](https://konsta-ui.com/vue/app/) utama sehingga kita dapat mengatur beberapa parameter global (seperti `theme`)

Kita perlu membungkus seluruh aplikasi dengan `App` di `src/app/app.component.html`:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Contoh Halaman

Sekarang setelah semuanya diatur, kita dapat menggunakan komponen Vue Konsta UI di halaman Angular kita

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

Jika live reload tidak sinkron setelah menginstal semua komponen yang diperlukan, coba restart semuanya. Setelah Anda melakukan itu, Anda seharusnya melihat aplikasi seluler dengan tampilan yang agak native, dibangun dengan Angular dan Capacitor!

Anda seharusnya melihat halaman berikut sebagai hasilnya:

<app>
  <h1>
</h1>

## Kesimpulan

Capacitor adalah pilihan yang sangat baik untuk membangun aplikasi native berdasarkan proyek web yang sudah ada, menawarkan cara sederhana untuk berbagi kode dan mempertahankan UI yang konsisten

Dan dengan penambahan [Capgo](https://capgo.app/), bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug

Jika Anda ingin mempelajari cara menambahkan Capgo ke aplikasi Angular Anda, lihat artikel berikutnya: