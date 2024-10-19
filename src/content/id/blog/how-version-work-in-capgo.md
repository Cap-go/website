---
slug: how-version-work-in-capgo
title: Bagaimana cara kerja versi di Capgo
description: >-
  Pahami bagaimana Capgo mengelola versi dalam aplikasi Capacitor Anda dan
  gunakan secara optimal. Pelajari arti dari Mayor, Minor, dan Patch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Sistem versi paket Capgo
tag: Tutorial
published: true
locale: id
next_blog: how-to-release-major-version-in-capgo
---

Capgo menggunakan 2 variabel utama untuk mengelola versi di aplikasi Capacitor Anda:
  - Versi native
  - Versi JavaScript

Semua pilihan versi diputuskan di sisi server oleh Capgo

## Sistem versi

Untuk mengelola versi, Capgo menggunakan sistem SemVer, baca lebih lanjut tentangnya [di sini](https://semverorg/)

### Versi

Di mana Capgo menemukan versi untuk dibandingkan

  > Anda dapat mengganti perilaku ini dengan mengatur kunci versi di file `capacitorconfigjson` [dokumentasi di sini](/docs/plugin/settings/#version)
  > Versi native akan diabaikan untuk semua platform

#### IOS

 Di IOS variabel diatur pada proyek Anda di sini `ios/App/App/Infoplist` di bawah kunci `CFBundleShortVersionString` atau `ios/App/Appxcodeproj/projectpbxproj` di bawah kunci `MARKETING_VERSION` jika `MARKETING_VERSION` diatur dalam file `Infoplist` Anda

#### Android

  Di Android, variabel diatur pada proyek Anda di sini `android/app/buildgradle` di bawah kunci `defaultConfigversionName`

#### JavaScript ( versi bundle Capgo )

  Di JavaScript, variabel dapat diatur di `packagejson` Anda di bawah kunci `version`
  Jika tidak, Anda perlu menyediakannya dalam perintah unggah

## Perilaku default

Inilah bagaimana saluran Capgo akan berperilaku jika Anda tidak mengubah pengaturan apa pun

> Perilaku ini akan didasarkan pada saluran unik yang Anda jadikan default

### Ketika Instalasi Baru aplikasi Capacitor Anda
Ketika pengguna mengunduh aplikasi Ionic Anda untuk pertama kalinya dan membuka aplikasi, aplikasi menghubungi server Capgo

Saat ini, 4 hasil dapat terjadi:
  - Versi bundle native (123) lebih rendah dari versi bundle Capgo (124), Capgo mengirimkan bundlenya ke pengguna
  - Versi bundle native (123) sama dengan versi bundle Capgo (123), Capgo mengirim "tidak perlu diperbarui"
  - Versi bundle native (124) lebih tinggi dari versi bundle Capgo (123), Capgo mengirim "tidak perlu diperbarui"
  - Versi bundle native (123) MAJOR lebih rendah dari versi bundle Capgo (223), Capgo mengirim "tidak perlu diperbarui"

### Pengaturan lainnya

#### Nonaktifkan penurunan otomatis di bawah native

Jika Anda mengubah pengaturan ini menjadi false, Capgo akan menganggap dirinya selalu sebagai sumber versi yang dapat dipercaya
Kemudian perilakunya menjadi:
- Versi native (124) lebih tinggi dari versi Capgo (123)

> Capgo mengirimkan versinya ke pengguna

#### Nonaktifkan strategi peningkatan otomatis

Ada beberapa strategi yang dapat Anda pilih. Anda dapat mempelajari lebih lanjut tentangnya [di sini](/docs/tooling/cli/#disable-updates-strategy)

## Versi bundle JavaScript

Versi bundle JavaScript adalah yang Anda kirim saat melakukan `npx @capgo/cli@latest bundle upload --channel production`

Jika Anda tidak menggunakan opsi `--bundle 123`, Capgo akan mendapatkan versi bundle dari file `packagejson` Anda (di kunci versi)

Setelah aplikasi Ionic Anda menginstal satu versi dari Capgo, versi inilah yang akan dibandingkan untuk:
  - Versi bundle JavaScript mereka (123) lebih rendah dari versi bundle Capgo (124), Capgo mengirimkan bundlenya ke pengguna

Dengan beberapa kondisi pengaman:
  - Jika versi bundle native lebih tinggi dari versi Capgo, kondisi `Nonaktifkan penurunan otomatis di bawah native` diterapkan
  - Jika versi bundle native MAJOR lebih rendah dari versi Capgo, kondisi `Nonaktifkan peningkatan otomatis di atas major` diterapkan

## Pembaruan App Store

Ketika Anda mempublikasikan aplikasi Capacitor JS Anda di App Store, yang terjadi sangat sederhana

Pengguna Anda akan mendapatkan versi baru dari toko dan menghapus semua pembaruan lokal di aplikasi mereka secara default

Jika Anda ingin mengubah perilaku itu, Anda perlu mengatur pengaturan `resetWhenUpdate` baca lebih lanjut tentangnya [di sini](/docs/plugin/api#settings)

Ini hanya dapat diubah di sisi aplikasi, bukan dari cloud seperti pengaturan lainnya

### Pengaturan lainnya

Setelah semua perilaku ini, Anda dapat memiliki di atasnya beberapa yang spesifik terkait dengan deviceID

Di Capgo, Anda dapat memutuskan untuk mengganti perilaku untuk setiap deviceID

Anda dapat menghubungkan satu deviceID ke:
  - versi bundle tertentu
  - saluran tertentu

Ini akan melewati semua pengaturan yang dilakukan di atas

Pelajari lebih lanjut tentangnya dalam artikel di bawah ini