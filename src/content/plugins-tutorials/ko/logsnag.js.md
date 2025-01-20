---
locale: ko
---

@capgo/logsnag 패키지 노래 부르기

`@capgo/logsnag` 패키지는 알림을 받고 프로젝트 이벤트를 추적하는 강력한 도구입니다. 이 튜토리얼에서는 패키지 설치 및 사용 방법을 안내합니다.

## 설치

`@capgo/logsnag` 패키지를 설치하려면 터미널을 열고 다음 명령을 실행하세요.

```sh
npm install --save @capgo/logsnag
```

## 용법

### 라이브러리 가져오기

프로젝트에서 `@capgo/logsnag` 패키지를 사용하려면 이를 가져와야 합니다. JavaScript 파일 시작 부분에 다음 가져오기 문을 추가합니다.

```js
import { LogSnag } from '@capgo/logsnag';
```

### 클라이언트 초기화

`@capgo/logsnag` 기능을 사용하려면 먼저 클라이언트를 초기화해야 합니다. 다음 코드를 사용하여 클라이언트를 초기화하세요.

```js
const logsnag = new LogSnag({
  token: 'YOUR_API_TOKEN',
  project: 'YOUR_PROJECT_NAME'
});
```
`YOUR_API_TOKEN`을 실제 API 토큰으로 바꾸고 `YOUR_PROJECT_NAME`을 프로젝트 이름으로 바꿉니다.

### 게시 이벤트

`@capgo/logsnag`를 사용하여 이벤트를 게시하려면 `logsnag` 개체의 `publish` 메서드를 사용하세요. 다음은 이벤트를 게시하는 예제 코드 조각입니다.

```js
logsnag.publish({
  channel: "waitlist",
  event: "User Joined",
  icon: "🎉",
  tags: {
    name: "john doe",
    email: "john@example.com",
  },
  notify: true
});
```
특정 이벤트에 따라 속성 값을 사용자 정의합니다. 채널, 이벤트 이름, 아이콘, 태그 및 알림 여부를 지정할 수 있습니다.

### 인사이트 게시

이벤트 외에도 `@capgo/logsnag`를 사용하여 통찰력을 게시할 수도 있습니다. 통찰력은 프로젝트에 대한 귀중한 정보와 통계를 제공합니다. 다음은 통찰력을 게시하는 예제 코드 조각입니다.

```js
logsnag.insight({
  title: "User Count",
  value: "100",
  icon: "👨",
});
```
통찰력과 일치하도록 속성 값을 수정하십시오. 제목, 값 및 아이콘을 지정할 수 있습니다.

그게 다야! 이제 프로젝트에 `@capgo/logsnag` 패키지를 설치하고 사용하는 방법을 배웠습니다. 프로젝트 이벤트를 쉽게 추적하고 알림을 받아보세요!