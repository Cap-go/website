---
slug: understanding-apples-privacy-manifest
title: Comprendere il Privacy Manifest di Apple
description: >-
  Esploriamo l'importanza del manifesto sulla privacy richiesto da Apple per le
  app iOS e come conformarsi efficacemente, con linee guida chiare.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T02:23:31.365Z
updated_at: 2025-04-18T02:26:28.853Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92-1744943188853.jpg
head_image_alt: Mobile Development
keywords: >-
  Privacy Manifest, iOS, data collection, App Store, compliance, Capgo, JSON,
  updates
tag: 'Development, Mobile, Security'
published: true
locale: it
next_blog: ''
---

**Il Privacy Manifest di Apple è ora obbligatorio per tutte le app iOS** A partire da maggio 2024, ogni invio all'App Store deve includere questo file JSON per dettagliare la raccolta dati, l'utilizzo delle API, gli SDK di terze parti e i domini di rete. Ecco cosa devi sapere:

-   **Cos'è**: Un file di configurazione JSON che dichiara:
    -   Dati raccolti e il loro scopo
    -   API e SDK di terze parti utilizzati
    -   Domini esterni accessibili
-   **Perché è importante**: Garantisce trasparenza e conformità agli standard di privacy di Apple
-   **Come conformarsi**: Aggiungi il manifest al bundle della tua app iOS e aggiornalo regolarmente, specialmente se utilizzi strumenti di aggiornamento live come [Capgo](https://capgoapp/)

**Suggerimento Rapido**: Strumenti come Capgo semplificano la conformità automatizzando gli aggiornamenti del manifest, offrendo deployment istantanei e fornendo analytics per monitorare il successo

Continua a leggere per imparare come configurare e verificare il tuo Privacy Manifest, evitare errori comuni e garantire aggiornamenti fluidi

## WWDC23: Inizia con i privacy manifest | Apple

<iframe src="https://www.youtube.com/embed/OQMF4LDqscc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Elementi Principali del Privacy Manifest

Il Privacy Manifest di Apple include tre componenti principali:

1.  **Dichiarazione dei Dati**: Specifica i tipi di dati che la tua app raccoglie, il motivo della raccolta, le API sensibili alla privacy utilizzate e gli SDK di terze parti integrati nell'app. Devi anche fornire una chiara motivazione aziendale per ciascuno
    
2.  **Domini Esterni**: Elenca tutti i domini esterni con cui la tua app comunica, spiega lo scopo della comunicazione e dettaglia le misure di sicurezza in atto
    
3.  **Formato JSON e Incorporamento**: Segui la struttura JSON richiesta da Apple per il manifest e assicurati che sia incorporato sia nel bundle dell'app che in qualsiasi pacchetto di aggiornamento live
    

Ora, vedremo come creare e verificare il tuo manifest in un progetto Capacitor

## Configurazione del Privacy Manifest in [Capacitor](https://capacitorjscom/)

![Capacitor](https://assetsseobotaicom/capgoapp/68019d453c6b972ab5063e92/7e137b9b90adb3934b29b03381f213c1jpg)

### Creazione del File Manifest

Inizia aggiungendo un file chiamato `ios/App/Resources/PrivacyInfoxcprivacy` per dichiarare l'utilizzo delle API e la raccolta dati della tua app. Ecco un esempio di come potrebbe apparire il file:

```json
{
  "NSPrivacyAccessedAPITypes":[{"NSPrivacyAccessedAPIType":"NSUserDefaults","NSPrivacyAccessedAPITypeReasons":["FE001"]}],
  "NSPrivacyCollectedDataTypes":[{"NSPrivacyDataType":"NSPrivacyDataTypeDeviceID","NSPrivacyDataReason":"Basic app functionality"}]
}
```

Dopo aver creato questo file, apri [Xcode](https://developerapplecom/xcode/) per assicurarti che sia incluso correttamente nel tuo progetto

### Test e Verifica

In Xcode, vai su **Product > Analyze** per generare un Report sulla Privacy. Esamina attentamente il report per eventuali avvisi o API non dichiarate e apporta le modifiche necessarie per evitare problemi. Una volta che tutto è a posto, procedi con il deployment degli aggiornamenti

### Aggiornamenti con [Capgo](https://capgoapp/)

![Capgo](https://assetsseobotaicom/capgoapp/68019d453c6b972ab5063e92/d09851ee64a6d6c4e2e08ff1d656af11jpg)

Dopo aver superato l'analisi di Xcode, usa Capgo per gli aggiornamenti live per mantenere aggiornato il privacy manifest della tua app. Capgo fornisce:

-   **Deployment istantanei**: il 95% degli utenti riceve gli aggiornamenti entro 24 ore [\[1\]](https://capgoapp/)
-   **Rollback con un click** per correzioni rapide
-   **Strumenti di analytics** per monitorare il successo degli aggiornamenti e garantire la conformità

Il piano Team di Capgo costa 83$ al mese (fatturato annualmente), supportando fino a 100.000 utenti attivi mensili (MAU) e 2.000 GB di banda

## Linee Guida per la Conformità alla Privacy

Dopo aver verificato il tuo manifest in Xcode, è importante assicurarsi che la conformità alla privacy rimanga intatta. Ecco come mantenere le cose in ordine

### Pratiche Raccomandate

Considera l'utilizzo di Capgo per distribuire istantaneamente gli aggiornamenti del manifest, evitando ritardi causati dalle revisioni dell'App Store. Questo strumento supporta anche i rollout graduali, permettendoti di testare le modifiche con analytics in tempo reale prima di distribuirle a tutti gli utenti [\[1\]](https://capgoapp/)

### Errori Comuni

Affidarsi agli [aggiornamenti manuali](https://capgoapp/docs/plugin/cloud-mode/manual-update/) può essere lento, poiché dipendono dai tempi di revisione dell'App Store, che possono richiedere giorni o persino settimane. Questo spesso lascia la documentazione obsoletaD'altra parte, gli strumenti automatizzati consentono aggiornamenti istantanei, forniscono analisi per monitorare le distribuzioni e facilitano il rollback delle modifiche in caso di problemi [\[1\]](https://capgoapp/)

### Aggiornamenti Manuali vs Automatizzati

Ecco un rapido confronto tra i metodi di aggiornamento manuali e automatizzati:

-   **Velocità di Consegna**: Gli aggiornamenti manuali possono richiedere giorni o settimane, mentre gli [aggiornamenti automatizzati](https://capgoapp/docs/plugin/cloud-mode/hybrid-update/) raggiungono il 95% degli utenti entro 24 ore [\[1\]](https://capgoapp/)
-   **Monitoraggio del Successo**: I metodi manuali variano, ma gli aggiornamenti automatizzati raggiungono un tasso di successo dell'82% in tutto il mondo [\[1\]](https://capgoapp/)
-   **Opzioni di Rollback**: Gli aggiornamenti manuali offrono un recupero limitato, mentre gli aggiornamenti automatizzati consentono rollback immediati
-   **Monitoraggio**: I controlli manuali richiedono tempo, mentre gli strumenti automatizzati forniscono analisi in tempo reale [\[1\]](https://capgoapp/)
-   **Distribuzione**: I sistemi manuali sono basilari, mentre gli strumenti automatizzati supportano canali di distribuzione avanzati [\[1\]](https://capgoapp/)
-   **Sicurezza**: Gli aggiornamenti manuali mancano di crittografia integrata, mentre i sistemi automatizzati utilizzano la crittografia end-to-end [\[1\]](https://capgoapp/)

## Confronto tra Strumenti di Aggiornamento Live

Approfondiamo il confronto tra due popolari piattaforme di aggiornamento live e vediamo come si confrontano

### Caratteristiche e Prezzi delle Piattaforme

| Caratteristica | Capgo | [Appflow](https://ionicio/appflow/) |
| --- | --- | --- |
| Crittografia end-to-end | **Sì** | \-  |
| Tasso di successo aggiornamenti | **82% mondiale** [\[1\]](https://capgoapp/) | \-  |
| Tempo di consegna aggiornamenti | **95% entro 24h** [\[1\]](https://capgoapp/) | \-  |
| Velocità download bundle | **114 ms (5 MB)** [\[1\]](https://capgoapp/) | \-  |
| Costo annuale (Piano Team) | **€996** | **€6.000** [\[1\]](https://capgoapp/) |

**Conclusione rapida**: Capgo offre un costo del primo anno molto più basso - €996 rispetto ai €6.000 di Appflow

Ora, vediamo come Capgo si distingue specificamente per gli aggiornamenti del Privacy Manifest

### Privacy Manifest: Vantaggi di Capgo

Il codice open-source di Capgo lo rende una scelta valida per gestire gli aggiornamenti del Privacy Manifest. Permette rapide modifiche per soddisfare gli standard di privacy in evoluzione, garantendo una gestione della conformità più semplice [\[1\]](https://capgoapp/)

## Riepilogo

Da maggio 2024, tutte le app iOS devono rispettare i requisiti obbligatori del manifest. L'automazione può rendere molto più semplice la gestione di questi manifest. Per i progetti Capacitor, includi il tuo manifest nel bundle iOS e usa strumenti come Capgo per automatizzare gli aggiornamenti in modo sicuro, grazie alla sua crittografia end-to-end.

Con il tuo manifest configurato e gli aggiornamenti automatizzati, ecco alcune pratiche chiave per garantire aggiornamenti fluidi del Privacy Manifest:

-   Usa strumenti CLI per semplificare la distribuzione
-   Implementa sistemi di canali per distribuzioni controllate degli aggiornamenti
-   Mantieni una documentazione dettagliata dei tuoi processi di raccolta dati
-   Testa e verifica regolarmente la conformità alla privacy