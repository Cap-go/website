---
slug: how-live-updates-for-capacitor-work
title: Bagaimana Pembaruan Langsung Bekerja di Capgo
description: >-
  Penetrasi mendalam ke dalam implementasi teknis pembaruan langsung di Capgo,
  memahami bagaimana cara kerjanya di balik layar untuk iOS dan Android.
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
# Memahami Pembaruan Langsung di Capgo

Pembaruan langsung adalah salah satu fitur paling kuat dalam aplikasi Capacitor, memungkinkan pembaruan real-time tanpa pengiriman ke toko aplikasi. Mari kita selami lebih dalam bagaimana Capgo mengimplementasikan fungsionalitas ini.

## Konsep Inti

Aplikasi Capacitor terdiri dari dua lapisan utama:

1. **Lapisan Web**: Berisi file HTML, CSS, dan JavaScript yang dimuat di WebView
2. **Lapisan Native**: Berisi kode spesifik platform (Java/Kotlin untuk Android, Swift untuk iOS)

Sistem pembaruan langsung Capgo bekerja dengan mengganti lapisan web pada saat runtime, karena file-file ini tidak dikompilasi ke dalam biner aplikasi.

## Implementasi Teknis

### Jalur Server di Capacitor

Capgo mengelola dua jalur penting:

- **Jalur Server Saat Ini**: Mengarah ke file yang saat ini dimuat di WebView
- **Jalur Server Selanjutnya**: Mengarah ke file yang akan dimuat pada saat aplikasi di-restart

### Implementasi Android

Di Android, Capgo mengelola jalur melalui:

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

Di iOS, jalur dikelola melalui:

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

Capgo menerapkan keamanan tingkat militer melalui enkripsi end-to-end, memastikan pembaruan aplikasi Anda tetap sepenuhnya aman dari pengembangan hingga penerapan. Sistem enkripsi kami melampaui penandatanganan kode tradisional untuk memberikan keamanan nol-pengetahuan yang sebenarnya.

### Arsitektur Enkripsi End-to-End

1. **Enkripsi End-to-End (E2EE)**: Setiap paket pembaruan dienkripsi menggunakan enkripsi AES-256-GCM sebelum meninggalkan lingkungan pengembangan Anda. Enkripsi tingkat militer ini memastikan bahwa pembaruan aplikasi Anda tetap sepenuhnya pribadi dan aman sepanjang proses pengiriman.

2. **Arsitektur Nol-Pengetahuan**: Tidak seperti solusi pembaruan OTA lainnya yang hanya menandatangani pembaruan, Capgo menerapkan enkripsi nol-pengetahuan yang sebenarnya. Ini berarti:
   - Konten pembaruan dienkripsi sebelum diunggah
   - Server Capgo hanya menyimpan data terenkripsi
   - Dekripsi hanya terjadi di perangkat pengguna akhir
   - Tidak ada perantara yang dapat mengakses konten pembaruan Anda

3. **Manajemen Kunci yang Aman**: 
   - Kunci enkripsi dihasilkan dan disimpan secara aman di lingkungan CI/CD Anda
   - Kunci privat tidak pernah menyentuh server Capgo
   - Setiap versi aplikasi dapat menggunakan kunci enkripsi yang unik
   - Dukungan rotasi kunci untuk keamanan yang lebih baik

