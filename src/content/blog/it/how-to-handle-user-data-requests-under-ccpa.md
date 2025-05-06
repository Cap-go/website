---
slug: how-to-handle-user-data-requests-under-ccpa
title: Come gestire le richieste dei dati degli utenti secondo il CCPA
description: >-
  Scopri come gestire efficacemente le richieste dei dati degli utenti secondo
  il CCPA, garantendo la conformità nel rispetto dei diritti alla privacy degli
  utenti.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-06T01:02:16.662Z
updated_at: 2025-04-06T01:02:28.104Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad-1743901348104.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  CCPA, user data requests, compliance, privacy rights, data access, data
  deletion, opt-out, data protection
tag: 'Development, Security, Updates'
published: true
locale: it
next_blog: ''
---
Il California Consumer Privacy Act ([CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act)) conferisce agli utenti il controllo sui propri dati personali e stabilisce regole severe per le aziende. Ecco cosa devi sapere per essere conforme:

-   **Chi deve essere conforme**: Aziende con fatturato superiore a 25 milioni di dollari, dati su oltre 50.000 utenti o che guadagnano più del 50% del reddito dalla vendita di dati.
-   **Diritti degli utenti**:
    -   **Accesso**: Gli utenti possono richiedere i propri dati. Rispondere entro 45 giorni.
    -   **Cancellazione**: Gli utenti possono chiedere di cancellare i propri dati. Rispondere entro 45 giorni.
    -   **Opt-Out**: Gli utenti possono interrompere la vendita dei propri dati. Deve essere immediato.
    -   **Non-Discriminazione**: Servizio uguale indipendentemente dalle preferenze sulla privacy.
