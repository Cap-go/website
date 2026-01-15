---
slug: apple-privacy-rules-for-capacitor-apps
title: Aturan Privasi Apple untuk Aplikasi Capacitor
description: >-
  Pelajari cara mematuhi aturan privasi Apple untuk pengembangan aplikasi dengan
  menerapkan persetujuan pengguna, transparansi data, dan pembaruan yang aman.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-31T01:48:03.832Z
updated_at: 2025-12-31T01:19:38.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf-1743385695606.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Apple privacy rules, Capacitor apps, data transparency, user consent, App
  Store compliance, privacy policy
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
**Aturan privasi Apple sekarang mengharuskan pengembang aplikasi [Capacitor](https://capacitorjs.com/) untuk fokus pada transparansi data pengguna dan kepatuhan untuk memastikan persetujuan App Store dan mempertahankan kepercayaan pengguna.**

Langkah-langkah utama meliputi:

-   **Manifes Privasi**: Dokumentasikan pengumpulan data, API, dan detail pelacakan.
-   **Persetujuan Pengguna**: Gunakan App Tracking Transparency (ATT) untuk izin pelacakan.
-   **Akses Data**: Tentukan dengan jelas izin untuk fitur seperti kamera, lokasi, dan kontak.
-   **[Kebijakan Privasi](https://capgo.app/dp/)**: Sediakan kebijakan yang jelas dan mudah diakses tentang penggunaan data.
-   **Pengujian & Pembaruan**: Uji kepatuhan secara menyeluruh dan gunakan sistem pembaruan yang aman seperti [Capgo](https://capgo.app/).

Aturan ini menekankan kontrol pengguna, transparansi, dan pembaruan aplikasi yang aman. Pengembang dapat mengikuti panduan untuk tetap patuh dan menghadirkan aplikasi yang memperhatikan privasi.

## Mencegah Penolakan App Store: Tambahkan Manifes Privasi Apple ...

<iframe src="https://www.youtube.com/embed/D7R87wm9IJE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Penjelasan Aturan Privasi Apple

Apple mewajibkan pengembang untuk memprioritaskan kejelasan dan memberikan pengguna kontrol atas data mereka. Jika Anda pengembang Capacitor, ini berarti harus terbuka tentang bagaimana aplikasi Anda mengumpulkan dan menggunakan data, baik untuk pengguna maupun peninjau Apple.

### Mendokumentasikan Praktik Data

Simpan catatan internal yang detail tentang penanganan data aplikasi Anda. Pastikan untuk menyertakan:

-   Jenis data pengguna yang dikumpulkan
-   Alasan mengumpulkan data ini
-   Detail layanan pihak ketiga atau SDK yang digunakan
-   Bagaimana data ditransfer atau dibagikan

Memiliki informasi yang terorganisir tidak hanya membantu kepatuhan tetapi juga memudahkan untuk merespons pertanyaan selama proses peninjauan. Pastikan untuk mencerminkan praktik ini secara transparan dalam label privasi App Store dan dalam pengaturan aplikasi Anda.

### Elemen Kunci Pengungkapan Privasi

Informasi privasi aplikasi Anda harus dengan jelas menguraikan:

-   Fitur sistem dan izin API yang diperlukan agar aplikasi berfungsi
-   Kategori data yang dikumpulkan
-   Aktivitas pelacakan atau komunikasi dengan layanan eksternal
-   Bagaimana data digunakan dan mengapa

Kejelasan dalam pengungkapan membantu membangun kepercayaan dengan pengguna dan mengurangi kemungkinan menghadapi masalah peninjauan App Store.

### Timeline Kepatuhan

Apple memperbarui persyaratan privasi secara bertahap. Tetap informasi dengan rutin memeriksa pembaruan pengembang Apple untuk memastikan aplikasi Anda tetap sejalan dengan aturan terbaru.

## Menambahkan Aturan Privasi ke Aplikasi Anda

Pelajari cara menerapkan aturan privasi Apple dalam aplikasi Capacitor Anda dengan panduan langkah demi langkah ini.

### Persyaratan Persiapan

Sebelum Anda memulai, pastikan hal berikut:

-   Anda memiliki **Xcode 15 atau lebih baru** untuk dukungan manifes privasi.
-   Capacitor 8 telah terinstal.
-   Target penerapan iOS diatur ke **iOS 14.5 atau lebih baru**.
-   Aplikasi Anda menyertakan file `Info.plist` yang dikonfigurasi dengan benar.
-   Anda memiliki **akun Apple Developer** dengan sertifikat yang valid.

Jika Anda menggunakan Capgo, atur enkripsi end-to-end untuk melindungi privasi data. Aplikasi yang dikonfigurasi dengan benar dengan Capgo telah mencapai tingkat keberhasilan global 82% dalam pembaruan [\[1\]](https://capgo.app/).

Setelah lingkungan Anda siap, lanjutkan untuk membuat dan mengonfigurasi manifes privasi Anda.

### Panduan Pengaturan Manifes Privasi

1.  **Buat File Manifes Privasi**

Tambahkan file baru bernama `PrivacyInfo.xcprivacy` ke direktori root proyek iOS Anda:

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": [],
    "NSPrivacyAccessedAPITypes": []
}
```

2.  **Tentukan Pengumpulan Data**

Tentukan jenis data yang dikumpulkan aplikasi Anda, seperti:

-   Analitik pengguna
-   Informasi perangkat
-   Pola penggunaan
-   Akses jaringan

3.  **Konfigurasi Akses API**

Daftarkan API sistem yang diperlukan aplikasi Anda, termasuk:

-   Kamera
-   Lokasi
-   Kontak
-   Perpustakaan foto

### Pedoman Kepatuhan

Setelah menyiapkan manifes privasi, pastikan praktik pengumpulan data Anda memenuhi standar Apple.

**Minimalisasi Data**  
Hanya kumpulkan data yang diperlukan untuk fitur inti aplikasi Anda. Pengguna Capgo telah melaporkan tingkat pembaruan pengguna aktif 95% dalam 24 jam [\[1\]](https://capgo.app/), menunjukkan bahwa pendekatan yang memperhatikan privasi membuat pengguna tetap terlibat.

**Transparansi Pengguna**  
Jelaskan dengan jelas:

-   Mengapa data dikumpulkan
-   Berapa lama data akan disimpan
-   Opsi kontrol pengguna yang tersedia
-   Kebijakan berbagi data

### Persyaratan Pengujian

Sebelum pengajuan, uji aplikasi Anda untuk memastikan kepatuhan privasi. Fokus pada area berikut:

| Area Pengujian | Poin Verifikasi |
| --- | --- |
| Akses Data | Periksa prompt izin yang tepat. |
| Label Privasi | Konfirmasi deklarasi akurat. |
| Kontrol Pengguna | Uji fitur opt-out. |
| [Penyimpanan Data](https://capgo.app/plugins/capacitor-data-storage-sqlite/) | Verifikasi enkripsi aman. |

Capgo telah berhasil mengirimkan 23,5 juta pembaruan sambil mempertahankan kepatuhan privasi [\[1\]](https://capgo.app/), membuktikan bahwa mungkin untuk menyeimbangkan pembaruan dan privasi secara efektif.

Ikuti pedoman ini untuk memastikan aplikasi Anda siap untuk pengujian dan pengajuan App Store.

## Kontrol Privasi Pengguna

Bagian ini berfokus pada cara memberikan pengguna kontrol atas pelacakan dan akses data, berdasarkan pedoman privasi yang telah ditetapkan.

### Mengatur Izin Pelacakan

Untuk mengonfigurasi App Tracking Transparency (ATT) dalam aplikasi Capacitor Anda, sertakan kunci berikut dalam file `Info.plist` Anda:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use tracking to provide personalized features and improve app performance</string>
```

Selanjutnya, tangani permintaan pelacakan selama inisialisasi aplikasi Anda:

```typescript
import { App } from '@capacitor/app';

async function requestTrackingPermission() {
  const status = await App.requestTrackingAuthorization();
  return status.authorized;
}
```

**Tips untuk Implementasi ATT**:

-   Tampilkan dialog izin pada titik yang bermakna dalam pengalaman pengguna.
-   Jelaskan manfaat pelacakan dengan jelas sebelum prompt sistem muncul.
-   Hormati keputusan pengguna dan tawarkan alternatif bagi mereka yang memilih keluar.

### Izin Akses Data

Untuk iOS, Anda perlu menentukan izin dalam `Info.plist` aplikasi Anda. Berikut beberapa izin umum dan deskripsinya:

| Jenis Izin | Kunci Info.plist | Deskripsi Penggunaan |
| --- | --- | --- |
| Kamera | NSCameraUsageDescription | Diperlukan untuk mengambil foto |
| Lokasi | NSLocationWhenInUseUsageDescription | Untuk fitur berbasis lokasi |
| Foto | NSPhotoLibraryUsageDescription | Akses untuk menyimpan/memuat gambar |
| Kontak | NSContactsUsageDescription | Untuk integrasi kontak |

**Kapan Meminta Izin**:

-   Hanya minta izin saat diperlukan, dan berikan konteks yang jelas.
-   Jelaskan secara singkat mengapa setiap izin diperlukan sebelum meminta.
-   Jika pengguna menolak permintaan, tawarkan fitur atau opsi alternatif.

Setelah mengatur izin, pastikan pengguna diberi tahu tentang praktik ini melalui kebijakan privasi yang transparan.

### Tampilan Kebijakan Privasi

Buat kebijakan privasi aplikasi Anda mudah ditemukan dan dipahami.

**Yang Harus Disertakan**:

-   Detail pengumpulan data
-   Bagaimana data akan digunakan
-   Periode penyimpanan data tersimpan
-   Hak pengguna terkait data mereka
-   Detail kontak untuk masalah privasi

Anda dapat menambahkan pusat privasi ke aplikasi Anda seperti ini:

```typescript
import { Browser } from '@capacitor/browser';

async function showPrivacyPolicy() {
  await Browser.open({
    url: 'https://your-app.com/privacy-policy'
  });
}
```

**Cara Menampilkan Kebijakan Privasi**:

-   Letakkan tautan kebijakan privasi di pengaturan aplikasi untuk akses mudah.
-   Gunakan bahasa yang sederhana dan jelas untuk menjelaskan konsep teknis.
-   Tambahkan visual untuk meningkatkan pemahaman.
-   Sediakan riwayat versi dan beri tahu pengguna tentang pembaruan.
-   Izinkan pengguna mengekspor data mereka jika diminta.

Pastikan pembaruan aplikasi Anda (misalnya, melalui Capgo) mematuhi pengaturan privasi ini dan mempertahankan kepercayaan pengguna.

## Pengujian dan Pengajuan App Store

Setelah Anda menyiapkan manifes privasi dan kontrol pengguna, langkah selanjutnya adalah pengujian menyeluruh untuk memastikan semuanya berfungsi sebagaimana dimaksud. Proses ini membantu mengonfirmasi kepatuhan sebelum mengirimkan aplikasi Anda ke App Store.

### Pengujian Privasi di [Xcode](https://en.wikipedia.org/wiki/Xcode)

Untuk memulai, aktifkan Laporan Privasi di Xcode:

```swift
// Enable Privacy Report in Xcode scheme
Edit Scheme > Run > Diagnostics > Enable Privacy Report
```

Jalankan aplikasi Anda dalam mode debug dan tinjau Laporan Privasi di konsol. Berikut yang perlu difokuskan selama pengujian:

| Area Pengujian | Yang Perlu Diperiksa |
| --- | --- |
| Pelacakan Aplikasi | Waktu dan tampilan dialog ATT |
| Akses Data | Implementasi izin yang tepat |
| Penggunaan API | Kelengkapan manifes privasi |
| Panggilan Jaringan | Keamanan transmisi data |

Pengujian ini memastikan aplikasi Anda siap untuk pengajuan dan memenuhi standar kepatuhan.

### Kesalahan Privasi Umum

Setelah pengujian, atasi masalah yang sering terjadi ini untuk menghindari penundaan selama pengajuan:

-   **`privacy-manifest.json` Tidak Lengkap**: Pastikan semua API dan domain pelacakan yang diperlukan terdaftar.
-   **String Tujuan Hilang**: Jelaskan alasan untuk setiap permintaan izin.
-   **Permintaan Pelacakan Tidak Tepat**: Hanya picu izin pelacakan setelah tindakan pengguna.

### Detail Privasi App Store

Saat mengirimkan aplikasi Anda, berikan informasi akurat tentang praktik privasi Anda. Berikut yang perlu disertakan:

| Kategori Privasi | Informasi yang Diperlukan | Contoh |
| --- | --- | --- |
| Pengumpulan Data | Jenis data yang dikumpulkan | ID Perangkat, Lokasi |
| Penggunaan Data | Mengapa data dikumpulkan | Fungsi Aplikasi, Analitik |
| Penghubungan Data | Bagaimana data terhubung ke pengguna | Info akun, Data penggunaan |
| Pelacakan Data | Detail pelacakan lintas aplikasi | Periklanan, Analitik |

**Persyaratan Utama App Store**:

-   Perbarui URL kebijakan privasi Anda sebelum pengajuan.
-   Pastikan izin yang dinyatakan sesuai dengan fungsionalitas aplikasi Anda.
-   Dokumentasikan praktik privasi untuk SDK pihak ketiga yang digunakan.
-   Konfirmasi semua transmisi jaringan dienkripsi untuk keamanan.

## Menggunakan [Capgo](https://capgo.app/) untuk Pembaruan

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf/f3ac818a2fec22e90998e19561d68a19.jpg)

Capgo menawarkan sistem yang aman untuk pembaruan langsung sambil mematuhi aturan privasi Apple.

### Fitur Privasi Capgo

Sistem pembaruan Capgo dibangun dengan memperhatikan keamanan dan privasi:

| Fitur | Manfaat Privasi |
| --- | --- |
| Enkripsi End-to-End | Memastikan hanya pengguna yang berwenang yang dapat mendekripsi pembaruan |
| Kepatuhan App Store | Selaras dengan persyaratan privasi ketat Apple |
| Penerapan Aman | Melindungi distribusi pembaruan |
| Kontrol Akses | Memungkinkan manajemen izin yang detail |

Fitur-fitur ini melindungi pembaruan dan menjaga privasi pengguna.

> "Satu-satunya solusi dengan enkripsi end-to-end yang sebenarnya, yang lain hanya menandatangani pembaruan" - Capgo [\[1\]](https://capgo.app/)

### Penyebaran Pembaruan dengan Capgo

Berikut cara menyebarkan pembaruan yang sesuai privasi menggunakan Capgo:

1. **Pasang plugin Capgo**:

   Jalankan perintah berikut untuk memulai:

   ```bash
    npx @capgo/cli init
    ```

2. **Konfigurasi pengaturan privasi**:

   Perbarui manifest privasi untuk menyertakan domain dan API Capgo.

3. **Siapkan saluran pembaruan terenkripsi**:

   Buat saluran terpisah untuk tahap penyebaran berbeda guna memastikan pembaruan yang aman.

Capgo memastikan 95% pengguna aktif menerima pembaruan dalam 24 jam, dengan tingkat keberhasilan global 82% [\[1\]](https://capgo.app/). Sistem saluran juga membuat pengelolaan target pembaruan menjadi mudah.

### Pembaruan Grup Pengguna di Capgo

Capgo memungkinkan Anda menargetkan grup pengguna tertentu secara aman selama pembaruan:

| Jenis Pembaruan | Pertimbangan Privasi | Implementasi |
| --- | --- | --- |
| Pengujian Beta | Membatasi akses hanya ke pengguna tertentu | Gunakan saluran terpisah dengan akses terbatas |
| Peluncuran Bertahap | Rilis bertahap ke pengguna | Distribusi pembaruan berdasarkan persentase |

> "Kami menerapkan pengembangan agile dan @Capgo sangat penting dalam pengiriman berkelanjutan kepada pengguna kami!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Izin detail Capgo memastikan hanya anggota tim yang berwenang yang dapat mengakses dan mengelola pembaruan secara aman.

## Ringkasan

### Persyaratan Privasi Utama

Aturan privasi Apple untuk [aplikasi Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) menguraikan kebutuhan berikut:

| Persyaratan | Detail |
| --- | --- |
| **Manifest Privasi** | Sertakan domain, API, dan deklarasi pelacakan yang diperlukan. |
| **Persetujuan Pengguna** | Gunakan framework ATT untuk meminta izin pelacakan dari pengguna. |
| **Akses Data** | Konfigurasi izin untuk mengakses foto, lokasi, dan kontak. |
| **Kebijakan Privasi** | Sediakan kebijakan yang jelas dan dapat diakses di aplikasi dan daftar App Store. |
| **Keamanan Pembaruan** | Pastikan pembaruan langsung menggunakan saluran penyebaran terenkripsi. |

### Daftar Periksa Implementasi

Ikuti daftar periksa ini untuk memenuhi persyaratan Apple:

- **Konfigurasi Manifest Privasi**  
  Tambahkan deklarasi API, daftar domain pelacakan, dan dokumentasikan tujuan penggunaan data.

- **Siapkan Izin Pengguna**  
  Implementasikan dialog ATT, konfigurasi akses untuk foto dan media, dan aktifkan layanan lokasi.

- **Sistem Pembaruan Aman**  
  Gunakan solusi pembaruan yang sesuai privasi, siapkan saluran terenkripsi, dan konfigurasi kontrol target pengguna.

Platform Capgo menyediakan cara yang andal untuk memenuhi standar privasi ini sambil menjaga aplikasi Anda tetap fungsional dan berfokus pada pengguna [\[1\]](https://capgo.app/).
