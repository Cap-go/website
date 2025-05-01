---
slug: developing-cross-platform-apps-with-capacitorjs
title: >-
  Le développement d'applications multi-plateformes avec CapacitorJS : Un guide
  étape par étape
description: >-
  Pelajari cara membuat aplikasi lintas platform menggunakan CapacitorJS dengan
  satu basis kode JavaScript untuk Android, iOS, dan web (PWA).
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Sviluppo di applicazioni multipiattaforma
keywords: >-
  Capacitor, cross-platform, PWA, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Tuto
published: true
locale: it
next_blog: ''
---

Nel mondo in evoluzione dello sviluppo di applicazioni mobili, l'ascesa delle Progressive Web Applications (PWA) ha aperto la strada a nuovi runtime cross-platform. Questi runtime consentono alle applicazioni basate sul web di essere presenti negli app store senza dipendere esclusivamente dal codice nativo. Una di queste tecnologie è [**CapacitorJS**](https://capacitorjs.com/), che permette agli sviluppatori di distribuire un semplice sito web come applicazione su Android, iOS e web utilizzando un'unica base di codice JavaScript. Questo approccio riduce significativamente i costi di sviluppo e aumenta l'efficienza della codifica.

Questa guida si concentrerà sulla creazione di un'applicazione utilizzando JavaScript puro senza framework aggiuntivi. Nonostante le difficoltà nel trovare risorse per lo sviluppo di app in JavaScript puro nel 2021, siamo qui per fornirti un tutorial completo sulla costruzione della tua applicazione e sull'utilizzo di plugin nativi con CapacitorJS.

## ‣ Prerequisiti

Prima di iniziare, assicurati di avere installati i seguenti strumenti:

- [**Node.js**](https://nodejs.org/en/) **(v14.16.1)** o superiore
- **NPM (v7.6.2)** o superiore
- [**Android Studio**](https://developer.android.com/studio/) per lo sviluppo di app Android
- [**Xcode**](https://apps.apple.com/de/app/xcode/id497799835/?mt=12) per lo sviluppo di app iOS (solo macOS)

> **Nota**: Lo sviluppo di app iOS è possibile solo su dispositivi macOS

## ‣ Configurazione del Progetto Capacitor

Per creare un'applicazione Capacitor, naviga nella cartella desiderata ed esegui il seguente comando nel terminale:

```
npm init @capacitor/app
```

Segui le istruzioni per installare il pacchetto e configurare il tuo progetto. Con Capacitor v3, la directory del tuo progetto dovrebbe apparire così:

```
www/
  css/
    style.css
  js/
    capacitor-welcome.js
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
```

Con la configurazione iniziale completata, sei pronto per procedere.

## ‣ Ristrutturazione del Progetto

Useremo Vite per bundlare i nostri file JavaScript, quindi ristrutturiamo il nostro progetto di conseguenza:

- **Crea** una nuova cartella `src` nella directory principale
- **Crea** un nuovo file script `index.js` in `src/`
- **Crea** il file di configurazione Vite `vite.config.js` nella directory principale
- **Rimuovi** il file `capacitor-welcome.js` da `www/js/`

La tua nuova struttura delle cartelle dovrebbe assomigliare a:

```
src/
  index.js
www/
  css/
    style.css
  js/
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
vite.config.js
```

## ‣ Adattamento a JavaScript Puro

Modifichiamo alcuni file per lavorare con JavaScript puro:

## www/index.html

1. Rimuovi le importazioni degli script per [**Ionic PWA Elements**](https://capacitorjs.com/docs/web/pwa-elements/) se non stai rilasciando l'app come PWA:

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2. Elimina l'elemento HTML `<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">` dal body

3. Aggiorna l'importazione dello script da `capacitor.js` a `js/main.js`. Questo sarà il nostro file JavaScript bundlato

4. Rimuovi l'importazione di `js/capacitor-welcome.js`. Il tuo `index.html` è ora pronto

## vite.config.js

Per bundlare i nostri moduli Node.js con [**Vite**](https://vitejs.dev/), necessitiamo di un file di configurazione che specifichi la destinazione di output per il nostro script bundlato. La seguente configurazione prenderà il file `src/index.js` e lo bundlerà per la produzione come `www/js/main.js`:

```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'www'),
    rollupOptions: {
      input: './src/index.js',
      output: {
        format: 'es',
        file: path.resolve(__dirname, 'www/js/main.js')
      }
    }
  }
});
```

## capacitor.config.json

Nel file `capacitor.config.json`, trova la proprietà `"bundledWebRuntime": true` e cambiala in `false`. Questa modifica assicura che Capacitor non bundli i file, permettendoci invece di usare Vite per questo scopo.

Con queste modifiche, la configurazione base della tua applicazione Capacitor è completa e sei pronto per iniziare a sviluppare la tua app con JavaScript puro.

## ‣ Sviluppo della Tua App

Ora che le basi sono state poste, puoi iniziare a scrivere la logica della tua applicazione nel file `src/index.js`. Qui puoi importare qualsiasi modulo Node.js necessario, definire le funzionalità della tua app e interagire con i plugin nativi di Capacitor.

Ricorda di eseguire il comando di build di Vite per bundlare i tuoi file JavaScript ogni volta che apporti modifiche:

```bash
vite build
```

Questo comando genererà il file `main.js` nella tua directory `www/js`, che il tuo file `index.html` referenzierà.

## ‣ Test e Debug

Capacitor fornisce un modo conveniente per testare la tua applicazione su varie piattaforme.Utilizzare i seguenti comandi per aprire la tua app nell'ambiente di sviluppo della rispettiva piattaforma:

Per Android:
```bash
npx cap add android
npx cap open android
```

Per iOS (solo macOS):
```bash
npx cap add ios
npx cap open ios
```

Per Web/PWA:
```bash
npx cap serve
```

Questi comandi ti permetteranno di eseguire la tua applicazione in Android Studio, Xcode o nel tuo browser web, dove potrai testare e fare debug secondo necessità.

## ‣ Conclusione

Sviluppare applicazioni multi-piattaforma con Capacitor utilizzando JavaScript puro è un modo efficiente ed economico per creare app per multiple piattaforme con un singolo codice base. Seguendo questa guida, hai configurato il tuo progetto, lo hai ristrutturato per Vite e preparato la tua app per lo sviluppo. Con questa base, sei sulla buona strada per costruire un'applicazione robusta e versatile.

Ricordati di testare accuratamente su tutte le piattaforme e di utilizzare i plugin nativi di Capacitor per migliorare le funzionalità della tua app. Buon coding!