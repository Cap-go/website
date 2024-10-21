---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: Mengembangkan Aplikasi Seluler dengan SvelteKit dan Capacitor
description: >-
  Pelajari cara membuat aplikasi seluler dengan SvelteKit dan Capacitor serta
  meningkatkan antarmuka pengguna asli dengan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: Ilustrasi SvelteKit dan Capgo
tag: Tutorial
published: true
locale: id
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
---

Dalam tutorial ini, kita akan memulai dengan aplikasi [SvelteKit](https://kit.svelte.dev/) baru dan beralih ke pengembangan seluler asli menggunakan Capacitor. Secara opsional, Anda juga dapat mengintegrasikan [Konsta UI](https://konsta.ui.com/) untuk antarmuka pengguna seluler Tailwind CSS yang ditingkatkan.

Capacitor memungkinkan Anda dengan mudah mengubah aplikasi web SvelteKit Anda menjadi aplikasi seluler asli tanpa perlu modifikasi signifikan atau mempelajari keterampilan baru seperti React Native.

Ikuti panduan langkah demi langkah ini untuk mengubah aplikasi SvelteKit Anda menjadi aplikasi seluler menggunakan Capacitor dan, jika diinginkan, tingkatkan antarmuka pengguna seluler Anda dengan Konsta UI.

## Tentang Capacitor

CapacitorJS adalah terobosan besar! Dapat dengan mudah diintegrasikan ke proyek web apa pun, membungkus aplikasi Anda dalam webview asli dan menghasilkan proyek Xcode dan Android Studio asli untuk Anda. Plugin-nya memberikan akses ke fitur perangkat asli seperti kamera melalui jembatan JavaScript.

Capacitor memungkinkan Anda membuat aplikasi seluler asli yang fantastis tanpa persiapan rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien membuatnya mudah diintegrasikan ke dalam proyek Anda. Anda akan takjub betapa mudahnya mencapai aplikasi asli yang sepenuhnya fungsional dengan Capacitor!

## Menyiapkan Aplikasi SvelteKit Anda

Untuk membuat aplikasi SvelteKit baru, jalankan perintah berikut:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Setelah menjalankan perintah `build`, Anda seharusnya melihat folder `dist` baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, tetapi untuk saat ini, kita perlu mengaturnya dengan benar.

## Menambahkan Capacitor ke Aplikasi SvelteKit Anda

Untuk mengemas aplikasi web apa pun ke dalam kontainer seluler asli, kita perlu mengikuti beberapa langkah awal. Setelah itu, sesederhana menjalankan satu perintah `sync`.

Pertama, instal [Capacitor CLI](https://capacitorjs.com/docs/cli/) sebagai dependensi pengembangan dan atur dalam proyek Anda. Selama pengaturan, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan ID bundel.

Selanjutnya, instal paket inti dan paket yang relevan untuk platform iOS dan Android.

Terakhir, tambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek Anda:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Pada titik ini, Anda seharusnya melihat folder **ios** dan **android** baru di proyek SvelteKit Anda.

**Ini adalah proyek asli yang nyata!**

Untuk mengakses proyek Android nanti, Anda perlu menginstal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

Selain itu, Anda seharusnya menemukan file **capacitor.config.ts** di proyek Anda, yang berisi beberapa pengaturan dasar Capacitor yang digunakan selama sinkronisasi. Satu-satunya hal yang perlu Anda perhatikan adalah **webDir**, yang harus menunjuk ke hasil perintah build Anda. Saat ini, itu salah.

Untuk memperbaikinya, buka file **capacitor.config.ts** dan perbarui **webDir**:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Sekarang setelah kita memperbarui pengaturan Capacitor, mari kita ubah proyek Sveltekit kita menjadi aplikasi statis dengan mengunduh paket adaptor statis yang tepat:

```shell
npm i -D @sveltejs/adapter-static
```

Setelah paket diinstal, kita perlu mengubah file _svelte.config.js_ dari adaptor otomatis menjadi statis:

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

Dengan _svelte.config.js_ yang diperbarui, kita perlu menambahkan opsi _prerender_ dengan membuat halaman _+layout.js_ ke _src/routes_ dan hanya menambahkan ekspor berikut ke _+layout.js_:

```ts
export const prerender = true
```

Setelah menambahkan dan memperbarui halaman _+layout.js_, kita perlu menambahkan platform seluler kita, membangun ulang proyek kita untuk membuat folder _build_.

Anda dapat melakukannya dengan menjalankan perintah berikut:

```shell
npm run build
npx cap sync
```

Perintah pertama `npm run build` akan membangun proyek SvelteKit Anda dan menyalin build statis, sementara perintah kedua `npx cap sync` akan menyinkronkan semua kode web ke tempat yang tepat dari platform asli sehingga dapat ditampilkan dalam aplikasi.

Selain itu, perintah sync mungkin memperbarui platform asli dan menginstal plugin, jadi ketika Anda menginstal [plugin Capacitor](https://capacitorjs.com/docs/plugins/) baru, saatnya untuk menjalankan `npx cap sync` lagi.Tanpa sadar, Anda sekarang telah menyelesaikan prosesnya, jadi mari kita lihat aplikasinya di perangkat!

## Membangun dan Menyebarkan Aplikasi Native

Untuk mengembangkan aplikasi iOS, Anda perlu memiliki **Xcode** terinstal, dan untuk aplikasi Android, Anda perlu memiliki **Android Studio** terinstal. Selain itu, jika Anda berencana mendistribusikan aplikasi Anda di app store, Anda perlu mendaftar di Apple Developer Program untuk iOS dan Google Play Console untuk Android.

Jika Anda baru mengenal pengembangan mobile native, Anda dapat menggunakan Capacitor CLI untuk dengan mudah membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah Anda menyiapkan proyek native Anda, menyebarkan aplikasi Anda ke perangkat yang terhubung sangatlah mudah. Di Android Studio, Anda hanya perlu menunggu semuanya siap, dan Anda dapat menyebarkan aplikasi Anda ke perangkat yang terhubung tanpa mengubah pengaturan apa pun. Berikut contohnya:

![android-studio-run](/android-studio-run.webp)

Di Xcode, Anda perlu menyiapkan akun penandatanganan Anda untuk menyebarkan aplikasi Anda ke perangkat nyata alih-alih hanya simulator. Jika Anda belum pernah melakukan ini sebelumnya, Xcode akan memandu Anda melalui prosesnya (tapi sekali lagi, Anda perlu terdaftar dalam Developer Program). Setelah itu, Anda dapat langsung menekan play untuk menjalankan aplikasi di perangkat Anda yang terhubung, yang dapat Anda pilih di bagian atas. Berikut contohnya:

![xcode-run](/xcode-run.webp)

Selamat! Anda telah berhasil menyebarkan aplikasi web SvelteKit Anda ke perangkat mobile. Berikut contohnya:

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

Tapi tunggu, ada juga cara yang lebih cepat untuk melakukan ini selama pengembangan.

## Capacitor Live Reload

Sekarang, Anda mungkin sudah terbiasa dengan hot reload di semua framework modern, dan kabar baiknya adalah Anda dapat memiliki fungsionalitas yang sama **pada perangkat mobile** dengan usaha minimal!

Aktifkan akses ke aplikasi yang dihosting secara lokal dengan live reload **di jaringan Anda** dengan membuat aplikasi Capacitor memuat konten dari URL tertentu.

Langkah pertama adalah mencari tahu alamat IP lokal Anda. Jika Anda menggunakan Mac, Anda dapat mengetahui ini dengan menjalankan perintah berikut di terminal:

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
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Pastikan untuk menggunakan **IP dan port yang benar**, seperti yang ditunjukkan dalam contoh di atas.

Sekarang, kita dapat menerapkan perubahan ini dengan menyalinnya ke proyek native kita:

```shell
npx cap copy
```

Perintah `copy` mirip dengan `sync`, tetapi hanya akan **menyalin perubahan yang dibuat pada folder web** dan konfigurasi, tanpa memperbarui proyek native.

Anda sekarang dapat menyebarkan aplikasi Anda sekali lagi melalui Android Studio atau Xcode. Setelah itu, jika Anda mengubah sesuatu di aplikasi Svelte Anda, **aplikasi akan secara otomatis memuat ulang** dan menampilkan perubahan!

**Perlu diingat** bahwa jika Anda menginstal plugin baru seperti kamera, masih diperlukan pembangunan ulang proyek native Anda. Ini karena file native diubah, dan tidak dapat dilakukan secara langsung.

Perhatikan bahwa Anda harus menggunakan IP dan port yang benar dalam konfigurasi Anda. Blok kode di atas menunjukkan port default SvelteKit untuk tujuan demonstrasi.

## Menggunakan Plugin Capacitor

Mari kita lihat bagaimana menggunakan plugin Capacitor dalam aksi, yang telah kita sebutkan beberapa kali sebelumnya. Untuk melakukan ini, kita dapat menginstal plugin sederhana dengan menjalankan:

```shell
npm i @capacitor/share
```

Tidak ada yang istimewa tentang [plugin Share](https://capacitorjs.com/docs/apis/share/), tetapi ini memunculkan dialog berbagi native! Untuk ini, sekarang kita hanya perlu mengimpor paket dan memanggil fungsi `share()` dari aplikasi kita, jadi mari ubah **src/routes/index.svelte** menjadi seperti ini:

```html
<script>
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

<h1>Welcome to SvelteKit and Capacitor!</h1>
<button on:click={share}>Share now!</button>
```

Seperti disebutkan sebelumnya, ketika menginstal plugin baru, kita perlu melakukan operasi sinkronisasi dan kemudian menyebarkan kembali aplikasi ke perangkat kita. Untuk melakukan ini, jalankan perintah berikut:

```
npx cap sync
```

Setelah menekan tombol, Anda dapat menyaksikan dialog berbagi native yang indah dalam aksi!

## Menambahkan Konsta UI

Untuk menggunakan Konsta UI di aplikasi Nuxt 3 Anda, Anda perlu memiliki [tailwind sudah terinstal](https://tailwindcsscom/docs/guides/sveltekit/) dan untuk menginstal paketnya:

```shell
npm i konsta
```

Selain itu, Anda perlu memodifikasi file `tailwindconfigjs` Anda:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/routes/**/*.{svelte}',
    './src/components/**/*.{svelte}',
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

`konstaConfig` akan memperluas konfigurasi Tailwind CSS default (atau konfigurasi kustom Anda) dengan beberapa varian tambahan dan utilitas pembantu yang diperlukan untuk Konsta UI

Sekarang kita perlu menyiapkan komponen [App](https://konstauicom/vue/app/) utama agar kita dapat mengatur beberapa parameter global (seperti `theme`)

Kita perlu membungkus seluruh aplikasi dengan `App` di `src/routes/+layoutsvelte`:

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### Contoh Halaman

Sekarang setelah semuanya diatur, kita dapat menggunakan komponen Konsta UI Svelte di halaman SvelteKit kita

Misalnya, mari buka `src/routes/indexsvelte` dan ubah menjadi sebagai berikut:

```html
<script>
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    Link,
    BlockTitle,
  } from 'konsta/svelte';
</script>

<Page>
  <Navbar title="My App" />

  <Block strong>
    <p>
      Here is your SvelteKit & Konsta UI app. Let's see what we have here.
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
```

Jika live reload tidak sinkron setelah menginstal semua komponen yang diperlukan, coba restart semuanya. Setelah Anda melakukan itu, Anda seharusnya melihat aplikasi seluler dengan tampilan yang agak asli, yang dibangun dengan SvelteKit dan Capacitor!

Anda seharusnya melihat halaman berikut sebagai hasilnya:

<script>
  </script>
<h1>

## Kesimpulan

Capacitor adalah pilihan yang sangat baik untuk membangun aplikasi native berdasarkan proyek web yang sudah ada, menawarkan cara sederhana untuk berbagi kode dan mempertahankan UI yang konsisten

Dan dengan penambahan [Capgo](https://capgoapp/), bahkan lebih mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur terbaru dan perbaikan bug

Jika Anda ingin mempelajari cara menambahkan Capgo ke aplikasi SvelteKit Anda, lihat artikel berikutnya:

Pelajari bagaimana Capgo dapat membantu Anda membangun aplikasi yang lebih baik dengan lebih cepat, [daftar untuk akun gratis](/register/) hari ini