---
slug: come-funzionano-gli-aggiornamenti-live-per-capacitor
title: Come funzionano gli aggiornamenti in tempo reale in Capgo
description: >-
  Approfondimento nell'implementazione tecnica degli aggiornamenti in tempo
  reale in Capgo, comprendendo il suo funzionamento interno sia per iOS che per
  Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: Architettura degli aggiornamenti in tempo reale
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
original_slug: how-live-updates-for-capacitor-work
---
# Comprendere gli aggiornamenti in tempo reale in Capgo

Gli aggiornamenti in tempo reale sono una delle funzionalità più potenti nelle app Capacitor, consentendo aggiornamenti in tempo reale senza dover inviare l'app agli store. Vediamo nel dettaglio come Capgo implementa questa funzionalità.

## Concetti Fondamentali

Un'app Capacitor è composta da due livelli principali:

1. **Livello Web**: Contiene i file HTML, CSS e JavaScript caricati nella WebView
2. **Livello Nativo**: Contiene il codice specifico per piattaforma (Java/Kotlin per Android, Swift per iOS)

Il sistema di aggiornamento in tempo reale di Capgo funziona sostituendo il livello web durante l'esecuzione, poiché questi file non sono compilati nel binario dell'app.

## Implementazione Tecnica

### Percorsi Server in Capacitor

Capgo gestisce due percorsi critici:

- **Percorso Server Attuale**: Punta ai file attualmente caricati nella WebView
- **Percorso Server Successivo**: Punta ai file che verranno caricati al prossimo riavvio dell'app

### Implementazione Android

Su Android, Capgo gestisce i percorsi attraverso:

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### Implementazione iOS

Su iOS, i percorsi sono gestiti attraverso:

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## Misure di Sicurezza

Capgo implementa una sicurezza di livello militare attraverso la crittografia end-to-end, garantendo che gli aggiornamenti della tua app rimangano completamente sicuri dallo sviluppo alla distribuzione. Il nostro sistema di crittografia va oltre la tradizionale firma del codice per fornire una vera sicurezza a conoscenza zero.

### Architettura della Crittografia End-to-End

1. **Crittografia End-to-End (E2EE)**: Ogni pacchetto di aggiornamento viene crittografato utilizzando la crittografia AES-256-GCM prima di lasciare il tuo ambiente di sviluppo. Questa crittografia di livello militare garantisce che gli aggiornamenti della tua app rimangano completamente privati e sicuri durante l'intero processo di consegna.

2. **Architettura a Conoscenza Zero**: A differenza di altre soluzioni OTA che si limitano a firmare gli aggiornamenti, Capgo utilizza una vera crittografia a conoscenza zero. Questo significa:
   - Il contenuto degli aggiornamenti viene crittografato prima del caricamento
   - I server Capgo memorizzano solo dati crittografati
   - La decrittografia avviene solo sui dispositivi degli utenti finali
   - Nessun intermediario può accedere al contenuto dell'aggiornamento

3. **Gestione Sicura delle Chiavi**: 
   - Le chiavi di crittografia vengono generate e memorizzate in modo sicuro nel tuo ambiente CI/CD
   - Le chiavi private non toccano mai i server di Capgo
   - Ogni versione dell'app può utilizzare chiavi di crittografia uniche
   - Supporto per la rotazione delle chiavi per una maggiore sicurezza

