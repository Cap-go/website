---
slug: automatic-capacitor-android-build-gitlab
title: Pembangunan otomatis Capacitor Android dengan GitLab
description: >-
  Cara menyiapkan pipeline CI/CD untuk aplikasi Android Ionic Anda menggunakan
  fastlane dan GitLab dalam 5 menit
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Ilustrasi Fastlane Google Play GitLab
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: id
next_blog: null
---
# Build Android Otomatis dengan GitLab CI

Mengatur CI/CD untuk aplikasi Capacitor bisa menjadi rumit dan memakan waktu. Berikut yang perlu Anda ketahui:

## Prasyarat

Sebelum memulai, Anda perlu menyiapkan:

- Akun GitLab dengan akses admin
- Aplikasi Anda sudah diterbitkan di Google Play Store dengan tanda tangan yang benar
- Kunci tanda tangan Android dan file keystore
- Proyek Google Cloud Console dengan Play Store API diaktifkan
- Akun layanan dengan izin yang tepat
- Pemahaman tentang alur kerja GitLab CI/CD
- Pengetahuan tentang konfigurasi Fastlane
- Waktu untuk memelihara dan memperbaiki pipa

## Pengaturan CI/CD Profesional oleh Capgo

Lewati kerumitan. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) mengonfigurasi pipa CI/CD Anda langsung di platform yang Anda pilih:

- **Independensi Platform**: Bekerja dengan GitHub Actions, GitLab CI, atau lainnya
- **Integrasi Mulus**: Tidak perlu beralih platform, bekerja dengan proses Anda saat ini
- **Konfigurasi Khusus**: Pengaturan yang disesuaikan sesuai kebutuhan proyek Anda
- **Panduan Ahli**: Kami telah mengatur CI/CD untuk 50+ aplikasi

### Harga
- Biaya pengaturan satu kali: $2,600
- Biaya berjalan Anda: ~$300/tahun
- Bandingkan dengan solusi proprietary lainnya: $6,000/tahun
- **Hemat $26,100 selama 5 tahun**

