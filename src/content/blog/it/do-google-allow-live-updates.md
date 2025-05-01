---
slug: do-google-allow-live-updates
title: >-
  Google consente di inviare aggiornamenti in tempo reale alle App senza la
  revisione del Play Store.
description: >-
  Come distribuire gli aggiornamenti del codice alle app Android in produzione
  rimanendo completamente conformi alle linee guida di Google?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: How to bypass Capacitor
keywords: 'Google, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play è meno restrittivo di Apple quando si tratta di aggiornare le app

L'aggiornamento delle app distribuite tramite Google Play può essere un compito complesso, ma è importante seguire le linee guida di Google per rimanere conformi. Secondo le linee guida di Google Play, le app non devono modificarsi, sostituirsi o aggiornarsi utilizzando metodi diversi dal meccanismo di aggiornamento di Google Play. Ciò significa che non è consentito scaricare codice eseguibile, come file dex, JAR o so, da una fonte diversa da Google Play.

Tuttavia, questa restrizione non si applica al codice che viene eseguito in una macchina virtuale o in un interprete che fornisce accesso indiretto alle API Android, come JavaScript in una webview o browser. Questo significa che puoi utilizzare linguaggi interpretati, come JavaScript, Python, Lua, ecc., per aggiornare la tua app senza passare attraverso il processo di revisione di Google Play. Uno strumento che può aiutare in questo processo è il plugin Capacitor Capgo. Questo plugin consente agli sviluppatori di aggiornare il loro codice HTML, CSS e JavaScript e inviare aggiornamenti alle loro app senza necessità di revisione.

Inoltre, le app o il codice di terze parti che utilizzano linguaggi interpretati, come JavaScript, Python, Lua, ecc., che vengono caricati durante l'esecuzione, non devono consentire potenziali violazioni delle politiche di Google Play. È importante notare che questo codice interpretato non dovrebbe essere incluso nel pacchetto dell'app.

Seguendo queste linee guida e utilizzando strumenti come il plugin Capacitor Capgo, puoi assicurarti che gli aggiornamenti della tua app siano conformi alle politiche di Google Play e che la tua app rimanga disponibile per gli utenti sulla piattaforma. Tieni presente che è sempre una buona idea verificare l'ultima versione delle politiche di Google per assicurarti di seguirle correttamente.

Per maggiori informazioni su come installare Capgo per evitare la revisione, consulta il mio prossimo articolo.