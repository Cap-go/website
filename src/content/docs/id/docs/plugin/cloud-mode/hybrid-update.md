---
title: Pembaruan Hibrid
description: Metode pembaruan untuk pembaruan otomatis
sidebar:
  order: 3
locale: id
---

Ketika mendorong pembaruan kepada pengguna Anda, ada beberapa cara untuk menangani siklus pembaruan sesuai kebutuhan sebelum menerapkannya

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

Dan kemudian di aplikasi Anda, Anda harus menyembunyikan splash screen ketika menerima event `appReady`:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdater.notifyAppReady()
```

## Pembaruan paksa

Tambahkan listener untuk event `updateAvailable` dan kemudian tampilkan peringatan untuk memberi tahu pengguna bahwa aplikasi akan diperbarui:

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

CapacitorUpdater.notifyAppReady()
```

## Pembaruan modal

Anda juga dapat membiarkan pengguna memutuskan dengan menampilkan dialog untuk meminta mereka memperbarui:

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

CapacitorUpdater.notifyAppReady()
```
