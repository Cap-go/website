---
slug: automatic-capacitor-android-build-gitlab
title: Automatischer Capacitor-Android-Build mit GitLab
description: >-
  So richten Sie eine CI/CD-Pipeline für Ihre Android Ionic App mit fastlane und
  GitLab in 5 Minuten ein
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Fastlane Google Play GitLab-Illustration
tag: CI/CD
published: true
locale: de
next_blog: null
---

## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren...

- Stellen Sie sicher, dass Sie GitLab verwenden
- Ihre App ist bereits im Google Play Store veröffentlicht
- Lust zum Lesen 😆...

**Schritte, die im Beitrag befolgt werden**

1. _Fastlane-Dateien kopieren_
2. _Ihre Geheimnisse in GitLab verschlüsselten Geheimnissen speichern_
3. _Erstellen und Speichern Ihres Google Play-Dienstkontos-Schlüssels_
4. _Speichern Ihres Android-Signaturschlüssels_
5. _Einrichten Ihrer GitLab-Workflow-yml-Datei_

## 1. Fastlane-Dateien kopieren

Fastlane ist eine Ruby-Bibliothek, die erstellt wurde, um häufige mobile Entwicklungsaufgaben zu automatisieren. Mit Fastlane können Sie benutzerdefinierte "Lanes" konfigurieren, die eine Reihe von "Aktionen" bündeln, die Aufgaben ausführen, die Sie normalerweise mit Android Studio durchführen würden. Sie können viel mit Fastlane machen, aber für die Zwecke dieses Tutorials werden wir nur eine Handvoll Kernaktionen verwenden.

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

GitLab bietet eine Möglichkeit, verschlüsselte CI/CD-Variablen zu speichern, ähnlich wie GitHub's Repository-Geheimnisse. Um Ihre sensiblen Informationen sicher zu speichern:

1. Gehen Sie zu den Einstellungen Ihres GitLab-Projekts
2. Navigieren Sie zu CI/CD > Variablen
3. Fügen Sie die folgenden Variablen hinzu:

- ANDROID_KEYSTORE_FILE: die base64-codierte `jks` oder `keystore` Datei, die zum Signieren Ihrer Android-Builds verwendet wird. Dies wird entweder die Keystore-Datei sein, die mit Ihrem Upload-Schlüssel verbunden ist (wenn Sie Play App Signing verwenden), oder Ihr App-Signaturschlüssel
- KEYSTORE_KEY_PASSWORD: das mit der Keystore-Datei verbundene Passwort
- KEYSTORE_KEY_ALIAS: der Keystore-Alias
- KEYSTORE_STORE_PASSWORD: das Passwort des privaten Schlüssels
- DEVELOPER_PACKAGE_NAME: Ihre Android-App-ID wie com.example.app
- PLAY_CONFIG_JSON: Der base64-codierte Dienstkonto-Schlüssel JSON

## Einrichten Ihrer GitLab CI/CD-Pipeline

Erstellen Sie eine .gitlab-ci.yml Datei im Hauptverzeichnis Ihres Projekts, um Ihre CI/CD-Pipeline zu definieren. Hier ist ein Beispiel, wie Sie Ihre Pipeline strukturieren können:

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
    - npx @capgo/cli@latest upload -a $CAPGO_TOKEN -c dev
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

Wenn Sie ein neues Tag zu Ihrem GitLab-Repository pushen, wird GitLab CI/CD automatisch die definierte Pipeline auslösen, die Ihre Android-App mit Fastlane baut und bereitstellt.

Stellen Sie sicher, dass Sie die Pfade und Abhängigkeiten entsprechend der Struktur und den Anforderungen Ihres Projekts anpassen. Diese Einrichtung wird Ihnen helfen, die Bereitstellung Ihrer Android-App auf GitLab CI/CD zu automatisieren.

## Fazit

Durch die Konfiguration von GitLab CI/CD mit dem mingc/android-build-box Docker-Image können Sie den Android-App-Bauprozess automatisieren und Ihren Entwicklungsworkflow effizienter und zuverlässiger gestalten. Diese Automatisierung gibt Ihnen Zeit, sich auf die Kernaspekte der App-Entwicklung zu konzentrieren und hilft Ihnen letztendlich, qualitativ hochwertige Android-Apps effizienter zu liefern.