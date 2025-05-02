---
slug: Rapido Cloud에서 CapGo-CapacitorUpdater로 시맨틱 릴리스를 관리하는 방법
title: Capgo CapacitorUpdater와 함께 Rapido Cloud가 시맨틱 릴리스를 관리하는 방법
description: >-
  CapGo CapacitorUpdater를 사용하는 내 애플리케이션의 릴리스를 관리하기 위해 semantic release를 설정하는
  방법입니다
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: 스터디 케이스 Rapido 클라우드
keywords: >-
  semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Case Study
published: true
locale: ko
next_blog: ''
original_slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
---
## 1. 소개

Rapido Cloud(www.rapido.cloud)에서 Salesforce 클라이언트들이 Salesforce Mobile SDK나 Salesforce Mobile Publisher의 복잡한 과정 없이도 자체 브랜드 모바일 애플리케이션을 쉽게 배포할 수 있는 모바일 애플리케이션을 개발하고 있습니다.

이 모바일 앱은 Ionic 8, Angular 18, TypeScript, Capacitor 그리고 최근에는 CapGo CapacitorUpdater를 포함한 현대적이고 "표준적인" 플랫폼에서 널리 사용되는 컴포넌트와 도구들로 개발되었습니다. 이는 Lightning Web Components와 같은 Salesforce 플랫폼 특화 기능을 관리하고 싶지 않은 클라이언트들에게 더 간단하며, 제게는 Ionic + Angular 모바일 애플리케이션 개발자와 유지보수 인력을 구하는 것이 더 쉽고 저렴합니다.

이 글에서는 CapGo와 `semantic-release`를 Github Actions를 통해 모든 배포를 자동으로 관리하는 매우 성공적인 명확한 솔루션으로 만드는 제 설계, 선택, 그리고 구현에 대해 설명합니다. 이 모든 것은 CapGo CapacitorUpdater의 14일 무료 체험 기간 동안 설계, 테스트 및 문서화되었습니다.

## 2. 왜 CapGo를 사용하나요? 왜 semantic-release를 사용하나요?

CapGo CapacitorUpdater는 표준 Apple AppStore/Google PlayStore 배포 과정보다 모바일 앱 배포를 훨씬 더 단순하고, 빠르며 유연하게 만들겠다는 약속으로 저를 매료시켰습니다.
이는 제가 스토어에 출시하는 첫 모바일 애플리케이션입니다. 과거에는 주로 Salesforce Experience Cloud에서 개발된 웹 앱에 집중했었죠.

성공적으로 만들기 위한 학습 곡선이 다소 두려웠지만, Apple TestFlight에 앱을 꽤 쉽게 올릴 수 있었습니다. 그 후 CapGo CapacitorUpdater를 사용하여 업데이트를 훨씬 더 빠르게 배포할 수 있게 되었습니다.

제 첫 번째 요구사항과 테스트 케이스는 Ionic이 제안하는 Nexus 모바일 브라우저를 통해 모바일 에뮬레이터나 시뮬레이터에서 테스트하는 대신, 실제 모바일 앱으로 제 폰에서 직접 테스트하는 것이었습니다. 제 앱이 위치정보나 사진 갤러리, 카메라 접근과 같은 네이티브 기능을 사용하기 때문입니다. Capacitor 모바일 앱을 테스트해본 경험이 없었기에, 모든 것이 제대로 작동할지 확신할 수 없었습니다. 실제 앱을 실제 조건에서 테스트하는 것만큼 좋은 것은 없죠!

그래서 CapGo CapacitorUpdater는 소스 코드에 새로운 기능이나 수정사항을 저장한 후 1분 만에 제 모바일에서 애플리케이션을 업데이트할 수 있게 도와주었습니다. 정말 안심이 되고, 매우 유연하며, 설정하기도 쉽습니다!

## 3. 제 브랜칭과 릴리스 모델, 그리고 semantic-release의 적용 방법

이제 CapGo 서버로의 배포가 정상적으로 작동하므로, 이를 자동화하고 CI/CD 파이프라인에 맞춰야 합니다.

### 브랜칭과 릴리스 모델을 이렇게 구성했습니다

