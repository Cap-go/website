---
slug: automatic-capacitor-ios-build-codemagic
title: Pembangunan iOS Otomatis Capacitor dengan Codemagic
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi iOS Ionic Anda dengan Codemagic
  dalam 5 Menit (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2025-12-31T01:19:38.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Ilustrasi TestFlight dengan Codemagic
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-android-build-codemagic
---
## Continuous Delivery untuk iOS menggunakan Codemagic


## Prasyarat

Sebelum melanjutkan tutorial...

-   Keanggotaan program pengembang iOS.
-   Keinginan untuk membaca 😆...

## Penting tentang harga

![Price Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Layanan ini '_gratis_' hingga 500 menit macOS M1 / bulan, tergantung pada mesin yang dipilih.  
Kita akan menggunakan mesin **_macOS M1_**, Anda dapat melihat di tangkapan layar harga dan batasannya (harga pada saat pembuatan tutorial, bisa mengalami perubahan di masa mendatang)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda mau, kita lanjutkan..._**

> **_📣_ Dalam postingan ini kita berasumsi bahwa kita telah membuat aplikasi di iTunes connect, kita memiliki sertifikat dari ekosistem Apple, semuanya akan diatur oleh Codemagic!**

## Mari kita mulai 🤿 

**Langkah-langkah yang akan diikuti dalam postingan**

1.  _Menggunakan App Store Connect API dengan Codemagic_
2.  _Persyaratan_
3.  _Membuat Kunci API App Store Connect_
4.  _Menggunakan Kunci API App Store Connect_
5.  _Menyalin file Fastlane_
6.  _Mengonfigurasi Codemagic_

## 1\. Menggunakan App Store Connect API dengan Codemagic

> Mulai Februari 2021, autentikasi dua faktor atau verifikasi dua langkah diperlukan untuk semua pengguna yang masuk ke App Store Connect. Lapisan keamanan tambahan untuk Apple ID Anda ini membantu memastikan bahwa hanya Anda yang dapat mengakses akun Anda.  
> Dari [Apple Support](https://developer.apple.com/support/authentication/)

> Memulai dengan match mengharuskan Anda mencabut sertifikat yang ada. Tapi jangan khawatir, Anda akan langsung mendapatkan yang baru.


### Persyaratan

Untuk dapat menggunakan App Store Connect API, Codemagic membutuhkan **tiga** hal.

1.  ID Penerbit.
2.  ID Kunci.
3.  File Kunci atau Konten Kunci.

### Membuat Kunci API App Store Connect

Untuk menghasilkan kunci, Anda harus memiliki izin Admin di App Store Connect. Jika Anda tidak memiliki izin tersebut, Anda dapat mengarahkan orang yang relevan ke artikel ini dan mengikuti instruksi berikut.

1. — Masuk ke [App Store Connect](https://appstoreconnect.apple.com/).

2. — Pilih [Users and Access](https://appstoreconnect.apple.com/access/users/).

![App Store Connect user access](/select_user_access.webp)

3. — Pilih tab API Keys.

![App Store Connect API Keys](/user_access_keys.webp)

4. — Klik Generate API Key atau tombol Add (+).

![App Store Connect API keys create](/user_access.webp)

5. — Masukkan nama untuk kunci dan pilih level akses. Kami merekomendasikan memilih hak akses `App Manager`, baca lebih lanjut tentang izin peran Apple Developer Program [di sini](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![App Store Connect API keys create name](/gen_key.webp)

6. — Klik Generate.

> **Akses kunci API tidak dapat dibatasi untuk aplikasi tertentu.**

Nama kunci baru, ID kunci, tautan unduhan, dan informasi lainnya muncul di halaman.

![App Store Connect download keys](/download_key.webp)

Dapatkan ketiga informasi yang diperlukan di sini:
<1> ID Penerbit.  
<2> ID Kunci.  
<3> Klik "Download API Key" untuk mengunduh kunci API pribadi Anda. Tautan unduhan hanya muncul jika kunci pribadi belum diunduh. Apple tidak menyimpan salinan kunci pribadi. Jadi, Anda hanya dapat mengunduhnya sekali.

> _🔴_ Simpan kunci pribadi Anda di tempat yang aman. Anda tidak boleh berbagi kunci, menyimpan kunci di repositori kode, atau menyertakan kunci dalam kode sisi klien.

### Menambahkan kunci API App Store Connect ke Codemagic

1.  Buka pengaturan Tim Codemagic Anda,
![Select Team integrations](/select_team.webp)
![Open team](/open_team.webp)
Pilih identitas penandatanganan kode
![Select code signing identities](/select_code_signing_identities.webp)
Dan unggah sertifikat
![Upload the certificate](/upload_certificate.webp)

2.  Klik tombol **Add key**.
3.  Masukkan `Nama kunci API App Store Connect`. Ini adalah nama yang dapat dibaca manusia untuk kunci yang akan digunakan untuk merujuk ke kunci nanti dalam pengaturan aplikasi.
4.  Masukkan nilai `Issuer ID` dan `Key ID`.
5.  Klik pada **Choose a .p8 file** atau seret file untuk mengunggah kunci API App Store Connect yang diunduh sebelumnya.
6.  Klik **Save**.

_Sekarang kita dapat mengelola Codemagic dengan kunci API App Store Connect, bagus!_


## 2\. Membuat sertifikat dan profil penyediaan


#### Sertifikat

Buka XCode dan pergi ke **Settings** > **Accounts** > **Apple ID** > **Teams** dan pilih tim Anda.

![Code signing identities](/code_signing_identities.webp)

Klik pada **Manage certificates** > **+** dan pilih **Apple Distribution**.

![Apple Distribution](/apple_distribution.webp)

Kemudian Anda dapat membuat sertifikat baru.

Kemudian Anda perlu pergi ke keychain untuk mengunduh sertifikat sebagai file `.p12`.

Untuk melakukannya, Anda perlu pergi ke keychain beralih ke keychain **login** dan kemudian tab **My Certificates**.

![My Certificates](/my_certificates.webp)

Kemudian Anda dapat memilih sertifikat yang ingin Anda unduh. (Lihat berdasarkan tanggal sertifikat)

Dan kemudian klik kanan pada sertifikat dan pilih **Export**.

Pilih format file **Personal Information Exchange (.p12)**.

Itu akan mengunduh sertifikat sebagai file `.p12`.

#### Profil penyediaan

Buka [Apple Developer](https://developer.apple.com/account/resources/profiles/list) dan pilih tim yang tepat.

Kemudian buat profil baru, dengan mengklik **+** 

![Create a new profile](/create_new_profile.webp)

Dan pilih **App Store Connect**. 

![Select App Store Connect](/select_app_store_connect.webp)

Kemudian Anda perlu memilih aplikasi yang tepat, berhati-hatilah Anda tidak dapat menggunakan wildcard karena penandatanganan akan gagal.

![Select the right app](/select_app.webp)

Pilih sertifikat yang tepat yang Anda buat sebelumnya (lihat tanggal kedaluwarsa yang seharusnya sama hari dan bulan dengan hari ini) dan klik **Continue**.

![Select the right certificate](/select_certificate.webp)

Akhirnya masukkan nama profil dan klik **Generate**. 

> Nama akan digunakan untuk mengidentifikasi profil di Codemagic.

![Generate the profile](/generate_profile.webp)

Anda dapat mengunduh profil sebagai file `.mobileprovision`.

![Download the profile](/download_profile.webp)


### Menambahkan sertifikat Code signing

Codemagic memungkinkan Anda mengunggah sertifikat code signing sebagai arsip PKCS#12 yang berisi sertifikat dan kunci pribadi yang diperlukan untuk menggunakannya. Saat mengunggah, Codemagic akan meminta Anda untuk memberikan kata sandi sertifikat (jika sertifikat dilindungi kata sandi) bersama dengan **Nama referensi** unik, yang kemudian dapat digunakan dalam konfigurasi `codemagic.yaml` untuk mengambil file tertentu.

-   Unggah sertifikat
-   Hasilkan sertifikat baru
-   Ambil dari Portal Pengembang

1.  Buka pengaturan Tim Codemagic Anda, buka **codemagic.yaml settings** > **Code signing identities**.
2.  Buka tab **iOS certificates**.
3.  Unggah file sertifikat dengan mengklik **Choose a .p12 or .pem file** atau dengan menyeretnya ke dalam bingkai yang ditunjukkan.
4.  Masukkan **Certificate password** dan pilih **Reference name**.
5.  Klik **Add certificate**

### Menambahkan profil penyediaan

Codemagic memungkinkan Anda mengunggah profil penyediaan untuk digunakan untuk aplikasi atau mengambil profil dari Portal Pengembang Apple.

Tipe profil, tim, bundle id, dan tanggal kedaluwarsa ditampilkan untuk setiap profil yang ditambahkan ke Code signing identities. Selain itu, Codemagic akan memberi tahu Anda apakah sertifikat code signing yang cocok tersedia di Code signing identities (tanda centang hijau di kolom **Certificate**) atau tidak.

## 3\. Mengatur Codemagic

**Mengonfigurasi rahasia Codemagic**

Pernah bertanya-tanya dari mana nilai `ENV` berasal? Yah, ini bukan rahasia lagi – ini dari rahasia proyek Anda. 🤦


## **4\. Mengonfigurasi file alur kerja Codemagic**

Buat file bernama `codemagic.yml` di root proyek Anda dan tambahkan yang berikut.

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

Alur kerja ini harus dipicu secara manual atau setelah setiap _tag_ GitHub, jika Anda perlu mengotomatisasi tag silakan, rujuk ke [Automatic build and release with GitHub actions](/blog/automatic-build-and-release-with-github-actions/) terlebih dahulu.

Kemudian alur kerja ini akan menarik deps NodeJS Anda, menginstalnya dan membangun aplikasi JavaScript Anda.

> Setiap kali Anda mengirim tag baru, rilis akan dibangun di TestFlight.

Aplikasi Anda tidak perlu menggunakan Ionic, hanya basis Capacitor yang wajib, dapat memiliki modul Cordova lama, tetapi plugin Capacitor JS harus diutamakan.

## 5\. Memicu alur kerja


**Memicu alur kerja**

Push commit baru ke cabang `main` atau `development` untuk memicu alur kerja.

![Started with commit](/build_result.webp)

Setelah beberapa menit, build harus tersedia di dashboard App Store Connect Anda.

![Testflight Dashboard](/testflight_app.webp)

## Mulai secara manual

Anda dapat memulai alur kerja secara manual. 

Pertama pilih aplikasi yang ingin Anda build, kemudian klik **Start new build**.

![Select app](/select_app_codemagic.webp)

Kemudian pilih cabang yang ingin Anda build.

![Select branch](/select_branch.webp)

Dan klik **Start new build**.

Kemudian pergi ke daftar build

![Build list](/build_list.webp)

Dan klik pada build untuk melihat hasilnya.

![Build result](/build_result.webp)

## Dapat deploy dari mesin lokal

Ya, Anda bisa, dan itu sangat mudah.

Anda dapat menggunakan Xcode untuk membangun dan menandatangani aplikasi Anda, seperti biasa.

### Terima kasih

Blog ini didasarkan pada artikel-artikel berikut:
- [Continuous delivery for IOS using Codemagic and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Codemagic Documentation](https://docs.Codemagic.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
