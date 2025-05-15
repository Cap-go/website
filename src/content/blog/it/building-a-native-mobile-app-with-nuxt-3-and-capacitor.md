---
slug: building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: '2025 Guía: Creando aplicaciones móviles con Nuxt 3.17 y Capacitor.'
description: >-
  Cómo crear una aplicación móvil con Nuxt 3.17, Capacitor e implementar una
  interfaz de usuario nativa con Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2025-05-12T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 3 e a ilustração do Capgo
keywords: >-
  Nuxt 3, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
În acest tutorial, vom începe cu o nouă aplicație [Nuxt 3.17](https://nuxtjs.org/) și ne vom ocupa de partea nativă folosind Capacitor și, în cele din urmă, vom adăuga și [Konsta UI](https://konstaui.com/) pentru a îmbunătăți interfața mobilă Tailwind CSS, deși ultimul pas este complet opțional.

Folosind Capacitor, poți transforma cu ușurință aplicația web Nuxt 3 într-o aplicație mobilă nativă fără a necesita modificări semnificative sau învățarea unei noi abilități cum ar fi React Native.

Cu doar câțiva pași simpli, majoritatea aplicațiilor Nuxt 3 pot fi transformate în aplicații mobile.

Acest tutorial te va ghida prin proces, începând cu o nouă aplicație Nuxt 3 și apoi încorporând Capacitor pentru a pătrunde în domeniul aplicațiilor mobile native. În plus, poți folosi opțional [Konsta UI](https://konstaui.com/) pentru a-ți îmbunătăți interfața mobilă cu Tailwind CSS.

## Despre Capacitor

CapacitorJS este cu adevărat un schimbător de joc! Poți să-l încorporezi fără efort în orice proiect web, iar acesta va învălui aplicația ta într-o webview nativă, generând proiectul nativ Xcode și Android Studio pentru tine. În plus, pluginurile sale oferă acces la caracteristici native ale dispozitivului, cum ar fi camera, printr-un pod JS.

Cu Capacitor, obții o aplicație mobilă nativă fantastică fără configurări complicate sau o curbă de învățare abruptă. API-ul său subțire și funcționalitatea sa simplificată fac integrarea în proiectul tău floare la ureche. Crede-mă, vei fi uimit de cât de ușor este să obții o aplicație nativă complet funcțională cu Capacitor!

## Pregătirea Aplicației Tale Nuxt 3

Pentru a crea o nouă aplicație Nuxt 3, rulează următoarea comandă:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Alege "Nuxt 3" atunci când ți se solicită versiunea Nuxt.

Pentru a crea o aplicație mobilă nativă, avem nevoie de un **export** al proiectului nostru. Astfel, să includem un script simplu în **package.json**, care poate fi utilizat pentru a construi și copia proiectul Nuxt:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

După ce execuți comanda `generate`, ar trebui să poți observa un nou folder `dist` la rădăcina proiectului tău.

Acest folder va fi folosit de Capacitor mai târziu, dar deocamdată, trebuie să-l configurăm corect.

## Adăugarea Capacitor la Aplicația Ta Nuxt 3

Pentru a împacheta orice aplicație web într-un container mobil nativ, trebuie să urmăm câțiva pași inițiali, dar după aceea este la fel de simplu ca executarea unei singure comenzi `sync`.

În primul rând, putem instala [Capacitor CLI](https://capacitorjs.com/docs/cli/) ca o dependență de dezvoltare și apoi să-l configurăm în cadrul proiectului nostru. În timpul setup-ului, poți apăsa “enter” pentru a accepta valorile implicite pentru nume și ID-ul pachetului.

Apoi, trebuie să instalăm pachetul de bază și pachetele relevante pentru platformele iOS și Android.

În cele din urmă, putem adăuga platformele, iar Capacitor va crea foldere pentru fiecare platformă la rădăcina proiectului nostru:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Până acum, ar trebui să poți observa folderele **ios** și **android** în proiectul tău Nuxt 3.

**Acestea sunt adevărate proiecte native!**

Pentru a accesa proiectul Android mai târziu, trebuie să instalezi [Android Studio](https://developer.android.com/studio/). Pentru iOS, ai nevoie de un Mac și ar trebui să instalezi [Xcode](https://developer.apple.com/xcode/).

În plus, ar trebui să găsești un fișier **capacitor.config.ts** în proiectul tău, care conține câteva setări fundamentale Capacitor folosite în timpul sincronizării. Singurul lucru la care trebuie să fii atent este **webDir**, care trebuie să indice rezultatul comenzii tale de construire. În prezent, este incorect.

Pentru a corecta acest lucru, deschide fișierul **capacitor.config.json** și actualizează **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Poți încerca executând următoarele comenzi:

```shell
npm run generate
npx cap sync
```

Prima comandă `npm run generate` va construi pur și simplu proiectul tău Nuxt 3 și va copia construcția statică, în timp ce a doua comandă `npx cap sync` va sincroniza tot codul web în locurile corecte ale platformelor native, astfel încât să poată fi afișate într-o aplicație.

În plus, comanda de sincronizare ar putea actualiza platformele native și instala pluginuri, astfel încât când instalezi un nou [plugin Capacitor](https://capacitorjs.com/docs/plugins/) este timpul să rulezi din nou `npx cap sync`.

Fără să-ți dai seama, ai terminat, așa că hai să vedem aplicația pe un dispozitiv!

## Construirea și Implementarea aplicațiilor native

Pentru a dezvolta aplicații iOS, trebuie să ai **Xcode** instalat, iar pentru aplicații Android, trebuie să ai **Android Studio** instalat. În plus, dacă intenționezi să distribui aplicația pe App Store, trebuie să te înscrii în Programul de Dezvoltatori Apple pentru iOS și în Consola Google Play pentru Android.

Dacă ești nou în dezvoltarea mobilă nativă, poți folosi Capacitor CLI pentru a deschide ușor ambele proiecte native:

```shell
npx cap open ios
npx cap open android
```

Odată ce ai configurat proiectele tale native, implementarea aplicației tale pe un dispozitiv conectat este ușoară. În Android Studio, trebuie doar să aștepți ca totul să fie gata și poți implementa aplicația ta pe un dispozitiv conectat fără a schimba nicio setare. Iată un exemplu:

![android-studio-run](/android-studio-run.webp)

În Xcode, trebuie să îți configurezi contul de semnare pentru a-ți implementa aplicația pe un dispozitiv real în loc de simulator. Dacă nu ai făcut asta înainte, Xcode te ghidează prin proces (dar din nou, trebuie să te înscrii în Programul de Dezvoltatori). După aceea, poți pur și simplu să apeși pe play pentru a rula aplicația pe dispozitivul tău conectat, pe care îl poți selecta în partea de sus. Iată un exemplu:

![xcode-run](/xcode-run.webp)

Felicitări! Ai implementat cu succes aplicația ta web Nuxt 3 pe un dispozitiv mobil. Iată un exemplu:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

Dar așteaptă, există și o modalitate mai rapidă de a face acest lucru în timpul dezvoltării...

## Capacitor Live Reload

Până acum, probabil că te-ai obișnuit cu reîncărcarea rapidă cu toate cadrele moderne, iar vestea bună este că poți avea aceeași funcționalitate **pe un dispozitiv mobil** cu un efort minim!

Activează accesul la aplicația ta găzduită local cu live reload **pe rețeaua ta** prin încărcarea conținutului de către aplicația Capacitor dintr-o URL specifică.

Primul pas este să îți dai seama de adresa ta IP locală. Dacă folosești un Mac, poți afla acest lucru rulând următoarea comandă în terminal:

```shell
ipconfig getifaddr en0
```

Pe Windows, rulează:

```shell
ipconfig
```

Apoi caută adresa IPv4.

Putem instrui Capacitor să încarce aplicația direct de pe server prin adăugarea unei noi înregistrări în fișierul nostru `capacitor.config.ts`:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Asigură-te că folosești **IP-ul și portul corect**, eu am folosit portul default Nuxt 3 în acest exemplu.

Acum, putem aplica aceste modificări copiindu-le în proiectul nostru nativ:

```shell
npx cap copy
```

Comanda `copy` este similară cu `sync`, dar va **copia doar modificările efectuate în folderul web** și configurația, fără a actualiza proiectul nativ.

Poți acum să implementezi aplicația ta din nou prin Android Studio sau Xcode. După aceea, dacă schimbi ceva în aplicația ta Nuxt, **aplicația se va reîncărca automat** și va afișa modificările!

**Ține minte** că dacă instalezi noi pluginuri, cum ar fi camera, este necesară o recompilare a proiectului tău nativ. Acest lucru se datorează faptului că fișierele native sunt modificate, și nu se poate face din mers.

Reține că ar trebui să folosești IP-ul și portul corect în configurația ta. Blocul de cod de mai sus arată portul default Nuxt 3 în scopuri demonstrație.

## Utilizarea Pluginurilor Capacitor

Să ne uităm la cum să folosim un plugin Capacitor în acțiune, de care am menționat de câteva ori înainte. Pentru a face acest lucru, putem instala un plugin destul de simplu rulând:

```shell
npm i @capacitor/share
```

Nu este nimic fancy în legătură cu [pluginul Share](https://capacitorjs.com/docs/apis/share/), dar oricum deschide dialogul de partajare nativ! Pentru aceasta, acum trebuie doar să importăm pachetul și să apelăm funcția `share()` din aplicația noastră, așa că să schimbăm **pages/index.vue** în acest fel:

```html
<template>
  <div>
    <h1>Welcome to Nuxt 3 and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

Așa cum am menționat mai devreme, atunci când instalăm noi pluginuri, trebuie să efectuăm o operațiune de sincronizare și apoi să redeployăm aplicația pe dispozitivul nostru. Pentru a face acest lucru, rulează următoarea comandă:

```
npx cap sync
```

După apăsarea butonului, poți observa frumosul dialog de partajare nativ în acțiune!

## Adăugarea Konsta UI

Pentru a folosi Konsta UI în aplicația ta Nuxt 3, trebuie să ai [tailwind deja instalat](https://tailwindcss.com/docs/guides/nuxtjs/) și să instalezi pachetul:

```shell
npm i konsta
```

În plus, trebuie să modifici fișierul tău `tailwind.config.js`:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` va extinde configurarea Tailwind CSS implicită (sau personalizată) cu unele variante suplimentare și utilitare necesare pentru Konsta UI.

Acum trebuie să configurăm componenta principală [App](https://konstaui.com/vue/app/) astfel încât să putem seta unele parametri globali (cum ar fi `theme`).

Trebuie să învăluim întreaga aplicație cu `App` în `pages/_app.vue`:

```html
<template>
  <App theme="ios">
    <Nuxt />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Pagină Exemplu

Acum că totul este configurat, putem folosi componentele Konsta UI Vue în paginile noastre Nuxt 3.

De exemplu, să deschidem `pages/index.vue` și să o schimbăm în următoarea:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 3 & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

Dacă reîncărcarea rapidă este dezacordată după instalarea tuturor componentelor necesare, încearcă să repornești tot. Odată ce ai făcut asta, ar trebui să vezi o aplicație mobilă cu un aspect oarecum nativ, construită cu Nuxt 3 și Capacitor!

Ar trebui să vezi următoarea pagină ca rezultat:

<template>
  <div>
<h1>

## Concluzie

Capacitor este o opțiune excelentă pentru construirea aplicațiilor native pe baza unui proiect web existent, oferind o modalitate simplă de a împărtăși codul și de a menține o interfață utilizator consistentă.

Și cu adăugarea [Capgo](https://capgo.app/), este și mai ușor să adaugi actualizări live la aplicația ta, asigurându-te că utilizatorii tăi au mereu acces la cele mai recente caracteristici și corecturi de erori.

Dacă dorești să înveți cum să adaugi Capgo la aplicația ta Next.js, aruncă o privire la articolul următor:

## Credite

Mulțumiri mari lui Simon, acest articol este bazat pe [acest articol](https://devdactic.com/nextjs-and-capacitor/) rescris pentru nuxt3 cu chat-gpt-4 și adaptat.
