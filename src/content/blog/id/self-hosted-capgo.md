---
slug: id__self-hosted-capgo
title: Capgo yang dihosting sendiri
description: >-
  Menghosting sendiri Capgo memungkinkan Anda untuk mendistribusikan pembaruan
  langsung Capacitor kepada pengguna Anda tanpa perlu menggunakan layanan cloud
  Capgo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: Capgo yang dihosting sendiri
tag: Solution
published: true
locale: id
next_blog: ''
---

Artikel ini memberikan panduan langkah demi langkah tentang cara meng-host sendiri Capgo, serta pembahasan manfaat dan tantangan hosting mandiri

# Pendahuluan

Hosting Mandiri adalah bentuk menjalankan situs web atau aplikasi sendiri dengan menyiapkan server dan jaringan sendiri. Alih-alih menggunakan Platform as a Service atau Penyedia Cloud Publik, mereka yang memilih untuk hosting mandiri akan menjalankan jaringan mereka sendiri dan bertanggung jawab atas pemeliharaan dan ketersediaan selain membangun situs web atau aplikasi mereka

Cara termudah untuk memulai dengan Capgo adalah dengan [layanan terkelola resmi kami di cloud](https://capgo.app/), tetapi jika Anda ingin mengelola sendiri, Anda juga dapat meng-host sendiri Capgo di server Anda

## Apa itu hosting mandiri?

Hosting mandiri, dalam konteks dunia digital, mengacu pada praktik menjalankan server sendiri atau infrastruktur hosting untuk mengelola dan mengontrol kehadiran dan layanan online Anda. Alih-alih mengandalkan penyedia hosting pihak ketiga, individu dan organisasi memilih untuk menyiapkan dan mengelola server, situs web, aplikasi, dan penyimpanan data mereka sendiri sesuai ketentuan mereka

## Mengapa Anda memilih hosting mandiri?

Ada banyak alasan mengapa orang memilih untuk hosting mandiri. Beberapa manfaat yang paling umum meliputi:

* **Privasi dan kontrol:** Hosting mandiri memberi Anda kendali penuh atas data dan privasi Anda. Anda tidak perlu khawatir tentang penyedia pihak ketiga yang melacak aktivitas Anda atau menjual data Anda

* **Penghematan biaya:** Hosting mandiri bisa lebih hemat biaya dalam jangka panjang, terutama jika Anda menggunakan banyak sumber daya atau menjalankan beberapa layanan

* **Kustomisasi:** Hosting mandiri memberi Anda fleksibilitas untuk menyesuaikan aplikasi dan layanan Anda agar memenuhi kebutuhan spesifik Anda

* **Pembelajaran dan eksperimen:** Hosting mandiri bisa menjadi cara yang bagus untuk mempelajari tentang Linux, administrasi sistem, dan topik teknis lainnya. Ini juga bisa menjadi cara yang menyenangkan untuk bereksperimen dengan perangkat lunak dan layanan baru

* **Kemandirian:** Hosting mandiri mengurangi ketergantungan Anda pada penyedia eksternal. Anda tidak terikat pada ketentuan layanan, perubahan harga, atau potensi gangguan layanan mereka. Kemandirian ini bisa sangat penting bagi bisnis dan individu yang mengandalkan kehadiran online mereka untuk fungsi-fungsi kritis

## Apa perbedaan antara Capgo Cloud dan Capgo Self-Hosted?

Hanya ada satu versi Capgo. Baik produk Cloud maupun Self-Hosted saya benar-benar setara. Tidak ada versi premium dan komersial eksklusif dengan fitur yang lebih baik atau lebih lengkap

Anda mendapatkan dashboard yang sama, metrik yang dapat ditindaklanjuti yang sama dan komitmen yang sama untuk [menghormati privasi pengunjung Anda](https://capgo.app/privacy/) dengan keduanya

Saya mulai mengembangkan Capgo pada Desember 2018, dan saya meluncurkan bisnis langganan SaaS pada Mei 2019. Proyek ini sangat hidup, aktif dikembangkan dan berkembang pesat. Ini juga kuat dan teruji pertempuran

Berikut adalah perbedaan antara Capgo Cloud dan Capgo Self-Hosted:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **Hosting** | Mudah dan nyaman. Hanya butuh 2 menit untuk mulai mengirim pembaruan pertama Anda, ketersediaan tinggi, cadangan, keamanan, dan pemeliharaan semuanya dilakukan untuk Anda oleh saya. Saya mengelola semuanya untuk Anda sehingga Anda tidak perlu khawatir tentang apa pun | Anda melakukan semuanya sendiri. Anda perlu mendapatkan server, dan Anda perlu mengelola infrastruktur Anda. Anda bertanggung jawab atas instalasi, pemeliharaan, peningkatan, kapasitas server, waktu aktif, cadangan, keamanan, stabilitas, konsistensi, waktu pemuatan dan sebagainya |
| **Penyimpanan** | Semua data pengunjung diproses secara eksklusif pada infrastruktur cloud milik UE. Saya menyimpan data situs Anda di server yang aman, terenkripsi di Jerman. Ini memastikan bahwa data situs Anda dilindungi oleh undang-undang privasi data Uni Eropa yang ketat dan memastikan kepatuhan terhadap GDPR. Data situs web Anda tidak pernah meninggalkan UE | Anda memiliki kendali penuh dan dapat meng-host Capgo Anda di server mana pun di negara mana pun yang Anda inginkan. Host di server di ruang bawah tanah Anda atau host dengan penyedia cloud mana pun di mana pun Anda mau, bahkan yang tidak mematuhi GDPR| **Data mentah** | Anda melihat semua statistik dan metrik situs Anda di dashboard saya yang terlihat modern, mudah digunakan, dan cepat dimuat. Anda hanya dapat melihat statistik yang diagregasi di dashboard | Apakah Anda seorang analis dan ingin akses ke data mentah? Menghosting Capgo sendiri memberi Anda opsi tersebut. Ambil data langsung dari database dan impor ke alat analisis data pilihan Anda |
| **Biaya** | Ada biaya terkait dengan penyediaan layanan pembaruan, jadi saya membebankan biaya berlangganan | Anda hanya perlu membayar server Anda dan biaya apa pun yang terkait dengan menjalankan server. Anda tidak pernah harus membayar biaya apa pun kepada saya, hanya kepada penyedia cloud Anda |
| **Dukungan Premium** | Dukungan nyata yang diberikan oleh manusia asli yang membangun dan memelihara Capgo | Dukungan premium tidak termasuk. Rilis yang dihosting sendiri hanya didukung oleh komunitas |
| **Rilis** | Terus dikembangkan dan ditingkatkan dengan fitur baru dan pembaruan beberapa kali per minggu | Ini adalah rilis jangka panjang yang diterbitkan dua kali setahun, jadi fitur terbaru tidak akan langsung tersedia karena mereka diuji terlebih dahulu di cloud |

# Menggunakan CLI dengan capgo yang dihosting sendiri
Untuk menggunakan CLI dengan capgo yang dihosting sendiri, edit capacitor.config.ts dari direktori aplikasi Anda dan atur seperti ini:

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

# Menggunakan pembaruan capacitor dengan capgo yang dihosting sendiri

**Persyaratan**

Clone [capgo](https://github.com/Cap-go/capgo/)

Untuk menggunakan pembaruan capacitor dengan capgo yang dihosting sendiri, edit `capacitor.config.ts` dari direktori aplikasi Anda dan atur seperti ini:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "http://localhost:54321/functions/v1/stats",
      channelUrl: "http://localhost:54321/functions/v1/channel_self",
      updateUrl: "http://localhost:54321/functions/v1/updates"
    },
  },
};
```

Ini akan memungkinkan Anda menggunakan capgo lokal dalam pengembangan. Namun, secara default, ini tidak cukup.

# Kesimpulan

Sebagai kesimpulan, menghosting sendiri Capgo bisa menjadi pilihan yang baik bagi organisasi yang memiliki sumber daya dan keahlian untuk melakukannya. Ini menawarkan sejumlah manfaat, termasuk kontrol atas proses pembaruan, keamanan, dan kepatuhan. Namun, penting untuk mempertimbangkan dengan cermat manfaat dan tantangannya sebelum memutuskan untuk menghosting sendiri.

Jika Anda mempertimbangkan untuk menghosting sendiri Capgo, saya sarankan Anda mulai dengan membaca [dokumentasi self-hosting Capgo](https://capgo.app/docs/self-hosted/getting-started/). Ini akan memberi Anda pemahaman yang baik tentang persyaratan dan risiko self-hosting.