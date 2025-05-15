---
slug: ionic-capacitor-push-notifications-firebase
title: '이오닉 캐퍼시터 푸시 알림과 파이어베이스: 단계별 가이드'
description: >-
  Firebase를 사용하여 Ionic Capacitor 앱에 푸시 알림을 통합하는 방법을 배우고 Android 및 iOS 플랫폼 모두에 대한
  단계별 지침을 확인하세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: 아이오닉 Capacitor 푸시 알림과 Firebase
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: ''
---
이 튜토리얼에서는 Firebase를 사용하여 Ionic Capacitor 앱에 푸시 알림을 통합할 것입니다. 이를 위해 특정 서비스는 필요하지 않지만, 사전에 몇 가지를 구성해야 합니다. Firebase는 Android에 필요하기 때문에 훌륭한 선택이며, 데이터베이스를 사용하지 않고도 쉽게 알림을 전송할 수 있습니다.

<div class="mx-auto" style="width: 50%;">
  <video src="/push_demo.mov" alt="ionic capacitor push" autoplay loop muted>
</div>

먼저, Capacitor가 활성화된 Ionic 앱을 생성하고 **패키지 ID**를 지정합니다. 이는 앱의 고유 식별자입니다. 그런 다음, 앱을 빌드하고 네이티브 플랫폼을 추가합니다.

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

이미 앱이 있는 경우, **capacitor.config.json**을 변경하여 **appId**를 포함할 수 있습니다. 하지만 네이티브 폴더가 이미 존재하는 경우, Capacitor는 한 번만 폴더를 생성하므로 ID가 표시되는 모든 파일에서 ID를 바꿔야 합니다. **capacitor.config.json**에서 배지 수 업데이트, 푸시 알림 시 소리 재생 및 알림 도착 시 경고 표시와 같은 옵션도 지정할 수 있습니다.

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

이제 앱 외부에서 푸시 알림을 구성해 보겠습니다.

## Firebase 구성

