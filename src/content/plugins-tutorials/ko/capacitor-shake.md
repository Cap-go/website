---
locale: ko
---

@capgo/capacitor-shake 노래 부르기

`@capgo/capacitor-shake` 패키지를 사용하면 기기에서 흔들기 동작을 감지할 수 있습니다. 다음은 Capacitor 앱에서 이 패키지를 사용하는 방법에 대한 튜토리얼입니다.

## 설치

패키지를 설치하려면 다음 명령을 실행하십시오.

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## 리스너 추가

흔들기 동작을 감지하려면 `shake` 이벤트에 대한 리스너를 추가해야 합니다. 다음은 이를 수행하는 방법의 예입니다.

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

이 예에서는 `@capacitor/core`에서 `CapacitorShake` 플러그인을 가져오고 `addListener` 메서드를 사용하여 `shake` 이벤트에 대한 리스너를 추가합니다. 흔들기 동작이 감지되면 콜백 함수가 실행됩니다.

## 리스너 제거

`shake` 이벤트 리스너를 제거하려면 `removeAllListeners` 메소드를 사용하면 됩니다.

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

이 예에서는 `removeAllListeners` 메소드를 사용하여 모든 `shake` 이벤트 리스너를 제거합니다.

그게 다야! Capacitor 앱에 `@capgo/capacitor-shake` 패키지를 성공적으로 통합했습니다. 이제 기기에서 흔들기 동작을 감지할 수 있습니다.