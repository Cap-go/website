---
slug: how-your-usage-is-counted
title: Wie Ihre Nutzung in Capgo gezählt wird
description: >-
  Verstehen Sie, wie Capgo Ihre Nutzung zählt, und nutzen Sie es bestmöglich.
  Lernen Sie, Ihren Plan besser zu verwalten.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /usage_explained.webp
head_image_alt: Capgo-Nutzungssystem erklärt
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: de
next_blog: ''
---
In Capgo werden 3 Werte erfasst, die wichtig zu verstehen sind:
- Benutzer
- Speicher
- Bandbreite

Jeder dieser Werte wird auf leicht unterschiedliche Weise erfasst.

## Benutzer

Jedes Mal, wenn ein Benutzer Ihre Capacitor JS-App herunterlädt und öffnet, sendet sie eine Anfrage an das Capgo-Backend, um zu erfahren, ob ein Update verfügbar ist.
Wenn die App das tut, sendet sie einige Informationen, wobei die wichtigste die `DeviceID` ist.

`DeviceID`: ist eine eindeutige ID (UUID), die auf dem Gerät generiert wird. **Ab Plugin-Version v6.25.0 und v7.25.0** bleibt diese ID nun über App-Neuinstallationen hinweg erhalten (sicher im Gerätespeicher gespeichert). Vor diesen Versionen wurde die ID bei jeder App-Installation zurückgesetzt.

Jedes Mal, wenn Ihr Konto eine neue Device ID erhält, wird sie in der Datenbank gespeichert.
Jedes Mal, wenn eine alte `DeviceID` ein Update anfordert (App-Öffnung), wird ihr Datensatz aktualisiert (updated_at in der Datenbank).

Diese Daten werden an 2 Orten gespeichert:
- Geräte-Tabelle mit `update_at`-Wert
- app_stats mit einem täglichen Zähler, der die Anzahl der Geräte darstellt, die heute aktiv geworden sind und diesen Monat nicht aktiv waren.

Für das Planlimit wird die erste Methode verwendet, da sie 100% zuverlässig ist, zur Anzeige des Charts wird die zweite Methode verwendet.
Sie können beide in Ihrem Konto auf der Startseite sehen:
- im Diagramm ist die zweite Methode
- in der App-Tabelle ist die erste Methode.

> Capgo zählt Emulatoren und Entwicklungsbuilds nicht in Ihrer Nutzung. Denken Sie daran, dass Sie nach der Testphase nicht mehr als 3% davon haben können, ansonsten wird Ihr Konto gesperrt, bis Sie es beheben.

> Capgo führt auch einige Filterungen für Sie durch. Wenn Sie CI/CD konfiguriert haben, um Ihre Version an Google PLAY zu senden, führt Google Ihre Capacitor-App jedes Mal auf 20+ echten Geräten aus. Während der ersten 4 Stunden eines neuen Bundelets blockieren wir die IP-Adressen des Google-Datencenters, um zu verhindern, dass diese gezählt werden.

Jeden Monat beginnt diese Daten von null.

- Erstellen oder Aktualisieren eines Geräts in meiner Datenbank bei jeder Geräteanforderung
- Hinzufügen zur täglichen Zählung der Anzahl aktiver Geräte, die diesen Monat nicht aktiv waren.

Die erste Methode liefert: 900+ Benutzer
während die zweite mit 200+ Benutzern auf Ihrem Konto ist.
Für das Planlimit benutze ich die erste Methode, die 100% zuverlässig ist, und zur Anzeige des Diagramms verwende ich die zweite.
Sie können beide auf der Startseite Ihres Kontos sehen.

## Speicher

Jedes Mal, wenn Sie ein Bundle hochladen, erhöht sich diese Zahl um die Größe des Uploads.

Diese Daten beziehen sich nur auf Ihre Upload-Größe. Je besser die Größe Ihrer App ist, desto besser bleiben Sie in Ihrem Plan.

Wenn Sie das Limit erreichen oder nahe daran sind, können Sie Ihre Bundles mit der CLI auflisten:
`npx @capgo/cli@latest bundle list`
Um zu sehen, was Sie reinigen könnten. Durch das Entfernen eines Bundles wird der Speicherplatz freigegeben, aber die Statistiken werden nicht gelöscht.

Wenn Sie bereit für die Bereinigung sind, verwenden Sie diesen Befehl, um viele Bundles zu entfernen:
`npx @capgo/cli@latest bundle cleanup`

PS: das ist gut für den Planeten, aber auch für Ihren Geldbeutel 💪.

> Sie können auch den `--external` Upload verwenden, um Ihren Speicher zu nutzen, und dies wird nicht in Ihrem Plan gezählt.

## Bandbreite

Die Berechnung dieses Wertes ist etwas komplexer, aber die Idee ist dieselbe wie beim Speicher.

Jedes Mal, wenn ein Benutzer ein Bundle herunterlädt, erhöht sich diese Zahl um die Größe des Downloads.

Diese Daten beziehen sich nur auf Ihre Download-Größe. Je besser die Größe Ihrer Capacitor JS-App ist, desto besser bleiben Sie in Ihrem Plan.

> Eine wichtige Sache, die zu beachten ist, Capgo kann nicht sehen, welche Größe heruntergeladen wird, es sieht nur die Größe des Bundles. Wenn Sie also ein großes Bundle haben und viele Benutzer es nicht herunterladen können, erreichen Sie schnell das Limit.

Der beste Weg, um in Ihrem Plan zu bleiben, besteht darin, ein kleines Bundle zu haben, und wenn Sie das nicht können, zeigen Sie Ihren Benutzern eine Download-Leiste und lassen Sie sie wissen, wie viel sie noch herunterladen müssen.

In Zukunft wird Capgo das Download-System verbessern, um mehr Chancen zu haben, das Bundle auf einmal herunterzuladen.
