---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: Construction d'applications mobiles avec SvelteKit et Capacitor
description: >-
  Pelajari cara membangun aplikasi mobile menggunakan SvelteKit, Capacitor, dan
  meningkatkan UI native dengan Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: Ilustrasi SvelteKit dan Capgo
keywords: >-
  SvelteKit, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
---

Dalam tutorial ini, kita akan memulai dengan aplikasi [SvelteKit](https://kitsveltedev/) baru dan beralih ke pengembangan mobile native menggunakan Capacitor. Secara opsional, Anda juga dapat mengintegrasikan [Konsta UI](https://konstauicom/) untuk UI mobile Tailwind CSS yang lebih baik.

Capacitor memungkinkan Anda dengan mudah mengkonversi aplikasi web SvelteKit Anda menjadi aplikasi mobile native tanpa perlu modifikasi signifikan atau mempelajari keterampilan baru seperti React Native.

Ikuti panduan langkah demi langkah ini untuk mengubah aplikasi SvelteKit Anda menjadi aplikasi mobile menggunakan Capacitor dan, jika diinginkan, tingkatkan UI mobile Anda dengan Konsta UI.

## Tentang Capacitor

CapacitorJS adalah teknologi yang mengubah segalanya! Dapat dengan mudah diintegrasikan ke proyek web apa pun, membungkus aplikasi Anda dalam webview native dan menghasilkan proyek Xcode dan Android Studio native untuk Anda. Plugin-pluginnya menyediakan akses ke fitur perangkat native seperti kamera melalui jembatan JavaScript.

Capacitor memungkinkan Anda membuat aplikasi mobile native yang fantastis tanpa pengaturan rumit atau kurva pembelajaran yang curam. API-nya yang ramping dan fungsionalitas yang efisien membuatnya mudah diintegrasikan ke dalam proyek Anda. Anda akan takjub betapa mudahnya mencapai aplikasi native yang berfungsi penuh dengan Capacitor!

## Menyiapkan Aplikasi SvelteKit Anda

Untuk membuat aplikasi SvelteKit baru, jalankan perintah berikut:

[[CODE_BLOCK]]

Setelah menjalankan perintah `build`, Anda akan melihat folder `dist` baru di root proyek Anda.

Folder ini akan digunakan oleh Capacitor nanti, namun untuk saat ini, kita perlu mengaturnya dengan benar.

## Menambahkan Capacitor ke Aplikasi SvelteKit Anda

Untuk mengemas aplikasi web apa pun ke dalam kontainer mobile native, kita perlu mengikuti beberapa langkah awal. Setelah itu, sesederhana menjalankan satu perintah `sync`.

Pertama, instal [Capacitor CLI](https://capacitorjscom/docs/cli/) sebagai dependensi pengembangan dan atur dalam proyek Anda. Selama pengaturan, Anda dapat menekan "enter" untuk menerima nilai default untuk nama dan ID bundle.

Selanjutnya, instal paket inti dan paket-paket yang relevan untuk platform iOS dan Android.

Terakhir, tambahkan platform, dan Capacitor akan membuat folder untuk setiap platform di root proyek Anda:

[[CODE_BLOCK]]

Pada titik ini, Anda akan melihat folder **ios** dan **android** baru di proyek SvelteKit Anda.

**Ini adalah proyek native yang sesungguhnya!**

Untuk mengakses proyek Android nanti, Anda perlu menginstal [Android Studio](https://developerandroidcom/studio/). Untuk iOS, Anda memerlukan Mac dan harus menginstal [Xcode](https://developerapplecom/xcode/).

Selain itu, Anda akan menemukan file **capacitorconfigts** di proyek Anda, yang berisi beberapa pengaturan dasar Capacitor yang digunakan selama sinkronisasi. Satu-satunya hal yang perlu Anda perhatikan adalah **webDir**, yang harus menunjuk ke hasil perintah build Anda. Saat ini, itu tidak benar.

Untuk memperbaikinya, buka file **capacitorconfigts** dan perbarui **webDir**:

[[CODE_BLOCK]]

Sekarang setelah kita memperbarui pengaturan Capacitor, mari ubah proyek Sveltekit kita menjadi aplikasi statis dengan mengunduh paket adapter statis yang tepat:

[[CODE_BLOCK]]

Setelah paket terinstal, kita perlu mengubah file _svelteconfigjs_ dari auto-adapter menjadi statis:

[[CODE_BLOCK]]

Dengan _svelteconfigjs_ yang diperbarui, kita perlu menambahkan opsi _prerender_ dengan membuat halaman _+layoutjs_ ke _src/routes_ dan cukup tambahkan ekspor berikut ke _+layoutjs_:

[[CODE_BLOCK]]

Setelah menambahkan dan memperbarui halaman _+layoutjs_, kita perlu menambahkan platform mobile kita, membangun ulang proyek kita untuk membuat folder _build_.

Anda dapat melakukannya dengan menjalankan perintah berikut:

[[CODE_BLOCK]]

Perintah pertama `npm run build` akan membangun proyek SvelteKit Anda dan menyalin build statis, sementara perintah kedua `npx cap sync` akan menyinkronkan semua kode web ke tempat yang tepat dari platform native sehingga dapat ditampilkan dalam aplikasi.

Selain itu, perintah sync mungkin memperbarui platform native dan menginstal plugin, jadi ketika Anda menginstal [plugin Capacitor](https://capacitorjscom/docs/plugins/) baru, saatnya menjalankan `npx cap sync` lagi.