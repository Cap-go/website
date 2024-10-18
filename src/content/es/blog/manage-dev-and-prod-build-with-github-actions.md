---
slug: manage-dev-and-prod-build-with-github-actions
title: Gestionar el desarrollo y la compilación de producción con GitHub Actions
description: >-
  Utilice Capgo para publicar su compilación de desarrollo para un canal
  específico y permita que su equipo pruebe su aplicación Capacitor Ionic sin
  tener que esperar la revisión de Apple y Google
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Ilustración de Compilaciones de Canales
tag: CI/CD
published: true
locale: es
next_blog: how-to-send-specific-version-to-users
---

Este tutorial se centra en el alojamiento en GitHub, pero puedes adaptarlo con pequeños ajustes a cualquier otra plataforma de CI/CD

## Prefacio

Asegúrate de haber añadido primero tu aplicación Capacitor a Capgo, este tutorial solo se centra en la fase de carga

## Convención de commits

Primero necesitas empezar a seguir la convención de commits [conventional commits](https://wwwconventionalcommitsorg/en/v100/) esto ayudará a las herramientas a entender cómo actualizar el número de versión, se aprende en 5 minutos

![Commits convencionales](/conventional_commitswebp)

## Acciones de GitHub para etiquetas

Luego necesitas crear tu primera acción de GitHub para construir y crear etiquetas automáticamente

Crea un archivo en esta ruta: `github/workflows/bump_versionyml`

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

Esto lanzará una etiqueta para cada commit en tu rama principal y una versión `alpha` para `development`, y finalmente una entrada de changelog para cada commit en `CHANGELOGmd`

No te preocupes si no tienes este archivo, se creará por ti

Para que esto funcione, necesitas crear un [PERSONAL ACCESS](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) e introducirlo en tus [secretos](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "Secretos de GitHub") de GitHub como `PERSONAL_ACCESS_TOKEN`

Esto es necesario para permitir que el CI haga commit del changelog y la actualización de versión

Cuando crees el token, elige la expiración como `never` y el alcance como `repo`

Establece la clave `version` en tu archivo `packagejson` Usa para eso la última versión lanzada en la tienda

Esto solo es necesario la primera vez, luego las herramientas lo mantendrán actualizado

¡Ahora puedes hacer commit de ambos archivos y ver tu primera etiqueta aparecer en GitHub!

`capacitor-standard-version` es el paquete que hace la magia, por defecto, también actualiza tu número de versión en Android e iOS

## Acciones de GitHub para la construcción

Crea un archivo en esta ruta: `github/workflows/buildyml`

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

Esto instalará y construirá tus dependencias antes de enviarlas a Capgo

Si tu comando para construir es diferente, puedes cambiarlo en el paso `build_code`

Si necesitas una variable de entorno, usa `MY_ENV_VAR` y establece el `secret` en la configuración de tu proyecto de GitHub, luego secret y luego GitHub Action

Para que la carga de Capgo funcione, necesitas obtener tu clave API de Capgo, añádela en los [secretos de tu repositorio de GitHub](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) como `CAPGO_TOKEN`

¡Ahora puedes hacer commit de ambos archivos y ver tu primera versión aparecer en Capgo!

Añadir el commit generará una nueva construcción de Capacitor para los canales de producción y desarrollo

Deberías añadir tus pruebas en el paso de construcción de Ionic para estar seguro de que tu código funciona

Ve a tu panel de Capgo y comprueba tu construcción que acaba de aparecer, ahora tienes tu sistema de CI/CD