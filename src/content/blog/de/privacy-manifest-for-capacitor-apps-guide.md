---
slug: privacy-manifest-for-capacitor-apps-guide
title: 'Datenschutz-Manifest für Capacitor Apps: Leitfaden'
description: >-
  Erfahren Sie, wie Sie ein Privacy Manifest für Ihre App erstellen, um die App
  Store-Anforderungen zu erfüllen und Benutzerdaten effektiv zu schützen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T03:07:47.047Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776-1743563280473.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Privacy Manifest, Capacitor, App Store compliance, user data protection, app
  development, privacy standards
tag: 'Development, Mobile, Security'
published: true
locale: de
next_blog: ''
---
**Möchten Sie Ihre [Capacitor](https://capacitorjs.com/)-App ohne Verzögerungen im [App Store](https://en.wikipedia.org/wiki/App_Store_\(Apple\)) veröffentlichen?** Beginnen Sie mit der Erstellung eines Privacy Manifests. Apple verlangt jetzt von Entwicklern die Einbindung dieses Dokuments, um sicherzustellen, dass Apps strenge Datenschutzstandards erfüllen. Hier ist, was Sie wissen müssen:

-   **Was ist ein Privacy Manifest?**  
    Eine strukturierte Datei, die die Datenerfassungspraktiken, API-Nutzung und Tracking-Domains Ihrer App beschreibt.
    
-   **Warum es wichtig ist:**
    
    -   Erfüllt App Store-Regeln, um Ablehnungen oder Entfernungen zu vermeiden.
    -   Schafft Vertrauen durch Transparenz beim Umgang mit Nutzerdaten.
-   **Wichtige Komponenten:**
    
    -   APIs, die auf Nutzerdaten zugreifen (z.B. Standort, Fotos).
    -   Datenschutzkennzeichnungen für erfasste Datentypen.
    -   Tracking-Domains für Analysen oder Werbung.
-   **So erstellen Sie eines:**
    
    -   Verwenden Sie JSON, um Details zur Datenerfassung zu definieren.
    -   Platzieren Sie die `PrivacyInfo.xcprivacy`-Datei im richtigen Verzeichnis Ihres Projekts.
    -   Validieren Sie sie mit Tools wie [Xcode](https://developer.apple.com/xcode/), um Fehler zu vermeiden.
-   **Tools zur Vereinfachung des Prozesses:**  
    Nutzen Sie Plattformen wie [Capgo](https://capgo.app/) für automatisierte Privacy Manifest-Validierung, Echtzeit-Updates und Fehlerverfolgung.
    

**Bleiben Sie konform, schützen Sie die Privatsphäre der Nutzer und vermeiden Sie App Store-Verzögerungen, indem Sie diesem Leitfaden folgen.**

## Grundlagen des Privacy Manifests

### Definition des Privacy Manifests

Ein Privacy Manifest ist eine strukturierte Datei, die die Datenpraktiken Ihrer App beschreibt. Sie enthält Details zu Elementen wie APIs, die auf Nutzerdaten zugreifen, Tracking-Domains, erfasste Datentypen und Integration von Drittanbieter-SDKs. Dieses Dokument hilft nicht nur Vertrauen aufzubauen, sondern stellt auch die Einhaltung der App Store-Richtlinien sicher. Schauen wir uns die wichtigsten Komponenten an, die Ihr Manifest enthalten sollte.

### Hauptelemente des Privacy Manifests

Hier sind die wichtigsten Elemente, die Sie in Ihrem Privacy Manifest aufnehmen sollten, um Apples Anforderungen zu erfüllen:

1.  **Erforderliche Grund-APIs**  
    Dieser Abschnitt listet die datenschutzsensiblen APIs auf, die Ihre App verwendet, und erklärt, warum sie notwendig sind.
    
    Nachfolgend eine Tabelle mit häufigen API-Anforderungen:
    
    | API-Kategorie | Häufige Verwendung | Erforderliche Dokumentation |
    | --- | --- | --- |
    | Standortdienste | Benutzernavigation | Zweckstring und Nutzungsbeschreibung |
    | Fotobibliothek | Profilbilder | Zugriffsebene und Absicht |
    | Kontakte | Adressbuch-Synchronisation | Datenminimierungserklärung |
    
2.  **Datenschutzkennzeichnungen**  
    Diese Kennzeichnungen bieten Transparenz durch Angabe von:
    
    -   Arten der erfassten Daten
    -   Gründe für die Datenerfassung
    -   Ob die Daten mit der Benutzeridentität verknüpft sind
    -   Wie die Daten für Tracking verwendet werden
3.  **Tracking-Domains**  
    Dieser Abschnitt listet alle Domains auf, die am Tracking beteiligt sind, wie solche für Analysen, Werbung oder Datenverarbeitung durch Dritte.
    

> "App Store konform" - Capgo [\[1\]](https://capgo.app/)

Laut Capgo halten sich 95% der Nutzer innerhalb von 24 Stunden an Updates. Mit über 23,5 Millionen durchgeführten Updates [\[1\]](https://capgo.app/) ist es wichtig, Ihre Datenschutzdokumentation aktuell zu halten, um das Vertrauen der Nutzer zu bewahren.

## Erstellung von Privacy Manifests für [Capacitor](https://capacitorjs.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/7e137b9b90adb3934b29b03381f213c1.jpg)

### Einrichtungsvoraussetzungen

Bevor Sie mit der Erstellung des Manifests beginnen, stellen Sie sicher, dass Sie Folgendes haben:

-   Xcode 15 oder höher installiert
-   Ein Capacitor 5.0+ Projekt eingerichtet
-   Zugriff auf die `Info.plist`-Datei Ihrer App
-   Ein grundlegendes Verständnis der JSON-Struktur
-   Dokumentation über die Datenerfassungspraktiken Ihrer App

### Erstellungsschritte

Beginnen Sie mit der Erstellung einer `PrivacyInfo.xcprivacy`-Datei in Ihrem iOS-Projektverzeichnis. Diese Datei muss bestimmten Formatierungsrichtlinien folgen:

**Grundlegende Informationen einrichten**

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": []
}
```

**Details zur Datenerfassung definieren**

```json
{
    "NSPrivacyAccessedAPITypes": [
        {
            "NSPrivacyAccessedAPIType": "NSLocationWhenInUseUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["1.1"]
        },
        {
            "NSPrivacyAccessedAPIType": "NSCameraUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["2.1"]
        }
    ]
}
```

**Tracking-Domains hinzufügen**

```json
{
    "NSPrivacyTrackingDomains": [
        "analytics.yourdomain.com",
        "metrics.yourdomain.com"
    ]
}
```

### Vermeidung häufiger Fehler

Beachten Sie diese Tipps, um Probleme zu vermeiden:

-   **Alle erforderlichen Felder einfügen**: Auch wenn einige Felder leer sind, müssen sie vorhanden sein.
-   **Gültige API-Typen verwenden**: Überprüfen Sie API-Kennungen anhand der offiziellen Apple-Dokumentation.
-   **JSON-Formatierung prüfen**: Führen Sie Ihre Datei durch einen JSON-Linter, um Syntaxfehler zu finden.
-   **Vollständige Gründe angeben**: Stellen Sie sicher, dass jeder API-Zugriff einen entsprechenden Grund-Code enthält.
-   **Informationen aktuell halten**: Aktualisieren Sie das Manifest bei Hinzufügung neuer Funktionen.

Stellen Sie außerdem sicher, dass die Manifest-Datei unter 512KB bleibt, um Build-Fehler zu vermeiden. Validieren Sie die Datei regelmäßig während des Xcode-Build-Prozesses, um Fehler frühzeitig zu erkennen. Sobald Ihr Manifest fertig ist, integrieren Sie es in Ihr Capacitor-Projekt gemäß den Richtlinien zur Dateiplatzierung.

## Privacy Manifests zu Capacitor hinzufügen

### Leitfaden zur Dateiplatzierung

Um ein Privacy Manifest in Ihr Capacitor-Projekt einzufügen, platzieren Sie die `PrivacyInfo.xcprivacy`-Datei in der folgenden Verzeichnisstruktur:

```
your-app/
├── ios/
│   ├── App/
│   │   ├── PrivacyInfo.xcprivacy
│   │   └── Info.plist
│   └── App.xcworkspace
```

Für Capacitor-Plugins verwenden Sie diese Struktur:

```
your-plugin/
├── ios/
│   ├── Plugin/
│   │   └── PrivacyInfo.xcprivacy
│   └── Plugin.xcodeproj
```

### Build-Einstellungen einrichten

Sobald die Datei platziert ist, aktualisieren Sie Ihre Xcode-Build-Einstellungen für eine korrekte Integration:

1.  Öffnen Sie Ihr Projekt in Xcode.
2.  Wählen Sie unter **TARGETS** Ihr App- oder Plugin-Target aus.
3.  Gehen Sie zum Tab **Build Settings**.
4.  Setzen Sie **Privacy Manifest Development Region** auf `en`.
5.  Setzen Sie **Include Privacy Manifest** auf `YES`.

Wenn Ihr Projekt [CocoaPods](https://cocoapods.org/) verwendet, fügen Sie den folgenden Ausschnitt in Ihre `Podfile` ein, um das Privacy Manifest zu aktivieren:

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['INCLUDE_PRIVACY_MANIFEST'] = 'YES'
    end
  end
end
```

Nach diesen Änderungen fahren Sie mit Implementierungsprüfungen fort, um zu verifizieren, dass alles korrekt eingerichtet ist.

### Implementierungsprüfung

Um sicherzustellen, dass das Privacy Manifest wie beabsichtigt funktioniert, folgen Sie diesen Schritten:

1.  **Build-Verifizierung**
    
    -   Bestätigen Sie, dass es keine datenschutzbezogenen Warnungen während des Builds gibt.
    -   Stellen Sie sicher, dass das Manifest ohne Probleme kompiliert.
    -   Überprüfen Sie, ob das Privacy Manifest in den Build-Produkten enthalten ist.
2.  **Laufzeit-Validierung**
    
    -   Testen Sie im Debug-Modus auf korrekte Datenschutzaufforderungen und API-Zugriffsverhalten.
3.  **App Store Connect-Validierung**
    
    -   Laden Sie Ihren Build hoch und überprüfen Sie den Datenschutzbericht in App Store Connect.
    -   Prüfen Sie, ob API-Deklarationen vollständig und Tracking-Domain-Formate korrekt sind.

Wenn Sie einen "Privacy Manifest validation failed"-Fehler erhalten, überprüfen Sie Ihr Manifest erneut, um sicherzustellen, dass es die neuesten App Store-Anforderungen erfüllt. Achten Sie besonders auf API-Typen und Tracking-Domain-Konfigurationen.

## Apple Privacy Manifest Änderungen

<iframe src="https://www.youtube.com/embed/S8JnUkUkmbs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Tests und Korrekturen

Die Erstellung eines Privacy Manifests, das Apples Richtlinien entspricht, ist entscheidend. Um auf Kurs zu bleiben, integrieren Sie zuverlässige Fehlerverfolgung in Ihren Entwicklungsprozess. Dies hilft, Entwicklungsbemühungen mit Compliance-Anforderungen zu verknüpfen.

Ein Tool wie [Capgo](https://capgo.app) kann helfen. Es überwacht API-Zugriffe und identifiziert Manifest-Probleme, bevor sie Benutzer beeinflussen. Sobald potenzielle Probleme erkannt werden, können Sie sich auf gründliche Validierung konzentrieren.

Nach Aktualisierungen testen Sie Ihr Manifest in einer Entwicklungsumgebung. Nutzen Sie Erkenntnisse aus der Fehlerverfolgung, um Ihre Überprüfung zu leiten. Dieser Ansatz hilft sicherzustellen, dass Ihre App mit Apples Datenschutzstandards konform bleibt.

## [Capgo](https://capgo.app/) Datenschutz-Tools

![Capgo](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/454adbba4c00491adce88db59812b177.jpg)

Capgo vereinfacht die Verwaltung von Privacy Manifests und App-Updates und stellt sicher, dass Ihre Datenschutzstandards ohne Verzögerungen bei Bereitstellungen intakt bleiben.

### Capgo Funktionen

Mit mehr als **23,5 Millionen gesicherten Updates** und einer **82%igen globalen Erfolgsrate** stellt Capgo sicher, dass **95% der aktiven Nutzer Updates innerhalb von 24 Stunden erhalten** [\[1\]](https://capgo.app/). Hier sind die Angebote:

-   **Ende-zu-Ende-Verschlüsselung** für sichere Updates
-   **Kanal-System** für kontrollierte Update-Verteilung
-   **Fehlerverfolgung** zur schnellen Identifizierung und Behebung von Problemen
-   **Ein-Klick-Rollback** für sofortige Rückkehr zu einer vorherigen Version

Diese Tools machen die Integration von Capgo in Ihren Workflow reibungslos und effizient.

### Verwendung von Capgo

Um zu beginnen, [installieren Sie das Capgo-Plugin](https://capgo.app/docs/plugin/cloud-mode/getting-started/) mit diesem Befehl:

```bash
npx @capgo/cli init
```

Capgo integriert sich nahtlos in CI/CD-Pipelines und automatisiert die Privacy Manifest-Validierung über Plattformen wie [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/) oder [Jenkins](https://www.jenkins.io/). Ob Sie Cloud- oder Self-Hosted-Optionen wählen, Capgo unterstützt 750 Produktions-Apps und stellt sicher, dass jedes Update den Datenschutzstandards entspricht.

> "Wir praktizieren agile Entwicklung und @Capgo ist mission-kritisch bei der kontinuierlichen Bereitstellung an unsere Nutzer!" – Rodrigo Mantica

> "Capgo ist eine intelligente Möglichkeit, Hot-Code-Pushes durchzuführen 🙂" – NASA's OSIRIS-REx

Capgo enthält auch integrierte Analysen zur Überwachung von Update-Erfolgsraten und Nutzerengagement in Echtzeit. Dies stellt sicher, dass Datenschutz-Updates Ihre gesamte Nutzerbasis erreichen und dabei Apples Richtlinien einhalten.

## Fazit

### Wichtige Erkenntnisse

Bei der Verwaltung von Privacy Manifests ist es entscheidend, konform zu bleiben und starke Sicherheitsmaßnahmen aufrechtzuerhalten. Hier sind die wichtigsten Punkte:

-   **Ende-zu-Ende-Verschlüsselung**: Hält Updates von Anfang bis Ende sicher.
-   **Echtzeit-Überwachung**: Verfolgt die Verteilung von Updates effektiv.
-   **Sofortige Rollback-Fähigkeit**: Dient als Sicherheitsnetz für schnelle Korrekturen.
-   **Automatisierte Validierung**: Stellt sicher, dass Ihre Updates die Compliance-Standards erfüllen.

Der Aufbau eines zuverlässigen Update-Systems hilft Ihnen, mit den sich entwickelnden Datenschutzanforderungen von Apple und Google Schritt zu halten. Dieser Ansatz hat nachweislich die App Store-Genehmigungsraten verbessert und das Nutzervertrauen gestärkt [\[1\]](https://capgo.app/).

### Erste Schritte

Sie können mit der Implementierung dieser

-   **Umgebung einrichten**: Führen Sie `npx @capgo/cli init` aus, um zu beginnen.
-   **Datenschutzfunktionen aktivieren**: Verwenden Sie Ende-zu-Ende-Verschlüsselung für sichere Updates.
-   **Monitoring-Tools einsetzen**: Verfolgen Sie Updates mit Analysen.
-   **Rollbacks planen**: Stellen Sie sicher, dass Sie bei Bedarf schnell zu früheren Versionen zurückkehren können.

> "Capgo ist ein unverzichtbares Tool für Entwickler, die ihre Produktivität steigern möchten. Die Vermeidung von Verzögerungen bei der Überprüfung von Fehlerbehebungen ist ein echter Durchbruch." - Bessie Cooper

Regelmäßige Updates und die richtigen Tools sind der Schlüssel, um compliant zu bleiben und sich kontinuierlich zu verbessern.
