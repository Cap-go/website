---
locale: it
---

cantar @capgo/native-audio Paquete

Este tutorial te guiará sobre cómo usar el paquete `@capgo/native-audio` para reproducir sonidos en tu aplicación Capacitor.

## Paso 1: Instalación

Para instalar el paquete, abre tu terminal y ejecuta el siguiente comando:

[[BLOQUE_CODIGO]]

o si prefieres usar yarn:

[[BLOQUE_CODIGO]]

## Paso 2: Sincronizar Archivos Nativos

Después de instalar el paquete, sincroniza los archivos nativos con el siguiente comando:

[[BLOQUE_CODIGO]]

## Paso 3: Configuración

No se requiere configuración adicional para este complemento.

## Paso 4: Uso

Para usar el paquete `@capgo/native-audio`, necesitas importar el objeto `NativeAudio` del paquete y usar sus métodos.

Aquí tienes un ejemplo de cómo precargar un archivo de audio y reproducirlo:

[[BLOQUE_CODIGO]]

El método `preload` se utiliza para cargar un archivo de audio en memoria, y el método `play` se usa para reproducir el archivo de audio cargado.

Otros métodos soportados incluyen `pause`, `resume`, `loop`, `stop`, `unload`, `setVolume`, `getDuration` y `getCurrentTime`. Puedes consultar la [documentación oficial](https://githubcom/Cap-go/native-audio/blob/main/READMEmd/) para más detalles sobre estos métodos.

¡Eso es todo! Ahora has aprendido cómo usar el paquete `@capgo/native-audio` para reproducir sonidos en tu aplicación Capacitor.