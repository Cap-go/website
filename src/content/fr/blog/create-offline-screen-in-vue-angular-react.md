---
slug: create-offline-screen-in-vue-angular-react
title: >-
  Comment créer un écran hors ligne dans les applications Vue, Angular et React
  à l'aide de l'API réseau et du condensateur
description: >-
  Découvrez comment implémenter un écran hors ligne dans les applications Vue,
  Angular ou React à l'aide de l'API réseau et de Capacitor. Améliorez
  l’expérience utilisateur en gérant efficacement les scénarios hors ligne.
author: Martin Donadieu
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

Dans ce didacticiel, nous apprendrons comment créer un écran hors ligne dans les applications Vue 3, Angular 14 et React à l'aide de l'API réseau. L'API réseau fournit des informations sur le réseau et la connectivité, nous permettant de gérer des scénarios hors ligne et d'offrir une meilleure expérience utilisateur.

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés :

- [Nodejs](https://nodejsorg/) (version 14 ou supérieure)
- [Vue CLI](https://clivuejsorg/)
- [CLI angulaire](https://cliangulario/)
- [Créer une application React](https://create-react-appdev/)

## Configuration du projet

Tout d'abord, créons un nouveau projet en utilisant l'outil d'échafaudage respectif pour chaque framework.

### Vue 3

Ouvrez votre terminal et exécutez la commande suivante pour créer un nouveau projet Vue 3 :

```shell
vue create offline-screen-vue3
```

Choisissez le préréglage par défaut et attendez que le projet soit créé

### Angulaire 14

Ouvrez votre terminal et exécutez la commande suivante pour créer un nouveau projet Angular 14 :

```shell
ng new offline-screen-angular14
```

Suivez les invites et lorsque des fonctionnalités supplémentaires vous sont demandées, sélectionnez « Routage » en appuyant sur la touche **barre d'espace**. Attendez que le projet soit créé.

### Réagir

Ouvrez votre terminal et exécutez la commande suivante pour créer un nouveau projet React :

```shell
npx create-react-app offline-screen-react
```

Attendez que le projet soit créé

## Installation de l'API réseau

Maintenant, installons le package `@capacitor/network`, qui fournit l'API réseau

Ouvrez votre terminal et accédez au répertoire de votre projet. Ensuite, exécutez la commande suivante pour installer le package :

```shell
npm install @capacitor/network
```

Pour les projets Capacitor, exécutez également la commande suivante pour synchroniser les fichiers de projet natifs :

```shell
npx cap sync
```

Assurez-vous que la CLI Capacitor est installée globalement en exécutant :

```shell
npm install -g @capacitor/cli
```

## Implémentation de l'écran hors ligne

Ensuite, nous implémenterons la fonctionnalité d'écran hors ligne dans chaque framework. Nous afficherons un message simple lorsque l'utilisateur se déconnectera.

### Vue 3

Dans votre projet Vue 3, ouvrez le fichier `src/mainjs` et importez le module `Network` depuis `@capacitor/network` :

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

Dans votre modèle d'application (`Appvue`), ajoutez un élément `<div>` avec un identifiant `offline-screen` pour afficher le message d'écran hors ligne :

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

Désormais, lorsque l'utilisateur se déconnecte, l'écran hors ligne sera affiché. Lorsque l'utilisateur reviendra en ligne, l'écran hors ligne sera masqué.

### Angulaire 14

Dans votre projet Angular 14, ouvrez le fichier `src/app/appcomponentts` et importez le module `Network` depuis `@capacitor/network` :

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

Dans votre modèle d'application (`appcomponenthtml`), ajoutez un élément `<template>` avec un identifiant `offline-screen` pour afficher le message d'écran hors ligne :

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Ajoutez les styles suivants au fichier `appcomponentcss` :

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

Désormais, lorsque l'utilisateur se déconnecte, l'écran hors ligne sera affiché. Lorsque l'utilisateur reviendra en ligne, l'écran hors ligne sera masqué.

### Réagir

Dans votre projet React, ouvrez le fichier `src/Appjs` et importez le module `Network` depuis `@capacitor/network` :

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

Ajoutez les styles suivants au fichier `Appcss` :

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

Désormais, lorsque l'utilisateur se déconnecte, l'écran hors ligne sera affiché. Lorsque l'utilisateur reviendra en ligne, l'écran hors ligne sera masqué.

## Méthodes et interfaces de support

L'API réseau fournit plusieurs méthodes et interfaces pour vous aider à gérer la connexion réseau. Voici quelques-unes des principales :

- [`getStatus()`](https://capacitorjscom/docs/apis/network/#getstatus) : requête sur l'état actuel de la connexion réseau
- [`addListener('networkStatusChange', )`](https://capacitorjscom/docs/apis/network/#addlistenernetworkstatuschange) : écoutez les changements dans la connexion réseau
-