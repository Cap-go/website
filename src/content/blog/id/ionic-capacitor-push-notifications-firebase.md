---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notifications Push Ionic Capacitor avec Firebase : Un Guide Étape par Étape'
description: >-
  Pelajari cara mengintegrasikan notifikasi push dalam aplikasi Ionic Capacitor
  Anda menggunakan Firebase, dengan instruksi langkah demi langkah untuk
  platform Android dan iOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notifikasi Push Ionic Capacitor dengan Firebase
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: tutorial
published: true
locale: id
next_blog: ''
---

Dalam tutorial ini, kita akan mengintegrasikan notifikasi push pada aplikasi Ionic Capacitor menggunakan Firebase. Anda tidak memerlukan layanan khusus untuk ini, tetapi Anda perlu mengkonfigurasi beberapa hal terlebih dahulu. Firebase adalah pilihan yang sangat baik karena dibutuhkan untuk Android, dan Anda dapat dengan mudah menggunakannya untuk mengirim notifikasi tanpa menggunakan database.

<Steps>
  1. Membuat aplikasi Ionic dengan Capacitor dan konfigurasi dasar
</Steps>

Pertama, kita akan membuat aplikasi Ionic dengan Capacitor yang telah diaktifkan dan menentukan **package id** kita, yang merupakan pengidentifikasi unik untuk aplikasi Anda. Kemudian, kita akan membangun aplikasi dan menambahkan platform native.

```bash
ionic start ionic-push-notifications blank --capacitor
cd ionic-push-notifications
```

Jika Anda sudah memiliki aplikasi, Anda dapat mengubah **capacitor.config.json** untuk menyertakan **appId** Anda. Namun, jika folder native Anda sudah ada, Anda perlu mengganti id di semua file tempat id tersebut muncul, karena Capacitor hanya membuat folder satu kali dan **tidak akan memperbarui id itu sendiri**. Di **capacitor.config.json**, Anda juga dapat menentukan opsi seperti memperbarui jumlah badge, memainkan suara saat push, dan menampilkan peringatan ketika notifikasi tiba.

```json
{
  "appId": "com.company.app",
  "appName": "Your App",
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

Sekarang, mari konfigurasi notifikasi push di luar aplikasi.

## Konfigurasi Firebase

Mulai dengan [membuat proyek Firebase baru](https://firebase.google.com/) atau gunakan yang sudah ada. Berikan nama dan opsi default untuk proyek baru.

Jika Anda memiliki aplikasi baru, Anda akan melihat **"Get started by adding Firebase to your app"** di dashboard aplikasi Anda. Jika tidak, klik ikon gear dan buka **project settings** untuk menambahkan aplikasi.

Dialog untuk iOS dan Android terlihat mirip, dan hal yang penting adalah menggunakan **package id** Anda untuk aplikasi tersebut.

<Steps>
  1. Pilih platform yang ingin Anda konfigurasikan (Android/iOS)
</Steps>

Setelah langkah awal, unduh file-file berikut:

- File **google-services.json** untuk Android
- File **GoogleService-Info.plist** untuk iOS

Selanjutnya, konfigurasikan platform-platform tersebut.

### Persiapan Push Android

Untuk Android, pindahkan file **google-services.json** yang Anda unduh ke folder **android/app/**

<Steps>
  1. Pindahkan file google-services.json ke android/app/
</Steps>

Itu saja untuk Android. Sekarang mari konfigurasi iOS.

### Persiapan Push iOS

Bagian ini lebih rumit. Pertama, [buat App ID untuk aplikasi Anda dalam daftar identifiers](https://developer.apple.com/account/resources/identifiers/list/) di akun Apple Developer Anda. Pastikan Anda **memilih kemampuan Push Notifications** dari daftar tersebut.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

**Bundle ID** harus sama dengan App ID Anda di dalam Capacitor dan Firebase.

Sekarang, [buat Key](https://developer.apple.com/account/resources/authkeys/list/) dan aktifkan **Apple Push Notifications service (APNs)**. Jika Anda telah mencapai jumlah maksimum key, Anda dapat menggunakan key yang ada atau sertifikat sebagai gantinya, tetapi prosesnya lebih rumit.

![ios-developer-push-key](/ios-developer-push-key.webp)

Setelah mengunduh file **p8**, unggah ke Firebase. Buka tab **Cloud Messaging** di pengaturan proyek Firebase Anda, unggah file tersebut, dan masukkan detail untuk Key ID dan Team ID dari iOS Anda.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

Sekarang, lakukan perubahan pada proyek Xcode Anda dengan menjalankan:

```bash
npx cap open ios
```

Salin file **GoogleService-Info.plist** yang Anda unduh dari Firebase ke dalam proyek iOS Anda. Seret file tersebut ke dalam proyek Xcode di dalam folder app/app, dan pilih **Copy items if needed**.

Selanjutnya, tambahkan Pod baru untuk dependensi Firebase di **ios/App/Podfile**:

```ruby
pod 'Firebase/Messaging'
```

Perbarui platform native dengan perintah ini:

```bash
pod install
```

Modifikasi kode Swift native di **ios/App/App/AppDelegate.swift** untuk mendaftar dengan Firebase dan mengembalikan token yang benar ke aplikasi Anda:

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        return true
    }
```

