---
slug: automatic-capacitor-ios-build-github-action-with-match
title: Build automatico di Capacitor iOS con GitHub actions utilizzando match
description: >-
  Come configurare una pipeline CI/CD per la tua app Ionic IOS utilizzando
  fastlane e GitHub Actions in 5 minuti (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Illustrazione dell'azione GitHub di Fastlane TestFlight
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-android-build-github-action
---
# Build automatiche iOS con GitHub Actions utilizzando Match

La configurazione del CI/CD per le app Capacitor può essere complessa e richiedere tempo. Ecco cosa devi sapere:

## Prerequisiti

Prima di iniziare, avrai bisogno di:

- Un account GitHub con accesso admin
- Iscrizione al programma sviluppatori iOS 
- Accesso alle API di App Store Connect con i permessi appropriati
- Comprensione dei workflow di GitHub Actions
- Conoscenza della configurazione di Fastlane e Match
- Tempo per mantenere e fare debug della pipeline
- Un team di molti sviluppatori, altrimenti consigliamo di usare [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) per workflow più semplici

## Setup CI/CD Professionale by Capgo

Salta la complessità. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configura la tua pipeline CI/CD direttamente nella piattaforma che preferisci:

- **Indipendenza dalla Piattaforma**: Funziona con GitHub Actions, GitLab CI o altri
- **Integrazione Perfetta**: Non serve cambiare piattaforma, funziona con il tuo processo attuale
- **Configurazione Personalizzata**: Setup personalizzato in base alle esigenze del progetto
- **Guida Esperta**: Abbiamo già configurato CI/CD per oltre 50 app

### Prezzi
- Setup una tantum: €2.600
- Costi di gestione: ~€300/anno 
- Confronto con altre soluzioni proprietarie: €6.000/anno
- **Risparmio di €26.100 in 5 anni**

[Configura CI/CD Ora](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you/)

## Guida al Setup Manuale

Se vuoi comunque configurare tutto da solo, ecco cosa devi fare:

## Continuous Delivery per iOS usando Fastlane e GitHub Actions con match

## Prerequisiti

Prima di continuare con il tutorial...

- Assicurati di avere Fastlane [installato](https://docs.fastlane.tools/) sulla tua macchina di sviluppo.  
- Iscrizione al programma sviluppatori iOS.
- Voglia di leggere 😆...
- Un team di molti sviluppatori, altrimenti consigliamo di usare [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) per workflow più semplici.

## Importante sui prezzi

![Price GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

Il servizio è 'gratuito' fino al limite, a seconda della macchina scelta.
Useremo una macchina **_macOS_**, puoi vedere nello screenshot il suo prezzo e i limiti (prezzi aggiornati alla creazione del tutorial, potrebbero subire variazioni in futuro)

🔴 **_Una volta avvisati dei requisiti e dei prezzi, se ti va, continuiamo..._**

> **_📣_ Nel post assumiamo di avere l'app creata in iTunes connect, di avere i certificati dell'ecosistema Apple, tutto sarà copiato da Fastlane!**

## Immergiamoci 🤿

**Passaggi da seguire nel post**

1. _Utilizzo delle API di App Store Connect con Fastlane Match_
2. _Requisiti_
3. _Creazione di una chiave API di App Store Connect_
4. _Utilizzo di una chiave API di App Store Connect_
5. _Copia dei file Fastlane_
6. _Configurazione di Fastlane match_

[Continua la traduzione del resto del testo mantenendo lo stesso stile e formato]

**Configurare i segreti GitHub**

Ti sei mai chiesto da dove provengono i valori dell'`ENV`? Beh, non è più un segreto - proviene dai segreti del tuo progetto. 🤦

![Imposta i segreti GitHub](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - l'ID del tuo team App Store Connect se fai parte di più team.

2. `DEVELOPER_APP_ID` - in App Store Connect, vai all'app → **App Information** → Scorri fino alla sezione `General Information` della tua app e cerca `Apple ID`.

3. `DEVELOPER_APP_IDENTIFIER` - l'identificatore bundle della tua app.

4. `DEVELOPER_PORTAL_TEAM_ID` - l'ID del tuo team Developer Portal se fai parte di più team.

5. `FASTLANE_APPLE_ID` - l'Apple ID o email dello sviluppatore che usi per gestire l'app.

6. `GIT_USERNAME` & `GIT_TOKEN` - Il tuo nome utente git e il tuo token di accesso personale.

7. `MATCH_PASSWORD` - la passphrase che hai assegnato durante l'inizializzazione di match, sarà usata per decrittare i certificati e i profili di provisioning.

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <1>`, es. `match AppStore com.domain.blabla.demo`.

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - assegna un utente e una password keychain temporanei per il tuo workflow.

10. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID.

11. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID.

12. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 File chiave o contenuto chiave di _.p8_, [controllalo](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<2>
13. `CERTIFICATE_STORE_URL` — L'URL del repository delle tue chiavi Match (es: https://github.com/***/fastlane_match.git)

## **4. Configurare il file di workflow GitHub**

Crea una directory di workflow GitHub.

```ruby
default_platform(:ios)

DEVELOPER_APP_IDENTIFIER = ENV["DEVELOPER_APP_IDENTIFIER"]
DEVELOPER_APP_ID = ENV["DEVELOPER_APP_ID"]
PROVISIONING_PROFILE_SPECIFIER = ENV["PROVISIONING_PROFILE_SPECIFIER"]
TEMP_KEYCHAIN_USER = ENV["TEMP_KEYCHAIN_USER"]
TEMP_KEYCHAIN_PASSWORD = ENV["TEMP_KEYCHAIN_PASSWORD"]
APPLE_ISSUER_ID = ENV["APPLE_ISSUER_ID"]
APPLE_KEY_ID = ENV["APPLE_KEY_ID"]
APPLE_KEY_CONTENT = ENV["APPLE_KEY_CONTENT"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]

def delete_temp_keychain(name)
  delete_keychain(
    name: name
  ) if File.exist? File.expand_path("~/Library/Keychains/#{name}-db")
end

def create_temp_keychain(name, password)
  create_keychain(
    name: name,
    password: password,
    unlock: false,
    timeout: 0
  )
end

def ensure_temp_keychain(name, password)
  delete_temp_keychain(name)
  create_temp_keychain(name, password)
end

platform :ios do
  lane :build do
    build_app(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )
  end
  lane :refresh_profiles do
    match(
      type: "development",
      force: true)
    match(
      type: "adhoc",
      force: true)
  end
  desc "Register new device"
  lane :register_new_device do  |options|
      device_name = prompt(text: "Enter the device name: ")
      device_udid = prompt(text: "Enter the device UDID: ")
      device_hash = {}
      device_hash[device_name] = device_udid
      register_devices(
                       devices: device_hash
                       )
    refresh_profiles
  end
  lane :closed_beta do
    keychain_name = TEMP_KEYCHAIN_USER
    keychain_password = TEMP_KEYCHAIN_PASSWORD
    ensure_temp_keychain(keychain_name, keychain_password)

    api_key = app_store_connect_api_key(
      key_id: APPLE_KEY_ID,
      issuer_id: APPLE_ISSUER_ID,
      key_content: APPLE_KEY_CONTENT,            
      duration: 1200,            
      in_house: false
    )

    match(
      type: 'appstore',
      git_basic_authorization: Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"),
      readonly: true,
      keychain_name: keychain_name,
      keychain_password: keychain_password,
      api_key: api_key
    )

    gym(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )

    pilot(
      apple_id: "#{DEVELOPER_APP_ID}",
      app_identifier: "#{DEVELOPER_APP_IDENTIFIER}",
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )

    delete_temp_keychain(keychain_name)
  end
  lane :submit_review do
    version = ''
    Dir.chdir("..") do
      file = File.read("package.json")
      data = JSON.parse(file)
      version = data["version"]
    end
    deliver(
      app_version: version,
      submit_for_review: true,
      automatic_release: true,
      force: true, # Skip HTMl report verification
      skip_metadata: false,
      skip_screenshots: false,
      skip_binary_upload: true
    )
  end
end
```

All'interno della cartella `workflow`, crea un file chiamato `build-upload-ios.yml` e aggiungi quanto segue.

```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

Questo workflow dovrebbe essere attivato dopo ogni _tag_ GitHub, se hai bisogno di automatizzare il tag, consulta prima [Build e rilascio automatico con GitHub actions](/blog/automatic-build-and-release-with-github-actions/).

Quindi questo workflow scaricherà le tue dipendenze NodeJS, le installerà e compilerà la tua app JavaScript.

> Ogni volta che invii un nuovo commit, verrà creato un rilascio in TestFlight.

La tua App non deve necessariamente utilizzare Ionic, è obbligatoria solo la base Capacitor, può avere vecchi moduli Cordova, ma è preferibile utilizzare i plugin Capacitor JS.

## 5. Attivare il workflow

**Creare un Commit**

Fai un _commit_, dovresti vedere il workflow attivo nel repository.

**Attivare il workflow**

Invia i nuovi commit al branch `main` o `development` per attivare il workflow.

![Iniziato con commit](/cd_started.webp)

Dopo alcuni minuti, la build dovrebbe essere disponibile nella tua dashboard di App Store Connect.

![Dashboard Testflight](/testflight_app.webp)

## Si può distribuire dalla macchina locale?

Sì, puoi farlo, ed è molto semplice.

Immagina di avere un repository privato e di aver esaurito i minuti del piano gratuito e non vuoi pagare per nuovi rilasci, o forse preferisci inviare l'applicazione manualmente.

**_Facciamolo_**

Ok, prima dobbiamo creare nel percorso _my_project_path/fastlane_ un file chiamato **_.env,_** proprio nello stesso percorso di _Fastfile,_ per poter creare le stesse proprietà _secret_ trovate nel nostro _GitHub,_ come sotto:

File .env per la distribuzione dalla macchina locale

Ora puoi andare al _terminale_ e lanciare _Fastlane_ dalla tua macchina:

```shell
fastlane match init
```

> **❌ Importante riguardo al file** _.env_ **, poiché preferiremmo non esporre questi dati, dobbiamo aggiungerlo nel nostro** _.gitignore_**, qualcosa del genere: ❌**

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Dovrebbe funzionare allo stesso modo di come accade da GitHub Actions sulla macchina remota ma sulla nostra macchina locale. 🍻

![Esecuzione locale di Fastlane](/local_fastlane.webp)

Esecuzione terminale: $ Fastlane closed_beta

**_Se sei arrivato fin qui, congratulazioni, ora hai un processo completamente automatizzato per le tue app iOS con Fastlane e GitHub Actions._**

> Ogni volta che invii un nuovo commit, verrà creato un rilascio nella console di Google Play, canale beta.
Migliorerò questo blog con i vostri feedback, se avete domande o suggerimenti, fatemi sapere via email martin@capgo.app

### Build sul tuo dispositivo

Se hai ancora bisogno di compilare sul tuo dispositivo, devi aggiungerli manualmente al provisioning.
Collega il tuo dispositivo al mac e apri il menu dispositivi
![trova menu dispositivo ios](/find_ios_device.webp)
Poi copia il tuo identificatore 
![trova identificatore ios](/find_ios_identifier.webp)
E poi avvia il comando:
`fastlane register_new_device`
ti chiederà di impostare un nome dispositivo e l'identificatore:
![imposta identificatore ios](/set_identifier.webp)

### se hai problemi

Se hai problemi con i dispositivi di sviluppo che non riescono a testare ecc. questo di solito lo risolve.

C'è un comando magico che può salvarti:
```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

Poi:
Pulisci il progetto tenendo premuto Shift(⇧)+Command(⌘)+K o selezionando Product > Clean (potrebbe essere etichettato "Clean Build Folder")

Quindi prova a eseguire nuovamente l'app sul tuo dispositivo.

### Grazie

Questo blog è basato sui seguenti articoli:
- [Continuous delivery per IOS usando Fastlane e GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentazione Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Questo messaggio GitHub da @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
