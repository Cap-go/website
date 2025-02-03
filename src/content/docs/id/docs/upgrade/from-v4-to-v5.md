---
title: Von V4 zu V5
description: Bagaimana cara bermigrasi dari V4 ke V5
sidebar:
  order: 2
locale: id
---

## Mengapa peningkatan ini

Versi major ini hadir untuk mengikuti versi major Capacitor

Pertama ikuti panduan migrasi Capacitor:

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## Instalasi

`npm i @capgo/capacitor-updater@5`

`Kemudian sinkronkan pembaruan kode native:`

`npx cap sync`

Selesai! Sangat mudah!

## Mode manual

Jika Anda mendapatkan pembaruan sendiri dengan getLatest, ada sedikit perubahan
Sekarang jika Anda sudah menggunakan versi terbaru, itu akan masuk ke catch
Setiap respons yang berbeda dari pembaruan yang tersedia akan melakukan itu