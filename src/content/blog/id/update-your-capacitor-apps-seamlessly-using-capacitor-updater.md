---
slug: mise-a-jour-de-vos-applications-capacitor-sans-probleme-avec-capacitor-updater
title: Perbarui Aplikasi Capacitor Anda dengan Mudah Menggunakan Capacitor-updater
description: >-
  Salam kepada komunitas Capacitor Ionic, hari ini saya akan membantu Anda
  mengonfigurasi Capacitor-updater di aplikasi Anda. Agar Anda dapat melakukan
  deployment tanpa masalah.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2025-10-30T15:06:44.000Z
head_image: /update_flow.webp
head_image_alt: Pencarian Alternatif Pengembangan Capacitor
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: ''
---
## Apa itu Capacitor-updater?

Capacitor-updater, sebuah teknologi yang membantu dalam pengiriman pembaruan dan peningkatan aplikasi kepada pengguna akhir secara instan.

Ini sangat bagus jika Anda ingin melakukan perbaikan bug kritis dan mengirimkannya secara instan tanpa melalui proses review App Store.

Anda bisa menganggapnya sebagai kelincahan "seperti web" dalam memuat pembaruan secara langsung segera setelah tersedia.

Selain itu, menyediakan fitur rollback jika pembaruan baru menyebabkan aplikasi crash

## Bagaimana cara kerjanya?

Capgo menjaga bundle JavaScript aplikasi Anda tetap sinkron dengan server Capgo, dan setiap kali pengguna membuka aplikasi, sistem memeriksa server Capgo apakah ada pembaruan baru yang tersedia untuk bundle tersebut. Dan tentu saja, dilengkapi dengan banyak konfigurasi hebat yang dapat membantu Anda menyesuaikan pengalaman pengguna.

Saya menggunakan Capgo di semua proyek yang saya bangun. Hal ini memungkinkan saya menghabiskan lebih sedikit waktu dalam proses review App Store.

Anda dapat membaca lebih lanjut tentang ini [here](https://capgo.app/).

## Apakah ada batasan?

Meskipun terdengar bagus, ada beberapa hal yang perlu kita perhatikan.
Hal pertama adalah pembaruan OTA __hanya bekerja dengan web bundle__.
Anda mungkin berpikir ini bukan batasan besar karena di Capacitor JS, kita menulis hampir semua kode dalam JS CSS dan HTML.
Meskipun ini mungkin benar, masih ada modul native yang kita install ke aplikasi kita.
Jika sebuah modul mengubah direktori android atau iOS Anda, Anda tidak bisa menggunakan OTA untuk memperbarui aplikasi Anda.
Hal ini karena konten direktori tersebut digunakan untuk mengompilasi binary Native, yang tidak dapat diperbarui oleh OTA.
Bahkan aplikasi native tidak dapat memperbarui bagian ini.

Tapi Anda bisa mengatur CI/CD untuk menangani bagian ini, saya membuat tutorial cara melakukannya [here for IOS](https://capgo.app/blog/automatic-capacitor-android-build-github-action/).

## Konfigurasi Capgo Otomatis

Saatnya mendaftar, dan dapatkan API key Anda untuk mengunggah versi pertama! Mulai dengan [mendaftar akun Capgo](/register/).

Setelah Anda masuk ke Capgo, Anda akan melihat halaman onboarding

![Halaman onboarding](/onboarding_1_new.webp)

Ikuti langkah-langkah di halaman onboarding untuk menambahkan aplikasi pertama Anda.

### Ikuti panduan CLI

Dari command line, langsung ke root aplikasi Capacitor Anda, jalankan:

`npx @capgo/cli@latest init`
Untuk menginstal Capgo ke aplikasi Capacitor Anda, CLI akan memandu Anda melalui proses pengaturan aplikasi Anda dengan Capgo.

Jika Anda ingin melakukannya secara manual, Anda dapat mengikuti langkah-langkah di bawah ini.

## Konfigurasi Capgo Manual

### Instal plugin

Anda akan mendapatkan kode ini ditambahkan ke aplikasi Anda:

`npm i @capgo/capacitor-updater && npx cap sync`
Untuk menginstal plugin ke aplikasi Capacitor Anda.

Dan kemudian tambahkan kode ini ke aplikasi Anda untuk memberi tahu plugin native bahwa bundle JS dalam keadaan baik (jika Anda tidak melakukan ini, plugin native akan kembali ke versi sebelumnya):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ini akan memberi tahu plugin native bahwa instalasi berhasil.

Kemudian lakukan `npm run build && npx cap copy` untuk memperbarui aplikasi Anda.

### Login ke Capgo CLOUD

Pertama, gunakan `all` [apikey](https://console.capgo.app/dashboard/apikeys/) yang ada di akun Anda untuk login dengan CLI:

`npx @capgo/cli@latest login YOU_KEY`

### Tambahkan aplikasi pertama Anda

Mari mulai dengan membuat aplikasi di Capgo Cloud menggunakan CLI.

`npx @capgo/cli@latest app add`

Perintah ini akan menggunakan semua variabel yang didefinisikan dalam file konfigurasi Capacitor untuk membuat aplikasi.

### Unggah versi pertama Anda

Jalankan perintah untuk membangun kode Anda dan mengirimkannya ke Capgo dengan:
`npx @capgo/cli@latest bundle upload`

Secara default, nama versi akan sama dengan yang ada di file `package.json` Anda.

Periksa di [Capgo](https://console.capgo.app/) apakah build sudah ada.

Anda bahkan dapat mengujinya dengan [aplikasi sandbox mobile](https://capgo.app/app_mobile/) saya.

### Jadikan channel default

Setelah Anda mengirim aplikasi Anda ke Capgo, Anda perlu menjadikan channel Anda `default` agar aplikasi dapat menerima pembaruan dari Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Menerima Pembaruan Langsung di Perangkat

Agar aplikasi Anda dapat menerima pembaruan langsung dari Deploy, Anda perlu menjalankan aplikasi di perangkat atau emulator. Cara termudah untuk melakukan ini adalah dengan menggunakan perintah berikut untuk meluncurkan aplikasi lokal Anda di emulator atau perangkat yang terhubung ke komputer Anda.

    npx cap run [ios | android]

Buka aplikasi, letakkan di latar belakang dan buka lagi, Anda akan melihat di log bahwa aplikasi telah melakukan pembaruan.

Selamat! 🎉 Anda telah berhasil menerapkan Pembaruan Langsung pertama Anda. Ini hanya awal dari apa yang dapat Anda lakukan dengan Pembaruan Langsung. Untuk mempelajari lebih lanjut, lihat [dokumentasi Pembaruan Langsung](/docs/plugin/cloud-mode/getting-started/) lengkap.


> Jika Anda perlu menghentikan penerimaan pembaruan di lokal, jalankan perintah ini
`npx @capgo/cli@latest channel set`
