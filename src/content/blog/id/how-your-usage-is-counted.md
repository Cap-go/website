---
slug: cómo-se-cuenta-tu-uso
title: Bagaimana Penggunaan Anda Dihitung di Capgo
description: >-
  Pahami cara Capgo menghitung penggunaan Anda dan gunakan dengan cara terbaik.
  Pelajari cara mengelola paket Anda dengan lebih baik
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2025-11-03T11:43:59.000Z
head_image: /usage_explained.webp
head_image_alt: Sistem penggunaan Capgo dijelaskan
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: id
next_blog: ''
---
Di Capgo, ada 3 nilai yang dihitung dan penting untuk dipahami
- Pengguna
- Penyimpanan
- Bandwidth

Masing-masing memiliki cara perhitungan yang sedikit berbeda


## Pengguna

Setiap kali pengguna mengunduh aplikasi Capacitor JS Anda dan membukanya, aplikasi akan mengirim permintaan ke backend Capgo untuk mengetahui apakah ada pembaruan yang tersedia.
Ketika aplikasi melakukan itu, aplikasi mengirimkan sedikit informasi, termasuk yang paling penting yaitu `DeviceID`

`DeviceID`: adalah ID unik (UUID) yang dihasilkan pada perangkat. **Mulai dari versi plugin v6.25.0 dan v7.25.0**, ID ini sekarang bertahan di seluruh instalasi ulang aplikasi (disimpan dengan aman dalam penyimpanan perangkat). Sebelum versi ini, ID direset pada setiap instalasi aplikasi.

Setiap kali akun Anda menerima Device ID baru, data tersebut disimpan dalam database.
Setiap kali `DeviceID` lama meminta pembaruan (aplikasi dibuka), recordnya diperbarui (updated_at dalam database).

Data ini disimpan di 2 tempat:
- tabel device dengan nilai `update_at`
- app_stats dengan penghitung harian yang menunjukkan jumlah perangkat yang menjadi aktif hari ini dan belum aktif bulan ini.

Untuk batas paket, metode pertama digunakan karena 100% dapat diandalkan, untuk menampilkan grafik digunakan metode kedua.
Anda dapat melihat keduanya di akun Anda pada halaman beranda:
- dalam grafik adalah metode kedua
- dalam tabel aplikasi adalah metode pertama.

> Capgo tidak menghitung emulator dan build dev dalam penggunaan Anda. Perlu diingat setelah masa percobaan Anda tidak bisa memiliki lebih dari 3% dari keduanya, atau akun Anda akan terkunci sampai Anda memperbaikinya.

> Capgo juga melakukan beberapa penyaringan untuk Anda. Jika Anda memiliki CI/CD yang dikonfigurasi untuk mengirim versi Anda ke Google PLAY, Google menjalankan aplikasi Capacitor Anda setiap kali ke 20+ perangkat nyata. Selama 4 jam pertama bundle baru, kami memblokir IP data center Google untuk mencegah mereka dihitung.

Setiap bulan, data ini dimulai dari nol.


- Membuat atau memperbarui perangkat di database saya pada setiap permintaan perangkat
- Menambahkan ke penghitung harian jumlah perangkat aktif yang belum aktif bulan ini.

Metode pertama mengembalikan: 900+ pengguna
sementara yang kedua berada di 200+ pengguna pada akun Anda
Untuk batas paket saya menggunakan metode pertama, yang 100% dapat diandalkan, dan untuk menampilkan grafik saya menggunakan yang kedua.
Anda dapat melihat keduanya di halaman beranda akun Anda.

## Penyimpanan

Setiap kali Anda mengunggah bundle, angka ini bertambah sesuai ukuran unggahan.

Data ini hanya terkait dengan ukuran unggahan Anda, semakin baik ukuran aplikasi Anda, semakin baik Anda tetap dalam paket Anda.

Jika Anda mencapai batas atau mendekati, Anda dapat melihat daftar bundle Anda dengan CLI:
`npx @capgo/cli@latest bundle list`
Untuk melihat apa yang bisa Anda bersihkan, menghapus bundle akan membebaskan penyimpanan tetapi tidak menghapus statistik.

Ketika Anda siap untuk membersihkan, gunakan perintah ini untuk menghapus banyak bundle:
`npx @capgo/cli@latest bundle cleanup`

NB: ini baik untuk planet ini, tapi juga untuk dompet Anda 💪.

> Anda juga dapat menggunakan `--external` saat mengunggah untuk menggunakan penyimpanan Anda sendiri, dan tidak dihitung dalam paket Anda.

## Bandwidth

Perhitungan nilai ini sedikit lebih kompleks, tapi idenya sama dengan penyimpanan.

Setiap kali pengguna mengunduh bundle, angka ini bertambah sesuai ukuran unduhan.

Data ini hanya terkait dengan ukuran unduhan Anda, semakin baik ukuran aplikasi Capacitor JS Anda, semakin baik Anda tetap dalam paket Anda.

> Satu hal penting yang perlu dicatat, Capgo tidak dapat melihat berapa ukuran yang diunduh, hanya melihat ukuran bundle. Jadi jika Anda memiliki bundle besar, dan Anda memiliki banyak pengguna yang gagal mengunduhnya, Anda akan cepat mencapai batas.

Cara terbaik untuk tetap dalam paket Anda adalah memiliki bundle kecil, dan jika Anda tidak bisa, tunjukkan bar unduhan kepada pengguna Anda, dan beri tahu mereka berapa banyak yang tersisa untuk diunduh.

Di masa depan, Capgo akan meningkatkan sistem unduhan untuk memiliki lebih banyak kesempatan mengunduh bundle dalam satu kali.
