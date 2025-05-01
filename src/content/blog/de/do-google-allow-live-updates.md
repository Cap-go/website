---
slug: do-google-allow-live-updates
title: >-
  Google consente di inviare aggiornamenti in tempo reale alle App senza la
  revisione del Play Store.
description: >-
  Come distribuire gli aggiornamenti del codice alle app Android in produzione
  rimanendo completamente conformi alle linee guida di Google?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Umleitung von Capacitor
keywords: 'Google, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play ist weniger restriktiv als Apple, wenn es um App-Updates geht

Die Aktualisierung Ihrer über Google Play vertriebenen Apps kann eine knifflige Aufgabe sein, aber es ist wichtig, Googles Richtlinien zu befolgen, um konform zu bleiben. Gemäß den Google Play-Richtlinien dürfen Apps sich nicht selbst modifizieren, ersetzen oder aktualisieren, außer über den eigenen Update-Mechanismus von Google Play. Dies bedeutet, dass das Herunterladen von ausführbarem Code wie dex-, JAR- oder so-Dateien aus anderen Quellen als Google Play nicht erlaubt ist.

Diese Einschränkung gilt jedoch nicht für Code, der in einer virtuellen Maschine oder einem Interpreter läuft, der indirekten Zugriff auf Android-APIs bietet, wie beispielsweise JavaScript in einer Webview oder einem Browser. Das bedeutet, dass Sie interpretierte Sprachen wie JavaScript, Python, Lua usw. verwenden können, um Ihre App zu aktualisieren, ohne den Überprüfungsprozess von Google Play zu durchlaufen. Ein Werkzeug, das bei diesem Prozess helfen kann, ist das Capgo Capacitor Plugin. Dieses Plugin ermöglicht es Entwicklern, ihren HTML-, CSS- und JavaScript-Code zu aktualisieren und Updates an ihre Apps zu senden, ohne dass eine Überprüfung erforderlich ist.

Darüber hinaus dürfen Apps oder Drittanbieter-Code, die interpretierte Sprachen wie JavaScript, Python, Lua usw. verwenden, die zur Laufzeit geladen werden, keine potenziellen Verstöße gegen die Google Play-Richtlinien ermöglichen. Es ist wichtig zu beachten, dass dieser interpretierte Code nicht mit der App gebündelt sein sollte.

Durch die Befolgung dieser Richtlinien und die Verwendung von Tools wie dem Capgo Capacitor Plugin können Sie sicherstellen, dass Ihre App-Updates den Google Play-Richtlinien entsprechen und Ihre App weiterhin für Benutzer auf der Plattform verfügbar bleibt. Denken Sie daran, dass es immer eine gute Idee ist, die neueste Version der Google-Richtlinien zu überprüfen, um sicherzustellen, dass Sie sie korrekt befolgen.

Weitere Informationen zur Installation von Capgo zur Umgehung der Überprüfung finden Sie in meinem nächsten Artikel.