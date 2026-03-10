---
slug: how-to-customize-build-scripts-with-capacitor-cli
title: Come Personalizzare gli Script di Build con Capacitor CLI
description: >-
  Impara come personalizzare i tuoi script di build utilizzando Capacitor CLI
  per distribuzioni efficienti e aggiornamenti delle app personalizzati su tutte
  le piattaforme.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T01:58:36.984Z
updated_at: 2026-03-10T13:30:16.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873-1743559128944.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Capacitor, build scripts, mobile development, deployment automation,
  environment variables, app updates
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI ti consente di personalizzare il processo di build della tua app per le piattaforme iOS, Android e web. Modificando gli script di build, puoi:

- **Aggiornamenti più rapidi**: invia modifiche istantaneamente senza ritardi nell'app store.
- **Controlla le distribuzioni**: ripristina gli aggiornamenti o scegli come target gruppi di utenti specifici.
- **Proteggi la tua app**: utilizza la crittografia per proteggere gli aggiornamenti.
- **Ottimizza build**: regola le impostazioni per le esigenze specifiche della piattaforma.

### Panoramica rapida delle funzionalità principali:

- **File di configurazione**: utilizza `capacitor.config.json` e `package.json` per gestire le impostazioni di creazione.
- **Script personalizzati**: aggiungi attività di precompilazione e postcompilazione per l'automazione.
- **Build Hook**: esegui il codice durante fasi specifiche del processo di build.
- **Variabili d'ambiente**: semplifica le build specifiche dell'ambiente con i file `.env`.

[Capgo](https://capgo.app/), uno strumento di distribuzione, migliora questo processo con [aggiornamenti automatici](https://capgo.app/docs/live-updates/update-behavior/), monitoraggio della versione e ottimizzazione delle prestazioni globali. Continua a leggere per scoprire come impostare e personalizzare i tuoi script di build per la massima efficienza.

## Introduzione a [Capacitor](https://capacitorjs.com/) Configure

![Sito web della documentazione del framework Capacitor](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Processo di build predefinito in Capacitor

Comprendere come Capacitor gestisce il processo di creazione predefinito è fondamentale se desideri personalizzarlo in modo efficace. Di seguito, analizzeremo il processo di creazione della CLI di Capacitor e i suoi file di configurazione chiave.

### Fasi standard della build

Capacitor utilizza un processo passo passo per trasformare la tua app Web in build specifiche della piattaforma. Ecco cosa succede durante il processo di compilazione predefinito:

| Fase | Descrizione | Uscita |
| --- | --- | --- |
| **Creazione Web** | Compila risorse web utilizzando gli strumenti del framework | Pacchetto web ottimizzato |
| **Copia risorse** | Sposta le risorse Web nelle cartelle della piattaforma nativa | Directory di risorse specifiche della piattaforma |
| **Build nativa** | Esegue comandi di compilazione specifici della piattaforma | Binari pronti per la distribuzione |
| **Verifica** | Controlla l'integrità e le dipendenze della build | Stato della build e avvisi |

### File di configurazione principali

Due file di configurazione chiave determinano il modo in cui Capacitor gestisce le tue build:

**capacitor.config.json**  
Questo è il file di configurazione principale per il tuo progetto Capacitor. Imposta parametri importanti per le tue build:

```json
{
  "appId": "com.example.app",
  "appName": "MyApp",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000
    }
  }
}
```

- **`appId`**: un identificatore univoco per la tua app.
- **`appName`**: il nome della tua app.
- **`webDir`**: specifica dove Capacitor deve cercare le risorse web (ad esempio, `dist`).
- **`plugins`**: consente di configurare impostazioni specifiche del plug-in, come le opzioni SplashScreen.

**package.json**  
Questo file include script di compilazione e dipendenze che influenzano il processo di compilazione:

```json
{
  "scripts": {
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "cap:build": "cap build"
  }
}
```

- L'impostazione `webDir` in `capacitor.config.json` indica a Capacitor dove individuare le risorse Web compilate per l'inclusione nelle build native.
- Dopo aver apportato modifiche a `capacitor.config.json`, è necessario eseguire `cap sync` per garantire che i progetti nativi vengano aggiornati.

Successivamente, esploreremo come modificare queste impostazioni per personalizzare ulteriormente le tue build.

## Modifica degli script di build

Puoi modificare il processo di creazione predefinito di Capacitor per adattarlo meglio alle esigenze del tuo progetto. Ecco come:

### Impostazioni del file di configurazione

È possibile modificare il processo di creazione modificando il file `capacitor.config.json`. Di seguito è riportato un esempio di configurazione:

```json
{
  "appId": "com.example.app",
  "webDir": "www",
  "server": {
    "hostname": "localhost",
    "androidScheme": "https",
    "iosScheme": "https",
    "allowNavigation": ["*.example.com"]
  },
  "android": {
    "buildOptions": {
      "keystorePath": "release.keystore",
      "keystorePassword": "mypassword",
      "keystoreAlias": "release",
      "keystoreAliasPassword": "mypassword"
    }
  },
  "ios": {
    "scheme": "App",
    "automaticProvisioning": true
  }
}
```

Ecco alcune impostazioni chiave che puoi modificare:

- **`webDir`**: specifica dove si trovano le risorse web compilate.
- **`server`**: configura il server di sviluppo, inclusi il nome host e le autorizzazioni di navigazione.
- **`android/ios`**: consente impostazioni di build specifiche della piattaforma, come i dettagli del keystore per Android o le opzioni di provisioning per iOS.

### Creare script NPM

Per semplificare il flusso di lavoro, aggiungi script NPM personalizzati al tuo file `package.json`. Ecco un esempio:

```json
{
  "scripts": {
    "prebuild": "node ./scripts/prepare-env.js",
    "build": "npm run build:web && cap sync",
    "build:web": "vite build",
    "build:ios": "cap build ios --release",
    "build:android": "cap build android --release",
    "postbuild": "node ./scripts/notify-completion.js"
  }
}
```

- **`prebuild` e `postbuild`**: utilizzali per attività come la configurazione dell'ambiente o l'invio di notifiche al termine della creazione.
- **`build:platform`**: comandi specifici della piattaforma per la creazione di app Android o iOS.

Puoi portare l'automazione ancora più avanti aggiungendo ganci di costruzione.

### Configurazione dei build hook

Per un controllo più avanzato, utilizza gli hook di compilazione per eseguire codice personalizzato in punti specifici durante il processo di compilazione. Ecco un esempio di configurazione in `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  plugins: {
    CapacitorHooks: {
      beforeBuild: async () => {
        console.log('Running pre-build tasks...');
        // Add your pre-build tasks here
      },
      afterBuild: async () => {
        console.log('Running post-build tasks...');
        // Add your post-build tasks here
      }
    }
  }
};

export default config;
```

Con gli hook di costruzione puoi:

- Convalidare i requisiti prima dell'inizio della compilazione
- Trasformare le risorse durante il processo
- Attiva notifiche nei punti chiave
- Aggiorna automaticamente i numeri di versione
- Esegui test automatizzati senza problemi

Questo approccio offre maggiore flessibilità e controllo sull'intero ciclo di vita della build.

## Personalizzazione avanzata della build

Quando lavori su progetti più grandi, la messa a punto del processo di creazione può fare una grande differenza. Ecco come gestire in modo efficace build specifiche dell'ambiente e personalizzazioni della piattaforma.

### Variabili d'ambiente

Configura le variabili di ambiente creando file `.env` separati per ciascun ambiente:

- `.env.development`
- `.env.staging`
- `.env.production`

Quindi, configura lo script di build per caricare il file appropriato in base all'ambiente:

```typescript
import { defineConfig } from '@capacitor/cli';

export default defineConfig({
  ios: {
    buildConfig: {
      environment: process.env.BUILD_ENV || 'development',
      configurations: {
        development: {
          signing: {
            debug: true,
            automaticProvisioning: true
          }
        },
        production: {
          signing: {
            release: true,
            provisioningProfile: 'dist/profile.mobileprovision'
          }
        }
      }
    }
  }
});
```

Puoi modificare ulteriormente queste impostazioni per soddisfare i requisiti specifici della piattaforma.

### Build specifiche per la piattaforma

Per personalizzare le build per Android e iOS, utilizza la seguente struttura:

```typescript
const platformConfig = {
  android: {
    buildType: process.env.BUILD_TYPE || 'debug',
    keystoreConfig: {
      path: process.env.KEYSTORE_PATH,
      password: process.env.KEYSTORE_PASSWORD,
      alias: process.env.KEYSTORE_ALIAS
    }
  },
  ios: {
    scheme: process.env.APP_SCHEME || 'App',
    xcodePreferences: {
      automaticSigning: false,
      developmentTeam: process.env.DEVELOPMENT_TEAM
    }
  }
};
```

Queste configurazioni ti consentono di personalizzare le build per ciascuna piattaforma, garantendo distribuzioni più fluide.

| Caratteristica | Androide | ios |
| --- | --- | --- |
| Simboli di debug | [ProGuard](https://www.guardsquare.com/proguard) file di mappatura | File dSYM |
| Costruisci varianti | eseguire il debug, rilasciare, mettere in scena | eseguire il debug, rilasciare |
| Firma del codice | Gestione archivio chiavi | Profili di provisioning |
| Gestione patrimoniale | ottimizzazione res/drawable | Cataloghi asset |

Ulteriori suggerimenti per ottimizzare le build includono:

- Utilizzo di aggiornamenti parziali per risparmiare tempo durante le distribuzioni
- Impostazione del monitoraggio degli errori per identificare rapidamente i problemi
- Creazione di sistemi di canali per le versioni beta testing
- Abilitazione della crittografia end-to-end per una distribuzione sicura

Se abbinate a strumenti come Capgo per analisi e aggiornamenti sicuri, queste tecniche ti offrono un maggiore controllo sul processo di distribuzione [\[1\]](https://capgo.app/).

## Problemi e soluzioni degli script di build

Quando si lavora con configurazioni di build personalizzate, affrontare rapidamente gli errori è fondamentale per mantenere il processo di build senza intoppi.

### Correggere gli errori comuni

Molti problemi relativi agli script di build derivano dalla configurazione dell'ambiente o da problemi di dipendenza. Ecco come risolverne alcuni comuni:

**Variabili d'ambiente mancanti**

Se riscontri un errore come questo:

```bash
error: Cannot find environment configuration for BUILD_ENV
```

Puoi risolverlo creando un file `.env.local` nella directory principale del tuo progetto. Ecco un esempio:

```bash
BUILD_ENV=development
CAPACITOR_PLATFORM=ios
BUILD_TYPE=debug
```

**Errori di build specifici della piattaforma**

Per gli errori di firma Android, utilizza questo comando:

```bash
npx cap build android --keystorePassword=$KEYSTORE_PASSWORD --keystoreAlias=$KEYSTORE_ALIAS
```

Per problemi relativi al profilo di provisioning iOS, prova questo:

```bash
npx cap build ios --configuration=release --type=development
```

| Tipo di errore | Causa comune | Soluzione |
| --- | --- | --- |
| Configurazione firma | Dettagli del keystore mancanti | Impostare `KEYSTORE_PATH` e credenziali |
| Costruisci ambiente | Variabili non definite | Crea file `.env` specifici della piattaforma |
| Dipendenze | Mancate corrispondenze di versione | Aggiorna `package.json` e sincronizza |

Dopo aver applicato le correzioni, assicurati che le modifiche siano solide eseguendo test di compilazione approfonditi.

### Testare gli script di build

Una volta risolti gli errori, convalida gli script di build con questi passaggi:

- **Verifica automatica**: esegui i comandi chiave per confermare che il processo di creazione funziona come previsto.

```bash
npm run build
npx cap sync
npx cap copy
```

- **Convalida dell'ambiente**: verifica la presenza di variabili di ambiente mancanti prima di avviare la compilazione.

```typescript
const requiredVars = ['BUILD_ENV', 'KEYSTORE_PATH'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```

- **Debug degli script di compilazione**: aggiungi script dettagliati per individuare potenziali problemi durante la compilazione.

```json
{
  "scripts": {
    "build:debug": "NODE_ENV=development npx cap build --verbose",
    "build:release": "NODE_ENV=production npx cap build --verbose"
  }
}
```

Ulteriori suggerimenti per il test:

- Utilizzare i contenitori [Docker](https://www.docker.com/) per isolare le build.
- Convalidare i file di configurazione prima di avviare il processo.
- Test con più versioni di [Node.js](https://nodejs.org/en).
- Confermare che i requisiti specifici della piattaforma siano soddisfatti.
- Tieni d'occhio le prestazioni della build per possibili miglioramenti.

## Funzionalità di build di [Capgo](https://capgo.app/)

![Interfaccia dashboard aggiornamento Capgo Live](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/454adbba4c00491adce88db59812b177.jpg)

Capgo porta gli script di creazione a un livello superiore con la distribuzione automatizzata, migliorando l'efficienza e semplificando il processo.

### Aggiornamenti rapidi dell'app

Le prestazioni di aggiornamento di Capgo sono impressionanti:

- **Il 95% degli utenti attivi** riceve gli aggiornamenti entro 24 ore.
- **Tasso di successo dell'82%** per la distribuzione degli aggiornamenti in tutto il mondo.
- Un tempo di risposta API medio di **434 ms a livello globale**.

La piattaforma utilizza aggiornamenti parziali, ovvero vengono scaricate solo le modifiche. Questo approccio riduce l'utilizzo della larghezza di banda e accelera il processo di aggiornamento. Inoltre, l'intero processo di creazione è completamente automatizzato, consentendo di risparmiare tempo e fatica.

### Automazione della build

Capgo funziona perfettamente con le principali piattaforme CI/CD, offrendo una varietà di integrazioni:

| Piattaforma CI/CD | Funzionalità di integrazione | Vantaggi |
| --- | --- | --- |
| [Azioni GitHub](https://docs.github.com/actions) | Build automatizzate, Distribuisci trigger | Distribuzione continua |
| [GitLab CI](https://docs.gitlab.com/ee/ci/) | Automazione della pipeline, controllo della versione | Flusso di lavoro semplificato |
| [Jenkins](https://www.jenkins.io/) | Flussi di lavoro personalizzati, Creazione di hook | Scalabile per le imprese |

L'impostazione di una build automatizzata costa in genere circa **$ 300 al mese**, il che è molto più conveniente rispetto alle soluzioni tradizionali che possono arrivare fino a **$ 6.000 all'anno**.

### Standard di sicurezza

Capgo dà priorità alla sicurezza con un solido framework che include:

- Crittografia end-to-end per i pacchetti di aggiornamento.
- Gestione sicura delle chiavi.
- Conformità alle linee guida di Apple e Google.

**Funzioni di controllo della versione**

- Opzioni di rollback istantaneo.
- Monitoraggio della versione di distribuzione.
- Aggiornare la gestione dei canali per i rilasci graduali.

Questo framework di sicurezza è stato rigorosamente testato su centinaia di applicazioni aziendali. Per i team che necessitano di maggiore sicurezza, Capgo offre anche soluzioni self-hosted con configurazioni personalizzabili.

Il sistema di canali di Capgo rende flessibile la distribuzione degli aggiornamenti. Gli sviluppatori possono rivolgersi a gruppi di utenti specifici con versioni diverse, perfette per beta testing o implementazioni graduali.

## Riepilogo

### Panoramica delle fasi di build

Gli script di build personalizzati consentono distribuzioni automatizzate e coerenti sfruttando hook di build, variabili di ambiente e comandi specifici della piattaforma. Questi processi creano una solida base per i miglioramenti di distribuzione resi possibili con Capgo.

### Vantaggi di Capgo

Capgo semplifica l'implementazione, avendo distribuito con successo oltre 23,5 milioni di aggiornamenti su 750 app di produzione [\[1\]](https://capgo.app/). Il suo sistema di aggiornamento parziale riduce sia l'utilizzo della larghezza di banda che i tempi di implementazione.

La piattaforma fornisce aggiornamenti rapidi, ottimizzazione delle prestazioni globali, crittografia end-to-end per la sicurezza e un sistema di distribuzione flessibile basato su canali. Questa configurazione supporta aggiornamenti mirati, beta test e conformità con le linee guida dell'app store mantenendo un solido quadro di sicurezza.
