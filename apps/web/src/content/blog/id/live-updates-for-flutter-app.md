---
slug: live-updates-for-flutter-app
title: Update Flutter Secara Live
description: >-
  Apakah mungkin mengirim pembaruan langsung ke aplikasi Flutter tanpa melalui
  peninjauan App Store?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2025-12-31T01:19:38.000Z
head_image: /bypass_illustration.webp
head_image_alt: Ilustrasi pembatasan Capacitor
keywords: >-
  Flutter, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Capgo Live Update adalah layanan yang memungkinkan pengembang untuk menerapkan pembaruan ke aplikasi seluler mereka tanpa melalui proses pengajuan App Store tradisional. Ini bisa menjadi cara yang praktis untuk memperbaiki bug dengan cepat atau membuat pembaruan kecil pada aplikasi tanpa menunggu proses peninjauan App Store. Namun, Capgo Live Update tidak mendukung pembaruan aplikasi Flutter karena aplikasi Flutter dikompilasi menjadi kode native.

Flutter adalah framework pengembangan aplikasi seluler yang menggunakan bahasa pemrograman Dart. Salah satu fitur utama Flutter adalah memungkinkan pengembang untuk membuat aplikasi yang dapat berjalan di iOS dan Android menggunakan satu basis kode. Untuk mencapai ini, Flutter mengompilasi kode aplikasi menjadi kode native untuk setiap platform. Ini berarti aplikasi tersebut pada dasarnya adalah aplikasi native, bukan aplikasi berbasis web atau aplikasi hybrid.

Karena aplikasi Flutter dikompilasi menjadi kode native, tidak mungkin menggunakan Capgo Live Update untuk menerapkan pembaruan ke aplikasi Flutter. Sebaliknya, pengembang harus mengirimkan pembaruan ke app store seperti yang mereka lakukan dengan aplikasi native lainnya.

Selain itu, membuat pembaruan pada kode native umumnya bertentangan dengan aturan app store. Baik Apple App Store dan Google Play Store memiliki kebijakan yang melarang pengembang memperkenalkan perubahan pada kode native aplikasi setelah diajukan untuk ditinjau. Ini karena memperkenalkan perubahan pada kode native berpotensi memunculkan kerentanan keamanan atau masalah lain yang dapat membahayakan kinerja aplikasi.

Singkatnya, meskipun Capgo Live Update adalah alat yang berguna untuk menerapkan pembaruan dengan cepat ke beberapa jenis aplikasi seluler, namun tidak dapat digunakan untuk memperbarui aplikasi Flutter.

Hal ini disebabkan oleh sifat proses kompilasi Flutter dan aturan dari app store.
