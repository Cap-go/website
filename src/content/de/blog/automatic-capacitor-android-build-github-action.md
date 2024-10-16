---
slug: automatic-capacitor-android-build-github-action
title: Automatischer Capacitor-Android-Build mit GitHub-Actions
description: >-
  So richtest du in 5 Minuten eine CI/CD-Pipeline für deine Android-Ionic-App
  mit fastlane und GitHub Actions ein (2022)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2022-10-27T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Fastlane Google Play GitHub Action Illustration
tag: CI/CD
published: true
locale: de
next_blog: automatic-capacitor-ios-build-github-action
---

## Kontinuierliche Auslieferung für Android mit Fastlane und GitHub Actions

## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren…

- Stellen Sie sicher, dass Sie GitHub verwenden
- Ihre App ist bereits im Google Play Store veröffentlicht
- Lust zum Lesen 😆…

## Wichtiges zum Preis

![Preis GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Der Service ist bis zu einem Limit 'kostenlos', abhängig von der gewählten Maschine.
Wir werden eine **_Linux_**-Maschine verwenden. In der Abbildung sehen Sie den Preis und die Limits (Preise zum Zeitpunkt der Erstellung des Tutorials, sie könnten sich in Zukunft ändern).

🔴 **_Nach dieser Warnung zu Anforderungen und Preisen fahren wir fort, wenn Sie möchten_**

> **_📣_ In diesem Beitrag gehen wir davon aus, dass wir die App im Google Play erstellt haben und über den Signierungsschlüssel des Google-Ökosystems verfügen**

## Jetzt geht's los 🧑🏽💻

**Schritte, die wir in diesem Beitrag befolgen werden**

1. _Fastlane-Dateien kopieren_
2. _Ihre Geheimnisse in GitHub verschlüsselten Geheimnissen speichern_
3. _Erstellen und Speichern Ihres Google Play-Dienstkontos-Schlüssels_
4. _Speichern Ihres Android-Signierungsschlüssels_
5. _Einrichten Ihrer GitHub Actions Workflow yml-Datei_

## 1. Fastlane-Dateien kopieren

Fastlane ist eine Ruby-Bibliothek, die zur Automatisierung häufiger Aufgaben in der mobilen Entwicklung erstellt wurde. Mit Fastlane können Sie benutzerdefinierte "Lanes" konfigurieren, die eine Reihe von "Actions" bündeln, die Aufgaben ausführen, die Sie normalerweise mit Android Studio durchführen würden. Sie können viel mit Fastlane machen, aber für die Zwecke dieses Tutorials werden wir nur eine Handvoll Kernaktionen verwenden.

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

## Speichern Ihrer Geheimnisse in GitHub verschlüsselten Geheimnissen

Um sich bei der Google Play Developer API zu authentifizieren, benötigen wir einen Dienstkonto-Schlüssel. Die Dienstkonto-Schlüsseldatei gilt als sensibel, was bedeutet, dass wir sie sicher speichern müssen, aber an einem Ort, an dem sie von unseren GitHub Actions-Workflows und unserem Fastfile bei Bedarf aufgerufen werden kann. Hier kommen GitHubs verschlüsselte Geheimnisse ins Spiel: Wir werden alle unsere sensiblen Schlüssel in Repository-Geheimnissen speichern, um sie sicher aufzubewahren und gleichzeitig automatisch für die GitHub Actions-Workflows im Repository zugänglich zu machen.

### Erstellen und Speichern Ihres Google Play-Dienstkontos-Schlüssels

Wenn Sie einen neuen Dienstkonto-Schlüssel erstellen müssen, [folgen Sie den hier beschriebenen Schritten](https://docsrunwayteam/integrations/app-stores/google-play-console/#service-account-api-key-setup). Sobald Sie Ihre JSON-Datei mit dem Dienstkonto-Schlüssel haben, fügen wir sie zu den verschlüsselten Geheimnissen Ihres GitHub-Repositories hinzu.

Um ein neues Geheimnis zu GitHubs verschlüsselten Geheimnissen hinzuzufügen, navigieren Sie zunächst zum Android-Repository, dem Sie den GitHub Actions-Workflow hinzufügen möchten. Klicken Sie ganz rechts auf "Settings".

![Einstellungen im GitHub-Repository](/github_project_settingswebp)

Klicken Sie dann auf "Secrets",

![Geheimnisse im GitHub-Repository, von den Einstellungen aus](/github_project_settings_secretswebp)

dann auf "Actions" aus der Liste im linken Menü.

![Actions unter Geheimnisse im GitHub-Repository](/github_project_settings_secrets_actionswebp)

Dies sind die verschlüsselten geheimen Umgebungsvariablen für das Repository. Alle Workflows, die im Repository eingerichtet sind, haben Zugriff auf diese Repository-Geheimnisse.

Klicken Sie hier auf "New repository secret", um ein neues Geheimnis hinzuzufügen:

![Aktion für neues Repository-Geheimnis in GitHub](/github_project_settings_secrets_actions_newwebp)

Wenn Sie auf "New repository secret" klicken, sehen Sie ein Formular, das Sie auffordert, einen Namen für Ihr neues Geheimnis und seinen Wert einzugeben.

![Hinzufügen von Name und Wert für neues Geheimnis in GitHub](/github_project_settings_secrets_actions_new_addwebp)

GitHub-Geheimnisse akzeptieren nur Zeichenkettenwerte, daher müssen Sie für bestimmte Anmeldeinformationen (z.B. jks- oder json-Dateien) die Datei zuerst in eine base64-codierte Zeichenkette umwandeln, bevor Sie sie zu GitHub-Geheimnissen hinzufügen. Sie können dies von der Kommandozeile aus tun:

```
base64 in_file_path | pbcopy
```

Dies kopiert die resultierende Zeichenkette in Ihre Zwischenablage, sodass Sie sie direkt in ein neues Repository-Geheimnis auf GitHub einfügen können.Hier ist die Übersetzung des Textes ins Deutsche:

Zum Beispiel:

```
base64 service_account_key.json | pbcopy
```

Erstellen wir ein neues Repository-Geheimnis wie folgt:

- PLAY_CONFIG_JSON: der base64-kodierte Service-Account-Schlüssel JSON

_Bitte beachten Sie, dass Sie eine Sicherungskopie Ihrer Geheimnisse an einem anderen Ort sicher aufbewahren sollten (irgendwo, das nicht GitHub verschlüsselte Geheimnisse sind), da Sie die Anmeldeinformationen nach dem Hinzufügen nicht mehr aus GitHub exportieren oder darauf zugreifen können_

Mit unserem Service-Account-Schlüssel, der zu den GitHub-Repository-Geheimnissen hinzugefügt wurde, können wir uns jetzt von jedem GitHub Actions Workflow, der dem Repository hinzugefügt wurde, mit der Google Play Developer API authentifizieren

![Neues Geheimnis erfolgreich in GitHub hinzugefügt](/github_project_settings_secrets_addedwebp)

### Speichern Ihres Android-Signaturschlüssels

Um Android-Release-Builds in CI ordnungsgemäß zu signieren, benötigt der Workflow Zugriff auf entweder einen Android-Upload-Schlüssel oder einen App-Signaturschlüssel. Apps, die nach August 2021 erstellt wurden, verwenden standardmäßig Googles neues Play App Signing-System, bei dem ein vom Benutzer verwalteter Upload-Schlüssel verwendet wird, um AABs vor dem Upload zu signieren, aber der App-Signaturschlüssel von Google verwaltet wird. Wenn Ihr Team Googles Play App Signing nutzt, benötigen Sie für die CI-Pipeline nur den Upload-Schlüssel Ihrer App, da die Signierung erst nach dem Upload des AAB in die Play Console erfolgt. Wenn Sie noch einen Upload-Schlüssel und Keystore erstellen müssen, befolgen Sie die Anweisungen in der Android-Entwicklerdokumentation

Wenn Ihr Team noch nicht zum Google Play App Signing-System migriert ist, müssen Sie stattdessen Ihren App-Signaturschlüssel für den CI-Workflow verfügbar machen, um Ihre App vor dem Upload ordnungsgemäß zu signieren

Fügen Sie Folgendes als Repository-Geheimnisse hinzu:

- ANDROID_KEYSTORE_FILE: die base64-kodierte `jks`- oder `keystore`-Datei, die zum Signieren Ihrer Android-Builds verwendet wird. Dies ist entweder die Keystore-Datei, die mit Ihrem Upload-Schlüssel verbunden ist (bei Verwendung von Play App Signing), oder Ihr App-Signaturschlüssel
- KEYSTORE_KEY_PASSWORD: das Passwort für die Keystore-Datei
- KEYSTORE_KEY_ALIAS: der Keystore-Alias
- KEYSTORE_STORE_PASSWORD: das private Schlüssel-Passwort
- DEVELOPER_PACKAGE_NAME: Ihre Android-App-ID wie com.example.app

Mit diesen zu GitHub's Repository-Geheimnissen hinzugefügten Geheimnissen sind wir bereit, unseren GitHub Actions Workflow für unsere Builds einzurichten

![Mehrere Geheimnisse erfolgreich in GitHub hinzugefügt](/github_project_settings_multi_secrets_addedwebp)

## Einrichten Ihrer GitHub Actions Workflow yml-Datei

Jetzt richten wir unsere Android GitHub Actions Workflow yml-Datei ein – sie wird die Schritte definieren, die wir als Teil unseres Workflows ausführen werden. In diesen Schritten werden wir unsere Fastlane-Lanes aufrufen

Erstellen wir zunächst die notwendigen Ordner. Rufen Sie aus dem Stammverzeichnis Ihres Projekts auf:

```
mkdir .github && cd .github && mkdir workflows && cd workflows && touch build-upload-android.yml
```

Fügen Sie dann den folgenden Code in Ihre neu erstellte `build-upload-android.yml`-Datei ein:

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

Dieser Workflow sollte nach jedem GitHub-Tag ausgelöst werden. Wenn Sie das Tagging automatisieren müssen, lesen Sie bitte [Automatischer Build und Release mit GitHub Actions](/blog/automatic-build-and-release-with-github-actions/)

Dann wird dieser Workflow Ihre Nodejs-Abhängigkeiten abrufen, sie installieren und Ihre JavaScript-App bauen

Ihre App muss nicht Ionic verwenden, nur Capacitor-Basis ist obligatorisch. Sie kann alte Cordova-Module haben, aber Capacitor JS-Plugins sollten bevorzugt werden

> Jedes Mal, wenn Sie einen neuen Commit senden, wird ein Release in der Google Play Console, Beta-Kanal, erstellt

Ich werde diesen Blog mit Ihrem Feedback verbessern. Wenn Sie Fragen oder Vorschläge haben, lassen Sie es mich bitte per E-Mail wissen: martin@capgo.app

## **Build-Verarbeitung**

Bei GitHub Actions werden Sie basierend auf den Minuten abgerechnet, die Sie für die Ausführung Ihres CI/CD-Workflows verwendet haben. Aus Erfahrung dauert es etwa 3-5 Minuten, bevor ein Build im Google Play Store verarbeitet werden kann

Für private Projekte können die geschätzten Kosten pro Build bis zu **0,008 $/min x 5 min = 0,04 $** betragen4** oder mehr, abhängig von der Konfiguration oder den Abhängigkeiten Ihres Projekts

Für Open-Source-Projekte sollte dies überhaupt kein Problem sein. Siehe [pricing](https://githubcom/pricing/)

### Danke

Dieser Blog basiert auf den folgenden Artikeln:
- [Automate publishing app to the Google Play Store with GitHub Actions⚡+ Fastlane🏃](https://mediumcom/scalereal/automate-publishing-app-to-the-google-play-store-with-github-actions-fastlane-ac9104712486/)
- [Getting Started CI/CD for Android Project (Part - 3— GitHub Actions)](https://proandroiddevcom/getting-started-ci-cd-for-android-project-part-3-github-actions-157857224cb1/)
- [Android Continuous Integration using Fastlane and CircleCI 20 — Part III](https://mediumcom/pink-room-club/android-continuous-integration-using-fastlane-and-circleci-2-0-part-iii-ccdf5b83d8f5/)
- [How to set up a CI/CD pipeline for your Android app using Fastlane and GitHub Actions](https://wwwrunwayteam/blog/ci-cd-pipeline-android-app-fastlane-github-actions/)
- [Fastlane Documentation](https://docsfastlanetools/getting-started/android/beta-deployment/)
- [This GitHub message from @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)