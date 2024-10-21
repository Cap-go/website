---
slug: do-google-allow-live-updates
title: >-
  ¿Permite Google enviar actualizaciones en vivo a las aplicaciones sin la
  revisión de la tienda de aplicaciones?
description: >-
  ¿Cómo puede implementar actualizaciones de código para aplicaciones Android en
  producción cumpliendo plenamente con las políticas de Google?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Ilustración del puenteo del condensador
tag: Tutorial
published: true
locale: es
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play es menos restrictivo que Apple en lo que respecta a la actualización de aplicaciones

Actualizar tus aplicaciones distribuidas a través de Google Play puede ser una tarea complicada, pero es importante seguir las pautas de Google para mantenerse en cumplimiento. Según las directrices de Google Play, las aplicaciones no deben modificarse, reemplazarse o actualizarse utilizando ningún método aparte del mecanismo de actualización propio de Google Play. Esto significa que no está permitido descargar código ejecutable, como archivos dex, JAR o so, de una fuente que no sea Google Play.

Sin embargo, esta restricción no se aplica al código que se ejecuta en una máquina virtual o un intérprete que proporciona acceso indirecto a las API de Android, como JavaScript en una webview o navegador. Esto significa que puedes usar lenguajes interpretados, como JavaScript, Python, Lua, etc., para actualizar tu aplicación sin pasar por el proceso de revisión de Google Play. Una herramienta que puede ayudar con este proceso es el plugin Capgo Capacitor. Este plugin permite a los desarrolladores actualizar su código HTML, CSS y JavaScript y enviar actualizaciones a sus aplicaciones sin necesidad de revisión.

Además, las aplicaciones o el código de terceros que utilizan lenguajes interpretados, como JavaScript, Python, Lua, etc., que se cargan en tiempo de ejecución, no deben permitir posibles violaciones de las políticas de Google Play. Es importante tener en cuenta que este código interpretado no debe empaquetarse con la aplicación.

Al seguir estas pautas y utilizar herramientas como el plugin Capgo Capacitor, puedes asegurarte de que las actualizaciones de tu aplicación cumplan con las políticas de Google Play y que tu aplicación permanezca disponible para los usuarios en la plataforma. Ten en cuenta que siempre es una buena idea verificar la última versión de las políticas de Google para asegurarte de que las estás siguiendo correctamente.

Para obtener más información sobre cómo instalar Capgo para evitar la revisión, consulta mi próximo artículo.