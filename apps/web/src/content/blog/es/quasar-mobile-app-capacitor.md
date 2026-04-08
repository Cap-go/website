---
slug: quasar-mobile-app-capacitor
title: 'Creando aplicaciones móviles con actualizaciones en vivo, Quasar y Capacitor.'
description: >-
  Cómo crear una aplicación móvil con Quasar, Capacitor e implementar
  actualizaciones en vivo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /quasar_capgo.webp
head_image_alt: Ilustración de Quasar y Capgo
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
En este tutorial, comenzaremos creando una nueva aplicación web utilizando [Quasar](https://quasar.dev/). Más adelante, aprenderemos a convertirla en una aplicación móvil utilizando Capacitor. Si deseas que tu aplicación se vea mejor en dispositivos móviles.

Con Capacitor, puedes cambiar tu aplicación web de Quasar en una aplicación móvil sin necesidad de hacer muchas cosas complicadas o aprender una forma completamente nueva de hacer aplicaciones como lo harías con algo llamado React Native.

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación Quasar y luego incorporando Capacitor para adentrarte en el ámbito de las aplicaciones nativas móviles. Además, utilizarás [Capgo](https://capgo.app/) para enviar actualizaciones en vivo a tu aplicación en segundos.

## Acerca de Capacitor

CapacitorJS es realmente un cambio de juego. Puedes incorporarlo sin esfuerzo en cualquier proyecto web, y envolverá tu aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio para ti. Además, sus complementos proporcionan acceso a las funciones nativas del dispositivo, como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada ni curva de aprendizaje pronunciada. Su API ligera y funcionalidad optimizada hacen que sea muy fácil integrarlo en tu proyecto. ¡Confía en mí, te sorprenderá lo fácil que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando Tu Aplicación Quasar

Para crear una nueva aplicación Quasar, ejecuta el siguiente comando:

```shell
npm init quasar
```

![Configuración del Proyecto Quasar](/quasar-setup.webp)

Selecciona la opción "Aplicación con Quasar CLI" y luego "Quasar v2".

Para crear una aplicación móvil nativa, necesitamos un **export** de nuestro proyecto. Por lo tanto, incluimos un script sencillo en nuestro **package.json** que puede ser utilizado para construir y copiar el proyecto Quasar:

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

## Agregando Capacitor a Tu Aplicación Quasar

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero luego es tan simple como ejecutar un solo comando `sync`.

Primero, podemos instalar el [Capacitor CLI](https://capacitorjs.com/docs/cli/) como una dependencia de desarrollo y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID de paquete.

A continuación, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

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

A este punto, deberías poder observar nuevas carpetas **ios** y **android** en tu proyecto Quasar.

**¡Esos son proyectos nativos reales!**

Para acceder al proyecto de Android más tarde, debes instalar [Android Studio](https://developer.android.com/studio/). Para iOS, necesitas un Mac y deberías instalar [Xcode](https://developer.apple.com/xcode/).

Además, deberías encontrar un archivo **capacitor.config.ts** en tu proyecto, que contiene algunas configuraciones fundamentales de Capacitor utilizadas durante la sincronización. Lo único a lo que debes prestar atención es el **webDir**, que debe apuntar al resultado de tu comando de construcción. Actualmente, no es correcto.

Para rectificar esto, abre el archivo **capacitor.config.json** y actualiza el **webDir**:

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

El primer comando `npm run generate` simplemente construirá tu proyecto Quasar y copiará la construcción estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan ser mostradas en una aplicación.

Además, el comando de sincronización puede actualizar las plataformas nativas e instalar complementos, así que cuando instales un nuevo [complemento de Capacitor](https://capacitorjs.com/docs/plugins/) es hora de ejecutar `npx cap sync` nuevamente.

Sin darte cuenta, ya has terminado, ¡así que veamos la aplicación en un dispositivo!

## Construcción y Despliegue de aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, necesitas inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Consola de Google Play para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar el Capacitor CLI para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación en un dispositivo conectado es fácil. En Android Studio, solo necesitas esperar a que todo esté listo, y puedes desplegar tu aplicación en un dispositivo conectado sin cambiar ninguna configuración. Aquí hay un ejemplo:

![android-studio-run](/android-studio-run.webp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo en el simulador. Si no has hecho esto antes, Xcode te guiará a través del proceso (pero nuevamente, necesitas estar inscrito en el Programa de Desarrolladores). Después de eso, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí hay un ejemplo:

![xcode-run](/xcode-run.webp)

¡Felicidades! Has desplegado exitosamente tu aplicación web Quasar en un dispositivo móvil. Aquí hay un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

Pero espera, hay una forma más rápida de hacer esto durante el desarrollo...

## Capgo Live Update

Capgo Live Update es un servicio que permite a los desarrolladores desplegar actualizaciones a sus aplicaciones móviles sin pasar por el proceso de envío tradicional de la App Store. Esta puede ser una forma conveniente de arreglar rápidamente errores o hacer pequeñas actualizaciones a una aplicación sin esperar el proceso de revisión de la App Store.

Integrar Capgo en tu aplicación Quasar es un proceso sencillo que te empodera para aprovechar el poder de las actualizaciones en vivo en tiempo real. Esta guía paso a paso te llevará a través de la integración e implementación de Capgo Live Update, permitiéndote ofrecer actualizaciones sin interrupciones.

**Regístrate y Accede al Dashboard de Capgo**:

¡Es hora de registrarte y obtener tu clave API para subir tu primera versión! Comienza [registrándote para una cuenta de Capgo](https://console.capgo.app/register/).

**Instala el SDK de Capgo**:

Desde una línea de comandos, directamente en la raíz de tu aplicación Capacitor, ejecuta:

`npm i @capgo/capacitor-updater && npx cap sync` para instalar el complemento en tu aplicación Capacitor.

Y luego agrega a tu aplicación este código como reemplazo del de CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le dirá al complemento nativo que la instalación ha sido exitosa.

**Inicia sesión en Capgo CLOUD**:

Primero, utiliza el `all` [apikey](https://console.capgo.app/dashboard/apikeys/) presente en tu cuenta para iniciar sesión con la CLI:

    `npx @capgo/cli@latest login YOU_KEY`

**Agrega tu primera aplicación**:

Comencemos creando una aplicación en Capgo Cloud con la CLI.

```shell
    npx @capgo/cli@latest app add
```
Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

**Sube tu primera versión**:

Ejecuta el comando para construir tu código y enviarlo a Capgo con:

```shell
npx @capgo/cli@latest bundle upload`
```

Por defecto, el nombre de la versión será el que está en tu archivo package.json.

Verifica en [Capgo](https://console.capgo.app/login/) si la construcción está presente.

Incluso puedes probarlo con mi [aplicación de sandbox móvil](https://capgo.app/app_mobile/).

**Haz que la canal sea predeterminada**:

Después de haber enviado tu aplicación a Capgo, necesitas hacer que tu canal sea predeterminado para que las aplicaciones reciban actualizaciones de Capgo.

`npx @capgo/cli@latest channel set production -s default`

**Configura la aplicación para validar actualizaciones**:

Agrega esta configuración a tu archivo JavaScript principal.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Luego haz un `npm run build && npx cap copy` para actualizar tu aplicación.

**Recibe una Actualización en Vivo**:

Para que tu aplicación reciba una actualización en vivo de Deploy, necesitarás ejecutar la aplicación en un dispositivo o un emulador. La forma más fácil de hacer esto es simplemente usar el siguiente comando para lanzar tu aplicación local en un emulador o en un dispositivo conectado a tu computadora.

      npx cap run [ios | android]

Abre la aplicación, ponla en segundo plano y ábrela nuevamente, deberías ver en los registros que la aplicación ha hecho la actualización.

¡Felicidades! 🎉 Has desplegado exitosamente tu primera Actualización en Vivo. Este es solo el comienzo de lo que puedes hacer con Actualizaciones en Vivo. Para aprender más, consulta la completa [documentación sobre Actualizaciones en Vivo](https://capgo.app/docs/plugin/cloud-mode/getting-started/).

## Usando Complementos de Capacitor

Veamos cómo usar un complemento de Capacitor en acción, que hemos mencionado algunas veces antes. Para hacer esto, podemos instalar un complemento bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial sobre el [complemento Share](https://capacitorjs.com/docs/apis/share/), pero de todos modos muestra el cuadro de diálogo de compartir nativo. Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos el **pages/index.vue** a esto:

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

Como mencioné anteriormente, al instalar nuevos complementos, necesitamos realizar una operación de sincronización y luego volver a desplegar la aplicación en nuestro dispositivo. Para hacer esto, ejecuta el siguiente comando:

```
npx cap sync
```

Después de presionar el botón, ¡puedes presenciar el hermoso cuadro de diálogo de compartir nativo en acción!

## Opcionalmente Agregando Konsta UI

Para usar Konsta UI en tu aplicación Quasar, necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/installation/) y instalar el paquete:

```shell
npm i konsta
```

Además, necesitas modificar tu archivo `tailwind.config.js`:

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

`konstaConfig` ampliará la configuración predeterminada (o la tuya personalizada) de Tailwind CSS con algunos variantes y utilidades auxiliares requeridas para Konsta UI.

Ahora necesitamos configurar el componente principal de [App](https://konstaui.com/vue/app/) para que podamos establecer algunos parámetros globales (como `tema`).

Necesitamos envolver toda la aplicación con `App` en el `pages/_app.vue`:

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

### Página de Ejemplo

Ahora que todo está configurado, podemos usar los componentes de Konsta UI Vue en nuestras páginas de Quasar.

Por ejemplo, vamos a abrir `pages/index.vue` y cambiarlo a lo siguiente:

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

Si la recarga en vivo no está sincronizada después de instalar todos los componentes necesarios, intenta reiniciar todo. Una vez que hayas hecho eso, deberías ver una aplicación móvil con un aspecto algo nativo, construida con Quasar y Capacitor.

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma simple de compartir código y mantener una UI coherente.

Y con la adición de [Capgo](https://capgo.app/), es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Si deseas aprender cómo agregar Capgo a tu aplicación Next.js, echa un vistazo al próximo artículo:
