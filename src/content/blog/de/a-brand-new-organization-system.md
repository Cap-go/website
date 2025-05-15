---
slug: a-brand-new-organization-system
title: Ein brandneues Organisationssystem
description: >-
  Eine Vorgeschichte darüber, wie das Capgo-Team ein Organisationssystem
  hinzugefügt hat.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Capgo-Organisationssystem-Illustration
keywords: >-
  organization system, capgo, mobile app development, software engineering,
  backend development
tag: Story
published: true
locale: de
next_blog: ''
---
## Einführung

Hey, ich bin [WcaleNieWolny](https://github.com/WcaleNieWolny/WcaleNieWolny) - der leitende Softwareingenieur von Capgo.

In den letzten 8 Monaten habe ich das [Organisationssystem](/docs/webapp/organization-system/) entwickelt, und am 14. April freue ich mich, ankündigen zu können, dass das System fertiggestellt ist 🎉 🎊

Endlich, nach 8 Monaten, ist jeder einzelne Teil von Capgo für Organisationsmitglieder zugänglich. Dazu gehören:
 - Apps
 - Statistiken
 - Abrechnung
 - vollständige CLI-Unterstützung
 - und vieles mehr!

Es war nicht einfach, hierher zu kommen; es gab 3 große Überarbeitungen der Systeme.

## Organisationen v1

Die Anfänge waren rau... Zunächst begann ich 2 Wochen nach meinem Eintritt in das Projekt mit der Arbeit daran. 
Zu diesem Zeitpunkt hatte ich kaum bis gar keine Kenntnisse über den Code oder eine größere Vorstellung davon, wie ich dies umsetzen sollte.

Das führte dazu, dass ich die hackhafteste Lösung implementierte, die nur den Zugriff auf die Apps, Kanäle und Versionen unterstützte.
Es erlaubte nicht einmal, dass der eingeladene Benutzer auf Statistiken zugreifen konnte.

Und dann wartete ich darauf, dass Martin dies überprüft. Ich wartete und wartete, aber es geschah nichts wirklich. 3 Monate später entschied ich mich, zurückzukommen und alle Merge-Konflikte zu beheben. Ich beschloss auch zu testen, was sich als großartige Idee herausstellte.
Keine Überraschung, die hackhafte Lösung fiel komplett durch. In diesem Moment beschloss ich, alle Fehler zu beheben und einen umfangreichen E2E-Test zu schreiben.
Ich musste mit sehr fehlerhaftem Code und vielen schlechten Entscheidungen von mir in der Vergangenheit arbeiten, aber nach 2 harten Wochen brachte ich es schließlich zum Laufen.

Das bedeutet jedoch nicht, dass es perfekt war. Der Besitzer der Organisation hatte immer noch viel mehr Zugriff als sogar der schnellste eingeladene Benutzer. Auch die Benutzererfahrung ließ zu wünschen übrig. Der eingeladene Benutzer konnte nicht einmal die Anwendungsstatistiken ansehen, die Abrechnung verwalten, und die CLI war auf Uploads beschränkt.

Trotz all dieser Herausforderungen hatte Martin das PR überprüft, und eine Woche später wurde es in die Produktion geschoben.

## Organisationen v2

Das Organisationssystem funktionierte trotz all der Herausforderungen recht gut. Die Benutzer verwendeten es und es brachte das gesamte Projekt wirklich voran. Ich musste jedoch noch:
 - das Chaos in der [Zeilenebene-Sicherheit](https://supabase.com/docs/guides/auth/row-level-security) beheben
 - Unterstützung für die gesamte CLI hinzufügen
 - sicherstellen, dass Administratorbenutzer den gleichen Zugriff wie der Besitzer haben

Nach [vielen Diskussionen](https://github.com/Cap-go/capgo/issues/564) mit Martin entschieden wir, dass der beste Weg, um voranzukommen, darin bestand, alle Sicherheitsregeln neu zu schreiben und alle Ressourcenbesitzrechte den Organisationen und nicht den Benutzern zu übertragen.
Dies würde eine einfachere Integration mit dem neuen Organisationssystem ermöglichen und auch viel veralteten Code entfernen.

Das Schreiben des neuen RLS-Codes war sehr mühsam, aber nach anderthalb Wochen war die gesamte Migration bereit.

Diesmal entschieden wir uns jedoch gegen das Schreiben des E2E-Tests, was bedeutete, dass wir ihn manuell testen mussten. Nach 3 sehr ausführlichen gemeinsamen Anrufen beschlossen Martin und ich schließlich, in die Produktion zu pushen und hofften, dass es gut gehen würde 🙏

Es lief nicht... Es stellte sich heraus, dass ich die Benutzeregistrierung gebrochen hatte und neue Benutzer konnten kein Konto erstellen 😅

Nach einem schnellen Panik-Anruf schob ich schnell einige Änderungen in die Produktion und ging ins Bett. Leider verursachten meine Änderungen nur noch mehr Probleme 😰

Nachdem ich aufwachte, stellte ich fest, dass Benutzer viele leere Organisationen hatten. Das sollte nicht passieren, da nur 1 Organisation pro Benutzer erlaubt sein sollte. Es dauerte eine Weile, um alle duplizierten, leeren Organisationen zu entfernen, aber abgesehen davon verliefen die Änderungen recht reibungslos.

## Organisationen v3

Selbst das war nicht genug. Es fehlte noch eine riesige Komponente - die Abrechnung.

Bis jetzt konnte nur der Besitzer die Abrechnung verwalten. Dies führte zu interessanten Problemen, als ein Benutzer einen Plan kaufte, in dem Glauben, er kaufte ihn für die Organisation. 
Wir beheben das Problem schnell manuell und an diesem Punkt entschieden wir, dass dieses Problem inakzeptabel war.

Die Migration verlief recht reibungslos. Es dauerte eine Woche Arbeit, aber im Vergleich zu V1 und V2 war es wirklich nicht so schwer 🚀

## Organisationen v4 - die Zukunft

Nach all dieser harten Arbeit denke ich, dass es Zeit ist, mich vorerst auf etwas anderes zu konzentrieren 😎

Es war nicht einfach, aber ich habe viel gelernt und Capgo hat ein sehr nettes und wichtiges Feature erhalten.
Ich muss noch die veralteten Funktionen einstellen, die Benutzererfahrung der Webanwendung verbessern, nach Fehlern überwachen,
aber es sollte keine größeren Änderungen an diesem System geben.


<br>

Danke fürs Lesen 🚀
