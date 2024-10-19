---
slug: do-google-allow-live-updates
title: >-
  Google consente l'invio di aggiornamenti direttamente alle app senza la
  revisione dell'App Store?
description: >-
  Come si può implementare l'aggiornamento del codice per un'applicazione
  Android già rilasciata, rimanendo pienamente conformi alle politiche di
  Google?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Illustrazione del condensatore di disaccoppiamento
tag: Tutorial
published: true
locale: it
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play è meno restrittivo di Apple quando si tratta di aggiornare le app

L'aggiornamento delle app distribuite tramite Google Play può essere un compito difficile, ma è importante seguire le linee guida di Google per rimanere conformi. Secondo le linee guida di Google Play, le app non devono modificarsi, sostituirsi o aggiornarsi utilizzando alcun metodo diverso dal meccanismo di aggiornamento di Google Play stesso. Ciò significa che non è consentito scaricare codice eseguibile, come file dex, JAR o so, da una fonte diversa da Google Play.

Tuttavia, questa restrizione non si applica al codice che viene eseguito in una macchina virtuale o in un interprete che fornisce accesso indiretto alle API Android, come JavaScript in una webview o in un browser. Ciò significa che è possibile utilizzare linguaggi interpretati, come JavaScript, Python, Lua, ecc., per aggiornare l'app senza passare attraverso il processo di revisione di Google Play. Uno strumento che può aiutare in questo processo è il plugin Capgo per Capacitor. Questo plugin consente agli sviluppatori di aggiornare il codice HTML, CSS e JavaScript e inviare aggiornamenti alle loro app senza necessità di revisione.

Inoltre, le app o il codice di terze parti che utilizzano linguaggi interpretati, come JavaScript, Python, Lua, ecc., che vengono caricati in fase di esecuzione, non devono consentire potenziali violazioni delle politiche di Google Play. È importante notare che questo codice interpretato non dovrebbe essere incluso nel pacchetto dell'app.

Seguendo queste linee guida e utilizzando strumenti come il plugin Capgo per Capacitor, puoi assicurarti che gli aggiornamenti della tua app siano conformi alle politiche di Google Play e che la tua app rimanga disponibile per gli utenti sulla piattaforma. Tieni presente che è sempre una buona idea verificare la versione più recente delle politiche di Google per assicurarti di seguirle correttamente.

Per ulteriori informazioni su come installare Capgo per aggirare la revisione, consulta il mio prossimo articolo.