---
slug: appcenter-migration
title: Migrasi dari App Center ke Capgo
description: >-
  Dalam panduan ini, kita akan membahas langkah demi langkah proses migrasi
  lengkap ke Capgo Live Updates, sebuah alternatif untuk Microsoft CodePush.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Pengembang Capacitor JS mencari alternatif
tag: Migration
published: true
locale: id
next_blog: automatic-build-and-release-with-github-actions
---

Berikut adalah terjemahan teks ke dalam bahasa Indonesia (id):

## Ringkasan Migrasi

* [Capgo](/register/) adalah layanan yang membantu tim pengembangan mengirimkan aplikasi langsung ke aplikasi yang telah di-deploy
* Aplikasi Capacitor JS yang ditulis dengan jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic atau bahkan solusi kustom Anda sendiri dapat dimigrasi **Aplikasi Ionic yang sudah ada tidak diperlukan**
* [Colt](https://voltbuild/) menawarkan layanan setara untuk App Center Build (membangun aplikasi Android/iOS) Untuk layanan Pengujian, Diagnostik, dan Analitik

##### Catatan

Jika aplikasi Anda masih menggunakan Cordova, perlu [migrasi ke Capacitor](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/) terlebih dahulu sebelum migrasi ke Capgo

Dibangun oleh tim Ionic sebagai penerus spiritual Cordova, Capacitor memungkinkan pengembangan untuk bergerak mendekati alat dan kemampuan native dengan tujuan memberikan pengalaman pengguna dan kinerja yang lebih baik

Untungnya, proses migrasi mudah dan sebagian besar plugin Cordova kompatibel dengan Capacitor [Mulai migrasi di sini](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/)

## Tentang Capgo

Capgo menangani pembaruan aplikasi dari waktu ke waktu Tim pengembangan dapat fokus sepenuhnya pada fitur unik aplikasi mereka dan mengalihdayakan proses pengiriman aplikasi yang rumit ke Capgo

Capgo mengisi celah antara pengiriman web dan seluler

## Prasyarat Capgo

Seperti App Center, [Capgo](/register/) mendukung aplikasi yang di-host di repositori Git di Azure DevOps, Bitbucket, GitHub, dan GitLab

### Instal Capgo CLI

##### catatan

Pastikan Node dan NPM terinstal di komputer Anda sebelum melanjutkan Selalu gunakan [versi LTS terbaru](https://nodejsorg/) Capgo tidak mendukung versi lama

### Buat file `packagejson` dan konfigurasi Capacitor

##### catatan

Sebelum Anda memulai, saya sarankan untuk membuat perubahan pada cabang Git yang baru

Karena [Capgo](/register/) dibuat untuk mengotomatisasi aplikasi capacitor, dibutuhkan satu file yang mungkin belum ada di aplikasi Anda Pertama, buat file `capacitorconfigjson` Cara termudah untuk membuatnya adalah dengan menjalankan perintah berikut di root aplikasi Anda:

```shell
npm install @capacitor/core
```

Kemudian, inisialisasi Capacitor menggunakan kuesioner CLI:

```shell
npx cap init
```

CLI akan mengajukan beberapa pertanyaan, dimulai dengan nama aplikasi Anda, dan ID paket yang ingin Anda gunakan untuk aplikasi Anda

Terakhir, commit file-file baru ke proyek Anda:

    git add git commit -m "menambahkan package json dan konfigurasi capacitor" && git push

### Migrasi Kode

Sekarang Anda memiliki file-file [Capgo](/register/) baru yang diperlukan, Anda dapat mengalihkan perhatian ke aplikasi itu sendiri [Capgo](/register/) mengharapkan seluruh aplikasi yang telah di-build berada di dalam direktori bernama `dist`

Jika kode yang telah di-build tidak berada di direktori `dist`, ubah nilai ini di file konfigurasi Capacitor

Berikut adalah struktur direktori aplikasi yang seharusnya:

![Struktur Aplikasi](/directory_looklikewebp)

## Konfigurasi Capgo

Dengan aplikasi Anda siap untuk integrasi [Capgo](https://webcapgoapp/), saatnya mendaftar dan mendapatkan kunci API Anda untuk mengunggah versi pertama Anda! Mulailah dengan [mendaftar akun Capgo](/register/)

Setelah Anda masuk ke Capgo, navigasikan ke halaman Akun kemudian klik pada kunci API, lalu klik pada kunci 'write' untuk menyalinnya ke clipboard Anda

### Instal Capgo SDK

Dari baris perintah, langsung ke root folder aplikasi Capacitor Anda, jalankan perintah berikut:

`npm i @capgo/capacitor-updater && npx cap sync`
Untuk menginstal plugin ke aplikasi Capacitor Anda

Dan kemudian tambahkan kode ini ke aplikasi Anda sebagai pengganti kode CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ini akan memberi tahu plugin native bahwa instalasi berhasil

## Men-deploy Pembaruan Langsung (Alternatif CodePush)

Fitur Pembaruan Langsung bekerja dengan menggunakan [Capgo SDK](https://githubcom/Cap-go/capacitor-updater/) yang terinstal di aplikasi native Anda untuk mendengarkan Tujuan Channel Deploy tertentu Ketika build Web ditugaskan ke Tujuan Channel, pembaruan tersebut akan di-deploy ke perangkat pengguna yang menjalankan biner yang dikonfigurasi untuk mendengarkan Tujuan Channel yang ditentukan### Login ke Capgo CLOUD

Pertama, gunakan [apikey](https://webcapgoapp/dashboard/apikeys/) `all` yang ada di akun Anda untuk login dengan CLI:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Tambahkan aplikasi pertama Anda

Mari mulai dengan membuat aplikasi di Capgo Cloud menggunakan CLI

`npx @capgo/cli@latest app add`

Perintah ini akan menggunakan semua variabel yang didefinisikan dalam file konfigurasi Capacitor untuk membuat aplikasi

## Unggah bundle pertama Anda

Jalankan perintah untuk membangun kode Anda dan mengirimkannya ke Capgo dengan:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Secara default, nama versi akan diambil dari file `packagejson` Anda

Periksa di [Capgo](https://webcapgoapp/) apakah build sudah ada

Anda bahkan dapat mengujinya dengan [aplikasi sandbox mobile](https://capgoapp/app_mobile/) saya

### Jadikan channel default

Setelah Anda mengirim aplikasi Anda ke Capgo, Anda perlu menjadikan channel Anda `default` agar aplikasi dapat menerima pembaruan dari Capgo

```shell
npx @capgo/cli@latest channel set production -s default
```

## Konfigurasi aplikasi untuk memvalidasi pembaruan

Tambahkan konfigurasi ini ke file JavaScript utama Anda

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Kemudian lakukan `npm run build && npx cap copy` untuk memperbarui aplikasi Anda

### Menerima Pembaruan Langsung di Perangkat

Agar aplikasi Anda menerima pembaruan langsung dari Deploy, Anda perlu menjalankan aplikasi di perangkat atau emulator. Cara termudah untuk melakukan ini adalah dengan menggunakan perintah berikut untuk meluncurkan aplikasi lokal Anda di emulator atau perangkat yang terhubung ke komputer Anda

    npx cap run [ios | android]

Buka aplikasi, letakkan di latar belakang dan buka lagi, Anda akan melihat di log bahwa aplikasi telah melakukan pembaruan

Selamat! 🎉 Anda telah berhasil menerapkan Pembaruan Langsung pertama Anda. Ini baru awal dari apa yang dapat Anda lakukan dengan Pembaruan Langsung. Untuk mempelajari lebih lanjut, lihat [dokumentasi Pembaruan Langsung](/docs/plugin/cloud-mode/getting-started/) lengkap

## Hapus Dependensi App Center

Sekarang setelah kita mengintegrasikan layanan Capgo, Anda harus menghapus referensi apa pun ke App Center. Selain menjadi praktik terbaik untuk menghapus kode/layanan yang tidak digunakan, menghapus SDK seharusnya mengurangi ukuran aplikasi Anda

Pertama, buka terminal kemudian uninstall plugin App Center:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Selanjutnya, buka `configxml` dan hapus nilai `preference` berikut. Mereka akan terlihat mirip dengan:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Jika Anda menggunakan App Center Analytics di aplikasi Anda, hapus elemen `preferences` berikut: `APPCENTER_ANALYTICS_ENABLE_IN_JS` dan `APPCENTER_CRASHES_ALWAYS_SEND`

Hapus elemen `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />` berikut:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Hapus referensi ke CodePush di tag `meta` CSP dalam file `indexhtml` (`https://codepushappcenterms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Terakhir, dalam aplikasi Anda, hapus referensi kode apa pun ke layanan App Center, seperti `codePushsync();`

## Langkah Selanjutnya

Anda telah bermigrasi dari App Center ke Capgo, memanfaatkan Pembaruan Langsung. Ini baru awal dari apa yang dapat Anda gunakan Capgo. Jelajahi sisa layanan termasuk Channel (beberapa lingkungan) dan override integrasi Cloud CLI, gunakan Capgo di dalam platform CI/CD pilihan Anda (seperti GitHub Action, GitLab, Jenkins, dan lainnya)

## Kirim pembaruan aplikasi otomatis

Jika kode Anda dihosting di GitHub, Anda dapat mengatur build dan rilis otomatis dalam beberapa langkah lagi, berkat GitHub actions

Saya telah membuat artikel kedua untuk memungkinkan Anda melakukannya

## Kredit

Terima kasih banyak kepada [Ionic](https://ioniccom/), artikel ini didasarkan pada [artikel ini](https://ionicio/blog/moving-from-microsoft-app-center-to-ionic-appflow/) yang ditulis ulang dengan chat-gpt-3 dan disesuaikan