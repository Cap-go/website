---
slug: como-procesar-solicitudes-de-usuarios-segun-ccpa
title: Pengelolaan Permintaan Data Pengguna Sesuai CCPA
description: >-
  Pelajari cara mengelola permintaan pengguna secara efektif untuk pemrosesan
  data sesuai dengan CCPA, memastikan kepatuhan dan hak privasi pengguna.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-06T01:02:16.662Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad-1743901348104.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  CCPA, user data requests, compliance, privacy rights, data access, data
  deletion, opt-out, data protection
tag: 'Development, Security, Updates'
published: true
locale: id
next_blog: ''
---
California Consumer Privacy Act ([CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act)) memberikan pengguna kontrol atas data pribadi mereka dan menetapkan aturan ketat untuk bisnis. Berikut yang perlu Anda ketahui untuk mematuhinya:

-   **Siapa Yang Harus Mematuhi**: Bisnis dengan pendapatan lebih dari $25M, data lebih dari 50.000 pengguna, atau menghasilkan 50%+ pendapatan dari penjualan data.
-   **Hak Pengguna**:
    -   **Akses**: Pengguna dapat meminta data mereka. Tanggapi dalam 45 hari.
    -   **Penghapusan**: Pengguna dapat meminta penghapusan data mereka. Tanggapi dalam 45 hari.
    -   **Opt-Out**: Pengguna dapat menghentikan penjualan data mereka. Harus segera.
    -   **Non-Diskriminasi**: Layanan yang sama terlepas dari preferensi privasi.
