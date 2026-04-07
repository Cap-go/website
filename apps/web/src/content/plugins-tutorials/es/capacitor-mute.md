---
locale: es
---

cantar paquete `@capgo/capacitor-mute`

El paquete `@capgo/capacitor-mute` es un plugin de Capacitor que te permite detectar si el interruptor de silencio está activado o desactivado en un dispositivo. Proporciona una API simple para verificar el estado de silencio del dispositivo.

## Instalación

Puedes instalar el paquete `@capgo/capacitor-mute` usando npm:

[[BLOQUE_DE_CÓDIGO]]

## Uso

Para usar el paquete `@capgo/capacitor-mute`, necesitas importarlo y llamar al método `isMuted()`.

[[BLOQUE_DE_CÓDIGO]]

El método `isMuted()` devuelve una promesa que se resuelve a un valor booleano que indica si el dispositivo está en silencio o no. Si la promesa se rechaza, se mostrará un mensaje de error.

## Ejemplo

Aquí tienes un ejemplo de cómo puedes usar el paquete `@capgo/capacitor-mute` para verificar el estado de silencio del dispositivo y mostrar un mensaje basado en el resultado.

[[BLOQUE_DE_CÓDIGO]]

En este ejemplo, si el dispositivo está en silencio, se mostrará un mensaje "El dispositivo está actualmente en silencio". Si el dispositivo no está en silencio, se mostrará un mensaje "El dispositivo no está en silencio".

## Posibles Problemas

Por favor, ten en cuenta que en dispositivos iOS con Xcode 14, la biblioteca `@capgo/capacitor-mute` puede no estar configurada como lo espera Apple. Este problema está siendo atendido actualmente por los desarrolladores de la biblioteca. Para resolver este problema, puedes seguir las instrucciones proporcionadas en la sección de [problema conocido](https://githubcom/CocoaPods/CocoaPods/issues/8891/) de la documentación del paquete.

## Conclusión

El paquete `@capgo/capacitor-mute` es un útil plugin de Capacitor que te permite detectar el estado de silencio de un dispositivo. Siguiendo los pasos de instalación y uso descritos en este tutorial, puedes integrar fácilmente este paquete en tu proyecto de Capacitor y utilizar su API para verificar el estado de silencio.