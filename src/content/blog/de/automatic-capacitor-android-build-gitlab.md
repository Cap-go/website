---
slug: automatic-capacitor-android-build-gitlab
title: Build automatico di Capacitor Android con GitLab
description: >-
  So richten Sie in 5 Minuten eine CI/CD-Pipeline für Ihre Android Ionic App mit
  fastlane und GitLab ein
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

# Automatische Android-Builds mit GitLab CI

Die Einrichtung von CI/CD für Capacitor-Apps kann komplex und zeitaufwendig sein. Hier ist, was Sie wissen müssen:

## Voraussetzungen

Bevor Sie beginnen, benötigen Sie:

- Ein GitLab-Konto mit Administratorzugriff
- Ihre App bereits im Google Play Store mit korrekter Signierung veröffentlicht
- Android-Signierungsschlüssel und Keystore-Dateien
- Google Cloud Console-Projekt mit aktivierter Play Store API
- Servicekonto mit entsprechenden Berechtigungen
- Verständnis von GitLab CI/CD-Workflows
- Kenntnisse der Fastlane-Konfiguration
- Zeit für Wartung und Fehlerbehebung der Pipeline

## Professionelles CI/CD-Setup von Capgo

Überspringen Sie die Komplexität. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) konfiguriert Ihre CI/CD-Pipeline direkt in Ihrer bevorzugten Plattform:

- **Plattformunabhängigkeit**: Funktioniert mit GitHub Actions, GitLab CI oder anderen
- **Nahtlose Integration**: Kein Plattformwechsel erforderlich, funktioniert mit Ihrem aktuellen Prozess
- **Maßgeschneiderte Konfiguration**: Angepasstes Setup entsprechend Ihren Projektanforderungen
- **Expertenberatung**: Wir haben bereits CI/CD für über 50 Apps eingerichtet

### Preisgestaltung
- Einmalige Einrichtungsgebühr: 2.600 $
- Ihre laufenden Kosten: ~300 $/Jahr
- Vergleich zu anderen proprietären Lösungen: 6.000 $/Jahr
- **Sparen Sie 26.100 $ über 5 Jahre**

