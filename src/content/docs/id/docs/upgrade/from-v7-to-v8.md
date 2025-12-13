---
title: "Dari V7 ke V8"
locale: id
description: "Panduan terperinci tentang transisi dari versi 7 ke versi 8 updater Capgo, menguraikan langkah-langkah yang diperlukan dan pertimbangan untuk proses peningkatan yang sukses, memastikan kompatibilitas dengan fitur dan peningkatan Capacitor 8."
sidebar:
  order: 0
---

## Mengapa upgrade ini

Versi utama ini untuk mengikuti versi utama 8 Capacitor

Pertama ikuti panduan migrasi Capacitor:

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## Instalasi

`npm i @capgo/capacitor-updater@8`

Kemudian sinkronkan pembaruan kode native:

`npx cap sync`

Selesai! Cukup mudah!

## Yang Baru di V8

Versi 8 dari capacitor-updater membawa kompatibilitas penuh dengan Capacitor 8, memastikan aplikasi Anda dapat memanfaatkan fitur dan peningkatan OS mobile terbaru.

### Pembaruan Utama

- **Kompatibilitas Capacitor 8**: Dukungan penuh untuk fitur native yang ditingkatkan dari Capacitor 8
- **Peningkatan Kinerja**: Proses pengiriman dan instalasi pembaruan yang dioptimalkan
- **Stabilitas yang Ditingkatkan**: Perbaikan bug dan peningkatan stabilitas dari v7
- **Kompatibilitas API Dipertahankan**: Tidak ada perubahan penting pada API plugin dari v7

## Konfigurasi

Konfigurasi tetap sama seperti v7. Pengaturan `capacitor.config` yang ada akan terus berfungsi:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... pengaturan lainnya
    }
  }
}
```

## Daftar Periksa Migrasi

- [ ] Perbarui @capacitor/core ke ^8.0.0
- [ ] Perbarui @capacitor/android ke ^8.0.0
- [ ] Perbarui @capacitor/ios ke ^8.0.0
- [ ] Ikuti panduan migrasi v8 Capacitor
- [ ] Perbarui @capgo/capacitor-updater ke ^8.0.0
- [ ] Jalankan `npx cap sync`
- [ ] Uji aplikasi Anda secara menyeluruh di iOS dan Android

## Butuh Bantuan?

Jika Anda mengalami masalah selama migrasi, silakan:

1. Periksa [dokumentasi](/docs/live-updates/) kami
2. Kunjungi [komunitas Discord](https://discord.com/invite/VnYRvBfgA6) kami
3. Buka issue di [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
