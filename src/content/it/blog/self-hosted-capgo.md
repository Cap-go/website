---
slug: self-hosted-capgo
title: Capgo autogestito
description: >-
  Ospitare autonomamente Capgo ti consente di distribuire aggiornamenti diretti
  di Capacitor ai tuoi utenti senza dover utilizzare il servizio cloud di Capgo.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: Capgo autohostato
tag: Solution
published: true
locale: it
next_blog: ''
---

Questo articolo fornisce una guida passo passo su come effettuare il self-hosting di Capgo, oltre a una discussione sui vantaggi e le sfide del self-hosting.

# Introduzione

Il self-hosting è una forma di gestione del proprio sito web o applicazione attraverso la configurazione autonoma di un server e una rete. Invece di utilizzare una piattaforma come servizio o un provider cloud pubblico, chi sceglie il self-hosting gestirà le proprie reti e sarà responsabile della manutenzione e del tempo di attività oltre a costruire il proprio sito web o applicazione.

Il modo più semplice per iniziare con Capgo è con il nostro [servizio gestito ufficiale nel cloud](https://capgoapp/), ma se sei disposto a gestirlo autonomamente, puoi anche effettuare il self-hosting di Capgo sul tuo server.

## Cos'è il self-hosting?

Il self-hosting, nel contesto del mondo digitale, si riferisce alla pratica di gestire i propri server o infrastrutture di hosting per gestire e controllare la propria presenza online e i servizi. Invece di affidarsi a fornitori di hosting di terze parti, individui e organizzazioni scelgono di configurare e gestire i propri server, siti web, applicazioni e archiviazione dei dati alle proprie condizioni.

## Perché scegliere il self-hosting?

Ci sono molte ragioni per cui le persone scelgono il self-hosting. Alcuni dei vantaggi più comuni includono:

* **Privacy e controllo:** Il self-hosting ti dà il controllo completo sui tuoi dati e sulla tua privacy. Non devi preoccuparti che fornitori di terze parti traccino la tua attività o vendano i tuoi dati.

* **Risparmio sui costi:** Il self-hosting può essere più conveniente a lungo termine, specialmente se utilizzi molte risorse o gestisci più servizi.

* **Personalizzazione:** Il self-hosting ti offre la flessibilità di personalizzare le tue applicazioni e servizi per soddisfare le tue esigenze specifiche.

* **Apprendimento e sperimentazione:** Il self-hosting può essere un ottimo modo per imparare Linux, l'amministrazione di sistema e altri argomenti tecnici. Può anche essere un modo divertente per sperimentare con nuovi software e servizi.

* **Indipendenza:** Il self-hosting riduce la tua dipendenza da fornitori esterni. Non sei alla mercé dei loro termini di servizio, cambiamenti di prezzo o potenziali interruzioni del servizio. Questa indipendenza può essere cruciale per le aziende e gli individui che dipendono dalla loro presenza online per funzioni critiche.

## Qual è la differenza tra Capgo Cloud e Capgo Self-Hosted?

Esiste solo una versione di Capgo. Sia il mio prodotto Cloud che quello Self-Hosted sono completamente equivalenti. Non c'è una versione premium ed esclusiva commerciale con un set di funzionalità migliore o più completo.

Ottieni la stessa dashboard, le stesse metriche azionabili e lo stesso impegno nel [rispettare la privacy dei tuoi visitatori](https://capgoapp/privacy/) con entrambi.

Ho iniziato a sviluppare Capgo nel dicembre 2018 e ho lanciato l'attività di abbonamento SaaS nel maggio 2019. Il progetto è molto vivo, attivamente sviluppato e in rapida crescita. È anche robusto e testato sul campo.

Ecco le differenze tra Capgo Cloud e Capgo Self-Hosted:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **Hosting** | Facile e conveniente. Ci vogliono 2 minuti per iniziare a inviare il tuo primo aggiornamento, alta disponibilità, backup, sicurezza e manutenzione sono tutti gestiti da me. Gestisco tutto per te così non devi preoccuparti di nulla. | Lo fai tutto da solo. Devi procurarti un server e devi gestire la tua infrastruttura. Sei responsabile dell'installazione, manutenzione, aggiornamenti, capacità del server, tempo di attività, backup, sicurezza, stabilità, coerenza, tempo di caricamento e così via. |
| **Archiviazione** | Tutti i dati dei visitatori vengono elaborati esclusivamente su infrastrutture cloud di proprietà dell'UE. Conservo i dati del tuo sito su un server sicuro e crittografato in Germania. Ciò garantisce che i dati del tuo sito siano protetti dalle severe leggi sulla privacy dei dati dell'Unione Europea e garantisce la conformità al GDPR. I dati del tuo sito web non lasciano mai l'UE. | Hai il controllo completo e puoi ospitare il tuo Capgo su qualsiasi server in qualsiasi paese desideri. Ospitalo su un server nel tuo seminterrato o ospitalo con qualsiasi provider cloud ovunque tu voglia, anche quelli che non sono conformi al GDPR. ||
| **Dati grezzi** | Vedi tutte le statistiche e le metriche del tuo sito sulla mia dashboard dall'aspetto moderno, semplice da usare e a caricamento rapido. Puoi vedere solo le statistiche aggregate nella dashboard | Sei un analista e vuoi accedere ai dati grezzi? L'hosting di Capgo da solo ti dà questa opzione. Prendi i dati direttamente dal database e importali in uno strumento di analisi dei dati di tua scelta |
| **Costi** | C'è un costo associato alla fornitura di un servizio di aggiornamento, quindi addebito una tariffa di abbonamento | Devi pagare solo per il tuo server e qualsiasi costo associato al funzionamento di un server. Non devi mai pagare alcuna tariffa a me, solo al tuo provider cloud |
| **Supporto Premium** | Supporto reale fornito da esseri umani reali che costruiscono e mantengono Capgo | Il supporto premium non è incluso. La versione self-hosted è supportata solo dalla comunità |
| **Versioni** | Sviluppato e migliorato continuamente con nuove funzionalità e aggiornamenti più volte a settimana | È una versione a lungo termine pubblicata due volte all'anno, quindi le funzionalità più recenti non saranno immediatamente disponibili poiché vengono prima testate nel cloud |

# Utilizzo della CLI con capgo self-hosted
Per utilizzare la CLI con capgo self-hosted modifica il capacitor.config.ts dalla directory della tua app e impostalo così:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      localHost: "http://localhost:5173",
      localWebHost: "http://localhost:5173",
      localSupa: "http://localhost:54321",
      localSupaAnon: "see_notes",
    },
  },
};
```

Nota: Per ottenere localSupaAnon segui questo [tutorial](https://capgo.app/docs/self-hosted/local-dev/getting-started/) e copia la chiave anonima in localSupaAnon

# Utilizzo del capacitor updater con capgo self-hosted

**Requisito**

Clonato [capgo](https://github.com/Cap-go/capgo/)

Per utilizzare il capacitor updater con capgo self-hosted modifica il `capacitor.config.ts` dalla directory della tua app e impostalo così:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "http://localhost:54321/functions/v1/stats",
      channelUrl: "http://localhost:54321/functions/v1/channel_self",
      updateUrl: "http://localhost:54321/functions/v1/updates"
    },
  },
};
```

Questo ti permetterà di utilizzare capgo locale in sviluppo. Tuttavia, per impostazione predefinita, questo non è sufficiente.

# Conclusione

In conclusione, l'hosting autonomo di Capgo può essere una buona opzione per le organizzazioni che dispongono delle risorse e delle competenze per farlo. Offre una serie di vantaggi, tra cui il controllo sul processo di aggiornamento, la sicurezza e la conformità. Tuttavia, è importante valutare attentamente i vantaggi e le sfide prima di decidere se effettuare l'hosting autonomo.

Se stai considerando l'hosting autonomo di Capgo, ti consiglio di iniziare leggendo la [documentazione sull'hosting autonomo](https://capgo.app/docs/self-hosted/getting-started/) di Capgo. Questo ti darà una buona comprensione dei requisiti e dei rischi dell'hosting autonomo.