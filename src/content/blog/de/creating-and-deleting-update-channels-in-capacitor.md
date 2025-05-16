---
slug: creating-and-deleting-update-channels-in-capacitor
title: Erstellen und Löschen von Update-Kanälen in Capacitor
description: >-
  Erfahren Sie, wie Sie Update-Kanäle in Capacitor erstellen, verwalten und
  löschen, um optimierte App-Updates und eine verbesserte Benutzererfahrung zu
  erreichen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-21T03:02:38.679Z
updated_at: 2025-03-21T03:02:57.947Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67dcb1f883b63ee70fa08665-1742526177947.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Capacitor, update channels, app updates, development, mobile, CI/CD, user
  management, version control
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---

[Capacitor](https://capacitorjscom/) [Update-Kanäle](https://capgo.app/docs/webapp/channels/) ermöglichen Over-the-Air (OTA) Updates für bestimmte Benutzergruppen. Dies hilft bei der Verwaltung mehrerer App-Versionen, dem Testen neuer Funktionen und der schrittweisen Einführung von Updates. Hier ist, was Sie wissen müssen:

-   **Vorteile**:
    
    -   Updates mit kleineren Gruppen testen (z.B. Beta-Nutzer)
    -   Kritische Fehlerbehebungen ohne App-Store-Genehmigung senden
    -   Problematische Updates sofort zurücksetzen
-   **Einrichtung**:
    
    -   Verwendung von Tools wie Capacitor CLI, [Nodejs](https://nodejsorg/en) und [Capgo](https://capgo.app/) CLI
    -   Rollen zuweisen (Admin, Entwickler, Betrachter) zur Verwaltung von Berechtigungen
    -   Integration mit CI/CD-Tools für automatisierte Workflows
-   **Kanäle verwalten**:
    
    -   Kanäle für Umgebungen erstellen (z.B. Produktion, Beta, Staging)
    -   Kanäle eindeutig benennen (z.B. `prod`, `beta-internal`, `v2-hotfix`)
    -   Updates in Phasen testen, bevor sie in die Produktion übernommen werden
-   **Kanäle entfernen**:
    
    -   Ungenutzte Kanäle über Analysen identifizieren
    -   Benutzer sicher migrieren, Daten archivieren und Abhängigkeiten vor dem Löschen prüfen

Capgo vereinfacht diesen Prozess mit Tools wie Echtzeit-Analysen, Benutzerverwaltung und Rollback-Optionen. Mit der richtigen Kanaleinrichtung und -wartung können Sie Updates schneller und zuverlässiger bereitstellen.

## Kontinuierliche Bereitstellung & Live-Updates mit Ionic Deploy

[[HTML_TAG]][[HTML_TAG]]

## Einrichtungsanforderungen

Um Update-Kanäle effektiv zu verwalten, müssen Sie bestimmte Tools installieren und Berechtigungen einrichten. Hier ist, was Sie zum Start benötigen.

### Benötigte Tools

Stellen Sie sicher, dass Sie Folgendes haben:

-   **Capacitor CLI**: Dies ist das Hauptwerkzeug für die Handhabung von App-Updates
-   **Nodejs**: Version 14.0 oder höher wird benötigt
-   **[Capgo CLI](https://capgo.app/docs/cli/commands)**: Wird für die Einrichtung und Verwaltung von Update-Kanälen verwendet
-   **Entwicklungsumgebung**: Wählen Sie eine IDE, die Capacitor unterstützt

Um Capgo CLI zu initialisieren, führen Sie diesen Befehl aus:

[[CODE_BLOCK]]

Dies richtet Ihr Projekt mit den notwendigen Konfigurationsdateien ein und verbindet es mit Capgos [Update-Service](https://capgo.app/docs/plugin/cloud-mode/manual-update/)

### Zugriff und Berechtigungen konfigurieren

Richten Sie Berechtigungen für sichere und effiziente Kanalverwaltung ein:

| **Berechtigungsstufe** | **Zugriffsrechte** | **Zweck** |
| --- | --- | --- |
| Admin | Vollzugriff | Kanäle erstellen, löschen und verwalten |
| Entwickler | Eingeschränkter Zugriff | Updates bereitstellen und testen |
| Betrachter | Nur-Lesen | Update-Status überwachen |

Weisen Sie Ihrem Team Rollen basierend auf ihren Verantwortlichkeiten zu. Capgo funktioniert nahtlos mit Capacitor 6 und 7 und passt sich so verschiedenen Projektanforderungen an.

Für zusätzlichen Komfort integriert sich Capgo mit beliebten CI/CD-Tools wie [GitHub Actions](https://docsgithubcom/actions), [GitLab CI](https://docsgitlabcom/ee/ci/) und [Jenkins](https://wwwjenkinsio/). Stellen Sie nur sicher, dass Ihr Build-System bereit ist, die Update-Kanalverwaltung zu handhaben.

## Update-Kanäle einrichten

Hier erfahren Sie, wie Sie Update-Kanäle effektiv erstellen und verwalten können. Diese Anleitung behandelt die Kanalerstellung, Konfiguration und hilfreiche Benennungspraktiken.

### Einen neuen Kanal erstellen

Um einen Kanal mit Capgo CLI einzurichten, folgen Sie diesen Schritten:

1.  **Kanal initialisieren**: Öffnen Sie Ihr Terminal und führen Sie folgenden Befehl aus:
    
    [[CODE_BLOCK]]
    
2.  **Grundparameter einrichten**: Konfigurieren Sie den Kanal mit Details wie Name und Version:
    
    [[CODE_BLOCK]]
    
3.  **Kanal bestätigen**: Überprüfen Sie, ob Ihr Kanal erfolgreich erstellt wurde:
    
    [[CODE_BLOCK]]
    

### Kanal-Einstellungen

Achten Sie bei der Konfiguration Ihres Kanals auf diese wichtigen Einstellungen:

| Einstellung | Zweck | Beispielwert |
| --- | --- | --- |
| **Kanalname** | Identifiziert den Update-Stream | prod, beta, staging |
| **Versions-Muster** | Gibt das erlaubte Versionsformat an | 1.0.* |