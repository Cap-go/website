---
slug: automatic-capacitor-ios-build-codemagic
title: Automatischer Capacitor iOS-Build mit Codemagic
description: >-
  So richten Sie in 5 Minuten eine CI/CD-Pipeline für Ihre IOS Ionic-App mit
  Codemagic ein (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2026-03-10T13:48:04.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic Testflight-Illustration
tag: CI/CD
published: true
locale: de
next_blog: automatic-capacitor-android-build-codemagic
---

## Kontinuierliche Auslieferung für iOS mit Codemagic


## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren...

- Mitgliedschaft im iOS-Entwicklerprogramm
- Lust zum Lesen 😆...

## Wichtiges zum Preis

![Preis Codemagic Aktion](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Der Service ist 'kostenlos' bis zu 500 macOS M1 Minuten / Monat, abhängig von der gewählten Maschine.  
Wir werden eine **_macOS M1_** Maschine verwenden. Sie können im Screenshot den Preis und die Limits sehen (Preise zum Zeitpunkt der Erstellung des Tutorials, sie könnten sich in Zukunft ändern).

🔴 **_Nachdem wir Sie über Anforderungen und Preise informiert haben, fahren wir fort, wenn Sie möchten..._**

> **_📣_ In diesem Beitrag gehen wir davon aus, dass wir die App in iTunes Connect erstellt haben und über die Zertifikate des Apple-Ökosystems verfügen. Alles wird von Codemagic eingerichtet!**

## Los geht's 🧑🏽💻

**Schritte, die wir in diesem Beitrag befolgen werden**

1. _Verwendung der App Store Connect API mit Codemagic_
2. _Anforderungen_
3. _Erstellung eines App Store Connect API-Schlüssels_
4. _Verwendung eines App Store Connect API-Schlüssels_
5. _Kopieren der Fastlane-Dateien_
6. _Konfiguration von Codemagic_

## 1. Verwendung der App Store Connect API mit Codemagic

> Seit Februar 2021 ist für alle Benutzer eine Zwei-Faktor-Authentifizierung oder Zwei-Schritt-Verifizierung erforderlich, um sich bei App Store Connect anzumelden. Diese zusätzliche Sicherheitsebene für Ihre Apple-ID stellt sicher, dass nur Sie auf Ihr Konto zugreifen können.  
> Von [Apple Support](https://developer.apple.com/support/authentication/)

> Die Einrichtung von match erfordert, dass Sie Ihre bestehenden Zertifikate widerrufen. Aber keine Sorge, Sie erhalten direkt ein neues.


### Anforderungen

Um die App Store Connect API nutzen zu können, benötigt Codemagic **drei** Dinge:

1. Issuer ID
2. Key ID
3. Schlüsseldatei oder Schlüsselinhalt

### Erstellung eines App Store Connect API-Schlüssels

Um Schlüssel zu generieren, müssen Sie über Admin-Berechtigungen in App Store Connect verfügen. Wenn Sie diese Berechtigung nicht haben, können Sie die zuständige Person auf diesen Artikel verweisen und die folgenden Anweisungen befolgen:

1 — Melden Sie sich bei [App Store Connect](https://appstoreconnect.apple.com/) an

2 — Wählen Sie [Benutzer und Zugriff](https://appstoreconnect.apple.com/access/users/)

![App Store Connect Benutzerzugriff](/select_user_access.webp)

3 — Wählen Sie den Reiter API-Schlüssel

![App Store Connect API-Schlüssel](/user_access_keys.webp)

4 — Klicken Sie auf API-Schlüssel generieren oder den Hinzufügen (+) Button

![App Store Connect API-Schlüssel erstellen](/user_access.webp)

5 — Geben Sie den Namen für den Schlüssel ein und wählen Sie eine Zugriffsebene. Wir empfehlen, die Zugriffsrechte `App Manager` zu wählen. Lesen Sie mehr über die Rollenberechtigungen des Apple Developer-Programms [hier](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![App Store Connect API-Schlüssel Namen erstellen](/gen_key.webp)

6 — Klicken Sie auf Generieren

> **Der Zugriff eines API-Schlüssels kann nicht auf bestimmte Apps beschränkt werden**

Der Name des neuen Schlüssels, die Schlüssel-ID, ein Download-Link und weitere Informationen erscheinen auf der Seite

![App Store Connect Schlüssel herunterladen](/download_key.webp)

Notieren Sie sich alle drei erforderlichen Informationen hier:
<1> Issuer ID  
<2> Key ID  
<3> Klicken Sie auf "API-Schlüssel herunterladen", um Ihren privaten API-Schlüssel herunterzuladen. Der Download-Link erscheint nur, wenn der private Schlüssel noch nicht heruntergeladen wurde. Apple bewahrt keine Kopie des privaten Schlüssels auf. Sie können ihn also nur einmal herunterladen.

> _🔴_ Bewahren Sie Ihren privaten Schlüssel an einem sicheren Ort auf. Sie sollten Ihre Schlüssel niemals weitergeben, in einem Code-Repository speichern oder in clientseitigen Code aufnehmen.

### Hinzufügen des App Store Connect API-Schlüssels zu Codemagic

1. Öffnen Sie Ihre Codemagic Team-Einstellungen,
![Team-Integrationen auswählen](/select_team.webp)
![Team öffnen](/open_team.webp)
Wählen Sie Code-Signierungsidentitäten
![Code-Signierungsidentitäten auswählen](/select_code_signing_identities.webp)
Und laden Sie das Zertifikat hoch
![Zertifikat hochladen](/upload_certificate.webp)

2. Klicken Sie auf den Button **Schlüssel hinzufügen**
3. Geben Sie den `App Store Connect API-Schlüsselnamen` ein. Dies ist ein lesbarer Name für den Schlüssel, der später in den Anwendungseinstellungen verwendet wird.
4. Geben Sie die Werte für `Issuer ID` und `Key ID` ein
5. Klicken Sie auf **Wählen Sie eine p8-Datei** oder ziehen Sie die Datei, um den zuvor heruntergeladenen App Store Connect API-Schlüssel hochzuladen
6. Klicken Sie auf **Speichern**

_Jetzt können wir Codemagic mit dem App Store Connect API-Schlüssel verwalten, großartig!_

## 2. Zertifikate und Bereitstellungsprofile erstellen

#### Zertifikate

Öffnen Sie XCode und gehen Sie zu **Einstellungen** > **Konten** > **Apple-ID** > **Teams** und wählen Sie Ihr Team aus

![Code-Signaturidentitäten](/code_signing_identities.webp)

Klicken Sie auf **Zertifikate verwalten** > **+** und wählen Sie **Apple Distribution**

![Apple Distribution](/apple_distribution.webp)

Dann können Sie ein neues Zertifikat erstellen

Anschließend müssen Sie zum Schlüsselbund gehen, um das Zertifikat als `p12`-Datei herunterzuladen

Dazu müssen Sie zum Schlüsselbund wechseln, den **Anmelde**-Schlüsselbund auswählen und dann zur Registerkarte **Meine Zertifikate** gehen

![Meine Zertifikate](/my_certificates.webp)

Dann können Sie das Zertifikat auswählen, das Sie herunterladen möchten (Achten Sie auf das Datum des Zertifikats)

Klicken Sie dann mit der rechten Maustaste auf das Zertifikat und wählen Sie **Exportieren**

Wählen Sie als Dateiformat **Persönlicher Informationsaustausch (.p12)**

Dadurch wird das Zertifikat als `p12`-Datei heruntergeladen

#### Bereitstellungsprofile

Öffnen Sie [Apple Developer](https://developer.apple.com/account/resources/profiles/list) und wählen Sie das richtige Team aus

Erstellen Sie dann ein neues Profil, indem Sie auf **+** klicken

![Neues Profil erstellen](/create_new_profile.webp)

Und wählen Sie **App Store Connect**

![App Store Connect auswählen](/select_app_store_connect.webp)

Dann müssen Sie die richtige App auswählen. Seien Sie vorsichtig, Sie können keine Platzhalter verwenden, da sonst die Signierung fehlschlägt

![Die richtige App auswählen](/select_app.webp)

Wählen Sie das richtige Zertifikat aus, das Sie zuvor erstellt haben (achten Sie auf das Ablaufdatum, es sollte der gleiche Tag und Monat wie heute sein) und klicken Sie auf **Weiter**

![Das richtige Zertifikat auswählen](/select_certificate.webp)

Geben Sie abschließend den Namen des Profils ein und klicken Sie auf **Generieren**

> Der Name wird verwendet, um das Profil in Codemagic zu identifizieren

![Profil generieren](/generate_profile.webp)

Sie können das Profil als `mobileprovision`-Datei herunterladen

![Profil herunterladen](/download_profile.webp)

### Hinzufügen des Code-Signaturzertifikats

Codemagic ermöglicht es Ihnen, Code-Signaturzertifikate als PKCS#12-Archive hochzuladen, die sowohl das Zertifikat als auch den privaten Schlüssel enthalten, der für dessen Verwendung benötigt wird. Beim Hochladen wird Codemagic Sie auffordern, das Zertifikatspasswort (falls das Zertifikat passwortgeschützt ist) zusammen mit einem eindeutigen **Referenznamen** anzugeben, der dann in der `codemagic.yml`-Konfiguration verwendet werden kann, um die spezifische Datei abzurufen.

- Zertifikat hochladen
- Neues Zertifikat generieren
- Vom Developer Portal abrufen

1. Öffnen Sie Ihre Codemagic-Teameinstellungen, gehen Sie zu **codemagic.yml-Einstellungen** > **Code-Signaturidentitäten**
2. Öffnen Sie die Registerkarte **iOS-Zertifikate**
3. Laden Sie die Zertifikatsdatei hoch, indem Sie auf **p12- oder pem-Datei auswählen** klicken oder sie in den angegebenen Rahmen ziehen
4. Geben Sie das **Zertifikatspasswort** ein und wählen Sie einen **Referenznamen**
5. Klicken Sie auf **Zertifikat hinzufügen**

### Hinzufügen des Bereitstellungsprofils

Codemagic ermöglicht es Ihnen, ein Bereitstellungsprofil hochzuladen, das für die Anwendung verwendet werden soll, oder ein Profil vom Apple Developer Portal abzurufen

Der Typ, das Team, die Bundle-ID und das Ablaufdatum des Profils werden für jedes Profil angezeigt, das zu den Code-Signaturidentitäten hinzugefügt wurde. Darüber hinaus wird Codemagic Sie darüber informieren, ob ein passendes Code-Signaturzertifikat in den Code-Signaturidentitäten verfügbar ist (ein grünes Häkchen im Feld **Zertifikat**) oder nicht

## 3. Codemagic einrichten

**Codemagic-Geheimnisse konfigurieren**

Haben Sie sich jemals gefragt, woher die Werte der `ENV` kommen? Nun, es ist kein Geheimnis mehr – sie kommen aus dem Geheimnis Ihres Projekts 🤦

## 4. Codemagic-Workflow-Datei konfigurieren

Erstellen Sie eine Datei mit dem Namen `codemagic.yml` im Stammverzeichnis Ihres Projekts und fügen Sie Folgendes hinzu

```yaml
workflows:
  ionic-capacitor-ios-workflow:
    name: Capacitor iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    integrations:
      app_store_connect: CodeMagic
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: YOUR_BUNDLE_IDENTIFIER
      vars:
        XCODE_WORKSPACE: ios/App/App.xcworkspace
        XCODE_SCHEME: App
        APP_STORE_APP_ID: YOUR_APP_STORE_APP_ID
      node: v20.14.0
      xcode: 15.4
      cocoapods: default
    triggering:
      events:
        - tag
      tag_patterns:
        - pattern: '*'
          include: true
    scripts:
      - name: Install dependencies
        script: |
          npm install
      - name: Cocoapods installation
        script: |
          cd ios/App && pod install
      - name: Update dependencies and copy web assets to native project
        script: |
          npm run build
          npx cap sync ios
      - name: Set up code signing settings on Xcode project
        script: |
          xcode-project use-profiles
      - name: Increment build number
        script: |
          cd $CM_BUILD_DIR/ios/App
          LATEST_BUILD_NUMBER=$(app-store-connect get-latest-app-store-build-number "$APP_ID")
          agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
      - name: Build ipa for distribution
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    publishing:
      email:
        recipients:
          - YOUR_EMAIL
        notify:
          success: true # To not receive a notification when a build succeeds
          failure: false # To not receive a notification when a build fails
      app_store_connect:
        auth: integration
        # Configuration related to TestFlight (optional)
        # Note: This action is performed during post-processing.
        submit_to_testflight: true
        # Configuration related to App Store (optional)
        # Note: This action is performed during post-processing.
        submit_to_app_store: false

```

Dieser Workflow sollte manuell oder nach jedem GitHub-_Tag_ ausgelöst werden. Wenn Sie das Tagging automatisieren müssen, lesen Sie bitte zuerst [Automatischer Build und Release mit GitHub-Aktionen](/blog/automatic-build-and-release-with-github-actions/)Dann wird dieser Workflow Ihre NodeJS-Abhängigkeiten abrufen, sie installieren und Ihre JavaScript-App bauen

> Jedes Mal, wenn Sie einen neuen Tag senden, wird ein Release in TestFlight erstellt

Ihre App muss nicht Ionic verwenden, nur die Capacitor-Basis ist obligatorisch. Sie kann alte Cordova-Module haben, aber Capacitor JS-Plugins sollten bevorzugt werden

## 5. Workflow auslösen

**Den Workflow auslösen**

Pushen Sie die neuen Commits zum Branch 'main' oder 'developement', um den Workflow auszulösen

![Gestartet mit Commit](/build_result.webp)

Nach einigen Minuten sollte der Build in Ihrem App Store Connect-Dashboard verfügbar sein

![Testflight Dashboard](/testflight_app.webp)

## Manuell starten

Sie können den Workflow manuell starten

Wählen Sie zuerst die App aus, die Sie bauen möchten, und klicken Sie dann auf **Neuen Build starten**

![App auswählen](/select_app_codemagic.webp)

Wählen Sie dann den Branch aus, den Sie bauen möchten

![Branch auswählen](/select_branch.webp)

Und klicken Sie auf **Neuen Build starten**

Gehen Sie dann zur Build-Liste

![Build-Liste](/build_list.webp)

Und klicken Sie auf den Build, um das Ergebnis zu sehen

![Build-Ergebnis](/build_result.webp)

## Kann von lokalem Rechner deployen

Ja, das können Sie, und es ist mühelos

Sie können Xcode verwenden, um Ihre App zu bauen und zu signieren, wie immer

### Danksagung

Dieser Blog basiert auf den folgenden Artikeln:
- [Kontinuierliche Auslieferung für iOS mit Codemagic und GitHub Actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Codemagic Dokumentation](https://docsCodemagictools/app-store-connect-api/)
- [Diese GitHub-Nachricht von @mrogunlana](https://githubcom/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
