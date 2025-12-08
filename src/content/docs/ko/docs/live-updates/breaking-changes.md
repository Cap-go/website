---
title: "주요 변경 사항"
description: "버전별 채널로 주요 변경 사항을 처리하는 방법"
sidebar:
  order: 6
locale: ko
---

이 문서는 버전별 채널을 사용하여 앱에서 주요 변경 사항을 처리하는 방법을 설명합니다. 이 접근 방식을 사용하면 서로 다른 버전의 앱을 유지 관리하면서 사용자가 호환 가능한 업데이트를 받을 수 있도록 보장할 수 있습니다.

## 예시 시나리오

다음과 같은 상황을 가정해 봅시다:
- 앱 버전 1.2.3 (구 버전) - production 채널 사용
- 앱 버전 2.0.0 (주요 변경 사항이 있는 새 버전) - v2 채널 사용
- 라이브 업데이트 1.2.4 (1.2.3과 호환)
- 라이브 업데이트 2.0.1 (2.0.0과 호환)

## 전략: 주요 버전에 항상 defaultChannel 사용

**권장 접근 방식:** 모든 주요 버전에 대해 `defaultChannel`을 설정하세요. 이렇게 하면 동적 채널 할당에 의존하지 않고도 항상 특정 사용자 그룹에 업데이트를 푸시할 수 있습니다.

```ts
// 버전 1.x 릴리스
defaultChannel: 'v1'

// 버전 2.x 릴리스
defaultChannel: 'v2'

// 버전 3.x 릴리스 (향후)
defaultChannel: 'v3'
```

:::tip
**이 접근 방식의 이점:**
- 어떤 사용자가 업데이트를 받을지 **항상 제어 가능**
- 앱 코드에서 **동적 채널 전환이 필요 없음**
- 서로 다른 앱 버전 간 **명확한 구분**
- 특정 버전 그룹에 업데이트를 푸시할 수 있는 **유연성**
:::

## 1. 새 버전용 채널 생성

```bash
# 버전 2.x용 채널 생성
npx @capgo/cli channel create v2
```

## 2. 버전 2.0.0용 Capacitor 구성 업데이트

앱 스토어에 버전 2.0.0을 빌드하기 전에 Capacitor 구성을 업데이트하세요:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... 기타 옵션
      defaultChannel: 'v2' // 모든 2.0.0 사용자는 v2 채널을 사용합니다
    }
  }
};

export default config;
```

:::note
**버전 1.x의 경우:** 처음에 `defaultChannel`을 설정하지 않았다면 버전 1.x 사용자는 `production` 채널에 있습니다. 향후 주요 버전의 경우 항상 `v3`, `v4` 등과 같은 특정 채널을 설정하세요.
:::

## 3. 별도의 코드 브랜치 관리

앱 버전 간 호환성을 유지하기 위해 별도의 git 브랜치를 생성하세요:

```bash
# 버전 1.x 업데이트용 브랜치 생성 및 유지 관리
git checkout -b v1-maintenance
git push origin v1-maintenance

# 메인 브랜치는 버전 2.x 개발을 계속합니다
git checkout main
```

:::warning
**중요:** 구 버전 앱이 가지고 있지 않은 네이티브 코드/API를 필요로 하는 JavaScript 번들을 절대 푸시하지 마세요. 항상 적절한 브랜치에서 업데이트를 빌드하세요:
- **v1-maintenance 브랜치**: 1.x 앱 업데이트용 (production 채널)
- **main 브랜치**: 2.x 앱 업데이트용 (v2 채널)
:::

## 4. 각 채널에 번들 업로드

```bash
# 1.x 업데이트의 경우: v1-maintenance 브랜치에서 빌드
git checkout v1-maintenance
# 여기서 1.x 호환 변경 사항 적용
npx @capgo/cli bundle upload --channel production

# 2.x 업데이트의 경우: main 브랜치에서 빌드
git checkout main
# 여기서 2.x 변경 사항 적용
npx @capgo/cli bundle upload --channel v2
```

## 5. 자가 할당 활성화

```bash
# 앱이 v2 채널에 자가 할당할 수 있도록 허용
npx @capgo/cli channel set v2 --self-assign
```

## 6. 앱 스토어에 배포

버전 2.0.0을 빌드하여 앱 스토어에 배포하세요. 이 버전을 다운로드하는 모든 사용자(신규 사용자 또는 업그레이드하는 기존 사용자 모두)는 앱 번들에 구성되어 있으므로 자동으로 v2 채널을 사용합니다.

:::note
**코드 변경 불필요!** `defaultChannel: 'v2'`가 앱 스토어 버전과 함께 번들로 제공되므로 버전 2.0.0을 다운로드하는 모든 사용자가 자동으로 올바른 채널을 사용합니다.
:::

## 향후 버전으로 확장

더 많은 주요 변경 사항이 있는 버전 3.0.0을 릴리스할 때:

```bash
# 버전 3.x용 채널 생성
npx @capgo/cli channel create v3
```

```ts
// 버전 3.0.0용 capacitor.config.ts
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // 버전 3.x 사용자
    }
  }
};
```

이제 모든 버전에 업데이트를 푸시할 수 있습니다:
- `production` 채널 → 버전 1.x 사용자
- `v2` 채널 → 버전 2.x 사용자
- `v3` 채널 → 버전 3.x 사용자

## 7. 정리 (마이그레이션 후)

모든 사용자가 버전 2.x로 마이그레이션한 후 (3-4개월 예상):

1. Capacitor 구성에서 `defaultChannel` 제거
2. v2 채널 삭제:

```bash
npx @capgo/cli channel delete v2
```

3. v1-maintenance 브랜치 삭제:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip
이 접근 방식은 사용자가 자신의 앱 버전과 호환되는 업데이트만 받을 수 있도록 보장합니다
:::

:::warning
배포하기 전에 각 채널에서 업데이트를 철저히 테스트하세요
:::

:::note
일부 사용자가 여전히 채널 재정의를 가지고 있더라도 Capgo에서 v2 채널을 안전하게 삭제할 수 있습니다. 그들은 자동으로 production 채널에서 업데이트를 받게 됩니다.
:::

## 버전 1.x 업데이트 유지 관리

버전 1.x와 호환되는 업데이트를 전송하려면:

1. v1-maintenance 브랜치로 전환:
```bash
git checkout v1-maintenance
```

2. 변경 사항을 만들고 커밋:
```bash
# 1.x 호환 변경 사항 적용
git add .
git commit -m "Fix for v1.x"
git push origin v1-maintenance
```

3. production 채널에 빌드 및 업로드:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
v1-maintenance 브랜치를 버전 1.x와 호환되는 버그 수정으로 최신 상태로 유지하되, main에서 주요 변경 사항을 절대 병합하지 마세요
:::
