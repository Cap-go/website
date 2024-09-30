---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  2024 Creación de aplicaciones móviles nativas con Next.js 14 y Capacitor: una
  guía paso a paso
description: >-
  Aprenda a crear aplicaciones móviles nativas utilizando Next.js 14 y Capacitor
  en esta guía completa. Descubra las mejores prácticas y técnicas más recientes
  para crear aplicaciones móviles de alto rendimiento y ricas funciones.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14 and Capacitor illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

## Introducción

En este tutorial, exploraremos cómo crear aplicaciones móviles nativas utilizando la poderosa combinación de [Nextjs](https://nextjsorg/) 14 y [Capacitor](https://capacitorjscom/) en 2024 aprovechando las últimas versiones. Con estas tecnologías, puede crear aplicaciones móviles de alto rendimiento y ricas funciones con facilidad. También demostraremos cómo mejorar la interfaz de usuario móvil usando [Konsta UI](https://konstauicom/) y Tailwind CSS, aunque este paso es opcional

Nextjs, un marco popular de React, proporciona una base sólida para crear aplicaciones web, mientras que Capacitor le permite transformar su aplicación Nextjs en una aplicación móvil nativa sin modificaciones significativas o la necesidad de aprender nuevas habilidades como React Native. Este tutorial lo guiará a través del proceso, comenzando con la configuración de una nueva aplicación Nextjs y la integración de Capacitor para crear una experiencia móvil nativa

### Beneficios de usar Nextjs y Capacitor

- **Reutilización de código**: Nextjs le permite escribir componentes reutilizables y compartir código entre sus aplicaciones web y móviles, ahorrando tiempo y esfuerzo de desarrollo.
- **Rendimiento**: Nextjs ofrece optimizaciones de rendimiento integradas, como renderizado del lado del servidor y división de código, lo que garantiza tiempos de carga rápidos y una experiencia de usuario fluida.
- **Capacidades nativas**: Capacitor proporciona acceso a funciones nativas del dispositivo como la cámara, la geolocalización y más, lo que le permite crear aplicaciones móviles ricas en funciones.
- **Desarrollo simplificado**: con Capacitor, puede desarrollar y probar su aplicación móvil utilizando tecnologías web familiares, lo que reduce la curva de aprendizaje y agiliza el proceso de desarrollo.

## Preparando tu aplicación Nextjs

Para comenzar, creemos una nueva aplicación Nextjs usando el comando `create-next-app`:

```shell
npx create-next-app@latest my-app
```

Este comando configurará un proyecto Nextjs en blanco con la configuración recomendada para la última versión.

A continuación, navegue hasta el directorio del proyecto:

```shell
cd my-app
```

Para crear una aplicación móvil nativa, necesitamos generar una exportación estática de nuestro proyecto Nextjs. Actualice el archivo `packagejson` para incluir un script para construir y exportar el proyecto:

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

La ejecución del comando `npm run static` puede generar errores debido a la incompatibilidad de optimización de la imagen. Para resolver esto, abra el archivo `nextconfigjs` y modifíquelo de la siguiente manera:

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

Ahora, ejecutar `npm run static` debería funcionar sin ningún problema y encontrará una nueva carpeta `out` en la raíz de su proyecto. Esta carpeta será utilizada por Capacitor en los próximos pasos.

## Agregar condensador a su aplicación Nextjs 14

Para empaquetar su aplicación Nextjs en un contenedor móvil nativo, siga estos pasos:

1 Instale la [CLI de condensadores](https://capacitorjscom/docs/cli/) como una dependencia de desarrollo:

```shell
npm install -D @capacitor/cli
```

2 Inicialice Capacitor en su proyecto Nextjs:

```shell
npx cap init
```

Durante el proceso de inicialización, puede presionar "Entrar" para aceptar los valores predeterminados para el nombre de la aplicación y el ID del paquete.

3 Instale los paquetes de condensadores necesarios:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4 Agregue las plataformas nativas:

```shell
npx cap add ios
npx cap add android
```

Capacitor creará carpetas para cada plataforma (`ios` y `android`) en la raíz de su proyecto. Estas carpetas contienen los proyectos nativos para iOS y Android, respectivamente.

Para acceder y compilar el proyecto de Android, necesita tener instalado [Android Studio](https://developerandroidcom/studio) Para el desarrollo de iOS, necesita una Mac con [Xcode](https://developerapplecom/xcode/) instalado

5 Configurar el condensador:

Abra el archivo `capacitorconfigts` y actualice la propiedad `webDir` para que apunte al directorio de salida de su compilación Nextjs:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6 Construya y sincronice su proyecto:

```shell
npm run static
npx cap sync
```

El comando `npm run static` construye su proyecto Nextjs y exporta los archivos estáticos, mientras que `npx cap sync` sincroniza el código web con las plataformas nativas.## Creación e implementación de aplicaciones nativas

Para crear e implementar su aplicación móvil nativa, siga estos pasos:
Para desarrollar aplicaciones de iOS, debe tener **Xcode** instalado y, para aplicaciones de Android, debe tener instalado **Android Studio**. Además, si planea distribuir su aplicación en la tienda de aplicaciones, debe inscribirse en el Programa de Desarrolladores de Apple para iOS y Google Play Console para Android

1 Abra los proyectos nativos:

Para iOS:
```shell
npx cap open ios
```

Para Android:
```shell
npx cap open android
```

2 Cree y ejecute la aplicación:

![android-studio-run](/android-studio-runwebp)

- En Android Studio, espere a que el proyecto esté listo y luego haga clic en el botón "Ejecutar" para implementar la aplicación en un dispositivo o emulador conectado.
![xcode-ejecutar](/xcode-runwebp)

- En Xcode, configure su cuenta de firma para implementar la aplicación en un dispositivo real. Si no ha hecho esto antes, Xcode lo guiará a través del proceso (tenga en cuenta que debe estar inscrito en el Programa de desarrolladores de Apple) Una vez configurado , haga clic en el botón "Reproducir" para ejecutar la aplicación en su dispositivo conectado

¡Felicidades! Ha implementado con éxito su aplicación web Nextjs en un dispositivo móvil.

<div class="mx-auto" style="ancho: 50%;">
  <img src="/nextjs-mobile-appwebp" alt="nextjs-mobile-app">
</div>
Pero espera, también hay una manera más rápida de hacer esto durante el desarrollo.

## Recarga en vivo del condensador

Durante el desarrollo, puede aprovechar la recarga en vivo para ver los cambios instantáneamente en su dispositivo móvil. Para habilitar esta función, siga estos pasos:

1 Encuentre su dirección IP local:

- En macOS, ejecute el siguiente comando en la terminal:
  ```shell
  ipconfig getifaddr en0
  ```

- En Windows, ejecute:
  ```shell
  ipconfig
  ```
  Busque la dirección IPv4 en la salida.

2 Actualice el archivo `capacitorconfigts` para incluir la configuración del servidor:

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

Reemplace `YOUR_IP_ADDRESS` con su dirección IP local

3 Aplique los cambios a su proyecto nativo:

```shell
npx cap copy
```

El comando `copiar` copia la carpeta web y los cambios de configuración al proyecto nativo sin actualizar todo el proyecto.

4 Reconstruya y ejecute la aplicación en su dispositivo usando Android Studio o Xcode

Ahora, cada vez que realice cambios en su aplicación Nextjs, la aplicación móvil se recargará automáticamente para reflejar esos cambios.

Nota: Si instala nuevos complementos o realiza cambios en archivos nativos, deberá reconstruir el proyecto nativo, ya que la recarga en vivo solo se aplica a los cambios de código web.

## Uso de complementos de condensadores

Los complementos de Capacitor le permiten acceder a funciones nativas del dispositivo desde su aplicación Nextjs. Exploremos cómo usar el [complemento para compartir] (https://capacitorjscom/docs/apis/share/) como ejemplo:

1 Instale el complemento Compartir:

```shell
npm i @capacitor/share
```

2 Actualice el archivo `pages/indexjs` para usar el complemento Compartir:

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

3 Sincronice los cambios con el proyecto nativo:

Como se mencionó anteriormente, al instalar nuevos complementos, debemos realizar una operación de sincronización y luego volver a implementar la aplicación en nuestro dispositivo. Para hacer esto, ejecute el siguiente comando:

```shell
npx cap sync
```

4 Reconstruya y ejecute la aplicación en su dispositivo

Ahora, cuando haces clic en "¡Compartir ahora!" , aparecerá el cuadro de diálogo para compartir nativo, que le permitirá compartir el contenido con otras aplicaciones

<div class="mx-auto" style="ancho: 50%;">
  <img src="/next-capacitor-sharewebp" alt="siguiente-capacitor-share">
</div>

Para que el botón parezca más compatible con dispositivos móviles, podemos agregar algo de estilo usando mi biblioteca de componentes de interfaz de usuario favorita para aplicaciones web: Nextjs (sin juego de palabras) 

## Agregar interfaz de usuario de Konsta

He trabajado durante años con [Ionic](https://ionicframeworkcom/) para crear increíbles aplicaciones multiplataforma y fue una de las mejores opciones durante años.
Pero ahora ya no lo recomiendo, es muy complicado integrarlo con Nextjs y realmente no vale la pena cuando ya lo tienes [tailwindcss](https://tailwindcsscom/)


Si desea una interfaz de usuario móvil realmente atractiva que se adapte al estilo específico de iOS y Android, le recomiendo Kosta UI.

Necesitas tener [tailwind ya instalado](https://tailwindcsscom/docs/guides/nextjs/) 
Para mejorar la interfaz de usuario móvil de su aplicación Nextjs, puede utilizar [Konsta UI](https://konstauicom/), una biblioteca de componentes de UI compatible con dispositivos móviles que se adapta al estilo de iOS y Android. Siga estos pasos para integrar Konsta UI:

1 Instale los paquetes necesarios:

```shell
npm i konsta
```

2 Actualice el archivo `tailwindconfigjs`:

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

3 Envuelva su aplicación con el componente `App` de Konsta UI en `pages/_appjs`:

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
### Página de ejemplo

Ahora, cuando todo esté configurado, podemos usar los componentes Konsta UI React en nuestras páginas Nextjs.

4 Actualice el archivo `pages/indexjs` para usar los componentes de Konsta UI:

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

5 Reinicie el servidor de desarrollo y reconstruya la aplicación.

Su aplicación Nextjs ahora debería tener una interfaz de usuario móvil de aspecto nativo impulsada por Konsta UI

## Optimización del rendimiento

Para garantizar un rendimiento óptimo de su aplicación Nextjs y Capacitor, considere las siguientes mejores prácticas:

- Minimizar el tamaño de la aplicación eliminando dependencias y activos no utilizados
- Optimice imágenes y otros archivos multimedia para reducir los tiempos de carga.
- Implementar carga diferida para componentes y páginas para mejorar el rendimiento de la carga inicial.
- Utilice la representación del lado del servidor (SSR) con Nextjs para mejorar la velocidad de carga de la aplicación y la optimización del motor de búsqueda (SEO)
- Aproveche las optimizaciones integradas de Capacitor, como el almacenamiento en caché de vistas web y la agrupación de aplicaciones.

## Conclusión

En este tutorial, exploramos cómo crear aplicaciones móviles nativas usando Nextjs y Capacitor. Aprovechando el poder de estas tecnologías, puede crear aplicaciones móviles de alto rendimiento y ricas funciones con facilidad.

Cubrimos los pasos para configurar una aplicación Nextjs, integrar Capacitor y crear e implementar la aplicación en dispositivos móviles. Además, analizamos el uso de complementos de Capacitor, la adición de Konsta UI para una interfaz de usuario móvil mejorada y técnicas de optimización del rendimiento.

Para llevar su aplicación Nextjs y Capacitor al siguiente nivel, considere explorar [Capgo](https://capgoapp/) para obtener actualizaciones en vivo sin interrupciones, lo que garantiza que sus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Si sigue las mejores prácticas y técnicas descritas en esta guía, estará bien equipado para crear impresionantes aplicaciones móviles nativas utilizando Nextjs y Capacitor.

## Recursos

- [Documentación de Nextjs](https://nextjsorg/docs)
- [Documentación del condensador](https://capacitorjscom/docs)
- [Documentación de la interfaz de usuario de Konsta] (https://konstauicom/docs)
- [Capgo - Actualizaciones en vivo para aplicaciones de condensadores](https://capgoapp/)

¡Feliz creación de aplicaciones!

Descubra cómo Capgo puede ayudarle a crear mejores aplicaciones más rápido [regístrese para obtener una cuenta gratuita](/regístrese/) hoy