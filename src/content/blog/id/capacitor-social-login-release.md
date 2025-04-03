---
slug: id__Release-of-a-brand-new-capacitor-social-login
title: Peluncuran plugin koneksi sosial baru untuk Capacitor
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Ilustrasi sistem organisasi Capgo
tag: Capacitor
published: true
next_blog: ''
locale: id
---

# Penganalan

Hai, saya Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny)) 👋,

Setelah sebulan kerja keras (dan sedikit menyakitkan 🙃), saya dengan senang hati mengumumkan rilis pertama dari Capacitor Social Login. Plugin ini dirancang untuk membantu menangani Login Google dan Apple di iOS dan Android. Selain itu, bersama dengan Martin, kami telah mengerjakan beberapa fitur unik yang meliputi:

 - Pengenalan Login dengan Apple di Android
 - Pengadopsian API Google Credentials yang baru
 - Penambahan dokumentasi yang detail

# Login dengan Apple di Android

Pertama, mari kita bahas inovasi utama 'Login dengan Apple' di Android. Ini tidak mudah, karena SDK Apple tidak menyediakan fungsionalitas ini. Saya menggunakan [artikel ini](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) sebagai titik referensi, tetapi saya mengubahnya sedikit untuk membuatnya lebih aman. Alur yang akhirnya saya gunakan terlihat seperti ini:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure> 

Sayangnya, ini memerlukan backend dan beberapa modifikasi pada kode aplikasi Anda, tetapi ini yang terbaik yang bisa saya lakukan.

# Google Login yang Diperbarui di Android

Selanjutnya, saya mencoba mengimplementasikan Google Login di Android. Ternyata, [CodetrixStudio's CapacitorGoogleAuth](https://githubcom/CodetrixStudio/CapacitorGoogleAuth) menggunakan [perpustakaan GMS yang akan segera usang](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization). Sebagai akibat dari perpustakaan GMS ini dianggap usang, saya memutuskan untuk menggunakan [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg). Ini membantu menyederhanakan alur login dan menghilangkan [error 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332) yang mengganggu 🎉

# Dokumentasi

Terakhir, saya menulis dokumentasi yang luar biasa ✨. Saya menghabiskan banyak waktu untuk memastikan bahwa dokumen tersebut akurat dan ekstensif.
Dokumentasi ini mencakup panduan rinci tentang pengaturan Apple dan Google. Saya juga menyediakan [contoh backend](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo) untuk Login dengan Apple 🍎

Silakan periksa panduan [Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd) dan [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd)!

# Kesimpulan

Sebagai kesimpulan, plugin Capacitor Social Login memperkenalkan banyak fitur baru dan menarik dengan lebih banyak lagi yang akan datang di masa depan 🚀