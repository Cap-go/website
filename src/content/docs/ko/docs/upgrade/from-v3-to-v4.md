---
title: Dari V3 ke V4
description: V3에서 V4로 업데이트하는 방법
sidebar:
  order: 3
locale: ko
---

## 업그레이드 이유

디스코드 커뮤니티에서 여러분과 많은 대화를 나눈 후, 수동 모드가 너무 수동적이고 사용하기에 안전하지 않다는 것을 발견했습니다. 예를 들어, 자동 복원이 불가능했기 때문에 수동 업데이트에 실패하면 사용자가 앱을 제거하고 다시 설치해야 했는데, 이는 끔찍한 UX였습니다

한편, 이를 기회로 삼아 여러분에게 더 많은 자유를 제공하고 제가 만든 나쁜 코드를 모두 제거했습니다

## 설치

`npm i @capgo/capacitor-updater@4`

## 클라우드 자동 업데이트

앱에서 기본 예제를 사용하는 경우 새 버전으로 안전하게 마이그레이션할 수 있으니 즐기세요!

## 자체 호스팅 자동 업데이트

여러분에게는 여전히 간단합니다. 변경사항은 다음과 같습니다:

* 설정 이름이 `autoUpdateUrl`에서 `updateUrl`로 변경
* 엔드포인트 메서드가 `GET`에서 `POST`로 변경

## 수동 사용자

여러분에게는 가장 큰 변화지만, 최상의 변화입니다! 많은 개선사항을 얻게 됩니다. 주의 깊게 읽어주세요

## 변경사항

* `autoUpdateUrl`이 `updateUrl`로 변경됨 (이제 수동 모드에서도 사용 가능)
* `cancelDelay`와 `delayUpdate`가 `setDelay`로 대체됨
* set에서 `versionName` 삭제
* 대부분의 함수에서 반환되던 `version` 키가 `BundleInfo` 객체로 변경

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* 오해의 소지가 있는 이름들을 이제 변경 (설명으로는 명확하지 않을 수 있지만, 사용 시에는 새로운 이름을 이해하기 쉬움):
  * `version`이라고 불렸던 것은 이제 `bundle`을 지칭
  * `id`는 10자리 랜덤 문자열이었던 이전의 `version`을 지칭, 이 `id`는 번들에 접근할 수 있는 유일하고 신뢰할 수 있는 방법입니다, 예: `7Dfcd2RedN`
  * `version`은 이제 번들에 대해 선택한 `versionName`을 지칭, 예: `100`
* `updateUrl`이 `get`에서 `post`로 변경, 일부 사용자에게 커스텀 헤더가 문제가 되었고 post가 더 논리적이기 때문에, 이전의 모든 헤더는 body로 이동하고 `cap_` 접두사는 사라짐
* `versionName` 메서드가 삭제되고 `getId`로 대체
* list가 이제 `BundleInfo` 목록을 반환
* `getId`가 `getDeviceId`로 변경
* `autoUpdate`가 기본값으로 true가 됨, 수동 모드를 사용하는 경우 false로 설정

## 새로운 기능

* `getLatest` 메서드, `updateUrl`로 설정된 서버에서 사용 가능한 최신 버전을 가져올 수 있는 메서드
* `setDelay` 메서드, `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}`를 인수로 받아 다양한 모드에 대한 지연을 설정
* `next` 메서드, 즉시 실행되는 `set`과 반대로 다음 백그라운드 전환 시 버전을 설정
* `isAutoUpdateEnabled` 메서드, 자동 업데이트 컨텍스트인지 확인
* `downloadComplete` 이벤트, 다운로드가 100% 완료되었을 때
* download 메서드에 필수 필드 `version` 추가
* `notifyAppReady`가 수동 모드에서도 필수가 됨, 10초 후에 호출되지 않으면 이전 버전으로 복원

## 기여자

[@lincolnthree](https://githubcom/lincolnthree/) 이 작업을 시작해주셔서 정말 감사합니다. 여러분의 도움 없이는 이 업데이트를 완성할 수 없었을 것입니다