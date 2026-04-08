---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: Pengenalan Enkripsi End-to-end di capacitor-updater dengan Code Signing
description: >-
  Menggunakan enkripsi RSA + AES untuk mengenkripsi update, dirancang untuk
  perusahaan dan aplikasi keamanan tinggi
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2025-12-08T00:32:14.000Z
head_image: /secure_upload.webp
head_image_alt: Download Capgo Dengan Aman
keywords: >-
  E2E, code signing, RSA, AES, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Solution
published: true
locale: id
next_blog: ''
---
[Capacitor-updater](https://github.com/Cap-go/capacitor-updater/) kini mendukung enkripsi kode end-to-end. Penandatanganan kode memastikan pembaruan yang dijalankan oleh perangkat pengguna akhir tidak dirusak dan memberikan tingkat perlindungan tambahan di atas keamanan tingkat web standar Capacitor-updater.

## Keamanan default Capacitor-updater

Secara default, model keamanan Capgo mirip dengan penyedia hosting web. Capgo menyimpan pembaruan [terenkripsi saat diam](https://cloud.google.com/docs/security/encryption/default-encryption/) dan melayaninya melalui HTTPS menggunakan cipher modern. Demikian pula, menerbitkan pembaruan dari komputer pengembang selalu menggunakan HTTPS.

![Capgo mendapat nilai A+ pada tes HTTPS SSL Labs](/ssllabs_report.webp)

Keamanan default Capgo mendapat nilai A+ pada tes HTTPS SSL Labs (https://www.ssllabs.com, November 2022)

Seperti web host terbaik di kelasnya, Capgo menggunakan HTTPS untuk melindungi privasi dan integritas koneksi jaringan antara server dan perangkat pengguna akhir. Ini adalah tingkat keamanan yang sangat baik yang bekerja dengan baik untuk web dan aplikasi Ionic yang menggunakan Capgo.

## Rantai pasokan infrastruktur cloud

Hal lain yang dimiliki Capgo dan sebagian besar web host adalah mereka berjalan di infrastruktur cloud tingkat rendah, sering dari AWS, GCP, atau penyedia cloud populer lainnya. Perangkat keras dan perangkat lunak yang dioperasikan oleh penyedia cloud ini dan Capgo atau web host lainnya adalah bagian dari rantai pasokan cloud.

Rantai pasokan cloud dan model keamanannya bekerja untuk sejumlah besar situs web dan aplikasi. Setiap pengembang web yang menggunakan penyedia cloud menaruh kepercayaan pada penyedia tersebut dan mengharapkan file yang mereka unggah adalah file yang dijalankan atau dilayani tanpa dirusak. Dan penyedia cloud bekerja keras untuk menjaga infrastruktur mereka tetap aman.

Tapi tentu saja, kerentanan perangkat keras dan perangkat lunak ditemukan. Penyedia cloud menambal kerentanan sesuai jadwal, secara proaktif mencegah perangkat lunak berbahaya (misalnya [Google's SLSA](https://security.googleblog.com/2021/06/introducing-slsa-end-to-end-framework.html/)), dan membangun lapisan pertahanan mendalam, dan dalam praktiknya, infrastruktur cloud telah terbukti memenuhi kebutuhan keamanan sebagian besar situs web dan aplikasi. Namun, beberapa aplikasi Ionic memasukkan infrastruktur cloud yang dikompromikan dalam model ancaman mereka. Untuk aplikasi Capacitor JS ini dengan persyaratan keamanan tertinggi di atas web, kami membangun penandatanganan kode end-to-end di Capgo dan [protokol standar Pembaruan Capgo](/docs/self-hosted/auto-update/update-endpoint/).

## Penandatanganan kode end-to-end dengan Capgo

Penandatanganan kode end-to-end Capgo menggunakan kriptografi kunci publik untuk memastikan perangkat pengguna akhir hanya menjalankan pembaruan asli yang tidak dimodifikasi dari pengembang aplikasi Capacitor.

"End-to-end" berarti keamanan ini mencakup aliran dari saat pengembang menerbitkan pembaruan hingga saat perangkat pengguna akhir menerima dan menjalankan pembaruan. "Penandatanganan kode" adalah menggunakan kriptografi dan kunci pribadi rahasia untuk "menandatangani" kode, dan kemudian menggunakan kunci publik yang dipercaya untuk memverifikasi tanda tangan.

Berikut adalah skema sederhana* untuk menjelaskan cara kerjanya:

![Skema enkripsi Capgo](/encryption_flow.webp)

* Rumit dalam praktiknya, kriptografi itu sulit

*Definisi*:
- AES: Advanced Encryption Standard, algoritma enkripsi simetris, satu kunci untuk enkripsi dan dekripsi.
- RSA: Rivest–Shamir–Adleman, algoritma enkripsi asimetris, dua kunci digunakan: kunci publik dan kunci pribadi.
- Cypher: Data terenkripsi.
- Session key: Kunci AES yang digunakan untuk mengenkripsi dan mendekripsi data.
- Checksum: Hash yang dihitung untuk sebuah file
- Signature: Checksum yang dienkripsi dengan kunci RSA pribadi. Dapat diverifikasi dengan kunci RSA publik

Kami menggunakan algoritma AES untuk mengenkripsi pembaruan. Kunci AES acak dibuat untuk setiap unggahan, kemudian kunci AES dan checksum (selanjutnya disebut "tanda tangan") dienkripsi dengan kunci RSA pribadi pengembang. Kunci RSA publik pengembang digunakan dalam aplikasi untuk mendekripsi kunci AES dan tanda tangan (mengubahnya kembali menjadi checksum). Kemudian, kunci AES yang didekripsi digunakan untuk mendekripsi pembaruan; checksum dari pembaruan yang didekripsi dihitung, dan dibandingkan dengan tanda tangan yang didekripsi.

Kami menggunakan dua algoritma enkripsi berbeda karena RSA tidak dapat digunakan untuk mengenkripsi data dalam jumlah besar. AES digunakan untuk mengenkripsi pembaruan dan RSA digunakan untuk mengenkripsi kunci AES dan checksum.

Dengan ini, bahkan Capgo tidak dapat membaca konten bundle Anda. Ini adalah model keamanan yang kuat yang digunakan oleh banyak pelanggan enterprise.

**Pembaruan enkripsi V2 2024-08-27:**
- Kami mengubah tipe kunci yang disimpan dalam aplikasi. Ini dilakukan untuk mencegah penyimpulan kunci publik (sebelumnya digunakan untuk enkripsi) dari kunci pribadi (sebelumnya digunakan untuk dekripsi). Sekarang, aplikasi menyimpan kunci publik (sekarang digunakan untuk dekripsi).
- Kami mengubah checksum dari algoritma CRC32 ke algoritma SHA256. Kami juga mulai [menandatangani bundle](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Signing_messages). Ketika enkripsi V2 dikonfigurasi, pembaruan harus memiliki tanda tangan yang valid. Ini ditegakkan secara ketat oleh plugin.
- Kami sekarang menegakkan tanda tangan yang valid enkripsi V2 dikonfigurasi.
Ketiga perubahan ini telah dilakukan setelah analisis keamanan dari anggota komunitas. Mereka ada untuk mencegah serangan kriptografis selama pembaruan.

Jika Anda menggunakan enkripsi V1, migrasikan ke V2 untuk mendapatkan fitur keamanan baru. Ikuti [instruksi migrasi](/docs/cli/migrations/encryption/).

Dengan penandatanganan kode end-to-end, Capgo menjadi infrastruktur cloud yang "tidak memerlukan kepercayaan". Jika salah satu penyedia cloud Capgo atau bahkan Capgo sendiri memodifikasi pembaruan yang ditandatangani kode, perangkat pengguna akhir akan menolak pembaruan tersebut dan menjalankan pembaruan terpercaya sebelumnya yang sudah ada di perangkat.

Sementara HTTPS tingkat web sudah cukup untuk banyak aplikasi, beberapa perusahaan besar menganggap tingkat keamanan tambahan dari penandatanganan kode end-to-end menarik. Beberapa perusahaan ini membuat aplikasi keuangan yang mengeluarkan transaksi bernilai tinggi dan permanen. Perusahaan lain memiliki CISO yang memasukkan infrastruktur cloud yang dikompromikan dalam model ancaman mereka. Kami membangun penandatanganan kode end-to-end di Capgo untuk kasus penggunaan ini dan tertarik untuk mendengar lebih banyak dari perusahaan dengan kebutuhan keamanan tingkat tinggi.

## Memulai untuk pelanggan enterprise

Untuk perusahaan atau proyek besar yang sangat peduli tentang keamanan, kami ingin membuat penandatanganan kode mudah untuk diatur dan dipelihara. Untuk itu, kami sekarang menyediakan fitur berikut:

-   Pengaturan dan konfigurasi sertifikat yang cepat
-   Dukungan untuk server pengembangan penandatanganan kode dengan Capgo dan build pengembangan
-   Penandatanganan kode produksi pada setiap pembaruan

Penandatanganan kode Capgo tersedia untuk semua pelanggan. Untuk memulai, ikuti [instruksi pengaturan](/docs/cli/commands/#end-to-end-encryption-trustless).

## Kredit

Terima kasih banyak kepada [Ionic](https://ionic.com/), artikel ini didasarkan pada [artikel ini](https://ionic.io/blog/introducing-the-ionic-end-to-end-testing-reference-example/) yang ditulis ulang dengan chat-gpt-3 dan disesuaikan.
