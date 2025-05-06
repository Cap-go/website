---
slug: how-capgo-is-born
title: Capgo의 탄생 과정
description: Capgo를 시작하고 구축하게 된 배경 이야기
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_birth.webp
head_image_alt: Capgo 탄생 일러스트레이션
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Story
published: true
locale: ko
next_blog: ''
---
안녕하세요, 저는 Martin Donadieu입니다.

2021년 7월, 저는 2019년에 공동 창업했던 [Naas](https://naas.ai/)를 떠나 솔로 프로젝트를 시작했습니다.

솔로 여정의 첫 6개월 동안 저는 4년 전에 만들었던 모바일 앱 Captime을 재시작하는 데 집중했습니다. 이 앱은 코로나로 인해 부업이 되었죠.

2021년 12월, 앱을 처음부터 다시 만들고 있을 때, 현재 운영 중인 버전에 문제가 발생했고,

상황이 복잡해졌습니다. 수정이 필요했지만 새 버전을 출시하고 싶지 않아서, 앱에 코드 업데이트를 푸시할 수 있는 방법을 찾아보았습니다.

당시 Captime은 월 400달러의 수익을 내고 있었고, 저렴한 솔루션을 찾고 있었습니다. Ionic Appflow는 제 예산을 초과했죠.

유일한 다른 대안은 Microsoft App Center였지만, 그들은 Cordova / Capacitor에서 실행되는 앱에 대한 지원을 중단했습니다.

저처럼 솔로 개발자라면, Ionic AppFlow가 가격면에서 최선의 선택이 아니라는 것을 알게 될 것입니다.

여러분처럼 저도 이에 대해 불만이 있었고, Ionic에 연락했지만, 그들은 불만을 이해하면서도 가격 정책을 바꿀 의향이 없었습니다. 제가 타겟이 아니었던 거죠.

그래서 저는 Capacitor JS 개발 워크플로우에서 가장 큰 고민이었던 실시간 업데이트 문제를 해결하기로 했습니다.

한 달간의 시도 끝에 URL에서 zip 파일을 다운로드하여 앱의 소스를 교체하는 방법을 찾아냈습니다.

이를 공유했더니 GitHub에서 큰 관심을 받았습니다.

대부분의 팀에게는 너무 수동적인 방식이어서 유료 서비스를 요청했고, 이것이 AppFlow의 대안으로 Capgo를 시작하게 된 계기였습니다.

목표는 Capacitor JavaScript 앱에 코드 업데이트를 푸시할 수 있는 간단하고 사용하기 쉬운 솔루션을 제공하는 것이었습니다.

네이티브 빌드나 Ionic과 같은 큰 도구상자가 아닌, 그들이 다루지 않는 시장인 우리를 위한 실시간 업데이트만을 제공하는 것이었죠.

제가 하고 있는 일을 그들과 공유했고, 우리는 비즈니스 친선 협약을 맺었습니다.

저는 메이커를 위해 만들고, 그들은 CI/CD와 전담 지원이 필요한 비즈니스를 위해 만듭니다 :)

함께 만들어가는 커뮤니티에 참여하시길 환영합니다. 저도 제 프로젝트에 이것을 사용하고 있으며, 앞으로 이것이 제 주요 프로젝트가 될 것으로 기대합니다.
