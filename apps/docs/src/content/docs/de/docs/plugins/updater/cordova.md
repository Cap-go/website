---
title: "Cordova"
locale: de
description: "Untersuchung der möglichen Verfügbarkeit des capacitor-updater-Plugins für Cordova und der Herausforderungen bei seiner Entwicklung."
sidebar:
  order: 8
---

Sie haben sich gefragt, ob dieses Plugin jemals für Cordova verfügbar sein wird.

Wir haben ein F&E-Repository dafür gestartet, aber es ist eine enorme Menge an Arbeit.

## Probleme

Wir wissen, dass wir es schaffen können, aber dafür müssen wir den gesamten Code der Cordova-Codebasis lesen, wie wir es für Capacitor getan haben, um zu verstehen, wie es mit allen Capgo-Funktionen funktioniert.

Die Android-Version ist einfacher zu erstellen, da beide Java verwenden, aber iOS erfordert eine vollständige Neuschreibung, da Swift in Cordova noch nicht gut unterstützt wird.

## Lösung

In der Zwischenzeit können Sie Folgendes tun:

* [Unterstützen Sie uns](https://github.com/sponsors/cap-go) auf GitHub und wir können dies priorisieren.
Dies wird mindestens 1 Monat Arbeit erfordern.
* Engagieren Sie uns als [Berater](https://capgo.app/consulting/), wir sind es gewohnt, großen Unternehmen bei der Migration zu Capacitor zu helfen, es dauert normalerweise einen Monat, und der [Nutzen](https://ionic.io/resources/articles/capacitor-vs-cordova-modern-hybrid-app-development) ist enorm für Ihr Team
