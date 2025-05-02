---
slug: 자체 호스팅 실시간 업데이트
title: 자체 호스팅 라이브 업데이트
description: Capgo의 Live Updates의 다음 버전인 Self-hosted Live Updates를 발표하게 되어 기쁩니다!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: 자체 호스팅 업데이트
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: ko
next_blog: ''
original_slug: self-hosted-live-updates
---
캡고의 Live Updates의 최신 진화인 Self-hosted Live Updates 출시를 발표하게 되어 기쁩니다.

현재 많은 기업들이 Live Updates SDK를 사용하여 애플리케이션의 최신 JavaScript, HTML 및 CSS 업데이트에 접근하고 있지만, 일부는 기업 정책, 산업 규제 또는 지리적 제한으로 인해 어려움을 겪을 수 있습니다. Self-hosted Live Updates를 통해 이제 귀사의 인프라를 통해 웹 빌드 아티팩트를 배포할 수 있습니다.

이는 Apple Store 리뷰로 인한 지연을 피하고, 버그를 더 빠르게 수정하고 콘텐츠를 수정할 수 있으며, 사용자가 항상 앱의 최신 버전을 사용할 수 있도록 보장한다는 것을 의미합니다. 또한, 엄격한 컴플라이언스 기준으로 인해 Live Updates 활용에 어려움을 겪는 많은 대기업들의 이야기를 들었습니다. Self-hosted Live Updates 덕분에 이 문제는 이제 과거의 일이 되었습니다.

## 자체 호스팅 라이브 업데이트는 어떻게 작동하나요?

[Capgo SDK](https://github.com/Cap-go/capacitor-updater/)를 사용하여 Capgo 호스팅 Live Updates를 배포하는 것은 매우 간단합니다. Self-hosted Live Updates의 경우, 귀사의 인프라에서 구성할 수 있도록 Capgo CLI에 필요한 기능을 추가했습니다.

최신 웹 빌드 아티팩트를 최종 사용자에게 안전하고 조율된 방식으로 전달하기 위해, Capgo는 이제 Capacitor Live Updates 플러그인이 공개/개인 키 쌍을 사용할 수 있도록 합니다. Self-hosted Live Updates를 사용할 때, 플러그인이 기업의 인프라에서 다운로드한 아티팩트가 수정되지 않았다는 것을 보장하기 위해 추가적인 핸드셰이크가 수행됩니다.

![Capgo encryption schema](/encryption_flow.webp)

다음은 키 쌍을 설정하고 최종 사용자에게 업데이트된 경험을 전달하는 후속 프로세스를 설명합니다.

### 일회성 키 쌍 설정

기업은 다음 Capgo Cloud CLI 명령을 사용하여 공개/개인 키 쌍을 생성할 수 있습니다:

```shell
npx @capgo/cli@latest key create
```

이 명령은 구성 파일에 `CapacitorUpdater.privateKey` 속성을 설정합니다.
그리고 프로젝트 루트 디렉토리에 `capgo_key.pub`와 `capgo_key` 두 개의 키 파일을 생성합니다.

이 키 쌍은 업데이트를 서명하고 앱 측에서 업데이트를 확인하는 데 사용됩니다.

### 자체 호스팅 라이브 업데이트 워크플로우

Self-hosted Live Updates를 구현하기 위해, 기업은 먼저 버그 수정, 콘텐츠 업데이트 또는 변경하고자 하는 다른 웹 기반 코드의 웹 빌드를 수행해야 합니다. 그 다음, 일회성 설정 프로세스에서 얻은 개인 키를 사용하여 빌드 아티팩트에 서명하고, 마지막으로 번들을 원하는 저장소 위치에 업로드해야 합니다.

먼저 코드를 빌드하세요:
```shell
npm run build
```

그런 다음 빌드를 압축하세요:
```shell
npx @capgo/cli@latest bundle zip
```

그리고 zip 파일을 암호화하세요:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

이 명령은 ivSessionKey를 출력할 것입니다. 다음 단계를 위해 이를 저장해야 합니다.

이제 암호화된 zip 파일을 기업 저장소에 업로드하고 zip 파일의 URL을 얻으세요.

새로운 Live Update가 사용 가능하다는 것을 Capgo에 알려야 합니다. 이는 다른 CLI 명령을 통해 수행됩니다:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

명령이 실행되면, Capgo는 배포할 준비가 된 새로운 업데이트를 인식합니다. 이제 앱이 시작될 때, Live Updates 플러그인은 다운로드해야 할 변경 사항이 있는지 Capgo에 확인합니다.

Capgo는 플러그인에 "예, 업데이트가 가능합니다"라고 응답하고, Live Updates 플러그인은 `register` CLI 명령에서 제공된 URL 위치를 사용하여 새로운 라이브 업데이트를 다운로드합니다:

```shell
https://abc.com/app/updates/abc123.zip
```

조직의 API가 해당 위치에서 Live Update 번들을 반환하면, 앱이 zip을 복호화하고 라이브 업데이트를 적용합니다. 완료되었습니다!

## 시작하기

이전보다 더 많은 기업에 Live Updates를 제공할 수 있게 되어 매우 기쁩니다. 조직과 Ionic 앱 사용자 모두 Capgo의 안전한 over-the-air 앱 업데이트 배포의 장점을 빠르게 인식할 것입니다.

Capgo의 Self-hosted Live Updates에 대한 자세한 정보는 [문서를 확인](/docs/cli/commands/#upload-version)하실 수 있습니다. 사용자에게 즉시 앱 업데이트를 배포할 준비가 되셨나요? [지금 등록하세요!](/register/)
