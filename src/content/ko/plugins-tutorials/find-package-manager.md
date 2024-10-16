---
locale: ko
---

@capgo/find-package-manager 노래 부르기

`@capgo/find-package-manager` 패키지는 특정 경로에서 어떤 패키지 관리자가 사용되고 있는지 확인하는 데 유용한 도구입니다. 이는 다양한 패키지 관리자를 사용하는 프로젝트 작업 시 유용할 수 있습니다.

다음은 이 패키지를 사용하는 방법에 대한 단계별 자습서입니다.

## 설치

먼저, 컴퓨터에 Nodejs와 npm이 설치되어 있는지 확인하세요. 그런 다음 터미널을 열고 다음 명령을 실행하여 `@capgo/find-package-manager` 패키지를 설치하세요.

```
npm install @capgo/find-package-manager
```

## 패키지 가져오기

패키지가 설치되면 다음 줄을 사용하여 코드로 가져올 수 있습니다.

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'
```

## 패키지 관리자 유형 찾기

지정된 경로에서 패키지 관리자 유형을 찾으려면 `findPackageManagerType` 함수를 사용할 수 있습니다. 다음은 예입니다.

```typescript
console.log(findPackageManagerType())
```

`findPackageManagerType` 함수는 사용 중인 패키지 관리자의 유형을 나타내는 문자열 값을 반환합니다. 다음 값 중 하나를 반환할 수 있습니다.

-`npm`: npm을 사용하는 경우
- `yarn`: 실을 사용하는 경우
- `pnpm`: pnpm을 사용하는 경우
- `알 수 없음`: 패키지 관리자 유형을 확인할 수 없는 경우

## 종합해보면

다음은 `@capgo/find-package-manager` 패키지를 사용하는 방법에 대한 전체 예입니다.

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'

console.log(findPackageManagerType()) // npm | yarn | pnpm | unknown
```

그게 다야! 이제 `@capgo/find-package-manager` 패키지를 사용하여 지정된 경로의 패키지 관리자 유형을 결정할 수 있습니다.