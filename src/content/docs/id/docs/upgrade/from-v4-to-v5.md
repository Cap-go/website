---
title: Dari V4 ke V5
description: Cara Update dari V4 ke V5
sidebar:
  order: 2
locale: id
---

## Mengapa upgrade ini

Versi major ini hadir untuk mengikuti versi major Capacitor

Pertama ikuti panduan migrasi Capacitor:

[https://capacitorjs.com/docs/updating/5-0](https://capacitorjs.com/docs/updating/5-0/)

## Instalasi

`npm i @capgo/capacitor-updater@5`

`Kemudian sinkronkan pembaruan kode native:`

`npx cap sync`

Itu saja! Sangat mudah!

## Mode manual

Jika Anda mendapatkan pembaruan sendiri dengan getLatest, ada sedikit perubahan
Sekarang jika Anda sudah memiliki versi terbaru, proses akan masuk ke catch
Setiap respons yang berbeda dari pembaruan yang tersedia akan melakukan hal tersebut