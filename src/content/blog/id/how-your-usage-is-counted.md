---
slug: id__how-your-usage-is-counted
title: Bagaimana penggunaan Anda dihitung di Capgo
description: >-
  Pahami bagaimana Capgo menghitung penggunaan Anda dan manfaatkan
  sebaik-baiknya. Pelajari cara mengelola paket Anda dengan lebih baik
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Sistem penggunaan Capgo dijelaskan
tag: Solution
published: true
locale: id
next_blog: ''
---

Dalam Capgo, 3 nilai dihitung dan penting untuk dipahami
- Pengguna
- Penyimpanan
- Bandwidth

Masing-masing memiliki cara perhitungan yang sedikit berbeda

## Pengguna

Setiap kali pengguna mengunduh aplikasi Capacitor JS Anda dan membukanya, aplikasi akan mengirim permintaan ke backend Capgo untuk mengetahui apakah pembaruan tersedia
Saat aplikasi melakukan itu, aplikasi mengirimkan sedikit informasi, termasuk yang paling penting yaitu `DeviceID`

`DeviceID`: adalah ID unik (UUID) yang ditentukan oleh OS perangkat, ID ini unik untuk setiap instalasi aplikasi

Setiap kali akun Anda menerima Device ID baru, ID tersebut disimpan dalam database
Setiap kali `DeviceID` lama meminta pembaruan (aplikasi dibuka), catatan tersebut diperbarui (updated_at dalam database)

Data ini disimpan di 2 tempat:
- tabel perangkat dengan nilai `update_at`
- app_stats dengan penghitung harian yang mewakili jumlah perangkat yang menjadi aktif hari ini dan belum aktif bulan ini

Untuk batas paket, metode pertama digunakan karena 100% dapat diandalkan, untuk menampilkan grafik digunakan metode kedua
Anda dapat melihat keduanya di akun Anda pada halaman beranda:
- dalam grafik adalah metode kedua
- dalam tabel aplikasi adalah metode pertama

> Capgo tidak menghitung emulator dan build pengembangan dalam penggunaan Anda. Perlu diingat setelah masa uji coba Anda tidak boleh memiliki lebih dari 3% dari keduanya, atau itu akan mengunci akun Anda, sampai Anda memperbaikinya

> Capgo juga melakukan beberapa penyaringan untuk Anda. Jika Anda memiliki CI/CD yang dikonfigurasi untuk mengirimkan versi Anda ke Google PLAY, Google menjalankan aplikasi Capacitor Anda setiap kali ke 20+ perangkat nyata. Selama 4 jam pertama bundle baru, kami memblokir IP pusat data Google untuk mencegah mereka dihitung

Setiap bulan, data ini dimulai dari nol

- Membuat atau memperbarui perangkat di database saya pada setiap permintaan perangkat
- Menambahkan ke penghitung harian jumlah perangkat aktif yang belum aktif bulan ini

Metode pertama mengembalikan: 900+ pengguna
sedangkan yang kedua berada pada 200+ pengguna di akun Anda
Untuk batas paket saya menggunakan metode pertama, yang 100% dapat diandalkan, dan untuk menampilkan grafik saya menggunakan yang kedua
Anda dapat melihat keduanya di halaman beranda akun Anda

## Penyimpanan

Setiap kali Anda mengunggah bundle, angka ini meningkat sesuai ukuran unggahan

Data ini hanya terkait dengan ukuran unggahan Anda, semakin baik ukuran aplikasi Anda, semakin baik Anda tetap dalam paket Anda

Jika Anda mencapai batas atau mendekati, Anda dapat mencantumkan bundle Anda dengan CLI:
`npx @capgo/cli@latest bundle list`
Untuk melihat apa yang bisa Anda bersihkan, menghapus bundle, membebaskan penyimpanan tetapi tidak menghapus statistik

Ketika Anda siap untuk membersihkan, gunakan perintah ini untuk menghapus banyak bundle:
`npx @capgo/cli@latest bundle cleanup`

PS: ini baik untuk planet, tetapi juga untuk dompet Anda 💪

> Anda juga dapat menggunakan `--external` saat mengunggah untuk menggunakan penyimpanan Anda sendiri, dan tidak dihitung dalam paket Anda

## Bandwidth

Perhitungan nilai ini sedikit lebih kompleks, tetapi idenya sama dengan penyimpanan

Setiap kali pengguna mengunduh bundle, angka ini meningkat sesuai ukuran unduhan

Data ini hanya terkait dengan ukuran unduhan Anda, semakin baik ukuran aplikasi Capacitor JS Anda, semakin baik Anda tetap dalam paket Anda

> Satu hal penting yang perlu diperhatikan, Capgo tidak dapat melihat ukuran yang diunduh, Capgo hanya melihat ukuran bundle. Jadi jika Anda memiliki bundle besar, dan Anda memiliki banyak pengguna yang gagal mengunduhnya, Anda akan mencapai batas dengan cepat

Cara terbaik untuk tetap dalam paket Anda adalah memiliki bundle kecil, dan jika Anda tidak bisa, tunjukkan bilah unduhan kepada pengguna Anda, dan beri tahu mereka berapa banyak yang tersisa untuk diunduh

Di masa depan, Capgo akan meningkatkan sistem unduhan untuk memiliki lebih banyak kesempatan mengunduh bundle dalam satu kali