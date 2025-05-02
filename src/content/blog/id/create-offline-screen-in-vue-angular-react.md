---
slug: membuat-layar-offline-di-vue-angular-react
title: >-
  Cara Membuat Layar Offline pada Aplikasi Vue, Angular dan React menggunakan
  Network API dan Capacitor
description: >-
  Pelajari cara mengimplementasikan layar offline pada aplikasi Vue, Angular,
  atau React menggunakan Network API dan Capacitor. Tingkatkan pengalaman
  pengguna dengan menangani skenario offline secara efektif.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-21T00:00:00.000Z
updated_at: 2022-06-21T00:00:00.000Z
head_image: /vue_angular_react.webp
head_image_alt: Gambar orang yang sedang bekerja dengan komputer
keywords: >-
  Vue, Angular, React, offline screen, network API, Capacitor, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Tutorial
published: true
locale: id
next_blog: ''
original_slug: crear-pantalla-offline-en-vue-angular-react
---
# Cara Membuat Layar Offline di Vue 3, Angular 14, atau React

Dalam tutorial ini, kita akan mempelajari cara membuat layar offline di aplikasi Vue 3, Angular 14, dan React menggunakan Network API. Network API menyediakan informasi jaringan dan konektivitas, memungkinkan kita untuk menangani skenario offline dan memberikan pengalaman pengguna yang lebih baik.

## Prasyarat

Sebelum kita mulai, pastikan Anda telah menginstal hal-hal berikut:

- [Node.js](https://nodejs.org/) (versi 14 atau lebih tinggi)
- [Vue CLI](https://cli.vuejs.org/)
- [Angular CLI](https://cli.angular.io/)
- [Create React App](https://create-react-app.dev/)

## Menyiapkan Proyek

Pertama, mari buat proyek baru menggunakan alat scaffolding untuk masing-masing framework.

### Vue 3

Buka terminal Anda dan jalankan perintah berikut untuk membuat proyek Vue 3 baru:

```shell
vue create offline-screen-vue3
```

Pilih preset default dan tunggu hingga proyek selesai dibuat.

### Angular 14

Buka terminal Anda dan jalankan perintah berikut untuk membuat proyek Angular 14 baru:

```shell
ng new offline-screen-angular14
```

Ikuti petunjuk, dan ketika ditanya untuk fitur tambahan, pilih "Routing" dengan menekan tombol **spacebar**. Tunggu hingga proyek selesai dibuat.

### React

Buka terminal Anda dan jalankan perintah berikut untuk membuat proyek React baru:

```shell
npx create-react-app offline-screen-react
```

Tunggu hingga proyek selesai dibuat.

## Menginstal Network API

Sekarang, mari instal paket `@capacitor/network`, yang menyediakan Network API.

Buka terminal Anda dan navigasikan ke direktori proyek Anda. Kemudian, jalankan perintah berikut untuk menginstal paket:

```shell
npm install @capacitor/network
```

Untuk proyek Capacitor, jalankan juga perintah berikut untuk menyinkronkan file proyek native:

```shell
npx cap sync
```

Pastikan Anda telah menginstal Capacitor CLI secara global dengan menjalankan:

```shell
npm install -g @capacitor/cli
```

## Mengimplementasikan Layar Offline

Selanjutnya, kita akan mengimplementasikan fungsionalitas layar offline di setiap framework. Kita akan menampilkan pesan sederhana ketika pengguna sedang offline.

### Vue 3

Di proyek Vue 3 Anda, buka file `src/main.js` dan impor modul `Network` dari `@capacitor/network`:

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

Dalam template aplikasi Anda (`App.vue`), tambahkan elemen `<div>` dengan id `offline-screen` untuk menampilkan pesan layar offline:

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

Sekarang, ketika pengguna offline, layar offline akan ditampilkan. Ketika pengguna kembali online, layar offline akan disembunyikan.

### Angular 14

Di proyek Angular 14 Anda, buka file `src/app/app.component.ts` dan impor modul `Network` dari `@capacitor/network`:

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

Dalam template aplikasi Anda (`app.component.html`), tambahkan elemen `<template>` dengan id `offline-screen` untuk menampilkan pesan layar offline:

```html
<div id="offline-screen">
  <h1>You are offline</h1>
  <p>Please check your internet connection and try again.</p>
</div>

<!-- Your application content -->
```

Tambahkan gaya berikut ke file `app.component.css`:

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

Sekarang, ketika pengguna offline, layar offline akan ditampilkan. Ketika pengguna kembali online, layar offline akan disembunyikan.

### React

Di proyek React Anda, buka file `src/App.js` dan impor modul `Network` dari `@capacitor/network`:

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

Tambahkan gaya berikut ke file `App.css`:

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

Sekarang, ketika pengguna offline, layar offline akan ditampilkan. Ketika pengguna kembali online, layar offline akan disembunyikan.

## Metode dan Antarmuka Pendukung

Network API menyediakan beberapa metode dan antarmuka untuk membantu Anda menangani koneksi jaringan. Berikut adalah beberapa yang utama:

- [`getStatus()`](https://capacitorjs.com/docs/apis/network/#getstatus): Menanyakan status saat ini dari koneksi jaringan.
- [`addListener('networkStatusChange', ...)`](https://capacitorjs.com/docs/apis/network/#addlistenernetworkstatuschange): Mendengarkan perubahan dalam koneksi jaringan.
-
