---
slug: appcenter-migration
title: Migración de App Center a Capgo
description: >-
  En esta guía, recorreremos paso a paso la migración completa para Capgo Live
  Updates, una alternativa a Microsoft CodePush.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Desarrollador de Capacitor JS busca alternativa
tag: Migration
published: true
locale: es
next_blog: automatic-build-and-release-with-github-actions
---

## Resumen de Migración

* [Capgo](/register/) es un servicio que ayuda a los equipos de desarrollo a enviar aplicaciones en vivo a aplicaciones implementadas
* Las aplicaciones Capacitor JS escritas en jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic o incluso su propia solución personalizada pueden migrarse **No se requiere una aplicación Ionic existente**
* [Colt](https://voltbuild/) ofrece servicios equivalentes para App Center Build (compilación de aplicaciones Android/iOS) para servicios de Prueba, Diagnóstico y Análisis

##### Nota

Si su aplicación aún utiliza Cordova, es necesario [migrar a Capacitor](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/) primero antes de migrar a Capgo

Desarrollado por el equipo de Ionic como sucesor espiritual de Cordova, Capacitor permite que el desarrollo se acerque a las herramientas y capacidades nativas con el objetivo de proporcionar una experiencia de usuario y rendimiento aún mejores

Afortunadamente, el proceso de migración es fácil y la mayoría de los plugins de Cordova son compatibles con versiones anteriores de Capacitor [Comience a migrar aquí](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/)

## Acerca de Capgo

Capgo se encarga de actualizar las aplicaciones a lo largo del tiempo Los equipos de desarrollo pueden enfocarse completamente en las características únicas de su aplicación y externalizar el complicado proceso de entrega de aplicaciones a Capgo

Capgo llena los vacíos entre la entrega web y móvil

## Requisitos previos de Capgo

Al igual que App Center, [Capgo](/register/) admite aplicaciones alojadas en repositorios Git en Azure DevOps, Bitbucket, GitHub y GitLab

### Instalar Capgo CLI

##### nota

Tenga Node y NPM instalados en su computadora antes de continuar Siempre use la [versión LTS actual](https://nodejsorg/) Capgo no admite versiones anteriores

### Crear archivos `packagejson` y de configuración de Capacitor

##### nota

Antes de comenzar, recomiendo hacer cambios en una rama Git nueva

Dado que [Capgo](/register/) fue creado para automatizar aplicaciones de Capacitor, requiere un archivo que su aplicación puede no tener Primero, cree un archivo `capacitorconfigjson` La forma más fácil de crearlo es ejecutar en la raíz de su aplicación:

```shell
npm install @capacitor/core
```

Luego, inicialice Capacitor usando el cuestionario de la CLI:

```shell
npx cap init
```

La CLI le hará algunas preguntas, comenzando con el nombre de su aplicación y el ID del paquete que desea usar para su aplicación

Finalmente, confirme los nuevos archivos en su proyecto:

    git add git commit -m "added package json and capacitor config" && git push

### Migrar el código

Ahora que tiene los nuevos archivos requeridos por [Capgo](/register/) en su lugar, puede dirigir nuestra atención a la aplicación en sí [Capgo](/register/) espera que toda la aplicación compilada esté dentro de un directorio llamado `dist`

Si su código compilado no está en un directorio `dist`, cambie este valor en el archivo de configuración de Capacitor

Así es como debería verse la estructura de directorios de la aplicación:

![Estructura de la aplicación](/directory_looklikewebp)

## Configuración de Capgo

Con su aplicación lista para la integración de [Capgo](https://webcapgoapp/), ¡es hora de registrarse y obtener su clave API para cargar su primera versión! Comience por [registrarse para obtener una cuenta de Capgo](/register/)

Una vez que haya iniciado sesión en Capgo, navegue a la página de Cuenta, luego haga clic en Clave API, luego haga clic en la clave 'write' para copiarla en su portapapeles

### Instalar el SDK de Capgo

Desde una línea de comando, directamente en la raíz de la carpeta de su aplicación Capacitor, ejecute el siguiente comando:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el plugin en su aplicación Capacitor

Y luego agregue a su aplicación este código como reemplazo del de CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le dirá al plugin nativo que la instalación ha tenido éxito

## Implementando actualizaciones en vivo (Alternativa a CodePush)

La función de actualización en vivo funciona utilizando el [SDK de Capgo](https://githubcom/Cap-go/capacitor-updater/) instalado en su aplicación nativa para escuchar un Destino de Canal de Implementación particular Cuando una compilación Web se asigna a un Destino de Canal, esa actualización se implementará en los dispositivos de los usuarios que ejecuten binarios configurados para escuchar el Destino de Canal especificado### Iniciar sesión en Capgo CLOUD

Primero, utiliza la [clave API](https://webcapgoapp/dashboard/apikeys/) `all` presente en tu cuenta para iniciar sesión con la CLI:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Agregar tu primera aplicación

Comencemos creando la aplicación en Capgo Cloud con la CLI

`npx @capgo/cli@latest app add`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación

## Subir tu primer paquete

Ejecuta el comando para compilar tu código y enviarlo a Capgo con:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Por defecto, el nombre de la versión será el que está en tu archivo `packagejson`

Verifica en [Capgo](https://webcapgoapp/) si la compilación está presente

Incluso puedes probarlo con mi [aplicación móvil de sandbox](https://capgoapp/app_mobile/)

### Hacer que el canal sea predeterminado

Después de haber enviado tu aplicación a Capgo, necesitas hacer que tu canal sea `default` para permitir que las aplicaciones reciban actualizaciones de Capgo

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurar la aplicación para validar actualizaciones

Agrega esta configuración a tu archivo JavaScript principal

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Luego ejecuta `npm run build && npx cap copy` para actualizar tu aplicación

### Recibir una actualización en vivo en un dispositivo

Para que tu aplicación reciba una actualización en vivo de Deploy, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o un dispositivo conectado a tu computadora

    npx cap run [ios | android]

Abre la aplicación, ponla en segundo plano y ábrela de nuevo, deberías ver en los registros que la aplicación se actualizó

¡Felicidades! 🎉 Has implementado con éxito tu primera actualización en vivo. Esto es solo el comienzo de lo que puedes hacer con las actualizaciones en vivo. Para aprender más, consulta la [documentación completa de Live Updates](/docs/plugin/cloud-mode/getting-started/)

## Eliminar dependencias de App Center

Ahora que hemos integrado los servicios de Capgo, debes eliminar cualquier referencia a App Center. Además de ser una buena práctica eliminar código/servicios no utilizados, eliminar el SDK debería reducir el tamaño de tus aplicaciones

Primero, abre una terminal y desinstala los plugins de App Center:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Luego, abre `configxml` y elimina los siguientes valores de `preference`. Se verán similares a:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Si estabas usando App Center Analytics en tu aplicación, elimina los siguientes elementos `preferences`: `APPCENTER_ANALYTICS_ENABLE_IN_JS` y `APPCENTER_CRASHES_ALWAYS_SEND`

Elimina los siguientes elementos `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />`:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Elimina la referencia a CodePush en la etiqueta `meta` CSP en el archivo `indexhtml` (`https://codepushappcenterms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Finalmente, dentro de tu aplicación, elimina cualquier referencia de código a los servicios de App Center, como `codePushsync();`

## Próximos pasos

Has migrado de App Center a Capgo, utilizando las actualizaciones en vivo. Esto es solo el comienzo de lo que puedes usar Capgo para. Explora el resto del servicio que incluye Canal (múltiples entornos) y anula la integración de Cloud CLI, usa Capgo dentro de tu plataforma CI/CD preferida (como GitHub Action, GitLab, Jenkins y más)

## Envío automático de actualizaciones de la aplicación

Si tu código está alojado en GitHub, puedes configurar la compilación y lanzamiento automáticos en unos pocos pasos más, gracias a las acciones de GitHub

He creado un segundo artículo para permitirte hacerlo

## Créditos

Muchas gracias a [Ionic](https://ioniccom/), este artículo está basado en [este artículo](https://ionicio/blog/moving-from-microsoft-app-center-to-ionic-appflow/) reescrito con chat-gpt-3 y adaptado