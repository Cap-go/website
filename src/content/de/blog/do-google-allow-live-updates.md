---
slug: do-google-allow-live-updates
title: >-
  Erlaubt Google das Senden von Live-Updates an Apps ohne die Überprüfung durch
  den App Store?
description: >-
  Wie können Sie Code-Aktualisierungen für Android-Apps in der Produktion
  bereitstellen und dabei vollständig mit Googles Richtlinien konform sein?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Illustration zur Überbrückung des Kondensators
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play ist weniger restriktiv als Apple, wenn es um App-Aktualisierungen geht

Die Aktualisierung Ihrer über Google Play verteilten Apps kann eine knifflige Aufgabe sein, aber es ist wichtig, Googles Richtlinien zu befolgen, um konform zu bleiben. Laut den Google Play-Richtlinien dürfen Apps sich nicht selbst modifizieren, ersetzen oder aktualisieren, außer durch den eigenen Aktualisierungsmechanismus von Google Play. Das bedeutet, dass das Herunterladen von ausführbarem Code, wie dex-, JAR- oder so-Dateien, aus einer anderen Quelle als Google Play nicht erlaubt ist.

Diese Einschränkung gilt jedoch nicht für Code, der in einer virtuellen Maschine oder einem Interpreter ausgeführt wird, der indirekten Zugriff auf Android-APIs bietet, wie JavaScript in einer Webview oder einem Browser. Das bedeutet, dass Sie interpretierte Sprachen wie JavaScript, Python, Lua usw. verwenden können, um Ihre App zu aktualisieren, ohne den Google Play-Überprüfungsprozess zu durchlaufen. Ein Werkzeug, das bei diesem Prozess helfen kann, ist das Capgo Capacitor Plugin. Dieses Plugin ermöglicht es Entwicklern, ihren HTML-, CSS- und JavaScript-Code zu aktualisieren und Updates an ihre Apps zu senden, ohne dass eine Überprüfung erforderlich ist.

Darüber hinaus dürfen Apps oder Drittanbieter-Code, die interpretierte Sprachen wie JavaScript, Python, Lua usw. verwenden, die zur Laufzeit geladen werden, keine potenziellen Verstöße gegen die Richtlinien von Google Play ermöglichen. Es ist wichtig zu beachten, dass dieser interpretierte Code nicht mit der App gepackt sein sollte.

Indem Sie diese Richtlinien befolgen und Werkzeuge wie das Capgo Capacitor Plugin verwenden, können Sie sicherstellen, dass Ihre App-Updates den Richtlinien von Google Play entsprechen und Ihre App weiterhin für Benutzer auf der Plattform verfügbar bleibt. Bedenken Sie, dass es immer eine gute Idee ist, die neueste Version von Googles Richtlinien zu überprüfen, um sicherzustellen, dass Sie sie korrekt befolgen.

Weitere Informationen zur Installation von Capgo zur Umgehung der Überprüfung finden Sie in meinem nächsten Artikel.