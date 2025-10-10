---
slug: >-
  Les mises à jour en direct avec Capacitor: Rester conforme aux exigences
  d'Apple
title: 'Live Updates pada Capacitor: Tetap Mengikuti Persyaratan Apple'
description: >-
  Pelajari cara mengimplementasikan pembaruan langsung dalam aplikasi seluler
  secara efektif sambil memastikan kepatuhan terhadap pedoman ketat untuk
  menghindari penolakan.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-12T03:03:33.472Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d0d3f9cf9d4dc0b2c0bff2-1741748627082.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capacitor, live updates, app compliance, Apple guidelines, encryption, bug
  fixes, mobile development
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) live update memungkinkan pengembang untuk mengirimkan perbaikan bug dan perubahan kecil langsung ke aplikasi tanpa mengharuskan pengguna mengunduh pembaruan dari [App Store](https://www.apple.com/app-store/). Ini mempercepat deployment hingga **81%**, mengurangi biaya, dan meningkatkan pengalaman pengguna. Namun, penting untuk tetap mematuhi pedoman ketat Apple untuk menghindari penolakan aplikasi.

### Poin Penting:

-   **Update yang Diizinkan**: Perbaikan bug, penyesuaian UI, dan pembaruan konten dalam tujuan awal aplikasi.
-   **Update yang Dilarang**: Perubahan fitur utama atau pembaruan fungsionalitas inti (memerlukan tinjauan App Store).
-   **Keamanan**: Enkripsi end-to-end wajib untuk melindungi data pengguna.
-   **Alat**: [Capgo](https://capgo.app/) menyederhanakan manajemen live update, memastikan kepatuhan dengan aturan Apple.

| **Jenis Update** | **Diizinkan** | **Perlu Persetujuan** |
| --- | --- | --- |
| Perbaikan Bug | Ya | Tidak |
| Peningkatan UI | Ya | Terkadang |
| Pembaruan Konten | Ya | Tidak |
| Perubahan Fitur | Tidak | Ya |
| Patch Keamanan | Ya | Tidak |

Untuk tetap patuh, fokus pada perbaikan bug, amankan pembaruan dengan enkripsi, dan dokumentasikan semua perubahan. Alat seperti Capgo membantu mengelola pembaruan untuk lebih dari **20 juta pengguna**, memastikan aplikasi tetap patuh sambil mengirimkan pembaruan dengan cepat.

## [Appflow](https://ionic.io/appflow/live-updates) Live Updates: Deploy pembaruan instan langsung ke pengguna Anda

![Appflow](https://mars-images.imgix.net/seobot/screenshots/ionic.io-f18932d1af08bf70cb14b84540039486-2025-03-12.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/Twj-Bx6ZRw8" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Aturan Live Update Apple

Apple mengatur pembaruan aplikasi untuk melindungi pengguna, sehingga penting untuk memahami aturan ini saat mengimplementasikan live update dalam aplikasi Capacitor.

### Pedoman [App Store](https://www.apple.com/app-store/) untuk Pembaruan

![App Store](https://mars-images.imgix.net/seobot/screenshots/www.apple.com-9d9fbf06f7f9dd70143af6386e59a5d2-2025-03-12.jpg?auto=compress)

Aturan Apple dengan jelas menguraikan apa yang diizinkan dan tidak diizinkan dengan pembaruan over-the-air (OTA). Berikut ringkasannya:

| Jenis Update | Diizinkan | Persyaratan |
| --- | --- | --- |
| Perbaikan Bug | Ya | Tidak boleh mengubah fungsionalitas inti |
| Peningkatan UI | Ya | Terbatas pada penyesuaian visual minor |
| Pembaruan Konten | Ya | Harus tetap dalam tujuan awal aplikasi |
| Perubahan Fitur | Tidak | Memerlukan tinjauan App Store |
| Patch Keamanan | Ya | Harus menyertakan enkripsi yang tepat |

Saat menggunakan live update, pengembang harus memprioritaskan keamanan data pengguna dan menggunakan enkripsi end-to-end. Alat seperti Capgo dibangun untuk mematuhi persyaratan Apple, menyederhanakan prosesnya.

Memahami aturan ini dapat membantu Anda menghindari kesalahan umum yang menyebabkan penolakan aplikasi.

### Alasan Utama Aplikasi Ditolak

Banyak aplikasi ditolak karena melanggar pedoman pembaruan Apple. Berikut beberapa masalah yang sering terjadi:

-   **Melewati Proses Tinjauan**: Menambahkan fitur baru utama melalui live update alih-alih mengirimkannya untuk ditinjau.
-   **Masalah Privasi**: Gagal mengamankan data pengguna selama pembaruan.
-   **Perubahan Fungsionalitas Inti**: Menggunakan live update untuk mengubah cara kerja aplikasi secara signifikan.

> "Menghindari tinjauan untuk perbaikan bug sangatlah berharga." - Bessie Cooper, @bessiecooper [\[1\]](https://capgo.app/)

Ini menekankan bahwa live update harus fokus pada perbaikan bug, bukan memperkenalkan fitur baru.

Untuk tetap patuh pada standar Apple:

-   Gunakan enkripsi yang kuat untuk semua pembaruan.
-   Batasi pembaruan untuk perbaikan bug dan penyesuaian minor.
-   Simpan catatan detail perubahan yang dibuat.
-   Uji pembaruan secara menyeluruh sebelum rilis.
-   Pantau perubahan kebijakan Apple secara rutin.

Mengikuti langkah-langkah ini akan membantu memastikan pembaruan aplikasi Anda tetap dalam pedoman ketat Apple.

## Menyiapkan Live Update yang Patuh

Untuk mengimplementasikan live update di [aplikasi Capacitor](https://capgo.app/plugins/ivs-player/) Anda sambil memenuhi aturan kepatuhan Apple, Anda memerlukan pengaturan terstruktur. Berikut cara memulainya.

### Langkah-langkah Pengaturan Proyek

Mulai dengan mengonfigurasi lingkungan dan menginstal plugin live update Capgo:

-   **Instal Dependensi yang Diperlukan**
    
    -   Gunakan CLI Capgo untuk menginstal plugin live update dan menyiapkan alat yang diperlukan. Misalnya:
        
        ```bash
        npx @capgo/cli init
        ```
        
    -   Pastikan aplikasi Anda menyertakan enkripsi end-to-end dan penyimpanan aman untuk file pembaruan.
        
-   **Konfigurasi Parameter Pembaruan**
    
    -   Atur seberapa sering pembaruan harus terjadi.
    -   Rencanakan prosedur rollback jika ada masalah.
    -   Simpan log detail perubahan versi.
-   **Implementasi Protokol Keamanan**
    
    -   Aktifkan enkripsi end-to-end.
    -   Gunakan metode transmisi yang aman.
    -   Wajibkan otentikasi pengguna untuk perlindungan tambahan.

### Pedoman Kontrol Versi

Mengelola versi aplikasi dengan benar adalah kunci untuk tetap patuh pada pedoman Apple. Berikut ringkasan singkatnya:

| Jenis Versi | Cakupan Update | Perlu Persetujuan |
| --- | --- | --- |
| Patch (x.x.1) | Perbaikan bug | Tidak |
| Minor (x.1.x) | Penyesuaian UI | Terkadang |
| Major (1.x.x) | Pembaruan fitur | Ya |

Simpan dokumentasi detail semua perubahan untuk memperlancar proses tinjauan App Store.

### [Capgo](https://capgo.app/): Manajemen Live Update

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-12.jpg?auto=compress)

Capgo menyederhanakan manajemen live update dan memastikan kepatuhan dengan persyaratan Apple. Ini telah mendukung lebih dari **947,6 juta pembaruan** di **1.400+ aplikasi produksi** [\[1\]](https://capgo.app/).

Beberapa fitur unggulannya meliputi:

-   **Enkripsi end-to-end** untuk pembaruan yang aman.
-   **Integrasi CI/CD** dengan platform seperti [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), dan [Azure DevOps](https://azure.microsoft.com/en-us/products/devops).
-   **Penugasan pengguna** untuk rollout terkontrol.
-   Alat untuk membantu memastikan pembaruan sesuai dengan kebijakan Apple.

Setelah aplikasi Anda siap, gunakan CLI Capgo untuk mengirim pembaruan. Sistem akan menangani kontrol versi, enkripsi, dan distribusi secara otomatis, menjaga Anda patuh pada aturan Apple.

## Keamanan Data Selama Pembaruan

Mengamankan data selama live update sangat penting untuk tetap patuh pada regulasi dan melindungi informasi pengguna. Ini juga berperan penting dalam mempertahankan kepercayaan pengguna.

### Persyaratan Enkripsi

Enkripsi end-to-end adalah keharusan untuk menjaga keamanan live update di [aplikasi Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/). Ini memastikan data pembaruan tetap terlindungi saat berpindah dari server ke perangkat. Solusi live update Capgo menegakkan standar enkripsi ini. Menurut Capgo: "Enkripsi end-to-end. Hanya pengguna Anda yang dapat mendekripsi pembaruan Anda, tidak ada yang lain" [\[1\]](https://capgo.app/). Pendekatan enkripsi ini penting untuk melindungi data pengguna secara efektif.

### Perlindungan Data Pengguna

Kerangka keamanan Capgo memastikan bahwa hanya pengguna yang berwenang yang dapat mendekripsi pembaruan. Dengan membatasi akses, ini membantu melindungi data pengguna selama proses pembaruan dan meminimalkan risiko akses tidak sah.

## Pengujian dan Pengiriman App Store

Pengujian menyeluruh sebelum rilis sangat penting untuk pengiriman App Store yang lancar dan memenuhi standar kepatuhan.

### Pengujian Pra-Rilis

Fitur penugasan pengguna Capgo memungkinkan Anda menguji pembaruan dengan grup pengguna tertentu sebelum merilis ke semua orang. Pendekatan terkontrol ini memastikan strategi [enkripsi dan perlindungan data](https://capgo.app/docs/cli/migrations/encryption/) Anda berfungsi secara efektif.

Berikut contoh bagaimana Capgo menangani rollout untuk lebih dari 5.000 pengguna:

> "Kami merilis pembaruan OTA Capgo dalam produksi untuk basis pengguna kami +5000. Kami melihat operasi yang sangat lancar hampir semua pengguna kami terbaru dalam hitungan menit setelah OTA dikerahkan ke @Capgo." [\[1\]](https://capgo.app/)

Untuk memastikan rollout yang sukses, ikuti langkah-langkah berikut:

-   Mulai dengan pengujian internal.
-   Perluas ke kelompok kecil pengguna eksternal.
-   Secara bertahap tingkatkan basis pengguna.
-   Pantau waktu pengiriman pembaruan dan tingkat keberhasilan.

Setelah pengujian selesai, Anda perlu mendokumentasikan langkah-langkah ini untuk proses tinjauan App Store.

### Pedoman Tinjauan Aplikasi

Saat mengirimkan aplikasi Anda, penting untuk menunjukkan kepatuhan dengan pedoman Apple.

> "@Capgo adalah alat yang harus dimiliki pengembang yang ingin lebih produktif. Menghindari tinjauan untuk perbaikan bug sangatlah berharga." - Bessie Cooper [\[1\]](https://capgo.app/)

Apple memerlukan dokumentasi spesifik, termasuk:

-   **Dokumentasi Jelas**: Penjelasan detail tentang cara pembaruan disampaikan.
-   **Protokol Keamanan**: Bukti tindakan enkripsi dan perlindungan data.
-   **Cakupan Pembaruan**: Rincian jenis konten yang diperbarui.
-   **Bukti Pengujian**: Data yang menunjukkan pengujian menyeluruh dan metrik kinerja.

| Area Fokus Tinjauan | Dokumentasi yang Diperlukan |
| --- | --- |
| Tindakan Keamanan | Protokol enkripsi, keamanan data |
| Mekanisme Pembaruan | Detail teknis implementasi |
| Perubahan Konten | Cakupan pembaruan yang ditentukan |
| Hasil Pengujian | Metrik stabilitas dan kinerja |

Menyediakan dokumentasi yang jelas dan detail tentang keamanan dan proses pembaruan dapat menyederhanakan proses pengiriman dan membantu menghindari penundaan.

## Kepatuhan Pasca-Peluncuran

Setelah meluncurkan aplikasi Anda, tetap patuh pada pedoman App Store memerlukan pemantauan konstan dan penyesuaian cepat. Pengembang perlu melacak pembaruan dan beradaptasi dengan perubahan pedoman untuk memastikan kepatuhan berkelanjutan.

### Pelacakan Pembaruan

Untuk menjaga aplikasi Anda sesuai dengan kebijakan App Store, fokus pada area-area kunci ini:

| Area Pemantauan | Metrik Utama | Item Tindakan |
| --- | --- | --- |
| Kecepatan Distribusi | Waktu pengiriman pembaruan | Ukur seberapa cepat pembaruan mencapai pengguna. |
| Tingkat Keberhasilan | % penyelesaian pembaruan | Selidiki pembaruan yang gagal dan penyebabnya. |
| Cakupan Pengguna | Pembaruan pengguna aktif | Pastikan pembaruan mencapai semua segmen pengguna. |
| Status Keamanan | Validasi enkripsi | Periksa integritas enkripsi end-to-end. |

Metrik ini menyediakan dasar untuk beradaptasi dengan cepat ketika pedoman berubah.

### Respons Pembaruan Kebijakan

Melacak metrik ini bukan hanya tentang kinerja - ini juga membantu Anda mengidentifikasi area yang mungkin membutuhkan perhatian segera ketika Apple memperbarui kebijakannya. Berikut cara meresponnya:

1.  **Tinjau Perubahan:** Periksa pedoman baru dan tentukan dampaknya terhadap proses pembaruan Anda saat ini.
2.  **Audit Teknis:** Konfirmasi bahwa mekanisme pembaruan Anda selaras dengan persyaratan yang direvisi.
3.  **Verifikasi Keamanan:** Periksa ulang bahwa protokol enkripsi Anda memenuhi standar terbaru.
4.  **Pembaruan Dokumentasi:** Perbarui dokumentasi kepatuhan Anda untuk mencerminkan pedoman terbaru.

Menggunakan alat yang dibuat dengan mempertimbangkan persyaratan Apple dapat menyederhanakan proses ini. Misalnya, Capgo menawarkan fitur seperti enkripsi end-to-end dan penugasan pengguna, membuatnya lebih mudah untuk tetap patuh sambil memberikan pembaruan secara efisien [\[1\]](https://capgo.app/).

Pantau secara rutin kepatuhan aplikasi Anda melalui [platform manajemen pembaruan](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Bersikap proaktif dapat membantu Anda menangkap dan menyelesaikan masalah potensial sebelum mempengaruhi status App Store Anda, menjaga strategi pembaruan langsung Anda tetap efektif dan sesuai aturan.

## Kesimpulan

Menyeimbangkan kecepatan dan kepatuhan adalah kunci saat mengimplementasikan pembaruan langsung dalam aplikasi Capacitor. Dengan alat yang tepat, efisiensi rilis dapat meningkat hingga 81% [\[1\]](https://capgo.app/), memudahkan untuk tetap dalam pedoman Apple.

Platform seperti Capgo menunjukkan bagaimana mungkin untuk memenuhi persyaratan App Store sambil tetap memberikan pembaruan cepat [\[1\]](https://capgo.app/). Aturan ketat Apple seputar pembaruan langsung menekankan pentingnya menjaga kepatuhan.

Untuk memastikan kepatuhan jangka panjang, fokus pada praktik-praktik ini:

-   Gunakan enkripsi end-to-end untuk semua pembaruan.
-   Integrasikan pembaruan ke dalam alur kerja CI/CD Anda dengan mulus.
-   Pantau metrik pembaruan secara rutin.
-   Tetap siap menghadapi perubahan kebijakan.
