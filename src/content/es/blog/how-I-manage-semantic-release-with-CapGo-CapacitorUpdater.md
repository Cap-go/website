---
slug: how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Cómo Rapido Cloud gestiona el lanzamiento semántico con CapGo CapacitorUpdater
description: >-
  Así es como configuré Semantic Release para gestionar las publicaciones de mis
  aplicaciones que utilizan CapGo CapacitorUpdater
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
tag: Case Study
published: true
locale: es
next_blog: ''
---

# Cómo Rapido Cloud gestiona Semantic Release con CapGo CapacitorUpdater

## 1 Introducción

En Rapido Cloud (wwwrapidocloud), estoy desarrollando una aplicación móvil para clientes de Salesforce para que puedan implementar fácilmente su propia aplicación móvil con marca sin tener que pasar por los difíciles bucles de usar el SDK móvil de Salesforce o el Mobile Publisher de Salesforce.

He desarrollado esta aplicación móvil en una plataforma moderna y "estándar" con componentes y herramientas ampliamente utilizados, incluyendo Ionic 8, Angular 18, TypeScript, Capacitor y ahora CapGo CapacitorUpdater. Estos son más simples de manejar para los clientes que no quieren gestionar las especificidades de la plataforma Salesforce como los Lightning Web Components; y es más fácil y económico para mí reclutar desarrolladores y mantenedores de aplicaciones móviles Ionic + Angular.

Este artículo explica mi diseño, mis elecciones e implementación que hacen de CapGo y `semantic-release` una opción muy exitosa y obvia para gestionar todas las implementaciones automáticamente a través de Github Actions. Todo esto fue diseñado, probado y documentado durante el agradable período de prueba gratuito de 14 días de CapGo CapacitorUpdater.

## 2 ¿Por qué usar CapGo? ¿Por qué usar semantic-release?

CapGo CapacitorUpdater me atrajo con su promesa de hacer las implementaciones de aplicaciones móviles mucho más simples, rápidas y flexibles que pasar por el proceso de entrega estándar de Apple AppStore/Google PlayStore.
Esta es mi primera aplicación móvil que estoy subiendo a las tiendas, habiéndome concentrado en el pasado en aplicaciones web, generalmente desarrolladas en Salesforce Experience Cloud.

Tenía bastante miedo de la curva de aprendizaje para que esto fuera exitoso, pero logré subir mi aplicación a Apple TestFlight con bastante facilidad. Luego estuve en posición de usar CapGo CapacitorUpdater para implementar mis actualizaciones mucho más rápido.

Mi primer requisito y caso de prueba fue implementar para mí mismo para probar mi aplicación como una aplicación móvil real en mi propio teléfono, en lugar de probar en un emulador móvil o en un simulador a través del navegador móvil Nexus sugerido por Ionic. Esto se debe a que mi aplicación utiliza funciones nativas como Geolocalización o acceso a la Galería de Fotos y la Cámara. Al no tener experiencia previa en probar una aplicación móvil Capacitor, no estaba seguro si todo iba a funcionar correctamente: ¡nada mejor que probar la aplicación real, en condiciones reales!

Así que CapGo CapacitorUpdater me ayudó a actualizar mi aplicación en mi móvil, en vivo, 1 minuto después de guardar una nueva función o corrección en mi código fuente: ¡tan aliviador, tan flexible y fácil de configurar!

## 3 Mi modelo de ramificación y lanzamiento, y cómo se adapta semantic-release

Ahora que tengo mi entrega a los servidores CapGo funcionando correctamente, necesito automatizar esto y ajustarlo a mi pipeline de CI/CD.

### Así es como organizo mi modelo de ramificación y lanzamiento

Para cada aplicación, ya sea móvil, web o Salesforce:
- El **desarrollo** se lleva a cabo en ramas `feature/` derivadas de `main`, y se fusionan en `main`, que es la referencia para la mayoría de las ramas de desarrollo, fuera del mantenimiento y características específicas para entregas personalizadas (más sobre esto a continuación).
- **Las implementaciones se activan __desde ramas de lanzamiento__** que pueden ser: `production`, ramas de prelanzamiento (`alpha`, `beta`, `nightly`, etc.) y también ramas específicas de clientes o contextos para entregas personalizadas.
- **Las implementaciones se activan mediante una solicitud de extracción** que se fusiona en una rama de implementación. No uso implementaciones activadas por etiquetas porque semantic-release gestiona las etiquetas y todo lo demás por mí.

Básicamente, este es el Flujo de Gitlab:

![Flujo de Gitlab](/RBW_Gitlab_Flowwebp)

*Flujo de Gitlab - fuente https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### Una nota al margen sobre cómo funciona semantic-release:

