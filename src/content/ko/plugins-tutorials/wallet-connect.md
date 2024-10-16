---
locale: ko
---

@capgo/walletconnect 패키지 노래 부르기

`@capgo/walletconnect` 패키지는 WalletConnect를 Ionic Capacitor 앱에 통합하는 기능을 제공합니다. WalletConnect는 분산형 애플리케이션(dApp)이 암호화된 QR 코드를 사용하여 모바일 지갑과 연결할 수 있게 해주는 개방형 프로토콜입니다.

앱에서 `@capgo/walletconnect` 패키지 사용을 시작하려면 아래 단계를 따르세요.

## 1단계: 패키지 설치

```bash
npm install @capgo/walletconnect
```

## 2단계: 패키지 가져오기

`WalletConnect` 기능을 사용하려는 TypeScript 파일에서 패키지를 가져옵니다.

```typescript
import { WalletConnect } from "@capgo/walletconnect";
```

## 3단계: WalletConnect 세션 생성

WalletConnect 세션을 생성하려면 'WalletConnectcreateSession()' 메서드를 사용하세요. 이렇게 하면 사용자가 dApp에서 제공하는 QR 코드를 스캔할 수 있는 QR 코드 스캐너가 열립니다.

```typescript
async function createSession() {
  const session = await WalletConnect.createSession();
  // Handle the session object returned
  console.log("WalletConnect session created:", session);
}
```

## 4단계: 세션 이벤트 수신

WalletConnect 세션과 관련된 이벤트를 수신하려면 'WalletConnectaddListener()' 메서드를 사용하세요. 수신할 수 있는 이벤트 이름은 다음과 같습니다.

- `sessionRequest`: 모바일 지갑에서 세션 요청이 수신되면 트리거됩니다.
- `sessionApproved`: 사용자가 세션 요청을 승인하면 트리거됩니다.
- `sessionConnected`: 세션이 성공적으로 연결되면 트리거됩니다.
- `sessionDisconnected`: 세션 연결이 끊어지면 트리거됩니다.

```typescript
WalletConnect.addListener("sessionRequest", (sessionRequestData) => {
  // Handle the session request data
  console.log("Session request received:", sessionRequestData);
});

WalletConnect.addListener("sessionApproved", () => {
  console.log("Session request approved by user");
});

WalletConnect.addListener("sessionConnected", () => {
  console.log("Session connected");
});

WalletConnect.addListener("sessionDisconnected", () => {
  console.log("Session disconnected");
});
```

## 5단계: 세션 요청 승인

세션 요청이 수신되면 `WalletConnectapproveSession()` 메소드를 호출하여 승인할 수 있습니다.

```typescript
async function approveSession(sessionRequestData) {
  await WalletConnect.approveSession(sessionRequestData);
  // Handle the approved session
  console.log("Session request approved and session connected");
}
```

## 6단계: 세션 가져오기

현재 세션 개체를 가져오려면 `WalletConnectgetSession()` 메서드를 사용하세요.

```typescript
async function getSession() {
  const session = await WalletConnect.getSession();
  console.log("Current WalletConnect session:", session);
}
```

## 7단계: 세션 연결 끊기

현재 세션의 연결을 끊으려면 `WalletConnectdisconnectSession()` 메서드를 사용하세요.

```typescript
async function disconnectSession() {
  await WalletConnect.disconnectSession();
  // Handle the disconnected session
  console.log("Session disconnected");
}
```

그게 다야! 이제 `@capgo/walletconnect` 패키지를 Ionic Capacitor 앱에 성공적으로 통합했으며 WalletConenct 기능을 사용할 수 있습니다.

참고: 위 단계는 `@capgo/walletconnect` 패키지 사용에 대한 기본 개요를 제공합니다. 더 자세한 기능과 옵션은 패키지 설명서를 참조하세요. 안타깝게도 `@capgo 사용에 대한 튜토리얼을 생성하는 데 필요한 정보가 없습니다. /ngx-intl-tel-input-app` 패키지