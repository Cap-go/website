---
title: Vue d'ensemble
description: Spiegazione dei due diversi approcci
sidebar:
  order: 1
locale: it
---

### Modalità Cloud (Consigliata)
La modalità Cloud è la nostra scelta consigliata per una gestione senza problemi degli aggiornamenti. Il backend di Capgo si occupa di tutta la logica degli aggiornamenti, prendendo decisioni lato server per una migliore sicurezza e controllo. Questa modalità è incentrata sulla facilità d'uso: una volta configurata, funziona autonomamente, offrendo funzionalità avanzate come statistiche e canali. Può anche essere configurata in modalità manuale per darti più controllo, permettendoti di decidere quando aggiornare usando il tuo codice JavaScript. Il backend continua a gestire cosa viene aggiornato. Questa modalità condivide molti benefici con la Modalità Auto, specialmente in termini di sicurezza e funzionalità avanzate, ma aggiunge la flessibilità di temporizzare gli aggiornamenti autonomamente.

### Modalità Self Hosted

La Modalità Auto Self-Hosted è per chi vuole gestire tutta la logica degli aggiornamenti sul proprio server. Offre completa autonomia ma richiede un server separato e più lavoro per gestire gli aggiornamenti e i requisiti del server.

La Modalità Manuale Self-Hosted combina controllo e autonomia. Decidi quando aggiornare tramite JavaScript, ma il tuo server gestisce cosa viene aggiornato. È un po' complesso poiché stai includendo il codice di aggiornamento negli aggiornamenti stessi.

:::note
Se scegli di fare self hosting perderai tutte le fantastiche funzionalità che capgo cloud ha da offrire come: ripristini automatici, avvisi email, canali, statistiche, crittografia e altro
:::

:::danger
Se invii un aggiornamento difettoso ai tuoi utenti puoi e romperai la loro app
:::