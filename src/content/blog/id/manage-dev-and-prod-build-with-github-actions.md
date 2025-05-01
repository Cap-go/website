---
slug: manage-dev-and-prod-build-with-github-actions
title: Gestisci lo sviluppo e la build di produzione con GitHub actions
description: >-
  Gunakan Capgo untuk mempublikasikan versi pengembangan ke saluran tertentu dan
  biarkan tim Anda menguji aplikasi Capacitor Ionic tanpa perlu menunggu
  peninjauan dari Apple dan Google
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Channel-Builds-Illustration
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: id
next_blog: how-to-send-specific-version-to-users
---

Tutorial ini berfokus pada hosting GitHub, tetapi Anda dapat mengadaptasinya dengan sedikit penyesuaian untuk platform CI/CD lainnya

## Pendahuluan

Pastikan Anda telah menambahkan aplikasi Capacitor Anda terlebih dahulu ke Capgo, tutorial ini hanya berfokus pada fase upload

## Konvensi commit

Pertama Anda perlu mulai mengikuti konvensi commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) ini akan membantu peralatan memahami bagaimana meningkatkan nomor versi, hanya butuh 5 menit untuk mempelajarinya

![Conventional commits](/conventional_commits.webp)

## GitHub actions untuk tag

Kemudian Anda perlu membuat GitHub action pertama Anda untuk secara otomatis membangun dan membuat tag

Buat file di path ini: `.github/workflows/bump_version.yml`

dengan konten ini:

```toml
name: Bump version

on:
  push:
    branches:
      - main
      - development

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        if: github.ref == 'refs/heads/main'
        run: npx capacitor-standard-version
      - name: Create bump and changelog
        if: github.ref != 'refs/heads/main'
        run: npx capacitor-standard-version --prerelease alpha
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags

```

Ini akan merilis tag untuk setiap commit di branch main Anda Dan rilis `alpha` untuk `development`, dan terakhir entri changelog untuk setiap commit di `CHANGELOG.md`

Jangan khawatir jika Anda tidak memiliki file ini, file akan dibuat untuk Anda

Untuk membuat ini berfungsi, Anda perlu membuat [PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) dan menyimpannya di [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") GitHub Anda sebagai `PERSONAL_ACCESS_TOKEN`

Ini diperlukan agar CI dapat melakukan commit changelog dan pembaruan versi

Saat membuat token, pilih kadaluarsa sebagai `never` dan scope sebagai `repo`

Atur kunci `version` di file `package.json` Anda. Gunakan versi terakhir yang dirilis di Store

Ini hanya diperlukan pertama kali, kemudian tools akan memperbarui secara otomatis

Anda sekarang dapat melakukan commit kedua file ini dan melihat tag pertama Anda muncul di GitHub!

`capacitor-standard-version` adalah paket yang melakukan keajaiban, secara default, dia juga memperbarui nomor versi di Android dan iOS

## GitHub actions untuk build

Buat file di path ini: `.github/workflows/build.yml`

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
        uses: actions/checkout@v4
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm build
        env:
          MY_ENV_VAR: ${{ secrets.MY_ENV_VAR }}
      - name: Create Release Alpha
        if: "contains(github.ref, '-alpha.')"
        id: create_release_prepro
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c development
      - name: Create Release Production
        if: "!contains(github.ref, '-alpha.')"
        id: create_release_prod
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Ini akan menginstal dan membangun dependensi Anda sebelum mengirimkannya ke Capgo

Jika perintah build Anda berbeda, Anda dapat mengubahnya di langkah `build_code`

Jika Anda memerlukan variabel lingkungan, gunakan `MY_ENV_VAR` dan atur `secret` di pengaturan proyek GitHub Anda, kemudian secret lalu GitHub Action

Untuk membuat upload Capgo berfungsi, Anda perlu mendapatkan API key untuk Capgo, tambahkan di [secret repositori GitHub Anda](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) sebagai `CAPGO_TOKEN`

Anda sekarang dapat melakukan commit kedua file ini dan melihat versi pertama Anda muncul di Capgo!

Menambahkan commit akan menghasilkan build Capacitor baru untuk channel production dan development

Anda harus menambahkan tes Anda di langkah build Ionic untuk memastikan kode Anda berfungsi

Pergi ke dashboard Capgo Anda dan periksa build Anda yang baru saja muncul, sekarang Anda memiliki sistem CI/CD Anda