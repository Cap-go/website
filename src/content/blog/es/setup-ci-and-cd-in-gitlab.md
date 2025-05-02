---
slug: configuracion-ci-y-cd-gitlab
title: Construcción y Lanzamiento Automático de Apps con GitLab
description: >-
  Crea tu propio pipeline CI/CD con GitLab de forma gratuita y despliega tu
  aplicación Ionic Capacitor JS con cada push a la rama main.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD en GitLab
keywords: 'GitLab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: es
next_blog: ''
original_slug: setup-ci-und-cd-gitlab
---
Este artículo te guiará sobre cómo configurar el pipeline CI/CD con GitLab.

## Prefacio

Asegúrate de haber agregado primero tu aplicación Capacitor a Capgo, este tutorial solo se centra en la fase de carga. Si necesitas agregar tu aplicación a Capgo, puedes seguir este [Tutorial](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/).

## Convención de commits

Primero necesitas comenzar siguiendo la convención de commits [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), esto ayudará a las herramientas a entender cómo actualizar el número de versión, se aprende en 5 minutos.

![Conventional commits](/conventional_commits.webp)

## GitLab CI/CD para Tags

Crea un archivo .gitlab-ci.yml en la raíz de tu repositorio GitLab con el siguiente contenido

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

Reemplaza "gitlab@yourdomain.com" y "GitLab CI/CD" con tu correo electrónico y nombre de usuario de GitLab en la sección de script. Esta configuración activa el trabajo solo en los pushes a la rama principal y excluye los commits con mensajes que comienzan con "chore(release):".

## GitLab CI/CD para Build

Agrega otra etapa a tu archivo .gitlab-ci.yml para el build:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Este trabajo solo se ejecutará para pushes de tags
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # Define esto en la configuración de tu proyecto GitLab
         environment:
           name: production

Asegúrate de tener tu clave API de Capgo (CAPGO_TOKEN) agregada como variable CI/CD en tu proyecto GitLab. Ve a tu proyecto en GitLab, navega a Settings > CI/CD > Variables, y agrega una variable llamada CAPGO_TOKEN con el valor de tu clave API.

Personaliza el script de build para que coincida con el proceso de build específico de tu proyecto, como cambiar el comando npm run build.

## Conclusión

¡Aquí estamos! Dimos un paso extra en nuestro viaje tecnológico. En el desarrollo de software moderno, CICD es un factor esencial a considerar. Así que espero que esta guía tenga sentido para todos.
