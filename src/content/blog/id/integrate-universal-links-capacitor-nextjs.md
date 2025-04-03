---
slug: id__integrate-universal-links-capacitor-nextjs
title: Cara Mengintegrasikan Universal Links di Next.js dengan Capacitor
description: >-
  Pelajari langkah demi langkah cara mengonfigurasi tautan universal untuk
  aplikasi Next.js Anda dengan Capacitor di platform iOS dan Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Tautan Universal Capacitor
tag: DeepLinking
published: true
locale: id
next_blog: ''
---

Link universal di iOS dan App Links di Android memungkinkan pengguna untuk langsung dibawa ke dalam aplikasi Anda dari sebuah tautan, melewati browser. Ini sangat berguna untuk meningkatkan pengalaman pengguna dan mempertahankan konteks dari halaman web ke aplikasi. Dalam panduan ini, kita akan membahas proses pengaturan deep link ini untuk aplikasi Next.js menggunakan Capacitor.

Mengatur deep link tidak memerlukan banyak kode, tetapi memerlukan beberapa konfigurasi. Di akhir panduan ini, Anda akan dapat mengklik tautan seperti `https://www.capgo.app/details/22` dan membuka aplikasi Anda ke halaman yang benar jika sudah terinstal.

## Pengaturan Deep Link Next.js

Pertama, kita akan membuat aplikasi Next.js baru dan halaman detail untuk pengujian:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Pastikan **bundle ID** Anda diatur dengan benar di file **capacitor.config.json**, karena ini penting untuk pengaturan:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Untuk routing, Next.js menggunakan routing berbasis file, jadi dengan membuat file di `pages/details/[id].js`, kita sudah mengatur rute wildcard kita.

Di `pages/details/[id].js`, kita dapat mengambil ID dari URL menggunakan router bawaan Next.js:

```jsx
import { useRouter } from 'next/router'

function DetailsPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <p>My ID: {id}</p>
    </div>
  )
}

export default DetailsPage
```

Sekarang, mari tangani event `appUrlOpen` dengan Capacitor. Event ini dipicu ketika aplikasi dibuka melalui skema URL kustom. Tambahkan listener di file `pages/_app.js`:

```jsx
import { useEffect } from 'react'
import { App } from '@capacitor/app'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    App.addListener('appUrlOpen', (event) => {
      const slug = event.url.split('.app').pop()
      if (slug)
        window.location.href = slug

    })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
```

Kode ini mendengarkan event `appUrlOpen` dan menavigasi ke rute yang sesuai dalam aplikasi Next.js Anda.

## Konfigurasi iOS

Untuk iOS, Anda memerlukan ID aplikasi dengan Associated Domains diaktifkan. Buat file **apple-app-site-association** dengan konten berikut, ganti `YOURTEAMID` dan `com.yourbundle.id` dengan ID tim dan bundle ID Anda yang sebenarnya:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOURTEAMID.com.your.bundleid",
        "paths": ["*"]
      }
    ]
  }
}
```

Unggah file ini ke direktori `/.well-known` di domain Anda, membuatnya dapat diakses di `https://www.capgo.app/.well-known/apple-app-site-association`.

Di Xcode, tambahkan domain ke entitlements aplikasi Anda menggunakan format `applinks:capgo.app`.

## Konfigurasi Android

Untuk Android App Links, ikuti langkah-langkah berikut:

1. Buat file keystore jika Anda belum memilikinya
2. Dapatkan sidik jari SHA256 dari keystore
3. Buat file **assetlinks.json** dengan nama paket dan sidik jari SHA256 Anda
4. Unggah file ini ke direktori `/.well-known` di domain Anda

Dalam `AndroidManifest.xml` Anda, tambahkan `intent-filter` ke elemen `activity` yang menangani deep link:

```xml
<activity ...>
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="capgo.app" />
  </intent-filter>
</activity>
```

Setelah mengunggah file `assetlinks.json`, Anda dapat memverifikasinya menggunakan alat Digital Asset Links Google. Jika semuanya diatur dengan benar, Anda akan melihat tanda centang hijau.

Untuk membangun dan menandatangani aplikasi Anda, gunakan perintah berikut:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Ini akan menginstal aplikasi yang ditandatangani di perangkat Android Anda yang terhubung.

## Konfigurasi Capacitor untuk Pengaturan Proyek Native

Untuk mengotomatisasi pengaturan proyek native, pertimbangkan untuk menggunakan [paket konfigurasi Capacitor](https://github.com/ionic-team/capacitor-configure/). Instal di proyek Anda:

```sh
npm install @capacitor/configure
```

Buat file `capacitor.config.yaml` di root proyek Anda:

```yaml
vars:
  BUNDLE_ID: com.capgo.deeplinks
  PACKAGE_NAME: com.capgo.deeplinks
platforms:
  ios:
    targets:
      App:
        bundleId: $BUNDLE_ID
    entitlements:
      - com.apple.developer.associated-domains: ['applinks:capgo.app']
  android:
    packageName: $PACKAGE_NAME
```

Jalankan alat konfigurasi dengan config ini:

```sh
npx cap-config run capacitor.config.yaml
```

Ini akan menerapkan pengaturan yang ditentukan dalam file YAML ke proyek native Anda.

## Kesimpulan

Mengatur deep link dengan Capacitor untuk aplikasi Next.js melibatkan konfigurasi pengaturan domain dan proyek untuk iOS dan Android. Meskipun prosesnya memerlukan perhatian terhadap detail, ini lebih sederhana dibandingkan metode lama dan tidak memerlukan plugin tambahan. Pastikan file verifikasi domain Anda disajikan dengan benar dan periksa dengan alat platform masing-masing. Setelah diatur, aplikasi Anda akan terbuka dengan mulus dari tautan web, memberikan transisi yang lancar bagi pengguna Anda dari web ke aplikasi.