---
locale: es
---

cantar @capgo/native-audio Paquete

Este tutorial te guiará sobre cómo usar el paquete `@capgo/native-audio` para reproducir sonidos en tu aplicación de Capacitor.

## Paso 1: Instalación

Para instalar el paquete, abre tu terminal y ejecuta el siguiente comando:

[[BLOQUE_DE_CÓDIGO]]

o si prefieres usar yarn:

[[BLOQUE_DE_CÓDIGO]]

## Paso 2: Sincronizar Archivos Nativos

Después de instalar el paquete, sincroniza los archivos nativos con el siguiente comando:

[[BLOQUE_DE_CÓDIGO]]

## Paso 3: Configuración

No se requiere configuración adicional para este complemento.

## Paso 4: Uso

Para usar el paquete `@capgo/native-audio`, necesitas importar el objeto `NativeAudio` del paquete y usar sus métodos.

Aquí tienes un ejemplo de cómo precargar un archivo de audio y reproducirlo:

[[BLOQUE_DE_CÓDIGO]]

El método `preload` se utiliza para cargar un archivo de audio en memoria, y el método `play` se utiliza para reproducir el archivo de audio cargado.

Otros métodos soportados incluyen `pause`, `resume`, `loop`, `stop`, `unload`, `setVolume`, `getDuration`, y `getCurrentTime`. Puedes referirte a la [documentación oficial](https://githubcom/Cap-go/native-audio/blob/main/READMEmd/) para más detalles sobre estos métodos.

¡Eso es todo! Ahora has aprendido a usar el paquete `@capgo/native-audio` para reproducir sonidos en tu aplicación de Capacitor.