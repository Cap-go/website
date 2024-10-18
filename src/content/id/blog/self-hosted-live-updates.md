---
slug: self-hosted-live-updates
title: Pembaruan langsung yang dihosting sendiri
description: >-
  Saya senang mengumumkan Self-hosted Live Updates, iterasi berikutnya dari
  Capacitor Live Updates!
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Pembaruan yang dihosting sendiri
tag: Solution
published: true
locale: id
next_blog: ''
---

Dengan senang hati saya mengumumkan rilis Self-hosted Live Updates, yang merupakan evolusi terbaru dari Live Updates Capgo.

Sementara banyak perusahaan saat ini menggunakan SDK Live Updates untuk mengakses pembaruan JavaScript, HTML, dan CSS terbaru untuk aplikasi mereka, beberapa mungkin menghadapi hambatan karena kebijakan perusahaan, peraturan industri, atau batasan geografis. Dengan Self-hosted Live Updates, Anda sekarang dapat mendistribusikan artefak build web melalui infrastruktur Anda sendiri.

Ini berarti Anda dapat menghindari penundaan yang disebabkan oleh peninjauan Apple Store, mengatasi bug dan memodifikasi konten lebih cepat, dan memastikan bahwa pengguna Anda selalu menggunakan versi terbaru dari aplikasi Anda. Selain itu, saya telah mendengar dari banyak perusahaan besar yang ingin memanfaatkan Live Updates tetapi menghadapi tantangan karena standar kepatuhan yang ketat. Masalah ini sekarang menjadi masa lalu berkat Self-hosted Live Updates.

## Bagaimana cara kerja self-hosted live updates?

Menerapkan Live Updates yang di-host Capgo sangat mudah menggunakan [Capgo SDK](https://github.com/Cap-go/capacitor-updater/). Untuk Self-hosted Live Updates, saya telah meningkatkan Capgo CLI dengan fungsionalitas yang diperlukan untuk memungkinkan konfigurasi pada infrastruktur Anda.

Untuk memastikan pengiriman artefak build web terbaru yang aman dan terkoordinasi kepada pengguna akhir, Capgo sekarang memungkinkan plugin Capacitor Live Updates menggunakan pasangan kunci publik/privat. Saat menggunakan Self-hosted Live Updates, handshake tambahan dilakukan untuk memberikan jaminan bahwa artefak yang diunduh melalui plugin dari infrastruktur perusahaan tidak dimodifikasi.

![Skema enkripsi Capgo](/encryption_flow.webp)

Berikut ini menguraikan langkah-langkah untuk membuat pasangan kunci dan proses selanjutnya untuk memberikan pengalaman yang diperbarui kepada pengguna akhir.

### Pengaturan pasangan kunci satu kali

Untuk menghasilkan pasangan kunci publik/privat, perusahaan dapat menggunakan perintah Capgo Cloud CLI berikut:

```shell
npx @capgo/cli@latest key create
```

Perintah ini akan mengatur properti `CapacitorUpdater.privateKey` dalam file konfigurasi Anda
Dan menghasilkan 2 file kunci, `capgo_key.pub` dan `capgo_key` di direktori root proyek Anda.

Pasangan kunci ini digunakan untuk menandatangani pembaruan dan memverifikasi pembaruan di sisi aplikasi.

### Alur kerja self-hosted live updates

Untuk mulai menerapkan Self-hosted Live Updates, perusahaan harus terlebih dahulu melakukan build web dari perbaikan bug, pembaruan konten, atau perubahan kode berbasis web lainnya yang ingin mereka buat. Selanjutnya, mereka harus menandatangani artefak build menggunakan kunci privat yang diperoleh selama proses pengaturan satu kali, dan terakhir mengunggah bundel ke lokasi penyimpanan yang mereka pilih.

Pertama, build kode Anda:
```shell
npm run build
```

Kemudian Zip build Anda:
```shell
npx @capgo/cli/latest bundle zip
```

Lalu enkripsi zip Anda:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Perintah ini akan mencetak ivSessionKey untuk Anda, Anda perlu menyimpannya untuk langkah berikutnya.

Sekarang unggah zip terenkripsi Anda ke penyimpanan perusahaan dan dapatkan URL file zip tersebut.

Capgo kemudian harus diberi tahu tentang Live Update baru yang siap untuk dikonsumsi. Ini dilakukan melalui perintah CLI lainnya:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Setelah perintah dijalankan, Capgo mengetahui ada pembaruan baru yang siap untuk didistribusikan ke pengguna aplikasi. Sekarang, ketika aplikasi dijalankan, plugin Live Updates memeriksa dengan Capgo untuk melihat apakah ada perubahan yang perlu diunduh.

Capgo merespons kembali ke plugin dengan "Ya, pembaruan tersedia" dan plugin Live Updates mengunduh pembaruan live baru menggunakan lokasi URL yang disediakan dari perintah CLI `register`:

```shell
https://abc.com/app/updates/abc123.zip
```

API organisasi mengembalikan bundel Live Update dari lokasi tersebut, dan aplikasi mendekripsi zip dan menerapkan pembaruan live. Voilà!

## Mulai

Saya sangat senang dapat memperluas jangkauan Live Updates ke lebih banyak perusahaan daripada sebelumnya. Baik organisasi maupun pengguna aplikasi Ionic akan dengan cepat mengenali keuntungan dari distribusi pembaruan aplikasi over-the-air yang aman dari Capgo.

Untuk informasi lebih lanjut tentang Self-hosted Live Updates oleh Capgo, Anda dapat [melihat dokumennya](/docs/tooling/cli/#upload-version).Siap untuk menerapkan pembaruan aplikasi instan langsung ke pengguna Anda? [Daftar di sini sekarang!](/register/)