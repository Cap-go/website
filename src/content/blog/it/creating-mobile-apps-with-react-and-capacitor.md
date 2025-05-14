---
slug: creating-mobile-apps-with-react-and-capacitor
title: Construindo Aplicativos Móveis com Pure React.js e Capacitor
description: >-
  Un guide sur la façon de transformer une application web React.js en une
  application mobile native en utilisant Capacitor, et d'améliorer l'interface
  utilisateur native avec Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: Illustration de React.js et Capacitor
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: implementing-live-updates-in-your-react-capacitor-app
---
Este tutorial te guiará para crear una aplicación móvil utilizando React, Capacitor y Konsta UI. Al final, sabrás cómo transformar una aplicación web de React.js en una aplicación móvil nativa con Capacitor, e implementar una interfaz de usuario nativa utilizando Konsta UI.

Capacitor permite la fácil transformación de tu aplicación web de React.js en una aplicación móvil nativa, sin requerir alteraciones sustanciales o el aprendizaje de nuevas estrategias como React Native.

El proceso implica unos pocos pasos simples, y antes de que te des cuenta, tu aplicación de React.js será una aplicación móvil completamente funcional. Así que, acompáñanos mientras te guiamos en este viaje.

## Descripción general de Capacitor

CapacitorJS es un cambio de juego. Puede integrarse sin problemas con cualquier proyecto web y envolver tu aplicación en una vista web nativa mientras genera el proyecto nativo de Xcode y Android Studio. Además, a través de sus complementos, puedes acceder a funciones nativas del dispositivo como la cámara a través de un puente JS.

Capacitor ofrece una forma sencilla de crear una aplicación móvil nativa sin complicaciones ni una curva de aprendizaje pronunciada. Su API simple y funcionalidad optimizada facilitan su incorporación a tu proyecto.

## Configurando tu aplicación React.js

Vamos a optar por el método más sencillo para iniciar una aplicación React. Usaremos el administrador de paquetes npm para crear una nueva aplicación de React:

```shell
npx create-react-app my-app
```

Para transformar nuestro proyecto en una aplicación móvil nativa, se requiere un **export** de nuestra aplicación.

Regresaremos a esto en un momento. Primero, entendamos cómo integrar Capacitor en nuestra aplicación React.

## Integrando Capacitor en tu aplicación React.js

Los pasos de configuración inicial pueden ser un poco detallados, pero después de eso, actualizar el contenedor de tu aplicación nativa se convierte en tan simple como ejecutar un comando `sync`.

Primero, instalaremos la CLI de Capacitor como una dependencia de desarrollo y la configuraremos dentro de nuestro proyecto. Durante la configuración, acepta los valores predeterminados para el nombre y el ID del paquete presionando “enter”.

A continuación, instalaremos el paquete central y los paquetes relevantes para las plataformas iOS y Android.

Finalmente, agregaremos las plataformas y Capacitor creará carpetas para cada plataforma en la raíz de nuestro proyecto:

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

Los directorios **ios** y **android** ahora están presentes en tu proyecto de React.js.

