---
slug: how-your-usage-is-counted
title: Come viene calcolato il tuo utilizzo su Capgo
description: >-
  Capisci come Capgo calcola il tuo utilizzo e sfruttalo al meglio. Impara come
  gestire meglio il tuo pacchetto
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Il sistema di utilizzo di Capgo spiegato
tag: Solution
published: true
locale: it
next_blog: ''
---

Nel Capgo, 3 valori sono contati e importanti da capire:
- Utenti
- Archiviazione 
- Larghezza di banda

Ognuno ha un modo leggermente diverso di essere conteggiato

## Utenti

Ogni volta che un utente scarica la tua app Capacitor JS e la apre, invierà una richiesta al backend di Capgo per sapere se è disponibile un aggiornamento.
Quando l'app lo fa, invia poche informazioni, tra cui la più importante `DeviceID`

`DeviceID`: è un ID univoco (UUID) definito dal sistema operativo del dispositivo, questo ID è univoco per installazione dell'app

Ogni volta che il tuo account riceve un nuovo Device ID, viene salvato nel database
Ogni volta che un vecchio `DeviceID` richiede un aggiornamento (apertura app), il suo record viene aggiornato (updated_at nel database)

Questi dati vengono salvati in 2 luoghi:
- tabella dei dispositivi con valore `update_at` 
- app_stats con contatore giornaliero che rappresenta il numero di dispositivi diventati attivi oggi e non attivi questo mese

Per il limite del piano viene utilizzato il primo metodo perché è affidabile al 100%, per visualizzare il grafico viene utilizzato il secondo
Puoi vedere entrambi nel tuo account nella home page:
- nel grafico è il secondo metodo
- nella tabella delle app è il primo metodo

> Capgo non conta emulatori e build di sviluppo nel tuo utilizzo. Tieni presente che dopo la prova non puoi averne più del 3%, altrimenti il tuo account verrà bloccato finché non lo sistemi

> Capgo sta anche facendo alcuni filtraggi per te. Se hai configurato CI/CD per inviare la tua versione a Google PLAY, Google esegue la tua app Capacitor ogni volta su oltre 20 dispositivi reali. Durante le prime 4 ore di un nuovo bundle, blocchiamo gli IP del data center di Google per evitare che vengano conteggiati

Ogni mese, questi dati ripartono da zero

- Crea o aggiorna un dispositivo nel mio database ad ogni richiesta del dispositivo
- Aggiunge a un contatore giornaliero il numero di dispositivi attivi che non sono stati attivi questo mese

Il primo metodo restituisce: 900+ utenti
mentre il secondo è a 200+ utenti sul tuo account
Per il limite del piano uso il primo metodo, che è affidabile al 100%, e per visualizzare il grafico uso il secondo
Puoi vedere entrambi nella home page del tuo account

## Archiviazione

Ogni volta che carichi un bundle, questo numero viene aumentato della dimensione del caricamento

Questi dati sono relativi solo alla dimensione del tuo caricamento, migliore è la dimensione della tua app, meglio rimani nel tuo piano

Se raggiungi il limite o sei vicino, puoi elencare i tuoi bundle con il CLI:
`npx @capgo/cli@latest bundle list`
Per vedere cosa potresti pulire, rimuovere un bundle libera lo spazio ma non cancella le statistiche

Quando sei pronto per la pulizia, usa questo comando per rimuovere molti bundle:
`npx @capgo/cli@latest bundle cleanup`

PS: questo è positivo per il pianeta, ma anche per il tuo portafoglio 💪

> Puoi anche usare `--external` di upload per utilizzare il tuo spazio di archiviazione, e non conteggiarlo nel tuo piano

## Larghezza di banda

Il calcolo di questo valore è un po' più complesso, ma l'idea è la stessa dell'archiviazione

Ogni volta che un utente scarica un bundle, questo numero viene aumentato della dimensione del download

Questi dati sono relativi solo alla dimensione del tuo download, migliore è la dimensione della tua app Capacitor JS, meglio rimani nel tuo piano

> Una cosa importante da notare, Capgo non può vedere quale dimensione viene scaricata, vede solo la dimensione del bundle. Quindi se hai un bundle grande, e hai molti utenti che non riescono a scaricarlo, raggiungerai rapidamente il limite

Il modo migliore per rimanere nel tuo piano è avere un bundle piccolo, e se non puoi, mostra una barra di download al tuo utente, e fai sapere loro quanto manca da scaricare

In futuro, Capgo migliorerà il sistema di download per avere più possibilità di scaricare il bundle in una volta sola