---
slug: it__automatic-capacitor-ios-build-github-action-with-match
title: Compilazione Automatica di Capacitor iOS con GitHub Actions Utilizzando match
description: >-
  Come Configurare una Pipeline CI/CD per la tua App iOS Ionic con fastlane e
  GitHub Actions in 5 Minuti (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Illustrazione di GitHub Action per Fastlane TestFlight
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-android-build-github-action
---

Ecco la traduzione in italiano:

## Distribuzione continua per iOS utilizzando Fastlane e GitHub Actions con match

## Prerequisiti

Prima di continuare con il tutorial...

- Assicurati di avere Fastlane [installato](https://docs.fastlane.tools/) sulla tua macchina di sviluppo
- Iscrizione al programma per sviluppatori iOS
- Voglia di leggere 😆...
- Un team di molti sviluppatori, altrimenti consigliamo di usare [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) per flussi di lavoro più semplici

## Importante riguardo al prezzo

![Prezzo GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

Il servizio è 'gratuito' fino al limite, a seconda della macchina scelta.
Useremo una macchina **_macOS_**, puoi vedere nello screenshot il suo prezzo e i limiti (prezzi al momento della creazione del tutorial, potrebbero subire modifiche in futuro)

🔴 **_Una volta avvisati dei requisiti e dei prezzi, se ti va, continuiamo..._**

> **_📣_ Nel post assumiamo di avere l'app già creata in iTunes Connect, di avere i certificati dell'ecosistema Apple, tutto sarà copiato da Fastlane!**

## Andiamo al sodo 🧑🏽‍💻

**Passaggi da seguire nel post**

1. _Utilizzo dell'API App Store Connect con Fastlane Match_
2. _Requisiti_
3. _Creazione di una chiave API App Store Connect_
4. _Utilizzo di una chiave API App Store Connect_
5. _Copia dei file Fastlane_
6. _Configurazione di Fastlane match_

## 1. Utilizzo dell'API App Store Connect con Fastlane Match

> A partire da febbraio 2021, l'autenticazione a due fattori o la verifica in due passaggi è richiesta per tutti gli utenti per accedere ad App Store Connect. Questo ulteriore livello di sicurezza per il tuo ID Apple aiuta a garantire che solo tu possa accedere al tuo account.
> Da [Apple Support](https://developer.apple.com/support/authentication/)

> Per iniziare con match è necessario revocare i certificati esistenti. Ma non preoccuparti, avrai direttamente quello nuovo.

## Requisiti

Per poter utilizzare l'API App Store Connect, Fastlane necessita di **tre** cose:

1. ID emittente
2. ID chiave
3. File chiave o contenuto chiave

## Creazione di una chiave API App Store Connect

Per generare le chiavi, devi avere l'autorizzazione di amministratore in App Store Connect. Se non hai tale autorizzazione, puoi indirizzare la persona pertinente a questo articolo e seguire le seguenti istruzioni.

1 - Accedi a [App Store Connect](https://appstoreconnect.apple.com/)

2 - Seleziona [Utenti e accesso](https://appstoreconnect.apple.com/access/users/)

![Accesso utente App Store Connect](/select_user_access.webp)

3 - Seleziona la scheda Chiavi API

![Chiavi API App Store Connect](/user_access_keys.webp)

4 - Clicca su Genera chiave API o sul pulsante Aggiungi (+)

![Creazione chiavi API App Store Connect](/user_access.webp)

5 - Inserisci un nome per la chiave. Il nome è solo per il tuo riferimento e non fa parte della chiave stessa.

![Creazione nome chiavi API App Store Connect](/gen_key.webp)

6 - In Accesso, seleziona il ruolo per la chiave. I ruoli che si applicano alle chiavi sono gli stessi ruoli che si applicano agli utenti del tuo team. Vedi [autorizzazioni dei ruoli](https://help.apple.com/app-store-connect/#/deve5f9a89d7/)

7 - Clicca su Genera

> **L'accesso di una chiave API non può essere limitato a specifiche app**

Il nome della nuova chiave, l'ID chiave, un link per il download e altre informazioni appaiono sulla pagina.

![Download chiavi App Store Connect](/download_key.webp)

Qui puoi ottenere tutte e tre le informazioni necessarie:
- ID emittente
- ID chiave
- Clicca su "Scarica chiave API" per scaricare la tua chiave privata API. Il link per il download appare solo se la chiave privata non è stata ancora scaricata. Apple non conserva una copia della chiave privata. Quindi, puoi scaricarla solo una volta.

> _🔴_ Conserva la tua chiave privata in un luogo sicuro. Non dovresti mai condividere le tue chiavi, memorizzarle in un repository di codice o includerle nel codice lato client.

## Utilizzo di una chiave API App Store Connect

Il file della chiave API (file p8 che scarichi), l'ID chiave e l'ID emittente sono necessari per creare il token JWT per l'autorizzazione.Esistono più modi in cui queste informazioni possono essere inserite in Fastlane utilizzando la nuova azione di Fastlane, `app_store_connect_api_key`. Puoi scoprire altri metodi nella [documentazione di Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/). Mostro questo metodo perché penso sia il modo più semplice per lavorare con la maggior parte dei CI esistenti, dove puoi impostare variabili d'ambiente.

_Ora possiamo gestire Fastlane con la chiave API di App Store Connect, ottimo!_

## 2. Copiare i file di Fastlane

Fastlane è una libreria Ruby creata per automatizzare le attività comuni di sviluppo mobile. Utilizzando Fastlane, puoi configurare "lane" personalizzate che raggruppano una serie di "azioni" che eseguono compiti che normalmente svolgeresti usando Android Studio. Puoi fare molto con Fastlane, ma ai fini di questo tutorial, useremo solo alcune azioni principali.

Crea una cartella Fastlane alla radice del tuo progetto e copia i seguenti file:

Fastfile
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

Appfile
```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

## Configurare Fastlane match

Fastlane [match](https://docsfastlanetools/actions/match/) è un nuovo approccio alla firma del codice di iOS. Fastlane match facilita la gestione dei certificati e dei profili di provisioning richiesti per le tue app iOS da parte dei team.

Crea un nuovo repository privato chiamato `certificates`, ad esempio sul tuo account personale GitHub o sull'organizzazione.

Inizializza Fastlane match per la tua app iOS

```shell
fastlane match init
```

Quindi seleziona l'opzione #1 (Git Storage)

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Assegna l'URL del repository appena creato

```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

> Ora hai all'interno della cartella Fastlane un file chiamato **_Matchfile_** e `_git_url_` dovrebbe essere impostato sull'URL HTTPS del repository dei certificati. Facoltativamente, puoi anche usare SSH, ma richiede un passaggio diverso da eseguire.

```
# ios/Matchfilegit_url("https://github.com/gitusername/certificates")storage_mode("git")type("appstore")
```

Successivamente, procediamo a generare i certificati e inserisci le tue credenziali quando richiesto da Fastlane Match.

Ti verrà chiesto di inserire una passphrase. Ricordala correttamente perché sarà utilizzata più tardi da GitHub Actions per decrittare il tuo repository dei certificati.

```
fastlane match appstore
```

Se tutto è andato bene, dovresti vedere qualcosa del genere:

```
[01:40:52]: All required keys, certificates and provisioning profiles are installed 🙌
```

> Se hai riscontrato problemi con GitHub e le autorizzazioni necessarie, forse questo [post](https://mediumcom/@litoarias/token-authentication-requirements-for-git-operations-5fdd8a6f6e7c/) ti aiuterà a generare token di autenticazione per git.

I certificati e i profili di provisioning generati vengono caricati nelle risorse del repository dei certificati.

![Certificati di App Store Connect](/certificateswebp)

Infine, apri il tuo `progetto` in Xcode e aggiorna il profilo di provisioning per la configurazione di rilascio della tua app.

![Certificati XCode](/xcode_certwebp)

## Alcune cose da notare 💡

## MATCH

Per importare i certificati e i profili di provisioning, il CI/CD deve avere accesso al repository dei certificati. Puoi farlo generando un token di accesso personale (dovrebbe essere già stato utilizzato) che ha l'ambito per accedere o leggere repository privati.

Su GitHub, vai su **Impostazioni** → **Impostazioni sviluppatore** → **Token di accesso personali** → clicca su `Genera nuovo token` → seleziona l'ambito `repo` → quindi clicca su `Genera token`.

![Crea token di accesso personale](/personal_access_tokenwebp)

Fai una copia del token di accesso personale generato. Lo userai più tardi per la variabile d'ambiente `GIT_TOKEN`.

Quindi sostituisci il tuo file match generato nella cartella Fastlane con:
Matchfile
```ruby
CERTIFICATE_STORE_URL = ENV["CERTIFICATE_STORE_URL"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]
FASTLANE_APPLE_ID = ENV["FASTLANE_APPLE_ID"]

git_url(CERTIFICATE_STORE_URL)
storage_mode("git")
type("appstore")
git_basic_authorization(Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"))
username(FASTLANE_APPLE_ID)
```
Questo sarà utilizzato da GitHub Actions per importare i certificati e i profili di provisioning.
E la variabile sarà impostata nei Segreti di GitHub, invece di codificarla nel file.

## Elaborazione della build

In GitHub Actions, **vieni fatturato in base ai minuti** che hai utilizzato per eseguire il tuo flusso di lavoro CI/CD. Per esperienza, ci vogliono circa 10-15 minuti prima che una build possa essere elaborata in App Store Connect.

Per i progetti privati, il costo stimato per build può arrivare fino a **$0,08/min x 15 min = $1,2**, o più, a seconda della configurazione o delle dipendenze del tuo progetto.Ecco la traduzione in italiano del testo:

Se condividi le stesse preoccupazioni per il prezzo come me per i progetti privati, puoi mantenere `skip_waiting_for_build_processing` impostato su `true`

Qual è il problema? Dovrai aggiornare manualmente la conformità della tua app in App Store Connect dopo che la build è stata elaborata, per poterla distribuire ai tuoi utenti

Questo è solo un parametro opzionale da aggiornare se vuoi risparmiare sui minuti di build per i progetti privati. Per i progetti gratuiti, questo non dovrebbe essere affatto un problema. Vedi [prezzi](https://github.com/pricing/)

## 3. Configurare GitHub Actions

**Configura i segreti di GitHub**

Ti sei mai chiesto da dove vengono i valori dell'`ENV`? Beh, non è più un segreto - provengono dai segreti del tuo progetto 🤦

![Imposta i segreti di GitHub](/github_secrets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - l'ID del tuo team di App Store Connect se sei in più team

2. `DEVELOPER_APP_ID` - in App Store Connect, vai all'app → **Informazioni app** → Scorri fino alla sezione `Informazioni generali` della tua app e cerca `Apple ID`

3. `DEVELOPER_APP_IDENTIFIER` - l'identificatore bundle della tua app

4. `DEVELOPER_PORTAL_TEAM_ID` - l'ID del tuo team del Developer Portal se sei in più team

5. `FASTLANE_APPLE_ID` - l'Apple ID o l'email dello sviluppatore che usi per gestire l'app

6. `GIT_USERNAME` & `GIT_TOKEN` - Il tuo nome utente git e il tuo token di accesso personale

7. `MATCH_PASSWORD` - la passphrase che hai assegnato quando hai inizializzato match, verrà utilizzata per decrittare i certificati e i profili di provisioning

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <1>`, ad esempio `match AppStore com.domain.blabla.demo`

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - assegna un utente e una password temporanei per il keychain per il tuo workflow

10. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID

11. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID

12. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 File chiave o contenuto chiave di _p8_, [controllalo](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<2>
13. `CERTIFICATE_STORE_URL` — L'URL del repository delle tue chiavi Match (es: https://github.com/***/fastlane_match.git)

## 4. Configurare il file di workflow GitHub

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
      - name: Use Node.js 16
        uses: actions/setup-node@v3
        with:
          node-version: 16
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
          ruby-version: 2.7.2
      - uses: maierj/fastlane-action@v2.3.0
        env:
          DEVELOPER_APP_IDENTIFIER: ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          DEVELOPER_APP_ID: ${{ secrets.DEVELOPER_APP_ID }}
          PROVISIONING_PROFILE_SPECIFIER: match AppStore ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          TEMP_KEYCHAIN_USER: ${{ secrets.TEMP_KEYCHAIN_USER }}
          TEMP_KEYCHAIN_PASSWORD: ${{ secrets.TEMP_KEYCHAIN_PASSWORD }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          CERTIFICATE_STORE_URL: https://github.com/${{ secrets.CERTIFICATE_STORE_REPO }}.git
          GIT_USERNAME: ${{ secrets.GIT_USERNAME }}
          GIT_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          FASTLANE_APPLE_ID: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_USERNAME: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          DEVELOPER_PORTAL_TEAM_ID: ${{ secrets.DEVELOPER_PORTAL_TEAM_ID }}
        with:
          lane: closed_beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 60
```

Questo workflow dovrebbe essere attivato dopo ogni _tag_ GitHub, se hai bisogno di automatizzare il tag, fai riferimento prima a [Build e rilascio automatico con GitHub actions](/blog/automatic-build-and-release-with-github-actions/)

Quindi questo workflow estrarrà le tue dipendenze NodeJS, le installerà e compilerà la tua app JavaScript

> Ogni volta che invii un nuovo commit, verrà creato un rilascio in TestFlight

La tua app non ha bisogno di usare Ionic, è obbligatoria solo la base di Capacitor, può avere vecchi moduli Cordova, ma dovrebbero essere preferiti i plugin JS di Capacitor

## 5. Attivare il workflow

**Crea un Commit**

Fai un _commit_, dovresti vedere il workflow attivo nel repository

**Attiva il workflow**

Invia i nuovi commit al ramo `main` o `development` per attivare il workflow

![Iniziato con il commit](/cd_started.webp)

Dopo alcuni minuti, la build dovrebbe essere disponibile nel tuo dashboard di App Store Connect

![Dashboard di Testflight](/testflight_app.webp)

## Si può distribuire dalla macchina locale?

Sì, puoi farlo, ed è molto semplice

Immagina di avere un repository privato, e di aver esaurito i minuti del piano gratuito e di non voler pagare per nuovi rilasci, o magari preferisci inviare l'applicazione manualmente

**_Facciamolo_**

Ok, prima dobbiamo creare nel percorso **_my_project_path/fastlane_** un file chiamato **_env_**, proprio nello stesso percorso di _Fastfile_, per poter creare le stesse proprietà _segrete_ trovate nel nostro _GitHub_, come segue:

file env per la distribuzione dalla macchina locale

Ora puoi andare al _terminale_ e lanciare _Fastlane_ dalla tua macchina:

```
fastlane closed_beta
```

> **❌ Essenziale riguardo al**env_ **file, poiché preferiremmo non esporre questi dati, dobbiamo aggiungerlo nel nostro** _gitignore_**, qualcosa del genere: ❌**

```
fastlane/*.env
```

Dovrebbe funzionare allo stesso modo come accade da GitHub Actions sulla macchina remota ma sulla nostra macchina locale 🍻

![Esecuzione locale di Fastlane](/local_fastlanewebp)

Esecuzione del terminale: $ Fastlane closed\_beta

**_Se sei arrivato fin qui, complimenti, ora hai un processo completamente automatizzato per le tue app iOS con Fastlane e GitHub Actions_**

> Ogni volta che invii un nuovo commit, verrà creata una release nella console di Google Play, canale beta
Migliorerò questo blog con i vostri feedback, se avete domande o suggerimenti, fatemi sapere via email martin@capgoapp

### Compilazione sul tuo dispositivo

Se hai ancora bisogno di compilare sul tuo dispositivo, devi aggiungerli manualmente al provisioning
Connetti il tuo dispositivo al tuo mac e apri il menu del dispositivo
![trova menu dispositivo ios](/find_ios_devicewebp)
Poi copia il tuo identificatore 
![trova identificatore ios](/find_ios_identifierwebp)
E poi avvia il comando:
`fastlane register_new_device`
ti chiederà di impostare un nome per il dispositivo e l'identificatore:
![imposta identificatore ios](/set_identifierwebp)

### Se incontri problemi

Se hai problemi con il dispositivo di sviluppo che non riesce a testare ecc., di solito questo lo risolve

C'è un comando magico che può salvarti:
```shell
fastlane match nuke development
fastlane match development
```

Poi:
Pulisci il progetto tenendo premuto Shift(⇧)+Command(⌘)+K o selezionando Prodotto > Pulisci (potrebbe essere etichettato "Pulisci cartella di compilazione")

Poi prova a eseguire di nuovo l'app sul tuo dispositivo

### Ringraziamenti

Questo blog si basa sui seguenti articoli:
- [Consegna continua per iOS utilizzando Fastlane e GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentazione di Fastlane](https://docsfastlanetools/app-store-connect-api/)
- [Questo messaggio GitHub da @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)