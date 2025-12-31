---
slug: enable-ios-developer-mode-ios16
title: Cara Mengaktifkan Mode Pengembang di iOS 16 untuk Pengujian Aplikasi
description: >-
  Panduan langkah demi langkah untuk mengaktifkan Mode Pengembang di iOS 16 ke
  atas untuk menjalankan internal distribution builds dan local development
  builds di perangkat Anda.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-11-27T00:00:00.000Z
updated_at: 2023-11-27T00:00:00.000Z
head_image: /enable-ios-developer-mode-ios16.webp
head_image_alt: Mengaktifkan Mode Pengembang iOS di iPhone
keywords: >-
  iOS, Developer Mode, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: iOS
published: true
locale: id
next_blog: ''
---
# Cara Mengaktifkan Mode Pengembang di iOS 16 untuk Pengujian Aplikasi

Bagi pengembang dan penguji yang bekerja dengan iOS 16 ke atas, mengaktifkan Mode Pengembang adalah langkah penting untuk menjalankan build distribusi internal dan build pengembangan lokal langsung di iPhone atau iPad. Panduan ini akan membantu Anda melalui proses mengaktifkan Mode Pengembang di perangkat iOS Anda.

## Prasyarat

Sebelum melanjutkan, pastikan Anda telah menginstal build pengembangan di perangkat iOS Anda. Pengaturan ini hanya diperlukan sekali per perangkat.

## Panduan Langkah demi Langkah untuk Mengaktifkan Mode Pengembang

### Langkah 1: Memicu Peringatan Mode Pengembang

Setelah menginstal build di perangkat Anda, ketuk ikon aplikasi. Sebuah peringatan akan muncul, meminta Anda untuk mengaktifkan Mode Pengembang. Klik **OK** untuk melanjutkan.

<div class="mx-auto" style="width: 50%;">
  <img src="/ios-16-developer-mode-0.webp" alt="Navigating to Developer Mode setting">
</div>

### Langkah 2: Mengakses Pengaturan Mode Pengembang

Buka aplikasi Pengaturan di perangkat iOS Anda. Navigasi ke **Privasi & Keamanan** dan kemudian pilih **Mode Pengembang**.

![Navigasi ke pengaturan Mode Pengembang](/ios-16-developer-mode-1.webp)

### Langkah 3: Aktifkan Mode Pengembang dan Mulai Ulang

Aktifkan toggle Mode Pengembang. iOS akan meminta Anda untuk memulai ulang perangkat agar perubahan berlaku. Ketuk **Mulai Ulang** untuk memulai proses reboot.

![Peringatan mulai ulang Mode Pengembang](/ios-16-developer-mode-2.webp)

### Langkah 4: Menyelesaikan Aktivasi

Setelah perangkat Anda mulai ulang dan Anda membukanya, sebuah peringatan sistem akan muncul. Klik **Aktifkan** dan masukkan kode sandi perangkat Anda saat diminta untuk menyelesaikan aktivasi Mode Pengembang.

![Peringatan dan permintaan kode sandi](/ios-16-developer-mode-3.webp)

Dengan Mode Pengembang yang sudah aktif, Anda dapat sepenuhnya bekerja dengan build distribusi internal dan build pengembangan lokal Anda.

Ingat, Anda dapat menonaktifkan Mode Pengembang kapan saja melalui pengaturan yang sama. Namun, untuk mengaktifkannya kembali, Anda perlu mengikuti langkah-langkah ini lagi.

## Metode Alternatif untuk Mengaktifkan Mode Pengembang

Jika Anda mengalami masalah dengan metode di atas dan Anda memiliki akses ke Mac, Anda dapat mengaktifkan Mode Pengembang dengan menghubungkan perangkat iOS Anda ke Mac dan mengikuti instruksi yang disediakan di [dokumentasi resmi Apple](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device/).

Dengan mengikuti langkah-langkah ini, Anda akan siap untuk menguji dan mengembangkan aplikasi secara efektif di perangkat iOS Anda yang menjalankan iOS 16 atau lebih baru.
