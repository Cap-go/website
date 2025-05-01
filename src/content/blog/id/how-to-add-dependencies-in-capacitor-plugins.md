---
slug: how-to-add-dependencies-in-capacitor-plugins
title: Cómo Agregar Dependencias en Plugins de Capacitor
description: >-
  Découvrez comment gérer les dépendances des plugins Capacitor sur différentes
  plateformes avec des étapes pratiques et les meilleures pratiques.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-27T02:08:04.837Z
updated_at: 2025-03-27T02:08:34.795Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e4966a10051fda3b63500a-1743041314795.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capacitor, plugin dependencies, iOS, Android, JavaScript, CocoaPods, Gradle,
  development tools
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

**Menambahkan dependensi ke [Capacitor](https://capacitorjscom/) plugin mungkin terasa rumit, namun akan lebih mudah jika dipecah menjadi langkah-langkah yang jelas. Berikut yang perlu Anda ketahui:**

1. **Memahami tools**:
    
    - **JavaScript**: Gunakan `npm` untuk mengelola dependensi
    - **iOS**: Gunakan [CocoaPods](https://cocoapodsorg/) atau Swift Package Manager (SPM)  
    - **Android**: Gunakan [Gradle](https://gradleorg/) untuk manajemen dependensi

2. **Siapkan lingkungan pengembangan Anda**:
    
    - Install tools seperti [Nodejs](https://nodejsorg/en), [npm](https://wwwnpmjscom/), [Xcode](https://developerapplecom/xcode/), [Android Studio](https://developerandroidcom/studio), CocoaPods, dan JDK

3. **Mulai [proyek plugin Capacitor](https://capgoapp/blog/capacitor-comprehensive-guide/) Anda**:
    
    - Gunakan `npm init @capacitor/plugin` untuk membuat plugin baru

4. **Tambahkan dependensi JavaScript**:
    
    - Gunakan `npm install` untuk dependensi produksi dan pengembangan
    - Perbarui `packagejson` untuk menyertakan peer dependencies seperti `@capacitor/core`

5. **Menangani dependensi khusus platform**:
    
    - **iOS**: Konfigurasi CocoaPods atau SPM dengan library seperti [Alamofire](https://githubcom/Alamofire/Alamofire) atau [SwiftyJSON](https://githubcom/SwiftyJSON/SwiftyJSON)
    - **Android**: Gunakan Gradle untuk menambahkan dependensi seperti Gson atau AppCompat

6. **Optimalkan kinerja**:
    
    - Pin versi, audit dependensi, dan selesaikan konflik untuk memastikan stabilitas

7. **Gunakan tools seperti [Capgo](https://capgoapp/) untuk pembaruan langsung**:
    
    - Push pembaruan secara instan tanpa review app store

**Perbandingan Singkat Tools**:

| Platform | Tool | Contoh Dependensi |
| --- | --- | --- |
| JavaScript | npm | `npm install lodash --save` |
| iOS | CocoaPods/SPM | `pod 'Alamofire', '~> 564'` |
| Android | Gradle | `implementation 'comgooglecodegson:gson:2101'` |

**Mengapa ini penting**: Mengelola dependensi secara efektif memastikan plugin Anda bekerja dengan lancar di semua platform, menghemat waktu, dan menghindari kesalahan. Mari kita dalami langkah-langkahnya

## Cara membuat plugin [Capacitor](https://capacitorjscom/) untuk iOS/Android

![Capacitor](https://mars-imagesimgixnet/seobot/screenshots/capacitorjscom-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-27jpg?auto=compress)

<Steps>

## Menyiapkan Lingkungan Pengembangan Anda

Siapkan setup Anda dengan tools yang diperlukan untuk menangani dependensi [plugin Capacitor](https://capgoapp/blog/capacitor-comprehensive-guide/) secara efektif

### Tools Pengembangan yang Diperlukan

Berikut daftar tools yang Anda butuhkan:

| Tool | Versi | Tujuan |
| --- | --- | --- |
| Nodejs | 1600+ | Lingkungan runtime JavaScript |
| npm | 800+ | Manajemen paket |
| Xcode | 140+ | Pengembangan iOS (hanya Mac) |
| Android Studio | Electric Eel+ | Pengembangan Android |
| CocoaPods | 1110+ | Manajemen dependensi iOS |
| JDK | 11+ | Tools build Android |

### Memulai Plugin Baru

Gunakan Capacitor CLI untuk memulai proyek plugin Anda. Ini termasuk menyiapkan platform dan memberi nama plugin Anda menggunakan format reverse-domain (mis. `commycompanyplugin`):

1. Jalankan perintah berikut:
    `npm init @capacitor/plugin`
2. Pilih platform target Anda (iOS/Android)
3. Berikan nama untuk plugin Anda dalam format reverse-domain

### Langkah-langkah Setup Proyek

1. **Perbarui `packagejson`**
    
    Modifikasi `packagejson` Anda untuk menyertakan yang berikut:
    
    [[CODE_BLOCK]]
    
2. **Setup Khusus Platform**
    
    - Untuk **iOS**, pastikan Podfile Anda menyertakan:
        
        [[CODE_BLOCK]]
        
    - Untuk **Android**, verifikasi `buildgradle` Anda berisi:
        
        [[CODE_BLOCK]]
        
3. **Siapkan Variabel Lingkungan**
    
    Konfigurasi variabel lingkungan berikut untuk tools pengembangan Anda:
    
    | Variabel | Tujuan | Contoh Nilai |
    | --- | --- | --- |
    | ANDROID_HOME | Lokasi Android SDK | /Users/username/Library/Android/sdk |
    | JAVA_HOME | Path instalasi JDK | /Library/Java/JavaVirtualMachines/jdk-11012jdk/Contents/Home |
    | XCODE\_SELECT | Tools command line Xcode | /Applications/Xcodeapp/Contents/Developer |
    

Setelah project Anda siap, Anda siap untuk melanjutkan ke pengelolaan dependensi JavaScript

## Dependensi JavaScript

Mengelola dependensi JavaScript secara efektif adalah kunci untuk menjaga kinerja plugin yang stabil

### Instalasi Package [npm](https://wwwnpmjscom/)

![npm](https://mars-imagesimgixnet/seobot/screenshots/wwwnpmjscom-ac76028e07fa565ed4006978107f5ce6-2025-03-27jpg?auto=compress)

Untuk menginstal dependensi, gunakan perintah berikut:

[[CODE_BLOCK]]

Pastikan untuk menyertakan peer dependencies secara manual di file `packagejson` Anda. Uji semua dependensi untuk memastikan kompatibilitas di platform web dan native

### Mengelola packagejson

Berikut contoh konfigurasi `packagejson`:

[[CODE_BLOCK]]

Untuk menjaga konsistensi, kunci versi dependensi dengan tepat:

| Tipe Constraint | Contoh | Kasus Penggunaan |
| --- | --- | --- |
| Exact | "500" | Untuk dependensi kritis yang membutuhkan versi spesifik |
| Caret | "^500" | Mengizinkan pembaruan minor dan patch |
| Tilde | "~500" | Membatasi pembaruan hanya untuk patch |

### Menggunakan Library JavaScript

Saat mengimpor library, fokus pada pengurangan ukuran bundle:

[[CODE_BLOCK]]

Selain itu, pastikan penanganan error dan pemeriksaan tipe yang tepat:

[[CODE_BLOCK]]

Selanjutnya, pelajari cara menangani dependensi khusus platform untuk iOS

## Dependensi iOS 

Bagian ini menjelaskan cara mengelola dependensi iOS native dalam [plugin Capacitor](https://capgoapp/plugins/). Setelah Anda menyiapkan dependensi JavaScript, langkah selanjutnya adalah menangani dependensi iOS native

### Pengaturan [CocoaPods](https://cocoapodsorg/)

![CocoaPods](https://mars-imagesimgixnet/seobot/screenshots/cocoapodsorg-fd202c6f9998fdf4cafb9b363e43119c-2025-03-27jpg?auto=compress)

Mulai dengan menginisialisasi CocoaPods di direktori iOS Anda:

[[CODE_BLOCK]]

Kemudian, perbarui file `Pluginpodspec` Anda dengan konfigurasi berikut:

[[CODE_BLOCK]]

### Konfigurasi Podfile

Setelah menginisialisasi CocoaPods, konfigurasikan Podfile untuk menyertakan Capacitor dan library pihak ketiga tambahan:

[[CODE_BLOCK]]

Berikut beberapa pola konfigurasi dependensi yang umum:

| Tipe Constraint | Contoh | Kasus Penggunaan |
| --- | --- | --- |
| Versi Exact | `pod 'KeychainAccess', '422'` | Ketika kontrol presisi diperlukan, seperti untuk komponen keamanan |
| Versi Minor | `pod 'Alamofire', '~> 56'` | Untuk API stabil yang mungkin menerima pembaruan patch |
| Versi Major | `pod 'SwiftyJSON', '> 50'` | Ketika fleksibilitas di seluruh pembaruan dapat diterima |

### Dependensi Swift Package

Jika Anda lebih suka tidak menggunakan CocoaPods, Swift Package Manager (SPM) adalah alternatif yang baik. Tambahkan dependensi SPM langsung di Xcode dengan konfigurasi berikut di file `Packageswift` Anda:

[[CODE_BLOCK]]

Untuk menggunakan dependensi SPM dalam kode plugin Anda, impor dan integrasikan sesuai kebutuhan. Contohnya:

[[CODE_BLOCK]]

Pendekatan ini memungkinkan Anda memilih antara CocoaPods dan Swift Package Manager berdasarkan kebutuhan proyek Anda

## Dependensi Android

Siapkan dependensi Android untuk memastikan integrasi native yang lancar. Berikut cara mengelola dependensi untuk plugin Capacitor Anda

### Dependensi [Gradle](https://gradleorg/)

![Gradle](https://mars-imagesimgixnet/seobot/screenshots/gradleorg-85d271057dfb5e2e134ec99beaad5682-2025-03-27jpg?auto=compress)

Tambahkan konfigurasi berikut ke file `buildgradle` Anda:

[[CODE_BLOCK]]

Tentukan versi tambahan di blok `buildscript`:

[[CODE_BLOCK]]

Setelah dependensi dikonfigurasi, pastikan untuk menyiapkan repositori yang diperlukan

### Konfigurasi Repositori

Di `buildgradle` level proyek Anda, sertakan repositori Maven yang diperlukan:

[[CODE_BLOCK]]

Jika Anda menggunakan repositori Maven kustom atau pribadi, tambahkan kredensial seperti ini:

[[CODE_BLOCK]]

Dengan repositori yang sudah disiapkan, atasi konflik dependensi yang mungkin muncul

### Memperbaiki Masalah Kompatibilitas

Untuk menangani konflik dependensi, terapkan resolusi versi di `build` Andagradle`:

[[CODE_BLOCK]]

Berikut adalah strategi untuk menyelesaikan masalah dependensi umum:

| Jenis Masalah | Strategi | Contoh |
| --- | --- | --- |
| Konflik Versi | Memaksa versi tertentu | `force 'comgooglecodegson:gson:2101'` |
| Beberapa Versi | Mengecualikan modul | `exclude group: 'orgjson', module: 'json'` |
| Masalah Transitif | Gunakan versi ketat | `strictly 'androidxcore:core-ktx:1101'` |

Misalnya, Anda dapat mengecualikan modul yang berkonflik seperti ini:

[[CODE_BLOCK]]

Terakhir, optimalkan proses build Anda dengan mengaktifkan caching dan eksekusi paralel di `gradleproperties`:

[[CODE_BLOCK]]

## Integrasi [Capgo](https://capgoapp/)

![Capgo](https://mars-imagesimgixnet/seobot/screenshots/capgoapp-26aea05b7e2e737b790a9becb40f7bc5-2025-03-27jpg?auto=compress)

Menggunakan Capgo bersama dengan manajemen dependensi native dan JavaScript membuat pembaruan plugin Anda lebih cepat dan mudah

### Tentang Capgo

Capgo adalah platform pembaruan langsung yang dirancang untuk plugin dan aplikasi Capacitor. Dengan lebih dari 235 juta pembaruan yang disampaikan di 750 aplikasi produksi [\[1\]](https://capgoapp/), Capgo memungkinkan pengembang untuk mendorong pembaruan untuk dependensi dan kode secara instan - tanpa perlu peninjauan app store. Pembaruan diamankan dengan enkripsi end-to-end dan memenuhi standar kepatuhan Apple dan Android

### Fitur Pembaruan Capgo

Capgo menyederhanakan pengelolaan dependensi plugin dengan fitur-fitur berikut:

| Fitur | Fungsinya | Metrik Utama |
| --- | --- | --- |
| Pembaruan Langsung | Dorong pembaruan dalam hitungan menit | 95% tingkat pembaruan pengguna dalam 24 jam |
| Pembaruan Parsial | Unduh hanya file yang berubah | 434ms rata-rata waktu respons API |
| Kontrol Versi | Kelola beberapa versi | 82% tingkat keberhasilan global |
| Sistem Saluran | Target grup pengguna tertentu | Mendukung beberapa saluran deployment |

Sumber: [\[1\]](https://capgoapp/)

Capgo bekerja dengan mulus dengan alat CI/CD seperti GitHub Actions, GitLab CI, dan Jenkins, mengotomatisasi pembaruan dependensi dan memastikan versi plugin yang konsisten. Alat-alat ini memudahkan integrasi Capgo ke dalam alur kerja Anda

### Menyiapkan Capgo

Ikuti langkah-langkah berikut untuk mengintegrasikan Capgo ke dalam proyek Anda:

1. **Instal Capgo CLI**
    
    Jalankan perintah berikut di terminal Anda:
    
    [[CODE_BLOCK]]
    
2. **Konfigurasi Preferensi Pembaruan**
    
    Gunakan dashboard Capgo untuk menyiapkan saluran deployment dan preferensi. Konfigurasi yang di-host di cloud dan self-hosted didukung
    
3. **Tambahkan Logika Pembaruan**
    
    Tambahkan kode ini ke file plugin utama Anda untuk mengaktifkan pembaruan:
    
    [[CODE_BLOCK]]
    

> "Kami menerapkan pengembangan agile dan @Capgo sangat penting dalam memberikan layanan secara berkelanjutan kepada pengguna kami!" - Rodrigo Mantica

Capgo juga menyediakan dashboard analitik untuk wawasan real-time tentang tingkat keberhasilan pembaruan dan aktivitas pengguna. Fitur seperti rollback satu klik dan pelacakan kesalahan membantu menyelesaikan masalah dengan cepat, menjaga pembaruan plugin Anda berjalan lancar

## Kesimpulan

### Tinjauan Proses

Mengelola dependensi untuk plugin Capacitor melibatkan penyelarasan komponen native (iOS dan Android) dengan komponen JavaScript mereka untuk memastikan integrasi yang lancar. Proses ini mencakup pengaturan khusus platform dan mengelola paket JavaScript untuk mencapai kinerja terbaik. Mengikuti langkah-langkah yang diuraikan akan membantu mempertahankan fungsionalitas plugin yang stabil dan efisien

### Praktik Terbaik

Untuk mengelola dependensi secara efektif, pertimbangkan praktik-praktik ini:

| Praktik | Manfaat | Cara Implementasi |
| --- | --- | --- |
| Penetapan Versi | Menghindari masalah tak terduga | Gunakan versi tetap di `packagejson` |
| Isolasi Platform | Meminimalkan konflik | Pisahkan dependensi native |
| Pembaruan Rutin | Meningkatkan keamanan | Terapkan patch kritis segera |
| Audit Dependensi | Mendeteksi risiko | Jalankan `npm audit` secara rutin |

Menggunakan alat pembaruan langsung seperti Capgo dapat lebih menyederhanakan dan meningkatkan praktik-praktik ini dengan memungkinkan pembaruan real-time

### Manfaat Capgo

Capgo menyederhanakan proses manajemen dependensi sambil memberikan kinerja yang kuat