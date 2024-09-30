---
slug: building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: Creación de aplicaciones móviles con Nuxt 3 y Capacitor.
description: >-
  Comente cree una aplicación móvil con Nuxt 3, Capacitor e implemente un
  usuario de interfaz nativo con Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 3 and Capgo illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

En este tutorial, comenzaremos con una nueva aplicación [Nuxt 3](https://nuxtjsorg/) y nos trasladaremos a nuestro país usando Capacitor y eventualmente también agregaremos [Konsta UI](https://konstauicom/) para un Tailwind mejorado. UI móvil CSS, aunque el último paso es completamente opcional

Al utilizar Capacitor, puede convertir fácilmente su aplicación web Nuxt 3 en una aplicación móvil nativa sin requerir modificaciones significativas ni aprender una nueva habilidad como React Native. 

Con sólo unos sencillos pasos, la mayoría de las aplicaciones de Nuxt 3 se pueden transformar en aplicaciones móviles. 

Este tutorial lo guiará a través del proceso, comenzando con una nueva aplicación Nuxt 3 y luego incorporando Capacitor para pasar al ámbito de las aplicaciones móviles nativas. Además, opcionalmente puede usar [Konsta UI](https://konstauicom/) para mejorar su UI móvil con Tailwind CSS

## Acerca del condensador

¡CapacitorJS realmente cambia las reglas del juego! Puede incorporarlo sin esfuerzo a cualquier proyecto web y envolverá su aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio para usted. Además, sus complementos brindan acceso a funciones nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada ni curva de aprendizaje pronunciada. Su API delgada y su funcionalidad optimizada hacen que sea muy fácil de integrar en tu proyecto. Créeme, te sorprenderá lo fácil que es lograr una aplicación móvil completa. aplicación nativa funcional con Capacitor!

## Preparando tu aplicación Nuxt 3

Para crear una nueva aplicación Nuxt 3, ejecute el siguiente comando:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Elija "Nuxt 3" cuando se le solicite la versión de Nuxt

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script sencillo en nuestro **packagejson** que se puede utilizar para compilar y copiar el proyecto Nuxt:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Después de ejecutar el comando "generar", deberías poder detectar una nueva carpeta "dist" en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora debemos configurarla correctamente.

## Agregar condensador a su aplicación Nuxt 3

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero luego es tan simple como ejecutar un único comando `sync`

En primer lugar, podemos instalar [Capacitor CLI](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puede presionar "enter" para aceptar los valores predeterminados. para nombre e ID de paquete

A continuación, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos agregar las plataformas y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

En este punto, deberías poder observar nuevas carpetas **ios** y **android** en tu proyecto Nuxt 3.

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

El primer comando `npm run generate` simplemente construirá su proyecto Nuxt 3 y copiará la compilación estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación

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

¡Felicidades! Ha implementado con éxito su aplicación web Nuxt 3 en un dispositivo móvil. Aquí hay un ejemplo:

<div class="mx-auto" style="ancho: 50%;">
  <img src="/nuxtjs-mobile-appwebp" alt="nuxtjs-mobile-app">
</div>

Pero espera, también hay una manera más rápida de hacer esto durante el desarrollo.

## Recarga en vivo del condensador

A estas alturas, probablemente ya estés acostumbrado a tener recargas en caliente con todos los frameworks modernos, y la buena noticia es que puedes tener la misma funcionalidad **en un dispositivo móvil** con un mínimo esfuerzo.

Habilite el acceso a su aplicación alojada localmente con recarga en vivo **en su red** haciendo que la aplicación Capacitor cargue el contenido desde la URL específica

El primer paso es averiguar su dirección IP local. Si está utilizando una Mac, puede averiguarlo ejecutando el siguiente comando en la terminal:

```shell
ipconfig getifaddr en0
```

En Windows, ejecute:

```shell
ipconfig
```

Luego busque la dirección IPv4

Podemos indicarle a Capacitor que cargue la aplicación directamente desde el servidor agregando otra entrada a nuestro archivo `capacitorconfigts`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Asegúrese de utilizar **la IP y el puerto correctos**. He utilizado el puerto predeterminado de Nuxt 3 en este ejemplo.

Ahora podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copiar` es similar a `sincronizar`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes implementar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación Nuxt, **la aplicación se recargará automáticamente** y mostrará los cambios.

**Tenga en cuenta** que si instala nuevos complementos, como la cámara, aún será necesario reconstruir su proyecto nativo. Esto se debe a que los archivos nativos se modifican y no se puede hacer sobre la marcha.

Tenga en cuenta que debe utilizar la IP y el puerto correctos en su configuración. El bloque de código anterior muestra el puerto Nuxt 3 predeterminado con fines de demostración.

## Uso de complementos de condensadores

Echemos un vistazo a cómo usar un complemento Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un complemento bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada sofisticado en el [complemento para compartir](https://capacitorjscom/docs/apis/share/), ¡pero de todos modos muestra el cuadro de diálogo nativo para compartir! Para esto ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos **pages/indexvue** a esto:

```html
<template>
  <div>
    <h1>Welcome to Nuxt 3 and Capacitor!</h1>
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

Como se mencionó anteriormente, al instalar nuevos complementos, debemos realizar una operación de sincronización y luego volver a implementar la aplicación en nuestro dispositivo.Para hacer esto, ejecute el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, podrás presenciar el hermoso diálogo nativo para compartir en acción!

## Agregar interfaz de usuario de Konsta

Para usar Konsta UI en su aplicación Nuxt 3, necesita tener [tailwind ya instalado](https://tailwindcsscom/docs/guides/nuxtjs/) e instalar el paquete:

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
    <Nuxt />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Página de ejemplo

Ahora, cuando todo esté configurado, podemos usar los componentes de Konsta UI Vue en nuestras páginas de Nuxt 3.

Por ejemplo, abramos `pages/indexvue` y cambiémoslo a lo siguiente:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 3 & Konsta UI app. Let's see what we have here.
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

Si la recarga en vivo no está sincronizada después de instalar todos los componentes necesarios, intente reiniciar todo. Una vez que haya hecho eso, debería ver una aplicación móvil con un aspecto algo nativo, construida con Nuxt 3 y Capacitor.

Como resultado, debería ver la siguiente página:

<div class="mx-auto" style="ancho: 50%;">
  <img src="/konsta-nuxtwebp" alt="konsta-nuxt">
</div>

## Conclusión

Capacitor es una excelente opción para crear aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma sencilla de compartir código y mantener una interfaz de usuario consistente. 

Y con la incorporación de [Capgo](https://capgoapp/), es aún más fácil agregar actualizaciones en vivo a su aplicación, lo que garantiza que sus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Si desea aprender cómo agregar Capgo a su aplicación Nextjs, consulte el siguiente artículo:

## Créditos

Muchas gracias a Simon, este artículo está basado en [este artículo](https://devdacticcom/nextjs-and-capacitor/) reescrito para nuxt3 con chat-gpt-4 y adaptado