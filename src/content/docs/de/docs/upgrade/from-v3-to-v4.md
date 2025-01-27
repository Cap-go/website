---
title: Von V3 zu V4
description: Wie man von V3 auf V4 aktualisiert
sidebar:
  order: 3
locale: de
---

## Warum dieses Upgrade

Nach vielen Gesprächen in der Discord-Community mit euch habe ich entdeckt, dass der manuelle Modus viel zu manuell und nicht sicher zu verwenden war. Zum Beispiel war ein automatisches Zurücksetzen nicht möglich, sodass der Benutzer, wenn das Update im manuellen Modus fehlschlägt, die App entfernen und erneut installieren muss, was eine schreckliche Benutzererfahrung ist.

In der Zwischenzeit habe ich dies als Gelegenheit genutzt, euch mehr Freiheit zu geben und allen schlechten Code zu entfernen, den ich gemacht habe.

## Installation

`npm i @capgo/capacitor-updater@4`

## Automatisches Update in der Cloud

Wenn du das Basisbeispiel in deiner App verwendest, bist du sicher, auf die neue Version umzusteigen, viel Spaß!

## Automatisches Update selbst gehostet

Für dich bleibt es einfach, die Änderungen sind:

1. Der Name der Einstellung von `autoUpdateUrl` in `updateUrl`
2. Die Endpoint-Methode wurde von `GET` auf POST geändert

## Manuelle Benutzer

Für dich ist dies die bedeutendste Änderung, aber zum Besten! Du erhältst tonnenweise Verbesserungen. Lies sorgfältig.

## Änderungen

1. `autoUpdateUrl` wird zu `updateUrl`, da diese Einstellung jetzt auch im manuellen Modus verwendet werden kann
2. Löschen von `cancelDelay` und `delayUpdate` zugunsten von `setDelay`
3. Kein `versionName` mehr in set
4. Ändere den `version`-Schlüssel, der in den meisten Funktionen an das Objekt `BundleInfo` zurückgegeben wurde

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

5. Umbenennung von irreführenden Namen jetzt (sogar um es zu erklären, kann es nicht klar sein, aber bei der Verwendung ist es einfach zu verstehen):
   1. Was als `version` bezeichnet wurde, bezieht sich jetzt auf ein `bundle`
   2. `id` bezieht sich auf die alte `version`, die eine zufällige Zeichenfolge von 10 Zeichen war. Diese `id` ist der einzige vertrauenswürdige und eindeutige Weg, um auf deine Bundles zuzugreifen, Beispiel `7Dfcd2RedN`
   3. `version` bezieht sich jetzt auf den `versionName`, den du für ein Bundle auswählst, Beispiel `100`
6. `updateUrl` wechselt von `get` zu `post`, da benutzerdefinierte Header für einige von euch ein Problem darstellt und POST logischer ist. Alle vorherigen Header gehen in den Body, und das Präfix `cap_` entfällt.
7. Die Methode `versionName` wurde gelöscht, zugunsten von `getId`
8. Die Liste gibt jetzt eine Liste von `BundleInfo` zurück
9. Umbenennen von `getId` in `getDeviceId`
10. `autoUpdate` wird standardmäßig auf true gesetzt. Wenn du den manuellen Modus verwendest, setze ihn auf false.

## Neuigkeiten

1. Methode `getLatest`, diese Methode ermöglicht es dir, von deinem Server, der mit `updateUrl` gesetzt ist, die letzte verfügbare Version abzurufen
2. Methode `setDelay`, die `{`kind`:` "background" | "kill" | "nativeVersion" | "date", value? : string`}` als Argument annimmt, um Verzögerungen für verschiedene Modi einzustellen
3. Methode `next`, um die Version im nächsten Hintergrundmodus festzulegen, im Gegensatz zu `set`, das es sofort macht
4. Methode `isAutoUpdateEnabled`, um dir mitzuteilen, ob du dich im automatischen Update-Kontext befindest
5. Ereignis `downloadComplete`, wenn der Download 100 % erreicht
6. Hinzufügen des Pflichtfelds `version` in der Download-Methode
7. `notifyAppReady` wird auch im manuellen Modus obligatorisch. Wenn nicht innerhalb von 10 Sekunden aufgerufen, kehrt die App zur vorherigen Version zurück.

## Mitwirkende

[@lincolnthree](https://githubcom/lincolnthree/) Vielen Dank, dass du diese Arbeit begonnen hast. Es war unmöglich, dieses Update ohne dich zum Laufen zu bringen.