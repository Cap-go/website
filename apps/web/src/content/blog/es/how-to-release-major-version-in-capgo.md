---
slug: how-to-release-major-version-in-capgo
title: Cómo lanzar una versión importante en capgo
description: >-
  Entiende cómo y cuándo es necesario lanzar una versión principal para tu
  aplicación sin afectar la aplicación de tus usuarios.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Sistema de versión principal de Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: how-to-send-specific-version-to-users
---
## Al liberar una versión importante

La gestión de versiones puede ser difícil, generalmente deseas enviar una actualización importante cuando aparece un cambio significativo para los usuarios.

Pero la versión no está hecha para eso, la versión de la tienda de aplicaciones es diferente de la versión nativa.

La versión nativa está diseñada para gestionar cambios incompatibles en el *código*.

En iOS, por ejemplo, iOS 16 es la `versión de la tienda` de Apple, pero la versión del código es `20A5283p` (no parecen usar SemVer allí).

¡Ahora queda claro que no debemos mezclar ambos y usarlos para lo que están hechos!

## Lanzamiento importante

En tu aplicación de Capacitor, un lanzamiento importante es necesario cuando ocurre un cambio incompatible. 
Por ejemplo, un nuevo objetivo de iOS (de 15 a 16), o una nueva versión de Capacitor (de 3 a 4), o un plugin (de 1.2 a 2.0) que utilizas ha sido actualizado a una versión mayor.

Este cambio significa que todas las herramientas deben estar alineadas para manejar el cambio incompatible.

Por eso Capgo sigue este sistema. 
Así que si lanzas una versión importante, Capgo no la enviará a un usuario que no la haya instalado desde la tienda.\
Este comportamiento puede ser personalizado. Puedes aprender más sobre esto [aquí](/docs/cli/commands/#disable-updates-strategy).

### Versiones

Dónde Capgo encuentra la versión para comparar.

#### IOS
  > Será utilizado por Capgo para comparar con la versión de JavaScript y encontrar una actualización mayor.

 En iOS, la variable se establece en tu proyecto aquí `ios/App/App/Info.plist` bajo la clave `CFBundleShortVersionString` o `ios/App/App.xcodeproj/project.pbxproj` bajo la clave `MARKETING_VERSION` si `MARKETING_VERSION` se estableció en tu archivo `Info.plist`.
  > Puedes anular este comportamiento configurando la clave de versión en el archivo `capacitor.config.json` [documentos aquí](/docs/plugin/auto-update#advanced-settings/).

#### Android
  > Será utilizado por Capgo para comparar con la versión de JavaScript y encontrar una actualización mayor.

  En Android, la variable se establece en tu proyecto aquí `android/app/build.gradle` bajo la clave `defaultConfig.versionName`.
  > Puedes anular este comportamiento configurando la clave de versión en el archivo `capacitor.config.json` [documentos aquí](/docs/plugin/auto-update#advanced-settings/).

#### JavaScript
  > Será utilizado por Capgo para comparar con la versión nativa y encontrar una actualización mayor.

  En JavaScript, la variable se establece en tu proyecto aquí `package.json` bajo la clave `version`.

## Ejemplo

Tu aplicación Ionic fue lanzada actualmente con la versión `1.2.3` con Capacitor 3.

Estás realizando la actualización a Capacitor 4.

Necesitas actualizar tu número de versión a `2.2.3`, luego todos tus paquetes, incluido Capgo, notificarán este gran cambio.

Cuando liberes esta versión a Capgo y la App Store.

Todas las siguientes actualizaciones en vivo en Capgo `2.2.4` nunca serán enviadas a usuarios con la versión `1.2.3`. Solo con la versión `2.2.3`.

Si sigues este patrón, no tendrás que preocuparte más, todo se maneja bien.

## Si no sigo esto

En este caso, eso significa que debes enviar tu nueva aplicación con Capacitor 4 a Apple y Google, pero no a Capgo.

Entonces tendrás que esperar que el 100% de tus usuarios tenga la aplicación o al menos el 90%, lo que tomará meses, probablemente.

Mientras tanto, durante este tiempo no podrás enviar ninguna actualización con Capgo, ya que los usuarios antiguos no pueden obtener la nueva versión.
No tienes una forma de seleccionar solo algunos usuarios para recibir la actualización.
