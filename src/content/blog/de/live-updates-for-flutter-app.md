---
slug: de__live-updates-for-flutter-app
title: Flutter Live-Update
description: >-
  Ist es möglich, Live-Updates an Flutter-Apps zu senden, ohne die Überprüfung
  durch den App Store?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Umgehungsillustration für Kondensatoren
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live Update ist ein Dienst, der Entwicklern ermöglicht, Updates für ihre mobilen Apps bereitzustellen, ohne den traditionellen App Store-Einreichungsprozess zu durchlaufen. Dies kann eine bequeme Möglichkeit sein, schnell Fehler zu beheben oder kleine Aktualisierungen an einer App vorzunehmen, ohne auf den App Store-Überprüfungsprozess warten zu müssen. Allerdings unterstützt Capgo Live Update keine Aktualisierung von Flutter-Apps, da Flutter-Apps in nativen Code kompiliert werden.

Flutter ist ein Framework für die Entwicklung mobiler Apps, das die Programmiersprache Dart verwendet. Eine der Hauptfunktionen von Flutter ist, dass es Entwicklern ermöglicht, Apps zu erstellen, die sowohl auf iOS als auch auf Android mit einer einzigen Codebasis laufen können. Um dies zu erreichen, kompiliert Flutter den Code der App in nativen Code für jede Plattform. Das bedeutet, dass die App im Wesentlichen eine native App ist und keine webbasierte oder Hybrid-App.

Da Flutter-Apps in nativen Code kompiliert werden, ist es nicht möglich, Capgo Live Update zu verwenden, um Updates für eine Flutter-App bereitzustellen. Stattdessen müssen Entwickler Updates für die App Stores einreichen, wie sie es bei jeder anderen nativen App tun würden.

Darüber hinaus verstößt das Vornehmen von Änderungen am nativen Code in der Regel gegen die Regeln der App Stores. Sowohl der Apple App Store als auch der Google Play Store haben Richtlinien, die es Entwicklern verbieten, Änderungen am nativen Code einer App vorzunehmen, nachdem sie zur Überprüfung eingereicht wurde. Dies liegt daran, dass das Einführen von Änderungen am nativen Code möglicherweise Sicherheitslücken oder andere Probleme verursachen kann, die die Leistung der App beeinträchtigen könnten.

Zusammengefasst: Während Capgo Live Update ein nützliches Werkzeug für die schnelle Bereitstellung von Updates für bestimmte Arten von mobilen Apps ist, kann es nicht verwendet werden, um Flutter-Apps zu aktualisieren.

Dies liegt an der Art des Kompilierungsprozesses von Flutter und den Regeln der App Stores.