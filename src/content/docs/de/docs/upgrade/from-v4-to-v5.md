---
title: Von V4 zu V5
description: So aktualisieren Sie von V4 auf V5
sidebar:
  order: 2
locale: de
---

## Warum dieses Upgrade

Diese Major-Version folgt der Capacitor Major-Version

Befolgen Sie zunächst die Migrationsanleitung von Capacitor:

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## Installation

`npm i @capgo/capacitor-updater@5`

`Dann synchronisieren Sie den nativen Code-Update:`

`npx cap sync`

Das war's! Ziemlich einfach!

## Manueller Modus

Wenn Sie selbst das Update mit getLatest geholt haben, gibt es eine kleine Änderung
Wenn Sie bereits auf dem neuesten Stand sind, wird es in den catch-Block gehen
Jede Antwort, die sich von verfügbaren Updates unterscheidet, wird dies tun