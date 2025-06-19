---
slug: automatic-capacitor-android-build-gitlab
title: Automatischer Capacitor Android-Bau mit GitLab
description: >-
  So richten Sie eine CI/CD-Pipeline für Ihre Android Ionic-App mit Fastlane und
  GitLab in 5 Minuten ein.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Fastlane Google Play GitLab Illustration
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: de
next_blog: null
---
# Automatische Android-Bauten mit GitLab CI

Die Einrichtung von CI/CD für Capacitor-Apps kann komplex und zeitaufwendig sein. Hier ist, was Sie wissen müssen:

## Voraussetzungen

Bevor Sie beginnen, müssen Sie Folgendes einrichten:

- Ein GitLab-Konto mit Administratorzugang
- Ihre App bereits im Google Play Store mit korrekter Signatur veröffentlicht
- Android-Signierungsschlüssel und Keystore-Dateien
- Google Cloud Console-Projekt mit aktivierter Play Store API
- Servicekonto mit den richtigen Berechtigungen
- Verständnis der GitLab CI/CD-Workflows
- Kenntnisse in der Fastlane-Konfiguration
- Zeit zur Wartung und Fehlersuche der Pipeline

## Professionelle CI/CD-Einrichtung von Capgo

Überspringen Sie die Komplexität. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) konfiguriert Ihre CI/CD-Pipeline direkt auf Ihrer bevorzugten Plattform:

- **Plattformunabhängigkeit**: Funktioniert mit GitHub Actions, GitLab CI oder anderen
- **Nahtlose Integration**: Kein Plattformwechsel erforderlich, funktioniert mit Ihrem aktuellen Prozess
- **Maßgeschneiderte Konfiguration**: Anpassung des Setups an die Bedürfnisse Ihres Projekts
- **Expertenberatung**: Wir haben bereits CI/CD für über 50 Apps eingerichtet

### Preisgestaltung
- Einmalige Einrichtungsgebühr: 2.600 $
- Ihre laufenden Kosten: ca. 300 $/Jahr
- Vergleich zu anderen proprietären Lösungen: 6.000 $/Jahr
- **Sparen Sie 26.100 $ über 5 Jahre**

