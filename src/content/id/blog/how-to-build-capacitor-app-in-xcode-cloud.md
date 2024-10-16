---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Cara Membuat Aplikasi Ionic Capacitor di Xcode Cloud
description: >-
  Gunakan Xcode Cloud untuk membangun aplikasi Capacitor JS Anda dan hindari
  kebutuhan menggunakan MacOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Kompilasi di Xcode Cloud untuk Capacitor
tag: Tutorial
published: true
locale: id
---

## Prasyarat

Sebelum melanjutkan tutorial...

- Pastikan Anda menggunakan GitHub
- Gunakan Capacitor
- Aplikasi Anda sudah di-deploy di Apple Store
- Keinginan untuk membaca 😆...

Menggunakan Ionic adalah opsional, untuk Cordova mungkin bisa berfungsi, tapi saya belum mencobanya

## Penting tentang harga

![Harga Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

Layanan ini 'gratis' hingga batas tertentu
Anda dapat melihat harga dan batas di tangkapan layar (harga pada saat pembuatan tutorial, dapat berubah di masa mendatang)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda suka, kita lanjutkan_**

> **_📣_ Dalam postingan ini, kita asumsikan bahwa kita sudah memiliki aplikasi yang dibuat di Apple Store**

## Pengantar

Agar Xcode dapat membangun aplikasi Capacitor Anda, Anda perlu menyiapkan beberapa hal

## Persiapan Paket

Pastikan Anda memiliki perintah build dalam script `packagejson` Anda
Kemudian tambahkan perintah `sync:ios` seperti di bawah ini

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Langkah ini akan membuat script post berfungsi dengan sederhana

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

## Membuat alur kerja Xcode

Buka Xcode (ya, untuk menghapus Xcode Anda memerlukan Xcode)

Dan pergi ke tab ini:
![Langkah Xcode 1](/xcode_step_1webp)

Klik buat alur kerja, pilih aplikasi Anda, klik selanjutnya seperti di bawah ini

![Langkah Xcode 2](/xcode_step_2webp)

Klik Edit alur kerja di sebelah kiri
![Langkah Xcode 2](/xcode_step_3webp)

Pergi ke tab lingkungan dan pilih seperti di bawah ini Mac 124 dan centang opsi yang tepat
![Langkah Xcode 3](/xcode_step_3webp)

Pilih kondisi mulai Anda
Jika Anda menggunakan build yang sama seperti kami, saya sarankan menggunakan Tag daripada cabang, untuk menghindari build ganda

Atur variabel lingkungan Anda
![Langkah Xcode 4](/xcode_step_4webp)

Hubungkan akun GitHub Anda
![Langkah Xcode 5](/xcode_step_5webp)

![Langkah Xcode 6](/xcode_step_6webp)

Kemudian aktifkan alur kerja dan lakukan commit perubahan pertama Anda, Anda seharusnya melihat build Anda berjalan di Xcode

## **Pemrosesan Build**

Di Xcode Cloud, **Anda ditagih berdasarkan menit** yang Anda gunakan untuk menjalankan alur kerja CI/CD Anda Dari pengalaman, dibutuhkan sekitar 10-15 menit sebelum build dapat diproses di Apple Store

Untuk proyek pribadi, perkiraan biaya per build bisa mencapai **$0008/menit x 5 menit = $04**, atau lebih, tergantung pada konfigurasi atau dependensi proyek Anda

Untuk proyek Open-source, ini seharusnya tidak menjadi masalah sama sekali Lihat [harga](https://githubcom/pricing/)