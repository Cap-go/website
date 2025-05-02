---
slug: creando-aplicaciones-moviles-con-sveltekit-y-capacitor
title: Creando aplicaciones móviles con SvelteKit y Capacitor
description: >-
  Aprende cómo construir una aplicación móvil usando SvelteKit, Capacitor y
  mejora la interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: Ilustración de SvelteKit y Capgo
keywords: >-
  SvelteKit, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
original_slug: creating-mobile-apps-with-sveltekit-and-capacitor
---
En este tutorial, comenzaremos con una nueva aplicación de [SvelteKit](https://kit.svelte.dev/) y la transformaremos en desarrollo móvil nativo usando Capacitor. Opcionalmente, también puedes integrar [Konsta UI](https://konstaui.com/) para una interfaz móvil mejorada con Tailwind CSS.

Capacitor te permite convertir fácilmente tu aplicación web SvelteKit en una aplicación móvil nativa sin necesidad de modificaciones significativas o aprender una nueva habilidad como React Native.

Sigue esta guía paso a paso para transformar tu aplicación SvelteKit en una aplicación móvil usando Capacitor y, si lo deseas, mejorar tu interfaz móvil con Konsta UI.

## Acerca de Capacitor

¡CapacitorJS es revolucionario! Se puede integrar sin esfuerzo en cualquier proyecto web, envolviendo tu aplicación en una vista web nativa y generando proyectos nativos de Xcode y Android Studio. Sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JavaScript.

Capacitor te permite crear una fantástica aplicación móvil nativa sin ninguna configuración complicada o curva de aprendizaje pronunciada. Su API ligera y funcionalidad simplificada hacen que sea fácil integrarlo en tu proyecto. ¡Te sorprenderá lo simple que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando Tu Aplicación SvelteKit

Para crear una nueva aplicación SvelteKit, ejecuta el siguiente comando:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Después de ejecutar el comando `build`, deberías ver una nueva carpeta `dist` en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora, necesitamos configurarla correctamente.

## Añadiendo Capacitor a Tu Aplicación SvelteKit

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, necesitamos seguir algunos pasos iniciales. Después, es tan simple como ejecutar un único comando `sync`.

Primero, instala el [CLI de Capacitor](https://capacitorjs.com/docs/cli/) como dependencia de desarrollo y configúralo dentro de tu proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete.

Luego, instala el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, agrega las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de tu proyecto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

En este punto, deberías ver nuevas carpetas **ios** y **android** en tu proyecto SvelteKit.

**¡Estos son proyectos nativos reales!**

Para acceder al proyecto Android más tarde, necesitas instalar [Android Studio](https://developer.android.com/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developer.apple.com/xcode/).

Además, deberías encontrar un archivo **capacitor.config.ts** en tu proyecto, que contiene algunas configuraciones básicas de Capacitor utilizadas durante la sincronización. Lo único a lo que debes prestar atención es el **webDir**, que debe apuntar al resultado de tu comando de construcción. Actualmente, es incorrecto.

Para corregir esto, abre el archivo **capacitor.config.ts** y actualiza el **webDir**:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Ahora que hemos actualizado nuestras configuraciones de Capacitor, vamos a cambiar nuestro proyecto SvelteKit a una aplicación estática descargando el paquete adaptador estático adecuado:

```shell
npm i -D @sveltejs/adapter-static
```

Después de instalar el paquete, necesitaremos modificar el archivo _svelte.config.js_ del adaptador automático al estático:

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

Con el _svelte.config.js_ actualizado, necesitaremos agregar una opción _prerender_ creando una página _+layout.js_ en _src/routes_ y simplemente agregar la siguiente exportación a _+layout.js_:

```ts
export const prerender = true
```

Después de agregar y actualizar la página _+layout.js_, necesitaremos agregar nuestras plataformas móviles, reconstruir nuestro proyecto para crear la carpeta _build_

Puedes hacerlo ejecutando los siguientes comandos:

```shell
npm run build
npx cap sync
```

El primer comando `npm run build` construirá tu proyecto SvelteKit y copiará la construcción estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Además, el comando sync podría actualizar las plataformas nativas e instalar plugins, así que cuando instales nuevos [plugins de Capacitor](https://capacitorjs.com/docs/plugins/), es momento de ejecutar `npx cap sync` nuevamente.

Sin darte cuenta, ahora has completado el proceso, ¡así que veamos la aplicación en un dispositivo!

## Construir y Desplegar Aplicaciones Nativas

Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, necesitas inscribirte en el Programa de Desarrollador de Apple para iOS y en la Consola de Google Play para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar el CLI de Capacitor para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación a un dispositivo conectado es fácil. En Android Studio, solo necesitas esperar a que todo esté listo, y puedes desplegar tu aplicación a un dispositivo conectado sin cambiar ninguna configuración. Aquí hay un ejemplo:

![android-studio-run](/android-studio-run.webp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación a un dispositivo real en lugar de solo el simulador. Si no has hecho esto antes, Xcode te guía a través del proceso (pero nuevamente, necesitas estar inscrito en el Programa de Desarrollador). Después de eso, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí hay un ejemplo:

![xcode-run](/xcode-run.webp)

¡Felicitaciones! Has desplegado exitosamente tu aplicación web SvelteKit a un dispositivo móvil. Aquí hay un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo...

## Recarga en Vivo de Capacitor

A estas alturas, probablemente estés acostumbrado a tener recarga en caliente con todos los frameworks modernos, ¡y la buena noticia es que puedes tener la misma funcionalidad **en un dispositivo móvil** con un esfuerzo mínimo!

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

Asegúrate de usar **la IP y el puerto correctos**, como se muestra en el ejemplo anterior.

Ahora, podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copy` es similar a `sync`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes desplegar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación Svelte, **la aplicación se recargará automáticamente** y mostrará los cambios!

**Ten en cuenta** que si instalas nuevos plugins como la cámara, aún requiere una reconstrucción de tu proyecto nativo. Esto es porque los archivos nativos se cambian, y no se puede hacer sobre la marcha.

Ten en cuenta que debes usar la IP y el puerto correctos en tu configuración. El bloque de código anterior muestra el puerto predeterminado de SvelteKit con fines de demostración.

## Usando Plugins de Capacitor

Veamos cómo usar un plugin de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un plugin simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial sobre el [plugin Share](https://capacitorjs.com/docs/apis/share/), ¡pero muestra el diálogo nativo de compartir! Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` desde nuestra aplicación, así que cambiemos el **src/routes/index.svelte** a esto:

```html
<script>
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

<h1>Welcome to SvelteKit and Capacitor!</h1>
<button on:click={share}>Share now!</button>
```

Como se mencionó anteriormente, cuando instalamos nuevos plugins, necesitamos realizar una operación de sincronización y luego redesplegar la aplicación a nuestro dispositivo. Para hacer esto, ejecuta el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, puedes ver el hermoso diálogo nativo de compartir en acción!

## Añadiendo Konsta UI

Para usar Konsta UI en tu aplicación Nuxt 3, necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/guides/sveltekit/) e instalar el paquete:

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
    './src/routes/**/*.{svelte}',
    './src/components/**/*.{svelte}',
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

`konstaConfig` extenderá la configuración predeterminada (o tu configuración personalizada) de Tailwind CSS con algunas variantes extras y utilidades auxiliares requeridas para Konsta UI.

Ahora necesitamos configurar el componente principal [App](https://konstaui.com/vue/app/) para que podamos establecer algunos parámetros globales (como `theme`).

Necesitamos envolver toda la aplicación con `App` en el `src/routes/+layout.svelte`:

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### Página de Ejemplo

Ahora que todo está configurado, podemos usar los componentes Svelte de Konsta UI en nuestras páginas de SvelteKit.

Por ejemplo, vamos a abrir `src/routes/index.svelte` y cambiarlo a lo siguiente:

```html
<script>
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    Link,
    BlockTitle,
  } from 'konsta/svelte';
</script>

<Page>
  <Navbar title="My App" />

  <Block strong>
    <p>
      Here is your SvelteKit & Konsta UI app. Let's see what we have here.
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
```

Si la recarga en vivo está desincronizada después de instalar todos los componentes necesarios, intenta reiniciar todo. Una vez que hayas hecho eso, ¡deberías ver una aplicación móvil con un aspecto algo nativo, construida con SvelteKit y Capacitor!

Deberías ver la siguiente página como resultado:

<script>
  </script>
<h1>

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma simple de compartir código y mantener una interfaz de usuario consistente.

Y con la adición de [Capgo](https://capgo.app/), es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Si deseas aprender cómo agregar Capgo a tu aplicación SvelteKit, echa un vistazo al siguiente artículo:

Aprende cómo Capgo puede ayudarte a construir mejores aplicaciones más rápido, [regístrate para obtener una cuenta gratuita](/register/) hoy.
