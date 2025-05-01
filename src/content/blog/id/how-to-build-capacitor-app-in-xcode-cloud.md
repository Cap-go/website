---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Bagaimana Cara Membangun Aplikasi Ionic Capacitor di Xcode Cloud
description: >-
  Gunakan Xcode Cloud untuk membangun aplikasi Capacitor JS Anda dan hindari
  kebutuhan MacOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Build Xcode Cloud dengan Capacitor
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
---

## Prasyarat

Sebelum melanjutkan tutorial...

-   Pastikan Anda menggunakan GitHub
-   Menggunakan Capacitor
-   Aplikasi Anda sudah di-deploy di Apple Store
-   Keinginan untuk membaca 😆...

Menggunakan Ionic adalah opsional, untuk Cordova mungkin bisa berfungsi, tapi saya belum mencobanya

## Penting tentang harga

![Price Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

Layanan ini '_gratis_' sampai batas tertentu  
Anda dapat melihat harga dan batas di screenshot (harga pada saat tutorial dibuat, bisa berubah di masa mendatang)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda berkenan, kita lanjutkan_**

> **_📣_ Dalam post ini, kita mengasumsikan bahwa kita telah membuat aplikasi di Apple Store**

## Pendahuluan

Agar Xcode dapat membangun aplikasi Capacitor Anda, Anda perlu mengatur beberapa hal

## Persiapan Package

Pastikan Anda memiliki perintah build di script `packagejson` Anda
Kemudian tambahkan perintah `sync:ios` seperti di bawah ini

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Langkah ini akan membuat post script bekerja dengan sederhana

## Script post clone
Script ini akan dijalankan oleh Xcode cloud setelah langkah clone

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Install CocoaPods
echo "📦 Install CocoaPods"
brew install cocoapods
brew install node@18
brew link node@18

# Install dependencies
# XCode Cloud is literally broken for 2 months now - https://developer.apple.com/forums/thread/738136?answerId=774510022#774510022
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Simpan file ini di root proyek Anda dan beri nama `ios/App/ci_scripts/ci_post_clonesh`

Kemudian buat file ini dapat dieksekusi dengan perintah `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Membuat workflow Xcode

Buka Xcode (ya, untuk menghapus Xcode Anda memerlukan Xcode)

Dan pergi ke tab ini:
![Xcode step 1](/xcode_step_1webp)

Klik create workflow, pilih aplikasi Anda, klik next seperti di bawah ini

![Xcode step 2](/xcode_step_2webp)

Klik Edit workflow di sebelah kiri
![Xcode step 2](/xcode_step_3webp)

Pergi ke tab environments dan pilih seperti di bawah Mac 124 dan centang opsi yang sesuai
![Xcode step 3](/xcode_step_3webp)

Pilih kondisi mulai Anda
Jika Anda menggunakan build yang sama seperti kami, saya sarankan menggunakan Tag daripada branch, untuk menghindari build ganda

Atur variabel env Anda
![Xcode step 4](/xcode_step_4webp)

Hubungkan akun GitHub Anda
![Xcode step 5](/xcode_step_5webp)

![Xcode step 6](/xcode_step_6webp)

Kemudian aktifkan workflow dan commit perubahan pertama Anda, Anda seharusnya melihat build Anda berjalan di Xcode

## **Pemrosesan Build**

Di Xcode Cloud, **Anda ditagih berdasarkan menit** yang Anda gunakan untuk menjalankan workflow CI/CD Anda. Dari pengalaman, diperlukan waktu sekitar 10-15 menit sebelum build dapat diproses di Apple Store

Untuk proyek pribadi, perkiraan biaya per build bisa mencapai **$0.008/menit x 5 menit = $0.4**, atau lebih, tergantung pada konfigurasi atau dependensi proyek Anda

Untuk proyek Open-source, ini seharusnya tidak menjadi masalah sama sekali. Lihat [pricing](https://githubcom/pricing/)