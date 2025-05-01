---
slug: firebase-crashlytics-for-capacitor-apps
title: Capacitorアプリ向けFirebase Crashlytics
description: >-
  モバイルアプリにリアルタイムのクラッシュレポートを統合する方法を、iOSとAndroid向けのCrashlyticsのセットアップのステップバイステップガイドで学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-04-21T03:56:15.479Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Firebase, Crashlytics, mobile apps, Capacitor, app development, crash
  reporting, error tracking
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

**[Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics)** membantu Anda melacak crash aplikasi secara real-time, menyediakan laporan detail untuk memperbaiki masalah dengan cepat. Ini terintegrasi dengan mulus dengan [Capacitor](https://capacitorjscom/) untuk aplikasi iOS dan Android. Berikut yang perlu Anda ketahui:

-   **Mengapa Menggunakan Crashlytics?**
    
    -   Dapatkan **notifikasi crash real-time**
    -   Analisis laporan crash detail dengan **pengelompokan masalah otomatis**
    -   Pantau error kritis untuk menjaga stabilitas aplikasi
-   **Persyaratan Setup:**
    
    -   Install **[Nodejs](https://nodejsorg/en) (v16+)**, **Capacitor (v4+)**, dan tools seperti **[Xcode](https://developerapplecom/xcode/) 14+** dan **[Android Studio](https://developerandroidcom/studio) Electric Eel**
    -   Unduh file konfigurasi [Firebase](https://firebasegooglecom/) (`GoogleService-Infoplist` untuk iOS, `google-servicesjson` untuk Android)
    -   Perbarui file khusus platform seperti `Podfile` (iOS) dan `buildgradle` (Android)
-   **Langkah-langkah Utama:**
    
    -   Install Crashlytics:
        
        [[CODE_BLOCK]]
        
    -   Inisialisasi Crashlytics di aplikasi Anda:
        
        [[CODE_BLOCK]]
        
-   **Uji Setup Anda:**
    
    -   Picu crash percobaan:
        
        [[CODE_BLOCK]]
        
-   **Tips Tambahan:** Kombinasikan Crashlytics dengan **[Capgo](https://capgoapp/)** untuk pembaruan langsung tanpa penundaan toko aplikasi
    

Panduan ini memastikan aplikasi Anda bebas crash dan ramah pengguna. Mulai dengan menyiapkan Firebase Crashlytics hari ini!

## Panduan Android 2021: [Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics) - crash kustom

![Firebase Crashlytics](https://assetsseobotaicom/capgoapp/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607fjpg)

[[HTML_TAG]][[HTML_TAG]]

## Persyaratan Setup

Sebelum memulai, pastikan Anda telah menyelesaikan langkah-langkah berikut:

### Software dan Akun yang Diperlukan

Anda perlu menginstal berikut ini:

-   **Nodejs** (v16 atau lebih tinggi) dan **Capacitor** (v4 atau lebih tinggi)
-   **Akun Firebase** dengan proyek aktif
-   **Xcode 14+** untuk pengembangan iOS
-   **Android Studio Electric Eel** atau versi yang lebih baru untuk pengembangan Android
-   Versi terbaru **[CocoaPods](https://cocoapodsorg/)** (diperlukan untuk iOS)

### File Konfigurasi Platform

**Untuk iOS:**

-   Unduh file `GoogleService-Infoplist` dari Firebase Console
-   Perbarui `Podfile` Anda untuk menyertakan dependensi Crashlytics
-   Tambahkan kunci privasi yang diperlukan ke file `Infoplist` Anda

**Untuk Android:**

-   Dapatkan file `google-servicesjson` dari Firebase Console
-   Lakukan perubahan pada file `buildgradle` tingkat proyek dan aplikasi
-   Perbarui `AndroidManifestxml` untuk menyertakan izin yang diperlukan

### Setup [Firebase](https://firebasegooglecom/) Console

![Firebase](https://assetsseobotaicom/capgoapp/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83jpg)

Siapkan Firebase dan aktifkan Crashlytics melalui langkah-langkah ini:

1. **Buat proyek Firebase** dan aktifkan Crashlytics
    
2. **Daftarkan aplikasi Anda** di Firebase Console:
    
    -   Gunakan **bundle ID** untuk iOS dan **nama paket** untuk Android
    -   Unduh file konfigurasi: `GoogleService-Infoplist` (iOS) dan `google-servicesjson` (Android)
3. **Integrasikan Firebase SDK** ke aplikasi Anda dengan menambahkan dependensi ini:
    
    **Untuk Android (tingkat aplikasi `buildgradle`):**
    
    [[CODE_BLOCK]]
    
    **Untuk iOS (`Podfile`):**
    
    [[CODE_BLOCK]]
    

Setelah langkah-langkah ini selesai, Anda siap untuk melanjutkan ke bagian Instalasi Plugin

## Langkah-langkah Instalasi

### Instalasi Plugin

Pertama, install plugin dan [sinkronkan dengan Capacitor](https://capgoapp/plugins/capacitor-updater/):

[[CODE_BLOCK]]

Kemudian, inisialisasi Crashlytics di aplikasi Anda. Tambahkan kode berikut ke `appcomponentts` atau `maints`:

[[CODE_BLOCK]]

### Konfigurasi Platform

Siapkan konfigurasi yang diperlukan untuk platform Android dan iOS

**Setup Android**

1.Tambahkan plugin Crashlytics Gradle ke file `build.gradle` level aplikasi Anda:

[[CODE_BLOCK]]

2. Aktifkan pengumpulan crash di `AndroidManifest.xml`:

[[CODE_BLOCK]]

**Pengaturan iOS**

1. Konfigurasi Firebase di `AppDelegate.swift`:

[[CODE_BLOCK]]

### Menguji Pengaturan Anda

Konfirmasi bahwa Crashlytics bekerja dengan menjalankan tes crash dan memeriksa Firebase Console:

- Picu tes crash dengan kunci kustom:

[[CODE_BLOCK]]

- Opsional, identifikasi pengguna:

[[CODE_BLOCK]]

- Log event kustom:

[[CODE_BLOCK]]

Laporan, termasuk stack trace, detail perangkat, dan kunci kustom, akan muncul di Firebase Console dalam waktu sekitar 5 menit.

**Penting:** Hapus panggilan crash sebelum merilis aplikasi Anda. Untuk menonaktifkan pengumpulan crash selama pengembangan, gunakan:

[[CODE_BLOCK]]

## Panduan Pemantauan

Setelah Anda mengkonfirmasi pengaturan Anda dengan tes crash, gunakan Firebase Console untuk melacak crash dan error yang sebenarnya di aplikasi langsung Anda.

### Membaca Laporan Crash

Anda dapat menemukan laporan crash di Firebase Console di bagian Crashlytics. Berikut yang akan Anda lihat:

- **Pengguna bebas-crash**: Persentase pengguna yang tidak mengalami crash
- **Stabilitas masalah**: Seberapa sering crash terjadi
- **Analisis dampak**: Jumlah pengguna yang terkena dampak

Klik pada masalah apa pun untuk mendalami detail seperti stack trace, informasi perangkat (mis. versi OS, memori), kunci kustom, log, dan perjalanan pengguna menuju crash

**Tips Pro**: Aktifkan fitur "peringatan kecepatan" untuk mendapatkan notifikasi ketika tingkat crash tiba-tiba meningkat. Ini dapat membantu Anda mengatasi masalah sebelum berdampak pada terlalu banyak pengguna.

### Tips Manajemen Error

- **Prioritaskan berdasarkan Dampak**: Fokus pada crash yang mempengaruhi paling banyak pengguna atau terjadi di bagian kritis aplikasi Anda. Melacak tren dapat membantu Anda mengidentifikasi masalah mendesak.

- **Gunakan Kunci Kustom**: Tambahkan konteks ke laporan crash Anda dengan kunci kustom. Contohnya:

[[CODE_BLOCK]]

- **Kelompokkan Masalah Serupa**: Manfaatkan pengelompokan masalah otomatis Firebase. Anda juga dapat menandai crash terkait dengan kunci kustom yang konsisten dan menggunakan judul yang jelas dan deskriptif untuk pelacakan yang lebih mudah.

### Melindungi Privasi Pengguna

Untuk memastikan kepatuhan dan melindungi data pengguna, ikuti pedoman ini:

- **Izin**:
  - Sebutkan pelaporan crash dalam kebijakan privasi Anda
  - Dapatkan persetujuan pengguna untuk pengumpulan data di wilayah dengan regulasi GDPR
  - Berikan pengguna opsi untuk tidak ikut dalam pelaporan crash

- **Kontrol Pengumpulan Data**:

[[CODE_BLOCK]]

- **Retensi Data**:
  - Atur penghapusan data otomatis setelah 90 hari
  - Bersihkan informasi sensitif dari laporan Anda
  - Gunakan kunci kustom yang tidak dapat diidentifikasi untuk menjaga privasi pengguna saat debugging

## Integrasi [Capgo](https://capgo.app/)

![Capgo](https://assets.seobot.ai/capgo.app/6805ba51360079f947b8a1bf/12eddca90b08193253253ea10516a6c4.jpg)

Sederhanakan proses dari deteksi crash hingga penerapan perbaikan dengan menggabungkan sistem pembaruan langsung Capgo dengan Crashlytics.

### Tentang Capgo

Capgo adalah alat pembaruan langsung yang dirancang khusus untuk [aplikasi Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/). Dengan lebih dari 1.900 aplikasi dalam produksi dan tingkat pembaruan 95% dalam 24 jam, ini memastikan perbaikan cepat tanpa penundaan persetujuan app store [\[1\]](https://capgo.app/)

Fitur utama meliputi:

- **Enkripsi end-to-end** untuk pembaruan yang aman
- **Rollback satu klik** ke versi sebelumnya
- **Distribusi berbasis channel** untuk rilis yang ditargetkan
- **Integrasi CI/CD yang mulus**
- Platform yang **100% open-source**

### Crashlytics dan Capgo Bersama

Menggunakan Crashlytics dengan Capgo menciptakan alur kerja yang efisien untuk mengidentifikasi dan menyelesaikan masalah dengan cepat.

Berikut cara kerjanya:

1. **Deteksi dan Respons Crash**
   Crashlytics mengidentifikasi crash, dan Capgo memungkinkan Anda menerapkan perbaikan secara instan tanpa menunggu persetujuan app store

2.