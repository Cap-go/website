---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Cómo compilar una aplicación Ionic Capacitor en Xcode Cloud
description: >-
  Verwende Xcode Cloud, um deine Capacitor JS App zu erstellen und umgehe die
  Notwendigkeit von MacOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Xcode Cloud-Builds mit Capacitor
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: de
---

## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren...

-   Stellen Sie sicher, dass Sie GitHub verwenden
-   Verwenden Sie Capacitor
-   Ihre App ist bereits im Apple Store veröffentlicht
-   Lust zum Lesen 😆...

Die Verwendung von Ionic ist optional, für Cordova könnte es funktionieren, aber ich habe es nicht getestet

## Wichtiges zum Preis

![Price Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

Der Service ist '_kostenlos_' bis zum Limit  
Sie können im Screenshot die Preise und Limits sehen (Preise zum Zeitpunkt der Erstellung des Tutorials, sie könnten sich in Zukunft ändern)

🔴 **_Nachdem Sie über die Anforderungen und Preise informiert wurden, können wir fortfahren, wenn Sie möchten_**

> **_📣_ In diesem Beitrag gehen wir davon aus, dass wir die App bereits im Apple Store erstellt haben**

## Einführung

Damit Xcode Ihre Capacitor-App erstellen kann, müssen Sie einige Dinge einrichten

## Paket-Vorbereitung

Stellen Sie sicher, dass Sie Ihren Build-Befehl in Ihrem `packagejson` Script haben
Fügen Sie dann den `sync:ios` Befehl wie unten hinzu

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Dieser Schritt wird dafür sorgen, dass das Post-Script einfach funktioniert

## Post-Clone-Script
Dieses Script wird von Xcode Cloud nach dem Clone-Schritt ausgeführt

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
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Speichern Sie diese Datei im Root-Verzeichnis Ihres Projekts unter dem Namen `ios/App/ci_scripts/ci_post_clonesh`

Machen Sie diese Datei dann ausführbar mit diesem Befehl `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Xcode-Workflow erstellen

Öffnen Sie Xcode (ja, um Xcode zu entfernen, brauchen Sie Xcode)

Und gehen Sie zu diesem Tab:
![Xcode step 1](/xcode_step_1webp)

Klicken Sie auf Workflow erstellen, wählen Sie Ihre App aus, klicken Sie wie unten gezeigt auf Weiter

![Xcode step 2](/xcode_step_2webp)

Klicken Sie links auf Workflow bearbeiten
![Xcode step 2](/xcode_step_3webp)

Gehen Sie zum Umgebungs-Tab und wählen Sie wie unten Mac 124 und aktivieren Sie die entsprechende Option
![Xcode step 3](/xcode_step_3webp)

Wählen Sie Ihre Startbedingung
Wenn Sie den gleichen Build wie wir verwenden, empfehle ich, Tag statt Branch zu verwenden, um Doppel-Builds zu vermeiden

Legen Sie Ihre Umgebungsvariablen fest
![Xcode step 4](/xcode_step_4webp)

Verbinden Sie Ihr GitHub-Konto
![Xcode step 5](/xcode_step_5webp)

![Xcode step 6](/xcode_step_6webp)

Aktivieren Sie dann den Workflow und committen Sie Ihre erste Änderung, Sie sollten Ihren Build in Xcode laufen sehen

## **Build-Verarbeitung**

In Xcode Cloud **werden Sie nach den Minuten abgerechnet**, die Sie für die Ausführung Ihres CI/CD-Workflows verwendet haben. Aus Erfahrung dauert es etwa 10-15 Minuten, bis ein Build im Apple Store verarbeitet werden kann

Für private Projekte können die geschätzten Kosten pro Build bis zu **$0.008/min x 5 mins = $0.04** oder mehr betragen, abhängig von der Konfiguration oder den Abhängigkeiten Ihres Projekts

Für Open-Source-Projekte sollte dies überhaupt kein Problem sein. Siehe [Preise](https://githubcom/pricing/)