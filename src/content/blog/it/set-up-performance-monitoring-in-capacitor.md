---
slug: set-up-performance-monitoring-in-capacitor
title: Configurare il Monitoraggio delle Prestazioni in Capacitor
description: >-
  Scopri come configurare il monitoraggio delle prestazioni nella tua app
  utilizzando Firebase e Sentry per migliorare l'efficienza e la soddisfazione
  degli utenti.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-23T05:36:41.635Z
updated_at: 2025-03-23T05:37:33.934Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67df674387fa49042c75b4e1-1742708253934.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capacitor, performance monitoring, Firebase, Sentry, mobile app development,
  error tracking, monitoring tools
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
**Vuoi ottimizzare le prestazioni della tua app [Capacitor](https://capacitorjs.com/)?** Strumenti di monitoraggio come [Firebase](https://firebase.google.com/) e [Sentry](https://sentry.io/) possono aiutarti a tracciare crash, utilizzo delle risorse e tempi di risposta, garantendo un'esperienza utente più fluida. Ecco una rapida panoramica:

-   **Perché Monitorare le Prestazioni**: Identificare crash, ottimizzare l'utilizzo delle risorse e migliorare i tempi di risposta.
-   **Strumenti da Utilizzare**:
    -   **Firebase**: Dati sulle prestazioni in tempo reale, monitoraggio della rete e tracciamento di eventi personalizzati.
    -   **Sentry**: Tracciamento dettagliato degli errori, analisi dello stack trace e notifiche in tempo reale.
-   **Passaggi di Configurazione**:
    -   Installa l'SDK di Firebase o Sentry.
    -   Configura la tua app per tracciare metriche di prestazione o errori.
    -   Usa le dashboard per analizzare e migliorare le prestazioni dell'app.

**Confronto Rapido**:

| Funzionalità | Firebase | Sentry |
| --- | --- | --- |
| Monitoraggio in Tempo Reale | Leggero ritardo | Quasi istantaneo |
| Supporto Nativo | Android, iOS | Android, iOS, Web |
| Metriche Personalizzate | Base | Flessibile |
| Complessità di Integrazione | Flussi di lavoro Google | Setup SDK semplice |

Per aggiornamenti in tempo reale, integra strumenti come **[Capgo](https://capgo.app/)** per distribuire correzioni istantaneamente senza ritardi dell'app store. Inizia oggi il monitoraggio per migliorare l'efficienza e la soddisfazione degli utenti della tua app.

## Ottimizza la salute dell'app con il Monitoraggio delle Prestazioni di [Firebase](https://firebase.google.com/) ...

![Firebase](https://mars-images.imgix.net/seobot/screenshots/firebase.google.com-ab24bd47674782df651734052f495a0c-2025-03-23.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/ENaOg5YefjQ" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Seleziona uno Strumento di Monitoraggio

Scegli uno strumento di monitoraggio che si adatti ai requisiti della tua app e all'esperienza del tuo team. Ecco un confronto tra Firebase Performance Monitoring e Sentry per aiutarti a decidere.

### Confronto degli Strumenti

| Funzionalità | Firebase Performance Monitoring | Sentry |
| --- | --- | --- |
| Modello di Prezzo | Livello gratuito con opzioni a pagamento scalabili | Livello gratuito con piani di crescita accessibili |
| Monitoraggio in Tempo Reale | Informazioni sulle prestazioni con leggero ritardo | Monitoraggio quasi istantaneo |
| Supporto Piattaforme Native | Android e iOS | Android, iOS e web |
| Complessità di Integrazione | Funziona con i servizi Google | Setup SDK semplice |
| Tracciamento Eventi Personalizzati | Metriche personalizzate base | Tracciamento eventi personalizzati flessibile |
| Periodo di Conservazione | Limitato nel piano gratuito | Esteso su tutti i piani |

### Criteri di Selezione

Quando decidi tra questi strumenti, considera quanto segue:

-   **Dimensione e Traffico dell'App**: Per app che prevedono una rapida crescita, Firebase è una scelta solida. Sentry potrebbe essere più adatto per implementazioni su scala minore.
-   **Requisiti Tecnici**: Firebase richiede [Google Play Services](https://en.wikipedia.org/wiki/Google_Play_Services), rendendolo ideale per app all'interno di quell'ecosistema. Sentry funziona indipendentemente, offrendo maggiore flessibilità tra le piattaforme.
-   **Esperienza del Team**: Firebase si allinea bene con team già familiari con gli strumenti Google, mentre il setup SDK diretto di Sentry è più semplice per casi d'uso più ampi.
-   **Vincoli di Budget**: Entrambi gli strumenti offrono livelli gratuiti, ma confronta i costi delle funzionalità scalabili per assicurarti che rientrino nel tuo budget.
-   **Obiettivi di Integrazione**: Firebase si integra perfettamente con i flussi di lavoro basati su Google, mentre Sentry è particolarmente forte nel tracciamento degli errori.
-   **Requisiti Normativi**: Assicurati che lo strumento rispetti standard come il [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation), specialmente se la tua app gestisce dati sensibili degli utenti.
-   **Frequenza di Aggiornamento**: Se gli aggiornamenti frequenti sono critici, strumenti come Capgo possono velocizzare le correzioni in tempo reale, completando il tuo setup di monitoraggio.

## Guida alla Configurazione di Firebase

La configurazione di Firebase Performance Monitoring nella tua [app Capacitor](https://capgo.app/plugins/ivs-player/) richiede alcuni passaggi chiari per garantire un tracciamento accurato dei dati.

### Installa SDK Firebase

Inizia aggiungendo l'SDK Firebase al tuo progetto e configurandolo per le tue piattaforme:

-   **Installa le Dipendenze Firebase**

Esegui i seguenti comandi per installare i pacchetti Firebase necessari:

```bash
npm install @capacitor-firebase/performance
npm install firebase
```

-   **Inizializza Firebase**

Configura Firebase nel tuo file principale dell'applicazione:

```typescript
import { FirebasePerformance } from '@capacitor-firebase/performance';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Add your Firebase configuration object here
};

initializeApp(firebaseConfig);
await FirebasePerformance.initializePerformance();
```

-   **Aggiungi Configurazioni delle Piattaforme**

Aggiorna il tuo file `capacitor.config.json` per abilitare il monitoraggio delle prestazioni:

```json
{
  "plugins": {
    "FirebasePerformance": {
      "collectMetrics": true,
      "instrumentationEnabled": true,
      "dataCollectionEnabled": true
    }
  }
}
```

### Configura il Tracciamento delle Prestazioni

Puoi iniziare a tracciare specifiche attività dell'app come query del database o richieste di rete utilizzando Firebase Performance Monitoring.

-   **Traccia Query del Database**

```typescript
async function trackDatabaseQuery() {
  const trace = await FirebasePerformance.startTrace({ traceName: 'database_query' });

  // Perform your database operation
  await performDatabaseOperation();

  await FirebasePerformance.stopTrace({ traceName: 'database_query' });
}
```

-   **Monitora Richieste di Rete**

```typescript
await FirebasePerformance.setAttributes({
  traceName: 'api_call',
  attributes: {
    endpoint: '/users',
    method: 'GET'
  }
});
```

-   **Traccia Metriche Personalizzate**

Per metriche personalizzate, come il tracciamento del valore di un carrello della spesa:

```typescript
await FirebasePerformance.putMetric({
  traceName: 'checkout_flow',
  metricName: 'cart_value',
  value: 99.99
});
```

Una volta implementate queste tracce, puoi rivedere i dati raccolti nella Firebase Console.

### Usa la Firebase Console

Dopo aver configurato il monitoraggio, puoi visualizzare e analizzare i dati delle prestazioni della tua app nella Firebase Console:

1.  **Accedi ai Dati delle Prestazioni**
    
    -   Accedi alla Firebase Console.
    -   Seleziona il tuo progetto.
    -   Naviga su **Performance Monitoring**.
    -   Scegli la tua app dal menu a tendina.
2.  **Monitora Metriche Chiave**
    

La dashboard fornisce informazioni su vari indicatori di prestazione, inclusi:

-   Tempo di avvio dell'app
-   Tasso di successo delle richieste di rete
-   Tempo di rendering dello schermo
-   Risultati dalle tracce personalizzate

3.  **Configura Report Personalizzati**

Crea report su misura per analizzare aspetti specifici delle prestazioni della tua app, come:

-   Differenze di prestazioni per località
-   Metriche basate sul tipo di dispositivo
-   Effetti delle condizioni di rete
-   Pattern nelle tracce personalizzate

Usa questi strumenti per identificare e affrontare efficacemente i colli di bottiglia nelle prestazioni.

## Configurazione del Tracciamento Errori di [Sentry](https://sentry.io/)

![Sentry](https://mars-images.imgix.net/seobot/screenshots/sentry.io-925fc70e12ac801815ba3ab27e6adcda-2025-03-23.jpg?auto=compress)

Firebase gestisce le metriche di prestazione, ma Sentry è dedicato alla cattura e diagnosi degli errori. Insieme, forniscono un solido setup di monitoraggio.

### Installa SDK Sentry

Inizia installando i pacchetti Sentry richiesti:

```bash
npm install @sentry/capacitor
# Add the Sentry package for your specific framework
```

Una volta installato, configura Sentry nel punto di ingresso della tua app.

### Inizializza Sentry

Configura Sentry nel punto di ingresso della tua app utilizzando il seguente setup:

```typescript
import * as Sentry from "@sentry/capacitor";
import { BrowserTracing } from "@sentry/browser";

Sentry.init({
    dsn: "your-project-dsn",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.2,
    environment: "production",
    release: "app-version@" + process.env.VERSION,
    dist: process.env.BUILD_NUMBER,
    debug: false
});
```

Questa configurazione include il tracciamento delle versioni, che collega gli errori a specifiche versioni dell'app.

### Configura il Tracciamento degli Errori

Puoi personalizzare ulteriormente il tracciamento degli errori utilizzando boundary di errore personalizzati e blocchi try-catch.

**Boundary di Errore Personalizzati:**

```typescript
class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error, { extra: errorInfo });
    }
}
```

**Tracciamento Errori Specifici:**

```typescript
try {
    riskyOperation();
} catch (error) {
    Sentry.captureException(error, {
        tags: { operation: "data_sync", severity: "critical" },
        extra: { userId: currentUser.id, timestamp: new Date().toISOString() }
    });
}
```

**Monitoraggio Prestazioni:**

```typescript
const transaction = Sentry.startTransaction({
    name: "API Request",
    op: "http.request"
});

try {
    await makeApiCall();
} finally {
    transaction.finish();
}
```

Questi metodi assicurano che la tua app registri efficacemente gli errori, rendendoli più facili da tracciare e risolvere tramite Sentry.

### Usa la Dashboard Sentry

La dashboard Sentry fornisce strumenti per approfondire gli errori e comprenderli meglio:

-   **Monitoraggio in tempo reale**: Controlla frequenza degli errori, stato di risoluzione e utenti coinvolti.
-   **Analisi degli errori**: Rivedi stack trace, raggruppa errori simili e filtra per ambiente.
-   **Avvisi**: Imposta soglie di errore, configura opzioni di notifica e crea regole di avviso personalizzate.

Questa dashboard rende diretta la diagnosi e la correzione dei problemi.

## Best Practice per il Monitoraggio

### Concentrati sulle Metriche Chiave

L'analisi di Capgo su 750 app in produzione [\[1\]](https://capgo.app/) evidenzia le metriche chiave da monitorare:

-   **Tasso di Successo Aggiornamenti**: Punta ad almeno l'82%.
-   **Velocità di Aggiornamento**: La CDN globale dovrebbe consegnare 5 MB in 114 ms.
-   **Adozione Utenti**: Il 95% degli utenti dovrebbe aggiornare entro 24 ore.
-   **Tempo di Risposta API**: Mantienilo sotto i 500 ms (la media globale è 434 ms).

Imposta avvisi per rilevare rapidamente qualsiasi deviazione in queste metriche.

### Crea Regole di Avviso Efficaci

Ecco un esempio di come configurare gli avvisi per il monitoraggio delle prestazioni:

```typescript
// Example alert configuration
{
    performance: {
        apiLatency: {
            threshold: 1000, // ms
            period: "5m",
            condition: "above"
        },
        errorRate: {
            threshold: 1.0, // percentage
            period: "15m",
            condition: "above"
        },
        updateSuccess: {
            threshold: 75, // percentage
            period: "1h",
            condition: "below"
        }
    }
}
```

### Continua a Monitorare e Adattare

Una volta che i tuoi avvisi sono in posizione, concentrati sul monitoraggio continuo e il raffinamento:

-   **Controlli Regolari delle Prestazioni**: Rivedi i tassi di successo degli aggiornamenti per regione, analizza i trend degli errori per diverse versioni dell'app e monitora i tempi di risposta API durante le ore di punta.
    
-   **Rollout Graduali per gli Aggiornamenti**: Inizia con il 10% degli utenti per le prime 24 ore. Se tutto funziona senza problemi, aumenta al 50% e finalizza il rollout dopo 48 ore di prestazioni stabili.
    
-   **Ottimizzazione Continua**: Investiga gli aggiornamenti falliti, identifica gli endpoint API lenti e valuta il coinvolgimento degli utenti dopo gli aggiornamenti per assicurare miglioramenti sostenuti.
    

## Aggiornamenti e Monitoraggio con [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-23.jpg?auto=compress)

### Funzionalità Principali di Capgo

Il sistema di aggiornamento in tempo reale di Capgo, testato su 750 app in produzione, consegna bundle da 5MB in soli 114ms [\[1\]](https://capgo.app/).

Le funzionalità chiave includono:

-   **Analytics in Tempo Reale**: Monitora i tassi di successo degli aggiornamenti, che attualmente hanno una media mondiale dell'82% [\[1\]](https://capgo.app/).
-   **Distribuzione Istantanea**: Distribuisci correzioni critiche senza attendere le approvazioni dell'app store.
-   **Aggiornamenti Parziali**: Scarica solo i componenti modificati, risparmiando banda e tempo.
-   **Controllo Versioni**: Ripristina rapidamente gli aggiornamenti che impattano negativamente le prestazioni.

Questo sistema si integra facilmente con gli strumenti di monitoraggio esistenti, garantendo un funzionamento fluido.

> "Abbiamo implementato gli aggiornamenti OTA di Capgo in produzione per la nostra base utenti di +5000. Stiamo osservando un funzionamento molto fluido e quasi tutti i nostri utenti sono aggiornati entro minuti dal deployment dell'OTA su @Capgo." - colenso [\[1\]](https://capgo.app/)

### Combina gli Strumenti con Capgo

L'analytics di Capgo permette rollout graduali, aiutando i team ad assicurare la stabilità prima di un rilascio completo.

| Aspetto del Monitoraggio | Integrazione Capgo | Strumenti Aggiuntivi |
| --- | --- | --- |
| Tracciamento Errori | Monitoraggio errori integrato | Abbina con Sentry per tracce stack dettagliate |
| Metriche Prestazioni | Traccia tassi di successo aggiornamenti | Usa Firebase per dati interazione utente |
| Tempo di Risposta | Monitoraggio risposta API | Migliora con eventi di temporizzazione Firebase personalizzati |

Per configurare efficacemente il sistema di canali di Capgo:

-   Distribuisci prima gli aggiornamenti ai beta tester.
-   Usa le analitiche di Capgo per monitorare le metriche di prestazione.
-   Espandi gradualmente il rilascio alla base utenti più ampia.

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per distribuire continuamente ai nostri utenti!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Con 23,5M di aggiornamenti distribuiti globalmente, la dashboard in tempo reale di Capgo fornisce chiare informazioni, permettendo ai team di prendere decisioni intelligenti su aggiornamenti e miglioramenti delle prestazioni.

## Prossimi Passi

### Punti Principali

Tenere d'occhio le metriche chiave è cruciale per un efficace monitoraggio delle prestazioni. Usa gli strumenti per tracciare questi indicatori critici:

| **Tipo di Metrica** | **Aree di Focus Chiave** | **Strumenti Raccomandati** |
| --- | --- | --- |
| Prestazioni App | Tempi di risposta, crash | Firebase Performance |
| Tracciamento Errori | Tasso di eccezioni, tracce stack | Sentry |
| Analisi Aggiornamenti | Successo distribuzione | Capgo Analytics |

Approfondisci queste metriche e strumenti attraverso le risorse elencate di seguito.

### Approfondimenti

Gli strumenti e le pratiche di monitoraggio delle prestazioni sono in continua evoluzione. Rimani aggiornato esplorando queste guide e strategie:

**Documentazione Ufficiale**:

-   Documentazione Firebase Performance Monitoring
-   Guida all'integrazione Sentry per Capacitor
-   Guide ufficiali all'ottimizzazione delle prestazioni di Capacitor

**Implementazione Avanzata**: Esplora il sistema di analisi di Capgo, utilizzato con successo in oltre 750 app in produzione [\[1\]](https://capgo.app/). La loro documentazione fornisce approfondimenti su modelli di monitoraggio e strategie di aggiornamento live che funzionano perfettamente con altri strumenti di tracciamento delle prestazioni.
