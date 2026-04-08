---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  2025 Construir aplicaciones móviles nativas con Next.js 15 y Capacitor: Una
  guía paso a paso
description: >-
  Aprende a crear aplicaciones móviles nativas utilizando Next.js 15 y Capacitor
  en esta guía completa. Descubre las últimas mejores prácticas y técnicas para
  construir aplicaciones móviles de alto rendimiento y ricas en características.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2025-05-12T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Ilustración de Next.js 15 y Capacitor
keywords: >-
  Next.js 15, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
## Introducción

En este tutorial, exploraremos cómo crear aplicaciones móviles nativas utilizando la poderosa combinación de [Next.js](https://nextjs.org/) 15 y [Capacitor](https://capacitorjs.com/) en 2024. Al aprovechar las versiones más recientes de estas tecnologías, puedes construir aplicaciones móviles de alto rendimiento y ricas en características con facilidad. También demostraremos cómo mejorar la interfaz de usuario móvil utilizando [Konsta UI](https://konstaui.com/) y Tailwind CSS, aunque este paso es opcional.

Next.js, un popular marco de React, proporciona una base sólida para construir aplicaciones web, mientras que Capacitor te permite transformar tu aplicación de Next.js en una aplicación móvil nativa sin modificaciones significativas o la necesidad de aprender nuevas habilidades como React Native. Este tutorial te guiará a través del proceso, comenzando con la configuración de una nueva aplicación Next.js e integrando Capacitor para crear una experiencia móvil nativa.

### Beneficios de Usar Next.js y Capacitor

- **Reusabilidad de Código**: Next.js te permite escribir componentes reutilizables y compartir código entre tus aplicaciones web y móviles, ahorrando tiempo y esfuerzo en el desarrollo.
- **Rendimiento**: Next.js ofrece optimizaciones de rendimiento integradas, como renderizado del lado del servidor y división de código, asegurando tiempos de carga rápidos y una experiencia de usuario fluida.
- **Capacidades Nativas**: Capacitor proporciona acceso a características nativas del dispositivo como la cámara, geolocalización y más, permitiéndote construir aplicaciones móviles ricas en características.
- **Desarrollo Simplificado**: Con Capacitor, puedes desarrollar y probar tu aplicación móvil utilizando tecnologías web familiares, reduciendo la curva de aprendizaje y agilizando el proceso de desarrollo.

## Preparando Tu Aplicación Next.js

Para comenzar, creemos una nueva aplicación Next.js utilizando el comando `create-next-app`:

```shell
npx create-next-app@latest my-app
```

Este comando configurará un proyecto Next.js en blanco con la configuración recomendada para la última versión.

A continuación, navega al directorio del proyecto:

```shell
cd my-app
```

Para crear una aplicación móvil nativa, necesitamos generar un export estático de nuestro proyecto Next.js. Actualiza el archivo `package.json` para incluir un script que construya y exporte el proyecto:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

Ejecutar el comando `npm run static` puede resultar en errores debido a incompatibilidad con la optimización de imágenes. Para resolver esto, abre el archivo `next.config.js` y modifícalo de la siguiente manera:

```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Ahora, ejecutar `npm run static` debería funcionar sin problemas, y encontrarás una nueva carpeta `out` en la raíz de tu proyecto. Esta carpeta será utilizada por Capacitor en los próximos pasos.

## Añadiendo Capacitor a Tu Aplicación Next.js 15

Para empaquetar tu aplicación Next.js en un contenedor móvil nativo, sigue estos pasos:

1. Instala el [Capacitor CLI](https://capacitorjs.com/docs/cli/) como una dependencia de desarrollo:

```shell
npm install -D @capacitor/cli
```

2. Inicializa Capacitor en tu proyecto Next.js:

```shell
npx cap init
```

Durante el proceso de inicialización, puedes presionar "Enter" para aceptar los valores predeterminados para el nombre de la aplicación y el ID del paquete.

3. Instala los paquetes necesarios de Capacitor:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Añade las plataformas nativas:

```shell
npx cap add ios
npx cap add android
```

Capacitor creará carpetas para cada plataforma (`ios` y `android`) en la raíz de tu proyecto. Estas carpetas contienen los proyectos nativos para iOS y Android, respectivamente.

Para acceder y construir el proyecto de Android, necesitas tener [Android Studio](https://developer.android.com/studio) instalado. Para el desarrollo de iOS, necesitas un Mac con [Xcode](https://developer.apple.com/xcode/) instalado.

5. Configura Capacitor:

Abre el archivo `capacitor.config.ts` y actualiza la propiedad `webDir` para apuntar al directorio de salida de tu construcción de Next.js:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. Construye y sincroniza tu proyecto:

```shell
npm run static
npx cap sync
```

El comando `npm run static` construye tu proyecto Next.js y exporta los archivos estáticos, mientras que `npx cap sync` sincroniza el código web con las plataformas nativas.

## Construyendo y Desplegando Aplicaciones Nativas

Para construir y desplegar tu aplicación móvil nativa, sigue estos pasos:
Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, necesitas inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Consola de Google Play para Android.

1. Abre los proyectos nativos:

Para iOS:
```shell
npx cap open ios
```

Para Android:
```shell
npx cap open android
```

2. Construye y ejecuta la aplicación:

![android-studio-run](/android-studio-run.webp)

- En Android Studio, espera a que el proyecto esté listo, y luego haz clic en el botón "Ejecutar" para desplegar la aplicación en un dispositivo o emulador conectado.
![xcode-run](/xcode-run.webp)

- En Xcode, configura tu cuenta de firma para desplegar la aplicación en un dispositivo real. Si no has hecho esto antes, Xcode te guiará a través del proceso (ten en cuenta que necesitas estar inscrito en el Programa de Desarrolladores de Apple). Una vez configurado, haz clic en el botón "Reproducir" para ejecutar la aplicación en tu dispositivo conectado.

¡Felicidades! Has desplegado con éxito tu aplicación web de Next.js en un dispositivo móvil.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Pero espera, hay una forma más rápida de hacer esto durante el desarrollo...

## Recarga en Vivo de Capacitor

Durante el desarrollo, puedes aprovechar la recarga en vivo para ver los cambios instantáneamente en tu dispositivo móvil. Para habilitar esta función, sigue estos pasos:

1. Encuentra tu dirección IP local:

- En macOS, ejecuta el siguiente comando en la terminal:
  ```shell
  ipconfig getifaddr en0
  ```

- En Windows, ejecuta:
  ```shell
  ipconfig
  ```
  Busca la dirección IPv4 en la salida.

2. Actualiza el archivo `capacitor.config.ts` para incluir la configuración del servidor:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
};

export default config;
```

Reemplaza `YOUR_IP_ADDRESS` con tu dirección IP local.

3. Aplica los cambios a tu proyecto nativo:

```shell
npx cap copy
```

El comando `copy` copia la carpeta web y los cambios de configuración al proyecto nativo sin actualizar todo el proyecto.

4. Reconstruye y ejecuta la aplicación en tu dispositivo utilizando Android Studio o Xcode.

Ahora, cada vez que hagas cambios en tu aplicación Next.js, la aplicación móvil se recargará automáticamente para reflejar esos cambios.

Nota: Si instalas nuevos complementos o haces cambios en archivos nativos, necesitarás reconstruir el proyecto nativo ya que la recarga en vivo solo se aplica a cambios en el código web.

## Usando Plugins de Capacitor

Los plugins de Capacitor te permiten acceder a características nativas del dispositivo desde tu aplicación Next.js. Exploraremos cómo usar el [plugin de Compartir](https://capacitorjs.com/docs/apis/share/) como ejemplo:

1. Instala el plugin de Compartir:

```shell
npm i @capacitor/share
```

2. Actualiza el archivo `pages/index.js` para usar el plugin de Compartir:

```javascript
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Share } from '@capacitor/share';

export default function Home() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Capgo!</a>
        </h1>

        <p className={styles.description}>
          <h2>Cool channel</h2>
          <button onClick={() => share()}>Share now!</button>
        </p>
      </main>
    </div>
  );
}
```

3. Sincroniza los cambios con el proyecto nativo:

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego volver a desplegar la aplicación en nuestro dispositivo. Para hacer esto, ejecuta el siguiente comando:

```shell
npx cap sync
```

4. Reconstruye y ejecuta la aplicación en tu dispositivo.

Ahora, cuando hagas clic en el botón "¡Compartir ahora!", aparecerá el cuadro de diálogo de compartir nativo, lo que te permitirá compartir el contenido con otras aplicaciones.

<div class="mx-auto" style="width: 50%;">
<img src="/next-capacitor-share.webp" alt="next-capacitor-share">
</div>

Para que el botón luzca más amigable para móviles, podemos agregar algo de estilo utilizando mi biblioteca de componentes de UI favorita para aplicaciones web - Next.js (sin juegos de palabras).

## Añadiendo Konsta UI

He trabajado durante años con [Ionic](https://ionicframework.com/) para construir excelentes aplicaciones multiplataforma y ha sido una de las mejores elecciones durante años.
Pero ahora ya no lo recomiendo, es muy complicado integrarlo con Next.js y realmente no vale la pena cuando ya tienes [tailwindcss](https://tailwindcss.com/).

Si deseas una UI móvil realmente atractiva que se adapte a los estilos específicos de iOS y Android, te recomiendo Konsta UI.

Necesitas tener [tailwind instalado](https://tailwindcss.com/docs/guides/nextjs/) 
Para mejorar la UI móvil de tu aplicación Next.js, puedes usar [Konsta UI](https://konstaui.com/), una biblioteca de componentes de UI amigable para móviles que se adapta a los estilos de iOS y Android. Sigue estos pasos para integrar Konsta UI:

1. Instala los paquetes requeridos:

```shell
npm i konsta
```

2. Actualiza el archivo `tailwind.config.js`:

```javascript
const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
```

3. Envuelve tu aplicación con el componente `App` de Konsta UI en `pages/_app.js`:

```javascript
import { App } from 'konsta/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```
### Página de Ejemplo

Ahora que todo está configurado, podemos usar componentes de React de Konsta UI en nuestras páginas de Next.js.

4. Actualiza el archivo `pages/index.js` para usar componentes de Konsta UI:

```javascript
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
} from 'konsta/react';

export default function Home() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your Next.js & Konsta UI app. Let's see what we have here.
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
```

5. Reinicia el servidor de desarrollo y reconstruye la aplicación.

Tu aplicación Next.js ahora debería tener una UI móvil con apariencia nativa impulsada por Konsta UI.

## Optimización del Rendimiento

Para asegurar un rendimiento óptimo de tu aplicación Next.js y Capacitor, considera las siguientes mejores prácticas:

- Minimiza el tamaño de la aplicación eliminando dependencias y activos no utilizados.
- Optimiza imágenes y otros archivos multimedia para reducir los tiempos de carga.
- Implementa la carga diferida para componentes y páginas para mejorar el rendimiento de carga inicial.
- Utiliza el renderizado del lado del servidor (SSR) con Next.js para mejorar la velocidad de carga de la aplicación y la optimización para motores de búsqueda (SEO).
- Aprovecha las optimizaciones integradas de Capacitor, como almacenamiento en caché de web views y empaquetado de aplicaciones.

## Conclusión

En este tutorial, exploramos cómo construir aplicaciones móviles nativas utilizando Next.js y Capacitor. Al aprovechar el poder de estas tecnologías, puedes crear aplicaciones móviles de alto rendimiento y ricas en características con facilidad.

Cubrimos los pasos para configurar una aplicación Next.js, integrar Capacitor y construir y desplegar la aplicación en dispositivos móviles. Además, discutimos el uso de plugins de Capacitor, añadir Konsta UI para una interfaz móvil mejorada y técnicas de optimización del rendimiento.

Para llevar tu aplicación de Next.js y Capacitor al siguiente nivel, considera explorar [Capgo](https://capgo.app/) para actualizaciones en vivo sin problemas, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Siguiendo las mejores prácticas y técnicas descritas en esta guía, estarás bien equipado para construir impresionantes aplicaciones móviles nativas utilizando Next.js y Capacitor.

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Documentación de Konsta UI](https://konstaui.com/docs)
- [Capgo - Actualizaciones en Vivo para Apps de Capacitor](https://capgo.app/)

¡Feliz construcción de aplicaciones!

Aprende cómo Capgo puede ayudarte a construir mejores aplicaciones más rápido, [regístrate para obtener una cuenta gratuita](/register/) hoy.
