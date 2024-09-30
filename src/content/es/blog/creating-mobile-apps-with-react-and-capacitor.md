---
slug: creating-mobile-apps-with-react-and-capacitor
title: Creación de aplicaciones móviles con Pure React.js y Capacitor
description: >-
  Una guía sobre la función de transformador de una aplicación Web React.js y
  una aplicación móvil nativa para ayudar a Capacitor y mejorar la interfaz del
  usuario nativo con Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React.js and Capacitor illustration
tag: Tutorial
published: true
next_blog: implementing-live-updates-in-your-react-capacitor-app
locale: es
---

Este tutorial lo guiará en la creación de una aplicación móvil usando React, Capacitor y Konsta UI. Al final, sabrá cómo transformar una aplicación web Reactjs en una aplicación móvil nativa con Capacitor e implementar una interfaz de usuario nativa usando Konsta UI.

Capacitor permite la fácil transformación de su aplicación web Reactjs en una aplicación móvil nativa, sin requerir modificaciones sustanciales ni el aprendizaje de nuevas estrategias como React Native.

El proceso implica unos pocos pasos simples y, antes de que te des cuenta, tu aplicación Reactjs será una aplicación móvil completamente funcional. Así que quédate mientras te guiamos en este viaje.

## Descripción general del condensador

CapacitorJS cambia las reglas del juego. Puede integrarse perfectamente con cualquier proyecto web y envolver su aplicación en una vista web nativa mientras genera el proyecto nativo Xcode y Android Studio. Además, a través de sus complementos, puede acceder a funciones nativas del dispositivo como la cámara a través de un puente JS.

Capacitor ofrece una forma sencilla de crear una aplicación móvil nativa sin complicaciones ni una curva de aprendizaje pronunciada. Su API simple y su funcionalidad optimizada facilitan la incorporación a su proyecto.

## Configurando tu aplicación Reactjs

Busquemos el método más simple para iniciar una aplicación React. Usaremos el administrador de paquetes npm para crear una nueva aplicación React:

```shell
npx create-react-app my-app
```

Para transformar nuestro proyecto en una aplicación móvil nativa, se requiere una **exportación** de nuestra aplicación 

Volveremos a esto en un momento. Primero, comprendamos cómo integrar Capacitor en nuestra aplicación React.

## Integración de condensador en su aplicación Reactjs

Los pasos de configuración iniciales pueden ser un poco detallados, pero después de eso, actualizar el contenedor de su aplicación nativa se vuelve tan simple como ejecutar un comando "sincronizar".

Primero, instalaremos Capacitor CLI como una dependencia de desarrollo y lo configuraremos dentro de nuestro proyecto. Durante la configuración, acepte los valores predeterminados para el nombre y el ID del paquete presionando "enter".

A continuación, instalaremos el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

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

Los directorios **ios** y **android** ahora están presentes en su proyecto Reactjs

