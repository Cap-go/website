---
locale: ko
---

@capgo/native-audio 패키지를 노래하세요

이 튜토리얼은 Capacitor 애플리케이션에서 사운드를 재생하기 위해 `@capgo/native-audio` 패키지를 사용하는 방법을 안내합니다.

## 1단계: 설치

패키지를 설치하려면 터미널을 열고 다음 명령을 실행하십시오.

```bash
npm install @capgo/native-audio
```

또는 원사 사용을 선호하는 경우:

```bash
yarn add @capgo/native-audio
```

## 2단계: 네이티브 파일 동기화

패키지를 설치한 후 다음 명령을 사용하여 기본 파일을 동기화합니다.

```bash
npx cap sync
```

## 3단계: 구성

이 플러그인에는 추가 구성이 필요하지 않습니다

## 4단계: 사용법

`@capgo/native-audio` 패키지를 사용하려면 패키지에서 `NativeAudio` 개체를 가져와 해당 메서드를 사용해야 합니다.

다음은 오디오 파일을 미리 로드하고 재생하는 방법에 대한 예입니다.

```typescript
import { NativeAudio } from '@capgo/native-audio';

// Preload the audio file
NativeAudio.preload({
  assetId: 'fire',
  assetPath: 'assets/sounds/fire.mp3',
  audioChannelNum: 1,
  isUrl: false,
});

// Play the loaded audio file
NativeAudio.play({
  assetId: 'fire',
});
```

`preload` 메소드는 오디오 파일을 메모리에 로드하는 데 사용되며 `play` 메소드는 로드된 오디오 파일을 재생하는 데 사용됩니다.

지원되는 다른 방법으로는 `pause`, `resume`, `loop`, `stop`, `unload`, `setVolume`, `getDuration` 및 `getCurrentTime`이 있습니다. [공식 문서](https:// 이러한 방법에 대한 자세한 내용은 githubcom/Cap-go/native-audio/blob/main/READMEmd/)를 참조하세요.

그게 다야! 이제 `@capgo/native-audio` 패키지를 사용하여 Capacitor 애플리케이션에서 사운드를 재생하는 방법을 배웠습니다.