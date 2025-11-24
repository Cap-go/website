---
slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Cómo Rapido Cloud gestiona el lanzamiento semántico con Capgo CapacitorUpdater
description: >-
  Así es como configuré semantic release para gestionar las versiones de mis
  aplicaciones que usan CapGo CapacitorUpdater
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: Caso de estudio rápido de la nube
keywords: >-
  semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Case Study
published: true
locale: es
next_blog: ''
---
## 1. Introducción

En Rapido Cloud (www.rapido.cloud), estoy desarrollando una aplicación móvil para clientes de Salesforce que les permita implementar fácilmente su propia aplicación móvil con marca sin tener que pasar por los difíciles ciclos de usar Salesforce Mobile SDK o Salesforce Mobile Publisher.

He desarrollado esta aplicación móvil en una plataforma moderna y "estándar" con componentes y herramientas ampliamente utilizados, incluyendo Ionic 8, Angular 18, TypeScript, Capacitor y ahora CapGo CapacitorUpdater. Estos son más sencillos de manejar para clientes que no quieren gestionar especificaciones de la plataforma Salesforce como Lightning Web Components; y es más fácil y económico para mí reclutar desarrolladores y mantenedores de aplicaciones móviles con Ionic + Angular.

Este artículo explica mi diseño, mis elecciones e implementación que hacen de CapGo y `semantic-release` una solución muy exitosa y simple para gestionar todos los despliegues automáticamente a través de Github Actions. Todo esto fue diseñado, probado y documentado durante el excelente período de prueba gratuito de 14 días de CapGo CapacitorUpdater.

## 2. ¿Por qué usar CapGo? ¿Por qué usar semantic-release?
CapGo CapacitorUpdater me atrajo con su promesa de hacer los despliegues de aplicaciones móviles mucho más simples, mucho más rápidos y flexibles que pasar por el proceso estándar de entrega de Apple AppStore/Google PlayStore.
Esta es mi primera aplicación móvil que estoy enviando a las tiendas, habiéndome concentrado en el pasado en aplicaciones web, generalmente desarrolladas en Salesforce Experience Cloud.

Estaba bastante preocupado por la curva de aprendizaje para que esto fuera exitoso, pero logré poner mi aplicación en Apple TestFlight bastante fácilmente. Luego estuve en posición de usar CapGo CapacitorUpdater para implementar mis actualizaciones mucho más rápido.

Mi primer requisito y caso de prueba fue implementar para mí mismo para probar mi aplicación como una aplicación móvil real en mi propio teléfono, en lugar de probar en un emulador móvil o en un simulador a través del navegador móvil Nexus sugerido por Ionic. Esto es porque mi aplicación usa características nativas como Geolocalización o acceso a la Galería de Fotos y Cámara. Al no tener experiencia previa probando una aplicación móvil Capacitor, no estaba seguro si todo iba a funcionar correctamente: ¡nada mejor que probar la aplicación real, en condiciones reales!

Así que CapGo CapacitorUpdater me ayudó a actualizar mi aplicación en mi móvil, en vivo, 1 minuto después de guardar una nueva característica o corrección en mi código fuente: ¡tan reconfortante, tan flexible y fácil de configurar!

## 3. Mi modelo de ramificación y lanzamiento, y cómo se integra semantic-release

Ahora que tengo mi entrega a los servidores CapGo funcionando correctamente, necesito automatizar esto y ajustarlo en mi pipeline CI/CD.

### Así es como organizo mi modelo de ramificación y lanzamiento

Para cada aplicación, ya sea móvil, web o Salesforce:
- El **desarrollo** se lleva a cabo en ramas `feature/...` derivadas de `main`, y se fusionan en `main` que es la referencia para la mayoría de las ramas de desarrollo, fuera de mantenimiento y características específicas para entregas personalizadas (más sobre esto a continuación)
- **Los despliegues se activan __desde ramas de lanzamiento__** que pueden ser: `production`, ramas de prelanzamiento (`alpha`, `beta`, `nightly`, etc.) y también ramas específicas para clientes o contextos específicos para entregas personalizadas
- **Los despliegues se activan por una solicitud de extracción** que se fusiona en una rama de implementación. No uso despliegues activados por etiquetas porque semantic release gestiona las etiquetas y todo lo demás por mí.

