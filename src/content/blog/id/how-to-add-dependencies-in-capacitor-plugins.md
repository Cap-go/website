---
slug: how-to-add-dependencies-in-capacitor-plugins
title: Cara Menambahkan Dependensi di Plugin Capacitor
description: >-
  Pelajari cara menyederhanakan manajemen ketergantungan di plugin Capacitor di
  berbagai platform dengan langkah-langkah praktis dan praktik terbaik.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-27T02:08:04.837Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e4966a10051fda3b63500a-1743041314795.jpg
head_image_alt: Pengembangan Seluler
keywords: >-
  Capacitor, plugin dependencies, iOS, Android, JavaScript, CocoaPods, Gradle,
  development tools
tag: 'Development, Mobile, Updates'
published: true
locale: id
next_blog: ''
---
**Menambahkan ketergantungan ke plugin [Capacitor](https://capacitorjs.com/) bisa terasa menakutkan, tetapi lebih mudah jika dipecah menjadi langkah-langkah yang jelas. Berikut adalah yang perlu Anda ketahui:**

1.  **Pahami alat-alatnya**:
    
    -   **JavaScript**: Gunakan `npm` untuk mengelola ketergantungan.
    -   **iOS**: Gunakan [CocoaPods](https://cocoapods.org/) atau Swift Package Manager (SPM).
    -   **Android**: Gunakan [Gradle](https://gradle.org/) untuk manajemen ketergantungan.
2.  **Siapkan lingkungan pengembangan Anda**:
    
    -   Pasang alat seperti [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com/), [Xcode](https://developer.apple.com/xcode/), [Android Studio](https://developer.android.com/studio), CocoaPods, dan JDK.
3.  **Mulai proyek plugin [Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/)**:
    
    -   Gunakan `npm init @capacitor/plugin` untuk membuat plugin baru.
4.  **Tambahkan ketergantungan JavaScript**:
    
    -   Gunakan `npm install` untuk ketergantungan produksi dan pengembangan.
    -   Perbarui `package.json` untuk menyertakan ketergantungan peer seperti `@capacitor/core`.
5.  **Tangani ketergantungan spesifik platform**:
    
    -   **iOS**: Konfigurasikan CocoaPods atau SPM dengan pustaka seperti [Alamofire](https://github.com/Alamofire/Alamofire) atau [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON).
    -   **Android**: Gunakan Gradle untuk menambahkan ketergantungan seperti Gson atau AppCompat.
6.  **Optimalkan kinerja**:
    
    -   Tetapkan versi, audit ketergantungan, dan selesaikan konflik untuk memastikan stabilitas.
7.  **Gunakan alat seperti [Capgo](https://capgo.app/) untuk pembaruan langsung**:
    
    -   Dorong pembaruan secara instan tanpa ulasan toko aplikasi.

**Perbandingan Cepat Alat**:

| Platform | Alat | Contoh Ketergantungan |
| --- | --- | --- |
| JavaScript | npm | `npm install lodash --save` |
| iOS | CocoaPods/SPM | `pod 'Alamofire', '~> 5.6.4'` |
| Android | Gradle | `implementation 'com.google.code.gson:gson:2.10.1'` |

**Mengapa ini penting**: Mengelola ketergantungan dengan efektif memastikan plugin Anda bekerja mulus di berbagai platform, menghemat waktu, dan menghindari kesalahan. Mari kita selami lebih dalam langkah-langkahnya.

## Bagaimana cara membuat plugin [Capacitor](https://capacitorjs.com/) untuk iOS/Android

![Capacitor Framework Documentation Website](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-27.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/Dq_BmheGAig" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Menyiapkan Lingkungan Pengembangan Anda

Siapkan pengaturan Anda dengan alat yang diperlukan untuk menangani ketergantungan [plugin Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) secara efektif.

### Alat Pengembangan yang Diperlukan

Berikut adalah daftar alat yang Anda perlukan:

| Alat | Versi | Tujuan |
| --- | --- | --- |
| Node.js | 16.0.0+ | Lingkungan runtuh JavaScript |
| npm | 8.0.0+ | Manajemen paket |
| Xcode | 14.0+ | Pengembangan iOS (hanya Mac) |
| Android Studio | Electric Eel+ | Pengembangan Android |
| CocoaPods | 1.11.0+ | Manajemen ketergantungan iOS |
| JDK | 11+ | Alat build Android |

### Memulai Plugin Baru

Gunakan Capacitor CLI untuk memulai proyek plugin Anda. Ini termasuk menyiapkan platform dan memberi nama plugin Anda menggunakan format reverse-domain (misalnya, `com.mycompany.plugin`):

1.  Jalankan perintah berikut:  
    `npm init @capacitor/plugin`
2.  Pilih platform target Anda (iOS/Android).
3.  Beri nama plugin Anda dalam format reverse-domain.

### Langkah Pengaturan Proyek

1.  **Perbarui `package.json`**
    
    Modifikasi `package.json` Anda untuk menyertakan yang berikut:
    
    ```json
    {
      "capacitor": {
        "ios": {
          "src": "ios"
        },
        "android": {
          "src": "android"
        }
      },
      "peerDependencies": {
        "@capacitor/core": "^5.0.0"
      }
    }
    ```
    
2.  **Pengaturan Spesifik Platform**
    
    -   Untuk **iOS**, pastikan Podfile Anda menyertakan:
        
        ```ruby
        platform :ios, '13.0'
        use_frameworks!
        ```
        
    -   Untuk **Android**, verifikasi `build.gradle` Anda berisi:
        
        ```kotlin
        android {
            compileSdkVersion 33
            defaultConfig {
                minSdkVersion 22
            }
        }
        ```
        
3.  **Siapkan Variabel Lingkungan**
    
    Konfigurasikan variabel lingkungan berikut untuk alat pengembangan Anda:
    
    | Variabel | Tujuan | Nilai Contoh |
    | --- | --- | --- |
    | ANDROID\_HOME | Lokasi SDK Android | /Users/username/Library/Android/sdk |
    | JAVA\_HOME | Jalur instalasi JDK | /Library/Java/JavaVirtualMachines/jdk-11.0.12.jdk/Contents/Home |
    | XCODE\_SELECT | Alat baris perintah Xcode | /Applications/Xcode.app/Contents/Developer |
    

Setelah proyek Anda disiapkan, Anda siap untuk melanjutkan mengelola ketergantungan JavaScript.

## Ketergantungan JavaScript

Mengelola ketergantungan JavaScript secara efektif adalah kunci untuk menjaga kinerja plugin yang stabil.

### Instalasi Paket [npm](https://www.npmjs.com/)

![npm](https://mars-images.imgix.net/seobot/screenshots/www.npmjs.com-ac76028e07fa565ed4006978107f5ce6-2025-03-27.jpg?auto=compress)

Untuk memasang ketergantungan, gunakan perintah berikut:

```bash
# Add a production dependency
npm install lodash --save

# Add a development dependency
npm install @types/lodash --save-dev
```

Pastikan untuk menyertakan ketergantungan peer secara manual dalam file `package.json` Anda. Uji semua ketergantungan untuk mengonfirmasi kompatibilitas di kedua platform web dan native.

### Mengelola package.json

Berikut adalah contoh konfigurasi file `package.json`:

```json
{
  "name": "my-capacitor-plugin",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "@types/lodash": "^4.14.195",
    "@capacitor/core": "^5.0.0"
  },
  "peerDependencies": {
    "@capacitor/core": "^5.0.0"
  }
}
```

Untuk mempertahankan konsistensi, kunci versi ketergantungan dengan tepat:

| Jenis Pembatasan | Contoh | Kasus Penggunaan |
| --- | --- | --- |
| Tepat | "5.0.0" | Untuk ketergantungan kritis yang memerlukan versi tertentu |
| Caret | "^5.0.0" | Mengizinkan pembaruan minor dan patch |
| Tilde | "~5.0.0" | Membatasi pembaruan hanya untuk patch |

### Menggunakan Pustaka JavaScript

Saat mengimpor pustaka, fokuslah untuk mengurangi ukuran bundel:

```typescript
// Import only the required function
import { isEqual } from 'lodash';

export class MyPlugin {
  async compare(options: { value1: any, value2: any }): Promise<boolean> {
    return isEqual(options.value1, options.value2);
  }
}
```

Selain itu, pastikan penanganan kesalahan dan pemeriksaan tipe yang tepat:

```typescript
import { Plugin } from '@capacitor/core';
import { validate } from 'your-validation-library';

@Plugin({
  name: 'MyPlugin',
  platforms: ['web', 'ios', 'android']
})
export class MyPlugin {
  async validateData(data: unknown): Promise<void> {
    try {
      if (!validate(data)) {
        throw new Error('Invalid data format');
      }
      // Continue processing if valid
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }
}
```

Selanjutnya, jelajahi cara menangani ketergantungan spesifik platform untuk iOS.

## Ketergantungan iOS

Bagian ini menjelaskan bagaimana mengelola ketergantungan iOS native dalam [plugin Capacitor](https://capgo.app/plugins/). Setelah Anda mengatur ketergantungan JavaScript Anda, langkah berikutnya adalah menangani ketergantungan iOS native.

### Pengaturan [CocoaPods](https://cocoapods.org/)

![CocoaPods](https://mars-images.imgix.net/seobot/screenshots/cocoapods.org-fd202c6f9998fdf4cafb9b363e43119c-2025-03-27.jpg?auto=compress)

Mulailah dengan menginisialisasi CocoaPods di direktori iOS Anda:

```bash
cd ios
pod init
```

Kemudian, perbarui file `Plugin.podspec` Anda dengan konfigurasi berikut:

```ruby
Pod::Spec.new do |s|
  s.name = 'MyCapacitorPlugin'
  s.version = '1.0.0'
  s.summary = 'Your plugin description'
  s.platform = :ios, '13.0'
  s.dependency 'Capacitor'
  # Include your iOS dependencies here
  s.dependency 'Alamofire', '~> 5.6.4'
end
```

### Konfigurasi Podfile

Setelah menginisialisasi CocoaPods, konfigurasikan Podfile untuk menyertakan Capacitor dan pustaka pihak ketiga tambahan:

```ruby
platform :ios, '13.0'
use_frameworks!

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'Plugin' do
  capacitor_pods
  # Add third-party dependencies
  pod 'KeychainAccess', '~> 4.2.2'
  pod 'SwiftyJSON', '~> 5.0.1'
end

target 'PluginTests' do
  capacitor_pods
end
```

Berikut adalah beberapa pola konfigurasi ketergantungan yang umum:

| Jenis Pembatasan | Contoh | Kasus Penggunaan |
| --- | --- | --- |
| Versi Tepat | `pod 'KeychainAccess', '4.2.2'` | Ketika kontrol tepat diperlukan, seperti untuk komponen keamanan |
| Versi Minor | `pod 'Alamofire', '~> 5.6'` | Untuk API yang stabil yang mungkin menerima pembaruan patch |
| Versi Mayor | `pod 'SwiftyJSON', '> 5.0'` | Ketika fleksibilitas di seluruh pembaruan dapat diterima |

### Ketergantungan Paket Swift

Jika Anda lebih suka tidak menggunakan CocoaPods, Swift Package Manager (SPM) adalah alternatif yang baik. Tambahkan ketergantungan SPM langsung di Xcode dengan konfigurasi berikut dalam file `Package.swift` Anda:

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/Alamofire/Alamofire.git", .upToNextMajor(from: "5.6.4")),
    .package(url: "https://github.com/SwiftyJSON/SwiftyJSON.git", from: "5.0.1")
]
```

Untuk menggunakan ketergantungan SPM dalam kode plugin Anda, impor dan integrasikan sesuai kebutuhan. Misalnya:

```swift
import Capacitor
import Alamofire

@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
    @objc func makeRequest(_ call: CAPPluginCall) {
        AF.request("https://api.example.com/data").response { response in
            // Process the response
            call.resolve([
                "data": response.data
            ])
        }
    }
}
```

Pendekatan ini memungkinkan Anda memilih antara CocoaPods dan Swift Package Manager berdasarkan kebutuhan proyek Anda.

## Ketergantungan Android

Atur ketergantungan Android untuk memastikan integrasi native yang lancar. Berikut adalah cara mengelola ketergantungan untuk plugin Capacitor Anda.

### Ketergantungan [Gradle](https://gradle.org/)

![Gradle Build Tool Interface](https://mars-images.imgix.net/seobot/screenshots/gradle.org-85d271057dfb5e2e134ec99beaad5682-2025-03-27.jpg?auto=compress)

Tambahkan konfigurasi berikut ke file `build.gradle` Anda:

```kotlin
android {
    defaultConfig {
        minSdkVersion 22
        targetSdkVersion 33
    }
}

dependencies {
    implementation "androidx.appcompat:appcompat:1.6.1"
    implementation "com.google.code.gson:gson:2.10.1"
    implementation "org.jetbrains.kotlin:kotlin-stdlib:1.8.20"
    implementation project(':capacitor-android')
}
```

Tentukan versi tambahan dalam blok `buildscript`:

```kotlin
buildscript {
    ext {
        androidxCoreVersion = '1.10.1'
        kotlinVersion = '1.8.20'
    }
}
```

Setelah ketergantungan dikonfigurasi, pastikan untuk menyiapkan repositori yang diperlukan.

### Konfigurasi Repositori

Di `build.gradle` tingkat proyek Anda, sertakan repositori Maven yang diperlukan:

```kotlin
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" }
    }
}
```

Jika Anda menggunakan repositori Maven khusus atau pribadi, tambahkan kredensial seperti ini:

```kotlin
maven {
    url "https://maven.example.com/releases"
    credentials {
        username = project.findProperty("mavenUsername") ?: System.getenv("MAVEN_USERNAME")
        password = project.findProperty("mavenPassword") ?: System.getenv("MAVEN_PASSWORD")
    }
}
```

Dengan repositori yang disiapkan, address any dependency conflicts that may arise.

### Memperbaiki Masalah Kompatibilitas

Untuk menangani konflik ketergantungan, terapkan resolusi versi dalam `build.gradle` Anda:

```kotlin
configurations.all {
    resolutionStrategy {
        force "org.jetbrains.kotlin:kotlin-stdlib:1.8.20"
        force "androidx.core:core-ktx:1.10.1"
    }
}
```

Berikut adalah strategi untuk menyelesaikan masalah ketergantungan yang umum:

| Jenis Masalah | Strategi | Contoh |
| --- | --- | --- |
| Konflik Versi | Paksa versi tertentu | `force 'com.google.code.gson:gson:2.10.1'` |
| Beberapa Versi | Kecualikan modul | `exclude group: 'org.json', module: 'json'` |
| Masalah Transitive | Gunakan versi ketat | `strictly 'androidx.core:core-ktx:1.10.1'` |

Misalnya, Anda dapat mengecualikan modul yang bertentangan seperti ini:

```kotlin
dependencies {
    implementation('library:name:1.0.0') {
        exclude group: 'com.conflicting.dependency'
    }
}
```

Akhirnya, optimalkan proses build Anda dengan mengaktifkan caching dan pelaksanaan paralel dalam `gradle.properties`:

```properties
org.gradle.caching=true
org.gradle.parallel=true
org.gradle.jvmargs=-Xmx2048m
```

## Integrasi [Capgo](https://capgo.app/)

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-27.jpg?auto=compress)

Menggunakan Capgo bersama dengan manajemen ketergantungan native dan JavaScript membuat pembaruan plugin Anda lebih cepat dan mudah.

### Tentang Capgo

Capgo adalah platform pembaruan langsung yang dirancang untuk plugin dan aplikasi Capacitor. Dengan lebih dari 23,5 juta pembaruan yang disampaikan di 750 aplikasi produksi [\[1\]](https://capgo.app/), Capgo memungkinkan pengembang untuk mendorong pembaruan untuk ketergantungan dan kode secara instan - tidak diperlukan ulasan toko aplikasi. Pembaruan diamankan dengan enkripsi end-to-end dan memenuhi standar kepatuhan Apple dan Android.

### Fitur Pembaruan Capgo

Capgo menyederhanakan manajemen ketergantungan plugin dengan fitur-fitur ini:

| Fitur | Apa yang Dilakukan | Metrik Kunci |
| --- | --- | --- |
| Pembaruan Langsung | Dorong pembaruan dalam beberapa menit | 95% tingkat pembaruan pengguna dalam 24 jam |
| Pembaruan Parsial | Unduh hanya file yang berubah | 57ms rata-rata waktu respons API |
| Kontrol Versi | Kelola beberapa versi | 82% tingkat keberhasilan global |
| Sistem Saluran | Targetkan kelompok pengguna tertentu | Mendukung beberapa saluran penyebaran |

Sumber: [\[1\]](https://capgo.app/)

Capgo bekerja dengan lancar dengan alat CI/CD seperti GitHub Actions, GitLab CI, dan Jenkins, mengotomatiskan pembaruan ketergantungan dan memastikan versi plugin yang konsisten. Alat-alat ini memudahkan untuk mengintegrasikan Capgo ke dalam alur kerja Anda.

### Menyiapkan Capgo

Ikuti langkah-langkah ini untuk mengintegrasikan Capgo ke dalam proyek Anda:

1.  **Instal CLI Capgo**
    
    Jalankan perintah berikut di terminal Anda:
    
    ```bash
    npx @capgo/cli init
    ```
    
2.  **Konfigurasi Preferensi Pembaruan**
    
    Gunakan dasbor Capgo untuk mengatur saluran dan preferensi penyebaran. Konfigurasi yang dihosting di cloud dan yang dihosting sendiri didukung.
    
3.  **Tambahkan Logika Pembaruan**
    
    Tambahkan kode ini ke file plugin utama Anda untuk mengaktifkan pembaruan:
    
    ```typescript
    import { Capgo } from '@capgo/capacitor-updater';
    
    // Initialize Capgo
    const capgo = new Capgo({
      appId: 'YOUR_APP_ID',
      channel: 'production'
    });
    
    // Check for updates
    await capgo.checkForUpdate();
    ```
    

> "Kami mempraktikkan pengembangan gesit dan @Capgo sangat penting dalam memberikan terus-menerus kepada pengguna kami!" - Rodrigo Mantica

Capgo juga menyediakan dasbor analitik untuk wawasan waktu nyata tentang tingkat keberhasilan pembaruan dan aktivitas pengguna. Fitur seperti pengembalian satu klik dan pelacakan kesalahan membantu menyelesaikan masalah dengan cepat, menjaga pembaruan plugin Anda berjalan lancar.

## Kesimpulan

### Tinjauan Proses

Mengelola ketergantungan untuk plugin Capacitor melibatkan penyelarasan komponen native (iOS dan Android) dengan rekan-rekan JavaScript mereka untuk memastikan integrasi yang mulus. Proses ini mencakup pengaturan spesifik platform dan pengelolaan paket JavaScript untuk mencapai kinerja terbaik. Mengikuti langkah-langkah yang dijelaskan akan membantu mempertahankan fungsi plugin yang stabil dan efisien.

### Praktik Terbaik

Untuk mengelola ketergantungan secara efektif, pertimbangkan praktik ini:

| Praktik | Manfaat | Cara Melaksanakan |
| --- | --- | --- |
| Penetapan Versi | Menghindari masalah yang tak terduga | Gunakan versi tetap di `package.json` |
| Isolasi Platform | Meminimalkan konflik | Pisahkan ketergantungan native |
| Pembaruan Teratur | Meningkatkan keamanan | Terapkan patch kritis dengan cepat |
| Audit Ketergantungan | Mendeteksi risiko | Jalankan `npm audit` secara rutin |

Menggunakan alat pembaruan langsung seperti Capgo dapat lebih menyederhanakan dan meningkatkan praktik ini dengan memungkinkan pembaruan waktu nyata.

### Manfaat Capgo

Capgo menyederhanakan proses manajemen ketergantungan sambil memberikan kinerja yang kuat. Ini mencapai **tingkat pembaruan pengguna 95% dalam 24 jam** dan mempertahankan waktu respons API global **57ms** [\[1\]](https://capgo.app/). Dengan enkripsi end-to-end, ini memastikan pembaruan yang aman yang mematuhi pedoman Apple dan Android. Untuk tim yang mengelola beberapa versi plugin, sistem saluran Capgo memungkinkan penyebaran yang ditargetkan untuk kelompok pengguna tertentu.

Berikut adalah sekilas kinerja Capgo:

| Metrik | Nilai |
| --- | --- |
| Waktu Respons API Global | 57ms |
| Tingkat Keberhasilan Pembaruan | 82% |
| Tingkat Pembaruan Pengguna (24 Jam) | 95% |
