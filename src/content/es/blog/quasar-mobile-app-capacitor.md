---
slug: live-update-with-quasar-and-capacitor
title: 'Creación de Apps Móviles con actualizaciones en vivo, Quasar y Capacitor.'
description: >-
  Cómo crear una aplicación móvil con Quasar, Capacitor e implementar
  actualizaciones en vivo.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Quasar and Capgo illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

En este tutorial, comenzaremos creando una nueva aplicación web usando [Quasar](https://quasardev/). Más adelante, aprenderemos cómo convertirla en una aplicación móvil usando Capacitor. Si desea que su aplicación se vea mejor en el móvil

Con Capacitor, puede convertir su aplicación web Quasar en una aplicación móvil sin necesidad de hacer muchas cosas difíciles o aprender una forma completamente nueva de crear aplicaciones como lo haría con algo llamado React Native. 

Este tutorial lo guiará a través del proceso, comenzando con una nueva aplicación Quasar y luego incorporando Capacitor para pasar al ámbito de las aplicaciones móviles nativas. Además, utilizará [Capgo](https://capgoapp/) para enviar actualizaciones en vivo a su aplicación en segundos

## Acerca del condensador

¡CapacitorJS realmente cambia las reglas del juego! Puede incorporarlo sin esfuerzo a cualquier proyecto web y envolverá su aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio para usted. Además, sus complementos brindan acceso a funciones nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada ni curva de aprendizaje pronunciada. Su API delgada y su funcionalidad optimizada hacen que sea muy fácil de integrar en tu proyecto. Créeme, te sorprenderá lo fácil que es lograr una aplicación móvil completa. aplicación nativa funcional con Capacitor!

## Preparando tu aplicación Quasar

Para crear una nueva aplicación Quasar, ejecute el siguiente comando:

```shell
npm init quasar
```

![Configuración del proyecto Quasar](/quasar-setupwebp)

Elija la opción "Aplicación con Quasar CLI" y luego "Quasar v2"

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script sencillo en nuestro **packagejson** que se puede utilizar para construir y copiar el proyecto Quasar:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Después de ejecutar el comando "generar", deberías poder detectar una nueva carpeta "dist" en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora debemos configurarla correctamente.

## Agregar condensador a su aplicación Quasar

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero luego es tan simple como ejecutar un único comando `sync`

En primer lugar, podemos instalar [Capacitor CLI](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puede presionar "enter" para aceptar los valores predeterminados. para nombre e ID de paquete

A continuación, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos agregar las plataformas y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

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

![Inicializar condensador](/capacitor-initwebp)

En este punto, deberías poder observar nuevas carpetas **ios** y **android** en tu proyecto Quasar.

**¡Esos son proyectos nativos reales!**

Para acceder al proyecto de Android más adelante, debe instalar [Android Studio](https://developerandroidcom/studio/) Para iOS, necesita una Mac y debe instalar [Xcode](https://developerapplecom/xcode/)

Además, debería encontrar un archivo **capacitorconfigts** en su proyecto, que contiene algunas configuraciones fundamentales del condensador utilizadas durante la sincronización. Lo único a lo que debe prestar atención es al **webDir**, que debe apuntar al resultado de su comando de compilación actualmente, es inexacto

Para rectificar esto, abra el archivo **capacitorconfigjson** y actualice **webDir**:

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

El primer comando `npm run generate` simplemente construirá su proyecto Quasar y copiará la compilación estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en un aplicación

Además, el comando de sincronización puede actualizar las plataformas nativas e instalar complementos, por lo que cuando instale nuevos [complementos de condensador] (https://capacitorjscom/docs/plugins/) es hora de ejecutar `npx cap sync` nuevamenteSin darte cuenta, ya has terminado, ¡así que veamos la aplicación en un dispositivo!

## Crear e implementar aplicaciones nativas

Para desarrollar aplicaciones de iOS, debe tener **Xcode** instalado y, para aplicaciones de Android, debe tener instalado **Android Studio**. Además, si planea distribuir su aplicación en la tienda de aplicaciones, debe inscribirse en el Programa de Desarrolladores de Apple para iOS y Google Play Console para Android

Si es nuevo en el desarrollo móvil nativo, puede usar Capacitor CLI para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que haya configurado sus proyectos nativos, implementar su aplicación en un dispositivo conectado es fácil. En Android Studio, solo necesita esperar a que todo esté listo y podrá implementar su aplicación en un dispositivo conectado sin cambiar ninguna configuración. ejemplo: 

![android-studio-run](/android-studio-runwebp)

En Xcode, debe configurar su cuenta de firma para implementar su aplicación en un dispositivo real en lugar de solo en el simulador. Si no ha hecho esto antes, Xcode lo guía a través del proceso (pero nuevamente, debe estar inscrito en el Programa para desarrolladores) Después de eso, simplemente puede presionar reproducir para ejecutar la aplicación en su dispositivo conectado, que puede seleccionar en la parte superior. Aquí hay un ejemplo:

![xcode-ejecutar](/xcode-runwebp)

¡Felicidades! Ha implementado exitosamente su aplicación web Quasar en un dispositivo móvil. Aquí hay un ejemplo:

<div class="mx-auto" style="ancho: 50%;">
  <img src="/Quasar-mobilewebp" alt="quasar-mobile-app">
</div>

Pero espera, también hay una manera más rápida de hacer esto durante el desarrollo.

## Actualización en vivo de Capgo

Capgo Live Update es un servicio que permite a los desarrolladores implementar actualizaciones en sus aplicaciones móviles sin pasar por el proceso de envío tradicional de la App Store. Esta puede ser una forma conveniente de corregir errores rápidamente o realizar pequeñas actualizaciones en una aplicación sin esperar el proceso de revisión de la App Store.

Integrar Capgo en su aplicación Quasar es un proceso sencillo que le permite aprovechar el poder de las actualizaciones en vivo en tiempo real. Esta guía paso a paso lo guiará a través de la integración e implementación de Capgo Live Update, lo que le permitirá ofrecer actualizaciones sin interrupciones.

**Regístrese y acceda al Panel de Capgo**:

¡Es hora de registrarse y obtener su clave API para cargar su primera versión! Comience [registrándose para obtener una cuenta de Capgo](https://webcapgoapp/register/)

**Instale el SDK de Capgo**:

Desde una línea de comando, directamente a la raíz de su aplicación Capacitor, ejecute:

`npm i @capgo/capacitor-updater && npx cap sync` Para instalar el complemento en su aplicación Capacitor

Y luego agregue a su aplicación este código como reemplazo de CodePush:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Esto le indicará al complemento nativo que la instalación se realizó correctamente. 

**Inicie sesión en Capgo CLOUD**:

Primero, use `all` [apikey](https://webcapgoapp/dashboard/apikeys/) presente en su cuenta para iniciar sesión con la CLI:

    `npx @capgo/cli@último inicio de sesión YOU_KEY`

**Agrega tu primera aplicación**:

Comencemos creando primero una aplicación en Capgo Cloud con la CLI

```shell
    npx @capgo/cli@latest app add
```
Este comando utilizará todas las variables definidas en el archivo de configuración de Capacitor para crear la aplicación.

**Sube tu primera versión**:

Ejecute el comando para construir su código y enviarlo a Capgo con: 

```shell
npx @capgo/cli@latest bundle upload`
```

De forma predeterminada, el nombre de la versión será el que está en su archivo packagejson

Verifique [Capgo](https://webcapgoapp/login/) si la compilación está presente

Incluso puedes probarlo con mi [aplicación móvil sandbox](https://capgoapp/app_mobile/)

**Establecer canal como predeterminado**:

Después de haber enviado su aplicación a Capgo, debe configurar su canal como predeterminado para permitir que las aplicaciones reciban actualizaciones de Capgo.

`npx @capgo/cli@latest producción del conjunto de canales -s predeterminado`

**Configurar la aplicación para validar las actualizaciones**:

Agregue esta configuración a su archivo JavaScript principal

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Luego haga una `npm run build && npx cap copy` para actualizar su aplicación

**Reciba una actualización en vivo**:

Para que su aplicación reciba una actualización en vivo de Deploy, deberá ejecutar la aplicación en un dispositivo o un emulador.La forma más sencilla de hacer esto es simplemente usar el siguiente comando para iniciar su aplicación local en un emulador o un dispositivo conectado a su computadora.

      ejecución de límite de npx [ios | androide]

Abra la aplicación, póngala en segundo plano y ábrala nuevamente. Debería ver en los registros que la aplicación realizó la actualización.

¡Felicitaciones! 🎉 Ha implementado con éxito su primera Actualización en vivo. Esto es solo el comienzo de lo que puede hacer con las Actualizaciones en vivo. Para obtener más información, consulte los [documentos de Actualizaciones en vivo] completos (https://capgoapp/docs/plugin/cloud-mode/getting -comenzó/)

## Uso de complementos de condensadores

Echemos un vistazo a cómo usar un complemento Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un complemento bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada sofisticado en el [complemento para compartir](https://capacitorjscom/docs/apis/share/), ¡pero de todos modos muestra el cuadro de diálogo nativo para compartir! Para esto ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos **pages/indexvue** a esto:

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

Como se mencionó anteriormente, al instalar nuevos complementos, debemos realizar una operación de sincronización y luego volver a implementar la aplicación en nuestro dispositivo. Para hacer esto, ejecute el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, podrás presenciar el hermoso diálogo nativo para compartir en acción!

## Opcionalmente agregando la interfaz de usuario de Konsta

Para usar Konsta UI en su aplicación Quasar, necesita tener [tailwind ya instalado](https://tailwindcsscom/docs/installation/) e instalar el paquete:

```shell
npm i konsta
```

Además, debe modificar su archivo `tailwindconfigjs`:

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

`konstaConfig` ampliará la configuración CSS predeterminada (o personalizada) de Tailwind con algunas variantes adicionales y utilidades auxiliares necesarias para la interfaz de usuario de Konsta.

Ahora necesitamos configurar el componente principal [Aplicación](https://konstauicom/vue/app/) para que podamos establecer algunos parámetros globales (como `tema`)

Necesitamos empaquetar toda la aplicación con `App` en `pages/_appvue`:

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

Ahora, cuando todo esté configurado, podemos usar los componentes de Konsta UI Vue en nuestras páginas de Quasar.

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

Si la recarga en vivo no está sincronizada después de instalar todos los componentes necesarios, intente reiniciar todo. Una vez que haya hecho eso, debería ver una aplicación móvil con un aspecto algo nativo, ¡construida con Quasar y Capacitor!


## Conclusión

Capacitor es una excelente opción para crear aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma sencilla de compartir código y mantener una interfaz de usuario consistente. 

Y con la incorporación de [Capgo](https://capgoapp/), es aún más fácil agregar actualizaciones en vivo a su aplicación, lo que garantiza que sus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Si desea aprender cómo agregar Capgo a su aplicación Nextjs, consulte el siguiente artículo: