---
slug: appcenter-migration
title: Migrasi App Center ke Capgo
description: >-
  Dalam panduan ini, kita akan membahas proses lengkap migrasi dari Capgo Live
  Updates, sebuah alternatif untuk Microsoft CodePush.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2025-10-31T10:28:43.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS Dev mencari alternatif
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: id
next_blog: automatic-build-and-release-with-github-actions
---
## Ringkasan Migrasi

* [Capgo](/register/) adalah layanan yang membantu tim pengembangan mengirimkan aplikasi live ke aplikasi yang telah di-deploy.
* Aplikasi Capacitor JS yang ditulis dengan jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic atau bahkan solusi kustom Anda dapat dimigrasi. **Aplikasi Ionic yang sudah ada tidak diperlukan**.
* [Colt](https://volt.build/) menawarkan layanan setara untuk App Center Build (build aplikasi Android/iOS). Untuk layanan Test, Diagnostics, dan Analytics.

##### Catatan

Jika aplikasi Anda masih menggunakan Cordova, perlu [migrasi ke Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/) terlebih dahulu sebelum migrasi ke Capgo.

Dibuat oleh tim Ionic sebagai penerus spiritual Cordova, Capacitor memungkinkan pengembangan lebih dekat dengan tooling dan kemampuan native dengan tujuan memberikan pengalaman pengguna dan performa yang lebih baik.

Untungnya, proses migrasi mudah dan mayoritas plugin Cordova kompatibel dengan Capacitor. [Mulai migrasi di sini](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/).

## Tentang Capgo

Capgo menangani pembaruan aplikasi dari waktu ke waktu. Tim pengembangan dapat fokus sepenuhnya pada fitur unik aplikasi mereka dan mengalihdayakan proses pengiriman aplikasi yang rumit ke Capgo.

Capgo mengisi celah antara pengiriman web dan mobile.

## Prasyarat Capgo

Seperti App Center, [Capgo](/register/) mendukung aplikasi yang di-host di repositori Git di Azure DevOps, Bitbucket, GitHub, dan GitLab.

### Instal Capgo CLI

##### catatan

Pastikan Node dan NPM terinstal di komputer Anda sebelum melanjutkan. Selalu gunakan [versi LTS terbaru](https://nodejs.org/) Capgo tidak mendukung versi lama.

### Buat file `package.json` dan konfigurasi Capacitor

##### catatan

Sebelum memulai, saya sarankan membuat perubahan pada branch Git yang baru.

Karena [Capgo](/register/) dibuat untuk mengotomatisasi aplikasi capacitor, diperlukan satu file yang mungkin belum ada di aplikasi Anda. Pertama, buat file `capacitor.config.json`. Cara termudah untuk membuatnya adalah dengan menjalankan perintah berikut di root aplikasi Anda:

```shell
npm install @capacitor/core
```

Kemudian, inisialisasi Capacitor menggunakan kuesioner CLI:

```shell
npx cap init
```

CLI akan menanyakan beberapa pertanyaan, dimulai dengan nama aplikasi Anda, dan ID paket yang ingin Anda gunakan untuk aplikasi Anda.

Terakhir, commit file baru ke proyek Anda:

    git add .git commit -m "added package json and capacitor config" && git push

### Migrasi Kode

Sekarang Anda memiliki file [Capgo](/register/) yang diperlukan, Anda dapat beralih ke aplikasi itu sendiri. [Capgo](/register/) mengharapkan seluruh aplikasi yang telah di-build berada di dalam direktori bernama `dist`.

Jika kode build Anda tidak berada di direktori `dist`, ubah nilai ini di file konfigurasi Capacitor.

Berikut adalah struktur direktori aplikasi yang seharusnya:

![Struktur Aplikasi](/directory_looklike.webp)

## Konfigurasi Capgo

Dengan aplikasi Anda siap untuk integrasi [Capgo](https://console.capgo.app/), saatnya mendaftar, dan dapatkan API key Anda untuk mengunggah versi pertama Anda! Mulai dengan [mendaftar akun Capgo](/register/).

Setelah Anda masuk ke Capgo, navigasi ke halaman Account kemudian klik pada API key, lalu klik pada kunci 'write' untuk menyalinnya ke clipboard Anda.

### Instal Capgo SDK

Dari command line, langsung ke root folder aplikasi Capacitor Anda, jalankan perintah berikut:

`npm i @capgo/capacitor-updater && npx cap sync`
Untuk menginstal plugin ke aplikasi Capacitor Anda.

Dan kemudian tambahkan kode ini ke aplikasi Anda sebagai pengganti CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ini akan memberi tahu plugin native bahwa instalasi berhasil.

## Mendeploy Live Updates (Alternatif CodePush)

Fitur Live Update bekerja dengan menggunakan [Capgo SDK](https://github.com/Cap-go/capacitor-updater/) yang terinstal di aplikasi native Anda untuk mendengarkan Tujuan Channel Deploy tertentu. Ketika build Web ditetapkan ke Tujuan Channel, pembaruan tersebut akan dideploy ke perangkat pengguna yang menjalankan binary yang dikonfigurasi untuk mendengarkan Tujuan Channel yang ditentukan.

### Login ke Capgo CLOUD

Pertama, gunakan [apikey](https://console.capgo.app/dashboard/apikeys/) 'all' yang ada di akun Anda untuk login dengan CLI:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Tambahkan aplikasi pertama Anda

Mari mulai dengan membuat aplikasi di Capgo Cloud dengan CLI.

`npx @capgo/cli@latest app add`

Perintah ini akan menggunakan semua variabel yang didefinisikan dalam file konfigurasi Capacitor untuk membuat aplikasi.

## Unggah bundle pertama Anda

Jalankan perintah untuk mem-build kode Anda dan mengirimkannya ke Capgo dengan:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Secara default, nama versi akan mengikuti yang ada di file `package.json` Anda.

Periksa di [Capgo](https://console.capgo.app/) apakah build sudah ada.

Anda bahkan dapat mengujinya dengan [aplikasi sandbox mobile](https://capgo.app/app_mobile/) saya.

### Jadikan channel default

Setelah Anda mengirim aplikasi ke Capgo, Anda perlu menjadikan channel Anda `default` agar aplikasi menerima pembaruan dari Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Konfigurasi aplikasi untuk memvalidasi pembaruan

Tambahkan konfigurasi ini ke file JavaScript utama Anda.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Kemudian lakukan `npm run build && npx cap copy` untuk memperbarui aplikasi Anda.

### Menerima Live Update di Perangkat

Agar aplikasi Anda menerima live update dari Deploy, Anda perlu menjalankan aplikasi di perangkat atau emulator. Cara termudah untuk melakukan ini adalah dengan menggunakan perintah berikut untuk meluncurkan aplikasi lokal Anda di emulator atau perangkat yang terhubung ke komputer Anda.

    npx cap run [ios | android]

Buka aplikasi, letakkan di latar belakang dan buka lagi, Anda akan melihat di log bahwa aplikasi telah melakukan pembaruan.

Selamat! 🎉 Anda telah berhasil mendeploy Live Update pertama Anda. Ini hanya awal dari apa yang dapat Anda lakukan dengan Live Updates. Untuk mempelajari lebih lanjut, lihat [dokumentasi Live Updates lengkap](/docs/plugin/cloud-mode/getting-started/).

## Hapus Dependensi App Center

Sekarang setelah kita mengintegrasikan layanan Capgo, Anda harus menghapus semua referensi ke App Center. Selain menjadi praktik terbaik untuk menghapus kode/layanan yang tidak digunakan, menghapus SDK harus mengurangi ukuran aplikasi Anda.

Pertama, buka terminal kemudian uninstall plugin App Center:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Selanjutnya, buka `config.xml` dan hapus nilai `preference` berikut. Mereka akan terlihat seperti:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Jika Anda menggunakan App Center Analytics di aplikasi Anda, hapus elemen `preferences` berikut: `APPCENTER_ANALYTICS_ENABLE_IN_JS` dan `APPCENTER_CRASHES_ALWAYS_SEND`.

Hapus elemen `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />` berikut:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Hapus referensi ke CodePush dalam tag `meta` CSP di file `index.html` (`https://codepush.appcenter.ms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Terakhir, dalam aplikasi Anda, hapus semua referensi kode ke layanan App Center, seperti `codePush.sync();`.

## Langkah Selanjutnya

Anda telah bermigrasi dari App Center ke Capgo, menggunakan Live Updates. Ini baru permulaan dari apa yang bisa Anda gunakan dengan Capgo. Jelajahi layanan lainnya termasuk Channel (multiple environments) dan override. Integrasi Cloud CLI, gunakan Capgo di dalam platform CI/CD pilihan Anda (seperti GitHub Action, GitLab, Jenkins, dan lainnya).

## Kirim pembaruan aplikasi otomatis

Jika kode Anda di-host di GitHub, Anda dapat mengatur build dan rilis otomatis dalam beberapa langkah lagi, berkat GitHub actions.

Saya telah membuat artikel kedua untuk memungkinkan Anda melakukannya.

## Kredit

Terima kasih banyak kepada [Ionic](https://ionic.com/), artikel ini didasarkan pada [artikel ini](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/) yang ditulis ulang dengan chat-gpt-3 dan disesuaikan.
