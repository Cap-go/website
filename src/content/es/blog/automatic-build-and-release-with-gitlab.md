---
slug: automatic-build-and-release-with-gitlab
title: Compilación y lanzamiento automáticos con Gitlab
description: >-
  Cree su propia canalización de CI/CD con Gitlab de forma gratuita, implemente
  su aplicación cada vez que acceda a principal.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /gitlab_ci.webp
head_image_alt: Gitlab CI illustration
tag: CI/CD
published: true
next_blog: ''
locale: es
---

Este tutorial se centra en GitLab CI, pero puedes adaptarlo con un pequeño ajuste a cualquier otra plataforma CI/CD.

## Prefacio 

Asegúrese de haber agregado su aplicación primero a Capgo; este tutorial solo se centra en la fase de carga.


## Convención de confirmación

Primero debe comenzar a seguir la convención de confirmación [confirmaciones convencionales](https://wwwconventionalcommitsorg/en/v100/)\` esto ayudará a que las herramientas comprendan cómo actualizar el número de versión, son 5 minutos para aprenderlo.

![Confirmaciones convencionales](/conventional_commitswebp)

## GitLab CI para etiqueta

Luego necesitas crear tu primer GitLab para construir y crear etiquetas automáticamente.

Cree un archivo en esta ruta: `github/workflows/bump_versionyml`

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

Esto liberará una etiqueta para cada confirmación en su rama principal y agregará una entrada de registro de cambios para cada confirmación en la rama principal en `CHANGELOGmd`

No te preocupes si no tienes este archivo, se creará para ti.

Para que esto funcione, cree un [ACCESO_PERSONAL](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _en_ ​​su GitHub [secreto ](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "Secretos de GitHub") como `PERSONAL_ACCESS_TOKEN`

Esto es necesario para permitir que el CI confirme el registro de cambios.

Cuando cree el token, elija la caducidad como "nunca" y el alcance como "repo".

Por último, para que la herramienta sepa dónde está guardada su versión, debe crear el archivo `cztoml` en la raíz de su repositorio.

Y agrega esto dentro:

```toml
[tool.commitizen]
name = "cz_conventional_commits"
tag_format = "$major.$minor.$patch$prerelease"
version = "0.11.5"
version_files = [
    "package.json:version",
    ".cz.toml"
]
```

Configure la versión en este archivo como la misma que tiene en su archivo `packagejson`

Esto sólo es necesario la primera vez, luego las herramientas lo mantendrán actualizado.

¡Ahora puede enviar ambos archivos y ver aparecer su primera etiqueta en GitHub!

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
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Esto instalará y construirá su dependencia antes de enviarla a Capgo.

Si su comando para la compilación es diferente, puede cambiarlo en el paso `build_code`

Para que esto funcione, necesita obtener su clave API para Capgo, agregarla en el [secreto de su repositorio de GitHub] (https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) como `CAPGO_TOKEN`

¡Ahora puede enviar ambos archivos y ver aparecer su primera etiqueta en GitHub!

Agregar el compromiso generará una nueva compilación para el canal de producción.

Debe agregar su prueba en el paso de compilación para asegurarse de que su código esté funcionando.

Vaya a su panel de Capgo y verifique la compilación que acaba de aparecer; ahora tiene su sistema CI/CD

Si desea permitir que todos sus usuarios obtengan la actualización cuando esté disponible, vaya a su canal y configúrelo como "público".