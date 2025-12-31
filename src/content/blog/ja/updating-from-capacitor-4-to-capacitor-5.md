---
slug: updating-from-capacitor-4-to-capacitor-5
title: Capacitor 4からCapacitor 5へのアップグレード：ステップバイステップガイド
description: Capacitor 4からCapacitor 5へ、必要なプラグインやツールの更新を含め、最小限の変更でプロジェクトをアップグレードする方法をご紹介します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Capacitor 4から5へのアップグレードの説明
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: ja
next_blog: ''
---
Capacitor 4からCapacitor 5への移行は、以前のアップデートと比較して、重大な変更は最小限です。このガイドでは、プロジェクトをCapacitor 5にアップデートするための手順と、公式プラグインの変更点を説明します。

**注意**: Capacitor 5はNodeJS 16以上が必要です。Node 12はすでにサポート終了しており、Node 14は2023年4月30日にサポート終了となります。NodeJSの最新LTSバージョンの使用を推奨します。

1. プロジェクトにCapacitor CLIの`latest`バージョンをインストールします：

   ```
   npm i -D @capacitor/cli@latest
   ```

2. 以下のコマンドを実行して、CLIに移行を処理させます：

   ```
   npx cap migrate
   ```

   移行手順が実行できない場合は、ターミナル出力に追加情報が表示されます。手動での移行手順は以下に記載されています。

3. VS Code拡張機能をインストールしている場合、拡張機能の推奨セクションでプロジェクトをCapacitor 5に移行するオプションを確認してください。

### Capacitor 4 iOSプロジェクトからCapacitor 5へのアップグレード

1. **Xcodeのアップグレード**: Capacitor 5にはXcode 14.1以上が必要です。

2. **.gitignoreの更新**: `.gitignore`ファイルに以下の変更を加えてください：

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **単一のアプリアイコンを使用するようにアセットを更新**: Xcode 14は1024x1024の単一アプリアイコンをサポートします。不要なサイズを削除してAppIcon.appiconsetをクリーンアップしてください。

### Capacitor 4 AndroidプロジェクトからCapacitor 5へのアップグレード

1. **Android Studioのアップグレード**: Capacitor 5はGradle 8の使用によりJava JDK 17が必要なため、Android Studio Flamingo | 2022.2.1以降が必要です。Java 17はAndroid Studio Flamingoに同梱されているため、追加のダウンロードは不要です。

2. **AGPアップグレードアシスタントの実行**: Android StudioはGradleに関連する更新とパッケージのビルドファイルへの移動を支援できます。開始するには、`Tools -> AGP Upgrade Assistant`を実行してください。

3. **Androidプロジェクト変数の更新**: `variables.gradle`ファイルで、以下の新しい最小値に更新してください：

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

4. **Google Servicesの更新**:

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

7. **Jetifierを無効化**:

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

9. **androidSchemeの更新**: Capacitor 6では、既存のアプリのシステムAutofill機能をより良く有効にするため、`androidScheme`のデフォルト設定が`https`になります。このデータ損失を避けるため、現在のデフォルトであっても、スキームを`http`に設定してください。

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Kotlinバージョンの更新**: プロジェクトでKotlinを使用している場合、`kotlin_version`変数を`'1.8.20'`に更新してください。

### プラグイン機能の変更

以下のプラグイン機能が変更または削除されました。コードを適切に更新してください：

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

- `androidxMaterialVersion`変数を`1.8.0`に更新してください。

### Browser

- `androidxBrowserVersion`変数を`1.5.0`に更新してください。

### Camera

- Android 13の場合、`AndroidManifest.xml`にメディア画像読み取り権限（`<?xml version="1.0" encoding="utf-8"?>`）を追加してください。
- `androidxMaterialVersion`変数を`1.8.0`に更新してください。
- `androidxExifInterfaceVersion`変数を`1.3.6`に更新してください。

### Device

- `DeviceId.uuid`を`DeviceId.identifier`に変更してください。
- iOS 16以降では、適切な[エンタイトルメント](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/)を追加しない限り、`DeviceInfo.name`は一般的なデバイス名を返します。

### Geolocation

- `playServicesLocationVersion`を`21.0.1`に更新してください。

### Google Maps

- 以下の変数を更新してください：
  - `googleMapsPlayServicesVersion`を`18.1.0`に
  - `googleMapsUtilsVersion`を`3.4.0`に
  - `googleMapsKtxVersion`を`3.4.0`に
  - `googleMapsUtilsKtxVersion`を`3.4.0`に
  - `kotlinxCoroutinesVersion`を`1.6.4`に
  - `androidxCoreKTXVersion`を`1.10.0`に
  - `kotlin_version`を`1.8.20`に

### Local Notifications

- Android 13でSDK 33をターゲットにする場合、ローカル通知をスケジュールするには新しいランタイム権限チェックが必要です。`checkPermissions()`と`requestPermissions()`を適切に呼び出してください。

### Push Notifications

- Android 13でSDK 33をターゲットにする場合、プッシュ通知を受信するには新しいランタイム権限チェックが必要です。`checkPermissions()`と`requestPermissions()`を適切に呼び出してください。
- `firebaseMessagingVersion`変数を`23.1.2`に更新してください。

### Status Bar

- iOSでは、デフォルトのステータスバーアニメーションが`FADE`に変更されました。

これらの手順に従いコードを更新することで、プロジェクトをCapacitor 4からCapacitor 5に正常にアップデートできるはずです。すべての機能とプラグインが期待通りに動作することを確認するため、アプリケーションを十分にテストしてください。
