---
title: Handbuch
description: Cara menggunakan pembaruan Capgo secara manual
sidebar:
  order: 3
locale: id
---

## Sebelum memulai

:::tip
Jika Anda menggunakan alat ini secara gratis, luangkan waktu untuk mendukung pekerjaan saya dengan [GitHub sponsor](https://githubcom/sponsors/riderx/)

Saya membuat taruhan untuk membuka source code semua kode yang saya buat di sini

Saya bisa saja menyimpannya untuk diri sendiri dan memberikan harga tinggi

Sebaliknya, saya ingin menjadikannya bisnis yang terbuka dan transparan

Saya pikir ini akan membuat dunia kita menjadi tempat yang lebih baik dengan keterbukaan daripada bertarung dan bersembunyi

Untuk mewujudkannya, kita semua perlu berperan, termasuk Anda 🥹

Jika penawaran Capgo cloud tidak cocok untuk Anda, dukung Maker bootstrapped [DI SINI](https://githubcom/sponsors/riderx/) sesuai ketentuan Anda
:::

## Instalasi Cepat

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Konfigurasi

Tambahkan ini ke konfigurasi Anda, untuk menonaktifkan pembaruan otomatis:

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": false
		}
	}
}
```

Kemudian tambahkan kode ini ke aplikasi Anda untuk menggunakan unduhan manual

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // Lakukan unduhan selama waktu aplikasi aktif pengguna untuk mencegah unduhan gagal
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Lakukan pergantian saat pengguna meninggalkan aplikasi
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // jika pengaturan gagal, jika tidak aplikasi baru harus menyembunyikannya
       }
     }
 })
```

⚠️ Jika Anda mengirim pembaruan yang rusak, aplikasi akan kembali ke versi terakhir yang berfungsi, atau yang disertakan dengan build native, jika tidak ada yang berfungsi

## Aplikasi Demo

Periksa aplikasi demo untuk informasi lebih lanjut

[GitHub - Cap-go/demo-app: aplikasi demo dengan mode manual dan otomatis](https://githubcom/Cap-go/demo-app/)

## Paket

Apa pun nama file yang Anda unduh dari URL server rilis/pembaruan Anda, file zip harus berisi konten lengkap dari folder output build Capacitor produksi Anda, biasanya `{direktori proyek}/dist/` atau `{direktori proyek}/www/`

Di sinilah `indexhtml` akan berada, dan juga harus berisi semua JavaScript yang dibundel, CSS, dan sumber daya web yang diperlukan agar aplikasi Anda dapat berjalan

Jangan mengenkripsi file ini dengan kata sandi, atau file tersebut akan gagal dibongkar