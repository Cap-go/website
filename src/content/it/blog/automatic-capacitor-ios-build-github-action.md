---
slug: automatic-capacitor-ios-build-github-action
title: Compilazione Automatica di Capacitor iOS con GitHub Actions e Certificati
description: >-
  Come Impostare una Pipeline CI/CD per la tua Applicazione iOS Ionic con
  fastlane e GitHub Actions in 5 Minuti (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Illustrazione GitHub Action per Fastlane TestFlight
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-android-build-github-action
---

Ecco la traduzione del testo in italiano:

## Continuous Delivery per iOS utilizzando Fastlane e GitHub Actions e certificato

## Prerequisiti

Prima di continuare con il tutorial...

- Assicurati di avere Fastlane [installato](https://docsfastlanetools/) sulla tua macchina di sviluppo
- Iscrizione al programma per sviluppatori iOS
- Voglia di leggere 😆...

## Importante riguardo al prezzo

![Prezzo GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Il servizio è 'gratuito' fino al limite, a seconda della macchina scelta.
Utilizzeremo una macchina **_macOS_**, puoi vedere nello screenshot il suo prezzo e i limiti (prezzi al momento della creazione del tutorial, potrebbero subire modifiche in futuro)

🔴 **_Una volta avvertiti dei requisiti e dei prezzi, se ti va, continuiamo..._**

> **_📣_ Nel post assumiamo di avere l'app creata in iTunes Connect, di avere i certificati dell'ecosistema Apple, tutto sarà copiato da Fastlane!**

## Passiamo al sodo 🧑🏽💻

**Passaggi da seguire nel post**

1. _Utilizzo dell'API App Store Connect con Fastlane_
2. _Requisiti_
3. _Creazione di una chiave API App Store Connect_
4. _Utilizzo di una chiave API App Store Connect_
5. _Copia dei file Fastlane_
6. _Configurazione di GitHub Actions_

## 1. Utilizzo dell'API App Store Connect con Fastlane

> A partire da febbraio 2021, l'autenticazione a due fattori o la verifica in due passaggi è richiesta per tutti gli utenti per accedere ad App Store Connect. Questo livello di sicurezza aggiuntivo per il tuo ID Apple aiuta a garantire che solo tu possa accedere al tuo account.
> Da [Apple Support](https://developerapplecom/support/authentication/)

## Requisiti

Per poter utilizzare l'API App Store Connect, Fastlane necessita di **tre** cose:

1. ID emittente
2. ID chiave
3. File chiave o contenuto chiave

## Creazione di una chiave API App Store Connect

Per generare le chiavi, devi avere l'autorizzazione di Amministratore in App Store Connect. Se non hai tale autorizzazione, puoi indirizzare la persona pertinente a questo articolo e seguire le seguenti istruzioni.

1 — Accedi a [App Store Connect](https://appstoreconnectapplecom/)

2 — Seleziona [Utenti e accesso](https://appstoreconnectapplecom/access/users/)

![Accesso utente App Store Connect](/select_user_accesswebp)

3 — Seleziona la scheda Chiavi API

![Chiavi API App Store Connect](/user_access_keyswebp)

4 — Fai clic su Genera chiave API o sul pulsante Aggiungi (+)

![Creazione chiavi API App Store Connect](/user_accesswebp)

5 — Inserisci un nome per la chiave. Il nome è solo per tuo riferimento e non fa parte della chiave stessa.

![Creazione nome chiavi API App Store Connect](/gen_keywebp)

6 — In Accesso, seleziona il ruolo per la chiave. I ruoli che si applicano alle chiavi sono gli stessi ruoli che si applicano agli utenti del tuo team. Vedi [autorizzazioni dei ruoli](https://helpapplecom/app-store-connect/#/deve5f9a89d7/) Consigliamo di selezionare **Gestione app**

7 — Fai clic su Genera

> **L'accesso di una chiave API non può essere limitato a specifiche app**

Il nome della nuova chiave, l'ID chiave, un link per il download e altre informazioni appaiono sulla pagina.

![Download chiavi App Store Connect](/download_keywebp)

Puoi ottenere tutte e tre le informazioni necessarie qui.
<1> ID emittente
<2> ID chiave
<3> Fai clic su "Scarica chiave API" per scaricare la tua chiave privata API. Il link per il download appare solo se la chiave privata non è ancora stata scaricata. Apple non conserva una copia della chiave privata. Quindi, puoi scaricarla solo una volta.

> _🔴_ Conserva la tua chiave privata in un luogo sicuro. Non dovresti mai condividere le tue chiavi, memorizzarle in un repository di codice o includerle nel codice lato client.

## Utilizzo di una chiave API App Store Connect

Il file della chiave API (file p8 che scarichi), l'ID chiave e l'ID emittente sono necessari per creare il token JWT per l'autorizzazione. Ci sono diversi modi in cui queste informazioni possono essere inserite in Fastlane utilizzando la nuova azione di Fastlane, `app_store_connect_api_key`. Puoi conoscere altri modi nella [documentazione di Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/)Mostro questo metodo perché penso sia il modo più facile per lavorare con la maggior parte dei CI là fuori, dove è possibile impostare variabili d'ambiente

_Ora possiamo gestire Fastlane con la chiave API di App Store Connect, ottimo!_

### Creare certificati e profili di provisioning

#### Certificati

Apri XCode e vai su **Impostazioni** > **Account** > **Apple ID** > **Team** e seleziona il tuo team

![Identità di firma del codice](/code_signing_identitieswebp)

Clicca su **Gestisci certificati** > **+** e seleziona **Distribuzione Apple**

![Distribuzione Apple](/apple_distributionwebp)

Quindi puoi creare un nuovo certificato

Poi devi andare nel portachiavi per scaricare il certificato come file `p12`

Per farlo, devi andare nel portachiavi, passare al portachiavi **login** e poi alla scheda **I miei certificati**

![I miei certificati](/my_certificateswebp)

Quindi puoi selezionare il certificato che vuoi scaricare (Cerca per la data del certificato)

E poi fai clic destro sul certificato e seleziona **Esporta**

Scegli il formato file **Scambio di informazioni personali (p12)**

Questo scaricherà il certificato come file `p12`

#### Profili di provisioning

Apri [Apple Developer](https://developerapplecom/account/resources/profiles/list) e seleziona il team giusto

Quindi crea un nuovo profilo, cliccando su **+**

![Crea un nuovo profilo](/create_new_profilewebp)

E seleziona **App Store Connect**

![Seleziona App Store Connect](/select_app_store_connectwebp)

Poi devi selezionare l'app giusta, fai attenzione a non usare il jolly altrimenti la firma fallirà

![Seleziona l'app giusta](/select_appwebp)

Seleziona il certificato giusto che hai creato prima (cerca la data di scadenza, dovrebbe essere lo stesso giorno e mese di oggi) e clicca su **Continua**

![Seleziona il certificato giusto](/select_certificatewebp)

Infine inserisci il nome del profilo e clicca su **Genera**

> Il nome sarà usato per identificare il profilo in Fastlane, sotto il valore di `APPLE_PROFILE_NAME`

![Genera il profilo](/generate_profilewebp)

Puoi scaricare il profilo come file `mobileprovision`

![Scarica il profilo](/download_profilewebp)

### Creazione di segreti GitHub per il tuo certificato e profilo di provisioning

Il processo di firma implica l'archiviazione di certificati e profili di provisioning, il loro trasferimento al runner, l'importazione nel portachiavi del runner e il loro utilizzo nella tua build

Crea segreti nel tuo repository o organizzazione per i seguenti elementi:

- Il tuo certificato di firma Apple

  - Questo è il tuo file certificato `p12` Per ulteriori informazioni sull'esportazione del tuo certificato di firma da Xcode, consulta la [documentazione di Xcode](https://helpapplecom/xcode/mac/current/#/dev154b28f09)
  
  - Dovresti convertire il tuo certificato in Base64 quando lo salvi come segreto In questo esempio, il segreto è chiamato `BUILD_CERTIFICATE_BASE64`
  
  - Usa il seguente comando per convertire il tuo certificato in Base64 e copiarlo negli appunti:
  
    ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```

- La password per il tuo certificato di firma Apple

  - In questo esempio, il segreto è chiamato `P12_PASSWORD`

- Il tuo profilo di provisioning Apple

  - Per ulteriori informazioni sull'esportazione del tuo profilo di provisioning da Xcode, consulta la [documentazione di Xcode](https://helpapplecom/xcode/mac/current/#/deva899b4fe5)
  
  - Dovresti convertire il tuo profilo di provisioning in Base64 quando lo salvi come segreto In questo esempio, il segreto è chiamato `BUILD_PROVISION_PROFILE_BASE64`
  
  - Usa il seguente comando per convertire il tuo profilo di provisioning in Base64 e copiarlo negli appunti:
  
    ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```

## 2\ Copia i file di Fastlane

Fastlane è una libreria Ruby creata per automatizzare i compiti comuni di sviluppo mobile Usando Fastlane, puoi configurare "corsie" personalizzate che raggruppano una serie di "azioni" che eseguono compiti che normalmente eseguiresti utilizzando Android Studio Puoi fare molto con Fastlane, ma ai fini di questo tutorial, useremo solo una manciata di azioni principaliCrea una cartella Fastlane alla radice del tuo progetto e copia i seguenti file:
Fastfile
```ruby
platform :ios do
  desc 'Export ipa and submit to TestFlight'
  lane :beta do
    keychain_info = { keychain_name: "ios-build-#{Time.now.to_i}.keychain", keychain_password: SecureRandom.uuid }
    
    begin
      setup_signing(keychain_info)
      bump_build_number
      build_app_with_signing(keychain_info)
      submit_to_testflight
    ensure
      cleanup_keychain(keychain_info)
    end
  end

  private_lane :setup_signing do |options|
    create_keychain(
      name: options[:keychain_name],
      password: options[:keychain_password],
      unlock: true,
      timeout: 0,
      lock_when_sleeps: false, 
      add_to_search_list: true
    )
    import_cert(options)
    install_profile
    update_project_settings
  end

  lane :bump_build_number do
		file = File.read('../package.json')
		data_hash = JSON.parse(file)
		api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
		build_num = app_store_build_number(
      api_key: api_key,
			app_identifier: ENV['BUNDLE_IDENTIFIER'],
			live: false
    )
		build_num = build_num + 1
		UI.message("Bumped build number to #{build_num}")
		increment_build_number(
			build_number: build_num,
			xcodeproj: "./ios/App/App.xcodeproj",
			skip_info_plist: true
		)
	end

  private_lane :import_cert do |options|
    cert_path = "#{Dir.tmpdir}/build_certificate.p12"
    File.write(cert_path, Base64.decode64(ENV['BUILD_CERTIFICATE_BASE64']))
    import_certificate(
      certificate_path: cert_path,
      certificate_password: ENV['P12_PASSWORD'] || "",
      keychain_name: options[:keychain_name],
      keychain_password: options[:keychain_password],
      log_output: true
    )
    File.delete(cert_path)
  end  
  
  private_lane :cleanup_keychain do |options|
    delete_keychain(
      name: options[:keychain_name]
    )
  end  

  private_lane :install_profile do
    profile_path = "#{Dir.tmpdir}/build_pp.mobileprovision"
    File.write(profile_path, Base64.decode64(ENV['BUILD_PROVISION_PROFILE_BASE64']))
    UI.user_error!("Failed to create provisioning profile at #{profile_path}") unless File.exist?(profile_path)
    ENV['PROVISIONING_PROFILE_PATH'] = profile_path
    install_provisioning_profile(path: profile_path)
    File.delete(profile_path)
  end

  private_lane :update_project_settings do
    update_code_signing_settings(
      use_automatic_signing: false,
      path: "./ios/App/App.xcodeproj",
      code_sign_identity: "iPhone Distribution",
      profile_name: ENV['APPLE_PROFILE_NAME'],
      bundle_identifier: ENV['BUNDLE_IDENTIFIER'],
      team_id: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
    update_project_team(
      path: "./ios/App/App.xcodeproj",
      teamid: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
  end

  private_lane :build_app_with_signing do |options|
    unlock_keychain(
      path: options[:keychain_name],
      password: options[:keychain_password],
      set_default: false
    )
    build_app(
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      configuration: "Release",
      export_method: "app-store",
      output_name: "App.ipa",
      export_options: {
        provisioningProfiles: {
          ENV['BUNDLE_IDENTIFIER'] => ENV['APPLE_PROFILE_NAME']
        }
      },
      xcargs: "-verbose",
      buildlog_path: "./build_logs",
      export_xcargs: "-allowProvisioningUpdates",
    )
  end   

  private_lane :submit_to_testflight do
    api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
    pilot(
      api_key: api_key,
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )
  end
end
```

## **Elaborazione della build**

In GitHub Actions, **vieni addebitato in base ai minuti** che hai utilizzato per eseguire il tuo flusso di lavoro CI/CD. Per esperienza, ci vogliono circa 10-15 minuti prima che una build possa essere elaborata in App Store Connect.

Per i progetti privati, il costo stimato per build può arrivare fino a **$0,08/min x 15 min = $1,2**, o più, a seconda della configurazione o delle dipendenze del tuo progetto.

Se condividi le stesse preoccupazioni per il prezzo come me per i progetti privati, puoi mantenere `skip_waiting_for_build_processing` su `true`.

Qual è il rovescio della medaglia? Devi aggiornare manualmente la conformità della tua app in App Store Connect dopo che la build è stata elaborata, per poter distribuire la build ai tuoi utenti.

Questo è solo un parametro opzionale da aggiornare se vuoi risparmiare sui minuti di build per i progetti privati. Per i progetti gratuiti, questo non dovrebbe essere affatto un problema. Vedi [prezzi](https://github.com/pricing/)


## 3. Configura GitHub Actions

**Configura i segreti di GitHub**

Ti sei mai chiesto da dove provengono i valori dell'`ENV`? Bene, non è più un segreto - provengono dal segreto del tuo progetto 🤦

![Imposta i segreti di GitHub](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - l'ID del tuo team App Store Connect se fai parte di più team

2. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, ad esempio `match AppStore com.domain.blabla.demo`

3. `BUILD_CERTIFICATE_BASE64` - Certificato codificato in Base64

4. `BUILD_PROVISION_PROFILE_BASE64` - Profilo di provisioning codificato in Base64

5. `BUNDLE_IDENTIFIER` - l'identificatore del bundle della tua app

6. `APPLE_KEY_ID` — Chiave API di App Store Connect 🔺Key ID

7. `APPLE_ISSUER_ID` — Chiave API di App Store Connect 🔺Issuer ID

8. `APPLE_KEY_CONTENT` — Chiave API di App Store Connect 🔺 Contenuto della chiave _p8_, [controllalo](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4. Configura il file di workflow di GitHub**

Crea una directory di workflow GitHub

```
cd .github/workflows
```

All'interno della cartella `workflow`, crea un file chiamato `build-upload-ios.yml` e aggiungi quanto segue

```yaml
name: Build source code on ios

on:
  push:
    tags:
      - '*'

jobs:
  build_ios:
    runs-on: macOS-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        id: install_code
        run: npm ci
      - name: Build
        id: build_code
        run: npm run build
      - name: Build
        id: build_code
        run: npm run mobile
      - uses: actions/cache@v3
        with:
          path: ios/App/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('**/Podfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-pods-
      - name: Sync
        id: sync_code
        run: npx cap sync
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          BUNDLE_IDENTIFIER: ${{ secrets.BUNDLE_IDENTIFIER }}
          BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          BUILD_PROVISION_PROFILE_BASE64: ${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          APPLE_PROFILE_NAME: ${{ secrets.APPLE_PROFILE_NAME }}
        with:
          lane: ios beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v4
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 10
```

Questo workflow dovrebbe essere attivato dopo ogni _tag_ di GitHub, se hai bisogno di automatizzare il tag, fai riferimento prima a [Build e rilascio automatico con GitHub actions](/blog/automatic-build-and-release-with-github-actions/)

Quindi questo workflow estrarrà le tue dipendenze NodeJS, le installerà e costruirà la tua app JavaScript

> Ogni volta che invii un nuovo commit, verrà costruito un rilascio in TestFlight

La tua App non ha bisogno di utilizzare Ionic, è obbligatoria solo la base di Capacitor, può avere vecchi moduli Cordova, ma dovrebbero essere preferiti i plugin JS di Capacitor

## 5. Attiva il workflow

**Crea un Commit**

Fai un _commit_, dovresti vedere il workflow attivo nel repository

**Attiva il workflow**

Invia i nuovi commit al ramo `main` o `development` per attivare il workflow

![Iniziato con commit](/cd_started.webp)

Dopo pochi minuti, la build dovrebbe essere disponibile nella tua dashboard di App Store Connect

![Dashboard di Testflight](/testflight_app.webp)

## Si può distribuire dalla macchina locale?

Sì, puoi, ed è molto semplice

Puoi usare Xcode per costruire e firmare la tua app, come sempre

### Ringraziamenti

Questo blog si basa sui seguenti articoli:
- [Continuous delivery per iOS utilizzando Fastlane e GitHub actions](https://lito.arias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentazione di Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Questo messaggio GitHub da @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Questa documentazione GitHub](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)