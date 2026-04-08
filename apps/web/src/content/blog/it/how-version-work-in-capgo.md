---
slug: how-version-work-in-capgo
title: Come funziona il versionamento in Capgo
description: >-
  Capisci come Capgo gestisce le versioni nella tua app Capacitor e utilizzalo
  al meglio. Scopri il significato di major, minor, patch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Sistema di versioni dei bundle Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
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

Tutte le scelte delle versioni sono decise lato server da Capgo.

## Sistema di versionamento

Per gestire le versioni Capgo utilizza il sistema SemVer, maggiori informazioni [qui](https://semver.org/).

### Versioni

Dove Capgo trova la versione da confrontare

  > Puoi sovrascrivere questo comportamento impostando la chiave version nel file `capacitor.config.json` [documentazione qui](/docs/plugin/settings/#version)
  > La versione nativa verrà ignorata per tutte le piattaforme.

#### IOS

In IOS la variabile è impostata nel tuo progetto qui `ios/App/App/Info.plist` sotto la chiave `CFBundleShortVersionString` o `ios/App/App.xcodeproj/project.pbxproj` sotto la chiave `MARKETING_VERSION` se `MARKETING_VERSION` è stato impostato nel tuo file `Info.plist`.

#### Android

In Android, la variabile è impostata nel tuo progetto qui `android/app/build.gradle` sotto la chiave `defaultConfig.versionName`

#### JavaScript (versione bundle Capgo)

In JavaScript, la variabile può essere impostata nel tuo `package.json` sotto la chiave `version`
Altrimenti devi fornirla nel comando di upload.

## Comportamento predefinito

Questo è come si comporterà il canale Capgo se non hai modificato alcuna impostazione.

> Questo comportamento sarà basato sull'unico canale che hai reso predefinito.

### Durante la prima installazione della tua app Capacitor
Quando l'utente scarica la tua app Ionic per la prima volta e la apre, contatta il server Capgo.

Attualmente, possono verificarsi 4 risultati:
1. La versione del bundle nativo (1.2.3) è inferiore alla versione del bundle Capgo (1.2.4), Capgo invia il suo bundle all'utente.
2. La versione del bundle nativo (1.2.3) è uguale alla versione del bundle Capgo (1.2.3), Capgo invia "non è necessario aggiornare".
3. La versione del bundle nativo (1.2.4) è superiore alla versione del bundle Capgo (1.2.3), Capgo invia "non è necessario aggiornare".
4. La versione del bundle nativo (1.2.3) è MAJOR inferiore alla versione del bundle Capgo (2.2.3), Capgo invia "non è necessario aggiornare".

### Altre impostazioni

#### Disabilita il downgrade automatico sotto nativo

Se cambi questa impostazione in false, Capgo considererà sempre se stesso come fonte affidabile della versione.
Quindi il comportamento diventa:
- La versione nativa (1.2.4) è superiore alla versione Capgo (1.2.3)

> Capgo invia la sua versione all'utente.

#### Disabilita strategia di auto-upgrade

Ci sono diverse strategie tra cui puoi scegliere. Puoi saperne di più [qui](/docs/cli/commands/#disable-updates-strategy)

## Versione bundle JavaScript

La versione del bundle JavaScript è quella che invii quando esegui `npx @capgo/cli@latest bundle upload --channel production`

Se non hai utilizzato l'opzione `--bundle 1.2.3`, Capgo prenderà la versione del bundle dal tuo file `package.json` (nella chiave version).

Dopo che la tua app Ionic ha installato una versione da Capgo, questa è la versione che verrà confrontata per:
- La loro versione bundle JavaScript (1.2.3) è inferiore alla versione bundle Capgo (1.2.4), Capgo invia il suo bundle all'utente.

Con alcune condizioni di guardia:
- Se la versione del bundle nativo è superiore alla versione Capgo, viene applicata la condizione `Disabilita downgrade automatico sotto nativo`.
- Se la versione del bundle nativo è MAJOR inferiore alla versione Capgo, viene applicata la condizione `Disabilita auto upgrade sopra major`.

## Aggiornamento App Store

Quando pubblichi la tua app Capacitor JS sull'App Store, ciò che accade è semplice.

I tuoi utenti otterranno la nuova versione dallo store e rimuoveranno tutti gli aggiornamenti locali nella loro app per impostazione predefinita.

Se vuoi modificare questo comportamento, devi impostare l'impostazione `resetWhenUpdate` maggiori informazioni [qui](/docs/plugin/api#settings)

Questo può essere modificato solo lato app, non dal cloud come altre impostazioni.

### Altre impostazioni

Dopo tutto questo comportamento, puoi avere sopra alcuni specifici legati al deviceID.

In Capgo, puoi decidere di sovrascrivere il comportamento per ogni deviceID.

Puoi collegare un deviceID a:
- una versione bundle specifica
- un canale specifico

Questo bypassa tutte le impostazioni fatte sopra.

Scopri di più nell'articolo qui sotto.
