---
slug: id__automatic-capacitor-ios-build-codemagic
title: Kompilasi Otomatis Capacitor iOS dengan Codemagic
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi IOS Ionic Anda dengan Codemagic
  dalam 5 Menit (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Ilustrasi Testflight dari Codemagic
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-android-build-codemagic
---

Berikut adalah terjemahan teks tersebut ke dalam bahasa Indonesia:

## Pengiriman Berkelanjutan untuk iOS menggunakan Codemagic

## Prasyarat

Sebelum melanjutkan tutorial...

- Keanggotaan program pengembang iOS 
- Keinginan untuk membaca 😆...

## Penting tentang harga

![Harga Tindakan Codemagic](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Layanan ini 'gratis' hingga 500 menit macOS M1 / bulan, tergantung mesin yang dipilih
Kita akan menggunakan mesin **_macOS M1_**, Anda dapat melihat harga dan batasannya di tangkapan layar (harga pada saat pembuatan tutorial, mungkin berubah di masa mendatang)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda suka, kita lanjutkan..._**

> **_📣_ Dalam posting ini kami berasumsi bahwa kami telah membuat aplikasi di iTunes Connect, kami memiliki sertifikat dari ekosistem Apple, semuanya akan diatur oleh Codemagic!**

## Mari kita mulai 🧑🏽‍💻

**Langkah-langkah yang akan diikuti dalam posting ini**

1. _Menggunakan App Store Connect API dengan Codemagic_
2. _Persyaratan_
3. _Membuat Kunci API App Store Connect_
4. _Menggunakan Kunci API App Store Connect_
5. _Menyalin file Fastlane_
6. _Mengonfigurasi Codemagic_

## 1. Menggunakan App Store Connect API dengan Codemagic

> Mulai Februari 2021, autentikasi dua faktor atau verifikasi dua langkah diperlukan untuk semua pengguna untuk masuk ke App Store Connect. Lapisan keamanan tambahan ini untuk Apple ID Anda membantu memastikan bahwa hanya Anda yang dapat mengakses akun Anda.
> Dari [Dukungan Apple](https://developer.apple.com/support/authentication/)

> Memulai dengan match mengharuskan Anda mencabut sertifikat yang ada. Tapi jangan khawatir, Anda akan langsung mendapatkan yang baru.

### Persyaratan

Untuk dapat menggunakan App Store Connect API, Codemagic membutuhkan **tiga** hal

1. ID Penerbit
2. ID Kunci
3. File Kunci atau Konten Kunci

### Membuat Kunci API App Store Connect

Untuk menghasilkan kunci, Anda harus memiliki izin Admin di App Store Connect. Jika Anda tidak memiliki izin tersebut, Anda dapat mengarahkan orang yang relevan ke artikel ini dan mengikuti instruksi berikut

1 — Masuk ke [App Store Connect](https://appstoreconnect.apple.com/)

2 — Pilih [Pengguna dan Akses](https://appstoreconnect.apple.com/access/users/)

![Akses pengguna App Store Connect](/select_user_access.webp)

3 — Pilih tab Kunci API

![Kunci API App Store Connect](/user_access_keys.webp)

4 — Klik Hasilkan Kunci API atau tombol Tambah (+)

![Buat kunci API App Store Connect](/user_access.webp)

5 — Masukkan nama untuk kunci dan pilih tingkat akses. Kami merekomendasikan untuk memilih hak akses `App Manager`, baca lebih lanjut tentang izin peran Program Pengembang Apple [di sini](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![Buat nama kunci API App Store Connect](/gen_key.webp)

6 — Klik Hasilkan

> **Akses kunci API tidak dapat dibatasi hanya untuk aplikasi tertentu**

Nama kunci baru, ID kunci, tautan unduhan, dan informasi lainnya muncul di halaman

![Unduh kunci App Store Connect](/download_key.webp)

Dapatkan ketiga informasi yang diperlukan di sini:
<1> ID Penerbit  
<2> ID Kunci  
<3> Klik "Unduh Kunci API" untuk mengunduh kunci pribadi API Anda. Tautan unduhan hanya muncul jika kunci pribadi belum diunduh. Apple tidak menyimpan salinan kunci pribadi. Jadi, Anda hanya dapat mengunduhnya sekali

> _🔴_ Simpan kunci pribadi Anda di tempat yang aman. Anda tidak boleh membagikan kunci Anda, menyimpan kunci di repositori kode, atau menyertakan kunci dalam kode sisi klien

### Menambahkan kunci API App Store Connect ke Codemagic

1. Buka pengaturan Tim Codemagic Anda,
![Pilih integrasi Tim](/select_team.webp)
![Buka tim](/open_team.webp)
Pilih identitas penandatanganan kode
![Pilih identitas penandatanganan kode](/select_code_signing_identities.webp)
Dan unggah sertifikat
![Unggah sertifikat](/upload_certificate.webp)

2. Klik tombol **Tambah kunci**
3. Masukkan `Nama kunci API App Store Connect`. Ini adalah nama yang dapat dibaca manusia untuk kunci yang akan digunakan untuk merujuk kunci tersebut nanti dalam pengaturan aplikasi
4. Masukkan nilai `ID Penerbit` dan `ID Kunci`
5. Klik pada **PilihBerikut adalah terjemahan teks tersebut ke dalam bahasa Indonesia:

file p8** atau seret file untuk mengunggah kunci API App Store Connect yang telah diunduh sebelumnya
6. Klik **Simpan**

_Sekarang kita dapat mengelola Codemagic dengan kunci API App Store Connect, bagus!_


## 2. Membuat sertifikat dan profil penyediaan


#### Sertifikat

Buka XCode dan pergi ke **Pengaturan** > **Akun** > **Apple ID** > **Tim** dan pilih tim Anda

![Identitas penandatanganan kode](/code_signing_identities.webp)

Klik pada **Kelola sertifikat** > **+** dan pilih **Apple Distribution**

![Apple Distribution](/apple_distribution.webp)

Kemudian Anda dapat membuat sertifikat baru

Selanjutnya Anda perlu pergi ke keychain untuk mengunduh sertifikat sebagai file `p12`

Untuk melakukannya, Anda perlu pergi ke keychain beralih ke keychain **login** dan kemudian tab **Sertifikat Saya**

![Sertifikat Saya](/my_certificates.webp)

Kemudian Anda dapat memilih sertifikat yang ingin Anda unduh (Lihat berdasarkan tanggal sertifikat)

Dan kemudian klik kanan pada sertifikat dan pilih **Ekspor**

Pilih format file **Personal Information Exchange (p12)**

Itu akan mengunduh sertifikat sebagai file `p12`

#### Profil penyediaan

Buka [Apple Developer](https://developer.apple.com/account/resources/profiles/list) dan pilih tim yang tepat

Kemudian buat profil baru, dengan mengklik **+** 

![Buat profil baru](/create_new_profile.webp)

Dan pilih **App Store Connect** 

![Pilih App Store Connect](/select_app_store_connect.webp)

Kemudian Anda perlu memilih aplikasi yang tepat, berhati-hatilah Anda tidak dapat menggunakan wildcard karena penandatanganan akan gagal

![Pilih aplikasi yang tepat](/select_app.webp)

Pilih sertifikat yang tepat yang Anda buat sebelumnya (cari tanggal kedaluwarsa, seharusnya sama dengan hari dan bulan hari ini) dan klik **Lanjutkan**

![Pilih sertifikat yang tepat](/select_certificate.webp)

Akhirnya masukkan nama profil dan klik **Buat** 

> Nama tersebut akan digunakan untuk mengidentifikasi profil di Codemagic

![Buat profil](/generate_profile.webp)

Anda dapat mengunduh profil sebagai file `mobileprovision`

![Unduh profil](/download_profile.webp)


### Menambahkan sertifikat penandatanganan kode

Codemagic memungkinkan Anda mengunggah sertifikat penandatanganan kode sebagai arsip PKCS#12 yang berisi sertifikat dan kunci pribadi yang diperlukan untuk menggunakannya. Saat mengunggah, Codemagic akan meminta Anda untuk memberikan kata sandi sertifikat (jika sertifikat dilindungi kata sandi) bersama dengan **Nama referensi** yang unik, yang kemudian dapat digunakan dalam konfigurasi `codemagic.yml` untuk mengambil file tertentu

- Unggah sertifikat
- Buat sertifikat baru
- Ambil dari Portal Pengembang

1. Buka pengaturan Tim Codemagic Anda, pergi ke **pengaturan codemagic.yml** > **Identitas penandatanganan kode**
2. Buka tab **Sertifikat iOS**
3. Unggah file sertifikat dengan mengklik **Pilih file p12 atau pem** atau dengan menyeretnya ke dalam bingkai yang ditunjukkan
4. Masukkan **Kata sandi sertifikat** dan pilih **Nama referensi**
5. Klik **Tambah sertifikat**

### Menambahkan profil penyediaan

Codemagic memungkinkan Anda mengunggah profil penyediaan untuk digunakan untuk aplikasi atau mengambil profil dari Portal Pengembang Apple

Jenis profil, tim, id bundle, dan tanggal kedaluwarsa ditampilkan untuk setiap profil yang ditambahkan ke Identitas penandatanganan kode. Selanjutnya, Codemagic akan memberi tahu Anda apakah sertifikat penandatanganan kode yang sesuai tersedia di Identitas penandatanganan kode (tanda centang hijau di kolom **Sertifikat**) atau tidak

## 3. Menyiapkan Codemagic

**Mengonfigurasi rahasia Codemagic**

Pernah bertanya-tanya dari mana nilai `ENV` berasal? Yah, itu bukan rahasia lagi - itu berasal dari rahasia proyek Anda 🤦


## **4. Mengonfigurasi file alur kerja Codemagic**

Buat file bernama `codemagic.yml` di root proyek Anda dan tambahkan yang berikut

```yaml
workflows:
  ionic-capacitor-ios-workflow:
    name: Capacitor iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    integrations:
      app_store_connect: CodeMagic
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: YOUR_BUNDLE_IDENTIFIER
      vars:
        XCODE_WORKSPACE: ios/App/App.xcworkspace
        XCODE_SCHEME: App
        APP_STORE_APP_ID: YOUR_APP_STORE_APP_ID
      node: v20.14.0
      xcode: 15.4
      cocoapods: default
    triggering:
      events:
        - tag
      tag_patterns:
        - pattern: '*'
          include: true
    scripts:
      - name: Install dependencies
        script: |
          npm install
      - name: Cocoapods installation
        script: |
          cd ios/App && pod install
      - name: Update dependencies and copy web assets to native project
        script: |
          npm run build
          npx cap sync ios
      - name: Set up code signing settings on Xcode project
        script: |
          xcode-project use-profiles
      - name: Increment build number
        script: |
          cd $CM_BUILD_DIR/ios/App
          LATEST_BUILD_NUMBER=$(app-store-connect get-latest-app-store-build-number "$APP_ID")
          agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
      - name: Build ipa for distribution
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    publishing:
      email:
        recipients:
          - YOUR_EMAIL
        notify:
          success: true # To not receive a notification when a build succeeds
          failure: false # To not receive a notification when a build fails
      app_store_connect:
        auth: integration
        # Configuration related to TestFlight (optional)
        # Note: This action is performed during post-processing.
        submit_to_testflight: true
        # Configuration related to App Store (optional)
        # Note: This action is performed during post-processing.
        submit_to_app_store: false

```

Alur kerja ini harus dipicu secara manual atau setelah setiap _tag_ GitHub, jika Anda perlu mengotomatisasi tag, silakan lihat [Pembangunan dan rilis otomatis dengan tindakan GitHub](/blog/automatic-build-and-release-with-github-actions/) terlebih dahuluKemudian alur kerja ini akan mengambil dependensi NodeJS Anda, menginstalnya, dan membangun aplikasi JavaScript Anda

> Setiap kali Anda mengirim tag baru, sebuah rilis akan dibangun di TestFlight

Aplikasi Anda tidak perlu menggunakan Ionic, hanya basis Capacitor yang wajib, dapat memiliki modul Cordova lama, tetapi plugin Capacitor JS lebih diutamakan

## 5. Memicu alur kerja

**Memicu alur kerja**

Dorong commit baru ke cabang `main` atau `developement` untuk memicu alur kerja

![Dimulai dengan commit](/build_resultwebp)

Setelah beberapa menit, build seharusnya tersedia di dasbor App Store Connect Anda

![Dasbor Testflight](/testflight_appwebp)

## Memulai secara manual

Anda dapat memulai alur kerja secara manual

Pertama pilih aplikasi yang ingin Anda bangun, lalu klik **Mulai build baru**

![Pilih aplikasi](/select_app_codemagicwebp)

Kemudian pilih cabang yang ingin Anda bangun

![Pilih cabang](/select_branchwebp)

Dan klik **Mulai build baru**

Kemudian pergi ke daftar build

![Daftar build](/build_listwebp)

Dan klik pada build untuk melihat hasilnya

![Hasil build](/build_resultwebp)

## Dapat mendeploy dari mesin lokal

Ya, Anda bisa, dan itu sangat mudah

Anda dapat menggunakan Xcode untuk membangun dan menandatangani aplikasi Anda, seperti biasa

### Terima kasih

Blog ini berdasarkan artikel-artikel berikut:
- [Pengiriman berkelanjutan untuk IOS menggunakan Codemagic dan GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Dokumentasi Codemagic](https://docsCodemagictools/app-store-connect-api/)
- [Pesan GitHub ini dari @mrogunlana](https://githubcom/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)