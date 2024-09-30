---
slug: angular-mobile-app-capacitor
title: Création d'applications mobiles avec Angular et Capacitor
description: >-
  Aprenda a crear una aplicación móvil con Angular, Capacitor y mejore la
  interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Angular and Capacitor illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

En este tutorial, comenzaremos con una nueva aplicación [Angular](https://angulario/) y pasaremos al ámbito de la aplicación móvil nativa usando Capacitor. Opcionalmente, también puedes agregar [Konsta UI](https://konstauicom/ ) para una interfaz de usuario móvil mejorada con Tailwind CSS

Capacitor le permite convertir fácilmente su aplicación web Angular en una aplicación móvil nativa sin requerir modificaciones significativas ni aprender una nueva habilidad como React Native.

Con solo unos sencillos pasos, la mayoría de las aplicaciones de Angular se pueden transformar en aplicaciones móviles.

Este tutorial lo guiará a través del proceso, comenzando con una nueva aplicación Angular y luego incorporando Capacitor para pasar al ámbito de las aplicaciones móviles nativas. Además, opcionalmente puede usar [Konsta UI](https://konstauicom/) para mejorar su dispositivo móvil. Interfaz de usuario con Tailwind CSS

## Acerca del condensador

¡CapacitorJS cambia las reglas del juego! Puede incorporarlo sin esfuerzo en cualquier proyecto web y envolverá su aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio para usted. Además, sus complementos brindan acceso a funciones nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada ni curva de aprendizaje pronunciada. Su API delgada y su funcionalidad optimizada hacen que sea muy fácil de integrar en tu proyecto. Créeme, te sorprenderá lo fácil que es lograr una aplicación móvil completa. aplicación nativa funcional con Capacitor!

## Preparando tu aplicación angular

Para crear una nueva aplicación Angular, ejecute el siguiente comando:

```shell
ng new my-app
cd my-app
```

Elija "Angular" cuando se le solicite la versión Angular

Para crear una aplicación móvil nativa, requerimos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script sencillo en nuestro **packagejson** que se puede utilizar para compilar y copiar el proyecto Angular:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Después de ejecutar el comando `build`, deberías poder detectar una nueva carpeta `dist` en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora debemos configurarla correctamente.

## Agregar condensador a su aplicación angular

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero luego es tan simple como ejecutar un único comando `sync`

En primer lugar, podemos instalar [Capacitor CLI](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puede presionar "enter" para aceptar los valores predeterminados. para nombre e ID de paquete

A continuación, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos agregar las plataformas y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

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

En este punto, debería poder observar nuevas carpetas **ios** y **android** en su proyecto Angular.

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
npm run build
npx cap sync
```

El primer comando `npm run build` simplemente construirá su proyecto Angular y copiará la compilación estática, mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en un aplicación

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

En Xcode, debes configurar tu cuenta de firma para implementar tu aplicación en un dispositivo real en lugar de solo en el simulador. Si no has hecho esto antes, Xcode te guía a través del proceso (pero nuevamente, debes estar inscrito en la página de desarrollador). Programa) Posteriormente, simplemente puede presionar reproducir para ejecutar la aplicación en su dispositivo conectado, que puede seleccionar en la parte superior. Aquí hay un ejemplo:

![xcode-ejecutar](/xcode-runwebp)

¡Felicidades! Ha implementado con éxito su aplicación web Angular en un dispositivo móvil. Aquí hay un ejemplo:

<div class="mx-auto" style="ancho: 50%;">
  <img src="/nextjs-mobile-appwebp" alt="angular-mobile-app">
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
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

Asegúrese de usar **la IP y el puerto correctos**. He usado el puerto Angular predeterminado en este ejemplo.

Ahora podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copiar` es similar a `sincronizar`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes implementar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación Angular, **la aplicación se recargará automáticamente** y mostrará los cambios.

**Tenga en cuenta** que si instala nuevos complementos, como la cámara, aún será necesario reconstruir su proyecto nativo. Esto se debe a que los archivos nativos se modifican y no se puede hacer sobre la marcha.

Tenga en cuenta que debe utilizar la IP y el puerto correctos en su configuración. El bloque de código anterior muestra el puerto Angular predeterminado con fines de demostración.

## Uso de complementos de condensadores

Echemos un vistazo a cómo usar un complemento Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un complemento bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada sofisticado en el [complemento para compartir](https://capacitorjscom/docs/apis/share/), ¡pero de todos modos muestra el cuadro de diálogo nativo para compartir! Para esto ahora solo necesitamos importar el paquete y llamar a la función `share()` correspondiente desde nuestra aplicación, así que cambiemos **src/app/appcomponentts** a esto:

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

Como se mencionó anteriormente, al instalar nuevos complementos, debemos realizar una operación de sincronización y luego volver a implementar la aplicación en nuestro dispositivo.Para hacer esto, ejecute el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, podrás presenciar el hermoso diálogo nativo para compartir en acción!

## Agregar interfaz de usuario de Konsta

Para usar Konsta UI en su aplicación Nuxt 3, necesita tener [tailwind ya instalado](https://tailwindcsscom/docs/guides/angular/) e instalar el paquete:

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

`konstaConfig` ampliará la configuración CSS predeterminada (o personalizada) de Tailwind con algunas variantes adicionales y utilidades auxiliares necesarias para la interfaz de usuario de Konsta.

Ahora necesitamos configurar el componente principal [Aplicación](https://konstauicom/vue/app/) para que podamos establecer algunos parámetros globales (como `tema`)

Necesitamos empaquetar toda la aplicación con `App` en `src/app/appcomponenthtml`:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Página de ejemplo

Ahora, cuando todo esté configurado, podemos usar los componentes Konsta UI Vue en nuestras páginas Angular.

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

Si la recarga en vivo no está sincronizada después de instalar todos los componentes necesarios, intente reiniciar todo. Una vez que haya hecho eso, debería ver una aplicación móvil con un aspecto algo nativo, ¡construida con Angular y Capacitor!

Como resultado, debería ver la siguiente página:

<div class="mx-auto" style="ancho: 50%;">
  <img src="/konsta-nextwebp" alt="konsta-angular">
</div>

## Conclusión

Capacitor es una excelente opción para crear aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma sencilla de compartir código y mantener una interfaz de usuario consistente.

Y con la incorporación de [Capgo](https://capgoapp/), es aún más fácil agregar actualizaciones en vivo a su aplicación, lo que garantiza que sus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Si desea aprender cómo agregar Capgo a su aplicación Angular, consulte el siguiente artículo: