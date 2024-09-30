---
slug: vue-mobile-app-capacitor
title: Creación de aplicaciones móviles con Vue y Capacitor
description: >-
  Aprenda a crear una aplicación móvil usando Vue, Capacitor y, opcionalmente,
  mejore la interfaz de usuario con Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Vue and Capacitor illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

En este tutorial, lo guiaremos a través del proceso de convertir una aplicación web Vue en una aplicación móvil nativa usando Capacitor. Opcionalmente, también puede mejorar su interfaz de usuario móvil con Konsta UI, una biblioteca de interfaz de usuario móvil basada en Tailwind CSS.

## Acerca del condensador

Capacitor es una herramienta revolucionaria que le permite integrarla fácilmente en cualquier proyecto web y convertir su aplicación en una aplicación móvil nativa. Genera proyectos nativos de Xcode y Android Studio para usted y proporciona acceso a funciones nativas del dispositivo, como la cámara, a través de JavaScript. puente

## Preparando tu aplicación Vue

Primero, cree una nueva aplicación Vue ejecutando el siguiente comando:

```shell
vue create my-app
cd my-app
npm install
```

Para preparar su aplicación Vue para la implementación móvil nativa, deberá exportar su proyecto. Agregue un script en su archivo **packagejson** para compilar y copiar el proyecto Vue:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Después de ejecutar el comando `build`, deberías ver una nueva carpeta `dist` en el directorio raíz de tu proyecto. Esta carpeta será utilizada por Capacitor más adelante.

## Agregar condensador a su aplicación Vue

Para convertir su aplicación web Vue en un contenedor móvil nativo, siga estos pasos:

1 Instale Capacitor CLI como una dependencia de desarrollo y configúrelo dentro de su proyecto. Acepte los valores predeterminados para el nombre y el ID del paquete durante la configuración.

2 Instale el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

3 Agregue las plataformas y Capacitor creará carpetas para cada plataforma en la raíz de su proyecto:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Ahora deberías ver nuevas carpetas **iOS** y **android** en tu proyecto Vue

Actualice el archivo **capacitorconfigjson** para que **webDir** apunte al resultado de su comando de compilación:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Ahora puedes construir tu proyecto Vue y sincronizarlo con Capacitor:

```shell
npm run build
npx cap sync
```

## Cree e implemente aplicaciones nativas

Para desarrollar aplicaciones de iOS, necesita tener instalado Xcode y, para aplicaciones de Android, necesita tener instalado Android Studio. Además, debe inscribirse en el Programa de desarrolladores de Apple para iOS y en Google Play Console para Android para distribuir su aplicación en la tienda de aplicaciones.

Utilice la CLI de Capacitor para abrir ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Implemente su aplicación en un dispositivo conectado usando Android Studio o Xcode

## Recarga en vivo del condensador

Habilite la recarga en vivo en su dispositivo móvil haciendo que la aplicación Capacitor cargue el contenido desde una URL específica en su red

Encuentre su dirección IP local y actualice el archivo `capacitorconfigts` con la IP y el puerto correctos:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

Aplique estos cambios copiándolos en su proyecto nativo:

```shell
npx cap copy
```

Ahora, su aplicación se recargará automáticamente y mostrará los cambios cuando actualice su aplicación Vue

## Uso de complementos de condensadores

Instale un complemento de Capacitor, como el complemento Compartir, y utilícelo en su aplicación Vue:

```shell
npm i @capacitor/share
```

Importe el paquete y llame a la función `share()` en su aplicación:

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

Después de instalar nuevos complementos, ejecute el comando `sync` y vuelva a implementar la aplicación en su dispositivo:

```
npx cap sync
```

## Agregar interfaz de usuario de Konsta

Para usar Konsta UI en su aplicación Vue, necesita tener [tailwind ya instalado](https://tailwindcsscom/docs/guides/vite/#vue) e instalar el paquete:
Para usar Konsta UI en su aplicación Vue, instale el paquete y modifique su archivo `tailwindconfigjs`:

```shell
npm i konsta
```

Envuelva su aplicación con el componente `App` en el archivo `pages/_appvue` y use los componentes Konsta UI Vue en sus páginas Vue

## Conclusión

Capacitor es una excelente opción para crear aplicaciones nativas basadas en un proyecto web existente. Con la incorporación de Capgo, es aún más fácil agregar actualizaciones en vivo a su aplicación, lo que garantiza que sus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Descubra cómo Capgo puede ayudarle a crear mejores aplicaciones más rápido [regístrese para obtener una cuenta gratuita](/regístrese/) hoy