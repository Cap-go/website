---
slug: id__enable-ios-developer-mode-ios16
title: Cara mengaktifkan mode pengembang di iOS 16 untuk menguji aplikasi
description: >-
  Panduan langkah demi langkah untuk mengaktifkan mode pengembang di iOS 16 dan
  versi yang lebih baru, agar dapat menjalankan versi distribusi internal dan
  versi pengembangan lokal di perangkat Anda.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-11-27T00:00:00.000Z
updated_at: 2023-11-27T00:00:00.000Z
head_image: /enable-ios-developer-mode-ios16.webp
head_image_alt: Mengaktifkan mode pengembang iOS di iPhone
tag: iOS
published: true
locale: id
next_blog: ''
---

# Cara Mengaktifkan Mode Pengembang di iOS 16 untuk Pengujian Aplikasi

Bagi pengembang dan penguji yang bekerja dengan iOS 16 ke atas, mengaktifkan Mode Pengembang adalah langkah penting untuk menjalankan build distribusi internal dan build pengembangan lokal langsung di iPhone atau iPad. Panduan ini akan memandu Anda melalui proses mengaktifkan Mode Pengembang di perangkat iOS Anda.

## Prasyarat

Sebelum melanjutkan, pastikan Anda telah menginstal build pengembangan di perangkat iOS Anda. Pengaturan ini hanya diperlukan sekali per perangkat.

## Panduan Langkah demi Langkah untuk Mengaktifkan Mode Pengembang

### Langkah 1: Memicu Pemberitahuan Mode Pengembang

Setelah menginstal build di perangkat Anda, ketuk ikon aplikasi. Sebuah pemberitahuan akan muncul, meminta Anda untuk mengaktifkan Mode Pengembang. Klik **OK** untuk melanjutkan.

<div class="mx-auto" style="width: 50%;">
  <img src="/ios-16-developer-mode-0.webp" alt="Navigating to Developer Mode setting">
</div>

### Langkah 2: Mengakses Pengaturan Mode Pengembang

Buka aplikasi Pengaturan di perangkat iOS Anda. Navigasikan ke **Privasi & Keamanan** dan kemudian pilih **Mode Pengembang**.

![Navigasi ke pengaturan Mode Pengembang](/ios-16-developer-mode-1.webp)

### Langkah 3: Mengaktifkan Mode Pengembang dan Memulai Ulang

Aktifkan toggle Mode Pengembang. iOS akan meminta Anda untuk memulai ulang perangkat agar perubahan dapat diterapkan. Ketuk **Mulai Ulang** untuk memulai proses reboot.

![Prompt memulai ulang Mode Pengembang](/ios-16-developer-mode-2.webp)

### Langkah 4: Menyelesaikan Aktivasi

Setelah perangkat Anda memulai ulang dan Anda membukanya, sebuah pemberitahuan sistem akan muncul. Klik **Aktifkan** dan masukkan kode sandi perangkat Anda saat diminta untuk menyelesaikan aktivasi Mode Pengembang.

![Pemberitahuan dan permintaan kode sandi](/ios-16-developer-mode-3.webp)

Dengan Mode Pengembang sekarang aktif, Anda dapat sepenuhnya terlibat dengan build distribusi internal dan build pengembangan lokal Anda.

Ingat, Anda dapat menonaktifkan Mode Pengembang kapan saja melalui pengaturan yang sama. Namun, untuk mengaktifkannya kembali, Anda perlu mengikuti langkah-langkah ini lagi.

## Metode Alternatif untuk Mengaktifkan Mode Pengembang

Jika Anda mengalami masalah dengan metode di atas dan Anda memiliki akses ke Mac, Anda dapat mengaktifkan Mode Pengembang dengan menghubungkan perangkat iOS Anda ke Mac dan mengikuti instruksi yang disediakan di [dokumentasi resmi Apple](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device/)

Dengan mengikuti langkah-langkah ini, Anda akan siap untuk menguji dan mengembangkan aplikasi secara efektif di perangkat iOS Anda yang menjalankan iOS 16 atau versi yang lebih baru.