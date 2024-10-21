---
slug: how-version-work-in-capgo
title: Cómo funcionan las versiones en Capgo
description: >-
  Comprenda cómo Capgo gestiona las versiones en su aplicación Capacitor y
  utilícelo de manera óptima. Conozca el significado de Mayor, Menor y Parche.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Sistema de versiones de paquetes de Capgo
tag: Tutorial
published: true
locale: es
next_blog: how-to-release-major-version-in-capgo
---

Capgo utiliza 2 variables principales para gestionar las versiones en tu aplicación Capacitor:
  - Versión nativa
  - Versiones de JavaScript

Todas las elecciones de versiones son decididas por Capgo en el lado del servidor

## Sistema de versionado

Para gestionar versiones, Capgo utiliza el sistema SemVer, lee más sobre él [aquí](https://semver.org/)

### Versiones

Dónde Capgo encuentra la versión para comparar

  > Puedes anular este comportamiento configurando la clave version en el archivo `capacitor.config.json` [documentación aquí](/docs/plugin/settings/#version)
  > La versión nativa será ignorada para todas las plataformas

#### iOS

 En iOS la variable se establece en tu proyecto aquí `ios/App/App/Info.plist` bajo la clave `CFBundleShortVersionString` o `ios/App/App.xcodeproj/project.pbxproj` bajo la clave `MARKETING_VERSION` si `MARKETING_VERSION` se estableció en tu archivo `Info.plist`

#### Android

  En Android, la variable se establece en tu proyecto aquí `android/app/build.gradle` bajo la clave `defaultConfig.versionName`

#### JavaScript (versión del paquete Capgo)

  En JavaScript, la variable se puede establecer en tu `package.json` bajo la clave `version`
  De lo contrario, necesitas proporcionarla en el comando de carga

## Comportamiento predeterminado

Así es como se comportará el canal Capgo si no cambiaste ninguna configuración

> Este comportamiento se basará en el único canal que hiciste predeterminado

### Cuando se realiza una instalación nueva de tu aplicación Capacitor
Cuando el usuario descarga tu aplicación Ionic por primera vez y la abre, contacta con el servidor de Capgo

Actualmente, pueden ocurrir 4 resultados:
  - La versión del paquete nativo (1.2.3) es menor que la versión del paquete Capgo (1.2.4), Capgo envía su paquete al usuario
  - La versión del paquete nativo (1.2.3) es igual a la versión del paquete Capgo (1.2.3), Capgo envía "no es necesario actualizar"
  - La versión del paquete nativo (1.2.4) es mayor que la versión del paquete Capgo (1.2.3), Capgo envía "no es necesario actualizar"
  - La versión del paquete nativo (1.2.3) es MAYOR menor que la versión del paquete Capgo (2.2.3), Capgo envía "no es necesario actualizar"

### Otras configuraciones

#### Deshabilitar la degradación automática por debajo de la nativa

Si cambias esta configuración a falso, Capgo considerará que siempre es la fuente confiable de la versión
Entonces el comportamiento se convierte en:
- La versión nativa (1.2.4) es mayor que la versión de Capgo (1.2.3)

> Capgo envía su versión al usuario

#### Deshabilitar la estrategia de actualización automática

Hay un par de estrategias entre las que puedes elegir. Puedes aprender más sobre esto [aquí](/docs/tooling/cli/#disable-updates-strategy)

## Versión del paquete JavaScript

La versión del paquete JavaScript es la que envías al hacer `npx @capgo/cli@latest bundle upload --channel production`

Si no usaste la opción `--bundle 1.2.3`, Capgo obtendrá la versión del paquete de tu archivo `package.json` (en la clave version)

Después de que tu aplicación Ionic haya instalado una versión de Capgo, esta es la versión que se comparará para:
  - Su versión del paquete JavaScript (1.2.3) es menor que la versión del paquete Capgo (1.2.4), Capgo envía su paquete al usuario

Con algunas condiciones de protección:
  - Si la versión del paquete nativo es mayor que la versión de Capgo, se aplica la condición "Deshabilitar degradación automática por debajo de la nativa"
  - Si la versión del paquete nativo es MAYOR menor que la versión de Capgo, se aplica la condición "Deshabilitar actualización automática por encima de la mayor"

## Actualización de la tienda de aplicaciones

Cuando publicas tu aplicación Capacitor JS en la tienda de aplicaciones, lo que sucede es simple

Tu usuario obtendrá la nueva versión de la tienda y eliminará todas las actualizaciones locales en su aplicación por defecto

Si quieres cambiar ese comportamiento, necesitas establecer la configuración `resetWhenUpdate`, lee más sobre esto [aquí](/docs/plugin/api#settings)

Esto solo se puede cambiar en el lado de la aplicación, no desde la nube como otras configuraciones

### Otras configuraciones

Después de todo este comportamiento, puedes tener además algunos específicos vinculados al deviceID

En Capgo, puedes decidir anular el comportamiento para cada deviceID

Puedes vincular un deviceID a:
  - una versión específica del paquete
  - un canal específico

Esto anulará todas las configuraciones hechas anteriormente

Aprende más sobre esto en el artículo a continuación