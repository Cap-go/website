---
locale: id
---

Tutorial Paket capgo/capacitor-updater

Tutorial ini akan memandu Anda melalui proses menggunakan paket `@capgo/capacitor-updater` untuk mengaktifkan pembaruan otomatis di aplikasi Ionic Capacitor Anda.

## Prasyarat

Sebelum kita mulai, pastikan Anda telah menginstal yang berikut:

- Nodejs
- npm

## Instalasi

Untuk menginstal paket `@capgo/capacitor-updater`, buka terminal atau prompt perintah Anda dan jalankan perintah berikut:

```
npm install @capgo/capacitor-updater
```

Ini akan mengunduh dan menginstal paket di proyek Anda.

### Instal plugin

Anda harus mengakhiri dengan kode ini ditambahkan ke aplikasi Anda:

`npm i @capgo/capacitor-updater && npx cap sync`
Untuk menginstal plugin ke dalam aplikasi Capacitor Anda.

Kemudian tambahkan kode ini ke aplikasi Anda untuk memberi tahu plugin asli bahwa bundel JS dalam keadaan baik, plugin asli akan kembali ke versi sebelumnya, jika Anda gagal melakukannya:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ini akan memberitahu plugin asli bahwa instalasi berhasil.

Kemudian lakukan `npm run build && npx cap copy` untuk memperbarui aplikasi Anda.

### Masuk ke Capgo CLOUD

Pertama, gunakan `all` [apikey](https://web.capgo.app/dashboard/apikeys/) yang ada di akun Anda untuk masuk dengan CLI:

`npx @capgo/cli@latest login YOU_KEY`

### Tambahkan aplikasi pertama Anda

Mari kita mulai dengan terlebih dahulu membuat aplikasi di Capgo Cloud dengan CLI.

`npx @capgo/cli@latest app add`

Perintah ini akan menggunakan semua variabel yang didefinisikan dalam file konfigurasi Capacitor untuk membuat aplikasi.

### Unggah versi pertama Anda

Jalankan perintah untuk membangun kode Anda dan mengirimkannya ke Capgo dengan:
`npx @capgo/cli@latest bundle upload`

Secara default, nama versi akan menjadi nama yang ada di file `packagejson` Anda.

Periksa di [Capgo](https://web.capgo.app/) jika build sudah ada.

Anda bahkan dapat mengujinya dengan [aplikasi sandbox mobile](https://capgo.app/app_mobile/) saya.

### Jadikan saluran default

Setelah Anda mengirim aplikasi Anda ke Capgo, Anda perlu menjadikan saluran Anda `default` agar aplikasi dapat menerima pembaruan dari Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Menerima Pembaruan Langsung di Perangkat

Agar aplikasi Anda menerima pembaruan langsung dari Deploy, Anda perlu menjalankan aplikasi di perangkat atau emulator. Cara termudah untuk melakukannya adalah dengan menggunakan perintah berikut untuk meluncurkan aplikasi lokal Anda di emulator atau perangkat yang terhubung ke komputer Anda.

    npx cap run [ios | android]

Buka aplikasi, letakkan di latar belakang dan buka lagi, Anda harus melihat di log bahwa aplikasi telah melakukan pembaruan.

Selamat! 🎉 Anda telah berhasil melakukan penyebaran Pembaruan Langsung pertama Anda. Ini baru awal dari apa yang dapat Anda lakukan dengan Pembaruan Langsung. Untuk mempelajari lebih lanjut, lihat dokumen lengkap [Pembaruan Langsung](/docs/plugin/cloud-mode/getting-started/).

> Jika Anda perlu menghentikan penerimaan pembaruan secara lokal, jalankan perintah ini:
`npx @capgo/cli@latest channel set`

## Kesimpulan

Selamat! Anda telah berhasil mempelajari cara menggunakan paket `@capgo/capacitor-updater` untuk mengaktifkan pembaruan otomatis di aplikasi Ionic Capacitor Anda. Baik Anda memilih pembaruan otomatis atau pengaturan manual, Anda sekarang memiliki alat untuk menjaga aplikasi Anda tetap terkini dengan mudah.