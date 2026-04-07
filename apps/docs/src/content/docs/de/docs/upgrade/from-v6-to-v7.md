---
title: "Von V6 zu V7"
locale: de
description: "Eine detaillierte Anleitung zum Übergang von Version 6 zu Version 7 des Capgo Updaters, in der die notwendigen Schritte und Überlegungen für einen erfolgreichen Upgrade-Prozess dargelegt werden, um die Kompatibilität mit den neuesten Capacitor-Funktionen und -Verbesserungen sicherzustellen."
sidebar:
  order: 2
---

## Warum dieses Upgrade

Diese Hauptversion folgt der Capacitor-Hauptversion

Folgen Sie zunächst dem Migrationsleitfaden von Capacitor:

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Installation

`npm i @capgo/capacitor-updater@7`

`Dann das Update des nativen Codes synchronisieren:`

`npx cap sync`

Das war's! Ziemlich einfach!

## Verschlüsselungsmigration

Wenn Sie die `key-v1`-Verschlüsselungsmethode verwenden, müssen Sie zum neuen Verschlüsselungssystem migrieren, da `key-v1` in V7 nicht mehr unterstützt wird. [[memory:96112]]

Folgen Sie dem Leitfaden zur Verschlüsselungsmigration hier: [Leitfaden zur Verschlüsselungsmigration](/docs/cli/migrations/encryption/)

## Konfigurationsänderungen

Wir empfehlen, die folgenden Eigenschaften in Ihrer `capacitor.config`-Datei hinzuzufügen:
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

Diese Einstellungen sollten helfen, das Plugin und sein Verhalten besser zu verwalten.

