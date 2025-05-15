---
slug: 5-steps-to-deploy-hotfixes-with-capgo
title: 5 Schritte zum Bereitstellen von Hotfixes mit Capgo
description: >-
  Erfahren Sie, wie Sie Hotfixes schnell und sicher bereitstellen können, indem
  Sie einen optimierten Prozess nutzen, der Verzögerungen im App Store vermeidet
  und die Einhaltung von Vorschriften gewährleistet.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-13T03:37:11.567Z
updated_at: 2025-03-18T13:14:18.244Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d22ca8233d3a01105fd278-1741837059847.jpg
head_image_alt: Mobile Entwicklung
keywords: 'hotfix deployment, Capgo, app updates, CI/CD tools, mobile development'
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---
[Capgo](https://capgo.app/) macht das Bereitstellen von Hotfixes schnell und einfach, umgeht Verzögerungen im App Store und bleibt gleichzeitig sicher und konform mit den Richtlinien von Apple und Google. Hier ist eine kurze Übersicht über den Prozess:

1.  **Erstellen und Testen Sie Ihren Hotfix**: Schreiben Sie präzise Codeänderungen, testen Sie gründlich auf Geräten und stellen Sie die Kompatibilität sicher.
2.  **[Capgo einrichten](https://capgo.app/docs/webapp/)**: Installieren Sie die [Capgo CLI](https://capgo.app/docs/cli/commands) mit `npx @capgo/cli init`, konfigurieren Sie die Verschlüsselung und integrieren Sie CI/CD-Tools.
3.  **Laden Sie Ihren Hotfix hoch**: Verwenden Sie die CLI, um Ihr Update sicher hochzuladen, kennzeichnen Sie es deutlich und bereiten Sie es für die Bereitstellung vor.
4.  **Wählen Sie Update-Einstellungen aus**: Richten Sie gezielte Benutzer oder Gruppen ein, planen Sie Rollouts und definieren Sie Versionsanforderungen.
5.  **Verfolgen Sie Ihr Update**: Überwachen Sie die Lieferquoten, die Update-Geschwindigkeit und die Benutzerabdeckung. Rollen Sie sofort zurück, wenn dies erforderlich ist.

Capgo hat weltweit über 947,6 Millionen Updates geliefert und die Effizienz der Veröffentlichungen um 81 % für seine Benutzer verbessert. Es ist das bevorzugte Werkzeug für agile Teams, die schnelle, sichere Hotfix-Bereitstellungen benötigen.

## Schritt 1: Erstellen und Testen Sie Ihren Hotfix

### Schreiben Sie den Hotfix-Code

Konzentrieren Sie sich darauf, präzise Änderungen vorzunehmen, die den Fehler beheben, ohne die Stabilität der App zu gefährden.

Hier ist eine kurze Anleitung zur Strukturierung Ihres Hotfixes:

| Beste Praxis | Anwendung |
| --- | --- |
| **Isolierte Änderungen** | Halten Sie Änderungen auf die betroffenen Komponenten beschränkt. |
| **Versionskontrolle** | Nutzen Sie einen speziellen Branch für die Entwicklung des Hotfixes. |
| **Dokumentation** | Fügen Sie klare Kommentare zur Lösung und ihren Auswirkungen hinzu. |
| **Abhängigkeiten** | Stellen Sie die Kompatibilität mit bestehenden App-Abhängigkeiten sicher. |

Mit der sofortigen Aktualisierungsfähigkeit von Capgo können Sie sich darauf konzentrieren, den Fehler zu beheben, ohne sich um die Bündelung nicht zusammenhängender Änderungen sorgen zu müssen. Diese Methode hat sich als effektiv erwiesen, wie von Colenso hervorgehoben:

> "Wir haben [Capgo OTA-Updates](https://web.capgo.app/resend_email) in der Produktion für unsere Benutzerbasis von über 5000 ausgeführt. Wir beobachten einen sehr reibungslosen Betrieb, fast alle unsere Benutzer sind innerhalb von Minuten nach der Bereitstellung des OTA bei @Capgo auf dem neuesten Stand." [\[1\]](https://capgo.app/).

### Testen Sie auf Ihrem Gerät

Gründliche Tests sind entscheidend, um sicherzustellen, dass der Hotfix reibungslos funktioniert. Verwenden Sie diese Schritte:

-   **Entwicklungstests:** Führen Sie die Lösung in Ihrer lokalen Entwicklungsumgebung aus.
-   **Gerätetests:** Überprüfen Sie die Lösung auf verschiedenen Geräten und Betriebssystemversionen.
-   **Integrationstests:** Bestätigen Sie, dass der Fix nicht mit anderen Funktionen in Konflikt steht.

Automatisieren Sie so viel wie möglich des Testprozesses mit CI/CD-Tools.

> "Wir praktizieren agile Entwicklung, und @Capgo ist für die kontinuierliche Bereitstellung an unsere Benutzer von entscheidender Bedeutung!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Sobald Ihr Hotfix alle Tests bestanden hat, sind Sie bereit, Capgo für die Bereitstellung einzurichten.

## Schritt 2: Richten Sie [Capgo](https://capgo.app/) ein

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-13.jpg?auto=compress)

### Installieren Sie erforderliche Pakete

Um mit Capgo in Ihrem Capacitor-Projekt zu beginnen, verwenden Sie das CLI-Tool. Führen Sie einfach den folgenden Befehl aus:

```bash
npx @capgo/cli init
```

Dieser Befehl erledigt die schwere Arbeit für Sie:

-   Installiert das [Capgo-Plugin](https://capgo.app/plugins/)
-   Konfiguriert Ihr Projekt automatisch
-   Bereitet Ihr Projekt für Capgo-Dienste vor

Sobald die Installation abgeschlossen ist, können Sie mit der Konfiguration Ihres Projekts mit den Verschlüsselungs- und Compliance-Funktionen von Capgo fortfahren.

### Richten Sie Ihr Projekt ein

Capgo sorgt dafür, dass Ihr Projekt mit den Verschlüsselungs- und Compliance-Standards sowohl für Apple als auch für Google bereit ist. Es funktioniert nahtlos mit CI/CD-Tools, verschlüsselt Updates zur Sicherheit und entspricht den Richtlinien des App Stores.

| Integrationsschritt | Zweck | Vorteil |
| --- | --- | --- |
| **CI/CD-Einrichtung** | Verbindung zu CI/CD-Tools | Vereinfacht Bereitstellungen |
| **E2E-Verschlüsselung** | Sichert die Update-Lieferung | Bewahrt die Code-Integrität |
| **Plattformkonformität** | Entspricht den App-Store-Standards | Ermöglicht eine reibungslose Verteilung |

Dieses Setup wurde von Entwicklern validiert. Wie Bessie Cooper erklärt:

> "@Capgo ist ein unverzichtbares Werkzeug für Entwickler, die produktiver sein möchten. Die Vermeidung von Überprüfungen für Fehlerbehebungen ist goldwert." [\[1\]](https://capgo.app/)

Für größere Teams bietet Capgo Funktionen wie Multi-Organisations-Setups und detailliertes Berechtigungsmanagement. Es integriert sich in Plattformen wie [GitHub](https://github.com/about), [GitLab](https://about.gitlab.com/), [Azure DevOps](https://azure.microsoft.com/en-us/products/devops) und [Jenkins](https://www.jenkins.io/), was automatisierte Bereitstellungsworkflows unkompliziert macht. Rodrigo Mantica hebt die Bedeutung für agile Teams hervor:

> "Wir praktizieren agile Entwicklung, und @Capgo ist von entscheidender Bedeutung für die kontinuierliche Bereitstellung an unsere Benutzer!" [\[1\]](https://capgo.app/)

Mit Ihrem vollständig eingerichteten Projekt sind Sie bereit, Ihren Hotfix hochzuladen und ihn sofort bereitzustellen.

## Schritt 3: Laden Sie Ihren Hotfix hoch

### Senden Sie Dateien an Capgo

Nachdem Sie Ihr Projekt eingerichtet haben, ist es Zeit, Ihren Hotfix mit dem [Capgo CLI-Tool](https://capgo.app/docs/cli/commands/) hochzuladen. Dies gewährleistet einen sicheren und effizienten Transfer Ihres Updates. Beginnen Sie damit, Ihre App wie gewohnt während der Entwicklung zu erstellen.

So funktioniert es:

-   Erstellen Sie Ihre App mit Ihrem Standardprozess.
-   Überprüfen Sie, ob alle Dateien ohne Fehler kompiliert werden.
-   Verwenden Sie das Capgo CLI-Tool, um Ihr Update hochzuladen.

### Kennzeichnen Sie Ihre Updates

Eine klare Kennzeichnung ist entscheidend für das Management und die Verfolgung Ihrer Hotfixes. Fügen Sie beim Hochladen Ihres Updates zu Capgo spezifische Versionsdetails und beschreibende Labels hinzu. Dies hilft, Ihre Updates zu organisieren und alle auf dem gleichen Stand zu halten.

| **Kennzeichnungselement** | **Zweck** | **Beste Praxis** |
| --- | --- | --- |
| Versionsnummer | Verfolgt die Update-Reihenfolge | Verwenden Sie semantische Versionierung |
| Updatebeschreibung | Hebt wichtige Änderungen hervor | Konzentrieren Sie sich auf die wichtigsten Fehlerbehebungen und Updates |
| Versionshinweise | Kommuniziert Änderungen | Detaillierte spezifische Verbesserungen |

Martin Donadieu, der Gründer von Capgo, hat ein Versionierungssystem entworfen, das sich nahtlos in CI/CD-Workflows integriert. Dieses System erleichtert das Verfolgen von Updates und das Zurückrollen bei Bedarf.

Das [Update-Management](https://capgo.app/docs/plugin/cloud-mode/manual-update/) von Capgo umfasst auch Funktionen wie End-to-End-Verschlüsselung und sofortige Bereitstellung, um sicherzustellen, dass Ihre Hotfixes schnell erreicht werden und dabei sicher sind.

Sobald Ihr Hotfix hochgeladen und gekennzeichnet ist, fahren Sie mit Schritt 4 fort, um Ihre Update-Einstellungen zu konfigurieren.

###### sbb-itb-f9944d2

## Capgo Live Update-System für [Capacitor](https://capacitorjs.com/) Apps

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-13.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/NzXXKoyhTIo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Schritt 4: Wählen Sie Update-Einstellungen aus

Nachdem Sie Ihren Hotfix hochgeladen haben, ist es an der Zeit, die Einstellungen für die Zielgruppen und die Kriterien für Rollouts zu konfigurieren. Dies gewährleistet eine kontrollierte und effektive Bereitstellung.

### Wählen Sie Benutzer und Geräte aus

Die Benutzerzuweisungstools von Capgo ermöglichen es Ihnen, genau zu bestimmen, wer den Hotfix erhalten soll. Es stehen zwei Hauptstrategien zur Verfügung:

| Bereitstellungstyp | Ideal für | Vorteile |
| --- | --- | --- |
| **Private Tests** | Beta-Tester, QA-Teams | Ermöglicht kontrolliertes Testen mit frühem Feedback |
| **Öffentliche Veröffentlichung** | Alle Benutzer, gestaffelte Rollouts | Erlaubt breite Verteilung mit schrittweiser Bereitstellung |

Wenn beispielsweise ein Fehler Benutzer in einer bestimmten Region betrifft, können Sie diese Gruppe für eine schnellere Validierung priorisieren. Nachdem Sie Ihre Zielgruppe ausgewählt haben, können Sie detaillierte Veröffentlichungsregeln festlegen.

### Setzen Sie Veröffentlichungsregeln

Über die Weboberfläche von Capgo können Sie den Veröffentlichungsprozess verfeinern, indem Sie Parameter wie Zeitplan, App-Versionen für die Kompatibilität und die schrittweise Ausrollung des Updates festlegen.

Hier sind die wichtigsten Einstellungen, die Sie konfigurieren sollten:

-   **Bereitstellungszeitplan**: Wählen Sie spezifische Zeiten, zu denen das Update live gehen soll.
-   **Versionsanforderungen**: Definieren Sie, welche App-Versionen das Update erhalten sollen.
-   **Rollout-Prozentsatz**: Steuern Sie das Tempo der Veröffentlichung, indem Sie mit einer kleineren Gruppe beginnen und dann schrittweise erweitern.

Für dringende Fehlerbehebungen können Sie die sofortige Bereitstellung wählen, um Probleme sofort zu beheben. Für weniger kritische Updates ermöglichen gestaffelte Rollouts die Überwachung der Leistung und die Behebung potenzieller Probleme, während sie auftreten. Darüber hinaus bietet Capgo Optionen zur Erstellung dedizierter Testgruppen, um die Koordination reibungsloser und effizienter zu gestalten.

## Schritt 5: Verfolgen Sie Ihr Update

Behalten Sie den Fortschritt Ihres Hotfixes im Auge und beheben Sie Probleme, sobald sie auftreten.

### Überprüfen Sie den Aktualisierungsstatus

Die Analysen von Capgo bieten Einblicke in wichtige Update-Metriken:

| Metrik | Was zu überwachen ist | Warum es wichtig ist |
| --- | --- | --- |
| **Lieferquote** | Prozentsatz erfolgreicher Updates | Zeigt, wie gut Ihre Bereitstellung funktioniert |
| **Update-Geschwindigkeit** | Zeit bis zum Erreichen der Zielbenutzer | Hebt Verzögerungen oder Engpässe hervor |
| **Benutzerabdeckung** | Anzahl der aktualisierten Geräte | Gibt an, wie viele Benutzer die Lösung erhalten haben |

### Probleme behandeln

Nachdem Sie diese Metriken überprüft haben, seien Sie bereit, schnell auf Herausforderungen zu reagieren.

-   **Sofortige Rücksetzung**  
    Wenn etwas schiefgeht, können Sie mit der Rollback-Funktion von Capgo sofort zur vorherigen Version zurückkehren.
    
-   **Benutzerzuweisungen analysieren**  
    Überprüfen Sie, wie die Updates verteilt werden, um festzustellen, ob bestimmte Gruppen oder Geräte Probleme haben.
    
-   **Leistung überwachen**  
    Verwenden Sie Echtzeitmetriken, um Probleme zu erkennen und zu beheben. Die Tools von Capgo können helfen, festzustellen, ob das Problem in der Lieferung, Installation oder Kompatibilität liegt.
    

Rodrigo Mantica, ein Geschäftsentwickler, hebt die Bedeutung von Capgo hervor:

> "Wir praktizieren agile Entwicklung, und @Capgo ist von entscheidender Bedeutung für die kontinuierliche Bereitstellung an unsere Benutzer!" [\[1\]](https://capgo.app/)

Die Weboberfläche von Capgo erleichtert es Ihnen, den Fortschritt Ihres Updates mit detaillierten Protokollen und Leistungsmetriken zu überwachen. Die Tracking-Funktionen haben Organisationen geholfen, die Effizienz der Veröffentlichungen um bis zu 81 % zu verbessern [\[1\]](https://capgo.app/), wodurch eine stabile App-Leistung gewährleistet wird, während Probleme schnell angegangen werden.

## Zusammenfassung

### Hauptpunkte

Capgo vereinfacht den Prozess der schnellen und effektiven Bereitstellung von Hotfixes und hat eine nachgewiesene Erfolgsbilanz bei der Bereitstellung von **947,6 Millionen Updates** über **1.400 Produktionsapps** [\[1\]](https://capgo.app/).

| Schritt | Aktion | Ziel |
| --- | --- | --- |
| 1. | Erstellen & Testen | Hotfix lokal entwickeln und überprüfen | Codequalität sicherstellen |
| 2. | Capgo einrichten | Das Plugin mit `npx @capgo/cli init` installieren | Konfiguration vereinfachen |
| 3. | Hochladen | Dateien über die CLI übertragen | Schnelle Verteilung ermöglichen |
| 4. | Konfigurieren | Benutzer zuweisen und Regeln festlegen | Updates präzise bereitstellen |
| 5. | Überwachen | Leistung verfolgen und Probleme lösen | Effizienz verbessern |

Befolgen Sie diese Schritte, um Capgo in Ihren Workflow zu integrieren und Ihren Aktualisierungsprozess zu optimieren.

### Erste Schritte

Bevor Sie starten, nehmen Sie sich einen Moment Zeit, um die oben genannten Schritte zu überprüfen. Sie unterteilen den Bereitstellungsprozess in überschaubare Aktionen, was die Umsetzung erleichtert.

Starten Sie Ihre Capgo-Integration, indem Sie die Capgo CLI zu Ihrem Projekt hinzufügen. Mit **Ende-zu-Ende-Verschlüsselung** sorgt die Plattform jedes Mal für sichere und zuverlässige Updates.

> "Capgo ist eine intelligente Möglichkeit, Hot-Code-Pushes durchzuführen."

Für noch mehr Effizienz integrieren Sie Capgo mit Ihren CI/CD-Tools wie Azure DevOps, GitLab oder GitHub. Diese Konfiguration ermöglicht automatisierte Bereitstellungen und gibt Ihnen Kontrolle über die Verteilung von Updates durch Funktionen zur Benutzerzuweisung.
