---
locale: ko
---

@capgo/angular-ng-stepper 패키지 노래 부르기

`@capgo/angular-ng-stepper` 패키지는 스테퍼 구성 요소를 제공하는 Angular 프로젝트용 라이브러리입니다. 이 구성 요소를 사용하면 다단계 양식이나 마법사와 같은 사용자 인터페이스를 만들 수 있습니다.

## 설치

Angular 프로젝트에서 `@capgo/angular-ng-stepper` 패키지를 사용하려면 다음 단계를 따르세요.

1 npm 또는 Yarn을 사용하여 패키지를 설치합니다.

   ```bash
   npm install @capgo/angular-ng-stepper
   ```

   또는

   ```bash
   yarn add @capgo/angular-ng-stepper
   ```

2 Angular 모듈에서 'NgStepperModule'을 가져옵니다.

   ```typescript
   import { NgStepperModule } from '@capgo/angular-ng-stepper';
   
   @NgModule({
     imports: [
       NgStepperModule
     ]
   })
   export class AppModule { }
   ```

## 용법

'NgStepperModule'을 설치하고 가져온 후에는 Angular 템플릿에서 스테퍼 구성 요소를 사용할 수 있습니다.

```html
<ng-stepper>
  <ng-step label="Step 1">
    Step 1 Content
  </ng-step>
  <ng-step label="Step 2">
    Step 2 Content
  </ng-step>
  <ng-step label="Step 3">
    Step 3 Content
  </ng-step>
</ng-stepper>
```

`ng-stepper` 구성 요소는 단계의 컨테이너 역할을 하고 `ng-step` 구성 요소는 개별 단계를 나타냅니다. `label` 속성을 제공하여 각 단계의 레이블을 맞춤설정할 수 있습니다.

## API

`@capgo/angular-ng-stepper` 패키지는 프로그래밍 방식으로 스테퍼 구성 요소와 상호 작용할 수 있는 여러 API 메서드와 옵션을 제공합니다.

### 스테퍼 구성요소

#### 속성

- `currentStep: 숫자`: 현재 활성화된 단계의 인덱스
- `nextButtonText: string`: 다음 버튼에 표시할 텍스트
- `previousButtonText: string`: 이전 버튼에 표시할 텍스트

#### 방법

- `goToStep(index: number)`: 인덱스를 매개변수로 제공하여 프로그래밍 방식으로 특정 단계로 전환합니다.
- `next()`: 다음 단계로 이동
- `previous()`: 이전 단계로 이동
- `reset()`: 스테퍼를 초기 상태로 재설정합니다.

### 단계 구성요소

#### 속성

- `label: string`: 단계의 레이블

## 결론

`@capgo/angular-ng-stepper` 패키지는 Angular 프로젝트에서 다단계 양식이나 마법사를 생성하기 위한 간단하고 사용하기 쉬운 스테퍼 구성 요소를 제공합니다. 이 튜토리얼에 제공된 설치 및 사용 지침을 따르면 신속하게 통합할 수 있습니다. 패키지를 자신의 Angular 애플리케이션에 추가