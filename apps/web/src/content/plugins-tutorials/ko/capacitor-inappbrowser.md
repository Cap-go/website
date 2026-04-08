---
locale: ko
---

capgo/inappbrowser 패키지 튜토리얼

`@capgo/inappbrowser` 패키지는 인앱 브라우저 창에서 URL을 열 수 있게 해주는 Capacitor 플러그인입니다. 다음은 이 패키지를 사용하는 방법에 대한 단계별 가이드입니다.

## 설치

패키지를 설치하려면 프로젝트의 루트 디렉터리에서 다음 명령을 실행하세요.

```bash
npm install @capgo/inappbrowser
npx cap sync
```

## 용법

1 `@capgo/inappbrowser` 패키지에서 `InAppBrowser` 클래스를 가져옵니다.

   ```javascript
   import { InAppBrowser } from '@capgo/inappbrowser';
   ```

2 'InAppBrowseropen' 메서드를 사용하여 새 전체 화면 창에서 URL을 엽니다.

   ```javascript
   InAppBrowser.open("YOUR_URL");
   ```

   `"YOUR_URL"`을 열려는 URL로 바꾸세요.

3 `InAppBrowser` 클래스에서 제공하는 다른 메서드를 사용할 수도 있습니다.

   - `clearCookies`: 모든 쿠키 삭제
   - `close`: 인앱 브라우저 창을 닫습니다.
   - `openWebView`: 도구 모음을 사용하여 새 웹 보기에서 URL을 엽니다.
   - `setUrl`: 인앱 브라우저의 URL을 설정합니다.

   이러한 메서드에 대한 자세한 내용은 아래 API 섹션을 참조하세요.

## API

`@capgo/inappbrowser` 패키지는 다음과 같은 API 메소드를 제공합니다:

- `open(options: OpenOptions)`: 새 전체 화면 창에서 URL을 엽니다. `OpenOptions` 개체를 매개변수로 사용합니다.
- `clearCookies()`: 모든 쿠키 삭제
- `close()`: 인앱 브라우저 창을 닫습니다.
- `openWebView(options: OpenWebViewOptions)`: 도구 모음을 사용하여 새 웹 보기에서 URL을 엽니다. `OpenWebViewOptions` 개체를 매개변수로 사용합니다.
- `setUrl(options: { url: string; })`: 인앱 브라우저의 URL을 설정합니다. `url` 속성이 있는 객체를 매개변수로 사용합니다.
- `addListener('urlChangeEvent', ListenerFunc: UrlChangeListener)`: URL 변경 이벤트 수신 `UrlChangeListener` 함수를 매개변수로 사용
- `addListener('closeEvent', ListenerFunc: UrlChangeListener)`: 닫기 이벤트 수신 `UrlChangeListener` 함수를 매개변수로 사용
- `addListener('confirmBtnClicked', ListenerFunc: UrlChangeListener)`: 확인 버튼 클릭 이벤트 수신 `UrlChangeListener` 함수를 매개변수로 사용
- `removeAllListeners()`: 모든 이벤트 리스너 제거

이러한 메소드의 매개변수 및 반환 값에 대한 자세한 내용은 패키지 설명서를 참조하세요.

그리고 그게 다야! Capacitor의 인앱 브라우저 창에서 URL을 여는 `@capgo/inappbrowser` 패키지를 사용하는 방법을 배웠습니다. 즐거운 코딩 되세요!