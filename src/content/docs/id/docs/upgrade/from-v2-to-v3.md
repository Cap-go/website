---
title: V2에서 V3로
description: Cara upgrade dari V2 ke V3
sidebar:
  order: 4
locale: id
---

Dokumentasi ini akan menjelaskan cara upgrade ke versi 3 dari auto-update

## Pertama migrasikan ke peralatan terbaru:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Hapus semua konfigurasi sebelumnya:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

untuk hanya menyisakan ini:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ Jika Anda menggunakan server Anda sendiri dengan `autoUpdateURL`, saya akan segera memperbarui panduan ini untuk Anda. Sementara itu, lihat opsi upload baru `external` yang memungkinkan Anda hanya mengirim tautan zip, bukan kode di Capgo cloud. Ini dibuat untuk perusahaan dengan kebijakan privasi yang ketat. Dalam mode external, kode tidak akan pernah masuk ke server Capgo, kami hanya menyimpan URL dan mengirimkannya ke perangkat yang akan langsung mengunduhnya. Dalam cara standar, kode dikompresi dan disimpan di server kami, tetapi kami tidak akan pernah membukanya atau menggunakannya juga.

## Apa yang berubah

Semua konfigurasi menjadi sisi server untuk auto-update, untuk memberi Anda lebih banyak kontrol tentang bagaimana Anda mengirim pembaruan ke pengguna

Ini memungkinkan kami untuk mengembalikan, bahkan men-deploy hanya ke satu pengguna dengan channel! Pengaturan ini ditambahkan kembali ke antarmuka web:

* menonaktifkan pengembalian di bawah native
* menonaktifkan pembaruan di atas major

> ⚠️ Mereka akan menjadi true secara default untuk semua channel

Ini juga akan menghilangkan kebutuhan untuk sering memperbarui plugin, sebagian besar pembaruan akan dilakukan di sisi server, dan Anda akan mendapatkannya tanpa perubahan di sisi Anda

> ⚠️ Reset ketika pembaruan menjadi default, jadi jika Anda lebih suka untuk tidak menghapus semua versi unduhan saat memperbarui dari toko, lakukan ini:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Perbarui kode Anda

Terakhir, perbarui semua impor di JS dari:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

menjadi

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Kemudian build kode Anda lagi `npm run build` dan salin aset sekali lagi `npx cap copy`

Sekarang Anda seharusnya bisa menguji sistem auto-update terbaru

Kirim versi Anda dengan:

```
npx @capgo/cli@latest upload
```

alih-alih

```
npx capgo upload
```

## Evolusi masa depan

Untuk saat ini hanya channel publik pertama yang digunakan, di masa depan, publik akan berubah untuk multi channel publik, jika lebih dari satu diatur

## Masalah umum:

* Masalah build setelah upgrade: jika Anda telah membuka kode sumber plugin di Android studio atau Xcode, terkadang sinkronisasi tidak menghapusnya, itu penyebab masalahnya. Buka IDE native dan hapus `capacitor-updater` secara manual dan lakukan `npx cap sync` ini seharusnya menyelesaikan masalah