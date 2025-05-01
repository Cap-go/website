---
slug: release-of-a-brand-new-capacitor-social-login
title: Lanzamiento de un nuevo complemento de inicio de sesión social para Capacitor
description: >-
  Plugin Capacitor Social Login adalah plugin yang memungkinkan Anda untuk masuk
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

Hai, saya Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny)) 👋,

Setelah sebulan kerja keras (dan sedikit menyakitkan 🙃), saya dengan senang hati mengumumkan rilis pertama Capacitor Social Login. Plugin ini dirancang untuk membantu menangani Login Google dan Apple di iOS dan Android. Selanjutnya, bersama Martin, kami telah mengerjakan beberapa fitur unik yang meliputi:

 - Pengenalan Login dengan Apple di Android
 - Pengadopsian API Google Credentials yang baru
 - Penambahan dokumentasi terperinci

## Login dengan Apple di Android

Pertama, mari bahas inovasi besar 'Login dengan Apple' di Android. Ini tidak sederhana, karena SDK Apple tidak menyediakan fungsionalitas ini. Saya menggunakan [artikel ini](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) sebagai referensi, tetapi saya mengubahnya sedikit untuk membuatnya lebih aman. Alur yang saya hasilkan seperti ini:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure>

Sayangnya, ini membutuhkan backend dan beberapa modifikasi pada kode aplikasi Anda, tetapi ini yang terbaik yang bisa saya lakukan.

## Pembaruan Login Google di Android

Selanjutnya, saya mencoba mengimplementasikan Login Google di Android. Ternyata, [CodetrixStudio's CapacitorGoogleAuth](https://githubcom/CodetrixStudio/CapacitorGoogleAuth) menggunakan [library GMS yang akan segera deprecated](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization). Sebagai hasil dari library GMS ini dianggap usang, saya memutuskan untuk menggunakan [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg). Ini membantu menyederhanakan alur login dan menghilangkan [error 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332) yang mengganggu 🎉

## Dokumentasi

Terakhir, saya menulis dokumentasi yang luar biasa ✨. Saya menghabiskan banyak waktu untuk memastikan bahwa dokumentasi akurat dan lengkap.
Dokumentasi ini mencakup panduan terperinci untuk mengatur Apple dan Google. Saya juga menyediakan [contoh backend](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo) untuk Login dengan Apple 🍎

Silakan periksa panduan [Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd) dan [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd)!

## Kesimpulan

Sebagai kesimpulan, plugin Capacitor Social Login memperkenalkan banyak fitur baru dan menarik dengan lebih banyak lagi yang akan datang di masa depan 🚀