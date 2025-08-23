---
slug: automatic-build-and-release-with-github-actions
title: Construcción y lanzamiento automático de aplicaciones con acciones de Github
description: >-
  Crea tu propia pipeline de CI/CD con acciones de Github de forma gratuita,
  despliega tu aplicación Ionic Capacitor JS cada vez que realices un push a
  main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /github_actions.webp
head_image_alt: Ilustración de Github Action
keywords: 'Github actions, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: es
next_blog: automatic-capacitor-ios-build-github-action
---
Este tutorial se centra en el hospedaje de GitHub, pero puedes adaptarlo con un pequeño ajuste a cualquier otra plataforma de CI/CD.

## Prefacio

Asegúrate de haber agregado primero tu aplicación de Capacitor a Capgo, este tutorial se centra únicamente en la fase de carga. Si necesitas agregar tu aplicación a Capgo, puedes seguir este [Tutorial](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convención de commit

Primero necesitas empezar a seguir la convención de commit [commits convencionales](https://www.conventionalcommits.org/en/v1.0.0/) \` esto ayudará a que las herramientas entiendan cómo actualizar el número de versión, son 5 minutos para aprenderlo.

![Commits convencionales](/conventional_commits.webp)

## Acciones de GitHub para etiquetas

Luego tienes que crear tu primera acción de GitHub para construir automáticamente y crear una etiqueta.

Crea un archivo en esta ruta: `.github/workflows/bump_version.yml`

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
        uses: actions/checkout@v5
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

Esto liberará una etiqueta para cada commit en tu rama principal. Y añadirá una entrada al changelog para cada commit en la rama principal en `CHANGELOG.md`.

No te preocupes si no tienes este archivo, será creado para ti.

Para que esto funcione, crea un [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _en_ tu [secreto](https://docs.github.com/en/actions/security-guides/encrypted-secrets "secretos de GitHub") de GitHub como `PERSONAL_ACCESS_TOKEN`.

Esto es necesario para permitir que el CI commit el changelog.

Cuando crees el token, elige la expiración como `nunca` y el alcance como `repo`.

Por último, establece la versión en tu archivo `package.json`, sincrónizalo con tu número de versión nativo que facilitará el siguiente paso.

Esto solo es necesario la primera vez, luego las herramientas lo mantendrán actualizado.

¡Ahora puedes hacer commit de ambos archivos y ver tu primera etiqueta aparecer en GitHub!

Tanto la plataforma nativa como la web tendrán el aumento del número de versión después de cada commit.

## Acciones de GitHub para construir

Crea un archivo en esta ruta: `.github/workflows/build.yml`

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
        uses: actions/checkout@v5
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

Esto instalará y construirá tu dependencia antes de enviarla a Capgo.

Si tu comando para construir es diferente, puedes cambiarlo en el paso `build_code`.

Para que esto funcione, necesitas obtener tu clave API para Capgo, añádela en el [secreto de tu repositorio de GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) como `CAPGO_TOKEN`.

¡Ahora puedes hacer commit de ambos archivos y ver tu primera etiqueta aparecer en GitHub!

Añadir el commit generará una nueva construcción para el canal de producción.

Deberías agregar tus pruebas en el paso de construcción para asegurar que tu código está funcionando.

Ve a tu panel de control de Capgo y verifica tu construcción que acaba de aparecer, ahora tienes tu sistema de CI/CD.

Si deseas que todos tus usuarios reciban la actualización siempre que esté disponible, ve a tu canal y configúralo como `público`.

También puedes añadir la construcción nativa de tu aplicación de JavaScript Ionic Capacitor siguiendo este tutorial 👇
