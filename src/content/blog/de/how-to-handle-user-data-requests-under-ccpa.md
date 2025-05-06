---
slug: how-to-handle-user-data-requests-under-ccpa
title: Umgang mit Datenanfragen von Nutzern gemäß CCPA
description: >-
  Erfahren Sie, wie Sie Benutzeranfragen zur Datenverarbeitung gemäß CCPA
  effektiv verwalten und dabei die Compliance und die Datenschutzrechte der
  Benutzer gewährleisten.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-06T01:02:16.662Z
updated_at: 2025-04-06T01:02:28.104Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67f1c538ebbb9dc80644b1ad-1743901348104.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  CCPA, user data requests, compliance, privacy rights, data access, data
  deletion, opt-out, data protection
tag: 'Development, Security, Updates'
published: true
locale: de
next_blog: ''
---
Der California Consumer Privacy Act ([CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act)) gibt Nutzern die Kontrolle über ihre persönlichen Daten und legt strenge Regeln für Unternehmen fest. Hier ist, was Sie für die Einhaltung wissen müssen:

-   **Wer muss sich daran halten**: Unternehmen mit über 25 Mio. $ Umsatz, Daten von über 50.000+ Nutzern oder 50%+ Einkommen aus Datenverkauf.
-   **Nutzerrechte**:
    -   **Zugriff**: Nutzer können ihre Daten anfordern. Antwort innerhalb von 45 Tagen.
    -   **Löschung**: Nutzer können die Löschung ihrer Daten verlangen. Antwort innerhalb von 45 Tagen.
    -   **Opt-Out**: Nutzer können den Verkauf ihrer Daten stoppen. Muss sofort erfolgen.
    -   **Nicht-Diskriminierung**: Gleicher Service unabhängig von Datenschutzeinstellungen.
-   **Wichtige Schritte zur Einhaltung**:
    -   Erstellen Sie ein sicheres System für Datenanfragen (Webformulare, E-Mail oder In-App).
    -   Überprüfen Sie die Nutzeridentität vor der Bearbeitung von Anfragen.
    -   Verwenden Sie klare [Datenschutzrichtlinien](https://capgo.app/dp/) und bieten Sie eine einfache "Meine persönlichen Daten nicht verkaufen"-Option an.
    -   Schützen Sie Daten durch Verschlüsselung und sichere Speicherung.

**Schnelltipp**: Nutzen Sie Tools wie [Capgo](https://capgo.app/) für sofortige Updates der Datenschutzfunktionen Ihrer App und stellen Sie so die schnelle Einhaltung sich ändernder Vorschriften sicher.

## Wie man den California Consumer Privacy Act einhält ...

<iframe src="https://www.youtube.com/embed/8NY0qFaVWwo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Verstehen der [CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act) Nutzerrechte

Entwickler müssen sichere und benutzerfreundliche Prozesse erstellen, um jedes Nutzerdatenrecht unter CCPA zu berücksichtigen.

### Datenzugriffsrechte

Wenn Nutzer Zugriff auf ihre Daten anfordern, stellen Sie folgende Details bereit:

| **Datenkategorie** | **Offenzulegende Informationen** | **Empfohlenes Format** |
| --- | --- | --- |
| Datentypen & Quellen | Arten der gesammelten Daten und ihre Quellen | Maschinenlesbar (z.B. JSON, CSV) |
| Datennutzung | Wie die Daten verarbeitet und verwendet werden | Zusammenfassung in Klartext |
| Zugriff Dritter | Liste der Dritten mit Datenzugriff | Strukturierte Liste |
| Aufbewahrungszeitraum | Wie lange die Daten gespeichert werden | Spezifische Zeiträume |

Sobald der Datenzugriff gewährt wurde, stellen Sie sicher, dass Sie einen klaren und zuverlässigen Prozess für die Datenlöschung haben, um konform zu bleiben.

### Datenlöschungsprozess

1. **Umfang überprüfen**: Bestätigen Sie, dass die Löschung alle relevanten Systeme umfasst, einschließlich primärer Datenbanken, Caches, Analysetools, Systeme Dritter und Backups. Ausnahmen können für Sicherheit, rechtliche Verpflichtungen, Fehlerbehebungen oder laufende Transaktionen gelten.
2. **Löschung durchführen**: Entfernen Sie die Daten aus allen betroffenen Systemen und benachrichtigen Sie den Nutzer sofort. Fügen Sie den Löschzeitpunkt und Details zu allen unter Ausnahmen beibehaltenen Daten hinzu.

Nach der Handhabung von Zugriffs- und Löschungsrechten stellen Sie sicher, dass der Prozess für das Opt-out vom Datenverkauf genauso unkompliziert ist.

### Opt-out vom Datenverkauf

Bieten Sie eine leicht zu findende Option "Meine persönlichen Daten nicht verkaufen" an, die über den Hauptbildschirm oder das Einstellungsmenü der App zugänglich ist. Diese Einstellung sollte schnell angewendet werden und über alle App-Versionen hinweg konsistent bleiben.

Wenn Ihre App Analyse- oder Werbe-SDKs von Drittanbietern verwendet, stellen Sie sicher, dass diese Dienste mit Ihrem Opt-out-Mechanismus integriert sind und Nutzereinstellungen ohne Verzögerung respektieren. Dies gewährleistet die Einhaltung und schafft Vertrauen bei Ihren Nutzern.

[Fortsetzung folgt aufgrund der Länge des Textes...]
