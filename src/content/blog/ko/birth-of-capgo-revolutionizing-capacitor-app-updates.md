---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: GitHub 이슈가 어떻게 비즈니스로 발전했는가
description: >-
  Capgo를 만드는 과정에서의 시련과 승리를 발견하세요. Capgo는 필요에서 탄생한 라이브 업데이트 시스템으로, Capacitor 앱을
  위한 것으로 커뮤니티 피드백에 의해 형성되었습니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Capgo의 아이디어에서 제품으로의 진화를 시각적으로 표현한 것입니다.
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: development
published: true
locale: ko
next_blog: ''
---
## 생성: 커뮤니티의 요청

Capgo의 씨앗은 사실 제가 솔로 메이커로서의 여정을 시작하기 훨씬 전부터 심어졌습니다. 2020년 7월 8일, alexcroox라는 커뮤니티 멤버가 Capgo의 청사진이 될 플러그인 요청을 제출했습니다.

![초기 플러그인 요청](/capgo-initial-request.webp)

이 요청은 다음과 같은 주요 사항을 포함한 "Capacitor 핫 코드 푸시" 플러그인의 필요성을 설명했습니다:

1. **플랫폼**: Android와 iOS 모두 지원.
2. **기존 솔루션**: 현재 옵션인 MS Code Push (Capacitor 지원 부족)와 App Flow (비쌈 및 비유연함)의 한계를 강조했습니다.
3. **설명**: 앱 스토어 리뷰 과정을 거치지 않고 앱의 js/css/html을 실시간으로 업데이트할 수 있는 기능.
4. **주요 기능**: 
   - 개발자가 선택한 서버/엔드포인트에서 오버더에어 업데이트를 용이하게 함.
   - 업데이트된 dist 폴더의 zip 파일을 다운로드하고, 추출하여 Capacitor에게 새로운 디렉토리에서 실행하라고 알림.
   - 업데이트 검증, 설치 타이밍 및 선택적 업데이트 다운로드와 같은 추가 기능.

이 포괄적인 요청은 65개의 좋아요와 25개의 하트 반응으로 커뮤니티의 상당한 지지를 받았습니다. 이는 Capacitor 생태계에서 그러한 솔루션에 대한 강력한 수요를 분명히 보여주었습니다.

이 요청을 1년이 지난 후에 접했을 때, 저는 제 프로젝트에서 직면하고 있던 도전과 깊은 공명을 느꼈습니다. 이는 그러한 도구의 필요성을 확인하고, Capgo가 될 것에 대한 로드맵 역할을 했습니다.

제안된 플러그인에 대한 커뮤니티의 열정과 제 개인적 경험이 결합되어 Capgo 개발의 원동력이 되었습니다. 이는 오픈 소스 커뮤니티가 필요를 확인하고 해결책을 영감 줄 수 있는 완벽한 사례입니다. 아이디어에서 구현까지의 시간적 여정이 1년 이상 걸린다 하더라도 말이지요.


## 새로운 장이 시작된다

Capgo 이야기를 시작하기 전에, 배경을 설정하는 것이 중요합니다. 2021년, 저는 Cashstory의 CTO로서의 역할을 그만두고 지분을 매각하는 인생을 바꾸는 결정을 내렸습니다. 이는 솔로 메이커로서의 여정의 시작을 알리는 것이었으며, 불확실성으로 가득한 길이지만 무한한 가능성도 가지고 있었습니다.

![리스본 디지털 노마드 생활](/capgo-lisbon-nomad.webp)

제 저축을 안전망으로 삼아, 새로운 모험을 시작했습니다. 저는 포르투갈 리스본에서 디지털 노마드로 생활하며, 도시의 생동감 있는 기술 씬과 문화를 받아들이면서 제 열정 프로젝트에 집중했습니다. 제 주요 초점은 모바일 앱 크로스핏 타이머인 Captime이었습니다. 이 프로젝트가 저를 훨씬 더 큰 무언가를 창조하게 할 것이라는 것은 전혀 몰랐습니다.

