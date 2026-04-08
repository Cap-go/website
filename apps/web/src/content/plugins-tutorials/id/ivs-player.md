---
locale: id
---

sing @capgo/ivs-player

## Instalasi

Untuk menginstal paket @capgo/ivs-player, Anda perlu menjalankan perintah berikut:

```bash
npm install @capgo/ivs-player
npx cap sync
```

## API

Paket @capgo/ivs-player menyediakan API berikut:

### create(options: { url: string; pip?: boolean; title?: string; subtitle?: string; cover?: string; autoPlay?: boolean; toBack?: boolean; x?: number; y?: number; width?: number; height?: number; }) => Promise

Metode ini membuat instansi pemain IVS. Ini mengambil objek opsi sebagai parameter, yang berisi berbagai properti seperti URL video, apakah akan mengaktifkan mode picture-in-picture, judul dan subtitle video, dan lainnya. Ini mengembalikan Promise yang teratasi ke instansi yang dibuat.

### start() => Promise

Metode ini memulai pemutaran video di pemain IVS. Ini mengembalikan Promise.

### cast() => Promise

Metode ini mengalirkan video ke perangkat yang terhubung. Ini mengembalikan Promise.

### getCastStatus() => Promise<{ isActive: boolean; }>

Metode ini mengambil status fitur casting. Ini mengembalikan Promise yang teratasi ke objek yang berisi properti isActive, yang menunjukkan apakah casting aktif.

### pause() => Promise

Metode ini menjeda pemutaran video. Ini mengembalikan Promise.

### delete() => Promise

Metode ini menghapus instansi pemain IVS. Ini mengembalikan Promise.

### getUrl() => Promise

Metode ini mengambil URL video yang saat ini sedang diputar. Ini mengembalikan Promise.

### getState() => Promise

Metode ini mengambil status saat ini dari pemain IVS. Ini mengembalikan Promise.

### setPlayerPosition() => Promise

Metode ini mengatur posisi pemain IVS di layar. Ini mengambil koordina x dan y sebagai parameter dan mengembalikan Promise.

### getPlayerPosition() => Promise

Metode ini mengambil posisi saat ini dari pemain IVS di layar. Ini mengembalikan Promise.

### setAutoQuality() => Promise

Metode ini mengatur mode kualitas otomatis dari pemain IVS. Ini mengambil nilai boolean sebagai parameter dan mengembalikan Promise.

### getAutoQuality() => Promise

Metode ini mengambil mode kualitas otomatis saat ini dari pemain IVS. Ini mengembalikan Promise.

### setPip() => Promise

Metode ini mengatur mode picture-in-picture dari pemain IVS. Ini mengambil nilai boolean sebagai parameter dan mengembalikan Promise.

### getPip() => Promise

Metode ini mengambil mode picture-in-picture saat ini dari pemain IVS. Ini mengembalikan Promise.

### setFrame() => Promise

Metode ini mengatur bingkai dari pemain IVS. Ini mengambil nilai angka sebagai parameter dan mengembalikan Promise.

### getFrame() => Promise

Metode ini mengambil bingkai saat ini dari pemain IVS. Ini mengembalikan Promise.

### setMute() => Promise

Metode ini mengatur mode senyap dari pemain IVS. Ini mengambil nilai boolean sebagai parameter dan mengembalikan Promise.

### getMute() => Promise

Metode ini mengambil mode senyap saat ini dari pemain IVS. Ini mengembalikan Promise.

### setQuality() => Promise

Metode ini mengatur kualitas video di pemain IVS. Ini mengambil nilai string sebagai parameter dan mengembalikan Promise.

### getQuality() => Promise

Metode ini mengambil kualitas saat ini dari video di pemain IVS. Ini mengembalikan Promise.

### getQualities() => Promise

Metode ini mengambil kualitas yang tersedia dari video di pemain IVS. Ini mengembalikan Promise.

### addListener('expandPip', ) => void

Metode ini menambahkan pendengar untuk acara expandPip. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void.

### addListener('closePip', ) => void

Metode ini menambahkan pendengar untuk acara closePip. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void.

### addListener('onState', ) => void

Metode ini menambahkan pendengar untuk acara onState. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void.

### addListener('onCues', ) => void

Metode ini menambahkan pendengar untuk acara onCues. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void.

### addListener('onDuration', ) => void

Metode ini menambahkan pendengar untuk acara onDuration.Ini mengambil fungsi callback sebagai parameter dan mengembalikan void

### addListener('onError', ) => void

Metode ini menambahkan pendengar untuk acara onError. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void

### addListener('onRebuffering', ) => void

Metode ini menambahkan pendengar untuk acara onRebuffering. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void

### addListener('onSeekCompleted', ) => void

Metode ini menambahkan pendengar untuk acara onSeekCompleted. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void

### addListener('onVideoSize', ) => void

Metode ini menambahkan pendengar untuk acara onVideoSize. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void

### addListener('onQuality', ) => void

Metode ini menambahkan pendengar untuk acara onQuality. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void

### addListener('onCastStatus', ) => void

Metode ini menambahkan pendengar untuk acara onCastStatus. Ini mengambil fungsi callback sebagai parameter dan mengembalikan void

### removeAllListeners() => void

Metode ini menghapus semua pendengar acara yang telah ditambahkan. Ini mengembalikan void

## Kesimpulan

Paket @capgo/ivs-player menyediakan API yang komprehensif untuk mengintegrasikan pemutar IVS ke dalam aplikasi Capacitor Anda. Dengan mengikuti langkah-langkah instalasi dan merujuk pada dokumentasi API, Anda dapat dengan mudah mulai memutar video di aplikasi Anda menggunakan pemutar IVS.