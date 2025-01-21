---
slug: id__setup-ci-and-cd-gitlab
title: Konstruksi dan Penerapan Otomatis Aplikasi dengan GitLab
description: >-
  Buat pipeline CI/CD Anda sendiri dengan GitLab secara gratis dan deploy
  aplikasi Ionic Capacitor JS Anda setiap kali melakukan push ke branch utama.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD di GitLab
tag: CI/CD
published: true
locale: id
next_blog: ''
---

Artikel ini akan memandu Anda tentang cara melakukan pengaturan pipeline CI/CD dengan GitLab

## Pendahuluan

Pastikan Anda telah menambahkan aplikasi Capacitor Anda terlebih dahulu ke Capgo, tutorial ini hanya berfokus pada tahap unggah. Jika Anda perlu menambahkan aplikasi Anda ke Capgo, Anda dapat mengikuti [Tutorial](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/) ini

## Konvensi commit

Pertama, Anda perlu mulai mengikuti konvensi commit [conventional commits](https://wwwconventionalcommitsorg/en/v100/). Ini akan membantu alat memahami cara meningkatkan nomor versi, hanya butuh 5 menit untuk mempelajarinya

![Conventional commits](/conventional_commitswebp)

## GitLab CI/CD untuk Tag

Buat file gitlab-ciyml di root repositori GitLab Anda dengan konten berikut

      
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
       - git config --global useremail "gitlab@yourdomaincom"
       - git config --global username "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

Ganti "gitlab@yourdomaincom" dan "GitLab CI/CD" dengan email dan nama pengguna GitLab Anda di bagian script. Konfigurasi ini memicu pekerjaan hanya pada push ke cabang utama dan mengecualikan commit dengan pesan yang dimulai dengan "chore(release):"

## GitLab CI/CD untuk Build

Tambahkan tahap lain ke file gitlab-ciyml Anda untuk build:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Pekerjaan ini hanya akan berjalan untuk push tag
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

Pastikan Anda telah menambahkan kunci API Capgo (CAPGO_TOKEN) sebagai variabel CI/CD di proyek GitLab Anda. Pergi ke proyek Anda di GitLab, navigasi ke Settings > CI/CD > Variables, dan tambahkan variabel bernama CAPGO_TOKEN dengan nilai kunci API Anda

Sesuaikan script build agar sesuai dengan proses build proyek spesifik Anda, seperti mengubah perintah npm run build

## Kesimpulan

Di sinilah kita! Kita telah mengambil langkah tambahan dalam perjalanan teknologi kita. Dalam pengembangan perangkat lunak modern, CICD adalah faktor penting yang harus dipertimbangkan. Jadi saya berharap pedoman ini masuk akal bagi semua orang