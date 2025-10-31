---
slug: appcenter-migration
title: Migration von App Center zu Capgo
description: >-
  In diesem Leitfaden führen wir Sie durch die vollständige Migration für Capgo
  Live Updates, eine Alternative zu Microsoft CodePush.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2025-10-31T10:28:43.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS Dev auf der Suche nach einer Alternative
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: de
next_blog: automatic-build-and-release-with-github-actions
---

## Migrations-Zusammenfassung

* [Capgo](/register/) ist ein Dienst, der Entwicklungsteams hilft, Live-Apps an bereitgestellte Apps zu senden
* Capacitor JS-Apps, die in jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic oder sogar Ihrer eigenen individuellen Lösung geschrieben wurden, können migriert werden. **Eine bestehende Ionic-App ist nicht erforderlich**
* [Colt](https://voltbuild/) bietet äquivalente Dienste für App Center Build (Android/iOS-Apps erstellen) für Test-, Diagnose- und Analysedienste

##### Hinweis

Wenn Ihre App noch Cordova verwendet, ist es notwendig, [zuerst zu Capacitor zu migrieren](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/), bevor Sie zu Capgo migrieren

Von Ionic-Team als geistiger Nachfolger von Cordova entwickelt, ermöglicht Capacitor die Entwicklung näher an den nativen Werkzeugen und Fähigkeiten mit dem Ziel, eine noch bessere Benutzererfahrung und Leistung zu bieten

Glücklicherweise ist der Migrationsprozess einfach und die Mehrheit der Cordova-Plugins ist rückwärtskompatibel mit Capacitor [Starten Sie hier mit der Migration](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/)

## Über Capgo

Capgo verwaltet die Aktualisierung von Apps im Laufe der Zeit. Entwicklungsteams können sich vollständig auf die einzigartigen Funktionen ihrer App konzentrieren und den komplizierten App-Bereitstellungsprozess an Capgo auslagern

Capgo füllt die Lücken zwischen Web-Bereitstellung und Mobile

## Capgo-Voraussetzungen

Wie App Center unterstützt [Capgo](/register/) Apps, die in Git-Repositories auf Azure DevOps, Bitbucket, GitHub und GitLab gehostet werden

### Capgo CLI installieren

##### Hinweis

Node und NPM müssen auf Ihrem Computer installiert sein, bevor Sie fortfahren. Verwenden Sie immer die [aktuelle LTS-Version](https://nodejsorg/). Capgo unterstützt keine älteren Versionen

### Erstellen Sie `package.json` und Capacitor-Konfigurationsdateien

##### Hinweis

Bevor Sie beginnen, empfehle ich, Änderungen in einem neuen Git-Branch vorzunehmen

Da [Capgo](/register/) zur Automatisierung von Capacitor-Apps erstellt wurde, benötigt es eine Datei, die Ihre App möglicherweise nicht hat. Erstellen Sie zunächst eine `capacitor.config.json` Datei. Der einfachste Weg, sie zu erstellen, ist im Root-Verzeichnis Ihrer App:

[[CODE_BLOCK]]

Initialisieren Sie dann Capacitor mit dem CLI-Fragebogen:

[[CODE_BLOCK]]

Die CLI wird Ihnen einige Fragen stellen, beginnend mit Ihrem App-Namen und der Paket-ID, die Sie für Ihre App verwenden möchten

Committen Sie schließlich die neuen Dateien in Ihr Projekt:

    git add . && git commit -m "added package json and capacitor config" && git push

### Code migrieren

Nachdem Sie die neuen erforderlichen [Capgo](/register/) Dateien eingerichtet haben, können Sie sich der eigentlichen App zuwenden. [Capgo](/register/) erwartet, dass sich die gesamte gebaute App in einem Verzeichnis namens `dist` befindet

Wenn sich Ihr gebauter Code nicht in einem `dist`-Verzeichnis befindet, ändern Sie diesen Wert in der Capacitor-Konfigurationsdatei

So sollte die Verzeichnisstruktur der App aussehen:

![App-Struktur](/directory_looklike.webp)

## Capgo-Konfiguration

Wenn Ihre App bereit für die [Capgo](https://console.capgo.app/)-Integration ist, ist es Zeit, sich anzumelden und Ihren API-Schlüssel zu erhalten, um Ihre erste Version hochzuladen! Beginnen Sie mit der [Anmeldung für ein Capgo-Konto](/register/)

Sobald Sie bei Capgo eingeloggt sind, navigieren Sie zur Kontoseite, klicken Sie dann auf API-Schlüssel und dann auf den 'write'-Schlüssel, um ihn in die Zwischenablage zu kopieren

### Capgo SDK installieren

Führen Sie von einer Kommandozeile direkt im Root-Verzeichnis Ihres Capacitor-App-Ordners den folgenden Befehl aus:

`npm i @capgo/capacitor-updater && npx cap sync`
Um das Plugin in Ihre Capacitor-App zu installieren

Und fügen Sie dann diesen Code als Ersatz für den CodePush-Code zu Ihrer App hinzu:

[[CODE_BLOCK]]

Dies teilt dem nativen Plugin mit, dass die Installation erfolgreich war

## Live-Updates bereitstellen (CodePush-Alternative)

Die Live-Update-Funktion arbeitet, indem das installierte [Capgo SDK](https://github.com/Cap-go/capacitor-updater/) in Ihrer nativen Anwendung verwendet wird, um auf einen bestimmten Deploy-Channel-Zielort zu hören. Wenn ein Web-Build einem Channel-Zielort zugewiesen wird, wird dieses Update auf Benutzergeräte bereitgestellt, die so konfiguriert sind, dass sie auf den angegebenen Channel-Zielort hören