Terakhir, tambahkan Capability untuk Push Notifications dalam proyek Xcode Anda.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

Sekarang, bangun aplikasi Anda dan integrasikan notifikasi push.

## Integrasi Notifikasi Push Ionic

Buat service dan halaman baru dalam proyek Ionic Anda:

```bash
ionic g service services/fcm
ionic g page pages/notifications
```

Perbarui routing di **app/app-routing.module**ts** untuk menyertakan halaman baru dengan id dinamis:

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

Build aplikasi, sinkronkan perubahan, dan deploy ke perangkat Anda

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

Setelah men-deploy aplikasi ke perangkat, Anda dapat memeriksa log konsol untuk melihat token setelah registrasi. Gunakan token ini untuk mengirim pengujian push yang ditargetkan untuk mengkonfirmasi integrasi Anda berfungsi. Di Firebase, buka **Cloud Messaging** dan pilih **Send test message**. Tambahkan token perangkat dari log.

![firebase-test-push](/firebase-test-pushwebp)

Jika semuanya diatur dengan benar, Anda seharusnya melihat notifikasi push di perangkat Anda

### Pesan Push dengan Payload

Untuk menguji notifikasi push dengan informasi tambahan, ikuti wizard di halaman yang sama untuk menentukan informasi umum dan pilih platform yang ingin Anda targetkan. Tambahkan **additional options** untuk mengirim payload dengan notifikasi push Anda

![firebase-push-payload](/firebase-push-payloadwebp)

Di bagian **Advanced options**, tambahkan pasangan kunci-nilai **Custom data**. Misalnya, Anda dapat menggunakan kunci `detailsId` dan nilai pilihan Anda. Data ini akan digunakan dalam aplikasi untuk menavigasi ke halaman detail dengan id yang ditentukan

Setelah mengirim notifikasi push, aplikasi Anda akan menerimanya dan menampilkan halaman detail dengan id yang ditentukan ketika notifikasi diketuk

### Menggunakan API Firebase

Anda juga dapat mengirim notifikasi push secara programatik menggunakan API Firebase. Untuk melakukan ini, Anda perlu mendapatkan **Server key** dari pengaturan proyek Firebase Anda di bawah tab **Cloud Messaging**

Dengan server key, Anda dapat mengirim permintaan POST ke API Firebase dengan payload yang diperlukan. Berikut contoh menggunakan Nodejs dan pustaka `request`:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Ganti `YOUR_SERVER_KEY` dan `YOUR_DEVICE_TOKEN` dengan server key dan token perangkat Anda yang sebenarnya. Jalankan script, dan perangkat Anda seharusnya menerima notifikasi push dengan payload kustom

Selesai! Anda telah berhasil mengintegrasikan notifikasi push di aplikasi Ionic Capacitor Anda menggunakan Firebase. Sekarang Anda dapat mengirim notifikasi push ke pengguna Anda di platform Android dan iOS