---
slug: automatic-capacitor-ios-build-github-action-with-match
title: Kompilasi Otomatis Capacitor iOS dengan GitHub Actions Menggunakan match
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi iOS Ionic Anda dengan fastlane
  dan GitHub Actions dalam 5 Menit (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustrasi GitHub Action untuk Fastlane TestFlight
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-android-build-github-action
---

## Pengiriman Berkelanjutan untuk iOS menggunakan Fastlane dan GitHub Actions dengan match

## Prasyarat

Sebelum melanjutkan tutorial ini...

- Pastikan Anda telah [menginstal](https://docs.fastlane.tools/) Fastlane di mesin pengembangan Anda
- Keanggotaan program pengembang iOS  
- Keinginan untuk membaca 😆...
- Tim dengan banyak pengembang, jika tidak kami sarankan menggunakan [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) untuk alur kerja yang lebih sederhana

## Penting tentang harga

![Harga GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

Layanan ini 'gratis' sampai batas tertentu, tergantung mesin yang dipilih
Kita akan menggunakan mesin **_macOS_**, Anda dapat melihat harga dan batasannya di tangkapan layar (harga saat tutorial dibuat, dapat berubah di masa depan)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda setuju, kita lanjutkan..._**

> **_📣_ Dalam postingan ini kami mengasumsikan bahwa kita sudah membuat aplikasi di iTunes Connect, sudah memiliki sertifikat ekosistem Apple, semuanya akan disalin oleh Fastlane!**

## Mari kita mulai 🧑🏽‍💻

**Langkah-langkah yang akan diikuti dalam postingan ini**

1. _Menggunakan API App Store Connect dengan Fastlane Match_
2. _Persyaratan_  
3. _Membuat Kunci API App Store Connect_
4. _Menggunakan Kunci API App Store Connect_
5. _Menyalin file Fastlane_
6. _Mengkonfigurasi Fastlane match_

## 1. Menggunakan API App Store Connect dengan Fastlane Match

> Mulai Februari 2021, otentikasi dua faktor atau verifikasi dua langkah diwajibkan untuk semua pengguna yang masuk ke App Store Connect. Lapisan keamanan tambahan untuk Apple ID Anda ini memastikan bahwa hanya Anda yang dapat mengakses akun Anda.
> Dari [Dukungan Apple](https://developer.apple.com/support/authentication/)

> Memulai dengan match mengharuskan Anda mencabut sertifikat yang ada. Tapi jangan khawatir, Anda akan langsung mendapatkan yang baru.

## Persyaratan

Untuk dapat menggunakan API App Store Connect, Fastlane membutuhkan **tiga** hal:

1. ID Penerbit
2. ID Kunci  
3. File kunci atau konten kunci

## Membuat Kunci API App Store Connect

Untuk menghasilkan kunci, Anda harus memiliki izin Admin di App Store Connect. Jika Anda tidak memiliki izin tersebut, Anda dapat mengarahkan orang yang relevan ke artikel ini dan mengikuti instruksi berikut:

1 — Masuk ke [App Store Connect](https://appstoreconnect.apple.com/)

2 — Pilih [Pengguna dan Akses](https://appstoreconnect.apple.com/access/users/)

![Akses pengguna App Store Connect](/select_user_access.webp)

3 — Pilih tab Kunci API

![Kunci API App Store Connect](/user_access_keys.webp)

4 — Klik Hasilkan Kunci API atau tombol Tambah (+)

![Buat kunci API App Store Connect](/user_access.webp)

5 — Masukkan nama untuk kunci tersebut. Nama ini hanya untuk referensi Anda dan bukan bagian dari kunci itu sendiri.

![Buat nama kunci API App Store Connect](/gen_key.webp)

6 — Di bawah Akses, pilih peran untuk kunci tersebut. Peran yang berlaku untuk kunci sama dengan peran yang berlaku untuk pengguna di tim Anda. Lihat [izin peran](https://help.apple.com/app-store-connect/#/deve5f9a89d7/)

7 — Klik Hasilkan

> **Akses kunci API tidak dapat dibatasi hanya untuk aplikasi tertentu**

Nama kunci baru, ID kunci, tautan unduhan, dan informasi lainnya muncul di halaman

![Unduh kunci App Store Connect](/download_key.webp)

Anda dapat mengambil ketiga informasi yang diperlukan di sini:
- ID Penerbit
- ID Kunci
- Klik "Unduh Kunci API" untuk mengunduh kunci pribadi API Anda. Tautan unduhan hanya muncul jika kunci pribadi belum diunduh. Apple tidak menyimpan salinan kunci pribadi. Jadi, Anda hanya dapat mengunduhnya sekali.

> _🔴_ Simpan kunci pribadi Anda di tempat yang aman. Anda tidak boleh pernah membagikan kunci Anda, menyimpan kunci di repositori kode, atau menyertakan kunci dalam kode sisi klien.

## Menggunakan Kunci API App Store Connect

File Kunci API (file p8 yang Anda unduh), ID kunci, dan ID penerbit diperlukan untuk membuat token JWT untuk otorisasi.Ada beberapa cara informasi ini dapat dimasukkan ke Fastlane menggunakan aksi baru Fastlane, `app_store_connect_api_key`. Anda dapat mempelajari cara lainnya di dokumentasi Fastlane. Saya menunjukkan metode ini karena menurut saya ini adalah cara termudah untuk bekerja dengan sebagian besar CI di luar sana, di mana Anda dapat mengatur variabel lingkungan.

_Sekarang kita dapat mengelola Fastlane dengan kunci API App Store Connect, bagus!_

## 2. Salin file Fastlane

Fastlane adalah pustaka Ruby yang dibuat untuk mengotomatisasi tugas-tugas pengembangan mobile yang umum. Menggunakan Fastlane, Anda dapat mengonfigurasi "lane" khusus yang menggabungkan serangkaian "aksi" yang melakukan tugas-tugas yang biasanya Anda lakukan menggunakan Android Studio. Anda dapat melakukan banyak hal dengan Fastlane, tetapi untuk tujuan tutorial ini, kita hanya akan menggunakan beberapa aksi inti.

Buat folder Fastlane di root proyek Anda dan salin file-file berikut:

## **Konfigurasi Fastlane match**

Fastlane match adalah pendekatan baru untuk penandatanganan kode iOS. Fastlane match memudahkan tim untuk mengelola sertifikat dan profil penyediaan yang diperlukan untuk aplikasi iOS Anda.

Buat repositori privat baru bernama `certificates`, misalnya di akun pribadi atau organisasi GitHub Anda.

Inisialisasi Fastlane match untuk aplikasi iOS Anda.

Kemudian pilih opsi #1 (Git Storage)

Tetapkan URL repositori yang baru dibuat

> Sekarang Anda memiliki file bernama **_Matchfile_** di dalam folder Fastlane dan `_git_url_` harus diatur ke URL HTTPS dari repositori sertifikat. Secara opsional, Anda juga dapat menggunakan SSH, tetapi itu memerlukan langkah yang berbeda untuk dijalankan.

Selanjutnya, kita akan menghasilkan sertifikat dan masukkan kredensial Anda ketika diminta dengan Fastlane Match.

Anda akan diminta untuk memasukkan frasa sandi. Ingat dengan benar karena akan digunakan nanti oleh GitHub Actions untuk mendekripsi repositori sertifikat Anda.

Jika semuanya berjalan lancar, Anda akan melihat sesuatu seperti ini:

> Jika Anda mengalami masalah dengan GitHub dan izin yang diperlukan, mungkin postingan ini akan membantu Anda menghasilkan token autentikasi untuk git.

Sertifikat dan profil penyediaan yang dihasilkan diunggah ke sumber daya repositori sertifikat.

Terakhir, buka `proyek` Anda di Xcode, dan perbarui profil penyediaan untuk konfigurasi rilis aplikasi Anda.

## Beberapa hal yang perlu diperhatikan 💡

## MATCH

Agar CI/CD dapat mengimpor sertifikat dan profil penyediaan, ia perlu memiliki akses ke repositori sertifikat. Anda dapat melakukan ini dengan menghasilkan token akses pribadi (harus digunakan sebelumnya) yang memiliki cakupan untuk mengakses atau membaca repositori pribadi.

Di GitHub, buka **Settings** → **Developer Settings** → **Personal access tokens** → klik `Generate New Token` → centang cakupan `repo` → lalu klik `Generate token`

Salin token akses pribadi yang dihasilkan. Anda akan menggunakannya nanti untuk variabel lingkungan `GIT_TOKEN`

Kemudian ganti file match Anda yang dihasilkan di folder Fastlane dengan

Ini akan digunakan oleh GitHub Actions untuk mengimpor sertifikat dan profil penyediaan.
Dan var akan diatur di GitHub Secrets, alih-alih mengkodekannya secara langsung dalam file.

## **Pemrosesan Build**

Di GitHub Actions, **Anda ditagih berdasarkan menit** yang Anda gunakan untuk menjalankan alur kerja CI/CD Anda. Dari pengalaman, dibutuhkan sekitar 10-15 menit sebelum build dapat diproses di App Store Connect.

Untuk proyek pribadi, perkiraan biaya per build bisa mencapai **$0,08/menit x 15 menit = $1,2**, atau lebih, tergantung pada konfigurasi atau dependensi proyek Anda.Berikut adalah terjemahan teks tersebut ke dalam bahasa Indonesia:

Jika Anda memiliki kekhawatiran yang sama tentang harga seperti saya untuk proyek pribadi, Anda dapat membiarkan `skip_waiting_for_build_processing` tetap `true`

Apa konsekuensinya? Anda harus memperbarui kepatuhan aplikasi Anda secara manual di App Store Connect setelah build diproses, agar dapat mendistribusikan build kepada pengguna Anda

Ini hanyalah parameter opsional yang dapat diperbarui jika Anda ingin menghemat menit build untuk proyek pribadi. Untuk proyek gratis, ini seharusnya tidak menjadi masalah sama sekali. Lihat [harga](https://github.com/pricing/)

## 3. Siapkan GitHub Actions

**Konfigurasi rahasia GitHub**

Pernah bertanya-tanya dari mana nilai `ENV` berasal? Yah, itu bukan rahasia lagi - itu berasal dari rahasia proyek Anda 🤦

![Atur rahasia GitHub](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - ID tim App Store Connect Anda jika Anda berada di beberapa tim

2. `DEVELOPER_APP_ID` - di App Store Connect, buka aplikasi → **Informasi Aplikasi** → Gulir ke bawah ke bagian `Informasi Umum` aplikasi Anda dan cari `Apple ID`

3. `DEVELOPER_APP_IDENTIFIER` - pengenal bundle aplikasi Anda

4. `DEVELOPER_PORTAL_TEAM_ID` - ID tim Portal Pengembang Anda jika Anda berada di beberapa tim

5. `FASTLANE_APPLE_ID` - Apple ID atau email pengembang yang Anda gunakan untuk mengelola aplikasi

6. `GIT_USERNAME` & `GIT_TOKEN` - Nama pengguna git dan token akses pribadi Anda

7. `MATCH_PASSWORD` - frasa sandi yang Anda tetapkan saat menginisialisasi match, akan digunakan untuk mendekripsi sertifikat dan profil penyediaan

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <1>`, misalnya `match AppStore com.domain.blabla.demo`

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - tetapkan pengguna dan kata sandi keychain sementara untuk alur kerja Anda

10. `APPLE_KEY_ID` — ID Kunci API App Store Connect 🔺

11. `APPLE_ISSUER_ID` — ID Penerbit API App Store Connect 🔺

12. `APPLE_KEY_CONTENT` — Isi Kunci API App Store Connect 🔺 File kunci atau Konten kunci _p8_, [periksa ini](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<2>
13. `CERTIFICATE_STORE_URL` — URL repo kunci Match Anda (mis: https://github.com/***/fastlane_match.git)

## **4. Konfigurasi file alur kerja GitHub**

Buat direktori alur kerja GitHub

```ruby
default_platform(:ios)

DEVELOPER_APP_IDENTIFIER = ENV["DEVELOPER_APP_IDENTIFIER"]
DEVELOPER_APP_ID = ENV["DEVELOPER_APP_ID"]
PROVISIONING_PROFILE_SPECIFIER = ENV["PROVISIONING_PROFILE_SPECIFIER"]
TEMP_KEYCHAIN_USER = ENV["TEMP_KEYCHAIN_USER"]
TEMP_KEYCHAIN_PASSWORD = ENV["TEMP_KEYCHAIN_PASSWORD"]
APPLE_ISSUER_ID = ENV["APPLE_ISSUER_ID"]
APPLE_KEY_ID = ENV["APPLE_KEY_ID"]
APPLE_KEY_CONTENT = ENV["APPLE_KEY_CONTENT"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]

def delete_temp_keychain(name)
  delete_keychain(
    name: name
  ) if File.exist? File.expand_path("~/Library/Keychains/#{name}-db")
end

def create_temp_keychain(name, password)
  create_keychain(
    name: name,
    password: password,
    unlock: false,
    timeout: 0
  )
end

def ensure_temp_keychain(name, password)
  delete_temp_keychain(name)
  create_temp_keychain(name, password)
end

platform :ios do
  lane :build do
    build_app(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )
  end
  lane :refresh_profiles do
    match(
      type: "development",
      force: true)
    match(
      type: "adhoc",
      force: true)
  end
  desc "Register new device"
  lane :register_new_device do  |options|
      device_name = prompt(text: "Enter the device name: ")
      device_udid = prompt(text: "Enter the device UDID: ")
      device_hash = {}
      device_hash[device_name] = device_udid
      register_devices(
                       devices: device_hash
                       )
    refresh_profiles
  end
  lane :closed_beta do
    keychain_name = TEMP_KEYCHAIN_USER
    keychain_password = TEMP_KEYCHAIN_PASSWORD
    ensure_temp_keychain(keychain_name, keychain_password)

    api_key = app_store_connect_api_key(
      key_id: APPLE_KEY_ID,
      issuer_id: APPLE_ISSUER_ID,
      key_content: APPLE_KEY_CONTENT,            
      duration: 1200,            
      in_house: false
    )

    match(
      type: 'appstore',
      git_basic_authorization: Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"),
      readonly: true,
      keychain_name: keychain_name,
      keychain_password: keychain_password,
      api_key: api_key
    )

    gym(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )

    pilot(
      apple_id: "#{DEVELOPER_APP_ID}",
      app_identifier: "#{DEVELOPER_APP_IDENTIFIER}",
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )

    delete_temp_keychain(keychain_name)
  end
  lane :submit_review do
    version = ''
    Dir.chdir("..") do
      file = File.read("package.json")
      data = JSON.parse(file)
      version = data["version"]
    end
    deliver(
      app_version: version,
      submit_for_review: true,
      automatic_release: true,
      force: true, # Skip HTMl report verification
      skip_metadata: false,
      skip_screenshots: false,
      skip_binary_upload: true
    )
  end
end
```

Di dalam folder `workflow`, buat file bernama `build-upload-ios.yml` dan tambahkan yang berikut

```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

Alur kerja ini harus dipicu setelah setiap _tag_ GitHub, jika Anda perlu mengotomatisasi tag, silakan lihat [Build dan rilis otomatis dengan GitHub actions](/blog/automatic-build-and-release-with-github-actions/) terlebih dahulu

Kemudian alur kerja ini akan menarik dependensi NodeJS Anda, menginstalnya dan membangun aplikasi JavaScript Anda

> Setiap kali Anda mengirim commit baru, sebuah rilis akan dibangun di TestFlight

Aplikasi Anda tidak perlu menggunakan Ionic, hanya basis Capacitor yang wajib, aplikasi dapat memiliki modul Cordova lama, tetapi plugin JS Capacitor harus lebih diutamakan

## 5. Picu alur kerja

**Buat Commit**

Buat _commit_, Anda harus melihat alur kerja aktif di repositori

**Picu alur kerja**

Dorong commit baru ke cabang `main` atau `development` untuk memicu alur kerja

![Dimulai dengan commit](/cd_started.webp)

Setelah beberapa menit, build harus tersedia di dasbor App Store Connect Anda

![Dasbor Testflight](/testflight_app.webp)

## Bisakah deploy dari mesin lokal?

Ya, Anda bisa, dan itu sangat mudah

Bayangkan Anda memiliki repositori pribadi, dan Anda telah menggunakan semua menit dari paket gratis dan tidak ingin membayar untuk rilis baru, atau mungkin Anda lebih suka mengirimkan aplikasi secara manual

**_Mari kita lakukan_**

Oke, pertama-tama kita perlu membuat file bernama **_env_** di jalur **_my_project_path/fastlane_**, tepat di jalur yang sama dengan _Fastfile_, untuk dapat membuat properti _rahasia_ yang sama seperti yang ada di _GitHub_, seperti di bawah ini:

File env untuk deploy dari mesin lokal

Sekarang, Anda dapat membuka _terminal_ dan meluncurkan _Fastlane_ dari mesin Anda:

```shell
fastlane match init
```

> **❌ Penting tentang**env_ **file, karena kita lebih memilih untuk tidak mengekspos data ini, kita harus menambahkannya di** _gitignore_**, seperti ini: ❌**

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Ini seharusnya bekerja sama seperti yang terjadi dari GitHub Actions di mesin jarak jauh tetapi di mesin lokal kita 🍻

![Local Fastlane run](/local_fastlanewebp)

Eksekusi terminal: $ Fastlane closed\_beta

**_Jika Anda sudah sampai sejauh ini, selamat, sekarang Anda memiliki proses yang sepenuhnya otomatis untuk aplikasi iOS Anda dengan Fastlane dan GitHub Actions_**

> Setiap kali Anda mengirim commit baru, sebuah rilis akan dibangun di Google Play console, saluran beta
Saya akan meningkatkan blog ini dengan umpan balik Anda, jika Anda memiliki pertanyaan atau saran, silakan beri tahu saya melalui email martin@capgoapp

### Membangun di perangkat Anda

Jika Anda masih perlu membangun di perangkat Anda, Anda perlu menambahkannya secara manual ke provisionning
Hubungkan perangkat Anda ke mac Anda dan buka menu perangkat
![find devic ios menu](/find_ios_devicewebp)
Kemudian salin identifier Anda 
![find identifier ios](/find_ios_identifierwebp)
Dan kemudian mulai perintah:
`fastlane register_new_device`
ini akan meminta Anda untuk mengatur nama perangkat dan identifier:
![set identifier ios](/set_identifierwebp)

### jika Anda mengalami masalah

Jika Anda mengalami masalah dengan perangkat dev tidak dapat melakukan pengujian dll, biasanya ini memperbaikinya

Ada perintah ajaib yang bisa menyelamatkan Anda:
```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

Kemudian:
Bersihkan proyek dengan menekan Shift(⇧)+Command(⌘)+K atau pilih Product > Clean (mungkin berlabel "Clean Build Folder")

Kemudian coba jalankan lagi aplikasi di perangkat Anda

### Terima kasih

Blog ini didasarkan pada artikel-artikel berikut:
- [Continuous delivery for IOS using Fastlane and GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlane Documentation](https://docsfastlanetools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)