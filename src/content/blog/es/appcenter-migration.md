---
slug: appcenter-migration
title: Migrando de App Center a Capgo
description: >-
  En esta guía, veremos la migración completa de Capgo Live Updates, una
  alternativa a Microsoft CodePush.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2025-10-31T17:55:22.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS Dev buscando alternativa
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: es
next_blog: automatic-build-and-release-with-github-actions
---
## Resumen de Migración

* [Capgo](/register/) es un servicio que ayuda a los equipos de desarrollo a enviar aplicaciones en vivo a las aplicaciones implementadas.
* Las aplicaciones Capacitor JS escritas en jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic o incluso tu propia solución personalizada pueden ser migradas. **No se requiere una aplicación Ionic existente**.
* [Colt](https://volt.build/) ofrece servicios equivalentes para App Center Build (compilación de aplicaciones Android/iOS). Para servicios de Pruebas, Diagnósticos y Análisis.

##### Nota

Si tu aplicación aún usa Cordova, es necesario [migrar a Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/) primero antes de migrar a Capgo.

Construido por el equipo de Ionic como sucesor espiritual de Cordova, Capacitor permite que el desarrollo se acerque más a las herramientas y capacidades nativas con el objetivo de proporcionar una experiencia de usuario y rendimiento aún mejores.

Afortunadamente, el proceso de migración es sencillo y la mayoría de los plugins de Cordova son compatibles con versiones anteriores de Capacitor. [Comienza la migración aquí](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/).

## Acerca de Capgo

Capgo se encarga de actualizar las aplicaciones a lo largo del tiempo. Los equipos de desarrollo pueden enfocarse completamente en las características únicas de su aplicación y externalizar el complicado proceso de entrega de aplicaciones a Capgo.

Capgo llena los vacíos entre la entrega web y móvil.

## Prerrequisitos de Capgo

Al igual que App Center, [Capgo](/register/) admite aplicaciones alojadas en repositorios Git en Azure DevOps, Bitbucket, GitHub y GitLab.

### Instalar Capgo CLI

##### nota

Tener Node y NPM instalados en tu computadora, los necesitas antes de continuar. Siempre usa la [versión LTS actual](https://nodejs.org/) Capgo no soporta versiones anteriores.

### Crear archivos `package.json` y configuración de Capacitor

##### nota

Antes de comenzar, recomiendo hacer cambios en una rama Git nueva.

Dado que [Capgo](/register/) fue creado para automatizar aplicaciones capacitor, requiere un archivo que tu aplicación puede no tener. Primero, crea un archivo `capacitor.config.json`. La forma más fácil de crearlo es ejecutar en la raíz de tu aplicación:

```shell
npm install @capacitor/core
```

Luego, inicializa Capacitor usando el cuestionario CLI:

```shell
npx cap init
```

El CLI te hará algunas preguntas, comenzando con el nombre de tu aplicación y el ID del paquete que te gustaría usar para tu aplicación.

Finalmente, confirma los nuevos archivos en tu proyecto:

    git add .git commit -m "added package json and capacitor config" && git push

### Migrar el Código

Ahora que tienes los nuevos archivos requeridos por [Capgo](/register/) en su lugar, puedes centrar nuestra atención en la aplicación en sí. [Capgo](/register/) espera que toda la aplicación construida esté dentro de un directorio llamado `dist`.

Si tu código construido no está en un directorio `dist`, cambia este valor en el archivo de configuración de Capacitor.

Así es como debería verse la estructura de directorios de la aplicación:

![Estructura de la Aplicación](/directory_looklike.webp)

## Configuración de Capgo

Con tu aplicación lista para la integración con [Capgo](https://console.capgo.app/), ¡es hora de registrarte y obtener tu clave API para subir tu primera versión! Comienza [registrándote para una cuenta de Capgo](/register/).

Una vez que hayas iniciado sesión en Capgo, navega a la página de Cuenta, luego haz clic en clave API, luego haz clic en la clave 'write' para copiarla al portapapeles.

### Instalar el SDK de Capgo

Desde la línea de comandos, directamente en la raíz de la carpeta de tu aplicación Capacitor, ejecuta el siguiente comando:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el plugin en tu aplicación Capacitor.

Y luego agrega a tu aplicación este código como reemplazo del de CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le indicará al plugin nativo que la instalación ha tenido éxito.

## Desplegando Actualizaciones en Vivo (Alternativa a CodePush)

La función de Actualización en Vivo funciona usando el [SDK de Capgo](https://github.com/Cap-go/capacitor-updater/) instalado en tu aplicación nativa para escuchar un Destino de Canal de Despliegue específico. Cuando una compilación Web se asigna a un Destino de Canal, esa actualización se desplegará a los dispositivos de usuarios que ejecuten binarios configurados para escuchar el Destino de Canal especificado.

### Iniciar sesión en Capgo CLOUD 

Primero, usa la [apikey](https://console.capgo.app/dashboard/apikeys/) `all` presente en tu cuenta para iniciar sesión con el CLI:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Añade tu primera aplicación

Comencemos creando la aplicación en Capgo Cloud con el CLI.

`npx @capgo/cli@latest app add`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

## Sube tu primer paquete

Ejecuta el comando para compilar tu código y enviarlo a Capgo con:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Por defecto, el nombre de la versión será el que está en tu archivo `package.json`.

Verifica en [Capgo](https://console.capgo.app/) si la compilación está presente.

Incluso puedes probarlo con mi [aplicación móvil sandbox](https://capgo.app/app_mobile/).

### Hacer el canal predeterminado

Después de haber enviado tu aplicación a Capgo, necesitas hacer que tu canal sea `default` para permitir que las aplicaciones reciban actualizaciones de Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurar la aplicación para validar actualizaciones

Añade esta configuración a tu archivo JavaScript principal.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Luego ejecuta `npm run build && npx cap copy` para actualizar tu aplicación.

### Recibir una Actualización en Vivo en un Dispositivo

Para que tu aplicación reciba una actualización en vivo de Deploy, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o un dispositivo conectado a tu computadora.

    npx cap run [ios | android]

Abre la aplicación, ponla en segundo plano y ábrela de nuevo, deberías ver en los registros que la aplicación realizó la actualización.

¡Felicitaciones! 🎉 Has desplegado exitosamente tu primera Actualización en Vivo. Esto es solo el comienzo de lo que puedes hacer con las Actualizaciones en Vivo. Para aprender más, consulta la [documentación completa de Live Updates](/docs/plugin/cloud-mode/getting-started/).

## Eliminar Dependencias de App Center

Ahora que hemos integrado los servicios de Capgo, debes eliminar cualquier referencia a App Center. Además de ser una buena práctica eliminar código/servicios no utilizados, eliminar el SDK debería reducir el tamaño de tus aplicaciones.

Primero, abre una terminal y desinstala los plugins de App Center:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Luego, abre `config.xml` y elimina los siguientes valores de `preference`. Se verán similares a:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Si estabas usando App Center Analytics en tu aplicación, elimina los siguientes elementos `preferences`: `APPCENTER_ANALYTICS_ENABLE_IN_JS` y `APPCENTER_CRASHES_ALWAYS_SEND`.

Elimina los siguientes elementos `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />`:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Elimina la referencia a CodePush en la etiqueta `meta` CSP en el archivo `index.html` (`https://codepush.appcenter.ms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Finalmente, dentro de tu aplicación, elimina cualquier referencia de código a los servicios de App Center, como `codePush.sync();`.

## Siguientes Pasos

Has migrado de App Center a Capgo, utilizando las Actualizaciones en Vivo. Esto es solo el comienzo de lo que puedes usar Capgo para. Explora el resto del servicio que incluye Canal (múltiples entornos) y anulación. Integración con Cloud CLI, usa Capgo dentro de tu plataforma CI/CD preferida (como GitHub Action, GitLab, Jenkins y más).

## Envío automático de actualizaciones de la aplicación

Si tu código está alojado en GitHub, puedes configurar la compilación y lanzamiento automático en unos pocos pasos más, gracias a GitHub actions.

He creado un segundo artículo para permitirte hacerlo.

## Créditos

Muchas gracias a [Ionic](https://ionic.com/), este artículo está basado en [este artículo](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/) reescrito con chat-gpt-3 y adaptado.
