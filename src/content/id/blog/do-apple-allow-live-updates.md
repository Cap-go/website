---
slug: do-apple-allow-live-updates
title: >-
  Apakah Apple mengizinkan pengiriman pembaruan langsung ke aplikasi tanpa
  peninjauan App Store?
description: >-
  Bagaimana Anda dapat menerapkan pembaruan kode untuk aplikasi iOS yang sudah
  dirilis sambil tetap mematuhi pedoman Apple sepenuhnya?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Ilustrasi decoupling kapasitor
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Pembaruan aplikasi Capacitor JS tanpa melalui proses peninjauan App Store dimungkinkan dalam kondisi tertentu yang diuraikan dalam pedoman resmi Apple. Namun, perlu diingat bahwa ini bukan nasihat hukum. Agar pembaruan kode dapat langsung dikirim ke aplikasi dan tetap mematuhi pedoman Apple, kondisi berikut harus dipenuhi:

- Kode harus dijalankan oleh kerangka kerja WebKit bawaan Apple
- Kode tidak boleh menyediakan, membuka, atau mengaktifkan fitur atau fungsionalitas tambahan
- Pengguna tidak boleh menyadari bahwa pembaruan sedang terjadi

Plugin Capgo Capacitor memungkinkan pembaruan dan modifikasi dilakukan pada HTML, CSS, dan JavaScript, memenuhi kondisi pertama.
Kemampuan aplikasi untuk memperbarui diri tanpa melalui proses peninjauan App Store telah tersedia untuk beberapa waktu bagi aplikasi yang dibuat menggunakan kerangka kerja JavaScript seperti React Native dari Facebook dan layanan seperti Expo.

Kondisi kedua, tidak menyediakan fitur atau fungsionalitas tambahan, ditentukan oleh pengembang. Capgo ditujukan untuk melakukan penyesuaian atau perbaikan kecil, bukan memperkenalkan fitur atau fungsionalitas baru. Untuk perubahan signifikan, perlu merilis pembaruan melalui App Store. Perlu dicatat bahwa banyak pengembang lain menggunakan pembaruan langsung tanpa masalah atau penolakan dari Apple.

Google Play kurang ketat dibandingkan Apple dalam hal memperbarui aplikasi. Google Play memungkinkan aplikasi yang diinstal dari toko mereka dengan bundel JavaScript diperbarui oleh layanan non-Google.

Untuk informasi lebih lanjut tentang cara menginstal Capgo untuk melewati peninjauan, silakan merujuk ke artikel saya berikutnya.