Para acceder al proyecto de Android más tarde, instala [Android Studio](https://developer.android.com/studio/). Para iOS, necesitas un Mac y deberías instalar [Xcode](https://developer.apple.com/xcode/).

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

El comando `npm run build` construirá tu proyecto de React.js, mientras que `npx cap sync` alineará el código web en los lugares adecuados de las plataformas nativas para que puedan ser ejecutados en una aplicación.

Ahora, con un poco de suerte y sin errores, ¡tu aplicación de React.js debería estar lista para ser lanzada en un dispositivo!

## Construyendo y desplegando tus aplicaciones nativas

Desarrollar aplicaciones iOS requiere **Xcode**, y las aplicaciones de Android necesitan **Android Studio**. Si planeas distribuir tu aplicación en la tienda de aplicaciones, debes inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Consola de Google Play para Android.

La CLI de Capacitor simplifica el proceso de apertura de ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que tus proyectos nativos estén configurados, desplegar tu aplicación en un dispositivo conectado es un proceso sencillo.

Para Android Studio, espera a que todo se cargue y luego despliega tu aplicación en un dispositivo conectado.

Para Xcode, establece tu cuenta de firma para desplegar tu aplicación en un dispositivo real en lugar de solo el simulador. Después de eso, simplemente presiona play para ejecutar la aplicación en tu dispositivo conectado, que puedes elegir en la parte superior.

Si todo ha ido bien, ¡habrás convertido tu aplicación web de React.js en una aplicación móvil nativa!

## Recarga en vivo de Capacitor

Los frameworks de desarrollo modernos suelen venir con recarga en caliente, y afortunadamente, puedes tener lo mismo con Capacitor, pero **en tu dispositivo móvil**.

Puedes hacer que tu aplicación alojada localmente sea accesible con recarga en vivo en tu red haciendo que la aplicación Capacitor cargue el contenido desde una URL específica.

Primero, determina tu dirección IP local. En un Mac, puedes hacerlo ejecutando `ipconfig getifaddr en0` en la terminal. En Windows, ejecuta `ipconfig` y busca la dirección IPv4.

Después de esto, instruye a Capacitor para cargar la aplicación directamente desde el servidor añadiendo otro parámetro a tu archivo `capacitor.config.ts`:

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

Asegúrate de usar la IP y el puerto correctos. Ejecuta `npx cap copy` para aplicar estos cambios a nuestro proyecto nativo.

Después de desplegar tu aplicación una vez más a través de Android Studio o Xcode, cualquier cambio en tu aplicación React se recargará automáticamente y se mostrará en tu aplicación.

Ten en cuenta que si se instalan nuevos complementos, como la cámara, es necesario reconstruir tu proyecto nativo. Esto se debe a que los archivos nativos habrán cambiado y no se pueden actualizar sobre la marcha.

## Usando complementos de Capacitor

Echemos un vistazo rápido a cómo usar un complemento de Capacitor. Instalemos uno simple, el [complemento Share](https://capacitorjs.com/docs/apis/share/), que solicita el diálogo de compartir nativo:

```shell
npm i @capacitor/share
```

Para usarlo, importa el paquete y llama a la respectiva función `share()` desde nuestra aplicación. Considera el **App.js**:

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

Después de instalar un nuevo complemento, recuerda sincronizar tu proyecto React nuevamente usando `npx cap sync`.

## Implementando Konsta UI: Interfaz móvil de mejor apariencia

Para una mejor experiencia de interfaz móvil, usaremos Konsta UI. Proporciona estilos específicos para iOS y Android, y es fácil de trabajar.

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

`konstaConfig` complementará tu configuración actual de Tailwind CSS con variantes y utilidades adicionales necesarias para Konsta UI.

Ahora, configura el componente principal de la aplicación para establecer parámetros globales como `theme`. Envuelve la aplicación principal con App en el `src/index.js`:

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

Utilicemos los componentes de React de Konsta UI en nuestras páginas de React.js. Abre `src/App.js` y modifícalo a:

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

Si todo se ha hecho correctamente, deberías ver una integración sin esfuerzo entre React y Konsta UI para darle a tu aplicación móvil una apariencia nativa.

## Conclusión

Capacitor ofrece un medio fluido para construir aplicaciones nativas basadas en un proyecto web existente, proporcionando una forma simple de compartir código y tener una interfaz de usuario consistente.

Gracias a tecnologías como Capacitor, construir aplicaciones móviles a partir de aplicaciones web de React.js nunca ha sido tan fácil. Lleva tus habilidades de desarrollo web al siguiente nivel creando impresionantes aplicaciones móviles nativas. ¡Feliz codificación!

Para más información sobre cómo puedes acelerar tu proceso de desarrollo de aplicaciones, [regístrate para obtener una cuenta gratuita](/register/) hoy.
