---
slug: de__appcenter-migration
title: Migration von App Center zu Capgo
description: >-
  In diesem Leitfaden gehen wir die vollständige Migration für Capgo Live
  Updates, eine Alternative zu Microsoft CodePush, Schritt für Schritt durch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS-Entwickler sucht nach Alternative
tag: Migration
published: true
locale: de
next_blog: automatic-build-and-release-with-github-actions
---

## Migrationszusammenfassung

* [Capgo](/register/) ist ein Dienst, der Entwicklungsteams beim Senden von Live-Apps an bereitgestellte Apps unterstützt
* Capacitor JS-Apps, die in jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic oder sogar Ihrer eigenen benutzerdefinierten Lösung geschrieben wurden, können migriert werden **Eine bestehende Ionic-App ist nicht erforderlich**
* [Colt](https://voltbuild/) bietet äquivalente Dienste für App Center Build (Erstellung von Android/iOS-Apps) für Test-, Diagnose- und Analysedienste

##### Hinweis

Wenn Ihre App noch Cordova verwendet, ist es notwendig, [zuerst zu Capacitor zu migrieren](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/), bevor Sie zu Capgo migrieren

Vom Ionic-Team als geistiger Nachfolger von Cordova entwickelt, ermöglicht Capacitor die Entwicklung näher an den nativen Werkzeugen und Fähigkeiten mit dem Ziel, eine noch bessere Benutzererfahrung und Leistung zu bieten

Glücklicherweise ist der Migrationsprozess einfach und die Mehrheit der Cordova-Plugins ist rückwärtskompatibel mit Capacitor [Beginnen Sie hier mit der Migration](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/)

## Über Capgo

Capgo kümmert sich um die Aktualisierung von Apps im Laufe der Zeit. Entwicklungsteams können sich vollständig auf die einzigartigen Funktionen ihrer App konzentrieren und den komplizierten App-Bereitstellungsprozess an Capgo auslagern

Capgo füllt die Lücken zwischen Web-Bereitstellung und Mobilgeräten

## Capgo Voraussetzungen

Wie App Center unterstützt [Capgo](/register/) Apps, die in Git-Repositories auf Azure DevOps, Bitbucket, GitHub und GitLab gehostet werden

### Installieren Sie Capgo CLI

##### Hinweis

Sie müssen Node und NPM auf Ihrem Computer installiert haben, bevor Sie fortfahren. Verwenden Sie immer die [aktuelle LTS-Version](https://nodejs.org/). Capgo unterstützt keine älteren Versionen

### Erstellen Sie `package.json` und Capacitor-Konfigurationsdateien

##### Hinweis

Bevor Sie beginnen, empfehle ich, Änderungen auf einem frischen Git-Branch vorzunehmen

Da [Capgo](/register/) zur Automatisierung von Capacitor-Apps erstellt wurde, benötigt es eine Datei, die Ihre App möglicherweise nicht hat. Erstellen Sie zunächst eine `capacitor.config.json` Datei. Der einfachste Weg, sie zu erstellen, ist, im Stammverzeichnis Ihrer App Folgendes auszuführen:

```shell
npm install @capacitor/core
```

Initialisieren Sie dann Capacitor mit dem CLI-Fragebogen:

```shell
npx cap init
```

Die CLI wird Ihnen einige Fragen stellen, beginnend mit Ihrem App-Namen und der Paket-ID, die Sie für Ihre App verwenden möchten

Committen Sie schließlich die neuen Dateien in Ihr Projekt:

    git add . && git commit -m "added package.json and capacitor config" && git push

### Migrieren Sie den Code

Nachdem Sie die neuen erforderlichen [Capgo](/register/) Dateien eingerichtet haben, können Sie sich der eigentlichen App zuwenden. [Capgo](/register/) erwartet, dass sich die gesamte gebaute App in einem Verzeichnis namens `dist` befindet

Wenn sich Ihr gebauter Code nicht in einem `dist`-Verzeichnis befindet, ändern Sie diesen Wert in der Capacitor-Konfigurationsdatei

So sollte die Verzeichnisstruktur der App aussehen:

![App-Struktur](/directory_looklike.webp)

## Capgo Konfiguration

Wenn Ihre App für die [Capgo](https://web.capgo.app/) Integration bereit ist, ist es Zeit, sich anzumelden und Ihren API-Schlüssel zu erhalten, um Ihre erste Version hochzuladen! Beginnen Sie mit der [Anmeldung für ein Capgo-Konto](/register/)

Sobald Sie bei Capgo eingeloggt sind, navigieren Sie zur Kontoseite, klicken Sie dann auf API-Schlüssel und anschließend auf den 'write'-Schlüssel, um ihn in die Zwischenablage zu kopieren

### Installieren Sie das Capgo SDK

Führen Sie von einer Kommandozeile direkt im Stammverzeichnis Ihres Capacitor-App-Ordners den folgenden Befehl aus:

`npm i @capgo/capacitor-updater && npx cap sync`
Um das Plugin in Ihre Capacitor-App zu installieren

Fügen Sie dann diesen Code als Ersatz für den CodePush-Code zu Ihrer App hinzu:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Dies teilt dem nativen Plugin mit, dass die Installation erfolgreich war

## Bereitstellen von Live-Updates (CodePush-Alternative)

Die Live-Update-Funktion funktioniert, indem das installierte [Capgo SDK](https://github.com/Cap-go/capacitor-updater/) in Ihrer nativen Anwendung verwendet wird, um auf ein bestimmtes Deploy-Kanal-Ziel zu hören. Wenn ein Web-Build einem Kanal-Ziel zugewiesen wird, wird dieses Update auf Benutzergeräten bereitgestellt, die so konfiguriert sind, dass sie auf das angegebene Kanal-Ziel hören### Anmeldung bei Capgo CLOUD

Verwenden Sie zuerst den `all` [API-Schlüssel](https://webcapgoapp/dashboard/apikeys/), der in Ihrem Konto vorhanden ist, um sich mit der CLI anzumelden:

```shell
npx @capgo/cli@latest login YOURKEY
```

## Fügen Sie Ihre erste App hinzu

Beginnen wir damit, die App in Capgo Cloud mit der CLI zu erstellen

`npx @capgo/cli@latest app add`

Dieser Befehl verwendet alle in der Capacitor-Konfigurationsdatei definierten Variablen, um die App zu erstellen

## Laden Sie Ihr erstes Paket hoch

Führen Sie den Befehl aus, um Ihren Code zu erstellen und an Capgo zu senden:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Standardmäßig ist der Versionsname derjenige in Ihrer `packagejson`-Datei

Überprüfen Sie in [Capgo](https://webcapgoapp/), ob der Build vorhanden ist

Sie können es sogar mit meiner [mobilen Sandbox-App](https://capgoapp/app_mobile/) testen

### Machen Sie den Kanal zum Standard

Nachdem Sie Ihre App an Capgo gesendet haben, müssen Sie Ihren Kanal `default` machen, damit Apps Updates von Capgo erhalten können

```shell
npx @capgo/cli@latest channel set production -s default
```

## Konfigurieren Sie die App zur Validierung von Updates

Fügen Sie diese Konfiguration zu Ihrer Haupt-JavaScript-Datei hinzu

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Führen Sie dann `npm run build && npx cap copy` aus, um Ihre App zu aktualisieren

### Empfangen Sie ein Live-Update auf einem Gerät

Damit Ihre Anwendung ein Live-Update von Deploy empfangen kann, müssen Sie die App auf einem Gerät oder einem Emulator ausführen Der einfachste Weg, dies zu tun, ist einfach den folgenden Befehl zu verwenden, um Ihre lokale App in einem Emulator oder einem mit Ihrem Computer verbundenen Gerät zu starten

    npx cap run [ios | android]

Öffnen Sie die App, legen Sie sie in den Hintergrund und öffnen Sie sie erneut, Sie sollten in den Logs sehen, dass die App das Update durchgeführt hat

Glückwunsch! 🎉 Sie haben erfolgreich Ihr erstes Live-Update bereitgestellt Dies ist nur der Anfang dessen, was Sie mit Live-Updates machen können Um mehr zu erfahren, sehen Sie sich die vollständigen [Live-Updates-Docs](/docs/plugin/cloud-mode/getting-started/) an

## Entfernen Sie App Center-Abhängigkeiten

Nachdem wir Capgo's Dienste integriert haben, sollten Sie alle Verweise auf App Center entfernen Neben der Best Practice, ungenutzten Code/Dienste zu entfernen, sollte das Entfernen des SDKs die Größe Ihrer Apps reduzieren

Öffnen Sie zuerst ein Terminal und deinstallieren Sie dann die App Center-Plugins:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Öffnen Sie als Nächstes `configxml` und entfernen Sie die folgenden `preference`-Werte Sie werden ähnlich aussehen wie:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Wenn Sie App Center Analytics in Ihrer App verwendet haben, entfernen Sie die folgenden `preferences`-Elemente: `APPCENTER_ANALYTICS_ENABLE_IN_JS` und `APPCENTER_CRASHES_ALWAYS_SEND`

Entfernen Sie die folgenden `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />`-Elemente:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Entfernen Sie den Verweis auf CodePush im CSP `meta`-Tag in der `indexhtml`-Datei (`https://codepushappcenterms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Entfernen Sie schließlich innerhalb Ihrer App alle Code-Verweise auf App Center-Dienste, wie zum Beispiel `codePushsync();`

## Nächste Schritte

Sie haben von App Center zu Capgo migriert und nutzen die Live-Updates Dies ist nur der Anfang dessen, was Sie mit Capgo machen können Erkunden Sie den Rest des Dienstes, einschließlich Kanal (mehrere Umgebungen) und Override Cloud CLI-Integration, verwenden Sie Capgo in Ihrer CI/CD-Plattform Ihrer Wahl (wie GitHub Action, GitLab, Jenkins und mehr)

## Automatisches Senden von App-Updates

Wenn Ihr Code auf GitHub gehostet wird, können Sie dank GitHub Actions in wenigen weiteren Schritten automatische Builds und Releases einrichten

Ich habe einen zweiten Artikel geschrieben, der Ihnen dies ermöglicht

## Danksagung

Vielen Dank an [Ionic](https://ioniccom/), dieser Artikel basiert auf [diesem Artikel](https://ionicio/blog/moving-from-microsoft-app-center-to-ionic-appflow/), der mit chat-gpt-3 umgeschrieben und angepasst wurde