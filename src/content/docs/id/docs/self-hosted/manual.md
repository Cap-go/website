---
title: Manual
description: Cara menggunakan pembaruan Capgo dalam mode manual
sidebar:
  order: 3
locale: id
---

## Sebelum memulai

:::tip
Jika Anda menggunakan alat ini secara gratis, luangkan waktu untuk mendukung pekerjaan saya dengan [GitHub sponsor](https://githubcom/sponsors/riderx/)

Saya membuat keputusan untuk membuka source code semua yang saya bangun di sini

Saya bisa saja menyimpannya untuk diri sendiri dan memberi harga tinggi

Sebaliknya, saya ingin menjadikannya bisnis yang terbuka dan transparan

Saya pikir ini akan membuat dunia kita menjadi tempat yang lebih baik dengan keterbukaan daripada pertentangan dan penyembunyian

Untuk mewujudkannya, kita semua perlu berpartisipasi, termasuk Anda 🥹

Jika layanan Capgo cloud tidak sesuai untuk Anda, dukung Maker independen [DI SINI](https://githubcom/sponsors/riderx/) sesuai keinginan Anda
:::

## Instalasi Cepat

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### Konfigurasi

Tambahkan ini ke konfigurasi Anda untuk menonaktifkan pembaruan otomatis:

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
       // Do the download during user active app time to prevent failed download
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // Do the switch when user leave app
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // in case the set fail, otherwise the new app will have to hide it
       }
     }
 })
```

⚠️ Jika Anda mengirim pembaruan yang rusak, aplikasi akan kembali ke versi terakhir yang berfungsi, atau yang disertakan dengan build native, jika tidak ada yang berfungsi

## Aplikasi Demo

Periksa aplikasi demo untuk informasi lebih lanjut

[GitHub - Cap-go/demo-app: demo app with manual and auto mode](https://githubcom/Cap-go/demo-app/)

## Paket

Apapun nama file yang Anda pilih untuk diunduh dari URL server rilis/pembaruan Anda, file zip harus berisi seluruh konten folder output build Capacitor produksi Anda, biasanya `{project directory}/dist/` atau `{project directory}/www/`

Di sinilah `indexhtml` akan berada, dan juga harus berisi semua JavaScript yang dibundel, CSS, dan sumber daya web yang diperlukan agar aplikasi Anda dapat berjalan

Jangan enkripsi file ini dengan kata sandi, atau file akan gagal dibongkar