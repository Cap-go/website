---
slug: ja__updating-from-capacitor-4-to-capacitor-5
title: 'Capacitor 4 から Capacitor 5 へのアップデート: ステップバイステップガイド'
description: Capacitor 4プロジェクトを最小限の変更でCapacitor 5にアップグレードする方法を学び、公式プラグインや必要なツールの更新も含まれます。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: コンデンサ4から5の更新イラスト
tag: Capacitor
published: true
locale: ja
next_blog: ''
---

前回のアップデートと比較して、Capacitor 4からCapacitor 5への移行は最小限の破壊的変更を伴います。このガイドでは、プロジェクトをCapacitor 5に更新するためのステップバイステップの指示と、公式プラグインの破壊的変更の一覧を提供します。

**注意**: Capacitor 5はNodeJS 16以上が必要です。Node 12はサポートが終了しており、Node 14は2023年4月30日にサポートが終了します。最新のLTSバージョンのNodeJSを使用することを推奨します。

1. プロジェクトにCapacitor CLIの`latest`バージョンをインストールします：

   ```
   npm i -D @capacitor/cli@latest
   ```

2. CLIが移行を処理するために次のコマンドを実行します：

   ```
   npx cap migrate
   ```

   移行手順のいずれかが実行できない場合、ターミナル出力に追加情報が提供されます。手動での移行手順は以下に示します。

3. VS Code拡張機能がインストールされている場合、拡張機能の推奨セクションを確認してプロジェクトをCapacitor 5に移行するオプションを見つけてください。

### Capacitor 4 iOSプロジェクトをCapacitor 5にアップグレードする

1. **Xcodeをアップグレード**: Capacitor 5はXcode 14.1以上が必要です。

2. **gitignoreを更新**: `gitignore`ファイルに以下の変更を加えます：

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **アセットを単一のアプリアイコンに更新**: Xcode 14は1024x1024の単一アプリアイコンをサポートしています。すべての不要なサイズを削除してAppIcon.appiconsetを整理してください。

### Capacitor 4 AndroidプロジェクトをCapacitor 5にアップグレードする

1. **Android Studioをアップグレード**: Capacitor 5は、Java JDK 17を必要とするGradle 8の使用に伴い、Android Studio Flamingo | 2022.1以上が必要です。Java 17はAndroid Studio Flamingoにバンドルされているため、追加のダウンロードは不要です。

2. **AGPアップグレードアシスタントを実行**: Android Studioは、Gradleに関連するアップデートとパッケージのビルドファイルへの移動を手助けします。開始するには、`ツール -> AGPアップグレードアシスタント`を実行します。

3. **Androidプロジェクト変数を更新**: `variables.gradle`ファイルで、値を以下の新しい最小値に更新します：

   ```
   minSdkVersion = 22
   compileSdkVersion = 33
   targetSdkVersion = 33
   androidxActivityVersion = '1.7.0'
   androidxAppCompatVersion = '1.6.1'
   androidxCoordinatorLayoutVersion = '1.2.0'
   androidxCoreVersion = '1.10.0'
   androidxFragmentVersion = '1.5.6'
   coreSplashScreenVersion = '1.0.0'
   androidxWebkitVersion = '1.6.1'
   junitVersion = '4.13.2'
   androidxJunitVersion = '1.1.5'
   androidxEspressoCoreVersion = '3.5.1'
   cordovaAndroidVersion = '10.1.1'
   ```

4. **Googleサービスを更新**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Gradleプラグインを8.0.0に更新**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Gradleラッパーを8.0.2に更新**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Jetifierを無効にする**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **パッケージを`build.gradle`に移動**:

   ```
   # AndroidManifest.xml
   <?xml version="1.0" encoding="utf-8"?>
   - <manifest xmlns:android="http://schemas.android.com/apk/res/android"
   -     package="[YOUR_PACKAGE_ID]">
   + <manifest xmlns:android="http://schemas.android.com/apk/res/android">
   ```

   ```
   # build.gradle
   android {
   +     namespace "[YOUR_PACKAGE_ID]"
         compileSdkVersion rootProject.ext.compileSdkVersion
   ```

9. **androidSchemeを更新**: Capacitor 6では、既存のアプリの`androidScheme`のデフォルト設定が`https`になります。これによりCapacitorアプリケーションがシステムの自動入力機能を使用できるようになります。この変更によるデータ損失を避けるために、現在のデフォルトが何であれ、今すぐスキームを`http`に設定してください。

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Kotlinバージョンを更新**: プロジェクトでKotlinを使用している場合、`kotlin_version`変数を`'1.8.20'`に更新します。

### プラグイン機能の変更

以下のプラグイン機能が変更または削除されました。コードをそれに合わせて更新してください：

- アクションシート
- ブラウザ
- カメラ
- デバイス
- ジオロケーション
- Google マップ
- ローカル通知
- プッシュ通知
- ステータスバー

### アクションシート

- `androidxMaterialVersion`変数を`1.8.0`に更新します。

### ブラウザ

- `androidxBrowserVersion`変数を`1.5.0`に更新します。

### カメラ

- Android 13用に、`AndroidManifest.xml`にメディア画像の読み取り権限を追加します（`<?xml version="1.0" encoding="utf-8"?>`）。
- `androidxMaterialVersion`変数を`1.8.0`に更新します。
- `androidxExifInterfaceVersion`変数を`1.3.6`に更新します。

### デバイス

- `DeviceId.uuid`を`DeviceId.identifier`に変更します。
- iOS 16以上では、`DeviceInfo.name`は適切な[権限](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/)を追加しない限り、一般的なデバイス名を返します。

### ジオロケーション

- `playServicesLocationVersion`を`21.0.1`に更新します。

### Google マップ

- 以下の変数を更新します：
  - `googleMapsPlayServicesVersion`を`18.1.0`に
  - `googleMapsUtilsVersion`を`3.4.0`に
  - `googleMapsKtxVersion`を`3.4.0`に
  - `googleMapsUtilsKtxVersion`を`3.4.0`に
  - `kotlinxCoroutinesVersion`を`1.6.4`に
  - `androidxCoreKTXVersion`を`1.1.0`に
  - `kotlin_version`を`1.8.20`に### ローカル通知

- Android 13では、SDK 33をターゲットにする際にローカル通知をスケジュールするために新しい実行時のパーミッションチェックが必要です。`checkPermissions()`および`requestPermissions()`をそれぞれ呼び出してください。

### プッシュ通知

- Android 13では、SDK 33をターゲットにする際にプッシュ通知を受信するために新しい実行時のパーミッションチェックが必要です。`checkPermissions()`および`requestPermissions()`をそれぞれ呼び出してください。
- `firebaseMessagingVersion`変数を`2312`に更新してください。

### ステータスバー

- iOSでは、デフォルトのステータスバーアニメーションが`FADE`に変更されました。

これらの手順に従い、コードを適切に更新することで、プロジェクトをCapacitor 4からCapacitor 5へ成功裏に更新できます。すべての機能とプラグインが期待通りに動作することを確認するために、アプリケーションを十分にテストしてください。