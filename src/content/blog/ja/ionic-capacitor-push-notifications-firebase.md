---
slug: ionic-capacitor-push-notifications-firebase
title: Ionic Capacitorを使用したFirebaseによるプッシュ通知：ステップバイステップガイド
description: >-
  Firebaseを使用してIonic
  Capacitorアプリにプッシュ通知を統合する方法を学び、AndroidおよびiOSプラットフォームの両方に対するステップバイステップの指示を提供します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Ionic Capacitor Firebaseを使用したプッシュ通知
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: ''
---
このチュートリアルでは、Firebaseを使用してIonic Capacitorアプリにプッシュ通知を統合します。これには特定のサービスは必要ありませんが、事前にいくつかの設定を行う必要があります。Firebaseは、Androidに必要であり、データベースを使用せずに通知を送信できるため、優れた選択肢です。

<div class="mx-auto" style="width: 50%;">
  <video src="/push_demo.mov" alt="ionic capacitor push" autoplay loop muted>
</div>

まず、Capacitorを有効にしたIonicアプリを作成し、アプリのユニークな識別子である**パッケージID**を指定します。次に、アプリをビルドし、ネイティブプラットフォームを追加します。

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

すでにアプリがある場合は、**capacitor.config.json**を変更して**appId**を含めることができます。ただし、ネイティブフォルダーがすでに存在する場合は、Capacitorがフォルダーを一度だけ作成し、**ID自体を更新しない**ため、IDが表示されるすべてのファイルでIDを置き換える必要があります。**capacitor.config.json**では、バッジカウントの更新、プッシュ時に音を鳴らす、通知が到着したときにアラートを表示するなどのオプションも指定できます。

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

さて、アプリの外部でプッシュ通知を設定しましょう。

## Firebase設定

