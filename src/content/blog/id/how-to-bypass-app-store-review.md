---
slug: comment-eviter-la-verification-de-l-app-store
title: Cara Memperbarui Aplikasi Capacitor JS Tanpa Melewati Proses Review App Store
description: >-
  Bagaimana fungsi Capgo dapat membantu Anda mengirimkan pembaruan kode ke
  aplikasi iOS Ionic dalam produksi sambil tetap sepenuhnya mematuhi pedoman
  Apple?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Ilustrasi bypass Capacitor
keywords: >-
  Apple, App Store, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
_Senang Anda bertanya._

Tim hukum saya meminta saya untuk memberitahu Anda bahwa ini bukan nasihat hukum, tetapi Anda tidak memerlukan gelar hukum untuk memahami kata-kata dalam pedoman resmi Apple. Pedoman Apple secara eksplisit mengizinkan Anda untuk mendorong kode yang dapat dieksekusi langsung ke aplikasi Anda, melewati App Store, dengan tiga kondisi ini:

* Kode dijalankan oleh framework WebKit bawaan Apple
* Kode tidak menyediakan, membuka atau mengaktifkan fitur atau fungsionalitas tambahan
* Pengguna tidak melihat pembaruan sedang berlangsung

Dengan plugin Capgo capacitor, Anda hanya dapat memperbarui dan memodifikasi HTML CSS dan JavaScript Anda, jadi kita aman untuk kondisi pertama.

Sebagai catatan tambahan, kemampuan aplikasi untuk memperbarui diri tanpa App Store sudah ada sejak lama.
Hanya untuk aplikasi yang dibuat menggunakan framework JavaScript seperti React Native dari Facebook dan layanan seperti Expo.

Bukti bahwa React Native tidak lebih Native dari Capacitor 😆

Capgo adalah solusi terjangkau pertama yang menyediakan kemampuan untuk mendorong pembaruan tingkat kode ke aplikasi Capacitor native.
Kondisi kedua, tidak ada fitur atau fungsionalitas baru, benar-benar terserah Anda.

Capgo tidak dimaksudkan untuk mendorong fitur atau fungsionalitas baru. Ini dimaksudkan untuk menyesuaikan atau memperbaikinya, menghindari rilis minor yang diperlukan untuk memperbaiki bug, menambahkan logging atau pelacakan, memperbarui pesan, memaksa pengguna untuk upgrade, dll.

Untuk fitur atau fungsionalitas baru, Anda perlu merilis melalui app store. Untuk informasi Anda, Ionic AppFlow (alternatif untuk perusahaan besar) terpasang di lebih dari 50 juta perangkat iOS dan tidak pernah ada aplikasi yang ditolak karena menggunakannya.

Saya mengatakan ini karena penting untuk diketahui bahwa ribuan pengembang lain menggunakan pembaruan langsung, jadi Anda tidak sendirian.

Apple dan Google memiliki seperangkat aturan sendiri tentang cara memperbarui aplikasi.

Untuk Apple, [lihat paragraf 3.3.2](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf/).
\[…\] Satu-satunya pengecualian untuk hal tersebut di atas adalah skrip dan kode yang diunduh dan dijalankan oleh framework WebKit bawaan Apple atau JavascriptCore \[…\] __TLDR__: kita harus menggunakan pembaruan OTA hanya untuk memperbaiki bug atau membuat perbaikan, tanpa membuat perubahan signifikan.

__Google__ Play kurang ketat – mereka mengatakan bahwa aplikasi yang diinstal dari Google Play dengan bundle JavaScript [tidak dibatasi](https://support.google.com/googleplay/android-developer/answer/9888379/?hl=en) untuk diperbarui hanya oleh layanan Google.

Periksa artikel saya selanjutnya untuk informasi lebih lanjut tentang cara menginstal Capgo untuk melewati peninjauan.
