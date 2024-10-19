---
slug: automatic-capacitor-ios-build-github-action
title: Kompilasi Otomatis Capacitor iOS dengan GitHub Actions dan Sertifikat
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi iOS Ionic Anda dengan fastlane
  dan GitHub Actions dalam 5 Menit (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustrasi GitHub Action untuk Fastlane TestFlight
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-android-build-github-action
---

Berikut adalah terjemahan teks ke dalam bahasa Indonesia:

## Pengiriman Berkelanjutan untuk iOS menggunakan Fastlane dan GitHub Actions dan sertifikat

## Prasyarat

Sebelum melanjutkan tutorial ini...

- Pastikan Anda telah [menginstal](https://docsfastlanetools/) Fastlane di mesin pengembangan Anda
- Keanggotaan program pengembang iOS
- Keinginan untuk membaca 😆...

## Penting tentang harga

![Harga GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Layanan ini 'gratis' hingga batas tertentu, tergantung pada mesin yang dipilih
Kita akan menggunakan mesin **_macOS_**, Anda dapat melihat harga dan batasannya di tangkapan layar (harga pada saat pembuatan tutorial, dapat berubah di masa mendatang)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda suka, kita lanjutkan..._**

> **_📣_ Dalam postingan ini kita mengasumsikan bahwa kita telah membuat aplikasi di iTunes Connect, kita memiliki sertifikat dari ekosistem Apple, semuanya akan disalin oleh Fastlane!**

## Mari kita mulai 🧑🏽💻

**Langkah-langkah yang akan diikuti dalam postingan ini**

1. _Menggunakan API App Store Connect dengan Fastlane_
2. _Persyaratan_
3. _Membuat Kunci API App Store Connect_
4. _Menggunakan Kunci API App Store Connect_
5. _Menyalin file Fastlane_
6. _Mengonfigurasi GitHub Actions_

## 1. Menggunakan API App Store Connect dengan Fastlane

> Mulai Februari 2021, autentikasi dua faktor atau verifikasi dua langkah diharuskan untuk semua pengguna yang masuk ke App Store Connect. Lapisan keamanan tambahan ini untuk Apple ID Anda memastikan bahwa hanya Anda yang dapat mengakses akun Anda.
> Dari [Apple Support](https://developerapplecom/support/authentication/)

## Persyaratan

Untuk dapat menggunakan API App Store Connect, Fastlane membutuhkan **tiga** hal:

1. ID Penerbit
2. ID Kunci
3. File Kunci atau Konten Kunci

## Membuat Kunci API App Store Connect

Untuk menghasilkan kunci, Anda harus memiliki izin Admin di App Store Connect. Jika Anda tidak memiliki izin tersebut, Anda dapat mengarahkan orang yang relevan ke artikel ini dan mengikuti instruksi berikut

1 — Masuk ke [App Store Connect](https://appstoreconnectapplecom/)

2 — Pilih [Users and Access](https://appstoreconnectapplecom/access/users/)

![Akses pengguna App Store Connect](/select_user_accesswebp)

3 — Pilih tab API Keys

![Kunci API App Store Connect](/user_access_keyswebp)

4 — Klik Generate API Key atau tombol Tambah (+)

![Buat kunci API App Store Connect](/user_accesswebp)

5 — Masukkan nama untuk kunci tersebut. Nama ini hanya untuk referensi Anda dan bukan bagian dari kunci itu sendiri

![Buat nama kunci API App Store Connect](/gen_keywebp)

6 — Di bawah Access, pilih peran untuk kunci tersebut. Peran yang berlaku untuk kunci sama dengan peran yang berlaku untuk pengguna di tim Anda. Lihat [izin peran](https://helpapplecom/app-store-connect/#/deve5f9a89d7/). Kami menyarankan untuk memilih **App management**

7 — Klik Generate

> **Akses kunci API tidak dapat dibatasi untuk aplikasi tertentu**

Nama kunci baru, ID kunci, tautan unduhan, dan informasi lainnya muncul di halaman

![Unduh kunci App Store Connect](/download_keywebp)

Anda dapat mengambil ketiga informasi yang diperlukan di sini:
<1> ID Penerbit
<2> ID Kunci
<3> Klik "Download API Key" untuk mengunduh kunci pribadi API Anda. Tautan unduhan hanya muncul jika kunci pribadi belum pernah diunduh. Apple tidak menyimpan salinan kunci pribadi. Jadi, Anda hanya dapat mengunduhnya satu kali

> _🔴_ Simpan kunci pribadi Anda di tempat yang aman. Anda tidak boleh membagikan kunci Anda, menyimpan kunci di repositori kode, atau menyertakan kunci dalam kode sisi klien

## Menggunakan Kunci API App Store Connect

File Kunci API (file p8 yang Anda unduh), ID kunci, dan ID penerbit diperlukan untuk membuat token JWT untuk otorisasi. Ada beberapa cara informasi ini dapat dimasukkan ke Fastlane menggunakan aksi baru Fastlane, `app_store_connect_api_key`. Anda dapat mempelajari cara lainnya di [dokumentasi Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/)Saya menunjukkan metode ini karena menurut saya ini adalah cara termudah untuk bekerja dengan sebagian besar CI di luar sana, di mana Anda dapat mengatur variabel lingkungan

_Sekarang kita dapat mengelola Fastlane dengan kunci API App Store Connect, bagus!_

### Membuat sertifikat dan profil penyediaan

#### Sertifikat

Buka XCode dan pergi ke **Pengaturan** > **Akun** > **Apple ID** > **Tim** dan pilih tim Anda

![Identitas penandatanganan kode](/code_signing_identitieswebp)

Klik pada **Kelola sertifikat** > **+** dan pilih **Apple Distribution**

![Apple Distribution](/apple_distributionwebp)

Kemudian Anda dapat membuat sertifikat baru

Lalu Anda perlu pergi ke keychain untuk mengunduh sertifikat sebagai file `p12`

Untuk melakukannya, Anda perlu pergi ke keychain beralih ke keychain **login** dan kemudian tab **Sertifikat Saya**

![Sertifikat Saya](/my_certificateswebp)

Kemudian Anda dapat memilih sertifikat yang ingin Anda unduh (Lihat berdasarkan tanggal sertifikat)

Dan kemudian klik kanan pada sertifikat dan pilih **Ekspor**

Pilih format file **Personal Information Exchange (p12)**

Itu akan mengunduh sertifikat sebagai file `p12`

#### Profil penyediaan

Buka [Apple Developer](https://developerapplecom/account/resources/profiles/list) dan pilih tim yang benar

Kemudian buat profil baru, dengan mengklik **+**

![Buat profil baru](/create_new_profilewebp)

Dan pilih **App Store Connect**

![Pilih App Store Connect](/select_app_store_connectwebp)

Kemudian Anda perlu memilih aplikasi yang benar, berhati-hatilah Anda tidak dapat menggunakan wildcard karena penandatanganan akan gagal

![Pilih aplikasi yang benar](/select_appwebp)

Pilih sertifikat yang benar yang Anda buat sebelumnya (cari tanggal kedaluwarsa yang seharusnya sama hari dan bulan dengan hari ini) dan klik **Lanjutkan**

![Pilih sertifikat yang benar](/select_certificatewebp)

Terakhir masukkan nama profil dan klik **Hasilkan**

> Nama akan digunakan untuk mengidentifikasi profil di Fastlane, di bawah nilai `APPLE_PROFILE_NAME`

![Hasilkan profil](/generate_profilewebp)

Anda dapat mengunduh profil sebagai file `mobileprovision`

![Unduh profil](/download_profilewebp)


### Membuat rahasia GitHub untuk sertifikat dan profil penyediaan Anda

Proses penandatanganan melibatkan penyimpanan sertifikat dan profil penyediaan, mentransfernya ke runner, mengimpornya ke keychain runner, dan menggunakannya dalam build Anda

Buat rahasia di repositori atau organisasi Anda untuk item-item berikut:

- Sertifikat penandatanganan Apple Anda
    
    - Ini adalah file sertifikat `p12` Anda. Untuk informasi lebih lanjut tentang mengekspor sertifikat penandatanganan Anda dari Xcode, lihat [dokumentasi Xcode](https://helpapplecom/xcode/mac/current/#/dev154b28f09)
        
    - Anda harus mengonversi sertifikat Anda ke Base64 saat menyimpannya sebagai rahasia. Dalam contoh ini, rahasia tersebut diberi nama `BUILD_CERTIFICATE_BASE64`
        
    - Gunakan perintah berikut untuk mengonversi sertifikat Anda ke Base64 dan menyalinnya ke clipboard Anda:
        
        ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```
        
- Kata sandi untuk sertifikat penandatanganan Apple Anda
    
    - Dalam contoh ini, rahasia tersebut diberi nama `P12_PASSWORD`
- Profil penyediaan Apple Anda
    
    - Untuk informasi lebih lanjut tentang mengekspor profil penyediaan Anda dari Xcode, lihat [dokumentasi Xcode](https://helpapplecom/xcode/mac/current/#/deva899b4fe5)
        
    - Anda harus mengonversi profil penyediaan Anda ke Base64 saat menyimpannya sebagai rahasia. Dalam contoh ini, rahasia tersebut diberi nama `BUILD_PROVISION_PROFILE_BASE64`
        
    - Gunakan perintah berikut untuk mengonversi profil penyediaan Anda ke Base64 dan menyalinnya ke clipboard Anda:
        
        ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```


## 2. Salin file Fastlane

Fastlane adalah pustaka Ruby yang dibuat untuk mengotomatisasi tugas-tugas pengembangan mobile yang umum. Menggunakan Fastlane, Anda dapat mengonfigurasi "lane" khusus yang menggabungkan serangkaian "aksi" yang melakukan tugas-tugas yang biasanya Anda lakukan menggunakan Android studio. Anda dapat melakukan banyak hal dengan Fastlane, tetapi untuk tujuan tutorial ini, kita hanya akan menggunakan beberapa aksi inti.Berikut adalah terjemahan teks ke dalam bahasa Indonesia:

Buat folder Fastlane di root proyek Anda dan salin file-file berikut:
Fastfile

## **Pemrosesan Build**

Di GitHub Actions, **Anda ditagih berdasarkan menit** yang telah Anda gunakan untuk menjalankan alur kerja CI/CD Anda. Berdasarkan pengalaman, dibutuhkan sekitar 10-15 menit sebelum build dapat diproses di App Store Connect.

Untuk proyek pribadi, perkiraan biaya per build bisa mencapai **$0,08/menit x 15 menit = $1,2**, atau lebih, tergantung pada konfigurasi atau dependensi proyek Anda.

Jika Anda memiliki kekhawatiran yang sama tentang harga seperti saya untuk proyek pribadi, Anda dapat membiarkan `skip_waiting_for_build_processing` tetap `true`.

Apa kekurangannya? Anda harus memperbarui kepatuhan aplikasi Anda secara manual di App Store Connect setelah build selesai diproses, agar dapat mendistribusikan build kepada pengguna Anda.

Ini hanya parameter opsional yang dapat diperbarui jika Anda ingin menghemat menit build untuk proyek pribadi. Untuk proyek gratis, ini seharusnya tidak menjadi masalah sama sekali. Lihat [harga](https://github.com/pricing/)

## 3. Menyiapkan GitHub Actions

**Konfigurasi GitHub secrets**

Pernah bertanya-tanya dari mana nilai `ENV` berasal? Yah, itu bukan rahasia lagi - itu berasal dari secret proyek Anda 🤦

![Atur GitHub secrets](/github_secrets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - ID tim App Store Connect Anda jika Anda berada di beberapa tim

2. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, misalnya `match AppStore com.domain.blabla.demo`

3. `BUILD_CERTIFICATE_BASE64` - Sertifikat yang di-encode Base64

4. `BUILD_PROVISION_PROFILE_BASE64` - Profil provisioning yang di-encode Base64

5. `BUNDLE_IDENTIFIER` - pengenal bundle aplikasi Anda

6. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID

7. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID

8. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 Konten kunci _p8_, [periksa ini](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4. Konfigurasi file alur kerja GitHub**

Buat direktori alur kerja GitHub

Di dalam folder `workflow`, buat file bernama `build-upload-ios.yml` dan tambahkan yang berikut

Alur kerja ini harus dipicu setelah setiap _tag_ GitHub, jika Anda perlu mengotomatisasi tag, silakan lihat [Pembangunan dan rilis otomatis dengan GitHub actions](/blog/automatic-build-and-release-with-github-actions/) terlebih dahulu.

Kemudian alur kerja ini akan menarik dependensi NodeJS Anda, menginstalnya, dan membangun aplikasi JavaScript Anda.

> Setiap kali Anda mengirim commit baru, rilis akan dibangun di TestFlight

Aplikasi Anda tidak perlu menggunakan Ionic, hanya basis Capacitor yang wajib, dapat memiliki modul Cordova lama, tetapi plugin Capacitor JS harus diutamakan.

## 5. Memicu alur kerja

**Buat Commit**

Buat _commit_, Anda akan melihat alur kerja aktif di repositori.

**Memicu alur kerja**

Dorong commit baru ke cabang `main` atau `development` untuk memicu alur kerja.

![Dimulai dengan commit](/cd_started.webp)

Setelah beberapa menit, build seharusnya tersedia di dasbor App Store Connect Anda.

![Dasbor Testflight](/testflight_app.webp)

## Bisakah deploy dari mesin lokal?

Ya, Anda bisa, dan itu sangat mudah.

Anda dapat menggunakan Xcode untuk membangun dan menandatangani aplikasi Anda, seperti biasa.

### Terima kasih

Blog ini didasarkan pada artikel-artikel berikut:
- [Pengiriman berkelanjutan untuk IOS menggunakan Fastlane dan GitHub actions](https://lito.arias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Dokumentasi Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Pesan GitHub ini dari @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Dokumentasi GitHub ini](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)