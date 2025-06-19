---
slug: automatic-capacitor-android-build-github-action
title: Automatischer Capacitor Android Build mit GitHub Actions
description: >-
  So richtest du in 5 Minuten eine CI/CD-Pipeline für deine Android Capacitor
  App mit fastlane und GitHub Actions ein
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2024-06-01T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Fastlane Google Play GitHub Action Illustration
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates, Capacitor
tag: CI/CD
published: true
locale: de
next_blog: automatic-capacitor-ios-build-github-action
---
Das Einrichten von CI/CD für Capacitor-Apps kann komplex und zeitaufwendig sein. Hier ist, was Sie wissen müssen:

## Voraussetzungen

Vor dem Start benötigen Sie:

- Ein GitHub-Konto mit Administratorzugriff
- Ihre App bereits im Google Play Store mit korrekter Signierung veröffentlicht
- Android Signierungsschlüssel und Keystore-Dateien
- Google Cloud Console Projekt mit aktivierter Play Store API
- Servicekonto mit entsprechenden Berechtigungen
- Verständnis von GitHub Actions Workflows
- Kenntnisse der Fastlane-Konfiguration
- Zeit für Wartung und Fehlerbehebung der Pipeline

## Professionelles CI/CD-Setup von Capgo

Überspringen Sie die Komplexität. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) konfiguriert Ihre CI/CD-Pipeline direkt in Ihrer bevorzugten Plattform:

- **Plattformunabhängigkeit**: Funktioniert mit GitHub Actions, GitLab CI oder anderen
- **Nahtlose Integration**: Kein Plattformwechsel erforderlich, arbeitet mit Ihrem aktuellen Prozess
- **Maßgeschneiderte Konfiguration**: Angepasstes Setup entsprechend Ihren Projektanforderungen
- **Expertenberatung**: Wir haben bereits CI/CD für über 50 Apps eingerichtet

### Preisgestaltung
- Einmalige Einrichtungsgebühr: 2.600 €
- Ihre laufenden Kosten: ~300 €/Jahr
- Vergleich zu anderen proprietären Lösungen: 6.000 €/Jahr
- **Sparen Sie 26.100 € über 5 Jahre**

[CI/CD jetzt einrichten](https://cal.com/capgo/mobile-ci-cd-done-for-you/)

## Manuelle Einrichtungsanleitung

Wenn Sie dennoch alles selbst einrichten möchten, hier sind die notwendigen Schritte:

## GitHub Actions Preise

![Price GitHub Action](/price_github_actions.webp)

GitHub Actions bietet kostenlose Minuten basierend auf Ihrem Repository-Typ:
- Öffentliche Repositories: 2.000 Minuten/Monat
- Private Repositories: 2.000 Minuten/Monat (Linux-Runner)

Für private Projekte betragen die Kosten etwa 0,008 €/Minute. Ein typischer Build dauert 3-5 Minuten.

## Manuelle Einrichtungsschritte

1. Fastlane einrichten
2. GitHub-Secrets konfigurieren
3. GitHub Actions Workflow erstellen

## 1. Fastlane einrichten

Erstellen Sie einen `fastlane`-Ordner im Projektverzeichnis und fügen Sie einen `Fastfile` mit diesem Inhalt hinzu:

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

## 2. GitHub-Secrets konfigurieren

Sie müssen sensible Informationen sicher in GitHub speichern. Gehen Sie zu Ihrem Repository → Settings → Secrets and variables → Actions → New repository secret.

### Erforderliche Secrets:

1. **Google Play Service Account Key**
   - Erstellen Sie ein Servicekonto in der Google Cloud Console
   - Aktivieren Sie die Google Play Developer API
   - Gewähren Sie dem Servicekonto Zugriff auf Ihre App in der Play Console
   - Laden Sie die JSON-Schlüsseldatei herunter
   - Konvertieren Sie zu base64: `base64 service_account_key.json | pbcopy`
   - Fügen Sie als `PLAY_CONFIG_JSON` hinzu

2. **Android Signing Key**
   - Konvertieren Sie Ihren Keystore zu base64: `base64 your_keystore.jks | pbcopy`
   - Fügen Sie als `ANDROID_KEYSTORE_FILE` hinzu
   - Fügen Sie Keystore-Details hinzu:
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME` (z.B. com.example.app)

## 3. GitHub Actions Workflow erstellen

Erstellen Sie `.github/workflows/build-upload-android.yml`:

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
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
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
        uses: actions/setup-java@v4
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

## Funktionsweise

1. Erstellen Sie einen Git-Tag, um den Workflow auszulösen
2. GitHub Actions baut Ihre App
3. Fastlane lädt sie in den Google Play Beta-Kanal hoch
4. Ihre App wird automatisch aktualisiert

## Bauzeit und Kosten

- Bauzeit: 3-5 Minuten
- Kosten für private Repos: ~0,04 € pro Build
- Kostenlos für Open-Source-Projekte

## Ressourcen

- [GitHub Actions Documentation](https://docs.github.com/en/actions/)
- [Fastlane Documentation](https://docs.fastlane.tools/)
