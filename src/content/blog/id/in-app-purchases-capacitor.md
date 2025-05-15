---
slug: in-app-purchases-capacitor
title: pembelian dalam aplikasi untuk Capacitor
description: >-
  Cara menerapkan pembelian dalam aplikasi untuk aplikasi capacitor menggunakan
  plugin Pembelian Capacitor dan RevenueCat
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Pembelian dalam aplikasi RevenueCat
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: id
next_blog: ''
---
>> Plugin ini sekarang telah dipindahkan ke repositori resmi RevenueCat. Silakan lihat [dokumentasi resmi](https://www.revenuecat.com/docs/getting-started/installation/capacitor) untuk informasi lebih lanjut.

Capacitor Purchases adalah plugin untuk framework Capacitor yang memungkinkan pembelian dalam aplikasi di iOS dan Android. Ini menyediakan API yang sederhana dan konsisten di berbagai platform, membuatnya mudah bagi pengembang untuk mengimplementasikan langganan dan pembelian dalam aplikasi di aplikasi mobile mereka.

Salah satu fitur utama dari plugin Capacitor Purchases adalah integrasinya dengan RevenueCat, sebuah platform yang menyediakan alat untuk langganan dalam aplikasi dan pembelian dalam aplikasi. RevenueCat menyederhanakan proses implementasi langganan dan pembelian dalam aplikasi dengan menyediakan API yang sederhana dan konsisten di berbagai platform, serta mengotomatiskan tugas seperti validasi tanda terima dan manajemen pengguna.

Dengan RevenueCat, pengembang dapat dengan mudah mengelola langganan, melacak pendapatan, dan melakukan tugas terkait lainnya. Beberapa fitur yang ditawarkan oleh RevenueCat termasuk:

- Validasi tanda terima otomatis
- Manajemen pengguna
- Dukungan untuk model harga kustom
- Analisis terperinci
- Skalabilitas

Dengan menggunakan plugin Capacitor Purchases bersama RevenueCat, pengembang dapat menghemat waktu dan usaha saat mengimplementasikan langganan dan pembelian dalam aplikasi di aplikasi mobile mereka, serta menyediakan fitur tambahan yang dapat membantu meningkatkan pengalaman pengguna dan meningkatkan pendapatan.

Menggunakan plugin Capacitor Purchases dan RevenueCat, pengembang dapat dengan mudah mengelola dan melacak langganan dan pembelian dalam aplikasi, memvalidasi tanda terima, dan mengelola pengguna di berbagai platform. Ini juga memungkinkan pembuatan model harga kustom dan mendapatkan analisis terperinci untuk meningkatkan kinerja dan pendapatan.


## Instalasi

Pastikan untuk menggunakan versi terbaru dari Capacitor dan plugin Capacitor Purchases. Anda dapat memeriksa versi terbaru dari Capacitor dan plugin Capacitor Purchases di situs web Capacitor.

Untuk menginstal plugin Capacitor Purchases, jalankan perintah berikut:
`npm i @capgo/capacitor-purchases`
tambahkan plugin ke kode native aplikasi anda
`npx cap sync`


tambahkan kemampuan pembelian dalam aplikasi di Xcode:

![Xcode step 1](/iap_step1.webp)
kemudian
![xcode step 2](/iap_step2.webp)

## 1. Buat Akun RevenueCat
Panduan ini akan memandu Anda tentang cara memulai dengan langganan dan SDK RevenueCat hanya dengan beberapa baris kode.

Daftar untuk membuat akun RevenueCat baru [di sini](https://app.revenuecat.com/).

> ### 📘
> 
> 💡 Berikut adalah tip!
> 
> RevenueCat merekomendasikan untuk membuat akun RevenueCat terpisah untuk setiap aplikasi / proyek yang Anda miliki, terutama jika Anda berniat untuk menjual aplikasi tersebut. Ini akan mempercepat proses transfer, karena Anda dapat mentransfer seluruh akun daripada menunggu dukungan RevenueCat untuk mentransfer proyek individu.


### Organisasi / Perusahaan

Kami merekomendasikan untuk menggunakan akun perusahaan saat mendaftar untuk RevenueCat dan mengatur aplikasi Anda dalam suatu proyek. Anda akan dapat mengundang anggota tim lainnya sebagai [kolaborator](https://www.revenuecat.com/docs/collaborators/) ke proyek Anda, tetapi **hanya pemilik proyek yang dapat mengelola penagihan**. Kolaborator proyek tidak dapat mengelola rincian penagihan.

## 2. Konfigurasi Proyek dan Aplikasi


### ▶️ Buat Proyek

Navigasikan ke dasbor RevenueCat dan [tambahkan proyek baru](https://app.revenuecat.com/overview/) dari dropdown di menu navigasi bagian atas yang disebut _Proyek_.

![RevenueCat step 1](/revenuecat_step1.webp)

Modal popup untuk membuat Proyek baru

### ▶️ Tambahkan Aplikasi / Platform

Dari **Pengaturan Proyek > Aplikasi** di menu kiri dasbor proyek, pilih platform untuk aplikasi yang akan Anda tambahkan.

![RevenueCat step 2](/revenuecat_step2.webp)

Dasbor proyek untuk memilih platform aplikasi

Bidang **Nama aplikasi** adalah wajib untuk menambahkan aplikasi Anda ke RevenueCat. Rincian konfigurasi lainnya dapat ditambahkan nanti. Untuk melakukan pembelian uji dan produksi, ID Paket (iOS) / Nama Paket (Android) serta Kunci Rahasia Bersama (iOS) / Kredensial Layanan (Android) harus dikonfigurasi.

![RevenueCat step 3](/revenuecat_step3.webp)

Halaman konfigurasi aplikasi untuk aplikasi Apple App Store

> ### 📘
> 
> 💡 Berikut adalah tip!
> 
> Setelah mendaftarkan aplikasi Anda, RevenueCat merekomendasikan untuk mengatur [Pemberitahuan Server Platform](https://www.revenuecat.com/docs/server-notifications/). Pemberitahuan ini tidak wajib, tetapi akan mempercepat waktu pengiriman [webhooks](https://www.revenuecat.com/docs/webhooks/) dan integrasi serta mengurangi waktu keterlambatan dalam memperbarui pelanggan Anda.

> ### 📘
> 
> Aplikasi dan pengguna Staging vs. Produksi
> 
> RevenueCat itu sendiri tidak memiliki lingkungan terpisah untuk staging dan produksi. Sebaliknya, transaksi mendasar untuk pengguna dibedakan oleh sandbox dan produksi.
> 
> Setiap aplikasi RevenueCat dapat melakukan pembelian sandbox dan produksi dari toko. Jika Anda memiliki aplikasi terpisah untuk staging dan produksi, Anda dapat membuat beberapa proyek di RevenueCat untuk mencerminkan pengaturan Anda.
> 
> Selain itu, pengguna juga tidak dipisahkan berdasarkan lingkungan. Pengguna yang sama dapat memiliki pembelian sandbox aktif dan pembelian produksi aktif pada saat yang sama.


### ▶️ Kredensial Layanan

Kredensial layanan perlu diatur agar RevenueCat dapat berkomunikasi dengan toko aplikasi atas nama Anda. Lihat panduan RevenueCat tentang [Kunci Rahasia Bersama App Store Connect](https://www.revenuecat.com/docs/itunesconnect-app-specific-shared-secret/), [Kredensial Layanan Play](https://www.revenuecat.com/docs/creating-play-service-credentials/), dan [Kunci Rahasia Amazon Appstore](https://www.revenuecat.com/docs/service-credentials/amazon-appstore-credentials/) untuk informasi lebih lanjut.

Perhatikan bahwa kredensial layanan play dapat memakan waktu hingga 36 jam untuk menyebar ke seluruh server Google.

## 3. Konfigurasi Produk

### ▶️ Pengaturan Toko

Sebelum Anda dapat mulai menggunakan RevenueCat untuk mengambil produk, Anda harus mengkonfigurasi produk Anda di toko terkait. Lihat panduan berikut untuk [App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), dan [Stripe](https://www.revenuecat.com/docs/stripe-products/) untuk membantu menavigasi melalui proses ini.

Jika Anda menjual produk iOS, pastikan untuk menandatangani 'Perjanjian Aplikasi Berbayar' dan mengisi informasi bank dan pajak Anda di **App Store Connect > Perjanjian, Pajak, dan Perbankan**. **Ini harus diselesaikan sebelum Anda dapat menguji pembelian apa pun**.

> ### 📘
> 
> Ingin melewati pengaturan toko saat pengujian?
> 
> Di iOS, Anda dapat menunda konfigurasi produk di App Store Connect dengan menguji menggunakan file Konfigurasi StoreKit sebagai gantinya. File konfigurasi ini memerlukan pengaturan minimal dan bisa dikonfigurasi langsung melalui Xcode.
> 
> Baca lebih lanjut tentang pengaturan file Konfigurasi StoreKit di panduan RevenueCat [Pengujian Sandbox](https://www.revenuecat.com/docs/apple-app-store/#ios-14-only-testing-on-the-simulator).

### ▶️ Konfigurasi Produk dan Hak Akses di RevenueCat

Setelah produk dalam aplikasi Anda telah dikonfigurasi di [App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), atau [Stripe](https://www.revenuecat.com/docs/stripe-products/), Anda perlu menyalin konfigurasi tersebut ke dasbor RevenueCat. RevenueCat menggunakan sistem Hak Akses untuk mengontrol akses ke fitur premium, dan Penawaran untuk mengelola set produk yang Anda tawarkan kepada pelanggan.

Hak Akses adalah tingkat akses yang “berhak” diterima oleh pelanggan setelah membeli produk tertentu. Penawaran adalah cara sederhana bagi Anda untuk mengorganisir produk dalam aplikasi yang ingin Anda “tawarkan” di dinding pembayaran Anda dan mengkonfigurasinya dari jarak jauh. RevenueCat **merekomendasikan** memanfaatkan fitur ini untuk menyederhanakan kode Anda dan memungkinkan Anda mengubah produk tanpa merilis pembaruan aplikasi.

Lihat [Mengonfigurasi Produk](https://www.revenuecat.com/docs/entitlements/) untuk mengatur produk Anda dan kemudian mengorganisasikannya ke dalam Penawaran atau Hak Akses.

![RevenueCat step 4](/revenuecat_step4.webp)

## 4. Menggunakan SDK Pembelian RevenueCat

SDK RevenueCat dengan mulus mengimplementasikan pembelian dan langganan di berbagai platform sambil menyinkronkan token dengan server RevenueCat.

Jika Anda mengalami masalah dengan SDK, lihat [Memecahkan Masalah SDK](https://www.revenuecat.com/docs/troubleshooting-the-sdks/) untuk panduan.

> ### 📘
> 
> Hanya gunakan kunci SDK publik Anda untuk mengonfigurasi Pembelian
> 
> Anda dapat mengambil kunci SDK publik Anda dari tab **Kunci API** di bawah **Pengaturan Proyek** di dasbor.

Anda sebaiknya hanya mengonfigurasi instance bersama dari _Pembelian_ sekali, biasanya saat peluncuran aplikasi. Selanjutnya, instance yang sama dibagikan di seluruh aplikasi Anda dengan mengakses instance `.shared` di SDK.

Lihat panduan RevenueCat tentang [Mengonfigurasi SDK](https://docs.revenuecat.com/docs/configuring-sdk/) untuk informasi lebih lanjut dan praktik terbaik.

Pastikan Anda mengonfigurasi _Pembelian_ dengan kunci SDK publik Anda saja. Anda dapat membaca lebih lanjut tentang berbagai kunci API yang tersedia di RevenueCat [Panduan Autentikasi](https://www.revenuecat.com/docs/authentication/).


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

Saat dalam pengembangan, RevenueCat merekomendasikan untuk mengaktifkan log debug yang lebih mendetail. Untuk informasi lebih lanjut tentang log ini, lihat panduan [Debugging](https://www.revenuecat.com/docs/debugging/) mereka.

Jika Anda berencana untuk menggunakan RevenueCat bersama dengan kode pembelian yang sudah ada, lihat panduan mereka tentang [Mode Pengamat](https://www.revenuecat.com/docs/observer-mode/).


> ### 📘
> 
> Mengonfigurasi Pembelian dengan ID Pengguna
> 
> Jika Anda memiliki sistem otentikasi pengguna dalam aplikasi Anda, Anda dapat memberikan pengidentifikasi pengguna saat konfigurasi atau pada waktu lain dengan panggilan ke `.logIn()`. Untuk mempelajari lebih lanjut, lihat panduan RevenueCat tentang [Mengidentifikasi Pengguna](https://www.revenuecat.com/docs/user-ids/).

SDK akan secara otomatis mengambil [Penawaran yang dikonfigurasi](https://www.revenuecat.com/docs/entitlements/#offerings) dan mengambil informasi produk dari Apple, Google, atau Amazon. Dengan demikian, produk yang tersedia sudah akan dimuat ketika pelanggan membuka layar pembelian Anda.

Berikut adalah contoh pengambilan Penawaran. Anda dapat memanfaatkan Penawaran untuk mengatur layar paywall Anda. Lihat panduan RevenueCat tentang [Menampilkan Produk](https://www.revenuecat.com/docs/displaying-products/) untuk informasi lebih lanjut dan praktik terbaik.

### ▶️ Ambil dan Tampilkan Produk yang Tersedia

> ### 📘
> 
> Mengonfigurasi Pembelian dengan ID Pengguna
> 
> Jika Anda memiliki sistem otentikasi pengguna di aplikasi Anda, Anda dapat memberikan pengidentifikasi pengguna pada saat konfigurasi atau di kemudian hari dengan panggilan ke `.logIn()`. Untuk mempelajari lebih lanjut, lihat panduan RevenueCat tentang [Mengidentifikasi Pengguna](https://www.revenuecat.com/docs/user-ids/).

SDK akan secara otomatis mengambil [Penawaran yang dikonfigurasi](https://www.revenuecat.com/docs/entitlements/#offerings) dan mengambil informasi produk dari Apple, Google, atau Amazon. Dengan demikian, produk yang tersedia sudah akan dimuat ketika pelanggan membuka layar pembelian Anda.

Berikut adalah contoh pengambilan Penawaran. Anda dapat memanfaatkan Penawaran untuk mengatur layar paywall Anda. Lihat panduan RevenueCat tentang [Menampilkan Produk](https://www.revenuecat.com/docs/displaying-products/) untuk informasi lebih lanjut dan praktik terbaik.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Jika pengambilan [Penawaran](https://www.revenuecat.com/docs/entitlements/#offerings), [produk](https://www.revenuecat.com/docs/entitlements/#products), atau [paket](https://www.revenuecat.com/docs/entitlements/#adding-packages) yang tersedia kosong, ini disebabkan oleh masalah konfigurasi di toko yang bersangkutan.

Alasan paling umum untuk ini di App Store Connect adalah 'Perjanjian Aplikasi Berbayar' yang sudah usang atau produk tidak berada dalam status 'Siap Untuk Dikirim' setidaknya. Di Google Play ini biasanya terjadi ketika aplikasi tidak dipublikasikan di jalur tertutup dan pengguna uji yang valid ditambahkan.

Anda dapat menemukan lebih banyak informasi tentang pemecahan masalah ini di [Pusat Bantuan](https://support.revenuecat.com/hc/en-us/articles/360041793174/).

### ▶️ Lakukan Pembelian

SDK mencakup metode sederhana untuk memfasilitasi pembelian. `purchase:package` mengambil paket dari Penawaran yang diambil dan memproses transaksi dengan toko aplikasi yang bersangkutan.

Contoh kode di bawah menunjukkan proses pembelian paket dan memastikannya membuka konten "your_entitlement_id". Detail lebih lanjut tentang metode `purchase:package` dapat ditemukan di panduan RevenueCat tentang [Melakukan Pembelian](https://www.revenuecat.com/docs/making-purchases/).

```typescript
const purchase = async (p: Package): Promise<PurchaserInfo | null> => {
  try {
    // console.log('purchase', p)
    const data = await CapacitorPurchases.purchasePackage({
      identifier: p.identifier,
      offeringIdentifier: p.offeringIdentifier,
    })
    const purchaserInfo = data.purchaserInfo
    // console.log('listenBuy', purchaserInfo)
    if (purchaserInfo.activeSubscriptions.includes(p.identifier)) {
      // set the user as paid
    }
    return purchaserInfo
  }
  catch (e) {
    console.error('listenBuy error', e)
  }
  return null
}
```

### ▶️ Periksa Status Langganan

Anda dapat menggunakan metode ini kapan saja Anda perlu mendapatkan status terbaru, dan aman untuk memanggil ini berulang kali sepanjang siklus hidup aplikasi Anda. _Pembelian_ secara otomatis menyimpan cache `CustomerInfo` terbaru setiap kali memperbarui — jadi dalam banyak kasus, metode ini menarik dari cache dan berjalan sangat cepat.

Ini adalah hal yang biasa untuk memanggil metode ini saat memutuskan UI mana yang akan ditampilkan kepada pengguna, dan setiap kali pengguna melakukan tindakan yang memerlukan tingkat hak tertentu.

> ### 📘
> 
> 💡 Berikut adalah tip!
> 
> Anda dapat mengakses lebih banyak informasi tentang langganan daripada sekadar apakah langganan itu aktif atau tidak. Lihat panduan RevenueCat tentang [Status Langganan](https://www.revenuecat.com/docs/customer-info/) untuk mengetahui apakah langganan diatur untuk diperbarui, jika ada masalah terdeteksi dengan kartu kredit pengguna, dan lainnya.

RevenueCat memungkinkan pengguna Anda untuk mengembalikan pembelian dalam aplikasi mereka, mengaktifkan kembali konten apa pun yang sebelumnya mereka beli dari **akun toko yang sama** (akun Apple, Google, atau Amazon). Kami merekomendasikan agar semua aplikasi memiliki cara bagi pengguna untuk memicu metode pemulihan. Perlu dicatat bahwa Apple memang memerlukan mekanisme pemulihan jika pengguna kehilangan akses ke pembelian mereka (misalnya: menghapus/menginstal ulang aplikasi, kehilangan informasi akun mereka, dll).

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

Jika dua [ID Pengguna Aplikasi](https://www.revenuecat.com/docs/user-ids/) yang berbeda mengembalikan transaksi dari akun toko yang sama yang mendasarinya (akun Apple, Google, atau Amazon).
RevenueCat dapat mencoba untuk membuat alias antara dua ID Pengguna Aplikasi dan menghitungnya sebagai pengguna yang sama di masa mendatang. Lihat panduan RevenueCat tentang [Mengembalikan Pembelian](https://www.revenuecat.com/docs/restoring-purchases/) untuk informasi lebih lanjut tentang berbagai perilaku pemulihan yang dapat dikonfigurasi.

Karena SDK bekerja dengan mulus di platform mana pun, perubahan pada informasi pembelian pengguna dapat berasal dari berbagai sumber. Anda dapat merespons setiap perubahan dalam `CustomerInfo` pelanggan dengan mematuhi metode delegasi opsional, `purchases:receivedUpdated:`.

Metode ini akan dipicu setiap kali SDK menerima objek `CustomerInfo` yang diperbarui dari panggilan ke `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)`, atau `restorePurchases()`.

Pembaruan CustomerInfo _tidak_ dipush ke aplikasi Anda dari backend RevenueCat, pembaruan hanya dapat terjadi dari permintaan jaringan keluar ke RevenueCat, seperti yang disebutkan di atas.

Tergantung pada aplikasi Anda, mungkin cukup untuk mengabaikan delegasi dan hanya menangani perubahan informasi pelanggan pada saat aplikasi Anda diluncurkan atau di dalam blok penyelesaian dari metode SDK.

```javascript
CapacitorPurchases.addListener('purchasesUpdate', (data) => {
  console.log('purchasesUpdate', data)
})
```

> ### 👍
> 
> Anda melakukannya!
> 
> Anda sekarang telah menerapkan sistem pembelian langganan yang sepenuhnya fitur tanpa menghabiskan waktu sebulan untuk menulis kode server. Selamat!

### Aplikasi Contoh

Untuk mengunduh contoh yang lebih lengkap dari integrasi SDK, kunjungi sumber daya aplikasi contoh RevenueCat.

**[Lihat Contoh](https://www.revenuecat.com/docs/sample-apps/)**

Saya akan segera menerbitkan aplikasi contoh menggunakan Capacitor dan Vue.js.

Jika Anda perlu menggunakan SDK Capacitor secara mendalam, lihat dokumentasi [di sini](https://github.com/Cap-go/capacitor-purchases/).

### Langkah Selanjutnya
\
-   Jika Anda belum melakukannya, pastikan produk Anda dikonfigurasi dengan benar dengan memeriksa panduan RevenueCat tentang [hak](https://www.revenuecat.com/docs/entitlements/).
-   Jika Anda ingin menggunakan pengidentifikasi pengguna Anda sendiri, baca tentang [mengatur ID pengguna aplikasi](https://www.revenuecat.com/docs/user-ids/).
-   Jika Anda beralih ke RevenueCat dari sistem lain, lihat panduan RevenueCat tentang [memigrasikan langganan yang sudah ada](https://www.revenuecat.com/docs/migrating-existing-subscriptions/).
-   Setelah Anda siap untuk menguji integrasi Anda, Anda dapat mengikuti panduan RevenueCat tentang [pengujian dan pemecahan masalah](https://www.revenuecat.com/docs/debugging/).
-   Jika Anda memenuhi syarat untuk Program Bisnis Kecil App Store, lihat panduan RevenueCat tentang [cara mendaftar dan memberi tahu RevenueCat](https://www.revenuecat.com/docs/app-store-small-business-program/).

Jika Anda membutuhkan pembaruan langsung di aplikasi Anda 

Bergabunglah di sini 👇

## Daftar di sini untuk mendapatkan akun Anda

[Capgo](/register/)