Básicamente, este es el Flujo Gitlab:

![Flujo Gitlab](/RBW_Gitlab_Flow.webp)

*Flujo Gitlab - fuente https://faun.dev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Una nota al margen sobre cómo funciona semantic-release:

En una rama de despliegue, cuando se activa semantic-release, calculará automáticamente el nuevo número de versión en esta rama, dependiendo del número de versión de la etiqueta anterior en la rama y las correcciones o características entregadas. Las correcciones crearán una nueva versión de parche, mientras que las características crearán una nueva versión menor. También incluye automáticamente el prelanzamiento `alpha`, `beta`, etc. en el número de versión.

Semantic release genera el registro de cambios desde tus commits, agrupando correcciones y características como se define en commits convencionales (ver https://www.conventionalcommits.org/en/about) y configurado en semantic release.

También actualizará todas tus solicitudes de extracción fusionadas de git (Github, en mi caso) y problemas relacionados con comentarios vinculándolos a la etiqueta y lanzamiento. Finalmente, en este lanzamiento de Github, adjuntará activos como código fuente, binarios si es necesario, `CHANGELOG.md`, etc.

## 4. Ramas, lanzamientos/prelanzamientos, canales en semantic release y en CapGo

Así que lo que quiero que semantic release haga para los despliegues CapGo es lo siguiente.

### Quiero que semantic release genere el número de versión

CapGo ha desarrollado y documentado su propia versión de la herramienta "Conventional Commits" `standard-version`, con su repositorio bifurcado `standard-version` (https://github.com/Cap-go/standard-version), y sus propios repositorios `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) así como `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version). Han documentado en su blog el esquema de versiones utilizado por CapGo en sus despliegues (https://capgo.app/blog/how-version-work-in-capgo/). Los paquetes JavaScript siguen el "estándar" semver "Semantic Versioning" (https://semver.org) que `semantic-release` también sigue (¡obviamente!)

Así que eso es genial, y es un alivio para mí porque uso `semantic-release` extensivamente.

### También quiero que semantic release genere despliegues de aplicaciones en diferentes canales

Como se mencionó anteriormente, necesito desplegar versiones de prelanzamiento desde ramas como `alpha`, `beta`, `nightly` etc., pero también versiones específicas para clientes en ramas como `production-customer-jones`, `production-customer-doe`, etc.

CapGo proporciona la función de "canales" que es exactamente lo que semantic release también soporta, así que estoy emocionado de hacerlos trabajar juntos. Estos también se adaptan a las diferentes compilaciones de ramas gestionadas por XCode Cloud (ver más sobre esto a continuación).

Los números de versión semver generados por semantic release en prelanzamientos se ven como `1.0.0-alpha.1`. Las compilaciones sucesivas en esta rama incrementarán el número de compilación a `1.0.0-alpha.2`, etc. Aunque no está documentado explícitamente, estos números de versión son soportados por CapGo, lo cual es una gran noticia para mí: usaré canales de semantic release y prelanzamiento para generar versiones de mi aplicación con canales Capgo.

## 5. ¿Cómo puedo usar CapGo para lanzar mi aplicación?

Para automatizar el despliegue de tus paquetes de aplicación a CapGo, necesitas usar el comando CLI de CapGo `bundle upload`. Escribe `npx @capgo/cli@latest bundle upload --help` para obtener las numerosas opciones de carga. Entre ellas, usaremos las siguientes:
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```
- CHANNEL es el canal CapGo al que queremos desplegar (ej. `alpha`)
- VERSION es generado por semantic release (ej. `1.0.0-alpha.1`)
- CAPGO_APIKEY es proporcionado por CapGo para identificar de manera única tu pipeline CI/CD
- CAPGO_APPID es proporcionado por CapGo para identificar de manera única tu aplicación (ej. `com.mystartup.mysuperapp`)

## 6. Mi configuración de semantic release + CapGo CapacitorUpdate

Finalmente, ¿cómo se integra todo esto?

![Versiones de paquetes de aplicación construidas con semantic release y Github Actions](/RBW_CapGo_channels_and_versions.webp)

*Versiones de paquetes de aplicación construidas con semantic release y Github Actions*

### Automatización de semantic release con Github Actions

La belleza de semantic release es que la automatización del despliegue, en forma de un flujo de trabajo de Github Action, es muy simple. Esto se verá muy similar en otras plataformas CI/CD.
```yaml
# ./github/workflows/release.yml

name: Release

on:
  workflow_dispatch:
  push:
    branches: [alpha, alpha-nocapgo, dev-rupert]    # <--- adapt this

env:
  CAPGO_APPID: com.mystartup.mysuperapp             # <--- adapt this
  CAPGO_APIKEY: ${{ secrets.CAPGO_APIKEY }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: "npm"
      - run: npm install
      - run: npx semantic-release
        env:
          DEBUG: true
          GITHUB_TOKEN: ${{ github.token }}
```

Esto solo instala el entorno NodeJS, luego llama a semantic release.

Para cada fusión en una rama listada en `branches`, semantic release activará un despliegue.
Configura `CAPGO_APIKEY` en los secretos de tu repositorio.
Actualiza tu `CAPGO_APPID` aquí.

El comportamiento de semantic release se establece en su archivo de configuración `.releaserc.json`.
Aquí están mis configuraciones, explicadas a continuación:
```json
// .releaserc.json

{
  "branches": [
    {
      "name": "release",
      "channel": "production"
    },
    {
      "name": "alpha",
      "channel": "alpha",
      "prerelease": "alpha"
    },
    {
      "name": "alpha-nocapgo",
      "channel": "alpha",
      "prerelease": "alpha-nocapgo"
    },
    {
      "name": "dev-rupert",
      "channel": "development",
      "prerelease": "development"
    },
    {
      "name": "dev-paul",
      "channel": "development",
      "prerelease": "development"
    }
  ],
  "ci": true,
  "debug": true,
  "dryRun": false,
  "repositoryUrl": "https://github.com/RupertBarrow/mysuperapp",

  "verifyConditions": ["@semantic-release/github"],

  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "breaking", "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "doc", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },

          { "scope": "no-release", "release": false }
        ]
      }
    ],

    "@semantic-release/release-notes-generator",

    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],

    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md", "ios/App/App.xcodeproj/project.pbxproj"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],

    ["@semantic-release/github", { "assets": ["CHANGELOG.md"] }],

    [
      "@semantic-release/exec",
      {
        "prepareCmd": "npm run build",
        "publishCmd": "npm add -D @capgo/cli && npx @capgo/cli bundle upload --channel ${branch.channel} --apikey $CAPGO_APIKEY --bundle ${nextRelease.version} --bundle-url $CAPGO_APPID"
      }
    ]
  ]
}
```

- `branches`:
  - `branches` establece la configuración de ramas (`name`), mapeadas al canal CapGo (`channel`) y cómo se llamará el número de versión de prelanzamiento (`prerelease`). Por ejemplo, si `branch.prerelease = "development"`, el número de versión generado por semantic release será `x.y.z-development.n`
  - los despliegues a las ramas `alpha` y `alpha-nocapgo` desplegarán ambos la aplicación en el canal `alpha`, pero con diferentes nombres de prelanzamiento en el número de versión
  - los despliegues a las ramas de desarrollador `dev-rupert` o `dev-paul` desplegarán ambos al canal `development` en CapGo, todos con la misma palabra clave `development` de prelanzamiento en el número de versión
- `verifyConditions`: en la primera etapa de semantic release, verifica que tiene el acceso correcto a Github. Espero agregar una verificación de autenticación para el CLI de CapGo aquí más tarde
- `@semantic-release/commit-analyzer`: cosas estándar de semantic release - ver su documentación (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator`: genera el archivo de registro de cambios como `CHANGELOG.md`
- `@semantic-release/git`: confirma los siguientes archivos que han sido actualizados por la compilación Ionic de la aplicación y por el trabajo de semantic release (`package.json`, `CHANGELOG.md` y `ios/App/App.xcodeproj/project.pbxproj` - aún no compilo para Android)
- `@semantic-release/github`: adjunta el archivo `CHANGELOG.md` al lanzamiento de Github como un activo
- `@semantic-release/exec`: usa estos 2 comandos para preparar la compilación de la aplicación (`prepareCmd`) y luego efectivamente construir y desplegar el paquete de la aplicación a los servidores CapGo (`publishCmd`)

