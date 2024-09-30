---
slug: setup-ci-and-cd-gitlab
title: Aplicación de compilación y lanzamiento automático con GitLab
description: >-
  Cree su propia canalización de CI/CD con GitLab de forma gratuita, implemente
  su aplicación Ionic Capacitor JS cada vez que acceda a principal.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD in GitLab
tag: CI/CD
published: true
next_blog: ''
locale: es
---

Este artículo le guiará sobre cómo configurar la canalización de CI/CD con GitLab.

## Prefacio

Asegúrese de haber agregado su aplicación Capacitor primero a Capgo; este tutorial solo se centra en la fase de carga. Si necesita agregar su aplicación a Capgo, puede seguir este [Tutorial](https://capgoapp/blog/update-your- aplicaciones-de-condensadores-usando-sin-interrupciones-el-actualizador-de-capacitores/)

## Convención de confirmación

Primero debe comenzar a seguir la convención de confirmación [confirmaciones convencionales](https://wwwconventionalcommitsorg/en/v100/)\` esto ayudará a que las herramientas comprendan cómo actualizar el número de versión, son 5 minutos para aprenderlo.

![Confirmaciones convencionales](/conventional_commitswebp)

## GitLab CI/CD para etiqueta

Cree un archivo gitlab-ciyml en la raíz de su repositorio GitLab con el siguiente contenido

      
     etapas:
          - etiqueta

     versión_bump:
       etapa: etiqueta
       solo:
         - principal
      excepto:
        variables:
      - $CI_COMMIT_MESSAGE =~ /^tarea\(liberación\):/
      guion:
       - git config --global useremail "gitlab@tudominiocom"
       - git config --nombre de usuario global "GitLab CI/CD"
       - git pago $CI_COMMIT_REF_NAME
       - git pull origen $CI_COMMIT_REF_NAME
       - condensador-npx-versión-estándar
       - git push origen $CI_COMMIT_REF_NAME --etiquetas

Reemplace "gitlab@yourdomaincom" y "GitLab CI/CD" con su correo electrónico y nombre de usuario de GitLab en la sección de secuencia de comandos. Esta configuración activa el trabajo solo en envíos a la rama principal y excluye confirmaciones con mensajes que comienzan con "chore(release):"

## GitLab CI/CD para compilación

Agrega otra etapa a tu archivo gitlab-ciyml para la compilación:

        etapas:
          - desplegar

       desplegar:
         etapa: implementar
         solo:
           - etiquetas # Este trabajo solo se ejecutará para envíos de etiquetas
         guion:
           - apt-get update -qy && apt-get install -y nodejs npm
           - instalación npm -g @capgo/cli
           - npm ci
           - compilación de ejecución npm
           - carga del paquete npx @capgo/cli -a $CAPGO_TOKEN -c producción
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG # Defina esto en la configuración de su proyecto GitLab
         ambiente:
           nombre: producción

Asegúrese de tener su clave API de Capgo (CAPGO_TOKEN) agregada como una variable CI/CD en su proyecto GitLab. Vaya a su proyecto en GitLab, navegue hasta Configuración > CI/CD > Variables y agregue una variable llamada CAPGO_TOKEN con el valor de su clave API.

Personalice el script de compilación para que coincida con el proceso de compilación de su proyecto específico, como cambiar el comando npm run build

## Conclusión

¡Aquí estamos! Dimos un paso adicional en nuestro viaje tecnológico En el desarrollo de software moderno, CICD es un factor esencial a considerar. Espero que esta guía tenga sentido para todos.