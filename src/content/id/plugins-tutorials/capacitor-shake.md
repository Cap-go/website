---
locale: id
---

sing @capgo/capacitor-shake

Paket `@capgo/capacitor-shake` memungkinkan Anda untuk mendeteksi gerakan menggoyang pada perangkat. Berikut adalah tutorial tentang cara menggunakan paket ini dalam aplikasi Capacitor Anda.

## Instalasi

Untuk menginstal paket, jalankan perintah berikut:

[[BLOCK_KODE]]

## Tambahkan Pendengar

Untuk mendeteksi gerakan menggoyang, Anda perlu menambahkan pendengar untuk kejadian `shake`. Berikut adalah contoh cara melakukannya:

[[BLOCK_KODE]]

Dalam contoh ini, kita mengimpor plugin `CapacitorShake` dari `@capacitor/core` dan menggunakan metode `addListener` untuk menambahkan pendengar untuk kejadian `shake`. Ketika gerakan menggoyang terdeteksi, fungsi callback akan dijalankan.

## Hapus Pendengar

Jika Anda ingin menghapus pendengar kejadian `shake`, Anda dapat menggunakan metode `removeAllListeners`:

[[BLOCK_KODE]]

Dalam contoh ini, kita menggunakan metode `removeAllListeners` untuk menghapus semua pendengar kejadian `shake`.

Itu saja! Anda telah berhasil mengintegrasikan paket `@capgo/capacitor-shake` ke dalam aplikasi Capacitor Anda. Anda sekarang dapat mendeteksi gerakan menggoyang pada perangkat.