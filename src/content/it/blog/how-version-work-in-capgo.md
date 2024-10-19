---
slug: how-version-work-in-capgo
title: Come funziona il controllo delle versioni in Capgo
description: >-
  Comprendere come Capgo gestisce le versioni nella tua app Capacitor e
  utilizzalo in modo ottimale. Scopri il significato di Major, Minor e Patch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Sistema di versione dei pacchetti Capgo
tag: Tutorial
published: true
locale: it
next_blog: how-to-release-major-version-in-capgo
---

Capgo utilizza 2 variabili principali per gestire le versioni nella tua app Capacitor:
  - Versione nativa
  - Versioni JavaScript


<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgo.webp" alt="Capacitor update system">
</div>

Tutte le scelte di versione sono decise lato server da Capgo

## Sistema di versionamento

Per gestire le versioni Capgo utilizza il sistema SemVer, leggi di più su di esso [qui](https://semverorg/)

### Versioni

Dove Capgo trova la versione da confrontare

  > Puoi sovrascrivere questo comportamento impostando la chiave version nel file `capacitorconfigjson` [documentazione qui](/docs/plugin/settings/#version)
  > La versione nativa verrà ignorata per tutte le piattaforme

#### IOS

 In IOS la variabile è impostata nel tuo progetto qui `ios/App/App/Infoplist` sotto la chiave `CFBundleShortVersionString` o `ios/App/Appxcodeproj/projectpbxproj` sotto la chiave `MARKETING_VERSION` se `MARKETING_VERSION` è stato impostato nel tuo file `Infoplist`

#### Android

  In Android, la variabile è impostata nel tuo progetto qui `android/app/buildgradle` sotto la chiave `defaultConfigversionName`

#### JavaScript (versione del bundle Capgo)

  In JavaScript, la variabile può essere impostata nel tuo `packagejson` sotto la chiave `version`
  Altrimenti devi fornirla nel comando di upload

## Comportamento predefinito

Questo è come si comporterà il canale Capgo se non hai modificato alcuna impostazione

> Questo comportamento si baserà sull'unico canale che hai reso predefinito

### Quando viene effettuata una nuova installazione della tua app Capacitor
Quando l'utente ha scaricato la tua app Ionic per la prima volta e apre l'app, questa contatta il server Capgo

Attualmente, possono verificarsi 4 risultati:
  - La versione del bundle nativo (123) è inferiore alla versione del bundle Capgo (124), Capgo invia il suo bundle all'utente
  - La versione del bundle nativo (123) è uguale alla versione del bundle Capgo (123), Capgo invia "non è necessario aggiornare"
  - La versione del bundle nativo (124) è superiore alla versione del bundle Capgo (123), Capgo invia "non è necessario aggiornare"
  - La versione del bundle nativo (123) è MAGGIORE inferiore alla versione del bundle Capgo (223), Capgo invia "non è necessario aggiornare"

### Altre impostazioni

#### Disabilita il downgrade automatico sotto la versione nativa

Se modifichi questa impostazione su false, Capgo considererà sempre di essere la fonte affidabile della versione
Quindi il comportamento diventa:
- La versione nativa (124) è superiore alla versione Capgo (123)

> Capgo invia la sua versione all'utente

#### Disabilita la strategia di aggiornamento automatico

Ci sono alcune strategie tra cui puoi scegliere. Puoi saperne di più [qui](/docs/tooling/cli/#disable-updates-strategy)

## Versione del bundle JavaScript

La versione del bundle JavaScript è quella che invii quando esegui `npx @capgo/cli@latest bundle upload --channel production`

Se non hai utilizzato l'opzione `--bundle 123`, Capgo otterrà la versione del bundle dal tuo file `packagejson` (nella chiave version)

Dopo che la tua app Ionic ha installato una versione da Capgo, è questa versione che verrà confrontata per:
  - La loro versione del bundle JavaScript (123) è inferiore alla versione del bundle Capgo (124), Capgo invia il suo bundle all'utente

Con alcune condizioni di guardia:
  - Se la versione del bundle nativo è superiore alla versione Capgo, viene applicata la condizione `Disabilita il downgrade automatico sotto la versione nativa`
  - Se la versione del bundle nativo è MAGGIORE inferiore alla versione Capgo, viene applicata la condizione `Disabilita l'aggiornamento automatico sopra la versione maggiore`

## Aggiornamento dell'App Store

Quando pubblichi la tua app Capacitor JS sull'App Store, quello che succede è semplice

L'utente otterrà la nuova versione dallo store e rimuoverà tutti gli aggiornamenti locali nella loro app per impostazione predefinita

Se vuoi modificare questo comportamento, devi impostare l'impostazione `resetWhenUpdate` leggi di più su di essa [qui](/docs/plugin/api#settings)

Questo può essere modificato solo lato app, non dal cloud come altre impostazioni

### Altre impostazioni

Dopo tutto questo comportamento, puoi avere sopra di esso alcuni specifici legati al deviceID

In Capgo, puoi decidere di sovrascrivere il comportamento per ogni deviceID

Puoi collegare un deviceID a:
  - una versione specifica del bundle
  - un canale specifico

Questo bypassa tutte le impostazioni fatte sopra

Scopri di più nell'articolo qui sotto