---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: So erstellen Sie eine Ionic Capacitor-App in Xcode Cloud
description: >-
  Verwenden Sie Xcode Cloud, um Ihre Capacitor JS-App zu erstellen und die
  Notwendigkeit von MacOS zu umgehen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /xcode_cloud.webp
head_image_alt: Capacitor Xcode Cloud-Bau
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: de
---
## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren…

-   Stellen Sie sicher, dass Sie GitHub verwenden
-   Verwenden Sie Capacitor
-   Ihre App ist bereits im Apple Store bereitgestellt
-   Wunsch zu lesen 😆…

Die Verwendung von Ionic ist optional, für Cordova könnte es funktionieren, aber ich habe es nicht ausprobiert.

## Wichtig zum Preis

![Preis Xcode Cloud](/xcode_cloud_price.webp)

[https://developer.apple.com/xcode-cloud/](https://developer.apple.com/xcode-cloud/)

Der Dienst ist ‘_kostenlos’_ bis zur Grenze.  
Sie können im Screenshot Preis und Grenzen sehen (Preise zum Zeitpunkt der Erstellung des Tutorials, sie könnten in Zukunft Änderungen unterliegen)

🔴 **_Nachdem Sie über Anforderungen und Preise informiert wurden, fahren wir fort, wenn es Ihnen gefällt..._**

> **_📣_ Im Beitrag gehen wir davon aus, dass wir die App im Apple Store erstellt haben**

## Einführung

Um Xcode dazu zu bringen, Ihre Capacitor-App zu erstellen, müssen Sie einige Dinge einrichten.

## Paketvorbereitung

Stellen Sie sicher, dass Sie Ihren Build-Befehl in Ihrem `package.json`-Skript haben.  
Fügen Sie dann den Befehl `sync:ios` wie unten hinzu.

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```  
Dieser Schritt lässt das Nachhautskript einfach funktionieren

## Nachklon-Skript  
Dieses Skript wird von Xcode Cloud nach dem Klon-Schritt ausgeführt

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Install CocoaPods
echo "📦 Install CocoaPods"
brew install cocoapods
brew install node@18
brew link node@18

# Install dependencies
# XCode Cloud is literally broken for 2 months now - https://developer.apple.com/forums/thread/738136?answerId=774510022#774510022
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn add --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Speichern Sie diese Datei im Stammverzeichnis Ihres Projekts und nennen Sie sie `ios/App/ci_scripts/ci_post_clone.sh`

Machen Sie diese Datei dann mit diesem Befehl ausführbar `chmod +x ios/App/ci_scripts/ci_post_clone.sh`

## Erstellen Sie einen Xcode-Workflow

Öffnen Sie Xcode (ja, um Xcode zu deinstallieren, benötigen Sie Xcode)

Und gehen Sie zu diesem Tab:  
![Xcode Schritt 1](/xcode_step_1.webp)

Klicken Sie auf Workflow erstellen, wählen Sie Ihre App aus, klicken Sie auf Weiter wie unten.

![Xcode Schritt 2](/xcode_step_2.webp)

Klicken Sie auf Workflow bearbeiten links  
![Xcode Schritt 2](/xcode_step_3.webp)

Gehen Sie zum Tab Umgebungen und wählen Sie wie unten Mac 12.4 aus und aktivieren Sie die passende Option  
![Xcode Schritt 3](/xcode_step_3.webp)

Wählen Sie Ihre Startbedingung.  
Wenn Sie denselben Build wie wir verwenden, schlage ich vor, Tag statt Branch zu verwenden, um doppelte Builds zu vermeiden.

Setzen Sie Ihre Umgebungsvariable  
![Xcode Schritt 4](/xcode_step_4.webp)

Verbinden Sie Ihr GitHub-Konto  
![Xcode Schritt 5](/xcode_step_5.webp)

![Xcode Schritt 6](/xcode_step_6.webp)

Aktivieren Sie dann den Workflow und committen Sie Ihre erste Änderung, Sie sollten sehen, dass Ihr Build in Xcode läuft.

## **Build-Verarbeitung**

In Xcode Cloud **werden Sie basierend auf den Minuten abgerechnet**, die Sie für das Ausführen Ihres CI/CD-Workflows verwendet haben. Aus Erfahrung dauert es etwa 10–15 Minuten, bis ein Build im Apple Store verarbeitet werden kann.

Für private Projekte kann die geschätzte Kosten pro Build bis zu **$0.008/min x 5 Min = $0.4** oder mehr betragen, abhängig von der Konfiguration oder den Abhängigkeiten Ihres Projekts.

Für Open-Source-Projekte sollte dies überhaupt kein Problem sein. Siehe [Preise](https://github.com/pricing/).
