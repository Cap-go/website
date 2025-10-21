---
slug: comprendiendo-el-manifiesto-de-privacidad-de-apple
title: Memahami Manifes Privasi Apple
description: >-
  Pelajari lebih lanjut tentang manifes privasi wajib Apple, pentingnya untuk
  aplikasi iOS, dan cara memenuhi persyaratan secara efektif dengan panduan yang
  jelas.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T02:23:31.365Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92-1744943188853.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Privacy Manifest, iOS, data collection, App Store, compliance, Capgo, JSON,
  updates
tag: 'Development, Mobile, Security'
published: true
locale: id
next_blog: ''
---
**Privacy Manifest Apple sekarang wajib untuk semua aplikasi iOS.** Mulai Mei 2024, setiap pengajuan App Store harus menyertakan file JSON ini untuk merinci pengumpulan data, penggunaan API, SDK pihak ketiga, dan domain jaringan. Berikut yang perlu Anda ketahui:

-   **Apa itu**: File konfigurasi JSON yang mengungkapkan:
    -   Data yang dikumpulkan dan tujuannya
    -   API dan SDK pihak ketiga yang digunakan
    -   Domain eksternal yang diakses
-   **Mengapa penting**: Memastikan transparansi dan kepatuhan dengan standar privasi Apple.
-   **Cara mematuhi**: Tambahkan manifest ke bundle aplikasi iOS Anda dan perbarui secara berkala, terutama jika menggunakan alat pembaruan langsung seperti [Capgo](https://capgo.app/).

**Tips Cepat**: Alat seperti Capgo menyederhanakan kepatuhan dengan mengotomatisasi pembaruan manifest, menawarkan penerapan instan, dan menyediakan analitik untuk melacak keberhasilan.

Lanjutkan membaca untuk mempelajari cara menyiapkan dan memverifikasi Privacy Manifest Anda, menghindari kesalahan umum, dan memastikan pembaruan lancar.

## WWDC23: Memulai dengan privacy manifest | Apple

<iframe src="https://www.youtube.com/embed/OQMF4LDqscc" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Elemen Inti Privacy Manifest

Privacy Manifest Apple mencakup tiga komponen utama:

1.  **Deklarasi Data**: Tentukan jenis data yang dikumpulkan aplikasi Anda, alasan pengumpulannya, API sensitif privasi yang digunakan, dan SDK pihak ketiga yang terintegrasi ke dalam aplikasi. Anda juga harus memberikan alasan bisnis yang jelas untuk masing-masing.
    
2.  **Domain Eksternal**: Daftar semua domain eksternal yang berkomunikasi dengan aplikasi Anda, jelaskan tujuan komunikasi, dan rincian langkah-langkah keamanan yang diterapkan.
    
3.  **Format JSON dan Penyematan**: Ikuti struktur JSON yang diperlukan Apple untuk manifest dan pastikan tertanam dalam bundle aplikasi dan paket pembaruan langsung.
    

Selanjutnya, kami akan memandu Anda membuat dan memverifikasi manifest dalam proyek Capacitor.

## Menyiapkan Privacy Manifest di [Capacitor](https://capacitorjs.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/7e137b9b90adb3934b29b03381f213c1.jpg)

### Membuat File Manifest

Mulai dengan menambahkan file bernama `ios/App/Resources/PrivacyInfo.xcprivacy` untuk mendeklarasikan penggunaan API dan pengumpulan data aplikasi Anda. Berikut contoh seperti apa file tersebut:

```json
{
  "NSPrivacyAccessedAPITypes":[{"NSPrivacyAccessedAPIType":"NSUserDefaults","NSPrivacyAccessedAPITypeReasons":["FE001"]}],
  "NSPrivacyCollectedDataTypes":[{"NSPrivacyDataType":"NSPrivacyDataTypeDeviceID","NSPrivacyDataReason":"Basic app functionality"}]
}
```

Setelah membuat file ini, buka [Xcode](https://developer.apple.com/xcode/) untuk memastikan file tersebut dimasukkan dengan benar dalam proyek Anda.

### Pengujian dan Verifikasi

Di Xcode, navigasi ke **Product > Analyze** untuk menghasilkan Laporan Privasi. Tinjau laporan dengan cermat untuk peringatan atau API yang belum dideklarasikan, dan lakukan penyesuaian yang diperlukan untuk menghindari masalah. Setelah semuanya selesai diperiksa, lanjutkan untuk menerapkan pembaruan Anda.

### Pembaruan dengan [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Setelah lulus analisis Xcode, gunakan Capgo untuk pembaruan langsung agar privacy manifest aplikasi Anda tetap up-to-date. Capgo menyediakan:

-   **Penerapan instan**: 95% pengguna menerima pembaruan dalam 24 jam [\[1\]](https://capgo.app/).
-   **Rollback satu klik** untuk perbaikan cepat.
-   **Alat analitik** untuk melacak keberhasilan pembaruan dan memastikan kepatuhan.

Paket Team Capgo dihargai $83 per bulan (ditagih tahunan), mendukung hingga 100.000 pengguna aktif bulanan (MAU) dan bandwidth 2.000 GB.

## Pedoman Kepatuhan Privasi

Setelah memverifikasi manifest Anda di Xcode, penting untuk memastikan kepatuhan privasi tetap utuh. Berikut cara menjaga semuanya tetap pada jalurnya.

### Praktik yang Direkomendasikan

Pertimbangkan menggunakan Capgo untuk mendorong pembaruan manifest secara instan, menghindari penundaan yang disebabkan oleh tinjauan App Store. Alat ini juga mendukung peluncuran bertahap, memungkinkan Anda menguji perubahan dengan analitik real-time sebelum menerapkannya ke semua pengguna [\[1\]](https://capgo.app/).

### Kesalahan Umum

Mengandalkan [pembaruan manual](https://capgo.app/docs/plugin/cloud-mode/manual-update/) bisa lambat, karena bergantung pada waktu peninjauan App Store, yang bisa memakan waktu berhari-hari atau bahkan berminggu-minggu. Ini sering kali membuat dokumentasi ketinggalan zaman. Di sisi lain, alat otomatis memungkinkan pembaruan instan, menyediakan analitik untuk memantau penerapan, dan memudahkan untuk membatalkan perubahan jika ada masalah [\[1\]](https://capgo.app/).

### Pembaruan Manual vs. Otomatis

Berikut perbandingan singkat metode pembaruan manual dan otomatis:

-   **Kecepatan Pengiriman**: Pembaruan manual bisa memakan waktu berhari-hari atau berminggu-minggu, sementara [pembaruan otomatis](https://capgo.app/docs/live-updates/update-behavior/) mencapai 95% pengguna dalam 24 jam [\[1\]](https://capgo.app/).
-   **Pelacakan Keberhasilan**: Metode manual bervariasi, tapi pembaruan otomatis mencapai tingkat keberhasilan 82% di seluruh dunia [\[1\]](https://capgo.app/).
-   **Opsi Rollback**: Pembaruan manual menawarkan pemulihan terbatas, sementara pembaruan otomatis memungkinkan rollback segera.
-   **Pemantauan**: Pemeriksaan manual memakan waktu, sedangkan alat otomatis menyediakan analitik real-time [\[1\]](https://capgo.app/).
-   **Distribusi**: Sistem manual bersifat dasar, sementara alat otomatis mendukung saluran distribusi lanjutan [\[1\]](https://capgo.app/).
-   **Keamanan**: Pembaruan manual tidak memiliki enkripsi bawaan, sedangkan sistem otomatis menggunakan enkripsi end-to-end [\[1\]](https://capgo.app/).

## Perbandingan Alat Pembaruan Langsung

Mari kita lihat perbandingan dua platform pembaruan langsung populer dan bagaimana mereka bersaing.

### Fitur Platform dan Harga

| Fitur | Capgo | [Appflow](https://ionic.io/appflow/) |
| --- | --- | --- |
| Enkripsi end-to-end | **Ya** | \-  |
| Tingkat keberhasilan pembaruan | **82% di seluruh dunia** [\[1\]](https://capgo.app/) | \-  |
| Waktu pengiriman pembaruan | **95% dalam 24 jam** [\[1\]](https://capgo.app/) | \-  |
| Kecepatan unduh bundle | **114 ms (5 MB)** [\[1\]](https://capgo.app/) | \-  |
| Biaya tahunan (paket Team) | **$996** | **$6,000** [\[1\]](https://capgo.app/) |

**Kesimpulan singkat**: Capgo menawarkan biaya tahun pertama yang jauh lebih rendah - $996 dibandingkan dengan $6,000 Appflow.

Sekarang, mari kita lihat bagaimana Capgo menonjol khususnya untuk pembaruan Privacy Manifest.

### Privacy Manifest: Manfaat Capgo

Basis kode open-source Capgo menjadikannya pilihan yang kuat untuk mengelola pembaruan Privacy Manifest. Ini memungkinkan penyesuaian cepat untuk memenuhi standar privasi yang berkembang, memastikan kepatuhan tetap dapat dikelola [\[1\]](https://capgo.app/).

## Ringkasan

Sejak Mei 2024, semua aplikasi iOS harus mematuhi persyaratan manifest wajib. Otomatisasi dapat membuat pengelolaan manifest ini jauh lebih mudah. Untuk proyek Capacitor, sertakan manifest Anda dalam bundle iOS dan gunakan alat seperti Capgo untuk mengotomatisasi pembaruan secara aman, berkat enkripsi end-to-end-nya.

Dengan manifest Anda yang sudah diatur dan pembaruan yang diotomatisasi, berikut beberapa praktik kunci untuk memastikan pembaruan Privacy Manifest yang lancar:

-   Gunakan alat CLI untuk menyederhanakan penerapan.
-   Terapkan sistem saluran untuk kontrol peluncuran pembaruan.
-   Simpan dokumentasi rinci tentang proses pengumpulan data Anda.
-   Uji dan verifikasi kepatuhan privasi secara berkala.
