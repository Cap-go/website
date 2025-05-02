---
slug: come-rilasciare-major-version-in-capgo
title: Come rilasciare una versione principale in capgo
description: >-
  Capisci come e quando è necessario rilasciare una versione principale della
  tua app senza compromettere l'app dell'utente
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Sistema di versioni principali di Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: it
next_blog: how-to-send-specific-version-to-users
original_slug: how-to-release-major-version-in-capgo
---
## Quando si rilascia una versione principale

La gestione delle versioni può essere difficile, solitamente si vuole inviare un aggiornamento Major quando appare un cambiamento importante per gli utenti.

Ma il versionamento non è fatto per questo, la versione dell'app store è diversa dalla versione Nativa.

La versione Nativa serve per gestire i cambiamenti sostanziali nel *codice*

In iOS, per esempio, iOS 16 è la `versione store` di Apple, ma la versione del codice è `20A5283p` (sembra che non usino SemVer)

Ora è chiaro che non li mescoliamo e li usiamo per ciò per cui sono stati creati!

## Rilascio principale

Nella tua app Capacitor, un rilascio principale è necessario quando si verifica un cambiamento sostanziale.
Per esempio, un nuovo target iOS (da 15 a 16), o una nuova versione di Capacitor (da 3 a 4), o un plugin (da 1.2 a 2.0) che usi è stato aggiornato a una versione principale.

Questo cambiamento significa che tutti gli strumenti devono essere allineati per gestire il cambiamento sostanziale.

Ecco perché Capgo segue questo sistema.
Quindi se rilasci una versione principale, Capgo non la invierà a un utente che non l'ha installata dallo store.\
Questo comportamento può essere personalizzato. Puoi saperne di più [qui](/docs/cli/commands/#disable-updates-strategy)

### Versioni

Dove Capgo trova la versione da confrontare

#### iOS
  > Verrà utilizzato da Capgo per confrontare con la versione JavaScript e trovare gli aggiornamenti Major

In iOS la variabile è impostata nel tuo progetto qui `ios/App/App/Info.plist` sotto la chiave `CFBundleShortVersionString` o `ios/App/App.xcodeproj/project.pbxproj` sotto la chiave `MARKETING_VERSION` se `MARKETING_VERSION` è stato impostato nel tuo file `Info.plist`.
  > Puoi sovrascrivere questo comportamento impostando la chiave version nel file `capacitor.config.json` [documentazione qui](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Verrà utilizzato da Capgo per confrontare con la versione JavaScript e trovare gli aggiornamenti Major

In Android, la variabile è impostata nel tuo progetto qui `android/app/build.gradle` sotto la chiave `defaultConfig.versionName`
  > Puoi sovrascrivere questo comportamento impostando la chiave version nel file `capacitor.config.json` [documentazione qui](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Verrà utilizzato da Capgo per confrontare con la versione Nativa e trovare gli aggiornamenti Major

In JavaScript, la variabile è impostata nel tuo progetto qui `package.json` sotto la chiave `version`

## Esempio

La tua app Ionic è attualmente rilasciata con la versione `1.2.3` con Capacitor 3

Stai facendo l'aggiornamento a Capacitor 4.

Devi aggiornare il numero di versione a `2.2.3`, quindi tutti i tuoi pacchetti incluso Capgo noteranno questo grande cambiamento.

Quando rilasci questa versione su Capgo e l'App Store.

Tutti i prossimi aggiornamenti live in Capgo `2.2.4` non verranno mai inviati agli utenti con versione `1.2.3`. Solo con versione `2.2.3`.

Se segui questo schema, non c'è bisogno di preoccuparsi ulteriormente, tutto è ben gestito.

## Se non seguo questo schema

In questo caso, significa che devi inviare la tua nuova app con Capacitor 4 ad Apple e Google, ma non a Capgo.

Poi devi attendere che il 100% dei tuoi utenti, o almeno il 90%, abbia l'app, ci vorranno probabilmente mesi.

Durante questo periodo non puoi inviare alcun aggiornamento con Capgo, poiché i vecchi utenti non possono ottenere la nuova versione.
Non hai un modo per selezionare solo alcuni utenti che riceveranno l'aggiornamento.
