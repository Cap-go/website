---
locale: id
---

sing @capgo/find-package-manager

Paket `@capgo/find-package-manager` adalah alat yang berguna untuk menentukan manajer paket mana yang digunakan di jalur tertentu. Ini bisa menjadi berguna saat bekerja dengan proyek yang menggunakan manajer paket yang berbeda.

Berikut adalah tutorial langkah-demi-langkah tentang cara menggunakan paket ini:

## Instalasi

Pertama, pastikan Anda telah menginstal Nodejs dan npm di mesin Anda. Kemudian, buka terminal Anda dan jalankan perintah berikut untuk menginstal paket `@capgo/find-package-manager`:

[[BLOK_KODE]]

## Impor paket

Setelah paket diinstal, Anda dapat mengimpornya ke dalam kode Anda menggunakan baris berikut:

[[BLOK_KODE]]

## Temukan jenis manajer paket

Untuk menemukan jenis manajer paket di jalur tertentu, Anda dapat menggunakan fungsi `findPackageManagerType`. Berikut adalah contohnya:

[[BLOK_KODE]]

Fungsi `findPackageManagerType` mengembalikan nilai string yang menunjukkan jenis manajer paket yang digunakan. Ini dapat mengembalikan salah satu dari nilai berikut:

- `npm`: jika npm digunakan
- `yarn`: jika yarn digunakan
- `pnpm`: jika pnpm digunakan
- `unknown`: jika jenis manajer paket tidak dapat ditentukan

## Menggabungkan semuanya

Berikut adalah contoh lengkap tentang cara menggunakan paket `@capgo/find-package-manager`:

[[BLOK_KODE]]

Itu saja! Sekarang Anda dapat menggunakan paket `@capgo/find-package-manager` untuk menentukan jenis manajer paket di jalur tertentu.