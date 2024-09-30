---
slug: ionic-capacitor-push-notifications-firebase
title: >-
  Notificaciones push de condensadores iónicos con Firebase: una guía paso a
  paso
description: >-
  Aprenda cómo integrar notificaciones automáticas en su aplicación Ionic
  Capacitor usando Firebase, con instrucciones paso a paso para plataformas
  Android e iOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Ionic Capacitor Push Notifications with Firebase
tag: tutorial
published: true
next_blog: ''
locale: es
---

En este tutorial, integraremos notificaciones push en una aplicación Ionic Capacitor usando Firebase. No necesita un servicio específico para esto, pero sí necesita configurar varias cosas de antemano. Firebase es una excelente opción ya que es necesario para Android y puede Úselo fácilmente para enviar notificaciones sin usar la base de datos

<div class="mx-auto" style="ancho: 50%;">
  <video src="/push_demomov" alt="bucle de reproducción automática del condensador iónico silenciado>
</div>


Primero, crearemos una aplicación Ionic con Capacitor habilitado y especificaremos nuestro **ID de paquete**, que es el identificador único de su aplicación. Luego, crearemos la aplicación y agregaremos las plataformas nativas.

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

Si ya tiene una aplicación, puede cambiar **capacitorconfigjson** para incluir su **appId**. Sin embargo, si sus carpetas nativas ya existen, deberá reemplazar la identificación en todos los archivos donde aparece, como solo Capacitor. crea la carpeta una vez y **no actualiza la identificación en sí** En **capacitorconfigjson**, también puede especificar opciones como actualizar el recuento de credenciales, reproducir sonido al presionar y mostrar una alerta cuando llega una notificación.

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

Ahora, configuremos las notificaciones push fuera de la aplicación.

## Configuración de base de fuego

