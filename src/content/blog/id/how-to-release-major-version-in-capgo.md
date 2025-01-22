---
slug: id__how-to-release-major-version-in-capgo
title: Berikut cara menerbitkan versi utama di Capgo
description: >-
  Pahami bagaimana dan kapan perlu merilis versi utama aplikasi Anda tanpa
  merusak aplikasi pengguna
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Sistem versi utama Capgo
tag: Tutorial
published: true
locale: id
next_blog: how-to-send-specific-version-to-users
---

## Saat merilis versi utama

Versioning bisa sulit dikelola, biasanya Anda ingin mengirim pembaruan Utama ketika perubahan besar muncul bagi pengguna

Namun versioning tidak dibuat untuk itu, versi app store berbeda dengan versi Native

Versi Native dibuat untuk mengelola perubahan yang memutus kompatibilitas dalam *kode*

Di iOS, misalnya, iOS 16 adalah `versi toko` Apple, tetapi versi kodenya adalah `20A5283p` (mereka tampaknya tidak menggunakan SemVer di sana)

Sekarang jelas kita tidak mencampurnya dan menggunakannya untuk apa yang mereka buat!

## Rilis utama

Dalam aplikasi Capacitor Anda, rilis utama diperlukan ketika terjadi perubahan yang memutus kompatibilitas
Misalnya, target iOS baru (15 ke 16), atau versi baru Capacitor (3 ke 4), atau plugin (12 ke 20) yang Anda gunakan telah diperbarui ke versi utama

Perubahan ini berarti semua alat harus diselaraskan untuk menangani perubahan yang memutus kompatibilitas

Itulah mengapa Capgo mengikuti sistem ini
Jadi jika Anda merilis versi utama, Capgo tidak akan mengirimkannya ke pengguna yang belum menginstalnya dari toko\
Perilaku ini dapat disesuaikan. Anda dapat mempelajari lebih lanjut tentangnya [di sini](/docs/tooling/cli/#disable-updates-strategy)

### Versi

Di mana Capgo menemukan versi untuk dibandingkan

#### iOS
  > Akan digunakan oleh Capgo untuk membandingkan dengan versi JavaScript dan menemukan peningkatan Utama

 Di iOS, variabel diatur pada proyek Anda di sini `ios/App/App/Infoplist` di bawah kunci `CFBundleShortVersionString` atau `ios/App/Appxcodeproj/projectpbxproj` di bawah kunci `MARKETING_VERSION` jika `MARKETING_VERSION` diatur dalam file `Infoplist` Anda
  > Anda dapat mengganti perilaku ini dengan mengatur kunci versi dalam file `capacitorconfigjson` [dokumentasi di sini](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Akan digunakan oleh Capgo untuk membandingkan dengan versi JavaScript dan menemukan peningkatan Utama

  Di Android, variabel diatur pada proyek Anda di sini `android/app/buildgradle` di bawah kunci `defaultConfigversionName`
  > Anda dapat mengganti perilaku ini dengan mengatur kunci versi dalam file `capacitorconfigjson` [dokumentasi di sini](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Akan digunakan oleh Capgo untuk membandingkan dengan versi Native dan menemukan peningkatan Utama

  Di JavaScript, variabel diatur pada proyek Anda di sini `packagejson` di bawah kunci `version`
## Contoh

Aplikasi Ionic Anda saat ini dirilis dengan versi `123` dengan Capacitor 3

Anda melakukan peningkatan ke Capacitor 4

Anda perlu meningkatkan nomor versi Anda menjadi `223`, kemudian semua paket Anda termasuk Capgo akan mengetahui perubahan besar ini

Ketika Anda merilis versi ini ke Capgo dan App Store

Semua pembaruan langsung berikutnya di Capgo `224` tidak akan pernah dikirim ke pengguna dengan versi `123` Hanya dengan versi `223`

Jika Anda mengikuti pola ini, tidak perlu khawatir lagi, semua ditangani dengan baik


## Jika saya tidak mengikuti ini

Dalam kasus ini, itu berarti Anda harus mengirim aplikasi baru Anda dengan Capacitor 4 ke Apple dan Google, tetapi tidak ke Capgo

Kemudian Anda harus menunggu 100% pengguna Anda, atau setidaknya 90%, memiliki aplikasi tersebut, yang mungkin memakan waktu berbulan-bulan

Sementara selama waktu ini Anda tidak dapat mengirim pembaruan apa pun dengan Capgo, karena pengguna lama tidak dapat mendapatkan versi baru
Anda tidak memiliki cara untuk memilih hanya beberapa pengguna untuk menerima pembaruan