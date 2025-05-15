---
slug: create-offline-screen-in-vue-angular-react
title: >-
  Wie man einen Offline-Bildschirm in Vue-, Angular- und React-Anwendungen mit
  der Network-API und Capacitor erstellt
description: >-
  Impara come implementare uno schermo offline in applicazioni Vue, Angular o
  React utilizzando l'API di rete e Capacitor. Migliora l'esperienza dell'utente
  gestendo efficacemente gli scenari offline.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: Immagine di una persona che lavora al computer
keywords: >-
  Vue, Angular, React, offline screen, network API, Capacitor, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Tutorial
published: true
locale: it
next_blog: ''
---
# Cómo crear una pantalla sin conexión en Vue 3, Angular 14 o React

En este tutorial, aprenderemos cómo crear una pantalla sin conexión en aplicaciones de Vue 3, Angular 14 y React utilizando la API de Red. La API de Red proporciona información sobre la red y la conectividad, lo que nos permite manejar escenarios sin conexión y ofrecer una mejor experiencia al usuario.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes elementos:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## Configuración del proyecto

Primero, creemos un nuevo proyecto utilizando la herramienta de scaffolding respectiva para cada marco.

### Vue 3

Abre tu terminal y ejecuta el siguiente comando para crear un nuevo proyecto de Vue 3:

```shell
vue create offline-screen-vue3
```

Elige la configuración predeterminada y espera a que se cree el proyecto.

### Angular 14

Abre tu terminal y ejecuta el siguiente comando para crear un nuevo proyecto de Angular 14:

```shell
ng new offline-screen-angular14
```

Sigue las indicaciones, y cuando se te pregunte por características adicionales, selecciona "Routing" presionando la tecla **barra espaciadora**. Espera a que se cree el proyecto.

### React

Abre tu terminal y ejecuta el siguiente comando para crear un nuevo proyecto de React:

```shell
npx create-react-app offline-screen-react
```

Espera a que se cree el proyecto.

## Instalando la API de Red

Ahora, instalemos el paquete `@capacitor/network`, que proporciona la API de Red.

Abre tu terminal y navega a tu directorio de proyecto. Luego, ejecuta el siguiente comando para instalar el paquete:

```shell
npm install @capacitor/network
```

Para los proyectos de Capacitor, también ejecuta el siguiente comando para sincronizar los archivos del proyecto nativo:

```shell
npx cap sync
```

Asegúrate de tener instalado el CLI de Capacitor globalmente ejecutando:

```shell
npm install -g @capacitor/cli
```

## Implementando la pantalla sin conexión

A continuación, implementaremos la funcionalidad de la pantalla sin conexión en cada marco. Mostraremos un mensaje simple cuando el usuario esté sin conexión.

### Vue 3

En tu proyecto de Vue 3, abre el archivo `src/main.js` e importa el módulo `Network` de `@capacitor/network`:

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

En la plantilla de tu aplicación (`App.vue`), agrega un elemento `<div>` con un id de `offline-screen` para mostrar el mensaje de la pantalla sin conexión:

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

Ahora, cuando el usuario esté sin conexión, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a estar en línea, la pantalla sin conexión se ocultará.

### Angular 14

En tu proyecto de Angular 14, abre el archivo `src/app/app.component.ts` e importa el módulo `Network` de `@capacitor/network`:

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

En la plantilla de tu aplicación (`app.component.html`), agrega un elemento `<template>` con un id de `offline-screen` para mostrar el mensaje de la pantalla sin conexión:

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

Ahora, cuando el usuario esté sin conexión, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a estar en línea, la pantalla sin conexión se ocultará.

### React

En tu proyecto de React, abre el archivo `src/App.js` e importa el módulo `Network` de `@capacitor/network`:

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

Ahora, cuando el usuario esté sin conexión, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a estar en línea, la pantalla sin conexión se ocultará.

## Métodos y interfaces de soporte

La API de Red proporciona varios métodos e interfaces para ayudarte a manejar la conexión de red. Aquí hay algunos de los más importantes:

- [`getStatus()`](https://capacitorjs.com/docs/apis/network/#getstatus): Consulta el estado actual de la conexión de red.
- [`addListener('networkStatusChange', ...)`](https://capacitorjs.com/docs/apis/network/#addlistenernetworkstatuschange): Escucha los cambios en la conexión de red.
