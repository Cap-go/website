---
slug: so-passen-sie-build-skripte-mit-capacitor-cli-an
title: Menyesuaikan Skrip Build dengan CLI Capacitor
description: >-
  Pelajari cara menyesuaikan skrip build dengan CLI Capacitor untuk penerapan
  yang efisien dan pembaruan aplikasi yang disesuaikan di berbagai platform.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T01:58:36.984Z
updated_at: 2025-10-22T12:30:10.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873-1743559128944.jpg
head_image_alt: Pengembangan Aplikasi Mobile
keywords: >-
  Capacitor, build scripts, mobile development, deployment automation,
  environment variables, app updates
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI memungkinkan Anda menyesuaikan proses build aplikasi untuk platform iOS, Android, dan web. Dengan menyesuaikan skrip build, Anda dapat:

-   **Pembaruan lebih cepat**: Terapkan perubahan secara instan tanpa menunggu app store.
-   **Kontrol deployment**: Lakukan rollback pembaruan atau targetkan grup pengguna tertentu.
-   **Amankan aplikasi**: Gunakan enkripsi untuk melindungi pembaruan.
-   **Optimasi build**: Sesuaikan pengaturan untuk kebutuhan platform spesifik.

### Tinjauan Singkat Fitur Utama:

-   **File Konfigurasi**: Gunakan `capacitor.config.json` dan `package.json` untuk mengelola pengaturan build.
-   **Skrip Kustom**: Tambahkan tugas prebuild dan postbuild untuk otomatisasi.
-   **Build Hooks**: Jalankan kode selama tahap tertentu dari proses build.
-   **Variabel Environment**: Sederhanakan build spesifik environment dengan file `.env`.

