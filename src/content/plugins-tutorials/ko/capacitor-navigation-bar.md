---
locale: ko
---

@capgo/capacitor-navigation-bar 노래 부르기

## 설치

`@capgo/capacitor-navigation-bar` 패키지를 사용하려면 먼저 다음 명령을 실행하여 설치해야 합니다.

```bash
npm install @capgo/capacitor-navigation-bar
npx cap sync
```

## 탐색 표시줄 색상 설정

'setNavigationBarColor' 함수를 사용하여 Android Lollipop 이상의 탐색 모음 색상을 설정할 수 있습니다. 다음은 사용 방법에 대한 예입니다.

```typescript
import { setNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

setNavigationBarColor({ color: '#FF0000' });
```

`color` 매개변수는 탐색 모음의 색상을 나타내는 문자열입니다.

## 탐색 표시줄 색상 가져오기

`getNavigationBarColor` 함수를 사용하여 현재 탐색 모음 색상을 가져올 수도 있습니다. 다음은 사용 방법에 대한 예입니다.

```typescript
import { getNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

const color = getNavigationBarColor();
console.log(color);
```

`color` 변수에는 현재 탐색 모음 색상이 포함됩니다.

그리고 그게 다야! 이제 `@capgo/capacitor-navigation-bar` 패키지를 사용하여 Android 앱에서 탐색 표시줄 색상을 설정하고 가져오는 방법을 알았습니다.