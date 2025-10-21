---
slug: understanding-apples-privacy-manifest
title: Verstehen des Apple-Datenschutzmanifests
description: >-
  Erfahren Sie mehr über Apples obligatorisches Datenschutz-Manifest, seine
  Bedeutung für iOS-Apps und wie Sie die Anforderungen mit klaren Richtlinien
  effektiv erfüllen können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T02:23:31.365Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92-1744943188853.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Privacy Manifest, iOS, data collection, App Store, compliance, Capgo, JSON,
  updates
tag: 'Development, Mobile, Security'
published: true
locale: de
next_blog: ''
---
**Das Privacy Manifest von Apple ist jetzt für alle iOS-Apps verpflichtend.** Ab Mai 2024 muss jede App Store-Einreichung diese JSON-Datei enthalten, die Datenerfassung, API-Nutzung, Drittanbieter-SDKs und Netzwerkdomänen detailliert aufführt. Hier ist, was Sie wissen müssen:

-   **Was es ist**: Eine JSON-Konfigurationsdatei, die offenlegt:
    -   Erfasste Daten und deren Zweck
    -   Verwendete APIs und Drittanbieter-SDKs
    -   Zugriff auf externe Domains
-   **Warum es wichtig ist**: Gewährleistet Transparenz und Einhaltung von Apples Datenschutzstandards.
-   **Wie man es einhält**: Fügen Sie das Manifest Ihrem iOS-App-Bundle hinzu und aktualisieren Sie es regelmäßig, besonders bei Verwendung von Live-Update-Tools wie [Capgo](https://capgo.app/).

**Schnelltipp**: Tools wie Capgo vereinfachen die Compliance durch automatisierte Manifest-Updates, bieten sofortige Bereitstellungen und stellen Analysen zur Erfolgsverfolgung bereit.

Lesen Sie weiter, um zu erfahren, wie Sie Ihr Privacy Manifest einrichten und überprüfen, häufige Fallstricke vermeiden und reibungslose Updates sicherstellen.

## WWDC23: Erste Schritte mit Privacy Manifests | Apple

<iframe src="https://www.youtube.com/embed/OQMF4LDqscc" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Kernelemente des Privacy Manifests

Apples Privacy Manifest umfasst drei Hauptkomponenten:

1.  **Datenerklärung**: Geben Sie die Arten von Daten an, die Ihre App sammelt, warum sie gesammelt werden, welche datenschutzsensiblen APIs sie verwendet und welche Drittanbieter-SDKs in die App integriert sind. Sie müssen für jeden Punkt einen klaren geschäftlichen Grund angeben.
    
2.  **Externe Domains**: Listen Sie alle externen Domains auf, mit denen Ihre App kommuniziert, erklären Sie den Zweck der Kommunikation und beschreiben Sie die implementierten Sicherheitsmaßnahmen.
    
3.  **JSON-Format und Einbettung**: Befolgen Sie Apples vorgeschriebene JSON-Struktur für das Manifest und stellen Sie sicher, dass es sowohl in Ihrem App-Bundle als auch in Live-Update-Paketen eingebettet ist.
    

Als Nächstes führen wir Sie durch die Erstellung und Überprüfung Ihres Manifests in einem Capacitor-Projekt.

## Einrichten des Privacy Manifests in [Capacitor](https://capacitorjs.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/7e137b9b90adb3934b29b03381f213c1.jpg)

### Erstellen der Manifest-Datei

Beginnen Sie mit dem Hinzufügen einer Datei namens `ios/App/Resources/PrivacyInfo.xcprivacy`, um die API-Nutzung und Datenerfassung Ihrer App zu deklarieren. Hier ist ein Beispiel, wie die Datei aussehen könnte:

```json
{
  "NSPrivacyAccessedAPITypes":[{"NSPrivacyAccessedAPIType":"NSUserDefaults","NSPrivacyAccessedAPITypeReasons":["FE001"]}],
  "NSPrivacyCollectedDataTypes":[{"NSPrivacyDataType":"NSPrivacyDataTypeDeviceID","NSPrivacyDataReason":"Basic app functionality"}]
}
```

Öffnen Sie nach der Erstellung dieser Datei [Xcode](https://developer.apple.com/xcode/), um sicherzustellen, dass sie korrekt in Ihr Projekt eingebunden ist.

### Testen und Verifizierung

Navigieren Sie in Xcode zu **Produkt > Analysieren**, um einen Datenschutzbericht zu generieren. Überprüfen Sie den Bericht sorgfältig auf Warnungen oder nicht deklarierte APIs und nehmen Sie notwendige Anpassungen vor, um Probleme zu vermeiden. Wenn alles in Ordnung ist, fahren Sie mit der Bereitstellung Ihrer Updates fort.

### Updates mit [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/68019d453c6b972ab5063e92/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Nach erfolgreicher Xcode-Analyse verwenden Sie Capgo für Live-Updates, um das Privacy Manifest Ihrer App aktuell zu halten. Capgo bietet:

-   **Sofortige Bereitstellungen**: 95% der Nutzer erhalten Updates innerhalb von 24 Stunden [\[1\]](https://capgo.app/).
-   **Ein-Klick-Rollback** für schnelle Korrekturen.
-   **Analyse-Tools** zur Erfolgsverfolgung und Compliance-Sicherstellung.

Der Team-Plan von Capgo kostet 83 € pro Monat (jährlich abgerechnet) und unterstützt bis zu 100.000 monatlich aktive Nutzer (MAU) und 2.000 GB Bandbreite.

## Datenschutz-Compliance-Richtlinien

Nach der Überprüfung Ihres Manifests in Xcode ist es wichtig, die Datenschutz-Compliance aufrechtzuerhalten. Hier erfahren Sie, wie Sie auf Kurs bleiben.

### Empfohlene Praktiken

Erwägen Sie die Nutzung von Capgo, um Manifest-Updates sofort zu pushen und Verzögerungen durch App Store-Überprüfungen zu vermeiden. Dieses Tool unterstützt auch stufenweise Einführungen und ermöglicht es Ihnen, Änderungen mit Echtzeit-Analysen zu testen, bevor Sie sie für alle Nutzer ausrollen [\[1\]](https://capgo.app/).

### Häufige Fallstricke

Die Abhängigkeit von [manuellen Updates](https://capgo.app/docs/plugin/cloud-mode/manual-update/) kann langsam sein, da sie von App Store-Überprüfungszeiten abhängen, die Tage oder sogar Wochen dauern können. Dies führt oft zu veralteter Dokumentation. Automatisierte Tools hingegen ermöglichen sofortige Updates, bieten Analysen zur Überwachung von Bereitstellungen und erleichtern das Zurückrollen von Änderungen bei Problemen [\[1\]](https://capgo.app/).

### Manuelle vs. Automatisierte Updates

Hier ein schneller Vergleich von manuellen und automatisierten Update-Methoden:

-   **Liefergeschwindigkeit**: Manuelle Updates können Tage oder Wochen dauern, während [automatisierte Updates](https://capgo.app/docs/live-updates/update-behavior/) 95% der Nutzer innerhalb von 24 Stunden erreichen [\[1\]](https://capgo.app/).
-   **Erfolgsverfolgung**: Manuelle Methoden variieren, aber automatisierte Updates erreichen weltweit eine Erfolgsquote von 82% [\[1\]](https://capgo.app/).
-   **Rollback-Optionen**: Manuelle Updates bieten begrenzte Wiederherstellung, während automatisierte Updates sofortige Rollbacks ermöglichen.
-   **Überwachung**: Manuelle Überprüfungen sind zeitaufwändig, während automatisierte Tools Echtzeit-Analysen bieten [\[1\]](https://capgo.app/).
-   **Verteilung**: Manuelle Systeme sind grundlegend, während automatisierte Tools erweiterte Verteilungskanäle unterstützen [\[1\]](https://capgo.app/).
-   **Sicherheit**: Manuelle Updates haben keine integrierte Verschlüsselung, während automatisierte Systeme Ende-zu-Ende-Verschlüsselung verwenden [\[1\]](https://capgo.app/).

## Vergleich von Live-Update-Tools

Schauen wir uns einen Vergleich von zwei beliebten Live-Update-Plattformen an und wie sie sich messen.

### Plattform-Funktionen und Preise

| Funktion | Capgo | [Appflow](https://ionic.io/appflow/) |
| --- | --- | --- |
| Ende-zu-Ende-Verschlüsselung | **Ja** | \-  |
| Update-Erfolgsrate | **82% weltweit** [\[1\]](https://capgo.app/) | \-  |
| Update-Lieferzeit | **95% innerhalb 24h** [\[1\]](https://capgo.app/) | \-  |
| Bundle-Download-Geschwindigkeit | **114 ms (5 MB)** [\[1\]](https://capgo.app/) | \-  |
| Jährliche Kosten (Team-Plan) | **996 €** | **6.000 €** [\[1\]](https://capgo.app/) |

**Schnelles Fazit**: Capgo bietet deutlich niedrigere Erstjahreskosten - 996 € im Vergleich zu 6.000 € bei Appflow.

Schauen wir uns nun an, wie sich Capgo speziell bei Privacy Manifest-Updates auszeichnet.

### Privacy Manifest: Capgo-Vorteile

Capgos Open-Source-Codebasis macht es zu einer starken Wahl für die Verwaltung von Privacy Manifest-Updates. Es ermöglicht schnelle Anpassungen an sich entwickelnde Datenschutzstandards und stellt sicher, dass die Compliance handhabbar bleibt [\[1\]](https://capgo.app/).

## Zusammenfassung

Seit Mai 2024 müssen alle iOS-Apps verpflichtende Manifest-Anforderungen erfüllen. Automatisierung kann die Verwaltung dieser Manifeste deutlich erleichtern. Für Capacitor-Projekte fügen Sie Ihr Manifest in das iOS-Bundle ein und nutzen Tools wie Capgo, um Updates dank seiner Ende-zu-Ende-Verschlüsselung sicher zu automatisieren.

Mit eingerichtetem Manifest und automatisierten Updates hier einige wichtige Praktiken für reibungslose Privacy Manifest-Updates:

-   Verwenden Sie CLI-Tools zur Vereinfachung der Bereitstellung.
-   Implementieren Sie Kanalsysteme für kontrollierte Update-Einführungen.
-   Führen Sie detaillierte Dokumentation Ihrer Datenerfassungsprozesse.
-   Testen und überprüfen Sie die Datenschutz-Compliance regelmäßig.
