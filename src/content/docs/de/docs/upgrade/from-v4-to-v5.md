---
title: Von V4 zu V5
description: Wie man von V4 auf V5 aktualisiert
sidebar:
  order: 2
locale: de
---

## Warum dieses Upgrade

Diese Hauptversion ist hier, um der Hauptversion von Capacitor zu folgen.

Zuerst folge dem Migrationshandbuch von Capacitor:

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## Installation

`npm i @capgo/capacitor-updater@5`

`Dann synchronisiere das Update des nativen Codes:`

`npx cap sync`

Das war's! Ganz einfach!

## Manueller Modus

Wenn du dir das Update mit getLatest geholt hast, gibt es eine kleine Änderung.  
Jetzt, wenn du bereits auf dem neuesten Stand bist, wird es in den Catch gehen.  
Alle Antworten, die anders als "Update verfügbar" sind, werden das tun.