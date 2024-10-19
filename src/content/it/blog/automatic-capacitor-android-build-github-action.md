---
slug: automatic-capacitor-android-build-github-action
title: Compilazione Automatica di Capacitor Android con GitHub Actions
description: >-
  Come Configurare una Pipeline CI/CD per la Tua App Android Ionic con fastlane
  e GitHub Actions in 5 Minuti (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2022-10-27T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Illustrazione Azioni GitHub Fastlane Google Play
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-ios-build-github-action
---

## Consegna continua per Android utilizzando Fastlane e GitHub Actions

## Prerequisiti

Prima di continuare con il tutorial...

- Assicurati di utilizzare GitHub
- La tua app è già distribuita sul Google Play Store
- Desiderio di leggere 😆...

## Importante riguardo al prezzo

![Prezzo GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Il servizio è 'gratuito' fino al limite, a seconda della macchina scelta  
Utilizzeremo una macchina **_Linux_**, puoi vedere nello screenshot il suo prezzo e i limiti (prezzi al momento della creazione del tutorial, potrebbero subire modifiche in futuro)

🔴 **_Una volta avvisati dei requisiti e dei prezzi, se vuoi, proseguiamo_**

> **_📣_ Nel post assumiamo di avere l'app creata in Google Play e di possedere la chiave di firma dell'ecosistema Google**

## Passiamo al sodo 🧑🏽‍💻

**Passaggi da seguire nel post**

1. _Copiare i file di Fastline_
2. _Memorizzare i tuoi segreti nei segreti crittografati di GitHub_
3. _Creare e memorizzare la chiave dell'account di servizio di Google Play_
4. _Memorizzare la chiave di firma Android_
5. _Configurare il file yml del flusso di lavoro di GitHub Actions_

## 1. Copiare i file di Fastline

Fastlane è una libreria Ruby creata per automatizzare attività comuni di sviluppo mobile. Utilizzando Fastlane, puoi configurare "corsie" personalizzate che raggruppano una serie di "azioni" che eseguono compiti che normalmente eseguiresti utilizzando Android Studio. Puoi fare molto con Fastlane, ma ai fini di questo tutorial, utilizzeremo solo una manciata di azioni principali.

Crea una cartella Fastlane alla radice del tuo progetto e copia i seguenti file:
Fastlane
```ruby
default_platform(:android)

KEYSTORE_KEY_ALIAS = ENV["KEYSTORE_KEY_ALIAS"]
KEYSTORE_KEY_PASSWORD = ENV["KEYSTORE_KEY_PASSWORD"]
KEYSTORE_STORE_PASSWORD = ENV["KEYSTORE_STORE_PASSWORD"]

platform :android do
    desc "Deploy a beta version to the Google Play"
    private_lane :verify_changelog_exists do |version_code: |
      changelog_path = "android/metadata/en-US/changelogs/#{version_code}.txt"
      UI.user_error!("Missing changelog file at #{changelog_path}") unless File.exist?(changelog_path)
      UI.message("Changelog exists for version code #{version_code}")
    end

    private_lane :verify_upload_to_staging do |version_name: |
      UI.message "Skipping staging verification step"
    end
    lane :beta do
				keystore_path = "#{Dir.tmpdir}/build_keystore.keystore"
				File.write(keystore_path, Base64.decode64(ENV['ANDROID_KEYSTORE_FILE']))
				json_key_data = Base64.decode64(ENV['PLAY_CONFIG_JSON'])
				previous_build_number = google_play_track_version_codes(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					track: "internal",
					json_key_data: json_key_data,
				)[0]

				current_build_number = previous_build_number + 1
				sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        gradle(
          task: "clean bundleRelease",
          project_dir: 'android/',
          print_command: false,
          properties: {
            "android.injected.signing.store.file" => "#{keystore_path}",
            "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
            "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
            "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
						'versionCode' => current_build_number
          })
        upload_to_play_store(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					json_key_data: json_key_data,
          track: 'internal',
          release_status: 'completed',
          skip_upload_metadata: true,
          skip_upload_changelogs: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
        )
    end
    lane :build do
      gradle(
        task: "clean bundleRelease",
        project_dir: 'android/',
        print_command: false,
        properties: {
          "android.injected.signing.store.file" => "#{keystore_path}",
          "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
          "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
          "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
        })
    end
    lane :prod_release do
      build_gradle = File.read("../android/app/build.gradle")

      verify_changelog_exists(version_code: build_gradle.match(/versionCode (\d+)/)[1])
      verify_upload_to_staging(version_name: build_gradle.match(/versionName '([\d\.]+)'/)[1])

      supply(
        track_promote_to: 'beta',
        skip_upload_apk: true,
        skip_upload_aab: true,
        skip_upload_metadata: false,
        skip_upload_changelogs: false,
        skip_upload_images: false,
        skip_upload_screenshots: false
      )
    end
end
```

## Memorizzare i tuoi segreti nei segreti crittografati di GitHub

Per autenticarsi con l'API Google Play Developer, avremo bisogno di una chiave dell'account di servizio. Il file della chiave dell'account di servizio è considerato sensibile, il che significa che dovremo memorizzarlo in modo sicuro, ma in un luogo accessibile dai nostri flussi di lavoro di GitHub Actions e dal nostro Fastfile quando necessario. Entrano in gioco i segreti crittografati di GitHub: memorizzeremo tutte le nostre chiavi sensibili nei segreti del repository, conservandole in modo sicuro e rendendole automaticamente accessibili ai flussi di lavoro di GitHub Actions nel repository.

### Creare e memorizzare la chiave dell'account di servizio di Google Play

Se hai bisogno di creare una nuova chiave dell'account di servizio, [segui i passaggi descritti qui](https://docsrunwayteam/integrations/app-stores/google-play-console/#service-account-api-key-setup). Una volta ottenuto il file JSON della chiave dell'account di servizio, aggiungiamolo ai segreti crittografati del tuo repository GitHub.

Per aggiungere un nuovo segreto ai segreti crittografati di GitHub, prima naviga nel repository Android a cui aggiungerai il flusso di lavoro di GitHub Actions. Sulla destra, fai clic su "Settings".

![Impostazioni nel repository GitHub](/github_project_settingswebp)

Quindi, fai clic su "Secrets",

![Segreti nel repository GitHub, dalle Impostazioni](/github_project_settings_secretswebp)

poi su "Actions" dall'elenco nel menu a sinistra.

![Actions sotto Secrets nel repository GitHub](/github_project_settings_secrets_actionswebp)

Queste sono le variabili d'ambiente segrete crittografate per il repository. Qualsiasi flusso di lavoro configurato nel repository avrà accesso a questi segreti del repository.

Da qui, fai clic su "New repository secret" per aggiungere un nuovo segreto:

![Azione nuovo segreto del repository in GitHub](/github_project_settings_secrets_actions_newwebp)

Quando fai clic su "New repository secret", vedrai un modulo che ti chiederà di inserire un nome per il tuo nuovo segreto e il suo valore.

![Aggiunta di nome e valore per un nuovo segreto in GitHub](/github_project_settings_secrets_actions_new_addwebp)

I segreti di GitHub accettano solo valori stringa, quindi per alcune credenziali (ad esempio file jks o json), dovrai prima convertire il file in una stringa codificata in base64 prima di aggiungerlo ai segreti di GitHub. Puoi farlo dalla riga di comando:

```
base64 in_file_path | pbcopy
```

Questo copia la stringa risultante negli appunti, in modo da poterla incollare direttamente in un nuovo segreto del repository su GitHub.Ecco la traduzione in italiano:

Per esempio:

```
base64 service_account_key.json | pbcopy
```

Creiamo un nuovo segreto del repository come segue:

- PLAY_CONFIG_JSON: la chiave JSON dell'account di servizio codificata in base64

_Si prega di notare che è necessario conservare una copia di backup dei propri segreti in modo sicuro in un'altra posizione (da qualche parte che non siano i segreti crittografati di GitHub), poiché non sarà possibile esportare o accedere nuovamente alle credenziali da GitHub dopo averle aggiunte_

Con la nostra chiave dell'account di servizio aggiunta ai segreti del repository di GitHub, ora possiamo autenticarci con l'API Google Play Developer da qualsiasi flusso di lavoro di GitHub Actions aggiunto al repository

![Nuovo segreto aggiunto con successo in GitHub](/github_project_settings_secrets_addedwebp)

### Archiviazione della chiave di firma Android

Per firmare correttamente le build di rilascio Android in CI, il flusso di lavoro avrà bisogno di accedere a una chiave di caricamento Android o a una chiave di firma dell'app. Le app create dopo agosto 2021 utilizzeranno per impostazione predefinita il nuovo sistema di Google Play App Signing, in cui una chiave di caricamento gestita dall'utente viene utilizzata per firmare gli AAB prima del caricamento, ma la chiave di firma dell'app è gestita da Google. Se il tuo team sta utilizzando Google Play App Signing, allora tutto ciò di cui avrai bisogno per la pipeline CI è la _chiave di caricamento_ della tua app, poiché la firma viene rinviata fino a dopo che l'AAB è stato caricato sulla Play Console. Se hai ancora bisogno di creare una chiave di caricamento e un keystore, segui le [istruzioni](https://developerandroidcom/studio/publish/app-signing/#generate-key/) presenti nella documentazione per sviluppatori Android.

Se il tuo team non è ancora migrato al sistema Google Play App Signing, allora dovrai invece rendere disponibile la tua chiave di _firma_ dell'app al flusso di lavoro CI per firmare correttamente la tua app prima del caricamento.

Aggiungi i seguenti segreti al repository:

- ANDROID_KEYSTORE_FILE: il file `jks` o `keystore` codificato in base64 utilizzato per firmare le tue build Android. Questo sarà il file keystore associato alla tua chiave di caricamento (se usi Play App Signing), o la tua chiave di firma dell'app
- KEYSTORE_KEY_PASSWORD: la password associata al file keystore
- KEYSTORE_KEY_ALIAS: l'alias del key store
- KEYSTORE_STORE_PASSWORD: la password della chiave privata
- DEVELOPER_PACKAGE_NAME: l'ID della tua app Android come com.example.app

Con questi segreti aggiunti ai segreti del repository di GitHub, siamo pronti per configurare il nostro flusso di lavoro di GitHub Actions per eseguire le nostre build

![Più segreti aggiunti con successo in GitHub](/github_project_settings_multi_secrets_addedwebp)

## Configura il file yml del flusso di lavoro di GitHub Actions

Ora, configuriamo il nostro file yml del flusso di lavoro GitHub Actions per Android - definirà i passaggi che eseguiremo come parte del nostro flusso di lavoro. All'interno di questi passaggi, chiameremo le nostre corsie Fastlane.

Innanzitutto, creiamo le cartelle necessarie. Dalla directory radice del tuo progetto, esegui:

```
mkdir .github && cd .github && mkdir workflows && cd workflows && touch build-upload-android.yml
```

Quindi, incolla il seguente codice nel tuo file `build-upload-android.yml` appena creato:

```yaml
name: Build source code on android

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
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
      - uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
      - name: Build
        id: build_code
        run: npm run build
      - name: Sync
        id: sync_code
        run: npx cap sync
      - name: Setup java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

Questo flusso di lavoro dovrebbe essere attivato dopo ogni _tag_ di GitHub, se hai bisogno di automatizzare il tag, fai riferimento a [Build e rilascio automatico con GitHub actions](/blog/automatic-build-and-release-with-github-actions/)

Poi questo flusso di lavoro estrarrà le tue dipendenze Nodejs, le installerà e costruirà la tua app JavaScript.

La tua app non ha bisogno di usare Ionic, solo la base di Capacitor è obbligatoria, può avere vecchi moduli Cordova, ma i plugin JS di Capacitor dovrebbero essere preferiti.

> Ogni volta che invii un nuovo commit, verrà creata una release nel canale beta della console di Google Play

Migliorerò questo blog con i vostri feedback, se avete domande o suggerimenti, fatemi sapere via email martin@capgo.app

## **Elaborazione della build**

In GitHub Actions, **vieni fatturato in base ai minuti** che hai utilizzato per eseguire il tuo flusso di lavoro CI/CD. Dall'esperienza, ci vogliono circa 3-5 minuti prima che una build possa essere elaborata nel Google Play Store.

Per i progetti privati, il costo stimato per build può arrivare fino a **$0,008/min x 5 min = $0,04**.4**, o più, a seconda della configurazione o delle dipendenze del tuo progetto

Per i progetti open-source, questo non dovrebbe essere affatto un problema. Vedi [pricing](https://githubcom/pricing/)

### Grazie

Questo blog si basa sui seguenti articoli:
- [Automatizzare la pubblicazione dell'app sul Google Play Store con GitHub Actions⚡+ Fastlane🏃](https://mediumcom/scalereal/automate-publishing-app-to-the-google-play-store-with-github-actions-fastlane-ac9104712486/)
- [Iniziare con CI/CD per un progetto Android (Parte 3 — GitHub Actions)](https://proandroiddevcom/getting-started-ci-cd-for-android-project-part-3-github-actions-157857224cb1/)
- [Integrazione continua per Android utilizzando Fastlane e CircleCI 2.0 — Parte III](https://mediumcom/pink-room-club/android-continuous-integration-using-fastlane-and-circleci-2-0-part-iii-ccdf5b83d8f5/)
- [Come impostare una pipeline CI/CD per la tua app Android usando Fastlane e GitHub Actions](https://wwwrunwayteam/blog/ci-cd-pipeline-android-app-fastlane-github-actions/)
- [Documentazione di Fastlane](https://docsfastlanetools/getting-started/android/beta-deployment/)
- [Questo messaggio GitHub da @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)