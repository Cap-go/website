---
slug: automatic-capacitor-android-build-github-action
title: Build Android automatico di Capacitor con GitHub actions
description: >-
  Come impostare una pipeline CI/CD per la tua app Android Capacitor utilizzando
  fastlane e GitHub Actions in 5 minuti
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Illustrazione dell'azione GitHub per Fastlane Google Play
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates, Capacitor
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-ios-build-github-action
---
# Build automatici di Android con GitHub Actions

Configurare CI/CD per le app Capacitor può essere complesso e richiedere tempo. Ecco cosa devi sapere:

## Prerequisiti

Prima di iniziare, dovrai configurare:

- Un account GitHub con accesso admin
- La tua app già pubblicata su Google Play Store con la firma appropriata
- File di firma e keystore Android 
- Progetto Google Cloud Console con API Play Store abilitata
- Account di servizio con permessi appropriati
- Comprensione dei workflow di GitHub Actions
- Conoscenza della configurazione Fastlane
- Tempo per mantenere e debuggare la pipeline

## Setup CI/CD Professionale di Capgo

Salta la complessità. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configura la tua pipeline CI/CD direttamente nella piattaforma che preferisci:

- **Indipendenza dalla Piattaforma**: Funziona con GitHub Actions, GitLab CI o altri
- **Integrazione Perfetta**: Nessun cambio di piattaforma necessario, funziona con il tuo processo attuale
- **Configurazione Personalizzata**: Setup personalizzato in base alle esigenze del progetto
- **Guida Esperta**: Abbiamo già configurato CI/CD per più di 50 app

### Prezzi
- Costo una tantum per setup: $2,600
- I tuoi costi di gestione: ~$300/anno
- Confronto con altre soluzioni proprietarie: $6,000/anno
- **Risparmio di $26,100 in 5 anni**

[Configura CI/CD Ora](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Guida alla Configurazione Manuale

Se vuoi comunque configurare tutto da solo, ecco cosa devi fare:

## Prezzi GitHub Actions

![Price GitHub Action](/price_github_actions.webp)

GitHub Actions offre minuti gratuiti in base al tipo di repository:
- Repository pubblici: 2,000 minuti/mese
- Repository privati: 2,000 minuti/mese (runner Linux)

Per progetti privati, i costi sono circa $0.008/minuto. Una build tipica richiede 3-5 minuti.

## Passi per la Configurazione Manuale

1. Configurare Fastlane
2. Configurare i segreti GitHub
3. Creare il workflow GitHub Actions

## 1. Configurare Fastlane

Crea una cartella `fastlane` nella root del progetto e aggiungi un `Fastfile` con questo contenuto:

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
        
        # Get previous build number and increment
        previous_build_number = google_play_track_version_codes(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            track: "internal",
            json_key_data: json_key_data,
        )[0]
        current_build_number = previous_build_number + 1
        sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        
        # Build the app
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
        
        # Upload to Play Store
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
end
```

## 2. Configurare i Segreti GitHub

Devi memorizzare le informazioni sensibili in modo sicuro in GitHub. Vai su repository → Settings → Secrets and variables → Actions → New repository secret.

### Segreti Necessari:

1. **Chiave Account di Servizio Google Play**
   - Crea un account di servizio in Google Cloud Console
   - Abilita l'API Google Play Developer
   - Concedi all'account di servizio l'accesso alla tua app in Play Console
   - Scarica il file chiave JSON
   - Converti in base64: `base64 service_account_key.json | pbcopy`
   - Aggiungi come `PLAY_CONFIG_JSON`

2. **Chiave di Firma Android**
   - Converti il tuo keystore in base64: `base64 your_keystore.jks | pbcopy`
   - Aggiungi come `ANDROID_KEYSTORE_FILE`
   - Aggiungi i dettagli del keystore:
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME` (es. com.example.app)

## 3. Creare il Workflow GitHub Actions

Crea `.github/workflows/build-upload-android.yml`:

```yaml
name: Build and Deploy Android App

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      
      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      - name: Build app
        run: npm run build
        
      - name: Sync Capacitor
        run: npx cap sync
        
      - name: Setup Java
        uses: actions/setup-node@v5
        with:
            distribution: 'zulu'
            java-version: '17'
            
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Run Fastlane
        uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
          
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

## Come Funziona

1. Crea un tag Git per attivare il workflow
2. GitHub Actions costruisce la tua app
3. Fastlane la carica sul canale beta di Google Play
4. La tua app viene aggiornata automaticamente

## Tempi e Costi di Build

- Tempo di build: 3-5 minuti
- Costo per repository privati: ~$0.04 per build
- Gratuito per progetti open-source

## Risorse

- [Documentazione GitHub Actions](https://docs.github.com/en/actions/)
- [Documentazione Fastlane](https://docs.fastlane.tools/)
