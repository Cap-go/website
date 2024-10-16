---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Wie man eine Ionic Capacitor App in Xcode Cloud baut
description: >-
  Nutze Xcode Cloud, um deine Capacitor JS-App zu erstellen und umgehe die
  Notwendigkeit von MacOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Capacitor Xcode-Cloud-Build
tag: Tutorial
published: true
locale: de
---

## Voraussetzungen

Bevor Sie mit dem Tutorial fortfahren…

-   Stellen Sie sicher, dass Sie GitHub verwenden
-   Verwenden Sie Capacitor
-   Ihre App ist bereits im Apple Store veröffentlicht
-   Lust zum Lesen 😆…

Die Verwendung von Ionic ist optional, für Cordova könnte es funktionieren, aber ich habe es nicht ausprobiert

## Wichtiges zum Preis

![Preis Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

Der Service ist 'kostenlos' bis zur Grenze  
Sie können im Screenshot Preise und Limits sehen (Preise zum Zeitpunkt der Erstellung des Tutorials, sie könnten sich in Zukunft ändern)

🔴 **_Nachdem Sie über Anforderungen und Preise informiert wurden, wenn Sie möchten, fahren wir fort_**

> **_📣_ In diesem Beitrag gehen wir davon aus, dass wir die App bereits im Apple Store erstellt haben**

## Einführung

Damit Xcode Ihre Capacitor-App erstellen kann, müssen Sie einige Dinge einrichten

## Paketvorbereitung

Stellen Sie sicher, dass Sie Ihren Build-Befehl in Ihrem `packagejson`-Skript haben
Fügen Sie dann den `sync:ios`-Befehl wie unten hinzu

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Dieser Schritt wird dafür sorgen, dass das Post-Skript einfach funktioniert

## Post-Clone-Skript
Dieses Skript wird von Xcode Cloud nach dem Klonen ausgeführt

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

Speichern Sie diese Datei im Stammverzeichnis Ihres Projekts und nennen Sie sie `ios/App/ci_scripts/ci_post_clonesh`

Machen Sie diese Datei dann mit diesem Befehl ausführbar: `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Erstellen eines Xcode-Workflows

Öffnen Sie Xcode (ja, um Xcode zu entfernen, benötigen Sie Xcode)

Und gehen Sie zu diesem Tab:
![Xcode Schritt 1](/xcode_step_1webp)

Klicken Sie auf Workflow erstellen, wählen Sie Ihre App aus, klicken Sie auf Weiter wie unten gezeigt

![Xcode Schritt 2](/xcode_step_2webp)

Klicken Sie links auf Workflow bearbeiten
![Xcode Schritt 2](/xcode_step_3webp)

Gehen Sie zum Umgebungen-Tab und wählen Sie wie unten gezeigt Mac 124 aus und aktivieren Sie die entsprechende Option
![Xcode Schritt 3](/xcode_step_3webp)

Wählen Sie Ihre Startbedingung
Wenn Sie denselben Build wie wir verwenden, schlage ich vor, Tag anstelle von Branch zu verwenden, um doppelte Builds zu vermeiden

Legen Sie Ihre Umgebungsvariable fest
![Xcode Schritt 4](/xcode_step_4webp)

Verbinden Sie Ihr GitHub-Konto
![Xcode Schritt 5](/xcode_step_5webp)

![Xcode Schritt 6](/xcode_step_6webp)

Aktivieren Sie dann den Workflow und committen Sie Ihre erste Änderung, Sie sollten sehen, wie Ihr Build in Xcode läuft

## **Build-Verarbeitung**

In Xcode Cloud **werden Sie basierend auf den Minuten abgerechnet**, die Sie für die Ausführung Ihres CI/CD-Workflows verwendet haben. Aus Erfahrung dauert es etwa 10-15 Minuten, bevor ein Build im Apple Store verarbeitet werden kann

Für private Projekte können die geschätzten Kosten pro Build bis zu **$0,008/Min x 5 Min = $0,4** betragen, oder mehr, abhängig von der Konfiguration oder den Abhängigkeiten Ihres Projekts

Für Open-Source-Projekte sollte dies überhaupt kein Problem sein. Siehe [Preisgestaltung](https://githubcom/pricing/)