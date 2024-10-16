---
slug: automatic-build-and-release-with-gitlab
title: Compilación y lanzamiento automáticos con Gitlab
description: >-
  Cree su propio pipeline de CI/CD con Gitlab de forma gratuita y despliegue su
  aplicación en cada push a la rama principal.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /gitlab_ci.webp
head_image_alt: Ilustración de Gitlab CI
tag: CI/CD
published: true
locale: es
next_blog: ''
---

Este tutorial se centra en GitLab CI, pero puedes adaptarlo con pequeños ajustes a cualquier otra plataforma de CI/CD

## Prefacio

Asegúrate de haber añadido primero tu aplicación a Capgo, este tutorial solo se enfoca en la fase de carga

## Convención de commits

Primero debes empezar a seguir la convención de commits [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). Esto ayudará a las herramientas a entender cómo actualizar el número de versión, se aprende en 5 minutos

![Conventional commits](/conventional_commits.webp)

## GitLab CI para etiquetas

Luego necesitas crear tu primer GitLab para construir y crear etiquetas automáticamente

Crea un archivo en esta ruta: `github/workflows/bump_version.yml`

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

Esto lanzará una etiqueta para cada commit en tu rama principal y añadirá una entrada de changelog para cada commit en la rama principal en `CHANGELOG.md`

No te preocupes si no tienes este archivo, se creará por ti

Para que esto funcione, crea un [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) y guárdalo en tus [secretos](https://docs.github.com/en/actions/security-guides/encrypted-secrets "Secretos de GitHub") de GitHub como `PERSONAL_ACCESS_TOKEN`

Esto es necesario para permitir que el CI haga commit del changelog

Cuando crees el token, elige la expiración como `never` y el alcance como `repo`

Por último, para que la herramienta entienda dónde está guardada tu versión, tienes que crear el archivo `cz.toml` en la raíz de tu repositorio

Y añade esto dentro:

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

Establece la versión en este archivo igual a la que tienes en tu archivo `package.json`

Esto solo es necesario la primera vez, luego las herramientas lo mantendrán actualizado

¡Ahora puedes hacer commit de ambos archivos y ver tu primera etiqueta aparecer en GitHub!

## GitHub actions para construcción

Crea un archivo en esta ruta: `github/workflows/build.yml`

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

Esto instalará y construirá tus dependencias antes de enviarlas a Capgo

Si tu comando para construir es diferente, puedes cambiarlo en el paso `build_code`

Para que esto funcione, necesitas obtener tu clave API para Capgo, añádela en los [secretos de tu repositorio de GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) como `CAPGO_TOKEN`

¡Ahora puedes hacer commit de ambos archivos y ver tu primera etiqueta aparecer en GitHub!

Añadir el commit generará una nueva construcción para el canal de producción

Deberías añadir tus pruebas en el paso de construcción para asegurar que tu código funciona

Ve a tu panel de Capgo y comprueba tu construcción que acaba de aparecer, ahora tienes tu sistema CI/CD

Si quieres permitir que todos tus usuarios obtengan la actualización cuando esté disponible, ve a tu canal y configúralo como `public`