---
locale: id
---

Menyanyikan Paket @capgo/capacitor-crisp

Paket `@capgo/capacitor-crisp` memungkinkan Anda untuk mengintegrasikan Crisp, SDK asli, ke dalam aplikasi Capacitor Anda. Paket ini menyediakan metode untuk mengonfigurasi Crisp, membuka kotak obrolan, mengatur detail pengguna, mengirim acara, dan banyak lagi.

Untuk memulai dengan paket `@capgo/capacitor-crisp`, ikuti langkah-langkah berikut:

## Instalasi

1 Buka terminal Anda dan navigasikan ke direktori utama aplikasi Capacitor Anda.
2 Jalankan perintah berikut untuk menginstal paket:

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Inisialisasi Crisp

Sebelum menggunakan metode apa pun yang disediakan oleh paket `@capgo/capacitor-crisp`, Anda perlu mengonfigurasi Crisp dengan ID situs web Anda. Tambahkan kode berikut ke proyek Anda:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

Ganti `'******-****-****-****-********'` dengan ID situs web Crisp Anda yang sebenarnya.

### Integrasi iOS

Jika Anda menargetkan iOS, Anda perlu menambahkan izin berikut ke file Infoplist aplikasi Anda:

- Privasi - Deskripsi Penggunaan Kamera (NSCameraUsageDescription)
- Privasi - Deskripsi Penggunaan Tambahan Perpustakaan Foto (NSPhotoLibraryAddUsageDescription)

Pastikan untuk memberikan deskripsi untuk setiap izin yang menjelaskan mengapa aplikasi Anda membutuhkannya.

### Integrasi Android

Tidak ada langkah tambahan yang diperlukan untuk integrasi Android.

## Buka Kotak Obrolan

Untuk membuka kotak obrolan Crisp di aplikasi Anda, gunakan metode `openMessenger` yang disediakan oleh paket `@capgo/capacitor-crisp`. Tambahkan kode berikut ke proyek Anda:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

Ini akan membuka kotak obrolan Crisp bagi pengguna untuk memulai percakapan dengan tim dukungan Anda.

## Fungsionalitas Tambahan

Paket `@capgo/capacitor-crisp` menyediakan beberapa metode lain untuk menyesuaikan dan berinteraksi dengan Crisp. Berikut adalah beberapa metode yang tersedia:

- `setTokenID`: Atur ID token untuk pengguna.
- `setUser`: Atur detail pengguna seperti nama panggilan, nomor telepon, email, dan avatar.
- `pushEvent`: Kirim acara kustom ke Crisp.
- `setCompany`: Atur detail perusahaan termasuk nama, URL, deskripsi, pekerjaan, dan geolokasi.
- `setInt`: Atur nilai integer kustom.
- `setString`: Atur nilai string kustom.
- `sendMessage`: Kirim pesan obrolan ke Crisp.
- `setSegment`: Atur segmen untuk pengguna.
- `reset`: Reset konfigurasi Crisp.

Untuk informasi lebih lanjut tentang metode ini dan parameter mereka, silakan merujuk ke dokumentasi resmi dari paket `@capgo/capacitor-crisp`.

Itu saja! Anda telah belajar cara menggunakan paket `@capgo/capacitor-crisp` untuk mengintegrasikan Crisp ke dalam aplikasi Capacitor Anda. Nikmati komunikasi yang lancar dengan pengguna Anda melalui kotak obrolan Crisp.