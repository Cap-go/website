---
title: "Breaking Changes"
description: "Wie man Breaking Changes mit versionierten Kanälen handhabt"
sidebar:
  order: 6
locale: de
---

Diese Dokumentation erklärt, wie Sie Breaking Changes in Ihrer App mithilfe von versionierten Kanälen handhaben. Dieser Ansatz ermöglicht es Ihnen, verschiedene Versionen Ihrer App zu pflegen und gleichzeitig sicherzustellen, dass Benutzer kompatible Updates erhalten.

## Beispielszenario

Angenommen, Sie haben:
- App-Version 1.2.3 (alte Version) - verwendet Produktionskanal
- App-Version 2.0.0 (neue Version mit Breaking Changes) - verwendet v2-Kanal
- Live-Update 1.2.4 (kompatibel mit 1.2.3)
- Live-Update 2.0.1 (kompatibel mit 2.0.0)

## Strategie: Immer defaultChannel für Major-Versionen verwenden

**Empfohlener Ansatz:** Legen Sie einen `defaultChannel` für jede Major-Version fest. Dies stellt sicher, dass Sie Updates immer an bestimmte Benutzergruppen pushen können, ohne auf dynamische Kanalzuweisung angewiesen zu sein.

```ts
// Version 1.x Releases
defaultChannel: 'v1'

// Version 2.x Releases
defaultChannel: 'v2'

// Version 3.x Releases (zukünftig)
defaultChannel: 'v3'
```

:::tip
**Vorteile dieses Ansatzes:**
- **Immer Kontrolle** darüber, welche Benutzer Updates erhalten
- **Keine dynamische Kanalumschaltung** im App-Code erforderlich
- **Klare Trennung** zwischen verschiedenen App-Versionen
- **Flexibilität**, Updates an jede spezifische Versionsgruppe zu pushen
:::

## 1. Kanal für neue Version erstellen

```bash
# Kanal für Version 2.x erstellen
npx @capgo/cli channel create v2
```

## 2. Capacitor-Konfiguration für Version 2.0.0 aktualisieren

Aktualisieren Sie Ihre Capacitor-Konfiguration, bevor Sie Version 2.0.0 für den App Store erstellen:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... weitere Optionen
      defaultChannel: 'v2' // Alle 2.0.0-Benutzer verwenden v2-Kanal
    }
  }
};

export default config;
```

:::note
**Für Version 1.x:** Wenn Sie anfangs keinen `defaultChannel` festgelegt haben, sind Version 1.x-Benutzer auf dem `production`-Kanal. Für zukünftige Major-Versionen legen Sie immer einen spezifischen Kanal wie `v3`, `v4` usw. fest.
:::

## 3. Separate Code-Branches verwalten

Erstellen Sie separate Git-Branches, um die Kompatibilität zwischen App-Versionen zu gewährleisten:

```bash
# Branch für Version 1.x-Updates erstellen und pflegen
git checkout -b v1-maintenance
git push origin v1-maintenance

# Ihr Main-Branch setzt Entwicklung von Version 2.x fort
git checkout main
```

:::warning
**Kritisch:** Pushen Sie niemals JavaScript-Bundles an ältere Apps, die nativen Code/APIs erwarten, die sie nicht haben. Erstellen Sie Updates immer vom entsprechenden Branch:
- **v1-maintenance Branch**: Für Updates an 1.x Apps (Produktionskanal)
- **main Branch**: Für Updates an 2.x Apps (v2-Kanal)
:::

## 4. Bundles an entsprechende Kanäle hochladen

```bash
# Für 1.x Updates: Vom v1-maintenance Branch erstellen
git checkout v1-maintenance
# Nehmen Sie hier Ihre 1.x-kompatiblen Änderungen vor
npx @capgo/cli bundle upload --channel production

# Für 2.x Updates: Vom Main-Branch erstellen
git checkout main
# Nehmen Sie hier Ihre 2.x-Änderungen vor
npx @capgo/cli bundle upload --channel v2
```

## 5. Selbstzuweisung aktivieren

```bash
# Apps erlauben, sich selbst dem v2-Kanal zuzuweisen
npx @capgo/cli channel set v2 --self-assign
```

## 6. Im App Store bereitstellen

Erstellen und stellen Sie Version 2.0.0 im App Store bereit. Alle Benutzer, die diese Version herunterladen (ob neue Benutzer oder bestehende Benutzer, die aktualisieren), werden automatisch den v2-Kanal verwenden, da dies im App-Bundle konfiguriert ist.

:::note
**Keine Code-Änderungen erforderlich!** Da `defaultChannel: 'v2'` mit der App Store-Version gebündelt ist, verwenden alle Benutzer, die Version 2.0.0 herunterladen, automatisch den richtigen Kanal.
:::

## Skalierung auf zukünftige Versionen

Wenn Sie Version 3.0.0 mit weiteren Breaking Changes veröffentlichen:

```bash
# Kanal für Version 3.x erstellen
npx @capgo/cli channel create v3
```

```ts
// capacitor.config.ts für Version 3.0.0
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // Version 3.x-Benutzer
    }
  }
};
```

Jetzt können Sie Updates an jede Version pushen:
- `production` Kanal → Version 1.x-Benutzer
- `v2` Kanal → Version 2.x-Benutzer
- `v3` Kanal → Version 3.x-Benutzer

## 7. Bereinigung (Nach Migration)

Sobald alle Benutzer auf Version 2.x migriert sind (rechnen Sie mit 3-4 Monaten):

1. Entfernen Sie `defaultChannel` aus Ihrer Capacitor-Konfiguration
2. Löschen Sie den v2-Kanal:

```bash
npx @capgo/cli channel delete v2
```

3. Löschen Sie den v1-maintenance Branch:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip
Dieser Ansatz stellt sicher, dass Benutzer nur Updates erhalten, die mit ihrer App-Version kompatibel sind
:::

:::warning
Testen Sie Updates in jedem Kanal gründlich vor der Bereitstellung
:::

:::note
Sie können den v2-Kanal in Capgo sicher löschen, auch wenn einige Benutzer noch die Kanalüberschreibung haben. Sie erhalten stattdessen automatisch Updates vom Produktionskanal.
:::

## Version 1.x-Updates pflegen

Um Updates zu senden, die mit Version 1.x kompatibel sind:

1. Zum v1-maintenance Branch wechseln:
```bash
git checkout v1-maintenance
```

2. Ihre Änderungen vornehmen und committen:
```bash
# 1.x-kompatible Änderungen vornehmen
git add .
git commit -m "Fix for v1.x"
git push origin v1-maintenance
```

3. Zum Produktionskanal erstellen und hochladen:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Halten Sie Ihren v1-maintenance Branch mit Bugfixes auf dem neuesten Stand, die mit Version 1.x kompatibel sind, aber mergen Sie niemals Breaking Changes vom Main-Branch
:::
