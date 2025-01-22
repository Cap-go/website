---
slug: es__create-react-mobile-apps-with-capacitor
title: Desarrollar aplicaciones móviles con React y Capacitor
description: >-
  Aprende cómo crear una aplicación móvil con React y Capacitor y mejorar la
  interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Ilustración de React y Capacitor
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

En este tutorial, comenzaremos con una nueva aplicación de [React](https://reactjsorg/) y haremos la transición al desarrollo móvil nativo utilizando Capacitor. Opcionalmente, también puedes agregar [Konsta UI](https://konstauicom/) para mejorar la interfaz de usuario móvil con Tailwind CSS.

Capacitor te permite convertir fácilmente tu aplicación web de React en una aplicación móvil nativa sin modificaciones significativas o aprender una nueva habilidad como React Native.

Con solo unos simples pasos, la mayoría de las aplicaciones de React pueden transformarse en aplicaciones móviles.

Este tutorial te guiará a través del proceso, comenzando con una nueva aplicación de React y luego incorporando Capacitor para adentrarse en el ámbito de las aplicaciones móviles nativas. Adicionalmente, puedes utilizar opcionalmente [Konsta UI](https://konstauicom/) para mejorar tu interfaz de usuario móvil con Tailwind CSS.

## Acerca de Capacitor

¡Capacitor es un cambio de juego! Puedes incorporarlo sin esfuerzo en cualquier proyecto web, y envolverá tu aplicación en una vista web nativa, generando el proyecto nativo de Xcode y Android Studio por ti. Además, sus plugins proporcionan acceso a características nativas del dispositivo como la cámara a través de un puente JS.

Con Capacitor, obtienes una fantástica aplicación móvil nativa sin una configuración complicada o una curva de aprendizaje empinada. Su API delgada y funcionalidad simplificada hacen que sea muy fácil integrarlo en tu proyecto. ¡Confía en mí, te sorprenderá lo sencillo que es lograr una aplicación nativa completamente funcional con Capacitor!

## Preparando tu aplicación de React

Aunque existen varios métodos para iniciar aplicaciones de React, optemos por el más simple en este tutorial que proporciona una aplicación de React en blanco:

```shell
npx create-react-app my-app
```

Para crear una aplicación móvil nativa, necesitamos una **exportación** de nuestro proyecto. Por lo tanto, incluyamos un script sencillo en nuestro **packagejson** que pueda utilizarse para construir y exportar el proyecto de React:

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

Ahora puedes ejecutar `npm run build` sin preocupaciones, y deberías poder ver una nueva carpeta de salida en la raíz de tu proyecto.

Esta carpeta será utilizada por Capacitor más adelante, pero por ahora, debemos configurarla correctamente.

## Agregando Capacitor a tu aplicación de React

Para empaquetar cualquier aplicación web en un contenedor móvil nativo, debemos seguir unos pasos iniciales, pero después es tan simple como ejecutar un único comando `sync`.

Primero, podemos instalar el [CLI de Capacitor](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo, y luego configurarlo dentro de nuestro proyecto. Durante la configuración, puedes presionar "enter" para aceptar los valores predeterminados para el nombre y el ID del paquete.

A continuación, necesitamos instalar el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

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

En este punto, deberías poder observar nuevas carpetas **ios** y **android** en tu proyecto de React.

**¡Esos son proyectos nativos reales!**

Para acceder al proyecto de Android más adelante, debes instalar [Android Studio](https://developerandroidcom/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developerapplecom/xcode/).

Además, deberías encontrar un archivo **capacitorconfigts** en tu proyecto, que contiene algunas configuraciones fundamentales de Capacitor utilizadas durante la sincronización. Lo único a lo que debes prestar atención es el **webDir**, que debe apuntar al resultado de tu comando de construcción. Actualmente, es inexacto.

Para corregir esto, abre el archivo **capacitorconfigjson** y actualiza el **webDir**:

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

El primer comando `npm run build` simplemente construirá tu proyecto de React y exportará la compilación estática.

Mientras que el segundo comando `npx cap sync` sincronizará todo el código web en los lugares correctos de las plataformas nativas para que puedan mostrarse en una aplicación.

Adicionalmente, el comando sync podría actualizar las plataformas nativas e instalar plugins, así que cuando instales nuevos [plugins de Capacitor](https://capacitorjscom/docs/plugins/) es momento de ejecutar `npx cap sync` nuevamente.Sin darte cuenta, ya has terminado, así que veamos la aplicación en un dispositivo.

## Construir y desplegar aplicaciones nativas

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

¡Felicidades! Has desplegado exitosamente tu aplicación web React en un dispositivo móvil. Aquí tienes un ejemplo:

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo.

## Recarga en vivo de Capacitor

A estas alturas, probablemente estés acostumbrado a tener recarga en caliente con todos los frameworks modernos, ¡y la buena noticia es que puedes tener la misma funcionalidad **en un dispositivo móvil** con un mínimo esfuerzo!

Habilita el acceso a tu aplicación alojada localmente con recarga en vivo **en tu red** haciendo que la aplicación de Capacitor cargue el contenido desde la URL específica.

El primer paso es averiguar tu dirección IP local. Si estás usando una Mac, puedes averiguarlo ejecutando el siguiente comando en la terminal:

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

Ahora puedes desplegar tu aplicación una vez más a través de Android Studio o Xcode. Después de eso, si cambias algo en tu aplicación React, **la aplicación se recargará automáticamente** y mostrará los cambios.

**Ten en cuenta** que si instalas nuevos plugins como la cámara, aún requiere una reconstrucción de tu proyecto nativo. Esto se debe a que los archivos nativos se cambian, y no se puede hacer sobre la marcha.

Ten en cuenta que debes usar la IP y el puerto correctos en tu configuración. El bloque de código anterior muestra el puerto predeterminado de React con fines de demostración.

## Usando plugins de Capacitor

Echemos un vistazo a cómo usar un plugin de Capacitor en acción, que hemos mencionado varias veces antes. Para hacer esto, podemos instalar un plugin bastante simple ejecutando:

```shell
npm i @capacitor/share
```

No hay nada especial en el [plugin Share](https://capacitorjs.com/docs/apis/share/), ¡pero de todos modos muestra el diálogo de compartir nativo! Para esto, ahora solo necesitamos importar el paquete y llamar a la función `share()` desde nuestra aplicación. Cambiemos el **src/App.js** a esto:

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

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego volver a desplegar la aplicación en nuestro dispositivo.Para hacer esto, ejecuta el siguiente comando:

```
npx cap sync
```

¡Después de presionar el botón, podrás ver el hermoso diálogo nativo de compartir en acción!

<div>
  <h1>
</h1>

Para hacer que el botón se vea más amigable para dispositivos móviles, podemos agregar algunos estilos usando mi biblioteca de componentes de UI favorita para aplicaciones web - React (sin juego de palabras)

## Agregando Konsta UI

He trabajado durante años con [Ionic](https://ionicframeworkcom/) para construir increíbles aplicaciones multiplataforma, y fue una de las mejores opciones durante años. Pero ahora ya no lo recomiendo; es muy complicado integrarlo con React, y realmente no vale la pena cuando ya tienes [tailwindcss](https://tailwindcsscom/)

Si quieres una UI móvil de gran apariencia que se adapte a los estilos específicos de iOS y Android, recomiendo Konsta UI.

Necesitas tener [tailwind ya instalado](https://tailwindcsscom/docs/guides/vite/#react)

Para usarlo, solo necesitamos instalar el paquete de react:

```shell
npm i konsta
```

Adicionalmente, necesitas modificar tu archivo `tailwindconfigjs`:

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

`konstaConfig` extenderá la configuración predeterminada (o tu configuración personalizada) de Tailwind CSS con algunas variantes adicionales y utilidades auxiliares requeridas para Konsta UI.

Ahora necesitamos configurar el componente principal [App](https://konstauicom/react/app/) para que podamos establecer algunos parámetros globales (como `theme`)

Necesitamos envolver toda la aplicación con `App` en el `src/Appjs`:

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

### Página de ejemplo

Ahora que todo está configurado, podemos usar los componentes React de Konsta UI en nuestra aplicación React.

Por ejemplo, abramos `src/Appjs` y cambiémoslo a lo siguiente:

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

Si la recarga en vivo está desincronizada después de instalar todos los componentes necesarios, intenta reiniciar todo. Una vez que hayas hecho eso, deberías ver una aplicación móvil con un aspecto algo nativo, construida con React y Capacitor.

Deberías ver la siguiente página como resultado:

<p>
  <h2>
</h2>

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente, ofreciendo una forma simple de compartir código y mantener una UI consistente.

Y con la adición de [Capgo](https://capgoapp/), es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Si quieres aprender cómo agregar Capgo a tu aplicación React, echa un vistazo al siguiente artículo: