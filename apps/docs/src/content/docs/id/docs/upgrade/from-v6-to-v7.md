---
title: "Dari V6 ke V7"
locale: id
description: "Panduan detail tentang transisi dari versi 6 ke versi 7 dari Capgo updater, menguraikan langkah-langkah dan pertimbangan yang diperlukan untuk proses upgrade yang sukses, memastikan kompatibilitas dengan fitur dan peningkatan Capacitor terbaru."
sidebar:
  order: 2
---

## Mengapa upgrade ini

Versi mayor ini ada untuk mengikuti versi mayor Capacitor

Pertama ikuti panduan migrasi Capacitor:

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Instalasi

`npm i @capgo/capacitor-updater@7`

`Kemudian sinkronkan pembaruan kode native:`

`npx cap sync`

Itu saja! Cukup mudah!

## Migrasi Enkripsi

Jika Anda menggunakan metode enkripsi `key-v1`, Anda perlu bermigrasi ke sistem enkripsi baru karena `key-v1` tidak lagi didukung di V7. [[memory:96112]]

Ikuti panduan migrasi enkripsi di sini: [Panduan Migrasi Enkripsi](/docs/cli/migrations/encryption/)

## Perubahan Konfigurasi

Kami merekomendasikan menambahkan properti berikut di file `capacitor.config` Anda:
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

Pengaturan ini harus membantu mengelola plugin dan perilakunya dengan lebih baik.


