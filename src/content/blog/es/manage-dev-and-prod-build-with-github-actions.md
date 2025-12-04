---
slug: manage-dev-and-prod-build-with-github-actions
title: Gestiona el desarrollo y la construcción de producción con GitHub actions
description: >-
  Utiliza Capgo para publicar tu devbuild en un canal específico, y permite que
  tu equipo pruebe tu aplicación Capacitor Ionic, sin esperar la revisión de
  Apple y Google
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Ilustración de compilaciones de canal
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: es
next_blog: how-to-send-specific-version-to-users
---
Este tutorial se centra en el alojamiento en GitHub, pero puedes adaptarlo con pequeños ajustes a cualquier otra plataforma CI/CD.

## Prefacio

Asegúrate de haber agregado primero tu aplicación Capacitor a Capgo, este tutorial solo se centra en la fase de carga

## Convención de commits

Primero necesitas empezar a seguir la convención de commits [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) esto ayudará a las herramientas a entender cómo actualizar el número de versión, se aprende en 5 minutos.

![Conventional commits](/conventional_commits.webp)

## Acciones de GitHub para etiquetas

Luego necesitas crear tu primera acción de GitHub para construir y crear etiquetas automáticamente.

Crea un archivo en esta ruta: `.github/workflows/bump_version.yml`

con este contenido:

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
        uses: actions/checkout@v6
        with:
          fetch-depth: 0
          filter: blob:none
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

Esto liberará una etiqueta para cada commit en tu rama principal. Y una versión `alpha` para `development`, y por último una entrada de changelog para cada commit en `CHANGELOG.md`.

No te preocupes si no tienes este archivo, será creado para ti.

Para que esto funcione, necesitas crear un [PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) en tus [secretos](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") de GitHub como `PERSONAL_ACCESS_TOKEN`.

Esto es necesario para permitir que el CI realice commits del changelog y el incremento de versión.

Cuando crees el token, elige la expiración como `never` y el alcance como `repo`.

Establece la clave `version` en tu archivo `package.json`. Usa para eso la última versión liberada en la tienda.

Esto solo es necesario la primera vez, luego las herramientas lo mantendrán actualizado.

¡Ahora puedes hacer commit de estos dos archivos y ver tu primera etiqueta aparecer en GitHub!

`capacitor-standard-version` es el paquete que hace la magia, por defecto, también actualiza tu número de versión en Android e iOS

## Acciones de GitHub para construcción

Crea un archivo en esta ruta: `.github/workflows/build.yml`

con este contenido:

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
        uses: actions/checkout@v6
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

Esto instalará y construirá tus dependencias antes de enviarlas a Capgo.

Si tu comando para construir es diferente, puedes cambiarlo en el paso `build_code`.

Si necesitas una variable de entorno, usa `MY_ENV_VAR` y establece el `secret` en la configuración de tu proyecto de GitHub, luego secrets y luego GitHub Action.

Para que la carga de Capgo funcione, necesitas obtener tu clave API de Capgo, agrégala en los [secretos de tu repositorio GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) como `CAPGO_TOKEN`.

¡Ahora puedes hacer commit de estos dos archivos y ver tu primera versión aparecer en Capgo!

Agregar el commit generará una nueva construcción de Capacitor para los canales de producción y desarrollo.

Deberías agregar tus pruebas en el paso de construcción de Ionic para estar seguro de que tu código funciona.

Ve a tu panel de control de Capgo y verifica tu construcción que acaba de aparecer, ahora tienes tu sistema CI/CD.
