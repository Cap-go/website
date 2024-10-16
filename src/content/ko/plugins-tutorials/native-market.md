---
published: true
locale: ko
---

# @capgo/native-market 패키지 튜토리얼

`@capgo/native-market` 패키지는 네이티브 시장을 위한 Capacitor 커뮤니티 플러그인으로, Play Store 및 App Store와 상호 작용할 수 있습니다. 이 튜토리얼은 Capacitor 프로젝트에서 이 패키지를 설치하고 사용하는 방법을 안내합니다.

## 설치

`@capgo/native-market` 패키지를 설치하려면 터미널을 열고 패키지 관리자에 따라 다음 명령 중 하나를 실행하세요.

npm 사용:

```bash
npm install @capgo/native-market
```

원사 사용:

```bash
yarn add @capgo/native-market
```

설치 후 다음 명령을 실행하여 기본 파일을 동기화하십시오.

```bash
npx cap sync
```

iOS에서는 추가 조치가 필요하지 않습니다.

Android에서는 추가 조치가 필요하지 않습니다.

## 용법

`@capgo/native-market` 패키지는 기본 시장과 상호 작용하는 데 사용할 수 있는 여러 가지 지원 방법을 제공합니다. 다음은 각 방법을 사용하는 방법에 대한 예입니다.

```typescript
import { NativeMarket } from '@capgo/native-market';

// Open store listing
NativeMarket.openStoreListing({
  appId: 'com.example.app',
  country: 'IT',
});

// Open developer page
NativeMarket.openDevPage({
  devId: '5700313618786177705',
});

// Open collection
NativeMarket.openCollection({
  name: 'featured',
});

// Open editor's choice page
NativeMarket.openEditorChoicePage({
  editorChoice: 'editorial_fitness_apps_us',
});

// Perform search
NativeMarket.search({
  terms: 'capacitor',
});
```

각 메소드는 수행하려는 작업에 따라 서로 다른 입력 매개변수를 사용합니다. 필수 매개변수에 대한 자세한 내용은 메소드 문서를 참조하세요.

그게 다야! 이제 Capacitor 프로젝트에 `@capgo/native-market` 패키지를 성공적으로 설치하고 사용했습니다. 더 많은 기능을 자유롭게 탐색하고 필요에 따라 사용자 정의하세요.

***

튜토리얼을 완료한 것을 축하합니다! 더 궁금한 점이 있거나 도움이 필요하시면 언제든지 문의해 주세요.