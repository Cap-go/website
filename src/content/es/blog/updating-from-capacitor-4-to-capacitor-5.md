---
slug: updating-from-capacitor-4-to-capacitor-5
title: "Mise à jour du condensateur 4 vers le condensateur 5\_: una guía etapa por etapa"
description: >-
  Découvrez comment mettre à jour votre projet de Capacitor 4 vers Capacitor 5
  con un mínimo de modificaciones mayores, y comprende la puesta a punto de los
  complementos oficiales y des herramientas requeridas.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Capacitor 4 to 5 update illustration
tag: Capacitor
published: true
next_blog: ''
locale: es
---

En comparación con actualizaciones anteriores, la transición de Capacitor 4 a Capacitor 5 implica cambios mínimos. Esta guía proporciona instrucciones paso a paso para actualizar su proyecto a Capacitor 5, así como una lista de cambios importantes para complementos oficiales.

**Nota**: El condensador 5 requiere NodeJS 16 o superior, ya que el Nodo 12 ha llegado al final de su vida útil y el Nodo 14 llegará al final de su vida útil el 30 de abril de 2023. Se recomienda utilizar la última versión LTS de NodeJS.

1 Instale la versión más reciente de Capacitor CLI en su proyecto:

   ```
   npm i -D @capacitor/cli@latest
   ```

2 Ejecute el siguiente comando para permitir que la CLI maneje la migración:

   ```
   npx cap migrate
   ```

   Si no se pueden realizar algunos pasos de migración, se proporcionará información adicional en la salida del terminal. Los pasos de migración manual se enumeran a continuación

3 Si tiene instalada la extensión VS Code, consulte la sección de recomendaciones de la extensión para encontrar la opción de migrar su proyecto a Capacitor 5.

### Actualización del proyecto iOS de Capacitor 4 a Capacitor 5

1 **Actualizar Xcode**: el condensador 5 requiere Xcode 141+

2 **Actualice gitignore**: realice los siguientes cambios en su archivo `gitignore`:

   ```
   - App/Podfile.lock
   + App/output
   ```

3 **Actualice Assets para usar un solo ícono de aplicación**: Xcode 14 admite un solo ícono de aplicación de 1024x1024 Limpie su AppIconappiconset eliminando todos los tamaños innecesarios

### Actualización del proyecto Android Capacitor 4 a Capacitor 5

1 **Actualizar Android Studio**: Capacitor 5 requiere Android Studio Flamingo | 202221 o posterior debido al uso de Gradle 8, que requiere Java JDK 17 Java 17 viene con Android Studio Flamingo, por lo que no se necesitan descargas adicionales

2 **Ejecute el Asistente de actualización de AGP**: Android Studio puede ayudar con algunas actualizaciones relacionadas con Gradle y mover paquetes a archivos de compilación. Para comenzar, ejecute `Herramientas -> Asistente de actualización de AGP`

3 **Actualice las variables del proyecto de Android**: en su archivo `variablesgradle`, actualice sus valores a los siguientes nuevos mínimos:

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

4 **Actualizar servicios de Google**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5 **Actualice el complemento Gradle a 800**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6 **Actualice el contenedor Gradle a 802**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7 **Desactivar Jetifier**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8 **Mover paquete a `buildgradle`**:

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

9 **Actualizar androidScheme**: En Capacitor 6, `https` será la configuración predeterminada para `androidScheme` para aplicaciones existentes para permitir que las aplicaciones de Capacitor utilicen la función Autocompletar del sistema. Para evitar la pérdida de datos como resultado de este cambio, configure el esquema a `http` ahora, incluso si es el predeterminado actual

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10 **Actualice la versión de Kotlin**: si su proyecto usa Kotlin, actualice la variable `kotlin_version` a ``1820''

### Cambios en la funcionalidad del complemento

La siguiente funcionalidad del complemento ha sido modificada o eliminada. Actualice su código en consecuencia:

- Hoja de acción
- Navegador
- cámara
- Dispositivo
- Geolocalización
-Google mapas
- Notificaciones locales
- Notificaciones push
- Barra de estado

### Hoja de acción

- Actualice la variable `androidxMaterialVersion` a `180`

### Navegador

- Actualice la variable `androidxBrowserVersion` a `150`

### Cámara

- Para Android 13, agregue el permiso de lectura de imágenes multimedia (`<uses-permission android:name="androidpermissionREAD_MEDIA_IMAGES"/>`) en `AndroidManifestxml`
- Actualice la variable `androidxMaterialVersion` a `180`
- Actualice la variable `androidxExifInterfaceVersion` a `136`

### Dispositivo

- Cambie `DeviceIduuid` a `DeviceIdidentifier`
- En iOS 16+, `DeviceInfoname` devolverá un nombre de dispositivo genérico a menos que agregue los [derechos] apropiados (https://developerapplecom/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/)

### Geolocalización

- Actualice `playServicesLocationVersion` a `2101`

### Google Maps

- Actualizar las siguientes variables:
  - `googleMapsPlayServicesVersion` a `1810`
  - `googleMapsUtilsVersion` a `340`
  - `googleMapsKtxVersion` a `340`
  - `googleMapsUtilsKtxVersion` a `340`
  - `kotlinxCoroutinesVersion` a `164`
  - `androidxCoreKTXVersion` a `1100`- `kotlin_version` a `1820`

### Notificaciones locales

- Para Android 13, se requiere una nueva verificación de permisos de tiempo de ejecución para programar notificaciones locales cuando se apunta al SDK 33. Llame a `checkPermissions()` y `requestPermissions()` en consecuencia

### Notificaciones automáticas

- Para Android 13, se requiere una nueva verificación de permisos de tiempo de ejecución para recibir notificaciones automáticas cuando se apunta al SDK 33. Llame a `checkPermissions()` y `requestPermissions()` en consecuencia
- Actualice la variable `firebaseMessagingVersion` a `2312`

### Barra de estado

- En iOS, la animación de la barra de estado predeterminada se ha cambiado a "FADE"

Si sigue estos pasos y actualiza su código en consecuencia, ahora debería haber actualizado exitosamente su proyecto del Capacitor 4 al Capacitor 5. Asegúrese de probar su aplicación minuciosamente para asegurarse de que todas las funciones y complementos funcionen como se esperaba.