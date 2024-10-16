---
slug: updating-from-capacitor-4-to-capacitor-5
title: 'Actualización de Capacitor 4 a Capacitor 5: Una guía paso a paso'
description: >-
  Aprenda cómo actualizar su proyecto de Capacitor 4 a Capacitor 5 con cambios
  disruptivos mínimos, incluyendo la actualización de plugins oficiales y
  herramientas necesarias.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Ilustración de actualización de Capacitor 4 a 5
tag: Capacitor
published: true
locale: es
next_blog: ''
---

En comparación con actualizaciones anteriores, la transición de Capacitor 4 a Capacitor 5 implica cambios mínimos. Esta guía proporciona instrucciones paso a paso para actualizar tu proyecto a Capacitor 5, así como una lista de cambios importantes para los plugins oficiales.

**Nota**: Capacitor 5 requiere NodeJS 16 o superior, ya que Node 12 ha llegado al final de su vida útil y Node 14 llegará al final de su vida útil el 30 de abril de 2023. Se recomienda usar la última versión LTS de NodeJS.

1. Instala la versión `latest` del CLI de Capacitor en tu proyecto:

2. Ejecuta el siguiente comando para permitir que el CLI maneje la migración:

   Si algún paso de migración no se puede lograr, se proporcionará información adicional en la salida de la terminal. Los pasos de migración manual se enumeran a continuación.

3. Si tienes instalada la extensión de VS Code, verifica la sección de recomendaciones de la extensión para encontrar la opción de migrar tu proyecto a Capacitor 5.

### Actualizando el Proyecto iOS de Capacitor 4 a Capacitor 5

1. **Actualizar Xcode**: Capacitor 5 requiere Xcode 14.1+.

2. **Actualizar gitignore**: Realiza los siguientes cambios en tu archivo `gitignore`:

3. **Actualizar Assets para usar un solo icono de aplicación**: Xcode 14 admite un solo icono de aplicación de 1024x1024. Limpia tu AppIcon.appiconset eliminando todos los tamaños innecesarios.

### Actualizando el Proyecto Android de Capacitor 4 a Capacitor 5

1. **Actualizar Android Studio**: Capacitor 5 requiere Android Studio Flamingo | 2022.2.1 o más reciente debido al uso de Gradle 8, que requiere Java JDK 17. Java 17 viene con Android Studio Flamingo, por lo que no se necesitan descargas adicionales.

2. **Ejecutar el Asistente de Actualización AGP**: Android Studio puede ayudar con algunas actualizaciones relacionadas con Gradle y mover paquetes a archivos de compilación. Para comenzar, ejecuta `Tools -> AGP Upgrade Assistant`.

3. **Actualizar Variables del Proyecto Android**: En tu archivo `variables.gradle`, actualiza tus valores a los siguientes nuevos mínimos:

4. **Actualizar Google Services**:

5. **Actualizar el plugin de Gradle a 8.0.0**:

6. **Actualizar el wrapper de Gradle a 8.0.2**:

7. **Desactivar Jetifier**:

8. **Mover el paquete a `build.gradle`**:

9. **Actualizar androidScheme**: En Capacitor 6, `https` será la configuración predeterminada para `androidScheme` en las aplicaciones existentes para permitir mejor que las aplicaciones Capacitor utilicen la función de Autollenado del sistema. Para evitar la pérdida de datos como resultado de este cambio, establece el esquema en `http` ahora, incluso si es el valor predeterminado actual.

10. **Actualizar la versión de Kotlin**: Si tu proyecto usa Kotlin, actualiza la variable `kotlin_version` a `'1.8.20'`.

### Cambios en la Funcionalidad de Plugins

La siguiente funcionalidad de plugin ha sido modificada o eliminada. Actualiza tu código en consecuencia:

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

- Para Android 13, agrega el permiso de lectura de imágenes multimedia en `AndroidManifest.xml`.
- Actualiza la variable `androidxMaterialVersion` a `1.8.0`.
- Actualiza la variable `androidxExifInterfaceVersion` a `1.3.6`.

### Device

- Cambia `DeviceId.uuid` a `DeviceId.identifier`.
- En iOS 16+, `DeviceInfo.name` devolverá un nombre de dispositivo genérico a menos que agregues los [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/) apropiados.

### Geolocation

- Actualiza `playServicesLocationVersion` a `21.0.1`.

### Google Maps

- Actualiza las siguientes variables:
  - `googleMapsPlayServicesVersion` a `18.1.0`
  - `googleMapsUtilsVersion` a `3.4.0`
  - `googleMapsKtxVersion` a `3.4.0`
  - `googleMapsUtilsKtxVersion` a `3.4.0`
  - `kotlinxCoroutinesVersion` a `1.6.4`
  - `androidxCoreKTXVersion` a `1.10.0`
  - `kotlin_version` a `1.8.20`### Notificaciones locales

- Para Android 13, se requiere una nueva verificación de permiso en tiempo de ejecución para programar notificaciones locales al apuntar al SDK 33. Llame a `checkPermissions()` y `requestPermissions()` según corresponda.

### Notificaciones push

- Para Android 13, se requiere una nueva verificación de permiso en tiempo de ejecución para recibir notificaciones push al apuntar al SDK 33. Llame a `checkPermissions()` y `requestPermissions()` según corresponda.
- Actualice la variable `firebaseMessagingVersion` a `2312`.

### Barra de estado

- En iOS, la animación predeterminada de la barra de estado se ha cambiado a `FADE`.

Al seguir estos pasos y actualizar su código en consecuencia, ahora debería haber actualizado con éxito su proyecto de Capacitor 4 a Capacitor 5. Asegúrese de probar su aplicación a fondo para garantizar que todas las características y complementos funcionen como se espera.