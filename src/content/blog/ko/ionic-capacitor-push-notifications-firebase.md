---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notifiche Push di Ionic Capacitor con Firebase: Una Guida Passo-Passo'
description: >-
  Firebase를 사용하여 Android 및 iOS 플랫폼에 대한 단계별 가이드와 함께 Ionic Capacitor 앱에서 푸시 알림을
  통합하는 방법을 알아보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Firebase를 사용한 Ionic Capacitor 푸시 알림
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: tutorial
published: true
locale: ko
next_blog: ''
---

이 튜토리얼에서는 Firebase를 사용하여 Ionic Capacitor 앱에 푸시 알림을 통합할 것입니다. 이를 위해 특별한 서비스는 필요하지 않지만, 사전에 여러 가지를 구성해야 합니다. Firebase는 Android에 필요하고 데이터베이스를 사용하지 않고도 쉽게 알림을 보낼 수 있어서 탁월한 선택입니다.

<Steps>
1. Capacitor가 활성화된 Ionic 앱을 생성하고 앱의 고유 식별자인 **package id**를 지정합니다. 그런 다음 앱을 빌드하고 네이티브 플랫폼을 추가합니다.
</Steps>

```ts
npm install @capacitor/push-notifications
ionic start ionic-push-notifications blank --capacitor
cd ionic-push-notifications
```

이미 앱이 있다면 **capacitor.config.json**에서 **appId**를 변경할 수 있습니다. 하지만 네이티브 폴더가 이미 존재한다면, Capacitor는 폴더를 한 번만 생성하고 **ID를 자동으로 업데이트하지 않기 때문에** ID가 나타나는 모든 파일에서 수동으로 변경해야 합니다. **capacitor.config.json**에서 배지 카운트 업데이트, 푸시 알림 시 소리 재생, 알림 도착 시 알림 표시와 같은 옵션도 지정할 수 있습니다.

이제 앱 외부에서 푸시 알림을 구성해 보겠습니다.

## Firebase 구성

