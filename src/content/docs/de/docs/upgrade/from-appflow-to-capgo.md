---
title: Migration von AppFlow zu Capgo
description: Vollständiger Leitfaden zur Migration Ihrer App von Ionic AppFlow zu Capgo
sidebar:
  order: 7
---

## Warum zu Capgo migrieren?

Mit der Ankündigung der Einstellung von Ionic AppFlow bietet die Migration zu Capgo einen nahtlosen Übergang für Ihren Mobile-App-Entwicklungsworkflow. Capgo bietet verbesserte Funktionen, bessere Leistung und erhebliche Kosteneinsparungen bei Beibehaltung aller wichtigen Funktionalitäten.

### Hauptvorteile
- Schnellere Update-Bereitstellung (< 1 Minute vs. 10 Minuten)
- Günstigere Preisgestaltung (14$/Monat vs. 499$/Monat)
- Ende-zu-Ende-Verschlüsselung in allen Plänen enthalten
- Verbesserte Kontrolle über Update-Kanäle
- Umfassende CI/CD-Integrationsoptionen

## Migrationsschritte

### 1. Live-Updates Migration

#### Vorherige Abhängigkeiten entfernen
```bash
npm uninstall @ionic/appflow
```

#### Capgo installieren
```bash
npm install @capgo/capacitor-updater
npx cap sync
```

#### Konfiguration aktualisieren
Fügen Sie die Capgo-Konfiguration zu Ihrer `capacitor.config.json` hinzu:
```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true
    }
  }
}
```

### 2. CI/CD Migration

Capgo bietet flexible CI/CD-Optionen:

#### Option 1: Bestehende CI/CD verwenden
Folgen Sie unseren detaillierten Tutorials zur Einrichtung von CI/CD mit beliebten Plattformen:
- [iOS Build-Einrichtung](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/)
- [Android Build-Einrichtung](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)
- [GitHub Actions Integration](https://capgo.app/blog/github-action-capacitor/)

#### Option 2: CI/CD als Service
Lassen Sie uns Ihre CI/CD-Einrichtung mit unserem [verwalteten Service](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you) übernehmen.

### 3. Kanal-Einrichtung

1. Kanäle im Capgo-Dashboard erstellen:
```bash
npx @capgo/cli channel create production
npx @capgo/cli channel create staging
```

2. Kanal-Einstellungen konfigurieren:
```bash
# Produktionskanal einrichten
npx @capgo/cli channel update production --no-downgrade --no-upgrade

# Staging-Kanal einrichten
npx @capgo/cli channel update staging
```

### 4. Migration testen

1. **Live-Updates testen**
```bash
# Test-Bundle erstellen und hochladen
npx @capgo/cli bundle create --channel staging
```

2. **Update-Empfang überprüfen**
- App auf Testgerät installieren
- Überprüfen, ob Updates korrekt empfangen werden
- Update-Installationsprozess verifizieren
- Wiederherstellungsfunktion testen

## Fehlerbehebung

### Häufige Probleme

#### Updates werden nicht empfangen
- Kanal-Konfiguration überprüfen
- Geräte-Logs überprüfen
- Netzwerkverbindung sicherstellen
- Bundle-Versionsformat validieren

## Nächste Schritte

1. [Capgo-Konto erstellen](/register/)
2. [Schnellstart-Anleitung](/docs/getting-started/quickstart/) befolgen
3. [CI/CD-Integration](/docs/getting-started/cicd-integration/) einrichten
4. [Live-Updates](/docs/live-updates/) konfigurieren

Für Unternehmensteams, die während der Migration dedizierten Support benötigen, [vereinbaren Sie einen Termin mit unserem Team](https://cal.com/martindonadieu/capgo-enterprise-inquiry).
