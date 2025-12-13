---
title: "Von V7 zu V8"
locale: de
description: "Eine detaillierte Anleitung zum Übergang von Version 7 zu Version 8 des Capgo-Updaters, mit den notwendigen Schritten und Überlegungen für einen erfolgreichen Upgrade-Prozess, der die Kompatibilität mit Capacitor 8-Features und -Verbesserungen gewährleistet."
sidebar:
  order: 0
---

## Warum dieses Upgrade

Diese Hauptversion folgt der Hauptversion 8 von Capacitor

Folgen Sie zuerst dem Migrations-Leitfaden von Capacitor:

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## Installation

`npm i @capgo/capacitor-updater@8`

Synchronisieren Sie dann das native Code-Update:

`npx cap sync`

Das war's! Ganz einfach!

## Was ist neu in V8

Version 8 von capacitor-updater bietet vollständige Kompatibilität mit Capacitor 8 und stellt sicher, dass Ihre App die neuesten mobilen OS-Features und -Verbesserungen nutzen kann.

### Wichtige Updates

- **Capacitor 8 Kompatibilität**: Vollständige Unterstützung für die erweiterten nativen Funktionen von Capacitor 8
- **Leistungsverbesserungen**: Optimierter Update-Bereitstellungs- und Installationsprozess
- **Verbesserte Stabilität**: Fehlerbehebungen und Stabilitätsverbesserungen seit v7
- **Beibehaltene API-Kompatibilität**: Keine Breaking Changes an der Plugin-API seit v7

## Konfiguration

Die Konfiguration bleibt dieselbe wie bei v7. Ihre bestehenden `capacitor.config`-Einstellungen funktionieren weiterhin:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... weitere Einstellungen
    }
  }
}
```

## Migrations-Checkliste

- [ ] @capacitor/core auf ^8.0.0 aktualisieren
- [ ] @capacitor/android auf ^8.0.0 aktualisieren
- [ ] @capacitor/ios auf ^8.0.0 aktualisieren
- [ ] Dem v8-Migrations-Leitfaden von Capacitor folgen
- [ ] @capgo/capacitor-updater auf ^8.0.0 aktualisieren
- [ ] `npx cap sync` ausführen
- [ ] Ihre App gründlich auf iOS und Android testen

## Benötigen Sie Hilfe?

Wenn Sie während der Migration auf Probleme stoßen, bitte:

1. Schauen Sie in unsere [Dokumentation](/docs/live-updates/)
2. Besuchen Sie unsere [Discord-Community](https://discord.com/invite/VnYRvBfgA6)
3. Öffnen Sie ein Issue auf [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