먼저 [새로운 Firebase 프로젝트를 생성](https://firebase.google.com/)하거나 기존 프로젝트를 사용하세요. 새 프로젝트의 이름과 기본 옵션을 제공하세요.

새 앱인 경우 앱 대시보드에서 **"Firebase를 앱에 추가하여 시작하기"**가 표시됩니다. 그렇지 않으면 톱니바퀴 아이콘을 클릭하고 **프로젝트 설정**으로 이동하여 앱을 추가하세요.

iOS와 Android 모두 대화상자가 비슷하며, 중요한 점은 앱에 대한 **package id**를 사용하는 것입니다.

<Steps>
1. Android와 iOS 앱을 등록하세요.
</Steps>

초기 단계 후, 다음 파일들을 다운로드하세요:

- Android용 **google-services.json** 파일
- iOS용 **GoogleService-Info.plist** 파일

다음으로 플랫폼을 구성하세요.

### Android 푸시 준비

Android의 경우, 다운로드한 **google-services.json** 파일을 **android/app/** 폴더로 이동하세요.

<Steps>
1. **google-services.json** 파일을 **android/app/** 폴더에 복사하세요.
</Steps>

Android는 이것으로 끝입니다. 이제 iOS를 구성해 보겠습니다.

### iOS 푸시 준비

이 부분은 더 복잡합니다. 먼저, Apple Developer 계정의 [식별자 목록](https://developer.apple.com/account/resources/identifiers/list/)에서 앱의 App ID를 생성하세요. 목록에서 **푸시 알림 기능**을 반드시 **선택**하세요.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

**Bundle ID**는 Capacitor와 Firebase의 App ID와 동일해야 합니다.

이제 [Key를 생성](https://developer.apple.com/account/resources/authkeys/list/)하고 **Apple Push Notifications service (APNs)**를 활성화하세요. 키 수가 최대에 도달한 경우 기존 키나 인증서를 사용할 수 있지만, 그 과정은 더 복잡합니다.

![ios-developer-push-key](/ios-developer-push-key.webp)

**p8** 파일을 다운로드한 후 Firebase에 업로드하세요. Firebase 프로젝트 설정의 **Cloud Messaging** 탭에서 파일을 업로드하고 Key ID와 iOS의 Team ID 세부 정보를 입력하세요.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

이제 다음 명령을 실행하여 Xcode 프로젝트를 수정하세요:

```bash
npx cap open ios
```

Firebase에서 다운로드한 **GoogleService-Info.plist** 파일을 iOS 프로젝트에 복사하세요. 파일을 Xcode 프로젝트의 app/app 폴더 안으로 드래그하고 **필요한 경우 항목 복사**를 선택하세요.

다음으로 **ios/App/Podfile**에 Firebase 종속성을 위한 새로운 Pod를 추가하세요:

```ruby
pod 'Firebase/Messaging'
```

다음 명령으로 네이티브 플랫폼을 업데이트하세요:

```bash
npx cap update ios
```

**ios/App/App/AppDelegate.swift**의 네이티브 Swift 코드를 수정하여 Firebase에 등록하고 앱에 올바른 토큰을 반환하도록 하세요:

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        
        return true
    }
```

마지막으로 Xcode 프로젝트에서 푸시 알림에 대한 Capability를 추가하세요.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

이제 앱을 빌드하고 푸시 알림을 통합하세요.

## Ionic 푸시 알림 통합

Ionic 프로젝트에서 서비스와 새로운 페이지를 생성하세요:

```bash
ionic g service services/fcm
ionic g page pages/notifications
```

**app/app-routing.module**의 라우팅을 업데이트하세요:ts**에 동적 id가 있는 새 페이지를 포함하려면:

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

**services/fcmservice.ts**에서 푸시 알림을 처리하는 서비스를 생성하세요:

```json
{
  "appId": "com.appdactic.devpush",
  "appName": "pushApp",
  "bundledWebRuntime": false,
  "npmClient": "npm",
  "webDir": "www",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  },
  "cordova": {}
}
```

**app/app.component.ts**에서 `initPush()` 함수를 호출하세요:

```bash
npx cap open ios
```

**pages/details/details.page.ts**에서 상세 페이지의 정보를 처리하세요:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

**pages/details/details.page.html**에서 상세 정보를 표시하세요:

```bash
npx cap update ios
```

앱을 빌드하고, 변경사항을 동기화한 후 기기에 배포하세요

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    FirebaseApp.configure()
    return true
  }

  // All the existing functions
  // ...

  // Update this one:
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
        InstanceID.instanceID().instanceID { (result, error) in
            if let error = error {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidFailToRegisterForRemoteNotificationsWithError.name()), object: error)
            } else if let result = result {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidRegisterForRemoteNotificationsWithDeviceToken.name()), object: result.token)
            }
        }
    }
}
```

이제 Firebase로 푸시 알림을 보낼 수 있습니다

## Firebase로 푸시 알림 보내기

Firebase로 푸시 알림을 보내는 방법에는 여러 가지가 있습니다

### 특정 기기 테스트

앱을 기기에 배포한 후, 등록 후 콘솔 로그에서 토큰을 확인할 수 있습니다. 이 토큰을 사용하여 통합이 제대로 작동하는지 확인하기 위해 대상 테스트 푸시를 보내세요. Firebase에서 **Cloud Messaging**으로 이동하여 **Send test message**를 선택하세요. 로그에서 기기 토큰을 추가하세요.

![firebase-test-push](/firebase-test-push.webp)

모든 것이 올바르게 설정되었다면, 기기에서 푸시 알림을 볼 수 있습니다

### 페이로드가 있는 푸시 메시지

추가 정보가 있는 푸시 알림을 테스트하려면, 같은 페이지에서 마법사를 따라 일반 정보를 지정하고 대상으로 하는 플랫폼을 선택하세요. 푸시 알림과 함께 페이로드를 보내려면 **additional options**를 추가하세요.

![firebase-push-payload](/firebase-push-payload.webp)

**Advanced options** 섹션에서 **Custom data** 키-값 쌍을 추가하세요. 예를 들어, `detailsId` 키와 원하는 값을 사용할 수 있습니다. 이 데이터는 앱에서 지정된 id로 상세 페이지로 이동하는 데 사용됩니다.

푸시 알림을 보낸 후, 앱이 이를 수신하고 알림을 탭했을 때 지정된 id로 상세 페이지를 표시해야 합니다

### Firebase API 사용하기

Firebase API를 사용하여 프로그래밍 방식으로 푸시 알림을 보낼 수도 있습니다. 이를 위해서는 Firebase 프로젝트 설정의 **Cloud Messaging** 탭에서 **Server key**를 얻어야 합니다.

서버 키를 사용하여 필요한 페이로드와 함께 Firebase API에 POST 요청을 보낼 수 있습니다. 다음은 Node.js와 `request` 라이브러리를 사용한 예시입니다:

```bash
ionic g service services/fcm
ionic g page pages/details
```

`YOUR_SERVER_KEY`와 `YOUR_DEVICE_TOKEN`을 실제 서버 키와 기기 토큰으로 교체하세요. 스크립트를 실행하면, 기기에서 사용자 정의 페이로드가 포함된 푸시 알림을 수신해야 합니다.

이제 끝났습니다! Firebase를 사용하여 Ionic Capacitor 앱에 푸시 알림을 성공적으로 통합했습니다. 이제 Android와 iOS 플랫폼 모두에서 사용자에게 푸시 알림을 보낼 수 있습니다.