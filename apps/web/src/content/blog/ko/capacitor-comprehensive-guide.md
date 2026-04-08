---
slug: capacitor-comprehensive-guide
title: 'Capacitor: 종합 안내서'
description: >-
  CapacitorJS는 웹 개발자가 단일 표준 웹 코드베이스로 iOS, Android, 데스크탑 및 진보적 웹 앱을 구축할 수 있도록 해주는
  강력한 도구입니다. 이 포괄적인 가이드를 통해 Capacitor에 대해 알아야 할 모든 것을 배워보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-10T00:00:00.000Z
updated_at: 2023-06-10T00:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: Capacitor 가이드 일러스트
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Guides
published: true
locale: ko
next_blog: ''
---
[Capacitor](https://capacitorjs.com/)는 웹 개발자가 단일 표준 웹 코드베이스를 사용하여 네이티브 iOS, Android, Desktop 및 Progressive Web App을 만들 수 있도록 해주는 다재다능한 도구입니다. Ionic 팀에서 개발한 Capacitor는 최근 몇 년 동안 웹 기술의 모바일 플랫폼 잠재력을 인식하는 개발자들로부터 상당한 주목을 받았습니다. 이 포괄적인 가이드에서는 Capacitor에 대한 가장 일반적인 질문에 답하고 그 기능, 사용 사례 및 이점을 탐구합니다.

## Capacitor란 무엇인가요?

Capacitor는 웹 개발자가 현대 브라우저에서 실행되는 표준 웹 기술을 사용하여 크로스 플랫폼 앱을 구축할 수 있도록 해주는 무료 오픈 소스(MIT 라이센스) 플랫폼입니다. 이는 네이티브 플랫폼 SDK(iOS 및 Android), 명령줄 도구, 플러그인 API 및 미리 만들어진 플러그인으로 구성됩니다. Capacitor는 기존 웹 애플리케이션이 각 플랫폼에서 네이티브 앱으로 실행되도록 하며, JavaScript를 통해 네이티브 플랫폼에 대한 후크를 제공합니다. 이러한 후크는 앱에 직접 내장하거나 재사용 및 배포를 위해 독립형 플러그인으로 만들 수 있습니다.

## Capacitor로 무엇을 만들 수 있나요?

Capacitor를 사용하면 네이티브 또는 다른 크로스 플랫폼 도구로 만들 수 있는 거의 모든 것을 구축할 수 있습니다. Capacitor 앱은 네이티브 플랫폼에 완전히 접근할 수 있으므로 대부분의 네이티브 기능을 구현할 수 있습니다. 그러나 네이티브 UI 컨트롤을 웹 앱 뷰 계층에 직접 삽입하는 것은 어려울 수 있으며, 현재로서는 다른 사람들이 사용할 수 있는 추상화된 기술로 제공되지 않습니다.

## Capacitor는 누구를 위한 것인가요?

Capacitor는 HTML, CSS 및 JavaScript 배경을 가진 웹 개발자를 대상으로 합니다. 웹 또는 데스크톱 앱(Electron 또는 유사 도구 사용)을 구축하는 경우, Capacitor는 모바일 중심의 크로스 플랫폼 앱을 만드는 솔루션입니다.

## 팀이 Capacitor를 언제 선택해야 하나요?

팀은 웹 개발 기술과 기존 웹 투자를 활용하여 네이티브 플랫폼 앱을 배포하고자 할 때 Capacitor를 고려해야 합니다. Capacitor는 데이터 기반 앱, 소비자 앱, B2B/E 앱 및 기업 앱에 적합합니다. 특히 Ionic(Capacitor의 배경이 되는 회사)는 전용 기업 지원 및 기능을 제공하므로 기업 앱에 특히 적합합니다.

## 기존 웹 코드를 재사용하고 웹 앱과 새로운 코드를 공유할 수 있나요?

네! Capacitor는 표준 웹 앱을 네이티브로 실행하므로 팀이 웹 및 모바일을 위한 단일 코드베이스를 유지하거나 구성 요소, 논리 또는 특정 경험과 같은 웹 앱의 일부를 재사용할 수 있습니다.

## Capacitor의 강점은 무엇인가요? 한계는 무엇인가요?

Capacitor는 표준 웹 앱을 네이티브 모바일 앱으로 실행하고 네이티브 기능으로 웹 앱을 확장하는 데 뛰어납니다. 웹 개발에 능숙하거나 상당한 웹 투자를 한 팀에 이상적입니다. Capacitor는 3D/2D 또는 그래픽 집약적 앱에 최선의 선택이 아닐 수 있지만, WebGL을 지원합니다. 웹 앱과 네이티브 레이어 간의 광범위한 통신이 필요한 앱은 Capacitor 통신 브리지가 직렬화로 인해 오버헤드를 추가할 수 있습니다. 그러나 필요할 때마다 Capacitor 앱은 항상 사용자 지정 네이티브 코드를 실행할 수 있습니다.

## Native UI 컨트롤을 Capacitor와 혼합할 수 있나요?

네, 모달 또는 상위 수준 내비게이션 컨테이너와 같이 Capacitor 웹 뷰 외부에 네이티브 UI 컨트롤을 표시할 수 있습니다. 네이티브 컨트롤을 웹 뷰 경험에 삽입하는 것은 가능하지만, 아직 다른 사람들이 사용할 수 있는 기술로 제공되지 않습니다.

## Capacitor와 Electron은 어떻게 다른가요?

Capacitor는 종종 "모바일을 위한 Electron"으로 설명됩니다. 이는 Electron의 모바일 중심 대응물 역할을 하기 때문입니다. 그러나 Capacitor는 배포 플랫폼으로서 Electron을 겨냥할 수 있으며, 이는 더 높은 수준의 추상화입니다. 데스크톱 플랫폼만 겨냥할 경우 Electron으로 충분합니다. 그러나 모바일, 웹 및 데스크톱을 위한 크로스 플랫폼 앱을 구축하고자 한다면 Capacitor는 Electron 및 기타 플랫폼을 지원합니다.

## Capacitor와 Ionic은 어떻게 다른가요?

Ionic은 Capacitor, Ionic Framework, Stencil, Appflow 및 기타 앱 개발 중심 제품을 만드는 회사입니다. Capacitor는 앱의 네이티브 측 및 네이티브 앱과 웹 뷰 간의 통신을 처리하는 도구 세트입니다. Ionic Framework를 포함하여 웹 뷰 앱에서 사용되는 프레임워크 및 기술과는 관계가 없습니다. Ionic Framework는 웹 앱이 네이티브처럼 보이고 느낄 수 있도록 강력한 UI 구성 요소를 제공하는 모바일 UI 툴킷입니다.

## Capacitor와 함께 Ionic Framework를 사용할 필요가 있나요?

아니요, Tailwind, Material UI, Chakra, Quasar, Framework7 또는 자신만의 사용자 정의 구성 요소와 같은 다른 UI 및 CSS 프레임워크와 함께 Capacitor를 사용할 수 있습니다. 그러나 Ionic Framework는 웹 앱과 함께 네이티브 같은 경험을 만드는 데 여전히 훌륭한 옵션입니다.

## Ionic의 Capacitor에 대한 전략은 무엇인가요?

Ionic은 Capacitor 채택을 촉진하고자 합니다. 이는 Appflow(그들의 모바일 CI/CD 서비스), Ionic Framework 및 기업 솔루션의 사용 증가로 이어집니다. Capacitor의 성장은 디자인에 따른 것이며, 웹 개발자가 모바일 앱을 구축할 수 있도록 더 프론트엔드-불가지론적 스택을 제공하기 위해 만들어졌습니다.

## React, Next.js 또는 Remix와 함께 Capacitor를 사용할 수 있나요?

네, Capacitor는 React, Next.js 및 Remix와 잘 작동합니다. 표준 React 웹 개발과 React Native 사이에서 개발자를 더 가깝게 유지하며, 대부분의 React 라이브러리와 추가 기능이 Capacitor와 원활하게 작동합니다.

## Capacitor와 React Native는 어떻게 다른가요?

Capacitor와 React Native는 크로스 플랫폼 개발을 위한 도구 및 플러그인 인프라를 제공하는 데 유사성을 공유합니다. 하지만 React Native는 JS와 React를 사용하여 플랫폼 네이티브 UI 컨트롤을 추상화하는 웹과 유사한 시스템을 사용합니다. 반면에 Capacitor는 표준 웹 앱을 위해 웹 뷰를 제공합니다. Capacitor는 네이티브 UI 컨트롤을 관리하고 JS 레이어와 동기화할 필요가 없기 때문에 React Native보다 덜 복잡합니다.

## Capacitor가 React Native보다 빠른가요?

작업 부하에 따라 다릅니다. Capacitor는 iOS 및 Android에서 JIT 엔진에 접근할 수 있어 React Native보다 JavaScript를 더 빠르게 실행할 수 있습니다. 그러나 React Native는 네이티브 UI 컨트롤을 사용하여 UI 렌더링에 대해 "더 빠르다" 또는 "더 성능이 좋다"고 평가될 수 있지만, Capacitor 앱은 주로 웹 뷰에서 실행됩니다.

## Capacitor와 Flutter는 어떻게 다른가요?

Capacitor와 Flutter는 모두 크로스 플랫폼 개발을 위한 도구 및 플러그인 인프라를 제공하지만, Capacitor는 JavaScript와 표준 웹 기술을 사용하고 Flutter는 Dart 및 사용자 지정 UI와 API 환경을 사용합니다. UI 측면에서, Capacitor와 Flutter는 모두 사용자 지정 렌더링 엔진을 사용하며, Flutter는 자체 구성 요소를 그리고 Capacitor는 대부분의 UI를 웹 뷰에서 렌더링합니다.

## Capacitor를 React Native 또는 전통적인 네이티브 앱에 삽입하여 모바일 마이크로 프런트엔드를 구축할 수 있나요?

네, [Ionic Portals](https://ionic.io/portals/)를 사용하여 Capacitor를 React Native 또는 Swift/Kotlin으로 구축된 전통적인 네이티브 앱에 삽입하여 모바일 마이크로 프런트엔드 접근 방식으로 사용할 수 있습니다.

## Capacitor에서 고성능 애니메이션을 위한 옵션은 무엇인가요?

Ionic Framework, Quasar, Framework7 또는 Konsta UI의 미리 제작된 최적화된 구성 요소를 사용하거나 Framer Motion, Lottie 또는 CSS 애니메이션을 사용하여 사용자 지정 애니메이션을 만들 수 있습니다. CSS 애니메이션을 사용할 때는 성능 모범 사례를 따르도록 하십시오.

## Capacitor에는 몇 개의 플러그인이 있나요?

Capacitor는 26개의 핵심 플러그인과 수많은 커뮤니티 제작 플러그인을 보유하고 있습니다. 커뮤니티 플러그인 리소스를 위해 [awesome-capacitor](https://github.com/riderx/awesome-capacitor/), [capacitor-community](https://github.com/capacitor-community/) 조직 및 [Capgo](https://capgo.app/plugins/) 91개의 플러그인을 확인해 보세요.

## Capacitor용 VS Code 확장 프로그램이 있나요?

네, [Ionic VS Code 확장 프로그램](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic)은 Capacitor 확장 프로그램으로도 사용되며, 임베디드 미리보기, 디바이스 실행, 외부 디버깅, 프로젝트 품질 린팅, 보안 분석 등과 같은 기능을 제공합니다.

## 기업 전용 지원이 제공되나요?

네, Capgo는 [기업 지원 및 기능](https://capgo.app/)을 제공하며, 여기에는 전용 지원, 라이브 업데이트 및 인증을 위한 네이티브 플러그인 등이 포함됩니다.

## Capacitor를 시작하려면 어떻게 하나요?

[Capacitor 문서](https://capacitorjs.com/docs/)를 방문하고 앱에 Capacitor를 설치하기 위한 지침을 따르십시오. Ionic Framework 및 Angular/React/Vue를 사용하는 의견이 반영된 Capacitor 앱으로 시작하고 싶다면 [Ionic Framework 사이트](https://ionicframework.com/)에서 시작하기 흐름을 따르십시오.
