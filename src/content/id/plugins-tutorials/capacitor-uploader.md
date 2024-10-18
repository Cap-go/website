---
locale: id
---

capgo/capacitor-uploader Tutorial

Tutorial ini akan membimbing Anda melalui proses menggunakan paket `@capgo/capacitor-uploader` untuk mengunggah file secara native di aplikasi Ionic Capacitor Anda.

## Prasyarat

Sebelum kita mulai, pastikan Anda telah menginstal yang berikut:

- Nodejs
- npm
- Proyek Ionic Capacitor

## Instalasi

1 Buka terminal atau command prompt Anda dan navigasikan ke direktori proyek Anda.

2 Jalankan perintah berikut untuk menginstal paket:

[[BLOK_KODE]]

3 Setelah instalasi, sinkronkan proyek Capacitor Anda:

[[BLOK_KODE]]

## Konfigurasi

### Konfigurasi Android

Untuk Android, Anda perlu menambahkan beberapa izin ke file `AndroidManifest.xml` Anda. Buka file yang terletak di `android/app/src/main/AndroidManifest.xml` dan tambahkan izin berikut di dalam tag `<manifest>`:

[[BLOK_KODE]]

## Penggunaan

Sekarang setelah kami menginstal dan mengonfigurasi paket, mari kita lihat cara menggunakannya di aplikasi Anda.

### Mengimpor Uploader

Pertama, impor Uploader di file TypeScript Anda:

[[BLOK_KODE]]

### Mengunggah ke S3

Berikut adalah contoh bagaimana mengunggah file ke S3 menggunakan URL yang ditandatangani sebelumnya:

[[BLOK_KODE]]

### Mengunggah ke Server Kustom

Berikut adalah contoh bagaimana mengunggah file ke server kustom:

[[BLOK_KODE]]

### Menggunakan dengan Capacitor Camera Preview

Jika Anda menggunakan plugin Capacitor Camera Preview, Anda dapat menggabungkannya dengan Uploader untuk menangkap dan mengunggah video. Berikut adalah contohnya:

[[BLOK_KODE]]

## Kesimpulan

Anda sekarang telah belajar bagaimana menggunakan paket `@capgo/capacitor-uploader` untuk mengunggah file secara native di aplikasi Ionic Capacitor Anda. Plugin ini menyediakan cara yang fleksibel untuk mengunggah file ke berbagai server, termasuk S3 dengan URL yang ditandatangani sebelumnya, dan dapat digunakan dalam kombinasi dengan plugin lain seperti Capacitor Camera Preview.

Ingat untuk menangani kesalahan dengan tepat dan mengelola peristiwa unggah untuk memberikan umpan balik kepada pengguna tentang kemajuan dan status unggah.

Untuk informasi lebih rinci tentang API dan opsi yang tersedia, lihat README atau dokumentasi paket tersebut.