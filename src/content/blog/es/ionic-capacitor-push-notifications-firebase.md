---
slug: notificaciones-push-firebase-ionic-capacitor
title: 'Notificaciones Push de Ionic Capacitor con Firebase: Una Guía Paso a Paso'
description: >-
  Aprende cómo integrar notificaciones push en tu aplicación Ionic Capacitor
  usando Firebase, con instrucciones paso a paso para las plataformas Android e
  iOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notificaciones Push de Ionic Capacitor con Firebase
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: tutorial
published: true
locale: es
next_blog: ''
original_slug: ionic-capacitor-push-notifications-firebase
---
En este tutorial, integraremos notificaciones push en una aplicación Ionic Capacitor usando Firebase. No necesitas un servicio específico para esto, pero necesitas configurar varias cosas de antemano. Firebase es una excelente opción ya que es necesario para Android, y puedes usarlo fácilmente para enviar notificaciones sin usar la base de datos.

<Steps>
  <Step>Configurar un proyecto de Firebase</Step>
  <Step>Configurar las plataformas nativas</Step>
  <Step>Integrar las notificaciones push en la aplicación</Step>
</Steps>

Primero, crearemos una aplicación Ionic con Capacitor habilitado y especificaremos nuestro **package id**, que es el identificador único para tu aplicación. Luego, construiremos la aplicación y agregaremos las plataformas nativas.

```bash
ionic start ionic-push-demo blank --capacitor
cd ionic-push-demo
npm i @capacitor/push-notifications
ionic build
npx cap add ios
npx cap add android
```

Si ya tienes una aplicación, puedes cambiar el **capacitor.config.json** para incluir tu **appId**. Sin embargo, si tus carpetas nativas ya existen, necesitarás reemplazar el id en todos los archivos donde aparezca, ya que Capacitor solo crea la carpeta una vez y **no actualizará el id por sí mismo**. En el **capacitor.config.json**, también puedes especificar opciones como actualizar el contador de insignias, reproducir sonido en push y mostrar una alerta cuando llega una notificación.

```json
{
  "appId": "com.company.app",
  "appName": "ionic-push-demo",
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

Ahora, configuremos las notificaciones push fuera de la aplicación.

## Configuración de Firebase

Comienza [creando un nuevo proyecto de Firebase](https://firebase.google.com/) o usando uno existente. Proporciona un nombre y opciones predeterminadas para un nuevo proyecto.

Si tienes una nueva aplicación, deberías ver **"Comienza agregando Firebase a tu aplicación"** en el panel de tu aplicación. De lo contrario, haz clic en el ícono de engranaje y ve a **configuración del proyecto** para agregar una aplicación.

El diálogo para iOS y Android se ve similar, y lo importante es usar tu **package id** para las aplicaciones.

<Steps>
  1. Configura una aplicación Android
  2. Configura una aplicación iOS
  3. Descarga los archivos de configuración
</Steps>

Después del paso inicial, descarga los siguientes archivos:

- Archivo **google-services.json** para Android
- Archivo **GoogleService-info.plist** para iOS

A continuación, configura las plataformas.

### Preparación Push para Android

Para Android, mueve el archivo **google-services.json** que descargaste a la carpeta **android/app/**.

<Steps>
  1. Mueve el archivo de configuración
  2. Sincroniza el proyecto
</Steps>

Eso es todo para Android. Ahora configuremos iOS.

### Preparación Push para iOS

Esta parte es más complicada. Primero, [crea un ID de Aplicación para tu app dentro de la lista de identificadores](https://developer.apple.com/account/resources/identifiers/list/) de tu cuenta de Apple Developer. Asegúrate de **seleccionar la capacidad de Notificaciones Push** de la lista.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

El **Bundle ID** debe ser el mismo que tu App ID dentro de Capacitor y Firebase.

Ahora, [crea una Clave](https://developer.apple.com/account/resources/authkeys/list/) y habilita el **servicio de Notificaciones Push de Apple (APNs)**. Si has alcanzado el número máximo de claves, puedes usar una clave existente o un certificado en su lugar, pero el proceso es más complicado.

![ios-developer-push-key](/ios-developer-push-key.webp)

Después de descargar el archivo **.p8**, súbelo a Firebase. Abre la pestaña **Cloud Messaging** en la configuración de tu proyecto Firebase, sube el archivo e ingresa los detalles del ID de la Clave y tu ID de Equipo de iOS.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

Ahora, realiza cambios en tu proyecto Xcode ejecutando:

```bash
npx cap open ios
```

Copia el archivo **GoogleService-Info.plist** que descargaste de Firebase en tu proyecto iOS. Arrastra el archivo al proyecto Xcode dentro de la carpeta app/app, y selecciona **Copiar elementos si es necesario**.

A continuación, agrega un nuevo Pod para la dependencia de Firebase en **ios/App/Podfile**:

```ruby
pod 'Firebase/Messaging'
```

Actualiza la plataforma nativa con este comando:

```bash
npx cap update ios
```

Modifica el código nativo Swift en **ios/App/App/AppDelegate.swift** para registrarte con Firebase y devolver el token correcto a tu aplicación.

```swift
import UIKit
import Capacitor
import Firebase
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        
        // Register for remote notifications
        UNUserNotificationCenter.current().delegate = self
        let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
        UNUserNotificationCenter.current().requestAuthorization(
            options: authOptions,
            completionHandler: { _, _ in }
        )
        application.registerForRemoteNotifications()
        
        Messaging.messaging().delegate = self
        
        return true
    }
    
    // ...
}

