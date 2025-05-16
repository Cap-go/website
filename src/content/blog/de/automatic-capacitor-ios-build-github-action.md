---
slug: automatic-capacitor-ios-build-github-action
title: Automatischer Capacitor iOS-Build mit GitHub Actions und Zertifikat
description: >-
  Wie man in 5 Minuten eine CI/CD-Pipeline für Ihre iOS Ionic-App mit fastlane
  und GitHub Actions einrichtet (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane TestFlight GitHub Action Illustration
tag: CI/CD
published: true
locale: de
next_blog: automatic-capacitor-android-build-github-action
---

Hier ist die Übersetzung des Textes ins Deutsche:

## Kontinuierliche Auslieferung für iOS mit Fastlane und GitHub Actions und Zertifikat

## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren…

- Stellen Sie sicher, dass Sie Fastlane auf Ihrem Entwicklungsrechner [installiert](https://docsfastlanetools/) haben
- iOS-Entwicklerprogramm-Mitgliedschaft
- Lust zum Lesen 😆…

## Wichtiges zum Preis

![Preis GitHub Action](/price_github_actions.webp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Der Dienst ist bis zur Grenze 'kostenlos', abhängig von der gewählten Maschine
Wir werden eine **_macOS_**-Maschine verwenden, Sie können im Screenshot den Preis und die Grenzen sehen (Preise zum Zeitpunkt der Erstellung des Tutorials, sie könnten sich in Zukunft ändern)

🔴 **_Nach dieser Warnung zu Anforderungen und Preisen fahren wir fort, wenn Sie möchten…_**

> **_📣_ Im Beitrag gehen wir davon aus, dass wir die App in iTunes Connect erstellt haben, wir haben die Zertifikate des Apple-Ökosystems, alles wird von Fastlane kopiert!**

## Gehen wir zur Sache 🧑🏽💻

**Zu befolgende Schritte im Beitrag**

1. _Verwendung der App Store Connect API mit Fastlane_
2. _Anforderungen_
3. _Erstellung eines App Store Connect API-Schlüssels_
4. _Verwendung eines App Store Connect API-Schlüssels_
5. _Kopieren der Fastlane-Dateien_
6. _Konfiguration von GitHub Actions_

## 1. Verwendung der App Store Connect API mit Fastlane

> Ab Februar 2021 ist eine Zwei-Faktor-Authentifizierung oder Zwei-Schritt-Verifizierung für alle Benutzer erforderlich, um sich bei App Store Connect anzumelden. Diese zusätzliche Sicherheitsebene für Ihre Apple-ID hilft sicherzustellen, dass nur Sie auf Ihr Konto zugreifen können.
> Von [Apple Support](https://developerapplecom/support/authentication/)

## Anforderungen

Um die App Store Connect API verwenden zu können, benötigt Fastlane **drei** Dinge:

1. Aussteller-ID
2. Schlüssel-ID
3. Schlüsseldatei oder Schlüsselinhalt

## Erstellung eines App Store Connect API-Schlüssels

Um Schlüssel zu generieren, müssen Sie Admin-Berechtigung in App Store Connect haben. Wenn Sie diese Berechtigung nicht haben, können Sie die zuständige Person auf diesen Artikel verweisen und die folgenden Anweisungen befolgen.

1 — Melden Sie sich bei [App Store Connect](https://appstoreconnectapplecom/) an

2 — Wählen Sie [Benutzer und Zugriff](https://appstoreconnectapplecom/access/users/)

![App Store Connect Benutzerzugriff](/select_user_access.webp)

3 — Wählen Sie die Registerkarte API-Schlüssel

![App Store Connect API-Schlüssel](/user_access_keys.webp)

4 — Klicken Sie auf API-Schlüssel generieren oder auf die Schaltfläche Hinzufügen (+)

![App Store Connect API-Schlüssel erstellen](/user_access.webp)

5 — Geben Sie einen Namen für den Schlüssel ein. Der Name dient nur zu Ihrer Information und ist nicht Teil des Schlüssels selbst

![App Store Connect API-Schlüssel Namen erstellen](/gen_key.webp)

6 — Wählen Sie unter Zugriff die Rolle für den Schlüssel aus. Die für Schlüssel geltenden Rollen sind die gleichen Rollen, die für Benutzer in Ihrem Team gelten. Siehe [Rollenberechtigungen](https://helpapplecom/app-store-connect/#/deve5f9a89d7/). Wir empfehlen, **App-Verwaltung** auszuwählen.

7 — Klicken Sie auf Generieren

> **Der Zugriff eines API-Schlüssels kann nicht auf bestimmte Apps beschränkt werden**

Der Name des neuen Schlüssels, die Schlüssel-ID, ein Download-Link und andere Informationen erscheinen auf der Seite

![App Store Connect Schlüssel herunterladen](/download_key.webp)

Hier können Sie alle drei notwendigen Informationen erhalten.
<1> Aussteller-ID
<2> Schlüssel-ID
<3> Klicken Sie auf "API-Schlüssel herunterladen", um Ihren privaten API-Schlüssel herunterzuladen. Der Download-Link erscheint nur, wenn der private Schlüssel noch nicht heruntergeladen wurde. Apple bewahrt keine Kopie des privaten Schlüssels auf. Sie können ihn also nur einmal herunterladen.

> _🔴_ Bewahren Sie Ihren privaten Schlüssel an einem sicheren Ort auf. Sie sollten Ihre Schlüssel niemals teilen, in einem Code-Repository speichern oder in clientseitigen Code aufnehmen.

## Verwendung eines App Store Connect API-Schlüssels

Die API-Schlüsseldatei (p8-Datei, die Sie herunterladen), die Schlüssel-ID und die Aussteller-ID werden benötigt, um den JWT-Token für die Autorisierung zu erstellen. Es gibt mehrere Möglichkeiten, wie diese Informationen in Fastlane eingegeben werden können, unter Verwendung der neuen Fastlane-Aktion `app_store_connect_api_key`. Sie können andere Möglichkeiten in der [Fastlane-Dokumentation](https://docsfastlanetools/actions/app_store_connect_api_key/) erfahren.Ich zeige diese Methode, weil ich denke, dass es der einfachste Weg ist, mit den meisten CI-Systemen zu arbeiten, bei denen Sie Umgebungsvariablen setzen können.

_Jetzt können wir Fastlane mit dem App Store Connect API-Schlüssel verwalten, großartig!_

### Zertifikate und Bereitstellungsprofile erstellen

#### Zertifikate

Öffnen Sie XCode und gehen Sie zu **Einstellungen** > **Konten** > **Apple ID** > **Teams** und wählen Sie Ihr Team aus.

![Code-Signierungsidentitäten](/code_signing_identities.webp)

Klicken Sie auf **Zertifikate verwalten** > **+** und wählen Sie **Apple Distribution**

![Apple Distribution](/apple_distribution.webp)

Dann können Sie ein neues Zertifikat erstellen.

Anschließend müssen Sie zum Schlüsselbund gehen, um das Zertifikat als `p12`-Datei herunterzuladen.

Dazu müssen Sie zum Schlüsselbund wechseln, den **Anmelde**-Schlüsselbund auswählen und dann den Tab **Meine Zertifikate**

![Meine Zertifikate](/my_certificates.webp)

Dann können Sie das Zertifikat auswählen, das Sie herunterladen möchten (Achten Sie auf das Datum des Zertifikats)

Klicken Sie dann mit der rechten Maustaste auf das Zertifikat und wählen Sie **Exportieren**

Wählen Sie das Dateiformat **Persönlicher Informationsaustausch (p12)**

Dadurch wird das Zertifikat als `p12`-Datei heruntergeladen.

#### Bereitstellungsprofile

Öffnen Sie [Apple Developer](https://developerapplecom/account/resources/profiles/list) und wählen Sie das richtige Team aus.

Erstellen Sie dann ein neues Profil, indem Sie auf **+** klicken.

![Neues Profil erstellen](/create_new_profile.webp)

Und wählen Sie **App Store Connect**

![App Store Connect auswählen](/select_app_store_connect.webp)

Dann müssen Sie die richtige App auswählen, achten Sie darauf, dass Sie keine Platzhalter verwenden, sonst schlägt die Signierung fehl.

![Die richtige App auswählen](/select_app.webp)

Wählen Sie das richtige Zertifikat aus, das Sie zuvor erstellt haben (achten Sie auf das Ablaufdatum, es sollte der gleiche Tag und Monat wie heute sein) und klicken Sie auf **Weiter**

![Das richtige Zertifikat auswählen](/select_certificate.webp)

Geben Sie schließlich den Namen des Profils ein und klicken Sie auf **Generieren**

> Der Name wird verwendet, um das Profil in Fastlane zu identifizieren, unter dem Wert von `APPLE_PROFILE_NAME`

![Profil generieren](/generate_profile.webp)

Sie können das Profil als `mobileprovision`-Datei herunterladen.

![Profil herunterladen](/download_profile.webp)

### GitHub-Geheimnisse für Ihr Zertifikat und Bereitstellungsprofil erstellen

Der Signierungsprozess umfasst das Speichern von Zertifikaten und Bereitstellungsprofilen, deren Übertragung zum Runner, den Import in den Schlüsselbund des Runners und deren Verwendung in Ihrem Build.

Erstellen Sie Geheimnisse in Ihrem Repository oder Ihrer Organisation für die folgenden Elemente:

- Ihr Apple-Signierzertifikat

  - Dies ist Ihre `p12`-Zertifikatsdatei. Weitere Informationen zum Exportieren Ihres Signierzertifikats aus Xcode finden Sie in der [Xcode-Dokumentation](https://helpapplecom/xcode/mac/current/#/dev154b28f09)

  - Sie sollten Ihr Zertifikat in Base64 konvertieren, wenn Sie es als Geheimnis speichern. In diesem Beispiel heißt das Geheimnis `BUILD_CERTIFICATE_BASE64`

  - Verwenden Sie den folgenden Befehl, um Ihr Zertifikat in Base64 zu konvertieren und in die Zwischenablage zu kopieren:

    ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```

- Das Passwort für Ihr Apple-Signierzertifikat

  - In diesem Beispiel heißt das Geheimnis `P12_PASSWORD`

- Ihr Apple-Bereitstellungsprofil

  - Weitere Informationen zum Exportieren Ihres Bereitstellungsprofils aus Xcode finden Sie in der [Xcode-Dokumentation](https://helpapplecom/xcode/mac/current/#/deva899b4fe5)

  - Sie sollten Ihr Bereitstellungsprofil in Base64 konvertieren, wenn Sie es als Geheimnis speichern. In diesem Beispiel heißt das Geheimnis `BUILD_PROVISION_PROFILE_BASE64`

  - Verwenden Sie den folgenden Befehl, um Ihr Bereitstellungsprofil in Base64 zu konvertieren und in die Zwischenablage zu kopieren:

    ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```

## 2. Fastlane-Dateien kopieren

Fastlane ist eine Ruby-Bibliothek, die zur Automatisierung gängiger Aufgaben in der mobilen Entwicklung erstellt wurde. Mit Fastlane können Sie benutzerdefinierte "Lanes" konfigurieren, die eine Reihe von "Aktionen" bündeln, die Aufgaben ausführen, die Sie normalerweise mit Android Studio durchführen würden. Sie können viel mit Fastlane machen, aber für die Zwecke dieses Tutorials werden wir nur eine Handvoll Kernaktionen verwenden.Erstellen Sie einen Fastlane-Ordner im Hauptverzeichnis Ihres Projekts und kopieren Sie die folgenden Dateien:
Fastfile

## **Build-Verarbeitung**

In GitHub Actions **werden Ihnen die Minuten in Rechnung gestellt**, die Sie für die Ausführung Ihres CI/CD-Workflows verwendet haben. Erfahrungsgemäß dauert es etwa 10-15 Minuten, bis ein Build in App Store Connect verarbeitet werden kann.

Bei privaten Projekten können die geschätzten Kosten pro Build bis zu **$0,08/Min x 15 Min = $1,2** oder mehr betragen, abhängig von der Konfiguration oder den Abhängigkeiten Ihres Projekts.

Wenn Sie wie ich Bedenken bezüglich der Preisgestaltung für private Projekte haben, können Sie `skip_waiting_for_build_processing` auf `true` belassen.

Was ist der Haken? Sie müssen die Compliance Ihrer App in App Store Connect manuell aktualisieren, nachdem der Build verarbeitet wurde, um den Build an Ihre Benutzer verteilen zu können.

Dies ist nur ein optionaler Parameter, den Sie aktualisieren können, wenn Sie bei privaten Projekten Build-Minuten sparen möchten. Bei kostenlosen Projekten sollte dies überhaupt kein Problem sein. Siehe [Preisgestaltung](https://github.com/pricing/)

## 3. GitHub Actions einrichten

**GitHub-Geheimnisse konfigurieren**

Haben Sie sich jemals gefragt, woher die Werte der `ENV` kommen? Nun, es ist kein Geheimnis mehr - sie kommen aus dem Geheimnis Ihres Projekts 🤦

![GitHub-Geheimnisse festlegen](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - die ID Ihres App Store Connect-Teams, wenn Sie in mehreren Teams sind

2. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, z.B. `match AppStore com.domain.blabla.demo`

3. `BUILD_CERTIFICATE_BASE64` - Base64-codiertes Zertifikat

4. `BUILD_PROVISION_PROFILE_BASE64` - Base64-codiertes Bereitstellungsprofil

5. `BUNDLE_IDENTIFIER` - der Bundle-Identifier Ihrer App

6. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID

7. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID

8. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 Schlüsselinhalt von _p8_, [überprüfen Sie es](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4. GitHub-Workflow-Datei konfigurieren**

Erstellen Sie ein GitHub-Workflow-Verzeichnis

Erstellen Sie im Ordner `workflow` eine Datei mit dem Namen `build-upload-ios.yml` und fügen Sie Folgendes hinzu:

Dieser Workflow sollte nach jedem GitHub-_Tag_ ausgelöst werden. Wenn Sie das Tagging automatisieren müssen, lesen Sie zuerst [Automatischer Build und Release mit GitHub-Aktionen](/blog/automatic-build-and-release-with-github-actions/).

Dann wird dieser Workflow Ihre NodeJS-Abhängigkeiten abrufen, sie installieren und Ihre JavaScript-App erstellen.

> Jedes Mal, wenn Sie einen neuen Commit senden, wird in TestFlight ein Release erstellt.

Ihre App muss nicht Ionic verwenden, nur Capacitor-Basis ist obligatorisch. Sie kann alte Cordova-Module haben, aber Capacitor JS-Plugins sollten bevorzugt werden.

## 5. Workflow auslösen

**Commit erstellen**

Machen Sie einen _Commit_, Sie sollten den aktiven Workflow im Repository sehen.

**Workflow auslösen**

Pushen Sie die neuen Commits in den Branch `main` oder `development`, um den Workflow auszulösen.

![Gestartet mit Commit](/cd_started.webp)

Nach einigen Minuten sollte der Build in Ihrem App Store Connect-Dashboard verfügbar sein.

![Testflight Dashboard](/testflight_app.webp)

## Kann man von lokalem Rechner aus deployen?

Ja, das können Sie, und es ist mühelos.

Sie können Xcode verwenden, um Ihre App wie immer zu erstellen und zu signieren.

### Danke

Dieser Blog basiert auf folgenden Artikeln:
- [Kontinuierliche Bereitstellung für iOS mit Fastlane und GitHub-Aktionen](https://lito.arias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlane-Dokumentation](https://docs.fastlane.tools/app-store-connect-api/)
- [Diese GitHub-Nachricht von @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Diese GitHub-Dokumentation](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)