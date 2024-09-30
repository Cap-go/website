---
slug: how-to-release-major-version-in-capgo
title: Comentario publicador de una versión mayor en Capgo
description: >-
  Comprender comentarios y cuando sea necesario publicar una versión mayor de su
  aplicación sin interrumpir su usuario de la aplicación
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgo major version system
tag: Tutorial
published: true
next_blog: how-to-send-specific-version-to-users
locale: es
---

## Al lanzar una versión principal

El control de versiones puede ser difícil de administrar; por lo general, desea enviar una actualización importante cuando aparece un cambio importante para los usuarios.

Pero el versionado no está hecho para eso, la versión de la tienda de aplicaciones es diferente a la versión Nativa.

La versión nativa está hecha para gestionar cambios importantes en el *código*

En IOS, por ejemplo, iOS 16 es la "versión de tienda" de Apple, pero la versión del código es "20A5283p" (parece que allí no usan SemVer)

¡Ahora está claro que no los mezclamos ni los usamos para lo que están hechos!

## Lanzamiento importante

En su aplicación Capacitor, es necesaria una versión importante cuando ocurre un cambio importante 
Por ejemplo, un nuevo destino de IOS (15 a 16), una nueva versión de Capacitor (3 a 4) o un complemento (12 a 20) que utiliza se han actualizado a una versión principal.

Este cambio significa que todas las herramientas deben estar alineadas para manejar el cambio importante.

Por eso Capgo sigue este sistema.
Entonces, si lanza una versión principal, Capgo no la enviará a un usuario que no la tenga instalada desde la tienda\
Este comportamiento se puede personalizar. Puede obtener más información al respecto [aquí](/docs/tooling/cli/#disable-updates-strategy)

### Versiones

Donde Capgo encuentra la versión para comparar

#### IOS
  > Capgo lo utilizará para comparar con la versión de JavaScript y encontrar una actualización importante

 En IOS, la var se configura en su proyecto aquí `ios/App/App/Infoplist` bajo la clave`CFBundleShortVersionString` o `ios/App/Appxcodeproj/projectpbxproj` bajo la clave `MARKETING_VERSION` si `MARKETING_VERSION` se configuró en su ` archivo infoplist`
  > Puede anular este comportamiento configurando la clave de versión en el archivo `capacitorconfigjson` [docs aquí](/docs/plugin/auto-update#advanced-settings/)

#### androide
  > Capgo lo utilizará para comparar con la versión de JavaScript y encontrar una actualización importante.

  en Android, la var se configura en su proyecto aquí `android/app/buildgradle` bajo la clave `defaultConfigversionName`
  > Puede anular este comportamiento configurando la clave de versión en el archivo `capacitorconfigjson` [docs aquí](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Capgo lo utilizará para comparar con la versión nativa y encontrar una actualización importante

  en JavaScript, la var se establece en su proyecto aquí `packagejson` bajo la clave `version`
## Ejemplo

Su aplicación Ionic se lanzó actualmente con la versión `123` con Capacitor 3

Estás haciendo la actualización al condensador 4.

Necesita actualizar su número de versión a `223`, luego todos sus paquetes incluyen Capgo y observe este gran cambio.

Cuando lanzas esta versión a Capgo y App Store

Todas las próximas actualizaciones en vivo en Capgo `224` nunca se enviarán al usuario con la versión `123` Solo con la versión `223`

Si sigues este patrón, no tendrás que preocuparte más, todo estará bien manejado.


## Si no sigo esto

En este caso, eso significa que tienes que enviar tu nueva aplicación con Capacitor 4 a Apple y Google, pero no a Capgo.

Luego tienes que esperar que el 100% de tus usuarios tengan la aplicación o al menos el 90%, tardará meses, probablemente

Mientras que durante este tiempo no puedes enviar ninguna actualización con Capgo, ya que el usuario anterior no puede obtener la nueva versión.
No tienes forma de seleccionar solo algunos usuarios para recibir la actualización.