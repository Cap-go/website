---
locale: id
---

Tutorial Paket capgo/camera-preview

Dalam tutorial ini, kita akan melalui langkah-langkah untuk menggunakan paket `@capgo/camera-preview` dalam proyek Capacitor Anda. Paket ini memungkinkan Anda untuk berinteraksi dengan kamera dari kode JavaScript dan HTML Anda.

## Instalasi

Untuk menginstal paket `@capgo/camera-preview`, buka terminal Anda dan jalankan salah satu perintah berikut:

```bash
yarn add @capgo/camera-preview
```

atau

```bash
npm install @capgo/camera-preview
```

Setelah instalasi selesai, jalankan perintah berikut untuk menyinkronkan proyek Capacitor Anda:

```bash
npx cap sync
```

### Langkah Instalasi Tambahan Android

Jika Anda menggunakan Android, Anda perlu melakukan beberapa perubahan tambahan pada proyek Anda. Buka file `android/app/src/main/AndroidManifest.xml` dan tambahkan baris berikut di atas tag penutup `</application>` untuk meminta izin KAMERA:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Untuk bantuan lebih lanjut, rujuk pada [dokumentasi Capacitor](https://capacitorjs.com/docs/android/configuration/#configuring-androidmanifestxml/)

### Langkah Instalasi Tambahan iOS

Jika Anda menggunakan iOS, Anda perlu menambahkan dua izin ke file `Infoplist` Anda. Ikuti [dokumentasi Capacitor](https://capacitorjs.com/docs/ios/configuration/#configuring-infoplist) dan tambahkan izin `NSCameraUsageDescription` dan `NSMicrophoneUsageDescription`. Izin `NSMicrophoneUsageDescription` hanya diperlukan jika Anda akan menggunakan audio. Jika Anda tidak memerlukan audio, Anda dapat mengatur opsi `disableAudio` ke `true` untuk menonaktifkan permintaan izin mikrofon.

### Langkah Instalasi Tambahan Web

Jika Anda menggunakan platform web dengan Ionic, tambahkan baris berikut ke skrip entri Anda di `appmodulets`:

```typescript
import '@capgo/camera-preview';
```

Ini akan memungkinkan Capacitor untuk mendaftarkan platform web dari plugin.

## API

Paket `@capgo/camera-preview` menyediakan metode API berikut:

### start(options: CameraPreviewOptions)

Memulai instance pratinjau kamera.

### stop()

Menghentikan instance pratinjau kamera.

### capture(options: CameraPreviewPictureOptions)

Mengambil gambar dari kamera.

### captureSample(options: CameraSampleOptions)

Mengambil gambar sampel.

### getSupportedFlashModes()

Mengambil mode kilat yang didukung.

### getHorizontalFov()

Mengambil bidang pandang horizontal.

### setFlashMode(options: { flashMode: CameraPreviewFlashMode | string; })

Mengatur mode kilat.

### flip()

Membalik kamera.

### setOpacity(options: CameraOpacityOptions)

Mengatur opasitas kamera.

### stopRecordVideo()

Menghentikan rekaman video.

### startRecordVideo(options: CameraPreviewOptions)

Memulai rekaman video.

Untuk detail lebih lanjut tentang parameter dan nilai kembali dari metode ini, rujuk pada dokumentasi paket `@capgo/camera-preview`.

## Kesimpulan

Dalam tutorial ini, kami belajar bagaimana cara menginstal dan menggunakan paket `@capgo/camera-preview` dalam proyek Capacitor. Kami menjelajahi metode API yang tersedia dan penggunaannya. Sekarang Anda dapat mengintegrasikan fungsi kamera ke dalam aplikasi Anda menggunakan paket ini.