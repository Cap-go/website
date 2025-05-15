---
slug: do-google-allow-live-updates
title: >-
  Erlaubt Google, Live-Updates an Apps zu senden, ohne dass eine Überprüfung im
  App Store erfolgt?
description: >-
  Wie können Sie Code-Updates für Produktions-Android-Apps bereitstellen und
  dabei vollständig mit den Richtlinien von Google übereinstimmen?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Capacitor Umgehungsillustration
keywords: 'Google, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Google Play ist weniger restriktiv als Apple, wenn es um das Aktualisieren von Apps geht.

Das Aktualisieren Ihrer über Google Play vertriebenen Apps kann eine knifflige Aufgabe sein, es ist jedoch wichtig, die Richtlinien von Google zu befolgen, um compliant zu bleiben. Laut den Richtlinien von Google Play dürfen Apps sich nicht selbst modifizieren, ersetzen oder aktualisieren, es sei denn, sie verwenden den eigenen Aktualisierungsmechanismus von Google Play. Das bedeutet, dass das Herunterladen von ausführbarem Code, wie dex-, JAR- oder .so-Dateien, aus einer anderen Quelle als Google Play nicht erlaubt ist.

Diese Einschränkung gilt jedoch nicht für Code, der in einer virtuellen Maschine oder einem Interpreter läuft, der indirekten Zugang zu Android-APIs bietet, wie zum Beispiel JavaScript in einem Webview oder Browser. Das bedeutet, dass Sie interpretierte Sprachen wie JavaScript, Python, Lua usw. verwenden können, um Ihre App zu aktualisieren, ohne den Überprüfungsprozess von Google Play durchlaufen zu müssen. Ein Werkzeug, das bei diesem Prozess helfen kann, ist das Capgo Capacitor-Plugin. Dieses Plugin ermöglicht Entwicklern, ihren HTML-, CSS- und JavaScript-Code zu aktualisieren und Updates an ihre Apps zu senden, ohne dass eine Überprüfung erforderlich ist.

Darüber hinaus dürfen Apps oder Drittanbieter-Code, die interpretierte Sprachen wie JavaScript, Python, Lua usw. verwenden, die zur Laufzeit geladen werden, keine potenziellen Verstöße gegen die Richtlinien von Google Play zulassen. Es ist wichtig zu beachten, dass dieser interpretierte Code nicht mit der App verpackt werden sollte.

Indem Sie diese Richtlinien befolgen und Werkzeuge wie das Capgo Capacitor-Plugin verwenden, können Sie sicherstellen, dass Ihre App-Updates den Richtlinien von Google Play entsprechen und dass Ihre App für Benutzer auf der Plattform verfügbar bleibt. Denken Sie daran, dass es immer eine gute Idee ist, die neuesten Versionen von Googles Richtlinien zu überprüfen, um sicherzustellen, dass Sie diese korrekt befolgen.

Für weitere Informationen zur Installation von Capgo, um die Überprüfung zu umgehen, beziehen Sie sich bitte auf meinen nächsten Artikel.
