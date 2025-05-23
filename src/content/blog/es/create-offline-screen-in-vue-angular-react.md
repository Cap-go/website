---
slug: create-offline-screen-in-vue-angular-react
title: >-
  Cómo Crear una Pantalla Sin Conexión en Aplicaciones Vue, Angular y React
  usando la API de Red y Capacitor
description: >-
  Aprende cómo implementar una pantalla sin conexión en aplicaciones Vue,
  Angular o React utilizando la API de red y Capacitor. Mejora la experiencia
  del usuario manejando escenarios sin conexión de manera efectiva.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: Imagen de una persona trabajando en una computadora
keywords: >-
  Vue, Angular, React, offline screen, network API, Capacitor, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Tutorial
published: true
locale: es
next_blog: ''
---
# Cómo Crear una Pantalla Sin Conexión en Vue 3, Angular 14 o React

En este tutorial, aprenderemos cómo crear una pantalla sin conexión en aplicaciones Vue 3, Angular 14 y React utilizando la API de Red. La API de Red proporciona información de red y conectividad, permitiéndonos manejar escenarios sin conexión y proporcionar una mejor experiencia de usuario.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## Configuración del Proyecto

Primero, vamos a crear un nuevo proyecto utilizando la herramienta de scaffolding correspondiente para cada framework.

### Vue 3

Abre tu terminal y ejecuta el siguiente comando para crear un nuevo proyecto Vue 3:

```shell
vue create offline-screen-vue3
```

Elige el preset predeterminado y espera a que se cree el proyecto.

### Angular 14

Abre tu terminal y ejecuta el siguiente comando para crear un nuevo proyecto Angular 14:

```shell
ng new offline-screen-angular14
```

Sigue las indicaciones y cuando se te pregunte por características adicionales, selecciona "Routing" presionando la tecla **espaciadora**. Espera a que se cree el proyecto.

### React

Abre tu terminal y ejecuta el siguiente comando para crear un nuevo proyecto React:

```shell
npx create-react-app offline-screen-react
```

Espera a que se cree el proyecto.

## Instalando la API de Red

Ahora, vamos a instalar el paquete `@capacitor/network`, que proporciona la API de Red.

Abre tu terminal y navega hasta el directorio de tu proyecto. Luego, ejecuta el siguiente comando para instalar el paquete:

```shell
npm install @capacitor/network
```

Para proyectos Capacitor, también ejecuta el siguiente comando para sincronizar los archivos del proyecto nativo:

```shell
npx cap sync
```

Asegúrate de tener el CLI de Capacitor instalado globalmente ejecutando:

```shell
npm install -g @capacitor/cli
```

## Implementando la Pantalla Sin Conexión

A continuación, implementaremos la funcionalidad de pantalla sin conexión en cada framework. Mostraremos un mensaje simple cuando el usuario se quede sin conexión.

### Vue 3

En tu proyecto Vue 3, abre el archivo `src/main.js` e importa el módulo `Network` desde `@capacitor/network`:

```javascript
import { createApp } from 'vue';
import { Network } from '@capacitor/network';

const app = createApp(App);

// Your application setup

app.mount('#app');

Network.addListener('networkStatusChange', status => {
  if (status.connected) {
    // User is back online
    // Hide the offline screen
    document.getElementById('offline-screen').style.display = 'none';
  } else {
    // User is offline
    // Display the offline screen
    document.getElementById('offline-screen').style.display = 'block';
  }
});

const logCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();
  console.log('Network status:', status);
};
```

En tu plantilla de aplicación (`App.vue`), agrega un elemento `<div>` con un id de `offline-screen` para mostrar el mensaje de pantalla sin conexión:

```html
<template>
  <div id="app">
    <div id="offline-screen">
      <h1>You are offline</h1>
      <p>Please check your internet connection and try again.</p>
    </div>
    <!-- Your application content -->
  </div>
</template>

<style>
#offline-screen {
  display: none;
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
}

#offline-screen h1 {
  font-size: 24px;
}

#offline-screen p {
  font-size: 16px;
}
</style>
```

Ahora, cuando el usuario se quede sin conexión, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a estar en línea, la pantalla sin conexión se ocultará.

### Angular 14

En tu proyecto Angular 14, abre el archivo `src/app/app.component.ts` e importa el módulo `Network` desde `@capacitor/network`:

```typescript
import { Component } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    Network.addListener('networkStatusChange', status => {
      if (status.connected) {
        // User is back online
        // Hide the offline screen
        document.getElementById('offline-screen').style.display = 'none';
      } else {
        // User is offline
        // Display the offline screen
        document.getElementById('offline-screen').style.display = 'block';
      }
    });
  }

  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    console.log('Network status:', status);
  };

}
```

En tu plantilla de aplicación (`app.component.html`), agrega un elemento `<template>` con un id de `offline-screen` para mostrar el mensaje de pantalla sin conexión:

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Agrega los siguientes estilos al archivo `app.component.css`:

```css
#offline-screen {
  display: none;
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
}

#offline-screen h1 {
  font-size: 24px;
}

#offline-screen p {
  font-size: 16px;
}
```

Ahora, cuando el usuario se quede sin conexión, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a estar en línea, la pantalla sin conexión se ocultará.

### React

En tu proyecto React, abre el archivo `src/App.js` e importa el módulo `Network` desde `@capacitor/network`:

```jsx
import React, { useEffect } from 'react'
import { Network } from '@capacitor/network'

function App() {

  useEffect(() => {
    Network.addListener('networkStatusChange', (status) => {
      if (status.connected) {
        // User is back online
        // Hide the offline screen
        document.getElementById('offline-screen').style.display = 'none'
      }
      else {
        // User is offline
        // Display the offline screen
        document.getElementById('offline-screen').style.display = 'block'
      }
    })
  }, [])

  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus()
    console.log('Network status:', status)
  }

  return (
    <div id="app">
      <div id='offline-screen'>
        <h1>You are offline</h1>
        <p>Please check your internet connection and try again.</p>
      </div>
      {/* Your application content */}
    </div>
  )

}

export default App
```

Agrega los siguientes estilos al archivo `App.css`:

```css
#offline-screen {
  display: none;
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
}

#offline-screen h1 {
  font-size: 24px;
}

#offline-screen p {
  font-size: 16px;
}
```

Ahora, cuando el usuario se quede sin conexión, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a estar en línea, la pantalla sin conexión se ocultará.

## Métodos e Interfaces de Soporte

La API de Red proporciona varios métodos e interfaces para ayudarte a manejar la conexión de red. Aquí están algunos de los principales:

- [`getStatus()`](https://capacitorjs.com/docs/apis/network/#getstatus): Consulta el estado actual de la conexión de red.
- [`addListener('networkStatusChange', ...)`](https://capacitorjs.com/docs/apis/network/#addlistenernetworkstatuschange): Escucha cambios en la conexión de red.
-
