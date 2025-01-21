---
slug: es__angular-mobile-app-capacitor
title: Desarrollar aplicaciones móviles con Angular y Capacitor
description: >-
  Descubra cómo crear una aplicación móvil con Angular y Capacitor y mejorar la
  interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Ilustración de Angular y Capacitor
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

En este tutorial, comenzaremos con una nueva aplicación de [Angular](https://angulario/) y haremos la transición al ámbito de las aplicaciones móviles nativas utilizando Capacitor. Opcionalmente, también puedes añadir [Konsta UI](https://konstauicom/) para mejorar la interfaz de usuario móvil con Tailwind CSS.

Capacitor te permite convertir fácilmente tu aplicación web de Angular en una aplicación móvil nativa sin requerir modificaciones significativas o aprender una nueva habilidad como React Native.

Con solo unos pocos pasos simples, la mayoría de las aplicaciones de Angular pueden transformarse en aplicaciones móviles.

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación de Angular y luego incorporando Capacitor para entrar en el ámbito de las aplicaciones móviles nativas. Además, opcionalmente puedes usar [Konsta UI](https://konstauicom/) para mejorar tu interfaz de usuario móvil con Tailwind CSS.

## Acerca de Capacitor

¡Capacitor es un cambio de juego! Puedes incorporarlo sin esfuerzo en cualquier proyecto web, y envolverá tu aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio por ti. Además, sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada o curva de aprendizaje empinada. Su API esbelta y funcionalidad simplificada hacen que sea muy fácil integrarlo en tu proyecto. ¡Créeme, te sorprenderá lo sencillo que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando tu aplicación Angular

Para crear una nueva aplicación Angular, ejecuta el siguiente comando:

```shell
ng new my-app
cd my-app
```

Elige "Angular" cuando se te pida la versión de Angular.

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script sencillo en nuestro **packagejson** que pueda utilizarse para construir y copiar el proyecto Angular:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Después de ejecutar el comando `build`, deberías poder ver una nueva carpeta `dist` en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora, debemos configurarla correctamente.

## Añadiendo Capacitor a tu aplicación Angular

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero después es tan simple como ejecutar un solo comando `sync`.

Primero, podemos instalar el [CLI de Capacitor](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo, y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete.

Luego, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos añadir las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Angular project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

En este punto, deberías poder observar nuevas carpetas **ios** y **android** en tu proyecto Angular.

**¡Esos son proyectos nativos reales!**

Para acceder al proyecto de Android más tarde, debes instalar [Android Studio](https://developerandroidcom/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developerapplecom/xcode/).

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
npm run build
npx cap sync
```

El primer comando `npm run build` simplemente construirá tu proyecto Angular y copiará la construcción estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Además, el comando sync podría actualizar las plataformas nativas e instalar plugins, por lo que cuando instales nuevos [plugins de Capacitor](https://capacitorjscom/docs/plugins/) es momento de ejecutar `npx cap sync` nuevamente.Sin darte cuenta, ahora has terminado, ¡así que veamos la aplicación en un dispositivo!

## Construir y desplegar aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, debes inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Google Play Console para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar la CLI de Capacitor para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación en un dispositivo conectado es fácil. En Android Studio, solo necesitas esperar a que todo esté listo, y puedes desplegar tu aplicación en un dispositivo conectado sin cambiar ninguna configuración. Aquí tienes un ejemplo:

![android-studio-run](/android-studio-run.webp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo en el simulador. Si no lo has hecho antes, Xcode te guiará a través del proceso (pero de nuevo, debes estar inscrito en el Programa de Desarrolladores). Posteriormente, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí tienes un ejemplo:

![xcode-run](/xcode-run.webp)

¡Felicidades! Has desplegado exitosamente tu aplicación web Angular en un dispositivo móvil. Aquí tienes un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo.

## Recarga en vivo de Capacitor

A estas alturas, probablemente estés acostumbrado a tener recarga en caliente con todos los frameworks modernos, ¡y la buena noticia es que puedes tener la misma funcionalidad **en un dispositivo móvil** con un esfuerzo mínimo!

Habilita el acceso a tu aplicación alojada localmente con recarga en vivo **en tu red** haciendo que la aplicación Capacitor cargue el contenido desde la URL específica.

El primer paso es averiguar tu dirección IP local. Si estás usando un Mac, puedes averiguarlo ejecutando el siguiente comando en la terminal:

```shell
ipconfig getifaddr en0
```

En Windows, ejecuta:

```shell
ipconfig
```

Luego busca la dirección IPv4.

Podemos instruir a Capacitor para que cargue la aplicación directamente desde el servidor añadiendo otra entrada a nuestro archivo `capacitor.config.ts`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

Asegúrate de usar **la IP y el puerto correctos**, he usado el puerto predeterminado de Angular en este ejemplo.

Ahora, podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copy` es similar a `sync`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes desplegar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación Angular, **la aplicación se recargará automáticamente** y mostrará los cambios.

**Ten en cuenta** que si instalas nuevos plugins como la cámara, aún requiere una reconstrucción de tu proyecto nativo. Esto se debe a que se cambian archivos nativos, y no se puede hacer sobre la marcha.

Ten en cuenta que debes usar la IP y el puerto correctos en tu configuración. El bloque de código anterior muestra el puerto predeterminado de Angular con fines de demostración.

## Usando plugins de Capacitor

Echemos un vistazo a cómo usar un plugin de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un plugin bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial en el [plugin Share](https://capacitorjs.com/docs/apis/share/), ¡pero de todos modos abre el diálogo de compartir nativo! Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos el **src/app/app.component.ts** a esto:

```typescript
import { Component } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  async share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
}
```

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego volver a desplegar la aplicación en nuestro dispositivo.Para hacer esto, ejecuta el siguiente comando:

```
npx cap sync
```

Después de pulsar el botón, ¡podrás ver en acción el hermoso diálogo nativo de compartir!

## Añadiendo Konsta UI

Para usar Konsta UI en tu aplicación Nuxt 3, necesitas tener [tailwind ya instalado](https://tailwindcsscom/docs/guides/angular/) y instalar el paquete:

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
    './src/**/*.{html,ts}',
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

`konstaConfig` extenderá la configuración predeterminada (o tu configuración personalizada) de Tailwind CSS con algunas variantes adicionales y utilidades auxiliares requeridas para Konsta UI

Ahora necesitamos configurar el componente principal [App](https://konstauicom/vue/app/) para que podamos establecer algunos parámetros globales (como `theme`)

Necesitamos envolver toda la aplicación con `App` en el `src/app/appcomponenthtml`:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Página de ejemplo

Ahora que todo está configurado, podemos usar los componentes Vue de Konsta UI en nuestras páginas de Angular

Por ejemplo, abramos `src/app/appcomponenthtml` y cambiémoslo a lo siguiente:

```html
<app>
  <page>
    <navbar title="My App" />

    <block strong>
      <p>
        Here is your Angular & Konsta UI app. Let's see what we have here.
      </p>
    </block>
    <block-title>Navigation</block-title>
    <list>
      <list-item href="/about/" title="About" />
      <list-item href="/form/" title="Form" />
    </list>

    <block strong class="flex space-x-4">
      <button>Button 1</button>
      <button>Button 2</button>
    </block>
  </page>
</app>
```

Si la recarga en vivo está desincronizada después de instalar todos los componentes necesarios, intenta reiniciar todo. Una vez que hayas hecho eso, ¡deberías ver una aplicación móvil con un aspecto algo nativo, construida con Angular y Capacitor!

Deberías ver la siguiente página como resultado:

<app>
  <h1>
</h1>

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma sencilla de compartir código y mantener una interfaz de usuario consistente.

Y con la adición de [Capgo](https://capgoapp/), es aún más fácil añadir actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Si quieres aprender cómo añadir Capgo a tu aplicación Angular, echa un vistazo al siguiente artículo: