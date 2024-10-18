---
slug: setup-ci-and-cd-gitlab
title: Automatischer Build und Release der App mit GitLab
description: >-
  Erstelle deine eigene CI/CD-Pipeline mit GitLab kostenlos und deploye deine
  Ionic Capacitor JS-App bei jedem Push auf den Hauptzweig.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD in GitLab
tag: CI/CD
published: true
locale: de
next_blog: ''
---

Dieser Artikel wird Sie durch die Einrichtung einer CI/CD-Pipeline mit GitLab führen.

## Vorwort

Stellen Sie sicher, dass Sie Ihre Capacitor-App zuerst zu Capgo hinzugefügt haben. Dieses Tutorial konzentriert sich nur auf die Upload-Phase. Wenn Sie Ihre App zu Capgo hinzufügen müssen, können Sie diesem [Tutorial](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/) folgen.

## Commit-Konvention

Zunächst müssen Sie damit beginnen, der Commit-Konvention [conventional commits](https://wwwconventionalcommitsorg/en/v100/) zu folgen. Dies wird dem Tooling helfen zu verstehen, wie die Versionsnummer erhöht werden soll. Es dauert nur 5 Minuten, es zu erlernen.

![Conventional commits](/conventional_commitswebp)

## GitLab CI/CD für Tags

Erstellen Sie eine .gitlab-ci.yml-Datei im Hauptverzeichnis Ihres GitLab-Repositorys mit folgendem Inhalt:

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

Ersetzen Sie "gitlab@yourdomain.com" und "GitLab CI/CD" im Skriptabschnitt durch Ihre GitLab-E-Mail und Ihren Benutzernamen. Diese Konfiguration löst den Job nur bei Pushes zum Hauptzweig aus und schließt Commits mit Nachrichten, die mit "chore(release):" beginnen, aus.

## GitLab CI/CD für Build

Fügen Sie Ihrer .gitlab-ci.yml-Datei eine weitere Stufe für den Build hinzu:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Dieser Job wird nur für Tag-Pushes ausgeführt
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # Definieren Sie dies in Ihren GitLab-Projekteinstellungen
         environment:
           name: production

Stellen Sie sicher, dass Sie Ihren Capgo API-Schlüssel (CAPGO_TOKEN) als CI/CD-Variable in Ihrem GitLab-Projekt hinzugefügt haben. Gehen Sie zu Ihrem Projekt in GitLab, navigieren Sie zu Einstellungen > CI/CD > Variablen und fügen Sie eine Variable namens CAPGO_TOKEN mit Ihrem API-Schlüsselwert hinzu.

Passen Sie das Build-Skript an den spezifischen Build-Prozess Ihres Projekts an, z.B. durch Ändern des npm run build Befehls.

## Fazit

Hier sind wir! Wir haben einen weiteren Schritt in unserer technischen Reise unternommen. In der modernen Softwareentwicklung ist CI/CD ein wesentlicher Faktor, der berücksichtigt werden muss. Ich hoffe, diese Anleitung ist für jeden nachvollziehbar.