---
slug: id__update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Perbarui aplikasi Capacitor Anda dengan mudah menggunakan Capacitor-updater
description: >-
  Salam untuk komunitas Capacitor Ionic, hari ini saya akan membantu Anda
  mengonfigurasi Capacitor-updater di aplikasi Anda. Dengan cara ini, Anda dapat
  melakukan deployment dengan lancar.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Pengembang Capacitor mencari alternatif
tag: Tutorial
published: true
locale: id
next_blog: ''
---

## Apa itu Capacitor-updater?

Capacitor-updater, teknologi yang membantu penyampaian pembaruan dan perbaikan aplikasi kepada pengguna akhir secara instan

Ini sangat bagus jika Anda ingin melakukan perbaikan bug kritis dan mengirimkannya secara instan tanpa melalui peninjauan App Store

Anda dapat menganggapnya sebagai kelincahan "seperti web" dalam memuat pembaruan secara langsung begitu tersedia

Selain itu, ia menyediakan rollback jika pembaruan baru membuat aplikasi crash

## Bagaimana cara kerjanya?

Capgo menjaga bundle JavaScript aplikasi Anda tetap sinkron dengan server Capgo, dan setiap kali pengguna membuka aplikasi, ia memeriksa dengan server Capgo apakah ada pembaruan baru yang tersedia untuk bundle tersebut Dan tentu saja, ia hadir dengan banyak konfigurasi hebat yang dapat membantu Anda menyesuaikan pengalaman pengguna Anda

Saya menggunakan Capgo di semua proyek yang saya buat Itu memungkinkan saya menghabiskan lebih sedikit waktu dalam proses peninjauan App Store

Anda dapat membaca lebih lanjut tentang itu [di sini](https://capgoapp/)

## Apakah ada batasan?

Sebaik apa pun kedengarannya, ada beberapa hal yang perlu kita perhatikan
Hal pertama adalah pembaruan OTA __hanya berfungsi dengan bundle web__
Anda mungkin berpikir ini bukan batasan besar karena dalam Capacitor JS, kita menulis hampir semua kode dalam JS CSS dan HTML
Meskipun ini mungkin benar, masih ada modul native yang kita instal ke aplikasi kita
Jika sebuah modul mengubah direktori android atau iOS Anda, Anda tidak dapat menggunakan OTA untuk memperbarui aplikasi Anda
Itu karena konten direktori ini digunakan untuk mengkompilasi biner Native, yang tidak dapat diperbarui OTA
Bahkan aplikasi native tidak dapat memperbarui bagian ini

Tetapi Anda dapat mengatur CI/CD Anda untuk menangani bagian ini, saya membuat tutorial tentang cara melakukannya [di sini untuk IOS](https://capgoapp/blog/automatic-capacitor-ios-build-github-action/), dan [di sini untuk Android](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)

## Konfigurasi Capgo Otomatis

Saatnya mendaftar, dan dapatkan kunci API Anda untuk mengunggah versi pertama Anda! Mulailah dengan [mendaftar untuk akun Capgo](/register/)

Setelah Anda masuk ke Capgo, Anda akan memiliki halaman onboarding

![Halaman onboarding](/onboarding_1_newwebp)

Ikuti langkah-langkah di halaman onboarding untuk menambahkan aplikasi pertama Anda

### Ikuti panduan CLI

Dari baris perintah, langsung ke root aplikasi Capacitor Anda, jalankan:

`npx @capgo/cli@latest init`
Untuk menginstal Capgo ke aplikasi Capacitor Anda, CLI akan memandu Anda melalui proses penyiapan aplikasi Anda dengan Capgo

Jika Anda ingin melakukannya secara manual, Anda dapat mengikuti langkah-langkah di bawah ini

## Konfigurasi Capgo Manual

### Instal plugin

Anda seharusnya mendapatkan kode ini ditambahkan ke aplikasi Anda:

`npm i @capgo/capacitor-updater && npx cap sync`
Untuk menginstal plugin ke aplikasi Capacitor Anda

Dan kemudian tambahkan kode ini ke aplikasi Anda untuk memberi tahu plugin native bahwa bundle JS sehat (jika Anda tidak melakukan ini, plugin native akan kembali ke versi sebelumnya):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ini akan memberi tahu plugin native bahwa instalasi berhasil

Kemudian lakukan `npm run build && npx cap copy` untuk memperbarui aplikasi Anda

### Login ke Capgo CLOUD

Pertama, gunakan [apikey](https://webcapgoapp/dashboard/apikeys/) `all` yang ada di akun Anda untuk masuk dengan CLI:

`npx @capgo/cli@latest login YOU_KEY`

### Tambahkan aplikasi pertama Anda

Mari mulai dengan membuat aplikasi di Capgo Cloud dengan CLI

`npx @capgo/cli@latest app add`

Perintah ini akan menggunakan semua variabel yang didefinisikan dalam file konfigurasi Capacitor untuk membuat aplikasi

### Unggah versi pertama Anda

Jalankan perintah untuk membangun kode Anda dan mengirimkannya ke Capgo dengan:
`npx @capgo/cli@latest bundle upload`

Secara default, nama versi akan menjadi yang ada di file `packagejson` Anda

Periksa di [Capgo](https://webcapgoapp/) apakah build sudah ada

Anda bahkan dapat mengujinya dengan [aplikasi sandbox mobile](https://capgoapp/app_mobile/) saya

### Jadikan channel default

Setelah Anda mengirim aplikasi Anda ke Capgo, Anda perlu menjadikan channel Anda `default` agar aplikasi menerima pembaruan dari Capgo`npx @capgo/cli@latest channel set production -s default`

## Menerima Pembaruan Langsung pada Perangkat

Agar aplikasi Anda dapat menerima pembaruan langsung dari Deploy, Anda perlu menjalankan aplikasi pada perangkat atau emulator. Cara termudah untuk melakukan ini adalah dengan menggunakan perintah berikut untuk meluncurkan aplikasi lokal Anda di emulator atau perangkat yang terhubung ke komputer Anda:

    npx cap run [ios | android]

Buka aplikasi, letakkan di latar belakang dan buka lagi, Anda seharusnya melihat di log bahwa aplikasi telah melakukan pembaruan.

Selamat! 🎉 Anda telah berhasil menerapkan Pembaruan Langsung pertama Anda. Ini hanyalah awal dari apa yang dapat Anda lakukan dengan Pembaruan Langsung. Untuk mempelajari lebih lanjut, lihat [dokumentasi Pembaruan Langsung](/docs/plugin/cloud-mode/getting-started/) lengkap.

> Jika Anda perlu menghentikan penerimaan pembaruan secara lokal, jalankan perintah ini:
`npx @capgo/cli@latest channel set`