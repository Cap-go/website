---
slug: in-app-purchases-capacitor
title: Pembelian dalam aplikasi untuk Capacitor
description: >-
  Cara mengimplementasikan pembelian dalam aplikasi untuk aplikasi Capacitor
  menggunakan plugin Capacitor Purchases dan RevenueCat
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Pembelian dalam aplikasi dengan Revenue Cat
tag: Tutorial
published: true
locale: id
next_blog: ''
---

Capacitor Purchases adalah plugin untuk kerangka kerja Capacitor yang memungkinkan pembelian dalam aplikasi di iOS dan Android. Ini menyediakan API yang sederhana dan konsisten di berbagai platform, memudahkan pengembang untuk mengimplementasikan langganan dan pembelian dalam aplikasi di aplikasi mobile mereka.

Salah satu fitur utama plugin Capacitor Purchases adalah integrasinya dengan RevenueCat, platform yang menyediakan alat untuk langganan dalam aplikasi dan pembelian dalam aplikasi. RevenueCat menyederhanakan proses implementasi langganan dan pembelian dalam aplikasi dengan menyediakan API yang sederhana dan konsisten di berbagai platform, serta mengotomatisasi tugas-tugas seperti validasi tanda terima dan manajemen pengguna.

Dengan RevenueCat, pengembang dapat dengan mudah mengelola langganan, melacak pendapatan, dan melakukan tugas-tugas terkait lainnya. Beberapa fitur yang ditawarkan oleh RevenueCat meliputi:

- Validasi tanda terima otomatis
- Manajemen pengguna  
- Dukungan untuk model harga kustom
- Analitik terperinci
- Skalabilitas

Dengan menggunakan plugin Capacitor Purchases bersama RevenueCat, pengembang dapat menghemat waktu dan usaha saat mengimplementasikan langganan dan pembelian dalam aplikasi di aplikasi mobile mereka, serta menyediakan fitur tambahan yang dapat membantu meningkatkan pengalaman pengguna dan pendapatan.

Menggunakan plugin Capacitor Purchases dan RevenueCat, pengembang dapat dengan mudah mengelola dan melacak langganan dan pembelian dalam aplikasi, memvalidasi tanda terima, dan mengelola pengguna di berbagai platform. Ini juga memungkinkan pembuatan model harga kustom dan mendapatkan analitik terperinci untuk meningkatkan kinerja dan pendapatan.

## Instalasi

Pastikan untuk menggunakan versi terbaru Capacitor dan plugin Capacitor Purchases. Anda dapat memeriksa versi terbaru Capacitor dan plugin Capacitor Purchases di situs web Capacitor.

Untuk menginstal plugin Capacitor Purchases, jalankan perintah berikut:
`npm i @capgo/capacitor-purchases`
tambahkan plugin ke kode native aplikasi Anda
`npx cap sync`

tambahkan kemampuan pembelian dalam aplikasi di Xcode:

![Xcode langkah 1](/iap_step1webp)
kemudian
![xcode langkah 2](/iap_step2webp)

## 1. Buat Akun RevenueCat
Panduan ini akan memandu Anda cara memulai dengan langganan dan SDK RevenueCat hanya dengan beberapa baris kode.

