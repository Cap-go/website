---
slug: self-hosted-capgo
title: Self hosted Capgo
description: >-
  L'auto-hosting di Capgo ti permette di distribuire gli aggiornamenti live di
  Capacitor ai tuoi utenti senza dover utilizzare il servizio cloud di Capgo.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: self-hosted capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: it
next_blog: ''
original_slug: self-hosted-capgo
---
Questo articolo fornisce una guida passo dopo passo su come effettuare il self-hosting di Capgo, oltre a una discussione sui benefici e le sfide del self-hosting.

# Introduzione

Il Self Hosting è una forma di gestione del proprio sito web o applicazione attraverso la configurazione autonoma di un server e una rete. Invece di utilizzare una piattaforma come servizio o un provider cloud pubblico, chi sceglie il self-hosting gestirà le proprie reti e sarà responsabile della manutenzione e del tempo di attività oltre a costruire il proprio sito web o applicazione.

Il modo più semplice per iniziare con Capgo è utilizzare il nostro [servizio gestito ufficiale nel cloud](https://capgo.app/), ma se preferisci gestirlo autonomamente, puoi anche effettuare il self-hosting di Capgo sul tuo server.

## Cos'è il self hosting?

Il self-hosting, nel contesto digitale, si riferisce alla pratica di gestire i propri server o infrastrutture di hosting per gestire e controllare la propria presenza online e i servizi. Invece di affidarsi a provider di hosting di terze parti, individui e organizzazioni scelgono di configurare e gestire i propri server, siti web, applicazioni e archiviazione dati secondo i propri termini.

## Perché scegliere il self-hosting?

Ci sono molti motivi per cui le persone scelgono il self-hosting. Alcuni dei benefici più comuni includono:

* **Privacy e controllo:** Il self-hosting ti dà il controllo completo sui tuoi dati e sulla privacy. Non devi preoccuparti che provider di terze parti traccino la tua attività o vendano i tuoi dati.

* **Risparmio sui costi:** Il self-hosting può essere più conveniente nel lungo periodo, specialmente se utilizzi molte risorse o gestisci più servizi.

* **Personalizzazione:** Il self-hosting ti dà la flessibilità di personalizzare le tue applicazioni e servizi per soddisfare le tue esigenze specifiche.

* **Apprendimento e sperimentazione:** Il self-hosting può essere un ottimo modo per imparare Linux, l'amministrazione di sistema e altri argomenti tecnici. Può anche essere un modo divertente per sperimentare con nuovi software e servizi.

* **Indipendenza:** Il self-hosting riduce la dipendenza da provider esterni. Non sei alla mercé dei loro termini di servizio, cambiamenti di prezzo o potenziali interruzioni del servizio. Questa indipendenza può essere cruciale per aziende e individui che dipendono dalla loro presenza online per funzioni critiche.

## Qual è la differenza tra Capgo Cloud e Capgo Self-Hosted?

Esiste una sola versione di Capgo. Sia il prodotto Cloud che quello Self-Hosted sono completamente uguali. Non c'è una versione premium e commerciale esclusiva con un set di funzionalità migliore o più completo.

Ottieni la stessa dashboard, le stesse metriche utilizzabili e lo stesso impegno nel [rispettare la privacy dei tuoi visitatori](https://capgo.app/privacy/) con entrambi.

Ho iniziato a sviluppare Capgo nel dicembre 2018 e ho lanciato l'attività in abbonamento SaaS nel maggio 2019. Il progetto è molto attivo, in continuo sviluppo e in rapida crescita. È anche robusto e testato sul campo.

Ecco le differenze tra Capgo Cloud e Capgo Self-Hosted:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **Hosting** | Facile e conveniente. Ci vogliono 2 minuti per iniziare a inviare il primo aggiornamento, alta disponibilità, backup, sicurezza e manutenzione, tutto gestito da me per te. Gestisco tutto io così non devi preoccuparti di nulla. | Fai tutto da solo. Hai bisogno di un server e devi gestire la tua infrastruttura. Sei responsabile dell'installazione, manutenzione, aggiornamenti, capacità del server, uptime, backup, sicurezza, stabilità, consistenza, tempi di caricamento e così via. |
| **Storage** | Tutti i dati dei visitatori sono elaborati esclusivamente su infrastrutture cloud di proprietà UE. Mantengo i dati del tuo sito su un server sicuro e crittografato in Germania. Questo assicura che i dati del tuo sito siano protetti dalle rigide leggi sulla privacy dell'Unione Europea e garantisce la conformità al GDPR. I dati del tuo sito web non lasciano mai l'UE. | Hai il controllo completo e puoi ospitare il tuo Capgo su qualsiasi server in qualsiasi paese desideri. Ospitalo su un server nel tuo seminterrato o con qualsiasi provider cloud ovunque tu voglia, anche quelli non conformi al GDPR. |
| **Dati grezzi** | Vedi tutte le statistiche e le metriche del tuo sito sulla mia dashboard dall'aspetto moderno, semplice da usare e veloce da caricare. Puoi vedere solo le statistiche aggregate nella dashboard. | Sei un analista e vuoi accedere ai dati grezzi? L'hosting autonomo di Capgo ti dà questa opzione. Prendi i dati direttamente dal database e importali in uno strumento di analisi dati a tua scelta. |
| **Costi** | C'è un costo associato alla fornitura di un servizio di aggiornamento, quindi addebito una quota di abbonamento. | Devi pagare solo per il tuo server e qualsiasi costo associato alla gestione di un server. Non devi mai pagare alcuna quota a me, solo al tuo provider cloud. |
| **Supporto Premium** | Supporto reale fornito da persone reali che costruiscono e mantengono Capgo. | Il supporto premium non è incluso. La versione self-hosted è supportata solo dalla community. |
| **Rilasci** | Sviluppato e migliorato continuamente con nuove funzionalità e aggiornamenti più volte a settimana. | È un rilascio a lungo termine pubblicato due volte all'anno, quindi le ultime funzionalità non saranno immediatamente disponibili poiché vengono prima testate nel cloud. |

# Come fare self-hosting di Capgo

Utilizziamo principalmente Supabase in Capgo, per il self hosting devi solo seguire la [documentazione sul self-hosting di Supabase](https://supabase.com/docs/guides/self-hosting/docker).

# Utilizzare la CLI con capgo self-hosted
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

Nota: Per ottenere localSupaAnon segui questo [tutorial](https://capgo.app/docs/self-hosted/local-dev/getting-started/) e copia la chiave anon in localSupaAnon

# Utilizzare il capacitor updater con capgo self-hosted

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

Questo ti permetterà di utilizzare capgo locale in sviluppo. Tuttavia, di default, questo non è sufficiente.

# Conclusione

In conclusione, il self-hosting di Capgo può essere una buona opzione per le organizzazioni che hanno le risorse e l'esperienza per farlo. Offre una serie di vantaggi, tra cui il controllo sul processo di aggiornamento, la sicurezza e la conformità. Tuttavia, è importante valutare attentamente i benefici e le sfide prima di decidere se effettuare il self-hosting.

Se stai considerando il self-hosting di Capgo, ti consiglio di iniziare leggendo la [documentazione sul self-hosting](https://capgo.app/docs/self-hosted/getting-started/) di Capgo. Questo ti darà una buona comprensione dei requisiti e dei rischi del self-hosting.
