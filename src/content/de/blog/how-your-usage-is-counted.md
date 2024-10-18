---
slug: how-your-usage-is-counted
title: Wie deine Nutzung in Capgo gezählt wird
description: >-
  Verstehen Sie, wie Capgo Ihre Nutzung zählt, und nutzen Sie es optimal. Lernen
  Sie, Ihren Plan besser zu verwalten
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Capgo-Nutzungssystem erklärt
tag: Solution
published: true
locale: de
next_blog: ''
---

In Capgo werden 3 Werte gezählt und sind wichtig zu verstehen:
- Benutzer
- Speicher
- Bandbreite

Jeder davon wird leicht unterschiedlich gezählt.

## Benutzer

Jedes Mal, wenn ein Benutzer Ihre Capacitor JS App herunterlädt und öffnet, sendet sie eine Anfrage an das Capgo-Backend, um zu erfahren, ob ein Update verfügbar ist.
Dabei sendet die App wenige Informationen, einschließlich der wichtigsten: `DeviceID`

`DeviceID`: Eine eindeutige ID (UUID), die vom Betriebssystem des Geräts definiert wird. Diese ID ist einzigartig pro App-Installation.

Jedes Mal, wenn Ihr Konto eine neue Device ID erhält, wird sie in der Datenbank gespeichert.
Jedes Mal, wenn eine alte `DeviceID` ein Update anfordert (App-Öffnung), wird ihr Datensatz aktualisiert (updated_at in der Datenbank).

Diese Daten werden an 2 Stellen gespeichert:
- Gerätetabelle mit `update_at` Wert
- app_stats mit täglichem Zähler, der die Anzahl der Geräte angibt, die heute aktiv wurden und in diesem Monat noch nicht aktiv waren

Für Planlimits wird die erste Methode verwendet, da sie 100% zuverlässig ist. Für die Diagrammanzeige wird die zweite Methode verwendet.
Sie können beides in Ihrem Konto auf der Startseite sehen:
- im Diagramm ist die zweite Methode
- in der Tabelle der Apps ist die erste Methode

> Capgo zählt Emulatoren und Entwicklungs-Builds nicht in Ihrer Nutzung. Beachten Sie, dass Sie nach der Testphase nicht mehr als 3% davon haben können, sonst wird Ihr Konto gesperrt, bis Sie es beheben.

> Capgo führt auch einige Filterungen für Sie durch. Wenn Sie CI/CD konfiguriert haben, um Ihre Version an Google PLAY zu senden, führt Google Ihre Capacitor-App jedes Mal auf über 20 echten Geräten aus. Während der ersten 4 Stunden eines neuen Bundles blockieren wir Google-Rechenzentrum-IPs, um zu verhindern, dass sie gezählt werden.

Jeden Monat beginnen diese Daten bei Null.

- Erstellen oder Aktualisieren eines Geräts in meiner Datenbank bei jeder Geräteanfrage
- Hinzufügen zum täglichen Zähler die Anzahl der aktiven Geräte, die in diesem Monat noch nicht aktiv waren

Die erste Methode ergibt: 900+ Benutzer
während die zweite bei 200+ Benutzern in Ihrem Konto liegt
Für Planlimits verwende ich die erste Methode, die 100% zuverlässig ist, und zur Anzeige des Diagramms verwende ich die zweite
Sie können beides auf der Startseite Ihres Kontos sehen

## Speicher

Jedes Mal, wenn Sie ein Bundle hochladen, wird diese Zahl um die Größe des Uploads erhöht

Diese Daten beziehen sich nur auf Ihre Upload-Größe. Je besser Ihre App-Größe ist, desto besser bleiben Sie in Ihrem Plan

Wenn Sie das Limit erreichen oder sich ihm nähern, können Sie Ihre Bundles mit der CLI auflisten:
`npx @capgo/cli@latest bundle list`
Um zu sehen, was Sie bereinigen könnten. Das Entfernen eines Bundles gibt den Speicher frei, löscht aber nicht die Statistiken

Wenn Sie bereit zur Bereinigung sind, verwenden Sie diesen Befehl, um mehrere Bundles zu entfernen:
`npx @capgo/cli@latest bundle cleanup`

PS: Das ist gut für den Planeten, aber auch für Ihr Portemonnaie 💪

> Sie können auch die Option `--external` beim Upload verwenden, um Ihren eigenen Speicher zu nutzen und nicht in Ihrem Plan zu zählen

## Bandbreite

Die Berechnung dieses Wertes ist etwas komplexer, aber die Idee ist die gleiche wie beim Speicher

Jedes Mal, wenn ein Benutzer ein Bundle herunterlädt, wird diese Zahl um die Größe des Downloads erhöht

Diese Daten beziehen sich nur auf Ihre Download-Größe. Je besser Ihre Capacitor JS App-Größe ist, desto besser bleiben Sie in Ihrem Plan

> Ein wichtiger Punkt: Capgo kann nicht sehen, welche Größe heruntergeladen wird, es sieht nur die Größe des Bundles. Wenn Sie also ein großes Bundle haben und viele Benutzer es nicht erfolgreich herunterladen können, erreichen Sie schnell das Limit

Der beste Weg, in Ihrem Plan zu bleiben, ist ein kleines Bundle zu haben. Wenn das nicht möglich ist, zeigen Sie Ihren Benutzern einen Download-Balken und lassen Sie sie wissen, wie viel noch heruntergeladen werden muss

In Zukunft wird Capgo das Download-System verbessern, um mehr Chancen zu haben, das Bundle in einem Durchgang herunterzuladen