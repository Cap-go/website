---
slug: automatic-capacitor-android-build-github-action
title: Kompilasi Otomatis Capacitor Android dengan GitHub Actions
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi Android Ionic Anda dengan
  fastlane dan GitHub Actions dalam 5 Menit (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2022-10-27T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Ilustrasi Tindakan GitHub Fastlane Google Play
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-ios-build-github-action
---

## Pengiriman Berkelanjutan untuk Android menggunakan Fastlane dan GitHub Actions

## Prasyarat

Sebelum melanjutkan dengan tutorial ini...

- Pastikan Anda menggunakan GitHub
- Aplikasi Anda sudah diterapkan di Google Play Store
- Keinginan untuk membaca 😆...

## Penting tentang harga

![Harga GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Layanan ini 'gratis' sampai batas tertentu, tergantung pada mesin yang dipilih
Kita akan menggunakan mesin **_Linux_**, Anda dapat melihat harga dan batasannya di tangkapan layar (harga pada saat pembuatan tutorial, mungkin akan berubah di masa mendatang)

🔴 **_Setelah diperingatkan tentang persyaratan dan harga, jika Anda mau, kita lanjutkan_**

> **_📣_ Dalam postingan ini kita berasumsi bahwa kita telah membuat aplikasi di Google Play, kita memiliki kunci penandatanganan dari ekosistem Google**

## Mari kita mulai 🧑🏽💻

**Langkah-langkah yang akan diikuti dalam postingan ini**

1. _Menyalin file Fastline_
2. _Menyimpan rahasia Anda di rahasia terenkripsi GitHub_
3. _Membuat & menyimpan kunci akun layanan Google Play Anda_
4. _Menyimpan kunci penandatanganan Android Anda_
5. _Menyiapkan file yml alur kerja GitHub Actions Anda_

## 1. Menyalin file Fastline

Fastlane adalah pustaka Ruby yang dibuat untuk mengotomatiskan tugas-tugas pengembangan seluler yang umum. Menggunakan Fastlane, Anda dapat mengonfigurasi "lane" kustom yang menggabungkan serangkaian "action" yang melakukan tugas-tugas yang biasanya Anda lakukan menggunakan Android Studio. Anda bisa melakukan banyak hal dengan Fastlane, tetapi untuk tujuan tutorial ini, kita hanya akan menggunakan beberapa action inti.

Buat folder Fastlane di root proyek Anda dan salin file-file berikut:
Fastlane
```ruby
default_platform(:android)

KEYSTORE_KEY_ALIAS = ENV["KEYSTORE_KEY_ALIAS"]
KEYSTORE_KEY_PASSWORD = ENV["KEYSTORE_KEY_PASSWORD"]
KEYSTORE_STORE_PASSWORD = ENV["KEYSTORE_STORE_PASSWORD"]

platform :android do
    desc "Deploy a beta version to the Google Play"
    private_lane :verify_changelog_exists do |version_code: |
      changelog_path = "android/metadata/en-US/changelogs/#{version_code}.txt"
      UI.user_error!("Missing changelog file at #{changelog_path}") unless File.exist?(changelog_path)
      UI.message("Changelog exists for version code #{version_code}")
    end

    private_lane :verify_upload_to_staging do |version_name: |
      UI.message "Skipping staging verification step"
    end
    lane :beta do
				keystore_path = "#{Dir.tmpdir}/build_keystore.keystore"
				File.write(keystore_path, Base64.decode64(ENV['ANDROID_KEYSTORE_FILE']))
				json_key_data = Base64.decode64(ENV['PLAY_CONFIG_JSON'])
				previous_build_number = google_play_track_version_codes(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					track: "internal",
					json_key_data: json_key_data,
				)[0]

				current_build_number = previous_build_number + 1
				sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        gradle(
          task: "clean bundleRelease",
          project_dir: 'android/',
          print_command: false,
          properties: {
            "android.injected.signing.store.file" => "#{keystore_path}",
            "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
            "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
            "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
						'versionCode' => current_build_number
          })
        upload_to_play_store(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					json_key_data: json_key_data,
          track: 'internal',
          release_status: 'completed',
          skip_upload_metadata: true,
          skip_upload_changelogs: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
        )
    end
    lane :build do
      gradle(
        task: "clean bundleRelease",
        project_dir: 'android/',
        print_command: false,
        properties: {
          "android.injected.signing.store.file" => "#{keystore_path}",
          "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
          "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
          "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
        })
    end
    lane :prod_release do
      build_gradle = File.read("../android/app/build.gradle")

      verify_changelog_exists(version_code: build_gradle.match(/versionCode (\d+)/)[1])
      verify_upload_to_staging(version_name: build_gradle.match(/versionName '([\d\.]+)'/)[1])

      supply(
        track_promote_to: 'beta',
        skip_upload_apk: true,
        skip_upload_aab: true,
        skip_upload_metadata: false,
        skip_upload_changelogs: false,
        skip_upload_images: false,
        skip_upload_screenshots: false
      )
    end
end
```

## Menyimpan rahasia Anda di rahasia terenkripsi GitHub

Untuk mengautentikasi dengan API Pengembang Google Play, kita akan membutuhkan kunci akun layanan. File kunci akun layanan dianggap sensitif, yang berarti kita perlu menyimpannya dengan aman, tetapi di tempat yang dapat diakses oleh alur kerja GitHub Actions dan Fastfile kita saat diperlukan. Masukkan rahasia terenkripsi GitHub: kita akan menyimpan semua kunci sensitif dalam rahasia repositori, menyimpannya dengan aman sambil membuatnya dapat diakses secara otomatis oleh alur kerja GitHub Actions di repositori.

### Membuat & menyimpan kunci akun layanan Google Play Anda

Jika Anda perlu membuat kunci akun layanan baru, [ikuti langkah-langkah yang diuraikan di sini](https://docsrunwayteam/integrations/app-stores/google-play-console/#service-account-api-key-setup). Setelah Anda memiliki file JSON kunci akun layanan, mari kita tambahkan ke rahasia terenkripsi repositori GitHub Anda.

Untuk menambahkan rahasia baru ke rahasia terenkripsi GitHub, pertama-tama navigasikan ke repo Android tempat Anda akan menambahkan alur kerja GitHub Actions. Di sebelah kanan jauh, klik "Settings"

![Settings di repo GitHub](/github_project_settingswebp)

Kemudian, klik "Secrets",

![Secrets di repo GitHub, dari Settings](/github_project_settings_secretswebp)

lalu "Actions" dari daftar di menu sebelah kiri

![Actions di bawah Secrets di repo GitHub](/github_project_settings_secrets_actionswebp)

Ini adalah variabel lingkungan rahasia terenkripsi untuk repositori. Setiap alur kerja yang diatur pada repositori akan memiliki akses ke rahasia repositori ini.

Dari sini, klik "New repository secret" untuk menambahkan rahasia baru:

![Aksi new repository secret di GitHub](/github_project_settings_secrets_actions_newwebp)

Ketika Anda mengklik "New repository secret", Anda akan melihat formulir yang akan meminta Anda untuk memasukkan nama untuk rahasia baru Anda, dan nilainya.

![Menambahkan nama dan nilai untuk rahasia baru di GitHub](/github_project_settings_secrets_actions_new_addwebp)

Rahasia GitHub hanya menerima nilai string, jadi untuk kredensial tertentu (file jks atau json misalnya), Anda perlu terlebih dahulu mengonversi file menjadi string yang dikodekan base64 sebelum menambahkannya ke rahasia GitHub. Anda dapat melakukan ini dari baris perintah:

```
base64 in_file_path | pbcopy
```

Ini menyalin string yang dihasilkan ke clipboard Anda, sehingga Anda dapat langsung menempelkannya ke rahasia repositori baru di GitHub.Berikut adalah terjemahan teks tersebut ke dalam bahasa Indonesia:

Sebagai contoh:

```
base64 service_account_key.json | pbcopy
```

Mari kita buat rahasia repositori baru sebagai berikut:

- PLAY_CONFIG_JSON: kunci JSON akun layanan yang dikodekan base64

_Harap perhatikan bahwa Anda harus menyimpan salinan cadangan rahasia Anda secara aman di lokasi lain (di tempat yang bukan rahasia terenkripsi GitHub), karena Anda tidak akan dapat mengekspor atau mengakses kredensial tersebut lagi dari GitHub setelah Anda menambahkannya_

Dengan kunci akun layanan kita yang telah ditambahkan ke rahasia repositori GitHub, kita sekarang dapat mengautentikasi dengan API Google Play Developer dari dalam alur kerja GitHub Actions mana pun yang ditambahkan ke repositori

![Rahasia baru berhasil ditambahkan di GitHub](/github_project_settings_secrets_addedwebp)

### Menyimpan kunci penandatanganan Android Anda

Untuk [menandatangani build rilis Android](https://developerandroidcom/studio/publish/app-signing/) dengan benar di CI, alur kerja akan membutuhkan akses ke kunci unggah Android atau kunci penandatanganan aplikasi. Aplikasi yang dibuat setelah Agustus 2021 akan menggunakan sistem [Play App Signing](https://developerandroidcom/studio/publish/app-signing/#app-signing-google-play/) baru dari Google secara default, di mana kunci unggah yang dikelola pengguna digunakan untuk menandatangani AAB sebelum diunggah, tetapi kunci penandatanganan aplikasi dikelola oleh Google. Jika tim Anda menggunakan Play App Signing Google, maka yang Anda butuhkan untuk pipeline CI hanyalah _kunci unggah_ aplikasi Anda, karena penandatanganan ditunda hingga setelah AAB diunggah ke Play Console. Jika Anda masih perlu membuat kunci unggah dan keystore, ikuti [petunjuk](https://developerandroidcom/studio/publish/app-signing/#generate-key/) yang ada di dokumentasi pengembang Android.

Jika tim Anda belum beralih ke sistem Play App Signing Google, maka Anda perlu membuat kunci _penandatanganan_ aplikasi Anda tersedia untuk alur kerja CI agar dapat menandatangani aplikasi Anda dengan benar sebelum diunggah.

Tambahkan hal berikut sebagai rahasia repositori:

- ANDROID_KEYSTORE_FILE: file `jks` atau `keystore` yang dikodekan base64 yang digunakan untuk menandatangani build Android Anda. Ini akan menjadi file keystore yang terkait dengan kunci unggah Anda (jika menggunakan Play App Signing), atau kunci penandatanganan aplikasi Anda.
- KEYSTORE_KEY_PASSWORD: kata sandi yang terkait dengan file keystore
- KEYSTORE_KEY_ALIAS: alias keystore
- KEYSTORE_STORE_PASSWORD: kata sandi kunci pribadi
- DEVELOPER_PACKAGE_NAME: ID aplikasi Android Anda seperti com.example.app

Dengan rahasia ini ditambahkan ke rahasia repositori GitHub, kita siap untuk menyiapkan alur kerja GitHub Actions kita untuk menjalankan build kita.

![Beberapa rahasia berhasil ditambahkan di GitHub](/github_project_settings_multi_secrets_addedwebp)

## Siapkan file yml alur kerja GitHub Actions Anda

Sekarang, mari kita siapkan file yml alur kerja GitHub Actions Android kita – ini akan mendefinisikan langkah-langkah yang akan kita jalankan sebagai bagian dari alur kerja kita. Dalam langkah-langkah ini, kita akan memanggil lane Fastlane kita.

Pertama, mari kita buat folder yang diperlukan. Dari direktori root proyek Anda, panggil:

```
mkdir .github && cd .github && mkdir workflows && cd workflows && touch build-upload-android.yml
```

Kemudian, tempelkan kode berikut ke dalam file `build-upload-android.yml` yang baru Anda buat:

```yaml
name: Build source code on android

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        id: install_code
        run: npm ci
      - uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
      - name: Build
        id: build_code
        run: npm run build
      - name: Sync
        id: sync_code
        run: npx cap sync
      - name: Setup java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

Alur kerja ini harus dipicu setelah setiap _tag_ GitHub, jika Anda perlu mengotomatisasi tag, silakan lihat [Build dan rilis otomatis dengan GitHub actions](/blog/automatic-build-and-release-with-github-actions/)

Kemudian alur kerja ini akan menarik dependensi Nodejs Anda, menginstalnya, dan membangun aplikasi JavaScript Anda.

Aplikasi Anda tidak perlu menggunakan Ionic, hanya basis Capacitor yang wajib, itu bisa memiliki modul Cordova lama, tetapi plugin JS Capacitor sebaiknya lebih disukai.

> Setiap kali Anda mengirim komit baru, rilis akan dibangun di konsol Google Play, saluran beta.

Saya akan meningkatkan blog ini dengan umpan balik Anda, jika Anda memiliki pertanyaan atau saran, silakan beri tahu saya melalui email martin@capgo.app

## **Pemrosesan Build**

Di GitHub Actions, **Anda ditagih berdasarkan menit** yang Anda gunakan untuk menjalankan alur kerja CI/CD Anda. Dari pengalaman, dibutuhkan sekitar 3-5 menit sebelum build dapat diproses di Google Play Store.

Untuk proyek pribadi, perkiraan biaya per build bisa mencapai **$0,008/menit x 5 menit = $0,04**.4**, atau lebih, tergantung pada konfigurasi atau dependensi proyek Anda

Untuk proyek Open-source, ini seharusnya tidak menjadi masalah sama sekali. Lihat [pricing](https://githubcom/pricing/)

### Terima Kasih

Blog ini didasarkan pada artikel-artikel berikut:
- [Automate publishing app to the Google Play Store with GitHub Actions⚡+ Fastlane🏃](https://mediumcom/scalereal/automate-publishing-app-to-the-google-play-store-with-github-actions-fastlane-ac9104712486/)
- [Getting Started CI/CD for Android Project (Part - 3— GitHub Actions)](https://proandroiddevcom/getting-started-ci-cd-for-android-project-part-3-github-actions-157857224cb1/)
- [Android Continuous Integration using Fastlane and CircleCI 20 — Part III](https://mediumcom/pink-room-club/android-continuous-integration-using-fastlane-and-circleci-2-0-part-iii-ccdf5b83d8f5/)
- [How to set up a CI/CD pipeline for your Android app using Fastlane and GitHub Actions](https://wwwrunwayteam/blog/ci-cd-pipeline-android-app-fastlane-github-actions/)
- [Fastlane Documentation](https://docsfastlanetools/getting-started/android/beta-deployment/)
- [This GitHub message from @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)