En una rama de implementación, cuando se activa semantic-release, calculará automáticamente el nuevo número de versión en esta rama, dependiendo del número de versión de la etiqueta anterior en la rama y las correcciones o características entregadas. Las correcciones crearán una nueva versión de parche, mientras que las características crearán una nueva versión menor.También incluye automáticamente la versión preliminar `alpha`, `beta`, etc. en el número de versión

Semantic release genera el registro de cambios a partir de tus commits, agrupando correcciones y funciones según lo definido en los commits convencionales (ver https://www.conventionalcommits.org/en/about) y configurado en semantic release

También actualizará todas tus solicitudes de extracción fusionadas de git (GitHub, en mi caso) y los problemas relacionados con comentarios que los vinculan a la etiqueta y la versión. Finalmente, en esta versión de GitHub, adjuntará activos como código fuente, binarios si es necesario, `CHANGELOG.md`, etc.

## 4. Ramas, versiones/versiones preliminares, canales en semantic release y en CapGo

Entonces, lo que quiero que semantic release haga para los despliegues de CapGo es lo siguiente

### Quiero que semantic release genere el número de versión

CapGo ha desarrollado y documentado su propia versión de la herramienta "Conventional Commits" `standard-version`, con su repositorio bifurcado `standard-version` (https://github.com/Cap-go/standard-version), y sus propios repositorios `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version) así como `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version). Han documentado en su blog el esquema de versiones utilizado por CapGo en sus despliegues (https://capgo.app/blog/how-version-work-in-capgo/). Los paquetes JavaScript siguen el "estándar" semver "Versionado Semántico" (https://semver.org) que `semantic-release` también sigue (¡obviamente!)

Así que eso es genial, y es un alivio para mí porque uso `semantic-release` extensamente

### También quiero que semantic release genere despliegues de aplicaciones en diferentes canales

Como se mencionó anteriormente, necesito desplegar versiones preliminares desde ramas como `alpha`, `beta`, `nightly`, etc., pero también versiones específicas para clientes en ramas como `production-customer-jones`, `production-customer-doe`, etc.

CapGo proporciona la función de "canales" que es exactamente lo que semantic release también admite, así que estoy emocionado de hacerlos trabajar juntos. Estos también se ajustan a las diferentes compilaciones de ramas gestionadas por XCode Cloud (ver más sobre esto a continuación)

Los números de versión semver generados por semantic release en las versiones preliminares se ven como `1.0.0-alpha.1`. Las compilaciones sucesivas en esta rama incrementarán el número de compilación a `1.0.0-alpha.2`, etc. Aunque no está documentado explícitamente, estos números de versión son compatibles con CapGo, lo cual es una gran noticia para mí: usaré los canales y versiones preliminares de semantic release para generar versiones de mi aplicación con los canales de Capgo

## 5. ¿Cómo puedo usar CapGo para lanzar mi aplicación?

Para automatizar el despliegue de los paquetes de tu aplicación a CapGo, necesitas usar el comando CLI de CapGo `bundle upload`. Escribe `npx @capgo/cli@latest bundle upload --help` para obtener las numerosas opciones de carga. Entre ellas, usaremos las siguientes:

## 6. Mi configuración de semantic release + CapGo CapacitorUpdate

Finalmente, ¿cómo encaja todo esto?

![Versiones de paquetes de aplicaciones construidas con semantic release y Github Actions](/RBW_CapGo_channels_and_versions.webp)

*Versiones de paquetes de aplicaciones construidas con semantic release y Github Actions*

### Automatización de semantic release con Github Actions

La belleza de semantic release es que la automatización del despliegue, en forma de un flujo de trabajo de Github Action, es muy simple. Esto se verá muy similar en otras plataformas de CI/CD.

Esto simplemente instala el entorno NodeJS, luego llama a semantic release

Para cada fusión en una rama listada en `branches`, semantic release activará un despliegue
Establece `CAPGO_APIKEY` en los secretos de tu repositorio
Actualiza tu `CAPGO_APPID` aquí

El comportamiento de semantic release se establece en su archivo de configuración `releaser.json`Aquí están mis ajustes, explicados a continuación:

```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```

- `branches`:
  - `branches` establece la configuración de ramas (`name`), mapeadas al canal de CapGo (`channel`) y cómo se llamará el número de versión preliminar (`prerelease`). Por ejemplo, si `branch.prerelease = "development"`, el número de versión generado por semantic release será `x.y.z-development.n`
  - Los despliegues a las ramas `alpha` y `alpha-nocapgo` implementarán la aplicación en el canal `alpha`, pero con diferentes nombres de prelanzamiento en el número de versión
  - Los despliegues a las ramas de desarrolladores `dev-rupert` o `dev-paul` implementarán en el canal `development` de CapGo, todos con la misma palabra clave `development` de prelanzamiento en el número de versión
- `verifyConditions`: en la primera etapa de semantic release, verifica que tenga el acceso correcto a Github. Espero agregar una verificación de autenticación para la CLI de CapGo aquí más adelante
- `@semantic-release/commit-analyzer`: cosas estándar de semantic release - ver su documentación (https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format)
- `@semantic-release/release-notes-generator`: genera el archivo de registro de cambios como `CHANGELOG.md`
- `@semantic-release/git`: confirma los siguientes archivos que han sido actualizados por la compilación Ionic de la aplicación y por el trabajo de semantic release (`package.json`, `CHANGELOG.md` y `ios/App/App.xcodeproj/project.pbxproj` - aún no compilo para Android)
- `@semantic-release/github`: adjunta el archivo `CHANGELOG.md` al lanzamiento de Github como un activo
- `@semantic-release/exec`: usa estos 2 comandos para preparar la compilación de la aplicación (`prepareCmd`) y luego para construir y desplegar efectivamente el paquete de la aplicación a los servidores de CapGo (`publishCmd`)

Notarás que no hay manipulación para explicar cómo queremos que se calcule e incremente el número de versión, cómo necesitamos generar un registro de cambios, una etiqueta o lanzamiento de Github, etc.: todo es manejado por defecto por semantic release, con una configuración mínima

### Construyendo nuevos binarios con XCode Cloud

Integrar todo esto con XCode Cloud para construir nuevas versiones del binario de la aplicación es simple (aún no estoy implementando en Google Play, pero esa compilación debería ser similar):
- Configuro un proceso de XCode Cloud para compilar cuando hay un cambio en la rama que deseo usar para esto (por ejemplo, `production`)
- En esta rama, configuro XCode Cloud para compilar solo cuando se actualiza el archivo `CHANGELOG.md`. Esto se actualiza después de cada versión generada por semantic release
- Puedo activar compilaciones en diferentes ramas para simular el despliegue para diferentes canales. En cada configuración de compilación de XCode Cloud en una rama diferente, establezco manualmente una variable de entorno con el valor de `branch.channel` establecido en `releaser.json` (sí, esta es una duplicación manual) y luego, si quisiera, podría implementar una aplicación AppStore diferente para cada aplicación personalizada de cliente implementada desde una rama de lanzamiento personalizada, como se mencionó anteriormente

![Construyendo binarios de aplicaciones en XCode Cloud con canales CapGo](/RBW_XCode_Cloud_building.webp)

*Construyendo binarios de aplicaciones en XCode Cloud con canales CapGo*

## 7 Conclusión

En conclusión, estoy muy contento de haber podido integrar CapGo CapacitorUpdater en mi pipeline estándar de semantic release, rápidamente dentro del plazo del período de prueba de 14 días, y el resultado es el siguiente:
- Los números de versión del paquete se generan automáticamente por semantic release y son compatibles con los servidores de CapGo
- Semantic release implementa automáticamente los paquetes de aplicaciones de CapGo, también haciendo uso de los canales de CapGo
- Esto se ajusta perfectamente a las compilaciones de XCode Cloud de los binarios de la aplicación

### Próximos pasos

Actualmente estoy en la fase de desarrollo de esta aplicación. La pondré rápidamente a disposición de los probadores a través de TestFlight (para iOS). Considerando el poder de CapGo, seguramente implementaré una versión gratuita de la aplicación en la AppStore para pruebas, que se actualizará regularmente con CapGo durante las pruebasLuego implementaré otra versión (de pago) de la aplicación en la AppStore, bajo otro registro, y también la actualizaré regularmente con CapGo

Espero agregar una mejor verificación previa a la compilación de los requisitos previos de `bundle upload` de CapGo en mi configuración de lanzamiento semántico

Ahora tengo un proceso de lanzamiento semántico limpio, simple y reproducible para futuras aplicaciones móviles desarrolladas con Ionic + Angular + Capacitor

## Autor - Rupert Barrow

Tengo más de 22 años de experiencia en Salesforce, como cliente y usuario, como socio e integrador, arquitecto, desarrollador, analista de negocios y consultor. Cofundé y codirigí Altius Services como COO y CTO durante 13 años, un exitoso socio integrador de sistemas de Salesforce en Francia, antes de embarcarme en una nueva aventura como emprendedor independiente de Salesforce con mi oferta de producto **Rapido Cloud**

Puedes encontrarme en LinkedIn en https://linkedincom/in/rbarrow

Puedes echar un vistazo a nuestras ofertas de Salesforce en https://wwwrapido-companionapp y https://wwwrapidocloud (en desarrollo)