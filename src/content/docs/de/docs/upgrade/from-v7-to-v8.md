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

## iOS-Mindestversionsanforderung

Das iOS-Mindest-Deployment-Ziel wurde auf **15.5** erhöht, um sicherzustellen, dass iOS-Geräte mit [CVE-2022-36943](https://nvd.nist.gov/vuln/detail/CVE-2022-36943) ausgeschlossen werden. Dies ist die Mindestversion der iOS-Zip-Bibliothek, die den Sicherheits-Fix implementiert hat.

### Swift Package Manager (SPM) Workaround

Capacitor hat derzeit einen Bug ([ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556)), der es nicht ermöglicht, das iOS-Deployment-Ziel auf 15.5 zu setzen, wenn SPM verwendet wird.

Wenn Sie SPM-Unterstützung benötigen, können Sie vorübergehend unseren Fork verwenden:

**GitHub:** [https://github.com/Cap-go/capacitor-plus](https://github.com/Cap-go/capacitor-plus)

Um ihn zu verwenden, ersetzen Sie das CLI-Paket `@capacitor/cli` durch `@capacitor-plus/cli`:

```bash
npm uninstall @capacitor/cli
npm install @capacitor-plus/cli
```

Verwenden Sie dann das CLI wie gewohnt:

```bash
npx capacitor sync
```

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

- [ ] Dem v8-[Migrations-Leitfaden](https://capacitorjs.com/docs/updating/8-0) von Capacitor folgen, auf Breaking Changes prüfen
- [ ] iOS-Mindest-Deployment-Ziel auf 15.5 erhöhen (erforderlich für CVE-2022-36943-Fix)
- [ ] Bei SPM-Nutzung vorübergehend auf [@capacitor-plus/cli](https://github.com/Cap-go/capacitor-plus) wechseln, bis [ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556) behoben ist
- [ ] @capgo/capacitor-updater auf ^8.0.0 aktualisieren
- [ ] `npx cap sync` ausführen
- [ ] Ihre App gründlich auf iOS und Android testen

## Benötigen Sie Hilfe?

Wenn Sie während der Migration auf Probleme stoßen, bitte:

1. Schauen Sie in unsere [Dokumentation](/docs/live-updates/)
2. Besuchen Sie unsere [Discord-Community](https://discord.com/invite/VnYRvBfgA6)
3. Öffnen Sie ein Issue auf [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
