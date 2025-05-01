---
slug: automatic-capacitor-android-build-gitlab
title: Build automatico di Capacitor Android con GitLab
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi Ionic Android Menggunakan
  fastlane dan GitLab dalam 5 Menit
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Ilustrasi Fastlane Google play GitLab
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: id
next_blog: null
---

# Build Android Otomatis dengan GitLab CI

Menyiapkan CI/CD untuk aplikasi Capacitor bisa kompleks dan memakan waktu. Berikut yang perlu Anda ketahui:

## Prasyarat

Sebelum memulai, Anda perlu menyiapkan:

- Akun GitLab dengan akses admin
- Aplikasi Anda sudah dipublikasikan di Google Play Store dengan penandatanganan yang tepat
- File kunci penandatanganan dan keystore Android
- Proyek Google Cloud Console dengan API Play Store yang diaktifkan
- Akun layanan dengan izin yang sesuai
- Pemahaman tentang alur kerja GitLab CI/CD
- Pengetahuan tentang konfigurasi Fastlane
- Waktu untuk memelihara dan debug pipeline

## Pengaturan CI/CD Profesional oleh Capgo

Lewati kerumitannya, [Capgo](https://capgoapp/ci-cd/) mengkonfigurasi pipeline CI/CD Anda langsung di platform pilihan Anda:

- **Independen Platform**: Bekerja dengan GitHub Actions, GitLab CI, atau lainnya
- **Integrasi Mulus**: Tidak perlu beralih platform, bekerja dengan proses Anda saat ini
- **Konfigurasi Disesuaikan**: Pengaturan khusus sesuai kebutuhan proyek Anda
- **Panduan Ahli**: Kami telah menyiapkan CI/CD untuk 50+ aplikasi

### Harga
- Biaya pengaturan satu kali: $2.600
- Biaya operasional Anda: ~$300/tahun
- Bandingkan dengan solusi proprietary lain: $6.000/tahun
- **Hemat $26.100 selama 5 tahun**

[Siapkan CI/CD Sekarang](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## Panduan Pengaturan Manual

Jika Anda tetap ingin mengatur semuanya sendiri, berikut yang perlu Anda lakukan:

**Langkah-langkah yang harus diikuti dalam postingan**

1. _Salin file Fastlane_
2. _Menyimpan rahasia Anda di rahasia terenkripsi GitLab_
3. _Membuat & menyimpan kunci akun layanan Google Play_
4. _Menyimpan kunci penandatanganan Android Anda_
5. _Menyiapkan file yml alur kerja GitLab Anda_

## 1. Salin file Fastline

Fastlane adalah pustaka Ruby yang dibuat untuk mengotomatisasi tugas pengembangan mobile yang umum. Dengan Fastlane, Anda dapat mengkonfigurasi "lane" khusus yang menggabungkan serangkaian "action" yang melakukan tugas yang biasanya Anda lakukan menggunakan Android studio. Anda bisa melakukan banyak hal dengan Fastlane, tapi untuk tutorial ini, kita hanya akan menggunakan beberapa action inti.

Buat folder Fastlane di root proyek Anda dan salin file berikut:
Fastlane
[[CODE_BLOCK]]

### Menyimpan Rahasia Anda di Variabel GitLab CI/CD

GitLab menyediakan cara untuk menyimpan variabel CI/CD terenkripsi, mirip dengan rahasia repositori GitHub. Untuk menyimpan informasi sensitif Anda dengan aman:

1. Buka Pengaturan proyek GitLab Anda
2. Navigasi ke CI/CD > Variables
3. Tambahkan variabel berikut:

-   ANDROID_KEYSTORE_FILE: file `jks` atau `keystore` yang dienkode base64 yang digunakan untuk menandatangani build Android Anda. Ini akan menjadi file keystore yang terkait dengan kunci upload Anda (jika menggunakan Play App Signing), atau kunci penandatanganan aplikasi Anda
-   KEYSTORE_KEY_PASSWORD: kata sandi yang terkait dengan file keystore
-   KEYSTORE_KEY_ALIAS: alias key store
-   KEYSTORE_STORE_PASSWORD: kata sandi kunci pribadi
-   DEVELOPER_PACKAGE_NAME: ID aplikasi android Anda seperti com.example.app
-   PLAY_CONFIG_JSON: Kunci akun layanan JSON yang dienkode base64

### Membuat Kunci Akun Layanan Google Play

Untuk menghasilkan rahasia `PLAY_CONFIG_JSON`, ikuti langkah-langkah ini:

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
2. Buat proyek baru atau pilih yang sudah ada
3. Aktifkan API Google Play Android Developer
4. Buat akun layanan:
   - Buka "IAM & Admin" > "Service Accounts"
   - Klik "Create Service Account"
   - Beri nama dan deskripsi
   - Klik "Create and Continue"
   - Lewati penugasan peran dan klik "Done"
5. Hasilkan kunci JSON:
   - Temukan akun layanan Anda dalam daftar
   - Klik menu tiga titik > "Manage keys"
   - Klik "Add Key" > "Create new key"
   - Pilih format JSON
   - Klik "Create"
6. Berikan akun layanan akses ke aplikasi Anda di Play Console:
   - Buka [Play Console](https://play.google.com/console)
   - Navigasi ke "Users and permissions"
   - Klik "Invite new users"
   - Masukkan email akun layanan (berakhir dengan @*.iam.gserviceaccount.com)
   - Berikan izin "Release to production"
   - Klik "Invite user"
7.