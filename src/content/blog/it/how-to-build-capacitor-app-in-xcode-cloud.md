---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Come creare un'app Ionic Capacitor in Xcode Cloud
description: >-
  Utilizza Xcode cloud per compilare la tua app Capacitor JS ed evitare la
  necessità di MacOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Build su Xcode cloud per Capacitor
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: it
---
## Prerequisiti

Prima di continuare con il tutorial...

-   Assicurati di utilizzare GitHub
-   Usa Capacitor
-   La tua app è già pubblicata su Apple Store
-   Voglia di leggere 😆...

L'utilizzo di Ionic è opzionale, per Cordova potrebbe funzionare, ma non l'ho provato.

## Importante riguardo il prezzo

![Price Xcode Cloud](/xcode_cloud_price.webp)

[https://developer.apple.com/xcode-cloud/](https://developer.apple.com/xcode-cloud/)

Il servizio è '_gratuito_' fino al limite.  
Puoi vedere nello screenshot i prezzi e i limiti (prezzi aggiornati alla creazione del tutorial, potrebbero subire variazioni in futuro)

🔴 **_Una volta avvisati dei requisiti e dei prezzi, se vi va, continuiamo..._**

> **_📣_ Nel post, assumiamo di avere già l'app creata nell'Apple Store**

## Introduzione

Per far compilare la tua app Capacitor da Xcode, devi configurare alcune cose.

## Preparazione del Package

Assicurati di avere il comando di build nel tuo script `package.json`.
Poi aggiungi il comando `sync:ios` come sotto.

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Questo passaggio farà funzionare lo script post semplicemente

## Script post clone
Questo script verrà eseguito da Xcode cloud dopo la fase di clone

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Install CocoaPods
echo "📦 Install CocoaPods"
brew install cocoapods
brew install node@18
brew link node@18

# Install dependencies
# XCode Cloud is literally broken for 2 months now - https://developer.apple.com/forums/thread/738136?answerId=774510022#774510022
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn add --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Salva questo file nella root del tuo progetto e chiamalo `ios/App/ci_scripts/ci_post_clone.sh`

Poi rendi questo file eseguibile con questo comando `chmod +x ios/App/ci_scripts/ci_post_clone.sh`

## Creare un workflow Xcode

Apri Xcode (sì, per rimuovere Xcode hai bisogno di Xcode)

E vai in questa scheda:
![Xcode step 1](/xcode_step_1.webp)

Clicca su crea workflow, seleziona la tua app, clicca avanti come sotto.

![Xcode step 2](/xcode_step_2.webp)

Clicca su Modifica workflow sulla sinistra
![Xcode step 2](/xcode_step_3.webp)

Vai alla scheda ambienti e scegli come sotto Mac 12.4 e seleziona l'opzione appropriata
![Xcode step 3](/xcode_step_3.webp)

Scegli la tua condizione di avvio.
Se usi la stessa build come noi, suggerisco di usare Tag invece di branch, per evitare build doppie.

Imposta la tua variabile env
![Xcode step 4](/xcode_step_4.webp)

Connetti il tuo account GitHub
![Xcode step 5](/xcode_step_5.webp)

![Xcode step 6](/xcode_step_6.webp)

Quindi abilita il workflow e commit la tua prima modifica, dovresti vedere la tua build in esecuzione in Xcode.

## **Elaborazione della Build**

In Xcode Cloud, **vieni fatturato in base ai minuti** che hai utilizzato per eseguire il tuo workflow CI/CD. Per esperienza, ci vogliono circa 10-15 minuti prima che una build possa essere elaborata nell'Apple Store.

Per progetti privati, il costo stimato per build può arrivare fino a **$0.008/min x 5 mins = $0.4**, o più, a seconda della configurazione o delle dipendenze del tuo progetto.

Per progetti Open-source, questo non dovrebbe essere affatto un problema. Vedi [pricing](https://github.com/pricing/).