-   **Passaggi chiave per la conformità**:
    -   Creare un sistema sicuro per le richieste di dati (moduli web, email o in-app).
    -   Verificare l'identità dell'utente prima di elaborare le richieste.
    -   Utilizzare chiare [politiche sulla privacy](https://capgo.app/dp/) e fornire una facile opzione "Non vendere le mie informazioni personali".
    -   Proteggere i dati con crittografia e archiviazione sicura.

**Suggerimento rapido**: Utilizza strumenti come [Capgo](https://capgo.app/) per aggiornamenti istantanei delle funzionalità sulla privacy della tua app, garantendo una rapida conformità alle normative in evoluzione.

## Come conformarsi al California Consumer Privacy Act ...

<iframe src="https://www.youtube.com/embed/8NY0qFaVWwo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Comprendere i diritti degli utenti [CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act)

Gli sviluppatori devono creare processi sicuri e user-friendly per gestire ogni diritto sui dati degli utenti secondo il CCPA.

### Diritti di accesso ai dati

Quando gli utenti richiedono l'accesso ai loro dati, fornire i seguenti dettagli:

| **Categoria di dati** | **Informazioni da divulgare** | **Formato consigliato** |
| --- | --- | --- |
| Tipi di dati e fonti | Tipi di dati raccolti e loro fonti | Leggibile da macchina (es. JSON, CSV) |
| Utilizzo dei dati | Come i dati vengono elaborati e utilizzati | Riepilogo in testo semplice |
| Accesso di terze parti | Elenco di terze parti con accesso ai dati | Lista strutturata |
| Periodo di conservazione | Per quanto tempo i dati vengono conservati | Tempistiche specifiche |

Una volta concesso l'accesso ai dati, assicurati di avere un processo chiaro e affidabile per la cancellazione dei dati per rimanere conforme.

### Processo di cancellazione dei dati

1.   **Verifica dell'ambito**: Conferma che la cancellazione copra tutti i sistemi pertinenti, inclusi database primari, cache, strumenti di analisi, sistemi di terze parti e backup. Possono applicarsi eccezioni per sicurezza, obblighi legali, correzione di bug o transazioni in corso.
2.   **Esecuzione della cancellazione**: Rimuovi i dati da tutti i sistemi applicabili e notifica immediatamente l'utente. Includi la marca temporale della cancellazione e i dettagli di eventuali dati conservati per eccezioni.

Dopo aver gestito i diritti di accesso e cancellazione, assicurati che il processo di opt-out dalla vendita dei dati sia altrettanto semplice.

### Opt-out dalla vendita dei dati

Fornisci un'opzione "Non vendere le mie informazioni personali" facile da trovare, accessibile dalla schermata principale dell'app o dal menu delle impostazioni. Questa preferenza dovrebbe essere applicata rapidamente e rimanere coerente in tutte le versioni dell'app.

Se la tua app utilizza SDK di analisi o pubblicità di terze parti, assicurati che questi servizi si integrino con il tuo meccanismo di opt-out e rispettino le preferenze degli utenti senza ritardi. Questo garantisce la conformità e costruisce fiducia con i tuoi utenti.

## Elaborazione delle richieste di dati CCPA

Ecco come gestire le richieste di dati CCPA in modo sicuro rimanendo conformi:

### Configurazione di un sistema di richieste

Fornisci agli utenti modi sicuri per inviare le loro richieste. Le opzioni includono:

-   Un modulo web protetto con SSL e captcha
-   Un'email dedicata alla privacy con funzione di risposta automatica
-   Un'interfaccia in-app che utilizza un'API sicura

Assicurati di registrare e marcare temporalmente ogni invio. Organizza le richieste per tipo per semplificare l'elaborazione.

### Verifica dell'identità dell'utente

Usa un processo in due fasi per confermare l'identità dell'utente:

-   Prima, verifica la loro identità attraverso la loro email registrata o ID account.
-   Poi, esegui un controllo secondario, come l'invio di un codice SMS monouso o domande di sicurezza.

Per le app mobili, puoi fare affidamento su identificatori specifici del dispositivo o token di autenticazione per una maggiore sicurezza.

### Gestione delle scadenze di risposta

Una volta verificata l'identità dell'utente, attieniti a questi passaggi per rispettare le scadenze CCPA:

-   Usa un tracker centralizzato per registrare ogni richiesta, monitorare le scadenze e tracciare i progressi.
-   Registra tutti i dettagli, inclusi timestamp, metodi di verifica, fasi di elaborazione e comunicazioni con l'utente, per garantire la conformità e mantenere una chiara traccia di audit.

## Linee guida per la conformità CCPA

### Aggiornamenti della Privacy Policy

Mantieni aggiornata la tua [politica sulla privacy](https://capgo.app/privacy/) con i requisiti CCPA. Delinea chiaramente:

-   I tipi di informazioni personali che raccogli
-   Come utilizzi e condividi queste informazioni
-   I diritti degli utenti secondo il CCPA
-   Come gli utenti possono inviare richieste sui dati

Scrivi in un linguaggio semplice e diretto. Per esempio, usa "secondo" invece di "ai sensi di". Questo rende la tua politica più facile da capire e supporta i tuoi sforzi di conformità.

Una volta aggiornata, rendi semplice per gli utenti controllare i loro dati, incluso l'opt-out dalla condivisione dei dati.

### Implementazione dell'opt-out

Includi un'opzione "Non vendere o condividere le mie informazioni personali" nella tua app. Posizionala dove gli utenti possono trovarla facilmente, come:

-   Il menu delle impostazioni dell'app
-   Le preferenze dell'account
-   Una sezione dedicata ai controlli sulla privacy

Supporta i segnali [Global Privacy Control](https://globalprivacycontrol.org/) (GPC) per rispettare automaticamente le preferenze sulla privacy degli utenti.

| Funzionalità | Requisito di implementazione | Esperienza utente |
| --- | --- | --- |
| Pulsante opt-out | Visibile nelle impostazioni dell'app | Attivazione con un tocco |
| Supporto segnale GPC | Rilevamento automatico | Elaborazione in background |
| Indicatore di stato | Stato del toggle chiaro | Conferma visiva |
| Archiviazione preferenze | Archiviazione locale sicura | Persistente tra le sessioni |

Questo processo di opt-out è semplice e trasparente, aiutando a costruire fiducia mentre si rispettano le linee guida CCPA. Associa questi controlli a solide pratiche di sicurezza per proteggere i dati degli utenti.

### Metodi di protezione dei dati

Usa misure di sicurezza rigorose per proteggere i dati in tutte le fasi. Crittografa tutte le trasmissioni di dati, specialmente le informazioni sensibili.

Per l'archiviazione sicura dei dati:

-   Usa database crittografati
-   Impiega pratiche sicure di gestione delle chiavi
-   Conduci audit di sicurezza regolari
-   Configura sistemi di backup automatici

Quando cancelli i dati, segui i passaggi dettagliati nella sezione Cancellazione dei dati per assicurare la rimozione completa da tutti i sistemi. Questi metodi aiutano a proteggere le informazioni degli utenti e mantenere la conformità.

## Requisiti CCPA per app mobili

### Controlli dei permessi dell'app

Rendi semplice per gli utenti gestire le loro impostazioni sulla privacy con controlli dei permessi chiari e accessibili.

Considera di creare un'interfaccia dedicata alle impostazioni sulla privacy che includa:

| Tipo di controllo | Implementazione | Azione utente |
| --- | --- | --- |
| **Raccolta dati** | Toggle granulari | Abilitare o disabilitare tipi di dati specifici |
| **Servizi di localizzazione** | Opzioni multi-livello | Scegliere la precisione dei dati (precisa o approssimativa) |
| **Comunicazioni marketing** | Basate su categoria | Selezionare i metodi di contatto preferiti |
| **Condivisione con terze parti** | Controlli individuali | Opt-out per partner di dati |

Posiziona questi controlli in un punto facilmente trovabile nel menu delle impostazioni della tua app. Sii trasparente - spiega chiaramente quali dati vengono raccolti, perché sono necessari, come vengono utilizzati e con chi vengono condivisi. Questo approccio assicura che gli utenti possano aggiornare rapidamente le loro preferenze quando necessario.

### Utilizzo di [Capgo](https://capgo.app/) per gli aggiornamenti

![Capgo](https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad/241c8f19433e01f315154c8988becf9c.jpg)

Una volta stabiliti solidi controlli in-app, mantenere l'app aggiornata è fondamentale per rimanere conformi. È qui che entra in gioco Capgo. Ti permette di distribuire aggiornamenti istantaneamente - senza attendere le approvazioni dell'app store. Infatti, il 95% degli utenti attivi riceve gli aggiornamenti entro 24 ore dal rilascio [\[1\]](https://capgo.app/).

Ecco cosa offre Capgo:

-   **Aggiornamenti istantanei**: Invia modifiche cruciali sulla privacy e i permessi immediatamente.
-   **Implementazione sicura**: Utilizza la crittografia end-to-end, assicurando che solo gli utenti possano decrittare gli aggiornamenti.
-   **Controllo versioni**: Ripristina gli aggiornamenti se necessario per mantenere la coerenza.

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per fornire continuamente ai nostri utenti!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Il sistema di canali di Capgo ti permette anche di testare gli aggiornamenti sulla privacy con specifici gruppi di utenti prima di distribuirli a tutti. Attualmente, 750 app si affidano a Capgo in ambienti di produzione [\[1\]](https://capgo.app/).

## Riepilogo

### Punti principali

La gestione delle richieste di dati CCPA implica bilanciare i diritti alla privacy degli utenti con l'esecuzione tecnica. Ecco le principali priorità che gli sviluppatori dovrebbero affrontare:

| Requisito | Implementazione |
| --- | --- |
| Sistema di richiesta dati | Portale sicuro con autenticazione utente |
| Controlli privacy | Impostazioni dettagliate dei permessi |
| Opt-out vendita dati | Processo chiaro con verifica utente |
| Protezione dati | Crittografia end-to-end |

Per le app mobili, sono essenziali solidi controlli dei permessi. **Capgo** semplifica la conformità consentendo aggiornamenti istantanei, supportando già 750 app in produzione [\[1\]](https://capgo.app/).

> "Capgo è uno strumento indispensabile per gli sviluppatori che vogliono essere più produttivi. Evitare la revisione per le correzioni di bug è prezioso." - Bessie Cooper [\[1\]](https://capgo.app/)

La velocità è importante: il 95% degli utenti riceve gli aggiornamenti entro 24 ore attraverso **Capgo** [\[1\]](https://capgo.app/), garantendo una rapida conformità alle normative.

La conformità CCPA non è un'attività una tantum. Sono necessari audit e aggiornamenti regolari per stare al passo con le regole in evoluzione e proteggere la privacy degli utenti.
