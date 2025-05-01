---
slug: basic-js-css-config-for-native-app-look
title: ネイティブアプリのような見た目を実現するための基本的なJSとCSS設定
description: >-
  Pelajari cara mengkonfigurasi aplikasi web Anda dengan pengaturan JavaScript
  dan CSS dasar untuk membuatnya terlihat dan terasa seperti aplikasi native,
  termasuk menonaktifkan efek hover.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-05T00:00:00.000Z
updated_at: 2023-06-05T00:00:00.000Z
head_image: /native_app_look.webp
head_image_alt: 네이티브 앱 모양 일러스트레이션
keywords: 'tailwind css, css, mobile design, mobile app development'
tag: Web Development
published: true
locale: ko
next_blog: ''
---

# 네이티브 앱 모양을 위한 기본 JS 및 CSS 구성

웹 앱을 구축할 때 원활한 사용자 경험을 제공하기 위해 네이티브 앱처럼 보이고 느끼게 만드는 것이 중요합니다. 이 글에서는 호버 효과 비활성화를 포함하여 네이티브 앱 모양을 구현하는 데 필요한 기본 JavaScript 및 CSS 구성을 다룰 것입니다.

## 호버 효과 비활성화

터치 기기에서는 데스크톱 기기와 같은 실제 호버 상태가 없기 때문에 호버 효과가 문제가 될 수 있습니다. 터치 기기에서 호버 효과를 비활성화하려면 다음 CSS 코드를 사용할 수 있습니다:

```css
@media (hover: none) {
  .element:hover {
    /* Reset the hover styles */
    background-color: initial;
    color: initial;
    /* Add any other style resets needed */
  }
}
```

`element`를 호버 효과를 비활성화하려는 요소에 대한 적절한 선택자로 바꾸세요.

## 링크 미리보기 비활성화

터치 기기에서 링크 미리보기를 비활성화하려면 다음 JavaScript 코드를 사용할 수 있습니다:

```javascript
document.addEventListener('touchstart', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
  }
});
```

## 선택 비활성화

텍스트 선택을 비활성화하려면 스타일시트에 다음 CSS 코드를 추가하세요:

```css
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

## 확대/축소 비활성화

확대/축소를 비활성화하려면 HTML 파일의 head 섹션에 다음 메타 태그를 추가하세요:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## 안전 CSS 영역 추가

기기의 안전 영역 내에 콘텐츠가 표시되도록 하려면 스타일시트에 다음 CSS 코드를 추가하세요:

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

## 추가 팁

1. 모든 기기에서 앱이 잘 보이도록 반응형 디자인 기술을 사용하세요
2. 무거운 JavaScript 라이브러리와 프레임워크 사용을 최소화하여 앱 성능을 최적화하세요
3. 다양한 기기와 브라우저에서 앱을 테스트하여 호환성과 일관된 사용자 경험을 보장하세요

이러한 기본 JavaScript 및 CSS 구성을 따르면 원활하고 즐거운 사용자 경험을 제공하는 네이티브 앱처럼 보이고 느껴지는 웹 앱을 만들 수 있습니다.