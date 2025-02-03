---
title: Aggiornamento ibrido
description: Metode Pembaruan untuk Pembaruan Otomatis
sidebar:
  order: 3
locale: id
---

Saat memberikan pembaruan kepada pengguna Anda memiliki beberapa cara untuk menangani siklus pembaruan sesuai kebutuhan sebelum menerapkannya

- Pembaruan diam-diam
- Mendengarkan event ```updateAvailable```
- Menampilkan jendela modal atau menunda pembaruan


## Pembaruan diam-diam

Anda dapat memaksa siklus pembaruan terjadi setiap kali aplikasi dimulai dengan mengatur `directUpdate` ke `true`,
ini akan memicu siklus pembaruan seperti biasa tanpa interaksi pengguna

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"directUpdate": true,
		},
    "SplashScreen": {
      "launchAutoHide": false,
    }
	}
}
```

Dan kemudian di aplikasi Anda, Anda harus menyembunyikan splash screen saat menerima event `appReady`:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdaternotifyAppReady()
```

## Pembaruan paksa

Tambahkan listener ke event `updateAvailable` kemudian tampilkan alert untuk memberitahu pengguna bahwa aplikasi akan diperbarui:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: 'Pembaruan Tersedia',
      message: `Versi ${resbundleversion} tersedia. Aplikasi akan diperbarui sekarang`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```

## Pembaruan modal

Anda juga dapat membiarkan pengguna memutuskan dengan menampilkan dialog untuk meminta mereka melakukan pembaruan:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: 'Pembaruan Tersedia',
      message: `Versi ${resbundleversion} tersedia. Apakah Anda ingin memperbarui sekarang?`,
    })

    if (value)
      CapacitorUpdaterset(resbundle)

  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```