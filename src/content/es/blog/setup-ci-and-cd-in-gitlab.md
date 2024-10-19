---
slug: setup-ci-and-cd-gitlab
title: Construcción y lanzamiento automáticos de la aplicación con GitLab
description: >-
  Crea tu propia pipeline de CI/CD con GitLab de forma gratuita y despliega tu
  aplicación Ionic Capacitor JS con cada push a la rama principal.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD en GitLab
tag: CI/CD
published: true
locale: es
next_blog: ''
---

Este artículo te guiará sobre cómo configurar un pipeline de CI/CD con GitLab

## Prefacio

Asegúrate de haber agregado primero tu aplicación Capacitor a Capgo, este tutorial solo se enfoca en la fase de carga. Si necesitas agregar tu aplicación a Capgo, puedes seguir este [Tutorial](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convención de commits

Primero, debes comenzar siguiendo la convención de commits [conventional commits](https://wwwconventionalcommitsorg/en/v100/)\` esto ayudará a las herramientas a entender cómo actualizar el número de versión, se aprende en 5 minutos

![Conventional commits](/conventional_commitswebp)

## GitLab CI/CD para Tag

Crea un archivo gitlab-ciyml en la raíz de tu repositorio de GitLab con el siguiente contenido:

      
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
       - git config --global useremail "gitlab@yourdomaincom"
       - git config --global username "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

Reemplaza "gitlab@yourdomaincom" y "GitLab CI/CD" con tu correo electrónico y nombre de usuario de GitLab en la sección de script. Esta configuración activa el trabajo solo en los envíos a la rama principal y excluye los commits con mensajes que comienzan con "chore(release):".

## GitLab CI/CD para Build

Agrega otra etapa a tu archivo gitlab-ciyml para la compilación:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Este trabajo solo se ejecutará para los envíos de tags
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

Asegúrate de haber agregado tu clave API de Capgo (CAPGO_TOKEN) como una variable CI/CD en tu proyecto de GitLab. Ve a tu proyecto en GitLab, navega a Settings > CI/CD > Variables, y agrega una variable llamada CAPGO_TOKEN con el valor de tu clave API.

Personaliza el script de compilación para que coincida con el proceso de compilación específico de tu proyecto, como cambiar el comando npm run build.

## Conclusión

¡Aquí estamos! Dimos un paso extra en nuestro viaje tecnológico. En el desarrollo de software moderno, CI/CD es un factor esencial a considerar. Así que espero que esta guía tenga sentido para todos.