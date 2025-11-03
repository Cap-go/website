---
slug: how-your-usage-is-counted
title: Come viene conteggiato il tuo utilizzo in Capgo
description: >-
  Scopri come Capgo conta il tuo utilizzo e come utilizzarlo al meglio. Impara a
  gestire meglio il tuo piano
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Sistema di utilizzo di Capgo spiegato
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: it
next_blog: ''
---

In Capgo, vengono contati 3 valori importanti da comprendere
- Utenti
- Archiviazione
- Larghezza di banda

Ognuno ha un modo leggermente diverso di essere conteggiato


## Utenti

Ogni volta che un utente scarica la tua app Capacitor JS e la apre, invierà una richiesta al backend di Capgo per sapere se è disponibile un aggiornamento
Quando l'app lo fa, invia piccole informazioni, inclusa la più importante `DeviceID`

`DeviceID`: è un ID univoco (UUID) generato sul dispositivo. **A partire dalla versione del plugin v6.25.0 e v7.25.0**, questo ID ora persiste tra le reinstallazioni dell'app (memorizzato in modo sicuro nello storage del dispositivo). Prima di queste versioni, l'ID veniva reimpostato ad ogni installazione dell'app

Ogni volta che il tuo account riceve un nuovo Device ID, viene salvato nel database
Ogni volta che un vecchio `DeviceID` richiede un aggiornamento (apertura app), il suo record viene aggiornato (updated_at nel database)

Questi dati vengono salvati in 2 posti:
- tabella device con valore `update_at`
- app_stats con contatore giornaliero che rappresenta il numero di dispositivi che sono diventati attivi oggi e non sono stati attivi questo mese

Per il limite del piano viene utilizzato il primo metodo perché è affidabile al 100%, per visualizzare il grafico viene utilizzato il secondo
Puoi vedere entrambi nel tuo account nella homepage:
- nel grafico è il secondo metodo
- nella tabella delle app è il primo metodo

> Capgo non conta gli emulatori e le build di sviluppo nel tuo utilizzo. Tieni presente che dopo il periodo di prova non puoi averne più del 3%, altrimenti il tuo account verrà bloccato fino a quando non lo risolvi

> Capgo sta anche facendo alcuni filtraggi per te. Se hai configurato CI/CD per inviare la tua versione a Google PLAY, Google esegue la tua app Capacitor ogni volta su più di 20 dispositivi reali. Durante le prime 4 ore di un nuovo bundle, blocchiamo gli IP del data center di Google per evitare che vengano conteggiati

Ogni mese, questi dati partono da zero


- Crea o aggiorna un dispositivo nel mio database ad ogni richiesta del dispositivo
- Aggiunge a un contatore giornaliero il numero di dispositivi attivi che non sono stati attivi questo mese

Il primo metodo restituisce: 900+ utenti
mentre il secondo è a 200+ utenti sul tuo account
Per il limite del piano uso il primo metodo, che è affidabile al 100%, e per visualizzare il grafico uso il secondo
Puoi vedere entrambi sulla homepage del tuo account

## Archiviazione

Ogni volta che carichi un bundle, questo numero viene aumentato della dimensione del caricamento

Questi dati sono relativi solo alla dimensione del caricamento, migliore è la dimensione della tua app, meglio rimani nel tuo piano

Se raggiungi il limite o sei vicino, puoi elencare i tuoi bundle con la CLI:
`npx @capgo/cli@latest bundle list`
Per vedere cosa potresti pulire, rimuovere un bundle libera lo spazio ma non cancella le statistiche

Quando sei pronto per la pulizia, usa questo comando per rimuovere molti bundle:
`npx @capgo/cli@latest bundle cleanup`

PS: questo è buono per il pianeta, ma anche per il tuo portafoglio 💪

> Puoi anche usare `--external` del caricamento per utilizzare il tuo storage, e non contare nel tuo piano

## Larghezza di banda

Il calcolo di questo valore è un po' più complesso, ma l'idea è la stessa dello storage

Ogni volta che un utente scarica un bundle, questo numero viene aumentato della dimensione del download

Questi dati sono relativi solo alla dimensione del download, migliore è la dimensione della tua app Capacitor JS, meglio rimani nel tuo piano

> Una cosa importante da notare, Capgo non può vedere quale dimensione viene scaricata, vede solo la dimensione del bundle. Quindi se hai un bundle grande e hai molti utenti che non riescono a scaricarlo, raggiungerai il limite velocemente

Il modo migliore per rimanere nel tuo piano è avere un bundle piccolo, e se non puoi, mostra una barra di download ai tuoi utenti e fai sapere loro quanto manca da scaricare

In futuro, Capgo migliorerà il sistema di download per avere più possibilità di scaricare il bundle in una volta