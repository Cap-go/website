---
slug: mises-à-jour-en-direct-sur-apple
title: >-
  Apple tidak mengizinkan aplikasi untuk didistribusikan secara live update
  tanpa melalui peninjauan App Store terlebih dahulu.
description: >-
  Bagaimana Anda dapat mengirimkan pembaruan kode ke aplikasi iOS yang sedang
  berjalan di produksi sambil tetap mematuhi pedoman Apple sepenuhnya?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Ilustrasi turunan Capacitor
keywords: 'Apple, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Memperbarui aplikasi Capacitor JS tanpa melalui proses tinjauan App Store dimungkinkan dalam kondisi tertentu yang diuraikan dalam pedoman resmi Apple. Namun, perlu dicatat bahwa ini bukan nasihat hukum. Agar pembaruan kode dapat langsung dikirim ke aplikasi dan tetap mematuhi pedoman Apple, kondisi berikut harus dipenuhi:

- Kode harus dijalankan oleh framework WebKit bawaan Apple
- Kode tidak boleh menyediakan, membuka atau mengaktifkan fitur atau fungsionalitas tambahan
- Pengguna tidak boleh mengetahui bahwa pembaruan sedang berlangsung

Plugin Capgo Capacitor memungkinkan pembaruan dan modifikasi dilakukan pada HTML, CSS, dan JavaScript, memenuhi kondisi pertama.
Kemampuan aplikasi untuk memperbarui dirinya sendiri tanpa melalui proses tinjauan App Store telah tersedia sejak lama untuk aplikasi yang dibuat menggunakan framework JavaScript seperti React Native dari Facebook dan layanan seperti Expo.

Kondisi kedua, tidak menyediakan fitur atau fungsionalitas tambahan, ditentukan oleh pengembang. Capgo ditujukan untuk membuat penyesuaian atau perbaikan kecil, bukan memperkenalkan fitur atau fungsionalitas baru. Untuk perubahan signifikan, perlu merilis pembaruan melalui App Store. Perlu dicatat bahwa banyak pengembang lain menggunakan pembaruan langsung tanpa masalah atau penolakan dari Apple.

Google Play kurang ketat dibandingkan Apple dalam hal memperbarui aplikasi. Google Play memungkinkan aplikasi yang diinstal dari toko mereka dengan bundel JavaScript untuk diperbarui oleh layanan non-Google.

Untuk informasi lebih lanjut tentang cara menginstal Capgo untuk melewati tinjauan, silakan lihat artikel saya berikutnya.
