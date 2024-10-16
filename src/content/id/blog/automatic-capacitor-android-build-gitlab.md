---
slug: automatic-capacitor-android-build-gitlab
title: Kompilasi Otomatis Capacitor Android dengan GitLab
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi Android Ionic Anda dengan
  fastlane dan GitLab dalam 5 Menit
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Ilustrasi Fastlane Google Play dari GitLab
tag: CI/CD
published: true
locale: id
next_blog: null
---

## Prasyarat

Sebelum melanjutkan tutorial ini...

- Pastikan Anda menggunakan GitLab
- Aplikasi Anda sudah di-deploy di Google Play Store
- Keinginan untuk membaca 😆...

**Langkah-langkah yang akan diikuti dalam postingan ini**

1. _Menyalin file Fastline_
2. _Menyimpan rahasia Anda di rahasia terenkripsi GitLab_
3. _Membuat & menyimpan kunci akun layanan Google Play Anda_
4. _Menyimpan kunci penandatanganan Android Anda_
5. _Menyiapkan file yml alur kerja GitLab Anda_

## 1. Menyalin file Fastline

Fastlane adalah pustaka Ruby yang dibuat untuk mengotomatisasi tugas-tugas pengembangan seluler yang umum. Menggunakan Fastlane, Anda dapat mengonfigurasi "lane" kustom yang menggabungkan serangkaian "aksi" yang melakukan tugas-tugas yang biasanya Anda lakukan menggunakan Android Studio. Anda dapat melakukan banyak hal dengan Fastlane, tetapi untuk tujuan tutorial ini, kita hanya akan menggunakan beberapa aksi inti.

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

### Menyimpan Rahasia Anda di Variabel CI/CD GitLab

GitLab menyediakan cara untuk menyimpan variabel CI/CD terenkripsi, mirip dengan rahasia repositori GitHub. Untuk menyimpan informasi sensitif Anda dengan aman:

1. Pergi ke Pengaturan proyek GitLab Anda
2. Navigasi ke CI/CD > Variabel
3. Tambahkan variabel berikut:

- ANDROID_KEYSTORE_FILE: file `jks` atau `keystore` yang dienkode base64 yang digunakan untuk menandatangani build Android Anda. Ini akan menjadi file keystore yang terkait dengan kunci unggah Anda (jika menggunakan Play App Signing), atau kunci penandatanganan aplikasi Anda
- KEYSTORE_KEY_PASSWORD: kata sandi yang terkait dengan file keystore
- KEYSTORE_KEY_ALIAS: alias kunci store
- KEYSTORE_STORE_PASSWORD: kata sandi kunci pribadi
- DEVELOPER_PACKAGE_NAME: ID aplikasi android Anda seperti com.example.app
- PLAY_CONFIG_JSON: Kunci akun layanan JSON yang dienkode base64

## Menyiapkan Pipeline CI/CD GitLab Anda

Buat file gitlab-ci.yml di root proyek Anda untuk mendefinisikan pipeline CI/CD Anda. Berikut adalah contoh bagaimana Anda dapat menyusun pipeline Anda:

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
    - npx @capgo/cli@latest upload -a $CAPGO_TOKEN -c dev
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

## Memicu Pipeline

Setiap kali Anda mendorong tag baru ke repositori GitLab Anda, GitLab CI/CD akan secara otomatis memicu pipeline yang telah didefinisikan, yang akan membangun dan men-deploy aplikasi Android Anda menggunakan Fastlane.

Pastikan untuk menyesuaikan jalur dan dependensi sesuai dengan struktur dan kebutuhan proyek Anda. Pengaturan ini akan membantu Anda mengotomatisasi proses deployment aplikasi Android Anda di GitLab CI/CD.

## Kesimpulan

Dengan mengonfigurasi GitLab CI/CD dengan gambar Docker mingc/android-build-box, Anda dapat mengotomatisasi proses build aplikasi Android, membuat alur kerja pengembangan Anda lebih efisien dan andal. Otomatisasi ini membebaskan waktu Anda untuk fokus pada aspek inti pengembangan aplikasi, yang pada akhirnya membantu Anda menghasilkan aplikasi Android berkualitas tinggi dengan lebih efisien.