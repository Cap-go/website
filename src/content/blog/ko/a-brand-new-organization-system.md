---
slug: a-brand-new-organization-system
title: 새로운 조직 시스템
description: capgo 팀이 조직 시스템을 추가한 배경 이야기
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Capgo 조직 시스템 도식
keywords: >-
  organization system, capgo, mobile app development, software engineering,
  backend development
tag: Story
published: true
locale: ko
next_blog: ''
---
## 소개

안녕하세요, 저는 Capgo의 수석 소프트웨어 엔지니어 [WcaleNieWolny](https://github.com/WcaleNieWolny/WcaleNieWolny)입니다.

지난 8개월 동안 [조직 시스템](/docs/webapp/organization-system/)을 개발해왔으며, 4월 14일을 기준으로 시스템이 완성되었음을 기쁘게 발표드립니다 🎉 🎊

마침내 8개월 만에 Capgo의 모든 부분을 조직 구성원이 접근할 수 있게 되었습니다. 여기에는 다음이 포함됩니다:
 - 앱
 - 통계
 - 결제
 - 완전한 CLI 지원
 - 그리고 더 많은 기능들!

여기까지 오는 것이 쉽지 않았습니다. 시스템의 3가지 주요 개정이 있었습니다.

## 조직 v1

시작은 힘들었습니다... 처음에는 프로젝트에 합류한 지 2주 후에 이 작업을 시작했습니다. 
당시에는 코드베이스나 구현 방법에 대한 더 큰 아이디어에 대해 거의 알지 못했습니다.

이로 인해 앱, 채널 및 버전에 대한 접근만 지원하는 가장 해키한 솔루션을 구현하게 되었습니다.
초대된 사용자가 통계에 접근하는 것조차 허용하지 않았습니다.

그리고 나서 Martin의 리뷰를 기다렸습니다. 기다리고 기다렸지만, 아무 일도 일어나지 않았습니다. 3개월 후, 이 문제로 돌아와서 모든 병합 충돌을 수정하기로 결정했습니다. 또한 테스트를 하기로 결정했는데, 이는 훌륭한 아이디어였습니다.
놀랍지 않게도, 해키한 솔루션은 완전히 실패했습니다. 그 순간, 모든 버그를 수정하고 광범위한 E2E 테스트를 작성하기로 결정했습니다.
매우 깨진 코드와 과거의 제가 내린 많은 나쁜 결정들과 함께 작업해야 했지만, 2주간의 힘든 작업 끝에 마침내 작동하게 만들었습니다.

하지만 그렇다고 완벽했다는 것은 아닙니다. 조직의 소유자는 여전히 가장 높은 권한을 가진 초대된 사용자보다 훨씬 더 많은 접근 권한을 가지고 있었습니다. 사용자 경험도 많이 부족했습니다. 초대된 사용자는 애플리케이션 통계를 볼 수 없었고, 결제를 관리할 수 없었으며, CLI는 업로드로만 제한되었습니다.

이러한 모든 도전에도 불구하고, Martin이 PR을 검토했고, 일주일 후에 프로덕션에 푸시되었습니다.

## 조직 v2

모든 도전에도 불구하고 조직 시스템은 꽤 잘 작동했습니다. 사용자들이 사용하고 있었고, 전체 프로젝트를 크게 발전시켰습니다. 하지만 여전히 해야 할 일이 있었습니다:
 - [행 수준 보안](https://supabase.com/docs/guides/auth/row-level-security)에서 만든 혼란 수정
 - 전체 CLI 지원 추가
 - 관리자 사용자가 소유자와 동일한 접근 권한을 가지도록 보장

Martin과 [많은 논의](https://github.com/Cap-go/capgo/issues/564) 후, 전체 보안 규칙을 다시 작성하고 모든 리소스 소유권을 사용자가 아닌 조직으로 이전하는 것이 가장 좋은 방법이라고 결정했습니다.
이를 통해 새로운 조직 시스템과의 통합이 더 쉬워지고 많은 레거시 코드도 제거할 수 있었습니다.

새로운 RLS 코드를 작성하는 것은 매우 지루했지만, 일주일 반 만에 전체 마이그레이션이 준비되었습니다.

하지만 이번에는 E2E 테스트를 작성하지 않기로 결정했고, 이는 수동으로 테스트해야 한다는 것을 의미했습니다. Martin과 함께 3번의 매우 광범위한 통화 후, 마침내 프로덕션에 푸시하고 잘 되기를 바라기로 결정했습니다 🙏

그러나 잘 되지 않았습니다... 사용자 등록이 깨져서 새로운 사용자가 계정을 만들 수 없다는 것이 밝혀졌습니다 😅

빠른 패닉 통화 후, 신속하게 프로덕션에 변경사항을 푸시하고 잠자리에 들었습니다. 불행하게도, 제 변경사항은 더 많은 문제만 만들었습니다 😰

깨어났을 때, 사용자들에게 많은 빈 조직이 있다는 것을 발견했습니다. 사용자당 1개의 조직만 허용되어야 하므로 이는 있어서는 안 되는 일이었습니다. 중복된 빈 조직들을 제거하는데 시간이 좀 걸렸지만, 그것을 제외하면 변경사항은 꽤 순조롭게 진행되었습니다.

## 조직 v3

이것조차도 충분하지 않았습니다. 여전히 큰 구성 요소가 빠져있었습니다 - 결제입니다.

지금까지는 소유자만 결제를 관리할 수 있었습니다. 이로 인해 사용자가 조직을 위해 구매한다고 생각하고 플랜을 구매하는 등의 흥미로운 문제가 발생했습니다.
우리는 신속하게 문제를 수동으로 해결했고, 이 시점에서 이 문제가 용납할 수 없다고 결정했습니다.

마이그레이션은 꽤 순조로웠습니다. 일주일의 작업이 걸렸지만 V1과 V2에 비하면 정말 어렵지 않았습니다 🚀

## 조직 v4 - 미래

이 모든 힘든 작업 후에 이제는 당분간 다른 것에 집중할 때라고 생각합니다 😎

쉽지 않았지만 많이 배웠고 Capgo는 매우 좋고 중요한 기능을 얻었습니다.
여전히 레거시 함수를 deprecated 처리하고, 웹앱 사용자 경험을 개선하고, 버그를 모니터링해야 하지만,
이 시스템에 대한 주요 변경사항은 없을 것입니다.

<br>

읽어주셔서 감사합니다 🚀
