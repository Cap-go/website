---
locale: id
---

Panduan Paket @capgo/standard-version

Dalam panduan ini, kita akan belajar cara menggunakan paket `@capgo/standard-version` untuk mengelola nomor versi dalam proyek Anda. Paket `@capgo/standard-version` adalah alat yang mengotomatiskan penomoran versi proyek Anda berdasarkan [spesifikasi commit konvensional](https://wwwconventionalcommitsorg/)

Mari kita mulai!

## Langkah 1: Instalasi

Untuk menginstal paket `@capgo/standard-version`, jalankan perintah berikut di terminal Anda:

[[BLOK_KODE]]

Ini akan menambahkan paket sebagai dependensi pengembangan dalam proyek Anda.

## Langkah 2: Konfigurasi

Untuk mengonfigurasi paket `@capgo/standard-version`, buat file `releaseconfigjs` di direktori root proyek Anda dengan konten berikut:

[[BLOK_KODE]]

Konfigurasi ini menentukan preset yang akan digunakan untuk penomoran versi. Dalam hal ini, kami menggunakan preset `capgo` yang merupakan preset kustom untuk paket `@capgo/standard-version`.

## Langkah 3: Penomoran Versi

Untuk membuat versi baru dari proyek Anda, jalankan perintah berikut:

[[BLOK_KODE]]

Ini akan menganalisis riwayat commit Anda dan secara otomatis menghasilkan nomor versi baru untuk proyek Anda berdasarkan commit konvensional. Ini juga akan memperbarui file `CHANGELOGmd` dengan perubahan terbaru.

## Langkah 4: Rilis

Untuk membuat rilis, jalankan perintah berikut:

[[BLOK_KODE]]

Ganti `100` dengan nomor versi yang diinginkan untuk rilis Anda. Perintah ini akan memperbarui nomor versi dalam file packagejson Anda, membuat tag git untuk rilis, dan memperbarui file `CHANGELOGmd`.

## Kesimpulan

Selamat! Anda telah berhasil belajar cara menggunakan paket `@capgo/standard-version` untuk mengelola nomor versi dalam proyek Anda. Paket ini mengotomatiskan proses penomoran versi dan memudahkan untuk melacak perubahan dalam proyek Anda.

Untuk informasi lebih lanjut, Anda dapat merujuk ke dokumentasi paket `@capgo/standard-version`.

Selamat bernombor versi!