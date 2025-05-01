---
slug: how-your-usage-is-counted
title: Come viene conteggiato il tuo utilizzo in Capgo
description: >-
  Scopri come Capgo conta il tuo utilizzo e come utilizzarlo al meglio. Impara a
  gestire meglio il tuo piano
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: Capgo Nutzungssystem erklärt
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: de
next_blog: ''
---

In Capgo werden 3 Werte gezählt und sind wichtig zu verstehen
- Benutzer
- Speicher
- Bandbreite

Jeder wird auf eine etwas andere Art gezählt


## Benutzer

Jedes Mal, wenn ein Benutzer Ihre Capacitor JS App herunterlädt und öffnet, sendet diese eine Anfrage an das Capgo Backend, um zu prüfen, ob ein Update verfügbar ist
Dabei werden einige Informationen gesendet, einschließlich der wichtigsten Information `DeviceID`

`DeviceID`: ist eine eindeutige ID (UUID), die vom Betriebssystem des Geräts festgelegt wird, diese ID ist einzigartig pro App-Installation

Jedes Mal, wenn Ihr Konto eine neue Device ID erhält, wird diese in der Datenbank gespeichert
Jedes Mal, wenn eine alte `DeviceID` ein Update anfordert (App-Öffnung), wird ihr Eintrag aktualisiert (updated_at in der Datenbank)

Diese Daten werden an 2 Stellen gespeichert:
- Gerätetabelle mit `update_at` Wert
- app_stats mit täglichem Zähler, der die Anzahl der Geräte anzeigt, die heute aktiv wurden und in diesem Monat noch nicht aktiv waren

Für das Plan-Limit wird die erste Methode verwendet, da sie 100% zuverlässig ist, für die Diagrammanzeige wird die zweite verwendet
Sie können beide in Ihrem Konto auf der Startseite sehen:
- im Diagramm ist die zweite Methode
- in der App-Tabelle ist die erste Methode

> Capgo zählt Emulatoren und Entwicklungs-Builds nicht in Ihrer Nutzung mit. Beachten Sie, dass Sie nach der Testphase nicht mehr als 3% davon haben können, sonst wird Ihr Konto gesperrt, bis Sie es beheben

> Capgo führt auch eine Filterung für Sie durch. Wenn Sie CI/CD konfiguriert haben, um Ihre Version an Google PLAY zu senden, führt Google Ihre Capacitor App jedes Mal auf 20+ echten Geräten aus. Während der ersten 4 Stunden eines neuen Bundles blockieren wir Google Rechenzentrum IPs, um zu verhindern, dass diese mitgezählt werden

Jeden Monat beginnen diese Daten bei Null


- Erstellen oder Aktualisieren eines Geräts in meiner Datenbank bei jeder Geräteanfrage
- Zum täglichen Zähler die Anzahl aktiver Geräte hinzufügen, die in diesem Monat noch nicht aktiv waren

Die erste Methode ergibt: 900+ Benutzer
während die zweite bei 200+ Benutzern in Ihrem Konto liegt
Für Plan-Limits verwende ich die erste Methode, die 100% zuverlässig ist, und für die Diagrammanzeige die zweite
Sie können beide auf Ihrer Konto-Startseite sehen

## Speicher

Jedes Mal, wenn Sie ein Bundle hochladen, wird diese Zahl um die Größe des Uploads erhöht

Diese Daten beziehen sich nur auf Ihre Upload-Größe, je besser Ihre App-Größe ist, desto besser bleiben Sie in Ihrem Plan

Wenn Sie das Limit erreichen oder sich ihm nähern, können Sie Ihre Bundles mit der CLI auflisten:
`npx @capgo/cli@latest bundle list`
Um zu sehen, was Sie bereinigen könnten, das Entfernen eines Bundles gibt den Speicher frei, löscht aber nicht die Statistiken

Wenn Sie für die Bereinigung bereit sind, verwenden Sie diesen Befehl, um mehrere Bundles zu entfernen:
`npx @capgo/cli@latest bundle cleanup`

PS: das ist gut für den Planeten, aber auch für Ihr Portemonnaie 💪

> Sie können auch `--external` beim Upload verwenden, um Ihren eigenen Speicher zu nutzen und nicht in Ihrem Plan zu zählen

## Bandbreite

Die Berechnung dieses Wertes ist etwas komplexer, aber die Idee ist die gleiche wie beim Speicher

Jedes Mal, wenn ein Benutzer ein Bundle herunterlädt, wird diese Zahl um die Größe des Downloads erhöht

Diese Daten beziehen sich nur auf Ihre Download-Größe, je besser Ihre Capacitor JS App-Größe ist, desto besser bleiben Sie in Ihrem Plan

> Ein wichtiger Hinweis: Capgo kann nicht sehen, welche Größe heruntergeladen wird, es sieht nur die Größe des Bundles. Wenn Sie also ein großes Bundle haben und viele Benutzer beim Download scheitern, erreichen Sie schnell das Limit

Der beste Weg, in Ihrem Plan zu bleiben, ist ein kleines Bundle zu haben, und wenn das nicht möglich ist, zeigen Sie Ihren Benutzern einen Download-Balken und lassen Sie sie wissen, wie viel noch herunterzuladen ist

In Zukunft wird Capgo das Download-System verbessern, um mehr Chancen zu haben, das Bundle auf einmal herunterzuladen