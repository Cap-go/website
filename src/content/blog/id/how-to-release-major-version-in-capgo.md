---
slug: how-to-release-major-version-in-capgo
title: Cara mempublikasikan versi major baru di capgo
description: >-
  Memahami bagaimana dan kapan perlu merilis versi besar dari aplikasi Anda
  tanpa merusak aplikasi pengguna
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2025-12-31T01:19:38.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Sistem Versi Utama Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: how-to-send-specific-version-to-users
---
## Saat merilis versi major

Versi dapat sulit untuk dikelola, biasanya Anda ingin mengirim pembaruan Major ketika perubahan besar muncul untuk pengguna.

Namun versi tidak dibuat untuk itu, versi app store berbeda dengan versi Native.

Versi Native dibuat untuk mengelola perubahan yang memutus kompatibilitas dalam *kode*

Di IOS, misalnya, iOS 16 adalah `store version` dari Apple, tetapi versi kodenya adalah `20A5283p` (sepertinya mereka tidak menggunakan SemVer di sana)

Sekarang jelas kita tidak mencampurkan keduanya dan menggunakannya sesuai tujuannya!

## Rilis major

Dalam aplikasi Capacitor Anda, rilis major diperlukan ketika terjadi perubahan yang memutus kompatibilitas.
Misalnya, target IOS baru (15 ke 16), atau versi baru Capacitor (3 ke 4), atau plugin (1.2 ke 2.0) yang Anda gunakan telah diperbarui ke versi major.

Perubahan ini berarti semua peralatan harus diselaraskan untuk menangani perubahan yang memutus kompatibilitas.

Itulah mengapa Capgo mengikuti sistem ini.
Jadi jika Anda merilis versi major, Capgo tidak akan mengirimkannya ke pengguna yang belum menginstalnya dari store.\
Perilaku ini dapat disesuaikan. Anda dapat mempelajari lebih lanjut tentang hal ini [here](/docs/cli/commands/#disable-updates-strategy)

### Versi

Dimana Capgo menemukan versi untuk dibandingkan

#### IOS
  > Akan digunakan oleh Capgo untuk membandingkan dengan versi JavaScript dan menemukan upgrade Major

  Di IOS variabel diatur pada proyek Anda di sini `ios/App/App/Info.plist` di bawah kunci `CFBundleShortVersionString` atau `ios/App/App.xcodeproj/project.pbxproj` di bawah kunci `MARKETING_VERSION` jika `MARKETING_VERSION` telah diatur dalam file `Info.plist` Anda.
  > Anda dapat menimpa perilaku ini dengan mengatur kunci versi dalam file `capacitor.config.json` [dokumentasi di sini](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Akan digunakan oleh Capgo untuk membandingkan dengan versi JavaScript dan menemukan upgrade Major

  Di Android, variabel diatur pada proyek Anda di sini `android/app/build.gradle` di bawah kunci `defaultConfig.versionName`
  > Anda dapat menimpa perilaku ini dengan mengatur kunci versi dalam file `capacitor.config.json` [dokumentasi di sini](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Akan digunakan oleh Capgo untuk membandingkan dengan versi Native dan menemukan upgrade Major

  Di JavaScript, variabel diatur pada proyek Anda di sini `package.json` di bawah kunci `version`
## Contoh

Aplikasi Ionic Anda saat ini dirilis dengan versi `1.2.3` dengan Capacitor 3

Anda sedang melakukan upgrade ke Capacitor 4.

Anda perlu meningkatkan nomor versi Anda ke `2.2.3`, kemudian semua paket Anda termasuk Capgo akan mengetahui perubahan besar ini.

Ketika Anda merilis versi ini ke Capgo dan App Store.

Semua pembaruan langsung berikutnya di Capgo `2.2.4` tidak akan pernah dikirim ke pengguna dengan versi `1.2.3`. Hanya dengan versi `2.2.3`.

Jika Anda mengikuti pola ini, tidak perlu khawatir lagi, semua ditangani dengan baik.

## Jika Saya tidak mengikuti ini

Dalam kasus ini, itu berarti Anda harus mengirim aplikasi baru Anda dengan Capacitor 4 ke Apple dan Google, tetapi tidak ke Capgo.

Kemudian Anda harus menunggu 100% pengguna Anda, memiliki aplikasi atau setidaknya 90%, ini akan memakan waktu berbulan-bulan, mungkin.

Sementara selama waktu ini Anda tidak dapat mengirim pembaruan apa pun dengan Capgo, karena pengguna lama tidak dapat mendapatkan versi baru.
Anda tidak memiliki cara untuk memilih hanya beberapa pengguna untuk menerima pembaruan.
