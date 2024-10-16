---
slug: birth-of-capgo-my-challenging-journey-as-a-solo-maker
title: Wie aus einem GitHub-Problem ein Unternehmen entstand
description: >-
  Entdecken Sie die Herausforderungen und Erfolge bei der Entwicklung von Capgo,
  einem innovativen Live-Update-System für Capacitor-Apps, das aus der
  Notwendigkeit heraus geboren und durch Feedback der Community geformt wurde.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2024-07-13T00:00:00.000Z
updated_at: 2024-07-13T00:00:00.000Z
head_image: /capgo-birth-story.webp
head_image_alt: Eine visuelle Darstellung der Entwicklung von Capgo von der Idee zum Produkt
tag: development
published: true
locale: de
next_blog: ''
---

## Die Genesis: Eine Community-Anfrage

Die Samen von Capgo wurden tatsächlich lange vor meiner Reise als Solo-Entwickler gepflanzt. Am 8. Juli 2020 reichte ein Community-Mitglied namens alexcroox eine Plugin-Anfrage ein, die schließlich zur Blaupause für Capgo werden sollte.

![Ursprüngliche Plugin-Anfrage](/capgo-initial-requestwebp)

Diese Anfrage skizzierte den Bedarf für ein "Capacitor Hot Code Push"-Plugin mit folgenden Kernpunkten:

1. **Plattformen**: Unterstützung für Android und iOS
2. **Bestehende Lösungen**: Es wurden die Einschränkungen aktueller Optionen wie MS Code Push (ohne Capacitor-Unterstützung) und App Flow (teuer und unflexibel) hervorgehoben
3. **Beschreibung**: Die Möglichkeit, JS/CSS/HTML einer App in Echtzeit zu aktualisieren, ohne den App-Store-Prüfungsprozess zu durchlaufen
4. **Hauptfunktionen**: 
   - Ermöglichung von Over-the-Air-Updates von einem Server/Endpunkt nach Wahl des Entwicklers
   - Herunterladen einer ZIP-Datei des aktualisierten Dist-Ordners, Extrahieren und Anweisung an Capacitor, aus diesem neuen Verzeichnis zu starten
   - Zusätzliche Funktionen wie Update-Verifizierung, Installationszeitpunkt und selektives Herunterladen von Updates

Diese umfassende Anfrage erhielt erhebliche Unterstützung aus der Community, mit 65 Likes und 25 Herz-Reaktionen. Sie zeigte deutlich eine starke Nachfrage nach einer solchen Lösung im Capacitor-Ökosystem.

Als ich über ein Jahr später auf diese Anfrage stieß, resonierte sie stark mit den Herausforderungen, denen ich in meinen eigenen Projekten gegenüberstand. Sie diente sowohl als Bestätigung für den Bedarf eines solchen Tools als auch als Roadmap für das, was Capgo werden würde.

Die Begeisterung der Community für dieses vorgeschlagene Plugin, kombiniert mit meinen persönlichen Erfahrungen, wurde zur treibenden Kraft hinter der Entwicklung von Capgo. Es ist ein perfektes Beispiel dafür, wie Open-Source-Communities Bedürfnisse identifizieren und Lösungen inspirieren können, auch wenn der Zeitraum von der Idee bis zur Umsetzung über ein Jahr beträgt.

## Ein neues Kapitel beginnt

Bevor wir in die Capgo-Geschichte eintauchen, ist es wichtig, die Bühne zu bereiten. 2021 traf ich die lebensverändernde Entscheidung, meine Position als CTO von Cashstory zu kündigen und meine Anteile zu verkaufen. Dies markierte den Beginn meiner Reise als Solo-Entwickler, ein Weg voller Ungewissheit, aber auch endloser Möglichkeiten.

![Digitales Nomadenleben in Lissabon](/capgo-lisbon-nomadwebp)

