---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notifikasi Push Ionic Capacitor dengan Firebase: Panduan Langkah demi Langkah'
description: >-
  Temukan cara mengintegrasikan notifikasi push ke dalam aplikasi Ionic
  Capacitor Anda menggunakan Firebase, dengan petunjuk langkah demi langkah
  untuk platform Android dan iOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notifikasi push Ionic Capacitor dengan Firebase
tag: tutorial
published: true
locale: id
next_blog: ''
---

Dalam tutorial ini, kita akan mengintegrasikan notifikasi push dalam aplikasi Ionic Capacitor menggunakan Firebase. Anda tidak memerlukan layanan khusus untuk ini, tetapi Anda perlu mengkonfigurasi beberapa hal terlebih dahulu. Firebase adalah pilihan yang sangat baik karena diperlukan untuk Android, dan Anda dapat dengan mudah menggunakannya untuk mengirim notifikasi tanpa menggunakan database.

Pertama, kita akan membuat aplikasi Ionic dengan Capacitor diaktifkan dan menentukan **package id** kita, yang merupakan pengidentifikasi unik untuk aplikasi Anda. Kemudian, kita akan membangun aplikasi dan menambahkan platform native.

Jika Anda sudah memiliki aplikasi, Anda dapat mengubah **capacitor.config.json** untuk menyertakan **appId** Anda. Namun, jika folder native Anda sudah ada, Anda perlu mengganti id di semua file tempat id tersebut muncul, karena Capacitor hanya membuat folder satu kali dan **tidak akan memperbarui id itu sendiri**. Dalam **capacitor.config.json**, Anda juga dapat menentukan opsi seperti memperbarui jumlah badge, memainkan suara saat push, dan menampilkan peringatan saat notifikasi tiba.

Sekarang, mari konfigurasi notifikasi push di luar aplikasi.

## Konfigurasi Firebase

