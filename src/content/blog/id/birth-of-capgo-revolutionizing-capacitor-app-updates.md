---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Bagaimana Sebuah Issue GitHub Berevolusi Menjadi Bisnis
description: >-
  Temukan berbagai tantangan dan pencapaian dalam menciptakan Capgo, sebuah
  sistem pembaruan langsung yang inovatif untuk aplikasi Capacitor, yang lahir
  dari kebutuhan dan dibentuk oleh masukan komunitas.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Representasi visual dari evolusi Capgo dari ide menjadi produk
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: id
next_blog: ''
---
## Awal Mula: Permintaan Komunitas

Awal mula Capgo sebenarnya sudah ada jauh sebelum saya memulai perjalanan sebagai pembuat tunggal. Pada 8 Juli 2020, seorang anggota komunitas bernama alexcroox mengajukan permintaan plugin yang akhirnya menjadi cetak biru untuk Capgo.

![Initial plugin request](/capgo-initial-request.webp)

Permintaan ini menguraikan kebutuhan akan plugin "Capacitor Hot Code Push" dengan poin-poin utama berikut:

1. **Platform**: Dukungan untuk Android dan iOS.
2. **Solusi yang Ada**: Ini menyoroti keterbatasan opsi saat ini seperti MS Code Push (yang tidak memiliki dukungan Capacitor) dan App Flow (yang mahal dan tidak fleksibel).
3. **Deskripsi**: Kemampuan untuk memperbarui js/css/html aplikasi secara real-time tanpa melalui proses review app store.
4. **Fitur Utama**:
   - Memfasilitasi pembaruan melalui udara dari server/endpoint pilihan pengembang.
   - Mengunduh file zip dari folder dist yang diperbarui, mengekstraknya, dan memberi tahu Capacitor untuk meluncur dari direktori baru ini.
   - Fitur tambahan seperti verifikasi pembaruan, waktu instalasi, dan pengunduhan pembaruan secara selektif.

Permintaan yang komprehensif ini mendapat dukungan komunitas yang signifikan, dengan 65 suka dan 25 reaksi hati. Ini jelas menunjukkan permintaan yang kuat untuk solusi seperti itu dalam ekosistem Capacitor.

Ketika saya menemukan permintaan ini lebih dari setahun kemudian, hal ini sangat sesuai dengan tantangan yang saya hadapi dalam proyek saya sendiri. Ini berfungsi sebagai validasi kebutuhan akan alat seperti itu dan peta jalan untuk apa yang akan menjadi Capgo.

Antusiasme komunitas untuk plugin yang diusulkan ini, dikombinasikan dengan pengalaman pribadi saya, menjadi kekuatan pendorong di balik pengembangan Capgo. Ini adalah contoh sempurna bagaimana komunitas open-source dapat mengidentifikasi kebutuhan dan menginspirasi solusi, bahkan jika timeline dari ide hingga implementasi mencapai lebih dari setahun.

## Babak Baru Dimulai

Sebelum mendalami kisah Capgo, penting untuk memahami latar belakangnya. Pada 2021, saya membuat keputusan yang mengubah hidup untuk mengundurkan diri dari posisi CTO Cashstory dan menjual saham saya. Ini menandai awal perjalanan saya sebagai pembuat tunggal, sebuah jalur yang penuh ketidakpastian tetapi juga peluang tak terbatas.

![Lisbon digital nomad life](/capgo-lisbon-nomad.webp)

Dengan tabungan sebagai jaring pengaman, saya memulai petualangan baru. Saya hidup sebagai digital nomad di Lisbon, Portugal, merangkul scene teknologi dan budaya kota yang dinamis sambil fokus pada proyek-proyek yang saya sukai. Fokus utama saya adalah Captime, sebuah timer crossfit mobile app. Tanpa saya sadari bahwa proyek ini akan membuat saya menciptakan sesuatu yang jauh lebih besar.

Energi dari ekosistem startup Lisbon dan kebebasan gaya hidup digital nomad memberikan latar belakang yang sempurna untuk inovasi. Di lingkungan inilah, dikelilingi oleh sesama pengusaha dan pengembang dari seluruh dunia, benih-benih Capgo ditaburkan.

## Percikan Sebuah Ide

Saat mengerjakan Captime, saya menghadapi kendala signifikan - kurangnya solusi pembaruan yang terjangkau dan fleksibel untuk aplikasi Capacitor. Pada Oktober 2021, saya menyuarakan kekhawatiran ini di thread GitHub.

![Initial proposal for Capgo](/capgo-initial-proposal.webp)

Poin-poin masalah utama yang saya identifikasi adalah:

1. Biaya tinggi untuk pengembang skala kecil
2. Kurangnya pembaruan over-the-air (OTA) dalam paket terjangkau
3. Fitur yang tidak diperlukan untuk pengembang tunggal

## Komunitas Merespon

Kekhawatiran saya mendapat sambutan dari pengembang lain. Banyak yang menggemakan sentimen bahwa solusi yang ada terlalu mahal untuk pengembang indie dan tim kecil.

![Community feedback](/capgo-community-feedback.webp)

Seorang pengembang merangkum perasaan komunitas:

"Akan sangat bagus jika Community plan termasuk 500 pembaruan langsung. Atau lebih baik lagi, jika ada paket Pembaruan Langsung saja seharga $50/bulan yang mencakup 5.000 Pembaruan Langsung."

## Lahirnya Sebuah Solusi

