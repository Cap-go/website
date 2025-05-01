---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  Membangun Aplikasi Mobile Native dengan Next.js 14 dan Capacitor: Panduan
  Langkah demi Langkah 2024
description: >-
  Temukan dalam panduan lengkap ini cara membuat aplikasi mobile native dengan
  Next.js 14 dan Capacitor. Pelajari praktik terbaik dan teknik terbaru untuk
  mengembangkan aplikasi mobile yang kuat dan kaya fitur.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14와 Capacitor 일러스트레이션
keywords: >-
  Next.js 14, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## 소개

이 튜토리얼에서는 2024년 [Nextjs](https://nextjsorg/) 14와 [Capacitor](https://capacitorjscom/)의 강력한 조합을 사용하여 네이티브 모바일 앱을 만드는 방법을 살펴보겠습니다. 이러한 최신 기술을 활용하여 고성능의 기능이 풍부한 모바일 애플리케이션을 쉽게 구축할 수 있습니다. 또한 [Konsta UI](https://konstauicom/)와 Tailwind CSS를 사용하여 모바일 UI를 향상시키는 방법도 보여드리겠습니다(선택 사항).

인기 있는 React 프레임워크인 Nextjs는 웹 애플리케이션 구축을 위한 견고한 기반을 제공하며, Capacitor를 사용하면 React Native와 같은 새로운 기술을 배우지 않고도 Nextjs 앱을 네이티브 모바일 앱으로 변환할 수 있습니다. 이 튜토리얼에서는 새로운 Nextjs 앱 설정부터 시작하여 Capacitor를 통합하여 네이티브 모바일 경험을 만드는 과정을 안내해 드리겠습니다.

### Nextjs와 Capacitor 사용의 이점

- **코드 재사용성**: Nextjs를 사용하면 재사용 가능한 컴포넌트를 작성하고 웹과 모바일 앱 간에 코드를 공유할 수 있어 개발 시간과 노력을 절약할 수 있습니다.
- **성능**: Nextjs는 서버 사이드 렌더링과 코드 분할과 같은 내장된 성능 최적화를 제공하여 빠른 로딩 시간과 부드러운 사용자 경험을 보장합니다.
- **네이티브 기능**: Capacitor는 카메라, 위치 정보 등 네이티브 디바이스 기능에 대한 접근을 제공하여 기능이 풍부한 모바일 앱을 구축할 수 있게 합니다.
- **단순화된 개발**: Capacitor를 사용하면 친숙한 웹 기술을 사용하여 모바일 앱을 개발하고 테스트할 수 있어 학습 곡선을 낮추고 개발 프로세스를 간소화할 수 있습니다.

## Nextjs 앱 준비하기

시작하려면 `create-next-app` 명령을 사용하여 새로운 Nextjs 애플리케이션을 만들어보겠습니다:

[[CODE_BLOCK]]

이 명령은 최신 버전에 대한 권장 구성으로 빈 Nextjs 프로젝트를 설정합니다.

다음으로, 프로젝트 디렉토리로 이동합니다:

[[CODE_BLOCK]]

네이티브 모바일 앱을 만들기 위해서는 Nextjs 프로젝트의 정적 내보내기를 생성해야 합니다. `package.json` 파일을 업데이트하여 프로젝트를 빌드하고 내보내기 위한 스크립트를 포함시킵니다:

[[CODE_BLOCK]]

`npm run static` 명령을 실행하면 이미지 최적화 비호환성으로 인해 오류가 발생할 수 있습니다. 이를 해결하기 위해 `next.config.js` 파일을 열고 다음과 같이 수정합니다:

[[CODE_BLOCK]]

이제 `npm run static`을 실행하면 오류 없이 작동하며, 프로젝트 루트에 새로운 `out` 폴더가 생성됩니다. 이 폴더는 다음 단계에서 Capacitor가 사용하게 됩니다.

## Nextjs 14 앱에 Capacitor 추가하기

Nextjs 앱을 네이티브 모바일 컨테이너로 패키징하려면 다음 단계를 따르세요:

1. [Capacitor CLI](https://capacitorjscom/docs/cli/)를 개발 의존성으로 설치합니다:

[[CODE_BLOCK]]

2. Nextjs 프로젝트에서 Capacitor를 초기화합니다:

[[CODE_BLOCK]]

초기화 과정에서 앱 이름과 번들 ID에 대한 기본값을 수락하려면 "Enter"를 누르면 됩니다.

3. 필요한 Capacitor 패키지를 설치합니다:

[[CODE_BLOCK]]

4. 네이티브 플랫폼을 추가합니다:

[[CODE_BLOCK]]

Capacitor는 프로젝트 루트에 각 플랫폼(`ios`와 `android`)에 대한 폴더를 생성합니다. 이 폴더들은 각각 iOS와 Android용 네이티브 프로젝트를 포함합니다.

Android 프로젝트에 접근하고 빌드하려면 [Android Studio](https://developerandroidcom/studio)가 설치되어 있어야 합니다. iOS 개발의 경우 [Xcode](https://developerapplecom/xcode/)가 설치된 Mac이 필요합니다.

5. Capacitor 구성:

`capacitor.config.ts` 파일을 열고 `webDir` 속성을 Nextjs 빌드의 출력 디렉토리를 가리키도록 업데이트합니다:

[[CODE_BLOCK]]

6. 프로젝트 빌드 및 동기화:

[[CODE_BLOCK]]

`npm run static` 명령은 Nextjs 프로젝트를 빌드하고 정적 파일을 내보내며, `npx cap sync`는 웹 코드를 네이티브 플랫폼과 동기화합니다.## 네이티브 앱 빌드 및 배포하기

네이티브 모바일 앱을 빌드하고 배포하려면 다음 단계를 따르세요:
iOS 앱을 개발하려면 **Xcode**가 설치되어 있어야 하고, Android 앱을 개발하려면 **Android Studio**가 설치되어 있어야 합니다. 또한 앱스토어에 앱을 배포하려면 iOS의 경우 Apple Developer Program에, Android의 경우 Google Play Console에 등록해야 합니다.

1. 네이티브 프로젝트 열기:

iOS의 경우:
[[CODE_BLOCK]]

Android의 경우:
[[CODE_BLOCK]]

2. 앱 빌드 및 실행:

![android-studio-run](/android-studio-runwebp)

- Android Studio에서 프로젝트가 준비될 때까지 기다린 다음 "실행" 버튼을 클릭하여 연결된 기기나 에뮬레이터에 앱을 배포합니다
![xcode-run](/xcode-runwebp)

- Xcode에서 실제 기기에 앱을 배포하기 위해 서명 계정을 설정합니다. 이전에 하지 않았다면 Xcode가 과정을 안내할 것입니다 (Apple Developer Program 등록이 필요합니다). 설정이 완료되면 "실행" 버튼을 클릭하여 연결된 기기에서 앱을 실행하세요

축하합니다! Nextjs 웹 앱을 모바일 기기에 성공적으로 배포했습니다.

[[HTML_TAG]]
  [[HTML_TAG]]
[[HTML_TAG]]
하지만 개발 중에는 더 빠른 방법이 있습니다.

## Capacitor 실시간 리로드

개발 중에는 실시간 리로딩을 활용하여 모바일 기기에서 즉시 변경사항을 확인할 수 있습니다. 이 기능을 활성화하려면 다음 단계를 따르세요:

1. 로컬 IP 주소 찾기:

- macOS에서는 터미널에서 다음 명령어를 실행하세요:
  [[CODE_BLOCK]]

- Windows에서는 다음을 실행하세요:
  [[CODE_BLOCK]]
  출력된 결과에서 IPv4 주소를 찾으세요

2. `capacitor.config.ts` 파일을 업데이트하여 서버 설정을 포함시키세요:

[[CODE_BLOCK]]

`YOUR_IP_ADDRESS`를 로컬 IP 주소로 교체하세요

3. 네이티브 프로젝트에 변경사항 적용하기:

[[CODE_BLOCK]]

`copy` 명령어는 전체 프로젝트를 업데이트하지 않고 웹 폴더와 설정 변경사항만 네이티브 프로젝트에 복사합니다

4. Android Studio나 Xcode를 사용하여 기기에서 앱을 다시 빌드하고 실행하세요

이제 Nextjs 앱을 변경할 때마다 모바일 앱이 자동으로 리로드되어 변경사항이 반영됩니다

참고: 새로운 플러그인을 설치하거나 네이티브 파일을 변경할 경우, 실시간 리로딩은 웹 코드 변경에만 적용되므로 네이티브 프로젝트를 다시 빌드해야 합니다

## Capacitor 플러그인 사용하기

Capacitor 플러그인을 사용하면 Nextjs 앱에서 네이티브 기기 기능에 접근할 수 있습니다. [Share 플러그인](https://capacitorjs.com/docs/apis/share/)을 예시로 살펴보겠습니다:

1. Share 플러그인 설치:

[[CODE_BLOCK]]

2. Share 플러그인을 사용하도록 `pages/index.js` 파일 업데이트:

[[CODE_BLOCK]]

3. 네이티브 프로젝트와 변경사항 동기화:

앞서 언급했듯이 새로운 플러그인을 설치할 때는 동기화 작업을 수행하고 앱을 기기에 다시 배포해야 합니다. 다음 명령어를 실행하세요:

[[CODE_BLOCK]]

4. 기기에서 앱을 다시 빌드하고 실행하세요

이제 "Share now!" 버튼을 클릭하면 네이티브 공유 대화상자가 나타나 다른 앱과 콘텐츠를 공유할 수 있습니다

[[HTML_TAG]]
  [[HTML_TAG]]
[[HTML_TAG]]

웹 앱용 제가 가장 좋아하는 UI 컴포넌트 라이브러리인 Nextjs를 사용하여 버튼을 더 모바일 친화적으로 만들 수 있습니다.

## Konsta UI 추가하기

저는 수년간 [Ionic](https://ionicframework.com/)으로 멋진 크로스 플랫폼 애플리케이션을 만들어왔고 그것은 수년간 최고의 선택 중 하나였습니다.
하지만 이제는 더 이상 추천하지 않습니다. Nextjs와 통합하기가 매우 까다롭고 이미 [tailwindcss](https://tailwindcss.com/)가 있을 때는 그다지 가치가 없습니다.

iOS와 Android 특유의 스타일링에 맞춰 정말 멋진 모바일 UI를 원한다면 Konsta UI를 추천합니다.

[tailwind가 이미 설치되어 있어야 합니다](https://tailwindcss.com/docs/guides/nextjs/)
Nextjs 앱의 모바일 UI를 개선하기 위해 [Konsta UI](https://konsta.ui.com/)를 사용할 수 있습니다. iOS와 Android 스타일링에 맞춰지는 모바일 친화적 UI 컴포넌트 라이브러리입니다. Konsta UI를 통합하려면 다음 단계를 따르세요:

1.