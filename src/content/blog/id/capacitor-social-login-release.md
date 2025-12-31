---
slug: capacitor-social-login-release
title: Rilis plugin Login Sosial Capacitor yang sepenuhnya baru
description: >-
  Plugin Login Sosial Capacitor adalah plugin yang memungkinkan Anda untuk masuk
  dengan Google, Facebook, dan Apple di iOS, Android, dan Web.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Ilustrasi sistem organisasi Capgo
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: id
---
## Pengantar

Hai, saya Michael ([WcaleNieWolny](https://github.com/WcaleNieWolny)) 👋,

Setelah sebulan bekerja keras (dan sedikit menyakitkan 🙃), saya senang mengumumkan rilis pertama dari Capacitor Social Login. Plugin ini dirancang untuk membantu dalam menangani Login Google dan Apple di iOS dan Android. Selain itu, bersama dengan Martin, kami telah bekerja pada beberapa fitur unik yang meliputi:

 - Pengenalan Login dengan Apple di Android 
 - Adopsi API Kredensial Google yang baru
 - Penambahan dokumentasi yang mendetail

## Login dengan Apple di Android

Pertama, mari kita bahas inovasi utama dari 'Login dengan Apple' di Android. Ini bukan hal yang sepele, karena SDK Apple tidak menyediakan fungsionalitas ini. Saya menggunakan [artikel ini](https://johncodeos.com/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) sebagai titik acuan saya, tetapi saya mengubahnya sedikit untuk membuatnya lebih aman. Alur yang saya dapatkan terlihat seperti ini:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure> 

Sayangnya, ini memerlukan backend dan beberapa modifikasi pada kode aplikasi Anda, tetapi itu yang terbaik yang bisa saya lakukan.

## Google Login yang Diperbarui di Android

Selanjutnya, saya mencoba untuk mengimplementasikan Google Login di Android. Ternyata, [CodetrixStudio’s CapacitorGoogleAuth](https://github.com/CodetrixStudio/CapacitorGoogleAuth) menggunakan [perpustakaan GMS yang segera dihentikan](https://developer.android.com/identity/sign-in/legacy-gsi-migration#authorization). Sebagai hasil dari perpustakaan GMS ini dianggap sebagai warisan, saya memutuskan untuk menggunakan [CredentialManager](https://developer.android.com/identity/sign-in/credential-manager-siwg). Ini membantu menyederhanakan alur login dan menghapus [kesalahan 10](https://github.com/CodetrixStudio/CapacitorGoogleAuth/issues/332) yang menjengkelkan 🎉

## Dokumentasi

Terakhir, saya menulis beberapa dokumentasi luar biasa ✨. Saya menghabiskan banyak waktu untuk memastikan bahwa dokumen tersebut akurat dan luas.
Dokumen tersebut mencakup panduan mendetail tentang pengaturan baik Apple maupun Google. Saya juga menyediakan [contoh backend](https://github.com/WcaleNieWolny/capgo-social-login-backend-demo) untuk Login dengan Apple 🍎

Jangan ragu untuk memeriksa panduan [Apple](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_apple.md) dan [Google](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_google.md)!

## Kesimpulan

Sebagai kesimpulan, plugin Capacitor Social Login memperkenalkan banyak fitur baru dan menarik dengan lebih banyak yang akan datang di masa depan 🚀
