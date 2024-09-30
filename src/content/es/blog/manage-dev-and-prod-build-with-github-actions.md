---
slug: manage-dev-and-prod-build-with-github-actions
title: Gestionar el desarrollo y la producción con las acciones GitHub
description: >-
  Utilice Capgo para publicar su desarrollo en un canal específico y laissez su
  equipo ensayer su aplicación Capacitor Ionic, sin asistir al examen de Apple y
  Google.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Channel builds illustration
tag: CI/CD
published: true
next_blog: how-to-send-specific-version-to-users
locale: es
---

Este tutorial se centra en el hosting de GitHub, pero puedes adaptarlo con un pequeño ajuste a cualquier otra plataforma CI/CD.

## Prefacio 

Asegúrese de haber agregado su aplicación Capacitor primero a Capgo; este tutorial solo se centra en la fase de carga.

## Convención de confirmación

Primero debe comenzar a seguir la convención de confirmación [confirmaciones convencionales](https://wwwconventionalcommitsorg/en/v100/)\` esto ayudará a que las herramientas comprendan cómo actualizar el número de versión, son 5 minutos para aprenderlo.

![Confirmaciones convencionales](/conventional_commitswebp)

## Acciones de GitHub para etiqueta

Luego, debe crear su primera acción de GitHub para crear y crear etiquetas automáticamente.

Cree un archivo en esta ruta: `github/workflows/bump_versionyml`

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

Esto lanzará una etiqueta para cada confirmación en su rama principal y una versión `alfa` para `desarrollo` y, por último, una entrada de registro de cambios para cada confirmación en `CHANGELOGmd`

No te preocupes si no tienes este archivo, se creará para ti.

Para que esto funcione, necesita crear un [ACCESO PERSONAL](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _it in_ su [secreto] de GitHub (https://docsgithubcom/en/actions/security-guides/encrypted-secrets "secretos de GitHub") como `PERSONAL_ACCESS_TOKEN`

Esto es necesario para permitir que el CI confirme el registro de cambios y el aumento de versión.

Cuando cree el token, elija la caducidad como "nunca" y el alcance como "repo".


Establezca la clave `version` en su archivo `packagejson`. Utilice para eso la última versión publicada en la tienda.

Esto sólo es necesario la primera vez, luego las herramientas lo mantendrán actualizado.

¡Ahora puede enviar ambos archivos y ver aparecer su primera etiqueta en GitHub!

`capacitor-standard-version` es el paquete que hace la magia, de forma predeterminada, también actualiza su número de versión en Android e IOS


## Acciones de GitHub para compilación

Cree un archivo en esta ruta: `github/workflows/buildyml`

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

Esto instalará y construirá su dependencia antes de enviarla a Capgo.

Si su comando para la compilación es diferente, puede cambiarlo en el paso `build_code`

Si necesita una variable de entorno, use `MY_ENV_VAR` y establezca el `secret` en la configuración de su proyecto GitHub, luego secret y luego GitHub Action

Para que la carga de Capgo funcione, necesita obtener su clave API para Capgo, agregarla en el [secreto de su repositorio de GitHub] (https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) como `CAPGO_TOKEN `

¡Ahora puede enviar ambos archivos y ver aparecer su primera versión en Capgo!

Agregar el compromiso generará una nueva compilación de condensadores para el canal de producción y desarrollo.

Debe agregar su prueba en el paso de compilación de Ionic para asegurarse de que su código esté funcionando.

Vaya a su panel de Capgo y verifique la compilación que acaba de aparecer; ahora tiene su sistema CI/CD