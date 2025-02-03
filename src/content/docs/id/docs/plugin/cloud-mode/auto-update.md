---
title: Pembaruan Otomatis
description: Cara menggunakan pembaruan otomatis dengan Capacitor-Updater
sidebar:
  order: 2
locale: id
---

Mode ini memungkinkan pengembang untuk menggunakan capacitor-updater dengan mode pembaruan otomatis dan mengirim pembaruan melalui saluran Capgo atau yang setara

### Prasyarat

Pastikan versi aplikasi Anda menggunakan [https://semverorg/](https://semverorg/) sebelum menggunakan pembaruan otomatis Capgo

Ini adalah konvensi yang digunakan untuk mengelola versi di Capgo

Ada dua cara untuk mengatur versi di aplikasi Anda:

Cara baru: Gunakan field `version` di file `capacitorconfigjson` Anda

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Aktifkan pembaruan otomatis, true secara default
      "appId": "comexampleapp", // Digunakan untuk mengidentifikasi aplikasi di server
      "version": "100" // Digunakan untuk memeriksa pembaruan
    }
  }
}
```
Opsi ini akan digunakan oleh plugin untuk memeriksa pembaruan, dan CLI untuk mengunggah versi

Cara lama:
Di 3 file dalam proyek Anda:

* `packagejson` di **version**
* `android/app/buildgradle` di **versionName**
* `ios/App/Appxcodeproj/projectpbxproj` di **CURRENT\_PROJECT\_VERSION**

### Tutorial

Siapkan aplikasi Anda dalam 5 menit

[Perbarui aplikasi capacitor Anda dengan mulus menggunakan capacitor updater](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Siapkan CI Anda dalam 5 menit

[Build dan rilis otomatis dengan GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### Instalasi

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Pengantar

Klik pada [register](https://capgoapp) untuk membuat akun Anda

Server memungkinkan Anda mengelola saluran dan versi dan banyak lagi

`autoUpdate` akan menggunakan data dari `capacitorconfig` untuk mengidentifikasi server Capgo

:::note
Anda masih dapat menggunakan Capgo Cloud tanpa mengirim kode Anda ke server kami jika itu tidak diizinkan oleh perusahaan Anda
:::

#### Validasi versi

Ketika pembaruan otomatis diatur, Anda harus memberi tahu dari dalam JS bahwa aplikasi Anda hidup dan siap

Ini dapat dilakukan dengan memanggil `notifyAppReady` dalam aplikasi Anda

Lakukan secepat mungkin

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### Alur pengguna
* Pengguna membuka aplikasi, aplikasi memanggil server untuk memeriksa pembaruan, jika ditemukan akan diunduh di latar belakang
* Pengguna meninggalkan aplikasi, versi baru diatur sebagai aktif
* Pengguna membuka aplikasi lagi, kita memuat versi aktif baru dan mengaturnya sebagai default
* Jika `notifyAppReady()` dipanggil, ketika pengguna meninggalkan aplikasi, versi sebelumnya dihapus
* Pengguna melanjutkan alur normal aplikasi sampai siklus pembaruan berikutnya

:::danger
⚠️ Tidak memanggil `notifyAppReady()` dalam aplikasi Anda, akan membuat versi saat ini ditandai sebagai tidak valid dan akan kembali ke bundle atau stok yang valid sebelumnya
:::

#### Alur pengembangan

Ketika Anda mengembangkan fitur baru, pastikan untuk memblokir `autoUpdate`, karena capgo akan terus menimpa pekerjaan Anda dengan bundle pembaruan terbaru
Atur `autoUpdate` ke false dalam konfigurasi Anda
Jika karena alasan tertentu Anda terjebak pada pembaruan, Anda dapat menghapus aplikasi dan menginstalnya kembali
Pastikan untuk mengatur `autoUpdate` ke false dalam konfigurasi Anda sebelum melakukannya
Dan kemudian build lagi dengan Xcode atau Android studio

Untuk mengunggah versi di setiap commit, siapkan CI/CD dengan panduan ini

[Build dan rilis otomatis dengan GitHub actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### Event Major Available

Ketika `disableAutoUpdateBreaking` diatur ke true, Anda dapat mendengarkan event untuk mengetahui ketika aplikasi menolak untuk melakukan pembaruan major yang merusak

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable was fired', infoversion)
})
```