Para acceder al proyecto de Android más adelante, instale [Android Studio](https://developerandroidcom/studio/) Para iOS, necesita una Mac y debe instalar [Xcode](https://developerapplecom/xcode/)

A continuación, actualice **webDir** en su archivo **capacitorconfigjson** como se muestra a continuación:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Ejecute el comando de compilación y sincronice su proyecto con Capacitor:

```shell
npm run build
npx cap sync
```

El comando `npm run build` construirá su proyecto Reactjs, mientras que `npx cap sync` alineará el código web en los lugares precisos de las plataformas nativas para que puedan ejecutarse en una aplicación.

Ahora, con un poco de suerte y sin errores, ¡tu aplicación Reactjs debería estar lista para iniciarse en un dispositivo!

## Creación e implementación de sus aplicaciones nativas

El desarrollo de aplicaciones de iOS requiere **Xcode** y las aplicaciones de Android necesitan **Android Studio**. Si planea distribuir su aplicación en la tienda de aplicaciones, debe inscribirse en el Programa de desarrolladores de Apple para iOS y en Google Play Console para Android.

La CLI de Capacitor simplifica el proceso de apertura de ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Una vez que sus proyectos nativos estén configurados, implementar su aplicación en un dispositivo conectado es un proceso sencillo 

Para Android Studio, espere a que se cargue todo y luego implemente su aplicación en un dispositivo conectado 

Para Xcode, establezca su cuenta de firma para implementar su aplicación en un dispositivo real en lugar de solo en el simulador. Después de hacer eso, simplemente presione reproducir para ejecutar la aplicación en su dispositivo conectado, que puede elegir en la parte superior.

Si todo ha ido bien, habrás convertido tu Reactjs en una aplicación móvil nativa!

## Recarga en vivo del condensador

Los marcos de desarrollo modernos generalmente vienen con recarga en caliente y, afortunadamente, puedes tener lo mismo con Capacitor pero **en tu dispositivo móvil**.

Puede hacer que su aplicación alojada localmente sea accesible con recarga en vivo en su red haciendo que la aplicación Capacitor cargue el contenido desde una URL específica.

Primero, determine su dirección IP local. En una Mac, puede hacerlo ejecutando `ipconfig getifaddr en0` en la terminal. En Windows, ejecute `ipconfig` y busque la dirección IPv4.

Después de esto, indique a Capacitor que cargue la aplicación directamente desde el servidor agregando otro parámetro a su archivo `capacitorconfigts`:

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

Asegúrese de utilizar la IP y el puerto correctos. Ejecute `npx cap copy` para aplicar estos cambios a nuestro proyecto nativo.

Al implementar su aplicación una vez más a través de Android Studio o Xcode, cualquier cambio en su aplicación React se recargará y mostrará automáticamente en su aplicación.

Tenga en cuenta que si se instalan nuevos complementos, como la cámara, será necesario reconstruir su proyecto nativo. Esto se debe a que los archivos nativos habrán cambiado y no se podrán actualizar sobre la marcha.

## Uso de complementos de condensadores

Echemos un vistazo rápido a cómo usar un complemento de Capacitor. Instalemos uno simple, el [complemento para compartir] (https://capacitorjscom/docs/apis/share/), que abre el cuadro de diálogo para compartir nativo:

```shell
npm i @capacitor/share
```

Para usarlo, importe el paquete y llame a la función `share()` respectiva desde nuestra aplicación. Considere **Appjs**:

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

Después de instalar un nuevo complemento, recuerde sincronizar su proyecto React nuevamente usando `npx cap sync`

## Implementación de Konsta UI: UI móvil más atractiva

Para una experiencia de interfaz de usuario móvil más atractiva, usaremos Konsta UI. Proporciona un estilo específico para iOS y Android, y es fácil trabajar con él.

Para usar Konsta UI, instale el paquete React:

```shell
npm i konsta
```

Modifique su archivo `tailwindconfigjs` así:

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

`konstaConfig` complementará su configuración CSS actual de Tailwind con variantes y utilidades adicionales necesarias para Konsta UI

Ahora, configure el componente principal de la aplicación para establecer parámetros globales como `theme`. Envuelva la aplicación principal con la aplicación en `src/indexjs`:

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

Usemos los componentes Konsta UI React en nuestras páginas Reactjs. Abra `src/Appjs` y modifíquelo a:

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

Si todo se ha hecho correctamente, debería ver una integración sencilla entre React y Konsta UI para darle a su aplicación móvil un aspecto nativo.

## Conclusión

Capacitor ofrece un medio perfecto para crear aplicaciones nativas basadas en un proyecto web existente, proporcionando una manera sencilla de compartir código y tener una interfaz de usuario consistente.

Gracias a tecnologías como Capacitor, crear aplicaciones móviles a partir de aplicaciones web Reactjs nunca ha sido tan fácil. Lleve sus habilidades de desarrollo web al siguiente nivel creando impresionantes aplicaciones móviles nativas. ¡Feliz codificación!

Para obtener más información sobre cómo acelerar el proceso de desarrollo de su aplicación, [regístrese para obtener una cuenta gratuita](/register/) hoy