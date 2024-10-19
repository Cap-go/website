---
slug: developing-cross-platform-apps-with-capacitorjs
title: >-
  Sviluppo di Applicazioni Multipiattaforma con CapacitorJS: Una Guida Passo
  dopo Passo
description: >-
  Scopri come creare applicazioni multipiattaforma con Capacitor e un'unica base
  di codice JavaScript per Android, iOS e Web (PWA).
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Sviluppo di applicazioni multipiattaforma
tag: Tuto
published: true
locale: it
next_blog: ''
---

Nel mondo in evoluzione dello sviluppo di applicazioni mobili, l'ascesa delle Progressive Web Applications (PWA) ha aperto la strada a nuovi runtime multipiattaforma. Questi runtime consentono alle applicazioni basate sul web di essere presenti negli app store senza fare affidamento esclusivamente sul codice nativo. Una di queste tecnologie che facilita ciò è Capacitor, che permette agli sviluppatori di distribuire un semplice sito web come applicazione su Android, iOS e web utilizzando un'unica base di codice JavaScript. Questo approccio riduce significativamente i costi di sviluppo e aumenta l'efficienza della codifica.

Questa guida si concentrerà sulla creazione di un'applicazione utilizzando JavaScript puro senza framework aggiuntivi. Nonostante le sfide nel trovare risorse per lo sviluppo di app in JavaScript puro nel 2021, siamo qui per fornirti un tutorial completo sulla costruzione della tua applicazione e sull'utilizzo di plugin nativi con Capacitor.

## ‣ Prerequisiti

Prima di iniziare, assicurati di avere installati i seguenti strumenti:

- Nodejs (v14.16.1) o superiore
- NPM (v7.6.2) o superiore
- Android Studio per lo sviluppo di app Android
- Xcode per lo sviluppo di app iOS (solo macOS)

> **Nota**: Lo sviluppo di app iOS è possibile solo su un dispositivo macOS

## ‣ Configurazione del tuo progetto Capacitor

Per creare un'applicazione Capacitor, naviga nella cartella desiderata ed esegui il seguente comando nel tuo terminale:

## ‣ Ristrutturazione del progetto

Useremo Vite per raggruppare i nostri file JavaScript, quindi ristrutturiamo il nostro progetto di conseguenza:

- **Crea** una nuova cartella `src` nella directory principale
- **Crea** un nuovo file script `index.js` in `src/`
- **Crea** il file di configurazione Vite `vite.config.js` nella directory principale
- **Rimuovi** il file `capacitor-welcome.js` da `www/js/`

La tua nuova struttura delle cartelle dovrebbe assomigliare a:

## ‣ Adattamento al JavaScript puro

Modifichiamo alcuni file per lavorare con JavaScript puro:

## www/index.html

1. Rimuovi le importazioni degli script per Ionic PWA Elements se non stai rilasciando l'app come PWA:

2. Elimina l'elemento HTML `<ion-app>` dal body

3. Aggiorna l'importazione dello script da `capacitor.js` a `js/main.js`. Questo sarà il nostro file JavaScript raggruppato

4. Rimuovi l'importazione di `js/capacitor-welcome.js`. Il tuo `index.html` è ora pronto

## vite.config.js

Per raggruppare i nostri moduli Nodejs con Vite, abbiamo bisogno di un file di configurazione che specifichi la destinazione di output per il nostro script raggruppato. La seguente configurazione prenderà il file `src/index.js` e lo raggrupperà per la produzione come `www/js/main.js`:

## capacitor.config.json

Nel file `capacitor.config.json`, individua la proprietà `"bundledWebRuntime": true` e cambiala in `false`. Questa modifica assicura che Capacitor non raggruppi i file, permettendoci invece di usare Vite per questo scopo.

Con queste modifiche, la configurazione di base della tua applicazione Capacitor è completa e sei pronto per iniziare a sviluppare la tua app con JavaScript puro.

## ‣ Sviluppo della tua app

Ora che sono state gettate le basi, puoi iniziare a scrivere la logica della tua applicazione nel file `src/index.js`. Qui puoi importare qualsiasi modulo Nodejs necessario, definire la funzionalità della tua app e interagire con i plugin nativi di Capacitor.

Ricorda di eseguire il comando di build di Vite per raggruppare i tuoi file JavaScript ogni volta che apporti modifiche:

Questo comando genererà il file `main.js` nella tua directory `www/js`, a cui il tuo file `index.html` farà riferimento.

## ‣ Test e debug

Capacitor fornisce un modo conveniente per testare la tua applicazione su varie piattaforme.Utilizza i seguenti comandi per aprire la tua app nell'ambiente di sviluppo della rispettiva piattaforma:

Per Android:
```
npm init @capacitor/app
```

Per iOS (solo macOS):
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

Per Web/PWA:
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

Questi comandi ti permetteranno di eseguire la tua applicazione in Android Studio, Xcode o nel tuo browser web, dove potrai testare e debuggare secondo necessità.

## ‣ Conclusione

Sviluppare applicazioni multipiattaforma con Capacitor utilizzando JavaScript puro è un modo economico ed efficiente per creare app per più piattaforme con un singolo codice base. Seguendo questa guida, hai configurato il tuo progetto, lo hai ristrutturato per Vite e hai preparato la tua app per lo sviluppo. Con questa base, sei sulla buona strada per costruire un'applicazione robusta e versatile.

Ricorda di testare accuratamente su tutte le piattaforme e di utilizzare i plugin nativi di Capacitor per migliorare le funzionalità della tua app. Buon coding!