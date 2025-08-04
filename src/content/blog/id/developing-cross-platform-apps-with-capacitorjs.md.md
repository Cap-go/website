---
slug: développement-applications-multiplateformes-avec-capacitorjs
title: >-
  Mengembangkan Aplikasi Multiplatform dengan CapacitorJS: Panduan Langkah demi
  Langkah
description: >-
  Pelajari cara membuat aplikasi multiplatform menggunakan CapacitorJS dengan
  basis kode JavaScript tunggal untuk Android, iOS dan web (PWA).
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Pengembangan Aplikasi Cross-Platform
keywords: >-
  Capacitor, cross-platform, PWA, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Tuto
published: true
locale: id
next_blog: ''
---
Dalam dunia pengembangan aplikasi mobile yang terus berkembang, munculnya Progressive Web Applications (PWAs) telah membuka jalan bagi runtime lintas platform baru. Runtime ini memungkinkan aplikasi berbasis web hadir di app store tanpa hanya mengandalkan kode native. Salah satu teknologi yang memfasilitasi hal ini adalah [**CapacitorJS**](https://capacitorjs.com/), yang memungkinkan pengembang untuk mendeploy website sederhana sebagai aplikasi di Android, iOS, dan web menggunakan satu basis kode JavaScript. Pendekatan ini secara signifikan mengurangi biaya pengembangan dan meningkatkan efisiensi pengkodean.

Panduan ini akan fokus pada pembuatan aplikasi menggunakan JavaScript murni tanpa framework tambahan. Meskipun sulit menemukan sumber daya untuk pengembangan aplikasi JavaScript murni di tahun 2021, kami di sini untuk memberikan tutorial komprehensif tentang membangun aplikasi Anda dan menggunakan plugin native dengan CapacitorJS.

## ‣ Prasyarat

Sebelum kita mulai, pastikan Anda telah menginstal alat-alat berikut:

- [**Node.js**](https://nodejs.org/en/) **(v14.16.1)** atau lebih tinggi
- **NPM (v7.6.2)** atau lebih tinggi
- [**Android Studio**](https://developer.android.com/studio/) untuk pengembangan aplikasi Android
- [**Xcode**](https://apps.apple.com/de/app/xcode/id497799835/?mt=12) untuk pengembangan aplikasi iOS (khusus macOS)

> **Catatan**: Pengembangan aplikasi iOS hanya mungkin dilakukan pada perangkat macOS.

## ‣ Menyiapkan Proyek Capacitor

Untuk membuat aplikasi Capacitor, navigasikan ke folder yang Anda inginkan dan jalankan perintah berikut di terminal Anda:

```
npm init @capacitor/app
```

Ikuti petunjuk untuk menginstal paket dan menyiapkan proyek Anda. Dengan Capacitor v3, direktori proyek Anda seharusnya terlihat seperti ini:

```
www/
  css/
    style.css
  js/
    capacitor-welcome.js
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
```

Dengan pengaturan awal selesai, Anda siap untuk melanjutkan.

## ‣ Restrukturisasi Proyek

Kita akan menggunakan Vite untuk membundel file JavaScript kita, jadi mari restrukturisasi proyek kita:

- **Buat** folder baru `src` di direktori utama.
- **Buat** file script baru `index.js` di `src/`.
- **Buat** file konfigurasi Vite `vite.config.js` di direktori utama.
- **Hapus** file `capacitor-welcome.js` dari `www/js/`.

Struktur folder baru Anda seharusnya seperti:

```
src/
  index.js
www/
  css/
    style.css
  js/
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
vite.config.js
```

## ‣ Beradaptasi dengan JavaScript Murni

Mari modifikasi beberapa file untuk bekerja dengan JavaScript murni:

## www/index.html

1. Hapus impor script untuk [**Ionic PWA Elements**](https://capacitorjs.com/docs/web/pwa-elements/) jika Anda tidak merilis aplikasi sebagai PWA:

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2. Hapus elemen HTML `<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">` dari body.

3. Perbarui impor script dari `capacitor.js` ke `js/main.js`. Ini akan menjadi file JavaScript yang dibundel.

4. Hapus impor `js/capacitor-welcome.js`. `index.html` Anda sekarang siap.

## vite.config.js

Untuk membundel modul Node.js dengan [**Vite**](https://vitejs.dev/), kita memerlukan file konfigurasi yang menentukan tujuan output untuk script yang dibundel. Konfigurasi berikut akan mengambil file `src/index.js` dan membundelnya untuk produksi sebagai `www/js/main.js`:

```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'www'),
    rollupOptions: {
      input: './src/index.js',
      output: {
        format: 'es',
        file: path.resolve(__dirname, 'www/js/main.js')
      }
    }
  }
});
```

## capacitor.config.json

Di file `capacitor.config.json`, temukan properti `"bundledWebRuntime": true` dan ubah menjadi `false`. Penyesuaian ini memastikan bahwa Capacitor tidak membundel file, sehingga memungkinkan kita menggunakan Vite untuk tujuan tersebut.

Dengan perubahan ini, pengaturan dasar aplikasi Capacitor Anda selesai, dan Anda siap untuk mulai mengembangkan aplikasi Anda dengan JavaScript murni.

## ‣ Mengembangkan Aplikasi Anda

Sekarang fondasi telah dibangun, Anda dapat mulai menulis logika aplikasi Anda di file `src/index.js`. Di sini, Anda dapat mengimpor modul Node.js yang diperlukan, mendefinisikan fungsionalitas aplikasi Anda, dan berinteraksi dengan plugin native Capacitor.

Ingat untuk menjalankan perintah build Vite untuk membundel file JavaScript Anda setiap kali Anda membuat perubahan:

```bash
vite build
```

Perintah ini akan menghasilkan file `main.js` di direktori `www/js` Anda, yang akan direferensikan oleh file `index.html` Anda.

## ‣ Pengujian dan Debugging

Capacitor menyediakan cara yang mudah untuk menguji aplikasi Anda di berbagai platform. Gunakan perintah berikut untuk membuka aplikasi Anda di lingkungan pengembangan platform masing-masing:

Untuk Android:
```bash
npx cap add android
npx cap open android
```

Untuk iOS (khusus macOS):
```bash
npx cap add ios
npx cap open ios
```

Untuk Web/PWA:
```bash
npx cap serve
```

Perintah-perintah ini akan memungkinkan Anda menjalankan aplikasi Anda di Android Studio, Xcode, atau browser web Anda, di mana Anda dapat menguji dan debug sesuai kebutuhan.

## ‣ Kesimpulan

Mengembangkan aplikasi lintas platform dengan CapacitorJS menggunakan JavaScript murni adalah cara yang hemat biaya dan efisien untuk membuat aplikasi untuk berbagai platform dengan satu basis kode. Dengan mengikuti panduan ini, Anda telah menyiapkan proyek Anda, merestrukturisasinya untuk Vite, dan mempersiapkan aplikasi Anda untuk pengembangan. Dengan fondasi ini, Anda siap untuk membangun aplikasi yang kuat dan serbaguna.

Ingat untuk menguji secara menyeluruh di semua platform dan manfaatkan plugin native Capacitor untuk meningkatkan fungsionalitas aplikasi Anda. Selamat mengoding!
