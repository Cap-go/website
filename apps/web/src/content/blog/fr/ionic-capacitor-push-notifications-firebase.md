---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notifications Push Ionic Capacitor avec Firebase : Un guide étape par étape'
description: >-
  Apprenez à intégrer des notifications push dans votre application Ionic
  Capacitor en utilisant Firebase, avec des instructions étape par étape pour
  les plateformes Android et iOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notifications Push Ionic Capacitor avec Firebase
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: ''
---
Dans ce tutoriel, nous allons intégrer des notifications push dans une application Ionic Capacitor en utilisant Firebase. Vous n'avez pas besoin d'un service spécifique pour cela, mais vous devez configurer plusieurs éléments au préalable. Firebase est un excellent choix puisqu'il est requis pour Android, et vous pouvez facilement l'utiliser pour envoyer des notifications sans utiliser la base de données.

<div class="mx-auto" style="width: 50%;">
  <video src="/push_demo.mov" alt="ionic capacitor push" autoplay loop muted>
</div>

Tout d'abord, nous allons créer une application Ionic avec Capacitor activé et spécifier notre **identifiant de package**, qui est l'identifiant unique de votre application. Ensuite, nous allons construire l'application et ajouter les plateformes natives.

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

Si vous avez déjà une application, vous pouvez modifier le **capacitor.config.json** pour inclure votre **appId**. Cependant, si vos dossiers natifs existent déjà, vous devrez remplacer l'identifiant dans tous les fichiers où il apparaît, car Capacitor ne crée le dossier qu'une seule fois et **ne mettra pas à jour l'identifiant lui-même**. Dans le **capacitor.config.json**, vous pouvez également spécifier des options comme la mise à jour du nombre de badges, la lecture de son lors de la réception d'une notification, et l'affichage d'une alerte lorsque celle-ci arrive.

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

Maintenant, configurons les notifications push en dehors de l'application.

## Configuration de Firebase

