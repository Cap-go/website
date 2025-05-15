---
slug: ionic-capacitor-push-notifications-firebase
title: 'Ionic Capacitor Notifikasi Push dengan Firebase: Panduan Langkah demi Langkah'
description: >-
  Pelajari cara mengintegrasikan notifikasi push di aplikasi Ionic Capacitor
  Anda menggunakan Firebase, dengan petunjuk langkah demi langkah untuk platform
  Android dan iOS.
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
tag: Tutorial
published: true
locale: id
next_blog: ''
---
Dalam tutorial ini, kita akan mengintegrasikan notifikasi push dalam aplikasi Ionic Capacitor menggunakan Firebase. Anda tidak memerlukan layanan tertentu untuk ini, tetapi Anda perlu mengonfigurasi beberapa hal sebelumnya. Firebase adalah pilihan yang sangat baik karena diperlukan untuk Android, dan Anda dapat dengan mudah menggunakannya untuk mengirim notifikasi tanpa menggunakan basis data.

<div class="mx-auto" style="width: 50%;">
  <video src="/push_demo.mov" alt="ionic capacitor push" autoplay loop muted>
</div>

Pertama, kita akan membuat aplikasi Ionic dengan Capacitor yang diaktifkan dan menentukan **package id** kita, yang merupakan pengidentifikasi unik untuk aplikasi Anda. Kemudian, kita akan membangun aplikasi dan menambahkan platform native.

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

Jika Anda sudah memiliki aplikasi, Anda dapat mengubah **capacitor.config.json** untuk menyertakan **appId** Anda. Namun, jika folder native Anda sudah ada, Anda perlu mengganti id di semua file di mana itu muncul, karena Capacitor hanya membuat folder sekali dan **tidak akan memperbarui id itu sendiri**. Di **capacitor.config.json**, Anda juga dapat menentukan opsi seperti memperbarui jumlah badge, memutar suara saat push, dan menampilkan peringatan saat notifikasi tiba.

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

Sekarang, mari kita konfigurasi notifikasi push di luar aplikasi.

## Konfigurasi Firebase

