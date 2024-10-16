---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Come creare un'applicazione Ionic Capacitor in Xcode Cloud
description: >-
  Usa Xcode Cloud per compilare la tua applicazione Capacitor JS ed evita la
  necessità di utilizzare MacOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Compilazione su Xcode Cloud per Capacitor
tag: Tutorial
published: true
locale: it
---

## Prerequisiti

Prima di continuare con il tutorial...

- Assicurati di usare GitHub
- Usa Capacitor
- La tua app è già pubblicata sull'App Store
- Voglia di leggere 😆...

L'uso di Ionic è opzionale, per Cordova potrebbe funzionare, ma non l'ho provato

## Importante riguardo al prezzo

![Prezzo Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

Il servizio è 'gratuito' fino al limite  
Puoi vedere nello screenshot prezzi e limiti (prezzi aggiornati alla creazione del tutorial, potrebbero subire variazioni in futuro)

🔴 **_Una volta avvisati dei requisiti e dei prezzi, se vuoi, proseguiamo_**

> **_📣_ Nel post, assumiamo di avere l'app già creata nell'App Store**

## Introduzione

Per far compilare la tua app Capacitor a Xcode, devi configurare alcune cose

## Preparazione del pacchetto

Assicurati di avere il comando di build nel tuo script `packagejson`
Poi aggiungi il comando `sync:ios` come sotto

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Questo passaggio farà funzionare semplicemente lo script post

## Script post-clone
Questo script verrà eseguito da Xcode cloud dopo la fase di clonazione

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
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Salva questo file nella root del tuo progetto e chiamalo `ios/App/ci_scripts/ci_post_clonesh`

Poi rendi eseguibile questo file con il comando `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Crea un flusso di lavoro Xcode

Apri Xcode (sì, per rimuovere Xcode hai bisogno di Xcode)

E vai a questa scheda:
![Xcode passo 1](/xcode_step_1webp)

Clicca su crea flusso di lavoro, seleziona la tua app, clicca avanti come sotto

![Xcode passo 2](/xcode_step_2webp)

Clicca su Modifica flusso di lavoro a sinistra
![Xcode passo 2](/xcode_step_3webp)

Vai alla scheda ambienti e scegli come sotto Mac 124 e seleziona l'opzione appropriata
![Xcode passo 3](/xcode_step_3webp)

Scegli la tua condizione di avvio
Se usi la stessa build di noi, suggerisco di usare Tag invece di branch, per evitare build doppie

Imposta la tua variabile d'ambiente
![Xcode passo 4](/xcode_step_4webp)

Connetti il tuo account GitHub
![Xcode passo 5](/xcode_step_5webp)

![Xcode passo 6](/xcode_step_6webp)

Poi abilita il flusso di lavoro e commit la tua prima modifica, dovresti vedere la tua build in esecuzione in Xcode

## **Elaborazione della build**

In Xcode Cloud, **vieni fatturato in base ai minuti** che hai utilizzato per eseguire il tuo flusso di lavoro CI/CD. Per esperienza, ci vogliono circa 10-15 minuti prima che una build possa essere elaborata nell'App Store

Per progetti privati, il costo stimato per build può arrivare fino a **$0,008/min x 5 min = $0,4**, o più, a seconda della configurazione o delle dipendenze del tuo progetto

Per progetti Open-source, questo non dovrebbe essere un problema. Vedi [prezzi](https://githubcom/pricing/)