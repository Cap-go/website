---
locale: id
---

capgo/capacitor-screen-recorder
Sebuah plugin Capacitor untuk merekam layar perangkat

## Instalasi
Untuk menginstal paket, jalankan perintah berikut:
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```
Pastikan untuk menambahkan izin dan konfigurasi yang diperlukan agar plugin dapat berfungsi dengan baik

## Penggunaan
Untuk memulai merekam layar, gunakan metode `start()`:
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```

Untuk menghentikan rekaman, gunakan metode `stop()`:
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```

Itu saja! Anda sekarang dapat merekam layar perangkat Anda menggunakan plugin Capacitor Screen Recorder
## Android

Tambahkan izin ini
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

## Kompatibilitas
Plugin ini kompatibel dengan Capacitor 4 dan di atasnya

## Kontribusi
Kontribusi untuk plugin ini sangat dihargai Jika Anda menemukan masalah atau memiliki saran, silakan kirim permintaan tarik atau buat masalah di repositori GitHub

## Lisensi
Paket ini dilisensikan di bawah Lisensi MIT