-   **Langkah Utama untuk Kepatuhan**:
    -   Buat sistem yang aman untuk permintaan data (formulir web, email, atau dalam aplikasi).
    -   Verifikasi identitas pengguna sebelum memproses permintaan.
    -   Gunakan [kebijakan privasi](https://capgo.app/dp/) yang jelas dan sediakan opsi "Jangan Jual Informasi Pribadi Saya" yang mudah.
    -   Lindungi data dengan enkripsi dan penyimpanan yang aman.

**Kiat Cepat**: Gunakan alat seperti [Capgo](https://capgo.app/) untuk pembaruan instan fitur privasi aplikasi Anda, memastikan kepatuhan cepat terhadap peraturan yang berubah.

## Cara Mematuhi California Consumer Privacy Act ...

<iframe src="https://www.youtube.com/embed/8NY0qFaVWwo" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Memahami Hak Pengguna [CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act)

Pengembang perlu membuat proses yang aman dan ramah pengguna untuk menangani setiap hak data pengguna di bawah CCPA.

### Hak Akses Data

Ketika pengguna meminta akses ke data mereka, berikan detail berikut:

| **Kategori Data** | **Informasi yang Diungkapkan** | **Format yang Direkomendasikan** |
| --- | --- | --- |
| Jenis & Sumber Data | Jenis data yang dikumpulkan dan sumbernya | Dapat dibaca mesin (mis., JSON, CSV) |
| Penggunaan Data | Bagaimana data diproses dan digunakan | Ringkasan teks biasa |
| Akses Pihak Ketiga | Daftar pihak ketiga dengan akses ke data | Daftar terstruktur |
| Jangka Waktu Penyimpanan | Berapa lama data disimpan | Jangka waktu spesifik |

Setelah akses data diberikan, pastikan Anda memiliki proses yang jelas dan andal untuk penghapusan data agar tetap patuh.

### Proses Penghapusan Data

1.  **Verifikasi ruang lingkup**: Konfirmasi bahwa penghapusan mencakup semua sistem yang relevan, termasuk database utama, cache, alat analitik, sistem pihak ketiga, dan cadangan. Pengecualian mungkin berlaku untuk keamanan, kewajiban hukum, perbaikan bug, atau transaksi yang sedang berlangsung.
2.  **Eksekusi penghapusan**: Hapus data dari semua sistem yang berlaku dan segera beri tahu pengguna. Sertakan timestamp penghapusan dan detail data yang disimpan berdasarkan pengecualian.

Setelah menangani hak akses dan penghapusan, pastikan proses untuk opt-out dari penjualan data sama mudahnya.

### Opt-Out Penjualan Data

Sediakan opsi "Jangan Jual Informasi Pribadi Saya" yang mudah ditemukan, dapat diakses dari layar utama atau menu pengaturan aplikasi. Preferensi ini harus diterapkan dengan cepat dan tetap konsisten di semua versi aplikasi.

Jika aplikasi Anda menggunakan SDK analitik atau periklanan pihak ketiga, pastikan layanan ini terintegrasi dengan mekanisme opt-out Anda dan menghormati preferensi pengguna tanpa penundaan. Ini memastikan kepatuhan dan membangun kepercayaan dengan pengguna Anda.

## Memproses Permintaan Data CCPA

Berikut cara menangani permintaan data CCPA secara aman sambil tetap mematuhi:

### Menyiapkan Sistem Permintaan

Berikan pengguna cara yang aman untuk mengirimkan permintaan mereka. Opsi meliputi:

-   Formulir web yang diamankan dengan SSL dan captcha
-   Email khusus privasi dengan fitur respons otomatis
-   Antarmuka dalam aplikasi menggunakan API yang aman

Pastikan untuk mencatat dan memberikan timestamp setiap pengiriman. Organisasikan permintaan berdasarkan jenis untuk memperlancar pemrosesan.

### Memverifikasi Identitas Pengguna

Gunakan proses dua langkah untuk mengkonfirmasi identitas pengguna:

-   Pertama, verifikasi identitas mereka melalui email terdaftar atau ID akun.
-   Kemudian, lakukan pemeriksaan sekunder, seperti mengirim kode SMS satu kali atau mengajukan pertanyaan keamanan.

Untuk aplikasi seluler, Anda dapat mengandalkan pengidentifikasi khusus perangkat atau token autentikasi untuk keamanan tambahan.

### Mengelola Tenggat Waktu Respons

Setelah identitas pengguna diverifikasi, ikuti langkah-langkah ini untuk memenuhi tenggat waktu CCPA:

-   Gunakan pelacak terpusat untuk mencatat setiap permintaan, memantau tenggat waktu, dan melacak kemajuan.
-   Catat semua detail, termasuk timestamp, metode verifikasi, langkah pemrosesan, dan komunikasi pengguna, untuk memastikan kepatuhan dan mempertahankan jejak audit yang jelas.

## Pedoman Kepatuhan CCPA

### Pembaruan Kebijakan Privasi

Jaga [kebijakan privasi](https://capgo.app/privacy/) Anda tetap terkini dengan persyaratan CCPA. Jelaskan dengan jelas:

-   Jenis informasi pribadi yang Anda kumpulkan
-   Bagaimana Anda menggunakan dan membagikan informasi ini
-   Hak pengguna berdasarkan CCPA
-   Bagaimana pengguna dapat mengirimkan permintaan data

Tulis dalam bahasa yang sederhana dan lugas. Misalnya, katakan "menurut" alih-alih "sesuai dengan." Ini membuat kebijakan Anda lebih mudah dipahami dan mendukung upaya kepatuhan Anda.

Setelah diperbarui, buat agar mudah bagi pengguna untuk mengontrol data mereka, termasuk opt-out dari berbagi data.

### Implementasi Opt-Out

Sertakan opsi "Jangan Jual atau Bagikan Informasi Pribadi Saya" di aplikasi Anda. Tempatkan di tempat yang mudah ditemukan pengguna, seperti:

-   Menu pengaturan aplikasi
-   Preferensi akun
-   Bagian kontrol privasi khusus

Dukung sinyal [Global Privacy Control](https://globalprivacycontrol.org/) (GPC) untuk secara otomatis menghormati preferensi privasi pengguna.

| Fitur | Persyaratan Implementasi | Pengalaman Pengguna |
| --- | --- | --- |
| Tombol Opt-Out | Terlihat di pengaturan aplikasi | Aktivasi satu ketukan |
| Dukungan Sinyal GPC | Deteksi otomatis | Pemrosesan latar belakang |
| Indikator Status | Status toggle yang jelas | Konfirmasi visual |
| Penyimpanan Preferensi | Penyimpanan lokal yang aman | Persisten antar sesi |

Proses opt-out ini sederhana dan transparan, membantu membangun kepercayaan sambil memenuhi pedoman CCPA. Pasangkan kontrol ini dengan praktik keamanan yang kuat untuk melindungi data pengguna.

### Metode Perlindungan Data

Gunakan langkah-langkah keamanan yang ketat untuk melindungi data di semua tahap. Enkripsi semua transmisi data, terutama informasi sensitif.

Untuk penyimpanan data yang aman:

-   Gunakan database terenkripsi
-   Terapkan praktik manajemen kunci yang aman
-   Lakukan audit keamanan rutin
-   Siapkan sistem cadangan otomatis

Saat menghapus data, ikuti langkah-langkah yang dijelaskan dalam bagian Penghapusan Data untuk memastikan penghapusan lengkap dari semua sistem. Metode ini membantu melindungi informasi pengguna dan mempertahankan kepatuhan.

## Persyaratan CCPA Aplikasi Seluler

### Kontrol Izin Aplikasi

Buat agar mudah bagi pengguna untuk mengelola pengaturan privasi mereka dengan kontrol izin yang jelas dan dapat diakses.

Pertimbangkan untuk membuat antarmuka pengaturan privasi khusus yang mencakup:

| Jenis Kontrol | Implementasi | Tindakan Pengguna |
| --- | --- | --- |
| **Pengumpulan Data** | Toggle terperinci | Aktifkan atau nonaktifkan jenis data tertentu |
| **Layanan Lokasi** | Opsi multi-level | Pilih presisi data (tepat atau perkiraan) |
| **Komunikasi Pemasaran** | Berbasis kategori | Pilih metode kontak yang disukai |
| **Berbagi Pihak Ketiga** | Kontrol individual | Opt out per mitra data |

Tempatkan kontrol ini di tempat yang mudah ditemukan dalam menu pengaturan aplikasi Anda. Bersikaplah transparan - jelaskan dengan jelas data apa yang dikumpulkan, mengapa diperlukan, bagaimana digunakan, dan dengan siapa dibagikan. Pendekatan ini memastikan pengguna dapat dengan cepat memperbarui preferensi mereka kapan pun diperlukan.

### Menggunakan [Capgo](https://capgo.app/) untuk Pembaruan

![Capgo](https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad/241c8f19433e01f315154c8988becf9c.jpg)

Setelah Anda menetapkan kontrol dalam aplikasi yang kuat, menjaga aplikasi Anda tetap diperbarui adalah kunci untuk tetap patuh. Di sinilah Capgo berperan. Ini memungkinkan Anda menerapkan pembaruan secara instan - tanpa menunggu persetujuan app store. Faktanya, 95% pengguna aktif menerima pembaruan dalam 24 jam setelah rilis [\[1\]](https://capgo.app/).

Berikut yang ditawarkan Capgo:

-   **Pembaruan Instan**: Dorong perubahan privasi dan izin yang penting segera.
-   **Implementasi Aman**: Menggunakan enkripsi end-to-end, memastikan hanya pengguna yang dapat mendekripsi pembaruan.
-   **Kontrol Versi**: Kembalikan pembaruan jika perlu untuk mempertahankan konsistensi.

> "Kami mempraktikkan pengembangan agile dan @Capgo sangat penting dalam memberikan layanan secara berkelanjutan kepada pengguna kami!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Sistem saluran Capgo juga memungkinkan Anda menguji pembaruan privasi dengan grup pengguna tertentu sebelum menerapkannya ke semua orang. Saat ini, 750 aplikasi mengandalkan Capgo dalam lingkungan produksi [\[1\]](https://capgo.app/).

## Ringkasan

### Poin Utama

Menangani permintaan data CCPA melibatkan keseimbangan antara hak privasi pengguna dengan eksekusi teknis. Berikut prioritas utama yang harus ditangani pengembang:

| Persyaratan | Implementasi |
| --- | --- |
| Sistem Permintaan Data | Portal aman dengan autentikasi pengguna |
| Kontrol Privasi | Pengaturan izin terperinci |
| Opt-Out Penjualan Data | Proses jelas dengan verifikasi pengguna |
| Perlindungan Data | Enkripsi end-to-end |

Untuk aplikasi seluler, kontrol izin yang kuat sangat penting. **Capgo** menyederhanakan kepatuhan dengan memungkinkan pembaruan instan, sudah mendukung 750 aplikasi produksi [\[1\]](https://capgo.app/).

> "Capgo adalah alat yang harus dimiliki pengembang yang ingin lebih produktif. Menghindari ulasan untuk perbaikan bug sangat berharga." - Bessie Cooper [\[1\]](https://capgo.app/)

Kecepatan penting: 95% pengguna menerima pembaruan dalam 24 jam melalui **Capgo** [\[1\]](https://capgo.app/), memastikan kepatuhan cepat dengan peraturan.

Kepatuhan CCPA bukan tugas satu kali. Audit dan pembaruan rutin diperlukan untuk mengikuti perubahan aturan dan melindungi privasi pengguna.
