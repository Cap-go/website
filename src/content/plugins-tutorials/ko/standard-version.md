---
locale: ko
---

@capgo/standard-version 패키지 튜토리얼을 노래하세요.

이 튜토리얼에서는 프로젝트의 버전 번호를 관리하기 위해 `@capgo/standard-version` 패키지를 사용하는 방법을 배웁니다. `@capgo/standard-version` 패키지는 [기존 버전]을 기반으로 프로젝트 버전 관리를 자동화하는 도구입니다. 커밋 사양](https://wwwconventionalcommitsorg/)

시작해 봅시다!

## 1단계: 설치

`@capgo/standard-version` 패키지를 설치하려면 터미널에서 다음 명령을 실행하세요.

```bash
npm install @capgo/standard-version --save-dev
```

그러면 패키지가 프로젝트의 개발 종속성으로 추가됩니다.

## 2단계: 구성

`@capgo/standard-version` 패키지를 구성하려면 프로젝트의 루트 디렉터리에 다음 콘텐츠로 `releaseconfigjs` 파일을 생성하세요.

```javascript
module.exports = {
  preset: 'capgo',
};
```

이 구성은 버전 관리에 사용할 사전 설정을 지정합니다. 이 경우 `@capgo/standard-version` 패키지에 대한 사용자 정의 사전 설정인 `capgo` 사전 설정을 사용합니다.

## 3단계: 버전 관리

프로젝트의 새 버전을 만들려면 다음 명령어를 실행하세요.

```bash
npx standard-version
```

이는 커밋 기록을 분석하고 기존 커밋을 기반으로 프로젝트의 새 버전 번호를 자동으로 생성합니다. 또한 'CHANGELOGmd' 파일을 최신 변경 사항으로 업데이트합니다.

## 4단계: 출시

릴리스를 만들려면 다음 명령어를 실행하세요.

```bash
npx standard-version --release-as 1.0.0
```

`100`을 원하는 릴리스 버전 번호로 바꾸세요. 이 명령은 packagejson 파일의 버전 번호를 업데이트하고, 릴리스에 대한 git 태그를 생성하고, `CHANGELOGmd` 파일을 업데이트합니다.

## 결론

축하해요! 프로젝트의 버전 번호를 관리하기 위해 `@capgo/standard-version` 패키지를 사용하는 방법을 성공적으로 배웠습니다. 이 패키지는 버전 관리 프로세스를 자동화하고 프로젝트의 변경 사항을 더 쉽게 추적할 수 있게 해줍니다.

자세한 내용은 `@capgo/standard-version` 패키지 문서를 참조하세요.

버전 관리를 즐겨보세요!