---
slug: how-to-release-major-version-in-capgo
title: So veröffentlichen Sie eine Hauptversion in Capgo
description: >-
  Verstehen Sie, wie und wann es notwendig ist, eine Hauptversion Ihrer App zu
  veröffentlichen, ohne die Benutzer-App zu beschädigen
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgo-Hauptversionssystem
tag: Tutorial
published: true
locale: de
next_blog: how-to-send-specific-version-to-users
---

## Bei der Veröffentlichung einer Hauptversion

Die Versionierung kann schwierig zu handhaben sein. Normalerweise möchte man ein Major-Update senden, wenn eine große Änderung für die Benutzer erscheint.

Aber die Versionierung ist nicht dafür gedacht. Die App-Store-Version unterscheidet sich von der nativen Version.

Die native Version dient dazu, bahnbrechende Änderungen im *Code* zu verwalten.

Bei iOS beispielsweise ist iOS 16 die `Store-Version` von Apple, aber die Code-Version ist `20A5283p` (sie scheinen dort kein SemVer zu verwenden).

Jetzt ist klar, dass wir sie nicht vermischen und sie für das verwenden, wofür sie gemacht sind!

## Hauptveröffentlichung

In Ihrer Capacitor-App ist eine Hauptveröffentlichung erforderlich, wenn eine bahnbrechende Änderung auftritt.
Zum Beispiel ein neues iOS-Ziel (15 auf 16) oder eine neue Version von Capacitor (3 auf 4) oder ein von Ihnen verwendetes Plugin (12 auf 20) wurde auf eine Hauptversion aktualisiert.

Diese Änderung bedeutet, dass alle Tools angepasst werden müssen, um die bahnbrechende Änderung zu bewältigen.

Deshalb folgt Capgo diesem System.
Wenn Sie also eine Hauptversion veröffentlichen, wird Capgo sie nicht an einen Benutzer senden, der sie nicht aus dem Store installiert hat.
Dieses Verhalten kann angepasst werden. Mehr darüber erfahren Sie [hier](/docs/tooling/cli/#disable-updates-strategy).

### Versionen

Wo Capgo die zu vergleichende Version findet

#### iOS
  > Wird von Capgo verwendet, um mit der JavaScript-Version zu vergleichen und Major-Upgrades zu finden

 In iOS wird die Variable in Ihrem Projekt hier gesetzt: `ios/App/App/Infoplist` unter dem Schlüssel `CFBundleShortVersionString` oder `ios/App/Appxcodeproj/projectpbxproj` unter dem Schlüssel `MARKETING_VERSION`, wenn `MARKETING_VERSION` in Ihrer `Infoplist`-Datei gesetzt wurde.
  > Sie können dieses Verhalten überschreiben, indem Sie den Versionsschlüssel in der `capacitorconfigjson`-Datei setzen [Dokumentation hier](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Wird von Capgo verwendet, um mit der JavaScript-Version zu vergleichen und Major-Upgrades zu finden

  Bei Android wird die Variable in Ihrem Projekt hier gesetzt: `android/app/buildgradle` unter dem Schlüssel `defaultConfigversionName`
  > Sie können dieses Verhalten überschreiben, indem Sie den Versionsschlüssel in der `capacitorconfigjson`-Datei setzen [Dokumentation hier](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Wird von Capgo verwendet, um mit der nativen Version zu vergleichen und Major-Upgrades zu finden

  In JavaScript wird die Variable in Ihrem Projekt hier gesetzt: `packagejson` unter dem Schlüssel `version`

## Beispiel

Ihre Ionic-App ist derzeit mit der Version `1.2.3` mit Capacitor 3 veröffentlicht.

Sie führen das Upgrade auf Capacitor 4 durch.

Sie müssen Ihre Versionsnummer auf `2.2.3` aktualisieren, dann werden alle Ihre Pakete einschließlich Capgo diese große Änderung bemerken.

Wenn Sie diese Version an Capgo und den App Store veröffentlichen.

Alle nächsten Live-Updates in Capgo `2.2.4` werden niemals an Benutzer mit Version `1.2.3` gesendet, nur an Benutzer mit Version `2.2.3`.

Wenn Sie diesem Muster folgen, müssen Sie sich keine weiteren Sorgen machen, alles wird gut gehandhabt.

## Wenn ich diesem nicht folge

In diesem Fall bedeutet das, dass Sie Ihre neue App mit Capacitor 4 an Apple und Google senden müssen, aber nicht an Capgo.

Dann müssen Sie warten, bis 100% Ihrer Benutzer oder zumindest 90% die App haben, was wahrscheinlich Monate dauern wird.

Während dieser Zeit können Sie keine Updates mit Capgo senden, da alte Benutzer die neue Version nicht erhalten können.
Sie haben keine Möglichkeit, nur bestimmte Benutzer auszuwählen, die das Update erhalten sollen.