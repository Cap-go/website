---
slug: how-live-updates-for-capacitor-work
title: Capgo의 라이브 업데이트 작동 방식
description: 'Capgo 라이브 업데이트의 기술적 구현에 대해 자세히 살펴보고, iOS와 Android 양쪽 플랫폼에서의 내부 동작 메커니즘을 이해합니다.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: 라이브 업데이트 아키텍처
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: ko
next_blog: ''
---

# Capgo의 실시간 업데이트 이해하기

실시간 업데이트는 Capacitor 앱의 가장 강력한 기능 중 하나로, 앱 스토어 제출 없이 실시간 업데이트를 가능하게 합니다. Capgo가 이 기능을 구현하는 방법을 자세히 살펴보겠습니다.

## 핵심 개념

Capacitor 앱은 두 가지 주요 계층으로 구성됩니다:

1. **웹 계층**: WebView에 로드되는 HTML, CSS, JavaScript 파일을 포함
2. **네이티브 계층**: 플랫폼별 코드(Android용 Java/Kotlin, iOS용 Swift)를 포함

Capgo의 실시간 업데이트 시스템은 앱 바이너리에 컴파일되지 않은 웹 계층을 런타임에 교체하는 방식으로 작동합니다.

## 기술적 구현

### Capacitor의 서버 경로

Capgo는 두 가지 중요한 경로를 관리합니다:

- **현재 서버 경로**: WebView에 현재 로드된 파일을 가리킴
- **다음 서버 경로**: 다음 앱 재시작 시 로드될 파일을 가리킴

### Android 구현

Android에서 Capgo는 다음을 통해 경로를 관리합니다:

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### iOS 구현

iOS에서 경로는 다음을 통해 관리됩니다:

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## 보안 조치

Capgo는 종단간 암호화를 통해 군사급 보안을 구현하여 개발부터 배포까지 앱 업데이트의 완벽한 보안을 보장합니다. 우리의 암호화 시스템은 전통적인 코드 서명을 넘어 진정한 제로 지식 보안을 제공합니다.

### 종단간 암호화 아키텍처

1. **종단간 암호화(E2EE)**: 모든 업데이트 번들은 개발 환경을 떠나기 전에 AES-256-GCM 암호화를 사용하여 암호화됩니다. 이 군사급 암호화는 전체 전달 과정에서 앱 업데이트의 완벽한 개인정보 보호와 보안을 보장합니다.

2. **제로 지식 아키텍처**: 단순히 업데이트에 서명만 하는 다른 OTA 업데이트 솔루션과 달리, Capgo는 진정한 제로 지식 암호화를 사용합니다. 이는 다음을 의미합니다:
   - 업데이트 내용은 업로드 전에 암호화됨
   - Capgo 서버는 암호화된 데이터만 저장
   - 복호화는 최종 사용자 기기에서만 발생
   - 중간자는 업데이트 내용에 접근할 수 없음

3. **보안 키 관리**: 
   - 암호화 키는 CI/CD 환경에서 안전하게 생성 및 저장
   - 개인 키는 절대 Capgo 서버에 도달하지 않음
   - 각 앱 버전은 고유한 암호화 키 사용 가능
   - 향상된 보안을 위한 키 교체 지원

