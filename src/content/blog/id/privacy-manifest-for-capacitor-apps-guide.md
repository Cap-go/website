---
slug: guide-sur-la-politique-de-confidentialité-pour-les-apps-capacitor
title: 'Kebijakan Privasi untuk Aplikasi Capacitor: Panduan'
description: >-
  Pelajari cara membuat Kebijakan Privasi untuk aplikasi Anda guna memenuhi
  persyaratan App Store dan melindungi data pengguna secara efektif.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T03:07:47.047Z
updated_at: 2025-04-02T03:08:00.473Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776-1743563280473.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Privacy Manifest, Capacitor, App Store compliance, user data protection, app
  development, privacy standards
tag: 'Development, Mobile, Security'
published: true
locale: id
next_blog: ''
---
**Ingin meluncurkan aplikasi [Capacitor](https://capacitorjs.com/) Anda di [App Store](https://en.wikipedia.org/wiki/App_Store_\(Apple\)) tanpa penundaan?** Mulailah dengan membuat Privacy Manifest. Apple kini mewajibkan pengembang untuk menyertakan dokumen ini untuk memastikan aplikasi memenuhi standar privasi yang ketat. Berikut yang perlu Anda ketahui:

-   **Apa itu Privacy Manifest?**  
    Sebuah file terstruktur yang menguraikan praktik pengumpulan data aplikasi Anda, penggunaan API, dan domain pelacakan.
    
-   **Mengapa ini penting:**
    
    -   Mematuhi aturan App Store untuk menghindari penolakan atau penghapusan.
    -   Membangun kepercayaan dengan bersikap transparan tentang penanganan data pengguna.
-   **Komponen utama yang harus disertakan:**
    
    -   API yang mengakses data pengguna (mis., lokasi, foto).
    -   Label privasi untuk jenis data yang dikumpulkan.
    -   Domain pelacakan yang digunakan untuk analitik atau iklan.
-   **Cara membuatnya:**
    
    -   Gunakan JSON untuk mendefinisikan detail pengumpulan data.
    -   Tempatkan file `PrivacyInfo.xcprivacy` di direktori yang tepat dalam proyek Anda.
    -   Validasi dengan alat seperti [Xcode](https://developer.apple.com/xcode/) untuk menghindari kesalahan.
-   **Alat untuk menyederhanakan proses:**  
    Gunakan platform seperti [Capgo](https://capgo.app/) untuk validasi privacy manifest otomatis, pembaruan real-time, dan pelacakan kesalahan.
    

**Tetap patuhi aturan, lindungi privasi pengguna, dan hindari penundaan app store dengan mengikuti panduan ini.**

## Dasar-dasar Privacy Manifest

### Definisi Privacy Manifest

Privacy manifest adalah file terstruktur yang menguraikan praktik data aplikasi Anda. File ini merinci elemen seperti API yang mengakses data pengguna, domain pelacakan, jenis data yang dikumpulkan, dan integrasi SDK pihak ketiga. Dokumen ini tidak hanya membantu membangun kepercayaan tetapi juga memastikan kepatuhan terhadap pedoman App Store. Mari kita bahas komponen utama yang harus disertakan dalam manifest Anda.

### Elemen Utama Privacy Manifest

Berikut adalah elemen utama yang harus disertakan dalam privacy manifest Anda agar sesuai dengan persyaratan Apple:

1.  **API Alasan yang Diperlukan**  
    Bagian ini mencantumkan API sensitif privasi yang digunakan aplikasi Anda dan menjelaskan mengapa API tersebut diperlukan.
    
    Berikut tabel yang merangkum persyaratan API umum:
    
    | Kategori API | Penggunaan Umum | Dokumentasi yang Diperlukan |
    | --- | --- | --- |
    | Layanan Lokasi | Navigasi pengguna | String tujuan dan deskripsi penggunaan |
    | Pustaka Foto | Foto profil | Level akses dan tujuan |
    | Kontak | Sinkronisasi buku alamat | Pernyataan minimalisasi data |
    
2.  **Label Privasi**  
    Label ini memberikan transparansi dengan menentukan:
    
    -   Jenis data yang dikumpulkan
    -   Alasan pengumpulan data
    -   Apakah data terhubung dengan identitas pengguna
    -   Bagaimana data digunakan untuk pelacakan
3.  **Domain Pelacakan**  
    Bagian ini mencantumkan semua domain yang terlibat dalam pelacakan, seperti yang digunakan untuk analitik, periklanan, atau pemrosesan data pihak ketiga.
    

> "Sesuai App Store" - Capgo [\[1\]](https://capgo.app/)

Menurut Capgo, 95% pengguna mematuhi pembaruan dalam 24 jam. Dengan lebih dari 23,5 juta pembaruan yang dikirimkan [\[1\]](https://capgo.app/), menjaga dokumentasi privasi tetap terkini sangat penting untuk mempertahankan kepercayaan pengguna.

## Membangun Privacy Manifest untuk [Capacitor](https://capacitorjs.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/7e137b9b90adb3934b29b03381f213c1.jpg)

### Persyaratan Setup

Sebelum Anda mulai membangun manifest, pastikan Anda memiliki:

-   Xcode 15 atau versi lebih baru terinstal
-   Proyek Capacitor 5.0+ yang sudah diatur
-   Akses ke file `Info.plist` aplikasi Anda
-   Pemahaman dasar tentang struktur JSON
-   Dokumentasi yang menguraikan praktik pengumpulan data aplikasi Anda

### Langkah Pembuatan

Mulailah dengan membuat file `PrivacyInfo.xcprivacy` di direktori proyek iOS Anda. File ini harus mengikuti pedoman format tertentu:

**Atur Informasi Dasar**

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": []
}
```

**Tentukan Detail Pengumpulan Data**

```json
{
    "NSPrivacyAccessedAPITypes": [
        {
            "NSPrivacyAccessedAPIType": "NSLocationWhenInUseUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["1.1"]
        },
        {
            "NSPrivacyAccessedAPIType": "NSCameraUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["2.1"]
        }
    ]
}
```

**Tambahkan Domain Pelacakan**

```json
{
    "NSPrivacyTrackingDomains": [
        "analytics.yourdomain.com",
        "metrics.yourdomain.com"
    ]
}
```

### Menghindari Kesalahan Umum

Untuk mencegah masalah, perhatikan tips berikut:

-   **Sertakan Semua Bidang yang Diperlukan**: Bahkan jika beberapa bidang kosong, bidang tersebut harus ada.
-   **Gunakan Tipe API yang Valid**: Periksa silang pengidentifikasi API dengan dokumentasi resmi Apple.
-   **Periksa Format JSON**: Jalankan file Anda melalui linter JSON untuk menangkap kesalahan sintaks.
-   **Berikan Alasan Lengkap**: Pastikan setiap akses API menyertakan kode alasan yang sesuai.
-   **Jaga Informasi Tetap Terkini**: Perbarui manifest setiap kali fitur baru ditambahkan.

Selain itu, pastikan file manifest tetap di bawah 512KB untuk menghindari kesalahan build. Secara teratur validasi file selama proses build Xcode untuk menangkap kesalahan sejak dini. Setelah manifest siap, integrasikan ke dalam proyek Capacitor dengan mengikuti pedoman penempatan file.

## Menambahkan Privacy Manifest ke Capacitor

### Panduan Penempatan File

Untuk menyertakan privacy manifest dalam proyek Capacitor Anda, tempatkan file `PrivacyInfo.xcprivacy` dalam struktur direktori berikut:

```
your-app/
├── ios/
│   ├── App/
│   │   ├── PrivacyInfo.xcprivacy
│   │   └── Info.plist
│   └── App.xcworkspace
```

Untuk plugin Capacitor, gunakan struktur ini:

```
your-plugin/
├── ios/
│   ├── Plugin/
│   │   └── PrivacyInfo.xcprivacy
│   └── Plugin.xcodeproj
```

### Setup Pengaturan Build

Setelah file ditempatkan, perbarui pengaturan build Xcode untuk memastikan integrasi yang tepat:

1.  Buka proyek Anda di Xcode.
2.  Di bawah **TARGETS**, pilih target aplikasi atau plugin Anda.
3.  Buka tab **Build Settings**.
4.  Atur **Privacy Manifest Development Region** ke `en`.
5.  Atur **Include Privacy Manifest** ke `YES`.

Jika proyek Anda menggunakan [CocoaPods](https://cocoapods.org/), sertakan snippet berikut di `Podfile` Anda untuk mengaktifkan privacy manifest:

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['INCLUDE_PRIVACY_MANIFEST'] = 'YES'
    end
  end
end
```

Setelah membuat perubahan ini, lanjutkan dengan pemeriksaan implementasi untuk memverifikasi bahwa semuanya diatur dengan benar.

### Pemeriksaan Implementasi

Untuk memastikan privacy manifest berfungsi sebagaimana dimaksud, ikuti langkah-langkah berikut:

1.  **Verifikasi Build**
    
    -   Konfirmasi tidak ada peringatan terkait privasi selama build.
    -   Pastikan manifest dikompilasi tanpa masalah.
    -   Verifikasi privacy manifest disertakan dalam produk build.
2.  **Validasi Runtime**
    
    -   Dalam mode debug, uji prompt privasi dan perilaku akses API yang tepat.
3.  **Validasi App Store Connect**
    
    -   Unggah build Anda dan tinjau Laporan Privasi di App Store Connect.
    -   Periksa bahwa deklarasi API lengkap dan format domain pelacakan sudah benar.

Jika Anda menemui kesalahan "Privacy Manifest validation failed", periksa kembali manifest Anda untuk memastikan memenuhi persyaratan App Store terbaru. Perhatikan khusus pada tipe API dan konfigurasi domain pelacakan.

## Perubahan Privacy Manifest Apple

<iframe src="https://www.youtube.com/embed/S8JnUkUkmbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Pengujian dan Perbaikan

Membuat Privacy Manifest yang memenuhi pedoman Apple sangat penting. Untuk tetap sesuai jalur, integrasikan pelacakan kesalahan yang andal ke dalam proses pengembangan Anda. Ini membantu menghubungkan upaya pengembangan dengan persyaratan kepatuhan.

Alat seperti [Capgo](https://capgo.app) dapat membantu. Ini memantau akses API dan mengidentifikasi masalah manifest sebelum mempengaruhi pengguna. Setelah potensi masalah ditandai, Anda dapat mengalihkan fokus ke validasi menyeluruh.

Setelah melakukan pembaruan, uji manifest Anda di lingkungan pengembangan. Gunakan wawasan dari pelacakan kesalahan untuk memandu tinjauan Anda. Pendekatan ini membantu memastikan aplikasi Anda tetap selaras dengan standar privasi Apple.

## Alat Privasi [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/454adbba4c00491adce88db59812b177.jpg)

Capgo menyederhanakan pengelolaan privacy manifest dan pembaruan aplikasi, memastikan standar privasi Anda tetap utuh tanpa menunda deployment.

### Fitur Capgo

Dengan lebih dari **23,5 juta pembaruan yang diamankan** dan **tingkat keberhasilan global 82%**, Capgo memastikan **95% pengguna aktif menerima pembaruan dalam 24 jam** [\[1\]](https://capgo.app/). Berikut yang ditawarkan:

-   **Enkripsi end-to-end** untuk menjaga keamanan pembaruan
-   **Sistem channel** untuk distribusi pembaruan yang terkontrol
-   **Pelacakan kesalahan** untuk mengidentifikasi dan mengatasi masalah dengan cepat
-   **Rollback satu klik** untuk langsung kembali ke versi sebelumnya

Alat-alat ini membuat penambahan Capgo ke alur kerja Anda menjadi lancar dan efisien.

### Menggunakan Capgo

Untuk memulai, [pasang plugin Capgo](https://capgo.app/docs/plugin/cloud-mode/getting-started/) dengan perintah ini:

```bash
npx @capgo/cli init
```

Capgo terintegrasi dengan mulus dengan pipeline CI/CD, mengotomatisasi validasi privacy manifest melalui platform seperti [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/), atau [Jenkins](https://www.jenkins.io/). Baik Anda memilih opsi cloud atau self-hosted, Capgo mendukung 750 aplikasi produksi sambil memastikan setiap pembaruan mematuhi standar privasi.

> "Kami menerapkan pengembangan agile dan @Capgo sangat penting dalam memberikan layanan secara berkelanjutan kepada pengguna kami!" – Rodrigo Mantica

> "Capgo adalah cara cerdas untuk melakukan hot code pushes 🙂" – NASA's OSIRIS-REx

Capgo juga menyertakan analitik bawaan untuk memantau tingkat keberhasilan pembaruan dan keterlibatan pengguna secara real-time. Ini memastikan pembaruan privasi mencapai seluruh basis pengguna Anda sambil tetap mematuhi pedoman Apple.

## Kesimpulan

### Poin Penting

Dalam mengelola privacy manifest, tetap patuh dan mempertahankan langkah-langkah keamanan yang kuat sangat penting. Berikut yang paling penting:

-   **Enkripsi end-to-end**: Menjaga keamanan pembaruan dari awal hingga akhir.
-   **Pemantauan real-time**: Melacak distribusi pembaruan secara efektif.
-   **Kemampuan rollback instan**: Bertindak sebagai jaring pengaman untuk perbaikan cepat.
-   **Validasi otomatis**: Memastikan pembaruan Anda memenuhi standar kepatuhan.

Membangun sistem pembaruan yang andal membantu Anda mengikuti persyaratan privasi Apple dan Google yang terus berkembang. Pendekatan ini terbukti meningkatkan tingkat persetujuan app store dan memperkuat kepercayaan pengguna [\[1\]](https://capgo.app/).

### Cara Memulai

Anda dapat mulai menerapkan prinsip-prinsip ini dengan mengikuti langkah-langkah berikut:

-   **Siapkan lingkungan Anda**: Jalankan `npx @capgo/cli init` untuk memulai.
-   **Aktifkan fitur privasi**: Gunakan enkripsi end-to-end untuk pembaruan yang aman.
-   **Terapkan alat pemantauan**: Lacak pembaruan dengan analitik.
-   **Rencanakan rollback**: Pastikan Anda dapat dengan cepat kembali ke versi sebelumnya jika diperlukan.

> "Capgo adalah alat yang wajib dimiliki bagi pengembang yang ingin meningkatkan produktivitas. Menghindari penundaan peninjauan untuk perbaikan bug adalah terobosan yang luar biasa." - Bessie Cooper

Pembaruan rutin dan alat yang tepat adalah kunci untuk tetap mematuhi peraturan dan meningkatkan kinerja dari waktu ke waktu.