Commencez par [créer un nouveau projet Firebase](https://firebase.google.com/) ou en utilisant un existant. Fournissez un nom et des options par défaut pour un nouveau projet.

Si vous avez une nouvelle application, vous devriez voir **"Commencez par ajouter Firebase à votre application"** dans le tableau de bord de votre application. Sinon, cliquez sur l'icône d'engrenage et allez dans **paramètres du projet** pour ajouter une application.

La boîte de dialogue pour iOS et Android ressemble à celle-ci, et l'important est d'utiliser votre **identifiant de package** pour les applications.

<div class="mx-auto" style="width: 100%;">
  <img src="/firebase-app-setup-ios.webp" alt="firebase-app-setup-ios">
</div>

Après l'étape initiale, téléchargez les fichiers suivants :

- Fichier **google-services.json** pour Android
- Fichier **GoogleService-info.plist** pour iOS

Ensuite, configurez les plateformes.

### Préparation des notifications push Android

Pour Android, déplacez le fichier **google-services.json** que vous avez téléchargé dans le dossier **android/app/**.

<div class="mx-auto" style="width: 50%;">
  <img src="/android-push-file.webp" alt="android-push-file">
</div>

C'est tout pour Android. Maintenant, configurons iOS.

### Préparation des notifications push iOS

Cette partie est plus compliquée. Tout d'abord, [créez un ID d'application pour votre application dans la liste des identifiants](https://developer.apple.com/account/resources/identifiers/list/) de votre compte développeur Apple. Assurez-vous de **sélectionner la capacité des notifications push** dans la liste.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

L'**ID de module** doit être le même que votre ID d'application dans Capacitor et Firebase.

Maintenant, [créez une clé](https://developer.apple.com/account/resources/authkeys/list/) et activez le **service de notifications push d'Apple (APNs)**. Si vous avez atteint le nombre maximum de clés, vous pouvez utiliser une clé existante ou un certificat à la place, mais le processus est plus compliqué.

![ios-developer-push-key](/ios-developer-push-key.webp)

Après avoir téléchargé le fichier **.p8**, téléchargez-le sur Firebase. Ouvrez l'onglet **Cloud Messaging** dans les paramètres de votre projet Firebase, téléchargez le fichier et entrez les détails pour l'ID de clé et votre ID d'équipe depuis iOS.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

Maintenant, apportez des modifications à votre projet Xcode en exécutant :

```bash
npx cap open ios
```

Copiez le fichier **GoogleService-Info.plist** que vous avez téléchargé depuis Firebase dans votre projet iOS. Faites glisser le fichier dans le projet Xcode à l'intérieur du dossier app/app, et sélectionnez **Copier les éléments si nécessaire**.

Ensuite, ajoutez un nouveau Pod pour la dépendance Firebase dans le **ios/App/Podfile** :

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Mettez à jour la plateforme native avec cette commande :

```bash
npx cap update ios
```

Modifiez le code Swift natif dans **ios/App/App/AppDelegate.swift** pour s'enregistrer auprès de Firebase et retourner le bon jeton à votre application.

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

Enfin, ajoutez la capacité pour les notifications push dans votre projet Xcode.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

Maintenant, construisez votre application et intégrez les notifications push.

## Intégration des notifications push Ionic

Créez un service et une nouvelle page dans votre projet Ionic :

```bash
ionic g service services/fcm
ionic g page pages/details
```

Mettez à jour le routage dans **app/app-routing.module.ts** pour inclure la nouvelle page avec un identifiant dynamique :

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

Créez un service pour gérer les notifications push dans **services/fcm.service.ts** :

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

Appelez la fonction `initPush()` dans **app/app.component.ts** :

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

Gérez les informations sur la page des détails dans **pages/details/details.page.ts** :

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

Affichez les détails dans **pages/details/details.page.html** :

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

Construisez l'application, synchronisez vos modifications et déployez-la sur votre appareil.

```bash
ionic build
npx cap sync
```

Maintenant, vous pouvez envoyer des notifications push avec Firebase.

## Envoi de notifications push avec Firebase

Il existe plusieurs façons d'envoyer des notifications push avec Firebase.

### Test de périphérique spécifique

Après avoir déployé votre application sur un appareil, vous pouvez consulter les journaux de la console pour voir le jeton après l'enregistrement. Utilisez ce jeton pour envoyer une notification push de test ciblée afin de confirmer que votre intégration fonctionne. Dans Firebase, allez dans **Cloud Messaging** et sélectionnez **Envoyer un message de test**. Ajoutez le jeton de l'appareil à partir des journaux.

![firebase-test-push](/firebase-test-push.webp)

Si tout est correctement configuré, vous devriez voir une notification push sur votre appareil.

### Message push avec charge utile

Pour tester une notification push avec des informations supplémentaires, suivez l'assistant sur la même page pour spécifier les informations générales et sélectionnez la plateforme que vous souhaitez cibler. Ajoutez **des options supplémentaires** pour envoyer une charge utile avec votre notification push.

![firebase-push-payload](/firebase-push-payload.webp)

Dans la section **Options avancées**, ajoutez une paire clé-valeur **Données personnalisées**. Par exemple, vous pouvez utiliser la clé `detailsId` et une valeur de votre choix. Ces données seront utilisées dans l'application pour naviguer vers la page des détails avec l'identifiant spécifié.

Après avoir envoyé la notification push, votre application devrait la recevoir et afficher la page de détails avec l'identifiant spécifié lorsque la notification est touchée.

### Utilisation de l'API Firebase

Vous pouvez également envoyer des notifications push de manière programmatique en utilisant l'API Firebase. Pour ce faire, vous devez obtenir la **clé du serveur** à partir des paramètres de votre projet Firebase sous l'onglet **Cloud Messaging**.

Avec la clé du serveur, vous pouvez envoyer une requête POST à l'API Firebase avec la charge utile requise. Voici un exemple utilisant Node.js et la bibliothèque `request` :

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

Remplacez `YOUR_SERVER_KEY` et `YOUR_DEVICE_TOKEN` par votre clé de serveur réelle et votre jeton d'appareil. Exécutez le script, et votre appareil devrait recevoir la notification push avec la charge utile personnalisée.

C'est tout ! Vous avez réussi à intégrer les notifications push dans votre application Ionic Capacitor en utilisant Firebase. Maintenant, vous pouvez envoyer des notifications push à vos utilisateurs sur les plateformes Android et iOS.
