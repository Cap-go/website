---
slug: how-to-bypass-app-store-review
title: So aktualisieren Sie Capacitor-JS-Apps ohne App Store-Überprüfung.
description: >-
  Wie kann die Capgo-Funktion es Ihnen ermöglichen, Code-Updates für
  Live-iOS-Ionic-Apps zu pushen und dabei vollständig mit Apples Richtlinien
  konform zu sein?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Illustration zur Umgehung des Kondensators
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Schön, dass Sie fragen

Meine Anwälte haben mich gebeten, Sie darauf hinzuweisen, dass dies keine Rechtsberatung ist, aber Sie brauchen keinen Jurastudium, um den Wortlaut in Apples offiziellen Richtlinien zu verstehen. Apples Richtlinien erlauben es Ihnen ausdrücklich, ausführbaren Code direkt in Ihre App zu pushen und den App Store zu umgehen, unter diesen drei Bedingungen:

* Der Code wird von Apples eingebautem WebKit-Framework ausgeführt
* Der Code stellt keine zusätzlichen Funktionen oder Funktionalitäten bereit, schaltet sie frei oder aktiviert sie
* Der Benutzer sieht nicht, dass das Update stattfindet

Mit dem Capgo capacitor Plugin können Sie nur Ihr HTML, CSS und JavaScript aktualisieren und ändern, also erfüllen wir die erste Bedingung

Nebenbei bemerkt gibt es die Möglichkeit für Apps, sich ohne den App Store selbst zu aktualisieren, schon seit einiger Zeit
Allerdings nur für Apps, die mit JavaScript-Frameworks wie Facebook's React Native und Diensten wie Expo erstellt wurden

Ein Beweis dafür, dass React Native nicht nativer ist als Capacitor 😆

Capgo ist einfach die erste erschwingliche Lösung, die die Möglichkeit bietet, Code-Level-Updates für native Capacitor-Apps zu pushen
Die zweite Bedingung, keine neuen Funktionen oder Funktionalitäten, liegt wirklich bei Ihnen

Capgo ist nicht dazu gedacht, neue Funktionen oder Funktionalitäten zu pushen. Es soll sie anpassen oder korrigieren und so kleinere Releases vermeiden, die notwendig sind, um Fehler zu beheben, Logging oder Tracking hinzuzufügen, Nachrichten zu aktualisieren, Benutzer zum Upgrade zu zwingen, usw.

Für neue Funktionen oder Funktionalitäten müssen Sie über den App Store veröffentlichen. Zu Ihrer Information: Ionic AppFlow (die Alternative für große Unternehmen) ist auf über 50 Millionen iOS-Geräten installiert und es wurde noch nie eine App abgelehnt, weil sie es verwendet

Ich sage das nur, weil es gut zu wissen ist, dass Tausende anderer Entwickler Live-Updates verwenden, Sie sind also nicht allein

Apple und Google haben ihre eigenen Regeln, wie Apps aktualisiert werden sollen

Für Apple [werfen Sie einen Blick auf Absatz 3.3.2](https://developerapplecom/programs/information/Apple_Developer_Program_Information_8_12_15pdf/)
[...] Die einzige Ausnahme von dem Vorstehenden sind Skripte und Code, die von Apples eingebautem WebKit-Framework oder JavascriptCore heruntergeladen und ausgeführt werden [...] __TLDR__: Wir sollten OTA-Updates nur verwenden, um Fehler zu beheben oder Verbesserungen vorzunehmen, ohne signifikante Änderungen vorzunehmen

__Google__ Play ist weniger restriktiv - sie sagen, dass Apps, die von Google Play mit JavaScript-Bundles installiert werden, [nicht darauf beschränkt sind](https://supportgooglecom/googleplay/android-developer/answer/9888379/?hl=en), nur von Google-Diensten aktualisiert zu werden


Lesen Sie meinen nächsten Artikel für weitere Informationen zur Installation von Capgo, um die Überprüfung zu umgehen