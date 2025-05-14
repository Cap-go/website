---
slug: vue-mobile-app-capacitor
title: Construyendo aplicaciones móviles con Vue y Capacitor
description: >-
  Aprende a crear una aplicación móvil usando Vue, Capacitor y opcionalmente
  mejorar la interfaz de usuario con Konsta UI.
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
En este tutorial, te guiaremos a través del proceso de convertir una aplicación web de Vue en una aplicación móvil nativa usando Capacitor. Opcionalmente, también puedes mejorar tu interfaz de usuario móvil con Konsta UI, una biblioteca de interfaz de usuario móvil basada en Tailwind CSS.

## Acerca de Capacitor

Capacitor es una herramienta revolucionaria que te permite integrarlo fácilmente en cualquier proyecto web y convertir tu aplicación en una aplicación móvil nativa. Genera proyectos nativos de Xcode y Android Studio para ti y proporciona acceso a características nativas del dispositivo como la cámara a través de un puente JavaScript.

## Preparando tu aplicación Vue

Primero, crea una nueva aplicación Vue ejecutando el siguiente comando:

```shell
vue create my-app
cd my-app
npm install
```

Para preparar tu aplicación Vue para el despliegue móvil nativo, necesitarás exportar tu proyecto. Agrega un script en tu archivo **package.json** para construir y copiar el proyecto de Vue:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Después de ejecutar el comando `build`, deberías ver una nueva carpeta `dist` en el directorio raíz de tu proyecto. Esta carpeta será utilizada por Capacitor más adelante.

## Agregando Capacitor a tu aplicación Vue

Para convertir tu aplicación web de Vue en un contenedor móvil nativo, sigue estos pasos:

1. Instala la CLI de Capacitor como una dependencia de desarrollo y configúralo dentro de tu proyecto. Acepta los valores predeterminados para el nombre y el ID del paquete durante la configuración.

2. Instala el paquete principal y los paquetes relevantes para las plataformas iOS y Android.

3. Agrega las plataformas, y Capacitor creará carpetas para cada plataforma en la raíz de tu proyecto:

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

Ahora deberías ver nuevas carpetas **iOS** y **android** en tu proyecto de Vue.

Actualiza el archivo **capacitor.config.json** para apuntar **webDir** al resultado de tu comando de construcción:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Ahora, puedes construir tu proyecto de Vue y sincronizarlo con Capacitor:

```shell
npm run build
npx cap sync
```

## Construir y desplegar aplicaciones nativas

Para desarrollar aplicaciones iOS, necesitas tener Xcode instalado, y para aplicaciones Android, necesitas tener Android Studio instalado. Además, necesitas inscribirte en el Programa de Desarrolladores de Apple para iOS y en la Consola de Google Play para Android para distribuir tu aplicación en la tienda de aplicaciones.

Utiliza la CLI de Capacitor para abrir ambos proyectos nativos:

```shell
npx cap open ios
npx cap open android
```

Despliega tu aplicación en un dispositivo conectado usando Android Studio o Xcode.

## Recarga en vivo de Capacitor

Habilita la recarga en vivo en tu dispositivo móvil haciendo que la aplicación de Capacitor cargue el contenido desde una URL específica en tu red.

Encuentra tu dirección IP local y actualiza el archivo `capacitor.config.ts` con la IP y puerto correctos:

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

Aplica estos cambios copiándolos en tu proyecto nativo:

```shell
npx cap copy
```

Ahora, tu aplicación se recargará automáticamente y mostrará cambios cuando actualices tu aplicación Vue.

## Usando plugins de Capacitor

Instala un plugin de Capacitor, como el plugin de Compartir, y úsalo en tu aplicación Vue:

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

## Agregando Konsta UI

Para usar Konsta UI en tu aplicación Vue, necesitas tener [tailwind ya instalado](https://tailwindcss.com/docs/guides/vite/#vue) y para instalar el paquete:
Para usar Konsta UI en tu aplicación Vue, instala el paquete y modifica tu archivo `tailwind.config.js`:

```shell
npm i konsta
```

Envuelve tu aplicación con el componente `App` en el archivo `pages/_app.vue`, y utiliza componentes de Vue de Konsta UI en tus páginas de Vue.

## Conclusión

Capacitor es una excelente opción para construir aplicaciones nativas basadas en un proyecto web existente. Con la adición de Capgo, es aún más fácil agregar actualizaciones en vivo a tu aplicación, asegurando que tus usuarios siempre tengan acceso a las últimas funciones y correcciones de errores.

Descubre cómo Capgo puede ayudarte a construir mejores aplicaciones más rápido, [regístrate para obtener una cuenta gratuita](/register/) hoy.
