---
slug: creating-mobile-apps-with-react-and-capacitor
title: Desarrollar aplicaciones móviles con React.js puro y Capacitor
description: >-
  Una guía para convertir una aplicación web React.js en una aplicación móvil
  nativa utilizando Capacitor y mejorar la interfaz de usuario nativa con Konsta
  UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Ilustración de React.js y Capacitor
tag: Tutorial
published: true
locale: es
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Este tutorial te guiará en la creación de una aplicación móvil utilizando React, Capacitor y Konsta UI. Al final, sabrás cómo transformar una aplicación web de React en una aplicación móvil nativa con Capacitor e implementar una interfaz de usuario nativa utilizando Konsta UI.

Capacitor permite transformar fácilmente tu aplicación web de React en una aplicación móvil nativa, sin requerir cambios sustanciales ni aprender nuevas estrategias como React Native.

El proceso implica unos pocos pasos simples, y antes de que te des cuenta, tu aplicación de React se convertirá en una aplicación móvil completamente funcional. Así que quédate con nosotros mientras te guiamos en este viaje.

## Visión general de Capacitor

Capacitor es un cambio de juego. Puede integrarse sin problemas con cualquier proyecto web y envolver tu aplicación en una vista web nativa mientras genera el proyecto nativo de Xcode y Android Studio. Además, a través de sus plugins, puedes acceder a características nativas del dispositivo como la cámara a través de un puente JS.

Capacitor ofrece una forma sencilla de crear una aplicación móvil nativa sin complicaciones ni una curva de aprendizaje empinada. Su API simple y funcionalidad simplificada lo hacen fácil de incorporar en tu proyecto.

## Configurando tu aplicación de React

Vamos a utilizar el método más simple para iniciar una aplicación de React. Usaremos el gestor de paquetes npm para crear una nueva aplicación de React:

```shell
npx create-react-app my-app
```

Para transformar nuestro proyecto en una aplicación móvil nativa, se requiere una **exportación** de nuestra aplicación.

Volveremos a esto en un momento. Primero, entendamos cómo integrar Capacitor en nuestra aplicación de React.

## Integrando Capacitor en tu aplicación de React

Los pasos iniciales de configuración pueden ser un poco detallados, pero después de eso, actualizar el envoltorio de tu aplicación nativa se vuelve tan simple como ejecutar un comando `sync`.

Primero, instalaremos el CLI de Capacitor como una dependencia de desarrollo y lo configuraremos dentro de nuestro proyecto. Durante la configuración, acepta los valores predeterminados para el nombre y el ID del paquete presionando "enter".

Luego, instalaremos el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, agregaremos las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

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

Los directorios **ios** y **android** ahora están presentes en tu proyecto de React.

