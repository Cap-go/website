---
slug: es__update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Actualice sus aplicaciones Capacitor sin problemas con Capacitor-updater
description: >-
  Saludos a la comunidad de Capacitor Ionic, hoy les ayudaré a configurar
  Capacitor-updater en su aplicación. De esta manera podrán realizar
  lanzamientos sin problemas.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Desarrollador de Capacitor busca alternativa
tag: Tutorial
published: true
locale: es
next_blog: ''
---

## ¿Qué es Capacitor-updater?

Capacitor-updater, una tecnología que ayuda en la entrega de actualizaciones y mejoras de aplicaciones a los usuarios finales de forma instantánea

Esto es especialmente útil si desea realizar correcciones de errores críticos y entregarlas instantáneamente sin pasar por las revisiones de la App Store

Puede pensar en ello como la agilidad "tipo web" de cargar actualizaciones lateralmente tan pronto como estén disponibles

Además, proporciona reversiones si la nueva actualización bloquea la aplicación

## ¿Cómo funciona?

Capgo mantiene el paquete JavaScript de su aplicación sincronizado con el servidor de Capgo, y cada vez que el usuario abre la aplicación, verifica con el servidor de Capgo si hay una nueva actualización disponible para el paquete. Y, por supuesto, viene con toneladas de configuraciones increíbles que pueden ayudarlo a ajustar la experiencia de sus usuarios

Uso Capgo en todos los proyectos que construyo. Eso me permite dedicar menos tiempo al proceso de revisión de la App Store

Puede leer más al respecto [aquí](https://capgoapp/)

## ¿Hay alguna limitación?

Por muy bueno que pueda sonar, hay algunas cosas que debemos tener en cuenta
Lo primero es que las actualizaciones OTA __solo funcionan con paquetes web__
Puede pensar que esto no es realmente una gran limitación porque, en Capacitor JS, escribimos casi todo el código en JS, CSS y HTML
Si bien esto puede ser cierto, todavía hay módulos nativos que instalamos en nuestra aplicación
Si un módulo cambia sus directorios de Android o iOS, no puede usar OTA para actualizar su aplicación
Esto se debe a que el contenido de estos directorios se utiliza para compilar binarios nativos, que OTA no puede actualizar
Incluso la aplicación nativa no puede actualizar esta parte

Pero puede configurar su CI/CD para manejar esta parte, hice un tutorial sobre cómo hacerlo [aquí para iOS](https://capgoapp/blog/automatic-capacitor-ios-build-github-action/), y [aquí para Android](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)

## Configuración automática de Capgo

¡Es hora de registrarse y obtener su clave API para cargar su primera versión! Comience [registrándose para una cuenta de Capgo](/register/)

Una vez que haya iniciado sesión en Capgo, tendrá una página de incorporación

![Página de incorporación](/onboarding_1_newwebp)

Siga los pasos en la página de incorporación para agregar su primera aplicación

### Siga la guía de la CLI

Desde la línea de comandos, directamente en la raíz de su aplicación Capacitor, ejecute:

`npx @capgo/cli@latest init`
Para instalar Capgo en su aplicación Capacitor, la CLI lo guiará a través del proceso de configuración de su aplicación con Capgo

Si desea hacerlo manualmente, puede seguir los pasos a continuación

## Configuración manual de Capgo

### Instale el plugin

Debería terminar con este código agregado a su aplicación:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el plugin en su aplicación Capacitor

Y luego agregue a su aplicación este código para notificar al plugin nativo que el paquete JS está en buen estado (si no hace esto, el plugin nativo volverá a la versión anterior):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le dirá al plugin nativo que la instalación ha tenido éxito

Luego haga un `npm run build && npx cap copy` para actualizar su aplicación

### Inicie sesión en Capgo CLOUD

Primero, use la [clave API](https://webcapgoapp/dashboard/apikeys/) `all` presente en su cuenta para iniciar sesión con la CLI:

`npx @capgo/cli@latest login SU_CLAVE`

### Agregue su primera aplicación

Comencemos creando una aplicación en Capgo Cloud con la CLI

`npx @capgo/cli@latest app add`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación

### Cargue su primera versión

Ejecute el comando para compilar su código y enviarlo a Capgo con:
`npx @capgo/cli@latest bundle upload`

Por defecto, el nombre de la versión será el que está en su archivo `packagejson`

Verifique en [Capgo](https://webcapgoapp/) si la compilación está presente

Incluso puede probarlo con mi [aplicación móvil de sandbox](https://capgoapp/app_mobile/)

### Haga que el canal sea predeterminado

Después de haber enviado su aplicación a Capgo, debe hacer que su canal sea `default` para permitir que las aplicaciones reciban actualizaciones de Capgo`npx @capgo/cli@latest channel set production -s default`

## Recibir una actualización en vivo en un dispositivo

Para que su aplicación reciba una actualización en vivo de Deploy, necesitará ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar su aplicación local en un emulador o un dispositivo conectado a su computadora:

    npx cap run [ios | android]

Abra la aplicación, póngala en segundo plano y ábrala de nuevo, debería ver en los registros que la aplicación realizó la actualización.

¡Felicidades! 🎉 Ha implementado con éxito su primera actualización en vivo. Esto es solo el comienzo de lo que puede hacer con las actualizaciones en vivo. Para aprender más, vea la documentación completa de [Actualizaciones en vivo](/docs/plugin/cloud-mode/getting-started/)

> Si necesita dejar de recibir la actualización en local, ejecute este comando:
`npx @capgo/cli@latest channel set`