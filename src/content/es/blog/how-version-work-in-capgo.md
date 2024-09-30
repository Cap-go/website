---
slug: how-version-work-in-capgo
title: Cómo funciona la versión en Capgo
description: >-
  Comprenda cómo Capgo administra las versiones en su aplicación Capacitor y
  utilícela de la mejor manera. Aprenda el significado de parche mayor, menor.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Capgo bundle version system
tag: Tutorial
published: true
next_blog: how-to-release-major-version-in-capgo
locale: es
---

Capgo utiliza 2 variables principales para administrar versiones en su aplicación Capacitor:
  - Versión nativa
  - Versiones de JavaScript


<div class="mx-auto" style="ancho:100%;">
  <img src="/graph_capgowebp" alt="Sistema de actualización de condensadores">
</div>

Todas las opciones de versiones las decide Capgo en el lado del servidor.

## Sistema de versiones

Para administrar la versión Capgo use el sistema SemVer, lea más al respecto [aquí](https://semverorg/)
### Versiones

Donde Capgo encuentra la versión para comparar

  > Puede anular este comportamiento configurando la clave de versión en el archivo `capacitorconfigjson` [docs aquí](/docs/plugin/settings/#version)
  > La versión nativa será ignorada para todas las plataformas.

#### IOS

 En IOS, la var se configura en su proyecto aquí `ios/App/App/Infoplist` bajo la clave`CFBundleShortVersionString` o `ios/App/Appxcodeproj/projectpbxproj` bajo la clave `MARKETING_VERSION` si `MARKETING_VERSION` se configuró en su ` archivo infoplist`

#### androide

  En Android, la var se configura en su proyecto aquí `android/app/buildgradle` bajo la clave `defaultConfigversionName`

#### JavaScript (versión del paquete Capgo)

  En JavaScript, la var se puede configurar en su `packagejson` bajo la clave `version`
  De lo contrario, deberá proporcionarlo en el comando de carga.

## Comportamiento predeterminado

Así se comportará el canal Capgo si no cambiaste ninguna configuración

> Este comportamiento se basará en el canal único que estableciste como predeterminado

### Cuando se realiza una nueva instalación de la aplicación Capacitor
Cuando el usuario descarga su aplicación Ionic por primera vez y abre la aplicación, se comunica con el servidor de Capgo.

Actualmente, pueden ocurrir 4 salidas:
  - La versión del paquete nativo (123) es inferior a la versión del paquete de Capgo (124), Capgo envía su paquete al usuario.
  - La versión del paquete nativo (123) es igual a la versión del paquete Capgo (123), Capgo envía "no es necesario actualizar"
  - La versión del paquete nativo (124) es superior a la versión del paquete Capgo (123), Capgo envía "no es necesario actualizar"
  - La versión del paquete nativo (123) es MUY inferior a la versión del paquete Capgo (223), Capgo envía "no es necesario actualizar"

### Otras configuraciones

#### Deshabilitar la degradación automática en modo nativo

Si cambia esta configuración a falso, Capgo considerará siempre la fuente confiable de la versión.
Entonces el comportamiento se convierte en:
- La versión nativa (124) es superior a la versión Capgo (123)

> Capgo envía su versión al usuario

#### Deshabilitar la estrategia de actualización automática

Hay un par de estrategias entre las que puede elegir. Puede obtener más información al respecto [aquí](/docs/tooling/cli/#disable-updates-strategy)

## Versión del paquete JavaScript

La versión del paquete JavaScript es la que envía al realizar `npx @capgo/cli@latest carga del paquete --producción del canal`

Si no usó la opción `--bundle 123`, Capgo obtendrá la versión del paquete de su archivo `packagejson` (en la clave de versión)

Después de que la aplicación Your Ionic haya instalado una versión de Capgo, esta es la versión que se comparará para:
  - Su versión del paquete JavaScript (123) es inferior a la versión del paquete Capgo (124), Capgo envía su paquete al usuario.

Con algunas condiciones de guardia:
  - Si la versión del paquete nativo es superior a la versión de Capgo, se aplica la condición "Desactivar la degradación automática en modo nativo".
  - Si la versión del paquete nativo es MAYOR inferior a la versión de Capgo, se aplica la condición "Desactivar actualización automática por encima de la versión principal".

## Actualización de la tienda de aplicaciones

Cuando publicas tu aplicación Capacitor JS en la App Store, lo que sucede es simple

Su usuario obtendrá la nueva versión de la tienda y eliminará todas las actualizaciones locales en su aplicación de forma predeterminada.

Si desea cambiar ese comportamiento, debe establecer la configuración `resetWhenUpdate`. Lea más al respecto [aquí](/docs/plugin/api#settings)

Esto solo se puede cambiar en la aplicación, no desde la nube como otras configuraciones.

### Otras configuraciones

Después de todo este comportamiento, puede tener arriba que a algún específico le haya gustado el ID del dispositivo.

En Capgo, puedes decidir anular el comportamiento de cada ID de dispositivo.

Puedes vincular un ID de dispositivo a:
  - una versión de paquete específica
  - un canal específico

Esto omitirá todas las configuraciones realizadas anteriormente.Obtenga más información al respecto en el artículo siguiente.