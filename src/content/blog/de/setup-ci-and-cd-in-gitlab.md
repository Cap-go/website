---
slug: setup-ci-and-cd-in-gitlab
title: Automatischer Build und Release von Apps mit GitLab
description: >-
  Erstelle deine eigene CI/CD-Pipeline mit GitLab kostenlos und deploye deine
  Ionic Capacitor JS App bei jedem Push in den Main-Branch.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD in GitLab
keywords: 'GitLab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: de
next_blog: ''
---
Dieser Artikel führt Sie durch die Einrichtung einer CI/CD-Pipeline mit GitLab.

## Vorwort

Stellen Sie sicher, dass Sie Ihre Capacitor-App zuerst zu Capgo hinzugefügt haben. Dieses Tutorial konzentriert sich nur auf die Upload-Phase. Wenn Sie Ihre App zu Capgo hinzufügen müssen, können Sie diesem [Tutorial](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/) folgen.

## Commit-Konvention

Zunächst müssen Sie beginnen, der Commit-Konvention [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) zu folgen. Dies wird den Tools helfen zu verstehen, wie die Versionsnummer aktualisiert werden soll. Es dauert nur 5 Minuten, es zu lernen.

![Conventional commits](/conventional_commits.webp)

## GitLab CI/CD für Tags

Erstellen Sie eine .gitlab-ci.yml-Datei im Hauptverzeichnis Ihres GitLab-Repositories mit folgendem Inhalt:

     stages:
          - tag

     bump_version:
       stage: tag
       only:
         - main
      except:
        variables:
      - $CI_COMMIT_MESSAGE =~ /^chore\(release\):/
      script:
       - git config --global user.email "gitlab@yourdomain.com"
       - git config --global user.name "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

Ersetzen Sie "gitlab@yourdomain.com" und "GitLab CI/CD" im Skript-Abschnitt durch Ihre GitLab-E-Mail und Ihren Benutzernamen. Diese Konfiguration löst den Job nur bei Pushes zum Hauptzweig aus und schließt Commits mit Nachrichten, die mit "chore(release):" beginnen, aus.

## GitLab CI/CD für Build

Fügen Sie Ihrer .gitlab-ci.yml-Datei eine weitere Stufe für den Build hinzu:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # This job will only run for tag pushes
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # Define this in your GitLab project settings
         environment:
           name: production

Stellen Sie sicher, dass Sie Ihren Capgo API-Schlüssel (CAPGO_TOKEN) als CI/CD-Variable in Ihrem GitLab-Projekt hinzugefügt haben. Gehen Sie in GitLab zu Ihrem Projekt, navigieren Sie zu Einstellungen > CI/CD > Variablen und fügen Sie eine Variable namens CAPGO_TOKEN mit Ihrem API-Schlüsselwert hinzu.

Passen Sie das Build-Skript an Ihren spezifischen Projekt-Build-Prozess an, zum Beispiel durch Ändern des npm run build Befehls.

## Fazit

Hier sind wir! Wir haben einen weiteren Schritt in unserer technischen Reise gemacht. In der modernen Softwareentwicklung ist CICD ein wesentlicher Faktor, der berücksichtigt werden muss. Ich hoffe, diese Anleitung ist für jeden verständlich.
