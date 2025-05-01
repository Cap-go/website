---
slug: setting-up-capacitor-local-environment
title: Menyiapkan Lingkungan Lokal Capacitor
description: >-
  Pelajari cara mengatur lingkungan lokal Capacitor dengan cepat untuk membuat
  aplikasi iOS dan Android menggunakan teknologi web dengan panduan lengkap ini.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-03T01:01:07.065Z
updated_at: 2025-04-03T01:01:18.509Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67edd19cebbb9dc8064069d2-1743642078509.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capacitor, mobile development, iOS setup, Android setup, app development, web
  technologies, local environment
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

**Ingin membangun aplikasi iOS dan Android menggunakan teknologi web? Berikut cara menyiapkan lingkungan [Capacitor](https://capacitorjscom/) lokal dengan cepat dan efisien**

### Langkah-langkah Utama:

1.  **Instal Perangkat Lunak yang Diperlukan**:
    
    -   **[Nodejs](https://nodejsorg/en)** (v20.0.0+), **npm** (v9.0.0+), **Git** (v24.0.0+), dan IDE modern (mis. [VS Code](https://codevisualstudiocom/))
    -   Persyaratan sistem: RAM 8GB, penyimpanan 256GB, prosesor Intel i5/AMD Ryzen 5
2.  **Pengaturan iOS** (khusus macOS):
    
    -   macOS 13.0+ (Ventura), [Xcode](https://developerapplecom/xcode/) 16.0+, [CocoaPods](https://cocoapodsorg/) 1.12.0+, dan akun Apple Developer aktif
3.  **Pengaturan Android**:
    
    -   [Android Studio](https://developerandroidcom/studio) Hedgehog (2023.1.1)+, Android SDK API level 23+, JDK 17, dan [Gradle](https://gradleorg/) 8.0+
    -   Atur variabel lingkungan untuk perangkat Android
4.  **Instal Capacitor**:
    
    [[CODE_BLOCK]]
    
5.  **Inisialisasi Proyek**:
    
    -   Buat proyek baru atau integrasikan Capacitor ke aplikasi yang ada menggunakan `npx cap init`
6.  **Tambahkan Platform**:
    
    [[CODE_BLOCK]]
    
7.  **Build dan Sinkronisasi**:
    
    -   Build aset web (`npm run build`) dan sinkronkan dengan platform native (`npx cap sync`)
8.  **Aktifkan Pembaruan Langsung**:
    
    -   Gunakan [Capgo](https://capgoapp/) untuk pembaruan real-time dengan:
        
        [[CODE_BLOCK]]
        
9.  **[Uji Aplikasi Anda](https://capgoapp/docs/plugin/debugging/)**:
    
    -   Gunakan iOS Simulator (`npx cap open ios`) atau Android Emulator (`npx cap open android`)

### Tips Cepat:

Perbarui `capacitorconfig.ts` untuk mengelola lingkungan dan mengaktifkan pembaruan langsung. Contohnya:

[[CODE_BLOCK]]

Pengaturan ini memastikan pengembangan, pengujian, dan penerapan yang lancar untuk aplikasi Capacitor Anda

## Ionic Capacitor - Membuat Aplikasi Baru - Jalankan di Android & iOS

[[HTML_TAG]][[HTML_TAG]]

## Pengaturan yang Diperlukan

Pastikan sistem Anda memenuhi spesifikasi yang diperlukan sebelum melanjutkan

### Kebutuhan Perangkat Lunak Dasar

Instal perangkat berikut:

| Perangkat Lunak | Versi Minimum | Catatan |
| --- | --- | --- |
| **Nodejs** | v20.0.0+ | Versi LTS direkomendasikan |
| **npm** | v9.0.0+ | Disertakan dengan Nodejs |
| **Git** | v24.0.0+ | Diperlukan untuk version control |
| **VS Code/[WebStorm](https://wwwjetbrainscom/webstorm/)** | Terbaru | IDE modern apapun bisa digunakan |

Mesin Anda harus memiliki minimal **RAM 8GB**, **penyimpanan 256GB**, dan prosesor **Intel i5/AMD Ryzen 5 (atau setara)**

### Pengaturan iOS dan Android

**Persyaratan iOS** (khusus macOS):

-   macOS 13.0 (Ventura) atau lebih baru
-   Xcode 16.0 atau lebih baru (unduh dari Mac App Store)
-   CocoaPods 1.12.0 atau lebih tinggi (instal menggunakan `sudo gem install cocoapods`)
-   Akun Apple Developer aktif

**Persyaratan Android** (Windows/macOS/Linux):

-   Android Studio Hedgehog (2023.1.1) atau lebih baru
-   Android SDK API level 23 (Android 6.0) atau di atas
-   Java Development Kit (JDK) 17
-   Gradle 8.0+

Atur variabel lingkungan Android dengan menambahkan baris berikut ke file konfigurasi shell Anda:

[[CODE_BLOCK]]

### Menginstal Capacitor

Instal Capacitor menggunakan npm:

[[CODE_BLOCK]]

Jika Anda menggunakan framework seperti Vue, React, atau Angular, instal plugin Capacitor yang sesuai. Untuk Vue, jalankan:

[[CODE_BLOCK]]

Untuk mengkonfirmasi instalasi, periksa versi Capacitor dengan menjalankan:

[[CODE_BLOCK]]

Anda akan melihat versi Capacitor saat ini ditampilkan (mis. 5.x.x per April 2025)

Terakhir, inisialisasi Capacitor di direktori proyek Anda:

[[CODE_BLOCK]]

Setelah selesai, Anda dapat mengonfigurasi komponen-komponen ini untuk proyek spesifik Anda

## Instruksi Pengaturan

### Pengaturan Proyek

Untuk memulai, buat **proyek Capacitor baru** atau integrasikan Capacitor ke aplikasi web yang ada:

[[CODE_BLOCK]]

Jika Anda menambahkan Capacitor ke aplikasi web yang ada, inisialisasi di direktori proyek Anda:

[[CODE_BLOCK]]

Setelah diinisialisasi, Anda perlu menambahkan platform yang diperlukan untuk pengembangan native

### Pengaturan Platform

Tambahkan platform iOS dan Android ke proyek Anda:

[[CODE_BLOCK]]

Perbarui `capacitorconfig`