Mit meinen Ersparnissen als Sicherheitsnetz begab ich mich auf ein neues Abenteuer. Ich lebte als digitaler Nomade in Lissabon, Portugal, und genoss die lebendige Tech-Szene und Kultur der Stadt, während ich mich auf meine Leidenschaftsprojekte konzentrierte. Mein Hauptfokus lag auf Captime, einer mobilen App für Crossfit-Timer. Ich ahnte nicht, dass dieses Projekt mich dazu bringen würde, etwas viel Größeres zu erschaffen.

Die Energie des Startup-Ökosystems in Lissabon und die Freiheit des digitalen Nomadenlebens boten den perfekten Hintergrund für Innovation. In dieser Umgebung, umgeben von Mitunternehmern und Entwicklern aus der ganzen Welt, wurden die Samen von Capgo gesät.

## Der Funke einer Idee

Während der Arbeit an Captime stieß ich auf ein erhebliches Hindernis - das Fehlen einer erschwinglichen und flexiblen Update-Lösung für Capacitor-Apps. Im Oktober 2021 äußerte ich diese Bedenken in einem GitHub-Thread.

![Ursprünglicher Vorschlag für Capgo](/capgo-initial-proposalwebp)

Die Hauptprobleme, die ich identifizierte, waren:

1. Hohe Kosten für Entwickler im kleinen Maßstab
2. Fehlen von Over-the-Air (OTA) Updates in erschwinglichen Plänen
3. Unnötige Funktionen für Solo-Entwickler

## Die Community resoniert

Meine Bedenken trafen einen Nerv bei anderen Entwicklern. Viele teilten die Meinung, dass bestehende Lösungen für unabhängige Entwickler und kleine Teams überteuert waren.

![Community-Feedback](/capgo-community-feedbackwebp)

Ein Entwickler fasste die Gefühle der Community zusammen:

"Es wäre brillant, wenn der Community-Plan 500 Live-Updates beinhalten würdeOder noch besser, wenn es ein Live-Update-Paket für nur 50 Euro pro Monat gäbe, das 5.000 Live-Updates beinhaltet.

## Die Geburt einer Lösung

Motiviert durch die Reaktion der Community beschloss ich, die Sache selbst in die Hand zu nehmen. Am 24. Oktober 2021 kündigte ich meinen Plan an, ein Modul zu entwickeln, das es Entwicklern ermöglichen würde, Updates von einer bestimmten URL herunterzuladen.

Die anfänglichen Ziele waren einfach:
- Daten von einer URL herunterladen
- Die Daten entpacken
- Den aktuellen Code durch den neuen ersetzen

Die Umsetzung dieser einfachen Idee in die Realität erwies sich jedoch als weitaus komplexer, als ich zunächst erwartet hatte.

## Der Kampf hinter den Kulissen

Was aus dem GitHub-Thread nicht ersichtlich ist, ist die schiere Komplexität der Aufgabe, die ich mir vorgenommen hatte. Der Code, der zur Implementierung dieser Funktionalität erforderlich war, war undurchsichtig und schwer zu verstehen. Ich fand mich damit konfrontiert, mich mit komplizierten Details darüber auseinanderzusetzen, wie Capacitor-Apps mit Updates und Dateisystemen umgehen.

Viele Nächte verbrachte ich in meinem Van, vertiefte mich in Dokumentationen und experimentierte mit verschiedenen Ansätzen. Der Fortschritt war langsam, und es gab Zeiten, in denen ich mich fragte, ob ich mir zu viel zugemutet hatte.

## Die Community eilt zur Hilfe

Glücklicherweise war ich auf dieser Reise nicht allein. Die Entwickler-Community, insbesondere auf Discord, erwies sich als unschätzbare Ressource. Mitentwickler boten ihre Einblicke an, halfen bei der Fehlersuche und spendeten Ermutigung, wenn es schwierig wurde.

Diese Zusammenarbeit war entscheidend, um die technischen Hürden zu überwinden. Sie bestärkte meinen Glauben an die Kraft von Open Source und gemeinschaftsgetriebener Entwicklung.

