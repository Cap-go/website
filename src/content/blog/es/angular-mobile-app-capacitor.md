---
slug: angular-mobile-app-capacitor
title: Creando Aplicaciones Móviles con Angular y Capacitor
description: >-
  Aprende cómo crear una aplicación móvil con Angular, Capacitor y mejora la
  interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Ilustración de Angular y Capacitor
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
En este tutorial, comenzaremos con una nueva aplicación de [Angular](https://angular.io/) y la transformaremos en una aplicación móvil nativa usando Capacitor. Opcionalmente, también puedes agregar [Konsta UI](https://konstaui.com/) para mejorar la interfaz móvil con Tailwind CSS.

Capacitor te permite convertir fácilmente tu aplicación web de Angular en una aplicación móvil nativa sin requerir modificaciones significativas o aprender una nueva habilidad como React Native.

Con solo unos pocos pasos simples, la mayoría de las aplicaciones Angular pueden transformarse en aplicaciones móviles.

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación Angular y luego incorporando Capacitor para pasar al ámbito de las aplicaciones móviles nativas. Adicionalmente, puedes usar opcionalmente [Konsta UI](https://konstaui.com/) para mejorar tu interfaz móvil con Tailwind CSS.

## Acerca de Capacitor

¡CapacitorJS es revolucionario! Puedes incorporarlo sin esfuerzo en cualquier proyecto web, y envolverá tu aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio por ti. Además, sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada o curva de aprendizaje pronunciada. Su API ligera y funcionalidad optimizada hacen que sea muy fácil integrarlo en tu proyecto. ¡Confía en mí, te sorprenderá lo sencillo que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando Tu Aplicación Angular

Para crear una nueva aplicación Angular, ejecuta el siguiente comando:

```shell
ng new my-app
cd my-app
```

Elige "Angular" cuando se te solicite la versión de Angular.

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script simple en nuestro **package.json** que puede ser utilizado para construir y copiar el proyecto Angular:

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

## Agregando Capacitor a Tu Aplicación Angular

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero después es tan simple como ejecutar un único comando `sync`.

Primero, podemos instalar el [Capacitor CLI](https://capacitorjs.com/docs/cli/) como dependencia de desarrollo, y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete.

Luego, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos agregar las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

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

A estas alturas, deberías poder ver nuevas carpetas **ios** y **android** en tu proyecto Angular.

**¡Esos son proyectos nativos reales!**

Para acceder al proyecto Android más tarde, debes instalar [Android Studio](https://developer.android.com/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developer.apple.com/xcode/).

Además, deberías encontrar un archivo **capacitor.config.ts** en tu proyecto, que contiene algunas configuraciones fundamentales de Capacitor utilizadas durante la sincronización. Lo único a lo que debes prestar atención es el **webDir**, que debe apuntar al resultado de tu comando de construcción. Actualmente, es incorrecto.

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
npm run build
npx cap sync
```

El primer comando `npm run build` simplemente construirá tu proyecto Angular y copiará la build estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Adicionalmente, el comando sync podría actualizar las plataformas nativas e instalar plugins, así que cuando instales nuevos [plugins de Capacitor](https://capacitorjs.com/docs/plugins/) es momento de ejecutar `npx cap sync` nuevamente.

Sin darte cuenta, ahora ya has terminado, ¡así que veamos la aplicación en un dispositivo!

## Construir y Desplegar aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, debes inscribirte en el Programa de Desarrollador de Apple para iOS y en la Google Play Console para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar la CLI de Capacitor para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación a un dispositivo conectado es sencillo. En Android Studio, solo necesitas esperar a que todo esté listo y puedes desplegar tu aplicación a un dispositivo conectado sin cambiar ninguna configuración. Aquí un ejemplo:

![android-studio-run](/android-studio-run.webp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación a un dispositivo real en lugar de solo el simulador. Si no has hecho esto antes, Xcode te guiará a través del proceso (pero nuevamente, debes estar inscrito en el Programa de Desarrollador). Posteriormente, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí un ejemplo:

![xcode-run](/xcode-run.webp)

¡Felicitaciones! Has desplegado exitosamente tu aplicación web Angular a un dispositivo móvil. Aquí un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo...

## Recarga en vivo de Capacitor

Para este momento, probablemente estés acostumbrado a tener recarga en caliente con todos los frameworks modernos, y las buenas noticias son que ¡puedes tener la misma funcionalidad **en un dispositivo móvil** con un mínimo esfuerzo!

Habilita el acceso a tu aplicación alojada localmente con recarga en vivo **en tu red** haciendo que la aplicación Capacitor cargue el contenido desde la URL específica.

El primer paso es averiguar tu dirección IP local. Si estás usando Mac, puedes averiguar esto ejecutando el siguiente comando en la terminal:

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
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

Asegúrate de usar **el IP y puerto correctos**, he usado el puerto predeterminado de Angular en este ejemplo.

Ahora, podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copy` es similar a `sync`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes desplegar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación Angular, **la aplicación se recargará automáticamente** y mostrará los cambios!

**Ten en cuenta** que si instalas nuevos plugins como la cámara, aún requiere una reconstrucción de tu proyecto nativo. Esto es porque los archivos nativos se modifican y no se puede hacer sobre la marcha.

Tenga en cuenta que debe usar la IP y el puerto correctos en su configuración. El bloque de código anterior muestra el puerto predeterminado de Angular con fines de demostración.

## Usando Plugins de Capacitor

Veamos cómo usar un plugin de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un plugin bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial sobre el [plugin Share](https://capacitorjs.com/docs/apis/share/), ¡pero de todos modos muestra el diálogo nativo de compartir! Para esto ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos el **src/app/app.component.ts** a esto:

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

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego volver a implementar la aplicación en nuestro dispositivo. Para hacer esto, ejecute el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, puedes ver el hermoso diálogo nativo de compartir en acción!

## Añadiendo Konsta UI

Para usar Konsta UI en tu aplicación Nuxt 3, necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/guides/angular/) y instalar el paquete:

```shell
npm i konsta
```

Adicionalmente, necesitas modificar tu archivo `tailwind.config.js`:

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

`konstaConfig` extenderá la configuración predeterminada (o tu configuración personalizada) de Tailwind CSS con algunas variantes adicionales y utilidades auxiliares requeridas para Konsta UI.

Ahora necesitamos configurar el componente principal [App](https://konstaui.com/vue/app/) para que podamos establecer algunos parámetros globales (como `theme`).

Necesitamos envolver toda la aplicación con `App` en el `src/app/app.component.html`:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Página de Ejemplo

Ahora que todo está configurado, podemos usar los componentes Vue de Konsta UI en nuestras páginas de Angular.

Por ejemplo, abramos `src/app/app.component.html` y cambiémoslo a lo siguiente:

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

Si la recarga en vivo está desincronizada después de instalar todos los componentes necesarios, intente reiniciar todo. Una vez hecho esto, ¡deberías ver una aplicación móvil con un aspecto algo nativo, construida con Angular y Capacitor!

Deberías ver la siguiente página como resultado:

<app>
  <h1>
</h1>

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una manera simple de compartir código y mantener una interfaz de usuario consistente.

Y con la adición de [Capgo](https://capgo.app/), es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Si deseas aprender cómo agregar Capgo a tu aplicación Angular, echa un vistazo al siguiente artículo:
