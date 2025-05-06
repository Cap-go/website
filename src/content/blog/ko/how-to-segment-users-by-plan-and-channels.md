---
slug: how-to-segment-users-by-plan-and-channels
title: 기능 플래그와 A/B 테스팅을 위한 채널 사용법
description: CapGo의 채널을 사용하여 기능 플래그와 A/B 테스팅을 직접 사용자에게 할당하거나 백엔드를 활용하는 방법 알아보기
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2025-04-15T00:00:00.000Z
updated_at: 2025-04-15T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgo 채널 기능 플래그 그림
keywords: 'channels, feature flags, a/b testing, capacitor, capgo'
tag: Tutorial
published: true
locale: ko
next_blog: ''
---
# 기능 플래그와 A/B 테스트를 위한 채널 사용 방법

CapGo의 채널 시스템은 사용자를 세분화하고 기능 접근을 제어하는 유연한 방법을 제공합니다. CapGo에는 기본 제공되는 플랜 관리나 A/B 테스트 기능이 없지만, 채널 할당을 직접 관리하여 이러한 기능을 구현할 수 있습니다.

## 채널 이해하기

CapGo의 채널을 통해 다음과 같은 작업이 가능합니다:
- 특정 사용자 그룹에 다른 기능 타겟팅
- 사용자를 다른 채널에 할당하여 A/B 테스트 실행
- 새로운 기능의 점진적 출시
- 베타 테스트 프로그램 생성

## 채널 할당 방법

### 1. 백엔드 할당 (권장)

이것은 더 안전한 방법입니다. 다음과 같은 과정을 포함합니다:
1. 업데이터에서 기기 ID 가져오기
2. 백엔드로 전송
3. 백엔드가 CapGo API를 호출하여 기기 할당

구현 방법은 다음과 같습니다:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Get device ID
const getDeviceId = async () => {
  const { deviceId } = await CapacitorUpdater.getDeviceId()
  return deviceId
}

// Send device ID to your backend
const assignToChannel = async (channel: string) => {
  const deviceId = await getDeviceId()
  // Your backend will call CapGo API to assign the device
  await yourBackend.assignDeviceToChannel(deviceId, channel)
}
```

### 백엔드 구현

백엔드에서 필요한 사항:
1. CapGo 대시보드에서 API 키 얻기
2. CapGo API를 호출하여 기기를 채널에 할당

API 키를 얻는 방법:
1. CapGo 대시보드에 로그인
2. 설정 > API 키로 이동
3. "새 키 생성" 클릭
4. 기기와 채널을 관리하기 위해 `all` 모드 선택
5. 생성된 키를 복사하여 백엔드 환경 변수에 안전하게 저장
   - 키는 32자의 16진수 문자열입니다
   - 클라이언트 측 코드에 절대 노출되어서는 안 되는 비밀 키입니다

Node.js 예제:

```typescript
import axios from 'axios'

const CAPGO_API_KEY = 'your_api_key'
const CAPGO_API_URL = 'https://api.capgo.app'

async function assignDeviceToChannel(deviceId: string, channel: string) {
  try {
    const response = await axios.post(
      `${CAPGO_API_URL}/device`,
      {
        app_id: 'YOUR_APP_ID',
        device_id: deviceId,
        channel: channel
      },
      {
        headers: {
          'authorization': CAPGO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to assign device to channel:', error)
    throw error
  }
}
```

백엔드는 또한:
- 사용자 권한 검증
- 모든 채널 할당 로깅
- 속도 제한 처리
- 실패한 할당에 대한 재시도 로직 구현

### 2. 자체 할당 (덜 안전함)

이 방법은 기기가 직접 채널에 자신을 할당할 수 있게 합니다. 테스트에는 유용하지만 프로덕션에는 덜 안전합니다:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Assign device to channel
const assignToChannel = async (channel: string) => {
  await CapacitorUpdater.setChannel(channel)
}

// Get current channel
const getCurrentChannel = async () => {
  const { channel } = await CapacitorUpdater.getChannel()
  return channel
}
```

사용자가 채널에 자체 할당하기 전에 CapGo 대시보드에서 이 기능을 활성화해야 합니다:

1. CapGo 대시보드의 채널 섹션으로 이동
2. 관리하려는 채널 이름 클릭
3. 채널 설정에서 "기기 자체 연결 허용" 활성화
4. 변경사항 저장

이 설정이 false인 경우, 이 채널로 `setChannel`을 호출하려는 모든 시도가 실패합니다.

## 기능 플래그 구현

채널을 사용하여 기능 접근 제어:

```typescript
const isFeatureEnabled = async (feature: string) => {
  // Example: Check if user is in beta channel
  const channel = await getCurrentChannel()
  return channel === 'beta'
}
```

## A/B 테스트 구현

사용자를 다른 채널에 할당하여 A/B 테스트 실행:

```typescript
const assignToABTest = async (userId: string) => {
  // Use consistent hashing to assign users
  const hash = await hashUserId(userId)
  const variant = hash % 2 === 0 ? 'variant-a' : 'variant-b'
  
  await assignToChannel(variant)
  return variant
}
```

## 모범 사례

1. **백엔드 할당 사용**: 프로덕션에서는 항상 백엔드 할당 방법 사용
2. **일관된 할당**: 일관된 채널 할당을 위해 사용자 ID 또는 기타 안정적인 식별자 사용
3. **모니터링**: 각 채널의 기능 사용량과 성능 지표 추적
4. **점진적 출시**: 작은 사용자 세그먼트로 시작하여 점진적으로 확장
5. **명확한 문서화**: 채널 전략과 목적 문서화

## 결론

CapGo의 채널 시스템을 활용하여 더 개인화된 앱 경험을 만들고 A/B 테스트를 실행할 수 있습니다. 프로덕션 사용에서는 더 나은 보안과 제어를 위해 항상 백엔드 할당 방법을 선호하세요.

채널 관리에 대한 자세한 내용은 [채널 문서](/docs/live-updates/channels/)를 확인하세요.
