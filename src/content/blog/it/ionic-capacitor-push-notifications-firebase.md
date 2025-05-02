---
slug: notifiche-push-firebase-con-ionic-capacitor
title: 'Le Notifiche Push di Ionic Capacitor con Firebase: Una Guida Passo-Passo'
description: >-
  Scopri come integrare le notifiche push nella tua app Ionic Capacitor
  utilizzando Firebase, con istruzioni dettagliate sia per piattaforme Android
  che iOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notifiche Push di Ionic Capacitor con Firebase
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: tutorial
published: true
locale: it
next_blog: ''
original_slug: ionic-capacitor-push-notifications-firebase
---
In questo tutorial, integreremo le notifiche push in un'app Ionic Capacitor utilizzando Firebase. Non è necessario un servizio specifico, ma è necessario configurare diverse cose in anticipo. Firebase è un'ottima scelta poiché è richiesto per Android e puoi utilizzarlo facilmente per inviare notifiche senza utilizzare il database.

<div class="mx-auto" style="width: 50%;">
  <video src="/push_demo.mov" alt="ionic capacitor push" autoplay loop muted>
</div>

Per prima cosa, creeremo un'app Ionic con Capacitor abilitato e specificheremo il nostro **package id**, che è l'identificatore univoco per la tua app. Quindi, compileremo l'app e aggiungeremo le piattaforme native.

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

Se hai già un'app, puoi modificare il **capacitor.config.json** per includere il tuo **appId**. Tuttavia, se le tue cartelle native esistono già, dovrai sostituire l'id in tutti i file in cui appare, poiché Capacitor crea la cartella una sola volta e **non aggiornerà l'id autonomamente**. Nel **capacitor.config.json**, puoi anche specificare opzioni come l'aggiornamento del conteggio dei badge, la riproduzione del suono alla ricezione di push e la visualizzazione di un avviso quando arriva una notifica.

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

Ora, configuriamo le notifiche push all'esterno dell'app.

## Configurazione Firebase

