---
locale: id
---

**menggunakan Paket @capgo/native-audio**

Tutorial ini akan memandu Anda tentang cara menggunakan paket `@capgo/native-audio` untuk memutar suara di aplikasi Capacitor Anda.

## Langkah 1: Instalasi

Untuk menginstal paket, buka terminal Anda dan jalankan perintah berikut:

[[BLOK_KODE]]

atau jika Anda lebih suka menggunakan yarn:

[[BLOK_KODE]]

## Langkah 2: Sinkronisasi Berkas Native

Setelah menginstal paket, sinkronkan berkas native dengan perintah berikut:

[[BLOK_KODE]]

## Langkah 3: Konfigurasi

Tidak ada konfigurasi tambahan yang diperlukan untuk plugin ini.

## Langkah 4: Penggunaan

Untuk menggunakan paket `@capgo/native-audio`, Anda perlu mengimpor objek `NativeAudio` dari paket dan menggunakan metodenya.

Berikut adalah contoh cara memuat sebelumnya sebuah berkas audio dan memutarnya:

[[BLOK_KODE]]

Metode `preload` digunakan untuk memuat berkas audio ke dalam memori, dan metode `play` digunakan untuk memutar berkas audio yang telah dimuat.

Metode lain yang didukung termasuk `pause`, `resume`, `loop`, `stop`, `unload`, `setVolume`, `getDuration`, dan `getCurrentTime`. Anda dapat merujuk ke [dokumentasi resmi](https://githubcom/Cap-go/native-audio/blob/main/READMEmd/) untuk detail lebih lanjut tentang metode ini.

Itu saja! Anda sekarang telah belajar bagaimana menggunakan paket `@capgo/native-audio` untuk memutar suara di aplikasi Capacitor Anda.