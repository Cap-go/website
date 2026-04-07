---
slug: self-hosted-live-updates
title: Actualizaciones En Vivo Autogestionadas
description: >-
  ¡Me complace anunciar Self-hosted Live Updates, la siguiente generación de
  actualizaciones en vivo de Capgo!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Actualizaciones autogestionadas
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Solution
published: true
locale: es
next_blog: ''
---

Me complace anunciar el lanzamiento de Live Updates Auto-alojado, que representa la última evolución de las Live Updates de Capgo.

Si bien muchas empresas actualmente utilizan el SDK de Live Updates para acceder a las actualizaciones más recientes de JavaScript, HTML y CSS para sus aplicaciones, algunas pueden encontrar obstáculos debido a políticas corporativas, regulaciones industriales o restricciones geográficas. Con Live Updates Auto-alojado, ahora puede distribuir artefactos de compilación web a través de su infraestructura.

Esto significa que puede evitar retrasos causados por las revisiones de la App Store, solucionar errores y modificar contenido más rápidamente, y asegurarse de que sus usuarios siempre estén operando en la última versión de su aplicación. Además, he escuchado de numerosas grandes empresas que desearían aprovechar Live Updates pero enfrentan desafíos debido a estrictos estándares de cumplimiento. Este problema ahora es cosa del pasado gracias a Live Updates Auto-alojado.

## ¿Cómo funcionan las live updates auto-alojadas?

Implementar Live Updates alojadas en Capgo es muy sencillo usando el [Capgo SDK](https://githubcom/Cap-go/capacitor-updater/). En cuanto a Live Updates Auto-alojado, he mejorado el CLI de Capgo con las funcionalidades necesarias para permitir la configuración en su infraestructura.

Para garantizar una entrega segura y coordinada de los últimos artefactos de compilación web a los usuarios finales, Capgo ahora permite que el plugin de Capacitor Live Updates emplee un par de claves pública/privada. Al usar Live Updates Auto-alojado, se realiza un handshake adicional para proporcionar la seguridad de que los artefactos descargados a través del plugin desde la infraestructura de la empresa no han sido modificados.

![Capgo encryption schema](/encryption_flow.webp)

A continuación se describen los pasos para establecer el par de claves y el proceso posterior para entregar la experiencia actualizada a los usuarios finales.

### Configuración única del par de claves

Para generar un par de claves pública/privada, las empresas pueden utilizar el siguiente comando del CLI de Capgo Cloud:

```shell
npx @capgo/cli@latest key create
```

Este comando establecerá las propiedades `CapacitorUpdaterprivateKey` en su archivo de configuración
Y generará 2 archivos de claves, `capgo_keypub` y `capgo_key` en el directorio raíz de su proyecto.

Este par de claves se utiliza para firmar la actualización y verificar la actualización en el lado de la aplicación.

### Flujo de trabajo de live updates auto-alojadas

Para comenzar a implementar Live Updates Auto-alojado, una empresa primero debe realizar una compilación web de sus correcciones de errores, actualizaciones de contenido o cualquier otro cambio de código basado en web que deseen realizar. Luego, deben firmar el artefacto de compilación usando la clave privada obtenida durante el proceso de configuración única, y finalmente cargar el paquete a su ubicación de almacenamiento preferida.

Primero compile su código:
```shell
npm run build
```

Luego comprima su compilación:
```shell
npx @capgo/cli@latest bundle zip
```

Luego encripte su zip:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Este comando le mostrará un ivSessionKey, necesita guardarlo para el siguiente paso.

Ahora suba su zip encriptado a su almacenamiento empresarial y obtenga la URL del archivo zip.

Capgo debe ser informado de una nueva Live Update que está lista para su consumo. Esto se hace a través de otro comando CLI:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Una vez ejecutado el comando, Capgo es consciente de que hay una nueva actualización lista para ser distribuida a los usuarios de la aplicación. Ahora, cuando se inicia la aplicación, el plugin de Live Updates verifica con Capgo si es necesario descargar algún cambio.

Capgo responde al plugin con "Sí, hay una actualización disponible" y el plugin de Live Updates descarga la nueva actualización en vivo usando la ubicación URL proporcionada desde el comando `register` del CLI:

```shell
https://abc.com/app/updates/abc123.zip
```

La API de la organización devuelve el paquete de Live Update desde la ubicación, y la aplicación descifra el zip y aplica la actualización en vivo. ¡Voilá!

## Comience

Me entusiasma extender el alcance de Live Updates a más empresas que antes. Tanto las organizaciones como los usuarios de aplicaciones Ionic reconocerán rápidamente las ventajas de la distribución segura de actualizaciones de aplicaciones over-the-air de Capgo.

Para más información sobre Live Updates Auto-alojado de Capgo, puede [consultar la documentación](/docs/cli/commands/#upload-version)¿Listo para implementar actualizaciones instantáneas de aplicaciones directamente a tus usuarios? [¡Regístrate aquí hoy!](/register/)