---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notificaciones Push de Ionic Capacitor con Firebase: Una guía paso a paso'
description: >-
  Descubra cómo integrar notificaciones push en su aplicación Ionic Capacitor
  utilizando Firebase, con instrucciones paso a paso para plataformas Android e
  iOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notificaciones push de Ionic Capacitor con Firebase
tag: tutorial
published: true
locale: es
next_blog: ''
---

En este tutorial, integraremos notificaciones push en una aplicación Ionic Capacitor utilizando Firebase. No necesitas un servicio específico para esto, pero sí debes configurar varias cosas de antemano. Firebase es una excelente opción ya que es necesario para Android, y puedes usarlo fácilmente para enviar notificaciones sin utilizar la base de datos.

Primero, crearemos una aplicación Ionic con Capacitor habilitado y especificaremos nuestro **id de paquete**, que es el identificador único para tu aplicación. Luego, construiremos la aplicación y añadiremos las plataformas nativas.

Si ya tienes una aplicación, puedes cambiar el **capacitor.config.json** para incluir tu **appId**. Sin embargo, si tus carpetas nativas ya existen, necesitarás reemplazar el id en todos los archivos donde aparezca, ya que Capacitor solo crea la carpeta una vez y **no actualizará el id por sí mismo**. En el **capacitor.config.json**, también puedes especificar opciones como actualizar el contador de insignias, reproducir sonido en el push y mostrar una alerta cuando llega una notificación.

Ahora, configuremos las notificaciones push fuera de la aplicación.

## Configuración de Firebase

Comienza [creando un nuevo proyecto de Firebase](https://firebase.google.com/) o usando uno existente. Proporciona un nombre y opciones predeterminadas para un nuevo proyecto.

Si tienes una nueva aplicación, deberías ver "Comienza añadiendo Firebase a tu aplicación" en el panel de tu aplicación. De lo contrario, haz clic en el ícono de engranaje y ve a **configuración del proyecto** para añadir una aplicación.

El diálogo para iOS y Android se ve similar, y lo importante es usar tu **id de paquete** para las aplicaciones.

Después del paso inicial, descarga los siguientes archivos:

- Archivo **google-services.json** para Android
- Archivo **GoogleService-Info.plist** para iOS

A continuación, configura las plataformas.

### Preparación de Push para Android

Para Android, mueve el archivo **google-services.json** que descargaste a la carpeta **android/app/**

Eso es todo para Android. Ahora configuremos iOS.

### Preparación de Push para iOS

Esta parte es más complicada. Primero, [crea un ID de App para tu aplicación dentro de la lista de identificadores](https://developer.apple.com/account/resources/identifiers/list/) de tu cuenta de Apple Developer. Asegúrate de **seleccionar la capacidad de Notificaciones Push** de la lista.

El **Bundle ID** debe ser el mismo que tu ID de App dentro de Capacitor y Firebase.

Ahora, [crea una Clave](https://developer.apple.com/account/resources/authkeys/list/) y habilita el **servicio de Notificaciones Push de Apple (APNs)**. Si has alcanzado el número máximo de claves, puedes usar una clave existente o un certificado en su lugar, pero el proceso es más complicado.

Después de descargar el archivo **p8**, súbelo a Firebase. Abre la pestaña **Cloud Messaging** en la configuración de tu proyecto de Firebase, sube el archivo e ingresa los detalles del ID de la Clave y tu ID de Equipo de iOS.

Ahora, realiza cambios en tu proyecto de Xcode ejecutando:

Copia el archivo **GoogleService-Info.plist** que descargaste de Firebase en tu proyecto iOS. Arrastra el archivo al proyecto de Xcode dentro de la carpeta app/app, y selecciona **Copiar elementos si es necesario**.

Luego, añade un nuevo Pod para la dependencia de Firebase en el **ios/App/Podfile**:

Actualiza la plataforma nativa con este comando:

Modifica el código nativo Swift en **ios/App/App/AppDelegate.swift** para registrarse con Firebase y devolver el token correcto a tu aplicación.

Finalmente, añade la Capacidad para Notificaciones Push dentro de tu proyecto de Xcode.

Ahora, construye tu aplicación e integra las notificaciones push.

## Integración de Notificaciones Push en Ionic

Crea un servicio y una nueva página en tu proyecto Ionic:

Actualiza el enrutamiento en **app/app-routing.module**ts** para incluir la nueva página con un id dinámico:

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

Crea un servicio para manejar las notificaciones push en **services/fcmservice.ts**:

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

Llama a la función `initPush()` en **app/app.component.ts**:

```bash
npx cap open ios
```

Maneja la información en la página de detalles en **pages/details/details.page.ts**:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Muestra los detalles en **pages/details/details.page.html**:

```bash
npx cap update ios
```

Compila la aplicación, sincroniza tus cambios y despliégala en tu dispositivo

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

Ahora, puedes enviar notificaciones push con Firebase

## Enviando Notificaciones Push con Firebase

Hay varias formas de enviar notificaciones push con Firebase

### Prueba en un Dispositivo Específico

Después de desplegar tu aplicación en un dispositivo, puedes revisar los registros de la consola para ver el token después del registro. Usa este token para enviar una prueba de push dirigida para confirmar que tu integración está funcionando. En Firebase, ve a **Cloud Messaging** y selecciona **Send test message**. Agrega el token del dispositivo de los registros.

![firebase-test-push](/firebase-test-push.webp)

Si todo está configurado correctamente, deberías ver una notificación push en tu dispositivo.

### Mensaje Push con Carga Útil

Para probar una notificación push con información adicional, sigue el asistente en la misma página para especificar información general y selecciona la plataforma que deseas dirigir. Agrega **additional options** para enviar una carga útil con tu notificación push.

![firebase-push-payload](/firebase-push-payload.webp)

En la sección **Advanced options**, agrega un par clave-valor de **Custom data**. Por ejemplo, puedes usar la clave `detailsId` y un valor de tu elección. Estos datos se utilizarán en la aplicación para navegar a la página de detalles con el id especificado.

Después de enviar la notificación push, tu aplicación debería recibirla y mostrar la página de detalles con el id especificado cuando se toque la notificación.

### Usando la API de Firebase

También puedes enviar notificaciones push programáticamente usando la API de Firebase. Para hacer esto, necesitas obtener la **Server key** de la configuración de tu proyecto Firebase bajo la pestaña **Cloud Messaging**.

Con la clave del servidor, puedes enviar una solicitud POST a la API de Firebase con la carga útil requerida. Aquí hay un ejemplo usando Node.js y la biblioteca `request`:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Reemplaza `YOUR_SERVER_KEY` y `YOUR_DEVICE_TOKEN` con tu clave de servidor real y token de dispositivo. Ejecuta el script, y tu dispositivo debería recibir la notificación push con la carga útil personalizada.

¡Eso es todo! Has integrado exitosamente las notificaciones push en tu aplicación Ionic Capacitor usando Firebase. Ahora puedes enviar notificaciones push a tus usuarios tanto en plataformas Android como iOS.