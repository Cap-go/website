---
slug: how-to-send-specific-version-to-users
title: Come inviare aggiornamenti specifici a determinati utenti o gruppi
description: >-
  Consenti ai tuoi utenti di testare le versioni beta senza dover utilizzare
  TestFlight o il processo beta di Google. Basta aggiungere un pulsante nella
  tua app Ionic, ed è fatto!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: Illustrazione alternativa per TestFlight
tag: alternatives
published: true
locale: it
next_blog: ''
---

## Prefazione

Quando inizi ad apprezzare il sistema di aggiornamento di Capgo, come me per le mie app, inizierai a chiederti "E se volessi di più?"

Ho avuto anch'io questa sensazione, ma essendo il creatore di Capgo, ho potuto dare un'occhiata!

> Dato che tutto è open-source, anche tu hai questo potere :)

Il prossimo problema che ho incontrato nel processo di distribuzione delle app Capacitor è far testare gli aggiornamenti ad altri membri del team!

Con TestFlight, il problema è semplice: far entrare le persone nel tuo team e far capire loro come ottenerlo richiede tempo!

E ovviamente, ogni volta che invii ad Apple, c'è un processo di revisione casuale da parte di un bot che può richiedere 5 minuti o 5 ore, non si sa mai.

Mi è capitato molte volte di ritardare la mia presentazione per questo...

E per Google è ancora peggio, il grande mistero della mia vita: rilasciare una versione di produzione richiede meno di 2 ore, ma rilasciare una beta chiusa richiede 1-2 giorni.

## Soluzione

Per risolvere questo, ho creato il sistema dei Canali in Capgo

`npx @capgo/cli@latest bundle upload -c production` aggiornerà tutti gli utenti (se il canale di produzione è impostato come predefinito)

Se fai `npx @capgo/cli@latest bundle upload -c development` allora la versione arriva a un canale diverso, questo può essere automatizzato in [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/)

Poi hai 2 modi per permettere agli utenti di ottenere gli aggiornamenti dal canale

### Modo super automatico

Questo può essere utile quando non vuoi creare il tuo backend per l'impostazione del canale, è veloce da implementare

Con questo, l'unica cosa che devi fare è consentire a uno dei tuoi canali di essere impostato autonomamente

![Consenti impostazione autonoma in Capgo](/self_setwebp)

E poi aggiungi questo nel codice della tua app Ionic, per una migliore esperienza, usalo dopo che l'utente clicca su un pulsante come "registrati per la beta"

### Modo manuale

Questo può essere utile per il tuo team interno, è veloce da implementare
Consenti agli utenti di copiare il loro deviceID dalla tua app e inviartelo manualmente, questo codice ti aiuterà a ottenerlo:

Nascondi un pulsante da qualche parte nella tua app, o mostra il pulsante solo agli utenti connessi con un ruolo `admin`, ad esempio

Poi vai nell'app Web o nell'app nativa Capgo, connettiti come amministratore dell'app, seleziona la tua app, clicca sull'elenco dei dispositivi

Quindi inserisci nella barra di ricerca il deviceID, clicca su quello trovato e poi clicca sul link del Canale, scegli `development`, chiedi al tuo compagno di squadra di aprire di nuovo l'app, aspetta 30 secondi e apri chiudi

Dovrebbe ottenere la tua versione

### Modo automatico

Questo può essere utile per i tuoi beta tester, richiede più tempo per l'implementazione

Come nel modo manuale, devi ottenere il deviceID

Ma questa volta devi inviarlo automaticamente al tuo backend, lascio a te decidere come farlo

Ti suggerisco solo di memorizzarlo in un database, ti faciliterà la vita in seguito

Poi nel tuo backend devi inviarlo anche al backend di Capgo. Di seguito due esempi di codice:

Dopo aver configurato questo, prova ad aggiungere un pulsante nella tua app per aderire al canale e controlla nell'app web se è stato impostato

Puoi anche inviare `null` per rimuovere l'override

Se hai bisogno di controllare programmaticamente quale override è impostato su un dispositivo, puoi ottenerlo sulla stessa URL