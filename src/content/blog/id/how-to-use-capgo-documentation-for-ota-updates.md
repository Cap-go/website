---
slug: how-to-use-capgo-documentation-for-ota-updates
title: Cara Menggunakan Dokumentasi Capgo untuk Pembaruan OTA
description: >-
  Pelajari cara menerapkan pembaruan Over-the-Air yang aman pada aplikasi
  Capacitor Anda dengan dokumentasi lengkap dan panduan langkah demi langkah
  dari Capgo.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-02-19T03:56:01.854Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67b53306eac600a2c6713dad-1740671704703.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  OTA updates, Capacitor, Capgo, mobile app updates, documentation, app
  deployment, security features, error handling
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

**Butuh [pembaruan aplikasi](https://capgo.app/plugins/capacitor-updater/) yang lebih cepat tanpa penundaan app store?** [Capgo](https://capgo.app/) memungkinkan Anda memberikan pembaruan Over-the-Air (OTA) yang aman secara instan kepada pengguna Anda. Lewati tinjauan app store dan jaga aplikasi Anda tetap up-to-date dengan mudah.

### Poin Penting:

-   **Apa itu Capgo?** Platform open-source untuk pembaruan langsung di aplikasi [Capacitor](https://capacitorjs.com/)
-   **Mengapa OTA Updates?** Hemat waktu, tingkatkan pengalaman pengguna, dan perbaiki bug dengan cepat
-   **Bagaimana Cara Memulai?**
    -   Instal [plugin Capgo](https://capgo.app/plugins/): `npm install @capgo/capacitor-updater`
    -   Konfigurasi aplikasi Anda dengan API key
    -   Gunakan channel seperti "production" atau "beta" untuk peluncuran yang ditargetkan
-   **Fitur Lanjutan:** Enkripsi end-to-end, penanganan kesalahan, dan integrasi CI/CD

Dokumentasi Capgo ([capgo.app/docs](https://capgo.app/docs)) menyediakan instruksi langkah demi langkah untuk pengaturan, keamanan, dan pemecahan masalah. Dari instalasi hingga konfigurasi lanjutan, ini adalah panduan lengkap Anda untuk pembaruan yang mulus.

## [Capgo](https://capgo.app/), Plugin CapacitorJs untuk Pembaruan Langsung

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-19.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/NzXXKoyhTIo" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Menggunakan Dokumentasi Capgo

Menavigasi dokumentasi secara efektif sangat penting saat bekerja dengan pembaruan OTA. Dokumentasi Capgo menawarkan panduan rinci untuk mengintegrasikan pembaruan langsung ke aplikasi Capacitor.

### Di Mana Menemukan Dokumentasi

Anda dapat mengakses dokumentasi Capgo di [capgo.app/docs](https://capgo.app/docs) [\[1\]](https://githubcom/Cap-go/capacitor-updater). Dokumentasi ini disusun dalam bagian-bagian berdasarkan tujuan spesifik:

| **Bagian** | **Tujuan** | **Topik Utama** |
| --- | --- | --- |
| Getting Started | Pengaturan awal | Langkah instalasi, [pengaturan API key](https://capgo.app/docs/webapp/api-keys/) |
| Configuration | Pengaturan inti | Konfigurasi plugin, pengaturan lingkungan |
| API Reference | Detail teknis | Metode, parameter, nilai return |
| Security | Langkah perlindungan | Pengaturan enkripsi, verifikasi tanda tangan |
| Troubleshooting | Pemecahan masalah | Masalah umum, alat diagnostik |

### Istilah dan Konsep Penting

Berikut beberapa istilah kunci yang akan Anda temui:

-   **Channels**: Ini adalah aliran pembaruan yang digunakan untuk mengontrol distribusi versi. Misalnya, Anda bisa mengatur channel "production", "beta", dan "staging" untuk melayani kelompok pengguna yang berbeda [\[4\]](https://wwwindeedcom/career-advice/career-development/how-to-write-articles)
-   **Update Policies**: Ini mendefinisikan bagaimana pembaruan disampaikan dan diterapkan. Opsi termasuk unduhan otomatis, waktu instalasi, dan prompt pengguna [\[1\]](https://githubcom/Cap-go/capacitor-updater)
-   **App State Listeners**: Komponen ini melacak apakah aplikasi berada di foreground atau background [\[4\]](https://wwwindeedcom/career-advice/career-development/how-to-write-articles)
-   **Bundles**: File pembaruan yang dikemas berisi versi baru aplikasi Anda, termasuk aset, perubahan kode, dan pembaruan konfigurasi [\[4\]](https://wwwindeedcom/career-advice/career-development/how-to-write-articles)

### Contoh Kode dan Tutorial

Dokumentasi menyediakan contoh kode untuk menyederhanakan integrasi. Berikut contoh dasar menggunakan TypeScript/JavaScript:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Initialize the updater
await CapacitorUpdater.notifyAppReady()
```

Untuk kasus penggunaan yang lebih kompleks, dokumentasi mencakup contoh dunia nyata [\[2\]](https://devto/arnosolo/ionic-appflow-live-update-alternative-55c3)[\[3\]](https://githubcom/Cap-go/capgo), seperti:

-   Beralih channel untuk A/B testing
-   Alur pembaruan kustom dengan prompt pengguna
-   Menangani kesalahan dan menerapkan rollback
-   Mengintegrasikan pembaruan dengan pipeline CI/CD

Setiap tutorial juga menyoroti pertimbangan kinerja dan aspek keamanan, membantu Anda membuat keputusan yang tepat. Dokumentasi sering diperbarui untuk mencakup fitur terbaru dan praktik terbaik [\[1\]](https://githubcom/Cap-go/capacitor-updater)

Untuk detail implementasi, lihat panduan pengaturan selanjutnya.## Pengaturan Update OTA

Atur update OTA di Capgo untuk memperlancar proses deployment Anda. Ikuti langkah-langkah dan tips berikut untuk konfigurasi yang mudah.

### Langkah-Langkah Dasar

Mulai dengan menginstal plugin Capgo di proyek Capacitor Anda:

```typescript
npm install @capgo/capacitor-updater
npx cap sync
```

Selanjutnya, perbarui file `capacitor.config.json` Anda dengan [Capgo API key](https://capgo.app/docs/webapp/api-keys/) Anda:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "apiKey": "YOUR_API_KEY_HERE"
    }
  }
}
```

Kemudian, inisialisasi updater di file utama aplikasi Anda untuk mendeteksi pembaruan:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';
await CapacitorUpdater.notifyAppReady();
```

Setelah selesai, Anda dapat mengatur channel untuk mengelola berbagai aliran pembaruan.

### Pengaturan Channel Update

Atur [channel update](https://capgo.app/docs/webapp/channels/) Anda sesuai kebutuhan deployment:

| Tipe Channel | Tujuan | Kasus Penggunaan |
| --- | --- | --- |
| Production | Rilis stabil | Pengguna umum |
| Staging | Pengujian pra-rilis | Tim QA dan beta tester |
| Beta | Pengujian fitur | Early adopter |

Untuk mengunggah pembaruan ke channel tertentu, gunakan [Capgo CLI](https://capgo.app/docs/cli/commands):

```bash
npx @capgo/cli upload -c production
```

### Metode Update

Capgo menyediakan dua cara utama untuk menangani pembaruan:

**[Update Otomatis](https://capgo.app/docs/plugin/cloud-mode/auto-update/)**  
Aktifkan pembaruan otomatis dengan mengatur `autoUpdate: true` dalam konfigurasi Anda. Ini memastikan pembaruan diterapkan di latar belakang tanpa upaya tambahan dari developer.

**[Update Manual](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
Untuk kontrol lebih, Anda dapat mengelola pembaruan secara manual. Gunakan pola berikut untuk memeriksa dan menerapkan pembaruan:

```typescript
// Check for updates
const update = await CapacitorUpdater.download();

// Install when ready
if (update) {
  await CapacitorUpdater.set(update);
}
```

Untuk pembaruan penting, Anda dapat meminta persetujuan pengguna sebelum melanjutkan:

```typescript
if (update.version > currentVersion) {
  const userConsent = await showUpdatePrompt();
  if (userConsent) {
    await CapacitorUpdater.set(update);
  }
}
```

Anda juga dapat menargetkan grup pengguna tertentu dengan ID dan channel khusus:

```typescript
await CapacitorUpdater.setCustomId('beta-tester-123');
await CapacitorUpdater.setChannel('beta');
```

Terakhir, pastikan untuk menyertakan penanganan kesalahan dan opsi rollback:

```typescript
try {
  await CapacitorUpdater.set(update);
} catch (error) {
  await CapacitorUpdater.reset(); // Revert to the last working version
  console.error('Update failed:', error);
}
```

Dengan langkah-langkah ini, sistem update OTA Anda siap digunakan. Jelajahi pengaturan lanjutan untuk menyesuaikan proses pembaruan lebih lanjut.

###### sbb-itb-f9944d2

## Pengaturan Lanjutan

Tingkatkan pengaturan [update OTA Capgo](https://web.capgo.app/resend_email) Anda dengan langkah-langkah keamanan tambahan dan konfigurasi pembaruan yang fleksibel. Opsi ini memastikan pengalaman pembaruan yang aman dan lancar sambil memenuhi pedoman app store.

### Fitur Keamanan

Capgo menyediakan protokol keamanan yang kuat untuk melindungi bundle pembaruan dan mengirimkannya secara aman kepada pengguna. Platform ini menggunakan enkripsi end-to-end dengan kriptografi kunci publik untuk semua pembaruan [\[1\]](https://github.com/Cap-go/capacitor-updater). Berikut cara mengaktifkan fitur keamanan utama:

```typescript
// Enable bundle verification
await CapacitorUpdater.setVerifyBundles(true);

// Configure encryption settings
await CapacitorUpdater.configure({
  encryption: {
    enabled: true,
    failOnError: true
  }
});
```

Komponen utama sistem perlindungan bundle meliputi:

| Fitur Keamanan | Deskripsi | Implementasi |
| --- | --- | --- |
| **[Integritas Bundle](https://capgo.app/docs/webapp/bundles/)** | Memverifikasi keaslian paket dengan tanda tangan kriptografis | Otomatis diaktifkan dengan setVerifyBundles() |
| **Perlindungan Rollback** | Kembali ke versi stabil jika pembaruan gagal | Tertanam dalam proses pembaruan |
| **Kontrol Akses** | Mengelola pembaruan dengan izin berbasis peran | Dikonfigurasi melalui dashboard |

### Pengaturan Perilaku Update

Anda dapat menyesuaikan bagaimana pembaruan disampaikan dan diinstal menggunakan event listener dan opsi konfigurasi. Sesuaikan waktu dan interaksi pengguna untuk pembaruan dengan pengaturan ini:

```typescript
// Listen for when an update is available
CapacitorUpdater.addListener('updateAvailable', async (info) => {
  if (info.version > currentVersion) {
    // Custom update logic based on app state
    const isAppInactive = await checkAppState();
    if (isAppInactive) {
      await CapacitorUpdater.download();
    }
  }
});

// Monitor download completion
CapacitorUpdater.addListener('downloadComplete', (info) => {
  console.log(`Update ${info.version} ready to install`);
  // Implement custom installation timing if desired
});
```

Untuk peluncuran bertahap, Anda dapat mengonfigurasi distribusi pembaruan langsung melalui dashboard atau dengan kode:

```typescript
// Set custom update conditions for a gradual rollout
await CapacitorUpdater.configure({
  rollout: {
    percentage: 25, // Start with 25% of users
    timeInterval: 24 // Increase rollout percentage every 24 hours
  }
});
```

Untuk menangani perilaku terkait versi tertentu:

```typescript
// Handle version-specific update failures
CapacitorUpdater.addListener('updateFailed', async (info) => {
  if (info.error.code === 'VERSION_MISMATCH') {
    await CapacitorUpdater.reset(); // Revert to the last stable version
    // Optionally, handle error notification here
  }
});
```

Pengaturan ini memastikan pembaruan dapat diandalkan sambil memungkinkan Anda menyesuaikan prosesnya dengan kebutuhan aplikasi Anda. Selalu uji pembaruan secara menyeluruh di lingkungan staging Capgo sebelum meluncurkannya ke produksi [\[2\]](https://dev.to/arnosolo/ionic-appflow-live-update-alternative-55c3).

## Panduan Pemecahan Masalah

Log kesalahan dan alat bawaan Capgo membantu mengatasi tantangan update OTA sambil menjaga aplikasi Anda tetap sesuai dengan persyaratan store.### Masalah Umum dan Solusi

Berikut beberapa masalah tipikal dan cara mengatasinya:

-   **Unduhan Gagal**  
    _Gejala_: Unduhan berhenti atau gagal selesai  
    _Solusi_: Periksa koneksi jaringan, konfirmasi URL pembaruan valid, dan tambahkan mekanisme pengulangan untuk menangani gangguan
    
-   **Konflik Versi**  
    _Gejala_: Pembaruan gagal diinstal atau menyebabkan ketidakstabilan aplikasi  
    _Solusi_: Gunakan nomor versi yang jelas untuk menghindari konflik dan terapkan opsi rollback untuk keamanan
    
-   **Kesalahan Instalasi**  
    _Gejala_: Pembaruan gagal atau memicu rollback otomatis  
    _Solusi_: Pastikan Anda memanggil `notifyAppReady()` setelah pembaruan berhasil untuk mencegah rollback
    

Untuk pembaruan lebih dari 50MB, memecahnya menjadi file yang lebih kecil dapat meningkatkan kinerja pada perangkat Android [\[5\]](https://githubcom/Cap-go/capacitor-updater/issues/119)

Gunakan pencatatan error yang detail untuk menangkap masalah lebih awal. Misalnya, terapkan listener ini:

```typescript
CapacitorUpdater.addListener('updateFailed', (error) => {
  console.log(`Update failed: ${error.code}`);
  logUpdateError({
    errorCode: error.code,
    deviceInfo: error.device,
    timestamp: new Date().toISOString()
  });
});
```

Dengan menggabungkan pencatatan error dengan pemeriksaan awal, Anda dapat menangani masalah ini secara efektif sebelum fokus pada kepatuhan

### Aturan App Store

Perbaikan teknis saja tidak cukup - pembaruan Anda juga perlu selaras dengan pedoman app store

**Persyaratan Apple App Store**:

-   _Transparansi Pengguna_: Informasikan pengguna dengan jelas tentang konten pembaruan dan dapatkan persetujuan mereka
-   _Fungsi Inti_: Pastikan fitur utama aplikasi Anda tetap utuh seperti yang ditinjau
-   _Langkah Keamanan_: Gunakan metode aman untuk mentransmisikan pembaruan

**Implementasi Android**:

```typescript
await CapacitorUpdater.configure({
  updateNotification: {
    title: "Update Available",
    message: "A new version is available. Please update to access the latest features.",
    requireUserConsent: true
  }
});
```

**Praktik Terbaik**:

-   _Kontrol Versi_: Gulirkan pembaruan secara bertahap untuk mengurangi konflik
-   _Notifikasi Pembaruan_: Berikan peringatan pembaruan yang jelas dan ramah pengguna
-   _Keamanan_: Verifikasi integritas bundle dan gunakan enkripsi untuk melindungi data

## Ringkasan

Bagian ini menyatukan ide-ide utama dari panduan

Dokumentasi Capgo memberikan instruksi yang jelas untuk mengintegrasikan pembaruan OTA ke dalam aplikasi Capacitor sambil tetap mematuhi peraturan app store

Menggunakan sumber daya Capgo, pengembang dapat mengimplementasikan fitur penting seperti **enkripsi end-to-end** dan **integrasi CI/CD**, mencakup semuanya dari pengaturan awal hingga konfigurasi lanjutan [\[1\]](https://githubcom/Cap-go/capacitor-updater)

### Area Implementasi Utama

| **Aspek** | **Fokus Utama** | **Dimana Menemukannya** |
| --- | --- | --- |
| **Keamanan** | Enkripsi dan pemeriksaan integritas | Bagian _Fitur Keamanan_ |
| **Kepatuhan** | Memenuhi persyaratan Apple dan Android | Panduan _Aturan App Store_ |
| **[Manajemen Pembaruan](https://capgo.app/docs/plugin/cloud-mode/manual-update/)** | Kontrol versi dan opsi rollback | Panduan _[Metode Pembaruan](https://capgo.app/docs/plugin/cloud-mode/hybrid-update)_ |
| **Penanganan Error** | Langkah pencatatan dan pemecahan masalah | _Panduan Pemecahan Masalah_ |

Area-area ini membentuk tulang punggung sistem manajemen pembaruan Capgo

CLI dan alat analitik Capgo menyederhanakan [pengelolaan pembaruan](https://capgo.app/docs/plugin/cloud-mode/manual-update/) sepanjang siklus hidup aplikasi Anda [\[1\]](https://githubcom/Cap-go/capacitor-updater)

Untuk dukungan lebih lanjut, Anda dapat menjelajahi sumber daya tambahan seperti **dokumentasi API**, **proyek contoh**, dan **forum komunitas** [\[2\]](https://devto/arnosolo/ionic-appflow-live-update-alternative-55c3)