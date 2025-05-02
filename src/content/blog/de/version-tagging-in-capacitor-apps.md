---
slug: version-tagging-in-capacitor-apps
title: Version-Kennzeichnung in Capacitor Apps
description: >-
  Lernen Sie die Grundlagen der Versionskennzeichnung in Capacitor-Apps,
  einschließlich bewährter Methoden für Updates, Synchronisation und
  Automatisierung.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-26T03:19:04.753Z
updated_at: 2025-03-26T03:19:15.569Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e36d7410051fda3b6230a0-1742959155569.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Capacitor, version tagging, semantic versioning, app updates, mobile
  development
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
original_slug: version-tagging-in-capacitor-apps
---
Versionskennzeichnung ist für die Verwaltung von [Capacitor](https://capacitorjs.com/)-Apps unverzichtbar. Sie gewährleistet reibungslose Updates, verfolgt Änderungen und verbessert die App-Zuverlässigkeit auf iOS-, Android- und Web-Plattformen. Hier ein kurzer Überblick:

-   **Warum es wichtig ist**: Verfolgt Updates, ermöglicht Rollbacks und gewährleistet stabile Bereitstellungen.
-   **Semantische Versionierung**: Verwendet **MAJOR.MINOR.PATCH** um Breaking Changes, neue Funktionen oder Bugfixes anzuzeigen.
-   **Plattformübergreifende Synchronisation**: Versionsnummern in `package.json`, iOS `Info.plist` und Android `build.gradle` abstimmen.
-   **Automatisierung**: [Updates automatisieren](https://capgo.app/docs/plugin/cloud-mode/hybrid-update/) mit npm-Skripten und CI/CD-Tools.
-   **Live-Updates**: Tools wie [Capgo](https://capgo.app/) liefern Updates an 95% der Nutzer innerhalb von 24 Stunden.
-   **Beta-Management**: Strukturierte Kanäle für Alpha-, Beta- und Produktionsversionen verwenden.

### Schneller Vergleich

| Funktion | Zweck | Beispiel |
| --- | --- | --- |
| **Semantische Versionierung** | Verfolgt Änderungen klar | `1.2.3 → 2.0.0` |
| **Versionen synchronisieren** | Plattformübergreifende Abstimmung | `npx cap sync` |
| **Automatisierung** | Beschleunigt Versionsupdates | `npm version patch` |
| **Live-Updates** | Schnelle Nutzerakzeptanz | Capgos 95% in 24 Stunden |
| **Beta-Kanäle** | Kontrollierte Testphasen | `1.3.0-beta.1` |

Versionskennzeichnung vereinfacht [App-Updates](https://capgo.app/plugins/capacitor-updater/), hält Nutzer zufrieden und stellt sicher, dass Entwickler Releases effektiv verwalten können.

## So konfigurieren Sie Ihr [Capacitor](https://capacitorjs.com/)-Projekt AUTOMATISCH ⚡️

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-26.jpg?auto=compress)

<Steps>

1. Bedeutende Updates markieren
2. Versionsnummern synchronisieren 
3. Automatisierung einrichten
4. Live-Updates aktivieren
5. Beta-Kanäle konfigurieren

</Steps>

## Versions-Setup in Capacitor

Befolgen Sie diese Schritte, um ein konsistentes Versionsmanagement über alle Plattformen in Ihrer Capacitor-App sicherzustellen.

### Version in `package.json` setzen

Die `package.json`-Datei dient als Hauptquelle für die Versionsdetails Ihrer App. Hier ein Beispiel für die Einrichtung:

```json
{
  "name": "my-app",
  "version": "1.0.0"
}
```

Bei der Aktualisierung der Versionsnummer gelten die Regeln der semantischen Versionierung (SemVer):

-   **Major-Version** (1.x.x): Führt Breaking Changes ein.
-   **Minor-Version** (x.2.x): Fügt neue, abwärtskompatible Funktionen hinzu.
-   **Patch-Version** (x.x.3): Behebt Bugs oder nimmt kleine Verbesserungen vor.

### Plattform-Versionen synchron halten

Es ist wichtig, Versionsnummern über alle Plattformen hinweg für eine reibungslose App-Bereitstellung abzustimmen. Jede Plattform hat ihre eigene Konfigurationsdatei für die Versionierung:

| Plattform | Konfigurationsdatei | Versions-Schlüssel |
| --- | --- | --- |
| iOS | Info.plist | CFBundleShortVersionString |
| Android | build.gradle | versionName |
| Web | package.json | version |

Nach der Aktualisierung der Version in `package.json` verwenden Sie diesen Befehl, um die Änderungen mit den nativen Plattform-Konfigurationen zu synchronisieren:

```bash
npx cap sync
```

### Capacitor CLI für Versionsmanagement nutzen

Die Capacitor CLI bietet hilfreiche Befehle zur Versionsverwaltung:

```bash
npm install @capacitor/cli@latest
```

Wenn Sie Ihre Capacitor CLI aktuell halten, wird die Kompatibilität mit versionsspezifischen Funktionen sichergestellt und potenzielle Unstimmigkeiten werden reduziert. Die Befolgung dieser Schritte hilft Ihnen, eine ordnungsgemäße Versionierung in Ihrer App aufrechtzuerhalten.

## Semantische Versions-Einrichtung

### Grundlagen der semantischen Versionierung

Semantische Versionierung (SemVer) verwendet das Format **MAJOR.MINOR.PATCH**, wobei jeder Teil eine bestimmte Art von Änderung anzeigt:

| Versionskomponente | Zweck |
| --- | --- |
| **MAJOR** | Führt Breaking Changes in der API ein |
| **MINOR** | Fügt neue Funktionen hinzu, die mit vorherigen Versionen kompatibel bleiben |
| **PATCH** | Behebt Bugs oder verbessert die Leistung ohne Kompatibilitätsbruch |

Dieses System stellt sicher, dass Entwickler Updates klar kommunizieren können, während die Kompatibilität über App-Versionen hinweg erhalten bleibt. Zum Beispiel signalisiert der Wechsel von **1.2.3** zu **2.0.0** große, Breaking Updates, die sorgfältige Planung erfordern.

### Wann Versionsnummern aktualisiert werden sollten

Hier erfahren Sie, wie Sie entscheiden, welche Versionsnummer zu aktualisieren ist:

| Update-Typ | Wann zu verwenden | Versionsänderungsbeispiel |
| --- | --- | --- |
| **Major-Update** | Für Breaking API-Änderungen oder große UI-Überarbeitungen | 1.2.3 → 2.0.0 |
| **Minor-Update** | Bei Einführung neuer Funktionen oder Markierung von Funktionen als veraltet | 1.2.3 → 1.3.0 |
| **Patch-Update** | Für Bugfixes oder kleine Leistungsverbesserungen | 1.2.3 → 1.2.4 |

> "Wir praktizieren agile Entwicklung und @Capgo ist mission-kritisch bei der kontinuierlichen Auslieferung an unsere Nutzer!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Schauen wir uns nun an, wie diese Updates automatisiert werden können, um das Release-Management zu vereinfachen.

### Automatisierung von Versionsupdates

[Automatisierung von Versionsupdates](https://capgo.app/docs/plugin/self-hosted/auto-update/) kann Zeit sparen und Fehler in Ihrem Capacitor-Projekt reduzieren. Hier erfahren Sie, wie Sie es einrichten:

1.  **NPM Versions-Skripte**

Fügen Sie diese Skripte zu Ihrer `package.json`-Datei hinzu, um Versionsupdates einfach zu verwalten:

```json
{
  "scripts": {
    "version:major": "npm version major",
    "version:minor": "npm version minor",
    "version:patch": "npm version patch"
  }
}
```

2.  **CI/CD-Integration**  
    Integrieren Sie Versionsupdates in Ihre CI/CD-Pipeline. Capgo unterstützt Tools wie [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/) und [Jenkins](https://www.jenkins.io/), was die Automatisierung des Prozesses vereinfacht.

> "@Capgo ist ein Muss-Tool für Entwickler, die Produktivität durch Umgehung langwieriger Bugfix-Reviews anstreben." - Bessie Cooper [\[1\]](https://capgo.app/)

## Versions-Tag-Methoden

### Git Versions-Tags

Git Versions-Tags sind eine zuverlässige Möglichkeit, [Capacitor App-Releases](https://capgo.app/docs/) zu verfolgen. Um klare und informative Tags zu erstellen, kombinieren Sie semantische Versionierung mit einer kurzen Beschreibung:

```bash
git tag -a v1.2.3 -m "Version 1.2.3 - Performance improvements"
```

Um Konsistenz in Ihrem Team zu gewährleisten, verwenden Sie ein standardisiertes Tagging-Format:

| Tag-Komponente | Format | Beispiel |
| --- | --- | --- |
| Release-Version | v\[MAJOR\].\[MINOR\].\[PATCH\] | v1.2.3 |
| Beta-Release | v\[VERSION\]-beta.\[NUMBER\] | v1.2.3-beta.1 |
| Release Candidate | v\[VERSION\]-rc.\[NUMBER\] | v1.2.3-rc.2 |

### Build-Nummer-Integration

Build-Nummern helfen beim Verfolgen einzelner Builds innerhalb jeder Version. Erhöhen Sie die Build-Nummer für iOS und Android bei jeder Einreichung:

```json
{
  "ios": {
    "buildNumber": "123"
  },
  "android": {
    "versionCode": 123
  }
}
```

Die Build-Nummer sollte immer erhöht werden, auch wenn die Version gleich bleibt. Dies stellt sicher, dass jede App Store-Einreichung eindeutig identifiziert wird, während die Versionierung für Benutzer klar bleibt.

### Beta-Versions-Management

Die Verwaltung von Beta-Versionen erfordert einen strukturierten Prozess zur Verteilung von Test-Builds. Capgos [Kanal-System](https://capgo.app/docs/plugin/cloud-mode/channel-system/) vereinfacht dies mit den folgenden Schritten:

1.  **Kanal-Setup**

Erstellen Sie separate Kanäle für jede Testphase:

```javascript
{
  "channels": {
    "alpha": "1.3.0-alpha.1",
    "beta": "1.3.0-beta.1",
    "production": "1.3.0"
  }
}
```

2.  **Benutzerzugriff kontrollieren**

Richten Sie Berechtigungen ein, um zu kontrollieren, wer Zugriff auf Beta-Versionen erhält. Dies stellt sicher, dass nur genehmigte Tester Beta-Builds erhalten, während Produktionsnutzer stabile Releases bekommen.

3.  **Versions-Progression**

Verwenden Sie ein klares Versions-Progressions-System, um die Entwicklungsphasen zu verfolgen:

| Phase | Versions-Format | Zweck |
| --- | --- | --- |
| Alpha | 1.3.0-alpha.1 | Internes Testen |
| Beta | 1.3.0-beta.1 | Externe Testgruppe |
| RC (Release Candidate) | 1.3.0-rc.1 | Finales Testen vor Release |
| Produktion | 1.3.0 | Öffentlicher Release |

Dieser Ansatz gewährleistet gründliches Testen und reibungslose Übergänge zwischen Entwicklungsphasen, wobei die Versionsverfolgung während des gesamten Prozesses organisiert und transparent bleibt.

## App-Versions-Anzeige

Die Anzeige genauer Versionsinformationen in Ihrer App ist der Schlüssel, um Benutzer informiert zu halten und Updates effektiv zu verwalten.

### Version mit Capacitor abrufen

Sie können Versionsdetails mit Capacitor mit diesem Code abrufen:

```typescript
import { App } from '@capacitor/app';

const version = await App.getInfo();
console.log('App Version:', version.version);
```

Für einen effizienteren Ansatz erstellen Sie eine wiederverwendbare Funktion:

```typescript
async function getAppVersion() {
  const info = await App.getInfo();
  return info.version;
}
```

Diese Funktion vereinfacht den Prozess der Anzeige von Versionsinformationen in Ihrer App-Oberfläche.

### Versions-UI-Implementierung

Hier ein Beispiel, wie Sie die Versionsanzeige in eine Einstellungskomponente integrieren:

```typescript
import { App } from '@capacitor/app';

async function SettingsComponent() {
  const version = await App.getInfo();
  return (
    <div>
      <h2>App-Info</h2>
      <p>Version: {version.version}</p>
    </div>
  );
}
```

Übliche Orte für die Anzeige von Versionsdetails sind:

| Ort | Zweck | Implementierung |
| --- | --- | --- |
| Einstellungsbildschirm | Vollständige Version und Build | Detaillierte Versionsinformationen |
| Über-Seite | Grundlegende Versionsanzeige | Nur Versionsnummer |
| App-Footer | Minimale Anzeige | Komprimierter Versionsstring |

Zusätzlich zur Anzeige von Versionsinformationen kann die Integration eines Update-Prüfsystems das Benutzererlebnis verbessern.

### Update-Prüfsystem

Ein Update-Prüfsystem stellt sicher, dass Benutzer Zugang zu den neuesten Funktionen und Fixes haben. Capgo bietet Echtzeit-Benachrichtigungen und kontrollierte Update-Kanäle zur Verwaltung dieses Prozesses:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

async function checkForUpdates() {
  const update = await CapacitorUpdater.checkForUpdate();
  if (update.available) {
    await CapacitorUpdater.download();
  }
}
```

> "Wir praktizieren agile Entwicklung und @Capgo ist mission-kritisch bei der kontinuierlichen Auslieferung an unsere Nutzer!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Sie können auch eine benutzerfreundliche Update-Benachrichtigung hinzufügen, wie diese:

```typescript
async function UpdateNotification() {
  const update = await CapacitorUpdater.checkForUpdate();
  return update.available ? (
    <div>Neues Update verfügbar!</div

Ein herausragendes Tool in diesem Bereich ist Capgo, das speziell für [Capacitor Apps](https://capgo.app/blog/capacitor-comprehensive-guide/) entwickelte Funktionen bietet.

### [Capgo](https://capgo.app/) Versionskontroll-Funktionen

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-26.jpg?auto=compress)

Capgo bietet robuste Versionsverwaltungsfunktionen, darunter:

-   **23,5 Mio. erfolgreich durchgeführte Updates**
-   **95% der Nutzer innerhalb von 24 Stunden aktualisiert**
-   **82% globale Erfolgsrate**
-   **434ms durchschnittliche API-Antwortzeit weltweit**

> "Wir testen derzeit @Capgo, da Appcenter die Live-Update-Unterstützung für Hybrid-Apps eingestellt hat und @AppFlow viel zu teuer ist." - Simon Flack [\[1\]](https://capgo.app/)

### Teamgrößen-Lösungen

Capgo bietet flexible Pläne für Teams aller Größen und macht die Versionsverwaltung skalierbar und effizient.

| Teamgröße | Plan | Hauptfunktionen |
| --- | --- | --- |
| Einzelentwickler | Basic Cloud-Hosting | Live-Updates, 1.000 MAU |
| Kleines Team (2-5) | Maker-Plan | 10.000 MAU, 500GB Bandbreite |
| Mittleres Team (6-20) | Team-Plan | 100.000 MAU, Berechtigungen |
| Enterprise | Individuelles PAYG | Unbegrenzte MAU, dedizierter Support |

> "Wir praktizieren agile Entwicklung und @Capgo ist mission-kritisch für die kontinuierliche Auslieferung an unsere Nutzer!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Capgo enthält auch ein Analytics-Dashboard zur Überwachung der Versions-Adoptionsraten und frühzeitigen Erkennung potenzieller Probleme. Mit integrierter Verschlüsselung und anpassbaren Hosting-Optionen können Teams die Sicherheit beim Skalieren ihrer Deployment-Workflows gewährleisten.

## Fazit

Das Verständnis von Version-Tagging ist der Schlüssel zur Vereinfachung von Entwicklungs- und Deployment-Prozessen. Hier ist eine kurze Zusammenfassung der wichtigsten Ideen und Schritte zum Einstieg.

### Wichtige Erkenntnisse

Version-Tagging hilft Entwicklern, reibungslose und zuverlässige Updates zu gewährleisten. Richtige Versionskontrolle bietet klare Vorteile:

| Vorteil | Auswirkung | Ergebnis |
| --- | --- | --- |
| Sofortige Updates | Kürzere Überprüfungszeiten | Schnellere Nutzerakzeptanz [\[1\]](https://capgo.app/) |
| Versionskontrolle | Besseres Code-Management | Höhere Erfolgsraten [\[1\]](https://capgo.app/) |
| Update-Tracking | Echtzeit-Überwachung | Schnellere Problembehebung [\[1\]](https://capgo.app/) |
| Verteilungskontrolle | Gezielte Rollouts | Multi-Plattform-Unterstützung |

Diese Ergebnisse unterstreichen die Bedeutung effektiver Versionsverwaltungstools.

### Erste Schritte

Um diese Vorteile in die Praxis umzusetzen, folgen Sie diesen Schritten:

-   **Versions-Tracking einrichten**: Verwenden Sie semantische Versionierung in Ihrer `package.json`-Datei und integrieren Sie notwendige Plugins.
-   **Update-Prüfungen hinzufügen**: Implementieren Sie Systeme zur Überprüfung und Verfolgung von Versionsupdates.
-   **Verteilungskanäle konfigurieren**: Erstellen Sie separate Umgebungen für Produktion, Beta und Entwicklung.

Erwägen Sie abschließend die Einführung eines Live-Update-Systems, um schnelle und sichere Deployments zu gewährleisten.
