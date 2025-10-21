---
slug: comment-declencher-des-mises-a-jour-ota-avec-les-outils-cicd
title: Pemicu Alat CI/CD untuk Pembaruan OTA
description: >-
  Pelajari cara alat CI/CD meningkatkan pembaruan OTA dan memastikan deployment
  aplikasi yang lebih cepat, lebih aman, dan lebih andal melalui proses
  otomatis.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-12T08:43:18.401Z
updated_at: 2025-10-21T10:46:26.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67abf1dcdd71129bfb8de766-1739349815106.jpg
head_image_alt: Pengembangan Mobile
keywords: 'CI/CD, OTA updates, automation, app deployment, security, Capgo, Capacitor'
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
CI/CD tools membuat pembaruan over-the-air (OTA) lebih cepat, aman, dan andal dengan mengotomatisasi prosesnya. Berikut penjelasannya:

-   **Apa itu Pembaruan OTA?** Memungkinkan Anda memperbarui aset aplikasi seperti HTML, CSS, dan JavaScript secara instan melalui CDN, melewati penundaan persetujuan app store.
-   **Bagaimana CI/CD Membantu:** Tools otomatisasi seperti [GitHub Actions](https://docs.github.com/actions) menyederhanakan langkah-langkah penting seperti pemeriksaan build, validasi keamanan, dan deployment, mengurangi kesalahan hingga 72% dan memungkinkan patch di hari yang sama.
-   **Fitur Utama:**
    -   **Keamanan:** Menggunakan HTTPS, penandatanganan kode, dan enkripsi untuk melindungi pembaruan.
    -   **Peluncuran Bertahap:** Deploy pembaruan ke grup kecil terlebih dahulu untuk mendeteksi masalah lebih awal.
    -   **Opsi Rollback:** Secara otomatis membatalkan pembaruan jika tingkat kesalahan meningkat.
-   **Tools yang Disorot:** [Capgo](https://capgo.app/) menyederhanakan pembaruan OTA dengan perintah CLI, integrasi webhook, dan pelacakan metrik terperinci.

Mengotomatisasi pembaruan OTA memastikan pengiriman lebih cepat, lebih sedikit kesalahan, dan stabilitas aplikasi yang lebih baik. Di bawah ini, Anda akan menemukan instruksi langkah demi langkah untuk menyiapkan aplikasi [Capacitor](https://capacitorjs.com/) dengan pipeline CI/CD.

## [Appflow](https://ionic.io/appflow/live-updates) Live Updates: Deploy pembaruan instan langsung ke pengguna Anda

![Appflow](https://mars-images.imgix.net/seobot/screenshots/ionic.io-f18932d1af08bf70cb14b84540039486-2025-02-12.jpg?auto=compress)

<Steps>

1. Siapkan konfigurasi dasar
2. Aktifkan pembaruan langsung
3. Deploy pembaruan pertama Anda

</Steps>

## Menyiapkan [Capacitor](https://capacitorjs.com/) untuk Pembaruan OTA

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-02-12.jpg?auto=compress)

Menyiapkan Capacitor untuk [pembaruan over-the-air](https://capgo.app/blog/open-source-licecing/) (OTA) otomatis melibatkan tiga langkah utama: mengkonfigurasi setup, menerapkan langkah-langkah keamanan, dan [mengintegrasikan sistem pembaruan](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). Proses ini memastikan kompatibilitas dengan otomatisasi CI/CD sambil menjaga keamanan aplikasi Anda.

### Mengkonfigurasi Pengaturan OTA di capacitor.config.json

Mulai dengan memperbarui file `capacitor.config.json` dengan parameter yang diperlukan:

```json
{
  "appId": "com.example.app",
  "appName": "Example App",
  "bundledWebRuntime": false,
  "ota": {
    "autoUpdate": true,
    "checkInterval": "30m",
    "maxVersions": 2
  }
}
```

Mengatur frekuensi pemeriksaan yang tepat meminimalkan penundaan pembaruan - menguranginya hingga 47% [\[2\]](https://github.com/becem-gharbi/esp-ota-cicd).

### Menerapkan Keamanan Pembaruan OTA

Mengamankan proses pembaruan OTA sangat penting untuk menghindari pembaruan yang tidak sah dan melindungi integritas aplikasi Anda. Ini melibatkan tiga lapisan perlindungan:

| Lapisan Keamanan | Implementasi | Tujuan |
| --- | --- | --- |
| Keamanan HTTPS | Certificate Pinning | Memblokir serangan man-in-the-middle |
| Penandatanganan Kode | Tanda Tangan ed25519 | Mengkonfirmasi validitas pembaruan |
| Keamanan Paket | Enkripsi AES-256-GCM | Mengamankan konten pembaruan |

Untuk menerapkan fitur keamanan ini, sertakan yang berikut dalam konfigurasi Anda:

```json
{
  "ota": {
    "security": {
      "certificates": ["SHA256:..."],
      "signing": {
        "algorithm": "ed25519",
        "publicKey": "PUBLIC_KEY"
      },
      "encryption": {
        "algorithm": "aes-256-gcm"
      }
    }
  }
}
```

### Mengkonfigurasi [Capgo](https://capgo.app/) untuk Pembaruan OTA

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-12.jpg?auto=compress)

Capgo menyederhanakan proses pembaruan OTA. Mulai dengan menginstal plugin yang diperlukan:

```bash
npm install @capgo/capacitor-updater
```

Selanjutnya, tambahkan pengaturan khusus Capgo ke file `capacitor.config.json` Anda:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "statsUrl": "https://your-stats-endpoint.com"
    }
  }
}
```

Capgo menggunakan semantic versioning dengan pengenal build seperti `2025.02.12-a1b2c3d` untuk pelacakan pembaruan yang tepat. Ini memudahkan pengelolaan dan pemantauan siklus hidup pembaruan aplikasi Anda.

## Membuat Pipeline Pembaruan OTA

Setelah Anda menyiapkan Capgo di lingkungan Capacitor, langkah selanjutnya adalah menghubungkannya dengan tools CI/CD untuk mengotomatisasi pengiriman pembaruan. Ini memastikan pembaruan ditangani secara aman dan efisien sambil menjaga stabilitas aplikasi Anda.

### Pengaturan Webhook untuk Pembaruan Otomatis

Webhook dalam setup CI/CD Anda dapat secara otomatis memicu pembaruan setiap kali terjadi perubahan kode. Misalnya, di GitHub Actions, Anda dapat membuat file workflow seperti ini:

```yaml
name: OTA Update
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy OTA Update
        run: |
          npm install
          npm run build
          npx @capgo/cli deploy
```

Pastikan untuk menyimpan kunci API dan rahasia Anda dengan aman di [penyimpanan terenkripsi](https://capgo.app/docs/cli/migrations/encryption/) platform CI/CD Anda untuk melindungi data sensitif.

### Perintah Pembaruan CLI Capgo

CLI Capgo menawarkan perintah-perintah kunci untuk menyederhanakan manajemen pembaruan dalam pipeline Anda. Berikut contoh alur kerja deployment tipikal:

| Tahap | Perintah | Tujuan |
| --- | --- | --- |
| Build | `capgo deploy --channel production` | Upload artefak build baru |
| Pengujian | `capgo promote build-123 --group beta` | [Rilis pembaruan ke grup uji](https://capgo.app/blog/how-to-send-specific-version-to-users/) |
| Validasi | `capgo metrics get --last-24h` | Periksa metrik keberhasilan pembaruan |
| Rilis | `capgo promote build-123 --channel stable` | Deploy pembaruan ke semua pengguna |

### Metode Rollback Pembaruan

Memiliki mekanisme rollback yang andal sangat penting untuk menjaga stabilitas aplikasi Anda. Sistem Anda harus dapat mendeteksi masalah dan membatalkan pembaruan secara otomatis. Misalnya, Anda dapat menggunakan endpoint pemeriksaan kesehatan untuk memantau tingkat kesalahan dan memicu rollback jika diperlukan:

```javascript
async function checkUpdateHealth() {
  const metrics = await getUpdateMetrics();
  if (metrics.errorRate > 0.02) {
    await rollbackUpdate();
    notifyTeam('Update rolled back due to high error rate');
  }
}
```

Pendekatan ini membantu [Gunnebo Safe Storage](https://www.gunnebosafestorage.com/) memangkas waktu henti dari jam menjadi menit [\[6\]](https://mender.io/blog/mender-ota-updates-and-an-automated-ci-cd-pipeline-at-gunnebo-safe-storage).

Untuk pembaruan berisiko tinggi, pertimbangkan untuk menggunakan fitur peluncuran bertahap Capgo. Ini memungkinkan Anda untuk men-deploy pembaruan ke grup pengguna yang lebih kecil terlebih dahulu, mengurangi kemungkinan masalah yang meluas sebelum rilis penuh.

## Metode Pembaruan OTA

### Pembaruan Bertahap dan Grup Pengguna

Pembaruan bertahap memungkinkan Anda mengontrol bagaimana pembaruan diluncurkan, memastikan pengalaman yang lancar bagi pengguna. Misalnya, perintah _promote_ Capgo (dibahas sebelumnya) membantu mengelola grup beta. Dengan data perusahaan menunjukkan bahwa hampir setengah aplikasi (49%) membutuhkan pembaruan bulanan [\[4\]](https://capacitorjs.com/docs/guides/ci-cd), deployment bertahap menjadi strategi kunci untuk menjaga stabilitas aplikasi sambil meluncurkan perubahan secara bertahap.

### Pemicu Pembaruan Berbasis Metrik

[Mengotomatisasi pembaruan](https://capgo.app/docs/live-updates/update-behavior/) berdasarkan metrik kinerja dapat menghemat waktu dan mencegah masalah. Dengan menyiapkan webhook pemantauan, Anda dapat melacak metrik penting dan memutuskan apakah akan melanjutkan atau menghentikan pembaruan:

| Jenis Metrik | Ambang Batas | Tindakan |
| --- | --- | --- |
| Tingkat Crash | >2% | Jeda peluncuran |
| Tingkat Kesalahan | >0.5% | Peringatan tim |

Anda dapat mengintegrasikan pemeriksaan ini ke dalam pipeline CI/CD Anda untuk pemantauan yang mulus. Berikut contohnya:

```javascript
function monitorMetrics(updateId) {
  return new Promise((resolve, reject) => {
    const metrics = getUpdateMetrics(updateId);
    if (metrics.crashRate > 0.02) {
      reject('High crash rate detected');
    }
    resolve('Metrics within acceptable range');
  });
}
```

Metrik ini terhubung langsung dengan sistem pelacakan kinerja, yang akan kita eksplorasi di bagian berikutnya.

### Pembaruan Respons Cepat

Ketika menghadapi masalah keamanan kritis atau bug besar, penting untuk memiliki cara untuk men-deploy pembaruan dengan cepat. Gunakan saluran deployment fast-track yang dirancang khusus untuk keadaan darurat. Saluran ini harus mencakup pemeriksaan atestasi perangkat dan opsi rollback otomatis untuk meminimalkan risiko.

Untuk pembaruan mendesak, Anda dapat men-deploy menggunakan saluran khusus:

```bash
capgo deploy --channel emergency --skip-validation
```

Untuk lebih meningkatkan kecepatan pengiriman dan memenuhi standar kepatuhan, pertimbangkan untuk menggunakan saluran berbasis geo dengan aturan CDN. Ini memastikan pembaruan mencapai pengguna secara efisien, terlepas dari lokasi.

## Pelacakan Kinerja Pembaruan

Setelah Anda menerapkan metode pengiriman pembaruan, saatnya mengukur seberapa baik kinerjanya. Gunakan indikator kinerja utama ini untuk tetap mengikuti perkembangan:

### Metrik Keberhasilan Pembaruan

Perhatikan tiga area utama: **penyelesaian deployment**, **waktu verifikasi**, dan **adopsi pengguna**. Untuk aplikasi seluler, tingkat keberhasilan deployment biasanya berkisar antara 95% dan 99% [\[1\]](https://embeddedartistry.com/blog/2024/01/15/exploring-serverless-ci-cd-for-embedded-devices/). Pemantauan real-time melalui pipeline CI/CD Anda dapat membantu Anda mencapai target:

| Metrik | Target | Ambang Batas Kritis |
| --- | --- | --- |
| Penyelesaian Deployment | >98% | <120s |
| Adopsi Pengguna (24j) | >75% | <50% |

### Manajemen Kesalahan Pembaruan

Sistem otomatis dapat melacak status pembaruan dan merespons kesalahan. Untuk masalah besar, sistem harus membatalkan pembaruan secara otomatis jika pemeriksaan kesehatan perangkat mendeteksi masalah. Berikut contoh bagaimana ini mungkin terlihat dalam praktik:

```javascript
async function monitorUpdate(updateId) {
  const healthCheck = await deviceHealth.check();
  if (!healthCheck.passed) {
    await rollbackUpdate(updateId);
    await notifyAdmins({
      type: 'CRITICAL',
      message: 'Update rolled back due to failed health check'
    });
  }
}
```

Setup seperti ini memastikan kegagalan kritis ditangani dengan cepat, meminimalkan gangguan bagi pengguna.

### Pengurangan Penggunaan Data

Pembaruan delta adalah cara yang bagus untuk mengurangi penggunaan data, mengecilkan ukuran payload sebesar 70-90% dibandingkan dengan pembaruan penuh [\[4\]](https://capacitorjs.com/docs/guides/ci-cd). Optimisasi ini dapat diintegrasikan langsung ke dalam pipeline CI/CD Anda dengan aturan seperti ini:

-   **Pembaruan Delta**: Buat perbedaan biner untuk hanya menyertakan komponen yang telah berubah.

Pipeline otomatis juga memastikan pembaruan disampaikan secara andal menggunakan format terkompresi dan pembaruan delta. Dengan menggabungkan pengujian otomatis, peluncuran bertahap, dan pelacakan kinerja, tim dapat mengelola pembaruan aplikasi Capacitor dengan efisiensi dan keamanan.