extension AppDelegate: MessagingDelegate {
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        print("Firebase registration token: \(String(describing: fcmToken))")
    }
}

extension AppDelegate: UNUserNotificationCenterDelegate {
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([[.banner, .list, .sound]])
    }
}
```

Finalmente, agrega la Capacidad para Notificaciones Push dentro de tu proyecto Xcode.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

Ahora, construye tu aplicación e integra las notificaciones push.

## Integración de Notificaciones Push en Ionic

Crea un servicio y una nueva página en tu proyecto Ionic:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Actualiza el enrutamiento en **app/app-routing.module.ts** para incluir la nueva página con un id dinámico:

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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

Crea un servicio para manejar las notificaciones push en **services/fcm.service.ts**:

```typescript
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router) { }

  initPush() {
    this.registerPush();
  }

  private async registerPush() {
    try {
      let permStatus = await PushNotifications.checkPermissions();
      
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();

      await PushNotifications.addListener('pushNotificationReceived',
        (notification: any) => {
          console.log('Push received: ' + JSON.stringify(notification));
        }
      );

      await PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: any) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
          this.router.navigateByUrl(`/details/${notification.notification.data.detailsId}`);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}
```

Llama a la función `initPush()` en **app/app.component.ts**:

```typescript
import { Component } from '@angular/core';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private fcmService: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.fcmService.initPush();
  }
}
```

Maneja la información en la página de detalles en **pages/details/details.page.ts**:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
```

Muestra los detalles en **pages/details/details.page.html**:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>details</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Details ID: {{ id }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</ion-content>
```

Construye la aplicación, sincroniza tus cambios y despliégala en tu dispositivo.

```bash
ionic build
npx cap sync
npx cap open ios
npx cap open android
```

Ahora, puedes enviar notificaciones push con Firebase.

## Enviar Notificaciones Push con Firebase

Hay varias formas de enviar notificaciones push con Firebase.

### Prueba en Dispositivo Específico

Después de desplegar tu aplicación en un dispositivo, puedes revisar los registros de la consola para ver el token después del registro. Usa este token para enviar una prueba dirigida para confirmar que tu integración está funcionando. En Firebase, ve a **Cloud Messaging** y selecciona **Enviar mensaje de prueba**. Agrega el token del dispositivo de los registros.

![firebase-test-push](/firebase-test-push.webp)

Si todo está configurado correctamente, deberías ver una notificación push en tu dispositivo.

### Mensaje Push con Payload

Para probar una notificación push con información adicional, sigue el asistente en la misma página para especificar información general y seleccionar la plataforma que deseas dirigir. Agrega **opciones adicionales** para enviar un payload con tu notificación push.

![firebase-push-payload](/firebase-push-payload.webp)

En la sección de **Opciones avanzadas**, agrega un par clave-valor de **Datos personalizados**. Por ejemplo, puedes usar la clave `detailsId` y un valor de tu elección. Estos datos se usarán en la aplicación para navegar a la página de detalles con el id especificado.

Después de enviar la notificación push, tu aplicación debería recibirla y mostrar la página de detalles con el id especificado cuando se toque la notificación.

### Usando la API de Firebase

También puedes enviar notificaciones push programáticamente usando la API de Firebase. Para hacer esto, necesitas obtener la **Clave del servidor** de la configuración de tu proyecto Firebase bajo la pestaña **Cloud Messaging**.

Con la clave del servidor, puedes enviar una solicitud POST a la API de Firebase con el payload requerido. Aquí hay un ejemplo usando Node.js y la biblioteca `request`:

```javascript
const request = require('request');

const options = {
  method: 'POST',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'Authorization': 'key=YOUR_SERVER_KEY',
    'Content-Type': 'application/json'
  },
  body: {
    to: 'YOUR_DEVICE_TOKEN',
    notification: {
      title: 'Título de la notificación',
      body: 'Cuerpo de la notificación'
    },
    data: {
      detailsId: '123'
    }
  },
  json: true
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);
  console.log(body);
});
```

Reemplaza `YOUR_SERVER_KEY` y `YOUR_DEVICE_TOKEN` con tu clave de servidor real y token de dispositivo. Ejecuta el script, y tu dispositivo debería recibir la notificación push con el payload personalizado.

¡Eso es todo! Has integrado exitosamente las notificaciones push en tu aplicación Ionic Capacitor usando Firebase. Ahora puedes enviar notificaciones push a tus usuarios en ambas plataformas Android e iOS.
