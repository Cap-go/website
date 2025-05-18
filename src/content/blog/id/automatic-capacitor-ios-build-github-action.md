---
slug: automatic-capacitor-ios-build-github-action
title: Membangun Capacitor IOS secara Otomatis dengan GitHub actions dan sertifikat
description: >-
  Cara menyiapkan pipeline CI/CD untuk aplikasi Ionic IOS Anda menggunakan
  fastlane dan GitHub Actions dalam 5 menit (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2025-01-21T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustrasi tindakan GitHub testflight Fastlane
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-android-build-github-action
---

# Pembuatan Otomatis iOS menggunakan GitHub Actions dengan Sertifikat

Menyiapkan CI/CD untuk aplikasi Capacitor bisa kompleks dan memakan waktu. Berikut yang perlu Anda ketahui:

## Prasyarat

Sebelum memulai, Anda perlu menyiapkan:

- Akun GitHub dengan akses admin
- Keanggotaan program pengembang iOS 
- Akses API App Store Connect dengan izin yang sesuai
- Pemahaman alur kerja GitHub Actions
- Pengetahuan konfigurasi Fastlane
- Waktu untuk memelihara dan debug pipeline
- Sertifikat dan profil provisioning yang tepat

## Setup CI/CD Profesional oleh Capgo

Lewati kerumitannya, [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) mengkonfigurasi pipeline CI/CD Anda langsung di platform pilihan Anda:

- **Independen Platform**: Bekerja dengan GitHub Actions, GitLab CI, atau lainnya
- **Integrasi Mulus**: Tidak perlu beralih platform, bekerja dengan proses Anda saat ini
- **Konfigurasi yang Disesuaikan**: Setup khusus sesuai kebutuhan proyek Anda
- **Panduan Ahli**: Kami telah menyiapkan CI/CD untuk 50+ aplikasi

### Harga
- Biaya setup satu kali: $2,600
- Biaya operasional Anda: ~$300/tahun
- Bandingkan dengan solusi proprietary lain: $6,000/tahun
- **Hemat $26,100 selama 5 tahun**

[Setup CI/CD Sekarang](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## Panduan Setup Manual

Jika Anda tetap ingin menyiapkan semuanya sendiri, berikut yang perlu Anda lakukan:

## Continuous Delivery untuk iOS menggunakan Fastlane dan GitHub Actions dan sertifikat

## Prasyarat

Sebelum melanjutkan tutorial:

- Pastikan Anda telah [menginstal](https://docsfastlanetools/) Fastlane di mesin pengembangan Anda
- Pastikan Anda adalah bagian dari keanggotaan program pengembang iOS

## Informasi penting tentang harga

![Price GitHub Action](/price_github_actions.webp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Layanan ini 'gratis' hingga batas tertentu, tergantung pada mesin yang dipilih
Kita akan menggunakan mesin **_macOS_**, Anda dapat melihat harga dan batasannya di tangkapan layar (harga pada saat pembuatan tutorial, dapat berubah di masa mendatang)

**Setelah diperingatkan tentang persyaratan dan harga, mari kita lanjutkan**

> **Catatan: Dalam posting ini saya mengasumsikan bahwa Anda telah membuat aplikasi di App Store Connect. Informasi penting akan disalin oleh Fastlane!**

## Apa yang akan Anda pelajari dalam tutorial

**Langkah-langkah yang harus diikuti dalam posting**

1. _Menggunakan API App Store Connect dengan Fastlane_
    - _Persyaratan:_
      - _Membuat Kunci API App Store Connect_
      - _Menggunakan Kunci API App Store Connect_
2. _Menyalin file Fastlane_
3. _Mengkonfigurasi GitHub Actions_

## 1. Menggunakan API App Store Connect dengan Fastlane

> Mulai Februari 2021, verifikasi dua faktor atau verifikasi dua langkah diperlukan untuk semua pengguna saat masuk ke App Store Connect. Lapisan keamanan tambahan untuk Apple ID Anda ini membantu memastikan bahwa hanya Anda yang dapat mengakses akun Anda.
> Dari [Apple Support](https://developer.apple.com/support/authentication/)

### Persyaratan

Agar Fastlane dapat menggunakan API App Store Connect untuk mengunggah aplikasi Anda, Anda perlu menyediakan **tiga** hal berikut:

1. ID Penerbit
2. ID Kunci
3. File kunci atau konten kunci

### Mendapatkan Kunci API App Store Connect

Untuk menghasilkan kunci, Anda harus memiliki izin Admin di App Store Connect. Jika Anda tidak memiliki izin tersebut, Anda dapat mengarahkan orang yang relevan ke artikel ini

1. Masuk ke [App Store Connect](https://appstoreconnectapplecom/)

2. Pilih [Users and Access](https://appstoreconnectapplecom/access/users/)

![App Store Connect user access](/select_user_access.webp)

3. Pilih tab Integration

![App Store Connect API Integration](/user_access_keys.webp)

4. Klik Generate API Key atau tombol Add (+)

![App Store Connect API keys create](/user_access.webp)

5. Masukkan nama untuk kunci. Nama ini hanya untuk referensi Anda dan bukan bagian dari kunci itu sendiri

![App Store Connect API keys create name](/gen_key.webp)

6. Di bawah Access, pilih peran untuk kunci