---
slug: capacitor-cli-project-setup-guide
title: Panduan Pengaturan Proyek Capacitor CLI
description: >-
  Pelajari cara mengatur Capacitor CLI untuk membangun aplikasi iOS dan Android
  native menggunakan teknologi web dalam beberapa langkah mudah.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
**Ingin membangun aplikasi iOS dan Android dengan satu basis kode?** [Capacitor](https://capacitorjs.com/) CLI menyederhanakan prosesnya, memungkinkan Anda membuat aplikasi native menggunakan teknologi web. Berikut apa yang akan Anda pelajari:

-   **Pengaturan Cepat**: Instal Capacitor CLI dan inisialisasi proyek Anda dalam beberapa menit.
-   **Integrasi Platform**: Tambahkan dukungan iOS dan Android dengan perintah sederhana.
-   **Pembaruan Langsung**: Gunakan [Capgo](https://capgo.app/) untuk pembaruan langsung secara over-the-air.
-   **Perbaikan Umum**: Memecahkan masalah seperti kesalahan sinkronisasi atau kegagalan pembangunan.

**Langkah Kunci untuk Memulai:**

1.  Instal [Node.js](https://nodejs.org/en), npm, JDK, [Xcode](https://developer.apple.com/xcode/), dan [Android Studio](https://developer.android.com/studio).
2.  Jalankan `npm install @capacitor/core @capacitor/cli` dan inisialisasi proyek Anda.
3.  Tambahkan platform iOS dan Android menggunakan `npx cap add ios` dan `npx cap add android`.
4.  Opsional: Siapkan Capgo untuk [pembaruan aplikasi](https://capgo.app/plugins/capacitor-updater/) langsung.

Panduan ini mencakup semua yang Anda butuhkan untuk mengatur Capacitor CLI, mengonfigurasi platform, dan menerapkan aplikasi Anda. Mari kita mulai!

## Memperkenalkan [Capacitor](https://capacitorjs.com/) Konfigurasi

![Capacitor Framework Documentation Website](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Persyaratan Pengaturan

Untuk memulai, pastikan Anda memiliki alat berikut yang terinstal:

-   **Node.js** (versi 14 atau lebih baru) dan **npm**
-   **Java JDK** (versi 11 atau lebih baru)
-   **Xcode** (versi 12 atau lebih baru untuk pembangunan iOS)
-   **Android Studio** (untuk pembangunan Android)
-   **Capacitor CLI** (versi 6 atau 7)

_Opsional:_ Jika Anda ingin mengaktifkan pembaruan langsung, lihat "[Panduan Pengaturan Capgo](https://capgo.app/docs/plugin/cloud-mode/getting-started/)" di bawah ini.

## Langkah Instalasi CLI

Sebelum memulai, pastikan Anda telah mengatur **Node.js**, **npm**, **JDK**, **Xcode**, dan **Android Studio**. Setelah siap, Anda dapat menginstal Capacitor CLI dengan menjalankan:

```bash
npm install --save @capacitor/core @capacitor/cli
npx cap init
```

Perintah ini memasang Capacitor dan mengatur komponen intinya.

Setelah langkah ini selesai, lanjutkan ke **Membuat Proyek Baru** untuk membangun aplikasi Anda.

## Membuat Proyek Baru

Untuk memulai proyek Anda [menggunakan Capacitor CLI](https://capgo.app/docs/cli/commands/), ikuti langkah-langkah ini:

```bash
mkdir my-app && cd my-app
npm init -y
npx cap init my-app com.company.app --web-dir dist
```

### Memperbarui File Konfigurasi

Edit file `capacitor.config.json` untuk menyertakan pengaturan berikut:

```json
{
  "appId": "com.company.app",
  "appName": "My App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "hostname": "app.example.com",
    "androidScheme": "https"
  }
}
```

Setelah diperbarui, gunakan konfigurasi ini untuk mengatur Capacitor untuk proyek Anda.

## Pengaturan Platform

Sekarang bahwa scaffolding proyek telah selesai, saatnya untuk mengatur target iOS dan Android.

### Menambahkan iOS dan Android

Mulailah dengan menginstal paket khusus platform yang diperlukan menggunakan Capacitor CLI:

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

Untuk iOS, pastikan Anda memiliki Xcode 14 atau lebih baru, [CocoaPods](https://cocoapods.org/) 1.11 atau lebih baru, dan macOS 12 atau lebih tinggi. Untuk Android, Anda akan memerlukan Android Studio Giraffe (2022.3.1+), JDK 17 atau lebih baru, dan [Gradle](https://gradle.org/) 7.5 atau lebih tinggi.

Setelah terpasang, Anda perlu menjaga target native Anda tetap diperbarui dengan perubahan pada aplikasi web Anda.

### Pembaruan Platform

Untuk menyinkronkan platform Anda dengan perubahan web terbaru, ikuti langkah-langkah ini setelah memperbarui aplikasi web Anda:

```bash
npm run build
npx cap sync
```

Perintah `cap sync` menangani dua tugas:

-   Menyalin aset web yang diperbarui ke platform native
-   Memperbarui konfigurasi dan plugin native agar sesuai dengan perubahan terbaru

### Pengaturan IDE

Buka proyek khusus platform di IDE yang sesuai:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

**Di Xcode:**

1.  Pilih tim pengembangan Anda.
2.  Siapkan sertifikat penandatanganan.
3.  Perbarui pengenal bundel Anda.

**Di Android Studio:**

1.  Ubah ID aplikasi di `build.gradle`.
2.  Konfigurasikan keystore untuk penandatanganan.
3.  Siapkan varian pembangunan debug dan rilis.

Ketika semuanya terkonfigurasi, bangun proyek menggunakan `npx cap build ios` atau `npx cap build android`. Jangan lupa untuk menjalankan `npx cap sync` lagi untuk memastikan semua aset terbarui.

## Panduan Pengaturan [Capgo](https://capgo.app/)

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Siapkan Capgo untuk mengaktifkan pembaruan langsung secara over-the-air untuk aplikasi Anda.

### Fitur Utama Capgo

Capgo menawarkan beberapa alat untuk memperlancar pembaruan aplikasi:

-   **Enkripsi ujung-ke-ujung** memastikan pengiriman pembaruan yang aman.
-   Pembaruan berjalan **di latar belakang** saat aplikasi diluncurkan.
-   **Alat analitik** membantu melacak tingkat keberhasilan pembaruan dan keterlibatan pengguna.
-   Opsi **rollback satu klik** memungkinkan Anda cepat pulih dari pembaruan yang bermasalah.
-   Gunakan **[sistem saluran](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** untuk peluncuran bertahap dan pengujian beta.

### Menginstal Capgo

Ikuti langkah-langkah berikut untuk memulai dengan Capgo:

1.  [Instal Capgo CLI](https://capgo.app/docs/self-hosted/local-dev/cli/):
    
    ```bash
    npm install --save @capgo/cli
    ```
    
2.  [Inisialisasi Capgo](https://capgo.app/docs/webapp/) di proyek Anda:
    
    ```bash
    npx capgo init
    ```
    
3.  Bangun dan rilis pembaruan:
    
    ```bash
    npm run build
    npx capgo release
    ```
    
4.  Buka aplikasi untuk memicu proses pembaruan latar belakang.
    

### Praktik Terbaik

-   Gunakan saluran untuk menguji pembaruan sebelum meluncurkannya ke semua pengguna.
-   Monitor analitik untuk memastikan pembaruan berhasil disampaikan dan pengguna tetap terlibat.
-   Aktifkan pelacakan kesalahan untuk menangkap dan memperbaiki masalah lebih awal.
-   Siapkan fitur rollback untuk cepat menangani masalah.

Capgo kompatibel dengan Capacitor 6 dan 7, terintegrasi dengan lancar dengan pipeline CI/CD, dan mematuhi persyaratan toko Apple dan Google.

## Masalah Umum dan Tips

Setelah Anda menyelesaikan pengaturan platform dan Capgo, Anda mungkin menghadapi beberapa kesalahan umum. Berikut cara mengatasi dengan cepat.

### Masalah Pengaturan Lingkungan

-   **CLI Tidak Ditemukan**  
    **Kesalahan**: Perintah `npx cap` gagal.  
    **Perbaikan**: Jalankan `npm install --save @capacitor/cli @capacitor/core` dan coba lagi.
    
-   **Ketidakcocokan Versi Node**  
    **Kesalahan**: Perintah CLI gagal karena kesalahan versi Node.js.  
    **Perbaikan**: Instal versi Node.js 14 atau lebih tinggi seperti yang diuraikan dalam persyaratan pengaturan.
    

### Masalah Konfigurasi

-   **Ketidakcocokan Konfigurasi**  
    **Kesalahan**: Perubahan pada `capacitor.config.json` tidak efektif.  
    **Perbaikan**: Pastikan nilai `appId` dan `webDir` cocok dengan `package.json` proyek Anda dan folder output build web.
    
-   **Kesalahan Sinkronisasi Platform**  
    **Kesalahan**: Menjalankan `npx cap sync` menghasilkan konflik versi plugin.  
    **Perbaikan**: Perbarui `@capacitor/android` dan `@capacitor/ios` ke versi mayor yang sama, lalu jalankan kembali perintah sinkronisasi.
    

### Pembangunan dan Penerapan

-   **Kegagalan Penandatanganan Pembangunan**  
    **Kesalahan**: Pembangunan iOS atau Android gagal karena sertifikat atau keystore yang hilang.  
    **Perbaikan**: Ikuti instruksi pengaturan IDE. Untuk iOS, tambahkan tim pengembangan Anda di Xcode. Untuk Android, konfigurasikan keystore di `build.gradle`.
    
-   **Direktori Web Tidak Ditemukan**  
    **Kesalahan**: `npx cap sync` tidak dapat menemukan aset web.  
    **Perbaikan**: Jalankan perintah build web Anda (misalnya, `npm run build`) sebelum menyinkronkan platform.
    

### Masalah Pembaruan Langsung

-   **[Kegagalan Pembaruan Capgo](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **Kesalahan**: Pembaruan tidak muncul di aplikasi produksi.  
    **Perbaikan**: Periksa kembali [kunci API Capgo](https://capgo.app/docs/webapp/api-keys/) Anda di `capacitor.config.json` dan pastikan Anda menargetkan saluran yang benar.

Untuk informasi lebih lanjut tentang pengaturan spesifik platform, kunjungi kembali bagian Pengaturan Platform. Jika Anda bekerja dengan pembaruan langsung, konsultasikan Panduan Pengaturan Capgo untuk tips pemecahan masalah tambahan.

## Ringkasan

### Tinjauan Pengaturan

Mulailah aplikasi web Anda dengan Capacitor CLI, atur platform iOS dan Android, dan opsional sertakan Capgo untuk pembaruan langsung.

Berikut cara memulainya:

-   Gunakan Capacitor CLI untuk menginisialisasi proyek Anda.
-   Atur ID paket aplikasi Anda dan tentukan direktori output web.
-   Tambahkan dukungan untuk platform iOS dan Android.
-   Instal dan atur Capgo dengan perintah berikut: `npm install --save @capgo/cli && npx capgo init`

Untuk instruksi pengaturan detail atau pemecahan masalah, lihat dokumentasi resmi Capacitor dan Capgo.
