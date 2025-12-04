---
slug: automatic-build-and-release-with-github-actions
title: Automatisches Erstellen und Veröffentlichen von Apps mit Github-Aktionen
description: >-
  Erstelle deine eigene CI/CD-Pipeline mit Github Actions kostenlos, deploye
  deine Ionic Capacitor JS-App jedes Mal, wenn du in den Main branch pushst.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /github_actions.webp
head_image_alt: Github-Aktionsillustration
keywords: 'Github actions, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: de
next_blog: automatic-capacitor-ios-build-github-action
---
Dieses Tutorial konzentriert sich auf das Hosting bei GitHub, aber du kannst es mit kleinen Anpassungen auf jede andere CI/CD-Plattform anwenden.

## Vorwort

Stelle sicher, dass du zunächst deine Capacitor-App zu Capgo hinzugefügt hast, dieses Tutorial konzentriert sich nur auf die Upload-Phase. Wenn du deine App zu Capgo hinzufügen musst, kannst du dieses [Tutorial](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/) befolgen.

## Commit-Konvention

Zuerst musst du beginnen, der Commit-Konvention [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) zu folgen, dies wird dem Tool helfen zu verstehen, wie die Versionsnummer aktualisiert werden soll, es dauert 5 Minuten, um es zu lernen.

![Conventional commits](/conventional_commits.webp)

## GitHub-Workflows für Tags

Dann musst du deine erste GitHub-Aktion erstellen, um automatisch zu bauen und Tags zu erstellen.

Erstelle eine Datei unter diesem Pfad: `.github/workflows/bump_version.yml`

mit diesem Inhalt:

```toml
name: Bump version

on:
  push:
    branches:
      - main

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v6
        with:
          fetch-depth: 0
          filter: blob:none
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        run: npx capacitor-standard-version
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags
```

Dies wird für jedes Commit in deinem Hauptbranch ein Tag freigeben. Und fügt einen Eintrag in das Änderungsprotokoll für jedes Commit im Hauptbranch in `CHANGELOG.md` hinzu.

Mach dir keine Sorgen, wenn du diese Datei nicht hast, sie wird für dich erstellt.

Um dies zum Laufen zu bringen, erstelle einen [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _in_ deinem GitHub [Geheimnis](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") als `PERSONAL_ACCESS_TOKEN`.

Dies ist notwendig, damit die CI das Änderungsprotokoll committen kann.

Wenn du das Token erstellst, wähle als Ablaufdatum `nie` und den Bereich als `repo`.

Setze zuletzt die Version in deiner `package.json`-Datei, synchronisiere sie mit deiner nativen Versionsnummer, die das nächste Schritt erleichtert.

Dies ist nur beim ersten Mal notwendig, danach halten die Tools es auf dem neuesten Stand.

Du kannst jetzt beide Dateien committen und sehen, wie dein erstes Tag in GitHub erscheint!

Sowohl die native als auch die Web-Plattform werden nach jedem Commit die Versionsnummer aktualisieren.

## GitHub-Workflows für Builds

Erstelle eine Datei unter diesem Pfad: `.github/workflows/build.yml`

mit diesem Inhalt:

```yml
name: Build source code and send to Capgo

on:
  push:
    tags:
      - '*'
      
jobs:
  deploy:
    runs-on: ubuntu-latest
    name: "Build code and release"
    steps:
      - name: Check out
        uses: actions/checkout@v6
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Dies wird deine Abhängigkeiten installieren und bauen, bevor sie nach Capgo gesendet werden.

Wenn dein Befehl zum Bauen anders ist, kannst du ihn im Schritt `build_code` ändern.

Um dies zum Laufen zu bringen, musst du deinen API-Schlüssel für Capgo abrufen und ihn im [Geheimnis deines GitHub-Repositories](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) als `CAPGO_TOKEN` hinzufügen.

Du kannst jetzt beide Dateien committen und sehen, wie dein erstes Tag in GitHub erscheint!

Der Commit wird einen neuen Build für den Produktionskanal generieren.

Du solltest deinen Test im Build-Schritt hinzufügen, um sicherzustellen, dass dein Code funktioniert.

Gehe zu deinem Capgo-Dashboard und überprüfe deinen Build, der gerade erschienen ist, du hast jetzt dein CI/CD-System.

Wenn du möchtest, dass alle deine Nutzer das Update erhalten, wann immer es verfügbar ist, gehe zu deinem Kanal und setze ihn auf `öffentlich`.

Du kannst auch den nativen Build deiner Ionic Capacitor JavaScript-App hinzufügen, indem du dieses Tutorial folgst 👇
