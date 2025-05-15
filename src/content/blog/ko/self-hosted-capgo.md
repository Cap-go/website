---
slug: self-hosted-capgo
title: 자체 호스팅 Capgo
description: >-
  Capgo를 자체 호스팅하면 Capgo 클라우드 서비스를 사용할 필요 없이 사용자에게 Capacitor 라이브 업데이트를 배포할 수
  있습니다.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: 셀프 호스팅 캡고
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: ko
next_blog: ''
---
이 기사에서는 Capgo를 자가 호스팅하는 방법에 대한 단계별 가이드를 제공하며, 자가 호스팅의 장점과 도전 과제에 대해 논의합니다.

# 소개

자가 호스팅은 서버와 네트워크를 직접 설정하여 자신의 웹사이트나 애플리케이션을 운영하는 형식입니다. 서비스로서의 플랫폼(Platform as a Service)이나 공개 클라우드 제공업체를 사용하는 대신, 자가 호스팅을 선택하는 사람들은 자신의 네트워크를 운영하고, 웹사이트나 애플리케이션 구축 외에도 유지 관리와 가동 시간을 책임집니다.

Capgo를 시작하는 가장 쉬운 방법은 우리의 [공식 클라우드 관리 서비스](https://capgo.app/)를 이용하는 것이지만, 직접 관리할 준비가 되어 있다면, 서버에서 Capgo를 자가 호스팅할 수도 있습니다.

## 자가 호스팅이란 무엇인가?

디지털 영역에서 자가 호스팅은 자신의 서버나 호스팅 인프라를 운영하여 온라인 존재와 서비스를 관리하고 통제하는 관행을 의미합니다. 제3자 호스팅 제공업체에 의존하는 대신, 개인과 조직은 자신의 조건에 맞게 서버, 웹사이트, 애플리케이션 및 데이터 저장을 설정하고 관리하기로 선택합니다.

## 왜 자가 호스팅을 선택하십니까?

사람들이 자가 호스팅을 선택하는 데는 여러 가지 이유가 있습니다. 가장 흔한 장점 중 일부는 다음과 같습니다:

* **개인정보 보호 및 통제:** 자가 호스팅은 데이터와 개인 정보에 대한 완전한 통제를 제공합니다. 제3자 제공업체가 여러분의 활동을 추적하거나 데이터를 판매하는 것에 대해 걱정할 필요가 없습니다.

* **비용 절감:** 자가 호스팅은 장기적으로 더 비용 효율적일 수 있으며, 특히 많은 자원을 사용하거나 여러 서비스를 운영하는 경우에 그렇습니다.

* **맞춤화:** 자가 호스팅은 애플리케이션과 서비스를 특정 요구 사항에 맞게 커스터마이징할 수 있는 유연성을 제공합니다.

* **학습 및 실험:** 자가 호스팅은 리눅스, 시스템 관리 및 기타 기술 주제를 배우는 훌륭한 방법이 될 수 있습니다. 또한 새로운 소프트웨어와 서비스를 실험하는 재미있는 방법이 될 수 있습니다.

* **독립성:** 자가 호스팅은 외부 제공업체에 대한 의존도를 줄입니다. 서비스 약관, 가격 변경 또는 잠재적 서비스 중단에 휘둘리지 않습니다. 이 독립성은 온라인 존재에 의존하는 기업과 개인에게 매우 중요할 수 있습니다.

## Capgo Cloud와 Capgo Self-Hosted의 차이는 무엇인가요?

Capgo는 오직 하나의 버전만 존재합니다. 제 Cloud 제품과 제 Self-Hosted 제품은 완전히 동일합니다. 더 나은 기능을 가진 프리미엄 상업 버전은 없습니다.

두 버전 모두 동일한 대시보드, 동일한 유의미한 지표 및 [방문자의 개인 정보를 존중하는 것에 대한 약속](https://capgo.app/privacy/)을 제공합니다.

저는 2018년 12월에 Capgo 개발을 시작했으며, 2019년 5월에 SaaS 구독 비즈니스를 시작했습니다. 이 프로젝트는 매우 활발하고 즉각적으로 개발되고 있으며 빠르게 성장하고 있습니다. 견고하고 검증된 제품이기도 합니다.

Capgo Cloud와 Capgo Self-Hosted의 차이점은 다음과 같습니다:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **호스팅** | 쉽고 편리합니다. 첫 번째 업데이트를 보내는 데 2분밖에 걸리지 않으며, 고가용성, 백업, 보안 및 유지 관리가 모두 저에 의해 수행됩니다. 제가 모든 것을 관리하므로 아무 걱정할 필요가 없습니다. | 모든 것을 스스로 해야 합니다. 서버를 마련해야 하며, 인프라를 관리해야 합니다. 설치, 유지 관리, 업그레이드, 서버 용량, 가동 시간, 백업, 보안, 안정성, 일관성, 로딩 시간 등을 책임져야 합니다. |
| **저장소** | 모든 방문자 데이터는 EU 소속 클라우드 인프라에서 독점적으로 처리됩니다. 저는 귀하의 사이트 데이터를 독일에 있는 안전하고 암호화된 서버에 보관합니다. 이는 귀하의 사이트 데이터가 엄격한 유럽 연합 데이터 개인 정보 보호법에 의해 보호되고 GDPR 준수를 보장합니다. 홈페이지 데이터는 절대로 EU를 벗어나지 않습니다. | 귀하는 완전한 통제를 가지며 원하는 모든 국가의 서버에서 Capgo를 호스팅할 수 있습니다. 지하실 서버에 호스팅하거나 원하는 클라우드 제공업체에 호스팅할 수 있으며, GDPR 준수를 하지 않는 제공업체에서도 가능합니다. |
| **원시 데이터** | 모든 사이트 통계 및 지표를 현대적인 외观과 사용하기 쉬우며 빠르게 로드되는 대시보드에서 보실 수 있습니다. 대시보드에서는 집계된 통계만 볼 수 있습니다. | 분석가이고 원시 데이터에 접근하고 싶으신가요? Capgo를 스스로 호스팅하면 그 선택권이 주어집니다. 데이터베이스에서 직접 데이터를 가져와 원하는 데이터 분석 도구로 가져올 수 있습니다. |
| **비용** | 업데이트 서비스를 제공하는 데 비용이 발생하므로 구독 요금을 부과합니다. | 서버 비용과 서버 운영에 수반되는 비용만 지불하면 됩니다. 저에게는 요금을 지불할 필요가 없고, 클라우드 제공업체에만 지불하면 됩니다. |
| **프리미엄 지원** | Capgo를 구축하고 유지 관리하는 실제 사람들에 의한 진정한 지원이 제공됩니다. | 프리미엄 지원은 포함되지 않습니다. 자가 호스팅 릴리스는 커뮤니티에서만 지원됩니다. |
| **릴리스** | 매주 여러 번 새로운 기능과 업데이트로 지속적으로 개발 및 개선됩니다. | 연 2회 발행되는 장기 릴리스로, 최신 기능은 처음에 클라우드에서 테스트되기 때문에 즉시 사용할 수 없습니다. |

# Capgo 자가 호스팅 방법

Capgo에서는 주로 Supabase를 사용하며, 자가 호스팅을 하시려면 [Supabase 자가 호스팅 문서](https://supabase.com/docs/guides/self-hosting/docker)를 따라 주시면 됩니다.

# 자가 호스팅 Capgo와 함께 CLI 사용하기
자가 호스팅한 Capgo와 CLI를 사용하려면 애플리케이션 디렉토리의 capacitor.config.ts를 다음과 같이 설정하십시오:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      localHost: "http://localhost:5173",
      localWebHost: "http://localhost:5173",
      localSupa: "http://localhost:54321",
      localSupaAnon: "see_notes",
    },
  },
};
```

참고: localSupaAnon을 얻으시려면 이 [튜토리얼](https://capgo.app/docs/self-hosted/local-dev/getting-started/)을 따르고 anonym 키를 localSupaAnon에 복사하십시오.

# 자가 호스팅 Capgo와 함께하는 capacitor 업데이터 사용하기

**요구 사항**

[capgo](https://github.com/Cap-go/capgo/)를 클론했습니다.

자가 호스팅한 Capgo와 함께 capacitor 업데이터를 사용하려면 애플리케이션 디렉토리의 `capacitor.config.ts`를 다음과 같이 설정하십시오:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "http://localhost:54321/functions/v1/stats",
      channelUrl: "http://localhost:54321/functions/v1/channel_self",
      updateUrl: "http://localhost:54321/functions/v1/updates"
    },
  },
};
```

이렇게 하면 개발 중에 로컬 Capgo를 사용할 수 있습니다. 그러나 기본적으로는 이것만으로는 충분하지 않습니다.

# 결론

결론적으로, Capgo를 자가 호스팅하는 것은 자원을 가지고 전문성이 있는 조직에 적합한 옵션이 될 수 있습니다. 이는 업데이트 프로세스의 통제, 보안 및 준수를 포함한 여러 가지 이점을 제공합니다. 그러나 자가 호스팅 여부를 결정하기 전에 장점과 도전 과제를 신중하게 검토하는 것이 중요합니다.

Capgo를 자가 호스팅하려고 고려하고 있다면, Capgo [자가 호스팅 문서](https://capgo.app/docs/self-hosted/getting-started/)를 먼저 읽어보시기를 권장합니다. 이것은 자가 호스팅의 요구 사항 및 위험에 대한 좋은 이해를 제공할 것입니다.
