---
slug: firebase-crashlytics-for-capacitor-apps
title: Firebase Crashlytics untuk Aplikasi Capacitor
description: >-
  Pelajari cara mengintegrasikan pelaporan kecelakaan waktu nyata ke dalam
  aplikasi seluler Anda dengan panduan langkah demi langkah tentang cara
  mengatur Crashlytics untuk iOS dan Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-10-09T00:13:34.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  Firebase, Crashlytics, mobile apps, Capacitor, app development, crash
  reporting, error tracking
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
**[Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)** membantu Anda melacak keruntuhan aplikasi secara real-time, menyediakan laporan rinci untuk memperbaiki masalah dengan cepat. Ini terintegrasi dengan [Capacitor](https://capacitorjs.com/) untuk aplikasi iOS dan Android. Ini yang perlu Anda ketahui:

-   **Mengapa Menggunakan Crashlytics?**
    
    -   Dapatkan **pemberitahuan keruntuhan secara real-time**.
    -   Analisis laporan keruntuhan rinci dengan **pengelompokan masalah otomatis**.
    -   Pantau kesalahan kritis untuk menjaga aplikasi tetap stabil.
-   **Persyaratan Pengaturan:**
    
    -   Instal **[Node.js](https://nodejs.org/en) (v16+)**, **Capacitor (v4+)**, dan alat seperti **[Xcode](https://developer.apple.com/xcode/) 14+** dan **[Android Studio](https://developer.android.com/studio) Electric Eel**.
    -   Unduh file konfigurasi [Firebase](https://firebase.google.com/) (`GoogleService-Info.plist` untuk iOS, `google-services.json` untuk Android).
    -   Perbarui file spesifik platform seperti `Podfile` (iOS) dan `build.gradle` (Android).
-   **Langkah Kunci:**
    
    -   Instal Crashlytics:
        
        ```bash
        npm install @capacitor-firebase/crashlytics && npx cap sync
        ```
        
    -   Inisialisasi Crashlytics di aplikasi Anda:
        
        ```typescript
        import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
        await FirebaseCrashlytics.initialize();
        ```
        
-   **Uji Pengaturan Anda:**
    
    -   Trigger keruntuhan uji:
        
        ```typescript
        await FirebaseCrashlytics.crash();
        ```
        
-   **Tip Bonus:** Gabungkan Crashlytics dengan **[Capgo](https://capgo.app/)** untuk pembaruan langsung instan tanpa penundaan toko aplikasi.
    

Panduan ini memastikan aplikasi Anda bebas keruntuhan dan ramah pengguna. Mulailah dengan mengatur Firebase Crashlytics hari ini!

## Panduan Android 2021: [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) - keruntuhan kustom ...

![Firebase Crashlytics](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607f.jpg)

<iframe src="https://www.youtube.com/embed/JxVYfZprK0g" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Persyaratan Pengaturan

Sebelum mulai, pastikan Anda telah menyelesaikan langkah-langkah berikut:

### Perangkat Lunak dan Akun yang Diperlukan

Anda perlu menginstal yang berikut:

-   **Node.js** (v16 atau lebih tinggi) dan **Capacitor** (v4 atau lebih tinggi)
-   Akun **Firebase** dengan proyek yang aktif
-   **Xcode 14+** untuk pengembangan iOS
-   **Android Studio Electric Eel** atau versi yang lebih baru untuk pengembangan Android
-   Versi terbaru dari **[CocoaPods](https://cocoapods.org/)** (diperlukan untuk iOS)

### File Konfigurasi Platform

**Untuk iOS:**

-   Unduh file `GoogleService-Info.plist` dari Firebase Console.
-   Perbarui `Podfile` Anda untuk menyertakan dependensi Crashlytics.
-   Tambahkan kunci privasi yang diperlukan ke file `Info.plist` Anda.

**Untuk Android:**

-   Dapatkan file `google-services.json` dari Firebase Console.
-   Lakukan perubahan pada file `build.gradle` tingkat proyek dan tingkat aplikasi.
-   Perbarui `AndroidManifest.xml` untuk menyertakan izin yang diperlukan.

### Pengaturan [Firebase](https://firebase.google.com/) Console

![Firebase](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83.jpg)

Atur Firebase dan aktifkan Crashlytics melalui langkah-langkah ini:

1.  **Buat proyek Firebase** dan aktifkan Crashlytics.
    
2.  **Daftarkan aplikasi Anda** di Firebase Console:
    
    -   Gunakan **bundle ID** untuk iOS dan **package name** untuk Android.
    -   Unduh file konfigurasi: `GoogleService-Info.plist` (iOS) dan `google-services.json` (Android).
3.  **Integrasikan SDK Firebase** ke dalam aplikasi Anda dengan menambahkan dependensi ini:
    
    **Untuk Android (file `build.gradle` tingkat aplikasi):**
    
    ```kotlin
    dependencies {
        implementation platform('com.google.firebase:firebase-bom:32.0.0')
        implementation 'com.google.firebase:firebase-crashlytics'
        implementation 'com.google.firebase:firebase-analytics'
    }
    ```
    
    **Untuk iOS (`Podfile`):**
    
    ```ruby
    pod 'Firebase/Crashlytics'
    pod 'Firebase/Analytics'
    ```
    

Setelah langkah-langkah ini selesai, Anda siap untuk melanjutkan ke bagian Instalasi Plugin.

## Langkah Instalasi

### Instalasi Plugin

Pertama, instal plugin dan [sinkronkan dengan Capacitor](https://capgo.app/plugins/capacitor-updater/):

```bash
npm install @capacitor-firebase/crashlytics && npx cap sync
```

Kemudian, inisialisasi Crashlytics di aplikasi Anda. Tambahkan kode berikut ke `app.component.ts` atau `main.ts`:

```typescript
import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
await FirebaseCrashlytics.initialize();
```

### Konfigurasi Platform

Atur konfigurasi yang diperlukan untuk platform Android dan iOS.

**Pengaturan Android**

1.  Tambahkan plugin Gradle Crashlytics ke file `build.gradle` tingkat aplikasi Anda:
    
    ```kotlin
    buildscript { 
        dependencies { 
            classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.5' 
        } 
    }
    apply plugin: 'com.google.firebase.crashlytics'
    ```
    
2.  Aktifkan pengumpulan keruntuhan di `AndroidManifest.xml`:
    
    ```xml
    <meta-data
        android:name="firebase_crashlytics_collection_enabled"
        android:value="true" />
    ```
    

**Pengaturan iOS**

1.  Konfigurasikan Firebase di `AppDelegate.swift`:
    
    ```swift
    import Firebase
    FirebaseApp.configure()
    ```
    

### Menguji Pengaturan Anda

Konfirmasikan bahwa Crashlytics berfungsi dengan menjalankan keruntuhan uji dan memeriksa Firebase Console:

-   Trigger keruntuhan uji dengan kunci kustom:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({key: 'test_scenario', value: 'manual_crash'});
    await FirebaseCrashlytics.crash();
    ```
    
-   Opsional, identifikasi pengguna:
    
    ```typescript
    await FirebaseCrashlytics.setUserId({userId: 'user123'});
    ```
    
-   Catat peristiwa kustom:
    
    ```typescript
    await FirebaseCrashlytics.log({message: 'Test crash triggered'});
    ```
    

Laporan, termasuk jejak tumpukan, detail perangkat, dan kunci kustom, harus muncul di Firebase Console dalam waktu sekitar 5 menit.

**Penting:** Hapus panggilan keruntuhan sebelum merilis aplikasi Anda. Untuk menonaktifkan pengumpulan keruntuhan selama pengembangan, gunakan:

```typescript
await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
```

## Panduan Pemantauan

Setelah Anda mengkonfirmasi pengaturan Anda dengan keruntuhan uji, gunakan Firebase Console untuk melacak keruntuhan dan kesalahan nyata di aplikasi Anda yang aktif.

### Membaca Laporan Keruntuhan

Anda dapat menemukan laporan keruntuhan di Firebase Console di bawah bagian Crashlytics. Berikut yang akan Anda lihat:

-   **Pengguna bebas keruntuhan**: Persentase pengguna yang tidak mengalami keruntuhan.
-   **Stabilitas masalah**: Seberapa sering keruntuhan terjadi.
-   **Analisis dampak**: Jumlah pengguna yang terpengaruh.

Klik pada masalah apa pun untuk menyelami lebih dalam detail seperti jejak tumpukan, informasi perangkat (misalnya, versi OS, memori), kunci kustom, log, dan perjalanan pengguna menuju keruntuhan.

**Tip profesional**: Aktifkan fitur "pemberitahuan kecepatan" untuk mendapatkan pemberitahuan ketika tingkat keruntuhan mendadak meningkat. Ini dapat membantu Anda mengatasi masalah sebelum berdampak pada terlalu banyak pengguna.

### Tips Manajemen Kesalahan

-   **Prioritaskan berdasarkan Dampak**: Fokus pada keruntuhan yang mempengaruhi sebagian besar pengguna atau terjadi di bagian kritis aplikasi Anda. Melacak tren dapat membantu Anda mengidentifikasi masalah mendesak.
    
-   **Gunakan Kunci Kustom**: Tambahkan konteks ke laporan keruntuhan Anda dengan kunci kustom. Misalnya:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({
      key: 'current_view',
      value: 'payment_processing'
    });
    ```
    
-   **Kelompokkan Masalah yang Sama**: Manfaatkan pengelompokan masalah otomatis Firebase. Anda juga dapat memberi tag keruntuhan terkait dengan kunci kustom yang konsisten dan menggunakan judul yang jelas dan deskriptif untuk pelacakan yang lebih mudah.
    

### Melindungi Privasi Pengguna

Untuk memastikan kepatuhan dan melindungi data pengguna, ikuti pedoman ini:

-   **Izin**:
    
    -   Sebutkan pelaporan keruntuhan dalam kebijakan privasi Anda.
    -   Dapatkan persetujuan pengguna untuk pengumpulan data di daerah yang memiliki regulasi GDPR.
    -   Berikan opsi kepada pengguna untuk menolak pelaporan keruntuhan.
-   **Kontrol Pengumpulan Data**:
    
    ```typescript
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: true});
    ```
    
-   **Retensi Data**:
    
    -   Atur penghapusan data otomatis setelah 90 hari.
    -   Hapus informasi sensitif dari laporan Anda.
    -   Gunakan kunci kustom yang tidak dapat diidentifikasi untuk menjaga privasi pengguna saat melakukan debug.

## Integrasi [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/12eddca90b08193253253ea10516a6c4.jpg)

Permudah proses dari deteksi keruntuhan hingga penerapan perbaikan dengan memadukan sistem pembaruan langsung Capgo dengan Crashlytics.

### Tentang Capgo

Capgo adalah alat pembaruan langsung yang dirancang khusus untuk aplikasi [Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/). Dengan lebih dari 1.900 aplikasi dalam produksi dan tingkat pembaruan 95% dalam 24 jam, ini memastikan perbaikan cepat tanpa penundaan persetujuan toko aplikasi [\[1\]](https://capgo.app/).

Fitur utama meliputi:

-   **Enkripsi ujung ke ujung** untuk pembaruan yang aman
-   **Rollback satu klik** ke versi sebelumnya
-   **Distribusi berbasis saluran** untuk rilis yang ditargetkan
-   **Integrasi CI/CD yang mulus**
-   Sebuah **platform yang sepenuhnya open-source**

### Crashlytics dan Capgo Bersama

Menggunakan Crashlytics dengan Capgo menciptakan alur kerja yang efisien untuk mengidentifikasi dan menyelesaikan masalah dengan cepat.

Berikut cara kerjanya:

1.  **Deteksi dan Respons Keruntuhan**  
    Crashlytics mengidentifikasi sebuah keruntuhan, dan Capgo memungkinkan Anda menerapkan perbaikan secara instan tanpa menunggu persetujuan toko aplikasi.
    
2.  **Pembaruan Terarah**
    
    -   _Pengujian Beta_: Uji perbaikan dengan kelompok tertentu untuk memastikan efektifitasnya.
    -   _Penerapan Bertahap_: Secara bertahap menerapkan pembaruan untuk mengurangi risiko.
    -   _Perbaikan Darurat_: Dengan cepat dorong patch kritis untuk menyelesaikan masalah mendesak.
3.  **Pemantauan dan Verifikasi**  
    Setelah menerapkan pembaruan dengan Capgo, gunakan Crashlytics untuk melacak tingkat keruntuhan dan memastikan masalah telah teratasi.
    

### Keamanan dan Aturan Toko Aplikasi

Capgo mematuhi kebijakan Apple dan Google sambil menyediakan fitur keamanan yang kuat:

-   Tingkat keberhasilan global 82% untuk mengirimkan pembaruan [\[1\]](https://capgo.app/)
-   Kontrol versi otomatis untuk organisasi yang lebih baik
-   Kepatuhan terhadap pedoman pembaruan langsung toko aplikasi

Untuk integrasi yang aman dengan Crashlytics:

-   Aktifkan pelacakan kesalahan di kedua sistem.
-   Gunakan alat pemantauan Capgo bersamaan dengan laporan Crashlytics.
-   Pertahankan kontrol versi untuk semua pembaruan.
-   Simpan log terperinci dari pembaruan untuk tujuan audit.

Lanjutkan ke bagian Opsi Plugin untuk menjelajahi alat pembaruan langsung lainnya.

## Opsi Plugin

Memilih plugin pelaporan keruntuhan yang tepat dapat sangat mempengaruhi bagaimana Anda mengidentifikasi dan memperbaiki kesalahan di aplikasi Anda.

Berikut adalah perbandingan cepat antara Crashlytics dengan alat pelaporan kesalahan populer lainnya untuk Capacitor:

-   **[Sentry](https://sentry.io/)**: Menawarkan tingkat gratis dengan rencana berbayar mulai dari $26/bulan. Mendukung lebih dari 30 platform dan menyediakan pemantauan kesalahan secara real-time dengan konteks yang rinci.
-   **[Bugsnag](https://www.bugsnag.com/)**: Mulai dari $47/bulan. Mencakup platform mobile dan web, dengan fitur pengelompokan kesalahan otomatis dan pelacakan rilis.
-   **[Rollbar](https://rollbar.com/)**: Dihargai mulai dari $31/bulan. Bekerja di berbagai platform, dengan fitur pelacakan penerapan dan pelacakan individu.

Crashlytics sangat menarik bagi tim yang sudah menggunakan Firebase, berkat integrasinya yang mulus dan tingkat gratis.

## Ringkasan

Berikut adalah sekilas tentang apa yang telah Anda capai dan apa yang akan datang selanjutnya:

### Rangkuman Langkah Persiapan

Anda telah menyelesaikan tiga langkah kunci untuk memulai:

-   Membuat proyek Firebase dan mendaftarkan aplikasi iOS/Android Anda.
-   Menginstal dan mengonfigurasi plugin Crashlytics.
-   Memperbarui file platform iOS dan Android yang diperlukan.

### Mengapa Mengintegrasikan Alat Ini?

Menggabungkan Firebase Crashlytics dengan Capgo memberikan Anda sistem yang kuat untuk pelacakan kesalahan dan [manajemen pembaruan](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Berikut adalah yang ditawarkan oleh kombinasi ini:

-   **Perbaikan cepat**: Kirim pembaruan instan dan kembalikan perubahan hanya dengan satu klik.
-   **Peluncuran yang dapat diandalkan**: Pastikan pembaruan diadopsi secara luas dan disampaikan dengan lancar kepada pengguna.

### Apa Selanjutnya?

1.  Aktifkan analitik kecelakaan yang mendetail di Firebase Console.
2.  Tambahkan Capgo ke pipeline CI/CD Anda untuk pembaruan yang lebih efisien.
3.  Gunakan [saluran Capgo](https://capgo.app/docs/webapp/channels/) untuk menguji dan merilis perbaikan langkah demi langkah.

Dengan Crashlytics dan Capgo di tempatnya, Anda siap untuk menjaga aplikasi Anda tetap berjalan lancar dan terus berkembang seiring waktu.
