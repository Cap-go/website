---
slug: de__automatic-build-and-release-with-gitlab
title: Automatischer Build und Release mit Gitlab
description: >-
  Erstellen Sie Ihre eigene CI/CD-Pipeline mit Gitlab kostenlos und deployen Sie
  Ihre App bei jedem Push auf den Main-Branch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /gitlab_ci.webp
head_image_alt: Gitlab CI Illustration
tag: CI/CD
published: true
locale: de
next_blog: ''
---

Dieser Tutorial konzentriert sich auf GitLab CI, aber Sie können ihn mit kleinen Anpassungen an jede andere CI/CD-Plattform anpassen.

## Vorwort

Stellen Sie sicher, dass Sie Ihre App zuerst zu Capgo hinzugefügt haben. Dieser Tutorial konzentriert sich nur auf die Upload-Phase.

## Commit-Konvention

Zunächst müssen Sie damit beginnen, der Commit-Konvention [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) zu folgen. Dies wird den Tools helfen zu verstehen, wie die Versionsnummer erhöht werden soll. Es dauert nur 5 Minuten, es zu lernen.

![Conventional commits](/conventional_commits.webp)

## GitLab CI für Tags

Dann müssen Sie Ihr erstes GitLab erstellen, um automatisch zu bauen und Tags zu erstellen.

Erstellen Sie eine Datei unter diesem Pfad: `github/workflows/bump_version.yml`

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
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
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

Dies wird für jeden Commit in Ihrem Hauptzweig einen Tag erstellen und für jeden Commit im Hauptzweig einen Changelog-Eintrag in `CHANGELOG.md` hinzufügen.

Machen Sie sich keine Sorgen, wenn Sie diese Datei nicht haben, sie wird für Sie erstellt.

Um dies zum Laufen zu bringen, erstellen Sie einen [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) Token in Ihren GitHub [Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") als `PERSONAL_ACCESS_TOKEN`.

Dies ist notwendig, damit die CI den Changelog committen kann.

Wenn Sie den Token erstellen, wählen Sie als Ablaufdatum `never` und als Umfang `repo`.

Zuletzt müssen Sie, damit das Tool versteht, wo Ihre Version gespeichert ist, die Datei `cz.toml` im Wurzelverzeichnis Ihres Repositories erstellen.

Und fügen Sie dies hinein:

```toml
[tool.commitizen]
name = "cz_conventional_commits"
tag_format = "$major.$minor.$patch$prerelease"
version = "0.11.5"
version_files = [
    "package.json:version",
    ".cz.toml"
]
```

Setzen Sie die Version in dieser Datei auf die gleiche, die Sie in Ihrer `package.json` Datei haben.

Dies ist nur beim ersten Mal notwendig, danach wird das Tool es aktuell halten.

Sie können jetzt diese beiden Dateien committen und Ihren ersten Tag in GitHub erscheinen sehen!

## GitHub Actions für Build

Erstellen Sie eine Datei unter diesem Pfad: `github/workflows/build.yml`

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
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Dies wird Ihre Abhängigkeiten installieren und bauen, bevor es an Capgo gesendet wird.

Wenn Ihr Befehl zum Bauen anders ist, können Sie ihn im Schritt `build_code` ändern.

Um dies zum Laufen zu bringen, müssen Sie Ihren API-Schlüssel für Capgo holen und ihn in den [Secrets Ihres GitHub Repositories](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) als `CAPGO_TOKEN` hinzufügen.

Sie können jetzt diese beiden Dateien committen und Ihren ersten Tag in GitHub erscheinen sehen!

Das Hinzufügen des Commits wird einen neuen Build für den Produktionskanal generieren.

Sie sollten Ihre Tests im Build-Schritt hinzufügen, um sicherzustellen, dass Ihr Code funktioniert.

Gehen Sie zu Ihrem Capgo-Dashboard und überprüfen Sie Ihren Build, der gerade erschienen ist. Sie haben jetzt Ihr CI/CD-System.

Wenn Sie möchten, dass alle Ihre Benutzer das Update erhalten, sobald es verfügbar ist, gehen Sie zu Ihrem Kanal und setzen Sie ihn auf `public`.