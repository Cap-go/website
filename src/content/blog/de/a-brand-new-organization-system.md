---
slug: de__a-brand-new-organization-system
title: Ein brandneues Organisationssystem
description: >-
  Eine Hintergrundgeschichte darüber, wie das Capgo-Team ein Organisationssystem
  hinzugefügt hat
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-04-15T00:00:00.000Z
updated_at: 2024-04-15T00:00:00.000Z
head_image: /organization_system_blog.webp
head_image_alt: Capgo-Organisationssystem-Illustration
tag: Story
published: true
locale: de
next_blog: ''
---

## Einführung

Hallo, ich bin [WcaleNieWolny](https://githubcom/WcaleNieWolny/WcaleNieWolny) - Capgos leitender Softwareingenieur

In den letzten 8 Monaten habe ich das [Organisationssystem](/docs/webapp/organization-system/) entwickelt, und ich freue mich, am 14. April bekannt geben zu können, dass das System fertiggestellt wurde 🎉 🎊

Endlich, nach 8 Monaten, ist jeder einzelne Teil von Capgo für Organisationsmitglieder zugänglich. Dazu gehören:
 - Apps
 - Statistiken
 - Abrechnung
 - vollständige CLI-Unterstützung
 - und noch so viel mehr!

Es war nicht einfach, bis hierher zu kommen; es gab 3 größere Überarbeitungen der Systeme

## Organisationen v1

Die Anfänge waren schwierig. Ursprünglich begann ich 2 Wochen nach meinem Einstieg in das Projekt daran zu arbeiten.
Zu diesem Zeitpunkt hatte ich wenig bis gar keine Kenntnisse über die Codebasis oder eine größere Vorstellung davon, wie man dies implementieren sollte.

Dies führte zur Implementierung der notdürftigsten Lösung, die nur den Zugriff auf Apps, Kanäle und Versionen unterstützte.
Sie erlaubte dem eingeladenen Benutzer nicht einmal den Zugriff auf Statistiken.

Und dann wartete ich darauf, dass Martin dies überprüft. Ich wartete und wartete, aber es passierte nichts wirklich. 3 Monate später beschloss ich, darauf zurückzukommen und alle Merge-Konflikte zu beheben. Ich beschloss auch zu testen, was sich als großartige Idee herausstellte.
Wenig überraschend scheiterte die Notlösung völlig. In diesem Moment beschloss ich, alle Fehler zu beheben und einen umfangreichen E2E-Test zu schreiben.
Ich musste mit sehr fehlerhaftem Code und vielen schlechten Entscheidungen arbeiten, die ich in der Vergangenheit getroffen hatte, aber nach 2 harten Wochen bekam ich es endlich zum Funktionieren.

Das bedeutet jedoch nicht, dass es perfekt war. Der Besitzer der Organisation hatte immer noch viel mehr Zugriff als selbst der höchstrangige eingeladene Benutzer. Auch die Benutzererfahrung ließ zu wünschen übrig. Der eingeladene Benutzer konnte nicht einmal die Anwendungsstatistiken einsehen, die Abrechnung verwalten, und die CLI war auf den reinen Upload beschränkt.

Trotz all dieser Herausforderungen hatte Martin den PR überprüft, und eine Woche später wurde er in die Produktion übernommen.

## Organisationen v2

Das Organisationssystem funktionierte trotz aller Herausforderungen recht gut. Benutzer verwendeten es, und es brachte das gesamte Projekt wirklich voran. Allerdings musste ich noch:
 - das Durcheinander in der [zeilenbasierten Sicherheit](https://supabasecom/docs/guides/auth/row-level-security) beheben
 - Unterstützung für die gesamte CLI hinzufügen
 - sicherstellen, dass Admin-Benutzer den gleichen Zugriff haben wie der Besitzer

Nach [vielen Diskussionen](https://githubcom/Cap-go/capgo/issues/564) mit Martin beschlossen wir, dass der beste Weg nach vorn darin bestand, die gesamten Sicherheitsregeln neu zu schreiben und den gesamten Ressourcenbesitz auf Organisationen und nicht auf Benutzer zu verlagern.
Dies würde eine einfachere Integration mit dem neuen Organisationssystem ermöglichen und auch viel Legacy-Code entfernen.

Das Schreiben des neuen RLS-Codes war sehr mühsam, aber nach eineinhalb Wochen war die gesamte Migration bereit.

Diesmal entschieden wir uns jedoch gegen das Schreiben des E2E-Tests, was bedeutete, dass wir es manuell testen mussten. Nach 3 sehr ausführlichen Gesprächen beschlossen Martin und ich schließlich, in die Produktion zu gehen und zu hoffen, dass es gut laufen würde 🙏

Es lief nicht gut. Es stellte sich heraus, dass ich die Benutzerregistrierung kaputt gemacht hatte, und neue Benutzer konnten kein Konto erstellen 😅

Nach einem schnellen Panikanruf pushte ich schnell einige Änderungen in die Produktion und ging ins Bett. Leider verursachten meine Änderungen nur noch mehr Probleme 😰

Als ich aufwachte, entdeckte ich, dass Benutzer viele leere Organisationen hatten. Das sollte nicht passieren, da pro Benutzer nur 1 Organisation erlaubt sein sollte. Es brauchte einige Zeit des Brainstormings, um alle duplizierten, leeren Organisationen zu entfernen, aber abgesehen davon verliefen die Änderungen ziemlich reibungslos.

## Organisationen v3

Selbst das war nicht genug. Es fehlte noch eine große Komponente - die Abrechnung.

Bisher konnte nur der Besitzer die Abrechnung verwalten. Dies hat zu einigen interessanten Problemen geführt, bei denen ein Benutzer einen Plan kaufte in der Annahme, er würde ihn für die Organisation kaufen.
Wir haben das Problem schnell manuell behoben, und an diesem Punkt beschlossen wir, dass dieses Problem inakzeptabel war.

Die Migration verlief ziemlich reibungslos.Es hat eine Woche Arbeit gekostet, aber im Vergleich zu V1 und V2 war es wirklich nicht so schwer 🚀

## Organisationen v4 - die Zukunft

Nach all dieser harten Arbeit denke ich, es ist Zeit, sich vorerst auf etwas anderes zu konzentrieren 😎

Es war nicht einfach, aber ich habe viel gelernt und capgo hat eine sehr schöne und wichtige Funktion erhalten
Ich muss noch die veralteten Funktionen entfernen, das Benutzererlebnis der Webapp verbessern, auf Fehler überwachen,
aber es sollte keine größeren Änderungen an diesem System mehr geben

<br>

Danke fürs Lesen 🚀