Mulailah dengan [membuat proyek Firebase baru](https://firebase.google.com/) atau menggunakan yang sudah ada. Berikan nama dan opsi default untuk proyek baru.

Jika Anda memiliki aplikasi baru, Anda seharusnya melihat **"Mulai dengan menambahkan Firebase ke aplikasi Anda"** di dasbor aplikasi Anda. Jika tidak, klik ikon roda gigi dan pergi ke **pengaturan proyek** untuk menambahkan aplikasi.

Dialog untuk iOS dan Android terlihat mirip, dan yang penting adalah menggunakan **package id** Anda untuk aplikasi.

<div class="mx-auto" style="width: 100%;">
  <img src="/firebase-app-setup-ios.webp" alt="firebase-app-setup-ios">
</div>

Setelah langkah awal, unduh file berikut:

- File **google-services.json** untuk Android
- File **GoogleService-info.plist** untuk iOS

Selanjutnya, konfigurasikan platform.

### Persiapan Push Android

Untuk Android, pindahkan file **google-services.json** yang Anda unduh ke folder **android/app/**.

<div class="mx-auto" style="width: 50%;">
  <img src="/android-push-file.webp" alt="android-push-file">
</div>

Itu saja untuk Android. Sekarang mari kita konfigurasi iOS.

### Persiapan Push iOS

Bagian ini lebih rumit. Pertama, [buat App ID untuk aplikasi Anda dalam daftar pengidentifikasi](https://developer.apple.com/account/resources/identifiers/list/) di akun Pengembang Apple Anda. Pastikan Anda **memilih kemampuan Notifikasi Push** dari daftar.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

**Bundle ID** harus sama dengan App ID Anda dalam Capacitor dan Firebase.

Sekarang, [buat Kunci](https://developer.apple.com/account/resources/authkeys/list/) dan aktifkan **layanan Notifikasi Push Apple (APNs)**. Jika Anda telah mencapai jumlah maksimum kunci, Anda dapat menggunakan kunci yang ada atau sertifikat sebagai gantinya, tetapi prosesnya lebih rumit.

![ios-developer-push-key](/ios-developer-push-key.webp)

Setelah mengunduh file **.p8**, unggah ke Firebase. Buka tab **Cloud Messaging** di pengaturan proyek Firebase Anda, unggah file tersebut, dan masukkan detail untuk Key ID dan Team ID Anda dari iOS.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

Sekarang, buat perubahan pada proyek Xcode Anda dengan menjalankan:

```bash
npx cap open ios
```

Salin file **GoogleService-Info.plist** yang Anda unduh dari Firebase ke proyek iOS Anda. Seret file tersebut ke dalam proyek Xcode di dalam folder app/app, dan pilih **Salin item jika perlu**.

Selanjutnya, tambahkan Pod baru untuk dependensi Firebase di **ios/App/Podfile**:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Perbarui platform native dengan perintah ini:

```bash
npx cap update ios
```

Modifikasi kode Swift native di **ios/App/App/AppDelegate.swift** untuk mendaftar dengan Firebase dan mengembalikan token yang benar ke aplikasi Anda.

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

Terakhir, tambahkan Kemampuan untuk Notifikasi Push dalam proyek Xcode Anda.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

Sekarang, bangun aplikasi Anda dan integrasikan notifikasi push.

## Integrasi Notifikasi Push Ionic

Buat layanan dan halaman baru dalam proyek Ionic Anda:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Perbarui routing di **app/app-routing.module.ts** untuk menyertakan halaman baru dengan id dinamis:

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Buat layanan untuk menangani notifikasi push di **services/fcm.service.ts**:

```typescript
import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
import { Router } from '@angular/router';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router) { }

  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );
  }
}
```

Panggil fungsi `initPush()` di **app/app.component.ts**:

```typescript
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmService: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Trigger the push setup
      this.fcmService.initPush();
    });
  }
}
```

Tangani informasi di halaman detail di **pages/details/details.page.ts**:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }

}
```

Tampilkan detailnya di **pages/details/details.page.html**:

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/"></ion-back-button>
    </ion-buttons>
    <ion-title>Details</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  My Id from push: {{ id }}

  <ion-button (click)="resetBadgeCount()" expand="block">
    Reset Badge Count
  </ion-button>
</ion-content>
```

Bangun aplikasi, sinkronkan perubahan Anda, dan terapkan ke perangkat Anda.

```bash
ionic build
npx cap sync
```

Sekarang, Anda dapat mengirim notifikasi push dengan Firebase.

## Mengirim Notifikasi Push dengan Firebase

Ada beberapa cara untuk mengirim notifikasi push dengan Firebase.

### Uji Perangkat Spesifik

Setelah menerapkan aplikasi Anda ke perangkat, Anda dapat memeriksa log konsol untuk melihat token setelah pendaftaran. Gunakan token ini untuk mengirim push uji yang ditargetkan untuk mengonfirmasi bahwa integrasi Anda berfungsi. Di Firebase, pergi ke **Cloud Messaging** dan pilih **Kirim pesan uji**. Tambahkan token perangkat dari log.

![firebase-test-push](/firebase-test-push.webp)

Jika semuanya diatur dengan benar, Anda seharusnya melihat notifikasi push di perangkat Anda.

### Pesan Push dengan Payload

Untuk menguji notifikasi push dengan informasi tambahan, ikuti panduan di halaman yang sama untuk menentukan informasi umum dan pilih platform yang ingin Anda targetkan. Tambahkan **opsi tambahan** untuk mengirim payload dengan notifikasi push Anda.

![firebase-push-payload](/firebase-push-payload.webp)

Di bagian **Opsi lanjutan**, tambahkan pasangan kunci-nilai **Data Kustom**. Misalnya, Anda dapat menggunakan kunci `detailsId` dan nilai pilihan Anda. Data ini akan digunakan dalam aplikasi untuk navigasi ke halaman detail dengan id yang ditentukan.

Setelah mengirim notifikasi push, aplikasi Anda harus menerimanya dan menampilkan halaman detail dengan id yang ditentukan ketika notifikasi diketuk.

### Menggunakan API Firebase

Anda juga dapat mengirim notifikasi push secara programatis menggunakan API Firebase. Untuk melakukan ini, Anda perlu mendapatkan **Kunci Server** dari pengaturan proyek Firebase Anda di bawah tab **Cloud Messaging**.

Dengan kunci server, Anda dapat mengirim permintaan POST ke API Firebase dengan payload yang diperlukan. Berikut adalah contoh menggunakan Node.js dan pustaka `request`:

```javascript
const request = require('request');

const serverKey = 'YOUR_SERVER_KEY';
const deviceToken = 'YOUR_DEVICE_TOKEN';

const options = {
  method: 'POST',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'key=' + serverKey
  },
  body: JSON.stringify({
    to: deviceToken,
    notification: {
      title: 'Test Push',
      body: 'This is a test push notification with custom data'
    },
    data: {
      detailsId: '123'
    }
  })
};

request(options, (error, response, body) => {
  if (error) {
    console.error('Error sending push:', error);
  } else {
    console.log('Push sent successfully:', body);
  }
});
```

Gantilah `YOUR_SERVER_KEY` dan `YOUR_DEVICE_TOKEN` dengan kunci server dan token perangkat Anda yang sebenarnya. Jalankan skrip tersebut, dan perangkat Anda harus menerima notifikasi push dengan payload kustom.

Itu saja! Anda telah berhasil mengintegrasikan notifikasi push dalam aplikasi Ionic Capacitor Anda menggunakan Firebase. Sekarang Anda dapat mengirim notifikasi push kepada pengguna Anda di platform Android dan iOS.
