---
slug: in-app-purchases-capacitor
title: Acquisti in-app per Capacitor
description: >-
  How to implement in-app purchases for Capacitor applications using the
  Capacitor Purchases plugin and RevenueCat
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Pembelian dalam aplikasi Revenue cat
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: ''
---

>> Plugin ini sekarang ditransfer ke repositori resmi RevenueCat. Silakan lihat [dokumentasi resmi](https://wwwrevenuecatcom/docs/getting-started/installation/capacitor) untuk informasi lebih lanjut.

Capacitor Purchases adalah plugin untuk framework Capacitor yang memungkinkan pembelian dalam aplikasi di iOS dan Android. Plugin ini menyediakan API yang sederhana dan konsisten di berbagai platform, memudahkan pengembang untuk mengimplementasikan langganan dan pembelian dalam aplikasi di aplikasi mobile mereka.

Salah satu fitur utama plugin Capacitor Purchases adalah integrasinya dengan RevenueCat, platform yang menyediakan alat untuk langganan dalam aplikasi dan pembelian dalam aplikasi. RevenueCat menyederhanakan proses implementasi langganan dan pembelian dalam aplikasi dengan menyediakan API yang sederhana dan konsisten di berbagai platform, serta mengotomatisasi tugas seperti validasi struk dan manajemen pengguna.

Dengan RevenueCat, pengembang dapat dengan mudah mengelola langganan, melacak pendapatan, dan melakukan tugas terkait lainnya. Beberapa fitur yang ditawarkan RevenueCat meliputi:

- Validasi struk otomatis
- Manajemen pengguna  
- Dukungan untuk model harga kustom
- Analitik terperinci
- Skalabilitas

Dengan menggunakan plugin Capacitor Purchases dengan RevenueCat, pengembang dapat menghemat waktu dan upaya saat mengimplementasikan langganan dan pembelian dalam aplikasi di aplikasi mobile mereka, serta menyediakan fitur tambahan yang dapat membantu meningkatkan pengalaman pengguna dan pendapatan.

Menggunakan plugin Capacitor Purchases dan RevenueCat, pengembang dapat dengan mudah mengelola dan melacak langganan dan pembelian dalam aplikasi, memvalidasi struk, dan mengelola pengguna di berbagai platform. Ini juga memungkinkan pembuatan model harga kustom dan mendapatkan analitik terperinci untuk meningkatkan kinerja dan pendapatan.

## Instalasi

Pastikan untuk menggunakan versi terbaru Capacitor dan plugin Capacitor Purchases. Anda dapat memeriksa versi terbaru Capacitor dan plugin Capacitor Purchases di situs web Capacitor.

Untuk menginstal plugin Capacitor Purchases, jalankan perintah berikut:
`npm i @capgo/capacitor-purchases`
tambahkan plugin ke kode native aplikasi Anda
`npx cap sync`

tambahkan kemampuan pembelian dalam aplikasi di Xcode:

![Xcode step 1](/iap_step1webp)
kemudian
![xcode step 2](/iap_step2webp)

## 1. Buat Akun RevenueCat
Panduan ini akan memandu Anda cara memulai dengan langganan dan SDK RevenueCat hanya dengan beberapa baris kode.

Daftar untuk akun RevenueCat baru [di sini](https://apprevenuecatcom/)

> ### 📘
> 
> 💡 Ini tips!
> 
> RevenueCat merekomendasikan membuat akun RevenueCat terpisah untuk setiap aplikasi / proyek yang Anda miliki, terutama jika Anda berniat menjual aplikasi tersebut. Ini akan mempercepat proses transfer, karena Anda dapat mentransfer seluruh akun daripada menunggu Dukungan RevenueCat untuk mentransfer proyek individual.

### Organisasi / Enterprise

Kami merekomendasikan menggunakan akun perusahaan saat mendaftar untuk RevenueCat dan mengatur aplikasi Anda dalam sebuah proyek. Anda akan dapat mengundang anggota tim Anda sebagai [kolaborator](https://wwwrevenuecatcom/docs/collaborators/) ke proyek Anda, tetapi **hanya pemilik proyek yang dapat mengelola penagihan**. Kolaborator proyek tidak dapat mengelola detail penagihan.

## 2. Konfigurasi Proyek dan Aplikasi

### ▶️ Buat Proyek

Navigasikan ke dashboard RevenueCat dan [tambahkan proyek baru](https://apprevenuecatcom/overview/) dari dropdown di menu navigasi atas yang disebut _Projects_

![RevenueCat step 1](/revenuecat_step1webp)

Modal popup untuk membuat Proyek baru

### ▶️ Tambah Aplikasi / Platform

Dari **Project Settings > Apps** di menu kiri dashboard proyek, pilih platform untuk aplikasi yang akan Anda tambahkan

![RevenueCat step 2](/revenuecat_step2webp)

Dashboard proyek untuk memilih platform aplikasi

Bidang **App name** diperlukan untuk menambahkan aplikasi Anda ke RevenueCat. Bidang konfigurasi lainnya dapat ditambahkan nanti. Untuk melakukan pembelian uji dan produksi, Bundle ID (iOS) / Package Name (Android) serta Shared Secret (iOS) / Service Credentials (Android) harus dikonfigurasi.![RevenueCat step 3](/revenuecat_step3webp)

Halaman konfigurasi aplikasi untuk aplikasi Apple App Store

> ### 📘
> 
> 💡 Ini tips!
> 
> Setelah mendaftarkan aplikasi Anda, RevenueCat merekomendasikan untuk mengatur [Platform Server Notifications](https://wwwrevenuecatcom/docs/server-notifications/) Notifikasi ini tidak wajib, tetapi akan mempercepat [webhooks](https://wwwrevenuecatcom/docs/webhooks/) dan waktu pengiriman integrasi serta mengurangi waktu tunda dalam memperbarui pelanggan Anda

> ### 📘
> 
> Aplikasi dan pengguna Staging vs Production
> 
> RevenueCat sendiri tidak memiliki lingkungan terpisah untuk staging dan production. Sebaliknya, transaksi yang mendasari untuk pengguna dibedakan berdasarkan sandbox dan production
> 
> Setiap aplikasi RevenueCat dapat melakukan pembelian sandbox dan production dari toko. Jika Anda memiliki aplikasi terpisah untuk staging dan production, Anda dapat membuat beberapa proyek di RevenueCat untuk mencerminkan pengaturan Anda
> 
> Selain itu, pengguna juga tidak dipisahkan berdasarkan lingkungan. Pengguna yang sama dapat memiliki pembelian sandbox aktif dan pembelian production aktif pada saat yang bersamaan

### ▶️ Kredensial Layanan

Kredensial layanan perlu diatur agar RevenueCat dapat berkomunikasi dengan app store atas nama Anda. Lihat panduan RevenueCat [App Store Connect Shared Secret](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [Play Service Credentials](https://wwwrevenuecatcom/docs/creating-play-service-credentials/), dan [Amazon Appstore Shared Secret](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) untuk informasi lebih lanjut

Perlu diketahui bahwa kredensial layanan play dapat membutuhkan waktu hingga 36 jam untuk menyebar ke seluruh server Google

## 3. Konfigurasi Produk

### ▶️ Pengaturan Toko

Sebelum Anda dapat mulai menggunakan RevenueCat untuk mengambil produk, Anda harus mengonfigurasi produk Anda di toko masing-masing. Lihat panduan berikut untuk [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/), dan [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) untuk bantuan dalam menavigasi proses ini

Jika Anda menjual produk iOS, pastikan untuk menandatangani 'Paid Applications Agreement' dan mengisi informasi bank dan pajak Anda di **App Store Connect > Agreements, Tax, and Banking**. **Ini perlu diselesaikan sebelum Anda dapat menguji pembelian apa pun**

> ### 📘
> 
> Ingin melewati pengaturan toko saat pengujian?
> 
> Pada iOS, Anda dapat menunda konfigurasi produk di App Store Connect dengan menguji menggunakan file Konfigurasi StoreKit sebagai gantinya. File konfigurasi ini memerlukan pengaturan minimal dan dapat dikonfigurasi langsung melalui Xcode
> 
> Baca lebih lanjut tentang pengaturan file Konfigurasi StoreKit di panduan [Sandbox Testing](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) RevenueCat

### ▶️ Konfigurasi Produk dan Hak di RevenueCat

Setelah produk dalam aplikasi Anda telah dikonfigurasi di [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/), atau [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), Anda perlu menyalin konfigurasi tersebut ke dashboard RevenueCat. RevenueCat menggunakan sistem 'Entitlements' untuk mengontrol akses ke fitur premium, dan Offerings untuk mengelola set produk yang Anda tawarkan kepada pelanggan

Entitlements adalah tingkat akses yang "berhak" diperoleh pelanggan setelah membeli produk tertentu
Offerings adalah cara sederhana bagi Anda untuk mengatur produk dalam aplikasi yang ingin Anda "tawarkan" di paywall Anda dan mengonfigurasinya dari jarak jauh. RevenueCat **merekomendasikan** menggunakan fitur-fitur ini untuk menyederhanakan kode Anda dan memungkinkan Anda mengubah produk tanpa merilis pembaruan aplikasi

Lihat [Configuring Products](https://wwwrevenuecatcom/docs/entitlements/) untuk mengatur produk Anda dan kemudian mengaturnya ke dalam Offerings atau Entitlements