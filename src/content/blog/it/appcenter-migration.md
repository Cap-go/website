---
slug: appcenter-migration
title: Migrazione da App Center a Capgo
description: >-
  In questa guida, esamineremo la migrazione completa per Capgo Live Updates,
  un'alternativa a Microsoft CodePush.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2025-10-30T15:06:44.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS Dev en busca de una alternativa
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: it
next_blog: automatic-build-and-release-with-github-actions
---
## Migration Summary

* [Capgo](/register/) es un servicio que ayuda a los equipos de desarrollo a enviar aplicaciones en vivo a aplicaciones desplegadas.
* Las aplicaciones de Capacitor JS escritas en jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic o incluso tu propia solución personalizada pueden ser migradas. **No se requiere una aplicación Ionic existente.**.
* [Colt](https://volt.build/) ofrece servicios equivalentes para App Center Build (construir aplicaciones Android/iOS). Para Test, Diagnósticos y servicios de Analítica.

##### Nota

Si tu aplicación aún utiliza Cordova, es necesario [migrar a Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/) primero antes de migrar a Capgo.

Construido por el equipo de Ionic como un sucesor espiritual de Cordova, Capacitor permite que el desarrollo se acerque a las herramientas nativas y capacidades con el objetivo de proporcionar una mejor experiencia y rendimiento al usuario.

Afortunadamente, el proceso de migración es fácil y la mayoría de los plugins de Cordova son compatibles hacia atrás con Capacitor. [Comienza a migrar aquí](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/).

## Acerca de Capgo

Capgo, gestiona la actualización de aplicaciones a lo largo del tiempo. Los equipos de desarrollo pueden centrarse completamente en las características únicas de su aplicación y externalizar el complicado proceso de entrega de aplicaciones a Capgo.

Capgo llena los vacíos entre la entrega web y móvil.

## Requisitos Previos de Capgo

Al igual que App Center, [Capgo](/register/) admite aplicaciones alojadas en repositorios de Git en Azure DevOps, Bitbucket, GitHub y GitLab.

### Instalar Capgo CLI

##### nota

Tienes que tener instalado Node y NPM en tu computadora antes de proceder. Siempre usa la [versión LTS actual](https://nodejs.org/) ya que Capgo no admite versiones más antiguas.

### Crear `package.json` y archivos de configuración de Capacitor

##### nota

Antes de comenzar, te recomiendo hacer cambios en una nueva rama de Git.

Dado que [Capgo](/register/) fue creado para automatizar aplicaciones de capacitor, requiere un archivo que tu aplicación puede no tener. Primero, crea un archivo `capacitor.config.json`. La forma más sencilla de crearlo es ejecutando en la raíz de tu aplicación:

```shell
npm install @capacitor/core
```

Luego, inicializa Capacitor usando el cuestionario de la CLI:

```shell
npx cap init
```

La CLI te hará algunas preguntas, comenzando con el nombre de tu aplicación y el ID del paquete que te gustaría usar para tu aplicación.

Finalmente, compromete los nuevos archivos a tu proyecto:

    git add .git commit -m "added package json and capacitor config" && git push

### Migrar el Código

Ahora que tienes los nuevos archivos requeridos de [Capgo](/register/) en su lugar, puedes dirigir nuestra atención a la propia aplicación. [Capgo](/register/) espera que toda la aplicación construida esté dentro de un directorio llamado `dist`.

Si tu código construido no está en un directorio `dist`, cambia este valor en el archivo de configuración de Capacitor.

Aquí está cómo debería verse la estructura del directorio de la aplicación:

![App Structure](/directory_looklike.webp)

## Configuración de Capgo

Con tu aplicación lista para la integración de [Capgo](https://console.capgo.app/), es hora de registrarte y obtener tu clave API para subir tu primera versión. Comienza por [registrarte para obtener una cuenta de Capgo](/register/).

Una vez que hayas iniciado sesión en Capgo, navega a la página de Cuenta y luego haz clic en la clave API, luego haz clic en la clave 'escribir' para copiarla en tu portapapeles.

### Instalar el SDK de Capgo

Desde una línea de comando, directamente en la raíz de tu carpeta de aplicación de Capacitor, ejecuta el siguiente comando:

`npm i @capgo/capacitor-updater && npx cap sync`
Para instalar el plugin en tu aplicación de Capacitor.

Y luego agrega a tu aplicación este código como reemplazo del de CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le indicará al plugin nativo que la instalación ha sido exitosa.

## Desplegando Actualizaciones en Vivo (Alternativa a CodePush)

La función de Actualización en Vivo funciona utilizando el [SDK de Capgo](https://github.com/Cap-go/capacitor-updater/) instalado en tu aplicación nativa para escuchar un Destino de Canal de Despliegue particular. Cuando una construcción web es asignada a un Destino de Canal, esa actualización se desplegará en los dispositivos de los usuarios que estén ejecutando binarios configurados para escuchar el Destino de Canal especificado.

### Iniciar sesión en Capgo CLOUD

Primero, utiliza el `all` [apikey](https://console.capgo.app/dashboard/apikeys/) presente en tu cuenta para iniciar sesión con la CLI:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Agregar tu primera aplicación

Comencemos creando la aplicación en Capgo Cloud con la CLI.

`npx @capgo/cli@latest app add`

Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

## Subir tu primer paquete

Ejecuta el comando para construir tu código y enviarlo a Capgo con:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Por defecto, el nombre de la versión será el que esté en tu archivo `package.json`.

Verifica en [Capgo](https://console.capgo.app/) si la construcción está presente.

Incluso puedes probarlo con mi [aplicación de sandbox móvil](https://capgo.app/app_mobile/).

### Hacer canal por defecto

Después de haber enviado tu aplicación a Capgo, necesitas hacer tu canal `default` para que las aplicaciones reciban actualizaciones de Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurar la aplicación para validar actualizaciones

Agrega esta configuración a tu archivo JavaScript principal.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Luego haz un `npm run build && npx cap copy` para actualizar tu aplicación.

### Recibir una Actualización en Vivo en un Dispositivo

Para que tu aplicación reciba una actualización en vivo de Despliegue, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más sencilla de hacerlo es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o dispositivo conectado a tu computadora.

    npx cap run [ios | android]

Abre la aplicación, ponla en segundo plano y ábrela de nuevo, deberías ver en los registros que la aplicación realizó la actualización.

¡Felicidades! 🎉 Has desplegado correctamente tu primera Actualización en Vivo. Esto es solo el comienzo de lo que puedes hacer con Actualizaciones en Vivo. Para aprender más, consulta la completa [documentación de Actualizaciones en Vivo](/docs/plugin/cloud-mode/getting-started/).

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

Si estabas utilizando App Center Analytics en tu aplicación, elimina los siguientes elementos de `preferences`: `APPCENTER_ANALYTICS_ENABLE_IN_JS` y `APPCENTER_CRASHES_ALWAYS_SEND`.

Elimina los siguientes elementos de `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />`:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Elimina la referencia a CodePush en la etiqueta `meta` de CSP en el archivo `index.html` (`https://codepush.appcenter.ms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Finalmente, dentro de tu aplicación, elimina cualquier referencia de código a los servicios de App Center, como `codePush.sync();`.

## Próximos Pasos

Has migrado de App Center a Capgo, utilizando las Actualizaciones en Vivo. Esto es solo el comienzo de lo que puedes usar Capgo. Explora el resto del servicio que incluye Canal (múltiples entornos) y anulación. Integración de Cloud CLI, utiliza Capgo dentro de tu plataforma CI/CD de elección (como GitHub Action, GitLab, Jenkins y más).

## Envío automático de actualizaciones de aplicaciones

Si tu código está alojado en GitHub, puedes configurar construcciones y lanzamientos automáticos en unos pasos más, gracias a las acciones de GitHub.

He hecho un segundo artículo para permitirte hacerlo.

## Créditos

Muchas gracias a [Ionic](https://ionic.com/), este artículo se basa en [este artículo](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/) reescrito con chat-gpt-3 y adaptado.
