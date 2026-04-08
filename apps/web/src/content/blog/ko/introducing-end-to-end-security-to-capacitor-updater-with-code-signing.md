---
slug: introducing-end-to-end-security-to-capacitor-updater-with-code-signing
title: Capacitor-updater에서 코드 서명을 통한 엔드 투 엔드 암호화 소개
description: 'RSA + AES 암호화를 사용하여 업데이트를 암호화하며, 기업용 및 고보안 앱을 위해 설계되었습니다'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-27T00:00:00.000Z
updated_at: 2024-08-27T00:00:00.000Z
head_image: /secure_upload.webp
head_image_alt: Capgo 보안 업로드
keywords: >-
  E2E, code signing, RSA, AES, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Solution
published: true
locale: ko
next_blog: ''
---
[Capacitor-updater](https://github.com/Cap-go/capacitor-updater/)는 이제 종단간 코드 암호화를 지원합니다. 코드 서명을 통해 최종 사용자의 기기에서 실행되는 업데이트가 변조되지 않았음을 확인하고, Capacitor-updater의 표준 웹 등급 보안을 넘어서는 추가적인 보호 수준을 제공합니다.

## Capacitor-updater의 기본 보안

기본적으로 Capgo의 보안 모델은 웹 호스팅 제공업체와 유사합니다. Capgo는 업데이트를 [저장 시 암호화](https://cloud.google.com/docs/security/encryption/default-encryption/)하고 현대적인 암호화 방식을 사용하여 HTTPS를 통해 제공합니다. 마찬가지로 개발자의 컴퓨터에서 업데이트를 게시할 때도 항상 HTTPS를 사용합니다.

![Capgo는 SSL Labs의 HTTPS 테스트에서 A+ 등급을 받았습니다](/ssllabs_report.webp)

Capgo의 기본 보안은 SSL Labs의 HTTPS 테스트에서 A+ 등급을 받았습니다 (https://www.ssllabs.com, 2022년 11월)

최고급 웹 호스트와 마찬가지로 Capgo는 HTTPS를 사용하여 서버와 최종 사용자 기기 간의 네트워크 연결의 프라이버시와 무결성을 보호합니다. 이는 Capgo를 사용하는 웹과 Ionic 앱 모두에 잘 작동하는 우수한 수준의 보안입니다.

## 클라우드 인프라 공급망

Capgo와 대부분의 웹 호스트가 공통적으로 가지고 있는 또 다른 점은 AWS, GCP 또는 다른 인기 있는 클라우드 제공업체의 하위 수준 클라우드 인프라에서 실행된다는 것입니다. 이러한 클라우드 제공업체와 Capgo 또는 다른 웹 호스트가 운영하는 하드웨어와 소프트웨어는 클라우드 공급망의 일부입니다.

클라우드 공급망과 그 보안 모델은 수많은 웹사이트와 앱에 적용됩니다. 클라우드 제공업체를 사용하는 모든 웹 개발자는 해당 제공업체를 신뢰하고 업로드한 파일이 변조되지 않고 실행되거나 제공될 것으로 기대합니다. 그리고 클라우드 제공업체들은 인프라를 안전하게 유지하기 위해 열심히 노력합니다.

하지만 당연히 하드웨어와 소프트웨어 취약점이 발견됩니다. 클라우드 제공업체는 적시에 취약점을 패치하고, 악성 소프트웨어를 사전에 방지하며(예: [Google의 SLSA](https://security.googleblog.com/2021/06/introducing-slsa-end-to-end-framework.html/)), 심층적인 방어 계층을 구축하며, 실제로 클라우드 인프라는 대부분의 웹사이트와 앱의 보안 요구사항을 충족하는 것으로 나타났습니다. 하지만 일부 Ionic 앱은 손상된 클라우드 인프라를 위협 모델에 포함시킵니다. 이러한 웹 수준 이상의 최고 보안 요구사항을 가진 Capacitor JS 앱을 위해 Capgo와 [Capgo Updates 표준 프로토콜](/docs/self-hosted/auto-update/update-endpoint/)에 종단간 코드 서명을 구축했습니다.

## Capgo를 통한 종단간 코드 서명

Capgo의 종단간 코드 서명은 공개키 암호화를 사용하여 최종 사용자의 기기가 Capacitor 앱 개발자의 원본 업데이트만을 변경 없이 실행하도록 보장합니다.

"종단간"이란 개발자가 업데이트를 게시하는 시점부터 최종 사용자의 기기가 업데이트를 받아 실행하는 시점까지의 흐름을 커버한다는 의미입니다. "코드 서명"은 암호화와 비밀 개인 키를 사용하여 코드에 "서명"하고, 나중에 신뢰할 수 있는 공개 키를 사용하여 서명을 확인하는 것입니다.

다음은 작동 방식을 설명하는 간단한* 도식입니다:

![Capgo 암호화 스키마](/encryption_flow.webp)

* 실제로는 복잡함, 암호화는 어려움

*정의*:
- AES: Advanced Encryption Standard, 대칭 암호화 알고리즘, 암호화와 복호화에 하나의 키 사용.
- RSA: Rivest–Shamir–Adleman, 비대칭 암호화 알고리즘, 두 개의 키 사용: 공개 키와 개인 키.
- Cypher: 암호화된 데이터.
- 세션 키: 데이터 암호화와 복호화에 사용되는 AES 키.
- 체크섬: 파일에 대해 계산된 해시
- 서명: 개인 RSA 키로 암호화된 체크섬. 공개 RSA 키로 확인 가능

우리는 AES 알고리즘을 사용하여 업데이트를 암호화합니다. 모든 업로드마다 무작위 AES 키가 생성되며, 그 다음 AES 키와 체크섬(이하 "서명")이 개발자의 개인 RSA 키로 암호화됩니다. 개발자의 공개 RSA 키는 앱에서 AES 키와 서명을 복호화(체크섬으로 변환)하는 데 사용됩니다. 나중에 복호화된 AES 키는 업데이트를 복호화하는 데 사용됩니다; 복호화된 업데이트의 체크섬이 계산되고 복호화된 서명과 비교됩니다.

RSA는 큰 양의 데이터를 암호화하는 데 사용할 수 없기 때문에 두 가지 다른 암호화 알고리즘을 사용합니다. AES는 업데이트를 암호화하는 데 사용되고 RSA는 AES 키와 체크섬을 암호화하는 데 사용됩니다.

이를 통해 Capgo조차도 번들의 내용을 읽을 수 없습니다. 이는 많은 기업 고객이 사용하는 강력한 보안 모델입니다.

**업데이트 암호화 V2 2024-08-27:**
- 앱에 저장되는 키 유형을 변경했습니다. 이는 개인 키(이전에는 복호화에 사용)에서 공개 키(이전에는 암호화에 사용)를 추론하는 것을 방지하기 위해 수행되었습니다. 이제 앱은 공개 키(현재는 복호화에 사용)를 저장합니다.
- 체크섬을 CRC32 알고리즘에서 SHA256 알고리즘으로 변경했습니다. 또한 [번들 서명](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Signing_messages)을 시작했습니다. 암호화 V2가 구성되면 업데이트는 유효한 서명이 있어야 합니다. 이는 플러그인에 의해 엄격하게 강제됩니다.
- 암호화 V2가 구성된 경우 유효한 서명을 강제합니다.
이 3가지 변경사항은 커뮤니티 멤버의 보안 분석 후에 이루어졌습니다. 이는 업데이트 중 암호화 공격을 방지하기 위한 것입니다.

암호화 V1을 사용한 경우, 새로운 보안 기능을 활용하기 위해 V2로 마이그레이션하세요. [마이그레이션 지침](/docs/cli/migrations/encryption/)을 따르세요.

종단간 코드 서명을 통해 Capgo는 "신뢰 없는" 클라우드 인프라가 됩니다. Capgo의 클라우드 제공업체 중 하나 또는 Capgo 자체가 코드 서명된 업데이트를 수정하더라도, 최종 사용자의 기기는 해당 업데이트를 거부하고 기기에 이미 있는 이전의 신뢰할 수 있는 업데이트를 실행할 것입니다.

웹 수준의 HTTPS가 많은 앱에 충분하지만, 일부 대기업은 종단간 코드 서명의 추가적인 보안 수준을 매력적으로 찾습니다. 이러한 기업 중 일부는 고가치의 영구적인 거래를 처리하는 금융 앱을 만듭니다. 다른 기업들은 손상된 클라우드 인프라를 위협 모델에 포함시키는 CISO를 두고 있습니다. 우리는 이러한 사용 사례를 위해 Capgo에 종단간 코드 서명을 구축했으며, 더 높은 수준의 보안 요구사항을 가진 기업들의 의견을 더 듣고 싶습니다.

## 기업 고객을 위한 시작하기

보안을 매우 중요하게 생각하는 대기업이나 프로젝트를 위해, 우리는 코드 서명을 쉽게 설정하고 유지할 수 있도록 하고자 합니다. 이를 위해 다음과 같은 기능을 제공합니다:

-   빠른 인증서 설정 및 구성
-   Capgo와 개발 빌드 모두에 대한 코드 서명 개발 서버 지원
-   모든 업데이트에 대한 프로덕션 코드 서명

Capgo 코드 서명은 모든 고객이 이용할 수 있습니다. 시작하려면 [설정 지침](/docs/cli/commands/#end-to-end-encryption-trustless)을 따르세요.

## 크레딧

[Ionic](https://ionic.com/)에 많은 감사를 드립니다. 이 글은 [이 글](https://ionic.io/blog/introducing-the-ionic-end-to-end-testing-reference-example/)을 기반으로 chat-gpt-3로 다시 작성하고 수정한 것입니다.
