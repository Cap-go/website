---
title: 설정
description: Semua konfigurasi yang tersedia untuk Capacitor Updater
sidebar:
  order: 8
locale: id
---

Untuk memiliki kontrol yang lebih detail atas sistem pembaruan, Anda dapat mengonfigurasinya dengan pengaturan berikut:

## `appReadyTimeout`

> Mengonfigurasi jumlah milidetik plugin native harus menunggu sebelum menganggap pembaruan 'gagal'

Hanya tersedia untuk Android dan iOS

Default: `10000` (10 detik)

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000
    }
  }
}
```

## `responseTimeout`

> Mengonfigurasi jumlah milidetik plugin native harus menunggu sebelum menganggap API timeout

Hanya tersedia untuk Android dan iOS

Default: `20` (20 detik)

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "responseTimeout": 1000
    }
  }
}
```

## `autoDeleteFailed`

> Mengonfigurasi apakah plugin harus secara otomatis menghapus bundle yang gagal

Hanya tersedia untuk Android dan iOS

Default: `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeleteFailed": false
    }
  }
}
```

## `autoDeletePrevious`

> Mengonfigurasi apakah plugin harus secara otomatis menghapus bundle sebelumnya setelah pembaruan berhasil

Hanya tersedia untuk Android dan iOS

Default: `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeletePrevious": false
    }
  }
}
```

## `autoUpdate`

> Mengonfigurasi apakah plugin harus menggunakan Pembaruan Otomatis melalui server pembaruan

Hanya tersedia untuk Android dan iOS

Default: `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

## `updateUrl`

> Mengonfigurasi URL / endpoint tempat pemeriksaan pembaruan dikirim

Hanya tersedia untuk Android dan iOS

Default: `https://apicapgo.app/updates`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "updateUrl": "https://examplecom/api/updates"
    }
  }
}
```

## `statsUrl`

> Mengonfigurasi URL / endpoint tempat statistik pembaruan dikirim

Hanya tersedia untuk Android dan iOS. Setel ke "" untuk menonaktifkan pelaporan statistik

Default: `https://apicapgo.app/stats`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "statsUrl": "https://examplecom/api/stats"
    }
  }
}
```

## `privateKey`

> Mengonfigurasi kunci pribadi untuk enkripsi pembaruan langsung end-to-end

Hanya tersedia untuk Android dan iOS

Buat kunci pribadi dengan perintah `npx @capgo/cli key create`

Default: `undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "privateKey": "YOUR_KEY"
    }
  }
}
```

## `directUpdate`

> Membuat plugin langsung menginstal pembaruan ketika aplikasi baru saja diperbarui/diinstal. Hanya berlaku untuk mode autoUpdate

Hanya tersedia untuk Android dan iOS

Default: `undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `resetWhenUpdate`

:::note
Ketika pembaruan toko terjadi, nonaktifkan reset paksa ke versi native
:::

Ada banyak pengaturan lain yang tersedia hanya di [web app](https://console.capgo.app/login)

Untuk mengonfigurasi plugin, gunakan pengaturan ini:

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "resetWhenUpdate": false
    }
  }
}
```

## `directUpdate`
Membuat plugin langsung menginstal pembaruan ketika aplikasi baru saja diperbarui/diinstal. Hanya berlaku untuk mode autoUpdate

:::caution
Pengaturan ini mengharuskan Anda menyembunyikan aplikasi dari pengguna saat pembaruan sedang diinstal. Jika tidak, aplikasi akan reset ketika pengguna sedang bernavigasi
:::

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `defaultChannel`
Mengatur channel default untuk aplikasi. Ini akan menimpa channel lain yang diatur di Capgo jika channel mengizinkan penimpaan

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "defaultChannel": "production"
    }
  }
}
```

## `appId`
Mengatur appId untuk aplikasi. Ini akan menimpa cara lain untuk mendapatkan appId. Ini berguna ketika Anda ingin memiliki appId yang berbeda di Capgo dan di kode native Anda
:::note
Ini adalah cara baru untuk mengatur appId. Cara lama masih dan akan tetap didukung
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "AppId": "comexampleapp"
    }
  }
}
```

## `version`
Mengatur versi untuk aplikasi. Ini akan menimpa cara lain untuk mendapatkan versi. Ini berguna ketika Anda ingin memiliki versi yang berbeda di Capgo dan di kode native Anda
:::note
Ini adalah cara baru untuk mengatur versi. Cara lama masih dan akan tetap didukung
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "version": "123"
    }
  }
}
```
