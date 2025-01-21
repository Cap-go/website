---
slug: es__self-hosted-live-updates
title: Actualizaciones en vivo autohospedadas
description: >-
  Me complace anunciar Self-hosted Live Updates, ¡la siguiente iteración de
  Capgos Live Updates!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Actualizaciones autohospedadas
tag: Solution
published: true
locale: es
next_blog: ''
---

Me complace anunciar el lanzamiento de Actualizaciones en Vivo Auto-alojadas, que representa la última evolución de las Actualizaciones en Vivo de Capgo.

Mientras muchas empresas actualmente utilizan el SDK de Actualizaciones en Vivo para acceder a las actualizaciones más recientes de JavaScript, HTML y CSS para sus aplicaciones, algunas pueden encontrar obstáculos debido a políticas corporativas, regulaciones industriales o restricciones geográficas. Con las Actualizaciones en Vivo Auto-alojadas, ahora puede distribuir artefactos de compilación web a través de su propia infraestructura.

Esto significa que puede evitar retrasos causados por revisiones de la App Store, solucionar errores y modificar contenido más rápidamente, y asegurarse de que sus usuarios siempre estén operando en la última versión de su aplicación. Además, he escuchado de numerosas grandes empresas que les gustaría aprovechar las Actualizaciones en Vivo pero enfrentan desafíos debido a estrictos estándares de cumplimiento. Este problema ahora es cosa del pasado gracias a las Actualizaciones en Vivo Auto-alojadas.

## ¿Cómo funcionan las actualizaciones en vivo auto-alojadas?

Implementar Actualizaciones en Vivo alojadas en Capgo es muy sencillo usando el [SDK de Capgo](https://github.com/Cap-go/capacitor-updater/). En cuanto a las Actualizaciones en Vivo Auto-alojadas, he mejorado la CLI de Capgo con las funcionalidades necesarias para permitir la configuración en su infraestructura.

Para garantizar una entrega segura y coordinada de los últimos artefactos de compilación web a los usuarios finales, Capgo ahora permite que el plugin de Actualizaciones en Vivo de Capacitor emplee un par de claves pública/privada. Al usar Actualizaciones en Vivo Auto-alojadas, se realiza un apretón de manos adicional para proporcionar la seguridad de que los artefactos descargados a través del plugin desde la infraestructura de la empresa no han sido modificados.

![Esquema de encriptación de Capgo](/encryption_flow.webp)

Lo siguiente describe los pasos para establecer el par de claves y el proceso posterior para entregar la experiencia actualizada a los usuarios finales.

### Configuración única del par de claves

Para generar un par de claves pública/privada, las empresas pueden utilizar el siguiente comando de la CLI de Capgo Cloud:

```shell
npx @capgo/cli@latest key create
```

Este comando establecerá las propiedades `CapacitorUpdater.privateKey` en su archivo de configuración.
Y generará 2 archivos de clave, `capgo_key.pub` y `capgo_key` en el directorio raíz de su proyecto.

Este par de claves se utiliza para firmar la actualización y verificar la actualización en el lado de la aplicación.

### Flujo de trabajo de actualizaciones en vivo auto-alojadas

Para comenzar a implementar Actualizaciones en Vivo Auto-alojadas, una empresa primero debe realizar una compilación web de sus correcciones de errores, actualizaciones de contenido o cualquier otro cambio de código basado en web que deseen hacer. Luego, deben firmar el artefacto de compilación utilizando la clave privada obtenida durante el proceso de configuración única, y finalmente cargar el paquete a su ubicación de almacenamiento preferida.

Primero compile su código:
```shell
npm run build
```

Luego comprima su compilación:
```shell
npx @capgo/cli/latest bundle zip
```

Luego encripte su archivo zip:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Este comando le imprimirá una ivSessionKey, necesita guardarla para el siguiente paso.

Ahora cargue su zip encriptado a su almacenamiento empresarial y obtenga la URL del archivo zip.

Luego se debe informar a Capgo de una nueva Actualización en Vivo que está lista para su consumo. Esto se hace a través de otro comando CLI:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Una vez que se ejecuta el comando, Capgo es consciente de una nueva actualización lista para ser distribuida a los usuarios de la aplicación. Ahora, cuando se inicia la aplicación, el plugin de Actualizaciones en Vivo verifica con Capgo si es necesario traer algún cambio.

Capgo responde al plugin con "Sí, hay una actualización disponible" y el plugin de Actualizaciones en Vivo descarga la nueva actualización en vivo utilizando la ubicación URL proporcionada por el comando CLI `register`:

```shell
https://abc.com/app/updates/abc123.zip
```

La API de la organización devuelve el paquete de Actualización en Vivo desde la ubicación, y la aplicación desencripta el zip y aplica la actualización en vivo. ¡Voilà!

## Comience

Me emociona extender el alcance de las Actualizaciones en Vivo a aún más empresas que antes. Tanto las organizaciones como los usuarios de aplicaciones Ionic reconocerán rápidamente las ventajas de la distribución segura de actualizaciones de aplicaciones por aire de Capgo.

Para obtener más información sobre las Actualizaciones en Vivo Auto-alojadas de Capgo, puede [consultar la documentación](/docs/tooling/cli/#upload-version).¿Listo para implementar actualizaciones instantáneas de la aplicación directamente a tus usuarios? [¡Regístrate aquí hoy!](/register/)