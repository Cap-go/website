---
slug: how-to-add-dependencies-in-capacitor-plugins
title: Come Aggiungere Dipendenze nei Plugin Capacitor
description: >-
  Impara a ottimizzare la gestione delle dipendenze nei plugin Capacitor su
  tutte le piattaforme con passaggi pratici e best practice.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-27T02:08:04.837Z
updated_at: 2025-03-27T02:08:34.795Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e4966a10051fda3b63500a-1743041314795.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capacitor, plugin dependencies, iOS, Android, JavaScript, CocoaPods, Gradle,
  development tools
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
**Aggiungere dipendenze ai [Capacitor](https://capacitorjs.com/) plugin può sembrare complicato, ma è più semplice quando suddiviso in passaggi chiari. Ecco cosa devi sapere:**

1. **Comprendere gli strumenti**:
    - **JavaScript**: Usa `npm` per gestire le dipendenze.
    - **iOS**: Usa [CocoaPods](https://cocoapods.org/) o Swift Package Manager (SPM).
    - **Android**: Usa [Gradle](https://gradle.org/) per la gestione delle dipendenze.
2. **Configura il tuo ambiente di sviluppo**:
    - Installa strumenti come [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com/), [Xcode](https://developer.apple.com/xcode/), [Android Studio](https://developer.android.com/studio), CocoaPods e JDK.
3. **Avvia il tuo [progetto plugin Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/)**:
    - Usa `npm init @capacitor/plugin` per creare un nuovo plugin.
4. **Aggiungi dipendenze JavaScript**:
    - Usa `npm install` per le dipendenze di produzione e sviluppo.
    - Aggiorna `package.json` per includere peer dependencies come `@capacitor/core`.
5. **Gestisci le dipendenze specifiche per piattaforma**:
    - **iOS**: Configura CocoaPods o SPM con librerie come [Alamofire](https://github.com/Alamofire/Alamofire) o [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON).
    - **Android**: Usa Gradle per aggiungere dipendenze come Gson o AppCompat.
6. **Ottimizza le prestazioni**:
    - Fissa le versioni, controlla le dipendenze e risolvi i conflitti per garantire la stabilità.
7. **Usa strumenti come [Capgo](https://capgo.app/) per aggiornamenti live**:
    - Pubblica aggiornamenti istantaneamente senza revisioni dell'app store.

**Confronto rapido degli strumenti**:

| Piattaforma | Strumento | Esempio di Dipendenza |
| --- | --- | --- |
| JavaScript | npm | `npm install lodash --save` |
| iOS | CocoaPods/SPM | `pod 'Alamofire', '~> 5.6.4'` |
| Android | Gradle | `implementation 'com.google.code.gson:gson:2.10.1'` |

**Perché è importante**: Gestire efficacemente le dipendenze assicura che il tuo plugin funzioni perfettamente su tutte le piattaforme, risparmia tempo ed evita errori. Approfondiamo i passaggi.

## Come creare un plugin [Capacitor](https://capacitorjs.com/) per iOS/Android

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-27.jpg?auto=compress)

<Steps>

## Configurazione dell'ambiente di sviluppo

Prepara la tua configurazione con gli strumenti necessari per gestire efficacemente le dipendenze del [plugin Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/).

### Strumenti di sviluppo richiesti

Ecco un elenco degli strumenti necessari:

| Strumento | Versione | Scopo |
| --- | --- | --- |
| Node.js | 16.0.0+ | Ambiente di runtime JavaScript |
| npm | 8.0.0+ | Gestione pacchetti |
| Xcode | 14.0+ | Sviluppo iOS (solo Mac) |
| Android Studio | Electric Eel+ | Sviluppo Android |
| CocoaPods | 1.11.0+ | Gestione dipendenze iOS |
| JDK | 11+ | Strumenti di build Android |

### Avviare un nuovo plugin

Usa la CLI di Capacitor per avviare il tuo progetto plugin. Questo include la configurazione delle piattaforme e la denominazione del tuo plugin usando un formato di dominio inverso (es. `com.mycompany.plugin`):

1. Esegui il seguente comando:
   `npm init @capacitor/plugin`
2. Scegli le tue piattaforme target (iOS/Android).
3. Assegna un nome al tuo plugin nel formato dominio inverso.

### Passaggi per la configurazione del progetto

1. **Aggiorna `package.json`**

2. **Configurazione specifica per piattaforma**
    - Per **iOS**, assicurati che il tuo Podfile includa:
    - Per **Android**, verifica che il tuo `build.gradle` contenga:

3. **Configura le variabili d'ambiente**

    Configura le seguenti variabili d'ambiente per i tuoi strumenti di sviluppo:

    | Variabile | Scopo | Valore di esempio |
    | --- | --- | --- |
    | ANDROID_HOME | Posizione SDK Android | /Users/username/Library/Android/sdk |
    | JAVA_HOME | Percorso installazione JDK | /Library/Java/JavaVirtualMachines/jdk-11.0.12.jdk/Contents/Home |
    | XCODE_SELECT | Strumenti riga di comando Xcode | /Applications/Xcode.app/Contents/Developer |

Una volta configurato il progetto, sei pronto per passare alla gestione delle dipendenze JavaScript.

## Dipendenze JavaScript

La gestione efficace delle dipendenze JavaScript è fondamentale per mantenere prestazioni stabili del plugin.

### Installazione pacchetti [npm](https://www.npmjs.com/)

![npm](https://mars-images.imgix.net/seobot/screenshots/www.npmjs.com-ac76028e07fa565ed4006978107f5ce6-2025-03-27.jpg?auto=compress)

### Gestione di package.json

Ecco un esempio di configurazione `package.json`:

Per mantenere la coerenza, blocca le versioni delle dipendenze in modo appropriato:

| Tipo vincolo | Esempio | Caso d'uso |
| --- | --- | --- |
| Esatto | "5.0.0" | Per dipendenze critiche che richiedono una versione specifica |
| Circonflesso | "^5.0.0" | Permette aggiornamenti minori e patch |
| Tilde | "~5.0.0" | Limita gli aggiornamenti solo alle patch |

### Utilizzo delle librerie JavaScript

Quando importi le librerie, concentrati sulla riduzione delle dimensioni del bundle:

Inoltre, assicura una corretta gestione degli errori e il controllo dei tipi:

A seguire, esplora come gestire le dipendenze specifiche per iOS.

## Dipendenze iOS

Questa sezione spiega come gestire le dipendenze native iOS nei [plugin Capacitor](https://capgo.app/plugins/). Una volta configurate le dipendenze JavaScript, il prossimo passo è gestire le dipendenze native iOS.

### Configurazione [CocoaPods](https://cocoapods.org/)

![CocoaPods](https://mars-images.imgix.net/seobot/screenshots/cocoapods.org-fd202c6f9998fdf4cafb9b363e43119c-2025-03-27.jpg?auto=compress)

Inizia inizializzando CocoaPods nella tua directory iOS:

### Configurazione Podfile

Dopo aver inizializzato CocoaPods, configura il Podfile per includere Capacitor e eventuali librerie di terze parti:

Ecco alcuni pattern comuni di configurazione delle dipendenze:

| Tipo vincolo | Esempio | Caso d'uso |
| --- | --- | --- |
| Versione esatta | `pod 'KeychainAccess', '4.2.2'` | Quando è necessario un controllo preciso, come per componenti di sicurezza |
| Versione minore | `pod 'Alamofire', '~> 5.6'` | Per API stabili che possono ricevere aggiornamenti patch |
| Versione maggiore | `pod 'SwiftyJSON', '> 5.0'` | Quando è accettabile la flessibilità tra gli aggiornamenti |

### Dipendenze Swift Package

Se preferisci non usare CocoaPods, Swift Package Manager (SPM) è una buona alternativa. Aggiungi le dipendenze SPM direttamente in Xcode con la seguente configurazione nel tuo file `Package.swift`:

Per utilizzare le dipendenze SPM nel tuo codice plugin, importale e integrali secondo necessità. Per esempio:

Questo approccio ti permette di scegliere tra CocoaPods e Swift Package Manager in base ai requisiti del tuo progetto.

## Dipendenze Android

Configura le dipendenze Android per garantire una perfetta integrazione nativa. Ecco come gestire le dipendenze per il tuo plugin Capacitor.

### Dipendenze [Gradle](https://gradle.org/)

![Gradle](https://mars-images.imgix.net/seobot/screenshots/gradle.org-85d271057dfb5e2e134ec99beaad5682-2025-03-27.jpg?auto=compress)

### Configurazione Repository

Nel tuo `build.gradle` a livello di progetto, includi i repository Maven necessari:

Se stai usando repository Maven personalizzati o privati, aggiungi le credenziali così:

Con i repository configurati, affronta eventuali conflitti di dipendenze che possono sorgere.

### Risoluzione problemi di compatibilità

Per gestire i conflitti di dipendenze, applica le risoluzioni di versione nel tuo `build.gradle`:

Ecco le strategie per risolvere i problemi comuni con le dipendenze:

| Tipo problema | Strategia | Esempio |
| --- | --- | --- |
| Conflitto versione | Forza una versione specifica | `force 'com.google.code.gson:gson:2.10.1'` |
| Versioni multiple | Escludi un modulo | `exclude group: 'org.json', module: 'json'` |
| Problemi transitivi | Usa versioni rigide | `strictly 'androidx.core:core-ktx:1.10.1'` |

Per esempio, puoi escludere moduli in conflitto così:

Infine, ottimizza il processo di build abilitando la cache e l'esecuzione parallela in `gradle.properties`:

## Integrazione [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-27.jpg?auto=compress)

Usare Capgo insieme alla gestione delle dipendenze native e JavaScript rende più veloce e facile l'aggiornamento del tuo plugin.

### Informazioni su Capgo

Capgo è una piattaforma di aggiornamento live progettata per plugin e app Capacitor. Con oltre 23,5 milioni di aggiornamenti distribuiti su 750 app in produzione [\[1\]](https://capgo.app/), Capgo permette agli sviluppatori di pubblicare aggiornamenti per dipendenze e codice istantaneamente - senza necessità di revisione dell'app store. Gli aggiornamenti sono protetti con crittografia end-to-end e soddisfano gli standard di conformità sia Apple che Android.

### Funzionalità di aggiornamento Capgo

Capgo semplifica la gestione delle dipendenze dei plugin con queste funzionalità:

| Funzionalità | Cosa fa | Metrica chiave |
| --- | --- | --- |
| Aggiornamenti live | Pubblica aggiornamenti in minuti | 95% tasso di aggiornamento utenti in 24 ore |
| Aggiornamenti parziali | Scarica solo i file modificati | 357ms tempo medio di risposta API |
| Controllo versioni | Gestisce versioni multiple | 82% tasso di successo globale |
| Sistema di canali | Target gruppi specifici di utenti | Supporta canali di distribuzione multipli |

Fonte: [\[1\]](https://capgo.app/)

Capgo funziona perfettamente con strumenti CI/CD come GitHub Actions, GitLab CI e Jenkins, automatizzando gli aggiornamenti delle dipendenze e garantendo versioni coerenti dei plugin. Questi strumenti rendono più facile integrare Capgo nel tuo flusso di lavoro.

### Configurazione di Capgo

Segui questi passaggi per integrare Capgo nel tuo progetto:

1. **Installa la CLI di Capgo**
    
    Esegui il seguente comando nel terminale:
    
    ```json
    {
      "capacitor": {
        "ios": {
          "src": "ios"
        },
        "android": {
          "src": "android"
        }
      },
      "peerDependencies": {
        "@capacitor/core": "^5.0.0"
      }
    }
    ```
    
2. **Configura le Preferenze di Aggiornamento**
    
    Usa la dashboard di Capgo per configurare i canali di distribuzione e le preferenze. Sono supportate sia configurazioni cloud che self-hosted.
    
3. **Aggiungi la Logica di Aggiornamento**
    
    Aggiungi questo codice al tuo file plugin principale per abilitare gli aggiornamenti:
    
    ```ruby
        platform :ios, '13.0'
        use_frameworks!
        ```
    

> "Pratichiamo lo sviluppo agile e @Capgo è fondamentale per distribuire continuamente ai nostri utenti!" - Rodrigo Mantica

Capgo fornisce anche una dashboard analitica per informazioni in tempo reale sui tassi di successo degli aggiornamenti e l'attività degli utenti. Funzionalità come il rollback con un clic e il monitoraggio degli errori aiutano a risolvere rapidamente eventuali problemi, mantenendo fluidi gli aggiornamenti del plugin.

## Conclusione

### Revisione del Processo

La gestione delle dipendenze per i plugin Capacitor implica l'allineamento dei componenti nativi (iOS e Android) con le loro controparti JavaScript per garantire un'integrazione fluida. Questo processo include configurazioni specifiche per piattaforma e gestione dei pacchetti JavaScript per ottenere le migliori prestazioni. Seguire i passaggi delineati aiuterà a mantenere una funzionalità del plugin stabile ed efficiente.

### Migliori Pratiche

Per gestire efficacemente le dipendenze, considera queste pratiche:

| Pratica | Beneficio | Come Implementare |
| --- | --- | --- |
| Fissaggio Versioni | Evita problemi imprevisti | Usa versioni fisse in `package.json` |
| Isolamento Piattaforme | Minimizza i conflitti | Separa le dipendenze native |
| Aggiornamenti Regolari | Migliora la sicurezza | Applica patch critiche tempestivamente |
| Audit Dipendenze | Rileva rischi | Esegui `npm audit` frequentemente |

L'utilizzo di strumenti di aggiornamento live come Capgo può ulteriormente semplificare e migliorare queste pratiche abilitando aggiornamenti in tempo reale.

### Benefici di Capgo

Capgo semplifica il processo di gestione delle dipendenze mantenendo prestazioni elevate. Raggiunge un impressionante **tasso di aggiornamento del 95% degli utenti entro 24 ore** e mantiene un tempo di risposta API globale di **357ms** [\[1\]](https://capgo.app/). Con la crittografia end-to-end, garantisce aggiornamenti sicuri conformi alle linee guida sia di Apple che di Android. Per i team che gestiscono più versioni di plugin, il sistema di canali di Capgo permette distribuzioni mirate per gruppi specifici di utenti.

Ecco una rapida panoramica delle prestazioni di Capgo:

| Metrica | Valore |
| --- | --- |
| Tempo di Risposta API Globale | 357ms |
| Tasso di Successo Aggiornamenti | 82% |
| Tasso di Aggiornamento Utenti (24 Ore) | 95% |
