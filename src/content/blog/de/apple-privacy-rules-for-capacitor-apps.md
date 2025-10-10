---
slug: apple-privacy-rules-for-capacitor-apps
title: Datenschutzregeln von Apple für Capacitor Apps
description: >-
  Erfahren Sie, wie Sie die Datenschutzregeln von Apple für die App-Entwicklung
  einhalten können, indem Sie die Zustimmung der Benutzer, Datentransparenz und
  sichere Aktualisierungen implementieren.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-31T01:48:03.832Z
updated_at: 2025-10-10T02:17:19.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf-1743385695606.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Apple privacy rules, Capacitor apps, data transparency, user consent, App
  Store compliance, privacy policy
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---
**Die Datenschutzregeln von Apple verlangen von [Capacitor](https://capacitorjs.com/) App-Entwicklern jetzt, sich auf Transparenz bei Nutzerdaten und Compliance zu konzentrieren, um die App Store-Genehmigung zu erhalten und das Vertrauen der Nutzer zu bewahren.**

Wichtige Schritte sind:

-   **Privacy Manifest**: Dokumentation der Datenerfassung, APIs und Tracking-Details.
-   **Nutzereinwilligung**: Verwendung der App Tracking Transparency (ATT) für Tracking-Berechtigungen.
-   **Datenzugriff**: Klare Definition von Berechtigungen für Funktionen wie Kamera, Standort und Kontakte.
-   **[Datenschutzerklärung](https://capgo.app/dp/)**: Bereitstellung einer zugänglichen, klaren Richtlinie zur Datennutzung.
-   **Tests & Updates**: Gründliche Compliance-Tests und Nutzung sicherer Update-Systeme wie [Capgo](https://capgo.app/).

Diese Regeln betonen Nutzerkontrolle, Transparenz und sichere App-Updates. Entwickler können dem Leitfaden folgen, um compliant zu bleiben und datenschutzbewusste Apps bereitzustellen.

## App Store-Ablehnung verhindern: Apple Privacy Manifest hinzufügen ...

<iframe src="https://www.youtube.com/embed/D7R87wm9IJE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Apple Datenschutzregeln erklärt

Apple verlangt von Entwicklern, Klarheit zu priorisieren und Nutzern Kontrolle über ihre Daten zu geben. Für Capacitor-Entwickler bedeutet dies, offen über die Art der Datenerfassung und -nutzung ihrer App zu informieren, sowohl gegenüber Nutzern als auch Apple-Prüfern.

### Dokumentation der Datenpraktiken

Führen Sie detaillierte interne Aufzeichnungen über den Umgang mit Daten in Ihrer App. Achten Sie darauf, Folgendes einzubeziehen:

-   Arten der erfassten Nutzerdaten
-   Gründe für die Datenerfassung
-   Details zu verwendeten Drittanbieterdiensten oder SDKs
-   Art der Datenübertragung oder -weitergabe

Die Organisation dieser Informationen hilft nicht nur bei der Compliance, sondern erleichtert auch die Beantwortung von Fragen während des Prüfungsprozesses. Stellen Sie sicher, dass diese Praktiken transparent in Ihren App Store-Datenschutzkennzeichnungen und in den App-Einstellungen dargestellt werden.

### Schlüsselelemente der Datenschutzerklärung

Die Datenschutzinformationen Ihrer App sollten klar darlegen:

-   Erforderliche Systemfunktionen und API-Berechtigungen für die App-Funktionalität
-   Kategorien der erfassten Daten
-   Tracking-Aktivitäten oder Kommunikation mit externen Diensten
-   Wie die Daten verwendet werden und warum

Klare Offenlegungen schaffen Vertrauen bei den Nutzern und reduzieren die Wahrscheinlichkeit von Problemen bei der App Store-Prüfung.

### Compliance-Zeitplan

Apple aktualisiert seine Datenschutzanforderungen in Phasen. Bleiben Sie informiert, indem Sie regelmäßig Apples Entwickler-Updates überprüfen, um sicherzustellen, dass Ihre App den neuesten Regeln entspricht.

## Datenschutzregeln zu Ihrer App hinzufügen

Erfahren Sie, wie Sie Apples Datenschutzregeln in Ihrer Capacitor-App mit dieser Schritt-für-Schritt-Anleitung implementieren.

### Setup-Anforderungen

Stellen Sie vor Beginn Folgendes sicher:

-   Sie haben **Xcode 15 oder höher** für Privacy Manifest-Unterstützung.
-   Capacitor 6 oder 7 ist installiert.
-   Das iOS-Deployment-Target ist auf **iOS 14.5 oder höher** eingestellt.
-   Ihre App enthält eine korrekt konfigurierte `Info.plist`-Datei.
-   Sie haben einen **Apple Developer Account** mit gültigen Zertifikaten.

Wenn Sie Capgo verwenden, richten Sie Ende-zu-Ende-Verschlüsselung ein, um die Datensicherheit zu gewährleisten. Korrekt mit Capgo konfigurierte Apps haben eine globale Erfolgsquote von 82% bei Updates [\[1\]](https://capgo.app/) erreicht.

Sobald Ihre Umgebung bereit ist, fahren Sie mit der Erstellung und Konfiguration Ihres Privacy Manifests fort.

### Privacy Manifest Einrichtungsleitfaden

1.  **Privacy Manifest-Datei erstellen**

Fügen Sie eine neue Datei namens `PrivacyInfo.xcprivacy` zum Stammverzeichnis Ihres iOS-Projekts hinzu:

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": [],
    "NSPrivacyAccessedAPITypes": []
}
```

2.  **Datenerfassung definieren**

Geben Sie die Arten von Daten an, die Ihre App erfasst, wie zum Beispiel:

-   Benutzeranalysen
-   Geräteinformationen
-   Nutzungsmuster
-   Netzwerkzugriff

3.  **API-Zugriff konfigurieren**

Listen Sie die System-APIs auf, die Ihre App benötigt, einschließlich:

-   Kamera
-   Standort
-   Kontakte  
-   Fotobibliothek

### Compliance-Richtlinien

Stellen Sie nach der Einrichtung des Datenschutzmanifests sicher, dass Ihre Datenerfassungspraktiken den Standards von Apple entsprechen.

**Datenminimierung**
Erfassen Sie nur Daten, die für die Kernfunktionen Ihrer App erforderlich sind. Capgo-Nutzer berichten von einer 95%igen aktiven Nutzer-Update-Rate innerhalb von 24 Stunden [\[1\]](https://capgo.app/), was zeigt, dass datenschutzbewusste Ansätze die Nutzer engagiert halten.

**Transparenz für Benutzer**
Erklären Sie deutlich:

-   Warum Daten erfasst werden
-   Wie lange sie gespeichert werden
-   Verfügbare Benutzersteuerungsoptionen
-   Alle Datenfreigaberichtlinien

### Testanforderungen

Testen Sie Ihre App vor der Einreichung auf Datenschutzkonformität. Konzentrieren Sie sich auf diese Bereiche:

| Testbereich | Prüfpunkte |
| --- | --- |
| Datenzugriff | Überprüfung der korrekten Berechtigungsaufforderungen. |
| Datenschutzkennzeichnungen | Bestätigung der Richtigkeit der Deklarationen. |
| Benutzersteuerung | Test der Opt-out-Funktionen. |
| [Data Storage](https://capgo.app/plugins/capacitor-data-storage-sqlite/) | Überprüfung der Verschlüsselungssicherheit. |

Capgo hat erfolgreich 23,5 Millionen Updates unter Einhaltung der Datenschutzbestimmungen ausgeliefert [\[1\]](https://capgo.app/), was beweist, dass es möglich ist, Updates und Datenschutz effektiv in Einklang zu bringen.

Befolgen Sie diese Richtlinien, um sicherzustellen, dass Ihre App bereit für Tests und die App Store-Einreichung ist.

## Benutzerdatenschutz-Steuerung

Dieser Abschnitt konzentriert sich darauf, wie Benutzer die Kontrolle über Tracking und Datenzugriff erhalten, aufbauend auf den etablierten Datenschutzrichtlinien.

### Einrichten von Tracking-Berechtigungen

Um App Tracking Transparency (ATT) in Ihrer Capacitor-App zu konfigurieren, fügen Sie den folgenden Schlüssel in Ihrer `Info.plist`-Datei ein:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use tracking to provide personalized features and improve app performance</string>
```

Als Nächstes behandeln Sie die Tracking-Anfrage während der Initialisierung Ihrer App:

```typescript
import { App } from '@capacitor/app';

async function requestTrackingPermission() {
  const status = await App.requestTrackingAuthorization();
  return status.authorized;
}
```

**Tipps für die ATT-Implementierung**:

-   Zeigen Sie den Berechtigungsdialog an einem sinnvollen Punkt in der Benutzererfahrung.
-   Erklären Sie die Vorteile des Trackings klar, bevor die Systemaufforderung erscheint.
-   Respektieren Sie Benutzerentscheidungen und bieten Sie Alternativen für diejenigen, die sich dagegen entscheiden.

### Datenzugriffsberechtigungen

Für iOS müssen Sie Berechtigungen in der `Info.plist` Ihrer App definieren. Hier sind einige häufige Berechtigungen und ihre Beschreibungen:

| Berechtigungstyp | Info.plist-Schlüssel | Verwendungsbeschreibung |
| --- | --- | --- |
| Kamera | NSCameraUsageDescription | Erforderlich für Fotoaufnahmen |
| Standort | NSLocationWhenInUseUsageDescription | Für standortbasierte Funktionen |
| Fotos | NSPhotoLibraryUsageDescription | Zugriff zum Speichern/Laden von Bildern |
| Kontakte | NSContactsUsageDescription | Für Kontaktintegration |

**Wann Berechtigungen anfordern**:

-   Fragen Sie nur nach Berechtigungen, wenn sie benötigt werden, und stellen Sie klaren Kontext bereit.
-   Erklären Sie kurz, warum jede Berechtigung notwendig ist, bevor Sie danach fragen.
-   Wenn ein Benutzer eine Anfrage ablehnt, bieten Sie alternative Funktionen oder Optionen an.

Nach dem Einrichten der Berechtigungen stellen Sie sicher, dass Benutzer über diese Praktiken durch eine transparente Datenschutzerklärung informiert werden.

### Anzeige der Datenschutzerklärung

Machen Sie die Datenschutzerklärung Ihrer App leicht auffindbar und verständlich.

**Was einzuschließen ist**:

-   Details zur Datenerhebung
-   Wie die Daten verwendet werden
-   Aufbewahrungsfristen für gespeicherte Daten
-   Benutzerrechte bezüglich ihrer Daten
-   Kontaktdaten für Datenschutzbedenken

Sie können ein Datenschutzzentrum zu Ihrer App wie folgt hinzufügen:

```typescript
import { Browser } from '@capacitor/browser';

async function showPrivacyPolicy() {
  await Browser.open({
    url: 'https://your-app.com/privacy-policy'
  });
}
```

**Wie die Datenschutzerklärung anzeigen**:

-   Platzieren Sie den Link zur Datenschutzerklärung in den App-Einstellungen für einfachen Zugriff.
-   Verwenden Sie einfache, klare Sprache, um technische Konzepte zu erklären.
-   Fügen Sie Visualisierungen hinzu, um das Verständnis zu verbessern.
-   Stellen Sie einen Versionsverlauf bereit und informieren Sie Nutzer über Updates.
-   Ermöglichen Sie Nutzern den Export ihrer Daten auf Anfrage.

Stellen Sie sicher, dass Updates Ihrer App (z.B. über Capgo) diese Datenschutzeinstellungen einhalten und das Nutzervertrauen bewahren.

## Testing und App Store Einreichung

Nachdem Sie Ihr Datenschutzmanifest und die Nutzerkontrollen eingerichtet haben, ist der nächste Schritt gründliches Testen, um sicherzustellen, dass alles wie beabsichtigt funktioniert. Dieser Prozess hilft, die Compliance vor der Einreichung im App Store zu bestätigen.

### Datenschutz-Testing in [Xcode](https://en.wikipedia.org/wiki/Xcode)

Aktivieren Sie zunächst den Datenschutzbericht in Xcode:

```swift
// Enable Privacy Report in Xcode scheme
Edit Scheme > Run > Diagnostics > Enable Privacy Report
```

Führen Sie Ihre App im Debug-Modus aus und prüfen Sie den Datenschutzbericht in der Konsole. Darauf sollten Sie beim Testen achten:

| Testbereich | Was zu prüfen ist |
| --- | --- |
| App-Tracking | Timing und Anzeige des ATT-Dialogs |
| Datenzugriff | Korrekte Implementierung von Berechtigungen |
| API-Nutzung | Vollständigkeit des Datenschutzmanifests |
| Netzwerkaufrufe | Sicherheit der Datenübertragung |

Dieses Testing stellt sicher, dass Ihre App bereit für die Einreichung ist und die Compliance-Standards erfüllt.

### Häufige Datenschutzfehler

Beheben Sie nach dem Testen diese häufigen Probleme, um Verzögerungen bei der Einreichung zu vermeiden:

-   **Unvollständige `privacy-manifest.json`**: Stellen Sie sicher, dass alle erforderlichen APIs und Tracking-Domains aufgeführt sind.
-   **Fehlende Zweckangaben**: Erklären Sie den Grund für jede Berechtigungsanfrage klar.
-   **Fehlerhafte Tracking-Anfragen**: Lösen Sie Tracking-Berechtigungen nur nach einer Benutzeraktion aus.

### App Store Datenschutzdetails

Bei der Einreichung Ihrer App müssen Sie genaue Informationen über Ihre Datenschutzpraktiken angeben. Hier ist, was Sie einschließen sollten:

| Datenschutzkategorie | Benötigte Informationen | Beispiele |
| --- | --- | --- |
| Datenerfassung | Arten der erfassten Daten | Geräte-ID, Standort |
| Datennutzung | Warum die Daten erfasst werden | App-Funktionalität, Analytik |
| Datenverknüpfung | Wie Daten mit Nutzern verbunden werden | Kontoinformationen, Nutzungsdaten |
| Daten-Tracking | Details zum App-übergreifenden Tracking | Werbung, Analytik |

**Wichtige App Store Anforderungen**:

-   Aktualisieren Sie Ihre Datenschutzrichtlinien-URL vor der Einreichung.
-   Stellen Sie sicher, dass deklarierte Berechtigungen mit der App-Funktionalität übereinstimmen.
-   Dokumentieren Sie Datenschutzpraktiken für verwendete Drittanbieter-SDKs.
-   Bestätigen Sie, dass alle Netzwerkübertragungen verschlüsselt sind.

## Verwendung von [Capgo](https://capgo.app/) für Updates

![Capgo](https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf/f3ac818a2fec22e90998e19561d68a19.jpg)

Capgo bietet ein sicheres System für Live-Updates unter Einhaltung von Apples Datenschutzregeln.

### Capgo Datenschutzfunktionen

Capgos Update-System wurde mit Fokus auf Sicherheit und Datenschutz entwickelt:

| Funktion | Datenschutzvorteil |
| --- | --- |
| Ende-zu-Ende-Verschlüsselung | Stellt sicher, dass nur autorisierte Nutzer Updates entschlüsseln können |
| App Store Compliance | Entspricht Apples strengen Datenschutzanforderungen |
| Sichere Bereitstellung | Schützt die Verteilung von Updates |
| Zugriffskontrolle | Ermöglicht detaillierte Berechtigungsverwaltung |

Diese Funktionen schützen Updates und wahren die Privatsphäre der Nutzer.

> "Die einzige Lösung mit echter Ende-zu-Ende-Verschlüsselung, andere signieren Updates nur" - Capgo [\[1\]](https://capgo.app/)

### Update-Bereitstellung mit Capgo

So stellen Sie datenschutzkonforme Updates mit Capgo bereit:

1.  **Installieren Sie das Capgo-Plugin**:
    
    Führen Sie den folgenden Befehl aus, um zu beginnen:
    
    ```bash
    npx @capgo/cli init
    ```
    
2.  **Konfigurieren Sie Ihre Datenschutzeinstellungen**:
    
    Aktualisieren Sie Ihr Datenschutzmanifest, um Capgos Domains und APIs einzuschließen.
    
3.  **Richten Sie verschlüsselte Update-Kanäle ein**:
    
    Erstellen Sie separate Kanäle für verschiedene Bereitstellungsphasen, um sichere Updates zu gewährleisten.
    

Capgo stellt sicher, dass 95% der aktiven Nutzer innerhalb von 24 Stunden Updates erhalten, mit einer globalen Erfolgsrate von 82% [\[1\]](https://capgo.app/). Das Kanalsystem macht auch das Verwalten der Update-Zielgruppen übersichtlich.

### Benutzergruppen-Updates in Capgo

Capgo ermöglicht es Ihnen, bestimmte Benutzergruppen während Updates sicher anzusprechen:

| Update-Typ | Datenschutzaspekte | Implementierung |
| --- | --- | --- |
| Beta-Tests | Begrenzt die Verfügbarkeit auf ausgewählte Nutzer | Verwendung eines separaten Kanals mit eingeschränktem Zugriff |
| Stufenweise Einführung | Schrittweise Freigabe an Benutzer | Verteilung von Updates basierend auf Prozentsätzen |

> "Wir praktizieren agile Entwicklung und @Capgo ist mission-kritisch bei der kontinuierlichen Bereitstellung an unsere Nutzer!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Capgos detaillierte Berechtigungen stellen sicher, dass nur autorisierte Teammitglieder sicher auf Updates zugreifen und diese verwalten können.

## Zusammenfassung

### Wichtige Datenschutzanforderungen

Apples Datenschutzregeln für [Capacitor apps](https://capgo.app/blog/capacitor-comprehensive-guide/) umfassen folgende Anforderungen:

| Anforderung | Details |
| --- | --- |
| **Datenschutzmanifest** | Einbindung notwendiger Domains, APIs und Tracking-Deklarationen. |
| **Nutzereinwilligung** | Verwendung des ATT-Frameworks zur Anfrage von Tracking-Berechtigungen von Nutzern. |
| **Datenzugriff** | Konfiguration von Berechtigungen für den Zugriff auf Fotos, Standort und Kontakte. |
| **Datenschutzerklärung** | Bereitstellung einer klaren, zugänglichen Richtlinie sowohl in der App als auch im App Store. |
| **Update-Sicherheit** | Sicherstellung, dass Live-Updates verschlüsselte Bereitstellungskanäle verwenden. |

### Implementierungs-Checkliste

Befolgen Sie diese Checkliste, um Apples Anforderungen zu erfüllen:

-   **Datenschutzmanifest konfigurieren**  
    API-Deklarationen hinzufügen, Tracking-Domains auflisten und Zwecke der Datennutzung dokumentieren.
    
-   **Nutzerberechtigungen einrichten**  
    ATT-Dialog implementieren, Zugriff für Fotos und Medien konfigurieren und Standortdienste aktivieren.
    
-   **Sicheres Update-System**  
    Eine datenschutzkonforme Update-Lösung verwenden, verschlüsselte Kanäle einrichten und Benutzer-Targeting-Kontrollen konfigurieren.
    

Capgos Plattform bietet eine zuverlässige Möglichkeit, diese Datenschutzstandards zu erfüllen und dabei Ihre App funktional und nutzerzentriert zu halten [\[1\]](https://capgo.app/).
