---
slug: es__building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: Crear aplicaciones móviles con Nuxt 3 y Capacitor
description: >-
  Cómo crear una aplicación móvil con Nuxt 3, Capacitor e implementar una
  interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Ilustración de Nuxt 3 y Capgo
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

En este tutorial, comenzaremos con una nueva aplicación de [Nuxt 3](https://nuxtjsorg/) y nos adentraremos en el terreno nativo utilizando Capacitor y, finalmente, también agregaremos [Konsta UI](https://konstauicom/) para una mejor interfaz de usuario móvil con Tailwind CSS, aunque este último paso es completamente opcional.

Al utilizar Capacitor, puedes convertir fácilmente tu aplicación web Nuxt 3 en una aplicación móvil nativa sin requerir modificaciones significativas o aprender una nueva habilidad como React Native.

Con solo unos pocos pasos simples, la mayoría de las aplicaciones Nuxt 3 pueden transformarse en aplicaciones móviles.

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación Nuxt 3 y luego incorporando Capacitor para adentrarnos en el ámbito de las aplicaciones móviles nativas. Adicionalmente, puedes usar opcionalmente [Konsta UI](https://konstauicom/) para mejorar tu interfaz de usuario móvil con Tailwind CSS.

## Acerca de Capacitor

CapacitorJS es realmente un cambio de juego. Puedes incorporarlo sin esfuerzo en cualquier proyecto web, y envolverá tu aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio por ti. Además, sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada o curva de aprendizaje pronunciada. Su API delgada y funcionalidad simplificada lo hacen muy fácil de integrar en tu proyecto. ¡Confía en mí, te sorprenderá lo sencillo que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando tu aplicación Nuxt 3

Para crear una nueva aplicación Nuxt 3, ejecuta el siguiente comando:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Elige "Nuxt 3" cuando se te solicite la versión de Nuxt.

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script sencillo en nuestro **packagejson** que pueda utilizarse para construir y copiar el proyecto Nuxt:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Después de ejecutar el comando `generate`, deberías poder ver una nueva carpeta `dist` en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora, debemos configurarla correctamente.

## Añadiendo Capacitor a tu aplicación Nuxt 3

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero después es tan simple como ejecutar un solo comando `sync`.

Primero, podemos instalar el [CLI de Capacitor](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo, y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete.

A continuación, necesitamos instalar el paquete core y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos añadir las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

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

Para acceder al proyecto de Android más adelante, debes instalar [Android Studio](https://developerandroidcom/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developerapplecom/xcode/).

Además, deberías encontrar un archivo **capacitorconfigts** en tu proyecto, que contiene algunas configuraciones fundamentales de Capacitor utilizadas durante la sincronización. Lo único a lo que debes prestar atención es el **webDir**, que debe apuntar al resultado de tu comando de construcción. Actualmente, es inexacto.

Para rectificar esto, abre el archivo **capacitorconfigjson** y actualiza el **webDir**:

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

El primer comando `npm run generate` simplemente construirá tu proyecto Nuxt 3 y copiará la construcción estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Además, el comando sync podría actualizar las plataformas nativas e instalar plugins, así que cuando instales nuevos [plugins de Capacitor](https://capacitorjscom/docs/plugins/) es momento de ejecutar `npx cap sync` nuevamente.Sin darte cuenta, ya has terminado, así que ¡veamos la aplicación en un dispositivo!

## Compilar y desplegar aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, debes inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Google Play Console para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar la CLI de Capacitor para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación en un dispositivo conectado es fácil. En Android Studio, solo necesitas esperar a que todo esté listo, y puedes desplegar tu aplicación en un dispositivo conectado sin cambiar ninguna configuración. Aquí tienes un ejemplo:

![android-studio-run](/android-studio-run.webp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo el simulador. Si no has hecho esto antes, Xcode te guiará a través del proceso (pero de nuevo, necesitas estar inscrito en el Programa de Desarrolladores). Después de eso, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí tienes un ejemplo:

![xcode-run](/xcode-run.webp)

¡Felicidades! Has desplegado exitosamente tu aplicación web Nuxt 3 en un dispositivo móvil. Aquí tienes un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo.

## Recarga en vivo de Capacitor

A estas alturas, probablemente estés acostumbrado a tener recarga en caliente con todos los frameworks modernos, y la buena noticia es que puedes tener la misma funcionalidad **en un dispositivo móvil** ¡con un esfuerzo mínimo!

Habilita el acceso a tu aplicación alojada localmente con recarga en vivo **en tu red** haciendo que la aplicación Capacitor cargue el contenido desde la URL específica.

El primer paso es averiguar tu dirección IP local. Si estás usando una Mac, puedes averiguarlo ejecutando el siguiente comando en la terminal:

```shell
ipconfig getifaddr en0
```

En Windows, ejecuta:

```shell
ipconfig
```

Luego busca la dirección IPv4.

Podemos instruir a Capacitor para que cargue la aplicación directamente desde el servidor agregando otra entrada a nuestro archivo `capacitor.config.ts`:

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

Asegúrate de usar **la IP y el puerto correctos**, he usado el puerto predeterminado de Nuxt 3 en este ejemplo.

Ahora, podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copy` es similar a `sync`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes desplegar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación Nuxt, **la aplicación se recargará automáticamente** y mostrará los cambios.

**Ten en cuenta** que si instalas nuevos plugins como la cámara, aún requiere una reconstrucción de tu proyecto nativo. Esto se debe a que se cambian archivos nativos, y no se puede hacer sobre la marcha.

Ten en cuenta que debes usar la IP y el puerto correctos en tu configuración. El bloque de código anterior muestra el puerto predeterminado de Nuxt 3 con fines de demostración.

## Usando plugins de Capacitor

Veamos cómo usar un plugin de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un plugin bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial en el [plugin Share](https://capacitorjs.com/docs/apis/share/), ¡pero de todos modos muestra el diálogo de compartir nativo! Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos el **pages/index.vue** a esto:

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

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego volver a desplegar la aplicación en nuestro dispositivo.Para hacer esto, ejecuta el siguiente comando:

```
npx cap sync
```

Después de presionar el botón, ¡podrás ver en acción el hermoso diálogo nativo de compartir!

## Agregando Konsta UI

Para usar Konsta UI en tu aplicación Nuxt 3, necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/guides/nuxtjs/) y instalar el paquete:

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

`konstaConfig` extenderá la configuración predeterminada (o tu configuración personalizada) de Tailwind CSS con algunas variantes adicionales y utilidades auxiliares requeridas para Konsta UI.

Ahora necesitamos configurar el componente principal [App](https://konsta-ui.com/vue/app/) para que podamos establecer algunos parámetros globales (como `theme`).

Necesitamos envolver toda la aplicación con `App` en el archivo `pages/_app.vue`:

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

Ahora que todo está configurado, podemos usar los componentes Vue de Konsta UI en nuestras páginas de Nuxt 3.

Por ejemplo, abrimos `pages/index.vue` y lo cambiamos a lo siguiente:

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

Si la recarga en vivo está desincronizada después de instalar todos los componentes necesarios, intenta reiniciar todo. Una vez que hayas hecho eso, ¡deberías ver una aplicación móvil con un aspecto algo nativo, construida con Nuxt 3 y Capacitor!

Deberías ver la siguiente página como resultado:

<template>
  <div>
<h1>

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma simple de compartir código y mantener una interfaz de usuario consistente.

Y con la adición de [Capgo](https://capgo.app/), es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Si quieres aprender cómo agregar Capgo a tu aplicación Nextjs, echa un vistazo al siguiente artículo:

## Créditos

Muchas gracias a Simon, este artículo está basado en [este artículo](https://devdactic.com/nextjs-and-capacitor/) reescrito para nuxt3 con chat-gpt-4 y adaptado.