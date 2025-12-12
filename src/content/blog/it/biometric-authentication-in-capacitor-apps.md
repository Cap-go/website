---
slug: biometric-authentication-in-capacitor-apps
title: Autenticazione Biometrica nelle App Capacitor
description: >-
  Scopri come implementare l'autenticazione biometrica sicura nelle app
  Capacitor per migliorare l'esperienza utente e proteggere i dati sensibili.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-14T05:13:56.152Z
updated_at: 2025-12-12T10:43:53.000Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/68240bea59ff61289922287e-1747199824736.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  biometric authentication, Capacitor, mobile security, fingerprint, facial
  recognition, app development
tag: 'Development, Mobile, Security'
published: true
locale: it
next_blog: ''
---
[L'autenticazione biometrica](https://capgo.app/plugins/capacitor-native-biometric/) permette agli utenti di accedere alle app in modo sicuro utilizzando l'impronta digitale, il viso o altri tratti biologici invece delle password. Per gli sviluppatori che lavorano con [Capacitor](https://capacitorjs.com/), l'implementazione di questa funzionalità è semplice e funziona sia su iOS che su Android. Ecco un breve riepilogo:

-   **Perché utilizzare l'autenticazione biometrica?**
    
    -   È più sicura delle password.
    -   Migliora l'esperienza utente rendendo l'accesso più veloce.
    -   Soddisfa gli standard di sicurezza per i dati sensibili.
-   **Metodi supportati:**
    
    -   Impronta digitale: Veloce e comune.
    -   Riconoscimento facciale: Opzione senza utilizzo delle mani.
    -   Scansione dell'iride: Casi d'uso ad alta sicurezza (dispositivi limitati).
    -   Riconoscimento vocale: Orientato all'accessibilità (supporto limitato).
-   **Strumenti chiave necessari:**
    
    -   Capacitor 3.0+.
-   **Punti principali della configurazione:**
    
    -   Aggiungere i permessi ad AndroidManifest e Info.plist.
    -   Utilizzare Keychain (iOS) o Keystore (Android) per l'archiviazione sicura.
    -   Testare accuratamente per compatibilità e opzioni di fallback.

### Confronto rapido dei Plugin

| Nome Plugin | Versione Capacitor | Funzionalità | Ideale per |
| --- | --- | --- | --- |
| `@aparajita/capacitor-biometric-auth` | Capacitor 7 | Biometria nativa, credenziali dispositivo | Nuovi progetti che utilizzano Capacitor 7 |
| `capacitor-native-biometric` | Capacitor 3, 4 | Archiviazione credenziali sicura, Keychain/Keystore | Gestione delle credenziali |
| Tutte le versioni | Supporto biometrico e credenziali dispositivo | Opzioni di autenticazione flessibili |

[L'autenticazione biometrica nelle app Capacitor](https://capgo.app/plugins/capacitor-native-biometric/) è un modo sicuro e user-friendly per proteggere i dati sensibili. L'articolo completo descrive i passaggi di configurazione, esempi di codice, strategie di test e standard di sicurezza.

## Autenticazione biometrica Ionic (FaceID / Impronta digitale)


## Requisiti di configurazione

Per abilitare l'autenticazione biometrica nella tua [app Capacitor](https://capgo.app/plugins/ivs-player/), dovrai configurare alcuni strumenti, dipendenze e impostazioni specifiche per piattaforma. Di seguito, troverai i requisiti di configurazione passo dopo passo per le piattaforme Android e iOS.

### Strumenti e dipendenze necessari

Prima di immergersi nell'implementazione, assicurati che i seguenti strumenti e dipendenze siano pronti:

| Componente | Versione minima | Scopo |
| --- | --- | --- |
| **Capacitor** | 3.0 o superiore | Framework core |
| **[Node.js](https://nodejs.org/en)** | LTS più recente | Gestione pacchetti |
| **[Xcode](https://developer.apple.com/xcode/)** | Ultima versione | Sviluppo iOS |
| **[Android Studio](https://developer.android.com/studio)** | Ultima versione | Sviluppo Android |
| **Dispositivi fisici** | iOS 13+ / Android API 23+ | Test funzionalità biometriche |

Scegli un [plugin biometrico](https://capgo.app/plugins/capacitor-native-biometric/) in base alla tua versione di Capacitor:

-   **@aparajita/capacitor-biometric-auth** per Capacitor 7
-   **capacitor-native-biometric** per Capacitor 3 e 4

### Passi di configurazione Android 

1.  **Configurazione Manifest**
    
    Aggiungi i seguenti permessi al tuo file `AndroidManifest.xml`:
    
    ```xml
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <!-- For Android 9 (API 28) or lower -->
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    ```
    
2.  **Configurazione Gradle**
    
    Aggiorna il file `build.gradle` della tua app per includere le dipendenze biometriche necessarie:
    
    ```kotlin
    dependencies {
        implementation "androidx.biometric:biometric:1.1.0"
    }
    ```

### Passi di configurazione iOS

Per iOS, dovrai seguire questi passaggi per configurare l'autenticazione biometrica:

1.  **Configurazione Info.plist**
    
    Aggiungi la descrizione d'uso richiesta al tuo file `Info.plist`:
    
    ```xml
    <key>NSFaceIDUsageDescription</key>
    <string>Authentication required for secure access</string>
    ```
    
2.  **Configurazione Keychain**
    
    Abilita le capacità Keychain in Xcode:
    
    -   Apri le impostazioni del progetto.
    -   Vai alla scheda **Signing & Capabilities**.
    -   Aggiungi la capacità **Keychain Sharing**.
    -   Configura i gruppi di accesso se necessario.
3.  **Politiche di autenticazione**
    
    Configura le politiche di autenticazione locale per gestire:
    
    -   Tentativi di autenticazione falliti
    -   Fallback ai codici di accesso del dispositivo
    -   Controlli di disponibilità biometrica
    
    Per una migliore sicurezza, usa il Keychain iOS per memorizzare dati sensibili. Questo assicura la compatibilità sia con Touch ID che Face ID proteggendo al contempo le credenziali utente.

[Continues with "Code Implementation" section...]

Capgo semplifica gli aggiornamenti biometrici. Configuralo in questo modo:

```typescript
import { Biometrics } from '@capgo/capacitor-native-biometric';

async function setupBiometricAuth() {
  try {
    const { isAvailable } = await Biometrics.isBiometricsAvailable();

    if (!isAvailable) {
      return {
        success: false,
        message: "Biometric authentication not available"
      };
    }

    const result = await Biometrics.authenticate({
      reason: "Access your secure data",
      title: "Verify Identity",
      subtitle: "Use biometrics to authenticate",
      cancelTitle: "Use Password Instead"
    });

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

Ecco perché Capgo è un ottimo strumento per gestire gli aggiornamenti:

-   **Distribuzione Istantanea**: Distribuisci correzioni di sicurezza critiche e nuove funzionalità senza ritardi.
-   **Rilasci Graduali**: Testa gli aggiornamenti con gruppi selezionati di utenti prima di distribuirli a tutti.
-   **Controllo Versioni**: Tieni traccia delle diverse versioni di autenticazione per una migliore gestione.
-   **Ripristino di Emergenza**: Torna rapidamente a una versione precedente in caso di problemi.

### Aggiornamenti API

Mantenere aggiornata la tua API biometrica è vitale per la sicurezza e la funzionalità. Mantieniti proattivo con gli aggiornamenti seguendo queste linee guida:

| Tipo di Aggiornamento | Metodo di Monitoraggio | Tempistica di Implementazione |
| --- | --- | --- |
| Patch di Sicurezza | Avvisi Repository Plugin | 24 ore |
| Aggiornamenti Funzionalità | Documentazione Piattaforma | 1 settimana |
| Modifiche Incompatibili | Note di Rilascio | 2-4 settimane |
| Aggiornamenti Policy Store | Portale Sviluppatori | Prima dell'invio |

Concentrati su queste aree:

-   **Modifiche Piattaforma**: Monitora gli aggiornamenti delle API LocalAuthentication di iOS e BiometricPrompt di Android.
-   **Standard di Sicurezza**: Mantieniti allineato con gli ultimi requisiti di sicurezza biometrica.
-   **Linee Guida Store**: Assicura la conformità con le policy di Apple App Store e Google Play per evitare problemi di invio.

## Conclusione

### Punti Chiave

Aggiungere l'autenticazione biometrica alla tua app Capacitor richiede di bilanciare sicurezza, prestazioni ed esperienza utente. Ecco una rapida panoramica degli elementi principali da tenere a mente:

| **Componente** | **Focus Implementazione** | **Considerazioni Chiave** |
| --- | --- | --- |
| **Standard di Sicurezza** | Archiviazione nativa (Keychain/Keystore) | Crittografia end-to-end, protezione credenziali |
| **Selezione Plugin** | Compatibilità ultima versione | Supporto per tipi biometrici multipli |
| **Gestione Aggiornamenti** | Ciclo di manutenzione regolare | Distribuzione rapida patch di sicurezza |
| **Esperienza Utente** | Opzioni di autenticazione alternative | Prompt di autenticazione chiari e user-friendly |

Questi componenti sono la tua roadmap per un'integrazione di successo.

### Passi per Implementare l'Autenticazione Biometrica

Segui questi passi per integrare l'autenticazione biometrica nella tua app:

-   **Integrazione Plugin**  
    Inizia scegliendo un plugin biometrico compatibile con la tua versione di Capacitor. Assicurati che i tuoi file di configurazione - come `AndroidManifest.xml` e `Info.plist` - siano configurati correttamente. Per l'archiviazione sicura delle credenziali, affidati a soluzioni native come Keychain o Keystore.
    
-   **Configurazione Sicurezza**  
    Proteggi i dati degli utenti abilitando la crittografia end-to-end per tutte le trasmissioni di credenziali. Dove necessario, includi [l'autenticazione multi-fattore](https://capgo.app/docs/webapp/mfa/) per aggiungere un ulteriore livello di sicurezza. Pianifica una gestione degli errori robusta e opzioni alternative per mantenere la funzionalità in caso di guasti.
    
-   **Manutenzione Continua**  
    Mantieni la tua app sicura impostando una pipeline regolare di aggiornamenti per le patch di sicurezza. Resta aggiornato sugli aggiornamenti dei plugin e monitora gli avvisi di sicurezza. Strumenti come Capgo possono semplificare questo processo abilitando aggiornamenti istantanei. Capgo vanta un impressionante tasso di aggiornamento del 95% degli utenti entro 24 ore, rendendolo un'aggiunta preziosa al tuo toolkit [\[2\]](https://capgo.app).
    

> "Capgo è uno strumento indispensabile per gli sviluppatori che vogliono essere più produttivi. Evitare la revisione per le correzioni di bug è prezioso." - Bessie Cooper [\[2\]](https://capgo.app)

## FAQ

:::faq
### Quali sono le differenze tra i plugin biometrici per Capacitor e come posso selezionare il migliore per la mia app?

Quando scegli un plugin biometrico per la tua app Capacitor, è cruciale allineare la scelta con i requisiti specifici del tuo progetto. Considera fattori come la **compatibilità della piattaforma** (se hai bisogno di supporto per iOS, Android o entrambi), quanto è semplice il processo di integrazione e se il plugin supporta metodi biometrici avanzati come **Face ID** o **autenticazione tramite impronta digitale**.

Sebbene questa guida si concentri sull'implementazione dell'autenticazione biometrica nelle [app Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/), strumenti come **Capgo** possono giocare un ruolo prezioso. Ti permettono di distribuire aggiornamenti in tempo reale alla tua app senza bisogno di approvazioni degli app store. Questo significa che la tua app può rimanere aggiornata con le ultime funzionalità di sicurezza, inclusi gli aggiornamenti biometrici, rimanendo conforme agli standard sia Apple che Android.
:::

:::faq
### Come posso assicurarmi che l'autenticazione biometrica nella mia app Capacitor soddisfi gli standard di sicurezza e le linee guida degli app store?

Per assicurarti che l'autenticazione biometrica nella tua app Capacitor soddisfi gli standard di sicurezza attuali e le regole degli app store, attieniti a queste pratiche chiave:

-   **Scegli plugin affidabili**: Usa un plugin di autenticazione biometrica affidabile come `@capacitor/biometrics` per garantire che la tua app sia sicura e funzioni perfettamente su tutti i dispositivi.
-   **Segui le regole della piattaforma**: Rispetta le linee guida Apple e Android, incluso ottenere il consenso dell'utente, utilizzare l'archiviazione sicura e offrire opzioni di backup come PIN o password.
-   **Mantieni aggiornate le dipendenze**: Aggiorna regolarmente la tua app e le sue librerie per correggere vulnerabilità e rimanere allineato con gli standard in evoluzione.

Utilizzare un servizio di aggiornamento live come **Capgo** può rendere questo processo più fluido. Ti permette di distribuire aggiornamenti di sicurezza o miglioramenti alla tua app istantaneamente, evitando i ritardi di approvazione degli app store. Questo mantiene la tua app sicura, conforme e aggiornata con le policy Apple e Android.
:::

:::faq
### Quali sfide potrebbero affrontare gli sviluppatori quando integrano l'autenticazione biometrica nelle app Capacitor e come possono superarle?

L'implementazione dell'autenticazione biometrica nelle app Capacitor presenta le sue sfide. Queste possono includere garantire la compatibilità tra dispositivi, gestire efficacemente i permessi degli utenti e gestire in modo sicuro i dati sensibili. Ecco come puoi affrontare questi problemi:

-   **Compatibilità dispositivi**: Per supportare le funzionalità biometriche sia su Android che iOS, considera l'utilizzo di plugin come `@capacitor-fingerprint-auth`. Questi strumenti aiutano a colmare il divario tra le piattaforme, assicurando che la tua app funzioni perfettamente su una varietà di dispositivi.
    
-   **Permessi utente**: È importante spiegare chiaramente perché la tua app necessita di accesso biometrico. Fornisci agli utenti informazioni trasparenti e progetta la tua app per gestire con eleganza le situazioni in cui gli utenti scelgono di non concedere i permessi.
    
-   **Sicurezza dei dati**: Proteggere i dati di autenticazione è fondamentale. Segui le [migliori pratiche di crittografia](https://capgo.app/docs/cli/migrations/encryption/) e attieniti alle linee guida di sicurezza fornite da ciascuna piattaforma per garantire che le informazioni sensibili rimangano al sicuro.
    

Per apportare aggiornamenti o correggere problemi relativi alle funzionalità biometriche senza il fastidio delle approvazioni degli app store, puoi utilizzare strumenti come Capgo. Questo permette aggiornamenti in tempo reale, consentendoti di affrontare bug o migliorare la funzionalità rapidamente rimanendo conforme alle policy Apple e Android.
:::
