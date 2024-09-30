---
slug: create-offline-screen-in-vue-angular-react
title: >-
  Cómo crear una pantalla sin conexión en aplicaciones Vue, Angular y React
  usando Network API y Capacitor
description: >-
  Aprenda a implementar una pantalla sin conexión en aplicaciones Vue, Angular o
  React utilizando Network API y Capacitor. Mejore la experiencia del usuario
  manejando escenarios fuera de línea de manera efectiva.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: Image of a person working on a computer
tag: Tutorial
published: true
next_blog: ''
locale: es
---

# Cómo crear una pantalla sin conexión en Vue 3, Angular 14 o React

En este tutorial, aprenderemos cómo crear una pantalla sin conexión en aplicaciones Vue 3, Angular 14 y React usando la API de red. La API de red proporciona información de red y conectividad, lo que nos permite manejar escenarios sin conexión y brindar una mejor experiencia de usuario.

## Requisitos previos

Antes de comenzar, asegúrese de tener instalado lo siguiente:

- [Nodejs](https://nodejsorg/) (versión 14 o superior)
-[Vue CLI](https://clivuejsorg/)
- [CLI angular](https://cliangulario/)
- [Crear aplicación React] (https://create-react-appdev/)

## Configuración del proyecto

Primero, creemos un nuevo proyecto usando la herramienta de andamiaje respectiva para cada marco.

### Vista 3

Abra su terminal y ejecute el siguiente comando para crear un nuevo proyecto de Vue 3:

```shell
vue create offline-screen-vue3
```

Elija el ajuste preestablecido predeterminado y espere a que se cree el proyecto

### Angular 14

Abra su terminal y ejecute el siguiente comando para crear un nuevo proyecto de Angular 14:

```shell
ng new offline-screen-angular14
```

Siga las indicaciones y, cuando se le soliciten funciones adicionales, seleccione "Enrutamiento" presionando la tecla **barra espaciadora**. Espere a que se cree el proyecto.

### Reaccionar

Abra su terminal y ejecute el siguiente comando para crear un nuevo proyecto de React:

```shell
npx create-react-app offline-screen-react
```

Espere a que se cree el proyecto.

## Instalación de la API de red

Ahora, instalemos el paquete `@capacitor/network`, que proporciona la API de red.

Abra su terminal y navegue hasta el directorio de su proyecto. Luego, ejecute el siguiente comando para instalar el paquete:

```shell
npm install @capacitor/network
```

Para proyectos de Capacitor, ejecute también el siguiente comando para sincronizar los archivos del proyecto nativo:

```shell
npx cap sync
```

Asegúrese de tener la CLI de Capacitor instalada globalmente ejecutando:

```shell
npm install -g @capacitor/cli
```

## Implementación de la pantalla sin conexión

A continuación, implementaremos la funcionalidad de pantalla sin conexión en cada marco. Mostraremos un mensaje simple cuando el usuario se desconecte.

### Vista 3

En su proyecto Vue 3, abra el archivo `src/mainjs` e importe el módulo `Network` desde `@capacitor/network`:

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

En la plantilla de su aplicación (`Appvue`), agregue un elemento `<div>` con una identificación de `offline-screen` para mostrar el mensaje de la pantalla sin conexión:

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

Ahora, cuando el usuario se desconecte, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a conectarse, la pantalla sin conexión se ocultará.

### Angular 14

En su proyecto Angular 14, abra el archivo `src/app/appcomponentts` e importe el módulo `Network` desde `@capacitor/network`:

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

En la plantilla de su aplicación (`appcomponenthtml`), agregue un elemento `<div>` con una identificación de `offline-screen` para mostrar el mensaje de pantalla sin conexión:

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Agregue los siguientes estilos al archivo `appcomponentcss`:

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

Ahora, cuando el usuario se desconecte, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a conectarse, la pantalla sin conexión se ocultará.

### Reaccionar

En su proyecto React, abra el archivo `src/Appjs` e importe el módulo `Network` desde `@capacitor/network`:

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

Agregue los siguientes estilos al archivo `Appcss`:

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

Ahora, cuando el usuario se desconecte, se mostrará la pantalla sin conexión. Cuando el usuario vuelva a conectarse, la pantalla sin conexión se ocultará.

## Métodos e interfaces de soporte

La API de red proporciona varios métodos e interfaces para ayudarle a manejar la conexión de red. Estos son algunos de los más importantes:

- [`getStatus()`](https://capacitorjscom/docs/apis/network/#getstatus): Consulta el estado actual de la conexión de red
- [`addListener('networkStatusChange', )`](https://capacitorjscom/docs/apis/network/#addlistenernetworkstatuschange): escucha cambios en la conexión de red
-