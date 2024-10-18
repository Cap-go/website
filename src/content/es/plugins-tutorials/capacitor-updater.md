---
locale: es
---

Tutorial del paquete capgo/capacitor-updater

Este tutorial te guiará a través del proceso de usar el paquete `@capgo/capacitor-updater` para habilitar actualizaciones automáticas en tu aplicación Ionic Capacitor.

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- Nodejs
- npm

## Instalación

Para instalar el paquete `@capgo/capacitor-updater`, abre tu terminal o símbolo del sistema y ejecuta el siguiente comando:

[[BLOQUE_DE_CODIGO]]

Esto descargará e instalará el paquete en tu proyecto.

### Instala el plugin

Debes terminar con este código agregado a tu aplicación:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el plugin en tu aplicación Capacitor.

Y luego agrega a tu aplicación este código para notificar al plugin nativo que el paquete JS es saludable, el plugin nativo revertirá a la versión anterior si no lo haces:

[[BLOQUE_DE_CODIGO]]

Esto le dirá al plugin nativo que la instalación fue exitosa.

Luego haz un `npm run build && npx cap copy` para actualizar tu aplicación.

### Iniciar sesión en Capgo CLOUD

Primero, utiliza la `all` [apikey](https://webcapgoapp/dashboard/apikeys/) presente en tu cuenta para iniciar sesión con la CLI:

`npx @capgo/cli@latest login TU_CLAVE`

### Agrega tu primera aplicación

Comencemos creando una aplicación en Capgo Cloud con la CLI:

`npx @capgo/cli@latest app add`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

### Sube tu primera versión

Ejecuta el comando para compilar tu código y enviarlo a Capgo con:
`npx @capgo/cli@latest bundle upload`

Por defecto, el nombre de la versión será el que esté en tu archivo `packagejson`.

Verifica en [Capgo](https://webcapgoapp/) si la compilación está presente.

Incluso puedes probarlo con mi [aplicación de sandbox móvil](https://capgoapp/app_mobile/).

### Hacer canal predeterminado

Después de haber enviado tu aplicación a Capgo, necesitas hacer que tu canal sea `default` para que las aplicaciones reciban actualizaciones de Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Recibir una actualización en vivo en un dispositivo

Para que tu aplicación reciba una actualización en vivo de Deploy, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o un dispositivo conectado a tu computadora.

    npx cap run [ios | android]

Abre la aplicación, ponla en segundo plano y ábrela de nuevo; deberías ver en los registros que la aplicación realizó la actualización.

¡Felicidades! 🎉 Has desplegado con éxito tu primera Actualización en Vivo. Esto es solo el comienzo de lo que puedes hacer con Actualizaciones en Vivo. Para aprender más, consulta la completa [documentación de Actualizaciones en Vivo](/docs/plugin/cloud-mode/getting-started/).

> Si necesitas dejar de recibir la actualización localmente, ejecuta este comando:
`npx @capgo/cli@latest channel set`

## Conclusión

¡Felicidades! Has aprendido con éxito cómo usar el paquete `@capgo/capacitor-updater` para habilitar actualizaciones automáticas en tu aplicación Ionic Capacitor. Ya sea que elijas la actualización automática o la configuración manual, ahora tienes las herramientas para mantener tu aplicación actualizada con facilidad.