---
slug: it__create-offline-screen-in-vue-angular-react
title: >-
  Come Creare una Schermata Offline in Applicazioni Vue, Angular e React con
  l'API Network e Capacitor
description: >-
  Scopri come implementare schermate offline in applicazioni Vue, Angular o
  React utilizzando l'API Network e Capacitor. Migliora l'esperienza utente
  gestendo efficacemente gli scenari offline.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: Immagine di una persona che lavora al computer
tag: Tutorial
published: true
locale: it
next_blog: ''
---

# Come creare una schermata offline in Vue 3, Angular 14 o React

In questo tutorial, impareremo come creare una schermata offline nelle applicazioni Vue 3, Angular 14 e React utilizzando l'API Network. L'API Network fornisce informazioni sulla rete e sulla connettività, consentendoci di gestire scenari offline e fornire una migliore esperienza utente.

## Prerequisiti

Prima di iniziare, assicurati di avere installato quanto segue:

- [Node.js](https://nodejs.org/) (versione 14 o superiore)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## Configurazione del progetto

Innanzitutto, creiamo un nuovo progetto utilizzando il rispettivo strumento di scaffolding per ciascun framework.

### Vue 3

Apri il terminale ed esegui il seguente comando per creare un nuovo progetto Vue 3:

```shell
vue create offline-screen-vue3
```

Scegli il preset predefinito e attendi che il progetto venga creato.

### Angular 14

Apri il terminale ed esegui il seguente comando per creare un nuovo progetto Angular 14:

```shell
ng new offline-screen-angular14
```

Segui le istruzioni e quando ti viene chiesto di selezionare funzionalità aggiuntive, seleziona "Routing" premendo il tasto **barra spaziatrice**. Attendi che il progetto venga creato.

### React

Apri il terminale ed esegui il seguente comando per creare un nuovo progetto React:

```shell
npx create-react-app offline-screen-react
```

Attendi che il progetto venga creato.

## Installazione dell'API Network

Ora, installiamo il pacchetto `@capacitor/network`, che fornisce l'API Network.

Apri il terminale e naviga nella directory del tuo progetto. Quindi, esegui il seguente comando per installare il pacchetto:

```shell
npm install @capacitor/network
```

Per i progetti Capacitor, esegui anche il seguente comando per sincronizzare i file del progetto nativo:

```shell
npx cap sync
```

Assicurati di avere installato globalmente il CLI di Capacitor eseguendo:

```shell
npm install -g @capacitor/cli
```

## Implementazione della schermata offline

Successivamente, implementeremo la funzionalità della schermata offline in ciascun framework. Mostreremo un semplice messaggio quando l'utente va offline.

### Vue 3

Nel tuo progetto Vue 3, apri il file `src/main.js` e importa il modulo `Network` da `@capacitor/network`:

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

Nel template della tua applicazione (`App.vue`), aggiungi un elemento `<div>` con un id di `offline-screen` per visualizzare il messaggio della schermata offline:

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

Ora, quando l'utente va offline, verrà visualizzata la schermata offline. Quando l'utente torna online, la schermata offline verrà nascosta.

### Angular 14

Nel tuo progetto Angular 14, apri il file `src/app/app.component.ts` e importa il modulo `Network` da `@capacitor/network`:

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

Nel template della tua applicazione (`app.component.html`), aggiungi un elemento `<template>` con un id di `offline-screen` per visualizzare il messaggio della schermata offline:

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Aggiungi i seguenti stili al file `app.component.css`:

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

Ora, quando l'utente va offline, verrà visualizzata la schermata offline. Quando l'utente torna online, la schermata offline verrà nascosta.

### React

Nel tuo progetto React, apri il file `src/App.js` e importa il modulo `Network` da `@capacitor/network`:

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

Aggiungi i seguenti stili al file `App.css`:

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

Ora, quando l'utente va offline, verrà visualizzata la schermata offline. Quando l'utente torna online, la schermata offline verrà nascosta.

## Metodi e interfacce di supporto

L'API Network fornisce diversi metodi e interfacce per aiutarti a gestire la connessione di rete. Ecco alcuni dei principali:

- [`getStatus()`](https://capacitorjs.com/docs/apis/network/#getstatus): Interroga lo stato attuale della connessione di rete.
- [`addListener('networkStatusChange', )`](https://capacitorjs.com/docs/apis/network/#addlistenernetworkstatuschange): Ascolta i cambiamenti nella connessione di rete.