[CI/CD jetzt einrichten](https://calcom/martindonadieu/mobile-ci-cd-done-for-you/)

## Manuelle Einrichtungsanleitung

Wenn Sie dennoch alles selbst einrichten möchten, hier sind die notwendigen Schritte:

**Zu befolgende Schritte in diesem Beitrag**

1. _Fastlane-Dateien kopieren_
2. _Ihre Geheimnisse in GitLab verschlüsselten Secrets speichern_
3. _Google Play-Servicekonto-Schlüssel erstellen und speichern_
4. _Android-Signierungsschlüssel speichern_
5. _GitLab-Workflow-yml-Datei einrichten_

## 1. Fastlane-Dateien kopieren

Fastlane ist eine Ruby-Bibliothek, die zur Automatisierung häufiger Mobile-Development-Aufgaben erstellt wurde. Mit Fastlane können Sie benutzerdefinierte "Lanes" konfigurieren, die eine Reihe von "Actions" bündeln, die Sie normalerweise mit Android Studio ausführen würden. Sie können viel mit Fastlane machen, aber für dieses Tutorial werden wir nur einige zentrale Aktionen verwenden.

Erstellen Sie einen Fastlane-Ordner im Hauptverzeichnis Ihres Projekts und kopieren Sie die folgenden Dateien:
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

### Speichern Ihrer Geheimnisse in GitLab CI/CD-Variablen

GitLab bietet eine Möglichkeit, verschlüsselte CI/CD-Variablen zu speichern, ähnlich wie GitHubs Repository-Secrets. Um Ihre sensiblen Informationen sicher zu speichern:

1. Gehen Sie zu den Einstellungen Ihres GitLab-Projekts
2. Navigieren Sie zu CI/CD > Variables
3. Fügen Sie die folgenden Variablen hinzu:

- ANDROID_KEYSTORE_FILE: Die base64-kodierte `jks`- oder `keystore`-Datei zur Signierung Ihrer Android-Builds. Dies ist entweder die Keystore-Datei Ihres Upload-Schlüssels (bei Verwendung von Play App Signing) oder Ihr App-Signierungsschlüssel
- KEYSTORE_KEY_PASSWORD: Das Passwort für die Keystore-Datei
- KEYSTORE_KEY_ALIAS: Der Keystore-Alias
- KEYSTORE_STORE_PASSWORD: Das Private-Key-Passwort
- DEVELOPER_PACKAGE_NAME: Ihre Android-App-ID wie com.example.app
- PLAY_CONFIG_JSON: Der base64-kodierte Servicekonto-Schlüssel JSON

### Erstellen eines Google Play-Servicekonto-Schlüssels

Um das `PLAY_CONFIG_JSON`-Secret zu generieren, folgen Sie diesen Schritten:

1. Gehen Sie zur [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie ein bestehendes aus
3. Aktivieren Sie die Google Play Android Developer API
4. Erstellen Sie ein Servicekonto:
   - Gehen Sie zu "IAM & Admin" > "Service Accounts"
   - Klicken Sie auf "Create Service Account"
   - Geben Sie einen Namen und eine Beschreibung ein
   - Klicken Sie auf "Create and Continue"
   - Überspringen Sie die Rollenzuweisung und klicken Sie auf "Done"
5. Generieren Sie einen JSON-Schlüssel:
   - Finden Sie Ihr Servicekonto in der Liste
   - Klicken Sie auf das Drei-Punkte-Menü > "Manage keys"
   - Klicken Sie auf "Add Key" > "Create new key"
   - Wählen Sie das JSON-Format
   - Klicken Sie auf "Create"
6. Gewähren Sie dem Servicekonto Zugriff auf Ihre App in der Play Console:
   - Gehen Sie zur [Play Console](https://play.google.com/console)
   - Navigieren Sie zu "Users and permissions"
   - Klicken Sie auf "Invite new users"
   - Geben Sie die Servicekonto-E-Mail ein (endet mit @*.iam.gserviceaccount.com)
   - Gewähren Sie die Berechtigung "Release to production"
   - Klicken Sie auf "Invite user"
7.JSON-Schlüssel in base64 konvertieren:
```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. Fügen Sie die base64-codierte Zeichenkette als `PLAY_CONFIG_JSON`-Variable in GitLab hinzu

## Richten Sie Ihre GitLab CI/CD-Pipeline ein

Erstellen Sie eine gitlab-ci.yml-Datei im Stammverzeichnis Ihres Projekts, um Ihre CI/CD-Pipeline zu definieren. Nachfolgend finden Sie ein Beispiel, wie Sie Ihre Pipeline strukturieren können:

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

Wenn Sie ein neues Tag in Ihr GitLab-Repository pushen, löst GitLab CI/CD automatisch die definierte Pipeline aus, die Ihre Android-App mit Fastlane baut und bereitstellt.

Stellen Sie sicher, dass Sie die Pfade und Abhängigkeiten entsprechend der Struktur und Anforderungen Ihres Projekts anpassen. Diese Einrichtung hilft Ihnen, die Bereitstellung Ihrer Android-App auf GitLab CI/CD zu automatisieren.

## Fazit

Durch die Konfiguration von GitLab CI/CD mit dem mingc/android-build-box Docker-Image können Sie den Android-App-Build-Prozess automatisieren und Ihren Entwicklungsworkflow effizienter und zuverlässiger gestalten. Diese Automatisierung gibt Ihnen Zeit, sich auf die Kernaspekte der App-Entwicklung zu konzentrieren und hilft Ihnen letztendlich dabei, qualitativ hochwertige Android-Apps effizienter bereitzustellen.