모바일, 웹 또는 Salesforce 등 모든 애플리케이션에 대해:
- **개발**은 `main`에서 분기된 `feature/...` 브랜치에서 수행되며, 이들은 대부분의 개발 브랜치의 기준이 되는 `main`으로 병합됩니다(유지보수와 커스텀 배포를 위한 특정 기능은 제외)
- **배포는 __릴리스 브랜치로부터__ 트리거됩니다** 여기에는: `production`, 프리릴리스 브랜치(`alpha`, `beta`, `nightly` 등)와 고객별 또는 컨텍스트별 커스텀 배포를 위한 브랜치가 포함됩니다
- **배포는 풀 리퀘스트**가 배포 브랜치에 병합될 때 트리거됩니다. semantic release가 태그와 나머지 모든 것을 관리하기 때문에 태그 트리거 배포는 사용하지 않습니다.

기본적으로 이는 Gitlab Flow입니다:

![Gitlab Flow](/RBW_Gitlab_Flow.webp)

*Gitlab Flow - 출처 https://faun.dev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### semantic-release 작동 방식에 대한 부가 설명:

배포 브랜치에서 semantic-release가 트리거되면, 해당 브랜치의 이전 태그 버전 번호와 배포된 수정사항 또는 기능에 따라 이 브랜치의 새 버전 번호를 자동으로 계산합니다. 수정사항은 새로운 패치 버전을 생성하고, 기능은 새로운 마이너 버전을 생성합니다. 또한 버전 번호에 프리릴리스 `alpha`, `beta` 등을 자동으로 포함합니다.

Semantic release는 conventional commits에 정의되고 semantic release에서 구성된 대로 수정사항과 기능을 그룹화하여 커밋에서 변경 로그를 생성합니다 (https://www.conventionalcommits.org/en/about 참조).

또한 태그와 릴리스에 연결하는 댓글로 모든 git(제 경우 Github) 병합된 풀 리퀘스트와 관련 이슈를 업데이트합니다. 마지막으로, 이 Github 릴리스에 소스 코드, 필요한 경우 바이너리, `CHANGELOG.md` 등의 자산을 첨부합니다.

## 4. semantic release와 CapGo의 브랜치, 릴리스/프리릴리스, 채널

semantic release가 CapGo 배포를 위해 수행하기를 원하는 작업은 다음과 같습니다.

### semantic release가 버전 번호를 생성하기를 원합니다

CapGo는 자체 포크한 레포 `standard-version` (https://github.com/Cap-go/standard-version)과 `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) 및 `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version) 레포와 함께 "Conventional Commits" `standard-version` 도구의 자체 버전을 개발하고 문서화했습니다. 그들은 블로그에서 CapGo 배포에서 사용되는 버전 체계를 문서화했습니다 (https://capgo.app/blog/how-version-work-in-capgo/). JavaScript 번들은 `semantic-release`도 따르는(당연히!) "표준" semver "Semantic Versioning" (https://semver.org)을 따릅니다.

그래서 이는 매우 좋고, `semantic-release`를 광범위하게 사용하는 제게는 안도가 됩니다.

### 또한 semantic release가 다른 채널에서 앱 배포를 생성하기를 원합니다

앞서 언급했듯이, `alpha`, `beta`, `nightly` 등과 같은 브랜치에서 프리릴리스 버전을 배포해야 하지만, `production-customer-jones`, `production-customer-doe` 등과 같은 고객별 버전도 브랜치에 배포해야 합니다.

CapGo는 semantic release도 지원하는 "channels" 기능을 제공하므로, 이들을 함께 작동시키는 것이 기대됩니다. 이들은 또한 XCode Cloud에서 관리하는 다른 브랜치 빌드와도 잘 맞습니다(이에 대해서는 아래에서 자세히 설명).

프리릴리스에서 semantic release가 생성하는 Semver 버전 번호는 `1.0.0-alpha.1`과 같습니다. 이 브랜치에서 연속적인 빌드는 빌드 번호를 `1.0.0-alpha.2` 등으로 증가시킵니다. 명시적으로 문서화되지는 않았지만, 이러한 버전 번호는 CapGo에서 지원되어 제게는 좋은 소식입니다: Capgo 채널과 함께 semantic release 채널과 프리릴리스를 사용하여 앱의 버전을 생성할 것입니다.

## 5. CapGo를 사용하여 어떻게 애플리케이션을 릴리스할 수 있나요?

CapGo에 앱 번들 배포를 자동화하려면 CapGo CLI 명령 `bundle upload`를 사용해야 합니다. 수많은 업로드 옵션을 보려면 `npx @capgo/cli@latest bundle upload --help`를 입력하세요. 그 중에서 다음을 사용할 것입니다:
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```
- CHANNEL은 배포하려는 CapGo 채널입니다(예: `alpha`)
- VERSION은 semantic release가 생성합니다(예: `1.0.0-alpha.1`)
- CAPGO_APIKEY는 CI/CD 파이프라인 로그인을 고유하게 식별하기 위해 CapGo가 제공합니다
- CAPGO_APPID는 애플리케이션을 고유하게 식별하기 위해 CapGo가 제공합니다(예: `com.mystartup.mysuperapp`)

## 6. 제 semantic release + CapGo CapacitorUpdate 설정

마지막으로, 이 모든 것이 어떻게 결합되나요?

![semantic release와 Github Actions로 빌드된 앱 번들 버전](/RBW_CapGo_channels_and_versions.webp)

*semantic release와 Github Actions로 빌드된 앱 번들 버전*


### Github Actions를 통한 Semantic release 자동화

semantic release의 아름다움은 Github Action 워크플로우 형태의 배포 자동화가 매우 간단하다는 것입니다. 이는 다른 CI/CD 플랫폼에서도 매우 비슷할 것입니다.
```yaml
# ./github/workflows/release.yml

name: Release

on:
  workflow_dispatch:
  push:
    branches: [alpha, alpha-nocapgo, dev-rupert]    # <--- adapt this

env:
  CAPGO_APPID: com.mystartup.mysuperapp             # <--- adapt this
  CAPGO_APIKEY: ${{ secrets.CAPGO_APIKEY }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm install
      - run: npx semantic-release
        env:
          DEBUG: true
          GITHUB_TOKEN: ${{ github.token }}
```

이는 단순히 NodeJS 환경을 설치한 다음 semantic release를 호출합니다.

`branches`에 나열된 브랜치에서 모든 병합에 대해 semantic release가 배포를 트리거합니다.
저장소의 secrets에 `CAPGO_APIKEY`를 설정하세요.
여기에서 `CAPGO_APPID`를 업데이트하세요.

semantic release의 동작은 `.releaserc.json` 구성 파일에서 설정됩니다.
다음은 제 설정이며, 아래에서 설명합니다:
```json
// .releaserc.json

{
  "branches": [
    {
      "name": "release",
      "channel": "production"
    },
    {
      "name": "alpha",
      "channel": "alpha",
      "prerelease": "alpha"
    },
    {
      "name": "alpha-nocapgo",
      "channel": "alpha",
      "prerelease": "alpha-nocapgo"
    },
    {
      "name": "dev-rupert",
      "channel": "development",
      "prerelease": "development"
    },
    {
      "name": "dev-paul",
      "channel": "development",
      "prerelease": "development"
    }
  ],
  "ci": true,
  "debug": true,
  "dryRun": false,
  "repositoryUrl": "https://github.com/RupertBarrow/mysuperapp",

  "verifyConditions": ["@semantic-release/github"],

  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "breaking", "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "doc", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },

          { "scope": "no-release", "release": false }
        ]
      }
    ],

    "@semantic-release/release-notes-generator",

    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],

    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md", "ios/App/App.xcodeproj/project.pbxproj"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],

    ["@semantic-release/github", { "assets": ["CHANGELOG.md"] }],

    [
      "@semantic-release/exec",
      {
        "prepareCmd": "npm run build",
        "publishCmd": "npm add -D @capgo/cli && npx @capgo/cli bundle upload --channel ${branch.channel} --apikey $CAPGO_APIKEY --bundle ${nextRelease.version} --bundle-url $CAPGO_APPID"
      }
    ]
  ]
}
```

- `branches`: 
  - `branches`는 브랜치(`name`)의 구성을 설정하며, CapGo 채널(`channel`)에 매핑되고 프리릴리스 버전 번호가 어떻게 불릴지(`prerelease`) 설정합니다. 예를 들어, `branch.prerelease = "development"`인 경우, semantic release가 생성하는 버전 번호는 `x.y.z-development.n`이 됩니다
  - `alpha`와 `alpha-nocapgo` 브랜치에 대한 배포는 모두 `alpha` 채널에 앱을 배포하지만, 버전 번호에서 다른 프리릴리스 이름을 가집니다
  - `dev-rupert`나 `dev-paul`과 같은 개발자 브랜치에 대한 배포는 모두 CapGo의 `development` 채널에 배포되며, 버전 번호에 동일한 `development` 프리릴리스 

애플리케이션 바이너리의 새 버전을 빌드하는 XCode Cloud와 이 모든 것을 통합하는 것은 간단합니다(아직 Google Play에 배포하지는 않았지만, 그 빌드도 비슷할 것입니다):
- 이를 위해 사용하고자 하는 브랜치(예: `production`)에 변경사항이 있을 때 빌드하도록 XCode Cloud 프로세스를 설정합니다
- 이 브랜치에서는 `CHANGELOG.md` 파일이 업데이트될 때만 빌드하도록 XCode Cloud를 설정합니다. 이는 semantic release로 생성된 각 버전 후에 업데이트됩니다
- 서로 다른 채널에 대한 배포를 시뮬레이션하기 위해 다른 브랜치에서 빌드를 트리거할 수 있습니다. 다른 브랜치의 각 XCode Cloud 빌드 구성에서, `releaserc.json`에 설정된 `branch.channel` 값으로 환경 변수를 수동으로 설정하고(네, 이는 수동 복제입니다), 원한다면 앞서 언급한 대로 커스텀 릴리스 브랜치에서 배포된 각 커스텀 고객 애플리케이션에 대해 다른 AppStore 애플리케이션을 배포할 수 있습니다.

![Building app binaries on XCode Cloud with CapGo channels](/RBW_XCode_Cloud_building.webp)

*CapGo 채널을 사용한 XCode Cloud에서의 앱 바이너리 빌드*

## 7. 결론

결론적으로, 14일 시험 기간 내에 신속하게 CapGo CapacitorUpdater를 표준 semantic release 파이프라인에 통합할 수 있어서 매우 기쁩니다. 그 결과는 다음과 같습니다:
- 번들 버전 번호는 semantic release에 의해 자동으로 생성되며 CapGo 서버와 호환됩니다
- semantic release는 CapGo 채널도 활용하면서 CapGo 애플리케이션 번들을 자동으로 배포합니다
- 이는 애플리케이션 바이너리의 XCode Cloud 빌드와 잘 맞습니다

### 다음 단계

현재 이 앱의 개발 단계에 있습니다. TestFlight를 통해 테스터들에게 빠르게 제공할 예정입니다(iOS의 경우). CapGo의 강력함을 고려할 때, 테스트를 위해 AppStore에 무료 버전의 앱을 배포할 것이 확실하며, 테스트 중에 CapGo를 통해 정기적으로 업데이트될 것입니다. 그 후에 다른 레코드로 AppStore에 또 다른(유료) 버전의 앱을 배포하고, 역시 CapGo로 정기적으로 업데이트할 것입니다.

semantic release 구성에 CapGo `bundle upload` 전제 조건에 대한 더 나은 사전 빌드 검증을 추가하기를 희망합니다.

이제 Ionic + Angular + Capacitor로 개발된 향후 모바일 앱을 위한 깔끔하고 단순하며 재현 가능한 semantic release 파이프라인을 갖게 되었습니다.

## 저자 - Rupert Barrow

저는 Salesforce의 클라이언트이자 사용자, 파트너이자 통합자, 아키텍트, 개발자, 비즈니스 애널리스트, 컨설턴트로서 22년 이상의 경험을 가지고 있습니다. 프랑스의 성공적인 Salesforce SI 파트너인 Altius Services의 공동 설립자이자 COO 및 CTO로 13년간 공동 경영했으며, 이후 **Rapido Cloud** 제품을 제공하는 Salesforce 솔로프레너로서 새로운 모험을 시작했습니다.

LinkedIn https://linkedin.com/in/rbarrow 에서 저를 찾을 수 있습니다.

https://www.rapido-companion.app 와 https://www.rapido.cloud(개발 중)에서 우리의 Salesforce 제품들을 살펴보실 수 있습니다.
