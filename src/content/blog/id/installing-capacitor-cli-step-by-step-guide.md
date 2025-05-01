---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Instalación de Capacitor CLI: Guía Paso a Paso'
description: >-
  Pelajari cara menginstal dan mengkonfigurasi Capacitor CLI untuk mengubah
  aplikasi web menjadi aplikasi seluler native secara efisien.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-04-04T02:49:43.341Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: Pengembangan Mobile
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

**[Capacitor](https://capacitorjs.com/) CLI membantu Anda mengubah aplikasi web menjadi aplikasi iOS dan Android native dengan satu basis kode.** Berikut cara menyiapkannya dengan cepat:

-   **Prasyarat**: Instal [Node.js](https://nodejs.org/en) (v16+), npm, dan framework web (React, Vue, Angular, dll)
-   **[Instal Capacitor CLI](https://capgo.app/docs/cli/commands)**: Jalankan `npm install @capacitor/cli @capacitor/core` dan inisialisasi proyek Anda dengan `npx cap init`
-   **Siapkan Platform**: Tambahkan dukungan untuk platform iOS (`npx cap add ios`) dan Android (`npx cap add android`)
-   **Build dan Sync**: Gunakan `npm run build` dan `npx cap sync` untuk mentransfer aset web ke proyek native
-   **Update Langsung Opsional**: Gunakan tools seperti [Capgo](https://capgo.app/) untuk mengirim pembaruan secara instan tanpa penundaan app store

Capacitor CLI menyederhanakan pengembangan dan pemeliharaan aplikasi. Ikuti panduan untuk setup dan troubleshooting yang lancar.

## Buat Aplikasi Mobile dengan Cepat! React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobot.ai/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<Steps>

## Sebelum Anda Mulai

Siapkan lingkungan Anda dengan mengikuti langkah-langkah berikut:

### Set Up [Node.js](https://nodejs.org/en) dan npm

![Node.js](https://assets.seobot.ai/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

Anda memerlukan Node.js versi 16 atau lebih tinggi. Versi LTS terbaru disarankan. Untuk memeriksa setup Anda, jalankan:

```bash
node --version && npm --version
```

Jika Anda perlu memperbarui, unduh Node.js (yang menyertakan npm) dari situs web resmi.

Setelah memastikan Node.js siap, pastikan proyek web Anda memenuhi persyaratan Capacitor yang diperlukan.

### Periksa Proyek Web Anda

Proyek web Anda harus memiliki hal-hal berikut:

-   **package.json yang valid**: Pastikan sudah dikonfigurasi dengan benar
-   **Direktori build**: Ini adalah tempat aset web Anda berada (umumnya `dist` atau `www`)
-   **Entry point**: Direktori build Anda harus menyertakan file `index.html`

Berikut gambaran singkat field-field penting di `package.json`:

| Field yang Diperlukan | Contoh Nilai | Tujuan |
| --- | --- | --- |
| name | "my-app" | Mengidentifikasi proyek |
| version | "1.0.0" | Menentukan versi aplikasi |
| build directory | "dist" atau "www" | Menunjuk ke aset web |

Setelah Node.js dan proyek web Anda siap, lanjutkan ke instalasi tools khusus platform.

### Instal Software yang Diperlukan

**Untuk Pengembangan Android:**

-   Unduh dan instal versi terbaru **[Android Studio](https://developer.android.com/studio)**
-   Siapkan Android SDK minimal API level 22
-   Konfigurasi variabel environment `ANDROID_HOME`

**Untuk Pengembangan iOS (Khusus Mac):**

-   Instal **[Xcode](https://developer.apple.com/xcode/) 14** atau versi lebih baru
    
-   Instal Command Line Tools
    
-   Gunakan [Homebrew](https://brew.sh/) untuk menginstal [CocoaPods](https://cocoapods.org/):
    
    ```bash
    brew install cocoapods
    ```
    
-   Terima lisensi Xcode:
    
    ```bash
    sudo xcodebuild -license accept
    ```

Saat mengintegrasikan Capgo nanti, pastikan Anda memiliki koneksi internet yang stabil dan sertifikat SSL yang valid.

Dengan langkah-langkah ini selesai, Anda siap untuk proses pengembangan Capacitor yang lancar. Selanjutnya, Anda akan menginstal Capacitor CLI.

## Instal Capacitor CLI

Dengan lingkungan Anda siap, saatnya menginstal dan mengkonfigurasi Capacitor CLI.

### Tambahkan Paket Capacitor

Mulai dengan menginstal paket Capacitor CLI dan Core menggunakan npm:

```bash
npm install @capacitor/cli @capacitor/core
```

Setelah terinstal, konfirmasi setup dengan memeriksa [versi Capacitor](https://capgo.app/plugins/ivs-player/):

```bash
npx cap --version
```

### Siapkan Proyek Anda

Inisialisasi Capacitor di proyek Anda dengan perintah berikut:

```bash
npx cap init
```

Selama inisialisasi, Anda akan diminta untuk memberikan detail berikut:

| Pengaturan | Deskripsi | Contoh |
| --- | --- | --- |
| App Name | Nama yang ditampilkan di app store | "My Awesome App" |
| App ID | Pengidentifikasi unik untuk aplikasi Anda | "com.mycompany"