---
title: Übersicht
description: Erläuterung der beiden unterschiedlichen Ansätze
sidebar:
  order: 1
locale: de
---

### Cloud Mode (Empfohlen)
Der Cloud-Modus ist unsere empfohlene Wahl für eine problemlose Update-Verwaltung. Das Backend von Capgo übernimmt die gesamte Update-Logik und trifft Entscheidungen über Updates serverseitig für bessere Sicherheit und Kontrolle. Dieser Modus steht für Benutzerfreundlichkeit: Einmal eingerichtet, läuft er reibungslos von selbst und bietet erweiterte Funktionen wie Statistiken und Kanäle. Er kann auch in einem manuellen Modus eingerichtet werden, der Ihnen mehr Kontrolle gibt und es Ihnen ermöglicht, mit Ihrem JavaScript-Code zu entscheiden, wann aktualisiert werden soll. Das Backend verwaltet weiterhin, was aktualisiert wird. Dieser Modus teilt viele Vorteile mit dem Auto-Modus, insbesondere bei Sicherheit und erweiterten Funktionen, fügt aber die Flexibilität hinzu, Updates selbst zu terminieren.

### Self Hosted Mode

Der Self-Hosted Auto-Modus ist für diejenigen gedacht, die die gesamte Update-Logik auf ihrem Server verwalten möchten. Er bietet vollständige Autonomie, erfordert aber einen separaten Server und mehr Aufwand bei der Verwaltung von Updates und Serveranforderungen.

Der Self-Hosted Manual-Modus verbindet Kontrolle und Autonomie. Sie entscheiden über JavaScript, wann aktualisiert wird, aber Ihr Server verwaltet, was aktualisiert wird. Es ist etwas komplex, da Sie Update-Code in die Updates einbinden.

:::note
Wenn Sie sich für das Self-Hosting entscheiden, entgehen Ihnen alle großartigen Funktionen, die Capgo Cloud zu bieten hat, wie z.B.: automatische Rücksetzungen, E-Mail-Benachrichtigungen, Kanäle, Statistiken, Verschlüsselung und mehr.
:::

:::danger
Wenn Sie ein fehlerhaftes Update an Ihre Benutzer senden, können und werden Sie deren App beschädigen.
:::