Scopri di più sul nostro sistema di crittografia nella nostra guida dettagliata: [End-to-End Encryption in Capgo Live Updates](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Processo di Sicurezza degli Aggiornamenti

1. **Crittografia Pre-Upload**:
   - Gli aggiornamenti vengono crittografati nella tua pipeline CI/CD
   - Ogni file viene crittografato individualmente
   - Anche i metadati sono crittografati per una privacy completa

2. **Archiviazione Sicura**:
   - I pacchetti crittografati sono memorizzati sul CDN globale di Capgo
   - Nessun dato in chiaro tocca mai i nostri server
   - Anche in caso di violazione del server, i dati rimangono sicuri

3. **Consegna Sicura**:
   - Gli aggiornamenti vengono consegnati attraverso canali crittografati
   - Ogni istanza dell'app verifica l'integrità della crittografia
   - Meccanismi di ripetizione automatica per decrittografia fallita

4. **Sicurezza Lato Client**:
   - Gli aggiornamenti vengono verificati prima dell'installazione
   - La decrittografia fallita attiva il rollback automatico
   - Archiviazione sicura delle chiavi nell'archivio protetto dell'app

Questo approccio completo alla sicurezza garantisce che gli aggiornamenti della tua app rimangano protetti contro:
- Attacchi man-in-the-middle
- Violazioni lato server
- Modifiche non autorizzate
- Attacchi replay
- Manomissione dei contenuti

## Ciclo di Vita dell'Aggiornamento

Il processo di aggiornamento di Capgo è progettato per essere automatico di default. Ecco come funziona il processo automatico:

### 1. Controllo Automatico degli Aggiornamenti

Il plugin controlla automaticamente gli aggiornamenti in queste situazioni:
- All'avvio dell'app

Questo comportamento è controllato dall'impostazione `autoUpdate`:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
Puoi anche controllare manualmente con `getLatest()`

### 2. Download Automatico

Quando viene rilevata una nuova versione, se `autoUpdate` è abilitato:
1. Il download inizia automaticamente
2. Il progresso viene tracciato internamente
3. I download falliti vengono ritentati automaticamente ad ogni apertura dell'app
4. I download completati vengono memorizzati nell'archivio dell'app

Puoi monitorare questo processo attraverso gli eventi:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3. Installazione Automatica

Il momento dell'installazione dipende dalla tua configurazione:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

L'installazione avviene:
- Immediatamente se `directUpdate` è true
- Al prossimo passaggio in background dell'app se `directUpdate` è false
- Rollback automatico se l'installazione fallisce

Il plugin gestisce anche automaticamente l'archiviazione:
- Rimuove gli aggiornamenti falliti se `autoDeleteFailed` è true
- Pulisce le vecchie versioni se `autoDeletePrevious` è true

### Ritardo degli Aggiornamenti

Puoi controllare quando gli aggiornamenti vengono installati utilizzando le condizioni di ritardo:

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

Condizioni di ritardo disponibili:
- **background**: Installa quando l'app va in background
- **date**: Installa dopo una data/ora specifica
- **nativeVersion**: Installa dopo il prossimo aggiornamento nativo
- **kill**: Installa dopo che l'app viene terminata

Questo è utile per:
- Programmare aggiornamenti durante le ore non di punta
- Coordinare gli aggiornamenti con l'attività dell'utente
- Garantire un'esperienza di aggiornamento fluida
- Prevenire interruzioni durante attività critiche

### Stati degli Aggiornamenti

Durante il processo automatico, i pacchetti passano attraverso questi stati:
1. **downloading**: Download in corso
2. **pending**: Download completato, in attesa di installazione
3. **success**: Aggiornamento installato e attivo
4. **error**: Aggiornamento fallito (attiva il rollback automatico)

## Conformità agli Store

### Apple App Store ✅

Gli aggiornamenti in tempo reale sono completamente conformi alle politiche dell'Apple App Store. Come indicato nell'Accordo di Licenza del Programma per Sviluppatori Apple:

> "Il codice interpretato può essere scaricato in un'Applicazione solo se tale codice: (a) non modifica lo scopo principale dell'Applicazione fornendo funzionalità che sono incompatibili con lo scopo previsto e pubblicizzato dell'Applicazione come presentata all'App Store, (b) non crea un negozio o una vetrina per altro codice o applicazioni, e (c) non aggira la firma, il sandbox o altre funzioni di sicurezza del sistema operativo."

Gli aggiornamenti Capgo modificano solo il livello web rispettando tutti i limiti di sicurezza della piattaforma.

### Google Play Store ✅

Gli aggiornamenti in tempo reale sono conformi alle politiche di Google Play. La politica su Dispositivi e Abuso di Rete afferma specificamente:

> "Questa restrizione non si applica al codice che viene eseguito in una macchina virtuale o in un interprete che fornisce accesso indiretto alle API Android (come JavaScript in una webview o browser)."

Poiché Capgo aggiorna solo il contenuto WebView, rientra in queste linee guida consentite.

## Migliori Pratiche

1. **Rollout Graduali**: Distribuisci gli aggiornamenti gradualmente
2. **Controllo Versioni**: Tieni traccia di tutte le versioni distribuite
3. **Supporto Rollback**: Recupero rapido dai problemi
4. **Aggiornamenti Delta**: Scarica solo i file modificati

## Quando Usare gli Aggiornamenti in Tempo Reale

Perfetto per:
- Correzioni di bug
- Miglioramenti UI
- Aggiornamenti di contenuto
- Toggle di funzionalità

Non adatto per:
- Modifiche al codice nativo
- Aggiornamenti di versione maggiore
- Patch di sicurezza che richiedono modifiche native