먼저 [새 Firebase 프로젝트를 생성](https://firebase.google.com/)하거나 기존 프로젝트를 사용합니다. 새 프로젝트의 이름과 기본 옵션을 제공합니다.

새 앱이 있다면, 앱 대시보드에서 **"Firebase를 앱에 추가하여 시작하기"**라는 메시지를 볼 수 있어야 합니다. 그렇지 않은 경우 기어 아이콘을 클릭하여 **프로젝트 설정**으로 가서 앱을 추가합니다.

iOS와 Android의 대화 상자는 유사하게 보이며, 중요한 점은 앱에 대한 **패키지 ID**를 사용하는 것입니다.

<div class="mx-auto" style="width: 100%;">
  <img src="/firebase-app-setup-ios.webp" alt="firebase-app-setup-ios">
</div>

초기 단계가 끝난 후, 다음 파일을 다운로드합니다.

- Android의 **google-services.json** 파일
- iOS의 **GoogleService-info.plist** 파일

다음으로 플랫폼을 구성합니다.

### Android 푸시 준비

Android의 경우, 다운로드한 **google-services.json** 파일을 **android/app/** 폴더로 이동합니다.

<div class="mx-auto" style="width: 50%;">
  <img src="/android-push-file.webp" alt="android-push-file">
</div>

Android는 이렇게 끝입니다. 이제 iOS를 구성해 보겠습니다.

### iOS 푸시 준비

이 부분은 좀 더 복잡합니다. 먼저, [Apple 개발자 계정의 식별자 목록에서 앱 ID를 생성](https://developer.apple.com/account/resources/identifiers/list/)합니다. 목록에서 **푸시 알림 기능**을 선택해야 합니다.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

**번들 ID**는 Capacitor와 Firebase 내 앱 ID와 동일해야 합니다.

이제, [키를 생성](https://developer.apple.com/account/resources/authkeys/list/)하고 **Apple 푸시 알림 서비스(APNs)**를 활성화합니다. 최대 키 수에 도달한 경우, 기존 키 또는 인증서를 대신 사용할 수 있지만 과정이 더 복잡합니다.

![ios-developer-push-key](/ios-developer-push-key.webp)

**.p8** 파일을 다운로드한 후 Firebase에 업로드합니다. Firebase 프로젝트 설정에서 **클라우드 메시징** 탭을 열고 파일을 업로드하며, iOS의 Key ID와 팀 ID를 입력합니다.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

이제 다음을 실행하여 Xcode 프로젝트를 변경합니다:

```bash
npx cap open ios
```

Firebase에서 다운로드한 **GoogleService-Info.plist** 파일을 iOS 프로젝트에 복사합니다. 파일을 앱/app 폴더 내 Xcode 프로젝트로 끌어다 놓고 **필요 시 항목 복사**를 선택합니다.

다음으로 **ios/App/Podfile**에서 Firebase 의존성을 위한 새로운 Pod를 추가합니다:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

다음 명령으로 네이티브 플랫폼을 업데이트합니다:

```bash
npx cap update ios
```

**ios/App/App/AppDelegate.swift**의 네이티브 Swift 코드를 수정하여 Firebase에 등록하고 앱에 올바른 토큰을 반환합니다.

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

마지막으로 Xcode 프로젝트 내에서 푸시 알림 기능을 추가합니다.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

이제 앱을 빌드하고 푸시 알림을 통합합니다.

## Ionic 푸시 알림 통합

Ionic 프로젝트에서 서비스를 만들고 새 페이지를 추가합니다:

```bash
ionic g service services/fcm
ionic g page pages/details
```

**app/app-routing.module.ts**에서 라우팅을 업데이트하여 동적 ID와 함께 새 페이지를 포함합니다:

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**services/fcm.service.ts**에서 푸시 알림을 처리할 서비스를 만듭니다:

```typescript
import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
import { Router } from '@angular/router';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router) { }

  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );
  }
}
```

**app/app.component.ts**에서 `initPush()` 함수를 호출합니다:

```typescript
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmService: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Trigger the push setup
      this.fcmService.initPush();
    });
  }
}
```

**pages/details/details.page.ts**의 세부 정보 페이지에서 정보를 처리합니다:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }

}
```

**pages/details/details.page.html**에서 세부 정보를 표시합니다:

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/"></ion-back-button>
    </ion-buttons>
    <ion-title>Details</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  My Id from push: {{ id }}

  <ion-button (click)="resetBadgeCount()" expand="block">
    Reset Badge Count
  </ion-button>
</ion-content>
```

앱을 빌드하고 변경 사항을 동기화한 후 장치에 배포합니다.

```bash
ionic build
npx cap sync
```

이제 Firebase를 사용하여 푸시 알림을 보낼 수 있습니다.

## Firebase로 푸시 알림 보내기

Firebase로 푸시 알림을 보내는 방법에는 여러 가지가 있습니다.

### 특정 장치 테스트

앱을 장치에 배포한 후, 등록 후 콘솔 로그에서 토큰을 확인할 수 있습니다. 이 토큰을 사용하여 통합이 작동하는지 확인하기 위해 타겟 테스트 푸시를 보냅니다. Firebase에서 **클라우드 메시징**으로 이동하여 **테스트 메시지 전송**을 선택합니다. 로그에서 장치 토큰을 추가합니다.

![firebase-test-push](/firebase-test-push.webp)

모든 설정이 올바르게 구성되었다면, 장치에서 푸시 알림을 확인할 수 있습니다.

### 페이로드가 있는 푸시 메시지

추가 정보가 포함된 푸시 알림을 테스트하려면, 같은 페이지의 마법사를 따라 일반 정보를 지정하고 목표로 하는 플랫폼을 선택합니다. 푸시 알림과 함께 페이로드를 보내기 위해 **추가 옵션**을 추가합니다.

![firebase-push-payload](/firebase-push-payload.webp)

**고급 옵션** 섹션에서 **사용자 정의 데이터** 키-값 쌍을 추가합니다. 예를 들어, `detailsId`라는 키와 선택한 값을 사용할 수 있습니다. 이 데이터는 앱에서 세부정보 페이지로 이동하는 데 사용됩니다.

푸시 알림을 보낸 후, 앱이 이를 수신하고 알림을 탭할 때 지정된 ID로 세부정보 페이지를 표시해야 합니다.

### Firebase API 사용

Firebase API를 사용하여 프로그래밍 방식으로 푸시 알림을 보내는 것도 가능합니다. 이를 위해서는 Firebase 프로젝트 설정의 **클라우드 메시징** 탭에서 **서버 키**를 확보해야 합니다.

서버 키를 사용하여 필요한 페이로드와 함께 Firebase API에 POST 요청을 보낼 수 있습니다. 다음은 Node.js와 `request` 라이브러리를 사용하는 예입니다:

```javascript
const request = require('request');

const serverKey = 'YOUR_SERVER_KEY';
const deviceToken = 'YOUR_DEVICE_TOKEN';

const options = {
  method: 'POST',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'key=' + serverKey
  },
  body: JSON.stringify({
    to: deviceToken,
    notification: {
      title: 'Test Push',
      body: 'This is a test push notification with custom data'
    },
    data: {
      detailsId: '123'
    }
  })
};

request(options, (error, response, body) => {
  if (error) {
    console.error('Error sending push:', error);
  } else {
    console.log('Push sent successfully:', body);
  }
});
```

`YOUR_SERVER_KEY` 및 `YOUR_DEVICE_TOKEN`을 실제 서버 키와 장치 토큰으로 바꿉니다. 스크립트를 실행하면 장치에서 사용자 정의 페이로드가 포함된 푸시 알림을 수신해야 합니다.

이것으로 끝입니다! Firebase를 사용하여 Ionic Capacitor 앱에 푸시 알림을 성공적으로 통합했습니다. 이제 Android와 iOS 플랫폼 모두에서 사용자에게 푸시 알림을 보낼 수 있습니다.
