---
slug: how-to-send-specific-version-to-users
title: Cara mengirim pembaruan khusus untuk pengguna atau grup tertentu
description: >-
  Izinkan pengguna Anda untuk menguji versi beta tanpa perlu menggunakan
  TestFlight atau proses beta Google. Cukup tambahkan tombol di aplikasi Ionic
  Anda, dan selesai!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: Ilustrasi alternatif untuk TestFlight
tag: alternatives
published: true
locale: id
next_blog: ''
---

## Kata Pengantar

Ketika Anda mulai menikmati sistem pembaruan Capgo, seperti saya untuk aplikasi saya, Anda akan mulai merasa "Bagaimana jika saya ingin lebih?"

Saya juga merasakan hal itu, tapi karena saya adalah pembuat Capgo, saya bisa melihatnya lebih dalam!

> Karena semuanya open-source, Anda juga memiliki kekuatan ini :)

Masalah berikutnya yang saya alami dalam proses distribusi aplikasi Capacitor adalah membuat anggota tim lain menguji pembaruan!

Dengan TestFlight, masalahnya sederhana, membawa orang ke dalam tim Anda dan membuat mereka memahami cara mendapatkannya memakan waktu!

Dan tentu saja, setiap kali Anda mengirim ke Apple, Anda memiliki proses peninjauan acak oleh bot yang bisa memakan waktu 5 menit atau 5 jam, Anda tidak pernah tahu

Saya sering kali presentasi saya tertunda karena hal ini...

Dan untuk Google bahkan lebih buruk, misteri besar dalam hidup saya, merilis versi produksi memakan waktu kurang dari 2 jam, tetapi merilis beta tertutup memakan waktu 1-2 hari

## Solusi

Untuk memperbaiki ini, saya menciptakan sistem Channel di Capgo

`npx @capgo/cli@latest bundle upload -c production` akan memperbarui ke semua pengguna (jika channel production diatur sebagai default)

Jika Anda melakukan `npx @capgo/cli@latest bundle upload -c development` maka versi tersebut akan masuk ke channel yang berbeda, ini dapat diotomatisasi di [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/)

Kemudian Anda memiliki 2 cara untuk membiarkan pengguna mendapatkan pembaruan dari channel

### Cara Super Otomatis

Ini bisa berguna ketika Anda tidak ingin membuat backend sendiri untuk pengaturan channel, ini cepat untuk diimplementasikan

Dengan cara ini, satu-satunya hal yang perlu Anda lakukan adalah mengizinkan salah satu channel Anda untuk diatur sendiri

![Izinkan pengaturan sendiri di Capgo](/self_setwebp)

Dan kemudian tambahkan ini dalam kode aplikasi Ionic Anda, untuk pengalaman terbaik, gunakan ini setelah pengguna mengklik tombol seperti "daftar untuk beta"

### Cara Manual

Ini bisa berguna untuk tim internal Anda, ini cepat untuk diimplementasikan
Izinkan pengguna untuk menyalin deviceID mereka dari aplikasi Anda dan mengirimkannya kepada Anda secara manual, kode ini akan membantu Anda mendapatkannya:

Sembunyikan tombol di suatu tempat di aplikasi Anda, atau tampilkan tombol hanya untuk pengguna yang terhubung dengan peran `admin`, misalnya

Kemudian Buka aplikasi Web atau aplikasi native Capgo, masuk sebagai admin aplikasi, pilih aplikasi Anda, klik pada daftar perangkat

Kemudian masukkan deviceID di bilah pencarian, klik pada yang ditemukan dan kemudian klik pada tautan Channel pilih `development`, minta rekan tim Anda untuk membuka aplikasi lagi, tunggu 30 detik dan buka tutup

Dia seharusnya mendapatkan versi Anda

### Cara Otomatis

Ini bisa berguna untuk penguji beta Anda, ini lebih lama untuk diimplementasikan

Sama seperti cara manual, Anda harus mendapatkan deviceID

Tapi kali ini Anda harus mengirimkannya secara otomatis ke backend Anda, saya biarkan Anda memutuskan bagaimana Anda melakukannya

Saya hanya akan menyarankan Anda untuk menyimpannya dalam database, itu akan memudahkan hidup Anda nanti

Kemudian di backend Anda, Anda harus mengirimkannya ke backend Capgo juga. Berikut dua contoh kode:

Dan cukup kirim device_id Anda di body ke URL yang di-deploy dengan metode POST untuk menambahkan dan metode DELETE untuk menghapus

Setelah ini dikonfigurasi, coba tambahkan tombol di aplikasi Anda untuk memilih channel, dan periksa di aplikasi web apakah itu telah diatur

Anda juga dapat mengirim `null` untuk menghapus override

Jika Anda perlu memeriksa secara programatis override apa yang diatur pada perangkat, Anda dapat mendapatkannya di URL yang sama