Termotivasi oleh respons komunitas, saya memutuskan untuk mengambil tindakan sendiri. Pada 24 Oktober 2021, saya mengumumkan rencana untuk membangun modul yang akan memungkinkan pengembang mengunduh pembaruan dari URL tertentu.

![Initial code snippet](/capgo-initial-code.webp)

Tujuan awalnya sederhana:
- Mengunduh data dari URL
- Membuka zip data
- Mengganti kode saat ini dengan yang baru

Namun, mengubah ide sederhana ini menjadi kenyataan ternyata jauh lebih menantang dari yang saya duga awalnya.

## Perjuangan di Balik Layar

Yang tidak terlihat dari thread GitHub adalah kompleksitas tugas yang saya ambil. Kode yang diperlukan untuk mengimplementasikan fungsionalitas ini rumit dan sulit dipahami. Saya harus bergulat dengan detail rumit tentang bagaimana aplikasi Capacitor menangani pembaruan dan sistem file.

Banyak malam dihabiskan di van saya, mempelajari dokumentasi dan bereksperimen dengan pendekatan berbeda. Kemajuan berjalan lambat, dan ada saat-saat di mana saya mempertanyakan apakah saya telah mengambil tugas yang terlalu besar.

## Komunitas Datang Membantu

Untungnya, saya tidak sendirian dalam perjalanan ini. Komunitas pengembang, khususnya di Discord, terbukti menjadi sumber daya yang sangat berharga. Sesama pengembang menawarkan wawasan mereka, membantu debug masalah, dan memberikan dorongan semangat saat situasi sulit.

![Discord community support](/capgo-discord-support.webp)

Upaya kolaboratif ini sangat penting dalam mengatasi hambatan teknis. Ini memperkuat keyakinan saya akan kekuatan open source dan pengembangan yang digerakkan oleh komunitas.

## Pengembangan Cepat dan Peningkatan Kemampuan

Dengan bantuan komunitas, pengembangan mulai dipercepat. Pada 22 November 2021, saya memiliki versi yang berfungsi untuk iOS dan sedang meningkatkan pengalaman pengembang.

![Improved code snippet](/capgo-improved-code.webp)

Seiring perkembangan, saya menambahkan lebih banyak fitur:
- Dukungan Android
- Persistensi antara penghentian aplikasi
- Kemampuan untuk kembali ke versi aplikasi asli

![New features announcement](/capgo-new-features.webp)

Setiap fitur baru membawa tantangannya sendiri, tetapi juga rasa pencapaian karena proyek berkembang melampaui ruang lingkup awalnya.

## Peluncuran Capgo

Pada Maret 2022, proyek ini telah berkembang menjadi produk lengkap: Capgo. Saya mengumumkan rilis mode pembaruan otomatis, memungkinkan pengembang untuk terhubung ke backend mereka sendiri atau menggunakan layanan backend Capgo.

![Capgo launch announcement](/capgo-launch-announcement.webp)

Respons komunitas sangat positif, dengan pengembang memuji solusi yang sangat dibutuhkan ini.

## Beralih ke Produk Berbayar

Awalnya, saya tidak memiliki rencana untuk memonetisasi Capgo. Tujuan saya hanya membuat alat yang akan memecahkan masalah yang saya dan pengembang lain hadapi. Namun, umpan balik di GitHub membuat saya mempertimbangkan kembali sikap ini.

Para pengembang menyatakan kesediaan untuk membayar solusi yang memenuhi kebutuhan mereka dengan harga yang wajar. Umpan balik ini, dikombinasikan dengan kesadaran akan biaya berkelanjutan dan upaya yang diperlukan untuk memelihara dan meningkatkan Capgo, mengarah pada keputusan penting.

Pada 11 Juni 2022, saya mengumumkan bahwa Capgo akan mulai mengenakan biaya untuk penggunaan dalam 15 hari, menandai transisinya dari proyek komunitas menjadi bisnis yang berkelanjutan.

![Capgo pricing announcement](/capgo-pricing-announcement.webp)

Namun, tetap setia pada akar proyek, saya mempertahankan inti open-source Capgo dengan mengizinkan penggunaan gratis plugin dalam mode manual atau dengan server kustom.

## Kesimpulan

Perjalanan saya dengan Capgo adalah bukti kekuatan inovasi yang digerakkan komunitas dan jalur tak terduga yang sering ditemui pembuat tunggal. Yang awalnya bermula dari frustrasi pribadi saat mengerjakan aplikasi timer crossfit berkembang menjadi sistem pembaruan langsung yang kuat, terjangkau, dan fleksibel untuk aplikasi Capacitor.

Penciptaan Capgo sama sekali tidak mudah. Ini membutuhkan tak terhitung jam kerja, dukungan dari komunitas pengembang yang murah hati, dan kemauan untuk beralih berdasarkan umpan balik pengguna. Dari coding di Airbnb di Portugal hingga meluncurkan produk berbayar, setiap langkah perjalanan ini telah menjadi pengalaman pembelajaran.

Seiring Capgo terus berkembang, ini menjadi contoh utama bagaimana mengidentifikasi celah di pasar, secara aktif bekerja untuk mengisinya, dan responsif terhadap kebutuhan komunitas dapat mengarah pada penciptaan alat berharga yang menguntungkan seluruh ekosistem pengembang.

Kisah Capgo lebih dari sekadar pengembangan alat; ini adalah kisah ketekunan, komunitas, dan ketidakpastian yang menarik dari kehidupan sebagai pembuat tunggal.

Anda dapat menemukan cerita lengkapnya di [sini](https://github.com/capacitor-community/proposals/issues/43#issuecomment-941017142).
