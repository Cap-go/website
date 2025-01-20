---
slug: de__create-offline-screen-in-vue-angular-react
title: >-
  Wie man einen Offline-Bildschirm in Vue-, Angular- und React-Anwendungen mit
  der Network API und Capacitor erstellt
description: >-
  Erfahren Sie, wie Sie einen Offline-Bildschirm in Vue-, Angular- oder
  React-Anwendungen mithilfe der Network API und Capacitor implementieren.
  Verbessern Sie die Benutzererfahrung, indem Sie Offline-Szenarien effektiv
  handhaben.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: 'Bild einer Person, die an einem Computer arbeitet'
tag: Tutorial
published: true
locale: de
next_blog: ''
---

# Wie man einen Offline-Bildschirm in Vue 3, Angular 14 oder React erstellt

In diesem Tutorial lernen wir, wie man einen Offline-Bildschirm in Vue 3-, Angular 14- und React-Anwendungen mithilfe der Network API erstellt. Die Network API liefert Netzwerk- und Konnektivitätsinformationen, die es uns ermöglichen, Offline-Szenarien zu behandeln und eine bessere Benutzererfahrung zu bieten.

## Voraussetzungen

Bevor wir beginnen, stellen Sie sicher, dass Sie Folgendes installiert haben:

- [Node.js](https://nodejs.org/) (Version 14 oder höher)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## Projekt einrichten

Zunächst erstellen wir ein neues Projekt mit dem jeweiligen Scaffolding-Tool für jedes Framework.

### Vue 3

Öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus, um ein neues Vue 3-Projekt zu erstellen:

```shell
vue create offline-screen-vue3
```

Wählen Sie die Standardeinstellungen und warten Sie, bis das Projekt erstellt wurde.

### Angular 14

Öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus, um ein neues Angular 14-Projekt zu erstellen:

```shell
ng new offline-screen-angular14
```

Folgen Sie den Anweisungen und wählen Sie bei der Frage nach zusätzlichen Funktionen "Routing" durch Drücken der **Leertaste**. Warten Sie, bis das Projekt erstellt wurde.

### React

Öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus, um ein neues React-Projekt zu erstellen:

```shell
npx create-react-app offline-screen-react
```

Warten Sie, bis das Projekt erstellt wurde.

## Installation der Network API

Jetzt installieren wir das Paket `@capacitor/network`, das die Network API bereitstellt.

Öffnen Sie Ihr Terminal und navigieren Sie zu Ihrem Projektverzeichnis. Führen Sie dann den folgenden Befehl aus, um das Paket zu installieren:

```shell
npm install @capacitor/network
```

Für Capacitor-Projekte führen Sie auch den folgenden Befehl aus, um die nativen Projektdateien zu synchronisieren:

```shell
npx cap sync
```

Stellen Sie sicher, dass Sie die Capacitor CLI global installiert haben, indem Sie Folgendes ausführen:

```shell
npm install -g @capacitor/cli
```

## Implementierung des Offline-Bildschirms

Als Nächstes implementieren wir die Offline-Bildschirm-Funktionalität in jedem Framework. Wir zeigen eine einfache Nachricht an, wenn der Benutzer offline geht.

### Vue 3

Öffnen Sie in Ihrem Vue 3-Projekt die Datei `src/main.js` und importieren Sie das `Network`-Modul von `@capacitor/network`:

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

Fügen Sie in Ihrem Anwendungstemplate (`App.vue`) ein `<div>`-Element mit einer ID von `offline-screen` hinzu, um die Offline-Bildschirm-Nachricht anzuzeigen:

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

Wenn der Benutzer jetzt offline geht, wird der Offline-Bildschirm angezeigt. Wenn der Benutzer wieder online kommt, wird der Offline-Bildschirm ausgeblendet.

### Angular 14

Öffnen Sie in Ihrem Angular 14-Projekt die Datei `src/app/app.component.ts` und importieren Sie das `Network`-Modul von `@capacitor/network`:

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

Fügen Sie in Ihrem Anwendungstemplate (`app.component.html`) ein `<template>`-Element mit einer ID von `offline-screen` hinzu, um die Offline-Bildschirm-Nachricht anzuzeigen:

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Fügen Sie die folgenden Stile zur Datei `app.component.css` hinzu:

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

Wenn der Benutzer jetzt offline geht, wird der Offline-Bildschirm angezeigt. Wenn der Benutzer wieder online kommt, wird der Offline-Bildschirm ausgeblendet.

### React

Öffnen Sie in Ihrem React-Projekt die Datei `src/App.js` und importieren Sie das `Network`-Modul von `@capacitor/network`:

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

Fügen Sie die folgenden Stile zur Datei `App.css` hinzu:

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

Wenn der Benutzer jetzt offline geht, wird der Offline-Bildschirm angezeigt. Wenn der Benutzer wieder online kommt, wird der Offline-Bildschirm ausgeblendet.

## Unterstützende Methoden und Schnittstellen

Die Network API bietet mehrere Methoden und Schnittstellen, um Ihnen bei der Handhabung der Netzwerkverbindung zu helfen. Hier sind einige der wichtigsten:

- [`getStatus()`](https://capacitorjs.com/docs/apis/network/#getstatus): Abfrage des aktuellen Status der Netzwerkverbindung
- [`addListener('networkStatusChange', )`](https://capacitorjs.com/docs/apis/network/#addlistenernetworkstatuschange): Auf Änderungen in der Netzwerkverbindung hören
-