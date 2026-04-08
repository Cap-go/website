---
locale: ko
---

capgo/홈 지표

`@capgo/home-indicator` 패키지를 사용하면 Capacitor 앱에서 홈 버튼 표시기를 숨기거나 표시할 수 있습니다.

## 설치

패키지를 설치하려면 터미널에서 다음 명령을 실행하세요.

```bash
npm install @capgo/home-indicator
npx cap sync
```

## API

패키지는 다음과 같은 방법을 제공합니다.

### `숨기기()`

```typescript
hide() => Promise
```

홈 표시기 숨기기

**이후:** 001

### `쇼()`

```typescript
show() => Promise
```

홈 표시기 표시

**이후:** 001

### `isHidden()`

```typescript
isHidden() => Promise<{ hidden: boolean; }>
```

홈 인디케이터 상태 가져오기

**반품:** 약속<{ hidden: boolean; }>

**이후:** 001

## CSS 변수

`--safe-area-inset-bottom`을 사용하면 콘텐츠가 홈 표시기에 의해 숨겨지지 않는지 확인할 수 있습니다. 이 변수는 Android용 플러그인에 의해 주입됩니다. Android에서 실제 전체 화면 모드를 설정하는 경우 유용합니다.

사용 예:

```java
getWindow().setDecorFitsSystemWindows(false);
```

## 크레딧

이 플러그인은 원래 [Capgo](https://capgo.app/)가 [Kickcom](https://kickcom/)용으로 제작했습니다.

자세한 내용과 업데이트는 [Capgo](https://capgo.app/)에서 확인하세요.