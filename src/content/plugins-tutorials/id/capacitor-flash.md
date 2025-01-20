---
locale: id
---

Menyanyi paket `@capgo/capacitor-flash`

Paket `@capgo/capacitor-flash` memungkinkan Anda untuk menyalakan dan mematikan senter/torch perangkat Anda. Dalam tutorial ini, kami akan membimbing Anda melalui proses menginstal dan menggunakan paket ini di aplikasi Ionic Capacitor Anda.

## Instalasi

Untuk menginstal paket `@capgo/capacitor-flash`, jalankan perintah berikut di direktori root proyek Anda:

[[BLOK_KODE]]

## Pengaturan iOS

Paket `@capgo/capacitor-flash` dapat digunakan langsung di iOS, jadi tidak diperlukan pengaturan tambahan.

## Pengaturan Android

Untuk Android, Anda perlu mendeklarasikan izin yang diperlukan dalam file `AndroidManifest.xml` aplikasi Anda. Tambahkan baris berikut di dalam tag `<manifest>`:

[[BLOK_KODE]]

## API

Paket `@capgo/capacitor-flash` menyediakan metode API berikut:

### isAvailable()

Metode ini memeriksa apakah senter tersedia di perangkat.

[[BLOK_KODE]]

### switchOn(options)

Metode ini menyalakan senter perangkat Anda. Anda dapat mengirimkan opsi untuk menyesuaikan intensitas senter.

[[BLOK_KODE]]

### switchOff()

Metode ini mematikan senter perangkat.

[[BLOK_KODE]]

### isSwitchedOn()

Metode ini memeriksa apakah senter saat ini dalam keadaan menyala atau mati.

[[BLOK_KODE]]

### toggle()

Metode ini mengubah keadaan senter, yaitu, jika senter menyala, maka akan dimatikan, dan sebaliknya.

[[BLOK_KODE]]

Itu saja! Anda telah berhasil mempelajari cara menggunakan paket `@capgo/capacitor-flash` di aplikasi Ionic Capacitor Anda untuk mengontrol senter/torch perangkat Anda.