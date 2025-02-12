---
slug: id__updating-from-capacitor-4-to-capacitor-5
title: 'Memperbarui Capacitor 4 ke Capacitor 5: Panduan Langkah demi Langkah'
description: >-
  Pelajari cara memperbarui proyek Capacitor 4 Anda ke Capacitor 5 dengan
  perubahan yang minimal, termasuk memperbarui plugin resmi dan alat yang
  diperlukan.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Ilustrasi pembaruan Capacitor 4 ke 5
tag: Capacitor
published: true
locale: id
next_blog: ''
---

Dibandingkan dengan pembaruan sebelumnya, transisi dari Capacitor 4 ke Capacitor 5 melibatkan perubahan yang minimal. Panduan ini memberikan petunjuk langkah demi langkah untuk memperbarui proyek Anda ke Capacitor 5, serta daftar perubahan untuk plugin resmi.

**Catatan**: Capacitor 5 membutuhkan NodeJS 16 atau lebih tinggi, karena Node 12 telah mencapai akhir dukungan dan Node 14 akan mencapai akhir dukungan pada 30 April 2023. Disarankan untuk menggunakan versi LTS terbaru dari NodeJS.

1. Pasang versi 'latest' dari Capacitor CLI di proyek Anda:

2. Jalankan perintah berikut untuk membiarkan CLI menangani migrasi:

   Jika ada langkah migrasi yang tidak dapat dicapai, informasi tambahan akan diberikan dalam output terminal. Langkah-langkah migrasi manual tercantum di bawah.

3. Jika Anda telah memasang ekstensi VS Code, periksa bagian rekomendasi dari ekstensi untuk menemukan opsi migrasi proyek Anda ke Capacitor 5.

### Memperbarui Proyek iOS Capacitor 4 ke Capacitor 5

1. **Perbarui Xcode**: Capacitor 5 membutuhkan Xcode 14.1+.

2. **Perbarui gitignore**: Lakukan perubahan berikut pada file `gitignore` Anda:

3. **Perbarui Aset untuk menggunakan ikon aplikasi tunggal**: Xcode 14 mendukung ikon aplikasi tunggal berukuran 1024x1024. Bersihkan AppIcon.appiconset Anda dengan menghapus semua ukuran yang tidak diperlukan.

### Memperbarui Proyek Android Capacitor 4 ke Capacitor 5

1. **Perbarui Android Studio**: Capacitor 5 membutuhkan Android Studio Flamingo | 2022.2.1 atau lebih baru karena penggunaan Gradle 8, yang membutuhkan Java JDK 17. Java 17 disertakan dengan Android Studio Flamingo, jadi tidak diperlukan unduhan tambahan.

2. **Jalankan AGP Upgrade Assistant**: Android Studio dapat membantu dengan beberapa pembaruan terkait Gradle dan memindahkan paket ke dalam file build. Untuk memulai, jalankan `Tools -> AGP Upgrade Assistant`.

3. **Perbarui Variabel Proyek Android**: Di file `variables.gradle` Anda, perbarui nilai-nilai Anda ke minimum baru berikut:

4. **Perbarui Google Services**:

5. **Perbarui plugin Gradle ke 8.0.0**:

6. **Perbarui wrapper Gradle ke 8.0.2**:

7. **Nonaktifkan Jetifier**:

8. **Pindahkan paket ke `build.gradle`**:

9. **Perbarui androidScheme**: Di Capacitor 6, `https` akan menjadi pengaturan default untuk `androidScheme` untuk aplikasi yang ada untuk lebih memungkinkan aplikasi Capacitor menggunakan fitur Autofill sistem. Untuk menghindari kehilangan data akibat perubahan ini, atur skema ke `http` sekarang, meskipun itu adalah default saat ini.

10. **Perbarui versi Kotlin**: Jika proyek Anda menggunakan Kotlin, perbarui variabel `kotlin_version` ke `'1.8.20'`.

### Perubahan Fungsionalitas Plugin

Fungsionalitas plugin berikut telah dimodifikasi atau dihapus. Perbarui kode Anda sesuai dengan:

- Action Sheet
- Browser
- Camera
- Device
- Geolocation
- Google Maps
- Local Notifications
- Push Notifications
- Status Bar

### Action Sheet

- Perbarui variabel `androidxMaterialVersion` ke `1.8.0`

### Browser

- Perbarui variabel `androidxBrowserVersion` ke `1.5.0`

### Camera

- Untuk Android 13, tambahkan izin baca media gambar (``) di `AndroidManifest.xml`
- Perbarui variabel `androidxMaterialVersion` ke `1.8.0`
- Perbarui variabel `androidxExifInterfaceVersion` ke `1.3.6`

### Device

- Ubah `Device.id.uuid` menjadi `Device.id.identifier`
- Pada iOS 16+, `Device.Info.name` akan mengembalikan nama perangkat generik kecuali Anda menambahkan [entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/) yang sesuai

### Geolocation

- Perbarui `playServicesLocationVersion` ke `21.0.1`

### Google Maps

- Perbarui variabel berikut:
  - `googleMapsPlayServicesVersion` ke `18.1.0`
  - `googleMapsUtilsVersion` ke `3.4.0`
  - `googleMapsKtxVersion` ke `3.4.0`
  - `googleMapsUtilsKtxVersion` ke `3.4.0`
  - `kotlinxCoroutinesVersion` ke `1.6.4`
  - `androidxCoreKTXVersion` ke `1.10.0`
  - `kotlin_version` ke `1.8.20`### Notifikasi Lokal

- Untuk Android 13, pemeriksaan izin runtime baru diperlukan untuk menjadwalkan notifikasi lokal saat menargetkan SDK 33. Panggil `checkPermissions()` dan `requestPermissions()` sesuai kebutuhan.

### Notifikasi Push

- Untuk Android 13, pemeriksaan izin runtime baru diperlukan untuk menerima notifikasi push saat menargetkan SDK 33. Panggil `checkPermissions()` dan `requestPermissions()` sesuai kebutuhan.
- Perbarui variabel `firebaseMessagingVersion` menjadi `2312`

### Status Bar

- Pada iOS, animasi status bar default telah diubah menjadi `FADE`

Dengan mengikuti langkah-langkah ini dan memperbarui kode Anda sesuai, Anda seharusnya telah berhasil memperbarui proyek Anda dari Capacitor 4 ke Capacitor 5. Pastikan untuk menguji aplikasi Anda secara menyeluruh untuk memastikan bahwa semua fitur dan plugin berfungsi sebagaimana mestinya.