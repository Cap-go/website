---
slug: how-to-send-specific-version-to-users
title: >-
  Bagaimana cara mengirim pembaruan spesifik kepada satu pengguna atau
  sekelompok pengguna
description: >-
  Izinkan pengguna Anda mencoba versi beta tanpa perlu TestFlight, atau proses
  beta Google, cukup tambahkan tombol di aplikasi Ionic Anda, dan mereka sudah
  bisa!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: Ilustrasi alternatif TestFlight
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: alternatives
published: true
locale: id
next_blog: ''
---
## Pendahuluan

Ketika Anda mulai menikmati sistem pembaruan Capgo, seperti saya untuk aplikasi saya, Anda akan mulai merasakan “Bagaimana jika saya menginginkan lebih?”

Saya juga merasakan hal itu, tetapi karena saya adalah pembuat Capgo, saya bisa melihatnya!

> Karena semuanya bersifat open-source, Anda juga memiliki kekuatan ini :)

Rasa sakit berikutnya yang saya alami dalam proses distribusi aplikasi Capacitor adalah membuat rekan-rekan lain menguji pembaruan!

Dengan TestFlight, masalahnya sederhana, membawa orang ke tim Anda dan membuat mereka memahami cara mendapatkannya memakan waktu!

Dan tentu saja, setiap kali Anda mengirim ke Apple, Anda memiliki proses tinjauan acak oleh bot yang bisa memakan waktu 5 menit atau 5 jam, Anda tidak pernah tahu.

Saya sering mengalami penundaan presentasi saya karena ini…

Dan untuk Google, ini bahkan lebih buruk, misteri besar dalam hidup saya, merilis versi produksi memakan waktu kurang dari 2 jam, tetapi merilis beta tertutup memakan waktu 1–2 hari.


## Solusi

Untuk mengatasinya, saya menciptakan sistem Channel di Capgo.

`npx @capgo/cli@latest bundle upload -c production` akan memperbarui untuk semua pengguna (jika saluran produksi disetel ke default)

Jika Anda melakukan `npx @capgo/cli@latest bundle upload -c development` maka versi tersebut akan masuk ke saluran yang berbeda, ini dapat diotomatisasi dalam [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/). 

Kemudian Anda memiliki 2 cara untuk membiarkan pengguna mendapatkan pembaruan dari saluran

### Cara Super Otomatis

Ini bisa berguna ketika Anda tidak ingin membuat backend Anda sendiri untuk pengaturan saluran, ini cepat untuk diimplementasikan.

Dengan cara ini, satu-satunya yang perlu Anda lakukan adalah membiarkan salah satu saluran Anda diatur menjadi diri sendiri.

![Izinkan set sendiri di Capgo](/self_set.webp)

Dan kemudian tambahkan ini di kode aplikasi Ionic Anda, untuk pengalaman terbaik, gunakan ini setelah pengguna mengklik tombol seperti "daftar untuk beta"
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Cara Manual

Ini bisa berguna untuk tim internal Anda, ini cepat untuk diimplementasikan.
Izinkan pengguna untuk menyalin deviceID mereka dari aplikasi Anda dan mengirimkannya kepada Anda secara manual, kode ini akan membantu Anda untuk mendapatkannya:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Sembunyikan tombol di suatu tempat di aplikasi Anda, atau tunjukkan tombol hanya kepada pengguna yang terhubung dengan peran `admin`, misalnya.

Kemudian pergi ke aplikasi web atau aplikasi native Capgo, masuk sebagai admin aplikasi, pilih aplikasi Anda, klik pada daftar perangkat.

Kemudian masukkan deviceID di bilah pencarian, klik perangkat yang ditemukan dan kemudian klik pada tautan Channel pilih `development`, minta rekan tim Anda untuk membuka aplikasi lagi, tunggu 30 detik dan tutup.

Dia seharusnya mendapatkan versi Anda.


### Cara Otomatis

Ini bisa berguna untuk penguji beta Anda, ini lebih lama untuk diimplementasikan.

Sama seperti cara manual, Anda harus mendapatkan deviceID
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Tapi kali ini Anda harus mengirimkannya secara otomatis ke backend Anda, saya serahkan kepada Anda untuk memutuskan bagaimana Anda melakukannya.

Saya hanya akan menyarankan Anda untuk menyimpannya di database, itu akan memudahkan hidup Anda nanti.

Kemudian di backend Anda, Anda juga harus mengirimkannya ke backend Capgo. Berikut dua contoh kode:
<details>
  <summary>NodeJS</summary>

```js
import axios from 'axios'

await axios.post('https://api.capgo.app/device', {
  app_id: 'YOUR_APP_ID',
  device_id: 'DEVICE_ID',
  channel: 'CHANNEL_NAME', // The name of the channel, or undefined if version_id provided
  version_id: 'VERSION_NAME' // this is optionnal, if provide it will override the channel, that usefull when you want to debug only one user.
}, {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})
```
</details>


<details>
  <summary>Cloudflare</summary>
  
```js
addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      err => new Response(err.stack, { status: 500 })
    )
  )
})

async function handleRequest(request) {
  const { pathname, method } = new URL(request.url)
  const body = await request.json()
  const newBody = JSON.stringify({
    app_id: 'YOUR_APP_ID',
    device_id: body.device_id,
    channel: 'alpha'
  })
  const newUrl = new URL('https://api.capgo.app/device')
  const options = {
    headers: {
      authorization: 'YOUR_API_KEY',
    },
    method: 'POST',
    body: newBody
  }

  if (request.method === 'DELETE') {
    // DELETE the channel link
    options.method = 'DELETE'
    return fetch(newUrl.toString(), options)
  }

  return fetch(newUrl.toString(), options)
}
```
Dan cukup kirim device_id Anda di body-nya ke URL yang dideploy dengan POST untuk menambahkan dan menggunakan metode DELETE untuk menghapus.
</details>

Setelah ini dikonfigurasi, coba untuk menambahkan tombol di aplikasi Anda untuk bergabung dengan saluran, dan periksa di aplikasi web apakah itu telah diatur.

Anda juga dapat mengirim `null` untuk menghapus override

Jika Anda perlu memeriksa secara pemrograman override apa yang disetel pada perangkat, Anda dapat memeriksanya di URL yang sama

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```
