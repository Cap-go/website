---
slug: ionic-capacitor-push-notifications-firebase
title: 'Ionic Capacitor Push Notifications with Firebase: A Step-by-Step Guide'
description: >-
  Learn how to integrate push notifications in your Ionic Capacitor app using
  Firebase, with step-by-step instructions for both Android and iOS platforms.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Ionic Capacitor Push Notifications with Firebase
tag: tutorial
published: true
locale: en
next_blog: ''
---

In this tutorial, we will integrate push notifications in an Ionic Capacitor app using Firebase. You don't need a specific service for this, but you do need to configure several things beforehand. Firebase is an excellent choice since it's required for Android, and you can easily use it to send notifications without using the database.

<div class="mx-auto" style="width: 50%;">
  <video src="/push_demo.mov" alt="ionic capacitor push" autoplay loop muted>
</div>


First, we will create an Ionic app with Capacitor enabled and specify our **package id**, which is the unique identifier for your app. Then, we will build the app and add the native platforms.

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

If you already have an app, you can change the **capacitor.config.json** to include your **appId**. However, if your native folders already exist, you will need to replace the id in all files where it appears, as Capacitor only creates the folder once and **won't update the id itself**. In the **capacitor.config.json**, you can also specify options like updating the badge count, playing sound on push, and showing an alert when a notification arrives.

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

Now, let's configure push notifications outside the app.

## Firebase Configuration

Start by [creating a new Firebase project](https://firebase.google.com/) or using an existing one. Provide a name and default options for a new project.

If you have a new app, you should see **"Get started by adding Firebase to your app"** in your app's dashboard. Otherwise, click the gear icon and go to **project settings** to add an app.

The dialog for both iOS and Android looks similar, and the important thing is to use your **package id** for the apps.


<div class="mx-auto" style="width: 100%;">
  <img src="/firebase-app-setup-ios.webp" alt="firebase-app-setup-ios">
</div>

After the initial step, download the following files:

- **google-services.json** file for Android
- **GoogleService-info.plist** file for iOS

Next, configure the platforms.

### Android Push Preparation

For Android, move the **google-services.json** file you downloaded to the **android/app/** folder.

<div class="mx-auto" style="width: 50%;">
  <img src="/android-push-file.webp" alt="android-push-file">
</div>

That's all for Android. Now let's configure iOS.

### iOS Push Preparation

This part is more complicated. First, [create an App ID for your app within the identifiers list](https://developer.apple.com/account/resources/identifiers/list/) of your Apple Developer account. Make sure you **select the Push Notifications capability** from the list.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

The **Bundle ID** should be the same as your App ID within Capacitor and Firebase.

Now, [create a Key](https://developer.apple.com/account/resources/authkeys/list/) and enable the **Apple Push Notifications service (APNs)**. If you have reached the maximum number of keys, you can use an existing key or a certificate instead, but the process is more complicated.

![ios-developer-push-key](/ios-developer-push-key.webp)

After downloading the **.p8** file, upload it to Firebase. Open the **Cloud Messaging** tab in your Firebase project settings, upload the file, and enter the details for the Key ID and your Team ID from iOS.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

Now, make changes to your Xcode project by running:

```bash
npx cap open ios
```

Copy the **GoogleService-Info.plist** file you downloaded from Firebase into your iOS project. Drag the file into the Xcode project inside the app/app folder, and select **Copy items if needed**.

Next, add a new Pod for the Firebase dependency in the **ios/App/Podfile**:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Update the native platform with this command:

```bash
npx cap update ios
```

Modify the native Swift code in **ios/App/App/AppDelegate.swift** to register with Firebase and return the correct token to your app.

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

Finally, add the Capability for Push Notifications within your Xcode project.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

Now, build your app and integrate push notifications.

## Ionic Push Notification Integration

Create a service and a new page in your Ionic project:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Update the routing in **app/app-routing.module.ts** to include the new page with a dynamic id:

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

Create a service to handle push notifications in **services/fcm.service.ts**:

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

Call the `initPush()` function in **app/app.component.ts**:

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

Handle the information on the details page in **pages/details/details.page.ts**:

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

Display the details in **pages/details/details.page.html**:

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

Build the app, sync your changes, and deploy it to your device.

```bash
ionic build
npx cap sync
```

Now, you can send push notifications with Firebase.

## Sending Push Notifications with Firebase

There are several ways to send push notifications with Firebase.

### Specific Device Test

After deploying your app to a device, you can check the console logs to see the token after registration. Use this token to send a targeted test push to confirm your integration is working. In Firebase, go to **Cloud Messaging** and select **Send test message**. Add the device token from the logs.

![firebase-test-push](/firebase-test-push.webp)

If everything is set up correctly, you should see a push notification on your device.

### Push Message with Payload

To test a push notification with additional information, follow the wizard on the same page to specify general information and select the platform you want to target. Add **additional options** to send a payload with your push notification.

![firebase-push-payload](/firebase-push-payload.webp)

In the **Advanced options** section, add a **Custom data** key-value pair. For example, you can use the key `detailsId` and a value of your choice. This data will be used in the app to navigate to the details page with the specified id.

After sending the push notification, your app should receive it and display the details page with the specified id when the notification is tapped.

### Using Firebase API

You can also send push notifications programmatically using the Firebase API. To do this, you need to obtain the **Server key** from your Firebase project settings under the **Cloud Messaging** tab.


With the server key, you can send a POST request to the Firebase API with the required payload. Here's an example using Node.js and the `request` library:

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

Replace `YOUR_SERVER_KEY` and `YOUR_DEVICE_TOKEN` with your actual server key and device token. Run the script, and your device should receive the push notification with the custom payload.

That's it! You've successfully integrated push notifications in your Ionic Capacitor app using Firebase. Now you can send push notifications to your users on both Android and iOS platforms.
