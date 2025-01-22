---
slug: it__do-apple-allow-live-updates
title: >-
  Apple consente l'invio di aggiornamenti direttamente alle app senza revisione
  dell'App Store?
description: >-
  Come è possibile implementare gli aggiornamenti del codice per un'applicazione
  iOS già rilasciata, pur rimanendo pienamente conformi alle linee guida di
  Apple?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Illustrazione del condensatore di disaccoppiamento
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Aggiornare le app Capacitor JS senza passare attraverso il processo di revisione dell'App Store è possibile in determinate condizioni delineate nelle linee guida ufficiali di Apple. Tuttavia, è importante notare che questo non costituisce un parere legale. Affinché gli aggiornamenti del codice possano essere inviati direttamente a un'app e rimanere conformi alle linee guida di Apple, devono essere soddisfatte le seguenti condizioni:

- Il codice deve essere eseguito dal framework WebKit integrato di Apple
- Il codice non deve fornire, sbloccare o abilitare funzionalità o caratteristiche aggiuntive
- L'utente non deve essere consapevole che sta avvenendo un aggiornamento

Il plugin Capgo Capacitor consente di apportare aggiornamenti e modifiche a HTML, CSS e JavaScript, soddisfacendo la prima condizione.
La possibilità per le app di aggiornarsi senza passare attraverso il processo di revisione dell'App Store è disponibile da tempo per le app create utilizzando framework JavaScript come React Native di Facebook e servizi come Expo.

La seconda condizione, non fornire funzionalità o caratteristiche aggiuntive, è determinata dallo sviluppatore. Capgo è destinato a piccole modifiche o correzioni, piuttosto che all'introduzione di nuove funzionalità. Per cambiamenti significativi, è necessario rilasciare aggiornamenti attraverso l'App Store. Vale la pena notare che molti altri sviluppatori utilizzano aggiornamenti in tempo reale senza problemi o rifiuti da parte di Apple.

Google Play è meno restrittivo di Apple per quanto riguarda l'aggiornamento delle app. Google Play consente alle app installate dal loro store con bundle JavaScript di essere aggiornate da servizi non Google.

Per ulteriori informazioni su come installare Capgo per aggirare la revisione, si prega di fare riferimento al mio prossimo articolo.