---
slug: live-updates-for-flutter-app
title: Flutter Live-Update
description: >-
  Ist es möglich, Live-Updates an Flutter-Apps ohne App Store-Überprüfung zu
  senden?
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
Capgo Live Update ist ein Dienst, der Entwicklern ermöglicht, Updates für ihre mobilen Apps bereitzustellen, ohne den traditionellen App Store-Einreichungsprozess zu durchlaufen. Dies kann eine praktische Möglichkeit sein, schnell Fehler zu beheben oder kleine Updates an einer App vorzunehmen, ohne auf den App Store-Überprüfungsprozess warten zu müssen. Allerdings unterstützt Capgo Live Update keine Aktualisierung von Flutter-Apps, da Flutter-Apps in nativen Code kompiliert werden.

Flutter ist ein Framework für die Entwicklung mobiler Apps, das die Programmiersprache Dart verwendet. Eine der Hauptfunktionen von Flutter ist, dass Entwickler Apps erstellen können, die sowohl auf iOS als auch auf Android mit einer einzigen Codebasis laufen. Um dies zu erreichen, kompiliert Flutter den Code der App in nativen Code für jede Plattform. Das bedeutet, dass die App im Wesentlichen eine native App ist und keine webbasierte oder Hybrid-App.

Da Flutter-Apps in nativen Code kompiliert werden, ist es nicht möglich, Capgo Live Update zu verwenden, um Updates für eine Flutter-App bereitzustellen. Stattdessen müssen Entwickler Updates wie bei jeder anderen nativen App in den App Stores einreichen.

Darüber hinaus verstößt das Aktualisieren von nativem Code generell gegen die Regeln der App Stores. Sowohl der Apple App Store als auch der Google Play Store haben Richtlinien, die es Entwicklern verbieten, Änderungen am nativen Code einer App vorzunehmen, nachdem diese zur Überprüfung eingereicht wurde. Der Grund dafür ist, dass Änderungen am nativen Code möglicherweise Sicherheitslücken oder andere Probleme verursachen können, die die Leistung der App beeinträchtigen könnten.

Zusammenfassend lässt sich sagen, dass Capgo Live Update zwar ein nützliches Werkzeug für die schnelle Bereitstellung von Updates für bestimmte Arten von mobilen Apps ist, es jedoch nicht für die Aktualisierung von Flutter-Apps verwendet werden kann.

Dies liegt an der Art und Weise, wie Flutter kompiliert wird und an den Regeln der App Stores.
