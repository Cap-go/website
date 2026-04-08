---
slug: how-version-work-in-capgo
title: Cara kerja versi di Capgo
description: >-
  Pahami bagaimana Capgo mengelola versi dalam aplikasi Capacitor Anda, dan
  gunakan dengan sebaik-baiknya. Pelajari arti major, minor, patch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Sistem versi bundle Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: how-to-release-major-version-in-capgo
---

Capgo menggunakan 2 variabel utama untuk mengelola versi dalam aplikasi Capacitor Anda:
  - Versi Native
  - Versi JavaScript


<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgo.webp" alt="Capacitor update system">
</div>

Semua pilihan versi ditentukan di sisi server oleh Capgo

## Sistem Versi

Untuk mengelola versi, Capgo menggunakan sistem SemVer, baca lebih lanjut tentangnya [di sini](https://semverorg/)
### Versi

Dimana Capgo menemukan versi untuk dibandingkan

  > Anda dapat menimpa perilaku ini dengan mengatur kunci versi di file `capacitorconfigjson` [dokumentasi di sini](/docs/plugin/settings/#version)
  > Versi native akan diabaikan untuk semua platform

#### IOS

Di IOS variabel diatur pada proyek Anda di `ios/App/App/Infoplist` di bawah kunci `CFBundleShortVersionString` atau `ios/App/Appxcodeproj/projectpbxproj` di bawah kunci `MARKETING_VERSION` jika `MARKETING_VERSION` telah diatur di file `Infoplist` Anda

#### Android

Di Android, variabel diatur pada proyek Anda di `android/app/buildgradle` di bawah kunci `defaultConfigversionName`

#### JavaScript ( Versi bundle Capgo )

Di JavaScript, variabel dapat diatur di `packagejson` Anda di bawah kunci `version`
Jika tidak, Anda perlu menyediakannya dalam perintah upload

## Perilaku Default

Ini adalah bagaimana channel Capgo akan berperilaku jika Anda tidak mengubah pengaturan apapun

> Perilaku ini akan didasarkan pada channel unik yang Anda jadikan default

### Saat Instalasi Baru aplikasi Capacitor Anda
Ketika pengguna mengunduh aplikasi Ionic Anda untuk pertama kali dan membuka aplikasi, aplikasi menghubungi server Capgo

Saat ini, 4 output dapat terjadi:
1. Versi bundle native (123) lebih rendah dari versi bundle Capgo (124), Capgo mengirim bundlenya ke pengguna
2. Versi bundle native (123) sama dengan versi bundle Capgo (123), Capgo mengirim "tidak perlu update"
3. Versi bundle native (124) lebih tinggi dari versi bundle Capgo (123), Capgo mengirim "tidak perlu update"
4. Versi bundle native (123) MAJOR lebih rendah dari versi bundle Capgo (223), Capgo mengirim "tidak perlu update"

### Pengaturan Lainnya

#### Nonaktifkan auto-downgrade di bawah native

Jika Anda mengubah pengaturan ini menjadi false, Capgo akan menganggap dirinya selalu sebagai sumber versi yang dapat dipercaya
Kemudian perilakunya menjadi:
- Versi native (124) lebih tinggi dari versi Capgo (123)

> Capgo mengirim versinya ke pengguna

#### Nonaktifkan strategi auto-upgrade

Ada beberapa strategi yang dapat Anda pilih. Anda dapat mempelajari lebih lanjut tentangnya [di sini](/docs/cli/commands/#disable-updates-strategy)

## Versi bundle JavaScript

Versi bundle JavaScript adalah yang Anda kirim ketika melakukan `npx @capgo/cli@latest bundle upload --channel production`

Jika Anda tidak menggunakan opsi `--bundle 123`, Capgo akan mengambil versi bundle dari file `packagejson` Anda (di kunci version)

Setelah aplikasi Ionic Anda menginstal satu versi dari Capgo, inilah versi yang akan dibandingkan untuk:
- Versi bundle JavaScript mereka (123) lebih rendah dari versi bundle Capgo (124), Capgo mengirim bundlenya ke pengguna

Dengan beberapa kondisi pengaman:
- Jika versi bundle native lebih tinggi dari versi Capgo, kondisi `Disable auto downgrade under native` diterapkan
- Jika versi bundle native MAJOR lebih rendah dari versi Capgo, kondisi `Disable auto upgrade above major` diterapkan

## Pembaruan App store

Ketika Anda mempublikasikan aplikasi Capacitor JS Anda di App Store, yang terjadi sangatlah sederhana

Pengguna Anda akan mendapatkan versi baru dari store dan menghapus semua pembaruan lokal di aplikasi mereka secara default

Jika Anda ingin mengubah perilaku tersebut, Anda perlu mengatur pengaturan `resetWhenUpdate` baca lebih lanjut tentangnya [di sini](/docs/plugin/api#settings)

Ini hanya dapat diubah di sisi aplikasi, tidak dari cloud seperti pengaturan lainnya

### Pengaturan Lainnya

Setelah semua perilaku ini, Anda dapat memiliki di atasnya beberapa yang spesifik terkait dengan deviceID

Di Capgo, Anda dapat memutuskan untuk menimpa perilaku untuk setiap deviceID

Anda dapat menghubungkan satu deviceID ke:
- versi bundle tertentu
- channel tertentu

Ini akan melewati semua pengaturan yang dilakukan di atas

Pelajari lebih lanjut tentangnya di artikel di bawah ini