Daftar untuk akun RevenueCat baru [di sini](https://app.revenuecat.com/)

> ### 📘
> 
> 💡 Ini tip!
> 
> RevenueCat merekomendasikan membuat akun RevenueCat terpisah untuk setiap aplikasi / proyek yang Anda miliki, terutama jika Anda berniat untuk menjual aplikasi tersebut. Ini akan mempercepat proses transfer, karena Anda dapat mentransfer seluruh akun daripada menunggu Dukungan RevenueCat untuk mentransfer proyek individual.

### Organisasi / Perusahaan

Kami merekomendasikan menggunakan akun perusahaan saat mendaftar untuk RevenueCat dan menyiapkan aplikasi Anda dalam sebuah proyek. Anda akan dapat mengundang anggota tim Anda sebagai [kolaborator](https://www.revenuecat.com/docs/collaborators/) ke proyek Anda, tetapi **hanya pemilik proyek yang dapat mengelola penagihan**. Kolaborator proyek tidak dapat mengelola detail penagihan.

## 2. Konfigurasi Proyek dan Aplikasi

### ▶️ Buat Proyek

Navigasikan ke dasbor RevenueCat dan [tambahkan proyek baru](https://app.revenuecat.com/overview/) dari menu dropdown di navigasi atas yang disebut _Projects_.

![RevenueCat langkah 1](/revenuecat_step1webp)

Modal popup untuk membuat Proyek baru

### ▶️ Tambahkan Aplikasi / Platform

Dari **Project Settings > Apps** di menu kiri dasbor proyek, pilih platform untuk aplikasi yang akan Anda tambahkan.

![RevenueCat langkah 2](/revenuecat_step2webp)

Dasbor proyek untuk memilih platform aplikasi

Bidang **App name** diperlukan untuk menambahkan aplikasi Anda ke RevenueCat. Sisa bidang konfigurasi dapat ditambahkan nanti. Untuk melakukan pembelian uji dan produksi, Bundle ID (iOS) / Package Name (Android) serta Shared Secret (iOS) / Service Credentials (Android) harus dikonfigurasi.

![RevenueCat langkah 3](/revenuecat_step3webp)

Halaman konfigurasi aplikasi untuk aplikasi Apple App Store

> ### 📘
> 
> 💡 Berikut sebuah tips!
>
> Setelah mendaftarkan aplikasi Anda, RevenueCat merekomendasikan untuk menyiapkan [Notifikasi Server Platform](https://wwwrevenuecatcom/docs/server-notifications/) Notifikasi ini tidak wajib, tetapi akan mempercepat waktu pengiriman [webhook](https://wwwrevenuecatcom/docs/webhooks/) dan integrasi serta mengurangi waktu jeda dalam memperbarui pelanggan Anda

> ### 📘
>
> Aplikasi dan pengguna Staging vs Produksi
>
> RevenueCat sendiri tidak memiliki lingkungan terpisah untuk staging dan produksi. Sebaliknya, transaksi yang mendasari untuk pengguna dibedakan berdasarkan sandbox dan produksi
>
> Aplikasi RevenueCat apa pun dapat melakukan pembelian sandbox dan produksi dari toko. Jika Anda memiliki aplikasi terpisah untuk staging dan produksi, Anda dapat membuat beberapa proyek di RevenueCat untuk mencerminkan pengaturan Anda
>
> Selain itu, pengguna juga tidak dipisahkan berdasarkan lingkungan. Pengguna yang sama dapat memiliki pembelian sandbox aktif dan pembelian produksi aktif secara bersamaan

### ▶️ Kredensial Layanan

Kredensial layanan perlu diatur agar RevenueCat dapat berkomunikasi dengan toko aplikasi atas nama Anda. Lihat panduan RevenueCat [App Store Connect Shared Secret](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [Play Service Credentials](https://wwwrevenuecatcom/docs/creating-play-service-credentials/), dan [Amazon Appstore Shared Secret](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) untuk informasi lebih lanjut

Perlu diingat bahwa kredensial layanan play dapat memakan waktu hingga 36 jam untuk menyebar ke seluruh server Google

## 3 Konfigurasi Produk

### ▶️ Pengaturan Toko

Sebelum Anda dapat mulai menggunakan RevenueCat untuk mengambil produk, Anda harus mengkonfigurasi produk Anda di toko masing-masing. Lihat panduan berikut untuk [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/), dan [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) untuk bantuan dalam menavigasi proses ini

Jika Anda menjual produk iOS, pastikan untuk menandatangani 'Paid Applications Agreement' dan mengisi informasi bank dan pajak Anda di **App Store Connect > Agreements, Tax, and Banking**. **Ini perlu diselesaikan sebelum Anda dapat menguji pembelian apa pun**

> ### 📘
>
> Ingin melewati pengaturan toko saat pengujian?
>
> Pada iOS, Anda dapat menunda konfigurasi produk di App Store Connect dengan menguji menggunakan file Konfigurasi StoreKit sebagai gantinya. File konfigurasi ini memerlukan pengaturan minimal dan dapat dikonfigurasi langsung melalui Xcode
>
> Baca lebih lanjut tentang pengaturan file Konfigurasi StoreKit di panduan [Pengujian Sandbox](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) RevenueCat

### ▶️ Mengkonfigurasi Produk dan Hak di RevenueCat

Setelah produk in-app Anda dikonfigurasi di [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/), atau [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), Anda perlu menyalin konfigurasi tersebut ke dasbor RevenueCat. RevenueCat menggunakan sistem 'Entitlements' untuk mengontrol akses ke fitur premium, dan 'Offerings' untuk mengelola kumpulan produk yang Anda tawarkan kepada pelanggan

Entitlements adalah tingkat akses yang "berhak" dimiliki pelanggan setelah membeli produk tertentu
Offerings adalah cara sederhana bagi Anda untuk mengatur produk in-app yang ingin Anda "tawarkan" di paywall Anda dan mengkonfigurasinya dari jarak jauh. RevenueCat **merekomendasikan** penggunaan fitur-fitur ini untuk menyederhanakan kode Anda dan memungkinkan Anda mengubah produk tanpa merilis pembaruan aplikasi

Lihat [Mengkonfigurasi Produk](https://wwwrevenuecatcom/docs/entitlements/) untuk menyiapkan produk Anda dan kemudian mengaturnya menjadi Offerings atau Entitlements

![RevenueCat langkah 4](/revenuecat_step4webp)

## 4Menggunakan SDK Purchases RevenueCat

SDK RevenueCat mengimplementasikan pembelian dan langganan secara mulus di berbagai platform sambil menyinkronkan token dengan server RevenueCat

Jika Anda mengalami masalah dengan SDK, lihat [Pemecahan Masalah SDK](https://wwwrevenuecatcom/docs/troubleshooting-the-sdks/) untuk panduan

> ### 📘
> 
> Hanya gunakan kunci SDK publik Anda untuk mengkonfigurasi Purchases
> 
> Anda dapat memperoleh kunci SDK publik dari tab **API keys** di bawah **Project settings** di dasbor

Anda hanya perlu mengkonfigurasi instance bersama _Purchases_ satu kali, biasanya saat peluncuran aplikasi. Selanjutnya, instance yang sama dibagikan ke seluruh aplikasi Anda dengan mengakses instance `shared` di SDK

Lihat panduan RevenueCat tentang [Mengkonfigurasi SDK](https://docsrevenuecatcom/docs/configuring-sdk/) untuk informasi lebih lanjut dan praktik terbaik

Pastikan Anda mengkonfigurasi _Purchases_ hanya dengan kunci SDK publik Anda. Anda dapat membaca lebih lanjut tentang berbagai kunci API yang tersedia di RevenueCat dalam [Panduan Autentikasi](https://wwwrevenuecatcom/docs/authentication/)

```javascript
import { CapacitorPurchases } from '@capgo/capacitor-purchases'
import { isPlatform } from '@ionic/vue' // use the right one for your framework

CapacitorPurchases.setDebugLogsEnabled({ enabled: import.meta.env.DEV }) // Enable to get debug logs in dev mode
if (isPlatform('ios')) {
    CapacitorPurchases.setup({ apiKey:'appl_******'})
} else if (isPlatform('android')) {
    CapacitorPurchases.setup({ apiKey:'goog_******'})
}
```

Saat dalam pengembangan, RevenueCat merekomendasikan untuk mengaktifkan log debug yang lebih lengkap. Untuk informasi lebih lanjut tentang log ini, lihat panduan [Debugging](https://wwwrevenuecatcom/docs/debugging/) mereka

Jika Anda berencana menggunakan RevenueCat bersama dengan kode pembelian yang sudah ada, lihat panduan mereka tentang [Mode Observer](https://wwwrevenuecatcom/docs/observer-mode/)

> ### 📘
> 
> Mengkonfigurasi Purchases dengan ID Pengguna
> 
> Jika Anda memiliki sistem autentikasi pengguna di aplikasi Anda, Anda dapat menyediakan pengidentifikasi pengguna saat konfigurasi atau pada tanggal yang lebih lanjut dengan memanggil `logIn()`. Untuk mempelajari lebih lanjut, lihat panduan RevenueCat tentang [Mengidentifikasi Pengguna](https://wwwrevenuecatcom/docs/user-ids/)

SDK akan secara otomatis mengambil [Offerings yang dikonfigurasi](https://wwwrevenuecatcom/docs/entitlements/#offerings) dan mengambil informasi produk dari Apple, Google, atau Amazon. Dengan demikian, produk yang tersedia akan sudah dimuat ketika pelanggan meluncurkan layar pembelian Anda

Berikut adalah contoh mengambil Offerings. Anda dapat menggunakan Offerings untuk mengatur layar paywall Anda. Lihat panduan RevenueCat tentang [Menampilkan Produk](https://wwwrevenuecatcom/docs/displaying-products/) untuk informasi lebih lanjut dan praktik terbaik

### ▶️ Mengambil dan Menampilkan Produk yang Tersedia

> ### 📘
> 
> Mengkonfigurasi Purchases dengan ID Pengguna
> 
> Jika Anda memiliki sistem autentikasi pengguna di aplikasi Anda, Anda dapat menyediakan pengidentifikasi pengguna saat konfigurasi atau pada tanggal yang lebih lanjut dengan memanggil `logIn()`. Untuk mempelajari lebih lanjut, lihat panduan RevenueCat tentang [Mengidentifikasi Pengguna](https://wwwrevenuecatcom/docs/user-ids/)

SDK akan secara otomatis mengambil [Offerings yang dikonfigurasi](https://wwwrevenuecatcom/docs/entitlements/#offerings) dan mengambil informasi produk dari Apple, Google, atau Amazon. Dengan demikian, produk yang tersedia akan sudah dimuat ketika pelanggan meluncurkan layar pembelian Anda

Berikut adalah contoh mengambil Offerings. Anda dapat menggunakan Offerings untuk mengatur layar paywall Anda. Lihat panduan RevenueCat tentang [Menampilkan Produk](https://wwwrevenuecatcom/docs/displaying-products/) untuk informasi lebih lanjut dan praktik terbaik

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Jika mengambil [Offerings](https://wwwrevenuecatcom/docs/entitlements/#offerings), [produk](https://wwwrevenuecatcom/docs/entitlements/#products), atau [paket](https://wwwrevenuecatcom/docs/entitlements/#adding-packages) yang tersedia kosong, itu disebabkan oleh beberapa masalah konfigurasi di toko masing-masing

Alasan paling umum untuk ini di App Store Connect adalah 'Perjanjian Aplikasi Berbayar' yang kedaluwarsa atau produk yang tidak setidaknya dalam status 'Siap Untuk Dikirim'. Di GooglePlay ini biasanya terjadi ketika aplikasi tidak dipublikasikan di jalur tertutup dan pengguna tes yang valid ditambahkan

Anda dapat menemukan informasi lebih lanjut tentang pemecahan masalah ini di [Pusat Bantuan](https://supportrevenuecatcom/hc/en-us/articles/360041793174/) RevenueCat

### ▶️ Melakukan Pembelian

SDK menyertakan metode sederhana untuk memfasilitasi pembelian`purchase:package` mengambil paket dari Offering yang diambil dan memproses transaksi dengan toko aplikasi masing-masing

Contoh kode di bawah ini menunjukkan proses pembelian paket dan mengkonfirmasi bahwa itu membuka konten "your_entitlement_id". Detail lebih lanjut tentang metode `purchase:package` dapat ditemukan di panduan RevenueCat tentang [Melakukan Pembelian](https://www.revenuecat.com/docs/making-purchases/)

### ▶️ Periksa Status Langganan

Anda dapat menggunakan metode ini setiap kali Anda perlu mendapatkan status terbaru, dan aman untuk memanggil ini berulang kali sepanjang siklus hidup aplikasi Anda. _Purchases_ secara otomatis menyimpan `CustomerInfo` terbaru dalam cache setiap kali diperbarui — jadi dalam kebanyakan kasus, metode ini mengambil dari cache dan berjalan sangat cepat.

Biasanya metode ini dipanggil saat memutuskan UI mana yang akan ditampilkan kepada pengguna, dan setiap kali pengguna melakukan tindakan yang memerlukan tingkat hak tertentu.

> ### 📘
> 
> 💡 Ini tips!
> 
> Anda dapat mengakses lebih banyak informasi tentang langganan daripada sekadar apakah aktif atau tidak. Lihat panduan RevenueCat tentang [Status Langganan](https://www.revenuecat.com/docs/customer-info/) untuk mengetahui apakah langganan diatur untuk diperbarui, apakah ada masalah yang terdeteksi dengan kartu kredit pengguna, dan lainnya.

RevenueCat memungkinkan pengguna Anda untuk memulihkan pembelian dalam aplikasi mereka, mengaktifkan kembali konten apa pun yang sebelumnya mereka beli dari **akun toko yang sama** (akun Apple, Google, atau Amazon). Kami menyarankan agar semua aplikasi memiliki cara bagi pengguna untuk memicu metode pemulihan. Perhatikan bahwa Apple memang memerlukan mekanisme pemulihan jika pengguna kehilangan akses ke pembelian mereka (misalnya: mencopot pemasangan/memasang kembali aplikasi, kehilangan informasi akun mereka, dll.)

Jika dua [ID Pengguna Aplikasi](https://www.revenuecat.com/docs/user-ids/) yang berbeda memulihkan transaksi dari akun toko yang sama (akun Apple, Google, atau Amazon), RevenueCat mungkin mencoba membuat alias antara dua ID Pengguna Aplikasi dan menghitungnya sebagai pengguna yang sama ke depannya. Lihat panduan RevenueCat tentang [Memulihkan Pembelian](https://www.revenuecat.com/docs/restoring-purchases/) untuk informasi lebih lanjut tentang perilaku pemulihan yang dapat dikonfigurasi yang berbeda.

Karena SDK bekerja dengan mulus di platform apa pun, perubahan pada info pembelian pengguna mungkin berasal dari berbagai sumber. Anda dapat merespons perubahan apa pun dalam `CustomerInfo` pelanggan dengan mematuhi metode delegasi opsional, `purchases:receivedUpdated:`

Metode ini akan dijalankan setiap kali SDK menerima objek `CustomerInfo` yang diperbarui dari panggilan ke `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)`, atau `restorePurchases()`.

Pembaruan CustomerInfo _tidak_ dikirim ke aplikasi Anda dari backend RevenueCat, pembaruan hanya dapat terjadi dari permintaan jaringan keluar ke RevenueCat, seperti disebutkan di atas.

Tergantung pada aplikasi Anda, mungkin cukup untuk mengabaikan delegasi dan hanya menangani perubahan informasi pelanggan saat aplikasi Anda diluncurkan berikutnya atau dalam blok penyelesaian metode SDK.

> ### 👍
> 
> Anda berhasil!
> 
> Anda sekarang telah mengimplementasikan sistem pembelian langganan yang lengkap tanpa menghabiskan sebulan menulis kode server. Selamat!

### Aplikasi Contoh

Untuk mengunduh contoh yang lebih lengkap tentang integrasi SDK, kunjungi sumber daya aplikasi contoh RevenueCat.

**[Lihat Contoh](https://www.revenuecat.com/docs/sample-apps/)**

Saya akan segera menerbitkan aplikasi contoh menggunakan Capacitor dan Vuejs.

Jika Anda perlu menggunakan SDK Capacitor secara mendalam, periksa dokumentasinya [di sini](https://github.com/Cap-go/capacitor-purchases/)

### Langkah Selanjutnya

- Jika Anda belum melakukannya, pastikan produk Anda dikonfigurasi dengan benar dengan memeriksa [panduan tentang hak](https://www.revenuecat.com/docs/entitlements/) RevenueCat
- Jika Anda ingin menggunakan pengidentifikasi pengguna Anda sendiri, baca tentang [menetapkan ID pengguna aplikasi](https://www.revenuecat.com/docs/user-ids/)
- Jika Anda beralih ke RevenueCat dari sistem lain, lihat panduan RevenueCat tentang [migrasi langganan yang ada](https://www.revenuecatcom/docs/migrating-existing-subscriptions/)
-   Setelah Anda siap untuk menguji integrasi Anda, Anda dapat mengikuti panduan RevenueCat tentang [pengujian dan debugging](https://wwwrevenuecatcom/docs/debugging/)
-   Jika Anda memenuhi syarat untuk Program Bisnis Kecil App Store, lihat panduan RevenueCat tentang [cara mendaftar dan memberi tahu RevenueCat](https://wwwrevenuecatcom/docs/app-store-small-business-program/)


Jika Anda membutuhkan pembaruan Langsung di aplikasi Anda

Bergabunglah dengan kami di sini 👇

## Daftar di sini untuk mendapatkan akun Anda

[Capgo](/register/)