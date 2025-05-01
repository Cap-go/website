---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: Capgo OTA 업데이트와 함께 시맨틱 버저닝 사용하기
description: >-
  Pelajari cara merampingkan pembaruan aplikasi dan kontrol versi menggunakan
  Semantic Versioning dengan pembaruan OTA Capgo untuk aplikasi Capacitor.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2025-03-18T13:14:09.597Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

**Ingin menyederhanakan [pembaruan aplikasi](https://capgoapp/plugins/capacitor-updater/) dan kontrol versi?** Semantic Versioning (SemVer) dikombinasikan dengan pembaruan Over-The-Air (OTA) [Capgo](https://capgoapp/) membuat pengelolaan aplikasi [Capacitor](https://capacitorjscom/) lebih mudah dan cepat. Berikut caranya:

-   **Dasar Semantic Versioning:** Versi menggunakan format `MAJORMINORPATCH`:
    
    -   **MAJOR:** Untuk perubahan yang tidak kompatibel
    -   **MINOR:** Untuk fitur baru yang kompatibel mundur
    -   **PATCH:** Untuk perbaikan bug
-   **Mengapa Menggunakan SemVer dengan Capgo?**
    
    -   Komunikasi yang jelas tentang pembaruan
    -   Manajemen versi yang lebih cerdas
    -   Menghindari konflik dependensi
    -   Perencanaan rilis yang terorganisir
-   **Langkah [Pengaturan Capgo](https://capgoapp/docs/cli/commands/):**
    
    1.  Instal plugin updater Capgo
    2.  Konfigurasi versi aplikasi Anda di `capacitorconfigjson` dan file lainnya
    3.  Inisialisasi dengan API key Anda
    4.  Gunakan [Capgo CLI](https://capgoapp/docs/cli/commands) untuk membundel dan mengunggah pembaruan
-   **[Kelola Versi dan Saluran](https://capgoapp/docs/webapp/channels/):**
    
    -   Gunakan saluran terpisah (mis., "beta" untuk pengujian, "production" untuk rilis stabil)
    -   Kontrol kebijakan pembaruan (pembaruan patch otomatis, persetujuan manual untuk perubahan major)
    -   Opsi rollback untuk pembaruan yang gagal
-   **Proses Deployment:**
    
    -   Perbarui nomor versi mengikuti aturan SemVer
    -   Uji secara menyeluruh sebelum men-deploy
    -   Gunakan perintah CLI untuk mengunggah dan mendistribusikan pembaruan

Capgo memastikan pembaruan mencapai pengguna dengan cepat dan andal, dengan alat untuk menangani gangguan dan menjaga stabilitas. Sempurna untuk tim yang menggunakan alur kerja CI/CD untuk mengotomatiskan pembaruan.

**Tips Cepat:** Selalu uji pembaruan dan gunakan saluran untuk mengelola peluncuran bertahap secara efektif

## Semantic Versioning | Level Up

[[HTML_TAG]][[HTML_TAG]]

## Panduan Pengaturan [Capgo](https://capgoapp/)

![Capgo](https://mars-imagesimgixnet/seobot/screenshots/capgoapp-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03jpg?auto=compress)

Berikut cara mengatur Capgo untuk mengelola pembaruan OTA dan kontrol versi dengan mudah

### Langkah Pengaturan Awal

Mulai dengan menginstal [plugin updater Capgo](https://capgoapp/docs/plugin/self-hosted/manual-update/):

[[CODE_BLOCK]]

Pastikan file `capacitorconfigjson` Anda menggunakan format versi semantik:

[[CODE_BLOCK]]

Untuk proyek lama, perbarui detail versi di lokasi berikut:

-   `packagejson` (cari field `version`)
-   `android/app/buildgradle` (perbarui `versionName`)
-   `ios/App/Appxcodeproj/projectpbxproj` (perbarui `CURRENT_PROJECT_VERSION`)

Setelah dikonfigurasi, inisialisasi Capgo dengan API key Anda:

[[CODE_BLOCK]]

**Tabel Referensi Cepat:**

| Fase Pengaturan | Tindakan Utama | Langkah Verifikasi |
| --- | --- | --- |
| Instalasi | Instal plugin dan sinkronisasi | Periksa `packagejson` |
| Konfigurasi | Atur nomor versi | Verifikasi di semua file |
| Inisialisasi | Hubungkan dengan API key | Uji status koneksi |
| Build | Buat bundle awal | Konfirmasi keberhasilan unggah |

### Integrasi Kontrol Versi

Capgo bekerja dengan baik dengan platform CI/CD, membuat [pembaruan otomatis](https://capgoapp/docs/plugin/cloud-mode/hybrid-update/) menjadi sederhana. Platform yang didukung meliputi:

-   [GitHub Actions](https://docsgithubcom/actions)
-   [GitLab CI](https://docsgitlabcom/ee/ci/)
-   [Azure DevOps](https://azuremicrosoftcom/en-us/products/devops)
-   [Jenkins](https://wwwjenkinsio/)
-   [CircleCI](https://circlecicom/)

Jika Anda bekerja pada pengembangan lokal, Anda dapat menonaktifkan pembaruan otomatis dengan menambahkan ini ke konfigurasi Anda:

[[CODE_BLOCK]]

Ini memastikan Capgo tidak akan menimpa perubahan lokal Anda. Setelah pengaturan Anda siap, unggah versi pertama Anda:

[[CODE_BLOCK]]

Terakhir, beri tahu plugin native tentang kesehatan bundle di file utama aplikasi Anda:

[[CODE_BLOCK]]

Pengaturan ini memastikan aplikasi Anda siap untuk deployment OTA dan manajemen versi yang lancar## Menggunakan Semantic Versioning dengan Capgo

### Manajemen Nomor Versi

Capgo menggunakan Semantic Versioning (SemVer) untuk mengelola versi aplikasi, diformat sebagai **MAJORMINORPATCH**. Berikut cara kerjanya:

-   **Versi Major (X00)**: Tingkatkan nomor MAJOR untuk perubahan yang mengganggu kompatibilitas
-   **Versi Minor (1X0)**: Tingkatkan nomor MINOR untuk fitur baru yang tetap kompatibel
-   **Versi Patch (10X)**: Tingkatkan nomor PATCH untuk perbaikan bug yang tidak mempengaruhi kompatibilitas

| Tipe Versi | Kapan Menambah | [Perilaku Auto-Update](https://capgoapp/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| Major (X00) | Untuk perubahan API yang breaking | Memerlukan persetujuan manual |
| Minor (1X0) | Untuk fitur baru | Dapat dikonfigurasi di Capgo |
| Patch (10X) | Untuk perbaikan bug | Biasanya otomatis |

Dengan mengikuti aturan SemVer, Anda dapat menyederhanakan manajemen versi dan memastikan pembaruan yang lebih lancar di seluruh saluran deployment Anda

### Pedoman Kontrol Versi

Capgo memungkinkan Anda mengelola deployment secara efektif dengan mengatur saluran berbeda untuk berbagai tahap alur kerja Anda

-   **[Manajemen Versi Berbasis Saluran](https://capgoapp/docs/webapp/channels/)**: Atur proses deployment Anda dengan membuat saluran terpisah untuk pengujian dan produksi. Contohnya:
    
    -   Gunakan saluran "beta" (misal, 120-beta) untuk menguji fitur baru
    -   Pertahankan saluran "production" (misal, 120) untuk rilis stabil
    -   Tambahkan saluran khusus platform (misal, "ios-hotfix" dengan versi 121) saat menangani masalah spesifik platform
-   **Konfigurasi Kebijakan Pembaruan**: Kontrol bagaimana pembaruan diterapkan menggunakan opsi konfigurasi Capgo. Misalnya:
    
    [[CODE_BLOCK]]
    
    Pengaturan ini memastikan bahwa pengguna secara otomatis menerima pembaruan patch, sementara pembaruan minor dan major memerlukan persetujuan manual
    
-   **Strategi Rollback Versi**: Gunakan pengidentifikasi pra-rilis untuk mempertahankan opsi rollback yang jelas. Pendekatan ini memungkinkan Anda kembali ke versi sebelumnya jika terjadi masalah, sambil menjaga konsistensi versi di semua saluran
    

Praktik terbaik ini memudahkan pengelolaan pembaruan, pengujian fitur baru, dan mempertahankan stabilitas dalam proses deployment aplikasi Anda

###### sbb-itb-f9944d2

## Deployment Pembaruan OTA

Setelah pengaturan manajemen versi Anda siap, ikuti langkah-langkah ini untuk men-deploy pembaruan OTA secara efektif

### Persiapan Pembaruan

Mulai dengan memperbarui versi di **package.json** dan **capacitor.config.json**. Pastikan versi mengikuti format SemVer (MAJOR.MINOR.PATCH):

-   **Perbaikan Bug**: Tingkatkan nomor PATCH (misal, 1.0.1 → 1.0.2)
-   **Fitur Baru**: Tingkatkan nomor MINOR (misal, 1.0.0 → 1.1.0)
-   **Perubahan Breaking**: Tingkatkan nomor MAJOR (misal, 1.0.0 → 2.0.0)

Uji build Anda secara menyeluruh dan konfirmasi aplikasi berkomunikasi dengan server menggunakan `notifyAppReady`

Selanjutnya, tentukan [strategi pembaruan](https://capgoapp/docs/plugin/cloud-mode/hybrid-update) Anda. Anda dapat memilih dari:

-   **Auto-Update**: Secara otomatis menegakkan persyaratan versi minimum
-   **Kontrol Manual**: Tentukan persyaratan versi yang tepat untuk pembaruan
-   **Berbasis Saluran**: Gunakan saluran untuk pengujian dan peluncuran bertahap

### Perintah Pembaruan CLI Capgo

Gunakan CLI Capgo untuk men-deploy pembaruan Anda dengan mudah. Beginilah caranya:

[[CODE_BLOCK]]

Capgo memastikan deployment yang aman dengan enkripsi end-to-end dan manajemen kunci yang aman

> "@Capgo adalah cara cerdas untuk melakukan hot code pushes (dan tidak untuk semua uang di dunia seperti dengan @AppFlow) 🙂"

Setelah di-deploy, Anda dapat memantau pembaruan melalui dashboard Capgo. Pembaruan biasanya mencapai pengguna dalam hitungan menit setelah mereka membuka aplikasi. Prosesnya bekerja seperti ini:

-   Aplikasi memeriksa pembaruan
-   Mengunduh pembaruan di latar belakang
-   Menandai versi baru sebagai aktif ketika pengguna keluar dari aplikasi
-   Menerapkan pembaruan pada peluncuran berikutnya

Untuk deployment tingkat enterprise, Anda mungkin ingin mengintegrasikan otomatisasi CI/CD> "Kami menerapkan pengembangan agile dan @Capgo sangat penting dalam pengiriman berkelanjutan kepada pengguna kami!"

## Pemecahan Masalah dan Tips

### Masalah Manajemen Versi

Mengelola versi semantik di Capgo terkadang dapat memperumit penerapan pembaruan. Untuk menghindari penimpaan pekerjaan pengembangan Anda, konfigurasikan berikut ini di file `capacitor.config.json` Anda:

[[CODE_BLOCK]]

Jika pembaruan gagal, berikut yang dapat Anda lakukan:

-   Atur `autoUpdate` ke `false` selama pengembangan
-   Copot pemasangan aplikasi
-   Pasang ulang dengan versi yang telah dikoreksi
-   Aktifkan kembali pembaruan otomatis setelah semuanya stabil

Untuk pembaruan versi mayor, gunakan flag `disableAutoUpdateBreaking` dan pantau event `majorAvailable` untuk menangani pembaruan dengan benar:

[[CODE_BLOCK]]

Dengan menggabungkan konfigurasi ini dengan praktik tim yang baik, Anda dapat menjaga konsistensi versi dan mengurangi kesalahan.

### Kontrol Versi Tim

Setelah pembaruan individual dikelola, sangat penting bagi tim untuk menetapkan praktik kontrol versi yang kuat.

> "Menguji setiap perubahan sebelum menggabungkannya dengan repositori utama akan memperkuat stabilitas dan menghindari kesalahan yang mahal" [\[4\]](https://www.autorabit.com/blog/9-tips-for-working-on-a-multi-developer-team/)

Berikut beberapa metode untuk memastikan konsistensi:

-   Tetapkan satu cabang sebagai **repositori utama** untuk bertindak sebagai sumber kebenaran
-   Gunakan saluran Capgo terpisah untuk lingkungan pengembangan dan produksi
-   Otomatisasi unggahan versi melalui pipeline CI/CD
-   Dokumentasikan semua perubahan kode dengan pesan commit yang jelas dan detail

Untuk tim yang lebih besar, matriks manajemen versi berikut dapat membantu mengatur pembaruan:

| Lingkungan | Saluran | Pembaruan Otomatis | Pola Versi |
| --- | --- | --- | --- |
| Pengembangan | dev | Dinonaktifkan | 0.x.x |
| Staging | beta | Diaktifkan | x.x.x-beta |
| Produksi | stable | Diaktifkan | x.x.x |

### Langkah Pemulihan Pembaruan

Bahkan dengan tindakan pencegahan, pembaruan dapat gagal. Jika itu terjadi, ikuti langkah pemulihan ini:

1.  Kembali ke bundle stabil sebelumnya
2.  Tingkatkan nomor versi untuk perbaikan baru (catatan: nomor versi tidak dapat digunakan ulang setelah dihapus) [\[2\]](https://github.com/Cap-go/CLI)
3.  Verifikasi pembaruan saat startup aplikasi untuk memastikan semuanya berfungsi sesuai harapan

Pembaruan Capgo dirancang untuk menangani gangguan. Misalnya, jika server tidak dapat dijangkau atau pembaruan dihapus, aplikasi terus berfungsi normal [\[3\]](https://capgo.app/docs/faq/). Selain itu, permintaan jaringan yang gagal secara otomatis dicoba ulang saat aplikasi diluncurkan berikutnya [\[3\]](https://capgo.app/docs/faq/). Ketahanan bawaan ini meminimalkan waktu henti dan memastikan operasi yang lebih lancar.

## Ringkasan

Versi Semantik, dikombinasikan dengan Capgo, telah membuat pembaruan OTA untuk aplikasi Capacitor lebih efisien. Dengan 9.476 juta pembaruan terkirim dan 1.400 aplikasi produksi menggunakan sistem ini [\[1\]](https://capgo.app/), proses penerapan menjadi 81% lebih efisien [\[1\]](https://capgo.app/). Pengaturan ini memungkinkan pengembang untuk mendorong pembaruan dengan cepat dan terkendali, melewati penundaan app store.

Berikut yang dikatakan pengembang:

> "Kami menerapkan [pembaruan OTA Capgo](https://web.capgo.app/resend_email) dalam produksi untuk basis pengguna kami +5000. Kami melihat operasi yang sangat lancar hampir semua pengguna kami terbaru dalam hitungan menit setelah OTA diterapkan ke @Capgo" - colenso [\[1\]](https://capgo.app/)

Sistem versi MAJOR.MINOR.PATCH memudahkan komunikasi perubahan yang merusak, fitur baru, dan perbaikan bug [\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/). Ini sangat membantu untuk tim yang mengelola beberapa rilis setiap minggu melalui platform Capgo.

[Solusi terenkripsi](https://capgo.app/docs/cli/migrations/encryption/) Capgo, terintegrasi dengan alat CI/CD, juga ramah anggaran - memangkas biaya hingga $26.100 selama lima tahun [\[1\]](https://capgo.app/). Saluran yang dapat disesuaikannya memastikan pembaruan mencapai pengguna yang tepat pada waktu yang tepat.