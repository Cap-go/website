---
slug: capacitor-comprehensive-guide
title: 'Capacitor: 総合ガイド'
description: >-
  Capacitor は、開発者が単一の標準的なWebコードベースを使用して、iOS、Android、デスクトップ、Progressive Web
  Appsのネイティブアプリを構築できる強力なツールです。この包括的なガイドで、Capacitorについて知っておくべきすべてを学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-10T00:00:00.000Z
updated_at: 2023-06-10T00:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: Capacitor 가이드 삽화
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Guides
published: true
locale: ko
next_blog: ''
---

[Capacitor](https://capacitorjscom/)는 웹 개발자가 단일 표준 웹 코드베이스를 사용하여 네이티브 iOS, Android, 데스크톱 및 프로그레시브 웹 앱을 만들 수 있게 해주는 다목적 도구입니다. Ionic 팀이 개발한 Capacitor는 개발자들이 모바일 플랫폼에서 웹 기술의 잠재력을 인식하면서 최근 몇 년간 큰 주목을 받았습니다. 이 종합 가이드에서는 Capacitor에 대한 가장 일반적인 질문들에 답하고 그 기능, 사용 사례 및 이점을 살펴보겠습니다.

## Capacitor란 무엇인가요?

Capacitor는 웹 개발자가 현대 브라우저에서 실행되는 표준 웹 기술을 사용하여 크로스 플랫폼 앱을 구축할 수 있게 해주는 무료 오픈소스(MIT 라이선스) 플랫폼입니다. 네이티브 플랫폼 SDK(iOS 및 Android), 명령줄 도구, 플러그인 API 및 사전 제작된 플러그인으로 구성됩니다. Capacitor를 사용하면 기존 웹 애플리케이션이 각 플랫폼에서 네이티브 앱으로 실행될 수 있으며, JavaScript를 통해 네이티브 플랫폼에 대한 훅을 제공합니다. 이러한 훅은 앱에 직접 내장되거나 재사용 및 배포를 위한 독립형 플러그인으로 구축될 수 있습니다.

## Capacitor로 무엇을 만들 수 있나요?

Capacitor를 사용하면 네이티브로 또는 다른 크로스 플랫폼 도구킷으로 만들 수 있는 거의 모든 것을 구축할 수 있습니다. Capacitor 앱은 네이티브 플랫폼에 완전히 액세스할 수 있으므로 대부분의 네이티브 기능을 구현할 수 있습니다. 그러나 네이티브 UI 컨트롤을 웹 앱 뷰 계층에 직접 임베딩하는 것은 어려울 수 있으며, 아직 다른 사람들이 사용할 수 있는 추상화된 기술로는 제공되지 않습니다.

## Capacitor는 누구를 위한 것인가요?

Capacitor는 HTML, CSS 및 JavaScript 배경을 가진 웹 개발자를 대상으로 합니다. 웹이나 데스크톱 앱(Electron 또는 유사한 도구 사용)을 구축하는 경우, Capacitor는 모바일에 중점을 둔 크로스 플랫폼 앱을 만들기 위한 솔루션입니다.

## 팀이 언제 Capacitor를 선택해야 하나요?

팀은 웹 개발 기술과 기존 웹 투자를 활용하여 네이티브 플랫폼 앱을 배포하고자 할 때 Capacitor를 고려해야 합니다. Capacitor는 데이터 기반 앱, 소비자 앱, B2B/E 앱 및 엔터프라이즈 앱에 이상적입니다. Capacitor를 만든 회사인 Ionic이 전용 엔터프라이즈 지원과 기능을 제공하므로 특히 엔터프라이즈 앱에 적합합니다.

## 기존 웹 코드를 재사용하고 웹 앱과 새로운 코드를 공유할 수 있나요?

네! Capacitor는 표준 웹 앱을 네이티브로 실행하므로 팀이 웹과 모바일을 위한 단일 코드베이스를 가질 수 있거나 컴포넌트, 로직 또는 특정 경험과 같은 웹 앱의 일부를 재사용할 수 있습니다.

## Capacitor는 어떤 점이 좋으며, 어떤 한계가 있나요?

Capacitor는 표준 웹 앱을 네이티브 모바일 앱으로 실행하고 네이티브 기능으로 웹 앱을 확장하는 데 탁월합니다. 웹 개발에 능숙하거나 상당한 웹 투자를 한 팀에게 이상적입니다. Capacitor는 WebGL을 지원하지만 3D/2D 또는 그래픽 집약적인 앱에는 최선의 선택이 아닐 수 있습니다. 웹 앱과 네이티브 레이어 간의 광범위한 통신이 필요한 앱은 직렬화로 인해 Capacitor 통신 브리지가 오버헤드를 추가할 수 있습니다. 그러나 필요한 경우 Capacitor 앱은 항상 사용자 정의 네이티브 코드를 실행할 수 있습니다.

## Capacitor와 네이티브 UI 컨트롤을 혼합할 수 있나요?

네, 모달이나 상위 레벨 네비게이션 컨테이너와 같은 네이티브 UI 컨트롤을 Capacitor 웹 뷰 외부에 표시할 수 있습니다. 웹 뷰 경험에 네이티브 컨트롤을 임베딩하는 것은 가능하지만 아직 다른 사람들이 사용할 수 있는 기술로는 제공되지 않습니다.

## Capacitor와 Electron은 어떻게 다른가요?

Capacitor는 종종 "모바일용 Electron"으로 설명됩니다. Capacitor는 더 높은 수준의 추상화이므로 Electron을 배포 플랫폼으로 대상으로 할 수 있습니다. 데스크톱 플랫폼만 대상으로 하면 Electron으로 충분합니다. 하지만 모바일, 웹 및 데스크톱용 크로스 플랫폼 앱을 구축하려면 Capacitor가 Electron 및 기타 플랫폼을 지원합니다.

## Capacitor와 Ionic은 어떻게 다른가요?

Ionic은 Capacitor, Ionic Framework, Stencil, Appflow 및 기타 앱 개발 중심 제품을 만드는 회사입니다.