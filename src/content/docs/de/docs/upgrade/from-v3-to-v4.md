---
title: V3 から V4 へ
description: So aktualisieren Sie von V3 auf V4
sidebar:
  order: 3
locale: de
---

## Warum dieses Upgrade

Nach vielen Gesprächen mit Ihnen in der Discord-Community habe ich festgestellt, dass der manuelle Modus zu manuell und nicht sicher in der Verwendung war. Zum Beispiel war ein automatisches Zurücksetzen nicht möglich, sodass der Benutzer bei einem fehlgeschlagenen Update die App entfernen und neu installieren musste, was eine schreckliche Benutzererfahrung ist.

Währenddessen nutzte ich dies als Gelegenheit, Ihnen mehr Freiheit zu geben und den schlechten Code zu entfernen, den ich geschrieben hatte.

## Installation

`npm i @capgo/capacitor-updater@4`

## Auto-Update Cloud

Wenn Sie das Basis-Beispiel in Ihrer App verwenden, können Sie sicher auf die neue Version migrieren. Viel Spaß!

## Auto-Update Self-Hosted

Für Sie ist es weiterhin einfach, die Änderungen sind:

* Der Name der Einstellung von `autoUpdateUrl` zu `updateUrl`
* Die Endpoint-Methode wurde von `GET` zu `POST` geändert

## Manuelle Benutzer

Für Sie ist dies die bedeutendste Änderung, aber zum Besten! Sie erhalten zahlreiche Verbesserungen. Lesen Sie sorgfältig

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

* Umbenennung irreführender Namen (selbst zur Erklärung kann es nicht klar sein, aber bei der Verwendung ist der neue leicht zu verstehen):
  * was als `version` bezeichnet wurde, bezieht sich jetzt auf ein `bundle`
  * `id` bezieht sich auf die alte `version`, die eine zufällige Zeichenfolge von 10 Zeichen war, diese `id` ist die einzige vertrauenswürdige und eindeutige Möglichkeit, auf Ihre Bundles zuzugreifen, Beispiel `7Dfcd2RedN`
  * `version` bezieht sich jetzt auf den `versionName`, den Sie für ein Bundle wählen, Beispiel `100`
* `updateUrl` wechselt von `get` zu `post`, da benutzerdefinierte Header für einige von Ihnen ein Problem waren und post logischer ist, alle vorherigen Header gehen in den Body und das Präfix `cap_` verschwindet
* `versionName`-Methode wird gelöscht, zugunsten von `getId`
* list gibt jetzt eine Liste von `BundleInfo` zurück
* Umbenennung von `getId` in `getDeviceId`
* `autoUpdate` wird standardmäßig auf true gesetzt, wenn Sie den manuellen Modus verwenden, setzen Sie es auf false

## Neuigkeiten

* Methode `getLatest`, diese Methode ermöglicht es Ihnen, von Ihrem Server, der mit `updateUrl` eingestellt wurde, die letzte verfügbare Version zu erhalten
* Methode `setDelay`, die `{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}` als Argument nimmt, um Verzögerungen für verschiedene Modi einzustellen
* Methode `next`, um die Version im nächsten Hintergrund festzulegen, im Gegensatz zu `set`, das es sofort macht
* Methode `isAutoUpdateEnabled`, um Sie wissen zu lassen, ob Sie sich im Auto-Update-Kontext befinden
* Event `downloadComplete`, wenn der Download 100% erreicht
* Hinzugefügtes Pflichtfeld `version` in der Download-Methode
* `notifyAppReady` wird auch im manuellen Modus obligatorisch, wenn nicht nach 10 Sekunden aufgerufen, kehrt die App zur vorherigen Version zurück

## Mitwirkende

[@lincolnthree](https://githubcom/lincolnthree/) Vielen Dank, dass Sie diese Arbeit begonnen haben, es war unmöglich, dieses Update ohne Sie zum Laufen zu bringen