---
slug: how-to-bypass-app-store-review
title: Ecco come aggiornare un'app Capacitor senza la revisione dell'App Store.
description: >-
  Come la funzionalità di Capgo permette di inviare aggiornamenti di codice
  direttamente per le app Ionic iOS rispettando pienamente le linee guida di
  Apple?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustrazione per evitare il condensatore
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Ecco la traduzione in italiano:

_Sono contento che tu l'abbia chiesto_

I miei avvocati mi hanno chiesto di farti sapere che questo non è un consiglio legale, ma non serve una laurea in legge per capire la formulazione nelle linee guida ufficiali di Apple. Le linee guida di Apple permettono esplicitamente di inviare codice eseguibile direttamente alla tua app, bypassando l'App Store, a queste tre condizioni:

* Il codice è eseguito dal framework WebKit integrato di Apple
* Il codice non fornisce, sblocca o abilita funzionalità o caratteristiche aggiuntive
* L'utente non vede che l'aggiornamento sta avvenendo

Con il plugin Capacitor di Capgo, puoi solo aggiornare e modificare il tuo HTML, CSS e JavaScript, quindi siamo a posto con la prima condizione.

Nota a margine, la possibilità per le app di aggiornarsi senza passare dall'App Store esiste da un po' di tempo.
Solo per le app create usando framework JavaScript come React Native di Facebook e servizi come Expo.

Una prova che React Native non è più nativo di Capacitor 😆

Capgo è semplicemente la prima soluzione accessibile che fornisce la capacità di inviare aggiornamenti a livello di codice alle app native Capacitor.
La seconda condizione, nessuna nuova funzionalità o caratteristica, dipende davvero da te.

Capgo non è pensato per inviare nuove funzionalità o caratteristiche. È inteso per modificarle o correggerle, evitando i rilasci minori necessari per correggere bug, aggiungere logging o tracking, aggiornare messaggi, forzare gli utenti ad aggiornare, ecc.

Per nuove funzionalità o caratteristiche, devi rilasciare attraverso l'app store. Per tua informazione, Ionic AppFlow (l'alternativa per grandi aziende) è installato su oltre 50 milioni di dispositivi iOS e non c'è mai stata un'app rifiutata perché lo usa.

Lo dico solo perché è bene sapere che migliaia di altri sviluppatori stanno usando gli aggiornamenti in tempo reale, quindi non sei solo.

Apple e Google hanno le loro regole su come aggiornare le app.

Per Apple, [dai un'occhiata al paragrafo 3.3.2](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf/)
[...] L'unica eccezione a quanto sopra sono script e codice scaricati ed eseguiti dal framework WebKit integrato di Apple o JavascriptCore [...] __TLDR__: dovremmo usare gli aggiornamenti OTA solo per correggere bug o apportare miglioramenti, senza fare cambiamenti significativi.

__Google__ Play è meno restrittivo - dicono che le app installate da Google Play con bundle JavaScript [non sono limitate](https://support.google.com/googleplay/android-developer/answer/9888379/?hl=en) ad essere aggiornate solo dai servizi Google.

Controlla il mio prossimo articolo per maggiori informazioni su come installare Capgo per bypassare la revisione.