Notarás que no hay que lidiar con explicar cómo queremos que se calcule e incremente el número de versión, cómo necesitamos generar un registro de cambios, una etiqueta o lanzamiento de Github, etc.: todo es manejado por defecto por semantic release, con una configuración mínima.

### Construyendo nuevos binarios con XCode Cloud

La integración de todo esto con XCode Cloud para construir nuevas versiones del binario de la aplicación es simple (aún no estoy implementando en Google Play, pero esa compilación debería ser similar):
- Configuré un proceso de XCode Cloud para compilar cuando hay un cambio en la rama que deseo usar para esto (por ejemplo `production`)
- en esta rama, configuré XCode Cloud para compilar solo cuando se actualiza el archivo `CHANGELOG.md`. Esto se actualiza después de cada versión generada por semantic release
- Puedo activar compilaciones en diferentes ramas para simular el despliegue para diferentes canales. En cada configuración de compilación de XCode Cloud en una rama diferente, establezco manualmente una variable de ambiente con el valor de `branch.channel` definido en `releaserc.json` (sí, esto es una duplicación manual) y luego, si quisiera, podría desplegar una aplicación AppStore diferente para cada aplicación personalizada de cliente desplegada desde una rama de lanzamiento personalizada, como se mencionó anteriormente.

![Building app binaries on XCode Cloud with CapGo channels](/RBW_XCode_Cloud_building.webp)

