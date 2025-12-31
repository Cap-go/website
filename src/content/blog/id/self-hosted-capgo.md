---
slug: self-hosted-capgo
title: Capgo yang Dihosting Sendiri
description: >-
  Auto-hosting Capgo memungkinkan Anda untuk menerapkan pembaruan langsung
  Capacitor kepada pengguna Anda tanpa harus menggunakan layanan cloud Capgo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: capgo self hosted
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: id
next_blog: ''
---
Artikel ini memberikan panduan langkah demi langkah tentang cara self-hosting Capgo, serta pembahasan manfaat dan tantangan melakukan self-hosting.

# Pendahuluan

Self Hosting adalah bentuk menjalankan website atau aplikasi Anda sendiri dengan mengatur server dan jaringan sendiri. Alih-alih menggunakan Platform as a Service atau Penyedia Cloud Publik, mereka yang memilih untuk melakukan self-host akan menjalankan jaringan mereka sendiri dan bertanggung jawab atas pemeliharaan dan uptime selain membangun website atau aplikasi mereka.

Cara termudah untuk memulai dengan Capgo adalah dengan [layanan terkelola resmi kami di cloud](https://capgo.app/), tetapi jika Anda ingin mengelola sendiri, Anda juga dapat melakukan self-host Capgo di server Anda.

## Apa itu self hosting?

Self-hosting, dalam konteks dunia digital, mengacu pada praktik menjalankan server sendiri atau infrastruktur hosting untuk mengelola dan mengontrol kehadiran dan layanan online Anda. Alih-alih mengandalkan penyedia hosting pihak ketiga, individu dan organisasi memilih untuk mengatur dan mengelola server, website, aplikasi, dan penyimpanan data mereka dengan ketentuan mereka sendiri.

## Mengapa memilih self-hosting?

Ada banyak alasan mengapa orang memilih self-hosting. Beberapa manfaat yang paling umum meliputi:

* **Privasi dan kontrol:** Self-hosting memberi Anda kendali penuh atas data dan privasi Anda. Anda tidak perlu khawatir tentang penyedia pihak ketiga yang melacak aktivitas Anda atau menjual data Anda.

* **Penghematan biaya:** Self-hosting bisa lebih hemat biaya dalam jangka panjang, terutama jika Anda menggunakan banyak sumber daya atau menjalankan beberapa layanan.

* **Kustomisasi:** Self-hosting memberi Anda fleksibilitas untuk menyesuaikan aplikasi dan layanan Anda sesuai kebutuhan spesifik Anda.

* **Pembelajaran dan eksperimen:** Self-hosting bisa menjadi cara yang bagus untuk belajar tentang Linux, administrasi sistem, dan topik teknis lainnya. Ini juga bisa menjadi cara yang menyenangkan untuk bereksperimen dengan software dan layanan baru.

* **Kemandirian:** Self-hosting mengurangi ketergantungan Anda pada penyedia eksternal. Anda tidak terikat pada ketentuan layanan mereka, perubahan harga, atau potensi gangguan layanan. Kemandirian ini bisa sangat penting bagi bisnis dan individu yang mengandalkan kehadiran online mereka untuk fungsi-fungsi kritis.

## Apa perbedaan antara Capgo Cloud dan Capgo Self-Hosted?

Hanya ada satu versi Capgo. Baik produk Cloud maupun Self-Hosted saya sepenuhnya sama. Tidak ada versi premium dan komersial eksklusif dengan fitur yang lebih baik atau lebih lengkap.

Anda mendapatkan dashboard yang sama, metrik yang dapat ditindaklanjuti yang sama dan komitmen yang sama untuk [menghormati privasi pengunjung Anda](https://capgo.app/privacy/) dengan keduanya.

Saya mulai mengembangkan Capgo pada Desember 2018, dan saya meluncurkan bisnis berlangganan SaaS pada Mei 2019. Proyek ini sangat hidup, aktif dikembangkan dan berkembang pesat. Ini juga kuat dan teruji.

Berikut perbedaan antara Capgo Cloud dan Capgo Self-Hosted:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **Hosting** | Mudah dan nyaman. Butuh 2 menit untuk mulai mengirim pembaruan pertama Anda, ketersediaan tinggi, backup, keamanan, dan pemeliharaan semuanya dilakukan untuk Anda oleh saya. Saya mengelola semuanya untuk Anda sehingga Anda tidak perlu khawatir tentang apa pun. | Anda melakukan semuanya sendiri. Anda perlu mendapatkan server, dan Anda perlu mengelola infrastruktur Anda. Anda bertanggung jawab atas instalasi, pemeliharaan, upgrade, kapasitas server, uptime, backup, keamanan, stabilitas, konsistensi, waktu loading dan sebagainya. |
| **Penyimpanan** | Semua data pengunjung secara eksklusif diproses pada infrastruktur cloud milik UE. Saya menyimpan data situs Anda di server yang aman dan terenkripsi di Jerman. Ini memastikan bahwa data situs Anda dilindungi oleh hukum privasi data Uni Eropa yang ketat dan memastikan kepatuhan dengan GDPR. Data website Anda tidak pernah meninggalkan UE. | Anda memiliki kendali penuh dan dapat meng-host Capgo Anda di server mana pun di negara mana pun yang Anda inginkan. Host di server di basement Anda atau host dengan penyedia cloud mana pun di mana pun Anda mau, bahkan yang tidak sesuai GDPR. |
| **Data mentah** | Anda melihat semua statistik dan metrik situs Anda di dashboard saya yang modern, mudah digunakan dan cepat dimuat. Anda hanya dapat melihat statistik yang diagregasi di dashboard. | Apakah Anda seorang analis dan ingin akses ke data mentah? Hosting Capgo sendiri memberi Anda opsi tersebut. Ambil data langsung dari database dan impor ke alat analisis data pilihan Anda. |
| **Biaya** | Ada biaya yang terkait dengan penyediaan layanan updater, jadi saya mengenakan biaya berlangganan. | Anda hanya perlu membayar server Anda dan biaya apa pun yang terkait dengan menjalankan server. Anda tidak pernah harus membayar biaya apa pun kepada saya, hanya kepada penyedia cloud Anda. |
| **Dukungan Premium** | Dukungan nyata yang diberikan oleh manusia nyata yang membangun dan memelihara Capgo. | Dukungan premium tidak termasuk. Rilis self-hosted hanya didukung komunitas. |
| **Rilis** | Terus dikembangkan dan ditingkatkan dengan fitur dan pembaruan baru beberapa kali per minggu. | Ini adalah rilis jangka panjang yang diterbitkan dua kali per tahun, jadi fitur terbaru tidak akan langsung tersedia karena mereka diuji terlebih dahulu di cloud. |

# Cara self-host Capgo

Kami terutama menggunakan Supabase di Capgo, untuk self host Anda hanya perlu mengikuti [dokumentasi self-hosting Supabase](https://supabase.com/docs/guides/self-hosting/docker).

# Menggunakan CLI dengan capgo self-hosted
Untuk menggunakan CLI dengan capgo self-hosted edit capacitor.config.ts dari direktori aplikasi Anda dan atur seperti ini:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      localHost: "http://localhost:5173",
      localWebHost: "http://localhost:5173",
      localSupa: "http://localhost:54321",
      localSupaAnon: "see_notes",
    },
  },
};
```

Catatan: Untuk mendapatkan localSupaAnon silakan ikuti [tutorial ini](https://capgo.app/docs/self-hosted/local-dev/getting-started/) dan salin kunci anon ke localSupaAnon

# Menggunakan capacitor updater dengan capgo self-hosted

**Persyaratan**

Mengkloning [capgo](https://github.com/Cap-go/capgo/)

Untuk menggunakan capacitor updater dengan capgo self-hosted edit `capacitor.config.ts` dari direktori aplikasi Anda dan atur seperti ini:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "https://localhost:54321/functions/v1/stats",
      channelUrl: "https://localhost:54321/functions/v1/channel_self",
      updateUrl: "https://localhost:54321/functions/v1/updates"
    },
  },
};
```

Ini akan memungkinkan Anda menggunakan capgo lokal dalam pengembangan. Namun, secara default, ini tidak cukup.

# Kesimpulan

Sebagai kesimpulan, self-hosting Capgo bisa menjadi pilihan yang baik untuk organisasi yang memiliki sumber daya dan keahlian untuk melakukannya. Ini menawarkan sejumlah manfaat, termasuk kontrol atas proses pembaruan, keamanan, dan kepatuhan. Namun, penting untuk mempertimbangkan dengan cermat manfaat dan tantangan sebelum memutuskan apakah akan melakukan self-host.

Jika Anda mempertimbangkan untuk melakukan self-hosting Capgo, saya sarankan Anda mulai dengan membaca [dokumentasi self-hosting](https://capgo.app/docs/self-hosted/getting-started/) Capgo. Ini akan memberi Anda pemahaman yang baik tentang persyaratan dan risiko self-hosting.
