---
title: 암호화
description: 새로운 암호화 방식으로 데이터 암호화
sidebar:
  order: 5
locale: ko
---

새로운 암호화 시스템으로 데이터를 암호화하고 이전 시스템을 제거하는 방법을 설명합니다.

새로운 암호화 시스템에 대해 [블로그 포스트](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)에서 자세히 알아보세요.

---

먼저, 다음 명령어로 새로운 키 쌍을 생성하세요:

```bash
npx @capgo/cli key create
```

이 명령어는 앱에 새로운 키 쌍을 생성합니다. 개인 키를 안전한 곳에 보관하는 것이 매우 중요합니다. 절대로 개인 키를 소스 컨트롤에 커밋하거나 신뢰할 수 없는 당사자와 공유해서는 안 됩니다.

이 명령어는 Capacitor 설정에서 이전 키를 제거하지만, 이전 키 파일은 제거하지 않습니다. CLI는 앱스토어 업데이트를 받지 않고 이전 플러그인을 계속 사용하는 앱들에 대해 라이브 업데이트를 계속 전송할 수 있도록 이전 키를 유지합니다. 이는 마이그레이션을 용이하게 합니다.

마이그레이션 중에 "이전 앱을 지원하고 마이그레이션을 용이하게 하기 위해 새로운 채널에서 암호화를 설정하시겠습니까?"라는 질문에 동의해 주세요. 이는 Capacitor 설정에 새로운 "defaultChannel" 옵션을 추가할 것입니다. 이로 인해 앱은 "encryption_v2" 채널을 사용하게 됩니다. 이는 새로운 암호화가 이를 지원하는 앱에서만 사용되도록 보장합니다. 앱스토어 업데이트를 받지 않은 앱들은 이전 기본 채널을 계속 사용할 것입니다.

---

이제 JS 번들을 빌드하고 새로운 채널에 업로드해야 합니다. 다음 명령어를 실행하세요:

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

---

그런 다음, 앱이 "encryption_v2" 채널에 자체 할당될 수 있도록 다음 명령어를 실행하세요:

:::caution
이는 새로운 "defaultChannel" 옵션이 작동하기 위해 필요합니다
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

---

이제 앱을 실행할 수 있으며, 새로운 암호화 시스템을 사용하게 됩니다.

이전 채널에 새로운 JS 번들을 업로드하려면 다음 명령어만 실행하면 됩니다:

```bash
npx @capgo/cli bundle upload --channel production
```

---

Capacitor 설정에 대해서는 걱정하지 않아도 됩니다. 이는 절대 Capgo에 업로드되지 않습니다.

모든 사용자가 앱을 업데이트했을 때(3-4개월이 걸릴 수 있음), Capacitor 설정에서 "defaultChannel"을 제거할 수 있습니다.

그리고 다음 명령어로 이전 채널을 제거할 수 있습니다:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

"encryption_v2" 채널을 삭제한 후, 이를 기본값으로 사용하는 모든 앱은 "production" 채널을 사용하기 시작할 것입니다.