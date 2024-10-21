---
slug: ionic-capacitor-push-notifications-firebase
title: 'Firebaseプッシュ通知Ionicキャパシタ: ステップバイステップガイド'
description: >-
  Firebaseを使用して、Ionic
  Capacitorアプリにプッシュ通知を統合する方法を見つけてください。AndroidとiOSプラットフォームのためのステップバイステップガイド付きです。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Firebaseを使ったIonic Capacitorのプッシュ通知
tag: tutorial
published: true
locale: ja
next_blog: ''
---

このチュートリアルでは、Firebaseを使用してIonic Capacitorアプリにプッシュ通知を統合します。このために特定のサービスは必要ありませんが、いくつかの設定を事前に行う必要があります。FirebaseはAndroidに必要なため優れた選択肢であり、データベースを使用せずにリモート通知を簡単に送信できます。

まず、Capacitorが有効なIonicアプリを作成し、アプリの一意の識別子である**パッケージID**を指定します。その後、アプリをビルドし、ネイティブプラットフォームを追加します。

すでにアプリがある場合は、**capacitorconfigjson**を変更して**appId**を含めることができます。ただし、ネイティブフォルダーがすでに存在する場合は、Capacitorが一度だけフォルダーを作成し、**ID自体は自動更新しないため**、表示されるすべてのファイルでIDを置き換える必要があります。**capacitorconfigjson**では、バッジカウントの更新、プッシュ時の音の再生、通知が届いたときのアラートの表示などのオプションも指定できます。

次に、アプリの外部でプッシュ通知を設定します。

## Firebase設定

[新しいFirebaseプロジェクトを作成する](https://firebasegooglecom/)か、既存のプロジェクトを使用します。新しいプロジェクトのために名前とデフォルトオプションを提供します。

新しいアプリを持っている場合、アプリのダッシュボードに**「Firebaseをアプリに追加して始める」**というメッセージが表示されるはずです。それ以外の場合は、歯車アイコンをクリックして**プロジェクト設定**に移動し、アプリを追加します。

iOSおよびAndroidのダイアログは似ており、重要なのはアプリの**パッケージID**を使用することです。

初期手順の後、以下のファイルをダウンロードします：

- Android用の**google-servicesjson**ファイル
- iOS用の**GoogleService-infoplist**ファイル

次に、プラットフォームを設定します。

### Androidプッシュの準備

Androidの場合、ダウンロードした**google-servicesjson**ファイルを**android/app/**フォルダーに移動します。

これでAndroidの設定は完了です。次にiOSの設定を行います。

### iOSプッシュの準備

この部分はもう少し複雑です。まず、Apple Developerアカウントの識別子リスト内でアプリ用のApp IDを[作成します](https://developerapplecom/account/resources/identifiers/list/)。リストから**プッシュ通知機能**を選択してください。

**バンドルID**は、CapacitorおよびFirebase内のApp IDと同じである必要があります。

次に、[キーを作成します](https://developerapplecom/account/resources/authkeys/list/)。**Apple Push Notificationsサービス（APNs）**を有効にします。最大数のキーに達している場合は、既存のキーまたは証明書を代わりに使用できますが、その手続きは複雑です。

**p8**ファイルをダウンロードしたら、それをFirebaseにアップロードします。Firebaseプロジェクト設定の**Cloud Messaging**タブを開き、ファイルをアップロードし、Key IDとiOSのTeam IDの詳細を入力します。

次に、以下のコマンドを実行してXcodeプロジェクトに変更を加えます：

Firebaseからダウンロードした**GoogleService-Infoplist**ファイルをiOSプロジェクトにコピーします。そのファイルをアプリ/appフォルダー内のXcodeプロジェクトにドラッグし、**必要に応じてアイテムをコピーする**を選択します。

次に、**ios/App/Podfile**にFirebase依存関係の新しいPodを追加します：

ネイティブプラットフォームをこのコマンドで更新します：

**ios/App/App/AppDelegateswift**内のネイティブSwiftコードを変更してFirebaseに登録し、アプリに正しいトークンを返すようにします。

最後に、Xcodeプロジェクト内でプッシュ通知の機能を追加します。

これでアプリがビルドされ、プッシュ通知が統合されます。

## Ionicプッシュ通知の統合

Ionicプロジェクトにサービスと新しいページを作成します：

**app/app-routingmodule**のルーティングを更新します。新しいページを動的IDで含めるための**ts**：

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

**services/fcmservicets**でプッシュ通知を扱うサービスを作成します：

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

**app/appcomponentts**で`initPush()`関数を呼び出します：

```bash
npx cap open ios
```

**pages/details/detailspagets**の詳細ページで情報を処理します：

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

**pages/details/detailspagehtml**で詳細を表示します：

```bash
npx cap update ios
```

アプリをビルドし、変更を同期し、デバイスにデプロイします

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

これで、Firebaseを使用してプッシュ通知を送信できます

## Firebaseを使用したプッシュ通知の送信

Firebaseを使用してプッシュ通知を送信する方法はいくつかあります

### 特定のデバイステスト

アプリをデバイスにデプロイした後、コンソールログを確認して、登録後のトークンを確認できます。このトークンを使用して、統合が機能していることを確認するためにターゲットテストプッシュを送信します。Firebaseで**Cloud Messaging**に移動し、**テストメッセージを送信**を選択します。ログからデバイストークンを追加します。

![firebase-test-push](/firebase-test-pushwebp)

すべてが正しく設定されていれば、デバイスにプッシュ通知が表示されます。

### ペイロード付きプッシュメッセージ

追加情報を含むプッシュ通知をテストするには、同じページのウィザードに従って一般的な情報を指定し、ターゲットとするプラットフォームを選択します。プッシュ通知にペイロードを送信するための**追加オプション**を加えます。

![firebase-push-payload](/firebase-push-payloadwebp)

**高度なオプション**セクションで、**カスタムデータ**のキーと値のペアを追加します。たとえば、`detailsId`というキーと自分の選択した値を使用できます。このデータは、アプリ内で指定されたIDを持つ詳細ページに移動するために使用されます。

プッシュ通知を送信した後、アプリは通知を受け取り、通知がタップされたときに指定されたIDで詳細ページを表示する必要があります。

### Firebase APIの使用

Firebase APIを使用してプッシュ通知をプログラムで送信することもできます。このためには、**Cloud Messaging**タブの下にあるFirebaseプロジェクト設定から**サーバーキー**を取得する必要があります。

サーバーキーを使用して、必要なペイロードを含むPOSTリクエストをFirebase APIに送信できます。以下は、Node.jsと`request`ライブラリを使用した例です：

```bash
ionic g service services/fcm
ionic g page pages/details
```

`YOUR_SERVER_KEY`と`YOUR_DEVICE_TOKEN`を実際のサーバーキーとデバイストークンに置き換えます。スクリプトを実行すると、デバイスはカスタムペイロード付きのプッシュ通知を受信するはずです。

これで完了です！Firebaseを使用してIonic Capacitorアプリにプッシュ通知を正常に統合しました。これで、AndroidおよびiOSプラットフォームのユーザーにプッシュ通知を送信できます。