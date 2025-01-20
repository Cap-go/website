---
locale: ko
---

capgo/capacitor-uploader 튜토리얼

이 튜토리얼은 `@capgo/capacitor-uploader` 패키지를 사용하여 Ionic Capacitor 앱에서 기본적으로 파일을 업로드하는 과정을 안내합니다.

## 전제 조건

시작하기 전에 다음이 설치되어 있는지 확인하십시오.

- Nodejs
- npm
- 이온콘덴서 프로젝트

## 설치

1 터미널이나 명령 프롬프트를 열고 프로젝트 디렉터리로 이동합니다.

2 다음 명령을 실행하여 패키지를 설치합니다.

```bash
npm install @capgo/capacitor-uploader
```

3 설치 후 Capacitor 프로젝트를 동기화합니다.

```bash
npx cap sync
```

## 구성

### 안드로이드 구성

Android의 경우 `AndroidManifestxml` 파일에 일부 권한을 추가해야 합니다. `android/app/src/main/AndroidManifestxml`에 있는 파일을 열고 `<manifest>` 태그 내에 다음 권한을 추가합니다.

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## 용법

이제 패키지를 설치하고 구성했으므로 앱에서 이를 사용하는 방법을 살펴보겠습니다.

### 업로더 가져오기

먼저 TypeScript 파일에서 업로더를 가져옵니다.

```typescript
import { Uploader } from '@capgo/capacitor-uploader';
```

### S3에 업로드 중

다음은 미리 서명된 URL을 사용하여 S3에 파일을 업로드하는 방법의 예입니다.

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

### 사용자 정의 서버에 업로드

다음은 사용자 정의 서버에 파일을 업로드하는 방법에 대한 예입니다.

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

### 커패시터 카메라 미리보기와 함께 사용

Capacitor Camera Preview 플러그인을 사용하는 경우 이를 업로더와 결합하여 비디오를 캡처하고 업로드할 수 있습니다. 예는 다음과 같습니다.

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

## 결론

이제 `@capgo/capacitor-uploader` 패키지를 사용하여 Ionic Capacitor 앱에서 기본적으로 파일을 업로드하는 방법을 배웠습니다. 이 플러그인은 미리 서명된 URL이 있는 S3를 포함하여 다양한 서버에 파일을 업로드하는 유연한 방법을 제공하며 사용할 수 있습니다. Capacitor Camera Preview와 같은 다른 플러그인과 함께 사용

오류를 적절하게 처리하고 업로드 이벤트를 관리하여 업로드 진행 상황 및 상태에 대한 피드백을 사용자에게 제공해야 합니다.

API 및 사용 가능한 옵션에 대한 자세한 내용은 패키지의 README 또는 설명서를 참조하세요.