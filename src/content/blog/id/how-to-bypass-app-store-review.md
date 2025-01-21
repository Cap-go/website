---
slug: id__how-to-bypass-app-store-review
title: Berikut cara memperbarui aplikasi Capacitor tanpa peninjauan App Store.
description: >-
  Bagaimana fitur Capgo dapat memungkinkan Anda mengirim pembaruan kode langsung
  untuk aplikasi Ionic iOS sambil sepenuhnya mematuhi pedoman Apple?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Ilustrasi untuk menghindari kapasitor
tag: Tutorial
published: true
locale: id
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

_Syukurlah Anda bertanya_

Pengacara saya meminta saya untuk memberitahu Anda bahwa ini bukan nasihat hukum, tetapi Anda tidak memerlukan gelar hukum untuk memahami kata-kata dalam pedoman resmi Apple. Pedoman Apple secara eksplisit mengizinkan Anda untuk mendorong kode yang dapat dieksekusi langsung ke aplikasi Anda, melewati App Store, dengan tiga kondisi berikut:

* Kode dijalankan oleh kerangka kerja WebKit bawaan Apple
* Kode tidak menyediakan, membuka, atau mengaktifkan fitur atau fungsionalitas tambahan
* Pengguna tidak melihat pembaruan sedang terjadi

Dengan plugin Capgo capacitor, Anda hanya dapat memperbarui dan memodifikasi HTML, CSS, dan JavaScript Anda, jadi kita aman untuk kondisi pertama

Sebagai catatan tambahan, kemampuan aplikasi untuk memperbarui diri tanpa App Store sudah ada cukup lama
Hanya untuk aplikasi yang dibuat menggunakan kerangka kerja JavaScript seperti React Native dari Facebook dan layanan seperti Expo

Bukti bahwa React Native tidak lebih Native daripada Capacitor 😆

Capgo adalah solusi terjangkau pertama yang menyediakan kemampuan untuk mendorong pembaruan tingkat kode ke aplikasi Capacitor asli
Kondisi kedua, tidak ada fitur atau fungsionalitas baru, sebenarnya tergantung pada Anda

Capgo tidak dimaksudkan untuk mendorong fitur atau fungsionalitas baru. Ini dimaksudkan untuk menyesuaikan atau memperbaikinya, menghindari rilis minor yang diperlukan untuk memperbaiki bug, menambahkan logging atau pelacakan, memperbarui pesan, memaksa pengguna untuk meningkatkan, dll

Untuk fitur atau fungsionalitas baru, Anda perlu merilis melalui app store. Untuk informasi Anda, Ionic AppFlow (alternatif untuk perusahaan besar) dipasang di lebih dari 50 juta perangkat iOS dan tidak pernah ada aplikasi yang ditolak karena menggunakannya

Saya hanya mengatakan itu karena penting untuk diketahui bahwa ribuan pengembang lain menggunakan pembaruan langsung, jadi Anda tidak sendirian

Apple dan Google memiliki seperangkat aturan sendiri tentang cara memperbarui aplikasi

Untuk Apple, [lihat paragraf 332](https://developerapplecom/programs/information/Apple_Developer_Program_Information_8_12_15pdf/)
\[…\] Satu-satunya pengecualian untuk hal tersebut di atas adalah skrip dan kode yang diunduh dan dijalankan oleh kerangka kerja WebKit bawaan Apple atau JavascriptCore \[…\] __TLDR__: kita harus menggunakan pembaruan OTA hanya untuk memperbaiki bug atau membuat perbaikan, tanpa membuat perubahan signifikan

__Google__ Play kurang ketat – mereka mengatakan bahwa aplikasi yang diinstal dari Google Play dengan bundel JavaScript [tidak dibatasi](https://supportgooglecom/googleplay/android-developer/answer/9888379/?hl=en) untuk diperbarui hanya oleh layanan Google


Periksa artikel saya berikutnya untuk informasi lebih lanjut tentang cara menginstal Capgo untuk melewati peninjauan