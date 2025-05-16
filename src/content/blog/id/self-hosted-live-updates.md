---
slug: self-hosted-live-updates
title: Live Updates yang Dihosting Sendiri
description: >-
  Kami dengan senang hati mengumumkan rilis pembaruan langsung yang dihosting
  sendiri. Ini adalah langkah berikutnya dalam evolusi pembaruan langsung Capgo!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Pembaruan yang Dikelola Sendiri
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: id
next_blog: ''
---

Saya dengan gembira mengumumkan peluncuran Self-hosted Live Updates, yang merupakan evolusi terbaru dari Live Updates Capgo.

Sementara banyak perusahaan saat ini menggunakan Live Updates SDK untuk mengakses pembaruan JavaScript, HTML, dan CSS terbaru untuk aplikasi mereka, beberapa mungkin menghadapi hambatan karena kebijakan perusahaan, regulasi industri, atau batasan geografis. Dengan Self-hosted Live Updates, Anda sekarang dapat mendistribusikan artefak build web melalui infrastruktur Anda sendiri.

Ini berarti Anda dapat menghindari penundaan yang disebabkan oleh tinjauan Apple Store, mengatasi bug dan memodifikasi konten lebih cepat, dan memastikan bahwa pengguna Anda selalu menggunakan versi terbaru dari aplikasi Anda. Selain itu, saya telah mendengar dari banyak perusahaan besar yang ingin memanfaatkan Live Updates tetapi menghadapi tantangan karena standar kepatuhan yang ketat. Masalah ini sekarang sudah teratasi berkat Self-hosted Live Updates.

## Bagaimana cara kerja self-hosted live updates?

Menerapkan Capgo-hosted Live Updates sangat mudah menggunakan [Capgo SDK](https://githubcom/Cap-go/capacitor-updater/). Untuk Self-hosted Live Updates, saya telah meningkatkan Capgo CLI dengan fungsionalitas yang diperlukan untuk mengaktifkan konfigurasi pada infrastruktur Anda.

Untuk memastikan pengiriman artefak build web terbaru yang aman dan terkoordinasi kepada pengguna akhir, Capgo sekarang memungkinkan plugin Capacitor Live Updates menggunakan pasangan kunci publik/privat. Ketika menggunakan Self-hosted Live Updates, handshake tambahan dilakukan untuk memastikan bahwa artefak yang diunduh melalui plugin dari infrastruktur perusahaan tidak dimodifikasi.

![Capgo encryption schema](/encryption_flow.webp)

Berikut adalah langkah-langkah untuk membuat pasangan kunci dan proses selanjutnya untuk memberikan pengalaman yang diperbarui kepada pengguna akhir.

### Pengaturan pasangan kunci satu kali

Untuk menghasilkan pasangan kunci publik/privat, perusahaan dapat menggunakan perintah Capgo Cloud CLI berikut:

[[CODE_BLOCK]]

Perintah ini akan mengatur properti `CapacitorUpdaterprivateKey` dalam file konfigurasi Anda.
Dan menghasilkan 2 file kunci, `capgo_keypub` dan `capgo_key` di direktori root proyek Anda.

Pasangan kunci ini digunakan untuk menandatangani pembaruan dan memverifikasi pembaruan di sisi aplikasi.

### Alur kerja self-hosted live updates

Untuk mulai menerapkan Self-hosted Live Updates, perusahaan harus terlebih dahulu melakukan build web dari perbaikan bug, pembaruan konten, atau perubahan kode berbasis web lainnya yang ingin mereka buat. Selanjutnya, mereka harus menandatangani artefak build menggunakan kunci privat yang diperoleh selama proses pengaturan satu kali, dan akhirnya mengunggah bundle ke lokasi penyimpanan pilihan mereka.

Pertama build kode Anda:
[[CODE_BLOCK]]

Kemudian Zip build Anda:
[[CODE_BLOCK]]

Kemudian enkripsi zip Anda:

[[CODE_BLOCK]]

Perintah ini akan mencetak ivSessionKey, Anda perlu menyimpannya untuk langkah selanjutnya.

Sekarang unggah zip terenkripsi ke penyimpanan perusahaan Anda dan dapatkan URL file zip tersebut.

Capgo kemudian harus diberitahu tentang Live Update baru yang siap untuk digunakan. Ini dilakukan melalui perintah CLI lainnya:

[[CODE_BLOCK]]

Setelah perintah dijalankan, Capgo mengetahui ada pembaruan baru yang siap didistribusikan ke pengguna aplikasi. Sekarang, ketika aplikasi dijalankan, plugin Live Updates memeriksa dengan Capgo untuk melihat apakah ada perubahan yang perlu diunduh.

Capgo merespons kembali ke plugin dengan "Ya, pembaruan tersedia" dan plugin Live Updates mengunduh pembaruan langsung menggunakan lokasi URL yang disediakan dari perintah CLI `register`:

[[CODE_BLOCK]]

API organisasi mengembalikan bundle Live Update dari lokasi tersebut, dan aplikasi mendekripsi zip dan menerapkan pembaruan langsung. Selesai!

## Mulai

Saya sangat senang dapat memperluas jangkauan Live Updates ke lebih banyak perusahaan dari sebelumnya. Baik organisasi maupun pengguna aplikasi Ionic akan dengan cepat mengenali keuntungan dari distribusi pembaruan aplikasi over-the-air yang aman dari Capgo.

Untuk informasi lebih lanjut tentang Self-hosted Live Updates oleh Capgo, Anda dapat [memeriksa dokumentasi](/docs/cli/commands/#upload-version)