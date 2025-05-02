---
slug: guida-configurazione-progetto-capacitor-cli
title: Capacitor CLIを使用したプロジェクト設定ガイド
description: >-
  Scopri come configurare Capacitor CLI per creare app native iOS e Android
  utilizzando tecnologie web in pochi semplici passaggi.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-04-18T03:04:53.935Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
original_slug: capacitor-cli-project-setup-guide
---
**Vuoi creare app iOS e Android con un'unica base di codice?** La CLI di [Capacitor](https://capacitorjs.com/) semplifica il processo, permettendoti di creare app native utilizzando tecnologie web. Ecco cosa imparerai:

-   **Configurazione Rapida**: Installa la CLI Capacitor e inizializza il tuo progetto in pochi minuti.
-   **Integrazione Piattaforme**: Aggiungi il supporto per iOS e Android con semplici comandi.
-   **Aggiornamenti Live**: Usa [Capgo](https://capgo.app/) per aggiornamenti istantanei over-the-air.
-   **Soluzioni Comuni**: Risolvi problemi come errori di sincronizzazione o fallimenti di build.

**Passaggi Chiave per Iniziare:**

1.  Installa [Node.js](https://nodejs.org/en), npm, JDK, [Xcode](https://developer.apple.com/xcode/) e [Android Studio](https://developer.android.com/studio).
2.  Esegui `npm install @capacitor/core @capacitor/cli` e inizializza il tuo progetto.
3.  Aggiungi le piattaforme iOS e Android usando `npx cap add ios` e `npx cap add android`.
4.  Opzionale: Configura Capgo per [aggiornamenti app](https://capgo.app/plugins/capacitor-updater/) live.

Questa guida copre tutto ciò che ti serve per configurare la CLI Capacitor, configurare le piattaforme e distribuire la tua app. Iniziamo!

## Introduzione a [Capacitor](https://capacitorjs.com/) Configure

![Capacitor](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

<Steps>

## Requisiti di Setup

Per iniziare, assicurati di avere installati i seguenti strumenti:

-   **Node.js** (versione 14 o più recente) e **npm**
-   **Java JDK** (versione 11 o più recente)
-   **Xcode** (versione 12 o più recente per build iOS)
-   **Android Studio** (per build Android)
-   **Capacitor CLI** (versione 6 o 7)

_Opzionale:_ Se vuoi abilitare gli aggiornamenti live, consulta la "[Guida alla Configurazione di Capgo](https://capgo.app/docs/plugin/cloud-mode/getting-started/)" qui sotto.

## Passaggi per l'Installazione della CLI

Prima di iniziare, assicurati di avere **Node.js**, **npm**, **JDK**, **Xcode** e **Android Studio** configurati. Una volta pronti, puoi installare la CLI Capacitor eseguendo:

```bash
npm install @capacitor/core @capacitor/cli
```

Questo comando installa Capacitor e configura i suoi componenti principali.

Dopo aver completato questo passaggio, passa a **Creazione di un Nuovo Progetto** per strutturare la tua applicazione.

## Creazione di un Nuovo Progetto

Per iniziare con il tuo progetto [usando la CLI Capacitor](https://capgo.app/docs/cli/commands/), segui questi passaggi:

```bash
npx cap init
```

### Aggiornamento del File di Configurazione

Modifica il file `capacitor.config.json` per includere le seguenti impostazioni:

```json
{
  "appId": "com.example.app",
  "appName": "My App",
  "webDir": "dist",
  "bundledWebRuntime": false
}
```

Una volta aggiornato, usa questa configurazione per impostare Capacitor per il tuo progetto.

## Configurazione delle Piattaforme

Ora che la struttura del progetto è pronta, è il momento di configurare i target iOS e Android.

### Aggiunta di iOS e Android

Inizia installando i pacchetti necessari specifici per piattaforma usando la CLI Capacitor:

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

Per iOS, assicurati di avere Xcode 14 o successivo, [CocoaPods](https://cocoapods.org/) 1.11 o più recente e macOS 12 o superiore. Per Android, avrai bisogno di Android Studio Giraffe (2022.3.1+), JDK 17 o successivo e [Gradle](https://gradle.org/) 7.5 o superiore.

Una volta installato, dovrai mantenere aggiornati i tuoi target nativi con le modifiche alla tua applicazione web.

### Aggiornamenti Piattaforma

Per sincronizzare le tue piattaforme con le ultime modifiche web, segui questi passaggi dopo aver aggiornato la tua app web:

```bash
npx cap sync
```

Il comando `cap sync` gestisce due compiti:

-   Copia gli asset web aggiornati nelle piattaforme native
-   Aggiorna le configurazioni native e i plugin per corrispondere alle ultime modifiche

### Configurazione IDE

Apri i progetti specifici per piattaforma negli IDE appropriati:

```bash
npx cap open ios
npx cap open android
```

**In Xcode:**

1.  Scegli il tuo team di sviluppo.
2.  Configura i certificati di firma.
3.  Aggiorna il tuo identificatore bundle.

**In Android Studio:**

1.  Modifica l'ID dell'applicazione in `build.gradle`.
2.  Configura il keystore per la firma.
3.  Configura sia le varianti di build debug che release.

Quando tutto è configurato, compila i progetti usando `npx cap build ios` o `npx cap build android`. Non dimenticare di eseguire nuovamente `npx cap sync` per assicurarti che tutti gli asset siano aggiornati.

## Guida alla Configurazione di [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Configura Capgo per abilitare aggiornamenti istantanei over-the-air per la tua app.

### Caratteristiche Principali di Capgo

Capgo offre diversi strumenti per semplificare gli aggiornamenti delle app:

-   La **crittografia end-to-end** garantisce la consegna sicura degli aggiornamenti.
-   Gli aggiornamenti vengono eseguiti **in background** all'avvio dell'app.
-   Gli **strumenti di analisi** aiutano a monitorare i tassi di successo degli aggiornamenti e il coinvolgimento degli utenti.
-   Un'opzione di **rollback con un clic** ti permette di recuperare rapidamente da aggiornamenti problematici.
-   Usa il **[sistema di canali](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** per rilasci graduali e test beta.

### Installazione di Capgo

Segui questi passaggi per iniziare con Capgo:

1.  [Installa la CLI Capgo](https://capgo.app/docs/self-hosted/local-dev/cli/):
    
    ```bash
    npm install @capgo/cli -g
    ```
    
2.  [Inizializza Capgo](https://capgo.app/docs/webapp/) nel tuo progetto:
    
    ```bash
    npx capgo init
    ```
    
3.  Compila e rilascia gli aggiornamenti:
    
    ```bash
    npx capgo upload
    ```
    
4.  Apri l'app per attivare il processo di aggiornamento in background.
    

### Migliori Pratiche

-   Usa i canali per testare gli aggiornamenti prima di distribuirli a tutti gli utenti.
-   Monitora le analitiche per assicurarti che gli aggiornamenti vengano consegnati con successo e gli utenti rimangano coinvolti.
-   Abilita il tracciamento degli errori per individuare e risolvere i problemi tempestivamente.
-   Mantieni pronta la funzione di rollback per affrontare rapidamente eventuali problemi.

Capgo è compatibile con Capacitor 6 e 7, si integra facilmente con le pipeline CI/CD e rispetta i requisiti degli store Apple e Google.

## Problemi Comuni e Suggerimenti

Una volta completata la configurazione della piattaforma e di Capgo, potresti incontrare alcuni errori comuni. Ecco come affrontarli rapidamente.

### Problemi di Configurazione dell'Ambiente

-   **CLI Non Trovata**  
    **Errore**: Il comando `npx cap` fallisce.  
    **Soluzione**: Esegui `npm install --save @capacitor/cli @capacitor/core` e riprova.
    
-   **Mancata Corrispondenza Versione Node**  
    **Errore**: I comandi CLI falliscono a causa di errori di versione Node.js.  
    **Soluzione**: Installa Node.js versione 14 o superiore come indicato nei requisiti di setup.
    

### Problemi di Configurazione

-   **Mancata Corrispondenza Config**  
    **Errore**: Le modifiche in `capacitor.config.json` non hanno effetto.  
    **Soluzione**: Assicurati che i valori `appId` e `webDir` corrispondano al tuo `package.json` e alla cartella di output della build web.
    
-   **Errori di Sincronizzazione Piattaforma**  
    **Errore**: L'esecuzione di `npx cap sync` risulta in conflitti di versione dei plugin.  
    **Soluzione**: Aggiorna `@capacitor/android` e `@capacitor/ios` alla stessa versione maggiore, poi riesegui il comando sync.
    

### Build e Deployment

-   **Errori di Firma Build**  
    **Errore**: Le build iOS o Android falliscono a causa di certificati mancanti o keystore.  
    **Soluzione**: Segui le istruzioni di configurazione IDE. Per iOS, aggiungi il tuo team di sviluppo in Xcode. Per Android, configura il keystore in `build.gradle`.
    
-   **Directory Web Non Trovata**  
    **Errore**: `npx cap sync` non trova gli asset web.  
    **Soluzione**: Esegui il tuo comando di build web (es. `npm run build`) prima di sincronizzare le piattaforme.
    

### Problemi di Aggiornamento Live

-   **[Errori di Aggiornamento Capgo](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **Errore**: Gli aggiornamenti non appaiono nell'app in produzione.  
    **Soluzione**: Ricontrolla la tua [chiave API Capgo](https://capgo.app/docs/webapp/api-keys/) in `capacitor.config.json` e assicurati di mirare al canale corretto.

Per maggiori dettagli sulla configurazione specifica per piattaforma, rivedi la sezione Configurazione Piattaforme. Se stai lavorando con aggiornamenti live, consulta la Guida alla Configurazione di Capgo per ulteriori suggerimenti sulla risoluzione dei problemi.

## Riepilogo

### Revisione Setup

Avvia la tua app web con la CLI Capacitor, configura le piattaforme iOS e Android e opzionalmente includi Capgo per aggiornamenti live.

Ecco come iniziare:

-   Usa la CLI Capacitor per inizializzare il tuo progetto.
-   Configura l'ID del pacchetto della tua app e definisci la directory di output web.
-   Aggiungi il supporto per le piattaforme iOS e Android.
-   Installa e configura Capgo con il seguente comando: `npm install --save @capgo/cli && npx capgo init`

Per istruzioni dettagliate sulla configurazione o risoluzione dei problemi, consulta la documentazione ufficiale di Capacitor e Capgo.
