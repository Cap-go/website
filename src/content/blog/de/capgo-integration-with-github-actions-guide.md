---
slug: capgo-integration-with-github-actions-guide
title: 'Intégration de Capgo avec GitHub Actions : Guide'
description: >-
  Integrieren Sie Capgo mit GitHub Actions für effiziente, sichere und
  kostengünstige App-Updates, um Ihren Entwicklungsworkflow zu verbessern.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-03-18T13:14:19.939Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67d61b378b902ec211cf87e9-1742091902582.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Capgo, GitHub Actions, CI/CD, Capacitor apps, deployment, automation, updates,
  security
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---

[Capgo](https://capgoapp/) und [GitHub Actions](https://docsgithubcom/actions) vereinfachen gemeinsam die Bereitstellung von Updates für [Capacitor](https://capacitorjscom/) Apps. Hier sind die Gründe, warum diese Integration Ihre Aufmerksamkeit verdient:

-   **Geld sparen**: Reduzieren Sie CI/CD-Kosten um bis zu 26.100 € über 5 Jahre im Vergleich zu [AppFlow](https://ionicio/appflow/)
-   **Schnelle Updates**: Sofortige Update-Bereitstellung mit 95% Nutzererreichung innerhalb von 24 Stunden
-   **Sichere Bereitstellungen**: Ende-zu-Ende-Verschlüsselung gewährleistet sichere Updates
-   **Optimierter Workflow**: Automatisieren Sie Builds und Bereitstellungen direkt in Ihrem GitHub Repository

### Kurzer Überblick

1.  **Voraussetzungen**: GitHub Account, [Capgo Account](https://capgoapp/disclaimer/) (ab 12€/Monat), Capacitor Projekt, [Nodejs](https://nodejsorg/en)
2.  **Einrichtung**: Installieren Sie [Capgo CLI](https://capgoapp/docs/cli/commands) mit `npx @capgo/cli init`, konfigurieren Sie GitHub Actions mit einem YAML Workflow
3.  **Bereitstellung**: Nutzen Sie Befehle wie `npx @capgo/cli deploy` zur [Automatisierung von Updates](https://capgoapp/docs/plugin/cloud-mode/hybrid-update/)
4.  **Testen**: Bereitstellen in Testkanälen (z.B. Beta, Staging) vor der Produktion

**Beispiel Workflow (YAML)**:

```yaml
name: Capgo Deploy  
on:  
  push:  
    branches:  
      - main  

jobs:  
  deploy:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v3  
      - uses: actions/setup-node@v3  
        with:  
          node-version: '18.x'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

Diese Integration gewährleistet schnelle, sichere und kosteneffektive App-Updates, ideal für agile Entwicklungsteams

## [GitHub Actions](https://docsgithubcom/actions) Tutorial - Grundkonzepte und CI/CD Pipeline

![GitHub Actions](https://mars-imagesimgixnet/seobot/screenshots/docsgithubcom-90237daad1b336de5d9b7f1a85aa7441-2025-03-16jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Einrichtungsvoraussetzungen

[Die Integration von Capgo](https://capgoapp/docs/webapp/) mit GitHub Actions erfordert die Einrichtung der notwendigen Tools und Konfigurationen

### Erforderliche Tools und Konten

Stellen Sie sicher, dass Sie folgende Konten und Tools bereit haben:

| Voraussetzung | Zweck | Details |
| --- | --- | --- |
| **GitHub Account** | Versionskontrolle & CI/CD | Aktives Konto mit Zugriff auf Repositories |
| **Capgo Account** | Live-Update-Verwaltung | Tarife beginnen bei 12€/Monat für den SOLO-Plan |
| **Capacitor Projekt** | App-Entwicklung | Ein funktionsfähiges Projekt bereit zur Integration |
| **Nodejs** | Laufzeitumgebung | Neueste LTS-Version wird empfohlen |

Sobald diese vorhanden sind, können Sie mit der Integration von Capgo in Ihr Projekt für automatisierte Live-Updates fortfahren

### [Capgo](https://capgoapp/) zu Ihrem Projekt hinzufügen

![Capgo](https://mars-imagesimgixnet/seobot/screenshots/capgoapp-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16jpg?auto=compress)

Um Capgo zu integrieren, installieren Sie es in Ihrem Capacitor-Projekt mit dem CLI-Tool. Laut Martin Donadieu, Gründer von Capgo:

> "Führen Sie npx @capgo/cli init aus, das war's!" [\[1\]](https://capgoapp/)

Dieser Befehl richtet das Plugin und seine erforderlichen Abhängigkeiten ein

### GitHub Repository Einrichtung

Bereiten Sie Ihr GitHub Repository vor, um die Anforderungen für CI/CD-Integration mit Capgo zu erfüllen. Wie in ihrer Dokumentation erwähnt:

> "Wir konfigurieren Ihre CI/CD-Pipeline direkt in Ihrer bevorzugten Plattform, sei es GitHub Actions, GitLab CI oder andere. Wir hosten keine CI/CD oder berechnen Ihnen deren Wartung" [\[1\]](https://capgoapp/)

Capgo bietet diese Einrichtung für eine einmalige Gebühr von 2.600 € und ~300 €/Monat, was günstiger ist als AppFlows jährliche Gebühr von 6.000 € [\[1\]](https://capgoapp/)

So richten Sie Ihr Repository ein:

-   **Repository-Struktur**: Organisieren Sie Ihr Repository mit separaten Verzeichnissen für Quellcode, Assets und Konfigurationsdateien, um alles übersichtlich und verwaltbar zu halten
-   **Umgebungskonfiguration**: Erstellen Sie verschiedene Umgebungen für Entwicklung, Staging und Produktion, und stellen Sie sicher, dass entsprechende Zugriffskontrollen und Sicherheitsmaßnahmen vorhanden sind
-   **Zugriffsverwaltung**: Legen Sie Repository-Berechtigungen sorgfältig fest, um die [Capgo-Integration](https://capgoapp/consulting/) zu ermöglichen und gleichzeitig die Sicherheit zu gewährleisten

Diese Schritte stellen sicher, dass Ihr Projekt bereit für den GitHub Actions Workflow ist, der im nächsten Abschnitt beschrieben wird

## GitHub Actions Workflow Einrichtung

Automatisieren Sie Ihre [Capgo-Bereitstellungen](https://capgoapp/docs/cli/commands/) mit GitHub Actions zur Optimierung Ihres CI/CD-Prozesses

### Erstellen der Workflow-Datei

Beginnen Sie mit der Erstellung einer YAML-Datei im Verzeichnis `github/workflows` Ihres Repositories. Hier ein Beispiel:

```yaml
name: Capgo Deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - name: Install Dependencies
        run: npm install
      - name: Build App
        run: npm run build
      - name: Deploy to Capgo
        run: npx @capgo/cli deploy
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Diese Konfiguration gewährleistet sichere und automatisierte Deployments. Nachdem Sie die Datei eingerichtet haben, wählen Sie die richtigen Auslöser für Ihren Workflow.

### Workflow-Auslöser Optionen

GitHub Actions ermöglicht es Ihnen, den Zeitpunkt der Workflow-Ausführung anzupassen. Hier sind einige Auslöser-Optionen:

| **Auslöser-Typ** | **Anwendungsfall** | **Konfiguration** |
| --- | --- | --- |
| Push-Events | Deployment bei Code-Änderungen | Aktiviert wenn Code in bestimmte Branches gepusht wird |
| Manuelle Ausführung | Bedarfsgesteuerte Updates | Erlaubt manuelles Starten des Workflows |
| Zeitplan | Zeitgesteuerte Releases | Führt Deployments in festgelegten Intervallen aus |
| Pull Request | Test von Updates | Testet Änderungen vor dem Merge in Hauptbranches |

### Verwaltung von Geheimen Schlüsseln

Für sichere Deployments müssen Sie Ihre geheimen Schlüssel richtig verwalten. GitHub Actions bietet dafür ein verschlüsseltes Geheimnis-Verwaltungssystem.

**Schritte zur Einrichtung sicherer Authentifizierung:**

1. **Repository-Einstellungen aufrufen**  
    Gehen Sie zu den Einstellungen Ihres Repositories und finden Sie den Bereich "Secrets and variables" unter dem "Security" Tab
    
2. **[Capgo Anmeldedaten](https://capgoapp/trust/) hinzufügen**  
    Speichern Sie Ihren Capgo Authentifizierungs-Token als Repository-Geheimnis. Nennen Sie es `CAPGO_TOKEN`
    
3. **Geheimnisse in Workflows referenzieren**  
    Verwenden Sie Ihre gespeicherten Geheimnisse im Workflow, indem Sie sie wie folgt referenzieren: `${{ secrets.CAPGO_TOKEN }}`
    

## Capgo Befehle in Workflows

Sobald Ihre GitHub Actions Umgebung eingerichtet ist, können Sie Deployments durch Integration von Capgo CLI Befehlen automatisieren.

### Installation der Capgo CLI

Fügen Sie den folgenden Schritt zu Ihrem Workflow hinzu, um die Capgo CLI zu installieren:

```yaml
steps:
  - name: Install Capgo CLI
    run: npm install -g @capgo/cli
  - name: Initialize Capgo
    run: npx @capgo/cli init
```

### Authentifizierung der CLI

Authentifizieren Sie die CLI sicher mit dem `CAPGO_TOKEN`:

```yaml
- name: Authenticate Capgo CLI
  run: npx @capgo/cli login
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

### Deployment Befehle

Hier sind die wichtigsten Befehle für das Erstellen, Versionieren und Deployen Ihrer Updates:

| Befehl | Zweck | Verwendungsbeispiel |
| --- | --- | --- |
| `build` | Erstellt ein [produktionsreifes Bundle](https://capgoapp/docs/webapp/bundles/) | `npx @capgo/cli build` |
| `deploy` | Überträgt Updates zu Capgo | `npx @capgo/cli deploy` |
| `version` | Setzt die Version für das Update | `npx @capgo/cli version 1.2.0` |

Um den gesamten Deployment-Prozess zu automatisieren, verwenden Sie die Befehle zusammen wie folgt:

```yaml
steps:
  - name: Build and Deploy
    run: |
      npx @capgo/cli build
      npx @capgo/cli version ${{ github.ref_name }}
      npx @capgo/cli deploy
    env:
      CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Diese Einrichtung stellt sicher, dass Ihre Updates automatisch erstellt, versioniert und deployed werden, wenn der Workflow ausgeführt wird. Das Geheimnis-Verwaltungssystem von GitHub hält Ihre Anmeldedaten während des gesamten Prozesses sicher.

## Tests und Fehlerbehebung

### Test-Workflows ausführen

Sie können Ihren GitHub Actions Workflow testen, indem Sie einen dedizierten [Capgo Test-Kanal](https://capgoapp/docs/plugin/cloud-mode/channel-system/) verwenden. Dies ermöglicht es Ihnen, Updates zu validieren, bevor sie live gehen.

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Das Kanal-System von Capgo hilft Ihnen, separate Deployment-Pfade für verschiedene Stufen zu erstellen:

| Kanal | Zweck | Zielgruppe |
| --- | --- | --- |
| beta | Pre-Release Tests | Internes Team |
| staging | QA-Validierung | Testbenutzer |
| production | Live-Deployment | Alle Benutzer |

### Fehlerlösungen

Hier sind einige häufige Integrationsprobleme und wie Sie diese angehen:

1. **Authentifizierungsfehler**

Überprüfen Sie den CAPGO_TOKEN in den GitHub Secrets. Wenn er abgelaufen ist, generieren Sie ihn neu, um eine reibungslose Authentifizierung sicherzustellen.

2. **Build-Fehler**

Stellen Sie sicher, dass Ihre Build-Konfiguration den Anforderungen Ihrer Deployment-Umgebung entspricht.

> "Wir haben Capgo OTA-Updates in der Produktion für unsere Nutzerbasis von +5000 eingeführt. Wir sehen einen sehr reibungslosen Betrieb, fast alle unsere Nutzer sind innerhalb von Minuten nach dem OTA-Deployment auf @Capgo auf dem neuesten Stand" [\[1\]](https://capgoapp/)

3. **Versionskonflikte**

Halten Sie sich an semantische Versionierung und erhöhen Sie Versionen ordnungsgemäß, um Konflikte während des Deployments zu vermeiden.

### Wartungstipps

- Nutzen Sie [Capgo Analytics](https://capgoapp/dp/) zur Überwachung der Update-Erfolgsraten-   Aktivieren Sie automatische Rollbacks für Updates, die Probleme verursachen könnten
-   Testen Sie Pull Requests (PRs) mit Kanal-Selektoren für bessere Kontrolle
-   Halten Sie Ihren Workflow mit den neuesten Capgo CLI-Befehlen aktuell

Für Deployments mit hoher Priorität nutzen Sie Capgos Fehlerverfolgung, um potenzielle Probleme frühzeitig zu erkennen. Falls etwas schief geht, ermöglicht die Rollback-Funktion eine schnelle Rückkehr zu einer stabilen Version, wodurch Störungen minimiert werden. Diese Praktiken helfen dabei, Ihre Deployments reibungslos am Laufen zu halten, während Sie sich der Produktion nähern.

## Fazit

### Wichtige Punkte

Capgos Integration mit GitHub Actions vereinfacht den Deployment-Prozess für [Capacitor Apps](https://capgoapp/blog/capacitor-comprehensive-guide/) und bietet Entwicklungsteams große Vorteile. Mit einer globalen Erfolgsrate von 82% für Updates und 95% der aktiven Nutzer, die Updates innerhalb von 24 Stunden erhalten [\[1\]](https://capgoapp/), sticht diese Lösung durch ihre Effizienz hervor.

Hier sind einige herausragende Funktionen:

-   **Automatisierte Workflows**: Durch die direkte Konfiguration von Workflows in GitHub Actions ist kein externes CI/CD-Hosting erforderlich. Dieser Ansatz reduziert die Betriebskosten und spart im Vergleich zu Alternativen wie AppFlow über fünf Jahre etwa 26.100 $ [\[1\]](https://capgoapp/)
-   **Schnelles Deployment**: Updates können sofort bereitgestellt werden, ohne App-Store-Verzögerungen
-   **Hohe Sicherheit**: Ende-zu-Ende-Verschlüsselung gewährleistet sichere Update-Auslieferung, während Capgos Kanalsystem kontrollierte, gestufte Einführungen ermöglicht

Diese Funktionen ebnen den Weg für maßgeschneiderte Lösungen und verbesserte Leistung, die nachfolgend näher erläutert werden.

### Fortgeschrittene Strategien

Um das Beste aus Ihrer Capgo- und GitHub Actions-Integration herauszuholen, erkunden Sie diese fortgeschrittenen Taktiken:

-   **Benutzerdefinierte API-Workflows**: Nutzen Sie Capgos öffentliche API, um Deployment-Workflows zu erstellen, die den spezifischen Bedürfnissen Ihres Teams entsprechen. Dies ermöglicht White-Label-Erfahrungen und nahtlose Integration mit Ihren aktuellen Tools [\[1\]](https://capgoapp/)
-   **[Kanalbasierte Releases](https://capgoapp/docs/webapp/channels/)**: Optimieren Sie Ihren Deployment-Prozess durch die Nutzung von Capgos Kanalfunktionen für gestufte und kontrollierte Updates
-   **Optimierte Leistung**: Nutzen Sie Capgos partielle Updates, um die Bandbreitennutzung zu reduzieren und Updates zu beschleunigen. Mit 235 Millionen ausgelieferten Updates über 750 Produktions-Apps [\[1\]](https://capgoapp/) hat das System seine Fähigkeit bewiesen, große Anforderungen zu bewältigen

Für noch bessere Ergebnisse erwägen Sie die Nutzung von Capgos Self-Hosting-Optionen oder benutzerdefinierten API-Einrichtungen. Schauen Sie in den vorherigen Abschnitten nach detaillierten Einrichtungs- und Testanweisungen, um diese Strategien vollständig umzusetzen.