---
locale: ko
---

`@capgo/konsta` 패키지 노래 부르기

이 튜토리얼에서는 `@capgo/konsta` 패키지를 사용하여 iOS 및 React, Vue 및 Svelte용 머티리얼 디자인 구성 요소로 완벽한 픽셀 모바일 UI 구성 요소를 만드는 방법을 안내합니다. `@capgo/konsta` 패키지는 다음과 같습니다. Tailwind CSS로 구축되었으며 프로젝트에 쉽게 통합할 수 있는 다양한 UI 구성요소를 제공합니다.

시작하려면 아래 단계를 따르세요.

## 1단계: 종속성 설치

`@capgo/konsta` 패키지 사용을 시작하려면 필요한 모든 종속성을 설치해야 합니다. 터미널을 열고 프로젝트 디렉터리로 이동한 후 다음 명령을 실행합니다.

```shell
$ npm install @capgo/konsta
```

이 명령은 `@capgo/konsta` 패키지와 해당 종속성을 프로젝트에 설치합니다.

## 2단계: 구성 요소 가져오기 및 사용

종속성이 설치되면 프로젝트의 `@capgo/konsta` 패키지에서 구성 요소를 가져와 사용할 수 있습니다. 선택한 프레임워크(React, Vue 또는 Svelte)에 따라 아래 관련 단계를 따르세요.

### 반응

React 프로젝트에서 `@capgo/konsta` 구성 요소를 사용하려면 아래와 같이 원하는 구성 요소를 가져옵니다.

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your React component
const MyComponent = () => {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
};
```

### 뷰

Vue 프로젝트에서 `@capgo/konsta` 구성 요소를 사용하려면 아래와 같이 원하는 구성 요소를 가져옵니다.

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Vue component
export default {
  components: {
    Button,
  },
  template: `
    <div>
      <Button>Click me</Button>
    </div>
  `,
};
```

### 날씬한

Svelte 프로젝트에서 `@capgo/konsta` 구성 요소를 사용하려면 아래와 같이 원하는 구성 요소를 가져옵니다.

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Svelte component
let name = 'world';
```

```html
<script>
  import { Button } from '@capgo/konsta';

  // Use the Button component in your Svelte component
  let name = 'world';
</script>

<main>
  <Button>Hello {name}!</Button>
</main>
```

## 3단계: 구성 요소 사용자 정의 및 스타일 지정

`@capgo/konsta` 패키지는 프로젝트 디자인에 맞게 쉽게 사용자 정의하고 스타일을 지정할 수 있는 광범위한 UI 구성 요소를 제공합니다. 구성 요소 속성을 수정하고, 사용자 정의 CSS 클래스를 추가하거나 인라인 스타일을 적용하여 원하는 모양과 느낌을 얻을 수 있습니다. 구성 요소 사용자 정의 및 스타일 지정에 대한 자세한 내용은 [https://konstauicom](https://konstauicom/)에서 제공되는 문서를 참조하세요.

## 4단계: 빌드 및 테스트

`@capgo/konsta` 구성 요소를 프로젝트에 통합한 후 애플리케이션을 빌드하고 테스트할 수 있습니다. 프로젝트에 대한 관련 빌드 명령을 사용하여 코드를 컴파일하고 프로덕션 버전을 생성합니다. 사용 가능한 프로젝트의 `packagejson` 파일을 참조하세요. 빌드 스크립트

## 결론

축하해요! React, Vue 또는 Svelte 프로젝트에서 완벽한 픽셀 모바일 UI 구성 요소를 생성하기 위해 `@capgo/konsta` 패키지를 사용하는 방법을 성공적으로 배웠습니다. 문서를 탐색하고 다양한 구성 요소와 사용자 정의 옵션을 실험하여 애플리케이션 사용자를 향상할 수 있습니다. 인터페이스

추가 지원이 필요하거나 문제를 보고하려면 공식 `@capgo/konsta` 문서와 커뮤니티를 참조하세요. 즐거운 코딩하세요!