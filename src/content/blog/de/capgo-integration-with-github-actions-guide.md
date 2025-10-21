---
slug: capgo-integration-with-github-actions-guide
title: 'Capgo-Integration mit GitHub Actions: Anleitung'
description: >-
  Integriere Capgo mit GitHub Actions für effiziente, sichere und kostengünstige
  App-Updates, die deinen Entwicklungsworkflow verbessern.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-16T02:24:50.565Z
updated_at: 2025-10-21T10:46:26.000Z
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
[Capgo](https://capgo.app/) und [GitHub Actions](https://docs.github.com/actions) vereinfachen gemeinsam das Bereitstellen von Updates für [Capacitor](https://capacitorjs.com/) Apps. Hier sind die Gründe, warum diese Integration Ihre Aufmerksamkeit verdient:

-   **Geld Sparen**: Senken Sie die CI/CD-Kosten um bis zu 26.100 $ über 5 Jahre im Vergleich zu [AppFlow](https://ionic.io/appflow/).
-   **Schnelle Updates**: Pushen Sie Updates sofort mit 95 % der Nutzer, die sie innerhalb von 24 Stunden erhalten.
-   **Sichere Bereitstellungen**: Ende-zu-Ende-Verschlüsselung stellt sicher, dass Updates sicher sind.
-   **Optimierter Workflow**: Automatisieren Sie Builds und Bereitstellungen direkt in Ihrem GitHub-Repository.

### Schnellübersicht

1.  **Anforderungen**: GitHub-Konto, [Capgo-Konto](https://capgo.app/disclaimer/) (ab 12 $/Monat), Capacitor-Projekt, [Node.js](https://nodejs.org/en).
2.  **Einrichtung**: Installieren Sie [Capgo CLI](https://capgo.app/docs/cli/commands) mit `npx @capgo/cli init`, konfigurieren Sie GitHub Actions mit einem YAML-Workflow.
3.  **Bereitstellung**: Verwenden Sie Befehle wie `npx @capgo/cli deploy`, um [Updates zu automatisieren](https://capgo.app/docs/live-updates/update-behavior/).
4.  **Tests**: Stellen Sie vor der Produktion auf Testkanäle (z. B. Beta, Staging) bereit.

**Beispiel-Workflow (YAML)**:

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
      - uses: actions/setup-node@v4  
        with:  
          node-version: '18.x'  
      - name: Install Dependencies  
        run: npm install  
      - name: Deploy to Capgo  
        run: npx @capgo/cli deploy  
        env:  
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}  
```

Diese Integration stellt schnelle, sichere und kosteneffiziente App-Updates sicher und ist ideal für agile Entwicklungsteams.

## [GitHub Actions](https://docs.github.com/actions) Tutorial - Grundlegende Konzepte und CI/CD-Pipeline

![GitHub Actions](https://mars-images.imgix.net/seobot/screenshots/docs.github.com-90237daad1b336de5d9b7f1a85aa7441-2025-03-16.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/R8_veQiYBjI" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Einrichtungsvoraussetzungen

[Die Integration von Capgo](https://capgo.app/docs/webapp/) mit GitHub Actions umfasst die Einrichtung der erforderlichen Tools und Konfigurationen.

### Erforderliche Tools und Konten

Stellen Sie sicher, dass Sie die folgenden Konten und Tools bereit haben:

| Anforderung | Zweck | Einzelheiten |
| --- | --- | --- |
| **GitHub-Konto** | Versionskontrolle & CI/CD | Aktives Konto mit Zugriff auf Repositories |
| **Capgo-Konto** | Verwaltung von Live-Updates | Pläne beginnen bei 12 $/Monat für den SOLO-Plan |
| **Capacitor-Projekt** | App-Entwicklung | Ein funktionales Projekt, das bereit für die Integration ist |
| **Node.js** | Laufzeitumgebung | Die neueste LTS-Version wird empfohlen |

Sobald diese bereit sind, können Sie Capgo zu Ihrem Projekt für automatisierte Live-Updates hinzufügen.

### Hinzufügen von [Capgo](https://capgo.app/) zu Ihrem Projekt

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-16.jpg?auto=compress)

Um Capgo zu integrieren, installieren Sie es in Ihrem Capacitor-Projekt mit seinem CLI-Tool. Laut Martin Donadieu, dem Gründer von Capgo:

> "Führen Sie npx @capgo/cli init aus, das reicht!" [\[1\]](https://capgo.app/)

Dieser Befehl wird das Plugin und seine erforderlichen Abhängigkeiten einrichten.

### GitHub-Repository-Einrichtung

Bereiten Sie Ihr GitHub-Repository vor, um die Anforderungen für die CI/CD-Integration mit Capgo zu erfüllen. Wie in deren Dokumentation erwähnt:

> "Wir konfigurieren Ihre CI/CD-Pipeline direkt in Ihrer bevorzugten Plattform, sei es GitHub Actions, GitLab CI oder andere. Wir hosten CI/CD nicht oder berechnen Ihnen keine Kosten für die Wartung." [\[1\]](https://capgo.app/)

Capgo bietet dieses Setup gegen eine einmalige Gebühr von 2.600 $ und etwa 300 $/Monat an, was im Vergleich zu AppFlows jährlichen 6.000 $ Gebühr günstiger ist [\[1\]](https://capgo.app/).

Hier ist, wie Sie Ihr Repository einrichten können:

-   **Repository-Struktur**: Organisieren Sie Ihr Repository mit separaten Verzeichnissen für Quellcode, Assets und Konfigurationsdateien, um alles sauber und handhabbar zu halten.
-   **Umgebungs-Konfiguration**: Erstellen Sie unterschiedliche Umgebungen für Entwicklung, Staging und Produktion, um sicherzustellen, dass angemessene Zugriffssteuerungen und Sicherheitsmaßnahmen vorhanden sind.
-   **Zugriffsverwaltung**: Legen Sie die Berechtigungen des Repositories sorgfältig fest, um die [Capgo-Integration](https://capgo.app/consulting/) zu ermöglichen und gleichzeitig die Sicherheit aufrechtzuerhalten.

Diese Schritte stellen sicher, dass Ihr Projekt bereit für den GitHub Actions-Workflow ist, der im nächsten Abschnitt umrissen wird.

## GitHub Actions Workflow-Einrichtung

Automatisieren Sie Ihre [Capgo-Bereitstellungen](https://capgo.app/docs/cli/commands/) mit GitHub Actions, um Ihren CI/CD-Prozess zu optimieren.

### Erstellen der Workflow-Datei

Beginnen Sie damit, eine YAML-Datei im Verzeichnis `.github/workflows` Ihres Repositories zu erstellen. Hier ist ein Beispiel:

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
      - uses: actions/setup-node@v4
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

Diese Konfiguration sorgt für sichere und automatisierte Bereitstellungen. Nachdem Sie die Datei eingerichtet haben, wählen Sie die richtigen Trigger für Ihren Workflow aus.

### Workflow-Trigger-Optionen

GitHub Actions ermöglicht es Ihnen, anzupassen, wann Workflows ausgeführt werden. Hier sind einige Trigger-Optionen:

| **Trigger-Typ** | **Anwendungsfall** | **Konfiguration** |
| --- | --- | --- |
| Push-Events | Bereitstellung bei Codeänderungen | Aktiviert, wenn Code in bestimmte Branches gepusht wird |
| Manuelle Auslösung | On-Demand-Updates | Ermöglicht Ihnen, den Workflow manuell zu starten |
| Zeitplan | Zeitgesteuerte Veröffentlichungen | Führt Bereitstellungen in festgelegten Intervallen aus |
| Pull Request | Testing von Updates | Testet Änderungen, bevor sie in die Hauptzweige integriert werden |

### Verwaltung von geheimen Schlüsseln

Um sichere Bereitstellungen zu gewährleisten, müssen Sie Ihre geheimen Schlüssel ordnungsgemäß verwalten. GitHub Actions bietet ein verschlüsseltes Geheimnisverwaltungs-System zu diesem Zweck.

**Schritte zur Einrichtung einer sicheren Authentifizierung:**

1.  **Zugriff auf Repository-Einstellungen**  
    Gehen Sie zu den Einstellungen Ihres Repositories und finden Sie den Abschnitt "Secrets und Variablen" unter dem Tab "Sicherheit".
    
2.  **[Capgo-Anmeldedaten](https://capgo.app/trust/) hinzufügen**  
    Speichern Sie Ihr Capgo-Authentifizierungstoken als geheimes Repository. Benennen Sie es `CAPGO_TOKEN`.
    
3.  **Geheimnisse in Workflows referenzieren**  
    Verwenden Sie Ihre gespeicherten Geheimnisse im Workflow, indem Sie sie so referenzieren: `${{ secrets.CAPGO_TOKEN }}`.
    

## Capgo-Befehle in Workflows

Sobald Ihre GitHub Actions-Umgebung eingerichtet ist, können Sie Bereitstellungen automatisieren, indem Sie Capgo CLI-Befehle integrieren.

### Installation von Capgo CLI

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

### Bereitbefehle

Hier sind die wichtigsten Befehle zum Handhaben von Build, Versionierung und Bereitstellung Ihrer Updates:

| Befehl | Zweck | Anwendungsbeispiel |
| --- | --- | --- |
| `build` | Erstellt ein [produktionsbereites Bundle](https://capgo.app/docs/webapp/bundles/) | `npx @capgo/cli build` |
| `deploy` | Pushen von Updates an Capgo | `npx @capgo/cli deploy` |
| `version` | Setzt die Version für das Update | `npx @capgo/cli version 1.2.0` |

Um den gesamten Bereitstellungsprozess zu automatisieren, verwenden Sie die Befehle zusammen wie folgt:

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

Dieses Setup stellt sicher, dass Ihre Updates automatisch gebaut, versioniert und bereitgestellt werden, wann immer der Workflow ausgeführt wird. Das Geheimnisverwaltungssystem von GitHub schützt Ihre Anmeldedaten während des gesamten Prozesses.

## Tests und Fehlerbehebung

### Ausführen von Test-Workflows

Sie können Ihren GitHub Actions-Workflow testen, indem Sie einen speziellen [Capgo-Testkanal](https://capgo.app/docs/plugin/cloud-mode/channel-system/) verwenden. Dies ermöglicht es Ihnen, Updates zu validieren, bevor sie live gehen.

```yaml
- name: Test Build Deployment
  run: |
    npx @capgo/cli build
    npx @capgo/cli deploy --channel beta
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Das Kanalsystem von Capgo hilft Ihnen, separate Bereitstellungspfade für verschiedene Stufen zu erstellen:

| Kanal | Zweck | Zielgruppe |
| --- | --- | --- |
| beta | Vorab-Test | Internes Team |
| staging | QA-Validierung | Testnutzer |
| produktion | Live-Bereitstellung | Alle Nutzer |

### Fehlerslösungen

Hier sind einige häufige Integrationsprobleme und wie man sie behebt:

1. **Authentifizierungsfehler**

Überprüfen Sie das CAPGO\_TOKEN in GitHub Secrets. Wenn es abgelaufen ist, regenerieren Sie es, um eine reibungslose Authentifizierung zu gewährleisten.

2. **Build-Fehler**

Stellen Sie sicher, dass Ihre Build-Konfiguration den Anforderungen Ihrer Bereitstellungsumgebung entspricht.

> "Wir haben Capgo OTA-Updates in der Produktion für unsere Nutzerbasis von über 5000 ausgerollt. Wir sehen eine sehr reibungslose Operation, fast alle unsere Nutzer sind innerhalb von Minuten nach der Bereitstellung der OTA auf @Capgo." [\[1\]](https://capgo.app/)

3. **Versionskonflikte**

Halten Sie sich an die semantische Versionierung und erhöhen Sie die Versionen ordnungsgemäß, um Konflikte während der Bereitstellungen zu vermeiden.

### Wartungstipps

-   Verwenden Sie [Capgo-Analysen](https://capgo.app/dp/), um die Erfolgsquoten von Updates zu überwachen.
-   Aktivieren Sie automatische Rollbacks für Updates, die Probleme verursachen könnten.
-   Testen Sie Pull Requests (PRs) mithilfe von Kanalwählern für bessere Kontrolle.
-   Halten Sie Ihren Workflow mit den neuesten Capgo CLI-Befehlen aktuell.

Für hochpriorisierte Bereitstellungen nutzen Sie die Fehlerverfolgung von Capgo, um potenzielle Probleme frühzeitig zu erkennen. Wenn etwas schiefgeht, ermöglicht die Rollback-Funktion, schnell auf eine stabile Version zurückzukehren, was die Störung minimiert. Diese Praktiken helfen, Ihre Bereitstellungen reibungslos zu halten, während Sie sich der Produktion nähern.

## Fazit

### Wichtige Höhepunkte

Die Integration von Capgo mit GitHub Actions vereinfacht den Bereitstellungsprozess für [Capacitor-Apps](https://capgo.app/blog/capacitor-comprehensive-guide/), was erhebliche Vorteile für Entwicklungsteams mit sich bringt. Mit einer globalen Erfolgsquote von 82 % für Updates und 95 % der aktiven Nutzer, die Updates innerhalb von 24 Stunden erhalten [\[1\]](https://capgo.app/), hebt sich diese Lösung durch ihre Effizienz hervor.

Hier sind einige herausragende Funktionen:

-   **Automatisierte Workflows**: Durch die direkte Konfiguration von Workflows in GitHub Actions ist kein externes CI/CD-Hosting erforderlich. Dieser Ansatz senkt die Betriebskosten und spart etwa 26.100 $ über fünf Jahre im Vergleich zu Alternativen wie AppFlow [\[1\]](https://capgo.app/).
-   **Schnelle Bereitstellung**: Updates können sofort bereitgestellt werden, wodurch Verzögerungen im App-Store umgangen werden.
-   **Starke Sicherheit**: Die Ende-zu-Ende-Verschlüsselung stellt sicher, dass Updates sicher ausgeliefert werden, während das Kanalsystem von Capgo kontrollierte, stufenweise Rollouts ermöglicht.

Diese Funktionen ebnen den Weg für maßgeschneiderte Lösungen und verbesserte Leistung, die weiter unten näher erforscht werden. 

### Erweiterte Strategien

Um das Beste aus Ihrer Capgo- und GitHub Actions-Integration herauszuholen, erkunden Sie diese fortgeschrittenen Taktiken:

-   **Benutzerdefinierte API-Workflows**: Verwenden Sie die öffentliche API von Capgo, um Bereitstellungs-Workflows zu gestalten, die den spezifischen Bedürfnissen Ihres Teams entsprechen. Dies kann weiße Etikett-Erlebnisse und nahtlose Integration mit Ihren aktuellen Tools ermöglichen [\[1\]](https://capgo.app/).
-   **[Kanalbasierte Veröffentlichungen](https://capgo.app/docs/webapp/channels/)**: Optimieren Sie Ihren Bereitstellungsprozess, indem Sie die Kanal-Funktionen von Capgo für gestaffelte und kontrollierte Updates verwenden.
-   **Optimierte Leistung**: Nutzen Sie die partiellen Updates von Capgo, um den Bandbreitenverbrauch zu reduzieren und die Updates zu beschleunigen. Mit 23,5 Millionen gelieferten Updates über 750 Produktionsanwendungen [\[1\]](https://capgo.app/) hat das System seine Fähigkeit bewiesen, große Anforderungen zu bewältigen.

Für noch bessere Ergebnisse sollten Sie die Self-Hosting-Optionen oder benutzerdefinierte API-Setups von Capgo in Betracht ziehen. Überprüfen Sie frühere Abschnitte für detaillierte Einrichtungs- und Testanleitungen, um diese Strategien vollständig umzusetzen.
