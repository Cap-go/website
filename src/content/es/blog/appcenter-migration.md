---
slug: appcenter-migration
title: Migrando desde App Center a Capgo
description: >-
  Con esta guía, abordamos la migración completa de Capgo Live Updates, una
  alternativa a Microsoft CodePush.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS Dev looking for alternative
tag: Migration
published: true
next_blog: automatic-build-and-release-with-github-actions
locale: es
---

## Resumen de migración

* [Capgo](/register/) es un servicio que ayuda a los equipos de desarrollo a enviar aplicaciones en vivo a las aplicaciones implementadas.
* Se pueden migrar aplicaciones Capacitor JS escritas en jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic o incluso su propia solución personalizada **No se requiere una aplicación Ionic existente**
* [Colt](https://voltbuild/) ofrece servicios equivalentes para App Center Build (creación de aplicaciones para Android/iOS) para servicios de prueba, diagnóstico y análisis

##### Nota

Si su aplicación todavía usa Cordova, es necesario [migrar a Capacitor](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/) antes de migrar a Capgo

Creado por el equipo de Ionic como sucesor espiritual de Cordova, Capacitor permite que el desarrollo se acerque a las herramientas y capacidades nativas con el objetivo de proporcionar una experiencia de usuario y un rendimiento aún mejores.

Afortunadamente, el proceso de migración es sencillo y la mayoría de los complementos de Cordova son compatibles con Capacitor [Comience a migrar aquí](https://capacitorjscom/docs/cordova/migrateing-from-cordova-to-capacitor/)

## Acerca de Capgo

Capgo se encarga de actualizar las aplicaciones a lo largo del tiempo. Los equipos de desarrollo pueden centrarse completamente en las características únicas de su aplicación y subcontratar el complicado proceso de entrega de la aplicación a Capgo.

Capgo llena los vacíos entre la entrega web y el móvil

## Requisitos previos de Capgo

Al igual que App Center, [Capgo](/register/) admite aplicaciones alojadas en repositorios Git en Azure DevOps, Bitbucket, GitHub y GitLab.

### Instalar Capgo CLI

##### nota

Antes de continuar, debe tener Node y NPM instalados en su computadora. Utilice siempre la [versión LTS actual](https://nodejsorg/) Capgo no utilice versiones anteriores

### Crear archivos de configuración `packagejson` y Capacitor

##### nota

Antes de comenzar, recomiendo realizar cambios en una nueva rama de Git.

Dado que [Capgo](/register/) se creó para automatizar aplicaciones de condensadores, requiere un archivo que su aplicación tal vez no tenga. Primero, cree un archivo `capacitorconfigjson`. La forma más sencilla de crearlo es ejecutarlo en la raíz de su aplicación:

```shell
npm install @capacitor/core
```

Luego, inicialice Capacitor usando el cuestionario CLI:

```shell
npx cap init
```

La CLI le hará algunas preguntas, comenzando con el nombre de su aplicación y el ID del paquete que le gustaría usar para su aplicación.

Finalmente, confirme los nuevos archivos en su proyecto:

    git add git commit -m "paquete agregado json y configuración de capacitor" && git push

### Migrar el código

Ahora que tiene los nuevos archivos [Capgo](/register/) requeridos en su lugar, puede centrar nuestra atención en la aplicación real. [Capgo](/register/) espera que toda la aplicación construida esté dentro de un directorio llamado `dist `

Si su código compilado no está en un directorio `dist`, cambie este valor en el archivo de configuración de Capacitor

Así es como debería verse la estructura de directorios de la aplicación:

![Estructura de la aplicación](/directory_looklikewebp)

## Configuración de Capgo

Con su aplicación lista para la integración de [Capgo](https://webcapgoapp/), es hora de registrarse y obtener su clave API para cargar su primera versión. Comience [registrándose para obtener una cuenta de Capgo](/registrarse/)

Una vez que haya iniciado sesión en Capgo, navegue hasta la página Cuenta, luego haga clic en la clave API, luego haga clic en la tecla "escribir" para copiarla en su portapapeles.

### Instalar el SDK de Capgo

Desde una línea de comando, directamente en la raíz de la carpeta de la aplicación Capacitor, ejecute el siguiente comando:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el complemento en su aplicación Capacitor

Y luego agregue a su aplicación este código como reemplazo de CodePush uno:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le indicará al complemento nativo que la instalación se realizó correctamente.

## Implementación de actualizaciones en vivo (alternativa a CodePush)

La función Live Update funciona utilizando el [Capgo SDK](https://githubcom/Cap-go/capacitor-updater/) instalado en su aplicación nativa para escuchar un destino de canal de implementación particular cuando se asigna una compilación web a un canal. Destino, esa actualización se implementará en los dispositivos de los usuarios que ejecutan archivos binarios configurados para escuchar el destino del canal especificado.### Inicie sesión en Capgo CLOUD

Primero, use `all` [apikey](https://webcapgoapp/dashboard/apikeys/) presente en su cuenta para iniciar sesión con la CLI:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Agrega tu primera aplicación

Comencemos creando primero la aplicación en Capgo Cloud con la CLI

`npx @capgo/cli@agregar aplicación más reciente`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

## Sube tu primer paquete

Ejecute el comando para construir su código y enviarlo a Capgo con:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

De forma predeterminada, el nombre de la versión será el que está en su archivo `packagejson`

Verifique [Capgo](https://webcapgoapp/) si la compilación está presente

Incluso puedes probarlo con mi [aplicación móvil sandbox](https://capgoapp/app_mobile/)

### Hacer que el canal sea el predeterminado

Después de haber enviado su aplicación a Capgo, debe hacer que su canal sea "predeterminado" para permitir que las aplicaciones reciban actualizaciones de Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurar la aplicación para validar las actualizaciones

Agregue esta configuración a su archivo JavaScript principal

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Luego haga una `npm run build && npx cap copy` para actualizar su aplicación

### Recibir una actualización en vivo en un dispositivo

Para que su aplicación reciba una actualización en vivo de Deploy, deberá ejecutar la aplicación en un dispositivo o un emulador. La forma más sencilla de hacerlo es simplemente usar el siguiente comando para iniciar su aplicación local en un emulador o un dispositivo conectado. a tu computadora

    ejecución de límite de npx [ios | androide]

Abra la aplicación, póngala en segundo plano y ábrala nuevamente. Debería ver en los registros que la aplicación realizó la actualización.

¡Felicitaciones! 🎉 Ha implementado con éxito su primera Actualización en vivo. Esto es solo el comienzo de lo que puede hacer con las Actualizaciones en vivo. Para obtener más información, consulte los [documentos de Actualizaciones en vivo] completos (/docs/plugin/cloud-mode/getting-started/)

## Eliminar dependencias del Centro de aplicaciones

Ahora que hemos integrado los servicios de Capgo, debes eliminar cualquier referencia a App Center. Además de ser una práctica recomendada para eliminar códigos/servicios no utilizados, eliminar el SDK debería reducir el tamaño de tus aplicaciones.

Primero, abra una terminal y luego desinstale los complementos de App Center:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

A continuación, abra `configxml` y elimine los siguientes valores de `preferencia`. Se verán similares a:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Si estaba utilizando App Center Analytics en su aplicación, elimine los siguientes elementos de "preferencias": "APPCENTER_ANALYTICS_ENABLE_IN_JS" y "APPCENTER_CRASHES_ALWAYS_SEND".

Elimine los siguientes elementos `<access />`:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Elimine la referencia a CodePush en la etiqueta `meta` de CSP en el archivo `indexhtml` (`https://codepushappcenterms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Finalmente, dentro de su aplicación, elimine cualquier referencia de código a los servicios de App Center, como `codePushsync();`

## Próximos pasos

Ha migrado de App Center a Capgo, utilizando las Actualizaciones en vivo. Esto es solo el comienzo de lo que puede usar Capgo para Explorar el resto del servicio incluye Canal (múltiples entornos) y anular la integración de Cloud CLI, use Capgo dentro de su CI/ Plataforma de CD de elección (como GitHub Action, GitLab, Jenkins y más)

## Actualización automática de la aplicación de envío

Si su código está alojado en GitHub, puede configurar la compilación y publicación automática en unos pocos pasos más, gracias a las acciones de GitHub.

He hecho un segundo artículo para que puedas hacerlo.

## Créditos

Muchas gracias a [Ionic](https://ioniccom/), este artículo está basado en [este artículo](https://ionicio/blog/moving-from-microsoft-app-center-to-ionic-appflow/ ) reescrito con chat-gpt-3 y adaptado