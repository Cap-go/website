---
title: Von V4 zu V5
description: Migration von V4 auf V5
sidebar:
  order: 2
locale: de
---

## Warum dieses Upgrade

Diese Hauptversion folgt der Capacitor Hauptversion

Folgen Sie zunächst der Migrationsanleitung von Capacitor:

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## Installation

`npm i @capgo/capacitor-updater@5`

`Dann synchronisieren Sie das native Code-Update:`

`npx cap sync`

Das war's! Ziemlich einfach!

## Manueller Modus

Wenn Sie das Update bisher selbst mit getLatest geholt haben, gibt es eine kleine Änderung
Wenn Sie bereits auf dem neuesten Stand sind, wird es in den catch-Block gehen
Jede Antwort, die nicht "Update verfügbar" lautet, wird dies tun