まず、[新しいFirebaseプロジェクトを作成](https://firebase.google.com/)するか、既存のものを使用します。新しいプロジェクト名とデフォルトオプションを提供します。

新しいアプリがある場合、アプリのダッシュボードに**「Firebaseをアプリに追加して始める」**と表示されます。そうでない場合は、歯車アイコンをクリックして**プロジェクト設定**に移動し、アプリを追加します。

iOSとAndroidのダイアログは似たような外観で、重要なのはアプリ用に**パッケージID**を使用することです。

<div class="mx-auto" style="width: 100%;">
  <img src="/firebase-app-setup-ios.webp" alt="firebase-app-setup-ios">
</div>

初期ステップの後、以下のファイルをダウンロードします：

- Android用の**google-services.json**ファイル
- iOS用の**GoogleService-info.plist**ファイル

次に、プラットフォームを設定します。

### Androidプッシュ準備

Androidでは、ダウンロードした**google-services.json**ファイルを**android/app/**フォルダーに移動します。

<div class="mx-auto" style="width: 50%;">
  <img src="/android-push-file.webp" alt="android-push-file">
</div>

これでAndroidは完了です。次にiOSを設定しましょう。

### iOSプッシュ準備

この部分はより複雑です。まず、[Apple Developerアカウントの識別子リスト内にアプリのApp IDを作成](https://developer.apple.com/account/resources/identifiers/list/)します。リストから**プッシュ通知機能**を選択してください。

![ionic-ios-push-id](/ionic-ios-push-id.webp)

**Bundle ID**は、CapacitorおよびFirebase内のあなたのApp IDと同じである必要があります。

次に、[鍵を作成](https://developer.apple.com/account/resources/authkeys/list/)し、**Apple Push Notifications service (APNs)**を有効にします。鍵の最大数に達した場合は、既存の鍵や証明書を代わりに使用できますが、そのプロセスはより複雑です。

![ios-developer-push-key](/ios-developer-push-key.webp)

**.p8**ファイルをダウンロードした後、Firebaseにアップロードします。Firebaseプロジェクト設定の**Cloud Messaging**タブを開き、ファイルをアップロードし、iOSからのKey IDとTeam IDの詳細を入力します。

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

次に、以下のコマンドを実行してXcodeプロジェクトに変更を加えます：

```bash
npx cap open ios
```

Firebaseからダウンロードした**GoogleService-Info.plist**ファイルをiOSプロジェクトにコピーします。ファイルをアプリ/appフォルダー内のXcodeプロジェクトにドラッグし、**必要に応じてアイテムをコピー**を選択します。

次に、**ios/App/Podfile**にFirebase依存関係用の新しいPodを追加します：

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

このコマンドでネイティブプラットフォームを更新します：

```bash
npx cap update ios
```

**ios/App/App/AppDelegate.swift**内のネイティブSwiftコードを修正して、Firebaseに登録し、アプリに正しいトークンを返します。

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

最後に、Xcodeプロジェクト内でプッシュ通知の機能を追加します。

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

これでアプリをビルドし、プッシュ通知を統合しましょう。

## Ionicプッシュ通知統合

Ionicプロジェクトにサービスと新しいページを作成します：

```bash
ionic g service services/fcm
ionic g page pages/details
```

**app/app-routing.module.ts**内のルーティングを新しいページと動的IDを含むように更新します：

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

**services/fcm.service.ts**内でプッシュ通知を処理するサービスを作成します：

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

**app/app.component.ts**内で`initPush()`関数を呼び出します：

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

**pages/details/details.page.ts**内で詳細ページの情報を処理します：

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

**pages/details/details.page.html**内で詳細を表示します：

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

アプリをビルドし、変更を同期し、デバイスにデプロイします。

```bash
ionic build
npx cap sync
```

これでFirebaseを使用してプッシュ通知を送信できます。

## Firebaseでのプッシュ通知送信

Firebaseでプッシュ通知を送信する方法はいくつかあります。

### 特定デバイスタスト

デバイスにアプリをデプロイした後、登録後のトークンを確認するためにコンソールログを確認できます。このトークンを使用して、統合が正常に動作していることを確認するために、ターゲットテストプッシュを送信します。Firebaseで**Cloud Messaging**に移動し、**テストメッセージを送信**を選択します。ログからデバイストークンを追加します。

![firebase-test-push](/firebase-test-push.webp)

すべてが正しく設定されていれば、デバイスでプッシュ通知を見ることができるはずです。

### ペイロード付きプッシュメッセージ

追加情報を含むプッシュ通知をテストするには、同じページのウィザードに従い、一般情報を指定し、ターゲットとするプラットフォームを選択します。プッシュ通知にペイロードを送信するための**追加オプション**を追加します。

![firebase-push-payload](/firebase-push-payload.webp)

**高度なオプション**セクションで、**カスタムデータ**のキーと値のペアを追加します。たとえば、`detailsId`というキーと任意の値を使用できます。このデータは、指定したIDを持って詳細ページに移動するためにアプリで使用されます。

プッシュ通知を送信した後、アプリはそれを受信し、通知がタップされたときに指定したIDを持った詳細ページを表示する必要があります。

### Firebase APIを使用

Firebase APIを使用してプッシュ通知をプログラム的に送信することもできます。これを行うには、Firebaseプロジェクト設定の**Cloud Messaging**タブから**サーバーキー**を取得する必要があります。

サーバーキーを使用して、必要なペイロードを持つPOSTリクエストをFirebase APIに送信できます。以下は、Node.jsと`request`ライブラリを使用した例です：

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

`YOUR_SERVER_KEY`と`YOUR_DEVICE_TOKEN`を実際のサーバーキーとデバイストークンに置き換えます。スクリプトを実行すると、デバイスはカスタムペイロードを持つプッシュ通知を受信するはずです。

これで完了です！Firebaseを使用してIonic Capacitorアプリにプッシュ通知を正常に統合しました。これでAndroidおよびiOSプラットフォームでユーザーにプッシュ通知を送信できます。
