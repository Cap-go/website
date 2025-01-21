---
locale: id
---

tutorial paket @capgo/capacitor-purchases

Tutorial ini akan membimbing Anda melalui proses penggunaan paket @capgo/capacitor-purchases untuk pembelian dalam aplikasi di Capacitor.

## Langkah 1: Instal paket

Untuk menginstal paket @capgo/capacitor-purchases, buka terminal Anda dan jalankan perintah berikut:

[[BLOK_KODE]]

## Langkah 2: Konfigurasi platform Android

Jika Anda menargetkan platform Android, Anda perlu menambahkan beberapa konfigurasi ke file android/app/src/main/AndroidManifest.xml. Buka file tersebut dan tambahkan cuplikan kode berikut:

[[BLOK_KODE]]

## Langkah 3: Siapkan paket

Untuk menyiapkan paket @capgo/capacitor-purchases, gunakan metode `setup` dengan kunci API Anda dan ID pengguna aplikasi yang opsional. Berikut ini contohnya:

[[BLOK_KODE]]

## Langkah 4: Tangani acara pembaruan pembelian

Anda dapat mendengarkan acara "purchasesUpdate" untuk diberi tahu ketika ada perubahan pada pembelian pengguna. Berikut ini contoh cara menambahkan pendengar untuk acara tersebut:

[[BLOK_KODE]]

## Langkah 5: Ambil penawaran yang tersedia

Anda dapat menggunakan metode `getOfferings` untuk mengambil penawaran yang tersedia untuk pengguna. Berikut ini contohnya:

[[BLOK_KODE]]

## Langkah 6: Beli paket

Untuk melakukan pembelian, gunakan metode `purchasePackage` dengan ID paket. Berikut ini contohnya:

[[BLOK_KODE]]

## Langkah 7: Pulihkan pembelian

Jika Anda ingin memulihkan pembelian pengguna, gunakan metode `restorePurchases`. Berikut ini contohnya:

[[BLOK_KODE]]

## Itu saja!

Anda telah berhasil mempelajari cara menggunakan paket @capgo/capacitor-purchases untuk pembelian dalam aplikasi di Capacitor. Selamat coding!