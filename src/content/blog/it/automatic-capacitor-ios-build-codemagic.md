---
slug: iOSのCapacitorアプリケーションをCodemagicで自動ビルド
title: CodemagicでのCapacitor iOSの自動ビルド
description: iOSアプリ開発のためのCIおよびCDを5分で設定 - CodemagicでIonicアプリを管理する方法（2024）
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic の TestFlight のイラスト
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: ja
next_blog: automatic-capacitor-android-build-codemagic
original_slug: creazione-automatica-capacitor-ios-codemagic
---
## Distribuzione Continua per iOS utilizzando Codemagic


## Prerequisiti

Prima di continuare con il tutorial...

-   Iscrizione al programma sviluppatori iOS.
-   Voglia di leggere 😆...

## Importante sul prezzo

![Price Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Il servizio è '_gratuito_' fino a 500 minuti macOS M1 / mese, a seconda della macchina scelta.  
Utilizzeremo una macchina **_macOS M1_**, puoi vedere nello screenshot il suo prezzo e i limiti (prezzi al momento della creazione del tutorial, potrebbero subire modifiche in futuro)

🔴 **_Una volta avvertiti dei requisiti e dei prezzi, se vuoi, continuiamo..._**

> **_📣_ Nel post assumiamo di avere l'app creata in iTunes connect, di avere i certificati dell'ecosistema Apple, tutto sarà configurato da Codemagic!**

## Iniziamo 🤿

**Passi da seguire nel post**

1.  _Utilizzo dell'API App Store Connect con Codemagic_
2.  _Requisiti_
3.  _Creazione di una chiave API App Store Connect_
4.  _Utilizzo di una chiave API App Store Connect_
5.  _Copia dei file Fastline_
6.  _Configurazione di Codemagic_

## 1\. Utilizzo dell'API App Store Connect con Codemagic

> Da febbraio 2021, l'autenticazione a due fattori o la verifica in due passaggi è richiesta per tutti gli utenti per accedere ad App Store Connect. Questo livello extra di sicurezza per il tuo ID Apple aiuta a garantire che tu sia l'unica persona che può accedere al tuo account.  
> Da [Apple Support](https://developer.apple.com/support/authentication/)

> Iniziare con match richiede di revocare i tuoi certificati esistenti. Ma non preoccuparti, avrai direttamente quello nuovo.


### Requisiti

Per poter utilizzare l'API App Store Connect, Codemagic necessita di **tre** elementi.

1.  ID Emittente.
2.  ID Chiave.
3.  File chiave o contenuto chiave.

### Creazione di una chiave API App Store Connect

Per generare le chiavi, devi avere i permessi di Admin in App Store Connect. Se non hai quel permesso, puoi indirizzare la persona pertinente a questo articolo e seguire le seguenti istruzioni.

1. — Accedi a [App Store Connect](https://appstoreconnect.apple.com/).

2. — Seleziona [Users and Access](https://appstoreconnect.apple.com/access/users/).

![App Store Connect user access](/select_user_access.webp)

3. — Seleziona la scheda API Keys.

![App Store Connect API Keys](/user_access_keys.webp)

4. — Clicca su Generate API Key o sul pulsante Add (+).

![App Store Connect API keys create](/user_access.webp)

5. — Inserisci il nome per la chiave e seleziona un livello di accesso. Raccomandiamo di scegliere i diritti di accesso `App Manager`, leggi di più sui permessi dei ruoli del Programma Sviluppatori Apple [qui](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![App Store Connect API keys create name](/gen_key.webp)

6. — Clicca su Generate.

> **L'accesso di una chiave API non può essere limitato a specifiche app.**

Il nome della nuova chiave, l'ID chiave, un link per il download e altre informazioni appaiono sulla pagina.

![App Store Connect download keys](/download_key.webp)

Prendi tutte e tre le informazioni necessarie qui:
<1> ID Emittente.  
<2> ID Chiave.  
<3> Clicca su "Download API Key" per scaricare la tua chiave privata API. Il link per il download appare solo se la chiave privata non è stata ancora scaricata. Apple non conserva una copia della chiave privata. Quindi, puoi scaricarla solo una volta.

> _🔴_ Conserva la tua chiave privata in un luogo sicuro. Non dovresti mai condividere le tue chiavi, conservare le chiavi in un repository di codice o includere le chiavi nel codice lato client.

### Aggiunta della chiave API App Store Connect a Codemagic

1.  Apri le impostazioni del tuo Team Codemagic,
![Select Team integrations](/select_team.webp)
![Open team](/open_team.webp)
Seleziona code signing identities
![Select code signing identities](/select_code_signing_identities.webp)
E carica il certificato
![Upload the certificate](/upload_certificate.webp)

2.  Clicca sul pulsante **Add key**.
3.  Inserisci il `Nome della chiave API App Store Connect`. Questo è un nome leggibile per la chiave che verrà utilizzato per riferirsi alla chiave successivamente nelle impostazioni dell'applicazione.
4.  Inserisci i valori `Issuer ID` e `Key ID`.
5.  Clicca su **Choose a .p8 file** o trascina il file per caricare la chiave API App Store Connect scaricata in precedenza.
6.  Clicca su **Save**.

_Ora possiamo gestire Codemagic con la chiave API App Store Connect, ottimo!_


## 2\. Crea certificati e profili di provisioning


#### Certificati

Apri XCode e vai su **Settings** > **Accounts** > **Apple ID** > **Teams** e seleziona il tuo team.

![Code signing identities](/code_signing_identities.webp)

Clicca su **Manage certificates** > **+** e seleziona **Apple Distribution**.

![Apple Distribution](/apple_distribution.webp)

Quindi puoi creare un nuovo certificato.

Poi devi andare nel portachiavi per scaricare il certificato come file `.p12`.

Per farlo, devi andare nel portachiavi, passare al portachiavi **login** e poi alla scheda **My Certificates**.

![My Certificates](/my_certificates.webp)

Quindi puoi selezionare il certificato che vuoi scaricare. (Cerca per la data del certificato)

E poi fai clic destro sul certificato e seleziona **Export**.

Scegli il formato file **Personal Information Exchange (.p12)**.

Questo scaricherà il certificato come file `.p12`.

#### Profili di provisioning

Apri [Apple Developer](https://developer.apple.com/account/resources/profiles/list) e seleziona il team giusto.

Quindi crea un nuovo profilo, cliccando su **+** 

![Create a new profile](/create_new_profile.webp)

E seleziona **App Store Connect**. 

![Select App Store Connect](/select_app_store_connect.webp)

Quindi devi selezionare l'app giusta, fai attenzione non puoi usare wildcard altrimenti la firma fallirà.

![Select the right app](/select_app.webp)

Seleziona il certificato giusto che hai creato prima (cerca la data di scadenza, dovrebbe essere lo stesso giorno e mese di oggi) e clicca su **Continue**.

![Select the right certificate](/select_certificate.webp)

Infine inserisci il nome del profilo e clicca su **Generate**. 

> Il nome sarà usato per identificare il profilo in Codemagic.

![Generate the profile](/generate_profile.webp)

Puoi scaricare il profilo come file `.mobileprovision`.

![Download the profile](/download_profile.webp)


### Aggiunta del certificato di firma del codice

Codemagic ti permette di caricare certificati di firma del codice come archivi PKCS#12 contenenti sia il certificato che la chiave privata necessaria per utilizzarlo. Durante il caricamento, Codemagic ti chiederà di fornire la password del certificato (se il certificato è protetto da password) insieme a un **Nome di riferimento** univoco, che può essere poi utilizzato nella configurazione `codemagic.yaml` per recuperare il file specifico.

-   Carica certificato
-   Genera nuovo certificato
-   Recupera dal Developer Portal

1.  Apri le impostazioni del tuo Team Codemagic, vai su **codemagic.yaml settings** > **Code signing identities**.
2.  Apri la scheda **iOS certificates**.
3.  Carica il file del certificato cliccando su **Choose a .p12 or .pem file** o trascinandolo nel frame indicato.
4.  Inserisci la **Password del certificato** e scegli un **Nome di riferimento**.
5.  Clicca su **Add certificate**

### Aggiunta del profilo di provisioning

Codemagic ti permette di caricare un profilo di provisioning da utilizzare per l'applicazione o di recuperare un profilo dal Portal Developer Apple.

Il tipo di profilo, il team, l'ID bundle e la data di scadenza sono visualizzati per ogni profilo aggiunto alle Code signing identities. Inoltre, Codemagic ti farà sapere se è disponibile un certificato di firma del codice corrispondente nelle Code signing identities (un segno di spunta verde nel campo **Certificate**) o meno.

## 3\. Configura Codemagic

**Configura i segreti di Codemagic**

Ti sei mai chiesto da dove vengono i valori degli `ENV`? Beh, non è più un segreto - vengono dai segreti del tuo progetto. 🤦


## **4\. Configura il file di workflow Codemagic**

Crea un file chiamato `codemagic.yml` nella radice del tuo progetto e aggiungi quanto segue.

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

Questo workflow dovrebbe essere attivato manualmente o dopo ogni _tag_ GitHub, se hai bisogno di automatizzare il tag per favore, fai riferimento prima a [Build e release automatici con GitHub actions](/blog/automatic-build-and-release-with-github-actions/).

Quindi questo workflow estrarrà le tue dipendenze NodeJS, le installerà e compilerà la tua app JavaScript.

> Ogni volta che invii un nuovo tag, verrà costruita una release in TestFlight.

La tua App non deve necessariamente utilizzare Ionic, è obbligatoria solo la base Capacitor, può avere vecchi moduli Cordova, ma dovrebbero essere preferiti i plugin Capacitor JS.

## 5\. Attiva il workflow


**Attiva il workflow**

Pusha i nuovi commit nel branch `main` o `developement` per attivare il workflow.

![Started with commit](/build_result.webp)

Dopo alcuni minuti, la build dovrebbe essere disponibile nella tua dashboard App Store Connect.

![Testflight Dashboard](/testflight_app.webp)

## Avvia manualmente

Puoi avviare il workflow manualmente. 

Prima seleziona l'app che vuoi compilare, poi clicca su **Start new build**.

![Select app](/select_app_codemagic.webp)

Quindi seleziona il branch che vuoi compilare.

![Select branch](/select_branch.webp)

E clicca su **Start new build**.

Poi vai alla lista delle build

![Build list](/build_list.webp)

E clicca sulla build per vedere il risultato.

![Build result](/build_result.webp)

## Puoi deployare dalla macchina locale

Sì, puoi farlo, ed è molto semplice.

Puoi usare Xcode per compilare e firmare la tua app, come sempre.

### Grazie

Questo blog è basato sui seguenti articoli:
- [Continuous delivery for IOS using Codemagic and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Codemagic Documentation](https://docs.Codemagic.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
