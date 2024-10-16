---
locale: ko
---

Capgo Cloud에 파일 업로드 및 다운로드를 위해 @capgo/cli 사용

[@capgo/cli](https://wwwnpmjscom/package/@capgo/cli/)는 Capgo Cloud에 파일을 업로드하고 다운로드할 수 있는 명령줄 인터페이스(CLI) 도구입니다. 이 튜토리얼에서는 Capgo Cloud에서 파일을 관리하기 위해 @capgo/cli를 사용하는 단계를 안내합니다.

### 1단계: 등록

@capgo/cli를 사용하기 전에 [capgoapp](https://capgoapp/)에 계정을 등록하고 API 키를 받아야 합니다.

### 2단계: 설치

@capgo/cli를 설치하려면 터미널을 열고 다음 명령을 실행하십시오.

```bash
npm install -g @capgo/cli
```

### 3단계: Capgo Cloud에 로그인

@capgo/cli를 사용하여 Capgo Cloud에 로그인하려면 다음 명령을 실행합니다.

```bash
npx @capgo/cli login [apikey]
```

`[apikey]`를 등록 중에 얻은 API 키로 바꾸십시오. 선택적으로 `--local` 플래그를 사용하여 API 키를 로컬 폴더에 저장할 수 있습니다.

### 4단계: Capgo Cloud에 새 앱 추가

Capgo Cloud에 새 앱을 추가하려면 다음 명령을 사용하십시오.

```bash
npx @capgo/cli add [appId]
```

`[appId]`를 `comtestapp` 형식의 앱 ID로 바꿉니다. `--icon`, `--name`, `--apikey` 플래그를 사용하여 아이콘, 이름, API 키를 맞춤설정할 수도 있습니다. 앱용

### 5단계: Capgo Cloud에 버전 업로드

앱 버전을 Capgo Cloud에 업로드하려면 다음 명령을 실행하세요.

```bash
npx @capgo/cli upload [appId]
```

`[appId]`를 앱 ID로 바꾸세요. `--apikey`, `--path`, `--channel`, `--external`, `--key`, `--key-data를 사용할 수 있습니다. 업로드 옵션을 맞춤설정하기 위한 `, `--no-key`, `--bundle` 및 `--iv-session-key` 플래그

### 6단계: 채널 관리

@capgo/cli를 사용하여 Capgo Cloud에서 채널을 생성하고 삭제할 수 있습니다. 

새 채널을 추가하려면 다음 명령을 사용하십시오.

```bash
npx @capgo/cli channel add [channelId] [appId]
```

`[channelId]`를 새 채널 이름으로 바꾸고 `[appId]`를 앱 ID로 바꿉니다.

채널을 삭제하려면 다음 명령을 사용하십시오.

```bash
npx @capgo/cli channel delete [channelId] [appId]
```

`[channelId]`를 삭제할 채널 이름으로 바꾸고 `[appId]`를 앱 ID로 바꿉니다.

### 7단계: 종단 간 암호화

@capgo/cli는 코드에 대한 종단 간 암호화를 지원합니다. 다음 명령을 사용하여 RSA 키 쌍을 생성할 수 있습니다.

```bash
npx @capgo/cli key create
```

다음을 실행하여 앱 구성에 개인 키를 저장할 수 있습니다.

```bash
npx @capgo/cli key save
```

키로 zip 파일을 암호화하려면 다음 명령을 사용하십시오.

```bash
npx @capgo/cli encrypt [path/to/zip]
```

키를 사용하여 zip 파일의 암호를 해독하려면 다음 명령을 사용하세요.

```bash
npx @capgo/cli encrypt [path/to/zip] [ivSessionKey]
```

`[path/to/zip]` 및 `[ivSessionKey]`를 적절한 값으로 바꾸십시오.

### 결론

이 튜토리얼에서는 Capgo Cloud에서 파일을 업로드하고 다운로드하기 위해 @capgo/cli를 사용하는 방법을 배웠습니다. @capgo/cli는 앱 버전과 채널을 관리하기 위한 편리한 명령줄 인터페이스를 제공합니다. 자세한 내용은 다음을 참조하세요. 공식 [문서](https://capgoapp/docs/)