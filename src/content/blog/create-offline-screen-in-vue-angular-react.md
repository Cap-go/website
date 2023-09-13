---
slug: "create-offline-screen-in-vue-angular-react"
title: "How to Create an Offline Screen in Vue, Angular, and React Applications using the Network API and Capacitor"
description: "Learn how to implement an offline screen in Vue, Angular, or React applications using the Network API and Capacitor. Improve the user experience by handling offline scenarios effectively."
author: Martin Donadieu
author_url: https://x.com/martindonadieu
created_at: 2022-06-21
updated_at: 2022-06-21
head_image: "/vue_angular_react.webp"
head_image_alt: Image of a person working on a computer
tag: Tutorial
published: true
next_blog: ""

---

# How to Create an Offline Screen in Vue 3, Angular 14, or React

In this tutorial, we will learn how to create an offline screen in Vue 3, Angular 14, and React applications using the Network API. The Network API provides network and connectivity information, allowing us to handle offline scenarios and provide a better user experience.

## Prerequisites

Before we begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## Setting Up the Project

First, let's create a new project using the respective scaffolding tool for each framework.

### Vue 3

Open your terminal and run the following command to create a new Vue 3 project:

```shell
vue create offline-screen-vue3
```

Choose the default preset and wait for the project to be created.

### Angular 14

Open your terminal and run the following command to create a new Angular 14 project:

```shell
ng new offline-screen-angular14
```

Follow the prompts, and when asked for additional features, select "Routing" by pressing the **spacebar** key. Wait for the project to be created.

### React

Open your terminal and run the following command to create a new React project:

```shell
npx create-react-app offline-screen-react
```

Wait for the project to be created.

## Installing the Network API

Now, let's install the `@capacitor/network` package, which provides the Network API.

Open your terminal and navigate to your project directory. Then, run the following command to install the package:

```shell
npm install @capacitor/network
```

For Capacitor projects, also run the following command to sync the native project files:

```shell
npx cap sync
```

Make sure you have the Capacitor CLI installed globally by running:

```shell
npm install -g @capacitor/cli
```

## Implementing the Offline Screen

Next, we will implement the offline screen functionality in each framework. We will display a simple message when the user goes offline.

### Vue 3

In your Vue 3 project, open the `src/main.js` file and import the `Network` module from `@capacitor/network`:

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

In your application template (`App.vue`), add a `<div>` element with an id of `offline-screen` to display the offline screen message:

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

Now, when the user goes offline, the offline screen will be displayed. When the user comes back online, the offline screen will be hidden.

### Angular 14

In your Angular 14 project, open the `src/app/app.component.ts` file and import the `Network` module from `@capacitor/network`:

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

In your application template (`app.component.html`), add a `<div>` element with an id of `offline-screen` to display the offline screen message:

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Add the following styles to the `app.component.css` file:

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

Now, when the user goes offline, the offline screen will be displayed. When the user comes back online, the offline screen will be hidden.

### React

In your React project, open the `src/App.js` file and import the `Network` module from `@capacitor/network`:

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

Add the following styles to the `App.css` file:

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

Now, when the user goes offline, the offline screen will be displayed. When the user comes back online, the offline screen will be hidden.

## Supporting Methods and Interfaces

The Network API provides several methods and interfaces to help you handle the network connection. Here are some of the key ones:

- [`getStatus()`](https://capacitorjs.com/docs/apis/network#getstatus): Query the current status of the network connection.
- [`addListener('networkStatusChange', ...)`](https://capacitorjs.com/docs/apis/network#addlistenernetworkstatuschange): Listen for changes in the network connection.
-