Pelajari lebih lanjut tentang sistem enkripsi kami dalam panduan terperinci kami: [Enkripsi End-to-End di Pembaruan Langsung Capgo](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Proses Keamanan Pembaruan

1. **Enkripsi Pra-Unggah**:
   - Pembaruan dienkripsi di jalur CI/CD Anda
   - Setiap file dienkripsi secara individu
   - Metadata juga dienkripsi untuk menjaga privasi penuh

2. **Penyimpanan Aman**:
   - Paket terenkripsi disimpan di CDN global Capgo
   - Tidak ada data teks biasa yang pernah menyentuh server kami
   - Bahkan dalam kasus pelanggaran server, data tetap aman

3. **Pengiriman Aman**:
   - Pembaruan dikirimkan melalui saluran terenkripsi
   - Setiap instansi aplikasi memvalidasi integritas enkripsi
   - Mekanisme otomatis untuk percobaan dekripsi yang gagal

4. **Keamanan Sisi Klien**:
   - Pembaruan diverifikasi sebelum instalasi
   - Dekripsi yang gagal memicu pengembalian otomatis
   - Penyimpanan kunci yang aman di penyimpanan terlindungi aplikasi

Pendekatan keamanan komprehensif ini memastikan bahwa pembaruan aplikasi Anda tetap terlindungi dari:
- Serangan Man-in-the-middle
- Pelanggaran sisi server
- Modifikasi yang tidak sah
- Serangan replay
- Pemalsuan konten

## Siklus Hidup Pembaruan

Proses pembaruan Capgo dirancang untuk otomatis secara default. Berikut cara kerja proses otomatis tersebut:

### 1. Pemeriksaan Pembaruan Otomatis

Plugin secara otomatis memeriksa pembaruan dalam situasi berikut:
- Ketika aplikasi dimulai

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
1. Pengunduhan dimulai otomatis
2. Progres dilacak secara internal
3. Pengunduhan yang gagal mencoba ulang secara otomatis setiap kali aplikasi dibuka
4. Pengunduhan yang berhasil disimpan di penyimpanan aplikasi

Anda dapat memantau proses ini melalui peristiwa:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3. Instalasi Otomatis

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
- Segera jika `directUpdate` benar
- Pada arka aplikasi berikutnya jika `directUpdate` salah
- Pengembalian otomatis jika instalasi gagal

Plugin juga secara otomatis mengelola penyimpanan:
- Menghapus pembaruan yang gagal jika `autoDeleteFailed` benar
- Membersihkan versi lama jika `autoDeletePrevious` benar

### Menunda Pembaruan

Anda dapat mengontrol kapan pembaruan diinstal menggunakan kondisi penundaan:

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
- **background**: Instal ketika aplikasi masuk ke latar belakang
- **date**: Instal setelah tanggal/waktu tertentu
- **nativeVersion**: Instal setelah pembaruan native berikutnya
- **kill**: Instal setelah aplikasi dihentikan

Ini berguna untuk:
- Menjadwalkan pembaruan selama jam sepi
- Mengkoordinasikan pembaruan dengan aktivitas pengguna
- Memastikan pengalaman pembaruan yang lancar
- Mencegah gangguan selama tugas kritis

### Status Pembaruan

Selama proses otomatis, paket beralih melalui status-status ini:
1. **downloading**: Pengunduhan sedang berlangsung
2. **pending**: Pengunduhan selesai, menunggu instalasi
3. **success**: Pembaruan terinstal dan aktif
4. **error**: Pembaruan gagal (memicu pengembalian otomatis)

## Kepatuhan Toko

### Apple App Store ✅

Pembaruan Langsung sepenuhnya mematuhi kebijakan Apple App Store. Seperti yang dinyatakan dalam Perjanjian Lisensi Program Pengembang Apple:

> "Kode yang diinterpretasikan dapat diunduh ke Aplikasi tetapi hanya selama kode tersebut: (a) tidak mengubah tujuan utama Aplikasi dengan memberikan fitur atau fungsionalitas yang tidak konsisten dengan tujuan yang dimaksudkan dan diiklankan dari Aplikasi yang diajukan ke App Store, (b) tidak menciptakan toko atau etalase untuk kode atau aplikasi lain, dan (c) tidak melewati penandatanganan, sandbox, atau fitur keamanan lain dari OS."

Capgo hanya memodifikasi lapisan web sambil menghormati semua batasan keamanan platform.

### Google Play Store ✅

Pembaruan Langsung mematuhi Kebijakan Google Play. Kebijakan Penyalahgunaan Perangkat dan Jaringan secara khusus menyatakan:

> "Pembatasan ini tidak berlaku untuk kode yang berjalan di mesin virtual atau interpreter di mana keduanya memberikan akses tidak langsung ke API Android (seperti JavaScript dalam webview atau browser)."

Karena Capgo hanya memperbarui konten WebView, maka hal ini termasuk dalam pedoman yang diizinkan.

## Praktik Terbaik

1. **Peluncuran Bertahap**: Terapkan pembaruan secara bertahap
2. **Pengendalian Versi**: Lacak semua versi yang diterapkan
3. **Dukungan Pengembalian**: Pemulihan cepat dari masalah
4. **Pembaruan Delta**: Hanya unduh file yang berubah

## Kapan Menggunakan Pembaruan Langsung

Sangat cocok untuk:
- Memperbaiki bug
- Peningkatan UI
- Pembaruan konten
- Pengalihan fitur

Tidak cocok untuk:
- Perubahan kode native
- Pembaruan versi besar
- Tambalan keamanan yang memerlukan perubahan native
