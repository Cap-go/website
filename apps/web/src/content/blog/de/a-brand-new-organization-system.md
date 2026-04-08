---
slug: a-brand-new-organization-system
title: Ein brandneues Organisationssystem
description: >-
  Eine Hintergrundgeschichte darüber, wie das Capgo-Team ein Organisationssystem
  hinzugefügt hat
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /organization_system_blog.webp
head_image_alt: Capgo Organisationssystem-Illustration
keywords: >-
  organization system, capgo, mobile app development, software engineering,
  backend development
tag: Story
published: true
locale: de
next_blog: ''
---
## Einführung

Hey, ich bin [WcaleNieWolny](https://github.com/WcaleNieWolny/WcaleNieWolny) - Capgos leitender Softwareentwickler.

In den letzten 8 Monaten habe ich das [Organisationssystem](/docs/webapp/organization-system/) entwickelt, und mit Stand 14. April freue ich mich bekannt geben zu können, dass das System fertiggestellt wurde 🎉 🎊

Endlich, nach 8 Monaten, ist jeder einzelne Teil von Capgo für Organisationsmitglieder zugänglich. Dies beinhaltet:
 - Apps
 - Statistiken
 - Abrechnung
 - vollständige CLI-Unterstützung
 - und vieles mehr!

Es war nicht einfach, hierher zu kommen; es gab 3 große Überarbeitungen der Systeme.

## Organisationen v1

Die Anfänge waren holprig... Ursprünglich begann ich 2 Wochen nach meinem Projektbeitritt mit der Arbeit daran.
Zu diesem Zeitpunkt hatte ich wenig bis gar keine Kenntnisse über die Codebasis oder größere Vorstellungen zur Implementierung.

Dies führte zur Implementierung der notdürftigsten Lösung, die nur den Zugriff auf Apps, Kanäle und Versionen unterstützte.
Sie erlaubte dem eingeladenen Benutzer nicht einmal den Zugriff auf Statistiken.

Dann wartete ich auf Martins Review. Ich wartete und wartete, aber nichts geschah wirklich. 3 Monate später beschloss ich, zurückzukommen und alle Merge-Konflikte zu beheben. Ich beschloss auch zu testen, was sich als großartige Idee herausstellte.
Wenig überraschend scheiterte die Notlösung komplett. In diesem Moment beschloss ich, alle Fehler zu beheben und einen umfangreichen E2E-Test zu schreiben.
Ich musste mit sehr fehlerhaftem Code und vielen schlechten Entscheidungen meines früheren Ichs arbeiten, aber nach 2 harten Wochen bekam ich es endlich zum Laufen.

Das bedeutet jedoch nicht, dass es perfekt war. Der Eigentümer der Organisation hatte immer noch viel mehr Zugriff als selbst der höchstrangige eingeladene Benutzer. Die Benutzererfahrung war auch ziemlich mangelhaft. Der eingeladene Benutzer konnte nicht einmal die Anwendungsstatistiken sehen, die Abrechnung verwalten, und die CLI war auf das Hochladen beschränkt.

Trotz all dieser Herausforderungen hatte Martin den PR überprüft, und eine Woche später wurde er in die Produktion übernommen.

## Organisationen v2

Das Organisationssystem funktionierte trotz aller Herausforderungen recht gut. Benutzer nutzten es, und es brachte das gesamte Projekt wirklich voran. Allerdings musste ich noch:
 - das Durcheinander in der [Zeilen-Level-Sicherheit](https://supabase.com/docs/guides/auth/row-level-security) beheben
 - Unterstützung für die gesamte CLI hinzufügen
 - sicherstellen, dass Admin-Benutzer den gleichen Zugriff wie der Eigentümer haben

Nach [vielen Diskussionen](https://github.com/Cap-go/capgo/issues/564) mit Martin beschlossen wir, dass der beste Weg nach vorne darin bestand, die gesamten Sicherheitsregeln neu zu schreiben und den gesamten Ressourcenbesitz von Benutzern zu Organisationen zu verlagern.
Dies würde eine einfachere Integration mit dem neuen Organisationssystem ermöglichen und auch viel Legacy-Code entfernen.

Das Schreiben des neuen RLS-Codes war sehr mühsam, aber nach eineinhalb Wochen war die gesamte Migration bereit.

Diesmal entschieden wir uns jedoch gegen das Schreiben des E2E-Tests, was bedeutete, dass wir manuell testen mussten. Nach 3 sehr ausführlichen Gesprächen beschlossen Martin und ich schließlich, in die Produktion zu pushen und zu hoffen, dass es gut gehen würde 🙏

Das tat es nicht... Es stellte sich heraus, dass ich die Benutzerregistrierung kaputt gemacht hatte, und neue Benutzer konnten kein Konto erstellen 😅

Nach einem schnellen Panic-Call pushte ich schnell einige Änderungen in die Produktion und ging ins Bett. Leider verursachten meine Änderungen nur noch mehr Probleme 😰

Als ich aufwachte, entdeckte ich, dass Benutzer viele leere Organisationen hatten. Das sollte nicht passieren, da pro Benutzer nur 1 Organisation erlaubt sein sollte. Es brauchte einige Zeit des Brainstormings, um alle duplizierten, leeren Organisationen zu entfernen, aber abgesehen davon verliefen die Änderungen recht reibungslos.

## Organisationen v3

Selbst das war nicht genug. Es fehlte noch eine wichtige Komponente - die Abrechnung.

Bisher konnte nur der Eigentümer die Abrechnung verwalten. Dies hat zu einigen interessanten Problemen geführt, bei denen ein Benutzer einen Plan kaufte in der Annahme, er würde ihn für die Organisation kaufen.
Wir haben das Problem schnell manuell behoben und zu diesem Zeitpunkt entschieden, dass dieses Problem inakzeptabel war.

Die Migration verlief recht reibungslos. Sie dauerte eine Woche Arbeit, aber im Vergleich zu V1 und V2 war es wirklich nicht so schwer 🚀

## Organisationen v4 - die Zukunft

Nach all dieser harten Arbeit denke ich, es ist Zeit, sich vorerst auf etwas anderes zu konzentrieren 😎

Es war nicht einfach, aber ich habe viel gelernt und Capgo hat eine sehr schöne und wichtige Funktion erhalten.
Ich muss noch die Legacy-Funktionen als veraltet markieren, die Webapp-Benutzererfahrung verbessern, nach Fehlern suchen,
aber es sollte keine größeren Änderungen an diesem System mehr geben.

<br>

Danke fürs Lesen 🚀