[Atur CI/CD Sekarang](https://cal.com/capgo/mobile-ci-cd-done-for-you/)

## Panduan Pengaturan Manual

Jika Anda masih ingin mengatur semuanya sendiri, berikut yang perlu Anda lakukan:

**Langkah-langkah yang harus diikuti dalam pos**

1.  _Salin file Fastlane_
2.  _Menyimpan rahasia Anda di rahasia terenkripsi GitLab_
3.  _Membuat & menyimpan kunci akun layanan Google Play Anda_
4.  _Menyimpan kunci tanda tangan Android Anda_
5.  _Siapkan file .yml alur kerja GitLab Anda_

## 1. Salin file Fastlane

Fastlane adalah pustaka Ruby yang dibuat untuk mengotomatisasi tugas pengembangan mobile yang umum. Menggunakan Fastlane, Anda dapat mengonfigurasi "jalur" kustom yang menggabungkan serangkaian "tindakan" yang melakukan tugas yang biasanya Anda lakukan menggunakan Android Studio. Anda dapat melakukan banyak hal dengan Fastlane, tetapi untuk tujuan tutorial ini, kami hanya akan menggunakan beberapa tindakan inti.

Buat folder Fastlane di akar proyek Anda dan salin file berikut:
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

### Menyimpan Rahasia Anda di Variabel CI/CD GitLab

GitLab menyediakan cara untuk menyimpan variabel CI/CD terenkripsi, mirip dengan rahasia repositori GitHub. Untuk menyimpan informasi sensitif Anda dengan aman.

1. Buka Pengaturan proyek GitLab Anda.
2. Arahkan ke CI/CD > Variabel
3. Tambahkan variabel berikut:

-   ANDROID_KEYSTORE_FILE: file `.jks` atau `.keystore` yang dikodekan base64 yang digunakan untuk menandatangani build Android Anda. Ini akan menjadi file keystore yang terkait dengan kunci unggahan Anda (jika menggunakan Tanda Tangan Aplikasi Play), atau kunci tanda tangan aplikasi Anda.
-   KEYSTORE_KEY_PASSWORD: kata sandi yang terkait dengan file keystore
-   KEYSTORE_KEY_ALIAS: alias penyimpan kunci
-   KEYSTORE_STORE_PASSWORD: kata sandi kunci privat
-   DEVELOPER_PACKAGE_NAME: ID aplikasi android Anda seperti com.example.app
-   PLAY_CONFIG_JSON: Kunci akun layanan JSON yang dikodekan base64.

### Membuat Kunci Akun Layanan Google Play

Untuk menghasilkan rahasia `PLAY_CONFIG_JSON`, ikuti langkah-langkah berikut:

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat proyek baru atau pilih yang sudah ada
3. Aktifkan Google Play Android Developer API
4. Buat akun layanan:
   - Buka "IAM & Admin" > "Akun Layanan"
   - Klik "Buat Akun Layanan"
   - Beri nama dan deskripsi
   - Klik "Buat dan Lanjutkan"
   - Lewati penugasan peran dan klik "Selesai"
5. Hasilkan kunci JSON:
   - Temukan akun layanan Anda dalam daftar
   - Klik menu tiga titik > "Kelola kunci"
   - Klik "Tambahkan Kunci" > "Buat kunci baru"
   - Pilih format JSON
   - Klik "Buat"
6. Berikan akses akun layanan ke aplikasi Anda di Play Console:
   - Buka [Play Console](https://play.google.com/console)
   - Arahkan ke "Pengguna dan izin"
   - Klik "Undang pengguna baru"
   - Masukkan email akun layanan (diakhiri dengan @*.iam.gserviceaccount.com)
   - Berikan izin "Rilis ke produksi"
   - Klik "Undang pengguna"
7. Konversi kunci JSON ke base64:
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. Tambahkan string yang dikodekan base64 sebagai variabel `PLAY_CONFIG_JSON` di GitLab

## Siapkan Pipa CI/CD GitLab Anda

Buat file .gitlab-ci.yml di akar proyek Anda untuk mendefinisikan pipa CI/CD Anda. Berikut adalah contoh cara Anda dapat menyusun pipa Anda:

```yaml

image: mingc/android-build-box:latest

stages:
  - build
  - upload_to_capgo
  - build_and_upload_android

build:
  stage: build
  tags:
    - saas-linux-xlarge-amd64
  cache:
    - key:
        files:
          - bun.lockb
      paths:
        - .node_modules/
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - node_modules/
      - dist/
  only:
    - master

upload_to_capgo:
  stage: upload_to_capgo
  tags:
    - saas-linux-xlarge-amd64
  script:
    - npx @capgo/cli@latest bundle upload -a $CAPGO_TOKEN -c dev
  dependencies:
    - build
  when: manual
  only:
    - master

build_and_upload_android:
  tags:
    - saas-linux-xlarge-amd64
  stage:    build_and_upload_android
  cache:
    - key:
        files:
          - android/gradle/wrapper/gradle-wrapper.properties
      paths:
        - ~/.gradle/caches/
  script:
    - npx cap sync android
    - npx cap copy android
    - bundle exec fastlane android beta # We do create a tag for the build to trigger XCode cloud builds
  dependencies:
    - build
  when: manual
  only:
    - master

```

## Memicu Pipa

Setiap kali Anda mendorong tag baru ke repositori GitLab Anda, GitLab CI/CD akan secara otomatis memicu pipa yang telah didefinisikan, yang akan membangun dan menerapkan aplikasi Android Anda menggunakan Fastlane.

Pastikan untuk menyesuaikan jalur dan ketergantungan sesuai dengan struktur dan kebutuhan proyek Anda. Pengaturan ini akan membantu Anda mengotomatisasi penerapan aplikasi Android Anda di GitLab CI/CD.

## Kesimpulan

Dengan mengonfigurasi GitLab CI/CD dengan gambar Docker mingc/android-build-box, Anda dapat mengotomatiskan proses build aplikasi Android, menjadikan alur kerja pengembangan Anda lebih efisien dan andal. Automasi ini membebaskan waktu Anda untuk fokus pada aspek-aspek inti pengembangan aplikasi, akhirnya membantu Anda menyampaikan aplikasi Android berkualitas tinggi dengan lebih efisien.
