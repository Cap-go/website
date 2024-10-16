---
slug: how-to-release-major-version-in-capgo
title: Así es como se publica una versión principal en Capgo
description: >-
  Comprenda cómo y cuándo es necesario publicar una versión principal de su
  aplicación sin dañar la aplicación del usuario
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Sistema principal de versiones de Capgo
tag: Tutorial
published: true
locale: es
next_blog: how-to-send-specific-version-to-users
---

## Al lanzar una versión mayor

La gestión de versiones puede ser difícil, generalmente se quiere enviar una actualización Mayor cuando aparece un cambio importante para los usuarios

Pero el versionado no está hecho para eso, la versión de la tienda de aplicaciones es diferente de la versión Nativa

La versión Nativa está hecha para gestionar cambios importantes en el *código*

En iOS, por ejemplo, iOS 16 es la `versión de tienda` de Apple, pero la versión de código es `20A5283p` (parece que no usan SemVer allí)

¡Ahora está claro que no los mezclamos y los usamos para lo que están hechos!

## Lanzamiento mayor

En tu aplicación Capacitor, un lanzamiento mayor es necesario cuando ocurre un cambio importante
Por ejemplo, un nuevo objetivo de iOS (15 a 16), o una nueva versión de Capacitor (3 a 4), o un plugin (12 a 20) que usas ha sido actualizado a una versión mayor

Este cambio significa que todas las herramientas deben alinearse para manejar el cambio importante

Por eso Capgo sigue este sistema
Así que si lanzas una versión mayor, Capgo no la enviará a un usuario que no la tenga instalada desde la tienda\
Este comportamiento se puede personalizar. Puedes aprender más sobre ello [aquí](/docs/tooling/cli/#disable-updates-strategy)

### Versiones

Dónde Capgo encuentra la versión para comparar

#### iOS
  > Será utilizada por Capgo para comparar con la versión JavaScript y encontrar actualizaciones Mayores

 En iOS la variable se establece en tu proyecto aquí `ios/App/App/Infoplist` bajo la clave `CFBundleShortVersionString` o `ios/App/Appxcodeproj/projectpbxproj` bajo la clave `MARKETING_VERSION` si `MARKETING_VERSION` se estableció en tu archivo `Infoplist`
  > Puedes anular este comportamiento estableciendo la clave version en el archivo `capacitorconfigjson` [documentación aquí](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Será utilizada por Capgo para comparar con la versión JavaScript y encontrar actualizaciones Mayores

  En Android, la variable se establece en tu proyecto aquí `android/app/buildgradle` bajo la clave `defaultConfigversionName`
  > Puedes anular este comportamiento estableciendo la clave version en el archivo `capacitorconfigjson` [documentación aquí](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Será utilizada por Capgo para comparar con la versión Nativa y encontrar actualizaciones Mayores

  En JavaScript, la variable se establece en tu proyecto aquí `packagejson` bajo la clave `version`

## Ejemplo

Tu aplicación Ionic está actualmente lanzada con la versión `123` con Capacitor 3

Estás haciendo la actualización a Capacitor 4

Necesitas actualizar tu número de versión a `223`, entonces todos tus paquetes incluyendo Capgo notarán este gran cambio

Cuando lances esta versión a Capgo y la App Store

Todas las próximas actualizaciones en vivo en Capgo `224` nunca se enviarán a usuarios con la versión `123` Solo a los con la versión `223`

Si sigues este patrón, no hay necesidad de preocuparse más, todo está bien manejado

## Si no sigo esto

En este caso, significa que tienes que enviar tu nueva aplicación con Capacitor 4 a Apple y Google, pero no a Capgo

Luego tienes que esperar que el 100% de tus usuarios, o al menos el 90%, tengan la aplicación, lo que probablemente tomará meses

Mientras tanto, durante este tiempo no puedes enviar ninguna actualización con Capgo, ya que los usuarios antiguos no pueden obtener la nueva versión
No tienes una forma de seleccionar solo algunos usuarios para recibir la actualización