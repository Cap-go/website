---
slug: updating-from-capacitor-4-to-capacitor-5
title: 'Actualización de Capacitor 4 a Capacitor 5: Una guía paso a paso'
description: >-
  Aprende a actualizar tu proyecto de Capacitor 4 a Capacitor 5 con cambios
  mínimos, incluyendo la actualización de plugins oficiales y herramientas
  requeridas.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Ilustración de la actualización de Capacitor 4 a 5
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: es
next_blog: ''
---
En comparación con actualizaciones anteriores, la transición de Capacitor 4 a Capacitor 5 implica cambios rotos mínimos. Esta guía proporciona instrucciones paso a paso para actualizar tu proyecto a Capacitor 5, así como una lista de cambios rotos para los plugins oficiales.

**Nota**: Capacitor 5 requiere NodeJS 16 o superior, ya que Node 12 ha llegado al final de su vida útil y Node 14 alcanzará el final de su vida útil el 30 de abril de 2023. Se recomienda utilizar la última versión LTS de NodeJS.

1. Instala la versión `latest` de la CLI de Capacitor en tu proyecto:

   ```
   npm i -D @capacitor/cli@latest
   ```

2. Ejecuta el siguiente comando para permitir que la CLI maneje la migración:

   ```
   npx cap migrate
   ```

   Si no se pueden lograr algunos pasos de migración, se proporcionará información adicional en la salida de la terminal. Los pasos de migración manual se enumeran a continuación.

3. Si tienes la extensión de VS Code instalada, verifica la sección de recomendaciones de la extensión para encontrar la opción de migrar tu proyecto a Capacitor 5.

### Actualizando el Proyecto iOS de Capacitor 4 a Capacitor 5

1. **Actualizar Xcode**: Capacitor 5 requiere Xcode 14.1 o superior.

2. **Actualizar .gitignore**: Realiza los siguientes cambios en tu archivo `.gitignore`:

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **Actualizar Activos para usar un solo ícono de aplicación**: Xcode 14 admite un solo ícono de aplicación de 1024x1024. Limpia tu AppIcon.appiconset eliminando todos los tamaños innecesarios.

### Actualizando el Proyecto Android de Capacitor 4 a Capacitor 5

1. **Actualizar Android Studio**: Capacitor 5 requiere Android Studio Flamingo | 2022.2.1 o más reciente debido al uso de Gradle 8, que requiere Java JDK 17. Java 17 se incluye con Android Studio Flamingo, por lo que no se necesitan descargas adicionales.

2. **Ejecutar el Asistente de Actualización de AGP**: Android Studio puede ayudar con algunas actualizaciones relacionadas con Gradle y movimiento de paquetes en archivos de construcción. Para comenzar, ejecuta `Herramientas -> Asistente de Actualización de AGP`.

3. **Actualizar Variables del Proyecto Android**: En tu archivo `variables.gradle`, actualiza tus valores a los siguientes mínimos nuevos:

   ```
   minSdkVersion = 22
   compileSdkVersion = 33
   targetSdkVersion = 33
   androidxActivityVersion = '1.7.0'
   androidxAppCompatVersion = '1.6.1'
   androidxCoordinatorLayoutVersion = '1.2.0'
   androidxCoreVersion = '1.10.0'
   androidxFragmentVersion = '1.5.6'
   coreSplashScreenVersion = '1.0.0'
   androidxWebkitVersion = '1.6.1'
   junitVersion = '4.13.2'
   androidxJunitVersion = '1.1.5'
   androidxEspressoCoreVersion = '3.5.1'
   cordovaAndroidVersion = '10.1.1'
   ```

4. **Actualizar Servicios de Google**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Actualizar el plugin de Gradle a 8.0.0**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Actualizar el wrapper de Gradle a 8.0.2**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Desactivar Jetifier**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **Mover paquete a `build.gradle`**:

   ```
   # AndroidManifest.xml
   <?xml version="1.0" encoding="utf-8"?>
   - <manifest xmlns:android="http://schemas.android.com/apk/res/android"
   -     package="[YOUR_PACKAGE_ID]">
   + <manifest xmlns:android="http://schemas.android.com/apk/res/android">
   ```

   ```
   # build.gradle
   android {
   +     namespace "[YOUR_PACKAGE_ID]"
         compileSdkVersion rootProject.ext.compileSdkVersion
   ```

9. **Actualizar androidScheme**: En Capacitor 6, `https` será la configuración predeterminada para `androidScheme` para aplicaciones existentes para habilitar mejor las aplicaciones de Capacitor para usar la función de Autocompletar del sistema. Para evitar la pérdida de datos como resultado de este cambio, establece el esquema en `http` ahora, incluso si es la configuración predeterminada actual.

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Actualizar versión de Kotlin**: Si tu proyecto utiliza Kotlin, actualiza la variable `kotlin_version` a `'1.8.20'`.

### Cambios en la Funcionalidad de Plugins

La funcionalidad del siguiente plugin ha sido modificada o eliminada. Actualiza tu código en consecuencia:

- Action Sheet
- Browser
- Camera
- Device
- Geolocation
- Google Maps
- Local Notifications
- Push Notifications
- Status Bar

### Action Sheet

- Actualiza la variable `androidxMaterialVersion` a `1.8.0`.

### Browser

- Actualiza la variable `androidxBrowserVersion` a `1.5.0`.

### Camera

- Para Android 13, agrega el permiso de lectura de imágenes multimedia (`<?xml version="1.0" encoding="utf-8"?>`) en `AndroidManifest.xml`.
- Actualiza la variable `androidxMaterialVersion` a `1.8.0`.
- Actualiza la variable `androidxExifInterfaceVersion` a `1.3.6`.

### Device

- Cambia `DeviceId.uuid` a `DeviceId.identifier`.
- En iOS 16+, `DeviceInfo.name` devolverá un nombre de dispositivo genérico a menos que agregues los [derechos](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/) apropiados.

### Geolocation

- Actualiza la `playServicesLocationVersion` a `21.0.1`.

### Google Maps

- Actualiza las siguientes variables:
  - `googleMapsPlayServicesVersion` a `18.1.0`.
  - `googleMapsUtilsVersion` a `3.4.0`.
  - `googleMapsKtxVersion` a `3.4.0`.
  - `googleMapsUtilsKtxVersion` a `3.4.0`.
  - `kotlinxCoroutinesVersion` a `1.6.4`.
  - `androidxCoreKTXVersion` a `1.10.0`.
  - `kotlin_version` a `1.8.20`.

### Local Notifications

- Para Android 13, se requiere un nuevo chequeo de permisos en tiempo de ejecución para programar notificaciones locales al objetivo SDK 33. Llama a `checkPermissions()` y `requestPermissions()` según sea necesario.

### Push Notifications

- Para Android 13, se requiere un nuevo chequeo de permisos en tiempo de ejecución para recibir notificaciones push al objetivo SDK 33. Llama a `checkPermissions()` y `requestPermissions()` según sea necesario.
- Actualiza la variable `firebaseMessagingVersion` a `23.1.2`.

### Status Bar

- En iOS, la animación predeterminada de la barra de estado ha cambiado a `FADE`.

Siguiendo estos pasos y actualizando tu código en consecuencia, deberías haber actualizado exitosamente tu proyecto de Capacitor 4 a Capacitor 5. Asegúrate de probar tu aplicación a fondo para garantizar que todas las funciones y plugins funcionen como se espera.
