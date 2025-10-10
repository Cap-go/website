---
slug: installing-capacitor-cli-step-by-step-guide
title: 'Menginstal Capacitor CLI: Panduan Langkah demi Langkah'
description: >-
  Pelajari cara menginstal dan mengkonfigurasi Capacitor CLI untuk mengubah
  aplikasi web menjadi aplikasi mobile asli dengan efisien.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: Pengembangan Seluler
keywords: 'Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates'
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
**[Capacitor](https://capacitorjs.com/) CLI membantu Anda mengubah aplikasi web menjadi aplikasi iOS dan Android asli dengan satu basis kode.** Berikut cara mengaturnya dengan cepat:

-   **Prasyarat**: Instal [Node.js](https://nodejs.org/en) (v16+), npm, dan kerangka kerja web (React, Vue, Angular, dll.).
-   **[Instal Capacitor CLI](https://capgo.app/docs/cli/commands)**: Jalankan `npm install @capacitor/cli @capacitor/core` dan inisialisasi proyek Anda dengan `npx cap init`.
-   **Siapkan Platform**: Tambahkan dukungan untuk platform iOS (`npx cap add ios`) dan Android (`npx cap add android`).
-   **Bangun dan Sinkronisasi**: Gunakan `npm run build` dan `npx cap sync` untuk mentransfer aset web ke proyek asli.
-   **Pembaruan Langsung Opsional**: Gunakan alat seperti [Capgo](https://capgo.app/) untuk mengirim pembaruan secara instan tanpa penundaan dari toko aplikasi.

Capacitor CLI menyederhanakan pengembangan dan pemeliharaan aplikasi. Ikuti panduan untuk pengaturan yang lancar dan pemecahan masalah.

## Bangun Aplikasi Seluler dengan Cepat! React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/PPXktTJXMPE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Sebelum Anda Mulai

Siapkan lingkungan Anda dengan mengikuti langkah-langkah ini:

### Siapkan [Node.js](https://nodejs.org/en) dan npm

![Node.js](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

Anda memerlukan versi Node.js 16 atau lebih tinggi. Versi LTS terbaru direkomendasikan. Untuk memeriksa pengaturan Anda, jalankan:

```bash
node --version
npm --version
```

Jika Anda perlu memperbarui, unduh Node.js (yang termasuk npm) dari situs web resmi.

Setelah memastikan Node.js siap, pastikan proyek web Anda memenuhi persyaratan Capacitor yang diperlukan.

### Periksa Proyek Web Anda

Proyek web Anda harus memiliki hal-hal berikut:

-   **File package.json yang valid**: Pastikan telah dikonfigurasi dengan benar.
-   **Direktori build**: Ini adalah tempat aset web Anda berada (umumnya `dist` atau `www`).
-   **Titik masuk**: Direktori build Anda harus mencakup file `index.html`.

Berikut sekilas tentang kolom kunci di `package.json`:

| Kolom Diperlukan | Contoh Nilai | Tujuan |
| --- | --- | --- |
| name | "my-app" | Mengidentifikasi proyek |
| version | "1.0.0" | Menentukan versi aplikasi |
| build directory | "dist" atau "www" | Menunjuk ke aset web |

Setelah Node.js dan proyek web Anda siap, lanjutkan untuk menginstal alat khusus platform.

### Instal Perangkat Lunak yang Diperlukan

**Untuk Pengembangan Android:**

-   Unduh dan instal versi terbaru dari **[Android Studio](https://developer.android.com/studio)**.
-   Atur Android SDK dengan minimal level API 22.
-   Konfigurasi variabel lingkungan `ANDROID_HOME`.

**Untuk Pengembangan iOS (Hanya Mac):**

-   Instal **[Xcode](https://developer.apple.com/xcode/) 14** atau versi yang lebih baru.
    
-   Instal Command Line Tools.
    
-   Gunakan [Homebrew](https://brew.sh/) untuk menginstal [CocoaPods](https://cocoapods.org/):
    
    ```bash
    brew install cocoapods
    ```
    
-   Terima lisensi Xcode:
    
    ```bash
    sudo xcodebuild -license accept
    ```
    

Saat mengintegrasikan Capgo nanti, pastikan Anda memiliki koneksi internet yang stabil dan sertifikat SSL yang valid.

Dengan langkah-langkah ini selesai, Anda siap menjalani proses pengembangan Capacitor yang lancar. Berikutnya, Anda akan menginstal Capacitor CLI.

## Instal Capacitor CLI

Dengan lingkungan Anda siap, saatnya untuk menginstal dan mengonfigurasi Capacitor CLI.

### Tambahkan Paket Capacitor

Mulailah dengan menginstal paket Capacitor CLI dan Core menggunakan npm:

```bash
npm install @capacitor/cli @capacitor/core
```

Setelah terinstal, konfirmasikan pengaturan dengan memeriksa [versi Capacitor](https://capgo.app/plugins/ivs-player/):

```bash
npx cap --version
```

### Siapkan Proyek Anda

Inisialisasi Capacitor di proyek Anda dengan perintah berikut:

```bash
npx cap init
```

Saat inisialisasi, Anda akan diminta untuk memberikan detail berikut:

| Pengaturan | Deskripsi | Contoh |
| --- | --- | --- |
| Nama Aplikasi | Nama yang ditampilkan di toko aplikasi | "Aplikasi Hebat Saya" |
| ID Aplikasi | Pengenal unik untuk aplikasi Anda | "com.perusahaansaya.aplikasi" |
| Direktori Web | Jalur ke aset web Anda | "dist" atau "www" |

Selanjutnya, perbarui file konfigurasi Anda (`capacitor.config.ts` atau `capacitor.config.json`) dengan pengaturan yang relevan:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mycompany.myapp',
  appName: 'My Awesome App',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
```

### Siapkan iOS dan Android

Tambahkan dukungan untuk platform iOS dan Android dengan perintah ini:

```bash
npx cap add ios
npx cap add android
```

Ini akan menghasilkan proyek asli:

-   **iOS**: Membuat folder `ios` yang berisi proyek Xcode.
-   **Android**: Membuat folder `android` untuk proyek Android Studio.

Setelah melakukan perubahan pada aset web Anda, jalankan perintah berikut untuk membangun dan menyinkronkan:

```bash
npm run build
npx cap sync
```

Proses ini mengompilasi aset web Anda dan mentransfernya ke proyek asli, termasuk plugin [Capacitor yang terinstal](https://capgo.app/plugins/).

Untuk membuka proyek asli untuk kustomisasi lebih lanjut:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

Sekarang Anda siap untuk menguji pengaturan Anda dan menyelesaikan masalah yang mungkin muncul.

## Memperbaiki Masalah Umum

Saat mengatur Capacitor CLI, Anda mungkin mengalami beberapa masalah umum. Berikut cara mengatasinya:

### Masalah Gradle Android

Jika Anda mengalami masalah terkait Gradle, coba langkah-langkah ini:

1.  Arahkan ke direktori Android dan bersihkan cache build:
    
    ```bash
    cd android
    ./gradlew cleanBuildCache
    ```
    
2.  Perbarui versi Gradle di `android/build.gradle`:
    
    ```kotlin
    buildscript {
        ext {
            gradleVersion = '8.1.0'
        }
    }
    ```
    
3.  Tambahkan baris berikut ke `android/gradle.properties` untuk kinerja yang lebih baik:
    
    ```properties
    org.gradle.jvmargs=-Xmx4608m
    org.gradle.parallel=true
    ```
    

Jika masalah tetap ada, tinjau kembali pengaturan Anda atau konsultasikan dengan sumber pemecahan masalah tambahan.

### Aplikasi Menampilkan Layar Kosong

Layar kosong biasanya menunjukkan adanya masalah konfigurasi. Berikut cara mengatasinya:

-   **Periksa Jalur Direktori Web**: Pastikan `webDir` cocok dengan output build Anda.
    
    ```typescript
    const config: CapacitorConfig = {
        webDir: 'dist', // Adjust if necessary
    };
    ```
    
-   **Verifikasi Konfigurasi Server**: Pastikan pengaturan server sudah benar.
    
    ```typescript
    server: {
        url: 'http://localhost:3000',
        cleartext: true
    }
    ```
    
-   **Perbarui Kebijakan Keamanan Konten**: Tambahkan meta tag ini ke HTML Anda untuk memuat sumber dengan benar.
    
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *">
    ```
    

### Plugin Tidak Berfungsi

Jika sebuah plugin tidak berfungsi seperti yang diharapkan, ikuti langkah-langkah berikut:

1.  Lakukan instalasi bersih untuk dependensi:
    
    ```bash
    rm -rf node_modules
    npm cache clean --force
    npm install
    ```
    
2.  Periksa pengaturan plugin di `capacitor.config.ts` untuk memastikan mereka dikonfigurasi dengan benar:
    
    ```typescript
    plugins: {
        PluginName: {
            option: 'value'
        }
    }
    ```
    

Bagi mereka yang menggunakan [plugin asli Capgo](https://capgo.app/plugins/), ia secara otomatis menyinkronkan plugin dan menjaga kompatibilitas selama pembaruan.

Setelah menerapkan perbaikan ini, bangun kembali proyek Anda untuk memverifikasi perubahan:

```bash
npm run build && npx cap copy && npx cap sync
```

Setelah semuanya berjalan lancar, Anda dapat melanjutkan untuk menjelajahi opsi pembaruan langsung dengan Capgo.

## Pembaruan Langsung dengan [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/435c1a19c50c4ff1b7d76cbc4edeb6d0.jpg)

Sederhanakan [pembaruan aplikasi](https://capgo.app/plugins/capacitor-updater/) menggunakan Capgo. Ini memungkinkan Anda mendorong pembaruan langsung ke pengguna, melewati kebutuhan akan ulasan dari toko aplikasi.

**Memulai sangat sederhana.** Pertama, instal paket yang diperlukan:

```bash
npm install @capgo/cli @capgo/capacitor-updater
npx cap sync
```

Kemudian, inisialisasi Capgo di proyek Anda:

```bash
npx @capgo/cli init
```

### Rencana Harga

Capgo menawarkan beberapa tarif harga untuk memenuhi berbagai kebutuhan:

| Rencana | Pengguna Aktif Bulanan | Bandwidth | Penyimpanan | Harga (Tahunan) |
| --- | --- | --- | --- | --- |
| SOLO | 1.000 | 50 GB | 2 GB | $12/bulan |
| MAKER | 10.000 | 500 GB | 5 GB | $33/bulan |
| TEAM | 100.000 | 2.000 GB | 10 GB | $83/bulan |

Bagi pengguna perusahaan, rencana PAYG mulai dari $249/bulan dan termasuk keuntungan seperti akses API, domain kustom, dan dukungan khusus.

### Konfigurasi untuk Pembaruan Langsung

Untuk mengaktifkan pembaruan langsung, tambahkan yang berikut ke file `capacitor.config.ts` Anda:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      updateUrl: 'https://api.capgo.app/updates'
    }
  }
}
```

### Fitur Utama

Capgo menyediakan beberapa fitur unggulan:

-   **[Pembaruan aman](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/)** dengan enkripsi ujung ke ujung
-   **Penerapan otomatis** melalui CI/CD terintegrasi
-   **Pembaruan terarah** melalui penugasan pengguna
-   **Rollback instan** dengan kontrol versi
-   **Analisis waktu nyata** untuk melacak pembaruan

### Perintah Penerapan

Uji pembaruan dalam pengembangan sebelum menerapkannya secara langsung. Gunakan perintah berikut:

-   Terapkan ke staging:
    
    ```bash
    npx @capgo/cli deploy --channel staging
    ```
    
-   Terapkan ke produksi:
    
    ```bash
    npx @capgo/cli deploy --channel production
    ```
    

Capgo memastikan kepatuhan terhadap pedoman Apple dan Android, sehingga pembaruan langsung Anda tidak berisiko melanggar ketentuan toko aplikasi. Ini adalah cara yang efisien untuk mengelola aplikasi Capacitor setelah pemasangan.

## Kesimpulan

Mengatur Capacitor CLI sangat sederhana ketika Anda memiliki prasyarat yang tepat. Pengaturan ini memastikan pembaruan aplikasi yang lebih lancar dan alur kerja pengembangan yang efisien.

Alat modern membuat pemeliharaan aplikasi lebih mudah dari sebelumnya. Misalnya, Capgo sekarang menyediakan pembaruan langsung, menggantikan metode yang lebih tua. Integrasinya dengan instalasi CLI menjadikannya pilihan yang baik bagi para pengembang yang bekerja dengan aplikasi Capacitor.

Ekosistem [Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) terus berkembang dengan alat dan fitur baru. Menginstal CLI hanyalah titik awal untuk [membangun aplikasi seluler](https://capgo.app/blog/angular-mobile-app-capacitor/), dan Anda akan mendapat manfaat dari dokumentasi rinci dan komunitas pengembang yang aktif.

Pastikan untuk selalu memperbarui Capacitor CLI dan paketnya untuk menghindari masalah kompatibilitas.
