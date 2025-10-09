---
slug: account-deletion-compliance-apple-guidelines
title: 'Kontolöschungs-Compliance: Apple-Richtlinien'
description: >-
  Erfahren Sie mehr über Apples Richtlinien zur Kontolöschung, die wichtigsten
  Anforderungen für Entwickler und bewährte Methoden zur Gewährleistung der
  Datenschutzrichtlinien der Benutzer.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-14T03:15:15.208Z
updated_at: 2025-05-14T03:16:02.945Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/6823e678f8b9f5df39f52ef5-1747192562945.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Apple guidelines, account deletion, user privacy, app compliance, mobile
  development
tag: 'Development, Mobile, Security'
published: true
locale: de
next_blog: ''
---
**Apple verlangt von allen Apps im [App Store](https://www.apple.com/app-store/), dass sie eine In-App-Option zum Löschen von Benutzerkonten anbieten.** Diese Richtlinie, die seit dem 30. Juni 2022 durchgesetzt wird, stellt sicher, dass Benutzer ihre Daten vollständig löschen können und mehr Kontrolle über ihre Privatsphäre haben. Hier ist, was Sie wissen müssen:

-   **Hauptanforderungen**:
    
    -   Die **Kontolöschungsoption** muss in den App-Einstellungen leicht zu finden sein.
    -   Benutzerdaten müssen **vollständig entfernt** werden, außer wenn eine gesetzliche Aufbewahrungspflicht besteht.
    -   Apps, die **"Sign in with Apple"** verwenden, müssen Tokens über Apples REST-API widerrufen.
-   **Für Entwickler**:
    
    -   Testen Sie den Löschvorgang auf Benutzerfreundlichkeit und vollständige Datenentfernung.
    -   Stellen Sie sicher, dass auch Drittanbieterdienste Benutzerdaten löschen.
    -   Nutzen Sie Tools wie **[Capgo](https://capgo.app/)** für Live-Updates und Compliance-Überwachung.
-   **Häufige Probleme**:
    
    -   Synchronisierung von Löschvorgängen über Plattformen hinweg.
    -   Umgang mit verwaisten Tokens und unvollständigen Datenlöschungen.

Nichteinhaltung kann zur Ablehnung oder Entfernung der App aus dem App Store führen. Entwickler sollten der Privatsphäre der Benutzer Priorität einräumen und Apples Richtlinien befolgen, um Probleme zu vermeiden.

## Technische Anforderungen

### Erforderliche Löschschritte

Der Prozess zum Löschen eines Kontos muss unkompliziert und leicht zu finden sein. Platzieren Sie ihn gut sichtbar in den Kontoeinstellungen der App - nicht in Untermenüs oder externen Links versteckt.

Hier sind die wichtigsten einzubeziehenden Schritte:

-   **Kontoüberprüfung**: Stellen Sie sicher, dass die Identität des Benutzers durch einen E-Mail-Code oder SMS bestätigt wird.
-   **Klare Kommunikation**: Erklären Sie deutlich, welche Daten gelöscht werden und heben Sie rechtliche Anforderungen zur Aufbewahrung bestimmter Informationen hervor.
-   **Bestätigungsdialog**: Bieten Sie einen abschließenden Bestätigungsbildschirm, der die Konsequenzen der Kontolöschung erläutert.

Verwenden Sie zusätzlich die Sign in with Apple REST API, um Tokens während des Kontolöschungsprozesses zu widerrufen [\[2\]](https://developer.apple.com/news/?id=12m75xbj)[\[3\]](https://www.ketch.com/blog/posts/apple-delete-account-requirement).

Sobald diese Schritte implementiert sind, konzentrieren Sie sich darauf, dass die Datenentfernung diesen Anforderungen entspricht.

### Datenentfernungsstandards

| **Datentyp** | **Entfernungsanforderungen** | **Rechtliche Überlegungen** |
| --- | --- | --- |
| Benutzerinhalte | Vollständige Löschung | Temporäre Aufbewahrung kann erforderlich sein |
| Authentifizierungsdaten | Sofortige Entfernung | Token-Widerruf erforderlich |
| Drittanbieterdaten | Koordinierte Löschung | Compliance variiert je nach Dienst |
| Nutzungsverlauf | Vollständige Bereinigung | Unterliegt gesetzlichen Aufbewahrungsregeln |

Wenn Benutzerdaten bei Drittanbietern gespeichert sind, stellen Sie sicher, dass diese Dienste die Daten ebenfalls löschen. Branchen mit strengen Vorschriften erfordern möglicherweise zusätzlichen Kundenservice-Support zur Gewährleistung der Compliance [\[2\]](https://developer.apple.com/news/?id=12m75xbj).

Es ist entscheidend, die Einhaltung dieser Standards durch umfassende Tests zu überprüfen.

### Testanforderungen

Das Testen des Kontolöschungsprozesses ist wichtig für die Gewährleistung von Compliance und Funktionalität. Verwenden Sie Tools wie [Xcode](https://developer.apple.com/xcode/) und App Store Review-Tools, um sich auf Folgendes zu konzentrieren:

-   **Löschablauf**: Bestätigen Sie, dass der Prozess benutzerfreundlich und leicht zugänglich ist.
-   **Datenüberprüfung**: Stellen Sie sicher, dass alle Benutzerdaten vollständig aus allen Systemen entfernt werden.
-   **Randfälle**: Testen Sie Szenarien mit In-App-Käufen und Drittanbieter-Integrationen.

Für Entwickler, die Capacitor mit Capgo verwenden, können Live-Updates helfen, Compliance-Probleme schnell zu beheben und die Wartezeit auf App Store-Genehmigungen zu umgehen. Während des Tests sollten Sie Folgendes überprüfen:

-   Token-Widerruf für Benutzer, die sich mit Apple angemeldet haben.
-   Vollständige Datenentfernung aus allen verbundenen Diensten.
-   Korrekte Handhabung aktiver Abonnements.

## Häufige Probleme und Lösungen

### Plattform-Datensynchronisation

Manchmal synchronisiert sich die Datenlöschung zwischen iOS und Android nicht richtig. Dies geschieht meist aufgrund von Unterschieden in der Handhabung von Speicher und zwischengespeicherten Daten auf jeder Plattform.

So gehen Sie Synchronisationsprobleme an:

-   **Zentralisierter Löschhandler**: Entwickeln Sie einen einheitlichen Service zur Verwaltung wichtiger Aufgaben wie:
    
    -   Bereinigung des [lokalen Speichers](https://capgo.app/plugins/capacitor-data-storage-sqlite/)
    -   Löschen des sicheren Speichers
    -   Beenden von Cloud-Synchronisationsprozessen
    -   Handhabung des Token-Managements
-   **Plattformübergreifende Ereignisübertragung**: Verwenden Sie serverseitige Logik, um Löschereignisse an alle aktiven Sitzungen und Geräte zu senden und Konsistenz sicherzustellen.
    

### Plugin-Updates

Nach der Handhabung der plattformweiten Löschung müssen Sie sich Plugin-spezifischen Herausforderungen widmen. Die Gewährleistung der Kompatibilität und Ausrichtung von Plugins mit Ihrem Löschprozess ist entscheidend, um Inkonsistenzen zu vermeiden.

| **Problem** | **Auswirkung** | **Lösung** |
| --- | --- | --- |
| Token-Persistenz | Verwaiste Tokens bleiben aktiv | Automatischen Token-Widerruf einrichten |
| Lokaler Speicher | Datenbereinigung kann unvollständig sein | Rekursive Löschprüfungen durchführen |
| Cloud-Synchronisation | Löschzustände können nicht übereinstimmen | Synchrone Handler für Konsistenz verwenden |

### [Capgo](https://capgo.app/) Update-Management

![Capgo](https://assets.seobotai.com/capgo.app/6823e678f8b9f5df39f52ef5/21f0f35e63cf5752e2e56f9c4dd03eab.jpg)

Echtzeit-Update-Management spielt eine zentrale Rolle bei der Aufrechterhaltung der Compliance über Plattformen und Plugins hinweg. Hier kann **Capgo** den Prozess der Verwaltung von Kontolöschungs-Updates vereinfachen.

So hilft Capgo:

-   **Stufenweise Einführungen**: Testen Sie Löschablauf-Updates mit einer kleinen Gruppe, bevor Sie sie breit einführen.
-   **Sofortiges Rollback**: Bei Problemen sofort zu einer vorherigen stabilen Version zurückkehren.
-   **Update-Analysen**: Überwachen Sie Erfolgsraten für Löschabläufe und identifizieren Sie Compliance-Probleme.

Laut Capgo erreichen Compliance-Updates 95% der Nutzer innerhalb von 24 Stunden[\[1\]](https://capgo.app). Außerdem sind alle Bereitstellungen mit Ende-zu-Ende-Verschlüsselung gesichert.

So nutzen Sie Capgo optimal für Compliance-Updates:

-   **Versionskontrolle**: Verwenden Sie separate Update-Kanäle zum Testen von Löschabläufen vor der Bereitstellung für alle Nutzer.
-   **Fehlerüberwachung**: Richten Sie Warnungen für fehlgeschlagene Löschungen oder Plugin-Konflikte ein.
-   **Compliance-Überprüfung**: Nutzen Sie Capgos Analysen zur Bestätigung, dass Nutzer die neuesten Updates für Löschungs-Compliance erhalten.

## Implementierungsleitfaden

### Benutzeroberflächen-Standards

Beachten Sie bei der Gestaltung der Benutzeroberfläche für die Kontolöschung diese Punkte:

-   **Primärer Standort**: Machen Sie die Löschoption leicht auffindbar. Platzieren Sie sie gut sichtbar in den Kontoeinstellungen (z.B. _Einstellungen > Konto > Konto löschen_).
    
-   **Klare Kommunikation**: Bieten Sie eine detaillierte Erklärung dessen, was bei der Kontolöschung passiert. Fügen Sie Informationen hinzu über:
    
    -   Welche Daten entfernt werden
    -   Eventuelle gesetzliche Datenspeicherungsanforderungen
    -   Geschätzte Zeitrahmen für die Löschung
    -   Mögliche Auswirkungen auf aktive Abonnements
-   **Verifizierungsablauf**: Stellen Sie sicher, dass der Prozess sicher ist durch:
    
    -   Aufforderung zur erneuten Passworteingabe
    -   Versand eines Verifizierungscodes per E-Mail oder SMS
    -   Anzeige von Bestätigungsdialogen, die die Aktion klar darlegen

Diese Standards gewährleisten eine benutzerfreundliche Erfahrung bei gleichzeitiger Ausrichtung an umfassenderen Compliance-Protokollen.

### Automatisierte Compliance-Prüfungen

Um eine konstante Einhaltung dieser Standards zu gewährleisten, verwenden Sie automatisierte Tools zur Validierung Ihrer UI und Prozesse. Konzentrieren Sie sich auf diese kritischen Bereiche:

| Testkategorie | Prüfpunkte | Implementierungsmethode |
| --- | --- | --- |
| **UI-Tests** | Sicherstellen, dass die Löschoption leicht zu finden ist | Automatisierte UI-Navigationstests verwenden |
| **Datenentfernung** | Vollständige Löschung von Benutzerdaten bestätigen | API-Antworten validieren |
| **Token-Management** | Tokens wie "Sign in with Apple" widerrufen | REST-API-Integrationstests durchführen |
| **Plattformübergreifend** | Konsistenz über alle Geräte sicherstellen | Auf mehreren Geräten testen |

Regelmäßige automatisierte Tests helfen, potenzielle Probleme zu identifizieren und zu beheben, bevor sie Benutzer beeinträchtigen.

### Risikoprävention

Um Risiken zu minimieren und reibungslose Abläufe sicherzustellen, ergreifen Sie diese Maßnahmen:

-   **Datenbestandsmanagement**: Führen Sie detaillierte Aufzeichnungen darüber, wo Benutzerdaten gespeichert sind. Dies umfasst lokalen Speicher, Cloud-Datenbanken, Drittanbieterdienste, Authentifizierungssysteme und Backups. Überprüfen Sie, dass Daten von all diesen Orten gelöscht werden.
    
-   **Fehlerbehandlung**: Bereiten Sie sich auf potenzielle Probleme vor wie:
    
    -   Netzwerkunterbrechungen
    -   Fehlgeschlagene API-Aufrufe
    -   Unvollständige Datenentfernung
    -   Token-Widerrufsfehler  
        Implementieren Sie Fallback-Mechanismen, um diese Szenarien elegant zu handhaben.
-   **Überwachung und rechtliche Compliance**: Verfolgen Sie wichtige Metriken wie Löschungserfolgsraten, durchschnittliche Abschlusszeiten und verbleibende Daten. Dies hilft bei der schnellen Identifizierung und Lösung von Problemen. Stellen Sie zusätzlich die Einhaltung rechtlicher Anforderungen sicher, besonders in Branchen mit strengen Vorschriften. Fügen Sie für Apps in diesen Sektoren zusätzliche Verifizierungsschritte hinzu, dokumentieren Sie alle Verfahren gründlich und führen Sie regelmäßige Prüfungen durch.
    

## Zusammenfassung

### Hauptanforderungen

Seit dem 30. Juni 2022 verlangt Apple von allen Apps, eine native Funktion einzubauen, die es Benutzern ermöglicht, ihre Konten vollständig zu löschen. Hier ist eine Aufschlüsselung der wichtigsten Anforderungen:

| **Anforderungskategorie** | **Implementierungsdetails** | **Compliance-Hinweise** |
| --- | --- | --- |
| **Zugänglichkeit** | Die Kontolöschungsoption muss in den App-Einstellungen leicht zu finden sein. | Diese Funktion muss direkt in die App eingebaut sein. |
| **Datenhandhabung** | Benutzerdaten und Kontoinformationen müssen vollständig gelöscht werden. | Teilweise Löschungen erfüllen nicht die Compliance-Standards. |
| **Authentifizierung** | Tokens für "Sign in with Apple"-Konten ordnungsgemäß widerrufen. | Verwenden Sie die "Sign in with Apple" REST-API zur Implementierung. |
| **Kommunikation** | Benutzer klar über den Löschprozess und Zeitpläne informieren. |

Um diese Anforderungen zu erfüllen, ergreifen Sie folgende Maßnahmen:

-   **Überprüfung der Datenspeicherung**  
    Prüfen Sie alle Quellen, in denen Benutzerdaten gespeichert werden und bewerten Sie die Aufbewahrungsrichtlinien. Stellen Sie sicher, dass Verbindungen zu Drittanbietern gründlich dokumentiert sind.
    
-   **Implementierung sicherer Löschworkflows**  
    Richten Sie Prozesse ein, um Benutzeranfragen zu verifizieren, Token zu widerrufen und die Entfernung von Benutzerdaten zu automatisieren.
    
-   **Testprotokolle**  
    Führen Sie umfassende Tests über alle Plattformen hinweg durch, simulieren Sie verschiedene Szenarien und führen Sie Dokumentationen zur Nachweisführung der Compliance.
    

Tools wie Capgo können Updates vereinfachen, indem sie Live-Anpassungen Ihrer App ermöglichen. Regelmäßige Tests und automatisierte Überwachung helfen, die Datenintegrität sicherzustellen und Ihre App im Laufe der Zeit compliant zu halten. Bleiben Sie zusätzlich über sich entwickelnde rechtliche Anforderungen informiert, um Compliance-Lücken zu vermeiden.

## So implementieren Sie die Kontolöschung in Ihrer App

<iframe src="https://www.youtube.com/embed/TC6d4pub1jU" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## FAQs

::: faq
### Wie können Entwickler sicherstellen, dass ihre App Apples Anforderungen zur Kontolöschung erfüllt?

Um Apples Richtlinien zur Kontolöschung zu erfüllen, müssen Entwickler den Benutzern eine einfache und klare Möglichkeit bieten, ihre Konten direkt in der App zu löschen. Der Prozess sollte leicht zu finden, unkompliziert zu befolgen sein und Benutzer sollten keine externen Websites besuchen oder sich an Support-Teams wenden müssen.

Für diejenigen, die Capacitor verwenden, können Tools wie **Capgo** die Einhaltung der Vorschriften erleichtern. Capgo ermöglicht Echtzeit-Updates Ihrer App, was bedeutet, dass Sie schnell Änderungen - wie Anpassungen der Kontolöschungsfunktion - implementieren können, ohne auf App-Store-Genehmigungen warten zu müssen. Durch die Gewährleistung der Compliance reduzieren Sie nicht nur das Risiko von App-Ablehnungen, sondern stärken auch das Vertrauen der Benutzer.
:::

::: faq
### Wie können Entwickler eine ordnungsgemäße Datenlöschung über Plattformen hinweg sicherstellen und dabei Synchronisierungsprobleme vermeiden?

Die Verwaltung der Datenlöschung über verschiedene Plattformen hinweg ist nicht immer einfach, besonders wenn spezifische Richtlinien wie die von Apple eingehalten werden müssen. Um dies zu bewältigen, müssen Entwickler zuverlässige Backend-Systeme einrichten, die Datenlöschungsanfragen einheitlich über alle integrierten Plattformen hinweg verarbeiten. Dies beinhaltet oft die Nutzung von APIs oder Diensten, die Löschungen gleichzeitig ausführen und Konsistenz gewährleisten.

Für Apps, die mit Capacitor erstellt wurden, können Tools wie **Capgo** diese Aufgabe vereinfachen. Capgo unterstützt Echtzeit-Updates und entspricht den Anforderungen von Apple, wodurch Entwickler App-Updates und Funktionen verwalten und gleichzeitig Datenlöschungsstandards einhalten können. Durch die Verwendung von Tools, die eine reibungslose Synchronisierung gewährleisten, können Entwickler Fehler minimieren und das Vertrauen der Benutzer stärken.
:::

::: faq
### Wie können App-Entwickler sicherstellen, dass ihre Apps die Anforderungen von Apple zur Kontolöschung erfüllen?

## Sicherstellung der Compliance mit Apples Anforderungen zur Kontolöschung

Um Apples Anforderungen zur Kontolöschung zu erfüllen, ist es wichtig, sich über deren Richtlinien auf dem Laufenden zu halten und einen unkomplizierten, benutzerfreundlichen Prozess für die Kontolöschung innerhalb Ihrer App zu erstellen. Die regelmäßige Überprüfung von Apples App Store Review Guidelines, insbesondere der Abschnitte zu Kontoverwaltung und Benutzerdaten, ist ein wesentlicher Schritt für Entwickler.

Wenn Ihre App mit Capacitor erstellt wurde, können Tools wie **Capgo** den Prozess vereinfachen. Capgo bietet Funktionen wie Echtzeit-Updates und stellt sicher, dass Ihre App die Plattformanforderungen von Apple erfüllt, während gleichzeitig eine reibungslose Benutzererfahrung gewährleistet wird. Darüber hinaus sind regelmäßige Tests und Überwachung wichtig, um die Compliance zu bestätigen und potenzielle Probleme schnell zu lösen.
:::
