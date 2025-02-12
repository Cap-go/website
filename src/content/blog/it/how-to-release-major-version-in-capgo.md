---
slug: it__how-to-release-major-version-in-capgo
title: Ecco come pubblicare una versione principale su Capgo
description: >-
  Capire come e quando rilasciare una versione principale della tua app senza
  compromettere le app degli utenti
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Versione principale del sistema Capgo
tag: Tutorial
published: true
locale: it
next_blog: how-to-send-specific-version-to-users
---

## Quando si rilascia una versione principale

La gestione delle versioni può essere difficile, solitamente si vuole inviare un aggiornamento principale quando appare un cambiamento importante per gli utenti

Ma il versionamento non è fatto per questo, la versione dell'app store è diversa dalla versione nativa

La versione nativa è fatta per gestire cambiamenti importanti nel *codice*

In iOS, ad esempio, iOS 16 è la `versione del negozio` di Apple, ma la versione del codice è `20A5283p` (non sembrano usare SemVer lì)

Ora è chiaro che non le mescoliamo e le usiamo per ciò per cui sono fatte!

## Rilascio principale

Nella tua app Capacitor, un rilascio principale è necessario quando si verifica un cambiamento importante 
Ad esempio, un nuovo target iOS (da 15 a 16), o una nuova versione di Capacitor (da 3 a 4), o un plugin (da 12 a 20) che usi è stato aggiornato a una versione principale

Questo cambiamento significa che tutti gli strumenti devono essere allineati per gestire il cambiamento importante

Ecco perché Capgo segue questo sistema
Quindi se rilasci una versione principale, Capgo non la invierà a un utente che non l'ha installata dallo store\
Questo comportamento può essere personalizzato Puoi saperne di più [qui](/docs/tooling/cli/#disable-updates-strategy)

### Versioni

Dove Capgo trova la versione da confrontare

#### iOS
  > Sarà utilizzata da Capgo per confrontare con la versione JavaScript e trovare aggiornamenti principali

 In iOS la variabile è impostata nel tuo progetto qui `ios/App/App/Infoplist` sotto la chiave `CFBundleShortVersionString` o `ios/App/Appxcodeproj/projectpbxproj` sotto la chiave `MARKETING_VERSION` se `MARKETING_VERSION` è stata impostata nel tuo file `Infoplist`
  > Puoi sovrascrivere questo comportamento impostando la chiave version nel file `capacitorconfigjson` [documentazione qui](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Sarà utilizzata da Capgo per confrontare con la versione JavaScript e trovare aggiornamenti principali

  In Android, la variabile è impostata nel tuo progetto qui `android/app/buildgradle` sotto la chiave `defaultConfigversionName`
  > Puoi sovrascrivere questo comportamento impostando la chiave version nel file `capacitorconfigjson` [documentazione qui](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Sarà utilizzata da Capgo per confrontare con la versione nativa e trovare aggiornamenti principali

  In JavaScript, la variabile è impostata nel tuo progetto qui `packagejson` sotto la chiave `version`
## Esempio

La tua app Ionic è attualmente rilasciata con la versione `123` con Capacitor 3

Stai facendo l'aggiornamento a Capacitor 4

Devi aggiornare il tuo numero di versione a `223`, quindi tutti i tuoi pacchetti incluso Capgo noteranno questo grande cambiamento

Quando rilasci questa versione su Capgo e l'App Store

Tutti i prossimi aggiornamenti live in Capgo `224` non saranno mai inviati agli utenti con la versione `123` Solo con la versione `223`

Se segui questo schema, non c'è bisogno di preoccuparsi ulteriormente, tutto è gestito bene


## Se non seguo questo

In questo caso, significa che devi inviare la tua nuova app con Capacitor 4 ad Apple e Google, ma non a Capgo

Poi devi aspettare che il 100% dei tuoi utenti, o almeno il 90%, abbia l'app, ci vorranno mesi, probabilmente

Mentre durante questo tempo non puoi inviare alcun aggiornamento con Capgo, poiché i vecchi utenti non possono ottenere la nuova versione
Non hai un modo per selezionare solo alcuni utenti per ricevere l'aggiornamento