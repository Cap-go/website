---
slug: capacitor-cli-project-setup-guide
title: 'Capacitor CLI: プロジェクトのセットアップガイド'
description: >-
  Pelajari cara mengkonfigurasi Capacitor CLI untuk membuat aplikasi native iOS
  dan Android menggunakan teknologi web dalam beberapa langkah sederhana.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-04-18T03:04:53.935Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

**Ingin membangun aplikasi iOS dan Android dengan satu basis kode?** [Capacitor](https://capacitorjscom/) CLI menyederhanakan prosesnya, memungkinkan Anda membuat aplikasi native menggunakan teknologi web. Berikut yang akan Anda pelajari:

-   **Pengaturan Cepat**: Instal Capacitor CLI dan inisialisasi proyek Anda dalam hitungan menit
-   **Integrasi Platform**: Tambahkan dukungan iOS dan Android dengan perintah sederhana
-   **Pembaruan Langsung**: Gunakan [Capgo](https://capgoapp/) untuk pembaruan instan melalui jaringan
-   **Perbaikan Umum**: Atasi masalah seperti kesalahan sinkronisasi atau kegagalan build

**Langkah-langkah Utama untuk Memulai:**

1. Instal [Nodejs](https://nodejsorg/en), npm, JDK, [Xcode](https://developerapplecom/xcode/), dan [Android Studio](https://developerandroidcom/studio)
2. Jalankan `npm install @capacitor/core @capacitor/cli` dan inisialisasi proyek Anda
3. Tambahkan platform iOS dan Android menggunakan `npx cap add ios` dan `npx cap add android`
4. Opsional: Siapkan Capgo untuk [pembaruan aplikasi](https://capgoapp/plugins/capacitor-updater/) langsung

Panduan ini mencakup semua yang Anda butuhkan untuk mengatur Capacitor CLI, mengonfigurasi platform, dan mendeploy aplikasi Anda. Mari kita mulai!

## Mengenal [Capacitor](https://capacitorjscom/) Configure

![Capacitor](https://assetsseobotaicom/capgoapp/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1jpg)

[[HTML_TAG]][[HTML_TAG]]

## Persyaratan Pengaturan

Untuk memulai, pastikan Anda telah menginstal alat-alat berikut:

-   **Nodejs** (versi 14 atau lebih baru) dan **npm**
-   **Java JDK** (versi 11 atau lebih baru)
-   **Xcode** (versi 12 atau lebih baru untuk build iOS)
-   **Android Studio** (untuk build Android)
-   **Capacitor CLI** (versi 6 atau 7)

_Opsional:_ Jika Anda ingin mengaktifkan pembaruan langsung, lihat "[Panduan Pengaturan Capgo](https://capgoapp/docs/plugin/cloud-mode/getting-started/)" di bawah ini

## Langkah-langkah Instalasi CLI

Sebelum memulai, pastikan Anda telah menyiapkan **Nodejs**, **npm**, **JDK**, **Xcode**, dan **Android Studio**. Setelah siap, Anda dapat menginstal Capacitor CLI dengan menjalankan:

[[CODE_BLOCK]]

Perintah ini menginstal Capacitor dan menyiapkan komponen intinya

Setelah menyelesaikan langkah ini, lanjutkan ke **Membuat Proyek Baru** untuk membangun aplikasi Anda

## Membuat Proyek Baru

Untuk memulai dengan proyek Anda [menggunakan Capacitor CLI](https://capgoapp/docs/cli/commands/), ikuti langkah-langkah berikut:

[[CODE_BLOCK]]

### Memperbarui File Konfigurasi

Edit file `capacitorconfigjson` untuk menyertakan pengaturan berikut:

[[CODE_BLOCK]]

Setelah diperbarui, gunakan konfigurasi ini untuk menyiapkan Capacitor untuk proyek Anda

## Pengaturan Platform

Sekarang setelah kerangka proyek selesai, saatnya menyiapkan target iOS dan Android

### Menambahkan iOS dan Android

Mulai dengan menginstal paket-paket khusus platform yang diperlukan menggunakan Capacitor CLI:

[[CODE_BLOCK]]

Untuk iOS, pastikan Anda memiliki Xcode 14 atau lebih baru, [CocoaPods](https://cocoapodsorg/) 1.11 atau lebih baru, dan macOS 12 atau lebih tinggi. Untuk Android, Anda akan membutuhkan Android Studio Giraffe (2022.3.1+), JDK 17 atau lebih baru, dan [Gradle](https://gradleorg/) 7.5 atau lebih tinggi

Setelah terinstal, Anda perlu menjaga target native Anda tetap diperbarui dengan perubahan pada aplikasi web Anda

### Pembaruan Platform

Untuk menyinkronkan platform Anda dengan perubahan web terbaru, ikuti langkah-langkah ini setelah memperbarui aplikasi web Anda:

[[CODE_BLOCK]]

Perintah `cap sync` menangani dua tugas:

-   Menyalin aset web yang diperbarui ke platform native
-   Memperbarui konfigurasi native dan plugin agar sesuai dengan perubahan terbaru

### Pengaturan IDE

Buka proyek khusus platform di IDE yang sesuai:

[[CODE_BLOCK]]

**Di Xcode:**

1. Pilih tim pengembangan Anda
2. Siapkan sertifikat penandatanganan
3. Perbarui pengidentifikasi bundle Anda

**Di Android Studio:**

1. Modifikasi ID aplikasi di `buildgradle`
2. Konfigurasikan keystore untuk penandatanganan
3. Siapkan varian build debug dan release

Ketika semuanya dikonfigurasi, build proyek menggunakan `npx cap build ios` atau `npx cap build android`. Jangan lupa untuk menjalankan `npx cap sync` lagi untuk memastikan semua aset sudah diperbarui

## Panduan Pengaturan [Capgo](https://capgoapp/)

![Capgo](https://assetsseobotaicom/capgo