---
slug: live-updates-for-flutter-app
title: Flutter Live-Update
description: >-
  Ist es möglich, Live-Updates an Flutter-Apps zu senden, ohne die Überprüfung
  im App Store?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitor Bypass-Illustration
keywords: >-
  Flutter, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Capgo Live Update ist ein Dienst, der es Entwicklern ermöglicht, Updates für ihre mobilen Apps bereitzustellen, ohne den traditionellen Einreichungsprozess im App Store durchlaufen zu müssen. Dies kann eine bequeme Möglichkeit sein, um schnell Fehler zu beheben oder kleine Updates an einer App vorzunehmen, ohne auf den Überprüfungsprozess des App Stores zu warten. Allerdings unterstützt Capgo Live Update keine Updates für Flutter-Apps, da Flutter-Apps in nativen Code kompiliert werden.

Flutter ist ein Framework zur Entwicklung von mobilen Apps, das die Programmiersprache Dart verwendet. Eines der Hauptmerkmale von Flutter ist, dass es Entwicklern ermöglicht, Apps zu erstellen, die sowohl auf iOS als auch auf Android mit einer einzigen Codebasis laufen können. Um dies zu erreichen, kompiliert Flutter den Code der App in nativen Code für jede Plattform. Das bedeutet, dass die App im Wesentlichen eine native App ist, anstatt eine webbasierte App oder eine hybride App.

Da Flutter-Apps in nativen Code kompiliert werden, ist es nicht möglich, Capgo Live Update zu verwenden, um Updates für eine Flutter-App bereitzustellen. Stattdessen müssen Entwickler Updates in den App Stores einreichen, wie sie es auch mit jeder anderen nativen App tun würden.

Darüber hinaus widerspricht das Aktualisieren von nativem Code im Allgemeinen den Regeln der App Stores. Sowohl der Apple App Store als auch der Google Play Store verfügen über Richtlinien, die es Entwicklern verbieten, Änderungen am nativen Code einer App vorzunehmen, nachdem diese zur Überprüfung eingereicht wurde. Dies liegt daran, dass das Einführen von Änderungen in den nativen Code möglicherweise Sicherheitsanfälligkeiten oder andere Probleme verursachen kann, die die Leistung der App gefährden könnten.

Zusammenfassend kann gesagt werden, dass, obwohl Capgo Live Update ein nützliches Werkzeug zum schnellen Bereitstellen von Updates für bestimmte Arten von mobilen Apps ist, es nicht verwendet werden kann, um Flutter-Apps zu aktualisieren.

Dies liegt an der Natur des Kompilierungsprozesses von Flutter und den Regeln der App Stores.