*Construyendo binarios de aplicación en XCode Cloud con canales CapGo*

## 7. Conclusión

En conclusión, estoy muy contento de haber podido integrar CapGo CapacitorUpdater en mi pipeline estándar de semantic release, rápidamente dentro del período de prueba de 14 días, y el resultado es el siguiente:
- los números de versión del bundle se generan automáticamente por semantic release y son compatibles con los servidores CapGo
- semantic release despliega automáticamente los bundles de aplicación CapGo, también haciendo uso de los canales CapGo
- esto se ajusta perfectamente con las compilaciones de binarios de aplicación de XCode Cloud

### Próximos pasos

Actualmente estoy en la fase de desarrollo de esta aplicación. La pondré rápidamente a disposición de los probadores a través de TestFlight (para iOS). Considerando el poder de CapGo, seguramente desplegaré una versión gratuita de la aplicación en la AppStore para pruebas, que se actualizará regularmente con CapGo durante las pruebas. Luego desplegaré otra versión (de pago) de la aplicación en la AppStore, bajo otro registro, y también la actualizaré regularmente con CapGo.

Espero agregar una mejor verificación previa a la compilación de los prerrequisitos de `bundle upload` de CapGo en mi configuración de semantic release.

Ahora tengo un pipeline de semantic release limpio, simple y reproducible para futuras aplicaciones móviles desarrolladas con Ionic + Angular + Capacitor.

## Autor - Rupert Barrow

Tengo más de 22 años de experiencia en Salesforce, como cliente y usuario, como socio e integrador, arquitecto, desarrollador, analista de negocios y consultor. Cofundé y cogestioné Altius Services como COO y CTO durante 13 años, un exitoso socio SI de Salesforce en Francia, antes de embarcarme en una nueva aventura como solopreneur de Salesforce con mi oferta de producto **Rapido Cloud**.

Puedes encontrarme en LinkedIn en https://linkedin.com/in/rbarrow.

Puedes echar un vistazo a nuestras ofertas de Salesforce en https://www.rapido-companion.app y https://www.rapido.cloud (en desarrollo).
