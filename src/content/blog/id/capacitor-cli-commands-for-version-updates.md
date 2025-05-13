---
slug: capacitor-cli-commands-for-version-updates
title: Comandos de la CLI de Capacitor para Actualizaciones de Versión
description: Capacitor CLIを使用してアプリを更新するための基本的なコマンドとベストプラクティスを学び、最適なパフォーマンスと互換性を確保しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-11T21:28:20.329Z
updated_at: 2025-05-11T21:29:40.056Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/682028f45e3fe4823b5e5a52-1746998980056.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, CLI, app updates, mobile development, iOS, Android, migration,
  Capgo, plugins
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI menyederhanakan [memperbarui aplikasi Anda](https://capgo.app/plugins/capacitor-updater/) untuk iOS dan Android. Berikut yang perlu Anda ketahui:

1.   **Mengapa Memperbarui?** Tetap aman, tingkatkan kinerja, dan pastikan kompatibilitas dengan versi OS seluler terbaru.
2.   **Perintah Utama:** Gunakan `npm install @capacitor/cli@latest` untuk memperbarui Capacitor CLI, `npx cap migrate` untuk menerapkan perubahan, dan `npx cap sync` untuk [menyelesaikan pembaruan](https://capgo.app/docs/plugin/cloud-mode/hybrid-update).
3.   **Langkah-Langkah Spesifik Platform:** Perbarui iOS dengan [CocoaPods](https://cocoapods.org/) (`pod install`) dan pengaturan [Xcode](https://developer.apple.com/xcode/). Untuk Android, sesuaikan konfigurasi [Gradle](https://gradle.org/) dan periksa versi Java.
4.   **Gunakan [Capgo](https://capgo.app/) untuk Pembaruan Langsung:** Terapkan perubahan secara instan tanpa menunggu penundaan dari toko aplikasi, dengan fitur seperti rollback dan analitik waktu nyata.

Memperbarui memastikan aplikasi Anda tetap efisien dan ramah pengguna. Ikuti langkah-langkah di atas untuk proses yang lancar.

## Cara Memindahkan Aplikasi Ionic Anda ke [Capacitor](https://capacitorjs.com/) 3

![Capacitor](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/d5H729a-rBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Sebelum Anda Memperbarui

Menghabiskan waktu untuk mempersiapkan sebelum memperbarui dapat menyelamatkan Anda dari sakit kepala di kemudian hari. Sedikit kerja keras membantu menghindari jebakan umum dan memastikan semuanya berjalan lancar. Berikut yang perlu Anda fokuskan untuk meminimalkan risiko selama [proses pembaruan](https://capgo.app/docs/plugin/cloud-mode/manual-update/).

### Periksa Persyaratan Sistem

Yang pertama kali - pastikan pengaturan pengembangan Anda memenuhi persyaratan untuk Capacitor. Versi 6 dan 7 memiliki kebutuhan perangkat lunak tertentu [\[1\]](https://capgo.app).

Berikut yang harus Anda verifikasi:

1.   **Node.js**: Periksa bahwa versi Node.js Anda kompatibel.
2.   **Alat Spesifik Platform**:
    -   Untuk pengembangan iOS, pastikan Anda memiliki versi terbaru dari Xcode terinstal.
    -   Untuk Android, pastikan bahwa [Android Studio](https://developer.android.com/studio) diperbarui.

### Baca Catatan Pembaruan

Catatan pembaruan adalah peta jalan Anda untuk memahami bagaimana perubahan dapat memengaruhi proyek Anda. Luangkan waktu untuk meninjau yang berikut:

1.   **Dokumentasi Resmi**: Lihat melalui changelog dan panduan migrasi Capacitor.
2.   **Perubahan yang Mengganggu**: Perhatikan bagian yang diberi label "Perubahan yang Mengganggu." Ini sering menyoroti pembaruan penting yang dapat mengganggu alur kerja Anda.
3.   **Kompatibilitas Plugin**: Periksa kembali bahwa semua plugin Capacitor dalam proyek Anda didukung oleh versi baru.

## Perintah Pembaruan CLI

Perintah-perintah ini membantu Anda memperbarui aplikasi Anda sambil memastikan semuanya tetap berjalan lancar.

### Perbarui Capacitor CLI

Untuk mengakses fitur terbaru, perbarui Capacitor CLI Anda. Buka terminal Anda dan jalankan:

```bash
npm install -g @capacitor/cli@latest
```

Setelah terinstal, konfirmasikan pembaruan dengan memeriksa versi CLI Anda:

```bash
npx cap --version
```

### Jalankan Perintah Migrasi

Di direktori proyek Anda, jalankan perintah berikut untuk memperbarui paket inti dan spesifik platform Capacitor:

```bash
# Update core Capacitor packages
npm install @capacitor/core@latest
npm install @capacitor/cli@latest

# Update platform-specific packages
npm install @capacitor/ios@latest
npm install @capacitor/android@latest

# Run the migration command
npx cap migrate
```

Perintah `npx cap migrate` akan:

1.   Memperbarui konfigurasi aplikasi Anda
2.   Menyinkronkan ketergantungan
3.   Menerapkan perubahan proyek yang diperlukan
4.   Memvalidasi plugin untuk kompatibilitas

Jika beberapa pembaruan tidak ditangani secara otomatis, Anda mungkin perlu menyelesaikannya secara manual.

### Lengkapi Langkah Manual

Untuk menyinkronkan proyek Anda dengan platform yang diperbarui, jalankan:

```bash
npx cap sync
```

Untuk otomatisasi tambahan, Anda dapat mengintegrasikan alat CLI Capgo dengan menjalankan:

```bash
npx @capgo/cli init
```

Akhirnya, verifikasi pembaruan dengan membangun aplikasi Anda untuk setiap platform:

```bash
# For iOS
npx cap open ios

# For Android
npx cap open android
```

Jika Anda menghadapi masalah selama pembaruan, CLI akan memberikan pesan kesalahan yang detail untuk membantu pemecahan masalah. Pastikan untuk meninjau keluaran build untuk peringatan atau kesalahan yang mungkin memerlukan perhatian Anda.

## Pembaruan Platform

Dengan pembaruan inti selesai, langkah selanjutnya adalah penyempurnaan konfigurasi platform untuk proyek iOS dan Android.

### Langkah Pembaruan iOS

Untuk memulai proyek iOS Anda, buka di Xcode dan ikuti langkah-langkah berikut:

1.   **Perbarui Ketergantungan CocoaPods**  
    Mulailah dengan menyegarkan ketergantungan Anda menggunakan CocoaPods. Arahkan ke direktori proyek iOS Anda dan jalankan perintah berikut:
    
    ```bash
    cd ios/App
    pod install
    ```
    
2.   **Konfigurasi Pengaturan Xcode**  
    Pastikan pengaturan Xcode ini diperbarui untuk memastikan operasi yang lancar dan kepatuhan:
    
    | **Pengaturan** | **Tindakan yang Diperlukan** | **Tujuan** |
    | --- | --- | --- |
    | Target Penyebaran | Tetapkan versi iOS minimum | Memastikan kompatibilitas |
    | Pengaturan Build | Perbarui identitas tanda tangan | Memenuhi persyaratan App Store |
    | Katalog Aset | Verifikasi ikon dan aset splash | Mempertahankan konsistensi visual |
    
3.   **Bersihkan Build**  
    Hapus file cache dan lakukan build bersih untuk menghindari masalah yang tersisa:
    
    ```bash
    # Clean the build folder
    xcodebuild clean
    # Build the project
    xcodebuild build
    ```
    

Setelah pembaruan iOS selesai, Anda dapat mengalihkan perhatian Anda ke proyek Android.

### Langkah Pembaruan Android

Untuk Android, buka proyek di Android Studio dan ikuti langkah-langkah berikut:

1.   **Perbarui Konfigurasi Gradle**  
    Buka file `build.gradle` Anda dan pastikan pengaturan ini dikonfigurasi dengan benar:
    
    ```kotlin
    android {
        compileSdkVersion 33
        defaultConfig {
            minSdkVersion 22
            targetSdkVersion 33
        }
    }
    ```
    
2.   **Sinkronkan File Proyek**  
    Sinkronkan proyek dengan file Gradle untuk memastikan semua ketergantungan diperbarui. Langkah ini mungkin juga melibatkan pembaruan alat SDK dan menyelesaikan konflik apa pun.
    
3.   **Verifikasi Versi Java**  
    Periksa bahwa Anda menggunakan versi Java yang benar, karena ini sangat penting untuk kompatibilitas dengan Gradle dan fitur Android:
    
    ```bash
    # Check the current Java version
    ./gradlew --version
    ```
    

Pastikan untuk memperhatikan konfigurasi Gradle Anda. Beberapa pembaruan mungkin memerlukan versi Gradle yang lebih baru untuk mendukung fitur Android terbaru dengan efektif.

## Pembaruan Langsung dengan [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/682028f45e3fe4823b5e5a52/0270fe931d56d422c8e52846495749c7.jpg)

Setelah platform Anda dikonfigurasi, Anda dapat menggunakan Capgo untuk menerapkan perubahan secara instan tanpa menunggu persetujuan toko aplikasi. Langkah ini meningkatkan pembaruan platform Anda dengan memungkinkan kemampuan penyebaran waktu nyata.

### Menyiapkan Capgo

Memulai dengan Capgo sangatlah sederhana. Anda dapat memulainya dengan perintah sederhana:

```bash
npx @capgo/cli init
```

Fitur ini memperlancar proses pembaruan, menjaga aplikasi Anda tetap terkini tanpa penundaan dari siklus tinjauan tradisional. Capgo kompatibel dengan Capacitor 6 dan 7, menjadikannya pilihan yang fleksibel untuk pengaturan Anda yang ada.

| **Fitur** | **Deskripsi** | **Manfaat** |
| --- | --- | --- |
| Enkripsi End-to-End | Keamanan terintegrasi untuk pembaruan | Memastikan hanya pengguna yang berwenang dapat mengakses pembaruan |
| [Sistem Saluran](https://capgo.app/docs/plugin/cloud-mode/channel-system/) | Distribusi pembaruan yang canggih | Menargetkan segmen pengguna tertentu |
| Analitik Waktu Nyata | Monitor kinerja pembaruan | Lacak tingkat keberhasilan dan keterlibatan pengguna |

### Fitur Keamanan Pembaruan

Capgo memprioritaskan pembaruan yang aman dan dapat diandalkan, mencapai tingkat adopsi 95% dalam 24 jam dan tingkat keberhasilan 82% secara global [\[1\]](https://capgo.app). Ini mencakup beberapa fitur keamanan utama:

1.   **Kemampuan Rollback**: Dengan cepat kembali ke versi sebelumnya jika ada masalah yang terjadi.
2.   **Pelacakan Kesalahan**: Identifikasi dan selesaikan masalah sebelum berdampak pada pengguna.
3.   **Distribusi Berbasis Saluran**: [Uji pembaruan dengan grup beta](https://capgo.app/blog/how-to-send-specific-version-to-users/) sebelum meluncurkannya secara luas.

### Integrasi CI/CD

Setelah langkah-langkah keamanan diterapkan, Anda dapat mengintegrasikan Capgo ke dalam pipeline CI/CD Anda untuk penyebaran yang lancar dan efisien. Capgo sudah mengonfigurasi CI/CD untuk lebih dari 50 aplikasi, menawarkan solusi hemat biaya dibandingkan opsi lainnya [\[1\]](https://capgo.app).

Berikut contoh perintah penyebaran:

```bash
npx @capgo/cli deploy --channel production
```

Capgo mendukung berbagai platform CI/CD, termasuk:

1.   [GitHub Actions](https://docs.github.com/actions)
2.   [GitLab CI](https://docs.gitlab.com/ee/ci/)
3.   [Jenkins](https://www.jenkins.io/)
4.   Pengaturan pipeline kustom

> "Kami mengonfigurasi pipeline CI/CD Anda langsung di platform pilihan Anda, apakah itu GitHub Actions, GitLab CI, atau lainnya. Kami tidak menghosting CI/CD atau mengenakan biaya untuk memeliharanya." - Capgo [\[1\]](https://capgo.app)

Untuk tim yang mencari bantuan ahli, Capgo menawarkan layanan konfigurasi CI/CD profesional seharga $2.600. Pengaturan sekali ini mencakup konfigurasi pipeline kustom dan saran ahli tentang praktik terbaik penyebaran aplikasi seluler [\[1\]](https://capgo.app).

## Memperbaiki Masalah Umum

[Pembaruan Capacitor](https://capgo.app/plugins/capacitor-updater/) kadang-kadang dapat menyebabkan masalah yang mengganggu stabilitas aplikasi Anda. Berikut cara menangani masalah umum ini dengan efektif.

### Memperbaiki Konflik Paket

Mulailah dengan memeriksa ketidakcocokan versi dalam paket Capacitor Anda. Gunakan perintah berikut:

```bash
npm ls @capacitor/core
```

Tinjau keluaran dan pastikan bahwa versi **@capacitor/core**, **@capacitor/ios**, dan **@capacitor/android** konsisten dalam file `package.json` Anda. Jika Anda menemukan konflik, perbarui atau hapus paket yang bermasalah untuk menstabilkan lingkungan Anda.

Setelah menyelesaikannya, periksa kembali bahwa semua plugin yang terinstal kompatibel dengan versi Capacitor yang diperbarui.

### Periksa Dukungan Plugin

Sebelum memperbarui, pastikan plugin Anda siap untuk bekerja dengan versi Capacitor terbaru. Gunakan perintah ini untuk mengelola dan memverifikasi kompatibilitas plugin:

| **Tindakan** | **Perintah** | **Tujuan** |
| --- | --- | --- |
| Daftar Plugin | `npx cap ls` | Menampilkan semua plugin yang terinstal |
| Periksa Versi | `npm outdated` | Mengidentifikasi plugin yang sudah ketinggalan zaman |
| Perbarui Plugin | `npm update` | Memperbarui plugin ke versi yang kompatibel |

Jika Anda menggunakan alat pembaruan langsung seperti **Capgo**, pastikan bahwa plugin Anda mendukung pembaruan dinamis. Ini membantu mencegah konflik runtime dan memastikan kinerja yang lebih lancar.

### Memecahkan Kesalahan Build

Kesalahan build dapat bervariasi tergantung pada platform, tetapi berikut adalah perbaikan spesifik platform:

**Untuk iOS:**

Bersihkan folder build Anda menggunakan perintah ini:

```bash
xcodebuild clean -workspace ios/App/App.xcworkspace -scheme App
```

**Untuk Android:**

Hapus cache Gradle dengan menjalankan:

```bash
cd android && ./gradlew clean
```

Jika kesalahan tetap muncul setelah dibersihkan, Anda mungkin perlu menambahkan kembali platform yang terpengaruh. Berikut caranya:

```bash
npx cap rm ios
npx cap rm android
npx cap add ios
npx cap add android
```

Akhirnya, jika Anda menggunakan Capgo untuk pembaruan langsung, periksa kembali bahwa konfigurasi build Anda memenuhi persyaratan platform untuk menghindari masalah lebih lanjut.

## Ringkasan

Bagian ini menyoroti langkah-langkah dan alat penting untuk [mengelola pembaruan](https://capgo.app/docs/plugin/cloud-mode/manual-update/) di Capacitor, menekankan bagaimana penggunaan efektif [perintah Capacitor CLI](https://capgo.app/docs/cli/commands/) memastikan alur kerja yang lancar dalam pengembangan aplikasi. Alat dan strategi yang dibahas bertujuan untuk menyederhanakan pembaruan sambil mengurangi risiko yang mungkin terjadi.

Sebelumnya, kami mencatat bahwa Capgo mendukung **1.7K aplikasi produksi**, mencapai **82% tingkat keberhasilan pembaruan** [\[1\]](https://capgo.app). Fitur pembaruan instan memungkinkan **95% pengguna untuk memperbarui dalam 24 jam** [\[1\]](https://capgo.app), menunjukkan efisiensinya.

Berikut adalah sekilas tentang metrik kinerja Capgo:

| Metrik | Kinerja |
| --- | --- |
| Waktu Respon API Global | 434ms |
| Kecepatan Unduh Bundle 5MB | 114ms |
| Tingkat Keberhasilan Pembaruan | 82% |

> "Kami menerapkan pengembangan agile dan @Capgo sangat penting untuk memberikan secara terus-menerus kepada pengguna kami!" - Rodrigo Mantica [\[1\]](https://capgo.app)

Alat pembaruan modern menawarkan beberapa manfaat yang mencolok:

-   **Enkripsi end-to-end** untuk pengiriman pembaruan yang aman
-   **Pembaruan parsial**, yang menghemat bandwidth dengan hanya mengunduh komponen yang dimodifikasi
-   **Rollback satu klik** untuk pemulihan cepat jika terjadi masalah
-   **Analitik real-time** untuk memantau kinerja pembaruan dan keterlibatan pengguna

Fitur-fitur ini mendasari kerangka kerja yang kuat untuk mengelola [pembaruan versi](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/) secara efektif.

Apakah Anda sedang mengerjakan aplikasi kecil atau meningkatkan penyebaran yang lebih besar, menggabungkan Capacitor CLI dengan alat pembaruan yang canggih memastikan kontrol versi yang dapat diandalkan dan efisien di lanskap pengembangan yang bergerak cepat saat ini.

## Tanya Jawab

::: faq
### Apa tantangan yang mungkin saya temui saat memperbarui aplikasi saya menggunakan Capacitor CLI, dan bagaimana saya dapat mengatasinya?

Saat Anda memperbarui aplikasi Anda dengan Capacitor CLI, Anda mungkin menghadapi beberapa kendala di sepanjang jalan. Tantangan umum termasuk **konflik ketergantungan**, **perubahan besar dalam plugin**, atau **masalah konfigurasi spesifik platform**. Masalah-masalah ini sering muncul dari perbedaan antara versi Capacitor atau pembaruan pada plugin pihak ketiga.

Berikut adalah cara Anda dapat mengatasi tantangan ini:

-   **Periksa catatan rilis** untuk versi baru yang Anda tuju. Perhatikan perubahan besar atau penyesuaian yang perlu Anda buat.
-   **Uji pembaruan di lingkungan staging** sebelum diluncurkan ke produksi. Ini membantu Anda menangkap dan memperbaiki masalah sebelum berdampak pada pengguna.
-   Secara teratur perbarui ketergantungan dan plugin Anda untuk mengurangi risiko masalah kompatibilitas.

Untuk pengalaman pembaruan yang lebih lancar, Anda mungkin ingin mencoba alat seperti _Capgo_. Alat ini memungkinkan Anda mengirimkan perbaikan dan fitur baru langsung kepada pengguna Anda tanpa memerlukan persetujuan dari toko aplikasi. Ini adalah cara yang bagus untuk menjaga aplikasi Anda tetap terbaru dengan waktu henti yang minimal.
:::

::: faq
### Bagaimana Capgo menyederhanakan pembaruan aplikasi, dan apa fitur andalannya?

Capgo menyederhanakan cara pengembang mengirimkan [pembaruan aplikasi](https://capgo.app/plugins/capacitor-updater/) dengan memungkinkan mereka mengirimkan perubahan, perbaikan, dan fitur baru langsung kepada pengguna - melewati kebutuhan persetujuan dari toko aplikasi. Dengan ini, pengguna Anda dapat menikmati pembaruan terbaru hanya dalam beberapa menit, menciptakan pengalaman yang lebih lancar dan efisien.

Berikut adalah yang membuat Capgo menonjol:

-   **Enkripsi end-to-end** memastikan pembaruan Anda tetap aman.
-   **Integrasi CI/CD** membantu mempertahankan alur kerja yang terintegrasi.
-   **Pembaruan spesifik pengguna** memungkinkan peluncuran yang tepat dan terarah.
-   **Manajemen organisasi yang fleksibel** mendukung tim dari berbagai ukuran.

Capgo sepenuhnya open-source dan mematuhi standar Apple dan Android, menawarkan solusi yang dapat diandalkan untuk [pembaruan aplikasi real-time](https://capgo.app/blog/live-updates-for-flutter-app/).
:::

::: faq
### Bagaimana saya dapat memeriksa apakah plugin saya kompatibel dengan versi terbaru dari Capacitor sebelum melakukan pembaruan?

Sebelum melangkah ke versi terbaru dari Capacitor, penting untuk memeriksa kembali bahwa plugin Anda siap menangani pembaruan. Mulailah dengan menggali dokumentasi atau repositori plugin untuk melihat apakah ada persyaratan atau pembaruan spesifik versi. Sebagian besar plugin jelas menunjukkan versi Capacitor yang mereka dukung, sehingga langkah ini dapat menyelamatkan Anda dari sakit kepala yang tidak perlu.

Anda juga dapat menguji aplikasi Anda di lingkungan terkontrol dengan versi Capacitor yang diperbarui. Ini memungkinkan Anda menemukan dan memperbaiki masalah kompatibilitas sebelum pembaruan diluncurkan secara langsung di produksi. Alat seperti **Capgo** dapat sangat membantu di sini, memungkinkan Anda mengirimkan pembaruan langsung tanpa memerlukan persetujuan dari toko aplikasi. Ini berarti Anda dapat dengan cepat menangani masalah terkait plugin sambil tetap berada dalam pedoman platform.
:::
