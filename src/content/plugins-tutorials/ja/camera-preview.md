---
locale: ja
---

capgo/camera-preview パッケージ チュートリアル

このチュートリアルでは、`@capgo/camera-preview` パッケージを Capacitor プロジェクトで使用するための手順を説明します。このパッケージを使用すると、JavaScript および HTML コードからカメラと対話できます。

## インストール

`@capgo/camera-preview` パッケージをインストールするには、ターミナルを開き、次のいずれかのコマンドを実行します：

[[コードブロック]]

または

[[コードブロック]]

インストールが完了したら、次のコマンドを実行して Capacitor プロジェクトを同期します：

[[コードブロック]]

### Android の追加インストール手順

Android を使用している場合、プロジェクトにいくつかの追加変更を加える必要があります。`android/app/src/main/AndroidManifest.xml` ファイルを開き、`</application>` タグの直前に次の行を追加して CAMERA 権限をリクエストします：

[[コードブロック]]

詳細については、[Capacitor ドキュメント](https://capacitorjs.com/docs/android/configuration/#configuring-androidmanifestxml/)を参照してください。

### iOS の追加インストール手順

iOS を使用している場合は、`Infoplist` ファイルに 2 つの権限を追加する必要があります。[Capacitor ドキュメント](https://capacitorjs.com/docs/ios/configuration/#configuring-infoplist) に従って、`NSCameraUsageDescription` および `NSMicrophoneUsageDescription` 権限を追加します。`NSMicrophoneUsageDescription` 権限は、オーディオを使用する場合のみ必要です。オーディオが不要な場合は、`disableAudio` オプションを `true` に設定してマイクロフォン権限リクエストを無効にできます。

### Web の追加インストール手順

Ionic と一緒に Web プラットフォームを使用している場合は、`appmodulets` のエントリスクリプトに次の行を追加します：

[[コードブロック]]

これにより、Capacitor がプラグインから Web プラットフォームを登録できるようになります。

## API

`@capgo/camera-preview` パッケージは、次の API メソッドを提供します：

### start(options: CameraPreviewOptions)

カメラプレビューインスタンスを開始します。

### stop()

カメラプレビューインスタンスを停止します。

### capture(options: CameraPreviewPictureOptions)

カメラから写真を撮影します。

### captureSample(options: CameraSampleOptions)

サンプル画像を撮影します。

### getSupportedFlashModes()

サポートされているフラッシュモードを取得します。

### getHorizontalFov()

水平視野を取得します。

### setFlashMode(options: { flashMode: CameraPreviewFlashMode | string; })

フラッシュモードを設定します。

### flip()

カメラを反転します。

### setOpacity(options: CameraOpacityOptions)

カメラの不透明度を設定します。

### stopRecordVideo()

ビデオの録画を停止します。

### startRecordVideo(options: CameraPreviewOptions)

ビデオの録画を開始します。

これらのメソッドのパラメータおよび戻り値の詳細については、`@capgo/camera-preview` パッケージのドキュメントを参照してください。

## 結論

このチュートリアルでは、Capacitor プロジェクトで `@capgo/camera-preview` パッケージをインストールして使用する方法を学びました。利用可能な API メソッドとその使用法についても探求しました。これで、このパッケージを使用してアプリケーションにカメラ機能を統合できるようになりました。