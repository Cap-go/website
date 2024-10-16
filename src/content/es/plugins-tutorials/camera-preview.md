---
locale: es
---

Tutorial del paquete capgo/camera-preview

En este tutorial, recorreremos los pasos para usar el paquete `@capgo/camera-preview` en tu proyecto de Capacitor. Este paquete te permite interactuar con la cámara desde tu código JavaScript y HTML.

## Instalación

Para instalar el paquete `@capgo/camera-preview`, abre tu terminal y ejecuta uno de los siguientes comandos:

[[BLOQUE_DE_CODIGO]]

o

[[BLOQUE_DE_CODIGO]]

Después de que la instalación esté completa, ejecuta el siguiente comando para sincronizar tu proyecto de Capacitor:

[[BLOQUE_DE_CODIGO]]

### Pasos adicionales de instalación en Android

Si estás usando Android, necesitas hacer algunos cambios adicionales en tu proyecto. Abre el archivo `android/app/src/main/AndroidManifest.xml` y agrega la siguiente línea encima de la etiqueta de cierre `</application>` para solicitar el permiso de la CÁMARA:

[[BLOQUE_DE_CODIGO]]

Para más ayuda, consulta la [documentación de Capacitor](https://capacitorjscom/docs/android/configuration/#configuring-androidmanifestxml/)

### Pasos adicionales de instalación en iOS

Si estás usando iOS, necesitas agregar dos permisos a tu archivo `Info.plist`. Sigue la [documentación de Capacitor](https://capacitorjscom/docs/ios/configuration/#configuring-infoplist) y agrega los permisos `NSCameraUsageDescription` y `NSMicrophoneUsageDescription`. El permiso `NSMicrophoneUsageDescription` solo es necesario si vas a usar audio. Si no necesitas audio, puedes establecer la opción `disableAudio` en `true` para desactivar la solicitud de permiso del micrófono.

### Pasos adicionales de instalación en la Web

Si estás usando la plataforma web con Ionic, agrega la siguiente línea a tu script de entrada en `app.module.ts`:

[[BLOQUE_DE_CODIGO]]

Esto permitirá que Capacitor registre la plataforma web desde el plugin.

## API

El paquete `@capgo/camera-preview` proporciona los siguientes métodos de API:

### start(options: CameraPreviewOptions)

Inicia la instancia de vista previa de la cámara.

### stop()

Detiene la instancia de vista previa de la cámara.

### capture(options: CameraPreviewPictureOptions)

Captura una imagen de la cámara.

### captureSample(options: CameraSampleOptions)

Captura una imagen de muestra.

### getSupportedFlashModes()

Obtiene los modos de flash soportados.

### getHorizontalFov()

Obtiene el campo de visión horizontal.

### setFlashMode(options: { flashMode: CameraPreviewFlashMode | string; })

Establece el modo de flash.

### flip()

Invierte la cámara.

### setOpacity(options: CameraOpacityOptions)

Establece la opacidad de la cámara.

### stopRecordVideo()

Detiene la grabación de un video.

### startRecordVideo(options: CameraPreviewOptions)

Comienza la grabación de un video.

Para más detalles sobre los parámetros y valores de retorno de estos métodos, consulta la documentación del paquete `@capgo/camera-preview`.

## Conclusión

En este tutorial, aprendimos cómo instalar y usar el paquete `@capgo/camera-preview` en un proyecto de Capacitor. Exploramos los métodos de API disponibles y su uso. Ahora puedes integrar la funcionalidad de la cámara en tu aplicación usando este paquete.