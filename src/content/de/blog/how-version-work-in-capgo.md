---
slug: how-version-work-in-capgo
title: Wie Versionen in Capgo funktionieren
description: >-
  Verstehen Sie, wie Capgo Versionen in Ihrer Capacitor-App verwaltet und nutzen
  Sie es optimal. Erfahren Sie die Bedeutung von Major, Minor und Patch.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Capgo-Bündel-Versionssystem
tag: Tutorial
published: true
locale: de
next_blog: how-to-release-major-version-in-capgo
---

Capgo verwendet zwei Hauptvariablen zur Versionsverwaltung in Ihrer Capacitor-App:
  - Native Version
  - JavaScript-Versionen

Alle Versionsentscheidungen werden serverseitig von Capgo getroffen

## Versionierungssystem

Zur Versionsverwaltung verwendet Capgo das SemVer-System, lesen Sie mehr darüber [hier](https://semver.org/)

### Versionen

Wo Capgo die zu vergleichende Version findet

  > Sie können dieses Verhalten überschreiben, indem Sie den Versionsschlüssel in der `capacitor.config.json` Datei setzen [Dokumentation hier](/docs/plugin/settings/#version)
  > Die native Version wird für alle Plattformen ignoriert

#### iOS

 In iOS wird die Variable in Ihrem Projekt hier gesetzt `ios/App/App/Info.plist` unter dem Schlüssel `CFBundleShortVersionString` oder `ios/App/App.xcodeproj/project.pbxproj` unter dem Schlüssel `MARKETING_VERSION`, wenn `MARKETING_VERSION` in Ihrer `Info.plist` Datei gesetzt wurde

#### Android

  In Android wird die Variable in Ihrem Projekt hier gesetzt `android/app/build.gradle` unter dem Schlüssel `defaultConfig.versionName`

#### JavaScript (Capgo Bundle-Version)

  In JavaScript kann die Variable in Ihrer `package.json` unter dem Schlüssel `version` gesetzt werden
  Andernfalls müssen Sie sie im Upload-Befehl angeben

## Standardverhalten

So verhält sich der Capgo-Kanal, wenn Sie keine Einstellungen geändert haben

> Dieses Verhalten basiert auf dem einzigen Kanal, den Sie als Standard festgelegt haben

### Bei Neuinstallation Ihrer Capacitor-App
Wenn der Benutzer Ihre Ionic-App zum ersten Mal heruntergeladen hat und die App öffnet, kontaktiert sie den Capgo-Server

Derzeit können 4 Ergebnisse eintreten:
  - Die native Bundle-Version (1.2.3) ist niedriger als die Capgo Bundle-Version (1.2.4), Capgo sendet sein Bundle an den Benutzer
  - Die native Bundle-Version (1.2.3) ist gleich der Capgo Bundle-Version (1.2.3), Capgo sendet "kein Update erforderlich"
  - Die native Bundle-Version (1.2.4) ist höher als die Capgo Bundle-Version (1.2.3), Capgo sendet "kein Update erforderlich"
  - Die native Bundle-Version (1.2.3) ist MAJOR niedriger als die Capgo Bundle-Version (2.2.3), Capgo sendet "kein Update erforderlich"

### Weitere Einstellungen

#### Automatisches Downgrade unter Native deaktivieren

Wenn Sie diese Einstellung auf false ändern, betrachtet Capgo sich immer als vertrauenswürdige Quelle der Version
Dann wird das Verhalten:
- Die native Version (1.2.4) ist höher als die Capgo-Version (1.2.3)

> Capgo sendet seine Version an den Benutzer

#### Automatische Upgrade-Strategie deaktivieren

Es gibt mehrere Strategien, aus denen Sie wählen können. Mehr darüber erfahren Sie [hier](/docs/tooling/cli/#disable-updates-strategy)

## JavaScript Bundle-Version

Die JavaScript Bundle-Version ist diejenige, die Sie senden, wenn Sie `npx @capgo/cli@latest bundle upload --channel production` ausführen

Wenn Sie die Option `--bundle 1.2.3` nicht verwendet haben, holt Capgo die Bundle-Version aus Ihrer `package.json` Datei (im Versionsschlüssel)

Nachdem Ihre Ionic-App eine Version von Capgo installiert hat, wird diese Version für Folgendes verglichen:
  - Ihre JavaScript Bundle-Version (1.2.3) ist niedriger als die Capgo Bundle-Version (1.2.4), Capgo sendet sein Bundle an den Benutzer

Mit einigen Schutzbedingungen:
  - Wenn die native Bundle-Version höher als die Capgo-Version ist, wird die Bedingung "Automatisches Downgrade unter Native deaktivieren" angewendet
  - Wenn die native Bundle-Version MAJOR niedriger als die Capgo-Version ist, wird die Bedingung "Automatisches Upgrade über Major deaktivieren" angewendet

## App Store Update

Wenn Sie Ihre Capacitor JS-App im App Store veröffentlichen, passiert Folgendes:

Ihr Benutzer erhält standardmäßig die neue Version aus dem Store und entfernt alle lokalen Updates in seiner App

Wenn Sie dieses Verhalten ändern möchten, müssen Sie die Einstellung `resetWhenUpdate` setzen. Lesen Sie mehr darüber [hier](/docs/plugin/api#settings)

Dies kann nur auf der App-Seite geändert werden, nicht von der Cloud aus wie andere Einstellungen

### Weitere Einstellungen

Nach all diesem Verhalten können Sie darüber hinaus einige spezifische Einstellungen für die Geräte-ID haben

In Capgo können Sie entscheiden, das Verhalten für jede Geräte-ID zu überschreiben

Sie können eine Geräte-ID verknüpfen mit:
  - einer spezifischen Bundle-Version
  - einem spezifischen Kanal

Dies umgeht alle oben genannten Einstellungen

Erfahren Sie mehr darüber im folgenden Artikel