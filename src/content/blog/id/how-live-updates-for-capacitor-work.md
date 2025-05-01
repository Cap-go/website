---
slug: how-live-updates-for-capacitor-work
title: Comment fonctionne la mise à jour en direct dans Capgo
description: >-
  Mari kita melihat lebih dalam mengenai implementasi teknis dari Live Update
  Capgo, dan memahami mekanisme kerja internal di kedua platform iOS dan
  Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: Arsitektur Pembaruan Langsung
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---

# Memahami Live Updates di Capgo

Live updates adalah salah satu fitur paling kuat dalam aplikasi Capacitor, memungkinkan pembaruan real-time tanpa perlu submit ke app store. Mari kita dalami bagaimana Capgo mengimplementasikan fungsionalitas ini.

## Konsep Dasar

Aplikasi Capacitor terdiri dari dua lapisan utama:

1. **Lapisan Web**: Berisi file HTML, CSS, dan JavaScript yang dimuat dalam WebView
2. **Lapisan Native**: Berisi kode platform-spesifik (Java/Kotlin untuk Android, Swift untuk iOS)

Sistem live update Capgo bekerja dengan mengganti lapisan web saat runtime, karena file-file ini tidak dikompilasi ke dalam binary aplikasi.

## Implementasi Teknis

### Path Server di Capacitor

Capgo mengelola dua path penting:

- **Path Server Saat Ini**: Menunjuk ke file yang sedang dimuat di WebView
- **Path Server Berikutnya**: Menunjuk ke file yang akan dimuat saat aplikasi di-restart

### Implementasi Android

Pada Android, Capgo mengelola path melalui:

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### Implementasi iOS

Pada iOS, path dikelola melalui:

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## Langkah-langkah Keamanan

Capgo mengimplementasikan keamanan tingkat militer melalui enkripsi end-to-end, memastikan pembaruan aplikasi Anda tetap sepenuhnya aman dari pengembangan hingga penerapan. Sistem enkripsi kami melampaui penandatanganan kode tradisional untuk memberikan keamanan zero-knowledge yang sesungguhnya.

### Arsitektur Enkripsi End-to-End

1. **Enkripsi End-to-End (E2EE)**: Setiap bundel pembaruan dienkripsi menggunakan enkripsi AES-256-GCM sebelum meninggalkan lingkungan pengembangan Anda. Enkripsi tingkat militer ini memastikan pembaruan aplikasi Anda tetap sepenuhnya privat dan aman selama proses pengiriman.

2. **Arsitektur Zero-Knowledge**: Berbeda dengan solusi OTA update lainnya yang hanya menandatangani pembaruan, Capgo menggunakan enkripsi zero-knowledge yang sesungguhnya. Ini berarti:
   - Konten pembaruan dienkripsi sebelum diunggah
   - Server Capgo hanya menyimpan data terenkripsi
   - Dekripsi hanya terjadi pada perangkat pengguna akhir
   - Tidak ada perantara yang dapat mengakses konten pembaruan Anda

3. **Manajemen Kunci Aman**: 
   - Kunci enkripsi dibuat dan disimpan dengan aman di lingkungan CI/CD Anda
   - Kunci privat tidak pernah menyentuh server Capgo
   - Setiap versi aplikasi dapat menggunakan kunci enkripsi unik
   - Dukungan rotasi kunci untuk keamanan yang lebih baik

