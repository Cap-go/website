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

## Persyaratan Versi Minimum iOS

Target deployment minimum iOS telah ditingkatkan ke **15.5** untuk memastikan perangkat iOS dengan [CVE-2022-36943](https://nvd.nist.gov/vuln/detail/CVE-2022-36943) dikecualikan. Ini adalah versi minimum dari pustaka zip iOS yang memiliki perbaikan keamanan yang diimplementasikan.

### Solusi Swift Package Manager (SPM)

Capacitor saat ini memiliki bug ([ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556)) yang tidak memungkinkan pengaturan target deployment iOS ke 15.5 saat menggunakan SPM.

Jika Anda membutuhkan dukungan SPM, Anda dapat sementara menggunakan fork kami:

**GitHub:** [https://github.com/Cap-go/capacitor-plus](https://github.com/Cap-go/capacitor-plus)

Untuk menggunakannya, ganti paket CLI `@capacitor/cli` dengan `@capacitor-plus/cli`:

```bash
npm uninstall @capacitor/cli
npm install @capacitor-plus/cli
```

Kemudian gunakan CLI seperti biasa:

```bash
npx capacitor sync
```

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

- [ ] Ikuti [panduan migrasi](https://capacitorjs.com/docs/updating/8-0) v8 Capacitor, periksa perubahan yang tidak kompatibel
- [ ] Tingkatkan target deployment minimum iOS ke 15.5 (diperlukan untuk perbaikan CVE-2022-36943)
- [ ] Jika menggunakan SPM, sementara beralih ke [@capacitor-plus/cli](https://github.com/Cap-go/capacitor-plus) sampai [ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556) diperbaiki
- [ ] Perbarui @capgo/capacitor-updater ke ^8.0.0
- [ ] Jalankan `npx cap sync`
- [ ] Uji aplikasi Anda secara menyeluruh di iOS dan Android

## Butuh Bantuan?

Jika Anda mengalami masalah selama migrasi, silakan:

1. Periksa [dokumentasi](/docs/live-updates/) kami
2. Kunjungi [komunitas Discord](https://discord.com/invite/VnYRvBfgA6) kami
3. Buka issue di [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
