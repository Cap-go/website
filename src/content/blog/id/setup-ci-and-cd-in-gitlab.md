---
slug: konfigurasi-ci-dan-cd-gitlab
title: Pembangunan dan Peluncuran Otomatis Aplikasi dengan GitLab
description: >-
  Buat pipeline CI/CD Anda sendiri dengan GitLab secara gratis dan deploy
  aplikasi Ionic Capacitor JS Anda setiap kali melakukan push ke branch main.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD di GitLab
keywords: 'GitLab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: id
next_blog: ''
original_slug: configuration-ci-et-cd-gitlab
---
Artikel ini akan memandu Anda tentang cara melakukan pengaturan CI/CD pipeline dengan GitLab.

## Pendahuluan

Pastikan Anda telah menambahkan aplikasi Capacitor Anda terlebih dahulu ke Capgo, tutorial ini hanya berfokus pada fase upload. Jika Anda perlu menambahkan aplikasi Anda ke Capgo, Anda dapat mengikuti [Tutorial](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/) ini.

## Konvensi Commit

Pertama Anda perlu mulai mengikuti konvensi commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) ini akan membantu peralatan memahami cara meningkatkan nomor versi, hanya butuh 5 menit untuk mempelajarinya.

![Conventional commits](/conventional_commits.webp)

## GitLab CI/CD untuk Tag

Buat file .gitlab-ci.yml di root repositori GitLab Anda dengan konten berikut

      stages:
          - tag

     bump_version:
       stage: tag
       only:
         - main
      except:
        variables:
      - $CI_COMMIT_MESSAGE =~ /^chore\(release\):/
      script:
       - git config --global user.email "gitlab@yourdomain.com"
       - git config --global user.name "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

Ganti "gitlab@yourdomain.com" dan "GitLab CI/CD" dengan email dan username GitLab Anda di bagian script. Konfigurasi ini memicu job hanya pada push ke branch main dan mengecualikan commit dengan pesan yang dimulai dengan "chore(release):".

## GitLab CI/CD untuk Build

Tambahkan stage lain ke file .gitlab-ci.yml Anda untuk build:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Job ini hanya akan berjalan untuk push tag
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # Definisikan ini di pengaturan proyek GitLab Anda
         environment:
           name: production

Pastikan Anda telah menambahkan API key Capgo (CAPGO_TOKEN) sebagai variabel CI/CD di proyek GitLab Anda. Pergi ke proyek Anda di GitLab, navigasi ke Settings > CI/CD > Variables, dan tambahkan variabel bernama CAPGO_TOKEN dengan nilai API key Anda.

Sesuaikan script build dengan proses build spesifik proyek Anda, seperti mengubah perintah npm run build.

## Kesimpulan

Di sinilah kita! Kita telah mengambil langkah tambahan dalam perjalanan teknologi kita. Dalam pengembangan perangkat lunak modern, CICD adalah faktor penting yang harus dipertimbangkan. Jadi saya berharap panduan ini masuk akal bagi semua orang.
