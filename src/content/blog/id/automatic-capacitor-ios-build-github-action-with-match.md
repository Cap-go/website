---
slug: génération-ios-automatique-capacitor-avec-github-action-et-match
title: Kompilasi iOS Capacitor Otomatis dengan GitHub Actions menggunakan match
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi iOS Ionic Menggunakan fastlane
  dan GitHub Actions dalam 5 Menit (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2025-11-24T15:08:57.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustrasi GitHub Action Fastlane testflight
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-android-build-github-action
---
# Build iOS Otomatis dengan GitHub Actions menggunakan Match

Menyiapkan CI/CD untuk aplikasi Capacitor bisa menjadi kompleks dan memakan waktu. Inilah yang perlu Anda ketahui:

## Prasyarat

Sebelum memulai, Anda perlu menyiapkan:

- Akun GitHub dengan akses admin
- Keanggotaan program pengembang iOS 
- Akses API App Store Connect dengan izin yang sesuai
- Pemahaman tentang alur kerja GitHub Actions
- Pengetahuan tentang konfigurasi Fastlane dan Match
- Waktu untuk memelihara dan men-debug pipeline
- Tim yang terdiri dari banyak pengembang, jika tidak kami sarankan menggunakan [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) untuk alur kerja yang lebih sederhana

## Setup CI/CD Profesional oleh Capgo

Lewati kompleksitas. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) mengkonfigurasi pipeline CI/CD Anda langsung di platform pilihan Anda:

- **Platform Independen**: Bekerja dengan GitHub Actions, GitLab CI, atau lainnya
- **Integrasi Mulus**: Tidak perlu beralih platform, bekerja dengan proses Anda saat ini
- **Konfigurasi yang Disesuaikan**: Setup yang disesuaikan dengan kebutuhan proyek Anda
- **Panduan Ahli**: Kami telah menyiapkan CI/CD untuk 50+ aplikasi

### Harga
- Biaya setup satu kali: $2,600
- Biaya operasional Anda: ~$300/tahun
- Bandingkan dengan Solusi proprietary lain: $6,000/tahun
- **Hemat $26,100 selama 5 tahun**

