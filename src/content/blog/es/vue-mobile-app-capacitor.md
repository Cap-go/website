---
slug: vue-mobile-app-capacitor
title: Créer des Applications Mobiles avec Vue et Capacitor
description: >-
  Aprende cómo crear una aplicación móvil usando Vue, Capacitor y,
  opcionalmente, mejora la interfaz de usuario con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Ilustración de Vue y Capacitor
keywords: >-
  Vue, Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

En este tutorial, te guiaremos a través del proceso de convertir una aplicación web Vue en una aplicación móvil nativa usando Capacitor. Opcionalmente, también puedes mejorar tu interfaz móvil con Konsta UI, una biblioteca de interfaz móvil basada en Tailwind CSS.

## Acerca de Capacitor

Capacitor es una herramienta revolucionaria que te permite integrarlo fácilmente en cualquier proyecto web y convertir tu aplicación en una aplicación móvil nativa. Genera proyectos nativos de Xcode y Android Studio para ti y proporciona acceso a funciones nativas del dispositivo como la cámara a través de un puente JavaScript.

## Preparando Tu Aplicación Vue

Primero, crea una nueva aplicación Vue ejecutando el siguiente comando:

```shell
vue create my-app
cd my-app
npm install
```

Para preparar tu aplicación Vue para el despliegue móvil nativo, necesitarás exportar tu proyecto. Añade un script en tu archivo **package.json** para construir y copiar el proyecto Vue:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Después de ejecutar el comando `build`, deberías ver una nueva carpeta `dist` en el directorio raíz de tu proyecto. Esta carpeta será utilizada por Capacitor más adelante.

## Añadiendo Capacitor a Tu Aplicación Vue

Para convertir tu aplicación web Vue en un contenedor móvil nativo, sigue estos pasos:

1. Instala el CLI de Capacitor como dependencia de desarrollo y configúralo dentro de tu proyecto. Acepta los valores predeterminados para el nombre y el ID del paquete durante la configuración.

2. Instala el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

3. Añade las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de tu proyecto:

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

Ahora deberías ver nuevas carpetas **ios** y **android** en tu proyecto Vue.

Actualiza el archivo **capacitor.config.json** para que el **webDir** apunte al resultado de tu comando de construcción:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Ahora, puedes construir tu proyecto Vue y sincronizarlo con Capacitor:

```shell
npm run build
npx cap sync
```

## Construir y Desplegar Aplicaciones Nativas

Para desarrollar aplicaciones iOS, necesitas tener Xcode instalado, y para aplicaciones Android, necesitas Android Studio instalado. Además, necesitas inscribirte en el Apple Developer Program para iOS y en la Google Play Console para Android para distribuir tu aplicación en la tienda de aplicaciones.

Usa el CLI de Capacitor para abrir ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Despliega tu aplicación en un dispositivo conectado usando Android Studio o Xcode.

## Recarga en Vivo de Capacitor

Habilita la recarga en vivo en tu dispositivo móvil haciendo que la aplicación Capacitor cargue el contenido desde una URL específica en tu red.

Encuentra tu dirección IP local y actualiza el archivo `capacitor.config.ts` con la IP y el puerto correctos:

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

Aplica estos cambios copiándolos a tu proyecto nativo:

```shell
npx cap copy
```

Ahora, tu aplicación se recargará automáticamente y mostrará los cambios cuando actualices tu aplicación Vue.

## Usando Plugins de Capacitor

Instala un plugin de Capacitor, como el plugin Share, y úsalo en tu aplicación Vue:

```shell
npm i @capacitor/share
```

Importa el paquete y llama a la función `share()` en tu aplicación:

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

Después de instalar nuevos plugins, ejecuta el comando `sync` y vuelve a desplegar la aplicación en tu dispositivo:

```
npx cap sync
```

## Añadiendo Konsta UI

Para usar Konsta UI en tu aplicación Vue, necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/guides/vite/#vue) y para instalar el paquete:
Para usar Konsta UI en tu aplicación Vue, instala el paquete y modifica tu archivo `tailwind.config.js`:

```shell
npm i konsta
```

Envuelve tu aplicación con el componente `App` en el archivo `pages/_app.vue`, y usa los componentes Vue de Konsta UI en tus páginas Vue.

## Conclusión

Capacitor es una gran opción para construir aplicaciones nativas basadas en un proyecto web existente. Con la adición de Capgo, es aún más fácil añadir actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas características y correcciones de errores.

Aprende cómo Capgo puede ayudarte a construir mejores aplicaciones más rápido, [regístrate para obtener una cuenta gratuita](/register/) hoy.