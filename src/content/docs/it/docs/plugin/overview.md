---
title: Vue d'ensemble
description: Spiegazione dei due diversi approcci
sidebar:
  order: 1
locale: it
---

### Modalità Cloud (Consigliata)
La Modalità Cloud è la nostra scelta consigliata per una gestione degli aggiornamenti senza problemi. Il backend di Capgo si occupa di tutta la logica degli aggiornamenti, prendendo decisioni lato server per una migliore sicurezza e controllo. Questa modalità è incentrata sulla facilità d'uso: una volta configurata, funziona autonomamente, offrendo funzionalità avanzate come statistiche e canali. Può essere anche configurata in modalità manuale per darti maggior controllo, permettendoti di decidere quando aggiornare usando il tuo codice JavaScript. Il backend continua a gestire cosa viene aggiornato. Questa modalità condivide molti benefici con la Modalità Auto, specialmente nella sicurezza e nelle funzionalità avanzate, ma aggiunge la flessibilità di temporizzare gli aggiornamenti autonomamente.


### Modalità Self Hosted

La Modalità Self-Hosted Auto è per chi vuole gestire tutta la logica degli aggiornamenti sul proprio server. Offre completa autonomia ma richiede un server separato e più lavoro per gestire gli aggiornamenti e i requisiti del server.

La Modalità Self-Hosted Manual combina controllo e autonomia. Decidi quando aggiornare tramite JavaScript, ma il tuo server gestisce cosa viene aggiornato. È un po' complessa poiché stai includendo codice di aggiornamento negli aggiornamenti stessi.


:::note 
Se scegli il self hosting perderai tutte le ottime funzionalità che capgo cloud ha da offrire come: ripristini automatici, avvisi email, canali, statistiche, crittografia e altro
:::

:::danger
Se invii un aggiornamento errato ai tuoi utenti puoi e romperai la loro app
:::