[Setup CI/CD Sekarang](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Panduan Setup Manual

Jika Anda masih ingin menyiapkan semuanya sendiri, inilah yang perlu Anda lakukan:

## Continuous Delivery untuk iOS menggunakan Fastlane dan GitHub Actions dengan match

## Prasyarat

Sebelum melanjutkan tutorial...

-   Pastikan Anda sudah [menginstal](https://docs.fastlane.tools/) Fastlane di mesin pengembangan Anda.
-   Keanggotaan program pengembang iOS.
-   Keinginan untuk membaca 😆...
-   Tim yang terdiri dari banyak pengembang, jika tidak kami sarankan menggunakan [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) untuk alur kerja yang lebih sederhana.

## Penting tentang harga

![Price GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

Layanan ini 'gratis' sampai batas tertentu, tergantung pada mesin yang dipilih.  
Kita akan menggunakan mesin **_macOS_**, Anda dapat melihat di tangkapan layar harga dan batasannya (harga pada saat pembuatan tutorial, dapat berubah di masa mendatang)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda setuju, mari kita lanjutkan..._**

> **_📣_ Dalam posting ini kita mengasumsikan bahwa kita telah membuat aplikasi di iTunes connect, kita memiliki sertifikat dari ekosistem Apple, semuanya akan disalin oleh Fastlane!**

## Mari kita mulai 🤿 

**Langkah-langkah yang akan dibahas dalam posting**

1. _Menggunakan API App Store Connect dengan Fastlane Match_
2. _Persyaratan_
3. _Membuat Kunci API App Store Connect_
4. _Menggunakan Kunci API App Store Connect_
5. _Menyalin file Fastlane_
6. _Mengkonfigurasi Fastlane match_

## 1. Menggunakan API App Store Connect dengan Fastlane Match

> Mulai Februari 2021, autentikasi dua faktor atau verifikasi dua langkah diperlukan untuk semua pengguna yang masuk ke App Store Connect. Lapisan keamanan tambahan untuk Apple ID Anda ini membantu memastikan bahwa hanya Anda yang dapat mengakses akun Anda.
> Dari [Apple Support](https://developer.apple.com/support/authentication/)

> Memulai dengan match mengharuskan Anda mencabut sertifikat yang ada. Tapi jangan khawatir, Anda akan langsung mendapatkan yang baru.

## Persyaratan

Untuk dapat menggunakan API App Store Connect, Fastlane membutuhkan **tiga** hal.

1. Issuer ID.
2. Key ID.
3. File kunci atau konten kunci.

## Membuat Kunci API App Store Connect

Untuk menghasilkan kunci, Anda harus memiliki izin Admin di App Store Connect. Jika Anda tidak memiliki izin tersebut, Anda dapat mengarahkan orang yang relevan ke artikel ini dan mengikuti instruksi berikut.

1. Masuk ke [App Store Connect](https://appstoreconnect.apple.com/).

2. Pilih [Users and Access](https://appstoreconnect.apple.com/access/users/).

![App Store Connect user access](/select_user_access.webp)

3. Pilih tab Integration.

![App Store Connect API Integration](/user_access_keys.webp)

4. Klik Generate API Key atau tombol Add (+).

![App Store Connect API keys create](/user_access.webp)

5. Masukkan nama untuk kunci. Nama ini hanya untuk referensi Anda dan bukan bagian dari kunci itu sendiri.

![App Store Connect API keys create name](/gen_key.webp)

6. Di bawah Access, pilih peran untuk kunci tersebut. Peran yang berlaku untuk kunci sama dengan peran yang berlaku untuk pengguna dalam tim Anda. Lihat [izin peran](https://help.apple.com/app-store-connect/#/deve5f9a89d7/). Kami sarankan untuk memilih **App manager**.

7. Klik Generate.

> **Akses kunci API tidak dapat dibatasi untuk aplikasi tertentu.**

Nama kunci baru, ID kunci, tautan unduhan, dan informasi lainnya muncul di halaman.

![App Store Connect download keys](/download_key.webp)

Anda dapat mengambil ketiga informasi yang diperlukan di sini.
<Steps>
1. Issue ID.
2. Key ID.
3. Klik "Download API Key" untuk mengunduh kunci API pribadi Anda. Tautan unduhan hanya muncul jika kunci pribadi belum diunduh. Apple tidak menyimpan salinan kunci pribadi. Jadi, Anda hanya bisa mengunduhnya sekali.
</Steps>

> _🔴_ Simpan kunci pribadi Anda di tempat yang aman. Anda tidak boleh membagikan kunci Anda, menyimpan kunci di repositori kode, atau menyertakan kunci dalam kode sisi klien.

## Menggunakan Kunci API App Store Connect

File Kunci API (file p8 yang Anda unduh), ID kunci, dan ID issuer diperlukan untuk membuat token JWT untuk otorisasi. Ada beberapa cara informasi ini dapat dimasukkan ke Fastlane menggunakan aksi baru Fastlane, `app_store_connect_api_key`. Anda dapat mempelajari cara lain di [dokumentasi Fastlane](https://docs.fastlane.tools/actions/app_store_connect_api_key/). Saya menunjukkan metode ini karena menurut saya ini adalah cara termudah untuk bekerja dengan sebagian besar CI di luar sana, di mana Anda dapat mengatur variabel lingkungan.

_Sekarang kita dapat mengelola Fastlane dengan kunci API App Store Connect, bagus!_

## 2. Menyalin file Fastlane

Fastlane adalah pustaka Ruby yang dibuat untuk mengotomatiskan tugas-tugas pengembangan mobile yang umum. Menggunakan Fastlane, Anda dapat mengkonfigurasi "lane" kustom yang menggabungkan serangkaian "aksi" yang melakukan tugas-tugas yang biasanya Anda lakukan menggunakan Android studio. Anda dapat melakukan banyak hal dengan Fastlane, tetapi untuk keperluan tutorial ini, kita hanya akan menggunakan beberapa aksi inti.

Buat folder Fastlane di root proyek Anda dan salin file-file berikut:
Fastfile
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

Appfile
```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

## **Konfigurasi Fastlane match**

Fastlane [match](https://docs.fastlane.tools/actions/match/) adalah pendekatan baru untuk code signing iOS. Fastlane match memudahkan tim untuk mengelola sertifikat yang diperlukan dan profil provisioning untuk aplikasi iOS Anda.

Buat repositori pribadi baru bernama `certificates`, misalnya di akun GitHub pribadi atau organisasi Anda.

Inisialisasi Fastlane match untuk aplikasi iOS Anda.

```shell
fastlane match init
```

Kemudian pilih opsi #1 (Git Storage).

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Tetapkan URL repositori yang baru dibuat.

```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

> Sekarang Anda memiliki file bernama **_Matchfile_** di dalam folder Fastlane dan `_git_url_` harus diatur ke URL HTTPS dari repositori sertifikat. Opsional, Anda juga dapat menggunakan SSH, tetapi memerlukan langkah yang berbeda untuk dijalankan.

```
# ios/Matchfilegit_url("https://github.com/gitusername/certificates")storage_mode("git")type("appstore")
```

Selanjutnya, kita akan menghasilkan sertifikat dan masukkan kredensial Anda saat diminta dengan Fastlane Match.

Anda akan diminta untuk memasukkan passphrase. Ingat dengan benar karena akan digunakan nanti oleh GitHub Actions untuk mendekripsi repositori sertifikat Anda.

```
fastlane match appstore
```

Jika semua berjalan lancar, Anda seharusnya melihat sesuatu seperti ini:

```
[01:40:52]: All required keys, certificates and provisioning profiles are installed 🙌
```

> Jika Anda mengalami masalah dengan GitHub dan izin yang diperlukan, mungkin [posting](https://medium.com/@litoarias/token-authentication-requirements-for-git-operations-5fdd8a6f6e7c/) ini akan membantu Anda menghasilkan token autentikasi untuk git.

Sertifikat dan profil provisioning yang dihasilkan diunggah ke sumber daya repositori sertifikat

![App Store Connect certificates](/certificates.webp)

Terakhir, buka `project` Anda di Xcode, dan perbarui profil provisioning untuk konfigurasi rilis aplikasi Anda.

![XCode certificates](/xcode_cert.webp)

## Beberapa hal yang perlu diperhatikan 💡

## MATCH

Agar CI/CD dapat mengimpor sertifikat dan profil provisioning, ia perlu memiliki akses ke repositori sertifikat. Anda dapat melakukan ini dengan menghasilkan token akses pribadi (harus digunakan sebelumnya) yang memiliki cakupan untuk mengakses atau membaca repositori pribadi.

Di GitHub, pergi ke **Settings** → **Developer Settings** → **Personal access tokens** → klik `Generate New Token` → centang cakupan `repo` → lalu klik `Generate token`.

![Create Personal access token](/personal_access_token.webp)

Salin token akses pribadi yang dihasilkan. Anda akan menggunakannya nanti untuk variabel lingkungan `GIT_TOKEN`.

Kemudian ganti file match Anda yang dihasilkan di folder Fastlane dengan 
Matchfile
```ruby
CERTIFICATE_STORE_URL = ENV["CERTIFICATE_STORE_URL"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]
FASTLANE_APPLE_ID = ENV["FASTLANE_APPLE_ID"]

git_url(CERTIFICATE_STORE_URL)
storage_mode("git")
type("appstore")
git_basic_authorization(Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"))
username(FASTLANE_APPLE_ID)
```
Ini akan digunakan oleh GitHub Actions untuk mengimpor sertifikat dan profil provisioning.
Dan var akan diatur di GitHub Secrets, alih-alih meng-hardcode mereka dalam file.

## **Pemrosesan Build**

Di GitHub Actions, **Anda ditagih berdasarkan menit** yang telah Anda gunakan untuk menjalankan alur kerja CI/CD Anda. Dari pengalaman, dibutuhkan sekitar 10-15 menit sebelum build dapat diproses di App Store Connect.

Untuk proyek pribadi, perkiraan biaya per build bisa mencapai **$0.08/menit x 15 menit = $1.2**, atau lebih, tergantung pada konfigurasi atau dependensi proyek Anda.

Jika Anda memiliki kekhawatiran yang sama tentang harga seperti saya untuk proyek pribadi, Anda dapat tetap mengatur `skip_waiting_for_build_processing` ke `true`.

Apa konsekuensinya? Anda harus memperbarui kepatuhan aplikasi Anda secara manual di App Store Connect setelah build selesai diproses, agar dapat mendistribusikan build ke pengguna Anda.

Ini hanya parameter opsional untuk diperbarui jika Anda ingin menghemat menit build untuk proyek pribadi. Untuk proyek gratis, ini seharusnya tidak menjadi masalah sama sekali. Lihat [harga](https://github.com/pricing/).

## 3. Setup GitHub Actions

**Mengkonfigurasi secret GitHub**

Pernah bertanya-tanya dari mana nilai `ENV` berasal? Yah, ini bukan rahasia lagi – ini berasal dari secret proyek Anda. 🤦

![Set GitHub secrets](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - ID tim App Store Connect Anda jika Anda berada dalam beberapa tim.

2. `DEVELOPER_APP_ID` - di App Store Connect, buka aplikasi → **App Information** → Gulir ke bawah ke bagian `General Information` dari aplikasi Anda dan cari `Apple ID`.

3. `DEVELOPER_APP_IDENTIFIER` - bundle identifier aplikasi Anda.

4. `DEVELOPER_PORTAL_TEAM_ID` - ID tim Developer Portal Anda jika Anda berada dalam beberapa tim.

5. `FASTLANE_APPLE_ID` - Apple ID atau email pengembang yang Anda gunakan untuk mengelola aplikasi.

6. `GIT_USERNAME` & `GIT_TOKEN` - Nama pengguna git dan token akses pribadi Anda.

7. `MATCH_PASSWORD` - frasa sandi yang Anda tetapkan saat menginisialisasi match, akan digunakan untuk mendekripsi sertifikat dan profil provisioning.

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <1>`, contoh: `match AppStore com.domain.blabla.demo`.

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - tetapkan pengguna dan kata sandi keychain sementara untuk workflow Anda.

10. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID.

11. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID.

12. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 File Key atau Konten Key dari _.p8_, [cek di sini](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<2>
13. `CERTIFICATE_STORE_URL` — URL repo dari Match keys Anda (contoh: https://github.com/***/fastlane_match.git)

## **4. Mengkonfigurasi file workflow GitHub**

Buat direktori workflow GitHub.

```
cd .github/workflows
```

Di dalam folder `workflow`, buat file bernama `build-upload-ios.yml` dan tambahkan yang berikut.

```yaml
name: Build source code on ios

on:
  push:
    tags:
      - '*'

jobs:
  build_ios:
    runs-on: macOS-latest
    steps:
      - uses: actions/checkout@v6
      - name: Use Node.js 16
        uses: actions/setup-node@v6
        with:
          node-version: '24'
          cache: npm
      - name: Install dependencies
        id: install_code
        run: npm ci
      - name: Build
        id: build_code
        run: npm run build
      - name: Build
        id: build_code
        run: npm run mobile
      - uses: actions/cache@v3
        with:
          path: ios/App/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('**/Podfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-pods-
      - name: Sync
        id: sync_code
        run: npx cap sync
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.7.2
      - uses: maierj/fastlane-action@v2.3.0
        env:
          DEVELOPER_APP_IDENTIFIER: ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          DEVELOPER_APP_ID: ${{ secrets.DEVELOPER_APP_ID }}
          PROVISIONING_PROFILE_SPECIFIER: match AppStore ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          TEMP_KEYCHAIN_USER: ${{ secrets.TEMP_KEYCHAIN_USER }}
          TEMP_KEYCHAIN_PASSWORD: ${{ secrets.TEMP_KEYCHAIN_PASSWORD }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          CERTIFICATE_STORE_URL: https://github.com/${{ secrets.CERTIFICATE_STORE_REPO }}.git
          GIT_USERNAME: ${{ secrets.GIT_USERNAME }}
          GIT_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          FASTLANE_APPLE_ID: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_USERNAME: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          DEVELOPER_PORTAL_TEAM_ID: ${{ secrets.DEVELOPER_PORTAL_TEAM_ID }}
        with:
          lane: closed_beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 60
```

Workflow ini seharusnya dipicu setelah setiap _tag_ GitHub, jika Anda perlu mengotomatisasi tag, silakan lihat [Automatic build and release with GitHub actions](/blog/automatic-build-and-release-with-github-actions/) terlebih dahulu.

Kemudian workflow ini akan mengambil deps NodeJS Anda, menginstalnya dan membangun aplikasi JavaScript Anda.

> Setiap kali Anda mengirim commit baru, sebuah rilis akan dibangun di TestFlight.

Aplikasi Anda tidak perlu menggunakan Ionic, hanya basis Capacitor yang wajib, bisa menggunakan modul Cordova lama, tapi plugin Capacitor JS lebih disukai.

## 5. Memicu workflow

**Buat Commit**

Buat _commit_, Anda seharusnya melihat workflow aktif di repositori.

**Picu workflow**

Push commit baru ke branch `main` atau `developement` untuk memicu workflow.

![Started with commit](/cd_started.webp)

Setelah beberapa menit, build seharusnya tersedia di dashboard App Store Connect Anda.

![Testflight Dashboard](/testflight_app.webp)

## Bisakah deploy dari mesin lokal?

Ya, Anda bisa, dan ini sangat mudah.

Bayangkan Anda memiliki repositori pribadi, dan Anda telah menghabiskan menit dari rencana gratis dan tidak ingin membayar untuk rilis baru, atau mungkin Anda lebih suka mengirimkan aplikasi secara manual.

**_Mari kita lakukan_**

Ok, pertama kita perlu membuat file **_.env_** di path _my_project_path/fastlane_, tepat di path yang sama dengan _Fastfile_, untuk bisa membuat properti _secret_ yang sama seperti yang ada di _GitHub_, seperti di bawah ini:

.env file untuk deploy dari mesin lokal

Sekarang, Anda bisa pergi ke _terminal_ dan meluncurkan _Fastlane_ dari mesin Anda:

```
fastlane closed_beta
```

> **❌ Penting tentang file** _.env_ **, karena kita tidak ingin mengekspos data ini, kita harus menambahkannya di** _.gitignore_ **kita, seperti ini: ❌**

```
fastlane/*.env
```

Ini seharusnya bekerja sama seperti yang terjadi dari GitHub Actions di mesin remote tapi di mesin lokal kita. 🍻

![Local Fastlane run](/local_fastlane.webp)

Eksekusi Terminal: $ Fastlane closed_beta

**_Jika Anda sudah sampai di sini, selamat, sekarang Anda memiliki proses yang sepenuhnya otomatis untuk aplikasi iOS Anda dengan Fastlane dan GitHub Actions._**

> Setiap kali Anda mengirim commit baru, sebuah rilis akan dibangun di konsol Google Play, saluran beta.
Saya akan meningkatkan blog ini dengan umpan balik Anda, jika Anda memiliki pertanyaan atau saran, silakan beri tahu saya melalui email martin@capgo.app

### Build di perangkat Anda

Jika Anda masih perlu membangun di perangkat Anda, Anda perlu menambahkannya secara manual ke provisioning.
Hubungkan perangkat Anda ke mac dan buka menu perangkat
![find devic ios menu](/find_ios_device.webp)
Kemudian salin identifier Anda
![find identifier ios](/find_ios_identifier.webp)
Dan kemudian mulai perintah:
`fastlane register_new_device`
ini akan meminta Anda untuk mengatur nama perangkat dan identifier:
![set identifier ios](/set_identifier.webp)

### jika Anda mengalami masalah

Jika Anda mengalami masalah dengan perangkat dev tidak bisa test dll biasanya ini memperbaikinya.

Ada perintah ajaib yang bisa menyelamatkan Anda:
```shell
fastlane match nuke development
fastlane match development
```

Kemudian:
Bersihkan proyek dengan menekan Shift(⇧)+Command(⌘)+K atau memilih Product > Clean (mungkin berlabel "Clean Build Folder")

Kemudian coba jalankan lagi aplikasi di perangkat Anda.

### Terima kasih

Blog ini didasarkan pada artikel-artikel berikut:
- [Continuous delivery for IOS using Fastlane and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlane Documentation](https://docs.fastlane.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
