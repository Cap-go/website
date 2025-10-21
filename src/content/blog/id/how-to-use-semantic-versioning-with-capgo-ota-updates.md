---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: Cara Menggunakan Semantic Versioning dengan Pembaruan OTA Capgo
description: >-
  Pelajari cara merampingkan pembaruan aplikasi dan pengendalian versi
  menggunakan Semantic Versioning dengan pembaruan OTA Capgo untuk aplikasi
  Capacitor.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2025-10-21T10:46:26.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
**Ingin menyederhanakan [pembaruan aplikasi](https://capgo.app/plugins/capacitor-updater/) dan kontrol versi?** Semantic Versioning (SemVer) yang digabungkan dengan pembaruan Over-The-Air (OTA) dari [Capgo](https://capgo.app/) membuat pengelolaan aplikasi [Capacitor](https://capacitorjs.com/) menjadi lebih mudah dan cepat. Berikut adalah caranya:

-   **Dasar-Dasar Semantic Versioning:** Versi menggunakan format `MAJOR.MINOR.PATCH`:
    
    -   **MAJOR:** Untuk perubahan yang merusak.
    -   **MINOR:** Untuk fitur baru yang kompatibel dengan versi sebelumnya.
    -   **PATCH:** Untuk perbaikan bug.
-   **Mengapa Menggunakan SemVer dengan Capgo?**
    
    -   Komunikasi yang jelas mengenai pembaruan.
    -   Manajemen versi yang lebih cerdas.
    -   Hindari konflik ketergantungan.
    -   Perencanaan rilis yang terorganisir.
-   **Langkah-Langkah [Pengaturan Capgo](https://capgo.app/docs/cli/commands/):**
    
    1.  Instal plugin pembaruan Capgo.
    2.  Konfigurasikan versi aplikasi Anda di `capacitor.config.json` dan file lainnya.
    3.  Inisialisasi dengan kunci API Anda.
    4.  Gunakan [Capgo CLI](https://capgo.app/docs/cli/commands) untuk mengemas dan mengunggah pembaruan.
-   **[Kelola Versi dan Saluran](https://capgo.app/docs/webapp/channels/):**
    
    -   Gunakan saluran terpisah (misalnya, "beta" untuk pengujian, "production" untuk rilis stabil).
    -   Kontrol kebijakan pembaruan (patch auto-update, persetujuan manual untuk perubahan besar).
    -   Opsi rollback untuk pembaruan yang gagal.
-   **Proses Penerapan:**
    
    -   Perbarui nomor versi mengikuti aturan SemVer.
    -   Uji secara menyeluruh sebelum menerapkan.
    -   Gunakan perintah CLI untuk mengunggah dan mendistribusikan pembaruan.

Capgo memastikan pembaruan tiba kepada pengguna dengan cepat dan dapat diandalkan, dengan alat untuk menangani gangguan dan menjaga stabilitas. Sempurna untuk tim yang menggunakan alur kerja CI/CD untuk mengotomatisasi pembaruan.

**Tip Cepat:** Selalu uji pembaruan dan gunakan saluran untuk mengelola peluncuran bertahap secara efektif.

## Semantic Versioning | Tingkatkan

## [Panduan Pengaturan Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

Berikut adalah cara mengatur Capgo untuk mengelola pembaruan OTA dan kontrol versi dengan mudah.

### Langkah Pengaturan Awal

Mulai dengan menginstal [plugin pembaruan Capgo](https://capgo.app/docs/plugin/self-hosted/manual-update/):

Pastikan file `capacitor.config.json` Anda menggunakan format versi semantik:

Untuk proyek yang lebih lama, perbarui rincian versi di lokasi-lokasi ini:

-   `package.json` (cari field `version`)
-   `android/app/build.gradle` (perbarui `versionName`)
-   `ios/App/App.xcodeproj/project.pbxproj` (perbarui `CURRENT_PROJECT_VERSION`)

Setelah dikonfigurasi, inisialisasi Capgo dengan kunci API Anda:

**Tabel Referensi Cepat:**

| Fase Pengaturan | Tindakan Kunci | Langkah Verifikasi |
| --- | --- | --- |
| Instalasi | Instal plugin dan sinkronisasi | Periksa `package.json` |
| Konfigurasi | Atur nomor versi | Verifikasi di semua file |
| Inisialisasi | Sambungkan dengan kunci API | Uji status koneksi |
| Build | Buat bundel awal | Konfirmasi keberhasilan unggahan |

### Integrasi Kontrol Versi

Capgo bekerja baik dengan platform CI/CD, membuat [pembaruan otomatis](https://capgo.app/docs/live-updates/update-behavior/) menjadi sederhana. Platform yang didukung meliputi:

-   [GitHub Actions](https://docs.github.com/actions)
-   [GitLab CI](https://docs.gitlab.com/ee/ci/)
-   [Azure DevOps](https://azure.microsoft.com/en-us/products/devops)
-   [Jenkins](https://www.jenkins.io/)
-   [CircleCI](https://circleci.com/)

Jika Anda bekerja pada pengembangan lokal, Anda dapat menonaktifkan pembaruan otomatis dengan menambahkan ini ke konfigurasi Anda:

Ini memastikan Capgo tidak akan menimpa perubahan lokal Anda. Setelah pengaturan Anda siap, unggah versi pertama Anda:

Akhirnya, beri tahu plugin asli tentang kesehatan bundel di file utama aplikasi Anda:

Pengaturan ini memastikan aplikasi Anda siap untuk penerapan OTA yang mulus dan manajemen versi.

## Menggunakan Semantic Versioning dengan Capgo

### Manajemen Nomor Versi

Capgo menggunakan Semantic Versioning (SemVer) untuk mengelola versi aplikasi, diformat sebagai **MAJOR.MINOR.PATCH**. Berikut adalah cara kerjanya:

-   **Versi Mayor (X.0.0)**: Tingkatkan nomor MAJOR untuk perubahan yang merusak kompatibilitas.
-   **Versi Minor (1.X.0)**: Tingkatkan nomor MINOR untuk fitur baru yang tetap kompatibel.
-   **Versi Patch (1.0.X)**: Tingkatkan nomor PATCH untuk perbaikan bug yang tidak mempengaruhi kompatibilitas.

| Tipe Versi | Kapan Harus Menambah | [Perilaku Auto-Update](https://capgo.app/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| Mayor (X.0.0) | Untuk perubahan API yang merusak | Membutuhkan persetujuan manual |
| Minor (1.X.0) | Untuk fitur baru | Dapat dikonfigurasi di Capgo |
| Patch (1.0.X) | Untuk perbaikan bug | Biasanya otomatis |

Dengan mematuhi aturan SemVer, Anda dapat menyederhanakan manajemen versi dan memastikan pembaruan yang lebih lancar di semua saluran penerapan Anda.

### Pedoman Kontrol Versi

Capgo memungkinkan Anda untuk mengelola penerapan secara efektif dengan menyiapkan saluran yang berbeda untuk tahap-tahap alur kerja Anda.

-   **[Manajemen Versi Berbasis Saluran](https://capgo.app/docs/webapp/channels/)**: Atur proses penerapan Anda dengan membuat saluran terpisah untuk pengujian dan produksi. Misalnya:
    
    -   Gunakan saluran "beta" (misalnya, 1.2.0-beta) untuk menguji fitur baru.
    -   Pertahankan saluran "produksi" (misalnya, 1.2.0) untuk rilis stabil.
    -   Tambahkan saluran khusus platform (misalnya, "ios-hotfix" dengan versi 1.2.1) saat menangani masalah khusus platform.
-   **Konfigurasi Kebijakan Pembaruan**: Kontrol bagaimana pembaruan diterapkan menggunakan opsi konfigurasi Capgo. Misalnya:
    
    Pengaturan ini memastikan bahwa pengguna secara otomatis menerima pembaruan patch, sementara pembaruan minor dan mayor memerlukan persetujuan manual.
    
-   **Strategi Rollback Versi**: Gunakan pengidentifikasi pra-rilis untuk mempertahankan opsi rollback yang jelas. Pendekatan ini memungkinkan Anda untuk kembali ke versi sebelumnya jika terjadi masalah, sambil menjaga konsistensi versi di semua saluran.
    

Praktik terbaik ini memudahkan untuk mengelola pembaruan, menguji fitur baru, dan menjaga stabilitas dalam proses penerapan aplikasi Anda.

## Penerapan Pembaruan OTA

Setelah pengaturan manajemen versi Anda siap, ikuti langkah-langkah ini untuk menerapkan pembaruan OTA dengan efektif.

### Persiapan Pembaruan

Mulai dengan memperbarui versi di **package.json** dan **capacitor.config.json**. Pastikan versi mengikuti format SemVer (MAJOR.MINOR.PATCH):

-   **Perbaikan Bug**: Tingkatkan nomor PATCH (misalnya, 1.0.1 → 1.0.2)
-   **Fitur Baru**: Tingkatkan nomor MINOR (misalnya, 1.0.0 → 1.1.0)
-   **Perubahan Merusak**: Tingkatkan nomor MAJOR (misalnya, 1.0.0 → 2.0.0)

Uji build Anda secara menyeluruh dan konfirmasikan aplikasi berkomunikasi dengan server menggunakan `notifyAppReady`.

Selanjutnya, tentukan [strategi pembaruan](https://capgo.app/docs/plugin/cloud-mode/hybrid-update) Anda. Anda dapat memilih dari:

-   **Auto-Update**: Secara otomatis menegakkan persyaratan versi minimum.
-   **Kontrol Manual**: Tentukan persyaratan versi yang tepat untuk pembaruan.
-   **Berbasis Saluran**: Gunakan saluran untuk pengujian dan peluncuran bertahap.

### Perintah Pembaruan Capgo CLI

Gunakan CLI Capgo untuk menerapkan pembaruan Anda dengan mudah. Berikut caranya:

Capgo memastikan penerapan yang aman dengan enkripsi end-to-end dan manajemen kunci yang aman.

> "@Capgo adalah cara cerdas untuk melakukan pembaruan kode panas (dan bukan untuk semua uang di dunia seperti dengan @AppFlow) 🙂"

Setelah diterapkan, Anda dapat memantau pembaruan melalui dasbor Capgo. Pembaruan biasanya tiba kepada pengguna dalam hitungan menit setelah mereka membuka aplikasi. Prosesnya bekerja seperti ini:

-   Aplikasi memeriksa pembaruan.
-   Mengunduh pembaruan di latar belakang.
-   Menandai versi baru sebagai aktif ketika pengguna keluar dari aplikasi.
-   Menerapkan pembaruan pada peluncuran berikutnya.

Untuk penerapan tingkat perusahaan, Anda mungkin ingin mengintegrasikan otomatisasi CI/CD.

> "Kami menerapkan pengembangan gesit dan @Capgo sangat penting dalam memberikan layanan terus-menerus kepada pengguna kami!"

## Memecahkan Masalah dan Tips

### Masalah Manajemen Versi

Mengelola versioning semantik di Capgo kadang-kadang dapat mempersulit penerapan pembaruan. Untuk menghindari menimpa pekerjaan pengembangan Anda, konfigurasikan berikut dalam file `capacitor.config.json` Anda:

Jika pembaruan gagal, berikut yang dapat Anda lakukan:

-   Atur `autoUpdate` ke `false` selama pengembangan.
-   Hapus aplikasi.
-   Instal ulang dengan versi yang benar.
-   Aktifkan kembali pembaruan otomatis setelah semuanya stabil.

Untuk pembaruan versi mayor, gunakan flag `disableAutoUpdateBreaking` dan dengarkan acara `majorAvailable` untuk menangani pembaruan dengan benar:

Dengan menggabungkan konfigurasi ini dengan praktik tim yang baik, Anda dapat menjaga konsistensi versi dan mengurangi kesalahan.

### Kontrol Versi Tim

Setelah pembaruan individu dikelola, penting bagi tim untuk menetapkan praktik kontrol versi yang kuat.

> "Mengujicoba setiap perubahan sebelum menggabungkannya dengan repositori utama akan memperkuat stabilitas dan menghindari kesalahan yang mahal" [\[4\]](https://www.autorabit.com/blog/9-tips-for-working-on-a-multi-developer-team/)

Berikut beberapa metode untuk memastikan konsistensi:

-   Tetapkan satu cabang sebagai **repositori utama** untuk bertindak sebagai sumber kebenaran.
-   Gunakan saluran Capgo terpisah untuk lingkungan pengembangan dan produksi.
-   Otomatisasi unggahan versi melalui pipeline CI/CD.
-   Dokumentasikan semua perubahan kode dengan pesan commit yang jelas dan rinci.

Untuk tim yang lebih besar, matriks manajemen versi berikut dapat membantu mengatur pembaruan:

| Lingkungan | Saluran | Pembaruan Otomatis | Pola Versi |
| --- | --- | --- | --- |
| Pengembangan | dev | Dinonaktifkan | 0.x.x |
| Staging | beta | Diaktifkan | x.x.x-beta |
| Produksi | stabil | Diaktifkan | x.x.x |

### Langkah Pemulihan Pembaruan

Bahkan dengan langkah-langkah pencegahan, pembaruan dapat gagal. Jika itu terjadi, ikuti langkah-langkah pemulihan berikut:

1.  Kembalikan ke paket stabil sebelumnya.
2.  Tingkatkan nomor versi untuk setiap perbaikan baru (catatan: nomor versi tidak dapat digunakan kembali setelah dihapus) [\[2\]](https://github.com/Cap-go/CLI).
3.  Verifikasi pembaruan saat startup aplikasi untuk memastikan semuanya berfungsi seperti yang diharapkan.

Pembaruan dari Capgo dirancang untuk menangani gangguan. Misalnya, jika server tidak dapat dijangkau atau pembaruan dihapus, aplikasi terus berfungsi normal [\[3\]](https://capgo.app/docs/faq/). Selain itu, permintaan jaringan yang gagal secara otomatis dicoba kembali saat peluncuran aplikasi berikutnya [\[3\]](https://capgo.app/docs/faq/). Ketahanan bawaan ini meminimalkan waktu henti dan memastikan operasi berjalan lebih lancar.

## Ringkasan

Versi Semantik, yang dikombinasikan dengan Capgo, telah membuat pembaruan OTA untuk aplikasi Capacitor lebih efisien. Dengan 947,6 juta pembaruan yang disampaikan dan 1.400 aplikasi produksi yang menggunakan sistem ini [\[1\]](https://capgo.app/), proses penerapan telah menjadi 81% lebih efisien [\[1\]](https://capgo.app/). Pengaturan ini memungkinkan pengembang untuk mengirim pembaruan dengan cepat dan dengan cara yang terkontrol, menghindari keterlambatan di toko aplikasi.

Berikut adalah apa yang dikatakan pengembang:

> "Kami meluncurkan [pembaruan OTA Capgo](https://web.capgo.app/resend_email) di produksi untuk basis pengguna kami lebih dari 5000. Kami melihat operasi yang sangat lancar hampir semua pengguna kami diperbarui dalam waktu beberapa menit setelah OTA diterapkan di @Capgo." - colenso [\[1\]](https://capgo.app/)

Sistem penomoran versi MAJOR.MINOR.PATCH memudahkan untuk mengomunikasikan perubahan besar, fitur baru, dan perbaikan bug [\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/). Ini sangat membantu untuk tim yang mengelola beberapa rilis setiap minggu melalui platform Capgo.

Solusi [terenskripsi Capgo](https://capgo.app/docs/cli/migrations/encryption/) yang terintegrasi dengan alat CI/CD juga ramah anggaran - memangkas biaya hingga $26.100 selama lima tahun [\[1\]](https://capgo.app/). Kanal yang dapat disesuaikan memastikan pembaruan mencapai pengguna yang tepat pada waktu yang tepat.

> "Kami menerapkan pengembangan lincah dan @Capgo sangat penting dalam memberikan secara terus-menerus kepada pengguna kami!" - Rodrigo Mantica [\[1\]](https://capgo.app/)
