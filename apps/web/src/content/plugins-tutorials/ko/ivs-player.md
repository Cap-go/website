---
locale: ko
---

@capgo/ivs-player 노래 부르기

## 설치

@capgo/ivs-player 패키지를 설치하려면 다음 명령을 실행해야 합니다:

```bash
npm install @capgo/ivs-player
npx cap sync
```

## API

@capgo/ivs-player 패키지는 다음 API를 제공합니다:

### create(옵션: { url: 문자열; pip?: 부울; 제목?: 문자열; 자막?: 문자열; 표지?: 문자열; autoPlay?: 부울; toBack?: 부울; x?: 숫자; y?: 숫자; 너비?: 숫자; 높이?: 숫자 }) => 약속;

이 메소드는 IVS 플레이어의 인스턴스를 생성합니다. 옵션 객체를 매개변수로 사용하며, 여기에는 비디오 URL, PIP(Picture-in-Picture) 모드 활성화 여부, 비디오 제목 및 자막 등과 같은 다양한 속성이 포함됩니다. 생성된 인스턴스를 해결하는 Promise를 반환합니다.

### start() => 약속

이 메소드는 IVS 플레이어에서 비디오 재생을 시작합니다. Promise를 반환합니다.

### 캐스트() => 약속

이 메서드는 비디오를 연결된 장치로 전송합니다. Promise를 반환합니다.

### getCastStatus() => 약속<{ isActive: boolean; }>

이 메소드는 캐스팅 기능의 상태를 검색합니다. 캐스팅이 활성화되었는지 여부를 나타내는 isActive 속성을 포함하는 객체로 확인되는 Promise를 반환합니다.

### Pause() => 약속

이 메서드는 비디오 재생을 일시 중지합니다. Promise를 반환합니다.

### delete() => 약속

이 메소드는 IVS 플레이어 인스턴스를 삭제하고 Promise를 반환합니다.

### getUrl() => 약속

이 메소드는 현재 재생 중인 비디오의 URL을 검색합니다. Promise를 반환합니다.

### getState() => 약속

이 메소드는 IVS 플레이어의 현재 상태를 검색합니다. Promise를 반환합니다.

### setPlayerPosition() => 약속

이 메소드는 화면에서 IVS 플레이어의 위치를 ​​설정합니다. x 및 y 좌표를 매개변수로 사용하고 Promise를 반환합니다.

### getPlayerPosition() => 약속

이 메소드는 화면에서 IVS 플레이어의 현재 위치를 검색합니다. Promise를 반환합니다.

### setAutoQuality() => 약속

이 메소드는 IVS 플레이어의 자동 품질 모드를 설정합니다. 부울 값을 매개변수로 사용하고 Promise를 반환합니다.

### getAutoQuality() => 약속

이 메소드는 IVS 플레이어의 현재 자동 품질 모드를 검색합니다. Promise를 반환합니다.

### setPip() => 약속

이 메소드는 IVS 플레이어의 PIP 모드를 설정합니다. 부울 값을 매개변수로 사용하고 Promise를 반환합니다.

### getPip() => 약속

이 메소드는 IVS 플레이어의 현재 PIP 모드를 검색합니다. Promise를 반환합니다.

### setFrame() => 약속

이 메소드는 IVS 플레이어의 프레임을 설정합니다. 숫자 값을 매개변수로 사용하고 Promise를 반환합니다.

### getFrame() => 약속

이 메소드는 IVS 플레이어의 현재 프레임을 검색합니다. Promise를 반환합니다.

### setMute() => 약속

이 메소드는 IVS 플레이어의 음소거 모드를 설정합니다. 부울 값을 매개변수로 사용하고 Promise를 반환합니다.

### getMute() => 약속

이 메소드는 IVS 플레이어의 현재 음소거 모드를 검색합니다. Promise를 반환합니다.

### setQuality() => 약속

이 메소드는 IVS 플레이어에서 비디오 품질을 설정합니다. 문자열 값을 매개변수로 사용하고 Promise를 반환합니다.

### getQuality() => 약속

이 메소드는 IVS 플레이어에서 비디오의 현재 품질을 검색합니다. Promise를 반환합니다.

### getQualities() => 약속

이 메소드는 IVS 플레이어에서 사용 가능한 비디오 품질을 검색합니다. Promise를 반환합니다.

### addListener('expandPip', ) => 무효

이 메소드는 ExpandPip 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('closePip', ) => 무효

이 메소드는 closePip 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onState', ) => 무효

이 메소드는 onState 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onCues', ) => 무효

이 메소드는 onCues 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onDuration', ) => 무효

이 메소드는 onDuration 이벤트에 대한 리스너를 추가합니다.콜백 함수를 매개변수로 취하고 void를 반환합니다.

### addListener('onError', ) => 무효

이 메소드는 onError 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onRebuffering', ) => 무효

이 메소드는 onRebuffering 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onSeekCompleted', ) => 무효

이 메소드는 onSeekCompleted 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onVideoSize', ) => 무효

이 메소드는 onVideoSize 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onQuality', ) => 무효

이 메소드는 onQuality 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### addListener('onCastStatus', ) => 무효

이 메소드는 onCastStatus 이벤트에 대한 리스너를 추가합니다. 콜백 함수를 매개변수로 사용하고 void를 반환합니다.

### 제거AllListeners() => 무효

이 메소드는 추가된 모든 이벤트 리스너를 제거합니다. void를 반환합니다.

## 결론

@capgo/ivs-player 패키지는 IVS 플레이어를 Capacitor 앱에 통합하기 위한 포괄적인 API를 제공합니다. 설치 단계를 따르고 API 문서를 참조하면 IVS 플레이어를 사용하여 앱에서 비디오 재생을 쉽게 시작할 수 있습니다.