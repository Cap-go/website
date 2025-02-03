---
title: Dari V3 ke V4
description: Cara Upgrade dari V3 ke V4
sidebar:
  order: 3
locale: id
---

## Mengapa upgrade ini

Setelah banyak diskusi di komunitas discord dengan Anda, saya menemukan mode manual terlalu manual dan tidak aman untuk digunakan, misalnya, auto-revert tidak memungkinkan, jadi jika gagal memperbarui secara manual pengguna harus menghapus aplikasi dan menginstal kembali, ini adalah UX yang buruk

Sementara itu, saya mengambil kesempatan ini untuk memberi Anda lebih banyak kebebasan, dan menghapus semua kode buruk yang saya buat

## Install

`npm i @capgo/capacitor-updater@4`

## Auto-update cloud

Jika Anda menggunakan contoh dasar di aplikasi Anda, Anda aman untuk bermigrasi ke versi baru, selamat menikmati!

## Auto-update self-hosted

Untuk Anda, masih sederhana, perubahannya adalah:

* Nama pengaturan dari `autoUpdateUrl` menjadi `updateUrl`
* Metode Endpoint berubah dari `GET` ke POST

## Pengguna Manual

Untuk Anda, ini adalah perubahan paling signifikan, tapi untuk yang terbaik! Anda mendapatkan banyak peningkatan, Baca dengan cermat

## Perubahan

* `autoUpdateUrl` menjadi `updateUrl` karena pengaturan ini sekarang juga dapat digunakan dalam mode manual
* Penghapusan `cancelDelay` dan `delayUpdate` diganti dengan `setDelay`
* Tidak ada lagi `versionName` dalam set
* Perubahan kunci `version`, yang dikembalikan di sebagian besar fungsi menjadi objek `BundleInfo`

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* Penamaan ulang nama yang menyesatkan sekarang (bahkan untuk menjelaskan tidak bisa jelas, tapi saat penggunaan mudah memahami yang baru):
  * yang disebut `version` sekarang mengacu pada `bundle`
  * `id` mengacu pada `version` lama yang merupakan string acak 10 karakter, `id` ini adalah satu-satunya cara yang dapat dipercaya dan unik untuk mengakses bundle Anda, contoh `7Dfcd2RedN`
  * `version` sekarang mengacu pada `versionName` yang Anda pilih untuk bundle, contoh `100`
* `updateUrl` berubah dari `get` ke `post`, karena header kustom menjadi masalah bagi beberapa dari Anda dan post lebih logis, semua header sebelumnya masuk ke body dan prefix `cap_` hilang
* Metode `versionName` dihapus, diganti dengan `getId`
* list sekarang mengembalikan daftar `BundleInfo`
* Mengganti nama `getId` menjadi `getDeviceId`
* `autoUpdate` menjadi true secara default, jika Anda menggunakan mode Manual, atur ke false

## Berita

* Metode `getLatest`, metode ini memungkinkan Anda mendapatkan versi terakhir yang tersedia dari server Anda yang diatur dengan `updateUrl`
* Metode `setDelay` yang mengambil `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}` sebagai argumen untuk mengatur penundaan ke mode berbeda
* Metode `next`, untuk mengatur versi di backgrounding berikutnya, berlawanan dengan `set` yang melakukannya secara instan
* Metode `isAutoUpdateEnabled`, untuk memberi tahu Anda apakah Anda berada dalam konteks auto-update
* Event `downloadComplete` ketika download mencapai 100%
* Menambahkan field wajib `version` dalam metode download
* `notifyAppReady` menjadi wajib dalam mode manual juga, jika tidak dipanggil setelah 10 detik aplikasi kembali ke versi sebelumnya

## Kontributor

[@lincolnthree](https://githubcom/lincolnthree/) Terima kasih banyak telah memulai pekerjaan ini, tidak mungkin membuat pembaruan ini berhasil tanpa Anda