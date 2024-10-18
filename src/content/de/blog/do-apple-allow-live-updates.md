---
slug: do-apple-allow-live-updates
title: >-
  Erlaubt Apple das Senden von Live-Updates an Apps ohne die Überprüfung durch
  den App Store?
description: >-
  Wie können Sie Code-Aktualisierungen für iOS-Apps in der Produktion
  bereitstellen und dabei vollständig konform mit Apples Richtlinien sein?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Illustration zur Überbrückung des Kondensators
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Hier ist die Übersetzung ins Deutsche:

Die Aktualisierung von Capacitor JS-Apps ohne den App Store-Überprüfungsprozess zu durchlaufen, ist unter bestimmten Bedingungen möglich, die in Apples offiziellen Richtlinien beschrieben sind. Es ist jedoch wichtig zu beachten, dass dies keine Rechtsberatung darstellt. Damit Code-Aktualisierungen direkt in eine App gepusht werden können und mit Apples Richtlinien konform bleiben, müssen folgende Bedingungen erfüllt sein:

- Der Code muss vom eingebauten WebKit-Framework von Apple ausgeführt werden
- Der Code darf keine zusätzlichen Funktionen oder Funktionalitäten bereitstellen, freischalten oder aktivieren
- Der Benutzer darf nicht bemerken, dass eine Aktualisierung stattfindet

Das Capgo Capacitor-Plugin ermöglicht Aktualisierungen und Änderungen an HTML, CSS und JavaScript und erfüllt damit die erste Bedingung.
Die Möglichkeit für Apps, sich selbst zu aktualisieren, ohne den App Store-Überprüfungsprozess zu durchlaufen, ist seit einiger Zeit für Apps verfügbar, die mit JavaScript-Frameworks wie Facebook's React Native und Diensten wie Expo erstellt wurden.

Die zweite Bedingung, keine zusätzlichen Funktionen oder Funktionalitäten bereitzustellen, wird vom Entwickler bestimmt. Capgo ist für kleine Anpassungen oder Fehlerbehebungen gedacht, nicht für die Einführung neuer Funktionen oder Funktionalitäten. Für bedeutende Änderungen ist es erforderlich, Updates über den App Store zu veröffentlichen. Es ist erwähnenswert, dass viele andere Entwickler Live-Updates ohne Probleme oder Ablehnung von Apple verwenden.

Google Play ist weniger restriktiv als Apple, wenn es um die Aktualisierung von Apps geht. Google Play erlaubt, dass Apps, die aus ihrem Store mit JavaScript-Bundles installiert wurden, von Nicht-Google-Diensten aktualisiert werden können.

Weitere Informationen zur Installation von Capgo, um die Überprüfung zu umgehen, finden Sie in meinem nächsten Artikel.