---
locale: id
---

Sing @capgo/capacitor-mute Paket

Paket `@capgo/capacitor-mute` adalah plugin Capacitor yang memungkinkan Anda untuk mendeteksi apakah saklar bisu diaktifkan atau dinonaktifkan pada suatu perangkat. Ini menyediakan API sederhana untuk memeriksa status bisu perangkat.

## Instalasi

Anda dapat menginstal paket `@capgo/capacitor-mute` menggunakan npm:

```bash
npm install @capgo/capacitor-mute
npx cap sync
```

## Penggunaan

Untuk menggunakan paket `@capgo/capacitor-mute`, Anda perlu mengimpornya dan memanggil metode `isMuted()`

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  console.log('Mute status:', result);
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

Metode `isMuted()` mengembalikan sebuah janji yang resolusinya adalah nilai boolean yang menunjukkan apakah perangkat dinonaktifkan suara atau tidak. Jika janji ditolak, pesan kesalahan akan ditampilkan.

## Contoh

Berikut adalah contoh cara Anda dapat menggunakan paket `@capgo/capacitor-mute` untuk memeriksa status bisu perangkat dan menampilkan pesan berdasarkan hasilnya.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  if (result) {
    console.log('The device is currently muted');
    // Display a message or perform some actions for muted device
  } else {
    console.log('The device is not muted');
    // Display a message or perform some actions for non-muted device
  }
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

Dalam contoh ini, jika perangkat dinonaktifkan suara, pesan "Perangkat saat ini dinonaktifkan suara" akan ditampilkan. Jika perangkat tidak dinonaktifkan suara, pesan "Perangkat tidak dinonaktifkan suara" akan ditampilkan.

## Masalah yang Mungkinkan

Harap diperhatikan bahwa pada perangkat iOS dengan Xcode 14, pustaka `@capgo/capacitor-mute` mungkin tidak dikonfigurasi sesuai harapan oleh Apple. Masalah ini sedang ditangani oleh pengembang pustaka. Untuk mengatasi masalah ini, Anda dapat mengikuti petunjuk yang diberikan dalam bagian [masalah yang diketahui](https://githubcom/CocoaPods/CocoaPods/issues/8891/) dari dokumentasi paket.

## Kesimpulan

Paket `@capgo/capacitor-mute` adalah plugin Capacitor yang berguna yang memungkinkan Anda untuk mendeteksi status bisu perangkat. Dengan mengikuti langkah-langkah instalasi dan penggunaan yang dijelaskan dalam tutorial ini, Anda dapat dengan mudah mengintegrasikan paket ini ke dalam proyek Capacitor Anda dan memanfaatkan API-nya untuk memeriksa status bisu.