Mulailah dengan [membuat proyek Firebase baru](https://firebase.google.com/) atau menggunakan yang sudah ada. Berikan nama dan opsi default untuk proyek baru.

Jika Anda memiliki aplikasi baru, Anda akan melihat **"Mulai dengan menambahkan Firebase ke aplikasi Anda"** di dashboard aplikasi Anda. Jika tidak, klik ikon roda gigi dan buka **pengaturan proyek** untuk menambahkan aplikasi.

Dialog untuk iOS dan Android terlihat mirip, dan hal yang penting adalah menggunakan **package id** Anda untuk aplikasi.

Setelah langkah awal, unduh file-file berikut:

- File **google-services.json** untuk Android
- File **GoogleService-Info.plist** untuk iOS

Selanjutnya, konfigurasikan platform-platformnya.

### Persiapan Push Android

Untuk Android, pindahkan file **google-services.json** yang Anda unduh ke folder **android/app/**

Itu saja untuk Android. Sekarang mari konfigurasi iOS.

### Persiapan Push iOS

Bagian ini lebih rumit. Pertama, [buat App ID untuk aplikasi Anda dalam daftar identifiers](https://developer.apple.com/account/resources/identifiers/list/) di akun Apple Developer Anda. Pastikan Anda **memilih kemampuan Push Notifications** dari daftar tersebut.

**Bundle ID** harus sama dengan App ID Anda di dalam Capacitor dan Firebase.

Sekarang, [buat Kunci](https://developer.apple.com/account/resources/authkeys/list/) dan aktifkan **Apple Push Notifications service (APNs)**. Jika Anda telah mencapai jumlah maksimum kunci, Anda dapat menggunakan kunci yang ada atau sertifikat sebagai gantinya, tetapi prosesnya lebih rumit.

Setelah mengunduh file **p8**, unggah ke Firebase. Buka tab **Cloud Messaging** di pengaturan proyek Firebase Anda, unggah file tersebut, dan masukkan detail untuk ID Kunci dan ID Tim Anda dari iOS.

Sekarang, lakukan perubahan pada proyek Xcode Anda dengan menjalankan:

Salin file **GoogleService-Info.plist** yang Anda unduh dari Firebase ke dalam proyek iOS Anda. Seret file tersebut ke dalam proyek Xcode di dalam folder app/app, dan pilih **Copy items if needed**.

Selanjutnya, tambahkan Pod baru untuk dependensi Firebase di **ios/App/Podfile**:

Perbarui platform native dengan perintah ini:

Ubah kode Swift native di **ios/App/App/AppDelegate.swift** untuk mendaftar dengan Firebase dan mengembalikan token yang benar ke aplikasi Anda.

Terakhir, tambahkan Capability untuk Push Notifications dalam proyek Xcode Anda.

Sekarang, bangun aplikasi Anda dan integrasikan notifikasi push.

## Integrasi Notifikasi Push Ionic

Buat layanan dan halaman baru dalam proyek Ionic Anda:

Perbarui routing di **app/app-routing.module**:ts** untuk menyertakan halaman baru dengan id dinamis:

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

Buat layanan untuk menangani notifikasi push di **services/fcmservicets**:

```json
{
  "appId": "com.appdactic.devpush",
  "appName": "pushApp",
  "bundledWebRuntime": false,
  "npmClient": "npm",
  "webDir": "www",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  },
  "cordova": {}
}
```

Panggil fungsi `initPush()` di **app/appcomponentts**:

```bash
npx cap open ios
```

Tangani informasi pada halaman detail di **pages/details/detailspagets**:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Tampilkan detail di **pages/details/detailspagehtml**:

```bash
npx cap update ios
```

Bangun aplikasi, sinkronkan perubahan Anda, dan deploy ke perangkat Anda

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    FirebaseApp.configure()
    return true
  }

  // All the existing functions
  // ...

  // Update this one:
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
        InstanceID.instanceID().instanceID { (result, error) in
            if let error = error {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidFailToRegisterForRemoteNotificationsWithError.name()), object: error)
            } else if let result = result {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidRegisterForRemoteNotificationsWithDeviceToken.name()), object: result.token)
            }
        }
    }
}
```

Sekarang, Anda dapat mengirim notifikasi push dengan Firebase

## Mengirim Notifikasi Push dengan Firebase

Ada beberapa cara untuk mengirim notifikasi push dengan Firebase

### Pengujian Perangkat Spesifik

Setelah men-deploy aplikasi Anda ke perangkat, Anda dapat memeriksa log konsol untuk melihat token setelah pendaftaran. Gunakan token ini untuk mengirim pengujian push yang ditargetkan untuk mengkonfirmasi integrasi Anda berfungsi. Di Firebase, buka **Cloud Messaging** dan pilih **Send test message**. Tambahkan token perangkat dari log.

![firebase-test-push](/firebase-test-pushwebp)

Jika semuanya diatur dengan benar, Anda seharusnya melihat notifikasi push di perangkat Anda.

### Pesan Push dengan Payload

Untuk menguji notifikasi push dengan informasi tambahan, ikuti wizard di halaman yang sama untuk menentukan informasi umum dan pilih platform yang ingin Anda targetkan. Tambahkan **additional options** untuk mengirim payload dengan notifikasi push Anda.

![firebase-push-payload](/firebase-push-payloadwebp)

Di bagian **Advanced options**, tambahkan pasangan kunci-nilai **Custom data**. Misalnya, Anda dapat menggunakan kunci `detailsId` dan nilai pilihan Anda. Data ini akan digunakan dalam aplikasi untuk menavigasi ke halaman detail dengan id yang ditentukan.

Setelah mengirim notifikasi push, aplikasi Anda seharusnya menerimanya dan menampilkan halaman detail dengan id yang ditentukan ketika notifikasi diketuk.

### Menggunakan API Firebase

Anda juga dapat mengirim notifikasi push secara programatik menggunakan API Firebase. Untuk melakukan ini, Anda perlu mendapatkan **Server key** dari pengaturan proyek Firebase Anda di bawah tab **Cloud Messaging**.

Dengan server key, Anda dapat mengirim permintaan POST ke API Firebase dengan payload yang diperlukan. Berikut contoh menggunakan Nodejs dan pustaka `request`:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Ganti `YOUR_SERVER_KEY` dan `YOUR_DEVICE_TOKEN` dengan server key dan token perangkat Anda yang sebenarnya. Jalankan skrip, dan perangkat Anda seharusnya menerima notifikasi push dengan payload kustom.

Itu saja! Anda telah berhasil mengintegrasikan notifikasi push dalam aplikasi Ionic Capacitor Anda menggunakan Firebase. Sekarang Anda dapat mengirim notifikasi push kepada pengguna Anda baik di platform Android maupun iOS.