---
slug: do-apple-allow-live-updates
title: >-
  Apple consente di inviare aggiornamenti live alle app senza la revisione
  dell'App Store.
description: >-
  Come è possibile distribuire aggiornamenti del codice alle app iOS in
  produzione e mantenere la piena conformità con le linee guida di Apple?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Illustrazione del bypass di Capacitor
keywords: 'Apple, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Ecco il testo tradotto in italiano:

L'aggiornamento delle app Capacitor JS senza passare attraverso il processo di revisione dell'App Store è possibile in determinate condizioni delineate nelle linee guida ufficiali di Apple. Tuttavia, è importante notare che questo non costituisce un parere legale. Affinché gli aggiornamenti del codice possano essere inviati direttamente a un'app e rimanere conformi alle linee guida di Apple, devono essere soddisfatte le seguenti condizioni:

- Il codice deve essere eseguito dal framework WebKit integrato di Apple
- Il codice non deve fornire, sbloccare o abilitare funzionalità o caratteristiche aggiuntive
- L'utente non deve essere consapevole che è in corso un aggiornamento

Il plugin Capgo Capacitor consente di apportare aggiornamenti e modifiche a HTML, CSS e JavaScript, soddisfacendo la prima condizione.
La possibilità per le app di aggiornarsi senza passare attraverso il processo di revisione dell'App Store è disponibile da tempo per le app create utilizzando framework JavaScript come React Native di Facebook e servizi come Expo.

La seconda condizione, non fornire funzionalità o caratteristiche aggiuntive, è determinata dallo sviluppatore. Capgo è destinato a piccole modifiche o correzioni, piuttosto che all'introduzione di nuove funzionalità. Per modifiche significative, è necessario rilasciare gli aggiornamenti attraverso l'App Store. È importante notare che molti altri sviluppatori utilizzano gli aggiornamenti in tempo reale senza problemi o rifiuti da parte di Apple.

Google Play è meno restrittivo di Apple quando si tratta di aggiornare le app. Google Play consente alle app installate dal loro store con bundle JavaScript di essere aggiornate da servizi non Google.

Per maggiori informazioni su come installare Capgo per evitare la revisione, consulta il mio prossimo articolo.
