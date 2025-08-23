---
slug: manage-dev-and-prod-build-with-github-actions
title: Verwalte Entwicklungs- und Produktionsbuilds mit GitHub-Aktionen
description: >-
  Verwenden Sie Capgo, um Ihr Entwicklungsbuild an einen bestimmten Kanal
  freizugeben, und lassen Sie Ihr Team Ihre Capacitor Ionic-App ausprobieren,
  ohne auf die Überprüfung durch Apple und Google zu warten.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Channel-Bauten-Illustration
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: de
next_blog: how-to-send-specific-version-to-users
---
Dieses Tutorial konzentriert sich auf das Hosting von GitHub, aber Sie können es mit einer kleinen Anpassung auf jede andere CI/CD-Plattform anpassen.

## Vorwort

Stellen Sie sicher, dass Sie Ihre Capacitor-App zuerst zu Capgo hinzugefügt haben, dieses Tutorial konzentriert sich nur auf die Upload-Phase.

## Commit-Konvention

Zuerst müssen Sie die Commit-Konvention [konventionelle Commits](https://www.conventionalcommits.org/en/v1.0.0/) folgen, dies wird den Tools helfen zu verstehen, wie die Versionsnummer aktualisiert wird, es dauert 5 Minuten, um es zu lernen.

![Konventionelle Commits](/conventional_commits.webp)

## GitHub-Aktionen für Tags

Dann müssen Sie Ihre erste GitHub-Aktion erstellen, um automatisch zu bauen und Tags zu erstellen.

Erstellen Sie eine Datei unter diesem Pfad: `.github/workflows/bump_version.yml`

mit diesem Inhalt:

```toml
name: Bump version

on:
  push:
    branches:
      - main
      - development

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v5
        with:
          fetch-depth: 0
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        if: github.ref == 'refs/heads/main'
        run: npx capacitor-standard-version
      - name: Create bump and changelog
        if: github.ref != 'refs/heads/main'
        run: npx capacitor-standard-version --prerelease alpha
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags

```

Dies wird ein Tag für jedes Commit in Ihrem Hauptbranch freigeben. Und ein `alpha` Release für `development`, und schließlich einen Changelog-Eintrag für jedes Commit in `CHANGELOG.md`.

Keine Sorge, wenn Sie diese Datei nicht haben, sie wird für Sie erstellt.

Um dies zum Laufen zu bringen, müssen Sie ein [PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _es in_ Ihrem GitHub [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") als `PERSONAL_ACCESS_TOKEN` erstellen.

Dies ist notwendig, um die CI zu ermöglichen, den Changelog und den Versionssprung zu committen.

Wenn Sie den Token erstellen, wählen Sie als Ablaufdatum `nie` und den Scope als `repo`.

Setzen Sie den `version` Schlüssel in Ihrer `package.json` Datei. Verwenden Sie dafür die letzte im Store veröffentlichte Version.

Dies ist nur beim ersten Mal notwendig, dann halten die Tools es auf dem neuesten Stand.

Sie können jetzt beide Dateien committen und sehen, wie Ihr erstes Tag in GitHub erscheint!

`capacitor-standard-version` ist das Paket, das die Magie vollbringt; standardmäßig aktualisiert es auch Ihre Versionsnummer in Android und iOS.

## GitHub-Aktionen für Build

Erstellen Sie eine Datei unter diesem Pfad: `.github/workflows/build.yml`

mit diesem Inhalt:

```toml
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
        uses: actions/checkout@v5
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm build
        env:
          MY_ENV_VAR: ${{ secrets.MY_ENV_VAR }}
      - name: Create Release Alpha
        if: "contains(github.ref, '-alpha.')"
        id: create_release_prepro
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c development
      - name: Create Release Production
        if: "!contains(github.ref, '-alpha.')"
        id: create_release_prod
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Dies wird Ihre Abhängigkeit installieren und bauen, bevor es an Capgo gesendet wird.

Wenn Ihr Befehl zum Bauen anders ist, können Sie ihn im Schritt `build_code` ändern.

Wenn Sie eine Umgebungsvariable benötigen, verwenden Sie `MY_ENV_VAR` und setzen Sie das `secret` in Ihren GitHub-Projekt-Einstellungen, dann Geheimnis und dann GitHub Action.

Um das Hochladen an Capgo zum Funktionieren zu bringen, müssen Sie Ihren API-Schlüssel für Capgo erhalten und ihn im [Secret Ihres GitHub-Repositories](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) als `CAPGO_TOKEN` hinzufügen.

Sie können jetzt beide Dateien committen und sehen, wie Ihre erste Version in Capgo erscheint!

Der Commit wird einen neuen Capacitor-Build für den Produktions- und Entwicklungsbranch generieren.

Sie sollten Ihren Test im Ionic-Bausschritt hinzufügen, um sicherzustellen, dass Ihr Code funktioniert.

Gehen Sie zu Ihrem Capgo-Dashboard und überprüfen Sie Ihren Build, der gerade erschienen ist; Sie haben nun Ihr CI/CD-System.