[CI/CD jetzt einrichten](https://cal.com/capgo/mobile-ci-cd-done-for-you/)

## Anleitung zur manuellen Einrichtung

Wenn Sie alles selbst einrichten möchten, hier ist, was Sie tun müssen:

**Schritte, die im Beitrag zu befolgen sind**

1.  _Fastlane-Dateien kopieren_
2.  _Speichern Sie Ihre Geheimnisse in GitLab-verschlüsselten Geheimnissen_
3.  _Erstellen und Speichern Ihres Google Play-Servicekonto-Keys_
4.  _Speichern Ihres Android-Signierungsschlüssels_
5.  _Richten Sie Ihre GitLab-Workflow-.yml-Datei ein_

## 1. Fastlane-Dateien kopieren

Fastlane ist eine Ruby-Bibliothek, die entwickelt wurde, um gängige mobile Entwicklungsaufgaben zu automatisieren. Mit Fastlane können Sie benutzerdefinierte "Lanes" konfigurieren, die eine Reihe von "Aktionen" bündeln, die Aufgaben ausführen, die Sie normalerweise mit Android Studio ausführen würden. Sie können viel mit Fastlane machen, aber für die Zwecke dieses Tutorials verwenden wir nur eine Handvoll grundlegender Aktionen.

Erstellen Sie einen Fastlane-Ordner im Stammverzeichnis Ihres Projekts und kopieren Sie die folgenden Dateien:
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

### Speichern Sie Ihre Geheimnisse in GitLab CI/CD-Variablen

GitLab bietet eine Möglichkeit, verschlüsselte CI/CD-Variablen zu speichern, ähnlich den Repository-Geheimnissen von GitHub. Um Ihre sensiblen Informationen sicher zu speichern.

1. Gehen Sie zu den Einstellungen Ihres GitLab-Projekts.
2. Navigieren Sie zu CI/CD > Variablen
3. Fügen Sie die folgenden Variablen hinzu:

-   ANDROID_KEYSTORE_FILE: die base64-kodierte `.jks` oder `.keystore`-Datei, die zum Signieren Ihrer Android-Bauten verwendet wird. Dies wird entweder die Keystore-Datei sein, die mit Ihrem Upload-Schlüssel verknüpft ist (wenn Sie Play App Signing verwenden), oder Ihr App-Signierungsschlüssel.
-   KEYSTORE_KEY_PASSWORD: das Passwort, das mit der Keystore-Datei verknüpft ist
-   KEYSTORE_KEY_ALIAS: der Alias des Keystores
-   KEYSTORE_STORE_PASSWORD: das Passwort des privaten Schlüssels
-   DEVELOPER_PACKAGE_NAME: Ihre Android-App-ID wie com.example.app
-   PLAY_CONFIG_JSON: Der base64-kodierte Dienstkonto-Schlüssel JSON.

### Erstellen eines Google Play-Servicekonto-Keys

Um das Geheimnis `PLAY_CONFIG_JSON` zu generieren, befolgen Sie diese Schritte:

1. Gehen Sie zur [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie ein bestehendes aus
3. Aktivieren Sie die Google Play Android Developer API
4. Erstellen Sie ein Servicekonto:
   - Gehen Sie zu "IAM & Admin" > "Servicekonten"
   - Klicken Sie auf "Servicekonto erstellen"
   - Geben Sie ihm einen Namen und eine Beschreibung
   - Klicken Sie auf "Erstellen und Fortfahren"
   - Überspringen Sie die Rollenzuweisung und klicken Sie auf "Fertig"
5. Generieren Sie einen JSON-Schlüssel:
   - Finden Sie Ihr Servicekonto in der Liste
   - Klicken Sie auf das Menü mit den drei Punkten > "Schlüssel verwalten"
   - Klicken Sie auf "Schlüssel hinzufügen" > "Neuen Schlüssel erstellen"
   - Wählen Sie das JSON-Format
   - Klicken Sie auf "Erstellen"
6. Gewähren Sie dem Servicekonto Zugriff auf Ihre App in der Play Console:
   - Gehen Sie zur [Play Console](https://play.google.com/console)
   - Navigieren Sie zu "Benutzer und Berechtigungen"
   - Klicken Sie auf "Neue Benutzer einladen"
   - Geben Sie die E-Mail-Adresse des Servicekontos ein (endet mit @*.iam.gserviceaccount.com)
   - Gewähren Sie die Berechtigung "In Produktion veröffentlichen"
   - Klicken Sie auf "Benutzer einladen"
7. Konvertieren Sie den JSON-Schlüssel in base64:
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. Fügen Sie die base64-kodierte Zeichenfolge als die `PLAY_CONFIG_JSON`-Variablen in GitLab hinzu

## Richten Sie Ihre GitLab CI/CD-Pipeline ein

Erstellen Sie eine .gitlab-ci.yml-Datei im Stammverzeichnis Ihres Projekts, um Ihre CI/CD-Pipeline zu definieren. Unten finden Sie ein Beispiel, wie Sie Ihre Pipeline strukturieren können:

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

## Pipeline auslösen

Immer wenn Sie ein neues Tag in Ihr GitLab-Repository pushen, wird GitLab CI/CD automatisch die definierte Pipeline auslösen, die Ihre Android-App mit Fastlane baut und bereitstellt.

Stellen Sie sicher, die Pfade und Abhängigkeiten entsprechend der Struktur und den Anforderungen Ihres Projekts anzupassen. Dieses Setup hilft Ihnen, die Bereitstellung Ihrer Android-App auf GitLab CI/CD zu automatisieren.

## Fazit

Durch die Konfiguration von GitLab CI/CD mit dem mingc/android-build-box Docker-Image können Sie den Build-Prozess für Android-Apps automatisieren, wodurch Ihr Entwicklungsworkflow effizienter und zuverlässiger wird. Diese Automatisierung gibt Ihnen mehr Zeit, sich auf die zentralen Aspekte der App-Entwicklung zu konzentrieren, was Ihnen letztendlich hilft, hochwertige Android-Apps effizienter bereitzustellen.
