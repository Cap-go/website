---
title: AppFlow에서 Capgo로 마이그레이션
description: Ionic AppFlow에서 Capgo로 앱을 마이그레이션하는 완벽한 가이드
sidebar:
  order: 7
---

## AppFlow 설정 참조

마이그레이션 전에 현재 `capacitor.config.ts`의 AppFlow 설정을 확인하세요:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    LiveUpdates: {
      appId: 'your-app-id',
      channel: 'Production',
      autoUpdateMethod: 'background', // 또는 'always latest', 'force update'
      maxVersions: 2
    }
  }
};
```

이 설정은 AppFlow 기능을 Capgo의 동등한 기능으로 매핑하는 데 도움이 됩니다.

## Capgo로 마이그레이션하는 이유

Ionic AppFlow 서비스 종료 발표와 함께, Capgo로의 마이그레이션은 모바일 앱 개발 워크플로우를 원활하게 전환할 수 있는 기회를 제공합니다. Capgo는 모든 중요한 기능을 유지하면서 향상된 기능, 더 나은 성능, 그리고 상당한 비용 절감을 제공합니다.

### 주요 이점
- 더 빠른 업데이트 배포 (10분에서 1분 미만으로)
- 더 저렴한 가격 ($499/월에서 $14/월로)
- 모든 요금제에 엔드투엔드 암호화 포함
- 업데이트 채널에 대한 향상된 제어
- 포괄적인 CI/CD 통합 옵션

## 마이그레이션 단계

### 1. 실시간 업데이트 마이그레이션

#### 이전 종속성 제거
```bash
npm uninstall @ionic/appflow
# capacitor.config.json에서 AppFlow 관련 설정 제거
```

#### Capgo 설치
```bash
npm install @capgo/capacitor-updater
npx cap sync
```

#### 설정 업데이트
`capacitor.config.json`에 Capgo 설정 추가:
```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true
    }
  }
}
```

### 2. CI/CD 마이그레이션

Capgo는 유연한 CI/CD 옵션을 제공합니다:

#### 옵션 1: 기존 CI/CD 사용
인기 있는 플랫폼과 함께 CI/CD를 설정하는 상세 튜토리얼:
- [iOS 빌드 설정](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/)
- [Android 빌드 설정](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)
- [GitHub Actions 통합](https://capgo.app/blog/github-action-capacitor/)

#### 옵션 2: CI/CD 서비스
[관리형 서비스](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you)로 CI/CD 설정을 맡기세요.

### 3. 채널 설정

1. Capgo 대시보드에서 채널 생성:
```bash
npx @capgo/cli channel create production
npx @capgo/cli channel create staging
```

2. 채널 설정 구성:
```bash
# 프로덕션 채널 설정
npx @capgo/cli channel update production --no-downgrade --no-upgrade

# 스테이징 채널 설정
npx @capgo/cli channel update staging
```

### 4. 마이그레이션 테스트

1. **실시간 업데이트 테스트**
```bash
# 테스트 번들 생성 및 업로드
npx @capgo/cli bundle create --channel staging
```

2. **업데이트 수신 확인**
- 테스트 기기에 앱 설치
- 업데이트가 올바르게 수신되는지 확인
- 업데이트 설치 프로세스 검증
- 복구 기능 테스트

## 문제 해결

### 일반적인 문제

#### 업데이트가 수신되지 않음
- 채널 구성 확인
- 기기 로그 확인
- 네트워크 연결 확인
- 번들 버전 형식 검증

## 다음 단계

1. [Capgo 계정 생성](/register/)
2. [빠른 시작 가이드](/docs/getting-started/quickstart/) 따르기
3. [CI/CD 통합](/docs/getting-started/cicd-integration/) 설정
4. [실시간 업데이트](/docs/live-updates/) 구성

마이그레이션 중 전담 지원이 필요한 기업 팀의 경우, [우리 팀과 통화 예약](https://cal.com/martindonadieu/capgo-enterprise-inquiry)을 해주세요.
