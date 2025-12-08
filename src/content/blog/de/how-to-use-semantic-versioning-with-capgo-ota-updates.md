---
slug: how-to-use-semantic-versioning-with-capgo-ota-updates
title: So verwenden Sie semantische Versionierung mit Capgo OTA Updates
description: >-
  Erfahren Sie, wie Sie App-Updates und Versionskontrolle mithilfe von Semantic
  Versioning mit Capgos OTA-Updates für Capacitor-Apps optimieren können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-03T04:48:38.491Z
updated_at: 2025-10-31T17:55:22.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67c4f6356c9ebce91891f4e6-1740977344964.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Semantic Versioning, Capgo, OTA updates, Capacitor apps, version control, app
  updates, deployment, CI/CD
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---
**Möchten Sie [App-Updates](https://capgo.app/plugins/capacitor-updater/) und Versionskontrolle vereinfachen?** Semantic Versioning (SemVer) in Kombination mit [Capgo](https://capgo.app/)s Over-The-Air (OTA) Updates macht die Verwaltung von [Capacitor](https://capacitorjs.com/) Apps einfacher und schneller. So geht's:

-   **Grundlagen des Semantic Versioning:** Versionen nutzen das Format `MAJOR.MINOR.PATCH`:
    
    -   **MAJOR:** Für Breaking Changes.
    -   **MINOR:** Für neue Features mit Abwärtskompatibilität.
    -   **PATCH:** Für Fehlerbehebungen.
-   **Warum SemVer mit Capgo nutzen?**
    
    -   Klare Kommunikation über Updates.
    -   Intelligentere Versionsverwaltung.
    -   Vermeidung von Abhängigkeitskonflikten.
    -   Organisierte Release-Planung.
-   **[Capgo Einrichtung](https://capgo.app/docs/cli/commands/) Schritte:**
    
    1.  Installieren Sie das Capgo Updater Plugin.
    2.  Konfigurieren Sie die Version Ihrer App in `capacitor.config.json` und anderen Dateien.
    3.  Initialisieren Sie mit Ihrem API-Schlüssel.
    4.  Nutzen Sie die [Capgo CLI](https://capgo.app/docs/cli/commands) zum Bündeln und Hochladen von Updates.
-   **[Versionen und Kanäle verwalten](https://capgo.app/docs/webapp/channels/):**
    
    -   Nutzen Sie separate Kanäle (z.B. "beta" für Tests, "production" für stabile Releases).
    -   Steuern Sie Update-Richtlinien (automatische Patches, manuelle Freigabe für große Änderungen).
    -   Rollback-Optionen für fehlgeschlagene Updates.
-   **Bereitstellungsprozess:**
    
    -   Aktualisieren Sie Versionsnummern nach SemVer-Regeln.
    -   Testen Sie gründlich vor der Bereitstellung.
    -   Nutzen Sie CLI-Befehle zum Hochladen und Verteilen von Updates.

Capgo stellt sicher, dass Updates schnell und zuverlässig bei Nutzern ankommen, mit Werkzeugen zur Handhabung von Störungen und Aufrechterhaltung der Stabilität. Perfekt für Teams, die CI/CD-Workflows zur Automatisierung von Updates nutzen.

**Schnelltipp:** Testen Sie Updates immer und nutzen Sie Kanäle für effektive stufenweise Rollouts.

## Semantic Versioning | Level Up

## [Capgo](https://capgo.app/) Einrichtungsanleitung

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-03.jpg?auto=compress)

Hier erfahren Sie, wie Sie Capgo für die Verwaltung von OTA-Updates und Versionskontrolle einrichten.

### Erste Einrichtungsschritte

Beginnen Sie mit der Installation des [Capgo Updater Plugins](https://capgo.app/docs/plugin/self-hosted/manual-update/):

```bash
npm install @capgo/capacitor-updater  
npx cap sync
```

Stellen Sie sicher, dass Ihre `capacitor.config.json` Datei ein semantisches Versionsformat verwendet:

```json
{ 
  "appId": "com.example.app", 
  "appName": "My App", 
  "version": "1.0.0" 
}
```

Für ältere Projekte aktualisieren Sie die Versionsdetails an diesen Stellen:

-   `package.json` (suchen Sie nach dem `version` Feld)
-   `android/app/build.gradle` (aktualisieren Sie `versionName`)
-   `ios/App/App.xcodeproj/project.pbxproj` (aktualisieren Sie `CURRENT_PROJECT_VERSION`)

Nach der Konfiguration initialisieren Sie Capgo mit Ihrem API-Schlüssel:

```bash
npx @capgo/cli@latest init YOUR_API_KEY
```

**Schnellreferenz-Tabelle:**

| Einrichtungsphase | Hauptaktion | Verifizierungsschritt |
| --- | --- | --- |
| Installation | Plugin installieren und synchronisieren | `package.json` prüfen |
| Konfiguration | Versionsnummern festlegen | In allen Dateien überprüfen |
| Initialisierung | Mit API-Schlüssel verbinden | Verbindungsstatus testen |
| Build | Initiales Bundle erstellen | Upload-Erfolg bestätigen |

### Versionskontroll-Integration

Capgo arbeitet gut mit CI/CD-Plattformen zusammen und macht [automatisierte Updates](https://capgo.app/docs/live-updates/update-behavior/) einfach. Unterstützte Plattformen sind:

-   [GitHub Actions](https://docs.github.com/actions)
-   [GitLab CI](https://docs.gitlab.com/ee/ci/)
-   [Azure DevOps](https://azure.microsoft.com/en-us/products/devops)
-   [Jenkins](https://www.jenkins.io/)
-   [CircleCI](https://circleci.com/)

Wenn Sie an lokaler Entwicklung arbeiten, können Sie Auto-Updates deaktivieren, indem Sie dies zu Ihrer Konfiguration hinzufügen:

```json
{ 
  "plugins": { 
    "CapacitorUpdater": { 
      "autoUpdate": false 
    } 
  } 
}
```

Dies stellt sicher, dass Capgo Ihre lokalen Änderungen nicht überschreibt. Sobald Ihre Einrichtung bereit ist, laden Sie Ihre erste Version hoch:

```bash
npx @capgo/cli@latest bundle upload  
npx @capgo/cli@latest channel set production -s default
```

Informieren Sie schließlich das native Plugin über den Zustand des Bundles in Ihrer App-Hauptdatei:

```javascript
import { CapacitorUpdater } from '@capgo/capacitor-updater';  
CapacitorUpdater.notifyAppReady();
```

Diese Einrichtung stellt sicher, dass Ihre App bereit für reibungslose OTA-Bereitstellungen und Versionsverwaltung ist.

## Semantic Versioning mit Capgo nutzen

### Versionsnummern-Verwaltung

Capgo verwendet Semantic Versioning (SemVer) zur Verwaltung von App-Versionen, formatiert als **MAJOR.MINOR.PATCH**. So funktioniert es:

-   **Major Version (X.0.0)**: Erhöhen Sie die MAJOR-Nummer für Änderungen, die die Kompatibilität brechen.
-   **Minor Version (1.X.0)**: Erhöhen Sie die MINOR-Nummer für neue Features, die kompatibel bleiben.
-   **Patch Version (1.0.X)**: Erhöhen Sie die PATCH-Nummer für Fehlerbehebungen, die die Kompatibilität nicht beeinflussen.

| Versionstyp | Wann erhöhen | [Auto-Update-Verhalten](https://capgo.app/docs/plugin/cloud-mode/auto-update/) |
| --- | --- | --- |
| Major (X.0.0) | Für breaking API-Änderungen | Erfordert manuelle Genehmigung |
| Minor (1.X.0) | Für neue Features | In Capgo konfigurierbar |
| Patch (1.0.X) | Für Fehlerbehebungen | Normalerweise automatisch |

Durch Einhaltung der SemVer-Regeln können Sie die Versionsverwaltung vereinfachen und reibungslosere Updates über Ihre Bereitstellungskanäle gewährleisten.

### Versionskontroll-Richtlinien

Capgo ermöglicht es Ihnen, Bereitstellungen effektiv zu verwalten, indem Sie verschiedene Kanäle für unterschiedliche Phasen Ihres Workflows einrichten.

-   **[Kanalbasierte Versionsverwaltung](https://capgo.app/docs/webapp/channels/)**: Organisieren Sie Ihren Bereitstellungsprozess durch separate Kanäle für Tests und Produktion. Zum Beispiel:
    
    -   Nutzen Sie einen "beta"-Kanal (z.B. 1.2.0-beta) zum Testen neuer Features.
    -   Behalten Sie einen "production"-Kanal (z.B. 1.2.0) für stabile Releases.
    -   Fügen Sie plattformspezifische Kanäle hinzu (z.B. "ios-hotfix" mit Version 1.2.1) für plattformspezifische Probleme.
-   **Update-Richtlinien-Konfiguration**: Steuern Sie, wie Updates mit Capgos Konfigurationsoptionen angewendet werden. Zum Beispiel:
    
    ```json
    {
      "plugins": {
        "CapacitorUpdater": {
          "disableAutoUpdate": "minor"
        }
      }
    }
    ```
    
    Diese Einrichtung stellt sicher, dass Benutzer automatisch Patch-Updates erhalten, während Minor- und Major-Updates manuelle Genehmigung erfordern.
    
-   **Versions-Rollback-Strategie**: Verwenden Sie Pre-Release-Kennzeichner, um klare Rollback-Optionen zu behalten. Dieser Ansatz ermöglicht es Ihnen, zu einer vorherigen Version zurückzukehren, wenn Probleme auftreten, während die Versionierung über alle Kanäle hinweg konsistent bleibt.
    

Diese Best Practices erleichtern es, Updates zu verwalten, neue Features zu testen und die Stabilität im Bereitstellungsprozess Ihrer App aufrechtzuerhalten.

## OTA Update Bereitstellung

Sobald Ihre Versionsverwaltung eingerichtet ist, folgen Sie diesen Schritten zur effektiven Bereitstellung von OTA-Updates.

### Update-Vorbereitung

Beginnen Sie mit der Aktualisierung der Version in **package.json** und **capacitor.config.json**. Stellen Sie sicher, dass die Version dem SemVer-Format folgt (MAJOR.MINOR.PATCH):

-   **Fehlerbehebung**: Erhöhen Sie die PATCH-Nummer (z.B. 1.0.1 → 1.0.2)
-   **Neues Feature**: Erhöhen Sie die MINOR-Nummer (z.B. 1.0.0 → 1.1.0)
-   **Breaking Change**: Erhöhen Sie die MAJOR-Nummer (z.B. 1.0.0 → 2.0.0)

Testen Sie Ihren Build gründlich und bestätigen Sie, dass die App mit dem Server über `notifyAppReady` kommuniziert.

Entscheiden Sie sich als Nächstes für Ihre [Update-Strategie](https://capgo.app/docs/plugin/cloud-mode/hybrid-update). Sie können wählen zwischen:

-   **Auto-Update**: Automatische Durchsetzung von Mindestversionsanforderungen.
-   **Manuelle Kontrolle**: Genaue Versionsanforderungen für Updates festlegen.
-   **Kanalbasiert**: Kanäle für Tests und stufenweise Rollouts nutzen.

### Capgo CLI Update-Befehle

Nutzen Sie Capgos CLI zur einfachen Bereitstellung Ihres Updates. So geht's:

```bash
# Initialize Capgo in your project
npx @capgo/cli@latest init [apikey]

# Upload your update bundle
npx @capgo/cli bundle upload [appId]

# Add a new distribution channel
npx @capgo/cli channel add [channelId] [appId]
```

Capgo gewährleistet sichere Bereitstellung mit Ende-zu-Ende-Verschlüsselung und sicherem Schlüsselmanagement.

> "@Capgo ist eine intelligente Möglichkeit, Hot Code Pushes durchzuführen (und nicht für alles Geld der Welt wie bei @AppFlow) 🙂"

Nach der Bereitstellung können Sie Updates über Capgos Dashboard überwachen. Updates erreichen Benutzer typischerweise innerhalb von Minuten nach dem Öffnen der App. Der Prozess funktioniert wie folgt:

-   Die App prüft auf Updates.
-   Lädt das Update im Hintergrund herunter.
-   Markiert die neue Version als aktiv, wenn der Benutzer die App verlässt.
-   Wendet das Update beim nächsten Start an.

Für Unternehmens-Bereitstellungen möchten Sie möglicherweise CI/CD-Automatisierung integrieren.

> "Wir praktizieren agile Entwicklung und @Capgo ist mission-kritisch bei der kontinuierlichen Auslieferung an unsere Nutzer!"

## Problemlösung und Tipps

### Versionsverwaltungs-Probleme

Die Verwaltung von Semantic Versioning in Capgo kann manchmal die Update-Bereitstellung verkomplizieren. Um Ihre Entwicklungsarbeit nicht zu überschreiben, konfigurieren Sie Folgendes in Ihrer `capacitor.config.json` Datei:

```json
{ 
  "plugins": { 
    "CapacitorUpdater": { 
      "autoUpdate": false 
    } 
  } 
}
```

Wenn ein Update fehlschlägt, können Sie Folgendes tun:

-   Setzen Sie `autoUpdate` während der Entwicklung auf `false`.
-   Deinstallieren Sie die App.
-   Installieren Sie sie mit der korrigierten Version neu.
-   Aktivieren Sie Auto-Updates wieder, sobald alles stabil ist.

Für Major-Version-Updates verwenden Sie das `disableAutoUpdateBreaking` Flag und hören Sie auf das `majorAvailable` Event, um Updates ordnungsgemäß zu handhaben:

```javascript
CapacitorUpdater.addListener('majorAvailable', (info) => {
  console.log(`Major update available: ${info.version}`);
  // Add your update prompt logic here
});
```

Durch die Kombination dieser Konfigurationen mit guten Team-Praktiken können Sie Versionskonsistenz aufrechterhalten und Fehler reduzieren.

### Team-Versionskontrolle

Sobald einzelne Updates verwaltet werden, ist es wichtig für Teams, starke Versionskontroll-Praktiken zu etablieren.

> "Das Testen jeder Änderung vor dem Zusammenführen mit dem Hauptrepository wird die Stabilität stärken und kostspielige Fehler vermeiden" [\[4\]](https://www.autorabit.com/blog/9-tips-for-working-on-a-multi-developer-team/)

Hier sind einige Methoden zur Gewährleistung der Konsistenz:

-   Definieren Sie einen Branch als **Hauptrepository**, der als Quelle der Wahrheit dient.
-   Nutzen Sie separate Capgo-Kanäle für Entwicklungs- und Produktionsumgebungen.
-   Automatisieren Sie Versions-Uploads über CI/CD-Pipelines.
-   Dokumentieren Sie alle Code-Änderungen mit klaren und detaillierten Commit-Nachrichten.

Für größere Teams kann die folgende Versionsverwaltungsmatrix bei der Organisation von Updates helfen:

| Umgebung | Kanal | Auto-Update | Versionsmuster |
| --- | --- | --- | --- |
| Entwicklung | dev | Deaktiviert | 0.x.x |
| Staging | beta | Aktiviert | x.x.x-beta |
| Produktion | stable | Aktiviert | x.x.x |

### Update-Wiederherstellungsschritte

Selbst mit Vorsichtsmaßnahmen können Updates fehlschlagen. Wenn das passiert, folgen Sie diesen Wiederherstellungsschritten:

1. Zurück zu einem vorherigen stabilen Bundle.
2. Versionsnummern für neue Korrekturen erhöhen (Hinweis: Versionsnummern können nach dem Löschen nicht wiederverwendet werden) [\[2\]](https://github.com/Cap-go/CLI).
3. Updates beim App-Start überprüfen, um sicherzustellen, dass sie wie erwartet funktionieren.

Der Updater von Capgo ist darauf ausgelegt, mit Störungen umzugehen. Wenn beispielsweise der Server nicht erreichbar ist oder ein Update gelöscht wurde, funktioniert die App weiterhin normal [\[3\]](https://capgo.app/docs/faq/). Zusätzlich werden fehlgeschlagene Netzwerkanfragen beim nächsten App-Start automatisch wiederholt [\[3\]](https://capgo.app/docs/faq/). Diese eingebaute Widerstandsfähigkeit minimiert Ausfallzeiten und gewährleistet einen reibungsloseren Betrieb.

## Zusammenfassung

Semantische Versionierung in Kombination mit Capgo hat OTA-Updates für Capacitor-Apps effizienter gemacht. Mit 947,6 Millionen ausgelieferten Updates und 1.400 Produktions-Apps, die dieses System nutzen [\[1\]](https://capgo.app/), wurden Bereitstellungsprozesse um 81% effizienter [\[1\]](https://capgo.app/). Diese Einrichtung ermöglicht es Entwicklern, Updates schnell und kontrolliert zu veröffentlichen und dabei App-Store-Verzögerungen zu umgehen.

Das sagen Entwickler:

> "Wir haben [Capgo OTA-Updates](https://console.capgo.app/resend_email) in der Produktion für unsere Nutzerbasis von +5000 eingeführt. Wir sehen einen sehr reibungslosen Betrieb, fast alle unsere Nutzer sind innerhalb von Minuten nach der Bereitstellung des OTA bei @Capgo auf dem neuesten Stand." - colenso [\[1\]](https://capgo.app/)

Das MAJOR.MINOR.PATCH-Versionierungssystem macht es einfach, Breaking Changes, neue Funktionen und Fehlerbehebungen zu kommunizieren [\[5\]](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/). Dies ist besonders hilfreich für Teams, die mehrere Releases pro Woche über Capgos Plattform verwalten.

Capgos [verschlüsselte Lösung](https://capgo.app/docs/cli/migrations/encryption/), integriert mit CI/CD-Tools, ist auch kostengünstig - sie spart über fünf Jahre bis zu 26.100 $ [\[1\]](https://capgo.app/). Die anpassbaren Kanäle stellen sicher, dass Updates die richtigen Nutzer zum richtigen Zeitpunkt erreichen.

> "Wir praktizieren agile Entwicklung und @Capgo ist mission-kritisch bei der kontinuierlichen Auslieferung an unsere Nutzer!" - Rodrigo Mantica [\[1\]](https://capgo.app/)
