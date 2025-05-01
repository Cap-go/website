---
slug: how-to-release-major-version-in-capgo
title: Come rilasciare una versione major in capgo
description: アプリのクリティカルバージョンをユーザーアプリを破損することなくリリースする必要がある時期と方法を理解する
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Sistema de versiones principales de Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: es
next_blog: how-to-send-specific-version-to-users
---

## Al lanzar una versión mayor

El versionado puede ser difícil de gestionar, generalmente se quiere enviar una actualización Mayor cuando aparece un cambio importante para los usuarios

Pero el versionado no está hecho para eso, la versión de la tienda de aplicaciones es diferente de la versión Nativa

La versión Nativa está hecha para gestionar cambios disruptivos en el *código*

En iOS, por ejemplo, iOS 16 es la `versión de tienda` de Apple, pero la versión de código es `20A5283p` (parece que no usan SemVer allí)

¡Ahora está claro que no los mezclamos y los usamos para lo que están hechos!

## Versión mayor

En tu aplicación Capacitor, una versión mayor es necesaria cuando ocurre un cambio disruptivo
Por ejemplo, un nuevo objetivo de iOS (15 a 16), o una nueva versión de Capacitor (3 a 4), o un plugin (12 a 20) que uses ha sido actualizado a una versión mayor

Este cambio significa que todas las herramientas deben alinearse para manejar el cambio disruptivo

Por eso Capgo sigue este sistema
Así que si lanzas una versión mayor, Capgo no la enviará a un usuario que no la tenga instalada desde la tienda\
Este comportamiento puede personalizarse. Puedes aprender más sobre esto [aquí](/docs/cli/commands/#disable-updates-strategy)

### Versiones

Dónde Capgo encuentra la versión para comparar

#### iOS
  > Será utilizada por Capgo para comparar con la versión JavaScript y encontrar actualizaciones Mayores

  En iOS la variable se establece en tu proyecto aquí `ios/App/App/Infoplist` bajo la clave `CFBundleShortVersionString` o `ios/App/Appxcodeproj/projectpbxproj` bajo la clave `MARKETING_VERSION` si `MARKETING_VERSION` fue establecido en tu archivo `Infoplist`
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

Estás realizando la actualización a Capacitor 4

Necesitas actualizar tu número de versión a `223`, entonces todos tus paquetes incluidos Capgo notarán este gran cambio

Cuando lanzas esta versión a Capgo y la App Store

Todas las siguientes actualizaciones en vivo en Capgo `224` nunca serán enviadas a usuarios con versión `123` Solo con versión `223`

Si sigues este patrón, no hay que preocuparse más, todo está bien manejado

## Si no sigo esto

En este caso, significa que tienes que enviar tu nueva aplicación con Capacitor 4 a Apple y Google, pero no a Capgo

Entonces tienes que esperar que el 100% de tus usuarios, o al menos el 90%, tengan la aplicación, lo que tomará meses, probablemente

Mientras que durante este tiempo no puedes enviar ninguna actualización con Capgo, ya que los usuarios antiguos no pueden obtener la nueva versión
No tienes una manera de seleccionar solo algunos usuarios para recibir la actualización