Pelajari lebih lanjut tentang sistem enkripsi kami dalam panduan detail: [End-to-End Encryption in Capgo Live Updates](https://capgoapp/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Proses Keamanan Pembaruan

1. **Enkripsi Pra-Unggah**:
   - Pembaruan dienkripsi dalam pipeline CI/CD Anda
   - Setiap file dienkripsi secara individual
   - Metadata juga dienkripsi untuk privasi lengkap

2. **Penyimpanan Aman**:
   - Bundle terenkripsi disimpan di CDN global Capgo
   - Tidak ada data teks biasa yang menyentuh server kami
   - Bahkan dalam kasus pelanggaran server, data tetap aman

3. **Pengiriman Aman**:
   - Pembaruan dikirim melalui saluran terenkripsi
   - Setiap instansi aplikasi memvalidasi integritas enkripsi
   - Mekanisme retry otomatis untuk dekripsi yang gagal

4. **Keamanan Sisi Klien**:
   - Pembaruan diverifikasi sebelum instalasi
   - Dekripsi yang gagal memicu rollback otomatis
   - Penyimpanan kunci aman di penyimpanan terproteksi aplikasi

Pendekatan keamanan komprehensif ini memastikan pembaruan aplikasi Anda tetap terlindungi dari:
- Serangan man-in-the-middle
- Pelanggaran sisi server
- Modifikasi tidak sah
- Serangan replay
- Perusakan konten

## Siklus Hidup Pembaruan

Proses pembaruan Capgo dirancang otomatis secara default. Berikut cara kerja proses otomatis:

### 1. Pemeriksaan Pembaruan Otomatis

Plugin secara otomatis memeriksa pembaruan dalam situasi berikut:
- Saat aplikasi dimulai

Perilaku ini dikendalikan oleh pengaturan `autoUpdate`:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
Anda juga dapat memeriksa secara manual dengan `getLatest()`

### 2. Pengunduhan Otomatis

Ketika versi baru terdeteksi, jika `autoUpdate` diaktifkan:
1. Unduhan dimulai secara otomatis
2. Kemajuan dilacak secara internal
3. Unduhan yang gagal akan mencoba ulang secara otomatis setiap kali aplikasi dibuka
4.Download yang berhasil disimpan dalam penyimpanan aplikasi

Anda dapat memantau proses ini melalui event:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3 Instalasi Otomatis

Waktu instalasi tergantung pada konfigurasi Anda:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

Instalasi terjadi:
- Segera jika `directUpdate` bernilai true
- Saat aplikasi berjalan di background jika `directUpdate` bernilai false
- Rollback otomatis jika instalasi gagal

Plugin juga mengelola penyimpanan secara otomatis:
- Menghapus update yang gagal jika `autoDeleteFailed` bernilai true
- Membersihkan versi lama jika `autoDeletePrevious` bernilai true

### Menunda Update

Anda dapat mengontrol kapan update diinstal menggunakan kondisi penundaan:

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

Kondisi penundaan yang tersedia:
- **background**: Install saat aplikasi masuk ke background
- **date**: Install setelah tanggal/waktu tertentu
- **nativeVersion**: Install setelah update native berikutnya
- **kill**: Install setelah aplikasi dimatikan

Ini berguna untuk:
- Menjadwalkan update selama jam tidak sibuk
- Mengkoordinasikan update dengan aktivitas pengguna
- Memastikan pengalaman update yang lancar
- Mencegah gangguan selama tugas penting

### Status Update

Selama proses otomatis, bundle melewati status-status berikut:
1. **downloading**: Unduhan sedang berlangsung
2. **pending**: Unduhan selesai, menunggu instalasi
3. **success**: Update terinstal dan aktif
4. **error**: Update gagal (memicu rollback otomatis)

## Kepatuhan Toko

### Apple App Store ✅

Live Updates sepenuhnya mematuhi kebijakan Apple App Store Seperti yang tercantum dalam Perjanjian Lisensi Program Apple Developer:

> "Kode yang diinterpretasikan dapat diunduh ke Aplikasi tetapi hanya selama kode tersebut: (a) tidak mengubah tujuan utama Aplikasi dengan menyediakan fitur atau fungsionalitas yang tidak konsisten dengan tujuan yang dimaksud dan diiklankan dari Aplikasi sebagaimana diajukan ke App Store, (b) tidak membuat toko atau storefront untuk kode atau aplikasi lain, dan (c) tidak memotong signing, sandbox, atau fitur keamanan lain dari OS"

Update Capgo hanya memodifikasi lapisan web sambil menghormati semua batasan keamanan platform

### Google Play Store ✅

Live Updates mematuhi Kebijakan Google Play Kebijakan Penyalahgunaan Perangkat dan Jaringan secara khusus menyatakan:

> "Pembatasan ini tidak berlaku untuk kode yang berjalan di mesin virtual atau interpreter di mana keduanya menyediakan akses tidak langsung ke API Android (seperti JavaScript di webview atau browser)"

Karena Capgo hanya memperbarui konten WebView, ini termasuk dalam pedoman yang diizinkan

## Praktik Terbaik

1. **Rollout Bertahap**: Terapkan update secara bertahap
2. **Kontrol Versi**: Lacak semua versi yang diterapkan
3. **Dukungan Rollback**: Pemulihan cepat dari masalah
4. **Update Delta**: Hanya unduh file yang berubah

## Kapan Menggunakan Live Updates

Sempurna untuk:
- Perbaikan bug
- Perbaikan UI
- Update konten
- Toggle fitur

Tidak cocok untuk:
- Perubahan kode native
- Update versi major
- Patch keamanan yang membutuhkan perubahan native