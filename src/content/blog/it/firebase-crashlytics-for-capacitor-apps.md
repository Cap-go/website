---
slug: firebase-crashlytics-for-capacitor-apps
title: App Firebase Crashlytics per Capacitor
description: >-
  Scopri come integrare il reporting degli arresti anomali in tempo reale nelle
  tue app mobili con una guida passo dopo passo sulla configurazione di
  Crashlytics sia per iOS che per Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-04-21T03:56:15.479Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: Sviluppo Mobile
keywords: >-
  Firebase, Crashlytics, mobile apps, Capacitor, app development, crash
  reporting, error tracking
tag: 'Development, Mobile, Updates'
published: true
locale: it
next_blog: ''
---
**[Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)** ti aiuta a monitorare i crash delle app in tempo reale, fornendo report dettagliati per risolvere rapidamente i problemi. Si integra perfettamente con [Capacitor](https://capacitorjs.com/) sia per le app iOS che Android. Ecco cosa devi sapere:

-   **Perché Usare Crashlytics?**
    
    -   Ricevi **avvisi di crash in tempo reale**.
    -   Analizza report dettagliati dei crash con **raggruppamento automatico dei problemi**.
    -   Monitora gli errori critici per mantenere le app stabili.
-   **Requisiti di Setup:**
    
    -   Installa **[Node.js](https://nodejs.org/en) (v16+)**, **Capacitor (v4+)**, e strumenti come **[Xcode](https://developer.apple.com/xcode/) 14+** e **[Android Studio](https://developer.android.com/studio) Electric Eel**.
    -   Scarica i file di configurazione [Firebase](https://firebase.google.com/) (`GoogleService-Info.plist` per iOS, `google-services.json` per Android).
    -   Aggiorna i file specifici per piattaforma come `Podfile` (iOS) e `build.gradle` (Android).
-   **Passaggi Chiave:**
    
    -   Installa Crashlytics:
        
        ```bash
        npm install @capacitor-firebase/crashlytics && npx cap sync
        ```
        
    -   Inizializza Crashlytics nella tua app:
        
        ```typescript
        import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
        await FirebaseCrashlytics.initialize();
        ```
        
-   **Testa Il Tuo Setup:**
    
    -   Attiva un crash di test:
        
        ```typescript
        await FirebaseCrashlytics.crash();
        ```
        
-   **Consiglio Extra:** Combina Crashlytics con **[Capgo](https://capgo.app/)** per aggiornamenti istantanei senza ritardi degli app store.
    

Questa guida assicura che la tua app sia priva di crash e user-friendly. Inizia configurando Firebase Crashlytics oggi!

## Guida Android 2021: [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) - crash personalizzato ...

![Firebase Crashlytics](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607f.jpg)

<iframe src="https://www.youtube.com/embed/JxVYfZprK0g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Requisiti di Setup

Prima di iniziare, assicurati di aver completato i seguenti passaggi:

### Software e Account Necessari

Dovrai installare quanto segue:

-   **Node.js** (v16 o superiore) e **Capacitor** (v4 o superiore)
-   Un **account Firebase** con un progetto attivo
-   **Xcode 14+** per lo sviluppo iOS
-   **Android Studio Electric Eel** o una versione più recente per lo sviluppo Android
-   L'ultima versione di **[CocoaPods](https://cocoapods.org/)** (richiesto per iOS)

### File di Configurazione per Piattaforma

**Per iOS:**

-   Scarica il file `GoogleService-Info.plist` dalla Console Firebase.
-   Aggiorna il tuo `Podfile` per includere le dipendenze di Crashlytics.
-   Aggiungi le chiavi privacy necessarie al tuo file `Info.plist`.

**Per Android:**

-   Ottieni il file `google-services.json` dalla Console Firebase.
-   Apporta modifiche ai file `build.gradle` sia a livello di progetto che di app.
-   Aggiorna l'`AndroidManifest.xml` per includere i permessi richiesti.

### Setup della Console [Firebase](https://firebase.google.com/)

![Firebase](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83.jpg)

Configura Firebase e abilita Crashlytics attraverso questi passaggi:

1.  **Crea un progetto Firebase** e abilita Crashlytics.
    
2.  **Registra le tue app** nella Console Firebase:
    
    -   Usa l'**ID bundle** per iOS e il **nome package** per Android.
    -   Scarica i file di configurazione: `GoogleService-Info.plist` (iOS) e `google-services.json` (Android).
3.  **Integra gli SDK Firebase** nella tua app aggiungendo queste dipendenze:
    
    **Per Android (build.gradle a livello app):**
    
    ```kotlin
    dependencies {
        implementation platform('com.google.firebase:firebase-bom:32.0.0')
        implementation 'com.google.firebase:firebase-crashlytics'
        implementation 'com.google.firebase:firebase-analytics'
    }
    ```
    
    **Per iOS (`Podfile`):**
    
    ```ruby
    pod 'Firebase/Crashlytics'
    pod 'Firebase/Analytics'
    ```
    

Una volta completati questi passaggi, sei pronto per passare alla sezione Installazione Plugin.

[Continue with the rest of the text...]

### Riepilogo dei passaggi di configurazione

Hai completato tre passaggi chiave per iniziare:

-   Creato un progetto Firebase e registrato le tue app iOS/Android.
-   Installato e configurato il plugin Crashlytics.
-   Aggiornato i necessari file delle piattaforme iOS e Android.

### Perché integrare questi strumenti?

L'abbinamento di Firebase Crashlytics con Capgo ti offre un potente sistema per il monitoraggio degli errori e la [gestione degli aggiornamenti](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Ecco cosa offre questa combinazione:

-   **Correzioni rapide**: Implementa aggiornamenti istantanei e ripristina le modifiche con un solo clic.
-   **Distribuzioni affidabili**: Assicurati che gli aggiornamenti siano ampiamente adottati e distribuiti agli utenti senza problemi.

### Quali sono i prossimi passi?

1.  Attiva l'analisi dettagliata dei crash nella Console Firebase.
2.  Aggiungi Capgo alla tua pipeline CI/CD per aggiornamenti ottimizzati.
3.  Usa i [canali Capgo](https://capgo.app/docs/webapp/channels/) per testare e rilasciare le correzioni passo dopo passo.

Con Crashlytics e Capgo installati, sei pronto per mantenere la tua app funzionante senza problemi e migliorarla nel tempo.