Inizia [creando un nuovo progetto Firebase](https://firebase.google.com/) o utilizzandone uno esistente. Fornisci un nome e le opzioni predefinite per un nuovo progetto.

Se hai una nuova app, dovresti vedere **"Inizia aggiungendo Firebase alla tua app"** nella dashboard della tua app. Altrimenti, fai clic sull'icona dell'ingranaggio e vai alle **impostazioni del progetto** per aggiungere un'app.

La finestra di dialogo per iOS e Android è simile, e la cosa importante è utilizzare il tuo **package id** per le app.

<div class="mx-auto" style="width: 100%;">
  <img src="/firebase-app-setup-ios.webp" alt="firebase-app-setup-ios">
</div>

Dopo il passaggio iniziale, scarica i seguenti file:

- File **google-services.json** per Android
- File **GoogleService-info.plist** per iOS

Successivamente, configura le piattaforme.

### Preparazione Push Android

Per Android, sposta il file **google-services.json** scaricato nella cartella **android/app/**.

<div class="mx-auto" style="width: 50%;">
  <img src="/android-push-file.webp" alt="android-push-file">
</div>

Questo è tutto per Android. Ora configuriamo iOS.

### Preparazione Push iOS

Questa parte è più complicata. Prima, [crea un ID App per la tua app nell'elenco degli identificatori](https://developer.apple.com/account/resources/identifiers/list/) del tuo account Apple Developer. Assicurati di **selezionare la capacità Push Notifications** dall'elenco.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

Il **Bundle ID** deve essere lo stesso del tuo App ID in Capacitor e Firebase.

Ora, [crea una Chiave](https://developer.apple.com/account/resources/authkeys/list/) e abilita il **servizio Apple Push Notifications (APNs)**. Se hai raggiunto il numero massimo di chiavi, puoi utilizzare una chiave esistente o un certificato, ma il processo è più complicato.

![ios-developer-push-key](/ios-developer-push-key.webp)

Dopo aver scaricato il file **.p8**, caricalo su Firebase. Apri la scheda **Cloud Messaging** nelle impostazioni del tuo progetto Firebase, carica il file e inserisci i dettagli per l'ID Chiave e il tuo Team ID da iOS.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

Ora, apporta modifiche al tuo progetto Xcode eseguendo:

```bash
npx cap open ios
```

Copia il file **GoogleService-Info.plist** scaricato da Firebase nel tuo progetto iOS. Trascina il file nel progetto Xcode all'interno della cartella app/app e seleziona **Copia elementi se necessario**.

Quindi, aggiungi un nuovo Pod per la dipendenza Firebase nel **ios/App/Podfile**:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Aggiorna la piattaforma nativa con questo comando:

```bash
npx cap update ios
```

Modifica il codice Swift nativo in **ios/App/App/AppDelegate.swift** per registrarti con Firebase e restituire il token corretto alla tua app.

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

Infine, aggiungi la Capability per le Push Notifications nel tuo progetto Xcode.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

Ora, compila la tua app e integra le notifiche push.

## Integrazione delle Notifiche Push in Ionic

Crea un servizio e una nuova pagina nel tuo progetto Ionic:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Aggiorna il routing in **app/app-routing.module.ts** per includere la nuova pagina con un id dinamico:

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

Crea un servizio per gestire le notifiche push in **services/fcm.service.ts**:

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

Chiama la funzione `initPush()` in **app/app.component.ts**:

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

Gestisci le informazioni nella pagina dei dettagli in **pages/details/details.page.ts**:

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

Visualizza i dettagli in **pages/details/details.page.html**:

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

Compila l'app, sincronizza le modifiche e distribuiscila sul tuo dispositivo.

```bash
ionic build
npx cap sync
```

Ora puoi inviare notifiche push con Firebase.

## Invio di Notifiche Push con Firebase

Ci sono diversi modi per inviare notifiche push con Firebase.

### Test su Dispositivo Specifico

Dopo aver distribuito la tua app su un dispositivo, puoi controllare i log della console per vedere il token dopo la registrazione. Usa questo token per inviare un test push mirato per confermare che la tua integrazione funzioni. In Firebase, vai su **Cloud Messaging** e seleziona **Invia messaggio di test**. Aggiungi il token del dispositivo dai log.

![firebase-test-push](/firebase-test-push.webp)

Se tutto è configurato correttamente, dovresti vedere una notifica push sul tuo dispositivo.

### Messaggio Push con Payload

Per testare una notifica push con informazioni aggiuntive, segui la procedura guidata nella stessa pagina per specificare informazioni generali e selezionare la piattaforma che desideri targetizzare. Aggiungi **opzioni aggiuntive** per inviare un payload con la tua notifica push.

![firebase-push-payload](/firebase-push-payload.webp)

Nella sezione **Opzioni avanzate**, aggiungi una coppia chiave-valore **Dati personalizzati**. Ad esempio, puoi utilizzare la chiave `detailsId` e un valore a tua scelta. Questi dati verranno utilizzati nell'app per navigare alla pagina dei dettagli con l'id specificato.

Dopo aver inviato la notifica push, la tua app dovrebbe riceverla e visualizzare la pagina dei dettagli con l'id specificato quando la notifica viene toccata.

### Utilizzo dell'API Firebase

Puoi anche inviare notifiche push programmaticamente utilizzando l'API Firebase. Per farlo, devi ottenere la **Chiave server** dalle impostazioni del tuo progetto Firebase nella scheda **Cloud Messaging**.

Con la chiave server, puoi inviare una richiesta POST all'API Firebase con il payload richiesto. Ecco un esempio utilizzando Node.js e la libreria `request`:

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

Sostituisci `YOUR_SERVER_KEY` e `YOUR_DEVICE_TOKEN` con la tua chiave server e token del dispositivo effettivi. Esegui lo script e il tuo dispositivo dovrebbe ricevere la notifica push con il payload personalizzato.

Ecco fatto! Hai integrato con successo le notifiche push nella tua app Ionic Capacitor utilizzando Firebase. Ora puoi inviare notifiche push ai tuoi utenti su entrambe le piattaforme Android e iOS.