[Capgo](https://capgo.app/), sebuah alat deployment, meningkatkan proses ini dengan [pembaruan otomatis](https://capgo.app/docs/live-updates/update-behavior/), pelacakan versi, dan optimasi performa global. Lanjutkan membaca untuk mempelajari cara mengatur dan menyesuaikan skrip build Anda untuk efisiensi maksimal.

## Pengenalan [Capacitor](https://capacitorjs.com/) Configure

![Capacitor](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Proses Build Default di Capacitor

Memahami cara Capacitor menangani proses build defaultnya sangat penting jika Anda ingin menyesuaikannya secara efektif. Di bawah ini, kita akan menguraikan proses build CLI Capacitor dan file konfigurasi utamanya.

### Langkah Build Standar

Capacitor menggunakan proses bertahap untuk mengubah aplikasi web Anda menjadi build platform-spesifik. Berikut yang terjadi selama proses build default:

| Fase | Deskripsi | Output |
| --- | --- | --- |
| **Build Web** | Mengkompilasi aset web menggunakan alat framework Anda | Bundle web yang dioptimalkan |
| **Salin Aset** | Memindahkan aset web ke folder platform native | Direktori aset spesifik platform |
| **Build Native** | Menjalankan perintah build spesifik platform | Binary siap-deploy |
| **Verifikasi** | Memeriksa integritas build dan dependensi | Status build dan peringatan |

### File Konfigurasi Utama

Dua file konfigurasi utama yang membentuk cara Capacitor menangani build Anda:

**capacitor.config.json**  
Ini adalah file konfigurasi inti untuk proyek Capacitor Anda. File ini mengatur parameter penting untuk build Anda:

```json
{
  "appId": "com.example.app",
  "appName": "MyApp",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000
    }
  }
}
```

-   **`appId`**: Pengidentifikasi unik untuk aplikasi Anda.
-   **`appName`**: Nama aplikasi Anda.
-   **`webDir`**: Menentukan di mana Capacitor harus mencari aset web (mis. `dist`).
-   **`plugins`**: Memungkinkan Anda mengkonfigurasi pengaturan khusus plugin, seperti opsi SplashScreen.

**package.json**  
File ini mencakup skrip build dan dependensi yang mempengaruhi proses build:

```json
{
  "scripts": {
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "cap:build": "cap build"
  }
}
```

-   Pengaturan `webDir` di `capacitor.config.json` memberi tahu Capacitor di mana menemukan aset web terkompilasi Anda untuk dimasukkan dalam build native.
-   Setelah membuat perubahan pada `capacitor.config.json`, Anda perlu menjalankan `cap sync` untuk memastikan proyek native Anda diperbarui.

Selanjutnya, kita akan mengeksplorasi bagaimana Anda dapat memodifikasi pengaturan ini untuk menyesuaikan build Anda lebih lanjut.

## Memodifikasi Skrip Build

Anda dapat menyesuaikan proses build default Capacitor agar lebih sesuai dengan kebutuhan proyek Anda. Berikut caranya:

### Pengaturan File Konfigurasi

Anda dapat menyesuaikan proses build dengan mengedit file `capacitor.config.json`. Berikut contoh konfigurasi:

```json
{
  "appId": "com.example.app",
  "webDir": "www",
  "server": {
    "hostname": "localhost",
    "androidScheme": "https",
    "iosScheme": "https",
    "allowNavigation": ["*.example.com"]
  },
  "android": {
    "buildOptions": {
      "keystorePath": "release.keystore",
      "keystorePassword": "mypassword",
      "keystoreAlias": "release",
      "keystoreAliasPassword": "mypassword"
    }
  },
  "ios": {
    "scheme": "App",
    "automaticProvisioning": true
  }
}
```

Berikut beberapa pengaturan kunci yang dapat Anda modifikasi:

-   **`webDir`**: Menentukan lokasi aset web terkompilasi Anda.
-   **`server`**: Mengkonfigurasi server pengembangan, termasuk hostname dan izin navigasi.
-   **`android/ios`**: Memungkinkan pengaturan build spesifik platform, seperti detail keystore untuk Android atau opsi provisioning untuk iOS.

### Membuat Skrip NPM

Untuk mengefisienkan alur kerja Anda, tambahkan skrip NPM kustom ke file `package.json` Anda. Berikut contohnya:

```json
{
  "scripts": {
    "prebuild": "node ./scripts/prepare-env.js",
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "build:ios": "cap build ios --release",
    "build:android": "cap build android --release",
    "postbuild": "node ./scripts/notify-completion.js"
  }
}
```

-   **`prebuild` dan `postbuild`**: Gunakan ini untuk tugas seperti menyiapkan environment atau mengirim notifikasi ketika build selesai.
-   **`build:platform`**: Perintah spesifik platform untuk membangun aplikasi Android atau iOS.

Anda dapat meningkatkan otomatisasi lebih jauh dengan menambahkan build hooks.

### Pengaturan Build Hooks

Untuk kontrol yang lebih lanjut, gunakan build hooks untuk menjalankan kode kustom pada titik tertentu selama proses build. Berikut contoh pengaturan di `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  plugins: {
    CapacitorHooks: {
      beforeBuild: async () => {
        console.log('Running pre-build tasks...');
        // Add your pre-build tasks here
      },
      afterBuild: async () => {
        console.log('Running post-build tasks...');
        // Add your post-build tasks here
      }
    }
  }
};

export default config;
```

Dengan build hooks, Anda dapat:

-   Memvalidasi persyaratan sebelum build dimulai
-   Mentransformasi aset selama proses
-   Memicu notifikasi pada titik-titik kunci
-   Memperbarui nomor versi secara otomatis
-   Menjalankan tes otomatis dengan lancar

Pendekatan ini memberi Anda fleksibilitas dan kontrol yang lebih besar terhadap seluruh siklus build.

## Kustomisasi Build Lanjutan

Saat mengerjakan proyek yang lebih besar, menyesuaikan proses build Anda dapat membuat perbedaan besar. Berikut cara menangani build spesifik environment dan kustomisasi platform secara efektif.

### Variabel Environment

Atur variabel environment dengan membuat file `.env` terpisah untuk setiap environment:

-   `.env.development`
-   `.env.staging`
-   `.env.production`

Kemudian, konfigurasikan skrip build Anda untuk memuat file yang sesuai berdasarkan environment:

```typescript
import { defineConfig } from '@capacitor/cli';

export default defineConfig({
  ios: {
    buildConfig: {
      environment: process.env.BUILD_ENV || 'development',
      configurations: {
        development: {
          signing: {
            debug: true,
            automaticProvisioning: true
          }
        },
        production: {
          signing: {
            release: true,
            provisioningProfile: 'dist/profile.mobileprovision'
          }
        }
      }
    }
  }
});
```

Anda dapat menyesuaikan pengaturan ini lebih lanjut untuk memenuhi persyaratan spesifik platform.

### Build Spesifik Platform

Untuk menyesuaikan build untuk Android dan iOS, gunakan struktur berikut:

```typescript
const platformConfig = {
  android: {
    buildType: process.env.BUILD_TYPE || 'debug',
    keystoreConfig: {
      path: process.env.KEYSTORE_PATH,
      password: process.env.KEYSTORE_PASSWORD,
      alias: process.env.KEYSTORE_ALIAS
    }
  },
  ios: {
    scheme: process.env.APP_SCHEME || 'App',
    xcodePreferences: {
      automaticSigning: false,
      developmentTeam: process.env.DEVELOPMENT_TEAM
    }
  }
};
```

Konfigurasi ini memungkinkan Anda menyesuaikan build untuk setiap platform, memastikan deployment yang lebih lancar.

| Fitur | Android | iOS |
| --- | --- | --- |
| Simbol Debug | File pemetaan [ProGuard](https://www.guardsquare.com/proguard) | File dSYM |
| Varian Build | debug, release, staging | debug, release |
| Penandatanganan Kode | Manajemen Keystore | Profil provisioning |
| Manajemen Aset | Optimasi res/drawable | Katalog aset |

Tips tambahan untuk mengoptimalkan build Anda meliputi:

-   Menggunakan pembaruan parsial untuk menghemat waktu selama deployment
-   Mengatur pelacakan kesalahan untuk mengidentifikasi masalah dengan cepat
-   Membuat sistem channel untuk pengujian versi beta
-   Mengaktifkan enkripsi end-to-end untuk distribusi yang aman

Ketika dipasangkan dengan alat seperti Capgo untuk analitik dan pembaruan aman, teknik ini memberi Anda kontrol lebih atas proses deployment Anda [\[1\]](https://capgo.app/).

## Masalah & Solusi Skrip Build

Saat bekerja dengan konfigurasi build kustom, menangani kesalahan dengan cepat sangat penting untuk menjaga proses build tetap berjalan lancar.

### Memperbaiki Kesalahan Umum

Banyak masalah skrip build berasal dari pengaturan environment atau masalah dependensi. Berikut cara menangani beberapa yang umum:

**Variabel Environment Hilang**

Jika Anda menemui kesalahan seperti ini:

```bash
error: Cannot find environment configuration for BUILD_ENV
```

Anda dapat memperbaikinya dengan membuat file `.env.local` di direktori root proyek Anda. Berikut contohnya:

```bash
BUILD_ENV=development
CAPACITOR_PLATFORM=ios
BUILD_TYPE=debug
```

**Kegagalan Build Spesifik Platform**

Untuk kesalahan penandatanganan Android, gunakan perintah ini:

```bash
npx cap build android --keystorePassword=$KEYSTORE_PASSWORD --keystoreAlias=$KEYSTORE_ALIAS
```

Untuk masalah profil provisioning iOS, coba ini:

```bash
npx cap build ios --configuration=release --type=development
```

| Jenis Kesalahan | Penyebab Umum | Solusi |
| --- | --- | --- |
| Konfigurasi Penandatanganan | Detail keystore hilang | Atur `KEYSTORE_PATH` dan kredensial |
| Environment Build | Variabel tidak terdefinisi | Buat file `.env` spesifik platform |
| Dependensi | Ketidakcocokan versi | Perbarui `package.json` dan sinkronkan |

Setelah menerapkan perbaikan, pastikan perubahan Anda solid dengan menjalankan tes build yang menyeluruh.

### Tes Skrip Build

Setelah kesalahan teratasi, validasi skrip build Anda dengan langkah-langkah berikut:

-   **Verifikasi Otomatis**: Jalankan perintah kunci untuk memastikan proses build berjalan sesuai harapan.

```bash
npm run build
npx cap sync
npx cap copy
```

-   **Validasi Environment**: Periksa variabel environment yang hilang sebelum memulai build.

```typescript
const requiredVars = ['BUILD_ENV', 'KEYSTORE_PATH'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```

-   **Debugging Skrip Build**: Tambahkan skrip terperinci untuk menangkap masalah potensial selama build.

```json
{
  "scripts": {
    "build:debug": "NODE_ENV=development npx cap build --verbose",
    "build:release": "NODE_ENV=production npx cap build --verbose"
  }
}
```

Tips tambahan untuk pengujian:

-   Gunakan kontainer [Docker](https://www.docker.com/) untuk mengisolasi build.
-   Validasi file konfigurasi sebelum memulai proses.
-   Uji dengan beberapa versi [Node.js](https://nodejs.org/en).
-   Konfirmasi persyaratan spesifik platform terpenuhi.
-   Pantau performa build untuk kemungkinan peningkatan.

## Fitur Build [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/454adbba4c00491adce88db59812b177.jpg)

Capgo membawa skrip build ke level berikutnya dengan deployment otomatis, meningkatkan efisiensi dan menyederhanakan proses.

### Pembaruan Aplikasi Cepat

Performa pembaruan Capgo mengesankan:

-   **95% pengguna aktif** menerima pembaruan dalam 24 jam.
-   **82% tingkat keberhasilan** untuk pengiriman pembaruan di seluruh dunia.
-   Waktu respons API rata-rata **57ms secara global**.

Platform ini menggunakan pembaruan parsial, artinya hanya perubahan yang diunduh. Pendekatan ini mengurangi penggunaan bandwidth dan mempercepat proses pembaruan. Plus, seluruh proses build sepenuhnya otomatis, menghemat waktu dan usaha.

### Otomatisasi Build

Capgo bekerja secara mulus dengan platform CI/CD utama, menawarkan berbagai integrasi:

| Platform CI/CD | Fitur Integrasi | Manfaat |
| --- | --- | --- |
| [GitHub Actions](https://docs.github.com/actions) | Build otomatis, Pemicu deploy | Deployment berkelanjutan |
| [GitLab CI](https://docs.gitlab.com/ee/ci/) | Otomatisasi pipeline, Kontrol versi | Alur kerja yang efisien |
| [Jenkins](https://www.jenkins.io/) | Alur kerja kustom, Build hooks | Dapat diskalakan untuk perusahaan |

Menyiapkan build otomatis biasanya membutuhkan biaya sekitar **$300 per bulan**, yang jauh lebih hemat dibandingkan solusi tradisional yang bisa mencapai **$6.000 per tahun**.

### Standar Keamanan

Capgo memprioritaskan keamanan dengan framework yang kuat yang mencakup:

-   Enkripsi end-to-end untuk paket pembaruan.
-   Manajemen kunci yang aman.
-   Kepatuhan dengan pedoman Apple dan Google.

**Fitur Kontrol Versi**

-   Opsi rollback instan.
-   Pelacakan versi deployment.
-   Manajemen channel pembaruan untuk rilis bertahap.

Kerangka keamanan ini telah diuji secara ketat di ratusan aplikasi perusahaan. Untuk tim yang membutuhkan keamanan tambahan, Capgo juga menawarkan solusi self-hosted dengan konfigurasi yang dapat disesuaikan.

Sistem channel Capgo membuat distribusi pembaruan menjadi fleksibel. Pengembang dapat menargetkan grup pengguna tertentu dengan versi yang berbeda, sangat cocok untuk pengujian beta atau peluncuran bertahap.

## Ringkasan

### Ikhtisar Langkah-langkah Build

Script build kustom memungkinkan deployment yang otomatis dan konsisten dengan memanfaatkan build hooks, variabel environment, dan perintah khusus platform. Proses ini menciptakan dasar yang kuat untuk peningkatan deployment yang dimungkinkan dengan Capgo.

### Manfaat Capgo

Capgo menyederhanakan deployment, telah berhasil mengirimkan lebih dari 23,5 juta pembaruan di 750 aplikasi produksi [\[1\]](https://capgo.app/). Sistem pembaruan parsialnya mengurangi penggunaan bandwidth dan waktu deployment.

Platform ini menyediakan pembaruan cepat, optimasi kinerja global, enkripsi end-to-end untuk keamanan, dan sistem distribusi berbasis channel yang fleksibel. Pengaturan ini mendukung pembaruan yang ditargetkan, pengujian beta, dan kepatuhan terhadap pedoman app store sambil mempertahankan kerangka keamanan yang kuat.
