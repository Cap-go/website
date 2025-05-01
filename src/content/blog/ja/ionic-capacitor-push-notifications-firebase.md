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
head_image_alt: Firebase を使用した Ionic Capacitor プッシュ通知
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: tutorial
published: true
locale: ja
next_blog: ''
---

このチュートリアルでは、Firebaseを使用してIonic Capacitorアプリにプッシュ通知を統合します。特定のサービスは必要ありませんが、事前にいくつかの設定が必要です。Firebaseは、Androidで必要とされ、データベースを使用せずに簡単に通知を送信できるため、優れた選択肢です。

<Steps>
  1. パッケージID（アプリの一意の識別子）を指定して、Capacitorが有効なIonicアプリを作成します。その後、アプリをビルドしてネイティブプラットフォームを追加します。
</Steps>

```bash
ionic start ionic-push-notifications blank --capacitor
cd ionic-push-notifications
npm install
```

既存のアプリがある場合は、**capacitor.config.json**を変更して**appId**を含めることができます。ただし、ネイティブフォルダーが既に存在する場合、Capacitorはフォルダーを一度だけ作成し、**IDを自動更新しない**ため、IDが表示されるすべてのファイルでIDを置き換える必要があります。**capacitor.config.json**では、バッジカウントの更新、プッシュ時のサウンド再生、通知到着時のアラート表示などのオプションも指定できます。

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

次に、アプリの外部でプッシュ通知を設定しましょう。

## Firebase設定

まず、[新しいFirebaseプロジェクトを作成](https://firebase.google.com/)するか、既存のプロジェクトを使用します。新しいプロジェクトの場合は、名前とデフォルトオプションを指定します。

新しいアプリの場合、アプリのダッシュボードに**「Firebaseをアプリに追加して始める」**が表示されます。そうでない場合は、歯車アイコンをクリックしてプロジェクト設定に移動し、アプリを追加します。

iOSとAndroid両方のダイアログは似ており、重要なのはアプリの**パッケージID**を使用することです。

<Steps>
  1. 正しいパッケージIDを入力します。
</Steps>

初期ステップの後、以下のファイルをダウンロードします：

- Android用の**google-services.json**ファイル
- iOS用の**GoogleService-Info.plist**ファイル

次に、プラットフォームを設定します。

### Androidプッシュ通知の準備

Androidの場合、ダウンロードした**google-services.json**ファイルを**android/app/**フォルダーに移動します。

<Steps>
  1. google-services.jsonファイルを移動します。
</Steps>

これでAndroidの設定は完了です。次にiOSを設定しましょう。

### iOSプッシュ通知の準備

この部分はより複雑です。まず、Apple Developerアカウントの[識別子リスト内でアプリのApp IDを作成](https://developer.apple.com/account/resources/identifiers/list/)します。リストから**プッシュ通知機能**を必ず選択してください。

![ionic-ios-push-id](/ionic-ios-push-id.webp)

**Bundle ID**は、CapacitorとFirebase内のApp IDと同じである必要があります。

次に、[Keyを作成](https://developer.apple.com/account/resources/authkeys/list/)し、**Apple Push Notifications service (APNs)**を有効にします。キーの最大数に達している場合は、既存のキーまたは証明書を使用できますが、プロセスはより複雑になります。

![ios-developer-push-key](/ios-developer-push-key.webp)

**p8**ファイルをダウンロードした後、Firebaseにアップロードします。Firebaseプロジェクト設定の**Cloud Messaging**タブを開き、ファイルをアップロードし、Key IDとiOSのTeam IDの詳細を入力します。

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

次に、以下を実行してXcodeプロジェクトを変更します：

```bash
npx cap open ios
```

Firebaseからダウンロードした**GoogleService-Info.plist**ファイルをiOSプロジェクトにコピーします。ファイルをXcodeプロジェクト内のapp/appフォルダーにドラッグし、**必要に応じてアイテムをコピー**を選択します。

次に、**ios/App/Podfile**にFirebase依存関係の新しいPodを追加します：

```ruby
pod 'Firebase/Messaging'
```

以下のコマンドでネイティブプラットフォームを更新します：

```bash
npx cap update ios
```

**ios/App/App/AppDelegate.swift**のネイティブSwiftコードを変更して、Firebaseに登録し、アプリに正しいトークンを返すようにします：

```swift
import UIKit
import Capacitor
import FirebaseCore
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, MessagingDelegate {
    
    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        
        Messaging.messaging().delegate = self
        UNUserNotificationCenter.current().delegate = self
        
        let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
        UNUserNotificationCenter.current().requestAuthorization(
            options: authOptions,
            completionHandler: { _, _ in }
        )
        
        application.registerForRemoteNotifications()
        
        return true
    }
    
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        Messaging.messaging().token { token, error in
            if let error = error {
                print("Error fetching FCM registration token: \(error)")
            } else if let token = token {
                print("FCM registration token: \(token)")
                NotificationCenter.default.post(
                    name: Notification.Name("FCMToken"),
                    object: nil,
                    userInfo: ["token": token]
                )
            }
        }
    }
}
```

最後に、Xcodeプロジェクトでプッシュ通知のCapabilityを追加します。

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

これでアプリをビルドし、プッシュ通知を統合できます。

## Ionicプッシュ通知の統合

Ionicプロジェクトでサービスと新しいページを作成します：

```bash
ionic g service services/fcm
ionic g page pages/notifications
```

**app/app-routing.module**のルーティングを更新します