---
slug: do-google-allow-live-updates
title: >-
  ¿Permite Google enviar actualizaciones en vivo a las aplicaciones sin la
  revisión de la App Store?
description: >-
  ¿Cómo se pueden enviar actualizaciones de código a las aplicaciones de
  producción de Android y cumplir plenamente con las directrices de Google?
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Capacitor bypass illustration
tag: Tutorial
published: true
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
locale: es
---

Google Play es menos restrictivo que Apple a la hora de actualizar apps

Actualizar sus aplicaciones distribuidas a través de Google Play puede ser una tarea complicada, pero es importante seguir las pautas de Google para seguir cumpliendo. Según las pautas de Google Play, las aplicaciones no deben modificarse, reemplazarse ni actualizarse mediante ningún método que no sea el propio mecanismo de actualización de Google Play. significa que no se permite descargar código ejecutable, como archivos dex, JAR, etc., de una fuente que no sea Google Play.

Sin embargo, esta restricción no se aplica al código que se ejecuta en una máquina virtual o un intérprete que proporciona acceso indirecto a las API de Android, como JavaScript en una vista web o navegador. Esto significa que puede usar lenguajes interpretados, como JavaScript, Python, Lua. , etc, para actualizar su aplicación sin pasar por el proceso de revisión de Google Play. Una herramienta que puede ayudar con este proceso es el complemento Capgo Capacitor. Este complemento permite a los desarrolladores actualizar su código HTML, CSS y JavaScript y enviar actualizaciones a sus aplicaciones sin necesidad. para revisión

Además, las aplicaciones o el código de terceros que utilizan lenguajes interpretados, como JavaScript, Python, Lua, etc., que se cargan en tiempo de ejecución, no deben permitir posibles violaciones de las políticas de Google Play. Es importante tener en cuenta que este código interpretado no debe empaquetarse con la aplicación

Si sigue estas pautas y utiliza herramientas como el complemento Capgo Capacitor, puede asegurarse de que las actualizaciones de su aplicación cumplan con las políticas de Google Play y de que su aplicación permanezca disponible para los usuarios de la plataforma. Tenga en cuenta que siempre es una buena idea duplicar consulte la última versión de las políticas de Google para asegurarse de que las está siguiendo correctamente

Para obtener más información sobre cómo instalar Capgo para evitar la revisión, consulte mi próximo artículo.