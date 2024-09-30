---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: Creación de aplicaciones móviles con SvelteKit y Capacitor
description: >-
  Aprenda a crear una aplicación móvil utilizando SvelteKit, Capacitor y mejore
  la interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: SvelteKit and Capgo illustration
tag: Tutorial
published: true
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
locale: es
---

En este tutorial, comenzaremos con una nueva aplicación [SvelteKit](https://kitsveltedev/) y realizaremos la transición al desarrollo móvil nativo usando Capacitor. Opcionalmente, también puede integrar [Konsta UI](https://konstauicom/) para una interfaz de usuario móvil Tailwind CSS mejorada

Capacitor le permite convertir fácilmente su aplicación web SvelteKit en una aplicación móvil nativa sin la necesidad de realizar modificaciones significativas o aprender una nueva habilidad como React Native.

Siga esta guía paso a paso para transformar su aplicación SvelteKit en una aplicación móvil usando Capacitor y, si lo desea, mejore su interfaz de usuario móvil con Konsta UI.

## Acerca del condensador

¡CapacitorJS cambia las reglas del juego! Se puede integrar sin esfuerzo en cualquier proyecto web, envolviendo su aplicación en una vista web nativa y generando proyectos nativos de Xcode y Android Studio para usted. Sus complementos brindan acceso a funciones nativas del dispositivo, como la cámara, a través de un puente de JavaScript.

Capacitor le permite crear una aplicación móvil nativa fantástica sin ninguna configuración complicada ni curva de aprendizaje pronunciada. Su API delgada y su funcionalidad optimizada facilitan la integración en su proyecto. Se sorprenderá de lo simple que es lograr una aplicación nativa completamente funcional con ¡Condensador!

## Preparando tu aplicación SvelteKit

Para crear una nueva aplicación SvelteKit, ejecute el siguiente comando:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Después de ejecutar el comando `build`, deberías ver una nueva carpeta `dist` en la raíz de tu proyecto

Capacitor utilizará esta carpeta más adelante, pero por ahora, debemos configurarla correctamente.

## Agregar condensador a su aplicación SvelteKit

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales. Después, es tan simple como ejecutar un único comando `sync`

Primero, instale [Capacitor CLI](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo y configúrelo dentro de su proyecto. Durante la instalación, puede presionar "enter" para aceptar los valores predeterminados para el nombre y el paquete. IDENTIFICACIÓN

A continuación, instale el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, agregue las plataformas y Capacitor creará carpetas para cada plataforma en la raíz de su proyecto:

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

Para acceder al proyecto de Android más adelante, necesita instalar [Android Studio](https://developerandroidcom/studio/) Para iOS, necesita una Mac y debe instalar [Xcode](https://developerapplecom/xcode/)

Además, debería encontrar un archivo **capacitorconfigts** en su proyecto, que contiene algunas configuraciones básicas de Capacitor utilizadas durante la sincronización. Lo único a lo que debe prestar atención es al **webDir**, que debe apuntar al resultado de su comando de compilación actualmente, es incorrecto

Para solucionar este problema, abra el archivo **capacitorconfigts** y actualice **webDir**:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```
Ahora que hemos actualizado la configuración de nuestro Capacitor, cambiemos el proyecto Sveltekit a una aplicación estática descargando el paquete de adaptador estático adecuado:

```shell
npm i -D @sveltejs/adapter-static
```

Después de instalar el paquete, necesitaremos modificar el archivo _svelteconfigjs_ del adaptador automático a estático:

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

Con _svelteconfigjs_ actualizado, necesitaremos agregar una opción _prerender_ creando una página _+layoutjs_ en _src/routes_ y simplemente agregar la siguiente exportación a _+layoutjs_:

```ts
export const prerender = true
```

Después de agregar y actualizar la página _+layoutjs_, necesitaremos agregar nuestras plataformas móviles, reconstruir nuestro proyecto para crear la carpeta _build_

Puedes hacerlo ejecutando los siguientes comandos:

```shell
npm run build
npx cap sync
```

El primer comando `npm run build` construirá su proyecto SvelteKit y copiará la compilación estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Además, el comando de sincronización puede actualizar las plataformas nativas e instalar complementos, por lo que cuando instale nuevos [complementos de condensadores] (https://capacitorjscom/docs/plugins/), es hora de ejecutar `npx cap sync` nuevamenteSin darte cuenta, ya has completado el proceso, ¡así que veamos la aplicación en un dispositivo!

## Cree e implemente aplicaciones nativas

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

¡Felicidades! Ha implementado con éxito su aplicación web SvelteKit en un dispositivo móvil. Aquí hay un ejemplo:

<div class="mx-auto" style="ancho: 50%;">
  <img src="/sveltekit-mobile-appwebp" alt="sveltekit-mobile-app">
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

Asegúrese de utilizar **la IP y el puerto correctos**, como se muestra en el ejemplo anterior.

Ahora podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copiar` es similar a `sincronizar`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes implementar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación Svelte, **la aplicación se recargará automáticamente** y mostrará los cambios.

**Tenga en cuenta** que si instala nuevos complementos, como la cámara, aún será necesario reconstruir su proyecto nativo. Esto se debe a que los archivos nativos se modifican y no se puede hacer sobre la marcha.

Tenga en cuenta que debe utilizar la IP y el puerto correctos en su configuración. El bloque de código anterior muestra el puerto predeterminado de SvelteKit con fines de demostración.

## Uso de complementos de condensadores

Echemos un vistazo a cómo usar un complemento de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un complemento simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada sofisticado en el [complemento para compartir](https://capacitorjscom/docs/apis/share/), ¡pero muestra el cuadro de diálogo para compartir nativo! Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` desde nuestra aplicación, así que cambiemos **src/routes/indexsvelte** a esto:

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

Como se mencionó anteriormente, al instalar nuevos complementos, debemos realizar una operación de sincronización y luego volver a implementar la aplicación en nuestro dispositivo.Para hacer esto, ejecute el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, podrás presenciar el hermoso diálogo nativo para compartir en acción!

## Agregar interfaz de usuario de Konsta

Para usar Konsta UI en su aplicación Nuxt 3, necesita tener [tailwind ya instalado](https://tailwindcsscom/docs/guides/sveltekit/) e instalar el paquete:

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

`konstaConfig` ampliará la configuración CSS predeterminada (o personalizada) de Tailwind con algunas variantes adicionales y utilidades auxiliares necesarias para la interfaz de usuario de Konsta.

Ahora necesitamos configurar el componente principal [Aplicación](https://konstauicom/vue/app/) para que podamos establecer algunos parámetros globales (como `tema`)

Necesitamos empaquetar toda la aplicación con `App` en `src/routes/+layoutsvelte`:

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### Página de ejemplo

Ahora, cuando todo esté configurado, podemos usar los componentes Konsta UI Svelte en nuestras páginas SvelteKit.

Por ejemplo, abramos `src/routes/indexsvelte` y cambiémoslo a lo siguiente:

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

Si la recarga en vivo no está sincronizada después de instalar todos los componentes necesarios, intente reiniciar todo. Una vez que haya hecho eso, debería ver una aplicación móvil con una apariencia algo nativa, construida con SvelteKit y Capacitor.

Como resultado, debería ver la siguiente página:

<div class="mx-auto" style="ancho: 50%;">
  <img src="/konsta-sveltekitwebp" alt="konsta-sveltekit">
</div>

## Conclusión

Capacitor es una excelente opción para crear aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma sencilla de compartir código y mantener una interfaz de usuario consistente.

Y con la incorporación de [Capgo](https://capgoapp/), es aún más fácil agregar actualizaciones en vivo a su aplicación, lo que garantiza que sus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Si desea aprender cómo agregar Capgo a su aplicación SvelteKit, consulte el siguiente artículo:

Descubra cómo Capgo puede ayudarle a crear mejores aplicaciones más rápido [regístrese para obtener una cuenta gratuita](/regístrese/) hoy