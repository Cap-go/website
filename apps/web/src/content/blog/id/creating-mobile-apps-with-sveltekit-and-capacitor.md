---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: Membangun Aplikasi Seluler dengan SvelteKit dan Capacitor
description: >-
  Pelajari cara membangun aplikasi seluler menggunakan SvelteKit, Capacitor, dan
  tingkatkan antarmuka asli dengan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: Ilustrasi SvelteKit dan Capgo
keywords: >-
  SvelteKit, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
---
Dalam tutorial ini, kita akan memulai dengan aplikasi [SvelteKit](https://kit.svelte.dev/) baru dan melakukan transisi ke pengembangan mobile native menggunakan Capacitor. Opsional, Anda juga dapat mengintegrasikan [Konsta UI](https://konstaui.com/) untuk meningkatkan UI mobile Tailwind CSS.

Capacitor memungkinkan Anda untuk dengan mudah mengonversi aplikasi web SvelteKit Anda menjadi aplikasi mobile native tanpa perlu modifikasi signifikan atau mempelajari keterampilan baru seperti React Native.

Ikuti panduan langkah demi langkah ini untuk mengubah aplikasi SvelteKit Anda menjadi aplikasi mobile menggunakan Capacitor dan, jika diinginkan, tingkatkan UI mobile Anda dengan Konsta UI.

## Tentang Capacitor

CapacitorJS adalah pengubah permainan! Ini dapat diintegrasikan dengan mudah ke dalam proyek web mana pun, membungkus aplikasi Anda dalam webview native dan menghasilkan proyek Xcode dan Android Studio untuk Anda. Plugin-nya memberikan akses ke fitur perangkat native seperti kamera melalui jembatan JavaScript.

Capacitor memungkinkan Anda untuk membuat aplikasi mobile native yang fantastis tanpa pengaturan rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien memudahkan untuk diintegrasikan ke dalam proyek Anda. Anda akan tercengang betapa mudahnya mencapai aplikasi native yang berfungsi penuh dengan Capacitor!

## Mempersiapkan Aplikasi SvelteKit Anda

Untuk membuat aplikasi SvelteKit baru, jalankan perintah berikut:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Setelah menjalankan perintah `build`, Anda harus melihat folder `dist` baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, tetapi untuk saat ini, kita perlu menyiapkannya dengan benar.

## Menambahkan Capacitor ke Aplikasi SvelteKit Anda

Untuk mengemas aplikasi web apa pun menjadi wadah mobile native, kita perlu mengikuti beberapa langkah awal. Setelah itu, tinggal menjalankan satu perintah `sync`.

Pertama, instal [Capacitor CLI](https://capacitorjs.com/docs/cli/) sebagai ketergantungan pengembangan dan siapkan dalam proyek Anda. Selama pengaturan, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan ID bundle.

Selanjutnya, instal paket inti dan paket relevan untuk platform iOS dan Android.

Akhirnya, tambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek Anda:

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

Saat ini, Anda harus melihat folder **ios** dan **android** baru di proyek SvelteKit Anda.

**Ini adalah proyek native yang nyata!**

Untuk mengakses proyek Android nanti, Anda perlu menginstal [Android Studio](https://developer.android.com/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developer.apple.com/xcode/).

Selain itu, Anda harus menemukan file **capacitor.config.ts** di proyek Anda, yang berisi beberapa pengaturan dasar Capacitor yang digunakan selama sinkronisasi. Satu-satunya hal yang perlu Anda perhatikan adalah **webDir**, yang harus menunjukkan hasil dari perintah build Anda. Saat ini, nilainya salah.

Untuk memperbaiki ini, buka file **capacitor.config.ts** dan perbarui **webDir**:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Sekarang setelah kita memperbarui pengaturan Capacitor, mari kita ubah proyek Sveltekit kita menjadi aplikasi statis dengan mengunduh paket adapter statis yang tepat:

```shell
npm i -D @sveltejs/adapter-static
```

Setelah paket diinstal, kita perlu mengubah file _svelte.config.js_ dari auto-adapter menjadi statis:

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

Dengan _svelte.config.js_ yang diperbarui, kita perlu menambahkan opsi _prerender_ dengan membuat halaman _+layout.js_ ke _src/routes_ dan cukup menambahkan ekspor berikut ke _+layout.js_:

```ts
export const prerender = true
```

Setelah menambahkan dan memperbarui halaman _+layout.js_, kita perlu menambahkan platform mobile kita, membangun ulang proyek kita untuk membuat folder _build_

Anda bisa melakukannya dengan menjalankan perintah berikut:

```shell
npm run build
npx cap sync
```

Perintah pertama `npm run build` akan membangun proyek SvelteKit Anda dan menyalin build statis, sedangkan perintah kedua `npx cap sync` akan menyinkronkan semua kode web ke tempat yang benar dari platform native agar dapat ditampilkan dalam aplikasi.

Selain itu, perintah sinkronisasi mungkin memperbarui platform native dan menginstal plugin, jadi ketika Anda menginstal plugin [Capacitor baru](https://capacitorjs.com/docs/plugins/), saatnya untuk menjalankan `npx cap sync` lagi.

Tanpa menyadarinya, Anda sekarang telah menyelesaikan prosesnya, jadi mari kita lihat aplikasi di perangkat!

## Membangun dan Mengdeploy Aplikasi Native

Untuk mengembangkan aplikasi iOS, Anda perlu menginstal **Xcode**, dan untuk aplikasi Android, Anda perlu menginstal **Android Studio**. Selain itu, jika Anda berencana untuk mendistribusikan aplikasi Anda di app store, Anda perlu mendaftar ke Program Pengembang Apple untuk iOS dan Google Play Console untuk Android.

Jika Anda baru dalam pengembangan mobile native, Anda dapat menggunakan Capacitor CLI untuk dengan mudah membuka kedua proyek native:

```shell
npx cap open ios
npx cap open android
```

Setelah Anda menyiapkan proyek native Anda, mengdeploy aplikasi Anda ke perangkat terhubung itu mudah. Di Android Studio, Anda hanya perlu menunggu semuanya siap, dan Anda dapat mengdeploy aplikasi Anda ke perangkat terhubung tanpa mengubah pengaturan apa pun. Berikut adalah contohnya:

![android-studio-run](/android-studio-run.webp)

Di Xcode, Anda perlu menyiapkan akun tanda tangan Anda untuk mengdeploy aplikasi Anda ke perangkat nyata alih-alih hanya simulasi. Jika Anda belum melakukannya sebelumnya, Xcode akan memandu Anda melalui prosesnya (tetapi sekali lagi, Anda perlu terdaftar di Program Pengembang). Setelah itu, Anda cukup menekan tombol putar untuk menjalankan aplikasi di perangkat terhubung Anda, yang dapat Anda pilih di bagian atas. Berikut adalah contohnya:

![xcode-run](/xcode-run.webp)

Selamat! Anda telah berhasil mengdeploy aplikasi web SvelteKit Anda ke perangkat mobile. Berikut adalah contohnya:

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

Tapi tunggu, ada juga cara yang lebih cepat untuk melakukan ini selama pengembangan...

## Capacitor Live Reload

Sekarang, Anda mungkin sudah terbiasa dengan hot reload di semua framework modern, dan kabar baiknya adalah Anda dapat memiliki fungsi yang sama **di perangkat mobile** dengan usaha minimal!

Aktifkan akses ke aplikasi yang dihosting secara lokal dengan live reload **di jaringan Anda** dengan membiarkan aplikasi Capacitor memuat konten dari URL tertentu.

Langkah pertama adalah mencari alamat IP lokal Anda. Jika Anda menggunakan Mac, Anda dapat menemukannya dengan menjalankan perintah berikut di terminal:

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

Pastikan untuk menggunakan **IP dan port yang benar**, seperti yang ditunjukkan dalam contoh di atas.

Sekarang, kita dapat menerapkan perubahan ini dengan menyalinnya ke proyek native kita:

```shell
npx cap copy
```

Perintah `copy` mirip dengan `sync`, tetapi hanya akan **menyalin perubahan yang dibuat pada folder web** dan konfigurasi, tanpa memperbarui proyek native.

Anda sekarang dapat mengdeploy aplikasi Anda satu kali lagi melalui Android Studio atau Xcode. Setelah itu, jika Anda mengubah sesuatu di aplikasi Svelte Anda, **aplikasi akan otomatis dimuat ulang** dan menunjukkan perubahan!

**Perlu diingat** bahwa jika Anda menginstal plugin baru seperti kamera, itu masih memerlukan rebuild proyek native Anda. Ini karena file native berubah, dan tidak dapat dilakukan secara langsung.

Perhatikan bahwa Anda harus menggunakan IP dan port yang benar dalam konfigurasi Anda. Blok kode di atas menunjukkan port default SvelteKit untuk tujuan demonstrasi.

## Menggunakan Plugin Capacitor

Mari kita lihat bagaimana menggunakan plugin Capacitor dalam aksi, yang telah kita sebutkan beberapa kali sebelumnya. Untuk melakukan ini, kita dapat menginstal plugin sederhana dengan menjalankan:

```shell
npm i @capacitor/share
```

Tidak ada yang istimewa tentang [plugin Share](https://capacitorjs.com/docs/apis/share/), tetapi itu membuka dialog berbagi native! Untuk ini, sekarang kita hanya perlu mengimpor paket dan memanggil fungsi `share()` dari aplikasi kita, jadi mari kita ubah **src/routes/index.svelte** menjadi ini:

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

Seperti yang telah disebutkan sebelumnya, ketika menginstal plugin baru, kita perlu melakukan operasi sinkronisasi dan kemudian mengdeploy ulang aplikasi ke perangkat kita. Untuk melakukan ini, jalankan perintah berikut:

```
npx cap sync
```

Setelah menekan tombol, Anda dapat menyaksikan dialog berbagi native yang indah dalam aksi!

## Menambahkan Konsta UI

Untuk menggunakan Konsta UI di aplikasi Nuxt 3 Anda, Anda perlu memiliki [tailwind yang sudah diinstal](https://tailwindcss.com/docs/guides/sveltekit/) dan menginstal paket:

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

`konstaConfig` akan memperluas konfigurasi Tailwind CSS default (atau kustom Anda) dengan beberapa varian tambahan dan utilitas pembantu yang diperlukan untuk Konsta UI.

Sekarang kita perlu menyiapkan komponen [App](https://konstaui.com/vue/app/) utama sehingga kita dapat mengatur beberapa parameter global (seperti `theme`).

Kita perlu membungkus seluruh aplikasi dengan `App` di `src/routes/+layout.svelte`:

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### Halaman Contoh

Sekarang setelah semuanya disiapkan, kita dapat menggunakan komponen Svelte Konsta UI di halaman SvelteKit kita.

Sebagai contoh, mari kita buka `src/routes/index.svelte` dan mengubahnya menjadi berikut:

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

Jika live reload tidak sinkron setelah menginstal semua komponen yang diperlukan, coba mulai ulang semuanya. Setelah Anda melakukannya, Anda harus melihat aplikasi mobile dengan tampilan yang agak native, dibangun dengan SvelteKit dan Capacitor!

Anda harus melihat halaman berikut sebagai hasilnya:

<script>
  </script>
<h1>

## Kesimpulan

Capacitor adalah opsi yang luar biasa untuk membangun aplikasi native berdasarkan proyek web yang ada, menawarkan cara sederhana untuk berbagi kode dan mempertahankan UI yang konsisten.

Dan dengan tambahan [Capgo](https://capgo.app/), semakin mudah untuk menambahkan pembaruan langsung ke aplikasi Anda, memastikan bahwa pengguna Anda selalu memiliki akses ke fitur dan perbaikan bug terbaru.

Jika Anda ingin belajar bagaimana menambahkan Capgo ke aplikasi SvelteKit Anda, lihat artikel berikutnya:

Pelajari bagaimana Capgo dapat membantu Anda membangun aplikasi yang lebih baik dengan lebih cepat, [daftar untuk akun gratis](/register/) hari ini.