암호화 시스템에 대해 자세히 알아보기: [Capgo 실시간 업데이트의 종단간 암호화](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### 업데이트 보안 프로세스

1. **업로드 전 암호화**:
   - 업데이트는 CI/CD 파이프라인에서 암호화됨
   - 각 파일은 개별적으로 암호화됨
   - 완벽한 개인정보 보호를 위해 메타데이터도 암호화됨

2. **보안 저장**:
   - 암호화된 번들은 Capgo의 글로벌 CDN에 저장됨
   - 일반 텍스트 데이터는 절대 서버에 도달하지 않음
   - 서버 침해가 발생해도 데이터는 안전함

3. **보안 전달**:
   - 업데이트는 암호화된 채널을 통해 전달됨
   - 각 앱 인스턴스는 암호화 무결성을 검증함
   - 복호화 실패 시 자동 재시도 메커니즘

4. **클라이언트 측 보안**:
   - 업데이트는 설치 전에 검증됨
   - 복호화 실패 시 자동 롤백 트리거
   - 앱의 보호된 저장소에 안전한 키 저장

이 포괄적인 보안 접근 방식은 다음으로부터 앱 업데이트를 보호합니다:
- 중간자 공격
- 서버 측 침해
- 무단 수정
- 재생 공격
- 콘텐츠 변조

## 업데이트 수명 주기

Capgo의 업데이트 프로세스는 기본적으로 자동화되도록 설계되었습니다. 자동 프로세스는 다음과 같이 작동합니다:

### 1. 자동 업데이트 확인

플러그인은 다음 상황에서 자동으로 업데이트를 확인합니다:
- 앱 시작 시

이 동작은 `autoUpdate` 설정으로 제어됩니다:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
`getLatest()`를 사용하여 수동으로도 확인할 수 있습니다.

### 2. 자동 다운로드

새 버전이 감지되고 `autoUpdate`가 활성화된 경우:
1. 다운로드가 자동으로 시작됨
2. 진행 상황이 내부적으로 추적됨
3. 실패한 다운로드는 앱을 열 때마다 자동으로 재시도됨
4.성공적인 다운로드는 앱 스토리지에 저장됩니다

이 프로세스는 이벤트를 통해 모니터링할 수 있습니다:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3 자동 설치

설치 시기는 구성에 따라 다릅니다:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

설치는 다음과 같이 이루어집니다:
- `directUpdate`가 true이면 즉시
- `directUpdate`가 false이면 다음 앱 백그라운드 시
- 설치 실패 시 자동 롤백

플러그인은 자동으로 스토리지를 관리합니다:
- `autoDeleteFailed`가 true이면 실패한 업데이트 제거
- `autoDeletePrevious`가 true이면 이전 버전 정리

### 업데이트 지연

지연 조건을 사용하여 업데이트 설치 시기를 제어할 수 있습니다:

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

사용 가능한 지연 조건:
- **background**: 앱이 백그라운드로 전환될 때 설치
- **date**: 특정 날짜/시간 이후 설치
- **nativeVersion**: 다음 네이티브 업데이트 이후 설치
- **kill**: 앱이 종료된 후 설치

다음과 같은 경우에 유용합니다:
- 비피크 시간대에 업데이트 예약
- 사용자 활동과 업데이트 조정
- 원활한 업데이트 경험 보장
- 중요 작업 중 중단 방지

### 업데이트 상태

자동 프로세스 동안 번들은 다음 상태를 거칩니다:
1. **downloading**: 다운로드 진행 중
2. **pending**: 다운로드 완료, 설치 대기 중
3. **success**: 업데이트 설치 및 활성화
4. **error**: 업데이트 실패 (자동 롤백 트리거)

## 스토어 규정 준수

### Apple App Store ✅

Live Updates는 Apple App Store 정책을 완벽하게 준수합니다. Apple Developer Program 라이선스 계약에 명시된 바와 같이:

> "해석된 코드는 애플리케이션에 다운로드될 수 있지만, 다음과 같은 조건에서만 가능합니다: (a) App Store에 제출된 애플리케이션의 의도된 광고 목적과 일치하지 않는 기능을 제공하여 애플리케이션의 주요 목적을 변경하지 않음, (b) 다른 코드나 애플리케이션을 위한 스토어나 상점을 만들지 않음, (c) OS의 서명, 샌드박스 또는 기타 보안 기능을 우회하지 않음"

Capgo 업데이트는 모든 플랫폼 보안 경계를 존중하면서 웹 레이어만 수정합니다

### Google Play Store ✅

Live Updates는 Google Play 정책을 준수합니다. 기기 및 네트워크 악용 정책에서 구체적으로 명시:

> "이 제한은 WebView나 브라우저의 JavaScript와 같이 Android API에 간접적인 접근을 제공하는 가상 머신이나 인터프리터에서 실행되는 코드에는 적용되지 않습니다"

Capgo는 WebView 콘텐츠만 업데이트하므로 이러한 허용된 지침 내에 속합니다

## 모범 사례

1. **단계적 출시**: 점진적으로 업데이트 배포
2. **버전 관리**: 모든 배포된 버전 추적
3. **롤백 지원**: 문제 발생 시 신속한 복구
4. **델타 업데이트**: 변경된 파일만 다운로드

## Live Updates 사용 시기

적합한 경우:
- 버그 수정
- UI 개선
- 콘텐츠 업데이트
- 기능 토글

부적합한 경우:
- 네이티브 코드 변경
- 주요 버전 업데이트
- 네이티브 변경이 필요한 보안 패치