---
slug: Guide d'intégration de Capgo avec GitHub Actions
title: 'Integrasi Capgo dengan GitHub Actions: Panduan'
description: >-
  Integrasikan Capgo dengan GitHub Actions untuk pembaruan aplikasi yang
  efisien, aman, dan hemat biaya, sehingga meningkatkan alur pengembangan Anda.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-11-24T15:08:57.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d61b378b902ec211cf87e9-1742091902582.jpg
head_image_alt: Pengembangan Mobile
keywords: >-
  Capgo, GitHub Actions, CI/CD, Capacitor apps, deployment, automation, updates,
  security
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
[Capgo](https://capgo.app/) dan [GitHub Actions](https://docs.github.com/actions) bersama-sama menyederhanakan proses penerapan pembaruan untuk aplikasi [Capacitor](https://capacitorjs.com/). Berikut alasan mengapa integrasi ini layak dipertimbangkan:

-   **Hemat Biaya**: Kurangi biaya CI/CD hingga $26.100 selama 5 tahun dibandingkan [AppFlow](https://ionic.io/appflow/).
-   **Pembaruan Cepat**: Dorong pembaruan secara instan dengan 95% pengguna menerimanya dalam 24 jam.
-   **Penerapan Aman**: Enkripsi end-to-end memastikan pembaruan aman.
-   **Alur Kerja Efisien**: Otomatisasi build dan penerapan langsung di repositori GitHub Anda.

### Gambaran Singkat

1.  **Persyaratan**: Akun GitHub, [akun Capgo](https://capgo.app/disclaimer/) (mulai $12/bulan), proyek Capacitor, [Node.js](https://nodejs.org/en).
2.  **Pengaturan**: Instal [Capgo CLI](https://capgo.app/docs/cli/commands) dengan `npx @capgo/cli init`, konfigurasi GitHub Actions dengan alur kerja YAML.
3.  **Penerapan**: Gunakan perintah seperti `npx @capgo/cli deploy` untuk [mengotomatisasi pembaruan](https://capgo.app/docs/live-updates/update-behavior/).
4.  **Pengujian**: Terapkan ke kanal pengujian (mis. beta, staging) sebelum produksi.

**Contoh Alur Kerja (YAML)**:

```yaml
name: Capgo Deploy  
on:  
  push:  
    branches:  
      - main  

jobs:  
  deploy:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v6  
      - uses: actions/setup-node@v6  
        with:  
          node-version: '24'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

Integrasi ini memastikan pembaruan aplikasi yang cepat, aman, dan hemat biaya, membuatnya ideal untuk tim pengembangan yang gesit.

## Tutorial [GitHub Actions](https://docs.github.com/actions) - Konsep Dasar dan Pipeline CI/CD

![GitHub Actions](https://mars-images.imgix.net/seobot/screenshots/docs.github.com-90237daad1b336de5d9b7f1a85aa7441-2025-03-16.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Persyaratan Pengaturan

[Mengintegrasikan Capgo](https://capgo.app/docs/webapp/) dengan GitHub Actions melibatkan pengaturan alat dan konfigurasi yang diperlukan.

### Alat dan Akun yang Diperlukan

Pastikan Anda memiliki akun dan alat berikut:

| Persyaratan | Tujuan | Detail |
| --- | --- | --- |
| **Akun GitHub** | Kontrol Versi & CI/CD | Akun aktif dengan akses ke repositori |
| **Akun Capgo** | Mengelola Pembaruan Langsung | Paket mulai dari $12/bulan untuk paket SOLO |
| **Proyek Capacitor** | Pengembangan Aplikasi | Proyek fungsional siap untuk integrasi |
| **Node.js** | Lingkungan Runtime | Versi LTS terbaru direkomendasikan |

Setelah semua ini siap, Anda dapat melanjutkan untuk menambahkan Capgo ke proyek Anda untuk pembaruan langsung otomatis.

### Menambahkan [Capgo](https://capgo.app/) ke Proyek Anda

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16.jpg?auto=compress)

Untuk mengintegrasikan Capgo, instal di proyek Capacitor Anda menggunakan alat CLI-nya. Menurut Martin Donadieu, pendiri Capgo:

> "Jalankan npx @capgo/cli init itu saja!" [\[1\]](https://capgo.app/)

Perintah ini akan mengatur plugin dan dependensi yang diperlukan.

### Pengaturan Repositori GitHub

Siapkan repositori GitHub Anda untuk memenuhi persyaratan integrasi CI/CD dengan Capgo. Seperti disebutkan dalam dokumentasi mereka:

> "Kami mengkonfigurasi pipeline CI/CD Anda langsung di platform pilihan Anda, baik itu GitHub Actions, GitLab CI, atau lainnya. Kami tidak menghosting CI/CD atau mengenakan biaya untuk memeliharanya." [\[1\]](https://capgo.app/)

Capgo menawarkan pengaturan ini dengan biaya satu kali sebesar $2.600 dan ~$300/bulan, yang lebih terjangkau dibandingkan biaya tahunan AppFlow sebesar $6.000 [\[1\]](https://capgo.app/).

Berikut cara mengatur repositori Anda:

-   **Struktur Repositori**: Atur repositori Anda dengan direktori terpisah untuk kode sumber, aset, dan file konfigurasi agar semuanya tetap rapi dan terkelola.
-   **Konfigurasi Lingkungan**: Buat lingkungan yang berbeda untuk pengembangan, staging, dan produksi, memastikan kontrol akses dan langkah keamanan yang tepat.
-   **Manajemen Akses**: Atur izin repositori dengan hati-hati untuk memungkinkan [integrasi Capgo](https://capgo.app/consulting/) sambil mempertahankan keamanan.

Langkah-langkah ini akan memastikan proyek Anda siap untuk alur kerja GitHub Actions, yang akan diuraikan di bagian berikutnya.

## Pengaturan Alur Kerja GitHub Actions

Otomatisasi [penerapan Capgo](https://capgo.app/docs/cli/commands/) Anda menggunakan GitHub Actions untuk mengefisienkan proses CI/CD Anda.

### Membuat File Alur Kerja

Mulai dengan membuat file YAML di direktori `.github/workflows` repositori Anda. Berikut contohnya:

```yaml
name: Capgo Deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build
      - name: Deploy to Capgo
        run: npx @capgo/cli deploy
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Konfigurasi ini memastikan penerapan yang aman dan otomatis. Setelah Anda mengatur file, pilih pemicu yang tepat untuk alur kerja Anda.

### Opsi Pemicu Alur Kerja

GitHub Actions memungkinkan Anda menyesuaikan kapan alur kerja dijalankan. Berikut beberapa opsi pemicu:

| **Tipe Pemicu** | **Kasus Penggunaan** | **Konfigurasi** |
| --- | --- | --- |
| Push Events | Menerapkan saat ada perubahan kode | Aktif saat kode di-push ke branch tertentu |
| Manual Dispatch | Pembaruan sesuai permintaan | Memungkinkan Anda memulai alur kerja secara manual |
| Schedule | Rilis terjadwal | Menjalankan penerapan pada interval tertentu |
| Pull Request | Menguji pembaruan | Menguji perubahan sebelum digabungkan ke branch utama |

### Mengelola Kunci Rahasia

Untuk memastikan penerapan yang aman, Anda perlu mengelola kunci rahasia Anda dengan benar. GitHub Actions menawarkan sistem manajemen rahasia terenkripsi untuk tujuan ini.

**Langkah-langkah Mengatur Autentikasi Aman:**

1.  **Akses Pengaturan Repositori**  
    Buka pengaturan repositori Anda dan cari bagian "Secrets and variables" di bawah tab "Security".
    
2.  **Tambahkan [Kredensial Capgo](https://capgo.app/trust/)**  
    Simpan token autentikasi Capgo Anda sebagai rahasia repositori. Beri nama `CAPGO_TOKEN`.
    
3.  **Referensikan Rahasia dalam Alur Kerja**  
    Gunakan rahasia yang tersimpan dalam alur kerja dengan mereferensikannya seperti ini: `${{ secrets.CAPGO_TOKEN }}`.
    

## Perintah Capgo dalam Alur Kerja

Setelah lingkungan GitHub Actions Anda diatur, Anda dapat mengotomatisasi penerapan dengan mengintegrasikan perintah CLI Capgo.

### Menginstal Capgo CLI

Tambahkan langkah berikut ke alur kerja Anda untuk menginstal Capgo CLI:

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Initialize Capgo
    run: npx @capgo/cli init
```

### Mengautentikasi CLI

Autentikasi CLI secara aman menggunakan `CAPGO_TOKEN`:

```yaml
- name: Authenticate Capgo CLI
  run: npx @capgo/cli login
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Perintah Penerapan

Berikut perintah-perintah kunci untuk menangani pembangunan, versi, dan penerapan pembaruan Anda:

| Perintah | Tujuan | Contoh Penggunaan |
| --- | --- | --- |
| `build` | Menghasilkan [bundle siap produksi](https://capgo.app/docs/webapp/bundles/) | `npx @capgo/cli build` |
| `deploy` | Mendorong pembaruan ke Capgo | `npx @capgo/cli deploy` |
| `version` | Mengatur versi untuk pembaruan | `npx @capgo/cli version 1.2.0` |

Untuk mengotomatisasi seluruh proses penerapan, gunakan perintah-perintah bersama seperti ini:

```yaml
steps:
  - name: Build and Deploy
    run: |
      npx @capgo/cli build
      npx @capgo/cli version ${{ github.ref_name }}
      npx @capgo/cli deploy
    env:
      CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Pengaturan ini memastikan bahwa pembaruan Anda secara otomatis dibangun, diberi versi, dan diterapkan setiap kali alur kerja berjalan. Sistem manajemen rahasia GitHub menjaga kredensial Anda tetap aman sepanjang proses.

## Pengujian dan Perbaikan

### Menjalankan Alur Kerja Pengujian

Anda dapat menguji alur kerja GitHub Actions Anda dengan menggunakan [kanal pengujian Capgo](https://capgo.app/docs/plugin/cloud-mode/channel-system/) yang khusus. Ini memungkinkan Anda memvalidasi pembaruan sebelum diterapkan.

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Sistem kanal Capgo membantu Anda membuat jalur penerapan terpisah untuk berbagai tahap:

| Kanal | Tujuan | Target Pengguna |
| --- | --- | --- |
| beta | Pengujian pra-rilis | Tim internal |
| staging | Validasi QA | Pengguna uji |
| production | Penerapan langsung | Semua pengguna |

### Solusi Kesalahan

Berikut beberapa masalah integrasi umum dan cara mengatasinya:

1\. **Kegagalan Autentikasi**

Periksa CAPGO_TOKEN di GitHub Secrets. Jika sudah kedaluwarsa, regenerasi untuk memastikan autentikasi lancar.

2\. **Kesalahan Build**

Pastikan konfigurasi build Anda sesuai dengan persyaratan lingkungan penerapan Anda.

> "Kami menerapkan pembaruan OTA Capgo di produksi untuk basis pengguna kami yang +5000. Kami melihat operasi yang sangat lancar hampir semua pengguna kami diperbarui dalam hitungan menit setelah OTA diterapkan ke @Capgo." [\[1\]](https://capgo.app/)

3\. **Konflik Versi**

Patuhi semantic versioning dan tingkatkan versi dengan benar untuk mencegah konflik selama penerapan.

### Tips Pemeliharaan

-   Gunakan [analitik Capgo](https://capgo.app/dp/) untuk memantau tingkat keberhasilan pembaruan.
-   Aktifkan rollback otomatis untuk pembaruan yang mungkin menyebabkan masalah.
-   Uji pull request (PR) menggunakan selektor kanal untuk kontrol yang lebih baik.
-   Jaga alur kerja Anda tetap diperbarui dengan perintah CLI Capgo terbaru.

Untuk penerapan prioritas tinggi, manfaatkan pelacakan kesalahan Capgo untuk mendeteksi masalah potensial sejak awal. Jika ada yang salah, fitur rollback memungkinkan Anda kembali ke versi yang stabil dengan cepat, meminimalkan gangguan. Praktik-praktik ini akan membantu menjaga penerapan Anda tetap berjalan lancar saat Anda bergerak mendekati produksi.

## Kesimpulan

### Poin-poin Utama

Integrasi Capgo dengan GitHub Actions menyederhanakan proses penerapan untuk [aplikasi Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/), memberikan manfaat besar bagi tim pengembangan. Dengan tingkat keberhasilan global 82% untuk pembaruan dan 95% pengguna aktif menerima pembaruan dalam 24 jam [\[1\]](https://capgo.app/), solusi ini menonjol karena efisiensinya.

Berikut beberapa fitur unggulan:

-   **Alur Kerja Otomatis**: Dengan mengkonfigurasi alur kerja langsung di GitHub Actions, tidak perlu hosting CI/CD eksternal. Pendekatan ini memangkas biaya operasional, menghemat sekitar $26.100 selama lima tahun dibandingkan alternatif seperti AppFlow [\[1\]](https://capgo.app/).
-   **Penerapan Cepat**: Pembaruan dapat didorong secara instan, melewati penundaan app store.
-   **Keamanan Kuat**: Enkripsi end-to-end memastikan pembaruan disampaikan dengan aman, sementara sistem kanal Capgo memungkinkan peluncuran bertahap yang terkontrol.

Fitur-fitur ini membuka jalan untuk solusi yang lebih disesuaikan dan peningkatan kinerja, yang akan dijelaskan lebih lanjut di bawah.

### Strategi Lanjutan

Untuk mendapatkan hasil maksimal dari integrasi Capgo dan GitHub Actions Anda, jelajahi taktik lanjutan ini:

-   **Alur Kerja API Kustom**: Gunakan API publik Capgo untuk merancang alur kerja deployment yang sesuai dengan kebutuhan spesifik tim Anda. Hal ini dapat memungkinkan pengalaman white-label dan integrasi yang mulus dengan alat-alat yang Anda gunakan saat ini [\[1\]](https://capgo.app/).
-   **[Rilis Berbasis Kanal](https://capgo.app/docs/webapp/channels/)**: Optimalkan proses deployment Anda dengan menggunakan fitur kanal Capgo untuk pembaruan bertahap dan terkontrol.
-   **Performa Teroptimasi**: Manfaatkan pembaruan parsial Capgo untuk mengurangi penggunaan bandwidth dan mempercepat pembaruan. Dengan 23,5 juta pembaruan yang telah disampaikan ke 750 aplikasi produksi [\[1\]](https://capgo.app/), sistem ini telah membuktikan kemampuannya dalam menangani permintaan skala besar.

Untuk hasil yang lebih baik lagi, pertimbangkan untuk menggunakan opsi self-hosting Capgo atau pengaturan API kustom. Periksa bagian sebelumnya untuk petunjuk detail mengenai pengaturan dan pengujian untuk mengimplementasikan strategi-strategi ini sepenuhnya.
