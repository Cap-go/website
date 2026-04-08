---
locale: es
---

Paquete `@capgo/capacitor-flash`

El paquete `@capgo/capacitor-flash` te permite encender y apagar la linterna de tu dispositivo. En este tutorial, te guiaremos a través del proceso de instalación y uso de este paquete en tu aplicación Ionic Capacitor.

## Instalación

Para instalar el paquete `@capgo/capacitor-flash`, ejecuta el siguiente comando en el directorio raíz de tu proyecto:

[[BLOQUE_DE_CÓDIGO]]

## Configuración de iOS

El paquete `@capgo/capacitor-flash` funciona directamente en iOS, así que no se requiere configuración adicional.

## Configuración de Android

Para Android, necesitas declarar los permisos necesarios en el archivo `AndroidManifest.xml` de tu aplicación. Agrega las siguientes líneas dentro de la etiqueta `[[ETIQUETA_HTML]]`:

[[BLOQUE_DE_CÓDIGO]]

## API

El paquete `@capgo/capacitor-flash` proporciona los siguientes métodos de API:

### isAvailable()

Este método verifica si la linterna está disponible en el dispositivo.

[[BLOQUE_DE_CÓDIGO]]

### switchOn(options)

Este método enciende la linterna del dispositivo. Puedes pasar opciones para ajustar la intensidad de la linterna.

[[BLOQUE_DE_CÓDIGO]]

### switchOff()

Este método apaga la linterna del dispositivo.

[[BLOQUE_DE_CÓDIGO]]

### isSwitchedOn()

Este método verifica si la linterna está actualmente encendida o apagada.

[[BLOQUE_DE_CÓDIGO]]

### toggle()

Este método alterna la linterna, es decir, si está encendida, la apagará y viceversa.

[[BLOQUE_DE_CÓDIGO]]

¡Eso es todo! Has aprendido con éxito a usar el paquete `@capgo/capacitor-flash` en tu aplicación Ionic Capacitor para controlar la linterna de tu dispositivo.