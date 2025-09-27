---
slug: biometric-authentication-in-capacitor-apps
title: Capacitor 앱의 생체 인증
description: Capacitor 앱에서 사용자 경험을 향상시키고 민감한 데이터를 보호하기 위해 안전한 생체 인증을 구현하는 방법을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-14T05:13:56.152Z
updated_at: 2025-09-27T23:38:58.000Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/68240bea59ff61289922287e-1747199824736.jpg
head_image_alt: 모바일 개발
keywords: >-
  biometric authentication, Capacitor, mobile security, fingerprint, facial
  recognition, app development
tag: 'Development, Mobile, Security'
published: true
locale: ko
next_blog: ''
---
[생체 인증](https://capgo.app/plugins/capacitor-native-biometric/)은 사용자가 암호 대신 지문, 얼굴 또는 기타 생체 특징을 사용하여 앱에 안전하게 접근할 수 있게 해줍니다. [Capacitor](https://capacitorjs.com/)로 작업하는 개발자의 경우 이 기능을 구현하는 것은 간단하며 iOS와 Android 모두에서 작동합니다. 다음은 간단한 요약입니다:

-   **생체 인증을 사용하는 이유?**
    
    -   암호보다 더 안전합니다.
    -   로그인을 더 빠르게 하여 사용자 경험을 개선합니다.
    -   민감한 데이터에 대한 보안 표준을 충족합니다.
-   **지원되는 방법:**
    
    -   지문: 빠르고 일반적임.
    -   얼굴 인식: 핸즈프리 옵션.
    -   홍채 스캔: 고보안 사용 사례(제한된 기기).
    -   음성 인식: 접근성 중심(제한된 지원).
-   **필요한 주요 도구:**
    
    -   Capacitor 3.0+.
    -   `@capawesome-team/capacitor-biometrics` 또는 `capacitor-native-biometric` 같은 플러그인.
-   **설정 하이라이트:**
    
    -   AndroidManifest와 Info.plist에 권한 추가.
    -   보안 저장을 위해 Keychain(iOS) 또는 Keystore(Android) 사용.
    -   호환성과 대체 옵션에 대한 철저한 테스트.

### 플러그인 빠른 비교

| 플러그인 이름 | Capacitor 버전 | 기능 | 최적 사용처 |
| --- | --- | --- | --- |
| `@aparajita/capacitor-biometric-auth` | Capacitor 7 | 네이티브 생체인식, 기기 자격증명 | Capacitor 7을 사용하는 새 프로젝트 |
| `capacitor-native-biometric` | Capacitor 3, 4 | 보안 자격증명 저장, Keychain/Keystore | 자격증명 관리 |
| `@capawesome-team/capacitor-biometrics` | 모든 버전 | 생체인식 및 기기 자격증명 지원 | 유연한 인증 옵션 |

[Capacitor 앱의 생체 인증](https://capgo.app/plugins/capacitor-native-biometric/)은 민감한 데이터를 보호하는 안전하고 사용자 친화적인 방법입니다. 전체 문서에서는 설정 단계, 코드 예제, 테스트 전략 및 보안 표준에 대해 자세히 설명합니다.

## Ionic 생체 인증 (FaceID / 지문) 인증

<iframe src="https://www.youtube.com/embed/GGWiDj1cusE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 설정 요구사항

[Capacitor 앱](https://capgo.app/plugins/ivs-player/)에서 생체 인증을 활성화하려면 일부 도구, 종속성 및 플랫폼별 설정을 구성해야 합니다. 아래에서 Android와 iOS 플랫폼 모두에 대한 단계별 설정 요구사항을 확인할 수 있습니다.

### 필요한 도구 및 종속성

구현을 시작하기 전에 다음 도구와 종속성이 준비되어 있는지 확인하세요:

| 구성 요소 | 최소 버전 | 용도 |
| --- | --- | --- |
| **Capacitor** | 3.0 이상 | 코어 프레임워크 |
| **[Node.js](https://nodejs.org/en)** | 최신 LTS | 패키지 관리 |
| **[Xcode](https://developer.apple.com/xcode/)** | 최신 버전 | iOS 개발 |
| **[Android Studio](https://developer.android.com/studio)** | 최신 버전 | Android 개발 |
| **실제 기기** | iOS 13+ / Android API 23+ | 생체인식 기능 테스트 |

Capacitor 버전에 따라 [생체인식 플러그인](https://capgo.app/plugins/capacitor-native-biometric/)을 선택하세요:

-   Capacitor 7용 **@aparajita/capacitor-biometric-auth**
-   Capacitor 3 및 4용 **capacitor-native-biometric**
-   추가 기기 자격증명 지원을 위한 **@capawesome-team/capacitor-biometrics**

### Android 설정 단계

Android에서 생체 인증을 구성하려면 프로젝트 파일을 몇 가지 조정해야 합니다:

1.  **매니페스트 구성**
    
    `AndroidManifest.xml` 파일에 다음 권한을 추가하세요:
    
    ```xml
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <!-- For Android 9 (API 28) or lower -->
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    ```
    
2.  **Gradle 설정**
    
    앱의 `build.gradle` 파일에 필요한 생체인식 종속성을 포함하도록 업데이트하세요:
    
    ```kotlin
    dependencies {
        implementation "androidx.biometric:biometric:1.1.0"
    }
    ```
    
3.  **플러그인 등록**
    
    `MainActivity.java` 파일에 생체인식 플러그인을 등록하세요:
    
    ```java
    public class MainActivity extends BridgeActivity {
        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            registerPlugin(NativeBiometricPlugin.class);
        }
    }
    ```
    

### iOS 설정 단계

iOS의 경우 생체 인증을 구성하기 위해 다음 단계를 따라야 합니다:

1.  **Info.plist 구성**
    
    `Info.plist` 파일에 필요한 사용 설명을 추가하세요:
    
    ```xml
    <key>NSFaceIDUsageDescription</key>
    <string>Authentication required for secure access</string>
    ```
    
2.  **Keychain 구성**
    
    Xcode에서 Keychain 기능을 활성화하세요:
    
    -   프로젝트 설정을 엽니다.
    -   **Signing & Capabilities** 탭으로 이동합니다.
    -   **Keychain Sharing** 기능을 추가합니다.
    -   필요한 경우 접근 그룹을 구성합니다.
3.  **인증 정책**
    
    다음을 처리하기 위한 로컬 인증 정책을 설정하세요:
    
    -   인증 시도 실패
    -   기기 패스코드로의 대체
    -   생체인식 가용성 확인
    
    보안 강화를 위해 iOS Keychain을 사용하여 민감한 데이터를 저장하세요. 이는 Touch ID와 Face ID 모두와의 호환성을 보장하면서 사용자 자격증명을 보호합니다.
    

## 코드 구현

설정 구성이 완료되면 다음 단계는 보안 코드를 구현하는 것입니다. 이는 올바른 플러그인을 선택하고 신뢰할 수 있는 인증 흐름을 만드는 것을 포함합니다.

### 플러그인 선택 가이드

Capacitor 앱용 생체 인증 플러그인을 선택할 때는 프로젝트의 특정 요구사항에 맞춰야 합니다. 다음은 인기 있는 옵션들입니다:

| 플러그인 이름 | Capacitor 버전 | 주요 기능 | 최적 사용처 |
| --- | --- | --- | --- |
| @aparajita/capacitor-biometric-auth | Capacitor 7 | 네이티브 생체인식, 기기 자격증명, 포괄적 API | Capacitor 7로 시작하는 새 프로젝트 |
| capacitor-native-biometric | Capacitor 3, 4 | 보안 자격증명 저장, Keychain/Keystore 통합 | 자격증명 관리가 필요한 기존 프로젝트 |
| @capawesome-team/capacitor-biometrics | 모든 버전 | 생체인식 및 기기 자격증명 인증, 깔끔한 API | 유연한 인증 옵션이 필요한 프로젝트 |

### 인증 코드 예제

**@capawesome-team/capacitor-biometrics** 플러그인을 사용한 생체 인증 방법입니다:

```typescript
import { Biometrics } from '@capawesome-team/capacitor-biometrics';

async function setupBiometricAuth() {
  try {
    const { isAvailable } = await Biometrics.isBiometricsAvailable();

    if (!isAvailable) {
      return {
        success: false,
        message: "Biometric authentication not available"
      };
    }

    const result = await Biometrics.authenticate({
      reason: "Access your secure data",
      title: "Verify Identity",
      subtitle: "Use biometrics to authenticate",
      cancelTitle: "Use Password Instead"
    });

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

보안 자격증명 관리를 위해 **capacitor-native-biometric** 플러그인은 간단한 접근 방식을 제공합니다:

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

async function secureCredentialStorage(credentials) {
  try {
    await NativeBiometric.setCredentials({
      username: credentials.username,
      password: credentials.password,
      server: "api.yourserver.com"
    });

    // Verify storage by retrieving the credentials
    const stored = await NativeBiometric.getCredentials({
      server: "api.yourserver.com"
    });

    return stored.username === credentials.username;
  } catch (error) {
    console.error("Credential storage failed:", error);
    return false;
  }
}
```

코드가 준비되면 적절한 테스트를 통해 기능을 검증하는 것이 중요합니다.

### 테스트 방법

생체 인증이 신뢰할 수 있고 안전한지 확인하기 위해 다음 테스트 전략을 고려하세요:

-   **기기 호환성 테스트**
    
    다양한 기기와 조건에서 인증이 작동하는지 확인하세요:
    
    ```typescript
    async function runCompatibilityTests() {
      const tests = {
        biometricAvailable: await Biometrics.isBiometricsAvailable(),
        credentialStorage: await testCredentialStorage(),
        authenticationFlow: await testAuthFlow(),
        fallbackMechanism: await testFallbackAuth()
      };
    
      return tests;
    }
    ```
    
-   **오류 처리 및 일반 시나리오**
    
    오류를 시뮬레이션하고 대체 메커니즘을 테스트하세요:
    
    ```typescript
    async function validateErrorHandling() {
      try {
        await Promise.race([
          Biometrics.authenticate(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 30000)
          )
        ]);
      } catch (error) {
        return implementFallbackAuth();
      }
    }
    ```
    
-   **보안 검증**
    
    구현이 보안 표준을 충족하는지 확인하세요:
    
    ```typescript
    async function validateSecurityMeasures() {
      const validations = {
        keychain: await validateKeychainAccess(),
        biometricStrength: await checkBiometricStrength(),
        encryptionStatus: await verifyEncryption()
      };
    
      return validations.keychain &&
             validations.biometricStrength &&
             validations.encryptionStatus;
    }
    ```
    

추가로 다음과 같은 시나리오를 테스트하세요:

-   여러 번의 인증 시도 실패
-   기기 재시작 후 동작
-   앱 포그라운드와 백그라운드 상태 전환
-   네트워크 연결 변경
-   시스템 생체인식 설정 변경

철저한 테스트는 생체 인증 시스템이 실제 사용에 준비되었음을 보장합니다.

## 보안 표준

생체 인증의 강력한 보안을 보장하기 위해서는 데이터 보호를 우선시하고, 규정 준수를 지키며, 계층화된 보안 기술을 적용해야 합니다.

### 데이터 보안 방법

iOS에서는 생체 데이터가 **Keychain**을 사용하여 암호화되고 저장되며, Android에서는 **Keystore**를 사용합니다. `capacitor-native-biometric` 플러그인을 사용하는 경우 다음과 같이 사용자 자격증명을 안전하게 저장할 수 있습니다:

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

async function securelyStoreCredentials(username, password) {
  const server = "api.yourapp.com";

  // Use the highest available encryption
  await NativeBiometric.setCredentials({
    username,
    password,
    server,
    authenticationType: "biometricAndDevice",
    accessControl: "biometryAny"
  });
}
```

데이터 전송의 경우 항상 **종단간 암호화**를 구현하여 민감한 정보를 보호하세요.

### 스토어 가이드라인

앱 스토어는 [생체 보안](https://capgo.app/plugins/capacitor-native-biometric/)에 대해 엄격한 규칙을 적용합니다. 주요 플랫폼 요구사항은 다음과 같습니다:

| 플랫폼 | 주요 요구사항 | 구현 참고사항 |
| --- | --- | --- |
| iOS | LocalAuthentication 프레임워크 사용, 대체 옵션 제공, 명확한 사용자 동의 보장 | Face ID와 Touch ID 모두 지원해야 함 |
| Android | BiometricPrompt API 활용, 명시적 사용자 권한 획득, 보안 수준 선언 | 지문과 얼굴 인식 지원, 다양한 보안 수준에 대한 구분 |

### 다중 요소 설정

보안을 강화하기 위해 [생체 인증](https://capgo.app/plugins/capacitor-native-biometric/)을 추가 인증 계층과 결합하는 것이 종종 필요합니다. 예를 들어, 초기 [생체 인증](https://capgo.app/plugins/capacitor-native-biometric/) 후 사용자의 신원을 확인하는 보조 단계를 추가할 수 있습니다:

```typescript
async function setupMultiFactorAuth() {
  // First factor: Biometric verification
  const biometricResult = await Biometrics.authenticate({
    reason: "Verify your identity",
    title: "Authentication Required"
  });

  if (biometricResult.verified) {
    // Second factor: Time-based OTP or similar mechanism
    const totpResult = await verifyTOTP();
    return totpResult.success;
  }

  return false;
}
```

다중 요소 접근 방식은 일반적으로 다음을 포함합니다:

-   **기본 생체 인증**
-   **보조 인증** (예: SMS 코드 또는 인증기 앱)
-   **추가 보안을 위한 거래별 확인**

Capgo를 라이브 업데이트에 사용하는 경우, **종단간 암호화** 기능을 활용하여 보안 표준을 준수하세요. 이는 업데이트 중에도 생체 인증 방법이 안전하게 유지되고 플랫폼 요구사항에 부합하도록 보장합니다 [\[1\]](https://capacitor-tutorial.com/plugins/capacitor-biometric-auth/).

## 유지보수 가이드

속도, 배터리 효율성 

Capgo는 생체 인증 업데이트를 단순화합니다. 다음과 같이 구성하세요:

```typescript
// Efficient authentication implementation
async function optimizedBiometricCheck() {
  const authResult = await NativeBiometric.isAvailable();

  if (!authResult.isAvailable) {
    return handleFallback();
  }

  // Cache authentication state to avoid unnecessary re-checks
  if (this.cachedAuthState && !this.isAuthExpired()) {
    return this.cachedAuthState;
  }

  return NativeBiometric.verifyIdentity({
    reason: "Verify your identity",
    title: "Authentication Required",
    maxAttempts: 3
  });
}
```

Capgo가 업데이트 관리에 훌륭한 도구인 이유는 다음과 같습니다:

-   **즉각적인 배포**: 중요한 보안 수정사항과 새로운 기능을 지연 없이 배포할 수 있습니다.
-   **단계적 출시**: 모든 사용자에게 배포하기 전에 선택된 사용자 그룹으로 업데이트를 테스트할 수 있습니다.
-   **버전 관리**: 더 나은 관리를 위해 다양한 인증 버전을 추적할 수 있습니다.
-   **긴급 롤백**: 문제가 발생하면 이전 버전으로 신속하게 되돌릴 수 있습니다.

### API 업데이트

생체 인증 API를 최신 상태로 유지하는 것은 보안과 기능성을 위해 매우 중요합니다. 다음 가이드라인에 따라 업데이트를 사전에 관리하세요:

| 업데이트 유형 | 모니터링 방법 | 구현 일정 |
| --- | --- | --- |
| 보안 패치 | 플러그인 저장소 알림 | 24시간 |
| 기능 업데이트 | 플랫폼 문서 | 1주일 |
| 주요 변경사항 | 릴리스 노트 | 2-4주 |
| 스토어 정책 업데이트 | 개발자 포털 | 제출 전 |

다음 영역에 집중하세요:

-   **플러그인 업데이트**: `@capawesome-team/capacitor-biometrics`와 같은 종속성을 정기적으로 업데이트하세요.
-   **플랫폼 변경사항**: iOS의 LocalAuthentication과 Android의 BiometricPrompt API 업데이트를 추적하세요.
-   **보안 표준**: 최신 생체 인증 보안 요구사항을 준수하세요.
-   **스토어 가이드라인**: 제출 문제를 피하기 위해 Apple App Store와 Google Play 정책을 준수하세요.

## 결론

### 주요 포인트

Capacitor 앱에 생체 인증을 추가하는 것은 보안, 성능, 사용자 경험의 균형을 맞추는 것입니다. 다음은 기억해야 할 핵심 요소들입니다:

| **구성 요소** | **구현 중점** | **주요 고려사항** |
| --- | --- | --- |
| **보안 표준** | 플랫폼 네이티브 저장소 (Keychain/Keystore) | 종단간 암호화, 자격증명 보호 |
| **플러그인 선택** | 최신 버전 호환성 | 다양한 생체 인증 유형 지원 |
| **업데이트 관리** | 정기적인 유지보수 주기 | 보안 패치의 신속한 배포 |
| **사용자 경험** | 대체 인증 옵션 | 명확하고 사용자 친화적인 인증 프롬프트 |

이러한 구성 요소들이 성공적인 통합을 위한 로드맵입니다.

### 생체 인증 구현 단계

앱에 생체 인증을 통합하려면 다음 단계를 따르세요:

-   **플러그인 통합**  
    Capacitor 버전과 일치하는 생체 인증 플러그인을 선택하세요. `AndroidManifest.xml`과 `Info.plist` 같은 구성 파일이 올바르게 설정되어 있는지 확인하세요. 안전한 자격증명 저장을 위해 Keychain이나 Keystore와 같은 네이티브 솔루션을 사용하세요.
    
-   **보안 구성**  
    모든 자격증명 전송에 대해 종단간 암호화를 활성화하여 사용자 데이터를 보호하세요. 필요한 경우 추가 보안 계층을 위해 [다중 인증](https://capgo.app/docs/webapp/mfa/)을 포함하세요. 오류 발생 시 기능을 유지하기 위한 강력한 오류 처리와 대체 옵션을 계획하세요.
    
-   **지속적인 유지보수**  
    보안 패치를 위한 정기적인 업데이트 파이프라인을 설정하여 앱을 안전하게 유지하세요. 플러그인 업데이트를 확인하고 보안 권고사항을 모니터링하세요. Capgo와 같은 도구를 사용하면 즉각적인 업데이트가 가능하여 이 과정을 단순화할 수 있습니다. Capgo는 24시간 내 95%의 사용자 업데이트율을 자랑하여 도구킷에 가치있는 추가사항입니다 [\[2\]](https://capgo.app).
    

> "Capgo는 더 생산적이고자 하는 개발자들에게 필수 도구입니다. 버그 수정을 위한 검토를 피할 수 있다는 것이 큰 장점입니다." - Bessie Cooper [\[2\]](https://capgo.app)

## FAQ

:::faq
### Capacitor 생체 인증 플러그인들의 차이점은 무엇이며, 내 앱에 가장 적합한 것을 어떻게 선택할 수 있나요?

Capacitor 앱용 생체 인증 플러그인을 선택할 때는 프로젝트의 특정 요구사항과 일치시키는 것이 중요합니다. **플랫폼 호환성**(iOS, Android 또는 둘 다 지원이 필요한지), 통합 과정의 단순성, 그리고 플러그인이 **Face ID**나 **지문 인증**과 같은 고급 생체 인증 방법을 지원하는지와 같은 요소들을 고려하세요.

이 가이드는 [Capacitor 앱](https://capgo.app/blog/capacitor-comprehensive-guide/)에서 생체 인증 구현에 중점을 두지만, **Capgo**와 같은 도구도 중요한 역할을 할 수 있습니다. 앱 스토어 승인 없이도 실시간 업데이트를 푸시할 수 있어, 앱이 Apple과 Android 표준을 준수하면서도 생체 인증 업데이트를 포함한 최신 보안 기능을 유지할 수 있습니다.
:::

:::faq
### Capacitor 앱의 생체 인증이 보안 표준과 앱 스토어 가이드라인을 충족하도록 하려면 어떻게 해야 하나요?

Capacitor 앱의 생체 인증이 현재 보안 표준과 앱 스토어 규칙을 충족하도록 하려면 다음과 같은 핵심 사항들을 지켜야 합니다:

-   **신뢰할 수 있는 플러그인 선택**: Capacitor의 `@capacitor/biometrics`와 같은 신뢰할 수 있는 생체 인증 플러그인을 사용하여 앱이 안전하고 기기 간에 원활하게 작동하도록 보장하세요.
-   **플랫폼 규칙 준수**: 사용자 동의 획득, 안전한 저장소 사용, PIN이나 비밀번호와 같은 백업 옵션 제공 등 Apple과 Android 가이드라인을 준수하세요.
-   **종속성 업데이트 유지**: 취약점을 수정하고 변화하는 표준에 맞추기 위해 앱과 라이브러리를 정기적으로 업데이트하세요.

**Capgo**와 같은 실시간 업데이트 서비스를 사용하면 이 과정이 더 원활해질 수 있습니다. 앱 스토어 승인 지연을 우회하여 보안 업데이트나 개선사항을 즉시 푸시할 수 있어, 앱이 안전하고 Apple과 Android 정책을 준수하며 최신 상태를 유지할 수 있습니다.
:::

:::faq
### 개발자들이 Capacitor 앱에 생체 인증을 통합할 때 직면할 수 있는 과제는 무엇이며, 어떻게 극복할 수 있나요?

Capacitor 앱에 생체 인증을 구현하는 것은 여러 과제가 따릅니다. 여기에는 기기 간 호환성 보장, 사용자 권한 효과적인 관리, 민감한 데이터의 안전한 처리 등이 포함됩니다. 다음은 이러한 문제를 해결하는 방법입니다:

-   **기기 호환성**: Android와 iOS 모두에서 생체 인증 기능을 지원하기 위해 `@capacitor-fingerprint-auth`와 같은 플러그인 사용을 고려하세요. 이러한 도구는 플랫폼 간의 격차를 해소하여 앱이 다양한 기기에서 원활하게 작동하도록 돕습니다.
    
-   **사용자 권한**: 앱이 생체 인증 접근이 필요한 이유를 명확히 설명하는 것이 중요합니다. 사용자에게 투명한 정보를 제공하고, 사용자가 권한을 부여하지 않기로 선택할 때 앱이 우아하게 처리하도록 설계하세요.
    
-   **데이터 보안**: 인증 데이터 보호는 매우 중요합니다. [암호화 모범 사례](https://capgo.app/docs/cli/migrations/encryption/)를 따르고 각 플랫폼이 제공하는 보안 가이드라인을 준수하여 민감한 정보가 안전하게 유지되도록 하세요.
    

생체 인증 기능과 관련된 업데이트나 문제를 앱 스토어 승인 없이 해결하려면 Capgo와 같은 도구를 사용할 수 있습니다. 이를 통해 실시간 업데이트가 가능하며, Apple과 Android 정책을 준수하면서도 버그를 신속하게 해결하거나 기능을 개선할 수 있습니다.
:::
