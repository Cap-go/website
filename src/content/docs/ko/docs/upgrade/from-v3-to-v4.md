---
title: V3에서 V4로
description: V3에서 V4로 업그레이드하는 방법
sidebar:
  order: 3
locale: ko
---

## 업그레이드가 필요한 이유

Discord 커뮤니티에서 여러분과 대화를 나누면서 수동 모드가 너무 수동적이고 사용하기에 안전하지 않다는 것을 발견했습니다. 예를 들어, 자동 복구가 불가능했기 때문에 수동 업데이트에 실패하면 사용자가 앱을 제거하고 다시 설치해야 했는데, 이는 매우 좋지 않은 사용자 경험이었습니다.

한편, 이를 기회로 삼아 여러분에게 더 많은 자유를 제공하고 제가 만든 모든 나쁜 코드를 제거하게 되었습니다.

## 설치

`npm i @capgo/capacitor-updater@4`

## 클라우드 자동 업데이트

앱에서 기본 예제를 사용하고 있다면, 새 버전으로 안전하게 마이그레이션할 수 있습니다. 즐기세요!

## 자체 호스팅 자동 업데이트

여러분에게는 여전히 간단합니다. 변경 사항은 다음과 같습니다:

* `autoUpdateUrl` 설정의 이름이 `updateUrl`로 변경
* 엔드포인트 메서드가 `GET`에서 `POST`로 변경

## 수동 사용자

여러분에게는 가장 큰 변화이지만, 더 나은 방향입니다! 수많은 개선 사항을 얻게 되었습니다. 주의 깊게 읽어보세요.

## 변경 사항

* `autoUpdateUrl`이 `updateUrl`로 변경되었습니다. 이제 이 설정은 수동 모드에서도 사용할 수 있습니다
* `cancelDelay`와 `delayUpdate`가 삭제되고 `setDelay`로 대체되었습니다
* set에서 더 이상 `versionName`을 사용하지 않습니다
* 대부분의 함수에서 반환되던 `version` 키가 `BundleInfo` 객체로 변경되었습니다

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* 혼란스러운 이름들이 이제 변경되었습니다 (설명하기는 어렵지만 실제 사용할 때는 새로운 이름을 쉽게 이해할 수 있습니다):
  * `version`이라고 불리던 것은 이제 `bundle`을 지칭합니다
  * `id`는 10자리 무작위 문자열이었던 이전의 `version`을 의미합니다. 이 `id`는 번들에 접근하는 유일하고 신뢰할 수 있는 방법입니다. 예: `7Dfcd2RedN`
  * `version`은 이제 번들을 위해 선택한 `versionName`을 의미합니다. 예: `100`
* `updateUrl`이 `get`에서 `post`로 변경되었습니다. 일부 사용자에게 사용자 정의 헤더가 문제가 되었고 post가 더 논리적이기 때문입니다. 이전의 모든 헤더는 본문으로 이동하고 `cap_` 접두사는 사라집니다
* `versionName` 메서드가 삭제되고 `getId`로 대체되었습니다
* list는 이제 `BundleInfo` 목록을 반환합니다
* `getId`가 `getDeviceId`로 변경되었습니다
* `autoUpdate`가 기본적으로 true가 됩니다. 수동 모드를 사용한다면 false로 설정하세요

## 새로운 기능

* `getLatest` 메서드: 이 메서드를 통해 `updateUrl`로 설정된 서버에서 사용 가능한 최신 버전을 가져올 수 있습니다
* `setDelay` 메서드: `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}`를 인자로 받아 다양한 모드에 대한 지연을 설정합니다
* `next` 메서드: 즉시 실행되는 `set`과 달리 다음 백그라운드 전환 시 버전을 설정합니다
* `isAutoUpdateEnabled` 메서드: 자동 업데이트 컨텍스트인지 확인할 수 있습니다
* `downloadComplete` 이벤트: 다운로드가 100%에 도달했을 때 발생합니다
* download 메서드에 필수 필드 `version` 추가
* `notifyAppReady`가 수동 모드에서도 필수가 되었습니다. 10초 안에 호출하지 않으면 앱이 이전 버전으로 되돌아갑니다

## 기여자

[@lincolnthree](https://github.com/lincolnthree/) 이 작업을 시작해주셔서 정말 감사합니다. 여러분의 도움 없이는 이 업데이트를 완성하는 것이 불가능했을 것입니다.
