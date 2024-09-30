---
slug: self-hosted-live-updates
title: Actualizaciones en vivo autohospedadas
description: >-
  ¡Me complace anunciar las actualizaciones en vivo autohospedadas, la próxima
  versión de las actualizaciones en vivo de Capgo!
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-03T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /self_hosted.webp
head_image_alt: Self hosted updates
tag: Solution
published: true
next_blog: ''
locale: es
---

Me complace anunciar el lanzamiento de Live Updates autohospedadas, que representan la última evolución de Live Updates de Capgo.

Si bien muchas empresas utilizan actualmente el SDK de Live Updates para acceder a las actualizaciones más recientes de JavaScript, HTML y CSS para sus aplicaciones, algunas pueden encontrar obstáculos debido a políticas corporativas, regulaciones de la industria o restricciones geográficas. Con Live Updates autohospedadas, ahora puede Distribuya artefactos de creación web a través de su infraestructura.

Esto significa que puede evitar retrasos causados ​​por las revisiones de Apple Store, solucionar errores y modificar contenido más rápidamente, y asegurarse de que sus usuarios siempre estén operando con la última versión de su aplicación. Además, he escuchado de numerosas grandes empresas a las que les gustaría aprovechar Live Actualizaciones, pero enfrentan desafíos debido a estrictos estándares de cumplimiento. Este problema ahora es cosa del pasado gracias a las actualizaciones en vivo autohospedadas.

## ¿Cómo funcionan las actualizaciones en vivo autohospedadas?

Implementar actualizaciones en vivo alojadas en Capgo es muy sencillo usando el [Capgo SDK](https://githubcom/Cap-go/capacitor-updater/) En cuanto a las actualizaciones en vivo autohospedadas, he mejorado la CLI de Capgo con las funcionalidades necesarias para habilitar la configuración en su infraestructura

Para garantizar una entrega segura y coordinada de los últimos artefactos de compilación web a los usuarios finales, Capgo ahora permite que el complemento Capacitor Live Updates emplee un par de claves pública/privada. Cuando se utilizan Live Updates autohospedados, se realiza un protocolo de enlace adicional para brindar tranquilidad. que los artefactos descargados a través del complemento de la infraestructura de la empresa no se modifican

![Esquema de cifrado de Capgo](/encryption_flowwebp)

A continuación se describen los pasos para establecer el emparejamiento de claves y el proceso posterior para brindar la experiencia actualizada a los usuarios finales.

### Configuración de par de claves única

Para generar un par de claves pública/privada, las empresas pueden utilizar el siguiente comando CLI de Capgo Cloud:

```shell
npx @capgo/cli@latest key create
```

Este comando establecerá las propiedades `CapacitorUpdaterprivateKey` en su archivo de configuración
Y genere 2 archivos clave, `capgo_keypub` y `capgo_key` en el directorio raíz de su proyecto

Este par de claves se utiliza para firmar la actualización y verificar la actualización en el lado de la aplicación.

### Flujo de trabajo de actualizaciones en vivo autohospedado

Para comenzar a implementar actualizaciones en vivo autohospedadas, una empresa primero debe realizar una compilación web de sus correcciones de errores, actualizaciones de contenido o cualquier otro cambio de código basado en web que desee realizar. A continuación, debe firmar el artefacto de compilación utilizando la clave privada obtenida. durante el proceso de configuración único y, finalmente, cargue el paquete en su ubicación de almacenamiento preferida

Primero construye tu código:
```shell
npm run build
```

Luego comprime tu compilación:
```shell
npx @capgo/cli/latest bundle zip
```

Luego cifra tu zip:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

Este comando le imprimirá una ivSessionKey, deberá guardarla para el siguiente paso

Ahora cargue su zip cifrado en el almacenamiento de su empresa y obtenga la URL del archivo zip.

Luego se debe informar a Capgo de una nueva actualización en vivo que está lista para su consumo. Esto se hace mediante otro comando CLI:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Una vez que se ejecuta el comando, Capgo sabe que hay una nueva actualización lista para distribuirse a los usuarios de la aplicación. Ahora, cuando se inicia la aplicación, el complemento Live Updates verifica con Capgo para ver si es necesario eliminar algún cambio.

Capgo responde al complemento con "Sí, hay una actualización disponible" y el complemento Live Updates descarga la nueva actualización en vivo utilizando la ubicación URL proporcionada desde el comando CLI \`register\`:

```shell
https://abc.com/app/updates/abc123.zip
```

La API de la organización devuelve el paquete de actualización en vivo desde la ubicación, y la aplicación descifra el zip y aplica la actualización en vivo ¡Voilà!

## Empezar

Estoy encantado de ampliar el alcance de las actualizaciones en vivo a más empresas que antes. Tanto las organizaciones como los usuarios de la aplicación Ionic reconocerán rápidamente las ventajas de la distribución segura de actualizaciones de aplicaciones inalámbricas de Capgo.

Para obtener más información sobre las actualizaciones en vivo autohospedadas de Capgo, puede [consulte los documentos](/docs/tooling/cli/#upload-version)¿Listo para implementar actualizaciones instantáneas de aplicaciones directamente para sus usuarios? [¡Regístrese aquí hoy!](/register/)