---
slug: automatic-capacitor-android-build-gitlab
title: Build Android automatico di Capacitor con GitLab
description: >-
  Come impostare una pipeline CI/CD per la tua app Android Ionic utilizzando
  fastlane e GitLab in 5 minuti
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Illustrazione GitLab di Fastlane Google Play
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: it
next_blog: null
---
# Build Android Automatici con GitLab CI

La configurazione di CI/CD per le app Capacitor può essere complessa e richiedere tempo. Ecco cosa devi sapere:

## Prerequisiti

Prima di iniziare, dovrai configurare:

- Un account GitLab con accesso amministratore
- La tua app già pubblicata su Google Play Store con firma appropriata 
- File chiave di firma e keystore Android
- Progetto Google Cloud Console con API Play Store abilitata
- Account di servizio con permessi appropriati
- Comprensione dei flussi di lavoro GitLab CI/CD
- Conoscenza della configurazione Fastlane
- Tempo per mantenere e debuggare la pipeline

## Setup CI/CD Professionale di Capgo

Salta la complessità. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configura la tua pipeline CI/CD direttamente nella piattaforma che preferisci:

- **Indipendenza dalla Piattaforma**: Funziona con GitHub Actions, GitLab CI o altri
- **Integrazione Perfetta**: Non serve cambiare piattaforma, funziona con il tuo processo attuale
- **Configurazione Personalizzata**: Setup personalizzato in base alle esigenze del progetto
- **Guida Esperta**: Abbiamo già configurato CI/CD per più di 50 app

### Prezzi
- Costo di setup una tantum: $2,600
- Costi di gestione: ~$300/anno
- Confronto con altre soluzioni proprietarie: $6,000/anno
- **Risparmio di $26,100 in 5 anni**

[Configura CI/CD Ora](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you/)

## Guida alla Configurazione Manuale

Se vuoi comunque configurare tutto da solo, ecco cosa devi fare:

**Passaggi da seguire nel post**

1. _Copia i file Fastlane_
2. _Archiviazione dei segreti nei segreti criptati di GitLab_
3. _Creazione e archiviazione della chiave dell'account di servizio Google Play_
4. _Archiviazione della chiave di firma Android_
5. _Configura il tuo file .yml del workflow GitLab_

## 1. Copia i file Fastlane

Fastlane è una libreria Ruby creata per automatizzare le attività comuni dello sviluppo mobile. Usando Fastlane, puoi configurare "lane" personalizzate che raggruppano una serie di "azioni" che eseguono compiti che normalmente faresti usando Android Studio. Puoi fare molto con Fastlane, ma per gli scopi di questo tutorial, useremo solo alcune azioni principali.

Crea una cartella Fastlane nella root del tuo progetto e copia i seguenti file:
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

### Archiviazione dei Segreti nelle Variabili CI/CD di GitLab

GitLab fornisce un modo per archiviare variabili CI/CD crittografate, simili ai segreti del repository di GitHub. Per archiviare le tue informazioni sensibili in modo sicuro:

1. Vai alle Impostazioni del tuo progetto GitLab.
2. Naviga su CI/CD > Variables
3. Aggiungi le seguenti variabili:

-   ANDROID_KEYSTORE_FILE: il file `.jks` o `.keystore` codificato in base64 usato per firmare le tue build Android. Questo sarà il file keystore associato alla tua chiave di upload (se usi Play App Signing) o la tua chiave di firma dell'app.
-   KEYSTORE_KEY_PASSWORD: la password associata al file keystore
-   KEYSTORE_KEY_ALIAS: l'alias del key store
-   KEYSTORE_STORE_PASSWORD: la password della chiave privata
-   DEVELOPER_PACKAGE_NAME: l'ID della tua app Android come com.example.app
-   PLAY_CONFIG_JSON: La chiave JSON dell'account di servizio codificata in base64.

### Creazione di una Chiave dell'Account di Servizio Google Play

Per generare il segreto `PLAY_CONFIG_JSON`, segui questi passaggi:

1. Vai alla [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto o seleziona uno esistente
3. Abilita l'API Google Play Android Developer
4. Crea un account di servizio:
   - Vai su "IAM & Admin" > "Service Accounts"
   - Clicca "Create Service Account"
   - Dagli un nome e una descrizione
   - Clicca "Create and Continue"
   - Salta l'assegnazione del ruolo e clicca "Done"
5. Genera una chiave JSON:
   - Trova il tuo account di servizio nella lista
   - Clicca il menu tre punti > "Manage keys"
   - Clicca "Add Key" > "Create new key"
   - Scegli il formato JSON
   - Clicca "Create"
6. Concedi all'account di servizio l'accesso alla tua app nella Play Console:
   - Vai su [Play Console](https://play.google.com/console)
   - Naviga su "Users and permissions"
   - Clicca "Invite new users"
   - Inserisci l'email dell'account di servizio (termina con @*.iam.gserviceaccount.com)
   - Concedi il permesso "Release to production"
   - Clicca "Invite user"
7. Converti la chiave JSON in base64:
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. Aggiungi la stringa codificata in base64 come variabile `PLAY_CONFIG_JSON` in GitLab

## Configura la Tua Pipeline CI/CD GitLab

Crea un file .gitlab-ci.yml nella root del tuo progetto per definire la tua pipeline CI/CD. Di seguito un esempio di come puoi strutturare la tua pipeline:

```yaml

image: mingc/android-build-box:latest

stages:
  - build
  - upload_to_capgo
  - build_and_upload_android

build:
  stage: build
  tags:
    - saas-linux-xlarge-amd64
  cache:
    - key:
        files:
          - bun.lockb
      paths:
        - .node_modules/
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - node_modules/
      - dist/
  only:
    - master

upload_to_capgo:
  stage: upload_to_capgo
  tags:
    - saas-linux-xlarge-amd64
  script:
    - npx @capgo/cli@latest bundle upload -a $CAPGO_TOKEN -c dev
  dependencies:
    - build
  when: manual
  only:
    - master

build_and_upload_android:
  tags:
    - saas-linux-xlarge-amd64
  stage:    build_and_upload_android
  cache:
    - key:
        files:
          - android/gradle/wrapper/gradle-wrapper.properties
      paths:
        - ~/.gradle/caches/
  script:
    - npx cap sync android
    - npx cap copy android
    - bundle exec fastlane android beta # We do create a tag for the build to trigger XCode cloud builds
  dependencies:
    - build
  when: manual
  only:
    - master

```

## Attiva la Pipeline

Ogni volta che invii un nuovo tag al tuo repository GitLab, GitLab CI/CD attiverà automaticamente la pipeline definita, che costruirà e distribuirà la tua app Android usando Fastlane.

Assicurati di regolare i percorsi e le dipendenze in base alla struttura e ai requisiti del tuo progetto. Questa configurazione ti aiuterà ad automatizzare il deployment della tua app Android su GitLab CI/CD.

## Conclusione

Configurando GitLab CI/CD con l'immagine Docker mingc/android-build-box, puoi automatizzare il processo di build dell'app Android, rendendo il tuo flusso di sviluppo più efficiente e affidabile. Questa automazione libera il tuo tempo per concentrarti sugli aspetti principali dello sviluppo dell'app, aiutandoti in definitiva a distribuire app Android di alta qualità in modo più efficiente.
