---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Actualice sus aplicaciones Capacitor sin problemas con Capacitor-updater
description: >-
  Saludos a la comunidad Capacitor Ionic, hoy te ayudaré a configurar
  Capacitor-updater en tu aplicación. Para que puedas realizar lanzamientos sin
  problemas.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /update_flow.webp
head_image_alt: Desarrollo de Capacitor busca alternativas
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: ''
---
## ¿Qué es Capacitor-updater?

Capacitor-updater, una tecnología que ayuda en la entrega de actualizaciones y mejoras de aplicaciones a los usuarios finales instantáneamente.

Esto es especialmente útil si deseas realizar correcciones críticas de errores y entregarlas instantáneamente sin pasar por las revisiones de la App Store.

Puedes pensar en ello como una agilidad "tipo web" de cargar actualizaciones lateralmente tan pronto como estén disponibles.

Además, proporciona reversiones si la nueva actualización hace que la aplicación falle.

## ¿Cómo funciona?

Capgo mantiene el paquete JavaScript de tu aplicación sincronizado con el servidor Capgo, y cada vez que el usuario abre la aplicación, verifica con el servidor Capgo si hay una nueva actualización disponible para el paquete. Y por supuesto, viene con toneladas de configuraciones increíbles que pueden ayudarte a ajustar la experiencia de tus usuarios.

Uso Capgo en todos los proyectos que construyo. Eso me permite dedicar menos tiempo al proceso de revisión de la App Store.

Puedes leer más sobre esto [aquí](https://capgo.app/).

## ¿Hay alguna limitación?

Por muy bueno que parezca, hay algunas cosas que debemos tener en cuenta.
Lo primero es que las actualizaciones OTA __solo funcionan con paquetes web__.
Podrías pensar que esto no es realmente una gran limitación porque, en Capacitor JS, escribimos casi todo el código en JS, CSS y HTML.
Si bien esto puede ser cierto, todavía hay módulos nativos que instalamos en nuestra aplicación.
Si un módulo cambia tus directorios de Android o iOS, no puedes usar OTA para actualizar tu aplicación.
Esto se debe a que el contenido de estos directorios se utiliza para compilar binarios nativos, que OTA no puede actualizar.
Incluso las aplicaciones nativas no pueden actualizar esta parte.

Pero puedes configurar tu CI/CD para manejar esta parte, hice un tutorial sobre cómo hacerlo [aquí para iOS](https://capgo.app/blog/automatic-capacitor-android-build-github-action/).

## Configuración Automática de Capgo

¡Es hora de registrarse y obtener tu clave API para subir tu primera versión! Comienza [registrándote para una cuenta Capgo](/register/).

Una vez que hayas iniciado sesión en Capgo, tendrás una página de incorporación

![Página de incorporación](/onboarding_1_new.webp)

Sigue los pasos en la página de incorporación para agregar tu primera aplicación.

### Sigue la guía de CLI

Desde la línea de comandos, directamente en la raíz de tu aplicación Capacitor, ejecuta:

`npx @capgo/cli@latest init`
Para instalar Capgo en tu aplicación Capacitor, el CLI te guiará a través del proceso de configuración de tu aplicación con Capgo.

Si quieres hacerlo manualmente, puedes seguir los pasos a continuación.

## Configuración Manual de Capgo

### Instalar el plugin

Deberías terminar con este código agregado a tu aplicación:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el plugin en tu aplicación Capacitor.

Y luego agrega a tu aplicación este código para notificar al plugin nativo que el paquete JS está saludable (si no haces esto, el plugin nativo volverá a la versión anterior):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le dirá al plugin nativo que la instalación se realizó con éxito.

Luego ejecuta `npm run build && npx cap copy` para actualizar tu aplicación.

### Iniciar sesión en Capgo CLOUD

Primero, usa la [apikey](https://console.capgo.app/dashboard/apikeys/) `all` presente en tu cuenta para iniciar sesión con el CLI:

`npx @capgo/cli@latest login YOU_KEY`

### Agrega tu primera aplicación

Comencemos creando una aplicación en Capgo Cloud con el CLI.

`npx @capgo/cli@latest app add`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

### Sube tu primera versión

Ejecuta el comando para construir tu código y enviarlo a Capgo con:
`npx @capgo/cli@latest bundle upload`

Por defecto, el nombre de la versión será el que está en tu archivo `package.json`.

Verifica en [Capgo](https://console.capgo.app/) si la compilación está presente.

Incluso puedes probarlo con mi [aplicación móvil sandbox](https://capgo.app/app_mobile/).

### Hacer el canal predeterminado

Después de haber enviado tu aplicación a Capgo, necesitas hacer que tu canal sea `default` para permitir que las aplicaciones reciban actualizaciones de Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Recibir una Actualización en Vivo en un Dispositivo

Para que tu aplicación reciba una actualización en vivo desde Deploy, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o un dispositivo conectado a tu computadora.

    npx cap run [ios | android]

Abre la aplicación, ponla en segundo plano y ábrela de nuevo, deberías ver en los registros que la aplicación realizó la actualización.

¡Felicitaciones! 🎉 Has implementado exitosamente tu primera Actualización en Vivo. Este es solo el comienzo de lo que puedes hacer con las Actualizaciones en Vivo. Para aprender más, consulta la [documentación completa de Actualizaciones en Vivo](/docs/plugin/cloud-mode/getting-started/).

> Si necesitas dejar de recibir actualizaciones en local, ejecuta este comando
`npx @capgo/cli@latest channel set`
