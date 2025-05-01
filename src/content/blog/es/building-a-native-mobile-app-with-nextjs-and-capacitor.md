---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  Construction d'Applications Mobiles Natives avec Next.js 14 et Capacitor : Un
  Guide Étape par Étape 2024
description: >-
  Découvrez dans ce guide complet comment créer une application mobile native
  avec Next.js 14 et Capacitor. Apprenez les meilleures pratiques et les
  techniques les plus récentes pour développer des applications mobiles robustes
  et riches en fonctionnalités.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Ilustración de Next.js 14 y Capacitor
keywords: >-
  Next.js 14, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introducción

En este tutorial, exploraremos cómo crear aplicaciones móviles nativas utilizando la poderosa combinación de [Nextjs](https://nextjsorg/) 14 y [Capacitor](https://capacitorjscom/) en 2024. Aprovechando las últimas versiones de estas tecnologías, puedes construir aplicaciones móviles de alto rendimiento y ricas en funcionalidades con facilidad. También demostraremos cómo mejorar la interfaz móvil usando [Konsta UI](https://konstauicom/) y Tailwind CSS, aunque este paso es opcional.

Nextjs, un popular framework de React, proporciona una base sólida para construir aplicaciones web, mientras que Capacitor te permite transformar tu aplicación Nextjs en una aplicación móvil nativa sin modificaciones significativas o la necesidad de aprender nuevas habilidades como React Native. Este tutorial te guiará a través del proceso, comenzando con la configuración de una nueva aplicación Nextjs e integrando Capacitor para crear una experiencia móvil nativa.

### Beneficios de Usar Nextjs y Capacitor

- **Reutilización de Código**: Nextjs te permite escribir componentes reutilizables y compartir código entre tus aplicaciones web y móviles, ahorrando tiempo y esfuerzo en el desarrollo.
- **Rendimiento**: Nextjs ofrece optimizaciones de rendimiento incorporadas, como renderizado del lado del servidor y división de código, asegurando tiempos de carga rápidos y una experiencia de usuario fluida.
- **Capacidades Nativas**: Capacitor proporciona acceso a características nativas del dispositivo como la cámara, geolocalización y más, permitiéndote construir aplicaciones móviles ricas en funcionalidades.
- **Desarrollo Simplificado**: Con Capacitor, puedes desarrollar y probar tu aplicación móvil usando tecnologías web familiares, reduciendo la curva de aprendizaje y agilizando el proceso de desarrollo.

## Preparando Tu Aplicación Nextjs

Para comenzar, vamos a crear una nueva aplicación Nextjs usando el comando `create-next-app`:

```shell
npx create-next-app@latest my-app
```

Este comando configurará un proyecto Nextjs en blanco con la configuración recomendada para la última versión.

Luego, navega al directorio del proyecto:

```shell
cd my-app
```

Para crear una aplicación móvil nativa, necesitamos generar una exportación estática de nuestro proyecto Nextjs. Actualiza el archivo `package.json` para incluir un script para construir y exportar el proyecto:

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

Ejecutar el comando `npm run static` puede resultar en errores debido a incompatibilidad con la optimización de imágenes. Para resolverlo, abre el archivo `next.config.js` y modifícalo de la siguiente manera:

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

Ahora, ejecutar `npm run static` debería funcionar sin problemas, y encontrarás una nueva carpeta `out` en la raíz de tu proyecto. Esta carpeta será utilizada por Capacitor en los siguientes pasos.

## Añadiendo Capacitor a Tu Aplicación Nextjs 14

Para empaquetar tu aplicación Nextjs en un contenedor móvil nativo, sigue estos pasos:

1. Instala el [Capacitor CLI](https://capacitorjscom/docs/cli/) como dependencia de desarrollo:

```shell
npm install -D @capacitor/cli
```

2. Inicializa Capacitor en tu proyecto Nextjs:

```shell
npx cap init
```

Durante el proceso de inicialización, puedes presionar "Enter" para aceptar los valores predeterminados para el nombre de la aplicación y el ID del paquete.

3. Instala los paquetes requeridos de Capacitor:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Añade las plataformas nativas:

```shell
npx cap add ios
npx cap add android
```

Capacitor creará carpetas para cada plataforma (`ios` y `android`) en la raíz de tu proyecto. Estas carpetas contienen los proyectos nativos para iOS y Android, respectivamente.

Para acceder y construir el proyecto Android, necesitas tener instalado [Android Studio](https://developerandroidcom/studio). Para desarrollo iOS, necesitas una Mac con [Xcode](https://developerapplecom/xcode/) instalado.

5. Configura Capacitor:

Abre el archivo `capacitor.config.ts` y actualiza la propiedad `webDir` para que apunte al directorio de salida de tu build de Nextjs:

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

El comando `npm run static` construye tu proyecto Nextjs y exporta los archivos estáticos, mientras que `npx cap sync` sincroniza el código web con las plataformas nativas.## Construyendo y Desplegando Aplicaciones Nativas

Para construir y desplegar tu aplicación móvil nativa, sigue estos pasos:
Para desarrollar aplicaciones iOS, necesitas tener **Xcode** instalado, y para aplicaciones Android, necesitas tener **Android Studio** instalado. Además, si planeas distribuir tu aplicación en la tienda de aplicaciones, necesitas inscribirte en el Programa de Desarrollador de Apple para iOS y en la Google Play Console para Android.

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

![android-studio-run](/android-studio-runwebp)

- En Android Studio, espera a que el proyecto esté listo y luego haz clic en el botón "Run" para desplegar la aplicación en un dispositivo conectado o emulador
![xcode-run](/xcode-runwebp)

- En Xcode, configura tu cuenta de firma para desplegar la aplicación en un dispositivo real. Si no lo has hecho antes, Xcode te guiará a través del proceso (ten en cuenta que necesitas estar inscrito en el Programa de Desarrollador de Apple). Una vez configurado, haz clic en el botón "Play" para ejecutar la aplicación en tu dispositivo conectado

¡Felicitaciones! Has desplegado exitosamente tu aplicación web Nextjs en un dispositivo móvil

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Pero espera, también hay una forma más rápida de hacer esto durante el desarrollo

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
  Busca la dirección IPv4 en la salida

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

Reemplaza `YOUR_IP_ADDRESS` con tu dirección IP local

3. Aplica los cambios a tu proyecto nativo:

```shell
npx cap copy
```

El comando `copy` copia la carpeta web y los cambios de configuración al proyecto nativo sin actualizar todo el proyecto

4. Reconstruye y ejecuta la aplicación en tu dispositivo usando Android Studio o Xcode

Ahora, cuando hagas cambios en tu aplicación Nextjs, la aplicación móvil se recargará automáticamente para reflejar esos cambios

Nota: Si instalas nuevos plugins o haces cambios en archivos nativos, necesitarás reconstruir el proyecto nativo ya que la recarga en vivo solo se aplica a cambios en el código web

## Usando Plugins de Capacitor

Los plugins de Capacitor te permiten acceder a características nativas del dispositivo desde tu aplicación Nextjs. Veamos cómo usar el [plugin Share](https://capacitorjs.com/docs/apis/share/) como ejemplo:

1. Instala el plugin Share:

```shell
npm i @capacitor/share
```

2. Actualiza el archivo `pages/index.js` para usar el plugin Share:

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

Como se mencionó anteriormente, al instalar nuevos plugins, necesitamos realizar una operación de sincronización y luego redesplegar la aplicación en nuestro dispositivo. Para hacer esto, ejecuta el siguiente comando:

```shell
npx cap sync
```

4. Reconstruye y ejecuta la aplicación en tu dispositivo

Ahora, cuando hagas clic en el botón "Share now!", aparecerá el diálogo nativo de compartir, permitiéndote compartir el contenido con otras aplicaciones

<div className={styles.container}>
  <Head>
<title>

Para hacer que el botón se vea más amigable para móviles, podemos agregar algo de estilo usando mi biblioteca de componentes UI favorita para aplicaciones web - Nextjs (sin juego de palabras)

## Agregando Konsta UI

He trabajado años con [Ionic](https://ionicframework.com/) para construir increíbles aplicaciones multiplataforma y fue una de las mejores opciones durante años
Pero ahora no lo recomiendo más, es muy complicado integrarlo con Nextjs y no vale realmente la pena cuando ya tienes [tailwindcss](https://tailwindcss.com/)

Si quieres una UI móvil que se vea realmente bien y que se adapte al estilo específico de iOS y Android, recomiendo Konsta UI

Necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/guides/nextjs/)
Para mejorar la UI móvil de tu aplicación Nextjs, puedes usar [Konsta UI](https://konsta.ui.com/), una biblioteca de componentes UI amigable para móviles que se adapta al estilo de iOS y Android. Sigue estos pasos para integrar Konsta UI:

1.Instale los paquetes requeridos:

```shell
npm i konsta
```

2. Actualice el archivo `tailwind.config.js`:

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

3. Envuelva su aplicación con el componente `App` de Konsta UI en `pages/_app.js`:

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

Ahora que todo está configurado, podemos usar los componentes React de Konsta UI en nuestras páginas de Next.js

4. Actualice el archivo `pages/index.js` para usar componentes de Konsta UI:

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

5. Reinicie el servidor de desarrollo y reconstruya la aplicación

Su aplicación Next.js ahora debería tener una interfaz móvil de aspecto nativo impulsada por Konsta UI

## Optimización del Rendimiento

Para garantizar un rendimiento óptimo de su aplicación Next.js y Capacitor, considere las siguientes mejores prácticas:

- Minimice el tamaño de la aplicación eliminando dependencias y recursos no utilizados
- Optimice imágenes y otros archivos multimedia para reducir los tiempos de carga
- Implemente la carga diferida para componentes y páginas para mejorar el rendimiento de carga inicial
- Use renderizado del lado del servidor (SSR) con Next.js para mejorar la velocidad de carga de la aplicación y la optimización para motores de búsqueda (SEO)
- Aproveche las optimizaciones incorporadas de Capacitor, como el almacenamiento en caché de la vista web y el empaquetado de aplicaciones

## Conclusión

En este tutorial, exploramos cómo construir aplicaciones móviles nativas usando Next.js y Capacitor. Al aprovechar el poder de estas tecnologías, puede crear aplicaciones móviles de alto rendimiento y ricas en funciones con facilidad.

Cubrimos los pasos para configurar una aplicación Next.js, integrar Capacitor, y construir y desplegar la aplicación en dispositivos móviles. Además, discutimos el uso de plugins de Capacitor, la adición de Konsta UI para una interfaz móvil mejorada y técnicas de optimización de rendimiento.

Para llevar su aplicación Next.js y Capacitor al siguiente nivel, considere explorar [Capgo](https://capgo.app/) para actualizaciones en vivo sin problemas, asegurando que sus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Siguiendo las mejores prácticas y técnicas descritas en esta guía, estará bien equipado para construir impresionantes aplicaciones móviles nativas usando Next.js y Capacitor.

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Documentación de Konsta UI](https://konsta.ui.com/docs)
- [Capgo - Actualizaciones en vivo para aplicaciones Capacitor](https://capgo.app/)

¡Feliz desarrollo de aplicaciones!

Aprenda cómo Capgo puede ayudarlo a construir mejores aplicaciones más rápido, [regístrese para obtener una cuenta gratuita](/register/) hoy