Comience [creando un nuevo proyecto de Firebase](https://firebasegooglecom/) o usando uno existente. Proporcione un nombre y opciones predeterminadas para un nuevo proyecto.

Si tiene una aplicación nueva, debería ver **"Comience agregando Firebase a su aplicación"** en el panel de su aplicación. De lo contrario, haga clic en el ícono de ajustes y vaya a **configuración del proyecto** para agregar una aplicación.

El cuadro de diálogo tanto para iOS como para Android es similar y lo importante es usar su **ID de paquete** para las aplicaciones.


<div class="mx-auto" style="ancho: 100%;">
  <img src="/firebase-app-setup-ioswebp" alt="firebase-app-setup-ios">
</div>

Después del paso inicial, descargue los siguientes archivos:

- Archivo **google-servicesjson** para Android
- Archivo **GoogleService-infoplist** para iOS

A continuación, configure las plataformas.

### Preparación de inserción de Android

Para Android, mueva el archivo **google-servicesjson** que descargó a la carpeta **android/app/**

<div class="mx-auto" style="ancho: 50%;">
  <img src="/android-push-filewebp" alt="android-push-file">
</div>

Eso es todo por Android Ahora configuremos iOS

### Preparación de envío de iOS

Esta parte es más complicada Primero, [crea un ID de aplicación para tu aplicación dentro de la lista de identificadores](https://developerapplecom/account/resources/identifiers/list/) de tu cuenta de desarrollador de Apple. Asegúrate de **seleccionar las notificaciones automáticas. capacidad** de la lista

![ionic-ios-push-id](/ionic-ios-push-idwebp)

El **Bundle ID** debe ser el mismo que el ID de tu aplicación dentro de Capacitor y Firebase.

Ahora, [crea una clave](https://developerapplecom/account/resources/authkeys/list/) y habilita el **servicio de notificaciones push de Apple (APN)**. Si has alcanzado el número máximo de claves, puedes usar una clave existente o un certificado en su lugar, pero el proceso es más complicado

![tecla-push-desarrollador-ios](/tecla-push-desarrollador-ios-webp)

Después de descargar el archivo **p8**, cárguelo en Firebase. Abra la pestaña **Mensajería en la nube** en la configuración de su proyecto de Firebase, cargue el archivo e ingrese los detalles del ID de clave y el ID de su equipo desde iOS.

![firebase-upload-ios-key](/firebase-upload-ios-keywebp)

Ahora, realice cambios en su proyecto Xcode ejecutando:

```bash
npx cap open ios
```

Copie el archivo **GoogleService-Infoplist** que descargó de Firebase en su proyecto de iOS. Arrastre el archivo al proyecto Xcode dentro de la carpeta app/app y seleccione **Copiar elementos si es necesario**

A continuación, agregue un nuevo Pod para la dependencia de Firebase en **ios/App/Podfile**:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Actualice la plataforma nativa con este comando:

```bash
npx cap update ios
```

Modifique el código Swift nativo en **ios/App/App/AppDelegateswift** para registrarse en Firebase y devolver el token correcto a su aplicación.

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

Finalmente, agregue la capacidad de notificaciones push dentro de su proyecto Xcode

![capacitor-xcode-capacidad](/capacitor-xcode-capacidadweb)

Ahora, cree su aplicación e integre notificaciones push

## Integración de notificaciones push iónicas

Crea un servicio y una nueva página en tu proyecto Ionic:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Actualice el enrutamiento en **app/app-routingmodulets** para incluir la nueva página con una identificación dinámica:

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

Cree un servicio para manejar notificaciones push en **services/fcmservicets**:

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

Llame a la función `initPush()` en **app/appcomponentts**:

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

Maneje la información en la página de detalles en **pages/details/detailspagets**:

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

Muestra los detalles en **pages/details/detailspagehtml**:

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

Cree la aplicación, sincronice sus cambios e impleméntela en su dispositivo

```bash
ionic build
npx cap sync
```

Ahora puedes enviar notificaciones push con Firebase

## Envío de notificaciones push con Firebase

Hay varias formas de enviar notificaciones push con Firebase

### Prueba de dispositivo específico

Después de implementar su aplicación en un dispositivo, puede verificar los registros de la consola para ver el token después del registro. Use este token para enviar una prueba dirigida para confirmar que su integración está funcionando. En Firebase, vaya a **Mensajería en la nube** y seleccione ** Enviar mensaje de prueba** Agregar el token del dispositivo desde los registros

![firebase-test-push](/firebase-test-pushwebp)

Si todo está configurado correctamente, deberías ver una notificación push en tu dispositivo.

### Mensaje push con carga útil

Para probar una notificación push con información adicional, siga el asistente en la misma página para especificar información general y seleccione la plataforma a la que desea dirigirse. Agregue **opciones adicionales** para enviar una carga útil con su notificación push.

![firebase-push-payload](/firebase-push-payloadwebp)

En la sección **Opciones avanzadas**, agregue un par clave-valor **Datos personalizados**. Por ejemplo, puede usar la clave `detailsId` y un valor de su elección. Estos datos se usarán en la aplicación para navegar a la página de detalles con la identificación especificada

Después de enviar la notificación push, su aplicación debería recibirla y mostrar la página de detalles con la identificación especificada cuando se toca la notificación.

### Usando la API de Firebase

También puedes enviar notificaciones automáticas mediante programación usando la API de Firebase. Para hacer esto, necesitas obtener la **Clave del servidor** de la configuración de tu proyecto de Firebase en la pestaña **Mensajería en la nube**.


Con la clave del servidor, puede enviar una solicitud POST a la API de Firebase con la carga útil requerida. Aquí hay un ejemplo usando Nodejs y la biblioteca `request`:

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

Reemplace `YOUR_SERVER_KEY` y `YOUR_DEVICE_TOKEN` con su clave de servidor y token de dispositivo reales. Ejecute el script y su dispositivo debería recibir la notificación push con la carga útil personalizada.

¡Eso es todo! Has integrado con éxito notificaciones push en tu aplicación Ionic Capacitor usando Firebase. Ahora puedes enviar notificaciones push a tus usuarios en plataformas Android e iOS.