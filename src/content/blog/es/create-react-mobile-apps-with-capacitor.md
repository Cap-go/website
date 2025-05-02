---
slug: crear-aplicaciones-móviles-react-con-capacitor
title: Creando Aplicaciones Móviles con React y Capacitor
description: >-
  Aprende cómo construir una aplicación móvil usando React, Capacitor y mejora
  la interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Ilustración de React y Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: create-react-mobile-apps-with-capacitor
---
En este tutorial, comenzaremos con una nueva aplicación de [React](https://reactjs.org/) y haremos la transición al desarrollo móvil nativo usando Capacitor. Opcionalmente, también puedes agregar [Konsta UI](https://konstaui.com/) para mejorar la interfaz móvil con Tailwind CSS.

Capacitor te permite convertir fácilmente tu aplicación web de React en una aplicación móvil nativa sin modificaciones significativas o aprender una nueva habilidad como React Native.

Con solo unos pocos pasos simples, la mayoría de las aplicaciones React pueden transformarse en aplicaciones móviles.

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación React y luego incorporando Capacitor para pasar al ámbito de las aplicaciones móviles nativas. Además, opcionalmente puedes usar [Konsta UI](https://konstaui.com/) para mejorar tu interfaz móvil con Tailwind CSS.

## Acerca de Capacitor

¡CapacitorJS es revolucionario! Puedes incorporarlo sin esfuerzo en cualquier proyecto web, y envolverá tu aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio por ti. Además, sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin ninguna configuración complicada o curva de aprendizaje pronunciada. Su API reducida y funcionalidad optimizada hacen que sea muy fácil integrarlo en tu proyecto. ¡Confía en mí, te sorprenderá lo sencillo que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando Tu Aplicación React

Si bien hay varios métodos para iniciar aplicaciones React, vamos a optar por el más simple en este tutorial que proporciona una aplicación React en blanco:

```shell
npx create-react-app my-app
```

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, vamos a incluir un script simple en nuestro **package.json** que puede ser utilizado para construir y exportar el proyecto React:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Ahora puedes ejecutar `npm run build` sin preocupaciones, y deberías poder ver una nueva carpeta out en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora, debemos configurarla correctamente.

## Agregando Capacitor a Tu Aplicación React

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir algunos pasos iniciales, pero después es tan simple como ejecutar un solo comando `sync`.

Primero, podemos instalar el [CLI de Capacitor](https://capacitorjs.com/docs/cli/) como dependencia de desarrollo, y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete.

Luego, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, podemos agregar las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your React project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

En este punto, deberías poder observar nuevas carpetas **ios** y **android** en tu proyecto React.

**¡Esos son proyectos nativos reales!**

Para acceder al proyecto de Android más tarde, debes instalar [Android Studio](https://developer.android.com/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developer.apple.com/xcode/).

Además, deberías encontrar un archivo **capacitor.config.ts** en tu proyecto, que contiene algunas configuraciones fundamentales de Capacitor utilizadas durante la sincronización. Lo único a lo que debes prestar atención es el **webDir**, que debe apuntar al resultado de tu comando de construcción. Actualmente, es inexacto.

Para corregir esto, abre el archivo **capacitor.config.json** y actualiza el **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Puedes probarlo ejecutando los siguientes comandos:

```shell
npm run build
npx cap sync
```

El primer comando `npm run build` simplemente construirá tu proyecto React y exportará la compilación estática.

Mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Además, el comando sync podría actualizar las plataformas nativas e instalar plugins, así que cuando instales nuevos [plugins de Capacitor](https://capacitorjs.com/docs/plugins/) es momento de ejecutar `npx cap sync` nuevamente.

Sin darte cuenta, ahora realmente has terminado, ¡así que veamos la aplicación en un dispositivo!

## Construir y Desplegar aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, necesitas inscribirte en el Programa de Desarrollador de Apple para iOS y en la Consola de Google Play para Android.

Si eres nuevo en el desarrollo móvil nativo, puedes usar el CLI de Capacitor para abrir fácilmente ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que hayas configurado tus proyectos nativos, desplegar tu aplicación a un dispositivo conectado es fácil. En Android Studio, solo necesitas esperar a que todo esté listo, y puedes desplegar tu aplicación a un dispositivo conectado sin cambiar ninguna configuración. Aquí hay un ejemplo:

![android-studio-run](/android-studio-run.webp)

En Xcode, necesitas configurar tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo el simulador. Si no has hecho esto antes, Xcode te guía a través del proceso (pero nuevamente, necesitas estar inscrito en el Programa de Desarrollador). Después de eso, simplemente puedes presionar play para ejecutar la aplicación en tu dispositivo conectado, que puedes seleccionar en la parte superior. Aquí hay un ejemplo:

![xcode-run](/xcode-run.webp)

¡Felicitaciones! Has desplegado exitosamente tu aplicación web React a un dispositivo móvil. Aquí hay un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
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
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Asegúrate de usar **la IP y el puerto correctos**, he usado el puerto predeterminado de React en este ejemplo.

Ahora, podemos aplicar estos cambios copiándolos a nuestro proyecto nativo:

```shell
npx cap copy
```

El comando `copy` es similar a `sync`, pero solo **copiará los cambios realizados en la carpeta web** y la configuración, sin actualizar el proyecto nativo.

Ahora puedes desplegar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación React, **la aplicación se recargará automáticamente** y mostrará los cambios!

**Ten en cuenta** que si instalas nuevos plugins como la cámara, aún requiere una reconstrucción de tu proyecto nativo. Esto es porque los archivos nativos cambian, y no se puede hacer sobre la marcha.

Ten en cuenta que debes usar la IP y el puerto correctos en tu configuración. El bloque de código anterior muestra el puerto predeterminado de React como ejemplo.

## Usando Plugins de Capacitor

Veamos cómo usar un plugin de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un plugin bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial sobre el [plugin Share](https://capacitorjs.com/docs/apis/share/), ¡pero de todos modos muestra el diálogo nativo de compartir! Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` desde nuestra aplicación. Cambiemos el **src/App.js** a esto:

```javascript
import React from 'react';
import { Share } from '@capacitor/share';

function App() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  };

  return (
    <div>
      <h1>Welcome to React and Capacitor!</h1>
      <p>
        <h2>Cool channel</h2>
        <button onClick={() => share()}>Share now!</button>
      </p>
    </div>
  );
}

export default App;
```

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego volver a desplegar la aplicación en nuestro dispositivo. Para hacer esto, ejecuta el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, puedes ver el hermoso diálogo nativo de compartir en acción!

<div>
  <h1>
</h1>

Para hacer que el botón se vea más amigable para móviles, podemos agregar algo de estilo usando mi biblioteca de componentes UI favorita para aplicaciones web - React (sin juego de palabras).

## Agregando Konsta UI

He trabajado años con [Ionic](https://ionicframework.com/) para construir increíbles aplicaciones multiplataforma, y fue una de las mejores opciones durante años. Pero ahora ya no lo recomiendo; es muy complicado integrarlo con React, y no vale realmente la pena cuando ya tienes [tailwindcss](https://tailwindcss.com/).

Si quieres una interfaz móvil de gran apariencia que se adapte al estilo específico de iOS y Android, te recomiendo Konsta UI.

Necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/guides/vite/#react)

Para usarlo, solo necesitamos instalar el paquete react:

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
    './src/**/*.{js,ts,javascript,tsx}',
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

`konstaConfig` extenderá la configuración predeterminada (o tu configuración personalizada) de Tailwind CSS con algunas variantes extra y utilidades auxiliares requeridas para Konsta UI.

Ahora necesitamos configurar el componente principal [App](https://konstaui.com/react/app/) para que podamos establecer algunos parámetros globales (como `theme`).

Necesitamos envolver toda la aplicación con `App` en el `src/App.js`:

```javascript
import { App } from 'konsta/react';
import './App.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### Página de Ejemplo

Ahora que todo está configurado, podemos usar los componentes React de Konsta UI en nuestra aplicación React.

Por ejemplo, vamos a abrir `src/App.js` y cambiarlo a lo siguiente:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/react';

function App() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your React & Konsta UI app. Let's see what we have here.
        </p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem href="/about/" title="About" />
        <ListItem href="/form/" title="Form" />
      </List>

      <Block strong className="flex space-x-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Block>
    </Page>
  );
}

export default App;
```

Si la recarga en vivo está desincronizada después de instalar todos los componentes necesarios, intenta reiniciar todo. Una vez que hayas hecho eso, ¡deberías ver una aplicación móvil con un aspecto algo nativo, construida con React y Capacitor!

Deberías ver la siguiente página como resultado:

<p>
  <h2>
</h2>

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma simple de compartir código y mantener una interfaz de usuario consistente.

Y con la adición de [Capgo](https://capgo.app/), es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Si deseas aprender cómo agregar Capgo a tu aplicación React, echa un vistazo al siguiente artículo:
