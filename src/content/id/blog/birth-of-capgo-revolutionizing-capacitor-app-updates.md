---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Bagaimana sebuah GitHub issue berubah menjadi perusahaan
description: >-
  Temukan tantangan dan kesuksesan dalam pengembangan Capgo, sebuah sistem
  inovatif untuk pembaruan langsung aplikasi Capacitor, yang lahir dari
  kebutuhan dan dibentuk oleh umpan balik komunitas.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Representasi visual perkembangan Capgo dari ide menjadi produk
tag: development
published: true
locale: id
next_blog: ''
---

## Genesis: Permintaan Komunitas

Benih Capgo sebenarnya ditanam jauh sebelum saya memulai perjalanan sebagai pembuat tunggal. Pada 8 Juli 2020, seorang anggota komunitas bernama alexcroox mengajukan permintaan plugin yang akhirnya menjadi cetak biru untuk Capgo.

![Permintaan plugin awal](/capgo-initial-requestwebp)

Permintaan ini menguraikan kebutuhan akan plugin "Capacitor Hot Code Push" dengan poin-poin utama berikut:

1. **Platform**: Dukungan untuk Android dan iOS
2. **Solusi yang Ada**: Menyoroti keterbatasan opsi saat ini seperti MS Code Push (yang tidak mendukung Capacitor) dan App Flow (yang mahal dan tidak fleksibel)
3. **Deskripsi**: Kemampuan untuk memperbarui js/css/html aplikasi secara real-time tanpa melalui proses peninjauan app store
4. **Fitur Utama**: 
   - Memfasilitasi pembaruan over-the-air dari server/endpoint pilihan pengembang
   - Mengunduh file zip folder dist yang diperbarui, mengekstraknya, dan memberi tahu Capacitor untuk meluncurkan dari direktori baru ini
   - Fitur tambahan seperti verifikasi pembaruan, pengaturan waktu instalasi, dan pengunduhan pembaruan secara selektif

Permintaan komprehensif ini mendapatkan dukungan komunitas yang signifikan, dengan 65 suka dan 25 reaksi hati. Ini jelas menunjukkan adanya permintaan yang kuat untuk solusi semacam itu dalam ekosistem Capacitor.

Ketika saya menemukan permintaan ini lebih dari setahun kemudian, hal itu sangat sesuai dengan tantangan yang saya hadapi dalam proyek-proyek saya sendiri. Ini berfungsi sebagai validasi kebutuhan akan alat semacam itu dan peta jalan untuk apa yang akan menjadi Capgo.

Antusiasme komunitas terhadap plugin yang diusulkan ini, dikombinasikan dengan pengalaman pribadi saya, menjadi kekuatan pendorong di balik pengembangan Capgo. Ini adalah contoh sempurna bagaimana komunitas open-source dapat mengidentifikasi kebutuhan dan menginspirasi solusi, bahkan jika timeline dari ide hingga implementasi mencakup lebih dari setahun.

## Bab Baru Dimulai

Sebelum mendalami kisah Capgo, penting untuk menetapkan latar belakangnya. Pada tahun 2021, saya membuat keputusan yang mengubah hidup untuk berhenti dari peran saya sebagai CTO Cashstory dan menjual saham saya. Ini menandai awal perjalanan saya sebagai pembuat tunggal, sebuah jalan yang penuh dengan ketidakpastian tetapi juga kemungkinan yang tak terbatas.

![Kehidupan digital nomad Lisbon](/capgo-lisbon-nomadwebp)

Dengan tabungan saya sebagai jaring pengaman, saya memulai petualangan baru. Saya hidup sebagai digital nomad di Lisbon, Portugal, merangkul pemandangan teknologi dan budaya kota yang hidup sambil fokus pada proyek-proyek yang saya sukai. Fokus utama saya adalah Captime, sebuah timer crossfit aplikasi mobile. Saya tidak tahu bahwa proyek ini akan membawa saya untuk menciptakan sesuatu yang jauh lebih besar.

Energi ekosistem startup Lisbon dan kebebasan gaya hidup digital nomad memberikan latar belakang sempurna untuk inovasi. Di lingkungan inilah, dikelilingi oleh sesama pengusaha dan pengembang dari seluruh dunia, benih-benih Capgo ditabur.

## Percikan Ide

Saat mengerjakan Captime, saya menghadapi hambatan signifikan - kurangnya solusi pembaruan yang terjangkau dan fleksibel untuk aplikasi Capacitor. Pada Oktober 2021, saya menyuarakan kekhawatiran ini di thread GitHub.

![Proposal awal untuk Capgo](/capgo-initial-proposalwebp)

Poin-poin utama yang saya identifikasi adalah:

1. Biaya tinggi untuk pengembang skala kecil
2. Kurangnya pembaruan over-the-air (OTA) dalam paket yang terjangkau
3. Fitur yang tidak perlu untuk pengembang tunggal

## Komunitas Merespon

Kekhawatiran saya mendapat sambutan dari pengembang lain. Banyak yang menggemakan sentimen bahwa solusi yang ada terlalu mahal untuk pengembang indie dan tim kecil.

![Umpan balik komunitas](/capgo-community-feedbackwebp)

Seorang pengembang merangkum perasaan komunitas:

"Akan sangat bagus jika paket Community termasuk 500 pembaruan langsungAtau lebih baik lagi, jika ada paket Live Update saja seharga $50/bulan yang mencakup 5.000 Live Update"

## Lahirnya Sebuah Solusi

Termotivasi oleh respons komunitas, saya memutuskan untuk mengambil tindakan sendiri. Pada 24 Oktober 2021, saya mengumumkan rencana saya untuk membangun modul yang akan memungkinkan pengembang mengunduh pembaruan dari URL tertentu.

Tujuan awal sangat sederhana:
- Mengunduh data dari URL
- Membuka zip data tersebut
- Mengganti kode saat ini dengan yang baru

Namun, mengubah ide sederhana ini menjadi kenyataan ternyata jauh lebih menantang dari yang saya duga awalnya.

## Perjuangan di Balik Layar

Yang tidak terlihat dari utas GitHub adalah kompleksitas tugas yang saya ambil. Kode yang diperlukan untuk mengimplementasikan fungsionalitas ini rumit dan sulit dipahami. Saya menemukan diri saya bergulat dengan detail rumit tentang bagaimana aplikasi Capacitor menangani pembaruan dan sistem file.

Banyak malam dihabiskan di van saya, mempelajari dokumentasi dan bereksperimen dengan pendekatan berbeda. Kemajuan berjalan lambat, dan ada saat-saat ketika saya mempertanyakan apakah saya telah mengambil tugas yang terlalu berat.

## Komunitas untuk Penyelamatan

Untungnya, saya tidak sendirian dalam perjalanan ini. Komunitas pengembang, terutama di Discord, terbukti menjadi sumber daya yang sangat berharga. Sesama pengembang menawarkan wawasan mereka, membantu debug masalah, dan memberikan dorongan saat keadaan semakin sulit.

Upaya kolaboratif ini sangat penting dalam mengatasi hambatan teknis. Ini memperkuat keyakinan saya akan kekuatan open source dan pengembangan yang digerakkan oleh komunitas.

## Pengembangan Cepat dan Peningkatan Kemampuan

Dengan bantuan komunitas, pengembangan mulai dipercepat. Pada 22 November 2021, saya memiliki versi yang berfungsi untuk iOS dan sedang meningkatkan pengalaman pengembang.

Seiring berjalannya pengembangan, saya menambahkan lebih banyak fitur:
- Dukungan Android
- Persistensi antara penutupan aplikasi
- Kemampuan untuk kembali ke versi aplikasi asli

Setiap fitur baru membawa serangkaian tantangan sendiri, tetapi juga rasa pencapaian saat proyek berkembang melampaui cakupan awalnya.

## Peluncuran Capgo

Pada Maret 2022, proyek ini telah berkembang menjadi produk lengkap: Capgo. Saya mengumumkan rilis mode pembaruan otomatis, memungkinkan pengembang untuk terhubung ke backend mereka sendiri atau menggunakan layanan backend Capgo.

Respon komunitas sangat positif, dengan para pengembang memuji solusi yang sangat dibutuhkan ini.

## Beralih ke Produk Berbayar

Awalnya, saya tidak memiliki rencana untuk memonetisasi Capgo. Tujuan saya hanya untuk menciptakan alat yang akan memecahkan masalah yang saya dan pengembang lain hadapi. Namun, umpan balik di GitHub membuat saya mempertimbangkan kembali sikap ini.

Para pengembang mengungkapkan kesediaan untuk membayar solusi yang memenuhi kebutuhan mereka dengan harga yang wajar. Umpan balik ini, dikombinasikan dengan kesadaran akan biaya dan upaya berkelanjutan yang diperlukan untuk memelihara dan meningkatkan Capgo, mengarah pada keputusan penting.

Pada 11 Juni 2022, saya mengumumkan bahwa Capgo akan mulai mengenakan biaya penggunaan dalam 15 hari, menandai transisinya dari proyek komunitas menjadi bisnis yang berkelanjutan.

Namun, tetap setia pada akar proyek, saya mempertahankan inti open-source Capgo dengan memungkinkan penggunaan gratis plugin dalam mode manual atau dengan server kustom.

## Kesimpulan

Perjalanan saya dengan Capgo adalah bukti kekuatan inovasi yang didorong oleh komunitas dan jalur tak terduga yang sering ditemukan oleh para pembuat solo. Apa yang dimulai sebagai frustrasi pribadi saat mengerjakan aplikasi timer crossfit berkembang menjadi sistem pembaruan langsung yang kuat, terjangkau, dan fleksibel untuk aplikasi Capacitor.

Penciptaan Capgo jauh dari mudah.Dibutuhkan waktu kerja yang tak terhitung jumlahnya, dukungan dari komunitas pengembang yang murah hati, dan kemauan untuk mengubah arah berdasarkan umpan balik pengguna. Dari menulis kode di Airbnb di Portugal hingga meluncurkan produk berbayar, setiap langkah dalam perjalanan ini telah menjadi pengalaman pembelajaran.

Seiring Capgo terus berkembang, ini menjadi contoh utama bagaimana mengidentifikasi celah di pasar, secara aktif bekerja untuk mengisinya, dan responsif terhadap kebutuhan komunitas dapat mengarah pada penciptaan alat-alat berharga yang menguntungkan seluruh ekosistem pengembang.

Cerita Capgo lebih dari sekadar pengembangan sebuah alat; ini adalah kisah ketekunan, komunitas, dan ketidakpastian yang menarik dalam kehidupan sebagai pembuat tunggal.

Anda dapat menemukan cerita lengkapnya di [sini](https://githubcom/capacitor-community/proposals/issues/43#issuecomment-941017142)