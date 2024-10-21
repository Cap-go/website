---
slug: live-update-with-quasar-and-capacitor
title: >-
  Creación de aplicaciones móviles con actualizaciones en vivo, Quasar y
  Capacitor.
description: >-
  Cómo crear una aplicación móvil con Quasar y Capacitor e implementar
  actualizaciones en vivo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Ilustración de Quasar y Capgo
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

En este tutorial, comenzaremos creando una nueva aplicación web usando [Quasar](https://quasar.dev/). Más adelante, aprenderemos cómo convertirla en una aplicación móvil usando Capacitor si quieres que tu aplicación se vea mejor en dispositivos móviles.

Con Capacitor, puedes transformar tu aplicación web Quasar en una aplicación móvil sin necesidad de hacer muchas cosas complicadas o aprender una forma completamente nueva de crear aplicaciones como lo harías con algo llamado React Native.

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación Quasar y luego incorporando Capacitor para adentrarse en el ámbito de las aplicaciones móviles nativas. Además, utilizarás [Capgo](https://capgo.app/) para enviar actualizaciones en vivo a tu aplicación en segundos.

## Acerca de Capacitor

¡CapacitorJS es realmente revolucionario! Puedes incorporarlo fácilmente en cualquier proyecto web, y envolverá tu aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio por ti. Además, sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada o curva de aprendizaje pronunciada. Su API delgada y funcionalidad simplificada hacen que sea muy fácil integrarlo en tu proyecto. ¡Confía en mí, te asombrarás de lo sencillo que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando tu aplicación Quasar

Para crear una nueva aplicación Quasar, ejecuta el siguiente comando:

```shell
npm init quasar
```

![Configuración del Proyecto Quasar](/quasar-setup.webp)

Elige la opción "App with Quasar CLI" y luego "Quasar v2".

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script sencillo en nuestro **package.json** que pueda utilizarse para construir y copiar el proyecto Quasar:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Después de ejecutar el comando `generate`, deberías poder ver una nueva carpeta `dist` en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora, debemos configurarla correctamente.

## Añadiendo Capacitor a tu aplicación Quasar

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero después es tan simple como ejecutar un solo comando `sync`.

Primero, podemos instalar el [CLI de Capacitor](https://capacitorjs.com/docs/cli/) como una dependencia de desarrollo, y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete.

Luego, necesitamos instalar el paquete central y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos agregar las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Inicializar Capacitor](/capacitor-init.webp)

En este punto, deberías poder observar nuevas carpetas **ios** y **android** en tu proyecto Quasar.

**¡Esos son proyectos nativos reales!**

Para acceder al proyecto de Android más adelante, debes instalar [Android Studio](https://developer.android.com/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developer.apple.com/xcode/).

Además, deberías encontrar un archivo **capacitor.config.ts** en tu proyecto, que contiene algunas configuraciones fundamentales de Capacitor utilizadas durante la sincronización. Lo único a lo que debes prestar atención es el **webDir**, que debe apuntar al resultado de tu comando de construcción. Actualmente, es inexacto.

Para corregir esto, abre el archivo **capacitor.config.json** y actualiza el **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Puedes probarlo ejecutando los siguientes comandos:

```shell
npm run generate
npx cap sync
```

El primer comando `npm run generate` simplemente construirá tu proyecto Quasar y copiará la compilación estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Además, el comando sync podría actualizar las plataformas nativas e instalar plugins, así que cuando instales nuevos [plugins de Capacitor](https://capacitorjs.com/docs/plugins/) es momento de ejecutar `npx cap sync` nuevamente.Sin darte cuenta, ya has terminado, así que veamos la aplicación en un dispositivo.

## Compilar y desplegar aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener instalado **Xcode**, y para aplicaciones Android, necesitas tener instalado **Android Studio**. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, necesitas inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Consola de Google Play para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar la CLI de Capacitor para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación en un dispositivo conectado es fácil. En Android Studio, solo necesitas esperar a que todo esté listo, y puedes desplegar tu aplicación en un dispositivo conectado sin cambiar ninguna configuración. Aquí tienes un ejemplo:

![android-studio-run](/android-studio-run.webp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo el simulador. Si no has hecho esto antes, Xcode te guiará a través del proceso (pero de nuevo, necesitas estar inscrito en el Programa de Desarrolladores). Después de eso, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí tienes un ejemplo:

![xcode-run](/xcode-run.webp)

¡Felicidades! Has desplegado con éxito tu aplicación web Quasar en un dispositivo móvil. Aquí tienes un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo.

## Actualización en vivo de Capgo

La Actualización en vivo de Capgo es un servicio que permite a los desarrolladores desplegar actualizaciones a sus aplicaciones móviles sin pasar por el proceso tradicional de envío a la App Store. Esto puede ser una forma conveniente de arreglar rápidamente errores o hacer pequeñas actualizaciones a una aplicación sin esperar el proceso de revisión de la App Store.

Integrar Capgo en tu aplicación Quasar es un proceso sencillo que te permite aprovechar el poder de las actualizaciones en vivo en tiempo real. Esta guía paso a paso te guiará a través de la integración e implementación de la Actualización en vivo de Capgo, permitiéndote entregar actualizaciones sin problemas.

**Regístrate y accede al Panel de Capgo**:

¡Es hora de registrarte y obtener tu clave API para subir tu primera versión! Comienza por [registrarte para una cuenta de Capgo](https://web.capgo.app/register/)

**Instala el SDK de Capgo**:

Desde una línea de comandos, directamente en la raíz de tu aplicación Capacitor, ejecuta:

`npm i @capgo/capacitor-updater && npx cap sync` Para instalar el plugin en tu aplicación Capacitor.

Y luego añade a tu aplicación este código como reemplazo del de CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le dirá al plugin nativo que la instalación ha tenido éxito.

**Inicia sesión en Capgo CLOUD**:

Primero, usa la [clave API](https://web.capgo.app/dashboard/apikeys/) `all` presente en tu cuenta para iniciar sesión con la CLI:

    `npx @capgo/cli@latest login TU_CLAVE`

**Añade tu primera aplicación**:

Comencemos creando primero una aplicación en Capgo Cloud con la CLI:

```shell
    npx @capgo/cli@latest app add
```
Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

**Sube tu primera versión**:

Ejecuta el comando para compilar tu código y enviarlo a Capgo con:

```shell
npx @capgo/cli@latest bundle upload`
```

Por defecto, el nombre de la versión será el que está en tu archivo package.json.

Verifica en [Capgo](https://web.capgo.app/login/) si la compilación está presente.

Incluso puedes probarlo con mi [aplicación móvil de sandbox](https://capgo.app/app_mobile/)

**Haz que el canal sea predeterminado**:

Después de haber enviado tu aplicación a Capgo, necesitas hacer que tu canal sea predeterminado para permitir que las aplicaciones reciban actualizaciones de Capgo.

`npx @capgo/cli@latest channel set production -s default`

**Configura la aplicación para validar actualizaciones**:

Añade esta configuración a tu archivo JavaScript principal:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Luego haz un `npm run build && npx cap copy` para actualizar tu aplicación.

**Recibe una actualización en vivo**:

Para que tu aplicación reciba una actualización en vivo de Deploy, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o un dispositivo conectado a tu computadora.npx cap run [ios | android]

Abre la aplicación, ponla en segundo plano y ábrela de nuevo, deberías ver en los registros que la aplicación realizó la actualización

¡Felicidades! 🎉 Has desplegado con éxito tu primera Actualización en Vivo. Esto es solo el comienzo de lo que puedes hacer con las Actualizaciones en Vivo. Para aprender más, consulta la [documentación completa de Live Updates](https://capgoapp/docs/plugin/cloud-mode/getting-started/)

## Usando Plugins de Capacitor

Veamos cómo usar un plugin de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un plugin bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial en el [plugin Share](https://capacitorjscom/docs/apis/share/), ¡pero de todos modos muestra el diálogo nativo de compartir! Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos el **pages/indexvue** a esto:

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego volver a desplegar la aplicación en nuestro dispositivo. Para hacer esto, ejecuta el siguiente comando:

```
npx cap sync
```

Después de presionar el botón, ¡puedes presenciar el hermoso diálogo nativo de compartir en acción!

## Añadiendo opcionalmente Konsta UI

Para usar Konsta UI en tu aplicación Quasar, necesitas tener [tailwind ya instalado](https://tailwindcsscom/docs/installation/) y para instalar el paquete:

```shell
npm i konsta
```

Además, necesitas modificar tu archivo `tailwindconfigjs`:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` extenderá la configuración predeterminada de Tailwind CSS (o tu configuración personalizada) con algunas variantes adicionales y utilidades auxiliares requeridas para Konsta UI.

Ahora necesitamos configurar el componente principal [App](https://konstauicom/vue/app/) para que podamos establecer algunos parámetros globales (como `theme`).

Necesitamos envolver toda la aplicación con `App` en el `pages/_appvue`:

```html
<template>
  <App theme="ios">
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Página de ejemplo

Ahora que todo está configurado, podemos usar los componentes Vue de Konsta UI en nuestras páginas de Quasar.

Por ejemplo, abramos `pages/indexvue` y cambiémoslo a lo siguiente:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Quasar & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

Si la recarga en vivo está desincronizada después de instalar todos los componentes necesarios, intenta reiniciar todo. Una vez que hayas hecho eso, ¡deberías ver una aplicación móvil con un aspecto algo nativo, construida con Quasar y Capacitor!

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma simple de compartir código y mantener una interfaz de usuario consistente.

Y con la adición de [Capgo](https://capgoapp/), es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Si quieres aprender cómo agregar Capgo a tu aplicación Nextjs, echa un vistazo al siguiente artículo: