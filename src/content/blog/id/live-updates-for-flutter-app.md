---
slug: id__live-updates-for-flutter-app
title: Pembaruan langsung Flutter
description: >-
  Apakah mungkin untuk mengirimkan pembaruan langsung ke aplikasi Flutter tanpa
  melalui proses peninjauan App Store?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Ilustrasi bypass untuk kapasitor
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live Update adalah layanan yang memungkinkan pengembang untuk menerapkan pembaruan pada aplikasi mobile mereka tanpa melalui proses pengajuan App Store tradisional. Ini bisa menjadi cara yang nyaman untuk memperbaiki bug dengan cepat atau membuat pembaruan kecil pada aplikasi tanpa menunggu proses peninjauan App Store. Namun, Capgo Live Update tidak mendukung pembaruan aplikasi Flutter karena aplikasi Flutter dikompilasi menjadi kode native.

Flutter adalah kerangka kerja pengembangan aplikasi mobile yang menggunakan bahasa pemrograman Dart. Salah satu fitur utama Flutter adalah memungkinkan pengembang untuk membuat aplikasi yang dapat berjalan di iOS dan Android menggunakan satu basis kode. Untuk mencapai hal ini, Flutter mengompilasi kode aplikasi menjadi kode native untuk setiap platform. Ini berarti bahwa aplikasi tersebut pada dasarnya adalah aplikasi native, bukan aplikasi berbasis web atau aplikasi hybrid.

Karena aplikasi Flutter dikompilasi menjadi kode native, tidak mungkin menggunakan Capgo Live Update untuk menerapkan pembaruan pada aplikasi Flutter. Sebaliknya, pengembang harus mengirimkan pembaruan ke app store seperti halnya dengan aplikasi native lainnya.

Selain itu, membuat pembaruan pada kode native umumnya bertentangan dengan aturan app store. Baik Apple App Store maupun Google Play Store memiliki kebijakan yang melarang pengembang untuk memperkenalkan perubahan pada kode native aplikasi setelah diajukan untuk ditinjau. Ini karena memperkenalkan perubahan pada kode native berpotensi menimbulkan kerentanan keamanan atau masalah lain yang dapat membahayakan kinerja aplikasi.

Singkatnya, meskipun Capgo Live Update adalah alat yang berguna untuk dengan cepat menerapkan pembaruan pada jenis aplikasi mobile tertentu, itu tidak dapat digunakan untuk memperbarui aplikasi Flutter.

Ini disebabkan oleh sifat proses kompilasi Flutter dan aturan dari app store.