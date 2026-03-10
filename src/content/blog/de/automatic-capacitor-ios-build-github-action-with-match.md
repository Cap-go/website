---
slug: automatic-capacitor-ios-build-github-action-with-match
title: >-
  Automatischer Capacitor iOS-Build mit GitHub Actions unter Verwendung von
  match
description: >-
  So richten Sie eine CI/CD-Pipeline für Ihre iOS Ionic-App mit fastlane und
  GitHub Actions in 5 Minuten ein (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2026-03-10T13:30:16.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane TestFlight GitHub Action Illustration
tag: CI/CD
published: true
locale: de
next_blog: automatic-capacitor-android-build-github-action
---

## Kontinuierliche Auslieferung für iOS mit Fastlane und GitHub Actions unter Verwendung von match

## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren...

- Stellen Sie sicher, dass Sie Fastlane auf Ihrem Entwicklungsrechner [installiert](https://docs.fastlane.tools/) haben
- iOS-Entwicklerprogramm-Mitgliedschaft
- Lust zum Lesen 😆...
- Ein Team aus vielen Entwicklern, ansonsten empfehlen wir die Verwendung von [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) für einfachere Workflows

## Wichtiges zum Preis

![Preis GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

Der Service ist bis zum Limit 'kostenlos', abhängig von der gewählten Maschine  
Wir werden eine **_macOS_**-Maschine verwenden, Sie können im Screenshot den Preis und die Limits sehen (Preise zum Zeitpunkt der Erstellung des Tutorials, sie könnten sich in Zukunft ändern)

🔴 **_Nachdem wir über Anforderungen und Preise gewarnt haben, fahren wir fort, wenn Sie möchten..._**

> **_📣_ In diesem Beitrag gehen wir davon aus, dass wir die App in iTunes Connect erstellt haben, wir haben die Zertifikate des Apple-Ökosystems, alles wird von Fastlane kopiert!**

## Lass uns loslegen 🧑🏽‍💻

**Schritte, die im Beitrag zu befolgen sind**

1. _Verwendung der App Store Connect API mit Fastlane Match_
2. _Anforderungen_
3. _Erstellung eines App Store Connect API-Schlüssels_
4. _Verwendung eines App Store Connect API-Schlüssels_
5. _Kopieren der Fastlane-Dateien_
6. _Konfiguration von Fastlane match_

## 1. Verwendung der App Store Connect API mit Fastlane Match

> Ab Februar 2021 ist die Zwei-Faktor-Authentifizierung oder Zwei-Schritt-Verifizierung für alle Benutzer erforderlich, um sich bei App Store Connect anzumelden. Diese zusätzliche Sicherheitsebene für Ihre Apple-ID hilft sicherzustellen, dass nur Sie auf Ihr Konto zugreifen können.  
> Von [Apple Support](https://developer.apple.com/support/authentication/)

> Der Einstieg in match erfordert, dass Sie Ihre bestehenden Zertifikate widerrufen. Aber keine Sorge, Sie erhalten direkt das neue

## Anforderungen

Um die App Store Connect API nutzen zu können, benötigt Fastlane **drei** Dinge:

1. Aussteller-ID
2. Schlüssel-ID
3. Schlüsseldatei oder Schlüsselinhalt

## Erstellung eines App Store Connect API-Schlüssels

Um Schlüssel zu generieren, müssen Sie über Administratorberechtigungen in App Store Connect verfügen. Wenn Sie diese Berechtigung nicht haben, können Sie die relevante Person auf diesen Artikel verweisen und die folgenden Anweisungen befolgen:

1 — Melden Sie sich bei [App Store Connect](https://appstoreconnect.apple.com/) an

2 — Wählen Sie [Benutzer und Zugriff](https://appstoreconnect.apple.com/access/users/)

![App Store Connect Benutzerzugriff](/select_user_access.webp)

3 — Wählen Sie die Registerkarte API-Schlüssel

![App Store Connect API-Schlüssel](/user_access_keys.webp)

4 — Klicken Sie auf API-Schlüssel generieren oder auf die Schaltfläche Hinzufügen (+)

![App Store Connect API-Schlüssel erstellen](/user_access.webp)

5 — Geben Sie einen Namen für den Schlüssel ein. Der Name dient nur zu Ihrer Information und ist nicht Teil des Schlüssels selbst

![App Store Connect API-Schlüssel Namen erstellen](/gen_key.webp)

6 — Wählen Sie unter Zugriff die Rolle für den Schlüssel aus. Die Rollen, die für Schlüssel gelten, sind dieselben Rollen, die für Benutzer in Ihrem Team gelten. Siehe [Rollenberechtigungen](https://help.apple.com/app-store-connect/#/deve5f9a89d7/)

7 — Klicken Sie auf Generieren

> **Der Zugriff eines API-Schlüssels kann nicht auf bestimmte Apps beschränkt werden**

Der Name des neuen Schlüssels, die Schlüssel-ID, ein Download-Link und andere Informationen erscheinen auf der Seite

![App Store Connect Schlüssel herunterladen](/download_key.webp)

Hier können Sie alle drei notwendigen Informationen erfassen:  
· Aussteller-ID  
· Schlüssel-ID  
· Klicken Sie auf "API-Schlüssel herunterladen", um Ihren privaten API-Schlüssel herunterzuladen. Der Download-Link erscheint nur, wenn der private Schlüssel noch nicht heruntergeladen wurde. Apple bewahrt keine Kopie des privaten Schlüssels auf. Sie können ihn also nur einmal herunterladen.

> _🔴_ Bewahren Sie Ihren privaten Schlüssel an einem sicheren Ort auf. Sie sollten Ihre Schlüssel niemals teilen, Schlüssel in einem Code-Repository speichern oder Schlüssel in Client-seitigen Code aufnehmen.

## Verwendung eines App Store Connect API-Schlüssels

Die API-Schlüsseldatei (p8-Datei, die Sie herunterladen), die Schlüssel-ID und die Aussteller-ID werden benötigt, um den JWT-Token für die Autorisierung zu erstellen.Es gibt mehrere Möglichkeiten, diese Informationen in Fastlane mithilfe der neuen Aktion `app_store_connect_api_key` einzugeben. Weitere Möglichkeiten finden Sie in der Fastlane-Dokumentation. Ich zeige diese Methode, da ich denke, dass es die einfachste Möglichkeit ist, mit den meisten CI-Systemen zu arbeiten, bei denen Sie Umgebungsvariablen festlegen können.

_Jetzt können wir Fastlane mit dem App Store Connect API-Schlüssel verwalten, großartig!_

## 2. Fastlane-Dateien kopieren

Fastlane ist eine Ruby-Bibliothek, die entwickelt wurde, um häufige Aufgaben der mobilen Entwicklung zu automatisieren. Mit Fastlane können Sie benutzerdefinierte "Lanes" konfigurieren, die eine Reihe von "Aktionen" bündeln, die Aufgaben ausführen, die Sie normalerweise mit Android Studio durchführen würden. Sie können viel mit Fastlane machen, aber für die Zwecke dieses Tutorials werden wir nur eine Handvoll Kernaktionen verwenden.

Erstellen Sie einen Fastlane-Ordner im Hauptverzeichnis Ihres Projekts und kopieren Sie die folgenden Dateien:
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

## Fastlane match konfigurieren

Fastlane match ist ein neuer Ansatz für die Code-Signierung von iOS. Fastlane match erleichtert es Teams, die erforderlichen Zertifikate und Bereitstellungsprofile für Ihre iOS-Apps zu verwalten.

Erstellen Sie ein neues privates Repository mit dem Namen `certificates`, zum Beispiel in Ihrem persönlichen GitHub-Konto oder Ihrer Organisation.

Initialisieren Sie Fastlane match für Ihre iOS-App

```shell
fastlane match init
```

Wählen Sie dann Option #1 (Git Storage)

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Weisen Sie die URL des neu erstellten Repositories zu

```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

> Jetzt haben Sie im Fastlane-Ordner eine Datei namens **_Matchfile_**, und `_git_url_` sollte auf die HTTPS-URL des Zertifikate-Repositories gesetzt sein. Optional können Sie auch SSH verwenden, aber das erfordert einen anderen Schritt zur Ausführung.

```
# ios/Matchfilegit_url("https://github.com/gitusername/certificates")storage_mode("git")type("appstore")
```

Als Nächstes generieren wir die Zertifikate und geben Ihre Anmeldedaten ein, wenn Sie mit Fastlane Match dazu aufgefordert werden.

Sie werden aufgefordert, eine Passphrase einzugeben. Merken Sie sie sich gut, da sie später von GitHub Actions verwendet wird, um Ihr Zertifikate-Repository zu entschlüsseln.

```
fastlane match appstore
```

Wenn alles gut gelaufen ist, sollten Sie etwas Ähnliches sehen:

```
[01:40:52]: All required keys, certificates and provisioning profiles are installed 🙌
```

> Wenn Sie Probleme mit GitHub und den erforderlichen Berechtigungen hatten, kann Ihnen dieser Beitrag möglicherweise helfen, Authentifizierungstoken für Git zu generieren.

Generierte Zertifikate und Bereitstellungsprofile werden in die Ressourcen des Zertifikate-Repositories hochgeladen.

![App Store Connect Zertifikate](/certificates.webp)

Öffnen Sie zuletzt Ihr `Projekt` in Xcode und aktualisieren Sie das Bereitstellungsprofil für die Release-Konfiguration Ihrer App.

![XCode Zertifikate](/xcode_cert.webp)

## Einige Dinge zu beachten 💡

## MATCH

Damit CI/CD die Zertifikate und Bereitstellungsprofile importieren kann, muss es Zugriff auf das Zertifikate-Repository haben. Sie können dies tun, indem Sie ein persönliches Zugriffs-Token generieren (sollte zuvor verwendet worden sein), das den Umfang hat, auf private Repositories zuzugreifen oder sie zu lesen.

Gehen Sie in GitHub zu **Einstellungen** → **Entwicklereinstellungen** → **Persönliche Zugriffs-Token** → klicken Sie auf `Neues Token generieren` → markieren Sie den `repo`-Umfang → dann klicken Sie auf `Token generieren`

![Persönliches Zugriffs-Token erstellen](/personal_access_token.webp)

Machen Sie eine Kopie des generierten persönlichen Zugriffs-Tokens. Sie werden es später für die Umgebungsvariable `GIT_TOKEN` verwenden.

Ersetzen Sie dann Ihre im Fastlane-Ordner generierte Match-Datei durch
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
Dies wird von GitHub Actions verwendet, um die Zertifikate und Bereitstellungsprofile zu importieren.
Und Variablen werden in GitHub Secrets gesetzt, anstatt sie fest in der Datei zu kodieren.

## Build-Verarbeitung

Bei GitHub Actions **werden Sie basierend auf den Minuten abgerechnet**, die Sie für die Ausführung Ihres CI/CD-Workflows verwendet haben. Aus Erfahrung dauert es etwa 10-15 Minuten, bis ein Build in App Store Connect verarbeitet werden kann.

Für private Projekte können die geschätzten Kosten pro Build bis zu **$0,08/Min x 15 Min = $1,2** oder mehr betragen, abhängig von der Konfiguration oder den Abhängigkeiten Ihres Projekts.

Wenn Sie die gleichen Bedenken bezüglich der Preisgestaltung für private Projekte haben wie ich, können Sie `skip_waiting_for_build_processing` auf `true` belassen.

Was ist der Haken? Sie müssen die Compliance Ihrer App in App Store Connect manuell aktualisieren, nachdem der Build verarbeitet wurde, um den Build an Ihre Benutzer verteilen zu können.

Dies ist nur ein optionaler Parameter, den Sie aktualisieren können, wenn Sie bei privaten Projekten Build-Minuten sparen möchten. Für kostenlose Projekte sollte dies überhaupt kein Problem sein. Siehe [Preisgestaltung](https://github.com/pricing/)

## 3. GitHub Actions einrichten

**GitHub-Geheimnisse konfigurieren**

Haben Sie sich jemals gefragt, woher die Werte der `ENV` kommen? Nun, es ist kein Geheimnis mehr - sie kommen aus den Geheimnissen Ihres Projekts 🤦

![GitHub-Geheimnisse festlegen](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - die ID Ihres App Store Connect-Teams, wenn Sie in mehreren Teams sind

2. `DEVELOPER_APP_ID` - gehen Sie in App Store Connect zur App → **App-Informationen** → Scrollen Sie zum Abschnitt `Allgemeine Informationen` Ihrer App und suchen Sie nach `Apple ID`

3. `DEVELOPER_APP_IDENTIFIER` - die Bundle-ID Ihrer App

4. `DEVELOPER_PORTAL_TEAM_ID` - die ID Ihres Developer Portal-Teams, wenn Sie in mehreren Teams sind

5. `FASTLANE_APPLE_ID` - die Apple-ID oder Entwickler-E-Mail, die Sie zur Verwaltung der App verwenden

6. `GIT_USERNAME` & `GIT_TOKEN` - Ihr Git-Benutzername und Ihr persönlicher Zugriffstoken

7. `MATCH_PASSWORD` - die Passphrase, die Sie bei der Initialisierung von Match festgelegt haben, wird zum Entschlüsseln der Zertifikate und Bereitstellungsprofile verwendet

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <1>`, z.B. `match AppStore com.domain.blabla.demo`

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - Weisen Sie einen temporären Keychain-Benutzer und ein Passwort für Ihren Workflow zu

10. `APPLE_KEY_ID` — App Store Connect API-Schlüssel 🔺Key ID

11. `APPLE_ISSUER_ID` — App Store Connect API-Schlüssel 🔺Issuer ID

12. `APPLE_KEY_CONTENT` — App Store Connect API-Schlüssel 🔺 Schlüsseldatei oder Schlüsselinhalt von _p8_, [überprüfen Sie es](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<2>
13. `CERTIFICATE_STORE_URL` — Die Repo-URL Ihrer Match-Schlüssel (z.B.: https://github.com/***/fastlane_match.git)

## **4. GitHub-Workflow-Datei konfigurieren**

Erstellen Sie ein GitHub-Workflow-Verzeichnis

```
cd .github/workflows
```

Erstellen Sie innerhalb des `workflow`-Ordners eine Datei namens `build-upload-ios.yml` und fügen Sie Folgendes hinzu

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
      - uses: actions/checkout@v6
      - name: Use Node.js 16
        uses: actions/setup-node@v6
        with:
          node-version: '24'
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

Dieser Workflow sollte nach jedem GitHub-_Tag_ ausgelöst werden. Wenn Sie das Tagging automatisieren möchten, lesen Sie zuerst [Automatisches Bauen und Veröffentlichen mit GitHub-Aktionen](/blog/automatic-build-and-release-with-github-actions/)

Dann wird dieser Workflow Ihre NodeJS-Abhängigkeiten abrufen, sie installieren und Ihre JavaScript-App bauen

> Jedes Mal, wenn Sie einen neuen Commit senden, wird eine Release in TestFlight erstellt

Ihre App muss nicht Ionic verwenden, nur die Capacitor-Basis ist erforderlich. Sie kann alte Cordova-Module haben, aber Capacitor JS-Plugins sollten bevorzugt werden

## 5. Workflow auslösen

**Einen Commit erstellen**

Machen Sie einen _Commit_, Sie sollten den aktiven Workflow im Repository sehen

**Workflow auslösen**

Pushen Sie die neuen Commits in den Branch `main` oder `development`, um den Workflow auszulösen

![Gestartet mit Commit](/cd_started.webp)

Nach einigen Minuten sollte der Build in Ihrem App Store Connect-Dashboard verfügbar sein

![Testflight Dashboard](/testflight_app.webp)

## Kann man vom lokalen Rechner aus deployen?

Ja, das können Sie, und es ist ganz einfach

Stellen Sie sich vor, Sie haben ein privates Repository und haben die Minuten des kostenlosen Plans aufgebraucht und möchten nicht für neue Releases bezahlen, oder vielleicht möchten Sie die Anwendung lieber manuell einreichen

**_Los geht's_**

Ok, zuerst müssen wir im Pfad **_my_project_path/fastlane_** eine Datei namens **_env_** erstellen, genau im gleichen Pfad wie _Fastfile_, um die gleichen _geheimen_ Eigenschaften wie in unserem _GitHub_ erstellen zu können, wie unten gezeigt:

env-Datei für das Deployment vom lokalen Rechner

Jetzt können Sie zum _Terminal_ gehen und _Fastlane_ von Ihrem Rechner aus starten:

```
fastlane closed_beta
```

> **❌ Wesentlich über das** _env_**-Datei, da wir diese Daten lieber nicht offenlegen möchten, müssen wir sie in unserer** _gitignore_ **hinzufügen, etwa so: ❌**

```
fastlane/*.env
```

Es sollte genauso funktionieren wie bei GitHub Actions auf der Remote-Maschine, aber auf unserem lokalen Rechner 🍻

![Lokaler Fastlane-Lauf](/local_fastlane.webp)

Terminal-Ausführung: $ Fastlane closed\_beta

**_Wenn Sie bis hierher gekommen sind, meine Glückwünsche, jetzt haben Sie einen vollständig automatisierten Prozess für Ihre iOS-Apps mit Fastlane und GitHub Actions_**

> Jedes Mal, wenn Sie einen neuen Commit senden, wird im Google Play Konsole, Beta-Kanal, ein Release erstellt
Ich werde diesen Blog mit Ihrem Feedback verbessern. Wenn Sie Fragen oder Vorschläge haben, lassen Sie es mich bitte per E-Mail wissen: martin@capgo.app

### Auf Ihrem Gerät bauen

Wenn Sie immer noch auf Ihrem Gerät bauen müssen, müssen Sie sie manuell zur Bereitstellung hinzufügen
Verbinden Sie Ihr Gerät mit Ihrem Mac und öffnen Sie das Gerätemenü
![iOS-Gerätemenü finden](/find_ios_device.webp)
Kopieren Sie dann Ihre Kennung 
![iOS-Kennung finden](/find_ios_identifier.webp)
Und starten Sie dann den Befehl:
`fastlane register_new_device`
Es wird Sie auffordern, einen Gerätenamen und die Kennung einzugeben:
![iOS-Kennung setzen](/set_identifier.webp)

### Wenn Sie auf Probleme stoßen

Wenn Sie Probleme mit Entwicklergeräten haben, die nicht testen können usw., behebt das normalerweise das Problem

Es gibt einen magischen Befehl, der Sie retten kann:
```shell
fastlane match nuke development
fastlane match development
```

Dann:
Bereinigen Sie das Projekt, indem Sie Umschalt(⇧)+Befehl(⌘)+K gedrückt halten oder Produkt > Bereinigen auswählen (es könnte als "Build-Ordner bereinigen" bezeichnet sein)

Versuchen Sie dann, die App erneut auf Ihrem Gerät auszuführen

### Danke

Dieser Blog basiert auf den folgenden Artikeln:
- [Continuous delivery for IOS using Fastlane and GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlane Documentation](https://docsfastlanetools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
