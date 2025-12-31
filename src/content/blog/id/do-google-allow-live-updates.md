---
slug: do-google-allow-live-updates
title: >-
  Apakah Google mengizinkan pengiriman pembaruan langsung ke aplikasi tanpa
  peninjauan Play Store?
description: >-
  Bagaimana Anda dapat mengirimkan pembaruan kode ke aplikasi Android dalam
  produksi sambil sepenuhnya mematuhi pedoman Google?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Ilustrasi bypass Capacitor
keywords: 'Google, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Google Play lebih tidak ketat dibandingkan Apple dalam hal memperbarui aplikasi.

Memperbarui aplikasi yang didistribusikan melalui Google Play bisa menjadi tugas yang rumit, tetapi penting untuk mengikuti pedoman Google agar tetap patuh. Menurut pedoman Google Play, aplikasi tidak boleh memodifikasi, mengganti, atau memperbarui dirinya sendiri menggunakan metode apa pun selain mekanisme pembaruan Google Play sendiri. Ini berarti mengunduh kode yang dapat dieksekusi, seperti file dex, JAR, atau .so, dari sumber selain Google Play tidak diizinkan.

Namun, pembatasan ini tidak berlaku untuk kode yang berjalan di mesin virtual atau interpreter yang menyediakan akses tidak langsung ke API Android, seperti JavaScript di webview atau browser. Ini berarti Anda dapat menggunakan bahasa yang diinterpretasi, seperti JavaScript, Python, Lua, dll., untuk memperbarui aplikasi Anda tanpa melalui proses peninjauan Google Play. Salah satu alat yang dapat membantu proses ini adalah plugin Capgo Capacitor. Plugin ini memungkinkan pengembang untuk memperbarui kode HTML, CSS, dan JavaScript mereka dan mengirim pembaruan ke aplikasi mereka tanpa perlu peninjauan.

Selain itu, aplikasi atau kode pihak ketiga yang menggunakan bahasa yang diinterpretasi, seperti JavaScript, Python, Lua, dll., yang dimuat saat runtime, tidak boleh memungkinkan potensi pelanggaran kebijakan Google Play. Penting untuk dicatat bahwa kode yang diinterpretasi ini tidak boleh dikemas bersama aplikasi.

Dengan mengikuti pedoman ini dan menggunakan alat seperti plugin Capgo Capacitor, Anda dapat memastikan bahwa pembaruan aplikasi Anda mematuhi kebijakan Google Play, dan aplikasi Anda tetap tersedia bagi pengguna di platform tersebut. Perlu diingat bahwa selalu bijaksana untuk memeriksa ulang versi terbaru dari kebijakan Google untuk memastikan Anda mengikutinya dengan benar.

Untuk informasi lebih lanjut tentang cara menginstal Capgo untuk melewati peninjauan, silakan lihat artikel saya berikutnya.
