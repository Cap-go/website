---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Actualice sus aplicaciones de Capacitor sin problemas usando Capacitor-updater
description: >-
  Saludos Comunidad Capacitor Ionic, hoy los ayudaré a configurar
  Capacitor-updater en su aplicación. Para que puedas realizar lanzamientos sin
  problemas.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Capacitor Dev looking for alternative
tag: Tutorial
published: true
next_blog: ''
locale: es
---

## ¿Qué es el actualizador de condensadores?

Capacitor-Updater, una tecnología que ayuda a entregar actualizaciones y mejoras de aplicaciones a los usuarios finales al instante.

Esto es especialmente bueno si desea corregir errores críticos y entregarlos al instante sin pasar por las revisiones de la App Store.

Puede considerarlo como una agilidad "similar a la de una web" de carga lateral de actualizaciones tan pronto como estén disponibles.

Además, proporciona reversiones si la nueva actualización bloquea la aplicación.

## ¿Cómo funciona?

Capgo mantiene el paquete JavaScript de su aplicación sincronizado con el servidor Capgo y cada vez que el usuario abre la aplicación, verifica con el servidor Capgo si hay una nueva actualización disponible para el paquete. Y, por supuesto, viene con toneladas de configuraciones increíbles que pueden ayudarle a ajustar la experiencia de su usuario

Utilizo Capgo en todos los proyectos que construyo. Eso me permite dedicar menos tiempo al proceso de revisión de la App Store.

Puedes leer más al respecto [aquí](https://capgoapp/)

## ¿Existe alguna limitación?

Por muy bueno que parezca, hay algunas cosas que debemos tener en cuenta.
Lo primero es que las actualizaciones OTA __solo funcionan con paquetes web__ 
Quizás pienses que esto no es realmente una gran limitación porque, en Capacitor JS, escribimos casi todo el código en JS CSS y HTML.
Si bien esto puede ser cierto, todavía hay módulos nativos que instalamos en nuestra aplicación.
Si un módulo cambia sus directorios de Android o iOS, no podrá usar OTA para actualizar su aplicación
Esto se debe a que el contenido de estos directorios se utiliza para compilar archivos binarios nativos, que OTA no puede actualizar.
Incluso la aplicación nativa no puede actualizar esta parte

Pero puedes configurar tu CI/CD para manejar esta parte. Hice un tutorial sobre cómo hacerlo [aquí para IOS](https://capgoapp/blog/automatic-capacitor-ios-build-github-action/) y [aquí para Android](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)

## Configuración automática de Capgo

¡Es hora de registrarse y obtener su clave API para cargar su primera versión! Comience [registrándose para obtener una cuenta de Capgo](/registrarse/)

Una vez que haya iniciado sesión en Capgo, tendrá una página de incorporación 

![Página de incorporación](/onboarding_1_newwebp)

Siga los pasos en la página de incorporación para agregar su primera aplicación

### Siga las instrucciones de la CLI

Desde una línea de comando, directamente a la raíz de su aplicación Capacitor, ejecute:

`npx @capgo/cli@último inicio`
Para instalar Capgo en su aplicación Capacitor, la CLI lo guiará a través del proceso de configuración de su aplicación con Capgo.

Si desea hacerlo manualmente, puede seguir los pasos a continuación

## Configuración manual de Capgo

### Instalar el complemento

Deberías terminar con este código agregado a tu aplicación:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el complemento en su aplicación Capacitor

Y luego agregue a su aplicación este código para notificar al complemento nativo que el paquete JS está en buen estado (si no hace esto, el complemento nativo volverá a la versión anterior):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le indicará al complemento nativo que la instalación se realizó correctamente.

Luego haga una `npm run build && npx cap copy` para actualizar su aplicación

### Inicie sesión en Capgo CLOUD

Primero, use `all` [apikey](https://webcapgoapp/dashboard/apikeys/) presente en su cuenta para iniciar sesión con la CLI:

`npx @capgo/cli@último inicio de sesión YOU_KEY`

### Agrega tu primera aplicación

Comencemos creando primero una aplicación en Capgo Cloud con la CLI

`npx @capgo/cli@agregar aplicación más reciente`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

### Sube tu primera versión

Ejecute el comando para construir su código y enviarlo a Capgo con:
`npx @capgo/cli@última carga del paquete`

De forma predeterminada, el nombre de la versión será el que está en su archivo `packagejson`

Verifique [Capgo](https://webcapgoapp/) si la compilación está presente

Incluso puedes probarlo con mi [aplicación móvil sandbox](https://capgoapp/app_mobile/)

### Hacer que el canal sea el predeterminado

Después de haber enviado su aplicación a Capgo, debe hacer que su canal sea "predeterminado" para permitir que las aplicaciones reciban actualizaciones de Capgo.`npx @capgo/cli@latest producción del conjunto de canales -s predeterminado`

## Recibir una actualización en vivo en un dispositivo

Para que su aplicación reciba una actualización en vivo de Deploy, deberá ejecutar la aplicación en un dispositivo o un emulador. La forma más sencilla de hacerlo es simplemente usar el siguiente comando para iniciar su aplicación local en un emulador o un dispositivo conectado. a tu computadora

    ejecución de límite de npx [ios | androide]

Abra la aplicación, póngala en segundo plano y ábrala nuevamente. Debería ver en los registros que la aplicación realizó la actualización.

¡Felicitaciones! 🎉 Ha implementado con éxito su primera Actualización en vivo. Esto es solo el comienzo de lo que puede hacer con las Actualizaciones en vivo. Para obtener más información, consulte los [documentos de Actualizaciones en vivo] completos (/docs/plugin/cloud-mode/getting-started/)


> Si necesita dejar de recibir la actualización en local, ejecute este comando
`npx @capgo/cli@último conjunto de canales`