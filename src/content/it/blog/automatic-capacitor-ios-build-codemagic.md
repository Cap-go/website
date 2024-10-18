---
slug: automatic-capacitor-ios-build-codemagic
title: Compilazione automatica di Capacitor iOS con Codemagic
description: >-
  Come Configurare una Pipeline CI/CD per la tua App iOS Ionic con Codemagic in
  5 Minuti (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Illustrazione di Testflight da Codemagic
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-android-build-codemagic
---

Ecco la traduzione in italiano:

## Consegna Continua per iOS usando Codemagic

## Prerequisiti

Prima di continuare con il tutorial...

- Iscrizione al programma per sviluppatori iOS
- Voglia di leggere 😆...

## Importante riguardo al prezzo

![Prezzo Azione Codemagic](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Il servizio è 'gratuito' fino a 500 minuti macOS M1 al mese, a seconda della macchina scelta.
Useremo una macchina **_macOS M1_**, puoi vedere nello screenshot il suo prezzo e i limiti (prezzi aggiornati alla creazione del tutorial, potrebbero subire modifiche in futuro)

🔴 **_Una volta avvisati dei requisiti e dei prezzi, se ti va, continuiamo..._**

> **_📣_ Nel post assumiamo di avere già creato l'app su iTunes Connect e di avere i certificati dell'ecosistema Apple, tutto sarà configurato da Codemagic!**

## Andiamo al sodo 🧑🏽‍💻

**Passi da seguire nel post**

1. _Usare l'API di App Store Connect con Codemagic_
2. _Requisiti_
3. _Creare una chiave API di App Store Connect_
4. _Usare una chiave API di App Store Connect_ 
5. _Copiare i file di Fastlane_
6. _Configurare Codemagic_

## 1. Usare l'API di App Store Connect con Codemagic

> Da febbraio 2021, l'autenticazione a due fattori o la verifica in due passaggi è richiesta per tutti gli utenti per accedere ad App Store Connect. Questo ulteriore livello di sicurezza per il tuo ID Apple aiuta a garantire che solo tu possa accedere al tuo account.
> Da [Supporto Apple](https://developer.apple.com/support/authentication/)

> Iniziare con match richiede di revocare i certificati esistenti. Ma non preoccuparti, avrai direttamente quello nuovo.

### Requisiti

Per poter utilizzare l'API di App Store Connect, Codemagic ha bisogno di **tre** cose:

1. ID emittente
2. ID chiave  
3. File della chiave o contenuto della chiave

### Creare una chiave API di App Store Connect

Per generare le chiavi, devi avere i permessi di Amministratore in App Store Connect. Se non hai quel permesso, puoi indirizzare la persona pertinente a questo articolo e seguire le seguenti istruzioni.

1 — Accedi a [App Store Connect](https://appstoreconnect.apple.com/)

2 — Seleziona [Utenti e Accessi](https://appstoreconnect.apple.com/access/users/)

![Accesso utenti App Store Connect](/select_user_access.webp)

3 — Seleziona la scheda Chiavi API

![Chiavi API App Store Connect](/user_access_keys.webp)

4 — Clicca su Genera Chiave API o sul pulsante Aggiungi (+)

![Crea chiavi API App Store Connect](/user_access.webp)

5 — Inserisci il nome per la chiave e seleziona un livello di accesso. Consigliamo di scegliere i diritti di accesso `App Manager`, leggi di più sui permessi dei ruoli del Programma Sviluppatori Apple [qui](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![Crea nome chiavi API App Store Connect](/gen_key.webp)

6 — Clicca su Genera

> **L'accesso di una chiave API non può essere limitato a specifiche app**

Il nome della nuova chiave, l'ID della chiave, un link per il download e altre informazioni appaiono sulla pagina

![Scarica chiavi App Store Connect](/download_key.webp)

Prendi tutte e tre le informazioni necessarie qui:
- ID Emittente  
- ID Chiave
- Clicca su "Scarica Chiave API" per scaricare la tua chiave privata API. Il link per il download appare solo se la chiave privata non è stata ancora scaricata. Apple non conserva una copia della chiave privata. Quindi, puoi scaricarla solo una volta.

> _🔴_ Conserva la tua chiave privata in un luogo sicuro. Non dovresti mai condividere le tue chiavi, conservarle in un repository di codice o includerle nel codice lato client.

### Aggiungere la chiave API di App Store Connect a Codemagic

1. Apri le impostazioni del tuo Team Codemagic,
![Seleziona integrazioni Team](/select_team.webp)
![Apri team](/open_team.webp)
Seleziona identità di firma del codice
![Seleziona identità di firma del codice](/select_code_signing_identities.webp)
E carica il certificato
![Carica il certificato](/upload_certificate.webp)

2. Clicca sul pulsante **Aggiungi chiave**
3. Inserisci il `Nome della chiave API di App Store Connect`. Questo è un nome leggibile per la chiave che verrà usato per riferirsi alla chiave più tardi nelle impostazioni dell'applicazione
4. Inserisci i valori `ID Emittente` e `ID Chiave`
5. Clicca su **Scegli unEcco la traduzione in italiano del testo fornito:

chiave API di App Store Connect scaricata in precedenza
6. Fai clic su **Salva**

_Ora possiamo gestire Codemagic con la chiave API di App Store Connect, ottimo!_


## 2. Crea certificati e profili di provisioning


#### Certificati

Apri XCode e vai su **Impostazioni** > **Account** > **ID Apple** > **Team** e seleziona il tuo team

![Identità di firma del codice](/code_signing_identities.webp)

Fai clic su **Gestisci certificati** > **+** e seleziona **Distribuzione Apple**

![Distribuzione Apple](/apple_distribution.webp)

Quindi puoi creare un nuovo certificato

Poi devi andare nel portachiavi per scaricare il certificato come file `p12`

Per farlo, devi andare nel portachiavi, passare al portachiavi **login** e poi alla scheda **I miei certificati**

![I miei certificati](/my_certificates.webp)

Quindi puoi selezionare il certificato che vuoi scaricare (Cerca per la data del certificato)

E poi fai clic con il tasto destro sul certificato e seleziona **Esporta**

Scegli il formato file **Scambio di informazioni personali (.p12)**

Questo scaricherà il certificato come file `p12`

#### Profili di provisioning

Apri [Apple Developer](https://developer.apple.com/account/resources/profiles/list) e seleziona il team corretto

Quindi crea un nuovo profilo, facendo clic su **+** 

![Crea un nuovo profilo](/create_new_profile.webp)

E seleziona **App Store Connect** 

![Seleziona App Store Connect](/select_app_store_connect.webp)

Poi devi selezionare l'app giusta, fai attenzione a non usare il carattere jolly altrimenti la firma fallirà

![Seleziona l'app giusta](/select_app.webp)

Seleziona il certificato giusto che hai creato prima (cerca la data di scadenza, dovrebbe essere lo stesso giorno e mese di oggi) e fai clic su **Continua**

![Seleziona il certificato giusto](/select_certificate.webp)

Infine inserisci il nome del profilo e fai clic su **Genera** 

> Il nome sarà usato per identificare il profilo in Codemagic

![Genera il profilo](/generate_profile.webp)

Puoi scaricare il profilo come file `mobileprovision`

![Scarica il profilo](/download_profile.webp)


### Aggiungere il certificato di firma del codice

Codemagic ti permette di caricare certificati di firma del codice come archivi PKCS#12 contenenti sia il certificato che la chiave privata necessaria per usarlo. Durante il caricamento, Codemagic ti chiederà di fornire la password del certificato (se il certificato è protetto da password) insieme a un **Nome di riferimento** univoco, che può poi essere usato nella configurazione `codemagic.yml` per recuperare il file specifico.

- Carica certificato
- Genera nuovo certificato
- Recupera dal Portale Sviluppatori

1. Apri le impostazioni del tuo Team Codemagic, vai su **impostazioni codemagic.yml** > **Identità di firma del codice**
2. Apri la scheda **Certificati iOS**
3. Carica il file del certificato facendo clic su **Scegli un file p12 o pem** o trascinandolo nel frame indicato
4. Inserisci la **Password del certificato** e scegli un **Nome di riferimento**
5. Fai clic su **Aggiungi certificato**

### Aggiungere il profilo di provisioning

Codemagic ti permette di caricare un profilo di provisioning da usare per l'applicazione o di recuperare un profilo dal Portale Sviluppatori Apple

Il tipo di profilo, il team, l'ID bundle e la data di scadenza vengono visualizzati per ogni profilo aggiunto alle Identità di firma del codice. Inoltre, Codemagic ti farà sapere se un certificato di firma del codice corrispondente è disponibile nelle Identità di firma del codice (un segno di spunta verde nel campo **Certificato**) o meno.

## 3. Configura Codemagic

**Configura i segreti di Codemagic**

Ti sei mai chiesto da dove vengono i valori dell'`ENV`? Beh, non è più un segreto - è dai segreti del tuo progetto 🤦


## **4. Configura il file di workflow di Codemagic**

Crea un file chiamato `codemagic.yml` alla radice del tuo progetto e aggiungi quanto segue

```yaml
workflows:
  ionic-capacitor-ios-workflow:
    name: Capacitor iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    integrations:
      app_store_connect: CodeMagic
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: YOUR_BUNDLE_IDENTIFIER
      vars:
        XCODE_WORKSPACE: ios/App/App.xcworkspace
        XCODE_SCHEME: App
        APP_STORE_APP_ID: YOUR_APP_STORE_APP_ID
      node: v20.14.0
      xcode: 15.4
      cocoapods: default
    triggering:
      events:
        - tag
      tag_patterns:
        - pattern: '*'
          include: true
    scripts:
      - name: Install dependencies
        script: |
          npm install
      - name: Cocoapods installation
        script: |
          cd ios/App && pod install
      - name: Update dependencies and copy web assets to native project
        script: |
          npm run build
          npx cap sync ios
      - name: Set up code signing settings on Xcode project
        script: |
          xcode-project use-profiles
      - name: Increment build number
        script: |
          cd $CM_BUILD_DIR/ios/App
          LATEST_BUILD_NUMBER=$(app-store-connect get-latest-app-store-build-number "$APP_ID")
          agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
      - name: Build ipa for distribution
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    publishing:
      email:
        recipients:
          - YOUR_EMAIL
        notify:
          success: true # To not receive a notification when a build succeeds
          failure: false # To not receive a notification when a build fails
      app_store_connect:
        auth: integration
        # Configuration related to TestFlight (optional)
        # Note: This action is performed during post-processing.
        submit_to_testflight: true
        # Configuration related to App Store (optional)
        # Note: This action is performed during post-processing.
        submit_to_app_store: false

```

Questo workflow dovrebbe essere attivato manualmente o dopo ogni _tag_ GitHub, se hai bisogno di automatizzare il tag, consulta prima [Build e rilascio automatico con le azioni GitHub](/blog/automatic-build-and-release-with-github-actions/)Quindi questo flusso di lavoro estrarrà le dipendenze NodeJS, le installerà e compilerà la tua app JavaScript

> Ogni volta che invii un nuovo tag, verrà creata una release in TestFlight

La tua App non deve necessariamente utilizzare Ionic, è obbligatorio solo Capacitor come base, può avere vecchi moduli Cordova, ma è preferibile utilizzare i plugin JS di Capacitor

## 5. Attiva il flusso di lavoro

**Attiva il flusso di lavoro**

Invia i nuovi commit al ramo `main` o `development` per attivare il flusso di lavoro

![Avviato con commit](/build_resultwebp)

Dopo alcuni minuti, la build dovrebbe essere disponibile nel tuo pannello di controllo di App Store Connect

![Dashboard di Testflight](/testflight_appwebp)

## Avvia manualmente

Puoi avviare il flusso di lavoro manualmente

Innanzitutto seleziona l'app che vuoi compilare, quindi fai clic su **Avvia nuova build**

![Seleziona app](/select_app_codemagicwebp)

Poi seleziona il ramo che vuoi compilare

![Seleziona ramo](/select_branchwebp)

E fai clic su **Avvia nuova build**

Quindi vai all'elenco delle build

![Elenco build](/build_listwebp)

E fai clic sulla build per vedere il risultato

![Risultato build](/build_resultwebp)

## Possibilità di distribuire dalla macchina locale

Sì, puoi farlo ed è molto semplice

Puoi usare Xcode per compilare e firmare la tua app, come sempre

### Ringraziamenti

Questo blog si basa sui seguenti articoli:
- [Continuous delivery for IOS using Codemagic and GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Codemagic Documentation](https://docsCodemagictools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://githubcom/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)