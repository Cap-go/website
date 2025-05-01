---
slug: updating-from-capacitor-4-to-capacitor-5
title: 'Capacitor 4 から Capacitor 5 へのアップデート: ステップバイステップガイド'
description: >-
  Erfahren Sie, wie Sie Ihr Projekt von Capacitor 4 auf Capacitor 5 mit
  minimalen Breaking Changes aktualisieren können, einschließlich der
  Aktualisierung offizieller Plugins und erforderlicher Tools.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Ilustración de actualización de Capacitor 4 a 5
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: es
next_blog: ''
---

En comparación con las actualizaciones anteriores, la transición de Capacitor 4 a Capacitor 5 implica cambios mínimos. Esta guía proporciona instrucciones paso a paso para actualizar tu proyecto a Capacitor 5, así como una lista de cambios importantes para los plugins oficiales.

**Nota**: Capacitor 5 requiere NodeJS 16 o superior, ya que Node 12 ha llegado al final de su vida útil y Node 14 llegará al final de su vida útil el 30 de abril de 2023. Se recomienda usar la última versión LTS de NodeJS.

<Steps>
1. Instala la versión `latest` del CLI de Capacitor en tu proyecto:

   [[CODE_BLOCK]]

2. Ejecuta el siguiente comando para permitir que el CLI maneje la migración:

   [[CODE_BLOCK]]

   Si no se pueden lograr algunos pasos de migración, se proporcionará información adicional en la salida del terminal. Los pasos de migración manual se enumeran a continuación.

3. Si tienes instalada la extensión de VS Code, revisa la sección de recomendaciones de la extensión para encontrar la opción de migrar tu proyecto a Capacitor 5.
</Steps>

### Actualizando Proyecto iOS de Capacitor 4 a Capacitor 5

<Steps>
1. **Actualizar Xcode**: Capacitor 5 requiere Xcode 14.1+.

2. **Actualizar gitignore**: Realiza los siguientes cambios en tu archivo `gitignore`:

   [[CODE_BLOCK]]

3. **Actualizar Assets para usar un único ícono de aplicación**: Xcode 14 admite un único ícono de aplicación de 1024x1024. Limpia tu AppIcon.appiconset eliminando todos los tamaños innecesarios.
</Steps>

### Actualizando Proyecto Android de Capacitor 4 a Capacitor 5

<Steps>
1. **Actualizar Android Studio**: Capacitor 5 requiere Android Studio Flamingo | 2022.2.1 o más reciente debido al uso de Gradle 8, que requiere Java JDK 17. Java 17 viene con Android Studio Flamingo, por lo que no se necesitan descargas adicionales.

2. **Ejecutar AGP Upgrade Assistant**: Android Studio puede ayudar con algunas actualizaciones relacionadas con Gradle y mover paquetes a archivos de compilación. Para comenzar, ejecuta `Tools -> AGP Upgrade Assistant`.

3. **Actualizar Variables del Proyecto Android**: En tu archivo `variables.gradle`, actualiza tus valores a los siguientes nuevos mínimos:

   [[CODE_BLOCK]]

4. **Actualizar Google Services**:

   [[CODE_BLOCK]]

5. **Actualizar plugin de Gradle a 8.0.0**:

   [[CODE_BLOCK]]

6. **Actualizar Gradle wrapper a 8.0.2**:

   [[CODE_BLOCK]]

7. **Deshabilitar Jetifier**:

   [[CODE_BLOCK]]

8. **Mover paquete a `build.gradle`**:

   [[CODE_BLOCK]]

   [[CODE_BLOCK]]

9. **Actualizar androidScheme**: En Capacitor 6, `https` será la configuración predeterminada para `androidScheme` para aplicaciones existentes para permitir mejor que las aplicaciones Capacitor usen la función de Autollenado del sistema. Para evitar la pérdida de datos como resultado de este cambio, establece el esquema en `http` ahora, incluso si es el predeterminado actual.

   [[CODE_BLOCK]]

10. **Actualizar versión de Kotlin**: Si tu proyecto usa Kotlin, actualiza la variable `kotlin_version` a `'1.8.20'`.
</Steps>

### Cambios en la Funcionalidad de Plugins

La siguiente funcionalidad de plugins ha sido modificada o eliminada. Actualiza tu código en consecuencia:

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

- Actualiza la variable `androidxMaterialVersion` a `1.8.0`

### Browser

- Actualiza la variable `androidxBrowserVersion` a `1.5.0`

### Camera

- Para Android 13, agrega el permiso de lectura de imágenes multimedia (`[[HTML_TAG]]`) en `AndroidManifest.xml`
- Actualiza la variable `androidxMaterialVersion` a `1.8.0`
- Actualiza la variable `androidxExifInterfaceVersion` a `1.3.6`

### Device

- Cambia `DeviceId.uuid` a `DeviceId.identifier`
- En iOS 16+, `DeviceInfo.name` devolverá un nombre de dispositivo genérico a menos que agregues los [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.device-information.user-assigned-device-name/) apropiados

### Geolocation

- Actualiza el `playServicesLocationVersion` a `21.0.1`

### Google Maps

- Actualiza las siguientes variables:
  - `googleMapsPlayServicesVersion` a `18.1.0`
  - `googleMapsUtilsVersion` a `3.4.0`
  - `googleMapsKtxVersion` a `3.4.0`
  - `googleMapsUtilsKtxVersion` a `3.4.0`
  - `kotlinxCoroutinesVersion` a `1.6.4`
  - `androidxCoreKTXVersion` a `1.10.0`
  - `kotlin_version` a `1.8.20`