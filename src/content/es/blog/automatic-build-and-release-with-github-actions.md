---
slug: automatic-build-and-release-with-github-actions
title: Construcción y lanzamiento automático de la aplicación con GitHub Actions
description: >-
  Cree su propio pipeline de CI/CD con Github Actions de forma gratuita y
  despliegue su aplicación Ionic Capacitor JS cada vez que realice un push a
  main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /github_actions.webp
head_image_alt: Ilustración de Acción de GitHub
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-ios-build-github-action
---

Este tutorial se centra en el alojamiento de GitHub, pero puedes adaptarlo con pequeños ajustes a cualquier otra plataforma de CI/CD

## Prefacio

Asegúrate de haber agregado primero tu aplicación Capacitor a Capgo, este tutorial solo se enfoca en la fase de carga
Si necesitas agregar tu aplicación a Capgo, puedes seguir este [Tutorial](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convención de commits

Primero debes comenzar siguiendo la convención de commits [conventional commits](https://wwwconventionalcommitsorg/en/v100/)\` esto ayudará a las herramientas a entender cómo actualizar el número de versión, se aprende en 5 minutos

![Conventional commits](/conventional_commitswebp)

## Acciones de GitHub para etiquetas

Luego tienes que crear tu primera acción de GitHub para construir y crear etiquetas automáticamente

Crea un archivo en esta ruta: `github/workflows/bump_versionyml`

con este contenido:

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

Esto lanzará una etiqueta para cada commit en tu rama principal y agregará una entrada de registro de cambios para cada commit en la rama principal en `CHANGELOGmd`

No te preocupes si no tienes este archivo, se creará por ti

Para que esto funcione, crea un [PERSONAL_ACCESS](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) en tus [secretos](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "GitHub secrets") de GitHub como `PERSONAL_ACCESS_TOKEN`

Esto es necesario para permitir que el CI haga commit del registro de cambios

Cuando crees el token, elige la expiración como `never` y el alcance como `repo`

Por último, establece la versión en tu archivo `packagejson`, sincronízala con tu número de versión nativa, lo que facilitará el siguiente paso

Esto solo es necesario la primera vez, luego las herramientas lo mantendrán actualizado

¡Ahora puedes hacer commit de ambos archivos y ver aparecer tu primera etiqueta en GitHub!

Tanto la plataforma nativa como la web tendrán el número de versión actualizado después de cada commit

## Acciones de GitHub para construcción

Crea un archivo en esta ruta: `github/workflows/buildyml`

con este contenido:

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

Esto instalará y construirá tus dependencias antes de enviarlas a Capgo

Si tu comando para construir es diferente, puedes cambiarlo en el paso `build_code`

Para que esto funcione, necesitas obtener tu clave API para Capgo, agrégala en los [secretos de tu repositorio de GitHub](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) como `CAPGO_TOKEN`

¡Ahora puedes hacer commit de ambos archivos y ver aparecer tu primera etiqueta en GitHub!

Agregar el commit generará una nueva construcción para el canal de producción

Deberías agregar tus pruebas en el paso de construcción para asegurarte de que tu código funciona

Ve a tu panel de Capgo y verifica tu construcción que acaba de aparecer, ahora tienes tu sistema CI/CD

Si quieres permitir que todos tus usuarios obtengan la actualización cuando esté disponible, ve a tu canal y configúralo como `public`

También puedes agregar la construcción nativa de tu aplicación JavaScript Ionic Capacitor siguiendo este tutorial 👇