Para acceder al proyecto de Android más tarde, instala [Android Studio](https://developer.android.com/studio/). Para iOS, necesitas una Mac y debes instalar [Xcode](https://developer.apple.com/xcode/).

A continuación, actualiza el **webDir** en tu archivo **capacitor.config.json** como se muestra a continuación:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Ejecuta el comando de construcción y sincroniza tu proyecto con Capacitor:

```shell
npm run build
npx cap sync
```

El comando `npm run build` construirá tu proyecto de React, mientras que `npx cap sync` alineará el código web en los lugares precisos de las plataformas nativas para que puedan ser ejecutados en una aplicación.

Ahora, con un poco de suerte y sin errores, ¡tu aplicación de React debería estar lista para lanzarse en un dispositivo!

## Construyendo y desplegando tus aplicaciones nativas

Desarrollar aplicaciones para iOS requiere **Xcode**, y las aplicaciones para Android necesitan **Android Studio**. Si planeas distribuir tu aplicación en la tienda de aplicaciones, debes inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Consola de Google Play para Android.

El CLI de Capacitor simplifica el proceso de abrir ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que tus proyectos nativos estén configurados, desplegar tu aplicación en un dispositivo conectado es un proceso sencillo.

Para Android Studio, espera a que todo se cargue y luego despliega tu aplicación en un dispositivo conectado.

Para Xcode, establece tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo el simulador. Después de hacer eso, simplemente presiona play para ejecutar la aplicación en tu dispositivo conectado, que puedes elegir en la parte superior.

Si todo ha ido bien, habrás convertido tu ReactAplicación web js en una aplicación móvil nativa!

## Recarga en vivo de Capacitor

Los frameworks de desarrollo modernos generalmente vienen con recarga en caliente, y afortunadamente, puedes tener lo mismo con Capacitor pero **en tu dispositivo móvil**!

Puedes hacer que tu aplicación alojada localmente sea accesible con recarga en vivo en tu red haciendo que la aplicación Capacitor cargue el contenido desde una URL específica

Primero, determina tu dirección IP local. En Mac, puedes hacerlo ejecutando `ipconfig getifaddr en0` en la terminal. En Windows, ejecuta `ipconfig` y busca la dirección IPv4

Después de esto, indica a Capacitor que cargue la aplicación directamente desde el servidor agregando otro parámetro a tu archivo `capacitor.config.ts`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Asegúrate de usar la IP y el puerto correctos. Ejecuta `npx cap copy` para aplicar estos cambios a nuestro proyecto nativo

Al implementar tu aplicación una vez más a través de Android Studio o Xcode, cualquier cambio en tu aplicación React se recargará y mostrará automáticamente en tu aplicación!

Ten en cuenta que si se instalan nuevos plugins, como la cámara, se necesita una reconstrucción de tu proyecto nativo. Esto se debe a que los archivos nativos habrán cambiado y no se pueden actualizar sobre la marcha

## Usando plugins de Capacitor

Echemos un vistazo rápido a cómo usar un plugin de Capacitor. Instalemos uno simple, el [plugin Share](https://capacitorjs.com/docs/apis/share/), que muestra el diálogo nativo de compartir:

```shell
npm i @capacitor/share
```

Para usarlo, importa el paquete y llama a la función respectiva `share()` desde nuestra aplicación. Considera el **App.js**:

```javascript
import { Share } from '@capacitor/share';

function ShareButton() {
  const share = async () => {
    await Share.share({
      title: 'React App',
      text: 'Visit this React App',
      url: 'http://localhost:3000',
      dialogTitle: 'Share with...'
    });
  };

  return (
    <button onClick={share}>
      Share
    </button>
  );
}

export default ShareButton;
```

Después de instalar un nuevo plugin, recuerda sincronizar tu proyecto React nuevamente usando `npx cap sync`

## Implementando Konsta UI: UI móvil de mejor apariencia

Para una experiencia de UI móvil de mejor apariencia, usaremos Konsta UI. Proporciona estilos específicos para iOS y Android, y es fácil de trabajar

Para usar Konsta UI, instala el paquete de React:

```shell
npm i konsta
```

Modifica tu archivo `tailwind.config.js` de la siguiente manera:

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

`konstaConfig` complementará tu configuración actual de Tailwind CSS con variantes y utilidades adicionales necesarias para Konsta UI

Ahora, configura el componente App principal para establecer parámetros globales como `theme`. Envuelve la aplicación principal con App en el `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'konsta/react';
import './index.css';
import MyApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <App theme="ios">
      <MyApp />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Usemos los componentes React de Konsta UI en nuestras páginas de React.js. Abre `src/App.js` y modifícalo a:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
} from 'konsta/react';

export default function MyApp() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Welcome to your React & Konsta UI app.
        </p>
      </Block>
      
      <List>
        <ListItem href="/about" title="About" />
      </List>

      <Block strong>
        <Button>Click Me</Button>
      </Block>
    </Page>
  );
}
```

Si todo se ha hecho correctamente, deberías ver una integración sin esfuerzo entre React y Konsta UI para darle a tu aplicación móvil un aspecto nativo

## Conclusión

Capacitor ofrece un medio perfecto para construir aplicaciones nativas basadas en un proyecto web existente, proporcionando una forma simple de compartir código y tener una UI consistente

Gracias a tecnologías como Capacitor, construir aplicaciones móviles a partir de aplicaciones web React.js nunca ha sido más fácil. Lleva tus habilidades de desarrollo web al siguiente nivel creando impresionantes aplicaciones móviles nativas. ¡Feliz codificación!

Para más información sobre cómo puedes acelerar tu proceso de desarrollo de aplicaciones, [regístrate para obtener una cuenta gratuita](/register/) hoy mismo.