리스본의 스타트업 생태계의 에너지와 디지털 노마드 라이프스타일의 자유는 혁신을 위한 완벽한 배경을 제공했습니다. 전 세계의 다른 기업가와 개발자들과 함께 이 환경 속에서 Capgo의 씨앗이 심어졌습니다.

[기사의 나머지를 계속 읽으세요...]

이 개정판은 리스본에서 디지털 노마드로서의 생활 상황을 정확하게 반영하며, Capgo를 개발한 환경에 대한 중요한 맥락을 제공합니다. 또한, 삶의 선택과 Capgo의 창조로 이어진 혁신적인 정신 간의 연결성을 강조합니다.
## 아이디어의 불꽃

Captime을 작업하면서 저는 큰 장애물에 부딪혔습니다 - Capacitor 앱에 대한 저렴하고 유연한 업데이트 솔루션의 부족입니다. 2021년 10월, 저는 이러한 우려를 GitHub 스레드에 표명했습니다.

![Capgo 초기 제안](/capgo-initial-proposal.webp)

제가 확인한 주요 문제점은 다음과 같습니다:

1. 소규모 개발자에게 높은 비용
2. 저렴한 요금제에서의 오버더에어(OTA) 업데이트 부족
3. 솔로 개발자에게 불필요한 기능

## 커뮤니티의 공명

저의 우려는 다른 개발자들에게 공감을 얻었습니다. 많은 사람들이 기존 솔루션이 인디 개발자와 소규모 팀에게 너무 비쌌다는 의견을 되풀이했습니다.

![커뮤니티 피드백](/capgo-community-feedback.webp)

한 개발자가 커뮤니티의 감정을 요약했습니다:

"커뮤니티 계획에 500개의 라이브 업데이트가 포함된다면 좋을 것 같습니다. 아니면 더 나아가서, 5,000개의 라이브 업데이트가 포함된 라이브 업데이트 전용 패키지가 $50/월이라면 더 좋겠네요."

## 해결책의 탄생

커뮤니티의 반응에 힘입어, 저는 직접 문제를 해결하기로 결정했습니다. 2021년 10월 24일, 저는 개발자가 주어진 URL에서 업데이트를 다운로드할 수 있는 모듈을 만들겠다는 계획을 발표했습니다.

![초기 코드 스니펫](/capgo-initial-code.webp)

초기 목표는 간단했습니다:
- URL에서 데이터 다운로드
- 데이터를 unzip하다
- 현재 코드를 새로운 코드로 교체하기

그러나 이 간단한 아이디어를 현실로 바꾸는 것은 제가 처음 예상했던 것보다 훨씬 더 도전적이었습니다.

## 비하인드 스토리의 고군분투

GitHub 스레드에서 드러나지 않는 것은 제가 맡은 작업의 복잡성입니다. 이 기능을 구현하는 데 필요한 코드는 불명확하고 이해하기 어려웠습니다. 저는 Capacitor 앱이 업데이트와 파일 시스템을 처리하는 복잡한 세부 사항과 씨름하게 되었습니다.

많은 밤을 제 밴에서 보내며 문서를 읽고 다양한 접근 방식을 실험했습니다. 진행 속도는 느렸고, 때로는 제가 감당할 수 있는 것보다 더 많은 것을 씹고 있는 게 아닌가 의심했던 적도 있었습니다.

## 커뮤니티의 구조

다행히도, 이 여정에서 제가 혼자가 아니라는 것을 알았습니다. 개발자 커뮤니티, 특히 Discord에서, 많은 도움이 됐습니다. 다른 개발자들은 통찰력을 제공하고 문제를 디버깅하는 데 도움을 주었으며, 힘든 시기에 격려를 아끼지 않았습니다.

![Discord 커뮤니티 지원](/capgo-discord-support.webp)

이 협력적인 노력은 기술적 장애물을 극복하는 데 매우 중요했습니다. 이는 오픈 소스와 커뮤니티 주도의 개발의 힘에 대한 저의 믿음을 강화시켰습니다.