## Schnelle Entwicklung und erweiterte Fähigkeiten

Mit Hilfe der Community begann die Entwicklung sich zu beschleunigen. Am 22. November 2021 hatte ich eine funktionierende Version für iOS und verbesserte die Entwicklererfahrung.

Mit fortschreitender Entwicklung fügte ich weitere Funktionen hinzu:
- Android-Unterstützung
- Persistenz zwischen App-Beendigungen
- Die Möglichkeit, zur ursprünglichen App-Version zurückzukehren

Jede neue Funktion brachte ihre eigenen Herausforderungen mit sich, aber auch ein Gefühl der Erfüllung, als das Projekt über seinen ursprünglichen Umfang hinauswuchs.

## Der Start von Capgo

Bis März 2022 hatte sich das Projekt zu einem vollwertigen Produkt entwickelt: Capgo. Ich kündigte die Veröffentlichung eines Auto-Update-Modus an, der es Entwicklern ermöglichte, sich mit ihrem eigenen Backend zu verbinden oder Capgos Backend-Dienst zu nutzen.

Die Reaktion der Community war überwältigend positiv, und Entwickler lobten diese dringend benötigte Lösung.

## Der Wechsel zu einem kostenpflichtigen Produkt

Anfangs hatte ich keine Pläne, Capgo zu monetarisieren. Mein Ziel war es einfach, ein Werkzeug zu schaffen, das ein Problem lösen würde, mit dem ich und andere Entwickler konfrontiert waren. Das Feedback auf GitHub ließ mich jedoch diese Haltung überdenken.

Entwickler äußerten ihre Bereitschaft, für eine Lösung zu bezahlen, die ihre Bedürfnisse zu einem fairen Preis erfüllt. Dieses Feedback, kombiniert mit der Erkenntnis der laufenden Kosten und Anstrengungen, die erforderlich waren, um Capgo zu warten und zu verbessern, führte zu einer entscheidenden Entscheidung.

Am 11. Juni 2022 kündigte ich an, dass Capgo in 15 Tagen beginnen würde, für die Nutzung Gebühren zu erheben, was seinen Übergang von einem Gemeinschaftsprojekt zu einem nachhaltigen Geschäft markierte.

Jedoch blieb ich den Wurzeln des Projekts treu, indem ich den Open-Source-Kern von Capgo beibehielt, indem ich die kostenlose Nutzung des Plugins im manuellen Modus oder mit einem benutzerdefinierten Server ermöglichte.

## Fazit

Meine Reise mit Capgo ist ein Beweis für die Kraft der gemeinschaftsgetriebenen Innovation und die unerwarteten Wege, auf denen sich Solo-Macher oft wiederfinden. Was als persönliche Frustration bei der Arbeit an einer Crossfit-Timer-App begann, entwickelte sich zu einem robusten, erschwinglichen und flexiblen Live-Update-System für Capacitor-Apps.

Die Erschaffung von Capgo war alles andere als einfach.Es erforderte unzählige Arbeitsstunden, die Unterstützung einer großzügigen Entwickler-Community und die Bereitschaft, basierend auf Nutzerfeedback umzuschwenken. Vom Programmieren in einem Airbnb in Portugal bis zum Start eines kostenpflichtigen Produkts war jeder Schritt dieser Reise eine Lernerfahrung.

Während Capgo sich weiterentwickelt, ist es ein Paradebeispiel dafür, wie das Erkennen einer Marktlücke, das aktive Arbeiten daran, diese zu füllen, und das Eingehen auf die Bedürfnisse der Community zur Schaffung wertvoller Tools führen können, die dem gesamten Entwickler-Ökosystem zugutekommen.

Die Geschichte von Capgo ist mehr als nur die Entwicklung eines Tools; es ist eine Geschichte von Ausdauer, Gemeinschaft und der spannenden Unberechenbarkeit des Lebens als Solo-Entwickler.

[here](https://githubcom/capacitor-community/proposals/issues/43#issuecomment-941017142)