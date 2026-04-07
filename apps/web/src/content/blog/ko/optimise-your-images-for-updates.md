---
slug: optimise-your-images-for-updates
title: 이미지 업데이트를 위해 최적화하기
description: 사용자가 더 빠르게 업데이트를 받을 수 있도록 실시간 업데이트를 위한 이미지를 최적화하는 방법.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-23T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /convert.jpg.webp.webp
head_image_alt: 웹p 그림으로 변환
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Optimisation
published: true
locale: ko
next_blog: ''
---

WebP는 JPEG와 비슷하거나 더 나은 시각적 품질을 유지하면서 파일 크기를 크게 절약할 수 있는 현대적인 이미지 형식입니다. 모바일 앱에서 JPEG 이미지를 WebP로 변환하면 앱의 크기를 줄일 수 있어 사용자에게 더 빠른 다운로드 시간과 향상된 성능을 제공할 수 있습니다.

WebP는 Android와 iOS를 포함한 대부분의 주요 모바일 플랫폼과 기기에서 잘 지원됩니다. JPEG와 달리 WebP는 더 작은 파일 크기로 더 우수한 이미지 품질을 제공하여 더 빠른 다운로드 시간, 적은 데이터 사용량, 더 나은 사용자 경험을 제공합니다. 이는 데이터 사용량과 다운로드 시간이 주요 관심사인 셀룰러 네트워크에서 사용되는 모바일 앱에서 특히 중요합니다.

이미지를 WebP로 변환할 때 사용할 수 있는 몇 가지 옵션이 있습니다. 한 가지 인기 있는 옵션은 앱의 빌드 프로세스에 쉽게 통합할 수 있는 `c.webp`와 같은 명령줄 도구를 사용하는 것입니다. 다른 옵션으로는 이미지를 수동으로 변환하는 데 사용할 수 있는 [Android Studio](https://sites.google.com/a/android.com/tools/tech-docs/.webp/)에서 WebP로 변환하는 것입니다. 콘텐츠 관리 시스템(CMS)용 플러그인이나 Kraken.io와 같은 자동화된 서비스를 사용할 수도 있습니다.

이미지를 WebP로 변환한 후에는 앱의 성능이 개선되었는지 확인하기 위해 테스트하는 것이 중요합니다. [Firebase Performance Monitoring 플러그인](https://github.com/cap-go/capacitor-firebase/tree/main/packages/performance/) 또는 다른 성능 테스트 도구를 사용하여 앱의 성능을 측정할 수 있습니다. 또한 WebP 변환이 앱의 성능에 어떤 영향을 미치는지 더 정확한 그림을 얻기 위해 다양한 기기와 네트워크에서 앱을 테스트해야 합니다.

앱의 성능을 개선하는 것 외에도 이미지를 WebP로 변환하면 앱의 전반적인 사용자 경험에도 긍정적인 영향을 미칠 수 있습니다. 더 빠른 다운로드 시간과 적은 데이터 사용량으로 사용자는 앱에 대해 더 긍정적인 경험을 할 가능성이 높아지며, 이는 참여도와 유지율 증가로 이어질 수 있습니다.

전반적으로 이미지를 WebP로 변환하는 것은 모바일 앱의 자산을 최적화하고 앱의 성능을 개선하는 효과적인 방법이 될 수 있습니다. 이는 앱의 전반적인 사용자 경험에 큰 영향을 미칠 수 있는 간단하고 명확한 프로세스입니다. 이미지를 WebP로 변환하는 시간을 투자함으로써 사용자에게 더 나은 경험을 제공하고 잠재적으로 참여도와 유지율을 높일 수 있을 것입니다.
