---
slug: how-to-send-specific-version-to-users
title: Come inviare un aggiornamento specifico a un utente o a un gruppo
description: >-
  Mari kita membuat pengguna dapat mencoba versi beta tanpa perlu menggunakan
  TestFlight atau proses beta Google. Tersedia dengan hanya menambahkan tombol
  ke aplikasi Ionic Anda!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: Alternatif untuk ilustrasi TestFlight
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: alternatives
published: true
locale: id
next_blog: ''
---

## Pendahuluan

Ketika Anda mulai menikmati sistem pembaruan Capgo, seperti saya untuk aplikasi-aplikasi saya, Anda akan mulai merasakan "Bagaimana jika saya ingin lebih?"

Saya juga merasakan hal yang sama, tapi karena saya pembuat Capgo, saya bisa mencari tahu!

> Karena semuanya open-source, Anda juga memiliki kemampuan ini :)

Masalah berikutnya yang saya hadapi dalam proses distribusi aplikasi Capacitor adalah membuat anggota tim lain menguji pembaruan!

Dengan TestFlight, masalahnya sederhana, membawa orang ke dalam tim Anda dan membuat mereka memahami cara mendapatkannya memakan waktu!

Dan tentu saja, setiap kali Anda mengirim ke Apple, ada proses peninjauan acak oleh bot yang bisa memakan waktu 5 menit atau 5 jam, Anda tidak pernah tahu

Saya sering kali presentasi saya tertunda karena hal ini...

Dan untuk Google bahkan lebih buruk, misteri besar dalam hidup saya, merilis versi produksi memakan waktu kurang dari 2 jam, tapi merilis beta tertutup memakan waktu 1-2 hari

## Solusi

Untuk memperbaiki ini, saya membuat sistem Channel di Capgo

`npx @capgo/cli@latest bundle upload -c production` akan memperbarui ke semua pengguna (jika channel production diatur sebagai default)

Jika Anda melakukan `npx @capgo/cli@latest bundle upload -c development` maka versi akan masuk ke channel yang berbeda, ini dapat diotomatisasi di [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/)

Kemudian Anda memiliki 2 cara untuk membiarkan pengguna mendapatkan pembaruan dari channel

### Cara Super Otomatis

Ini bisa berguna ketika Anda tidak ingin membuat backend sendiri untuk pengaturan channel, ini cepat untuk diimplementasikan

Dengan cara ini, satu-satunya hal yang perlu Anda lakukan adalah mengizinkan salah satu channel Anda untuk dapat diatur sendiri

![Izinkan pengaturan mandiri di Capgo](/self_setwebp)

Dan kemudian tambahkan ini dalam kode aplikasi Ionic Anda, untuk pengalaman terbaik, gunakan ini setelah pengguna mengklik tombol seperti "daftar untuk beta"
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### Cara Manual

Ini bisa berguna untuk tim internal Anda, ini cepat untuk diimplementasikan
Izinkan pengguna untuk menyalin deviceID mereka dari aplikasi Anda dan mengirimkannya kepada Anda secara manual, kode ini akan membantu Anda mendapatkannya:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
Sembunyikan tombol di suatu tempat di aplikasi Anda, atau tampilkan tombol hanya untuk pengguna yang terhubung dengan peran `admin`, misalnya

Kemudian Buka aplikasi Web atau native Capgo, masuk sebagai admin aplikasi, pilih aplikasi Anda, klik daftar perangkat

Kemudian masukkan deviceID di kolom pencarian klik yang ditemukan dan kemudian klik tautan Channel pilih `development`, minta rekan tim Anda untuk membuka aplikasi lagi, tunggu 30 detik dan buka tutup

Dia seharusnya mendapatkan versi Anda

### Cara Otomatis

Ini bisa berguna untuk penguji beta Anda, ini lebih lama untuk diimplementasikan

Sama seperti cara manual, Anda harus mendapatkan deviceID
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

Tapi kali ini Anda harus mengirimkannya secara otomatis ke backend Anda, saya biarkan Anda memutuskan bagaimana melakukannya

Saya hanya akan menyarankan Anda untuk menyimpannya dalam database, itu akan memudahkan hidup Anda nantinya

Kemudian di backend Anda, Anda harus mengirimkannya ke backend Capgo juga. Berikut dua contoh kode:
<Tabs>
  <TabItem value="nodejs" label="NodeJS">

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
</TabItem>

<TabItem value="cloudflare" label="Cloudflare">
  
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
Dan cukup kirim device_id Anda di body dengan metode POST untuk menambahkan dan DELETE untuk menghapus
</TabItem>

Setelah ini dikonfigurasi, coba tambahkan tombol di aplikasi Anda untuk opt in ke channel, dan periksa di aplikasi web apakah itu telah diatur

Anda juga dapat mengirim `null` untuk menghapus override

Jika Anda perlu memeriksa secara programatik override apa yang diatur pada perangkat, Anda dapat mendapatkannya di URL yang sama

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```