---
slug: developing-cross-platform-apps-with-capacitorjs
title: 'Sviluppare app multipiattaforma con CapacitorJS: Una guida passo-passo'
description: >-
  Ucz się, jak tworzyć aplikacje wieloplatformowe za pomocą CapacitorJS z jedną
  bazą kodu JavaScript dla Androida, iOS i sieci (PWA).
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Sviluppo di App Cross-Platform
keywords: >-
  Capacitor, cross-platform, PWA, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: ''
---
En el mundo en evolución del desarrollo de aplicaciones móviles, el auge de las Aplicaciones Web Progresivas (PWAs) ha allanado el camino para nuevos entornos de ejecución multiplataforma. Estos entornos permiten que las aplicaciones basadas en la web estén presentes en las tiendas de aplicaciones sin depender únicamente del código nativo. Una de estas tecnologías que facilita esto es [**CapacitorJS**](https://capacitorjs.com/), que permite a los desarrolladores implementar un sitio web simple como una aplicación en Android, iOS y la web utilizando una sola base de código JavaScript. Este enfoque reduce significativamente los costos de desarrollo y aumenta la eficiencia de codificación.

Esta guía se centrará en crear una aplicación utilizando JavaScript puro sin ningún marco adicional. A pesar de los desafíos de encontrar recursos para el desarrollo de aplicaciones en JavaScript puro en 2021, estamos aquí para proporcionarte un tutorial integral sobre cómo construir tu aplicación y utilizar complementos nativos con CapacitorJS.

## ‣ Requisitos Previos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas:

- [**Node.js**](https://nodejs.org/en/) **(v14.16.1)** o superior
- **NPM (v7.6.2)** o superior
- [**Android Studio**](https://developer.android.com/studio/) para el desarrollo de aplicaciones Android
- [**Xcode**](https://apps.apple.com/de/app/xcode/id497799835/?mt=12) para el desarrollo de aplicaciones iOS (solo macOS)

> **Nota**: El desarrollo de aplicaciones iOS solo es posible en un dispositivo macOS.

## ‣ Configuración de Tu Proyecto Capacitor

Para crear una aplicación Capacitor, navega a la carpeta deseada y ejecuta el siguiente comando en tu terminal:

```
npm init @capacitor/app
```

Sigue las instrucciones para instalar el paquete y configurar tu proyecto. Con Capacitor v3, el directorio de tu proyecto debería verse así:

```
www/
  css/
    style.css
  js/
    capacitor-welcome.js
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
```

Con la configuración inicial completa, estás listo para continuar.

## ‣ Reestructuración del Proyecto

Usaremos Vite para agrupar nuestros archivos JavaScript, así que reestructuremos nuestro proyecto en consecuencia:

- **Crea** una nueva carpeta `src` en el directorio principal.
- **Crea** un nuevo archivo de script `index.js` en `src/`.
- **Crea** el archivo de configuración de Vite `vite.config.js` en el directorio principal.
- **Elimina** el archivo `capacitor-welcome.js` de `www/js/`.

Tu nueva estructura de carpetas debería parecerse a:

```
src/
  index.js
www/
  css/
    style.css
  js/
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
vite.config.js
```

## ‣ Adaptándonos a JavaScript Puro

Modifiquemos algunos archivos para trabajar con JavaScript puro:

## www/index.html

1. Elimina las importaciones de script para [**Ionic PWA Elements**](https://capacitorjs.com/docs/web/pwa-elements/) si no estás lanzando la aplicación como una PWA:

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2. Elimina el elemento HTML `<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">` del cuerpo.

3. Actualiza la importación del script de `capacitor.js` a `js/main.js`. Este será nuestro archivo JavaScript agrupado.

4. Elimina la importación de `js/capacitor-welcome.js`. Tu `index.html` ya está listo.

## vite.config.js

Para agrupar nuestros módulos de Node.js con [**Vite**](https://vitejs.dev/), necesitamos un archivo de configuración que especifique el destino de salida para nuestro script agrupado. La siguiente configuración tomará el archivo `src/index.js` y lo agrupará para producción como `www/js/main.js`:

```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'www'),
    rollupOptions: {
      input: './src/index.js',
      output: {
        format: 'es',
        file: path.resolve(__dirname, 'www/js/main.js')
      }
    }
  }
});
```

## capacitor.config.json

En el archivo `capacitor.config.json`, localiza la propiedad `"bundledWebRuntime": true` y cámbiala a `false`. Este ajuste asegura que Capacitor no agrupe los archivos, permitiéndonos usar Vite para ese propósito en su lugar.

Con estos cambios, la configuración básica de tu aplicación Capacitor está completa, y estás listo para comenzar a desarrollar tu aplicación con JavaScript puro.

## ‣ Desarrollando Tu Aplicación

Ahora que se ha establecido la base, puedes comenzar a escribir la lógica de tu aplicación en el archivo `src/index.js`. Aquí, puedes importar cualquier módulo de Node.js necesario, definir la funcionalidad de tu aplicación e interactuar con los complementos nativos de Capacitor.

Recuerda ejecutar el comando de build de Vite para agrupar tus archivos JavaScript cada vez que realices cambios:

```bash
vite build
```

Este comando generará el archivo `main.js` en tu directorio `www/js`, al que hará referencia tu archivo `index.html`.

## ‣ Pruebas y Depuración

Capacitor proporciona una forma conveniente de probar tu aplicación en varias plataformas. Usa los siguientes comandos para abrir tu aplicación en el entorno de desarrollo de la plataforma respectiva:

Para Android:
```bash
npx cap add android
npx cap open android
```

Para iOS (solo macOS):
```bash
npx cap add ios
npx cap open ios
```

Para Web/PWA:
```bash
npx cap serve
```

Estos comandos te permitirán ejecutar tu aplicación en Android Studio, Xcode o tu navegador web, donde podrás probar y depurar según sea necesario.

## ‣ Conclusión

Desarrollar aplicaciones multiplataforma con CapacitorJS utilizando JavaScript puro es una forma rentable y eficiente de crear aplicaciones para múltiples plataformas con una sola base de código. Al seguir esta guía, has configurado tu proyecto, lo has reestructurado para Vite y has preparado tu aplicación para el desarrollo. Con esta base, estás bien encaminado para construir una aplicación robusta y versátil.

Recuerda probar a fondo en todas las plataformas y hacer uso de los complementos nativos de Capacitor para mejorar la funcionalidad de tu aplicación. ¡Feliz codificación!
