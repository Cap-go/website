---
slug: fr__create-offline-screen-in-vue-angular-react
title: >-
  Comment créer un écran hors ligne dans les applications Vue, Angular et React
  avec l'API Network et Capacitor
description: >-
  Apprenez à implémenter un écran hors ligne dans des applications Vue, Angular
  ou React en utilisant l'API Network et Capacitor. Améliorez l'expérience
  utilisateur en gérant efficacement les scénarios hors ligne.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: Image d'une personne travaillant sur un ordinateur
tag: Tutorial
published: true
locale: fr
next_blog: ''
---

# Comment créer un écran hors ligne dans Vue 3, Angular 14 ou React

Dans ce tutoriel, nous allons apprendre à créer un écran hors ligne dans les applications Vue 3, Angular 14 et React en utilisant l'API Network. L'API Network fournit des informations sur le réseau et la connectivité, nous permettant de gérer les scénarios hors ligne et d'offrir une meilleure expérience utilisateur.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## Configuration du projet

Tout d'abord, créons un nouveau projet en utilisant l'outil d'échafaudage respectif pour chaque framework.

### Vue 3

Ouvrez votre terminal et exécutez la commande suivante pour créer un nouveau projet Vue 3 :

```shell
vue create offline-screen-vue3
```

Choisissez le preset par défaut et attendez que le projet soit créé.

### Angular 14

Ouvrez votre terminal et exécutez la commande suivante pour créer un nouveau projet Angular 14 :

```shell
ng new offline-screen-angular14
```

Suivez les instructions et lorsqu'on vous demande des fonctionnalités supplémentaires, sélectionnez "Routing" en appuyant sur la touche **espace**. Attendez que le projet soit créé.

### React

Ouvrez votre terminal et exécutez la commande suivante pour créer un nouveau projet React :

```shell
npx create-react-app offline-screen-react
```

Attendez que le projet soit créé.

## Installation de l'API Network

Maintenant, installons le package `@capacitor/network`, qui fournit l'API Network.

Ouvrez votre terminal et naviguez vers le répertoire de votre projet. Ensuite, exécutez la commande suivante pour installer le package :

```shell
npm install @capacitor/network
```

Pour les projets Capacitor, exécutez également la commande suivante pour synchroniser les fichiers du projet natif :

```shell
npx cap sync
```

Assurez-vous d'avoir installé globalement le CLI Capacitor en exécutant :

```shell
npm install -g @capacitor/cli
```

## Implémentation de l'écran hors ligne

Ensuite, nous allons implémenter la fonctionnalité d'écran hors ligne dans chaque framework. Nous afficherons un simple message lorsque l'utilisateur passe hors ligne.

### Vue 3

Dans votre projet Vue 3, ouvrez le fichier `src/main.js` et importez le module `Network` depuis `@capacitor/network` :

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

Dans le template de votre application (`App.vue`), ajoutez un élément `<div>` avec un id "offline-screen" pour afficher le message d'écran hors ligne :

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

Maintenant, lorsque l'utilisateur passe hors ligne, l'écran hors ligne s'affichera. Lorsque l'utilisateur revient en ligne, l'écran hors ligne sera masqué.

### Angular 14

Dans votre projet Angular 14, ouvrez le fichier `src/app/app.component.ts` et importez le module `Network` depuis `@capacitor/network` :

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

Dans le template de votre application (`app.component.html`), ajoutez un élément `<template>` avec un id "offline-screen" pour afficher le message d'écran hors ligne :

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Ajoutez les styles suivants au fichier `app.component.css` :

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

Maintenant, lorsque l'utilisateur passe hors ligne, l'écran hors ligne s'affichera. Lorsque l'utilisateur revient en ligne, l'écran hors ligne sera masqué.

### React

Dans votre projet React, ouvrez le fichier `src/App.js` et importez le module `Network` depuis `@capacitor/network` :

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

Ajoutez les styles suivants au fichier `App.css` :

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

Maintenant, lorsque l'utilisateur passe hors ligne, l'écran hors ligne s'affichera. Lorsque l'utilisateur revient en ligne, l'écran hors ligne sera masqué.

## Méthodes et interfaces de support

L'API Network fournit plusieurs méthodes et interfaces pour vous aider à gérer la connexion réseau. Voici quelques-unes des principales :

- [`getStatus()`](https://capacitorjs.com/docs/apis/network/#getstatus) : Interroge l'état actuel de la connexion réseau
- [`addListener('networkStatusChange', )`](https://capacitorjs.com/docs/apis/network/#addlistenernetworkstatuschange) : Écoute les changements dans la connexion réseau
-