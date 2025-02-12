---
title: Von V3 zu V4
description: So aktualisieren Sie von V3 auf V4
sidebar:
  order: 3
locale: de
---

## Warum dieses Upgrade

Nach vielen Gesprächen mit Ihnen in der Discord-Community habe ich festgestellt, dass der manuelle Modus zu manuell und nicht sicher in der Anwendung war. Zum Beispiel war ein automatisches Zurücksetzen nicht möglich, sodass bei einem fehlgeschlagenen Update der Benutzer die App entfernen und neu installieren musste, was eine sehr schlechte Nutzererfahrung darstellt.

In der Zwischenzeit habe ich dies als Gelegenheit genutzt, Ihnen mehr Freiheit zu geben und den gesamten schlechten Code zu entfernen.

## Installation

`npm i @capgo/capacitor-updater@4`

## Auto-Update Cloud

Wenn Sie das Grundbeispiel in Ihrer App verwenden, können Sie sicher auf die neue Version migrieren. Viel Spaß!

## Auto-Update Self-Hosted

Für Sie ist es weiterhin einfach, die Änderungen sind:

* Der Name der Einstellung von `autoUpdateUrl` zu `updateUrl`
* Die Endpoint-Methode wurde von `GET` zu `POST` geändert

## Manuelle Benutzer

Für Sie ist dies die bedeutendste Änderung, aber zum Besten! Sie erhalten viele Verbesserungen, lesen Sie sorgfältig.

## Änderungen

* `autoUpdateUrl` wird zu `updateUrl`, da diese Einstellung jetzt auch im manuellen Modus verwendet werden kann
* Löschung von `cancelDelay` und `delayUpdate` zugunsten von `setDelay`
* Kein `versionName` mehr in set
* Änderung des `version`-Schlüssels, der in den meisten Funktionen zum Objekt `BundleInfo` zurückgegeben wurde

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* Umbenennung irreführender Namen (auch wenn die Erklärung nicht klar sein kann, ist die Verwendung der neuen Namen einfach zu verstehen):
  * was als `version` bezeichnet wurde, wird jetzt als `bundle` bezeichnet
  * `id` bezieht sich auf die alte `version`, die eine zufällige Zeichenfolge von 10 Zeichen war, diese `id` ist die einzige vertrauenswürdige und eindeutige Möglichkeit, auf Ihre Bundles zuzugreifen, Beispiel `7Dfcd2RedN`
  * `version` bezieht sich jetzt auf den `versionName`, den Sie für ein Bundle wählen, Beispiel `100`
* `updateUrl` wechselt von `get` zu `post`, da benutzerdefinierte Header für einige von Ihnen ein Problem darstellten und post logischer ist, alle vorherigen Header gehen in den Body und das Präfix `cap_` verschwindet
* `versionName`-Methode wird gelöscht, zugunsten von `getId`
* list gibt jetzt eine Liste von `BundleInfo` zurück
* Umbenennung von `getId` in `getDeviceId`
* `autoUpdate` wird standardmäßig auf true gesetzt, wenn Sie den manuellen Modus verwenden, setzen Sie es auf false

## Neuheiten

* Methode `getLatest`, diese Methode ermöglicht es Ihnen, von Ihrem mit `updateUrl` eingestellten Server die letzte verfügbare Version zu erhalten
* Methode `setDelay`, die `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}` als Argument nimmt, um Verzögerungen für verschiedene Modi einzustellen
* Methode `next`, um die Version beim nächsten Hintergrundprozess festzulegen, im Gegensatz zu `set`, das es sofort ausführt
* Methode `isAutoUpdateEnabled`, um zu erfahren, ob Sie sich im Auto-Update-Kontext befinden
* Event `downloadComplete`, wenn der Download 100% erreicht
* Hinzugefügtes Pflichtfeld `version` in der Download-Methode
* `notifyAppReady` wird auch im manuellen Modus obligatorisch, wenn nicht nach 10 Sekunden aufgerufen, kehrt die App zur vorherigen Version zurück

## Mitwirkende

[@lincolnthree](https://githubcom/lincolnthree/) Vielen Dank für den Start dieser Arbeit, es wäre unmöglich gewesen, dieses Update ohne Sie zum Laufen zu bringen