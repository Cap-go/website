---
slug: automatic-build-and-release-with-gitlab
title: Pembangunan dan rilis otomatis dengan Gitlab
description: >-
  Buat pipeline CI/CD Anda sendiri dengan Gitlab secara gratis, terapkan
  aplikasi Anda setiap kali Anda melakukan push ke main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /gitlab_ci.webp
head_image_alt: Ilustrasi Gitlab CI
keywords: 'Gitlab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: id
next_blog: ''
---
Tutorial ini fokus pada GitLab CI, tetapi Anda dapat menyesuaikannya dengan sedikit perubahan ke platform CI/CD lainnya.

## Pengantar 

Pastikan Anda telah menambahkan aplikasi Anda terlebih dahulu ke Capgo, tutorial ini hanya berfokus pada fase upload.

## Konvensi commit

Pertama, Anda perlu mulai mengikuti konvensi commit [konvensional commits](https://www.conventionalcommits.org/en/v1.0.0/) ini akan membantu alat memahami cara meningkatkan nomor versi, ini hanya perlu 5 menit untuk mempelajarinya.

![Conventional commits](/conventional_commits.webp)

## GitLab CI untuk tag

Kemudian, Anda perlu membuat GitLab pertama Anda untuk secara otomatis membangun dan membuat tag.

Buat file di jalur ini: `.github/workflows/bump_version.yml`

dengan konten ini:

```toml
name: Bump version

on:
  push:
    branches:
      - main

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v6
        with:
          fetch-depth: 0
          filter: blob:none
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        run: npx capacitor-standard-version
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags
```

Ini akan merilis tag untuk setiap commit di cabang utama Anda. Dan menambahkan entri changelog untuk setiap commit di cabang utama di `CHANGELOG.md`.

Jangan khawatir jika Anda tidak memiliki file ini, file ini akan dibuat untuk Anda.

Untuk membuat ini berfungsi, buat [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _di dalam_ rahasia GitHub Anda [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") sebagai `PERSONAL_ACCESS_TOKEN`.

Ini diperlukan untuk memungkinkan CI melakukan commit changelog.

Ketika Anda membuat token, pilih masa berlaku sebagai `never` dan lingkup sebagai `repo`.

Terakhir, untuk memungkinkan alat memahami di mana versi Anda disimpan, Anda harus membuat file `.cz.toml` di root repositori Anda.

Dan tambahkan ini di dalamnya:

```toml
[tool.commitizen]
name = "cz_conventional_commits"
tag_format = "$major.$minor.$patch$prerelease"
version = "0.11.5"
version_files = [
    "package.json:version",
    ".cz.toml"
]
```

Set versi di file ini sama dengan yang Anda miliki di file `package.json` Anda.

Ini hanya diperlukan untuk pertama kali, kemudian alat akan menjaga tetap terbaru.

Anda sekarang dapat melakukan commit kedua file ini dan melihat tag pertama Anda muncul di GitHub!

## Tindakan GitHub untuk build

Buat file di jalur ini: `.github/workflows/build.yml`

dengan konten ini:

```toml
name: Build source code and send to Capgo

on:
  push:
    tags:
      - '*'
      
jobs:
  deploy:
    runs-on: ubuntu-latest
    name: "Build code and release"
    steps:
      - name: Check out
        uses: actions/checkout@v6
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Ini akan menginstal dan membangun ketergantungan Anda sebelum mengirimnya ke Capgo.

Jika perintah Anda untuk build berbeda, Anda dapat mengubahnya di langkah `build_code`.

Untuk membuat ini berfungsi, Anda perlu mendapatkan kunci API Anda untuk Capgo, tambahkan di [rahasia repositori GitHub Anda](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) sebagai `CAPGO_TOKEN`.

Anda sekarang dapat melakukan commit kedua file ini dan melihat tag pertama Anda muncul di GitHub!

Menambahkan komit akan menghasilkan build baru untuk saluran produksi.

Anda harus menambahkan pengujian Anda dalam langkah build untuk memastikan kode Anda berfungsi.

Buka dasbor Capgo Anda dan periksa build Anda yang baru saja muncul, Anda sekarang memiliki sistem CI/CD Anda.

Jika Anda ingin semua pengguna Anda mendapatkan pembaruan kapan pun tersedia, pergi ke saluran Anda dan atur menjadi `public`.
