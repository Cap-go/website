---
slug: automatic-capacitor-android-build-github-action
title: Pembuatan Otomatis Android dengan Capacitor melalui GitHub Actions
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi Android Capacitor Menggunakan
  fastlane dan GitHub Actions dalam 5 Menit
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2025-12-31T01:19:38.000Z
head_image: /fastlane_android.webp
head_image_alt: Ilustrasi GitHub Actions Fastlane Google Play
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates, Capacitor
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-ios-build-github-action
---
# Build Android Otomatis dengan GitHub Actions

Menyiapkan CI/CD untuk aplikasi Capacitor bisa kompleks dan memakan waktu. Berikut yang perlu Anda ketahui:

## Prasyarat

Sebelum memulai, Anda perlu menyiapkan:

- Akun GitHub dengan akses admin
- Aplikasi Anda sudah dipublikasikan di Google Play Store dengan penandatanganan yang sesuai 
- File kunci penandatanganan dan keystore Android
- Proyek Google Cloud Console dengan API Play Store yang diaktifkan
- Akun layanan dengan izin yang sesuai
- Pemahaman tentang alur kerja GitHub Actions
- Pengetahuan tentang konfigurasi Fastlane
- Waktu untuk memelihara dan debug pipeline

## Setup CI/CD Profesional oleh Capgo

Lewati kerumitannya. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) mengkonfigurasi pipeline CI/CD Anda langsung di platform pilihan Anda:

- **Independen Platform**: Bekerja dengan GitHub Actions, GitLab CI, atau lainnya
- **Integrasi Mulus**: Tidak perlu beralih platform, bekerja dengan proses Anda saat ini
- **Konfigurasi Disesuaikan**: Setup yang disesuaikan dengan kebutuhan proyek Anda
- **Panduan Ahli**: Kami telah menyiapkan CI/CD untuk 50+ aplikasi

### Harga
- Biaya setup satu kali: $2,600
- Biaya operasional Anda: ~$300/tahun
- Bandingkan dengan solusi proprietary lainnya: $6,000/tahun
- **Hemat $26,100 selama 5 tahun**

[Setup CI/CD Sekarang](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Panduan Setup Manual

Jika Anda masih ingin menyiapkan semuanya sendiri, berikut yang perlu Anda lakukan:

## Harga GitHub Actions

![Price GitHub Action](/price_github_actions.webp)

GitHub Actions menawarkan menit gratis berdasarkan jenis repositori:
- Repositori publik: 2,000 menit/bulan
- Repositori privat: 2,000 menit/bulan (runner Linux)

Untuk proyek privat, biayanya sekitar $0.008/menit. Build tipikal membutuhkan 3-5 menit.

## Langkah Setup Manual

1. Siapkan Fastlane
2. Konfigurasi rahasia GitHub
3. Buat alur kerja GitHub Actions

## 1. Siapkan Fastlane

Buat folder `fastlane` di root proyek Anda dan tambahkan `Fastfile` dengan konten ini:

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
        
        # Get previous build number and increment
        previous_build_number = google_play_track_version_codes(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            track: "internal",
            json_key_data: json_key_data,
        )[0]
        current_build_number = previous_build_number + 1
        sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        
        # Build the app
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
        
        # Upload to Play Store
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
end
```

## 2. Konfigurasi Rahasia GitHub

Anda perlu menyimpan informasi sensitif dengan aman di GitHub. Pergi ke repositori Anda → Settings → Secrets and variables → Actions → New repository secret.

### Rahasia yang Diperlukan:

1. **Kunci Akun Layanan Google Play**
   - Buat akun layanan di Google Cloud Console
   - Aktifkan API Google Play Developer
   - Berikan akses akun layanan ke aplikasi Anda di Play Console
   - Unduh file kunci JSON
   - Konversi ke base64: `base64 service_account_key.json | pbcopy`
   - Tambahkan sebagai `PLAY_CONFIG_JSON`

2. **Kunci Penandatanganan Android**
   - Konversi keystore Anda ke base64: `base64 your_keystore.jks | pbcopy`
   - Tambahkan sebagai `ANDROID_KEYSTORE_FILE`
   - Tambahkan detail keystore:
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME` (mis., com.example.app)

## 3. Buat Alur Kerja GitHub Actions

Buat `.github/workflows/build-upload-android.yml`:

```yaml
name: Build and Deploy Android App

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      
      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      - name: Build app
        run: npm run build
        
      - name: Sync Capacitor
        run: npx cap sync
        
      - name: Setup Java
        uses: actions/setup-node@v5
        with:
            distribution: 'zulu'
            java-version: '17'
            
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Run Fastlane
        uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
          
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

## Cara Kerjanya

1. Buat tag Git untuk memicu alur kerja
2. GitHub Actions membangun aplikasi Anda
3. Fastlane mengunggahnya ke saluran beta Google Play
4. Aplikasi Anda diperbarui secara otomatis

## Waktu dan Biaya Build

- Waktu build: 3-5 menit
- Biaya untuk repo privat: ~$0.04 per build
- Gratis untuk proyek open-source

## Sumber Daya

- [GitHub Actions Documentation](https://docs.github.com/en/actions/)
- [Fastlane Documentation](https://docs.fastlane.tools/)
