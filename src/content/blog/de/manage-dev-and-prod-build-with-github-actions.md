---
slug: de__manage-dev-and-prod-build-with-github-actions
title: Entwicklung und Produktions-Build mit GitHub Actions verwalten
description: >-
  Verwenden Sie Capgo, um Ihren Entwicklungsbuild für einen bestimmten Kanal
  freizugeben und lassen Sie Ihr Team Ihre Capacitor Ionic App testen, ohne auf
  die Überprüfung durch Apple und Google warten zu müssen
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Kanal-Builds-Illustration
tag: CI/CD
published: true
locale: de
next_blog: how-to-send-specific-version-to-users
---

Dieser Tutorial konzentriert sich auf das GitHub-Hosting, aber Sie können ihn mit einer kleinen Anpassung an jede andere CI/CD-Plattform anpassen.

## Vorwort

Stellen Sie sicher, dass Sie Ihre Capacitor-App zuerst zu Capgo hinzugefügt haben. Dieser Tutorial konzentriert sich nur auf die Upload-Phase.

## Commit-Konvention

Zunächst müssen Sie damit beginnen, der Commit-Konvention [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) zu folgen. Dies wird den Tools helfen zu verstehen, wie die Versionsnummer erhöht werden soll. Es dauert nur 5 Minuten, es zu lernen.

![Conventional commits](/conventional_commits.webp)

## GitHub Actions für Tags

Dann müssen Sie Ihre erste GitHub Action erstellen, um automatisch zu bauen und Tags zu erstellen.

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
        uses: actions/checkout@v4
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

Dies wird für jeden Commit in Ihrem Hauptzweig ein Tag veröffentlichen und eine `alpha`-Version für `development`, und schließlich einen Changelog-Eintrag für jeden Commit in `CHANGELOG.md`.

Machen Sie sich keine Sorgen, wenn Sie diese Datei nicht haben, sie wird für Sie erstellt.

Damit dies funktioniert, müssen Sie einen [PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) in Ihrem GitHub [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") als `PERSONAL_ACCESS_TOKEN` erstellen.

Dies ist notwendig, damit die CI den Changelog und die Versionserhöhung committen kann.

Wählen Sie bei der Erstellung des Tokens als Ablaufzeit `never` und als Umfang `repo`.

Setzen Sie den `version`-Schlüssel in Ihrer `package.json`-Datei. Verwenden Sie dafür die letzte im Store veröffentlichte Version.

Dies ist nur beim ersten Mal notwendig, danach werden die Tools es auf dem neuesten Stand halten.

Sie können jetzt diese beiden Dateien committen und Ihr erstes Tag in GitHub erscheinen sehen!

`capacitor-standard-version` ist das Paket, das die Magie bewirkt. Standardmäßig aktualisiert es auch Ihre Versionsnummer in Android und iOS.

## GitHub Actions für den Build

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
        uses: actions/checkout@v4
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

Dies wird Ihre Abhängigkeiten installieren und bauen, bevor es an Capgo gesendet wird.

Wenn Ihr Befehl zum Bauen anders ist, können Sie ihn im Schritt `build_code` ändern.

Wenn Sie eine Umgebungsvariable benötigen, verwenden Sie `MY_ENV_VAR` und setzen Sie das `secret` in Ihren GitHub-Projekteinstellungen, dann secret, dann GitHub Action.

Damit der Capgo-Upload funktioniert, müssen Sie Ihren API-Schlüssel für Capgo erhalten und ihn in den [secrets Ihres GitHub-Repositorys](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) als `CAPGO_TOKEN` hinzufügen.

Sie können jetzt diese beiden Dateien committen und Ihre erste Version in Capgo erscheinen sehen!

Der Commit wird einen neuen Capacitor-Build für den Produktions- und Entwicklungskanal generieren.

Sie sollten Ihre Tests im Ionic-Build-Schritt hinzufügen, um sicher zu sein, dass Ihr Code funktioniert.

Gehen Sie zu Ihrem Capgo-Dashboard und überprüfen Sie Ihren Build, der gerade erschienen ist. Sie haben jetzt Ihr CI/CD-System.