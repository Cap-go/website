---
title: "V7에서 V8로"
locale: ko
description: "Capgo 업데이터의 버전 7에서 버전 8로 전환하는 상세한 가이드로, Capacitor 8 기능 및 개선 사항과의 호환성을 보장하는 성공적인 업그레이드 프로세스를 위한 필수 단계와 고려 사항을 설명합니다."
sidebar:
  order: 0
---

## 이 업그레이드가 필요한 이유

이 주요 버전은 Capacitor 주요 버전 8을 따르기 위한 것입니다

먼저 Capacitor의 마이그레이션 가이드를 따르세요:

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## 설치

`npm i @capgo/capacitor-updater@8`

그런 다음 네이티브 코드 업데이트를 동기화합니다:

`npx cap sync`

완료되었습니다! 매우 쉽습니다!

## V8의 새로운 기능

capacitor-updater 버전 8은 Capacitor 8과의 완전한 호환성을 제공하여 앱이 최신 모바일 OS 기능과 개선 사항을 활용할 수 있도록 보장합니다.

### 주요 업데이트

- **Capacitor 8 호환성**: Capacitor 8의 향상된 네이티브 기능에 대한 완전한 지원
- **성능 개선**: 최적화된 업데이트 전달 및 설치 프로세스
- **향상된 안정성**: v7 이후의 버그 수정 및 안정성 개선
- **유지된 API 호환성**: v7 이후 플러그인 API에 대한 주요 변경 사항 없음

## 구성

구성은 v7과 동일하게 유지됩니다. 기존 `capacitor.config` 설정이 계속 작동합니다:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... 기타 설정
    }
  }
}
```

## 마이그레이션 체크리스트

- [ ] @capacitor/core를 ^8.0.0으로 업데이트
- [ ] @capacitor/android를 ^8.0.0으로 업데이트
- [ ] @capacitor/ios를 ^8.0.0으로 업데이트
- [ ] Capacitor의 v8 마이그레이션 가이드 따르기
- [ ] @capgo/capacitor-updater를 ^8.0.0으로 업데이트
- [ ] `npx cap sync` 실행
- [ ] iOS 및 Android에서 앱을 철저히 테스트

## 도움이 필요하신가요?

마이그레이션 중 문제가 발생하면:

1. [문서](/docs/live-updates/)를 확인하세요
2. [Discord 커뮤니티](https://discord.com/invite/VnYRvBfgA6)를 방문하세요
3. [GitHub](https://github.com/Cap-go/capacitor-updater/issues)에서 이슈를 열어주세요
