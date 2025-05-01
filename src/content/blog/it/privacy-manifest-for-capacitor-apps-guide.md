---
slug: privacy-manifest-for-capacitor-apps-guide
title: 'Manifest della Privacy per App Capacitor: Guida'
description: >-
  Scopri come creare un Privacy Manifest per la tua app per conformarti ai
  requisiti dell'App Store e proteggere efficacemente i dati degli utenti.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T03:07:47.047Z
updated_at: 2025-04-02T03:08:00.473Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776-1743563280473.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Privacy Manifest, Capacitor, App Store compliance, user data protection, app
  development, privacy standards
tag: 'Development, Mobile, Security'
published: true
locale: it
next_blog: ''
---

**Vuoi lanciare la tua app [Capacitor](https://capacitorjscom/) sull'[App Store](https://enwikipediaorg/wiki/App_Store_\(Apple\)) senza ritardi?** Inizia creando un Privacy Manifest. Apple ora richiede agli sviluppatori di includere questo documento per garantire che le app soddisfino rigidi standard di privacy. Ecco cosa devi sapere:

-   **Cos'è un Privacy Manifest?**  
    Un file strutturato che delinea le pratiche di raccolta dati della tua app, l'utilizzo delle API e i domini di tracciamento
    
-   **Perché è importante:**
    
    -   Rispetta le regole dell'App Store per evitare rifiuti o rimozioni
    -   Costruisce fiducia essendo trasparenti sulla gestione dei dati degli utenti
-   **Componenti chiave da includere:**
    
    -   API che accedono ai dati dell'utente (es. posizione, foto)
    -   Etichette privacy per i tipi di dati raccolti
    -   Domini di tracciamento utilizzati per analytics o pubblicità
-   **Come crearne uno:**
    
    -   Usa JSON per definire i dettagli della raccolta dati
    -   Posiziona il file `PrivacyInfo.xcprivacy` nella directory corretta del tuo progetto
    -   Validalo con strumenti come [Xcode](https://developerapplecom/xcode/) per evitare errori
-   **Strumenti per semplificare il processo:**  
    Usa piattaforme come [Capgo](https://capgoapp/) per la validazione automatica del privacy manifest, aggiornamenti in tempo reale e tracciamento degli errori
    

**Rimani conforme, proteggi la privacy degli utenti ed evita ritardi nell'app store seguendo questa guida**

## Nozioni di base sul Privacy Manifest

### Definizione del Privacy Manifest

Un privacy manifest è un file strutturato che delinea le pratiche sui dati della tua app. Dettaglia elementi come le API che accedono ai dati dell'utente, i domini di tracciamento, i tipi di dati raccolti e le integrazioni SDK di terze parti. Questo documento non solo aiuta a stabilire fiducia ma garantisce anche la conformità con le linee guida dell'App Store. Analizziamo i componenti chiave che il tuo manifest dovrebbe includere

### Elementi principali del Privacy Manifest

Ecco gli elementi principali da includere nel tuo privacy manifest per allinearti con i requisiti Apple:

1.  **API con motivazione richiesta**  
    Questa sezione elenca le API sensibili alla privacy che la tua app utilizza e spiega perché sono necessarie
    
    Di seguito una tabella che riassume i requisiti API comuni:
    
    | Categoria API | Utilizzo comune | Documentazione richiesta |
    | --- | --- | --- |
    | Servizi di localizzazione | Navigazione utente | Stringa di scopo e descrizione dell'utilizzo |
    | Libreria foto | Foto profilo | Livello di accesso e intento |
    | Contatti | Sincronizzazione rubrica | Dichiarazione di minimizzazione dei dati |
    
2.  **Etichette Privacy**  
    Queste etichette forniscono trasparenza specificando:
    
    -   Tipi di dati raccolti
    -   Motivi della raccolta dati
    -   Se i dati sono collegati all'identità dell'utente
    -   Come i dati vengono utilizzati per il tracciamento
3.  **Domini di tracciamento**  
    Questa sezione elenca tutti i domini coinvolti nel tracciamento, come quelli utilizzati per analytics, pubblicità o elaborazione dati di terze parti
    

> "Conforme all'App Store" - Capgo [\[1\]](https://capgoapp/)

Secondo Capgo, il 95% degli utenti si adegua agli aggiornamenti entro 24 ore. Con oltre 235 milioni di aggiornamenti consegnati [\[1\]](https://capgoapp/), mantenere aggiornata la documentazione sulla privacy è essenziale per mantenere la fiducia degli utenti

## Costruire Privacy Manifest per [Capacitor](https://capacitorjscom/)

![Capacitor](https://assetsseobotaicom/capgoapp/67ec9a7d7747adc4bca8a776/7e137b9b90adb3934b29b03381f213c1jpg)

### Requisiti di configurazione

Prima di iniziare a costruire il manifest, assicurati di avere:

-   Xcode 15 o successivo installato
-   Un progetto Capacitor 5.0+ configurato
-   Accesso al file `Info.plist` della tua app
-   Una comprensione base della struttura JSON
-   Documentazione che delinea le pratiche di raccolta dati della tua app

### Passaggi per la creazione

Inizia creando un file `PrivacyInfo.xcprivacy` nella directory del tuo progetto iOSQuesto file deve seguire specifiche linee guida di formattazione:

**Impostazione delle Informazioni di Base**

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": []
}
```

**Definizione dei Dettagli sulla Raccolta Dati**

```json
{
    "NSPrivacyAccessedAPITypes": [
        {
            "NSPrivacyAccessedAPIType": "NSLocationWhenInUseUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["1.1"]
        },
        {
            "NSPrivacyAccessedAPIType": "NSCameraUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["2.1"]
        }
    ]
}
```

**Aggiunta dei Domini di Tracciamento**

```json
{
    "NSPrivacyTrackingDomains": [
        "analytics.yourdomain.com",
        "metrics.yourdomain.com"
    ]
}
```

### Evitare Errori Comuni

Per prevenire problemi, tieni a mente questi suggerimenti:

-   **Includi Tutti i Campi Obbligatori**: Anche se alcuni campi sono vuoti, devono essere presenti
-   **Usa Tipi API Validi**: Verifica gli identificatori API con la documentazione ufficiale Apple
-   **Controlla la Formattazione JSON**: Esegui il file attraverso un validatore JSON per individuare errori di sintassi
-   **Fornisci Motivazioni Complete**: Assicurati che ogni accesso API includa il relativo codice motivazione
-   **Mantieni le Informazioni Aggiornate**: Aggiorna il manifest quando vengono aggiunte nuove funzionalità

Inoltre, assicurati che il file manifest rimanga sotto i 512KB per evitare errori di build. Convalida regolarmente il file durante il processo di build di Xcode per individuare errori precocemente.

## Aggiungere Privacy Manifest a Capacitor

### Guida al Posizionamento dei File

Per includere un privacy manifest nel tuo progetto Capacitor, posiziona il file `PrivacyInfo.xcprivacy` nella seguente struttura di directory:

```
your-app/
├── ios/
│   ├── App/
│   │   ├── PrivacyInfo.xcprivacy
│   │   └── Info.plist
│   └── App.xcworkspace
```

Per i plugin Capacitor, usa questa struttura:

```
your-plugin/
├── ios/
│   ├── Plugin/
│   │   └── PrivacyInfo.xcprivacy
│   └── Plugin.xcodeproj
```

### Configurazione Impostazioni di Build

Una volta posizionato il file, aggiorna le impostazioni di build di Xcode per garantirne la corretta integrazione:

1. Apri il tuo progetto in Xcode
2. Sotto **TARGETS**, seleziona il target dell'app o del plugin
3. Vai alla scheda **Build Settings**
4. Imposta **Privacy Manifest Development Region** su `en`
5. Imposta **Include Privacy Manifest** su `YES`

Se il tuo progetto usa [CocoaPods](https://cocoapods.org/), includi questo snippet nel tuo `Podfile` per abilitare il privacy manifest:

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['INCLUDE_PRIVACY_MANIFEST'] = 'YES'
    end
  end
end
```

Dopo aver apportato queste modifiche, procedi con i controlli di implementazione per verificare che tutto sia configurato correttamente.

### Verifica dell'Implementazione

Per assicurarti che il privacy manifest funzioni come previsto, segui questi passaggi:

1. **Verifica della Build**
    
    -   Conferma che non ci siano avvisi relativi alla privacy durante la build
    -   Assicurati che il manifest venga compilato senza problemi
    -   Verifica che il privacy manifest sia incluso nei prodotti della build
2. **Validazione Runtime**
    
    -   In modalità debug, testa il corretto funzionamento dei prompt di privacy e l'accesso alle API
3. **Validazione App Store Connect**
    
    -   Carica la build e revisiona il Privacy Report in App Store Connect
    -   Controlla che le dichiarazioni API siano complete e i formati dei domini di tracciamento siano corretti

Se incontri l'errore "Privacy Manifest validation failed", ricontrolla il tuo manifest per assicurarti che soddisfi i requisiti più recenti dell'App Store. Presta particolare attenzione ai tipi di API e alle configurazioni dei domini di tracciamento.

## Modifiche al Privacy Manifest Apple

<iframe src="https://www.youtube.com/embed/S8JnUkUkmbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Test e Correzioni

Creare un Privacy Manifest che soddisfi le linee guida Apple è cruciale. Per mantenere la rotta, integra un tracciamento degli errori affidabile nel tuo processo di sviluppo. Questo aiuta a collegare gli sforzi di sviluppo con i requisiti di conformità.

Uno strumento come [Capgo](https://capgo.app) può aiutare. Monitora l'accesso alle API e identifica i problemi del manifest prima che influenzino gli utenti. Una volta segnalati potenziali problemi, puoi concentrarti sulla validazione approfondita.

Dopo aver apportato aggiornamenti, testa il tuo manifest in un ambiente di sviluppo. Usa le informazioni dal tracciamento degli errori per guidare la tua revisione. Questo approccio aiuta a garantire che la tua app rimanga allineata agli standard di privacy Apple.

## Strumenti di Privacy [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/454adbba4c00491adce88db59812b177.jpg)

Capgo semplifica la gestione dei privacy manifest e gli aggiornamenti delle app, assicurando che i tuoi standard di privacy rimangano intatti senza ritardare i deployment.

### Funzionalità Capgo

Con più di **235 milioni di aggiornamenti protetti** e un **tasso di successo globale dell'82%**, Capgo garantisce che il **95% degli utenti attivi riceva gli aggiornamenti entro 24 ore** [\[1\]](https://capgo.app/)Ecco cosa offre:

-   **Crittografia end-to-end** per mantenere gli aggiornamenti sicuri
-   **Sistema di canali** per una distribuzione controllata degli aggiornamenti
-   **Tracciamento errori** per identificare e risolvere rapidamente i problemi
-   **Rollback con un clic** per tornare istantaneamente a una versione precedente

Questi strumenti rendono l'aggiunta di Capgo al tuo flusso di lavoro semplice ed efficiente

### Utilizzo di Capgo

Per iniziare, [installa il plugin Capgo](https://capgoapp/docs/plugin/cloud-mode/getting-started/) con questo comando:

```bash
npx @capgo/cli init
```

Capgo si integra perfettamente con le pipeline CI/CD, automatizzando la validazione del manifesto della privacy attraverso piattaforme come [GitHub Actions](https://docsgithubcom/actions), [GitLab CI](https://docsgitlabcom/ee/ci/) o [Jenkins](https://wwwjenkinsio/). Che tu scelga opzioni cloud o self-hosted, Capgo supporta 750 app in produzione garantendo che ogni aggiornamento rispetti gli standard di privacy

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per fornire continuamente ai nostri utenti!" – Rodrigo Mantica

> "Capgo è un modo intelligente per fare hot code push 🙂" – NASA's OSIRIS-REx

Capgo include anche analisi integrate per monitorare in tempo reale i tassi di successo degli aggiornamenti e il coinvolgimento degli utenti. Questo assicura che gli aggiornamenti della privacy raggiungano l'intera base utenti rimanendo conformi alle linee guida di Apple

## Conclusione

### Punti Chiave

Quando si tratta di gestire i manifesti della privacy, rimanere conformi e mantenere solide misure di sicurezza è cruciale. Ecco cosa conta di più:

-   **Crittografia end-to-end**: Mantiene gli aggiornamenti sicuri dall'inizio alla fine
-   **Monitoraggio in tempo reale**: Traccia efficacemente la distribuzione degli aggiornamenti
-   **Capacità di rollback istantaneo**: Funge da rete di sicurezza per correzioni rapide
-   **Validazione automatizzata**: Garantisce che i tuoi aggiornamenti soddisfino gli standard di conformità

Costruire un sistema di aggiornamento affidabile ti aiuta a stare al passo con i requisiti di privacy in evoluzione di Apple e Google. Questo approccio ha dimostrato di migliorare i tassi di approvazione dell'app store e rafforzare la fiducia degli utenti [\[1\]](https://capgoapp/)

### Come Iniziare

Puoi iniziare a implementare questi principi seguendo questi passaggi:

-   **Configura il tuo ambiente**: Esegui `npx @capgo/cli init` per iniziare
-   **Abilita le funzionalità di privacy**: Usa la crittografia end-to-end per aggiornamenti sicuri
-   **Implementa strumenti di monitoraggio**: Traccia gli aggiornamenti con le analisi
-   **Pianifica i rollback**: Assicurati di poter tornare rapidamente alle versioni precedenti se necessario

> "Capgo è uno strumento indispensabile per gli sviluppatori che vogliono aumentare la produttività. Evitare ritardi di revisione per la correzione di bug è un punto di svolta" - Bessie Cooper

Aggiornamenti regolari e strumenti appropriati sono fondamentali per rimanere conformi e migliorare nel tempo