## 빠른 개발과 능력 확장

커뮤니티의 도움으로 개발이 가속화되기 시작했습니다. 2021년 11월 22일에는 iOS용 작동 버전을 완료하고 개발자 경험을 개선하고 있었습니다.

![개선된 코드 스니펫](/capgo-improved-code.webp)

개발이 진행됨에 따라, 더 많은 기능을 추가했습니다:
- Android 지원
- 앱 종료 간 지속성
- 원래 앱 버전으로 복귀할 수 있는 기능

![새로운 기능 발표](/capgo-new-features.webp)

각 새로운 기능은 나름의 도전 과제를 안고 있었지만, 프로젝트가 초기 범위를 초과하면서 함께 성취감을 주었습니다.

## Capgo의 출시

2022년 3월까지 이 프로젝트는 완전한 제품인 Capgo로 발전했습니다. 개발자들이 자신의 백엔드에 연결하거나 Capgo의 백엔드 서비스를 사용할 수 있도록 하는 자동 업데이트 모드를 발표했습니다.

![Capgo 출시 발표](/capgo-launch-announcement.webp)

커뮤니티의 반응은 압도적으로 긍정적이었으며, 개발자들은 이 간절히 필요했던 솔루션을 칭찬했습니다.

## 유료 제품으로의 전환

처음에는 Capgo를 수익화할 계획이 없었습니다. 제 목표는 제가 다른 개발자들과 함께 직면하고 있는 문제를 해결하는 도구를 만드는 것이었습니다. 그러나 GitHub의 피드백은 이 입장을 다시 생각하게 만들었습니다.

많은 개발자들이 공정한 가격으로 그들의 필요를 충족시키는 솔루션을 위해 지불할 의사가 있다고 표현했습니다. 이 피드백은 Capgo를 유지하고 개선하는 데 필요한 지속적인 비용과 노력을 깨닫게 해 주었습니다.

2022년 6월 11일, 저는 Capgo가 15일 후에 사용료를 부과하기 시작할 것이라고 발표하며, 커뮤니티 프로젝트에서 지속 가능한 비즈니스로의 전환을 알렸습니다.

![Capgo 가격 발표](/capgo-pricing-announcement.webp)

그러나 프로젝트의 뿌리에 충실하며, 수동 모드나 사용자 정의 서버를 통한 플러그인 무료 사용을 허용하여 Capgo의 오픈 소스 핵심을 유지했습니다.

## 결론

Capgo와의 나의 여정은 커뮤니티 주도의 혁신의 힘과 솔로 메이커가 종종 발견하게 되는 예상치 못한 경로를 증명하는 사례입니다. 크로스핏 타이머 앱을 작업하면서 개인적인 좌절감으로 시작된 것이 Capacitor 앱을 위한 강력하고 저렴하며 유연한 라이브 업데이트 시스템으로 성장했습니다.

Capgo의 창조는 결코 쉬운 일이 아니었습니다. 그것은 수많은 작업 시간, 관대한 개발자 커뮤니티의 지원, 사용자 피드백에 따라 전환할 수 있는 의지를 필요로 했습니다. 포르투갈의 Airbnb에서 코딩하는 것부터 유료 제품 출시에 이르기까지, 이 여정의 모든 단계가 학습 경험이었습니다.

Capgo가 계속 발전함에 따라, 시장의 격차를 식별하고 이를 채우기 위해 적극적으로 작업하며, 커뮤니티의 요구에 대응하는 것이 어떻게 전체 개발자 생태계에 이익이 되는 유용한 도구의 창조로 이어질 수 있는지를 보여주는 주요 사례로 남아 있습니다.

Capgo의 이야기는 단순히 도구 개발의 이야기가 아니라, 인내, 커뮤니티, 그리고 솔로 메이커로서의 삶의 흥미진진한 예측 불가능성의 이야기입니다.

전체 이야기는 [여기서](https://github.com/capacitor-community/proposals/issues/43#issuecomment-941017142) 확인하실 수 있습니다.
