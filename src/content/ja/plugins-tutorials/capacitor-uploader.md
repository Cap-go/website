---
locale: ja
---

capgo/capacitor-uploader チュートリアル

このチュートリアルでは、Ionic Capacitor アプリでネイティブにファイルをアップロードするために `@capgo/capacitor-uploader` パッケージを使用する手順を案内します。

## 前提条件

始める前に、以下がインストールされていることを確認してください：

- Nodejs
- npm
- Ionic Capacitor プロジェクト

## インストール

1. ターミナルまたはコマンドプロンプトを開き、プロジェクトディレクトリに移動します。

2. 次のコマンドを実行してパッケージをインストールします：

```bash
npm install @capgo/capacitor-uploader
```

3. インストール後、Capacitor プロジェクトを同期します：

```bash
npx cap sync
```

## 設定

### Android 設定

Android では、`AndroidManifest.xml` ファイルにいくつかのパーミッションを追加する必要があります。`android/app/src/main/AndroidManifest.xml` にあるファイルを開き、`<manifest>` タグ内に以下のパーミッションを追加します：

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## 使用方法

パッケージをインストールし設定したので、アプリでの使い方を見てみましょう。

### Uploader のインポート

最初に、TypeScript ファイルに Uploader をインポートします：

```typescript
import { Uploader } from '@capgo/capacitor-uploader';
```

### S3 へのアップロード

こちらは、プレサインド URL を使用してファイルを S3 にアップロードする方法の例です：

```typescript
async function uploadToS3(filePath: string, presignedUrl: string, fields: Record<string, string>) {
  try {
    const { id } = await Uploader.startUpload({
      filePath: filePath,
      serverUrl: presignedUrl,
      method: 'PUT',
      parameters: fields,
      notificationTitle: 'Uploading to S3'
    });

    console.log('Upload started with ID:', id);

    Uploader.addListener('events', (event: UploadEvent) => {
      if (event.name === 'uploading') {
        console.log(`Upload progress: ${event.payload.percent}%`);
      } else if (event.name === 'completed') {
        console.log('Upload completed successfully');
      } else if (event.name === 'failed') {
        console.error('Upload failed:', event.payload.error);
      }
    });

  } catch (error) {
    console.error('Failed to start upload:', error);
  }
}
```

### カスタムサーバーへのアップロード

こちらは、カスタムサーバーにファイルをアップロードする方法の例です：

```typescript
async function uploadToCustomServer(filePath: string, serverUrl: string) {
  try {
    const { id } = await Uploader.startUpload({
      filePath: filePath,
      serverUrl: serverUrl,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer your-auth-token-here'
      },
      parameters: {
        'user_id': '12345',
        'file_type': 'image'
      },
      notificationTitle: 'Uploading to Custom Server',
      maxRetries: 3
    });

    console.log('Upload started with ID:', id);

    Uploader.addListener('events', (event) => {
      switch (event.name) {
        case 'uploading':
          console.log(`Upload progress: ${event.payload.percent}%`);
          break;
        case 'completed':
          console.log('Upload completed successfully');
          console.log('Server response status code:', event.payload.statusCode);
          break;
        case 'failed':
          console.error('Upload failed:', event.payload.error);
          break;
      }
    });

  } catch (error) {
    console.error('Failed to start upload:', error);
  }
}
```

### Capacitor カメラプレビューとの併用

Capacitor カメラプレビュー プラグインを使用している場合、Uploader と組み合わせて動画をキャプチャしアップロードできます。こちらはその例です：

```typescript
import { CameraPreview } from '@capgo/camera-preview'
import { Uploader } from '@capgo/capacitor-uploader';

async function recordAndUpload() {
  try {
    await CameraPreview.startRecordVideo({ storeToFile: true });
    await new Promise(resolve => setTimeout(resolve, 5000)); // Record for 5 seconds
    const { videoFilePath } = await CameraPreview.stopRecordVideo();
    await uploadVideo(videoFilePath);
  } catch (error) {
    console.error('Error in recordAndUpload:', error);
  }
}

async function uploadVideo(filePath: string) {
  Uploader.addListener('events', (event) => {
    switch (event.name) {
      case 'uploading':
        console.log(`Upload progress: ${event.payload.percent}%`);
        break;
      case 'completed':
        console.log('Upload completed successfully');
        break;
      case 'failed':
        console.error('Upload failed:', event.payload.error);
        break;
    }
  });

  try {
    const result = await Uploader.startUpload({
      filePath,
      serverUrl: 'YOUR_S3_PRESIGNED_URL',
      method: 'PUT',
      headers: {
        'Content-Type': 'video/mp4',
      },
      mimeType: 'video/mp4',
    });
    console.log('Video uploaded successfully:', result.id);
  } catch (error) {
    console.error('Error uploading video:', error);
  }
}
```

## 結論

これで、Ionic Capacitor アプリでネイティブにファイルをアップロードするために `@capgo/capacitor-uploader` パッケージの使用方法を学びました。このプラグインは、プレサインド URL を使用して S3 などのさまざまなサーバーにファイルをアップロードする柔軟な方法を提供し、Capacitor カメラプレビューなどの他のプラグインと組み合わせて使用できます。

エラーを適切に処理し、アップロードイベントを管理して、ユーザーにアップロードの進捗状況とステータスに関するフィードバックを提供することを忘れないでください。

API と利用可能なオプションに関する詳細情報については、パッケージの README やドキュメントを参照してください。