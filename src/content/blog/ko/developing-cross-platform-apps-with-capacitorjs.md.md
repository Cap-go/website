---
slug: developing-cross-platform-apps-with-capacitorjs
title: 'CapacitorJS로 크로스 플랫폼 앱 개발하기: 단계별 가이드'
description: >-
  CapacitorJS를 사용하여 Android, iOS 및 웹(PWA)을 위한 단일 JavaScript 코드베이스로 크로스 플랫폼
  애플리케이션을 만드는 방법을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: 크로스 플랫폼 앱 개발
keywords: >-
  Capacitor, cross-platform, PWA, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Tuto
published: true
locale: ko
next_blog: ''
---
모바일 애플리케이션 개발의 진화하는 세계에서 Progressive Web Applications(PWA)의 부상은 새로운 크로스 플랫폼 런타임의 길을 열었습니다. 이러한 런타임은 네이티브 코드에만 의존하지 않고도 웹 기반 애플리케이션이 앱 스토어에 존재할 수 있게 해줍니다. 이를 가능하게 하는 기술 중 하나가 [**CapacitorJS**](https://capacitorjs.com/)입니다. 이를 통해 개발자는 단일 JavaScript 코드베이스를 사용하여 간단한 웹사이트를 Android, iOS 및 웹 전반에 걸쳐 애플리케이션으로 배포할 수 있습니다. 이 접근 방식은 개발 비용을 크게 줄이고 코딩 효율성을 높입니다.

이 가이드는 추가 프레임워크 없이 순수 JavaScript를 사용하여 애플리케이션을 만드는 데 초점을 맞출 것입니다. 2021년에 순수 JavaScript 앱 개발을 위한 리소스를 찾기 어려운 점이 있지만, CapacitorJS를 사용하여 애플리케이션을 구축하고 네이티브 플러그인을 활용하는 방법에 대한 포괄적인 튜토리얼을 제공해드리겠습니다.

## ‣ 사전 요구사항

시작하기 전에 다음 도구들이 설치되어 있는지 확인하세요:

- [**Node.js**](https://nodejs.org/en/) **(v14.16.1)** 이상
- **NPM (v7.6.2)** 이상
- Android 앱 개발을 위한 [**Android Studio**](https://developer.android.com/studio/)
- iOS 앱 개발을 위한 [**Xcode**](https://apps.apple.com/de/app/xcode/id497799835/?mt=12) (macOS 전용)

> **참고**: iOS 앱 개발은 macOS 기기에서만 가능합니다.

## ‣ Capacitor 프로젝트 설정하기

Capacitor 애플리케이션을 생성하려면 원하는 폴더로 이동하여 터미널에서 다음 명령을 실행하세요:

```
npm init @capacitor/app
```

패키지를 설치하고 프로젝트를 설정하기 위한 프롬프트를 따르세요. Capacitor v3에서 프로젝트 디렉토리는 다음과 같이 보일 것입니다:

```
www/
  css/
    style.css
  js/
    capacitor-welcome.js
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
```

초기 설정이 완료되면 다음 단계로 진행할 준비가 된 것입니다.

## ‣ 프로젝트 구조 재구성

JavaScript 파일을 번들링하기 위해 Vite를 사용할 것이므로, 그에 맞게 프로젝트를 재구성해보겠습니다:

- 메인 디렉토리에 새로운 `src` 폴더를 **생성**하세요.
- `src/`에 새로운 스크립트 파일 `index.js`를 **생성**하세요.
- 메인 디렉토리에 Vite 설정 파일 `vite.config.js`를 **생성**하세요.
- `www/js/`에서 `capacitor-welcome.js` 파일을 **제거**하세요.

새로운 폴더 구조는 다음과 같아야 합니다:

```
src/
  index.js
www/
  css/
    style.css
  js/
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
vite.config.js
```

## ‣ 순수 JavaScript로 적용하기

순수 JavaScript로 작동하도록 일부 파일을 수정해보겠습니다:

## www/index.html

1. 앱을 PWA로 출시하지 않는다면 [**Ionic PWA Elements**](https://capacitorjs.com/docs/web/pwa-elements/) 스크립트 임포트를 제거하세요:

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2. body에서 `<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">` HTML 요소를 삭제하세요.

3. 스크립트 임포트를 `capacitor.js`에서 `js/main.js`로 업데이트하세요. 이것이 우리의 번들링된 JavaScript 파일이 될 것입니다.

4. `js/capacitor-welcome.js` 임포트를 제거하세요. 이제 `index.html`이 준비되었습니다.

## vite.config.js

[**Vite**](https://vitejs.dev/)로 Node.js 모듈을 번들링하기 위해서는 번들링된 스크립트의 출력 대상을 지정하는 설정 파일이 필요합니다. 다음 구성은 `src/index.js` 파일을 가져와서 `www/js/main.js`로 프로덕션용으로 번들링할 것입니다:

```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'www'),
    rollupOptions: {
      input: './src/index.js',
      output: {
        format: 'es',
        file: path.resolve(__dirname, 'www/js/main.js')
      }
    }
  }
});
```

## capacitor.config.json

`capacitor.config.json` 파일에서 `"bundledWebRuntime": true` 속성을 찾아 `false`로 변경하세요. 이 조정을 통해 Capacitor가 파일을 번들링하지 않고 대신 Vite를 사용할 수 있게 됩니다.

이러한 변경사항으로 Capacitor 애플리케이션의 기본 설정이 완료되었으며, 이제 순수 JavaScript로 앱 개발을 시작할 준비가 되었습니다.

## ‣ 앱 개발하기

이제 기반 작업이 완료되었으므로 `src/index.js` 파일에서 애플리케이션 로직을 작성할 수 있습니다. 여기서 필요한 Node.js 모듈을 임포트하고, 앱의 기능을 정의하고, Capacitor의 네이티브 플러그인과 상호작용할 수 있습니다.

변경사항이 있을 때마다 Vite의 빌드 명령을 실행하여 JavaScript 파일을 번들링하는 것을 잊지 마세요:

```bash
vite build
```

이 명령은 `www/js` 디렉토리에 `main.js` 파일을 생성할 것이며, 이는 `index.html` 파일에서 참조될 것입니다.

## ‣ 테스트 및 디버깅

Capacitor는 다양한 플랫폼에서 애플리케이션을 테스트할 수 있는 편리한 방법을 제공합니다. 다음 명령을 사용하여 각각의 플랫폼 개발 환경에서 앱을 열 수 있습니다:

Android의 경우:
```bash
npx cap add android
npx cap open android
```

iOS의 경우 (macOS 전용):
```bash
npx cap add ios
npx cap open ios
```

Web/PWA의 경우:
```bash
npx cap serve
```

이러한 명령을 통해 Android Studio, Xcode 또는 웹 브라우저에서 애플리케이션을 실행할 수 있으며, 필요에 따라 테스트하고 디버깅할 수 있습니다.

## ‣ 결론

순수 JavaScript를 사용하여 CapacitorJS로 크로스 플랫폼 애플리케이션을 개발하는 것은 단일 코드베이스로 여러 플랫폼용 앱을 만드는 비용 효율적이고 효율적인 방법입니다. 이 가이드를 따라 프로젝트를 설정하고, Vite를 위해 재구성하고, 개발을 위한 앱을 준비했습니다. 이러한 기반으로, 견고하고 다재다능한 애플리케이션을 구축할 준비가 잘 되어있습니다.

모든 플랫폼에서 철저히 테스트하고 앱의 기능을 향상시키기 위해 Capacitor의 네이티브 플러그인을 활용하는 것을 잊지 마세요. 즐거운 코딩 되세요!
