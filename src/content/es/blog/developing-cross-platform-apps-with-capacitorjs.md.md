---
slug: developing-cross-platform-apps-with-capacitorjs
title: >-
  Desarrollador de aplicaciones multiplataforma con CapacitorJS: una guía paso a
  paso
description: >-
  Descubra cómo crear aplicaciones multiplataforma con la ayuda de CapacitorJS
  con una base de código JavaScript única para Android, iOS y Web (PWA).
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Cross-Platform App Development
tag: Tuto
published: true
next_blog: ''
locale: es
---

En el cambiante mundo del desarrollo de aplicaciones móviles, el auge de las aplicaciones web progresivas (PWA) ha allanado el camino para nuevos tiempos de ejecución multiplataforma. Estos tiempos de ejecución permiten que las aplicaciones basadas en web estén presentes en las tiendas de aplicaciones sin depender únicamente del código nativo. Una de esas tecnologías que facilita esto es [**CapacitorJS**](https://capacitorjscom/), que permite a los desarrolladores implementar un sitio web simple como una aplicación en Android, iOS y la web utilizando una única base de código JavaScript. Este enfoque reduce significativamente los costos de desarrollo. y aumenta la eficiencia de la codificación

Esta guía se centrará en la creación de una aplicación utilizando JavaScript puro sin marcos adicionales. A pesar de los desafíos de encontrar recursos para el desarrollo de aplicaciones JavaScript puro en 2021, estamos aquí para brindarle un tutorial completo sobre cómo crear su aplicación y utilizar complementos nativos con CapacitorJS.

## ‣ Requisitos previos

Antes de comenzar, asegúrese de tener instaladas las siguientes herramientas:

- [**Nodejs**](https://nodejsorg/en/) **(v14161)** o superior
- **NPM (v762)** o superior
- [**Android Studio**](https://developerandroidcom/studio/) para el desarrollo de aplicaciones de Android
- [**Xcode**](https://appsapplecom/de/app/xcode/id497799835/?mt=12) para desarrollo de aplicaciones iOS (solo macOS)

> **Nota**: el desarrollo de aplicaciones iOS solo es posible en un dispositivo macOS

## ‣ Configuración de su proyecto de condensador

Para crear una aplicación Capacitor, navegue hasta la carpeta deseada y ejecute el siguiente comando en su terminal:

```
npm init @capacitor/app
```

Siga las instrucciones para instalar el paquete y configurar su proyecto. Con Capacitor v3, el directorio de su proyecto debería verse así:

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

Una vez completada la configuración inicial, estás listo para continuar.

## ‣ Reestructuración de Proyectos

Usaremos Vite para agrupar nuestros archivos JavaScript, así que reestructuraremos nuestro proyecto en consecuencia:

- **Crea** una nueva carpeta `src` en el directorio principal
- **Crea** un nuevo archivo de script `indexjs` en `src/`
- **Crea** el archivo de configuración de Vite `viteconfigjs` en el directorio principal
- **Eliminar** el archivo `capacitor-welcomejs` de `www/js/`

Su nueva estructura de carpetas debería parecerse a:

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

## ‣ Adaptación a JavaScript puro

Modifiquemos algunos archivos para que funcionen con JavaScript puro:

##www/indexhtml

1 Elimine las importaciones de secuencias de comandos para [**Ionic PWA Elements**](https://capacitorjscom/docs/web/pwa-elements/) si no va a lanzar la aplicación como PWA:

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2 Elimine el elemento HTML `<capacitor-welcome>` del cuerpo

3 Actualice la importación del script de `capacitorjs` a `js/mainjs`. Este será nuestro archivo JavaScript incluido.

4 Elimina la importación `js/capacitor-welcomejs`. Tu `indexhtml` ya está listo

##viteconfigjs

Para agrupar nuestros módulos Nodejs con [**Vite**](https://vitejsdev/), necesitamos un archivo de configuración que especifique el destino de salida para nuestro script incluido. La siguiente configuración tomará el archivo `src/indexjs` y lo empaquetará para producción como `www/js/mainjs`:

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

## condensadorconfigjson

En el archivo `capacitorconfigjson`, ubique la propiedad `"bundledWebRuntime": true` y cámbiela a `false`. Este ajuste garantiza que Capacitor no empaquete los archivos, permitiéndonos usar Vite para ese propósito.

Con estos cambios, la configuración básica de su aplicación Capacitor está completa y está listo para comenzar a desarrollar su aplicación con JavaScript puro.

## ‣ Desarrollando tu aplicación

Ahora que se han sentado las bases, puede comenzar a escribir la lógica de su aplicación en el archivo `src/indexjs`. Aquí puede importar cualquier módulo Nodejs necesario, definir la funcionalidad de su aplicación e interactuar con los complementos nativos de Capacitor.

Recuerde ejecutar el comando de compilación de Vite para agrupar sus archivos JavaScript cada vez que realice cambios:

```bash
vite build
```

Este comando generará el archivo `mainjs` en su directorio `www/js`, al que hará referencia su archivo `indexhtml`

## ‣ Pruebas y depuración

Capacitor proporciona una manera conveniente de probar su aplicación en varias plataformasUtilice los siguientes comandos para abrir su aplicación en el entorno de desarrollo de la plataforma respectiva:

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

Estos comandos le permitirán ejecutar su aplicación en Android Studio, Xcode o su navegador web, donde podrá probar y depurar según sea necesario.

## ‣ Conclusión

Desarrollar aplicaciones multiplataforma con CapacitorJS utilizando JavaScript puro es una forma rentable y eficiente de crear aplicaciones para múltiples plataformas con una única base de código. Al seguir esta guía, habrá configurado su proyecto, lo reestructurará para Vite y preparará su aplicación. para el desarrollo Con esta base, estará en el camino correcto para crear una aplicación sólida y versátil.

Recuerde realizar pruebas exhaustivas en todas las plataformas y utilizar los complementos nativos de Capacitor para mejorar la funcionalidad de su aplicación. ¡Feliz codificación!