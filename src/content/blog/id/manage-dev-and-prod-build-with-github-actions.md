---
slug: manage-dev-and-prod-build-with-github-actions
title: Kelola pembangunan pengembangan dan produksi dengan aksi GitHub
description: >-
  Gunakan Capgo untuk merilis devbuild Anda ke saluran tertentu, dan biarkan tim
  Anda mencoba aplikasi Ionic Capacitor Anda, tanpa menunggu tinjauan dari Apple
  dan Google.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Ilustrasi pembangunan saluran
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: id
next_blog: how-to-send-specific-version-to-users
---
Tutorial ini berfokus pada hosting GitHub, tetapi Anda dapat mengadaptasinya dengan sedikit penyesuaian untuk platform CI/CD lainnya.

## Pendahuluan

Pastikan Anda telah menambahkan aplikasi Capacitor Anda terlebih dahulu ke Capgo, tutorial ini hanya fokus pada fase unggah.

## Konvensi commit

Pertama, Anda perlu mulai mengikuti konvensi commit [komit konvensional](https://www.conventionalcommits.org/en/v1.0.0/) ini akan membantu alat memahami bagaimana mengupgrade nomor versi, ini hanya memerlukan 5 menit untuk mempelajarinya.

![Komit konvensional](/conventional_commits.webp)

## Aksi GitHub untuk tag

Kemudian Anda perlu membuat aksi GitHub pertama Anda untuk secara otomatis membangun dan membuat tag.

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
        uses: actions/checkout@v6
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

Ini akan merilis tag untuk setiap commit di cabang utama Anda. Dan rilis `alpha` untuk `development`, dan terakhir entri changelog untuk setiap commit di `CHANGELOG.md`.

Jangan khawatir jika Anda tidak memiliki file ini, itu akan dibuat untuk Anda.

Untuk membuat ini berfungsi, Anda perlu membuat [ACCESS PRIBADI](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _di dalam_ GitHub Anda [rahasia](https://docs.github.com/en/actions/security-guides/encrypted-secrets "rahasia GitHub") sebagai `PERSONAL_ACCESS_TOKEN`.

Ini diperlukan agar CI bisa mengkomit changelog dan peningkatan versi.

Ketika Anda membuat token, pilih masa berlaku sebagai `tidak pernah` dan ruang lingkupnya sebagai `repo`.

Atur kunci `version` di file `package.json` Anda. Gunakan versi terakhir yang dirilis di Toko.

Ini hanya diperlukan untuk pertama kali, kemudian alat akan memperbaruinya secara otomatis.

Anda sekarang dapat mengkomit kedua file ini dan melihat tag pertama Anda muncul di GitHub!

`capacitor-standard-version` adalah paket yang melakukan keajaiban, secara default, dia juga memperbarui nomor versi Anda di Android dan IOS.

## Aksi GitHub untuk build

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
        uses: actions/checkout@v6
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

Ini akan menginstal dan membangun ketergantungan Anda sebelum mengirimkannya ke Capgo.

Jika perintah untuk membangun Anda berbeda, Anda dapat mengubahnya di langkah `build_code`.

Jika Anda memerlukan variabel lingkungan, gunakan `MY_ENV_VAR` dan atur `rahasia` di pengaturan proyek GitHub Anda, kemudian rahasia dan GitHub Action.

Untuk membuat unggahan Capgo berfungsi, Anda perlu mendapatkan kunci API Anda untuk Capgo, tambahkan ke [rahasia repositori GitHub Anda](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) sebagai `CAPGO_TOKEN`.

Anda sekarang dapat mengkomit kedua file ini dan melihat versi pertama Anda muncul di Capgo!

Penambahan commit akan menghasilkan build Capacitor baru untuk saluran produksi dan pengembangan.

Anda harus menambahkan pengujian Anda di langkah build Ionic untuk memastikan kode Anda berfungsi.

Kunjungi dashboard Capgo Anda dan periksa build yang baru saja muncul, Anda sekarang memiliki sistem CI/CD Anda.
